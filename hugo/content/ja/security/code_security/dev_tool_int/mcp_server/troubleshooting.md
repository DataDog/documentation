---
description: Datadog Code Security MCP Server に関する一般的な問題と解決策。
further_reading:
- link: /security/code_security/dev_tool_int/mcp_server/
  tag: ドキュメント
  text: Code Security MCP サーバーの概要とセットアップ
- link: /security/code_security/dev_tool_int/mcp_server/tools_reference/
  tag: ドキュメント
  text: ツールリファレンス
is_beta: true
title: トラブルシューティング
---
[Datadog Code Security MCP Server][3] で問題が発生した場合は、以下の解決策を使用して一般的な問題を診断および解決します。

<div class="alert alert-info">この MCP サーバーは、Datadog の機能やデータへのクラウドベースのアクセスを提供する <a href="/mcp_server">Datadog MCP Server</a> とは別のものです。Code Security MCP サーバーはローカルで実行され、コードレベルのセキュリティスキャンに重点を置いています。</div>

## バイナリが見つかりません {#binary-not-found}

スキャンでバイナリが見つからないというエラーが返される場合は、必要なスキャナーをすべて一覧表示します。

```shell
datadog-code-security-mcp version --detailed
```

[セキュリティバイナリのインストール][1]の手順に従って、不足しているバイナリをインストールします。Agent Skills をインストールすると、`dd-codesec-setup-toolchain` は同じバイナリのインストール、更新、および診断を行います。[エージェントスキルのインストール][4]を参照してください。

## 認証エラー {#authentication-errors}

MCP サーバー構成で設定されたキーは、シェルにエクスポートされません。`echo $DD_API_KEY` はそのシェルでエクスポートされたキーのみを表示します。これは直接 CLI コマンドが使用するキーと同じです。

- MCP サーバーについては、[Code Security MCP サーバー][3]ページのクライアント構成で `DD_API_KEY` と `DD_APP_KEY` が設定されていることを確認します。
- 直接 CLI コマンドの場合は、同じシェルで `DD_API_KEY` と `DD_APP_KEY` をエクスポートします。必要に応じて `DD_SITE` をエクスポートします。

値が設定されているにもかかわらずスキャンが失敗する場合は、キーに適切な権限があることを確認してください。詳細については、[API キーとアプリケーションキー][2]を参照してください。

## MCP サーバーが応答しない {#mcp-server-not-responding}

1. バイナリがインストールされ、アクセス可能であることを確認します。

    ```shell
    datadog-code-security-mcp version
    ```

2. MCP サーバーログを確認します。

    ```shell
    tail -f ~/Library/Logs/Claude/mcp*.log
    tail -f ~/.claude/logs/mcp*.log
    ```

3. クライアント構成が正しいバイナリパスを指していることを確認します。Homebrew 経由でインストールした場合、バイナリは `PATH` にあるはずです。そうでない場合は、構成で絶対パスを使用します。

## 部分的な結果 {#partial-results}

包括的なスキャンを実行する場合、一部のスキャンタイプは成功しても他は失敗することがあります (たとえば、一部のバイナリのみがインストールされている場合など)。サーバーは以下を返します。

- 成功したすべてのスキャナーからの結果。
- 失敗したスキャナーのインストール手順を含むエラーメッセージ。

これは予期された動作です。不足しているバイナリをインストールし、再実行して完全な結果を取得します。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/dev_tool_int/mcp_server/#install-security-binaries
[2]: /ja/account_management/api-app-keys/
[3]: /ja/security/code_security/dev_tool_int/mcp_server/
[4]: /ja/security/code_security/dev_tool_int/mcp_server/#install-agent-skills