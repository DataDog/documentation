---
disable_toc: false
private: true
title: Agent 6 のコマンド
---
## 概要 {#overview}

このページでは、Agent 6 のコマンドについて説明します。Datadog では、最新の機能を利用するために、Agent 7 をインストールするか、Agent 7 にアップグレードすることを推奨しています。Agent の最新バージョンのインストールについて詳しくは、[Agent 7 のインストール手順][1]を参照してください。以前のバージョンから Agent 7 にアップグレードする方法については、[Datadog Agent v7 へのアップグレード][2]を参照してください。

## Agent の起動/停止/再起動 {#start-stop-and-restart-the-agent}

### Agent の起動 {#start-the-agent}

Datadog Agent を起動するためのコマンドのリスト:

| プラットフォーム   | コマンド                                                            |
|------------|--------------------------------------------------------------------|
| Linux      | ご使用の OS に対応する [Agent ドキュメント][3]を参照してください。                     |
| Docker     | [インストールコマンド][4]を使用します。                                |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *または*システムトレイアプリ経由 |
| ソース     | `sudo service datadog-agent start`                                 |
| Windows    | [Windows Agent ドキュメント][5]を参照してください。                         |

### Agent を停止する {#stop-the-agent}

Datadog Agent を停止するためのコマンドのリスト:

| プラットフォーム   | コマンド                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | ご使用の OS に対応する [Agent ドキュメント][3]を参照してください。                                   |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`注: Pod は自動的に再スケジュールされます |
| macOS      | `launchctl stop com.datadoghq.agent` * または*システムトレイアプリ経由                |
| ソース     | `sudo service datadog-agent stop`                                                |
| Windows    | [Windows Agent ドキュメント][5]を参照してください。                                       |

### Agent を再起動する{#restart-the-agent}

Datadog Agent を再起動するためのコマンドのリスト:

| プラットフォーム   | コマンド                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | ご使用の OS に対応する [Agent ドキュメント][3]を参照してください。                                   |
| Docker     | [インストールコマンド][4]を使用します。                                              |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`注: Pod は自動的に再スケジュールされます |
| macOS      | `stop`、`start` を実行、*または*システムトレイアプリ経由                            |
| ソース     | *サポートされないプラットフォーム*                                                           |
| Windows    | [Windows Agent ドキュメント][3]を参照してください。                                       |

## Agent のステータスと情報 {#agent-status-and-information}

### サービスステータス {#service-status}

Datadog Agent のステータスを表示するためのコマンドのリスト:

| プラットフォーム        | コマンド                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| Linux           | ご使用の OS に対応する [Agent ドキュメント][3]を参照してください。                                |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *または*システムアプリ経由                |
| ソース          | `sudo service datadog-agent status`                                           |
| Windows         | [Windows Agent ドキュメント][5]を参照してください。                                    |

### Agent の情報 {#agent-information}

Datadog Agent と有効なインテグレーションのステータスを表示するためのコマンドのリスト:

| プラットフォーム   | コマンド                                              |
|------------|------------------------------------------------------|
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` または[ウェブ GUI][7] 経由   |
| ソース     | `sudo datadog-agent status`                          |
| Windows    | [Windows Agent ドキュメント][5]を参照してください。           |

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

Agent v6 のコマンドラインインターフェースはサブコマンドベースです。利用可能なサブコマンドのリストを表示するには、次のコマンドを実行してください。

```shell
<AGENT_BINARY> --help
```

サブコマンドを実行するには、Agent バイナリを呼び出す必要があります。

```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

いくつかのオプションには、`--help` の下に詳細なフラグとオプションがあります。たとえば、`check` サブコマンドのヘルプを表示します。

```shell
<AGENT_BINARY> check --help
```

| サブコマンド        | メモ                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | 指定されたチェックを実行します。                                                   |
| `config`          | [ランタイム構成管理][8]。                                     |
| `configcheck`     | 実行中の Agent のうちロード済みかつ解決済みの構成をすべて出力します。             |
| `diagnose`        | システムで接続診断を実行します。                             |
| `flare`           | [フレアを収集して Datadog に送信します][9]。                               |
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
| `version`         | バージョン情報を出力します。                                                         |

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ja/agent/versions/upgrade_to_agent_v7/
[3]: /ja/agent/
[4]: /ja/agent/docker/
[5]: /ja/agent/basic_agent_usage/windows/
[6]: /ja/agent/docker/?tab=standard#setup
[7]: /ja/agent/basic_agent_usage/#gui
[8]: /ja/agent/troubleshooting/config/
[9]: /ja/agent/troubleshooting/send_a_flare/