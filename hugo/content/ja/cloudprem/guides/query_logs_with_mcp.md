---
description: CloudPrem インデックスに保存されたログをDatadog MCP サーバーを使用してクエリする方法
further_reading:
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Datadog MCP サーバーのご紹介
- link: /ide_plugins/vscode/?tab=cursor#installation
  tag: Documentation
  text: VS Code および Cursor 用のDatadog 拡張機能
- link: /cloudprem/operate/search_logs/
  tag: Documentation
  text: CloudPrem におけるログの検索
title: Datadog MCP サーバーを使用した CloudPrem ログのクエリ
---
{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem はプレビュー中です" >}}
  CloudPrem プレビューに参加し、新しいセルフホスト型ログ管理機能にアクセスしてください。
{{< /callout >}}

## 概要

[Datadog MCP (Model Context Protocol) サーバー][1] を使用すると、AI 駆動のツールやインテグレーションを通じて、CloudPrem インデックスに保存されたログなどの Datadog ログを直接クエリできます。Datadog MCP サーバーを使用して CloudPrem ログをクエリすることで、以下のような価値の高い機能が使用できるようになります。

 **コンテキスト対応の統合トラブルシューティング**: すべての環境からのログ、メトリクス、トレースを 1 か所でクエリおよび相関させ、テレメトリタイプを横断して根本原因をより早く特定します。
**自然言語インタラクション**: 平易な言葉で質問し、AI に適切なログクエリを生成させることができます。構文を覚える必要はありません。

## 前提条件

 ログが取り込まれた稼働中の CloudPrem デプロイメント。
[Datadog MCP サーバー][1] へのアクセス。
CloudPrem インデックス名 ([**CLOUDPREM INDEXES**] (CloudPrem インデックス) の下にある [Datadog Log Explorer][2] 内に表示されます)。

## CloudPrem ログのクエリ

CloudPrem インデックスに保存されたログをクエリするには、標準のログクエリに加えて、以下の 2 つの重要なパラメーターを指定する**必要があります**。

 (必須) **`indexes`**: ご使用の CloudPrem インデックスの名前。
(必須) **`storage_tier`**: `"cloudprem"` に設定する必要があります。

どちらのパラメーターもない場合、クエリは CloudPrem ではなく標準の Datadog ログインデックスを検索するようにデフォルト設定されます。

最良の結果を得るために、プロンプトには**以下も含める**ことをおすすめします。
(推奨) タイムレンジ (例: "過去 1 時間"、"過去 24 時間")。
(推奨) クエリフィルター (サービス、ステータス、ログ内容)。

###クエリパラメーター
以下の表は、MCP サーバーでログをクエリする際に使用される主要なパラメーターの説明です。

|パラメーター|説明|例|
||||
| `query` |Datadog 検索構文を使用したログ検索クエリ| `"*"` (すべてのログ)、`"service:web"`、`"status:error"` |
| `indexes` | 検索する CloudPrem インデックス名の配列| `["cloudpremdevmain"]` |
| `storage_tier` |クエリするストレージ階層 (CloudPrem ログの場合は `"cloudprem"` である必要があります)| `"cloudprem"` |
| `from` | クエリの開始時間| `"now1h"`、`"now24h"`、`"20240115T00:00:00Z"` |
| `to` |クエリの終了時間| `"now"`、`"20240115T23:59:59Z"` |
| `sort` | 結果のソート順 | `"timestamp"` (降順)、`"timestamp"` (昇順) |

パラメーターと自然言語クエリの例については、[高度なクエリの例](#advancedqueryexamples) を参照してください。

### CloudPrem インデックス名の見つけ方

CloudPrem インデックス名を見つけるには、以下の手順に従います。

1. [Datadog Log Explorer][2] に移動します。
2. 左側のファセットパネルで [**CLOUDPREM INDEXES**] (CloudPrem インデックス) セクションを探します。
3. ご使用の CloudPrem インデックスが、`cloudprem<cluster_name><index_name>` の形式でリストされています。

クラスターを選択し、[**View Indexes**] (インデックスの表示) をクリックすると、[CloudPrem コンソール][3] でもインデックス名を見つけることができます。

##高度なクエリの例

AI 駆動ツールを Datadog MCP サーバーで使用する際は、自然言語で質問できます。MCP サーバーが、質問を適切なフォーマットの CloudPrem クエリに自動変換します。

###特定のサービスからのエラーログ
**プロンプト**:
"過去 1 時間以内に cloudpremdevmain インデックス内の nginx サービスから出力されたエラーログを表示してください。"

**次のように変換されます**:

```json
{
  "query": "service:nginx status:error",
  "indexes": ["cloudprem--dev--main"],
  "storage_tier": "cloudprem",
  "from": "now-1h",
  "to": "now"
}
```

###特定のログ内容を検索する
**プロンプト**:
"過去 24 時間以内に cloudpremprodmain の API サービスから出力されたログのうち、'connection timeout' を含むものを見つけてください。"

**次のように変換されます**:

```json
{
  "query": "service:api \"connection timeout\"",
  "indexes": ["cloudprem--prod--main"],
  "storage_tier": "cloudprem",
  "from": "now-24h",
  "to": "now"
}
```

###HTTP ステータスコードでフィルタリングする
**プロンプト**:
"過去 24 時間以内に cloudpremprodmain インデックスから出力されたログのうち、500 ステータスコードが記録されているものをすべて取得してください。"

**次のように変換されます**:

```json
{
  "query": "status:500",
  "indexes": ["cloudprem--prod--main"],
  "storage_tier": "cloudprem",
  "from": "now-1d",
  "to": "now"
}
```

##重要な注意事項

CloudPrem ログをクエリする際は、 **`storage_tier` と `indexes`の両方が必要です**。これらのパラメーターがない場合、クエリは標準の Datadog インデックスを検索します。
`storage_tier` は常に `"cloudprem"` に設定する必要があります。
`indexes` パラメーターには、有効な CloudPremインデックス名を含める必要があります (形式は `cloudprem<cluster_name><index_name>`)。
自然言語クエリを使用する際は、プロンプトに CloudPrem インデックス名を明示的に記載してください。
CloudPrem ログは、インデックス化されるとすぐにリアルタイムでクエリできるようになります。
検索構文は標準の [Datadog ログ検索構文][4] に従います。

##参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/bits_ai/mcp_server/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/cloudprem
[4]: /ja/logs/explorer/search_syntax/