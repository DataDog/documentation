---
aliases:
- /ja/graphing/faq/how-can-i-graph-the-percentage-change-between-an-earlier-value-and-a-current-value
kind: faq
title: 以前の値から現在の値への変化率をグラフ化するにはどうすればいいですか？
---

メトリクスの値が過去のある期間と比べてどの程度変化したかを視覚化したい場合は、[タイムシフト関数][1]を利用します。1 時間前、1 日前、1 週間前、1 か月前のメトリクスの値をキャプチャすることができます。

変化率を計算するには、次のようなクエリを作成します。

```text
((current_value - old_value) / old_value) * 100
```

次の例では、1 日前から現在までのシステムメトリクスの変化率を見ることができます。

{{< img src="dashboards/faq/percentage_timeshift.png" alt="percentage timeshift" >}}

[1]: /ja/dashboards/functions/timeshift/