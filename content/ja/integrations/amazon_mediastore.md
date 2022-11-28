---
categories:
- クラウド
- AWS
- ログの収集
dependencies: []
description: Amazon Elemental MediaStore のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_mediastore/
draft: false
git_integration_title: amazon_mediastore
has_logo: true
integration_id: amazon-mediastore
integration_title: Amazon Elemental MediaStore
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_mediastore
public_title: Datadog-Amazon Elemental MediaStore インテグレーション
short_description: Amazon Elemental MediaStore のキーメトリクスを追跡
version: '1.0'
---


## 概要

AWS Elemental MediaStore は、メディア向けに最適化された AWS のストレージサービスです。

このインテグレーションを有効にすると、Datadog にすべての MediaStore メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]で、メトリクスコレクションの下にある `MediaStore` にチェックが入っていることを
   確認します。
2. [Datadog - MediaStore インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_mediastore" >}}


### イベント

MediaStore インテグレーションには、イベントは含まれません。

### サービスのチェック

MediaStore インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-mediastore
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediastore/amazon_mediastore_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/