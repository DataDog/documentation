---
aliases:
- /ja/agent/faq/upgrade-between-agent-minor-versions
- /ja/agent/guide/upgrade-between-agent-minor-versions
- /ja/agent/versions/upgrade_between_agent_minor_versions/
- /ja/agent/guide/upgrade_between_minor_versions/
description: Fleet Automation リモート管理、インストールスクリプト、および構成管理ツールを使用して Datadog Agent バージョンをアップグレードするためのガイド。
further_reading:
- link: /agent/troubleshooting/
  tag: ドキュメント
  text: Agent のトラブルシューティング
- link: agent/
  tag: ドキュメント
  text: Datadog Agent
title: Datadog Agent のアップグレード
---
## 概要 {#overview}
Datadog は、[マイナーおよびパッチ][6]リリースごとに Datadog Agent を更新することを推奨しています。このガイドでは、数回のクリックですべてのホストに新しい Agent バージョンを展開する方法を説明します。


## Agent のマイナーバージョン間のアップグレード {#upgrade-between-minor-versions-of-the-agent}

### Fleet Automation を使用したリモートアップグレード {#upgrade-remotely-with-fleet-automation}

[Fleet Automation][2] を使用すると、Datadog Agent のフリートを一元管理できます。Fleet Automation にはリモート Agent 管理が含まれており、コンテナ化されていない Linux および Windows 環境全体で Agent をリモートアップグレードすることができます。[Agent のアップグレード][7]を参照してください。

### スクリプトまたは構成管理ツールを使用したアップグレード {#upgrade-with-script-or-configuration-management-tooling}

[アプリ内手順][4]に従って、コンテナ、ホストベース、および Infrastructure as Code (IaC) ツールで管理される環境全体で Datadog Agent をアップグレードします。ガイド付きフローにより、Agent をアップグレードするための、プラットフォームに合わせた Agent インストールコマンドが生成されます。デフォルトでは、このコマンドでは最新バージョンの Agent がインストールされます。特定のマイナーバージョンにアップグレードするには、スクリプトを実行する前に `DD_AGENT_MINOR_VERSION=<TARGET_MINOR>` を設定します。

## Agent のメジャーバージョン間のアップグレード {#upgrade-between-major-versions-of-the-agent}

<div class="alert alert-info">
Agent 7 は Python 3 のカスタムチェックのみをサポートしています。Agent 7 にアップグレードする前に、<a href="/agent/guide/python-3"> カスタムチェックが Python 3 と互換性があることを確認してください</a>。
</div>

### Agent 6 から Agent 7 へのアップグレード {#upgrade-from-agent-6-to-agent-7}

{{< tabs >}}
{{% tab "Linux" %}}

Agent をバージョン 6 からバージョン 7 にアップグレードするために、以下の Agent インストールコマンドを実行します。

以下のコマンドは、Amazon Linux、CentOS、Debian、Fedora、Red Hat、Ubuntu、および SUSE で動作します。
: `DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [Datadog Agent インストーラーをダウンロードします][1]。
2. `datadog-agent-7-latest.amd64.msi` を開いて、({{< ui >}}Administrator{{< /ui >}} として) インストーラーを実行します。
3. プロンプトに従ってライセンス契約に同意し、[Datadog API キー][2]を入力します。
4. インストールが終了したら、Datadog Agent Manager を起動するかどうかを選択できます。

**注**: Windows インストーラーの利用可能なすべてのバージョンのリンクは、[JSON 形式で提供されています][3]。

[1]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json
{{% /tab %}}
{{% tab "MacOS" %}}

環境変数 `DD_AGENT_MAJOR_VERSION=7` を使用して Agent インストールコマンドを実行し、Agent をバージョン 6 からバージョン 7 にアップグレードします。

```shell
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

### Agent 5 から Agent 7 へのアップグレード {#upgrade-from-agent-5-to-agent-7}

{{< tabs >}}
{{% tab "Linux" %}}

Agent をバージョン 5 からバージョン 7 にアップグレードするには、環境変数 `DD_UPGRADE="true"` を使用して Agent インストールコマンドを実行します。Agent v7 インストーラーは、アップグレード中に v5 のコンフィギュレーションを自動的に変換することができます。

以下のコマンドは、Amazon Linux、CentOS、Debian、Fedora、Red Hat、Ubuntu、および SUSE で動作します。
: `DD_UPGRADE="true" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [手動のアップグレードプロセス][1]に従って Agent をバージョン 6 にアップグレードします。
2. [Agent v6 から Agent v7 へ](#upgrade-from-agent-6-to-agent-7)のアップグレード手順に従います。

[1]: /ja/agent/guide/upgrade_to_agent_6/?tab=windows#manual-upgrade
{{% /tab %}}
{{% tab "MacOS" %}}

Agent をバージョン 5 からバージョン 7 にアップグレードするには、環境変数 `DD_AGENT_MAJOR_VERSION=7` および `DD_UPGRADE="true"` を使用して Agent インストールコマンドを実行します。Agent v7 インストーラーは、アップグレード中に v5 のコンフィギュレーションを自動的に変換することができます。

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

**注:** アップグレードプロセスでは、**カスタム** Agent チェックは自動的に移行されません。Datadog は追加設定なしに完全な後方互換性を保証できないため、これは意図的な仕様です。カスタムチェックを Python 2 から Python 3 に移行する方法については、[Python 3 カスタムチェックの移行][1]ガイドを参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/python-3/
[2]: /ja/agent/fleet_automation/
[3]: /ja/agent/fleet_automation/#set-up-fleet-automation
[4]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[5]: /ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[6]: https://github.com/DataDog/datadog-agent/releases?page=1
[7]: /ja/agent/fleet_automation/upgrade_agents/