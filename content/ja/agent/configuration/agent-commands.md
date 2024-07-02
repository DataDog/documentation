---
title: Agent Commands
aliases:
    - /agent/faq/agent-status-and-information
    - /agent/faq/start-stop-restart-the-datadog-agent
    - /agent/faq/agent-commands
    - /agent/guide/agent-commands
further_reading:
- link: /agent/troubleshooting/
  tag: Documentation
  text: Agent Troubleshooting
algolia:
  tags: [agent status command]
---

<div class="alert alert-warning">
<code>service</code> ラッパーコマンドを使用できない Linux ベースのシステムをご使用の場合は、<a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">代替リストを参照してください</a>。
</div>

## Agent の起動/停止/再起動

### Agent の起動

Datadog Agent を起動するためのコマンドを以下に示します。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| プラットフォーム   | コマンド                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | OS については、[Agent に関するドキュメント][1]をご参照ください。                      |
| Docker     | [インストールコマンド][2]を使用します。                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *または* systray アプリを使用 |
| ソース     | `sudo service datadog-agent start`                                 |
| Windows    | [Windows Agent ドキュメントを参照してください][3]。                          |

[1]: /agent/
[2]: /agent/docker/
[3]: /agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム | コマンド                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent start`        |
| Docker   | [Docker Agent ドキュメントを参照してください][1]。  |
| macOS    | `/usr/local/bin/datadog-agent start`      |
| ソース   | `sudo ~/.datadog-agent/bin/agent start`   |
| Windows  | [Windows Agent ドキュメントを参照してください][2]。 |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

### Agent の停止

Datadog Agent を停止するためのコマンドを以下に示します。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| プラットフォーム   | コマンド                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | OS については、[Agent に関するドキュメント][1]をご参照ください。                                    |
| Docker     | `docker exec -it <コンテナ名> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—注: ポッドは自動的にリスケジュールされます |
| macOS      | `launchctl stop com.datadoghq.agent` *または* systray アプリを使用                |
| ソース     | `sudo service datadog-agent stop`                                                |
| Windows    | [Windows Agent ドキュメントを参照してください][2]。                                        |

[1]: /agent/
[2]: /agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム | コマンド                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent stop`         |
| Docker   | [Docker Agent ドキュメントを参照してください][1]。  |
| macOS    | `/usr/local/bin/datadog-agent stop`       |
| ソース   | `sudo ~/.datadog-agent/bin/agent stop`    |
| Windows  | [Windows Agent ドキュメントを参照してください][2]。 |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

### Agent を再起動します。

Datadog Agent を再起動するためのコマンドを以下に示します。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| プラットフォーム   | コマンド                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | OS については、[Agent に関するドキュメント][1]をご参照ください。                                    |
| Docker     | [インストールコマンド][2]を使用します。                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—注: ポッドは自動的にリスケジュールされます |
| macOS      | `stop` を実行後 `start` を実行。*または* systray アプリを使用                            |
| ソース     | サポートされないプラットフォーム                                                           |
| Windows    | [Windows Agent ドキュメントを参照してください][3]。                                        |

[1]: /agent/
[2]: /agent/docker/?tab=standard#setup
[3]: /agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム | コマンド                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent restart`      |
| Docker   | [Docker Agent ドキュメントを参照してください][1]。  |
| macOS    | `/usr/local/bin/datadog-agent restart`    |
| ソース   | `sudo ~/.datadog-agent/bin/agent restart` |
| Windows  | [Windows Agent ドキュメントを参照してください][2]。 |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

## Agent のステータスと情報

### サービスのステータス

Datadog Agent のステータスを表示するためのコマンドを以下に示します。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| プラットフォーム        | コマンド                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | OS については、[Agent に関するドキュメント][1]をご参照ください。                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *または* systray アプリを使用             |
| ソース          | `sudo service datadog-agent status`                                           |
| Windows         | [Windows Agent ドキュメントを参照してください][2]。                                     |


[1]: /agent/
[2]: /agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム        | コマンド                                                                  |
|-----------------|--------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                      |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent status` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent status`        |
| macOS           | `datadog-agent status`                                                   |
| ソース          | `sudo ~/.datadog-agent/bin/agent status`                                 |
| Windows         | [Windows Agent ドキュメントを参照してください][1]。                                |

[1]: /agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Cluster Agent" %}}

| プラットフォーム   | コマンド                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

### Agent の情報

Datadog Agent と有効なインテグレーションのステータスを表示するためのコマンドを以下に示します。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| プラットフォーム   | コマンド                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` または [Web GUI][1] を使用   |
| ソース     | `sudo datadog-agent status`                          |
| Windows    | [Windows Agent ドキュメントを参照してください][2]。            |

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

[1]: /agent/basic_agent_usage/#gui
[2]: /agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム   | コマンド                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent info`        |
| macOS      | `datadog-agent info`                                                   |
| ソース     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | [Windows Agent ドキュメントを参照してください][1]。                              |

以下に示すように、適切に構成されたインテグレーションは、**Checks** の下に警告やエラーなしで表示されます。

```text
Checks
======
 network
 -------
   - instance #0 [OK]
   - Collected 15 metrics, 0 events & 1 service check
```

[1]: /agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Cluster Agent" %}}

| プラットフォーム   | コマンド                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

## その他のコマンド

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

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
| `config`          | [ランタイムコンフィギュレーション管理][1]。                                      |
| `configcheck`     | 実行中の Agent のうち、ロード済みで解決済みの構成をすべて出力します。              |
| `diagnose`        | システムに対して接続診断を実行します。                              |
| `flare`           | [フレアを収集して Datadog に送信します][2]。                                |
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

[1]: /agent/troubleshooting/config/
[2]: /agent/troubleshooting/send_a_flare/
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
