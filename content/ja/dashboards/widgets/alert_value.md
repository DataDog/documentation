---
aliases:
- /ja/graphing/widgets/alert_value/
description: システムで定義されているシンプルアラート型メトリクスモニター内のメトリクスの現在値をグラフ化する
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
title: アラート値ウィジェット
widget_type: alert_value
---

アラート値ウィジェットは、シンプルアラート型メトリクスモニターのクエリの現在値を表示します。シンプルアラート型モニターのメトリクスクエリはグループ化されておらず、1 つの値を返します。モニターの挙動とアラートステータスの概要を取得するには、ダッシュボード内のアラート値ウィジェットを使用します。

{{< img src="dashboards/widgets/alert_value/alert_value_2023.png" alt="ディスク容量、CPU 高使用率、チェックアウトエラー率の 3 種類のモニターステータスを示す 3 つのアラート値ウィジェット" >}}

## セットアップ
{{< img src="dashboards/widgets/alert_value/alert_value_setup_2023.png" alt="CPU 高使用率に関するアラート値のセットアップページ" style="width:100%;">}}

### 構成

1. グラフ化する既存のメトリクスモニターを選択します。
2. 表示に使用する書式を選択します。
    * 小数点以下の桁数
    * 単位
    * 配置
3. グラフにタイトルをつけます。

## API

このウィジェットは **[Dashboards API][1]** で使用できます。[ウィジェット JSON スキーマ定義][2]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/