---
further_reading:
- link: /sheets/functions_operators
  tag: ドキュメント
  text: Functions and Operators
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: ブログ
  text: Explore your data with Sheets, DDSQL Editor, and Notebooks for advanced analysis
    in Datadog
title: Sheets
---

## 概要

Sheets は、Datadog データを用いてスプレッドシートを作成できるツールで、技術的な専門知識を必要とせずに複雑な分析やレポート作成を行うことができます。これにより、チームは Datadog データ上で、ルックアップ、ピボットテーブル、計算など慣れ親しんだスプレッドシート機能を活用でき、データをエクスポートして陳腐化した他のツールを使用する必要がなくなります。

Sheets を使えば、ログ、RUM (Real User Monitoring)、およびクラウドコスト監視から取得したデータを、使い慣れたスプレッドシートインターフェイス内で操作・変換・分析することが可能です。

## テーブルを作成する

はじめに、Sheets から新規にクエリを作成するか、ログエクスプローラー、RUM エクスプローラー、またはメトリクスエクスプローラーからクエリを転送して、データのテーブルを作成します。

### Sheets で新しいテーブルを追加する

{{< img src="/sheets/create_table.png" alt="Sheets からテーブルを作成するためのモーダル。Logs クエリ (status:error) が表示されている様子" style="width:90%;" >}}

1. [Datadog Sheets ページ][1]で、**New Spreadsheet** をクリックします。
1. **Add Data** をクリックします。
1. Data source を選択し、フィルタリングパラメーターを追加してクエリの作成を開始します。
1. 表示したい列を選択し、結果として生成されるテーブルをプレビューします。
1. **Create Table** をクリックします。

### クエリをスプレッドシートに転送する

1. 対応製品 ([Log Explorer][2] など) のページで、分析したいデータのクエリを作成します。例えば、`status:error` を持つログのみをフィルタリングします。
1. **Open in Sheets** をクリックします。テーブルを作成できる製品ページのリストについては、[サポートされるデータソース](#supported-data-sources)セクションを参照してください。
1. **New Spreadsheet** を作成するか、このデータテーブルを **Existing Spreadsheet** (既存のスプレッドシート) に追加できます。
1. **Save and Open** をクリックします。

## 計算列

計算列を使用すると、数式を追加したり、ログメッセージをパースしたり、正規表現を抽出したり、ビジネスロジックをデータに付与したりできます。これらの計算列は、後で作成するピボットテーブルでも使用可能です。

テーブルの最も右側にある列ヘッダーから Plus アイコンをクリックし、**Add calculated column** を選択します。関数を入力すると、その構文と説明が表示されます。サポートされている関数の一覧については、[関数と演算子][3]を参照してください。

{{< img src="/sheets/calculated_columns.png" alt="Plus アイコンを使用して追加された計算列と、例としての IFS 関数の表示" style="width:90%;" >}}

## Lookup 機能

Lookup 機能を使用すると、既存のデータにさらなるコンテキストを追加できます。ページ上部で **Add Lookup** をクリックすると、別のテーブルやデータソース ([Reference Tables][4]、ログ、RUM データなど) から列を追加できます。Lookup は、Excel や Google Sheets の left join や vlookup のように、共通の列でレコードを照合し、既存の Sheets テーブルに追加の列データを付加します。

{{< img src="/sheets/lookup.png" alt="Lookup の例。Reference Table をソースとして、ユーザーのチームメタデータを追加する様子" style="width:90%;" >}}

例えば、RUM データのテーブルにユーザーのメールアドレスが含まれている場合、そのユーザーが所属するチームを知りたいとします。Lookup を追加して、テーブル内のユーザーメールアドレス列と Reference Table 内のワークメール列を比較します。Lookup は Reference Table からチーム情報を取得し、新たな列としてスプレッドシートに追加します。

## ピボットテーブル

スプレッドシートにテーブルを追加した後は、ピボットテーブルを使用して生データを分析し、コンテキストを付与できます。ピボットテーブルは、大量のデータを要約・整理してカスタマイズ可能なテーブルを生成するのに役立ちます。これにより、パターンやトレンドを見つけやすくなり、比較も容易になります。例えば、100 行あるテーブルがある場合、ピボットテーブルを使えば、そのデータをメソッドや地域別などで集計する要約テーブルに再構成できます。ピボットテーブルを作成するには
1. すでにテーブルデータがあるスプレッドシートから、**Add Pivot Table** をクリックします。
1. **Rows** および **Columns** セクションで、分析したい次元 (例えばログのステータス) を選択します。
1. **Calculations** セクションで、合計、平均、カウント、最小値、最大値などの計算に使用する次元を選択します。

{{< img src="/sheets/example_pivot_table.png" alt="ピボット テーブル構成パネルの例" style="width:90%;" >}}

### 視覚化

ピボット テーブルを作成したら、**Show Graphs** をクリックしてデータをグラフ化するウィジェットを最大 6 個まで追加できます。サポートされているウィジェットの種類には **Top List**、**Treemap**、**Pie Chart** ウィジェットがあります。ウィジェットのタイトルにカーソルを合わせると、ウィジェットの削除、複製、展開、エクスポート、および再配置を行えます。ウィジェットを編集するには、鉛筆アイコンをクリックします。編集オプションでは、Widget の種類を選択し、グラフ化するピボット計算 (複数ある場合) を選択し、行・列、および行または列ごとにグラフ化するグループ数を指定できます。

## サポートされるデータソース

以下のデータソースから取得したデータでテーブルを作成し、分析を行うことができます。

| Data Source          | 製品ページ       |
| -------------------- | -----------        | 
| クラウドコスト           | [Cloud Cost Analytics][5] |
| Infrastructure Data (プレビュー版) | [Infrastructure Data][6] |
| ログ                 | [Logs Explorer][2] |
| メトリクス              | [Metrics Explorer][7] |
| Real User Monitoring | [RUM Explorer][8]  |
| 参照テーブル     | [Reference Tables][9] |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/sheets
[2]: https://app.datadoghq.com/logs
[3]: /ja/sheets/functions_operators
[4]: https://docs.datadoghq.com/ja/integrations/guide/reference-tables/?tab=manualupload
[5]: https://app.datadoghq.com/cost
[6]: https://app.datadoghq.com/infrastructure
[7]: https://app.datadoghq.com/metric/explorer
[8]: https://app.datadoghq.com/rum/sessions
[9]: https://app.datadoghq.com/reference-tables