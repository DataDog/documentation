---
title: 変化ウィジェット
kind: documentation
description: 選択した期間中の値の変化をグラフ化する
aliases:
  - /ja/graphing/widgets/change/
further_reading:
  - link: /ja/dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /ja/dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
  - link: /dashboards/graphing_json/widget_json/
    tag: ドキュメント
    text: ウィジェット JSON スキーマ
  - link: /dashboards/graphing_json/request_json/
    tag: ドキュメント
    text: リクエスト JSON スキーマ
---
変化グラフは、選択された期間中の値の変化を表示します。

{{< img src="dashboards/widgets/change/change.png" alt="変化グラフ" >}}

## セットアップ

{{< img src="dashboards/widgets/change/change_setup.png" alt="変化グラフのセットアップ"  style="width:80%;">}}

### コンフィギュレーション

1. グラフ化するメトリクスを選択します。
2. 集計関数を選択します。
3. オプション: ウィジェットのコンテキストを選択します。
4. 集計をタグキー (`host`、`service` など) ごとに分解します。
5. 「比較対象」期間を以下から選択します。
    * an hour before (1 時間前)
    * a day before (1 日前)
    * a week before (1 週間前)
    * a month before (1 か月前)
6. 2 つの期間の間の相対的 (`relative`) 変化と絶対的 (`absolute`) 変化のどちらを表示するかを選択します。
7. 結果の順位付けに以下のどの基準を使用するかを選択します。
    * `change`
    * `name`
    * `present value`
    * `past value`
8. 増加 (`increases`) と減少 (`decreases`) のどちらが望ましい変化かを指定します。望ましい変化は緑で、望ましくない変化は赤でハイライトされます。
9. オプション: 現在の値を表示します。

### オプション

#### 表示設定

{{< img src="dashboards/widgets/options/display_preferences.png" alt="表示設定"  style="width:80%;">}}

##### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

###### 凡例

Show legend on graph を使用して、ウィジェットの凡例の表示/非表示を切り替えます。オプションで、表示するエントリ数を選択できます。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][1] ドキュメントをご参照ください。

グループウィジェットの[ウィジェット JSON スキーマ定義][2]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/