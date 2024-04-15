---
aliases:
- /ja/graphing/widgets/alert_value/
description: システムで定義されているシンプルアラート型メトリクスモニター内のメトリクスの現在値をグラフ化する
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築

title: アラート値ウィジェット
---

アラート値は、システムで定義されているシンプルアラート型メトリクスモニター内のメトリクスの現在値を表示するクエリ値です。

{{< img src="dashboards/widgets/alert_value/alert_value_2023.png" alt="ディスク容量、CPU 高使用率、チェックアウトエラー率の 3 種類のモニターステータスを示す 3 つのアラート値ウィジェット" >}}

## セットアップ
{{< img src="dashboards/widgets/alert_value/alert_value_setup_2023.png" alt="CPU 高使用率に関するアラート値のセットアップページ" style="width:100%;">}}

### コンフィギュレーション

1. グラフ化する既存のメトリクスモニターを選択します。
2. 表示に使用する書式を選択します。
    * 小数点以下の桁数
    * 単位
    * 配置
3. グラフにタイトルをつけます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][1] ドキュメントをご参照ください。

アラート値ウィジェット専用の[ウィジェット JSON スキーマ定義][2]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/
