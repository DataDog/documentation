---
description: Datadog AWS インテグレーションを手動でセットアップする手順
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: ドキュメント
  text: AWS インテグレーション
- link: https://docs.datadoghq.com/serverless/libraries_integrations/forwarder/
  tag: ドキュメント
  text: Datadog Forwarder Lambda 関数
- link: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
  tag: ガイド
  text: Datadog Kinesis Firehose の宛先を使用して AWS サービスログを送信する
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: ガイド
  text: AWS インテグレーションのトラブルシューティング
- link: https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
  tag: ガイド
  text: Kinesis Data Firehose を使用した AWS CloudWatch メトリクスストリーム
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: ブログ
  text: AWS 監視のための主要なメトリクス
- link: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog/
  tag: ブログ
  text: Datadog で EC2 インスタンスを監視する方法
- link: https://www.datadoghq.com/blog/monitoring-aws-lambda-with-datadog/
  tag: ブログ
  text: Datadog を使用した AWS Lambda の監視
- link: https://www.datadoghq.com/blog/cloud-security-posture-management/
  tag: ブログ
  text: Datadog クラウドセキュリティポスチャ管理
- link: https://www.datadoghq.com/blog/datadog-workload-security/
  tag: ブログ
  text: Datadog クラウドワークロードセキュリティでリアルタイムにインフラストラクチャーを保護する
- link: https://www.datadoghq.com/blog/announcing-cloud-siem/
  tag: ブログ
  text: Datadog セキュリティモニタリングが新登場
kind: ガイド
title: AWS マニュアルセットアップガイド
---

## 概要

このガイドを使用して、Datadog [AWS インテグレーション][1]を手動でセットアップします。

{{< tabs >}}
{{< tab "Role delegation" >}}

AWS インテグレーションを手動で設定するには、AWS アカウントで IAM ポリシーと IAM ロールを作成し、Datadog アカウントで生成された AWS External ID でそのロールを構成します。これにより、Datadog の AWS アカウントは、自動的に AWS API をクエリし、Datadog アカウントにデータをプルすることができます。以下のセクションでは、これらの各コンポーネントを作成し、Datadog アカウントでセットアップを完了するための手順を詳しく説明します。

## セットアップ

### 外部 ID を生成する
インテグレーションページの <a href="https://app.datadoghq.com/account/settings#integrations/amazon_web_services" target="_blank">AWS インテグレーションタイル</a>で External ID を生成します。これは、Datadog 用に作成する AWS IAM ロールの信頼ポリシーで使用されます。
1. `Configuration` タブを選択し、`Role Delegation` を選択します。
2. `Manually` をクリックします。これにより、AWS IAM ロールの構成に使用される AWS External ID が作成されます。External ID の詳細については、[IAM ユーザーガイド][1]を参照してください。
3. この値をクリップボードまたはメモ帳にコピーします。
  **注: 外部 ID の値がリセットされるため、インテグレーションタイルや Datadog アプリケーションページを閉じないでください。**

### Datadog のための AWS IAM ポリシー
Datadog が提供するすべての AWS インテグレーションを利用するために、AWS アカウントの Datadog ロールに[必要な権限](#aws-integration-iam-policy)を持つ IAM ポリシーを作成します。インテグレーションに他のコンポーネントが追加されると、これらの権限は変更される可能性があります。

4. AWS [IAM コンソール][2]で新しいポリシーを作成します。 
5. `JSON` タブを選択します。テキストボックスに[権限ポリシー](#aws-integration-iam-policy)を貼り付けます。
6. `Next: Tags` と `Review policy` をクリックします。
7. ポリシーに `DatadogAWSIntegrationPolicy`、または自分が選択した名前を付け、適切な説明を入力します。
8. `Create policy` をクリックします。

### Datadog のための AWS IAM ロール
IAM ポリシーで定義された権限を使用するために、Datadog 用の IAM ロールを作成します。

9. AWS [IAM コンソール][3]で新しいロールを作成します。 
10. ロールタイプで、`Another AWS account` を選択します。
11. アカウント ID で、`464622532012` (Datadog のアカウント ID) を入力します。これは、Datadog に AWS データへのアクセスを許可することを意味します。
12. `Require external ID` を選択し、[AWS External ID](#generate-an-external-id) で生成されたものを入力します。
**Require MFA** を無効にします。
13. `Next` をクリックします。
14. すでにポリシーを作成している場合は、このページで検索して選択します。そうでない場合は、新しいウィンドウで開く `Create Policy` をクリックし、[Datadog のための AWS IAM ポリシー](#aws-integration-iam-policy)の説明に従って操作してください。
15. Datadog の[クラウドセキュリティポスチャ管理製品][4]を使用する場合は、オプションで AWS SecurityAudit ポリシーをロールにアタッチします。
16. `Next: Tags` と `Next: Review` をクリックします。
17. ロールに `DatadogIntegrationRole` などの名前を付け、適切な説明を入力します。
18. `Create Role` をクリックします。

### Datadog で設定を完了する

19. 別のタブで開いていた Datadog アカウントの AWS インテグレーションタイルページに戻り、AWS アカウント ID を**ダッシュなしで**入力します (例: `123456789012`)。アカウント ID は、Datadog 用に作成されたロールの ARN に記載されています。
20. 作成したロールの名前を入力します。
**注:** インテグレーションタイルに入力する名前は大文字と小文字が区別され、AWS 側で作成されるロール名と完全に一致する必要があります。
21. [Datadog is not authorized to perform sts:AssumeRole][5] (Datadog は sts:AssumeRole を実行する権限がありません) エラーが発生した場合、AWS 信頼ポリシーの `sts:ExternalId:` が以前にインテグレーションタイルで作成した `AWS External ID` と一致しているか確認してください。
22. **Install Integration** をクリックします。
23. データ収集が開始されるまで最大 10 分待ち、すぐに使える <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">AWS 概要ダッシュボード</a>を表示し、AWS サービスやインフラストラクチャーから送信されるメトリクスを確認します。

[1]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[2]: https://console.aws.amazon.com/iam/home#/policies
[3]: https://console.aws.amazon.com/iam/home#/roles
[4]: /ja/security_platform/cspm
[5]: /ja/integrations/guide/error-datadog-not-authorized-sts-assume-role/
{{< /tab >}}

{{< tab "アクセスキー (GovCloud または中国のみ)" >}}

## セットアップ

### AWS

1. AWS のコンソールで、Datadog インテグレーションで使用する IAM ユーザーを[必要な権限](#aws-integration-iam-policy)で作成します。
2. Datadog インテグレーション IAM ユーザー用のアクセスキーとシークレットキーを生成します。

詳しくは、AWS のドキュメント、[第三者にお客様の AWS リソースへのアクセスを許可する際の外部 ID の使用方法][1]をご覧ください。

### Datadog

3. [AWS インテグレーション タイル][2]を開きます。
4. **Access Keys (GovCloud or China Only)** タブを選択します。
5. `AWS アクセスキー` と `AWS シークレットキー` を入力します。GovCloud および中国用のアクセスキーとシークレットキーのみが許可されます。
6. ダイアログの左側で、メトリクスを収集するサービスを選択します。
7. オプションで、すべてのホストやメトリクスにタグを追加します。
8. オプションで、`to hosts with tag` テキストボックスに AWS タグを入力して、EC2 インスタンスのサブセットを監視します。**注:** インスタンスに接続された EBS ボリュームにも適用されます。
9. オプションで、`to Lambdas with tag` テキストボックスに AWS タグを入力して、Lambdas のサブセットを監視します。
10. **Install Integration** をクリックします。

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
{{< /tab >}}
{{< /tabs >}}

{{< aws-permissions >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_web_services/