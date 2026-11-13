---
cascade:
  algolia:
    subcategory: Multi-Tenant Usage Metering and Billing
description: 管理組織（Admin Org）を通じて、エンド顧客の使用状況、コスト、および請求を一元管理します。
title: マルチテナント使用量の計測と請求
---
## 概要 {#overview}

Datadogソリューションプロバイダーとして、**パートナー管理組織**（Admin Org）を使用して、顧客組織全体のコストと使用状況を表示し、監視し、トライアル組織のプロビジョニング、および顧客ベース全体の請求状況の確認を行うことができます。管理組織（Admin Org）は、どの顧客組織とも分離されており、Datadogが所有しています。パートナーはパートナーロール（Partner Role）を付与されて招待されます。

<div class="alert alert-info">デフォルトでは、管理組織（Admin Org）は接続された顧客組織のコストおよび使用状況データへの読み取り専用アクセス権を付与します。管理組織（Admin Org）上での個人または社内のDatadog使用はサポートされていません。以下のプレビュー機能により、サポートされている価格設定ワークフローが追加されます。</div>

顧客組織は、そのDatadog契約にパートナーシップが含まれており、かつ有効である場合に、自動的に管理組織（Admin Org）に接続されます。接続後、顧客の使用状況とコストデータは、管理組織（Admin Org）からすべてのDatadogサイト（例：AP1、EU1、US1、US3、US5）にわたって表示可能になります。ただし、規制上の理由から独自の管理組織（Admin Org）が必要となるGovCloudサイトは除きます。

{{< img src="partners/multi_tenant_billing/admin_org_hierarchy.png" alt="複数の顧客組織に接続された管理組織（Admin Org）。" style="width:100%;" >}}

登録された案件から接続済みの顧客組織へと至るプロセスにおける各要素の役割については、[新規顧客のオンボーディング][15]を参照してください。

## 管理組織（Admin Org）の申請{#requesting-an-admin-org}

管理組織（Admin Org）を申請する前に、パートナーは以下の条件を満たしている必要があります。

- [Datadogパートナーポータル][1]にDatadogパートナーとして登録されていること。
- ソリューションプロバイダーとしてDatadogと取引するための契約に署名済みであること。
- Datadogパートナーとして承認されていること。

まだ登録されていないパートナーは、Datadogパートナーポータルで[今すぐ登録][17]できます。

{{< img src="partners/multi_tenant_billing/partner_portal_registration.png" alt="Datadogパートナーポータルの登録ページ。" style="width:100%;" >}}

登録済みのパートナーは、[partner-support@datadoghq.com][16]に連絡することで管理組織（Admin Org）を申請できます。申請には、セルフサービスでのトライアル組織作成のために、トライアル組織プロビジョナー（Trial Org Provisioner）機能の有効化が必要かどうかも含めてください。

## はじめに {#getting-started}

{{< whatsnext desc="管理組織（Admin Org）の使用を開始するには、以下のドキュメントを参照してください。">}}
  {{< nextlink href="/partners/multi_tenant_billing/customer-onboarding">}}<u>新規顧客のオンボーディング</u>：パートナーが、登録された案件から接続済みの顧客組織へと見込み顧客を導く方法。{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/trial-org-provisioning">}}<u>トライアル組織のプロビジョニング</u>: 管理組織から直接、見込み顧客向けのトライアル組織をプロビジョニングします。{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/troubleshooting">}}<u>トラブルシューティング</u>: 管理組織およびトライアル組織のプロビジョニングに関する一般的な問題を解決します。{{< /nextlink >}}
{{< /whatsnext >}}

## ユースケース{#use-cases}

管理組織が役立ついくつかの方法を以下に示します。

| ユースケース | 機能 |
|---|---|
| 見込み顧客向けのセルフサービスによるトライアル組織作成。| [トライアル組織のプロビジョニング][3]: 管理組織から直接トライアル組織を作成します。|
| すべての顧客のコストと使用状況を一元的に監視します。| [コストと使用状況の可視化][2]: 推定コスト、過去のコスト、予測コスト、および課金対象の使用状況データを表示します。|
| 顧客ポートフォリオ全体の使用状況メトリクスを追跡します。| [一元化された使用状況メトリクス][8]: 顧客の使用状況メトリクスを管理組織に集約します。|
| パートナーの価格設定に基づいた推定コストを顧客に表示します。| [顧客の価格設定][9]: 顧客ごとの価格を設定します。|
| 顧客ポートフォリオを一元管理します。| [顧客契約][10]: 顧客、契約、請求書、更新を追跡します。|

## トラブルシューティング{#troubleshooting}

管理組織およびトライアル組織の一般的な問題に関するヘルプについては、[トラブルシューティング][7]を参照してください。

[1]: https://partners.datadoghq.com
[2]: /ja/partners/multi_tenant_billing/cost-and-usage-visibility/
[3]: /ja/partners/multi_tenant_billing/trial-org-provisioning/
[7]: /ja/partners/multi_tenant_billing/troubleshooting/
[8]: /ja/partners/multi_tenant_billing/centralized-usage-metrics/
[15]: /ja/partners/multi_tenant_billing/customer-onboarding/
[16]: mailto:partner-support@datadoghq.com
[17]: https://partners.datadoghq.com/s/login/
[9]: /ja/account_management/plan_and_usage/partner_experience/customer_pricing/
[10]: /ja/account_management/plan_and_usage/partner_experience/customer_contracts/