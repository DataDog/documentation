---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon Rekognition のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_rekognition/'
git_integration_title: amazon_rekognition
has_logo: true
integration_title: Amazon Rekognition
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_rekognition
public_title: Datadog-Amazon Rekognition インテグレーション
short_description: Amazon Rekognition のキーメトリクスを追跡
version: 1
---
## 概要
Amazon Rekognition を使用すると、イメージ分析やビデオ分析をアプリケーションに簡単に追加することができます。Rekognition API にイメージやビデオを与えるだけで、このサービスがモノ、人物、テキスト、シーン、アクティビティを識別します。

このインテグレーションを有効にすると、Datadog にすべての Rekognition メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Rekognition` をオンにします。

2. [Datadog - Amazon Rekognition インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_rekognition" >}}


### イベント
Amazon Rekognition インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon Rekognition インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-rekognition
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rekognition/amazon_rekognition_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}