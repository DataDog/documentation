---
aliases:
- /ja/real_user_monitoring/browser/monitoring_performance_vitals/
- /ja/real_user_monitoring/browser/optimizing_performance/
description: '[RUM Optimization] (RUM 最適化) ページで、Core Web Vitals 分析とユーザーエクスペリエンスの可視化を使用してブラウザのパフォーマンス問題を特定し、トラブルシューティングを行います。'
further_reading:
- link: /synthetics/browser_tests/
  tag: ドキュメント
  text: Synthetic Monitoring でブラウザテストを構成する
- link: https://learn.datadoghq.com/courses/rum-optimize-frontend-performance
  tag: ラーニングセンター
  text: 'インタラクティブラボ: Datadog RUM Browser Monitoring でフロントエンドのパフォーマンスを最適化する'
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/
  tag: ブログ
  text: Datadog RUM および Synthetic モニタリングでウェブに関する主な指標を監視
- link: https://www.datadoghq.com/blog/rum-optimization/
  tag: ブログ
  text: 'データからアクションへ: Datadog RUM で Core Web Vitals などを最適化する'
title: パフォーマンスの最適化
---
## 概要{#overview}

{{< img src="real_user_monitoring/browser/optimizing_performance/optimization-workflow.mp4" alt="RUM Performance Optimization は、実際のユーザーのトラフィックに基づいて、ブラウザのパフォーマンス問題の根本原因を見つけるのに役立ちます。" video="true" >}}

[Optimization] (最適化) ページは、実際のユーザーのトラフィックデータを使用してブラウザのパフォーマンス問題の根本原因を特定するのに役立ちます。[Core Web Vitals][1] (CWV) や、ユーザーの視点からページ全体の読み込み時間を評価する Datadog 独自の [Loading Time][2] KPI などのブラウザ KPI を使用して、ページの低速化の原因をトラブルシューティングします。

より詳細な分析のために、[Optimization] (最適化) ページにはブラウザ、地域、アプリバージョンなどのユーザー属性別に Core Web Vitals の詳細な内訳が表示されます。この情報を使用して、経時的なパフォーマンスの傾向を追跡し、最も影響を受けているユーザーグループを把握して、最適化の優先順位を正確に付けることができます。

## 前提条件 {#prerequisites}

アプリケーションを最適化するには、以下を使用していることを確認してください。

- [RUM Browser SDK][3] バージョン 5.4.0 以上
- 少なくとも一部のセッションで [Session Replay][4] を使用

## バイタルの選択 {#selecting-a-vital}

[[{{< ui >}}Digital Experience{{< /ui >}}] > [{{< ui >}}Performance Monitoring{{< /ui >}}] (パフォーマンスモニタリング)][6] タブにある [[Optimization] (最適化) ページ][5]に移動します。

{{< img src="real_user_monitoring/browser/optimizing_performance/page-selectors.png" alt="[Optimization] (最適化) ページでは最もアクセス数の多いページや特定のページを確認できます。" style="width:100%;" >}}

このビューからページまたはバイタルを選択する方法は 2 つあります。

- 最もアクセス数の多いページのツリーマップから選択する
- 入力ボックスにビュー名を入力してページを選択する

利用可能なバイタルは以下のとおりです。

- **[Loading Time (LT)][2]**: ページが読み込まれるまでの時間をユーザーの視点から測定する Datadog 独自の KPI です。
- **[Largest Contentful Paint (LCP)][8]**: ページ上で最も大きな視覚要素が読み込まれる速さを測定します。これは、ユーザーエクスペリエンスと SEO ランキングの両方において重要です。LCP が遅い場合、ユーザーが不満を感じ、直帰率が上昇し、検索の可視性が低下する可能性があります。[Optimization] (最適化) ページでは、LCP がサブパート (Time to First Byte (TTFB)、リソース読み込み遅延、リソース読み込み時間、レンダリング遅延) に分解されるため、どのフェーズが全体的な指標に最も寄与しているかを特定できます。
- **[First Contentful Paint (FCP)][9]**: ユーザーがページに最初に移動してから、ページコンテンツの一部が画面にレンダリングされるまでの時間を測定します。FCP が速い場合、ページ読み込みが進んでいることがユーザーに伝わり、安心感を与えることができます。
- **[Cumulative Layout Shift (CLS)][10]**: ページのライフサイクルで発生する予期しないレイアウトシフトの最大バーストを測定します。レイアウトシフトは、ユーザーが操作することなく、レンダリングされるフレーム間で表示される要素の位置が移動し、ページの視覚的な安定性が損なわれるときに発生します。これはユーザーが予期しないレイアウトシフトを経験する頻度を定量化するのに役立つため、視覚的な安定性を測定するための重要な KPI です。CLS が低いほど、ページの快適性が高まります。
- **[Interaction to Next Paint (INP)][11]**: ユーザーがページを操作してから、ページが視覚的に応答するまでにかかる時間を測定します。[Optimization] (最適化) ページでは、INP がサブパート (入力遅延、処理時間、表示遅延) に分解されるため、ボトルネックがメインスレッドの競合、ハンドラーの実行、レンダリングのいずれであるかを特定できます。

## フィルタリングと評価 {#filter-and-evaluate}

ページとバイタルを選択したら、パフォーマンスインサイトを分析します。

- 右上隅で期間を調整する
- ドロップダウンを使用して属性でフィルタリングする
- [{{< ui >}}Show Filter Breakdown{{< /ui >}}] (フィルターの内訳を表示) でグループを選択する
- さまざまなパーセンタイルでバイタルを評価する

たとえば pc75 評価は 75 パーセンタイル値を表しています。これは CWV で一般的に使用されています。

{{< img src="real_user_monitoring/browser/optimizing_performance/filter-and-evaluate.png" alt="選択したビューのバイタルをフィルタリングして評価します。" style="width:100%;" >}}

## ユーザーの体験を視覚化 {#visualize-the-users-experience}

ページの次の部分では、ユーザーが実際に何を体験しているかを正確に視覚化するのに役立ちます。

選択した期間とトラフィックに基づいて、[Optimization] (最適化) ページでは、選択したバイタルがキャプチャされたときにユーザーがページで見る最も典型的な例がハイライトされます。[Session Replay][4] を使用している場合、ここでページのビジュアルが表示されます。

一部のバイタルでは、[{{< ui >}}See a different element{{< /ui >}}] (異なる要素を表示) をクリックして、調査する他のページバージョンを選択することもできます。

{{< img src="real_user_monitoring/browser/optimizing_performance/vitals-visualize.png" alt="異なる要素を選択して、ユーザーの体験をプレビューおよび視覚化します。" style="width:100%;" >}}

Largest Contentful Paint および Interaction to Next Paint の場合、[Optimization] (最適化) ページにメトリックの個々のフェーズへの内訳も表示されます。内訳を使用して、どのフェーズが全体的なメトリックに最も寄与しているかを特定し、関連するフェーズに対して最適化作業を直接行います。各サブパートの詳細については、[サブパートを使用した Core Web Vitals の診断][14]を参照してください。

## リソースとエラーのトラブルシューティング {#troubleshoot-resources-and-errors}

トラブルシューティングセクションでは、ユーザーに対してページ上に表示されたリソースとエラーのうち、バイタルのパフォーマンスに影響を与えた可能性があるリソースとエラーを確認できます。たとえば Largest Contentful Paint (LCP) の場合、LCP がトリガーされるまでに読み込まれたリソースを確認できます。LCP は、ページ上で最大の要素が読み込まれるまでにかかる時間を示す指標であるため、以下を調査できます。

- それ以前に起こることが遅延やレンダリングの問題を引き起こしている可能性
- 特に遅いまたは大きなリソースがパフォーマンスの問題に寄与している可能性
- 繰り返し発生するエラーが問題を引き起こしている可能性

{{< img src="real_user_monitoring/browser/optimizing_performance/troubleshoot.png" alt="[Troubleshooting] (トラブルシューティング) セクションでは、ユーザーに対してページ上で発生したリソースとエラーのうち、バイタルのパフォーマンスに影響を与えた可能性があるリソースとエラーが表示されます。" style="width:100%;" >}}

## イベントサンプルの表示 {#view-event-samples}

ページのアクティビティ全体を文脈に合わせて確認するには、イベントのウォーターフォールとタイムラインまでスクロールします。ウォーターフォールには、バイタルがキャプチャされた時点までのイベントタイムラインが表示されます。

以下に示すように、左上のドロップダウンを使用して別のサンプルイベントを選択し、ウォーターフォール内の任意のイベントをクリックしてサイドパネルを表示することができます。

{{< img src="real_user_monitoring/browser/optimizing_performance/view-event-samples.png" alt="イベントサンプルを表示し、ページのアクティビティ全体を文脈に合わせて確認します。" style="width:100%;" >}}

## イベントサンプル内のブラウザプロファイリング {#browser-profiling-within-event-samples}
より詳細な根本原因分析を行うには、ブラウザプロファイリングを RUM と併用し、低速化や応答性の低下を引き起こしている JavaScript アクティビティまたはレンダリングアクティビティを特定します。プロファイリングにより、Core Web Vitals だけでは必ずしも可視化されるとは限らないパフォーマンスの問題が明らかになります。開始するには、[RUM SDK 構成でブラウザプロファイリングが有効になっていることを確認します][12]。
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" alt="イベントサンプルを分析する際のブラウザプロファイリングの例。" style="width:100%;" >}}

## Lighthouse 監査 {#lighthouse-audits}

[Lighthouse][15] は、パフォーマンス、アクセシビリティ、ベストプラクティス、SEO、エージェントによるブラウジングなどのカテゴリでページを評価する Google のオープンソースツールであり、ユーザー体験の低下やフラストレーションをもたらす原因を特定して修正できます。

[ブラウザ Synthetic テスト][7]は、Lighthouse 監査を実行し、そのスコアを対応する RUM ビューに送信できます。Lighthouse のラボ測定値は、このページの実際のユーザーのフィールドデータを補完します。このため、スケジュールに沿ってフロントエンドの品質を追跡できます。

監査はテスト実行ごとに 1 回、テストが到達する最終 URL に対して実行され、0 から 100 までの 5 つのカテゴリスコアを報告します。

- **パフォーマンス**: ページの読み込み、コンテンツの表示、インタラクティブになるまでの速さを測定します。
- **アクセシビリティ**: 自動チェックに基づき、障害を持つ人々がどれだけ適切にページをナビゲートして利用できるかを測定します。
- **ベストプラクティス**: セキュリティ、ブラウザの互換性、コード品質に関する最新の標準にページが準拠しているかどうかを測定します。
- **SEO**: 検索エンジンがページを発見し、理解し、インデックス化できるかどうかを測定します。
- **エージェント**: AI エージェントがページをどれだけ適切に理解し、ナビゲートし、操作できるかを測定します。

### 前提条件 {#prerequisites-1}

- 管理されている (Datadog) ロケーションから**デスクトップ Chrome** 上で実行される[ブラウザ Synthetic テスト][7]。
- [テストで RUM データ収集が有効化されており][16]、RUM アプリケーションが選択されている。このテストは、読み込むページに RUM Browser SDK を注入するため、テスト対象のサイトで個別に RUM の計測を実装する必要はありません。
- テストが保存され、スケジュールに従って、またはオンデマンドで実行される必要がある。監査は、テストの作成中や記録中、または CI/CD からトリガーされた実行では実行されません。

### Lighthouse 監査をセットアップする {#set-up-a-lighthouse-audit}

Lighthouse 監査は、RUM アプリケーションまたは Synthetic Monitoring から有効にできます。

- **RUM アプリケーションから**: [Optimization] (最適化) ページで、まだ Lighthouse データがないビューを選択し、[{{< ui >}}Lighthouse{{< /ui >}}] パネルが空の状態で [{{< ui >}}Create a Synthetics test{{< /ui >}}] (Synthetics テストを作成する) を選択します。RUM データ収集と Lighthouse 監査が自動的に有効になり、テストが RUM アプリケーションにリンクされます。テストの構成を完了して保存ます。
- **Synthetic Monitoring から**:[ブラウザテスト][7]を作成または編集し、[RUM データ収集][16]を有効にして RUM アプリケーションを選択してから、[{{< ui >}}Run Lighthouse audit{{< /ui >}}] (Lighthouse 監査を実行する) をオンにします (RUM データ収集が有効な場合のみ利用可能です)。監査するページに到達するまでのステップを記録し、テストを保存します。

### Lighthouse の結果を表示する {#view-lighthouse-results}

テストの実行後、Lighthouse の結果は [[{{< ui >}}Digital Experience{{< /ui >}}] (デジタルエクスペリエンス) > [{{< ui >}}Performance Monitoring{{< /ui >}}] (パフォーマンスモニタリング)][6] の下の 2 か所に表示されます。Lighthouse パネルとテーブルの範囲は、アプリケーション、ビュー、および期間のみによって設定されます。ブラウザ、国、チームなどの他のページフィルターは適用されません。

**[Optimization] (最適化) ページ**では、1 つのビューが選択されている場合、[{{< ui >}}Lighthouse{{< /ui >}}] パネルには選択した期間におけるそのビューの最新の監査結果が表示されます。

- 5 つのカテゴリスコアゲージ
- 前期間と比較した各カテゴリスコアの変化
- Lighthouse によって測定されたラボメトリクス
- 合格および不合格の監査の数
- スコアの経時的推移

パネルから、レポートを Lighthouse ビューアーで開くか、JSON としてダウンロードするか、または元の Synthetic テスト結果を開くことができます。

{{< img src="real_user_monitoring/browser/optimizing_performance/lighthouse-panel.png" alt="カテゴリスコア、ラボメトリクス、監査結果、およびスコアの経時的推移が表示されている [Lighthouse] パネル。" style="width:100%;" >}}

**[Performance Monitoring] (パフォーマンスモニタリング) 概要ページ** の [{{< ui >}}Lighthouse{{< /ui >}}] セクションには、ビュー間でスコアを比較する [**Lighthouse scores by view**] (ビュー別の Lighthouse スコア) テーブルが表示されます。パーセンタイルセレクター (デフォルトは p75) を使用して、テーブルに表示する選択期間内の監査スコアのパーセンタイルを選択し、行を選択してそのビューの [Optimization] (最適化) ページを開きます。

{{< img src="real_user_monitoring/browser/optimizing_performance/lighthouse-scores-by-view.png" alt="RUM ビュー間のカテゴリスコアの比較とパーセンタイルセレクターが表示されている [Lighthouse scores by view] (ビュー別 Lighthouse スコア) テーブル。" style="width:100%;" >}}

### メトリクスと属性{#metrics-and-attributes}

`@synthetics.lighthouse_audited` 属性は、監査対象の各ビューで `true` に設定されます。[RUM Explorer][17] で監査対象のビューを見つけるには、イベントタイプを [{{< ui >}}Views{{< /ui >}}] (ビュー) に切り替えて `@synthetics.lighthouse_audited:true` を検索します。監査対象のビューは実際のユーザーセッションではなく Synthetic テストから取得されるため、クエリから`@session.type:user` フィルターを削除してください。

カテゴリスコアはメトリクスとして利用できるため、ダッシュボードでカテゴリスコアをグラフ化したり、モニターを使用して悪化時にアラートを送信したりできます。

- `rum.measure.lighthouse.performance`
- `rum.measure.lighthouse.accessibility`
- `rum.measure.lighthouse.best_practices`
- `rum.measure.lighthouse.seo`
- `rum.measure.lighthouse.agentic`

Lighthouse スコアメトリクスには、タグ `application.id` と`view.name` が付けられています。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[2]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[3]: /ja/real_user_monitoring/application_monitoring/browser/setup/
[4]: /ja/session_replay/
[5]: https://app.datadoghq.com/rum/vitals
[6]: https://app.datadoghq.com/rum/performance-monitoring
[8]: https://web.dev/articles/lcp/
[9]: https://web.dev/articles/fcp
[10]: https://web.dev/articles/cls/
[11]: https://web.dev/articles/inp/
[12]: /ja/real_user_monitoring/correlate_with_other_telemetry/profiling
[13]: /ja/real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks
[14]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#diagnose-core-web-vitals-with-subparts
[7]: /ja/synthetics/browser_tests/
[15]: https://developer.chrome.com/docs/lighthouse/overview/
[16]: /ja/synthetics/guide/explore-rum-through-synthetics/
[17]: /ja/real_user_monitoring/explorer/