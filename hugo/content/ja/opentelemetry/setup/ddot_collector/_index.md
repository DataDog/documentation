---
aliases:
- /ja/opentelemetry/agent/
description: DDOT Collector は、Datadog が構築およびサポートする OpenTelemetry コレクターです。Datadog Agent
  の有無にかかわらず、OpenTelemetry ツールを使用して Kubernetes 上にデプロイします。
further_reading:
- link: https://learn.datadoghq.com/courses/using-ddot
  tag: ラーニングセンター
  text: OpenTelemetry コレクターの Datadog ディストリビューションの使用
- link: https://www.datadoghq.com/blog/boomi-observability-opentelemetry-datadog/
  tag: ブログ
  text: OpenTelemetry と Datadog を使用して Boomi インテグレーションフローをインスツルメントおよび監視する
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: ブログ
  text: Datadog LLM Observability は OpenTelemetry GenAI セマンティック規約をネイティブにサポート
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: ブログ
  text: DDOT ゲートウェイを使用して、OpenTelemetry パイプラインを一元管理する
- link: https://www.datadoghq.com/blog/datadog-distribution-otel-collector/
  tag: ブログ
  text: DDOT Collector を使用して、OpenTelemetry と Datadog を統合する
- link: https://www.datadoghq.com/architecture/monitoring-kubernetes-with-datadog-distribution/
  tag: アーキテクチャセンター
  text: Datadog Distribution of the OpenTelemetry (DDOT) コレクターによる Kubernetes の監視
title: DDOT コレクター
---
{{< callout header="false" btn_hidden="true" >}}
DDOT コレクターはプレビュー版です。
{{< /callout >}}

## 概要 {#overview}

Datadog OpenTelemetry (DDOT) Collector は、Datadog によって構築および保守されている OpenTelemetry コレクターのオープンソースディストリビューションです。標準の OpenTelemetry 設定を使用して、テレメトリを収集、処理、ルーティングします。Datadog Agent は不要です。

{{< img src="/opentelemetry/setup/otel-ddot-collector.png" alt="Datadog SDK または OpenTelemetry SDK でインスツルメントされたアプリケーションは、OTLP を DDOT コレクターに送信し、DDOT コレクターは Datadog Exporter を使用してテレメトリを Datadog に送信します。Agent を必要とする機能のために、オプションで Datadog Agent を併用できます。" style="width:100%;" >}}

- **OpenTelemetry ツールを使用する**: OpenTelemetry Operator または Helm チャートを使用して、Kubernetes 上にコレクターをデプロイします。
- **パイプラインを設定する**: [Datadog SDK][67]、OpenTelemetry SDK、およびその他のソースからテレメトリを受信します。テレメトリを処理し、Datadog やその他の送信先にルーティングします。
- **含まれているコンポーネントから始める**: このページの厳選された [OpenTelemetry](#opentelemetry-collector-components) および [Datadog コンポーネント](#datadog-components)を使用します。
- **トラブルシューティングサポートを受ける**: Datadog サポートは、Datadog がサポートするコンポーネントのトラブルシューティングを行います。コミュニティおよびカスタムコンポーネントのカバレッジについては、[サポートレベル][57]を参照してください。

Agent を必要とする機能のために、コレクターと並行して Datadog Agent を実行できます。Agent と並行して実行される OpenTelemetry コレクターについては、[Agent のコレクター][69]を参照してください。Kubernetes 以外のプラットフォームでは、[アップストリームの OpenTelemetry コレクター][68]または [Datadog Agent][64] を使用します。

## 始める {#get-started}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/kubernetes/" >}}
    <h3>Install the DDOT Collector on Kubernetes</h3>
    Deploy and configure the Collector yourself, with the OpenTelemetry Operator or the Collector Helm chart.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/migrate/upstream_to_ddot_collector/" >}}
    <h3>Migrate from the upstream Collector</h3>
    Already run the upstream OpenTelemetry Collector? Switch it to the DDOT Collector by changing its image.
    {{< /nextlink >}}
{{< /whatsnext >}}

## 含まれているコンポーネント {#included-components}

DDOT コレクターには、このセクションに記載されている OpenTelemetry コレクターコンポーネントが含まれています。他のコンポーネントを使用して Agent のコレクターをビルドするには、[Agent のコレクターにコンポーネントを追加する][2] を参照してください。

### サポートレベル {#support-levels}

Datadog、コミュニティ、およびカスタムコンポーネントサポートの詳細については、互換性ページの[サポートレベル][57]を参照してください。

### OpenTelemetry コレクターコンポーネント {#opentelemetry-collector-components}

デフォルトでは、DDOT コレクターにはこれらのコンポーネントが含まれています。このリストは DDOT 7.85 と一致します。アップストリームコンポーネントは [DDOT 7.85.3 のマニフェスト][11] にも記載されています。このマニフェストには、Datadog が個別にビルドする Datadog Exporter と Datadog Connector は記載されていません。

{{% collapse-content title="レシーバー" level="p" %}}

- [dockerstatsreceiver][58] (バージョン 7.56.0 以降で利用可能)
- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [httpcheckreceiver][73] (バージョン 7.85.0 以降で利用可能)
- [jaegerreceiver][19]
- [k8sclusterreceiver][70]
- [k8seventsreceiver][74] (バージョン 7.85.0 以降で利用可能)
- [k8sobjectsreceiver][59] (バージョン 7.56.0 以降で利用可能)
- [kafkareceiver][75] (バージョン 7.85.0 以降で利用可能)
- [kubeletstatsreceiver][60] (バージョン 7.56.0 以降で利用可能)
- [otlpreceiver][20]
- [podmanreceiver][61] (バージョン 7.56.0 以降で利用可能)
- [prometheusreceiver][21]
- [receivercreator][22]
- [zipkinreceiver][23]
- [nopreceiver][24]

{{% /collapse-content %}}

{{% collapse-content title="プロセッサー" level="p" %}}

- [attributesprocessor][25]
- [batchprocessor][26]
- [cumulativetodeltaprocessor][27]
- [deltatorateprocessor][76] (バージョン 7.85.0 以降で利用可能)
- [filterprocessor][28]
- [groupbyattrsprocessor][29]
- [k8sattributesprocessor][30]
- [memorylimiterprocessor][31]
- [probabilisticsamplerprocessor][32]
- [resourcedetectionprocessor][33]
- [resourceprocessor][34]
- [tailsamplingprocessor][36]
- [transformprocessor][37]

`routingprocessor` はバージョン 7.71.0 で削除されました。代わりに [routingconnector][56] を使用してください。

{{% /collapse-content %}}

{{% collapse-content title="エクスポーター" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [loadbalancingexporter][55]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="コネクタ" level="p" %}}

- [countconnector][71]
- [datadogconnector][44]
- [routingconnector][56] (バージョン 7.68.0 以降で利用可能)
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="拡張" level="p" %}}

- [datadogextension][62] (バージョン 7.72.0 以降で利用可能)
- [healthcheckextension][46]
- [k8sleaderelector][72]
- [observer][47]
- [pprofextension][48]
- [storage/filestorage][63] (バージョン 7.56.0 以降で利用可能)
- [zpagesextension][49]

{{% /collapse-content %}}

### Datadog コンポーネント {#datadog-components}

標準の OpenTelemetry コンポーネントに加えて、Datadog は以下のカスタムコンポーネントを提供および維持しています。

{{% collapse-content title="Datadog コンポーネント" level="p" %}}

- [インフラストラクチャー属性プロセッサー][50]: Pod または Pod 内のコンテナからの OTLP テレメトリ (メトリクス、トレース、ログ) に [Kubernetes タグ][53]を割り当てる OpenTelemetry プロセッサーコンポーネントです。Datadog はこれらのタグを使用して、テレメトリと Kubernetes インフラストラクチャーを相関付けます。`service`、`env`、および `version` の設定方法については、[unified service tagging][54] を参照してください。

- [コンバーター][51]: ユーザー提供の構成を強化する OpenTelemetry コンバーターコンポーネントです。元の構成と強化された構成の両方を返す API を提供し、既知の誤設定を自動的にチェックしてエラーを減らします。


{{% /collapse-content %}}

DDOT コレクターと Agent のコレクターには、どちらにも [DD フレア拡張機能][52] が含まれています。Agent のコレクターでは、この拡張機能によってコレクターの診断情報が Agent フレアに追加されます。

## OpenTelemetry コレクターバージョン {#opentelemetry-collector-versions}

各 DDOT リリースには、以下の OpenTelemetry コレクターバージョンが含まれます。

| DDOT バージョン | ベータ版 | 安定版 |
|--------------|--------------|----------------|
| 7.85.x       | v0.159.0     | v1.65.0        |
| 7.84.x       | v0.159.0     | v1.65.0        |
| 7.83.x       | v0.158.0     | v1.64.0        |
| 7.82.x       | v0.155.0     | v1.61.0        |
| 7.81.x       | v0.154.0     | v1.60.0        |

{{% collapse-content title="以前のバージョン" level="p" %}}

| DDOT バージョン | ベータ版 | 安定版 |
|--------------|--------------|----------------|
| 7.80.x       | v0.152.0     | v1.58.0        |
| 7.79.x       | v0.150.0     | v1.56.0        |
| 7.78.x       | v0.147.0     | v1.53.0        |
| 7.77.x       | v0.145.0     | v1.51.0        |
| 7.76.x       | v0.144.0     | v1.50.0        |
| 7.75.x       | v0.142.0     | v1.48.0        |
| 7.74.x       | v0.140.0     | v1.46.0        |
| 7.73.x       | v0.138.0     | v1.44.0        |
| 7.72.x       | v0.136.0     | v1.42.0        |
| 7.71.x       | v0.133.0     | v1.39.0        |
| 7.70.x       | v0.131.0     | v1.37.0        |
| 7.69.x       | v0.129.0     | v1.35.0        |

{{% /collapse-content %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/opentelemetry/setup/ddot_collector/custom_components
[11]: https://github.com/DataDog/datadog-agent/blob/7.85.3/comp/otelcol/collector-contrib/impl/manifest.yaml
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/filelogreceiver/README.md
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/fluentforwardreceiver/README.md
[18]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md
[19]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jaegerreceiver/README.md
[20]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/README.md
[21]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/prometheusreceiver/README.md
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/receivercreator/README.md
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/zipkinreceiver/README.md
[24]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/nopreceiver#readme
[25]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md
[26]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[27]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/cumulativetodeltaprocessor/README.md
[28]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/groupbyattrsprocessor/README.md
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[31]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/memorylimiterprocessor/README.md
[32]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[33]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[34]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourceprocessor/README.md
[36]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[37]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md
[38]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[39]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/debugexporter/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md
[41]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlphttpexporter/README.md
[43]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/nopexporter/README.md
[44]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[45]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/spanmetricsconnector/README.md
[46]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/healthcheckextension/README.md
[47]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/observer/README.md
[48]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/pprofextension/README.md
[49]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/zpagesextension/README.md
[50]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[51]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/converter#readme
[52]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/ddflareextension#readme
[53]: /ja/containers/kubernetes/tag/?tab=datadogoperator#out-of-the-box-tags
[54]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[55]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/loadbalancingexporter/README.md
[56]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/routingconnector/README.md
[57]: /ja/opentelemetry/compatibility/#support-levels
[58]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/README.md
[59]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8sobjectsreceiver/README.md
[60]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kubeletstatsreceiver/README.md
[61]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/podmanreceiver/README.md
[62]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/datadogextension/README.md
[63]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/storage/filestorage/README.md
[64]: /ja/opentelemetry/setup/agent/
[67]: /ja/opentelemetry/instrument/dd_sdks/otlp_trace_export/
[68]: /ja/opentelemetry/setup/collector_exporter/
[69]: /ja/opentelemetry/setup/agent/#agents-collector
[70]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8sclusterreceiver/README.md
[71]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/countconnector/README.md
[72]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/k8sleaderelector/README.md
[73]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/httpcheckreceiver/README.md
[74]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8seventsreceiver/README.md
[75]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkareceiver/README.md
[76]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/deltatorateprocessor/README.md