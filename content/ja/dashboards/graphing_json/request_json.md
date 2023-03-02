---
aliases:
- /ja/graphing/graphing_json/request_json/
further_reading:
- link: /dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
- link: /dashboards/graphing_json/widget_json/
  tag: ドキュメント
  text: ウィジェット JSON スキーマ
kind: documentation
title: リクエスト JSON スキーマ
---

`REQUEST_SCHEMA` の一般的な書式は、1 つ以上の `request` の配列です。

```text

   "requests": [
        {
            "formulas": [
                {
                    "formula": "per_hour(query)"
                },
                {
                    "formula": "query1"
                },
                {
                    "formula": "query1 / 100"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query",
                    "query": "avg:system.load.5{*}"
                },
                {
                    "data_source": "logs",
                    "name": "query1",
                    "search": {
                        "query": "status:error"
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                }
            ]
```

## 関数

各クエリの結果に関数を適用できます。

関数の詳細については、[使用例][1]のページを参照してください。

#### 集計の方法

利用可能なデータポイントの数は、画面に表示できる最大数よりも多い場合がほとんどです。そのため、average、max、min、sum の 4 つのメソッドのうち 1 つを使用して、データを集計します。

#### メトリクス

メトリクス、ログ、トレースなどのデータソースはグラフの焦点です。利用可能なメトリクスのリストは、[メトリクスサマリー][2]に掲載されています。任意のメトリクスをクリックすると、収集されるデータの型、単位、タグ、ホストなどの詳細が表示されます。

## スコープ

スコープは系列のフィルタリングに使用されます。スコープには、ホスト、ホスト上のデバイス、または任意のタグになります。タグは、英数字、コロン、アンダースコア (`[a-zA-Z0-9:_]+`) のみを含むと仮定します。

スコープの例と意味

| スコープ                            | 意味                                    |
|----------------------------------|--------------------------------------------|
| `host:my_host`                   | 特定のホストに関連付けられます。                   |
| `host:my_host, device:my_device` | 特定のホストの特定のデバイスに関連付けられます。 |
| `source:my_source`               | 特定のソースに関連付けられます。                 |
| `my_tag`                         | タグに基づくホストのグループに関連付けられます。        |
| `my:tag`                         | 同上。                             |
| `*`                              | すべての項目に対応するワイルドカードです。                   |

#### グループ

どのようなメトリクスでも、複数のホストからデータが送られる可能性があります。通常は、これらすべてのホストから集計されたデータがタイムスロットごとに 1 つの値になります。このデータをタグに基づいて分割できます。ホストごとに分けられたデータポイントを入れるには、グループの {host} を使用します。

#### 算術演算

系列に簡単な算術演算 (+、-、*、/) を適用できます。

以下の例では、5 分間の負荷と、それを 2 倍にした値をグラフ化します。

```json
{
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "query1"
                },
                {
                    "formula": "2 * query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.load.5{*}"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ],
    "yaxis": {
        "scale": "linear",
        "min": "auto",
        "max": "auto",
        "include_zero": true,
        "label": ""
    },
    "markers": []
}
```

系列の加減乗除も可能です。**注**: Datadog は整合性を強制しないため、リンゴをオレンジで*割ることもできます*。

```json
{"viz": "timeseries", "requests": [{"q": "metric{apples} / metric{oranges}"}]}
```

## 例

{{< img src="dashboards/graphing_json/graph_example_for_json.png" alt="JSON を使用したグラフ化" style="width:75%;" >}}

上記の例の JSON は、特定のデバイスとホストで受信され、アカウントごとにグループ化されたネットワークバイトの「平均」を示しています。

```text
"requests": [
        {
            "formulas": [
                {
                    "formula": "query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.net.bytes_rcvd{device:eth0,host:dsg-demo-1} by {account}"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ]
```


{{< img src="dashboards/graphing_json/rate_example_for_json.png" alt="レートの例" style="width:75%;" >}}

これは、パラメーターとして単一のメトリクスのみを受け取る `rate() 関数を使用した例です。


```json
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "per_hour(query1)"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.load.5{*} by {host}"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ]
```

これは、トップリストと同じ例です。

```json
{
    "viz": "toplist",
    "requests": [
        {
            "formulas": [
                {
                    "limit": {
                        "count": 10,
                        "order": "desc"
                    },
                    "formula": "query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.load.5{role:db} by {host}",
                    "aggregator": "avg"
                }
            ],
            "response_format": "scalar",
            "conditional_formats": []
        }
    ]
}
```

`week_before()` タイムシフト関数を使用した例を次に示します。

```json
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "week_before(query1)"
                }
            ],
            "queries": [
                {
                    "data_source": "logs",
                    "name": "query1",
                    "search": {
                        "query": ""
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                }
            ],
            "response_format": "timeseries",
            "type": "line"
        }
    ]
```

これは、`error` ログと `info` ログの比率をグラフ化してから、タイムシフト関数を適用する方法を示す別の例です。

{{< img src="dashboards/graphing_json/advanced_graph_example_for_json.png" alt="比率の例" style="width:75%;" >}}

```json
{
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "query1 / query2",
                    "alias": "Ratio of Error to Info"
                },
                {
                    "formula": "week_before(query1 / query2)"
                }
            ],
            "queries": [
                {
                    "data_source": "logs",
                    "name": "query1",
                    "search": {
                        "query": "status:error"
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                },
                {
                    "data_source": "logs",
                    "name": "query2",
                    "search": {
                        "query": "status:info"
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ],
    "yaxis": {
        "scale": "linear",
        "min": "auto",
        "max": "auto",
        "include_zero": true,
        "label": ""
    },
    "markers": []
}
```


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/functions/
[2]: https://app.datadoghq.com/metric/summary