---
code_lang: java
code_lang_weight: 0
description: OpenTelemetry API で Java アプリケーションをインスツルメンテーションし、Datadog にトレースを送信します。
further_reading:
- link: tracing/glossary/
  tag: Documentation
  text: サービス、リソース、トレースの詳細
kind: documentation
title: OpenTelemetry API を使った Java アプリケーションのカスタムインスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation %}}

## 要件と制限

- Datadog Java トレーシングライブラリ `dd-trace-java` バージョン 1.10.0 以上。

特記されている通り、Datadog のライブラリに実装されている以下の OpenTelemetry 機能:

| 機能                               | サポートノート                       |
|---------------------------------------|-------------------------------------------|
| [OpenTelemetry コンテキスト伝搬][1]         | [Datadog 分散ヘッダーフォーマット][9]が代わりに使用されます。 | 
| [スパンプロセッサー][2]                  | 非サポート                                          | 
| [スパンエクスポーター][3]                   | 非サポート                                            |
| トレース/スパン [ID ジェネレーター][4]         | ID の生成は `ddtrace` が行います。           |


## Datadog トレーシングライブラリを使用するための OpenTelemetry の構成

1. [OpenTelemetry Java Manual Instrumentation ドキュメント][5]に従って、ご希望の手動 OpenTelemetry インスツルメンテーションを Java コードに追加します。
1. [Datadog トレーシングライブラリを JVM に][11]追加します。
1. `dd.trace.otel.enabled` システムプロパティを `true` に設定します。

Datadog は、これらの OpenTelemetry スパンと他の Datadog APM スパンを組み合わせて、アプリケーションの単一のトレースにします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/java/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/java/manual/
[8]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[9]: /ja/tracing/trace_collection/trace_context_propagation/java/
[11]: /ja/tracing/trace_collection/dd_libraries/java/?tab=springboot#add-the-java-tracer-to-the-jvm