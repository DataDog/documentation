---
categories:
  - cloud
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud Machine Learning のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_ml/'
git_integration_title: google_cloud_ml
has_logo: true
integration_title: Google Machine Learning
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_ml
public_title: Datadog-Google Machine Learning インテグレーション
short_description: Google Cloud Machine Learning のキーメトリクスを追跡
version: '1.0'
---
## 概要
Google Cloud Machine Learning は、あらゆるサイズおよび種類のデータに対して機能する機械学習モデルを簡単に構築できるマネージド型のサービスです。

Google Machine Learning からメトリクスを取得して、以下のことができます。

* 機械学習サービスのパフォーマンスを視覚化できます。
* 機械学習サービスのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_ml" >}}


### イベント
Google Cloud Machine Learning インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Machine Learning インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_ml/google_cloud_ml_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}