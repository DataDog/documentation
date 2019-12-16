---
title: AWS サービスのログ収集の有効化
type: apicontent
order: 16.09
external_redirect: '/api/#enable-an-aws-service-log-collection'
---
## AWS サービスのログ収集の有効化

AWS サービスの自動ログ収集を有効にします。

##### 引数

* **`account_id`** [必須]:

    AWS アカウント ID (ダッシュを含まない)。
    AWS アカウント ID の詳細については、[Datadog AWS インテグレーション][1]を参照してください。

* **services** [必須]:
    自動ログ収集を有効にするように設定されるサービス ID の配列。
    使用可能なサービスのリストは、[AWS ログ対応サービスのリストの取得][2] API エンドポイントから入手できます。

[1]: /ja/integrations/amazon_web_services/#configuration
[2]: /ja/api/#get-list-of-aws-log-ready-services