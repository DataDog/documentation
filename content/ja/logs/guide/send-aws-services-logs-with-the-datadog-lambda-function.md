---
further_reading:
- link: /logs/explorer/
  tag: ドキュメント
  text: ログの調査方法
- link: /logs/explorer/#visualize
  tag: ドキュメント
  text: ログ分析の実行
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法
kind: documentation
title: Datadog の Lambda 関数で AWS サービスのログを送信する
---

AWS サービスログは、Datadog Forwarder Lambda 関数を使用して収集できます。S3 Buckets、CloudWatch ロググループ、および EventBridge イベントでトリガーするこの Lambda は、ログを Datadog に転送します。

AWS サービスからログの収集を開始するには

1. AWS アカウントで [Datadog Forwarder Lambda 関数][1]をセットアップします。
2. AWS サービスで[ログを有効にします](#enable-logging-for-your-aws-service) (大部分の AWS サービスは、S3 バケットまたは CloudWatch ログ グループにログインできます)。
3. 転送する新しいログがあったときに Forwarder Lambda を実行させる[トリガーの設定](#set-up-triggers)をします。トリガーの構成は 2 通りあります。

**注**: AWS `us-east-1` リージョンにいる場合は、[Datadog-AWS Private Link][2] を利用してください。

**注**: Cloudformation は、すべてのリソースに対して KMS:Decrypt を含む IAM ポリシーを作成し、AWS Security Hub のベストプラクティスと一致しません。この権限は、Lambda 関数を設定するために KMS で暗号化された S3 バケットからオブジェクトを復号するために使用され、どの KMS キーが S3 バケットの暗号化に使用されているかは予測できません。インストーラーが正常に終了したら、この権限を安全に削除することができます。

## AWS サービスのログを有効にする

S3 バケットまたは CloudWatch ロググループにログを生成する AWS サービスがサポートされています。以下の表で、よく使用されるサービスのセットアップ手順を参照してください。

| AWS サービス                        | AWS サービス ログを有効にする                                                                    | AWS ログを Datadog に送信する                                                    |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [API Gateway][6]                  | [AWS API Gateway ログを有効にする][7]                                                               | [手動][8]および[自動](#automatically-set-up-triggers)ログコレクション                                                |
| [Cloudfront][9]                   | [AWS Cloudfront ログを有効にする][10]                                                                | [手動][11]および[自動](#automatically-set-up-triggers)ログコレクション  |
| [Cloudtrail][12]                   | [AWS Cloudtrail ログを有効にする][12]                                                                | [手動][13]ログコレクション                                                 |
| [DynamoDB][14]                     | [AWS DynamoDB ログを有効にする][15]                                                                  | [手動][16]ログコレクション                                                 |
| [EC2][17]                          | `-`                                                                                             | [Datadog Agent][17] を使用してログを Datadog に送信します                    |
| [ECS][18]                          | `-`                                                                                             | [docker Agent を使用してログを収集します][19]                              |
| [Elastic Load Balancing (ELB)][20] | [AWS ELB ログを有効にする][21]                                                                       | [手動][22]および[自動](#automatically-set-up-triggers)ログコレクション  |
| [Lambda][23]                       | `-`                                                                                             | [手動][24]および[自動](#automatically-set-up-triggers)ログコレクション |
| [RDS][25]                         | [AWS RDS ログを有効にします][26]                                                                      | [手動][27]ログコレクション                                                |
| [Route 53][28]                    | [AWS Route 53 ログを有効にする][29]                                                                 | [手動][30]ログコレクション                                                |
| [S3][31]                          | [AWS S3 ログを有効にする][32]                                                                       | [手動][33]および[自動](#automatically-set-up-triggers)ログコレクション |
| [SNS][34]                         | 「SNS ログ」はありません。SNS サービスに送信されるログとイベントを処理します。 | [手動][35]ログコレクション                                                |
| [RedShift][36]                    | [AWS Redshift ログを有効にします][37]                                                                 | [手動][38]および[自動](#automatically-set-up-triggers)ログコレクション |
| [VPC][39]                         | [AWS VPC ログを有効にする][40]                                                                      | [手動][41]ログコレクション                                                |

## トリガーの設定

Datadog Forwarder Lambda 関数でトリガーを構成する場合、オプションは 2 つあります。

- [自動](#automatically-set-up-triggers): Datadog は、選択されている AWS サービスのログロケーションを自動的に受信し、Datadog Forwarder Lambda 関数のトリガーとして追加します。また、リストを最新状態に維持します。
- [手動](#automatically-set-up-triggers): 各トリガーをセットアップします。

### トリガーを自動的にセットアップする

Datadog は、Datadog Forwarder Lambda 関数にトリガーを自動的に構成し、以下のソースとロケーションから AWS ログを収集することができます。

| ソース                          | 場所       |
| ------------------------------- | ---------------|
| `APIKEY` を `AccessKey` ボックスに貼り付けます ([Datadog API 設定ページ][3]から API キーを取得できます)。         | CloudWatch     |
| API ゲートウェイの実行ログ      | CloudWatch     |
| アプリケーション ELB アクセスログ     | **注**: 2 つ以上のソースにサブスクライブする場合、このセットアップを完了後、新しい Kinesis ストリームにサブスクライブすることができます。             |
| クラシック ELB アクセスログ         | **注**: 2 つ以上のソースにサブスクライブする場合、このセットアップを完了後、新しい Kinesis ストリームにサブスクライブすることができます。             |
| CloudFront のアクセスログ          | **注**: 2 つ以上のソースにサブスクライブする場合、このセットアップを完了後、新しい Kinesis ストリームにサブスクライブすることができます。             |
| Lambda ログ                     | CloudWatch     |
| Redshift ログ                   | **注**: 2 つ以上のソースにサブスクライブする場合、このセットアップを完了後、新しい Kinesis ストリームにサブスクライブすることができます。             |
| S3 アクセスログ                  | **注**: 2 つ以上のソースにサブスクライブする場合、このセットアップを完了後、新しい Kinesis ストリームにサブスクライブすることができます。             |

1. [Datadog ログコレクション AWS Lambda 関数][1]をまだセットアップしていない場合は、セットアップします。
2. [Datadog と AWS のインテグレーション][3]に使用する IAM ロールのポリシーに、次のアクセス許可があることを確認します。この許可の使用方法については、以下に説明されています。

    ```text
    "cloudfront:GetDistributionConfig",
    "cloudfront:ListDistributions",
    "elasticloadbalancing:DescribeLoadBalancers",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "lambda:List*",
    "lambda:GetPolicy",
    "redshift:DescribeClusters",
    "redshift:DescribeLoggingStatus",
    "s3:GetBucketLogging",
    "s3:GetBucketLocation",
    "s3:GetBucketNotification",
    "s3:ListAllMyBuckets",
    "s3:PutBucketNotification",
    "logs:PutSubscriptionFilter",
    "logs:DeleteSubscriptionFilter",
    "logs:DescribeSubscriptionFilters"
    ```

    | AWS アクセス許可                                           | 説明                                                                  |
    | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
    | `cloudfront:GetDistributionConfig`                          | CloudFront アクセスログを含む S3 バケットの名前を取得します。             |
    | `cloudfront:ListDistributions`                              | すべての CloudFront ディストリビューションを一覧表示します。|
    | `elasticloadbalancing:`<br>`DescribeLoadBalancers`          | すべてのロードバランサーを一覧表示します。|
   [ロググループインデックスページ][1] の `Subscriptions` をチェックして、新しい Kinesis ストリームがロググループをサブスクライブしているかを確認します。
    | `lambda:List*`                                              | すべての Lambda 関数を一覧表示します。 |
    | `lambda:GetPolicy`                                          | トリガーが解除された際に Lambda ポリシーを取得します。|
    | `redshift:DescribeClusters`                                 | すべての Redshift クラスターを一覧表示します。|
    | `redshift:DescribeLoggingStatus`                            | Redshift ログを含む S3 バケットの名前を取得します。|
    | `s3:GetBucketLogging`                                       | S3 アクセスログを含む S3 バケットの名前を取得します。|
    | `s3:GetBucketLocation`                                      | S3 アクセスログを含む S3 バケットのリージョンを取得します。|
    | `s3:GetBucketNotification`                                  | 既存の Lambda トリガーコンフィギュレーションを取得します。    |
   {{< partial name="whats-next/whats-next.html" >}}
    | `s3:PutBucketNotification`                                  | S3 バケットのイベントに基づいて Lambda トリガーを追加または削除します。|
    | `logs:PutSubscriptionFilter`                                | CloudWatch ログのイベントに基づいて Lambda トリガーを追加します。|
    | `logs:DeleteSubscriptionFilter`                             | CloudWatch ログのイベントに基づいて Lambda トリガーを削除します。|
    | `logs:DescribeSubscriptionFilters`                          | 特定のロググループのサブスクリプションフィルターを一覧表示します。|

3. [AWS インテグレーションページ][4]で、ログを収集する AWS アカウントを選択し、**Log Collection** タブをクリックします。
   {{< img src="logs/aws/aws_log_setup_step1.png" alt="特定の AWS アカウントの AWS インテグレーションページの Log Collection タブに、AWS Services のログを送信する指示と、Forwarder Lambda 関数の ARN を入力して自動的にサブスクライブするテキストボックスが表示されます。" popup="true" style="width:90%;" >}}
4. 前のセクションで作成した Lambda の ARN を入力し、**Add** をクリックします。
5. ログを収集するサービスを選択し、**Save** をクリックします。特定のサービスからのログの収集を停止するには、ログソースの選択を解除します。
   {{< img src="logs/aws/aws_log_setup_step2.png" alt="Included ARNs に 1 つの Lambda 関数が正常に入力され、Log Sources でいくつかのサービスが有効になっている特定の AWS アカウントの AWS インテグレーションページの Log Collection タブ" popup="true" style="width:90%;" >}}
6. 複数のリージョンにログがある場合は、そのリージョンに追加の Lambda 関数を作成して、このページに入力する必要があります。
7. すべての AWS ログの収集を停止するには、Lambda にカーソルを合わせ、Delete アイコンをクリックします。その関数のトリガーがすべて削除されます。
8. この初期のセットアップから数分以内に、AWS ログが Datadog [ログエクスプローラー][5]に表示されるようになります。

### 手動でトリガーをセットアップする

#### CloudWatch ロググループからログを収集する

CloudWatch のロググループからログを収集している場合、以下のいずれかの方法で [Datadog Forwarder Lambda 関数][1]へのトリガーを構成します。

{{< tabs >}}
{{% tab "AWS コンソール" %}}

1. AWS コンソールで、**Lambda** に移動します。
2. **Functions** をクリックし、Datadog Forwarder を選択します。
3. **Add trigger** をクリックし、**CloudWatch Logs** を選択します。
4. ドロップダウンメニューからロググループを選択します。
5. フィルターの名前を入力し、オプションでフィルターパターンを指定します。
6. **Add** をクリックします。
7. [Datadog Log セクション][1]にアクセスし、ロググループに送信された新しいログイベントを確認します。

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Terraform ユーザーは、[aws_cloudwatch_log_subscription_filter][1] リソースを使いトリガーのプロビジョニングと管理ができます。以下のサンプルコードを参照してください。

```conf
resource "aws_cloudwatch_log_subscription_filter" "datadog_log_subscription_filter" {
  name            = "datadog_log_subscription_filter"
  log_group_name  = <CLOUDWATCH_LOG_GROUP_NAME> # 例: /aws/lambda/my_lambda_name
  destination_arn = <DATADOG_FORWARDER_ARN> # 例: arn:aws:lambda:us-east-1:123:function:datadog-forwarder
  filter_pattern  = ""
}
```

[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_subscription_filter
{{% /tab %}}
{{% tab "CloudFormation" %}}

AWS CloudFormation ユーザーは、CloudFormation [AWS::Logs::SubscriptionFilter][1] リソースを使いトリガーのプロビジョニングと管理ができます。以下のサンプルコードを参照してください。

このサンプルコードは、AWS の [SAM][2] と [Serverless Framework][3] でも動作します。Serverless Framework の場合は、`serverless.yml` の [resources][4] セクションにコードを記述してください。

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[2]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
[3]: https://www.serverless.com/
[4]: https://www.serverless.com/framework/docs/providers/aws/guide/resources/
{{% /tab %}}
{{< /tabs >}}

#### S3 バケットからログを収集する

S3 バケットからログを収集している場合、以下のいずれかの方法で [Datadog Forwarder Lambda 関数][1]へのトリガーを構成します。

{{< tabs >}}
{{% tab "AWS Console" %}}

1. Lambda 関数がインストールされたら、AWS コンソールから手動で、ログを含む S3 バケットにトリガーを追加します。
  {{< img src="logs/aws/adding_trigger.png" alt="トリガーの追加" popup="true"style="width:80%;">}}

2. バケットを選択して AWS の指示に従います。
  {{< img src="logs/aws/integration_lambda.png" alt="Lambda インテグレーション" popup="true" style="width:80%;">}}

3. S3 バケットで正しいイベントタイプを設定します。
  {{< img src="logs/aws/object_created.png" alt="作成されたオブジェクト" popup="true" style="width:80%;">}}

完了したら、[Datadog Log セクション][1]に移動し、ログを確認します。

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Terraform ユーザーは、[aws_s3_bucket_notification][1] リソースを使用してトリガーのプロビジョニングと管理ができます。以下のサンプルコードを参照してください。

```conf
resource "aws_s3_bucket_notification" "my_bucket_notification" {
  bucket = my_bucket
  lambda_function {
    lambda_function_arn = "<DATADOG_FORWARDER_ARN>"
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "AWSLogs/"
    filter_suffix       = ".log"
  }
}
```


[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_notification
{{% /tab %}}
{{% tab "CloudFormation" %}}

CloudFormation をご利用の方は、S3 バケットの CloudFormation [NotificationConfiguration][1] を利用してトリガーを構成することが可能です。以下のサンプルコードをご参照ください。

```yaml
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: "<MY_BUCKET>"
      NotificationConfiguration:
        LambdaConfigurations:
        - Event: 's3:ObjectCreated:*'
          Function: "<DATADOG_FORWARDER_ARN>"
```


[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfig.html
{{% /tab %}}
{{< /tabs >}}



## スクラビングとフィルター

Lambda 関数から送信されるログからメールや IP アドレスをスクラブしたり、カスタムスクラブルールを [Lambda パラメーターで][42]定義することができます。
また、[フィルターオプション][43]を使用して、特定のパターンに一致するログのみを除外または送信することができます。

[1]: /ja/serverless/forwarder/
[2]: /ja/serverless/forwarder#aws-privatelink-support
[3]: /ja/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://app.datadoghq.com/logs
[6]: /ja/integrations/amazon_api_gateway/
[7]: /ja/integrations/amazon_api_gateway/#log-collection
[8]: /ja/integrations/amazon_api_gateway/#send-logs-to-datadog
[9]: /ja/integrations/amazon_cloudfront/
[10]: /ja/integrations/amazon_cloudfront/#enable-cloudfront-logging
[11]: /ja/integrations/amazon_cloudfront/#send-logs-to-datadog
[12]: /ja/integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[13]: /ja/integrations/amazon_cloudtrail/#send-logs-to-datadog
[14]: /ja/integrations/amazon_dynamodb/#enable-dynamodb-logging
[15]: /ja/integrations/amazon_dynamodb/
[16]: /ja/integrations/amazon_dynamodb/#send-logs-to-datadog
[17]: /ja/integrations/amazon_ec2/
[18]: /ja/integrations/amazon_ecs/
[19]: /ja/integrations/amazon_ecs/#log-collection
[20]: /ja/integrations/amazon_elb/
[21]: /ja/integrations/amazon_elb/#enable-aws-elb-logging
[22]: /ja/integrations/amazon_elb/#manual-installation-steps
[23]: /ja/integrations/amazon_lambda/
[24]: /ja/integrations/amazon_lambda/#log-collection
[25]: /ja/integrations/amazon_rds/
[26]: /ja/integrations/amazon_rds/#enable-rds-logging
[27]: /ja/integrations/amazon_rds/#send-logs-to-datadog
[28]: /ja/integrations/amazon_route53/
[29]: /ja/integrations/amazon_route53/#enable-route53-logging
[30]: /ja/integrations/amazon_route53/#send-logs-to-datadog
[31]: /ja/integrations/amazon_s3/
[32]: /ja/integrations/amazon_s3/#enable-s3-access-logs
[33]: /ja/integrations/amazon_s3/#manual-installation-steps
[34]: /ja/integrations/amazon_sns/
[35]: /ja/integrations/amazon_sns/#send-logs-to-datadog
[36]: /ja/integrations/amazon_redshift/
[37]: /ja/integrations/amazon_redshift/#enable-aws-redshift-logging
[38]: /ja/integrations/amazon_redshift/#log-collection
[39]: /ja/integrations/amazon_vpc/
[40]: /ja/integrations/amazon_vpc/#enable-vpc-flow-log-logging
[41]: /ja/integrations/amazon_vpc/#log-collection
[42]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-scrubbing-optional
[43]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-filtering-optional