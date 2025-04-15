---
disable_toc: false
title: Agent 6 のコマンド
---

## 概要

このページでは、Agent 6 のコマンドについて説明します。Datadog では、最新の機能を利用するために、Agent 7 のインストールまたはアップグレードを推奨しています。Agent の最新バージョンのインストールについては、[Agent 7 のインストール手順][1]に従ってください。以前のバージョンから Agent 7 へのアップグレードについては、[Datadog Agent v7 へのアップグレード][2]を参照してください。

## Agent の起動/停止/再起動

### Agent の起動

Datadog Agent を起動するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | ご使用の OS に対応する [Agent に関するドキュメント][1]を参照してください。                      |
| Docker     | [インストールコマンド][4]を使用します。                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *または* systray アプリを使用 |
| ソース     | `sudo service datadog-agent start`                                 |
| Windows    | [Windows Agent に関するドキュメント][5]を参照してください。                          |

### Agent の停止

Datadog Agent を停止するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | ご使用の OS に対応する [Agent に関するドキュメント][1]を参照してください。                                    |
| Docker     | `docker exec -it <コンテナ名> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—注: ポッドは自動的にリスケジュールされます |
| macOS      | `launchctl stop com.datadoghq.agent` *または* systray アプリを使用                |
| ソース     | `sudo service datadog-agent stop`                                                |
| Windows    | [Windows Agent ドキュメントを参照してください][5]。                                        |

### Agent を再起動します。

Datadog Agent を再起動するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | ご使用の OS に対応する [Agent に関するドキュメント][1]を参照してください。                                    |
| Docker     | [インストールコマンド][4]を使用します。                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—注: ポッドは自動的にリスケジュールされます |
| macOS      | `stop` を実行後 `start` を実行。*または* systray アプリを使用                            |
| ソース     | サポートされないプラットフォーム                                                           |
| Windows    | [Windows Agent ドキュメントを参照してください][3]。                                        |

## Agent のステータスと情報

### サービスのステータス

Datadog Agent のステータスを表示するためのコマンドを以下に示します。

| プラットフォーム        | コマンド                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | ご使用の OS に対応する [Agent に関するドキュメント][1]を参照してください。                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *または* systray アプリを使用             |
| ソース          | `sudo service datadog-agent status`                                           |
| Windows         | [Windows Agent ドキュメントを参照してください][5]。                                     |

### Agent の情報

Datadog Agent と有効なインテグレーションのステータスを表示するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` または [Web GUI][7] を使用   |
| ソース     | `sudo datadog-agent status`                          |
| Windows    | [Windows Agent ドキュメントを参照してください][5]。            |

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

Agent v6 のコマンドラインインターフェイスは、サブコマンドベースです。利用可能なサブコマンドのリストを確認するには、次を実行します:
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
| `config`          | [ランタイムコンフィギュレーション管理][8]。                                      |
| `configcheck`     | 実行中の Agent のうち、ロード済みで解決済みの構成をすべて出力します。              |
| `diagnose`        | システムに対して接続診断を実行します。                              |
| `flare`           | [フレアを収集して Datadog に送信します][9]。                                |
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

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ja/agent/versions/upgrade_to_agent_v7/
[3]: /ja/agent/
[4]: /ja/agent/docker/
[5]: /ja/agent/basic_agent_usage/windows/
[6]: /ja/agent/docker/?tab=standard#setup
[7]: /ja/agent/basic_agent_usage/#gui
[8]: /ja/agent/troubleshooting/config/
[9]: /ja/agent/troubleshooting/send_a_flare/