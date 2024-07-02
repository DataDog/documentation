---
title: (LEGACY) High Availability and Disaster Recovery
aliases:
  - /observability_pipelines/architecture/availability_disaster_recovery/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

<div class="alert alert-info">
This guide is for large-scale production-level deployments.
</div>

観測可能性パイプラインの文脈では、高可用性とは、システムに問題が発生しても観測可能性パイプラインワーカーが利用可能であることを指します。

{{< img src="observability_pipelines/production_deployment_overview/high_availability.png" alt="アベイラビリティゾーン 1 では、ロードバランサー 1 がオフラインで、両方の Agent がロードバランサー 2 にデータを送信し、さらにワーカー 1 とワーカー 2 にデータを送信している図。アベイラビリティゾーン 2 では、ワーカー 3 がダウンしているため、両方のロードバランサーがワーカー N にデータを送信している" style="width:65%;" >}}

高可用性を実現するには

1. 各アベイラビリティゾーンに少なくとも 2 つの観測可能性パイプラインワーカーインスタンスをデプロイします。
2. 観測可能性パイプラインワーカーを少なくとも 2 つのアベイラビリティゾーンにデプロイします。
3. 観測可能性パイプラインワーカーインスタンス間のトラフィックをバランスさせるロードバランサーで観測可能性パイプラインワーカーインスタンスを前面化します。詳細については、[キャパシティプランニングとスケーリング][1]を参照してください。

## 障害シナリオの軽減

### 観測可能性パイプラインワーカープロセスの問題への対応

システムプロセスの問題を軽減するには、観測可能性パイプラインワーカーを複数のノードに分散し、必要に応じて別の観測可能性パイプラインワーカーインスタンスにトラフィックをリダイレクトできるネットワークロードバランサーで前面化します。さらに、プラットフォームレベルの自動自己修復機能により、最終的にはプロセスを再起動するか、ノードを交換する必要があります。

{{< img src="observability_pipelines/production_deployment_overview/process_failure.png" alt="3 つのノードを示す図。各ノードには観測可能性パイプラインワーカーを配置" style="width:45%;" >}}

### ノード障害の軽減

ノードの問題を軽減するには、観測可能性パイプラインワーカーを複数のノードに分散し、別の観測可能性パイプラインワーカーノードにトラフィックをリダイレクトできるネットワークロードバランサーで前面化します。さらに、プラットフォームレベルの自動自己修復機能により、最終的にはノードを交換する必要があります。

{{< img src="observability_pipelines/production_deployment_overview/node_failure.png" alt="ノード 1 のロードバランサーにデータが行くが、ノード 1 で観測可能性パイプラインワーカーがダウンしているため、ノード 2 やノード N のワーカーにデータが送られる図" style="width:40%;" >}}

### アベイラビリティゾーン障害への対応

アベイラビリティゾーンの問題を軽減するために、複数のアベイラビリティゾーンに観測可能性パイプラインワーカーをデプロイします。

{{< img src="observability_pipelines/production_deployment_overview/availability_zone_failure.png" alt="アベイラビリティゾーン 1 でロードバランサーと観測可能性パイプラインワーカーがダウンしているが、ゾーン N のロードバランサーとワーカーはデータの受信と送信を継続していることを示す図" style="width:45%;" >}}

### リージョン障害の軽減

観測可能性パイプラインワーカーは、内部の観測可能性データをルーティングするために設計されており、他のリージョンにフェイルオーバーするべきではありません。その代わりに、観測可能性パイプラインワーカーは、全てのリージョンにデプロイされるべきです。そのため、ネットワーク全体やリージョンに障害が発生した場合、観測可能性パイプラインワーカーも一緒に障害になります。詳しくは[ネットワーキング][2]をご覧ください。

## 災害復旧

### 内部災害復旧

観測可能性パイプラインワーカーは、内部の観測可能性データをルーティングするために設計されたインフラストラクチャーレベルのツールです。シェアードナッシングアーキテクチャを実装しており、災害復旧 (DR) サイトに複製または転送されるべき状態を管理しません。そのため、リージョン全体が障害になった場合、観測可能性パイプラインワーカーも一緒に障害になります。したがって、より広範な DR 計画の一環として、DR サイトに観測可能性パイプラインワーカーをインストールする必要があります。

### 外部災害復旧

Datadog のようなマネージドデスティネーションを使用している場合、観測可能性パイプラインワーカーのサーキットブレーカー機能を使用して、Datadog DR サイトへのデータの自動ルーティングを容易にすることができます。

{{< img src="observability_pipelines/production_deployment_overview/external_disaster_recovery.png" alt="観測可能性パイプラインワーカーを異なるゾーンに配置し、すべてのデータを同じ災害復旧宛先に送信している図" style="width:75%;" >}}

[1]: /observability_pipelines/legacy/architecture/capacity_planning_scaling
[2]: /observability_pipelines/legacy/architecture/networking