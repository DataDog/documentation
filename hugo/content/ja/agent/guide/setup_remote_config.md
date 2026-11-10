---
description: Fleet Automation で Remote Configuration を構成し、Agent flares、リモートアップグレード、および一元的な構成管理を有効にします。
disable_toc: false
further_reading:
- link: /remote_configuration
  tag: ドキュメント
  text: Remote Configuration についての詳細はこちら
- link: /agent/fleet_automation
  tag: ドキュメント
  text: Fleet Automation
- link: /infrastructure/list/#agent-configuration
  tag: ドキュメント
  text: Agent 構成ビューについての詳細はこちら
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: ブログ
  text: Fleet Automation を使用して、Datadog Agent を大規模に一元管理し、リモートで管理する
title: Fleet Automation の Remote Configuration
---
このページでは、 {{< tooltip glossary="[Fleet Automation][11] での remote_configuration の" case="title" >}} 構成と使用方法について説明します。以下の Fleet Automation 機能には Remote Configuration が必要です。
| 機能 | 説明 | 最小 Agent バージョン |
|---------|-------------|------------------------|
| **[Agent flares][9]** | Fleet Automation を使用した Datadog サイトからの flare 送信 | 7.47+ <br>7.66+ 推奨 |
| **[Agent upgrades][10]** | Agent のリモートアップグレード | Linux: 7.69.0+ <br>Windows: 7.71.1+ |
| **[Agent configuration][13]** | Agent のリモート構成 | 7.73+ |

Datadog では、常に最新の機能にアクセスできるよう、定期的な Agent のアップグレードを推奨しています。

## 前提条件{#prerequisites}

- 各 Agent が、使用する機能の最小バージョンおよびプラットフォーム要件を満たしていることを確認してください。[Agent のアップグレード][10]および [Agent の構成][13]を参照してください。
- RBAC 権限に [`org_management`][1] が含まれていることを確認し、組織の Remote Configuration を有効にできるようにします。
- RBAC 権限に [`api_keys_write`][2] が含まれていることを確認し、Remote Configuration 機能を持つ新しい API キーを作成できるようにするか、既存の API キーにその機能を追加できるようにします。権限がない場合は、組織の Datadog 管理者に連絡して権限を更新してもらいます。この機能を持つキーを使用すると、Agent が Remote Configuration を使用するための認証と認可を行うことができます。

## Remote Configuration を有効にする {#enable-remote-configuration}

ほとんどの場合、Remote Configuration は組織に対してデフォルトで有効になっています。[Remote Configuration][3] 設定ページから、組織で Remote Configuration が有効になっているかどうかを確認できます。有効にする必要がある場合は、次のようにします。
1. RBAC 権限に [`org_management`][1] が含まれていることを確認し、組織の Remote Configuration を有効にできるようにします。
1. 組織の設定ページで、[Remote Configuration][3] を有効にします。これにより、組織全体の Datadog コンポーネントが Datadog から構成を受信できるようになります。

## リモート Agent 管理の有効化 {#enable-remote-agent-management}

Linux または Windows VM 上の Agent をリモートでアップグレードまたは構成するには、Remote Configuration を有効にし、各ターゲット Agent で `remote_updates` を `true` に設定してください。Remote Configuration を使用すると、Agent は Datadog から構成を受信できるようになります。`remote_updates` 設定により、リモートアップグレードと Agent の構成変更が可能になります。

Agent バージョン 7.73.0 以降、`remote_updates` のデフォルトは `true` です。以前のサポートされているバージョンでは、明示的に `true` に設定してください。

1. 組織で Remote Configuration を有効にし、[Agent の API キー ](#enable-remote-configuration-on-the-api-key) でも有効にしてください。
1. Agent の[構成ファイル][16]で、以下の設定を有効にしてください。`remote_updates` はトップレベルの設定です。

   ```yaml
   remote_configuration:
     enabled: true

   remote_updates: true
   ```

   または、Agent サービスが使用する環境で `DD_REMOTE_CONFIGURATION_ENABLED=true` と `DD_REMOTE_UPDATES=true` を設定してください。
1. [Agent を再起動][14]して、変更を適用します。
1. Fleet Automation で Agent のサイドパネルを開き、**Remote Agent Management** ステータスを確認してください。リモート管理が利用できない場合は、[Troubleshoot remote Agent management](#troubleshoot-remote-agent-management) を参照してください。

## Agent Remote Configuration ステータス {#agent-remote-configuration-status}

[Remote Configuration UI][3] を使用して、Agent の Remote Configuration ステータスを確認できます。

次のテーブルは、Remote Configuration の接続性について説明しています。Fleet Automation には、個別の **Remote Agent Management** ステータスも表示されます。Agent が Remote Configuration に **CONNECTED** であっても、リモート管理が **NOT ENABLED** である場合があります。VM でアップグレードや構成変更を有効にするには、[Remote Agent Management を有効にする](#enable-remote-agent-management)を参照してください。

  | Agent ステータス     | 説明                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | 環境にデプロイされた Agent が Datadog への到達、認証、および認可に成功している状態。これは、Remote Configuration において Agent があるべき最適な状態です。                                              |
  | UNAUTHORIZED          | 環境にデプロイされた Agent は Datadog に到達できますが、Remote Configuration 操作のための Datadog での認証および認可が行えない状態。最も可能性が高い原因は、Agent が使用している API キーで Remote Configuration が有効になっていないことです。この問題を解決するには、Agent が使用している API キーで Remote Configuration 機能を有効にしてください。                                                |
  | CONNECTION ERROR        |   環境にデプロイされた Agent の `datadog.yaml` 構成ファイルで `remote_configuration.enabled` が true に設定されていますが、Remote Configuration サービスで Agent が見つからない状態。最も可能性が高い原因は、Agent が Remote Configuration [エンドポイント][4]に到達できないことです。この問題を解決するには、環境から Remote Configuration エンドポイントへのアウトバウンド HTTPS アクセスを許可してください。このステータスは、Agent のバージョンが `7.45.0` 以上の場合に表示されます。
  | DISABLED       |   環境にデプロイされた Agent の `datadog.yaml` 構成ファイルで `remote_configuration.enabled` が false に設定されている状態。Agent で Remote Configuration を有効にする場合は、`remote_configuration.enabled` を true に設定してください。このステータスは、Agent のバージョンが `7.45.0` 以上の場合に表示されます。|
  | NOT CONNECTED       | Agent が Remote Configuration サービスで見つからず、その `datadog.yaml` 構成ファイルで `remote_configuration.enabled` が true または false に設定されている可能性がある状態。ローカル Agent 構成またはプロキシ設定を確認してください。このステータスは、Agent のバージョンが `7.41.1` より高く `7.45.0` より低い場合に表示されます。           |
  | UNSUPPORTED AGENT   | Agent のバージョンが Remote Configuration に対応していない状態。この問題を解決するには、Agent を利用可能な最新バージョンに更新してください。|

## Fleet Automation の Remote Configuration の無効化 {#opting-out-of-remote-configuration-for-fleet-automation}

Remote Configuration 機能を無効にすることができます。
- API キーレベル
- Agent レベル
- 組織レベル (**非推奨**)

### API キーレベル {#at-the-api-key-level}

[API キー][5]ページで、任意の API キーを無効にします。API キーで Remote Configuration を無効にするには、[`api_keys_write`][2] 権限が必要です。

### Agent レベル {#at-the-agent-level}

Agent バージョン 7.47.0 以降、Agent で `remote_configuration.enabled` はデフォルトで `true` に設定されています。この設定により、Agent は Datadog サイトに構成の更新をリクエストするようになります。

Agent から Datadog に構成リクエストを送信したくない場合は、Agent で `remote_configuration.enabled` を `false` に設定します。

{{< tabs >}}
{{% tab "構成 YAML ファイル" %}}
[構成 YAML ファイル][101]で `remote_configuration.enabled` を `true` から `false` に変更します。

```yaml
remote_configuration:
  enabled: false
```

[101]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#main-configuration-file
{{% /tab %}}
{{% tab "環境変数" %}}
Datadog Agent マニフェストに以下を追加します。

```yaml
DD_REMOTE_CONFIGURATION_ENABLED=false
```

{{% /tab %}}
{{% tab "Helm" %}}
Helm チャートに以下を追加します。

```yaml
datadog:
  remoteConfiguration:
    enabled: false
```

{{% /tab %}}
{{< /tabs >}}

### 組織レベル {#at-the-organization-level}

<div class="alert alert-warning"><strong>Datadog は、組織レベルで Remote Configuration を無効にすることを推奨していません。組織レベルで Remote Configuration を無効にすると、組織全体の複数の製品で Datadog コンポーネントが Datadog から構成を受信できなくなります。</strong></div>

組織レベルで Remote Configuration を無効にするには:
1. 必要な `org_management` 権限があることを確認します。
1. [Remote Configuration][3] 設定ページに移動します。
1. {{< ui >}}Disable{{< /ui >}} をクリックします。
1. 警告メッセージが表示されたら、もう一度 {{< ui >}}Disable{{< /ui >}} をクリックします。

## トラブルシューティング {#troubleshooting}

Agent で Remote Configuration の使用中に問題が発生した場合は、以下のトラブルシューティングガイドラインを参照してください。さらにサポートが必要な場合は、[Datadog サポート][6]にお問い合わせください。

### リモート Agent 管理のトラブルシューティング {#troubleshoot-remote-agent-management}

Agent のサイドパネルに **Remote Agent Management: NOT ENABLED** と表示される場合は、有効な構成で `remote_updates` が有効になっていることを確認してください。

リモート管理が引き続き利用できない場合は、以下を確認してください。

- [Agent upgrades][10] または [Agent configuration][13] のバージョンおよびプラットフォームの要件。
- Agent の [Remote Configuration 接続性](#agent-remote-configuration-status)。
- Datadog Installer が実行されているかどうか。

### Agent を再起動します {#restart-the-agent}

Agent の構成が [`datadog.yaml`][16] ファイルで更新されたら、変更を有効にするために Agent を再起動してください。

### Datadog Remote Configuration のエンドポイントが環境から到達可能であることを確認する{#ensure-datadog-remote-configuration-endpoints-are-reachable-from-your-environment}

Remote Configuration を使用するには、環境にデプロイされた Agent が Datadog Remote Configuration の[エンドポイント][4]にアクセスできる必要があります。環境と Datadog 間のプライベートネットワークコネクションには、Remote Configuration の Virtual Private Cloud [エンドポイント][7]に接続することもできます。環境から Remote Configuration エンドポイントへのアウトバウンド HTTPS アクセスが許可されていることを確認してください。Datadog と環境の間にプロキシがある場合は、Remote Configuration エンドポイントを組み込むように[プロキシ設定][8]を更新してください。

### API キーでの Remote Configuration の有効化 {#enable-remote-configuration-on-the-api-key}

Agent が構成を受信するための認証と認可を行うには、該当する API キーで Remote Configuration を有効にしてください。[`api_keys_write`][2] RBAC 権限を持つユーザーのみが、API キーで Remote Configuration を有効にできます。

**注:** [`api_keys_write`][2] RBAC 権限を持っていても、Remote Configuration の[組織][3]レベルの権限がない場合は、新規または既存の API キーで Remote Configuration を有効にすることはできません。既存の API キーで Remote Configuration を無効にする権限のみがあります。

[1]: /ja/account_management/rbac/permissions#access-management
[2]: /ja/account_management/rbac/permissions#api-and-application-keys
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /ja/agent/configuration/network
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ja/help/
[7]: /ja/agent/guide#cloud-infrastructure-guides
[8]: /ja/agent/configuration/proxy/
[9]: /ja/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[10]: /ja/agent/fleet_automation/upgrade_agents/
[11]: /ja/agent/fleet_automation/
[13]: /ja/agent/fleet_automation/configure_agents/
[14]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[16]: /ja/agent/configuration/agent-configuration-files/#main-configuration-file

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}