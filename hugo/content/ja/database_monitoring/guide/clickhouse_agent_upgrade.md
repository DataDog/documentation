---
aliases:
- /ja/database_monitoring/clickhouse_agent_upgrade
further_reading:
- link: /database_monitoring/
  tag: ドキュメント
  text: Database Monitoring
- link: /database_monitoring/setup_clickhouse/
  tag: ドキュメント
  text: ClickHouse のセットアップ
- link: /database_monitoring/troubleshooting/
  tag: ドキュメント
  text: Database Monitoring のトラブルシューティング
title: 7.84 より前の Agent バージョンから ClickHouse インテグレーションをアップグレードする
---
## 概要{#overview}

ClickHouse の Database Monitoring には、Datadog Agent 7.84 以降が必要です。以前の Agent バージョンでインテグレーションをセットアップした場合は、このガイドに従ってアップグレードしてください。

Agent バージョン 7.84 以降、ClickHouse の Database Monitoring では、クラスター内のどのノードが各クエリを実行したかを表示できるようになりました。クエリメトリクス、クエリサンプル、完了したクエリ、およびクエリエラーには、それらを実行したノードがタグ付けされるため、以下のことが可能になります。

- ノード間で同じクエリのパフォーマンスを比較する。
- 低速なクエリや失敗したクエリの原因となっているノードを見つける。
- クラスター内のノード間で負荷の偏りを見つける。

ノードを識別するために、Agent は各インスタンスが属するクラスターと、それが ClickHouse Cloud 上で実行されているかセルフホストされているかも報告します。この情報は、以下のタグとして追加されます。

| タグ | 説明 |
|---|---|
| `clickhouse_node` | クエリを実行したノード。|
| `clickhouse_cluster` | インスタンスが属する ClickHouse クラスター。|
| `hosting_type` | `clickhouse-cloud` または `self-hosted`。|

Agent は、以前のセットアップ手順ではアクセス権が付与されていなかった ClickHouse システムテーブルからこの情報を読み取ります。7.84 より前の Agent バージョンでインテグレーションをセットアップした場合は、Agent をアップグレードする前に、以下の追加権限を付与してください。Agent は起動時にのみ新しい権限を読み取るため、アップグレード後に権限を付与した場合は、[Agent を再起動](#restart-the-agent)してください。

## 追加権限を付与する {#grant-the-additional-permissions}

管理者として ClickHouse に接続し、次のステートメントを実行します。監視ユーザーの名前が `datadog` でない場合は、お使いのユーザー名に置き換えてください。

```sql
GRANT SELECT ON system.macros TO datadog;
GRANT SELECT ON system.clusters TO datadog;
GRANT SELECT ON system.settings TO datadog;
GRANT SELECT ON system.table_engines TO datadog;
GRANT SELECT ON system.one TO datadog;
GRANT REMOTE ON *.* TO datadog;
```

## Agent を再起動します {#restart-the-agent}

Agent は起動時に一度だけクラスターを検索し、再起動するまでその結果を使用し続けます。アップグレード前に権限を適用した場合、アップグレードによって Agent が再起動されるため、追加の操作は不要です。アップグレード後に適用した場合は、[Agent を再起動][1] してください。

## アップグレードを確認します {#verify-the-upgrade}

Agent の再起動後、[Database Monitoring][2] で ClickHouse インスタンスを開き、以下を確認します。

- クエリデータに `clickhouse_node` がタグ付けされています。
-  `hosting_type` タグは、ClickHouse Cloud サービスの場合は `clickhouse-cloud`、その他のデプロイメントの場合は `self-hosted` です。

`clickhouse_node` タグがない場合:

-  [Agent ステータスコマンド][3] を実行し、ClickHouse チェックで権限エラーがないか確認します。
-  上記の権限が、Agent が接続するユーザーに対してすべてのノードで適用されていることを確認します。
-  クラスターで `{cluster}` マクロまたは `<remote_servers>` エントリが定義されており、Agent が接続するノードが含まれていることを確認します。いずれも設定されていない場合、Agent はクラスターを識別できず、`clickhouse_cluster` タグは報告されません。

`hosting_type` タグが `unknown` の場合、Agent は `system.settings` または `system.table_engines` を読み取れませんでした。両方のテーブルに対する `GRANT SELECT` ステートメントが適用されていることを確認してから、[Agent を再起動][1] してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/configuration/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/databases
[3]: /ja/agent/configuration/agent-commands/#agent-status-and-information