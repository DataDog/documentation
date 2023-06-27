---
code_lang: nodejs
code_lang_weight: 40
description: OpenTelemetry API で Node.js アプリケーションをインスツルメンテーションし、Datadog にトレースを送信します。
further_reading:
- link: tracing/glossary/
  tag: Documentation
  text: サービス、リソース、トレースの詳細
kind: documentation
title: OpenTelemetry API を使った Node.js アプリケーションのカスタムインスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation %}}


## 要件と制限

<!-- TODO: リリース後、バージョンを修正する必要があります -->
- Datadog Node.js トレーシングライブラリ `dd-trace` バージョン 4.2.0+、3.23.0+、または v2.36.0+。

特記されている通り、Datadog のライブラリに実装されている以下の OpenTelemetry 機能:

| 機能                               | サポートノート                       |
|---------------------------------------|--------------------------------------|
| [OpenTelemetry コンテキスト伝搬][1]         | [Datadog 分散ヘッダーフォーマット][9]が代わりに使用されます。 | 
| [スパンプロセッサー][2]                  | 非サポート                                          | 
| [スパンエクスポーター][3]                   | 非サポート                                            |
| トレース/スパン [ID ジェネレーター][4]         | ID の生成は `ddtrace` が行います。           |


## Datadog トレーシングライブラリを使用するための OpenTelemetry の構成

1. [OpenTelemetry Node.js Manual Instrumentation ドキュメント][5]に従って、ご希望の手動 OpenTelemetry インスツルメンテーションを Node.js コードに追加します。
2. package.json に `dd-trace` モジュールを追加します。

    ```sh
    npm install dd-trace
    ```

3. アプリケーションで `dd-trace` モジュールを初期化します。

    ```js
    const tracer = require('dd-trace').init({
      // ...
    })
    ```

4. `tracer` から `TracerProvider` を取得します。

    ```js
    const { TracerProvider } = tracer
    ```

5. `TracerProvider` を構築し、登録します。

    ```js
    const provider = new TracerProvider()
    provider.register()
    ```

6. アプリケーションを実行します。

Datadog は、これらの OpenTelemetry スパンと他の Datadog APM スパンを組み合わせて、アプリケーションの単一のトレースにします。また、[インテグレーションインスツルメンテーション][7]と [OpenTelemetry 自動インスツルメンテーション][8]もサポートしています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/js/propagation/
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/js/instrumentation/
[6]: /ja/tracing/trace_collection/dd_libraries/nodejs/#additional-configuration
[7]: /ja/tracing/trace_collection/dd_libraries/nodejs#integration-instrumentation
[8]: https://opentelemetry.io/docs/instrumentation/js/automatic/
[9]: /ja/tracing/trace_collection/trace_context_propagation/nodejs/
[10]: /ja/tracing/trace_collection/dd_libraries/nodejs/#custom-logging