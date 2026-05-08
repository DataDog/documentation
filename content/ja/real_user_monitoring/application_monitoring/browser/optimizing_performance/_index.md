---
aliases:
- /ja/real_user_monitoring/browser/monitoring_performance_vitals/
- /ja/real_user_monitoring/browser/optimizing_performance/
description: RUM Optimization ページを使用して、コア ウェブ バイタルの分析とユーザー エクスペリエンスの可視化により、ブラウザ パフォーマンスの問題を特定・トラブル
  シューティングします。
further_reading:
- link: https://learn.datadoghq.com/courses/rum-optimize-frontend-performance
  tag: ラーニング センター
  text: 'インタラクティブ ラボ: Datadog RUM Browser Monitoring でフロント エンド パフォーマンスを最適化する'
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: リアル ユーザー モニタリング
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/
  tag: ブログ
  text: Datadog RUM と Synthetic Monitoring でコア ウェブ バイタルを監視する
- link: https://www.datadoghq.com/blog/rum-optimization/
  tag: ブログ
  text: 'データからアクションへ: Datadog RUM でコア ウェブ バイタルなどを最適化'
title: パフォーマンスの最適化
---

## 概要

{{< img src="real_user_monitoring/browser/optimizing_performance/optimization-workflow.mp4" alt="RUM Performance Optimization は、実際のユーザー トラフィックに基づいてブラウザ パフォーマンスの問題の根本原因を特定するのに役立ちます。" video="true" >}}

Optimization ページは、実際のユーザー トラフィック データを用いてブラウザ パフォーマンスの問題の根本原因を特定するのに役立ちます。ページの遅延要因は、[コア ウェブ バイタル][1] (CWV) や Datadog のカスタム [Loading Time][2] といったブラウザ KPI を使ってトラブル シューティングできます。[Loading Time][2] は、ユーザー視点でのフル ページの読み込み時間を評価する KPI です。

より詳細な分析のために、Optimization ページでは、ブラウザ、地域、アプリ バージョンといったユーザー属性別にコア ウェブ バイタルの粒度の高い内訳を提供します。この情報を使って、時間の経過に伴うパフォーマンス トレンドを追跡し、どのユーザー グループが最も影響を受けているかを把握し、最適化の優先順位付けを正確に行えます。

## 前提条件

アプリケーションを最適化するには、以下を使用していることを確認してください:

- [RUM Browser SDK][3] バージョン 5.4.0 以上
- [Session Replay][4] を少なくとも一部のセッションで使用

## バイタルの選択

[Optimization ページ][5] に移動します。これは [**Digital Experience > Performance Monitoring**][6] タブの配下にあります。

{{< img src="real_user_monitoring/browser/optimizing_performance/page-selectors.png" alt="Optimization ページでは、最も訪問数の多いページや特定のページを確認できます。" style="width:100%;" >}}

このビューから、ページまたはバイタルを選択する方法は 2 つあります:

- 最も訪問数の多いページのツリー マップから選ぶ
- 入力 ボックスに View 名を入力し、そのページを選択する

利用可能なバイタルには次が含まれます:

- **[読み込み時間 (LT)][2]**: Datadog のカスタム KPI で、ユーザー視点でページが読み込まれるまでの時間を測定します。
- **[最大コンテンツ描画 (LCP)][8]**: ページ内の最大の視覚要素がどれだけ速く読み込まれるかを測定します。これはユーザー エクスペリエンスと SEO ランキングの両方にとって重要です。LCP が遅いと、ユーザーの不満や直帰率の上昇、検索での視認性低下につながります。
- **[初回コンテンツ描画 (FCP)][9]**: ユーザーが最初にページへ移動してから、ページ コンテンツの一部が画面に描画されるまでの時間を測定します。FCP が速いと、ユーザーに「処理が進んでいる」という安心感を与えます。
- **[累積レイアウト シフト (CLS)][10]**: ページのライフ サイクル中に発生する予期しないレイアウト シフトの最大バーストを測定します。レイアウト シフトとは、ユーザー操作なしに、可視要素があるフレームから次のフレームへと位置を変える現象で、視覚的な安定性を損ないます。ユーザーがどれくらいの頻度で予期しないレイアウト シフトを体験するかを定量化できるため、視覚的安定性を測る重要な KPI です。CLS が低いほど、ページは快適になります。
- **[次のペイントまでのインタラクション (INP)][11]**: ユーザーがページと対話してから、ページが視覚的に反応するまでの時間を測定します。

## フィルターと評価

ページとバイタルを選択したら、パフォーマンスのインサイトを分析します:

- 右上の期間を調整する
- ドロップダウン メニューで属性フィルターを適用する
- "Show Filter Breakdown" でグループを選択する
- さまざまなパーセンタイルでバイタルを評価する

たとえば、pc75 評価は 75 パーセンタイルの値を表し、CWV で一般的に使用されます。

{{< img src="real_user_monitoring/browser/optimizing_performance/filter-and-evaluate.png" alt="選択した View のバイタルをフィルターおよび評価します。" style="width:100%;" >}}

## ユーザー エクスペリエンスの可視化

次のセクションでは、ユーザーが実際に体験している内容を正確に可視化できます。

選択した期間とトラフィックに基づき、Optimization ページは、選択したバイタルが取得された時点でユーザーがページ上で目にする最も典型的な例をハイライトします。[Session Replay][4] を使用している場合は、ここでページのビジュアルを確認できます。

一部のバイタルでは、"See a different element" をクリックして、調査用に別バージョンのページを選択することもできます。

{{< img src="real_user_monitoring/browser/optimizing_performance/vitals-visualize.png" alt="異なる要素を選択して、ユーザー エクスペリエンスをプレビューおよび可視化します。" style="width:100%;" >}}

## リソースとエラーのトラブル シューティング

トラブル シューティング セクションでは、ページ上でユーザーが遭遇し、バイタルのパフォーマンスに影響した可能性のあるリソースやエラーを確認できます。たとえば、最大コンテンツ描画 (LCP) の場合、LCP がトリガーされる前に読み込まれたリソースを確認できます。LCP はページ上の最大要素の読み込みに要する時間を示す指標であるため、次の点を調査できます:

- その時点より前に起きている処理が、低速化やレンダリング上の問題を引き起こしていないか
- 特に遅い、またはサイズが大きいリソースがパフォーマンス問題の一因になっていないか
- 繰り返し発生するエラーが問題の原因になっていないか

{{< img src="real_user_monitoring/browser/optimizing_performance/troubleshoot.png" alt="トラブル シューティング セクションでは、バイタルのパフォーマンスに影響した可能性のあるリソースやエラーを確認できます。" style="width:100%;" >}}

## イベント サンプルを表示

ページ内の他のアクティビティとの関係で全体像を確認するには、イベントのウォーターフォールとタイムラインまでスクロールします。ウォーターフォールには、バイタルが取得される瞬間までのイベント タイムラインが表示されます。

左上のドロップダウンを使用して別のサンプル イベントを選択でき、ウォーターフォール内の任意のイベントをクリックして展開すると、下図のようにサイド パネルが表示されます。

{{< img src="real_user_monitoring/browser/optimizing_performance/view-event-samples.png" alt="イベント サンプルを表示し、ページ内の他のアクティビティとの関係で全体像を確認します。" style="width:100%;" >}}

## イベント サンプル内のブラウザ プロファイリング
根本原因をさらに深く分析するには、RUM と併用してブラウザ プロファイリングを使用し、どの JavaScript やレンダリング処理が遅延や無応答の体験を引き起こしているかを特定します。プロファイリングは、コア ウェブ バイタルだけでは必ずしも見えてこないパフォーマンスの問題を明らかにします。開始するには、[RUM SDK 構成でブラウザ プロファイリングが有効になっていることを確認してください][12]。
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" alt="イベント サンプルを分析する際のブラウザ プロファイリングの例。" style="width:100%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[2]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[3]: /ja/real_user_monitoring/application_monitoring/browser/setup/
[4]: /ja/real_user_monitoring/session_replay/
[5]: https://app.datadoghq.com/rum/vitals
[6]: https://app.datadoghq.com/rum/performance-monitoring
[8]: https://web.dev/articles/lcp/
[9]: https://web.dev/articles/fcp
[10]: https://web.dev/articles/cls/
[11]: https://web.dev/articles/inp/
[12]: /ja/real_user_monitoring/correlate_with_other_telemetry/profiling
[13]: /ja/real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks