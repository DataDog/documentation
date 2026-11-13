---
aliases:
- /ja/cloudprem/guides/query_logs_with_mcp/
description: Datadog MCP Server を使用して BYOC Logs インデックスに保存されたログをクエリする方法
further_reading:
- link: /ide_plugins/vscode/?tab=cursor#installation
  tag: ドキュメント
  text: VS Code および Cursor 用の Datadog 拡張機能
- link: /byoc-logs/operate/search_logs/
  tag: ドキュメント
  text: BYOC Logs でログを検索する
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: ブログ
  text: Datadog MCP Server のご紹介
- link: https://www.datadoghq.com/blog/byoc-cross-cluster-queries/
  tag: ブログ
  text: チームや AI エージェント向けのクラスター間クエリを使用して、Datadog BYOC 全体でデータを統合する
title: Datadog MCP Server で BYOC Logs をクエリする
---
## 概要 {#overview}

[Datadog MCP (Model Context Protocol) Server][1] の `search_datadog_logs` ツールを使用して、BYOC (Bring Your Own Cloud) Logs インデックスに保存されたログをクエリします。このツールには、AI を活用したツールやインテグレーションを通じてアクセスできます。

**注**: BYOC Logs インデックスは `search_datadog_logs` でのみサポートされています。`analyze_datadog_logs` ツールと `datadog/querying-patterns` スキルは、BYOC Logs インデックスに対応していません。

## 前提条件 {#prerequisites}

-  ログが取り込まれた稼働中の BYOC Logs デプロイメント。
- [Datadog MCP Server][1] へのアクセス。
- BYOC Logs インデックス名 ({{< ui >}}BYOC INDEXES{{< /ui >}} の下にある [Datadog ログエクスプローラー][2]内に表示されます)。

## BYOC Logs のクエリ {#querying-byoc-logs}

BYOC Logs インデックスに保存されたログをクエリするには、`search_datadog_logs` を使用し、標準のログクエリに加えて BYOC Logs インデックス名を指定します。

最良の結果を得るために、プロンプトには**以下も含める**ことをお勧めします。
- (推奨) タイムレンジ (例: "過去 1 時間"、"過去 24 時間")。
- (推奨) クエリフィルター (サービス、ステータス、ログ内容)。

### クエリパラメーター {#query-parameters}
次のテーブルは、`search_datadog_logs` で使用される主要パラメーターについて説明しています。

| パラメーター | 説明 | 例 |
|-----------|-------------|---------|
| `query` | Datadog クエリ構文を使用したログ検索クエリ | `"*"` (すべてのログ)、`"service:web"`、`"status:error"` |
| `indexes` | 検索する BYOC Logs インデックス名の配列 | `["byoc--dev--main"]` |
| `from` | クエリの開始時刻 | `"now-1h"`、`"now-24h"`、`"2024-01-15T00:00:00Z"` |
| `to` | クエリの終了時刻 | `"now"`、`"2024-01-15T23:59:59Z"` |
| `sort` | 結果の並べ替え順序 | `"-timestamp"` (降順)、`"timestamp"` (昇順) |

パラメーターと自然言語クエリの例については、[高度なクエリの例](#advanced-query-examples)を参照してください。

### BYOC Logs インデックス名の確認 {#finding-your-byoc-logs-index-name}

BYOC Logs インデックス名を確認するには、以下の手順を実行します。

1. [Datadog ログエクスプローラー][2]に移動します。
2. 左側のファセットパネルで {{< ui >}}BYOC INDEXES{{< /ui >}} セクションを探します。
3. BYOC Logs インデックスが `byoc--<cluster_name>--<index_name>` の形式でリストされています。

クラスターを選択し、{{< ui >}}View Indexes{{< /ui >}} をクリックすると、[BYOC Logs コンソール][3]でもインデックス名を見つけることができます。

## 高度なクエリの例 {#advanced-query-examples}

`search_datadog_logs` で AI 搭載ツールを使用する場合、自然言語で質問できます。このツールは、質問を適切なフォーマットの BYOC Logs クエリに変換します。

### 特定のサービスからのエラーログ {#error-logs-from-a-specific-service}
**プロンプト**:
"過去 1 時間以内に byoc--dev--main インデックス内の nginx サービスから出力されたエラーログを表示してください。"

**次のように変換されます**。

```json
{
  "query": "service:nginx status:error",
  "indexes": ["byoc--dev--main"],
  "from": "now-1h",
  "to": "now"
}
```

### 特定のログ内容を検索する {#search-for-specific-log-content}
**プロンプト**:
"過去 24 時間以内に byoc--prod--main の API サービスから出力されたログのうち、'connection timeout' を含むものを見つけてください。"

**次のように変換されます**。

```json
{
  "query": "service:api \"connection timeout\"",
  "indexes": ["byoc--prod--main"],
  "from": "now-24h",
  "to": "now"
}
```

### HTTP ステータスコードでフィルタリングする {#filter-by-http-status-code}
**プロンプト**:
"過去 24 時間以内に byoc--prod--main インデックスから出力されたログのうち、500 ステータスコードが記録されているものをすべて取得してください。"

**次のように変換されます**。

```json
{
  "query": "status:500",
  "indexes": ["byoc--prod--main"],
  "from": "now-1d",
  "to": "now"
}
```

## 重要な注意事項 {#important-notes}

- `indexes` パラメーターには、有効な BYOC Logs インデックス名 (`byoc--<cluster_name>--<index_name>` 形式) を含める必要があります。
- 自然言語クエリを使用する際は、プロンプトに BYOC Logs インデックス名を明示的に記載してください。
- BYOC Logs データは、インデックス化されるとすぐにリアルタイムでクエリできるようになります。
- クエリ構文は標準の [Datadog ログ検索構文][4]に従います。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/mcp_server/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/byoc-logs
[4]: /ja/logs/explorer/search_syntax/