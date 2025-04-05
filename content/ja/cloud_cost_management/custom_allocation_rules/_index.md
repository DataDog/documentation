---
description: カスタム割り当てルールに基づいてクラウドコストを割り当てます。
further_reading:
- link: https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview
  tag: ドキュメント
  text: Cloud Cost Management
title: カスタム割り当てルール
---

## 概要

カスタムコスト割り当てを使用すると、選択したコストを関連するビジネスディメンションに紐付けることで、コストのショーバックやチャージバックを行うことができます。割り当てルールを設定した後は、どのコストがそのルールによって割り当てられたかをレポートで確認できます。

カスタムコスト割り当ては [Tag Pipelines][1] の後に実行され、ユーザー定義タグに基づくコスト割り当てを可能にします。コストは日次で割り当てられ、AWS、Google Cloud、Azure の Cloud Cost メトリクスに適用できます。

## ルールの作成

Cloud Cost の設定画面にある [Custom Allocation Rules セクション][2]にアクセスし、ルールを作成します。次の割り当て方法から選択できます。


| 割り当て方法 | 説明 | 例 |
| ----------------  | ----------- | -------- |
| 均等 (Even)  | コストは宛先タグに対して均等に割り当てられます。 | タグ付けされていないサポートコストが `teamA`、`teamB`、`teamC` に均等に割り当てられます。 |
| カスタムパーセンテージ (Custom Percentage)  | コストは宛先タグごとに定義したカスタムパーセンテージに基づいて割り当てられます。 | タグ付けされていないサポートコストが、`teamA` に 60%、`teamB` に 30%、`teamC` に 10% の割合で割り当てられます。 |
| プロポーショナル (Proportional)  | 宛先のコスト消費割合に応じてコストが割り当てられます。 | Amazon EC2 の総支出に占める割合に基づいて、タグ付けされていないサポートコストを `teamA`、`teamB`、`teamC` に割り当てます。|
| メトリクスベース (Dynamic by Metric)  | 定義されたメトリクスの比率に基づいてコストが割り当てられます。 | Datadog のメトリクスクエリ `sum:postgresql.queries.time{*} by {user}.as_count()` によって定義されるクエリ実行時間の合計値をもとに、共有の PostgreSQL コストが各ユーザーに割り当てられます。 |

## 割り当て方法

{{< tabs >}}

{{% tab "均等割り当て" %}}

均等割り当て戦略では、他のコストの状況に関係なく、コストが宛先タグに均等に割り当てられます。フィルターを適用して、請求のどの部分が割り当て比率を決定するかを絞り込むことができます。

{{< img src="cloud_cost/custom_allocation_rules/even_diagram.png" alt="均等割り当て戦略を示す図" style="width:60%;" >}}

{{< img src="cloud_cost/custom_allocation_rules/even_ui.png" alt="Datadog 上での均等割り当て戦略の例" style="width:60%;" >}}

{{% /tab %}}

{{% tab "カスタムパーセンテージ割り当て" %}}
カスタムパーセンテージ戦略では、選択した宛先タグに対して静的なカスタムパーセンテージを定義できます。たとえば、宛先が 3 つ (`teamA`、`teamB`、`teamC`) ある場合、`teamA` に 60%、`teamB` に 30%、`teamC` に 10% といった配分が可能です。

{{< img src="cloud_cost/custom_allocation_rules/custom_percentage_diagram.png" alt="均等割り当て戦略を示す図" style="width:60%;" >}}

{{< img src="cloud_cost/custom_allocation_rules/custom_percentage_ui.png" alt="Datadog 上での均等割り当て戦略の例" style="width:60%;" >}}

{{% /tab %}}

{{% tab "プロポーショナル割り当て" %}}

宛先のコスト消費割合に基づいてコストが割り当てられます。均等割り当てと同様に、フィルターやパーティションを設定して割り当てをさらにカスタマイズできます。

{{< img src="cloud_cost/custom_allocation_rules/proportional_diagram.png" alt="プロポーショナル割り当て戦略を示す図" style="width:60%;" >}}

{{< img src="cloud_cost/custom_allocation_rules/proportional_ui.png" alt="Datadog 上でのプロポーショナル割り当て戦略の例" style="width:60%;" >}}

{{% /tab %}}

{{% tab "メトリクスベースの割り当て" %}}

メトリクスベースの割り当てを使用すると、Datadog の[メトリクスクエリ][3]に基づいてコストを分割できます。パフォーマンスメトリクスを用いて費用を割り当てることで、アプリケーションの使用状況パターンに応じた、より正確なコスト配分が可能になります。

たとえば、次の PostgreSQL メトリクスクエリ `sum:postgresql.queries.time{*} by {user}.as_count()` は、ユーザーごとのクエリ実行時間の合計を追跡します。その相対値を用いて、全 PostgreSQL コストのうち各ユーザーに割り当てる割合を決定します。

割り当てるコストの比率を決める際には、メトリクスを日次または月次で集計できます。ただし、コスト自体は日次で割り当てられます。

{{< img src="cloud_cost/custom_allocation_rules/dynamic_diagram.png" alt="メトリクスベースの割り当て戦略を示す図" style="width:60%;" >}}

{{< img src="cloud_cost/custom_allocation_rules/dynamic_ui.png" alt="Datadog でのメトリクスベースの割り当て戦略の例" style="width:60%;" >}}

[3]: /ja/metrics/#querying-metrics

{{% /tab %}}

{{< /tabs >}}

## 割り当てに含めるコストを指定する
| 手順 | 必須 | 例 |
| ---- | ---- | ---- |
| コストプロバイダーを選択 | はい | AWS、Google Cloud、Azure |
| 割り当て対象となるコスト (ソース) を定義 | はい | `aws_product` に `support` が含まれ、`allocated_spend_type` が未タグ |
| 宛先を定義 | はい | `team` が `teamA`、`teamB`、`teamC` |
| フィルター基準 | Even と Proportional 戦略のみで適用可能 (オプション) | `aws_product` が `ec2` |
| コストを分割する基準 (Partition costs by) | Even、Proportional、Dynamic by Metric 戦略のみ適用可能 (オプション) | `environment` はすべての値 |
| 名前 | はい | allocate_untagged_support_costs |

### パーティショニング (Partitioning)

一部の割り当て戦略では、セグメントごとに割り当てを行うためにコストの比率をどのように分割するかを指定できます。たとえば、Proportional 戦略で `environment` をパーティションに設定して `staging` や `production` のタグを使う場合、それぞれの環境で割合が個別に計算されます。これにより、各パーティション内の特定の割合に基づいてコストが割り当てられるようになります。

{{< img src="cloud_cost/custom_allocation_rules/proportional_partition_diagram.png" alt="パーティショニングを使用した Proportional 割り当て戦略を示す図" style="width:90%;" >}}

## ルールの管理
ルールは Cloud Cost 設定ページの [Custom Allocation Rules セクション][2]で編集および削除できます。ルール名以外のすべての項目を再設定可能です。

ルールはリストに表示されている順序で適用されます。

## 割り当ての可視化
カスタム割り当てルールの変更が反映されるまでには、最大 24 時間かかる場合があります。反映後は、Container Allocation を有効にしているすべてのコストに対して、Cloud Cost Management 全体で新しい割り当てを確認できます。カスタム割り当てされたコストには、どのルールで割り当てられたかを示す `allocated_by_rule` タグが付与されます。

{{< img src="cloud_cost/custom_allocation_rules/visualize_your_allocations.png" alt="Datadog 上で割り当て結果を可視化している例" style="width:90%;" >}}

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/tag_pipelines
[2]: https://app.datadoghq.com/cost/settings/custom-allocation-rules