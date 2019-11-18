---
categories:
  - データストア
  - クラウド
ddtype: クローラー
dependencies: []
description: MongoDB Atlas は、算出メトリクスを Datadog にプッシュして、アラートパフォーマンスを視覚化できます
doc_link: 'https://docs.datadoghq.com/integrations/mongodb_atlas/'
git_integration_title: mongodb_atlas
has_logo: true
integration_title: MongoDB Atlas
is_public: true
kind: インテグレーション
manifest_version: 1
name: mongodb_atlas
public_title: Datadog-MongoDB Atlas インテグレーション
short_description: MongoDB Atlas は、算出メトリクスを Datadog にプッシュできます
version: 1
---
## 概要

MongoDB Atlas は、算出メトリクスを Datadog にプッシュして、以下のことができます。

* MongoDB Atlas のキーメトリクスを視覚化できます。
* MongoDB Atlas のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

## セットアップ

### インストール

MongoDB Atlas インテグレーションは、Atlas ポータルにログインすることによってインストールできます。

### コンフィグレーション

1. Datadog [API キー][1]を取得または作成します。
2. Atlas ポータルの **Integrations** -> **Datadog Settings** で、Datadog API キーを入力します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mongodb_atlas" >}}


### イベント
MongoDB Atlas は、Datadog に[アラート][3]をイベントとしてプッシュできます。

### サービスのチェック
MongoDB Atlas インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/mongodb_atlas/mongodb_atlas_metadata.csv
[3]: https://www.mongodb.com/blog/post/push-your-mongodb-atlas-alerts-to-datadog
[4]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}