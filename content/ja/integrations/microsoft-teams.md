---
aliases:
- /ja/integrations/microsoft_teams
app_id: microsoft-teams
categories:
- collaboration
- network
- notifications
custom_kind: integration
description: Microsoft Teams は Office 365 における、ユーザー、コンテンツ、ツールを統合するチャット ベースのワーク スペースです。
media: []
title: Microsoft Teams
---
## 概要

Microsoft Teams と統合して、以下のことができます。

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

- Microsoft Teams で Datadog アラートとイベントの通知を受信
- Microsoft Teams の中からインシデントを管理することができます。
- Microsoft Teams から直接トリガーされたモニターをミュートします。
  {{< /site-region >}}

{{< site-region region="gov" >}}

- Microsoft Teams で Datadog アラートとイベントの通知を受信
- Microsoft Teams から直接トリガーされたモニターをミュートします。
  {{< /site-region >}}

{{< site-region region="gov" >}}
**注**: お使いの Datadog アカウントはセキュアな US1-FED 環境でホストされていますが、Microsoft Teams 環境のセキュリティ (アクセス、権限、データ保護を含む) の管理はお客様の責任です。
{{< /site-region >}}

## セットアップ

{{< tabs >}}

{{% tab "Datadog アプリ (推奨)" %}}

### Microsoft Teams チャンネルへのモニター通知の送信

Microsoft のテナントを Datadog に接続します。

1. Datadog で、[**Integrations > Microsoft Teams**](https://app.datadoghq.com/integrations/microsoft-teams) に移動します。
1. **Add Tenant** をクリックすると、Microsoft に移動します。
1. 画面の指示に従って、**OK** をクリックします。

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Datadog の通知を受信したいすべてのチームに Datadog アプリを追加済みであることを確認します。
{{< /site-region >}}

{{< site-region region="gov" >}}
Datadog の通知を受信したいすべてのチームに Datadog for Government アプリを追加済みであることを確認します。
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

1. Microsoft Teams を開きます。
1. 垂直ツールバーの **Apps** をクリックします。
1. "Datadog" を検索し、**Open** をクリックします。
1. 開いたモーダルで、アプリを追加するチームのプライマリ チャネルを選択します。インストールを完了するには、**Go** をクリックします。
   {{< /site-region >}}

{{< site-region region="gov" >}}

1. Microsoft Teams を開きます。
1. 垂直ツールバーの **Apps** をクリックします。
1. "Datadog for Government" を検索し、**Open** をクリックします。
1. 開いたモーダルで、アプリを追加するチームのプライマリ チャネルを選択します。インストールを完了するには、**Go** をクリックします。
   {{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
{{< img src="integrations/microsoft_teams/microsoft_teams_add_app_to_team.png" alt="Microsoft Teams でアプリをチームに追加" >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< img src="integrations/microsoft_teams/microsoft_teams_add_gov_app_to_team.png" alt="Microsoft Teams でアプリをチームに追加" >}}
{{< /site-region >}}

ボットをチームに追加したら、Datadog で通知ハンドルを構成します。

1. 構成されたテナントの下で、**Add Handle** をクリックします。ハンドルに名前を付け、ドロップダウンメニューから希望のチームとチャンネルを選択し、**Save** をクリックします。

### 旧来コネクタのテナントベースインテグレーションへの移行

Microsoft は、Microsoft Teams 向け Office 365 コネクタの非推奨化を発表しました。これには次の影響があります:

- すべての Datadog コネクタは 2025 年 1 月 31 日に機能しなくなります。
- [更新済み URL](https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url) のない Incoming Webhook コネクタは 2025 年 1 月 31 日に機能しなくなります。
- すべてのコネクタは 2025 年 12 月 31 日に機能しなくなります (以前は 2024 年 10 月 1 日)。

詳細は、Microsoft の [ブログ記事](https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/) を参照してください。

レガシーな Office 365 コネクタを現在使用している通知ハンドルを Datadog のテナント ベースのインテグレーションに移行するには:

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

1. [セットアップ手順](#setup) に従って Microsoft テナントを Datadog に接続します。
1. レガシーな Office 365 コネクタが構成されているすべてのチームに Datadog アプリを追加します。
1. [Microsoft Teams Integration Tile](https://app.datadoghq.com/integrations/microsoft-teams) 内の各レガシー通知コネクタ ハンドルについて:
   1. 構成済みのテナントで **Add Handle** をクリックします。
   1. 新しいハンドルに、コネクタハンドルと同じ名前を付けます。例えば、旧来のコネクタハンドルの名前が `channel-123` の場合、テナント構成に `channel-123` という名前で新しいハンドルを作成します。
   1. 旧来のコネクタハンドルがメッセージを送信していたドロップダウンメニューから希望するチームとチャンネルを選択し、**Save** をクリックします。この新しいハンドルは既存の旧来のコネクタハンドルをオーバーライドします。

{{< /site-region >}}

{{< site-region region="gov" >}}

1. [セットアップ手順](#setup) に従って Microsoft テナントを Datadog に接続します。
1. レガシーな Office 365 コネクタが構成されているすべてのチームに Datadog for Government アプリを追加します。
1. [Microsoft Teams Integration Tile](https://app.datadoghq.com/integrations/microsoft-teams) 内の各レガシー通知コネクタ ハンドルについて:
   1. 構成済みのテナントで **Add Handle** をクリックします。
   1. 新しいハンドルに、コネクタハンドルと同じ名前を付けます。例えば、旧来のコネクタハンドルの名前が `channel-123` の場合、テナント構成に `channel-123` という名前で新しいハンドルを作成します。
   1. 旧来のコネクタハンドルがメッセージを送信していたドロップダウンメニューから希望するチームとチャンネルを選択し、**Save** をクリックします。この新しいハンドルは既存の旧来のコネクタハンドルをオーバーライドします。

{{< /site-region >}}

### Usage

Datadog モニターから、[`@-notification` 機能](https://app.datadoghq.com/integrations/microsoft-teams) を使用して Microsoft Teams に通知を送信します。通知はアドレス `@teams-<HANDLE>` 宛てに送信します。`<HANDLE>` は Microsoft Teams ハンドル名に置き換えます。Microsoft Teams からトリガーされたモニターをミュートするには、**Mute Monitor** をクリックし、**Mute Duration** を選択して、**Mute** をクリックします。

#### ユーザー メンション

ユーザー メンションを使用すると、モニターのアラートがトリガーされたときに Microsoft Teams のチャネルで特定のユーザーに通知できます。これにより、重要なイベントについて適切な担当者に確実に通知できます。特定のユーザーにメンションするには、以下の手順に従ってユーザー プリンシパル名 (UPN) を見つけます。

**構文**: `<at>{User Principal Name}</at>`

**例**: `<at>user@microsoft.com</at>`

**完全な通知例**: `@teams-CHANNEL_NAME <at>user@microsoft.com</at> <at>another.user@microsoft.com</at>`

**ユーザーのユーザー プリンシパル名 (UPN) を見つけるには:**

1. **方法 1 (UPN がメール アドレスと一致する場合のみ有効):**

   - Microsoft Teams で、そのユーザーのプロフィール写真または名前をクリックして、連絡先カードを開きます。
   - `Chat` フィールドに表示されるメール アドレスは、多くの場合 UPN です。異なる場合は、以下の 方法 2 を使用します。

1. **方法 2 (常に有効ですが、Azure Portal の権限が必要):**

   - [Microsoft Azure Portal](https://portal.azure.com) にサインインします。
   - `Microsoft Entra ID` > `Manage` > `Users` に移動します。
   - リストで該当ユーザーを見つけ、`User principal name` 列から UPN をコピーします。

確実な配信を確認するため、Datadog はモニター通知のテストを推奨します。手順については、[通知のテスト](https://docs.datadoghq.com/monitors/notify/#test-notifications) を参照してください。

#### ダッシュボード

任意のチームまたはチャットにダッシュボード ウィジェットのスナップショットを投稿できます。サポートされるウィジェットの一覧については、[スケジュール済みレポート](https://docs.datadoghq.com/dashboards/sharing/scheduled_reports/) を参照してください。

Teams でダッシュボードウィジェットを共有するには

1. Datadog でダッシュボードウィジェットにカーソルを合わせ、`CMD + C` または `CTRL + C` を押すか、共有メニューから **Copy** ボタンをクリックします。
1. リンクを Teams に貼り付けます。

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
{{< img src="integrations/microsoft_teams/dashboard_share.png" alt="Microsoft Teams でダッシュボード ウィジェットを共有">}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< img src="integrations/microsoft_teams/dashboard_share_gov.png" alt="Microsoft Teams でダッシュボード ウィジェットを共有">}}
{{< /site-region >}}

### 編集アクセス権の制限

既定では、接続済みの Microsoft Teams テナントに対して、すべてのユーザーにフル アクセスが付与されています。

特定のテナントを編集できるロールを制限するには、[きめ細かなアクセス制御](https://docs.datadoghq.com/account_management/rbac/granular_access/) を使用します:

1. テナントを表示している間に、右上の歯車アイコンをクリックして設定メニューを開きます。
1. **Permissions** を選択します。
1. **Restrict Access** をクリックします。ダイアログボックスが更新され、組織のメンバーはデフォルトで **Viewer** アクセス権を持っていることが表示されます。
1. ドロップダウンを使用して、Microsoft Teams テナントを編集できる 1 つ以上のロール、チーム、またはユーザーを選択します。
1. **Add** をクリックします。ダイアログ ボックスが更新され、選択したロールに **Editor** 権限が付与されたことが表示されます。
1. **Save** をクリックします。

**注:** テナントに対する編集アクセスを維持するには、保存前に自分が所属するロールを少なくとも 1 つ含める必要があります。

編集アクセスがある場合、以下の手順を完了することで、制限されたテナントへの一般アクセスを復元できます:

1. テナントを表示中に、右上の歯車アイコンをクリックして設定メニューを開きます。
1. **Permissions** を選択します。
1. **Restore Full Access** をクリックします。
1. **Save** をクリックします。

{{% /tab %}}

{{% tab "Microsoft Workflows Webhooks" %}}

### Microsoft Workflows Webhooks とは何ですか？

Workflows / Power Automate は、自動化されたワークフローを作成するための Microsoft 製品です。Microsoft Workflows を使用すると、Incoming Webhook で通知を送信できます。推奨は Microsoft Teams テナントへの Datadog アプリのインストールですが、インストールできない場合やプライベート チャネルに通知を送信したい場合は、Datadog ハンドルを構成して Microsoft Workflows 経由で Microsoft Teams のチャネルに通知を送信できます。このインテグレーションは、次の Microsoft Workflows テンプレートでの使用を想定しています: [Webhook リクエストを受信したときにチャネルに投稿](https://make.preview.powerautomate.com/galleries/public/templates/d271a6f01c2545a28348d8f2cddf4c8f/post-to-a-channel-when-a-webhook-request-is-received)

{{< img src="integrations/microsoft_teams/microsoft_teams_workflows_template.png" alt="Webhook リクエストを受信したときにチャネルに投稿 テンプレート" style="width:30%;" >}}

### レガシー コネクタを Microsoft Workflows Webhooks インテグレーションに移行しますか？

Microsoft は、Microsoft Teams 向け Office 365 コネクタの非推奨化を[発表しました](https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/)。既存のコネクタ URL は 2025 年 1 月 31 日に動作を停止します。Microsoft は、レガシー コネクタの代替として Microsoft Workflows の incoming webhooks の使用を推奨しています。現在レガシー Office 365 コネクタを使用しているすべての通知ハンドルを Datadog の Microsoft Workflows webhooks インテグレーションに移行するには、以下の手順に従ってください。

Microsoft Teams インテグレーション タイル内の各レガシー コネクタ ハンドルについて:

1. [セットアップ手順](#create-a-microsoft-workflows-webhook) に従って、目的の Microsoft Teams チャネル向けのワークフロー Webhook ハンドルを作成します。
1. Microsoft Workflows Webhooks セクションで、新しいハンドルに置き換える対象のコネクタ ハンドルと同じ名前を付けます。たとえば、レガシー コネクタ ハンドル名が `channel-123` の場合、Microsoft Workflows Webhooks セクションで新しいハンドルにも `channel-123` という名前を付けます。この新しいハンドルが既存のレガシー コネクタ ハンドルを上書きします。

### Microsoft Workflows Webhook を作成する

#### 前提条件

- 新しいワークフローを作成する際、ワークフローの所有およびチャネルへの通知送信の双方に Microsoft アカウントが必要です (同一の Microsoft アカウントである必要はありません)。
- ワークフローを所有するアカウント (以下の手順 2 で構成) が、ワークフローの編集および更新を行えるアカウントです。共有アクセス性を高めるには、サービス アカウントの使用を推奨します。
- チャネルに通知を送信するアカウント (以下の手順 8 で構成) は、そのアカウントのユーザーとして投稿します。このアカウントは、通知を送信したいチームのメンバーである必要があります。プライベート チャネルに通知を送信する場合は、このアカウントをチャネルにも追加する必要があります。このアカウントに「Datadog Notifications」のような名前を付けたい場合は、サービス アカウントを使用してください。

#### 手順

**注:** これらの手順の多くは Microsoft Workflows 側での操作です。Microsoft が Workflows を更新すると、以下の手順は最新の変更を反映していない場合があります。

1. Microsoft Teams で、[Workflows アプリ](https://teams.microsoft.com/l/app/c3a1996d-db0f-4857-a6ea-7aabf0266b00?source=app-details-dialog) を通知したいすべてのチームに追加します。チームにアプリを追加できない場合は、以下の "Private channels" セクションの手順に従ってください。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_1.png" alt="手順 1" style="width:90%;" >}}
1. Microsoft の [Webhook リクエストを受信したときにチャネルに投稿](https://make.preview.powerautomate.com/galleries/public/templates/d271a6f01c2545a28348d8f2cddf4c8f/post-to-a-channel-when-a-webhook-request-is-received) テンプレートから、Power Automate で新しいワークフローを作成します。
1. ワークフローの所有に使用する Microsoft アカウントを選択します (共有アクセスを容易にするため、サービス アカウントの使用を推奨)。その後、**Continue** をクリックします。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_3.png" alt="手順 3" style="width:90%;" >}}
1. **Edit in advanced mode** をクリックします。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_4.png" alt="手順 4" style="width:90%;" >}}
1. **Send each adaptive card** を展開し、**Post card in a chat or channel** をクリックします。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_template_dropdown_step_5.png" alt="手順 5" style="width:90%;" >}}
1. **Post As** のドロップ ダウンで **Post as** を **Flow bot** に設定します。通知は「`<NAME>` via Workflows」から送信されたように表示されます。これらの通知を受信するには、Workflows アプリケーションを目的のチームに追加する必要があります。プライベート チャネルに通知を送信する場合は、**Post As** をそのチャネル内のユーザーに設定する必要があります。詳細は下記の "Private channels" セクションを参照してください。**注:** **Post as** を変更すると、**Post in** フィールドがリセットされます。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_6.png" alt="手順 6" style="width:90%;" >}}
1. チームおよびチャネルのドロップ ダウンにアクセスするには、@ 記号を削除するか、**X** アイコンをクリックして取り除きます。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_7.png" alt="手順 7" style="width:90%;" >}}
1. ドロップ ダウンを使用して、目的のチームとチャネルを選択します。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_8.png" alt="手順 8" style="width:90%;" >}}
1. 通知送信用に意図した Microsoft アカウント (例: "Datadog Notifications" という名前のサービス アカウント) にワークフローが接続されていることを確認します。通知は「`<NAME>` through Workflows」から送信されたように表示されます。このアカウントは、構成済みの Microsoft Teams チャネルにアクセスできる必要があります。アカウントを変更するには、**Change connection** をクリックし、表示に従って別の Microsoft アカウントを構成します。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_9.png" alt="手順 9" style="width:90%;" >}}
1. **Save** ボタンをクリックします。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_10.png" alt="手順 10" style="width:90%;" >}}
1. Webhook リンクを見つけるには、ワークフローの最初のブロックをクリックします。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_11.png" alt="手順 11" style="width:50%;" >}}
1. **Anyone** がフローをトリガーできることを確認し、リンクをコピーします。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_12.png" alt="手順 12" style="width:90%;" >}}
1. **Back** ボタンをクリックして、ワークフローのダッシュボードに移動します。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_13.png" alt="手順 13" style="width:90%;" >}}
1. ダッシュボードで、ワークフローがオンになっていることを確認します。オフの場合は、"Turn on" ボタンをクリックします。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_14.png" alt="手順 14" style="width:90%;" >}}
1. Datadog で、[**Integrations > Microsoft Teams**](https://app.datadoghq.com/integrations/microsoft-teams) に移動します。
1. Configuration タブで Microsoft Workflows Webhooks セクションに進み、**Add Handle** をクリックします。ハンドルに名前を付け (レガシー コネクタ ハンドルから移行する場合は、対応するコネクタ ハンドルと同じ名前を使用)、Webhook URL を貼り付けます。
1. **Save** をクリックします。

### プライベート チャネル

プライベート チャネルに通知を送信するには、**Post Card to chat or channel** ブロック内で構成されたアカウントがそのチャネルにアクセスできる必要があります。これにより、ワークフローはそのユーザー アカウントの代理として通知を送信できます。

1. **Post Card to chat or channel** ブロック内で、**Post as** を **User** に変更します。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_private_channels_step_1.png" alt="プライベート チャネルの手順 1" style="width:30%;" >}}
1. 次に、アカウントを選択するため **Change connection** をクリックし、表示に従ってアカウントを変更します。
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_private_channels_step_2.png" alt="プライベート チャネルの手順 2" style="width:90%;" >}}

### 制限

- Microsoft 365 のお客様は、成功したトリガーが 90 日間発生しない場合、ワークフローは自動的にオフになります。ワークフローの有効期限が近づくと、Microsoft はワークフローの所有者アカウントにメールを送信します。この 90 日のタイマーは、Microsoft Workflows 内でテストを実行することでリセットできます。

- テンプレートを使用している場合、すべてのメッセージの末尾に、ワークフローの作成者とテンプレートへのリンクを示す 1 行のテキストが追加されます。
  {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_used_a_template.png" alt="テンプレートを使用" style="width:90%;" >}}

  これを削除するには、対象のワークフローを開いて **Save As** をクリックしてコピーを作成し、**My Flows** 内でそのコピーを見つけて開き、元のワークフローではなくコピーしたワークフローの新しい Webhook を使用します。

- Microsoft Workflows は、投稿するメッセージに対するインタラクティブな機能 (Microsoft Teams から直接モニターをミュートするなど) をサポートしません。

- Microsoft Workflows は、共有チャネルをサポートしません。

- Microsoft Workflows では、**Post as** を **User** に設定して Workflows Webhook を投稿する場合、ユーザー メンションはサポートされません。

### Usage

Datadog モニターから、[`@-notification` 機能](https://make.preview.powerautomate.com/galleries/public/templates/d271a6f01c2545a28348d8f2cddf4c8f/post-to-a-channel-when-a-webhook-request-is-received) を使用して Microsoft Teams に通知を送信します。通知はアドレス `@teams-<HANDLE>` 宛てに送信します。`<HANDLE>` は Microsoft Teams ハンドル名に置き換えます。

#### Microsoft Workflows Webhooks ハンドルでのユーザー メンション

ユーザー メンションを使用すると、モニターのアラートがトリガーされたときに Microsoft Teams のチャネルで特定のユーザーに通知できます。これにより、重要なイベントについて適切な担当者に確実に通知できます。特定のユーザーにメンションするには、以下の手順に従ってユーザー プリンシパル名 (UPN) を見つけます。

**構文**: `<at>{User Principal Name}</at>`

**例**: `<at>user@microsoft.com</at>`

**完全な通知例**: `@teams-CHANNEL_NAME <at>user@microsoft.com</at> <at>another.user@microsoft.com</at>`

**ユーザーのユーザー プリンシパル名 (UPN) を見つけるには:**

1. **方法 1 (UPN がメール アドレスと一致する場合のみ有効):**

   - Microsoft Teams で、そのユーザーのプロフィール写真または名前をクリックして連絡先カードを開きます。
   - `Chat` フィールドに表示されるメール アドレスは、多くの場合 UPN です。異なる場合は、以下の 方法 2 を使用します。

1. **方法 2 (常に有効ですが、Azure Portal の権限が必要):**

   - [Microsoft Azure Portal](https://portal.azure.com) にサインインします。
   - `Microsoft Entra ID` > `Manage` > `Users` に移動します。
   - リストで該当ユーザーを見つけ、`User principal name` 列から UPN をコピーします。

<div class="alert alert-danger">プライベート チャネル向けに User として投稿される Workflows Webhook ハンドルでは、ユーザー メンションはサポートされません。Workflows Webhook を User として投稿する際にユーザー メンションを含めると失敗します。Workflows Webhooks でユーザー メンションを使用するには、Flow Bot を使用する必要があります。</div>

確実な配信を確認するため、Datadog はモニター通知のテストを推奨します。手順については、[通知のテスト](https://docs.datadoghq.com/monitors/notify/#test-notifications) を参照してください。

### 編集アクセス権の制限

既定では、すべてのユーザーに各 Microsoft Workflows Webhook ハンドルへのフル アクセスが付与されています。

特定の Workflows Webhook ハンドルを編集できるロールを制限するには、[きめ細かなアクセス制御](https://docs.datadoghq.com/account_management/rbac/granular_access/) を使用します:

1. **Workflows Webhooks** を表示中に、対象のハンドルにカーソルを合わせて、行の右側にアクションを表示します。
1. **Permissions** と表示された鍵アイコンをクリックします。
1. **Restrict Access** をクリックします。ダイアログボックスが更新され、組織のメンバーはデフォルトで **Viewer** アクセス権を持っていることが表示されます。
1. ドロップ ダウンを使用して、その Workflows Webhook ハンドルを編集できる 1 つ以上のロール、チーム、またはユーザーを選択します。
1. **Add** をクリックします。ダイアログ ボックスが更新され、選択したロールに **Editor** 権限が付与されたことが表示されます。
1. **Save** をクリックします。

**注:** Workflows Webhook ハンドルに対する自分の編集アクセスを維持するには、保存前に自分が所属するロールを少なくとも 1 つ含める必要があります。

編集アクセスがある場合、以下の手順を完了することで、制限された Workflows Webhook ハンドルへの一般アクセスを復元できます:

1. **Workflows Webhooks** を表示中に、制限されたハンドルにカーソルを合わせて、行の右側にアクションを表示します。
1. **Permissions** と表示された鍵アイコンをクリックします。
1. **Restore Full Access** をクリックします。
1. **Save** をクリックします。

API 経由で Workflows Webhooks の権限を編集するには:

1. [Microsoft Teams Integration API](https://docs.datadoghq.com/api/latest/microsoft-teams-integration/#get-all-workflows-webhook-handles) を使用して、Workflows Webhooks の ID を取得します。
1. [Restriction Policies API](https://docs.datadoghq.com/api/latest/restriction-policies/) を使用します。Resource Type は `integration-webhook`、id は `microsoft-teams:<workflows_webhook_id>` です。

{{% /tab %}}

{{% tab "コネクタ (非推奨)" %}}

### 旧来コネクタのテナントベースインテグレーションへの移行

Microsoft は、Microsoft Teams 向け Office 365 コネクタの非推奨化を発表しました。これには次の影響があります:

- すべての Datadog コネクタは 2025 年 1 月 31 日に機能しなくなります。
- [更新済み URL](https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url) のない Incoming Webhook コネクタは 2025 年 1 月 31 日に機能しなくなります。
- すべてのコネクタは 2025 年 12 月 31 日に機能しなくなります (以前は 2024 年 10 月 1 日)。

詳細は、Microsoft の [ブログ記事](https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/) を参照してください。

レガシーな Office 365 コネクタを現在使用しているすべての通知ハンドルを、テナント ベースの Datadog アプリに移行するには:

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

1. [セットアップ手順](https://docs.datadoghq.com/integrations/microsoft-teams/?tab=datadogapprecommended#setup) に従って、Microsoft テナントを Datadog に接続します。
1. レガシー Office 365 コネクタが構成されているすべてのチームに Datadog アプリを追加します。
1. [Microsoft Teams Integration Tile](https://app.datadoghq.com/integrations/microsoft-teams) 内の各レガシー通知コネクタ ハンドルについて:
   1. 構成済みのテナントで **Add Handle** をクリックします。
   1. 新しいハンドルに、コネクタハンドルと同じ名前を付けます。例えば、旧来のコネクタハンドルの名前が `channel-123` の場合、テナント構成に `channel-123` という名前で新しいハンドルを作成します。
   1. 旧来のコネクタハンドルがメッセージを送信していたドロップダウンメニューから希望するチームとチャンネルを選択し、**Save** をクリックします。この新しいハンドルは既存の旧来のコネクタハンドルをオーバーライドします。

{{< /site-region >}}

{{< site-region region="gov" >}}

1. [セットアップ手順](https://docs.datadoghq.com/integrations/microsoft-teams/?tab=datadogapprecommended#setup) に従って、Microsoft テナントを Datadog に接続します。
1. レガシー Office 365 コネクタが構成されているすべてのチームに Datadog for Government アプリを追加します。
1. [Microsoft Teams Integration Tile](https://app.datadoghq.com/integrations/microsoft-teams) 内の各レガシー通知コネクタ ハンドルについて:
   1. 構成済みのテナントで **Add Handle** をクリックします。
   1. 新しいハンドルに、コネクタハンドルと同じ名前を付けます。例えば、旧来のコネクタハンドルの名前が `channel-123` の場合、テナント構成に `channel-123` という名前で新しいハンドルを作成します。
   1. 旧来のコネクタハンドルがメッセージを送信していたドロップダウンメニューから希望するチームとチャンネルを選択し、**Save** をクリックします。この新しいハンドルは既存の旧来のコネクタハンドルをオーバーライドします。

{{< /site-region >}}

### レガシー コネクタから Microsoft Workflows Webhooks インテグレーションに移行する

Microsoft は、Microsoft Teams 向け Office 365 コネクタの非推奨化を発表しました。これには次の影響があります:

- すべての Datadog コネクタは 2025 年 1 月 31 日に機能しなくなります。
- [更新済み URL](https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url) のない Incoming Webhook コネクタは 2025 年 1 月 31 日に機能しなくなります。
- すべてのコネクタは 2025 年 12 月 31 日に機能しなくなります (以前は 2024 年 10 月 1 日)。

詳細は、Microsoft の [ブログ記事](https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/) を参照してください。

現在レガシー Office 365 コネクタを使用しているすべての通知ハンドルを Datadog の Microsoft Workflows webhooks インテグレーションに移行するには、[Microsoft Workflows Webhooks](https://docs.datadoghq.com/integrations/microsoft-teams/?tab=microsoftworkflowswebhooks#what-are-microsoft-workflows-webhooks) を参照してください。

### コネクタのセットアップ (非推奨)

<div class="alert alert-info">
レガシー通知ハンドルは、同じ <code>@teams-HANDLE_NAME</code> を<em>使用しない限り</em>新しいセットアップの影響を受けませんが、使用する場合は新しい構成がレガシー構成をオーバーライドします。
</div>

1. チャンネルのリストで、チャンネル名の横にある `...` ボタンを選択し、**Connectors** を選択します。

   {{< img src="integrations/microsoft_teams/microsoft_team_step_1_v2.png" alt="Microsoft Teams の手順 1" >}}

1. Datadog を検索し、**Configure** をクリックします。

   {{< img src="integrations/microsoft_teams/microsoft_team_step_2_v2.png" alt="Microsoft Teams の手順 2" >}}

1. コネクタ構成モーダルで、Webhook URL をコピーします。

1. Datadog で、[**Integrations > Microsoft Teams**](https://app.datadoghq.com/integrations/microsoft-teams) に移動します。

1. Configuration タブで、**Add Handle** をクリックしてハンドルに名前を付け、webhook URL を貼り付けます。

1. コネクタ構成モーダルで、**Save** をクリックします。

{{% /tab %}}

{{< /tabs >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

## Microsoft Teams における Datadog Incident Management

### アカウント設定

まず、Microsoft Teams に Datadog アプリをインストールします:

1. Microsoft Teams を開きます。
1. 垂直ツールバーの **Apps** をクリックします。
1. "Datadog" を検索し、**Open** をクリックします。
1. 開いたモーダルで、アプリを追加するチームのプライマリ チャネルを選択します。インストールを完了するには **Go** をクリックします。
   {{< img src="integrations/microsoft_teams/microsoft_teams_add_app_to_team.png" alt="Microsoft Teams でアプリをチームに追加" >}}

次に、Microsoft のテナントを Datadog に接続します。

1. Datadog で、[Microsoft Teams Integration Tile](https://app.datadoghq.com/integrations/microsoft-teams) に移動します。
1. **Add Tenant** をクリックすると、Microsoft に移動します。
1. 画面の指示に従って、**OK** をクリックします。

### 追加の権限の付与

一部の Datadog Incident Management 機能では、テナント上での操作 (例: インシデント用の新規チャネルの作成) を実行するための権限が必要です。Microsoft 組織を代表して同意を付与できる権限を持つ人物が、*Global Admin* ロールを割り当てられたユーザーなど、テナント全体の管理者同意を付与する必要があります。Datadog アプリケーションに対してテナント全体の管理者同意を付与できるのは誰かについては、[Microsoft Entra ID のドキュメント](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites) を参照してください。

Datadog に対してアプリケーション権限と委任された権限の両方を付与するか、委任された権限のみを付与するかを選択できます。両方の権限を使用する方法は設定が容易で、委任された権限のみを使用する方法は、テナント内の Datadog アプリに対してよりきめ細かな制御を提供します。詳細は、[Microsoft の権限と同意の概要ドキュメント](https://docs.datadoghq.com/integrations/microsoft-teams/?tab=datadogapprecommended#setup) を参照してください。

{{< tabs >}}

{{% tab "アプリケーション権限の使用" %}}

1. Datadog で、[Microsoft Teams Integration Tile](https://app.datadoghq.com/integrations/microsoft-teams) に移動します。
1. Incident Management を使用したいテナントで、右側の歯車アイコンをクリックします。
1. **Grant application permissions** をクリックすると、Microsoft にリダイレクトされます。この手順は、テナント全体の管理者同意を付与できるユーザーが実行する必要があります。このユーザーは Datadog アカウントを保有している必要がありますが、その Datadog アカウントのメール アドレスは Microsoft アカウントのメール アドレスと一致している必要はありません。
1. 画面の指示に従って、**OK** をクリックします。

{{% /tab %}}

{{% tab "委任された権限の使用" %}}

委任された権限を使用すると、Datadog は Microsoft Teams テナント内でユーザーとして動作できます。Datadog は、そのユーザーが実行できるあらゆる操作を行い、同ユーザーがアクセスできるリソースにアクセスできます。

まず、Datadog アプリに委任された権限を付与します:

1. Datadog で、[Microsoft Teams Integration Tile](https://app.datadoghq.com/integrations/microsoft-teams) に移動します。
1. Incident Management を使用したいテナントで、右側の歯車アイコンをクリックします。
1. **Grant delegated permissions** をクリックすると、Microsoft にリダイレクトされます。この手順は、テナント全体の管理者同意を付与できるユーザーが実行する必要があります。このユーザーは Datadog アカウントを保有している必要がありますが、その Datadog アカウントのメール アドレスは Microsoft アカウントのメール アドレスと一致している必要はありません。
1. 画面の指示に従って、**OK** をクリックします。

次に、Datadog が動作するサービス アカウントを作成します:

1. Office 365 のサービス アカウント ユーザーを作成します。実際の Microsoft Teams ユーザーと区別して混乱を避けるため、このサービス アカウント ユーザーには 'Datadog' のような名前を付けることを Datadog は推奨します。

1. サービス アカウントに Microsoft Teams ライセンスを割り当てます。

1. インシデント レスポンスを管理したい各チームに、サービス アカウント ユーザーを追加します。これには、新しいインシデント チャネルが作成されるチームや、ユーザーがインシデントを宣言するチームが含まれます。

1. 各チームで次の権限が有効になっていることを確認します:

   - `Allow members to create and update channels`
   - `Allow members to delete and restore channels`
   - `Allow members to create, update, and remove tabs`

   これらの権限を有効にするには、チーム名の横の **...** をクリックし、**Manage Team** > **Settings** > **Member Permissions** を選択します。

最後に、最初の手順で作成したサービス アカウント ユーザーを接続します。

1. 作成したサービス アカウント ユーザーとしてログインしていることを確認します。**注:** サービス アカウント用に Datadog ユーザーを作成する必要はありません。また、このサービス アカウント ユーザーは、この手順を実行する Datadog ユーザーとは関連付けられていません。
1. Datadog で、[Microsoft Teams Integration Tile](https://app.datadoghq.com/integrations/microsoft-teams) に移動します。
1. Incident Management を使用したいテナントで、右側の歯車アイコンをクリックします。
1. **Connect delegated user** をクリックすると、Microsoft にリダイレクトされます。**注:** この手順を実行するためにテナント全体の管理者である必要はありません。
1. 画面の指示に従って、**OK** をクリックします。

#### リフレッシュ トークンに関する重要な注意

委任されたサービス アカウントを使用して Microsoft Teams を接続すると、Datadog はリフレッシュ トークンを使用して、繰り返しのログインなしにアクセスを維持します。サービス アカウントのパスワードが変更された場合、アカウントが無効化された場合、または Microsoft がトークンを失効させた場合、このトークンは無効になる可能性があります。

これらのトークンは 90 日後に期限切れになります。Datadog が委任ユーザーの代理でアクションを実行するたびに新しいトークンが発行されますが、委任ユーザーが 90 日間使用されない場合はトークンが失効し、インテグレーションは動作を停止します。

トークンが無効になったり期限切れになったりした場合は、機能を復旧するためにサービス アカウントを再接続する必要があります。

詳細は、Microsoft のドキュメント [Microsoft identity platform におけるリフレッシュ トークン](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens) を参照してください。

{{% /tab %}}

{{< /tabs >}}

### ユーザー設定

Microsoft Teams から Datadog のアクションを実行するには、Datadog と Microsoft Team のアカウントを接続する必要があります。

Microsoft Teams からアカウントを接続するには

1. Microsoft Teams を開きます。

1. 垂直ツールバーの `...` ボタンをクリックし、Datadog を選択すると、Datadog ボットとのチャットが開始されます。

1. "accounts" と入力し、エンターキーを押します。
   {{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_teams.png" alt="Microsoft Teams からのアカウント接続" >}}

1. Datadog ボットが、アカウントの接続方法について応答します。**Connect Datadog Account** をクリックします。

1. その後、Datadog ボットが、アカウントを接続するためのリンクが含まれたメッセージを送信します。リンクをクリックし、プロンプトに従います。

1. [Microsoft Teams Integration Tile](https://app.datadoghq.com/integrations/microsoft-teams) にリダイレクトされます。

1. [Microsoft Teams Integration Tile](https://app.datadoghq.com/integrations/microsoft-teams) 上のプロンプトで **Create** をクリックして、アプリケーション キーを作成します。

Datadog からアカウントを接続することも可能です。

1. Datadog で、[Microsoft Teams Integration Tile](https://app.datadoghq.com/integrations/microsoft-teams) に移動します。
1. 表示されたテナントの中から、**Connect** をクリックします。
1. 画面の指示に従って、**OK** をクリックします。
1. 上記のプロンプトで **Create** をクリックして、[Microsoft Teams Integration Tile](https://app.datadoghq.com/integrations/microsoft-teams) からアプリケーション キーを作成します。

{{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_datadog_v2.png" alt="Datadog Microsoft Teams インテグレーションタイルからアカウントを接続します" >}}

### インシデントの使用方法

#### インシデント

Microsoft Teams から新しいインシデントを宣言するには

1. 任意のチームのチャネルで会話を開始するか、Datadog アプリとのチャットを開始します。
1. `@Datadog incident` と入力します。
1. アダプティブ カードが表示されます。**Declare Incident** ボタンをクリックして Datadog タブを開き、インシデントを宣言します。

インシデントを宣言するには、ユーザーは自分の Microsoft Teams アカウントを Datadog アカウントに接続する必要があります。

インシデントを更新するには、作成と同様の手順で行います。

1. インシデントチームにいながら、会話を始めます。
1. `@Datadog` と入力するか、`...` ボタンで **Messaging extensions** メニューを開き、**Datadog** アプリを選択します。
1. **Update Incident** を選択します。
1. 希望の情報をフォームに入力します。
1. **Update** をクリックします。

次を使用してオープン（アクティブで安定している）インシデントをリスト表示します。

```
@Datadog list incidents
```

インシデントチーム内のメッセージの右端にある "More actions" メニューを使用すると、そのメッセージをインシデントタイムラインに送信することができます。

#### インシデントの更新チャンネル

インシデント更新チャンネルを使用すると、関係者は Microsoft Teams から直接、すべてのインシデントのステータスを組織全体で確認することができます。これらのアップデートを投稿するチームとチャンネルをアカウントで選択すると、チャンネルは次の投稿を受け取ります。

- 新しく宣言されたインシデント。
- 重要度、ステータスの移行、インシデントコマンダーへの変更点。
- App 内のインシデントの Overview ページへのリンク。
- インシデント専門チームへの参加リンク。

Microsoft Teams アプリがインストールされたら、**Incident Settings** ページに移動できます。ここから、**Incident Updates** Channel セクションまでスクロールダウンし、セットアップフローを開始することができます。

#### インシデントチャンネルの設定方法

1. [Incidents Settings](https://app.datadoghq.com/incidents/settings#Integrations) に移動します。
1. Microsoft Teams セクションで、接続している Microsoft Teams テナントを選択します。
1. **Automatically create a Microsoft Teams channel for every incident** (インシデントごとに Microsoft Teams チャンネルを自動的に作成する) をオンに切り替えます。
1. 新しいチャンネルを自動的に作成するチームを選択します。
1. 設定を保存します。

{{< img src="integration/microsoft_teams/ms_teams_incident_updates_v2.png" alt="Microsoft Teams インシデント更新チャンネル設定." >}}

{{< /site-region >}}

## 収集されたデータ

### メトリクス

Microsoft Teams インテグレーションは、メトリクスを提供しません。

### イベント

Microsoft Teams インテグレーションには、イベントは含まれません。

### サービスチェック

Microsoft Teams インテグレーションには、サービスのチェック機能は含まれません。

## 権限

Microsoft Teams インテグレーションは、追加されたチームに対して次の権限を受け取ります。詳細は、[Microsoft アプリの権限リファレンス](https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams) を参照してください。

| 権限の説明                                                                                                                                                                    | リクエスト理由                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 私が提供するメッセージとデータを受信します。                                                                                                                                           | ユーザーは、Datadog アプリと個人チャットでやり取りすることができます。                                    |
| 私にメッセージや通知を送信します。                                                                                                                                                       | ユーザーは、Datadog アプリと個人チャットでやり取りすることができます。                                    |
| 名前、メールアドレス、会社名、使用言語など、私のプロフィール情報にアクセスします。                                                                                       | Datadog UI 内で Microsoft Teams の通知やワークフローを構成することができます。 |
| チームやチャットのメンバーがチャンネルやチャットで提供するメッセージやデータを受信します。                                                                                                   | ユーザーは、@Datadog コマンドを通して Datadog とやり取りすることができます。                                   |
| チャンネルやチャットでメッセージや通知を送信します。                                                                                                                                     | 構成されたターゲットに Datadog 通知を送信します。                                            |
| チームやチャットの情報 (チーム名やチャット名、チャンネルリスト、名簿 (チームやチャットメンバーの名前やメールアドレスを含む)) にアクセスし、それを使って連絡を取ることができます。 | ユーザーが Datadog 内で Microsoft Teams の通知やワークフローを構成できるようにします。        |

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

Microsoft Teams インテグレーションで Incident Management 機能を使用するには、追加の権限が必要です。これらはテナント全体の権限を持つユーザーによって承認される必要があります (詳細な手順は [Datadog Incident Management in Microsoft Teams: アカウント セットアップ](#account-setup) を参照)。
これらの権限の詳細は、[Microsoft Graph の権限リファレンス](https://learn.microsoft.com/en-us/graph/permissions-reference) を参照してください。
{{< tabs >}}

{{% tab "アプリケーション権限の使用" %}}

<table>
  <tr>
    <td style="width:40%;"><strong>API / 権限名</strong></td>
    <td style="width:15%;"><strong>種類</strong></td>
    <td><strong>リクエスト理由</strong></td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Create</code></td>
    <td style="width:15%;">アプリケーション権限および委任された権限</td>
    <td>Datadog Incident Management を使用してインシデントを管理・復旧するためにチャネルを作成します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Delete.All</code></td>
    <td style="width:15%;">アプリケーション権限および委任された権限</td>
    <td>指定した期間後にインシデント チャネルを自動アーカイブします。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelMessage.Read.All</code></td>
    <td style="width:15%;">アプリケーション権限および委任された権限</td>
    <td>インシデント チャネルからインシデント タイムラインへ、タイムライン メッセージを自動同期します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelSettings.ReadWrite.All</code></td>
    <td style="width:15%;">アプリケーション権限および委任された権限</td>
    <td>Datadog Incident Management を使用してインシデントを復旧するため、チャネルを作成および変更します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Directory.Read.All</code>,<code>GroupMember.Read.All</code></td>
    <td style="width:15%;">アプリケーション権限</td>
    <td>Datadog Incident Management の構成時に、チーム名およびチャネル名のオート コンプリート候補を提供します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Create</code></td>
    <td style="width:15%;">アプリケーション権限および委任された権限</td>
    <td>Datadog アプリ用にチーム内にタブを作成します (この権限は今後の Microsoft Teams におけるインシデント宣言エクスペリエンスに必要です)。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>OnlineMeetings.ReadWrite</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog アプリ用にチーム内で会議を自動作成します (この権限は今後の Microsoft Teams におけるインシデント宣言エクスペリエンスに必要です)。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsAppInstallation.
    ReadWriteSelfForTeam</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog アプリがチームのメンバーであるかどうかを確認できるようにします。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Read.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>チャネルに Datadog タブが作成されているかどうかを確認します (この権限は今後の Microsoft Teams におけるインシデント宣言エクスペリエンスに必要です)。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Microsoft Teams アカウントを対応する Datadog アカウントに接続するため、サインイン中のユーザーに関する詳細を提供します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>インシデントを更新または作成した Microsoft Teams ユーザーの名前を表示します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Team.ReadBasic.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>インシデント設定ページに、サービス アカウントがメンバーであるチームを表示します。</td>
  </tr>
</table>

{{% /tab %}}

{{% tab "委任された権限の使用" %}}

<table>
  <tr>
    <td style="width:40%;"><strong>API / 権限名</strong></td>
    <td style="width:15%;"><strong>種類</strong></td>
    <td><strong>リクエスト理由</strong></td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Create</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog Incident Management を使用してインシデントを管理・復旧するためにチャネルを作成します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Delete.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>指定した期間後にインシデント チャネルを自動アーカイブします。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelMessage.Read.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>インシデント チャネルからインシデント タイムラインへ、タイムライン メッセージを自動同期します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelSettings.ReadWrite.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog Incident Management を使用してインシデントを復旧するため、チャネルを作成および変更します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Create</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog アプリ用にチーム内にタブを作成します (この権限は今後の Microsoft Teams におけるインシデント宣言エクスペリエンスに必要です)。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>OnlineMeetings.ReadWrite</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog アプリ用にチーム内で会議を自動作成します (この権限は今後の Microsoft Teams におけるインシデント宣言エクスペリエンスに必要です)。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsAppInstallation.
    ReadWriteSelfForTeam</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Datadog アプリがチームのメンバーであるかどうかを確認できるようにします。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Read.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>チャネルに Datadog タブが作成されているかどうかを確認します (この権限は今後の Microsoft Teams におけるインシデント宣言エクスペリエンスに必要です)。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>Microsoft Teams アカウントを対応する Datadog アカウントに接続するため、サインイン中のユーザーに関する詳細を提供します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>インシデントを更新または作成した Microsoft Teams ユーザーの名前を表示します。</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Team.ReadBasic.All</code></td>
    <td style="width:15%;">委任された権限</td>
    <td>インシデント設定ページに、サービス アカウントがメンバーであるチームを表示します。</td>
  </tr>
</table>

{{% /tab %}}

{{< /tabs >}}

{{< /site-region >}}

## トラブルシューティング

### SSO の使用

次の手順を使用して、新しいチャンネルコネクターを設定します。

1. Datadog にログインし、セットアップ手順 1 および 2 を完了します。

1. セットアップ手順 3 で MS Teams ページから Datadog にリダイレクトされたら、新しいタブを開き、SSO で Datadog にログインします。次に、セットアップ手順 4 を個別に実行します。

### インテグレーションタイルにチームが表示されないのはなぜですか？

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Datadog にテナントを追加する前にボットをチームに追加した場合、Datadog はチームの存在を把握するための参加イベントを受信できていない可能性があります。
次のいずれかを試してください:

- そのチームの任意の標準チャンネルに `@Datadog sync` を投稿して、チームの標準チャンネルを Datadog と同期します。

1. 同期したい Team 内の標準チャンネルに移動します。
1. そのチャンネルで投稿を開始します。
1. チャンネルに `@Datadog sync` を投稿し、操作が成功したことを示す確認メッセージがスレッドに表示されるのを待ちます。

- チームから Datadog アプリを削除して、再度追加します。**注**: これにより、そのチームで構成済みのコネクタが削除されます。この操作は、そのチームのすべてのコネクタを Datadog のテナント ベースのインテグレーションに移行する準備ができている場合にのみ実行してください:

1. 左サイドバーのチーム名の横にある 3 つの点をクリックします。
1. **Manage Team** をクリックします。
1. **Apps** というラベルの付いたタブに移動します。
1. Datadog アプリの横にある 3 つの点をクリックします。
1. **Remove** をクリックします。
1. [セットアップ手順](https://docs.datadoghq.com/integrations/microsoft-teams/?tab=datadogapprecommended#setup) に従って Datadog アプリを再追加します。

{{< /site-region >}}

{{< site-region region="gov" >}}
Datadog にテナントを追加する前にボットをチームに追加した場合、Datadog はチームの存在を把握するための参加イベントを受信できていない可能性があります。
次のいずれかを実行できます:

- そのチームの任意の標準チャネルで `@Datadog for Government sync` を投稿して、チームの標準チャネルを Datadog と同期します:

1. 同期したい Team 内の標準チャンネルに移動します。
1. そのチャンネルで投稿を開始します。
1. チャネルに `@Datadog for Government sync` を投稿し、スレッド内に操作成功の確認メッセージが表示されるまで待ちます。

- チームから Datadog for Government アプリを削除して、再度追加します。**注**: これにより、そのチームで構成済みのコネクタが削除されます。この操作は、そのチームのすべてのコネクタを Datadog のテナント ベースのインテグレーションに移行する準備ができている場合にのみ実行してください。

1. 左サイドバーのチーム名の横にある 3 つの点をクリックします。
1. **Manage Team** をクリックします。
1. **Apps** というラベルの付いたタブに移動します。
1. Datadog for Government アプリの横の **...** をクリックします。
1. **Remove** をクリックします。
1. [セットアップ手順](https://docs.datadoghq.com/integrations/microsoft-teams/?tab=datadogapprecommended#setup&site=gov) に従って Datadog for Government アプリを再追加します。

{{< /site-region >}}

### プライベートチャンネルはボットでサポートされていますか？

[Microsoft Teams](https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations) のプライベート チャネルの制限により、ボットはプライベート チャネルをサポートしません。プライベート チャネルに通知を送信したい場合は、[Microsoft Workflows Webhooks](https://docs.datadoghq.com/integrations/microsoft-teams/?tab=microsoftworkflowswebhooks#what-are-microsoft-workflows-webhooks) を参照してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

### モニター通知で複数のユーザー メンションはサポートされていますか？

はい、1 件の通知に複数のユーザー メンションを含めて、関係するチーム メンバー全員に通知できます。

**例**: `@teams-handle <at>user1@microsoft.com</at> <at>user2@microsoft.com</at> <at>user3@microsoft.com</at>`

<div class="alert alert-danger">通知に複数のユーザー メンションが含まれ、そのうち 1 つが無効な場合でも、有効なユーザーには通知が届きますが、無効なユーザー メンションが原因でメンションの順序が入れ替わって表示されることがあります。</div>

{{< /site-region >}}

{{< site-region region="gov" >}}

### Datadog for Government アプリは GCC または GCC High でサポートされていますか？

現在、Datadog for Government アプリは、`commercial` Microsoft Teams テナントへの接続を試みる Datadog US1-FED 顧客のみをサポートしています。GCC および GCC High のテナントは、このアプリではサポートされていません。
{{< /site-region >}}

### 委任された権限の使用時にインシデント機能が動作しないのはなぜですか？

まず、その機能を使用しているチームにサービス アカウント ユーザーがメンバーとして参加していることを確認してください。

- インシデント タブが作成されない場合は、そのチームでメンバーによるチャネル内タブの作成・更新・削除が許可されていることを確認してください。
- 新しいインシデント チャネルが作成または名前変更されない場合は、そのチームでメンバーによるチャネルの作成・更新が許可されていることを確認してください。
- インシデント チャネルがアーカイブされない場合は、そのチームでメンバーによるチャネルの削除・復元が許可されていることを確認してください。

最後に、委任ユーザーのトークンが期限切れまたは失効している可能性があります。その場合は、委任ユーザーを再接続してください。

### インシデントを宣言しようとしたときにアプリ構成の確認を求められるのはなぜですか？

新しいインシデント宣言エクスペリエンスを使用するには、次の点を確認してください:

- アプリ バージョンが 3.1.23 以上であること。[アプリ バージョンを更新する方法](https://support.microsoft.com/en-us/office/update-an-app-in-microsoft-teams-3d53d136-5c5d-4dfa-9602-01e6fdd8015b) を参照してください。
- アプリケーション 権限を使用している場合は、`TeamsTab.Create` アプリケーション 権限を付与していること。
- 委任された権限を使用している場合は、`TeamsTab.Create` および `TeamsTab.Read.All` の委任された権限を付与していること。
- 委任された権限を使用している場合は、`@Datadog incident` コマンドを実行するチームにサービス アカウントがメンバーとして参加していること。

また、チャネル上部の `+` をクリックして Datadog アプリを検索することで、新しいインシデント宣言エクスペリエンスを使用することもできます。

お困りですか？ [Datadog サポート](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens) にお問い合わせください。