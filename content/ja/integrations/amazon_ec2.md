---
aliases:
  - /ja/integrations/awsec2/
  - /ja/agent/faq/install-the-agent-with-aws-ssm
categories:
  - cloud
  - os & system
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: インスタンスリソースの使用状況の追跡、ステータスチェックの監視など
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ec2/'
git_integration_title: amazon_ec2
has_logo: true
integration_title: Amazon EC2
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_ec2
public_title: Datadog-Amazon EC2 インテグレーション
short_description: インスタンスリソースの使用状況の追跡、ステータスチェックの監視など
version: '1.0'
---
## 概要

Amazon Elastic Compute Cloud (Amazon EC2) は、クラウド内でサイズ変更可能なコンピューティング能力を提供する Web サービスです。開発者が Web スケールのコンピューティングを簡単に利用できるように設計されています。

このインテグレーションを有効にすると、すべての EC2 メトリクスと、スケジュール設定されたメンテナンスなどの追加イベントが Datadog に表示されます。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### コンフィグレーション

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`EC2` をオンにします。

2. Amazon EC2 のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。EC2 ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

    | AWS アクセス許可               | 説明                                                                                                                           |
    |------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
    | `ec2:DescribeInstanceStatus` | インスタンスの健全性をアサートするために、ELB インテグレーションによって使用されます。すべてのインスタンスの健全性を記述するために、EC2 インテグレーションによって使用されます。|
    | `ec2:DescribeSecurityGroups` | EC2 インスタンスに SecurityGroup 名とカスタムタグを追加します。                                                                          |
    | `ec2:DescribeInstances`      | EC2 インスタンスと EC2 Cloudwatch メトリクスにタグを追加します。                                                                              |

3. [Datadog - AWS EC2 インテグレーション][5]をインストールします。

**注**: Datadog を使用して EC2 インスタンスの一部を監視する場合は、それらの EC2 インスタンスに `datadog:true` などの AWS タグを割り当てます。次に、[Datadog AWS インテグレーションタイル][6]の **Optionally limit metrics collection** テキストボックスで、そのタグを指定します。

#### EC2 オートミュート

Datadog は、Cloudwatch API からのホストステータスに基づいて、EC2 インスタンスの手動シャットダウンや AWS オートスケーリングによってトリガーされるインスタンスの停止に関連するモニターを事前にミュートすることができます。オートミュートされた EC2 インスタンスは、[モニターのダウンタイム][7]ページで **Show automatically muted hosts** をオンにするとリストされます。

オートミュートを有効にするには、EC2 インテグレーションをインストールする必要があります。メトリクスの収集が何らかのタグが付いたホストに限られている場合は、それらのタグと一致するインスタンスだけがオートミュートされます。

EC2 インスタンスのシャットダウンが予期される場合にモニターをオフにするには、[AWS インテグレーションタイル][2]で **EC2 automuting** チェックボックスをオンにします。

{{< img src="integrations/amazon_ec2/aws_ec2_automuting.png" alt="AWS EC2 Automuting" >}}

### AWS Systems Manager を使用した Agent のインストール

次の手順に従い、AWS Systems Manager を使用して Datadog Agent を EC2 インスタンスにインストールします。AWS EC2 インスタンスに Agent をインストールするメリットについては、[クラウドインスタンスに Datadog Agent をインストールする理由](https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/#pagetitle)を参照してください。

#### パラメーターストア

[パラメーターストア](https://console.aws.amazon.com/systems-manager/parameters)で、以下のように指定してパラメーターを作成します。

* 名前: `dd-api-key-for-ssm`
* 説明: (オプション)
* タイプ: `安全な文字列`
* KMS の主要なソース: `現在のアカウント`
* KMS キー ID: 選択されているデフォルト値を使用します。
* 値: [Datadog API キー](https://app.datadoghq.com/account/settings#api)

#### Systems Manager

##### ドキュメント

Systems Manager で、新しい[ドキュメント](https://console.aws.amazon.com/systems-manager/documents)を作成します。

* 名前: `dd-agent-install`
* ターゲットタイプ: (オプション)
* ドキュメントタイプ: `コマンドのドキュメント`
* コンテンツ: `JSON`

Datadog US サイトの場合は、`runCommand` をご使用の `<AWS_REGION> (例: `us-east-1`) で更新した ` [dd-agent-install-us-site.json](https://docs.datadoghq.com/resources/json/dd-agent-install-us-site.json) ファイルを使用します。Datadog EU サイトの場合は、[dd-agent-install-eu-site.json](https://docs.datadoghq.com/resources/json/dd-agent-install-eu-site.json) を使用します。

##### コマンドの実行

[コマンドの実行](https://console.aws.amazon.com/systems-manager/run-command/executing-commands)で、**コマンドの実行**ボタンをクリックし、次の手順に従います。

* **コマンドのドキュメント**:
    * 検索ボックスをクリックし、Owner -> Owned by me を選択します。
    * ドキュメントの横にあるラジオボタンをクリックします。
    * 必要に応じて、**ドキュメントのバージョン**を選択します。
* **ターゲット**:
    * 対象の EC2 インスタンスを選択します。
* **出力オプション** (オプション):
    * **CloudWatch output** チェックボックスをオンにして、問題をログに記録します。
* **他のセクション** (オプション):
    * 他のセクションはセットアップに応じて変更します。

**Run** ボタンをクリックすると、ステータスを示す確認ページが表示されます。終了後に、Datadog で[インフラストラクチャーリスト](https://app.datadoghq.com/infrastructure)をチェックします。

### ログの収集

[Datadog Agent][8] または別の[ログシッパー][9]を使用して、Datadog にログを送信します。
## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_ec2" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

**注**: Datadog - EC2 インテグレーションは、デフォルトでは `aws.ec2.instance_age` を収集しません。このメトリクスの収集を有効にするには、[Datadog のサポートチーム][11]までお問い合わせください。

### サービスのチェック
AWS EC2 インテグレーションには、サービスのチェック機能は含まれません。

### イベント
AWS EC2 インテグレーションには、インスタンスの警告と共に、スケジュール設定されたメンテナンスと次回のメンテナンスのイベントが含まれます。以下はイベントの例です。

{{< img src="integrations/amazon_ec2/aws_ec2_events.png" alt="AWS EC2 Events" >}}

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

## その他の参考資料

* [EC2 監視のキーメトリクス][13]
* [EC2 メトリクスの収集方法][14]
* [Datadog で EC2 インスタンスを監視する方法][15]


[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ec2.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_ec2
[6]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[7]: https://app.datadoghq.com/monitors#downtime
[8]: https://docs.datadoghq.com/ja/logs
[9]: https://docs.datadoghq.com/ja/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/amazon_ec2_metadata.csv
[11]: https://docs.datadoghq.com/ja/help
[12]: https://docs.datadoghq.com/ja/help
[13]: https://www.datadoghq.com/blog/ec2-monitoring
[14]: https://www.datadoghq.com/blog/collecting-ec2-metrics
[15]: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog


{{< get-dependencies >}}