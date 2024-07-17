---
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Learn about Cloud Cost Management
- link: /cloud_cost_management/aws
  tag: Documentation
  text: AWS の請求に関する情報を得る
- link: /cloud_cost_management/azure
  tag: Documentation
  text: Azure の請求に関する情報を得る
- link: /cloud_cost_management/google_cloud
  tag: Documentation
  text: Google Cloud の請求に関する情報を得る
- link: /cloud_cost_management/saas_costs
  tag: Documentation
  text: SaaS Cost インテグレーションについて
- link: /cloud_cost_management/custom
  tag: Documentation
  text: Gain insights into your custom costs
is_beta: true
private: true
title: Datadog Costs
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、Cloud Cost Management はサポートされていません。</div>
{{< /site-region >}}

{{< beta-callout url="https://www.datadoghq.com/private-beta/daily-datadog-costs/" >}}
Cloud Cost Management の 日次 Datadog コストは非公開ベータ版です。アクセスをリクエストするには、フォームに記入してください。 {{< /beta-callout >}}

## 概要

日次 Datadog コストにより、ダッシュボード、ノートブック、[コストモニター][2]、Cloud Cost Analytics 全体の Datadog の支出状況を、組織全体のクラウドプロバイダーや [SaaS コスト][3]とともに可視化できます。

[Cloud Cost Management][1] で日次 Datadog コストを確認し、[**Usage & Cost** ページ][4]で[コストサマリー][9]や[コストチャージバック][10]などの追加の [Datadog コスト機能][7] にアクセスできます。

<div class="alert alert-info"><a href="https://app.datadoghq.com/billing/usage">Plan and Usage</a> に含まれないコストは、使用量にのみ基づいており、過去のクレジットや調整を含んでいません。</div>

## Permissions

Cloud Cost Management でコストを表示するには、`cloud_cost_management_read` 権限が必要で、これは Datadog Read Only Role を持つユーザーに対して有効になっています。

<div class="alert alert-info">親組織内の既存の Cloud Cost Management のお客様のみが、<a href="https://app.datadoghq.com/billing/usage">Plan and Usage</a> 外の日次 Datadog コストにアクセスできます。</div>

[**Usage &amp; Cost** ページ][4]でコストを確認するには、[コスト詳細ドキュメント][7]を参照してください。

## コストの可視化と分解

Cloud Cost Management のコストは、[**Plan and Usage** ページ][4]の当月分 (MTD) の推定コストと一致しない場合があります。これは Plan and Usage のコストは累積で月次按分されるためです。日次計算が可能なのは Cloud Cost Management のみです。

Datadog のコストデータは過去 15 か月分利用可能で、**Cloud Costs** データソースのダッシュボードやノートブックで使用できます。ダッシュボードを作成して、日次コストを監視し、傾向を特定し、リソース使用量を最適化することができます。

{{< img src="cloud_cost/datadog_costs/dashboard.png" alt="ダッシュボードの Cloud Cost データソースのオプションとしての Datadog コスト" style="width:100%;" >}}

すぐに使えるタグを使用して、Datadog のコストデータを分解して割り当てることができます。

| Tag Name | Tag Description |
|---|---|
| organization | 親組織またはサブ組織の名前。 |
| dimension_name / dimension | `dimension_name` は、請求対象の個々の製品の名前です (例えば`Indexed Logs (15 Day Retention)`)。</br></br> `dimension` は、プログラムでの使用や検索のしやすさを考慮して最適化された、製品名のスネークケースバージョンです (例えば、`logs_indexed_15day`)。 |
| product_name / datadog_product | `product_name` は Datadog 製品の上位グループ名です (例えば、`Logs`)。</br></br> `datadog_product` は、プログラムでの使用や検索しやすさを考慮して最適化された、製品グループ名のスネークケースバージョンです (例えば、`logs`)。 |
| `<Usage Attribution tags>` | [使用量属性][8] で構成したタグキーを 3 つまで、関連する値 (例えば、`team` や `service`) と一緒に追加することができます。 |
| cost_type | このアイテムの対象となる料金の種類 (例えば、`committed` や `on-demand`)。 |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/
[2]: /ja/cloud_cost_management/monitors
[3]: /ja/cloud_cost_management/saas_costs
[4]: https://app.datadoghq.com/billing/usage
[5]: /ja/account_management/rbac/
[6]: /ja/account_management/rbac/permissions
[7]: /ja/account_management/plan_and_usage/cost_details/
[8]: /ja/account_management/billing/usage_attribution/
[9]: /ja/account_management/plan_and_usage/cost_details/#cost-summary
[10]: /ja/account_management/plan_and_usage/cost_details/#cost-chargebacks
