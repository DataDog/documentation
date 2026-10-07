---
aliases:
- /es/real_user_monitoring/kotlin-multiplatform/integrated_libraries/
- /es/real_user_monitoring/kotlin_multiplatform/integrated_libraries/
- /es/real_user_monitoring/mobile_and_tv_monitoring/kotlin-multiplatform/integrated_libraries/
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: Código fuente
  text: Código fuente de dd-sdk-kotlin-multiplatform
title: Bibliotecas de Kotlin Multiplatform para RUM
---

En esta página, se enumeran las bibliotecas integradas que puedes utilizar para las aplicaciones de Kotlin Multiplatform.

## Ktor

Si utilizas Ktor para hacer solicitudes de red en tu aplicación, puedes integrar el complemento de Ktor de Datadog para recopilar información de RUM sobre ellas:

1. [Instala el SDK de Kotlin Multiplatform para Datadog y activa RUM][1].
2. Añade una dependencia común a `dd-sdk-kotlin-multiplatform-ktor` si utilizas Ktor 2.x, o `dd-sdk-kotlin-multiplatform-ktor3` para Ktor 3.x:

```kotlin
kotlin {
    // ...
    sourceSets {
        // ...
        commonMain.dependencies {
            // Usa esta línea si utilizas Ktor 2.x
            implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-ktor:x.x.x")
            // Usa esta línea si utilizas Ktor 3.x
            // implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-ktor3:x.x.x")
        }
    }
}
```
3. Añade el `Datadog Ktor Plugin` para tu `HttpClient` de Ktor:

```kotlin
val ktorClient = HttpClient {
    install(
        datadogKtorPlugin(
            tracedHosts = mapOf(
                "example.com" to setOf(TracingHeaderType.DATADOG),
                "example.eu" to setOf(TracingHeaderType.DATADOG)
            ),
            traceSampleRate = 100f
        )
    )
}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/