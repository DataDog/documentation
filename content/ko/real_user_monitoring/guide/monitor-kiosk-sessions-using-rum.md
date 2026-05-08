---
description: RUM을 사용하여 키오스크 세션을 모니터링하기 위한 가이드입니다.
further_reading:
- link: /real_user_monitoring/platform/dashboards/
  tag: 설명서
  text: RUM 대시보드
title: RUM을 사용하여 키오스크 세션 모니터링
---

## 개요
패스트푸드 주문기나 항공사 체크인 단말기와 같은 키오스크 애플리케이션은 짧은 시간 동안 여러 사용자를 연속적으로 응대하는 경우가 많습니다. 이러한 이유로, 세션을 자동 만료(예: 15분 비활성 또는 총 4시간 경과)를 기다리는 대신 사용자 행동을 기반으로 세션 종료를 트리거하는 기능이 필수적입니다. 이를 통해 각 사용자에 대한 정확한 세션 데이터와 메트릭을 수집할 수 있습니다. Datadog RUM SDK를 사용하면 이러한 기능을 활용하여 더욱 향상된 세션 추적 경험을 제공할 수 있습니다.

## 사용자가 상호 작용을 종료할 때 `stopSession()` 사용

SDK `stopSession()` 메서드를 사용하여 사용자가 애플리케이션과의 상호 작용을 완료할 때(예: 홈 화면으로 돌아가거나 로그아웃할 때) 세션을 중지합니다. 사용자가 애플리케이션과 다시 상호 작용하거나 새 View가 시작되면(모바일만 해당) 새 세션이 생성됩니다.

세션 내에서 사용자가 식별되면 새로 시작하기 위해 `stopSession()` 호출 이후에 사용자 정보를 초기화해야 할 수 있습니다. 애플리케이션 프레임워크에 따라 다음 문서를 참고하세요. [Browser][1], [iOS][2], [Android][3], [Flutter][4], [React Native][5].

### 브라우저

이 기능을 사용하려면 RUM Browser SDK 버전 4.37.0 이상이 필요합니다. 설치 지침은 [여기][6]에서 확인하세요.

`stopSession()` 메서드는 설치 방법에 따라 다릅니다.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
datadogRum.stopSession()
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
DD_RUM.onReady(function() {
    DD_RUM.stopSession()
})
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
  window.DD_RUM.stopSession()
```

{{% /tab %}}
{{< /tabs >}}

애플리케이션이 **여러 브라우저 탭**에 열려 있는 경우 RUM 세션을 중지하면 모든 탭에서 세션이 종료됩니다.

애플리케이션이 **Logs SDK**를 사용하는 경우 RUM 세션을 중지하면 Logs 세션도 종료됩니다.

### 모바일

`stopSession()` 메서드는 모바일 SDK 프레임워크에 따라 다릅니다.

{{< tabs >}}
{{% tab "iOS" %}}

이 기능을 사용하려면 RUM iOS SDK 버전 1.18.0 이상이 필요합니다. 설치 지침은 [여기][1]에서 확인하세요.

```swift
RUMMonitor.shared().stopSession()
```

[1]: https://docs.datadoghq.com/ko/real_user_monitoring/ios/

{{% /tab %}}
{{% tab "Android" %}}

이 기능을 사용하려면 RUM Android SDK 버전 1.19.0 이상이 필요합니다. 설치 지침은 [여기][1]에서 확인하세요.

```kotlin
GlobalRumMonitor.get().stopSession()
```

[1]: https://docs.datadoghq.com/ko/real_user_monitoring/android/

{{% /tab %}}
{{% tab "Flutter" %}}

이 기능을 사용하려면 RUM Flutter SDK 버전 1.4.0 이상이 필요합니다. 설치 지침은 [여기][1]에서 확인하세요.

```dart
DatadogSdk.instance.rum?.stopSession();
```

[1]: https://docs.datadoghq.com/ko/real_user_monitoring/application_monitoring/flutter/setup/

{{% /tab %}}
{{% tab "React Native" %}}

이 기능을 사용하려면 RUM React Native SDK 버전 1.6.0 이상이 필요합니다. 설치 지침은 [여기][1]에서 확인하세요.

```javascript
DdRum.stopSession()
```

[1]: https://docs.datadoghq.com/ko/real_user_monitoring/reactnative/

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=cdnsync#clear-user-session-property
[2]: /ko/real_user_monitoring/ios/advanced_configuration/?tab=swift
[3]: /ko/real_user_monitoring/application_monitoring/android/advanced_configuration/?tab=kotlin#track-user-sessions
[4]: /ko/real_user_monitoring/application_monitoring/flutter/advanced_configuration/#track-user-sessions
[5]: /ko/real_user_monitoring/reactnative/#user-information
[6]: /ko/real_user_monitoring/application_monitoring/browser/