---
aliases:
- /ja/integrations/faq/error-datadog-not-authorized-sts-assume-role
further_reading:
- link: /integrations/amazon_web_services/#installation
  tag: ドキュメント
  text: AWS Datadog インストール
title: 'エラー: Datadog に sts:AssumeRole を実行する権限がない'
---

このエラーは通常、Datadog　インテグレーションロールに関連する信頼ポリシーに問題があることを示しています。ほとんどの場合、この問題は[ロールの委譲プロセス][1]によって引き起こされます。

エラーに記載されている AWS アカウントについて、以下の点をご確認ください。

{{< site-region region="us,us3,us5,eu,gov" >}}
1. IAM ロールを作成した場合、[Datadog AWS インテグレーションページ][2]で正しい IAM ロール名を使用していることを確認してください。AWS または Datadog に余分なスペースや文字があると、ロールの委任が失敗します。CloudFormation を使用してロールをデプロイした場合、デフォルトの IAM ロール名は [DatadogIntegrationRole][3] に設定されています。

2. AWS の Datadog インテグレーションロールのページで、**Trust relationships** タブの下に、**Principal** が以下のように構成されていることを確認します。

{{< code-block lang="json" filename="" disable_copy="true" collapsible="false" >}}

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::464622532012:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<YOUR_AWS_EXTERNAL_ID>"
                }
            }
        }
    ]
}

{{< /code-block >}}

[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
{{< /site-region >}}
{{< site-region region="ap1" >}}
1. IAM ロールを作成した場合、[Datadog AWS インテグレーションページ][2]で正しい IAM ロール名を使用していることを確認してください。AWS または Datadog に余分なスペースや文字があると、ロールの委任が失敗します。CloudFormation を使用してロールをデプロイした場合、デフォルトの IAM ロール名は [DatadogIntegrationRole][3] に設定されています。

2. AWS の Datadog インテグレーションロールのページで、**Trust relationships** タブの下に、**Principal** が以下のように構成されていることを確認します。

{{< code-block lang="json" filename="" disable_copy="true" collapsible="false" >}}

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::417141415827:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<YOUR_AWS_EXTERNAL_ID>"
                }
            }
        }
    ]
}

{{< /code-block >}}

[2]: https://ap1.datadoghq.com/integrations/amazon-web-services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
{{< /site-region >}}

3. ロールページの AWS External ID は、[AWS インテグレーションページ][2]の **Account Details** タブの AWS External ID の値と一致する必要があります。AWS の IAM ロールを Datadog のインテグレーションページから AWS External ID の値で更新するか、Datadog で新しい AWS External ID を生成して **Save** をクリックします。
  {{< img src="integrations/guide/aws_error_sts_assume_role/new-aws-external-id.png" alt="AWS Role Name フィールドと AWS External ID フィールド、Generate New ID ボタンがある Datadog AWS インテグレーションページ" >}}

4. 新しい AWS External ID を生成した場合は、AWS の信頼ポリシーに追加します。
  {{< img src="integrations/guide/aws_error_sts_assume_role/aws-trust-policy-document.png" alt="sts:ExternalId パラメータをハイライトした AWS Trust Policy ドキュメント" >}}

**注**: エラーは、変更が反映されるまでの数時間、UI で継続する**可能性があります**。

1 つまたはいくつかの地域に限定して STS AssumeRole エラーが表示される場合
```
Datadog is not authorized to perform action sts:AssumeRole Account affected:<account_id> Regions affected: us-east-1, eu-west-1
```
問題の原因は、[AWS Service Control Policies][4] にある可能性があります。
```
Service control policies (SCPs) are a type of organization policy that you can use to manage permissions in your organization. SCPs offer central control over the maximum available permissions for all accounts in your organization. SCPs help you to ensure your accounts stay within your organization's access control guidelines.
```

インテグレーションページでのエラーを取り除くには、AWS インテグレーションで **General** タブで地域を除外するか、[Update an AWS integration][5] API を使用してください。

さらにヘルプが必要な場合は、[Datadog サポート][6]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_web_services/?tab=roledelegation#setup
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
[5]: https://docs.datadoghq.com/ja/api/latest/aws-integration/#update-an-aws-integration
[6]: /ja/help/