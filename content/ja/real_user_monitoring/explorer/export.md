---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: イベント検索
- link: /dashboards
  tag: ドキュメント
  text: ダッシュボードについて
- link: /notebooks
  tag: ドキュメント
  text: ノートブックについて
- link: /monitors
  tag: ドキュメント
  text: モニターについて
kind: documentation
title: RUM イベントとグラフのエクスポート
---

## 概要

RUM クエリと視覚化したグラフをダッシュボード、モニター、ノートブックで使用したり、[Search RUM Events エンドポイント][1]を使用してプログラムでイベントを検索することができます。

## 検索クエリまたは視覚化をエクスポートする

[RUM エクスプローラー][2]で集計した検索クエリや視覚化したグラフをコピー、エクスポート、ダウンロードすることが可能です。

{{< img src="real_user_monitoring/explorer/export/rum-explorer-export-5.png" alt="RUM エクスプローラーの右端にあるエクスポートボタン" width="100%" >}}

右側の **More** ボタンをクリックし、ドロップダウンメニューからオプションを選択します。

- クエリを cURL コマンドとしてコピーし、[RUM エクスプローラー][3]でテストしたり、[Datadog API][4] を使用してカスタムレポートを構築したりすることができます。
- 事前に設定したしきい値でアラートをトリガーする[モニター][6]に検索結果をエクスポートすることができます。
- 検索結果を[既存のノートブック][7]にエクスポートして、レポートや統合の目的に利用できます。
- 検索結果を個々の RUM イベントや特定の集計の CSV ファイルとしてダウンロードすることができます。リスト付きの個々の RUM イベントは最大 5,000 件まで、時系列、トップリスト、表グラフは最大 500 件まで集計してエクスポートすることができます。
- 検索結果を使用して[新しいメトリクス][5]を生成することができます。生成したメトリクスは、メトリクスエクスプローラーで表示できます。

ある視覚化タイプで利用可能なオプションは、他のタイプではサポートされていません。例えば、分布グラフを CSV ファイルにダウンロードすることはできません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/latest/rum/#search-rum-events
[2]: https://app.datadoghq.com/rum/explorer
[3]: /ja/real_user_monitoring/explorer/
[4]: https://docs.datadoghq.com/ja/api/latest/rum/
[5]: /ja/metrics/explorer/
[6]: /ja/monitors/types/real_user_monitoring/
[7]: /ja/notebooks/