---
title: How does weighted() work?
disable_toc: false
further_reading:
- link: /dashboards/functions/smoothing
  tag: Documentation
  text: Smoothing
---

すべてのメトリクスクエリには、標準的な評価順序があります (簡単な復習として、[クエリの構造][1]をご覧ください)。例えば、次のようなクエリは、次のように計算されます。
`sum:kubernetes.cpu.requests{*} by {kube_container_name}.rollup(avg, 10)`

1. 時間集計 — 10 秒ロールアップの時間間隔ごとに、各時系列 (一意のタグ値の組み合わせで定義) の値を時間で合計します。一意のタグ値の組み合わせの数は、このメトリクスで最も揮発性の高い/高粒度のタグ (例えば `container_id`) によって決定されます。
2. 次に、`kube_container_name` (空間集計) ごとに、すべての平均値の合計を 1 つの代表値として取得します。各 `kube_container_name` の平均値は、各ロールアップ間隔に存在する一意の `container_id` の数によって決まります。

このゲージメトリクスでは、`kube_container_name` で合計する際に、`weighted()` 関数が `container_id` タグの値の寿命の短さを考慮します。

#### 例
このクエリを以下の前提で考えてみます。<br>
`sum:kubernetes_state.pod.uptime{*} by {version}.rollup(avg, 10)`

- ゲージメトリクスの送信間隔は、10 秒に定義されています。
- データポイントは、時間にして 60 秒ごとにグラフ化されます。
- Kubernetes のポッドには、常時 2 つのバージョンが存在します。各バージョンにはアプリのラベルが貼られ、1 アプリにつき 1 バージョンしか存在しません。

60 秒間の生データは、以下と似ているかもしれません。

| 時間                 | 0s  |  10 秒 |  20 秒 |  30 秒 |  40 秒 |  50 秒 |
| ---                  | --  | ---  | ---  | ---  |  --- |  --- |
| `app:a`、`version:1`   | 12  | NAN  | NAN  | NAN  | NAN  | NAN  |
| `app:b`、`version:1`   | NAN | 12   | 12   | 12   | NAN  | NAN  |
| `app:c`、`version:1`   | NAN | NAN  | NAN  | NAN  | 12   | 12   |
| `app:d`、`version:2`   | 12  | NAN  | NAN  | NAN  | NAN  | NAN  |
| `app:e`、`version:2`   | NAN | 16   | 16   | 16   | NAN  | NAN  |
| `app:f`、`version:2`   | NAN | NAN  | NAN  | NAN  | 18   | 18   |


1. _時間集計 -- データのロールアップ_
時間集計では、`avg` (加重なし) または提案されている `weighted` 平均のどちらかのデータをロールアップしています。
| 時間集計   | .rollup(avg) | .weighted() 使用 |
| ----------------   | ------------ | ---------------- |
| `app:a`、`version:1` | 12           | 2.0              |
| `app:b`、`version:1` | 12           | 6.0              |
| `app:c`、`version:1` | 12           | 4.0              |
| `app:d`、`version:2` | 12           | 2.0              |
| `app:e`、`version:2` | 16           | 8.0              |
| `app:f`、`version:2` | 18           | 6.0              |

2. _空間集計_ 
最後に、メトリクスをバージョンごとに集計し、以下の最終的な値を得ます。
| バージョン別の空間集計 | .rollup(avg) | .weighted() 使用 |
| ------------------------   | ------------ | ---------------- |
| `version:1`                  | 36           | 12               |
| `version:2`                  | 46           | 16               |


`weighted()` 関数は、送信率に対して関数を重み付けすることで、短命なタグの矛盾した挙動を改善します

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/#anatomy-of-a-metric-query
