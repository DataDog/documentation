---
title: Timeboards
kind: documentation
aliases:
  - /ja/graphing/dashboards/timeboard/
  - /ja/dashboards/timeboard/
further_reading:
  - link: /dashboards/template_variables
    tag: ドキュメント
    text: テンプレート変数を使用してダッシュボードの機能を強化
  - link: /dashboards/sharing
    tag: ドキュメント
    text: Datadog以外とグラフを共有
  - link: /dashboards/widgets
    tag: ドキュメント
    text: すべてのウィジェットをダッシュボードで体験できます
---
タイムボードでは、ダッシュボード全体を定刻またはリアルタイムで自動レイアウトにより表示します。通常、トラブルシューティング、共同作業、一般データの調査に使用します。

**注意**: タイムボードのグラフはすべて、同時刻で切り替わります。グラフのタイムフレームを個別に制御するには、[スクリーンボード][1]を使用してください。

## TV モード

タイムボードの TV アイコンをクリック、または、キーボードのショートカットキー `F` を使用して、タイムボードを TV モードに切り替えて大画面や TV に表示できます。

## 設定

タイムボードの設定は、パブリック URL の生成を除き、スクリーンボードの設定と同じです。

* [UTC 時間を表示][2]
* [通知][3]
* [アクセス許可][4]
* [ダッシュボードを複製][5]
* [ダッシュボード JSON をコピー、インポート、エクスポート][6]
* [ダッシュボードを削除][7]

## グラフを追加する

[タイムボードを作成][8]したら、**Edit widgets** ボタンまたは **Add graph** リンクをクリックしてグラフを追加します。次に、適切な[ウィジェット][9]をタイムボード上にドラッグします。

## 検索

### イベント

左上の **Search...** リンクをクリックしてイベントのオーバーレイを設定し、**Events** を選択、検索ボックスに[クエリ][10]を入力します。これにより、設計時に追加されたイベントのオーバーレイと置き換わり、タイムボードの全グラフに適用されます。イベントの発生状況がオーバーレイで時系列グラフ上に表示され、右側にはイベントの一覧が表示されます。

{{< img src="dashboards/timeboard/events_overlay.png" alt="イベントのオーバーレイ"  style="width:75%;">}}

### ログ

左上の **Search...** リンクをクリックしてログのオーバーレイを設定し、**Logs** を選択、検索ボックスに[クエリ][11]を入力します。時系列グラフ上にログの頻度がオーバーレイで表示され、右側にはイベントの一覧が表示されます。

## グラフメニュー

ダッシュボード上で時系列グラフを左クリックすると、オプションメニューが開きます。

{{< img src="dashboards/timeboard/metric_to_logs.png" alt="関連ログ"  style="width:80%;">}}

| オプション                 | 説明                                                   |
|------------------------|---------------------------------------------------------------|
| Annotate this graph    | グラフについて、コメントやチームメンバーへの通知を記入します。 |
| View in full screen    | グラフを[全画面モード][12]で表示します。                     |
| Copy tags to clipboard | マウスをかざすと表示されるタグをクリップボードにコピーします。        |
| View related processes | グラフ参照範囲の[ライブプロセス][13]ページへジャンプします。   |
| View related hosts     | グラフ参照範囲の[ホストマップ][14]ページへジャンプします。         |
| View related logs      | グラフ参照範囲の[ログエクスプローラー][15]ページへジャンプします。     |

### ログ検索クエリ

**View related logs** の検索クエリは、下記のパラメーターを使用して定義します。

* **タイムフレーム**: 選択したデータポイントを中心に置き、グラフの時間枠を使用して選択したポイントの前後のデータを表示します。
* **インテグレーションプレフィックス**: メトリクスがインテグレーションから派生しっている場合、Datadog は同じインテグレーション名で `source`  属性にフィルターを掛けます。
* **タグ**: グラフで使用されるタグ (*template variable*、*split by*、*filter by*) はすべて、自動的に検索クエリに追加されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/screenboard
[2]: /ja/dashboards/screenboards/#display-utc-time
[3]: /ja/dashboards/screenboards/#notifications
[4]: /ja/dashboards/screenboards/#permissions
[5]: /ja/dashboards/screenboards/#clone-dashboard
[6]: /ja/dashboards/screenboards/#copy-import-or-export-dashboard-json
[7]: /ja/dashboards/screenboards/#delete-dashboard
[8]: /ja/dashboards/#new-dashboard
[9]: /ja/dashboards/widgets
[10]: /ja/events/#event-query-language
[11]: /ja/logs/explorer/search/#search-syntax
[12]: /ja/dashboards/widgets/#full-screen
[13]: https://app.datadoghq.com/process
[14]: https://app.datadoghq.com/infrastructure/map
[15]: https://app.datadoghq.com/logs