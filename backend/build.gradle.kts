import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.5.0"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
	kotlin("jvm") version "1.5.10"
	kotlin("plugin.spring") version "1.5.10"
}

group = "com.deepanshut041"
version = "1.0"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
	mavenCentral()
}

dependencies {
	// Core
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

	// Data
	implementation("org.springframework.boot:spring-boot-starter-data-mongodb")

	// Documentation
	implementation("org.springdoc:springdoc-openapi-webmvc-core:1.5.9")
	implementation("org.springdoc:springdoc-openapi-ui:1.5.9")
	implementation("org.springdoc:springdoc-openapi-kotlin:1.5.9")
	implementation("org.springdoc:springdoc-openapi-security:1.5.9")

	// Security
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("io.jsonwebtoken:jjwt:0.9.1")
	implementation("org.springframework.security:spring-security-oauth2-client")
	implementation("org.springframework.security:spring-security-oauth2-jose")

	implementation("com.fasterxml.jackson.core:jackson-databind:2.12.3")


	developmentOnly("org.springframework.boot:spring-boot-devtools")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("de.flapdoodle.embed:de.flapdoodle.embed.mongo")
	testImplementation("org.springframework.security:spring-security-test")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "11"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.register("getDeps") {
	doLast {
		configurations
			.filter { it.isCanBeResolved }
			.forEach { it.resolve() }
	}
}

tasks.register("buildAndReload") {
	dependsOn("build")
	mustRunAfter("build")
	doLast {
		File(".", "reload-trigger.txt").writeText( "${System.currentTimeMillis()}")
	}
}