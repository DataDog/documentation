---
further_reading:
- link: /continuous_integration/search/
  tag: ドキュメント
  text: パイプラインを検索する
- link: /continuous_integration/explorer/saved_views
  tag: ドキュメント
  text: 保存ビューについて
- link: /monitors/types/ci
  tag: ドキュメント
  text: CI Pipeline Monitors について
title: パイプライン実行のエクスポート
---

## 概要

CI Visibility 検索クエリと視覚化したグラフをダッシュボード、モニター、ノートブックで使用したり、[Search Pipeline Events エンドポイント][1]を使用してプログラムでイベントを検索することができます。

## 検索クエリまたは視覚化をエクスポートする

[CI Visibility Explorer][2] で集計した検索クエリや視覚化したグラフをコピー、エクスポート、ダウンロードすることが可能です。

{{< img src="continuous_integration/explorer/pipeline_export.png" alt="CI Visibility Explorer でパイプラインビューをエクスポート" style="width:100%;">}}

右側の **Export** ボタンをクリックし、ドロップダウンメニューからオプションを選択します。

- [CI Visibility Explorer][3] の[保存ビュー][7]を共有することができます。
- 事前に設定したしきい値でアラートをトリガーする [CI Pipeline モニター][5]に検索結果をエクスポートすることができます。
- 検索結果を[既存のノートブック][6]にエクスポートして、レポートや統合の目的に利用できます。
- 個々の CI Visibility テストまたはパイプラインイベント、および特定の集計の検索結果を CSV ファイルとしてダウンロードします。

ある視覚化タイプで利用可能なオプションは、他のタイプではサポートされていません。例えば、分布グラフを CSV ファイルにダウンロードすることはできません。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/ci-visibility-pipelines/#search-pipelines-events
[2]: https://app.datadoghq.com/ci/pipeline-executions
[3]: /ja/continuous_integration/explorer/
[4]: /ja/api/latest/
[5]: /ja/monitors/types/ci/
[6]: /ja/notebooks/
[7]: /ja/continuous_integration/explorer/saved_views/