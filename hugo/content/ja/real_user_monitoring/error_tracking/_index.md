---
algolia:
  tags:
  - error tracking
description: Web アプリケーションやモバイルアプリケーションから収集されたエラーを検索および管理する方法を紹介します。
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: ブログ
  text: Datadog Error Tracking で、アプリケーションの問題を解明する
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog
  tag: ブログ
  text: Datadog RUM を使用して、iOS のクラッシュを効率的にデバッグする
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: ブログ
  text: Datadog のテクニカルソリューションチームが RUM、Session Replay、Error Tracking を使用して顧客の問題を解決する方法
- link: https://www.datadoghq.com/blog/error-tracking-logs/
  tag: ブログ
  text: Datadog Error Tracking を使用して、ログ内のエラーを追跡し、トリアージする
- link: /real_user_monitoring/error_tracking/explorer
  tag: ドキュメント
  text: Error Tracking エクスプローラーについて
- link: /monitors/types/error_tracking/
  tag: ドキュメント
  text: Error Tracking モニターを作成する
title: Web アプリケーションやモバイルアプリケーション向けの Error Tracking
---
## 概要 {#overview}

{{< img src="real_user_monitoring/error_tracking/rum-error-tracking-explorer-1.png" alt="Error Tracking エクスプローラーにおける課題の詳細" style="width:100%;" >}}

{{% error-tracking-description %}}

RUM エラーからの問題には、スタックトレース、ユーザーセッションのタイムライン、メタデータ (ユーザーの所在地、バージョン、クラッシュレポートに含めたカスタム属性など) が含まれます。

[Error Tracking エクスプローラー][3]のドキュメントで、Error Tracking の主な機能をひととおりご確認ください。RUM の Error Tracking エクスプローラーを表示するには、[{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Error Tracking{{< /ui >}}][1] に移動してください。

## セットアップ{#setup}

{{< whatsnext desc="RUM 用の Datadog Error Tracking を開始するには、対応するドキュメントを参照してください。" >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}ブラウザ{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/application_monitoring/electron/error_tracking" >}}Electron{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/roku" >}}Roku{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/kotlin_multiplatform" >}}Kotlin Multiplatform{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/maui" >}}.NET MAUI{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /ja/real_user_monitoring/
[3]: /ja/error_tracking/explorer