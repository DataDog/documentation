---
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration
  tag: ドキュメント
  text: RUM Android の高度なコンフィギュレーション
- link: https://github.com/DataDog/dd-sdk-android
  tag: ソースコード
  text: dd-sdk-android のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
title: Android および Android TV のモニタリング
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

Datadog の Android SDK は、Android 5.0 以上 (API レベル 21) および Android TV をサポートしています。Java または Kotlin で記述された Android アプリで動作します。

## Android アプリケーションのモニタリングを開始する

Android 向け RUM を使い始めるには、アプリケーションを作成し、Android SDK を構成します。

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/android/setup">}}<u>Setup</u>: Learn how to set up the Android SDK, track background events, and send data when devices are offline.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/android/error_tracking">}}<u>Crash Reporting</u>: Add ANR detection and crash reporting, get deobfuscated stack traces, then test your implementation.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/android/monitoring_app_performance">}}<u>Monitoring App Performance</u>: Monitor view timings to understand your app's performance from a user's perspective. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration">}}<u>Advanced Configuration</u>: Enrich user sessions, manage events and data, track custom global attributes and widgets, review initialization parameters, modify or drop RUM events, and more.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/android/mobile_vitals">}}<u>Data Collected</u>: Review data that the Android SDK collects.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/android/mobile_vitals">}}<u>Mobile Vitals</u>: View mobile vitals, which help compute insights about your mobile application.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/android/web_view_tracking">}}<u>Web View Tracking</u>: Monitor web views and eliminate blind spots in your mobile applications.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/android/integrated_libraries">}}
  <u>Integrated Libraries</u>: Import integrated libraries for your Android and Android TV applications.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/android/troubleshooting">}}
  <u>Troubleshooting</u>: Common troubleshooting Android SDK issues.{{< /nextlink >}}
{{< /whatsnext >}}