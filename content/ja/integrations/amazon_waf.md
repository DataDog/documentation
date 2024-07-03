---
aliases:
- /ja/integrations/awswaf/
categories:
- cloud
- security
- aws
- log collection
custom_kind: インテグレーション
dependencies: []
description: 許可およびブロックされたリクエストを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_waf/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/aws-waf-metrics/
  tag: ブログ
  text: Key metrics for monitoring AWS WAF
- link: https://www.datadoghq.com/blog/aws-waf-monitoring-tools/
  tag: ブログ
  text: Tools for collecting AWS WAF data
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: ブログ
  text: Monitor AWS WAF activity with Datadog
git_integration_title: amazon_waf
has_logo: true
integration_id: ''
integration_title: AWS WAF
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_waf
public_title: Datadog-AWS WAF インテグレーション
short_description: 許可およびブロックされたリクエストを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS WAF は、一般的な Web エクスプロイトから Web アプリケーションを保護するために役立つ Web アプリケーションファイアウォールです。

このインテグレーションを有効にすると、WAF メトリクスを Datadog に表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、使用しているエンドポイントに応じて、`Metric Collection` タブで `WAF` または `WAFV2` が有効になっていることを確認します。

2. [Datadog - AWS WAF インテグレーション][3]をインストールします。

### ログ収集

#### 監査ログ

Web Application Firewall 監査ログを有効にして、Web ACL で分析されたトラフィックに関する詳細情報を取得します。

1. `aws-waf-logs-` から始まる名前で `Amazon Data Firehose` を作成します。
2. `Amazon Data Firehose` の送信先で `Amazon S3` を選択し、`waf` をプレフィックスとして必ず追加してください。
3. 必要な Web ACL を選択し、そのログを新しく作成した Firehose に送信します ([詳細な手順はこちら][4])。

WAF ログが収集され、S3 バケットに送信されます。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][5]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで WAF ログを含む S3 バケットに手動でトリガーを追加します。Lambda で、トリガーリストから S3 をクリックします。
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 トリガーコンフィギュレーション" popup="true" style="width:70%;">}}
   WAF ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更して、Add ボタンをクリックします。
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda トリガーコンフィギュレーション" popup="true" style="width:70%;">}}

**注**: Datadog Lambda Forwarder は、WAF ログのネストされたオブジェクトの配列を、使いやすいように自動的に `key:value` 形式に変換します。

## データ収集

### Metrics
{{< get-metrics-from-git "amazon_waf" >}}


**注**: WAF の CloudWatch メトリクス API の履歴形式により、`aws.waf.*` と `waf.*` の両メトリクスが報告されます。

AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS WAF インテグレーションには、イベントは含まれません。

### サービスチェック

AWS WAF インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-waf
[4]: https://docs.aws.amazon.com/waf/latest/developerguide/logging.html
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_waf/amazon_waf_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/