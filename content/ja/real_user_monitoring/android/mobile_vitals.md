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

リアルユーザーモニタリングは、[Android Vitals][1] にインスピレーションを得た、一連のメトリクスを提供するモバイルバイタルを提供し、モバイルアプリケーションの応答性、安定性、リソース消費に関するインサイトの取得に役立てることができます。

{{< img src="real_user_monitoring/android/mobile_vitals.png" alt="RUM エクスプローラーのモバイル バイタル" style="width:70%;">}}

モバイル バイタルは、[RUM エクスプローラー][2]で個別ビューをクリックすると、アプリケーションの **Overview** タブ、および **Performance** > **Event Timings and Mobile Vitals** のサイドパネルに表示されます。**Mobile Vitals** のグラフをクリックして、バージョン別に絞り込んだりフィルターを適用したセッションを調査したりできます。

{{< img src="real_user_monitoring/android/refresh_rate_and_mobile_vitals.png" alt="イベントのタイミングとモバイル バイタル" style="width:70%;">}}

モバイル バイタルには、アプリケーションのユーザーエクスペリエンスに直接結びつく推奨ベンチマーク範囲が含まれています。メトリクスのスコアが範囲内のどこにあるかを確認し、**Search Views With Poor Performance** をクリックして検索クエリにフィルターを適用できます。

## メトリクス

以下のメトリクスで、モバイルアプリケーションのパフォーマンスに関するインサイトを提供します。

| 測定項目                    | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 遅延レンダリング                   | スムーズで[素早い動作の][3]ユーザーエクスペリエンスを確保するには、アプリケーションのフレームレンダリングが 60 Hz 以下である必要があります。<br /><br />  RUM は、`@view.refresh_rate_average` および `@view.refresh_rate_min` ビュー属性を使用して、アプリケーションの[ディスプレイのフレッシュレート][4]を追跡します。<br /><br />  遅延レンダリングで、16 ms または 60 Hz 以上かかっているビューを監視できます。<br /> **注:** リフレッシュレートは、0～60 fps の範囲で標準化されています。たとえば、120 fps のレンダリングが可能なデバイスでアプリケーションが 100 fps で実行している場合、Datadog のモバイル バイタルで 50 fps と報告されます。 |
| フレームのフリーズ                  | 700ms 以上でレンダリングされるフレームは、アプリケーション上でスタック、または無反応のように見えます。これは[フレームのフリーズ][5]と分類されます。<br /><br />  RUM は、完了までに 100ms 以上かかったタスク実行時間のある `ロングタスク` イベントを追跡します。<br /><br />  フレームのフリーズで、エンドユーザーにフリーズしているように表示される（レンダリングに 700ms 以上かかっている）ビューを監視し、アプリケーション内の動作の遅れを排除できます。                                                                                                                                                                                                 |
| アプリケーションの無反応     | アプリケーションの UI スレッドが 5 秒以上ブロックされると、`Application Not Responding` ([ANR][6]) エラーがトリガーされます。アプリケーションが前景にある場合、システムによりユーザーにモーダルダイアログが表示され、アプリケーションの強制終了が可能になります。<br /><br />   RUM では、ANR の発生を追跡し、ANR が起きた場合にメインスレッドをブロックするスタックトレースの全体をキャプチャします。                                                                                                                                                                                                                              |
| バージョン別クラッシュフリーセッション | 通常、未処理の例外またはシグナルが原因であるアプリケーションの予期せぬ終了により、[アプリケーションのクラッシュ][7]が報告されます。アプリケーションにおいて、クラッシュのないユーザーセッションはユーザーエクスペリエンスと全体的な満足度に直接的につながります。<br /><br />   RUM では、完全なクラッシュレポートを追跡し、[追跡レポート][8]で経時的な傾向を把握できます。<br /><br />  クラッシュフリーセッションで、業界基準の速度を維持し、Google Play ストアでアプリケーションを高位置にランク入りさせることが可能になります。                                                                                                 |
| 毎秒の CPU ティック           | CPU の高使用量は、ユーザーのデバイスの[バッテリーの持ち][9]に影響します。  <br /><br />  RUM で、セッション中の各ビューの毎秒の CPU ティックおよび CPU 使用量を追跡できます。推奨範囲は良好で 40 以下、普通で <60 以下です。                                                                                                                                                                                                                                                                                                                                                         |
| メモリ使用状況             | メモリの高使用量は [OutOfMemoryError][10] につながり、アプリケーションのクラッシュ、ひいてはユーザーエクスペリエンスの低下の原因になり得ます。<br /><br />  RUM で、セッション中の各ビューにおけるアプリケーションの物理的なメモリ使用量をバイトで追跡できます。推奨範囲は良好で <200MB 以下、普通で <400MB 以下です。                                                                                                                                                                                                                                                                                          |

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