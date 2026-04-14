---
further_reading:
- link: /tests/explorer/
  tag: ドキュメント
  text: テストの検索
- link: /tests/explorer/saved_views/
  tag: ドキュメント
  text: 保存ビューについて
- link: /monitors/types/ci/
  tag: ドキュメント
  text: Learn about CI Test Monitors
title: テスト実行のエクスポート
---

## 概要

Test Optimization 検索クエリと視覚化したグラフをダッシュボード、モニター、ノートブックで使用したり、[Search Tests Events エンドポイント][1] を使用してプログラムでイベントを検索することができます。

## 検索クエリまたは視覚化をエクスポートする

[Test Optimization Explorer][2] で集計した検索クエリや視覚化したグラフをコピー、エクスポート、ダウンロードすることが可能です。

{{< img src="/tests/explorer/export.png" text="Test Optimization でクエリしたテスト結果の一覧を CSV ファイルとしてダウンロード" style="width:100%" >}}

右側の **Export** ボタンをクリックし、ドロップダウンメニューからオプションを選択します。

- [Test Optimization Explorer][3] の [保存ビュー][6] を共有することができます。
- 事前に設定したしきい値でアラートをトリガーする [CI Test モニター][4] に検索結果をエクスポートすることができます。
- 検索結果を [既存のノートブック][5] にエクスポートして、レポート作成やデータ統合の目的で利用できます。
- 個々の CI Visibility テストイベントや特定の集計の検索結果を CSV ファイルとしてダウンロードできます。

ある視覚化タイプで利用可能なオプションは、他のタイプではサポートされていません。例えば、分布グラフを CSV ファイルにダウンロードすることはできません。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/ci-visibility-tests/#search-tests-events
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /ja/tests/explorer/
[4]: /ja/monitors/types/ci/
[5]: /ja/notebooks/
[6]: /ja/tests/explorer/saved_views/