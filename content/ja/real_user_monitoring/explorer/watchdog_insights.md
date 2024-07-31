---
description: Watchdog Insights を使用して RUM アプリケーションの問題を調査する方法をご紹介します。
further_reading:
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: ブログ
  text: RUM でウェブに関する主な指標を監視
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: ブログ
  text: Datadog Mobile RUM でモバイルユーザーエクスペリエンスを向上
- link: /watchdog/insights
  tag: ドキュメント
  text: Watchdog Insights について
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: RUM エクスプローラーでの検索方法について
title: Watchdog Insights for RUM
---

## 概要

Datadog Real User Monitoring (RUM) は、RUM Explorer のコンテキストインサイトに関する問題の根本原因の特定に役立つ Watchdog Insights を提供します。Watchdog Insights は、ユーザーのサブセットに影響を与える外れ値と潜在的なパフォーマンスのボトルネックを推奨することで、専門知識や能力を補完します。

詳しくは、[Watchdog Insights][1] を参照してください。

## 収集したインサイトの確認

ピンク色の Watchdog Insights バナーが [RUM エクスプローラー][2]に表示され、一定期間の検索クエリに関するインサイトが表示されます。この例では、デプロイされたアプリケーションインスタンスである `view.url_host:www.shopist.io` において、与えられた時間範囲 (例えば、過去 1 日) において一定量のエラーを発生させた問題を Watchdog Insights が表面化させる方法を示しています。

{{< img src="real_user_monitoring/explorer/watchdog_insights/overview.png" alt="RUM エクスプローラーの Watchdog Insights のバナーカード" style="width:100%;" >}}

[エラー](#error-outliers)または[レイテンシー外れ値](#latency-outliers)をクリックすると、サイドパネルに組み込まれた視覚化と影響を受けたイベントのリストからのビューの検索ができます。**View all** をクリックすると、サイドパネルに表示されているすべての未解決のエラー外れ値が表示されます。

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_m_card-3.png" alt="RUM エクスプローラーのエラー外れ値バナーカードとサイドパネルカードビュー" style="width:100%;" >}}

バナー内のカードにカーソルを合わせ、**Filter on Insight** をクリックすると、異常なインサイト動作を検索クエリに追加できます。例えば、特定のビューパスや、`North America` のような特定の大陸に焦点を当てることができます。

**View in Analytics** をクリックすると、自動的に `Group into fields` の数式が設定され、検索クエリの下に `Visualize as` のタイプが選択され、カードの外れ値の動作が反映されます。例えば、検索式で `synthetics.test_id` を使用して、Synthetic テストで異常に高いエラー率に関する時系列グラフを作成し、モニターまたはダッシュボードにエクスポートすることができます。

## エラー外れ値

エラーの外れ値は、現在の検索クエリに一致するエラーの特徴を含む[ファセット化されたタグまたは属性][3]のようなフィールドを表示します。エラーの中で統計的に多く出現する `key:value` のペアは、問題の根本的な原因を探るヒントを与えてくれます。エラーの外れ値の典型的な例としては、`env:staging` や `version:1234`、`browser.name:Chrome` などがあります。

**バナーカード**ビューでは、次のことがわかります。

* フィールド名
* フィールドが寄与する総エラーと全体的な RUM イベントの割合
* 関連タグ

**フルサイドパネル**では、そのフィールドを含む RUM エラーの総数に関する時系列グラフと、影響度を示す円グラフおよびそのフィールドを含む RUM イベントのリストが表示されます。

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel-1.png" alt="エラー外れ値フルサイドパネル" style="width:100%;" >}}

## レイテンシー外れ値

レイテンシー外れ値は、現在の検索クエリに一致する、パフォーマンスのボトルネックに関連付けられている[ファセットタグまたは属性][3]などのフィールドを表示します。ベースラインよりもパフォーマンスが悪い `key:value` ペアは、実際のユーザーのサブセット間のパフォーマンスのボトルネックへのヒントになります。

レイテンシー外れ値は、First Contentful Paint、First Input Delay、Cumulative Layout Shift などの [Core Web Vitals][4]、および [Loading Time][5] に対して計算されます。詳しくは、[ページのパフォーマンスの監視][4]をご覧ください。

**バナーカード**ビューでは、次のことがわかります。

* フィールド名
* フィールドと残りのデータのベースラインを含むパフォーマンスメトリクス値

**フルサイドパネル**では、パフォーマンスメトリクスに関する時系列グラフが、X 軸に `p50`、`p75`、`p99`、`max` の増分で表示され、そのフィールドを含む RUM イベントのリストが表示されます。

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel-1.png" alt="レイテンシー外れ値フルサイドパネルビュー" style="width:100%;" >}}

この時系列グラフから、パフォーマンス問題の根本原因の調査を始めることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/watchdog/insights/
[2]: /ja/real_user_monitoring/explorer
[3]: /ja/real_user_monitoring/explorer/search/#facets
[4]: /ja/real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[5]: /ja/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa