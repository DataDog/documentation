---
description: Amazon S3 送信先の構成方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Amazon S3 送信先
---
{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="false">}}
Amazon S3 送信先はプレビュー版です。アクセスするには、アカウントマネージャーにお問い合わせください。
{{< /callout >}}

## 概要 {#overview}

Amazon S3 送信先を使用して、JSON または Parquet 形式のログを Amazon S3 に送信します。「[自動生成された Parquet スキーマ](#automatically-generated-parquet-schema)」を参照してください。

[Amazon S3 送信先を使用してログを Snowflake にルーティング](#route-logs-to-snowflake-using-the-amazon-s3-destination)することもできます。

**注**: ログを S3 バケットに送信し、後で Datadog での分析や調査のために[再ハイドレート][1]できるようにしたい場合は、[Datadog Archives][2] 送信先を使用してください。

## Amazon S3 バケットをセットアップする {#set-up-an-amazon-s3-bucket}

{{% observability_pipelines/configure_log_archive/amazon_s3/instructions %}}


### S3 バケットへの書き込みを Worker に許可する IAM ポリシーをセットアップする {#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket}

1. [IAM コンソール][3]に移動します。
1. 左側のメニューで [**Policies**] (ポリシー) を選択します。
1. [**Create policy**] (ポリシーを作成) をクリックします。
1. [**Specify permissions**] (権限の指定) セクションで [**JSON**] をクリックします。
1. 以下のポリシーをコピーして、[**Policy editor**] (ポリシーエディター) に貼り付けます。`<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>` を、前のセクションで作成した S3 バケットの情報に置き換えます。
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "DatadogOPUpload",
                "Effect": "Allow",
                "Action": [
                    "s3:PutObject"
                ],
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>/*"
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

## パイプラインの送信先をセットアップする {#set-up-the-destination-for-your-pipeline}

[パイプラインをセットアップ][11]する際に、Amazon S3 送信先を設定します。パイプラインは、[UI][8]、[API][9]、または [Terraform][10] を使用してセットアップできます。このセクションの手順は、UI で設定します。

パイプライン UI で Amazon S3 送信先を選択したら、次のようにします。

1. S3 バケット名を入力します。ログアーカイブを設定した場合は、以前に作成したバケットの名前です。
1. S3 バケットがある AWS リージョンを入力します。
1. (オプション) キーのプレフィックスを入力します。
    - プレフィックスは、オブジェクトをパーティション分割するうえで役立ちます。たとえば、プレフィックスをオブジェクトキーとして使用して、特定のディレクトリの下にオブジェクトを保存できます。この目的でプレフィックスを使用する場合は、ディレクトリパスとして機能するように末尾を `/` にする必要があります。末尾の `/` は自動的には追加されません。
      - ログの特定のフィールドに基づいて、ログを異なるオブジェクトキーに振り分けたい場合は、[テンプレート構文][4]を参照してください。
    - **注**:
        - Datadog では、プレフィックスの先頭はスラッシュ (`/`) を付けないディレクトリ名にすることを推奨しています。たとえば、`app-logs/` や `service-logs/` などです。
        - [Datadog Archives][2] の送信先と同じ S3 プレフィックスは**使用しない**でください。Amazon S3 送信先は異なる形式でファイルを書き込むため、同じプレフィックスに両方のファイルタイプが存在すると、リハイドレーションの問題が発生する可能性があります。
1. [{{< ui >}}Storage Class{{< /ui >}}] (ストレージクラス) ドロップダウンメニューで、S3 バケットのストレージクラスを選択します。
1. [{{< ui >}}Encoding{{< /ui >}}] (エンコーディング) ドロップダウンメニューで、使用するエンコーディングを選択します ([{{< ui >}}JSON{{< /ui >}}] または [{{< ui >}}Parquet{{< /ui >}}])。
    - **注**: {{< ui >}}Parquet{{< /ui >}} の場合、スキーマはバッチごとに生成され、それぞれ異なることがあります。「[自動生成された Parquet スキーマ](#automatically-generated-parquet-schema)」を参照してください。
1. [{{< ui >}}Compression - Algorithm{{< /ui >}}] (圧縮 - アルゴリズム) ドロップダウンメニューで、圧縮アルゴリズムを選択します。選択したアルゴリズムに応じて、次のようになります。
    - {{< ui >}}Parquet{{< /ui >}}: Datadog は `snappy` または低圧縮レベル (`zstd` を選択した場合) を推奨します。
    - {{< ui >}}JSON{{< /ui >}}: Datadog は `gzip` を推奨します。

### オプション設定 {#optional-settings}

#### バッチ処理 {#batching}

1. 最大バッチサイズを入力し、ドロップダウンメニューで単位 ([{{< ui >}}MB{{< /ui >}}] または [{{< ui >}}GB{{< /ui >}}]) を選択します。設定されていない場合、デフォルトは `100` MB です。
1. バッチ処理のタイムアウト (秒) を入力します。設定されていない場合、デフォルトは `900` 秒です。

#### サーバー側の暗号化 {#server-side-encryption}

1. [{{< ui >}}Server-Side Encryption{{< /ui >}}] (サーバー側の暗号化) ドロップダウンメニューで、S3 バケットの暗号化タイプ ([{{< ui >}}AWS KMS{{< /ui >}}] または [{{< ui >}}AES256{{< /ui >}}]) を選択します。
1. [{{< ui >}}AWS KMS{{< /ui >}}] を選択した場合は、AWS KMS キー ID を入力します。

#### AWS 認証 {#aws-authentication}

AWS 認証オプションを選択します。認証に[先ほど作成したユーザーまたはロール](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket)のみを使用する場合は、[{{< ui >}}Assume role{{< /ui >}}] (ロールの引き受け) を選択しないでください。先ほど作成したユーザーまたはロールが AWS リソースにアクセスするために別のロールを引き受ける必要がある場合にのみ、[{{< ui >}}Assume role{{< /ui >}}] を選択します。引き受けるロールの権限は明示的に定義されている必要があります。<br>[{{< ui >}}Assume role{{< /ui >}}] を選択する場合:
1. 引き受ける IAM ロールの ARN を入力します。
    - **注:** Worker が AWS で認証できるように、[先ほど作成したユーザーまたはロール](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket)に、このロールを引き受ける権限が必要です。
1. (オプション) 引き受けるロールのセッション名と外部 ID を入力します。

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

構成するシークレット識別子はありません。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## Amazon S3 送信先を使用してログを Snowflake にルーティングする {#route-logs-to-snowflake-using-the-amazon-s3-destination}

Snowflake で Snowpipe を設定してログを自動的に取り込むようにすることで、Observability Pipelines から Amazon S3 送信先を使用して Snowflake にログをルーティングできます。Snowpipe は S3 バケット内の新しいファイルを継続的に監視し、それらを Snowflake テーブルに自動的に取り込むため、分析や詳細な処理のためにほぼリアルタイムのデータを利用することができます。Observability Pipelines によって収集されたログは、S3 バケットに書き込まれます。これを設定するには、次のようにします。
1. Amazon S3 をログの送信先として使用するように[パイプラインを設定][5]します。「[パイプラインの送信先を設定する](#set-up-the-destination-for-your-pipeline)」に記載されている設定を使用します。
1. Snowflake で Snowpipe を設定します。手順については、「[Amazon S3 用 Snowpipe の自動化][6]」を参照してください。

## 健全性メトリクス {#health-metrics}

すべての送信先から送信される[コンポーネントメトリクス][12]および[送信先バッファメトリクス][13]については、[パイプライン使用状況メトリクス][14]のドキュメントを参照してください。Amazon S3 送信先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:amazon_s3_generic` を使用します。

## 送信先の動作 {#how-the-destination-works}

### AWS 認証 {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### 権限 {#permissions}

Observability Pipelines Worker が Amazon S3 にログを送信するには、以下のポリシー権限が必要です。

- `s3:PutObject`

### 自動生成された Parquet スキーマ {#automatically-generated-parquet-schema}

Observability Pipelines Worker はイベントのバッチを収集し、それらのイベントのスキーマを生成してから、そのバッチを S3 にフラッシュします。スキーマは現在のイベントのバッチのみに基づいているため、バッチによってスキーマが異なる場合があります。

### イベントのバッチ処理 {#event-batching}

イベントのバッチは、次のパラメーターのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][7]を参照してください。

| 最大イベント数     | 最大バイト数       | タイムアウト (秒)   |
|----------------| ----------------| --------------------|
| なし           | 100,000,000     | 900                 |

[1]: /ja/logs/log_configuration/rehydrating/
[2]: /ja/observability_pipelines/destinations/datadog_archives/
[3]: https://console.aws.amazon.com/iam/
[4]: /ja/observability_pipelines/destinations/#template-syntax
[5]: /ja/observability_pipelines/configuration/set_up_pipelines/
[6]: https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3
[7]: /ja/observability_pipelines/destinations/#event-batching
[8]: https://app.datadoghq.com/observability-pipelines
[9]: /ja/api/latest/observability-pipelines/
[10]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[11]: /ja/observability_pipelines/configuration/set_up_pipelines/
[12]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[13]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[14]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/