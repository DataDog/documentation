---
aliases:
- /ja/integrations/aws/
- /ja/logs/aws
- /ja/integrations/faq/revoking-aws-keys-and-enabling-role-delegation-for-the-datadog-aws-integration/
- /ja/integrations/faq/additional-aws-metrics-min-max-sum
- /ja/integrations/faq/why-am-i-only-seeing-the-average-values-of-my-custom-aws-cloudwatch-metrics/
categories:
- aws
- cloud
- iot
- log collection
dependencies: []
description: AWS サービスを Datadog と統合。
doc_link: https://docs.datadoghq.com/integrations/amazon_web_services/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
  tag: ブログ
  text: Datadog で AWS コントロールプレーン API の使用量メトリクスを監視する
- link: https://www.datadoghq.com/blog/aws-reinvent-2022-recap/
  tag: ブログ
  text: AWS re:Invent 2022 のハイライト
git_integration_title: amazon_web_services
has_logo: true
integration_id: amazon-web-services
integration_title: AWS
integration_version: ''
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

- イベントエクスプローラーで AWS ステータスの自動更新を確認する
- Agent をインストールすることなく、EC2 ホストの CloudWatch メトリクスを取得する
- EC2 ホストに EC2 固有の情報をタグ付けする
- EC2 のスケジュール設定されたメンテナンス イベントをストリームに表示する
- その他のさまざまな AWS 製品から CloudWatch メトリクスとイベントを収集する
- イベントエクスプローラーで CloudWatch アラームを確認する

AWS インテグレーションをすぐに使い始めるには、[AWS スタートガイド][1]をご確認ください。

Datadog の Amazon Web Services インテグレーションは、[90 以上の AWS サービス][3]のログ、イベント、[CloudWatch からの全メトリクス][2]を収集します。

## セットアップ

{{< site-region region="gov" >}}
<div class="alert alert-warning">AWS のロール委任は、Datadog for Government site でサポートされていません。<a href="?tab=accesskeysgovcloudorchinaonly#setup">アクセスキー</a>を使用する必要があります。</div>
{{< /site-region >}}

以下のいずれかの方法を使用して AWS アカウントを Datadog に統合し、メトリクス、イベント、タグ、ログを収集します。

### 自動

  * **CloudFormation (手早く始めるには最適)**  
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

   * **アクセスキー (GovCloud または中国のみ)**  
     アクセスキーによる AWS インテグレーションを設定する場合は、[手動設定ガイド][9]を参照してください。

{{% aws-permissions %}}

## ログの収集

AWSサービスログを Datadog に送信する方法はいくつかあります。

- [Kinesis Firehose destination][10]: Kinesis Firehose 配信ストリームで Datadog の宛先を使用して、ログを Datadog に転送します。CloudWatch から非常に大量のログを送信する際は、このアプローチを使用することが推奨されます。
- [Forwarder Lambda 関数][11]: S3 バケットまたは CloudWatch ロググループにサブスクライブする Datadog Forwarder Lambda 関数をデプロイし、ログを Datadog に転送します。また、S3 またはデータを Kinesis に直接ストリーミングできないその他のリソースからログを送信する場合、Datadog ではこのアプローチを使用することをお勧めしています。

## メトリクスの収集

メトリクスを Datadog に送信する方法は 2 つあります。

- [メトリクスのポーリング][12]: AWS インテグレーションで利用できる API ポーリングです。CloudWatch API をメトリクス別にクロールしてデータを取得し、Datadog に送信します。新しいメトリクスの取得は平均 10 分毎に行われます。
- [Kinesis Firehose でのメトリクスストリーム][13]: Amazon CloudWatch Metric Streams と Amazon Kinesis Data Firehose を使用してメトリクスを確認します。**注**: このメソッドには 2 - 3 分のレイテンシーがあり、別途設定が必要となります。

コスト管理のために特定のリソースを除外するオプションについては、[AWS Integration Billing ページ][14]を参照してください。

## リソース収集

一部の Datadog 製品は、AWS リソース (S3 バケット、RDS スナップショット、CloudFront ディストリビューションなど) の構成方法に関する情報を活用します。Datadog は、AWS アカウントに対して読み取り専用の API 呼び出しを行うことにより、この情報を収集します。

### Cloud Security Management Misconfigurations

#### セットアップ

お使いの AWS アカウントで AWS インテグレーションの設定を行っていない場合は、上記の[設定プロセス][15]を完了させます。Cloud Security Management Misconfigurations が有効化されていることを適宜ご確認ください。

**注:** この機能を使用するには、AWS インテグレーションに**ロールの委任**を設定する必要があります。

既存の AWS インテグレーションに Cloud Security Management Misconfigurations を追加するには、以下の手順でリソース収集を有効にしてください。

1. 自動**または**手動手順で Datadog IAM ロールに必要な権限を提供します。

   **自動** - CloudFormation テンプレートを更新します。
   a. CloudFormation コンソールで Datadog インテグレーションのインストールに使用した主要なスタックを探し、`Update` を選択します。
   b. `Replace current template` を選択します。
   c. `Amazon S3 URL` を選択して `https://datadog-cloudformation-template.s3.amazonaws.com/aws/main.yaml` を入力し、`Next` をクリックします。
   d. `CloudSecurityPostureManagementPermissions` を `true` に設定し、`Next` をクリックします。`Review` ページに到達するまでその他の既存のパラメーターは変更しないでください。ここで変更点をプレビューおよび確認します。
   e. 下部にある 2 つの確認ボックスをオンにし、`Update stack` をクリックします。

   **手動** - [AWS が管理する `SecurityAudit` ポリシー][16]を Datadog AWS IAM ロールにアタッチします。このポリシーは [AWS コンソール][16]にあります。

2. [Datadog AWS インテグレーションページ][17]で、以下の手順で設定を完了させます。または、[Update an AWS Integration][8] API エンドポイントを利用することも可能です。

   1. リソース収集を有効化したい AWS アカウントをクリックします。
   2. そのアカウントの **Resource collection** タブに移動し、`Cloud Security Posture Management Collection` を有効にします。
   3. ページの右下にある `Save` をクリックします。

## アラームの収集

AWS CloudWatch アラームを Datadog イベントエクスプローラーに送信する方法は 2 つあります。

- アラームポーリング: アラームポーリングは AWS インテグレーションですぐに使用でき、[DescribeAlarmHistory][18] API を介してメトリクスアラームをフェッチします。この方法に従うと、イベントソース `Amazon Web Services` の下にアラームが分類されます。**注**: クローラーは複合アラームを収集しません。
- SNS トピック: アラームを SNS トピックにサブスクライブしてから、SNS メッセージを Datadog に転送することで、イベントエクスプローラー内のすべての AWS CloudWatch アラームを確認できます。Datadog でイベントとして SNS メッセージを受信する方法については、[SNS メッセージの受信][19]を参照してください。この方法に従うと、イベントソース `Amazon SNS` の下にアラームが分類されます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_web_services" >}}


### イベント

AWS からのイベントは、AWS サービス単位で収集されます。収集されるイベントの詳細については、[お使いの AWS サービスのドキュメント][3]を参照してください。

### タグ

AWS インテグレーションにより以下のタグが収集されます。**注**: 一部のタグは、特定のメトリクスにのみ表示されます。

| インテグレーション            | Datadog タグキー                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| All                    | `region`                                                                                                                                                                                                      |
| [API Gateway][21]      | `apiid`、apiname`、`method`、`resource`、`stage`                                                                                                                                                             |
| [App Runner][22]      | `instance`、`serviceid`、`servicename`                                                                                                                                                                       |
| [Auto Scaling][23]    | `autoscalinggroupname`、`autoscaling_group`                                                                                                                                                                   |
| [Billing][24]          | `account_id`、`budget_name`、`budget_type`、`currency`、`servicename`、`time_unit`                                                                                                                            |
| [CloudFront][25]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][26]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][27]       | `application`、`creator`、`deployment_config`、`deployment_group`、`deployment_option`、`deployment_type`、`status`                                                                                           |
| [DirectConnect][28]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][29]         | `globalsecondaryindexname`、`operation`、`streamlabel`、`tablename`                                                                                                                                           |
| [EBS][30]              | `volumeid`、`volume-name`、`volume-type`                                                                                                                                                                      |
| [EC2][31]              | `autoscaling_group`、`availability-zone`、`image`、`instance-id`、`instance-type`、`kernel`、`name`、`security_group_name`                                                                                    |
| [ECS][32]              | `clustername`、`servicename`、`instance_id`                                                                                                                                                                   |
| [EFS][33]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][34]      | `cachenodeid`、`cache_node_type`、`cacheclusterid`、`cluster_name`、`engine`、`engine_version`、`preferred_availability-zone`、`replication_group`                                                             |
| [ElasticBeanstalk][35] | `environmentname`、`enviromentid`                                                                                                                                                                             |
| [ELB][36]              | `availability-zone`、`hostname`、`loadbalancername`、`name`、`targetgroup`                                                                                                                                    |
| [EMR][37]              | `cluster_name`、`jobflowid`                                                                                                                                                                                   |
| [ES][38]               | `dedicated_master_enabled`、`ebs_enabled`、`elasticsearch_version`、`instance_type`、`zone_awareness_enabled`                                                                                                 |
| [Firehose][39]         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx][40]             | `filesystemid`、`filesystemtype`                                                                                                                                                                               |
| [Health][41]           | `event_category`、`status`、`service`                                                                                                                                                                         |
| [IoT][42]              | `actiontype`、`protocol`、`rulename`                                                                                                                                                                          |
| [Kinesis][43]          | `streamname`、`name`、`state`                                                                                                                                                                                 |
| [KMS][44]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][45]           | `functionname`、`resource`、`executedversion`、`memorysize`、`runtime`                                                                                                                                        |
| [Machine Learning][46] | `mlmodelid`、`requestmode`                                                                                                                                                                                    |
| [MQ][47]               | `broker`、`queue`、`topic`                                                                                                                                                                                    |
| [OpsWorks][48]         | `stackid`、`layerid`、`instanceid`                                                                                                                                                                            |
| [Polly][49]            | `operation`                                                                                                                                                                                                   |
| [RDS][50]              | `auto_minor_version_upgrade`、`dbinstanceclass`、`dbclusteridentifier`、`dbinstanceidentifier`、`dbname`、`engine`、`engineversion`、`hostname`、`name`、`publicly_accessible`、`secondary_availability-zone` |
| [RDS Proxy][51]       | `proxyname`、`target`、`targetgroup`、`targetrole`                                                                                                                                                                                                  |
| [Redshift][52]       | `clusteridentifier`、`latency`、`nodeid`、`service_class`、`stage`、`wlmid`                                                                                                                                   |
| [Route 53][53]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][54]             | `bucketname`、`filterid`、`storagetype`                                                                                                                                                                       |
| [SES][55]             | タグキーは AWS でカスタム設定されます。                                                                                                                                                                               |
| [SNS][56]              | `topicname`                                                                                                                                                                                                   |
| [SQS][57]              | `queuename`                                                                                                                                                                                                   |
| [VPC][58]              | `nategatewayid`、`vpnid`、`tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][59]       | `directoryid`、`workspaceid`                                                                                                                                                                                  |

### サービスのチェック
{{< get-service-checks-from-git "amazon_web_services" >}}


## トラブルシューティング

AWS インテグレーションに関する問題解決は、[AWS インテグレーションのトラブルシューティングガイド][61]をご参照ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/getting_started/integrations/aws/
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html
[3]: https://docs.datadoghq.com/ja/integrations/#cat-aws
[4]: https://docs.datadoghq.com/ja/integrations/guide/aws-terraform-setup
[5]: https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html
[6]: https://aws.amazon.com/blogs/awsmarketplace/deploy-datadogs-aws-integration-accounts-aws-control-tower-account-factory-customization/
[7]: https://docs.datadoghq.com/ja/integrations/guide/aws-organizations-setup/
[8]: https://docs.datadoghq.com/ja/integrations/guide/aws-manual-setup/
[9]: https://docs.datadoghq.com/ja/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly
[10]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[11]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://docs.datadoghq.com/ja/integrations/guide/cloud-metric-delay/#aws
[13]: https://docs.datadoghq.com/ja/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[14]: https://docs.datadoghq.com/ja/account_management/billing/aws/
[15]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=roledelegation#setup
[16]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[17]: https://app.datadoghq.com/integrations/amazon-web-services
[18]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_DescribeAlarmHistory.html#API_DescribeAlarmHistory_RequestParameters
[19]: https://docs.datadoghq.com/ja/integrations/amazon_sns/#receive-sns-messages
[20]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[21]: https://docs.datadoghq.com/ja/integrations/amazon_api_gateway/
[22]: https://docs.datadoghq.com/ja/integrations/amazon_app_runner
[23]: https://docs.datadoghq.com/ja/integrations/amazon_auto_scaling/
[24]: https://docs.datadoghq.com/ja/integrations/amazon_billing/
[25]: https://docs.datadoghq.com/ja/integrations/amazon_cloudfront/
[26]: https://docs.datadoghq.com/ja/integrations/amazon_codebuild/
[27]: https://docs.datadoghq.com/ja/integrations/amazon_codedeploy/
[28]: https://docs.datadoghq.com/ja/integrations/amazon_directconnect/
[29]: https://docs.datadoghq.com/ja/integrations/amazon_dynamodb/
[30]: https://docs.datadoghq.com/ja/integrations/amazon_ebs/
[31]: https://docs.datadoghq.com/ja/integrations/amazon_ec2/
[32]: https://docs.datadoghq.com/ja/integrations/amazon_ecs/
[33]: https://docs.datadoghq.com/ja/integrations/amazon_efs/
[34]: https://docs.datadoghq.com/ja/integrations/amazon_elasticache/
[35]: https://docs.datadoghq.com/ja/integrations/amazon_elasticbeanstalk/
[36]: https://docs.datadoghq.com/ja/integrations/amazon_elb/
[37]: https://docs.datadoghq.com/ja/integrations/amazon_emr/
[38]: https://docs.datadoghq.com/ja/integrations/amazon_es/
[39]: https://docs.datadoghq.com/ja/integrations/amazon_firehose/
[40]: https://docs.datadoghq.com/ja/integrations/amazon_fsx/
[41]: https://docs.datadoghq.com/ja/integrations/amazon_health/
[42]: https://docs.datadoghq.com/ja/integrations/amazon_iot/
[43]: https://docs.datadoghq.com/ja/integrations/amazon_kinesis/
[44]: https://docs.datadoghq.com/ja/integrations/amazon_kms/
[45]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/
[46]: https://docs.datadoghq.com/ja/integrations/amazon_machine_learning/
[47]: https://docs.datadoghq.com/ja/integrations/amazon_mq/
[48]: https://docs.datadoghq.com/ja/integrations/amazon_ops_works/
[49]: https://docs.datadoghq.com/ja/integrations/amazon_polly/
[50]: https://docs.datadoghq.com/ja/integrations/amazon_rds/
[51]: https://docs.datadoghq.com/ja/integrations/amazon_rds_proxy/
[52]: https://docs.datadoghq.com/ja/integrations/amazon_redshift/
[53]: https://docs.datadoghq.com/ja/integrations/amazon_route53/
[54]: https://docs.datadoghq.com/ja/integrations/amazon_s3/
[55]: https://docs.datadoghq.com/ja/integrations/amazon_ses/
[56]: https://docs.datadoghq.com/ja/integrations/amazon_sns/
[57]: https://docs.datadoghq.com/ja/integrations/amazon_sqs/
[58]: https://docs.datadoghq.com/ja/integrations/amazon_vpc/
[59]: https://docs.datadoghq.com/ja/integrations/amazon_workspaces/
[60]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/service_checks.json
[61]: https://docs.datadoghq.com/ja/integrations/guide/aws-integration-troubleshooting/