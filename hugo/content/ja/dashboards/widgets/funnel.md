---
aliases:
- /ja/graphing/widgets/funnel/
description: ファネル分析の可視化を使用して、コンバージョン率を追跡し、ユーザーワークフローのボトルネックを特定します。
further_reading:
- link: https://docs.datadoghq.com/product_analytics/journeys/funnel_analysis/
  tag: ドキュメント
  text: ファネル分析の詳細
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: ブログ
  text: ファネル分析により、主要なユーザーフローを理解し、最適化する
title: ファネルウィジェット
widget_type: funnel
---
ファネル分析は、エンドツーエンドのユーザージャーニーにおける重要なワークフロー全体のコンバージョン率を追跡し、ボトルネックを特定して対処する上で役立ちます。ファネルウィジェットは、ユーザーのワークフローとエンドツーエンドのユーザージャーニーにおけるコンバージョン率を視覚化します。

{{< img src="dashboards/widgets/funnel/funnel.png" alt="e コマースサイトにおけるユーザーのドロップオフ率を視覚化するファネルウィジェット" >}}

## セットアップ {#setup}

{{< img src="dashboards/widgets/funnel/funnel_setup.png" alt="ファネルウィジェットのセットアップ画面" >}}

### 構成 {#configuration}

1. グラフ化するデータを選択します。
    * RUM: RUM クエリの構成については、[RUM イベントの検索に関するドキュメント][1] を参照してください。
2. {{< ui >}}View{{< /ui >}} または {{< ui >}}Action{{< /ui >}} を選択し、ドロップダウンメニューからクエリを選択します。
3. {{< ui >}}\+{{< /ui >}} ボタンをクリックし、ドロップダウンメニューから別のクエリを選択すると、ファネルが表示されます。ファネル分析の視覚化の詳細については、[RUM の視覚化に関するドキュメント][2] を参照してください。

### オプション {#options}

#### グローバルタイム {#global-time}

スクリーンボードとノートブックの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、グローバルタイムフレームを使用するかを選択します。

## API {#api}

このウィジェットは、[Dashboards API][3] で使用することができます。[ウィジェット JSON スキーマの定義][4] については、次のテーブルを参照してください。

{{< dashboards-widgets-api >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/explorer/search/
[2]: /ja/product_analytics/journeys/funnel_analysis
[3]: /ja/api/latest/dashboards/
[4]: /ja/dashboards/graphing_json/widget_json/