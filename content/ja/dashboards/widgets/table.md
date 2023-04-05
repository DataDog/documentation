---
aliases:
- /ja/graphing/widgets/table/
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
kind: documentation
title: テーブルウィジェット
widget_type: query_table
---

## 概要

テーブル化により、タグキーでグループ化された集計データを列で表示できます。たとえば、`system.cpu.system` と `system.cpu.user` が `service` でグループ化されます。

{{< img src="dashboards/widgets/table/table_widget_1.png" alt="テーブルウィジェット" style="width:80%;">}}

**注:** テーブルウィジェットは数値データのみサポートされます。

## セットアップ

### コンフィギュレーション

1. グラフ化するデータを選択します。
    * メトリクス: メトリクスクエリの構成については、[グラフ作成方法に関するドキュメント][1]を参照してください。
    * ログイベント: ログイベントクエリの構成については、[ログ検索に関するドキュメント][2]を参照してください。
    * Indexed Span: インデックス化スパンクエリの構成については、[トレース検索に関するドキュメント][3]を参照してください。
    * RUM イベント: RUM クエリの構成については、[RUM 検索構文に関するドキュメント][4]を参照してください。
    * プロファイリングメトリクス: プロファイリングクエリの構成については、[検索プロファイルのドキュメント][5]を参照してください。
    * セキュリティシグナル: セキュリティシグナルクエリの構成については、[セキュリティシグナルの探索に関するドキュメント][6]を参照してください。
    * APM 統計: APM 統計クエリの構成については、[APM 統計に関するドキュメント][7]を参照してください。
2. **+ Add Query** と **+ Add Formula** のボタンを使用して、テーブルに列を追加します。

### オプション
* エイリアスを設定することで、列ヘッダーの名前を変更できます。**as...** ボタンをクリックします。
* 視覚化の書式設定ルールで、各列のセルの値の表示方法をカスタマイズできます。
* 検索バーを表示するかどうかを構成します。デフォルトは **Auto** で、ウィジェットの大きさに応じて検索バーを表示します。つまり、画面が小さい場合はウィジェット上のデータの表示を優先し、検索バーは非表示になります（全画面モードになると表示されます）。
* ユーザーのリダイレクト先となるページを指定するコンテキストリンクをカスタマイズできます。[コンテキストリンク][10]ガイドを参照してください。
* クエリに数学関数を適用できます。[ダッシュボードグラフの作成に関するドキュメント][11]を参照してください。

## N/A 値

テーブルウィジェットの列は、それぞれ独立してクエリが実行されます。名前が同じで重複するグループはリアルタイムで結合されて、テーブルの行が作成されます。このプロセスの結果、重複するグループがなく、セルに N/A が表示される状況が発生する可能性があります。これを回避するには、次の対策を講じます。
  * クエリ数の上限を大きくして、できるだけ多くの列が組み合わさるようにします。
  * インサイトを"生み出している"と思われる列でテーブルをソートします。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][8] ドキュメントをご参照ください。

テーブルウィジェットの[ウィジェット JSON スキーマ定義][9]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/querying/#configuring-a-graph
[2]: /ja/logs/search_syntax/
[3]: /ja/tracing/trace_explorer/query_syntax/
[4]: /ja/real_user_monitoring/explorer/search_syntax
[5]: /ja/profiler/search_profiles
[6]: /ja/security_monitoring/explorer/
[7]: /ja/dashboards/querying/#configuring-an-apm-stats-graph
[8]: /ja/api/v1/dashboards/
[9]: /ja/dashboards/graphing_json/widget_json/
[10]: /ja/dashboards/guide/context-links/
[11]: /ja/dashboards/querying/#advanced-graphing