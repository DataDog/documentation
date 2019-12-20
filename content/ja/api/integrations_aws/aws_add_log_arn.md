---
title: AWS ログ Lambda ARN の追加
type: apicontent
order: 16.08
external_redirect: '/api/#add-aws-log-lambda-arn'
---
## AWS ログ Lambda ARN の追加

[Datadog-AWS ログ収集][1]のために作成された Lambda の Lambda ARN を AWS アカウント ID に追加して、ログ収集を有効にします。

##### 引数

* **`account_id`** [必須]:

    AWS アカウント ID (ダッシュを含まない)。
    AWS アカウント ID の詳細については、[Datadog AWS インテグレーション][2]を参照してください。

* **`lambda_arn`** [必須]:
    [Datadog-Amazon Web サービスのログ収集セットアップ中に作成された Datadog Lambda][1] の ARN。

[1]: /ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[2]: /ja/integrations/amazon_web_services/#configuration