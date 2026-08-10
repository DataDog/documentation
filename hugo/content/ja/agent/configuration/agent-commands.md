---
algolia:
  tags:
  - agent status command
aliases:
- /ja/agent/faq/agent-status-and-information
- /ja/agent/faq/start-stop-restart-the-datadog-agent
- /ja/agent/faq/agent-commands
- /ja/agent/guide/agent-commands
description: Datadog Agent の起動、停止、トラブルシューティング、および管理に関する完全なリファレンスです。
further_reading:
- link: /agent/troubleshooting/
  tag: ドキュメント
  text: Agent のトラブルシューティング
title: Agent のコマンド
---
<div class="alert alert-danger">
Linux ベースのシステムで <code>service</code> ラッパーコマンドが利用できない場合は、<a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">代替リストをご参照ください</a>。
</div>

## Agent の起動/停止/再起動 {#start-stop-and-restart-the-agent}

### Agent の起動 {#start-the-agent}

Datadog Agent を起動するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux           | ご使用の OS に対応する [Agent documentation][1] を参照してください。                     |
| Docker     | [installation command][2] を使用します。                                |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` * または * システムトレイアプリを通じた |
| ソース     | `sudo service datadog-agent start`                                 |
| Windows    | [Windows Agent documentation][3] を参照してください。                         |

### Agent を停止します {#stop-the-agent}

Datadog Agent を停止するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux           | ご使用の OS に対応する [Agent documentation][1] を参照してください。                                   |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`注意: Pod は自動的に再スケジュールされます |
| macOS      | `launchctl stop com.datadoghq.agent` * またはシステムトレイアプリを通じた*                |
| ソース     | `sudo service datadog-agent stop`                                                |
| Windows    | [Windows Agent documentation][3] を参照してください。                                       |

### Agent を再起動します {#restart-the-agent}

Datadog Agent を再起動するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux           | ご使用の OS に対応する [Agent documentation][1] を参照してください。                                   |
| Docker     | [installation command][2] を使用します。                                              |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`注意: Pod は自動的に再スケジュールされます |
| macOS      | Agent を停止してから、次のコマンドで起動:<br>`launchctl stop com.datadoghq.agent`<br>`launchctl start com.datadoghq.agent`<br>または、システムトレイアプリを使用 |
| ソース     | *サポートされないプラットフォーム*                                                           |
| Windows    | [Windows Agent documentation][3] を参照してください。                                       |


## Agent のステータスと情報 {#agent-status-and-information}

### サービスのステータス {#service-status}

Datadog Agent のステータスを表示するためのコマンドを以下に示します。

| プラットフォーム        | コマンド                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | ご使用の OS に対応する [Agent documentation][1] を参照してください。                                |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS      | `launchctl list com.datadoghq.agent` システムアプリを通じた * または *                |
| ソース     | `sudo service datadog-agent status`                                           |
| Windows    | [Windows Agent documentation][4] を参照してください。                                    |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`                                     |

### Agent の情報 {#agent-information}

Datadog Agent と有効なインテグレーションのステータスを表示するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` または [web GUI][6] を通じて |
| ソース     | `sudo datadog-agent status`                          |
| Windows    | [Windows Agent documentation][4] を参照してください。           |
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

## その他のコマンド {#other-commands}

Agent のコマンドラインインターフェースはサブコマンドベースです。利用可能なサブコマンドのリストを表示するには、次のコマンドを実行してください:

```shell
<AGENT_BINARY> --help
```

サブコマンドを実行するには、Agent バイナリを呼び出す必要があります:

```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

いくつかのオプションには、`--help` の下に詳細なフラグとオプションがあります。たとえば、`check` サブコマンドのヘルプを表示します。

```shell
<AGENT_BINARY> check --help
```

| サブコマンド        | 備考                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | 指定されたチェックを実行します。                                                   |
| `config`          | [ランタイム構成管理][7]。                                     |
| `configcheck`     | 実行中の Agent のうちロード済みかつ解決済みの構成をすべて出力します。             |
| `diagnose`        | システムで接続診断を実行します。                             |
| `flare`           | [フレアを収集して Datadog に送信][8]。                               |
| `health`          | 現在の Agent の状態を出力します。                                            |
| `help`            | 任意のコマンドのヘルプ。                                                    |
| `hostname`        | Agent が使用するホスト名を出力します。                                      |
| `import`          | 以前のバージョンの Agent から構成ファイルをインポートして変換します。|
| `jmx`             | JMX トラブルシューティング。                                                       |
| `launch-gui`      | Datadog Agent GUI を起動します。                                               |
| `restart-service` | サービスコントロールマネージャー内で Agent を再起動します。Windows のみ。        |
| `start-service`   | サービスコントロールマネージャー内で Agent を起動します。Windows のみ。          |
| `stream-logs`     | 実行中の Agent が処理しているログをストリーミングします。                        |
| `stopservice`     | サービスコントロールマネージャー内で Agent を停止します。Windows のみ。           |
| `version`         | バージョン情報を出力します。                                                        |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: /ja/agent/docker/
[3]: /ja/agent/basic_agent_usage/windows/
[4]: /ja/agent/basic_agent_usage/windows/#status-and-information
[5]: /ja/containers/cluster_agent/
[6]: /ja/agent/basic_agent_usage/#gui
[7]: /ja/agent/troubleshooting/config/
[8]: /ja/agent/troubleshooting/send_a_flare/