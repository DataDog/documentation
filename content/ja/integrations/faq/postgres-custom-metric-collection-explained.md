---
further_reading:
- link: /integrations/postgres/
  tag: Documentation
  text: Postgres インテグレーション
kind: faq
title: Postgres カスタムメトリクスの収集
---

Postgres インテグレーションでカスタムメトリクスを収集するには、[Agent の構成ディレクトリ][1]のルートにある `conf.d/postgres.d/conf.yaml` ファイルの `custom_queries` オプションを使用します。詳細については、サンプル [postgres.d/conf.yaml][2] を参照してください。

**注:** その他のテーブルへのクエリを必要とするカスタムメトリクスを生成する際は、Postgres ユーザーにそれらのテーブルへの `SELECT` 権限を付与する必要があります。例: `grant SELECT on <TABLE_NAME> to <USER>;`

## コンフィギュレーション

`custom_queries` には以下のオプションがあります:

| オプション        | 必須 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metric_prefix | 〇      | 各メトリクスは選択したプレフィックスで始まります。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| クエリ         | 〇      | 実行する SQL です。簡単なステートメントにすることも、複数行のスクリプトにすることもできます。結果のすべての行が評価されます。複数行のスクリプトが必要な場合は、パイプを使用します。                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 列       | 〇      | 列を表すリストです。左から右へ順に並べられます。<br><br>次の 2 つの必須データがあります。<br> - **`name`**: サフィックスとして metric_prefix に付加され、完全な名前を形成します。`type` が `tag` と指定されている場合、この列は、このクエリによって収集されるすべてのメトリクスにタグとして適用されます。<br> - **`type`**: 送信方法 (`gauge`、`count`、`rate` など)。`tag` と設定し、この列のアイテムの名前と値 (`<name>:<row_value>`) で行の各メトリクスにタグ付けすることができます。 |
| タグ          | ✕       | 各メトリクスに適用する静的タグのリスト。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### 注

- 定義済みの `columns` のうち最低 1 つは、メトリクスタイプ (`gauge`、`count`、`rate` など) である必要があります。
- `columns` 内の定義済みアイテム数は、クエリで返される列数と同じである必要があります。
- `columns` のアイテムが定義される順番は、クエリで返される順番と同じである必要があります。

  ```yaml
  custom_queries:
    - query: Select F3, F2, F1 from Table;
      columns:
        - {name: f3_metric_alias, type: gauge}
        - {name: f2_tagkey      , type: tag  }
        - {name: f1_metric_alias, type: count}
      [...]
  ```


## 例

### データベースとテーブル

以下に示すのは、`testdb` データベースの `company` テーブルです。テーブルには 3 件の従業員レコードが含まれています。

```text
testdb=# SELECT * FROM company;

id| name  | age| address    |salary | entry_date | last_raise_time
-------------------------------------------------------------------
1 | Paul  | 32 | California | 20000 | 1457570000 | 1457570300
2 | Allen | 25 | Texas      | 30000 | 1457570060 | 1457570300
3 | Teddy | 23 | Norway     | 45000 | 1457570120 | 1457570300
```

### SQL クエリから YAML コンフィギュレーションへ

ここでは、Paul の年齢と給料をメトリクス値として、Paul の名前と住所をタグとして取得することが目標です。

SQL クエリ:

```text
SELECT age,salary,name,address FROM company WHERE name = 'Paul'
```

対応する YAML `custom_queries`  の構成

```yaml
custom_queries:
  - metric_prefix: postgresql
    query: SELECT age,salary,name,address FROM company WHERE name = 'Paul'
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: localisation
        type: tag
    tags:
      - query:custom
```

Postgres YAML ファイルを更新した後、[Datadog Agent を再起動][3]します。

### 検証

結果を確認するには、[メトリクスエクスプローラー][4] を使用してメトリクスを検索します。

{{< img src="integrations/faq/sql_metric_explorer.png" alt="SQL メトリクスエクスプローラー" >}}

### デバッグ作業

[Agent の status サブコマンドを実行][5]し、Checks セクションで `postgres` を探します。

```text
postgres
--------
  - instance #0 [ERROR]: 'Missing metric_prefix parameter in custom_queries'
  - Collected 0 metrics, 0 events & 0 service checks
```

また、[Agent のログ][6]でも有益な情報を確認できる場合があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[3]: /ja/agent/guide/agent-commands/#restart-the-agent
[4]: /ja/metrics/explorer/
[5]: /ja/agent/guide/agent-commands/#agent-status-and-information
[6]: /ja/agent/guide/agent-log-files/