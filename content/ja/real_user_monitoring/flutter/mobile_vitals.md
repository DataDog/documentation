---
description: Flutter Monitoring で収集されるモバイルバイタルについて説明します。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: ブログ
  text: Datadog Mobile RUM による Flutter アプリケーションのパフォーマンス監視
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter のソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
kind: documentation
title: モバイル バイタル
---
## 概要

リアルユーザーモニタリングは、一連のメトリクスを提供するモバイルバイタルを提供し、モバイルアプリケーションの応答性、安定性、リソース消費に関するインサイトの取得に役立てることができます。モバイルバイタルは、不良、中程度、良好の 3 種類です。

アプリケーションのモバイルバイタルの概要は、**UX Monitoring > Performance Summary** に移動してアプリケーションを選択することで表示できます。

{{< img src="real_user_monitoring/flutter/flutter-mobile-vitals-1.png" alt="Performance Summary  タブのモバイルバイタル" style="width:90%;">}}

RUM モバイルアプリのパフォーマンスダッシュボードにアクセスするには、アプリケーションサマリーページから Monitor Performance Metrics セクションまでスクロールダウンし、**Performance Overview** をクリックします。

{{< img src="real_user_monitoring/flutter/flutter-performance-overview.png" alt="モバイルパフォーマンス概要ダッシュボード" style="width:90%;">}}

様々なアプリケーションのバージョンに渡るメトリクスを表示する折れ線グラフで、アプリケーションの全体的な健全性とパフォーマンスを理解することができます。アプリケーションのバージョンでフィルターをかけたり、特定のセッションやビューを表示するには、グラフをクリックしてください。

{{< img src="real_user_monitoring/flutter/rum_explorer_mobile_vitals-3.png" alt="RUM エクスプローラーのイベントタイミングとモバイルバイタル" style="width:90%;">}}

また、RUM エクスプローラーでビューを選択し、セッションでのアプリケーションのユーザー体験に直接関連する推奨ベンチマーク範囲を観察することができます。**Refresh Rate Average** などのメトリクスをクリックし、**Search Views With Poor Performance** (パフォーマンスの悪いビューを検索) をクリックすると、検索クエリにフィルターが適用され、追加のビューが調査されます。

## メトリクス

以下のメトリクスは、モバイルアプリケーションのパフォーマンスを把握するためのものです。
| 測定値                    | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| リフレッシュレート | スムーズで[素早い動作の][3]ユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br /> RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[メインスレッドディスプレイのリフレッシュレート][9]を追跡します。<br /><br /> **注:** リフレッシュレートは、0～60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で動作している場合、Datadog の **Mobile Vitals** で 50fps と報告されます。 |
| スローレンダリング                   | スムーズなユーザー体験を実現するために、アプリケーションは 60Hz 未満でフレームをレンダリングする必要があります。 <br /><br />  RUM は、ビュー属性 `@view.refresh_rate_average` と `@view.refresh_rate_min` を使用して、アプリケーションの[ディスプレイのリフレッシュレート][4]を追跡します。 <br /><br />  スローレンダリングでは、どのビューのレンダリングに 16ms 以上の時間がかかっているか、または 60Hz を下回っているかを監視することができます。 <br /> **注:**リフレッシュレートは、0～60fps の範囲で正規化されます。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で動作している場合、Datadog の **Mobile Vitals** で 50fps と報告されます。 |
| フリーズフレーム                  | レンダリングに 700ms 以上かかるフレームは、アプリケーション上で固まったように表示され、反応が悪くなります。これは、[フリーズフレーム][5]と呼ばれます。 <br /><br />  RUM は `long task` イベントを追跡し、完了までに 100ms 以上かかるタスクの持続時間を記録します。 <br /><br />  フリーズフレームを使用すると、エンドユーザーにフリーズしている (レンダリングに 700ms 以上かかっている) ように見えるビューを監視し、アプリケーション内のジャンクを排除することができます。                                                                                                                                                                                                 |
| アプリケーションが応答しない｜Android では、アプリケーションの UI スレッドが 5 秒以上ブロックされると、`Application Not Responding` ([ANR][6]) エラーがトリガーされます。アプリケーションがフォアグラウンドにある場合、システムはユーザーにダイアログモーダルを表示し、ユーザーがアプリケーションを強制終了できるようにします。<br /><br />   RUM は ANR の発生を追跡し、ANR に遭遇したときにメインスレッドをブロックするスタックトレース全体をキャプチャします。                              |
| バージョン別クラッシュフリーセッション | [アプリケーションクラッシュ][7]とは、通常、処理されない例外やシグナルによって引き起こされる、アプリケーションの予期せぬ終了によって報告されるものです。アプリケーションのクラッシュのないユーザーセッションは、エンドユーザーの体験と全体的な満足度に直接対応します。 <br /><br />  RUM は、完全なクラッシュレポートを追跡し、[エラー追跡][8]を用いて時間経過とともに傾向を示します。 <br /><br />  クラッシュフリーセッションにより、業界のベンチマークに遅れをとることなく、Google Play Store でアプリケーションを上位にランクインさせることができます。                                                                                                 |
| CPU ティック/秒           | CPU の使用量が多いと、ユーザーの端末の[バッテリー駆動時間][9]に影響します。  <br /><br />  RUM は、各ビューの 1 秒あたりの CPU ティックと、セッション期間中の CPU 使用率を追跡します。推奨される範囲は、良好な場合は 40 未満、中程度の場合は 60 未満です。<br /><br />  アプリケーションの Overview ページの **Mobile Vitals** で、選択した期間の平均で CPU ティック数が最も多いトップビューを見ることができます。                                                                                                                                                                                                                                                                                                                                                        |
| メモリ使用率             | メモリの使用量が多いと、[メモリ不足によるクラッシュ][10]が発生し、ユーザーエクスペリエンスが低下する原因となります。 <br /><br />  RUM は、セッション期間中、各ビューでアプリケーションが使用する物理メモリの量をバイト単位で追跡します。推奨される範囲は、良好な場合は 200MB 未満、中程度の場合は 400MB 未満です。<br /><br />  アプリケーションの Overview ページの **Mobile Vitals** で、選択した期間の平均で最もメモリを消費したトップビューを見ることができます。                                                                                                                                                                                                                                                                                            |
| ウィジェットビルド時間             | これは UI スレッドでフレームを構築するのにかかる時間の期間です。スムーズなアニメーションを保証するために、60 FPS の場合は 16ms、120 FPS の場合は 8ms を超えないようにしてください。<br /><br />  この値が高い場合は、このビューのビルド方法を最適化する必要があることを意味します。Flutter ドキュメントの[ビルドコストの管理][11]を参照してください。 |
| ラスタ時間             | これは、ラスタスレッドでフレームをラスタライズするのにかかる時間の期間です。スムーズなアニメーションを保証するために、60 FPS の場合は 16ms、120 FPS の場合は 8ms を超えないようにしてください。<br /><br />  この値が高い場合は、ビューのレンダリングが複雑であることを意味します。Flutter ドキュメントの [GPU グラフの問題の特定][12]を参照してください。 |
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/ios/mobile_vitals/
[2]: /ja/real_user_monitoring/android/mobile_vitals/
[3]: https://docs.flutter.dev/perf/ui-performance
[4]: https://docs.flutter.dev/tools/devtools/performance
[5]: https://developer.android.com/topic/performance/vitals/frozen
[6]: https://developer.android.com/topic/performance/vitals/anr
[7]: https://docs.flutter.dev/reference/crash-reporting
[8]: /ja/real_user_monitoring/error_tracking/flutter
[9]: https://docs.flutter.dev/perf/best-practices#build-and-display-frames-in-16ms
[10]: https://docs.flutter.dev/tools/devtools/memory
[11]: https://docs.flutter.dev/perf/best-practices#control-build-cost 
[12]: https://docs.flutter.dev/perf/ui-performance#identifying-problems-in-the-gpu-graph