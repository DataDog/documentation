---
aliases:
- /ja/monitors/monitor_uptime_widget/
- /ja/monitors/slos/
- /ja/monitors/service_level_objectives/
- /ja/service_management/service_level_objectives/ootb_dashboard
- /ja/service_management/service_level_objectives/
description: SLO のステータスを追跡する
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: ラーニングセンター
  text: Service Level Objectives 入門
- link: https://www.datadoghq.com/blog/service-page/
  tag: ブログ
  text: サービステレメトリ、Error Tracking、SLO など
- link: https://www.datadoghq.com/blog/monitor-service-performance-with-slo-alerts/
  tag: ブログ
  text: SLO アラートによるサービスパフォーマンスのプロアクティブな監視
- link: https://www.datadoghq.com/blog/slo-key-questions/
  tag: ブログ
  text: SLO を設定する際のキーとなる質問
- link: https://www.datadoghq.com/blog/define-and-manage-slos/
  tag: ブログ
  text: Datadog で SLO を管理するためのベストプラクティス
- link: https://www.datadoghq.com/blog/burn-rate-is-better-error-rate/
  tag: ブログ
  text: バーンレートはより優れたエラーレート指標
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: ブログ
  text: Datadog を使用して効果的なエグゼクティブ向けダッシュボードを設計する
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: ブログ
  text: Datadog で SLO のステータスとエラーバジェットを追跡する
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_level_objective
  tag: 外部サイト
  text: Terraform による SLO の作成と管理
title: Service Level Objectives
---
{{< jqmath-vanilla >}}

<br />

{{< learning-center-callout header="イネーブルメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=SLOs&tags.topics-1=Monitors">}}
  基礎イネーブルメントセッションを探索し、登録してください。ネイティブの SLO および SLA トラッキングを使用して、ビジネスに最も重要な問題を優先して対処する方法を学びます。
{{< /learning-center-callout >}}

## 概要{#overview}

Service Level Objectives (SLO) は、サイト信頼性エンジニアリングツールキットの重要な要素です。SLO を使用し、アプリケーションのパフォーマンスに明確なターゲットを定義するためのフレームワークを整えることで、一貫したカスタマーエクスペリエンスを提供したり、プラットフォームの安定性を保ちつつ機能を開発したり、内部および外部ユーザーとのコミュニケーションを改善するために役立てたりすることができます。

**ヒント**: Datadog のグローバル検索から Service Level Objectives を開くには、<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> を押して `slo` を検索します。

## 重要な用語{#key-terminology}

サービスレベル指標 (SLI)
: サービスのパフォーマンスまたは信頼性を定量的に測定するもの。Datadog SLO では、SLI はメトリクスまたは 1 つ以上のモニターの集合体です。

サービスレベル目標 (SLO)
: 特定の期間における SLI のターゲット割合。

サービスレベル契約 (SLA)
: クライアントとサービスプロバイダーとの間で交わされる、明示的または暗示的な合意事項で、クライアントの信頼性に対する期待とそれを満たさない場合にサービスプロバイダー側が補償する内容について規定したもの。

エラーバジェット
SLO のターゲット割合 (100% - ターゲット割合) から算出される許容範囲内の不確実性。これは製品開発における投資として見なされます。

## SLO の種類{#slo-types}

SLO を作成する際は、次の種類から選択できます。
- **メトリクスベースの SLO**: カウントベースで SLI を算出したい場合に使用します。SLI は、良好なイベントの合計を全イベントの合計で割った値として計算されます。
- **モニターベースの SLO**: 時間ベースで SLI を算出したい場合に使用します。SLI はモニターの稼働時間に基づきます。モニターベースの SLO を作成するには、新規または既存の Datadog モニターが必要です。調整が必要な場合は、SLO の作成画面ではなく、元となるモニター側で変更を行う必要があります。
- **タイムスライス SLO**: 時間ベースで SLI を算出したい場合に使用します。SLI は独自に定義した稼働時間 (システムが正常に動作している合計時間 ÷ 全体の時間) に基づきます。タイムスライス SLO を作成するのに Datadog モニターは不要です。SLO 作成時にさまざまなメトリクスフィルターやしきい値を試し、ダウンタイムを即座に調査することができます。

詳細な比較については、[SLO の種類の比較表][1] を参照してください。

## セットアップ{#setup}

Datadog の [Service Level Objectives 管理ページ][2] を使用して、SLO の新規作成や既存 SLO の閲覧・管理が行えます。

### 構成{#configuration}

1. [SLO 管理ページ][2] で {{< ui >}}New SLO +{{< /ui >}} を選択します。
2. SLO の種類を選択します。[メトリクスベース][3]、[モニターベース][4]、または [タイムスライス][5] のいずれかを選択して SLO を作成できます。
3. SLO のターゲットとローリング期間 (7 日、30 日、90 日経過後) を設定します。Datadog は、SLO のターゲットを SLA で指定した値より厳し目に設定することを推奨しています。この期間が SLO 一覧に表示されます。デフォルトでは、最も短い期間が選択されます。
4. 最後に、SLO にタイトルを付け詳細を入力するか、説明にリンクを足しタグを追加して保存します。

SLO を設定した後、[Service Level Objectives リストビュー][2] からその SLO を選択すると、詳細サイドパネルが開きます。サイドパネルには、SLO の各ターゲットの全体ステータスのパーセンテージや残りのエラーバジェットのほか、SLI の履歴を示すステータスバー (モニターベースの SLO の場合) または棒グラフ (メトリクスベースの SLO の場合) が表示されます。また、1 つの [マルチアラートモニター][6] を使用して作成したグループ化されたモニターベースの SLO、または [`sum by` 句][7] を使用して作成したグループ化されたメトリクスベースの SLO の場合は、全体のステータスや残りのエラーバジェットに加えて、各グループのステータス割合と残りのエラーバジェットも表示されます。

**例:** アベイラビリティーゾーンごとにレイテンシを追跡するためにモニターベースの SLO を作成すると、全体的な SLO と SLO が追跡している個々のアベイラビリティーゾーンのステータス割合とエラーバジェットの残量が表示されます。

**注:** エラーバジェットの残りはパーセンテージで表示され、次の式で計算されます。

$$\text"エラーバジェットの残り" = 100 * {\text"現在のステータス" - \text" ターゲット"} / { 100 - \text"ターゲット"}$$

### SLO ターゲットの設定{#setting-slo-targets}

エラーバジェットとエラーバジェットアラートの利点を活用するには、SLO ターゲット値を 100% 未満に厳密に設定する必要があります。

100% の目標を設定するということは、エラーバジェットが 100% に等しいため、エラーバジェットが 0% になることを意味します (SLO ターゲット)。許容可能なリスクを表すエラーバジェットがないと、顧客対応の信頼性を維持するという相反する優先順位と機能開発への投資との間の整合性を見つけることが困難になります。さらに、目標値が 100% の SLO は、SLO アラート評価でゼロ除算エラーにつながります。

**注:** SLO で指定できる小数の桁数は、SLO の種類と選択するタイムウィンドウに応じて異なります。それぞれの SLO の種類について、詳しくは次のリンクを参照してください。

[Monitor-based SLOs][8]: Up to two decimal places are allowed for 7-day and 30-day targets, up to three decimal places are allowed for 90-day targets.

[Metric-based SLOs][9]: Up to three decimal places are allowed for all targets.

## 権限{#permissions}

### ロールベースのアクセス{#role-based-access}

すべてのユーザーは、関連付けられている [ロール][10] に関係なく、SLO と [SLO ステータス修正](#slo-status-corrections)を閲覧できます。ただし、`slos_write` 権限を持つロールに属しているユーザーのみが、SLO の作成・編集・削除を行えます。

ステータス修正の作成・編集・削除を行うには、`slos_corrections` 権限が必要です。この権限を持つユーザーであれば、対象の SLO を編集する権限がない場合でもステータス修正を行うことができます。権限の一覧については、[RBAC ドキュメント][11] をご覧ください。

### きめ細かなアクセス制御 {#granular-access-controls}

また、個別の SLO へアクセス制限を設けたい場合は、編集を許可する [ロール][10] のリストを指定して管理できます。

{{< img src="service_level_objectives/slo_set_permissions.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="歯車メニューの SLO 権限オプション">}}

1. SLO をクリックして詳細サイドパネルを開きます。
1. パネル右上の歯車アイコンをクリックします。
1. {{< ui >}}Permissions{{< /ui >}} を選択します。
1. [{{< ui >}}Restrict Access{{< /ui >}}] をクリックします。
1. ダイアログボックスが更新され、組織内の全員がデフォルトでフルアクセス権を持っていることが表示されます。
1. ドロップダウンを使用して、SLO を編集できるロール、チーム、またはユーザーを 1 つ以上選択します。
1. {{< ui >}}Add{{< /ui >}} をクリックします。
1. ダイアログボックスが更新され、選択したロールに {{< ui >}}Editor{{< /ui >}} 権限があることが表示されます。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

ルールの編集アクセス権を維持するために、保存する前に、自分がメンバーであるロールを少なくとも 1 つ含めることがシステムから要求されます。アクセス制御リストのユーザーは、ロールを追加することができ、自分以外のロールを削除することのみが可能です。

**注**: ユーザーは、モニターへの書き込み権限を持っていない場合でも任意のモニターに対して SLO を作成できます。同様に、SLO への書き込み権限がなくても SLO アラートを作成できます。モニターに関する RBAC の権限の詳細は、[RBAC ドキュメント][12] や [モニター向け RBAC セットアップ手順のガイド][13] を参照してください。

## SLO の編集{#editing-an-slo}

SLO を編集するには、リストビューで SLO の行にカーソルを合わせて、行の右側に表示される編集鉛筆アイコンをクリックするか、行をクリックして詳細なサイドパネルを開き、パネルの右上に表示される歯車アイコンから編集ボタンを選択します。

## SLO の検索 {#searching-slos}

[Service Level Objectives 管理ページ][2] では、すべての SLO を対象とした高度な検索を実行し、検索結果から SLO を見つけて表示、編集、クローン作成、または削除できます。

高度な検索を使用し、SLO の属性をどれでも組み合わせて SLO をクエリできます。

* `name` および `description` - テキスト検索
* `time window` - 7 日、30 日、90 日
* `type` - メトリクス、モニター
* `creator`
* `tags` - データセンター、環境、サービス、チーム、その他

検索を実行するには、左側のファセットチェックボックスと上部の検索バーを使用します。ボックスをチェックすると、それに合わせて検索バーのクエリが更新されます。同様に、検索バーのクエリを変更 (あるいは新規入力) すると、ボックスのチェックが更新されます。クエリ結果はクエリの変更に合わせてリアルタイムで更新されます。[Search] (検索) ボタンはありません。

## 削除された SLO の復旧{#recovering-deleted-slos}

<div class="alert alert-warning"><a href="/synthetics/test_suites/#service-level-objectives">Synthetic テストスイート</a> の自動生成された SLO は復元できません。</div>

削除された SLO は、完全に削除されるまで 30 日間保持されます。最近削除された SLO を復元するには、次の手順を実行します。

1. [SLO 管理ページ][2] で、右上隅にある**設定**の歯車アイコンをクリックします。
1. 復元する SLO を選択します。
1. [{{< ui >}}Restore{{< /ui >}}] をクリックします。

**注**: 削除された SLO のステータス修正は復元できません。この復旧プロセスは、削除された SLO にのみ適用されます。

## SLO の表示{#viewing-slos}

SLO を*任意*のタグでグループ化すると、データのサマリービューが表示されます。各状態 (違反、警告、OK、データなし) にある SLO の数を、SLO に設定されたサービス、チーム、ユーザージャーニー、階層、その他のタグでグループ化して、すばやく分析できます。

{{< img src="service_level_objectives/slo_group_by_new.png" alt="チームでグループ化された SLO のサマリービュー" style="width:100%;" >}}

{{< ui >}}status{{< /ui >}} 列と {{< ui >}}Error Budget Left{{< /ui >}} 列で SLO を並べ替えて、対応が必要な SLO を優先順位付けします。SLO リストには、[構成](#configuration)で選択した主要なタイムウィンドウの SLO の詳細が表示されます。その他の構成タイムウィンドウはすべて、個別のサイドパネルで表示できます。それぞれのテーブル行をクリックして、SLO 詳細サイドパネルを開きます。

**注**: [Datadog モバイルアプリ][14] ([Apple App Store][15] および [Google Play Store][16] で入手可能) をダウンロードすると、モバイルデバイスのホーム画面から SLO を閲覧できます。

{{< img src="service_level_objectives/slos-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS および Android の SLO">}}

### SLO タグ{#slo-tags}

SLO タグは、[SLO 管理ページ][2] でのフィルタリング、[SLO 保存ビュー][17] の作成、または SLO をグループ化して表示するために使用できます。タグは次の方法で SLO に追加できます。

- SLO を作成または編集する際にタグを追加できます。
- SLO 一覧表示から、SLO 一覧の上部にある {{< ui >}}Edit Tags{{< /ui >}} および [{{< ui >}}Edit Teams{{< /ui >}}][18] ドロップダウンオプションを使用して、タグを一括で追加および更新できます。

{{< img src="service_level_objectives/slo_bulk_tag.png" alt="SLO リストページに、タグの一括編集のための [Edit Tag] (タグの編集) ドロップダウンが表示されている" >}}

### SLO バーンレートインジケーター{#slo-burn-rate-indicator}

バーンレートインジケーターは、2 時間のローリングウィンドウを使用して、エラーバジェットを過度に消費している SLO を評価します。バーンレートインジケーターは、[SLO 管理ページ][2] の該当する SLO の名前の横に表示されます。

{{< img src="service_level_objectives/slo_burn_rate_indicator.png" alt="Datadog の SLO 管理ページ。リスト内の SLO の名前の横に赤いアイコンが表示されます。赤いアイコンにカーソルを合わせると、追加情報、バーンレートの視覚化、および SLO の対応するサービスページへのリンクを含むモーダルが表示されます。" style="width:80%;" >}}

インジケーターには 2 種類あります。
- 過去 2 時間のバーンレートが 6 を超えるクリティカルなレートを示す赤いアイコン。
- 過去 2 時間のバーンレートが 1 から 6 の範囲の高めのレートを示す黄色いアイコン。

各インジケーターには、バーンレートが高めのしきい値およびクリティカルなしきい値に対してどの位置にあるかを示す視覚的チャートが付随しており、深刻度を迅速に評価できます。

SLO は、バーンレートのステータス (Critical、Elevated、Healthy) でフィルタリングできます。サービスタグがある SLO については、各バーンレートインジケーターに関連するサービスページへの直接リンクが含まれており、さらなる調査が可能です。

### SLO のデフォルトビュー{#slo-default-view}

SLO のリストビューに移動すると、デフォルトの SLO ビューが読み込まれます。

デフォルトビューの内容は次のとおりです。

- 空の検索クエリ
- 組織で定義されているすべての SLO のリスト
- 左側のファセットリストで利用可能なファセットのリスト

### 保存ビュー{#saved-views}

次のものを共有することで、チームに最も関連性の高い SLO についてカスタマイズした検索を保存ビューの SLO リストビューに保存し共有することができます。

- 検索クエリ
- 選択したファセットのサブセット

リストビューで SLO のサブセットを問い合わせると、そのクエリを保存ビューとして追加できるようになります。

#### 保存ビューの追加{#add-a-saved-view}

保存ビューを追加するには、以下の手順に従います。

1. SLO を問い合わせます。
2. ページの左上にある [{{< ui >}}Save{{< /ui >}}] をクリックします。
3. ビューに名前を付けて保存します。

#### 保存ビューの読み込み{#load-a-saved-view}

保存ビューを読み込むには、ページの左上にある {{< ui >}}Views{{< /ui >}} ボタンを押して {{< ui >}}Saved Views{{< /ui >}} (保存ビュー) パネルを開き、リストから保存ビューを選択します。同じ {{< ui >}}Saved Views{{< /ui >}} パネルの上部にある [{{< ui >}}Filter Saved Views{{< /ui >}}] (保存ビューのフィルタリング) 検索ボックスで、保存ビューを検索することもできます。

#### 保存ビューの共有{#share-a-saved-view}

リストから保存ビューにカーソルを合わせ、ハイパーリンクを選択して保存ビューのリンクをコピーすれば、チームメイトと共有できます。

#### 保存ビューの管理{#manage-saved-views}

保存ビューを使用しているときは、その保存ビューを選択してクエリを修正し、[{{< ui >}}Saved Views{{< /ui >}}] パネルで名前の下にある [{{< ui >}}Update{{< /ui >}}] ボタンをクリックすることで更新できます。保存ビューの名前を変更したり、保存ビューを削除したりするには、[{{< ui >}}Saved Views{{< /ui >}}] パネルでその行にカーソルを合わせ、それぞれ鉛筆アイコンまたはゴミ箱アイコンをクリックします。

## SLO および SLO ステータス修正の監査イベント{#slo-and-slo-status-correction-audit-events}

SLO 監査イベントでは、[Event Explorer][27] または SLO 詳細の [{{< ui >}}Audit History{{< /ui >}}] (監査履歴) タブを使用して、SLO 構成の履歴を追跡できます。監査イベントは、SLO または SLO ステータス修正を作成、変更、または削除するたびに、Event Explorer に追加されます。各イベントには、SLO または SLO ステータス修正の構成に関する情報が含まれ、ストリームには構成変更の履歴が表示されます。

### SLO 監査イベント{#slo-audit-events}

各イベントには、次の SLO 構成情報が含まれます。

- 名前
- 説明
- ターゲットパーセンテージおよび時間枠
- データソース (モニター ID またはメトリクスクエリ)

Event Explorer には、3 種類の SLO 監査イベントが表示されます。

- `SLO Created` イベントは、作成時点の SLO 構成情報を示します。
- `SLO Modified` イベントは、更新中に変更された構成情報を示します。
- `SLO Deleted` イベントは、SLO が削除される前の構成情報を示します。

### ステータス修正監査イベント{#status-correction-audit-events}

各イベントには、次の SLO ステータス修正構成情報が含まれます。

- SLO 名
- ステータス修正の開始時刻と終了時刻 (タイムゾーン付き)
- ステータス修正カテゴリー

Event Explorer には、3 種類の SLO ステータス修正監査イベントが表示されます。

- `SLO Correction Created` イベントは、作成時点のステータス修正構成情報を示します。
- `SLO Correction Modified` イベントは、更新中に変更された構成情報を示します。
- `SLO Correction Deleted` イベントは、ステータス修正が削除される前の構成情報を示します。

すべての SLO 監査イベントの完全なリストを取得するには、Event Explorer で検索クエリ `tags:(audit AND slo)` を入力します。特定の SLO の監査イベントのリストを表示するには、対象の SLO の ID と共に`tags:audit,slo_id:<SLO ID>` を入力します。また、[Datadog イベント API][19] を使って、プログラムで Event Explorer のクエリを作成することもできます。

**注:** UI にイベントが表示されない場合は、Event Explorer の時間枠を長くしてみてください (過去 7 日間など)。

{{< img src="service_level_objectives/slo-audit-events.png" alt="SLO 監査イベント" >}}

SLO 詳細の {{< ui >}}Audit History{{< /ui >}} タブを使用して、個々の SLO のすべての監査イベントを表示することもできます。

{{< img src="service_level_objectives/slo_audit_history_tab.png" alt="SLO 詳細の [Audit History] (監査履歴) タブ" >}}

[イベントモニター][28] で、SLO 監査イベントを追跡する通知をセットアップできます。たとえば、特定の SLO の構成が変更されたときに通知を受けたい場合、`audit,slo_id:<SLO ID>` タグ内の `[SLO Modified]` テキストを追跡するようにイベントモニターを設定します。

## SLO ウィジェット{#slo-widgets}

SLO を作成した後は、ダッシュボードやウィジェットを使ってデータを可視化することができます。
  - SLO ウィジェットを使用して単一の SLO のステータスを可視化する
  - SLO リストウィジェットを使用して SLO のセットを可視化する
  - [SLO データソース][20] を使用して、メトリックベースの SLO データ (過去 15 か月分) を時系列とスカラー (クエリ値、トップリスト、テーブル、変化) の両方のウィジェットでグラフ化する

SLO ウィジェットの詳細については、[SLO ウィジェット][21] および [SLO リストウィジェット][22] のページを参照してください。SLO データソースの詳細については、[ダッシュボードで過去の SLO データをグラフ化する][20] 方法のガイドを参照してください。

## SLO ステータス修正{#slo-status-corrections}

ステータス修正により、SLO ステータスとエラーバジェットの計算から特定の期間を除外することができます。こうすることで、次のことが可能になります。
- 定期メンテナンスなど、想定されるダウンタイムによるエラーバジェットの枯渇を防ぐ
- SLO に適合することを期待されていない非営業時間は無視する
- デプロイメントによる一時的な問題が SLO に悪影響を与えないようにする

修正を適用すると、指定した期間が SLO の計算から外れます。
- モニターベースの SLO の場合、修正時間ウィンドウはカウントされません。
- メトリクスベースの SLO の場合、修正ウィンドウ内の良好イベントと不良イベントはいずれもカウントされません。
- タイムスライス SLO の場合、修正時間ウィンドウはアップタイムとして扱われます。

一時的に修正を行うための 1 回限りの修正と、定期的に発生する調整のための定期的な修正を設定できます。1 回限りの修正では開始時刻と終了時刻が必要で、定期的な修正では開始時刻、継続時間、実行間隔が必要です。定期的な修正は [iCalendar RFC 5545 の RRULE 仕様][24] に基づいており、サポートされるルールは `FREQ`、`INTERVAL`、`COUNT`、`UNTIL` です。定期的に修正を無期限で繰り返したい場合は、終了日を指定しなくてもかまいません。

どちらのタイプの修正でも、修正を行う理由を示す修正カテゴリーを選択する必要があります。選択可能なカテゴリーは、{{< ui >}}Scheduled Maintenance{{< /ui >}}、{{< ui >}}Outside Business Hours{{< /ui >}}、{{< ui >}}Deployment{{< /ui >}}、{{< ui >}}Other{{< /ui >}} です。必要であれば、説明文を追加することができます。

各 SLO には、クエリのパフォーマンスを確保するために構成可能な修正数の上限が設定されています。これらの制限は、SLO ごとに過去 90 日間にのみ適用されるため、過去 90 日間より前の期間の修正は、制限に含まれません。つまり、次のとおりです。
- 1 回限りの修正の終了時刻が過去 90 日以前である場合、制限にカウントされます。
- 定期的な修正の最後の繰り返しの終了時刻が過去 90 日以前である場合、制限にカウントされません。

SLO ごとの 90 日制限は、次のとおりです。

| 修正タイプ   | SLO ごとの制限 |
| ----------------- | ------------- |
| 1 回限り          | 100           |
| 毎日繰り返し   | 2             |
| 毎週繰り返し  | 3             |
| 毎月繰り返し | 5             |

ステータス修正は、SLO のサイドパネルで {{< ui >}}Correct status{{< /ui >}} を選択して UI から構成するか、[SLO ステータス修正 API][25] または [Terraform リソース][26] で構成できます。

#### UI でのアクセス{#access-in-the-ui}

UI で SLO ステータス修正にアクセスするには、以下の手順に従います。

1. 新しい SLO を作成するか、既存の SLO をクリックします。
2. SLO の詳細サイドパネルビューに移動します。
3. 歯車アイコンの下にある {{< ui >}}Correct status{{< /ui >}} を選択して、修正作成モーダルを開きます。
4. {{< ui >}}Correction Category{{< /ui >}} を選択します。
5. {{< ui >}}Select the Time Correction Window{{< /ui >}} で {{< ui >}}One-Time{{< /ui >}} と {{< ui >}}Recurring{{< /ui >}} のいずれかを選択し、修正する期間を指定します。
6. オプションで {{< ui >}}Notes{{< /ui >}} を追加します。
7. {{< ui >}}Apply Correction{{< /ui >}} をクリックします。

{{< img src="service_level_objectives/slo-corrections-ui.png" alt="SLO 修正 UI" style="width:80%;">}}

既存のステータス修正を表示、編集、削除するには、SLO の詳細サイドパネルの上部にある {{< ui >}}Corrections{{< /ui >}} タブをクリックします。

#### ステータス修正の可視化 {#visualizing-status-corrections}

ステータス修正を適用している SLO の場合、SLO 詳細表示の切り替えトグルを使用して、UI 上で修正を有効または無効にできます。このトグルは、SLO 詳細表示の {{< ui >}}Performance{{< /ui >}} セクションに表示されるグラフやデータを切り替えます。**注:** 全体の SLO ステータスやエラーバジェットには、常にステータス修正が考慮されます。

{{< img src="service_level_objectives/correction-toggle.png" alt="SLO 修正 UI" style="width:100%;">}}

## SLO カレンダービュー {#slo-calendar-view}

[SLO 管理ページ][2] の右上にある SLO カレンダービューでは、右上隅で {{< ui >}}Primary{{< /ui >}} 表示から {{< ui >}}Daily{{< /ui >}}、{{< ui >}}Weekly{{< /ui >}}、または {{< ui >}}Monthly{{< /ui >}} 表示に切り替えると、12 か月分の過去の SLO ステータスデータを確認できます。カレンダービューはメトリクスベースの SLO とタイムスライス SLO に対応しています。

{{< img src="service_level_objectives/slo-calendar-view-2.png" alt="SLO カレンダービュー" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_level_objectives/guide/slo_types_comparison/
[2]: https://app.datadoghq.com/slo
[3]: /ja/service_level_objectives/metric/
[4]: /ja/service_level_objectives/monitor/
[5]: /ja/service_level_objectives/time_slice/
[6]: /ja/monitors/types/metric/?tab=threshold#alert-grouping
[7]: /ja/service_level_objectives/metric/#define-queries
[8]: /ja/service_level_objectives/monitor/#set-your-slo-targets
[9]: /ja/service_level_objectives/metric/#set-your-slo-targets
[10]: /ja/account_management/rbac/
[11]: /ja/account_management/rbac/permissions/#service-level-objectives/
[12]: /ja/account_management/rbac/permissions/#monitors
[13]: /ja/monitors/guide/how-to-set-up-rbac-for-monitors/
[14]: /ja/mobile
[15]: https://apps.apple.com/app/datadog/id1391380318
[16]: https://play.google.com/store/apps/details?id=com.datadog.app
[17]: /ja/service_level_objectives/#saved-views
[18]: /ja/account_management/teams/#associate-resources-with-team-handles
[19]: /ja/api/latest/events/
[20]: /ja/dashboards/guide/slo_data_source/
[21]: /ja/dashboards/widgets/slo/
[22]: /ja/dashboards/widgets/slo_list/
[23]: /ja/monitors/types/event/
[24]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[25]: /ja/api/latest/service-level-objective-corrections/
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/slo_correction
[27]: /ja/events/explorer/
[28]: /ja/monitors/types/event/