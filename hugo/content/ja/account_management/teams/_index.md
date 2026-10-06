---
description: チームのアセットを整理し、Datadog のエクスペリエンスをフィルタリングし、チームハンドル、通知、リソースの関連付けを使用してチームメンバーシップを管理します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: ブログ
  text: Datadog Teams の GitHub 統合でサービスオーナーシップを最新の状態に保つ
title: Teams
---
## 概要 {#overview}
Datadog Teams を使用すると、ユーザーグループは Datadog 内のチームアセットを整理し、Datadog 全体のエクスペリエンスを自動的にフィルタリングして、これらのアセットを優先的に表示できます。

Teams を使用して、ダッシュボード、サービス、モニター、インシデントなどのリソースをユーザーグループにリンクします。Slack チャンネル、Jira ボード、GitHub リポジトリなどへのチーム固有のリンクを追加することもできます。

チームメンバーシップはフレキシブルです。ユーザーはチームに参加したり、他のメンバーによって追加されたり、管理者によって追加されたりすることができます。ユーザーは複数のチームに所属できます。

## セットアップ {#setup}

### ナビゲーション {#navigation}

[Organization Settings][1] から、または [**Teams**][2] に移動して、チームディレクトリページにアクセスします。[チームディレクトリページ][1] には、組織内のすべてのチームがリスト表示されます。

### チームを作成する {#create-team}

1. [チームディレクトリページ][1] で、右上の {{< ui >}}New Team{{< /ui >}} をクリックします。
1. {{< ui >}}Team Name{{< /ui >}} を選択します。
1. {{< ui >}}Handle{{< /ui >}} はチーム名に基づいて入力されます。
1. ドロップダウンメニューを使用して、チームメンバーとチームマネージャーを選択します。
1. オプションの {{< ui >}}Description{{< /ui >}} を指定します。
1. {{< ui >}}Create{{< /ui >}} をクリックします。

**注**: 

- チーム名に使用できる文字は、`a-z`、`A-Z`、`0-9`、および `._-:/` です。スペースはアンダースコアに置き換えます。
- チームハンドルに使用できる文字は、`a-z`、`0-9`、および `._-:/` です。最後の文字にアンダースコアは使用できません。

### チームを変更する {#modify-team}

1. [チームディレクトリページ][1] で、変更したいチームをクリックします。[チーム詳細ページ][3] が表示されます。
1. 画面上部の {{< ui >}}Settings{{< /ui >}} 歯車アイコンをクリックします。ポップアップウィンドウが表示されます。
1. 変更する項目を選択します。
1. 変更を行い、{{< ui >}}Save{{< /ui >}} をクリックします。

### プロビジョニングソースを選択する {#choose-provisioning-source}

管理者およびチームマネージャーがチームメンバーシップを更新する方法を以下の 3 つのオプションから選択します。

UI および API
: UI アクションおよび API 呼び出しを通じてのみメンバーシップを更新する

SAML
: *SAML 厳密*モデルを使用して、ID プロバイダーのデータでチームメンバーシップを決定します。

すべてのソース
: SAML を開始点として使用し、UI および API 経由での上書きを許可します

1. [チームディレクトリページ][1] で、{{< ui >}}Teams Settings{{< /ui >}} をクリックします。
1. {{< ui >}}Team Provisioning Sources{{< /ui >}} の下にあるオプションのいずれかを選択します。

既存のメンバーがいるチームがある場合、SAML 厳密オプションを選択すると設定が上書きされ、それらのチームからチームメンバーが削除されます。すべてのソースオプションを選択すると、既存のメンバーシップが保持されます。SAML 属性を使用してチームとチームメンバーシップを管理する方法については、[SAML 属性を Teams にマッピングする][4] を参照してください。

## チーム階層 {#team-hierarchies}

組織の構造を反映するようにチームを相互にネスト (サブチーム) し、その結果を Teams マップとして視覚化します。GitHub Teams、Teams API、Terraform、または Datadog UI を使用してチーム間の階層関係を定義する方法については、[チーム階層][39] を参照してください。

## チームハンドル {#team-handle}

チームハンドルは、チームと Datadog リソースをリンクします。チームハンドルは、検索バーやファセットに `team:<team-handle>` または `teams:<team-handle>` の形式で表示されます。

チームハンドルを確認するには、以下の手順に従います。
1. チームディレクトリページでチーム名をクリックします。チーム詳細ページが表示されます。
1. チームハンドルは、ページ上部の名前の右側に表示されます。

リソースを定義済みのチームに関連付けるには、一致するチームハンドルを持つチームが Datadog 内に存在する必要があります。定義済みのチームに関連付けられたリソースをクリックすると、チームハンドルと追加情報が記載された小さなウィンドウが表示されます。定義済みのチームは、以下のチームフィルターなどの追加機能を提供します。

Datadog で定義されたチームに関連付けられていないチームハンドルは、タグと同様に機能します。未定義のチームハンドルを定義済み Teams に変換して、Teams 機能を活用してください。

### リソースをチームハンドルに関連付ける {#associate-resources-with-team-handles}

Datadog は以下のリソースをチームハンドルに関連付けることをサポートしています。

- [Dashboards][5]
- [Incidents][6]
- [Monitors][7]
- [Resource Catalog][8]
- [Catalog][9]
- [Service Level Objectives][10]
- Synthetic Tests、Global Variables、Private Locations

### 特定の通信チャネルに通知を送信する {#send-notifications-to-a-specific-communication-channel}

チームに通知チャネルを追加して、Slack や Microsoft Teams などの通信チャネルにアラートをルーティングします。`@team-<handle>` を対象とするモニターアラートは、選択したチャネルにリダイレクトされます。

1. [チームディレクトリページ][1] で、変更したいチームをクリックします。
1. 画面上部の {{< ui >}}Settings{{< /ui >}} 歯車アイコンをクリックします。ポップアップウィンドウが表示されます。
1. {{< ui >}}Notifications{{< /ui >}} を選択します。
1. チャネルを追加し、{{< ui >}}Save{{< /ui >}} をクリックします。

## チームフィルター {#team-filter}

チームフィルターを使用すると、所属チームに関連付けられたコンテンツが表示され、Datadog でのエクスペリエンスが最適化されます。{{< ui >}}My Teams{{< /ui >}} リストには、自分がメンバーであるチームと、お気に入りとして選択したチームが含まれます。

{{< img src="/account_management/teams/team-filter.png" alt="チームフィルターの周囲に赤い枠線が表示されたモニターリストページ。3 つのうち 2 つのマイチームが選択されています。">}}

チームフィルターを有効にすると、自分のチームに関連付けられたリソース、または自分のチームが所有するサービスに関連付けられたリソースのみが表示されます。チームフィルターの状態はグローバルで永続的であるため、Datadog は異なる製品間を移動する際にもチームコンテキストを適用します。

チームフィルターは、検索クエリにチームベースの検索語句を追加することで機能します。チームフィルターを有効にすると、検索バーに追加されたチームベースの検索語句を確認できます。

### お気に入りのチーム {#favorite-teams}

特定のチームのメンバーでなくても、そのチームのリソースに関心がある場合があります。チームをお気に入りに追加すると、そのチームに参加しなくても、そのチームのリソースに関するフィルタリングされたビューを取得できます。

お気に入りのチームは、チームディレクトリページの上部とチームフィルター内に所属しているチームと並んで表示されます。

#### お気に入りのチームを追加または削除する {#add-or-remove-favorite-teams}

チームディレクトリページまたはチームフィルターで、チームをお気に入りに追加したり、お気に入りから削除したりできます。

[チームディレクトリページ][1] から以下の手順を実行します。
1. お気に入りとして追加したいチームをクリックします。[チーム詳細ページ][3] が表示されます。
1. 右上の {{< ui >}}Add Favorite{{< /ui >}} または {{< ui >}}Remove Favorite{{< /ui >}} をクリックします。

または、同じくチームディレクトリページから以下の手順を実行します。
1. 追加または削除したいチームにカーソルを合わせます。チーム名の右側にインラインアイコンが表示されます。
1. 星 ({{< ui >}}Add to Favorites{{< /ui >}} または {{< ui >}}Remove from Favorites{{< /ui >}}) アイコンをクリックします。

チームフィルターから以下の手順を実行します。
1. フィルターが折りたたまれている場合は、{{< ui >}}My Teams{{< /ui >}} をクリックして展開します。
1. {{< ui >}}Add Favorites{{< /ui >}} をクリックします。検索ボックスとチームのリストが表示されます。
1. チームのリストを絞り込むには、検索ボックスでチーム名の入力を始めます。
1. 目的のチームの横にある星をクリックすると、お気に入りに追加したり削除したりできます。

### サポートされている製品 {#supported-products}

次のテーブルは、チームフィルターを使用できる製品について説明しています。

| 製品リストページ              | フィルターの基準                                                                       |
|--------------------------------|------------------------------------------------------------------------------------|
| [APM Error Tracking][15]       | チームが所有するサービス ([Catalog][12] 内の所有権によって決定) |
| [Apps][21]                     | チームハンドル                                                                        |
| [Work Management projects][22] | チームハンドル                                                                        |
| [Connections][23]              | チームハンドル                                                                        |
| [Connection Groups][24]        | チームハンドル                                                                        |
| [Cross Org Connections][25]    | チームハンドル                                                                        |
| [Datastores][26]               | チームハンドル                                                                        |
| [Data Streams Monitoring][18]  | チームハンドル                                                                        |
| [Dashboards][11]               | チームハンドル                                                                        |
| [Incidents][13]                | チームハンドル                                                                        |
| [Integrations][27]             | チームハンドル                                                                        |
| [Logs Error Tracking][16]      | チームが所有するサービス ([Resource Catalog][12] 内の所有権によって決定) |
| [Logs Pipelines][28]           | チームハンドル                                                                        |
| [Monitors][14]                 | チームハンドル                                                                        |
| [Notebooks][20]                | チームハンドル                                                                        |
| [Observability Pipelines][29]  | チームハンドル                                                                        |
| [On-Call][30]                  | チームが所有するサービス ([Resource Catalog][12] 内の所有権によって決定) |
| [Powerpacks][32]               | チームハンドル                                                                        |
| [Private Action Runner][31]    | チームハンドル                                                                        |
| [Reference tables][33]         | チームハンドル                                                                        |
| [Resource Catalog][8]          | チームハンドル                                                                        |
| [RUM apps][34]                 | チームハンドル                                                                        |
| [Security rules][35]           | チームハンドル                                                                        |
| [Security suppressions][36]    | チームハンドル                                                                        |
| [Service Level Objectives][17] | チームハンドル                                                                        |
| [Sheets][37]                   | チームハンドル                                                                        |
| [Catalog][12]         | チームハンドル                                                                        |
| [Synthetic Tests][19]          | チームハンドル                                                                        |
| [Workflows][38]                | チームハンドル                                                                        |


## 権限 {#permissions}

Teams Manage 権限を持つロールのユーザーは、チームの作成、名前の変更、削除、およびチームハンドルの変更を行うことができます。`user_access_manage` を持つユーザーは、チームメンバーやマネージャーの追加、削除、昇格を行うことができます。

## チームを管理する {#manage-teams}

チームをカスタマイズするには、[チーム管理][3] をご覧ください。


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /ja/account_management/teams/manage/
[4]: /ja/account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /ja/dashboards/#dashboard-details
[6]: /ja/incident_response/incident_management/
[7]: /ja/monitors/configuration/?tab=thresholdalert#add-metadata
[8]: https://app.datadoghq.com/infrastructure/catalog
[9]: /ja/internal_developer_portal/catalog/entity_model/
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
[22]: https://app.datadoghq.com/work
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
[39]: /ja/account_management/teams/manage/#team-hierarchies