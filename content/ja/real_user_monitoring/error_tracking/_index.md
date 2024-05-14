---
algolia:
  tags:
  - エラー追跡
description: Web アプリケーションやモバイルアプリケーションから収集したエラーを検索し、管理する方法をご紹介します。
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: GitHub
  text: Datadog Error Tracking で、アプリケーションの問題を解明
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog
  tag: GitHub
  text: Datadog RUM で iOS のクラッシュを効率的にデバッグする
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: GitHub
  text: Datadog のテクニカルソリューションチームが RUM、セッションリプレイ、エラー追跡を使用して顧客の問題を解決する方法
- link: https://www.datadoghq.com/blog/error-tracking-logs/
  tag: ブログ
  text: Datadog Error Tracking でログのエラーを追跡し、トリアージする
- link: /real_user_monitoring/error_tracking/explorer
  tag: ドキュメント
  text: エラートラッキングエクスプローラーについて
- link: /monitors/types/error_tracking/
  tag: ドキュメント
  text: エラー追跡モニターを作成する
kind: ドキュメント
title: Web アプリケーションとモバイルアプリケーションのエラー追跡
---

## 概要

{{< img src="real_user_monitoring/error_tracking/rum-et-explorer.png" alt="エラートラッキングエクスプローラーの問題の詳細画面" style="width:100%;" >}}

{{% error-tracking-description %}}

RUM エラーの課題には、スタックトレース、ユーザーセッションのタイムライン、メタデータ (ユーザーの場所、バージョン、クラッシュレポートに含まれるカスタム属性を含む) が含まれます。

Error Tracking の主な機能は、[Error Tracking エクスプローラー][3]のドキュメントで確認することができます。RUM 用のエラートラッキングエクスプローラーを表示するには、[**Digital Experience** > **Error Tracking**][1] に移動します。

## 計画と使用

{{< whatsnext desc="RUM 用の Datadog Error Tracking を始めるには、対応するドキュメントを参照してください。" >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}Browser{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/roku" >}}Roku{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /ja/real_user_monitoring/
[3]: /ja/error_tracking/explorer