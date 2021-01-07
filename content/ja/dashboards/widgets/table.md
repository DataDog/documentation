---
title: テーブルウィジェット
kind: documentation
widget_type: query_table
aliases:
  - /ja/graphing/widgets/table/
further_reading:
  - link: /ja/dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /ja/dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /ja/dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
## 概要

テーブルを、タイムボードとスクリーンボードで可視化できます。タグキーでグループ化されたメトリクスの列が表示されます。たとえば、`system.cpu.system` と `system.cpu.user` が `service` でグループ化されます。

{{< img src="dashboards/widgets/table/table_widget.png" alt="テーブルウィジェット"  style="width:80%;">}}

## セットアップ

### コンフィギュレーション

* グラフを作成するデータを選択します (必要に応じて列を追加してください)。
  * メトリクス: メトリクスクエリの構成については、[グラフ作成方法に関するドキュメント][1]を参照してください。
  * ログイベント: ログイベントクエリの構成については、[ログ検索に関するドキュメント][2]を参照してください。
  * APM Statistics: APM 統計クエリの構成については、[APM 統計に関するドキュメント][3]を参照してください。
* メトリクスのエイリアスを設定することで、列ヘッダーの名前を変更できます。
* **Rows** に対して、**Group by** を行うタグキーを選択します。以下の例では `service` の行が表示されます。
* 結果の数の限度を選択します (デフォルトは 10)。
* テーブルを並べ替えるためのメトリクスを選択します (デフォルトは最初の列)。
* オプション: 各列のセルの値に応じて、条件付き書式を構成します。

{{< img src="dashboards/widgets/table/table_setup.png" alt="テーブルのセットアップ"  style="width:80%;">}}

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][4] ドキュメントをご参照ください。

テーブルウィジェットの[ウィジェット JSON スキーマ定義][5]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/querying/#configuring-a-graph
[2]: /ja/logs/search_syntax/
[3]: /ja/dashboards/querying/#configuring-an-apm-stats-graph
[4]: /ja/api/v1/dashboards/
[5]: /ja/dashboards/graphing_json/widget_json/