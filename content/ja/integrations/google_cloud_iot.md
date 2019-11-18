---
categories:
  - クラウド
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud IoT のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_iot/'
git_integration_title: google_cloud_iot
has_logo: true
integration_title: Google Cloud IoT
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_iot
public_title: Datadog-Google Cloud IoT インテグレーション
short_description: Google Cloud IoT のキーメトリクスを追跡
version: 1
---
## 概要
Cloud IoT は、世界中に分散した数百万のデバイスの接続、管理、データの取り込みを簡単かつ安全に行うことができるフルマネージド型のサービスです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud IoT からメトリクスを収集できます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_iot" >}}


### イベント
Google Cloud IoT インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud IoT インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_iot/google_cloud_iot_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}