---
title: Agent のログファイル
kind: ガイド
aliases:
  - /ja/agent/faq/agent-log-files
further_reading:
  - link: /agent/troubleshooting/
    tag: Documentation
    text: Agent のトラブルシューティング
  - link: /agent/guide/agent-configuration-files/
    tag: FAQ
    text: Agent 構成ファイル
  - link: /agent/guide/agent-commands/
    tag: FAQ
    text: Agent のコマンド
---
Datadog Agent は 10 MB ごとにログロールオーバーを行います。ロールオーバーが発生すると、バックアップが 1 つ保管されます (例: `agent.log.1`)。以前のバックアップが存在する場合は、ロールオーバーによって上書きされます。

## Agent のログディレクトリ

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| プラットフォーム                             | コマンド                       |
|--------------------------------------|-------------------------------|
| Linux                                | `/var/log/datadog/`           |
| macOS                                | `/var/log/datadog/`           |
| Windows Server 2008/Vista 以降 | `C:\ProgramData\Datadog\logs` |
| Windows Server 2003/XP 以前     | サポートされないプラットフォーム        |

{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム                             | コマンド                                                              |
|--------------------------------------|----------------------------------------------------------------------|
| Linux                                | `/var/log/datadog/`                                                  |
| CentOS                               | `/var/log/datadog/`                                                  |
| Debian                               | `/var/log/datadog/`                                                  |
| Fedora                               | `/var/log/datadog/`                                                  |
| macOS                                | `/var/log/datadog/`                                                  |
| RedHat                               | `/var/log/datadog/`                                                  |
| Source                               | `~/.datadog-agent/supervisord/logs/`                                 |
| SmartOS                              | `/opt/local/datadog/logs/supervisord/`                               |
| Ubuntu                               | `/var/log/datadog/`                                                  |
| Windows Server 2008/Vista 以降 | `C:\ProgramData\Datadog\logs\`                                       |
| Windows Server 2003/XP 以前     | `C:\Documents and Settings\All Users\Application Data\Datadog\logs\` |

{{% /tab %}}
{{< /tabs >}}

## Agent のログファイル

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `jmxfetch.log` for Agent >= 7.24.0/6.24.0

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
| Linux                                | `/tmp/dd_agent.log`           |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}