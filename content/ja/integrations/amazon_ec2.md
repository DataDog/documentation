---
aliases:
- /ja/integrations/awsec2/
- /ja/agent/faq/install-the-agent-with-aws-ssm
categories:
- cloud
- os & system
- aws
- log collection
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
kind: インテグレーション
manifest_version: '1.0'
monitors:
  ec2_cpu_utilization: assets/monitors/ec2_cpu_utilization.json
  ec2_host_ok: assets/monitors/ec2_host_ok.json
  ec2_status_check: assets/monitors/ec2_status_check.json
name: amazon_ec2
public_title: Datadog-Amazon EC2 インテグレーション
short_description: インスタンスリソースの使用状況の追跡、ステータスチェックの監視など。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Elastic Compute Cloud (Amazon EC2) は、クラウド内でサイズ変更可能なコンピューティング能力を提供する Web サービスです。開発者が Web スケールのコンピューティングを簡単に利用できるように設計されています。

このインテグレーションを有効にすると、すべての EC2 メトリクスと、スケジュール設定されたメンテナンスなどの追加イベントが Datadog に表示されます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### ブラウザトラブルシューティング

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

{{< img src="integrations/amazon_ec2/aws_ec2_automuting.png" alt="Amazon EC2 オートミュート" >}}

### AWS Systems Manager (SSM) を使用した Agent のインストール

次の手順に従い、AWS Systems Manager を使用して Datadog Agent を EC2 インスタンスにインストールします。Amazon EC2 インスタンスに Agent をインストールするメリットについては、[クラウドインスタンスに Datadog Agent をインストールする理由][7]を参照してください。

#### Amazon Systems Manager UI による Agent のインストール (推奨)

1. EC2 インスタンスの [IAM ロール][8]を構成し、[AmazonSSMManagedInstanceCore 権限][9]を有効にします。

2. [AWS SSM のドキュメントタブ][10]に移動します。
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

[パラメーターストア][11]で、以下のように指定してパラメーターを作成します。

- 名前: `dd-api-key-for-ssm`
- 説明: (オプション)
- タイプ: `安全な文字列`
- KMS の主要なソース: `現在のアカウント`
- KMS キー ID: 選択されているデフォルト値を使用します
- 値: [Datadog API キー][12]

##### ドキュメント

Systems Manager で、新しい[ドキュメント][13]を作成します。

- 名前: `dd-agent-install`
- ターゲットタイプ: (オプション)
- ドキュメントタイプ: `コマンドのドキュメント`
- コンテンツ: `JSON`

Datadog US サイトの場合は、`runCommand` をご使用の `<AWS_REGION>` (例: `us-east-1`) で更新した [dd-agent-install-us-site.json][14] ファイルを使用します。Datadog EU サイトの場合は、[dd-agent-install-eu-site.json][15] を使用します。

##### コマンドの実行

[Run Command][16] で、**Run command** ボタンをクリックし、次の手順に従います。

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

**Run** ボタンをクリックすると、ステータスを示す確認ページが表示されます。終了後に、Datadog で[インフラストラクチャーリスト][17]をチェックします。

### 収集データ

[Datadog Agent][18] または別の[ログシッパー][19]を使用して、Datadog にログを送信します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_ec2" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

**注**: 
   - Datadog - EC2 インテグレーションでは、デフォルトでは `aws.ec2.instance_age` メトリクスは収集されません。このメトリクスの収集を有効にするには、[Datadog サポート][21]までお問い合わせください。
   - Amazon EC2 インテグレーションでメトリクスの収集を無効にしても、`aws.ec2.host_ok` はデフォルトで収集され、インフラストラクチャーのリストに想定外のホストが表示される可能性があります。不要なホストを除外したい場合、それらの EC2 インスタンスに `datadog:true` などの AWS タグを付与します。[Datadog AWS インテグレーションページ][2]の **Metric Collection** タブにある **Limit metric collection to specific resources** テキストボックスで、そのタグを指定します。

### ヘルプ
{{< get-service-checks-from-git "amazon_ec2" >}}


## すぐに使える監視

Amazon EC2 インテグレーションは、パフォーマンスを監視し最適化するために、すぐに使える監視機能を提供します。

- Amazon EC2 Overview ダッシュボード: すぐに使える [Amazon EC2 Overview ダッシュボード][23]を使用して、EC2 インスタンスの包括的な概要を得ることができます。
- 推奨モニター: [Amazon EC2 の推奨モニター][24]を有効にすると、問題をプロアクティブに検出し、タイムリーなアラートを受信することができます。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][21]までお問合せください。

## その他の参考資料

- [EC2 モニタリングのキーメトリクス][25]
- [EC2 メトリクスの収集方法][26]
- [Datadog で EC2 インスタンスを監視する方法][27]

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon-ec2
[6]: https://app.datadoghq.com/monitors/downtimes
[7]: https://docs.datadoghq.com/ja/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[9]: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html
[10]: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html
[11]: https://console.aws.amazon.com/systems-manager/parameters
[12]: https://app.datadoghq.com/organization-settings/api-keys
[13]: https://console.aws.amazon.com/systems-manager/documents
[14]: https://docs.datadoghq.com/resources/json/dd-agent-install-us-site.json
[15]: https://docs.datadoghq.com/resources/json/dd-agent-install-eu-site.json
[16]: https://console.aws.amazon.com/systems-manager/run-command/executing-commands
[17]: https://app.datadoghq.com/infrastructure
[18]: https://docs.datadoghq.com/ja/agent/logs/
[19]: https://docs.datadoghq.com/ja/integrations/rsyslog/
[20]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/amazon_ec2_metadata.csv
[21]: https://docs.datadoghq.com/ja/help/
[22]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/service_checks.json
[23]: https://app.datadoghq.com/dash/integration/60/aws-ec2-overview
[24]: https://app.datadoghq.com/monitors/recommended
[25]: https://www.datadoghq.com/blog/ec2-monitoring
[26]: https://www.datadoghq.com/blog/collecting-ec2-metrics
[27]: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog