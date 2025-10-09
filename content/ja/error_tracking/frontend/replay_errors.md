---
description: リプレイ スニペットの収集方法について学び、重要な問題を確実に把握できるようにします。
further_reading:
- link: /error_tracking/suspect_commits
  tag: ドキュメント
  text: Error Tracking が疑わしいコミットをどのように特定するかについて学びます。
- link: /error_tracking
  tag: ドキュメント
  text: エラートラッキングについて
is_beta: true
private: false
title: Error Tracking Replay Snippets
---

{{< beta-callout url="https://www.datadoghq.com/product-preview/error-tracking-replay-snippets/" btn_hidden="false"  >}}
Error Tracking Replay Snippets はプレビュー版です。
{{< /beta-callout >}}

## 概要

フロントエンド エンジニアにとって、デバッグ プロセスにおける不可欠で、しかも時間のかかる作業の 1 つがバグの再現です。しかし、アプリケーションがエラーをスローする前にユーザーが行った操作を明確に把握できなければ、バグの再現は難しくなります。

Error Tracking Replay Snippets では、エラー発生の前後 15 秒間におけるユーザー ジャーニーをピクセル パーフェクトに再現して表示できるため、バグを再現し、時間を節約し、推測を排除できます。

## セットアップ

1. まだ Datadog Frontend Error Tracking をセットアップしていない場合は、 [アプリ内セットアップ手順][1] に従うか、[ブラウザ][2] 用および [モバイル][3] 用のセットアップ ドキュメントを参照してください。
2. SDK の初期化時に、アプリケーションのリプレイ サンプリング レートを設定します。 

   {{< tabs >}}
   {{% tab "ブラウザ" %}}

   `sessionReplaySampleRate` を 1 から 100 の範囲で設定します。 

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      applicationId: '<APP_ID>',
      clientToken: '<CLIENT_TOKEN>',
      service: '<SERVICE>',
      env: '<ENV_NAME>',
      sessionReplaySampleRate: 20,
      trackResources: true,
      trackUserInteractions: true,
   });
   ```

   {{% /tab %}}
   {{% tab "iOS" %}}
   [こちらの手順][4] に従って、iOS 用にモバイル アプリケーションのエラー リプレイをセットアップし、構成します。

   [4]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=ios
   {{% /tab %}}
   {{% tab "Android" %}}
   [こちらの手順][5] に従って、Android 用にモバイル アプリケーションのエラー リプレイをセットアップし、構成します。

   [5]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=android
   {{% /tab %}}
   {{% tab "Kotlin Multiplatform" %}}
   [こちらの手順][6] に従って、Kotlin Multiplatform 用にモバイル アプリケーションのエラー リプレイをセットアップし、構成します。

   [6]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=kotlinmultiplatform
   {{% /tab %}}
   {{% tab "React Native" %}}
   [こちらの手順][7] に従って、React Native 用にモバイル アプリケーションのエラー リプレイをセットアップし、構成します。

   [7]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=reactnative
   {{% /tab %}}
   {{</tabs>}}

## エラーをリプレイする
エラーメッセージやスタック トレースなど、エラーに関する重要な情報を確認したら、問題のサマリーから、エラーが発生した最新のセッションのライブ再現へすぐに遷移できます。スタック トレースの下までスクロールし、リプレイのプレビューをクリックすると、エラーが発生する前のユーザーの操作を確認できます。

{{< img src="error_tracking/error-replay.png" alt="Error Tracking Replay Snippet" style="width:90%" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /ja/error_tracking/frontend/browser#setup
[3]: /ja/error_tracking/frontend/mobile