package com.deepanshut041.walletifai.util

import java.util.*

fun <T : Any> Optional<T>.toNullable(): T? = this.orElse(null)