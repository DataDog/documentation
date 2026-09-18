---
description: 管理組織（Admin Org）から、パートナーの取引先（顧客、契約、請求書）を管理します。
title: 顧客契約
---
<div class="alert alert-info">
「顧客契約」はプレビュー版です。
</div>

## 概要 {#overview}

「顧客契約」を使用すると、パートナーはDatadogとの取引における顧客、契約、請求書を一元管理できます。パートナーは、日常的な確認のためにパートナーアカウントチームに頼る必要がなく、この情報を直接検索できます。

管理組織（Admin Org）の{{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Contracts{{< /ui >}}に移動します。まだ設定されていない場合は、[管理組織（Admin Org）をリクエストする][2]を参照してください。

{{< img src="partners/multi_tenant_billing/customer_contracts.png" alt="管理組織（Admin Org）の「プランと使用量」の下にある「顧客契約」タブ。顧客と契約が一覧表示されます。" style="width:100%;" >}}

**注**：「顧客契約」を表示するには、「請求の読み取り（Billing Read）」権限が必要です。

## 含まれるもの {#whats-included}

- 管理組織（Admin Org）に接続されているすべての顧客、およびその現在および過去の契約。更新が近づいている、またはすでに更新日を過ぎている契約の更新リマインダーも含まれます。
- 契約MRR（CMRR）、利用MRR（UMRR）、影響ステータス、契約開始日と終了日、製品ごとの料金、および注文書のPDF。
- ドローダウン契約の場合、残高、予測超過分、および契約終了日と比較した予測枯渇日。
- MSP契約の場合、各契約にどの顧客が属しているか。
- 契約ごとの割引と利益率の可視化。
- 各顧客に対して[顧客価格設定][1]が有効になっているか、まだ設定されていないか、または契約変更後に更新が必要か。
- 顧客ごとの主要連絡先：DatadogのCSM、DatadogのAE、パートナーアカウントチーム、および請求書を受け取る請求担当者。

{{< img src="partners/multi_tenant_billing/customer_contracts_detail.png" alt="顧客の支出概要、ドローダウンの枯渇状況、契約情報、連絡先を表示する「顧客契約」詳細パネル。" style="width:100%;" >}}

請求書は顧客ごとに発行日、支払期限、金額、支払状況とともに一覧表示され、メインの「顧客契約」ページで期限超過数と合計に集計されます。

{{< img src="partners/multi_tenant_billing/customer_contracts_invoices.png" alt="顧客の請求書番号、日付、金額、ステータスを一覧表示する「顧客契約」請求書タブ。" style="width:100%;" >}}

## 関連ドキュメント {#related-docs}

- [管理組織（Admin Org）をリクエストする][2]

[1]: /ja/account_management/plan_and_usage/partner_experience/customer_pricing/
[2]: /ja/partners/multi_tenant_billing/#requesting-an-admin-org