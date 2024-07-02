---
title: RUM & Session Replay
kind: documentation
description: "Visualize, observe, and analyze the performance of your front-end applications as seen by your users."
disable_sidebar: true
aliases:
  - /real_user_monitoring/installation
  - /real_user_monitoring/faq/
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring"
  tag: Release Notes
  text: Check out the latest Datadog RUM releases! (App login required)
- link: "https://dtdg.co/fe"
  tag: Foundation Enablement
  text: Join an interactive session to gain insights through Real User Monitoring
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: Blog
  text: Introducing Datadog Real User Monitoring
- link: "https://www.datadoghq.com/blog/datadog-mobile-rum/"
  tag: Blog
  text: Improve mobile user experience with Datadog Mobile Real User Monitoring
- link: "https://www.datadoghq.com/blog/mobile-monitoring-best-practices/"
  tag: Blog
  text: Best practices for monitoring mobile app performance
- link: "https://www.datadoghq.com/blog/error-tracking/"
  tag: Blog
  text: Make sense of application issues with Datadog Error Tracking
- link: "https://www.datadoghq.com/blog/unify-apm-rum-datadog/"
  tag: Blog
  text: Unify APM and RUM data for full-stack visibility
- link: "https://www.datadoghq.com/blog/datadog-geomaps/"
  tag: Blog
  text: Use geomaps to visualize your app data by location
- link: "https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection"
  tag: Blog
  text: Get better RUM data with our custom React components
- link: "https://www.datadoghq.com/blog/hybrid-app-monitoring/"
  tag: Blog
  text: Monitor your hybrid mobile applications with Datadog
- link: "https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/"
  tag: Blog
  text: How Datadog's Technical Solutions team uses RUM, Session Replay, and Error Tracking to resolve customer issues
- link: "https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/"
  tag: Blog
  text: Best practices for monitoring static web applications
- link: /real_user_monitoring/browser/data_collected/
  tag: Documentation
  text: RUM Browser Data Collected
algolia:
  tags: [rum, real user monitoring]
cascade:
    algolia:
        rank: 70
---

{{< img src="real_user_monitoring/rum-performance-summary-2.png" alt="RUM Dashboard" >}}

## What is Real User Monitoring?

Datadog's *Real User Monitoring (RUM)* gives you end-to-end visibility into the real-time activity and experience of individual users. RUM solves four types of use cases for monitoring web and mobile applications:

* **Performance**: Track the performance of web pages, mobile application screens, user actions, network requests, and your frontend code.
* **Error Management**: Monitor the ongoing bugs and issues and track them over time and versions.
* **Analytics / Usage**: Understand who is using your application (country, device, OS), monitor individual users journeys, and analyze how users interact with your application (most common page visited, clicks, interactions, and feature usage).
* **Support**: Retrieve all of the information related to one user session to troubleshoot an issue (session duration, pages visited, interactions, resources loaded, and errors).

A user session is a user journey on your web or mobile application lasting up to four hours. A session usually includes pageviews and associated telemetry. If a user does not interact with an application for 15 minutes, the session is considered complete. A new session starts when the user interacts with the application again.

## What is Session Replay?

Datadog's *Session Replay* allows you to capture and visually replay the web browsing experience of your users.

Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your web application's usage patterns and design pitfalls.

## Get started

Select an application type to start collecting RUM data:

{{< partial name="rum/rum-getting-started.html" >}}

</br>

### Capabilities and platform support

**Note**: The Datadog Flutter SDK is not supported for MacOS, Windows, or Linux.

The following table shows which RUM capabilities are supported on each platform:

| Feature                               | Browser | Android | iOS |   Flutter   | React Native | Roku | Notes |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-------|
| Send logs to Datadog  | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Distributed tracing of network requests | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | The **Datadog Roku SDK** is only able to track some types of HTTP requests. |
| Track Views and Actions (RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | - All actions tracked in **Flutter Web** are recorded as `custom` <br> - **Roku** supports only manual action tracking. |
| Feature Flags tracking and release tracking | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| Error tracking and source mapping | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | Only partially supported for **React Native** |
| Crash tracking, symbolication, and deobfuscation | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Stop sessions (Kiosk Monitoring) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| Track Events in WebViews |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| Monitor platform-specific vitals | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| Global context/attribute tracking in Logs  | {{< X >}} |  |  |  |  |  |  |
| Client side tracing |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |
| Session Replay | {{< X >}} | {{< X >}} | {{< X >}} |  |  |  | Mobile Session Replay is in public beta for native mobile apps. |
| フラストレーションシグナル | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | すべての**モバイル**および **Roku** デバイスは部分的にサポートされています |

## SDK ドメインでサポートされるエンドポイント

Datadog SDK のトラフィックはすべて SSL (デフォルト 443) で以下のドメインに送信されます。

| サイト | サイト URL                                      |
|------|-----------------------------------------------|
| US1  | `https://browser-intake-datadoghq.com`        |
| US3  | `https://browser-intake-us3-datadoghq.com`    |
| US5  | `https://browser-intake-us5-datadoghq.com`    |
| EU1  | `https://browser-intake-datadoghq.eu`         |
| US1-FED  | `https://browser-intake-ddog-gov.com`     |
| AP1  | `https://browser-intake-ap1-datadoghq.com`    |

## Datadog RUM を探索する

[**Digital Experience > Performance Summary**][1] に移動して、RUM にアクセスします。

### すぐに使えるダッシュボード

[すぐに使える RUM ダッシュボード][2]で自動的に収集されたユーザーセッション、パフォーマンス、モバイルアプリケーション、フラストレーションシグナル、ネットワークリソース、エラーに関する情報を分析することができます。

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="RUM ダッシュボード" >}}

### RUM エクスプローラーと視覚化

[視覚化][3]を使用して、レイテンシーがプレミアム顧客に影響を与えるタイミングを確認するなど、ユーザーセッションをセグメントで表示します。カスタマイズした検索で、データを探索し、ビューを保存し、[モニター][4]を作成します。

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="RUM 分析" video=true >}}

### ログ、APM、プロファイラーとのインテグレーション

[バックエンドトレース、ログ、インフラストラクチャーメトリクス][5]を、ユーザーエクスペリエンスと報告された問題に対応して、アプリケーションのパフォーマンスに影響を与えるコードの正確な行まで表示します。

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs.png" alt="RUM と APM" >}}

### エラー追跡とクラッシュレポート

Get automated alerts on outliers and groups of errors, timeouts, and crashes to significantly reduce your MTTR with [Error Tracking][6].

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="RUM エラー追跡" video=true >}}

### Web とモバイルバイタル

[iOS および tvOS][8] または [Android および Android TV アプリケーション][9]の Core Web Vitals および Mobile Vitals などの[ブラウザアプリケーション][7]のパフォーマンススコアとテレメトリーを表示します。

### Web ビュー追跡

[iOS と tvOS][10] または [Android と Android TV][11] 用の Web ビュー追跡を使用して、ネイティブ Web アプリケーションから情報を収集し、ハイブリッドビューを調査します。

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="RUM エクスプローラーのユーザーセッションで取得した Web ビュー" >}}

## Datadog のセッションリプレイを見る

### セッションリプレイ

Web サイトを利用する実際のユーザーの[ブラウザ記録][12]を見て、組織の[プライバシーコントロール][13]を設定します。

### 開発ツール

[ブラウザ開発ツール][14]を使用してアプリケーションの問題をトラブルシューティングする際に、トリガーされたログ、エラー、およびパフォーマンス情報にアクセスできます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /real_user_monitoring/platform/dashboards/
[3]: /real_user_monitoring/explorer/visualize/
[4]: /monitors/types/real_user_monitoring/
[5]: /real_user_monitoring/platform/connect_rum_and_traces/
[6]: /real_user_monitoring/error_tracking/
[7]: /real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[8]: /real_user_monitoring/ios/mobile_vitals/
[9]: /real_user_monitoring/android/mobile_vitals/
[10]: /real_user_monitoring/ios/web_view_tracking/
[11]: /real_user_monitoring/android/web_view_tracking/
[12]: /real_user_monitoring/session_replay/browser/
[13]: /real_user_monitoring/session_replay/browser/privacy_options/
[14]: /real_user_monitoring/session_replay/browser/developer_tools/
