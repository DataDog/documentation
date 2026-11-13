---
description: Databricks (Zerobus) 送信先を使用して、Databricks Unity Catalog テーブルにログを送信する方法を学びましょう。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Databricks (Zerobus) 送信先
---
{{< product-availability >}}

{{< callout url="#"
 btn_hidden="true" header="プレビュー版を利用しましょう">}}
Databricks (Zerobus) 送信先はプレビュー版です。アクセスをリクエストするには、アカウントマネージャーにお問い合わせください。
{{< /callout >}}

## 概要 {#overview}

Observability Pipelines の Databricks (Zerobus) 送信先を使用して、Databricks Unity Catalog テーブルにログを送信します。この送信先は、[Zerobus Ingest API][1] にログをストリーミングし、OAuth サービスプリンシパルを使用して Databricks に対して認証を行います。

## 前提条件{#prerequisites}

Databricks (Zerobus) 送信先を構成する前に、以下を実施する必要があります。

Observability Pipelines Worker がログを書き込む - [Unity Catalog スキーマとテーブルを設定](#set-up-a-schema-and-table)します。
Worker が Databricks への認証に使用する- [サービスプリンシパルを設定](#set-up-a-service-principal)します。サービスプリンシパルには、テーブルへの読み取りおよび書き込み権限が必要です。

### スキーマとテーブルを設定する {#set-up-a-schema-and-table}

このセクションの SQL 例では、次のプレースホルダーを使用します。

| プレースホルダー               | 説明                                | 例                    |
|---------------------------|--------------------------------------------|----------------------------|
| `<USER>`                  | スキーマとテーブルを作成するユーザー。| `databricks-user@example.com` |
| `<CATALOG_NAME>`          | Unity Catalog 名。                   | `main`                     |
| `<SCHEMA_NAME>`           | スキーマ名。                          | `obs_pipelines`            |
| `<TABLE_NAME>`            | テーブル名。                           | `apache_common_logs`       |
| `<YOUR_MANAGED_LOCATION>` | (オプション) 管理対象ロケーションの URI。      | `s3://your-bucket/managed` |

**注**: `GRANT` コマンドは、Databricks ワークスペース管理者が実行する必要があります。

Databricks ワークスペースで、

1. Databricks ワークスペース管理者でない場合は、管理者に次のコマンドを実行してもらい、ユーザーにスキーマを作成する権限を付与してください。
    ```sql
    GRANT CREATE SCHEMA ON CATALOG <CATALOG_NAME> TO <USER>;
    ```

1. スキーマを作成します。
    ```sql
    CREATE SCHEMA IF NOT EXISTS <CATALOG_NAME>.<SCHEMA_NAME>
    MANAGED LOCATION '<YOUR_MANAGED_LOCATION>';
    ```
    - **Note**: `MANAGED LOCATION` is optional. See Databricks' [Create Schemas][2] documentation for more information.

1. 管理者ユーザーでない場合は、管理者に次のコマンドを実行してもらい、ユーザーにスキーマ上でテーブルを作成する権限を付与してください。
    ```sql
    GRANT CREATE TABLE ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <USER>;
    ```

1. 次のコマンドを実行して、Observability Pipelines がログデータを書き込むテーブルを作成します。
    ```sql
    CREATE TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> (
      host STRING,
      message STRING,
      service STRING,
      source_type STRING,
      timestamp TIMESTAMP
    );
    ```
    - See Databricks' [Create a Unity Catalog Managed Table][3] documentation for more information.

完全修飾テーブル名は `catalog.schema.table` です (例: `main.obs_pipelines.apache_common_logs`)。これは、Observability Pipelines Databricks 送信先を設定する際に {{< ui >}}Table Name{{< /ui >}} に入力する値です。

### サービスプリンシパルを設定{#set-up-a-service-principal}

Databricks [Zerobus Ingest API][1] は OAuth 認証を使用します。サービスプリンシパルを作成すると、OAuth クライアントシークレットが生成され、OAuth クライアント ID がサービスプリンシパルの UUID になります。

サービスプリンシパルを作成するには、

1. Databricks ワークスペースで、**User Settings** &gt; **Identity and access** &gt; **Service principals** に移動します。
1. **Add service principal** をクリックします。
1. サービスプリンシパルが作成されたら、その OAuth シークレットを生成します。
    - サービスプリンシパルの **アプリケーション ID** (クライアント ID) と OAuth クライアントシークレットを控えておきます。Observability Pipelines Databricks 送信先を設定する際には、その両方が必要です。
1. Databricks でこの SQL を実行し、サービスプリンシパルにカタログ、スキーマ、およびテーブルへのアクセス権を付与します。`<SERVICE_PRINCIPAL_UUID>` を、前のステップで取得したサービスプリンシパルのアプリケーション ID に置き換えてください。
    ```sql
    GRANT USE CATALOG ON CATALOG <CATALOG_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT USE SCHEMA ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT SELECT, MODIFY ON TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    ```

詳細については、Databricks の[アカウントへのサービスプリンシパルの追加][4]および[オブジェクトに対する権限の付与][5]のドキュメントを参照してください。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: OAuth クライアントシークレットの識別子のみを入力してください。実際の値は<b>入力しないで</b>ください。</div>

[パイプラインをセットアップ][6]する際に、Databricks (Zerobus) 送信先を設定します。パイプラインは、[UI][7]、[API][8]、または [Terraform][9] を使用して設定できます。このセクションの手順は UI で設定します。

**注**: テーブルスキーマに存在しないログフィールドは破棄されます。たとえば、ログに `id`、`name`、`host` というフィールドがあり、テーブルスキーマに `name` と `host` という列しか含まれていない場合、`id` フィールドは破棄され、テーブルには書き込まれません。

パイプライン UI で Databricks (Zerobus) 送信先を選択した後、

<div class="alert alert-warning">

<ul>
<li>Databricks (Zerobus) は、文字列形式のタイムスタンプを Databricks の <a href="https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type"><code>TIMESTAMP</code> 型</a>に変換しません。テーブルでタイムスタンプ列を使用している場合は、<a href="#convert-string-timestamps-to-timestamp-format">文字列タイムスタンプをタイムスタンプ形式に変換する</a>を参照して詳細を確認してください。

<li> ログフィールドの値は、テーブルスキーマ内の対応する列のデータ型と一致している必要があります。詳細については、<a href="#data-type-of-log-field-values">ログフィールド値のデータ型</a>を参照してください。
</ul>
</div>

1. Databricks ワークスペースの{{< ui >}}Ingestion Endpoint{{< /ui >}}を入力します (例: `https://<workspace_id>.zerobus.<region>.cloud.databricks.com`)。Worker はこのエンドポイントにログを送信します。
1. {{< ui >}}Table Name{{< /ui >}} を`catalog.schema.table`の形式で入力します (例: `main.obs_pipelines.apache_common_logs`)。
1. Databricks ワークスペースの{{< ui >}}Unity Catalog Endpoint{{< /ui >}}を入力します (例: `https://<workspace>.cloud.databricks.com`)。Worker はこのエンドポイントを使用してテーブルのスキーマを読み取ります。
1. {{< ui >}}Auth - Client ID{{< /ui >}} フィールドに、`abcdefgh-1234-5678-abcd-ef0123456789` などのサービスプリンシパルのアプリケーション ID を入力します。
1. {{< ui >}}Auth - Client Secret{{< /ui >}} フィールドに、OAuth クライアントシークレットの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 文字列のタイムスタンプをタイムスタンプ形式に変換する {#convert-string-timestamps-to-timestamp-format}

ログのタイムスタンプが文字列形式で、Databricks テーブルに [`TIMESTAMP` 型][11]として宣言されたタイムスタンプ列がある場合は、ログを Databricks (Zerobus) 送信先に送信する前に、文字列をタイムスタンプ形式に変換する必要があります。Databricks (Zerobus) は、タイムスタンプ形式をその `TIMESTAMP` 型にのみ変換できます。

文字列のタイムスタンプを変換しない場合、Worker は次のようなエラーをスローします。

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

文字列形式のタイムスタンプをタイムスタンプ形式に変換するには、次の手順を実行します。

1. パイプラインに[カスタムプロセッサ][12]を追加します。
1. 次のカスタムスクリプトを含む関数を追加します。
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][13] for more information.

## ログフィールド値のデータ型 {#data-type-of-log-field-values}

ログフィールドの値は、テーブルスキーマ内の対応する列のデータ型と一致している必要があります。たとえば、テーブルスキーマで `message` が `STRING` と定義されているにもかかわらず、受信したログの `message` フィールドが `{"message": {"some": "string"}}` のようなオブジェクトである場合、Worker はイベントをエンコードできず、バッチ全体を破棄して次のようなエラーをスローします。

```
error=Some(EncodingError { message: "Failed to encode batch: SerializingError(Arrow JSON decoding error: Json error: whilst decoding field 'message': expected string got {...})" }) request_id=1142 error_type="request_failed" stage="sending"
```

このエラーを防ぐには、[カスタムプロセッサ][17]を使用して、ログフィールドをテーブルスキーマで想定されているデータ型に変換してください。

## シークレットのデフォルト値 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Databricks OAuth クライアントシークレット識別子:
    - Observability Pipelines Worker が Databricks への認証に使用するサービスプリンシパルの OAuth クライアントシークレットを参照します。
    - デフォルトの識別子は `DESTINATION_DATABRICKS_ZEROBUS_OAUTH_CLIENT_SECRET` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/databricks_zerobus %}}

{{% /tab %}}
{{< /tabs >}}

## Health メトリクス {#health-metrics}

すべての送信先から出力される[コンポーネントメトリクス][14]および[送信先バッファメトリクス][15]については、[Pipelines 使用状況メトリクス][16]ドキュメントを参照してください。Databricks 送信先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:databricks_zerobus` を使用します。

## 送信先の仕組み {#how-the-destination-works}

### イベントのバッチ処理 {#event-batching}

イベントのバッチは、これらのパラメータのいずれかを満たしたときにフラッシュされます。詳細については、[送信先のイベントバッチ処理][10]を参照してください。

| 最大イベント数| 最大サイズ (MB) | タイムアウト (秒)   |
|----------------|-------------------|---------------------|
| なし           | 10                | 1                   |

[1]: https://docs.databricks.com/aws/en/ingestion/zerobus-overview
[2]: https://docs.databricks.com/aws/en/schemas/create-schema
[3]: https://docs.databricks.com/aws/en/tables/managed#create-a-managed-table
[4]: https://docs.databricks.com/aws/en/admin/users-groups/manage-service-principals#-add-service-principals-to-your-account
[5]: https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/?language=Catalog%C2%A0Explorer#-grant-permissions-on-an-object
[6]: /ja/observability_pipelines/configuration/set_up_pipelines/
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /ja/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /ja/observability_pipelines/destinations/#event-batching
[11]: https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type
[12]: /ja/observability_pipelines/processors/custom_processor#setup
[13]: /ja/observability_pipelines/processors/custom_processor/#parse_timestamp
[14]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[15]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[16]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[17]: /ja/observability_pipelines/processors/custom_processor/