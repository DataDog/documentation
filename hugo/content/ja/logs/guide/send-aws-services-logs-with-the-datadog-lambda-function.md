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
- link: /logs/guide/reduce_data_transfer_fees
  tag: ガイド
  text: データ転送料金を削減しながら Datadog にログを送信する方法
- link: https://learn.datadoghq.com/courses/send-aws-logs
  tag: ラーニングセンター
  text: AWS ログを送信する
title: Datadog の Lambda 関数で AWS サービスのログを送信する
---
AWS サービスのログは、Datadog Forwarder Lambda 関数を使用して収集できます。この Lambda は、S3 バケット、CloudWatch ロググループ、および EventBridge イベントでトリガーされ、ログを Datadog に転送します。

AWS サービスからログの収集を開始するには

1. AWS アカウントで [Datadog Forwarder Lambda 関数][1] をセットアップします。
AWS サービスで 2. [Enable logging](#enable-logging-for-your-aws-service) します (ほとんどの AWS サービスは、S3 バケットまたは CloudWatch ロググループにログを記録できます)。
新しいログがある場合に、Forwarder Lambda を実行させる 3. [Set up the triggers](#set-up-triggers) します。トリガーを設定する方法は 2 つあります。

**注**:
   - [AWS PrivateLink][2] を使用して、プライベート接続経由でログを送信できます。
   - CloudFormation はすべてのリソースに対して `KMS:Decrypt` を含む IAM ポリシーを作成し、AWS Security Hub のベストプラクティスに沿っていません。この権限は、Lambda 関数をセットアップするために KMS で暗号化された S3 バケットからオブジェクトを復号化するために使用され、S3 バケットを暗号化するために使用される KMS キーは予測できません。インストールが正常に完了した後、この権限は安全に削除できます。

## AWS サービスのログを有効にします {#enable-logging-for-your-aws-service}

S3 バケットまたは CloudWatch ロググループにログを生成する任意の AWS サービスがサポートされています。最も使用されるサービスのためのセットアップ手順を以下のテーブルに示します。

| AWS サービス                        | AWS サービス側でのログ有効化                                                                                   | Datadog への AWS ログの送信                                                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway][3]                   | [Amazon API Gateway のログを有効化][4]                                                                            | [手動][5] および[自動](#automatically-set-up-triggers)ログ収集。                                                 |
| [AppSync][64]                      | [AWS AppSync のログを有効化][65]                                                                                  | [手動][65] および[自動](#automatically-set-up-triggers)ログ収集。                                                 |
| Batch                              | `-`                                                                                                            | [自動](#automatically-set-up-triggers)ログ収集。                                                 |
| [Bedrock Agentcore][74]            | `-`                                                                                                            | [自動](#automatically-set-up-triggers)ログ収集。                                                 |
| [Cloudfront][6]                    | [Amazon CloudFront のログを有効化][7]                                                                             | [手動][8] および[自動](#automatically-set-up-triggers)ログ収集。                                                 |
| [CloudTrail][9]                    | [AWS CloudTrail のログを有効化][9]                                                                                | [手動][10] および[自動](#automatically-set-up-triggers)ログ収集。Cloud SIEM 用に AWS CloudTrail を設定する場合は、[Cloud SIEM の AWS 構成][11] を参照してください。|
| [CodeBuild][66]                    | [AWS CodeBuild のログを有効化][67]                                                                                | [手動][67] および[自動](#automatically-set-up-triggers)ログ収集。                                                 |
| [DMS][68]                          | [AWS Database Migration Service のログを有効化][69]                                                               | [手動][69] および[自動](#automatically-set-up-triggers)ログ収集。                                                 |
| [DocumentDB][70]                   | [Amazon DocumentDB のログを有効化][71]                                                                            | [手動][71] および[自動](#automatically-set-up-triggers)ログ収集。                                                 |
| [DynamoDB][12]                     | [Amazon DynamoDB のログを有効化][13]                                                                              | [手動][14] ログ収集。                                                                                                |
| [EC2][15]                          | `-`                                                                                                            | [Datadog Agent][15] を使用してログを Datadog に送信。                                                                   |
| [ECS][16]                          | `-`                                                                                                            | [Docker Agent を使用してログ収集][17]、または[自動](#automatically-set-up-triggers)ログ収集。                                                                             |
| [EKS][62]                          | [Amazon EKS のログを有効化][63]                                                                                   | [手動][63] および[自動](#automatically-set-up-triggers)ログ収集。                                                |
| [Elastic Load Balancing (ELB)][18] | [Amazon ELB のログを有効化][19]                                                                                   | [手動][20] および[自動](#automatically-set-up-triggers)ログ収集。                                                |
| [Glue][76]                         | [AWS Glue のログを有効化][77]                                                                                     | [手動][77] および[自動](#automatically-set-up-triggers)ログ収集。                                                |
| [IoT Core][74]                     | [Amazon IoT Core のログを有効化][75]                                                                              | [自動](#automatically-set-up-triggers)ログ収集。                                                                 |
| [Lambda][21]                       | `-`                                                                                                            | [手動][22] および[自動](#automatically-set-up-triggers)ログ収集。                                                |
| [MWAA][55]                         | [Amazon MWAA のログを有効化][56]                                                                                  | [手動][56] および[自動](#automatically-set-up-triggers)ログ収集。                                                |
| [Network Firewall][57]             | [AWS Network Firewall のログを有効化][58]                                                                         | [手動][58] および[自動](#automatically-set-up-triggers)ログ収集。                                                |
| [PCS][75]                          | `-`                                                                                                            | [自動](#automatically-set-up-triggers)ログ収集。                                                 |
| [RDS][23]                          | [Amazon RDS のログを有効化][24]                                                                                   | [手動][25] ログ収集。                                                                                               |
| [RedShift][34]                     | [Amazon Redshift のログを有効化][35]                                                                              | [手動][36] および[自動](#automatically-set-up-triggers)ログ収集。                                                |
| Redshift Serverless                | `-`                                                                                                            | [自動](#automatically-set-up-triggers)ログ収集。                                                                 |
| [Route 53][59]                     | Amazon Route 53 の [DNS クエリログ][60] および [リゾルバークエリログ][73] を有効化                                                                                                                                                  | [手動][61] および[自動](#automatically-set-up-triggers)ログ収集。                                                |
| [S3][29]                           | [Amazon S3 のログを有効化][30]                                                                                    | [手動][31] および[自動](#automatically-set-up-triggers)ログ収集。                                                |
| [SNS][32]                          | SNS はログを提供しませんが、SNS サービスを通過するログおよびイベントを処理。| [手動][33] ログ収集。                                                                                                |
| SSM                                | `-`                                                                                                            | [自動](#automatically-set-up-triggers)ログ収集。                                                           |
| [Step Functions][52]               | [Amazon Step Functions のログを有効化][53]                                                                        | [手動][54] ログ収集。                                                                                                |
| [Verified Access][37]              | [Verified Access のログを有効化][38]                                                                              | [手動][39] および[自動](#automatically-set-up-triggers)ログ収集。                                                                                                |
| [VPC][40]                          | [Amazon VPC のログを有効化][41]                                                                                   | [手動][42] および[自動](#automatically-set-up-triggers)ログ収集。                                                                                                |
| [VPN][26]                          | [AWS VPN のログを有効化][72]                                                                                      | [手動][27] および[自動](#automatically-set-up-triggers)ログ収集。                                                                                                |
| [Web Application Firewall][49]     | [AWS WAF のログを有効化][50]                                                                                      | [手動][51] および[自動](#automatically-set-up-triggers)ログ収集。                                                |



## トリガーの設定 {#set-up-triggers}

Datadog Forwarder Lambda 関数でトリガーを構成する場合、オプションは 2 つあります。

- [Automatically](#automatically-set-up-triggers): Datadog は選択した AWS サービスのログの場所を自動的に取得し、Datadog Forwarder Lambda 関数にトリガーとして追加します。Datadog はリストを常に最新の状態に保ちます。
- [Manually](#manually-set-up-triggers): 各トリガーを自分で設定します。

### トリガーを自動的に設定する {#automatically-set-up-triggers}

Datadog は、AWS ログを収集するために Datadog Forwarder Lambda 関数にトリガーを自動的に構成することができます。ただし、自動サブスクリプションは異なる AWS アカウントやリージョンにまたがるトリガーの作成をサポートしていません。ログが別のアカウントの S3 バケットに公開されるシナリオでは、この制限に対する対応策として、バケットと同じアカウントで手動でトリガーを作成することをお勧めします。

以下のソースと場所がサポートされています。

| ソース                      | 場所       |
| --------------------------- | -------------- |
| Apache Airflow (MWAA)       | CloudWatch     |
| API Gateway のアクセスログ     | CloudWatch     |
| API Gateway の実行ログ  | CloudWatch     |
| アプリケーション ELB アクセスログ | S3             |
| AppSync ログ                | CloudWatch     |
| Batch                       | CloudWatch     |
| Bedrock Agentcore ログ      | S3, CloudWatch |
| クラシック ELB アクセスログ     | S3             |
| CloudFront アクセスログ      | S3             |
| Cloudtrail ログ             | S3, CloudWatch |
| CodeBuild ログ              | S3, CloudWatch |
| DMS ログ                    | CloudWatch     |
| DocumentDB ログ             | CloudWatch     |
| ECS ログ                    | CloudWatch     |
| EKS Control Plane ログ      | CloudWatch     |
| EKS Container Insights ログ | CloudWatch     |
| Glue Jobs ログ              | CloudWatch     |
| Lambda ログ                 | CloudWatch     |
| Lambda@Edge ログ            | CloudWatch     |
| IoT Core ログ                    | CloudWatch     |
| Network Firewall ログ       | S3, CloudWatch |
| PCS ログ                    | CloudWatch     |
| Redshift ログ               | S3, Cloudwatch |
| Redshift Serverless ログ    | CloudWatch     |
| RDS ログ                    | CloudWatch     |
| Route53 DNS Query ログ      | CloudWatch     |
| Route53 Resolver クエリのログ | S3, CloudWatch |
| S3 アクセスログ              | S3             |
| SSM Command ログ            | CloudWatch     |
| Step Functions              | CloudWatch     |
| Verified Access ログ        | S3, CloudWatch |
| VPC Flow ログ               | S3, CloudWatch |
| VPN ログ                    | CloudWatch     |
| Web アプリケーションファイアウォール    | S3, CloudWatch |

**注**: [サブスクリプション フィルター][48] は、Datadog Forwarder によって CloudWatch ロググループに自動的に作成され、`DD_LOG_SUBSCRIPTION_FILTER_<LOG_GROUP_NAME>` の形式で名前が付けられます。

1. まだセットアップしていない場合、[Datadog のログ収集用 AWS Lambda 関数][1] をセットアップしてください。
2. [Datadog-AWS インテグレーション][43] に使用される IAM ロールのポリシーに、以下の権限があることを確認してください。これらの権限がどのように使用されるかについての情報は、以下の説明にあります。

    ```text
    "airflow:GetEnvironment",
    "airflow:ListEnvironments",
    "appsync:ListGraphqlApis",
    "batch:DescribeJobDefinitions",
    "cloudfront:GetDistributionConfig",
    "cloudfront:ListDistributions",
    "cloudtrail:GetTrail",
    "cloudtrail:ListTrails",
    "codebuild:BatchGetProjects",
    "codebuild:ListProjects",
    "dms:DescribeReplicationInstances",
    "ec2:DescribeFlowLogs",
    "ec2:DescribeVerifiedAccessInstanceLoggingConfigurations",
    "ec2:DescribeVpnConnections",
    "ecs:DescribeTaskDefinition",
    "ecs:ListTaskDefinitionFamilies",
    "eks:DescribeCluster",
    "eks:ListClusters",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "elasticloadbalancing:DescribeLoadBalancers",
    "glue:BatchGetJobs",
    "glue:GetJobs",
    "glue:GetJob",
    "glue:ListJobs",
    "iot:GetV2LoggingOptions",
    "lambda:GetPolicy",
    "lambda:InvokeFunction",
    "lambda:List*",
    "logs:DeleteSubscriptionFilter",
    "logs:DescribeDeliveries",
    "logs:DescribeDeliverySources",
    "logs:DescribeLogGroups",
    "logs:DescribeSubscriptionFilters",
    "logs:GetDeliveryDestination",
    "logs:PutSubscriptionFilter",
    "network-firewall:DescribeLoggingConfiguration",
    "network-firewall:ListFirewalls",
    "rds:DescribeDBClusters",
    "rds:DescribeDBInstances",
    "redshift-serverless:ListNamespaces",
    "redshift:DescribeClusters",
    "redshift:DescribeLoggingStatus",
    "route53:ListQueryLoggingConfigs",
    "route53resolver:ListResolverQueryLogConfigs",
    "s3:GetBucketLocation",
    "s3:GetBucketLogging",
    "s3:GetBucketNotification",
    "s3:ListAllMyBuckets",
    "s3:PutBucketNotification",
    "ssm:GetServiceSetting",
    "ssm:ListCommands",
    "states:DescribeStateMachine",
    "states:ListStateMachines",
    "wafv2:ListLoggingConfigurations"
    ```

    | AWS Permission                                              | Description                                                                  |
    | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
    | `airflow:ListEnvironments`                                  | List all MWAA environment names.                                             |
    | `airflow:GetEnvironment`                                    | Get information about a MWAA environment.                                    |
    | `appsync:ListGraphqlApis`                                   | List all GraphQL Apis.                                                       |
    | `batch:DescribeJobDefinitions`                              | List all Batch job definitions.                                              |
    | `cloudfront:GetDistributionConfig`                          | Get the name of the S3 bucket containing CloudFront access logs.             |
    | `cloudfront:ListDistributions`                              | List all CloudFront distributions.                                           |
    | `cloudtrail:GetTrail`                                       | Get Trail logging information.                                               |
    | `cloudtrail:ListTrails`                                     | List all Cloudtrail trails.                                                  |
    | `codebuild:BatchGetProjects`                                | List all CodeBuild projects.                                                 |
    | `codebuild:ListProjects`                                    | Get information on CodeBuild projects.                                       |
    | `dms:DescribeReplicationInstances`                          | List all replication instances for DMS.                                      |
    | `ec2:DescribeFlowLogs`                                      | List all Flow log configurations.                                            |
    | `ec2:DescribeVerifiedAccessInstanceLoggingConfigurations`   | List all Verified Access instance logging configurations.                    |
    | `ec2:DescribeVpnConnections`                                | List all VPN connections.                                                    |
    | `ecs:DescribeTaskDefinition`                                | Describe ECS task definition.                                                |
    | `ecs:ListTaskDefinitionFamilies`                            | List all task definition families.                                           |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancers`          | List all load balancers.                                                     |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancerAttributes` | Get the name of the S3 bucket containing ELB access logs.                    |
    | `glue:BatchGetJobs`                                             | Get information about multiple Glue jobs.                                    |
    | `glue:GetJob`                                               | Get information about a Glue job.                                            |
    | `glue:GetJobs`                                              | List all Glue jobs.                                                          |
    | `glue:ListJobs`                                             | List all Glue job names.                                                     |
    | `eks:DescribeCluster`                                       | Describe an EKS cluster.                                                     |
    | `eks:ListClusters`                                          | List all EKS clusters.                                                       |
    | `iot:GetV2LoggingOptions`                                   | Get IoT V2 logging options.                                                  |
    | `lambda:InvokeFunction`                                     | Invoke a Lambda function.                                                    |
    | `lambda:List*`                                              | List all Lambda functions.                                                   |
    | `lambda:GetPolicy`                                          | Get the Lambda policy when triggers are to be removed.                       |
    | `logs:PutSubscriptionFilter`                                | Add a Lambda trigger based on CloudWatch Log events.                         |
    | `logs:DeleteSubscriptionFilter`                             | Remove a Lambda trigger based on CloudWatch Log events.                      |
    | `logs:DescribeLogGroups`                                    | Describe CloudWatch log groups.                                              |
    | `logs:DescribeDeliveries`                                   | Describe CloudWatch log deliveries.                                          |
    | `logs:DescribeDeliverySources`                              | Describe CloudWatch log delivery sources.                                    |
    | `logs:DescribeSubscriptionFilters`                          | List the subscription filters for the specified log group.                   |
    | `logs:GetDeliveryDestination`                               | Get a CloudWatch log delivery destination.                                   |
    | `network-firewall:DescribeLoggingConfiguration`             | Get the logging configuration of a firewall.                                 |
    | `network-firewall:ListFirewalls`                            | List all Network Firewall firewalls.                                         |
    | `rds:DescribeDBClusters`                                    | List all RDS clusters.                                                       |
    | `rds:DescribeDBInstances`                                   | List all RDS instances.                                                      |
    | `redshift:DescribeClusters`                                 | List all Redshift clusters.                                                  |
    | `redshift:DescribeLoggingStatus`                            | Get the name of the S3 bucket containing Redshift Logs.                      |
    | `redshift-serverless:ListNamespaces`                        | List all Redshift Serverless namespaces.                                     |
    | `route53:ListQueryLoggingConfigs`                           | List all DNS query logging configurations for Route 53.                      |
    | `route53resolver:ListResolverQueryLogConfigs`               | List all Resolver query logging configurations for Route 53.                 |
    | `s3:GetBucketLogging`                                       | Get the name of the S3 bucket containing S3 access logs.                     |
    | `s3:GetBucketLocation`                                      | Get the region of the S3 bucket containing S3 access logs.                   |
    | `s3:GetBucketNotification`                                  | Get existing Lambda trigger configurations.                                  |
    | `s3:ListAllMyBuckets`                                       | List all S3 buckets.                                                         |
    | `s3:PutBucketNotification`                                  | Add or remove a Lambda trigger based on S3 bucket events.                    |
    | `ssm:GetServiceSetting`                                     | Get the SSM service setting for customer script log group name.              |
    | `ssm:ListCommands`                                          | List all SSM commands.                                                       |
    | `states:ListStateMachines`                                  | List all Step Functions.                                                     |
    | `states:DescribeStateMachine`                               | Get logging details about a Step Function.                                   |
    | `wafv2:ListLoggingConfigurations`                           | List all logging configurations of the Web Application Firewall.             |


3. [AWS インテグレーション ページ][44] で、ログを収集する AWS アカウントを選択し、[**Log Collection**] (ログ収集) タブをクリックします。
4. [**Datadog Forwarder Lambda**] セクションで、前のセクションで作成した Lambda の ARN を入力し、[**Add**] (追加) をクリックします。Lambda 関数は、名前、バージョン、およびリージョンとともに下のテーブルに表示されます。
5. [**Log Autosubscription**] (ログ自動サブスクリプション) セクションで、[**Log Sources**] (ログソース) の下に、ログを収集したいサービスをトグルして有効にします。特定のサービスからのログ収集を停止するには、ログソースをオフにします。
6. (オプション) [**Log Source Tag Filters**] (ログソースタグフィルター) セクションで、各ログソースのリソースタグによってログ収集をフィルタリングできます。ドロップダウンメニューからログソースを選択し、`key:value` 形式でタグを追加して、収集するリソースのログを制限します。**注**: リソースタグは、Datadog プラットフォームの規約に合わせて自動的に小文字に変換されます。不一致を避けるため、タグフィルターは小文字で定義してください。
7. 複数のリージョンにログがある場合は、そのリージョンに追加の Lambda 関数を作成し、[**Datadog Forwarder Lambda**] セクションに追加する必要があります。
8. 特定の Lambda 関数からすべての AWS ログの収集を停止するには、テーブル内の Lambda にカーソルを合わせて削除アイコンをクリックします。その関数のすべてのトリガーが削除されます。
9. この初期のセットアップから数分以内に、AWS ログが Datadog [Log エクスプローラー][45] に表示されるようになります。

### 手動でトリガーをセットアップする {#manually-set-up-triggers}

#### CloudWatch ロググループからログを収集する {#collecting-logs-from-cloudwatch-log-group}

CloudWatch ロググループからログを収集している場合、以下のいずれかの方法で [Datadog Forwarder Lambda 関数][1] へのトリガーを構成します。

{{< tabs >}}
{{% tab "AWS コンソール" %}}

1. AWS コンソールで、**Lambda** に移動します。
2. [**Functions**] (関数) をクリックし、[Datadog Forwarder] を選択します。
3. [**Add trigger**] (トリガーを追加) をクリックし、[**CloudWatch Logs**] (CloudWatch ログ) を選択します。
4. ドロップダウンメニューからロググループを選択します。
5. フィルターの名前を入力し、オプションでフィルターパターンを指定します。
6. [**Add**] をクリックします。
7. [Datadog Log セクション][1] にアクセスし、ロググループに送信された新しいログイベントを確認します。

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Terraform ユーザーは、[aws_cloudwatch_log_subscription_filter][1] リソースを使用してトリガーのプロビジョニングと管理ができます。以下のサンプルコードを参照してください。

```conf
data "aws_cloudwatch_log_group" "some_log_group" {
  name = "/some/log/group"
}

resource "aws_lambda_permission" "lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "datadog-forwarder" # this is the default but may be different in your case
  principal     = "logs.amazonaws.com" # or logs.amazonaws.com.cn for China*
  source_arn    = data.aws_cloudwatch_log_group.some_log_group.arn
}

resource "aws_cloudwatch_log_subscription_filter" "datadog_log_subscription_filter" {
  name            = "datadog_log_subscription_filter"
  log_group_name  = <CLOUDWATCH_LOG_GROUP_NAME> # for example, /some/log/group
  destination_arn = <DATADOG_FORWARDER_ARN> # for example,  arn:aws:lambda:us-east-1:123:function:datadog-forwarder
  filter_pattern  = ""
}
```
\*{{% mainland-china-disclaimer %}}

[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_subscription_filter
{{% /tab %}}
{{% tab "CloudFormation" %}}

AWS CloudFormation ユーザーは、CloudFormation [AWS::Logs::SubscriptionFilter][1] リソースを使用してトリガーのプロビジョニングと管理ができます。以下のサンプルコードを参照してください。

このサンプルコードは、AWS [SAM][2] および [Serverless Framework][3] にも対応しています。Serverless Framework の場合、コードを `serverless.yml` の [resources][4] (リソース) セクションに配置してください。

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

#### S3 バケットからログを収集する {#collecting-logs-from-s3-buckets}

S3 バケットからログを収集している場合、以下のいずれかの方法で [Datadog Forwarder Lambda 関数][1] へのトリガーを構成します。

{{< tabs >}}
{{% tab "AWS コンソール" %}}

1. Lambda 関数がインストールされたら、AWS コンソールから手動で、ログを含む S3 バケットにトリガーを追加します:
  {{< img src="logs/aws/adding_trigger.png" alt="トリガーの追加" popup="true"style="width:80%;">}}

2. バケットを選択して、AWS の指示に従います。
  {{< img src="logs/aws/integration_lambda.png" alt="統合 Lambda" popup="true" style="width:80%;">}}

3. S3 バケットで正しいイベントタイプを設定します。
  {{< img src="logs/aws/object_created.png" alt="オブジェクト作成" popup="true" style="width:80%;">}}

完了したら、[Datadog Log セクション][1] に移動し、ログを確認します。

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

CloudFormation ユーザーは、S3 バケットの CloudFormation [NotificationConfiguration][1] を利用してトリガーを構成できます。以下のサンプルコードを参照してください。

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


## スクラビングとフィルタリング {#scrubbing-and-filtering}

Lambda 関数から送信されるログに対して、メールアドレスや IP アドレスをスクラビングでき、[Lambda パラメーター][46] でカスタムのスクラビングルールを定義することもできます。
[フィルタリング機能][47] を使用して、特定のパターンに一致するログを除外したり、一致するログだけを送信したりすることもできます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/forwarder/
[2]: /ja/serverless/forwarder#aws-privatelink-support
[3]: /ja/integrations/amazon_api_gateway/
[4]: /ja/integrations/amazon_api_gateway/#log-collection
[5]: /ja/integrations/amazon_api_gateway/#send-logs-to-datadog
[6]: /ja/integrations/amazon_cloudfront/
[7]: /ja/integrations/amazon_cloudfront/#enable-cloudfront-logging
[8]: /ja/integrations/amazon_cloudfront/#send-logs-to-datadog
[9]: /ja/integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[10]: /ja/integrations/amazon_cloudtrail/#send-logs-to-datadog
[11]: /ja/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[12]: /ja/integrations/amazon_dynamodb/#enable-dynamodb-logging
[13]: /ja/integrations/amazon_dynamodb/
[14]: /ja/integrations/amazon_dynamodb/#send-logs-to-datadog
[15]: /ja/integrations/amazon_ec2/
[16]: /ja/integrations/amazon_ecs/
[17]: /ja/integrations/amazon_ecs/#log-collection
[18]: /ja/integrations/amazon_elb/
[19]: /ja/integrations/amazon_elb/#enable-aws-elb-logging
[20]: /ja/integrations/amazon_elb/#manual-installation-steps
[21]: /ja/integrations/amazon_lambda/
[22]: /ja/integrations/amazon_lambda/#log-collection
[23]: /ja/integrations/amazon_rds/
[24]: /ja/integrations/amazon_rds/#enable-rds-logging
[25]: /ja/integrations/amazon_rds/#send-logs-to-datadog
[26]: /ja/integrations/amazon-vpn/
[27]: /ja/integrations/amazon-vpn/#send-logs-to-datadog
[28]: /ja/integrations/amazon_route53/#send-logs-to-datadog
[29]: /ja/integrations/amazon_s3/
[30]: /ja/integrations/amazon_s3/#enable-s3-access-logs
[31]: /ja/integrations/amazon_s3/#manual-installation-steps
[32]: /ja/integrations/amazon_sns/
[33]: /ja/integrations/amazon_sns/#send-logs-to-datadog
[34]: /ja/integrations/amazon_redshift/
[35]: /ja/integrations/amazon-redshift/#enable-logging
[36]: /ja/integrations/amazon-redshift/#log-collection
[37]: /ja/integrations/amazon-verified-access/
[38]: /ja/integrations/amazon-verified-access/#enable-verified-access-logs
[39]: /ja/integrations/amazon-verified-access/#log-collection
[40]: /ja/integrations/amazon_vpc/
[41]: /ja/integrations/amazon_vpc/#enable-vpc-flow-log-logging
[42]: /ja/integrations/amazon_vpc/#log-collection
[43]: /ja/integrations/amazon_web_services/
[44]: https://app.datadoghq.com/integrations/amazon-web-services
[45]: https://app.datadoghq.com/logs
[46]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-scrubbing-optional
[47]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-filtering-optional
[48]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters
[49]: /ja/integrations/amazon_waf/
[50]: /ja/integrations/amazon_waf/#log-collection
[51]: /ja/integrations/amazon_waf/#send-logs-to-datadog
[52]: /ja/integrations/amazon_step_functions/
[53]: /ja/integrations/amazon_step_functions/#log-collection
[54]: /ja/integrations/amazon_step_functions/#send-logs-to-datadog
[55]: /ja/integrations/amazon_mwaa/
[56]: /ja/integrations/amazon_mwaa/#log-collection
[57]: /ja/integrations/amazon_network_firewall/
[58]: /ja/integrations/amazon_network_firewall/#log-collection
[59]: /ja/integrations/amazon_route53/
[60]: /ja/integrations/amazon_route53/#enable-route53-dns-query-logging
[61]: /ja/integrations/amazon_route53/#send-logs-to-datadog
[62]: /ja/integrations/amazon-eks/
[63]: /ja/integrations/amazon-eks/#log-collection
[64]: /ja/integrations/amazon-appsync/
[65]: /ja/integrations/amazon-appsync/#send-logs-to-datadog
[66]: /ja/integrations/amazon-codebuild/
[67]: /ja/integrations/amazon-codebuild/#send-logs-to-datadog
[68]: /ja/integrations/amazon-dms/
[69]: /ja/integrations/amazon-dms/#send-logs-to-datadog
[70]: /ja/integrations/amazon-documentdb/
[71]: /ja/integrations/amazon-documentdb/#send-logs-to-datadog
[72]: /ja/integrations/amazon-vpn/#enable-logging
[73]: /ja/integrations/amazon_route53/#enable-route53-resolver-query-logging
[74]: /ja/integrations/amazon-iot/
[75]: /ja/integrations/amazon-iot/#enable-logging
[74]: /ja/integrations/amazon-bedrock/
[75]: /ja/integrations/amazon-pcs/
[76]: /ja/integrations/amazon_glue/
[77]: /ja/integrations/amazon_glue/#log-collection