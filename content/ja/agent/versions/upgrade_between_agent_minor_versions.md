---
aliases:
- /ja/agent/faq/upgrade-between-agent-minor-versions
- /ja/agent/guide/upgrade-between-agent-minor-versions
title: Upgrade Between Datadog Agent Minor Versions
---

## Agent 6 と 7 のマイナーバージョン間のアップグレード

{{< tabs >}}
{{% tab "Linux" %}}

Agent 6 と 7 のマイナーバージョン間のアップグレードは、`install_script_agent6.sh` および `install_script_agent7.sh` スクリプトを使用することをお勧めします。以下のコマンドは、サポートされているすべての Linux ディストリビューションで動作します。

所定の Agent 6 マイナーバージョンにアップグレードします。

: `DD_AGENT_MINOR_VERSION=<target_minor> bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent6.sh)"`

最新の Agent 6 マイナーバージョンにアップグレードします。

: `bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent6.sh)"`

所定の Agent 7 マイナーバージョンにアップグレードします。

: `DD_AGENT_MINOR_VERSION=<target_minor> bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent7.sh)"`

最新の Agent 7 マイナーバージョンにアップグレードします。

: `bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

特定のバージョンのインストールパッケージをダウンロードし、インストールします。

特定の Agent 6 マイナーバージョンをダウンロードするための URL:

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-6.<minor_version>.<bugfix_version>.msi`

特定の Agent 7 マイナーバージョンをダウンロードするための URL:

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-7.<minor_version>.<bugfix_version>.msi`

{{% /tab %}}
{{% tab "MacOS" %}}

**注**: 特定のマイナーバージョンにアップグレードすることはできません。

最新の Agent 6 マイナーバージョンにアップグレードするためのコマンド:

: `DD_AGENT_MAJOR_VERSION=6 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_mac_os.sh)"`

最新の Agent 7 マイナーバージョンにアップグレードするためのコマンド:

: `DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_mac_os.sh)"`

{{% /tab %}}
{{< /tabs >}}