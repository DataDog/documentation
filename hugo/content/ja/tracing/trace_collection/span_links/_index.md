---
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
title: スパンリンク
---

{{< img src="tracing/span_links/span_links_tab_2.png" alt="Span Links タブ" style="width:90%;">}}

## 概要

スパンリンクは、[OpenTelemetry の概念][5]であり、[OpenTelemetry Tracing API][2] の一部です。Datadog は以下のアプリケーションのスパンリンクをサポートしています。

- [OpenTelemetry SDK][6] でインスツルメンテーションされたアプリケーション
- [Datadog SDK][9] によりインスツルメントされたアプリケーション。

スパンリンクは、因果関係があるものの典型的な親子関係ではない 1 つ以上のスパンを相関付けます。これらのリンクは、同一トレース内または異なるトレース間でスパンを相関付けることができます。

スパンリンクは、ワークフローが直線的な実行パターンから逸脱しがちな分散システムでの操作をトレースするのに役立ちます。また、リクエストをバッチ処理したり、イベントを非同期に処理するシステムでの操作フローをトレースするのにも有用です。

Datadog は、フォワード リンクとバックワード リンクの両方のスパン リンクをサポートしており、ユーザーは双方向にトレースをまたいだスパン間の関係を可視化し、ナビゲートできます。

- フォワード リンク: スパンは、同一トレース内でも別のトレースでも、後の時点に発生する別のスパンにリンクできます。これにより、より早い処理から後続の処理へ、トレースをまたいで移動できます。
- バックワード リンク: 同様に、スパンは、同一トレース内でも別のトレースでも、より前の時点に発生したスパンにリンクできます。これにより、後段の処理から過去の処理へさかのぼることができます。

## 一般的な使用例

スパンリンクは、複数の操作が単一のスパンに集約されるファンインのシナリオで最も適用されます。単一のスパンは、集約される複数の操作にリンクします。

例:

- **Scatter-Gather と Map-Reduce**: ここでは、スパンリンクが複数の並列プロセスをトレースし、それらを相関させ、最終的に単一のプロセスに結びつけます。並列プロセスの結果を、集約されたアウトプットに結び付けます。

- **メッセージ集約**: Kafka Streams のようなシステムでは、スパンリンクがメッセージ群の各メッセージを集約された結果に結びつけ、個々のメッセージが最終的な出力にどのように寄与しているかを示します。

- **トランザクションメッセージング**: メッセージキューのように、複数のメッセージが単一のトランザクションの一部である場合、スパンリンクが各メッセージと全体のトランザクションプロセスの関係をトレースします。

- **イベントソーシング**: イベントソーシングにおけるスパンリンクは、複数の変更メッセージがエンティティの現在の状態にどのように影響を与えたかを追跡します。

## スパンリンクの作成

アプリケーションが、

- OpenTelemetry SDK でインスツルメンテーションされている場合、使用する言語に応じて OpenTelemetry の手動インスツルメンテーションドキュメントに従ってください。例えば、[Java 用のリンク付きスパンの作成][3]を参照してください。
- Datadog SDK を使用している場合は、[スパン リンクの追加][1] の例に従ってください。

## 最低限のサポート

**注**: このセクションでは、Datadog APM クライアントライブラリ (OpenTelemetry API 付き) を使用してスパンリンクを生成するための最低限のサポートについて説明します。OpenTelemetry SDK によって生成されたスパンリンクは、[OTLP Ingest][8] を通じて Datadog に送信されます。

[Datadog トレーシングライブラリ][7]を使用してスパンリンクを生成するには、Agent v7.52.0 以降が必要です。スパンリンクのサポートは以下のリリースで導入されました。

| 言語  | トレーシングライブラリの最低バージョン |
|-----------|---------------------------------|
| C++/Proxy | 未サポート               |
| Go        | 1.61.0                          |
| Java      | 1.26.0                          |
| .NET      | 2.53.0                          |
| Node      | 5.3.0                           |
| PHP       | 0.97.0                          |
| Python    | 2.5.0                           |
| Ruby      | 2.0.0                           |

## スパンリンクの表示

Datadog の [Trace Explorer][4] からスパンリンクを表示できます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/custom_instrumentation/php/#adding-span-links-beta
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/#link
[3]: https://opentelemetry.io/docs/instrumentation/java/manual/#create-spans-with-links
[4]: /ja/tracing/trace_explorer/trace_view/?tab=spanlinksbeta#more-information
[5]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[6]: https://opentelemetry.io/docs/specs/otel/trace/sdk/
[7]: https://docs.datadoghq.com/ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[8]: https://docs.datadoghq.com/ja/opentelemetry/interoperability/otlp_ingest_in_the_agent
[9]: /ja/tracing/trace_collection/custom_instrumentation/?tab=datadogapi