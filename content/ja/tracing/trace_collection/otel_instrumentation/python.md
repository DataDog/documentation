---
code_lang: python
code_lang_weight: 10
description: OpenTelemetry API で Python アプリケーションをインスツルメンテーションし、Datadog にトレースを送信します。
further_reading:
- link: tracing/glossary/
  tag: Documentation
  text: サービス、リソース、トレースの詳細
kind: documentation
title: OpenTelemetry API を使った Python アプリケーションのカスタムインスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation %}}

## 要件と制限

- Datadog Python トレーシングライブラリ `dd-trace-py` バージョン 1.12.0 以上。
- Python バージョン 3.7 以上。

特記されている通り、Datadog のライブラリに実装されている以下の OpenTelemetry 機能:

| 機能                               | サポートノート                       |
|---------------------------------------|---------------------------------------|
| [OpenTelemetry コンテキスト伝搬][1]         | [Datadog 分散ヘッダーフォーマット][9]が代わりに使用されます。 |
| [スパンプロセッサー][2]                  | 非サポート                                          |
| [スパンエクスポーター][3]                   | 非サポート                                            |
| トレース/スパン [ID ジェネレーター][4]         | ID の生成は `ddtrace` が行います。           |


## Datadog トレーサープロバイダーを使用するための OpenTelemetry の構成

1. [OpenTelemetry Python Manual Instrumentation ドキュメント][5]に従って、ご希望の手動 OpenTelemetry インスツルメンテーションを Python コードに追加します。
2. python トレーサーをインストールします。

    ```
    pip install "ddtrace>=1.12.0"
    ```

3. `DD_TRACE_OTEL_ENABLED` 環境変数を `True` に設定します。
4. `ddtrace-run` でアプリケーションを実行します。これにより、自動的に `Datadog Tracer Provider` が構成されます。もしアプリケーションが `ddtrace-run` を使用できない場合は、[`dd-trace-py` OpenTelemetry API ドキュメント][11]を読んで追加の構成を確認してください。

Datadog は、これらの OpenTelemetry スパンと他の Datadog APM スパンを組み合わせて、アプリケーションの単一のトレースにします。また、[OpenTelemetry 自動インスツルメンテーション][8]もサポートしています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/python/manual/#change-the-default-propagation-format
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/python/manual/
[8]: https://opentelemetry.io/docs/instrumentation/python/automatic/
[9]: /ja/tracing/trace_collection/trace_context_propagation/python/
[10]: /ja/tracing/trace_collection/dd_libraries/python/#custom-logging
[11]: https://ddtrace.readthedocs.io/en/stable/api.html#opentelemetry-api
