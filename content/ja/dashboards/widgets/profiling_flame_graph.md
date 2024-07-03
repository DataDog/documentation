---
aliases:
- /ja/video-categories/flamegraph/
description: Graph a breakdown of top consuming lines of code (CPU, Memory, ...)
further_reading:
- link: /profiler/profile_visualizations/
  tag: Documentation
  text: Learn about Profile visualizations
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
title: Profiling Flame Graph Widget
widget_type: flame_graph
---

## 概要

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph.png" alt="Profiling Flame Graph" >}}

The [profiling flame graph visualization][1] represents a breakdown of top consuming lines of code such as CPU and Memory. Add this widget to visualize stack traces of your profiled applications and accurately identify frequent resource requests. 

## セットアップ

 {{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_config.png" alt="Graph your data section in the profiling flame graph widget configuration" style="width:100%;" >}}

### 構成

1. Scope your profiling data with tags. For example, `host`, `container_name`, `service`, `env`, or `version`.
2. To select the resource click the dropdown menu next to **Show**. Options can include `CPU Time`, `Allocated Memory`, or `Thrown Exceptions`.
3. Click the dropdown menu next to **by** and **for** to select the frame granularity and code provenance, respectively.
4. グラフにタイトルを付けるか、提案されたタイトルを使用するにはボックスを空白のままにします。
5. **Save** をクリックします。

### オプション

#### Advanced options and filtering

Click the three dot ellipsis to open Advanced options to specify coloring and resolution.

フレームグラフをカスタマイズします。*Filter flame graph* フィールドにグラフアクションやフィルターを追加します。

#### Scope to endpoints

Filter on a specific endpoint, for total consumption (`per Minute by Endpoint`) or per request (`per Endpoint Call`).

#### Scope to functions

Filter on other criteria such as `Method`, `Package`, `Thread name` or `Trace Operation`.

#### グローバルタイム

ウィジェットにカスタムタイムフレームがあるか、ダッシュボードのグローバルタイムフレームがあるかを選択します。

## API

This widget can be used with the **[Dashboards API][2]**. See the [widget JSON schema definition][3].

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/profiler/profile_visualizations/#flame-graph
[2]: /ja/api/latest/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/