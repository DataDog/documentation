---
aliases:
- /ja/opentelemetry/guide/otel_api_tracing_interoperability
further_reading:
- link: https://opentelemetry.io/docs/concepts/instrumentation/
  tag: 外部サイト
  text: OpenTelemetry インスツルメンテーション
title: アプリケーションのインスツルメンテーション
---

## 概要

Datadog は、OpenTelemetry でアプリケーションにインスツルメンテーションを行うための複数のアプローチをサポートしています。ニーズに最適な方法を選択してください:

### OpenTelemetry SDK

{{% opentelemetry/otel-sdks %}}

{{< whatsnext desc=" " >}}
    {{< nextlink href="https://opentelemetry.io/docs/languages/" >}}OpenTelemetry SDK を使用する{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry API と Datadog SDK

Datadog と OpenTelemetry を統合すると、OpenTelemetry のベンダーに依存しないインスツルメンテーションを活用しつつ、Datadog の包括的な可観測性プラットフォームを利用できます。これにより、アプリケーションおよびインフラストラクチャーからのトレースを収集・可視化・分析できます。

ベンダー中立のインスツルメンテーションを維持しながら Datadog の全機能にアクセスするために、Datadog SDK と OpenTelemetry の Tracing API を併用してください。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/api_support" >}}OpenTelemetry API と Datadog SDK を併用する{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/environment_variable_support/" >}}OpenTelemetry SDK の環境変数で Datadog SDK を構成する{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry インスツルメンテーション ライブラリ

Datadog の SDK に加えて、OpenTelemetry の [インスツルメンテーション ライブラリ][2] で可観測性を拡張しましょう。

Datadog は、Datadog のネイティブ SDK でカバーされていないフレームワークやテクノロジーに対して可観測性を提供する、OpenTelemetry 互換のインスツルメンテーション ライブラリをサポートしています。これにより、Datadog のバックエンドにデータを送信し続けながら、追加のフレームワークやライブラリにもインスツルメンテーションを適用できます。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/instrumentation_libraries/" >}}Datadog SDK と OpenTelemetry インスツルメンテーション ライブラリを併用する{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/setup/collector_exporter/
[2]: https://opentelemetry.io/docs/specs/otel/overview/#instrumentation-libraries