---
categories:
- AWS
- クラウド
- data stores
- ログの収集
dependencies: []
description: AWS Elemental MediaStore のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_mediastore/
draft: false
git_integration_title: amazon_mediastore
has_logo: true
integration_id: ''
integration_title: AWS Elemental MediaStore
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_mediastore
public_title: Datadog-AWS Elemental MediaStore インテグレーション
short_description: AWS Elemental MediaStore のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS Elemental MediaStore は、メディア向けに最適化された AWS のストレージサービスです。

このインテグレーションを有効にすると、Datadog にすべての AWS Elemental MediaStore メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]で、メトリクスコレクションの下にある `MediaStore` にチェックが入っていることを
   確認します。
2. [Datadog - AWS Elemental MediaStore インテグレーション][3]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_mediastore" >}}


### ヘルプ

AWS Elemental MediaStore インテグレーションには、イベントは含まれません。

### ヘルプ

AWS Elemental MediaStore インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediastore
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediastore/amazon_mediastore_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/