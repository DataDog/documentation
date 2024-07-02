---
title: Alert Value Widget
widget_type: alert_value
description: "Graph the current value of a metric in any simple-alert metric monitor defined on your system."
aliases:
- /graphing/widgets/alert_value/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
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

[1]: /api/v1/dashboards/
[2]: /dashboards/graphing_json/widget_json/
