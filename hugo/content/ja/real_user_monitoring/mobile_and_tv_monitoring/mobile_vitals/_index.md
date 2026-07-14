---
aliases:
- /ja/real_user_monitoring/android/mobile_vitals
- /ja/real_user_monitoring/ios/mobile_vitals
- /ja/real_user_monitoring/flutter/mobile_vitals
- /ja/real_user_monitoring/reactnative/mobile_vitals
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
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
title: モバイルバイタル
---

## 概要

Real User Monitoring は、[Android Vitals][1] や [Apple の MetricKit][2] などのフレームワークにインスピレーションを得た一連のデータポイントを含む「モバイルバイタル」を提供し、モバイルアプリケーションの応答性、安定性、リソース消費に関するインサイトの取得に役立てることができます。「モバイルバイタル」は、不良、中程度、良好の 3 種類に分類されます。

アプリケーションのモバイルバイタルは、**Digital Experience > Performance Summary** に移動してアプリケーションを選択することで表示できます。

{{< img src="real_user_monitoring/android/android-mobile-vitals.png" alt="Performance Summary タブのモバイルバイタル" style="width:90%;">}}

RUM モバイルアプリのパフォーマンスダッシュボードにアクセスするには、**Performance** タブに切り替え、**View Dashboard** リンクをクリックします。

{{< img src="real_user_monitoring/android/android-perf-dash-link.png" alt="Performance タブからモバイルパフォーマンスダッシュボードにアクセス" style="width:90%;">}}

様々なアプリケーションのバージョンに渡るデータポイントを表示する折れ線グラフで、アプリケーションの全体的な健全性とパフォーマンスを理解することができます。アプリケーションのバージョンでフィルターをかけたり、特定のセッションやビューを表示するには、グラフをクリックしてください。

{{< img src="real_user_monitoring/android/android_mobile_vitals_3.png" alt="RUM エクスプローラーのイベントタイミングとモバイルバイタル" style="width:90%;">}}

また、RUM エクスプローラーでビューを選択し、セッションでのアプリケーションのユーザー体験に直接関連する推奨ベンチマーク範囲を観察することができます。**Refresh Rate Average** などのメトリクスをクリックし、**Search Views With Poor Performance** (パフォーマンスの悪いビューを検索) をクリックすると、検索クエリにフィルターが適用され、追加のビューが調査されます。

## テレメトリー

以下のテレメトリーで、モバイルアプリケーションのパフォーマンスに関するインサイトを提供します。

{{< tabs >}}
{{% tab "Android" %}}

| 測定項目 | 説明 |
| --- | --- |
| リフレッシュレート | スムーズで[素早い動作の][1]ユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br />  RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[メインスレッドディスプレイのフレッシュレート][2]を追跡します。<br /><br />  **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行している場合、Datadog の**モバイルバイタル**で 50fps と報告されます。|
| 遅延レンダリング | スムーズで[素早い動作の][1]ユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br />  RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[ディスプレイのフレッシュレート][2]を追跡します。<br /><br />  遅延レンダリングで、16ms または 60Hz 以上かかっているビューを監視できます。<br /> **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行している場合、Datadog の**モバイルバイタル**で 50fps と報告されます。 |
| フレームのフリーズ | 700ms 以上でレンダリングされるフレームは、アプリケーション上でスタック、または無反応のように見えます。これは[フレームのフリーズ][3]と分類されます。<br /><br />  RUM は、完了までに 100ms 以上かかったタスク実行時間のある `long task` イベントを追跡します。<br /><br />  フレームのフリーズで、エンドユーザーにフリーズしているように表示される (レンダリングに 700ms 以上かかっている) ビューを監視し、アプリケーション内の動作の遅れを排除できます。 |
| アプリケーションの無反応 | アプリケーションの UI スレッドが 5 秒以上ブロックされると、`Application Not Responding` ([ANR][4]) エラーがトリガーされます。アプリケーションが前景にある場合、システムによりユーザーにモーダルダイアログが表示され、アプリケーションの強制終了が可能になります。<br /><br />   RUM では、ANR の発生を追跡し、ANR が起きた場合にメインスレッドをブロックするスタックトレースの全体をキャプチャします。 |
| バージョン別クラッシュフリーセッション | 通常、未処理の例外またはシグナルが原因でアプリケーションが予期せず終了すると、[アプリケーションのクラッシュ][5]が報告されます。アプリケーションにおいて、クラッシュのないユーザーセッションはユーザーエクスペリエンスと全体的な満足度に直接的につながります。<br /><br />   RUM では、完全なクラッシュレポートを追跡し、[Error Tracking][6] で経時的な傾向を把握できます。<br /><br />  クラッシュフリーセッションで、業界基準の速度を維持し、Google Play ストアでアプリケーションを高位置にランク入りさせることが可能になります。 |
| 毎秒の CPU ティック | CPU の使用量が多いと、ユーザーのデバイスの[バッテリー寿命][7]に影響します。<br /><br />RUM は、各ビューの 1 秒あたりの CPU ティックと、セッション中の CPU 使用率を追跡します。推奨範囲は、良好な場合は 40 未満、中程度の場合は 60 未満です。<br /><br />選択した期間の平均で CPU ティック数が最も多い上位ビューは、アプリケーションの Overview ページの **Mobile Vitals** で見ることができます。 |
| メモリ使用状況 | メモリの使用量が多いと、[OutOfMemoryError][8] が発生し、アプリケーションがクラッシュして、ユーザーエクスペリエンスが低下する可能性があります。<br /><br />RUM は、セッション中に各ビューでアプリケーションが使用する物理メモリの量をバイト単位で追跡します。推奨範囲は、良好な場合は 200MB 未満、中程度の場合は 400MB 未満です。<br /><br />選択した期間の平均で最もメモリを消費した上位のビューは、アプリケーションの Overview ページの **Mobile Vitals** で確認できます。 |

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

| 測定項目 | 説明 |
| --- | --- |
| リフレッシュレート | スムーズで素早い動作のユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br />  RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションのメインスレッドディスプレイのフレッシュレートを追跡します。<br /><br />  **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行している場合、Datadog の**モバイルバイタル**で 50fps と報告されます。 |
| 遅延レンダリング | スムーズで素早い動作のユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br />  RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションのディスプレイのフレッシュレートを追跡します。<br /><br />  遅延レンダリングで、16ms または 60Hz 以上かかっているビューを監視できます。<br /> **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行している場合、Datadog の**モバイルバイタル**で 50fps と報告されます。 |
| フレームのフリーズ | 700ms 以上でレンダリングされるフレームは、アプリケーション上でスタック、または無反応のように見えます。これはフレームのフリーズと分類されます。<br /><br />  RUM は、完了までに 100ms 以上かかったタスク実行時間のある `long task` イベントを追跡します。<br /><br />  フレームのフリーズで、エンドユーザーにフリーズしているように表示される (レンダリングに 700ms 以上かかっている) ビューを監視し、アプリケーション内の動作の遅れを排除できます。 |
| バージョン別クラッシュフリーセッション | 通常、未処理の例外やシグナルによりアプリケーションが予期せず終了した場合、[アプリケーションのクラッシュ][1] が報告されます。アプリケーションにおいて、クラッシュのないユーザーセッションはユーザーエクスペリエンスと全体的な満足度に直接的につながります。<br /><br />   RUM では、完全なクラッシュレポートを追跡し、[Error Tracking][2] で経時的な傾向を把握できます。<br /><br />  クラッシュフリーセッションにより、業界のベンチマークに遅れを取ることなく、Apple App Store でアプリケーションを高いランキングに保つことができます。 |
| ハングレート | Apple の定義によると、アプリケーションのハングレートは、「250 ミリ秒以上の無応答の時間だけをカウントして、アプリが無応答である 1 時間あたりの秒数」に相当します。Datadog でアプリのハングレートを計算するには、[アプリハングレポート][4]を有効にし、[専用セクション][5]に従ってください。
| 毎秒の CPU ティック | CPU の使用量が多いと、ユーザーのデバイスの[バッテリー寿命][3]に影響します。<br /><br />RUM は、各ビューの 1 秒あたりの CPU ティックと、セッション中の CPU 使用率を追跡します。推奨範囲は、良好な場合は 40 未満、中程度の場合は 60 未満です。<br /><br />選択した期間の平均で CPU ティック数が最も多い上位ビューは、アプリケーションの Overview ページの **Mobile Vitals** で見ることができます。 |
| メモリ使用状況 | メモリの使用量が多いと、[Watchdog の終了][6]が発生し、ユーザーエクスペリエンスが低下する可能性があります。<br /><br />RUM は、セッション中に各ビューでアプリケーションが使用する物理メモリの量をバイト単位で追跡します。推奨範囲は、良好な場合は 200MB 未満、中程度の場合は 400MB 未満です。<br /><br />選択した期間の平均で最もメモリを消費した上位のビューは、アプリケーションの Overview ページの **Mobile Vitals** で確認できます。 |

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /ja/real_user_monitoring/ios/crash_reporting/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /ja/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-app-hang-reporting
[5]: /ja/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#compute-the-hang-rate-of-your-application
[6]: /ja/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting

{{% /tab %}}
{{% tab "Flutter" %}}

| 測定項目 | 説明 |
| --- | --- |
| リフレッシュレート | スムーズで[素早い動作の][1]ユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br />  RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[メインスレッドディスプレイのフレッシュレート][2]を追跡します。<br /><br />  **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行している場合、Datadog の**モバイルバイタル**で 50fps と報告されます。 |
| 遅延レンダリング | スムーズで[素早い動作の][1]ユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br />  RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[ディスプレイのフレッシュレート][2]を追跡します。<br /><br />  遅延レンダリングで、16ms または 60Hz 以上かかっているビューを監視できます。<br /> **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行している場合、Datadog の**モバイルバイタル**で 50fps と報告されます。 |
| フレームのフリーズ | 700ms 以上でレンダリングされるフレームは、アプリケーション上でスタック、または無反応のように見えます。これは[フレームのフリーズ][3]と分類されます。<br /><br />  RUM は、完了までに 100ms 以上かかったタスク実行時間のある `long task` イベントを追跡します。<br /><br />  フレームのフリーズで、エンドユーザーにフリーズしているように表示される (レンダリングに 700ms 以上かかっている) ビューを監視し、アプリケーション内の動作の遅れを排除できます。 |
| アプリケーションの無反応 | Android の場合、アプリケーションの UI スレッドが 5 秒以上ブロックされると、`Application Not Responding` ([ANR][4]) エラーがトリガーされます。アプリケーションが前景にある場合、システムによりユーザーにモーダルダイアログが表示され、アプリケーションの強制終了が可能になります。<br /><br />   RUM では、ANR の発生を追跡し、ANR が起きた場合にメインスレッドをブロックするスタックトレースの全体をキャプチャします。 |
| バージョン別クラッシュフリーセッション | 通常、未処理の例外またはシグナルが原因でアプリケーションが予期せず終了すると、[アプリケーションのクラッシュ][5]が報告されます。アプリケーションにおいて、クラッシュのないユーザーセッションはユーザーエクスペリエンスと全体的な満足度に直接的につながります。<br /><br />   RUM では、完全なクラッシュレポートを追跡し、[Error Tracking][8] で経時的な傾向を把握できます。<br /><br />  クラッシュフリーセッションで、業界基準の速度を維持し、Google Play ストアでアプリケーションを高位置にランク入りさせることが可能になります。 |
| 毎秒の CPU ティック | CPU の使用量が多いと、ユーザーのデバイスの[バッテリー寿命][6]に影響します。<br /><br />RUM は、各ビューの 1 秒あたりの CPU ティックと、セッション中の CPU 使用率を追跡します。推奨範囲は、良好な場合は 40 未満、中程度の場合は 60 未満です。<br /><br />選択した期間の平均で CPU ティック数が最も多い上位ビューは、アプリケーションの Overview ページの **Mobile Vitals** で見ることができます。 |
| メモリ使用状況 | メモリの使用量が多いと、[メモリ不足によるクラッシュ][7]が発生し、ユーザーエクスペリエンスが低下する可能性があります。<br /><br />RUM は、セッション中に各ビューでアプリケーションが使用する物理メモリの量をバイト単位で追跡します。推奨範囲は、良好な場合は 200MB 未満、中程度の場合は 400MB 未満です。<br /><br />選択した期間の平均で最もメモリを消費した上位のビューは、アプリケーションの Overview ページの **Mobile Vitals** で確認できます。 |
| ウィジェット構築時間 | これは UI スレッドでフレームを構築するのにかかる時間です。スムーズなアニメーションを保証するために、60 FPS の場合は 16ms、120 FPS の場合は 8ms を超えないようにしてください。<br /><br />この値が高い場合は、このビューの構築方法を最適化する必要があることを意味します。Flutter ドキュメントの [Control Build Cost][8] を参照してください。 |
| ラスター時間 | これはラスタースレッドでフレームをラスタライズするのにかかる時間です。スムーズなアニメーションを保証するために、60 FPS の場合は 16ms、120 FPS の場合は 8ms を超えないようにしてください。<br /><br />この値が高い場合は、ビューのレンダリングが複雑であることを意味します。Flutter ドキュメントの [Identifying Problems in the GPU Graph][12] を参照してください。 |

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

| 測定項目 | 説明 |
| --- | --- |
| リフレッシュレート | スムーズで[素早い動作の][1]ユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br />  RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[メインスレッドディスプレイのフレッシュレート][2]を追跡します。<br /><br />  **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行している場合、Datadog の**モバイルバイタル**で 50fps と報告されます。 |
| JS リフレッシュレート | スムーズで[素早い動作の][1]ユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br />  RUM は、`@view.js_refresh_rate.average`、`@view.js_refresh_rate.min` および `@view.js_refresh_rate.max` ビュー属性を使用して、アプリケーションの [JavaScript スレッドディスプレイのフレッシュレート][2]を追跡します。<br /><br />  **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行している場合、Datadog の**モバイルバイタル**で 50fps と報告されます。 |
| 遅延レンダリング | スムーズで[素早い動作の][1]ユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br /> 遅延レンダリングでは、平均フレームレートが 55fps 未満のビューを監視できます。<br /><br />  **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行している場合、Datadog の**モバイルバイタル**で 50fps と報告されます。 |
| フレームのフリーズ | 700ms 以上でレンダリングされるフレームは、アプリケーション上でスタック、または無反応のように見えます。これは[フレームのフリーズ][3]と分類されます。<br /><br />  RUM は、完了までに 100ms 以上かかったタスク実行時間のある `long task` イベントを追跡します。<br /><br />  フレームのフリーズで、エンドユーザーにフリーズしているように表示される (レンダリングに 700ms 以上かかっている) ビューを監視し、アプリケーション内の動作の遅れを排除できます。 |
| アプリケーションの無反応 | アプリケーションの UI スレッドが 5 秒以上ブロックされると、`Application Not Responding` (ANR) エラーがトリガーされます。アプリケーションが前景にある場合、システムによりユーザーにモーダルダイアログが表示され、アプリケーションの強制終了が可能になります。<br /><br />   RUM では、ANR の発生を追跡し、ANR が起きた場合にメインスレッドをブロックするスタックトレースの全体をキャプチャします。 |
| バージョン別クラッシュフリーセッション | 通常、未処理の例外またはシグナルが原因でアプリケーションが予期せず終了すると、[アプリケーションのクラッシュ][4]が報告されます。アプリケーションにおいて、クラッシュのないユーザーセッションはユーザーエクスペリエンスと全体的な満足度に直接的につながります。<br /><br />   RUM では、完全なクラッシュレポートを追跡し、[Error Tracking][5] で経時的な傾向を把握できます。<br /><br />  クラッシュフリーセッションで、業界基準の速度を維持し、Google Play ストアでアプリケーションを高位置にランク入りさせることが可能になります。 |
| 毎秒の CPU ティック | CPU の使用量が多いと、ユーザーのデバイスの[バッテリー寿命][6]に影響します。<br /><br />RUM は、各ビューの 1 秒あたりの CPU ティックと、セッション中の CPU 使用率を追跡します。推奨範囲は、良好な場合は 40 未満、中程度の場合は 60 未満です。<br /><br />選択した期間の平均で CPU ティック数が最も多い上位ビューは、アプリケーションの Overview ページの **Mobile Vitals** で見ることができます。 |
| メモリ使用状況 | メモリの使用量が多いと、[メモリ不足によるクラッシュ][7]が発生し、ユーザーエクスペリエンスが低下する可能性があります。<br /><br />RUM は、セッション中に各ビューでアプリケーションが使用する物理メモリの量をバイト単位で追跡します。推奨範囲は、良好な場合は 200MB 未満、中程度の場合は 400MB 未満です。<br /><br />選択した期間の平均で最もメモリを消費した上位のビューは、アプリケーションの Overview ページの **Mobile Vitals** で確認できます。 |

[1]: http://jankfree.org/
[2]: https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames
[3]: https://firebase.google.com/docs/perf-mon/screen-traces?platform=ios#frozen-frames
[4]: https://docs.microsoft.com/en-us/appcenter/sdk/crashes/react-native
[5]: /ja/real_user_monitoring/ios/crash_reporting/
[6]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[7]: https://docs.sentry.io/platforms/apple/guides/ios/configuration/out-of-memory/

{{% /tab %}}
{{% tab "Unity" %}}

| 測定項目 | 説明 |
| --- | --- |
| リフレッシュレート | スムーズで素早い動作のユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br />  RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションのメインスレッドディスプレイのフレッシュレートを追跡します。<br /><br />  **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行している場合、Datadog の**モバイルバイタル**で 50fps と報告されます。 |
| 遅延レンダリング | スムーズで素早い動作のユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br />  RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションのディスプレイのフレッシュレートを追跡します。<br /><br />  遅延レンダリングで、16ms または 60Hz 以上かかっているビューを監視できます。<br /> **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行している場合、Datadog の**モバイルバイタル**で 50fps と報告されます。 |
| バージョン別クラッシュフリーセッション | 通常、未処理の例外またはシグナルが原因でアプリケーションが予期せず終了すると、[アプリケーションのクラッシュ][5]が報告されます。アプリケーションにおいて、クラッシュのないユーザーセッションはユーザーエクスペリエンスと全体的な満足度に直接的につながります。<br /><br />   RUM では、完全なクラッシュレポートを追跡し、[Error Tracking][2] で経時的な傾向を把握できます。<br /><br />  クラッシュフリーセッションで、業界基準の速度を維持し、Google Play ストアでアプリケーションを高位置にランク入りさせることが可能になります。 |
| ハングレート | Apple の定義によると、アプリケーションのハングレートは、「250 ミリ秒以上の無応答の時間だけをカウントして、アプリが無応答である 1 時間あたりの秒数」に相当します。Datadog でアプリのハングレートを計算するには、[Datadog の設定][4]で "Track Non-Fatal App Hangs" を有効にしてください。
| 毎秒の CPU ティック | CPU の使用量が多いと、ユーザーのデバイスの[バッテリー寿命][3]に影響します。<br /><br />RUM は、各ビューの 1 秒あたりの CPU ティックと、セッション中の CPU 使用率を追跡します。推奨範囲は、良好な場合は 40 未満、中程度の場合は 60 未満です。<br /><br />選択した期間の平均で CPU ティック数が最も多い上位ビューは、アプリケーションの Overview ページの **Mobile Vitals** で見ることができます。 |
| メモリ使用状況 | メモリの使用量が多いと、[Watchdog の終了][6]が発生し、ユーザーエクスペリエンスが低下する可能性があります。<br /><br />RUM は、セッション中に各ビューでアプリケーションが使用する物理メモリの量をバイト単位で追跡します。推奨範囲は、良好な場合は 200MB 未満、中程度の場合は 400MB 未満です。<br /><br />選択した期間の平均で最もメモリを消費した上位のビューは、アプリケーションの Overview ページの **Mobile Vitals** で確認できます。 |

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /ja/real_user_monitoring/error_tracking/mobile/unity/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/unity
[6]: /ja/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting

{{% /tab %}}

{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/vitals
[2]: https://developer.apple.com/documentation/metrickit