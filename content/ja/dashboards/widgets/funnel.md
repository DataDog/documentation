---
aliases:
- /ja/graphing/widgets/funnel/
further_reading:
- link: https://docs.datadoghq.com/product_analytics/journeys/funnel_analysis/
  tag: ドキュメント
  text: ファネル分析の詳細
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: ブログ
  text: ファネル分析により、主要なユーザーフローを理解し、最適化する
title: ファネルウィジェット
widget_type: ファネル
---

ファネル分析では、主要なワークフロー全体でコンバージョン率を追跡し、エンドツーエンドのユーザージャーニーにおけるボトルネックを特定して対処できます。ファネルウィジェットは、ユーザーワークフローおよびエンドツーエンドのユーザージャーニーにわたるコンバージョン率を可視化します。

{{< img src="dashboards/widgets/funnel/funnel.png" alt="EC サイトにおけるユーザーのドロップオフ率を視覚化するファネルウィジェット" >}}

## セットアップ

{{< img src="dashboards/widgets/funnel/funnel_setup.png" alt="ファネルウィジェット設定画面" >}}

### 構成

1. グラフ化するデータを選択します。
    * RUM: RUM クエリの構成については、[RUM イベントの検索のドキュメント][1]を参照してください。
2. **View** または **Action** を選択し、ドロップダウンメニューからクエリを選択します。
3. ファネルを視覚化するには、**+** ボタンをクリックし、ドロップダウンメニューから別のクエリを選択します。ファネル分析の視覚化の詳細については、[RUM 視覚化のドキュメント][2]を参照してください。

### オプション

#### グローバルタイム

スクリーンボードとノートブックの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、グローバルタイムフレームを使用するかを選択します。

## API

このウィジェットは [Dashboards API][3] で使用できます。[ウィジェット JSON スキーマ定義][4]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/explorer/search/
[2]: /ja/product_analytics/journeys/funnel_analysis
[3]: /ja/api/latest/dashboards/
[4]: /ja/dashboards/graphing_json/widget_json/