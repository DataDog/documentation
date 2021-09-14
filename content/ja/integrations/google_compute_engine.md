---
categories:
  - cloud
  - os & system
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: ビジー状態のインスタンスを追跡し、アカウント使用状況メトリクスを割り当て制限と比較
doc_link: https://docs.datadoghq.com/integrations/google_compute_engine/
draft: false
git_integration_title: google_compute_engine
has_logo: true
integration_id: google-compute-engine
integration_title: Google Compute Engine
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_compute_engine
public_title: Datadog-Google Compute Engine インテグレーション
short_description: ビジー状態のインスタンスを追跡し、アカウント使用状況メトリクスを割り当て制限と比較
version: '1.0'
---
## 概要

Google Cloud Compute Engine は、Google の革新的なデータセンターと世界規模のファイバーネットワーク内で実行される仮想マシンを提供します。

Google Compute Engine からメトリクスを取得して、以下のことができます。

- Compute Engine のパフォーマンスを視覚化できます。
- Compute Engine のパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ

### メトリクスの収集

#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

#### コンフィギュレーション

カスタム Compute Engine ラベルをタグとして収集するには、Cloud Asset Inventory のアクセス権を有効にします。

### ログの収集

Google Compute Engine のログは Stackdriver により収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。[HTTP プッシュフォワーダーを使用した Cloud Pub/Sub][2] をまだセットアップしていない場合は、これをセットアップしてください。

これが完了したら、Google Compute Engine のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver のページ][3]に移動し、Google Compute Engine のログを絞り込みます。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

### コンフィギュレーション

#### ホスト収集の制限

Datadog を使用して GCE インスタンスの一部のみを監視する場合は、監視対象の GCE インスタンスに `datadog:true` などの GCE ラベルを割り当てます。次に、[Datadog GCP インテグレーションタイル][4]の **Optionally limit metrics collection** テキストボックスで、そのタグを指定します。タグで仮想マシンを絞り込む方法の詳細については、[Google Cloud Platform のドキュメント][5]を参照してください。

#### GCE オートミュート

Datadog は、GCE API からのホストステータスに基づいて、Google Compute Engine (GCE) インスタンスの手動シャットダウンや GCE オートスケーリングによってトリガーされるインスタンスの停止に関連するモニターを事前にミュートすることができます。オートミュートされた GCE インスタンスは、[モニターのダウンタイム][6]ページで **Show automatically muted hosts** をオンにするとリストされます。

GCE インスタンスのシャットダウンが予期される場合にモニターをオフにするには、[Google Cloud Platform インテグレーションタイル][1]で **GCE automuting** チェックボックスをオンにします。

{{< img src="integrations/google_compute_engine/gce_automuting.png" alt="GCE オートミュート" >}}

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_compute_engine" >}}


### イベント

Google Cloud Compute Engine インテグレーションには、イベントは含まれません。

### サービスのチェック

Google Cloud Compute Engine インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

-   [Google Compute Engine のメトリクスの監視][9]  
-   [Google Compute Engine のメトリクスの収集方法][10]
-   [Datadog を使用した Google Compute Engine の監視方法][11]

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[5]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#configuration
[6]: https://app.datadoghq.com/monitors#downtime
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_compute_engine/google_compute_engine_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://www.datadoghq.com/blog/monitoring-google-compute-engine-performance
[10]: https://www.datadoghq.com/blog/how-to-collect-gce-metrics
[11]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog