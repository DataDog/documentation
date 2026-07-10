---
disable_toc: false
private: true
title: Agent 6 のログファイル
---

## 概要

このページでは、Agent 5 のログファイルについて説明します。Datadog では最新機能を利用できるように、Agent 7 を新規インストールするかアップグレードすることを推奨しています。Agent の最新バージョンのインストールについては、[Agent 7 のインストール手順][1]に従ってください。以前のバージョンから Agent 7 へのアップグレードについては、[Datadog Agent v7 へのアップグレード][2]を参照してください。

Datadog Agent は、デフォルトでログファイルが 10 MB に達するたびにログをローテーションします。ロールオーバーが発生すると、1 つのバックアップ (`agent.log.1`) が保存されます。以前のバックアップが存在する場合、ロールオーバー中に上書きされます。1 つのログファイルの最大サイズと保持するバックアップファイルの最大数を変更するには、[Agent 構成ファイル][3]で `log_file_max_size` (デフォルト: 10 485 760 バイト) と `log_file_max_rolls` (デフォルト: 1) を設定します。

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
* `jmxfetch.log` for Agent >= 7.24.0/6.24.0
* `dogstatsd.log` for Agent >= 7.46.0


## Agent インストールログファイル

| プラットフォーム                             | 場所とファイル名        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ja/agent/versions/upgrade_to_agent_v7/
[3]: /ja/agent/guide/agent-6-configuration-files#agent-main-configuration-file