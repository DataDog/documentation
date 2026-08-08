---
disable_toc: false
title: Agent 5 のコマンド
---

## 概要

このページでは、Agent 5 のコマンドについて説明します。Datadog では、最新の機能を利用するために、Agent 7 のインストールまたはアップグレードを推奨しています。Agent の最新バージョンのインストールについては、[Agent 7 のインストール手順][1]に従ってください。以前のバージョンから Agent 7 へのアップグレードについては、[Datadog Agent v7 へのアップグレード][2]を参照してください。

**注**: ご使用のシステムで `service` ラッパーを使用できない場合は、以下を使用してください。

* `upstart` ベースのシステムの場合: `sudo start/stop/restart/status datadog-agent`
* `systemd` ベースのシステムの場合: `sudo systemctl start/stop/restart/status datadog-agent`


## Agent の起動/停止/再起動

### Agent の起動

Datadog Agent を起動するためのコマンドを以下に示します。

| プラットフォーム | コマンド                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent start`        |
| Docker   | [Docker Agent のドキュメントを参照してください][3]。  |
| macOS    | `/usr/local/bin/datadog-agent start`      |
| ソース   | `sudo ~/.datadog-agent/bin/agent start`   |
| Windows  | [Windows のコマンド](#windows-commands)を参照してください。 |

### Agent の停止

Datadog Agent を停止するためのコマンドを以下に示します。

| プラットフォーム | コマンド                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent stop`         |
| Docker   | [Docker Agent ドキュメントを参照してください][3]。  |
| macOS    | `/usr/local/bin/datadog-agent stop`       |
| ソース   | `sudo ~/.datadog-agent/bin/agent stop`    |
| Windows  | [Windows のコマンド](#windows-commands)を参照してください。 |

### Agent を再起動します。

Datadog Agent を再起動するためのコマンドを以下に示します。

| プラットフォーム | コマンド                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent restart`      |
| Docker   | [Docker Agent ドキュメントを参照してください][3]。  |
| macOS    | `/usr/local/bin/datadog-agent restart`    |
| ソース   | `sudo ~/.datadog-agent/bin/agent restart` |
| Windows  | [Windows のコマンド](#windows-commands)を参照してください。 |

## Agent のステータスと情報

### サービスのステータス

Datadog Agent のステータスを表示するためのコマンドを以下に示します。

| プラットフォーム        | コマンド                                                                  |
|-----------------|--------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                      |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent status` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent status`        |
| macOS           | `datadog-agent status`                                                   |
| ソース          | `sudo ~/.datadog-agent/bin/agent status`                                 |
| Windows         | [Windows のコマンド](#windows-commands)を参照してください。                               |

### Agent の情報

Datadog Agent と有効なインテグレーションのステータスを表示するためのコマンドを以下に示します。

| プラットフォーム   | コマンド                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent info`        |
| macOS      | `datadog-agent info`                                                   |
| ソース     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | [Windows のコマンド](#windows-commands)を参照してください。                             |

以下に示すように、適切に構成されたインテグレーションは、**Checks** の下に警告やエラーなしで表示されます。

```text
Checks
======
 network
 -------
   - instance #0 [OK]
   - Collected 15 metrics, 0 events & 1 service check
```

### Windows のステータス情報

Agent が実行されていることを確認するには、サービスパネルでサービスのステータスが "Started" になっているかどうかをチェックします。また、`ddagent.exe` というプロセスがタスクマネージャーに存在している必要があります。

Agent v5.2+ では、Agent の状態に関する情報は、
Datadog Agent Manager -> Settings -> Agent Status で確認できます。

{{< img src="agent/faq/windows_status.png" alt="Windows ステータス" style="width:50%;" >}}

Agent v3.9.1 ～ v5.1 のステータスを確認する場合は、`http://localhost:17125/status` に移動します。

PowerShell では、次の info コマンドを使用できます。

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" info
```

cmd.exe では、次のようにします。

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" info
```

## Windows のコマンド

(スタートメニューにある) Datadog Agent Manager を使用します。

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="Windows のスタートメニュー" style="width:75%;">}}

Datadog Agent Manager で `start`、`stop`、および `restart` コマンドを使用します。

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Manager のスナップショット" style="width:75%;">}}

Windows PowerShell で、次のコマンドを使用することもできます。
`[start|stop|restart]-service datadogagent`


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ja/agent/versions/upgrade_to_agent_v7/
[3]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md