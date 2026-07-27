---
description: CloudFormation を使用して、Amazon Web Services アカウントを Datadog と統合します。IAM ロールを設定し、サービスインテグレーションを有効にし、ログ転送を構成します。
further_reading:
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: ブログ
  text: AWS を監視するための重要なメトリクス
- link: https://www.datadoghq.com/blog/aws-1-click-integration/
  tag: ブログ
  text: Datadog の AWS 1クリックインテグレーションのご紹介
- link: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
  tag: ブログ
  text: CloudFormation を使用した Datadog のデプロイと構成
- link: https://www.datadoghq.com/blog/monitoring-as-code-with-datadog-and-cloudformation/
  tag: ブログ
  text: Datadog と CloudFormation Registry を使ったコードとしてのモニタリングの実装
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: ブログ
  text: サーバーレスビューでサーバーレススタック全体を監視
- link: https://www.datadoghq.com/blog/monitor-aws-fargate/
  tag: ブログ
  text: AWS Fargate 上の ECS アプリケーションを Datadog で監視する
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: ブログ
  text: Datadog で Amazon ECS をどこでも監視する
- link: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation
  tag: ドキュメント
  text: Amazon Data Firehose を使用した AWS CloudWatch メトリクスストリーム
- link: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
  tag: ブログ
  text: Datadog で Graviton3 搭載の EC2 インスタンスを監視する
title: AWS の概要
---
## 概要 {#overview}

このガイドでは、Datadog の CloudFormation テンプレートを使用して、Amazon Web Services (AWS) アカウントを Datadog と統合する手順を説明します。セットアップが完了したら、個々の AWS サービスインテグレーションを有効にし、より深い可視性を得るために EC2 インスタンスに Datadog Agent をインストールして、ログ転送を構成できます。

## 前提条件 {#prerequisites}

始める前に、[AWS][7] アカウントがあることを確認してください。CloudFormation テンプレートで IAM ロールと関連するポリシーを作成し、Datadog の AWS アカウントがデータの収集やプッシュのために AWS アカウントに API コールを行えるようにします。AWS ユーザーは、テンプレートを実行するために以下の IAM 権限を持っている必要があります。

{{% collapse-content title="必要な IAM 権限" level="h4" expanded=false id="iam-permissions" %}}
- cloudformation:CreateStack
- cloudformation:CreateUploadBucket
- cloudformation:DeleteStack
- cloudformation:DescribeStacks
- cloudformation:DescribeStackEvents
- cloudformation:GetStackPolicy
- cloudformation:GetTemplateSummary
- cloudformation:ListStacks
- cloudformation:ListStackResources
- ec2:DescribeSecurityGroups
- ec2:DescribeSubnets
- ec2:DescribeVpcs
- iam:AttachRolePolicy
- iam:CreatePolicy
- iam:CreateRole
- iam:DeleteRole
- iam:DeleteRolePolicy
- iam:DetachRolePolicy
- iam:GetRole
- iam:GetRolePolicy
- iam:PassRole
- iam:PutRolePolicy
- iam:TagRole
- iam:UpdateAssumeRolePolicy
- kms:Decrypt
- lambda:AddPermission
- lambda:CreateFunction
- lambda:DeleteFunction
- lambda:GetCodeSigningConfig
- lambda:GetFunction
- lambda:GetFunctionCodeSigningConfig
- lambda:GetLayerVersion
- lambda:InvokeFunction
- lambda:PutFunctionConcurrency
- lambda:RemovePermission
- lambda:TagResource
- logs:CreateLogGroup
- logs:DeleteLogGroup
- logs:DescribeLogGroups
- logs:PutRetentionPolicy
- oam:ListSinks
- oam:ListAttachedLinks
- s3:CreateBucket
- s3:DeleteBucket
- s3:DeleteBucketPolicy
- s3:GetEncryptionConfiguration
- s3:GetObject
- s3:GetObjectVersion
- s3:PutBucketPolicy
- s3:PutBucketPublicAccessBlock
- s3:PutEncryptionConfiguration
- s3:PutLifecycleConfiguration
- secretsmanager:CreateSecret
- secretsmanager:DeleteSecret
- secretsmanager:GetSecretValue
- secretsmanager:PutSecretValue
- serverlessrepo:CreateCloudFormationTemplate
{{% /collapse-content %}}

## セットアップ {#setup}

1. Datadog の [AWS インテグレーション構成ページ][8]に移動し、{{< ui >}}Add AWS Account{{< /ui >}} をクリックします。
1. {{< ui >}}Automatically using CloudFormation{{< /ui >}} のオプションで、インテグレーションの設定を構成します。
   1. 統合する AWS リージョンを選択します。
   1. Datadog [API キー][9]を追加します。
   1. 必要に応じて、[Datadog Forwarder Lambda][1] でログなどのデータを Datadog に送ります。
   1. 必要に応じて、[Cloud Security Misconfigurations][54] を有効にして、クラウド環境、ホスト、コンテナをスキャンして、誤構成やセキュリティリスクを検出します。
1. {{< ui >}}Launch CloudFormation Template{{< /ui >}} をクリックします。これにより AWS コンソールが開き、CloudFormation スタックが読み込まれます。すべてのパラメーターは、事前の Datadog フォームでの選択に基づいて入力されているため、必要な場合以外は編集する必要はありません。
**注:** `DatadogAppKey` パラメーターは、CloudFormation スタックが Datadog に API コールを行い、この AWS アカウントの Datadog 構成を追加および編集できるようにするものです。キーは自動的に生成され、Datadog アカウントに関連付けられます。
1. AWS から必要な項目にチェックを入れ、{{< ui >}}Create stack{{< /ui >}} をクリックします。これにより、Datadog スタックと 3 つのネストされたスタックの作成プロセスが開始されます。これには数分かかる場合があります。次に進む前に、スタックが正常に作成されたことを確認してください。
1. スタックの作成後、Datadog の AWS インテグレーションタイルに戻り、{{< ui >}}Ready!{{< /ui >}} をクリックします。
1. データ収集が開始されるまで最大 10 分待ち、すぐに使える [AWS 概要ダッシュボード][12]を表示して、AWS サービスやインフラストラクチャーから送信されるメトリクスを確認します。
{{< img src="getting_started/integrations/aws-dashboard.png" alt="Datadog アカウントの AWS 概要ダッシュボード。左側に、AWS のロゴと AWS イベントのグラフがあり、一致するエントリーが見つからないことが示されています。中央には、EBS ボリュームに関連する数値データを示すグラフと、それと一貫したデータを示すヒートマップが表示されています。右側には、ELB に関連する数値データを示すグラフと、3 つのソースからのスパイク状のデータを示す時系列グラフが表示されています。">}}

複数のアカウントを一度に設定するには、[API][3]、[AWS CLI][4]、または [Terraform][5] を使用します。詳細については、[Datadog-Amazon CloudFormation ガイド][6]を参照してください。

**注**: Datadog の CloudFormation テンプレートは、定義済みのリソースの作成と削除のみをサポートしています。スタックへの更新の適用方法については、[スタックテンプレートの更新][59]を参照してください。

### セットアップ後にできること{#what-to-expect-after-setup}

インテグレーションが正常に構成されると、データが次のタイムラインから Datadog に表示されるようになります。

- **メトリクス**: API ポーリングで約 10 分、[CloudWatch メトリクスストリーム][60] であれば 2 ～ 3 分で表示されます。すべてのサービスが同じ間隔でレポートするわけではないため、最初の 1 時間はダッシュボードにデータが一部しか表示されなくても異常ではありません。
- **タグ**: AWS リソースタグの伝播には、追加の時間がかかる場合があります。AWS でのタグの変更が Datadog に反映されるまでには、15 分から数時間かかることがあります。
- **リソース**: セットアップ後の次のリソースクロールサイクルで検出されます。
- **ログ**: 別途構成が必要です。セットアップ手順については、[ログを送信する](#send-logs)を参照してください。

<div class="alert alert-info">
Datadog は、インテグレーションが有効化される前の履歴メトリクスデータをバックフィルしません。メトリクスの収集は、インテグレーションが正常に構成された時点から開始されます。
</div>

## 構成 {#configuration}

### 個々の AWS サービスに対するインテグレーションを有効にする {#enable-integrations-for-individual-aws-services}

利用可能なサブインテグレーションの完全なリストについては、[インテグレーションページ][13]を参照してください。これらのインテグレーションの多くは、Datadog が AWS アカウントからのデータを認識したときにデフォルトでインストールされます。

[AWS インテグレーションページ][8]の {{< ui >}}Metric Collection{{< /ui >}} タブを使用して、Datadog インテグレーションがメトリクスを収集するサービスを構成します。

### リージョンを追加する {#add-regions}

Datadog がメトリクス、CloudWatch イベント、リソースを収集する AWS リージョンは、[AWS インテグレーションページ][8] の {{< ui >}}General{{< /ui >}} タブで管理できます。

## ログを送信する {#send-logs}

AWS サービスログを Datadog に送信する方法は 2 つあります。

- [Amazon Data Firehose の宛先][10]: 大量の CloudWatch ログを送信する場合に推奨されます。
- [Forwarder Lambda 関数][11]: Lambda 関数からトレース、拡張メトリクス、カスタムメトリクスを送信する場合に必要です。また、Amazon Data Firehose に直接ストリーミングできない S3 やその他のリソースからのログの送信にも推奨されます。

セットアップ手順については、[AWS サービスのログを有効にする][14]を参照してください。

### 検証 {#validation}

ログを有効にしたら、[ログエクスプローラー][15]で `source` または `service` ファセットを使用してログを見つけます。以下は S3 の例です。
{{< img src="getting_started/integrations/logs-explorer.png" alt="Datadog アカウントのログエクスプローラーページ。左側に、ソースとサービスのファセットが表示されています。どちらも「s3」がチェックされています。右側には、いくつかのログエントリがリスト形式で表示されています。">}}

## Datadog のプラットフォームをさらに活用する {#get-more-from-the-datadog-platform}

### EC2 上の Datadog Agent でより深く視覚化する {#deeper-visibility-with-the-datadog-agent-on-ec2}

Datadog AWS インテグレーションは、デフォルトでは CloudWatch API をクロールして AWS が提供するメトリクスを取得しますが、[Datadog Agent][16] を使用すると EC2 インスタンスをさらに深くまで視覚化することが可能です。Datadog Agent は、メトリクスやイベントをレポートする軽量のデーモンであり、ログやトレースを構成することもできます。Datadog アプリケーションの [Agent Installation][17] セクションには、さまざまなオペレーティングシステムに Datadog Agent をインストールするための手順が記載されています。多くのオペレーティングシステム (たとえば、Amazon Linux) には、インスタンスのターミナルから実行して Datadog Agent をインストールできるワンステップインストールコマンドがあります。
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="Datadog の Integrations タブの Agent セクション。左側に、Datadog Agent のサポートされているオペレーティングシステムのリストが表示されています。このリストの「Amazon Linux」が強調表示されています。右側には、簡単なワンステップインストールを使用するように表示されています。Agent をインストールするためのコマンドがその下に表示され、DD_API_KEY セクションは隠されています。">}}

Agent がインストールされると、[インフラストラクチャーリスト][18]内に骨のアイコンとしてグラフィカルに表示されます。
{{< img src="getting_started/integrations/infrastructure-list.png" alt="インフラストラクチャーリストには、リスト形式で 2 つのホストが表示されています。どちらのホストにも、AWS インテグレーション用の AWS アイコンと、AWS インテグレーションに関連付けられていることを示す 'aws' の青いボックスが表示されています。一方のホストには、犬の骨のアイコンと 'ntp' および 'system' の青いボックスも表示されています。">}}

上のスクリーンショットは、Datadog Agent が [System][19] と [NTP][20] のチェックからデータを報告しているホストを示しています。System チェックは、CPU、メモリ、ファイルシステム、I/O に関するメトリクスを提供し、ホストに関するさらなる洞察を提供します。環境やユースケースに合わせて追加の[インテグレーション][21]を有効にしたり、追加で [DogStatsD][22] を使用してカスタムメトリクスを Datadog に直接送信することもできます。

この方法の利点については、[クラウドインスタンスに Datadog Agent をインストールすべき理由に関する FAQ][23] を参照してください。

### Amazon Container Services で Datadog Agent を使用する {#using-the-datadog-agent-with-amazon-container-services}

コンテナ環境では、インスタンスの管理や [Fargate][24] を活用したサーバーレス環境でも、Datadog Agent を利用することができます。

#### EC2 起動タイプの ECS {#ecs-with-ec2-launch-type}

[Amazon ECS のドキュメント][25]を使用して、ECS クラスターの EC2 インスタンスで [Datadog Docker Agent][26] を実行します。[Amazon ECS Data Collection のドキュメント][27]で、Datadog アカウントに報告されるメトリクスとイベントを確認します。

#### Fargate 起動タイプの ECS {#ecs-with-fargate-launch-type}

[Amazon ECS on AWS Fargate のドキュメント][28]を使用して、アプリケーションと同じタスク定義でコンテナとして Agent を実行します。**注**: Fargate インテグレーションを最大限に活用するには、Datadog Agent バージョン 6.1.1 以降が必要です。

#### Fargate オーケストレーションタイプによる AWS Batch {#aws-batch-with-fargate-orchestration-type}

[Amazon ECS on AWS Fargate for AWS Batch のドキュメント][58]を使用して、アプリケーションと同じ AWS Batch ジョブ定義でコンテナとして Agent を実行します。**注**: Fargate インテグレーションを最大限に活用するには、Datadog Agent バージョン 6.1.1 以降が必要です。

#### EKS {#eks}

[Kubernetes Distributions のドキュメント][29]にあるように、Amazon Elastic Kubernetes Service (EKS) の場合は特に構成は必要ありません。EKS クラスターに Agent をデプロイするには、[Kubernetes 専用ドキュメント][30]を使用します。

#### EKS と Fargate {#eks-with-fargate}

Fargate ポッドは AWS によって管理されているため、CPU やメモリなどのホストベースのシステムチェックは除外されます。AWS Fargate ポッドからデータを収集するには、[Amazon EKS on AWS Fargate のドキュメント][31]を使用して、カスタムロールベースのアクセス制御 (RBAC) でアプリケーションポッドのサイドカーとして Agent を実行するようにします。**注**: Datadog Agent バージョン 7.17 以降が必要です。

#### EKS Anywhere {#eks-anywhere}

オンプレミスの Kubernetes クラスターには、[EKS Anywhere のドキュメント][32]を使用します。

### Datadog のリソースを追加で作成する {#create-additional-datadog-resources}
Datadog の UI や [API][33] を利用するほか、[CloudFormation Registry][35] で多くの [Datadog リソース][34]を作成することが可能です。視覚化とトラブルシューティングのために、[ダッシュボード][36]を使用して主要データを表示し、[関数][37]を適用し、[メトリクス相関][38]を見つけることができます。

アカウントでの望ましくない動作や予期せぬ動作について通知を受けるには、[モニター][39]を作成します。モニターは、アカウントに報告されたデータを一貫して評価し、正しい情報が正しいチームメンバーに届くように[通知][40]を送信します。チームに通知するすべての方法については、[通知インテグレーションのリスト][41]を参照してください。

## 関連製品を見る {#explore-related-products}

### Serverless {#serverless}

Datadog で AWS Lambda 関数を監視するには、[Serverless][42] を参照して、アプリケーションのインスツルメンテーション、[サーバーレスライブラリとインテグレーション][43]のインストール、[サーバーレスアプリケーションによる分散トレーシング][44]の実装、または[サーバーレスの問題のトラブルシューティング][45]に付いての説明を確認してください。

### APM {#apm}

アプリケーションと AWS サービスから分散トレースを収集するには、Datadog Agent を [APM][47] と共に使用します。AWS Lambda 関数の場合は、[Datadog Lambda Extension][44] を使用してインスツルメントします。 アプリケーションパフォーマンスデータの分析に関する詳細は、[APM のドキュメント][48]を参照してください。

さらに、APM パフォーマンスとインフラストラクチャーメトリクスのアルゴリズム機能である [Watchdog][49] を使用すると、アプリケーションの潜在的な問題を自動的に検出し、通知されるようにすることができます。

### セキュリティ {#security}

#### Cloud SIEM {#cloud-siem}

[Cloud SIEM の概要][50]を参照して、すぐに使える[ログ検出ルール][51]に照らし合わせてログを評価します。これらのルールはカスタマイズ可能であり、脅威が検出されると[セキュリティシグナルエクスプローラー][52]でアクセス可能なセキュリティシグナルが生成されます。[通知ルール][53]を使用して複数のルールにまたがる通知設定を構成することができます。

#### Cloud Security Misconfigurations {#cloud-security-misconfigurations}

クラウド環境の誤構成を検出および評価する方法については、[Cloud Security Misconfigurations の設定][54]ガイドを参照してください。デフォルトで提供される [Cloud][55] と [Infrastructure][56] のコンプライアンスルールに照らしてリソース構成データが評価され、攻撃手法や潜在的な誤構成にフラグが付けられます。

### トラブルシューティング {#troubleshooting}

`Datadog is not authorized to perform sts:AssumeRole` というエラーが発生した場合は、専用の[トラブルシューティングページ][2]を参照してください。その他の問題については、[AWS インテグレーショントラブルシューティングガイド][57]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/guide/forwarder/
[2]: /ja/integrations/guide/error-datadog-not-authorized-sts-assume-role/
[3]: /ja/api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_account
[6]: /ja/integrations/guide/amazon_cloudformation/
[7]: https://aws.amazon.com/getting-started/?nc1=f_cc
[8]: https://app.datadoghq.com/integrations/amazon-web-services
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[11]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://app.datadoghq.com/dash/integration/7/aws-overview
[13]: /ja/integrations/#cat-aws
[14]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service
[15]: https://app.datadoghq.com/logs
[16]: /ja/getting_started/agent/
[17]: https://app.datadoghq.com/account/settings/agent/latest
[18]: https://app.datadoghq.com/infrastructure
[19]: /ja/integrations/system/
[20]: /ja/integrations/ntp/
[21]: /ja/integrations/
[22]: /ja/extend/dogstatsd/?tab=hostagent
[23]: /ja/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[24]: https://aws.amazon.com/fargate/
[25]: /ja/agent/amazon_ecs/?tab=awscli
[26]: /ja/agent/docker/?tab=standard
[27]: /ja/agent/amazon_ecs/data_collected/
[28]: /ja/integrations/ecs_fargate/?tab=fluentbitandfirelens
[29]: /ja/agent/kubernetes/distributions/?tab=helm#EKS
[30]: /ja/agent/kubernetes/?tab=helm
[31]: /ja/integrations/eks_fargate/#setup
[32]: /ja/integrations/eks_anywhere/
[33]: /ja/api/latest/using-the-api/
[34]: /ja/integrations/guide/amazon_cloudformation/#resources-available
[35]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[36]: /ja/dashboards/#overview
[37]: /ja/dashboards/functions/
[38]: /ja/dashboards/correlations/
[39]: /ja/monitors/types
[40]: /ja/monitors/notify/
[41]: /ja/integrations/#cat-notification
[42]: /ja/serverless
[43]: /ja/serverless/libraries_integrations
[44]: /ja/serverless/distributed_tracing
[45]: /ja/serverless/aws_lambda/troubleshooting/
[46]: /ja/integrations/amazon_xray/
[47]: /ja/tracing/trace_collection/
[48]: /ja/tracing/
[49]: /ja/watchdog/
[50]: /ja/getting_started/cloud_siem/
[51]: /ja/security/default_rules/#cat-log-detection
[52]: /ja/security/cloud_siem/triage_and_investigate/investigate_security_signals
[53]: /ja/security/notifications/rules/
[54]: /ja/security/cloud_security_management/setup/
[55]: /ja/security/default_rules/#cat-posture-management-cloud
[56]: /ja/security/default_rules/#cat-posture-management-infra
[57]: /ja/integrations/guide/aws-integration-troubleshooting/
[58]: /ja/integrations/ecs_fargate/?tab=webui#installation-for-aws-batch
[59]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-get-template.html
[60]: /ja/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/