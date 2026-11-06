---
description: Datadog で顧客向けのコストの視覚化を有効にするには、Customer Pricing ページからお客様固有の価格を設定します。
further_reading:
- link: /partners/multi_tenant_billing/
  tag: ドキュメント
  text: マルチテナント使用量の計測と請求
- link: /account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
  tag: ドキュメント
  text: パートナー経由で購入する顧客向けのコストの視覚化
- link: /account_management/plan_and_usage/partner_experience/
  tag: ドキュメント
  text: パートナー向けプランと使用量エクスペリエンス
- link: /account_management/plan_and_usage/bill_overview/
  tag: ドキュメント
  text: 請求の概要
title: Customer Pricing
---
[Customer Pricing][2] ページでは、パートナーが顧客固有のレートを設定し、再販顧客向けのコストの視覚化を有効にできます。レートの設定は顧客ごとに 1 回限りのセットアップであり、価格はいつでも更新できます。顧客のエクスペリエンスの詳細や、顧客と共有するリソースについては、[パートナー経由で購入する顧客向けのコストの視覚化][1] を参照してください。

## 前提条件 {#prerequisites}

顧客価格を設定するには、以下が必要です。

- Datadog 管理組織。[マルチテナント使用量の計測と請求][3] プログラムを通じてリクエストできます。
- Billing Edit (`billing_edit`) 権限。Billing Read (`billing_read`) のみのユーザーは、保存または公開された顧客レートを表示することができますが、編集することはできません。

## 顧客価格をセットアップする {#set-up-customer-pricing}

1. Datadog 管理組織にログインします。
1. [{{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Pricing{{< /ui >}}][2] に移動します。
   {{< img src="account_management/plan_and_usage/customer-pricing-nav.png" alt="プランと使用方法セクションの Customer Pricing タブ。" >}}
1. ドロップダウンから顧客を選択します。再販契約の対象となる顧客のみがリストに表示されます。
   {{< img src="account_management/plan_and_usage/customer-pricing-select-customer.png" alt="再販顧客がリストされた顧客選択ドロップダウン。" >}}
1. テーブルで、顧客の契約製品と対応する販売価格を確認します。
1. {{< ui >}}Edit{{< /ui >}} をクリックし、各契約製品の顧客価格を入力します。価格は、一括、個別、またはその両方を組み合わせて編集できます。
   {{< img src="account_management/plan_and_usage/customer-pricing-edit-bulk.png" alt="顧客の契約製品に対する一括価格編集コントロール。" >}}
   {{< img src="account_management/plan_and_usage/customer-pricing-edit-individual.png" alt="各契約製品の個別ドラフト価格フィールド。" >}}
1. 顧客の契約に含まれていない製品のデフォルト価格設定ルールを設定します。
    - デフォルトでは、非契約製品のオンデマンド料金は Datadog のリスト価格に設定されています。代わりに販売価格にパーセンテージのマークアップを適用し、オプションでマークアップされた料金に Datadog のリスト価格を上限として設定することもできます。
   {{< img src="account_management/plan_and_usage/customer-pricing-default-rule.png" alt="非契約製品のデフォルト価格設定ルール構成。" >}}
1. {{< ui >}}Save{{< /ui >}} をクリックして、ドラフトを保存します。ドラフトは Datadog 管理者組織のみで表示されます。
1. 入力内容を確認し、{{< ui >}}Publish{{< /ui >}} をクリックします。

公開後、24 時間以内にその顧客のコストの視覚化が有効になります。その後、顧客は Datadog 組織内で使用量および提供された料金に基づいた推定コストおよび過去のコストを確認できるようになります。公開された価格は、新規契約であれ既存契約の条件変更であれ、顧客の契約に対する直近の変更時点から有効となります。

## 価格を更新する {#update-pricing}

公開後に顧客の料金を変更するには、{{< ui >}}Customer Pricing{{< /ui >}} ページに戻って値を編集し、再度公開してください。更新が顧客に表示されるまでに最大 24 時間かかる場合があります。

## 制限事項 {#limitations}

顧客のドロップダウンに表示されるには、顧客が対象となる再販契約を結んでいる必要があります。Customer Pricing は、以下の契約タイプおよび組織をサポートしていません。

- **従来のマネージドサービスプロバイダー (MSP) 契約** (多くの顧客が単一の契約でカバーされている場合)。
- **AWS、Google Cloud、または Azure Marketplace を通じて購入する顧客向けの、ドローダウン契約のない Cloud Marketplace 契約**。
- **顧客が同時に 2 つのチャネルパートナーを通じて調達を行う契約。**たとえば、Datadog からパートナー 1、パートナー 2 を経由して顧客に至る場合などです。
- **GovCloud 組織。**

機能の可用性やコスト精度の注意点を含む制限事項の全リストについては、[パートナー経由で購入する顧客向けのコストの視覚化][1] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
[2]: https://app.datadoghq.com/billing/customer-pricing
[3]: /ja/partners/multi_tenant_billing/#requesting-an-admin-org