---
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
- link: /cloud_cost_management/aws
  tag: ドキュメント
  text: AWS の請求に関する情報を得る
- link: /cloud_cost_management/azure
  tag: ドキュメント
  text: Azure の請求に関する情報を得る
- link: /cloud_cost_management/google_cloud
  tag: ドキュメント
  text: Google Cloud の請求に関する情報を得る
- link: /cloud_cost_management/saas_costs
  tag: ドキュメント
  text: SaaS Cost インテグレーションについて
- link: /cloud_cost_management/custom
  tag: ドキュメント
  text: カスタムコストに関する洞察を得る
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: ブログ
  text: サービスに関連するクラウドや SaaS のコストを迅速かつ包括的に分析する
is_beta: true
private: true
title: Datadog のコスト
---

{{< callout url="https://www.datadoghq.com/product-preview/daily-datadog-costs/" btn_hidden="false" header="プレビューに参加しよう！">}}
Cloud Cost Management における Datadog の日次コストは現在プレビュー版です。この機能に興味がある場合は、フォームにご記入の上、アクセスをリクエストしてください。
{{< /callout >}}

## 概要

Datadog の日次コスト機能を使用すると、ダッシュボードやノートブック、[コストモニター][2]、Cloud Cost Explorer をはじめ、組織全体のクラウドプロバイダーや [SaaS コスト][3] とあわせて、Datadog への日次支出を把握できます。 

[Cloud Cost Management][1] で Datadog の日次コストを確認できるほか、[**Usage & Cost** ページ][4]から [Cost Summary][9] や [Cost Chargebacks][10] といった追加の [Datadog コスト関連機能][7]にアクセスできます。 

Datadog Costs は**追加料金なし**でご利用いただけます。CCM を利用されているお客様も、そうでないお客様もご利用いただけます。

## 権限

Cloud Cost Management でコストを表示するには、`cloud_cost_management_read` 権限が必要で、これは Datadog Read Only Role を持つユーザーに対して有効になっています。

[**Usage &amp; Cost** ページ][4]でコストを確認するには、[コスト詳細ドキュメント][7]を参照してください。

## コストの可視化と分解

Cloud Cost Management のコストは、[**Plan and Usage** ページ][4]の当月分 (MTD) の推定コストと一致しない場合があります。これは Plan and Usage のコストは累積で月次按分されるためです。日次計算が可能なのは Cloud Cost Management のみです。

Datadog のコストデータは、親組織またはサブ組織単位で利用可能です。サブ組織の場合は、[Cost Summary (sub-organization)][5] も有効にする必要があります。

Datadog のコストデータは過去 15 か月分利用可能で、**Cloud Costs** データソースのダッシュボードやノートブックで使用できます。ダッシュボードを作成して、日次コストを監視し、傾向を特定し、リソース使用量を最適化することができます。

{{< img src="cloud_cost/datadog_costs/dashboard.png" alt="ダッシュボードの Cloud Cost データソースとして Datadog コストを選択する例" style="width:100%;" >}}

すぐに使えるタグを使用して、Datadog のコストデータを分解して割り当てることができます。

| タグ名 | タグの説明 |
|---|---|
| organization | 親組織またはサブ組織の名前。 |
| dimension_name / dimension | `dimension_name` は、請求対象の個々の製品の名前です (例えば`Indexed Logs (15 Day Retention)`)。</br></br> `dimension` は、プログラムでの使用や検索のしやすさを考慮して最適化された、製品名のスネークケースバージョンです (例えば、`logs_indexed_15day`)。 |
| product_name / datadog_product | `product_name` は Datadog 製品の上位グループ名です (例えば、`Logs`)。</br></br> `datadog_product` は、プログラムでの使用や検索しやすさを考慮して最適化された、製品グループ名のスネークケースバージョンです (例えば、`logs`)。 |
| `<Usage Attribution tags>` | [使用量属性][8] で構成したタグキーを 3 つまで、関連する値 (例えば、`team` や `service`) と一緒に追加することができます。 |
| cost_type | この項目でカバーされる課金の種類 (例: `usage` や `adjustment` など)。  |
| pricing_category  | この項目でカバーされる具体的な課金タイプ (例: `committed` や `on-demand` など)。  |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/
[2]: /ja/cloud_cost_management/monitors
[3]: /ja/cloud_cost_management/saas_costs
[4]: https://app.datadoghq.com/billing/usage
[5]: /ja/account_management/plan_and_usage/cost_details/#cost-summary-sub-organization
[6]: /ja/account_management/rbac/
[7]: /ja/account_management/plan_and_usage/cost_details/
[8]: /ja/account_management/billing/usage_attribution/
[9]: /ja/account_management/plan_and_usage/cost_details/#cost-summary
[10]: /ja/account_management/plan_and_usage/cost_details/#cost-chargebacks