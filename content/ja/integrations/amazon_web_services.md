---
aliases:
  - /ja/integrations/aws/
  - /ja/logs/aws
  - /ja/integrations/faq/revoking-aws-keys-and-enabling-role-delegation-for-the-datadog-aws-integration/
  - /ja/integrations/faq/additional-aws-metrics-min-max-sum
  - /ja/integrations/faq/why-am-i-only-seeing-the-average-values-of-my-custom-aws-cloudwatch-metrics/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: AWS サービスを Datadog と統合。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_web_services/'
draft: false
git_integration_title: amazon_web_services
has_logo: true
integration_title: AWS
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_web_services
public_title: Datadog-AWS インテグレーション
short_description: AWS サービスを Datadog と統合。
version: '1.0'
---
## 概要

Amazon Web Services (AWS) を接続すると、次のことができるようになります。

- AWS ステータスの自動更新をストリームに表示する
- Agent をインストールすることなく、EC2 ホストの CloudWatch メトリクスを取得する
- EC2 ホストを EC2 固有の情報にタグ付けする (アベイラビリティー ゾーンなど)
- EC2 のスケジュール設定されたメンテナンス イベントをストリームに表示する
- その他のさまざまな AWS 製品から CloudWatch メトリクスとイベントを収集する

<div class="alert alert-warning">
Datadog の Amazon インテグレーションは、<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html">CloudWatch からすべてのメトリクス</a> を収集するように構築されています。Datadog では継続的にドキュメントを更新してすべてのサブインテグレーションを表示できるように努めていますが、新しいメトリクスやサービスがクラウドサービスから次々にリリースされるため、インテグレーション一覧が追い付かないことがあります。
</div>

| インテグレーション                             | 説明                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| [API Gateway][1]                        | API の作成、公開、管理、セキュリティ保護                                             |
| [Appstream][2]                          | AWS 上のフルマネージド型のアプリケーションストリーミング                                             |
| [AppSync][3]                            | リアルタイムのデータ同期機能とオフラインのプログラミング機能を備えた GraphQL サービス |
| [Athena][4]                             | サーバーレスのインタラクティブなクエリサービス                                                   |
| [Autoscaling][5]                        | EC2 容量のスケーリング                                                                     |
| [料金][6]                            | 請求と予算                                                                    |
| [CloudFront][7]                         | ローカルのコンテンツ配信ネットワーク                                                         |
| [Cloudhsm][8]                           | マネージド型のハードウェアセキュリティモジュール (HSM)                                                 |
| [CloudSearch][9]                        | ログファイルおよび AWS API 呼び出しへのアクセス                                                  |
| [CloudTrail][10]                        | ログファイルおよび AWS API 呼び出しへのアクセス                                                  |
| [CodeBuild][11]                         | フルマネージド型のビルドサービス                                                            |
| [CodeDeploy][12]                        | コードデプロイの自動化                                                              |
| [Cognito][13]                           | セキュリティ保護されたユーザーのサインアップとサインイン                                                        |
| [Connect][14]                           | セルフサービス型のクラウドベースコンタクトセンターサービス                                     |
| [Direct Connect][15]                    | AWS への専用ネットワーク接続                                                    |
| [DMS][16]                               | データベース移行サービス                                                             |
| [DocumentDB][17]                        | MongoDB 互換データベース                                                            |
| [Dynamo DB][18]                         | NoSQL データベース                                                                         |
| [EBS (Elastic Block Store)][19]         | 永続的なブロックレベルのストレージボリューム                                                 |
| [EC2 (Elastic Cloud Compute)][20]       | クラウドのサイズ変更可能なコンピュート容量                                                |
| [EC2 スポット][21]                          | 未使用の EC2 容量の活用                                                  |
| [ECS (Elastic Container Service)][22]   | Docker コンテナをサポートするコンテナ管理サービス                           |
| [EFS (Elastic File System)][23]         | 共有ファイルストレージ                                                                    |
| [EKS][24]                               | Kubernetes 用の Elastic Container Service                                               |
| [Elastic Transcoder][25]                | クラウドでのメディアおよびビデオコード変換                                               |
| [ElastiCache][26]                       | クラウドのインメモリキャッシュ                                                           |
| [Elastic Beanstalk][27]                 | Web アプリケーションとサービスのデプロイとスケーリングを行うサービス                        |
| [ELB (Elastic Load Balancing)][28]      | 着信アプリケーショントラフィックを複数の Amazon EC2 インスタンス間で分散          |
| [EMR (Elastic Map Reduce)][29]          | Hadoop を使用するデータ処理                                                           |
| [ES (Elasticsearch)][30]                | Elasticsearch クラスターのデプロイ、操作、スケーリング                                      |
| [Firehose][31]                          | ストリーミングデータの取得とロード                                                        |
| [Gamelift][32]                          | 専用ゲームサーバーホスティング                                                          |
| [Glue][33]                              | 分析のためのデータの抽出、変換、ロード                                        |
| [GuardDuty][34]                         | インテリジェントな脅威の検出                                                           |
| [Health][35]                            | AWS のリソース、サービス、アカウントの状態の可視化                |
| [Inspector][36]                         | 自動化されたセキュリティ評価                                                          |
| [IoT (モノのインターネット)][37]          | クラウドサービスへの IOT デバイスの接続                                                |
| [Kinesis][38]                           | 大規模な分散データストリームをリアルタイムに処理するサービス                    |
| [KMS (Key Management Service)][39]      | 暗号キーの作成と制御                                                     |
| [Lambda][40]                            | サーバーレスコンピューティング                                                                   |
| [Lex][41]                               | 会話ボットの構築                                                                |
| [Machine Learning][42]                  | 機械学習モデルの作成                                                         |
| [MediaConnect][43]                      | ライブビデオの転送                                                               |
| [MediaConvert][44]                      | 放送およびマルチ画面配信のためのビデオ処理                                |
| [MediaPackage][45]                      | インターネット配信のためのビデオの準備と保護                               |
| [MediaTailor][46]                       | スケーラブルなサーバー側広告挿入                                                      |
| [MQ][47]                                | ActiveMQ 向けのマネージド型メッセージブローカー                                                    |
| [Managed Streaming for Kafka][48]       | Apache Kafka を使用してストリーミングデータを処理するアプリケーションの構築と実行             |
| [NAT ゲートウェイ][49]                       | プライベートサブネット内のインスタンスをインターネットまたは他の AWS サービスに接続可能  |
| [Neptune][50]                           | クラウド向けに構築された高速・高信頼性のグラフデータベース                                      |
| [OpsWorks][51]                          | 構成管理                                                               |
| [Polly][52]                             | テキスト読み上げサービス                                                                    |
| [RDS (Relational Database Service)][53] | クラウドのリレーショナルデータベース                                                       |
| [Redshift][54]                          | データウェアハウスソリューション                                                                |
| [Rekognition][55]                       | アプリケーション向けのイメージおよびビデオ分析                                              |
| [Route 53][56]                          | DNS とトラフィック管理と可用性のモニタリング                                |
| [S3 (Simple Storage Service)][57]       | 高可用性・スケーラブルなクラウドストレージサービス                                    |
| [SageMaker][58]                         | 機械学習モデルおよびアルゴリズム                                                 |
| [SES (Simple Email Service)][59]        | 費用効率の高いアウトバウンド専用のメール送信サービス                                    |
| [SNS (Simple Notification System)][60]  | アラートと通知                                                               |
| [SQS (Simple Queue Service)][61]        | メッセージキューサービス                                                                |
| [Storage Gateway][62]                   | ハイブリッドクラウドストレージ                                                                   |
| [SWF (Simple Workflow Service)][63]     | クラウドワークフロー管理                                                              |
| [VPC (Virtual Private Cloud)][64]       | 仮想ネットワーク内での AWS リソースの起動                                            |
| [Web Application Firewall (WAF)][65]    | 一般的な Web エクスプロイトからの Web アプリケーションの保護                                      |
| [Workspaces][66]                        | セキュアなデスクトップコンピューティングサービス                                                       |
| [X-Ray][67]                             | 分散アプリケーションのトレーシング                                                   |

## セットアップ

Amazon Web Services との Datadog インテグレーションをセットアップするには、AWS IAM を使用してロールの委任を設定する必要があります。ロールの委任について、詳しくは [AWS IAM ベストプラクティス ガイド][68]を参照してください。

### ロールの委任

必要となる AWS ロールのセットアップ方法を選択してください。CloudFormation を推奨します。

{{< tabs >}}
{{% tab "自動 - CloudFormation" %}}

1. [Datadog AWS インテグレーションタイル][1] を開きます。**Install** ボタンをクリックし、このインテグレーションをインストールします。
2. _Configuration_ タブで **Automatically Using CloudFormation** を選択します。既に AWS アカウントがアタッチされている場合は、まず **Add another account** をクリックしてください。
4. AWS コンソールにログインします。
5. CloudFormation ページでスタックを新規作成し、[Datadog API キー][2]を入力します。
6. Update the [Datadog AWS インテグレーション タイル][1]を、CloudFormation のスタック作成に使用した [IAM ロール名とアカウント ID][3] で更新します。

[1]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html
{{% /tab %}}
{{% tab "手動" %}}

#### AWS

1. AWS [IAM コンソール][1]で新しいロールを作成します。
2. ロールタイプで、`Another AWS account` を選択します。
3. アカウント ID で、`464622532012` (Datadog のアカウント ID) を入力します。これは、Datadog に AWS データへの読み取り専用アクセスを許可することを意味します。
4. `Require external ID` を選択し、[AWS インテグレーション タイル][2]で作成された ID を入力します。**Require MFA** は無効のままにしておきます。_外部 ID の詳細については、[IAM ユーザーガイドのこのドキュメント][3]を参照してください_。
5. `Next: Permissions` をクリックします。
6. 既にポリシーを作成してある場合は、このページで検索して選択し、ステップ 12 に進んでください。そうでない場合は、`Create Policy` をクリックします。新しいウィンドウが開きます。
7. `JSON` タブを選択します。Datadog が提供する各 AWS インテグレーションを利用するには、テキストボックスの下にある[ポリシー スニペット](#datadog-aws-iam-policy)を使用します。これらのアクセス許可は、他のコンポーネントがインテグレーションに追加されると変更される場合があります。
8. `Review policy` をクリックします。
9. ポリシーに `DatadogAWSIntegrationPolicy`、または自分が選択した名前を付け、適切な説明を入力します。
10. `Create policy` をクリックします。これで、このウィンドウを閉じることができます。
11. "Create role" ウィンドウに戻り、ポリシーのリストを更新し、作成したポリシーを選択します。
12. `Next: Review` をクリックします。
13. ロールに `DatadogAWSIntegrationRole` などの名前を付け、適切な説明を入力します。`Create Role` をクリックします。

**補足**: Terraform を使用する場合は、[Terraform との AWS インテグレーション][4]を利用して Datadog IAM ポリシーをセットアップします。

#### Datadog

1. [AWS インテグレーション タイル][2]を開きます。
2. **Role Delegation** タブを選択して **Manually** を選択します。
3. AWS アカウント ID を**ダッシュなしで**入力します（例、`123456789012`）。アカウント ID は、[AWS インテグレーションのインストール](#installation)中に作成されるロールの ARN にあります。
4. 作成されたロールの名前を入力します。**注:** インテグレーションタイルに入力する名前は大文字と小文字が区別され、AWS 側で作成されるロール名と完全に一致する必要があります。
5. ダイアログの左側で、メトリクスを収集するサービスを選択します。
6. オプションで、すべてのホストやメトリクスにタグを追加します。
7. オプションで、`to hosts with tag` テキストボックスに AWS タグを入力して、EC2 インスタンスのサブセットを監視します。**注:** インスタンスに接続された EBS ボリュームにも適用されます。
8. オプションで、`to Lambdas with tag` テキストボックスに AWS タグを入力して、Lambdas のサブセットを監視します。
9. **Install Integration** をクリックします。

#### Datadog AWS IAM ポリシー

以下に記載されているアクセス許可はポリシー ドキュメントに含まれているもので、`List*` や `Get*` などのワイルドカードを使用しています。厳密なポリシーが必要な場合は、記載されているとおりの完全なアクション名を使用し、必要なサービスの Amazon API ドキュメントを参照してください。

##### すべてのアクセス許可
すべてのアクセス許可を付与したくない場合は、既存ポリシーのうち少なくとも **AmazonEC2ReadOnlyAccess** および **CloudWatchReadOnlyAccess** を使用してください。アクセス許可の詳細については、[主要なアクセス許可](#主要なアクセス許可) セクションをご覧ください。

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "apigateway:GET",
                "autoscaling:Describe*",
                "budgets:ViewBudget",
                "cloudfront:GetDistributionConfig",
                "cloudfront:ListDistributions",
                "cloudtrail:DescribeTrails",
                "cloudtrail:GetTrailStatus",
                "cloudtrail:LookupEvents",
                "cloudwatch:Describe*",
                "cloudwatch:Get*",
                "cloudwatch:List*",
                "codedeploy:List*",
                "codedeploy:BatchGet*",
                "directconnect:Describe*",
                "dynamodb:List*",
                "dynamodb:Describe*",
                "ec2:Describe*",
                "ecs:Describe*",
                "ecs:List*",
                "elasticache:Describe*",
                "elasticache:List*",
                "elasticfilesystem:DescribeFileSystems",
                "elasticfilesystem:DescribeTags",
                "elasticfilesystem:DescribeAccessPoints",
                "elasticloadbalancing:Describe*",
                "elasticmapreduce:List*",
                "elasticmapreduce:Describe*",
                "es:ListTags",
                "es:ListDomainNames",
                "es:DescribeElasticsearchDomains",
                "health:DescribeEvents",
                "health:DescribeEventDetails",
                "health:DescribeAffectedEntities",
                "kinesis:List*",
                "kinesis:Describe*",
                "lambda:AddPermission",
                "lambda:GetPolicy",
                "lambda:List*",
                "lambda:RemovePermission",
                "logs:DeleteSubscriptionFilter",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:DescribeSubscriptionFilters",
                "logs:FilterLogEvents",
                "logs:PutSubscriptionFilter",
                "logs:TestMetricFilter",
                "rds:Describe*",
                "rds:List*",
                "redshift:DescribeClusters",
                "redshift:DescribeLoggingStatus",
                "route53:List*",
                "s3:GetBucketLogging",
                "s3:GetBucketLocation",
                "s3:GetBucketNotification",
                "s3:GetBucketTagging",
                "s3:ListAllMyBuckets",
                "s3:PutBucketNotification",
                "ses:Get*",
                "sns:List*",
                "sns:Publish",
                "sqs:ListQueues",
                "states:ListStateMachines",
                "states:DescribeStateMachine",
                "support:*",
                "tag:GetResources",
                "tag:GetTagKeys",
                "tag:GetTagValues",
                "xray:BatchGetTraces",
                "xray:GetTraceSummaries"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```

##### 主要なアクセス許可

コア Datadog AWS インテグレーションは、AWS CloudWatch からデータを取得します。少なくとも、ポリシー ドキュメントで次のアクションを許可する必要があります。

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "cloudwatch:Get*",
                "cloudwatch:List*",
                "ec2:Describe*",
                "support:*",
                "tag:GetResources",
                "tag:GetTagKeys",
                "tag:GetTagValues"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```

| AWS アクセス許可             | 説明                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `cloudwatch:ListMetrics`   | 使用可能な CloudWatch メトリクスをリスト化します。                                                       |
| `cloudwatch:GetMetricData` | 特定のメトリクスのデータ ポイントを取得します。                                                        |
| `support:*`:               | サービスの制限に関するメトリクスを追加します。<br>[AWS の制限][5]のためにフル アクセスが必要です。 |
| `tag:getResources`         | リソース タイプ別にカスタム タグを取得します。                                                            |
| `tag:getTagKeys`           | AWS アカウント内のリージョン別にタグ キーを取得します。                                                |
| `tag:getTagValues`         | AWS アカウント内のリージョン別にタグ値を取得します。                                              |

Resource Group Tagging API の主な用途は、カスタム タグの収集に必要な API 呼び出しの数を減らすことです。詳細については、AWS Web サイトの[タグ ポリシー][6] ドキュメントを参照してください。

[1]: https://console.aws.amazon.com/iam/home#/roles
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[4]: https://docs.datadoghq.com/ja/integrations/faq/aws-integration-with-terraform
[5]: https://docs.aws.amazon.com/awssupport/latest/user/Welcome.html#trustedadvisorsection
[6]: http://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/Welcome.html
{{% /tab %}}
{{< /tabs >}}

### GovCloud と China

1. [AWS インテグレーションタイル][69] を開きます。**Install** ボタンをクリックし、このインテグレーションをインストールします。
2. **Access Keys (GovCloud or China Only)** タブを選択します。
3. AWS アクセス キーと AWS 秘密キーを入力します。**GovCloud と中国では、アクセス キーと秘密キーのみが許可されます。**
4. ダイアログの左側で、メトリクスを収集するサービスを選択します。
5. オプションで、すべてのホストやメトリクスにタグを追加します。
6. オプションで、`to hosts with tag` テキストボックスに AWS タグを入力して、EC2 インスタンスのサブセットを監視します。**注:** インスタンスに接続された EBS ボリュームにも適用されます。
7. オプションで、`to Lambdas with tag` テキストボックスに AWS タグを入力して、Lambdas のサブセットを監視します。
8. **Install Integration** をクリックします。

## ログの収集

AWSサービスログを Datadog に送信する方法はいくつかあります。

- [Kinesis Firehose destination][70]: Kinesis Firehose 配信ストリームで Datadog の宛先を使用して、ログを Datadog に転送します。CloudWatch から非常に大量のログを送信するには、このアプローチを使用することをお勧めします。
- [Forwarder Lambda 関数][71]: S3 バケットまたは CloudWatch ロググループにサブスクライブする Datadog Forwarder Lambda 関数をデプロイし、ログを Datadog に転送します。Lambda 関数からログを介して非同期でトレース、拡張カスタムメトリクス、またはカスタムメトリクスを送信するには、このアプローチを使用する**必要があります**。また、S3 またはデータを Kinesis に直接ストリーミングできないその他のリソースからログを送信する場合は、このアプローチを使用することをお勧めします。


## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_web_services" >}}


### イベント

AWS のイベントは、AWS サービス ベースごとに収集されます。収集されるイベントの詳細については、各 AWS サービスの文書を参照してください。

### タグ

AWS インテグレーションから以下のタグが収集されます。**注**: 一部のタグは、特定のメトリクスにのみ表示されます。

| インテグレーション            | Datadog タグキー                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| すべて                    | `region`                                                                                                                                                                                                      |
| [API Gateway][1]      | `apiid`、apiname`、`method`、`resource`、`stage`                                                                                                                                                             |
| [Auto Scaling][5]    | `autoscalinggroupname`、`autoscaling_group`                                                                                                                                                                   |
| [料金][6]          | `account_id`、`budget_name`、`budget_type`、`currency`、`servicename`、`time_unit`                                                                                                                            |
| [CloudFront][7]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][11]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][12]       | `application`、`creator`、`deployment_config`、`deployment_group`、`deployment_option`、`deployment_type`、`status`                                                                                           |
| [DirectConnect][15]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][18]         | `globalsecondaryindexname`、`operation`、`streamlabel`、`tablename`                                                                                                                                           |
| [EBS][19]              | `volumeid`、`volume-name`、`volume-type`                                                                                                                                                                      |
| [EC2][20]              | `autoscaling_group`、`availability-zone`、`image`、`instance-id`、`instance-type`、`kernel`、`name`、`security_group_name`                                                                                    |
| [ECS][22]              | `clustername`、`servicename`、`instance_id`                                                                                                                                                                   |
| [EFS][24]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][]      | `cachenodeid`、`cache_node_type`、`cacheclusterid`、`cluster_name`、`engine`、`engine_version`、`prefered_availability-zone`、`replication_group`                                                             |
| [ElasticBeanstalk][27] | `environmentname`、`enviromentid`                                                                                                                                                                             |
| [ELB][28]              | `availability-zone`、`hostname`、`loadbalancername`、`name`、`targetgroup`                                                                                                                                    |
| [EMR][29]              | `cluster_name`、`jobflowid`                                                                                                                                                                                   |
| [ES][30]               | `dedicated_master_enabled`、`ebs_enabled`、`elasticsearch_version`、`instance_type`、`zone_awareness_enabled`                                                                                                 |
| [Firehose][31]         | `deliverystreamname`                                                                                                                                                                                          |
| [Health][35]           | `event_category`、`status`、`service`                                                                                                                                                                         |
| [IoT][37]              | `actiontype`、`protocol`、`rulename`                                                                                                                                                                          |
| [Kinesis][38]          | `streamname`、`name`、`state`                                                                                                                                                                                 |
| [KMS][39]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][40]           | `functionname`、`resource`、`executedversion`、`memorysize`、`runtime`                                                                                                                                        |
| [Machine Learning][42] | `mlmodelid`、`requestmode`                                                                                                                                                                                    |
| [MQ][47]               | `broker`、`queue`、`topic`                                                                                                                                                                                    |
| [OpsWorks][51]         | `stackid`、`layerid`、`instanceid`                                                                                                                                                                            |
| [Polly][52]            | `operation`                                                                                                                                                                                                   |
| [RDS][53]              | `auto_minor_version_upgrade`、`dbinstanceclass`、`dbclusteridentifier`、`dbinstanceidentifier`、`dbname`、`engine`、`engineversion`、`hostname`、`name`、`publicly_accessible`、`secondary_availability-zone` |
| [Redshift][54]       | `clusteridentifier`、`latency`、`nodeid`、`service_class`、`stage`、`wlmid`                                                                                                                                   |
| [Route 53][56]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][57]             | `bucketname`、`filterid`、`storagetype`                                                                                                                                                                       |
| [SES][59]             | タグキーは AWS でカスタム設定されます。                                                                                                                                                                               |
| [SNS][60]              | `topicname`                                                                                                                                                                                                   |
| [SQS][61]              | `queuename`                                                                                                                                                                                                   |
| [VPC][64]              | `nategatewayid`、`vpnid`、`tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][66]       | `directoryid`、`workspaceid`                                                                                                                                                                                  |

## トラブルシューティング

### CloudWatch と Datadog でデータの不一致があるように見える

以下の 2 つの重要な区別に注意する必要があります。

1. AWS のカウンターで「sum」に設定されているグラフでは、「1minute」に示される値は、その時点までの 1 分間の発生数の合計、つまり 1 分あたりのレートです。Datadog は、AWS で選択された時間フレームに関係なく 1 秒の値あたりに正規化された AWS の未加工データを表示します。そのため、Datadog で示される値が小さく感じられることがあります。
2. 全体を通じて、AWS での最小/最大/平均は、Datadog とは異なる意味を持ちます。AWS では、平均レイテンシー、最小レイテンシー、最大レイテンシーは、AWS が収集する 3 つの独自のメトリクスです。Datadog が AWS CloudWatch からメトリクスを取得するとき、平均レイテンシーは ELB ごとに 1 つの時系列として受信されます。Datadog 内で「min」、「max」、「avg」を選択している場合は、複数の時系列の組み合わせ方法を制御していることになります。たとえば、フィルターなしで `system.cpu.idle` をリクエストすると、そのメトリクスを報告する系列がホストごとに 1 つずつ返され、それらの系列を結合してグラフ化する必要があります。一方、1 つのホストから `system.cpu.idle` をリクエストした場合、集計は不要で、平均と最大を切り替えても結果は同じです。

### メトリクスの遅延

AWS インテグレーションを使用している場合、Datadog は CloudWatch API からメトリクスを取得します。API に関していくつかの制約が存在するため、AWS のメトリクスにわずかな遅延が見られる場合があります。

そもそも、CloudWatch API で提供されるのは、データを取得するためのメトリクス別のクロールだけです。CloudWatch API にはレート制限があり、認証証明書、リージョン、サービスの組み合わせに基づいて変化します。アカウント レベルにより、AWS で使用できるメトリクスは異なります。たとえば、AWS 上で詳細なメトリクスに対して支払いを行うと、短時間で入手できるようになります。この詳細なメトリクスのサービスのレベルは粒度にも適用され、一部のメトリクスは 1 分ごと、それ以外は 5 分ごとに使用可能になります。

Datadog には、状況に応じてアカウント内の特定のメトリクスに優先順位をつけ、すばやく取り込む機能があります。詳細は、[Datadog サポート][73]までご連絡ください。

遅延をほぼゼロでメトリクスを取得するには、ホストに Datadog Agent をインストールします。詳細については、Datadog のブログ投稿[Agent は難しくない: Agent ベースの監視][74]を参照してください。

### メトリクスがない

CloudWatch の API は、データポイントとメトリクスのみを返します。そのため、たとえば、ELB に接続されているインスタンスがない場合は、Datadog でこの ELB に関連するメトリクスは表示されないことが予想されます。

### aws.elb.healthy_host_count のカウントに誤りがある

ELB でクロスゾーン負荷分散オプションを有効にすると、この ELB に接続されているすべてのインスタンスは、すべてのアベイラビリティー ゾーンの一部であると見なされます (CloudWatch 側)。そのため、1a に 2 個、ab に 3 個のインスタンスがある場合、メトリクスはアベイラビリティー ゾーンごとに 5 つのインスタンスが表示されます。
このカウンターは直感的でないので、新しいメトリクス **aws.elb.healthy_host_count_deduped** と **aws.elb.un_healthy_host_count_deduped** を追加しています。これは、このクロスゾーン負荷分散オプションが有効かどうかに関係なく、アベイラビリティー ゾーンごとに正常または正常でないインスタンスのカウントを表示します。

### Agent のインストール時にホストが重複する

AWS ホストに Agent をインストールし、Agent の構成でホスト名を手動で設定した場合、インフラ ページにホストが数時間、重複して表示されることがあります。この 2 番目のホストは数時間で消え、請求には影響しません。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_api_gateway/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_appstream/
[3]: https://docs.datadoghq.com/ja/integrations/amazon_appsync/
[4]: https://docs.datadoghq.com/ja/integrations/amazon_athena/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_auto_scaling/
[6]: https://docs.datadoghq.com/ja/integrations/amazon_billing/
[7]: https://docs.datadoghq.com/ja/integrations/amazon_cloudfront/
[8]: https://docs.datadoghq.com/ja/integrations/amazon_cloudhsm/
[9]: https://docs.datadoghq.com/ja/integrations/amazon_cloudsearch/
[10]: https://docs.datadoghq.com/ja/integrations/amazon_cloudtrail/
[11]: https://docs.datadoghq.com/ja/integrations/amazon_codebuild/
[12]: https://docs.datadoghq.com/ja/integrations/amazon_codedeploy/
[13]: https://docs.datadoghq.com/ja/integrations/amazon_cognito/
[14]: https://docs.datadoghq.com/ja/integrations/amazon_connect/
[15]: https://docs.datadoghq.com/ja/integrations/amazon_directconnect/
[16]: https://docs.datadoghq.com/ja/integrations/amazon_dms/
[17]: https://docs.datadoghq.com/ja/integrations/amazon_documentdb/
[18]: https://docs.datadoghq.com/ja/integrations/amazon_dynamodb/
[19]: https://docs.datadoghq.com/ja/integrations/amazon_ebs/
[20]: https://docs.datadoghq.com/ja/integrations/amazon_ec2/
[21]: https://docs.datadoghq.com/ja/integrations/amazon_ec2_spot/
[22]: https://docs.datadoghq.com/ja/integrations/amazon_ecs/
[23]: https://docs.datadoghq.com/ja/integrations/amazon_efs/
[24]: https://docs.datadoghq.com/ja/integrations/amazon_eks/
[25]: https://docs.datadoghq.com/ja/integrations/amazon_elastic_transcoder/
[26]: https://docs.datadoghq.com/ja/integrations/amazon_elasticache/
[27]: https://docs.datadoghq.com/ja/integrations/amazon_elasticbeanstalk/
[28]: https://docs.datadoghq.com/ja/integrations/amazon_elb/
[29]: https://docs.datadoghq.com/ja/integrations/amazon_emr/
[30]: https://docs.datadoghq.com/ja/integrations/amazon_es/
[31]: https://docs.datadoghq.com/ja/integrations/amazon_firehose/
[32]: https://docs.datadoghq.com/ja/integrations/amazon_gamelift/
[33]: https://docs.datadoghq.com/ja/integrations/amazon_glue/
[34]: https://docs.datadoghq.com/ja/integrations/amazon_guardduty/
[35]: https://docs.datadoghq.com/ja/integrations/amazon_health/
[36]: https://docs.datadoghq.com/ja/integrations/amazon_inspector/
[37]: https://docs.datadoghq.com/ja/integrations/amazon_iot/
[38]: https://docs.datadoghq.com/ja/integrations/amazon_kinesis/
[39]: https://docs.datadoghq.com/ja/integrations/amazon_kms/
[40]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/
[41]: https://docs.datadoghq.com/ja/integrations/amazon_lex/
[42]: https://docs.datadoghq.com/ja/integrations/amazon_machine_learning/
[43]: https://docs.datadoghq.com/ja/integrations/amazon_mediaconnect/
[44]: https://docs.datadoghq.com/ja/integrations/amazon_mediaconvert/
[45]: https://docs.datadoghq.com/ja/integrations/amazon_mediapackage/
[46]: https://docs.datadoghq.com/ja/integrations/amazon_mediatailor/
[47]: https://docs.datadoghq.com/ja/integrations/amazon_mq/
[48]: https://docs.datadoghq.com/ja/integrations/amazon_msk/
[49]: https://docs.datadoghq.com/ja/integrations/amazon_nat_gateway/
[50]: https://docs.datadoghq.com/ja/integrations/amazon_neptune/
[51]: https://docs.datadoghq.com/ja/integrations/amazon_ops_works/
[52]: https://docs.datadoghq.com/ja/integrations/amazon_polly/
[53]: https://docs.datadoghq.com/ja/integrations/amazon_rds/
[54]: https://docs.datadoghq.com/ja/integrations/amazon_redshift/
[55]: https://docs.datadoghq.com/ja/integrations/amazon_rekognition/
[56]: https://docs.datadoghq.com/ja/integrations/amazon_route53/
[57]: https://docs.datadoghq.com/ja/integrations/amazon_s3/
[58]: https://docs.datadoghq.com/ja/integrations/amazon_sagemaker/
[59]: https://docs.datadoghq.com/ja/integrations/amazon_ses/
[60]: https://docs.datadoghq.com/ja/integrations/amazon_sns/
[61]: https://docs.datadoghq.com/ja/integrations/amazon_sqs/
[62]: https://docs.datadoghq.com/ja/integrations/amazon_storage_gateway/
[63]: https://docs.datadoghq.com/ja/integrations/amazon_swf/
[64]: https://docs.datadoghq.com/ja/integrations/amazon_vpc/
[65]: https://docs.datadoghq.com/ja/integrations/amazon_waf/
[66]: https://docs.datadoghq.com/ja/integrations/amazon_workspaces/
[67]: https://docs.datadoghq.com/ja/integrations/amazon_xray/
[68]: http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[69]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[70]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[71]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[72]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[73]: https://docs.datadoghq.com/ja/help/
[74]: http://www.datadoghq.com/blog/dont-fear-the-agent