---
description: OpenTelemetry スパンリンクを使用して、複雑な分散システムワークフローにおいて、トレースやオペレーションをまたがるスパン同士を関連付けます。
further_reading:
- link: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
  tag: ドキュメント
  text: OpenTelemetry スパンリンク
- link: /tracing/trace_collection/otel_instrumentation/
  tag: ドキュメント
  text: OpenTelemetry API を使ったカスタムインスツルメンテーション
- link: /tracing/trace_collection/custom_instrumentation/
  tag: ドキュメント
  text: Datadog ライブラリを使ったカスタムインスツルメンテーション
- link: https://www.datadoghq.com/blog/monitor-azure-functions-hosting-plans/
  tag: ブログ
  text: Datadog を使用して、すべてのホスティングプランで Azure Functions を監視します。
title: スパンリンク
---
{{< img src="tracing/span_links/span_links_tab_2.png" alt="スパンリンクタブ" style="width:90%;">}}

## 概要 {#overview}

スパンリンクは、[OpenTelemetry の概念][5]であり、[OpenTelemetry Tracing API][2] の一部です。Datadog は以下のスパンリンクをサポートしています。

- [OpenTelemetry SDK][6] でインスツルメンテーションされたアプリケーション。
- [Datadog SDK][9] でインスツルメンテーションされたアプリケーション。

スパンリンクは、因果関係はあるが、典型的な親子関係を持たない 1 つ以上のスパンを相関付けます。これらのリンクは、同じトレース内または異なるトレース間のスパンを相関付けることができます。

スパンリンクは、ワークフローが線形実行パターンから逸脱することが多い分散システムにおけるオペレーションのトレースに役立ちます。これらは、リクエストをバッチで実行したり、イベントを非同期に処理したりするシステムにおけるオペレーションの流れをトレースするのに便利です。

Datadog は前方および後方の両方のスパンリンクをサポートしており、ユーザーは両方向のトレース間でスパンの関係を可視化し、ナビゲートできます。

- 前方リンク: スパンは、同じトレースに属しているか異なるトレースに属しているかに関わらず、時間的に後に発生する別のスパンにリンクできます。これにより、トレースをまたいで以前のオペレーションから後続のオペレーションへナビゲートできます。
- 後方リンク: 同様に、スパンは、同じトレース内または異なるトレース間で、時間的に前に発生したスパンにリンクできます。これにより、後のオペレーションから以前のオペレーションへトレースすることができます。

## 一般的なユースケース {#common-use-cases}

スパンリンクは、複数のオペレーションが単一のスパンに収束するファンインシナリオで最も適用されます。単一のスパンは、収束する複数のオペレーションにリンクします。

例えば、以下のようになります。

- **Scatter-Gather および Map-Reduce**: ここでは、スパンリンクが、単一の結合されたプロセスに収束する複数の並列プロセスをトレースし、相関付けます。スパンリンクは、これらの並列プロセスの結果を、それらの集合的な成果に結びつけます。

- **メッセージ集約**: Kafka Streams のようなシステムでは、スパンリンクがメッセージ群の各メッセージを集約された結果に結びつけ、個々のメッセージが最終的な出力にどのように寄与しているかを示します。

- **トランザクションメッセージング**: メッセージキューのように、複数のメッセージが単一のトランザクションの一部である場合、スパンリンクが各メッセージと全体のトランザクションプロセスの関係をトレースします。

- **イベントソーシング**: イベントソーシングにおけるスパンリンクは、複数の変更メッセージがエンティティの現在の状態にどのように影響を与えたかを追跡します。

## スパンリンクの作成 {#creating-span-links}

アプリケーションが、

- OpenTelemetry SDK については、お使いの言語の OpenTelemetry 手動インスツルメンテーションのドキュメントに従ってください。例えば、[Create spans with links for Java][3] を参照してください。
- Datadog SDK については、[Adding span links][1] の例に従ってください。

## 最低限のサポート {#minimum-support}

**注***: このセクションでは、Datadog APM クライアントライブラリ（OpenTelemetry API を使用）でスパンリンクを生成するための最低限のサポートについて説明します。OpenTelemetry SDK によって生成されたスパンリンクは、[OTLP Ingest][8] を通じて Datadog に送信されます。

[Datadog SDK][7] を使用してスパンリンクを生成するには、Agent v7.52.0 以降が必要です。スパンリンクのサポートは、以下のリリースで導入されました。

| 言語  | 最小 SDK バージョン |
|-----------|---------------------------------|
| C++/Proxy | 未サポート               |
| Go        | 1.61.0                          |
| Java      | 1.26.0                          |
| .NET      | 2.53.0                          |
| Node      | 5.3.0                           |
| PHP       | 0.97.0                          |
| Python    | 2.5.0                           |
| Ruby      | 2.0.0                           |

## スパンリンクの表示 {#viewing-span-links}

Datadog の [Trace Explorer][4] からスパンリンクを表示できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/custom_instrumentation/php/#adding-span-links
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/#link
[3]: https://opentelemetry.io/docs/instrumentation/java/manual/#create-spans-with-links
[4]: /ja/tracing/trace_explorer/trace_view/?tab=spanlinks#more-information
[5]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[6]: https://opentelemetry.io/docs/specs/otel/trace/sdk/
[7]: https://docs.datadoghq.com/ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[8]: https://docs.datadoghq.com/ja/opentelemetry/interoperability/otlp_ingest_in_the_agent
[9]: /ja/tracing/trace_collection/custom_instrumentation/?tab=datadogapi