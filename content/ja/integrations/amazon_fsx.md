---
categories:
- AWS
- クラウド
- data stores
- ログの収集
dependencies: []
description: Amazon FSx のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_fsx/
draft: false
git_integration_title: amazon_fsx
has_logo: true
integration_id: ''
integration_title: Amazon FSx
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_fsx
public_title: Datadog-Amazon FSx インテグレーション
short_description: Amazon FSx のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon FSx は、NetApp ONTAP、OpenZFS、Windows File Server、Lustre ファイルシステム用のスケーラブルなストレージを提供するフルマネージドサービスです。

このインテグレーションを有効にすると、Datadog にすべての FSx メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `FSx` が有効になっていることを確認します。
2. Amazon FSx のメトリクスを収集するために、以下のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    | AWS アクセス許可                          | 説明                                                                                                                                                                                                                                             |
    | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `fsx:ListTagsForResource`               | FSx カスタムタグを追加するために使用されます。                                                                                                                                                                                                                    |
    | `fsx:DescribeFileSystems`               | ストレージおよびスループット容量を提供するために使用されます。                                                                                                                                                                                    |

2. [Datadog - Amazon FSx インテグレーション][4]をインストールします。


### 収集データ

#### FSx for Windows ファイルサーバーのイベントログを監査する
個々のファイル、フォルダー、およびファイル共有へのすべてのユーザーアクセスを追跡するには、FSx for Windows ファイルサーバーからの監査イベントログを統合します。

1. ファイルシステムの[ファイルアクセス監査機能を有効][5]にして、ログを CloudWatch に送信します。
2. [Datadog ログコレクション AWS Lambda 関数][4] (バージョン 3.35.0+) をまだ設定していない場合は、設定を行ってください。
3. Lambda 関数をインストールしたら、AWS コンソールで `/aws/fsx/windows` CloudWatch ロググループにトリガーを手動で追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="CloudWatch Logs グループ" popup="true" style="width:70%;">}}
   対応する CloudWatch ロググループを選択し、フィルター名を追加して (空にすることも可能)、トリガーを追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Cloudwatch トリガー" popup="true" style="width:70%;">}}
4. Datadog Log セクション][6]に移動し、ログを確認します。

**注**: [Amazon Data Firehose][7] を使用してこれらのログを Datadog に送信することもできますが、同じログパース機能と検索エクスペリエンスを得るには、カスタムログ[プロセッサー][8]を作成する必要があります。


#### FSx API アクティビティ

Amazon FSx は、ユーザー、ロール、または AWS サービスにより実行されたすべての FSx 操作を追跡する AWS CloudTrail と統合します。 
Datadogの [CloudTrail インテグレーション][9]を有効にすると、AWS アカウントのすべての FSx API 呼び出しを追跡できます。

### データセキュリティ
{{< get-metrics-from-git "amazon_fsx" >}}


### ヘルプ

Amazon FSx インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon FSx インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-fsx
[5]: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/file-access-auditing.html#faa-log-destinations
[6]: https://app.datadoghq.com/logs
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream
[8]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui
[9]: https://docs.datadoghq.com/ja/integrations/amazon_cloudtrail/#log-collection
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_fsx/amazon_fsx_metadata.csv
[11]: https://docs.datadoghq.com/ja/help/