---
categories:
  - クラウド
  - google cloud
ddtype: クローラー
dependencies: []
description: Google Cloud Composer のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_composer/'
git_integration_title: google_cloud_composer
has_logo: true
integration_title: Google Cloud Composer
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_composer
public_title: Datadog-Google Cloud Composer インテグレーション
short_description: Google Cloud Composer のキーメトリクスを追跡
version: 1
---
## 概要
Google Cloud Composer は、複数のクラウドやオンプレミスデータセンターにまたがるパイプラインの作成、スケジューリング、監視を可能にする、フルマネージド型のワークフローオーケストレーションサービスです。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Composer からメトリクスを収集できます。

## セットアップ
### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_cloud_composer" >}}


### イベント
Google Cloud Composer インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Composer インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_composer/google_cloud_composer_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}