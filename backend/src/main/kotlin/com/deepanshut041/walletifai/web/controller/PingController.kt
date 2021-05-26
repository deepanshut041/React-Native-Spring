package com.deepanshut041.walletifai.web.controller

import com.deepanshut041.walletifai.auth.util.UserPrincipal
import com.deepanshut041.walletifai.web.controller.PingController.Companion.USER_BASE_URI
import com.deepanshut041.walletifai.web.dto.UserProfileResponse
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(USER_BASE_URI, consumes = ["application/json"])
@Tag(name = "Ping Api", description = "This contains url related to ping")
class PingController {

    @GetMapping("")
    fun pingServer(): ResponseEntity<String> {
        return ResponseEntity.ok("Hello")
    }

    companion object {
        const val USER_BASE_URI = "/api/ping"
    }
}