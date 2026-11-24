---
description: セルフホストの ClickHouse の Database Monitoring をインストールして構成します。
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
  text: Agent を 7.84 以降にアップグレードする
title: セルフホストの ClickHouse の Database Monitoring の設定
---
<div class="alert alert-info">
この機能はプレビュー版で、Datadog Agent v7.78 以降が必要です。ClickHouse プレビュー版の Datadog Database Monitoring に参加しているお客様は、プレビュー版期間中に発生した使用量が<strong>請求されません</strong>。追加の有効化は不要です。以下の設定手順に従って開始してください。
</div>

ClickHouse の Datadog Database Monitoring (DBM) は、クエリメトリクス、ライブクエリサンプル、完了したクエリレコードを収集することで ClickHouse クラスターの深い可視性を提供し、フリート全体のクエリパフォーマンスの問題解決や最適化を支援します。

## はじめに {#before-you-begin}

サポートされている ClickHouse のバージョン
: 23.x 以降 (23.x、24.x、25.x)。推奨される最小バージョン: 23.8 LTS。

サポートされている Agent バージョン
: 7.78+

## 収集データ {#data-collected}

Database Monitoring は、ClickHouse から以下のデータを収集します。

**データベースインスタンス**
: バージョン、ホスト名、構成を含むインスタンス情報の定期的な収集 (5 分ごと)。`tags` オプションで定義されたカスタムタグは、環境、リージョン、クラスター、またはその他のカスタムディメンションによるフィルタリングやグループ化のためにインスタンスに付与されます。

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
GRANT REMOTE ON *.* TO datadog;
```

DBM クエリ収集には `system.processes` および `system.query_log` の権限が必要です。パーツおよびマージ (ストレージの健全性) 収集には、`system.parts`、`system.detached_parts`、`system.merges`、`system.mutations`、`system.replication_queue`、および `system.merge_tree_settings` の権限が必要です。各インスタンスのクラスター、ホスティングタイプ、およびノードを識別するには、`system.macros`、`system.clusters`、`system.settings`、`system.table_engines`、および `system.one` の権限が必要です。残りの権限により、コア ClickHouse インフラストラクチャーメトリクスの収集が可能になります。

<div class="alert alert-info">
上記の権限は、クエリメトリクス、クエリサンプル、クエリ完了、およびパーツおよびマージの収集に十分です。これらの権限では、アプリケーションデータへのアクセス権は Agent に<strong>付与されません</strong>。
</div>

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

セルフホスト型デプロイメントの場合、Datadog Agent は各 ClickHouse ノードに個別に接続する必要があります。ノードごとに個別の `instances` エントリを追加します。1 つの Agent で同じ設定ファイル内に複数のインスタンスを定義することで、複数のノードを監視できます。

<div class="alert alert-info">
このインテグレーションは、ClickHouse <strong>HTTP インターフェース</strong> (ポート 8123/8443) を使用し、ネイティブ TCP プロトコル (ポート 9000/9440) ではありません。
</div>

- **HTTP** (デフォルト): ポート `8123`
- **HTTPS/TLS**: ポート `8443` (`tls_verify: true` を使用)

```yaml
# /etc/datadog-agent/conf.d/clickhouse.d/conf.yaml

init_config:

instances:
  - dbm: true
    server: clickhouse-node-01.example.com
    port: 8123
    username: datadog
    password: <PASSWORD>

    tags:
      - env:production
      - node:clickhouse-01

    query_metrics:
      enabled: true
      collection_interval: 10

    query_samples:
      enabled: true
      collection_interval: 1

    query_completions:
      enabled: true
      collection_interval: 10

  # Add an entry for each additional node
  - dbm: true
    server: clickhouse-node-02.example.com
    port: 8123
    username: datadog
    password: <PASSWORD>

    tags:
      - env:production
      - node:clickhouse-02

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

## データベース識別子のカスタマイズ {#customizing-the-database-identifier}

`database_identifier` オプションは、DBM 内でデータベースインスタンスがどのように表示されるかを制御します。これは、デフォルトの `server:port` 形式ではなく、人間が判読可能な意味のある識別子を使用したい場合に便利です。

```yaml
instances:
  - dbm: true
    server: clickhouse-01
    port: 8123
    # ... other settings ...

    database_identifier:
      template: "$env-$server:$port"

    tags:
      - env:production
```

`env:production`、`server: clickhouse-01`、`port: 8123` を使用すると、次のようになります。

| テンプレート | 結果 |
|----------|--------|
| `$server:$port` (デフォルト) | `clickhouse-01:8123` |
| `$env-$server:$port` | `production-clickhouse-01:8123` |

## 構成リファレンス{#configuration-reference}

### コネクション設定 {#connection-settings}

| フィールド | タイプ | 必須 | デフォルト | 説明 |
|-------|------|----------|---------|-------------|
| `server` | 文字列 | Yes | - | ClickHouse サーバーのホスト名または IP アドレス。|
| `port` | 整数 | No | `8123` | HTTP ポート。HTTPS/TLS には `8443` を使用します。Agent はネイティブ TCP プロトコル (ポート 9000) ではなく、HTTP インターフェースを使用します。|
| `username` | 文字列 | No | `default` | Agent が認証に使用する ClickHouse ユーザーアカウント。Datadog では、権限を制限した専用の `datadog` ユーザーを推奨しています。|
| `password` | 文字列 | No | - | 指定したユーザーのパスワード。|
| `db` | 文字列 | No | `default` | 接続先のデータベース。ほとんどのメトリクスはシステムテーブルから取得されるため、通常は `default` が適切です。|

### TLS 設定 {#tls-settings}

| フィールド | タイプ | デフォルト | 説明 |
|-------|------|---------|-------------|
| `tls_verify` | ブール値 | `false` | TLS を有効にします。HTTPS (ポート 8443) を使用する場合は、`true` に設定します。|
| `verify` | ブール値 | `true` | サーバーの SSL 証明書を検証します。本番環境で `false` を設定することはセキュリティリスクとなります。|
| `tls_ca_cert` | 文字列 | - | カスタム CA 証明書ファイルへのパス。ClickHouse が内部証明書または自己署名証明書で構成されている場合に使用します。|

### DBM 設定 {#dbm-settings}

| フィールド | タイプ | デフォルト | 説明 |
|-------|------|---------|-------------|
| `dbm` | ブール値 | `false` | Database Monitoring を有効にします。クエリメトリクス、サンプル、および補完の収集に必須です。|

### データベース識別子 {#database-identifier}

| フィールド | タイプ | デフォルト | 説明 |
|-------|------|---------|-------------|
| `database_identifier.template` | 文字列 | `$server:$port` | 一意のデータベース識別子のテンプレート。サポートされている変数: `$server`、`$port`、および任意のカスタムタグキー (例: `$env`、`$region`)。環境間でインスタンスを区別するには、次のカスタムタグを使用します。`$env-$server:$port`。|

### クエリメトリクス {#query-metrics}

`system.query_log` から集計されたクエリ統計を収集します。

| フィールド | タイプ | デフォルト | 説明 |
|-------|------|---------|-------------|
| `query_metrics.enabled` | ブール値 | `true` | クエリメトリクスの収集を有効にします。`dbm: true` が必要です。|
| `query_metrics.collection_interval` | 数値 | `10` | 収集間隔 (秒)。|

### クエリサンプル {#query-samples}

`system.processes` から現在実行中のクエリを収集します。

| フィールド | タイプ | デフォルト | 説明 |
|-------|------|---------|-------------|
| `query_samples.enabled` | ブール値 | `true` | クエリサンプルの収集を有効にします。`dbm: true` が必要です。|
| `query_samples.collection_interval` | 数値 | `1` | 収集間隔 (秒)。|
| `query_samples.payload_row_limit` | 整数 | `1000` | スナップショットごとのアクティブなクエリの最大数。|

### クエリ完了 {#query-completions}

`system.query_log` から個々の完了したクエリのレコードを収集します。

| フィールド | タイプ | デフォルト | 説明 |
|-------|------|---------|-------------|
| `query_completions.enabled` | ブール値 | `true` | クエリ完了の収集を有効にします。`dbm: true` が必要です。|
| `query_completions.collection_interval` | 数値 | `10` | 収集間隔 (秒)。|
| `query_completions.samples_per_hour_per_query` | 数値 | `15` | 一意のクエリシグニチャごとに 1 時間あたりに収集される最大サンプル数。|

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