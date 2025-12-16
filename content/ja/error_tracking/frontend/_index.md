---
aliases:
- /ja/error_tracking/standalone_frontend/
further_reading:
- link: /error_tracking/standalone_frontend/collecting_browser_errors/
  tag: ドキュメント
  text: ブラウザエラーの収集
- link: /error_tracking/explorer/
  tag: ドキュメント
  text: Error Tracking Explorer の使い方
- link: /error_tracking/issue_states/
  tag: ドキュメント
  text: Error Tracking の問題の状態とワークフロー
is_beta: true
private: false
title: フロントエンドの Error Tracking
---

## 概要

{{< img src="real_user_monitoring/error_tracking/rum-et-explorer.png" alt="エラートラッキングエクスプローラーの問題の詳細画面" style="width:100%;" >}}

Datadog によって収集されたエラーを一貫して監視することは、システムの健全性のために非常に重要です。個々のエラーイベントが多数存在する場合、トラブルシューティングのためにエラーの優先順位をつけることが困難になります。

Error Tracking は、何千もの類似したエラーを 1 つの問題にグループ化することで、デバッグを簡素化します。Error Tracking を使用すると、以下のことが可能になります。

- 致命的なエラーの追跡、トリアージ、デバッグ
- 類似するエラーを Issue にグルーピングして、重要なエラーを特定し、ノイズを減らします。
- 大量のエラーや新しい問題など、エラー追跡イベントのモニターを設定します
- 経時的に問題を監視するため、開始のタイミングや継続した場合の頻度を把握できます
- エラー発生までにユーザーが実行した手順の詳細なタイムラインを確認できるため、エラーの再現と解決までのプロセスをシンプルにできます。

## セットアップ
{{< whatsnext desc="Datadog Error Tracking を開始するには、次のセットアップ オプションのいずれかを選択してください:" >}}
    {{< nextlink href="agentic_onboarding/setup" >}}Agentic Onboarding (frontend only){{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/browser" >}}Browser{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/kotlin_multiplatform" >}}Kotlin Multiplatform{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/logs" >}}Logs{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}