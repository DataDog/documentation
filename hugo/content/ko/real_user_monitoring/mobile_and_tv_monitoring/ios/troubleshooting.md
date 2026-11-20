---
aliases:
- /ko/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/ios/
description: iOS 모니터링 문제를 해결하는 방법을 알아보세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: 소스 코드
  text: dd-sdk-ios 소스 코드
- link: /real_user_monitoring
  tag: 설명서
  text: Datadog 실제 사용자 모니터링
title: iOS SDK 문제 해결
---

## 개요

Datadog RUM을 사용하면서 예기지 못한 동작을 경험하였다면 이 가이드를 통해 빠르게 문제를 해결하세요. 문제가 지속되면 [Datadog 지원팀][1]에 문의하여 추가 지원을 받으세요.

## Datadog SDK 초기화가 적절하게 완료되었는지 확인

Datadog SDK를 구성하고 최초로 앱을 실행한 후 Xcode의 디버거 콘솔을 확인합니다. 잘못 구성된 경우, SDK가 여러 일관성 점검과 출력 관련 경고를 구축합니다.

## 디버깅
애플리케이션 작성 시 `verbosityLevel` 값을 설정하여 개발 로그를 활성화할 수 있습니다. 제공된 수준보다 높은 우선순위를 지닌 SDK 관련 메시지는 Xcode의 디버거 콘솔에 출력됩니다.

```swift
Datadog.verbosityLevel = .debug
```

그러면 아래와 같은 유사 출력이 표시되며, 이는 RUM 데이터 배치가 제대로 업로드되었음을 나타냅니다.
```
[DATADOG SDK] 🐶 → 17:23:09.849 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 17:23:10.972 [DEBUG]    → (rum) accepted, won't be retransmitted: success
```

**권장 사항:** `DEBUG` 구성에서 `Datadog.verbosityLevel`을 사용하고 `RELEASE`에서 설정 해제합니다.

## 자체적인 세션 위임을 통해 `DDURLSessionDelegate` 사용하기

`DDURLSessionDelegate`을 사용해 [네트워크 요청을 자동으로 추적][2]하려 하나, 앱에 이미 자체적인 세션 위임이 구현된 경우 _상속_ 또는 _구성_ 패턴을 사용하여 `DDURLSessionDelegate`으로 호출을 전달할 수 있습니다.

_상속_ 패턴을 사용할 때는 사용자 정의 위임의 기본 클래스로 `DDURLSessionDelegate`을 사용하고 재정의된 메서드에서 `super` 구현을 호출해야 합니다. 다음 예를 참고하세요.

```swift
class YourCustomDelegateURLSessionDelegate: DDURLSessionDelegate {
    override func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        super.urlSession(session, task: task, didCompleteWithError: error) // forward to Datadog delegate
        /* your custom logic */
    }
}
```

_구성_ 패턴을 사용할 때는 Datadog의 `__URLSessionDelegateProviding` 프로토콜을 활용하여 `DDURLSessionDelegate`의 내부 인스턴스를 유지하고 호출을 `ddURLSessionDelegate`로 전달합니다 . 다음 예를 참고하세요.

```swift
private class YourCustomDelegateURLSessionDelegate: NSObject, URLSessionTaskDelegate, URLSessionDataDelegate, __URLSessionDelegateProviding {
    // MARK: - __URLSessionDelegateProviding conformance

    let ddURLSessionDelegate = DDURLSessionDelegate()

    // MARK: - __URLSessionDelegateProviding handling

    func urlSession(_ session: URLSession, task: URLSessionTask, didFinishCollecting metrics: URLSessionTaskMetrics) {
        ddURLSessionDelegate.urlSession(session, task: task, didFinishCollecting: metrics) // Datadog 위임으로 전달
        /* your custom logic */
    }

    func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        ddURLSessionDelegate.urlSession(session, task: task, didCompleteWithError: error) // Datadog 위임으로 전달
        /* your custom logic */
    }

    func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive data: Data) {
        ddURLSessionDelegate.urlSession(session, dataTask: dataTask, didReceive: data) // Datadog 위임으로 전달
        /* your custom logic */
    }
}
```
**참고**: _구성_을 사용하는 경우 `ddURLSessionDelegate`은 [`__URLSessionDelegateProviding` 프로토콜 코멘트][3] 목록에 있는 모든 필수 호출을 수신해야 합니다. 위임에서는 다음이 필요합니다.
* `URLSessionTaskDelegate` 구현 및 전달:
  * [`urlSession(_:task:didFinishCollecting:)`][4]
  * [`urlSession(_:task:didCompleteWithError:)`][5]
* `URLSessionDataDelegate` 구현 및 전달:
  * [`urlSession(_:dataTask:didReceive:)`][6]

## "Deobfuscation failed" 경고

스택 트레이스에 대한 난독화 해제에 실패하면 경고가 표시됩니다. 스택 트레이스가 아예 난독화되지 않은 경우 이 경고를 무시해도 됩니다. 그렇지 않은 경우, [RUM 디버그 기호 페이지][7]를 사용하여 업로드된 모든 dSYM을 확인하세요. [RUM 디버그 기호로 난독화된 스택 트레이스 조사][8]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help
[2]: /ko/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration/?tab=swift#automatically-track-network-requests
[3]: https://github.com/DataDog/dd-sdk-ios/blob/56e972a6d3070279adbe01850f51cb8c0c929c52/DatadogInternal/Sources/NetworkInstrumentation/URLSession/DatadogURLSessionDelegate.swift#L14
[4]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1643148-urlsession
[5]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1411610-urlsession
[6]: https://developer.apple.com/documentation/foundation/urlsessiondatadelegate/1411528-urlsession
[7]: https://app.datadoghq.com/source-code/setup/rum
[8]: /ko/real_user_monitoring/guide/debug-symbols