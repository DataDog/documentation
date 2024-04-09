---
further_reading:
- link: /ja/integrations/mongo/
  tag: ドキュメント
  text: MongoDB インテグレーションについて
kind: ガイド
title: MongoDB カスタムメトリクスを収集
---

## 概要

[MongoDB インテグレーション][8]でカスタムメトリクスを収集するには、[Agent の構成ディレクトリ][1]のルートにある `conf.d/mongo.d/conf.yaml` ファイルの `custom_queries` オプションを使用します。詳細については、サンプル [mongo.d/conf.yaml][2]を参照してください。

## 構成

`custom_queries` には以下のオプションがあります:

* **`metric_prefix`**: 各メトリクスは選択したプレフィックスで始まります。
* **`query`**: JSON オブジェクトとして実行する [Mongo runCommand][3] クエリです。**注**: Agent では `count`、`find`、`aggregates` クエリのみサポートされます。
* **`database`**: メトリクスの収集先となる MongoDB データベースです。
* **`fields`**: `count` クエリでは無視されます。各フィールドを表す順不同のリストです。未指定および欠落フィールドは無視します。各 `fields` には 3 つの必須データがあります:
  * `field_name`: データを取得するフィールドの名前。
  * `name`: 完全なメトリクス名を形成するために metric_prefix に付けるサフィックス。`type` が `tag` である場合、この列はタグとして扱われ、この特定のクエリによって収集されたすべてのメトリクスに適用されます。
  * `type`: 送信方法 (`gauge`、`count`、`rate` など)。これを `tag` に設定して、行の各メトリクスにこの列の項目の名前と値でタグ付けすることもできます。`count` タイプを使用して、同じタグを持つか、タグのない複数の行を返すクエリの集計を実行できます。
* **`tags`**: 各メトリクスに適用するタグのリスト（上記で指定）。
* **`count_type`**: `count` クエリに対してのみ、カウント結果を送信するメソッド（`gauge`、`count`、`rate` など）として機能します。非カウントクエリでは無視されます。

## 例

以下の例では、次の Mongo コレクション `user_collection` が使用されます。

```text
{ name: "foo", id: 12345, active: true, age:45, is_admin: true}
{ name: "bar", id: 67890, active: false, age:25, is_admin: true}
{ name: "foobar", id: 16273, active: true, age:35, is_admin: false}
```

クエリタイプを選択すると例が表示されます。

{{< tabs >}}
{{% tab "Count" %}}

特定の時点で何人のユーザーがアクティブかを監視するには、次のような [Mongo count コマンド][1]を実行します。

```text
db.runCommand( {count: user_collection, query: {active:true}})
```

`mongo.d/conf.yaml` ファイル内の次の `custom_queries` YAML コンフィギュレーションに対応するクエリ:

```yaml
custom_queries:
  - metric_prefix: mongo.users
    query: {"count": "user_collection", "query": {"active":"true"}}
    count_type: gauge
    tags:
      - user:active
```

これにより、`user:active` という 1 つのタグを持つ 1 つの `gauge` メトリクス `mongo.users` が発行されます。

**注**: 定義されている[メトリクスタイプ][2]は `gauge` です。

[1]: https://docs.mongodb.com/manual/reference/command/count/#dbcmd.count
[2]: /ja/metrics/types/
{{% /tab %}}
{{% tab "Find" %}}

ユーザーの平均年齢を監視するには、次のような [Mongo find コマンド][1]を実行します。

```text
db.runCommand( {find: user_collection, filter: {active:true} )
```

`mongo.d/conf.yaml` ファイル内の次の `custom_queries` YAML コンフィギュレーションに対応するクエリ:

```yaml
custom_queries:
  - metric_prefix: mongo.example2
    query: {"find": "user_collection", "filter": {"active":"true"}}
    fields:
      - field_name: name
        name: name
        type: tag
      - field_name: age
        name: user.age
        type: gauge

```

これにより、`name:foo` と `name:foobar` の 2 つのタグを持つ 1 つの `gauge` メトリクス `mongo.example2.user.age` が生成されます。

**注**: 定義されている[メトリクスタイプ][2]は `gauge` です。

[1]: https://docs.mongodb.com/manual/reference/command/find/#dbcmd.find
[2]: /ja/metrics/types/
{{% /tab %}}
{{% tab "Aggregate" %}}

管理者および非管理者ユーザーの平均年齢を監視するには、次のような [Mongo aggregate コマンド][1]を実行します:

```text
db.runCommand(
              {
                'aggregate': "user_collection",
                'pipeline': [
                  {"$match": {"active": "true"}},
                  {"$group": {"_id": "$is_admin", "age_avg": {"$avg": "$age"}}}
                ],
                'cursor': {}
              }
            )
```

`mongo.d/conf.yaml` ファイル内の次の `custom_queries` YAML コンフィギュレーションに対応するクエリ:

```yaml
custom_queries:
  - metric_prefix: mongo.example3
    query: {"aggregate": "user_collection","pipeline": [{"$match": {"active": "true"}},{"$group": {"_id": "$is_admin", "age_avg": {"$avg": "$age"}}}],"cursor": {}}
    fields:
      - field_name: age_avg
        name: user.age
        type: gauge
      - field_name: _id
        name: is_admin
        type: tag
    tags:
      - test:mongodb
```

これにより、`is_admin:true` と `is_admin:false` の 2 つのタグを持つ 1 つの `gauge` メトリクス `mongo.example3.user.age`（各タグのユーザーの平均年齢を表す）が生成されます。

[1]: https://docs.mongodb.com/manual/reference/command/aggregate/#dbcmd.aggregate
{{% /tab %}}
{{< /tabs >}}

**注**: Mongo YAML ファイルを更新した後、[Datadog Agentを再起動][4]します。

### 検証

結果を確認するには、[メトリクスエクスプローラー][5]を使用してメトリクスを検索します。

### デバッグ

[Agent のステータスサブコマンドを実行][7]し、Checks セクションで `mongo` を探します。さらに、[Agent のログ][7]から有用な情報が得られることもあります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: https://docs.mongodb.com/manual/reference/command
[4]: /ja/agent/guide/agent-commands/#restart-the-agent
[5]: /ja/metrics/explorer/
[6]: /ja/agent/guide/agent-commands/#agent-status-and-information
[7]: /ja/agent/guide/agent-log-files/
[8]: /ja/integrations/mongodb