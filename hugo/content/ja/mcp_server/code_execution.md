---
algolia:
  rank: 65
  tags:
  - mcp
  - mcp server
  - code execution
  - code-exec
description: エージェントが作成したJavaScriptをDatadog APIに対して、単一のDatadog MCP Serverツール呼び出しで実行し、複数のDatadog製品にまたがる問題を調査します。
further_reading:
- link: mcp_server
  tag: ドキュメント
  text: Datadog MCP サーバー
- link: mcp_server/setup
  tag: ドキュメント
  text: Datadog MCP Server を設定する
- link: mcp_server/tools
  tag: ドキュメント
  text: Datadog MCP Server ツール
title: Datadog MCP Serverによるコード実行
---
## 概要 {#overview}

Datadog MCP Serverの`code-exec`ツールセットを使用すると、AIエージェントはAPIリクエストごとにツールを呼び出すのではなく、単一のDatadog MCP Serverツール呼び出しでDatadog APIに対してJavaScriptを作成および実行できます。エージェントが生成したコードは、Datadogが管理するサンドボックス内で実行されます。エージェントに送り返されるデータは、コードが返す値のみです。これにより、大規模なAPIレスポンスがモデルのコンテキストに含まれるのを防ぎます。

複数のDatadog製品にまたがる調査や、複数の呼び出しからのデータを結合、フィルタリング、または要約する必要がある調査には、コード実行を使用してください。例として、同じサービスおよび時間枠のエラーログとAPMレイテンシーを関連付けることが挙げられます。

## なぜコード実行を使用するのか {#why-use-code-execution}

コード実行がない場合、エラーが最も多いサービスにAPMレイテンシーデータを付与するよう指示されたエージェントは、サービスごとに個別のツール呼び出しを行う必要があります。また、結果を結合するために追加のターンも必要になります。それらの呼び出しやターンはそれぞれ、コンテキストウィンドウのスペースを消費します。

コード実行を使用すると、エージェントは同じ調査を単一のスクリプトとして表現できます。

1. 特定の期間内にエラーログが最も多いサービスについてログをクエリします。
1. 返された各サービスについて、レイテンシーデータのスパンをクエリします。
1. 2つの結果セットを結合し、コンパクトなオブジェクトを返します。

Datadog MCP Serverがスクリプトを実行し、結合された結果のみを返します。エージェントは、サービスごとに1回ではなく、1回のツール呼び出しで調査を完了します。

## 利用可能なツール{#available-tools}

`code-exec`ツールセットは以下を提供します。

- **`execute_code`**: エージェントが作成したJavaScriptをサンドボックス内で実行し、構造化された結果を返します。権限とプロンプトの例については、MCP Server Tools リファレンスの [`execute_code`][1] を参照してください。
- **`search_datadog_sdk`**: エージェントがスクリプトを作成するために利用可能な SDK 関数と API メソッドを検索します。MCP Server Tools リファレンスの [`search_datadog_sdk`][2] を参照してください。

生成されるコードは、公開されている [Datadog API Client for TypeScript][3] に基づく JavaScript です。

## サンドボックスがアクセスできるもの {#what-the-sandbox-can-access}

`code-exec` ツールセットによって実行されるコードは、ユーザーのアイデンティティを使用して Datadog API に対して実行されます。エージェントは、ユーザーがアクセス権を持つデータのみを読み取ることができます。その他のアクセス制限は以下の通りです。

- サンドボックスは分離されています。スクリプトは、ローカルマシン、ファイルシステム、任意のネットワーク宛先、または Datadog の生の認証情報にアクセスできません。
- サンドボックスは、読み取り専用の Datadog API 呼び出しのみを公開します。エージェントは `execute_code` を使用して、モニターの作成やダッシュボードの更新などの書き込みアクションを実行することはできません。
- スクリプトから行われる API 呼び出しには、既存の [ロール権限][4] が適用されます。データセットへのアクセス権がない場合、エージェントは `execute_code` を通じてもそのデータセットをクエリすることはできません。
- 生の API レスポンスは、スクリプトによる処理中、サンドボックス内に留まります。エージェントに送り返されるデータは、コードが返す値のみです。ログに保存されている顧客データなど、基盤となるデータが機密性の高いものである場合は、スクリプトが何を返すかを確認してください。

## コード実行を有効にする {#enable-code-execution}

コード実行を有効にするには、AI クライアントを Datadog MCP Server に接続する際に、`code-exec` クエリパラメータに `toolsets` を含めます。クライアント固有の接続手順については、[Datadog MCP Server のセットアップ][5] を参照してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
たとえば、選択した [Datadog サイト][6] に基づいて ({{< region-param key="dd_site_name" >}})、このURLにより、コード実行と併せてコアツールセットが有効になります。

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,code-exec</code></pre>

`code-exec`は`toolsets=all`に含まれているため、一般的に利用可能なすべてのツールセットを既に有効にしている場合は、個別に追加する必要はありません。

[6]: /ja/getting_started/site/
{{< /site-region >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/mcp_server/tools/#execute_code
[2]: /ja/mcp_server/tools/#search_datadog_sdk
[3]: https://github.com/DataDog/datadog-api-client-typescript
[4]: /ja/account_management/rbac/permissions/
[5]: /ja/mcp_server/setup