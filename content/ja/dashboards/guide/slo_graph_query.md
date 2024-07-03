---
disable_toc: false
further_reading:
- link: /dashboards/widgets/slo/
  tag: Documentation
  text: SLO Widget
title: Scope metric-based SLO queries
---

<div class="alert alert-info">この機能は、<strong>メトリクスベース</strong>の SLO クエリでのみ使用できます。</div>

## 概要

The [SLO widget][1] supports advanced metric query filtering, including the use of template variables to dynamically scope results displayed. 

## SLO クエリの説明

### メトリクスベース SLO クエリ
まず、[メトリクスベースの SLO][2] を作成します。この例では、APM のトレースメトリクスを使用して、`web-store` という例のサービスの可用性を測定しています。

##### 良好イベント (分子)
`sum:trace.rack.request.hits{service:web-store} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store} by {resource_name}.as_count()`

##### 総イベント (分母)
`sum:trace.rack.request.hits{service:web-store} by {resource_name}.as_count()`

{{< img src="service_management/service_level_objectives/slo_graph_query/trace_metrics_slo.png" alt="SLO configuration showing example trace metrics" style="width:100%;" >}}

### SLO widget

Select the SLO in the [SLO widget editor][1]. You can apply additional filters in the widget configuration to further scope the results displayed. This does not modify the original definition of the SLO. In the example, we add the `$env` and `$availability-zone` tags to the **filter by** field of the widget. 

{{< img src="service_management/service_level_objectives/slo_graph_query/slo_filter_by.png" alt="SLO Summary editor with dynamic tags for $env and $availability-zone" style="width:100%;" >}}

この構成で、[Dashboard テンプレート変数][3]を `env:prod` と `availability-zone:northcentralus` に変更するとどうなりますか？

The SLO widget filters the SLO metric queries by those additional tags for your visualization purposes:

##### 良好イベント (分子)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()`

##### 総イベント (分母)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()`

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/widgets/slo/
[2]: /ja/service_management/service_level_objectives/metric/
[3]: /ja/dashboards/template_variables/