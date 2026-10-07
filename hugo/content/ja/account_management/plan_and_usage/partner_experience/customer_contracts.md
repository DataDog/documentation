---
description: Datadog 管理組織から、経常収益、更新日、ドローダウン残高、請求書、コスト可視化機能の利用状況など、エンドカスタマーの契約ポートフォリオを表示することができます。
further_reading:
- link: /account_management/plan_and_usage/partner_experience/customer_pricing/
  tag: ドキュメント
  text: Customer Pricing
- link: /account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
  tag: ドキュメント
  text: パートナー経由で購入する顧客向けのコストの視覚化
- link: /account_management/plan_and_usage/partner_experience/
  tag: ドキュメント
  text: パートナー向けプランと使用量エクスペリエンス
title: Customer Contracts
---
[Customer Contracts][1] ページでは、Datadog パートナーは、経常収益、更新日、請求書、コスト可視化機能の利用状況など、エンドカスタマーの契約ポートフォリオを一元的に表示できます。ページ上部のサマリータイルには、更新が迫っている契約数、コスト可視化機能を利用するために料金情報の入力が必要な顧客数、および期限を過ぎた請求書の件数と合計金額が表示されます。

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Customer Contracts は、選択した <a href="/getting_started/site">Datadog サイト</a>{{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{< /site-region >}}

{{< img src="account_management/plan_and_usage/customer-contracts-overview.png" alt="顧客テーブルの上に、更新、コスト可視化、期限切れの請求書の概要タイルが表示されている [Customer Contracts] ページ。" >}}

**注**: このページのデータは 30 分ごとに更新されます。

## 前提条件 {#prerequisites}

Customer Contracts を利用するには、以下が必要です。

- Datadog 管理組織。お持ちでない場合は、Datadog パートナーチームにお問い合わせください。
- 管理組織における Billing Read (`billing_read`) 権限。この権限を持つユーザーは、ページ上のすべての情報を表示できます。権限の管理に関する詳細については、「[ロールベースの Access Control][4]」を参照してください。

## Customer Contracts にアクセスする {#access-customer-contracts}

1. Datadog 管理組織にログインします。
2. [{{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Contracts{{< /ui >}}][1] に移動します。

## 顧客テーブル {#customer-table}

顧客テーブルには、管理組織下のすべての顧客が一覧表示されます。顧客を選択すると、その顧客の契約詳細パネルが開きます。

| 列 | 説明 |
|---|---|
| {{< ui >}}Customer{{< /ui >}} | エンドカスタマー名 |
| {{< ui >}}CMRR{{< /ui >}} | 契約に基づく月次経常収益 |
| {{< ui >}}UMRR{{< /ui >}} | 利用量に基づく月次経常収益。契約上のコミットメントではなく、顧客の従量課金対象となる利用量に基づく |
| {{< ui >}}Overdue Balance{{< /ui >}} | 支払期日を過ぎた顧客の請求書の合計金額 |
| {{< ui >}}Cost Visibility{{< /ui >}} | 顧客が自身の Datadog コストを閲覧できるかどうか「[コスト可視化ステータスをチェックする](#check-cost-visibility-status)」を参照してください。|
| {{< ui >}}Contract Status{{< /ui >}} | 契約が有効か、更新日が近づいているか、または期限切れか |

検索ボックスを使用して特定の顧客を検索するか、[{{< ui >}}Cost Visibility{{< /ui >}}] または [{{< ui >}}Contract Status{{< /ui >}}] でテーブルをフィルタリングします。

## 更新を追跡する{#track-renewals}

顧客テーブルには各顧客の契約ステータスが表示されるため、どの契約の更新日が近づいているか、どの契約が既に期限切れになっているかを確認できます。[{{< ui >}}Contract Status{{< /ui >}}] で並べ替えまたはフィルタリングして、対応を急ぐべき契約をリストの上部に表示できます。

{{< img src="account_management/plan_and_usage/customer-contracts-renewals.png" alt="契約ステータスで並べ替えられた顧客テーブル。期限切れおよび期限切れ間近の契約が表示されている" >}}

## 契約詳細を確認する {#review-contract-details}

顧客を選択すると、その顧客の契約詳細パネルが開きます。[{{< ui >}}Current Contract{{< /ui >}}] タブには以下が表示されます。

- {{< ui >}}Spend Overview{{< /ui >}}: 前月の CMRR、前月の UMRR、および契約利用状況。
- {{< ui >}}Contract Info{{< /ui >}}: 影響ステータス (Influenced、または Not Influenced)、契約開始日、および契約終了日。
- {{< ui >}}Drawdown Depletion{{< /ui >}}: 合計コミットメント額、現在までの利用額、残高、予測合計額、予測超過額、および契約終了日と比較した予測枯渇日。このセクションは、契約期間中に顧客の利用に応じてコミットされた資金プールが消化されていくドローダウン契約の場合にのみ表示されます。

{{< img src="account_management/plan_and_usage/customer-contracts-detail.png" alt="利用額の概要、ドローダウン消化状況の進捗バー、および契約情報サイドバーを表示する顧客の契約詳細パネル。" >}}

[Customer Pricing][2] ページに移動する代わりに、このパネルの [{{< ui >}}Custom Pricing Configuration{{< /ui >}}] タブから顧客ごとの料金を設定できます。

## 請求書を監視する {#monitor-invoices}

契約詳細パネルの [{{< ui >}}Invoices{{< /ui >}}] タブには、その顧客のすべての請求書が、発行日、支払期日、金額、および支払ステータスとともに一覧表示されます。このタブから任意の請求書の PDF を開くことができます。顧客ごとの延滞残高はメインの顧客テーブルにも表示され、ページ上部のサマリータイルには、ポートフォリオ全体での延滞請求書の件数と合計金額が表示されます。

**注**: 支払いステータスは、その顧客の利用分に対する Datadog への請求書の支払いが完了しているかどうかを示します。エンドカスタマーからあなたへの支払いが完了しているかどうかは追跡されません。

{{< img src="account_management/plan_and_usage/customer-contracts-invoices.png" alt="契約詳細パネルの [Invoices] タブ。発行日、支払期日、金額、支払いステータス、および PDF を表示するためのリンクを含む請求書の一覧が表示されます。" >}}

## コスト可視化ステータスをチェックする{#check-cost-visibility-status}

エンドカスタマーは、あなたが公開した料金設定に基づき、自身の Datadog 組織内で、月初から現在までの当月、および過去の Datadog 利用料金の概算を確認できます。[{{< ui >}}Cost Visibility{{< /ui >}}] 列には、各顧客の現在のステータスが表示されます。

- {{< ui >}}Enabled{{< /ui >}}: 顧客は自身の組織における Datadog の利用料金を確認できます。
- {{< ui >}}Not configured{{< /ui >}}: この顧客向けの料金設定がまだ公開されていません。
- {{< ui >}}Update needed{{< /ui >}}: 顧客の契約内容が変更されたため、公開済みの料金設定を更新する必要があります。

ページ上部の [{{< ui >}}Cost Visibility Action Needed{{< /ui >}}] タイルには、{{< ui >}}Not configured{{< /ui >}} および {{< ui >}}Update needed{{< /ui >}} の状態にあるお客様の数が表示されます。

料金設定の公開や更新については、「[Customer Pricing][2]」を参照してください。この機能を顧客に説明する際は、「[パートナー経由で購入する顧客向けのコストの視覚化][3]」を共有してください。

{{< img src="account_management/plan_and_usage/customer-contracts-cost-visibility.png" alt="[コストの可視化]列が強調表示された顧客テーブル。ここでは、Enabled または Update needed とマークされた顧客が表示されています。" >}}

## アカウントの連絡先を探す{#find-account-contacts}

契約詳細パネルの [{{< ui >}}Contacts{{< /ui >}}] セクションには、アカウントに関する質問の窓口となる Datadog カスタマーサクセスマネージャー (CSM)、Datadog アカウントエグゼクティブ (AE)、パートナーセールスマネージャーのほか、顧客の請求書を受け取る請求担当者の連絡先が記載されています。

{{< img src="account_management/plan_and_usage/customer-contracts-contacts.png" alt="Datadog CSM、Datadog AE、請求担当者、パートナーセールスマネージャーが記載された契約詳細パネルの [Contacts] セクション。" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/customer-contracts
[2]: /ja/account_management/plan_and_usage/partner_experience/customer_pricing/
[3]: /ja/account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
[4]: /ja/account_management/rbac/