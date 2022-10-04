---
aliases:
- /ja/integrations/faq/error-datadog-not-authorized-sts-assume-role
further_reading:
- link: /integrations/amazon_web_services/#installation
  tag: ドキュメント
  text: AWS Datadog インストール
kind: ガイド
title: 'エラー: Datadog に sts:AssumeRole を実行する権限がない'
---

このエラーは通常、Datadog　インテグレーションロールに関連する信頼ポリシーに問題があることを示しています。ほとんどの場合、この問題は[ロールの委譲プロセス][1]によって引き起こされます。

エラーに記載されている AWS アカウントについて、以下の点をご確認ください。

1. IAM ロールを作成する際、[Datadog AWS インテグレーションページ][2]で正しい IAM ロール名を使用していることを確認してください。AWS または Datadog に余分なスペースや文字があると、ロールの委任が失敗します。CloudFormation を使用してロールをデプロイした場合、デフォルトの IAM ロール名は [DatadogIntegrationRole][3] に設定されています。
    {{< img src="integrations/guide/aws_error_sts_assume_role/create-role-review.png" alt="AWS Create IAM Role Review ページで、Role name に DatadogAWSIntegrationRole、Trusted entities にアカウント 464622532012、Policies に DatadogAWSIntegrationPolicy が記載されている" >}}

2. Datadog のアカウント ID `464622532012` が `Another AWS account` の下に入力されていることを確認してください。他のアカウント ID を入力するとインテグレーションに失敗します。また、`Required MFA` が **unchecked** であることを確認してください。
    {{< img src="integrations/guide/aws_error_sts_assume_role/create-role-configuration.png" alt="AWS Create IAM Role ページで、Type of Trusted Entity に Another AWS Account を選択し、アカウント ID に 464622532012 を入力し、必須の MFA ボタンのチェックを外しています" >}}

3. [Datadog AWS インテグレーションページ][2]の **Account Details** で新しい AWS External ID を生成し、**Save** をクリックします。
  {{< img src="integrations/guide/aws_error_sts_assume_role/datadog-aws-integration-page.png" alt="AWS Role Name フィールドと AWS External ID フィールド、Generate New ID ボタンがある Datadog AWS インテグレーションページ" >}}

4. 新しく生成された AWS External ID を AWS の信頼ポリシーに追加します。
  {{< img src="integrations/guide/aws_error_sts_assume_role/aws-trust-policy-document.png" alt="sts:ExternalId パラメータをハイライトした AWS Trust Policy ドキュメント" >}}

なお、エラーは、変更が反映されるまでの数時間、UI で継続する**可能性があります**。

1 つまたはいくつかの地域に限定して STS AssumeRole エラーが表示される場合
```
Datadog is not authorized to perform action sts:AssumeRole Account affected:<account_id> Regions affected: us-east-1, eu-west-1 
```
問題の原因は、[AWS Service Control Policies][4] にある可能性があります。
```
Service control policies (SCPs) are a type of organization policy that you can use to manage permissions in your organization. SCPs offer central control over the maximum available permissions for all accounts in your organization. SCPs help you to ensure your accounts stay within your organization’s access control guidelines.
```

インテグレーションページでのエラーを取り除くには、AWS インテグレーションで **General** タブで地域を除外するか、[Update an AWS integration][5] API を使用してください。

さらにヘルプが必要な場合は、[Datadog サポート][6]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_web_services/?tab=roledelegation#setup
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
[4]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
[5]: https://docs.datadoghq.com/ja/api/latest/aws-integration/#update-an-aws-integration
[6]: /ja/help/