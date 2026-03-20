---
aliases:
- /ko/real_user_monitoring/kotlin-multiplatform/integrated_libraries/
code_lang: kotlin-multiplatform
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: 소스 코드
  text: dd-sdk-kotlin-multiplatform용 소스 코드
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: 문서
  text: 통합된 라이브러리
title: RUM용 Kotlin Multiplatform 라이브러리
type: multi-code-lang
---

이 페이지는 Kotlin Multiplatform 애플리케이션에 사용할 수 있는 통합 라이브러리를 보여줍니다.

## Ktor

애플리케이션에서 Ktor를 사용하여 네트워크 요청을 하는 경우 Datadog Ktor 플러그인을 통합하여 해당 요청에 관한 RUM 정보를 수집할 수 있습니다.

1. [Datadog Kotlin Multiplatform SDK를 설치하고 RUM을 활성화하세요][1].
2. `dd-sdk-kotlin-multiplatform-ktor`에 공통 종속성을 추가합니다.

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
3. 제공된 `Datadog Ktor Plugin`을 해당 Ktor `HttpClient`에 추가합니다.

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

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/kotlin-multiplatform/