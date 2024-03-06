---
aliases:
- /ja/integrations/awsses/
categories:
- aws
- cloud
- log collection
dependencies: []
description: メールのバウンス、配信の試行、メッセージの拒否などを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_ses/
draft: false
git_integration_title: amazon_ses
has_logo: true
integration_id: ''
integration_title: Amazon Simple Email Service (SES)
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_ses
public_title: Datadog-Amazon Simple Email Service (SES) インテグレーション
short_description: メールのバウンス、配信の試行、メッセージの拒否などを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Simple Email Service (SES) は、費用効率の高いアウトバウンド専用のメール送信サービスです。

このインテグレーションを有効にすると、Datadog にすべての SES メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `SES` が有効になっていることを確認します。
2. Amazon SES のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `ses:GetSendQuota`: 送信クオータに関するメトリクスを追加します。
    - `ses:GetSendStatistics`: 送信統計に関するメトリクスを追加します。

    詳細については、AWS ウェブサイト上の [SES ポリシー][4]を参照してください。

3. [Datadog - Amazon Simple Email Service (SES) インテグレーション][5]をインストールします。

### 収集データ

#### ログの有効化

Amazon SES から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_ses` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][6]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon SES ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][7]
    - [CloudWatch ロググループに手動トリガーを追加][8]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_ses" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

Amazon Simple Email Service (SES) インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Simple Email Service (SES) インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/ses/latest/dg/control-user-access.html
[5]: https://app.datadoghq.com/integrations/amazon-ses
[6]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ses/amazon_ses_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/