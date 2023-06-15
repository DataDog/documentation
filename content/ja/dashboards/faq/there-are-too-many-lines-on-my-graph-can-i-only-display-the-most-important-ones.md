---
aliases:
- /ja/graphing/faq/there-are-too-many-lines-on-my-graph-can-i-only-display-the-most-important-ones
kind: faq
title: グラフの線が多すぎるのですが、最も重要なものだけを表示することはできますか？
---

## 問題

グループ化されたクエリを使用すると、グラフに表示される線が多すぎて、読むのが面倒になることがあります。例:

{{< img src="dashboards/faq/too_many_metrics_1.png" alt="too_many_metrics_1" >}}

... ここで、負荷の高い値を持つホストにのみ注目する必要があります。

## ソリューション

上の関数は、グラフ上の関連する数本の線だけを表示するのに適しています。

{{< img src="dashboards/faq/too_many_metrics_2.png" alt="too_many_metrics_2" >}}

 詳細については、[トップ関数に関するドキュメント][1]を参照してください。

[1]: /ja/dashboards/functions/rank/