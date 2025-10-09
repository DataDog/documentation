---
aliases:
- /ja/dashboards/ddsql_editor/getting_started/
title: DDSQL Editor の概要
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL はプレビュー版です。
{{< /callout >}}

## 概要

[DDSQL Editor][1] では、自然言語または SQL でクエリを作成できます。サポートされている SQL 式と使用方法の詳細は、[DDSQL リファレンス][2]を参照してください。UI の随所にサンプル クエリが表示されます。

{{< img src="ddsql_editor/query-ui-overview.png" alt="使用可能なテーブルのリスト" style="width:100%;" >}}

- 自然言語クエリを実行するには、検索バーに質問を入力するか、検索バー下に表示されるサンプル クエリのいずれかをクリックします。
- SQL クエリを実行するには、有効な DDSQL 式をページ上部のセクションに入力するか、**Queries to get you started** に掲載されているクエリ例のいずれかを実行します。

## クエリ実行フローの一例

ここでは、実行フローの一例を示しながら、DDSQL Editor の主な機能を紹介します。クエリ例がお使いのデータに適していない場合は、代わりに独自のクエリを使用できます。

### 1. 自然言語クエリを実行する

1. [DDSQL Editor][1] に移動します。
2. 自然言語プロンプトに、`Most common instance types` (最も一般的なインスタンス タイプ) と入力します。

結果として生成されるクエリは以下のようなものになります。

{{< code-block lang="sql" >}}
SELECT instance_type,
  COUNT(*) AS count
FROM host
GROUP BY instance_type
ORDER BY count DESC;
{{< /code-block >}}

### 2. スキーマ エクスプローラーを使用してクエリの SQL を修正する

どのフィールドに必要なデータが含まれているかわからない場合は、スキーマ エクスプローラーを使用して、使用可能なテーブル、その列、および他のテーブルとの関係を調べることができます。

1. 左側のサイド バーのデータベース アイコンをクリックし、スキーマ エクスプローラーを開きます。
    {{< img src="ddsql_editor/schema-explorer-example.png" alt="スキーマ エクスプローラーの使用可能なテーブルのリスト" style="width:100%;" >}}
1. 現在のクエリは `host` テーブルを対象としているので、**All Tables > Hosts > host** をクリックして、使用可能なフィールドを表示します。クエリに追加するフィールドを選びます。この例では `availability_zone` を使用します。
    {{< img src="ddsql_editor/schema-explorer-table-example.png" alt="スキーマ エクスプローラーに表示された host テーブル" style="width:50%;" >}}
1. クエリの SQL を編集して、結果に `availability_zone` を追加します。

{{< code-block lang="sql" >}}
SELECT instance_type, availability_zone,
  COUNT(*) AS count
FROM host
GROUP BY instance_type, availability_zone
ORDER BY count DESC;
{{< /code-block >}}

### 3. クエリにタグ ベースのフィルターを追加する

タグはテーブルの列のようにクエリできます。`WHERE` 節を追加し、本番環境のインスタンスのみをカウントします。

{{< code-block lang="sql" >}}
SELECT instance_type, availability_zone,
  COUNT(*) AS count
FROM host
WHERE #env = 'prod' -- タグ名の前に '#' を付けます
GROUP BY instance_type, availability_zone
ORDER BY count DESC;
{{< /code-block >}}

詳細は、[DDSQL でのタグのクエリ方法][3]を参照してください。

### 4. クエリを共有する

クエリの共有リンクを生成するには:

1. 歯車アイコンをクリックします。
1. **Copy Share Link** をクリックします。

### 5. クエリを保存して表示する

1. クエリのタイトルをダブル クリックして編集し、"Production instance types by availability zone" (可用性ゾーン別の本番インスタンス タイプ) に変更します。
1. **Save Query** をクリックします。
1. 左側のサイド バーのページ アイコンをクリックして **Saved Queries** パネルを開き、保存したクエリをリストから見つけます。

### 6. 最近のクエリで確認する

便利なクエリを保存し忘れても、**Recent Queries** ペインからアクセスできます。左側のサイド バーの時計アイコンをクリックすると、最近のクエリのリストが表示されます。

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /ja/ddsql_editor/#use-sql-syntax-ddsql
[3]: /ja/ddsql_reference/ddsql_preview/tags