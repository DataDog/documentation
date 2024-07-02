---
title: Switching between the sum/min/max/avg aggregators doesn't change the value
aliases:
    - /graphing/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
    - /dashboards/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
further_reading:
    - link: "/metrics/introduction/#combining-time-series"
      tag: Documentation
      text: Space Aggregation
---

`sum`/`min`/`max`/`avg` アグリゲーターを使用する場合、1 つの系列内のポイントではなく、複数の系列を横断して見ています。そのため、クエリのスコープが最も細かいレベルまで設定されている場合、これらのアグリゲーターを切り替えても表示される値が変わらない可能性があります。

例えば、Web リクエストを `host` と `path` で分解し、それぞれの組み合わせで系列を取得する場合です。ある時刻のデータは次のようになります。

| メトリクス名  | タグ                      | 値 |
| ------------ | ------------------------- | ----- |
| web.requests | `host: a`、`path: /test1` | 5     |
| web.requests | `host: a`、`path: /test2` | 3     |
| web.requests | `host: b`、`path: /test1` | 2     |
| web.requests | `host: b`、`path: /test2` | 8     |

`host` でグループ化する場合、`host` ごとに 2 つの系列を組み合わせる必要があるため、集計方法ごとに異なる結果が得られます。

| クエリ                           | host: a | host: b |
| ------------------------------- | ------- | ------- |
| `sum:web.requests(*) by {host}` | 8       | 10      |
| `min:web.requests(*) by {host}` | 3       | 2       |
| `max:web.requests(*) by {host}` | 5       | 8       |
| `avg:web.requests(*) by {host}` | 4       | 5       |

この例で `host` **と** `path` でグループ化すると、このデータの最も細かいレベルである `sum`/`min`/`max`/`avg` が系列ごとに同じになる 4 つの系列が得られます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}
