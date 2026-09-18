---
description: 管理組織 (Admin Org) から、接続されているすべての顧客組織のコストと請求対象の使用量を監視します。
title: コストと使用量の可視性
---
## 概要 {#overview}

顧客組織の契約にパートナーシップが含まれており、かつ有効である場合、その顧客組織は自動的にパートナー管理組織 (Admin Org) に接続されます。接続後、顧客が使用するすべての Datadog サイトにわたる顧客の使用量とコストデータを、管理組織 (Admin Org) から確認できるようになります。接続は契約終了の 30 日後に自動的に解除されます。これにより、契約更新期間中もパートナーが可視性を維持できる猶予期間が設けられています。

**注**: トライアル組織の使用量は、その顧客組織がこの方法で接続されるまでここには含まれません。[トライアル組織のプロビジョニング][4]を参照してください。

## コストと使用量データを表示する {#view-cost-and-usage-data}

管理組織の {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Usage & Cost{{< /ui >}} に移動すると、接続されているすべての顧客組織について、推定コスト、履歴コスト、予測コスト、および請求対象の使用量データを、顧客、製品、またはアカウントごとにグループ化およびフィルタリングして表示できます。詳細は[パートナー向けプランと使用量エクスペリエンス][1]を参照してください。

コストと使用量のデータは、以下の[使用量計測 API][2] エンドポイントを通じてプログラムから取得することもできます。

| API | 用途 | 備考 |
|---|---|---|
| [アカウント全体の推定コストを取得][6] | 当月および前月の推定コスト | 要件 `include_connected_accounts=true` |
| [アカウント全体の履歴コストを取得][7] | 過去数か月の履歴コスト | 要件 `include_connected_accounts=true` |
| [アカウント全体の予測コストを取得][8] | 当月の月末予測コスト | 要件 `include_connected_accounts=true` |
| [アカウント全体の請求対象の使用量を取得][9] | 請求対象の使用量の概要 | 要件 `include_connected_accounts=true` |
| [アカウント全体の使用量を取得][10] | アカウント全体の使用量の概要 | 要件 `include_connected_accounts=true` |
| [製品ファミリー別の時間単位の使用量を取得][11] | 製品ファミリー別の時間単位の使用量 | 要件 `filter[include_connected_accounts]=true` |

## 関連ドキュメント {#related-docs}

- [一元化された使用量メトリクス][3]: すべての接続されている顧客組織から集計された使用量メトリクス。
- [トライアル組織のプロビジョニング][4]: 見込み顧客向けのトライアル組織をプロビジョニングします。

[1]: /ja/account_management/plan_and_usage/partner_experience/
[2]: /ja/api/latest/usage-metering/
[3]: /ja/partners/multi_tenant_billing/centralized-usage-metrics/
[4]: /ja/partners/multi_tenant_billing/trial-org-provisioning/
[6]: /ja/api/latest/usage-metering/#get-estimated-cost-across-your-account
[7]: /ja/api/latest/usage-metering/#get-historical-cost-across-your-account
[8]: /ja/api/latest/usage-metering/#get-projected-cost-across-your-account
[9]: /ja/api/latest/usage-metering/#get-billable-usage-across-your-account
[10]: /ja/api/latest/usage-metering/#get-usage-across-your-account
[11]: /ja/api/latest/usage-metering/#get-hourly-usage-by-product-family