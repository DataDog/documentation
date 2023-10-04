---
code_lang: go
code_lang_weight: 30
description: OpenTelemetry API で Go アプリケーションをインスツルメンテーションし、Datadog にトレースを送信します
further_reading:
- link: tracing/glossary/
  tag: Documentation
  text: サービス、リソース、トレースの詳細
kind: documentation
title: OpenTelemetry API を使った Go アプリケーションのカスタムインスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation %}}

## 要件と制限

- Datadog Go トレースライブラリ `dd-trace-go` バージョン 1.5.0 以上。
- Go バージョン 1.18 以上。
- Datadog OpenTelemetry API の実装は、アップストリーム [OpenTelemetry Go][6] に依存しています。

特記されている通り、以下の OpenTelemetry 機能は、Datadog ライブラリに実装されています。

| 機能                               | サポートノート                       |
|---------------------------------------|------------------------------------|
| [OpenTelemetry コンテキスト伝搬][1]         | [Datadog 分散ヘッダーフォーマット][9]が代わりに使用されます。 |
| [スパンプロセッサー][2]                  | 非サポート                                          |
| [スパンエクスポーター][3]                   | 非サポート                                            |
| トレース/スパン [ID ジェネレーター][4]         | ID の生成は `ddtrace` が行います。           |


## Datadog トレースプロバイダーを使用するための OpenTelemetry の構成

1. [OpenTelemetry Go Manual Instrumentation ドキュメント][5]に従って、ご希望の手動 OpenTelemetry インスツルメンテーションを Go コードに追加します。

2. OpenTelemetry パッケージ `go.opentelemetry.io/otel` を以下のコマンドでインストールします。

   ```shell
   go get go.opentelemetry.io/otel
   ```

3. Datadog OpenTelemetry のラッパーパッケージ `gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry` を、以下のコマンドでインストールします。

   ```shell
   go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry
   ```

4. コードでパッケージをインポートします。

   ```go
   import (
     "go.opentelemetry.io/otel"
     ddotel "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry"
   )
   ```

5. TracerProvider を作成し、オプションとして Datadog APM 固有のオプションを提供し、トレーサーを停止させる Shutdown メソッドを延期します。

   ```go
   provider := ddotel.NewTracerProvider()
   defer provider.Shutdown()
   ```

6. OpenTelemetry API でトレーサープロバイダーのインスタンスを使用し、グローバルな TracerProvider を設定します。

   ```go
   otel.SetTracerProvider(provider)
   ```

7. アプリケーションを実行します。

Datadog は、これらの OpenTelemetry スパンと他の Datadog APM スパンを組み合わせて、アプリケーションの単一のトレースにします。


[1]: https://opentelemetry.io/docs/instrumentation/go/manual/#propagators-and-context
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/go/manual/
[6]: https://opentelemetry.io/docs/instrumentation/go/
[9]: /ja/tracing/trace_collection/trace_context_propagation/go/