---
title: チーム
---

## 概要
Datadog Teams は、ユーザーグループが Datadog 内でチームのアセットを整理し、Datadog 全体のエクスペリエンスに自動的にフィルターをかけて、これらのアセットに優先順位をつけることができるようにします。

Teams を使用して、ダッシュボード、サービス、モニター、インシデントなどのリソースをユーザーのグループにリンクします。また、Slack チャンネル、Jira ボード、GitHub リポジトリなどに、チーム固有のリンクを追加することもできます。

チームメンバーシップは柔軟です。ユーザーは、チームに参加したり、他のメンバーから追加されたり、管理者から追加されたりすることができます。ユーザーは、複数のチームに所属することができます。

## セットアップ

### ナビゲーション

[組織設定][1]から、または [**Service Management > Teams**][2] に移動してチームディレクトリページにアクセスします。[チームディレクトリページ][1]には、組織内のすべてのチームが一覧表示されます。

### チームの作成

1. [チームディレクトリページ][1]で、右上の **New Team** をクリックします。
1. **Team Name** を選択します。
1. **Handle** は、チーム名に基づいて入力されます。
1. ドロップダウンメニューを使用してチームメンバーおよびチームマネージャーを選択します。
1. オプションで **Description** を指定します。
1. **作成**をクリックします。

**注**: 

- チーム名に使用できる文字は `a-z`、`A-Z`、`0-9`、および `._-:/` です。スペースはアンダースコアに置き換えてください。
- チームハンドルに使用できる文字は `a-z`、`0-9`、および `._-:/` です。最後の文字はアンダースコアにすることはできません。

### チームの修正

1. [チームディレクトリページ][1]で、変更したいチームをクリックします。[チーム詳細ページ][3]が表示されます。
1. 画面上部の**設定**の歯車をクリックします。ポップアップウィンドウが表示されます。
1. 修正したい項目を選択します。
1. 変更を行い、**Save** をクリックします。

### プロビジョニングソースの選択

管理者とチームマネージャーがチームメンバーシップを更新する方法を 3 つのオプションから選択します。

UI and API
: UI アクションと API 呼び出しのみでメンバーシップを更新します

SAML
: *SAML 限定*モデルを使用して、アイデンティティプロバイダーデータでチームメンバーシップを決定するようにします

All sources
: 出発点として SAML を使用し、UI および API によるオーバーライドを許可します

1. [チームディレクトリページ][1]で、**Teams Settings** をクリックします。
1. **Team Provisioning Sources** のオプションのいずれかを選択します。

既存メンバーがいるチームがある場合、SAML strict オプションを選択すると、設定が上書きされ、そのチームからメンバーが削除されます。All Sources オプションを選択すると、既存のメンバーシップは維持されます。SAML 属性を使用してチームやチームメンバーシップを管理する方法については、[SAML 属性を Teams にマッピングする][4]を参照してください。

## チームハンドル

チームハンドルは、チームと Datadog のリソースをリンクします。チームハンドルは、検索バーやファセットに `team:<team-handle>` または `teams:<team-handle>` という形式で表示されます。

チームハンドルを探すには
1. チームディレクトリページでチーム名をクリックします。チーム詳細ページが表示されます。
1. チームハンドルはページ上部の名前の右側に表示されます。

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

### 通知を特定のコミュニケーションチャンネルに送信する

通知チャンネルをチームに追加して、Slack や Microsoft Teams などのコミュニケーションチャンネルにアラートをルーティングします。`@team-<handle>` を対象とするモニターアラートは、選択したチャンネルにリダイレクトされます。

1. [チームディレクトリページ][1]で、修正したいチームをクリックします。
1. 画面上部の**設定**の歯車をクリックします。ポップアップウィンドウが表示されます。
1. **Notifications** を選択します。
1. チャンネルを追加し、**Save** をクリックします。

## チームフィルター

チームフィルターは、Datadog 全体でのエクスペリエンスを、所属チームに関連するコンテンツのみを表示するように調整します。**My Teams** リストには、自分がメンバーであるチームおよびお気に入りに追加したチームが含まれます。

{{< img src="/account_management/teams/team-filter.png" alt="チームフィルターが赤枠で囲まれたモニターリストページ。My Teams の 3 つのうち 2 つが選択されている状態。">}}

チームフィルターを有効にすると、自分が所属するチーム、またはそのチームが所有するサービスに関連するリソースのみが表示されます。チームフィルターの状態はグローバルかつ永続的であるため、Datadog 内のさまざまな製品間を移動しても、チームコンテキストが適用され続けます。

チームフィルターは、チームベースの検索用語を検索クエリに追加して機能します。チームフィルターを有効にすると、検索バーで追加されたチームベースの検索用語を確認できます。

### お気に入りのチーム

特定のチームのリソースに関心があっても、そのチームのメンバーである必要はありません。お気に入りのチームに追加することで、そのチームに関連するリソースをフィルタリングしたビューを、チームに参加せずに得ることができます。

お気に入りにしたチームは、自分が所属するチームとともにチームディレクトリページの上部やチームフィルター内に表示されます。

#### お気に入りのチームの追加または削除

チームをお気に入りに追加または削除するには、チームディレクトリページまたはチームフィルターから行えます。

[チームディレクトリページ][1]から、
1. お気に入りに追加したいチームをクリックします。[チーム詳細ページ][3]が表示されます。
1. 右上で **Add Favorite** または **Remove Favorite** をクリックします。

あるいは、同じくチームディレクトリページで、
1. お気に入りに追加または削除したいチームにカーソルを合わせます。チーム名の右側にインラインアイコンが表示されます。
1. 星型アイコン (**Add to Favorites** または **Remove from Favorites**) をクリックします。

チームフィルターから、
1. フィルターが折りたたまれている場合、**My Teams** をクリックして展開します。
1. **Add Favorites** をクリックします。検索ボックスとチームのリストが表示されます。
1. チーム名を検索ボックスに入力してチームリストを絞り込みます。
1. 目的のチームの横にある星をクリックして、お気に入りに追加または削除します。

### 対応製品

以下の表は、チームフィルターを使用できる製品を示します。

| 製品リストページ       | フィルターベース                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [ダッシュボード][11]         | チームハンドル                                                                      |
| [Resource Catalog][8]   | チームハンドル                                                                      |
| [Service Catalog][12]    | チームハンドル                                                                      |
| [Incidents][13]          | チームハンドル                                                                      |
| [モニター][14]          | チームハンドル                                                                      |
| [APM Error Tracking][15] | チームが所有するサービス ([Service Catalog][12]内での所有権により決定)  |
| [Logs Error Tracking][16] | チームが所有するサービス ([Service Catalog][12]内での所有権により決定)  |
| [Service Level Objectives][17] | チームハンドル                                                                 |
| [Data Streams Monitoring][18]  | チームハンドル                                                                 |
| [Synthetic Tests][19]          | チームハンドル                                                                 |
| [Notebooks][20]          | チームハンドル                                                                      |


## 権限

Teams Manage 権限を持つロールのユーザーは、チームの作成、チーム名の変更、チームの削除、チームハンドルの変更が可能です。`user_access_manage` を持つユーザーは、チームメンバーやマネージャーの追加、削除、昇格が可能です。

## チームの管理

チームをカスタマイズする方法については、[Team Management][3] を参照してください。


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /ja/account_management/teams/manage/
[4]: /ja/account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /ja/dashboards/#dashboard-details
[6]: /ja/service_management/incident_management/
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