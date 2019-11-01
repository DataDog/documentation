---
categories:
  - cloud
  - os & system
  - google cloud
  - log collection
ddtype: クローラー
dependencies: []
description: ビジー状態のインスタンスを追跡し、アカウント使用状況メトリクスを割り当て制限と比較
doc_link: 'https://docs.datadoghq.com/integrations/google_compute_engine/'
git_integration_title: google_compute_engine
has_logo: true
integration_title: Google Compute Engine
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_compute_engine
public_title: Datadog-Google Compute Engine インテグレーション
short_description: ビジー状態のインスタンスを追跡し、アカウント使用状況メトリクスを割り当て制限と比較 limits.
version: '1.0'
---
## 概要
Google Cloud Compute Engine は、Google の革新的なデータセンターと世界規模のファイバーネットワーク内で実行される仮想マシンを提供します。

Google Compute Engine からメトリクスを取得して、以下のことができます。

* Compute Engine のパフォーマンスを視覚化できます。
* Compute Engine のパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### メトリクスの収集
#### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

### ログの収集

Google Compute Engine のログは、Stackdriver を使用して収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。Cloud Pub/Sub をまだセットアップしていない場合は、[HTTP プッシュフォワーダーを使用してセットアップ][10]してください。

これが完了したら、Google Compute Engine のログを Stackdriver から Pub/Sub へエクスポートします。

1. [Stackdriver のページ][11]に移動し、Google Compute Engine のログを絞り込みます。
2. **エクスポートを作成**をクリックし、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクトに置くこともできます。

{{< img src="integrations/google_compute_engine/export_gce_instance.png" alt="Export Google Compute Engine Logs to Pub Sub" responsive="true">}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

### コンフィグレーション
#### ホスト収集の制限

Datadog を使用して GCE インスタンスの一部のみを監視する場合は、監視対象の GCE インスタンスに `datadog:true` などの GCE ラベルを割り当てます。次に、[Datadog GCP インテグレーションタイル][2]の **Optionally limit metrics collection** テキストボックスで、そのタグを指定します。タグで仮想マシンを絞り込む方法の詳細については、[Google Cloud Platform のドキュメント][3]を参照してください。

#### GCE オートミュート

Datadog は、GCE API からのホストステータスに基づいて、Google Compute Engine (GCE) インスタンスの手動シャットダウンや GCE オートスケーリングによってトリガーされるインスタンスの停止に関連するモニターを事前にミュートすることができます。オートミュートされた GCE インスタンスは、[モニターのダウンタイム][4]ページで **Show automatically muted hosts** をオンにするとリストされます。

GCE インスタンスのシャットダウンが予期される場合にモニターをオフにするには、[Google Cloud Platform インテグレーションタイル][1]で **GCE automuting** チェックボックスをオンにします。

{{< img src="integrations/google_compute_engine/gce_automuting.png" alt="GCE Automuting" responsive="true">}}

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_compute_engine" >}}


### イベント
Google Cloud Compute Engine インテグレーションには、イベントは含まれません。

### サービスのチェック
Google Cloud Compute Engine インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

* [Google Compute Engine のメトリクスの監視][7]  
* [Google Compute Engine のメトリクスの収集方法][8]  
* [Datadog を使用した Google Compute Engine の監視方法][9]  


[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[3]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#configuration
[4]: https://app.datadoghq.com/monitors#downtime
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/google_compute_engine/google_compute_engine_metadata.csv
[6]: https://docs.datadoghq.com/ja/help
[7]: https://www.datadoghq.com/blog/monitoring-google-compute-engine-performance
[8]: https://www.datadoghq.com/blog/how-to-collect-gce-metrics
[9]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog
[10]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[11]: https://console.cloud.google.com/logs/viewer


{{< get-dependencies >}}