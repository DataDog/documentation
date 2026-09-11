---
description: アプリケーションのパフォーマンスメトリクスを完全に可視化しつつ、必要な RUM データだけを保持しましょう。
further_reading:
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: ドキュメント
  text: 保持フィルターを用いたデータの保持
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: ガイド
  text: 保持フィルターのベストプラクティス
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: ドキュメント
  text: メトリクスを用いたパフォーマンスの分析
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: ドキュメント
  text: 保持クォータを用いたコストの管理
- link: https://www.datadoghq.com/blog/rum-without-limits/
  tag: ブログ
  text: 'RUM without Limits™の紹介: すべてをキャプチャし、重要なものを保持する'
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: ラーニングセンター
  text: 'インタラクティブラボ: RUM 保持フィルター'
title: RUM without Limits
---
<div class="alert alert-info">RUM without Limits は、非コミット型の RUM プランを使用しているお客様に対して自動的に有効になります。この機能を有効にするには、アカウントチームまたは <a href="/help/">Datadog サポート</a>にお問い合わせください。</div>

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-overview.png" alt="推定使用量メトリクスの詳細のサイドパネル" style="width:90%" >}}

## 概要 {#overview}

RUM without Limits は、セッションデータの取り込みとインデックス化を切り離すことで RUM セッションのボリュームを柔軟に扱えるようにします。これにより、次のことが可能になります。

- 事前のサンプリング設定やコード変更なしに、Datadog の UI から保持フィルターを動的に設定
- エラーやパフォーマンス上の問題があるセッションを保持し、ユーザー操作の少ないセッションなど、重要度の低いものを破棄

セッションのごく一部しか保持しなくても、Datadog は取り込んだすべてのセッションに対して[パフォーマンスメトリクス][1]を提供します。これにより、セッションデータの一部しか保持していなくても、アプリケーションの健全性とパフォーマンスを正確かつ長期的に把握できます。

**注**: RUM without Limits モードでは、[パフォーマンスモニタリングの概要ページ][7]でデフォルトのフィルターのみを使用できます。これにより、データがサンプリングされ、イベント属性よりも利用可能なタグが少ないため、全データセットを確認でき、歪んだパフォーマンスメトリクスを防ぐことができます。

このページでは、可観測性の予算に合わせて RUM セッション量を管理するのに役立つ RUM without Limits の重要なコンポーネントを示します。

### 新規アプリケーションの場合 {#for-new-applications}

新規アプリケーションで RUM without Limits を利用開始するには、[インスツルメンテーション][2]の段階で次の設定を行ってください。

1. `sessionSampleRate` を 100% に設定する。Datadog では、最適な可視性とメトリクスの正確性のために、このレートで設定することを推奨しています。

2. 観測ニーズに合った `sessionReplaySampleRate` を選択する。

3. [APM 連携を有効][3]にしているアプリケーションでは、`traceSampleRate` (ブラウザ)、`traceSampler` (Android)、`sampleRate` (iOS) を用いて、APM バックエンドトレースを取り込みたいセッションの割合を設定する。

4. `traceContextInjection: sampled` を有効にし、RUM SDK がトレースを保持しないと決定したセッションに対してバックエンドトレーサーが独自のサンプリング決定を行えるようにする。

   <div class="alert alert-danger">ステップ 1、3、および 4 は、APM トレースの取り込みに影響する可能性があります。取り込まれるスパンの量が安定した状態にするには、 <code>traceSampleRate</code> を以前に設定されていた <code>sessionSampleRate</code>に設定します。たとえば、以前は 10% に設定していた <code>sessionSampleRate</code> を RUM without Limits 用に 100% に引き上げる場合は、同じ量のトレースを取り込むために <code>traceSampleRate</code> を 100% から 10% に下げます。</div>

5. アプリケーションをデプロイして設定を適用します。

### 既存アプリケーションの場合 {#for-existing-applications}
既存の RUM ユーザーが RUM without Limits をフルに活用するには、アプリケーションを再デプロイする必要があります。すべてのアプリケーションにおいて、セッションサンプリングレートを 100% に設定してください。

#### ステップ1: サンプリングレートの調整 {#step-1-adjust-sampling-rates}
すでにリプレイを収集している場合、セッションサンプリングレートを上げると、同数のリプレイを収集するにはリプレイサンプリングレートを下げる必要があります (以下の例を参照)。リプレイサンプリングレートは既存のセッションサンプリングレートをベースに計算されます。

変更前:

```java
   sessionSampleRate: 20,
   sessionReplaySampleRate: 10,
```

変更後:

```java
   sessionSampleRate: 100,
   sessionReplaySampleRate: 2,
```

1. [**Digital Experiences > Real User Monitoring > Manage Applications**][4] に移動します。
1. 移行したいアプリケーションをクリックします。
1. **SDK Configuration** タブをクリックします。
1. `sessionSampleRate` が100%に設定されていることを確認します。
1. Session Sample Rate を引き上げる前と同じリプレイ数になるように `sessionReplaySampleRate` を設定します。
1. 生成されたコードスニペットを使用してソースコードを更新し、アプリケーションを再デプロイして新しい設定を反映させます。

#### ステップ 2: トレースの調整 {#step-2-adjust-tracing}

`sessionSampleRate` を引き上げた場合、RUM SDK がバックエンドトレースのサンプリング決定を上書きして相関をとることができるため、取り込まれる APM スパンが増える可能性があります。

これを抑制するには、`traceSampleRate` を 100% より低い値 (以前に設定していた `sessionSampleRate` 程度) に設定し、RUM SDK がトレースを保持しないと決定したセッションに対してバックエンド SDK が独自のサンプリング決定を行えるよう `traceContextInjection: sampled` を設定してください。

#### ステップ 3: 保持フィルターの作成 {#step-3-create-retention-filters}

モバイルアプリでは、多くのバージョンが同時に存在する可能性があります。しかし、既存バージョンでは必ずしも 100% のセッションが送信されていないため、新たに保持フィルターを作成すると、これらのバージョンで Datadog に送られるデータが減少する場合があります。

Datadog では、SDK のサンプリングレート設定が 100% かどうかにかかわらず、すべてのアプリケーションバージョンで同じ保持フィルターを作成することを推奨しています。最終的には、古いバージョンで一部セッションが送られなくても、重要なセッションはすべて収集されるためです。

[保持フィルターのベストプラクティス][5]で推奨される保持フィルターおよびユースケースを参照してください。

## 次のステップ {#next-steps}

[保持フィルター][6]を作成して構成します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/rum_without_limits/metrics
[2]: /ja/real_user_monitoring/application_monitoring/browser/setup/
[3]: /ja/real_user_monitoring/platform/connect_rum_and_traces/
[4]: https://app.datadoghq.com/rum/list
[5]: /ja/real_user_monitoring/guide/retention_filter_best_practices/
[6]: /ja/real_user_monitoring/rum_without_limits/retention_filters
[7]: https://app.datadoghq.com/rum/performance-monitoring