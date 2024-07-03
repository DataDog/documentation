---
title: チーム
---

## 概要
Datadog Teams は、ユーザーグループが Datadog 内でチームのアセットを整理し、Datadog 全体のエクスペリエンスに自動的にフィルターをかけて、これらのアセットに優先順位をつけることができるようにします。

Teams を使用して、ダッシュボード、サービス、モニター、インシデントなどのリソースをユーザーのグループにリンクします。また、Slack チャンネル、Jira ボード、GitHub リポジトリなどに、チーム固有のリンクを追加することもできます。

チームメンバーシップは柔軟です。ユーザーは、チームに参加したり、他のメンバーから追加されたり、管理者から追加されたりすることができます。ユーザーは、複数のチームに所属することができます。

## セットアップ

### ナビゲーション

Access the team directory page from [Organization Settings][1] or by navigating to [**Service Management > Teams**][2]. The [team directory page][1] lists all teams within your organization.

### チームの作成

1. [チームディレクトリページ][1]で、右上の **New Team** をクリックします。
1. **Team Name** を選択します。
1. **Handle** は、チーム名に基づいて入力されます。
1. Use the dropdown menu to select team members and team managers.
1. オプションで **Description** を指定します。
1. **作成**をクリックします。

**Note:** Allowed characters for team names and team handles are `a-z`, `A-Z`, `0-9`, and `._-:/`. Replace spaces with underscores.

### チームの修正

1. On the [team directory page][1], click the team you wish to modify. The [team detail page][3] appears. 
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

If you have teams with existing members, picking the SAML strict option overrides your settings and removes team members from those teams. Picking the All Sources option preserves existing memberships. To manage teams and team membership using SAML attributes, see [Map SAML attributes to Teams][4].

## チームハンドル

チームハンドルは、チームと Datadog のリソースをリンクします。チームハンドルは、検索バーやファセットに `team:<team-handle>` または `teams:<team-handle>` という形式で表示されます。

チームハンドルを探すには
1. チームディレクトリページでチーム名をクリックします。サイドパネルにチームの詳細が表示されます。
1. パネルの上部にある **handle** フィールドを探します。

リソースを定義されたチームと関連付けるには、一致するチームハンドルを持つチームが Datadog に存在する必要があります。定義されたチームに関連付けられたリソースをクリックすると、チームハンドルと追加情報を含む小さなウィンドウが表示されます。定義されたチームは、以下のチームフィルターのような追加機能を提供します。

Datadog で定義されたチームに関連付けられていないチームハンドルは、タグと同じような動作をします。Teams の機能を利用するために、未定義のチームハンドルを定義されたチームに変換してください。

### リソースとチームハンドルの関連付け

Datadog は、以下のリソースをチームハンドルに関連付けることをサポートしています。

- [Dashboards][5]
- [Incidents][6]
- [Monitors][7]
- [Resource Catalog][8]
- [Service Catalog][9]
- [Service Level Objectives][10]
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

The following table describes the products in which you can use the team filter:

| 製品リストページ       | フィルターベース                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [ダッシュボード][11]         | チームハンドル                                                                      |
| [Resource Catalog][8]   | チームハンドル                                                                      |
| [Service Catalog][12]    | チームハンドル                                                                      |
| [Incidents][13]          | チームハンドル                                                                      |
| [モニター][14]          | チームハンドル                                                                      |
| [APM Error Tracking][15] | Service owned by teams (determined by ownership inside the [Service Catalog][12]) |
| [Logs Error Tracking][16] | Service owned by teams (determined by ownership inside the [Service Catalog][12]) |
| [Service Level Objectives][17] | チームハンドル                                                                 |
| [Data Streams Monitoring][18]  | チームハンドル                                                                 |
| [Synthetic Tests][19]          | チームハンドル                                                                 |
| [Notebooks][20]          | チームハンドル                                                                      |



## 権限

Teams Manage 権限を持つロールのユーザーは、チームの作成、チーム名の変更、チームの削除、チームハンドルの変更が可能です。`user_access_manage` を持つユーザーは、チームメンバーやマネージャーの追加、削除、昇格が可能です。

## チームの管理

To customize your team, see [Team Management][3].


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /ja/account_management/teams/manage/
[4]: /ja/account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /ja/dashboards/#dashboard-details
[6]: /ja/service_management/incident_management/incident_details#overview-section
[7]: /ja/monitors/configuration/?tab=thresholdalert#add-metadata
[8]: /ja/infrastructure/resource_catalog/
[9]: /ja/tracing/service_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
[10]: /ja/service_management/service_level_objectives/#slo-tags
[11]: https://app.datadoghq.com/dashboard/lists
[12]: https://app.datadoghq.com/services
[13]: https://app.datadoghq.com/incidents
[14]: https://app.datadoghq.com/monitors/manage
[15]: https://app.datadoghq.com/apm/error-tracking
[16]: https://app.datadoghq.com/logs/error-tracking
[17]: https://app.datadoghq.com/slo/manage
[18]: https://app.datadoghq.com/data-streams
[19]: https://app.datadoghq.com/synthetics
[20]: https://app.datadoghq.com/notebook/list/