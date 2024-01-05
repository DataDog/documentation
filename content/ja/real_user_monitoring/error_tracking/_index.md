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

Datadog によって収集されたエラーを一貫して監視することは、システムの健全性のために非常に重要です。個々のエラーイベントが多数存在する場合、トラブルシューティングのためにエラーの優先順位をつけることが困難になります。クラッシュの追跡、トリアージ、デバッグを行うことで、Web およびモバイルアプリケーションのユーザーエクスペリエンスに対する致命的なエラーの影響を最小化することができます。

{{< img src="real_user_monitoring/error_tracking/rum-error-tracking-2.png" alt="RUM のエラー追跡エクスプローラーが、Web およびモバイルアプリケーションのクラッシュレポートからの問題を表示しています" style="width:100%;" >}}

**Web and Mobile Apps** のエラー追跡のために [RUM][2] をセットアップすると、問題リストにカードが表示されます。[**UX Monitoring** > **Error Tracking**][1] に移動すれば、未解決の問題、無視されている問題、すべての問題を表示したり、件数や新旧で問題をソートしたり、Web およびモバイルアプリケーションにあるすべてのカスタムおよびデフォルトのファセットで問題をフィルターしたりすることができます。

エラー追跡は、以下のことを可能にします。

- エラー追跡イベントに関するアラートを設定します。これにより、致命的な問題が発生した場合に、常に情報を得ることができます。
- 類似のエラーを課題にまとめることで、重要なエラーをより簡単に特定し、ノイズを減らすことができます。
- 経時的に問題を監視するため、開始のタイミングや継続した場合の頻度を把握できます。
- 必要なすべてのコンテキストを 1 か所で収集することで、トラブルシューティングが容易になります。

## ソースマップのアップロード

{{< whatsnext desc="RUM 用の Datadog エラー追跡を始めるには、対応するドキュメントを参照して、フレームワーク用のソースマップをアップロードしてください。" >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}ブラウザ{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
{{< /whatsnext >}}

## トラブルシューティングやデバッグを開始するための問題点の検討

エラー追跡は、Web アプリケーションやモバイルアプリケーションから収集したクラッシュを、自動的に[エラー追跡エクスプローラー][1]に課題として分類します。

{{< img src="real_user_monitoring/error_tracking/issue-panel-2.png" alt="RUM のエラー追跡エクスプローラーが、Web およびモバイルアプリケーションのクラッシュレポートからの問題を表示しています" style="width:100%;" >}}

課題をクリックすると、スタックトレース、ユーザーセッションのタイムライン、メタデータ (ユーザーの場所、バージョン、クラッシュレポートに含まれるカスタム属性を含む) などのデバッグ情報を表示します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /ja/real_user_monitoring/