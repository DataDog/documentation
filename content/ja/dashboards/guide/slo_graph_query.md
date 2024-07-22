---
disable_toc: false
further_reading:
- link: /dashboards/widgets/slo/
  tag: Documentation
  text: SLO サマリーウィジェット
title: メトリクスベースの SLO クエリをスコープする
---

<div class="alert alert-info">この機能は、<strong>メトリクスベース</strong>の SLO クエリでのみ使用できます。</div>

## 概要

[SLO サマリーウィジェット][1]は、テンプレート変数を使用して表示される結果を動的に範囲指定するなど、高度なメトリクスクエリフィルタリングをサポートしています。

## SLO クエリの説明

### メトリクスベース SLO クエリ
まず、[メトリクスベースの SLO][2] を作成します。この例では、APM のトレースメトリクスを使用して、`web-store` という例のサービスの可用性を測定しています。

##### 良好イベント (分子)
`sum:trace.rack.request.hits{service:web-store} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store} by {resource_name}.as_count()`

##### 総イベント (分母)
`sum:trace.rack.request.hits{service:web-store} by {resource_name}.as_count()`

{{< img src="service_management/service_level_objectives/slo_graph_query/trace_metrics_slo.png" alt="トレースメトリクスの例を示す SLO 構成" style="width:100%;" >}}

### SLO サマリーウィジェット

[SLO サマリーウィジェットエディター][1]で SLO を選択します。ウィジェット構成で追加のフィルターを適用して、表示される結果の範囲をさらに広げることができます。これにより、SLO の元の定義が変更されることはありません。この例では、ウィジェットの **filter by** フィールドに `$env` と `$availability-zone` タグを追加しています。

{{< img src="service_management/service_level_objectives/slo_graph_query/slo_filter_by.png" alt="$env と $availability-zone のダイナミックタグがある SLO サマリーエディター" style="width:100%;" >}}

この構成で、[Dashboard テンプレート変数][3]を `env:prod` と `availability-zone:northcentralus` に変更するとどうなりますか？

SLO サマリーウィジェットは、視覚化を目的に SLO メトリクスクエリをこれらの追加タグでフィルターします。

##### 良好イベント (分子)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()`

##### 総イベント (分母)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()`

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/widgets/slo/
[2]: /ja/service_management/service_level_objectives/metric/
[3]: /ja/dashboards/template_variables/