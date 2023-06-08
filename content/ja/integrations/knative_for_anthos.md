---
categories:
- cloud
- 構成 & デプロイ
- コンテナ
- google cloud
- kubernetes
- ログの収集
- オーケストレーション
dependencies: []
description: Knative for Anthos クラスターからメトリクスおよびログを収集し、Datadog で分析
doc_link: https://docs.datadoghq.com/integrations/knative_for_anthos/
draft: false
git_integration_title: knative_for_anthos
has_logo: true
integration_id: knative-for-anthos
integration_title: Knative for Anthos
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: knative_for_anthos
public_title: Datadog- Knative for Anthos インテグレーション
short_description: Knative for Anthos クラスターからメトリクスおよびログを収集し、Datadog で分析
version: '1.0'
---

## 概要

Knative for Anthos は、ハイブリッドおよびマルチクラウド環境のための柔軟なサーバーレス開発プラットフォームです。Knative for Anthos は、[Knative][1] サービスをフルサポートする、Google のマネージドサービスです。

Datadog Google Cloud Platform インテグレーションを使用して、Knative for Anthos からメトリクスを収集できます。

## セットアップ

### メトリクスの収集

#### APM に Datadog Agent を構成する

[Google Cloud Platform インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

Workload Identity を使用してすでに Knative for Anthos サービスを認証している場合は、他に必要な操作はありません。

Workload Identity を有効にしていない場合、Knative メトリクスの収集には Workload Identity を使用するよう変更する必要があります。これには、Kubernetes サービスアカウントと Google サービスアカウントのバインディングと、Workload Identity を使用してメトリクスを回収する各サービスの構成が含まれます。

セットアップの詳しい手順については、[Google Cloud Workload Identity][3] をご覧ください。

### ログの収集

Knative for Anthos は、[サービスログ][4]も公開します。
Knative のログは、Google Cloud Logging を使用して収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。Cloud Pub/Sub をまだセットアップしていない場合は、[HTTP プッシュフォワーダーを使用してセットアップ][5]してください。

これが完了したら、Google Cloud Run のログを Google Cloud Logging から Pub/Sub へエクスポートします。

1. [Knative for Anthos][6] へ移動し、希望するサービスをクリックして **Logs** タブを開きます。
2. **View in Logs Explorer** をクリックして **Google Cloud Logging Page** へ移動します。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "knative_for_anthos" >}}


### イベント

Knative for Anthos インテグレーションには、イベントは含まれません。

### サービスのチェック

Knative for Anthos インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://knative.dev/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[3]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
[4]: https://cloud.google.com/anthos/run/docs/logging
[5]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[6]: https://console.cloud.google.com/anthos/run
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run_for_anthos/google_cloud_run_for_anthos_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/