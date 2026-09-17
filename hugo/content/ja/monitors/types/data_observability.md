---
description: データウェアハウス全体の鮮度、行数、列レベルのメトリクス、およびカスタム SQL クエリを監視します。
further_reading:
- link: /data_observability/
  tag: ドキュメント
  text: Data Observability の概要
- link: /data_observability/quality_monitoring/
  tag: ドキュメント
  text: Quality Monitoring
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/status/
  tag: ドキュメント
  text: モニターステータスの参照
title: Data Observability モニター
---
## 概要 {#overview}

[Data Observability][1] のモニターは、季節性、傾向、ユーザーのフィードバックから学習する異常検知を使用して、データの遅延、不完全なロード、予期しない値の変化を、それらがダウンストリームのダッシュボード、AI アプリケーション、またはビジネス上の意思決定に影響を与える前の段階で捕捉します。エンドツーエンドのデータおよびコードリネージとこれらのモニターを組み合わせて利用すると、チームが問題を早期に検出し、ダウンストリームへの影響を評価し、適切な所有者にルーティングする上で役立ちます。

Data Observability のモニターでは以下のメトリクスタイプがサポートされています。

**テーブルレベルのメトリクスタイプ:**
| メトリクスタイプ | 説明 |
|---|---|
| Freshness (鮮度) | テーブルが最後に更新された時点からの経過時間を追跡します。|
| Row Count (行数) | テーブルまたはビューの行数を追跡します。|
| Custom SQL (カスタム SQL) | SQL クエリで返されるカスタムメトリクス値を追跡します。|

**列レベルのメトリクスタイプ:**
| メトリクスタイプ | 説明 |
|---|---|
| Freshness (鮮度) | 日時列で確認された最新の日付を追跡します。|
| Uniqueness (一意性) | 一意の値の割合を追跡します。|
| Nullness (null 値) | null 値の割合を追跡します。|
| Cardinality (カーディナリティ) | 個別の値の数を追跡します。|
| Percent Zero (ゼロの割合) | ゼロと等しい値の割合を追跡します。|
| Percent Negative (負の値の割合) | 負の値の割合を追跡します。|
| Min (最小値) / Max (最大値) / Mean (平均値) / Sum (合計値) / Standard Deviation (標準偏差) | すべての列値の統計的尺度を追跡します。|

Datadog は、利用可能な場合にはウェアハウスシステムのメタデータ (例: `INFORMATION_SCHEMA`) から行数や鮮度などのメトリクスを収集します。これにより、ウェアハウスに対するクエリの実行が回避され、コンピューティングコストが削減されます。すべてのウェアハウスがシステムメタデータを公開しているわけではありません。システムメタデータから収集できないメトリクスについては、モニターがウェアハウスに対して直接クエリを実行し、値を計算します。

Data Observability のモニターを使用するには、少なくとも 1 つのサポートされているデータウェアハウス (例: [Snowflake][3]、[Databricks][4]、[BigQuery][5] など) で [Quality Monitoring][2] を設定する必要があります。

Data Observability は、[モニター作成フロー][13] の最初のステップで選択される 4 つのモニタータイプを提供します。

| モニタータイプ | 監視対象 |
|---|---|
| Data quality (データ品質) | テーブルと列の鮮度、行数、および列レベルのメトリクス。|
| [Source to target (ソース/ターゲット)](#source-to-target-monitors) | ソースアセットとターゲットアセット間の同一メトリクスの差分。|
| [Schema change (スキーマ変更)](#schema-change-monitors) | ウェアハウス内で追加、削除、名前変更、または型変更されたフィールド。|
| Job (ジョブ) | 失敗したジョブ実行。|

特に記載がない限り、以下のセクションではデータ品質モニタータイプについて説明します。

## モニターの作成 {#monitor-creation}

Datadog で Data Observability モニターを作成するには、[[{{< ui >}}Data Observability{{< /ui >}}] > [{{< ui >}}Monitors{{< /ui >}}] (モニター) > [{{< ui >}}New Monitor{{< /ui >}}] (モニターの新規作成)][6] または [[{{< ui >}}Monitors{{< /ui >}}] (モニター) > [{{< ui >}}New Monitor{{< /ui >}}] (モニターの新規作成) > [{{< ui >}}Data Observability{{< /ui >}}]][6] に移動します。既存のすべての Data Observability モニターを表示するには、[[Data Observability Monitors] ページ][7] を参照してください。

## 監視するデータの選択 {#choose-data-to-monitor}

まず、{{< ui >}}Table{{< /ui >}} レベルと {{< ui >}}Column{{< /ui >}} レベルのどちらを監視するかを選択します。

{{< img src="monitors/monitor_types/data_observability/entity_type_selection_and_aastra.png" alt="監視するデータの選択: エンティティタイプセレクター、クエリ入力、リネージ関係フィルター" style="width:60%;" >}}

次に [{{< ui >}}Edit{{< /ui >}}] (編集) タブを使用して、検索フィールドに `key:value` フィルターを入力し、テーブル、ビュー、または列を検索します。

**名前または場所でのフィルタリング:**

| フィルター | 例 | 説明 |
|---|---|---|
| Name (名前) | `name:USERS*` | 名前による一致。`*` ワイルドカードがサポートされています。|
| Schema (スキーマ) | `schema:PROD` | スキーマによる一致。|
| Database (データベース) | `database:ANALYTICS_DB` | データベースによる一致。|
| Account (アカウント) | `account:my_account` | アカウントによる一致。|

**タグでのフィルタリング:**

タグキーをフィルターキーとして使用して、データアセットに適用されているタグでフィルタリングします。たとえば、アセットに `owner`、`platform`、または `environment` というタグが付いている場合、それらのタグを直接検索します。

| 例 | 説明 |
|---|---|
| `owner:data-platform-team` | `owner:data-platform-team` というタグが付いているアセットに一致します。|
| `platform:snowflake` | `platform:snowflake` というタグが付いているアセットに一致します。|
| `environment:production` | `environment:production` というタグが付いているアセットに一致します。|

タグフィルターでは、名前フィルターと同様に `*` ワイルドカードと引用符がサポートされています (例: `owner:data-*` または `platform:"Snowflake Prod"`)。

**計算属性でのフィルタリング:**

各自専用のタグの他に、Datadog はデータアセットの属性を計算し、その属性に基づいてフィルタリングできます。利用可能な計算属性は次のとおりです。

| 属性 | 値 | 説明 |
|---|---|---|
| `lineage_score` | `0.00`、`0.10`、`0.30`、`0.50`、`0.70`、`0.90`、または `1.00` | リネージグラフ内でのアセットの接続性の高さを示す相対的な尺度です。同じタイプのアセットと比較して、そのアセットに依存しているダウンストリームアセットの数に基づいています。高い値は、ダウンストリームコンシューマーが依存しているテーブル、ビュー、列であることを示します。|

`lineage_score` は連続的な値をとるのではなく、上記にリストされた個別の階層に分類されるため、いずれかの正確な値でフィルタリングします。単一の階層と一致するか、または `OR` を使用して階層を組み合わせます。たとえば、`lineage_score:1.00` は最も依存されているアセットを返し、`lineage_score:(0.90 OR 1.00)` は上位 2 つの階層を返します。

これらのフィルターを `AND` または`OR` と組み合わせるか、括弧を使用して条件をグループ化するか、または `-` を先頭に付けて除外します。

**例:**

| 目標 | クエリ |
|---|---|
| PROD スキーマ内のすべてのテーブル (一時テーブルを除く) | `schema:PROD AND -name:TEMP*` |
| すべてのタイムスタンプ列 | `name:*_AT OR name:*_TIMESTAMP` |
| 特定のデータベースの PROD または STAGING 内のテーブル | `database:ANALYTICS_DB AND (schema:PROD OR schema:STAGING)` |
| 特定のチームが所有するテーブル | `owner:data-platform-team` |
| データベース内で最も依存されているテーブル | `database:ANALYTICS_DB AND lineage_score:1.00` |

**リネージ関係でのフィルタリング:**

選択範囲を、リネージグラフ内で別のアセットに接続されているアセットに絞り込むには、[{{< ui >}}Add Relation Filter{{< /ui >}}] (関係フィルターを追加) をクリックします。[{{< ui >}}Upstream of{{< /ui >}}] (次のアセットのアップストリーム:) または [{{< ui >}}Downstream of{{< /ui >}}] (次のアセットのダウンストリーム:) を選択して、特定のアセットを選択するか、または同じ `key:value` フィルターを使用して一連のアセットを一致させます。たとえば、重要なダッシュボードのアップストリームにあるすべてのテーブルや、特定のソーステーブルのダウンストリームにあるすべての列を監視します。

**階層関係でのフィルタリング:**

選択範囲を、リネージグラフ内の別のアセットの親アセットまたは子アセットに絞り込むには、[{{< ui >}}Add Relation Filter{{< /ui >}}] (関係フィルターを追加) をクリックします。[{{< ui >}}Parent of{{< /ui >}}] (次のアセットの親:) または [{{< ui >}}Child of{{< /ui >}}] (次のアセットの子:) を選択して、特定のアセットを選択するか、または同じ `key:value` フィルターを使用して一連のアセットを一致させます。たとえば、`revenue` 列を含んでいるすべてのテーブルや、重要なスキーマ内にあるすべてのテーブルを監視します。

1 つのモニターで最大 5,000 個のテーブル、ビュー、または列を追跡できます。この制限を増やすことはできません。クエリとの一致の数がこれを上回る場合は、複数のモニターに分割してください。

## メトリクスタイプの選択{#select-your-metric-type}

メトリクスタイプは、追跡するデータ品質シグナルに基づいて選択します。各モニターは 1 つのメトリクスタイプを追跡します。

{{< tabs >}}
{{% tab "鮮度" %}}

[{{< ui >}}Freshness{{< /ui >}}] (鮮度) メトリクスタイプは、データが期待される時間枠内に更新されなかった状況を検出します。これを使用して、古いデータがダウンストリームのレポートやモデルに影響を与える前の段階でそのデータを捕捉します。

- **Table freshness** (テーブルの鮮度は、最後に更新された時点からの経過時間を追跡します。テーブルの鮮度は、ビューでは使用できません。また、システムメタデータ内のテーブルの更新タイムスタンプを提供しないデータウェアハウスでも使用できません。代わりに列レベルの鮮度を使用してください。
- **Column freshness** (列の鮮度) は、日時列に表示される最新の日付を追跡します。

{{% /tab %}}
{{% tab "行数" %}}

[{{< ui >}}Row Count{{< /ui >}}] (行数) メトリクスタイプは、テーブル内の行数を追跡します。これを使用して、予期しないデータの減少や急増を検出します。このような減少や急増は、パイプラインの障害やアップストリームの問題を示している可能性があります。

{{% /tab %}}
{{% tab "列メトリクス" %}}

[{{< ui >}}Column{{< /ui >}}] (列) メトリクスタイプは、列レベルのメトリクスを追跡して、データのドリフトや品質低下を検出します。以下のいずれかを選択します。

| メトリクス | 説明 |
|---|---|
| {{< ui >}}Uniqueness{{< /ui >}} (一意性) | 列内の値のうち、一意の値の割合。|
| {{< ui >}}Nullness{{< /ui >}} (null 値) | 列内の値のうち、null である値の割合。|
| {{< ui >}}Cardinality{{< /ui >}} (カーディナリティ)| 列内の個別の値の数。|
| [{{< ui >}}Percent Zero{{< /ui >}}] (ゼロの割合) | 列内の値のうち、ゼロと等しい値の割合。|
| {{< ui >}}Percent Negative{{< /ui >}} (負の値の割合) | 列内の値のうち、負の値の割合。|
| {{< ui >}}Min{{< /ui >}} (最小値) | 列内のすべての値の最小値。|
| {{< ui >}}Max{{< /ui >}} (最大値) | 列内のすべての値の最大値。|
| {{< ui >}}Mean{{< /ui >}} (平均値) | 列内のすべての値の平均値。|
| {{< ui >}}Standard Deviation{{< /ui >}} (標準偏差) | 列内の値のばらつきの尺度。|
| {{< ui >}}Sum{{< /ui >}} (合計) | 列内のすべての値の合計。|

<div class="alert alert-info">一部の列メトリクスは、特定の列タイプでのみ利用可能です。数値メトリクス ([Percent Zero] (ゼロの割合)、[Percent Negative] (負の値の割合)、[Min] (最小値)、[Max] (最大値)、[Mean] (平均値)、[Standard Deviation] (標準偏差)、[Sum] (合計値)) には、数値列が必要です。</div>

{{% /tab %}}
{{% tab "Custom SQL (カスタム SQL)" %}}

[{{< ui >}}Custom SQL{{< /ui >}}] (カスタム SQL) メトリクスタイプは、ユーザーが定義した SQL クエリから返されるカスタムメトリクス値を追跡します。組み込みのメトリクスタイプでは対応できないユースケース (ビジネス固有のデータ品質ルールの監視など) に使用します。

1. クエリから返される値を表すモデルタイプを選択します。
    - {{< ui >}}Default{{< /ui >}} (デフォルト): クエリはスカラー値を返します。ほとんどの場合はこれを使用します。
    - {{< ui >}}Freshness{{< /ui >}} (鮮度): クエリは、現在時刻とイベントの最終発生時刻の差 (秒単位) を返します。
    - {{< ui >}}Percentage{{< /ui >}} (パーセンテージ): クエリは 0 から 100 の間のパーセンテージ値を返します。
2. エイリアスが設定された単一値を `dd_value` として返す SQL クエリを作成します (例: `SELECT COUNT(*) as dd_value FROM ANALYTICS_DB.PROD.ORDERS WHERE STATUS = 'FAILED'`)。
3. [{{< ui >}}Validate{{< /ui >}}] (検証) をクリックしてクエリ構文を検証します。

SQL クエリに `GROUP BY` 句が含まれている場合は、グループ化する列をカンマ区切りのリストとして [{{< ui >}}Group by{{< /ui >}}] (グループ化) フィールドに指定します (例: `column_a, column_b`)。各グループは個別に評価されます。

**注**: 請求のため、各カスタム SQL モニターは個別の監視対象テーブルとしてカウントされます。

{{< img src="monitors/monitor_types/data_observability/custom_sql_example.png" alt="カスタム SQL モニターを作成するための入力フィールド。" style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

## モニターの構成 {#configure-monitor}

### 検出方法 {#detection-method}

検出方法を選択します。

- {{< ui >}}Anomalies{{< /ui >}} (異常): メトリクスが期待されるパターンから逸脱したときにアラートを送信します。しきい値は不要です。異常モデルのトレーニングには、基になるデータの更新頻度に応じて **3 〜 7 日間** (週末を含む) かかります。トレーニング期間中は、モニターはアラートをトリガーせず、青色で表示されます。トレーニング完了後、モニターは正常な状態では緑色で、外れ値の状態では赤色で表示されます。
- {{< ui >}}Thresholds{{< /ui >}} (しきい値): メトリクスが一定の値を超えたときにアラートをトリガーします。比較演算子 (`above`、`above or equal to`、`below`、`below or equal to`、`equal to`、または `not equal to`) を設定し、[{{< ui >}}Critical{{< /ui >}}] (重大) しきい値 (必須) を指定します。また、必要に応じて [{{< ui >}}Warning{{< /ui >}}] (警告) しきい値を定義します。詳細については、[モニターを構成][8] を参照してください。

### WHERE 句 {#where-clause}

{{< ui >}}WHERE{{< /ui >}} 句を追加して、モニターが評価するデータをフィルタリングします。これは、特定のデータセグメントや最近のレコードのみを監視する場合に便利です。たとえば、次のようにします。

- `created_at >= DATEADD(day, -7, CURRENT_TIMESTAMP())` — 過去 1 週間の行のみを監視します。
- `region = 'US'` — 特定のリージョンのデータのみを監視します。

### グループ化 {#group-by}

{{< ui >}}Group by{{< /ui >}} 句を追加して、単一モニターを複数のグループに分割し、それぞれを個別に評価できます。たとえば、行数モニターを `REGION` 列でグループ化すると、地域別に個別のアラートが生成されます。

{{< img src="monitors/monitor_types/data_observability/group_by_column_selection.png" alt="GROUP BY ディメンションを選択するための入力フィールド。" style="width:80%;" >}}

モニターあたりのデフォルトの上限は 500 グループです。この制限を増やすには、[サポートにお問い合わせください][9]。

### データがない {#missing-data}

[{{< ui >}}If data is missing to evaluate{{< /ui >}}] (評価対象データがない場合) ドロップダウンメニューで、評価対象のデータがない場合にモニターが報告する内容を選択します。

### モデル構成 {#model-configuration}

{{< callout url="#" btn_hidden="true" header="プレビュー" >}}
以下のモデル構成設定はプレビュー版です。オーガニゼーションでこれらの設定を有効にするには、Datadog 担当者にお問い合わせください。
{{< /callout >}}

[{{< ui >}}Anomalies{{< /ui >}}] (異常) 検出方法を使用するモニターの場合、[{{< ui >}}Model configuration{{< /ui >}}] (モデル構成) を展開してモデルの動作を調整します。

| 設定 | 説明 |
|---|---|
| {{< ui >}}Alert after N consecutive anomalies{{< /ui >}} (N 件の連続する異常が検出された後でアラート) | モニターがアラートを送信するまでの連続した評価失敗の数。一時的な急増を抑制するには、この設定を構成します。|
| {{< ui >}}Minimum upper bound size{{< /ui >}} (最小上限サイズ) | モデルが上限でデータをどの程度厳密に追跡するかを制限します。|
| {{< ui >}}Minimum lower bound size{{< /ui >}} (最小下限サイズ) | モデルがデータの下限でどの程度厳密に追跡するかを制限します。|

### モニターのスケジュール {#monitor-schedule}

モニターがデータを評価する頻度を設定します。

- {{< ui >}}Scheduled{{< /ui >}} (スケジュール済み): モニターは一定の間隔で実行されます。[{{< ui >}}Run this monitor{{< /ui >}}] (このモニターの実行間隔) で、[{{< ui >}}Hourly{{< /ui >}}] (1 時間)、[{{< ui >}}Every 3 hours{{< /ui >}}] (3 時間)、[{{< ui >}}Every 6 hours{{< /ui >}}] (6 時間)、[{{< ui >}}Every 12 hours{{< /ui >}}] (12 時間)、[{{< ui >}}Daily{{< /ui >}}] (1 日)、または [{{< ui >}}Custom schedule{{< /ui >}}] (カスタムスケジュール) を選択します。
- [{{< ui >}}Manual{{< /ui >}}] (手動)(プレビュー): モニターは、プログラムによってトリガーされた場合にのみ実行されます。[Data Observability API][10] を使用して、スケジュールに沿ってこれらのモニターをトリガーし、モデリングに役立つ十分な履歴データを蓄積します。UI では行数や鮮度などのデフォルトメトリクスがサポートされていないため、このワークフローはカスタムメトリクスまたはカラムレベルのメトリクスに適用されます。

独自のスケジュールを定義するには、[{{< ui >}}Custom schedule{{< /ui >}}] (カスタムスケジュール) を選択して cron 式を入力します。カスタムスケジュールは、最短で 15 分間隔で実行できます。[{{< ui >}}Preview times{{< /ui >}}] (時間のプレビュー) には次回以降のいくつかの実行がローカルタイムゾーンで表示されるため、この式を保存前に確認できます。

### アラート条件の設定 {#set-alert-conditions}

集計タイプを選択します。

- {{< ui >}}Simple Alert{{< /ui >}} (シンプルなアラート): 監視対象のテーブルまたは列が条件に一致したときに、通知を 1 回送信します。
- {{< ui >}}Multi Alert{{< /ui >}} (複数のアラート): 条件に一致するグループごとにアラートを送信します。アラートの粒度を制御するには、グループ化の基準となるディメンション (例: `table`、`schema`、`database`) をカスタマイズします。たとえば、`schema` でグループ化すると、スキーマごとに 1 つのアラートのみが送信され、影響を受けるすべてのテーブルがまとめられるため、ノイズが軽減されます。

### 通知の例{#example-notification}

{{< tabs >}}
{{% tab "しきい値" %}}

{{< code-block lang="text" >}}
{{#is_alert}}
Data quality issue detected on {{database.name}}.{{schema.name}}.{{table.name}}:
current value {{value}} has breached the threshold of {{threshold}}.
{{/is_alert}}

{{#is_recovery}}
Data quality issue on {{database.name}}.{{schema.name}}.{{table.name}} has recovered.
Current value {{value}} is within the threshold of {{threshold}}.
{{/is_recovery}}
{{< /code-block >}}

{{% /tab %}}
{{% tab "異常" %}}

{{< code-block lang="text" >}}
{{#is_alert}}
Anomaly detected on {{database.name}}.{{schema.name}}.{{table.name}}:
observed value {{observed}} is outside the expected range of {{lower_bound}} to {{upper_bound}}
(predicted: {{predicted}}).
{{/is_alert}}

{{#is_recovery}}
{{database.name}}.{{schema.name}}.{{table.name}} has recovered.
Observed value {{observed}} is within the expected range.
{{/is_recovery}}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## ソース/ターゲットモニター{#source-to-target-monitors}

<div class="alert alert-info">ソース/ターゲットモニターはプレビュー版です。アクセスをリクエストするには、Datadog の担当者または<a href="/help/">サポート</a>にお問い合わせください。</div>

ソース/ターゲットモニターは、2 つのデータアセットで同じメトリクスを比較し、この 2 つの値が乖離したときにアラートを送信します。その他の Data Observability モニターは、単一アセットが最新であるか、または完了しているかを追跡します。ソース/ターゲットモニターは、宛先に到達したコピーがソースから移動されたコピーと一致しているかどうかを追跡します。

パイプラインでデータがシステム間を移動する場合、部分的な失敗が失敗として認識されることはほとんどありません。100,000 行がソーステーブルから移動され、宛先に到達した行が 99,850 行の場合、行数モニターは宛先の行数のみを妥当な値として認識します。2 つのアセットを比較することで、その差異が明らかになります。

ソース/ターゲットモニターは次の目的に使用できます。

- Postgres から Databricks へのレプリケーションを検証する。
- 同じ Snowflake アカウント内の 2 つのデータベース (例: 品質データベースと本番データベース) を照合する。
- カットオーバー前に Redshift から BigQuery への移行を検証する。この場合、両方のシステムを並行して実行し、それらが一致することを確認する。
- 変換によって、入力と出力の間で行が削除されていないことを確認する。

ソース/ターゲットモニターは、GovCloud を除くすべてのリージョンで利用可能です。

### ソース/ターゲットモニターの作成{#create-a-source-to-target-monitor}

1. [[{{< ui >}}Monitors{{< /ui >}}] (モニター) > [{{< ui >}}New Monitor{{< /ui >}}] (モニターの新規作成)][6] に移動し、[{{< ui >}}Source to Target{{< /ui >}}] (ソース/ターゲット) を選択します。
2. [{{< ui >}}Choose source{{< /ui >}}] (ソースを選択) で、ソースデータを保持するデータウェアハウスを選択し、比較するデータを選択します。
3. [{{< ui >}}Choose target{{< /ui >}}] (ターゲットを選択) で、宛先について同様の操作を行います。ソースとターゲットは、異なるデータウェアハウスにあっても、同じデータウェアハウスにあっても構いません。
4. [{{< ui >}}Select your metric type{{< /ui >}}] (メトリクスタイプを選択) で、比較するメトリクスを選択します。ソース/ターゲットモニターでは、他の Data Observability モニターと同じメトリクスタイプ (行数、鮮度、null 値、、一意性、カーディナリティ、{{< ui >}}Custom SQL{{< /ui >}} (カスタム SQL) など) がサポートされています。
5. 比較の表現方法を制御するため、[{{< ui >}}Format{{< /ui >}}] (形式) を設定します。
    - {{< ui >}}Difference{{< /ui >}} (差分): ターゲットの値からソースの値を引いた値。負の値は、ターゲットがソースより少ないことを意味します。
    - {{< ui >}}% Difference{{< /ui >}} (差分 %): 同じ差分をソースの値に対する割合として示します。
6. [モニターを構成](#configure-monitor)の説明に従って、検出方法、スケジュール、および通知を構成します。

[{{< ui >}}Preview Monitor Evaluation{{< /ui >}}] (モニターのプレビュー) パネルには、指定したソースとターゲット、および選択したメトリクスのプレビューが表示されます。

監視対象のアセットはターゲットであるため、モニターはターゲットのステータスページに表示されます。

### カスタムメトリクスの比較{#compare-a-custom-metric}

メトリクスタイプが [{{< ui >}}Custom SQL{{< /ui >}}] (カスタム SQL) の場合、ソースとターゲットそれぞれにクエリを 1 つずつ提供します。このメトリクスタイプでは、{{< ui >}}WHERE{{< /ui >}} 句は受け入れられません。各クエリにフィルタリングを含めます。

### 評価 {#evaluation}

ソースとターゲットの差分は固有のメトリクスとして記録されるため、ソース/ターゲットモニターは、異常検知などの他の Data Observability モニターと同じ検出方法で評価されます。両側が同期されたスケジュールで測定されるため、各ウェアハウスのデフォルトの収集頻度に従うのではなく、2 つの値が同時にキャプチャされます。

## スキーマ変更モニター {#schema-change-monitors}

<div class="alert alert-info">スキーマ変更モニターはプレビュー版です。</div>

スキーマ変更モニターは、データの内容が変更されたときではなく、データの構造が変更されたときにアラートを送信します。これを使用して、列の削除、名前変更、または別のデータ型への切り替えなどのアップストリームの変更を、この変更によってダウンストリームのパイプラインやダッシュボードが破損する前の段階で捕捉します。

スキーマ変更モニターは、データベース、スキーマ、テーブル、および列で 4 種類の変更を検出します。

| 変更タイプ | 説明 |
|---|---|
| Added (追加) | データベース、スキーマ、テーブル、または列が作成されました。|
| Removed (削除) | データベース、スキーマ、テーブル、または列が削除されました。|
| Renamed (名前変更) | テーブルまたは列の名前が変更されました。|
| Type changed (型の変更) | 列のデータ型が変更されました (例: `INTEGER` から `STRING` への変更)。|

スキーマ変更は、Snowflake、BigQuery、Databricks、および Redshift で検出されます。

### スキーマ変更モニターの作成 {#create-a-schema-change-monitor}

1. [[{{< ui >}}Monitors{{< /ui >}}] (モニター) > [{{< ui >}}New Monitor{{< /ui >}}] (モニターの新規作成) > [{{< ui >}}Schema Change{{< /ui >}}] (スキーマ変更)][11] に移動します。
2. [{{< ui >}}Choose data to monitor{{< /ui >}}] (監視対象データを選択) で、監視するウェアハウスを選択します。
3. [モニターを構成](#configure-monitor)の説明に従って通知を構成します。

スキーマ変更モニターは、測定値が境界を超えたことではなく、構造的な変更についてアラートを送信するため、メトリクスタイプや検出方法を使用しません。

### 検出されたスキーマ変更の確認 {#browse-detected-schema-changes}

モニターを作成せずに Datadog が検出した変更を確認するには、[[{{< ui >}}Data Observability{{< /ui >}}] > [{{< ui >}}Schema Changes{{< /ui >}}] (スキーマ変更)][12] に移動します。プラットフォーム、アカウント、データベース、スキーマ、または変更タイプでフィルタリングし、エントリを展開して影響を受ける列とそのデータ型を確認します。

変更が検出されるのは、Datadog が次にウェアハウスからスキーマメタデータを収集し、現在の構造を以前に収集した構造と比較する時点です。

## モニターの例{#example-monitors}

{{< tabs >}}
{{% tab "行数の減少" %}}

パイプラインの障害やデータの欠落を示している可能性がある、行数の大幅な減少を検出します。

1. [{{< ui >}}Table{{< /ui >}}] (テーブル) > [{{< ui >}}Row Count{{< /ui >}}] (行数) を選択し、ターゲットテーブル (例: `ANALYTICS_DB.PROD.EVENTS`) を選択します。
2. 検出方法として [{{< ui >}}Anomalies{{< /ui >}}] (異常) を選択します。行数が過去のベースラインから逸脱したときにモニターがトリガーされます。

{{% /tab %}}
{{% tab "未更新のテーブル" %}}

重要なテーブルが期待される時間枠内に更新されなかった場合に、アラートを送信します。

1. [{{< ui >}}Table{{< /ui >}}] (テーブル) > [{{< ui >}}Freshness{{< /ui >}}] (鮮度数) を選択し、ターゲットテーブル (例: `ANALYTICS_DB.PROD.ORDERS`) を選択します。
2. 検出方法として [{{< ui >}}Thresholds{{< /ui >}}] (しきい値) を選択します。
3. [{{< ui >}}Alert threshold{{< /ui >}}] (アラートしきい値) を **6 時間**に設定し、必要に応じて [{{< ui >}}Warning threshold{{< /ui >}}] (警告しきい値) を **4 時間**に設定します。

{{% /tab %}}
{{% tab "null 値の割合の急増" %}}

列の null 値の割合が通常レベルを超えたことを検出します。これはデータ取り込みの問題を示している可能性があります。

1. [{{< ui >}}Column{{< /ui >}}] (列) > [{{< ui >}}Nullness{{< /ui >}}] (null 値) を選択し、ターゲット列 (例: `ANALYTICS_DB.PROD.USERS.EMAIL`) を選択します。
2. 検出方法として [{{< ui >}}Anomalies{{< /ui >}}] (異常) を選択します。

{{% /tab %}}
{{% tab "ソースとターゲット間で失われた行" %}}

レプリケーションまたは移行後に、ソーステーブルとターゲットテーブルの間で削除された行を検出します。

1. [{{< ui >}}Source to Target{{< /ui >}}] (ソース/ターゲット) を選択して、ソーステーブル (例: `POSTGRES_DB.PUBLIC.ORDERS`) とターゲットテーブル (例: `ANALYTICS_DB.PROD.ORDERS`) を選択します。
2. メトリクスとして [{{< ui >}}Row Count{{< /ui >}}] (行数) を選択し、[{{< ui >}}Format{{< /ui >}}] (形式) を [{{< ui >}}Difference{{< /ui >}}] (差分) に設定します。
3. 検出方法として [{{< ui >}}Anomalies{{< /ui >}}] (異常) を選択します。

{{% /tab %}}
{{< /tabs >}}

## 境界にアノテーションを付ける{#annotate-bounds}

**異常**検出方法を使用するモニターの場合、境界範囲にアノテーションを付けてフィードバックを提供し、時間の経過とともにモデルを改善できます。インフラストラクチャーメトリクスとは異なり、データ品質メトリクスは多くの場合ビジネス固有であるため、アノテーションを使用して、データにとってどのような動作が正常であるかをモデルに学習させます。

{{< img src="/monitors/monitor_types/data_observability/annotate_bounds.png" alt="モニターの境界にアノテーションを付けるためのホバーメニュー。" style="width:90%;" >}}

モニターのステータスページで [{{< ui >}}Annotate Bounds{{< /ui >}}] (境界にアノテーションを付ける) をクリックし、チャート上で時間範囲を選択して、次のいずれかのアノテーションを選択します。

| アノテーション | 説明 |
|---|---|
| {{< ui >}}Expected{{< /ui >}} (想定どおり) | 境界を拡張して、マークされた動作を永続的に含めます。|
| {{< ui >}}Reset for now{{< /ui >}} (現時点ではリセット) | 動作を OK としてマークしますが、再度発生した場合はアラートを送信します。|
| {{< ui >}}Missed alert{{< /ui >}} (アラートの欠落) | 境界を縮小して、この動作でアラートを送信します。|
| {{< ui >}}Ignore{{< /ui >}} (無視) | 境界をモデル化する際に、アノテーションが付けられたデータを除外します。|

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_observability/
[2]: /ja/data_observability/quality_monitoring/
[3]: /ja/data_observability/quality_monitoring/data_warehouses/snowflake/
[4]: /ja/data_observability/quality_monitoring/data_warehouses/databricks/
[5]: /ja/data_observability/quality_monitoring/data_warehouses/bigquery/
[6]: https://app.datadoghq.com/monitors/create/data-quality
[7]: https://app.datadoghq.com/data-obs/monitors
[8]: /ja/monitors/configuration/?tab=thresholdalert#thresholds
[9]: /ja/help/
[10]: /ja/api/latest/data-observability/
[11]: https://app.datadoghq.com/monitors/create/schema-change
[12]: https://app.datadoghq.com/data-obs/schema-changes
[13]: https://app.datadoghq.com/monitors/create/data-quality