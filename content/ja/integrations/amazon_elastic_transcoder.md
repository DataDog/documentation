---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon Elastic Transcoder のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_elastic_transcoder/'
git_integration_title: amazon_elastic_transcoder
has_logo: true
integration_title: Amazon Elastic Transcoder
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_elastic_transcoder
public_title: Datadog-Amazon Elastic Transcoder インテグレーション
short_description: Amazon Elastic Transcoder のキーメトリクスを追跡
version: 1
---
## 概要
Amazon Elastic Transcoder を使用すると、Amazon S3 に保存したメディアファイルを、市販再生デバイスに対応した形式のメディアファイルに変換できます。

このインテグレーションを有効にすると、Datadog にすべての Elastic Transcoder メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`ElasticTranscoder` をオンにします。

2. [Datadog - Amazon Elastic Transcoder インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_elastic_transcoder" >}}


### イベント
Amazon Elastic Transcoder インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon Elastic Transcoder インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-elastic-transcoder
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_elastic_transcoder/amazon_elastic_transcoder_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}