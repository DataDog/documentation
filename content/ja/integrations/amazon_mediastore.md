---
categories:
- AWS
- クラウド
- data store
- ログの収集
dependencies: []
description: AWS Elemental MediaStore のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_mediastore/
draft: false
git_integration_title: amazon_mediastore
has_logo: true
integration_id: amazon-mediastore
integration_title: AWS Elemental MediaStore
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_mediastore
public_title: Datadog-AWS Elemental MediaStore インテグレーション
short_description: AWS Elemental MediaStore のキーメトリクスを追跡します。
version: '1.0'
---

## 概要

AWS Elemental MediaStore は、メディア向けに最適化された AWS のストレージサービスです。

このインテグレーションを有効にすると、Datadog にすべての AWS Elemental MediaStore メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]で、メトリクスコレクションの下にある `MediaStore` にチェックが入っていることを
   確認します。
2. [Datadog - AWS Elemental MediaStore インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_mediastore" >}}


### イベント

AWS Elemental MediaStore インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Elemental MediaStore インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-mediastore
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediastore/amazon_mediastore_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/