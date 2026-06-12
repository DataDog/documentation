---
aliases:
- /ja/agent/faq/how-is-the-system-mem-used-metric-calculated/
further_reading:
- link: /metrics/
  tag: ドキュメント
  text: メトリクスについて
title: '''system.mem.used'' メトリクスの計算'
---

Datadog が `system.mem.used` メトリクスを計算する方法は、一般的なシステムリソース報告ツールによって表示されるものとは異なる値を生成する場合があります。

例えば、Ubuntu マシンで 'free -m' を実行すると、次のメモリ内訳が表示される場合があります (値はメガバイトを表します)。

|        |      |       |        |        |           |
| :---   | :--- | :---  | :---   | :---   | :---      |
| 合計  | 使用済み | 空き  | 共有 | キャッシュ | 利用可能 |
| 128831 | 1203 | 71975 | 4089   | 55653  | 122380    |

同じマシンで実行されている Datadog Agent は、`system.mem.used` メトリクスを 56856 MB と報告します。これは、'free -m' の使用済みメモリ値である 1203 MB とは明らかに異なります。

この差異の理由は、Datadog がキャッシュされたメモリを使用済みメモリの計算式に含めているのに対し、'free -m' は含めていないためです。

Datadog は使用済みメモリを次のように計算します。

* system.mem.used(56856) = system.mem.total(128831) - system.mem.free(71975)

そして、Datadog の `system.mem.used` メトリクスにはキャッシュされたメモリが含まれているため、使用済みメモリからこのキャッシュされたメモリを差し引くと、次の値になります。

* system.mem.used(56856) - system.mem.cached(55653) = 1203

1203 MB—これは上記の例で 'free -m' によって報告された使用済みメモリ値と同じです。

**`system.mem.usable` メトリクスは、空きメモリとキャッシュされたメモリとバッファを表します** (Linux では可能な場合、/proc/meminfo の "MemAvailable" 属性を反映します) 。

{{< partial name="whats-next/whats-next.html" >}}