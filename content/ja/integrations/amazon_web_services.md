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
- event management
custom_kind: インテグレーション
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
- link: https://www.datadoghq.com/blog/iam-least-privilege/
  tag: ブログ
  text: 最小権限の AWS IAM ポリシー作成のベストプラクティス
git_integration_title: amazon_web_services
has_logo: true
integration_id: amazon-web-services
integration_title: AWS
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_web_services
public_title: Datadog-AWS インテグレーション
short_description: AWS サービスを Datadog と統合。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
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

   * **アクセスキー (GovCloud または中国\*のみ)**  
     アクセスキーを使用して AWS インテグレーションをセットアップするには、[手動セットアップガイド][9]をご覧ください。

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

### Cloud Security Management

#### セットアップ

お使いの AWS アカウントで AWS インテグレーションの設定を行っていない場合は、上記の[設定プロセス][16]を完了させます。Cloud Security Management が有効化されていることを適宜ご確認ください。

**注:** この機能を使用するには、AWS インテグレーションに**ロールの委任**を設定する必要があります。

既存の AWS インテグレーションに Cloud Security Management を追加するには、以下の手順でリソース収集を有効にしてください。

1. Datadog の AWS IAM ロールに、AWS が管理している `SecurityAudit` ポリシーをアタッチして、Datadog の IAM ロールに必要な権限を付与します。このポリシーは [AWS コンソール][17]にあります。

2. [Datadog AWS インテグレーションページ][18]で、以下の手順で設定を完了させます。または、[Update an AWS Integration][8] API エンドポイントを利用することも可能です。

   1. リソース収集を有効化したい AWS アカウントを選択します。
   2. そのアカウントの **Resource collection** タブに移動し、`Cloud Security Posture Management Collection` を有効にします。
   3. ページの右下にある `Save` をクリックします。

## アラームの収集

AWS CloudWatch アラームを Datadog イベントエクスプローラーに送信する方法は 2 つあります。

- アラームポーリング: アラームポーリングは AWS インテグレーションですぐに使用でき、[DescribeAlarmHistory][19] API を介してメトリクスアラームをフェッチします。この方法に従うと、イベントソース `Amazon Web Services` の下にアラームが分類されます。**注**: クローラーは複合アラームを収集しません。
- SNS トピック: アラームを SNS トピックにサブスクライブしてから、SNS メッセージを Datadog に転送することで、イベントエクスプローラー内のすべての AWS CloudWatch アラームを確認できます。Datadog でイベントとして SNS メッセージを受信する方法については、[SNS メッセージの受信][20]を参照してください。この方法に従うと、イベントソース `Amazon SNS` の下にアラームが分類されます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon-web-services" >}}


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

### サービスチェック
{{< get-service-checks-from-git "amazon-web-services" >}}


## トラブルシューティング

AWS インテグレーションに関する問題解決は、[AWS インテグレーションのトラブルシューティングガイド][63]をご参照ください。

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
[21]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
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
[62]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/service_checks.json
[63]: https://docs.datadoghq.com/ja/integrations/guide/aws-integration-troubleshooting/