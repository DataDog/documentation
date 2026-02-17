---
categories:
- コラボレーション
- notifications
custom_kind: インテグレーション
dependencies: []
description: Microsoft Teams で Datadog アラートとイベントの通知を受信
doc_link: https://docs.datadoghq.com/integrations/microsoft_teams/
draft: false
git_integration_title: microsoft_teams
has_logo: true
integration_id: ''
integration_title: Microsoft Teams
integration_version: ''
is_public: true
manifest_version: '1.0'
name: microsoft_teams
public_title: Datadog-Microsoft Teams インテグレーション
short_description: Microsoft Teams で Datadog アラートとイベントの通知を受信
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Microsoft Teams と統合して、以下のことができます。

- Microsoft Teams で Datadog アラートとイベントの通知を受信
- Microsoft Teams の中からインシデントを管理することができます。
- Microsoft Teams から直接トリガーされたモニターをミュートします。

{{< site-region region="gov" >}}
<div class="alert alert-danger">テナントベースのインテグレーション (このインテグレーションの非レガシーバージョン) は、 US1-FED サイトではサポートされていません。</div>
{{< /site-region >}}

## Microsoft Teams のチャンネルにモニター通知を送信する

### セットアップ

あなたの Microsoft テナントを Datadog に接続します。

1. Datadog で、[**Integrations > Microsoft Teams**][1] に移動します。
2. **Add Tenant** をクリックすると、Microsoft にリダイレクトされます。
3. 指示に従って **OK** をクリックします。

Datadog の通知を受信させたいすべてのチームに Datadog アプリを追加したことを確認してください。

1. Microsoft Teams の左側のサイドバーで、**Apps** をクリックし、Datadog アプリを検索します。
2. **Add** ボタンの横にあるドロップダウン矢印をクリックし、**Add to a team** をクリックします。
3. Datadog の通知を受信させたいチームを選択します。
4. **Set up a bot** をクリックします。

ボットがチームに追加されたら、Datadog で通知ハンドルを構成します。

1. 構成されたテナントの下で、**Add Handle** をクリックします。ハンドルに名前を付け、ドロップダウンメニューから希望のチームとチャンネルを選択し、**Save** をクリックします。

{{< site-region region="us,ap1,us5,us3,eu" >}}
### レガシーコネクタをテナントベースのインテグレーションに移行する

Microsoft は、 Microsoft Teams の Office 365 コネクタが非推奨となり、2025 年 12 月 31 日 (以前は 2024 年 10 月 1 日) に動作を停止すると発表しました。新しいコネクタの作成は 2024 年 8 月 15 日からブロックされます。詳細については、同社の[ブログ投稿][1]を参照してください。

現在レガシーの Office 365 コネクタを使用しているすべての通知ハンドルを Datadog のテナントベースのインテグレーションに移行するには

1. [セットアップ手順](#setup)に従って、Microsoft テナントを Datadog に接続します。
2. レガシーの Office 365 コネクタが構成されているすべてのチームに Datadog アプリを追加します。
3. [Microsoft Teams Integration Tile][2] 内の各レガシー通知コネクタハンドルについて、
1. 構成されたテナントの下で、**Add Handle** をクリックします。
2. 新しいハンドルにコネクタハンドルと同じ名前を付けます。例えば、あなたのレガシーコネクタハンドルが `channel-123` という名前の場合、テナント構成で同じ `channel-123` という名前の新しいハンドルを作成します。
3. レガシーコネクタハンドルがメッセージを送信していたドロップダウンメニューから、希望のチームとチャンネルを選択し、**Save** をクリックします。この新しいハンドルは既存のレガシーコネクタハンドルをオーバーライドします。

[1]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[2]: https://app.datadoghq.com/integrations/microsoft-teams
{{< /site-region >}}

### コネクタ設定 (レガシー)
<div class="alert alert-info">
レガシー通知ハンドルは、新しいセットアップの影響を受けません。<em>ただし</em>、同じ <code>@teams-HANDLE_NAME</code> を使用する場合は、新しい構成がレガシー構成をオーバーライドします。
</div>

1. チャンネルのリストで、チャンネル名の横にある `...` ボタンを選択し、**Connectors** を選択します。

    {{< img src="integrations/microsoft_teams/microsoft_team_step_1_v2.png" alt="Microsoft Teams 手順 1" >}}

2. Datadog を検索し、**Configure** をクリックします。

    {{< img src="integrations/microsoft_teams/microsoft_team_step_2_v2.png" alt="Microsoft Teams 手順 2" >}}

3. コネクタ構成モーダルで、Webhook URL をコピーします。
4. Datadogで、[**Integrations > Microsoft Teams**][1] の順に移動します。
5. Configuration タブで、**Add Handle** をクリックしてハンドルに名前を付け、webhook URL を貼り付けます。
6. コネクタ構成モーダルで、**Save** をクリックします。

### 使用方法

Datadog モニターから、[`@-notification` 機能][2]を使用して Microsoft Teams に通知を送信します。通知を `@teams-<HANDLE>` のアドレスに送信します。なお、`<HANDLE>` はあなたの Microsoft Teams ハンドル名に置き換えてください。Microsoft Teams からトリガーされたモニターをミュートするには、**Mute Monitor** をクリックし、**Mute Duration** を選択して、**Mute** をクリックします。

## Microsoft Teams における Datadog Incident Management

### アカウント設定

まず、Microsoft Teams に Datadog アプリをインストールします。

1. Microsoft Teams を開きます。
2. 垂直ツールバーの **Apps** をクリックします。
3. "Datadog" を検索し、タイルをクリックします。
4. Datadog アプリをインストールするには、 **Add** をクリックします。「Add」ボタンの隣にあるドロップダウンメニューを開き、 **Add to a team** を選択します。

{{< img src="integrations/microsoft_teams/microsoft_teams_install_datadog_in_teams_v2.png" alt="Microsoft Teams の Datadog インストールアプリタイル" >}}

5. ドロップダウンメニューで、アプリを追加するチームを選択し、 **Set Up** をクリックしてインストールを完了します。


次に、Microsoft のテナントを Datadog に接続します。

1. Datadog で、[Microsoft Teams Integration Tile][1] に移動します。
2. **Add Tenant** をクリックすると、Microsoft に移動します。
3. 画面の指示に従って、**OK** をクリックします。

Datadog Incident Management の一部の機能では、テナント上でアクションを実行するための権限が必要です。たとえば、インシデント用の新しいチームを作成する場合などです。テナント全体に対する管理者の同意を得るには、Microsoft 組織を代表して同意を与える権限を持つ人物が必要です。例えば、*Global Admin* ロールが割り当てられたユーザーが該当します。Datadog アプリケーションにテナント全体に対する管理者の同意を付与できる人物についての詳細は、[Microsoft Entra ID ドキュメント][3]をご覧ください。

同意を付与するには

1. Datadog で [Microsoft Teams インテグレーションタイル][1]に移動します。
2. Incident Management を使用したいテナントで、右側の歯車アイコンをクリックします。
3. **Authorize Tenant** をクリックすると、Microsoft にリダイレクトされます。テナント全体の管理者同意を付与できるユーザーが、この手順を実行する必要があります。このユーザーは Datadog アカウントを持っている必要がありますが、Datadog アカウントで使用するメールアドレスは Microsoft アカウントのメールアドレスと一致する必要はありません。
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
5. **Create** をクリックします。

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
2. Microsoft Teams セクションで、接続している Microsoft Teams テナントを選択します。
3. **Automatically create a Microsoft Teams channel for every incident** (インシデントごとに Microsoft Teams チャンネルを自動的に作成する) をオンに切り替えます。
4. 新しいチャンネルを自動的に作成するチームを選択します。
5. 設定を保存します。

{{< img src="integration/microsoft_teams/ms_teams_incident_updates_v2.png" alt="Microsoft Teams インシデント更新チャンネル設定" >}}

## データ収集

### メトリクス

Microsoft Teams インテグレーションは、メトリクスを提供しません。

### イベント

Microsoft Teams インテグレーションには、イベントは含まれません。

### サービスチェック

Microsoft Teams インテグレーションには、サービスのチェック機能は含まれません。

## 権限

Microsoft Teams インテグレーションは、追加されたチームに対して以下の権限を受け取ります。詳細については、[Microsoft アプリ権限リファレンス][6]を参照してください。

| 権限の説明                                                                                                                                                                   | リクエスト理由                                                                           |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| 私が提供するメッセージとデータを受信します。                                                                                                                                          | ユーザーは、Datadog アプリと個人チャットでやり取りすることができます。                                |
| 私にメッセージや通知を送信します。                                                                                                                                                      | ユーザーは、Datadog アプリと個人チャットでやり取りすることができます。                                |
| 名前、メールアドレス、会社名、使用言語など、私のプロフィール情報にアクセスします。                                                                                      | Datadog UI 内で Microsoft Teams の通知やワークフローを構成することができます。 |
| チームやチャットのメンバーがチャンネルやチャットで提供するメッセージやデータを受信します。                                                                                                  | ユーザーは、@Datadog コマンドを通して Datadog とやり取りすることができます。                           |
| チャンネルやチャットでメッセージや通知を送信します。                                                                                                                                    | 構成されたターゲットに Datadog 通知を送信します。                                        |
| チームやチャットの情報 (チーム名やチャット名、チャンネルリスト、名簿 (チームやチャットメンバーの名前やメールアドレスを含む)) にアクセスし、それを使って連絡を取ることができます。 | ユーザーが Datadog 内で Microsoft Teams の通知やワークフローを構成できるようにします。 |


Microsoft Teams インテグレーションで Incident Management 機能を使用するには、追加の権限が必要です。これらは、テナント全体の権限を持つユーザーによって認可される必要があります (詳細な手順については、 [Microsoft Teams の Datadog Incident Management: アカウントのセットアップ](#account-setup)を参照してください)。これらの権限の詳細については、 [Microsoft Graph 権限リファレンス][7]を参照してください。

<table>
  <tr>
    <td style="width:40%;"><strong>API / 権限の名前</strong></td>
    <td style="width:15%;"><strong>タイプ</strong></td>
    <td><strong>リクエスト理由</strong></td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelSettings.ReadWrite.All</code></td>
    <td style="width:15%;">アプリケーション</td>
    <td>Datadog Incident Management を使用してインシデントを解決するために、チャンネルを作成および変更します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>GroupMember.Read.All</code></td>
    <td style="width:15%;">アプリケーション</td>
    <td>Datadog Incident Management の構成用に、チームおよびチャンネル名のオートコンプリート候補を提供します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Team.Create</code></td>
    <td style="width:15%;">アプリケーション</td>
    <td>Datadog Incident Management を使用してインシデントを管理および解決するために、チームを作成します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamMember.ReadWrite.All</code></td>
    <td style="width:15%;">アプリケーション</td>
    <td>Datadog Incident Management を使用してインシデントを管理するために、ユーザーをチームに追加します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsAppInstallation.ReadWrite.All</code></td>
    <td style="width:15%;">アプリケーション</td>
    <td>Datadog Incident Management によって作成されたチームに Datadog アプリを追加します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamSettings.ReadWrite.All</code></td>
    <td style="width:15%;">アプリケーション</td>
    <td>インシデントチームの状態で Datadog Incident Management を最新に保ちます。</td>
  </tr>
</table>

## トラブルシューティング

### SSO の使用

次の手順を使用して、新しいチャンネルコネクターを設定します。

1. Datadog にログインし、セットアップ手順 1 および 2 を完了します。

2. セットアップ手順 3 で MS Teams ページから Datadog にリダイレクトされたら、新しいタブを開き、SSO で Datadog にログインします。次に、セットアップ手順 4 を個別に実行します。

### インテグレーションタイルにチームが表示されないのはなぜですか？
テナントを Datadog に追加する前にボットをチームに追加した場合、Datadog はチーム参加イベントを見逃し、チームの存在を知ることができません。
以下のいずれかを試すことができます。
- そのチームの任意の標準チャンネルに `@Datadog sync` を投稿して、チームの標準チャンネルを Datadog と同期します。
1. 同期したい Team 内の標準チャンネルに移動します。
2. そのチャンネルで投稿を開始します。
3. チャンネルに `@Datadog sync` を投稿し、操作が成功したことを示す確認メッセージがスレッドに表示されるのを待ちます。
- Datadog アプリをチームから削除し、再度追加します。**注**: この操作により、そのチームの構成コネクタが削除されます。そのチームのすべてのコネクタをテナントベースのインテグレーションに移動する準備ができたら、このアクションを実行してください。
1. 左サイドバーのチーム名の横にある 3 つの点をクリックします。
2. **Manage Team** をクリックします。
3. **Apps** というラベルの付いたタブに移動します。
4. Datadog アプリの横にある 3 つの点をクリックします。
5. **Remove** をクリックします。
6. [セットアップ手順](#setup)に従って Datadog アプリを追加します。

### プライベートチャンネルはボットでサポートされていますか？
[Microsoft Teams][8] のプライベートチャンネルの制限により、プライベートチャンネルはボットでサポートされていません。


ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://docs.datadoghq.com/ja/monitors/notifications/#notification
[3]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[4]: https://docs.datadoghq.com/ja/dashboards/scheduled_reports/
[5]: https://app.datadoghq.com/incidents/settings#Integrations
[6]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[7]: https://learn.microsoft.com/en-us/graph/permissions-reference
[8]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[9]: https://docs.datadoghq.com/ja/help/