---
algolia:
  tags:
  - ファネル
aliases:
- /ja/real_user_monitoring/funnel_analysis
- /ja/real_user_monitoring/product_analytics/funnel_analysis
disable_toc: false
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: ドキュメント
  text: Analytics Explorer
title: ファネル分析
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
All features in Product Analytics are in limited availability. To request access, complete the form.
{{< /callout >}}

## 概要

ファネル分析では、キーとなるワークフロー全体のコンバージョン率を追跡し、エンドツーエンドのユーザージャーニーにおけるボトルネックを特定し、対処することができます。具体的には、以下のことが可能です。

- Web サイトのパフォーマンス低下により、ある時点で顧客が離れてしまったかどうかを確認する
- 新機能の追加に伴うコンバージョン率の変化を追跡する
- ワークフローに新しいステップを追加することによるドロップオフ率への影響を測定する

**注**: コンバージョン率とは、Web サイトへの訪問者総数のうち、目的のゴールを達成した (コンバージョン) 数のことです。
## ファネルの構築

To build a funnel, navigate to [**Digital Experience > Product Analytics > Journeys**][8] and click **Funnel**.

{{< img src="product_analytics/journeys/funnel_analysis/overview.png" alt="Navigate to the Funnel Analysis tab within Product Analytics" style="width:100%;" >}}

From this page, choose your starting view or action and click on the plus icon to build additional steps. You can also use drag and drop functionality to move steps around.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-building-a-funnel-1.mp4" alt="ネットワークマップを検索でフィルターする" video=true >}}

### 次のステップの候補

スタート地点は決まっているが、ユーザーが次に何をするかわからない場合、**Quickly add a step** パネル (右側のドロワーで利用可能) を展開すると、次のステップの候補が表示されます。ステップを入力すると、このパネルに、ユーザーがよく見る上位 5 つの**ビュー**と**アクション**が自動的にロードされ、次に実行されます。これにより、ユーザーの行動パターンを把握することで、ファネルをより早く構築することができます。

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-suggested-next-steps.jpg" alt="ファネルの構築" style="width:90%;" >}}

**注**: ファネル内の 2 つのステップの間に発生したアクションやビューは、ステップごとのコンバージョン率や全体のコンバージョン率に影響を与えません。あるセッションでステップ 1 とステップ 2 が正しい順序で少なくとも 1 回起こっていれば、1 つのコンバージョンされたセッションとしてカウントされます。

### フィルタリング

ファネルを構築する際、[デフォルト属性][1] (コア、デバイス、オペレーティングシステム、ジオロケーション、ユーザー) と[セッション固有][2]属性を追加して、さらにデータを分析することができます。**Add Filter** ボタンをクリックすると、利用可能な属性の全リストが表示されます。

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-filtering.png" alt="ファネル構築時に情報をフィルターするために属性を使用します" style="width:80%;" >}}

## ファネルの分析

ファネルを構築した後、**View Funnel Insights** をクリックすると、パフォーマンスとユーザー行動傾向に関する相関データを提供する **Funnel Analysis** パネルが開きます。この情報は、コンバージョンレートを理解するのに役立ちます。

ハイレベルなトレンドについては、ワークフロー全体のエンドツーエンドのコンバージョン率を見ることができ、また、個々のステップのコンバージョン率からドロップオフ率まで見ることができます。コンバージョンした人とドロップオフした人がどのように見えるかを理解したい場合は、各ケースの[セッションリプレイ][5]を見ることができます。

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-analyzing-funnel.jpg" alt="Funnel Insights パネルを使用して、パフォーマンスとユーザー行動の傾向を確認します" style="width:90%;" >}}

**Performance** セクションでは、パフォーマンスの悪さがコンバージョンに影響を与えた可能性があるかどうかを理解することができます。そのページのロード時間とコンバージョン率の相関グラフを見ることができ、また、そのページで問題 ([エラー追跡][7]で検出) が発生したかどうかを確認することができます。

**User Behavior** セクションでは、平均フラストレーション数 ([フラストレーションシグナル][3]より) とコンバージョン率を比較し、さらに個々のアクションから検出されたフラストレーションシグナルを分析することが可能です。このセクションの隣には、特定の国のコンバージョン率とドロップオフ率を示すグラフがあり、地理的な地域がユーザーのコンバージョンに関与しているかどうかを理解することができます。

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-user-behavior.jpg" alt="ファネル分析内のユーザー行動セクション" style="width:90%;" >}}

## ファネルの共有

ファネルは[ダッシュボード][6]でチームと共有し、他のテレメトリーメトリクスと合わせてコンバージョンを分析したり、[ノートブック][4]で報告用に使用したりすることができます。

視覚化全体または個々のウィジェットを共有することができます。

- ノートブックやダッシュボードに視覚化全体を共有することができます。

  {{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-share-entire-visualization.jpg" alt="Export をクリックして視覚化全体を共有します" style="width:90%;" >}}

- 個々のウィジェットを共有することができます。

  {{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-share-individual-widgets-1.mp4" alt="ウィジェットの右上にあるエクスポートアイコンをクリックして、ウィジェットを共有します" video="true" width=90% >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/data_collected/#default-attributes
[2]: /ja/real_user_monitoring/browser/data_collected/#session-metrics
[3]: /ja/real_user_monitoring/browser/frustration_signals/
[4]: /ja/notebooks/
[5]: /ja/real_user_monitoring/session_replay
[6]: /ja/dashboards/
[7]: /ja/real_user_monitoring/error_tracking/