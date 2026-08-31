---
aliases:
- /ko/real_user_monitoring/ios
- /ko/real_user_monitoring/ios/getting_started
- /ko/real_user_monitoring/ios/swiftui/
- /ko/real_user_monitoring/swiftui/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/swiftui/
beta: true
code_lang: ios
code_lang_weight: 20
description: iOS 및 tvOS 애플리케이션에서 RUM 또는 Error Tracking 데이터를 수집합니다.
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
  tag: 설명서
  text: RUM iOS 고급 구성
- link: https://github.com/DataDog/dd-sdk-ios
  tag: 소스 코드
  text: dd-sdk-ios 소스 코드
- link: /real_user_monitoring
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
- link: /real_user_monitoring/error_tracking/ios/
  tag: 설명서
  text: iOS 오류 추적 방법 알아보기
- link: /real_user_monitoring/ios/swiftui/
  tag: 설명서
  text: SwiftUI 애플리케이션 계측에 대해 알아보기
- link: /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/
  tag: 설명서
  text: RUM iOS 및 tvOS 모니터링 지원 버전
title: iOS 및 tvOS 모니터링 설정
type: multi-code-lang
---

## 개요

이 페이지에서는 iOS SDK를 사용하여 [Real User Monitoring(RUM)][1] 및 [Error Tracking][2] 모두에서 애플리케이션을 계측하는 방법을 설명합니다. 아래 단계에 따라 RUM(Error Tracking 포함) 또는 Error Tracking(독립형 제품으로 구매한 경우)을 사용하여 애플리케이션을 계측할 수 있습니다.

## 설정

1. SDK를 종속성으로 선언합니다.
2. UI에서 애플리케이션 세부 정보를 지정합니다.
3. 라이브러리를 초기화합니다.
4. Datadog 모니터를 초기화하고 `URLSessionInstrumentation`를 활성화하여 데이터 전송을 시작합니다.

### SDK를 종속성으로 선언

패키지 관리자에 따라 라이브러리를 종속성으로 선언하세요. Swift 패키지 관리자(SPM)를 권장합니다.

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple의 Swift 패키지 관리자를 사용하여 통합하려면 다음을 종속 항목으로 `Package.swift`에 추가합니다.
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

프로젝트에서 다음 라이브러리를 연결합니다.
```
DatadogCore
DatadogRUM
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

[CocoaPods][1]을 사용하여 `dd-sdk-ios`을 설치할 수 있습니다.
```
pod 'DatadogCore'
pod 'DatadogRUM'
```


[1]: https://cocoapods.org/
{{% /tab %}}
{{% tab "Carthage" %}}

[Carthage][1]를 사용하여 `dd-sdk-ios`를 설치할 수 있습니다.
```
github "DataDog/dd-sdk-ios"
```

Xcode에서 다음 프레임워크를 연결합니다.
```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogRUM.xcframework
```

[1]: https://github.com/Carthage/Carthage
{{% /tab %}}
{{< /tabs >}}

### UI에서 애플리케이션 세부 정보를 지정합니다.

{{< tabs >}}
{{% tab "RUM" %}}

1. [**Digital Experience** > **Add an Application**][1]로 이동합니다.
2. 애플리케이션 유형으로 `iOS`를 선택하고 애플리케이션 이름을 입력하여 고유한 Datadog 애플리케이션 ID와 클라이언트 토큰을 생성합니다.
3. 웹 뷰를 계측하려면 ***Instrument your webviews** 토글을 클릭합니다. 자세한 내용은 [웹 뷰 트래킹][2]을 참조하세요.
4. 클라이언트 IP 또는 지리적 위치 데이터에 대한 자동 사용자 데이터 수집을 사용하지 않으려면 해당 설정의 토글을 사용하세요. 자세한 내용은 [RUM iOS 데이터 수집][3]을 참조하세요.

   {{< img src="real_user_monitoring/ios/ios-create-application.png" alt="Datadog에서 iOS용 RUM 애플리케이션 생성" style="width:100%;border:none" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/real_user_monitoring/ios/web_view_tracking/
[3]: /ko/real_user_monitoring/ios/data_collected/

{{% /tab %}}
{{% tab "Error Tracking" %}}

1. [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][1]으로 이동합니다.
2. 애플리케이션 유형으로 `iOS`를 선택하고 애플리케이션 이름을 입력하여 고유한 Datadog 애플리케이션 ID와 클라이언트 토큰을 생성합니다.
3. 웹 뷰를 계측하려면 **웹 뷰 계측** 토글을 클릭합니다. 자세한 내용은 [웹 뷰 트래킹][2]을 참조하세요.
4. 클라이언트 IP 또는 지리적 위치 데이터에 대한 자동 사용자 데이터 수집을 사용하지 않으려면 해당 설정의 토글을 사용합니다. 자세한 내용은 [iOS 데이터 수집][3]을 참조하세요.

   {{< img src="real_user_monitoring/error_tracking/mobile-new-application.png" alt="Datadog에서 iOS 애플리케이션 생성" style="width:90%;">}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /ko/real_user_monitoring/ios/web_view_tracking/
[3]: /ko/real_user_monitoring/ios/data_collected/

{{% /tab %}}
{{< /tabs >}}

데이터의 안전을 보장하려면 클라이언트 토큰을 사용해야 합니다. Datadog API 키][3]만 사용하여 `dd-sdk-ios` 라이브러리를 구성하는 경우 iOS 애플리케이션의 바이트 코드에 클라이언트 측에 노출됩니다.

클라이언트 토큰 설정에 대한 자세한 내용은 [클라이언트 토큰 설명서][4]를 참조하세요.

### 라이브러리 초기화

초기화 스니펫에서 환경 이름, 서비스 이름 및 버전 번호를 설정합니다. 아래 예제에서 `app-name`은 데이터를 생성하는 애플리케이션의 버전을 지정합니다.

자세한 내용은 [태그 사용][5]을 참조하세요.

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .eu1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite eu1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us3,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us3];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us5,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us5];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us1_fed,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us1_fed];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .ap1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

iOS SDK에서는 SDK 초기화에서 제공된 옵션에 따라 사용자 세션을 자동으로 추적합니다. EU 사용자에 대한 GDPR 준수 및 기타 [초기화 매개변수][6]를 SDK 구성에 추가하려면 [추적 동의 설정 설명서](#set-tracking-consent-gdpr-compliance)를 참조하세요.

### RUM 세션 예시

<div class="alert alert-danger">Error Tracking에는 세션 샘플 속도 구성이 적용되지 않습니다.</div>

애플리케이션이 Datadog RUM으로 전송하는 데이터를 제어하려면 [RUM iOS SDK 초기화][7] 중에 RUM 세션의 샘플링 속도를 지정합니다. 비율은 0에서 100 사이의 백분율입니다. 기본적으로 `sessionSamplingRate`은 100으로 설정되어 있습니다(모든 세션 유지).

예를 들어, 세션 사용량의 50%만 유지하려면 다음과 같이 하세요.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    sessionSampleRate: 50
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
configuration.sessionSampleRate = 50;
```
{{% /tab %}}
{{< /tabs >}}

### 추적 동의 설정(GDPR 준수)

GDPR 규정을 준수하려면, RUM iOS 소프트웨어 개발 키트(SDK)는 초기화 시 추적 동의 값이 필요합니다.

`trackingConsent` 설정은 다음 값 중 하나가 될 수 있습니다:

1. `.pending`: RUM iOS 소프트웨어 개발 키트(SDK)는 데이터 수집 및 일괄 처리 작업을 시작하지만 해당 데이터를 Datadog으로 전송하지는 않습니다. RUM iOS소프트웨어 개발 키트(SDK)는 새로운 추적 동의 값을 기다렸다가 일괄 처리된 데이터로 실행할 작업을 결정합니다.
2. `.granted`: RUM iOS 소프트웨어 개발 키트(SDK)가 데이터 수집을 시작하고 Datadog으로 해당 데이터를 전송합니다.
3. `.notGranted`: RUM iOS SDK는 어떠한 데이터도 수집하지 않습니다. Datadog로 로그, 추적 또는 이벤트가 전송되지 않습니다.

 RUM iOS SDK 초기화 후 추적 동의 값을 변경하려면 `Datadog.set(trackingConsent:)` API 호출을 사용합니다. RUM iOS SDK에서 새로운 값에 따라 동작을 변경합니다.

예를 들어 현재 추적 동의가 `.pending`인 경우는 다음과 같습니다.

- 값을 `.granted`로 변경하면 RUM iOS 소프트웨어 개발 키트(SDK)는 현재 및 향후 모든 데이터를 Datadog 으로 전송합니다.
- 값을 `.notGranted`로 변경하면 RUM iOS 소프트웨어 개발 키트(SDK)는 현재 데이터를 모두 삭제하고 향후 데이터를 수집하지 않습니다.

### Datadog 모니터 초기화 및 `URLSessionInstrumentation` 활성화

Datadog 모니터를 구성하고 등록합니다. 보통 `AppDelegate` 코드에 한 번만 등록하면 됩니다.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    urlSessionTracking: RUM.Configuration.URLSessionTracking()
  )
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
configuration.uiKitViewsPredicate = [DDDefaultUIKitRUMViewsPredicate new];
configuration.uiKitActionsPredicate = [DDDefaultUIKitRUMActionsPredicate new];
[configuration setURLSessionTracking:[DDRUMURLSessionTracking new]];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{% /tabs %}}

`URLSession` 인스턴스에서 리소스로 전송된 요청을 모니터로 보내려면 위임 유형에 대해 `URLSessionInstrumentation`을 활성화하고 위임 인스턴스를 `URLSession`으로 전달합니다.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: <YourSessionDelegate>.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: <YourSessionDelegate>(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[<YourSessionDelegate> class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[<YourSessionDelegate> alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}


### 뷰 계측

Datadog iOS SDK에서는 `SwiftUI` 애플리케이션의 뷰를 계측할 수 있습니다. 이 계측 기능은 하이브리드 `UIKit` 및 `SwiftUI` 애플리케이션에서도 작동합니다.

`SwiftUI.View`를 계측하려면 보기 선언에 다음 메서드를 추가하세요.

```swift
import SwiftUI
import DatadogRUM

struct FooView: View {

    var body: some View {
        FooContent {
            ...
        }
        .trackRUMView(name: "Foo")
    }
}
```

`trackRUMView(name:)` 메서드는 `SwiftUI` 뷰가 화면에서 나타나고 사라질 때 뷰를 시작하고 중지합니다.

### 계측 탭 작업

Datadog iOS SDK에서 `SwiftUI` 애플리케이션의 탭 동작을 계측할 수 있습니다. 이 계측 기능은 하이브리드 `UIKit` 및 `SwiftUI` 애플리케이션에서도 작동합니다.

`SwiftUI.View`에서 탭 작업을 계측하려면 보기 선언에 다음 메서드를 추가하세요.

```swift
import SwiftUI
import DatadogRUM

struct BarView: View {

    var body: some View {
        Button("BarButton") { {
            ...
        }
        .trackRUMTapAction(name: "Bar")
    }
}
```

## 백그라운드 이벤트 추적

<div class="alert alert-info"><p>백그라운드 이벤트 추적으로 추가 세션이 발생하여 청구 금액에 영향을 미칠 수 있습니다. 자세한 내용은 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀에 문의하세요.</a></p>
</div>

애플리케이션이 백그라운드에서 동작할 때(예: 활성 보기를 사용할 수 없음) 크래시 및 네트워크 요청과 같은 이벤트를 추적할 수 있습니다.

Datadog 설정에서 초기화하는 동안 다음 스니펫을 추가합니다:

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    ...
    trackBackgroundEvents: true
  )
)
```

## iOS 오류 추적

[iOS 크래시 보고 및 Error Tracking][7]에서는 애플리케이션의 모든 문제와 사용 가능한 최신 오류를 표시합니다. [RUM 탐색기)][9]에서 JSON을 포함한 오류 세부 정보 및 속성을 확인할 수 있습니다.

## 디바이스가 오프라인일 때 데이터 전송

iOS SDK는 사용자 디바이스가 오프라인 상태일 때 데이터 가용성을 보장합니다. 네트워크가 약한 지역이나 디바이스 배터리가 부족할 경우 모든 이벤트는 먼저 로컬 디바이스에 일괄적으로 저장됩니다. 네트워크를 사용할 수 있고 배터리가 충분히 충전되는 즉시 iOS SDK 최종 사용자의 경험에 영향을 미치지 않는 방식으로 전송됩니다. 애플리케이션이 포그라운드에 있는 동안 네트워크를 사용할 수 없거나 데이터 업로드에 실패하면 성공적으로 전송될 때까지 배치가 유지됩니다.

즉, 사용자가 오프라인 상태에서 애플리케이션을 열어도 데이터가 손실되지 않습니다.

**참고**: iOS SDK에서 디스크 공간을 너무 많이 사용하지 않도록 하기 위해 디스크의 데이터가 너무 오래되면 자동으로 삭제됩니다.

## 지원 버전

iOS SDK와 호환되는 운영 체제 버전 및 플랫폼 목록은 [지원되는 버전][10]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/
[2]: /ko/error_tracking/
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: /ko/account_management/api-app-keys/#client-tokens
[5]: /ko/getting_started/tagging/using_tags/#rum--session-replay
[6]: /ko/real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[7]: https://github.com/DataDog/dd-sdk-ios
[8]: /ko/real_user_monitoring/error_tracking/ios/
[9]: /ko/real_user_monitoring/explorer/
[10]: /ko/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/