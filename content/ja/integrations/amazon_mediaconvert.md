---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon Elemental MediaConvert のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_mediaconvert/'
git_integration_title: amazon_mediaconvert
has_logo: true
integration_title: Amazon Elemental MediaConvert
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_mediaconvert
public_title: Datadog-Amazon Elemental MediaConvert インテグレーション
short_description: Amazon Elemental MediaConvert のキーメトリクスを追跡
version: 1
---
## 概要
Amazon Elemental MediaConvert は、オフラインビデオコンテンツをテレビや接続デバイスへの配信用にフォーマットして圧縮するサービスです。

このインテグレーションを有効にすると、Datadog にすべての Elemental MediaConvert メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`MediaConvert` をオンにします。

2. [Datadog - Amazon Elemental MediaConvert インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_mediaconvert" >}}


### イベント
Amazon Elemental MediaConvert インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon Elemental MediaConvert インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-mediaconvert
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediaconvert/amazon_mediaconvert_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}