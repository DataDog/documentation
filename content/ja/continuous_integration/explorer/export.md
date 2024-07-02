---
title: Export Pipeline Executions 
further_reading:
- link: /continuous_integration/search/
  tag: Documentation
  text: Search for your pipelines
- link: /continuous_integration/explorer/saved_views
  tag: Documentation
  text: 保存ビューについて
- link: /monitors/types/ci
  tag: Documentation
  text: CI Pipeline Monitors について
---

## 概要

You can use your CI Visibility search query and visualization graphs in dashboards, monitors, and notebooks, or programmatically search for events using the [Search Pipeline Events endpoint][1]. 

## 検索クエリまたは視覚化をエクスポートする

You can copy, export, or download your aggregated search query and visualization graphs in the [CI Visibility Explorer][2].

{{< img src="continuous_integration/explorer/pipeline_export.png" alt="Export your pipelines view in the CI Visibility Explorer" style="width:100%;">}}

右側の **Export** ボタンをクリックし、ドロップダウンメニューからオプションを選択します。

- Share your [saved view][7] of the [CI Visibility Explorer][3].
- Export your search results to a [CI Pipeline monitor][5] that triggers alerts on predefined thresholds.
- Export your search results to an [existing notebook][6] for reporting or consolidation purposes.
- Download your search results as a CSV file for individual CI Visibility test or pipeline events and specific aggregations.

ある視覚化タイプで利用可能なオプションは、他のタイプではサポートされていません。例えば、分布グラフを CSV ファイルにダウンロードすることはできません。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/ci-visibility-pipelines/#search-pipelines-events
[2]: https://app.datadoghq.com/ci/pipeline-executions
[3]: /continuous_integration/explorer/
[4]: /api/latest/
[5]: /monitors/types/ci/
[6]: /notebooks/
[7]: /continuous_integration/explorer/saved_views/