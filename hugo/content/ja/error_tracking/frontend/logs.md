---
aliases:
- /ja/error_tracking/standalone_frontend/logs
description: ログからブラウザやモバイルのエラーを追跡する方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: ブログ
  text: Datadog Error Tracking で、アプリケーションの問題を解明
- link: /logs/error_tracking/explorer/
  tag: ドキュメント
  text: エラートラッキングエクスプローラーについて
is_beta: false
title: ブラウザおよびモバイルのエラーログを追跡する
---

## 概要

Error Tracking は、ブラウザおよびモバイル向け Datadog Log SDK で収集したエラーを処理します。スタックトレースを含むエラーが収集されるたびに、Error Tracking はそれを処理し、類似したエラーをまとめた _issue_ にグループ化します。

ログのエラーに不可欠な属性は、ログの `error.stack` にあるスタックトレースです。もし、スタックトレースを Datadog に送信しているが、`error.stack` にない場合、[ジェネリックログリマッパー][6]をセットアップして、スタックトレースを Datadog の正しい属性にリマップすることが可能です。

クラッシュレポートは [**Error Tracking**][2] に表示されます。

## セットアップ

{{< tabs >}}
{{% tab "ブラウザ" %}}

まだ Datadog Browser Logs SDK を設定していない場合は、[アプリ内セットアップ手順][1]に従うか、[Browser Logs のセットアップドキュメント][2]を参照してください。

1. Logs Browser SDK の最新版をダウンロードしてください。エラー追跡には、少なくとも `v4.36.0` が必要です。
2. [SDK の初期化][3]の際に、アプリケーションの `version`、`env`、`service` を構成します。例えば、NPM で

   ```javascript
   import { datadogLogs } from '@datadog/browser-logs'

   datadogLogs.init({
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     service: '<MY_SERVICE>',
     env: '<MY_ENV>',
     forwardErrorsToLogs: true,
     sessionSampleRate: 100,
   })
   ```

3. キャッチした例外を自分でログに残すには、[オプションのエラーパラメーター][4]を使用することができます。

   ```javascript
   try {
     throw new Error('wrong behavior');
   } catch(err) {
     datadogLogs.logger.error("an error occurred", {usr: {id: 123}}, err);
   }
   ```

**注**: エラー追跡は、`Error` のインスタンスであるエラーのみを考慮します。

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /ja/logs/log_collection/javascript/#setup
[3]: /ja/logs/log_collection/javascript/#choose-the-right-installation-method
[4]: /ja/logs/log_collection/javascript/#error-tracking

{{% /tab %}}
{{% tab "Android" %}}

まだ Datadog Android Logs SDK を設定していない場合は、[アプリ内セットアップ手順][1]に従うか、[Android Logs のセットアップドキュメント][2]を参照してください。

1. [Datadog Android SDK for Logs][3] の最新版をダウンロードします。
2. [SDK の初期化][4]の際に、アプリケーションの `version`、`env`、`service` を構成します。
3. キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

   ```kotlin
   try {
     doSomething()
   } catch (e: IOException) {
     logger.e("an exception occurred", e)
   }
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /ja/logs/log_collection/android/#setup
[3]: https://github.com/Datadog/dd-sdk-android
[4]: /ja/logs/log_collection/android/?tab=kotlin#setup

{{% /tab %}}
{{% tab "iOS" %}}

まだ Datadog iOS Logs SDK を設定していない場合は、[アプリ内セットアップ手順][1]に従うか、[iOS Logs のセットアップドキュメント][2]を参照してください。

1. [Datadog iOS SDK for Logs][3] の最新版をダウンロードします。
2. [SDK の初期化][4]の際に、アプリケーションの `version`、`env`、`service` を構成します。
3. キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

   ```swift
   do {
     // ...
   } catch {
     logger.error("an exception occurred", error)
   }
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /ja/logs/log_collection/ios/#setup
[3]: https://github.com/Datadog/dd-sdk-ios
[4]: /ja/logs/log_collection/ios/?tab=cocoapods#setup

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

まだ Datadog Kotlin Multiplatform Logs SDK を設定していない場合は、[アプリ内セットアップ手順][1]に従うか、[Kotlin Multiplatform Logs のセットアップドキュメント][2]を参照してください。

1. [Datadog Kotlin Multiplatform SDK for Logs][3] の最新バージョンをダウンロードしてください。
2. SDK の[初期化][2]時に、アプリケーションの `version`、`env`、`service` を設定します。
3. キャッチした例外を自分でログに残すには、オプションで以下を使用できます。

   ```kotlin
   try {
     doSomething()
   } catch (e: IOException) {
     logger.error("an exception occurred", e)
   }
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /ja/logs/log_collection/kotlin_multiplatform/#setup
[3]: https://github.com/Datadog/dd-sdk-kotlin-multiplatform

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/logs/error-tracking
[3]: https://app.datadoghq.com/logs/onboarding/client
[4]: /ja/logs/log_collection/javascript/#setup
[5]: /ja/logs/log_collection/javascript/#choose-the-right-installation-method
[6]: /ja/logs/log_configuration/processors/?tab=ui#remapper