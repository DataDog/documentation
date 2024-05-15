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
    - クラウド コスト マネジメント
    - cloud cost aws
    - cloud cost azure
    - cloud cost google cloud
    - cloud cost gcp
further_reading:
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: GitHub
  text: Datadog Cloud Cost Management でクラウドコストの可視化とコントロールを実現する
- link: /monitors/types/cloud_cost/
  tag: Documentation
  text: クラウドコストモニターの構成
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: blog
  text: Datadog Cloud Cost Management で Kubernetes と ECS の支出を把握する
- link: /cloud_cost_management/tag_pipelines
  tag: ドキュメント
  text: タグパイプラインでクラウドコスト全体のタグを標準化
kind: documentation
title: クラウド コスト マネジメント
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">クラウドコストマネジメントはこのサイトではサポートされていません。</div>
{{< /site-region >}}

## 概要

クラウドコストマネジメントは、エンジニアリングチームとファイナンスチームに、インフラストラクチャーの変更がコストにどのような影響を与えるかを示すインサイトを提供します。これにより、傾向を把握し、組織全体に費用を配分し、非効率性を特定することができます。
Datadog は、クラウドのコストデータをインジェストし、クエリ可能なメトリクスに変換します。コストが上昇した場合、その変化と使用状況の指標を関連付け、根本原因を特定することができます。

## Agent Integration Developer Tool をインストールする

{{< whatsnext desc="Cloud Cost Management を始めましょう。">}}
  {{< nextlink href="/cloud_cost_management/aws">}}<u>AWS</u>: AWS 料金の Cloud Cost Management を構成します。{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/azure">}}<u>Azure</u>: Azure 料金の Cloud Cost Management を構成します。 {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/google_cloud">}}<u>Google Cloud</u>: Google Cloud 料金の Cloud Cost Management を構成します。 {{< /nextlink >}}
 {{< nextlink href="/cloud_cost_management/custom">}}<u>カスタムコスト</u>: 任意のコストデータソースを Datadog にアップロードします。{{< /nextlink >}}
{{< nextlink href="/cloud_cost_management/saas_costs">}}<u>SaaS コストインテグレーション</u>: サポートされている SaaS コストプロバイダーから Datadog にコストデータを送信します。 {{< /nextlink >}}
{{< /whatsnext >}}

## ダッシュボードに表示されるクラウドコスト

インフラストラクチャー費用と関連する利用メトリクスを視覚化し、潜在的な非効率性と節約の機会を発見します。
- *クラウドコスト*データソースを選択して、Datadog ダッシュボードのウィジェットにクラウドコストを追加します。
- [Metrics API][1] を使用して時系列コストデータをエクスポートします。

{{< img src="cloud_cost/cloud_cost_data_source.png" alt="ダッシュボードウィジェット作成時にデータソースとして利用できるクラウドコスト" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/latest/metrics/#query-timeseries-data-across-multiple-products