---
aliases:
- /es/real_user_monitoring/kotlin-multiplatform/integrated_libraries/
code_lang: kotlin-multiplatform
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: Código fuente
  text: Código fuente de dd-sdk-kotlin-multiplatform
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: Documentación
  text: Bibliotecas integradas
title: Bibliotecas de Kotlin Multiplatform para RUM
type: multi-code-lang
---

Esta página enumera bibliotecas integradas que puede utilizar para aplicaciones de Kotlin Multiplatform.

## Ktor

Si utilizas Ktor para realizar solicitudes de red en tu aplicación, puedes integrar el complemento de Datadog Ktor para recopilar información de RUM sobre ellas:

1. [Instala Datadog Kotlin Multiplatform SDK y habilita RUM][1].
2. Añade una dependencia común en `dd-sdk-kotlin-multiplatform-ktor`:

```kotlin
kotlin {
    // ...
    sourceSets {
        // ...
        commonMain.dependencies {
            implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-ktor:x.x.x")
        }
    }
}
```
3. Añade el `Datadog Ktor Plugin` proporcionado a tu Ktor `HttpClient`:

```kotlin
val ktorClient = HttpClient {
    install(
        datadogKtorPlugin(
            tracedHosts = mapOf(
                "example.com" to setOf(TracingHeaderType.DATADOG),
                "example.eu" to setOf(TracingHeaderType.DATADOG)
            ),
            traceSamplingRate = 100f
        )
    )
}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/kotlin-multiplatform/