---
description: Observability Pipelines Worker を使用してログを Google Pub/Sub メッセージングシステムに公開する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Google Pub/Sub 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Google Pub/Sub 送信先を使用してログを Google Pub/Sub メッセージングシステムに公開し、ログを下流のサービス、データレイク、またはカスタムアプリケーションに送信できるようにします。

### この送信先を使用する場合 {#when-to-use-this-destination}

この送信先を使用する一般的なシナリオは以下のとおりです。
- 分析パイプラインの場合: ログを下流の Google BigQuery、データレイク、またはカスタム機械学習ワークフローにルーティングします。
- イベント駆動型処理の場合: ログを Pub/Sub トピックに公開して、Google Cloud Functions、Cloud Run functions、および Dataflow ジョブがログデータに基づいてリアルタイムでアクションを実行できるようにします。

## 前提条件 {#prerequisites}

この送信先を設定する前に以下が必要です。

- Pub/Sub サブスクリプション: Pub/Sub トピックと、メッセージを消費するサブスクリプションを少なくとも 1 つ作成します。
- 認証: [標準の Google Cloud 認証方法][2]を設定します。以下のオプションがあります。
	- サービスアカウントキー (JSON ファイル)
	- Workload Identity (Google Kubernetes Engine (GKE))
- IAM ロール:
	- `roles/pubsub.publisher` は、イベントを公開するために必要です。
	- `roles/pubsub.viewer`は、ヘルスチェックに推奨されます。
		- このロールがない場合、エラー `Healthcheck endpoint forbidden` がログに記録されますが、Worker は通常通り処理を続行します。
	- 詳細については、[利用可能な Pub/Sub のロール][3]を参照してください。

### Worker 用のサービスアカウントを設定する {#set-up-a-service-account-for-the-worker}

Google Cloud のサービスアカウントは、アプリケーションやサービスのみが使用するアカウントの一種です。
- 独自の ID と認証情報 (JSON キーファイル) を持っています。
- 特定のリソースにアクセスできるように IAM ロールを割り当てます。
- この場合、Observability Pipelines Worker はサービスアカウントを使用して、ユーザーに代わって認証を行い、Pub/Sub にログを送信します。

サービスアカウントを使用して認証するには:

1. Google Cloud コンソールで、[**IAM と管理**] > **[[サービスアカウント]][4]** に移動します。
1. [**+ サービスアカウントを作成**] をクリックします。
1. 名前を入力し、[**作成して続行**] をクリックします。
1. ロールを割り当てます。
	- **Pub/Sub パブリッシャー**
	- **Pub/Sub 閲覧者**
1. [**完了**] をクリックします。

#### 認証方法 {#authentication-methods}

適切なロールを持つサービスアカウントを作成した後、以下のいずれかの認証方法を設定します。

##### オプション A: Workload Identity の方法 (GKE の場合、推奨) {#option-a-workload-identity-method-for-gke-recommended}

1. サービスアカウントを Kubernetes サービスアカウント (KSA) にバインドします。
1. その KSA がサービスアカウントになりすますことを許可します。
1. 使用するサービスアカウントを GKE が認識できるように、KSA にアノテーションを付けます。
1. 認証は、GCP のメタデータサーバーから行われます。

##### オプション B: GSA を VM に直接アタッチする (Google Compute Engine の場合) {#option-b-attach-the-gsa-directly-to-a-vm-for-google-compute-engine}

Observability Pipelines Worker を Google Compute Engine (GCE) VM 上で実行している場合は、この認証方法を使用してください。
- VM を作成または編集する際に、[**ID と API へのアクセス**] > [**サービスアカウント**] で Google サービスアカウントを指定します。

##### オプション C: GSA としてサービスを実行する (Cloud Run または Cloud Functions の場合) {#option-c-run-the-service-as-the-gsa-for-cloud-run-or-cloud-functions}

Worker を Cloud Run サービスまたは Cloud Function としてデプロイする場合は、この認証方法を使用してください。
- Cloud Run または Cloud Functions のデプロイ設定で、作成した Google サービスアカウントを [**実行サービスアカウント**] に設定します。

##### オプションD: JSON キーの方法 (ID バインディングのない環境) {#option-d-json-key-method-any-environment-without-identity-bindings}

1. 新しいサービスアカウントを開き、[**キー**] > [**キーを追加**] > [**新しいキーを作成**] に移動します。
1. JSON 形式を選択します。
1. ダウンロードした JSON ファイルを安全な場所に保存します。
1. Worker をインストールした後、その JSON ファイルを `DD_OP_DATA_DIR/config/` にコピーまたはマウントします。
Pipelines UI で[送信先を設定](#set-up-the-destination)する際に、Google Pub/Sub 送信先の [{{< ui >}}Credentials path{{< /ui >}}] (認証情報パス) フィールドでこのファイルを参照します。

## セットアップ{#setup}

[パイプラインをセットアップ][9]する際に、Google Pub/Sub 送信先を設定します。パイプラインは、[UI][1]、[API][10]、または [Terraform][11] を使用してセットアップできます。このセクションの手順では、UI で設定します。

パイプラインの UI で Google Pub/Sub 送信先を選択した後:

1. 送信先プロジェクト名を入力します。
	- これは、Pub/Sub トピックが存在する GCP プロジェクトです。
1. トピックを入力します。
	- これは、ログの公開先となる Pub/Sub トピックです。
1. [{{< ui >}}Encoding{{< /ui >}}] (エンコーディング) ドロップダウンメニューで、パイプラインの出力を [{{< ui >}}JSON{{< /ui >}}] または [{{< ui >}}Raw message{{< /ui >}}] (生のメッセージ) のどちらでエンコードするかを選択します。
	- {{< ui >}}JSON{{< /ui >}}: ログは JSON として構造化されます (ダウンストリームツールで構造化データが必要な場合に推奨)。
	- {{< ui >}}Raw{{< /ui >}}: ログは生の文字列として送信されます (元の形式が保持されます)。
1. 認証情報 JSON ファイルがある場合は、その認証情報 JSON ファイルへのパスを入力します。
	- サービスアカウント JSON を使用している場合は、パス `DD_OP_DATA_DIR/config/<your-service-account>.json` を入力します。
	- または、`GOOGLE_APPLICATION_CREDENTIALS` 環境変数を設定します。
	- GKE で [Workload Identity][7] を使用している場合、認証情報は自動的に管理されます。

### オプション設定 {#optional-settings}

#### Enable TLS (TLS を有効にする) {#enable-tls}

<div class="alert alert-danger">シークレット管理の場合: TLS キーパスの識別子のみを入力してください。実際の値は<b>入力しない</b>でください。</div>

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/secrets_env_var_note %}}

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

{{< img src="observability_pipelines/destinations/google_pubsub_settings.png" alt="サンプル値を使用した Google Pub/Sub 送信先" style="width:30%;" >}}

## シークレットのデフォルト値 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- (オプション) Google Pub/Sub エンドポイント URL の識別子:
	- デフォルトでは、Worker はデータをグローバルエンドポイント (`https://pubsub.googleapis.com`) に送信します。
	- Pub/Sub トピックがリージョン固有の場合は、Google Pub/Sub の代替エンドポイント URL をリージョンエンドポイントで構成してください。詳細については、[About Pub/Sub endpoints][1] を参照してください。設定したエンドポイント URL をシークレットマネージャーに入力します。
	- デフォルトの識別子は `DESTINATION_GCP_PUBSUB_ENDPOINT_URL` です。
- Google Pub/Sub TLS パスフレーズの識別子 (TLS が有効な場合):
	- デフォルトの識別子は `DESTINATION_GCP_PUBSUB_KEY_PASS` です。

[1]: https://docs.cloud.google.com/pubsub/docs/reference/service_apis_overview#pubsub_endpoints

{{% /tab %}}

{{% tab "環境変数" %}}

#### オプションの代替 Pub/Sub エンドポイント {#optional-alternative-pubsub-endpoints}

{{< img src="observability_pipelines/destinations/google_pubsub_env_var.png" alt="Google Pub/Sub 環境変数フィールドが表示されているインストールページ" style="width:70%;" >}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

## トラブルシューティング {#troubleshooting}

一般的な問題と解決策:
- ヘルスチェックが禁止されています
	- `roles/pubsub.viewer` IAM ロールを確認してください。
- 権限がありません
	- サービスアカウントに `roles/pubsub.publisher` があることを確認してください。
- 認証エラー
	- 認証情報 JSON のパスまたは GKE Workload Identity の設定を確認してください。
- ドロップされたイベント
	- `pipelines.component_discarded_events_total` および `pipelines.buffer_discarded_events_total` のメトリクスをチェックしてください。
	- 問題を解決するために、必要に応じてバッファサイズを増やすか、誤って設定されたフィルターを修正してください。
- 高レイテンシ
	- バッファサイズとタイムアウトを減らすか、Worker をスケールしてください。
- ログが届いていません
	- Google Pub/Sub 送信先の設定で、トピック名、プロジェクト、Pub/Sub エンドポイント (グローバルかリージョンか) を再確認してください。

## ヘルスメトリクス {#health-metrics}

すべての送信先から出力される[コンポーネントメトリクス][8]および[送信先バッファメトリクス][12]については、[パイプライン使用状況メトリクス][13]のドキュメントを参照してください。Google Pub/Sub 送信先のメトリクスでフィルタリングまたはグループ化するには、タグ `component_type:gcp_pubsub` を使用します。

### イベントバッチ処理 {#event-batching}

イベントのバッチは、これらのパラメーターのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][6]を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)   |
|----------------|-------------------|---------------------|
| 1,000          | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://cloud.google.com/docs/authentication#auth-flowchart
[3]: https://cloud.google.com/pubsub/docs/access-control#roles
[4]: https://console.cloud.google.com/iam-admin/serviceaccounts
[6]: /ja/observability_pipelines/destinations/#event-batching
[7]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[8]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[9]: /ja/observability_pipelines/configuration/set_up_pipelines/
[10]: /ja/api/latest/observability-pipelines/
[11]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[12]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[13]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/