---
categories:
  - ログの収集
  - セキュリティ
ddtype: crawler
description: Carbon Black Defense ログを収集する
doc_link: https://docs.datadoghq.com/integrations/carbon_black/
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/carbon_black.md
has_logo: true
integration_title: Carbon Black
is_public: true
name: carbon_black
public_title: Datadog-Carbon Black インテグレーション
short_description: Carbon Black Defense ログを収集する
version: '1.0'
integration_id: carbonblack
---
## 概要

Datadog-Carbon Black インテグレーションを使用して、Carbon Black EDR のイベントとアラートを Datadog ログとして転送します。


## セットアップ

### インストール

Datadog は、Carbon Black のイベントフォワーダーと Datadog の Lambda フォワーダーを使用して、S3 バケットから Carbon Black のイベントとアラートを収集します。

Carbon Black は、Carbon Black イベントフォワーダーの作成に使用する API の [Postman コレクション][1]を提供します。

#### コンフィギュレーション

1. [Datadog Forwarder][2] をインストールします。
2. [AWS Management Console にバケットを作成][3]して、イベントを転送します。
3. [Carbon Black フォワーダーがデータを書き込めるように S3 バケットを構成します][4]。
   - **重要**: S3 バケットには、CB イベントが発生するキーワード `carbon-black` のプレフィックスが必要です。これにより、Datadog はログのソースを正しく認識できます。
5. [Carbon Black Cloud コンソールでアクセスレベルを作成します][5]。
6. [Carbon Black Cloud コンソールで API キーを作成します][6]。
7. 上記で作成したキーを使用して次の Postman 環境変数の値を更新することにより、[Postman で API を構成します][7]: `cb_url`、`cb_org_key`、`cb_custom_id`、`cb_custom_key`
8. Carbon Black アラート (`"type": "alert"`) とエンドポイントイベント (`"type": "endpoint.event"`) の名前が異なる [2 つの Carbon Black イベントフォワーダーを作成][8]します。
9. [S3 バケットでトリガーするように Datadog Forwarder をセットアップします][9]。


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://documenter.getpostman.com/view/7740922/SWE9YGSs?version=latest
[2]: /ja/serverless/libraries_integrations/forwarder/
[3]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-a-bucket
[4]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#configure-bucket-to-write-events
[5]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-access-level
[6]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-new-api-key
[7]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#configure-api-in-postman
[8]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-new-forwarder
[9]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[10]: /ja/help/