---
title: (LEGACY) Best Practices for OPW Aggregator Architecture
aliases:
  - /observability_pipelines/production_deployment_overview/aggregator_architecture
  - /observability_pipelines/aggregator_architecture/
  - /observability_pipelines/architecture/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

{{% observability_pipelines/legacy_warning %}}

<div class="alert alert-info">
This guide is for large-scale production-level deployments.
</div>

## 概要

観測可能性パイプラインワーカー (OPW) のアグリゲーターアーキテクチャは、データの集中処理とルーティングのためのスタンドアローンサービスとして観測可能性パイプラインワーカーをデプロイします。

{{< img src="observability_pipelines/production_deployment_overview/aggregator_role2.png" alt="ネットワークロードバランサーが様々なソースからデータを受け取り、観測可能性パイプラインワーカーアグリゲーターにデータを送る様子を示した図。このアグリゲーターは、異なるアベイラビリティゾーンに複数のワーカーを持ち、様々なシンクにデータを送る" style="width:100%;" >}}

観測可能性パイプラインワーカーを他のサービスのようにインフラストラクチャーにデプロイし、データをインターセプトして操作し、宛先に転送することができます。観測可能性パイプラインワーカーインスタンスはそれぞれ独立して動作するため、シンプルなロードバランサーでアーキテクチャを拡張することができます。

このガイドでは、新規の観測可能性パイプラインワーカーユーザーのために、推奨されるアグリゲーターアーキテクチャを説明します。具体的には、以下のトピックが含まれています。

- [インスタンスの最適化][3]により、観測可能性パイプラインワーカーのアグリゲーターを水平方向にスケールさせることができるようになります。
- [キャパシティプランニングと観測可能性パイプラインワーカーをスケーリングする][4]ためのリソース容量を見積もるための出発点。
- 観測可能性パイプラインワーカー用の[ネットワークトポロジと構成][5]の決定。
- [高耐久性][6]と[高可用性](#high-availability)の実現。
- 観測可能性パイプラインワーカーを[災害復旧][7]の一環として活用する。
- 複数のアグリゲーター、パブリッシュサブスクライブシステム、およびグローバル集計をデプロイするための、その他の[高度な構成][8]。

[3]: /observability_pipelines/legacy/architecture/optimize
[4]: /observability_pipelines/legacy/architecture/capacity_planning_scaling
[5]: /observability_pipelines/legacy/architecture/networking
[6]: /observability_pipelines/legacy/architecture/preventing_data_loss
[7]: /observability_pipelines/legacy/architecture/availability_disaster_recovery
[8]: /observability_pipelines/legacy/architecture/advanced_configurations