---
algolia:
  tags:
  - Agent のログファイル
aliases:
- /ja/agent/faq/agent-log-files
- /ja/agent/guide/agent-log-files
further_reading:
- link: /agent/troubleshooting/
  tag: ドキュメント
  text: Agent のトラブルシューティング
- link: /agent/configuration/agent-configuration-files/
  tag: よくあるご質問
  text: Agent 構成ファイル
- link: /agent/configuration/agent-commands/
  tag: よくあるご質問
  text: Agent のコマンド
title: Agent のログファイル
---

Datadog Agent は、デフォルトでログファイルが 10 MB に達するたびにログをローテーションします。ロールオーバーが発生すると、1 つのバックアップ (`agent.log.1`) が保存されます。以前のバックアップが存在する場合、ロールオーバー中に上書きされます。1 つのログファイルの最大サイズと保持するバックアップファイルの最大数を変更するには、[Agent 構成ファイル][1]で `log_file_max_size` (デフォルト: 10 485 760 バイト) と `log_file_max_rolls` (デフォルト: 1) を設定します。

## Agent のログディレクトリ

| プラットフォーム                              | コマンド                       |
|---------------------------------------|-------------------------------|
| Linux                                 | `/var/log/datadog/`           |
| macOS、Agent v7.28+ および v6.28+        | `/opt/datadog-agent/logs`      |
| macOS、6.28.0/7.28.0 以前の Agent | `/var/log/datadog`            |
| Windows                               | `C:\ProgramData\Datadog\logs` |

## Agent のログファイル

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* Agent 7.24.0/6.24.0 以上では `jmxfetch.log` を使用します。
* Agent 7.46.0 以上では `dogstatsd.log` を使用します。

## Agent インストールログファイル

| プラットフォーム                             | 場所とファイル名        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`  |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file