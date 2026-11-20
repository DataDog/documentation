---
aliases:
- /ja/developers/ide_integrations/vscode/
- /ja/developers/ide_plugins/vscode/
description: Datadog のテレメトリとインサイトを VS Code などのコードエディターのソースコードに統合します。
further_reading:
- link: /continuous_testing/
  tag: よくあるご質問
  text: Continuous Testing について
- link: /integrations/guide/source-code-integration/
  tag: よくあるご質問
  text: ソースコードインテグレーションについて説明します。
- link: /bits_ai/mcp_server/
  tag: よくあるご質問
  text: MCP (Datadog Model Context Protocol) サーバーについて説明します。
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: ブログ
  text: Datadog の IDE Plugins を使用してトラブルシューティング中のコンテキスト切り替えを削減
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: ブログ
  text: Datadog Exception Replay で本番デバッグを簡素化
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: ブログ
  text: Datadog Cursor 拡張機能を使用して、本番環境で発生している問題をデバッグします。
is_beta: true
title: VS Code および Cursor 用の Datadog 拡張機能
---
<!-- TO CONTRIBUTORS: This content also exists in the extension's README file. Remember to update the README when you change anything in this file. -->

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
    Visual Studio Code の Datadog 拡張機能は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。
</div>
{{% /site-region %}}

## 概要 {#overview}

VS Code および Cursor 用の Datadog 拡張機能を使用すると、ご使用のコードエディターに Datadog を統合して、開発を加速できます。

{{< img src="/ide_plugins/vscode/datadog-vscode-3.png" alt="VS Code および Cursor 用の Datadog 拡張機能" style="width:100%;" >}}

この拡張機能には以下の機能が含まれています。

-   [**MCP (Model Context Protocol) Server**](?tab=cursor#installation): エディターの AI エージェントを Datadog の本番テレメトリ、ツール、コンテキストに接続します。

-   [**Logs**](#logs): ログの数量を測定し、コードからログを検索します。

-   [**Code Insights**](#code-insights): コードを開いたままで、ランタイムエラー、脆弱性、不安定なテストに関する最新情報を得られます。

-   [**View in IDE**](#view-in-ide): Datadog のコード参照からソースファイルに直接移動します。

-   [**Code Security**](#code-security): コミットする前にセキュリティ上の問題を検出して修正し、カスタムルールを作成します。

-   [**Exception Replay**](#exception-replay): 本番コードをデバッグします。

-   [**Live Debugger**](#live-debugger): 再デプロイすることなくランタイムデータをキャプチャするために、実行中のサービスに非破壊的なログポイントを追加します。

-   [**Fix in Chat**](?tab=cursor#fix-in-chat): AI による提案と説明を利用して、コードエラー、脆弱性、不安定なテストを修正します。

<div class="alert alert-info">特段の記載がない限り、すべての拡張機能は VS Code および Cursor などの VS Code フォークに基づくほかの IDE の両方で利用可能です。</div>

## 要件 {#requirements}

-   **Datadog アカウント**: ほとんどの機能で Datadog アカウントが必要です。

    -   Datadog を初めてご使用の場合は、[詳細はこちら][3] にアクセスして、Datadog のモニターおよびセキュリティツールについて学び、無料トライアルにご登録ください。
    -   組織で `myorg.datadoghq.com` などの [カスタムサブドメイン][18] を使用している場合は、IDE で `datadog.connection.oauth.setup.domain` 設定を使用してそのことを指定する必要があります。

-   **Git**: 拡張機能は、IDE で Git が有効になっている場合により適切に機能します。`git.enabled` 設定でこれが有効になっていることを確認してください。

## インストール {#installation}

ほかの VS Code ベースのエディターでは、インストール手順が異なる場合があります。

{{< tabs >}}
{{% tab "VS Code" %}}
拡張機能を IDE 内で直接、または Web からインストールします。

-   **VS Code 内**: 拡張機能ビューを開き (`Shift` + `Cmd/Ctrl` + `X`)、`datadog` を検索し、Datadog の公式拡張機能を選択します。

-   **Web から**: [Visual Studio Marketplace][1] の拡張機能のページからインストールします。

### MCP サーバーの設定 {#mcp-server-setup}

この拡張機能には、[Datadog Model Context Protocol (MCP) サーバー][3] へのアクセスが含まれています。ご使用の Datadog 環境でエディターの AI 機能を強化するために、MCP サーバーが有効になっていることを確認してください。

1. チャットパネルを開き、エージェントモードを選択し、[**Configure Tools**] (ツールの構成) ボタンをクリックします。
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="VS Code の [Configure Tools] ボタン" style="width:60%;" >}}

1. リストで Datadog サーバーとツールを見つけ、チェックボックスをオンにして有効にします (必要に応じて展開または更新してください)。

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: /ja/bits_ai/mcp_server/

{{% /tab %}}

{{% tab "Cursor" %}}
拡張機能を IDE 内で直接、または Web からインストールします。

-   **Cursor 内**: 拡張機能ビューを開き (`Shift` + `Cmd/Ctrl` + `X`)、`datadog` を検索し、Datadog の公式拡張機能を選択します。

-   **Web から**: [Open VSX レジストリ][2] から VSIX ファイルをダウンロードし、Command Palette (`Shift` + `Cmd/Ctrl` + `P`) で `Extensions: Install from VSIX` を使用してインストールします。

### Datadog MCP Server の設定 {#datadog-mcp-server-setup}

Datadog プラグインをインストールして、[Datadog MCP サーバー][3] を有効にします。プラグインは、[Cursor Marketplace][4] から、または [**Cursor Settings** > **Plugins**] でインストールできます。

[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: /ja/bits_ai/mcp_server/setup/?tab=cursor
[4]: https://cursor.com/marketplace/datadog

{{% /tab %}}
{{< /tabs >}}

## コア機能 {#core-features}

### Logs {#logs}

**Logs** を使用して、コード内の特定のログ行によって生成されたログの数量を測定します。この拡張機能は、Datadog のログレコードに一致する検出されたログパターンについて、コードにアノテーションを追加します。

{{< img src="/ide_plugins/vscode/logs_navigation.mp4" alt="ログナビゲーションのプレビュー" style="width:100%" video=true >}}

詳細は、[ログ][20] サブセクションをご覧ください。

### Code Insights {#code-insights}

**Code Insights** は、ランタイムエラー、コードの脆弱性、不安定なテストなど、コードベースに関する Datadog 生成のインサイトを提供します。

{{< img src="/ide_plugins/vscode/code-insights-2.png" alt="Code Insights ビュー。" style="width:100%;" >}}

詳細は、[Code Insights][21] サブセクションをご覧ください。

### Code Security {#code-security}

[**Code Security**][19] 機能は、事前定義されたルールに照らしてローカルでコードを分析し、変更をコミットする前にセキュリティ上の問題や脆弱性を検出して修正します。

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="静的解析のプレビュー" style="width:100%" video=true >}}

詳細は、[Code Security][19] サブセクションをご覧ください。

### Exception Replay {#exception-replay}

**Exception Replay** を使用すると、Error Tracking コードインサイトのスタックトレースフレームを調べて、本番環境で実行されているコードの変数の値に関する情報を取得できます。

{{< img src="/ide_plugins/vscode/exception_replay.mp4" alt="Exception Replay のプレビュー" style="width:100%" video=true >}}

詳細は、[例外リプレイ][22] サブセクションをご覧ください。

### Live Debugger {#live-debugger}

**Live Debugger** を使用すると、実行中のサービスにログポイント (自動で期限切れになる、非破壊的なブレークポイント) を追加して、コードを再デプロイすることなくデバッグ用のランタイムデータをキャプチャできます。

{{< img src="/ide_plugins/vscode/live_debugger_overview.mp4" alt="Datadog の Live Debugger アクティビティの概要" style="width:100%" video=true >}}

詳細は、[ライブデバッガー][23] サブセクションをご覧ください。

## その他の機能 {#other-features}

### View in IDE {#view-in-ide}

<div class="alert alert-info">この機能は VS Code と Cursor のみで利用可能です。ほかの VS Code のフォークでは利用できません。</div>

**View in VS Code** または **View in Cursor** 機能は、Datadog からソースファイルへの直接リンクを提供します。これは、([Error Tracking][5] などの) UI に表示されるスタックトレースのフレームの横にあるボタンです。

{{< img src="/ide_plugins/vscode/view-in-vscode-2.png" alt="[View in VS Code] ボタンが表示されている Datadog のスタックトレース" style="width:100%;" >}}

この機能を使用して、インサイト (Error Tracking からのエラーなど) からソースファイルを開くこともできます。

{{< img src="/ide_plugins/vscode/view-in-vscode-error.png" alt="[View in VS Code] ボタンが表示されている、Datadog の Error Tracking の問題" style="width:100%;" >}}

<div class="alert alert-info">この機能を使用するには、まずご使用のサービスで<a href="/integrations/guide/source-code-integration/">ソースコードインテグレーション</a>を構成してください。</div>

### Fix in Chat {#fix-in-chat}

[**Fix in Chat**] ボタンは、拡張機能によってエラーや問題が特定された、複数のコンテキストで表示されます。このボタンをクリックすると、問題を要約し、関連する詳細やコンテキストを含め、エージェントに具体的な指示を与える AI チャットのプロンプトが生成されます。

{{< img src="/ide_plugins/vscode/cursor_fix_in_chat.mp4" alt="Fix in Chat を使用して、インラインコードエラーを修正する" style="width:100%" video=true >}}

## データとテレメトリ {#data-and-telemetry}

Datadog は、この IDE の利用状況に関する特定の情報 (IDE をどのように使用したか、IDE の使用中にエラーが発生したかどうか、それらのエラーの原因、ユーザー識別子など) を収集します。これらの情報は、[Datadog プライバシーポリシー][13] および Datadog の [VS Code 拡張機能 EULA][12] に準拠した形で取り扱われます。このデータは、拡張機能のパフォーマンスや機能の改善に利用されます。たとえば、拡張機能への遷移および拡張機能からの遷移や、サービスにアクセスするための Datadog ログインページなどがあります。

このデータを [Datadog][3] に送信したくない場合は、拡張機能の設定でいつでも無効にできます。[`Datadog > Telemetry > Setup > Enable Telemetry`] で [`disabled`] を選択してください。

<div class="alert alert-info">Datadog 拡張機能には、<a href="https://code.visualstudio.com/docs/configure/telemetry#_output-channel-for-telemetry-events">VS Code テレメトリ</a>設定も適用されます。</div>

## ヘルプとフィードバック {#help-and-feedback}

フィードバックを共有するには、[team-ide-integration@datadoghq.com][14] にメールを送るか、拡張機能の [公開リポジトリ][15] で問題を作成してください。

既知の問題について知るには、[問題][16] セクションを確認してください。

[カーソル][17] またはその他の VS Code のフォークをご使用の場合は、[Open VSX レジストリ][2] に拡張機能があります。

## ライセンス {#license}

この拡張機能をダウンロードまたは使用する前に、[エンドユーザー使用許諾契約書][12] をよくお読みください。

## 参考資料 {#further-reading}

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
[23]: /ja/ide_plugins/vscode/live_debugger/