---
title: スクリーンボードレイアウト
kind: documentation
aliases:
  - /ja/graphing/dashboards/screenboards/
  - /ja/graphing/dashboards/screenboard/
  - /ja/dashboards/screenboard/
  - /ja/screenboards/
  - /ja/screenboard/
further_reading:
  - link: /dashboards/template_variables/
    tag: ドキュメント
    text: テンプレート変数を使用してダッシュボードの機能を強化
  - link: /dashboards/sharing/
    tag: ドキュメント
    text: Datadog以外とグラフを共有
  - link: /dashboards/widgets/
    tag: ドキュメント
    text: すべてのウィジェットをダッシュボードで体験できます
---
スクリーンボードは自由形式のレイアウトのダッシュボードで、画像やグラフ、ログなど、様々なオブジェクトを含めることができます。リアルタイムに更新されたり、過去の定点を示すステータスボードやストーリーテリングビューとして使われるのが一般的です。

## グラフメニュー

スクリーンボードグラフをクリックするとオプションメニューが開きます。

| オプション                 | 説明                                                   |
|------------------------|---------------------------------------------------------------|
| View in full screen    | グラフを[全画面モード][1]で表示します。                     |
| View related processes | グラフ参照範囲の[ライブプロセス][2]ページへジャンプします。   |
| View related hosts     | グラフ参照範囲の[ホストマップ][3]ページへジャンプします。         |
| View related logs      | グラフ参照範囲の[ログ][4]パネルに入力します。             |
| 関連トレースを表示    | グラフ参照範囲の[トレース][5]パネルに入力します。          |
| 関連プロファイルを表示  | グラフ参照範囲の[プロファイリング][6]ページへジャンプします。       |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/widgets/#full-screen
[2]: https://app.datadoghq.com/process
[3]: https://app.datadoghq.com/infrastructure/map
[4]: /ja/logs/
[5]: /ja/tracing/
[6]: /ja/tracing/profiler/