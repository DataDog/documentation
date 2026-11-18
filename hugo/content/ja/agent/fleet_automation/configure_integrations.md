---
description: Fleet Automation を使用して、Datadog Agent のインテグレーションを大規模にリモート構成します。
further_reading:
- link: /agent/fleet_automation/
  tag: ドキュメント
  text: Fleet Automation
- link: /agent/fleet_automation/configure_agents/
  tag: ドキュメント
  text: エージェントの構成
- link: /api/latest/fleet-automation/
  tag: ドキュメント
  text: Fleet Automation API
site_support_id: fleet-automation-standard-features
title: Agent Integrations の構成
---
Fleet Automation は、Agent 上の[インテグレーション][1]構成ファイル (`conf.d`) をリモートでデプロイ、更新、削除できます。ホストまたはタグでターゲット Agent を選択し、インテグレーションを選択すると、Fleet Automation がフリート全体に構成変更をプッシュします。

## 前提条件{#prerequisites}

- 組織および Agent の API キーで [Remote Configuration][2] が有効になっていること
- 各ターゲット VM Agent で[リモート更新][7]が有効化されていること (`remote_updates: true`)
- Agent バージョン 7.76 以降。Agent をアップグレードするには、[Agent のアップグレード][6]を参照してください。
- Linux VM (インストールスクリプトまたは Ansible Datadog Role でインストール) または Windows VM

<div class="alert alert-info">
コンテナ化されたワークロードの Agent でのインテグレーション構成はサポートされていません。
</div>

## 互換性{#compatibility}

Fleet Automation は、Redis、MySQL、Windows Certificate Store など、`conf.d` 構成ファイルを持つ標準インテグレーションの構成をサポートしています。

カスタムチェックは**サポートされていません**。

## 複数 Agent でのインテグレーション構成 {#configure-integrations-across-multiple-agents}

<div class="alert alert-tip">構成ウィザードの各ステップを進めると、<strong>Configuration Summary</strong> パネルに、現在選択されている Agent のスコープが表示されます。これを使用して、スコープ内の特定の Agent で構成の差分をプレビューし、変更が Agent にどのような影響を与えるかを確認します。</div>

1. Fleet Automation で、[{{< ui >}}Configuration{{< /ui >}}][3] タブを開き、{{< ui >}}Configure Agents{{< /ui >}} をクリックします。
1. 対象の Agent に構成のスコープを設定します。ホスト情報またはタグでフィルタリングして、特定のグループを対象にします。
1. {{< ui >}}Agent integrations{{< /ui >}} を選択します。
1. 構成するインテグレーションを選択します。

    <div class="alert alert-info">Fleet Automation は、ホスト上の未構成のインテグレーションを検出できます。利用可能な Datadog インテグレーションがあるにもかかわらずアクティブな構成がないプロセスがホスト上で実行されている場合、そのプロセスは <strong>Unconfigured integrations detected on your hosts</strong> のリストに表示されます。これを使用して、フリート全体の監視のギャップを特定します。</div>

1. 操作を選択します ([構成変更の適用方法](#how-configuration-changes-are-applied)の詳細については、それぞれの操作を参照してください)。

    - {{< ui >}}Add New{{< /ui >}}。新しい構成ファイルのファイル名を指定し、プロンプトに従って構成を入力します。
    - {{< ui >}}Edit & Replace{{< /ui >}}。{{< ui >}}Select a file{{< /ui >}} をクリックして置き換える構成ファイルを選択し、画面の指示に従って新しい構成を入力します。
    - {{< ui >}}Delete{{< /ui >}}。{{< ui >}}Select a File to Delete{{< /ui >}} をクリックします。

    <div class="alert alert-tip">インテグレーション構成を入力する際は、<strong>Visual</strong> モードと <strong>YAML</strong> モードを切り替えます。<strong>YAML</strong> モードを使用して、YAML を直接貼り付けます。</div>

1. デプロイ計画を確認します。Fleet Automation は、影響を受ける各 Agent の構成差分を生成するため、正確な変更内容を確認できます。
1. {{< ui >}}Deploy Configuration{{< /ui >}} をクリックしてデプロイを開始します。[Deployments ページ][4]から進捗状況を追跡します。

## 構成の変更が適用される仕組み {#how-configuration-changes-are-applied}

各操作は、インテグレーションの `conf.d` 構成ファイルへの変更を異なる方法で適用します。

- {{< ui >}}Add New{{< /ui >}}: 新しいインテグレーション構成ファイルをデプロイします。構成ファイルがすでに存在する場合、そのファイルは完全に置き換えられ、指定した YAML が対象の Agent 上でそのインテグレーションの新しい構成全体となります。

- {{< ui >}}Edit & Replace{{< /ui >}}: 指定したフィールドのみが変更され、指定されていないフィールドは変更されません。

  <div class="alert alert-warning">
  配列フィールド (たとえば <code>tags</code>) は、Edit & Replace ではマージされず、完全に置き換えられます。更新には、必要なすべての値を含めてください。省略した値は削除されます。
  </div>

- {{< ui >}}Delete{{< /ui >}}: 対象の Agent からインテグレーション構成ファイルを削除します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/
[2]: /ja/agent/guide/setup_remote_config
[3]: https://app.datadoghq.com/fleet/agent-management
[4]: https://app.datadoghq.com/fleet/deployments
[5]: https://www.rfc-editor.org/rfc/rfc7386
[6]: /ja/agent/fleet_automation/upgrade_agents/
[7]: /ja/agent/guide/setup_remote_config/#enable-remote-agent-management