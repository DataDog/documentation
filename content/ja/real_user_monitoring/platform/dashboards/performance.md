---
aliases:
- /ja/real_user_monitoring/dashboards/performance_overview_dashboard/
- /ja/real_user_monitoring/dashboards/resources_dashboard
- /ja/real_user_monitoring/dashboards/mobile_dashboard
- /ja/real_user_monitoring/platform/dashboards/performance_overview_dashboard/
- /ja/real_user_monitoring/platform/dashboards/resources_dashboard
- /ja/real_user_monitoring/platform/dashboards/mobile_dashboard
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
kind: ドキュメント
title: RUM パフォーマンス概要ダッシュボード
---

## Web アプリのパフォーマンス


Web アプリパフォーマンスダッシュボードでは、RUM Web アプリケーションを俯瞰して見ることができます。以下が表示されます。

- **Core web vitals**: 
  すべてのビューで、3 つのブラウザパフォーマンスメトリクス (Largest Contentful Paint、First Input Delay、Cumulative Layout Shift) がハイライトされます。Load Time などの他のパフォーマンスメトリクスも利用可能です。
- **XHR and Fetch requests and resources**:
  すべてのビューで、アプリケーションのロード時にボトルネックを特定します。
- **Long tasks** : ブラウザのメインスレッドを 50ms 以上ブロックするイベント。

{{< img src="real_user_monitoring/dashboards/dashboard-performance -web-app.png" alt="すぐに使える RUM Web アプリパフォーマンス概要ダッシュボード" style="width:100%" >}}

表示されるデータの詳細については、[RUM ブラウザデータ収集][1]を参照してください。

## モバイルアプリのパフォーマンス


モバイルアプリパフォーマンスダッシュボードは、RUM モバイルアプリケーションの概要を示します。以下が表示されます。

- **Mobile vitals**:
  すべての画面について、4 つのモバイルパフォーマンスメトリクス (レンダリングの遅延、1 秒あたりの CPU ティック、フリーズしたフレーム、メモリ使用量) がハイライトされます。クラッシュのないセッションなど、その他のパフォーマンスメトリクスも利用可能です。
- **Resources analysis**:
  すべての画面で、アプリケーションがコンテンツをリクエストする際のボトルネックを特定します。
- **Crashes and errors**:
  アプリケーションでクラッシュやエラーが表面化する場所を特定します。

{{< img src="real_user_monitoring/dashboards/dashboard-performance -mobile-app.png" alt="すぐに使える RUM Web アプリパフォーマンス概要ダッシュボード" style="width:100%" >}}

表示されるデータの詳細については、各プラットフォームのドキュメントをご覧ください: [iOS RUM][2]、[Android RUM][3]、[React Native RUM][4]、[Flutter RUM][5]

## リソース


RUM リソースダッシュボードは、アプリケーションに最も大きな影響を与えるリソースを特定するのに役立ちます。以下が表示されます。

- **Most requested resources**:
  どのリソースが最も多くロードされているかを視覚化し、そのサイズやロード時間を測定します。
- **XHR and Fetch requests**:
  再分割、メソッド、エラーステータスコードをリクエストします。
- **Resource load timings**:
  ブラウザ SDK が収集したリソースタイミング (DNS Lookup、Initial Connection、Time To First Byte、Download) の傾向を監視します。
- **3rd party resources**:
  サードパーティリソースのうち、アプリケーションに最も影響を及ぼしているものを把握できます。

{{< img src="real_user_monitoring/dashboards/dashboard-performance-resources.png" alt="すぐに使える RUM Web アプリパフォーマンス概要ダッシュボード" style="width:100%" >}}

表示されるデータの詳細については、[リアルユーザーモニタリングデータのセキュリティ][6]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/
[2]: /ja/real_user_monitoring/ios/data_collected/
[3]: /ja/real_user_monitoring/android/data_collected/
[4]: /ja/real_user_monitoring/reactnative/data_collected/
[5]: /ja/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[6]: /ja/data_security/real_user_monitoring/