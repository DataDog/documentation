---
"categories":
- collaboration
- notifications
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Be notified of Datadog alerts and events in Microsoft Teams."
"doc_link": "https://docs.datadoghq.com/integrations/microsoft_teams/"
"draft": false
"git_integration_title": "microsoft_teams"
"has_logo": true
"integration_id": ""
"integration_title": "Microsoft Teams"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "microsoft_teams"
"public_title": "Datadog-Microsoft Teams Integration"
"short_description": "Be notified of Datadog alerts and events in Microsoft Teams."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Integrate with Microsoft Teams to:

- Be notified of Datadog alerts and events in Microsoft Teams.
- Manage incidents from within Microsoft Teams.

## Send monitor notifications to a Microsoft Teams channel

### Setup

Connect your Microsoft tenant to Datadog.

1. In Datadog, navigate to [**Integrations > Microsoft Teams**][1].
2. Click **Add Tenant**, which redirects you to Microsoft. 
3. Follow the prompts and click **OK**.

Ensure you have added the Datadog app to all teams in which you want to receive Datadog notifications.

1. In the left sidebar in Microsoft Teams, click **Apps** and search for the Datadog app.
2. Next to the **Add** button, click the drop-down arrow, then click **Add to a team**.
3. Select the team in which you want to receive Datadog notifications.
4. Click **Set up a bot**.

Once the bot has been added to the team, configure the notification handle in Datadog.

1. Under a configured tenant, click **Add Handle**. Give the handle a name, select the desired team and channel from the drop-down menus, and click **Save**.

### Connector setup (legacy)

1. Choose the `...` button next to the channel name in the list of channels and then choose **Connectors**.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_1_v2.png" alt="Microsoft Teams step 1" >}}

2. Search for Datadog and click **Configure**.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_2_v2.png" alt="Microsoft Teams step 2" >}}

3. In the connector configuration modal, copy the webhook URL.
4. In Datadog, navigate to [**Integrations > Microsoft Teams**][1].
5. On the Configuration tab, click **Add Handle**, give the handle a name, and paste the webhook URL.
6. In the connector configuration modal, click **Save**.

### 使用方法

From a Datadog monitor, send a notification to Microsoft Teams using the [`@-notification` feature][2]. Send the notification to the address `@teams-<HANDLE>`, replacing `<HANDLE>` with the name of your Microsoft Teams handle.

Note: If you have the same `@teams-<HANDLE>` notification handle name configured in both the modern and legacy configuration, notifications will be sent using the modern configuration by default. You can utilize this behavior to override legacy handles already configured in Datadog monitors to upgrade them to the modern configuration. 

## Datadog Incident Management in Microsoft Teams

### Account setup

First, install the Datadog App in Microsoft Teams: 

1. Open Microsoft Teams.
2. In the vertical toolbar, click **Apps**.
3. Search for "Datadog" and click on the tile.
4. Click **Add** to install the Datadog App. Next to the "Add" button, open the dropdown and select **Add to a team**.

{{< img src="integrations/microsoft_teams/microsoft_teams_install_datadog_in_teams_v2.png" alt="Datadog install app tile in Microsoft Teams" >}}

5. On the dropdown menu, select the team that the App should be added to, then click **Set Up** to complete the installation. 


次に、Microsoft のテナントを Datadog に接続します。

1. Datadog で、[Microsoft Teams Integration Tile][1] に移動します。
2. **Add Tenant** をクリックすると、Microsoft に移動します。
3. 画面の指示に従って、**OK** をクリックします。

Datadog Incident Management の一部の機能では、テナント上でアクションを実行するための権限が必要です。たとえば、インシデント用の新しいチームを作成する場合などです。テナント全体に対する管理者の同意を得るには、Microsoft 組織を代表して同意を与える権限を持つ人物が必要です。例えば、*Global Admin* ロールが割り当てられたユーザーが該当します。Datadog アプリケーションにテナント全体に対する管理者の同意を付与できる人物についての詳細は、[Microsoft Entra ID ドキュメント][3]をご覧ください。

同意を付与するには

1. Datadog で [Microsoft Teams インテグレーションタイル][1]に移動します。
2. Incident Management を使用したいテナントで、右側の歯車アイコンをクリックします。
3. **Authorize Tenant** をクリックすると Microsoft にリダイレクトされます。この手順を実行するには、テナント全体に対する管理者同意を与えることができるユーザーが必要です。Microsoft のユーザーが Datadog のアカウントを持っている必要はありません。
4. 画面の指示に従って、**OK** をクリックします。

### ユーザー設定

Microsoft Teams から Datadog のアクションを実行するには、Datadog と Microsoft Team のアカウントを接続する必要があります。

Microsoft Teams からアカウントを接続するには

1. Microsoft Teams を開きます。
2. 垂直ツールバーの `...` ボタンをクリックし、Datadog を選択すると、Datadog ボットとのチャットが開始されます。
3. "accounts" と入力し、エンターキーを押します。
   {{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_teams.png" alt="Microsoft Teams からのアカウント接続" >}}

4. Datadog ボットが、アカウントの接続方法について応答します。**Connect Datadog Account** をクリックします。
5. その後、Datadog ボットが、アカウントを接続するためのリンクが含まれたメッセージを送信します。リンクをクリックし、プロンプトに従います。
6. [Microsoft Teams Integration Tile][1] へと戻ります。
7. [Microsoft Teams Integration Tile][1] のプロンプトで **Create** をクリックし、アプリケーションキーを作成します。


Datadog からアカウントを接続することも可能です。

1. Datadog で、[Microsoft Teams Integration Tile][1] に移動します。
2. 表示されたテナントの中から、**Connect** をクリックします。
3. 画面の指示に従って、**OK** をクリックします。
5. [Microsoft Teams インテグレーションタイル][1]から、上記のプロンプトで **Create** をクリックしてアプリケーションキーを作成します。

{{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_datadog_v2.png" alt="Datadog Microsoft Teams インテグレーションタイルからアカウントを接続します" >}}

### 使用方法

#### ダッシュボード  

ダッシュボードウィジェットのスナップショットを任意のチームまたはチャットに投稿できます。サポートされているウィジェットのリストについては、[スケジュールレポート][4]を参照してください。

Teams でダッシュボードウィジェットを共有するには

1. Datadog でダッシュボードウィジェットにカーソルを合わせ、`CMD + C` または `CTRL + C` を押すか、共有メニューから **Copy** ボタンをクリックします。
1. リンクを Teams に貼り付けます。

{{< img src="integrations/microsoft_teams/dashboard_share.png" alt="Microsoft Teams でのダッシュボードウィジェットの共有">}}

#### インシデント

Microsoft Teams から新しいインシデントを宣言するには

1. 任意のチームで会話を開始します。
2. `@Datadog` と入力するか、`...` ボタンで **Messaging extensions** メニューを開き、**Datadog** アプリを選択します。
3. **Create an Incident** を選択します。
4. 希望の情報をフォームに入力します。
5. **作成**をクリックします。

Datadog へのアクセス権の有無を問わず、Microsoft Teams テナント内の誰でもインシデントを宣言できます。

新しいインシデントが作成されると、`incident-( 一意の番号 ID )` という名前の対応するチームが作成されます。

インシデントを更新するには、作成と同様の手順で行います。

1. インシデントチームにいながら、会話を始めます。
2. `@Datadog` と入力するか、`...` ボタンで **Messaging extensions** メニューを開き、**Datadog** アプリを選択します。
3. **Update Incident** を選択します。
4. 希望の情報をフォームに入力します。
5. **Update** をクリックします。

次を使用してオープン（アクティブで安定している）インシデントをリスト表示します。

```
@Datadog list incidents
```

インシデントチーム内のメッセージの右端にある "More actions" メニューを使用すると、そのメッセージをインシデントタイムラインに送信することができます。

#### インシデントの更新チャンネル
インシデント更新チャンネルを使用すると、関係者は Microsoft Teams から直接、すべてのインシデントのステータスを組織全体で確認することができます。これらのアップデートを投稿するチームとチャンネルをアカウントで選択すると、チャンネルは次の投稿を受け取ります。

   - 新しく宣言されたインシデント。
   - 重要度、ステータスの移行、インシデントコマンダーへの変更点。
   - アプリ内のインシデントの概要ページへのリンク。
   - インシデント専門チームへの参加リンク。

Microsoft Teams アプリがインストールされたら、**Incident Settings** ページに移動できます。ここから、**Incident Updates** Channel セクションまでスクロールダウンし、セットアップフローを開始することができます。

#### インシデントチャンネルの設定方法

1. [Incidents Settings][5] に移動します。
2. Under the Microsoft Teams section, select your connected Microsoft Teams tenant.
3. Toggle on **Automatically create a Microsoft Teams channel for every incident**.
4. Select the Team in which you want to automatically create new channels.
5. 設定を保存します。

{{< img src="integrations/microsoft_teams/ms_teams_incident_updates_v2" alt="Microsoft Teams Incident Update Channel Settings." >}}

## データ収集

### メトリクス

Microsoft Teams インテグレーションは、メトリクスを提供しません。

### イベント

Microsoft Teams インテグレーションには、イベントは含まれません。

### サービスチェック

Microsoft Teams インテグレーションには、サービスのチェック機能は含まれません。

## 権限

Datadog for Microsoft Teams には、以下の権限が必要です。詳細については、[Microsoft Graph 権限リファレンス][6]を参照してください。

| API / 権限名               | タイプ        | リクエスト理由                                                                                  |
|--------------------------------------|-------------|-------------------------------------------------------------------------------------------------|
| `ChannelSettings.ReadWrite.All`      | Application | Datadog Incident Management を使用して、インシデントを修復するためのチャンネルを作成および変更します。 |
| `GroupMember.Read.All`               | Application | Datadog Incident Management の構成に、チーム名とチャンネル名のオートコンプリート候補を提供します。        |
| `Team.Create`                        | Application | Datadog Incident Management を使用して、インシデントを管理および修復するチームを作成します。               |
| `TeamMember.ReadWrite.All`           | Application | Datadog Incident Management でインシデントを管理するユーザーを Teams に追加します。 |
| `TeamsAppInstallation.ReadWrite.All` | Application | Datadog Incident Management によって作成されたチームに Datadog アプリを追加します。  |
| `TeamSettings.ReadWrite.All`         | Application | Datadog Incident Management が、インシデントチームの状態を最新の状態に保つようにします。            |

## トラブルシューティング

### SSO の使用

次の手順を使用して、新しいチャンネルコネクターを設定します。

1. Datadog にログインし、セットアップ手順 1 および 2 を完了します。

2. セットアップ手順 3 で MS Teams ページから Datadog にリダイレクトされたら、新しいタブを開き、SSO で Datadog にログインします。次に、セットアップ手順 4 を個別に実行します。

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://docs.datadoghq.com/monitors/notifications/#notification
[3]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[4]: https://docs.datadoghq.com/dashboards/scheduled_reports/
[5]: https://app.datadoghq.com/incidents/settings#Integrations
[6]: https://learn.microsoft.com/en-us/graph/permissions-reference
[7]: https://docs.datadoghq.com/help/

