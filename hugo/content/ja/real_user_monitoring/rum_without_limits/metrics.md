---
description: RUM without Limits で利用できる標準のパフォーマンスメトリクスについて理解しましょう。
further_reading:
- link: /real_user_monitoring/rum_without_limits/
  tag: ドキュメント
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: ドキュメント
  text: 保持フィルター
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: ドキュメント
  text: 保持クォータを用いたコストの管理
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: ガイド
  text: 保持フィルターのベストプラクティス
title: メトリクスを用いたパフォーマンスの分析
---
## 概要{#overview}

{{< img src="real_user_monitoring/rum_without_limits/filters-rum-measure-view.png" alt="過去 4 週間において Android アプリのクラッシュが発生しなかったセッションの割合の可視化。" style="width:90%" >}}

Datadog は、以下のすぐに利用可能なメトリクスを提供します。これらのメトリクスは、経時的なアプリケーションの健全性の包括的な概要を示します。精度を確保するため、これらのメトリクスはセッションを保持または破棄する前に計算されます。つまり、セッションの 0.01% のみを保持する場合でも、これらのメトリクスは取り込まれたセッションの 100% に基づいて計算されます。これらのメトリクスから、アプリのパフォーマンスの正確な概要を示す[パフォーマンスの概要][1]が形成されます。

**注**:
- 以下の表の {{< ui >}}Default{{< /ui >}} カーディナリティセットには、environment、app name、app ID、app version、service、OS name、OS version、browser name、country が含まれます。
- 以下のメトリクスに対するすべてのクエリには `@session.type:user` が含まれます。ただし、`rum.measure.lighthouse.*` メトリクスは例外で、実際のユーザーセッションではなくブラウザの Synthetic テスト監査から取得されます。[Lighthouse 監査][5]を参照してください。
- 以下にリストされているメトリクス以外のパフォーマンスメトリクスが必要な場合は、RUM イベントから[カスタムメトリクス][2]を作成できます。OOTB メトリクスとカスタムメトリクスはいずれも、取り込まれたトラフィックの 100% に基づいて計算されます。
- 一部のメトリクスは、セッションまたはビューが最初に検出された時点でキャプチャされます。その他のメトリクスは、セッションまたはビューが非アクティブになった時点でキャプチャされます。これらのメトリクスを短い時間枠で比較すると、予期しない比率が生成されることがあります。[メトリクスが計算されるタイミング](#when-metrics-are-computed)を参照してください。

| メトリクス名 | 説明 | ディメンション | プラットフォーム |
|-------------|-------------|------------|----------|
| `rum.measure.app.startup_to_full_display` | アプリケーション起動時に完全に表示されるまでの時間 | Default、Percentiles breakdown| モバイルのみ |
| `rum.measure.app.startup_to_initial_display` | アプリケーション起動時に最初に表示されるまでの時間 | Default、Percentiles breakdown | モバイルのみ |
| `rum.measure.error` | エラー数 | Default、Is Crash、View Name | モバイルおよびブラウザ |
| `rum.measure.error.anr` | ANR (Android のフリーズ) の数| Default、Is Crash、View Name | モバイルのみ |
| `rum.measure.error.hang` | ハング (iOS のフリーズ) の数| Default | モバイルのみ |
| `rum.measure.error.hang.duration` | ハング (iOS のフリーズ) の継続時間 | Default、View Name | モバイルのみ |
| `rum.measure.lighthouse.performance` | Lighthouse パフォーマンスカテゴリのスコア (0 ～ 100) | App ID、View Name | ブラウザのみ |
| `rum.measure.lighthouse.accessibility` | Lighthouse アクセシビリティカテゴリのスコア (0 ～ 100) | App ID、View Name | ブラウザのみ |
| `rum.measure.lighthouse.best_practices` | Lighthouse ベストプラクティスカテゴリのスコア (0 ～ 100) | App ID、View Name | ブラウザのみ |
| `rum.measure.lighthouse.seo` | Lighthouse SEO カテゴリのスコア (0 ～ 100) | App ID、View Name | ブラウザのみ |
| `rum.measure.lighthouse.agentic` | Lighthouse Agentic カテゴリのスコア (0 ～ 100) | App ID、View Name | ブラウザのみ |
| `rum.measure.session` | セッション数 | Default | モバイルおよびブラウザ |
| `rum.measure.session.action` | アクション数 | Default | モバイルおよびブラウザ |
| `rum.measure.session.crash_free` | クラッシュが発生しなかったセッション数 | Default | モバイルのみ |
| `rum.measure.session.error` | セッションあたりのエラー数 (@session.error.count) | Default、Percentiles breakdown | モバイルおよびブラウザ |
| `rum.measure.session.frustration` | フラストレーションシグナルの数 | Default | モバイルおよびブラウザ |
| `rum.measure.session.inactive` | 非アクティブなセッションの数 | Default | モバイルおよびブラウザ |
| `rum.measure.session.time_spent` | セッションの継続時間 | Default、Percentiles breakdown | モバイルおよびブラウザ |
| `rum.measure.view` | ビューの数 | Default、View Name | モバイルおよびブラウザ |
| `rum.measure.view.cpu_ticks_per_second` | 1 秒あたりの CPU ティック | Default、View Name | モバイルのみ |
| `rum.measure.view.crash_free` | クラッシュなしセッション率 | Default、View Name | モバイルのみ |
| `rum.measure.view.cumulative_layout_shift` | Cumulative Layout Shift | Default、Percentiles breakdown、View Name | ブラウザのみ |
| `rum.measure.view.loading_time` | ページが準備完了となり、ネットワークリクエストや DOM の変更が行われなくなるまでの時間| Default、Percentiles breakdown、View Name | モバイルおよびブラウザ |
| `rum.measure.view.error_free` | エラーが発生しなかったセッションの数 | Default、View Name | モバイルおよびブラウザ |
| `rum.measure.view.first_contentful_paint` | ブラウザがテキスト、画像 (背景画像を含む)、白色以外のキャンバス、または SVG を初めてレンダリングした時刻 | Default、パーセンタイル内訳、View Name | ブラウザのみ |
| `rum.measure.view.frozen_frame` | フリーズしたフレームの数 | Default、View Name | モバイルのみ |
| `rum.measure.view.frozen_frame_free` | フリーズしたフレームがないビューの数 | Default | モバイルのみ |
| `rum.measure.view.inactive` | 非アクティブなビューの数 | Default、Percentiles breakdown | モバイルおよびブラウザ |
| `rum.measure.view.interaction_to_next_paint` | ユーザーがページを操作してから、次の描画が行われるまでの最長の時間。 | Default、Percentiles breakdown | ブラウザのみ |
| `rum.measure.view.interaction_to_next_view` | 前のビューでの最後にユーザーが操作してから、現在のビューが開始されるまでの時間 | Default、Percentiles breakdown | モバイルのみ |
| `rum.measure.view.largest_contentful_paint` | ビューポート (画面に見えている部分) で最も大きい DOM 要素がレンダリングされる時点| Default、Percentiles breakdown、View Name | ブラウザのみ |
| `rum.measure.view.memory` | システムメモリの使用量 | Default、Percentiles breakdown | モバイルのみ |
| `rum.measure.view.network_settled` | ネットワークが安定している状態 | Default、Percentiles breakdown | モバイルのみ |
| `rum.measure.view.refresh_rate` | ユーザーのリフレッシュレート (FPS) の平均値 | Default、Percentiles breakdown | モバイルのみ |
| `rum.measure.view.slow_rendered` | レンダリングが遅いビューの数 | Default | モバイルのみ |
| `rum.measure.view.time_spent` | 現在のビューでの滞在時間 | Default | モバイルおよびブラウザ |

## メトリクスが計算されるタイミング {#when-metrics-are-computed}

メトリクスは、セッションまたはビューのライフサイクルのさまざまな時点でキャプチャされます。

- {{< ui >}}On detection{{< /ui >}}: `rum.measure.session` と `rum.measure.view`は、セッションまたはビューが最初に検出された時点でキャプチャされます。
- {{< ui >}}On inactivity{{< /ui >}}: `rum.measure.session.inactive`、`rum.measure.session.crash_free`、`rum.measure.view.inactive`、`rum.measure.view.crash_free` などのメトリクスは、セッションまたはビューが非アクティブになった時点 (つまりセッションまたはビューが終了した時点) でキャプチャされます。

ある時間枠で開始されたセッションやビューが別の時間枠で終了する可能性があるため、短い時間枠で検出時メトリクスと非アクティブ時メトリクスを比較すると、100% を超える比率値などの予期しない結果が生じることがあります。

たとえば、前日の多くのセッションがアクティブなままで、本日に終了した場合、本日カウントされる非アクティブなセッション数が、本日開始されたセッション数を超える可能性があります。これは、クラッシュなしセッション率 (`rum.measure.session.crash_free` / `rum.measure.session`) のような比率が 100% を超える値を返す操作が正当である可能性があることを意味します。これは予期されている動作です。

**推奨事項**: 検出時メトリクスと非アクティブ時メトリクスを組み合わせた比率を計算する場合は、ほとんどのセッションの開始と終了を捉えるのに十分な長さの時間枠 (例: 1 週間以上) を使用してください。

## API{#api}

メトリクスは、[API][3] または Datadog 専用の [Terraform モジュール][4]を使用して管理できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /ja/real_user_monitoring/platform/generate_metrics/
[3]: /ja/api/latest/rum-metrics/
[4]: https://registry.terraform.io/providers/DataDog/datadog/3.60.0/docs/resources/rum_metric
[5]: /ja/real_user_monitoring/application_monitoring/browser/optimizing_performance/#lighthouse-audits