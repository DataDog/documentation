---
aliases:
- /ja/integrations/awsec2/
- /ja/agent/faq/install-the-agent-with-aws-ssm
categories:
- cloud
- os & system
- aws
- log collection
custom_kind: インテグレーション
dependencies: []
description: インスタンスリソースの使用状況の追跡、ステータスチェックの監視など。
doc_link: https://docs.datadoghq.com/integrations/amazon_ec2/
draft: false
git_integration_title: amazon_ec2
has_logo: true
integration_id: amazon-ec2
integration_title: Amazon EC2
integration_version: ''
is_public: true
manifest_version: '1.0'
monitors:
  CPU utilization is high: assets/monitors/ec2_cpu_utilization.json
  Host Ok check is failing: assets/monitors/ec2_host_ok.json
  Status check is failing: assets/monitors/ec2_status_check.json
name: amazon_ec2
public_title: Datadog-Amazon EC2 インテグレーション
short_description: インスタンスリソースの使用状況の追跡、ステータスチェックの監視など。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Elastic Compute Cloud (Amazon EC2) は、クラウド内でサイズ変更可能なコンピューティング能力を提供する Web サービスです。開発者が Web スケールのコンピューティングを簡単に利用できるように設計されています。

このインテグレーションを有効にすると、すべての EC2 メトリクスと、スケジュール設定されたメンテナンスなどの追加イベントが Datadog に表示されます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### 構成

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

{{< img src="integrations/amazon_ec2/aws_ec2_automuting_2024.png" alt="Amazon EC2 オートミュート" >}}

### Agent のインストール

Datadog は、EC2 インスタンス上で Datadog Agent をセットアップするために 2 つのアプローチを提供しています。Amazon EC2 インスタンスに Agent をインストールするメリットについては、[クラウドインスタンスに Datadog Agent をインストールするメリットは何ですか？][7]をご覧ください。

{{< tabs >}}
{{% tab "AWS Systems Manager (SSM)" %}}

#### Amazon Systems Manager UI による Agent のインストール (推奨)

AWS Systems Manager を使用して EC2 インスタンスに Datadog Agent をインストールするには、以下の手順に従ってください。

1. EC2 インスタンス上の [IAM ロール][1] を構成し、[AmazonSSMManagedInstanceCore permission][2] が有効になっていることを確認します。

2. [AWS SSM のドキュメントタブ][3]に移動します。
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
    * `secretsmanager:GetSecretValue` — シークレットストアに保管されている API キーやアプリケーションキーを取得するため
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

[Datadog Agent][8] または別の[ログシッパー][9]を使用して、Datadog にログを送信します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon-ec2" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

**注**: 
   - `aws.ec2.instance_age` は Datadog - EC2 インテグレーションではデフォルトで収集されません。このメトリクスの収集を有効化するには [Datadog サポート][10]にお問い合わせください。
   - Amazon EC2 インテグレーションでメトリクスの収集を無効にしても、`aws.ec2.host_ok` はデフォルトで収集されるため、インフラストラクチャーリストに意図しないホストが表示される可能性があります。監視対象を希望するホストのみに制限するには、それらの EC2 インスタンスに `datadog:true` などの AWS タグを付与します。その後、[Datadog AWS インテグレーションページ][2]の **Metric Collection** タブにある **Limit metric collection to specific resources** テキストボックスにそのタグを指定します。

### サービスチェック
{{< get-service-checks-from-git "amazon-ec2" >}}


## すぐに使える監視

Amazon EC2 インテグレーションは、パフォーマンスを監視し最適化するために、すぐに使える監視機能を提供します。

- Amazon EC2 Overview Dashboard: すぐに使える [Amazon EC2 Overview ダッシュボード][11]で、EC2 インスタンスを包括的に可視化できます。
- Recommended Monitors: [Recommended Amazon EC2 モニター][12]を有効にすることで、問題を事前に検知し、タイムリーにアラートを受け取ることができます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

- [EC2 監視のキーメトリクス][13]
- [EC2 メトリクスの収集方法][14]
- [Datadog で EC2 インスタンスを監視する方法][15]


[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon-ec2
[6]: https://app.datadoghq.com/monitors/downtimes
[7]: https://docs.datadoghq.com/ja/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[8]: https://docs.datadoghq.com/ja/agent/logs/
[9]: https://docs.datadoghq.com/ja/integrations/rsyslog/
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://app.datadoghq.com/dash/integration/60/aws-ec2-overview
[12]: https://app.datadoghq.com/monitors/recommended
[13]: https://www.datadoghq.com/blog/ec2-monitoring
[14]: https://www.datadoghq.com/blog/collecting-ec2-metrics
[15]: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog