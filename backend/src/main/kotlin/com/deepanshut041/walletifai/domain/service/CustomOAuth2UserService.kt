package com.deepanshut041.walletifai.domain.service

import com.deepanshut041.walletifai.auth.util.OAuth2UserInfo
import com.deepanshut041.walletifai.auth.util.OAuth2UserInfoFactory.getOAuth2UserInfo
import com.deepanshut041.walletifai.auth.util.UserPrincipal
import com.deepanshut041.walletifai.data.entity.UserEntity
import com.deepanshut041.walletifai.data.entity.UserEntityMapper
import com.deepanshut041.walletifai.data.repository.UserRepository
import com.deepanshut041.walletifai.domain.model.UserModel
import com.deepanshut041.walletifai.domain.model.enums.AuthProvider
import com.deepanshut041.walletifai.util.OAuth2AuthenticationProcessingException
import com.deepanshut041.walletifai.util.toNullable
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.InternalAuthenticationServiceException
import org.springframework.security.core.AuthenticationException
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.core.OAuth2AuthenticationException
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Service
import java.util.*

@Service
class CustomOAuth2UserService(@Autowired private val userRepository: UserRepository) : DefaultOAuth2UserService() {

    @Throws(OAuth2AuthenticationException::class)
    override fun loadUser(oAuth2UserRequest: OAuth2UserRequest): OAuth2User {
        val oAuth2User = super.loadUser(oAuth2UserRequest)
        return try {
            processOAuth2User(oAuth2UserRequest, oAuth2User)
        } catch (ex: AuthenticationException) {
            throw ex
        } catch (ex: Exception) { // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw InternalAuthenticationServiceException(ex.message, ex.cause)
        }
    }

    private fun processOAuth2User(oAuth2UserRequest: OAuth2UserRequest, oAuth2User: OAuth2User): OAuth2User {
        val oAuth2UserInfo = getOAuth2UserInfo(oAuth2UserRequest.clientRegistration.registrationId, oAuth2User.attributes)
        if (oAuth2UserInfo.getEmail().isEmpty()) {
            throw OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider")
        }
        var user: UserModel? = userRepository.findByEmail(oAuth2UserInfo.getEmail()).map(UserEntityMapper::to).toNullable()

        user?.let {
            if (it.provider != AuthProvider.valueOf(oAuth2UserRequest.clientRegistration.registrationId)) {
                throw OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        it.provider.toString() + " account. Please use your " + it.provider.toString() +
                        " account to login.")
            }

            updateExistingUser(it, oAuth2UserInfo)
        } ?: run {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo)
        }
        return UserPrincipal.create(user!!, oAuth2User.attributes, rolesToAuthority(user!!.roles))
    }

    private fun registerNewUser(oAuth2UserRequest: OAuth2UserRequest, oAuth2UserInfo: OAuth2UserInfo): UserModel {
        val user = UserEntity(
                id = null,
                provider = AuthProvider.valueOf(oAuth2UserRequest.clientRegistration.registrationId),
                providerId = oAuth2UserInfo.getId(),
                name = oAuth2UserInfo.getName(),
                email = oAuth2UserInfo.getEmail(),
                imgUrl = oAuth2UserInfo.getImageUrl() ?: "",
                emailVerified = true,
                password = "",
                createdAt = Date(),
                updatedAt = Date(),
                roles = listOf("ROLE_USER")
        )
        return UserEntityMapper.to(userRepository.save(user))
    }

    private fun updateExistingUser(existingUser: UserModel, oAuth2UserInfo: OAuth2UserInfo): UserModel {
        val user = existingUser.copy(
                name = oAuth2UserInfo.getName(),
                updateAt = Date()
        )
        return UserEntityMapper.to(userRepository.save(UserEntityMapper.from(user)))
    }
}