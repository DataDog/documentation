---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/doc/rum/mobile_vitals.md
description: Flutter Monitoring で収集されるモバイルバイタルについて説明します。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: ブログ
  text: Datadog Mobile RUM による Flutter アプリケーションのパフォーマンス監視
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter ソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
kind: documentation
title: モバイル バイタル
---
## 概要

リアルユーザーモニタリングは、一連のメトリクスを提供するモバイルバイタルを提供し、モバイルアプリケーションの応答性、安定性、リソース消費に関するインサイトの取得に役立てることができます。モバイルバイタルは、不良、中程度、良好の 3 種類です。

モバイル バイタルは、[RUM エクスプローラー][2]で個別ビューをクリックすると、アプリケーションの **Overview** タブ、および **Performance** > **Event Timings and Mobile Vitals** のサイドパネルに表示されます。**Mobile Vitals** のグラフをクリックして、バージョン別に絞り込んだりフィルターを適用したセッションを調査したりできます。

{{< img src="real_user_monitoring/ios/ios_mobile_vitals.png" alt="Performance タブのモバイルバイタル" style="width:70%;">}}

様々なアプリケーションのバージョンに渡るメトリクスを表示する折れ線グラフで、アプリケーションの全体的な健全性とパフォーマンスを理解することができます。アプリケーションのバージョンでフィルターをかけたり、特定のセッションやビューを表示するには、グラフをクリックしてください。

{{< img src="real_user_monitoring/ios/rum_explorer_mobile_vitals.png" alt="RUM エクスプローラーのイベントタイミングとモバイルバイタル" style="width:90%;">}}

また、RUM エクスプローラーでビューを選択し、セッションでのアプリケーションのユーザー体験に直接関連する推奨ベンチマーク範囲を観察することができます。**Refresh Rate Average** などのメトリクスをクリックし、**Search Views With Poor Performance** (パフォーマンスの悪いビューを検索) をクリックすると、検索クエリにフィルターが適用され、追加のビューが調査されます。

ほとんどの Flutter モバイルバイタルは、RUM 用のネイティブな Datadog iOS および Android SDK によって提供されています。

- iOS のメトリクスについては、[RUM iOS モバイルバイタル][1]をご覧ください。
- Android のメトリクスについては、[RUM Android モバイルバイタル][2]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/mobile_vitals/
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/android/mobile_vitals/