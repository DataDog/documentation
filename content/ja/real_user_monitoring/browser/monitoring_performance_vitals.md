---
further_reading:
- link: https://learn.datadoghq.com/courses/core-web-vitals-lab
  tag: ラーニングセンター
  text: 'インタラクティブラボ: コアウェブバイタル'
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/
  tag: ブログ
  text: Datadog RUM および Synthetic モニタリングでウェブに関する主な指標を監視
title: パフォーマンスバイタルの監視
---

## 概要

{{< img src="real_user_monitoring/browser/vitals_performance/vitals-workflow.mp4" alt="RUM Vitals は、実際のユーザーのトラフィックに基づいてブラウザのパフォーマンス問題の根本原因を見つけるのに役立ちます。" video="true" >}}

RUM Vitals は、実際のユーザーのトラフィックに基づいてブラウザのパフォーマンス問題の真の根本原因を見つけるのに役立ちます。 [Core Web Vitals][1] (CWV)、[Loading Time][2] (ページがユーザーの視点から完全にロードされるまでの時間を評価する Datadog のカスタムメトリクス) など、ブラウザのメトリクスをトラブルシューティングできます。関連するすべての情報を一箇所に集めて、ページの遅延の原因を特定します。

## 前提条件

この機能を最大限に活用するために、Datadog は以下の使用を推奨します。

- [RUM Browser SDK][3] バージョン 5.4.0 以上
- 少なくとも一部のセッションで [Session Replay][4] を使用

## バイタルを選択

[Vitals ページ][5]に移動するか、[**Digital Experience > Performance Monitoring**][6] ページの "Vitals" タブをクリックします。

{{< img src="real_user_monitoring/browser/vitals_performance/vitals-page-selectors-1.png" alt="最も訪問されたページや特定のページのバイタルを確認できます。" style="width:100%;" >}}

このビューから、レビューと最適化のためのページとバイタルを選択する方法は 2 つあります。

- 最も訪問されたページのリストから選択
- 左側にビュー名を入力してページを選択

## フィルタリングと評価

ページとバイタルを選択すると、それらのパフォーマンスを説明するインサイトが表示されます。

ここから、以下のことができます。

- 右上で時間枠を変更
- ドロップダウンボタンを使用して異なる属性でフィルタリング
- 右側の内訳からグループを選択してフィルタリング ("Show Filter Breakdown")
- バイタルを評価するパーセンタイルを選択

以下の例では、pc75 の評価は、表示される値が選択されたフィルター内のビューの 75 パーセンタイルであることを意味します。pc75 は、特定のページの CWV を評価するために使用される一般的なパーセンタイルです。

{{< img src="real_user_monitoring/browser/vitals_performance/vital-filter-and-evaluate-1.png" alt="選択したビューのバイタルをフィルタリングして評価します。" style="width:100%;" >}}

## ユーザーの体験を視覚化

ページの次の部分では、ユーザーが実際に何を体験しているかを正確に視覚化するのに役立ちます。

選択した期間とトラフィックに基づいて、RUM Vitals は選択したバイタルがキャプチャされたときにユーザーがページで見る最も典型的な例をハイライトします。 [Session Replay][4] を使用している場合、ここでページのビジュアルが表示されます。

一部のバイタルでは、"See a different element" をクリックして調査するためにページの他のバージョンを選択することもできます。

{{< img src="real_user_monitoring/browser/vitals_performance/vitals-visualize.png" alt="異なる要素を選択して、ユーザーの体験をプレビューおよび視覚化します。" style="width:100%;" >}}

## リソースとエラーのトラブルシューティング

Troubleshooting セクションでは、バイタルのパフォーマンスに影響を与えた可能性のあるページ上のリソースとエラーを見ることができます。例えば、Largest Contentful Paint (LCP) では、LCP がトリガーされる前にロードされたリソースを見ることができます。LCP はページ上で最大の要素がロードされるまでの時間を示す指標であるため、以下を調査できます。

- それ以前に起こることが遅延やレンダリングの問題を引き起こしている可能性
- 特に遅いまたは大きなリソースがパフォーマンスの問題に寄与している可能性
- 繰り返し発生するエラーも問題を引き起こしている可能性

{{< img src="real_user_monitoring/browser/vitals_performance/vitals-troubleshoot.png" alt="Troubleshooting セクションは、バイタルのパフォーマンスに影響を与えた可能性のあるページ上のリソースとエラーを表示します。" style="width:100%;" >}}

## イベントサンプルを見る

ページのアクティビティ全体を文脈に合わせて確認するには、ウォーターフォールとイベントのタイムラインまでスクロールします。ウォーターフォールは、バイタルがキャプチャされるまでのイベントのタイムラインを示します。

以下に示すように、左上のドロップダウンを使用して別のサンプルイベントを選択し、ウォーターフォール内の任意のイベントをクリックしてサイドパネルを表示することができます。

{{< img src="real_user_monitoring/browser/vitals_performance/vitals-view-event-samples-1.png" alt="イベントサンプルを表示し、ページのアクティビティ全体を文脈に合わせて確認します。" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[2]: /ja/real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[3]: /ja/real_user_monitoring/browser/setup/
[4]: /ja/real_user_monitoring/session_replay/
[5]: https://app.datadoghq.com/rum/vitals
[6]: https://app.datadoghq.com/rum/performance-monitoring