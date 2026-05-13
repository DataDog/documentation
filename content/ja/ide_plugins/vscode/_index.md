---
aliases:
- /ja/developers/ide_integrations/vscode/
- /ja/developers/ide_plugins/vscode/
description: VS Codeやその他のコードエディタで、Datadogのテレメトリとインサイトをソースコードに統合します。
further_reading:
- link: /continuous_testing/
  tag: よくあるご質問
  text: Continuous Testing について
- link: /integrations/guide/source-code-integration/
  tag: よくあるご質問
  text: ソースコード統合について学ぶ
- link: /bits_ai/mcp_server/
  tag: よくあるご質問
  text: Datadog Model Context Protocol（MCP）サーバーについて学びます。
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: ブログ
  text: Datadog の IDE プラグインを使用してトラブルシューティング中のコンテキスト切り替えを削減
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: ブログ
  text: Datadog Exception Replay で本番デバッグを簡素化
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: ブログ
  text: Datadogカーソル拡張機能を使用して、本番環境で発生している問題をデバッグします。
is_beta: true
title: VS Code および Cursor 用のDatadog 拡張機能
---
<!-- TO CONTRIBUTORS: This content also exists in the extension's README file. Remember to update the README when you change anything in this file. -->

{{% site-region region="gov" %}}

<div class="alert alert-danger">
    Visual Studio Code用のDatadog拡張機能は、選択した<a href="/getting_started/site">Datadogサイト</a>ではサポートされていません（{{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

## 概要 {#overview}

VS CodeおよびCursor用のDatadog拡張機能は、開発を加速するためにコードエディタにDatadogをもたらします。

{{< img src="/ide_plugins/vscode/datadog-vscode-3.png" alt="VS CodeおよびCursor用のDatadog拡張機能" style="width:100%;" >}}

この拡張機能には以下の機能が含まれています：

-   [**モデルコンテキストプロトコル（MCP）サーバー**](?tab=cursor#installation)：エディタのAIエージェントをDatadogのプロダクションテレメトリ、ツール、およびコンテキストに接続します。

-   [**ログ**](#logs)：ログのボリュームを測定し、コードからログを検索します。

-   [**コードインサイト**](#code-insights)：コードを離れることなく、ランタイムエラー、脆弱性、不安定なテストについての情報を得ます。

-   [**IDEでビュー**](#view-in-ide)：Datadogのコード参照からソースファイルに直接ジャンプします。

-   [**コードセキュリティ**](#code-security)：コミットする前にセキュリティ問題を検出して修正し、カスタムルールを作成します。

-   [**例外リプレイ**](#exception-replay)：プロダクションコードのデバッグを行います。

-   [**チャットで修正**](?tab=cursor#fix-in-chat)：AIによる提案と説明を使って、コードエラー、脆弱性、不安定なテストを修正します。

<div class="alert alert-info">特に記載がない限り、すべての拡張機能はVS CodeおよびCursorのようなVS Codeフォークに基づく他のIDEで利用可能です。</div>

## 要件 {#requirements}

-   **Datadogアカウント**：ほとんどの機能にはDatadogアカウントが必要です。

    -   Datadogを初めて使用しますか？[Datadogの監視およびセキュリティツールについて詳しく学ぶ][3]、無料トライアルにサインアップしてください。
    -   あなたの組織が `myorg.datadoghq.com` のような [カスタムサブドメイン][18] を使用している場合、IDEの `datadog.connection.oauth.setup.domain` 設定を使用してそれを示す必要があります。

-   **Git**： 拡張機能は、IDEでGitが有効になっているとより良く機能します。`git.enabled`設定を確認して、これが有効になっていることを確認してください。

## インストール {#installation}

インストール手順は、他のVS Codeベースのエディタによって異なる場合があります。

{{< tabs >}}
{{% tab "VS コード" %}}
拡張機能をIDE内で直接、またはウェブからインストールしてください：

-   **VS Codeで**： 拡張機能ビューを開き (`Shift` + `Cmd/Ctrl` + `X`)、`datadog`を検索し、Datadogの公式拡張機能を選択します。

-   **ウェブから**： [Visual Studio Marketplace][1]の拡張機能のページからインストールします。

### MCPサーバーの設定 {#mcp-server-setup}

この拡張機能には、[Datadog Model Context Protocol（MCP）サーバー][3]へのアクセスが含まれています。特定のDatadog環境でエディタのAI機能を強化するために、MCPサーバーが有効になっていることを確認してください：

1. チャットパネルを開き、エージェントモードを選択し、**ツールの設定**ボタンをクリックします。
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="VS Code の Configure Tools button を設定します。" style="width:60%;" >}}

1. リストでDatadogサーバーとツールを見つけ、チェックボックスをオンにして有効にします（必要に応じて展開または更新してください）。

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: /ja/bits_ai/mcp_server/

{{% /tab %}}

{{% tab "カーソル" %}}
拡張機能をIDE内で直接、またはウェブからインストールしてください：

-   **カーソルで**： 拡張機能ビューを開き (`Shift` + `Cmd/Ctrl` + `X`)、`datadog`を検索し、Datadogの公式拡張機能を選択します。

-   **ウェブから**： [Open VSX Registry][2]からVSIXファイルをダウンロードし、コマンドパレットで`Extensions: Install from VSIX`を使用してインストールします (`Shift` + `Cmd/Ctrl` + `P`)。

### MCPサーバーの設定 {#mcp-server-setup-1}

この拡張機能には、[Datadog Model Context Protocol（MCP）サーバー][3]へのアクセスが含まれています。特定のDatadog環境でエディタのAI機能を強化するために、MCPサーバーが有効になっていることを確認してください：

1. **カーソル設定** (`Shift` + `Cmd/Ctrl` + `J`)に移動し、**MCP**タブを選択します。
1. Datadogサーバーを見つけ、トグルをオンにして有効にします。利用可能なツールのリストが表示されます（必要に応じて展開または更新してください）。

[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: /ja/bits_ai/mcp_server/

{{% /tab %}}
{{< /tabs >}}

## コア機能 {#core-features}

### ログ {#logs}

**ログ**を使用して、コード内の特定のログ行によって生成されたログの量を測定します。拡張機能は、Datadogのログレコードに一致する検出されたログパターンの上にコードに注釈を追加します。

{{< img src="/ide_plugins/vscode/logs_navigation.mp4" alt="ログナビゲーションのプレビュー" style="width:100%" video=true >}}

[ログ][20]のサブセクションで詳細を確認してください。

### コードインサイト {#code-insights}

**コードインサイト**は、ランタイムエラー、コードの脆弱性、フレークテストを含む、コードベースに関連するDatadog生成のインサイトであなたを情報提供します。

{{< img src="/ide_plugins/vscode/code-insights-2.png" alt="コードインサイトビュー。" style="width:100%;" >}}

[コードインサイト][21]のサブセクションで詳細を確認してください。

### コードセキュリティ {#code-security}

[**コードセキュリティ**][19]機能は、変更をコミットする前に、事前定義されたルールに対してローカルでコードを分析し、セキュリティ問題や脆弱性を検出して修正します。

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="静的分析のプレビュー" style="width:100%" video=true >}}

[コードセキュリティ][19]のサブセクションで詳細を確認してください。

### 例外リプレイ {#exception-replay}

**例外リプレイ**を使用すると、Error Trackingコードインサイトのスタックトレースフレームを検査し、本番環境で実行されているコードの変数の値に関する情報を取得できます。

{{< img src="/ide_plugins/vscode/exception_replay.mp4" alt="例外リプレイのプレビュー" style="width:100%" video=true >}}

[例外リプレイ][22]のサブセクションで詳細を確認してください。

## その他の機能 {#other-features}

### IDEでビュー {#view-in-ide}

<div class="alert alert-info">この機能は、VS Code と Cursor のみで利用可能です。他の VS Code のフォークはサポートされていません。</div>

**View in VS Code** または **View in Cursor** 機能は、Datadog から直接ソースファイルへのリンクを提供します。UI に表示されるスタックトレースのフレームの隣にあるボタンを探してください（例えば、[Error Tracking][5] で）：

{{< img src="/ide_plugins/vscode/view-in-vscode-2.png" alt="Datadog における View in VS Code ボタンを示すスタックトレース" style="width:100%;" >}}

この機能を使用して、インサイト（Error Tracking からのエラーなど）からソースファイルを開くこともできます：

{{< img src="/ide_plugins/vscode/view-in-vscode-error.png" alt="Datadog における View in VS Code ボタンを示す Error Tracking の問題" style="width:100%;" >}}

<div class="alert alert-info">この機能を使用するには、まず <a href="/integrations/guide/source-code-integration/">ソースコード統合</a>をサービスのために設定してください。</div>

### チャットで修正 {#fix-in-chat}

**チャットで修正** ボタンは、拡張機能がエラーや問題を特定したときにいくつかのコンテキストで表示されます。ボタンをクリックすると、問題を要約し、関連する詳細とコンテキストを含み、エージェントへの具体的な指示を提供する AI チャットプロンプトが生成されます。

{{< img src="/ide_plugins/vscode/cursor_fix_in_chat.mp4" alt="インラインコードエラーを修正するためにチャットで修正を使用する" style="width:100%" video=true >}}

## データとテレメトリ {#data-and-telemetry}

Datadog は、この IDE の使用状況に関する特定の情報を収集します。これには、IDE とのインタラクション方法、使用中にエラーが発生したかどうか、その原因、ユーザー識別子が含まれます。これらの情報は、[Datadog プライバシーポリシー][13] および Datadog の [VS Code 拡張機能 EULA][12] に従って取り扱われます。このデータは、拡張機能のパフォーマンスと機能を改善するために使用されます。これには、拡張機能への移行および拡張機能からの移行、さらにサービスにアクセスするために適用される Datadog ログインページが含まれます。

このデータを [Datadog][3] に送信したくない場合は、拡張機能の設定でいつでも無効にできます：`Datadog > Telemetry > Setup > Enable Telemetry` を選択してください。`disabled`

<div class="alert alert-info">Datadog 拡張機能は、<a href="https://code.visualstudio.com/docs/configure/telemetry#_output-channel-for-telemetry-events">VS Code テレメトリ</a> 設定も尊重します。</div>

## ヘルプとフィードバック {#help-and-feedback}

フィードバックを共有するには、[team-ide-integration@datadoghq.com][14] にメールを送るか、拡張機能の [公開リポジトリ][15] に issue を作成してください。

既知の問題を確認するには、[issues][16] セクションをチェックしてください。

[Cursor][17]を使用していますか、それともVS Codeの別のフォークを使用していますか？[Open VSX Registry][2]で拡張機能を見つけてください。

## ライセンス{#license}

この拡張機能をダウンロードまたは使用する前に、[エンドユーザーライセンス契約][12]を注意深くお読みください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: https://www.datadoghq.com/
[5]: /ja/tracing/error_tracking/
[12]: https://www.datadoghq.com/legal/eula/
[13]: https://www.datadoghq.com/legal/privacy/
[14]: mailto:team-ide-integration@datadoghq.com
[15]: https://github.com/DataDog/datadog-for-vscode
[16]: https://github.com/DataDog/datadog-for-vscode/issues?q=is%3Aissue+label%3A%22known+issue%22
[17]: https://www.cursor.com/
[18]: /ja/account_management/multi_organization/#custom-sub-domains
[19]: /ja/ide_plugins/vscode/code_security/
[20]: /ja/ide_plugins/vscode/logs/
[21]: /ja/ide_plugins/vscode/code_insights/
[22]: /ja/ide_plugins/vscode/exception_replay/