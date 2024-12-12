---
algolia:
  tags:
  - otel カスタムインスツルメンテーション
further_reading:
- link: tracing/guide/instrument_custom_method
  text: カスタムメソッドをインスツルメントして、ビジネスロジックを詳細に可視化する
- link: tracing/connect_logs_and_traces
  text: ログとトレースの接続
- link: tracing/visualization/
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: Datadog および OpenTelemetry のイニシアティブのイニシアティブについて
title: OpenTelemetry API Support
---

Datadog トレーシングライブラリは、コードのインスツルメンテーション用に OpenTelemetry API の実装を提供します。これは、Datadog のネイティブな実装、機能、製品を利用しながら、すべてのサービスのインスツルメンテーションをベンダーニュートラルに維持できることを意味します。Datadog スタイルのスパンやトレースを生成して、お使いの言語の Datadog のトレーシングライブラリで処理し、Datadog に送信するように構成することができます。

詳しくは、各言語のリンク先をご覧ください。

{{< partial name="apm/otel-instrumentation.html" >}}

<br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}