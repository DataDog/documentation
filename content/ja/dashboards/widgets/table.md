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

テーブルはダッシュボードで可視化することが可能です。タグキーでグループ化された集計データを列で表示します。たとえば、`system.cpu.system` と `system.cpu.user` が `service` でグループ化されます。

{{< img src="dashboards/widgets/table/table_widget_1.png" alt="テーブルウィジェット"  style="width:80%;">}}

## セットアップ

### コンフィギュレーション

* グラフを作成するデータを選択します (必要に応じて列を追加してください)。
  * メトリクス: メトリクスクエリの構成については、[グラフ作成方法に関するドキュメント][1]を参照してください。
  * ログイベント: ログイベントクエリの構成については、[ログ検索に関するドキュメント][2]を参照してください。
  * Indexed Span: Indexed Span クエリの構成については、[Indexed Span ドキュメント][3]を参照してください。
  * RUM イベント: RUM クエリの構成については、[RUM 検索構文に関するドキュメント][4]を参照してください。
  * プロファイリングメトリクス: プロファイリングクエリの構成については、[検索プロファイルのドキュメント][5]を参照してください。
  * セキュリティシグナル: セキュリティシグナルクエリの構成については、[セキュリティシグナルの探索に関するドキュメント][6]を参照してください。
  * APM 統計: APM 統計クエリの構成については、[APM 統計に関するドキュメント][7]を参照してください。
* メトリクスのエイリアスを設定することで、列ヘッダーの名前を変更できます。
* **Rows** に対して、**Group by** を行うタグキーを選択します。以下の例では `service` の行が表示されます。
* 結果の数の限度を選択します (デフォルトは 10)。
* テーブルを並べ替えるためのメトリクスを選択します (デフォルトは最初の列)。
* オプション:
  * 各列のセルの値に応じて、条件付き書式 (**バー/数字** と **色** の両方) を構成します。
  * 検索バーを表示するかどうかを構成します。デフォルトは **Auto** で、ウィジェットの大きさに応じて検索バーを表示します。つまり、画面が小さい場合はウィジェット上のデータの表示を優先し、検索バーは非表示になります（全画面モードになると表示されます）。

{{< img src="dashboards/widgets/table/table_setup_1.png" alt="テーブルの設定"  style="width:80%;">}}

## API

このウィジェットは、**ダッシュボード API** とともに使用されます。詳しくは、[ダッシュボード API][8] ドキュメントを参照してください。

テーブルウィジェットの[ウィジェット JSON スキーマ定義][9]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/querying/#configuring-a-graph
[2]: /ja/logs/search_syntax/
[3]: /ja/tracing/trace_search_and_analytics/query_syntax/
[4]: /ja/real_user_monitoring/explorer/search/#search-syntax
[5]: /ja/tracing/profiler/search_profiles
[6]: /ja/security_monitoring/explorer/
[7]: /ja/dashboards/querying/#configuring-an-apm-stats-graph
[8]: /ja/api/v1/dashboards/
[9]: /ja/dashboards/graphing_json/widget_json/