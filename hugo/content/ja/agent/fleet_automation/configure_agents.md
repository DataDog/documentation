---
description: Fleet Automation を使用して、Datadog Agent の構成を大規模に展開、管理します。
further_reading:
- link: /agent/fleet_automation/
  tag: ドキュメント
  text: Fleet Automation
- link: /api/latest/fleet-automation/
  tag: ドキュメント
  text: Fleet Automation API
site_support_id: fleet-automation-standard-features
title: エージェントの構成
---
[Fleet Automation][3] を使用して、Datadog Agent の構成を大規模に展開、管理します。UI のガイド付きワークフロー、またはカスタム YAML ファイルを使用して、構成変更を適用します。Fleet Automationで管理できるAgent設定については、「[Supported datadog.yaml Configuration Fields][11]」を参照してください。

## 前提条件 {#prerequisites}

- [Remote Configuration][9] が組織で有効になっていること
- Agent および OTel Collector の構成には Agent バージョン 7.73 以降が必要です (インテグレーションおよびシークレットの構成にはバージョン 7.76 以降が必要です)。Agent をアップグレードするには、[Agent のアップグレード][10] を参照してください。
- インストールスクリプトまたは Ansible Datadog Role でインストールした Linux VM、または Windows VM

{{< callout url="https://www.datadoghq.com/product-preview/configure-agent-kubernetes-operator/" header="プレビューに参加しましょう。" >}}
コンテナ化されたワークロードでの Agent の Remote Configuration はプレビュー版です。この機能に関心がある場合は、フォームに記入してアクセスをリクエストしてください。
{{< /callout >}}

{{< callout url="https://www.datadoghq.com/product-preview/modify-tags-fleet-automation/" header="プレビューに参加しましょう。" >}}
Fleet Automation による Datadog Agent タグの管理はプレビュー版です。この機能に関心がある場合は、フォームに記入してアクセスをリクエストしてください。
{{< /callout >}}

## 複数の Agent を構成{#configure-multiple-agents}

1. Fleet Automation で [Configuration][1] タブを開き、{{< ui >}}Configure Agents{{< /ui >}} をクリックします。
1. 対象の Agent に構成のスコープを設定します。ホスト情報またはタグでフィルタリングして、特定のグループを対象にします。

   {{< img src="/agent/fleet_automation/fa_scope_config.png" alt="Fleet Automation の [Configure Agents] ワークフローにある [Scope this configuration] ステップ。環境、オペレーティングシステム、ホスト名のフィルター、スコープに含まれる 33 個の Agent の一覧、および右側の [Configuration Summary] パネルが表示されています。" style="width:100%;" >}}

1. 対象の Agent で実行する製品 (Logs、APM、NDM など) を選択します。

   {{< img src="/agent/fleet_automation/fa_create_agent_configuration3.png" alt="Fleet Automation の [Configure Agents] ワークフローにある [Select products to configure] ステップ。Core Observability (Infrastructure Monitoring、Log Management、APM) および Additional Observability (Live Process Monitoring、Cloud Network Monitoring、Network Device Monitoring) の下にグループ化された製品タイルが表示されています。" style="width:100%;" >}}

1. 展開計画を確認し、対象の Agent と展開の同時実行数などの展開設定を確認します。
1. {{< ui >}}Deploy Configuration{{< /ui >}} をクリックして展開を開始し、[Deployments page][2] から進捗状況を追跡します。

## 単一の Agent の構成を編集{#edit-the-configuration-of-a-single-agent}

1. [Fleet View][3] に移動します。

1. (オプション) ホスト情報またはタグでフィルタリングして、一覧を絞り込みます。

1. ホストを選択してサイドパネルを開き、{{< ui >}}Configuration{{< /ui >}} タブをクリックします。

1. {{< ui >}}Edit{{< /ui >}} をクリックして構成を変更します。

1. {{< ui >}}Deploy Changes{{< /ui >}} をクリックして更新を適用します。

**注**: 一部の構成フィールド (例: `api_key`、`site`、`notable_events`) は変更できません。

以下の例では、`logs_enabled` フィールドが `false` から `true` に変更されています。これにより、デプロイ後に Agent でのログ収集が有効になります。

{{< img src="/agent/fleet_automation/agent_remote_management_single_agent_config2.png" alt="Agent の構成変更を編集してデプロイします。" style="width:90%;" >}}

## API を使用して Agent を構成{#configure-agents-with-the-api}

Fleet Automation は、構成の更新をプログラムで適用するための API を提供します。フィルタークエリを使用して任意のホストグループに変更をデプロイし、完全な構成ファイルまたは対象を絞ったパッチを指定します。オンデマンドで構成をプッシュするか、既存の自動化ワークフローに統合します。詳細については、[Fleet Automation API][4] を参照してください。

**注**: API はすべての Agent 構成フィールドをサポートしているわけではありません。Agent の接続やシークレットに関連する設定 (`site`、`api_key`、およびその他の認証パラメーター) は、API を通じて管理できません。管理可能なフィールドについては、「[Supported datadog.yaml Configuration Fields][11]」を参照してください。

## 構成の優先順位{#configuration-precedence}

Fleet Automation を通じてデプロイされた構成変更は、対象に応じて異なるルールに従います。

- **Agent の構成 (`datadog.yaml`):** Fleet Automation はマージパッチを使用して変更を適用します。指定されたフィールドのみが更新され、指定されていないフィールドは変更されません。フィールドレベルで競合が発生した場合、Fleet Automation の値がローカルの値より優先されます。
- **インテグレーションおよびカスタムログ設定:** Fleet Automation は 2 つのモードをサポートしています。
    - 新しい構成ファイルをデプロイします。
    - マージパッチを使用して既存のファイルを更新し、特定のフィールドのみを変更します。マージパッチを使用せずに既存のファイル名を対象とする変更をデプロイすると、ファイルは完全に上書きされます。

  いずれの場合も、Fleet Automation、構成管理ツール、ホスト上での直接編集など、変更元に関係なく、最新の変更が Agent のアクティブな構成になります。

[Fleet Automation Audit Trail][5] を使用して、Agent の最近の構成変更を追跡し、それらの変更に関するアラートを設定します。

## ミラーとプロキシ {#mirrors-and-proxies}

リモート Agent 管理は、プロキシやミラーリポジトリと併用できます。

Agent がプロキシを使用するように構成する手順については、[Agent プロキシの構成][6] を参照してください。プロキシを構成した後、Agent を再起動して設定を適用します。

ミラーリポジトリまたはエアギャップリポジトリの使用手順については、次を参照してください。
- [Datadog のイメージをプライベートコンテナレジストリに同期する][7]
- [インターネット接続が制限されているサーバーへの Agent のインストール][8]

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-management
[2]: https://app.datadoghq.com/fleet/deployments
[3]: https://app.datadoghq.com/fleet
[4]: /ja/api/latest/fleet-automation/
[5]: /ja/agent/fleet_automation/fleet_view/#view-agent-audit-trail-events
[6]: /ja/agent/configuration/proxy/
[7]: /ja/containers/guide/sync_container_images/
[8]: /ja/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
[9]: /ja/agent/guide/setup_remote_config
[10]: /ja/agent/fleet_automation/upgrade_agents/
[11]: /ja/agent/fleet_automation/supported_datadog_yaml_fields/