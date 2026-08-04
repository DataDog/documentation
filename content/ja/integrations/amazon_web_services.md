---
app_id: amazon-web-services
app_uuid: 45508037-7831-469d-80da-20241f00cbed
assets:
  dashboards:
    aws_advisor: assets/dashboards/aws_advisor.json
    aws_ebs: assets/dashboards/aws_ebs.json
    aws_event_bridge: assets/dashboards/aws_event_bridge.json
    aws_firehose: assets/dashboards/aws_firehose.json
    aws_overall: assets/dashboards/aws_overall.json
    aws_sns: assets/dashboards/aws_sns.json
    aws_sqs: assets/dashboards/aws_sqs.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - aws.usage.call_count
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10
    source_type_name: Amazon Web Services
  monitors:
    Integration Health Status: assets/monitors/aws_integration_status_monitor.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- cloud
- iot
- log collection
- event management
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_web_services
integration_id: amazon-web-services
integration_title: Amazon Web Services
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_web_services
public_title: Amazon Web Services
short_description: Amazon Web Services (AWS) は、クラウド コンピューティング プラットフォームを構成する Web サービス群です。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::クラウド
  - Category::IoT
  - Category::ログの収集
  - Category::Event Management
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon Web Services (AWS) は、クラウド コンピューティング プラットフォームを構成する Web サービス群です。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/aws-reinvent-2022-recap/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/iam-least-privilege/
  support: README.md#Support
  title: Amazon Web Services
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon Web Services (AWS) を接続すると、次のことができるようになります。

- イベントエクスプローラーで AWS ステータスの自動更新を確認する
- Agent をインストールすることなく、EC2 ホストの CloudWatch メトリクスを取得する
- EC2 ホストに EC2 固有の情報をタグ付けする
- EC2 のスケジュール設定されたメンテナンス イベントをストリームに表示する
- その他のさまざまな AWS 製品から CloudWatch メトリクスとイベントを収集する
- イベントエクスプローラーで CloudWatch アラームを確認する

AWS インテグレーションをすぐに使い始めるには、[AWS スタートガイド][1]をご確認ください。

Datadog の Amazon Web Services インテグレーションは、[90 以上の AWS サービス][3]のログ、イベント、[CloudWatch からのほとんどのメトリクス][2]を収集します。

## セットアップ

以下のいずれかの方法を使用して AWS アカウントを Datadog に統合し、メトリクス、イベント、タグ、ログを収集します。

### 自動

  * **CloudFormation (すぐに始めたい場合に最適)**
    CloudFormation で AWS インテグレーションを設定するには、[AWS スタートガイド][1]を参照してください。

  * **Terraform**
    AWS と Terraform のインテグレーションを設定するには、[AWS と Terraform のインテグレーション][4]を参照してください。

  * **Control Tower**
    [Control Tower Account Factory][5] で新規に AWS アカウントをプロビジョニングする際の AWS インテグレーション設定は、[Control Tower セットアップガイド][6]をご覧ください。

  * **AWS 組織向けマルチアカウント設定**
    AWS 組織内の複数のアカウントに対して AWS インテグレーションを設定するには、[AWS 組織セットアップガイド][7]を参照してください。

### 手動

   * **ロールの委任**
     AWS インテグレーションをロールの委任で手動設定する場合は、[手動設定ガイド][8]を参照してください。

   * **アクセス キー (GovCloud または China\* のみ)**
     アクセスキーによる AWS インテグレーションを設定する場合は、[手動設定ガイド][9]を参照してください。

      *\* 中国本土における (または中国本土内の環境に関連する) Datadog サービスの使用はすべて、当社 Web サイトの[サービス制限地域][10]セクションに掲載されている免責事項に従うものとします。*

{{% aws-permissions %}}

{{% aws-resource-collection %}}

## ログ収集

AWSサービスログを Datadog に送信する方法はいくつかあります。

- [Amazon Data Firehose destination][11]: Amazon Data Firehose 配信ストリームで Datadog の宛先を使用して、ログを Datadog に転送します。CloudWatch から非常に大量のログを送信する際は、このアプローチを使用することが推奨されます。
- [Forwarder Lambda 関数][12]: S3 バケットまたは CloudWatch ロググループにサブスクライブする Datadog Forwarder Lambda 関数をデプロイし、ログを Datadog に転送します。また、S3 またはデータを Amazon Data Firehose に直接ストリーミングできないその他のリソースからログを送信する場合、Datadog ではこのアプローチを使用することをお勧めしています。

## メトリクスの収集

メトリクスを Datadog に送信する方法は 2 つあります。

- [メトリクスのポーリング][13]: AWS インテグレーションで利用できる API ポーリングです。CloudWatch API をメトリクス別にクロールしてデータを取得し、Datadog に送信します。新しいメトリクスの取得は平均 10 分毎に行われます。
- [Amazon Data Firehose でのメトリクスストリーム][14]: Amazon CloudWatch Metric Streams と Amazon Data Firehose を使用してメトリクスを確認します。**注**: このメソッドには 2 - 3 分のレイテンシーがあり、別途設定が必要となります。

利用可能なサブインテグレーションの一覧は、[インテグレーションページ][3]でご確認いただけます。これらのインテグレーションの多くは、Datadog が AWS アカウントからのデータ入力を認識した際にデフォルトでインストールされます。コスト管理のために特定のリソースを除外するオプションについては、[AWS インテグレーション請求ページ][15]をご参照ください。

## リソース収集

一部の Datadog 製品は、AWS リソース (S3 バケット、RDS スナップショット、CloudFront ディストリビューションなど) の構成方法に関する情報を活用します。Datadog は、AWS アカウントに対して読み取り専用の API 呼び出しを行うことにより、この情報を収集します。

{{% aws-resource-collection %}}

### リソース タイプと権限

以下のセクションでは、Datadog の各プロダクトで収集されるリソース タイプと、Datadog IAM ロールが代理でデータを収集するために必要な権限をまとめています。これらの権限を、既存の AWS インテグレーション IAM ポリシー (`SecurityAudit` ポリシーをアタッチ済み) に追加してください。

{{% collapse-content title="Cloud Cost Management (CCM)" level="h4" expanded=false id="cloud-cost-management" %}}
{{% aws-resource-collection-cloud-cost-management %}}
{{% /collapse-content %}}

{{% collapse-content title="Cloudcraft" level="h4" expanded=false id="cloudcraft" %}}
{{% aws-resource-collection-cloudcraft %}}
{{% /collapse-content %}}

{{% collapse-content title="Cloud Security Monitoring (CSM)" level="h4" expanded=false id="cloud-security-monitoring" %}}
{{% aws-resource-collection-cloud-security-monitoring %}}
{{% /collapse-content %}}

{{% collapse-content title="Network Performance Monitoring (NPM)" level="h4" expanded=false id="network-performance-monitoring" %}}
{{% aws-resource-collection-network-performance-monitoring %}}
{{% /collapse-content %}}

{{% collapse-content title="Resource Catalog" level="h4" expanded=false id="resource-catalog" %}}
{{% aws-resource-collection-resource-catalog %}}
{{% /collapse-content %}}

#### 今後のリリース

ここに記載している権限は、今後 30 日以内に追加予定のリソースを反映したものです。Datadog のリソース カバレッジとトラッキングを最大限に活用するため、これらの権限を既存の AWS インテグレーション IAM ポリシー (`SecurityAudit` ポリシーをアタッチ済み) に含めてください。

{{% collapse-content title="今後のリリース向けの権限" level="h4" expanded=false id="upcoming-permissions" %}}
{{% aws-resource-collection-upcoming-permissions %}}
{{% /collapse-content %}}

### Cloud Security

#### セットアップ

AWS アカウントに AWS インテグレーションをまだ設定していない場合は、上記の [セットアップ手順][16] を完了してください。手順内で案内される箇所では Cloud Security を必ず有効化してください。

**注:** この機能を使用するには、AWS インテグレーションに**ロールの委任**を設定する必要があります。

既存の AWS インテグレーションに Cloud Security を追加するには、以下の手順に従ってリソースの収集を有効化してください。

1. Datadog IAM ロールに必要な権限を付与するには、AWS マネージドの `SecurityAudit` ポリシーを Datadog の AWS IAM ロールにアタッチしてください。このポリシーは [AWS コンソール][17] で確認できます。

2. [Datadog AWS インテグレーションページ][18]で、以下の手順で設定を完了させます。または、[Update an AWS Integration][8] API エンドポイントを利用することも可能です。

   1. リソース収集を有効化したい AWS アカウントを選択します。
   2. **Resource collection** タブで、Cloud Security の横にある **Enable** をクリックします。Cloud Security Setup ページへリダイレクトされ、選択したアカウントのセットアップ ダイアログが自動的に開きます。
   3. セットアップダイアログで、**Enable Resource Scanning** トグルをオンに切り替えます。 
   4. **Done** をクリックしてセットアップを完了します。

## アラームの収集

AWS CloudWatch アラームを Datadog イベントエクスプローラーに送信する方法は 2 つあります。

- Alarm polling: Alarm polling は AWS インテグレーションに標準で含まれており、[DescribeAlarmHistory][19] API を通じてメトリクス アラームを取得します。この方法を採用すると、アラームはイベント ソース `Amazon Web Services` として分類されます。**注**: クローラはコンポジット アラームを収集しません。
- SNS トピック: アラームを SNS トピックにサブスクライブしてから、SNS メッセージを Datadog に転送することで、イベントエクスプローラー内のすべての AWS CloudWatch アラームを確認できます。Datadog でイベントとして SNS メッセージを受信する方法については、[SNS メッセージの受信][20]を参照してください。この方法に従うと、イベントソース `Amazon SNS` の下にアラームが分類されます。

## 収集されるデータ

### メトリクス
{{< get-metrics-from-git "amazon_web_services" >}}


**注**: AWS カスタムメトリクスの収集を有効にしたり、Datadog がインテグレーションを提供していないサービスからのメトリクスを収集することも可能です。詳しくは、[AWS インテグレーションと CloudWatch の FAQ][22] をご参照ください。

### イベント

AWS からのイベントは、AWS サービス単位で収集されます。収集されるイベントの詳細については、[お使いの AWS サービスのドキュメント][3]を参照してください。

### タグ

AWS インテグレーションにより以下のタグが収集されます。**注**: 一部のタグは、特定のメトリクスにのみ表示されます。

| インテグレーション            | Datadog タグキー                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| All                    | `region`                                                                                                                                                                                                      |
| [API Gateway][23]      | `apiid`、apiname`、`method`、`resource`、`stage`                                                                                                                                                             |
| [App Runner][24]      | `instance`、`serviceid`、`servicename`                                                                                                                                                                       |
| [Auto Scaling][25]    | `autoscalinggroupname`、`autoscaling_group`                                                                                                                                                                   |
| [Billing][26]          | `account_id`、`budget_name`、`budget_type`、`currency`、`servicename`、`time_unit`                                                                                                                            |
| [CloudFront][27]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][28]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][29]       | `application`、`creator`、`deployment_config`、`deployment_group`、`deployment_option`、`deployment_type`、`status`                                                                                           |
| [DirectConnect][30]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][31]         | `globalsecondaryindexname`、`operation`、`streamlabel`、`tablename`                                                                                                                                           |
| [EBS][32]              | `volumeid`、`volume-name`、`volume-type`                                                                                                                                                                      |
| [EC2][33]              | `autoscaling_group`、`availability-zone`、`image`、`instance-id`、`instance-type`、`kernel`、`name`、`security_group_name`                                                                                    |
| [ECS][34]              | `clustername`、`servicename`、`instance_id`                                                                                                                                                                   |
| [EFS][35]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][36]      | `cachenodeid`、`cache_node_type`、`cacheclusterid`、`cluster_name`、`engine`、`engine_version`、`preferred_availability-zone`、`replication_group`                                                             |
| [ElasticBeanstalk][37] | `environmentname`、`enviromentid`                                                                                                                                                                             |
| [ELB][38]              | `availability-zone`、`hostname`、`loadbalancername`、`name`、`targetgroup`                                                                                                                                    |
| [EMR][39]              | `cluster_name`、`jobflowid`                                                                                                                                                                                   |
| [ES][40]               | `dedicated_master_enabled`、`ebs_enabled`、`elasticsearch_version`、`instance_type`、`zone_awareness_enabled`                                                                                                 |
| [Firehose][41]         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx][42]             | `filesystemid`、`filesystemtype`                                                                                                                                                                               |
| [Health][43]           | `event_category`、`status`、`service`                                                                                                                                                                         |
| [IoT][44]              | `actiontype`、`protocol`、`rulename`                                                                                                                                                                          |
| [Kinesis][45]          | `streamname`、`name`、`state`                                                                                                                                                                                 |
| [KMS][46]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][47]           | `functionname`、`resource`、`executedversion`、`memorysize`、`runtime`                                                                                                                                        |
| [Machine Learning][48] | `mlmodelid`、`requestmode`                                                                                                                                                                                    |
| [MQ][49]               | `broker`、`queue`、`topic`                                                                                                                                                                                    |
| [OpsWorks][50]         | `stackid`、`layerid`、`instanceid`                                                                                                                                                                            |
| [Polly][51]            | `operation`                                                                                                                                                                                                   |
| [RDS][52]              | `auto_minor_version_upgrade`、`dbinstanceclass`、`dbclusteridentifier`、`dbinstanceidentifier`、`dbname`、`engine`、`engineversion`、`hostname`、`name`、`publicly_accessible`、`secondary_availability-zone` |
| [RDS Proxy][53]       | `proxyname`、`target`、`targetgroup`、`targetrole`                                                                                                                                                                                                  |
| [Redshift][54]       | `clusteridentifier`、`latency`、`nodeid`、`service_class`、`stage`、`wlmid`                                                                                                                                   |
| [Route 53][55]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][56]             | `bucketname`、`filterid`、`storagetype`                                                                                                                                                                       |
| [SES][57]             | タグキーは AWS でカスタム設定されます。                                                                                                                                                                               |
| [SNS][58]              | `topicname`                                                                                                                                                                                                   |
| [SQS][59]              | `queuename`                                                                                                                                                                                                   |
| [VPC][60]              | `nategatewayid`、`vpnid`、`tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][61]       | `directoryid`、`workspaceid`                                                                                                                                                                                  |

### サービス チェック
{{< get-service-checks-from-git "amazon_web_services" >}}


## トラブルシューティング

AWS インテグレーションに関する問題解決は、[AWS インテグレーションのトラブルシューティングガイド][63]をご参照ください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:
- [Datadog で AWS コントロール プレーン API の使用量メトリクスを監視する][64]
- [AWS re:Invent 2022 のハイライト][65]
- [最小権限の AWS IAM ポリシーを作成するためのベスト プラクティス][66]


[1]: https://docs.datadoghq.com/ja/getting_started/integrations/aws/
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html
[3]: https://docs.datadoghq.com/ja/integrations/#cat-aws
[4]: https://docs.datadoghq.com/ja/integrations/guide/aws-terraform-setup/
[5]: https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html
[6]: https://aws.amazon.com/blogs/awsmarketplace/deploy-datadogs-aws-integration-accounts-aws-control-tower-account-factory-customization/
[7]: https://docs.datadoghq.com/ja/integrations/guide/aws-organizations-setup/
[8]: https://docs.datadoghq.com/ja/integrations/guide/aws-manual-setup/
[9]: https://docs.datadoghq.com/ja/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly
[10]: https://www.datadoghq.com/legal/restricted-service-locations/
[11]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[12]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[13]: https://docs.datadoghq.com/ja/integrations/guide/cloud-metric-delay/#aws
[14]: https://docs.datadoghq.com/ja/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[15]: https://docs.datadoghq.com/ja/account_management/billing/aws/
[16]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=roledelegation#setup
[17]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[18]: https://app.datadoghq.com/integrations/amazon-web-services
[19]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_DescribeAlarmHistory.html#API_DescribeAlarmHistory_RequestParameters
[20]: https://docs.datadoghq.com/ja/integrations/amazon_sns/#receive-sns-messages
[21]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_web_services/assets/metrics/metric-spec.yaml
[22]: https://docs.datadoghq.com/ja/integrations/guide/aws-integration-and-cloudwatch-faq/#can-i-collect-aws-custom-metrics-through-the-integration
[23]: https://docs.datadoghq.com/ja/integrations/amazon_api_gateway/
[24]: https://docs.datadoghq.com/ja/integrations/amazon_app_runner
[25]: https://docs.datadoghq.com/ja/integrations/amazon_auto_scaling/
[26]: https://docs.datadoghq.com/ja/integrations/amazon_billing/
[27]: https://docs.datadoghq.com/ja/integrations/amazon_cloudfront/
[28]: https://docs.datadoghq.com/ja/integrations/amazon_codebuild/
[29]: https://docs.datadoghq.com/ja/integrations/amazon_codedeploy/
[30]: https://docs.datadoghq.com/ja/integrations/amazon_directconnect/
[31]: https://docs.datadoghq.com/ja/integrations/amazon_dynamodb/
[32]: https://docs.datadoghq.com/ja/integrations/amazon_ebs/
[33]: https://docs.datadoghq.com/ja/integrations/amazon_ec2/
[34]: https://docs.datadoghq.com/ja/integrations/amazon_ecs/
[35]: https://docs.datadoghq.com/ja/integrations/amazon_efs/
[36]: https://docs.datadoghq.com/ja/integrations/amazon_elasticache/
[37]: https://docs.datadoghq.com/ja/integrations/amazon_elasticbeanstalk/
[38]: https://docs.datadoghq.com/ja/integrations/amazon_elb/
[39]: https://docs.datadoghq.com/ja/integrations/amazon_emr/
[40]: https://docs.datadoghq.com/ja/integrations/amazon_es/
[41]: https://docs.datadoghq.com/ja/integrations/amazon_firehose/
[42]: https://docs.datadoghq.com/ja/integrations/amazon_fsx/
[43]: https://docs.datadoghq.com/ja/integrations/amazon_health/
[44]: https://docs.datadoghq.com/ja/integrations/amazon_iot/
[45]: https://docs.datadoghq.com/ja/integrations/amazon_kinesis/
[46]: https://docs.datadoghq.com/ja/integrations/amazon_kms/
[47]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/
[48]: https://docs.datadoghq.com/ja/integrations/amazon_machine_learning/
[49]: https://docs.datadoghq.com/ja/integrations/amazon_mq/
[50]: https://docs.datadoghq.com/ja/integrations/amazon_ops_works/
[51]: https://docs.datadoghq.com/ja/integrations/amazon_polly/
[52]: https://docs.datadoghq.com/ja/integrations/amazon_rds/
[53]: https://docs.datadoghq.com/ja/integrations/amazon_rds_proxy/
[54]: https://docs.datadoghq.com/ja/integrations/amazon_redshift/
[55]: https://docs.datadoghq.com/ja/integrations/amazon_route53/
[56]: https://docs.datadoghq.com/ja/integrations/amazon_s3/
[57]: https://docs.datadoghq.com/ja/integrations/amazon_ses/
[58]: https://docs.datadoghq.com/ja/integrations/amazon_sns/
[59]: https://docs.datadoghq.com/ja/integrations/amazon_sqs/
[60]: https://docs.datadoghq.com/ja/integrations/amazon_vpc/
[61]: https://docs.datadoghq.com/ja/integrations/amazon_workspaces/
[62]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_web_services/assets/service_checks.json
[63]: https://docs.datadoghq.com/ja/integrations/guide/aws-integration-troubleshooting/
[64]: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
[65]: https://www.datadoghq.com/blog/aws-reinvent-2022-recap/
[66]: https://www.datadoghq.com/blog/iam-least-privilege/