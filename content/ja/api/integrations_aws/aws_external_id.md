---
title: 外部 ID の生成
type: apicontent
order: 15.06
external_redirect: '/api/#generate-external-ids'
---
## 外部 ID の生成

特定の AWS アカウント ID/ロール名ペアに対して新しい AWS 外部 ID を作成します。

**引数**:

* **`account_id`** [必須]:

    AWS アカウント ID (ダッシュを含まない)。
    AWS アカウント ID の詳細については、[Datadog AWS インテグレーション][1]を参照してください。

* **`role_name`** [必須]:

    Datadog ロールの委任名。
    AWS アカウントのロール名の詳細については、[Datadog AWS インテグレーション構成情報を参照してください][2]。

[1]: /ja/integrations/amazon_web_services/#configuration
[2]: /ja/integrations/amazon_web_services/#installation