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
dependencies: []
description: AWS サービスを Datadog と統合。
doc_link: https://docs.datadoghq.com/integrations/amazon_web_services/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
  tag: ブログ
  text: Datadog で AWS コントロールプレーン API の使用量メトリクスを監視する
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

- イベントストリームで AWS ステータスの自動更新を確認する
- Agent をインストールすることなく、EC2 ホストの CloudWatch メトリクスを取得する
- EC2 ホストに EC2 固有の情報をタグ付けする
- EC2 のスケジュール設定されたメンテナンス イベントをストリームに表示する
- その他のさまざまな AWS 製品から CloudWatch メトリクスとイベントを収集する
- イベントストリームで CloudWatch アラームを確認する

AWS インテグレーションをすぐに使い始めるには、[AWS スタートガイド][1]をご確認ください。

<div class="alert alert-warning">
Datadog の Amazon Web Services インテグレーションは、<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html">CloudWatch からすべてのメトリクス</a> を収集するように構築されています。Datadog では継続的にドキュメントを更新してすべてのサブインテグレーションを表示できるように努めていますが、新しいメトリクスやサービスがクラウドサービスから次々にリリースされるため、インテグレーション一覧が追い付かないことがあります。
</div>

| インテグレーション                             | 説明                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| [API Gateway][2]                        | API の作成、公開、管理、セキュリティ保護                                             |
| [App Runner][3]                       | ソースコードまたはコンテナイメージから高速、シンプル、かつ費用対効果の高いデプロイを可能にするサービス。         |
| [Appstream][4]                          | AWS 上のフルマネージド型のアプリケーションストリーミング                                             |
| [AppSync][5]                            | リアルタイムのデータ同期機能とオフラインのプログラミング機能を備えた GraphQL サービス |
| [Athena][6]                             | サーバーレスのインタラクティブなクエリサービス                                                   |
| [Autoscaling][7]                        | EC2 容量のスケーリング                                                                     |
| [Billing][8]                            | 請求と予算                                                                    |
| [CloudFront][9]                         | ローカルのコンテンツ配信ネットワーク                                                         |
| [Cloudhsm][10]                           | マネージド型のハードウェアセキュリティモジュール (HSM)                                                 |
| [CloudSearch][11]                        | ログファイルおよび AWS API 呼び出しへのアクセス                                                  |
| [CloudTrail][12]                        | ログファイルおよび AWS API 呼び出しへのアクセス                                                  |
| [CodeBuild][13]                         | フルマネージド型のビルドサービス                                                            |
| [CodeDeploy][14]                        | コードデプロイの自動化                                                              |
| [Cognito][15]                           | セキュリティ保護されたユーザーのサインアップとサインイン                                                        |
| [Connect][16]                           | セルフサービス型のクラウドベースコンタクトセンターサービス                                     |
| [Direct Connect][17]                    | AWS への専用ネットワーク接続                                                    |
| [DMS][18]                               | データベース移行サービス                                                             |
| [DocumentDB][19]                        | MongoDB 互換データベース                                                            |
| [Dynamo DB][20]                         | NoSQL データベース                                                                         |
| [EBS (Elastic Block Store)][21]         | 永続的なブロックレベルのストレージボリューム                                                 |
| [EC2 (Elastic Cloud Compute)][22]       | クラウドのサイズ変更可能なコンピュート容量                                                |
| [EC2 Spot][23]                          | 未使用の EC2 容量の活用                                                  |
| [ECS (Elastic Container Service)][24]   | Docker コンテナをサポートするコンテナ管理サービス                           |
| [EFS (Elastic File System)][25]         | 共有ファイルストレージ                                                                    |
| [EKS][26]                               | Kubernetes 用の Elastic Container Service                                               |
| [Elastic Transcoder][27]                | クラウドでのメディアおよびビデオコード変換                                               |
| [ElastiCache][28]                       | クラウドのインメモリキャッシュ                                                           |
| [Elastic Beanstalk][29]                 | Web アプリケーションとサービスのデプロイとスケーリングを行うサービス                        |
| [ELB (Elastic Load Balancing)][30]      | 着信アプリケーショントラフィックを複数の Amazon EC2 インスタンス間で分散          |
| [EMR (Elastic Map Reduce)][31]          | Hadoop を使用するデータ処理                                                           |
| [ES (Elasticsearch)][32]                | Elasticsearch クラスターのデプロイ、操作、スケーリング                                      |
| [Firehose][33]                          | ストリーミングデータの取得とロード                                                        |
| [FSx][34]                              | Windows File Server または Lustre にスケーラブルなストレージを提供するフルマネージド型のサービス。          |
| [Gamelift][35]                          | 専用ゲームサーバーホスティング                                                          |
| [Glue][36]                              | 分析のためのデータの抽出、変換、ロード                                        |
| [GuardDuty][37]                         | インテリジェントな脅威の検出                                                           |
| [Health][38]                            | AWS のリソース、サービス、アカウントの状態の可視化                |
| [Inspector][39]                         | 自動化されたセキュリティ評価                                                          |
| [IOT (Internet of Things)][40]          | クラウドサービスへの IOT デバイスの接続                                                |
| [Keyspaces][41]                        | Apache Cassandra 互換のマネージド型データベースサービス                                   |
| [Kinesis][42]                           | 大規模な分散データストリームをリアルタイムに処理するサービス                    |
| [KMS (Key Management Service)][43]      | 暗号キーの作成と制御                                                     |
| [Lambda][44]                            | サーバーレスコンピューティング                                                                   |
| [Lex][45]                               | 会話ボットの構築                                                                |
| [Machine Learning][46]                  | 機械学習モデルの作成                                                         |
| [MediaConnect][47]                      | ライブビデオの転送                                                               |
| [MediaConvert][48]                      | 放送およびマルチ画面配信のためのビデオ処理                                |
| [MediaPackage][49]                      | インターネット配信のためのビデオの準備と保護                               |
| [MediaTailor][50]                       | スケーラブルなサーバー側広告挿入                                                      |
| [MQ][51]                                | ActiveMQ 向けのマネージド型メッセージブローカー                                                    |
| [Managed Streaming for Kafka][52]       | Apache Kafka を使用してストリーミングデータを処理するアプリケーションの構築と実行             |
| [NAT Gateway][53]                       | プライベートサブネット内のインスタンスをインターネットまたは他の AWS サービスに接続可能  |
| [Neptune][54]                           | クラウド向けに構築された高速・高信頼性のグラフデータベース                                      |
| [Network Firewall][55]                 | VPC の境界でトラフィックを絞り込み                                               |
| [OpsWorks][56]                          | 構成管理                                                               |
| [Polly][57]                             | テキスト読み上げサービス                                                                    |
| [RDS (Relational Database Service)][58] | クラウドのリレーショナルデータベース                                                       |
| [Redshift][59]                          | データウェアハウスソリューション                                                                |
| [Rekognition][60]                       | アプリケーション向けのイメージおよびビデオ分析                                              |
| [Route 53][61]                          | DNS とトラフィック管理と可用性のモニタリング                                |
| [S3 (Simple Storage Service)][62]       | 高可用性・スケーラブルなクラウドストレージサービス                                    |
| [SageMaker][63]                         | 機械学習モデルおよびアルゴリズム                                                 |
| [SES (Simple Email Service)][64]        | 費用効率の高いアウトバウンド専用のメール送信サービス                                    |
| [SNS (Simple Notification System)][65]  | アラートと通知                                                               |
| [SQS (Simple Queue Service)][66]        | メッセージキューサービス                                                                |
| [Storage Gateway][67]                   | ハイブリッドクラウドストレージ                                                                   |
| [SWF (Simple Workflow Service)][68]     | クラウドワークフロー管理                                                              |
| [VPC (Virtual Private Cloud)][69]       | 仮想ネットワーク内での AWS リソースの起動                                            |
| [Web Application Firewall (WAF)][70]    | 一般的な Web エクスプロイトからの Web アプリケーションの保護                                      |
| [Workspaces][71]                        | セキュアなデスクトップコンピューティングサービス                                                       |
| [X-Ray][72]                             | 分散アプリケーションのトレーシング                                                   |

## セットアップ

{{< site-region region="gov" >}}
<div class="alert alert-warning">AWS のロール委任は、Datadog for Government site でサポートされていません。<a href="?tab=accesskeysgovcloudorchinaonly#setup">アクセスキー</a>を使用する必要があります。</div>
{{< /site-region >}}

以下のいずれかの方法を使用して AWS アカウントを Datadog に統合し、メトリクス、イベント、タグ、ログを収集します。

### 自動

  * **CloudFormation (手早く始めるには最適)**  
    CloudFormation で AWS インテグレーションを設定するには、[AWS スタートガイド][1]を参照してください。

  * **Terraform**  
    AWS と Terraform のインテグレーションを設定するには、[AWS と Terraform のインテグレーション][73]を参照してください。

### 手動

   * **ロールの委任**  
     AWS インテグレーションをロールの委任で手動設定する場合は、[手動設定ガイド][74]を参照してください。

   * **アクセスキー (GovCloud または中国のみ)**  
     アクセスキーによる AWS インテグレーションを設定する場合は、[手動設定ガイド][75]を参照してください。

{{% aws-permissions %}}

## ログの収集

AWSサービスログを Datadog に送信する方法はいくつかあります。

- [Kinesis Firehose destination][76]: Kinesis Firehose 配信ストリームで Datadog の宛先を使用して、ログを Datadog に転送します。CloudWatch から非常に大量のログを送信する際は、このアプローチを使用することが推奨されます。
- [Forwarder Lambda 関数][77]: S3 バケットまたは CloudWatch ロググループにサブスクライブする Datadog Forwarder Lambda 関数をデプロイし、ログを Datadog に転送します。Lambda 関数からログを介して非同期でトレース、拡張カスタムメトリクス、またはカスタムメトリクスを送信するには、このアプローチを使用する**必要があります**。また、S3 またはデータを Kinesis に直接ストリーミングできないその他のリソースからログを送信する場合、Datadog ではこのアプローチを使用することをお勧めしています。

## メトリクスの収集

メトリクスを Datadog に送信する方法は 2 つあります。

- [メトリクスのポーリング][78]: AWS インテグレーションで利用できる API ポーリングです。CloudWatch API をメトリクス別にクロールしてデータを取得し、Datadog に送信します。新しいメトリクスの取得は平均 10 分毎に行われます。
- [Kinesis Firehose でのメトリクスストリーム][79]: Amazon CloudWatch Metric Streams と Amazon Kinesis Data Firehose を使用してメトリクスを確認します。**注**: このメソッドには 2 - 3 分のレイテンシーがあり、別途設定が必要となります。

## リソース収集

一部の Datadog 製品は、AWS リソース (S3 バケット、RDS スナップショット、CloudFront ディストリビューションなど) の構成方法に関する情報を活用します。Datadog は、AWS アカウントに対して読み取り専用の API 呼び出しを行うことにより、この情報を収集します。

### クラウドセキュリティポスチャ管理

#### セットアップ

お使いの AWS アカウントで AWS インテグレーションの設定を行っていない場合は、上記の[設定プロセス][80]を完了させます。リソース収集が有効化されていることを適宜ご確認ください。

**注:** この機能を使用するには、AWS インテグレーションに**ロールの委任**を設定する必要があります。

既存の AWS インテグレーションに Cloud Security Posture Management を追加するには、以下の手順でリソース収集を有効にしてください。

1. 自動**または**手動手順で Datadog IAM ロールに必要な権限を提供します。

   **自動** - CloudFormation テンプレートを更新します。
   a. CloudFormation コンソールで Datadog インテグレーションのインストールに使用した主要なスタックを探し、`Update` を選択します。
   b. `Replace current template` を選択します。
   c. `Amazon S3 URL` を選択して `https://datadog-cloudformation-template.s3.amazonaws.com/aws/main.yaml` を入力し、`Next` をクリックします。
   d. `CloudSecurityPostureManagementPermissions` を `true` に設定し、`Next` をクリックします。`Review` ページに到達するまでその他の既存のパラメーターは変更しないでください。ここで変更点をプレビューおよび確認します。
   e. 下部にある 2 つの確認ボックスをオンにし、`Update stack` をクリックします。

   **手動** - [AWS が管理する `SecurityAudit` ポリシー][81]を Datadog AWS IAM ロールにアタッチします。このポリシーは [AWS コンソール][81]にあります。

2. [Datadog AWS インテグレーションタイル][82]で、以下の手順で設定を完了させます。または、[Update an AWS Integration][74] API エンドポイントを利用することも可能です。

   1. リソース収集を有効化したい AWS アカウントをクリックします。
   2. そのアカウントの **Resource collection** セクションに移動し、`Expanded collection required for Cloud Security Posture Management` チェックボックスをオンにします。
   3. タイルの下部で `Update Configuration` をクリックします。

## アラームの収集

AWS CloudWatch アラームを Datadog イベントストリームに送信する方法は 2 つあります。

- アラームポーリング: アラームポーリングは AWS インテグレーションですぐに使用でき、[DescribeAlarmHistory][83] API を介してメトリクスアラームをフェッチします。この方法に従うと、イベントソース `Amazon Web Services` の下にアラームが分類されます。**注**: クローラーは複合アラームを収集しません。
- SNS トピック: アラームを SNS トピックにサブスクライブしてから、SNS メッセージを Datadog に転送することで、イベントストリーム内のすべての AWS CloudWatch アラームを確認できます。Datadog でイベントとして SNS メッセージを受信する方法については、[SNS メッセージの受信][84]を参照してください。この方法に従うと、イベントソース `Amazon SNS` の下にアラームが分類されます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_web_services" >}}


### イベント

AWS からのイベントは、AWS サービス単位で収集されます。収集されるイベントの詳細については、[お使いの AWS サービスのドキュメント][86]を参照してください。

### タグ

AWS インテグレーションにより以下のタグが収集されます。**注**: 一部のタグは、特定のメトリクスにのみ表示されます。

| インテグレーション            | Datadog タグキー                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| すべて                    | `region`                                                                                                                                                                                                      |
| [API Gateway][2]      | `apiid`、apiname`、`method`、`resource`、`stage`                                                                                                                                                             |
| [App Runner][3]      | `instance`、`serviceid`、`servicename`                                                                                                                                                                       |
| [Auto Scaling][7]    | `autoscalinggroupname`、`autoscaling_group`                                                                                                                                                                   |
| [Billing][8]          | `account_id`、`budget_name`、`budget_type`、`currency`、`servicename`、`time_unit`                                                                                                                            |
| [CloudFront][9]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][13]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][14]       | `application`、`creator`、`deployment_config`、`deployment_group`、`deployment_option`、`deployment_type`、`status`                                                                                           |
| [DirectConnect][17]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][20]         | `globalsecondaryindexname`、`operation`、`streamlabel`、`tablename`                                                                                                                                           |
| [EBS][21]              | `volumeid`、`volume-name`、`volume-type`                                                                                                                                                                      |
| [EC2][22]              | `autoscaling_group`、`availability-zone`、`image`、`instance-id`、`instance-type`、`kernel`、`name`、`security_group_name`                                                                                    |
| [ECS][24]              | `clustername`、`servicename`、`instance_id`                                                                                                                                                                   |
| [EFS][26]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][28]      | `cachenodeid`、`cache_node_type`、`cacheclusterid`、`cluster_name`、`engine`、`engine_version`、`preferred_availability-zone`、`replication_group`                                                             |
| [ElasticBeanstalk][29] | `environmentname`、`enviromentid`                                                                                                                                                                             |
| [ELB][30]              | `availability-zone`、`hostname`、`loadbalancername`、`name`、`targetgroup`                                                                                                                                    |
| [EMR][31]              | `cluster_name`、`jobflowid`                                                                                                                                                                                   |
| [ES][32]               | `dedicated_master_enabled`、`ebs_enabled`、`elasticsearch_version`、`instance_type`、`zone_awareness_enabled`                                                                                                 |
| [Firehose][33]         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx][34]             | `filesystemid`、`filesystemtype`                                                                                                                                                                               |
| [Health][38]           | `event_category`、`status`、`service`                                                                                                                                                                         |
| [IoT][40]              | `actiontype`、`protocol`、`rulename`                                                                                                                                                                          |
| [Kinesis][42]          | `streamname`、`name`、`state`                                                                                                                                                                                 |
| [KMS][43]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][44]           | `functionname`、`resource`、`executedversion`、`memorysize`、`runtime`                                                                                                                                        |
| [Machine Learning][46] | `mlmodelid`、`requestmode`                                                                                                                                                                                    |
| [MQ][51]               | `broker`、`queue`、`topic`                                                                                                                                                                                    |
| [OpsWorks][56]         | `stackid`、`layerid`、`instanceid`                                                                                                                                                                            |
| [Polly][57]            | `operation`                                                                                                                                                                                                   |
| [RDS][58]              | `auto_minor_version_upgrade`、`dbinstanceclass`、`dbclusteridentifier`、`dbinstanceidentifier`、`dbname`、`engine`、`engineversion`、`hostname`、`name`、`publicly_accessible`、`secondary_availability-zone` |
| [RDS Proxy][87]       | `proxyname`、`target`、`targetgroup`、`targetrole`                                                                                                                                                                                                  |
| [Redshift][59]       | `clusteridentifier`、`latency`、`nodeid`、`service_class`、`stage`、`wlmid`                                                                                                                                   |
| [Route 53][61]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][62]             | `bucketname`、`filterid`、`storagetype`                                                                                                                                                                       |
| [SES][64]             | タグキーは AWS でカスタム設定されます。                                                                                                                                                                               |
| [SNS][65]              | `topicname`                                                                                                                                                                                                   |
| [SQS][66]              | `queuename`                                                                                                                                                                                                   |
| [VPC][69]              | `nategatewayid`、`vpnid`、`tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][71]       | `directoryid`、`workspaceid`                                                                                                                                                                                  |

### サービスのチェック
{{< get-service-checks-from-git "amazon_web_services" >}}


## トラブルシューティング

AWS インテグレーションに関する問題解決は、[AWS インテグレーションのトラブルシューティングガイド][89]をご参照ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/getting_started/integrations/aws/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_api_gateway/
[3]: https://docs.datadoghq.com/ja/integrations/amazon_app_runner
[4]: https://docs.datadoghq.com/ja/integrations/amazon_appstream/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_appsync/
[6]: https://docs.datadoghq.com/ja/integrations/amazon_athena/
[7]: https://docs.datadoghq.com/ja/integrations/amazon_auto_scaling/
[8]: https://docs.datadoghq.com/ja/integrations/amazon_billing/
[9]: https://docs.datadoghq.com/ja/integrations/amazon_cloudfront/
[10]: https://docs.datadoghq.com/ja/integrations/amazon_cloudhsm/
[11]: https://docs.datadoghq.com/ja/integrations/amazon_cloudsearch/
[12]: https://docs.datadoghq.com/ja/integrations/amazon_cloudtrail/
[13]: https://docs.datadoghq.com/ja/integrations/amazon_codebuild/
[14]: https://docs.datadoghq.com/ja/integrations/amazon_codedeploy/
[15]: https://docs.datadoghq.com/ja/integrations/amazon_cognito/
[16]: https://docs.datadoghq.com/ja/integrations/amazon_connect/
[17]: https://docs.datadoghq.com/ja/integrations/amazon_directconnect/
[18]: https://docs.datadoghq.com/ja/integrations/amazon_dms/
[19]: https://docs.datadoghq.com/ja/integrations/amazon_documentdb/
[20]: https://docs.datadoghq.com/ja/integrations/amazon_dynamodb/
[21]: https://docs.datadoghq.com/ja/integrations/amazon_ebs/
[22]: https://docs.datadoghq.com/ja/integrations/amazon_ec2/
[23]: https://docs.datadoghq.com/ja/integrations/amazon_ec2_spot/
[24]: https://docs.datadoghq.com/ja/integrations/amazon_ecs/
[25]: https://docs.datadoghq.com/ja/integrations/amazon_efs/
[26]: https://docs.datadoghq.com/ja/integrations/amazon_eks/
[27]: https://docs.datadoghq.com/ja/integrations/amazon_elastic_transcoder/
[28]: https://docs.datadoghq.com/ja/integrations/amazon_elasticache/
[29]: https://docs.datadoghq.com/ja/integrations/amazon_elasticbeanstalk/
[30]: https://docs.datadoghq.com/ja/integrations/amazon_elb/
[31]: https://docs.datadoghq.com/ja/integrations/amazon_emr/
[32]: https://docs.datadoghq.com/ja/integrations/amazon_es/
[33]: https://docs.datadoghq.com/ja/integrations/amazon_firehose/
[34]: https://docs.datadoghq.com/ja/integrations/amazon_fsx/
[35]: https://docs.datadoghq.com/ja/integrations/amazon_gamelift/
[36]: https://docs.datadoghq.com/ja/integrations/amazon_glue/
[37]: https://docs.datadoghq.com/ja/integrations/amazon_guardduty/
[38]: https://docs.datadoghq.com/ja/integrations/amazon_health/
[39]: https://docs.datadoghq.com/ja/integrations/amazon_inspector/
[40]: https://docs.datadoghq.com/ja/integrations/amazon_iot/
[41]: https://docs.datadoghq.com/ja/integrations/amazon_keyspaces/
[42]: https://docs.datadoghq.com/ja/integrations/amazon_kinesis/
[43]: https://docs.datadoghq.com/ja/integrations/amazon_kms/
[44]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/
[45]: https://docs.datadoghq.com/ja/integrations/amazon_lex/
[46]: https://docs.datadoghq.com/ja/integrations/amazon_machine_learning/
[47]: https://docs.datadoghq.com/ja/integrations/amazon_mediaconnect/
[48]: https://docs.datadoghq.com/ja/integrations/amazon_mediaconvert/
[49]: https://docs.datadoghq.com/ja/integrations/amazon_mediapackage/
[50]: https://docs.datadoghq.com/ja/integrations/amazon_mediatailor/
[51]: https://docs.datadoghq.com/ja/integrations/amazon_mq/
[52]: https://docs.datadoghq.com/ja/integrations/amazon_msk/
[53]: https://docs.datadoghq.com/ja/integrations/amazon_nat_gateway/
[54]: https://docs.datadoghq.com/ja/integrations/amazon_neptune/
[55]: https://docs.datadoghq.com/ja/integrations/amazon_network_firewall/
[56]: https://docs.datadoghq.com/ja/integrations/amazon_ops_works/
[57]: https://docs.datadoghq.com/ja/integrations/amazon_polly/
[58]: https://docs.datadoghq.com/ja/integrations/amazon_rds/
[59]: https://docs.datadoghq.com/ja/integrations/amazon_redshift/
[60]: https://docs.datadoghq.com/ja/integrations/amazon_rekognition/
[61]: https://docs.datadoghq.com/ja/integrations/amazon_route53/
[62]: https://docs.datadoghq.com/ja/integrations/amazon_s3/
[63]: https://docs.datadoghq.com/ja/integrations/amazon_sagemaker/
[64]: https://docs.datadoghq.com/ja/integrations/amazon_ses/
[65]: https://docs.datadoghq.com/ja/integrations/amazon_sns/
[66]: https://docs.datadoghq.com/ja/integrations/amazon_sqs/
[67]: https://docs.datadoghq.com/ja/integrations/amazon_storage_gateway/
[68]: https://docs.datadoghq.com/ja/integrations/amazon_swf/
[69]: https://docs.datadoghq.com/ja/integrations/amazon_vpc/
[70]: https://docs.datadoghq.com/ja/integrations/amazon_waf/
[71]: https://docs.datadoghq.com/ja/integrations/amazon_workspaces/
[72]: https://docs.datadoghq.com/ja/integrations/amazon_xray/
[73]: https://docs.datadoghq.com/ja/integrations/guide/aws-terraform-setup
[74]: https://docs.datadoghq.com/ja/integrations/guide/aws-manual-setup/
[75]: https://docs.datadoghq.com/ja/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly
[76]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[77]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[78]: /ja/integrations/faq/cloud-metric-delay/#aws
[79]: /ja/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?
[80]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=roledelegation#setup
[81]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[82]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[83]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_DescribeAlarmHistory.html#API_DescribeAlarmHistory_RequestParameters
[84]: https://docs.datadoghq.com/ja/integrations/amazon_sns/#receive-sns-messages
[85]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[86]: https://docs.datadoghq.com/ja/integrations/#cat-aws
[87]: https://docs.datadoghq.com/ja/integrations/amazon_rds_proxy/
[88]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/service_checks.json
[89]: https://docs.datadoghq.com/ja/integrations/guide/aws-integration-troubleshooting/