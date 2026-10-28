---
further_reading:
- link: https://learn.datadoghq.com/courses/send-aws-logs
  tag: ラーニングセンター
  text: AWS ログを送信する
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: ラーニングセンター
  text: Datadog で Serverless Monitoring 用 AWS Lambda を構成する
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
title: Datadog の Lambda 関数で AWS サービスのログを送信する
---
AWS サービスのログは、Datadog Forwarder Lambda 関数を使用して収集できます。この Lambda は、S3 バケット、CloudWatch ロググループ、および EventBridge イベントでトリガーされ、ログを Datadog に転送します。

AWS サービスからログの収集を開始するには

1. AWS アカウントで [Datadog Forwarder Lambda 関数][1] をセットアップします。
2. AWS サービスのログを有効にします。[サポートされている AWS サービス](#supported-aws-services)で対象のサービスを探し、セットアップ手順を確認します。ほとんどの AWS サービスでは、S3 バケットまたは CloudWatch ロググループにログを出力できます。
新しいログがある場合に、Forwarder Lambda を実行させる 3. [Set up the triggers](#set-up-triggers) します。トリガーを設定する方法は 2 つあります。

**注**:
   - [AWS PrivateLink][2] を使用して、プライベート接続経由でログを送信できます。
   - CloudFormation はすべてのリソースに対して `KMS:Decrypt` を含む IAM ポリシーを作成し、AWS Security Hub のベストプラクティスに沿っていません。この権限は、Lambda 関数をセットアップするために KMS で暗号化された S3 バケットからオブジェクトを復号化するために使用され、S3 バケットを暗号化するために使用される KMS キーは予測できません。インストールが正常に完了した後、この権限は安全に削除できます。

## サポートされている AWS サービス {#supported-aws-services}

Datadog Forwarder Lambda 関数は、S3 バケットまたは CloudWatch ロググループにログを生成するすべての AWS サービスに対応しています。次のテーブルに、収集可能なサービスを示します。

- **AWS サービス**: ログを生成する AWS サービス。各サービス名は、ログ収集のセットアップ手順へのリンクになっています。リンクのないサービスは、サービス側でのセットアップが不要です。
- **ログソース**: Datadog がログに適用する `source`タグ。[Log Explorer][40] でログを検索する際に使用します。
- **ストレージ**: AWS サービスが、Forwarder による収集対象のログを書き込める場所。
- **自動収集**: Datadog がそのログソースの [トリガーを自動的に設定できるかどうか](#automatically-set-up-triggers)。できない場合は、[手動でトリガーを設定してください](#manually-set-up-triggers)。

| AWS サービス                        | ログソース                    | ストレージ        | 自動収集 |
| ---------------------------------- | ----------------------------- | -------------- | -------------------- |
| [API Gateway][3]                   | `source:apigateway`           | CloudWatch, S3 | はい                  |
| [AppSync][4]                       | `source:appsync`              | CloudWatch     | はい                  |
| Batch                              | `source:batch`                | CloudWatch     | はい                  |
| [Bedrock][5]                       | `source:bedrock`              | CloudWatch, S3 | いいえ                   |
| Bedrock Agentcore                  | `source:bedrock-agentcore`    | CloudWatch, S3 | はい                  |
| [CloudFront][6]                    | `source:cloudfront`           | CloudWatch, S3 | はい                  |
| [CloudTrail][7]                    | `source:cloudtrail`           | CloudWatch, S3 | はい                  |
| [CodeBuild][8]                     | `source:codebuild`            | CloudWatch, S3 | はい                  |
| [DMS][9]                           | `source:dms`                  | CloudWatch, S3 | はい                  |
| [DocumentDB][10]                   | `source:docdb`                | CloudWatch, S3 | はい                  |
| [ECS][11]                          | `source:ecs`                  | CloudWatch     | はい                  |
| [EKS][12]                          | `source:eks` <sup>1</sup>     | CloudWatch     | はい                  |
| [Elastic Beanstalk][13]            | - <sup>2</sup>                | CloudWatch     | はい                  |
| [Elastic Load Balancing (ELB)][14] | `source:elb`                  | CloudWatch, S3 | はい                  |
| [FSx][15]                          | `source:aws.fsx`              | CloudWatch, S3 | いいえ                   |
| [Glue][16]                         | `source:glue`                 | CloudWatch, S3 | はい                  |
| [IoT][17]                          | `source:iot`                  | CloudWatch     | 一部 <sup>3</sup> |
| [Lambda][18]                       | `source:lambda`               | CloudWatch     | はい                  |
| Lambda@Edge                        | `source:lambda`               | CloudWatch     | はい                  |
| Lambda MicroVMs                    | `source:lambda`               | CloudWatch     | はい                  |
| [MWAA][19]                         | `source:mwaa`                 | CloudWatch     | はい                  |
| [Network Firewall][20]             | `source:network-firewall`     | CloudWatch, S3 | はい                  |
| [OpenSearch][21]                   | `source:opensearch`           | CloudWatch     | いいえ                   |
| [PCS][22]                          | - <sup>2</sup>                | CloudWatch     | 一部 <sup>4</sup> |
| [RDS][23]                          | `source:rds` <sup>5</sup>     | CloudWatch     | はい                  |
| [Redshift][24]                     | `source:redshift`             | CloudWatch, S3 | はい                  |
| Redshift Serverless                | `source:redshift-serverless`  | CloudWatch     | はい                  |
| [Route 53][25]                     | `source:route53` <sup>6</sup> | CloudWatch     | はい                  |
| [S3][26]                           | `source:s3`                   | S3             | はい                  |
| SSM                                | `source:ssm`                  | CloudWatch     | はい                  |
| [Step Functions][27]               | `source:stepfunction`         | CloudWatch     | はい                  |
| [Transit Gateway][28]              | `source:transitgateway`       | CloudWatch, S3 | いいえ                   |
| [Verified Access][29]              | `source:verified-access`      | CloudWatch, S3 | はい                  |
| [VPC][30]                          | `source:vpc`                  | CloudWatch, S3 | はい                  |
| [VPN][31]                          | - <sup>2</sup>                | CloudWatch, S3 | はい <sup>7</sup>     |
| [Web Application Firewall][32]     | `source:waf`                  | S3             | はい                  |

<sup>1</sup> EKS コントロールプレーンログは、`kubernetes.audit`、`kube-scheduler`、`kube-apiserver`、`kube-controller-manager`、および `aws-iam-authenticator` ソースも使用します。<br>
<sup>2</sup> Datadog は、これらのログにサービス固有のソースタグを適用しません。<br>
<sup>3</sup> IoT の自動収集は、アカウントレベルでのみ利用可能です。<br>
<sup>4</sup> PCS の自動収集は、CloudWatch ロググループでのみ利用可能です。<br>
<sup>5</sup> RDS エンジンログは、`postgresql`、`mariadb`、および `mysql` ソースも使用します。<br>
<sup>6</sup> DNS クエリログと Resolver クエリログの両方を対象とします。<br>
<sup>7</sup> 自動収集は CloudWatch ロググループで利用可能です。S3 バケットの場合は、[トリガーを手動で設定してください](#collecting-logs-from-s3-buckets)。

**注**: Datadog Forwarder は、CloudWatch ロググループに[サブスクリプションフィルター][43]を自動的に作成します。各フィルターには、`DD_LOG_SUBSCRIPTION_FILTER_<LOG_GROUP_NAME>` の形式で名前が付けられます。

### 別の方法で収集されるサービス {#services-collected-through-another-method}

以下の AWS サービスはログ収集に対応していますが、Datadog Forwarder Lambda 関数を同じ方法では使用しません。

| AWS サービス    | ログの収集方法                                                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [DynamoDB][33] | DynamoDB は独自のログを生成しません。API アクティビティは CloudTrail を通じて記録されます。[Datadog へのログの送信][34]を参照してください。                          |
| [EC2][35]      | [Datadog Agent][35] を使用してログを Datadog に送信します。                                                                                     |
| [SNS][36]      | SNS はログを提供しませんが、SNS サービスを通過するログやイベントを処理できます。[Datadog へのログの送信][37] を参照してください。 |

## トリガーの設定 {#set-up-triggers}

Datadog Forwarder Lambda 関数でトリガーを構成する場合、オプションは 2 つあります。

- [Automatically](#automatically-set-up-triggers): Datadog は選択した AWS サービスのログの場所を自動的に取得し、Datadog Forwarder Lambda 関数にトリガーとして追加します。Datadog はリストを常に最新の状態に保ちます。
- [Manually](#manually-set-up-triggers): 各トリガーを自分で設定します。

### トリガーを自動的に設定する {#automatically-set-up-triggers}

Datadog は、AWS ログを収集するために Datadog Forwarder Lambda 関数にトリガーを自動的に構成することができます。ただし、自動サブスクリプションは異なる AWS アカウントやリージョンにまたがるトリガーの作成をサポートしていません。ログが別のアカウントの S3 バケットに公開されるシナリオでは、この制限に対する対応策として、バケットと同じアカウントで手動でトリガーを作成することをお勧めします。

自動収集に対応しているサービスと、それぞれが対応している保存先については、[サポートされている AWS サービス](#supported-aws-services)を参照してください。

1. まだセットアップしていない場合、[Datadog のログ収集用 AWS Lambda 関数][1] をセットアップしてください。
2. [Datadog-AWS インテグレーション][38]に使用する IAM ロールのポリシーに、以下の権限が設定されていることを確認します。これらの権限がどのように使用されるかについての情報は、以下の説明にあります。

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
    "elasticbeanstalk:DescribeEnvironments",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "elasticloadbalancing:DescribeLoadBalancers",
    "glue:BatchGetJobs",
    "glue:GetJobs",
    "glue:GetJob",
    "glue:ListJobs",
    "iot:GetV2LoggingOptions",
    "lambda:GetMicrovmImageVersion",
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
    | `elasticbeanstalk:DescribeEnvironments`                     | List all Elastic Beanstalk environments.                                     |
    | `iot:GetV2LoggingOptions`                                   | Get IoT V2 logging options.                                                  |
    | `lambda:InvokeFunction`                                     | Invoke a Lambda function.                                                    |
    | `lambda:List*`                                              | List all Lambda functions.                                                   |
    | `lambda:GetPolicy`                                          | Get the Lambda policy when triggers are to be removed.                       |
    | `lambda:GetMicrovmImageVersion`                             | Get information about a Lambda MicroVM image version.                        |
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


3. [AWS インテグレーションページ][39]で、ログを収集する AWS アカウントを選択し、{{< ui >}}Log Collection{{< /ui >}} タブをクリックします。
4. {{< ui >}}Datadog Forwarder Lambda{{< /ui >}} セクションで、前のセクションで作成した Lambda の ARN を入力し、{{< ui >}}Add{{< /ui >}} をクリックします。Lambda 関数は、名前、バージョン、およびリージョンとともに下のテーブルに表示されます。
5. {{< ui >}}Log Autosubscription{{< /ui >}} セクションの {{< ui >}}Log Sources{{< /ui >}} で、ログを収集するサービスをオンにして有効にします。特定のサービスからのログ収集を停止するには、ログソースをオフにします。
6. (オプション) {{< ui >}}Log Source Tag Filters{{< /ui >}} セクションで、各ログソースのリソースタグを使ってログ収集をフィルタリングできます。ドロップダウンメニューからログソースを選択し、`key:value` 形式でタグを追加して、収集するリソースのログを制限します。**注**: リソースタグは、Datadog プラットフォームの規約に合わせて自動的に小文字に変換されます。不一致を避けるため、タグフィルターは小文字で定義してください。
7. 複数のリージョンにログがある場合は、そのリージョンに追加の Lambda 関数を作成し、[**Datadog Forwarder Lambda**] セクションに追加する必要があります。
8. 特定の Lambda 関数からすべての AWS ログの収集を停止するには、テーブル内の Lambda にカーソルを合わせて削除アイコンをクリックします。その関数のすべてのトリガーが削除されます。
9. 初期設定から数分以内に、AWS ログが Datadog の [Log Explorer][40] に表示されます。

### 手動でトリガーをセットアップする {#manually-set-up-triggers}

#### CloudWatch ロググループからログを収集する {#collecting-logs-from-cloudwatch-log-group}

CloudWatch ロググループからログを収集している場合、以下のいずれかの方法で [Datadog Forwarder Lambda 関数][1] へのトリガーを構成します。

{{< tabs >}}
{{% tab "AWS コンソール" %}}

1. AWS コンソールで、{{< ui >}}Lambda{{< /ui >}} に移動します。
2. {{< ui >}}Functions{{< /ui >}} をクリックし、Datadog Forwarder を選択します。
3. {{< ui >}}Add trigger{{< /ui >}} をクリックし、{{< ui >}}CloudWatch Logs{{< /ui >}} を選択します。
4. ドロップダウンメニューからロググループを選択します。
5. フィルターの名前を入力し、オプションでフィルターパターンを指定します。
6. [{{< ui >}}Add{{< /ui >}}] (追加) をクリックします。
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

Lambda 関数から送信されるログに対して、メールアドレスや IP アドレスをスクラビングでき、[Lambda パラメーター][41]でカスタムのスクラビングルールを定義することもできます。
[フィルタリング機能][42]を使用して、特定のパターンに一致するログを除外したり、一致するログだけを送信したりすることもできます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/forwarder/
[2]: /ja/serverless/forwarder#aws-privatelink-support
[3]: /ja/integrations/amazon_api_gateway/#log-collection
[4]: /ja/integrations/amazon-appsync/#send-logs-to-datadog
[5]: /ja/integrations/amazon-bedrock/
[6]: /ja/integrations/amazon_cloudfront/#log-collection
[7]: /ja/integrations/amazon_cloudtrail/#send-logs-to-datadog
[8]: /ja/integrations/amazon-codebuild/#send-logs-to-datadog
[9]: /ja/integrations/amazon-dms/#send-logs-to-datadog
[10]: /ja/integrations/amazon-documentdb/#send-logs-to-datadog
[11]: /ja/containers/amazon_ecs/logs/
[12]: /ja/integrations/amazon-eks/#log-collection
[13]: /ja/integrations/amazon-elastic-beanstalk/
[14]: /ja/integrations/amazon_elb/#log-collection
[15]: /ja/integrations/amazon_fsx/#log-collection
[16]: /ja/integrations/amazon_glue/#log-collection
[17]: /ja/integrations/amazon-iot/#enable-logging
[18]: /ja/integrations/amazon_lambda/#log-collection
[19]: /ja/integrations/amazon_mwaa/#log-collection
[20]: /ja/integrations/amazon_network_firewall/#log-collection
[21]: /ja/integrations/amazon_es/#log-collection
[22]: /ja/integrations/amazon-pcs/
[23]: /ja/integrations/amazon_rds/#log-collection
[24]: /ja/integrations/amazon-redshift/#log-collection
[25]: /ja/integrations/amazon_route53/#send-logs-to-datadog
[26]: /ja/integrations/amazon_s3/#enable-s3-access-logs
[27]: /ja/integrations/amazon_step_functions/#log-collection
[28]: /ja/integrations/amazon_transit_gateway/#log-collection
[29]: /ja/integrations/amazon-verified-access/#log-collection
[30]: /ja/integrations/amazon_vpc/#log-collection
[31]: /ja/integrations/amazon-vpn/#send-logs-to-datadog
[32]: /ja/integrations/amazon_waf/#log-collection
[33]: /ja/integrations/amazon_dynamodb/
[34]: /ja/integrations/amazon_dynamodb/#send-logs-to-datadog
[35]: /ja/integrations/amazon_ec2/
[36]: /ja/integrations/amazon_sns/
[37]: /ja/integrations/amazon_sns/#send-logs-to-datadog
[38]: /ja/integrations/amazon_web_services/
[39]: https://app.datadoghq.com/integrations/amazon-web-services
[40]: https://app.datadoghq.com/logs
[41]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-scrubbing-optional
[42]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-filtering-optional
[43]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters