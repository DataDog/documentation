---
description: Cloud Cost Management で複数のプロバイダーのコストをクエリするための Multisource Querying の使い方を学びます。
further_reading:
- link: https://www.datadoghq.com/blog/focus-cost-data/
  tag: ブログ
  text: Cloud Cost Management と FOCUS でマルチ クラウド コストを監視
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
- link: /cloud_cost_management/container_cost_allocation
  tag: ドキュメント
  text: Container Cost Allocation について
is_beta: true
title: Multisource Querying
---

## 概要

[AWS][1]、[Azure][2]、[Google Cloud][3]、[SaaS][4]、または [Datadog のコスト][5]を [Cloud Cost Management][6] に取り込み始めると、複数のプロバイダーのコストを柔軟にクエリできます。Multisource Querying を使用すると、プロバイダーごとに複数のクエリを作成する代わりに、一貫性のある標準化されたタグを使用して複数のプロバイダーのコストをクエリできます。

Multisource Querying を使って、[**Explorer** ページ][6]、[ダッシュボード][7]、[ノートブック][8]、[コスト モニター][9] を横断しながらコスト ビューを構築し、サービスの総所有コストを把握し、コストの変化やトレンドに対するアラートを設定します。

## セットアップ

Multisource Querying を使用するには、[Cloud Cost Management][10] を構成し、Datadog でコストを継続的に取り込んでいることを確認してください。複数通貨をサポートしており、コストは自動的に USD に換算され、USD で表示されます。

## コストデータのクエリ

[**Explorer** ページ][6] の **Provider** フィールドでは、複数のプロバイダーを選択できます。

{{< img src="cloud_cost/multisource_querying/provider.png" alt="Cloud Cost Explorer ページの検索クエリの下にある Provider フィールド" style="width:40%;" >}}

**Provider** や **Team** のようなドロップダウン フィルターは柔軟性を保ち、検索クエリの作成プロセスを効率化することで、コスト データを絞り込めます。フィルターを追加するには、**+ Filter** をクリックします。 

{{< img src="cloud_cost/multisource_querying/filters_2.png" alt="Cloud Cost Explorer ページで Team フィルターを使用し、レポートをサービス別にグループ化した検索クエリ" style="width:100%;" >}}

以下のオプションにアクセスし、コストデータをフィルタリングするには、**Refine Results** をクリックします。

Usage Charges Only
: クレジット、手数料、税金を除外し、エンジニアリングチームが影響するコストを調べます。

Complete Days Only
: 完全ではないため、過去 2 日間のコストデータを除外します。

Total Cost
: データをフィルタリングして、特定のコスト範囲内のコストを表示します。

Dollar Change
: 指定したドル変動範囲内のコスト変動のみを表示します。

Percent Change
: 指定した変化率の範囲内のコスト変動のみを表示します。

{{< img src="cloud_cost/multisource_querying/refine_results_1.png" alt="Cloud Cost Explorer ページでコスト データをさらに絞り込むための追加オプション" style="width:100%;" >}}

## コストデータの可視化

Multisource Querying を使用すると、[ダッシュボード][11]でプロバイダー間のコストデータを使用して可視化を作成できます。

{{< img src="cloud_cost/multisource_querying/cost_overview.png" alt="Snowflake、Azure、Google Cloud、AWS など複数のプロバイダーの Cloud Cost Management データを表示した Datadog のダッシュボード" style="width:100%;" >}}

## 収集データ

### コストメトリクス

Multisource Querying では、`all.cost` メトリクスを使用します。このメトリクスは、すべての個別のクラウドおよび SaaS コストメトリクスを統合して **Analytics** ページに表示します。

**注:** `all.cost` メトリクスにはリソースレベルのタグは含まれていません。リソース別のコストを表示するには、各プロバイダーの特定のコストメトリクス (`aws.cost.amortized` など) を使用します。検索クエリで特定のプロバイダーにフィルタリングすると、Datadog では自動的に対応するプロバイダー固有のメトリクスに切り替わり、コストデータをより詳細にクエリできるようになります。

### すぐに使えるタグ

Cloud Cost Management は、AWS、Azure、Google Cloud インテグレーションのタグを収集します。この表は、各インテグレーションで共有されるすぐに使えるタグの非網羅的なリストを提供します。

| タグ名 | タグの説明 |
|---|---|
| `allocated_resource` | コンテナワークロードが使用するリソースの種類 (`cpu` や `mem` など)。 |
| `allocated_spend_type` | コンテナのコストは、ワークロードによって使用されるリソース (`usage`)、ワークロードによって予約されたが使用されていないリソース (`workload_idle`)、およびどのワークロードによっても予約も使用もされていないリソース (`cluster_idle`) の 3 種類に分けられます。 |
| `ecs_cluster_name` | ワークロードをホストする ECS クラスターの名前。 |
| `kube_cluster_name` | ワークロードをホストする Kubernetes クラスターの名前。 |
| `orchestrator` | コンテナオーケストレーター (`kubernetes` や `ecs` など) 。 |

### タグエンリッチメント

Cloud Cost Management は、すべてのプロバイダーのコストデータに [FinOps FOCUS 仕様][12]に準拠したタグで情報を追加します。FOCUSTM は、クラウドベンダー間のコストと利用請求データを正規化する技術仕様です。

FOCUS タグを使用すると、プロバイダー間で類似した概念をクエリできます。例えば、AWS と Azure のアカウントごとのコストを確認したい場合、2 つのクエリ (`aws_member_account_name` でグループ化された AWS のコストと `subscriptionname` でグループ化された Azure のコスト) を作成する必要はありません。`subaccountname` でグループ化された AWS と Azure のコストにフィルタリングする 1 つの検索クエリを使用できます。

Cloud Cost Management は、すべてのコストメトリクスに小文字の仕様 Column ID を追加します。

Cloud Cost Management では、以下の FOCUS タグが使用できます。

| タグ名 | タグの説明 |
|---|---|
| `providername` | リソースまたはサービスを購入可能にしたエンティティの名前。 |
| `servicename` | プロバイダーから購入できる提供物 (例: クラウド仮想マシン、SaaS データベース、システムインテグレーターのプロフェッショナルサービス) 。 |
| `billingaccountid` | プロバイダーが請求アカウントに割り当てる識別子。 |
| `billingaccountname` | 請求アカウントに割り当てられた表示名。 |
| `billingcurrency` | クラウドの請求書が支払われた通貨。 |
| `subaccountid` | リソースやサービスのグループに割り当てられた ID で、多くの場合アクセスやコストを管理するために使用されます。 |
| `subaccountname` | リソースやサービスのグループに割り当てられた名前で、多くの場合アクセスやコストを管理するために使用されます。 |
| `regionname` | リソースがプロビジョニングされる、またはサービスが提供される孤立した地理的エリアの名前。 |
| `availabilityzone` | 高可用性とフォールトトレランスを提供するリージョン内の物理的に分離され隔離されたエリアのプロバイダーが割り当てた識別子。 |
| `pricingunit` | 単価を決定するためのプロバイダー指定の測定単位で、ブロックプライシングなどのプライシングルールを適用した後にプロバイダーが測定した使用量や購入量をどのように評価するかを示します。 |

`all.cost` メトリクスには、AWS、Azure、および Google Cloud のコストに対して[コンテナコストが割り当てられている][13]ため、[関連するコンテナタグ][14]でクエリできます。

<div class="alert alert-warning">組織がこれらの FOCUS タグでタグ付けしている場合、Datadog は、タグの値が Cloud Cost Management の FOCUS タグの値と重複しないように、基礎となるインフラストラクチャー上のタグキーを更新することを推奨します。</div>

## 通貨換算
Cloud Cost Management は、各クラウド プロバイダーの請求書から請求通貨を取得します。異なる通貨の複数プロバイダーからのコストを処理する際は、課金額を USD に換算します。換算は毎日更新される月次平均為替レートを使用して実行されます。これにより、Cloud Cost Management は原通貨に関係なく、すべてのコスト データを一貫して正確に表現できます。原通貨でコストを表示するには、Provider を 1 つだけ選択してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/setup/aws
[2]: /ja/cloud_cost_management/setup/azure
[3]: /ja/cloud_cost_management/setup/google_cloud
[4]: /ja/cloud_cost_management/setup/saas_costs
[5]: /ja/cloud_cost_management/datadog_costs
[6]: https://app.datadoghq.com/cost/explorer
[7]: /ja/dashboards
[8]: /ja/notebooks
[9]: /ja/cloud_cost_management/monitors
[10]: /ja/cloud_cost_management
[11]: https://app.datadoghq.com/dashboard/lists
[12]: https://focus.finops.org/#obtain
[13]: /ja/cloud_cost_management/container_cost_allocation
[14]: /ja/cloud_cost_management/container_cost_allocation/?tab=aws#applying-tags