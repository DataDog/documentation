---
aliases:
- /ja/graphingjson/
- /ja/graphing/miscellaneous/graphingjson
- /ja/graphing/graphing_json/
- /ja/dashboards/graphing_json/
- /ja/dashboards/graphing_json/request_json/
- /ja/dashboards/graphing_json/widget_json/
further_reading:
- link: https://docs.datadoghq.com/api/latest/dashboards/
  tag: API
  text: Dashboards API
- link: /dashboards/widgets/
  tag: Documentation
  text: Widgets
title: Graphing with JSON
---

## 概要

{{< img src="/dashboards/graphing_json/json_editor.png" alt="JSON エディターで時系列ウィジェットを構成する様子" style="width:100%;" >}}

[GUI グラフエディター][6]に加え、ダッシュボードウィジェットでは JSON エディターを使用して視覚化を構成することができます。JSON エディターに表示されるスキーマは、Dashboard API のリクエスト本文のスキーマを反映しています。JSON のパラメーターおよび必須フィールドの詳細については、[ダッシュボード API のドキュメント][2]を参照してください。 

## ウィジェット JSON スキーマ

ダッシュボードに追加したウィジェットタイプを見つけ、それぞれのドキュメントに記載されている JSON フィールドを適用します。ウィジェットタイプの一覧については、[ウィジェットの索引][7]を参照してください。

### Y 軸スキーマ

Datadog の Y 軸コントロールには以下の機能があります。

*   Y 軸を特定の範囲にクリップします。
*   割合または絶対値を指定して、系列をフィルタリングします。
*   Y 軸の目盛を線形目盛から対数、平方根、または指数目盛に変更します。

### マーカースキーマ

マーカーを使用すると、視覚的な条件付き書式をグラフに追加できます。たとえば、 ALERT、WARNING、OKなどです。

{{< img src="dashboards/graphing_json/markers.png" alt="マーカー" style="width:80%;">}}

## テンプレート変数スキーマ

ダッシュボードテンプレート変数は、ダッシュボード上の 1 つ以上のグラフに新しいスコープを適用します。これにより、特定のタグではなく変数を使用することで、複数のタグセットにまたがってメトリクスを動的に調査することができます。[Datadog UI のテンプレート変数][4]に関する詳細を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/#get-started
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/
[4]: /ja/dashboards/template_variables/
[6]: /ja/dashboards/querying/#graphing-editor
[7]: /ja/dashboards/widgets/