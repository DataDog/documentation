---
description: チームのアセットを整理し、Datadog のエクスペリエンスにフィルターをかけ、チームハンドル、通知、リソースの関連付けを使用してチームメンバーシップを管理します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: ブログ
  text: Datadog Teams の GitHub インテグレーションを使用して、サービスの所有権を最新の状態に保ちます。
title: Teams
---
## 概要 {#overview}
Datadog Teams は、ユーザーグループが Datadog 内でチームのアセットを整理し、Datadog 全体のエクスペリエンスに自動的にフィルターをかけて、これらのアセットに優先順位を付けることができるようにします。

Teams を使用して、ダッシュボード、サービス、モニター、インシデントなどのリソースをユーザーのグループにリンクします。また、Slack チャンネル、Jira ボード、GitHub リポジトリなどに、チーム固有のリンクを追加することもできます。

チームメンバーシップは柔軟です。ユーザーは、チームに参加したり、ほかのメンバーから追加されたり、管理者から追加されたりすることができます。ユーザーは複数のチームに所属できます。

## セットアップ {#setup}

### ナビゲーション {#navigation}

[組織設定][1] から、または [**Teams**][2] に移動してチームディレクトリページにアクセスします。[チームディレクトリページ][1] には、組織内のすべてのチームが一覧表示されます。

### チームの作成 {#create-team}

1. [チームディレクトリページ][1] で、右上の [{{< ui >}}New Team{{< /ui >}}] (新規チーム) をクリックします。
1. [{{< ui >}}Team Name{{< /ui >}}] (チーム名) を選択します。
1. [{{< ui >}}Handle{{< /ui >}}] (ハンドル) は、チーム名に基づいて入力されます。
1. ドロップダウンメニューを使用して、チームメンバーおよびチームマネージャーを選択します。
1. オプションで [{{< ui >}}Description{{< /ui >}}] (説明) を入力します。
1. [{{< ui >}}Create{{< /ui >}}] (作成) をクリックします。

**注**: 

- チーム名に使用できる文字は、`a-z`、`A-Z`、`0-9`、および `._-:/` です。スペースはアンダースコアに置き換えてください。
- チームハンドルに使用できる文字は、`a-z`、`0-9`、および `._-:/` です。最後の文字はアンダースコアにすることはできません。

### チームの修正 {#modify-team}

1. [チームディレクトリページ][1] で、修正するチームをクリックします。[チーム詳細ページ][3] が表示されます。
1. 画面上部にある [{{< ui >}}Settings{{< /ui >}}] (設定) の歯車をクリックします。ポップアップウィンドウが表示されます。
1. 修正する項目を選択します。
1. 変更を行い、[{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

### プロビジョニングソースの選択 {#choose-provisioning-source}

管理者とチームマネージャーがチームメンバーシップを更新する方法を 3 つのオプションから選択します。

UI and API (UI と API)
: UI アクションと API 呼び出しのみでメンバーシップを更新します。

SAML
: *SAML 限定*モデルを使用し、アイデンティティプロバイダーデータによってチームメンバーシップが決定されるようにします。

All sources (すべてのソース)
: 出発点として SAML を使用し、UI および API によるオーバーライドを許可します。

1. [チームディレクトリページ][1] で、[{{< ui >}}Teams Settings{{< /ui >}}] (チーム設定) をクリックします。
1. [{{< ui >}}Team Provisioning Sources{{< /ui >}}] (チームプロビジョニングソース) のいずれかのオプションを選択します。

既存メンバーがいるチームがある場合、SAML 限定オプションを選択すると、設定が上書きされ、そのチームからメンバーが削除されます。[All Sources] オプションを選択すると、既存のメンバーシップが維持されます。SAML 属性を使用してチームおよびチームメンバーシップを管理するには、[SAML 属性のチームへのマッピング][4] を参照してください。

## チームハンドル {#team-handle}

チームハンドルは、チームと Datadog のリソースをリンクします。チームハンドルは、検索バーやファセットに `team:<team-handle>` または `teams:<team-handle>` という形式で表示されます。

チームハンドルを探すには
1. チームディレクトリページでチーム名をクリックします。チーム詳細ページが表示されます。
1. チームハンドルはページ上部の名前の右側に表示されます。

リソースを定義されたチームに関連付けるには、一致するチームハンドルを持つチームが Datadog に存在する必要があります。定義されたチームに関連付けられたリソースをクリックすると、チームハンドルと追加情報を含む小さなウィンドウが表示されます。定義されたチームは、以下のチームフィルターのような追加機能を提供します。

Datadog で定義されたチームに関連付けられていないチームハンドルは、タグと同じような動作をします。Teams の機能を利用するために、未定義のチームハンドルを定義されたチームに変換してください。

### リソースとチームハンドルの関連付け {#associate-resources-with-team-handles}

Datadog は、以下のリソースをチームハンドルに関連付けることをサポートしています。

- [Dashboards][5]
- [インシデント][6]
- [モニター][7]
- [Resource Catalog][8]
- [Software Catalog][9]
- [Service Level Objectives][10]
- Synthetic テスト、グローバル変数、プライベートロケーション

### 通知を特定のコミュニケーションチャンネルに送信する {#send-notifications-to-a-specific-communication-channel}

通知チャンネルをチームに追加して、Slack や Microsoft Teams などのコミュニケーションチャンネルにアラートをルーティングします。`@team-<handle>` を対象とするモニターアラートは、選択したチャンネルにリダイレクトされます。

1. [チームディレクトリページ][1] で、修正するチームをクリックします。
1. 画面上部にある [{{< ui >}}Settings{{< /ui >}}] の歯車をクリックします。ポップアップウィンドウが表示されます。
1. [{{< ui >}}Notifications{{< /ui >}}] (通知) を選択します。
1. チャンネルを追加して、[{{< ui >}}Save{{< /ui >}}] をクリックします。

## チームフィルター {#team-filter}

チームフィルターは、Datadog 全体でのエクスペリエンスを、所属チームに関連するコンテンツのみを表示するように調整します。[{{< ui >}}My Teams{{< /ui >}}] (自分のチーム) リストには、自分がメンバーであるチームおよびお気に入りとして選択したチームが含まれます。

{{< img src="/account_management/teams/team-filter.png" alt="チームフィルターが赤いボックスで囲まれている、モニターリストページ。3 つの [My Teams] のうち、2 つが選択されています。">}}

チームフィルターを有効にすると、自分が所属するチームに関連するリソース、またはそのチームが所有するサービスに関連するリソースのみが表示されます。チームフィルターの状態はグローバルかつ永続的であるため、Datadog 内のさまざまな製品間を移動しても、チームコンテキストが適用され続けます。

チームフィルターは、チームベースの検索用語を検索クエリに追加することで機能します。チームフィルターを有効にすると、検索バーで追加されたチームベースの検索用語を確認できます。

### お気に入りのチーム {#favorite-teams}

特定のチームのメンバーではないが、そのチームのリソースに関心があるという場合があります。そのチームをお気に入りに追加することで、チームに参加することなく、チームのリソースのみをフィルターして表示することができます。

お気に入りにしたチームは、自分が所属するチームとともにチームディレクトリページの上部やチームフィルター内に表示されます。

#### お気に入りのチームの追加または削除 {#add-or-remove-favorite-teams}

チームをお気に入りに追加または削除するには、チームディレクトリページまたはチームフィルターから行えます。

[チームディレクトリページ][1] から、
1. お気に入りに追加するチームをクリックします。[チーム詳細ページ][3] が表示されます。
1. 右上の [{{< ui >}}Add Favorite{{< /ui >}}] (お気に入りに追加) または [{{< ui >}}Remove Favorite{{< /ui >}}] (お気に入りを削除) をクリックします。

あるいは、同じくチームディレクトリページで、
1. 追加または削除するチームにカーソルを合わせます。チーム名の右側にインラインアイコンが表示されます。
1. 星のアイコン ([{{< ui >}}Add to Favorites{{< /ui >}}] または [{{< ui >}}Remove from Favorites{{< /ui >}}]) をクリックします。

チームフィルターから、
1. フィルターが折りたたまれている場合、[{{< ui >}}My Teams{{< /ui >}}] をクリックして展開します。
1. [{{< ui >}}Add Favorites{{< /ui >}}] をクリックします。検索ボックスとチームのリストが表示されます。
1. チーム名を検索ボックスに入力してチームリストを絞り込みます。
1. 目的のチームの横にある星をクリックして、お気に入りに追加または削除します。

### 対応製品 {#supported-products}

以下の表は、チームフィルターを使用できる製品を示します。

| 製品リストページ              | フィルターの基準                                                                       |
|--------------------------------|------------------------------------------------------------------------------------|
| [APM Error Tracking][15]       | チームが所有するサービス ([Software Catalog][12] 内での所有権により決定) |
| [アプリ][21]                     | チームハンドル                                                                        |
| [Case Management プロジェクト][22] | チームハンドル                                                                        |
| [コネクション][23]              | チームハンドル                                                                        |
| [コネクショングループ][24]        | チームハンドル                                                                        |
| [組織間コネクション][25]    | チームハンドル                                                                        |
| [Datastore][26]               | チームハンドル                                                                        |
| [Data Streams Monitoring][18]  | チームハンドル                                                                        |
| [Dashboards][11]               | チームハンドル                                                                        |
| [インシデント][13]                | チームハンドル                                                                        |
| [Integrations][27]             | チームハンドル                                                                        |
| [Logs Error Tracking][16]      | チームが所有するサービス ([Software Catalog][12] 内での所有権により決定) |
| [Logs Pipelines][28]           | チームハンドル                                                                        |
| [モニター][14]                 | チームハンドル                                                                        |
| [Notebooks][20]                | チームハンドル                                                                        |
| [Observability Pipelines][29]  | チームハンドル                                                                        |
| [On-Call][30]                  | チームが所有するサービス ([Software Catalog][12] 内での所有権により決定) |
| [パワーパック][32]               | チームハンドル                                                                        |
| [Private Action Runner][31]    | チームハンドル                                                                        |
| [リファレンステーブル][33]         | チームハンドル                                                                        |
| [Resource Catalog][8]          | チームハンドル                                                                        |
| [RUM アプリ][34]                 | チームハンドル                                                                        |
| [セキュリティルール][35]           | チームハンドル                                                                        |
| [セキュリティ抑制][36]    | チームハンドル                                                                        |
| [Service Level Objectives][17] | チームハンドル                                                                        |
| [Sheets][37]                   | チームハンドル                                                                        |
| [Software Catalog][12]         | チームハンドル                                                                        |
| [Synthetic テスト][19]          | チームハンドル                                                                        |
| [ワークフロー][38]                | チームハンドル                                                                        |


## 権限 {#permissions}

[Teams Manage] (チーム管理) 権限を持つロールのユーザーは、チームの作成、チーム名の変更、チームの削除、チームハンドルの変更を行うことができます。`user_access_manage` を持つユーザーは、チームメンバーやマネージャーの追加、削除、昇格が可能です。

## チームの管理 {#manage-teams}

チームをカスタマイズする方法については、[チーム管理][3] を参照してください。


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /ja/account_management/teams/manage/
[4]: /ja/account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /ja/dashboards/#dashboard-details
[6]: /ja/incident_response/incident_management/
[7]: /ja/monitors/configuration/?tab=thresholdalert#add-metadata
[8]: https://app.datadoghq.com/infrastructure/catalog
[9]: /ja/tracing/software_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
[10]: /ja/service_level_objectives/#slo-tags
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
[21]: https://app.datadoghq.com/app-builder/apps/list
[22]: https://app.datadoghq.com/cases
[23]: https://app.datadoghq.com/actions/connections
[24]: https://app.datadoghq.com/actions/connections?sort=-updated_at&tab=groups
[25]: https://app.datadoghq.com/organization-settings/cross-org-visibility
[26]: https://app.datadoghq.com/actions/datastores
[27]: https://app.datadoghq.com/integrations
[28]: https://app.datadoghq.com/logs/pipelines
[29]: https://app.datadoghq.com/observability-pipelines
[30]: https://app.datadoghq.com/on-call/summary
[31]: https://app.datadoghq.com/actions/private-action-runners
[32]: /ja/dashboards/widgets/powerpack/#powerpack-permissions
[33]: https://app.datadoghq.com/reference-tables
[34]: https://app.datadoghq.com/rum/list
[35]: https://app.datadoghq.com/security/configuration/notification-rules
[36]: https://app.datadoghq.com/security/configuration/suppressions
[37]: https://app.datadoghq.com/sheets
[38]: https://app.datadoghq.com/workflow