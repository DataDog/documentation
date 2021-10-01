---
aliases:
  - /ja/integrations/awswaf/
categories:
  - cloud
  - security
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: 許可およびブロックされたリクエストを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_waf/
draft: false
git_integration_title: amazon_waf
has_logo: true
integration_id: amazon-waf
integration_title: Amazon Web Application Firewall
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_waf
public_title: Datadog-Amazon Web Application Firewall インテグレーション
short_description: 許可およびブロックされたリクエストを追跡。
version: '1.0'
---
## 概要

AWS WAF は、一般的な Web エクスプロイトから Web アプリケーションを保護するために役立つ Web アプリケーションファイアウォールです。

このインテグレーションを有効にすると、WAF メトリクスを Datadog に表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクスの収集で、`WAF` にチェックが入っていることを確認します。新規の [WAFV2][3] エンドポイントを使用している場合は、メトリクスの収集で、`WAFV2` にチェックが入っていることを確認します。

2. [Datadog - AWS WAF インテグレーション][4]をインストールします。

### ログの収集

#### 監査ログ

Web Application Firewall 監査ログを有効にして、Web ACL で分析されたトラフィックに関する詳細情報を取得します。

1. `aws-waf-logs-` で始まる名前で `Amazon Kinesis Data Firehose` を作成します。
2. `Amazon Kinesis Data Firehose` の送信先として `Amazon S3` を選択し、プレフィックスとして `waf` を追加します。
3. 必要な Web ACL を選択し、そのログを新しく作成した Firehose に送信します ([詳細な手順はこちら][5])。

これで、WAF ログが収集され、S3 バケットに送信されます。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][6]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで WAF ログを含む S3 バケットに手動でトリガーを追加します。Lambda で、トリガーリストから S3 をクリックします。
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 トリガーコンフィギュレーション" popup="true" style="width:70%;">}}
   WAF ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更して、Add ボタンをクリックします。
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda トリガーコンフィギュレーション" popup="true" style="width:70%;">}}

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_waf" >}}


**注**: WAF の CloudWatch メトリクス API の履歴形式により、`aws.waf.*` と `waf.*` の両メトリクスが報告されます。

AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS WAF インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS WAF インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.aws.amazon.com/waf/latest/APIReference/Welcome.html
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_waf
[5]: https://docs.aws.amazon.com/waf/latest/developerguide/logging.html
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#set-up-the-datadog-lambda-function
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_waf/amazon_waf_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/