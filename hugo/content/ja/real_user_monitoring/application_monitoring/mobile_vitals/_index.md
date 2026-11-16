---
aliases:
- /ja/real_user_monitoring/android/mobile_vitals
- /ja/real_user_monitoring/ios/mobile_vitals
- /ja/real_user_monitoring/flutter/mobile_vitals
- /ja/real_user_monitoring/reactnative/mobile_vitals
description: Android、iOS、Flutter、React Native 全体にわたり、起動時間、フレームレート、リソース使用量、パフォーマンスの時系列などの主要なモバイルパフォーマンスメトリクスを監視します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: ソースコード
  text: dd-sdk-android のソースコード
- link: https://github.com/DataDog/dd-sdk-ios
  tag: ソースコード
  text: dd-sdk-ios のソースコード
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: ソースコード
  text: dd-sdk-flutter のソースコード
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: ソースコード
  text: dd-sdk-reactnative のソースコード
- link: /real_user_monitoring/explorer/events/#performance-timeseries
  tag: ドキュメント
  text: パフォーマンス時系列パネルを調べる
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
title: モバイルバイタル
---
## 概要{#overview}

Real User Monitoring は、[Android Vitals][1] や [Apple の MetricKit][2] などのフレームワークにインスピレーションを得た一連のデータポイントを含む「モバイルバイタル」を提供し、モバイルアプリケーションの応答性、安定性、リソース消費に関するインサイトの取得に役立てることができます。「モバイルバイタル」は、不良、中程度、良好の 3 種類に分類されます。

アプリケーションのモバイルバイタルは、{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Summary{{< /ui >}} に移動してアプリケーションを選択することで表示できます。

{{< img src="real_user_monitoring/android/android-mobile-vitals.png" alt="[Performance Summary] タブのモバイルバイタル" style="width:90%;">}}

RUM モバイルアプリのパフォーマンスダッシュボードにアクセスするには、[{{< ui >}}Performance{{< /ui >}}] タブに切り替え、[{{< ui >}}View Dashboard{{< /ui >}}] リンクをクリックします。

{{< img src="real_user_monitoring/android/android-perf-dash-link.png" alt="[Performance] タブからモバイルパフォーマンスダッシュボードにアクセスする" style="width:90%;">}}

さまざまなアプリケーションバージョンにわたるデータポイントを表示する折れ線グラフを使用して、アプリケーションの全体的な健全性とパフォーマンスを把握します。アプリケーションのバージョンでフィルタリングしたり、特定のセッションやビューを確認したりするには、グラフをクリックします。

{{< img src="real_user_monitoring/android/android_mobile_vitals_3.png" alt="RUM Explorer でのイベントタイミングとモバイルバイタル" style="width:90%;">}}

RUM Explorer でビューを選択し、セッション内のアプリケーションのユーザーエクスペリエンスに直接相関する推奨ベンチマーク範囲を表示することもできます。[{{< ui >}}Refresh Rate Average{{< /ui >}}] などのメトリクスをクリックし、[{{< ui >}}Search Views With Poor Performance{{< /ui >}}] をクリックして、検索クエリにフィルターを適用し、追加のビューを調査します。

## テレメトリ{#telemetry}

以下のテレメトリは、モバイルアプリケーションのパフォーマンスに関するインサイトを提供します。

{{< tabs >}}
{{% tab "Android" %}}

| 測定値| 説明|
| --- | --- |
| リフレッシュレート| スムーズで [ジャンクのない][1]ユーザーエクスペリエンスを確保するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。<br /><br /> RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[メインスレッド表示リフレッシュレート][2]を追跡します。 <br /><br />  **注:** リフレッシュレートは 0 ～ 60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行されている場合、Datadog は [{{< ui >}}Mobile Vitals{{< /ui >}}] で 50fps と報告します。|
| 低速レンダリング| スムーズで[ジャンクのない][1]ユーザーエクスペリエンスを確保するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。<br /><br /> RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[表示リフレッシュレート][2]を追跡します。<br /><br /> 低速レンダリングで、どのビューが 16ms または 60Hz より長い時間を要しているかを監視できます。<br /> **注:** リフレッシュレートは 0 〜 60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行されている場合、Datadog は [{{< ui >}}Mobile Vitals{{< /ui >}}] で 50fps と報告します。|
| フリーズしたフレーム| レンダリングに 700ms 以上かかるフレームは、アプリケーション内でスタックして応答しないように見えます。これは[フリーズしたフレーム][3]として分類されます。<br /><br /> RUM は、完了までに 100ms 以上かかるタスクの `long task` イベントを追跡します。<br /><br /> フリーズしたフレームにより、どのビューがエンドユーザーに対してフリーズしている (レンダリングに 700ms 以上かかる) ように見えるかを監視し、アプリケーションのジャンクを解消できます。|
| アプリケーションが応答しない| アプリケーションの UI スレッドが 5 秒以上ブロックされると、`Application Not Responding` ([ANR][4]) エラーがトリガーされます。アプリケーションがフォアグラウンドにある場合、システムはユーザーにダイアログモーダルを表示し、アプリケーションを強制終了できるようにします。<br /><br />RUM は ANR の発生を追跡し、ANR が発生した際にメインスレッドをブロックしているスタックトレース全体をキャプチャします。|
| バージョン別のクラッシュフリーセッション| [アプリケーションのクラッシュ][5]は、通常、処理されない例外やシグナルによって引き起こされるアプリケーションの予期しない終了が原因で報告されます。アプリケーションのユーザーセッションでクラッシュが起きないことは、エンドユーザーの体験と全体的な満足度に直接対応します。<br /><br />RUM は完全なクラッシュレポートを追跡し、[Error Tracking][6] を使用して時間の経過に伴う傾向を表示します。<br /><br />セッションでクラッシュが起きなければ、業界ベンチマークに常に準拠し、Google Play ストアでアプリケーションのランキング上位を維持できます。|
| 1 秒あたりの CPU ティック数| CPU 使用率が高いと、ユーザーのデバイスの[バッテリー寿命][7]に影響します。 <br /><br />RUM は、ビューごとの 1 秒あたりの CPU ティック数と、セッション中の CPU 使用率を追跡します。推奨範囲は、良好な状態で 40 未満、中程度の状態で 60 未満です。<br /><br />アプリケーションの [{{< ui >}}Overview{{< /ui >}}] ページ内の [{{< ui >}}Mobile Vitals{{< /ui >}}] の下で、選択した期間中に平均して最も多くの CPU ティックが発生した上位のビューを確認できます。|
| メモリ使用率| メモリ使用量が多いと [OutOfMemoryError][8] が発生し、アプリケーションがクラッシュしてユーザーエクスペリエンスが低下する可能性があります。<br /><br />RUM は、セッション全体を通して、ビューごとにアプリケーションが使用した物理メモリ量をバイト単位で追跡します。推奨範囲は、良好な状態で 200MB 未満、中程度の状態で 400MB 未満です。<br /><br /> 選択した期間における平均メモリ消費量が最も多い上位のビューは、アプリケーションの [{{< ui >}}Overview{{< /ui >}}] ページの [{{< ui >}}Mobile Vitals{{< /ui >}}] で確認できます。|

[1]: https://developer.android.com/topic/performance/vitals/render#common-jank
[2]: https://developer.android.com/guide/topics/media/frame-rate
[3]: https://developer.android.com/topic/performance/vitals/frozen
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: https://developer.android.com/topic/performance/vitals/crash
[6]: /ja/real_user_monitoring/error_tracking/android
[7]: https://developer.android.com/topic/performance/power
[8]: https://developer.android.com/reference/java/lang/OutOfMemoryError

{{% /tab %}}
{{% tab "iOS" %}}

| 測定値| 説明|
| --- | --- |
| リフレッシュレート| スムーズでジャンクのないユーザーエクスペリエンスを確保するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。<br /><br />RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションのメインスレッド表示リフレッシュレートを追跡します。 <br /><br />  **注:** リフレッシュレートは 0 ～ 60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行されている場合、Datadog は [{{< ui >}}Mobile Vitals{{< /ui >}}] で 50fps と報告します。|
| 低速レンダリング| スムーズでジャンクのないユーザーエクスペリエンスを確保するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。<br /><br />RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの表示リフレッシュレートを追跡します。<br /><br /> 低速レンダリングで、どのビューが 16ms または 60Hz より長い時間を要しているかを監視できます。<br /> **注:** リフレッシュレートは 0 〜 60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行されている場合、Datadog は [{{< ui >}}Mobile Vitals{{< /ui >}}] で 50fps と報告します。|
| フリーズしたフレーム| レンダリングに 700ms 以上かかるフレームは、アプリケーション内でスタックして応答しないように見えます。これはフリーズしたフレームとして分類されます。<br /><br /> RUM は、完了までに 100ms 以上かかるタスクの `long task` イベントを追跡します。<br /><br /> フリーズしたフレームにより、どのビューがエンドユーザーに対してフリーズしている (レンダリングに 700ms 以上かかる) ように見えるかを監視し、アプリケーションのジャンクを解消できます。|
| バージョン別のクラッシュフリーセッション| [アプリケーションのクラッシュ][1]は、通常、処理されない例外やシグナルによって引き起こされるアプリケーションの予期しない終了が原因で報告されます。アプリケーションのユーザーセッションでクラッシュが起きないことは、エンドユーザーの体験と全体的な満足度に直接対応します。<br /><br />RUM は完全なクラッシュレポートを追跡し、[Error Tracking][2] を使用して時間の経過に伴う傾向を表示します。<br /><br />セッションでクラッシュが起きなければ、業界ベンチマークに常に準拠し、Apple App Store でアプリケーションのランキング上位を維持できます。|
| ハング率| Apple の定義によると、アプリケーションのハング率は「アプリが応答しない 1 時間あたりの秒数」に対応しており、250 ミリ秒を超える応答なしの期間のみがカウントされます。Datadog でアプリケーションのハング率を計算するには、[アプリのハングレポート][4]を有効にし、[専用セクション][5]の手順に従ってください。
| 1 秒あたりの CPU ティック数 | CPU 使用率が高いと、ユーザーのデバイスの[バッテリー寿命][3]に影響します。 <br /><br />RUM は、ビューごとの 1 秒あたりの CPU ティック数と、セッション中の CPU 使用率を追跡します。推奨範囲は、良好な状態で 40 未満、中程度の状態で 60 未満です。<br /><br />アプリケーションの [{{< ui >}}Overview{{< /ui >}}] ページ内の [{{< ui >}}Mobile Vitals{{< /ui >}}] の下で、選択した期間中に平均して最も多くの CPU ティックが発生した上位のビューを確認できます。|
| メモリ使用率| メモリ使用量が多いと [Watchdog による終了][6]につながる可能性があり、ユーザーエクスペリエンスが低下します。<br /><br />RUM は、セッション全体を通して、ビューごとにアプリケーションが使用した物理メモリ量をバイト単位で追跡します。推奨範囲は、良好な状態で 200MB 未満、中程度の状態で 400MB 未満です。<br /><br /> 選択した期間における平均メモリ消費量が最も多い上位のビューは、アプリケーションの [{{< ui >}}Overview{{< /ui >}}] ページの [{{< ui >}}Mobile Vitals{{< /ui >}}] で確認できます。|

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /ja/real_user_monitoring/ios/crash_reporting/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /ja/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-app-hang-reporting
[5]: /ja/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#compute-the-hang-rate-of-your-application
[6]: /ja/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting

{{% /tab %}}
{{% tab "Flutter" %}}

| 測定値| 説明|
| --- | --- |
| リフレッシュレート| スムーズで [ジャンクのない][1]ユーザーエクスペリエンスを確保するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。<br /><br /> RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[メインスレッド表示リフレッシュレート][2]を追跡します。 <br /><br />  **注:** リフレッシュレートは 0 ～ 60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行されている場合、Datadog は [{{< ui >}}Mobile Vitals{{< /ui >}}] で 50fps と報告します。|
| 低速レンダリング| スムーズで[ジャンクのない][1]ユーザーエクスペリエンスを確保するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。<br /><br /> RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[表示リフレッシュレート][2]を追跡します。<br /><br /> 低速レンダリングで、どのビューが 16ms または 60Hz より長い時間を要しているかを監視できます。<br /> **注:** リフレッシュレートは 0 〜 60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行されている場合、Datadog は [{{< ui >}}Mobile Vitals{{< /ui >}}] で 50fps と報告します。|
| フリーズしたフレーム| レンダリングに 700ms 以上かかるフレームは、アプリケーション内でスタックして応答しないように見えます。これは[フリーズしたフレーム][3]として分類されます。<br /><br /> RUM は、完了までに 100ms 以上かかるタスクの `long task` イベントを追跡します。<br /><br /> フリーズしたフレームにより、どのビューがエンドユーザーに対してフリーズしている (レンダリングに 700ms 以上かかる) ように見えるかを監視し、アプリケーションのジャンクを解消できます。|
| アプリケーションが応答しない| Android では、アプリケーションの UI スレッドが 5 秒以上ブロックされると、`Application Not Responding` ([ANR][4]) エラーがトリガーされます。アプリケーションがフォアグラウンドにある場合、システムはユーザーにダイアログモーダルを表示し、アプリケーションを強制終了できるようにします。<br /><br />RUM は ANR の発生を追跡し、ANR が発生した際にメインスレッドをブロックしているスタックトレース全体をキャプチャします。|
| バージョン別のクラッシュフリーセッション| [アプリケーションのクラッシュ][5]は、通常、処理されない例外やシグナルによって引き起こされるアプリケーションの予期しない終了が原因で報告されます。アプリケーションのユーザーセッションでクラッシュが起きないことは、エンドユーザーの体験と全体的な満足度に直接対応します。<br /><br />RUM は完全なクラッシュレポートを追跡し、[Error Tracking][8]を使用して時間の経過に伴う傾向を表示します。<br /><br />セッションでクラッシュが起きなければ、業界ベンチマークに常に準拠し、Google Play ストアでアプリケーションのランキング上位を維持できます。|
| 1 秒あたりの CPU ティック数| CPU 使用率が高いと、ユーザーのデバイスの[バッテリー寿命][6]に影響します。 <br /><br />RUM は、ビューごとの 1 秒あたりの CPU ティック数と、セッション中の CPU 使用率を追跡します。推奨範囲は、良好な状態で 40 未満、中程度の状態で 60 未満です。<br /><br />アプリケーションの [{{< ui >}}Overview{{< /ui >}}] ページ内の [{{< ui >}}Mobile Vitals{{< /ui >}}] の下で、選択した期間中に平均して最も多くの CPU ティックが発生した上位のビューを確認できます。|
| メモリ使用率 | メモリ使用率が高いと[メモリ不足によるクラッシュ][7]につながる可能性があり、ユーザーエクスペリエンスが低下します。<br /><br />RUM は、セッション全体を通して、ビューごとにアプリケーションが使用した物理メモリ量をバイト単位で追跡します。推奨範囲は、良好な状態で 200MB 未満、中程度の状態で 400MB 未満です。<br /><br />選択した期間における平均メモリ消費量が最も多い上位のビューは、アプリケーションの [{{< ui >}}Overview{{< /ui >}}] ページの [{{< ui >}}Mobile Vitals{{< /ui >}}] で確認できます。|
| ウィジェットのビルド時間| これは、UI スレッドでフレームをビルドするのにかかる時間です。スムーズなアニメーションを確保するため、60 FPS の場合は 16ms 以下、120 FPS の場合は 8ms 以下にする必要があります。<br /><br />この値が高い場合は、このビューのビルド方式の最適化を検討する必要があります。Flutter ドキュメントの [Control Build Cost][8] を参照してください。|
| ラスタライズ時間| これは、ラスタースレッドでフレームをラスタライズするのにかかる時間です。スムーズなアニメーションを確保するため、60 FPS の場合は 16ms 以下、120 FPS の場合は 8ms 以下にする必要があります。<br /><br />この値が高い場合、ビューのレンダリングが複雑であることを示している可能性があります。Flutter ドキュメントの [Identifying Problems in the GPU Graph][12] を参照してください。|

[1]: https://docs.flutter.dev/perf/ui-performance
[2]: https://docs.flutter.dev/tools/devtools/performance
[3]: https://developer.android.com/topic/performance/vitals/frozen
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: https://docs.flutter.dev/reference/crash-reporting
[6]: /ja/real_user_monitoring/error_tracking/flutter
[7]: https://docs.flutter.dev/perf/best-practices#build-and-display-frames-in-16ms
[8]: https://docs.flutter.dev/tools/devtools/memory
[9]: https://docs.flutter.dev/perf/best-practices#control-build-cost
[10]: https://docs.flutter.dev/perf/ui-performance#identifying-problems-in-the-gpu-graph

{{% /tab %}}
{{% tab "React Native" %}}

| 測定値| 説明|
| --- | --- |
| リフレッシュレート| スムーズで [ジャンクのない][1]ユーザーエクスペリエンスを確保するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。<br /><br /> RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[メインスレッド表示リフレッシュレート][2]を追跡します。 <br /><br />  **注:** リフレッシュレートは 0 ～ 60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行されている場合、Datadog は [{{< ui >}}Mobile Vitals{{< /ui >}}] で 50fps と報告します。|
| JS リフレッシュレート| スムーズで[ジャンクのない][1]ユーザーエクスペリエンスを確保するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。<br /><br />RUM は、`@view.js_refresh_rate.average`、`@view.js_refresh_rate.min`、および `@view.js_refresh_rate.max` ビュー属性を使用して、アプリケーションの [javascript スレッド表示リフレッシュレート][2]を追跡します。 <br /><br />  **注:** リフレッシュレートは 0 ～ 60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行されている場合、Datadog は [{{< ui >}}Mobile Vitals{{< /ui >}}] で 50fps と報告します。|
| 低速レンダリング| スムーズで[ジャンクのない][1]ユーザーエクスペリエンスを確保するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。<br /><br />低速レンダリングでは、平均フレームレートが 55fps 未満のビューを監視できます。 <br /><br />  **注:** リフレッシュレートは 0 ～ 60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行されている場合、Datadog は [{{< ui >}}Mobile Vitals{{< /ui >}}] で 50fps と報告します。|
| フリーズしたフレーム| レンダリングに 700ms 以上かかるフレームは、アプリケーション内でスタックして応答しないように見えます。これは[フリーズしたフレーム][3]として分類されます。<br /><br /> RUM は、完了までに 100ms 以上かかるタスクの `long task` イベントを追跡します。<br /><br /> フリーズしたフレームにより、どのビューがエンドユーザーに対してフリーズしている (レンダリングに 700ms 以上かかる) ように見えるかを監視し、アプリケーションのジャンクを解消できます。|
| アプリケーションが応答しない| アプリケーションの UI スレッドが 5 秒以上ブロックされると、`Application Not Responding` (ANR) エラーがトリガーされます。アプリケーションがフォアグラウンドにある場合、システムはユーザーにダイアログモーダルを表示し、アプリケーションを強制終了できるようにします。<br /><br />RUM は ANR の発生を追跡し、ANR が発生した際にメインスレッドをブロックしているスタックトレース全体をキャプチャします。|
| バージョン別のクラッシュフリーセッション| [アプリケーションのクラッシュ][4]は、通常、処理されない例外やシグナルによって引き起こされるアプリケーションの予期しない終了が原因で報告されます。アプリケーションのユーザーセッションでクラッシュが起きないことは、エンドユーザーの体験と全体的な満足度に直接対応します。<br /><br />RUM は完全なクラッシュレポートを追跡し、[Error Tracking][5]を使用して時間の経過に伴う傾向を表示します。<br /><br />セッションでクラッシュが起きなければ、業界ベンチマークに常に準拠し、Google Play ストアでアプリケーションのランキング上位を維持できます。|
| 1 秒あたりの CPU ティック数| CPU 使用率が高いと、ユーザーのデバイスの[バッテリー寿命][6]に影響します。 <br /><br />RUM は、ビューごとの 1 秒あたりの CPU ティック数と、セッション中の CPU 使用率を追跡します。推奨範囲は、良好な状態で 40 未満、中程度の状態で 60 未満です。<br /><br />アプリケーションの [{{< ui >}}Overview{{< /ui >}}] ページ内の [{{< ui >}}Mobile Vitals{{< /ui >}}] の下で、選択した期間中に平均して最も多くの CPU ティックが発生した上位のビューを確認できます。|
| メモリ使用率 | メモリ使用率が高いと[メモリ不足によるクラッシュ][7]につながる可能性があり、ユーザーエクスペリエンスが低下します。<br /><br />RUM は、セッション全体を通して、ビューごとにアプリケーションが使用した物理メモリ量をバイト単位で追跡します。推奨範囲は、良好な状態で 200MB 未満、中程度の状態で 400MB 未満です。<br /><br /> 選択した期間における平均メモリ消費量が最も多い上位のビューは、アプリケーションの [{{< ui >}}Overview{{< /ui >}}] ページの [{{< ui >}}Mobile Vitals{{< /ui >}}] で確認できます。|

[1]: http://jankfree.org/
[2]: https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames
[3]: https://firebase.google.com/docs/perf-mon/screen-traces?platform=ios#frozen-frames
[4]: https://docs.microsoft.com/en-us/appcenter/sdk/crashes/react-native
[5]: /ja/real_user_monitoring/ios/crash_reporting/
[6]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[7]: https://docs.sentry.io/platforms/apple/guides/ios/configuration/out-of-memory/

{{% /tab %}}
{{% tab "Unity" %}}

| 測定値| 説明|
| --- | --- |
| リフレッシュレート| スムーズでジャンクのないユーザーエクスペリエンスを確保するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。<br /><br />RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションのメインスレッド表示リフレッシュレートを追跡します。 <br /><br />  **注:** リフレッシュレートは 0 ～ 60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行されている場合、Datadog は [{{< ui >}}Mobile Vitals{{< /ui >}}] で 50fps と報告します。|
| 低速レンダリング| スムーズでジャンクのないユーザーエクスペリエンスを確保するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。<br /><br />RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの表示リフレッシュレートを追跡します。<br /><br /> 低速レンダリングで、どのビューが 16ms または 60Hz より長い時間を要しているかを監視できます。<br /> **注:** リフレッシュレートは 0 〜 60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行されている場合、Datadog は [{{< ui >}}Mobile Vitals{{< /ui >}}] で 50fps と報告します。|
| バージョン別のクラッシュフリーセッション| [アプリケーションのクラッシュ][1]は、通常、処理されない例外やシグナルによって引き起こされるアプリケーションの予期しない終了が原因で報告されます。アプリケーションのユーザーセッションでクラッシュが起きないことは、エンドユーザーの体験と全体的な満足度に直接対応します。<br /><br />RUM は完全なクラッシュレポートを追跡し、[Error Tracking][2] を使用して時間の経過に伴う傾向を表示します。<br /><br />セッションでクラッシュが起きなければ、業界ベンチマークに常に準拠し、Google Play ストアでアプリケーションのランキング上位を維持できます。|
| ハング率| Apple の定義によると、アプリケーションのハング率は「アプリが応答しない 1 時間あたりの秒数」に対応しており、250 ミリ秒を超える応答なしの期間のみがカウントされます。Datadog でアプリケーションのハング率を計算するには、[Datadog の設定][4]で [{{< ui >}}Track Non-Fatal App Hangs{{< /ui >}}] を有効にします。
| 1 秒あたりの CPU ティック数 | CPU 使用率が高いと、ユーザーのデバイスの[バッテリー寿命][3]に影響します。 <br /><br />RUM は、ビューごとの 1 秒あたりの CPU ティック数と、セッション中の CPU 使用率を追跡します。推奨範囲は、良好な状態で 40 未満、中程度の状態で 60 未満です。<br /><br />アプリケーションの [{{< ui >}}Overview{{< /ui >}}] ページ内の [{{< ui >}}Mobile Vitals{{< /ui >}}] の下で、選択した期間中に平均して最も多くの CPU ティックが発生した上位のビューを確認できます。|
| メモリ使用率| メモリ使用量が多いと [Watchdog による終了][6]につながる可能性があり、ユーザーエクスペリエンスが低下します。<br /><br />RUM は、セッション全体を通して、ビューごとにアプリケーションが使用した物理メモリ量をバイト単位で追跡します。推奨範囲は、良好な状態で 200MB 未満、中程度の状態で 400MB 未満です。<br /><br /> 選択した期間における平均メモリ消費量が最も多い上位のビューは、アプリケーションの [{{< ui >}}Overview{{< /ui >}}] ページの [{{< ui >}}Mobile Vitals{{< /ui >}}] で確認できます。|

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /ja/real_user_monitoring/error_tracking/mobile/unity/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /ja/real_user_monitoring/application_monitoring/unity/setup
[6]: /ja/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting

{{% /tab %}}

{{< /tabs >}}

## パフォーマンス時系列{#performance-timeseries}

{{< callout url="https://www.datadoghq.com/product-preview/rum-timeseries/" btn_hidden="false" header="プレビューに参加しましょう。">}}
パフォーマンス時系列はプレビュー版であり、デフォルトではデータ収集がオフになっています。有効にするには、プレビューに参加してください。Datadog は、参加するお客様にセットアップ手順を送信します。
{{< /callout >}}

パフォーマンス時系列は、iOS および Android SDK で利用可能です。

標準的なモバイルバイタルは、ビューの存続期間にわたって平均化されたメモリ使用率を報告します。パフォーマンス時系列は、セッション全体にわたって 1 秒ごとにメモリと CPU の使用量をキャプチャし、その結果をセッション、ビュー、および操作の[サイドパネル][3]にあるインタラクティブなグラフに表示します。

{{< img src="real_user_monitoring/mobile_vitals/timeseries-panel.png" alt="セッション全体にわたるインタラクティブなメモリおよび CPU グラフを表示する、RUM サイドパネルの「パフォーマンス時系列」セクション" style="width:100%;" >}}

収集が有効になると、すべてのセッションで時系列がキャプチャされます。

2 つの時系列が収集されます。

- **CPU 使用率**: アプリケーションによって消費された、すべてのコアにわたるデバイスの合計 CPU 容量の割合。これは、ビューについて報告される 1 秒ごとの CPU ティック数とは異なります。
- **メモリ**: SDK が既にビューのメモリバイタル用に収集している値と同じです。[iOS][4] および [Android][5] のビューメモリ収集を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/vitals
[2]: https://developer.apple.com/documentation/metrickit
[3]: /ja/real_user_monitoring/explorer/events/#performance-timeseries
[4]: /ja/real_user_monitoring/application_monitoring/ios/data_collected/#view-memory-collection
[5]: /ja/real_user_monitoring/application_monitoring/android/data_collected/#view-memory-collection