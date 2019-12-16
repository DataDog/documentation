---
title: Agent のコマンド
kind: ガイド
aliases:
  - /ja/agent/faq/agent-status-and-information
  - /ja/agent/faq/start-stop-restart-the-datadog-agent
  - /ja/agent/faq/agent-commands
further_reading:
  - link: /agent/troubleshooting
    tag: Documentation
    text: Agent のトラブルシューティング
---
<div class="alert alert-warning">
<code>service</code> ラッパーコマンドを使用できない Linux ベースのシステムをご使用の場合は、<a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">代替リストを参照してください</a>。
</div>

## Agent の起動/停止/再起動

### Agent の起動

Datadog Agent を起動するためのコマンドを以下に示します。

{{< tabs >}}
{{% tab "Agent v6" %}}

| プラットフォーム   | コマンド                                                        |
| ---------- | --------------------------                                     |
| AIX        | `startsrc -s datadog-agent`                                    |
| Linux      | `sudo service datadog-agent start`                             |
| Docker     | [Docker ドキュメント][1]を参照してください。                    |
| macOS      | `launchctl start com.datadoghq.agent` または systray アプリを使用 |
| Source     | `sudo service datadog-agent start`                             |
| Windows    | [Windows ドキュメント][2]を参照してください。                   |


[1]: /ja/agent/docker
[2]: /ja/agent/basic_agent_usage/windows
{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム | コマンド                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent start`           |
| Docker   | [Docker ドキュメント][1]を参照してください。  |
| macOS    | `/usr/local/bin/datadog-agent start`         |
| Source   | `sudo ~/.datadog-agent/bin/agent start`      |
| Windows  | [Windows ドキュメント][2]を参照してください。 |


[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /ja/agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

### Agent の停止

Datadog Agent を停止するためのコマンドを以下に示します。

{{< tabs >}}
{{% tab "Agent v6" %}}

| プラットフォーム   | コマンド                                                       |
| ---------- | ---------------------------------------------                 |
| AIX        | `stopsrc -s datadog-agent`                                    |
| Linux      | `sudo service datadog-agent stop`                             |
| Docker     | [Docker ドキュメント][1]を参照してください。                   |
| macOS      | `launchctl stop com.datadoghq.agent` または systray アプリを使用 |
| Source     | `sudo service datadog-agent stop`                             |
| Windows    | [Windows ドキュメント][2]を参照してください。                  |


[1]: /ja/agent/docker
[2]: /ja/agent/basic_agent_usage/windows
{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム | コマンド                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent stop`            |
| Docker   | [Docker ドキュメント][1]を参照してください。  |
| macOS    | `/usr/local/bin/datadog-agent stop`          |
| Source   | `sudo ~/.datadog-agent/bin/agent stop`       |
| Windows  | [Windows ドキュメント][2]を参照してください。 |


[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /ja/agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

### Agent の再起動

Datadog Agent を再起動するためのコマンドを以下に示します。

{{< tabs >}}
{{% tab "Agent v6" %}}

| プラットフォーム | コマンド                                           |
|----------|---------------------------------------------------|
| Linux    | `sudo service datadog-agent restart`              |
| Docker   | [Docker ドキュメント][1]を参照してください。       |
| macOS    | `stop` を実行後 `start` を実行。または systray アプリを使用 |
| Source   | サポートされないプラットフォーム                            |
| Windows  | [Windows ドキュメント][2]を参照してください。      |


[1]: /ja/agent/docker
[2]: /ja/agent/basic_agent_usage/windows
{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム | コマンド                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent restart`         |
| Docker   | [Docker ドキュメント][1]を参照してください。  |
| macOS    | `/usr/local/bin/datadog-agent restart`       |
| Source   | `sudo ~/.datadog-agent/bin/agent restart`    |
| Windows  | [Windows ドキュメント][2]を参照してください。 |


[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /ja/agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

## Agent のステータスと情報

### サービスのステータス

Datadog Agent のステータスを表示するためのコマンドを以下に示します。

{{< tabs >}}
{{% tab "Agent v6" %}}

| プラットフォーム          | コマンド                                                                       |
| ----------------- | ---------------------------------------------------------                     |
| AIX               | `lssrc -s datadog-agent`                                                      |
| Linux             | `sudo service datadog-agent status`                                           |
| Docker (Debian)   | `sudo docker exec -it <container_name> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes        | `kubectl exec -it <pod-name> s6-svstat /var/run/s6/services/agent/`           |
| macOS             | `launchctl list com.datadoghq.agent` または systray アプリを使用                 |
| Source            | `sudo service datadog-agent status`                                           |


{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム        | コマンド                                                                  |
|-----------------|--------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                      |
| Docker (Debian) | `sudo docker exec -it <container_name> /etc/init.d/datadog-agent status` |
| Kubernetes      | `kubectl exec -it <pod-name> /etc/init.d/datadog-agent status`           |
| macOS           | `datadog-agent status`                                                   |
| Source          | `sudo ~/.datadog-agent/bin/agent status`                                 |
| Windows         | [Windows ドキュメント][1]を参照してください。                             |


[1]: /ja/agent/basic_agent_usage/windows/#status-and-information
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
{{% tab "Agent v6" %}}

| プラットフォーム     | コマンド                                                |
| ------------ | ------------------------------------------------------ |
| AIX          | `datadog-agent status`                                 |
| Linux        | `sudo datadog-agent status`                            |
| Docker       | `sudo docker exec -it <container_name> agent status`   |
| Kubernetes   | `kubectl exec -it <pod-name> agent status`             |
| macOS        | `datadog-agent status` または [Web GUI][1] を使用         |
| Source       | `sudo datadog-agent status`                            |
| Windows      | [Windows ドキュメント][2]を参照してください。           |

以下に示すように、適切に構成されたインテグレーションは、**Running Checks** の下に警告やエラーなしで表示されます。

```
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


[1]: /ja/agent/basic_agent_usage/#gui
[2]: /ja/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム   | コマンド                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <container_name> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <pod-name> /etc/init.d/datadog-agent info`           |
| macOS      | `datadog-agent info`                                                   |
| Source     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | [Windows ドキュメント][1]を参照してください。                           |

以下に示すように、適切に構成されたインテグレーションは、**Checks** の下に警告やエラーなしで表示されます。

```
  Checks
  ======

   network
   -------
     - instance #0 [OK]
     - Collected 15 metrics, 0 events & 1 service check
```


[1]: /ja/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Cluster Agent" %}}

| プラットフォーム   | コマンド                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

## その他のコマンド

[app.datadoghq.com][3] の場合

Agent v6 のコマンドラインインターフェイスは、サブコマンドベースです。利用可能なサブコマンドのリストを確認するには、次を実行します:
```shell
<エージェント_バイナリ> --help
```

サブコマンドを実行するには、Agent バイナリを呼び出す必要があります:
```shell
<エージェント_バイナリ> <サブ_コマンド> <オプション>
```

一部のオプションにはフラグとオプションがあり、`--help` で詳細に説明されています。たとえば、`check` サブコマンドのヘルプを使用するには、次を実行します。
```shell
<エージェント_バイナリ> check --help
```

| コマンド         | Notes                                                                       |
|-----------------|-----------------------------------------------------------------------------|
| `check`           | 指定されたチェックを実行します。                                                    |
| `configcheck`     | 実行中の Agent のうちロード済みかつ解決済みの構成をすべて出力します。            |
| `diagnose`        | システムに対して接続診断を実行します。                         |
| `flare`           | フレアを収集して Datadog に送信します。                                     |
| `health`          | 現在の Agent の状態を出力します。                                             |
| `help`            | 任意のコマンドのヘルプ。                                                     |
| `hostname`        | Agent が使用するホスト名を出力します。                                       |
| `import`          | 以前のバージョンの Agent から構成ファイルをインポートして変換します。 |
| `installservice`  | サービスコントロールマネージャー内で Agent をインストールします。                      |
| `launch-gui`      | Datadog Agent GUI を起動します。                                               |
| `regimport`       | レジストリ設定を `datadog.yaml` にインポートします。                           |
| `remove-service`  | サービスコントロールマネージャーから Agent を削除します。                         |
| `restart-service` | サービスコントロールマネージャー内で Agent を再起動します。                      |
| `start-service`   | サービスコントロールマネージャー内で Agent を起動します。                        |
| `stopservice`     | サービスコントロールマネージャー内で Agent を停止します。                         |
| `jmx`             | JMX トラブルシューティング。                                                         |
| `version`         | バージョン情報を出力します。                                                     |

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}