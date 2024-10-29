---
further_reading:
- link: https://opentelemetry.io/docs/concepts/
  tag: 外部サイト
  text: OpenTelemetry の概念
- link: https://opentelemetry.io/docs/concepts/glossary/
  tag: 外部サイト
  text: OpenTelemetry 用語集
- link: https://docs.datadoghq.com/glossary/
  tag: ドキュメント
  text: Datadog 用語集
title: OpenTelemetry の用語と概念
---

このページでは、OpenTelemetry と Datadog の重要な用語と概念について説明します。追加の定義と説明については、[OpenTelemetry 用語集][6]を参照してください。

| コンセプト                      | 説明                                                                                                                                                                                                                                                               |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| テレメトリー                    | アプリケーションおよびインフラストラクチャーの動作とパフォーマンスに関する観察を提供するメトリクス、ログ、トレースの集合。                                                                                                                             |
| [OpenTelemetry Collector][1] | 多くのプロセスによって生成されたテレメトリーデータを収集およびエクスポートするためのベンダーに依存しない実装。テレメトリーを受信、処理、およびストレージバックエンドや分析ツールを含む 1 つ以上の宛先にエクスポートするように構成できます。                      |
| [Datadog Exporter][2]        | OpenTelemetry SDK から Datadog へトレース、メトリクス、ログデータを転送できるコンポーネント。                                                                                                                                                                     |
| [OTLP Receiver][3]           | OpenTelemetry Collector 内のコンポーネントで、OpenTelemetry プロトコル (OTLP) 形式のテレメトリーデータを受け入れる役割を持ちます。OTLP は OpenTelemetry のネイティブプロトコルであり、SDK と Collector 間でテレメトリーデータを転送するために設計されています。 |
| [コンテキスト伝播][4]     | 分散型トレーシングでトレースコンテキストを異なるサービス間で維持するために使用されるメカニズム。                                                                                                                                                                            |
| [セマンティック規約][5]    | OpenTelemetry は、さまざまな種類のデータの名前を指定するための多くのセマンティック規約を使用します。                                                                                                                                                               |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/collector_exporter/
[2]: /ja/opentelemetry/collector_exporter/otel_collector_datadog_exporter/
[3]: /ja/opentelemetry/collector_exporter/otlp_receiver/
[4]: /ja/opentelemetry/interoperability/
[5]: /ja/opentelemetry/schema_semantics/semantic_mapping/
[6]: https://opentelemetry.io/docs/concepts/glossary/