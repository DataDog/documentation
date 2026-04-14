---
aliases:
- /ja/infrastructure/cloud_cost_management
- /ja/integrations/cloudability
cascade:
  algolia:
    rank: 70
    subcategory: Cloud Cost Management
    tags:
    - cloud cost
    - cloud integrations
    - クラウド コスト マネジメント
    - cloud cost aws
    - cloud cost azure
    - cloud cost google cloud
    - cloud cost gcp
    - data collected aws
    - data collected azure
    - data collected google cloud
further_reading:
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: GitHub
  text: Datadog Cloud Cost Management でクラウドコストの可視化とコントロールを実現する
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: ブログ
  text: Datadog Cloud Cost Management で Kubernetes と ECS の支出を把握する
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: ブログ
  text: Datadog でエンジニアが Google Cloud のコストを管理するための権限を与える
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: ブログ
  text: サービスに関連するクラウドや SaaS のコストを迅速かつ包括的に分析する
- link: /monitors/types/cloud_cost/
  tag: ドキュメント
  text: クラウドコストモニターを作成する
- link: /cloud_cost_management/tag_pipelines/
  tag: ドキュメント
  text: Tag Pipelines について
- link: /cloud_cost_management/tag_pipelines
  tag: ドキュメント
  text: Tag Pipelines を使って Cloud Cost Management 全体でタグを標準化する
title: クラウド コスト マネジメント
---


{{< learning-center-callout header="イネーブルメントウェビナーセッションに参加" hide_image="true" btn_title="登録" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Cloud+Cost+Management">}}
クラウドプロバイダーのコストを調査し、リアルタイムのテレメトリーデータと相関付けることで、クラウドコストの発生源、変動、最適化の機会についての具体的な洞察とアラートを得ることができます。
{{< /learning-center-callout >}}

## 概要

Cloud Cost Management は、エンジニアリングチームや財務チームに、インフラストラクチャーの変更がコストに与える影響を理解し、組織全体の支出を割り当て、非効率性を特定するための洞察を提供します。

{{< img src="cloud_cost/overview_1.png" alt="Datadog の Cloud Costs Overview ページで、クラウドプロバイダーのコストと使用状況をすべて把握することができます。" style="width:100%;" >}}

Datadog はクラウドコストデータを取り込み、[**Analytics** ページ][1]の検索クエリで使用可能なメトリクスに変換します。コスト上昇時には、その上昇を使用量メトリクスと相関付けて根本原因を特定することができます。

## セットアップ

{{< whatsnext desc="Cloud Cost Management でクラウドコストの管理を始めるには、以下のドキュメントをご覧ください。">}}
{{< nextlink href="/cloud_cost_management/aws">}}<u>AWS</u>: AWS 請求書向けに Cloud Cost Management を構成します。{{< /nextlink >}}
{{< nextlink href="/cloud_cost_management/azure">}}<u>Azure</u>: Azure 請求書向けに Cloud Cost Management を構成します。{{< /nextlink >}}
{{< nextlink href="/cloud_cost_management/google_cloud">}}<u>Google Cloud</u>: Google Cloud 請求書向けに Cloud Cost Management を構成します。{{< /nextlink >}}
{{< nextlink href="/cloud_cost_management/saas_costs">}}<u>SaaS コストインテグレーション</u>: サポートされている SaaS コストプロバイダーから Datadog にコストデータを送信します。{{< /nextlink >}}
{{< nextlink href="/cloud_cost_management/custom">}}<u>カスタムコスト</u>: 任意のコストデータソースを Datadog にアップロードします。{{< /nextlink >}}
{{< nextlink href="/cloud_cost_management/datadog_costs">}}<u>Datadog コスト</u>: Datadog の日々の支出と利用メトリクスを可視化します。{{< /nextlink >}}
{{< /whatsnext >}}

## クラウドコストデータを活用する

インフラストラクチャーの費用と関連する利用メトリクスを 15 か月間保持し、潜在的な非効率性や節約の機会を可視化します。

ダッシュボード作成時、検索クエリのデータソースとして **Cloud Cost** を選択します。

{{< img src="cloud_cost/cloud_cost_data_source.png" alt="ダッシュボードウィジェット作成時にデータソースとして利用できるクラウドコスト" style="width:100%;" >}}

オプションで、[Metrics API][2] を使用してクラウドコストデータの時系列グラフをプログラムでエクスポートすることができます。

## 日々の Datadog コストデータを活用する

Datadog の日々の費用と関連する利用メトリクスを 15 か月間保持し、潜在的な非効率性や節約の機会を可視化します。

ダッシュボード作成時、検索クエリのデータソースとして **Cloud Cost** を選択します。

{{< img src="cloud_cost/datadog_costs/dashboard.png" alt="ダッシュボードの Cloud Cost データソースのオプションとしての Datadog コスト" style="width:100%;" >}}

オプションで、[Metrics API][2] を使用して Datadog コストデータの時系列グラフをプログラムでエクスポートすることができます。

## タグルールの作成

[Tag Pipelines][5] を活用して、クラウドリソース全体でタグを標準化することで、コストデータの見落としを防ぎ、包括的なコスト追跡を実現します。

{{< img src="cloud_cost/tags_addnew.png" alt="Tag Pipelines でタグルールを作成し、クラウドリソースが標準タグを使用するようにする" style="width:60%;" >}}

タグルールを作成することで、欠落したタグや誤ったタグを修正し、組織のビジネスロジックに沿った推論タグを追加することができます。

## コストモニターの作成

[クラウドコストモニター][3]を作成して、クラウド支出を積極的に管理・最適化しましょう。クラウド費用を監視するために、**コストの変動**または**コストのしきい値**を選択できます。

{{< img src="cloud_cost/monitor.png" alt="コストの変動をアラートするクラウドコストモニターの作成" style="width:100%;" >}}

## コストの割り当て

[コンテナコスト割り当てメトリクス][4]を活用して、Kubernetes、AWS ECS、Azure、Google Cloud 全体のクラスターやワークロードに関連するコストを把握しましょう。ポッドレベルのコストを可視化し、アイドルリソースのコストを特定し、リソースタイプ別にコストを分析することができます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analytics
[2]: /ja/api/latest/metrics/#query-timeseries-data-across-multiple-products
[3]: /ja/monitors/types/cloud_cost/
[4]: /ja/cloud_cost_management/container_cost_allocation
[5]: /ja/cloud_cost_management/tag_pipelines
