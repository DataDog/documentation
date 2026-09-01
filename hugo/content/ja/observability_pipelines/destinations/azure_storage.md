---
description: Datadog でのアーカイブや再取り込みを目的として Azure Storage バケットにログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Azure Storage 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Azure Storage 送信先を使用して、Azure Storage バケットにログを送信します。[アーカイブ][1]や[再取り込み][2]のために Azure Storage にログを送信する場合は、[ログアーカイブを構成](#configure-log-archives)する必要があります。Datadog でログを再取り込みする必要がない場合は、[パイプラインの送信先をセットアップする](#set-up-the-destination-for-your-pipeline)に進んでください。

## ログアーカイブを構成する{#configure-log-archives}

この手順は、[アーカイブ][1]や[再取り込み][2]のために Datadog で再取り込み可能な形式で Azure Storage にログを送信する場合で、かつ Observability Pipelines 用に Datadog ログアーカイブがまだ構成されていない場合にのみ必要です。Datadog ログアーカイブがすでに構成されている場合、または Datadog でログを再取り込みする必要がない場合は、[パイプラインの送信先をセットアップする](#set-up-the-destination-for-your-pipeline)に進んでください。

Datadog ログアーカイブをセットアップするには、Datadog の [Azure インテグレーション][3]がインストールされている必要があります。

#### ストレージアカウントを作成する{#create-a-storage-account}

[Azure ストレージアカウント][13]がまだない場合は作成します。

1. [ストレージアカウント][14]に移動します。
1. [**Create**] (作成) をクリックします。
1. 使用するサブスクリプション名とリソース名を選択します。
1. ストレージアカウントの名前を入力します。
1. ドロップダウンメニューからリージョンを選択します。
1. **Standard** パフォーマンスまたは **Premium** アカウントタイプを選択します。
1. [**Next**] (次へ) をクリックします。
1. [**Blob storage**] (Blobストレージ) セクションで、[**Hot**] (ホット) または [**Cool**] (クール) ストレージを選択します。
1. [**Review + create**] (確認して作成) をクリックします。

#### ストレージバケットを作成する{#create-a-storage-bucket}

1. ストレージアカウントで、左側のナビゲーションメニューにある [**Data storage**] (データストレージ) の下の [**Containers**] (コンテナ) をクリックします。
1. 上部の [**+ Container**] (+ コンテナ) をクリックして、コンテナを作成します。
1. 新しいコンテナの名前を入力します。この名前は、後で Observability Pipelines の Azure Storage 送信先を設定する際に使用します。

**注**: まれに (通常はタイムアウトが発生した場合に) 最新のデータの書き換えが必要になることがあるため、[不変性ポリシー][15]は設定しないでください。

#### Azure コンテナを Datadog ログアーカイブに接続する{#connect-the-azure-container-to-datadog-log-archives}

1. Datadog の [[Log Forwarding] (ログ転送)][16] に移動します。
1. [**New archive**] (新規アーカイブ) をクリックします。
1. わかりやすいアーカイブ名を入力します。
1. ログパイプラインを通過するすべてのログを除外するクエリを追加し、それらのログがこのアーカイブに入らないようにします。たとえば、パイプラインを通過するログにそのタグが追加されていないと仮定して、クエリ `observability_pipelines_read_only_archive` を追加します。
1. [**Azure Storage**] を選択します。
1. ストレージアカウントが存在する Azure テナントとクライアントを選択します。
1. ストレージアカウントの名前を入力します。
1. 作成しておいたコンテナの名前を入力します。
1. 必要に応じて、パスを入力します。
1. 必要に応じて、権限を設定し、タグを追加して、再取り込みの最大スキャンサイズを定義します。詳細については、[詳細設定][17]を参照してください。
1. [**Save**] (保存) をクリックします。

詳細については、[ログアーカイブのドキュメント][1]を参照してください。

## パイプラインの送信先をセットアップする {#set-up-the-destination-for-your-pipeline}

<div class="alert alert-danger">シークレット管理の場合: Azure 接続文字列の識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][4]する際に、Azure Storage 送信先を設定します。パイプラインは、[UI][7]、[API][8]、または [Terraform][9] を使用してセットアップできます。このセクションの手順は、UI で設定します。

パイプライン UI で Azure Storage 送信先を選択した後:

1. Azure 接続文字列の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. 作成しておいた Azure コンテナの名前を入力します。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### すべてのキーオブジェクトに適用するプレフィックス {#prefix-to-apply-to-all-key-objects}

すべてのキーオブジェクトに適用するプレフィックスを入力します。

- プレフィックスは、オブジェクトをパーティション分割するのに役立ちます。たとえば、プレフィックスをオブジェクトキーとして使用し、特定のディレクトリの下にオブジェクトを保存できます。この目的でプレフィックスを使用する場合、ディレクトリパスとして機能させるために `/` で終わる必要があります。末尾の `/` は自動的には追加されません。
- ログ内の特定のフィールドに基づいて異なるオブジェクトキーにログをルーティングする場合は、[テンプレート構文][6]を参照してください。
	- **注**: Datadogでは、プレフィックスをディレクトリ名で開始し、先頭にスラッシュ (`/`) を付けないことを推奨しています。たとえば、`app-logs/` や `service-logs/` などです。

#### バッファリング{#buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Azure 接続文字列識別子:
	- Worker が Azure Storage バケットにアクセスするために使用する接続文字列を参照します。
	- デフォルトの識別子は `DESTINATION_DATADOG_ARCHIVES_AZURE_BLOB_CONNECTION_STRING` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

{{% /tab %}}
{{< /tabs >}}

## ヘルスメトリクス{#health-metrics}

すべての送信先から出力される[コンポーネントメトリクス][10]および[送信先バッファメトリクス][11]については、[Pipelines 使用状況メトリクス][12]のドキュメントを参照してください。Azure Storage 送信先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:datadog_archives_azure_blob` を使用します。

## 送信先の仕組み{#how-the-destination-works}

### イベントのバッチ処理{#event-batching}

イベントのバッチは、次のパラメータのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][5]を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)|
|----------------|-------------------|---------------------|
| なし           | 100               | 900                 |

[1]: /ja/logs/log_configuration/archives/
[2]: /ja/logs/log_configuration/rehydrating/
[3]: /ja/integrations/azure/#setup
[4]: /ja/observability_pipelines/configuration/set_up_pipelines/
[5]: /ja/observability_pipelines/destinations/#event-batching
[6]: /ja/observability_pipelines/destinations/#template-syntax
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /ja/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[12]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[13]: https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[14]: https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts
[15]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
[16]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[17]: /ja/logs/log_configuration/archives/?tab=awss3#advanced-settings