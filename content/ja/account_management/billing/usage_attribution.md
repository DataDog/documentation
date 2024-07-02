---
title: Usage Attribution
aliases:
    - /account_management/billing/advanced_usage_reporting/
    - /account_management/billing/custom_usage_reporitng/
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentation
  text: Plan and Usage Settings
algolia:
  tags: [usage attribution, cost attribution]
---

## 概要

<div class="alert alert-warning">
Usage Attribution は、Enterprise プランに含まれる高度な機能です。他のプランをご利用中で、この機能をご希望の場合は、アカウント担当者または <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> までお問い合わせください。
</div>

Administrators or users with the Usage Read permission can access the Usage Attribution tab from the Plan & Usage section in Datadog. The Usage Attribution page provides the following information and functionality:

- 使用方法が分類されている既存のタグキーを一覧表示し、新しいタグキー（最大 3 つ）を変更および追加する機能を提供します。
- Summarizes usage at the end of each month and visualizes usage over time broken out by tags.
- Generates month-to-date and hourly CSV files.

This feature does not support product usage that cannot be tagged during instrumentation. For example, Incident Management Users, CI Pipeline and Test Users, Parallel Testing Slots, and Audit Trail. 

## はじめに

To start receiving daily data, an administrator needs to choose tags for the report.

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Datadog で使用量属性を始める" style="width:100%;" >}}

The **Edit Tags** popover allows:

- ドロップダウンから最大 3 つのタグキーを入力できます。ドロップダウンには、ルートアカウントとアカウントの子オーガニゼーションの両方の既存のタグが事前に入力されています。
- 既存のタグの削除と編集ができます。

{{< img src="account_management/billing/usage_attribution/Edit-Tags-Popover.png" alt="Edit Tags in Usage Attribution" style="width:80%;" >}}

- Once the tags are configured, it takes 24 hours for the first report to be generated.
- レポートは継続的に生成されます。
- タグを変更すると、新しいレポートには新しいタグが反映されますが、以前のレポートはそのまま古いタグを維持します。
- Monthly reports reflect the latest set of tags. If tags are changed in the middle of a month, partial month reports are created for each reporting period.

## 合計使用量

### 月次使用属性

Monthly reports are updated daily and provide a month-to-date aggregation of usage data.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Applied tags in Datadog" style="width:100%;" >}}

- Data for specific products, tags, and organizations can be selected using the facet selector.
- Data can be grouped and ungrouped by the tag keys selected.
- テーブルの表示には、Value と Percentage のオプションが用意されています。
- テーブルのデータは、一部の製品を含むように編集することができます。
- マルチオーガニゼーションを有効にすると、使用方法は親アカウントの全 Datadog オーガニゼーションが要約されます。
- 前の月のレポートには、タイムセレクターからアクセスできます。
- Reports are downloadable in CSV format. These CSV reports include both usage numbers and percentages, allowing for simplified allocations and chargebacks. Percentages are calculated on a per-organization basis.

Monthly data can also be pulled using the API. For more information, see the [API endpoint documentation][1].

### 1 時間ごとの使用量属性

Hourly data can be pulled using the API. For more information, see the [API endpoint documentation][2].

### データの解釈

次のテーブルは、`app` タグと `service` タグ別のインフラ使用量の日次レポート例です。

| public_id | 時間                | app          | サービス                  | total_usage |
| --------- | ------------------- | ------------- | ------------------------| --------------------- |
| publicid1 | 2022-03-31 00:00:00 | &lt;empty&gt; | service1 &#124; service2  | 50                  |
| publicid1 | 2022-03-31 09:00:00 | app1         |                          | 28                    |
| publicid1 | 2022-03-31 18:00:00 | app2         | service3                 | 1023                  |

- 値が`<empty>` というのは、リソースがそれぞれのタグでタグ付けされたものの、そこに値が無いことを意味します。
- 値が無いというのは、リソースがその特定のタグにタグ付けされていないという意味です。
- パイプ (|) 区切り値 (例、`service1 | service2`) は、特定のタグがリソースに複数回適用されたことを意味します。
- 有効なタグの値 ([タグの定義に関するドキュメント]を参照[3]) は、それぞれのタグの実際の値を意味します。

#### 詳細なデータ分析

複数のタグを使用する場合、時間単位および月次使用属性レポートにはタグの全通りの組み合わデータが含まれるため、詳細なデータ分析タスクのベースデータセットとして使用することができます。たとえば、グループ化やピボットでタグのサブセットに注目したビューを表示したり、任意の日付範囲の中で集計を行うことができます。

## 使用量の追跡

A timeseries of Usage Attribution data can be viewed by clicking on "Track Usage"
- Data for specific products, organization, or tag keys can be selected using the facet selector.
- Data can be graphed for a day, week, or month by using the time selector above the graphs.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Hourly-Facets.png" alt="Infra Hosts graphs separated by tags" style="width:100%;" >}}


## Cost attribution

For direct billing customers, month-end cost attribution reports are generated at the end of each billing cycle to enable monthly chargeback and cost allocation processes. 
- Cost data for the preceding month is available no later than the 19th of the current month.
- Cost attribution data is not currently available in GovCloud datacenters
- Monthly Cost Attribution data is [available with the API][4]

{{< img src="account_management/billing/usage_attribution/Cost-Attribution-Monthly.png" alt="Cost Attribution report" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/v1/usage-metering/#get-monthly-usage-attribution
[2]: https://docs.datadoghq.com/api/v1/usage-metering/#get-hourly-usage-attribution
[3]: https://docs.datadoghq.com/getting_started/tagging/#define-tags
[4]: https://docs.datadoghq.com/api/latest/usage-metering/#get-monthly-cost-attribution
