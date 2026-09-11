---
algolia:
  tags:
  - APM カスタムインスツルメンテーション
further_reading:
- link: tracing/guide/instrument_custom_method
  text: カスタムメソッドをインスツルメントして、ビジネスロジックを詳細に可視化する
- link: tracing/connect_logs_and_traces
  text: ログとトレースの接続
- link: tracing/visualization/
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: Datadog および OpenTelemetry のイニシアティブのイニシアティブについて
title: カスタムインスツルメンテーション
---

## 概要

カスタムインスツルメンテーションを使用すると、アプリケーション内の特定コンポーネントを精密にモニタリングできます。自動インスツルメンテーションでは取得されない自社コードや複雑な関数から可観測性データを取得できるようになります。自動インスツルメンテーションには、[Single Step Instrumentation][5] や [Datadog のトレーシングライブラリ][6]が含まれます。

カスタムインスツルメンテーションでは、トレーシングコードをアプリケーションコードに直接埋め込みます。これにより、Datadog に送信するトレースをプログラム的に作成、修正、または削除できるようになります。

## ユースケース

カスタムインスツルメンテーションを使用するケースの例は次のとおりです。

- 独自または複雑なビジネスロジックを含むカスタムコードから可観測性データを収集する。
- スパンに[スパンタグ][1]を追加するなど、スパンに深い可視性やコンテキストを付与する。
- 細かい制御が必要な特定の一連の操作やユーザー操作を正確にモニタリングする。
- 不要なスパンをトレースから除外する。

## はじめに

はじめる前に、[Agent をインストールして設定済み][7]であることを確認してください。

カスタムインスツルメンテーションのアプローチに応じたドキュメントを参照し、詳細を確認してください。

{{< tabs >}}
{{% tab "Datadog API" %}}

Datadog API を使用してカスタムインスツルメンテーションを追加すると、Datadog に送信するトレースをプログラム的に作成、修正、削除できるようになります。これは、自動インスツルメンテーションでは取得されない自社コードのトレース、トレースからの不要なスパンの除外、そしてスパンタグの追加など、スパンに深い可視性やコンテキストを与える際に役立ちます。

{{< partial name="apm/apm-manual-instrumentation-custom.html" >}}

<br>

{{% /tab %}}

{{% tab "OpenTelemetry API" %}}

Datadog のトレーシングライブラリは、OpenTelemetry API を実装してコードをインスツルメントします。これにより、すべてのサービスをベンダーに依存しない形でインスツルメントしつつ、Datadog が提供するネイティブ実装や機能、製品を活用できます。Datadog スタイルのスパンとトレースを生成するように設定し、それらを使用言語向けの Datadog トレーシングライブラリで処理し、Datadog に送信することが可能です。

{{< partial name="apm/apm-otel-instrumentation-custom.html" >}}

<br>

{{% /tab %}}

{{% tab "OpenTracing (legacy)" %}}

[OpenTelemetry][1] や [`ddtrace`][2] のカスタムインスツルメンテーションがうまく機能しない場合、サポートされている各言語は [OpenTracing][3] データを Datadog に送信するサポートも備えています。OpenTracing はアーカイブされ、プロジェクトはサポートされていません。

{{< partial name="apm/apm-opentracing-custom.html" >}}

<br>

[1]: /ja/tracing/trace_collection/otel_instrumentation/
[2]: /ja/tracing/trace_collection/custom_instrumentation/
[3]: https://opentracing.io/docs/

{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[2]: /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/
[3]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation
[4]: /ja/tracing/trace_collection/custom_instrumentation/opentracing/
[5]: /ja/tracing/trace_collection/single-step-apm
[6]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[7]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent