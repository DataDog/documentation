---
kind: documentation
title: チーム
---

## 概要
Datadog Teams は、ユーザーグループが Datadog 内でチームのアセットを整理し、Datadog 全体のエクスペリエンスに自動的にフィルターをかけて、これらのアセットに優先順位をつけることができるようにします。

Teams を使用して、ダッシュボード、サービス、モニター、インシデントなどのリソースをユーザーのグループにリンクします。また、Slack チャンネル、Jira ボード、GitHub リポジトリなどに、チーム固有のリンクを追加することもできます。

チームメンバーシップは柔軟です。ユーザーは、チームに参加したり、他のメンバーから追加されたり、管理者から追加されたりすることができます。ユーザーは、複数のチームに所属することができます。

## セットアップ

### ナビゲーション

Access the team directory page, from [Organization Settings][1] or by navigating to [**Service Management > Teams**][2]. The [team directory page][1] lists all teams within your organization.

### チームの作成

1. [チームディレクトリページ][1]で、右上の **New Team** をクリックします。
1. **Team Name** を選択します。
1. **Handle** は、チーム名に基づいて入力されます。
1. オプションで **Description** を指定します。
1. ドロップダウンメニューを使って、チームメンバーを選択します。
1. Click **Create**.

**Note:** Allowed characters for team names and team handles are `a-z`, `A-Z`, `0-9`, and `._-:/`. Replace spaces with underscores.

### チームの修正

1. On the [team directory page][1], click the team you wish to modify. 
1. Click the **Settings** cog at the top of the screen. A pop-up window appears.
1. Select the item you wish to modify.
1. Make your changes, then click **Save**.

### プロビジョニングソースの選択

管理者とチームマネージャーがチームメンバーシップを更新する方法を 3 つのオプションから選択します。

UI and API
: UI アクションと API 呼び出しのみでメンバーシップを更新します

SAML
: *SAML 限定*モデルを使用して、アイデンティティプロバイダーデータでチームメンバーシップを決定するようにします

All sources
: 出発点として SAML を使用し、UI および API によるオーバーライドを許可します

1. On the [team directory page][1], click **Teams Settings**.
1. **Team Provisioning Sources** のオプションのいずれかを選択します。

If you have teams with existing members, picking the SAML strict option overrides your settings and removes team members from those teams. Picking the All Sources option preserves existing memberships. To manage teams and team membership using SAML attributes, see [Map SAML attributes to Teams][3].

## チームハンドル

チームハンドルは、チームと Datadog のリソースをリンクします。チームハンドルは、検索バーやファセットに `team:<team-handle>` または `teams:<team-handle>` という形式で表示されます。

チームハンドルを探すには
1. チームディレクトリページでチーム名をクリックします。サイドパネルにチームの詳細が表示されます。
1. パネルの上部にある **handle** フィールドを探します。

リソースを定義されたチームと関連付けるには、一致するチームハンドルを持つチームが Datadog に存在する必要があります。定義されたチームに関連付けられたリソースをクリックすると、チームハンドルと追加情報を含む小さなウィンドウが表示されます。定義されたチームは、以下のチームフィルターのような追加機能を提供します。

Datadog で定義されたチームに関連付けられていないチームハンドルは、タグと同じような動作をします。Teams の機能を利用するために、未定義のチームハンドルを定義されたチームに変換してください。

### リソースとチームハンドルの関連付け

Datadog は、以下のリソースをチームハンドルに関連付けることをサポートしています。

- [Dashboards][4]
- [Incidents][5]
- [Monitors][6]
- [Resource Catalog][7]
- [サービスカタログ][8]
- [Service Level Objectives][9]
- Synthetic テスト、グローバル変数、プライベートロケーション

### Send notifications to a specific communication channel 

Add a notification channel to your Team to route alerts to communication channels such as Slack or Microsoft Teams. Monitor alerts targeting `@team-<handle>` are redirected to the selected channel. 

1. On the [team directory page][1], click the team you wish to modify. 
1. Click the **Settings** cog at the top of the screen. A pop-up window appears.
1. Select **Notifications**.
1. Add a channel, then click **Save**.

## フィルター

チームフィルターは、Datadog でのユーザーの体験を、チームに関連付けられたコンテンツに調整します。

チームフィルターは、各リストビューの 2 か所に表示されます。
- 左上にある検索ファセットのリスト
- 検索バーの検索語


ユーザーがチームフィルターを有効にすると、自分のチームに関連付けられたリソース、または自分のチームが所有するサービスに関連付けられたリソースのみが表示されます。チームフィルターの状態は、グローバルで永続的です。したがって、Datadog は、適用されるすべての製品にわたるユーザーのナビゲーションジャーニーにおいて、チームのコンテキストを維持します。

チームフィルターを使用できる製品について、以下の表で説明します。

| 製品リストページ       | フィルターベース                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [Dashboards][10]         | チームハンドル                                                                      |
| [Resource Catalog][7]   | チームハンドル                                                                      |
| [Service Catalog][11]    | チームハンドル                                                                      |
| [Incidents][12]          | チームハンドル                                                                      |
| [モニター][13]          | チームハンドル                                                                      |
| [APM Error Tracking][14] | Service owned by teams (determined by ownership inside the [Service Catalog][11]) |
| [Logs Error Tracking][15] | Service owned by teams (determined by ownership inside the [Service Catalog][11]) |
| [Service Level Objectives][16] | チームハンドル                                                                 |
| [Data Streams Monitoring][17]  | チームハンドル                                                                 |
| [Synthetic Tests][18]          | チームハンドル                                                                 |
| [ノートブック][19]          | チームハンドル                                                                      |



## Permissions

Teams Manage 権限を持つロールのユーザーは、チームの作成、チーム名の変更、チームの削除、チームハンドルの変更が可能です。`user_access_manage` を持つユーザーは、チームメンバーやマネージャーの追加、削除、昇格が可能です。

## チームの管理

### チームのメンバーシップ

チームのメンバーを差別化するために、チームマネージャーとして指定します。メンバーリストでは、チームマネージャーの名前の横に "TEAM MANAGER" バッジが表示されます。

チームの設定で、チームメンバーを変更できるユーザーを指定します。次のオプションが利用できます。
- `user_access_manage` 権限を持つユーザーのみ
- チームマネージャー
- チームマネージャーとメンバー
- 組織内の誰でも

`user_access_manage` 権限を持つユーザは、誰がメンバーの追加や削除、チーム詳細の編集を行えるかのデフォルトルールを設定できます。チームディレクトリページの **Default Settings** ボタンで、デフォルトルールを設定します。チーム詳細パネルで、個々のチームに対してこれらのポリシーをオーバーライドすることができます。

### SAML 属性マッピング

To manage teams and team membership using SAML attributes, see [Map SAML attributes to Teams][3].

### チーム管理の委任

オープンメンバーシップモデルの場合、デフォルトのチーム設定を構成し、**組織内の誰でも**メンバーの追加や削除ができるようにします。適切なロールに `teams_manage` 権限を割り当て、誰でもチームを作成したり、チームの詳細を編集できるようにします。

チーム主導のメンバーシップモデルを好む場合は、デフォルトのチーム設定を、**チームマネージャー**または**チームマネージャーとメンバー**がメンバーを追加または削除できるように設定します。チームマネージャー全員を含むロールに、`teams_manage` 権限を割り当てます。

厳密なメンバーシップモデルを実施するには、デフォルトのチーム設定で、**user_access_manage** を持つユーザーだけがメンバーを追加または削除できるように構成します。`teams_manage` 権限を組織管理者にのみ割り当てます。


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /ja/account_management/saml/mapping/#map-saml-attributes-to-teams
[4]: /ja/dashboards/#dashboard-details
[5]: /ja/service_management/incident_management/incident_details#overview-section
[6]: /ja/monitors/configuration/?tab=thresholdalert#add-metadata
[7]: /ja/infrastructure/resource_catalog/
[8]: /ja/tracing/service_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
[9]: /ja/service_management/service_level_objectives/#slo-tags
[10]: https://app.datadoghq.com/dashboard/lists
[11]: https://app.datadoghq.com/services
[12]: https://app.datadoghq.com/incidents
[13]: https://app.datadoghq.com/monitors/manage
[14]: https://app.datadoghq.com/apm/error-tracking
[15]: https://app.datadoghq.com/logs/error-tracking
[16]: https://app.datadoghq.com/slo/manage
[17]: https://app.datadoghq.com/data-streams
[18]: https://app.datadoghq.com/synthetics
[19]: https://app.datadoghq.com/notebook/list/