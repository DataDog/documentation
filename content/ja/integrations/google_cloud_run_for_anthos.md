---
categories:
- cloud
- orchestration
- google cloud
- ログの収集
dependencies: []
description: Cloud Run for Anthos クラスターからメトリクスおよびログを収集し、Datadog で分析
doc_link: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
draft: false
further_reading:
- link: https://docs.datadoghq.com/integrations/google_cloud_run/
  tag: ドキュメント
  text: Google Cloud Run インテグレーション
git_integration_title: google_cloud_run_for_anthos
has_logo: true
integration_id: google-cloud-run-for-anthos
integration_title: Google Cloud Run for Anthos
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_run_for_anthos
public_title: Datadog-Google Cloud Run for Anthos インテグレーション
short_description: Cloud Run for Anthos クラスターからメトリクスおよびログを収集し、Datadog で分析。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud Run for Anthos は、ハイブリッドおよびマルチクラウド環境のための柔軟なサーバーレス開発プラットフォームです。Cloud Run for Anthos は、[Knative][1] サービスをフルサポートする、Google のマネージドサービスです。フルマネージドの Google Cloud をご利用の場合は、[Google Cloud Run ドキュメント][2]をご参照ください。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud Run for Anthos からメトリクスを収集できます。

## 計画と使用

### メトリクスの収集

#### インフラストラクチャーリスト

[Google Cloud Platform インテグレーション][3]をまだセットアップしていない場合は、最初にセットアップします。

Workload Identity を使用してすでに Cloud Run for Anthos サービスを認証している場合は、他に必要な操作はありません。

Workload Identity を有効にしていない場合、Knative メトリクスの収集には Workload Identity を使用するよう変更する必要があります。これには、Kubernetes サービスアカウントと Google サービスアカウントのバインディングと、Workload Identity を使用してメトリクスを回収する各サービスの構成が含まれます。

セットアップの詳しい手順については、[Google Cloud Workload Identity][4] をご覧ください。

### 収集データ

Google Cloud Run for Anthos は[サービスログ][5]も公開します。
Google Cloud Run のログは Google Cloud Logging で収集し、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信することができます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][6]。

これが完了したら、Google Cloud Run のログを Google Cloud Logging から Pub/Sub トピックへエクスポートします。

1. [Cloud Run for Anthos][7] へ移動し、希望するサービスをクリックして **Logs** タブを開きます。
2. **View in Logs Explorer** をクリックして **Google Cloud Logging Page** へ移動します。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. 宛先として "Cloud Pub/Sub" を選択し、その目的で作成された Pub/Sub トピックを選択します。**注**: Pub/Sub トピックは別のプロジェクトに配置できます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

### トレースとカスタムメトリクス
[Datadog Admission Controller][8] を使用して、APM トレーサーと DogStatsD クライアントを自動的に構成します。次のいずれかの方法を使用して、`DD_AGENT_HOST` および `DD_ENTITY_ID` の環境変数を挿入します。

- `admission.datadoghq.com/enabled: "true"` ラベルをポッドに追加する。
- `mutateUnlabelled: true` を設定して Cluster Agent の Admission Controller を構成します。

ポッドで環境変数を受信しないようにするには、`admission.datadoghq.com/enabled: "false"` ラベルを追加します。これは `mutateUnlabelled: true` を設定している場合でも機能します。詳細については、[Datadog Admission Controller][8] のドキュメントを参照してください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_cloud_run_for_anthos" >}}


### ヘルプ

Google Cloud Run for Anthos インテグレーションには、イベントは含まれません。

### ヘルプ

Google Cloud Run for Anthos インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://knative.dev/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_run/
[3]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
[5]: https://cloud.google.com/anthos/run/docs/logging
[6]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[7]: https://console.cloud.google.com/anthos/run
[8]: https://docs.datadoghq.com/ja/containers/cluster_agent/admission_controller/
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run_for_anthos/google_cloud_run_for_anthos_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/