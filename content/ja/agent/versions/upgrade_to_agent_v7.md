---
further_reading:
- link: /agent/guide/python-3/
  tag: ドキュメント
  text: Python 2  から Python 3 へカスタムチェックを移行する
title: Datadog Agent v7 へのアップグレード
---

<div class="alert alert-info">
Agent v7 は Python 3 のカスタムチェックにのみ対応しています。Agent 7 に移行する前に、<a href="/agent/guide/python-3">ご利用のカスタムチェックと Python 3 に互換性があることをご確認ください。</a>
</div>

## Agent v6 から Agent v7 へ

{{< tabs >}}
{{% tab "Linux" %}}

Agent をバージョン 6 からバージョン 7 にアップグレードするために、以下の Agent インストールコマンドを実行します。

以下のコマンドは、Amazon Linux、CentOS、Debian、Fedora、Red Hat、Ubuntu、および SUSE で動作します。
: `DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [Datadog Agent インストーラーをダウンロードします][1]。
2. `datadog-agent-7-latest.amd64.msi` を開き、インストーラーを (**管理者**として) 実行します。
3. プロンプトに従ってライセンス契約に同意し、[Datadog API キー][2]を入力します。
4. インストールが終了したら、オプションから Datadog Agent Manager を起動できます。

**注**: Windows インストーラーの利用可能な全バージョンのリンクは、[JSON 形式で提供されています][3]。

[1]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
{{% /tab %}}
{{% tab "MacOS" %}}

Agent をバージョン 6 からバージョン 7 にアップグレードするには、環境変数 `DD_AGENT_MAJOR_VERSION=7` を使用して Agent インストールコマンドを実行します。

```shell
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

## Agent v5 から Agent v7 へ

{{< tabs >}}
{{% tab "Linux" %}}

Agent をバージョン 5 からバージョン 7 にアップグレードするには、環境変数 `DD_UPGRADE="true"` を使用して Agent インストールコマンドを実行します。Agent v7 インストーラーにより、v5 のコンフィギュレーションがアップグレード中に自動的に変換されます。

以下のコマンドは、Amazon Linux、CentOS、Debian、Fedora、Red Hat、Ubuntu、および SUSE で動作します。
: `DD_UPGRADE="true" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [手動のアップグレードプロセス][1]に従って、Agent をバージョン 6 にアップグレードします。
2. [Agent v6 から Agent v7](#Agent v6 から Agent v7) へのアップグレード手順に従います。

[1]: /ja/agent/versions/upgrade_to_agent_v6/?tab=windows#manual-upgrade
{{% /tab %}}
{{% tab "MacOS" %}}

Agent をバージョン 5 からバージョン 7 にアップグレードするには、環境変数 `DD_AGENT_MAJOR_VERSION=7` と `DD_UPGRADE="true"` を使用して Agent インストールコマンドを実行します。Agent v7 インストーラーにより、v5 のコンフィギュレーションがアップグレード中に自動的に変換されます。

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

**注:** アップグレードプロセスでは、**カスタム** Agent チェックは自動的に移行されません。Datadog では追加設定を行わない状態で完全な下位互換性を保証できないため、このような仕様になっています。カスタムチェックを Python 2 から Python 3 に移行する方法については、[Python 3 カスタムチェックの移行][1]ガイドを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/python-3/