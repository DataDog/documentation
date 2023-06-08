---
aliases:
- /ja/graphing/widgets/log_stream/
description: Datadog のダッシュボードにフィルター処理したログストリームを表示する
further_reading:
- link: /logs/explorer/analytics/
  tag: ドキュメント
  text: ログ分析
- link: /ja/dashboards/graphing_json/
  tag: Documentation
  text: JSON を使用したダッシュボードの構築
kind: documentation
title: ログストリームウィジェット
---

ログストリームは、定義したクエリと一致するログフローを表示します。

## セットアップ

{{< img src="/dashboards/widgets/log_stream/log_stream_config.png" alt="日付、ホスト、サービスの 3 列を持つ source:nodejs でフィルターされたログストリーム構成" style="width:100%;" >}}

### コンフィギュレーション

1. [検索クエリ][1]を入力して、ログストリームを絞り込みます。
1. [Log Analytics][2] のイベントサブセットには、`Patterns` と `Transactions` があり、ログをグループ化することができます。
1. 列を更新して、[ファセット][3]と[メジャー][4]の値を表示します。
1. グラフにタイトルを付けるか、提案されたタイトルを使用するにはボックスを空白のままにします。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][5] を参照してください。

ログストリームウィジェットの[ウィジェット JSON スキーマ定義][6]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/search/
[2]: /ja/logs/explorer/analytics/
[3]: /ja/logs/explorer/facets/
[4]: /ja/logs/explorer/facets/#measures
[5]: /ja/api/latest/dashboards/
[6]: /ja/dashboards/graphing_json/widget_json/