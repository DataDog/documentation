---
title: Getting Started with AWS
further_reading:
    - link: "https://www.datadoghq.com/blog/aws-monitoring/"
      tag: Blog
      text: Key metrics for AWS monitoring
    - link: "https://www.datadoghq.com/blog/aws-1-click-integration/"
      tag: Blog
      text: Introducing our AWS 1-click integration
    - link: "https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/"
      tag: Blog
      text: Deploying and configuring Datadog with CloudFormation
    - link: "https://www.datadoghq.com/blog/monitoring-as-code-with-datadog-and-cloudformation/"
      tag: Blog
      text: Implement monitoring as code with Datadog and CloudFormation Registry
    - link: "https://www.datadoghq.com/blog/datadog-serverless-view/"
      tag: Blog
      text: Monitor your entire serverless stack in the Serverless view
    - link: "https://www.datadoghq.com/blog/monitor-aws-fargate/"
      tag: Blog
      text: Monitor ECS applications on AWS Fargate with Datadog
    - link: "https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/"
      tag: Blog
      text: Monitor Amazon ECS Anywhere with Datadog
    - link: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation
      tag: Documentation
      text: AWS CloudWatch Metric Streams with Amazon Data Firehose
    - link: "https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/"
      tag: Blog
      text: Monitor your Graviton3-powered EC2 instances with Datadog
---

## 概要

このガイドでは、Datadog の CloudFormation テンプレートを使用して、Amazon Web Services (AWS) アカウントを Datadog と統合するプロセスの概要を説明します。

簡単に言うと、これには Datadog の AWS アカウントがデータの収集やプッシュのために AWS アカウントに API コールを行うことを可能にする IAM ロールと関連するポリシーの作成が含まれます。また、このテンプレートは、Datadog にログを送信するための [Datadog Forwarder][1] Lambda 関数をデプロイします。CloudFormation テンプレートを使用することで、このデータを Datadog アカウントに送信するために必要なすべてのツールが提供されます。Datadog は、最新の機能を提供するために CloudFormation テンプレートを保守しています。

最初の接続が確立された後、AWS 環境に関連する個々の AWS サービスインテグレーションを有効にすることができます。ワンクリックで、Datadog は AWS アカウントに必要なリソースをプロビジョニングし、使用するサービスのメトリクスとイベントのクエリを開始します。人気のある AWS サービスをご使用の場合、Datadog はすぐに使えるダッシュボードを用意しています。これは即座に視覚化を提供し、カスタマイズも可能です。このガイドでは、インテグレーションの設定と Amazon Linux EC2 インスタンスへの Datadog Agent のインストールをデモし、インテグレーションの機能の概要を説明します。利用可能なサブインテグレーションについては、[個々の AWS サービスに対するインテグレーションを有効にする](#enable-integrations-for-individual-aws-service)セクションを参照してください。

このプロセスは必要な数の AWS アカウントに対して繰り返すことができますし、[API][3]、[AWS CLI][4]、[Terraform][5] を使って一度に複数のアカウントを設定することも可能です。詳しくは、[Datadog-Amazon CloudFormation ガイド][6]をご参照ください。

## 前提条件

はじめに、以下の前提条件を確認してください。

1. [AWS][7] アカウント。AWS ユーザーは、CloudFormation テンプレートを正常に実行するために、以下の IAM 権限が必要です。

    * cloudformation:CreateStack
    * cloudformation:CreateUploadBucket
    * cloudformation:DeleteStack
    * cloudformation:DescribeStacks
    * cloudformation:DescribeStackEvents
    * cloudformation:GetStackPolicy
    * cloudformation:GetTemplateSummary
    * cloudformation:ListStacks
    * cloudformation:ListStackResources
    * ec2:DescribeSecurityGroups
    * ec2:DescribeSubnets
    * ec2:DescribeVpcs
    * iam:AttachRolePolicy
    * iam:CreatePolicy
    * iam:CreateRole
    * iam:DeleteRole
    * iam:DeleteRolePolicy
    * iam:DetachRolePolicy
    * iam:GetRole
    * iam:GetRolePolicy
    * iam:PassRole
    * iam:PutRolePolicy
    * iam:TagRole
    * iam:UpdateAssumeRolePolicy
    * kms:Decrypt
    * lambda:AddPermission
    * lambda:CreateFunction
    * lambda:DeleteFunction
    * lambda:GetCodeSigningConfig
    * lambda:GetFunction
    * lambda:GetFunctionCodeSigningConfig
    * lambda:GetLayerVersion
    * lambda:InvokeFunction
    * lambda:PutFunctionConcurrency
    * lambda:RemovePermission
    * lambda:TagResource
    * logs:CreateLogGroup
    * logs:DeleteLogGroup
    * logs:DescribeLogGroups
    * logs:PutRetentionPolicy
    * oam:ListSinks
    * oam:ListAttachedLinks
    * s3:CreateBucket
    * s3:DeleteBucket
    * s3:DeleteBucketPolicy
    * s3:GetEncryptionConfiguration
    * s3:GetObject
    * s3:GetObjectVersion
    * s3:PutBucketPolicy
    * s3:PutBucketPublicAccessBlock
    * s3:PutEncryptionConfiguration
    * s3:PutLifecycleConfiguration
    * secretsmanager:CreateSecret
    * secretsmanager:DeleteSecret
    * secretsmanager:GetSecretValue
    * secretsmanager:PutSecretValue
    * serverlessrepo:CreateCloudFormationTemplate

## セットアップ

2. Datadog の [AWS インテグレーション構成ページ][8]に移動し、**Add AWS Account** をクリックします。

3. **Automatically using CloudFormation** のオプションで、インテグレーションの設定を行います。
    a. インテグレーションする AWS リージョンを選択します。 
    b. Datadog [API キー][9]を追加します。 
    c. オプションで、[Datadog Forwarder Lambda][1] でログなどを Datadog に送ります。 
    d. 必要に応じて、[Cloud Security Management Misconfigurations][54] を有効にして、クラウド環境、ホスト、コンテナをスキャンして、誤構成やセキュリティリスクを検出します。

5. **Launch CloudFormation Template** をクリックします。これで AWS コンソールが開き、CloudFormation スタックがロードされます。すべてのパラメーターは、事前の Datadog フォームでの選択に基づいて入力されているため、必要な場合以外は編集する必要はありません。
**注:** `DatadogAppKey` パラメーターは、CloudFormation スタックが Datadog に API コールを行い、この AWS アカウントに対して Datadog の構成を追加・編集できるようにするものです。キーは自動的に生成され、Datadog アカウントに結びつけられます。

6. AWS から必要な項目にチェックを入れ、**Create stack** をクリックします。これにより、Datadog スタックと 3 つのネストされたスタックの作成プロセスが開始されます。これには数分かかる場合があります。続行する前に、スタックが正常に作成されたことを確認します。

7. スタック作成後、Datadog の AWS インテグレーションタイルに戻り、**Ready!** をクリックします。

8. データ収集が開始されるまで最大 10 分待ち、すぐに使える [AWS 概要ダッシュボード][12]を表示し、AWS サービスやインフラストラクチャーから送信されるメトリクスを確認します。
{{< img src="getting_started/integrations/aws-dashboard.png" alt="Datadog アカウントの AWS 概要ダッシュボード。左側には AWS のロゴと、'No matching entries found' (該当するエントリーはありません) を示す AWS イベントグラフが表示されます。中央には、数値データが表示された EBS ボリューム関連のグラフと、一貫したデータを示すヒートマップが表示されています。右側には、数値データが表示された ELB 関連のグラフと、3 つのソースからのスパイク状のデータを示す時系列グラフが表示されています。">}}

## 個々の AWS サービスに対するインテグレーションを有効にする

利用可能なサブインテグレーションの全リストは、[Integrations ページ][13]をご覧ください。これらのインテグレーションの多くは、Datadog が AWS アカウントから入ってくるデータを認識する際に、デフォルトでインストールされます。

## ログを送信

AWSサービスログを Datadog に送信する方法はいくつかあります。

- [Amazon Data Firehose destination][10]: Amazon Data Firehose 配信ストリームで Datadog の宛先を使用して、ログを Datadog に転送します。CloudWatch から非常に大量のログを送信する際は、このアプローチを使用することが推奨されます。
- [Forwarder Lambda 関数][11]: S3 バケットまたは CloudWatch ロググループにサブスクライブする Datadog Forwarder Lambda 関数をデプロイし、ログを Datadog に転送します。Lambda 関数からログを介して非同期でトレース、拡張カスタムメトリクス、またはカスタムメトリクスを送信するには、このアプローチを使用する**必要があります**。また、S3 またはデータを Kinesis に直接ストリーミングできないその他のリソースからログを送信する場合、Datadog ではこのアプローチを使用することをお勧めしています。

最も利用されている AWS サービスのログを流すには、[AWS サービスのログを有効にする][14]のセクションを読んでください。

### 検証

ログを有効にしたら、[ログエクスプローラー][15] でファセット・パネルから `source` または `service` ファセットを使用して、ログを見つけます (S3 からの以下の例のように)。
{{< img src="getting_started/integrations/logs-explorer.png" alt="Datadog アカウントのログエクスプローラーページ。左側には、ソースとサービスのファセットが表示され、両方とも 's3' でチェックされています。右側には、いくつかのログエントリーがリスト形式で表示されています。">}}

## Datadog のプラットフォームをさらに活用する

### EC2 上の Datadog Agent でより深く視覚化する

Datadog AWS インテグレーションは、デフォルトでは CloudWatch API をクロールして AWS が提供するメトリクスを取得しますが、[Datadog Agent][16] を使用すると EC2 インスタンスをさらに深く視覚化することが可能です。Agent はメトリクスやイベントをレポートする軽量なデーモンで、ログやトレースを構成することもできます。Datadog アプリケーションの [Agent Installation][17] セクションには、さまざまな OS に Agent をインストールするための手順が記載されています。多くのオペレーティングシステム (例えば、Amazon Linux) には、インスタンスターミナルから実行して Agent をインストールできるワンステップインストールコマンドがあります。
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="Datadog の 'Integrations' タブの 'Agent' セクション。左側に Datadog Agent の対応 OS の一覧が表示されています。この中から 'Amazon Linux' がハイライトされています。右側には、'Use our easy one-step install' (簡単なワンステップインストールを使用) と表示されています。この下に Agent をインストールするためのコマンドが表示されますが、DD_API_KEY の部分が難読化されています。">}}

Agent がインストールされると、[インフラストラクチャーリスト][18]内に骨のアイコンとしてグラフィカルに表示されます。
{{< img src="getting_started/integrations/infrastructure-list.png" alt="インフラストラクチャーリストには、2 つのホストがリスト形式で表示されています。どちらのホストも、AWS インテグレーションのための AWS アイコンと、AWS インテグレーションに関連していることを示す青いボックスで示された 'aws' が表示されています。一方のホストには、犬の骨のようなアイコンと、'ntp' と 'system' の青いボックスも表示されています。">}}

上のスクリーンショットは、Datadog Agent が [System][19] と [NTP][20] のチェックからデータを報告しているホストを示しています。System チェックは、CPU、メモリ、ファイルシステム、I/O に関するメトリクスを提供し、ホストに関するさらなる洞察を提供します。環境とユースケースに合わせて追加の[インテグレーション][21]を有効にするか、さらに [DogStatsD][22] を使用してカスタムメトリクスを Datadog に直接送信することが可能です。

この方法の利点については、[クラウドインスタンスに Datadog Agent をインストールすべき理由に関する FAQ][23] を参照してください。

### Amazon Container Services で Datadog Agent を使用する

コンテナ環境では、インスタンスの管理や [Fargate][24] を活用したサーバーレス環境でも、Datadog Agent を利用することができます。

#### EC2 起動タイプの ECS

[Amazon ECS のドキュメント][25]を使用して、ECS クラスターの EC2 インスタンスで [Datadog Docker Agent][26] を実行します。[Amazon ECS Data Collection のドキュメント][27]で、Datadog アカウントに報告されるメトリクスとイベントを確認します。

#### Fargate 起動タイプの ECS

[Amazon ECS on AWS Fargate のドキュメント][28]を使用して、アプリケーションと同じタスク定義でコンテナとして Agent を実行します。**注**: Fargate インテグレーションをフルに活用するには、Datadog Agent バージョン 6.1.1 以降が必要です。

#### AWS Batch with Fargate orchestration type

Use the [Amazon ECS on AWS Fargate for AWS Batch documentation][58] to run the Agent as a container in the same AWS Batch job definition as your application. **Note**: Datadog Agent version 6.1.1 or higher is needed to take full advantage of the Fargate integration.

#### EKS

[Kubernetes Distributions のドキュメント][29]にあるように、Amazon Elastic Kubernetes Service (EKS) の場合は特に構成は必要ありません。EKS クラスターに Agent をデプロイするには、[Kubernetes 専用ドキュメント][30]を使用します。

#### EKS と Fargate

Fargate ポッドは AWS によって管理されているため、CPU やメモリなどのホストベースのシステムチェックは除外されます。AWS Fargate ポッドからデータを収集するには、[Amazon EKS on AWS Fargate のドキュメント][31]を使用して、カスタムロールベースのアクセス制御 (RBAC) でアプリケーションポッドのサイドカーとして Agent を実行するようにします。**注**: Datadog Agent バージョン 7.17 以降が必要です。

#### EKS Anywhere

オンプレミスの Kubernetes クラスターには、[EKS Anywhere のドキュメント][32]を使用します。

### Datadog のリソースを追加で作成する
Datadog の UI や [API][33] を利用するほか、[CloudFormation Registry][35] で多くの [Datadog リソース][34]を作成することが可能です。視覚化とトラブルシューティングには、[ダッシュボード][36]を使用して主要データを表示し、[関数][37]を適用し、[メトリクス相関][38]を見つけることができます。

アカウントに不要な動作や予期せぬ動作があった場合に通知を受けるには、[モニター][39]を作成します。モニターは、アカウントに報告されたデータを一貫して評価し、正しい情報が正しいチームメンバーに届くように[通知][40]を送信します。チームに通知するすべての方法については、[通知インテグレーションのリスト][41]を参照してください。

## 関連製品を見る

### サーバーレス

サーバーレスアプリケーションを実行する AWS Lambda 関数のメトリクス、トレース、ログを Datadog で一元管理することができます。アプリケーションのインスツルメンテーション、[サーバーレスライブラリとインテグレーション][43] のインストール、[サーバーレスアプリケーションによる分散型トレーシング][44]の実装 、または[サーバーレストラブルシューティング][45]についての説明は[サーバーレス][42]を確認してください。

### APM
さらに深く掘り下げ、アプリケーションと AWS サービスからより多くのデータを収集するには、[AWS X-Ray][46] インテグレーション、または [APM][47] を使用して Datadog Agent を持つホストから分散トレースを収集できるようにしてください。その後、[APM のドキュメント][48]を読んで、このデータを使用してアプリケーションのパフォーマンスに対する洞察を得る方法について理解を深めてください。

さらに、APM パフォーマンスとインフラストラクチャーメトリクスのアルゴリズム機能である [Watchdog][49] を使用すると、アプリケーションの潜在的な問題を自動的に検出し、通知されるようにすることができます。

### セキュリティ

#### Cloud SIEM

[Cloud SIEM の概要][50]を参照して、すぐに使える[ログ検出ルール][51]に照らし合わせてログを評価します。これらのルールはカスタマイズ可能で、脅威が検出されると[セキュリティシグナルエクスプローラー][52]でアクセス可能なセキュリティシグナルが生成されます。適切なチームに通知するために、[通知ルール][53]を使用して複数のルールにまたがる通知設定を構成することができます。

#### Cloud Security Management Misconfigurations

[CSM Misconfigurations の設定][54]ガイドを使用して、クラウド環境における誤構成の検出と評価について学びます。リソース構成データは、すぐに利用可能な[クラウド][55]および[インフラストラクチャー][56]のコンプライアンスルールに対して評価され、攻撃者のテクニックと潜在的な誤構成にフラグを立て、迅速な対応と修復を可能にします。

### トラブルシューティング

`Datadog is not authorized to perform sts:AssumeRole` というエラーが発生した場合は、専用の[トラブルシューティングページ][2]を参照してください。その他の問題については、[AWS インテグレーショントラブルシューティングガイド][57]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/guide/forwarder/
[2]: /integrations/guide/error-datadog-not-authorized-sts-assume-role/
[3]: /api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[6]: /integrations/guide/amazon_cloudformation/
[7]: https://aws.amazon.com/getting-started/?nc1=f_cc
[8]: https://app.datadoghq.com/integrations/amazon-web-services
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[11]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://app.datadoghq.com/dash/integration/7/aws-overview
[13]: /integrations/#cat-aws
[14]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service
[15]: https://app.datadoghq.com/logs
[16]: /getting_started/agent/
[17]: https://app.datadoghq.com/account/settings/agent/latest
[18]: https://app.datadoghq.com/infrastructure
[19]: /integrations/system/
[20]: /integrations/ntp/
[21]: /integrations/
[22]: /developers/dogstatsd/?tab=hostagent
[23]: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[24]: https://aws.amazon.com/fargate/
[25]: /agent/amazon_ecs/?tab=awscli
[26]: /agent/docker/?tab=standard
[27]: /agent/amazon_ecs/data_collected/
[28]: /integrations/ecs_fargate/?tab=fluentbitandfirelens
[29]: /agent/kubernetes/distributions/?tab=helm#EKS
[30]: /agent/kubernetes/?tab=helm
[31]: /integrations/eks_fargate/#setup
[32]: /integrations/eks_anywhere/
[33]: /api/latest/using-the-api/
[34]: /integrations/guide/amazon_cloudformation/#resources-available
[35]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[36]: /dashboards/#overview
[37]: /dashboards/functions/
[38]: /dashboards/correlations/
[39]: /monitors/types
[40]: /monitors/notify/
[41]: /integrations/#cat-notification
[42]: /serverless
[43]: /serverless/libraries_integrations
[44]: /serverless/distributed_tracing
[45]: /serverless/aws_lambda/troubleshooting/
[46]: /integrations/amazon_xray/
[47]: /tracing/trace_collection/
[48]: /tracing/
[49]: /watchdog/
[50]: /getting_started/cloud_siem/
[51]: /security/default_rules/#cat-log-detection
[52]: /security/cloud_siem/investigate_security_signals
[53]: /security/notifications/rules/
[54]: /security/cloud_security_management/setup/
[55]: /security/default_rules/#cat-posture-management-cloud
[56]: /security/default_rules/#cat-posture-management-infra
[57]: /integrations/guide/aws-integration-troubleshooting/
[58]: /integrations/ecs_fargate/?tab=webui#installation-for-aws-batch


