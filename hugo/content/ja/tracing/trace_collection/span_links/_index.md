---
description: OpenTelemetry スパンリンクを使用して、複雑な分散システムワークフローのトレース間やオペレーション間でスパンを相関付けます。
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
  text: Datadog を使用して、すべてのホスティングプランで Azure Functions を監視する
title: スパンリンク
---
{{< img src="tracing/span_links/span_links_tab_2.png" alt="スパンリンクタブ" style="width:90%;">}}

## 概要 {#overview}

スパンリンクは、[OpenTelemetry の概念][5]であり、[OpenTelemetry Tracing API][2] の一部です。Datadog は以下のスパンリンクに対応しています。

- [OpenTelemetry SDK][6] でインスツルメントされたアプリケーション。
- [Datadog SDK][9] でインスツルメントされたアプリケーション。

[スパンリンク][4]は、因果関係はあるものの典型的な親子関係を持たない 1 つ以上のスパンを相関付けます。これらのリンクは、同一トレース内または異なるトレース間でスパンを相関付けることができます。

スパンリンクは、ワークフローが直線的な実行パターンから逸脱しがちな分散システムでの操作をトレースする上で役立ちます。また、リクエストをバッチ処理したり、イベントを非同期に処理するシステムでの操作フローをトレースする上でも有用です。

Datadog は前方および後方の両方のスパンリンクをサポートしており、ユーザーは両方向のトレース間でスパンの関係を可視化およびナビゲートできます。

- 前方リンク: スパンは、同じトレースに属しているか異なるトレースに属しているかに関わらず、時間的に後に発生する別のスパンにリンクできます。これにより、トレース間で以前のオペレーションから後続のオペレーションへナビゲートできます。
- 後方リンク: 同様に、スパンは同一トレース内または異なるトレース間で時間的に前に発生したスパンにリンクできます。これにより、後のオペレーションから以前のオペレーションへトレースバックできます。

## 一般的なユースケース {#common-use-cases}

スパンリンクは、複数の操作が単一のスパンに集約されるファンインのシナリオで最も適用されます。単一のスパンは、集約される複数の操作にリンクします。

例:

- **Scatter-Gather と Map-Reduce**: ここでは、スパンリンクが複数の並列プロセスをトレースし、それらを相関させ、最終的に単一のプロセスに結び付けます。並列プロセスの結果を、集約されたアウトプットに結び付けます。

- **メッセージ集約**: Kafka Streams のようなシステムでは、スパンリンクがメッセージ群の各メッセージを集約された結果に結び付け、個々のメッセージが最終的な出力にどのように寄与しているかを示します。

- **トランザクションメッセージング**: メッセージキューのように、複数のメッセージが単一のトランザクションの一部である場合、スパンリンクが各メッセージと全体のトランザクションプロセスの関係をトレースします。

- **イベントソーシング**: イベントソーシングにおけるスパンリンクは、複数の変更メッセージがエンティティの現在の状態にどのように影響を与えたかを追跡します。

## スパンリンクの作成 {#creating-span-links}

スパンリンクの作成方法は、アプリケーションのインスツルメンテーション方法によって異なります。

### Datadog SDK {#datadog-sdk}

Python、Node.js、Go、PHP の各 SDK は、スパンリンクを追加するための API を提供しています。[Python][10]、[Node.js][11]、[Go][12]、または [PHP][1] の例を参照してください。

Java、.NET、Ruby の場合は、OpenTelemetry API を使用してスパンリンクを追加します。Datadog SDK は、OpenTelemetry API を使用して作成されたスパンリンクを Datadog に送信します。Datadog SDK で OpenTelemetry API を使用する方法については、[OpenTelemetry API によるカスタムインスツルメンテーション][13]を参照してください。スパンリンク API については、[Java][3]、[.NET][14]、または [Ruby][15] の OpenTelemetry ドキュメントを参照してください。

### OpenTelemetry SDK {#opentelemetry-sdk}

使用している言語の OpenTelemetry インスツルメンテーションドキュメントに従ってください。たとえば、[Java のスパン API][3] を参照してください。

## 最低限のサポート {#minimum-support}

**注**: このセクションでは、Datadog APM クライアントライブラリ (OpenTelemetry API 付き) を使用してスパンリンクを生成するための最低限のサポートについて説明します。OpenTelemetry SDK によって生成されたスパンリンクは、[OTLP Ingest][8] を通じて Datadog に送信されます。

[Datadog SDKs][7] を使用してスパンリンクを生成するには、Agent v7.52.0 以降が必要です。スパンリンクのサポートは、以下のリリースで導入されました。

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

[1]: /ja/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=php#adding-span-links-php
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/#link
[3]: https://opentelemetry.io/docs/languages/java/api/#span
[4]: /ja/tracing/trace_explorer/trace_view/?tab=spanlinks#more-information
[5]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[6]: https://opentelemetry.io/docs/specs/otel/trace/sdk/
[7]: https://docs.datadoghq.com/ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[8]: https://docs.datadoghq.com/ja/opentelemetry/interoperability/otlp_ingest_in_the_agent
[9]: /ja/tracing/trace_collection/custom_instrumentation/?tab=datadogapi
[10]: /ja/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=python#adding-span-links-python
[11]: /ja/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=node_js#adding-span-links-nodejs
[12]: /ja/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=go#adding-span-links-go
[13]: /ja/tracing/trace_collection/custom_instrumentation/server-side/?api_type=otel_api
[14]: https://opentelemetry.io/docs/languages/dotnet/instrumentation/#create-activities-with-links
[15]: https://opentelemetry.io/docs/languages/ruby/instrumentation/#add-span-links