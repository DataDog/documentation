---
algolia:
  tags:
  - agent log files
aliases:
- /ja/agent/faq/agent-log-files
- /ja/agent/guide/agent-log-files
description: Datadog Agent がログファイルを保存する場所とログローテーション設定の構成方法について理解します。
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
Datadog Agent は、デフォルトで 10 MB ごとにログのロールオーバーを実行します。ロールオーバーが発生すると、1 つのバックアップ (`agent.log.1`) が保持されます。以前のバックアップが存在する場合、ロールオーバー中に上書きされます。1 つのログファイルの最大サイズと保持するバックアップファイルの最大数を設定するには、[Agent 構成ファイル][1]で `log_file_max_size`(デフォルト: 10485760 バイト) および `log_file_max_rolls`(デフォルト: 1) を使用します。

## Agent ログディレクトリ {#agent-log-directory}

| プラットフォーム                              | コマンド                       |
|---------------------------------------|-------------------------------|
| AIX                                   | `/var/log/datadog/`           |
| Linux                                 | `/var/log/datadog/`           |
| macOS、Agent v7.28+ および v6.28+        | `/opt/datadog-agent/logs`      |
| macOS、6.28.0/7.28.0 より前の Agent | `/var/log/datadog`            |
| Windows                               | `C:\ProgramData\Datadog\logs` |

## Agent のログファイル {#agent-log-files}

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* `jmxfetch.log` (Agent 7.24.0/6.24.0 以上)
* `dogstatsd.log` (Agent 7.46.0 以上)

AIX では、各 Agent サービスは stderr も `/var/log/datadog/` 内の専用ファイル (`agent-stderr.log`、`trace-agent-stderr.log`、`agent-data-plane-stderr.log`) にリダイレクトし、そのファイルに Agent の内部ログをバイパスする起動エラーなどの出力を記録します。

## Agent のインストールログファイル {#agent-installation-log-files}

| プラットフォーム                             | 場所とファイル名        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`  |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file