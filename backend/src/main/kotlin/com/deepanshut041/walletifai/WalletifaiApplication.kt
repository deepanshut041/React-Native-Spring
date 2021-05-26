package com.deepanshut041.walletifai

import com.deepanshut041.walletifai.config.AppProperties
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableConfigurationProperties(AppProperties::class)
class WalletifaiApplication

fun main(args: Array<String>) {
	runApplication<WalletifaiApplication>(*args)
}
