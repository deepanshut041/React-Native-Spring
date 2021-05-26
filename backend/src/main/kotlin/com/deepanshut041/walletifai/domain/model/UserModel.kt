package com.deepanshut041.walletifai.domain.model

import com.deepanshut041.walletifai.domain.model.enums.AuthProvider
import java.util.*

data class UserModel(val id: String? = null,
                     val name: String,
                     val email: String,
                     val password: String,
                     val imgUrl: String,
                     val emailVerified: Boolean = false,
                     val accountLocked: Boolean = false,
                     val accountExpired: Boolean = false,
                     val credentialsExpired: Boolean = false,
                     val provider: AuthProvider,
                     val providerId: String,
                     val roles: List<String> = emptyList(),
                     val createdAt: Date,
                     val updateAt: Date)