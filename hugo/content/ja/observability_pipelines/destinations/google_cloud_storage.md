---
description: Datadog でのアーカイブや再取り込みを目的として Google Cloud Storage バケットにログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Google Cloud Storage 送信先
---
{{< product-availability >}}

## 概要 {#overview}

<div class="alert alert-info">Worker バージョン 2.7 以降では、Google Cloud 送信先で<a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access">均一なバケットレベルのアクセス</a>がサポートされています。Google では<a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access#should-you-use">均一なバケットレベルのアクセス</a>の使用を推奨しています。<br>バージョン 2.7 より前の Worker では、<a href = "https://cloud.google.com/storage/docs/access-control/lists">アクセス制御リスト</a>のみがサポートされています。</div>

Google Cloud Storage 送信先を使用して、Google Cloud Storage バケットにログを送信します。[アーカイブ][1]や[再取り込み][2]のために Google Cloud Storage にログを送信する場合は、[ログアーカイブを構成](#configure-log-archives)する必要があります。Datadog でログを再取り込みする必要がない場合は、[パイプラインの送信先をセットアップする](#set-up-the-destinations)に進んでください。

Observability Pipelines Worker では、標準の Google 認証方法を使用します。ユースケースに適した認証方法の選択については、[Google での認証方法][6]を参照してください。

## ログアーカイブを構成定する {#configure-log-archives}

この手順は、[アーカイブ][1]や[再取り込み][2]のために Google Cloud Storage にログを送信する場合で、かつ Observability Pipelines 用に Datadog ログアーカイブがまだ構成されていない場合にのみ必要です。Datadog ログアーカイブがすでに設定されている場合、または Datadog でログを再取り込みする必要がない場合は、[パイプラインの送信先をセットアップする](#set-up-the-destinations)に進んでください。

Observability Pipelines 用に Datadog ログアーカイブがすでに構成されている場合は、[パイプラインの送信先をセットアップする](#set-up-the-destination-for-your-pipeline)に進んでください。

Datadog ログアーカイブをセットアップするには、Datadog の [Google Cloud Platform インテグレーション][3]がインストールされている必要があります。

### ストレージバケットを作成する {#create-a-storage-bucket}

1. [Google Cloud Storage][16] に移動します。
1. [Buckets] (バケット) ページで、[**Create**] (作成) をクリックしてアーカイブ用のバケットを作成します。
1. バケットの名前を入力し、データの保存先を選択します。
1. [**Choose how to control access to objects**] (オブジェクトへのアクセスを制御する方法を選択する) セクションで、[**Fine-grained**] (きめ細かい管理) を選択します。
1. まれに (通常はタイムアウトにより) 最新のデータの書き換えが必要になるため、保持ポリシーは追加しないでください。
1. [**Create**] (作成) をクリックします。

### サービスアカウントを作成してバケットへの書き込みを Worker に許可する{#create-a-service-account-to-allow-workers-to-write-to-the-bucket}

1. Google Cloud Storage [サービスアカウント][17]を作成します。
    - サービスアカウントに `Storage Admin` および `Storage Object Admin` 権限を付与してバケットへのアクセスを許可します。
    - 認証情報ファイルで認証を行う場合は、サービスアカウントキーファイルをダウンロードし、`DD_OP_DATA_DIR/config` の下に配置します。このファイルは、後で [Google Cloud Storage 送信先](#set-up-the-destinations)をセットアップする際に参照します。
1. [手順][18]に従って、サービスアカウントキーを作成します。キータイプには `json` を選択します。

### ストレージバケットを Datadog ログアーカイブに接続する{#connect-the-storage-bucket-to-datadog-log-archives}

1. Datadog の [[Log Forwarding] (ログ転送)][19] に移動します。
1. [**New archive**] (新規アーカイブ) をクリックします。
1. わかりやすいアーカイブ名を入力します。
1. ログパイプラインを通過するすべてのログを除外するクエリを追加し、それらのログがこのアーカイブに入らないようにします。たとえば、パイプラインを通過するログにそのタグが追加されていないと仮定して、クエリ `observability_pipelines_read_only_archive` を追加します。
1. [**Google Cloud Storage**] を選択します。
1. ストレージバケットが存在するサービスアカウントを選択します。
1. プロジェクトを選択します。
1. 作成しておいたストレージバケットの名前を入力します。
1. 必要に応じて、パスを入力します。
1. 必要に応じて、権限を設定し、タグを追加して、再取り込みの最大スキャンサイズを定義します。詳細については、[詳細設定][20]を参照してください。
1. [**Save**] (保存) をクリックします。

詳細については、[ログアーカイブのドキュメント][1]を参照してください。

## パイプラインの送信先をセットアップする {#set-up-the-destinations}

[パイプラインをセットアップ][4]する際に、Google Cloud Storage 送信先を設定します。パイプラインは、[UI][10]、[API][11]、または [Terraform][12] を使用してセットアップできます。このセクションの手順は、UI で設定します。

パイプライン UI で Google Cloud Storage 送信先を選択した後:

1. Google Cloud ストレージバケットの名前を入力します。ログアーカイブを設定済みの場合は、作成しておいたバケットになります。
1. 認証情報 JSON ファイルがある場合は、そのファイルのパスを入力します。ログアーカイブを設定済みの場合は、[ダウンロードしておいた](#create-a-service-account-to-allow-workers-to-write-to-the-bucket)認証情報になります。認証情報ファイルは `DD_OP_DATA_DIR/config` の下に配置する必要があります。または、`GOOGLE_APPLICATION_CREDENTIALS` 環境変数を使用して認証情報パスを指定することもできます。
    - Google Kubernetes Engine (GKE) で[ワークロードアイデンティティ][9]を使用している場合、`GOOGLE_APPLICATION_CREDENTIALS` は自動的に提供されます。
    - Observability Pipelines Worker では、標準の [Google 認証方法][8]を使用します。
1. 作成オブジェクトのストレージクラスを選択します。
1. 作成オブジェクトのアクセスレベルを選択します。

### オプション設定 {#optional-settings}

#### すべてのキーオブジェクトに適用するプレフィックス {#prefix-to-apply-to-all-key-objects}

すべてのキーオブジェクトに適用するプレフィックスを入力します。

- プレフィックスは、オブジェクトをパーティション分割するのに役立ちます。たとえば、プレフィックスをオブジェクトキーとして使用し、特定のディレクトリの下にオブジェクトを保存できます。この目的でプレフィックスを使用する場合、ディレクトリパスとして機能させるために `/` で終わる必要があります。末尾の `/` は自動的には追加されません。
- ログ内の特定のフィールドに基づいて異なるオブジェクトキーにログをルーティングする場合は、[テンプレート構文][7]を参照してください。
  - **注**: Datadogでは、プレフィックスをディレクトリ名で開始し、先頭にスラッシュ (`/`) を付けないことを推奨しています。たとえば、`app-logs/` や `service-logs/` などです。

#### メタデータ {#metadata}

1. {{< ui >}}Add Header{{< /ui >}} をクリックしてメタデータを追加します。
1. ヘッダーの名前と値を入力します。

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

設定するシークレット識別子はありません。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% /tab %}}
{{< /tabs >}}

## ヘルスメトリクス {#health-metrics}

すべての送信先から出力される[コンポーネントメトリクス][13]および[送信先バッファメトリクス][14]については、[Pipelines 使用状況メトリクス][15]のドキュメントを参照してください。Google Cloud Storage 送信先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:datadog_archives_gcs` を使用します。

## 送信先の仕組み{#how-the-destination-works}

### イベントのバッチ処理{#event-batching}

イベントのバッチは、次のパラメータのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][5]を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)|
|----------------|-------------------|---------------------|
| なし           | 100               | 900                 |

[1]: /ja/logs/log_configuration/archives/
[2]: /ja/logs/log_configuration/rehydrating/
[3]: /ja/integrations/google_cloud_platform/#setup
[4]: /ja/observability_pipelines/configuration/set_up_pipelines/
[5]: /ja/observability_pipelines/destinations/#event-batching
[6]: https://cloud.google.com/docs/authentication#auth-flowchart
[7]: /ja/observability_pipelines/destinations/#template-syntax
[8]: https://cloud.google.com/docs/authentication#auth-flowchart
[9]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /ja/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[13]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[15]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[16]: https://console.cloud.google.com/storage
[17]: https://console.cloud.google.com/iam-admin/serviceaccounts
[18]: https://cloud.google.com/iam/docs/keys-create-delete#creating
[19]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[20]: /ja/logs/log_configuration/archives/?tab=awss3#advanced-settings