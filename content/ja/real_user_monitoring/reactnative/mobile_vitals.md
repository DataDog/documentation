---
description: React Native プロジェクトから RUM データを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative のソースコード
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: RUM データの調査方法
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: ブログ
  text: React Native アプリケーションの監視
kind: documentation
title: モバイル バイタル
---
## 概要

リアルユーザーモニタリングは、一連のメトリクスを提供するモバイルバイタルを提供し、モバイルアプリケーションの応答性、安定性、リソース消費に関するインサイトの取得に役立てることができます。モバイルバイタルは、不良、中程度、良好の 3 種類です。

アプリケーションの Mobile Vitals は、**UX Monitoring > Performance Monitoring** に移動してアプリケーションを選択することで表示できます。

{{< img src="real_user_monitoring/react_native/react-native-mobile-vitals.png" alt="Performance タブの Mobile Vitals" style="width:90%;">}}

RUM モバイルアプリのパフォーマンスダッシュボードにアクセスするには、**Performance** タブに切り替え、**View Dashboard** リンクをクリックします。

{{< img src="real_user_monitoring/react_native/react-native-perf-dash-link.png" alt="Performance タブからモバイルパフォーマンスダッシュボードにアクセス" style="width:90%;">}}

様々なアプリケーションのバージョンに渡るメトリクスを表示する折れ線グラフで、アプリケーションの全体的な健全性とパフォーマンスを理解することができます。アプリケーションのバージョンでフィルターをかけたり、特定のセッションやビューを表示するには、グラフをクリックしてください。

{{< img src="real_user_monitoring/react_native/rum_explorer_mobile_vitals-3.png" alt="RUM エクスプローラーのイベントタイミングとモバイルバイタル" style="width:90%;">}}

また、RUM エクスプローラーでビューを選択し、セッションでのアプリケーションのユーザー体験に直接関連する推奨ベンチマーク範囲を観察することができます。**Refresh Rate Average** などのメトリクスをクリックし、**Search Views With Poor Performance** (パフォーマンスの悪いビューを検索) をクリックすると、検索クエリにフィルターが適用され、追加のビューが調査されます。

## メトリクス

以下のメトリクスは、モバイルアプリケーションのパフォーマンスを把握するためのものです。
| 測定値                    | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| リフレッシュレート                   | スムーズなユーザー体験を実現するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。 <br /><br />  RUM は、ビュー属性 `@view.refresh_rate_average` と `@view.refresh_rate_min` を使用して、アプリケーションの[メインスレッドディスプレイのリフレッシュレート][10]を追跡します。 <br /><br />  **注:** リフレッシュレートは、ゼロから 60fps の範囲で正規化されます。例えば、アプリケーションが 120fps のレンダリングが可能なデバイス上で 100fps で実行されている場合、Datadog は **Mobile Vitals** で 50fps を報告します。                              |
| JS リフレッシュレート                   | スムーズで[ジャンクのない][3]ユーザー体験を保証するために、アプリケーションは 60Hz 以下でフレームをレンダリングする必要があります。 <br /><br /> RUM は、`@view.js_refresh_rate.average`、`@view.js_refresh_rate.min`、`@view.js_refresh_rate.max` ビュー属性を使用して、アプリケーションの [javascript スレッドディスプレイのリフレッシュレート][10]を追跡します。 <br /><br /> **注:** リフレッシュレートは、ゼロから 60fps の範囲で正規化されます。例えば、アプリケーションが 120fps のレンダリングが可能なデバイス上で 100fps で実行されている場合、Datadog は **Mobile Vitals** で 50fps を報告します。                                                                                                  |
| スローレンダリング                   | スムーズで[ジャンクのない][3]ユーザー体験を保証するために、アプリケーションは 60Hz 以下でフレームをレンダリングする必要があります。<br /><br />スローレンダリングでは、平均フレームレートが 55fps 未満のビューを監視できます。 <br /><br /> **注:**リフレッシュレートは、ゼロから 60fps の範囲で正規化されます。例えば、アプリケーションが 120fps のレンダリングが可能なデバイス上で 100fps で動作している場合、Datadog は **Mobile Vitals** で 50fps を報告します。                                   |
| フリーズフレーム                  | レンダリングに 700ms 以上かかるフレームは、アプリケーション上で固まったように表示され、反応が悪くなります。これは、[フリーズフレーム][5]と呼ばれます。 <br /><br />  RUM は `long task` イベントを追跡し、完了までに 100ms 以上かかるタスクの持続時間を記録します。 <br /><br />  フリーズフレームを使用すると、エンドユーザーにフリーズしている (レンダリングに 700ms 以上かかっている) ように見えるビューを監視し、アプリケーション内のジャンクを排除することができます。                                                                                                                                                                                                 |
| アプリケーションが応答しない｜アプリケーションの UI スレッドが 5 秒以上ブロックされると、`Application Not Responding` (ANR) エラーがトリガーされます。アプリケーションがフォアグラウンドにある場合、システムはユーザーにダイアログモーダルを表示し、ユーザーがアプリケーションを強制終了できるようにします。<br /><br />RUM は ANR の発生を追跡し、ANR に遭遇したときにメインスレッドをブロックするスタックトレースをすべてキャプチャします。                              |
| バージョン別クラッシュフリーセッション | [アプリケーションクラッシュ][7]とは、通常、処理されない例外やシグナルによって引き起こされる、アプリケーションの予期せぬ終了によって報告されるものです。アプリケーションのクラッシュのないユーザーセッションは、エンドユーザーの体験と全体的な満足度に直接対応します。<br /><br />   RUM は、完全なクラッシュレポートを追跡し、[エラー追跡][7]によって時系列で傾向を示しています。 <br /><br />  クラッシュフリーセッションにより、業界のベンチマークに遅れをとることなく、Google Play Store でアプリケーションを上位にランクインさせることができます。                                                                                                 |
| CPU ティック/秒           | CPU の使用量が多いと、ユーザーの端末の[バッテリー駆動時間][8]に影響します。  <br /><br />  RUM は、各ビューの 1 秒あたりの CPU ティックと、セッション期間中の CPU 使用率を追跡します。推奨される範囲は、良好な場合は 40 未満、中程度の場合は 60 未満です。<br /><br />  アプリケーションの Overview ページの **Mobile Vitals** で、選択した期間の平均で CPU ティック数が最も多いトップビューを見ることができます。                                                                                                                                                                                                                                                                                                                                                        |
| メモリ使用率             | メモリの使用量が多いと、[メモリ不足によるクラッシュ][9]が発生し、ユーザーエクスペリエンスが低下する原因となります。 <br /><br />  RUM は、セッション期間中、各ビューでアプリケーションが使用する物理メモリの量をバイト単位で追跡します。推奨される範囲は、良好な場合は 200MB 未満、中程度の場合は 400MB 未満です。<br /><br />  アプリケーションの Overview ページの **Mobile Vitals** で、選択した期間の平均で最もメモリを消費したトップビューを見ることができます。                                                                                                                                                                                                                                                                                            |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.apple.com/documentation/metrickit
[2]: https://app.datadoghq.com/rum/explorer
[3]: http://jankfree.org/
[4]: https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames
[5]: https://firebase.google.com/docs/perf-mon/screen-traces?platform=ios#frozen-frames
[6]: https://docs.microsoft.com/en-us/appcenter/sdk/crashes/react-native
[7]: /ja/real_user_monitoring/ios/crash_reporting/
[8]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[9]: https://docs.sentry.io/platforms/apple/guides/ios/configuration/out-of-memory/
[10]: https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames