---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon Elemental MediaPackage のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_mediapackage/'
git_integration_title: amazon_mediapackage
has_logo: true
integration_title: Amazon Elemental MediaPackage
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_mediapackage
public_title: Datadog-Amazon Elemental MediaPackage インテグレーション
short_description: Amazon Elemental MediaPackage のキーメトリクスを追跡
version: 1
---
## 概要
Amazon Elemental MediaPackage は、さまざまな再生デバイスに安全性、拡張性、信頼性の高いビデオストリームを配信するジャストインタイムのビデオパッケージングおよびオリジネーションサービスです。

このインテグレーションを有効にすると、Datadog にすべての Elemental MediaPackage メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`MediaPackage` をオンにします。

2. [Datadog - Amazon Elemental MediaPackage インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_mediapackage" >}}


### イベント
Amazon Elemental MediaPackage インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon Elemental MediaPackage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-mediapackage
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediapackage/amazon_mediapackage_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}