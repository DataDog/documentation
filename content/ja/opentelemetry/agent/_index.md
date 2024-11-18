---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-agent-with-otel-collector/
  tag: ブログ
  text: Agent に組み込まれた OTel Collector で OpenTelemetry と Datadog を統合
private: true
title: 組み込み Collector を搭載した Datadog Agent
---

{{< callout url="https://www.datadoghq.com/private-beta/agent-with-embedded-opentelemetry-collector/" btn_hidden="false" header="ベータ版にご参加ください！">}}
  OpenTelemetry Collector を組み込んだ Datadog Agent は、現在非公開ベータ版です。アクセスをリクエストするには、こちらのフォームにご記入ください。
{{< /callout >}} 

## 概要

OpenTelemetry (OTel) Collector が組み込まれた Datadog Agent は、OpenTelemetry の柔軟性と Datadog の包括的な可観測性を組み合わせたオープンソースソリューションです。この統合ソリューションには、以下の機能が含まれます。

- Datadog でのパフォーマンスと信頼性を最適化する、厳選された [OpenTelemetry コンポーネント](#included-components)のセットで、任意のコンポーネントを追加することも可能です
- シームレスなインテグレーションと堅牢なモニタリングを実現する、Datadog Agent の完全なデータ収集と処理機能で、組み込みの OTel Collector 向けの [Datadog Fleet Automation][9] のサポートも含まれています ([主な利点](#key-benefits)を参照してください)
- 最高のオンボーディング体験を提供するように設計された [カスタム Datadog コンポーネント](#custom-datadog-components)

{{< img src="/opentelemetry/embedded_collector/architecture2.png" alt="Datadog Agent に組み込まれた Collector のアーキテクチャ概要。" style="width:100%;" >}}

## 主な利点

OpenTelemetry Collector を組み込んだ Datadog Agent は、以下の機能を提供します。

### 包括的な可観測性

- {{&lt; translate key="integration_count" &gt;}} の Datadog インテグレーション、[Live Container Monitoring][3]、[Network Performance Monitoring][7]、[Universal Service Monitoring][5] (eBPF 付き) などへのアクセス
- OpenTelemetry コミュニティが提供するインテグレーションを活用して、OpenTelemetry Protocol (OTLP) ネイティブフォーマットでテレメトリーを収集
- Collector の処理およびルーティング機能で OTLP データを制御

### シンプルなフリート管理

- [Datadog Fleet Automation][9] を使用して、組み込みの OpenTelemetry Collector のフリートをリモート管理
- 構成、依存関係、およびランタイム環境全体を可視化
- OTLP データに対するすぐに使えるタグ付けの拡充により、[統合サービスタグ付け][1]が自動的に有効化され、より迅速にオンボーディングを行うことが可能

### エンタープライズの信頼性とリソース

- 定期的な脆弱性スキャンと分析を含む、Datadog の堅牢なセキュリティ対策の恩恵を受ける
- オンボーディングやトラブルシューティングの支援のために、Datadog のグローバルサポートチームにアクセス

## 含まれているコンポーネント

### OpenTelemetry Collector コンポーネント

デフォルトでは、Collector が組み込まれた Datadog Agent には、以下の Collector コンポーネントが付属しています。また、[YAML 形式][11]のリストもご覧いただけます。

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

{{% collapse-content title="プロセッサ" level="p" %}}

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
- [routingprocessor][35]
- [tailsamplingprocessor][36]
- [transformprocessor][37]

{{% /collapse-content %}}

{{% collapse-content title="エクスポーター" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [sapmexporter][42]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="コネクタ" level="p" %}}

- [datadogconnector][44]
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="拡張機能" level="p" %}}

- [healthcheckextension][46]
- [observer][47]
- [pprofextension][48]
- [zpagesextension][49]

{{% /collapse-content %}}

### カスタム Datadog コンポーネント

標準の OpenTelemetry コンポーネントに加えて、Datadog は以下のカスタムコンポーネントを提供および維持しています。

{{% collapse-content title="Datadog コンポーネント" level="p" %}}

- [インフラストラクチャー属性プロセッサ][50]: OpenTelemetry プロセッサコンポーネントで、ポッドまたはポッド内の個々のコンテナから出力される OTLP テレメトリー (メトリクス、トレース、ログ) に [Kubernetes タグ][53]を自動的に割り当てます。このコンポーネントにより、Kubernetes 環境の監視のための[統合サービスタグ付け][54]とテレメトリーの相関が可能になります。

- [コンバーター][51]: ユーザーが提供した構成を拡張する OpenTelemetry コンバーターコンポーネントです。オリジナルの構成と拡張された構成の両方を返す API を提供し、既知の誤構成を自動的にチェックしてエラーを削減します。これにより、既存の OpenTelemetry Collector 構成と Agent のシームレスなインテグレーションが保証されます。

- [DD Flare 拡張機能][52]: Agent Flare を生成するための OpenTelemetry 拡張機能コンポーネントです。トラブルシューティングを目的とした、組み込み OTel Collector と Agent の両方からの診断情報が含まれています。

{{% /collapse-content %}}

## 詳細はこちら

Datadog を初めてご利用になる場合でも、OpenTelemetry に精通している場合でも、以下のガイドはお客様の状況に合わせてご利用いただけます。

### デフォルトの Agent パッケージを使用したクイックスタート

デフォルトの Datadog Agent パッケージには、すぐに使えるように設計された[厳選された OpenTelemetry コンポーネント](#included-components)を含む Collector が組み込まれています。このガイドは、以下のような場合に適しています。

- [含まれているコンポーネント](#included-components)以外に OpenTelemetry コンポーネントを必要とせずに、ゼロからモニタリングをセットアップする
- Datadog Agent を使用しており、含まれているコンポーネントで OpenTelemetry 機能をテストしたい
- デフォルトで含まれるコンポーネント以外を必要とせずに、OpenTelemetry Collector から Datadog Agent への移行を行う
- (オプション) デフォルトのパッケージで提供されるもの以外の OpenTelemetry コンポーネントが必要な場合は、[カスタム OpenTelemetry コンポーネントの使用][2]に従って、OpenTelemetry コンポーネントを持ち込んで Datadog Agent の機能を拡張してください。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/agent/install_agent_with_collector" >}}デフォルトの Agent パッケージを使用したクイックスタート{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry Collector から Datadog Agent への移行

このガイドでは、追加の OpenTelemetry コンポーネントが必要なシナリオを含め、既存の OpenTelemetry Collector のセットアップから Datadog Agent への移行をサポートします。このガイドは、以下のような場合に適しています。

- 既存のセットアップを維持したまま OpenTelemetry Collector から移行する
- 既存の OpenTelemetry 構成を移行して継続性を維持する
- (オプション) デフォルトのパッケージで提供されるもの以外の OpenTelemetry コンポーネントが必要な場合は、[カスタム OpenTelemetry コンポーネントの使用][2]に従って、OpenTelemetry コンポーネントを持ち込んで Datadog Agent の機能を拡張してください

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/agent/migration" >}}OpenTelemetry Collector から Datadog Agent への移行{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: /ja/opentelemetry/agent/agent_with_custom_components
[3]: /ja/containers/
[4]: /ja/sensitive_data_scanner/
[5]: /ja/universal_service_monitoring/
[7]: /ja/network_monitoring/performance/
[9]: /ja/agent/fleet_automation/
[11]: https://github.com/DataDog/datadog-agent/blob/386130a34dde43035c814f9a9b08bc72eb20e476/comp/otelcol/collector-contrib/impl/manifest.yaml
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
[35]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/routingprocessor
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