---
algolia:
  tags:
  - APM カスタムインスツルメンテーション
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
- /ja/tracing/setup_overview/custom_instrumentation/
description: Datadog トレース内でインスツルメンテーションと可観測性をカスタマイズ。
further_reading:
- link: tracing/guide/instrument_custom_method
  text: カスタムメソッドをインスツルメントして、ビジネスロジックを詳細に可視化する
- link: tracing/connect_logs_and_traces
  text: ログとトレースの接続
- link: tracing/visualization/
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: Datadog および OpenTelemetry のイニシアティブのイニシアティブについて
title: Datadog ライブラリを使ったカスタムインスツルメンテーション
type: multi-code-lang
---

カスタムインスツルメンテーションにより、Datadog へ送信するトレースをプログラムで作成、変更、削除できます。これは、自動インスツルメンテーションでキャプチャできない社内コードのトレースや、不要なスパンのトレースからの削除、そして希望するスパンタグの追加などスパンのより詳細な可視化とコンテキストの提供に役立ちます。

アプリケーションのインスツルメンテーション前に、Datadog の [APM 用語][2] を確認し、Datadog APM の基本理念をよく理解してください。

オープンスタンダードを利用してインスツルメンテーションを行う場合は、[OpenTracing によるインスツルメンテーション][3]、[OpenTelemetry によるインスツルメンテーション][4]をご参照ください。

{{< partial name="apm/apm-manual-instrumentation.html" >}}


<br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[2]: /ja/tracing/glossary
[3]: /ja/tracing/trace_collection/opentracing/
[4]: /ja/tracing/trace_collection/otel_instrumentation