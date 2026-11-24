---
description: リプレイのスニペットを収集して、重要な問題を確実に表示する方法について説明します。
further_reading:
- link: /error_tracking/suspect_commits
  tag: ドキュメント
  text: Error Trackingがどのように疑わしいコミットを特定できるかについて説明します。
- link: /error_tracking
  tag: ドキュメント
  text: エラートラッキングについて
is_beta: true
private: false
title: Error Trackingリプレイのスニペット
---
{{< callout url="https://www.datadoghq.com/product-preview/error-tracking-replay-snippets/" btn_hidden="false"  >}}
Error Trackingリプレイのスニペットはプレビュー版です。
{{< /callout >}}

## 概要{#overview}

フロントエンドエンジニアにとって、デバッグプロセスにおいて不可欠であり、かつ時間がかかることが多い作業が、バグの再現です。しかし、アプリケーションでエラーが発生する前にユーザーがどのような操作を行ったかを明確に把握できなければ、それを行うのは困難な場合があります。

Error Trackingリプレイのスニペットを使用すると、エラー発生前後の15秒間のユーザーのジャーニーをピクセル単位で完全に再現して表示できるため、バグを再現し、時間を節約し、推測を排除できます。

## セットアップ {#setup}

1. Datadog Frontend Error Trackingをまだ設定していない場合は、[アプリ内のセットアップ手順][1]に従うか、[ブラウザ][2]および[モバイル][3]のセットアップドキュメントを参照してください。
2. SDKの初期化中に、アプリケーションのリプレイサンプリングレートを構成します。

   {{< tabs >}}
   {{% tab "ブラウザ" %}}

   `sessionReplaySampleRate`を1から100の間で設定します。

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
   [こちらのステップ][4]に従って、このプラットフォームのモバイルアプリケーションのエラーリプレイをセットアップおよび構成してください。

   [4]: /session_replay/setup_and_configuration/?platform=ios
   {{% /tab %}}
   {{% tab "Android" %}}
   [こちらのステップ][5]に従って、このプラットフォームのモバイルアプリケーションのエラーリプレイをセットアップおよび構成してください。

   [5]: /session_replay/setup_and_configuration/?platform=android
   {{% /tab %}}
   {{% tab "Kotlin Multiplatform" %}}
   [こちらのステップ][6]に従って、このプラットフォームのモバイルアプリケーションのエラーリプレイをセットアップおよび構成してください。

   [6]: /session_replay/setup_and_configuration/?platform=kotlin_multiplatform
   {{% /tab %}}
   {{% tab "React Native" %}}
   [こちらのステップ][7]に従って、このプラットフォームのモバイルアプリケーションのエラーリプレイをセットアップおよび構成してください。

   [7]: /session_replay/setup_and_configuration/?platform=react_native
   {{% /tab %}}
   {{</tabs>}}

## エラーのリプレイ{#replay-errors}
エラーメッセージやスタックトレースなどのエラーに関する主要な情報を確認した後、問題の概要から、そのエラーが発生した最新のセッションのライブ再現に直接移行できます。スタックトレースの下までスクロールし、リプレイのプレビューをクリックすると、エラー発生前のユーザーの操作を確認できます。

{{< img src="error_tracking/error-replay-2.png" alt="Error Trackingリプレイのスニペット" style="width:90%" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /ja/error_tracking/frontend/browser#setup
[3]: /ja/error_tracking/frontend/mobile