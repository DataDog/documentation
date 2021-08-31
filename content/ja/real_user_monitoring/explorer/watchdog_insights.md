---
title: Watchdog Insights for RUM
kind: documentation
description: 調査を開始またはフォローアップする地点に関するインサイトを得る
further_reading:
  - link: /real_user_monitoring/explorer/search/
    tag: ドキュメント
    text: RUM Explorer での検索について
  - link: 'https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals'
    tag: ブログ
    text: RUM でウェブに関する主な指標を監視
  - link: 'https://www.datadoghq.com/blog/datadog-mobile-rum/'
    tag: ブログ
    text: Datadog Mobile RUM でモバイルユーザーエクスペリエンスを向上
---
## 概要

Datadog Real User Monitoring (RUM) は、RUM Explorer のコンテキストインサイトに関する問題の根本原因の特定に役立つ Watchdog Insights を提供します。Watchdog Insights は、ユーザーのサブセットに影響を与える外れ値と潜在的なパフォーマンスのボトルネックを推奨することで、専門知識や能力を補完します。

<div class="alert alert-warning">
Watchdog Insights for RUM はベータ版です。この機能へのアクセスは、Real User Monitoring を使用してお客様にロビジョニングされます。フィードバックがある場合は、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>にお問い合わせください。
</div>

この例では、Watchdog Insights は、`view.url_host:www.shopist.io` にデプロイされたアプリケーションインスタンスが、指定された時間範囲 (たとえば、過去 1 日) でほとんどのエラーを引き起こしたことを識別します。

{{< img src="real_user_monitoring/explorer/watchdog_insights/overview.png" alt="Watchdog Insights" style="width:100%;" >}}

## ナビゲーション

Watchdog Insights バナーが **RUM Explorer results** ページに表示され、現在のクエリに関するインサイトが表示されます。

{{< img src="real_user_monitoring/explorer/watchdog_insights/banner_collapsed.png" alt="Watchdog Insights バナー (折り畳み)" style="width:100%;" >}}

すべてのインサイトの概要を確認するには、Watchdog Insight バナーを展開します。

{{< img src="real_user_monitoring/explorer/watchdog_insights/banner_expanded.png" alt="Watchdog Insights バナー (展開)" style="width:100%;" >}}

Watchdog Insights パネル全体にアクセスするには、**View all** をクリックします。

{{< img src="real_user_monitoring/explorer/watchdog_insights/side_panel.png" alt="Watchdog Insights サイドパネル" style="width:100%;" >}}

すべてのインサイトには、インタラクションが埋め込まれ、トラブルシューティング情報が記載されたサイドパネルが付属しています。インサイトインタラクションとサイドパネルは、[Watchdog Insights タイプ](#collections)によって異なります。

## 収集

### エラー外れ値

インサイトの 1 つのタイプには、現在のクエリに一致するエラーの特性を含む[ファセットタグまたは属性][1]などのフィールドを表示するエラー外れ値があります。エラー間で統計的に過大評価されている `key:value` ペアは、問題の根本原因へのヒントになります。

エラー外れ値の典型的な例としては、`env:staging`、`version:1234`、`browser.name:Chrome` が挙げられます。

**バナーカード**および**サイドパネルカード**ビューでは、次のことがわかります。

* フィールド名。
* フィールドが寄与するエラーと全体的な RUM イベントの割合。

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_m_card.png" alt="エラー外れ値バナーカードとサイドパネルカードビュー" style="width:100%;" >}}

**フルサイドパネル**では、フィールドで RUM エラーの時系列を確認できます。

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel.png" alt="エラー外れ値フルサイドパネル" style="width:100%;" >}}

### レイテンシー外れ値

別のタイプのインサイトには、パフォーマンスのボトルネックに関連付けられ、現在のクエリに一致する[ファセットタグまたは属性][1]などのフィールドを表示するレイテンシー外れ値があります。ベースラインよりもパフォーマンスが悪い `key:value` ペアは、実際のユーザーのサブセット間のパフォーマンスのボトルネックへのヒントになります。

レイテンシー外れ値は、First Contentful Paint、First Input Delay、Cumulative Layout Shiftなどの [Core Web Vitals][2]、および [Loading Time][3] に対して計算されます。

**バナーカード**ビューでは、次のことがわかります。

* フィールド名。
* フィールドと残りのデータのベースラインを含むパフォーマンスメトリクス値。

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_s_card.png" alt="レイテンシー外れ値バナーカードビュー" style="width:100%;" >}}

**サイドパネルカード**ビューでは、フィールドのパフォーマンスメトリクスの時系列と、残りのデータのベースラインを確認できます。

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_l_card.png" alt="レイテンシー外れ値サイドパネルビュー" style="width:100%;" >}}

**フルサイドパネル**ビューで、フィールドを含む RUM イベントのリストを確認できます。[パフォーマンスウォーターフォール][4]でパフォーマンスの問題の根本原因を探します。

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel.png" alt="レイテンシー外れ値フルサイドパネルビュー" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/facets/
[2]: /ja/real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[3]: /ja/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[4]: /ja/real_user_monitoring/explorer/?tab=facets#event-side-panel