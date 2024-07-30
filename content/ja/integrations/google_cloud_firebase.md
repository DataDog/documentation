---
categories:
- cloud
- google cloud
- log collection
- mobile
dependencies: []
description: Firebase サービスに関するネットワークとデータストアの使用状況を追跡。
doc_link: https://docs.datadoghq.com/integrations/google_cloud_firebase/
draft: false
git_integration_title: google_cloud_firebase
has_logo: true
integration_id: google-cloud-firebase
integration_title: Google Cloud Firebase
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_firebase
public_title: Datadog-Google Cloud Firebase インテグレーション
short_description: Firebase サービスに関するネットワークとデータストアの使用状況を追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Firebase は、高品質のアプリを迅速に開発し、ユーザー基盤を成長させ、収益の増大を可能にするモバイルプラットフォームです。

Google Firebase からメトリクスを取得して、以下のことができます。

- Firebase のデータベースおよびホスティングサービスのパフォーマンスを視覚化。
- Firebase ツールのパフォーマンスをアプリケーションと関連付け。

## 計画と使用

### インフラストラクチャーリスト

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### 収集データ

Google Firebase のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][2]。

これが完了したら、Google Firebase のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Google Cloud Logging のページ][3]に移動し、Google Firebase のログを絞り込みます。
2. **Create Export** をクリックし、シンクに名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。
4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_cloud_firebase" >}}


### ヘルプ

Google Firebase インテグレーションには、イベントは含まれません。

### ヘルプ

Google Firebase インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firebase/google_cloud_firebase_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/