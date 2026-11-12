---
description: Database Monitoring が収集したスキーマと統計情報から構築された、本番環境に近い一時的な Postgres データベースに対して、変更を開発およびテストすることができます。
further_reading:
- link: /database_monitoring/
  tag: ドキュメント
  text: Database Monitoring
- link: /database_monitoring/schema_explorer/
  tag: ドキュメント
  text: スキーマエクスプローラー
- link: /database_monitoring/recommendations/
  tag: ドキュメント
  text: 推奨事項
- link: /mcp_server/
  tag: ドキュメント
  text: Datadog MCP Server
title: Database Monitoring Workbench
---
{{< callout url="https://app.datadoghq.com/forms/share/45a8d961134a872c7118d345cff413cfd3d88bc1f1558f76bb5067a85ae43118" btn_hidden="false" header="プレビューに参加しましょう。" >}}
Database Monitoring Workbench はプレビュー版です。このフォームを使用してアクセスをリクエストしてください。
{{< /callout >}}

## 概要{#overview}

Database Monitoring Workbench は、変更の開発やテストに使用できる、本番環境に近い一時的な Postgres データベースです。これは Database Monitoring が収集したスキーマと統計情報から構築されているため、本番環境のテーブル、インデックス、行数、メジャーバージョンの構成と一致します。Datadog がテーブル内のデータをコピーまたは送信することはありません。Workbench には、Database Monitoring が収集した列とテーブルの統計情報から生成された合成データが自動的に入力されます。必要に応じて、独自のデータを手動で入力することもできます。

このページでは、以下の方法について説明します。

- MCP、API、または SQL クライアントを使用してWorkbench インスタンスに接続する
- クエリプランを比較し、インデックスと移行の変更をテストする
- CI でプラン回帰を検知する
- データモデルの変更を実験する

## 要件{#requirements}

- [Database Monitoring][5] によって監視される Postgres データベース。
- インスタンスだけでなく、特定の論理データベースに対して[スキーマ収集][1]が有効になっていること。
- **Database Monitoring Read** 権限。権限の管理方法については、[ロールベースのアクセス制御][6]を参照してください。
- 組織で Workbench が有効になっていること。アクセスをリクエストするには、このページの上部にあるプレビューフォームを使用してください。

## Workbench に接続する {#connect-to-workbench}

### MCP サーバーを使った接続{#connecting-with-the-mcp-server}

[Datadog MCPサーバー][2]を使用して、コーディングエージェントから Workbench インスタンスを作成および管理します。エージェントに追加するには、[Datadog MCP サーバーのセットアップ][7]を参照してください。MCPサーバーは、Workbench を 3 つのツールとして公開します。

<table style="width: 100%;">
  <thead>
    <tr>
      <th style="width: 50%;">ツール</th>
      <th style="width: 50%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>create_datadog_database_workbench</code></td>
      <td>監視対象データベースからサンドボックスを構築し、準備ができるまで待機します。</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>get_datadog_database_workbench</code></td>
      <td>サンドボックスの準備ができているかどうかをチェックします。</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>delete_datadog_database_workbench</code></td>
      <td>サンドボックスを削除し、コネクション文字列を取り消し、コンピューティングリソースを解放します。</td>
    </tr>
  </tbody>
</table>

エージェントがインスタンスを作成した後、スキーマの読み取り、ステートメントの実行、クエリプランの読み取り、インデックスの追加、プランの再読み取りを行うことができます。これは、実際のスキーマ、インデックス、行数に対して機能します。

{{< img src="database_monitoring/database_monitoring_workbench/workbench_mcp_index_demo.mp4" alt="コーディングエージェントは、Datadog MCP サーバーを介して Workbench サンドボックスを作成し、本番環境の行数を読み込み、シーケンシャルスキャンをインデックススキャンに変換するインデックスを追加し、サンドボックスを削除します" video="true" >}}

### API を使った接続{#connecting-with-the-api}

Workbench API を使用して、スクリプトまたは CI ジョブから Workbench インスタンスを作成します。

インスタンスを作成するため、監視対象データベースを指定する `POST` リクエストを送信します。

```shell
curl -X POST "{{< region-param key="dd_api" >}}/api/unstable/databases/workbench/session" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "database_instance": "orders-db-primary",
    "database_name": "shop"
  }'
```

アプリケーションキーは、**Database Monitoring Read** 権限を持つユーザーまたはサービスアカウントのものである必要があります。組織で Workbench が有効になっていない場合、API は `403` を返します。

| パラメーター | 説明 |
| --------- | ----------- |
| <code style="white-space: nowrap;">database_instance</code> | Database Monitoring におけるインスタンスの名前。|
| <code style="white-space: nowrap;">database_name</code> | `database_instance` 内の論理データベースの名前。|
| <code style="white-space: nowrap;">populate</code> | `false` に設定すると、生成されたデータなしでインスタンスが作成されます。独自のデータを読み込むには、[SQL クライアントを使った接続](#connecting-with-a-sql-client)を参照してください。|

リクエストは、インスタンス ID、そのステータス、および Postgres コネクション文字列と共に `202 Accepted` を返します。

{{< code-block lang="json" >}}
{
  "id": "workbench-123",
  "status": "pending",
  "connection": {
    "dsn": "postgres://workbench:<TOKEN>@<WORKBENCH_HOST>:5432/bench?sslmode=require"
  }
}
{{< /code-block >}}

インスタンスの作成は非同期で行われます。準備状況をチェックするには、`status` が `ready` になるまで `GET /api/unstable/databases/workbench/session/{id}` を送信してください。レスポンスには `expires_at` も含まれます。

インスタンスは `ttl_seconds` に設定された秒数後に期限切れになります。デフォルトは 1,800 秒 (30分) です。リクエストで TTL を設定することはできません。

インスタンスを削除するには、`DELETE /api/unstable/databases/workbench/session/{id}` を送信します。成功したリクエストは `204` を返します。

<div class="alert alert-danger">コネクション文字列は、有効なデータベース認証情報です。機密情報として扱い、コミットしたり、ログに記録したり、共有チャンネルに貼り付けたりしないでください。終了したらインスタンスを削除してください。期限切れまたは削除によりコネクションが閉じられ、すべてのデータが破棄されます。</div>

### SQL クライアントを使った接続{#connecting-with-a-sql-client}

MCP サーバーまたは API から取得したコネクション文字列を、`psql` などの任意の Postgres クライアント、GUI、または ORM のテストハーネスで使用してください。
{{< code-block lang="shell" >}}
psql "postgres://workbench:<TOKEN>@<WORKBENCH_HOST>:5432/bench?sslmode=require"
{{< /code-block >}}

インスタンスは書き込み可能であるため、インデックスを作成し、`EXPLAIN` を再実行し、プランを比較できます。例については、[Workbenchの使用方法](#how-to-use-workbench)を参照してください。インスタンスの期限が切れるか削除されると、開いているコネクションは閉じられ、実行中のクエリが失敗する可能性があります。

デフォルトでは、Workbench はインスタンスに合成データを入力します。代わりに独自のデータを使用するには、API リクエストで `"populate": false` を指定してインスタンスを作成してください。次に、`INSERT`、`COPY FROM STDIN`、または `psql` `\copy` コマンドを使用してデータを読み込み、その後 `ANALYZE` を実行します。インスタンスリソースと TTL によって、読み込めるデータ量が制限されます。

## Workbench の使用方法{#how-to-use-workbench}

[MCP サーバー](#connecting-with-the-mcp-server)または [API](#connecting-with-the-api) を使用してインスタンスを作成し、[SQL クライアント](#connecting-with-a-sql-client)を使って接続します。その後、このセクションのタスクに使用してください。

### 変更前後のクエリプランを比較する{#compare-query-plans-before-and-after-a-change}

プルリクエストを開く前に、クエリを作成する際、そのプランをチェックしてください。また、Database Monitoring で低速なクエリを見つけた後、これらの手順を使用して書き換えをテストすることもできます。クエリが実行されたデータベースのインスタンスを作成します。

インスタンスに対して `EXPLAIN` を実行し、本番環境に近い行数とカーディナリティでプランを読み取ります。

{{< code-block lang="sql" >}}
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders
WHERE customer_id = 42 AND created_at > '2026-01-01'
ORDER BY created_at DESC;
{{< /code-block >}}

プランに `Sort -> Seq Scan on orders` が表示される場合、クエリはテーブル全体をスキャンします。インスタンスに複合条件インデックスを追加して再プランニングし、プランがインデックススキャンに変更されたことを確認します。

{{< code-block lang="sql" >}}
CREATE INDEX idx_orders_customer_created ON orders (customer_id, created_at DESC);
{{< /code-block >}}

次に、クエリとともにインデックスをリリースします。低速なクエリについては、書き換え前後のプランを比較し、その結果をプルリクエストに記載してください。本番環境に触れたり、そのデータへのアクセスを要求したりすることなく、書き換えをテストできます。

### どのクエリがインデックスに依存しているかをチェックする{#check-which-queries-depend-on-an-index}

未使用のインデックスを削除すると書き込みスループットとストレージを節約できますが、クエリが依存しているインデックスを削除するとインシデントが発生する可能性があります。まずインスタンスで削除をテストしてください。そこでインデックスを削除しても、本番環境には影響しません。

1. [クエリメトリクス][3]から上位のクエリを取得します。
2. 各クエリで `EXPLAIN` を実行し、プランを保存します。
3. インスタンス内のインデックスを削除します。
4. 各クエリで再度 `EXPLAIN` を実行し、プランを比較します。

{{< code-block lang="sql" >}}
EXPLAIN SELECT id, total FROM orders WHERE status = 'pending' ORDER BY created_at;
--  Index Scan using idx_orders_status on orders  (cost=0.42..88.20 rows=312 width=20)

DROP INDEX idx_orders_status;

EXPLAIN SELECT id, total FROM orders WHERE status = 'pending' ORDER BY created_at;
--  Seq Scan on orders  (cost=0.00..14200.00 rows=312 width=20)
{{< /code-block >}}

プランがシーケンシャルスキャンにフォールバックするクエリは、そのインデックスに依存しています。主観的で未検証の仮定に頼るのではなく、それらのプランをレビューに持ち込んでください。代わりに新しいインデックスをテストするには、インスタンス内に作成し、クエリのプランを再度作成します。

### デプロイする前に移行をテストする{#test-a-migration-before-you-deploy-it}

移行の問題はテーブルサイズや同時トラフィックに依存することが多いため、ローカルのテストデータベースでは見逃される可能性があります。例:

- 本来は `CREATE INDEX CONCURRENTLY` であるはずで、構築の間書き込みロックを保持する `CREATE INDEX`。
- 決してアイドル状態にならないテーブルに対して、予期したよりも強力なロックを取得する `ALTER`。

移行をテストするには、インスタンスのコネクション文字列を使用して移行ツールでインスタンスに対して移行を実行します。DDL の実行中に、`pg_locks` をクエリして、どのロックが取得されるかを確認します。その後、重要なクエリを再計画して、新しいスキーマがそれらにどのように影響するかを確認します。

テスト移行は本番環境よりも時間がかかりませんが、同じ構造的な結果が得られます。

### CI でプラン回帰を検出する{#catch-plan-regressions-in-ci}

[API](#connecting-with-the-api) を使用して、パイプラインにプランチェックを追加します。SQL またはスキーマに影響を与える各プルリクエストについて、以下を行います。

1. インスタンスを作成します。
2. ステータスが `ready` になるまでポーリングします。
3. データを準備します。
4. 変更前後のプランを比較する場合は、`EXPLAIN` でベースラインプランを取得します。
5. 変更を適用します。
6. 上位クエリで `EXPLAIN` を実行します。
7. プランがいずれかの不変条件に違反した場合、ビルドを失敗させます。
8. 前のステップが失敗した場合でも、インスタンスを削除します。

不変条件の例:

- 大規模なテーブルに対する新しいシーケンシャルスキャンがないこと。
- クリティカルパスのクエリでプランの形状が変更されないこと。
- 使用中のインデックスが削除されないこと。

以下のスクリプトは、CI ジョブでこのフローを実行します。`curl`、`jq`、および `psql` と、以下の環境変数が必要です。

- `DD_API_KEY` および `DD_APP_KEY`: Datadog API キーとアプリケーションキー。
- `DD_SITE`: `datadoghq.com` や `us3.datadoghq.com` などの Datadog サイト。デフォルトは `datadoghq.com` です。
- `DB_INSTANCE`および `DB_NAME`: インスタンスの作成元となる `database_instance` と `database_name`。

```shell
#!/usr/bin/env bash
set -euo pipefail
API="https://api.${DD_SITE:-datadoghq.com}/api/unstable/databases/workbench/session"
AUTH=(-H "DD-API-KEY: ${DD_API_KEY}" -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" -H "Content-Type: application/json")

# Create (returns 202 with id + connection.dsn)
resp=$(curl -sf -X POST "$API" "${AUTH[@]}" \
  -d "{\"database_instance\":\"${DB_INSTANCE}\",\"database_name\":\"${DB_NAME}\"}")
id=$(jq -r .id <<<"$resp")
dsn=$(jq -r .connection.dsn <<<"$resp")
trap 'curl -sf -X DELETE "$API/$id" "${AUTH[@]}" >/dev/null || true' EXIT  # always delete

# Wait for ready
for _ in $(seq 60); do
  status=$(curl -sf "$API/$id" "${AUTH[@]}" | jq -r .status)
  [ "$status" = ready ] && break; sleep 5
done
[ "$status" = ready ] || { echo "Workbench not ready: $status"; exit 1; }

# Apply the change, then EXPLAIN top queries
psql "$dsn" -v ON_ERROR_STOP=1 -f migrations/change.sql
psql "$dsn" -v ON_ERROR_STOP=1 -f ci/explain_top_queries.sql > plans.txt

# Fail on a broken invariant (example)
if grep -q "Seq Scan on orders" plans.txt; then echo "Plan regression"; exit 1; fi
```

この例では、`migrations/change.sql` にはあなたの変更が含まれており、`ci/explain_top_queries.sql` には上位クエリのそれぞれのための `EXPLAIN` ステートメントが含まれています。最後のチェックでは、プランに `orders` に対するシーケンシャルスキャンが含まれている場合にジョブが失敗します。独自の不変条件に置き換えてください。

### データモデルの変更を実験する{#experiment-with-data-model-changes}

データモデルの変更は、データベースに対して実行できる最もリスクの高い操作の1つです。テーブルの分割、列型の変更、または外部キーの追加は、クエリを破損させたり、読み取りや書き込みをブロックしたり、本番データに対して失敗したりする可能性があります。これらの変更のほとんどは、元に戻すのが困難です。

Workbench インスタンスを使用すると、実際のスキーマで実験を行うことができます。変更を試し、それに対して結合やクエリを実行し、外部キーをたどり、どのテーブルが大きく、どのテーブルがルックアップテーブルであるかを確認してください。何かが破損した場合は、インスタンスを削除して別のインスタンスを作成してください。

デフォルトの合成データを使用する場合、Workbench には顧客データが含まれていないため、プライバシーレビューは不要です。

## 制限事項{#limitations}

Workbench は、スキーマ、クエリプラン、および相対的なコストに関する質問に回答します。本番環境のハードウェア、データ、またはすべてのスキーマオブジェクトを再現するわけではありません。

- **サポートされるのは Postgres のみ。**Workbench は Postgres 12 から 18 までをサポートします。他のデータベースエンジンはサポートしません。
- **タイミングは異なる場合があります。**インスタンスは小規模であり、本番環境のハードウェアのようなサイズではありません。「このクエリは 40 ミリ秒かかる」といった絶対的なタイミングではなく、プランの形状、行の見積もり、インデックスの使用状況、および変更前後の結果を比較してください。書き換えやインデックスをベンチマークするには、[Bits Database Optimization][4] を使用してください。
- **生成されたデータは近似値です。**デフォルトでは、Workbench は収集された統計から行を生成するため、テーブルサイズは本番環境に近いものになります。データの偏り、列の相関関係、値の分布が異なる場合があり、それらに依存するプランは変更される可能性があります。Workbench に独自のデータを入力することで、これを回避できます。
- **一部のインデックスや外部キーが欠落している可能性があります。**Workbench は、インデックスや外部キーをスキップしたり、利用できない関数を呼び出す式を削除したりする場合があります。
- **ビュー、関数、トリガー、ロール、および権限は再構築されません。**それらに依存する変更は正確に再現されません。
- **インスタンスは一時的なものです。**インスタンスはデフォルトで 30 分後に期限切れになるため、保持する必要があるものはすべて再作成してください。特定のテーブル数を超えるスキーマは完全にはマテリアライズされません。

Workbench を使用して、構造、クエリプラン、および桁数規模の影響をチェックしてください。その他の影響は対象外です。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/database_monitoring/schema_explorer/
[2]: /ja/mcp_server/
[3]: /ja/database_monitoring/query_metrics/
[4]: /ja/database_monitoring/bits_database_optimization/
[5]: /ja/database_monitoring/
[6]: /ja/account_management/rbac/permissions/
[7]: /ja/mcp_server/setup/