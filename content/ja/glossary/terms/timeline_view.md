---
core_product:
- continuous profiler
title: タイムラインビュー
---

<a href="/profiler/profile_visualizations/#timeline-view">タイムラインビュー</a>は、時間の分布を加えたフレームグラフに相当します。

各レーンは **スレッド** (Go アプリケーションの場合は **goroutine**) を表します。フレームグラフとは異なり、タイムラインビューでは次の操作が可能です:
- スパイクのあるメソッドを分離 する
- スレッド間の複雑な相互作用を調査する
- プロセスに影響を与えるランタイムアクティビティを把握する