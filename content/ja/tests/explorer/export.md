---
title: Export Test Runs 
kind: ドキュメント
further_reading:
- link: /tests/search/
  tag: ドキュメント
  text: Search for your tests
- link: /tests/explorer/saved_views/
  tag: ドキュメント
  text: 保存ビューについて
- link: /monitors/types/ci/
  tag: ドキュメント
  text: Learn about CI Test Monitors
---

## 概要

You can use your Test Visibility search query and visualization graphs in dashboards, monitors, and notebooks, or programmatically search for events using the [Search Tests Events endpoint][1]. 

## 検索クエリまたは視覚化をエクスポートする

You can copy, export, or download your aggregated search query and visualization graphs in the [Test Visibility Explorer][2].

{{< img src="continuous_integration/explorer/test_export.png" alt="Export your test runs view in the Test Visibility Explorer" style="width:100%;">}}

右側の **Export** ボタンをクリックし、ドロップダウンメニューからオプションを選択します。

- Share your [saved view][6] of the [Test Visibility Explorer][3].
- Export your search results to a [CI Test monitor][4] that triggers alerts on predefined thresholds.
- Export your search results to an [existing notebook][5] for reporting or consolidation purposes.
- Download your search results as a CSV file for individual CI Visibility test events and specific aggregations.

ある視覚化タイプで利用可能なオプションは、他のタイプではサポートされていません。例えば、分布グラフを CSV ファイルにダウンロードすることはできません。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/ci-visibility-tests/#search-tests-events
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /tests/explorer/
[4]: /monitors/types/ci/
[5]: /notebooks/
[6]: /tests/explorer/saved_views/