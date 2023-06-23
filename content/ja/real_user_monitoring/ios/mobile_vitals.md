---
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_mobile_vitals.md
description: iOS プロジェクトから RUM データを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
  text: dd-sdk-ios ソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
kind: documentation
title: モバイル バイタル
---
## 概要

リアルユーザーモニタリングは、[MetricKit][1] にインスピレーションを得た、一連のメトリクスを提供するモバイルバイタルを提供し、モバイルアプリケーションの応答性、安定性、リソース消費に関するインサイトの取得に役立てることができます。モバイルバイタルは、不良、中程度、良好の 3 種類です。

アプリケーションのモバイルバイタルは、**UX Monitoring > Performance Summary** に移動してアプリケーションを選択することで表示できます。

{{< img src="real_user_monitoring/ios/ios_mobile_vitals-3.png" alt="Performance タブのモバイルバイタル" style="width:90%;">}}

RUM モバイルアプリのパフォーマンスダッシュボードにアクセスするには、アプリケーションサマリーページから Monitor Performance Metrics セクションまでスクロールダウンし、**Performance Overview** をクリックします。

{{< img src="real_user_monitoring/ios/ios-performance-dashboard.png" alt="Performance Summary タブから iOS のモバイルパフォーマンスダッシュボードにアクセス" style="width:90%;">}}

様々なアプリケーションのバージョンに渡るメトリクスを表示する折れ線グラフで、アプリケーションの全体的な健全性とパフォーマンスを理解することができます。アプリケーションのバージョンでフィルターをかけたり、特定のセッションやビューを表示するには、グラフをクリックしてください。

{{< img src="real_user_monitoring/ios/rum_explorer_mobile_vitals.png" alt="RUM エクスプローラーのイベントタイミングとモバイルバイタル" style="width:90%;">}}

また、RUM エクスプローラーでビューを選択し、セッションでのアプリケーションのユーザー体験に直接関連する推奨ベンチマーク範囲を観察することができます。**Refresh Rate Average** などのメトリクスをクリックし、**Search Views With Poor Performance** (パフォーマンスの悪いビューを検索) をクリックすると、検索クエリにフィルターが適用され、追加のビューが調査されます。

## メトリクス

以下のメトリクスは、モバイルアプリケーションのパフォーマンスを把握するためのものです。
| 測定値                    | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| スローレンダリング                   | スムーズなユーザー体験を実現するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。 <br /><br />  RUM は、ビュー属性 `@view.refresh_rate_average` と `@view.refresh_rate_min` を使用して、アプリケーションの[ディスプレイのリフレッシュレート][3]を追跡します。 <br /><br />  スローレンダリングでは、どのビューのレンダリングに 16ms または 60Hz 以上の時間がかかっているかを監視することができます。 <br /> **注:**リフレッシュレートは、ゼロから 60fps の範囲で正規化されます。例えば、アプリケーションが 120fps のレンダリングが可能なデバイス上で 100fps で動作している場合、Datadog は **Mobile Vitals** で 50fps を報告します。 |
| フリーズフレーム                  | レンダリングに 700ms 以上かかるフレームは、アプリケーション上で固まったように表示され、反応が悪くなります。これは、[フリーズフレーム][4]と呼ばれます。 <br /><br />  RUM は `long task` イベントを追跡し、完了までに 100ms 以上かかるタスクの持続時間を記録します。 <br /><br />  フリーズフレームを使用すると、エンドユーザーにフリーズしている (レンダリングに 700ms 以上かかっている) ように見えるビューを監視し、アプリケーション内のジャンクを排除することができます。                                                                                                                                                                                                 |
| バージョン別クラッシュフリーセッション | [アプリケーションクラッシュ][7]とは、通常、処理されない例外やシグナルによって引き起こされる、アプリケーションの予期せぬ終了によって報告されるものです。アプリケーションのクラッシュのないユーザーセッションは、エンドユーザーの体験と全体的な満足度に直接対応します。 <br /><br />   RUM は、完全なクラッシュレポートを追跡し、[エラー追跡][6]によって時系列で傾向を示しています。 <br /><br />  クラッシュフリーセッションにより、業界のベンチマークに遅れをとることなく、Google Play Store でアプリケーションを上位にランクインさせることができます。                                                                                                 |
| CPU ティック/秒           | CPU の使用量が多いと、ユーザーの端末の[バッテリー駆動時間][7]に影響します。  <br /><br />  RUM は、各ビューの 1 秒あたりの CPU ティックと、セッション期間中の CPU 使用率を追跡します。推奨される範囲は、良好な場合は 40 未満、中程度の場合は 60 未満です。<br /><br />  アプリケーションの Overview ページの **Mobile Vitals** で、選択した期間の平均で CPU ティック数が最も多いトップビューを見ることができます。                                                                                                                                                                                                                                                                                                                                                        |
| メモリ使用率             | メモリの使用量が多いと、[メモリ不足によるクラッシュ][8]が発生し、ユーザーエクスペリエンスが低下する原因となります。 <br /><br />  RUM は、セッション期間中、各ビューでアプリケーションが使用する物理メモリの量をバイト単位で追跡します。推奨される範囲は、良好な場合は 200MB 未満、中程度の場合は 400MB 未満です。<br /><br />  アプリケーションの Overview ページの **Mobile Vitals** で、選択した期間の平均で最もメモリを消費したトップビューを見ることができます。                                                                                                                                                                                                                                                                                            |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.apple.com/documentation/metrickit
[2]: https://developer.android.com/topic/performance/vitals/render#common-jank
[3]: https://developer.android.com/guide/topics/media/frame-rate
[4]: https://developer.android.com/topic/performance/vitals/frozen
[5]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[6]: /ja/real_user_monitoring/ios/crash_reporting/
[7]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[8]: https://developer.android.com/reference/java/lang/OutOfMemoryError