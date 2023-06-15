---
code_lang: dotnet
code_lang_weight: 80
description: OTel API で .NET アプリケーションをインスツルメンテーションし、Datadog にトレースを送信します。
further_reading:
- link: tracing/glossary/
  tag: Documentation
  text: サービス、リソース、トレースの詳細
kind: documentation
title: OpenTelemetry API を使った .NET アプリケーションのカスタムインスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation %}}

## 要件と制限

- Datadog .NET トレースライブラリ `dd-trace-dotnet` バージョン 2.21.0 以上。

特記されている通り、Datadog のライブラリに実装されている以下の OTel 機能:

| 機能                               | サポートノート                       |
|---------------------------------------|--------------------------------------|
| OTel コンテキスト伝搬              | [Datadog 分散ヘッダーフォーマット][9]が代わりに使用されます。 |
| [スパンプロセッサー][2]                  | 非サポート                                          |
| [スパンエクスポーター][3]                   | 非サポート                                            |
| トレース/スパン [ID ジェネレーター][4]         | ID の生成は `ddtrace` が行います。           |


## Datadog トレースプロバイダーを使用するための OTel の構成

1. [OTel .NET Manual Instrumentation ドキュメント][5]に従って、ご希望の手動 OTel インスツルメンテーションを .NET コードに追加します。
2. Datadog .NET トレーシングライブラリをインストールし、[.NET Framework サービス][10]または [.NET Core (および .NET 5+) サービス][11]のトレーサーを有効にします。
3. `DD_TRACE_OTEL_ENABLED` 環境変数を `true` に設定します。
4. アプリケーションを実行します。

Datadog は、これらの OpenTelemetry スパンと他の Datadog APM スパンを組み合わせて、アプリケーションの単一のトレースにします。また、[OpenTelemetry インスツルメンテーションライブラリ][8]もサポートしています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/net/manual/
[8]: https://opentelemetry.io/docs/instrumentation/net/libraries/
[9]: /ja/tracing/trace_collection/trace_context_propagation/dotnet/
[10]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started
[11]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started