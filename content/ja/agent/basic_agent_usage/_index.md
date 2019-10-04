---
title: 基本的な Agent の利用方法
kind: documentation
aliases:
  - /ja/guides/basic_agent_usage/
  - /ja/agent/faq/where-is-the-configuration-file-for-the-agent/
  - /ja/agent/faq/log-location
further_reading:
  - link: agent/faq/how-datadog-agent-determines-the-hostname
    tag: よくあるご質問
    text: Datadog が Agent ホスト名を決定する方法
  - link: agent/guide/agent-commands
    tag: よくあるご質問
    text: すべての Agent コマンド
  - link: agent/guide/agent-configuration-files
    tag: よくあるご質問
    text: すべての Agent 構成ファイルの場所
---
{{< partial name="platforms/platforms.html" links="platforms" >}}

## 構成管理ツール

構成管理ツールを使用して、Datadog Agent と[インテグレーション][1]を管理します。

{{< tabs >}}
{{% tab "Chef Cookbook" %}}

* [Chef GitHub プロジェクト][1]
* [Chef で Datadog Agent をインストールする[2]


[1]: https://github.com/DataDog/chef-datadog
{{% /tab %}}
{{% tab "Puppet" %}}

* [Puppet GitHub プロジェクト][1]
* [Puppet で Datadog Agent をインストールする[2]


[1]: https://github.com/DataDog/puppet-datadog-agent
{{% /tab %}}
{{% tab "Ansible" %}}

* [Ansible GitHub プロジェクト][1]
* [Ansible で Datadog Agent をインストールする[2]


[1]: https://github.com/DataDog/ansible-datadog
{{% /tab %}}
{{% tab "SaltStack" %}}

* [Saltstack で Datadog Agent をインストールする[1]


{{% /tab %}}
{{< /tabs >}}

## Datadog Agent の次のステップ

### Agent の更新

特定のホストで Datadog Agent コアのマイナーバージョンアップを手動で実行するには、[プラットフォームに対応するインストールコマンド][2]を実行します。

注: 特定の Agent インテグレーションを手動でアップデートするには、[インテグレーション管理ガイド][3]を参照してください。

### 構成ファイル

[Agent 構成ファイルガイドを参照してください][4]。

### Datadog サイト

Agent データを [Datadog EU サイト][5]に送信するには、[Agent のメイン構成ファイル][6] `datadog.yaml` を編集して、`site` パラメーターを以下のように変更します。

`site: datadoghq.eu`

### ログの場所

[Agent ログファイルガイドを参照してください][7]。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: /ja/agent/guide/integration-management
[4]: /ja/agent/guide/agent-configuration-files
[5]: https://app.datadoghq.eu
[6]: /ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[7]: /ja/agent/guide/agent-log-files
