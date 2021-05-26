package com.deepanshut041.walletifai.web.controller

import com.deepanshut041.walletifai.auth.misc.TokenProvider
import com.deepanshut041.walletifai.auth.util.UserPrincipal
import com.deepanshut041.walletifai.domain.model.UserModel
import com.deepanshut041.walletifai.domain.model.enums.AuthProvider
import com.deepanshut041.walletifai.domain.service.UserService
import com.deepanshut041.walletifai.util.ApiResponse
import com.deepanshut041.walletifai.util.BadRequestException
import com.deepanshut041.walletifai.web.dto.AuthResponse
import com.deepanshut041.walletifai.web.dto.LoginRequest
import com.deepanshut041.walletifai.web.dto.SignUpRequest
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*
import javax.validation.Valid


@RestController
@RequestMapping(AccountController.AUTH_BASE_URI, consumes = ["application/json"])
@Tag(name = "Account Api", description = " This contains url related to user account")
class AccountController(
        @Autowired private val authenticationManager: AuthenticationManager,
        @Autowired private val userService: UserService,
        @Autowired private val passwordEncoder: PasswordEncoder,
        @Autowired private val tokenProvider: TokenProvider
) {

    @PostMapping("/signin")
    fun authenticateUser(@Valid @RequestBody loginRequest: LoginRequest): ResponseEntity<AuthResponse>? {
        val authentication: Authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                        loginRequest.email,
                        loginRequest.password
                )
        )
        SecurityContextHolder.getContext().authentication = authentication
        val token = tokenProvider.createToken(authentication)
        val userPrincipal = authentication.principal as UserPrincipal

        return ResponseEntity.ok(AuthResponse(accessToken = token, name = userPrincipal.mName, email = userPrincipal.mEmail, imageUrl = userPrincipal.mImgUrl, id = userPrincipal.id))
    }

    @PostMapping("/signup")
    fun registerUser(@Valid @RequestBody signUpRequest: SignUpRequest): ResponseEntity<ApiResponse>? {
        if (userService.existsByEmail(signUpRequest.email)) {
            throw BadRequestException("Email address already in use.")
        }
        // Creating user's account
        val user = UserModel(
                name = signUpRequest.name,
                email = signUpRequest.email,
                password = passwordEncoder.encode(signUpRequest.password),
                imgUrl = "",
                roles = listOf("USER_ROLE"),
                providerId = "",
                provider = AuthProvider.local,
                createdAt = Date(),
                updateAt = Date()
        )

        val result = userService.saveUser(user)
        return ResponseEntity.ok(ApiResponse(true, "User registered successfully"))
    }


    companion object {
        const val AUTH_BASE_URI = "/api/account"
    }
}