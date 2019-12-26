---
categories:
  - クラウド
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud Tasks のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_tasks/'
git_integration_title: google_cloud_tasks
has_logo: true
integration_title: Google Cloud Tasks
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_tasks
public_title: Datadog-Google Cloud Tasks インテグレーション
short_description: Google Cloud Tasks のキーメトリクスを追跡
version: 1
---
## 概要
Google Cloud Tasks は、大量の分散タスクの実行、ディスパッチ、配布を管理できるフルマネージド型のサービスです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Tasks からメトリクスを収集できます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_tasks" >}}


### イベント
Google Cloud Tasks インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Tasks インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_tasks/google_cloud_tasks_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}