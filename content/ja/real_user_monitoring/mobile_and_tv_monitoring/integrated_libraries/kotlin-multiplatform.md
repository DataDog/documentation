---
aliases:
- /ja/real_user_monitoring/kotlin-multiplatform/integrated_libraries/
code_lang: kotlin-multiplatform
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: ソースコード
  text: dd-sdk-kotlin-multiplatform のソースコード
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: ドキュメント
  text: 統合ライブラリ
title: RUM 用 Kotlin Multiplatform ライブラリ
type: multi-code-lang
---

このページでは、Kotlin Multiplatform アプリケーションで使用できる統合ライブラリを一覧表示します。

## Ktor

アプリで Ktor を使用してネットワークリクエストを実行している場合、Datadog Ktor プラグインを統合して、それらのリクエストに関する RUM 情報を収集できます。

1. [Datadog Kotlin Multiplatform SDK をインストールし、RUM を有効化する][1] 
2. 共通ソースセットに `dd-sdk-kotlin-multiplatform-ktor` を依存関係として追加します。

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
3. 提供されている `Datadog Ktor Plugin` を Ktor の `HttpClient` に追加します。

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/kotlin-multiplatform/