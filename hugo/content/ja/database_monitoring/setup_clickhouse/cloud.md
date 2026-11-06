---
description: ClickHouse Cloud 用 Database Monitoring をインストールして構成します。
further_reading:
- link: /database_monitoring/
  tag: ドキュメント
  text: Database Monitoring
- link: /integrations/clickhouse/
  tag: ドキュメント
  text: ClickHouse インテグレーション
- link: /database_monitoring/troubleshooting/
  tag: ドキュメント
  text: Database Monitoring のトラブルシューティング
- link: /database_monitoring/guide/database_identifier/
  tag: ドキュメント
  text: データベース識別子の指定
- link: /database_monitoring/guide/clickhouse_agent_upgrade
  tag: ドキュメント
  text: 7.84 より前の Agent バージョンからの ClickHouse インテグレーションのアップグレード
title: ClickHouse Cloud 用 Database Monitoring のセットアップ
---
この機能はプレビュー版で、Datadog Agent v7.84 以降が必要です。7.84 より前の Agent バージョンで ClickHouse 用 Database Monitoring を設定する場合は、アップグレード前に [ClickHouse インテグレーションのアップグレード](/database_monitoring/guide/clickhouse_agent_upgrade/)を参照して追加の権限を付与します。ClickHouse プレビュー版の Datadog Database Monitoring に参加しているお客様は、プレビュー版期間中に発生した使用量が**請求されません**。追加の有効化は不要です。以下の設定手順に従って開始してください。

Datadog Database Monitoring (DBM) for ClickHouse は、クエリメトリクス、ライブクエリサンプル、完了したクエリレコードを収集して ClickHouse Cloud サービスの詳細な可視性を提供し、フリート全体のクエリパフォーマンスの問題解決や最適化を支援します。

## はじめに {#before-you-begin}

サポート対象の Agent バージョン
: 7.84+

## 収集データ {#data-collected}

Database Monitoring は、ClickHouse から以下のデータを収集します。

**データベースインスタンス**
: バージョン、ホスト名、構成を含むインスタンス情報の定期的な収集 (5 分ごと)。`tags` オプションで定義されたカスタムタグは、環境、リージョン、サービス、またはその他のカスタムディメンションによるフィルタリングやグループ化のためにインスタンスに付与されます。

**クエリメトリクス**
: 実行されたクエリの集計パフォーマンスメトリクス。クエリの動作や傾向を長期的に分析できます。`system.query_log` から収集されます。

**クエリサンプル**
: 現在実行中のクエリのポイントインタイムスナップショットが `system.processes` から 1 秒間隔でキャプチャされます。ClickHouse のクエリは 1 秒未満で完了することが多いため、短期間のクエリがサンプルに常に表示されるとは限りません。

**クエリ完了**
: 個別に完了したクエリ実行の記録。正常に実行されたすべてのクエリをキャプチャします。クエリ完了をクエリサンプルと併用することで、サンプリング中に観測されなかった短期間のクエリを含むすべてのクエリアクティビティを完全に可視化できます。

**説明プラン**
: クエリのパフォーマンス診断に役立てるため、クエリ完了で観測されたクエリが参照するテーブルに対して `EXPLAIN` を実行して収集されたクエリ実行プラン。`SELECT`ステートメント (`WITH` クエリを含む) のみが、説明プランの収集をサポートしています。収集されたすべてのデータ (説明プランを含む) は難読化されます。この収集には、[セットアップ](#setup)で説明されているシステムテーブルへのアクセス権に加え、監視対象のクエリが参照するテーブルに対する `SELECT` アクセス権が必要です。

**パーツとマージ**
: アクティブなパーツ、デタッチされたパーツ、バックグラウンドマージ、保留中のミューテーション、レプリケーションキューの深さなど、`system.parts`、`system.detached_parts`、`system.merges`、`system.mutations`、`system.replication_queue`、および `system.merge_tree_settings` から収集されたストレージ健全性データ。これは、停滞したマージや増大するレプリケーションのバックログなど、ストレージとレプリケーションの問題を特定する上で役立ちます。

**非同期挿入**
: 非同期挿入アクティビティ。Agent 7.83 以降で利用可能で、デフォルトでは無効になっています。`system.asynchronous_inserts` からの保留中のバッファスナップショットは、フラッシュ待ちのデータ量と、各バッファのフラッシュ予定時刻を示します。`system.asynchronous_insert_log` からのフラッシュレコードは、各フラッシュの成否、および書き込まれたバイト数と行数を示します。これは、失敗しているフラッシュや、フラッシュよりも速く増大しているバッファを特定する上で役立ちます。

## セットアップ {#setup}

### ステップ 1: Datadog Agent にアクセス権を付与する {#step-1-grant-datadog-agent-access}

専用の `datadog` ユーザーを作成する:

```sql
CREATE USER datadog IDENTIFIED BY '<PASSWORD>';
```

システムテーブルに必要なアクセス許可を付与する:

```sql
GRANT SELECT ON system.metrics TO datadog;
GRANT SELECT ON system.events TO datadog;
GRANT SELECT ON system.asynchronous_metrics TO datadog;
GRANT SELECT ON system.errors TO datadog;
GRANT SELECT ON system.parts TO datadog;
GRANT SELECT ON system.replicas TO datadog;
GRANT SELECT ON system.dictionaries TO datadog;
GRANT SELECT ON system.macros TO datadog;
GRANT SELECT ON system.clusters TO datadog;
GRANT SELECT ON system.settings TO datadog;
GRANT SELECT ON system.table_engines TO datadog;
GRANT SELECT ON system.one TO datadog;
GRANT SELECT ON system.query_log TO datadog;
GRANT SELECT ON system.processes TO datadog;
GRANT SELECT ON system.detached_parts TO datadog;
GRANT SELECT ON system.merges TO datadog;
GRANT SELECT ON system.mutations TO datadog;
GRANT SELECT ON system.replication_queue TO datadog;
GRANT SELECT ON system.merge_tree_settings TO datadog;
GRANT SHOW ON *.* TO datadog;
```

DBM クエリ収集には `system.processes` および `system.query_log` の権限が必要です。パーツおよびマージ (ストレージの健全性) 収集には、`system.parts`、`system.detached_parts`、`system.merges`、`system.mutations`、`system.replication_queue`、および `system.merge_tree_settings` の権限が必要です。データベース名、テーブル名、カラム、ビューなどのメタデータを自動的に検出するには、`SHOW` 権限が必要です。残りの権限により、コア ClickHouse インフラストラクチャーメトリクスの収集が可能になります。

レプリカ間クエリを許可するには、`REMOTE` 権限を付与します。

```sql
GRANT REMOTE ON *.* TO datadog;
```

Agent は ClickHouse の `clusterAllReplicas()` テーブル関数を使用して単一エンドポイント経由で ClickHouse Cloud サービス内のすべてのレプリカのデータを集計するため、`REMOTE` 権限が必要です。この権限によりノード間クエリ実行が可能になりますが、上記で明示的に許可された以外のデータベースやテーブルへのアクセス権は**付与されません**。`ON *.*` 構文はこの権限タイプに対する ClickHouse の要件であり、データアクセスのスコープを拡大するものではありません。

上記の権限は、クエリメトリクス、クエリサンプル、クエリ完了、およびパーツおよびマージの収集に十分です。これらの権限では、アプリケーションデータへのアクセス権は Agent に**付与されません**。

#### オプション: 説明プラン収集のアクセス権を付与する {#optional-grant-access-for-explain-plan-collection}

説明プランの収集には、上記のシステムテーブルだけでなく、監視対象のクエリが参照するテーブルに対する `SELECT` アクセス権が必要です。

```sql
GRANT SELECT ON <database>.* TO datadog;
```

この権限が付与されていない場合、Agent はそれらのテーブルに対するクエリの `EXPLAIN` を実行できません。クエリメトリクス、サンプル、および完了は引き続き機能しますが、影響を受けるクエリの説明プランは収集されず、Datadog でそれらのクエリの収集エラーが表示されます。

#### オプション: 非同期挿入監視のアクセス権を付与する {#optional-grant-access-for-async-insert-monitoring}

非同期挿入監視を有効にする場合 (Agent 7.83 以降)、非同期挿入システムテーブルへのアクセス権を付与します。

```sql
GRANT SELECT ON system.asynchronous_inserts TO datadog;
GRANT SELECT ON system.asynchronous_insert_log TO datadog;
```

`system.asynchronous_inserts` は、保留中のバッファスナップショット (`collect_pending_async_inserts`) に必要です。`system.asynchronous_insert_log` は、フラッシュレコード (`collect_async_inserts`) に必要です。両方を有効にするには、インスタンス構成に以下を追加します。

```yaml
    collect_pending_async_inserts:
      enabled: true
    collect_async_inserts:
      enabled: true
```

### ステップ 2: Agent を構成する {#step-2-configure-the-agent}

ClickHouse Cloud の場合、Agent はサービスエンドポイントに直接接続します。データは個々のノードごとではなく、サービスレベル (すべてのレプリカで集計) で収集されます。

自動サスペンドが有効になっているサーバーレス ClickHouse デプロイメントでは、DBM の収集アクティビティにより、アイドル期間中にクラスターがサスペンドされず、課金に影響を与える可能性があります。

このインテグレーションは、ClickHouse **HTTP インターフェイス** (ポート 8443) を使用します。ネイティブ TCP プロトコル (ポート 9440) ではありません。

```yaml
# /etc/datadog-agent/conf.d/clickhouse.d/conf.yaml

init_config:

instances:
  - dbm: true
    server: xyz.us-east-2.aws.clickhouse.cloud
    port: 8443
    username: datadog
    password: <PASSWORD>

    # Required for ClickHouse Cloud
    tls_verify: true
    verify: true
    single_endpoint_mode: true

    tags:
      - env:production
      - deployment:cloud

    query_metrics:
      enabled: true
      collection_interval: 10

    query_samples:
      enabled: true
      collection_interval: 1

    query_completions:
      enabled: true
      collection_interval: 10
```

ClickHouse Cloud には `single_endpoint_mode: true` が必要です。これにより、単一エンドポイントの背後にあるすべてのノードにわたってデータを収集するための `clusterAllReplicas()` クエリが有効になります。

有効にすると、Agent は `clusterAllReplicas()` を使用して、エンドポイントの背後にあるすべてのノードからシステムテーブルのメトリクス (`system.events`、`system.metrics`、`system.asynchronous_metrics`、および `system.errors`) をクエリします。結果として得られる各時系列には `clickhouse_node` がタグ付けされるため、ノードごとのデータを区別できます。このノードごとの収集には、Agent バージョン 7.83.0 以降が必要です。

この設定がない場合、Agent は収集サイクルごとに異なるノードに接続する可能性があります。`clickhouse.query.failed.count` のようなノードごとの累積カウンターの場合、カウンターが毎回同じソースから読み取られないため、その不整合によって不正確な値が算出されます。

## データベース識別子のカスタマイズ {#customizing-the-database-identifier}

`database_identifier` オプションは、DBM 内でデータベースインスタンスがどのように表示されるかを制御します。Datadog では、識別とグループ化のためにサービスをカスタムタグとして使用することを推奨しています。

```yaml
instances:
  - dbm: true
    server: xyz.us-east-2.aws.clickhouse.cloud
    port: 8443
    # ... other settings ...

    database_identifier:
      template: "$env-$server:$port"

    tags:
      - env:production
      - service_name:user-service
```

`env:production`、`server: xyz.us-east-2.aws.clickhouse.cloud`、`port: 8443` を使用すると、次のようになります。


| テンプレート                  | 結果                                               |
| ------------------------- | ---------------------------------------------------- |
| `$server:$port` (デフォルト) | `xyz.us-east-2.aws.clickhouse.cloud:8443`            |
| `$env-$server:$port`      | `production-xyz.us-east-2.aws.clickhouse.cloud:8443` |




## 構成リファレンス{#configuration-reference}



### コネクション設定 {#connection-settings}


| フィールド      | タイプ    | 必須 | デフォルト   | 説明                                                                                                                 |
| ---------- | ------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `server`   | 文字列  | はい      | -         | ClickHouse Cloud サービスのホスト名 (例: `xyz.us-east-2.aws.clickhouse.cloud`)。                                     |
| `port`     | 整数 | いいえ       | `8123`    | HTTP ポート。ClickHouse Cloud (HTTPS) には `8443` を使用します。                                                                        |
| `username` | 文字列  | いいえ       | `default` | Agent が認証に使用する ClickHouse ユーザー。Datadog では、権限を制限した専用の `datadog` ユーザーを推奨しています。|
| `password` | 文字列  | いいえ       | -         | 指定したユーザーのパスワード。                                                                                           |
| `db`       | 文字列  | いいえ       | `default` | 接続先のデータベース。ほとんどのメトリクスはシステムテーブルから取得されるため、通常は `default` が適切です。                         |




### TLS 設定 {#tls-settings}


| フィールド         | タイプ    | デフォルト | 説明                                                                                                     |
| ------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `tls_verify`  | ブール値 | `false` | TLS を有効にします。ClickHouse Cloud に必要です。                                                                     |
| `verify`      | ブール値 | `true`  | サーバーの SSL 証明書を検証します。本番環境で `false` を設定することはセキュリティリスクとなります。                       |
| `tls_ca_cert` | 文字列 | - | カスタム CA 証明書ファイルへのパス。パブリック CA の証明書を使用する ClickHouse Cloud では不要です。|




### DBM 設定 {#dbm-settings}


| フィールド                  | タイプ    | デフォルト | 説明                                                                                                                                                                                                                                                                                                                               |
| ---------------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dbm`                  | ブール値 | `false` | Database Monitoring を有効にします。クエリメトリクス、サンプル、および補完の収集に必須です。                                                                                                                                                                                                                                             |
| `single_endpoint_mode` | ブール値 | `false` | ClickHouse Cloud に必要です。単一のエンドポイントの背後にあるすべてのノードからデータを収集する `clusterAllReplicas()` クエリを有効にします。また、累積カウンターがノードごとの正確な値を報告できるように、ノードごとの標準システムテーブルメトリクスも収集します (`clickhouse_node` でタグ付けされます)。ノードごとの収集には、Agent バージョン 7.83.0 以降が必要です。|




### データベース識別子 {#database-identifier}


| フィールド                          | タイプ   | デフォルト         | 説明                                                                                                                                          |
| ------------------------------ | ------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `database_identifier.template` | 文字列 | `$server:$port` | 一意のデータベース識別子のテンプレート。サポートされている変数: `$server`、`$port`、および任意のカスタムタグキー (例: `$env`、`$service_name`)。|




### クエリメトリクス {#query-metrics}

`system.query_log` から集計されたクエリ統計を収集します。


| フィールド                               | タイプ    | デフォルト | 説明                                            |
| ----------------------------------- | ------- | ------- | ------------------------------------------------------ |
| `query_metrics.enabled`             | ブール値 | `true`  | クエリメトリクスの収集を有効にします。`dbm: true` が必要です。|
| `query_metrics.collection_interval` | 数値 | `10`    | 収集間隔 (秒)。                       |




### クエリサンプル {#query-samples}

`system.processes` から現在実行中のクエリを収集します。


| フィールド                               | タイプ    | デフォルト | 説明                                            |
| ----------------------------------- | ------- | ------- | ------------------------------------------------------ |
| `query_samples.enabled`             | ブール値 | `true`  | クエリサンプルの収集を有効にします。`dbm: true` が必要です。|
| `query_samples.collection_interval` | 数値 | `1`     | 収集間隔 (秒)。                       |
| `query_samples.payload_row_limit`   | 整数 | `1000`  | スナップショットごとのアクティブなクエリの最大数。        |




### クエリ完了 {#query-completions}

`system.query_log` から個々の完了したクエリのレコードを収集します。


| フィールド                                          | タイプ    | デフォルト | 説明                                                    |
| ---------------------------------------------- | ------- | ------- | -------------------------------------------------------------- |
| `query_completions.enabled`                    | ブール値 | `true`  | クエリ完了の収集を有効にします。`dbm: true` が必要です。    |
| `query_completions.collection_interval`        | 数値 | `10`    | 収集間隔 (秒)。                               |
| `query_completions.samples_per_hour_per_query` | 数値 | `15`    | 一意のクエリシグネチャごとに 1 時間あたりに収集される最大サンプル数。|

### 保留中の非同期挿入 {#pending-async-inserts}

`system.asynchronous_inserts` から保留中の非同期挿入バッファのスナップショットを収集します。Agent 7.83 以上が必要です。

| フィールド | タイプ | デフォルト | 説明 |
|-------|------|---------|-------------|
| `collect_pending_async_inserts.enabled` | ブール値 | `false` | 保留中の非同期挿入バッファの収集を有効にします。`dbm: true` が必要です。|
| `collect_pending_async_inserts.collection_interval` | 数値 | `10` | 収集間隔 (秒)。|
| `collect_pending_async_inserts.max_samples_per_collection` | 整数 | `1000` | 1 回の実行で収集されるバッファの最大数。|

### 非同期挿入フラッシュ {#async-insert-flushes}

`system.asynchronous_insert_log` からの個別の非同期挿入フラッシュのレコードを収集します。Agent 7.83 以上が必要です。

| フィールド | タイプ | デフォルト | 説明 |
|-------|------|---------|-------------|
| `collect_async_inserts.enabled` | ブール値 | `false` | 非同期挿入フラッシュの収集を有効にします。`dbm: true` が必要です。|
| `collect_async_inserts.collection_interval` | 数値 | `60` | 収集間隔 (秒)。|
| `collect_async_inserts.max_samples_per_collection` | 整数 | `1000` | 1 回の実行で収集されるフラッシュレコードの最大数。|


{{< partial name="whats-next/whats-next.html" >}}