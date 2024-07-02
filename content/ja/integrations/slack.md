---
"aliases":
- "/integrations/hipchat/"
"categories":
- "collaboration"
- "notifications"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Datadog のアラートとグラフをチームの Slack チャンネルに送信。"
"doc_link": "https://docs.datadoghq.com/integrations/slack/"
"draft": false
"git_integration_title": "slack"
"has_logo": true
"integration_id": ""
"integration_title": "Slack"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "slack"
"public_title": "Datadog-Slack Integration"
"short_description": "Send Datadog alerts and graphs to your team's Slack channel."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Connect Slack to Datadog to help your team collaborate by:

- Sharing graphs in private or public Slack channels.
- Receiving alerts and notifications from Datadog within Slack.
- Muting triggering monitors and declaring incidents from Slack.
- Automatically unfurling links to display a preview for log events, traces, and dashboard widgets.

## セットアップ

{{< tabs >}}

{{% tab "Datadog for Slack" %}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    <a href="https://www.datadoghq.com/blog/datadog-slack-app/">Datadog for Slack</a> is not available for the {{< region-param key="dd_site_name" >}} site. To send notifications to Slack on the US1-FED site, use the Slack webhook (Legacy).
</div>
{{% /site-region %}}

### Install the Datadog app in your Slack workspace

1. In the [Slack integration tile][1], click **Configuration**, then click **Connect Slack Account**.
2. Click **Allow** to grant Datadog permission to access your Slack workspace. You may need your Slack workspace admin to approve this change. See [Permissions][2] for a breakdown of the app's permissions and the reasons for requesting those permissions.

### Configure which Slack channels can receive notifications

1. Use the [Slack integration tile][1] to configure which Slack channels can receive notifications from Datadog.
2. To configure a **private channel**, the Datadog app must be a member of that channel. Navigate to the channel in Slack and use `/invite @Datadog` to ensure the Datadog app is a member. Upon completing this step, the channel will be automatically added to the [Slack integration tile][1]. 

Once the Slack integration is installed, you can use the `/datadog` command in any Slack channel. The available actions change depending on the channel you're in. Use `/datadog help` to view all available commands. You can also use the `/dd` alias to run `/datadog` commands.


[1]: https://app.datadoghq.com/integrations/slack
[2]: https://docs.datadoghq.com/integrations/slack#permissions
{{% /tab %}}

{{% tab "Slack Webhook (レガシー)" %}}

### インストール

Use the [Slack integration tile][1] on the Datadog site to install the integration.

### 構成

1. Slack アカウントで、[Datadog (レガシー) アプリ][2]にアクセスします。
2. **Install** > **Add Integration** をクリックし、次に Slack の **Webhook URL** をコピーします。
3. On the [Slack integration tile][1], click **Configuration**, then click **Add Account**.
4. 選択した **Slack アカウント名**を入力します。
5. **Slack Account Hook** フィールドに webhook URL を貼り付けます。
6. **Save** をクリックします。
7. Slack の**ポスト先のチャンネル**を追加します。
  {{< img src="integrations/slack/slack_configuration.png" alt="Slack コンフィギュレーション" >}}

You can also send notifications to Slack from [monitors][3] and [events][4].


[1]: https://app.datadoghq.com/integrations/slack
[2]: https://slack.com/apps/A0F7XDT7F-datadog-legacy
[3]: https://docs.datadoghq.com/monitors/notifications/
[4]: https://docs.datadoghq.com/service_management/events/explorer/notifications/
{{% /tab %}}
{{< /tabs >}}

## モニター

Slack インテグレーションを使用すると、Slack から直接モニターアラートを受信したり、モニターをミュートしたりすることができます。モニターの作成方法の詳細については、[モニターの構成][1]を参照してください。モニターアラートを Slack チャンネルに送信するには、まず `/invite @Datadog` コマンドを使用して Datadog をチャンネルに招待します。

### 通知メッセージ

標準の Datadog [通知][2]と同じルール、変数、タグを使用することができます。例えば、この通知はモニターが再通知するときに `infrastructure` という Slack チャンネルのチームに通知します。

```
CPU usage has exceeded {{warn_threshold}} on {{ @machine_id.name }}.
{{#is_renotify}}
Notifying @slack-infrastructure <!subteam^12345>
{{/is_renotify}}
```

#### チャンネル

通知メッセージの構成時に Slack チャンネルを指定するには、モニターメッセージボックスに `@slack` と入力すると、通知を送信できるチャンネルのリストが表示されます。

**注**: チャンネル名の末尾の特殊文字は、Slack の @-通知ではサポートされていません。例えば、`@----critical_alerts` は機能しますが、`@--critical_alerts--` は機能しません。

#### @-メンション

通知メッセージに @-メンションを作成するには、以下のコマンドを使用します。

**@users**
: command: `<@username>`
: Notify a Slack user using their Slack username. Their username can be found in their [Slack account settings][3] under **Username**. For example: `@slack-SLACK_CHANNEL <@USERNAME>`, or `@slack-SLACK_ACCOUNT-SLACK_CHANNEL <@USERNAME>`.

**@here**
: command: `<!here>`
: Notify every online member that is a part of the channel the alert is being sent to.

**@channel**
: command: `<!channel>`
: Notify every member that is a part of the channel the alert is being sent to.

**@usergroups**
: command: `<!subteam^GROUP_ID>`
: Notify every member belonging to a user group in Slack. For example, you would use `<!subteam^12345>` for a user group with an ID of `12345`. To find the `GROUP_ID`, navigate to **More** > **Your organization** > **People** > **User groups**. Select a user group, click the ellipsis, and select **Copy group ID**. You can also [query the `usergroups.list` API endpoint][4].

メッセージテンプレート変数を使用して、@-メンションを動的に構築することもできます。例えば、レンダリングされた変数が Slack の特定のチャンネルに対応している場合

- `@slack-{{owner.name}}` は **#owner.name** のチャンネルに通知を送ります。
- `@slack-{{host.name}}` は **#host.name** チャンネルに通知を送ります。

特定のメールアドレスへの @-メンションを作成するには

- `@team-{{team.name}}@company.com` は、チームのメーリングリストにメールを送信します。

### Slack のモニターアラート

モニターアラートが Slack チャンネルに送信されると、いくつかのフィールドが含まれます。

- 通知メッセージ
- モニターのトリガーとなったクエリのスナップショット (グラフ)
- 関連タグ
- 通知を受けたユーザー名またはグループ名

To customize the content included in monitor alert messages in Slack, navigate to the [Slack integration tile][5]. For each channel, select or clear the checkbox for each monitor alert option.

{{< img src="integrations/slack/slack_monitor_options.png" alt="Monitor alert message options in the Slack integration tile" style="width:90%;" >}}

### Slack Webhook (レガシー) から Datadog for Slack へのモニターの移行

モニターがレガシーの Slack webhook を使用している場合、Slack アプリから送信されるようにモニターを更新するには 2 つの方法があります。

- **Bulk upgrade**: Bulk upgrade all of your monitors by clicking the **Upgrade** button at the top of the configuration for each of your Slack accounts in the [Slack integration tile][5].
- **Individual upgrades**: Manually add channels to the new configuration in the [Slack integration tile][5]. You may need to remove duplicate references to the same channels.

## ダッシュボード  

ダッシュボードウィジェットのスナップショットを任意の Slack チャンネルに投稿できます。サポートされているウィジェットのリストについては、[スケジュールレポート][6]を参照してください。

Slack でダッシュボードウィジェットを共有するには

- Datadog でダッシュボードウィジェットにカーソルを合わせ、`CMD + C` または `CTRL + C` を押すか、共有メニューから **Copy** ボタンをクリックし、リンクを Slack に貼り付けます。
- Slack チャンネルで、`/datadog dashboard` または `/datadog` コマンドを送信し、**Share Dashboard Widget** ボタンをクリックします。

**注:** Slack は最近、Datadog を含むサードパーティアプリのインテグレーションをまだサポートしていない Workflow Builder の新バージョンを導入しました。

{{< img src="integrations/slack/dashboard_share.mp4" alt="Slack でダッシュボードウィジェットを共有" video="true" width=90% >}}

## Home タブ

Slack の Datadog アプリの **Home** タブを使用して、スターを付けたダッシュボード、ノートブック、サービスを表示します。また、過去 24 時間以内にトリガーされたモニターのリストと、関連する Slack チャンネルを表示することもできます。複数の Datadog アカウントに所属している場合は、アカウントを切り替えてタブをフィルタリングしてください。

{{< img src="integrations/slack/datadog_homepage.mp4" alt="Datadog のホームページでお気に入りアイテムを表示し、トリガーされたモニターを確認する" video="true" width=90% >}}

## インシデント

Datadog へのアクセス権の有無に関わらず、Slack 組織内の誰でもインシデントを宣言することができます。新しいインシデントが作成されると、対応する Slack チャンネル `#incident-(unique number ID)` が作成され、新しいインシデントチャンネルの使用について伝えるメッセージがチャンネルに送信されます。チャンネルのトピックは、インシデントとともに変わります。

### インシデントコマンド

Slack から新しいインシデントを宣言するには

```
/datadog incident 
```

インシデントの状態 (重大度など) を更新するには

```
/datadog incident update
```

すべてのオープン (アクティブで安定している) インシデントをリスト表示するには

```
/datadog incident list
```

メッセージをインシデントタイムラインに送信するには、メッセージアクションコマンドを使用します (#incident チャンネルで送信されたメッセージにカーソルを合わせると表示される 3 つの縦長の点)。

{{< img src="integrations/slack/incidents2.png" alt="Slack コンフィギュレーション" style="width:60%;">}}

### グローバルインシデント更新チャンネル

グローバルインシデント更新チャンネルでは、チームは Slack ワークスペースから、組織全体にすべてのインシデントのステータスを直接公開することができます。ワークスペースで、更新を投稿するチャンネルを選択すると、チャンネルでは以下の投稿を受信します。

- 新しく宣言されたインシデント。
- 重要度、ステータスの移行、インシデントコマンダーへの変更点。
- Links to the [incident][7]'s overview page in app.
- 該当するインシデントの Slack チャンネルへの参加リンク。

グローバルインシデント更新チャンネルをセットアップするには

1. In Datadog, navigate to the [**Incidents** > **Settings** > **Integrations**][8] page.
2. In the Slack section, click the **Send all incident updates to a global channel** toggle.
3. インシデント更新を投稿する Slack ワークスペースと Slack チャンネルを選択します。

#### インシデントタスクの管理

Slack アクションおよび `/datadog` Slack コマンドを使用することで、Slack から直接インシデントタスクを作成・管理できます。インシデントタスクのコマンドはインシデントチャンネルで使用する必要があります。

##### Slack アクション

Slack アクションを使用してタスクを作成するには、インシデントチャンネルで送信されたメッセージにカーソルを合わせます。カーソルを合わせると、メッセージの右側に 3 つの点が表示され、**Add Task to Incident** でタスクをインシデントに追加することができます。

##### Slack コマンド

インシデントのタスクを作成するには、`/datadog task` コマンドを使用します。モーダルが表示され、タスクの説明を含めたり、チームメイトを割り当てたり、期限を設定したりできます。

インシデントに対して作成されたすべてのタスクのリストを表示するには、`/datadog task list` コマンドを使用します。このリストを使用して、タスクを完了としてマークしたり、再開したりします。

All tasks created can be managed on the **Remediation** tab of an incident. For more information, see [Incident Management][9].

## Enterprise Grid audit logs

Ingest events and actions that occur within your Slack Enterprise Grid.

### Start collecting Slack audit logs

Enterprise Grid 組織の所有者のみが、Slack 監査ログの収集を Datadog に認可することができます。

1. On the [Slack integration tile][5], click the **Audit Logs** tab.
2. Click **Connect Enterprise Grid** to be redirected to Slack for authorization.

### Collected events and actions

- ユーザーの作成、削除、更新などのユーザー管理イベント。これには、ユーザーロール、権限、プロファイルの変更も含まれます。
- チャネルとワークスペースの作成、変更、削除に関連するアクションを含む、ワークスペースとチャンネルの管理イベント。また、ワークスペースの設定や権限の変更も追跡します。
- ファイルのアップロード、ダウンロード、削除の追跡、Slack アプリやインテグレーションのインストール、更新、削除の監視など、ファイルとアプリの管理イベント。
- ログイン試行、パスワード変更、2 要素認証イベント、データエクスポートや機密情報へのアクセスなどのコンプライアンス関連アクションを含む、セキュリティおよびコンプライアンスイベント。
- ポリシーの更新、セキュリティ設定の変更、その他の管理上の変更など、Slack 管理者やワークスペース所有者による変更を含む管理者アクションの監査証跡。
- 共有チャンネルの作成、外部招待、ゲストアカウントのアクティビティなど、外部共有とコラボレーションイベント。

キャプチャされた各イベントは、以下のような詳細な洞察を提供します。

- Action: What activity was performed.
- Actor: イベントを生成したワークスペースのユーザー。
- Entity: アクターがアクションを起こした対象。
- Context: アクターがエンティティにアクションを起こした場所 (ワークスペースまたはエンタープライズ)。

For more information, see the [official Slack documentation][10].

## 権限

Datadog for Slack requires the following OAuth Scopes. See the [Slack permission scopes documentation][11] for more information.

### ボットトークンのスコープ

| スコープ                   | リクエスト理由                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `channels:join`          | Datadog の Slack インテグレーションタイルで構成された公開チャンネルに自動で参加します。                        |
| `channels:manage`        | Datadog Incident Management を使用して、インシデントを管理および修復するチャンネルを作成します。                           |
| `channels:read`          | Datadog の Slack インテグレーションタイルにチャンネル名のオートコンプリートの提案を提供します。                      |
| `chat:write`             | 承認されたチャンネルや会話で Datadog のアラートと通知を受け取ります。                               |
| `commands`               | Datadog のアクションを実行するために、/datadog コマンドとそのエイリアスである /dd を有効化します。                                |
| `groups:read`            | Datadog の Slack インテグレーションタイルの非公開チャンネルにチャンネル名のオートコンプリートの提案を提供します。 |
| `im:history`             | Datadog が Messages タブで、オンボーディングの指示などのメッセージを送信できるようにします。              |
| `im:read`                | ダイレクトメッセージから Datadog のアクションを実行するために、/datadog コマンドとエイリアスである /dd を有効化します。               |
| `im:write`               | Datadog アカウントに関連する Datadog ボットからのメッセージ、プロンプト、エラーを受信します。                    |
| `links:read`             | グラフやログサンプルなどの追加情報とともに、会話中の Datadog のリンクを展開します。                |
| `links:write`            | グラフやログサンプルなどの追加情報とともに、会話中の Datadog のリンクを展開します。                |
| `mpim:read`              | グループダイレクトメッセージから Datadog のアクションを実行するために、/datadog コマンドとエイリアスである /dd を有効化します。         |
| `reactions:write`        | インシデントタイムラインに追加されたメッセージに、ショートカットで絵文字のリアクションを追加します。                   |
| `team:read`              | Datadog の Slack インテグレーションタイルで、ワークスペースの状態を常に最新に保つことができます。                        |
| `users:read`             | Datadog アカウントに関連付けられた Datadog ユーザーとして、Slack からアクションを実行します。                                 |
| `users:read.email`       | Datadog の Slack 以外で作成されたインシデントのメッセージングとユーザーを追加します。                                  |
| `workflow.steps:execute` | Slack Workflow Step から Datadog のダッシュボードウィジェットを使ってメッセージを自動送信します。                         |

### オプションの Optional Bot Token Scopes

Datadog for Slack では、オプションの Bot Token Scopes を追加で有効にする必要がある機能があります。これらのスコープは、機能の有効化に基づいて動的に追加され、最初のインストール時には追加されません。

| スコープ              | リクエスト理由                                                                               |
|---------------------|----------------------------------------------------------------------------------------------|
| `channels:history`  | インシデントチャンネルからのメッセージをインシデントタイムラインに自動的に同期します。               |
| `groups:write`      | Datadog Incident Management を使用して、インシデントを管理および修復するプライベートチャンネルを作成します。 |
| `pins:write`        | インシデントチャンネルに、Datadog インシデントの関連リンクやリソースのピンを作成します。          |
| `bookmarks:write`   | 対応中のインシデントチャンネルで重要なリンクをブックマークします。                  |
| `bookmarks:read`    | 重要なリンクのブックマークは、変更したときに編集します。                                          |

### ユーザトークンのスコープ

| スコープ   | リクエスト理由                                                            |
|----------|---------------------------------------------------------------------------|
| `openid` | Datadog のアカウントと接続することで、Slack から Datadog のアクションを実行します。 |


### オプションのユーザートークンスコープ

Datadog for Slack では、オプションのユーザートークンスコープを追加で有効にする必要がある機能があります。これらのスコープは、機能の有効化に基づいて動的に追加され、最初のインストール時には追加されません。

| スコープ           | リクエスト理由                                                    |
|------------------|-------------------------------------------------------------------|
| `auditlogs:read` | Enterprise Grid の監査ログを収集し、Datadog Cloud SIEM で表示します。 |

## 収集データ

### メトリクス

Slack 用インテグレーションは、メトリクスを提供しません。

### イベント

Slack 用インテグレーションには、イベントは含まれません。

### サービスチェック

Slack 用インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://docs.datadoghq.com/monitors/configuration/
[2]: https://docs.datadoghq.com/monitors/notifications/
[3]: http://slack.com/account/settings
[4]: https://api.slack.com/methods/usergroups.list
[5]: https://app.datadoghq.com/integrations/slack
[6]: https://docs.datadoghq.com/dashboards/scheduled_reports/
[7]: https://app.datadoghq.com/incidents
[8]: https://app.datadoghq.com/incidents/settings#Integrations
[9]: https://docs.datadoghq.com/service_management/incident_management/
[10]: https://api.slack.com/admins/audit-logs-call
[11]: https://api.slack.com/scopes
[12]: https://docs.datadoghq.com/help/

