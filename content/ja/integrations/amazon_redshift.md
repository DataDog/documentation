---
aliases:
  - /ja/integrations/awsredshift/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Amazon Redshift のキーメトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_redshift/'
draft: false
git_integration_title: amazon_redshift
has_logo: true
integration_id: amazon-redshift
integration_title: Amazon Redshift
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_redshift
public_title: Datadog-Amazon Redshift インテグレーション
short_description: Amazon Redshift のキーメトリクスを追跡。
version: '1.0'
---
## 概要

Amazon Redshift は、ペタバイトスケールの高速なフルマネージド型データウェアハウスサービスです。あらゆるデータをシンプルかつコスト効率よく能率的に分析できます。

このインテグレーションを有効にすると、Datadog にすべての Redshift メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Redshift` をオンにします。
2. Amazon Redshift のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `redshift:DescribeClusters`: アカウント内のすべての Redshift クラスターを一覧表示します。
    - `redshift:DescribeLoggingStatus`: Redshift ログが格納されている S3 バケットを取得します。
    - `tag:GetResources`: Redshift クラスターのカスタムタグを取得します。

    Redshift ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

3. [Datadog - AWS Redshift インテグレーション][5]をインストールします。

### ログの収集

#### ログの有効化

ログを収集するには、まず Redshift Cluster でログを有効にします。Redshift ログを AWS S3 バケットに書き込み、[Lambda 関数で使用][6]します。[詳細については、AWS のドキュメントを参照してください][7]。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][8]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、Redshift ログを収集する方法を以下の 2 つから選択します。

    - 自動: 必要なアクセス許可を Datadog に提供していただくことで、Datadog が Redshift ログを管理します。[自動ログ収集を構成するには、メイン Amazon Web サービスを参照してください][9]。
    - 手動: AWS コンソールで Redshift ログを含む S3 バケットに手動でトリガーを追加します。

#### 手動インストールの手順

1. [Datadog ログコレクション AWS Lambda 関数][8]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで Redshift ログを含む S3 バケットに手動でトリガーを追加します。Lambda で、トリガーリストから S3 をクリックします。
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 トリガーコンフィギュレーション" popup="true" style="width:70%;">}}
   Redshift ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更して、Add ボタンをクリックします。
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda トリガーコンフィギュレーション" popup="true" style="width:70%;">}}

完了したら、[Datadog Log セクション][10]に移動し、ログを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_redshift" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS Redshift インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Redshift インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_redshift.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_redshift
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[7]: https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing-console.html
[8]: /ja/integrations/amazon_web_services/#create-a-new-lambda-function
[9]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#collecting-logs-from-s3
[10]: https://app.datadoghq.com/logs
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_redshift/amazon_redshift_metadata.csv
[12]: https://docs.datadoghq.com/ja/help/