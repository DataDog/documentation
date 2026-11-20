---
disable_toc: false
private: true
title: Agent 5 のログファイル
---

## 概要

このページでは、Agent 5 のログファイルについて説明します。Datadog では、最新の機能を利用するために、Agent 7 のインストールまたはアップグレードを推奨しています。Agent の最新バージョンのインストールについては、[Agent 7 のインストール手順][1]に従ってください。以前のバージョンから Agent 7 へのアップグレードについては、[Datadog Agent v7 へのアップグレード][2]を参照してください。

Datadog Agent は、デフォルトでログファイルが 10 MB に達するたびにログをローテーションします。ロールオーバーが発生すると、1 つのバックアップ (`agent.log.1`) が保存されます。以前のバックアップが存在する場合、ロールオーバー中に上書きされます。1 つのログファイルの最大サイズと保持するバックアップファイルの最大数を変更するには、[Agent 構成ファイル][3]で `log_file_max_size` (デフォルト: 10 485 760 バイト) と `log_file_max_rolls` (デフォルト: 1) を設定します。

## Agent のログディレクトリ

| プラットフォーム                             | コマンド                                                              |
|--------------------------------------|----------------------------------------------------------------------|
| Linux                                | `/var/log/datadog/`                                                  |
| macOS                                | `/var/log/datadog/`                                                  |
| Windows Server 2008/Vista 以降 | `C:\ProgramData\Datadog\logs\`                                       |
| Windows Server 2003/XP 以前     | `C:\Documents and Settings\All Users\Application Data\Datadog\logs\` |
| SmartOS                              | `/opt/local/datadog/logs/supervisord/`                               |
| ソースビルド                         | `~/.datadog-agent/supervisord/logs/`                                 |

**注**: Windows Server 2008、Vista 以降のシステムでは、Agent のログは `C:\ProgramData\Datadog\logs` にあります。`ProgramData` は隠しフォルダです。

## Agent のログファイル

* `collector.log`
* `dogstatsd.log`
* `forwarder.log`
* `supervisord.log`

## Agent インストールログファイル

| プラットフォーム                             | 場所とファイル名        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ja/agent/versions/upgrade_to_agent_v7/
[3]: /ja/agent/guide/agent-5-configuration-files#agent-main-configuration-file