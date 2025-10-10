---
aliases:
- /ja/integrations/hipchat/
categories:
- collaboration
- notifications
custom_kind: インテグレーション
dependencies: []
description: Datadog のアラートとグラフをチームの Slack チャンネルに送信。
doc_link: https://docs.datadoghq.com/integrations/slack/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/slack-content-pack/
  tag: ブログ
  text: Datadog Cloud SIEM で Slack 監査ログを監視
git_integration_title: slack
has_logo: true
integration_id: ''
integration_title: Slack
integration_version: ''
is_public: true
manifest_version: '1.0'
name: slack
public_title: Datadog-Slack インテグレーション
short_description: Datadog のアラートとグラフをチームの Slack チャンネルに送信。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Slack を Datadog に接続し、次の方法でチームのコラボレーションを支援します。

- Slack のプライベートチャンネルまたはパブリックチャンネルでグラフを共有できます。
- Slack 内で Datadog からのアラートや通知を受けることができます。
- トリガーとなるモニターをミュートし、Slack からインシデントを宣言できます。
- ログイベント、トレース、ダッシュボードウィジェットのプレビューを表示するリンクを自動的に展開します。

## セットアップ

{{< tabs >}}

{{% tab "Datadog for Slack" %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    <a href="https://www.datadoghq.com/blog/datadog-slack-app/">Datadog for Slack</a> は {{< region-param key="dd_site_name" >}} サイトでは利用できません。US1-FED サイトの Slack に通知を送信するには、Slack webhook (レガシー) を使用してください。
</div>
{{% /site-region %}}

### Datadog アプリを Slack ワークスペースにインストールします。

1. Slack の[インテグレーションタイル][1]で、**Configuration** をクリックし、次に **Connect Slack Account** をクリックします。
2. Datadog に Slack ワークスペースへのアクセス権限を付与するには、**Allow** をクリックしてください。この変更を承認するには、Slack ワークスペースの管理者が必要になる場合があります。アプリの権限の内訳とそのリクエストの理由については、[権限][2]を参照してください。

### 通知を受信できる Slack チャンネルの構成

1. Datadog からの通知を受信する Slack チャンネルを構成するには、[Slack インテグレーションタイル][1]を使用してください。
2. **プライベートチャンネル**を構成するには、Datadog アプリがそのチャンネルのメンバーである必要があります。Slack でチャンネルに移動し、`/invite @Datadog` を使用して、Datadog アプリをメンバーに追加してください。このステップが完了すると、チャンネルは自動的に [Slack インテグレーションタイル][1]に追加されます。

Slack インテグレーションがインストールされると、任意の Slack チャンネルで `/datadog` コマンドを使用できるようになります。利用できるアクションはチャンネルによって異なります。利用可能なコマンドをすべて表示するには `/datadog help` を使用してください。また、`/dd` エイリアスを使って `/datadog` コマンドを実行することも可能です。


[1]: https://app.datadoghq.com/integrations/slack
[2]: https://docs.datadoghq.com/ja/integrations/slack#permissions
{{% /tab %}}

{{% tab "Slack Webhook (レガシー)" %}}

### インストール

Datadog サイトの [Slack インテグレーションタイル][1]を使用してインテグレーションをインストールします。

### 構成

1. Slack アカウントで、[Datadog (レガシー) アプリ][2]にアクセスします。
2. **Install** > **Add Integration** をクリックし、次に Slack の **Webhook URL** をコピーします。
3. [Slack インテグレーションタイル][1]で、**Configuration** をクリックし、**Add Account** をクリックします。
4. 選択した **Slack アカウント名**を入力します。
5. **Slack Account Hook** フィールドに webhook URL を貼り付けます。
6. **Save** をクリックします。
7. Slack の**ポスト先のチャンネル**を追加します。
  {{< img src="integrations/slack/slack_configuration.png" alt="Slack コンフィギュレーション" >}}

また、[モニター][3]や[イベント][4]から Slack に通知を送ることもできます。


[1]: https://app.datadoghq.com/integrations/slack
[2]: https://slack.com/apps/A0F7XDT7F-datadog-legacy
[3]: https://docs.datadoghq.com/ja/monitors/notifications/
[4]: https://docs.datadoghq.com/ja/service_management/events/explorer/notifications/
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

*@users**
: コマンド: `<@username>`
: Slack のユーザー名を使って Slack ユーザーに通知します。ユーザー名は [Slack アカウント設定][3]の **Username** にあります。例: `@slack-SLACK_CHANNEL <@USERNAME>`、または `@slack-SLACK_ACCOUNT-SLACK_CHANNEL <@USERNAME>`

**@here**
: コマンド: `<!here>`
: アラートが送信されているチャンネルに参加しているすべてのオンラインメンバーに通知します。

**@channel**
: コマンド: `<!channel>`
: アラートが送信されているチャンネルに参加しているすべてのメンバーに通知します。

**@usergroups**
: コマンド: `<!subteam^GROUP_ID>`
: Slack のユーザーグループに属するメンバー全員に通知します。例えば、ID が `12345` のユーザーグループには `<!subteam^12345>` を使います。`GROUP_ID` を見つけるには、**More** > **Your organization** > **People** > **User groups** に移動します。ユーザーグループを選択し、省略記号をクリックして、**Copy group ID** を選択します。また、[`usergroups.list` API エンドポイントをクエリする][4]こともできます。

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

Slack のモニターアラートメッセージに含まれるコンテンツをカスタマイズするには、[Slack インテグレーションタイル][5]に移動します。チャンネルごとに、各モニターアラートオプションのチェックボックスを選択またはクリアします。

{{< img src="integrations/slack/slack_monitor_options.png" alt="Slack インテグレーションタイルのモニターアラートメッセージオプション" style="width:90%;" >}}

### Slack Webhook (レガシー) から Datadog for Slack へのモニターの移行

モニターがレガシーの Slack webhook を使用している場合、Slack アプリから送信されるようにモニターを更新するには 2 つの方法があります。

- **一括アップグレード**: [Slack インテグレーションタイル][5]の各 Slack アカウントの構成の上部にある **Upgrade** ボタンをクリックして、すべてのモニターを一括アップグレードします。
- **個別のアップグレード**: [Slack インテグレーションタイル][5]の新しい構成にチャンネルを手動で追加します。同じチャンネルへの重複参照を削除する必要があるかもしれません。

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
- アプリ内の[インシデント][7]の概要ページへのリンク。
- 該当するインシデントの Slack チャンネルへの参加リンク。

グローバルインシデント更新チャンネルをセットアップするには

1. Datadog で、[**Incidents** > **Settings** > **Integrations**][8] ページに移動します。
2. Slack セクションで、**Send all incident updates to a global channel** (すべてのインシデント更新をグローバルチャンネルに送信する) トグルをクリックします。
3. インシデント更新を投稿する Slack ワークスペースと Slack チャンネルを選択します。

#### インシデントタスクの管理

Slack アクションおよび `/datadog` Slack コマンドを使用することで、Slack から直接インシデントタスクを作成・管理できます。インシデントタスクのコマンドはインシデントチャンネルで使用する必要があります。

##### Slack アクション

Slack アクションを使用してタスクを作成するには、インシデントチャンネルで送信されたメッセージにカーソルを合わせます。カーソルを合わせると、メッセージの右側に 3 つの点が表示され、**Add Task to Incident** でタスクをインシデントに追加することができます。

##### Slack コマンド

インシデントのタスクを作成するには、`/datadog task` コマンドを使用します。モーダルが表示され、タスクの説明を含めたり、チームメイトを割り当てたり、期限を設定したりできます。

インシデントに対して作成されたすべてのタスクのリストを表示するには、`/datadog task list` コマンドを使用します。このリストを使用して、タスクを完了としてマークしたり、再開したりします。

作成されたすべてのタスクは、インシデントの **Remediation** タブで管理できます。詳細については、[Incident Management][9] を参照してください。

## 権限

Datadog for Slack は、以下の OAuth Scope を必要とします。詳しくは、[Slack の権限スコープに関するドキュメント][10]を参照してください。

### ボットトークンのスコープ

| スコープ                   | リクエスト理由                                                                                                               |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `channels:join`          | Datadog の Slack インテグレーションタイルで構成された公開チャンネルに自動で参加します。                                      |
| `channels:manage`        | Datadog Incident Management を使用して、インシデントを管理および修復するチャンネルを作成します。                                         |
| `channels:read`          | Datadog の Slack インテグレーションタイルにチャンネル名のオートコンプリートの提案を提供します。                                    |
| `chat:write`             | 承認されたチャンネルや会話で Datadog のアラートと通知を受け取ります。                                             |
| `commands`               | Datadog のアクションを実行するために、/datadog コマンドとそのエイリアスである /dd を有効化します。                                              |
| `groups:read`            | Datadog の Slack インテグレーションタイルの非公開チャンネルにチャンネル名のオートコンプリートの提案を提供します。               |
| `im:history`             | Datadog が Messages タブで、オンボーディングの指示などのメッセージを送信できるようにします。                            |
| `im:read`                | ダイレクトメッセージから Datadog のアクションを実行するために、/datadog コマンドとエイリアスである /dd を有効化します。                             |
| `im:write`               | Datadog アカウントに関連する Datadog ボットからのメッセージ、プロンプト、エラーを受信します。                                  |
| `links:read`             | グラフやログサンプルなどの追加情報とともに、会話中の Datadog のリンクを展開します。                              |
| `links:write`            | グラフやログサンプルなどの追加情報とともに、会話中の Datadog のリンクを展開します。                              |
| `mpim:read`              | グループダイレクトメッセージから Datadog のアクションを実行するために、/datadog コマンドとエイリアスである /dd を有効化します。                       |
| `reactions:write`        | インシデントタイムラインに追加されたメッセージに、ショートカットで絵文字のリアクションを追加します。                                 |
| `remote_files:read`      | 近日対応予定: 構成済みの Slack チャンネルで共有された、Datadog がホストするダッシュボードなどの PDF レポートを閲覧できるようになります。 |
| `remote_files:share`     | 近日対応予定: Datadog がホストするダッシュボードなどの PDF レポートを、構成済みの Slack チャンネルと共有できるようになります。                  |
| `remote_files:write`     | 近日対応予定: Datadog がホストするダッシュボードなどの PDF レポートへのリンクを、構成済みのワークスペースにアップロードできるようになります。             |
| `team:read`              | Datadog の Slack インテグレーションタイルで、ワークスペースの状態を常に最新に保つことができます。                                      |
| `users:read`             | Datadog アカウントに関連付けられた Datadog ユーザーとして、Slack からアクションを実行します。                                               |
| `users:read.email`       | Datadog の Slack 以外で作成されたインシデントのメッセージングとユーザーを追加します。                                                |
| `workflow.steps:execute` | Slack Workflow Step から Datadog のダッシュボードウィジェットを使ってメッセージを自動送信します。                                       |

### オプションの Optional Bot Token Scopes

Datadog for Slack では、オプションの Bot Token Scopes を追加で有効にする必要がある機能があります。これらのスコープは、機能の有効化に基づいて動的に追加され、最初のインストール時には追加されません。

| スコープ             | リクエスト理由                                                                               |
|--------------------|----------------------------------------------------------------------------------------------|
| `channels:history` | インシデントチャンネルからのメッセージをインシデントタイムラインに自動的に同期します。               |
| `groups:write`     | Datadog Incident Management を使用して、インシデントを管理および修復するプライベートチャンネルを作成します。 |
| `pins:write`       | インシデントチャンネルに、Datadog インシデントの関連リンクやリソースのピンを作成します。          |
| `bookmarks:write`  | 対応中のインシデントチャンネルで重要なリンクをブックマークします。                 |
| `bookmarks:read`   | 重要なリンクのブックマークは、変更したときに編集します。                                         |

### ユーザトークンのスコープ

| スコープ   | リクエスト理由                                                            |
|----------|---------------------------------------------------------------------------|
| `openid` | Datadog のアカウントと接続することで、Slack から Datadog のアクションを実行します。 |


### オプションのユーザートークンスコープ

Datadog for Slack では、オプションのユーザートークンスコープを追加で有効にする必要がある機能があります。これらのスコープは、機能の有効化に基づいて動的に追加され、最初のインストール時には追加されません。

| スコープ           | リクエスト理由                                                    |
|------------------|-------------------------------------------------------------------|
| `auditlogs:read` | Enterprise Grid の監査ログを収集し、Datadog Cloud SIEM で表示します。 |

## Enterprise Grid の監査ログ

Slack Enterprise Grid 内で発生したイベントやアクションを取り込みます。

### Slack 監査ログの収集を開始する

Enterprise Grid 組織の所有者のみが、Slack 監査ログの収集を Datadog に認可することができます。

1. [Slack インテグレーションタイル][5]で、**Audit Logs** タブをクリックします。
2. **Connect Enterprise Grid** をクリックすると、認可のために Slack にリダイレクトされます。

### 収集したイベントとアクション

- ユーザーの作成、削除、更新などのユーザー管理イベント。これには、ユーザーロール、権限、プロファイルの変更も含まれます。
- チャネルとワークスペースの作成、変更、削除に関連するアクションを含む、ワークスペースとチャンネルの管理イベント。また、ワークスペースの設定や権限の変更も追跡します。
- ファイルのアップロード、ダウンロード、削除の追跡、Slack アプリやインテグレーションのインストール、更新、削除の監視など、ファイルとアプリの管理イベント。
- ログイン試行、パスワード変更、2 要素認証イベント、データエクスポートや機密情報へのアクセスなどのコンプライアンス関連アクションを含む、セキュリティおよびコンプライアンスイベント。
- ポリシーの更新、セキュリティ設定の変更、その他の管理上の変更など、Slack 管理者やワークスペース所有者による変更を含む管理者アクションの監査証跡。
- 共有チャンネルの作成、外部招待、ゲストアカウントのアクティビティなど、外部共有とコラボレーションイベント。

キャプチャされた各イベントは、以下のような詳細な洞察を提供します。

- アクション: 実行されたアクティビティ。
- Actor: イベントを生成したワークスペースのユーザー。
- Entity: アクターがアクションを起こした対象。
- Context: アクターがエンティティにアクションを起こした場所 (ワークスペースまたはエンタープライズ)。

詳しくは [Slack 公式ドキュメント][11]をご覧ください。

## 収集データ

### メトリクス

Slack 用インテグレーションは、メトリクスを提供しません。

### イベント

Slack 用インテグレーションには、イベントは含まれません。

### サービスチェック

Slack 用インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/monitors/configuration/
[2]: https://docs.datadoghq.com/ja/monitors/notifications/
[3]: http://slack.com/account/settings
[4]: https://api.slack.com/methods/usergroups.list
[5]: https://app.datadoghq.com/integrations/slack
[6]: https://docs.datadoghq.com/ja/dashboards/scheduled_reports/
[7]: https://app.datadoghq.com/incidents
[8]: https://app.datadoghq.com/incidents/settings#Integrations
[9]: https://docs.datadoghq.com/ja/service_management/incident_management/
[10]: https://api.slack.com/scopes
[11]: https://api.slack.com/admins/audit-logs-call
[12]: https://docs.datadoghq.com/ja/help/