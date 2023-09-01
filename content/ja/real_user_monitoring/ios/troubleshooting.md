---
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Github
  text: dd-sdk-ios のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog Real User Monitoring
kind: documentation
title: トラブルシューティング
---

## Datadog SDK が適切に初期化されているかどうか確認

Datadog SDKを構成し、アプリを初回実行した後、Xcode のデバッガコンソールを確認します。SDK はいくつかの一貫性チェックを実装しており、構成ミスがある場合は関連する警告を出力します。

## デバッグ作業
アプリケーションの作成時に、`verbosityLevel` 値を設定することで開発ログを有効にすることができます。設定したレベルと同等以上の優先度を持つ SDK からの関連メッセージが、Xcode のデバッガコンソールに出力されます。

```swift
Datadog.verbosityLevel = .debug
```

すべての処理が完了すると、RUM データのバッチが正しくアップロードされたことを示す以下のような出力が表示されます。
```
[DATADOG SDK] 🐶 → 17:23:09.849 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 17:23:10.972 [DEBUG]    → (rum) accepted, won't be retransmitted: success
```

**推奨:** `DEBUG` コンフィギュレーションで `Datadog.verbosityLevel` を使用し、`RELEASE` で設定を解除してください。　

## 独自のセッションデリゲートで `DDURLSessionDelegate` を使用する

`DDURLSessionDelegate` を使って[ネットワークリクエストを自動的に追跡][1]したいが、アプリがすでに独自のセッションデリゲートを実装している場合は、_inheritance_ または _composition_ のいずれかのパターンを使って `DDURLSessionDelegate` に呼び出しを転送することが可能です。

_inheritance_ を使用する場合は、カスタムデリゲートのベースクラスとして `DDURLSessionDelegate` を使用し、オーバーライドするメソッドから `super` の実装を必ず呼び出すようにしてください。例:
```swift
class YourCustomDelegateURLSessionDelegate: DDURLSessionDelegate {
    override func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        super.urlSession(session, task: task, didCompleteWithError: error) // Datadog デリゲートに転送する
        /* カスタムロジック */
    }
}
```

_composition_ を使う場合は、Datadog の `__URLSessionDelegateProviding` プロトコルを利用して、`DDURLSessionDelegate` の内部インスタンスを保持して、`ddURLSessionDelegate` に呼び出しを転送します。例:
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
**注**: _composition_ を使用する場合、`ddURLSessionDelegate` は [`__URLSessionDelegateProviding` プロトコルコメント][2] に記載されている必要なすべての呼び出しを受け取る必要があります。デリゲートには以下が必要です。
* `URLSessionTaskDelegate` を実装し、以下を転送する
  * [`urlSession(_:task:didFinishCollecting:)`][3]
  * [`urlSession(_:task:didCompleteWithError:)`][4]
* `URLSessionDataDelegate` を実装し、以下を転送する
  * [`urlSession(_:dataTask:didReceive:)`][5]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/ios/advanced_configuration/?tab=swift#automatically-track-network-requests
[2]: https://github.com/DataDog/dd-sdk-ios/blob/master/Sources/Datadog/URLSessionAutoInstrumentation/DDURLSessionDelegate.swift#L12
[3]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1643148-urlsession
[4]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1411610-urlsession
[5]: https://developer.apple.com/documentation/foundation/urlsessiondatadelegate/1411528-urlsession