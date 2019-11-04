---
categories:
  - クラウド
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud APIs のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_apis/'
git_integration_title: google_cloud_apis
has_logo: true
integration_title: Google Cloud APIs
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_apis
public_title: Datadog-Google Cloud APIs インテグレーション
short_description: Google Cloud APIs のキーメトリクスを追跡
version: 1
---
## 概要
Google Cloud APIs を使用すると、Google Cloud Platform 製品にコードからアクセスできます。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud APIs からメトリクスを収集できます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_apis" >}}


### イベント
Google Cloud APIs インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud APIs インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_apis/google_cloud_apis_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}