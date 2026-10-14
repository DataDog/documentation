---
aliases:
- /ja/cloudprem/operate/search_logs/
description: Datadog で BYOC Logs データを検索および分析する方法を学びます。
further_reading:
- link: /byoc-logs/ingest/
  tag: ドキュメント
  text: BYOC Logs にログを取り込みます。
- link: /byoc-logs/operate/troubleshooting/
  tag: ドキュメント
  text: BYOC Logs のトラブルシューティング
- link: /logs/explorer/search_syntax/
  tag: ドキュメント
  text: ログ検索構文
title: BYOC Logs を検索する
---
## Logs Explorer で BYOC Logs を探索する {#explore-byoc-logs-in-the-logs-explorer}

1. [Datadog Log Explorer][1] に移動します。
2. 左側のファセットパネルの {{< ui >}}BYOC INDEXES{{< /ui >}} で、検索するインデックスを 1 つ以上選択します。

特定のインデックスを選択して検索を絞り込むか、クラスター内のすべてのインデックスを選択してそれらを横断的に検索できます。

BYOC (Bring Your Own Cloud) Logs のインデックス名は、次の形式に従います。

```
byoc--<CLUSTER_NAME>--<INDEX_NAME>
```

## BYOC Logs クラスター全体を検索する {#search-across-byoc-logs-clusters}

Log Explorer または public Logs API を使用して、1 つのクエリで複数の BYOC Logs クラスターを検索します。選択したクラスターからの結果が結合されます。

### Log Explorer を使用する {#use-log-explorer}

[Log Explorer][1] の検索バーで、各クラスター名の前に `byoc--` を付けます。`index:` の後に、`OR` で区切ったクラスター名を括弧で囲んでグループ化します。例:

```text
index:(byoc--cluster-1 OR byoc--cluster-2)
```

`cluster-1` と `cluster-2` を、お使いの BYOC Logs クラスター名に置き換えます。

### Logs API を使用する {#use-the-logs-api}

[ログ検索エンドポイント][2] (`POST /api/v2/logs/events/search`) にリクエストを送信します。`filter.query` を、複数の BYOC Logs クラスターを指定するクエリに設定します。例:

```json
{
  "filter": {
    "from": "now-15m",
    "to": "now",
    "query": "index:(byoc--cluster-1 OR byoc--cluster-2)"
  }
}
```

## 検索の制限事項 {#search-limitations}

BYOC Logs のインデックスを、他の Datadog ログインデックスと同時にクエリすることはできません。さらに、Flex Logs は BYOC Logs ではサポートされていません。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /ja/api/latest/logs/#search-logs