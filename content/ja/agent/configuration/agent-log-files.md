---
algolia:
  tags:
  - agent log files
aliases:
- /ja/agent/faq/agent-log-files
- /ja/agent/guide/agent-log-files
further_reading:
- link: /agent/troubleshooting/
  tag: Documentation
  text: Agent Troubleshooting
- link: /agent/configuration/agent-configuration-files/
  tag: FAQ
  text: Agent configuration files
- link: /agent/configuration/agent-commands/
  tag: FAQ
  text: Agent commands
title: Agent Log Files
---

Datadog Agent は、デフォルトで 10MB ごとにログのロールオーバーを行います。ロールオーバーが発生すると、1 つのバックアップ (`agent.log.1`) が保存されます。以前のバックアップが存在する場合、ロールオーバー中に上書きされます。1 つのログファイルの最大サイズと保持するバックアップファイルの最大数を設定するには、[Agent メインコンフィギュレーションファイル][1]で `log_file_max_size` (デフォルト: 10485760 バイト) と `log_file_max_rolls` (デフォルト: 1) を使用します。

## Agent のログディレクトリ

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| プラットフォーム                              | コマンド                       |
|---------------------------------------|-------------------------------|
| Linux                                 | `/var/log/datadog/`           |
| macOS、Agent v7.28+ および v6.28+        | `/opt/datadog-agent/logs`      |
| macOS、6.28.0/7.28.0 以前の Agent | `/var/log/datadog`            |
| Windows                               | `C:\ProgramData\Datadog\logs` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム                             | コマンド                                                              |
|--------------------------------------|----------------------------------------------------------------------|
| Linux                                | `/var/log/datadog/`                                                  |
| macOS                                | `/var/log/datadog/`                                                  |
| Windows Server 2008/Vista 以降 | `C:\ProgramData\Datadog\logs\`                                       |
| Windows Server 2003/XP 以前     | `C:\Documents and Settings\All Users\Application Data\Datadog\logs\` |
| SmartOS                              | `/opt/local/datadog/logs/supervisord/`                               |
| ソースビルド                         | `~/.datadog-agent/supervisord/logs/`                                 |

{{% /tab %}}
{{< /tabs >}}

## Agent のログファイル

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* `jmxfetch.log` for Agent >= 7.24.0/6.24.0
* `dogstatsd.log` for Agent >= 7.46.0

{{% /tab %}}
{{% tab "Agent v5" %}}

* `collector.log`
* `dogstatsd.log`
* `forwarder.log`
* `supervisord.log`

{{% /tab %}}
{{< /tabs >}}

## Agent インストールログファイル

| プラットフォーム                             | 場所とファイル名        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file