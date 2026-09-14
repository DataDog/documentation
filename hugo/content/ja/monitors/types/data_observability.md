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
  text: モニター通知を構成する
- link: /monitors/downtimes/
  tag: ドキュメント
  text: ダウンタイムをスケジュールしてモニターをミュートする
- link: /monitors/status/
  tag: ドキュメント
  text: モニターのステータスを確認する
title: Data Observability モニター
---
## 概要 {#overview}

[Data Observability][1] モニターは、季節性、傾向、ユーザーフィードバックから学習する異常検知機能を使用し、データの遅延、不完全なロード、予期しない値の変化を、それらが下流のダッシュボード、AI アプリケーション、またはビジネス上の意思決定に影響を与える前に検出します。エンドツーエンドのデータおよびコードリネージと組み合わせることで、これらのモニターは、チームによる問題の早期検出、下流への影響の評価、適切な担当者への割り当てを支援します。

Data Observability モニターは、以下のメトリクスタイプをサポートしています。

**テーブルレベルのメトリクスタイプ:**
| メトリクスタイプ | 説明 |
|---|---|
| 鮮度 | テーブルが最後に更新されてからの経過時間を追跡します。|
| 行数 | テーブルまたはビュー内の行数を追跡します。|
| カスタム SQL | SQL クエリによって返されるカスタムメトリクス値を追跡します。|

**列レベルのメトリクスタイプ:**
| メトリクスタイプ | 説明 |
|---|---|
| 鮮度 | 日時列で確認された最新の日付を追跡します。|
| 一意性 | 一意の値の割合を追跡します。|
| ヌル性 | ヌル値の割合を追跡します。|
| カーディナリティ | 異なる値の数を追跡します。|
| ゼロの割合 | ゼロと等しい値の割合を追跡します。|
| 負の数の割合 | 負の値の割合を追跡します。|
| 最小値 / 最大値 / 平均値 / 合計値 / 標準偏差 | 列の値全体にわたる統計的尺度を追跡します。|

Datadog は、利用可能な場合、ウェアハウスシステムのメタデータ (例: `INFORMATION_SCHEMA`) から、行数や鮮度などのメトリクスを収集します。これにより、ウェアハウスに対するクエリの実行を回避し、コンピューティングコストを削減できます。すべてのウェアハウスがシステムメタデータを公開しているわけではありません。システムメタデータから収集できないメトリクスについては、モニターがウェアハウスに対して直接クエリを実行し、値を計算します。

Data Observability モニターを利用するには、少なくとも 1 つのサポートされているデータウェアハウス (例: [Snowflake][3]、[Databricks][4]、または [BigQuery][5]) で [Quality Monitoring][2] が設定されている必要があります。

Data Observability では、[モニター作成フロー][13]の最初のステップで選択する 4 つのモニタータイプを提供しています。

| モニタータイプ | 監視対象 |
|---|---|
| データ品質 | テーブルおよび列の鮮度、行数、列レベルのメトリクス。|
| [ソースからターゲットへ](#source-to-target-monitors) | ソースアセットとターゲットアセット間における同一メトリクスの差異。|
| [スキーマ変更](#schema-change-monitors) | データウェアハウス内で追加、削除、名前変更、または型変更されたフィールド。|
| ジョブ | 失敗したジョブの実行。|

特に記載がない限り、以下のセクションではデータ品質モニタータイプについて説明します。

## モニターの作成 {#monitor-creation}

Datadog で Data Observability モニターを作成するには、[{{< ui >}}Data Observability{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][6] または [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Data Observability{{< /ui >}}][6] に移動します。既存のすべての Data Observability モニターを表示するには、[Data Observability モニターページ][7]を参照してください。

## 監視するデータを選択 {#choose-data-to-monitor}

まず、{{< ui >}}Table{{< /ui >}}レベルまたは{{< ui >}}Column{{< /ui >}}レベルのどちらを監視するかを選択します。

{{< img src="monitors/monitor_types/data_observability/entity_type_selection_and_aastra.png" alt="監視するデータを選択します: エンティティタイプセレクター、クエリ入力、およびリネージ関係フィルター" style="width:60%;" >}}

次に、{{< ui >}}Edit{{< /ui >}}タブを使用して、検索フィールドに`key:value`フィルターを入力し、テーブル、ビュー、または列を検索します。

**名前または場所でフィルタリング:**

| フィルター | 例 | 説明 |
|---|---|---|
| 名前 | `name:USERS*` | 名前で一致させます。`*`ワイルドカードをサポートしています。|
| スキーマ | `schema:PROD` | スキーマで一致させます。|
| データベース | `database:ANALYTICS_DB` | データベースで一致させます。|
| アカウント | `account:my_account` | アカウントで一致させます。|

**タグでフィルタリング:**

タグキーをフィルターキーとして使用することで、データアセットに適用されている任意のタグでフィルタリングできます。たとえば、アセットに`owner`、`platform`、または`environment`のタグが付いている場合は、それらのタグを直接検索します。

| 例 | 説明 |
|---|---|
| `owner:data-platform-team` | `owner:data-platform-team` でタグ付けされたアセットと一致させます。|
| `platform:snowflake` | `platform:snowflake` でタグ付けされたアセットと一致させます。|
| `environment:production` | `environment:production` でタグ付けされたアセットと一致させます。|

タグフィルターは、名前フィルターと同じ `*` ワイルドカードと引用符をサポートしています。たとえば、`owner:data-*` や `platform:"Snowflake Prod"` などです。

**計算属性でフィルタリング:**

独自のタグに加えて、Datadog はデータアセットの属性を計算し、それに基づいてフィルタリングできるようにします。利用可能な計算属性は次のとおりです。

| 属性 | 値 | 説明 |
|---|---|---|
| `lineage_score` | `0.00`、`0.10`、`0.30`、`0.50`、`0.70`、`0.90`、または`1.00` | リネージグラフ内でアセットがどの程度接続されているかを示す相対的な尺度であり、同じタイプのアセットと比較して、いくつのダウンストリームアセットがそれに依存しているかに基づいています。値が高いほど、ダウンストリームのコンシューマーが依存しているテーブル、ビュー、および列を特定します。|

`lineage_score` は連続的な値をとるのではなく、上記にリストされた個別の階層に分類されるため、それらの正確な値のいずれかでフィルタリングします。単一の階層に一致させるか、`OR` を使用して階層を組み合わせます。たとえば、`lineage_score:1.00` は最も依存されているアセットを返し、`lineage_score:(0.90 OR 1.00)` は上位 2 つの階層を返します。

これらのフィルターを `AND` または `OR` と組み合わせて使用したり、括弧を使用して条件をグループ化したり、`-` を先頭に付けて除外したりできます。

**例:**

| 目的 | クエリ |
|---|---|
| PROD スキーマ内のすべてのテーブル (一時テーブルを除く) | `schema:PROD AND -name:TEMP*` |
| すべてのタイムスタンプ列 | `name:*_AT OR name:*_TIMESTAMP` |
| 特定のデータベースの PROD または STAGING にあるテーブル | `database:ANALYTICS_DB AND (schema:PROD OR schema:STAGING)` |
| 特定のチームが所有するテーブル | `owner:data-platform-team` |
| データベース内で最も依存されているテーブル | `database:ANALYTICS_DB AND lineage_score:1.00` |

**リネージ関係でフィルタリング:**

リネージグラフ内の別のアセットに接続されているアセットに選択範囲を絞り込むには、{{< ui >}}Add Relation Filter{{< /ui >}} をクリックします。{{< ui >}}Upstream of{{< /ui >}} または {{< ui >}}Downstream of{{< /ui >}} を選択し、特定のアセットを選択するか、同じ `key:value` フィルターを使用して一連のアセットを照合します。たとえば、重要なダッシュボードの上流にあるすべてのテーブルや、特定のソーステーブルの下流にあるすべての列をモニターします。

**階層関係でフィルタリング:**

リネージグラフ内で、他のアセットの親または子にあたるアセットに選択範囲を絞り込むには、{{< ui >}}Add Relation Filter{{< /ui >}} をクリックします。{{< ui >}}Parent of{{< /ui >}} または {{< ui >}}Child of{{< /ui >}} を選択し、特定のアセットを選択するか、同じ `key:value` フィルターを使用して一連のアセットを照合します。たとえば、`revenue` 列を持つすべてのテーブルや、重要なスキーマ内にあるすべてのテーブルをモニターします。

1 つのモニターで最大 5,000 個のテーブル、ビュー、または列を追跡できます。この制限を増やすことはできません。クエリがそれ以上に一致する場合は、複数のモニターに分割します。

## メトリクスタイプを選択 {#select-your-metric-type}

追跡したいデータ品質シグナルに基づいてメトリクスタイプを選択します。各モニターは 1 つのメトリクスタイプを追跡します。

{{< tabs >}}
{{% tab "鮮度" %}}

{{< ui >}}Freshness{{< /ui >}}メトリクスタイプは、データが期待される時間枠内に更新されていないことを検出します。これを使用して、古いデータが下流のレポートやモデルに影響を与える前に捕捉します。

- **テーブルの鮮度**は、テーブルが最後に更新されてからの経過時間を追跡します。テーブルの鮮度は、ビューや、システムメタデータでテーブルの更新タイムスタンプを提供しないデータウェアハウスでは利用できません。代わりに列レベルの鮮度を使用します。
- **列の鮮度**は、日時列で確認された最新の日付を追跡します。

{{% /tab %}}
{{% tab "行数" %}}

{{< ui >}}Row Count{{< /ui >}}メトリクスタイプは、テーブル内の行数の変化を追跡します。パイプラインの障害や上流の問題を示す可能性のある、データの予期しない減少や急増を検出するために使用します。

{{% /tab %}}
{{% tab "列メトリクス" %}}

{{< ui >}}Column{{< /ui >}}メトリクスタイプは、列レベルのメトリクスを追跡して、データドリフトや品質の低下を検出します。以下から選択します。

| メトリクス | 説明 |
|---|---|
| {{< ui >}}Uniqueness{{< /ui >}} | 列内の値のうち、一意であるものの割合。|
| {{< ui >}}Nullness{{< /ui >}} | 列内の値のうち、null であるものの割合。|
| {{< ui >}}Cardinality{{< /ui >}} | 列内の異なる値の数。|
| {{< ui >}}Percent Zero{{< /ui >}} | 列内の値のうち、ゼロであるものの割合。|
| {{< ui >}}Percent Negative{{< /ui >}} | 列内の値のうち、負の値であるものの割合。|
| {{< ui >}}Min{{< /ui >}} | 列内のすべての値の最小値。|
| {{< ui >}}Max{{< /ui >}} | 列内のすべての値の最大値。|
| {{< ui >}}Mean{{< /ui >}} | 列内のすべての値の平均値。|
| {{< ui >}}Standard Deviation{{< /ui >}} | 列内の値のばらつきの尺度。|
| {{< ui >}}Sum{{< /ui >}} | 列内のすべての値の合計。 |

<div class="alert alert-info">一部の列メトリクスは、特定の列タイプでのみ利用可能です。数値メトリクス (ゼロの割合、負の割合、最小値、最大値、平均値、標準偏差、合計) には、数値型の列が必要です。</div>

{{% /tab %}}
{{% tab "カスタム SQL" %}}

{{< ui >}}Custom SQL{{< /ui >}}メトリクスタイプは、定義した SQL クエリによって返されるカスタムメトリクス値を追跡します。組み込みのメトリクスタイプでは対応できないユースケース (ビジネス固有のデータ品質ルールの監視など) の場合に使用します。

1. クエリによって返される値を記述するモデルタイプを選択してください。
    - {{< ui >}}Default{{< /ui >}}: クエリはスカラー値を返します。ほとんどの場合、これを使用してください。
    - {{< ui >}}Freshness{{< /ui >}}: クエリは、現在時刻とイベントが最後に発生した時刻との差 (秒単位) を返します。
    - {{< ui >}}Percentage{{< /ui >}}: クエリは 0 から 100 の間のパーセンテージ値を返します。
2. `dd_value` としてエイリアスされた単一の値を返す SQL クエリを記述してください。例: `SELECT COUNT(*) as dd_value FROM ANALYTICS_DB.PROD.ORDERS WHERE STATUS = 'FAILED'`
3. クエリの構文を確認するには、{{< ui >}}Validate{{< /ui >}} をクリックしてください。

SQL クエリに `GROUP BY` 句が含まれている場合は、グループ化された列をカンマ区切りのリストとして {{< ui >}}Group by{{< /ui >}} フィールドに一覧表示してください (例: `column_a, column_b`)。各グループは個別に評価されます。

**注**: 各カスタム SQL モニターは、課金目的において個別の監視対象テーブルとしてカウントされます。

{{< img src="monitors/monitor_types/data_observability/custom_sql_example.png" alt="カスタム SQL モニター作成用の入力フィールド。" style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

## モニターの構成 {#configure-monitor}

### 検出方法 {#detection-method}

検出方法を選択してください。

- {{< ui >}}Anomalies{{< /ui >}}: メトリックが期待されるパターンから逸脱したときにアラートを送信します。しきい値は必要ありません。異常検知モデルのトレーニングには、基盤となるデータの更新頻度に応じて、**3 日から 7 日間** (週末を含む) が必要です。トレーニング期間中、モニターはアラートを送信せず、青色で表示されます。トレーニング完了後、モニターは正常な状態では緑色で、外れ値の状態では赤色で表示されます。
- {{< ui >}}Thresholds{{< /ui >}}: メトリックが固定値を超えたときにアラートを送信します。比較演算子 (`above`、`above or equal to`、`below`、`below or equal to`、`equal to`、または `not equal to`) を設定し、{{< ui >}}Critical{{< /ui >}}しきい値 (必須) と、オプションで {{< ui >}}Warning{{< /ui >}}しきい値を定義します。詳細については、[モニターの構成][8]を参照してください。

### WHERE 句 {#where-clause}

{{< ui >}}WHERE{{< /ui >}} 句を追加して、モニターによって評価されるデータをフィルタリングします。これは、データの特定のセグメントや最近のレコードのみを監視する場合に便利です。例:

- `created_at >= DATEADD(day, -7, CURRENT_TIMESTAMP())` — 過去 1 週間の行のみをモニターします。
- `region = 'US'` — 特定の地域のデータのみをモニターします。

### グループ化 {#group-by}

{{< ui >}}Group by{{< /ui >}} 句を追加すると、1つのモニターを複数のグループに分割し、それぞれを個別に評価できます。たとえば、行数モニターを `REGION` 列でグループ化すると、地域ごとに個別のアラートが生成されます。

{{< img src="monitors/monitor_types/data_observability/group_by_column_selection.png" alt="GROUP BY ディメンションを選択するための入力フィールドです。" style="width:80%;" >}}

デフォルトの制限は、モニターあたり 500 グループです。この制限を増やすには、[サポートに連絡][9]してください。

### モデルの構成 {#model-configuration}

{{< ui >}}Anomalies{{< /ui >}} 検出方法を使用するモニターの場合、{{< ui >}}Model configuration{{< /ui >}} を展開してモデルの動作を調整します。

| 設定 | 説明 |
|---|---|
| {{< ui >}}Alert after N consecutive anomalies{{< /ui >}} | モニターがアラートを送信するまでの連続した評価失敗の回数です。一時的な急上昇を抑制するために、この設定を構成します。|
| {{< ui >}}Minimum upper bound size{{< /ui >}} | モデルがデータの上限をどの程度厳密に追跡するかを制限します。|
| {{< ui >}}Minimum lower bound size{{< /ui >}} | モデルがデータの下限をどの程度厳密に追跡するかを制限します。|

{{< ui >}}If data is missing to evaluate{{< /ui >}} ドロップダウンメニューで、評価用のデータがない場合にモニターが何を報告するかを選択します。

### モニターのスケジュール {#monitor-schedule}

モニターがデータを評価する頻度を設定します。

- {{< ui >}}Scheduled{{< /ui >}}: モニターは固定の周期で実行されます。{{< ui >}}Run this monitor{{< /ui >}} で、{{< ui >}}Hourly{{< /ui >}}、{{< ui >}}Every 3 hours{{< /ui >}}、{{< ui >}}Every 6 hours{{< /ui >}}、{{< ui >}}Every 12 hours{{< /ui >}}、{{< ui >}}Daily{{< /ui >}}、または {{< ui >}}Custom schedule{{< /ui >}} を選択します。
- {{< ui >}}Manual{{< /ui >}}(プレビュー): モニターはプログラムによってトリガーされた場合にのみ実行されます。モデリングに役立つ十分な履歴データを蓄積するために、[Data Observability API][10] を使用してこれらのモニターをスケジュールに従ってトリガーします。UI は行数や鮮度などのデフォルトメトリクスをサポートしていないため、このワークフローはカスタムメトリクスまたは列レベルのメトリクスに適用されます。

独自のスケジュールを定義するには、{{< ui >}}Custom schedule{{< /ui >}} を選択し、cron 式を入力します。カスタムスケジュールは、最短で 15 分ごとに実行できます。{{< ui >}}Preview times{{< /ui >}} にはローカルタイムゾーンでの次回の実行予定がいくつか表示されるため、保存前に式を確認できます。

### アラートを送信する条件を設定{#set-alert-conditions}

集計タイプを選択します。

- {{< ui >}}Simple Alert{{< /ui >}}: 監視するテーブルまたは列がいずれか 1 つでも条件を満たした場合、アラートを 1 回送信します。
- {{< ui >}}Multi Alert{{< /ui >}}: 条件を満たすグループごとに通知を送信します。アラートの粒度を制御するために、グループ化するディメンション (例: `table`、`schema`、`database`) をカスタマイズします。たとえば、`schema` でグループ化すると、スキーマごとに 1 つのアラートのみが送信され、影響を受けるすべてのテーブルがまとめられるため、ノイズが軽減されます。

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

## ソースからターゲットへのモニター{#source-to-target-monitors}

<div class="alert alert-info">ソースからターゲットへのモニターはプレビュー版です。アクセスをリクエストするには、Datadog 担当者または <a href="/help/">サポート</a>までお問い合わせください。</div>

ソースからターゲットへのモニターは、2 つのデータアセット間で同じメトリクスを比較し、両者の値が乖離したときにアラートを送信します。その他の Data Observability モニターは、単一のアセットが最新であるか、または完全であるかを追跡します。ソースからターゲットへのモニターは、ソースから送信されたデータのコピーが宛先に到達したコピーと一致しているかどうかを追跡します。

パイプラインがシステム間でデータを移動する際、部分的な障害は障害として認識されないことがよくあります。ソーステーブルから 100,000 行が出力され、宛先に 99,850 行が到着した場合、宛先のみをモニターする行数モニターでは、その値は妥当なものとして扱われます。2 つのアセットを比較することで、その差異が明らかになります。

ソースからターゲットへのモニターを使用して、以下のことを行います。

- Postgres から Databricks へのレプリケーションを検証します。
- 同じ Snowflake アカウント内の 2 つのデータベース (例: 品質管理データベースと本番データベース) を照合します。
- Redshift から BigQuery への移行をカットオーバー前に検証します。両方のシステムを並行して実行し、それらが一致することを確認します。
- 変換処理によって入力と出力の間でデータ行が欠落していないことを確認します。

ソースからターゲットへのモニターは、GovCloud を除くすべてのリージョンで利用可能です。

### ソースからターゲットへのモニターを作成する {#create-a-source-to-target-monitor}

1. [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][6] に移動し、{{< ui >}}Source to Target{{< /ui >}} を選択します。
2. {{< ui >}}Choose source{{< /ui >}} で、ソースデータを保持するウェアハウスを選択し、比較するデータを選択します。
3. {{< ui >}}Choose target{{< /ui >}} で、宛先についても同様の操作を行います。ソースとターゲットは、異なるデータウェアハウスにあっても、同じデータウェアハウスにあっても構いません。
4. {{< ui >}}Select your metric type{{< /ui >}} で、比較するメトリクスを選択します。ソースからターゲットへのモニターは、行数、鮮度、NULL 値の有無、一意性、カーディナリティ、{{< ui >}}Custom SQL{{< /ui >}} など、他の Data Observability モニターと同じメトリクスタイプをサポートしています。
5. 比較の表現方法を制御するには、{{< ui >}}Format{{< /ui >}} を設定します。
    - {{< ui >}}Difference{{< /ui >}}: ターゲット値からソース値を引いた値です。負の値は、ターゲットの値がソースの値より少ないことを意味します。
    - {{< ui >}}% Difference{{< /ui >}}: ソース値に対する同じ差分の割合です。
6. [モニターの構成](#configure-monitor)で説明されているように、検知方法、スケジュール、通知を構成します。

{{< ui >}}Preview Monitor Evaluation{{< /ui >}}パネルには、特定されたソースとターゲット、および選択したメトリクスのプレビューが表示されます。

監視対象のアセットがターゲットであるため、モニターはターゲットのステータスページに表示されます。

### カスタムメトリックを比較する {#compare-a-custom-metric}

メトリクスタイプが {{< ui >}}Custom SQL{{< /ui >}} の場合は、ソース用に 1 つ、ターゲット用に 1 つのクエリを指定してください。このメトリクスタイプでは {{< ui >}}WHERE{{< /ui >}} 句は受け付けられません。各クエリにフィルタリングを含めてください。

### 評価 {#evaluation}

ソースとターゲットの差分は独自のメトリクスとして記録されるため、ソースからターゲットへのモニターは、異常検知を含む他の Data Observability モニターと同じ検知方法で評価されます。両側は同期されたスケジュールで測定されるため、各ウェアハウスのデフォルトの収集タイミングに従うのではなく、2 つの値が同時に取得されます。

## スキーマ変更モニター {#schema-change-monitors}

<div class="alert alert-info">スキーマ変更モニターはプレビュー版です。</div>

スキーマ変更モニターは、データの内容が変更されたときではなく、データの構造が変更されたときにアラートを送信します。列が削除されたり、名前が変更されたり、別のデータ型に変更されたりした場合など、ダウンストリームのパイプラインやダッシュボードが破損する前に、アップストリームの変更を検知するために使用します。

スキーマ変更モニターは、データベース、スキーマ、テーブル、および列全体で 4 種類の変更を検知します。

| 変更タイプ | 説明 |
|---|---|
| 追加 | データベース、スキーマ、テーブル、または列が作成されました。|
| 削除 | データベース、スキーマ、テーブル、または列が削除されました。|
| 名前変更 | テーブルまたは列の名前が変更されました。|
| 型変更 | 列のデータ型が、`INTEGER` から `STRING` のように変更されました。|

スキーマの変更は、Snowflake、BigQuery、Databricks、および Redshift で検知されます。

### スキーマ変更モニターを作成する {#create-a-schema-change-monitor}

1.  [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Schema Change{{< /ui >}}][11] に移動します。
2.  {{< ui >}}Choose data to monitor{{< /ui >}} で、監視対象のウェアハウスを選択します。
3. [モニターの構成](#configure-monitor)で説明されているように、通知を設定します。

スキーマ変更モニターは、測定値が境界を超えたときではなく、構造的な変更が発生したときにアラートを送信するため、メトリクスタイプや検出方法は必要ありません。

###  検出されたスキーマ変更を参照する {#browse-detected-schema-changes}

モニターを作成せずに Datadog が検出した変更を確認するには、[{{< ui >}}Data Observability{{< /ui >}} > {{< ui >}}Schema Changes{{< /ui >}}][12] に移動します。プラットフォーム、アカウント、データベース、スキーマ、または変更タイプでフィルタリングし、エントリを展開して、影響を受ける列とそのデータ型を確認します。

変更は、Datadog が次にウェアハウスからスキーマメタデータを収集し、現在の構造と以前に収集した構造を比較したときに検出されます。

## モニターの例 {#example-monitors}

{{< tabs >}}
{{% tab "行数の減少" %}}

パイプラインの障害やデータの欠落を示す可能性のある、行数の大幅な減少を検出します。

1.  {{< ui >}}Table{{< /ui >}} > {{< ui >}}Row Count{{< /ui >}} を選択し、ターゲットテーブル (例: `ANALYTICS_DB.PROD.EVENTS`) を選択します。
2.  {{< ui >}}Anomalies{{< /ui >}} を検出方法として選択します。行数が過去のベースラインから逸脱すると、モニターがトリガーされます。

{{% /tab %}}
{{% tab "古いテーブル" %}}

重要なテーブルが期待される時間枠内に更新されなかった場合に、アラートを送信します。

1.  {{< ui >}}Table{{< /ui >}} > {{< ui >}}Freshness{{< /ui >}} を選択し、ターゲットテーブル (例: `ANALYTICS_DB.PROD.ORDERS`) を選択します。
2.  {{< ui >}}Thresholds{{< /ui >}} を検出方法として選択します。
3.  {{< ui >}}Alert threshold{{< /ui >}} を **6 時間** に設定し、オプションで {{< ui >}}Warning threshold{{< /ui >}} を **4 時間** に設定します。

{{% /tab %}}
{{% tab "Null 値の割合の急増" %}}

列の Null 値の割合が通常のレベルを超えたことを検出します。これは、データ取り込みの問題を示している可能性があります。

1.  {{< ui >}}Column{{< /ui >}} > {{< ui >}}Nullness{{< /ui >}} を選択し、ターゲット列 (例: `ANALYTICS_DB.PROD.USERS.EMAIL`) を選択します。
2.  {{< ui >}}Anomalies{{< /ui >}} を検出方法として選択します。

{{% /tab %}}
{{% tab "ソーステーブルとターゲットテーブル間で失われた行" %}}

レプリケーションまたは移行後に、ソーステーブルとその宛先の間で失われた行を検出します。

1. {{< ui >}}Source to Target{{< /ui >}} を選択し、ソーステーブル (例: `POSTGRES_DB.PUBLIC.ORDERS`) とターゲットテーブル (例: `ANALYTICS_DB.PROD.ORDERS`) を選択します。
2. {{< ui >}}Row Count{{< /ui >}} をメトリクスタイプとして選択し、{{< ui >}}Format{{< /ui >}} を {{< ui >}}Difference{{< /ui >}} に設定します。
3.  {{< ui >}}Anomalies{{< /ui >}} を検出方法として選択します。

{{% /tab %}}
{{< /tabs >}}

## 境界に注釈を付ける {#annotate-bounds}

**異常**検出方法を使用するモニターでは、境界範囲に注釈を付けてフィードバックを提供し、時間の経過とともにモデルを改善できます。インフラストラクチャーのメトリクスとは異なり、データ品質メトリクスはビジネス固有であることが多いため、注釈を使用して、データにとってどのような動作が正常であるかをモデルに学習させてください。

{{< img src="/monitors/monitor_types/data_observability/annotate_bounds.png" alt="モニターの境界に注釈を付けるためのホバーメニュー。" style="width:90%;" >}}

モニターのステータスページで {{< ui >}}Annotate Bounds{{< /ui >}} をクリックし、チャート上で時間範囲を選択して、以下のいずれかの注釈を選択します。

| 注釈 | 説明 |
|---|---|
| {{< ui >}}Expected{{< /ui >}} | マークされた動作を永続的に含めるように境界を拡張します。|
| {{< ui >}}Reset for now{{< /ui >}} | 動作を OK としてマークしますが、再発した場合はアラートを送信します。|
| {{< ui >}}Missed alert{{< /ui >}} | この動作についてアラートを送信するように境界を狭めます。|
| {{< ui >}}Ignore{{< /ui >}} | 境界をモデル化する際に、注釈付きデータを除外します。|

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