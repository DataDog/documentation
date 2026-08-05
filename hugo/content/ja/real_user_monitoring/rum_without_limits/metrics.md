---
description: RUM without Limits で利用できる標準のパフォーマンスメトリクスについて理解しましょう。
further_reading:
- link: /real_user_monitoring/rum_without_limits/
  tag: ドキュメント
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: ドキュメント
  text: リテンションフィルター
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: ガイド
  text: リテンションフィルターのベストプラクティス
private: true
title: メトリクスを用いたパフォーマンスの分析
---
## 概要

{{< img src="real_user_monitoring/rum_without_limits/filters.png" alt="Visualization of Android app crash-free sessions percentage over four weeks." style="width:90%" >}}{{< img src="real_user_monitoring/rum_without_limits/filters.png" alt="4 週間にわたる Android アプリのクラッシュなしセッション割合の可視化。" style="width:90%" >}}

Datadog は、アプリケーションのヘルスを経時的に包括的に把握するため、以下の標準メトリクスを提供しています。正確性を確保するため、これらのメトリクスはどのセッションを保持・破棄するかを決定する前の段階で計算されます。つまり、たとえセッションの 0.01% しか保持しない場合でも、これらのメトリクスは取り込まれたセッション全体 (100%) に基づいて計算されます。これらのメトリクスは、[パフォーマンスサマリー][1]で使用されており、アプリのパフォーマンスを正確に把握することができます。

**注**:
- 以下の表にある **Default** カーディナリティセットには、environment、app name、app ID、app version、service、OS name、OS version、browser name、country が含まれます。
- 以下のメトリクスのクエリにはすべて `@session.type:user` が含まれています。

| メトリクス名 | 説明 | 次元 | プラットフォーム |
|-------------|-------------|------------|----------|
| `app.startup_time` | アプリの起動時間 | Default, Percentiles breakdown | モバイルのみ |
| `error` | エラー数 | Default, Is Crash, View Name | モバイル & ブラウザ |
| `error.anr` | ANR (Android で発生するフリーズ) の数 | Default, Is Crash, View Name | モバイルのみ |
| `error.hang` | ハング (iOS で発生するフリーズ) の数 | Default | モバイルのみ |
| `error.hang.duration` | ハング (iOS で発生するフリーズ) の継続時間 | Default, View Name | モバイルのみ |
| `session` | セッション数 | Default | モバイル & ブラウザ |
| `session.action` | アクション数 | Default, Action Type, View Name | モバイル & ブラウザ |
| `session.crash_free` | クラッシュが発生しなかったセッション数 | Default | モバイルのみ |
| `session.errors` | セッションごとのエラー数 (@session.error.count) | Default, Percentiles breakdown | モバイル & ブラウザ |
| `session.frustration` | フラストレーションシグナルの数 | Default | モバイル & ブラウザ |
| `session.inactive` | 非アクティブなセッション数 | Default | モバイル & ブラウザ |
| `session.time_spent` | セッションの継続時間 | Default, Percentiles breakdown | モバイル & ブラウザ |
| `view` | ビュー数 | Default, View Name | モバイル & ブラウザ |
| `view.cpu_ticks_per_second` | 1 秒あたりの CPU ティック数 | Default, View Name | モバイルのみ |
| `view.crash_free` | クラッシュなしセッション率 | Default, View Name | モバイルのみ |
| `view.cumulative_layout_shift` | Cumulative Layout Shift | Default, Percentiles breakdown, View Name | ブラウザのみ |
| `view.loading_time` | ページが準備完了となり、ネットワークリクエストや DOM の変更が行われなくなるまでの時間 | Default, Percentiles breakdown, View Name | Mobile & Browserモバイル & ブラウザ |
| `view.error_free` | エラーが発生しなかったセッション数 | Default, View Name | モバイル & ブラウザ |
| `view.first_contentful_paint` | ブラウザが初めてテキスト、画像 (背景画像含む)、白以外のキャンバス、または SVG をレンダリングする時点 | Default, Percentiles breakdown, View Name | ブラウザのみ |
| `view.frozen_frame` | フローズンフレームの数 | Default, View Name | モバイルのみ |
| `view.frozen_frame_free` | フローズンフレームがないビューの数 | Default | モバイルのみ |
| `view.inactive` | 非アクティブなビューの数 | Default, Percentiles breakdown | モバイル & ブラウザ |
| `view.interaction_to_next_paint` | ユーザーがページとやり取りしてから次の描画が行われるまでの最長時間  | Default, Percentiles breakdown | ブラウザのみ |
| `view.interaction_to_next_view` | 前のビューで最後にユーザーが操作してから、次のビューが開始されるまでの時間 | Default, Percentiles breakdown | モバイルのみ |
| `view.largest_contentful_paint` | ビューポート (画面に見えている部分) で最も大きい DOM 要素がレンダリングされる時点 | Default, Percentiles breakdown, View Name | ブラウザのみ |
| `view.memory_average` | 使用されたシステムメモリの量 | Default, Percentiles breakdown | モバイルのみ |
| `view.network_settled` | ネットワークが落ち着いた状態 | Default, Percentiles breakdown | モバイルのみ |
| `view.refresh_rate_average` | ユーザーのリフレッシュレート (FPS) の平均値 | Default, Percentiles breakdown | モバイルのみ |
| `view.slow_rendered` | レンダリングが遅いビューの数 | Default | モバイルのみ |
| `view.time_spent` | 現在のビューに費やされた時間 | Default | モバイル & ブラウザ |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring