---
title: Tagging SQL Statements
---

このガイドでは、[Database Monitoring][1] を構成していることを前提にしています。

[Datadog Database Monitoring (DBM)][1] では、データベースホスト上で実行されている実行計画やクエリサンプルを表示することができます。このガイドでは、データベースクエリに SQL コメントとしてタグを追加する方法を説明します。

## はじめに

対応データベース
: Postgres、MySQL、SQL Server

サポート対象の Agent バージョン
: 7.36.1+

対応タグ形式
: [sqlcommenter][2]、[marginalia][3]


## 手動タグ挿入
SQL ステートメントの実行をサポートする任意のデータベース API を使用して、[sqlcommenter][2] または [marginalia][3] 形式でフォーマットされたタグでステートメントにコメントを追加します。

```sql
/*key='val'*/ SELECT * from FOO
```

Separate multiple tags with commas:
```sql
/*key1='val1',key2='val2'*/ SELECT * from FOO
```

完全な例:
```go
import (
    "database/sql"      
)

func main() {   
    db, err := sql.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }

    // key:val で SQL ステートメントをタグ付けします
    rows, err := db.Query("/*key='val'*/ SELECT * from FOO")
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()
}
```

## DBM でタグを探る

On the [Samples page][4], filter the **Explain Plans** and **Query Samples** views by custom tag.

{{< img src="database_monitoring/dbm_filter_explain_plans_by_custom_tag.png" alt="カスタムタグで実行計画をフィルターします。">}}

また、タグでフィルターした実行計画コストの時系列を表示することもできます。

{{< img src="database_monitoring/dbm_timeseries_by_custom_tag.png" alt="カスタムタグによる実行計画コスト。">}}

クエリを選択すると、カスタムタグは **Sample Details** ページの Propagated Tags に表示されます。

{{< img src="database_monitoring/dbm_explain_plan_with_custom_tags.png" alt="実行計画のカスタムタグを表示します。">}}

[1]: /ja/database_monitoring/#getting-started
[2]: https://google.github.io/sqlcommenter
[3]: https://github.com/basecamp/marginalia
[4]: https://app.datadoghq.com/databases/samples