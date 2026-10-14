---
description: Azure Storage バケットにログを送信する方法を説明します。必要に応じて、Datadog でのアーカイブやリハイドレーションにも利用できます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Azure Storage 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Azure Storage 送信先を使用して、Azure Storage バケットにログを送信します。Datadog でログをアーカイブおよびリハイドレーションするために Azure Storage にログを送信する場合は、[ログアーカイブ](#configure-log-archives)を構成する必要があります。Datadog でログのリハイドレーションを行わない場合は、「[パイプラインの送信先をセットアップする](#set-up-the-destination-for-your-pipeline)」に進んでください。

## ログアーカイブを構成する {#configure-log-archives}

この手順は、[アーカイブ][1]や[リハイドレーション][2]のために Datadog でリハイドレーション可能な形式で Azure Storage にログを送信する場合で、かつ Observability Pipelines 用に Datadog ログアーカイブがまだ構成されていない場合にのみ必要です。Datadog Log Archive がすでに構成されている場合、または Datadog でログのリハイドレーションを行わない場合は、[パイプラインの送信先をセットアップする](#set-up-the-destination-for-your-pipeline)に進んでください。

Datadog ログアーカイブを設定するには、Datadog の [Azure インテグレーション][3]がインストールされている必要があります。

#### ストレージアカウントを作成する {#create-a-storage-account}

まだストレージアカウントがない場合は、[Azure ストレージアカウント][13]を作成します。

1. [ストレージアカウント][14]に移動します。
1. [**Create**] (作成) をクリックします。
1. 使用するサブスクリプション名とリソース名を選択します。
1. ストレージアカウントの名前を入力します。
1. ドロップダウンメニューでリージョンを選択します。
1. [**Standard**] (標準) パフォーマンスまたは [**Premium**] (プレミアム) アカウントタイプを選択します。
1. [**Next**] (次へ) をクリックします。
1. [**Blob storage**] (Blob ストレージ) セクションで、[**Hot**] (ホット) または [**Cool**] (クール) ストレージを選択します。
1. [**Review + create**] (レビュー + 作成) をクリックします。

#### ストレージバケットを作成する {#create-a-storage-bucket}

1. ストレージアカウントで、左側のナビゲーションメニューにある [**Data storage**] (データストレージ) の下の [**Containers**] (コンテナ) をクリックします。
1. 上部の [**+ Container**] (+ コンテナ) をクリックしてコンテナを作成します。
1. 新しいコンテナの名前を入力します。この名前は、後で Observability Pipelines の Azure Storage 送信先を設定するときに使用します。

**注**: [不変性ポリシー][15]は設定しないでください。まれに (通常はタイムアウト時) 最新データを書き換える必要があるためです。

#### Azure コンテナを Datadog ログアーカイブに接続する{#connect-the-azure-container-to-datadog-log-archives}

1. Datadog の [[Log Forwarding] (ログ転送)][16] に移動します。
1. [**New archive**] (新規アーカイブ) をクリックします。
1. わかりやすいアーカイブ名を入力します。
1. ログパイプラインを通過するすべてのログを除外するクエリを追加し、それらのログがこのアーカイブに入らないようにします。たとえば、パイプラインを通過するログにそのタグが追加されていないと仮定して、クエリ `observability_pipelines_read_only_archive` を追加します。
1. **Azure Storage** を選択します。
1. ストレージアカウントが属している Azure テナントとクライアントを選択します。
1. ストレージアカウントの名前を入力します。
1. 先ほど作成したコンテナの名前を入力します。
1. オプションで、パスを入力します。
1. 必要に応じて、権限を設定し、タグを追加して、リハイドレーション用の最大スキャンサイズを指定します。詳細については、[高度な設定][17]を参照してください。
1. [**Save**] (保存) をクリックします。

詳細については、[ログアーカイブのドキュメント][1]を参照してください。

## パイプラインの送信先をセットアップする {#set-up-the-destination-for-your-pipeline}

<div class="alert alert-danger">シークレット管理の場合: Azure 接続文字列の識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][4]する際に、Azure Storage 送信先を構成します。パイプラインのセットアップは、[UI][7] で、[API][8] を使用して、または [Terraform][9] で行えます。このセクションの手順は、UI で設定します。

パイプライン UI で Azure Storage 送信先を選択したら、次のようにします。

1. Azure 接続文字列の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. 先ほど作成した Azure コンテナの名前を入力します。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### すべてのキーオブジェクトに適用するプレフィックス {#prefix-to-apply-to-all-key-objects}

すべてのキーオブジェクトに適用するプレフィックスを入力します。

- プレフィックスは、オブジェクトをパーティション分割するうえで役立ちます。たとえば、プレフィックスをオブジェクトキーとして使用して、特定のディレクトリの下にオブジェクトを保存できます。この目的でプレフィックスを使用する場合は、ディレクトリパスとして機能するように末尾を `/` にする必要があります。末尾の `/` は自動的には追加されません。
- 特定のフィールドに基づいて、ログを異なるオブジェクトキーに振り分ける場合は、[テンプレート構文][6]を参照してください。
	- **注**: Datadog では、プレフィックスの先頭はスラッシュ (`/`) を付けないディレクトリ名にすることを推奨しています。たとえば、`app-logs/` や `service-logs/` などです。

#### 圧縮 {#compression}

1. [{{< ui >}}Compression - Algorithm{{< /ui >}}] (圧縮 - アルゴリズム) ドロップダウンメニューで、アーカイブされたログの圧縮アルゴリズム ([{{< ui >}}gzip{{< /ui >}}] または [{{< ui >}}zstd{{< /ui >}}]) を選択します。
    - **注**: 圧縮アルゴリズムが指定されていない場合は、圧縮レベル `6` の gzip が使用されます。
1. [{{< ui >}}Compression - Level {{< /ui >}}] (圧縮 - レベル) フィールドに、圧縮レベルを入力する必要があります。Datadog は、gzip には `6`、zstd には `3` を推奨しています。

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Azure 接続文字列の識別子:
	- Worker が Azure Storage バケットにアクセスできるようにする接続文字列を参照します。
	- デフォルトの識別子は `DESTINATION_DATADOG_ARCHIVES_AZURE_BLOB_CONNECTION_STRING` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

{{% /tab %}}
{{< /tabs >}}

## 健全性メトリクス {#health-metrics}

すべての送信先から送信される[コンポーネントメトリクス][10]および[送信先バッファメトリクス][11]については、[パイプライン使用状況メトリクス][12]のドキュメントを参照してください。Azure Storage 送信先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:datadog_archives_azure_blob` を使用します。

## 送信先の動作{#how-the-destination-works}

### イベントのバッチ処理{#event-batching}

イベントのバッチは、次のパラメーターのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][5]を参照してください。

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