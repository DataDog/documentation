---
algolia:
  tags:
  - Agent status コマンド
aliases:
- /ja/agent/faq/agent-status-and-information
- /ja/agent/faq/start-stop-restart-the-datadog-agent
- /ja/agent/faq/agent-commands
- /ja/agent/guide/agent-commands
further_reading:
- link: /agent/troubleshooting/
  tag: ドキュメント
  text: Agent のトラブルシューティング
title: Agent のコマンド
---

<div class="alert alert-danger">
<code>service</code> ラッパーコマンドを使用できない Linux ベースのシステムをご使用の場合は、<a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">代替リストを参照してください</a>。
</div>

## Agent の起動/停止/再起動

### Agent の起動

Datadog Agent を起動するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | OS については、[Agent に関するドキュメント][1]をご参照ください。                      |
| Docker     | [インストールコマンド][2]を使用します。                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *または* systray アプリを使用 |
| ソース     | `sudo service datadog-agent start`                                 |
| Windows    | [Windows Agent ドキュメントを参照してください][3]。                          |

### Agent の停止

Datadog Agent を停止するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | OS については、[Agent に関するドキュメント][1]をご参照ください。                                    |
| Docker     | `docker exec -it <コンテナ名> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—注: ポッドは自動的にリスケジュールされます |
| macOS      | `launchctl stop com.datadoghq.agent` *または* systray アプリを使用                |
| ソース     | `sudo service datadog-agent stop`                                                |
| Windows    | [Windows Agent ドキュメントを参照してください][3]。                                        |

### Agent を再起動します。

Datadog Agent を再起動するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | OS については、[Agent に関するドキュメント][1]をご参照ください。                                    |
| Docker     | [インストールコマンド][2]を使用します。                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—注: ポッドは自動的にリスケジュールされます |
| macOS      | 以下で Agent を停止し、起動します。<br>`launchctl stop com.datadoghq.agent`<br>`launchctl start com.datadoghq.agent`<br>または systray アプリを使用します |
| ソース     | サポートされないプラットフォーム                                                           |
| Windows    | [Windows Agent ドキュメントを参照してください][3]。                                        |


## Agent のステータスと情報

### サービスのステータス

Datadog Agent のステータスを表示するためのコマンドを以下に示します。

| プラットフォーム        | コマンド                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | OS については、[Agent に関するドキュメント][1]をご参照ください。                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *または* systray アプリを使用             |
| ソース          | `sudo service datadog-agent status`                                           |
| Windows         | [Windows Agent ドキュメント][4] を参照してください。                                     |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`                                     |

### Agent の情報

Datadog Agent と有効なインテグレーションのステータスを表示するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` または [Web GUI][6] から   |
| ソース     | `sudo datadog-agent status`                          |
| Windows    | [Windows Agent ドキュメント][4] を参照してください。            |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`       |

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

## その他のコマンド

Agent のコマンドライン インターフェイスはサブコマンド ベースです。利用可能なサブコマンドの一覧を表示するには、次を実行します:
```shell
<エージェント_バイナリ> --help
```

サブコマンドを実行するには、Agent バイナリを呼び出す必要があります:
```shell
<エージェントバイナリ> <サブコマンド> <オプション>
```

一部のオプションにはフラグとオプションがあり、`--help` で詳細に説明されています。たとえば、`check` サブコマンドのヘルプを使用するには、次を実行します。
```shell
<エージェント_バイナリ> check --help
```

| サブコマンド        | 注                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | 指定されたチェックを実行します。                                                    |
| `config`          | [ランタイム構成管理][7]。                                      |
| `configcheck`     | 実行中の Agent のうち、ロード済みで解決済みの構成をすべて出力します。              |
| `diagnose`        | システムに対して接続診断を実行します。                              |
| `flare`           | [フレアを収集して Datadog に送信][8]。                                |
| `health`          | 現在の Agent の状態を出力します。                                             |
| `help`            | 任意のコマンドのヘルプ。                                                     |
| `hostname`        | Agent が使用するホスト名を出力します。                                       |
| `import`          | 以前のバージョンの Agent から構成ファイルをインポートして変換します。 |
| `jmx`             | JMX トラブルシューティング。                                                        |
| `launch-gui`      | Datadog Agent GUI を起動します。                                                |
| `restart-service` | サービスコントロールマネージャー内で Agent を再起動します。Windows のみです。         |
| `start-service`   | サービスコントロールマネージャー内で Agent を起動します。Windows のみです。           |
| `stream-logs`     | 実行中の Agent が処理するログをストリーミング表示します。                         |
| `stopservice`     | サービスコントロールマネージャー内で Agent を停止します。Windows のみです。            |
| `version`         | バージョン情報を出力します。                                                         |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: /ja/agent/docker/
[3]: /ja/agent/basic_agent_usage/windows/
[4]: /ja/agent/basic_agent_usage/windows/#status-and-information
[5]: /ja/containers/cluster_agent/
[6]: /ja/agent/basic_agent_usage/#gui
[7]: /ja/agent/troubleshooting/config/
[8]: /ja/agent/troubleshooting/send_a_flare/