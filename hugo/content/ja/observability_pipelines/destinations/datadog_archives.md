---
description: Datadog で再ハイドレート可能な形式で Amazon S3 にログを送信してアーカイブし、リハイドレートする方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Datadog Archives 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Datadog Archives 送信先を使用して、Datadog で再ハイドレート可能な形式で[アーカイブ][1]するために Amazon S3 にログを送信します。その後、[Archive Search][16] を使用してこれらのログをクエリできます。プラットフォームへの完全なアクセスが必要な場合に結果を再度インデックス化するには、Archive Search の [{{< ui >}}Search & Rehydration{{< /ui >}}] (検索およびリハイドレート) モードを使用します。

**注**: [Amazon S3][12] の送信先を使用して、JSON または Parquet 形式で Amazon S3 にログを送信します。

Datadog Archives 送信先を使用して [ログを Snowflake にルーティング](#route-logs-to-snowflake-using-the-datadog-archives-destination)することもできます。

## 前提条件 {#prerequisites}

Datadog Archives 送信先を使用するには、Datadog の [AWS インテグレーション][3] をインストールして、[Datadog ログアーカイブ](#configure-log-archives)を構成できるようにする必要があります。

## ログアーカイブを構成する {#configure-log-archives}

Datadog ログアーカイブがすでに構成されている場合は、[パイプラインの送信先をセットアップする](#set-up-the-destination-for-your-pipeline) に進んでください。

{{% observability_pipelines/configure_log_archive/amazon_s3/instructions %}}

### S3 バケットへの書き込みを Worker に許可する IAM ポリシーをセットアップする {#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket}

1. [IAM コンソール][11]に移動します。
1. 左側のメニューで [**Policies**] (ポリシー) を選択します。
1. [**Create policy**] (ポリシーを作成) をクリックします。
1. [**Specify permissions**] (権限の指定) セクションで [**JSON**] をクリックします。
1. 以下のポリシーをコピーして、[**Policy editor**] (ポリシーエディター) に貼り付けます。`<MY_BUCKET_NAME_1>` と `<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>` を、前のセクションで作成した S3 バケットの情報に置き換えます。
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "DatadogUploadAndRehydrateLogArchives",
                "Effect": "Allow",
                "Action": ["s3:PutObject", "s3:GetObject"],
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>/*"
            },
            {
                "Sid": "DatadogRehydrateLogArchivesListBucket",
                "Effect": "Allow",
                "Action": "s3:ListBucket",
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1>"
            }
        ]
    }
    ```
1. [**Next**] (次へ) をクリックします。
1. わかりやすいポリシー名を入力します。
1. オプションで、タグを追加します。
1. [**Create policy**] (ポリシーを作成) をクリックします。

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/amazon_eks %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_rpm %}}

{{% /tab %}}
{{< /tabs >}}

### S3 バケットを Datadog ログアーカイブに接続する {#connect-the-s3-bucket-to-datadog-log-archives}

1. Datadog の [[Log Forwarding] (ログ転送)][17] に移動します。
1. [**New archive**] (新規アーカイブ) をクリックします。
1. わかりやすいアーカイブ名を入力します。
1. ログパイプラインを通過するすべてのログを除外するクエリを追加し、それらのログがこのアーカイブに入らないようにします。たとえば、パイプラインを通過するログにそのタグが追加されていないと仮定して、クエリ `observability_pipelines_read_only_archive` を追加します。
1. **AWS S3** を選択します。
1. バケットが存在する AWS アカウントを選択します。
1. S3 バケットの名前を入力します。
1. オプションで、パスを入力します。
1. 確認事項にチェックを入れます。
1. オプションで、タグを追加し、リハイドレートの最大スキャンサイズを定義します。詳細については、[高度な設定][18]を参照してください。
1. [**Save**] (保存) をクリックします。

詳細については、[ログアーカイブのドキュメント][1]を参照してください。

## パイプラインの送信先をセットアップする {#set-up-the-destination-for-your-pipeline}

Datadog Archives 送信先を構成する際は、[Archive Logs パイプラインをセットアップ][4]してください。パイプラインは、[UI][13]、[API][14]、または [Terraform][15] を使用してセットアップできます。このセクションの手順は、UI で設定します。

パイプライン UI で Datadog Archives 送信先を選択した後、

1. S3 バケット名を入力します。ログアーカイブを設定した場合は、以前に作成したバケットの名前です。
1. S3 バケットがある AWS リージョンを入力します。
1. キーのプレフィックスを入力します。
    - プレフィックスは、オブジェクトをパーティション分割するうえで役立ちます。たとえば、プレフィックスをオブジェクトキーとして使用して、特定のディレクトリの下にオブジェクトを保存できます。この目的でプレフィックスを使用する場合は、ディレクトリパスとして機能するように末尾を `/` にする必要があります。末尾の `/` は自動的には追加されません。
    - ログの特定のフィールドに基づいて、ログを異なるオブジェクトキーに振り分ける場合は、[テンプレート構文][8]を参照してください。
     - **注**: Datadog では、プレフィックスの先頭はスラッシュ (`/`) を付けないディレクトリ名にすることを推奨しています。たとえば、`app-logs/` や `service-logs/` などです。
1. [{{< ui >}}Storage Class{{< /ui >}}] (ストレージクラス) ドロップダウンメニューで、S3 バケットのストレージクラスを選択します。ログをアーカイブおよび再ハイドレートする場合:
    - **注**: リハイドレートは、以下の [ストレージクラス][9] のみをサポートします。
        - Standard
        - Intelligent-Tiering。[オプションの非同期アーカイブアクセス階層][10]が両方とも無効化されている場合に限ります。
        - Standard-IA
        - One Zone-IA
    - ほかのストレージクラスにあるアーカイブからリハイドレートする場合は、まず上記のサポートされているストレージクラスのいずれかに移動させる必要があります。
    - Amazon S3 の送信先設定に基づいて Log Archive を構成する方法については、このページの[送信先とログアーカイブの設定例](#example-destination-and-log-archive-setup)セクションを参照してください。

### オプション設定 {#optional-settings}

#### 圧縮 {#compression}

1. [{{< ui >}}Compression - Algorithm{{< /ui >}}] (圧縮 - アルゴリズム) ドロップダウンメニューで、アーカイブされたログの圧縮アルゴリズム ([{{< ui >}}gzip{{< /ui >}}] または [{{< ui >}}zstd{{< /ui >}}]) を選択します。
    - **注**: 圧縮アルゴリズムが指定されていない場合は、圧縮レベル `6` の gzip が使用されます。
1. [{{< ui >}}Compression - Level {{< /ui >}}] (圧縮 - レベル) フィールドに、圧縮レベルを入力する必要があります。Datadog は、gzip には `6`、zstd には `3` を推奨しています。

#### サーバー側の暗号化 {#server-side-encryption}

[{{< ui >}}Server-Side Encryption{{< /ui >}}] (サーバー側の暗号化) ドロップダウンメニューで、S3 バケットの暗号化タイプを選択します ([{{< ui >}}AWS KMS{{< /ui >}}] または [{{< ui >}}AES256{{< /ui >}}])。[{{< ui >}}AWS KMS{{< /ui >}}] を選択した場合は、AWS KMS キー ID を入力します。

#### AWS 認証 {#aws-authentication}

AWS 認証オプションを選択します。認証に[先ほど作成したユーザーまたはロール](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket)のみを使用する場合は、[{{< ui >}}Assume role{{< /ui >}}] (ロールの引き受け) を選択しないでください。先ほど作成したユーザーまたはロールが AWS リソースにアクセスするために別のロールを引き受ける必要がある場合にのみ、[{{< ui >}}Assume role{{< /ui >}}] を選択します。引き受けるロールの権限は明示的に定義されている必要があります。<br>[{{< ui >}}Assume role{{< /ui >}}] を選択する場合:
1. 引き受ける IAM ロールの ARN を入力します。
    - **注:** Worker が AWS で認証できるように、[先ほど作成したユーザーまたはロール](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket)に、このロールを引き受ける権限が必要です。
1. (オプション) 引き受けるロールのセッション名と外部 ID を入力します。

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

### 送信先とログアーカイブの設定例{#example-destination-and-log-archive-setup}

Datadog Archives 送信先に以下の値を入力する場合、
- S3 バケット名: `test-op-bucket`
- すべてのオブジェクトキーに適用するプレフィックス: `op-logs`
- 作成されたオブジェクトのストレージクラス: `Standard`

{{< img src="observability_pipelines/setup/amazon_s3_destination.png" alt="例の値を使用して設定した Datadog Archives 送信先" style="width:40%;" >}}

その場合、ログアーカイブ用に S3 バケットを設定するために入力する値は次のとおりです。

- S3 バケット: `test-op-bucket`
- パス: `op-logs`
- ストレージクラス: `Standard`

{{< img src="observability_pipelines/setup/amazon_s3_archive.png" alt="例の値を使用したログアーカイブの構成" style="width:70%;" >}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

構成するシークレット識別子はありません。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## Datadog Archives 送信先を使用してログを Snowflake にルーティングする {#route-logs-to-snowflake-using-the-datadog-archives-destination}

Snowflake で Snowpipe を構成してそれらのログを自動的に取り込むようにすることで、Datadog Archives 送信先を使用して Observability Pipelines から Snowflake にログをルーティングできます。Snowpipe は S3 バケット内の新しいファイルを継続的に監視し、それらを Snowflake テーブルに自動的に取り込むため、分析や詳細な処理のためにほぼリアルタイムのデータを利用することができます。Observability Pipelines によって収集されたログは、S3 バケットに書き込まれます。これを設定するには、次のようにします。
1. [ログアーカイブ](#configure-log-archives)を構成します。
1. [パイプラインをセットアップ][5]して、Datadog Archives をログの送信先として使用します。「[パイプラインの送信先を設定する](#set-up-the-destination-for-your-pipeline)」に記載されている設定を使用します。
1. Snowflake で Snowpipe を設定します。手順については、「[Amazon S3 用 Snowpipe の自動化][6]」を参照してください。

## 送信先の動作{#how-the-destination-works}

### AWS 認証{#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### 権限 {#permissions}

Observability Pipelines Worker が Amazon S3 にログを送信するには、以下のポリシー権限が必要です。

- `s3:ListBucket`
- `s3:PutObject`
- `s3:GetObject`

### イベントのバッチ処理 {#event-batching}

イベントのバッチは、次のパラメーターのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][7]を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)|
|----------------|-------------------|---------------------|
| なし           | 100               | 900                 |

[1]: /ja/logs/log_configuration/archives/
[2]: /ja/logs/log_configuration/rehydrating/
[3]: /ja/integrations/amazon_web_services/#setup
[4]: /ja/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /ja/observability_pipelines/configuration/set_up_pipelines/
[6]: https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3
[7]: /ja/observability_pipelines/destinations/#event-batching
[8]: /ja/observability_pipelines/destinations/#template-syntax
[9]: /ja/logs/log_configuration/archives/?tab=awss3#storage-class
[10]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
[11]: https://console.aws.amazon.com/iam/
[12]: /ja/observability_pipelines/destinations/amazon_s3/
[13]: https://app.datadoghq.com/observability-pipelines
[14]: /ja/api/latest/observability-pipelines/
[16]: /ja/logs/explorer/archive_search/
[15]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[17]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[18]: /ja/logs/log_configuration/archives/?tab=awss3#advanced-settings