---
aliases:
- /ja/tracing/trace_collection/otel_instrumentation/dotnet/
code_lang: dotnet
code_lang_weight: 80
description: OpenTelemetry API で .NET アプリケーションをインスツルメンテーションし、Datadog にトレースを送信します。
further_reading:
- link: tracing/trace_collection/otel_instrumentation/java/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: ドキュメント
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
kind: ドキュメント
title: OpenTelemetry API を使った .NET アプリケーションのカスタムインスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation %}}

## 要件と制限

- Datadog .NET トレースライブラリ `dd-trace-dotnet` バージョン 2.21.0 以上。

特記されている通り、Datadog のライブラリに実装されている以下の OpenTelemetry 機能:

| 機能                               | サポートノート                                           |
|---------------------------------------|---------------------------------------------------------|
| OpenTelemetry コンテキスト伝搬     | [W3C Trace Context と Datadog ヘッダーフォーマット][9]はデフォルトで有効になっています。  |
| [スパンプロセッサー][2]                  | 非サポート                                             |
| [スパンエクスポーター][3]                   | 非サポート                                             |
| トレース/スパン [ID ジェネレーター][4]         | ID 生成はトレーシングライブラリによって実行され、[128 ビットのトレース ID][12] をサポートしています。  |


## Datadog トレースプロバイダーを使用するための OpenTelemetry の構成

1. [OpenTelemetry .NET 手動インスツルメンテーションのドキュメント][5]に従って、希望する OpenTelemetry 手動インスツルメンテーションを .NET コードに追加します。**重要！** コードが OpenTelemetry SDK を呼び出すように指示されている場合は、代わりに Datadog トレーシングライブラリを呼び出してください。

2. Datadog .NET トレーシングライブラリをインストールし、[.NET Framework サービス][10]または [.NET Core (および .NET 5+) サービス][11]のトレーサーを有効にします。**ベータ版:** [ワンステップ APM インスツルメンテーション][13]を使って、オプションでこれを行うことができます。

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
[12]: /ja/opentelemetry/guide/otel_api_tracing_interoperability/
[13]: /ja/tracing/trace_collection/single-step-apm/