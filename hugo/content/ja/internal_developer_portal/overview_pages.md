---
aliases:
- /ja/software_catalog/overview_pages
description: Internal Developer Portal の概要ページでは、開発者が自分のアクションアイテムやサービスの健全性を確認できるほか、エンジニアリングマネージャーが信頼性や
  Scorecard のパフォーマンスを全体的に把握できます。
further_reading:
- link: actions/app_builder
  tag: ドキュメント
  text: App Builder
- link: monitors/
  tag: ドキュメント
  text: Datadog Monitors
- link: /incident_response/incident_management/
  tag: ドキュメント
  text: Incident Management
- link: /service_level_objectives/
  tag: ドキュメント
  text: Service Level Objectives
- link: error_tracking
  tag: ドキュメント
  text: Error Tracking
- link: watchdog
  tag: ドキュメント
  text: Watchdog
site_support_id: idp
title: 概要ページ
---
{{< callout url="https://www.datadoghq.com/product-preview/developer-overview-page/" header="開発者概要ページのプレビューに参加してください。" >}}
{{< /callout >}}

## 概要{#overview}

Datadog の Internal Developer Platform (IDP) には、各ステークホルダーにとって最も関連性の高い情報を表示する**概要ページ**が付属しています。
- 開発者は、自分のアクションアイテム、問題、チームのサービス情報を一元的に確認できます。
- SRE やエンジニアリングマネージャーは、チーム全体の製品の信頼性、サービスの健全性、Scorecard のパフォーマンス、その他の主要なメトリクスを俯瞰的に把握できます。

## 開発者概要ページ {#developer-overview-page}

{{< img src="tracing/eng_reports/developer-overview-page.png" alt="Internal Developer Portal の [My Workspace] (マイワークスペース) セクションにある開発者概要ページ。アラート、インシデント、SLO メトリクスの概要を示す [Overview] (概要) と、JIRA チケットを示す [My Tasks] (マイタスク) セクションが表示されています。" style="width:100%;" >}}

開発者概要ページでは、チームやサービスに関する以下の情報を一元管理できます。
- チームのモニター、インシデント、SLO
- GitHub のプルリクエスト
- チームのサービスと Scorecard のパフォーマンス
- 問題、エラー、Watchdog アラート

### 開発者概要ページの使用 {#using-the-developer-overview-page}

#### 使い始める{#get-started}

開発者概要ページに表示される [My Pull Requests] (マイプルリクエスト) ウィジェットは、[Datadog App Builder][9] を利用しており、初期状態ではデモデータが表示されます。

開発者概要ページで独自のデータを使用するには、[データソースを接続][10] してください。
1. IDP の [**Overview**] タブを選択し、左側のメニューで [**My Workspace**] を選択すると、開発者概要ページが表示されます。
1. このウィジェットの場合:

   1. [**+ Connect Data**] (+ データを接続) をクリックします。
   1. 新しいコネクションを作成するか、既存のコネクションを選択します。

   <br>
   選択内容を保存すると、ウィジェットにコネクションからのデータが表示されます。ウィジェット内の [Change Connection] (コネクションを変更) をクリックすることで、選択した接続を変更できます。

<div class="alert alert-info">データの接続は一度のみ必要なセットアップタスクで、選択したコネクションはチーム全体に適用されます。</div>

#### 表示をパーソナライズ {#personalize-your-view}

ページ上部のフィルターに値を入力して、表示をパーソナライズできます。
- **Team**: [Datadog Team][8] の名前
- **Github_Org**: GitHub 組織の名前
- **Github_Username**: GitHub ユーザー名

<div class="alert alert-info">これらのフィルター値は、"My Workspace" に戻ったときにも保持されます。</div>

### ページ機能 {#page-features}

開発者概要ページには、デフォルトで以下のウィジェットが含まれています。

#### モニター、インシデント、SLO {#monitors-incidents-and-slos}

Datadog の [Monitors][6]、[Incident Management][3]、[SLOs][7] からのライブシグナルを表示します。これらの製品が有効になるまで、ウィジェットは空のままです。

#### GitHub プルリクエスト {#github-pull-requests}

提供された GitHub 組織とユーザー名に基づいて、作成したプルリクエストとレビューを割り当てられたプルリクエストを一覧表示します。

#### チームサービスと Scorecard のパフォーマンス {#team-services-and-scorecard-performance}

- **My team's services** (自分のチームのサービス): **Team** フィルターで選択したチームが所有するサービスを一覧表示します。
- **Scorecard performance by service** (サービス別の Scorecard パフォーマンス): **Team** フィルターで選択したチームが所有する各サービスについて、すべてのスコアカードの平均スコアを表示します。

#### 問題とエラー {#issues-and-errors}

[Datadog Incidents][3] および [Error Tracking][4] によって検出された問題とエラーを表示します。これらの製品が有効になるまで、ウィジェットは空のままです。

#### Watchdog アラート {#watchdog-alerts}

[Datadog Watchdog][5] からのアラートをキャプチャします。

### 複製してさらにカスタマイズ {#clone-for-further-customization}

ビューをカスタマイズする必要がある場合は、右上の [**Clone as dashboard**] (ダッシュボードとして複製) をクリックします。これにより、[**My Workspace**] ページの内容が事前入力された状態でダッシュボードが作成されます。

複製したダッシュボードで行えるカスタマイズの例をいくつか紹介します。
- Datadog の [Action Catalog][11] を使用して [埋め込みアプリ][2] を作成し、サードパーティの追加データを表示します (例: PagerDuty のオンコール情報を表示します)。
- [ウィジェット][12] のサイズ変更、並べ替え、追加/削除を行って、表示全体のレイアウトとデザインを更新します。
- [Note][13] ウィジェットを使用して、組織に関連する情報を含むお知らせと更新情報のセクションを追加します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/app_builder
[2]: /ja/actions/app_builder/embedded_apps/
[3]: /ja/incident_response/incident_management/
[4]: /ja/error_tracking/
[5]: /ja/watchdog/
[6]: /ja/monitors/
[7]: /ja/service_level_objectives/
[8]: /ja/account_management/teams/
[9]: /ja/actions/app_builder/#apps-created-by-datadog
[10]: /ja/actions/connections
[11]: /ja/actions/actions_catalog/
[12]: /ja/dashboards/widgets/
[13]: /ja/dashboards/widgets/note/