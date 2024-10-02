---
aliases:
- /ja/dashboards/ddsql_editor/
- /ja/ddsql_editor/reference/
further_reading:
- link: /ddsql_editor/reference
  tag: ドキュメント
  text: DDSQL クエリのリファレンス
- link: /ddsql_editor/guide/ddsql_use_cases
  tag: ガイド
  text: 一般的なクエリと使用例
title: DDSQL エディター
---


{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL Editor は非公開ベータ版です。
{{< /callout >}}

## 概要

[DDSQL エディタ][1]を使用すると、自然言語やタグクエリに対応した SQL の一種である [DDSQL](#use-sql-syntax-ddsql) を使ってリソースをクエリし、インフラストラクチャーをより深く可視化できます。

{{< img src="ddsql_editor/query-result.png" alt="Datadog の DDSQL ページに表示される SQL クエリの結果" style="width:100%;" >}}

## 自然言語でのクエリ

検索ボックスに質問を入力すると、Datadog があなたに代わって SQL クエリを構築します。

{{< img src="ddsql_editor/natural-language-query.png" alt="自然言語検索ボックスに入力されたクエリ" style="width:90%;" >}}

## SQL 構文を使用 (DDSQL)

DDSQL は Datadog データ用のクエリ言語です。`SELECT` などのいくつかの標準 SQL 操作を実装しており、[タグ][2]などの非構造化データに対するクエリを実行できます。独自の `SELECT` ステートメントを記述することで、必要なデータを正確に取得できます。タグを標準的なテーブルの列のようにクエリします。

{{< code-block lang="sql" >}}SELECT instance_type, count(instance_type)FROM aws_ec2_instanceWHERE env = 'staging' -- env は列ではなくタグですGROUP BY instance_type{{< /code-block >}}

{{< whatsnext desc="DDSQL クエリの詳細については、DDSQL リファレンスを参照してください。" >}}
    {{< nextlink href="ddsql_editor/reference/functions" >}}関数{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/data_types" >}}データ型{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/expressions_and_operators" >}}式および演算子{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/statements" >}}ステートメント{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/tags" >}}タグ{{< /nextlink >}}
{{< /whatsnext >}}

### インフラストラクチャデータの探索

スキーマサイドパネルでテーブルとフィールドのリストを表示し、フィルタリングします。

{{< img src="ddsql_editor/schema-explorer.png" alt="使用可能なテーブルのリスト" style="width:90%;" >}}

テーブル名をクリックすると、列とリレーションシップが表示されます：

{{< img src="ddsql_editor/table-details.png" alt="列とリレーションシップを含むテーブルの詳細" style="width:60%;" >}}

### クエリの保存と共有

便利なクエリを保存したり、データを CSV としてエクスポートできます。

{{< img src="ddsql_editor/save-or-export-result.png" alt="保存およびエクスポートアクションが表示されたクエリ結果" style="width:90%;" >}}

サイドパネルで保存されたクエリを参照し、再実行します。

{{< img src="ddsql_editor/saved-queries-panel.png" alt="保存されたクエリのリスト" style="width:60%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /ja/dashboards/ddsql_editor/reference/tags