---
app_id: amazon-ec2
app_uuid: c616397b-784d-422a-8844-e9c04042fa50
assets:
  dashboards:
    aws_ec2: assets/dashboards/aws_ec2.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check: aws.ec2.host_ok
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.ec2
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 88
    source_type_name: Amazon EC2
  monitors:
    CPU utilization is high: assets/monitors/ec2_cpu_utilization.json
    Host Ok check is failing: assets/monitors/ec2_host_ok.json
    Status check is failing: assets/monitors/ec2_status_check.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- os & system
- aws
- log collection
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_ec2
integration_id: amazon-ec2
integration_title: Amazon EC2
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_ec2
public_title: Amazon EC2
short_description: Amazon Elastic Compute Cloud (Amazon EC2) は、クラウド上で必要に応じて増減できる計算資源を提供する
  Web サービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::クラウド
  - Category::OS とシステム
  - Category::AWS
  - Category::ログの収集
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon Elastic Compute Cloud (Amazon EC2) は、クラウド上で必要に応じて増減できる計算資源を提供する
    Web サービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon EC2
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon Elastic Compute Cloud (Amazon EC2) は、クラウド内でサイズ変更可能なコンピューティング能力を提供する Web サービスです。開発者が Web スケールのコンピューティングを簡単に利用できるように設計されています。

このインテグレーションを有効にすると、すべての EC2 メトリクスと、スケジュール設定されたメンテナンスなどの追加イベントが Datadog に表示されます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### 設定

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `EC2` が有効になっていることを確認します。

2. Amazon EC2 のメトリクスを収集するには、次の必須アクセス許可を [Datadog IAM ポリシー][3]に追加します。詳細については、AWS ウェブサイト上の [EC2 ポリシー][4]を参照してください。

    | AWS アクセス許可               | 説明                                                                                                                           |
    | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
    | `ec2:DescribeInstanceStatus` | インスタンスの健全性をアサートするために、ELB インテグレーションによって使用されます。すべてのインスタンスの健全性を記述するために、EC2 インテグレーションによって使用されます。|
    | `ec2:DescribeSecurityGroups` | EC2 インスタンスに SecurityGroup 名とカスタムタグを追加します。                                                                          |
    | `ec2:DescribeInstances`      | EC2 インスタンスと EC2 Cloudwatch メトリクスにタグを追加します。                                                                              |

3. [Datadog - Amazon EC2 インテグレーション][5]をインストールします。

**注**: Datadog で EC2 インスタンスのサブセットを監視したい場合、それらの EC2 インスタンスに `datadog:true` などの AWS タグを付与します。[Datadog AWS インテグレーションページ][2]の **Metric Collection** タブにある **Limit metric collection to specific resources** テキストボックスで、そのタグを指定します。

#### EC2 オートミュート

Datadog は、CloudWatch API からのホストステータスに基づいて、EC2 インスタンスの手動シャットダウンや AWS オートスケーリングによってトリガーされるインスタンスの停止に関連するモニターを事前にミュートすることができます。オートミュートされた EC2 インスタンスは、[モニターのダウンタイム][6ページで **Show automatically muted hosts** をオンにするとリストされます。

オートミュートを有効にするには、EC2 インテグレーションをインストールする必要があります。メトリクスの収集が何らかのタグが付いたホストに限られている場合は、それらのタグと一致するインスタンスだけがオートミュートされます。

EC2 インスタンスのシャットダウンが予期される場合にモニターをオフにするには、[AWS インテグレーションページ][2]で **EC2 automuting** チェックボックスをオンにします。

![Amazon EC2 オート ミュート][7]

### Agent のインストール

Datadog では、EC2 インスタンスに Datadog Agent をセットアップする方法を 2 通り用意しています。[クラウド インスタンスに Datadog Agent をインストールする理由][8] では、Amazon EC2 インスタンスに Datadog Agent を導入するメリットを確認できます。

{{< tabs >}}
{{% tab "AWS Systems Manager (SSM)" %}}

#### Amazon Systems Manager UI による Agent のインストール (推奨)

AWS Systems Manager を使用して EC2 インスタンスに Datadog Agent をインストールするには、以下の手順に従ってください。

1. EC2 インスタンス上の [IAM ロール][1] を構成し、[AmazonSSMManagedInstanceCore permission][2] が有効になっていることを確認します。

2. AWS SSM の [Documents タブ][3] に移動します。
3. `datadog` を検索します。注: 上記のリンクは US East-1 リージョンのものです。AWS Management コンソールのトップナビゲーションバーでリージョンを切り替えて、自分のリージョンに合ったドキュメントを見つける必要があるかもしれません。
4. ニーズに応じて Linux または Windows のドキュメントを選択します。
- Linux: datadog-agent-installation-linux
- Windows: datadog-agent-installation-windows

5. コマンドパラメーターを入力します。
6. Agent をインストールする対象のインスタンスを選択します。
7. **Run** をクリックします。
8. 確認ステータスが終了するまで待ち、Datadog のインフラストラクチャーリストを確認します。

#### カスタム Agent の代替インストール

##### パラメーターストア

[パラメーターストア (Parameter Store)][4] で以下の内容を持つパラメーターを作成します。

- 名前: `dd-api-key-for-ssm`
- 説明: (オプション)
- タイプ: `安全な文字列`
- KMS の主要なソース: `現在のアカウント`
- KMS キー ID: 選択されているデフォルト値を使用します
- 値: お使いの [Datadog API キー][5]

##### ドキュメント

Systems Manager で新しい [ドキュメント (Document)][6] を作成します。

- 名前: `dd-agent-install`
- ターゲットタイプ: (オプション)
- ドキュメントタイプ: `コマンドのドキュメント`
- コンテンツ: `JSON`

Datadog US サイトをご利用の場合は、`<AWS_REGION>` (例: `us-east-1`) を `runCommand` の下に記載した [dd-agent-install-us-site.json][7] を使用してください。Datadog EU サイトをご利用の場合は、代わりに [dd-agent-install-eu-site.json][8] を使用してください。

##### コマンドの実行

[Run Command][9] 画面で **Run command** ボタンをクリックし、以下の手順に従います。

- **コマンドのドキュメント**:
  - 検索ボックスをクリックし、_Owner -> Owned by me_ を選択します。
  - ドキュメントの横にあるラジオボタンをクリックします。
  - 必要に応じて、**ドキュメントのバージョン**を選択します。
- **ターゲット**:
  - 対象の EC2 インスタンスを選択します。
- **出力オプション** (オプション):
  - **CloudWatch output** チェックボックスをオンにして、問題をログに記録します。
- **他のセクション** (オプション):
  - 他のセクションはセットアップに応じて変更します。

**Run** ボタンをクリックすると、ステータスが表示される確認ページが表示されます。処理が完了するまで待機してから、Datadog の[インフラストラクチャーリスト][10]で確認してください。

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[2]: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html
[3]: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html
[4]: https://console.aws.amazon.com/systems-manager/parameters
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://console.aws.amazon.com/systems-manager/documents
[7]: https://docs.datadoghq.com/resources/json/dd-agent-install-us-site.json
[8]: https://docs.datadoghq.com/resources/json/dd-agent-install-eu-site.json
[9]: https://console.aws.amazon.com/systems-manager/run-command/executing-commands
[10]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{% tab "EC2 Image Builder" %}}

#### EC2 Image Builder を使用した Agent のインストール

Datadog は、AWS Marketplace を通して EC2 Image Builder 用の Datadog Agent コンポーネントを公開しています。ユーザーは本コンポーネントにサブスクライブし、Image Builder コンポーネントを使用してカスタム AMI をビルドできます。

以下の手順に従って、Datadog Agent があらかじめインストールされたカスタム Amazon Machine Image を作成し、その AMI を使って EC2 インスタンスをプロビジョニングしてください。

<div class="alert alert-info">
初期リリースでは、このコンポーネントは Amazon Linux 2023 でテストされています。Datadog Agent をサポートする任意の Linux ディストリビューションであれば動作するはずです。
</div>

##### サブスクリプションの作成

1. EC2 Image Builder コンソールを開き、「Discover products」へ移動します。
1. **Components** タブを選択し、Datadog Agent を検索します。
1. **View subscription options** をクリックし、表示される手順に従ってサブスクリプションを作成します。

詳細は [Managing AWS Marketplace Subscriptions][1] をご参照ください。

##### イメージレシピを作成する
1. EC2 Image Builder コンソールで **Image recipes** に移動します。
1. 新しいレシピを以下の設定で作成します。
    * Base image - `arn:aws:imagebuilder:us-east-1:aws:image/amazon-linux-2023-x86/x.x.x`. 
    * Component - `arn:aws:imagebuilder:us-east-1:aws-marketplace:component/datadog-agent-for-linux-prod-wwo2b4p7dgrkk/0.1.0/1` 
    * 必要に応じてコンポーネントパラメーターを構成します (ここではデフォルトを想定)。

詳細は [EC2 Image Builder Recipes][2] をご参照ください。


##### イメージパイプラインを作成し、イメージをビルドする

**前提条件**:

- デフォルトのロール `EC2InstanceProfileForImageBuilder` には、次の追加権限が必要です。
    * `imagebuilder:GetMarketplaceResource` — Marketplace から Datadog Agent コンポーネントを取得するため
    * シークレット ストアに保存された API キーとアプリケーション キーを取得するには、`secretsmanager:GetSecretValue` を使用します。
- また、`dd-api-key` と `dd-app-key` というキーで Datadog の API キーとアプリケーションキーを保管するために、`mp-ib-datadog-agent-secret` という名前のシークレットを作成してください。

続いて、パイプラインの作成とイメージのビルドを行います。
1. EC2 Image Builder コンソールの **Image pipelines** に移動します。
1. レシピ用にパイプラインを作成します。これは複数ステップのウィザードで、以下は最も簡単なシナリオを想定しています。
    * ステップ 1: パイプライン名を指定し、ビルドスケジュールを手動に設定します。
    * ステップ 2: 前のセクションで作成したレシピを選択します。
    * ステップ 3: デフォルトの設定をそのまま使用します。
    * ステップ 4: 追加ポリシーがアタッチされた `EC2InstanceProfileForImageBuilder` ロールを使用するデフォルトのオプションをそのまま使用します。
    * ステップ 5: デフォルト設定のままにします。
    * ステップ 6: 内容を確認してパイプラインを作成します。
1. 作成したパイプラインに移動し、実行します。
1. パイプラインが完了すると、新しいイメージ ARN の要約が表示されます。
1. `mp-ib-datadog-agent-secret` シークレットを正しく設定してある場合、イメージから起動した EC2 インスタンスは起動後まもなく Datadog Agent でメトリクスを送信し始めます。

詳細については [EC2 Image Builder Pipelines][3] をご参照ください。

##### コンポーネントパラメーター

レシピでは、以下のパラメーターを使用して Agent をカスタマイズできます。
* `DD_SITE`: テレメトリデータを送信するサイト。デフォルトは `datadoghq.com`。
* `HOST_TAGS`: ホストタグ。デフォルトは `installer:ec2_image_builder`。
* `SM_SECRET_NAME`: API キーおよびアプリケーションキーを格納するシークレットの名前。デフォルトは `mp-ib-datadog-agent-secret`。
* `SM_API_KEY`: シークレット内で API キーを取得するためのキー。デフォルトは `dd-api-key`。
* `SM_API_KEY`: シークレット内でアプリケーションキーを取得するためのキー。デフォルトは `dd-app-key`。

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/marketplace-manage-subscriptions.html
[2]: https://docs.aws.amazon.com/imagebuilder/latest/userguide/create-image-recipes.html
[3]: https://docs.aws.amazon.com/imagebuilder/latest/userguide/ami-image-pipelines.html
{{% /tab %}}
{{< /tabs >}}

### ログ収集

ログを Datadog に送信するには、[Datadog Agent][9] または別の [ログ シッパー][10] を使用します。

## 収集されるデータ

### メトリクス

このインテグレーションで提供されるメトリクスの一覧は、[metric-spec.yaml][11] を参照してください。

AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

**注**:
   - `aws.ec2.instance_age` は、Datadog - EC2 インテグレーションではデフォルトで収集されません。このメトリクス収集を有効にするには、[Datadog サポート][12] へお問い合わせください。
   - Amazon EC2 インテグレーションでメトリクスの収集を無効にしても、`aws.ec2.host_ok` はデフォルトで収集されるため、インフラストラクチャーリストに意図しないホストが表示される可能性があります。監視対象を希望するホストのみに制限するには、それらの EC2 インスタンスに `datadog:true` などの AWS タグを付与します。その後、[Datadog AWS インテグレーションページ][2]の **Metric Collection** タブにある **Limit metric collection to specific resources** テキストボックスにそのタグを指定します。

### サービス チェック
{{< get-service-checks-from-git "amazon_ec2" >}}


## すぐに使える監視

Amazon EC2 インテグレーションは、パフォーマンスを監視し最適化するために、すぐに使える監視機能を提供します。

- Amazon EC2 Overview Dashboard: すぐに使える [Amazon EC2 Overview dashboard][13] を利用して、EC2 インスタンスの状況を包括的に把握できます。
- Recommended Monitors: [推奨 Amazon EC2 モニター][14] を有効化すると、問題を先回りして検知し、タイムリーにアラートを受け取れます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

## その他の参考資料

- [EC2 監視の主要メトリクス][15]
- [EC2 メトリクスを収集する方法][16]
- [Datadog で EC2 インスタンスを監視する方法][17]


[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon-ec2
[6]: https://app.datadoghq.com/monitors/downtimes
[7]: images/aws_ec2_automuting_2024.png
[8]: https://docs.datadoghq.com/ja/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[9]: https://docs.datadoghq.com/ja/agent/logs/
[10]: https://docs.datadoghq.com/ja/integrations/rsyslog/
[11]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_ec2/assets/metrics/metric-spec.yaml
[12]: https://docs.datadoghq.com/ja/help/
[13]: https://app.datadoghq.com/dash/integration/60/aws-ec2-overview
[14]: https://app.datadoghq.com/monitors/recommended
[15]: https://www.datadoghq.com/blog/ec2-monitoring
[16]: https://www.datadoghq.com/blog/collecting-ec2-metrics
[17]: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog