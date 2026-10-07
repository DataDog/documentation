---
description: テーブル、ピボットテーブル、ルックアップ、計算列、柔軟なスプレッドシートを備えた、使い慣れたスプレッドシートインターフェイスで、Datadog
  のデータを分析します。
further_reading:
- link: /sheets/functions_operators
  tag: ドキュメント
  text: 関数と演算子
- link: https://www.datadoghq.com/blog/flexible-sheets-cloud-cost-management/
  tag: ブログ
  text: Datadog Sheets の柔軟なスプレッドシートでクラウドコストを分析する
- link: https://www.datadoghq.com/blog/datadog-forms-sheets-developer-feedback/
  tag: ブログ
  text: Datadog Forms と Sheets を使用して、開発者のフィードバックをオペレーションに関するインサイトに変える
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: ブログ
  text: Sheets、DDSQL Editor、および Notebooks を使用した Datadog での高度な分析のためのデータ探索
title: Sheets
---
## 概要 {#overview}

Sheets は、Datadog データを用いてスプレッドシートを作成できるツールで、技術的な専門知識を必要とせずに複雑な分析やレポート作成を行うことができます。これにより、ルックアップ、ピボットテーブル、計算など、慣れ親しんだスプレッドシート機能を Datadog データで活用できるため、データをエクスポートして古いデータで他のツールを使用する必要がなくなります。

Sheets を使えば、ログ、RUM (Real User Monitoring)、およびクラウドコスト監視から取得したデータを、使い慣れたスプレッドシートインターフェイス内で操作・変換・分析することが可能です。次のタブを含めることができます。

- [{{< ui >}}Table{{< /ui >}} (テーブル)](#table): Datadog データソースからライブデータをクエリして、計算列、ルックアップ、フィルターでエンリッチします。
- [{{< ui >}}Pivot{{< /ui >}} (ピボット)](#pivot): カスタムディメンションとカスタム計算を使用して、テーブルのデータを要約および集計します。
- [{{< ui >}}Sheet{{< /ui >}} (シート)](#sheet-preview)(プレビュー): まっさらな状態の柔軟なスプレッドシートで、テーブルのデータを直接参照する数式を記述して、モデルやレポートを作成したり、運用状況を追跡したりできます。

## テーブル {#table}

はじめに、Sheets から新規にクエリを作成するか、Logs、RUM、Metrics、Cloud Cost などのエクスプローラーページからクエリを転送して、データのテーブルを作成します。

### Sheets で新しいテーブルを追加する {#add-a-new-table-in-sheets}

{{< img src="/sheets/create_table.png" alt="status:error を使用する Logs クエリが表示されている、Sheets からテーブルを作成するためのモーダル。" style="width:90%;" >}}

1. [Datadog Sheets のページ][1]で、[{{< ui >}}New Spreadsheet{{< /ui >}}] (新規スプレッドシート) をクリックします。
1. [{{< ui >}}Add Data{{< /ui >}}] (データを追加) をクリックします。<br/>
**注**: 必要なデータソースが利用できない場合は、[こちら][19]からリクエストしてください。
1. クエリの作成を開始するには、データソースを選択し、フィルタリングパラメーターを追加します。
1. 表示したい列を選択し、結果として生成されるテーブルをプレビューします。
1. [{{< ui >}}Create Table{{< /ui >}}] (テーブルを作成) をクリックします。

### クエリをスプレッドシートに転送する {#transfer-your-query-to-a-spreadsheet}

1. 対応製品 ([Log Explorer][2] など) のページで、分析したいデータのクエリを作成します。たとえば、`status:error` を持つログのみをフィルタリングします。
1. [{{< ui >}}Open in Sheets{{< /ui >}}] (Sheets で開く) をクリックします。テーブルを作成できる製品ページのリストについては、[サポートされているデータソース](#supported-data-sources)セクションを参照してください。
1. [{{< ui >}}New Spreadsheet{{< /ui >}}] で新しいスプレッドシートを作成することも、[{{< ui >}}Existing Spreadsheet{{< /ui >}}] (既存のスプレッドシート) で既存のスプレッドシートにこのテーブルを追加することもできます。
1. [{{< ui >}}Save and Open{{< /ui >}}] (保存して開く) をクリックします。

### 計算列{#calculated-columns}

計算列を使用して、数式の追加、ログメッセージのパース、正規表現の抽出、またはデータへのビジネスロジックの追加を行うことができます。計算列は、後で作成するピボットテーブルで使用できます。

テーブルの最も右側の列ヘッダーから、プラスアイコンをクリックして [{{< ui >}}Add calculated column{{< /ui >}}] (計算列を追加) を選択します。関数を入力すると、その関数の構文と説明が表示されます。サポートされている関数の完全なリストについては、[関数と演算子][3]を参照してください。

{{< img src="/sheets/calculated_columns.png" alt="プラスアイコンを使用して追加された計算列と、IFS 関数の例" style="width:90%;" >}}

### ルックアップ {#lookup}

ルックアップは、既存のデータをエンリッチして、テーブルに詳細なコンテキストを追加します。ページ上部の [{{< ui >}}Add Lookup{{< /ui >}}] (ルックアップを追加) をクリックして、[リファレンステーブル][4]、ログ、RUM データなどの別のテーブルやデータソースから列を追加します。ルックアップは、Excel や Google スプレッドシートの左結合や vlookup に似ています。共通の列でレコードを照合し、追加のデータ列を返して既存の Sheets テーブルをエンリッチします。

{{< img src="/sheets/lookup.png" alt="リファレンステーブルから取得したユーザーの team メタデータを追加するルックアップの例" style="width:90%;" >}}

たとえば、ユーザーのメールアドレスを含む RUM データのテーブルがあり、これらのユーザーがどのチームに所属しているかを知りたいとします。この場合、そのテーブル内のユーザーのメールアドレスの列と、リファレンステーブル内の仕事用メールアドレスの列を比較するルックアップを追加できます。ルックアップは、リファレンステーブルからチームを取得し、新しい列としてスプレッドシートに追加します。

## ピボット {#pivot}

スプレッドシートにテーブルを追加した後、ピボットテーブルを使用して生データを分析し、コンテキストを追加します。ピボットテーブルを使用すると、大量のデータを要約して、カスタムテーブルに整理できます。これにより、データを分析してパターンや傾向を見つけ、比較を行うことができます。たとえば 100 行のテーブルがある場合、ピボットテーブルを使用すれば、そのデータをメソッドや地域ごとにカウントした要約テーブルにまとめることができます。ピボットテーブルを作成するには、次の手順を実行します。
1. すでにテーブルがあるスプレッドシートで、[{{< ui >}}Add Pivot Table{{< /ui >}}] (ピボットテーブルを追加) をクリックします。
1. [{{< ui >}}Rows{{< /ui >}}] (行) セクションと [{{< ui >}}Columns{{< /ui >}}] (列) セクションで、分析するディメンション (ログのステータスなど) を選択します。
1. [{{< ui >}}Calculations{{< /ui >}}] (計算) セクションで、計算に使用するディメンション (合計、平均、カウント、最小値、最大値など) を選択します。

{{< img src="/sheets/example_pivot_table.png" alt="ピボットテーブル構成パネルの例" style="width:90%;" >}}

### 可視化 {#visualizations}

ピボットテーブルを作成した後、[{{< ui >}}Show Graphs{{< /ui >}}] (グラフを表示) をクリックして、データをグラフ化するウィジェットを 6 つまで追加できます。サポートされているウィジェットタイプには、{{< ui >}}Top List{{< /ui >}} (トップリスト)、{{< ui >}}Treemap{{< /ui >}} (ツリーマップ)、{{< ui >}}Pie Chart{{< /ui >}} (円グラフ) があります。ウィジェットのタイトルにカーソルを合わせると、ウィジェットの削除、複製、展開、エクスポート、再配置を行えます。ウィジェットを編集するには、鉛筆アイコンをクリックします。編集オプションでは、ウィジェットタイプの選択、グラフ化するピボット計算の選択 (複数ある場合)、行、列、および行または列ごとにグラフ化するグループ数の指定が可能です。

## シート (プレビュー){#sheet-preview}

{{< callout url="https://www.datadoghq.com/product-preview/flexible-spreadsheets-in-datadog-sheets/">}}
柔軟なスプレッドシートを作成します。ゼロから開始する、モデルを構築する、運用状況を追跡するなど、さまざまな用途に対応しています。
{{< /callout >}}

シートは、まっさらな状態の柔軟なスプレッドシートで、完全な数式エンジンを備えています。シートを使用すると、財務モデル、運用トラッカー、計画テンプレート、またはクエリベースのワークフローに適合しない自由形式の計算を作成できます。

シートを追加するには、スプレッドシートの下部にある [{{< ui >}}\+{{< /ui >}}] タブをクリックし、[{{< ui >}}Add Sheet{{< /ui >}}] (シートを追加) を選択します。

{{< img src="/sheets/flexible_spreadsheet.png" alt="2025 年のプロバイダーモデル別クラウド支出を示す柔軟なシート。数式の SUMIFS および VLOOKUP で Cloud Cost テーブルと Currency conversion テーブルのタブを参照しています。" style="width:90%;" >}}

### セル参照 {#cell-references}

セルは標準の A1 表記を使用して参照されます。列は文字、行は数字で表されます。たとえば、`A1` は最初のセル、`B3` は B 列の 3 行目、`A1:C5` は A 列から C 列、1 行目から 5 行目にわたる範囲です。

| 参照タイプ | 構文 | 説明 |
| -------------- | ------ | ----------- |
| 相対セル | `A1` | 数式を別のセルにコピーすると調整されます |
| 絶対セル | `$A$1` | 常に同じセルを参照します |
| 絶対列、相対行 | `$A1` | 列は固定され、行は調整されます |
| 相対列、絶対行 | `A$1` | 行は固定され、列は調整されます |
| 範囲 | `A1:C5` | A1 から C5 までのすべてのセル |

### シート間参照 {#cross-sheet-references}

同じスプレッドシート内の他のタブにあるデータを、数式で直接参照できます。シート名の後に感嘆符を付け、その後にセルまたは範囲を指定します。

```
='My Table'!A1
='Summary'!B2:B20
```

**テーブル**タブの特定の列を名前で参照するには、`#` 記法を使用します。

```
='Error Logs'#"duration_ms"
='Table 1'#"status"
```

たとえば `=SUM('Error Logs'#"duration_ms")` は、Error Logs テーブルの `duration_ms` 列にあるすべての値を合計します。

### 数式 {#formulas}

シートの数式は、[関数と演算子][3]ページに記載されているすべての関数に加え、シートでのみ利用可能なルックアップ、統計、財務、その他の関数を追加でサポートしています。全リストについては、[シート関数][21]セクションを参照してください。

#### 例 {#examples}

**シート内のテーブル列の集計**

“Error Logs”というテーブルタブの `duration_ms` 列にあるすべての値を合計します。

```
=SUM('Error Logs'#"duration_ms")
```

そのテーブルで `status = "error"` を持つ行の数をカウントします。

```
=COUNTIF('Error Logs'#"status","error")
```

**フォールバックを使用した安全なルックアップ**

リファレンステーブルからユーザーのチームをルックアップし、見つからない場合は“unknown”を返します。

```
=IFNA(VLOOKUP(A2,'User Directory'!A:B,2,0),"unknown")
```

**インシデント発生からの日数**

A2 のタイムスタンプに基づいて、インシデントが開かれてからどれくらい経過したかを計算します。

```
=DATEDIF(A2,TODAY(),"D")&" days ago"
```

**テーブルからの p95 レイテンシー**

接続されたテーブルから応答時間の 95 パーセンタイルを取得します。

```
=PERCENTILE('APM Data'#"duration",0.95)
```

**値を重大度レベルに分類**

```
=IFS(A2>500,"critical",A2>200,"warn",A2>0,"ok",TRUE,"no data")
```

**月々のローン返済額**

年利が 6% で返済期間が 3 年の 50,000 ドルのローンについて月々の支払額を計算します。

```
=PMT(0.06/12,36,-50000)
```

### エラー値 {#error-values}

| <span style="min-width:80px;display:block">エラー</span> | 原因| 対処方法 |
| -------------------- | ----- | ------------- |
| `#DIV/0!` | 0 による除算| `=IFERROR(A1/B1,0)` |
| `#VALUE!` | 引数の型が正しくない (数学関数にテキストが渡された場合など) | 入力の型を確認する |
| `#NUM!` | 無効な数値。例: `SQRT(-1)` | `IF` | で入力を検証する
| `#N/A` | 値が見つからない (失敗した `VLOOKUP` | `=IFNA(VLOOKUP(...),"not found")` | など)
| `#REF!` | 存在しなくなったセルへの参照 | 数式を更新する |
| `#NAME?` | 認識できない関数名 | スペルを確認する |
| `#ERROR!` | 数式をパースできない | 構文を確認する |

### セルのフォーマット {#cell-formatting}

セルは、プレーンテキスト、数値、パーセンテージ、通貨 (USD または EUR)、または日時にフォーマットできます。フォーマットは値の表示方法に影響しますが、計算に使用される基の値には影響しません。

### 制限事項 {#limits}

シートには、行数と列数に関して以下の制限があります。

| ディメンション | デフォルト | 最大値 |
| --------- | ------- | ------- |
| 行 | 1,000 | 2,000 |
| 列 | 26 | 52 |

## サポートされているデータソース {#supported-data-sources}

{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="高度なデータソース">}}
まだ利用できないデータソースをクエリしたい場合は、このフォームを使用してリクエストを送信してください。
{{< /callout >}}

以下のデータソースから取得したデータでテーブルを作成し、分析を行うことができます。

| データソース          | 製品ページ       |
| -------------------- | -----------        |
| APM スパン            | [APM Explorer][18] |
| Audit Trail          | [Audit Trail][15] |
| CI パイプライン         | [CI Visibility][17] |
| Cloud Cost           | [Cloud Cost Analytics][5] |
| データベースクエリ     | [Database Monitoring][16] |
| イベント               | [Event Management][14] |
| インフラストラクチャー       | [Host List][6] |
| Agent Observability    | [Agent Observability][13] |
| ログ                 | [Logs Explorer][2] |
| メトリクス              | [Metrics Explorer][7] |
| Product Analytics    | [Product Analytics Events][20] |
| Real User Monitoring | [RUM Explorer][8]  |
| リファレンステーブル     | [Reference Tables][9] |
| セキュリティ所見    | [Cloud Security][12] |
| セキュリティシグナル     | [Security][11] |

## スプレッドシートの構成 {#configuring-a-spreadsheet}

### 権限 {#permissions}

デフォルトでは、すべてのユーザーがスプレッドシートにフルアクセスできます。

きめ細かいアクセス制御を使用して、特定のスプレッドシートを編集できる[ロール][10]を制限することができます。
1. スプレッドシートの表示中に、右上の歯車アイコンをクリックします。設定メニューが開きます。
1. [{{< ui >}}Permissions{{< /ui >}}] (権限) を選択します。
1. [{{< ui >}}Restrict Access{{< /ui >}}] (アクセス制限) をクリックします。ダイアログボックスが更新され、組織のメンバーはデフォルトで [{{< ui >}}Viewer{{< /ui >}}] (閲覧者) アクセス権を付与されていることが表示されます。
1. ドロップダウンを使用して、スプレッドシートを編集できる 1 つまたは複数のロール、チーム、ユーザーを選択します。
2. [{{< ui >}}Add{{< /ui >}}] (追加) をクリックします。ダイアログボックスが更新され、選択したロールに [{{< ui >}}Editor{{< /ui >}}] (編集者) 権限があることが表示されます。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

**注:** 自分の編集権限を保持するため、保存前に必ず自分が所属するロールを少なくとも 1 つ追加してください。

制限されたスプレッドシートへの全体アクセスを復元するには、編集権限が必要です。以下のステップを完了します。
1. スプレッドシートの表示中に、右上の歯車アイコンをクリックします。設定メニューが開きます。
1. [{{< ui >}}Permissions{{< /ui >}}] (権限) を選択します。
1. [{{< ui >}}Restore Full Access{{< /ui >}}] (フルアクセスを回復) をクリックします。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/sheets
[2]: https://app.datadoghq.com/logs
[3]: /ja/sheets/functions_operators
[4]: https://docs.datadoghq.com/ja/integrations/guide/reference-tables/?tab=manualupload
[5]: https://app.datadoghq.com/cost
[6]: https://app.datadoghq.com/infrastructure/
[7]: https://app.datadoghq.com/metric/explorer
[8]: https://app.datadoghq.com/rum/sessions
[9]: https://app.datadoghq.com/reference-tables
[10]: /ja/account_management/rbac/
[11]: https://app.datadoghq.com/security
[12]: https://app.datadoghq.com/security/compliance
[13]: https://app.datadoghq.com/llm/applications
[14]: https://app.datadoghq.com/event/explorer
[15]: https://app.datadoghq.com/audit-trail
[16]: https://app.datadoghq.com/databases/queries
[17]: https://app.datadoghq.com/ci/pipelines
[18]: https://app.datadoghq.com/apm/traces
[19]: https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/
[20]: https://app.datadoghq.com/product-analytics/events
[21]: /ja/sheets/functions_operators#functions