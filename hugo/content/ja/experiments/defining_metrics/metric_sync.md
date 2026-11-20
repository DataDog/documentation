---
description: YAML で実験メトリクスを定義し、変更をプレビューして、CI から Datadog に同期してください。
further_reading:
- link: /experiments/defining_metrics/
  tag: ドキュメント
  text: 実験メトリクスを作成する
- link: /experiments/guide/connecting_a_data_warehouse/
  tag: ドキュメント
  text: データウェアハウスを接続する
- link: /account_management/api-app-keys/
  tag: ドキュメント
  text: API キーとアプリケーションキー
title: YAML から実験メトリクスを同期する
---
## 概要{#overview}

実験メトリクスは、収益、コンバージョン率、ページビューなど、実験を評価するために使用する成果を定義します。これらのメトリクスを Datadog で手動で作成するか、YAML でウェアハウスメトリクスを定義してください。Datadog Experiments Metric Sync CLI を使用して、YAML 定義を Datadog に同期してください。

次のような場合に Metric Sync を使用します。

- プルリクエストでメトリクスの変更を確認する。
- メトリクスの定義をバージョン管理に保持する。
- メトリクスの変更が承認された後、CI から適用する。
- 同期されたメトリクスを、実験の意思決定のためにデフォルトで認定済みとしてマークする。

Metric Sync は、プランと適用のワークフローをサポートしています。`plan` コマンドは、YAML を検証し、Datadog が行う変更をプレビューします。`execute` コマンドは、YAML を検証し、書き込み操作を送信して、完了を待機します。結果には、変更数、オブジェクト ID、フィールドの変更、ブロックされた理由、警告、および利用可能なエラー詳細が含まれます。プランには提案された変更が表示されます。操作が失敗した場合、それらの変更が適用されたかどうかは確認されません。

## 前提条件{#prerequisites}

Metric Sync を使用する前に、以下が必要です。

- Product Analytics と Experiments が有効になっている Datadog アカウント。
- 接続されたデータウェアハウス。「[データウェアハウスを接続する][1]」を参照してください。
- ソースクエリの列にマッピングする `User` などの既存のサブジェクトタイプ。
- 実験メトリクスを作成および更新するために必要な Product Analytics 権限。同期されたメトリクスはデフォルトで認定されるため、カスタムロールには Product Analytics Certified Metrics Write 権限も必要です。「[Product Analytics の権限][2]」を参照してください。
- CI 認証用の Datadog API キーとアプリケーションキー。「[API キーとアプリケーションキー][3]」を参照してください。

## CLI をインストールする{#install-the-cli}

最新の Metric Sync CLI リリースをインストールしてください。

```shell
curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
```

インストールスクリプトは macOS または Linux を検出し、一致する GitHub リリースアーカイブをダウンロードし、SHA-256 チェックサムを検証して、`metric-sync` バイナリを `/usr/local/bin` にインストールします。システム権限によっては、`/usr/local/bin` へのインストールに `sudo` が必要な場合があります。昇格された権限なしでインストールするには、`INSTALL_DIR` を自分が所有するディレクトリに設定してください。

特定のバージョンをインストールする場合や、別のディレクトリにインストールする場合は、以下を実行します。

```shell
curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | env VERSION=<VERSION> INSTALL_DIR="$HOME/.local/bin" sh
export PATH="$HOME/.local/bin:$PATH"
```

環境変数で Datadog 認証情報を設定してください。

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_APP_KEY=<DATADOG_APPLICATION_KEY>
```

デフォルトでは、CLI は `datadoghq.com` にリクエストを送信します。組織で別の Datadog サイトを使用している場合は、`DD_SITE` を設定してください。

```shell
export DD_SITE={{< region-param key="dd_site" >}}
```

## メトリクス定義を作成する{#create-a-metric-definition}

リポジトリ内の専用ディレクトリに 1 つ以上の YAML ファイルを作成してください。CLI は、ファイル、複数のファイル、ディレクトリ、または複数のディレクトリを受け入れます。ディレクトリを渡すと、CLI は隠しサブディレクトリを除き、`.yaml` および `.yml` ファイルを再帰的に検出します。1 ファイルにつき 1 つの YAML ドキュメントを使用してください。CLI は、`---` セパレーター後の空のドキュメントを含め、同じファイル内の追加ドキュメントを拒否します。追加の定義は別のファイルに記述し、ディレクトリごと提出してください。

次の例では、1 つのデータウェアハウスメトリクスソースと、`metric_type: simple` の 1 つのメトリクスを定義しています。このメトリクスには、US と CA のイベントが含まれます。この例を使用する前に、以下を実行します。

- SQL クエリを、お使いのデータウェアハウス用のクエリに置き換えてください。タイムスタンプ、サブジェクトマッピング、メジャー、またはプロパティによって使用されるすべての列を返してください。
- YAML の列名を、大文字小文字の違いを含め、クエリによって返される名前と一致させてください。
- `User` を既存の Datadog サブジェクトタイプ名に置き換えてください。Metric Sync はサブジェクトタイプを作成しません。
- この一連の定義に対して安定した `sync_tag` を選択し、`reference_url` をリポジトリの URL に置き換えてください。
- 組織に複数のデータウェアハウスコネクションがある場合は、`warehouse_connection_id` をトップレベルでまたは各ソースに対して設定してください。ソースレベルの値は、トップレベルの値よりも優先されます。組織のコネクションが 1 つしかない場合、ID が省略されると CLI はそのコネクションを選択します。

```yaml
schema_version: 1
sync_tag: example-checkout
reference_url: https://github.com/example-org/example-repo

warehouse_metric_sources:
  - sync_id: checkout_events
    name: Checkout events
    sql: |
      SELECT user_id, event_timestamp, transaction_timestamp, revenue, country, platform
      FROM analytics.checkout_events
    timestamp_column: event_timestamp
    additional_timestamp_columns:
      - transaction_timestamp
    subject_types:
      - name: User
        column_name: user_id
    measures:
      - sync_id: revenue
        name: Revenue
        column_name: revenue
        column_type: FLOAT
    properties:
      - sync_id: country
        property_name: Country
        property_column: country
        property_type: STRING
      - sync_id: platform
        property_name: Platform
        property_column: platform
        property_type: STRING

metrics:
  - sync_id: checkout_revenue
    name: Checkout revenue
    metric_type: simple
    desired_change: METRIC_INCREASES
    simple_metric_aggregation:
      operation: sum
      measure:
        warehouse_metric_source_sync_id: checkout_events
        measure_sync_id: revenue
      timeframe_start_value: 0
      winsor_upper_percentile: 0.99
      winsorization_strategy: nonzero
      property_filters:
        property:
          warehouse_metric_source_sync_id: checkout_events
          property_sync_id: country
        operation: IS
        values: [US, CA]
```

## 変更をプレビューして同期する{#preview-and-sync-changes}

各送信で、その`sync_tag` によって管理されるソースとメトリクスの完全なセットが定義されます。そのタグによってすでに管理されているものの、送信されたファイルに含まれていないオブジェクトは、削除の候補となります。変更されていない定義を含め、タグのすべてのファイルをまとめて送信してください。

| コマンド| チェックまたは実行内容| 定義を変更するか|
| ------- | ---------------------- | -------------------- |
| `validate` | YAML 構文とサポートされているローカルルールをチェックします。Datadog は呼び出しません。| いいえ|
| `plan` | ローカルチェックを実行し、提案された変更のサーバープレビューを要求します。| いいえ|
| `execute` | ローカルチェックを実行し、定義を適用する操作を送信します。`--no-poll` を使用しない限り、完了まで待機します。| はい、操作が成功した場合 |

プランが成功しても、外部ソースや選択したメジャーが存在することは確認されません。Datadog は `execute` 中に外部参照を解決します。

変更を適用する前にプレビューするには、次のように `plan` を実行してください。

```shell
metric-sync plan ./metrics
```

プランの出力には、操作 ID、同期タグ、ステータス、提案されたフィールドの変更、およびブロックされた理由が表示されます。実行前にこれらの詳細を確認してください。`plan`、`execute`、および `result` コマンドは、操作が失敗した場合、または結果にブロックされたオブジェクトやエラーが含まれている場合に、ゼロ以外のステータスで終了します。トラブルシューティングのために API レスポンスを保存するには、`--log-file ./metric-sync-plan.log` を追加してください。

プランを確認した後、次のように `execute` を実行して、変更を適用します。

```shell
metric-sync execute ./metrics
```

`execute` は、ローカル検証を実行し、Metric Sync 書き込み操作を Datadog に送信し、操作が終了状態に達するまでポーリングを行い、結果の概要を出力します。

`execute`は YAML を再度読み取り、新しい操作を作成します。保存されたプランを ID で適用することはありません。両方のコマンドで、同じ確認済みファイルとオプションを使用してください。

以下を実行することもできます。

```shell
metric-sync validate ./metrics
metric-sync status <METRIC_SYNC_ID>
metric-sync result <METRIC_SYNC_ID>
metric-sync version
```

各コマンドは以下の処理を行います。

- `status`: ID で操作をチェックします。
- `result`: 最終プランまたは実行結果を取得します。
- `version`: ビルドメタデータを表示します。

デフォルトの 10 分のコマンドタイムアウトを変更するには、`--timeout 20m` を使用してください。送信後にコマンドがタイムアウトした場合は、再度送信する前に、`status` で表示される操作 ID をチェックしてください。待機せずに送信するには `--no-poll` を使用し、その後 `status` と `result` をチェックしてください。`--no-poll` コマンドが成功しても、送信が確認されるだけです。

## GitHub Actions の例{#github-actions-example}

以下のワークフローは、プルリクエストで `plan` を実行し、変更が `main` にマージされた後に `execute` を実行します。

```yaml
name: Sync Datadog experiment metrics

on:
  pull_request:
    paths:
      - "metrics/**/*.yaml"
      - "metrics/**/*.yml"
      - ".github/workflows/datadog-metric-sync.yml"
  push:
    branches:
      - main
    paths:
      - "metrics/**/*.yaml"
      - "metrics/**/*.yml"

jobs:
  plan:
    if: github.event_name == 'pull_request' && github.event.pull_request.head.repo.full_name == github.repository
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Metric Sync CLI
        run: curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
      - name: Plan metric changes
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        run: metric-sync plan ./metrics

  execute:
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    concurrency:
      group: metric-sync-example-checkout
      cancel-in-progress: false
    steps:
      - uses: actions/checkout@v4
      - name: Install Metric Sync CLI
        run: curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
      - name: Apply metric changes
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        run: metric-sync execute ./metrics
```

Datadog API キーとアプリケーションキーを GitHub Actions のシークレットとして保存してください。組織が `datadoghq.com` 以外の Datadog サイトを使用している場合は、ワークフロー環境に `DD_SITE` を追加してください。

このワークフローによる実行の重複を防ぐため、同期タグごとに同時実行グループを使用してください。plan ジョブは、同じリポジトリからのプルリクエストに対してのみ実行されます。フォークされたプルリクエストにはこれらのシークレットは渡されません。そのようなコントリビューションの場合、認証情報なしで `validate` を実行し、その後、信頼できるワークフローで `plan` を実行してください。

## 定義リファレンス {#yaml-reference}

### 同期タグと ID{#sync-tags-and-ids}

`sync_tag` は、まとめて管理されるメトリクス定義のセットを識別します。個別に管理したいリポジトリ、チーム、またはメトリクスドメインごとに、安定した `sync_tag` を使用してください。たとえば、グロースチームとチェックアウトチームは、`growth-metrics` や `checkout-metrics` といった異なる `sync_tag` 値を使用することで、異なるリポジトリからメトリクスを同期できます。

`sync_tag` 内で、ウェアハウスメトリクスソースとメトリクスごとに安定した `sync_id` があります。宣言された各プロパティとメジャーにも、それぞれが属するソース上のリスト内で一意の `sync_id` が必要です。安定した ID を選択してください。UUID である必要はありません。メトリクス集計は、`warehouse_metric_source_sync_id` を使用してウェアハウスメトリクスソースを選択します。各集計は、宣言されたメジャー、各行、またはサブジェクトマッピングも選択します。「[メジャー参照][4]」セクションを参照してください。

`sync_id` を変更すると、古い ID を持つオブジェクトが削除され、代わりに別のオブジェクトが作成される可能性があります。オブジェクトの名前を変更するには、その `name` を変更し、`sync_tag` と `sync_id` は同じにしてください。

ソースとその依存メトリクスは 2 回の送信で削除してください。まずメトリクス定義を削除し、ソースと関連のないすべての定義を保持したまま、`plan` および `execute` を実行してください。次に、ソースを削除して、残りの定義を送信してください。ソースとそのメトリクスを 1 回の操作で削除するプランは、検証に合格しても、実行で失敗することがあります。ソースを削除する前に、他の同期タグからの参照も削除する必要があります。

1 つの操作内のすべてのファイルは、同じ `schema_version` および `sync_tag` を使用する必要があります。デフォルトが適用された後、それらの `options` は一致する必要があります。たとえば、`is_certified` を省略することは、それに `true` を設定することと同等です。空ではないトップレベルの `reference_url` および `warehouse_connection_id` の値も、ファイル間で一致している必要があります。

### YAML で既存のメトリクスとソースを管理する {#manage-existing-metrics-with-yaml}

CLI は、既存のメトリクスを YAML にエクスポートしません。ソースとメトリクスの定義から YAML を作成し、それをバージョン管理に保存してください。移行の場合、`existing_id` はターゲットの Datadog 組織にすでに存在するオブジェクトを指します。

YAML を使用して手動で作成した既存のソースまたはメトリクスを管理するには、以下の手順に従います。

1. 完全な定義を含め、安定した `sync_id` を割り当てます。
2. そのソースまたはメトリクスの `existing_id` に Datadog オブジェクトの UUID を設定します。これは、YAML 用に選択する `sync_id` とは異なります。
3. 送信するすべてのファイルに `options.upgrade_mode: by_id` を設定し、`plan` を実行して、`execute` の前に変更内容を確認します。

取り込みを行うと、YAML 定義を適用され、既存オブジェクトに同期の所有権が割り当てられます。その後の同期では、同じ `sync_tag` および `sync_id` によって識別されます。保持したい設定とソースマッピングを含めてください。フィールドを省略すると、デフォルト値が使用される場合と、マッピングが削除される場合があります。

### トップレベルのフィールド {#top-level-fields}

| フィールド | 必須 | 説明 |
| ----- | -------- | ----------- |
| `schema_version` | はい | `1`である必要があります。|
| `sync_tag` | はい | このメトリクス定義グループの安定した所有権キー。1 回の操作に含まれるすべてのファイルは、同じ `sync_tag` を使用する必要があります。<br>英数字で始まり、英数字、アンダースコア、ドット、コロン、ダッシュを含めることができます。|
| `reference_url` | いいえ | 同期されたメトリクスのソースリポジトリ、ランブック、またはその他の参照先への URL。|
| `warehouse_connection_id` | いいえ | この送信内のソースに使用するデフォルトのウェアハウスコネクション UUID。ソースにコネクションが必要で、ID が設定されていない場合、CLI は組織内に 1 つだけあるコネクションを選択し、選択肢が一意に定まらない場合はエラーを報告します。|
| `warehouse_metric_sources` | いいえ | メトリクスが使用するウェアハウス SQL モデルおよびメジャー。このタグで管理され、保持したいすべてのソースを含めます。|
| `metrics` | いいえ | 作成または更新する実験メトリクス。このタグで管理され、保持したいすべてのメトリクスを含めます。|
| `options` | いいえ | 認定やアップグレードの動作などの同期オプション。|

### オプション {#options}

| フィールド | デフォルト | 説明 |
| ----- | ------- | ----------- |
| `is_certified` | `true` | 同期されたメトリクスを認定済みとしてマークします。このオプションはデフォルトで `true` に設定されているため、`false` に設定しない限り、メトリクスの同期には「Product Analytics Certified Metrics Write」権限が必要です。|
| `upgrade_mode` | `none` | オブジェクトの `existing_id` とともに `by_id` を使用して、そのオブジェクトを同期の管理対象に取り込んでください。CLI は名前による取り込みをサポートしていません。|
| `force_delete` | `false` | アクティブまたは実行中の実験からの参照がある場合でも削除を許可します。この同期タグ以外のメトリクスから参照されているソースは、引き続き削除できません。参照されていないオブジェクトの通常の削除に、このオプションは必要ありません。|

### ウェアハウスメトリクスソース {#warehouse-metric-sources}

| フィールド | 必須 | 説明 |
| ----- | -------- | ----------- |
| `sync_id` | はい | この `sync_tag` 内のソースの安定した識別子。<br>英数字で始まる必要があり、英数字、アンダースコア、ドット、コロン、ダッシュを含めることができます。|
| `existing_id` | いいえ | `options.upgrade_mode: by_id` を使用して取り込む Datadog ウェアハウスメトリクスソースの UUID。|
| `name` | はい | Datadog での表示名。|
| `description` | いいえ | ソースの説明。|
| `sql` | はい | メトリクスで使用されるタイムスタンプ、サブジェクト列、およびメジャーを返す SQL クエリ。|
| `timestamp_column` | はい | イベントまたはメトリクスのタイムスタンプを含む列。|
| `additional_timestamp_columns` | いいえ | `sql` によって返される最大 4 つの追加タイムスタンプ列。各名前には、空白以外の文字が少なくとも 1 つ含まれていて、長さが 255 文字以内である必要があります。名前は、空白をトリミングした後に一意でなければならず、`timestamp_column` を含めることはできません。省略した場合、ソースに追加のタイムスタンプ列はありません。|
| `warehouse_connection_id` | いいえ | このソースのウェアハウスコネクションの UUID。トップレベルの値をオーバーライドします。|
| `reference_url` | いいえ | ソース固有の参照 URL。|
| `subject_types` | はい | ソースに対する少なくとも 1 つのサブジェクトマッピング。|
| `measures` | いいえ | メトリクスが集計する列。|
| `properties` | いいえ | メトリクスイベントのフィルタリングに使用される列。これらの列をソース SQL に含めてください。|

### サブジェクトタイプ {#subject-types}

| フィールド | 必須 | 説明 |
| ----- | -------- | ----------- |
| `name` | はい | Datadog サブジェクトタイプ名 (`User` や `Account` など)。|
| `column_name` | はい | サブジェクト識別子を含む SQL 結果の列。|

### メジャー {#measures}

| フィールド | 必須 | 説明 |
| ----- | -------- | ----------- |
| `sync_id` | はい | ウェアハウスメトリクスソース内の安定した識別子。|
| `name` | はい | Datadog での表示名。|
| `column_name` | はい | SQL 結果の列名。|
| `column_type` | はい | Datadog が列を検証し、正しいメトリクス構成オプションを表示するために必要です。サポートされる値は、`STRING`、`INTEGER`、`FLOAT`、`BOOLEAN`、`DATE`、および`TIMESTAMP` です。|
| `description` | いいえ | メジャーの説明。|

### プロパティ {#properties}

ウェアハウスメトリクスソースで `properties` を使用して、フィルター用の列を宣言してください。

| フィールド | 必須 | 説明 |
| ----- | -------- | ----------- |
| `sync_id` | はい | ソースのプロパティリスト内の安定した識別子。フィルターは `property_sync_id` を使用してこれを参照します。|
| `property_name` | はい | Datadog での表示名。|
| `property_column` | はい | SQL 結果の列名。|
| `property_type` | はい | 列タイプ (`STRING` など)。|
| `description` | いいえ | プロパティの説明。|

これらのプロパティフィールド名は API と一致します。以前のプロパティフィールド `name`、`column_name`、および `column_type` を `property_name`、`property_column`、および `property_type` に置き換えてください。CLI は以前のプロパティ名を拒否します。メジャー定義では引き続き `name`、`column_name`、および `column_type` を使用します。

Datadog YAML 形式は Eppo の形式とは異なります。移行時には `fact_sources` と `facts` を `warehouse_metric_sources` と `measures` に置き換え、プロパティ定義と参照を更新してこのガイドのフィールドを使用するようにしてください。

### メトリクス {#metrics}

| フィールド | 必須 | 説明 |
| ----- | -------- | ----------- |
| `sync_id` | はい | この `sync_tag` 内のメトリクスの安定した識別子。|
| `existing_id` | いいえ | `options.upgrade_mode: by_id` を使用して取り込む Datadog メトリクスの UUID。|
| `name` | はい | Datadog での表示名。|
| `description` | いいえ | メトリクスの説明。|
| `metric_type` | はい | 指定可能な値は、`simple`、`ratio`、および `percentile` です。|
| `desired_change` | いいえ | 実験の解釈に使用される方向。指定可能な値は、`METRIC_INCREASES` と `METRIC_DECREASES` です。|
| `format_as_percent` | いいえ | メトリクスをパーセンテージとして表示します。|
| `reference_url` | いいえ | メトリクス固有の参照 URL。|
| `guardrail_cutoff_threshold` | いいえ | オプションのガードレールカットオフしきい値。|

メトリクスタイプに対応する集計フィールドを追加してください。

- `metric_type: simple` の場合、`simple_metric_aggregation` を追加します。
- `metric_type: ratio` の場合、`ratio_metric_aggregation` を追加します。
- `metric_type: percentile` の場合、`percentile_metric_aggregation` を追加します。

<a id="simple-metric-aggregation"></a>

### `simple` メトリクスの集計 {#aggregation-for-simple-metrics}

ウィンザー化パーセンタイルおよびパーセンタイルメトリクスでは、小数を使用します。たとえば、`0.95` はどちらの場合も第 95 パーセンタイルを意味します。

| フィールド | 必須 | 説明 |
| ----- | -------- | ----------- |
| `operation` | はい | `sum`、`average`、`count`、または `countDistinctValue` などの集計操作。|
| `measure` | はい | メジャー参照。|
| `property_filters` | いいえ | 集計に含まれるイベントのフィルター。「[フィルター][5]」セクションを参照してください。|
| `timeframe_start_value` | いいえ | メトリクス時間枠の開始オフセット。|
| `timeframe_end_value` | いいえ | メトリクス時間枠の終了オフセット。|
| `timeframe_unit` | いいえ | 時間枠の単位。|
| `winsor_lower_percentile` | いいえ | 下限ウィンザー化パーセンタイル (0 から 1 まで、両端を含む)。両方が設定されている場合、`winsor_upper_percentile` より小さくなければなりません。|
| `winsor_upper_percentile` | いいえ | 上限ウィンザー化パーセンタイル (0 から 1 まで、両端を含む)。|
| `winsor_lower_fixed_value` | いいえ | 下限固定ウィンザー化値。|
| `winsor_upper_fixed_value` | いいえ | 上限固定ウィンザー化値。|
| `winsorization_strategy` | いいえ | サポートされている値は、`all_assigned_subjects` (デフォルト) と `nonzero` です。`operation: threshold` の場合、このフィールドを省略するか、`all_assigned_subjects` を使用してください。|

既存のオブジェクトを更新するまたは取り込む場合を含め、`additional_timestamp_columns` または `winsorization_strategy` を省略すると、上記のデフォルトが適用されます。値を設定するには、これらのフィールドを YAML に含めてください。

### 比率メトリクス集計 {#ratio-metric-aggregation}

`ratio_metric_aggregation` を使用すると、分子を分母で割ったものとしてメトリクスを定義できます。`numerator_aggregation` と `denominator_aggregation` はどちらも `simple_metric_aggregation` と同じフィールドを使用しますが、どちらのコンポーネントも `operation: average` をサポートしていません。

`winsorization_strategy` を各集計で個別に設定します。省略した場合、各集計は `all_assigned_subjects` を使用します。

| フィールド | 必須 | 説明 |
| ----- | -------- | ----------- |
| `numerator_aggregation` | はい | 分子として使用される集計。|
| `denominator_aggregation` | はい | 分母として使用される集計。|

比率メトリクス集計の例

```yaml
ratio_metric_aggregation:
  numerator_aggregation:
    operation: sum
    measure:
      warehouse_metric_source_sync_id: checkout_events
      measure_sync_id: revenue
    winsor_upper_percentile: 0.99
    winsorization_strategy: nonzero
  denominator_aggregation:
    operation: count
    measure:
      warehouse_metric_source_sync_id: checkout_events
      kind: each_record
    winsorization_strategy: all_assigned_subjects
```

### パーセンタイルメトリクス集計 {#percentile-metric-aggregation}

| フィールド | 必須 | 説明 |
| ----- | -------- | ----------- |
| `measure` | はい | メジャー参照。|
| `property_filters` | いいえ | 集計に含まれるイベントのフィルター。「[フィルター][5]」セクションを参照してください。|
| `percentile` | はい | 0 より大きく 1 より小さい小数。第 95 パーセンタイルには `0.95` を使用します。|

時間枠フィールドはパーセンタイルメトリクスを構成しません。

パーセンタイルメトリクス集計の例

```yaml
percentile_metric_aggregation:
  percentile: 0.95
  measure:
    warehouse_metric_source_sync_id: checkout_events
    measure_sync_id: revenue
```

### フィルター {#filters}

`simple_metric_aggregation` の `property_filters` を、いずれかの比率コンポーネント、または `percentile_metric_aggregation` に設定してください。すべてのフィルターは、集計のメジャーと同じソースおよび同期タグを参照する必要があります。

1 つの条件に、単一のフィルターオブジェクトを使用します。

```yaml
property_filters:
  property:
    warehouse_metric_source_sync_id: checkout_events
    property_sync_id: country
  operation: IS
  values: [US, CA]
```

リスト内のいずれかの値を含めるには `IS` を、リスト内の値を除外するには `IS_NOT` を使用します。どちらの操作も、少なくとも 1 つの値が必要です。`property_sync_id` は、ソース上で宣言されたプロパティと一致する必要があります。別の同期タグからソースをフィルタリングするには、プロパティ参照と集計のメジャー参照の両方に `warehouse_metric_source_sync_tag` を含めます。

すべてが一致する必要がある複数の条件 (AND) には、フラットリストを使用します。

```yaml
property_filters:
  - property:
      warehouse_metric_source_sync_id: checkout_events
      property_sync_id: country
    operation: IS
    values: [US]
  - property:
      warehouse_metric_source_sync_id: checkout_events
      property_sync_id: platform
    operation: IS
    values: [web]
```

この例には、国が US でプラットフォームが web であるイベントが含まれます。これは、完全なソース例で宣言された `country` および `platform` プロパティを使用します。単一のフィルターまたはフラットリストは、API リクエストにおいて 1 つのフィルターグループになります。

代替条件 (OR) には、ネストされたグループを使用します。各グループ内の条件は AND を使用し、別のグループは OR を使用します。

```yaml
property_filters:
  -
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: country
      operation: IS
      values: [US]
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: platform
      operation: IS
      values: [web]
  -
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: country
      operation: IS
      values: [CA]
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: platform
      operation: IS
      values: [mobile]
```

この例では、国が US でプラットフォームが web、または国が CA でプラットフォームが mobile であるイベントが含まれます。各グループには、少なくとも 1 つの条件を含める必要があります。個別のフィルターとグループを同じリスト内に混在させないでください。

新しい YAML の `operation` を使用します。以前の `operator` フィールドはエイリアスとして残りますが、両方を設定するフィルターは CLI によって拒否されます。リクエストは常に `operation` を使用します。フィルター値は、`001` のような数値に見える値を含め、そのテキストを保持します。他の YAML ツールで値を文字列として保持する必要がある場合は、値を引用符で囲んでください。YAML のアンカーとエイリアスはオプションであり、単一のドキュメント内で機能します。

パーセンタイルメトリクスは、`IS` または `IS_NOT` を使用するプロパティフィルターのみをサポートします。メジャーフィルターや null チェックはサポートされません。

### メジャー参照{#measure-references}

各集計では、`warehouse_metric_source_sync_id` を持つソースと、以下のメジャーセレクターのうちいずれか 1 つだけを選択する必要があります:

| セレクター | 選択対象 |
| -------- | --------------- |
| `measure_sync_id` | ソースの `measures` リストで宣言されたメジャー。|
| `kind: each_record` | ソースによって返される各行。メジャーの宣言は不要です。|
| `subject_type_name` | ソースの `subject_types` リスト内の名前にマッピングされた列。メジャーの宣言は不要です。|

`simple_metric_aggregation` のこの参照形式、両方の比率コンポーネント、および `percentile_metric_aggregation` を使用します。集計操作によって、使用するセレクターが決まります。

- `count` には `kind: each_record` が必要です。
- `sum`および `average` のは `measure_sync_id` が必要です。
- `countDistinctValue` は`measure_sync_id` または `subject_type_name` を受け入れます。`each_record` は使用できません。
- `uniqueSubjects` には`subject_type_name` が必要です。新しい定義には `countDistinctValue` を使用します。

宣言されたメジャーを選択するには、その `sync_id` を使用します:

```yaml
measure:
  warehouse_metric_source_sync_id: checkout_events
  measure_sync_id: revenue
```

ソースによって返された行をカウントするには、以下のようにします。

```yaml
simple_metric_aggregation:
  operation: count
  measure:
    warehouse_metric_source_sync_id: checkout_events
    kind: each_record
  timeframe_start_value: 0
```

重複しないユーザーをカウントするには、まず `User` サブジェクトタイプを `checkout_events` ソースの列にマッピングします。

```yaml
subject_types:
  - name: User
    column_name: user_id
```

次に、メトリクスでそのサブジェクトマッピングを選択してください。

```yaml
simple_metric_aggregation:
  operation: countDistinctValue
  measure:
    warehouse_metric_source_sync_id: checkout_events
    subject_type_name: User
  timeframe_start_value: 0
```

`User` は組織内のサブジェクトタイプとして存在する必要があります。選択した名前は、参照先ソースの `subject_types[].name` エントリと一致している必要があります。

別の同期タグからのソースを参照するには、3 つのセレクターのいずれかと共に `warehouse_metric_source_sync_tag` を含めます:

```yaml
measure:
  warehouse_metric_source_sync_tag: shared-sources
  warehouse_metric_source_sync_id: checkout_events
  measure_sync_id: revenue
```

ローカルチェックのために `validate` を実行し、続いて変更のプレビューのために `plan` を実行します。ローカル検証は、送信されたファイル内のソースマッピングをチェックします。ファイルの `sync_tag` と等しい明示的なタグであっても、そのソースが送信されたファイルに含まれている場合は、ローカルマッピングがチェックされます。外部参照は `execute` 中に解決されます。プランが成功しても、外部ソースや選択したメジャーが存在することは確認されません。

同期 API は `warehouse_metric_measure_id` をサポートしません。生のメジャー ID を、ソースおよび前述のセレクターのいずれかに置き換えてください。

## CLI 制限事項{#cli-limitations}

`options.is_certified` のみを変更しても、それ以外に変更がない既存のソースやメトリクスの認定は更新されません。YAML で既存の定義を管理した後に、Datadog で認定をチェックしてください。同期が成功しただけでは、認定の変更は確認されません。

CLI は、既存の定義のエクスポートや Eppo YAML の変換を自動的には行いません。YAML で既存のメトリクスを管理する前に、定義全体を作成して確認してください。

取り込むには、`existing_id` と `options.upgrade_mode: by_id` を使用してください。`upgrade_mode: by_name` を設定するだけでは、名前が一致するオブジェクトは導入されません。

## トラブルシューティング {#troubleshooting}

| エラー | チェックする項目 |
| ----- | ------------- |
| API は `403` を返します。| API/アプリケーションキーに、メトリクスの書き込みに必要な Product Analytics 権限があることを確認してください。`is_certified` が有効な場合は、そのロールに「Product Analytics Certified Metrics Write」権限も付与されていることを確認してください。|
| ウェアハウスコネクションが見つかりませんでした。| ターゲットの Datadog 組織にウェアハウスコネクションが構成されていることを確認してください。`warehouse_connection_id` を設定した場合は、それがターゲット組織に属していることを確認してください。|
| サブジェクトタイプが見つかりませんでした。| `subject_types[].name` の値が既存の Datadog サブジェクトタイプと一致することを確認してください。|
| 成功したのに、結果に変更が表示されません。| サービスは適用すべき変更を検出しませんでした。`options.is_certified` のみを変更した場合は、Datadog で認定をチェックしてください。同期が成功しても、この設定が変更されたとは限りません。操作が失敗しても、YAML が Datadog と一致しているとは限りません。|
| 同期がブロックされています。| コンソール出力でオブジェクトの詳細とブロックされた理由を確認してください。API レスポンスを保存するには、`metric-sync result <METRIC_SYNC_ID> --log-file ./metric-sync.log` を実行します。考えられる原因には、実験への参照、同期タグ外にあるメトリクスからソースへの参照、取り込みの競合などがあります。ブロックされた結果は、ゼロ以外のステータスで終了します。|
| 操作が失敗します。| `metric-sync result <METRIC_SYNC_ID> --log-file ./metric-sync-result.log` を実行して、利用可能なエラーを取得し、API レスポンスを調査します。失敗した操作で表示される変更は、適用されたかどうか確認できません。一部のサーバー障害ではエラーの詳細が返されないため、サポートを得るために操作 ID を保持してください。|
| ローカル検証には合格しますが、`plan` が YAML を拒否します。| ローカルチェックではウェアハウスのクエリは検証されません。コンソール出力でエラーの詳細を確認してください。API レスポンスを保存するには、`metric-sync plan ./metrics --log-file ./metric-sync.log`を実行します。それらの詳細を使用して、定義を修正してください。|

[1]: /ja/experiments/guide/connecting_a_data_warehouse/
[2]: /ja/account_management/rbac/permissions/#product-analytics
[3]: /ja/account_management/api-app-keys/
[4]: #measure-references
[5]: #filters