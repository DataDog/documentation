---
aliases:
- /ja/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/ios/
description: iOS Monitoring の問題のトラブルシューティング方法を説明します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: ソースコード
  text: dd-sdk-ios のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog Real User Monitoring
title: iOS SDK の問題のトラブルシューティング
---

## 概要

Datadog RUM で予期せぬ動作が発生した場合、このガイドを使用して問題を迅速に解決してください。問題が解決しない場合は、[Datadog サポート][1]にお問い合わせください。

## Datadog SDK が適切に初期化されているかどうか確認

Datadog SDKを構成し、アプリを初回実行した後、Xcode のデバッガコンソールを確認します。SDK はいくつかの一貫性チェックを実装しており、構成ミスがある場合は関連する警告を出力します。

## デバッグ
アプリケーションの作成時に、`verbosityLevel` 値を設定することで開発ログを有効にすることができます。設定したレベルと同等以上の優先度を持つ SDK からの関連メッセージが、Xcode のデバッガコンソールに出力されます。

```swift
Datadog.verbosityLevel = .debug
```

その後、RUM データのバッチが正しくアップロードされたことを示す以下のような出力が表示されます。
```
[DATADOG SDK] 🐶 → 17:23:09.849 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 17:23:10.972 [DEBUG]    → (rum) accepted, won't be retransmitted: success
```

**推奨:** `DEBUG` ビルド構成では `Datadog.verbosityLevel` を使用し、`RELEASE` では設定を解除してください。　

## 独自のセッションデリゲートで `DDURLSessionDelegate` を使用する

`DDURLSessionDelegate` を使って[ネットワークリクエストを自動的に追跡][2]したい場合でも、アプリがすでに独自のセッションデリゲートを実装しているなら、_inheritance_ または _composition_ のいずれかのパターンを用いて `DDURLSessionDelegate` に呼び出しを転送できます。

_inheritance_ パターンを使用する場合は、カスタムデリゲートのベースクラスとして `DDURLSessionDelegate` を使用し、オーバーライドしたメソッドから `super` の実装を必ず呼び出してください。例:

```swift
class YourCustomDelegateURLSessionDelegate: DDURLSessionDelegate {
    override func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        super.urlSession(session, task: task, didCompleteWithError: error) // Datadog デリゲートに転送する
        /* カスタムロジック */
    }
}
```

_composition_ パターンを使用する場合は、Datadog の `__URLSessionDelegateProviding` プロトコルを利用して `DDURLSessionDelegate` の内部インスタンスを保持し、`ddURLSessionDelegate` に呼び出しを転送します。例:

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
**注**: _composition_ を使用する場合、`ddURLSessionDelegate` は [`__URLSessionDelegateProviding` のコメント][3] に記載された必要なすべての呼び出しを受け取る必要があります。デリゲートは次を実装する必要があります:
* `URLSessionTaskDelegate` を実装し、以下を転送する
  * [`urlSession(_:task:didFinishCollecting:)`][4]
  * [`urlSession(_:task:didCompleteWithError:)`][5]
* `URLSessionDataDelegate` を実装し、以下を転送する
  * [`urlSession(_:dataTask:didReceive:)`][6]

## "Deobfuscation failed" warning

スタックトレースの難読化解除に失敗した場合、警告が表示されることがあります。スタックトレースがもともと難読化されていない場合は、この警告は無視してかまいません。そうでない場合は、[RUM Debug Symbols ページ][7]でアップロード済みの dSYM ファイルをすべて確認してください。[RUM Debug Symbols を用いた難読化スタックトレースの調査][8]も併せてご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: /ja/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration/?tab=swift#automatically-track-network-requests
[3]: https://github.com/DataDog/dd-sdk-ios/blob/56e972a6d3070279adbe01850f51cb8c0c929c52/DatadogInternal/Sources/NetworkInstrumentation/URLSession/DatadogURLSessionDelegate.swift#L14
[4]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1643148-urlsession
[5]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1411610-urlsession
[6]: https://developer.apple.com/documentation/foundation/urlsessiondatadelegate/1411528-urlsession
[7]: https://app.datadoghq.com/source-code/setup/rum
[8]: /ja/real_user_monitoring/guide/debug-symbols