---
aliases:
- /ja/graphing/widgets/change/
description: 選択した期間中の値の変化をグラフ化する
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
- link: /dashboards/graphing_json/widget_json/
  tag: ドキュメント
  text: ウィジェット JSON スキーマ
- link: /dashboards/graphing_json/request_json/
  tag: ドキュメント
  text: リクエスト JSON スキーマ
kind: documentation
title: 変化ウィジェット
---
Change グラフは、ある期間におけるメトリクスの変化を表示します。

{{< img src="/dashboards/widgets/change/change_widget.png" alt="jvm.heap_memory メトリクスの変更ウィジェットの例" style="width:100%;" >}}

## セットアップ

### コンフィギュレーション

1. グラフ化するメトリクスを選択します。
2. 集計関数を選択します。
3. オプション: ウィジェットのコンテキストを選択します。
4. `host` や `service` などのタグキーで集計を分解します。
5. "Compare to" 期間の値を選択します。
    * an hour before (1 時間前)
    * a day before (1 日前)
    * a week before (1 週間前)
    * a month before (1 か月前)
6. `relative` または `absolute` 変化を選択します。
7. メトリクスの順序を決めるフィールドを選択します。
    * `change`
    * `name`
    * `present value`
    * `past value`
8. `ascending` か `descending` かを選択します。
9. グラフに現在値を表示するかどうかを選択します。

### オプション

#### コンテキストリンク

[コンテキストリンク][1]は、デフォルトで有効になっており、オンまたはオフに切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと他のページ (Datadog 内、またはサードパーティ製) の橋渡しをします。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

変化ウィジェット専用の[ウィジェット JSON スキーマ定義][3]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/guide/context-links/
[2]: /ja/api/latest/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/