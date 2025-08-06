---
disable_toc: false
private: true
title: Agent 5 の構成ファイル
---

## 概要

このページでは、Agent 5 の構成ファイルについて説明します。最新機能を利用するには、Agent 7 を新規インストールするかアップグレードすることを Datadog は推奨しています。Agent の最新バージョンのインストールについては、[Agent 7 のインストール手順][1]に従ってください。以前のバージョンから Agent 7 へのアップグレードについては、[Datadog Agent v7 へのアップグレード][2]を参照してください。

## Agent のメイン構成ファイル

| プラットフォーム                             | コマンド                                                                    |
|:-------------------------------------|:---------------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/datadog.conf`                                               |
| macOS                                | `~/.datadog-agent/datadog.conf`                                            |                                       |
| Windows Server 2008/Vista 以降 | `%ProgramData%\Datadog\datadog.conf`                                       |
| Windows Server 2003/XP 以前     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` |

使用可能なすべての構成オプションの詳細については、[サンプル `config_template.yaml` ファイル][3]を参照してください。

## Agent の構成ディレクトリ

| プラットフォーム                             | コマンド                                                              |
|:-------------------------------------|:---------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/conf.d/`                                              |
| CentOS                               | `/etc/dd-agent/conf.d/`                                              |
| Debian                               | `/etc/dd-agent/conf.d/`                                              |
| Fedora                               | `/etc/dd-agent/conf.d/`                                              |
| macOS                                | `~/.datadog-agent/conf.d/`                                           |
| RedHat                               | `/etc/dd-agent/conf.d/`                                              |
| ソース                               | `/etc/dd-agent/conf.d/`                                              |
| Suse                                 | `/etc/dd-agent/conf.d/`                                              |
| Ubuntu                               | `/etc/dd-agent/conf.d/`                                              |
| Windows Server 2008/Vista 以降 | `%ProgramData%\Datadog\conf.d`                                       |
| Windows Server 2003/XP 以前     | `\\Documents and Settings\All Users\Application Data\Datadog\conf.d` |

## JMX 構成ファイル

JMX Agent チェックでは、構成フォルダに `metrics.yaml` という追加ファイルが含まれています。これは、Datadog Agent がデフォルトで収集するすべての Bean のリストです。これにより、[Docker ラベルまたは k8s アノテーション][4]によってチェックを構成する際に、すべての Bean を手動でリストする必要がなくなります。

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ja/agent/versions/upgrade_to_agent_v7/
[3]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[4]: /ja/agent/kubernetes/integrations/#configuration