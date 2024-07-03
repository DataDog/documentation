---
aliases:
- /ja/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/
code_lang: ios
code_lang_weight: 20
description: Learn how to troubleshoot issues with iOS Monitoring.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: ソースコード
  text: Source code for dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentation
  text: Datadog Real User Monitoring
kind: documentation
title: Troubleshooting iOS SDK issues
type: multi-code-lang
---

## 概要

If you experience unexpected behavior with Datadog RUM, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Datadog SDK が適切に初期化されているかどうか確認

Datadog SDKを構成し、アプリを初回実行した後、Xcode のデバッガコンソールを確認します。SDK はいくつかの一貫性チェックを実装しており、構成ミスがある場合は関連する警告を出力します。

## デバッグ
アプリケーションの作成時に、`verbosityLevel` 値を設定することで開発ログを有効にすることができます。設定したレベルと同等以上の優先度を持つ SDK からの関連メッセージが、Xcode のデバッガコンソールに出力されます。

```swift
Datadog.verbosityLevel = .debug
```

You should then see an output similar to the below, indicating that a batch of RUM data was properly uploaded:
```
[DATADOG SDK] 🐶 → 17:23:09.849 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 17:23:10.972 [DEBUG]    → (rum) accepted, won't be retransmitted: success
```

**Recommendation:** Use `Datadog.verbosityLevel` in the `DEBUG` configuration, and unset it in `RELEASE`.

## 独自のセッションデリゲートで `DDURLSessionDelegate` を使用する

If you want to [automatically track network requests][2] with `DDURLSessionDelegate` but your app already implements its own session delegate, you can use either _inheritance_ or _composition_ patterns and forward calls to `DDURLSessionDelegate`.

When using an _inheritance_ pattern, use `DDURLSessionDelegate` as a base class for your custom delegate and make sure to call the `super` implementation from your overridden methods. For example:

```swift
class YourCustomDelegateURLSessionDelegate: DDURLSessionDelegate {
    override func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        super.urlSession(session, task: task, didCompleteWithError: error) // Datadog デリゲートに転送する
        /* カスタムロジック */
    }
}
```

When using a _composition_ pattern, leverage Datadog's `__URLSessionDelegateProviding` protocol to keep an internal instance of `DDURLSessionDelegate` and forward calls to `ddURLSessionDelegate`. For example:

```swift
private class YourCustomDelegateURLSessionDelegate: NSObject, URLSessionTaskDelegate, URLSessionDataDelegate, __URLSessionDelegateProviding {
    // MARK: - __URLSessionDelegateProviding conformance

    let ddURLSessionDelegate = DDURLSessionDelegate()

    // MARK: - __URLSessionDelegateProviding handling

    func urlSession(_ session: URLSession, task: URLSessionTask, didFinishCollecting metrics: URLSessionTaskMetrics) {
        d dURLSessionDelegate.urlSession(session, task: task, didFinishCollecting: metrics) // Datadog デリゲートに転送する
        /* カスタムロジック */
    }

    func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        ddURLSessionDelegate.urlSession(session, task: task, didCompleteWithError: error) // Datadog デリゲートに転送する
        /* カスタムロジック */
    }

    func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive data: Data) {
        ddURLSessionDelegate.urlSession(session, dataTask: dataTask, didReceive: data) // Datadog デリゲートに転送する
        /* カスタムロジック */
    }
}
```
**Note**: If using _composition_, `ddURLSessionDelegate` must receive all necessary calls listed in [`__URLSessionDelegateProviding` protocol comments][3]. Your delegate needs to:
* `URLSessionTaskDelegate` を実装し、以下を転送する
  * [`urlSession(_:task:didFinishCollecting:)`][4]
  * [`urlSession(_:task:didCompleteWithError:)`][5]
* `URLSessionDataDelegate` を実装し、以下を転送する
  * [`urlSession(_:dataTask:didReceive:)`][6]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: /ja/real_user_monitoring/ios/advanced_configuration/?tab=swift#automatically-track-network-requests
[3]: https://github.com/DataDog/dd-sdk-ios/blob/56e972a6d3070279adbe01850f51cb8c0c929c52/DatadogInternal/Sources/NetworkInstrumentation/URLSession/DatadogURLSessionDelegate.swift#L14
[4]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1643148-urlsession
[5]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1411610-urlsession
[6]: https://developer.apple.com/documentation/foundation/urlsessiondatadelegate/1411528-urlsession