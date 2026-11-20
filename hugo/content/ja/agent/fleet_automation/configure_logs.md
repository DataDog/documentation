---
description: Fleet Automation を使用すると、大規模なカスタムログ収集をリモートで構成できます。
further_reading:
- link: /agent/fleet_automation/
  tag: ドキュメント
  text: Fleet Automation
- link: /agent/fleet_automation/configure_integrations/
  tag: ドキュメント
  text: Agent Integrations の構成
- link: /agent/fleet_automation/configure_agents/
  tag: ドキュメント
  text: エージェントの構成
- link: /api/latest/fleet-automation/
  tag: ドキュメント
  text: Fleet Automation API
- link: /agent/logs/
  tag: ドキュメント
  text: ホスト Agent ログの収集
- link: /logs/guide/log-collection-troubleshooting-guide/
  tag: ドキュメント
  text: ログ収集のトラブルシューティングガイド
site_support_id: fleet-automation-standard-features
title: カスタムログの構成
---
[Fleet Automation][2] を使用して、Agent の [カスタムログ収集][4]の設定をリモートから大規模に管理します。`conf.d` 構成ファイルをホストごとに編集する代わりに、ホスト情報やタグに基づいて変更のスコープを指定し、一致するすべての Agent に一度にデプロイします。デプロイする前に、スコープ内の各 Agent の構成の差分を確認します。

## 前提条件{#prerequisites}

- 組織と Agent の API キーの両方で [Remote Configuration][1] が有効になっていること
- 各ターゲット VM Agent で[リモート更新][10]が有効化されていること (`remote_updates: true`)
- Agent バージョン 7.76 以降。Agent をアップグレードするには、[Agent のアップグレード][5]を参照してください。
- Linux VM (インストールスクリプトまたは Ansible Datadog Role でインストール) または Windows VM
- ターゲット Agent でログ収集が有効になっていること (`logs_enabled: true` の `datadog.yaml`)。Fleet Automation はいずれにしても構成ファイルをデプロイしますが、ログ収集が有効になるまで Agent はログの収集を開始しません。[ホスト Agent ログの収集][8]を参照してください。

<div class="alert alert-info">
コンテナ化されたワークロードの Agent におけるカスタムログの構成はサポートされていません。コンテナ化された環境については、<a href="/containers/kubernetes/log/">Kubernetes ログの収集</a> を参照してください。
</div>

## 複数の Agent におけるカスタムログの構成 {#configure-custom-logs-across-multiple-agents}

<div class="alert alert-tip">構成ウィザードの各ステップを進めると、<strong>Configuration Summary</strong> パネルに、現在選択されている Agent のスコープが表示されます。これを使用して、スコープ内の特定の Agent で構成の差分をプレビューし、変更が Agent にどのような影響を与えるかを確認します。</div>

1. Fleet Automation で、[{{< ui >}}Configuration{{< /ui >}}][2] タブを開き、{{< ui >}}Configure Agents{{< /ui >}} をクリックします。
1. 対象の Agent に構成のスコープを設定します。ホスト情報またはタグでフィルタリングして、特定のグループを対象にします。
1. {{< ui >}}Custom Logs{{< /ui >}} を選択します。
1. 操作を選択します (詳細については、[構成の変更が適用される仕組み](#how-configuration-changes-are-applied)を参照してください)。

    - {{< ui >}}Add New{{< /ui >}}。新しい構成ファイルのファイル名を指定し、プロンプトに従って構成を入力します。ログ収集フィールドの説明については、[カスタムログ収集][4]を参照してください。{{< ui >}}Tags{{< /ui >}} フィールドを使用して、収集されたログに[タグ][6]を付与します。{{< ui >}}\+ Add Log Collection{{< /ui >}} をクリックして、ログ収集設定を追加します。
    - {{< ui >}}Edit & Replace{{< /ui >}}。{{< ui >}}Select a File{{< /ui >}} をクリックして置き換える構成ファイルを選択し、ログ収集設定を更新します。
    - {{< ui >}}Delete{{< /ui >}}。{{< ui >}}Select a File to Delete{{< /ui >}} をクリックします。

    <div class="alert alert-tip"> ログ収集構成を入力する際は、<strong>Visual</strong> モードと <strong>YAML</strong> モードを切り替えます。<strong>YAML</strong> モードを使用して、YAML を直接貼り付けます。</div>

1. デプロイ計画を確認します。Fleet Automation は、影響を受ける各 Agent の構成差分を生成するため、正確な変更内容を確認できます。
1. {{< ui >}}Deploy Configuration{{< /ui >}} をクリックしてデプロイを開始します。[Deployments ページ][3]から進捗状況を追跡します。

## 構成の変更が適用される仕組み {#how-configuration-changes-are-applied}

各操作は、Agent 上のカスタムログ収集に対する変更をそれぞれ異なる方法で適用します。

- {{< ui >}}Add New{{< /ui >}}: 新しい構成ファイルをデプロイします。

- {{< ui >}}Edit & Replace{{< /ui >}}: 構成ファイル全体を置き換えます。更新には、必要なすべての値を含めてください。省略した値は削除されます。

- {{< ui >}}Delete{{< /ui >}}: 対象の Agent から構成ファイルを削除します。

## ログ収集の確認 {#verify-log-collection}

構成をデプロイした後、

1.  [Fleet Automation][9] で、対象の Agent のいずれかの詳細ページを開きます。
1. {{< ui >}}Configuration{{< /ui >}} タブで、新規または更新されたカスタムログ構成ファイルがエラー状態なしでリストされていることを確認します。これは、構成が正常にプッシュされ、適用されたことを意味します。

デプロイは成功したもののログが届かない場合は、[ログ収集のトラブルシューティングガイド][7]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/setup_remote_config
[2]: https://app.datadoghq.com/fleet/agent-management
[3]: https://app.datadoghq.com/fleet/deployments
[4]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[5]: /ja/agent/fleet_automation/upgrade_agents/
[6]: /ja/getting_started/tagging/assigning_tags/
[7]: /ja/logs/guide/log-collection-troubleshooting-guide/
[8]: /ja/agent/logs/
[9]: https://app.datadoghq.com/fleet
[10]: /ja/agent/guide/setup_remote_config/#enable-remote-agent-management