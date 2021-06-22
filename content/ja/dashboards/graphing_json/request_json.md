---
title: リクエスト JSON スキーマ
kind: documentation
aliases:
  - /ja/graphing/graphing_json/request_json/
further_reading:
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
  - link: /dashboards/graphing_json/widget_json/
    tag: ドキュメント
    text: ウィジェット JSON スキーマ
---
`REQUEST_SCHEMA` の一般的な書式は、1 つ以上の `request` の配列です。

```text
"requests": [
  {
    "q": "function(aggregation method:metric{scope} [by {group}])"
  }
]
```

`requests` パラメーターが複数の `request` を持っている場合、ウィジェットはそれらをすべて表示します。

```text
"requests": [
  {
    "q": "<メトリクス_1>{<スコープ_1>}"
  },
  {
    "apm_query": "<メトリクス_2>{<スコープ_2>}"
  },
  {
    "log_query": "<メトリクス_3>{<スコープ_3>}"
  }
]
```

{{< img src="dashboards/graphing_json/multi-lines.png" alt="複数行"  >}}

## 関数

各クエリの結果に関数を適用できます。

関数の詳細については、[使用例のページ][1]を参照してください。

#### 集計の方法

利用可能なデータポイントの数は、画面に表示できる最大数よりも多い場合がほとんどです。そのため、average、max、min、sum の 4 つのメソッドのうち 1 つを使用して、データを集計します。

#### メトリクス

メトリクスはグラフの焦点です。利用可能なメトリクスのリストは、[メトリクスサマリー][2]に掲載されています。任意のメトリクスをクリックすると、収集されるデータの型、単位、タグ、ホストなどの詳細が表示されます。

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
    {"q": "system.load.5{intake} * 2"},
    {"q": "system.load.5{intake}"}
  ]
}
```

系列の加減乗除も可能です。Datadog は、この時点では整合性を強制しません。したがって、リンゴをオレンジで割ることもできます。

```json
{"viz": "timeseries", "requests": [{"q": "metric{apples} / metric{oranges}"}]}
```

## 積み上げ系列

{{< img src="dashboards/graphing_json/slice-n-stack.png" alt="スライスアンドスタック"  >}}

関連する時系列どうしの場合は、次の構文を使用して積み上げ面グラフとして描画できます。

```text
"requests": [
  {
    "q": "metric1{scope}, metric2{scope}, metric3{scope}"
  }
]
```

チャートごとに 1 つのクエリではなく、すべてのクエリを 1 つにまとめたり、クエリを連結することができます。

## スライスアンドスタック

ホスト間に共通するメトリクスの結果を積み上げて表示することができます。たとえば、複数のホストに適用されるタグを選択すると、その送受信トラフィックをきれいに積み上げて、合計と共にホストごとの明細を表示できます。ネットワークトラフィックの分布が大きく変動する箇所を見つける際に役立ちます。

それには、任意のメトリクスに対して以下のように指定します。

```text
"requests" [
  {
    "q": "system.net.bytes_rcvd{some_tag, device:eth0} by {host}"
  }
]
```

この場合は 1 つのクエリしか持てません。ただし、デバイスまたはホストとデバイスの組み合わせで分割することもできます。

```text
"requests" [
  {
    "q": "system.net.bytes_rcvd{some_tag} by {host,device}"
  }
]
```

すべてのタグ付きホストのトラフィックを取得するには、ホストとネットワークデバイスで分割します。

#### 例

以下に、パラメーターとして 1 つだけメトリクスを受け取る `rate()` 関数の例を示します。`top()` と `top_offset()` 以外の他の関数の構文も同じです。

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "rate(sum:system.load.5{role:intake-backend2} by {host})",
      "stacked": false
    }
  ]
}
```

以下に、`top()` 関数を使用する例を示します。

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "top(avg:system.cpu.iowait{*} by {host}, 5, 'max', 'desc')",
      "stacked": false
    }
  ]
}
```

これは、クエリウィンドウ内で `system.cpu.iowait` の最大値のトップ 5 系列をグラフ化して表示します。

たとえば、最大値が 6 位から 10 位のホストを表示するには、代わりに `top_offset` を使用します。

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "top_offset(avg:system.cpu.iowait{*} by {host}, 5, 'max', 'desc', 5)",
      "stacked": false
    }
  ]
}
```

以下に、`week_before()` 関数を使用する例を示します。

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "sum:haproxy.count_per_status{status:available} - week_before(sum:haproxy.count_per_status{status:available})"
    }
  ]
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/functions/
[2]: https://app.datadoghq.com/metric/summary