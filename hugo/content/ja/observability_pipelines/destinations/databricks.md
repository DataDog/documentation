---
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Databricks (Zerobus) 宛先
---
{{< product-availability >}}

{{< callout url="#"
 btn_hidden="true" header="プレビューに参加しましょう">}}
Databricks (Zerobus) 宛先はプレビュー中です。アクセスをリクエストするには、アカウントマネージャーに連絡してください。
{{< /callout >}}

## 概要 {#overview}

Observability Pipelines の Databricks (Zerobus) 宛先を使用して、ログを Databricks Unity Catalog テーブルに送信します。送信先はログを [Zerobus Ingest API][1] にストリーミングし、OAuth サービス プリンシパルを使用して Databricks に認証します。

## 前提条件 {#prerequisites}

Databricks (Zerobus) 宛先を構成する前に、次のことを行う必要があります。

- [Observability Pipelines Worker がログを書き込む Unity Catalog スキーマとテーブル](#set-up-a-schema-and-table)のセットアップ。
- [Worker が Databricks に認証するために使用するサービス プリンシパル](#set-up-a-service-principal)のセットアップ。このサービス プリンシパルには、テーブルの読み取りおよび書き込みの権限が必要です。

### スキーマとテーブルのセットアップ{#set-up-a-schema-and-table}

このセクションの SQL 例では、次のプレースホルダーを使用します。

| プレースホルダー               | 説明                                | 例                    |
|---------------------------|--------------------------------------------|----------------------------|
| `<USER>`                  | スキーマとテーブルを作成するユーザー。| `databricks-user@example.com` |
| `<CATALOG_NAME>`          | Unity Catalog 名。                   | `main`                     |
| `<SCHEMA_NAME>`           | スキーマ名。                          | `obs_pipelines`            |
| `<TABLE_NAME>`            | テーブル名。                           | `apache_common_logs`       |
| `<YOUR_MANAGED_LOCATION>` | (オプション) 管理された場所の URI。      | `s3://your-bucket/managed` |

**注意**: `GRANT` コマンドは Databricks ワークスペース管理者によって実行される必要があります。

Databricks ワークスペース内で以下を行います。

1. Databricks ワークスペース管理者でない場合は、管理者に次のコマンドを実行して、スキーマを作成する権限をユーザーに付与してもらってください。
    ```sql
    GRANT CREATE SCHEMA ON CATALOG <CATALOG_NAME> TO <USER>;
    ```

1. スキーマを作成します。
    ```sql
    CREATE SCHEMA IF NOT EXISTS <CATALOG_NAME>.<SCHEMA_NAME>
    MANAGED LOCATION '<YOUR_MANAGED_LOCATION>';
    ```
    - **Note**: `MANAGED LOCATION` is optional. See Databricks' [Create Schemas][2] documentation for more information.

1. 管理者ユーザーでない場合は、管理者に次のコマンドを実行して、スキーマでテーブルを作成する権限をユーザーに付与してもらってください。
    ```sql
    GRANT CREATE TABLE ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <USER>;
    ```

1. Observability Pipelines がログデータを書き込むテーブルを作成するために、次のコマンドを実行します。
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

完全修飾テーブル名は `catalog.schema.table` で、例えば `main.obs_pipelines.apache_common_logs` です。これは、Observability Pipelines Databricksの宛先をセットアップする際に**テーブル名**に入力する値です。

### サービスプリンシパルのセットアップ{#set-up-a-service-principal}

Databricks の [Zerobus Ingest API][1] は OAuth 認証を使用します。サービスプリンシパルを作成すると、OAuth クライアントシークレットが生成され、OAuth クライアント ID はサービスプリンシパルの UUID になります。

サービスプリンシパルを作成するには、以下を行います。

1. Databricks ワークスペースで、[**User Settings**] (ユーザー設定) > [**Identity and access**] (アイデンティティとアクセス) > [**Service principals**] (サービスプリンシパル) に移動します。
1. [**Add service principal**] (サービスプリンシパルを追加) をクリックします。
1. サービスプリンシパルが作成された後、そのための OAuth シークレットを生成します。
    - サービスプリンシパルの**アプリケーション ID** (クライアント ID) と OAuth クライアントシークレットをメモしておいてください。Observability Pipelines Databricks の宛先を構成する際に、両方が必要です。
1. Databricks でこの SQL を実行して、サービスプリンシパルにカタログ、スキーマ、およびテーブルへのアクセスを付与します。`<SERVICE_PRINCIPAL_UUID>` を前のステップでメモしたサービスプリンシパルのアプリケーション ID で置き換えます。
    ```sql
    GRANT USE CATALOG ON CATALOG <CATALOG_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT USE SCHEMA ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT SELECT, MODIFY ON TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    ```

詳細については、Databricks の[アカウントにサービスプリンシパルを追加する][4]および[オブジェクトに対する権限を付与する][5]のドキュメントを参照してください。

## セットアップ{#setup}

[パイプラインをセットアップする][6]ときに、Databricks (Zerobus) 宛先を構成します。パイプラインのセットアップは、[UI][7] で、[API][8] を使用して、または [Terraform][9] で行えます。このセクションの手順は UI で構成されます。

**注意**: テーブルスキーマに存在しないログフィールドはドロップされます。例えば、ログにフィールド `id`、`name`、`host` があるのに、テーブルスキーマに `name` と `host` の列しか含まれていない場合、`id` フィールドはドロップされ、テーブルには書き込まれません。

パイプライン UI で Databricks (Zerobus) 宛先を選択した後:

<div class="alert alert-warning">Databricks (Zerobus) は、文字列形式のタイムスタンプを Databricks の <a href="https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type"><code>TIMESTAMP</code> タイプ</a>に変換しません。テーブルがタイムスタンプ列を使用している場合、詳細は<a href="#convert-string-timestamps-to-timestamp-format">文字列タイムスタンプをタイムスタンプ形式に変換する</a>を参照してください。</div>

<div class="alert alert-danger">シークレット管理について: OAuth クライアントシークレットの識別子のみを入力してください。実際の値は入力<b>しないでください</b>。</div>

{{% observability_pipelines/secrets_env_var_note %}}

1. Databricks ワークスペースの**取り込みエンドポイント**を入力します。`https://<workspace_id>.zerobus.<region>.cloud.databricks.com` などです。ワーカーはこのエンドポイントにログを送信します。
1. **テーブル名** を `catalog.schema.table` の形式で入力します。`main.obs_pipelines.apache_common_logs` などです。
1. Databricksワークスペース用の **Unity Catalog エンドポイント**を入力します。`https://<workspace>.cloud.databricks.com` などです。ワーカーはこのエンドポイントを使用してテーブルのスキーマを読み取ります。
1.  **認証 - クライアントID** フィールドに、サービスプリンシパルのアプリケーションIDを入力します。`abcdefgh-1234-5678-abcd-ef0123456789` などです。
1. **Auth - Client Secret** フィールドに、OAuth クライアントシークレットの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

### オプション設定 {#optional-settings}

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

### 文字列タイムスタンプをタイムスタンプ形式に変換する{#convert-string-timestamps-to-timestamp-format}

ログに文字列形式のタイムスタンプがあり、Databricks テーブルに[`TIMESTAMP` タイプ][11]として宣言されたタイムスタンプ列がある場合、ログを Databricks (Zerobus) 宛先に送信する前に、文字列をタイムスタンプ形式に変換する必要があります。Databricks (Zerobus) は、タイムスタンプ形式しかその `TIMESTAMP` 型に変換できません。

文字列のタイムスタンプを変換しないと、ワーカーは次のようなエラーをスローします。

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

文字列形式のタイムスタンプをタイムスタンプ形式に変換するには:

1. パイプラインに[カスタムプロセッサ][12]を追加します。
1. 次のカスタムスクリプトを持つ関数を追加します。
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][13] for more information.

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Databricks OAuth クライアントシークレット識別子:
    - Observability Pipelines Worker が Databricks に認証するために使用するサービスプリンシパルの OAuth クライアントシークレットを参照します。
    - デフォルトの識別子は `DESTINATION_DATABRICKS_ZEROBUS_OAUTH_CLIENT_SECRET` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/databricks_zerobus %}}

{{% /tab %}}
{{< /tabs >}}

## 宛先の動作方法{#how-the-destination-works}

### イベントのバッチ処理{#event-batching}

これらのパラメータのいずれかが満たされると、イベントのバッチがフラッシュされます。詳細については[イベントのバッチ処理][10]を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)   |
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