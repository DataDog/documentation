---
algolia:
  tags:
  - agent status command
aliases:
- /ja/agent/faq/agent-status-and-information
- /ja/agent/faq/start-stop-restart-the-datadog-agent
- /ja/agent/faq/agent-commands
- /ja/agent/guide/agent-commands
description: Datadog Agent のコマンドに関する完全なリファレンスで、エージェントの起動、停止、トラブルシューティング、および管理を行います。
further_reading:
- link: /agent/troubleshooting/
  tag: よくあるご質問
  text: Agent のトラブルシューティング
title: Agent のコマンド
---
<div class="alert alert-danger">
<code>service</code> ラッパーコマンドが利用できない Linux ベースのシステムでは、<a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">代替リストを参照してください</a>。
</div>

Agent の起動/停止/再起動

Agent を起動します。

Datadog Agent を起動するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                            |
|------------|--------------------------------------------------------------------|
AIX
| Linux      | ご使用の OS に対応する [Agent に関するドキュメント][1]を参照してください。                     |
| Docker     | [インストールコマンド][2]を使用します。                                |
kubernetes
| macOS      | `launchctl start com.datadoghq.agent` *または* システムトレイアプリを通じて |
`source`
| Windows    | [Windows Agent ドキュメント][3]を参照してください。                         |

Agent の停止

Datadog Agent を停止するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                                          |
|------------|----------------------------------------------------------------------------------|
AIX
| Linux      | ご使用の OS に対応する [Agent に関するドキュメント][1]を参照してください。                                   |
Docker
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—注意: ポッドは自動的に再スケジュールされます |
| macOS      | `launchctl stop com.datadoghq.agent` *または* システムトレイアプリを通じて                |
`source`
| Windows    | [Windows Agent ドキュメント][3]を参照してください。                                       |

Agent を再起動します。

Datadog Agent を再起動するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | ご使用の OS に対応する [Agent に関するドキュメント][1]を参照してください。                                   |
| Docker     | [インストールコマンド][2]を使用します。                                              |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—注意: ポッドは自動的に再スケジュールされます |
| macOS      | エージェントを停止してから、次のコマンドで再起動します:<br>`launchctl stop com.datadoghq.agent`<br>`launchctl start com.datadoghq.agent`<br>またはシステムトレイアプリを使用します |
| ソース     サポートされないプラットフォーム*                                                           |
| Windows    | [Windows Agent ドキュメント][3]を参照してください。                                       |


Agent のステータスと情報

サービスのステータス

Datadog Agent のステータスを表示するためのコマンドを以下に示します。

| プラットフォーム        | コマンド                                                                       |
|-----------------|-------------------------------------------------------------------------------|
AIX
| Linux           | ご使用の OS に対応する [Agent に関するドキュメント][1]をご参照ください。                                |
Docker (Debian)
kubernetes
| macOS           | `launchctl list com.datadoghq.agent` *または* システムトレイアプリを通じて             |
`source`
| Windows         | [Windows Agent ドキュメント][4] を参照してください。                                    |
[Cluster Agent (Kubernetes)][5]

Agent の情報

Datadog Agent と有効なインテグレーションのステータスを表示するためのコマンドを以下に示します。

|プラットフォーム   | コマンド                                              |
|------------|------------------------------------------------------|
AIX
Linux
Docker
kubernetes
| macOS      | `datadog-agent status` または [ウェブ GUI][6] を通じて   |
`source`
| Windows    | [Windows Agent ドキュメント][4] を参照してください。           |
[Cluster Agent (Kubernetes)][5]

以下に示すように、適切に構成されたインテグレーションは、**Running Checks** の下に警告やエラーなしで表示されます。

```text
Running Checks
==============
  network (1.6.0)
  ---------------
    Total Runs: 5
    Metric Samples: 26, Total: 130
    Events: 0, Total: 0
    Service Checks: 0, Total: 0
    Average Execution Time : 0ms
```

その他のコマンド

エージェントのコマンドラインインターフェースはサブコマンドベースです。使用可能なサブコマンドのリストを表示するには、次のコマンドを実行してください:

```shell
<AGENT_BINARY> --help
```

サブコマンドを実行するには、Agent バイナリを呼び出す必要があります:

```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

いくつかのオプションには、`--help` の下に詳細が記載されたフラグとオプションがあります。例えば、`check` サブコマンドにヘルプを使用するには:

```shell
<AGENT_BINARY> check --help
```

| サブコマンド        | ノート                                                                       |
|-------------------|-----------------------------------------------------------------------------|
指定されたチェックを実行します。                                                   |
[ランタイム構成管理][7]。                                     |
実行中の Agent のうちロード済みかつ解決済みの構成をすべて出力します             |
システムで接続診断を実行します。                             |
[フレアを収集して Datadog に送信][8]。                               |
現在の Agent の状態を出力します。                                            |
任意のコマンドのヘルプ。                                                    |
Agent が使用するホスト名を出力します。                                      |
以前のバージョンの Agent から構成ファイルをインポートして変換します。|
JMX トラブルシューティング。                                                       |
Datadog Agent GUI を起動します。                                               |
サービスコントロールマネージャー内で Agent を再起動します。Windows のみ。        |
サービスコントロールマネージャー内で Agent を起動します。Windows のみ。          |
実行中の Agent が処理するログをストリーミング表示します。                        |
サービスコントロールマネージャー内で Agent を停止します。Windows のみ。           |
バージョン情報を出力します。                                                        |

参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: /ja/agent/docker/
[3]: /ja/agent/basic_agent_usage/windows/
[4]: /ja/agent/basic_agent_usage/windows/#status-and-information
[5]: /ja/containers/cluster_agent/
[6]: /ja/agent/basic_agent_usage/#gui
[7]: /ja/agent/troubleshooting/config/
[8]: /ja/agent/troubleshooting/send_a_flare/