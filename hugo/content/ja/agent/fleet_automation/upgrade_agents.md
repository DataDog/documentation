---
description: Fleet Automation を使用して、Datadog Agent をリモートでアップグレードします。
further_reading:
- link: /agent/fleet_automation/
  tag: ドキュメント
  text: Fleet Automation
- link: /api/latest/fleet-automation/
  tag: ドキュメント
  text: Fleet Automation API
site_support_id: fleet-automation-standard-features
title: Agent のアップグレード
---
Fleet Automation を使用すると、個々のホストに直接アクセスすることなく、フリート全体で Datadog Agent をリモートでアップグレードできます。アップグレードを即座にトリガーしたり、メンテナンスウィンドウ中にスケジュールしたり、API を通じて自動化したりできます。

## 前提条件{#prerequisites}

- 組織および Agent の API キーで [Remote Configuration][7] が有効になっていること
- 各ターゲット VM Agent で[リモート更新][8]が有効化されていること (`remote_updates: true`)
- Windows の場合は Agent バージョン 7.71.1 以降、Linux の場合は 7.69.0 以降
- Linux VM または Windows VM
- 初期 Agent インストールに少なくとも 2 GB のディスク容量、さらにアップグレード用に追加で 2 GB の容量が必要。(アップグレードには、Linux では `/opt/datadog-packages` に、Windows では `C:\ProgramData\Datadog\Installer\packages` に 1.3 GB の空き容量が必要。ロールバックが必要になった場合に備えて、アップグレード中に 2 つの Agent インストールを一時的に維持するための追加領域が必要。)

<div class="alert alert-info">
コンテナ化されたワークロードにおける Agent のリモートアップグレードはサポートされていません。
</div>

## Agent を今すぐアップグレードする {#upgrade-agents-immediately}

1. [{{< ui >}}Upgrades{{< /ui >}}][1] タブから、{{< ui >}}Upgrade Now{{< /ui >}} をクリックします。

   {{< img src="/agent/fleet_automation/upgrade-screen2.png" alt="Upgrade Now ボタンが表示されている Upgrades タブ。" style="width:100%;" >}}
1. アップグレードする Agent を選択します。ホスト情報またはタグでフィルタリングして、特定のグループを対象にします。

   {{< img src="/agent/fleet_automation/start-agent-upgrade.png" alt="アップグレードする Agent のリストを絞り込むためのフィルタリングオプションを備えた Agent 選択画面。" style="width:100%;" >}}

1. デプロイ計画を確認し、{{< ui >}}Upgrade Agents{{< /ui >}} をクリックしてアップグレードを開始します。

   {{< img src="/agent/fleet_automation/agent-upgrades-staged.png" alt="アップグレード用にステージングされた Agent のリストを表示するデプロイ計画ビュー。" style="width:100%;" >}}

1. [Deployments][2] ダッシュボードで進捗状況を追跡します。デプロイテーブル内の Agent をクリックすると、所要時間、進捗状況、およびアップグレードを開始したユーザーを表示できます。
   {{< img src="/agent/fleet_automation/deployments.png" alt="各 Agent のアップグレードの進捗状況と詳細を表示するデプロイメントダッシュボード。" style="width:100%;" >}}

## Agent アップグレードのスケジュール {#schedule-agent-upgrades}

1. [{{< ui >}}Upgrades{{< /ui >}} タブ][1]から、{{< ui >}}\+ Create Schedule{{< /ui >}} をクリックします。

1. Upgrade Schedule ページで、{{< ui >}}Schedule name{{< /ui >}} を追加します。

1. Agent バージョンを選択します。最新バージョン、1 つ前のバージョン、または 2 つ前のバージョンにアップグレードできます。

   {{< img src="/agent/fleet_automation/agent_upgrade_select_version1.png" alt="スケジュールされた Agent アップグレードのリストを確認します。" style="width:100%;" >}}

1. アップグレードする Agent を指定します。ホスト情報またはタグでフィルタリングして、特定のグループを対象にします。
   
   {{< img src="/agent/fleet_automation/agent_upgrade_select_agents.png" alt="アップグレード対象の Agent のリストを確認します。" style="width:100%;" >}}

1. これらのアップグレードのデプロイメントウィンドウを設定します。アップグレードの日、時間枠、タイムゾーンを選択できます。

   {{< img src="/agent/fleet_automation/agent_upgrade_set_window.png" alt="Agent アップグレードの時間枠を選択します。" style="width:100%;" >}}

1. デプロイステータスの更新に関する通知を設定します。Slack、Teams、PagerDuty など、Datadog に接続されているサービスを通じてチームに通知します。

   {{< img src="/agent/fleet_automation/agent_upgrade_set_notification.png" alt="アップグレードの進捗状況について通知を受ける担当者またはチャンネルを選択します。" style="width:100%;" >}}

1. {{< ui >}}Create Schedule{{< /ui >}} をクリックしてスケジュールを保存します。

1. [{{< ui >}}Upgrades{{< /ui >}} タブ][1]の {{< ui >}}Upgrade Schedules{{< /ui >}} セクションで、スケジュールされたアップグレードのリストを確認します。

   {{< img src="/agent/fleet_automation/agent_upgrade_schedule_list3.png" alt="Agent に対してスケジュールされたアップグレードのリストを確認します。" style="width:100%;" >}}

## API を使用した Agent のアップグレード {#upgrade-agents-with-the-api}

Fleet Automation は、プログラムから、または定期的なスケジュールに従って Agent のアップグレードをトリガーするための API を提供します。フィルタークエリを使用して任意のホスト群のアップグレードを開始するか、指定した Agent バージョンで、定義されたメンテナンスウィンドウ中に実行されるスケジュールを作成します。詳細については、[Fleet Automation API][3] を参照してください。

## アップグレードプロセス {#upgrade-process}

手動アップグレードと同様に、Agent の再起動中に 5～30 秒のダウンタイムが発生します。アップグレードプロセス全体には約 5 分かかり、そのうちアップグレード自体に約 2 分、残りの時間は安定性の監視に費やされます。アップグレードが失敗した場合、Agent は自動的に以前のバージョンに戻ります。

アップグレードプロセスでは、主に以下のディレクトリにファイルが追加されます。

Linux:
- `/opt/datadog-packages`
- `/etc/datadog-agent`
- `/etc/systemd/system`

Windows:
- `C:\ProgramData\Datadog\Installer\packages`
- `C:\Program Files\Datadog\Datadog Agent`

Agent はこれらのファイルに対して適切な権限を設定します。アップグレード中に構成ファイルが変更されることはありません。

## アップグレードの優先順位 {#upgrade-precedence}

Datadog では、一度に 1 つのソースからアップグレードを管理することを推奨しています。Fleet Automation または構成管理ツールのいずれかを使用し、両方を併用しないでください。Fleet Automation を通じてアップグレードされた Agent で構成管理ツールを実行すると、そのツールは Agent を構成内の [`DD_AGENT_MINOR_VERSION`][4] に戻します。`DD_AGENT_MINOR_VERSION` が設定されていない場合、Agent は利用可能な最新バージョンにアップグレードされます。

## トラブルシューティング {#troubleshooting}

### Remote Agent Management が有効になっていません {#remote-agent-management-is-not-enabled}

Agent のサイドパネルに **Remote Agent Management: NOT ENABLED** と表示されている場合は、[Remote Agent Management の有効化][8]に従ってホスト上で `remote_updates` を有効にし、Agent を再起動してください。Remote Configuration に接続されている間も、リモート更新を無効にすることができます。

Agent でアップグレードを引き続き利用できない場合は、[前提条件](#prerequisites)、Remote Configuration の接続性、および Datadog Installer が実行されているかどうかを確認してください。

### 新しくリリースされた Agent バージョンがまだアップグレードに使用不可 {#newly-released-agent-version-is-not-yet-available-for-upgrade}

新しい Agent バージョンがリリースされた後、Fleet Automation のアップグレードターゲットとして表示されるまでに最大 24 時間かかる場合があります。最近リリースされたバージョンがアップグレードピッカーに表示されない場合は、最大 24 時間待ってから再試行してください。

### Datadog Installer と Agent (7.66 より前) の互換性の問題 {#datadog-installer-incompatible-with-agent-pre-766}

プレビュー版のお客様で、Agent バージョン 7.66 より前に Remote Agent Management を設定していた場合、Datadog Installer が Agent と互換性がない可能性があります。

バージョン 7.66 から、インストーラーコンポーネントが Agent にバンドルされるようになりました。これにより、両方のコンポーネントが同期され、リモート管理を妨げる可能性のあるバージョン不一致を防ぐことができます。以前の Agent バージョンにはインストーラーがバンドルされていなかったため、互換性の問題が発生する可能性があります。

問題を診断して修正するには、以下の手順を実行します。

1. 影響を受けるホストを特定するには、[Fleet Automation の次のクエリ][5]を使用します。
   ```txt
   support_remote_upgrade:datadog-installer
   ```
1. セットアップが影響を受けている場合は、影響を受ける各 Agent で [インストールスクリプトを再実行し][6]、[前提条件](#prerequisites) を満たす Agent バージョンにアップグレードしてください。

更新後、[Remote Agent Management を有効にして][8]、今後のアップグレードに Fleet Automation を使用できるようにしてください。アップグレードしない場合、既存の Agent は引き続き機能しますが、リモートアップグレードは利用できません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-upgrades
[2]: https://app.datadoghq.com/fleet/deployments
[3]: /ja/api/latest/fleet-automation/
[4]: https://github.com/DataDog/agent-linux-install-script?tab=readme-ov-file#install-script-configuration-options
[5]: https://app.datadoghq.com/fleet?query=support_remote_upgrade%3Adatadog-installer
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[7]: /ja/agent/guide/setup_remote_config
[8]: /ja/agent/guide/setup_remote_config/#enable-remote-agent-management