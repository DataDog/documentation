---
title: カスタムインスツルメンテーション
kind: documentation
description: Datadog トレース内でインスツルメンテーションと可観測性をカスタマイズ。
aliases:
  - /ja/tracing/setup/php/manual-installation
  - /ja/agent/apm/php/manual-installation
  - /ja/tracing/guide/distributed_tracing/
  - /ja/tracing/advanced/manual_instrumentation/
  - /ja/tracing/advanced/opentracing/
  - /ja/tracing/opentracing/
  - /ja/tracing/manual_instrumentation/
  - /ja/tracing/guide/adding_metadata_to_spans
  - /ja/tracing/advanced/adding_metadata_to_spans/
  - /ja/tracing/custom_instrumentation
  - /ja/tracing/setup_overview/custom_instrumentation/undefined
further_reading:
  - link: tracing/guide/instrument_custom_method
    text: カスタムメソッドをインスツルメントして、ビジネスロジックを詳細に可視化する
  - link: tracing/connect_logs_and_traces
    text: ログとトレースの接続
  - link: tracing/opentracing
    text: アプリケーション全体に OpenTracing を実装します。
  - link: tracing/visualization/
    text: サービス、リソース、トレースの詳細
  - link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
    text: Datadog および OpenTelemetry のイニシアティブのイニシアティブについて
---
カスタムインスツルメンテーションにより、Datadog へ送信するトレースをプログラムで作成、変更、削除できます。これは、自動インスツルメンテーションでキャプチャできない社内コードのトレースや、不要なスパンのトレースからの削除、そして希望する[スパンタグ][1]の追加などスパンのより詳細な可視化とコンテキストの提供に役立ちます。

アプリケーションのインスツルメンテーション前に、Datadog の [APM 用語][2] を確認し、Datadog APM の基本理念をよく理解してください。

すでに OpenTracing または OpenTelemetry を使用している場合は、[OpenTracing と OpenTelemetry][3]を参照してください。

{{< partial name="apm/apm-manual-instrumentation.html" >}}


<br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/guide/add_span_md_and_graph_it/
[2]: /ja/tracing/visualization
[3]: /ja/tracing/setup_overview/open_standards/