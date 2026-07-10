---
aliases:
- /ja/opentelemetry/agent/
further_reading:
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: ブログ
  text: Datadog LLM Observability は、OpenTelemetry GenAI セマンティック規約をネイティブにサポートしています
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: ブログ
  text: DDOT ゲートウェイを使用して、OpenTelemetry パイプラインを一元管理します
- link: https://www.datadoghq.com/blog/datadog-distribution-otel-collector/
  tag: ブログ
  text: DDOT Collector を使用して、OpenTelemetry と Datadog を統合します
- link: https://learn.datadoghq.com/courses/using-ddot
  tag: ラーニングセンター
  text: OpenTelemetry Collector の Datadog ディストリビューションの使用
title: OpenTelemetry Collector の Datadog ディストリビューション
---
{{< callout btn_hidden="true" >}}
Kubernetes 用の DDOT コレクターは <strong>一般提供</strong>されています。<a href="#get-started">以下の手順</a>に従って開始できます。
<br><br>
Linux ベースのベアメタルホストおよび仮想マシンへの DDOT コレクターのデプロイは<strong>プレビュー段階</strong>です。始めるには、<a href="/opentelemetry/setup/ddot_collector/install/linux">Linux ドキュメント</a>に従ってください。
{{< /callout >}}

## 概要 {#overview}

OpenTelemetry (DDOT) コレクターの Datadog ディストリビューションは、OpenTelemetry (OTel) の柔軟性と Datadog の包括的な監視可能性機能を組み合わせたオープンソースソリューションです。この統合ソリューションには、以下の機能が含まれます。

- Datadog でのパフォーマンスと信頼性向けに最適化された、[OpenTelemetry components](#included-components) の厳選されたセット。任意のコンポーネントを追加することができます
- シームレスな統合と堅牢なモニタリングを実現する、Datadog Agent の完全なデータ収集と処理機能。[Datadog Fleet Automation][9] の DDOT Collector 向けのサポートも含まれます ([Key benefits](#key-benefits) を参照してください)
- [Custom Datadog components](#custom-datadog-components)。最高のオンボーディング体験を提供するためのものです

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Datadog Agent に組み込まれた DDOT コレクターのアーキテクチャ概要。" style="width:100%;" >}}

## 主な利点 {#key-benefits}

DDOT コレクターは、以下の機能を提供します。

### 包括的な監視可能性 {#comprehensive-observability}

- アクセス {{< translate key="integration_count" >}} Datadog のインテグレーション、[Live Container Monitoring][3]、[Cloud Network Monitoring][7]、および [Universal Service Monitoring][5] (eBPF を使用) など
- OpenTelemetry コミュニティが提供するインテグレーションを活用して、OpenTelemetry Protocol (OTLP) ネイティブフォーマットでテレメトリを収集
- コレクターの処理およびルーティング機能で OTLP データを制御

### シンプルなフリート管理{#simplified-fleet-management}

- [Datadog Fleet Automation][9] を使用して、DDOT コレクターのフリートをリモートで管理
- 構成、依存関係、およびランタイム環境全体を可視化
- OTLP データに対するすぐに使えるタグ付けの拡充により、[unified service tagging][1] が自動的に有効化され、より迅速にオンボーディングを行うことが可能

### エンタープライズレベルの信頼性とリソース{#enterprise-reliability-and-resources}

- 定期的な脆弱性スキャンと分析を含む、Datadog の堅牢なセキュリティ対策の恩恵を受ける
- オンボーディングやトラブルシューティングの支援のために、Datadog のグローバルサポートチームを利用可能

## 含まれているコンポーネント{#included-components}

<div class="alert alert-info">
  <strong>追加の OpenTelemetry コンポーネントが必要ですか？</strong>デフォルトパッケージに含まれているコンポーネントを超えるコンポーネントが必要な場合は、<a href="/opentelemetry/setup/ddot_collector/custom_components">カスタム OpenTelemetry コンポーネントの使用</a>に従って、Datadog Agent の機能を拡張してください。デフォルトで含まれているコンポーネントのリストについては、以下の <a href="#opentelemetry-collector-components">OpenTelemetry Collector コンポーネント</a>セクションを参照してください。
</div>

### OpenTelemetry Collector バージョン{#opentelemetry-collector-versions}

以下のテーブルは、各 DDOT リリースに含まれる OpenTelemetry Collector のバージョンを示しています。

| DDOT バージョン | ベータ版 | 安定版 |
|---|---|---|
| 7.78.0 | v0.147.0 | v1.53.0 |
| 7.77.0 | v0.145.0 | v1.51.1-0.20260205185216-81bc641f26c0 |
| 7.76.0 | v0.144.0 | v1.50.0 |
| 7.75.0 | v0.142.0 | v1.48.0 |
| 7.74.0 | v0.140.0 | v1.46.0 |
| 7.73.0 | v0.138.0 | v1.44.0 |
| 7.72.0 | v0.136.0 | v1.42.0 |
| 7.71.0 | v0.133.0 | v1.39.0 |
| 7.70.0 | v0.131.0 | v1.37.0 |
| 7.69.0 | v0.129.0 | v1.35.0 |

### サポートレベル{#support-levels}

Datadog、コミュニティ、およびカスタムコンポーネントのサポートの詳細については、互換性ページの [サポートレベル][57] を参照してください。

### OpenTelemetry Collector コンポーネント{#opentelemetry-collector-components}

デフォルトでは、DDOT コレクターには以下のコレクターコンポーネントが付属しています。[YAML format][11] のリストもご覧いただけます。

{{% collapse-content title="レシーバー" level="p" %}}

- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [jaegerreceiver][19]
- [otlpreceiver][20]
- [prometheusreceiver][21]
- [receivercreator][22]
- [zipkinreceiver][23]
- [nopreceiver][24]

{{% /collapse-content %}}

{{% collapse-content title="プロセッサー" level="p" %}}

- [attributesprocessor][25]
- [batchprocessor][26]
- [cumulativetodeltaprocessor][27]
- [filterprocessor][28]
- [groupbyattributeprocessor][29]
- [k8sattributesprocessor][30]
- [memorylimiterprocessor][31]
- [probabilisticsamplerprocessor][32]
- [resourcedetectionprocessor][33]
- [resourceprocessor][34]
- routingprocessor (非推奨で、v7.71.0 で削除されました。代わりに [routingconnector][56] を使用してください)
- [tailsamplingprocessor][36]
- [transformprocessor][37]

{{% /collapse-content %}}

{{% collapse-content title="エクスポーター" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [loadbalancingexporter][55]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [sapmexporter][42]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="コネクタ" level="p" %}}

- [datadogconnector][44]
- [routingconnector][56] (バージョン 7.68.0 以降利用可能)
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="拡張" level="p" %}}

- [healthcheckextension][46]
- [observer][47]
- [pprofextension][48]
- [zpagesextension][49]

{{% /collapse-content %}}

### カスタム Datadog コンポーネント {#custom-datadog-components}

標準の OpenTelemetry コンポーネントに加えて、Datadog は以下のカスタムコンポーネントを提供および維持しています。

{{% collapse-content title="Datadog コンポーネント" level="p" %}}

- [Infrastructure Attribute Processor][50]: OpenTelemetry プロセッサーコンポーネントで、Pod または Pod 内の個々のコンテナから出力される OTLP テレメトリ (メトリクス、トレース、ログ) に [Kubernetes タグ][53] を自動的に割り当てます。このコンポーネントにより、Kubernetes 環境の監視のための [unified service tagging][54] とテレメトリの相関が可能になります。

- [Converter][51]: ユーザー提供の構成を強化する OpenTelemetry コンバータコンポーネントです。元の構成と強化された構成の両方を返す API を提供し、既知の誤設定を自動的にチェックしてエラーを減らします。これにより、既存の OpenTelemetry Collector 構成とエージェントのシームレスな統合が保証されます。

- [DD Flare Extension][52]: トラブルシューティングの目的で、DDOT Collector とエージェントの両方からの診断情報を含むエージェントフレアを生成するための OpenTelemetry 拡張コンポーネントです。

{{% /collapse-content %}}

## 始める {#get-started}

Datadog を初めてご利用になる場合でも、OpenTelemetry に精通している場合でも、以下のガイドはお客様の状況に合わせてご利用いただけます。

### デフォルトの Agent パッケージを使用したクイックスタート {#quick-start-with-the-default-agent-package}

デフォルトの Datadog Agent パッケージには、ほとんどのニーズに即座に対応するように設計された [OpenTelemetry コンポーネントの厳選されたセット](#included-components)を備えた DDOT コレクターが含まれています。このガイドは、次のような方に適しています。

- [含まれているコンポーネント](#included-components)以外の OpenTelemetry コンポーネントを必要とせずに、ゼロからモニタリングをセットアップする方。
- Datadog Agent を使用しており、含まれているコンポーネントで OpenTelemetry 機能をテストしたい方。
- デフォルトで含まれるコンポーネント以外を必要とせずに、OpenTelemetry Collector から Datadog Agent へ移行する方。
- (オプション) デフォルトのパッケージで提供されるもの以外の OpenTelemetry コンポーネントが必要な場合は、[カスタム OpenTelemetry コンポーネントを使用する][2] に従って、Datadog Agent の機能を拡張してください。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/kubernetes" >}}デフォルトの Agent パッケージを使用したクイックスタート{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry Collector から Datadog Agent への移行 {#migrate-from-opentelemetry-collector-to-datadog-agent}

このガイドは、追加の OpenTelemetry コンポーネントが必要なシナリオを含め、既存の OpenTelemetry Collector のセットアップから Datadog Agent への移行をサポートします。このガイドは、次のような方に適しています。

- 既存のセットアップを維持したまま、OpenTelemetry Collector から移行する方。
- 既存の OpenTelemetry 構成を移行して、継続性を維持する方。
- (オプション) デフォルトのパッケージで提供されるもの以外の OpenTelemetry コンポーネントが必要な場合は、[カスタム OpenTelemetry コンポーネントを使用する][2] に従って、Datadog Agent の機能を拡張してください。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/guide/migrate/ddot_collector" >}}OpenTelemetry Collector から Datadog Agent への移行{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: /ja/opentelemetry/setup/ddot_collector/custom_components
[3]: /ja/containers/
[4]: /ja/security/sensitive_data_scanner/
[5]: /ja/universal_service_monitoring/
[7]: /ja/network_monitoring/cloud_network_monitoring/
[9]: /ja/agent/fleet_automation/
[11]: https://github.com/DataDog/datadog-agent/blob/main/comp/otelcol/collector-contrib/impl/manifest.yaml
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
[42]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/sapmexporter/README.md
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