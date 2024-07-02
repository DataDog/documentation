---
title: Custom Instrumentation with Datadog Libraries
type: multi-code-lang
description: 'Customize your instrumentation and observability within your Datadog traces.'
aliases:
    - /tracing/setup/php/manual-installation
    - /agent/apm/php/manual-installation
    - /tracing/guide/distributed_tracing/
    - /tracing/advanced/manual_instrumentation/
    - /tracing/advanced/opentracing/
    - /tracing/opentracing/
    - /tracing/manual_instrumentation/
    - /tracing/guide/adding_metadata_to_spans
    - /tracing/advanced/adding_metadata_to_spans/
    - /tracing/custom_instrumentation
    - /tracing/setup_overview/custom_instrumentation/undefined
    - /tracing/setup_overview/custom_instrumentation/
further_reading:
    - link: tracing/guide/instrument_custom_method
      text: Instrument a custom method to get deep visibility into your business logic
    - link: tracing/connect_logs_and_traces
      text: Connect your Logs and Traces together
    - link: tracing/visualization/
      text: Explore your services, resources, and traces
    - link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
      text: Learn More about Datadog and the OpenTelemetry initiative
algolia:
  tags: [apm custom instrumentation]
---

カスタムインスツルメンテーションにより、Datadog へ送信するトレースをプログラムで作成、変更、削除できます。これは、自動インスツルメンテーションでキャプチャできない社内コードのトレースや、不要なスパンのトレースからの削除、そして希望するスパンタグの追加などスパンのより詳細な可視化とコンテキストの提供に役立ちます。

アプリケーションのインスツルメンテーション前に、Datadog の [APM 用語][2] を確認し、Datadog APM の基本理念をよく理解してください。

オープンスタンダードを利用してインスツルメンテーションを行う場合は、[OpenTracing によるインスツルメンテーション][3]、[OpenTelemetry によるインスツルメンテーション][4]をご参照ください。

{{< partial name="apm/apm-manual-instrumentation.html" >}}


<br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[2]: /tracing/glossary
[3]: /tracing/trace_collection/opentracing/
[4]: /tracing/trace_collection/otel_instrumentation
