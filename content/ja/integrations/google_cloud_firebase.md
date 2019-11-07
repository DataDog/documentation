---
categories:
  - cloud
  - google cloud
  - web
ddtype: クローラー
dependencies: []
description: Firebase サービスによるネットワークとデータストアの使用量を追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_firebase/'
git_integration_title: google_cloud_firebase
has_logo: true
integration_title: Google Cloud Firebase
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_firebase
public_title: Datadog-Google Cloud Firebase インテグレーション
short_description: Firebase サービスによるネットワークとデータストアの使用量を追跡 services.
version: '1.0'
---
## 概要
Firebase は、高品質のアプリを迅速に開発し、ユーザー基盤を成長させ、収益の増大を可能にするモバイルプラットフォームです。

Google Firebase からメトリクスを取得して、以下のことができます。

* Firebase のデータベースおよびホスティングサービスのパフォーマンスを視覚化できます。
* Firebase ツールのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_firebase" >}}


### イベント
Google Firebase インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Firebase インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firebase/google_cloud_firebase_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}