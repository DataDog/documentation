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
[Fleet Automation][3] を使用して、Datadog Agent の構成を大規模に展開、管理します。UI のガイド付きワークフロー、またはカスタム YAML ファイルを使用して、構成変更を適用します。構成の更新は、[Fleet Automation API を通じて](#configure-agents-with-the-api)適用することもできます。Fleet Automation で管理できる Agent 設定については、[サポートされている datadog.yaml 構成フィールド][11]を参照してください。

以下を構成できます。

* [ホストで実行されている Agent](#configure-host-based-agents)
* (プレビュー版) [Datadog Operator によって管理される Kubernetes クラスター内で実行されている Agent](#configure-the-agent-on-kubernetes)

## ホストベースの Agent を構成する{#configure-host-based-agents}

### 前提条件 {#prerequisites}

- 組織および Agent の API キーで [Remote Configuration][9] が有効になっていること
- 各ターゲット VM Agent で[リモート更新][12] が有効化されていること (`remote_updates: true`)
- Agent および OTel Collector の構成には Agent バージョン 7.73 以降が必要です (インテグレーションおよびシークレットの構成にはバージョン 7.76 以降が必要です)。Agent をアップグレードするには、[Agent のアップグレード][10] を参照してください。
- インストールスクリプトまたは Ansible Datadog Role でインストールした Linux VM、または Windows VM

{{< callout url="https://www.datadoghq.com/product-preview/modify-tags-fleet-automation/" header="プレビューに参加しましょう。" >}}
Fleet Automation による Datadog Agent タグの管理はプレビュー版です。この機能に関心がある場合は、フォームに記入してアクセスをリクエストしてください。
{{< /callout >}}

### 複数の Agent を構成する{#configure-multiple-agents}

1. Fleet Automation で [[Configuration] (構成)][1] タブを開き、{{< ui >}}Configure Agents{{< /ui >}} をクリックします。
1. 対象の Agent に構成のスコープを設定します。ホスト情報またはタグでフィルタリングして、特定のグループを対象にします。

   {{< img src="/agent/fleet_automation/fa_scope_config.png" alt="Fleet Automation の [Configure Agents] (エージェントの構成) ワークフローにある [Scope this configuration] (構成のスコープ設定) ステップ。環境、オペレーティングシステム、ホスト名のフィルター、スコープに含まれる 33 個の Agent の一覧、および右側の [Configuration Summary] (構成の概要) パネルが表示されています。" style="width:100%;" >}}

1. 対象の Agent で実行する製品 (Logs、APM、NDM など) を選択します。

   {{< img src="/agent/fleet_automation/fa_create_agent_configuration3.png" alt="Fleet Automation の [Configure Agents] (エージェントの構成) ワークフローにある [Select products to configure] (構成する製品の選択) ステップ。Core Observability (Infrastructure Monitoring、Log Management、APM) および Additional Observability (Live Process Monitoring、Cloud Network Monitoring、Network Device Monitoring) の下にグループ化された製品タイルが表示されています。" style="width:100%;" >}}

1. 展開計画を確認し、対象の Agent と展開の同時実行数などの展開設定を確認します。
1. [{{< ui >}}Deploy Configuration{{< /ui >}}] (構成の展開) をクリックして展開を開始し、[[Deployments] (展開) ページ][2]から進捗状況を追跡します。

### 単一 Agent の構成を編集する{#edit-the-configuration-of-a-single-agent}

1. [Fleet View][3] に移動します。

1. (オプション) ホスト情報またはタグでフィルタリングして、一覧を絞り込みます。

1. ホストを選択してサイドパネルを開き、[{{< ui >}}Configuration{{< /ui >}}] (構成) タブをクリックします。

1. [{{< ui >}}Edit{{< /ui >}}] (編集) をクリックして構成を変更します。

1. [{{< ui >}}Deploy Changes{{< /ui >}}] (変更をデプロイ) をクリックして更新を適用します。

**注**: 一部の構成フィールド (例: `api_key`、`site`、`notable_events`) は変更できません。

以下の例では、`logs_enabled` フィールドが `false` から `true` に変更されています。これにより、デプロイ後に Agent でのログ収集が有効になります。

{{< img src="/agent/fleet_automation/agent_remote_management_single_agent_config2.png" alt="Agent の構成変更を編集してデプロイします。" style="width:90%;" >}}

## Kubernetes で Agent を構成する{#configure-the-agent-on-kubernetes}

{{< callout url="https://www.datadoghq.com/product-preview/configure-agent-kubernetes-operator/" header="プレビューに参加しましょう。" >}}
Fleet Automation での Datadog Operator を使用した Kubernetes Agent の構成はプレビュー版です。この機能に関心がある場合は、フォームに記入してアクセスをリクエストしてください。
{{< /callout >}}

Fleet Automation を使用して、Operator が管理する Kubernetes クラスターの `DatadogAgent` カスタムリソースを編集します。たとえば、更新されたマニフェストをクラスターに手動で適用することなく、APM、ログ収集、プロセス監視を有効化または調整できます。

### 前提条件 {#prerequisites-1}

- Datadog Agent が Kubernetes クラスター内で実行されていること。
- Datadog Operator v1.27 以降が Agent のデプロイメントを管理していること。
- Agent が使用する API キーに対して Remote Configuration が有効になっていること。
- Operator がリモート更新を受け入れるように構成されていること。必要な Operator 設定、API キーとアプリケーションキー、およびクラスター名の要件については、[Kubernetes ビューの前提条件][13]を参照してください。

### クラスター構成の編集{#edit-the-cluster-configuration}

1. [Fleet View][3] に移動します。
1. [{{< ui >}}View by infra type{{< /ui >}}] (インフラタイプ別に表示) で、Kubernetes ビューに切り替えます。
1. 構成するクラスターを選択し、[{{< ui >}}Configuration{{< /ui >}}] (構成) タブを開きます。
1. [{{< ui >}}Edit{{< /ui >}}] (編集) をクリックし、`DatadogAgent` 構成を更新します。
1. 変更内容を確認し、[{{< ui >}}Deploy Changes{{< /ui >}}] (変更をデプロイ) をクリックします。

Fleet Automation が変更を開始し、Remote Configuration が変更内容をクラスターに送信します。Datadog Operator が `DatadogAgent` リソースを更新し、Agent Pod 全体に構成をロールアウトします。ロールアウトが正常に完了しない場合、Operator は自動的に以前の構成を復元します。

**注**: Fleet Automation では、Helm Chart の値の編集はサポートされていません。

## API を使用して Agent を構成する{#configure-agents-with-the-api}

Fleet Automation は、構成の更新をプログラムで適用するための API を提供します。フィルタークエリを使用して任意のホストグループに変更をデプロイし、完全な構成ファイルまたは対象を絞ったパッチを指定します。オンデマンドで構成をプッシュするか、既存の自動化ワークフローに統合します。詳細については、[Fleet Automation API][4] を参照してください。

**注**: API はすべての Agent 構成フィールドをサポートしているわけではありません。Agent の接続やシークレットに関連する設定 (`site`、`api_key`、およびその他の認証パラメーター) は、API を通じて管理できません。管理可能なフィールドについては、[サポートされている datadog.yaml 構成フィールド][11]を参照してください。

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
[12]: /ja/agent/guide/setup_remote_config/#enable-remote-agent-management
[13]: /ja/agent/fleet_automation/fleet_view/#prerequisites-for-kubernetes-view