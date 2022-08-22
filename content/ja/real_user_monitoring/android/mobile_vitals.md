---
dependencies:
- https://github.com/DataDog/dd-sdk-android/blob/master/docs/rum_mobile_vitals.md
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Github
  text: dd-sdk-android ソースコード
- link: https://www.datadoghq.com/blog/monitor-mobile-vitals-datadog/
  tag: ブログ
  text: Datadog でモバイル バイタルを監視
kind: documentation
title: モバイル バイタル
---
## 概要

リアルユーザーモニタリングは、[Android Vitals][1] にインスピレーションを得た、一連のメトリクスを提供するモバイルバイタルを提供し、モバイルアプリケーションの応答性、安定性、リソース消費に関するインサイトの取得に役立てることができます。モバイルバイタルは、不良、中程度、良好の 3 種類です。

モバイル バイタルは、[RUM エクスプローラー][2]で個別ビューをクリックすると、アプリケーションの **Overview** タブ、および **Performance** > **Event Timings and Mobile Vitals** のサイドパネルに表示されます。**Mobile Vitals** のグラフをクリックして、バージョン別に絞り込んだりフィルターを適用したセッションを調査したりできます。

{{< img src="real_user_monitoring/android/mobile_vitals.png" alt="RUM エクスプローラーのモバイル バイタル" style="width:70%;">}}

様々なアプリケーションのバージョンに渡るメトリクスを表示する折れ線グラフで、アプリケーションの全体的な健全性とパフォーマンスを理解することができます。アプリケーションのバージョンでフィルターをかけたり、特定のセッションやビューを表示するには、グラフをクリックしてください。

{{< img src="real_user_monitoring/android/refresh_rate_and_mobile_vitals.png" alt="イベントのタイミングとモバイル バイタル" style="width:70%;">}}

また、RUM エクスプローラーでビューを選択し、セッションでのアプリケーションのユーザー体験に直接関連する推奨ベンチマーク範囲を観察することができます。**Refresh Rate Average** などのメトリクスをクリックし、**Search Views With Poor Performance** (パフォーマンスの悪いビューを検索) をクリックすると、検索クエリにフィルターが適用され、追加のビューが調査されます。

## メトリクス

以下のメトリクスで、モバイルアプリケーションのパフォーマンスに関するインサイトを提供します。

| 測定項目                    | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 遅延レンダリング                   | スムーズで[素早い動作の][3]ユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60Hz 以下である必要があります。<br /><br />  RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[ディスプレイのフレッシュレート][4]を追跡します。<br /><br />  遅延レンダリングで、16ms または 60Hz 以上かかっているビューを監視できます。<br /> **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120fps のレンダリングが可能なデバイスでアプリケーションが 100fps で実行している場合、Datadog の**モバイルバイタル**で 50fps と報告されます。 |
| フレームのフリーズ                  | 700ms 以上でレンダリングされるフレームは、アプリケーション上でスタック、または無反応のように見えます。これは[フレームのフリーズ][5]と分類されます。<br /><br />  RUM は、完了までに 100ms 以上かかったタスク実行時間のある `ロングタスク` イベントを追跡します。<br /><br />  フレームのフリーズで、エンドユーザーにフリーズしているように表示される（レンダリングに 700ms 以上かかっている）ビューを監視し、アプリケーション内の動作の遅れを排除できます。                                                                                                                                                                                                 |
| アプリケーションの無反応     | アプリケーションの UI スレッドが 5 秒以上ブロックされると、`Application Not Responding` ([ANR][6]) エラーがトリガーされます。アプリケーションが前景にある場合、システムによりユーザーにモーダルダイアログが表示され、アプリケーションの強制終了が可能になります。<br /><br />   RUM では、ANR の発生を追跡し、ANR が起きた場合にメインスレッドをブロックするスタックトレースの全体をキャプチャします。                                                                                                                                                                                                                              |
| バージョン別クラッシュフリーセッション | 通常、未処理の例外またはシグナルが原因であるアプリケーションの予期せぬ終了により、[アプリケーションのクラッシュ][7]が報告されます。アプリケーションにおいて、クラッシュのないユーザーセッションはユーザーエクスペリエンスと全体的な満足度に直接的につながります。<br /><br />   RUM では、完全なクラッシュレポートを追跡し、[追跡レポート][8]で経時的な傾向を把握できます。<br /><br />  クラッシュフリーセッションで、業界基準の速度を維持し、Google Play ストアでアプリケーションを高位置にランク入りさせることが可能になります。                                                                                                 |
| 毎秒の CPU ティック           | CPU の使用量が多いと、ユーザーのデバイスの[バッテリー寿命][9]に影響します。<br /><br />RUM は、各ビューの 1 秒あたりの CPU ティックと、セッション中の CPU 使用率を追跡します。推奨範囲は、良好な場合は 40 未満、中程度の場合は 60 未満です。<br /><br />選択した期間の平均で CPU ティック数が最も多い上位ビューは、アプリケーションの Overview ページの **Mobile Vitals** で見ることができます。                                                                                                                                                                                                                                                                                                                                                        |
| メモリ使用状況             | メモリの使用量が多いと、[OutOfMemoryError][10] が発生し、アプリケーションがクラッシュして、ユーザーエクスペリエンスが低下する可能性があります。<br /><br />RUM は、セッションの間、各ビューでアプリケーションが使用する物理メモリの量をバイト単位で追跡します。推奨範囲は、良好な場合は 200MB 未満、中程度の場合は 400MB 未満です。<br /><br />選択した期間の平均で最もメモリを消費した上位のビューは、アプリケーションの Overview ページの **Mobile Vitals** で確認できます。                                                                                                                                                                                                                                                                                            |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/vitals
[2]: https://app.datadoghq.com/rum/explorer
[3]: https://developer.android.com/topic/performance/vitals/render#common-jank
[4]: https://developer.android.com/guide/topics/media/frame-rate
[5]: https://developer.android.com/topic/performance/vitals/frozen
[6]: https://developer.android.com/topic/performance/vitals/anr
[7]: https://developer.android.com/topic/performance/vitals/crash
[8]: https://docs.datadoghq.com/ja/real_user_monitoring/error_tracking/android
[9]: https://developer.android.com/topic/performance/power
[10]: https://developer.android.com/reference/java/lang/OutOfMemoryError