---
aliases:
- /ja/graphing/widgets/alert_value/
description: システムで定義されているメトリクスモニター内のメトリクスの現在値をグラフ化する
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
kind: documentation
title: アラート値ウィジェット
---

アラート値は、システムで定義されているメトリクスモニター内のメトリクスの現在値を表示するクエリ値です。

{{< img src="dashboards/widgets/alert_value/alert_value.png" alt="アラート値" >}}

## セットアップ
{{< img src="dashboards/widgets/alert_value/alert_value_setup.png" alt="アラート値のセットアップ" style="width:80%;">}}

### コンフィギュレーション

1. これまでに作成したモニターから、グラフ化するメトリクスモニターを選択します。
2. 表示に使用する書式を選択します。
    * 未処理の値
    * 小数点以下 0/1/2/3 桁
3. 表示する単位を選択します。
    * `Automatic`
    * `/s`: 毎秒
    * `b`: ビット
    * `B`: バイト
    * `Custom`

### オプション

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル" style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][1] ドキュメントをご参照ください。

アラート値ウィジェット専用の[ウィジェット JSON スキーマ定義][2]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/