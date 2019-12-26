---
categories:
  - クラウド
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud Dataproc のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_dataproc/'
git_integration_title: google_cloud_dataproc
has_logo: true
integration_title: Google Cloud Dataproc
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_dataproc
public_title: Datadog-Google Cloud Dataproc インテグレーション
short_description: Google Cloud Dataproc のキーメトリクスを追跡
version: 1
---
## 概要
Google Cloud Dataproc は、Apache Spark と Apache Hadoop のクラスターを簡単かつコスト効率よく実行するための高速で使いやすいフルマネージド型のクラウドサービスです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Dataproc からメトリクスを収集できます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_dataproc" >}}


### イベント
Google Cloud Dataproc インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Dataproc インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_dataproc/google_cloud_dataproc_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}