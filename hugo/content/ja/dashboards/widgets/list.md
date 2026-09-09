---
algolia:
  tags:
  - event stream
  - log stream
description: ダッシュボードウィジェットで、ログ、RUM、イベント、その他のソースからのイベントや問題のリストを表示します。
further_reading:
- link: /dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
- link: /notebooks/
  tag: ドキュメント
  text: Notebooks
- link: https://learn.datadoghq.com/courses/discovering-table-list-widgets
  tag: ラーニングセンター
  text: テーブル、リスト、SLO、アーキテクチャウィジェットの発見
title: リストウィジェット
widget_type: list_stream
---
リストウィジェットは、ログ、RUM、イベントなど、さまざまなソースからのイベントや問題のリストを表示します。ソース全体を検索およびクエリして、ウィジェットでハイライトおよび表示したいイベントを絞り込みます。

_エラートラッキングの問題を表示するリストウィジェット_

{{< img src="dashboards/widgets/list/list_overview.png" alt="エラーのリスト、エラー数、およびボリュームを表示するリストウィジェット。" style="width:50%;">}}

## セットアップ {#setup}

{{< img src="dashboards/widgets/list/list_setup.png" alt="リストウィジェットの構成モーダル" style="width:100%;">}}

### 構成 {#configuration}

1. グラフ化するデータのタイプを選択します。リストウィジェットは、組織で有効になっている製品に応じて、多くのデータソースをサポートしています。全リストについては、[サポートされているデータソース](#supported-data-sources) を参照してください。

2. 表示設定を行います。スクリーンボードや Notebooks では、ウィジェットにカスタムの時間枠を使用するかグローバルな時間枠を使用するかを選択します。

3. オプション: グラフにタイトルを付けます (空白のままにすると、推奨タイトルが使用されます)。

### サポートされているデータソース {#supported-data-sources}

ソースのドロップダウンで利用可能なデータソースは、組織で有効になっている製品によって異なります。次のテーブルに、各データソース、表示されるデータ、および製品要件を記載します。利用可能な場合は、テーブル内のデータソースをクリックしてその構成オプションに移動できます。

_(プレビュー)_ とマークされたデータソースはプレビュー版であり、組織では利用できない場合があります。

| データソース | 説明 | 要件 |
|-------------|-------------|--------------|
| [Audit Trail](#options) | 組織全体のアクティビティを追跡する監査イベント。| Audit Trail |
| [Cases](#cases) | チーム間で作業を追跡およびトリアージするケース。| Case Management |
| [CD Deployments](#options) _(プレビュー)_ | Continuous Delivery デプロイメント実行。| CD Visibility |
| [CI パイプライン](#ci-pipeline) | CI パイプラインの実行。| CI Pipeline Visibility |
| [CI Test](#options) | CI テストの実行。| Test Optimization |
| [Data Observability](#data-observability-preview) _(プレビュー)_ | Data Observability から得られるデータセットやリネージなどのデータアセット。| Data Observability |
| [Database Recommendations](#database-recommendations-preview) _(プレビュー)_ | Database Monitoring からの最適化推奨事項。| Database Monitoring |
| [DDSQL Editor](#notebook-ddsql-editor-reference-tables-and-developer-portal) | DDSQL クエリの結果。| None |
| [Detection Rules](#detection-rules-preview) _(プレビュー)_ | セキュリティ検出ルール。| Cloud SIEM または Cloud Security |
| [Developer Portal](#notebook-ddsql-editor-reference-tables-and-developer-portal) _(プレビュー)_ | サービス、API、データストアを含む、ソフトウェアエンティティのビュー。| Internal Developer Portal |
| [Events](#events) | イベントエクスプローラーからのイベント情報。| None |
| [Incidents](#incidents) | Incident Management からのインシデント。| Incident Management |
| [Infrastructure Resources](#infrastructure-resources-preview) _(プレビュー)_ | ホストやコンテナなどのインフラストラクチャーリソース。| Infrastructure Monitoring |
| [Issues](#issues) | APM、ログ、RUM、およびその他のソース全体にわたる Error Tracking の問題。| Error Tracking |
| [Agent Observability](#options) | Agent Observability からのトレースとスパン。| Agent Observability |
| [Logs](#logs) | 個々のログイベント。ログをパターンやトランザクションごとにグループ化することもできます。| Log Management |
| [Notebook](#notebook-ddsql-editor-reference-tables-and-developer-portal) | ノートブックセルからのデータ。| Notebooks |
| [On-Call](#on-call) | On-Call イベントとページ。| Datadog On-Call |
| [Product Analytics](#options) _(プレビュー)_ | Product Analytics イベント。| Product Analytics |
| [Recommendations](#recommendations) | Cloud Cost Management からのクラウドコスト最適化の推奨事項。| Cloud Cost Management |
| [Reference Tables](#notebook-ddsql-editor-reference-tables-and-developer-portal) | 参照テーブルからの行。| Reference Tables |
| [RUM](#options) | Real User Monitoring イベント。| Real User Monitoring |
| [Security Signals](#options) _(プレビュー)_ | 検出ルールによって生成されるセキュリティシグナル。| Cloud SIEM |
| [Spans](#spans-and-watchdog-alerts) | APM スパン。| APM |
| [Watchdog Alerts](#spans-and-watchdog-alerts) | Watchdog による Alerts。| None |
| [Workload Protection Agent](#workload-protection-agent-preview) _(プレビュー)_ | Datadog Agent からの Workload Protection イベント。| Workload Protection |

**注:** **Recommendations** データソースには、Cloud Cost Management の推奨事項のみが表示されます。APM の推奨事項は、リストウィジェットのデータソースとして利用することはできません。組織の Cloud Cost Management が構成されていない場合、ウィジェットに `Not Accessible` メッセージが表示されます。これは、権限が不足しているのではなく、データソースに Cloud Cost Management が必要であることを示しています。

### オプション {#options}

各データソースには独自の構成があります。ほとんどのデータソースでは、次の操作が可能です。

- 表示する**列**を選択します。
- **リストを並べ替える**ため、列と方向 (昇順または降順) を選択します。利用可能なソート列は、ウィジェットに表示されている列です。
- **検索クエリ**を使用して結果を絞り込みます。

以下のデータソースには、追加または異なるオプションがあります。

{{% collapse-content title="ケース" level="h4" id="cases" expanded=false %}}
並べ替え (昇順または降順):

- アラート数
- 最終作成
- ケースキー
- 最終更新
- 優先度
- ステータス
- 未割当
{{% /collapse-content %}}

{{% collapse-content title="CI パイプライン" level="h4" id="ci-pipeline" expanded=false %}}
表示する**レベル**を選択: パイプライン、ステージ、ジョブ、ステップ、またはカスタム。
{{% /collapse-content %}}

{{% collapse-content title="Data Observability (プレビュー)" level="h4" id="data-observability-preview" expanded=false %}}
エンティティタイプ (データベーステーブルまたはデータベース列) を選択します。利用可能な列と並べ替えオプションは、エンティティタイプによって異なります。
{{% /collapse-content %}}

{{% collapse-content title="データベースに関する推奨事項 (プレビュー)" level="h4" id="database-recommendations-preview" expanded=false %}}
並べ替え (昇順または降順):

- 重大度
- タイプ
- 初回検出
- 最終検出
{{% /collapse-content %}}

{{% collapse-content title="検出ルール (プレビュー)" level="h4" id="detection-rules-preview" expanded=false %}}
並べ替え可能な列には、名前、作成日、最終更新日、有効、重大度、ソースが含まれます。ルールプロダクトを選択して、表示されるルールを絞り込むこともできます。
{{% /collapse-content %}}

{{% collapse-content title="イベント" level="h4" id="events" expanded=false %}}
レポート形式のサイズ:

- 小 (タイトルのみ) (デフォルト)
- 大 (イベント全体)
{{% /collapse-content %}}

{{% collapse-content title="インシデント" level="h4" id="incidents" expanded=false %}}
並べ替え (昇順または降順):

- 作成
- 検出
- 変更
- 解決
- 重大度
- ステータス
- タイトル
{{% /collapse-content %}}

{{% collapse-content title="インフラストラクチャーリソース (プレビュー)" level="h4" id="infrastructure-resources-preview" expanded=false %}}
**リソースタイプ**を選択して表示します (例: Pods、Containers、Deployments、Services、Nodes)。利用可能な列と並べ替えオプションは、リソースタイプによって異なります。
{{% /collapse-content %}}

{{% collapse-content title="問題" level="h4" id="issues" expanded=false %}}
並べ替え:

- 関連性 (デフォルト)
- 数
- 最新
- 影響を受けたセッション (RUM の問題のみ)

利用可能な列は、問題のソース (ログ、APM、または RUM) によって異なります。

**注:** 並べ替えの選択を変更しても、表示される列は変更されません。影響を受けたセッションで並べ替えてウィジェットに表示するには、グラフエディターで「影響を受けたセッション」列も追加する必要があります。
{{% /collapse-content %}}

{{% collapse-content title="ログ" level="h4" id="logs" expanded=false %}}
グループ化:

- パターン
- トランザクション

ログの構成に応じて、ストレージの場所 (Standard Indexes、Standard Indexes + Flex Logs、または Online Archives) を選択することもできます。

メッセージ列については、表示する行数 (1、3、または 10) を選択できます。
{{% /collapse-content %}}

{{% collapse-content title="ノートブック、DDSQL Editor、Reference Tables、および Developer Portal" level="h4" id="notebook-ddsql-editor-reference-tables-and-developer-portal" expanded=false %}}
これらのデータソースは、保存されたデータセットまたはテーブルの行を表示します。

- **ノートブック** および **DDSQL Editor**: 公開されたデータセットを選択します。
- **Reference Tables**: 参照テーブルを選択します。
- **Developer Portal**: サービス、API、データストアなどのソフトウェアエンティティテーブルを選択します。

これらのデータソースでは、次の操作が可能です。

- 「**最初の行を表示**」を設定して、行数 (10、25、50、100、500、1000、またはカスタム値) を制限します。
- 「**すべての列を表示**」を切り替えるか、最大 12 列を選択して表示します。
- 列の並べ替えアイコンをクリックして並べ替えます。
- 検索クエリを使用して行をフィルタリングします。
{{% /collapse-content %}}

{{% collapse-content title="On-Call" level="h4" id="on-call" expanded=false %}}
「**チーム**」を選択し、必要に応じて**タグ**を追加して、表示されるイベントをフィルタリングします。
{{% /collapse-content %}}

{{% collapse-content title="Recommendations" level="h4" id="recommendations" expanded=false %}}
Recommendations データソースの列は固定されており、カスタマイズすることはできません。
{{% /collapse-content %}}

{{% collapse-content title="Spans および Watchdog Alerts" level="h4" id="spans-and-watchdog-alerts" expanded=false %}}
これらのデータソースは検索クエリをサポートしていますが、並べ替えオプションは提供していません。Watchdog Alerts には、固定されたフィールドセットが表示されます。
{{% /collapse-content %}}

{{% collapse-content title="Workload Protection Agent (プレビュー)" level="h4" id="workload-protection-agent-preview" expanded=false %}}
「コンテンツ」列については、表示する行数 (1、3、または 10) を選択できます。
{{% /collapse-content %}}

## API {#api}

このウィジェットは、**[Dashboards API][1]** で使用できます。[ウィジェット JSON スキーマ定義][2] については、以下のテーブルを参照してください。

{{< dashboards-widgets-api >}}

## 詳細はこちら {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/