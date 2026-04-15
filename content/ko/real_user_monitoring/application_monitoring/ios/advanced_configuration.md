---
aliases:
- /ko/real_user_monitoring/ios/advanced_configuration
- /ko/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
- /ko/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration
description: iOS RUM SDK 고급 설정을 구성하여 사용자 세션을 강화하고 커스텀 이벤트를 추적하며 데이터 수집을 제어하여 더 나은
  인사이트를 얻으세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Source Code
  text: ddsdkios의 소스 코드
- link: /real_user_monitoring
  tag: Documentation
  text: RUM 및 세션 리플레이
- link: /real_user_monitoring/application_monitoring/ios/supported_versions/
  tag: Documentation
  text: RUM iOS 및 tvOS 모니터링 지원 버전
- link: https://github.com/DataDog/dd-sdk-ios-apollo-interceptor
  tag: Source Code
  text: Apollo iOS용 Datadog 통합
title: iOS 고급 구성
---
RUM iOS SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][1]을 따르거나 [RUM iOS 설정 설명서][2]를 참조하세요.

## 사용자 세션 강화

iOS RUM은 사용자 활동, 화면, 오류 및 네트워크 요청과 같은 속성을 자동으로 추적합니다. RUM 이벤트 및 기본 속성에 대해 알아보려면 [RUM 데이터 수집 설명서][3]를 참조하세요. 커스텀 이벤트를 추적하여 사용자 세션 정보를 강화하고 수집한 속성을 세밀하게 제어할 수 있습니다.

### 커스텀 조회

[조회 자동 추적](#automaticallytrackviews) 외에도, 특정 고유 조회(예: `viewControllers`)가 표시되고 상호작용 가능해질 때 추적할 수 있습니다. 조회가 더 이상 표시되지 않을 때 추적을 중지하려면 `RUMMonitor.shared()`에서 다음 메서드를 사용하세요.

 `.startView(viewController:)`
 `.stopView(viewController:)`

예:

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogRUM

// in your `UIViewController`:
let rum = RUMMonitor.shared()

override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    rum.startView(viewController: self)
}

override func viewDidDisappear(_ animated: Bool) {
  super.viewDidDisappear(animated)
  rum.stopView(viewController: self)
}
```

{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
@import DatadogRUM;
// in your `UIViewController`:

DDRUMMonitor *rum = [DDRUMMonitor shared];

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    [rum startViewWithViewController:self name:nil attributes:nil];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];

    [rum stopViewWithViewController:self attributes:nil];
}
```
{{% /tab %}}
{{< /tabs >}}

자세한 내용 및 사용 가능한 옵션은 GitHub의 [`RUMMonitorProtocol`][4]을 참조하세요.

### 커스텀 액션

[액션 자동 추적](#automaticallytrackuseractions) 외에도, `addAction(type:name:)` API를 사용하여 특정 커스텀 액션(탭, 클릭, 스크롤)을 추적할 수 있습니다.

`.tap`과 같은 순간적인 RUM 액션을 수동으로 등록하려면 `RUMMonitor.shared()`에서 `.addAction(type:name:)`을 사용하세요. `.scroll`과 같은 지속적인 RUM 액션은 `.startAction(type:name:)` 또는 `.stopAction(type:)`을 사용하세요.

예:

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogRUM

// in your `UIViewController`:

let rum = RUMMonitor.shared()

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    rum.addAction(
        type: .tap,
        name: sender.currentTitle ?? ""
    )
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
- (IBAction)didTapDownloadResourceButton:(UIButton *)sender {
    NSString *name = sender.currentTitle ? sender.currentTitle : @"";
    [[DDRUMMonitor shared] addActionWithType:DDRUMActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**참고**: `.startAction(type:name:)` 및 `.stopAction(type:)`를 사용할 때 액션의 `type`은 동일해야 합니다. 이는 RUM iOS SDK가 액션 시작과 완료를 일치시키기 위해 필요합니다.

자세한 내용 및 사용 가능한 옵션은 GitHub의 [`RUMMonitorProtocol`][4]을 참조하세요.

### 커스텀 리소스

[리소스 자동 추적](#automaticallytracknetworkrequests) 외에도, 네트워크 요청이나 서드파티 제공자 API와 같은 특정 커스텀 리소스를 추적할 수 있습니다. RUM 리소스를 수동으로 수집하려면 `RUMMonitor.shared()`에서 다음 메서드를 사용하세요.

 `.startResource(resourceKey:request:)`
 `.stopResource(resourceKey:response:)`
 `.stopResourceWithError(resourceKey:error:)`
 `.stopResourceWithError(resourceKey:message:)`

예:

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogRUM

// in your network client:

let rum = RUMMonitor.shared()

rum.startResource(
    resourceKey: "resource-key",
    request: request
)

rum.stopResource(
    resourceKey: "resource-key",
    response: response
)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
// in your network client:

[[DDRUMMonitor shared] startResourceWithResourceKey:@"resource-key"
                                            request:request
                                         attributes:@{}];

[[DDRUMMonitor shared] stopResourceWithResourceKey:@"resource-key"
                                          response:response
                                        attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

**참고**: 두 호출에서 `resourceKey`에 사용되는 `String`은 호출하는 리소스마다 고유해야 합니다. 이는 RUM iOS SDK가 리소스의 시작과 완료를 일치시키기 위해 필요합니다.

자세한 내용 및 사용 가능한 옵션은 GitHub의 [`RUMMonitorProtocol`][4]을 참조하세요.

### 커스텀 오류

특정 오류를 추적하려면 오류가 발생했을 때 `RUMMonitor.shared()`에 다음 메서드 중 하나를 사용하여 알리세요.

 `.addError(message:)`
 `.addError(error:)`

{{< tabs >}}
{{% tab "Swift" %}}

```swift
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

자세한 내용과 사용 가능한 옵션은 GitHub의 [`RUMMonitorProtocol`][4] 및 [오류 속성 설명서][5]를 참조하세요.

## 커스텀 전역 속성 추적

RUM iOS SDK가 자동으로 캡처하는 [기본 RUM 속성][6] 외에도, RUM 이벤트에 추가적인 컨텍스트 정보*(커스텀 속성 등)를 추가하여 Datadog 내에서 관찰 가능성을 강화할 수 있습니다.

커스텀 속성을 사용하면 관찰된 사용자 행동(예: 카트 값, 머천트 티어 또는 광고 캠페인)과 코드 수준 정보(예: 백엔드 서비스, 세션 타임라인, 오류 로그, 네트워크 상태)를 함께 필터링하고 그룹화할 수 있습니다.

<div class="alert alert-info">커스텀 속성은 작은 범위의 특정 정보(예: ID, 플래그 또는 짧은 라벨)에 적합합니다. 전체 HTTP 응답 페이로드와 같은 큰 객체를 첨부하지 마세요. 이로 인해 이벤트 크기가 크게 증가하고 성능에 영향을 줄 수 있습니다.</div>

### 커스텀 전역 속성 설정

커스텀 전역 속성을 설정하려면 `RUMMonitor.shared().addAttribute(forKey:value:)`를 사용하세요.

* 속성을 추가하려면 `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`를 사용하세요.
* 값을 업데이트하려면 `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`를 사용하세요.
* 키를 삭제하려면 `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`를 사용하세요.

대량 작업(여러 속성을 한 번에 수정) 시 성능을 높이려면 `.addAttributes(_:)` 및 `.removeAttributes(forKeys:)`을 사용하세요.

**참고**: 키 이름에 공백 또는 특수 문자를 사용하면 커스텀 속성에서 패킷을 생성할 수 없습니다. 예를 들어, `forKey: "store_id"` 대신 `forKey: "Store ID"`를 사용하세요.

### 사용자 세션 추적

RUM 세션에 사용자 정보를 추가하면 다음 작업을 쉽게 수행할 수 있습니다.

* 지정된 사용자의 여정을 따라갑니다.
* 오류의 영향을 가장 많이 받는 사용자를 파악합니다.
* 가장 중요한 사용자의 성능을 모니터링합니다.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI의 사용자 API" >}}

| 속성   | 유형   | 설명                                                                     |
|  |  |  |
| `usr.id`    | 문자열 |(필수) 고유 사용자 식별자입니다.                                              |
| `usr.name`  | 문자열 |(선택 사항) RUM UI에 기본적으로 표시되는 사용자 친화적인 이름입니다.              |
| `usr.email` | 문자열 |(선택 사항) 사용자 이름이 없는 경우 RUM UI에 표시되는 사용자 이메일입니다. |

사용자 세션을 식별하려면 `Datadog.setUserInfo(id:name:email:)` API를 사용하세요.

예:

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

## 백그라운드 이벤트 추적

<div class="alert alert-info"><p>백그라운드 이벤트를 추적하면 추가 세션이 발생할 수 있으며, 이는 청구에 영향을 줄 수 있습니다. 질문이 있는 경우, <a href="https://docs.datadoghq.com/help/">Datadog 지원팀에 문의하세요.</a></p>
</div>

애플리케이션이 백그라운드에서 동작할 때(예: 활성 조회를 사용할 수 없음) 크래시 및 네트워크 요청과 같은 이벤트를 추적할 수 있습니다.

백그라운드 이벤트를 추적하려면 초기화 중에 Datadog 구성에 다음 스니펫을 추가합니다.

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    ...
    trackBackgroundEvents: true
  )
)
```

## 초기화 파라미터

Datadog 구성을 생성할 때 `Datadog.Configuration`에서 다음 속성을 사용하여 라이브러리를 초기화할 수 있습니다:

`backgroundTasksEnabled`
: 이 플래그는 백그라운드 업로드를 수행하기 위해 `UIApplication`의 `beginBackgroundTask(expirationHandler:)` 및 `endBackgroundTask:` 메서드를 사용할지 여부를 결정합니다. 이 플래그를 활성화하면 앱이 백그라운드에서 작동하는 시간이 30초 증가할 수 있습니다. 업로드할 내용이 없거나 인터넷 연결 불가, 배터리 부족 등 업로드를 방해하는 상황이 발생하면 일반적으로 작업이 중단됩니다. 기본적으로 이 플래그는 `false`로 설정됩니다.

`batchProcessingLevel`
: 배치 처리 수준은 하나의 읽기/업로드 주기 내에서 지연 없이 순차적으로 처리되는 최대 배치 수를 정의합니다. 기본값은 `.medium`입니다.

`batchSize`
: Datadog에 업로드되는 배치 데이터의 선호 크기를 설정합니다. 이 값은 RUM iOS SDK가 수행하는 요청 수와 크기에 영향을 줍니다(배치가 작으면 요청 수는 많아지지만 각 요청의 크기는 작아집니다). 사용 가능한 값은 `.small`, `.medium` 및 `.large`입니다.

`bundle`
: 현재 실행 파일이 포함된 번들 객체입니다.

`clientToken`
: RUM, 로깅, APM을 지원하는 RUM 클라이언트 토큰 또는 로깅과 APM만 지원하는 일반 클라이언트 토큰입니다.

`encryption`
: `DataEncryption` 프로토콜을 준수하는 객체를 제공하여 온디스크 데이터 지속성에 사용하는 데이터 암호화입니다.

`env`
: Datadog에 전송되는 환경 이름입니다. 이를 통해 `staging` 또는 `production`과 같은 다양한 환경에 따라 이벤트를 필터링할 수 있습니다.

`proxyConfiguration`
: 추적한 데이터를 Datadog 수집 서버로 업로드할 때 커스텀 프록시를 사용할 수 있는 프록시 구성 속성입니다.

`serverDateProvider`
: 커스텀 NTP 동기화 인터페이스입니다. 기본적으로 Datadog SDK는 [NTP Pool Project][7]에서 제공하는 전용 NTP 풀과 동기화합니다. 다른 풀을 사용하거나 동작 없는 `ServerDateProvider` 구현을 설정하면 SDK 인스턴스와 Datadog 서버 간에 시간 동기화가 깨집니다. 이로 인해 RUM 세션이나 분산 트레이스에서 상당한 시간 차이가 발생할 수 있습니다.

`service`
: Datadog에 전송되는 데이터와 관련된 서비스 이름입니다. 기본값은 애플리케이션 번들 식별자입니다.

`site`
데이터가 전송되는 Datadog 서버 엔드포인트입니다. 기본값은 `.us1`입니다.

`uploadFrequency`
: Datadog에 데이터를 업로드하는 선호 빈도입니다. 사용 가능한 값은 `.frequent`, `.average` 및 `.rare`입니다.

### RUM 구성

RUM을 활성화할 때 `RUM.Configuration`에서 다음 속성을 사용할 수 있습니다:

`actionEventMapper`
: 액션 이벤트의 데이터 스크러빙 콜백을 설정합니다. 이를 사용하여 액션 이벤트가 Datadog으로 전송되기 전에 수정하거나 삭제할 수 있습니다. 자세한 내용은 [RUM 이벤트 수정 또는 삭제](#modifyordroprumevents)를 참조하세요.

`appHangThreshold`
: 앱이 멈춤 상태일 때 보고할 임계값을 설정합니다. 이 옵션의 최소 허용 값은 `0.1`초입니다. 보고를 비활성화하려면 이 값을 `nil`로 설정하세요. 자세한 내용은 [앱 멈춤 보고 추가][8]를 참조하세요.

`applicationID`
: RUM 애플리케이션 식별자입니다.

`customEndpoint`
: RUM 데이터를 전송할 커스텀 서버 URL입니다.

`errorEventMapper`
: 오류 이벤트의 데이터 스크러빙 콜백입니다. 이를 사용하여 오류 이벤트가 Datadog으로 전송되기 전에 수정하거나 삭제할 수 있습니다. 자세한 내용은 [RUM 이벤트 수정 또는 삭제](#modifyordroprumevents)를 참조하세요.

`longTaskEventMapper`
: 긴 작업 이벤트의 데이터 스크러빙 콜백입니다. 이를 사용하여 긴 작업 이벤트가 Datadog으로 전송되기 전에 수정하거나 삭제할 수 있습니다. 자세한 내용은 [RUM 이벤트 수정 또는 삭제](#modifyordroprumevents)를 참조하세요.

`longTaskThreshold`
: RUM 긴 작업 추적의 임계값(초 단위)입니다. 기본값은 `0.1`초입니다.

`networkSettledResourcePredicate`
: TimetoNetworkSettled(TNS) 조회 타이밍 계산에서 "초기" 리소스를 분류하는 데 사용되는 조건자입니다.

`nextViewActionPredicate`
: InteractiontoNextView(INV) 타이밍 계산에서 "마지막" 액션을 분류하는 데 사용되는 조건자입니다.

`onSessionStart`
: (선택 사항) RUM 세션이 시작될 때 호출되는 메서드입니다.

`resourceEventMapper`
: 리소스 이벤트의 데이터 스크러빙 콜백입니다. 이를 사용하여 리소스 이벤트가 Datadog으로 전송되기 전에 수정하거나 삭제할 수 있습니다. 자세한 내용은 [RUM 이벤트 수정 또는 삭제](#modifyordroprumevents)를 참조하세요.

`sessionSampleRate`
: RUM 세션의 샘플링 비율입니다. `sessionSampleRate` 값은 `0.0`에서 `100.0` 사이여야 합니다. `0.0`은 세션이 전송되지 않음을 의미하며, `100.0`은 모든 세션이 Datadog으로 전송됨을 의미합니다. 기본값은 `100.0`입니다.

`telemetrySampleRate`
: Datadog에서 사용하는 SDK 내부 텔레메트리의 샘플링 비율입니다. 이 비율은 추적 시스템에 보고되는 요청 수를 제어합니다. 값은 `0`에서 `100` 사이여야 합니다. 기본값은 `20`입니다.

`trackAnonymousUser`
: 활성화하면 SDK는 앱 실행 간에 유지되는 고유하고 비개인적인 익명 사용자 ID를 생성합니다. 이 ID는 각 RUM 세션에 첨부되어, 개인 데이터를 수집하지 않고 동일 사용자/장치에서 발생한 세션을 연결할 수 있습니다. 기본값은 `true`입니다.

`trackBackgroundEvents`
: 활성 조회가 없을 때 RUM 이벤트를 추적할지 여부를 결정합니다. 기본값은 `false`입니다.

`trackFrustrations`
: 사용자 불만의 자동 추적을 활성화할지 여부를 결정합니다. 기본값은 `true`입니다.

`trackMemoryWarnings`
: 메모리 경고 자동 추적을 활성화할지 여부를 결정합니다. 기본값은 `true`입니다.

`trackWatchdogTerminations`
: Watchdog이 실행한 애플리케이션 종료를 SDK가 추적할지 여부를 결정합니다. 기본값은 `false`입니다.

`uiKitActionsPredicate`
: 사용자 상호작용(탭)을 RUM 액션으로 추적하도록 활성화합니다. 기본 `predicate` 구현을 사용하려면 `DefaultUIKitRUMActionsPredicate`를 설정하거나 앱에 맞게 [커스텀한 `UIKitRUMActionsPredicate`](#automaticallytrackuseractions)를 구현할 수 있습니다.

`uiKitViewsPredicate`
: `UIViewControllers`를 RUM 조회로 추적하도록 활성화합니다. 기본 `predicate` 구현을 사용하려면 `DefaultUIKitRUMViewsPredicate`를 설정하거나 앱에 맞게 [커스텀한 `UIKitRUMViewsPredicate`](#automaticallytrackviews)를 구현할 수 있습니다.

`urlSessionTracking`
: `URLSession` 작업(네트워크 요청)을 RUM 리소스로 추적하도록 활성화합니다. `firstPartyHostsTracing` 파라미터는 호스트를 `firstparty` 리소스로 분류하고(만약 RUM이 활성화된 경우) 추적 정보를 주입(추적 기능이 활성화된 경우)하는 데 사용됩니다. `resourceAttributesProvider` 파라미터는 RUM iOS SDK가 수집하는 각 리소스에 대해 호출되는 인터셉트된 리소스에 대한 커스텀 속성을 제공하는 클로저를 정의합니다. 이 클로저는 작업 정보와 함께 호출되며, 첨부할 속성이 없으면 커스텀 리소스 속성 또는 `nil`을 반환할 수 있습니다.

`viewEventMapper`
: 조회 이벤트의 데이터 스크러빙 콜백입니다. 이를 사용하여 조회 이벤트가 Datadog으로 전송되기 전에 조회 이벤트를 수정할 수 있습니다. 자세한 내용은 [RUM 이벤트 수정 또는 삭제](#modifyordroprumevents)를 참조하세요.

`vitalsUpdateFrequency`
: 모바일 바이탈 데이터를 수집하는 선호 빈도입니다. 사용 가능한 값은 `.frequent`(100ms마다), `.average`(500ms마다), `.rare`(1초마다), `.never`(바이탈 모니터링을 비활성화)입니다.

### 조회 자동 추적

UIKit 및 SwiftUI로 조회를 자동으로 추적할 수 있습니다.

{{% collapse-content title="UIKit" level="h4" expanded=true id="auto-track-views-uikit" %}}

조회(`UIViewControllers`)를 자동 추적하려면 RUM 활성화 시 `uiKitViewsPredicate` 옵션을 사용하세요. 기본적으로 조회 이름은 조회 컨트롤러의 클래스 이름으로 지정됩니다. 이를 사용자 지정하려면 `predicate`를 구현하고 `UIKitRUMViewsPredicate` 프로토콜을 준수하도록 제공하세요.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```swift
@objc
public protocol DDUIKitRUMViewsPredicate: AnyObject {
    func rumView(for viewController: UIViewController) -> DDRUMView?
}
```
{{% /tab %}}
{{< /tabs >}}

`rumView(for:)` 구현 내에서 앱은 지정된 `UIViewController` 인스턴스가 RUM 조회를 시작해야 하는지(값 반환) 또는 시작하지 않아야 하는지(`nil` 반환) 결정해야 합니다. 반환되는 `RUMView` 값은 `name`을 지정해야 하며, 생성된 RUM 조회에 추가 `attributes`를 제공할 수 있습니다.

예를 들어, 앱의 각 조회 컨트롤러에 대해 명시적인 형식 검사를 사용하도록 조건자를 구성할 수 있습니다.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
class YourCustomPredicate: UIKitRUMViewsPredicate {

    func rumView(for viewController: UIViewController) -> RUMView? {
        switch viewController {
        case is HomeViewController:     return .init(name: "Home")
        case is DetailsViewController:  return .init(name: "Details")
        default:                        return nil
        }
    }
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
@interface YourCustomPredicate : NSObject<DDUIKitRUMViewsPredicate>

@end

@implementation YourCustomPredicate

- (DDRUMView * _Nullable)rumViewFor:(UIViewController * _Nonnull)viewController {
    if ([viewController isKindOfClass:[HomeViewController class]]) {
        return [[DDRUMView alloc] initWithName:@"Home" attributes:@{}];
    }

    if ([viewController isKindOfClass:[DetailsViewController class]]) {
        return [[DDRUMView alloc] initWithName:@"Details" attributes:@{}];
    }

    return nil;
}

@end
```
{{% /tab %}}
{{< /tabs >}}

앱의 아키텍처에 따라 보다 동적인 솔루션을 고안할 수도 있습니다.

예를 들어 조회 컨트롤러가 `accessibilityLabel`을 일관되게 사용하면 접근성 레이블 값을 사용하여 조회 이름을 지정할 수 있습니다.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
class YourCustomPredicate: UIKitRUMViewsPredicate {

    func rumView(for viewController: UIViewController) -> RUMView? {
        guard let accessibilityLabel = viewController.accessibilityLabel else {
            return nil
        }

        return RUMView(name: accessibilityLabel)
    }
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
@interface YourCustomPredicate : NSObject<DDUIKitRUMViewsPredicate>

@end

@implementation YourCustomPredicate

- (DDRUMView * _Nullable)rumViewFor:(UIViewController * _Nonnull)viewController {
    if (viewController.accessibilityLabel) {
        return [[DDRUMView alloc] initWithName:viewController.accessibilityLabel attributes:@{}];
    }

    return nil;
}

@end
```
{{% /tab %}}
{{< /tabs >}}

**참고**: RUM iOS SDK는 앱 실행 중 `rumView(for:)`를 여러 번 호출합니다. Datadog은 구현을 빠르고 단일 스레드로 유지할 것을 권장합니다.
{{% /collapse-content %}}

{{% collapse-content title="SwiftUI" level="h4" expanded=true id="auto-track-views-swiftui" %}}

SwiftUI로 조회를 자동 추적하려면 RUM 활성화 시 `swiftUIViewsPredicate` 옵션을 사용하세요.

SwiftUI 조회 이름 추출 메커니즘은 리플렉션을 사용합니다. 따라서 조회 이름이 항상 의미 있는 것은 아닙니다. 의미 있는 이름을 추출할 수 없는 경우, `AutoTracked_HostingController_Fallback` 또는 `AutoTracked_NavigationStackController_Fallback`과 같은 일반 이름이 사용됩니다.

기본 조건자(`DefaultSwiftUIRUMViewsPredicate`)를 사용하거나 `SwiftUIRUMViewsPredicate` 프로토콜을 구현하여 조회 이름을 사용자 지정하거나 필터링할 수 있습니다.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
public protocol SwiftUIRUMViewsPredicate {
    func rumView(for extractedViewName: String) -> RUMView?
}

// Example: Custom predicate to ignore fallback names and rename views
class CustomSwiftUIPredicate: SwiftUIRUMViewsPredicate {
    func rumView(for extractedViewName: String) -> RUMView? {
        if extractedViewName == "AutoTracked_HostingController_Fallback" ||
           extractedViewName == "AutoTracked_NavigationStackController_Fallback" {
            return nil // Ignore fallback names
        }
        if extractedViewName == "MySpecialView" {
            return RUMView(name: "Special")
        }
        return RUMView(name: extractedViewName)
    }
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
@protocol DDSwiftUIRUMViewsPredicate <NSObject>
- (DDRUMView * _Nullable)rumViewFor:(NSString * _Nonnull)extractedViewName;
@end

@interface CustomSwiftUIPredicate : NSObject <DDSwiftUIRUMViewsPredicate>
@end

@implementation CustomSwiftUIPredicate
- (DDRUMView * _Nullable)rumViewFor:(NSString * _Nonnull)extractedViewName {
    if ([extractedViewName isEqualToString:@"AutoTracked_HostingController_Fallback"] ||
        [extractedViewName isEqualToString:@"AutoTracked_NavigationStackController_Fallback"]) {
        return nil; // Ignore fallback names
    }
    if ([extractedViewName isEqualToString:@"MySpecialView"]) {
        return [[DDRUMView alloc] initWithName:@"Special" attributes:@{}];
    }
    return [[DDRUMView alloc] initWithName:extractedViewName attributes:@{}];
}
@end
```
{{% /tab %}}
{{< /tabs >}}

**참고:**
 앱이 완전히 SwiftUI로 빌드된 경우에도 Datadog은 UIKit 조회 추적 활성화를 권장합니다.
 탭 바는 자동으로 추적되지 않습니다. 각 탭 조회를 추적하려면 [수동 추적](#customviews)을 사용하세요.
 자동 추적 및 수동 추적을 모두 사용하는 경우 중복 이벤트가 발생할 수 있습니다. 이를 방지하려면 단일 계측 방식만 사용하거나 중복을 필터링하는 사용자 지정 조건자를 사용하세요.
{{% /collapse-content %}}

### 사용자 액션 자동 추적

#### UIKit

UIKit에서 사용자 탭 동작을 자동으로 추적하려면 RUM 활성화 시 `uiKitActionsPredicate` 옵션을 설정하세요.

#### SwiftUI

SwiftUI에서 사용자 탭 동작을 자동으로 추적하려면 RUM 활성화 시 `swiftUIActionsPredicate` 옵션을 활성화하세요.

**참고:**
 Datadog은 순수 SwiftUI 앱의 경우에도 UIKit 액션 추적을 활성화할 것을 권장합니다. 많은 인터랙티브 구성 요소가 내부적으로 UIKit으로 구현되어 있기 때문입니다.
 tvOS에서는 리모컨의 버튼 누름 상호작용만 추적됩니다. 이를 위해서는 UIKit 조건자만 필요합니다. 순수 SwiftUI 앱이지만 tvOS에서 리모컨 버튼 누름을 추적하려면 UIKit 계측도 활성화해야 합니다.
 iOS 18 이상과 iOS 17 이하에서 구현 방식이 다릅니다.
   **iOS 18 이상:** 대부분의 상호작용은 구성 요소 이름과 함께 안정적으로 추적됩니다(예: `SwiftUI_Button`, `SwiftUI_NavigationLink`).
   **iOS 17 이하:** SDK는 상호작용 가능한 구성 요소와 비상호작용 구성 요소를 구분할 수 없습니다(예: Button vs. Label). 이로 인해 액션은 `SwiftUI_Unidentified_Element`로 보고됩니다.
 자동 추적 및 수동 추적을 모두 사용하는 경우 중복 이벤트가 발생할 수 있습니다. 이는 알려진 제한 사항입니다. 이를 방지하려면 자동 또는 수동 중 한 가지 계측 방법만 사용하세요.
 기본 조건자인 `DefaultSwiftUIRUMActionsPredicate`를 사용하거나 커스텀 조건자를 제공하여 액션을 필터링하거나 이름을 변경할 수 있습니다. 신뢰할 수 있는 iOS 18+ 추적만 원하면 iOS 17 이하의 레거시 감지를 비활성화할 수도 있습니다.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
// Use the default predicate by disabling iOS 17 and below detection
let predicate = DefaultSwiftUIRUMActionsPredicate(isLegacyDetectionEnabled: false)

// Use your own predicate
class CustomSwiftUIActionsPredicate: SwiftUIRUMActionsPredicate {
    func rumAction(for componentName: String) -> RUMAction? {
        // Custom logic to filter or rename actions
        return RUMAction(name: componentName)
    }
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
// Use the default predicate by disabling iOS 17 and below detection
DDDefaultSwiftUIRUMActionsPredicate *swiftUIActionsPredicate = [[DDDefaultSwiftUIRUMActionsPredicate alloc] initWithIsLegacyDetectionEnabled:NO];

// Use your own predicate
@protocol DDSwiftUIRUMActionsPredicate <NSObject>
- (DDRUMAction * _Nullable)rumActionFor:(NSString * _Nonnull)componentName;
@end

@interface CustomSwiftUIActionsPredicate : NSObject <DDSwiftUIRUMActionsPredicate>
@end

@implementation CustomSwiftUIActionsPredicate
- (DDRUMAction * _Nullable)rumActionFor:(NSString * _Nonnull)componentName {
    // Custom logic to filter or rename actions
    return [[DDRUMAction alloc] initWithName:componentName attributes:@{}];
}
@end
```
{{% /tab %}}
{{< /tabs >}}

#### iOS 버전별 액션 보고

아래 표는 iOS 17과 iOS 18에서 사용자 상호작용이 어떻게 보고되는지 보여줍니다.

| **구성 요소**    | **iOS 18 보고 이름**                          | **iOS 17 보고 이름**             |
||||
| Button           | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |
| NavigationLink   | NavigationLink                                    | SwiftUI_Unidentified_Element         |
| Menu             | SwiftUI_Menu(및 항목은 _UIContextMenuCell로)| SwiftUI_Menu(및 항목은 _UIContextMenuCell로) |
| Link             | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |

### 네트워크 요청 자동 추적

RUM 활성화 시 `urlSessionTracking` 구성을 통해 네트워크 요청이 자동으로 추적됩니다. 

#### (선택 사항) 상세 타이밍 분석 활성화

DNS 해석, SSL 핸드셰이크, 첫 바이트 시간, 연결 시간, 다운로드 기간 등의 상세 타이밍 분석을 위해 delegate 유형에 대해 `URLSessionInstrumentation`을 활성화하세요.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
URLSessionInstrumentation.enableDurationBreakdown(
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
{{% tab "ObjectiveC" %}}

```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[<YourSessionDelegate> class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[<YourSessionDelegate> alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

**참고**:
`URLSessionInstrumentation`을 사용하지 않아도 네트워크 요청은 추적됩니다. 활성화하면 성능 분석을 위한 상세 타이밍 분석이 제공됩니다.
 응답 데이터는 `resourceAttributesProvider` 콜백(`RUM.Configuration.URLSessionTracking`에서 설정)에서 확인할 수 있으며, 자동 모드에서 완료 핸들러가 있는 작업 및 `URLSessionInstrumentation` 활성화 후 모든 작업에 대해 호출됩니다.
 특정 요청을 추적에서 제외하려면 `resourceEventMapper`를 `RUM.Configuration`에서 사용하세요(자세한 내용은 [RUM 이벤트 수정 또는 제거](#modifyordroprumevents) 참조).

<div class="alert alert-info">메모리 누수에 주의하세요.
Datadog 계측은 직접적으로 메모리 누수를 일으키지 않지만, <code>URLSession</code> delegate에 의존합니다. <a href="https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters">Apple 문서</a>에 따르면,
"세션 객체는 앱이 종료되거나 명시적으로 세션을 무효화할 때까지 delegate에 대한 강한 참조를 유지합니다. <code>invalidateAndCancel()</code> 또는 <code>finishTasksAndInvalidate()</code> 메서드를 호출하여 세션을 무효화하지 않으면, 앱 종료 전까지 메모리가 누수됩니다."
메모리 누수를 방지하려면 더 이상 필요하지 않은 <code>URLSession</code> 인스턴스를 반드시 무효화하세요.
</div>


앱에서 계측하려는 delegate 유형이 여러 개 있는 경우, 각 delegate 유형마다 `URLSessionInstrumentation.enable(with:)`를 호출할 수 있습니다.

또한 `urlSessionTracking`을 사용하여 퍼스트파티 호스트를 구성할 수 있습니다. 이렇게 하면 지정된 도메인과 일치하는 리소스를 RUM에서 "퍼스트파티"로 분류하고, Tracing 기능이 활성화된 경우 백엔드로 추적 정보를 전파합니다. 네트워크 트레이스는 조정 가능한 샘플링 비율로 수집됩니다. 기본적으로 20% 샘플링이 적용됩니다.

예를 들어, `example.com`을 퍼스트파티 호스트로 구성하고 RUM과 Tracing 기능을 모두 활성화할 수 있습니다:

[10]: https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters
{{< tabs >}}
{{% tab "Swift" %}}

```swift

import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        firstPartyHostsTracing: .trace(hosts: ["example.com"], sampleRate: 20)
    )
  )
)

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

이렇게 하면 계측된 `session`을 통해 전송되는 모든 요청이 추적됩니다. `example.com` 도메인과 일치하는 요청은 "퍼스트파티"로 표시되며, 추적 정보가 백엔드로 전송되어 [RUM 리소스와 트레이스를 연결][1]합니다.


[1]: https://docs.datadoghq.com/ko/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
@import DatadogRUM;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
DDRUMURLSessionTracking *urlSessionTracking = [DDRUMURLSessionTracking new];
[urlSessionTracking setFirstPartyHostsTracing:[DDRUMFirstPartyHostsTracing alloc] initWithHosts:@[@"example.com"] sampleRate:20];
[configuration setURLSessionTracking:urlSessionTracking];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{< /tabs >}}

리소스에 커스텀 속성을 추가하려면 RUM 활성화 시 `URLSessionTracking.resourceAttributesProvider` 옵션을 사용하세요. 속성 제공 클로저를 설정하면 추적된 리소스에 추가 속성을 반환할 수 있습니다.

예를 들어, RUM 리소스에 HTTP 요청 및 응답 헤더를 추가할 수 있습니다.

```swift
RUM.enable(
  with: RUM.Configuration(
    ...
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        resourceAttributesProvider: { request, response, data, error in
            return [
                "request.headers" : redactedHeaders(from: request),
                "response.headers" : redactedHeaders(from: response)
            ]
        }
    )
  )
)
```

요청을 추적하지 않으려면 위임 유형에 대해 URLSessionInstrumentation을 비활성화합니다.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
URLSessionInstrumentation.disable(delegateClass: <YourSessionDelegate>.self)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
[DDURLSessionInstrumentation disableWithDelegateClass:[<YourSessionDelegate> class]];
```
{{% /tab %}}
{{< /tabs >}}

#### Apollo 계측
iOS 앱에서 Apollo를 계측하면 GraphQL 오류와 성능에 대한 RUM 가시성을 확보할 수 있습니다. GraphQL 요청은 모두 단일 엔드포인트로 전송되며, 오류가 발생해도 200 OK를 반환하는 경우가 많아 기본 HTTP 계측만으로는 컨텍스트가 부족합니다. 이 계측을 통해 RUM이 Operation 이름, Operation 유형, 변수(및 선택적으로 페이로드)를 캡처할 수 있습니다. 이를 통해 각 네트워크 요청에 대한 보다 상세한 컨텍스트를 제공합니다.

이 통합은 Apollo iOS 1.0+와 Apollo iOS 2.0+를 모두 지원합니다. 사용 중인 Apollo iOS 버전에 맞춰 아래 지침을 따르세요.

1. [Datadog iOS RUM로 RUM 모니터링 설정][2]

2. 애플리케이션의 `Package.swift` 파일에 다음을 추가합니다.

   ```swift
   dependencies: [
       // For Apollo iOS 1.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "1.0.0"))
    
       // For Apollo iOS 2.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "2.0.0"))
   ]
   ```

   또는 Xcode를 사용하여 추가할 수도 있습니다.
   1. **File** → **Add Package Dependencies**로 이동합니다.
   2. 리포지터리 URL(`https://github.com/DataDog/ddsdkiosapollointerceptor`)을 입력합니다.
   3. Apollo 주 버전에 맞는 패키지 버전을 선택합니다(`1.x.x`는 Apollo iOS 1.0+, `2.x.x`는 Apollo iOS 2.0+).

3. Apollo iOS 버전에 따라 네트워크 계측을 설정합니다.

   {{< tabs >}}
   {{% tab "Apollo iOS 1.0+" %}}

   Apollo의 내장 URLSessionClient를 위한 네트워크 계측을 설정합니다.

   ```swift
   import Apollo

   URLSessionInstrumentation.enable(with: .init(delegateClass: URLSessionClient.self))
   ```

   Datadog 인터셉터를 Apollo Client 설정에 추가합니다.

   ```swift
   import Apollo
   import DatadogApollo

   class CustomInterceptorProvider: DefaultInterceptorProvider {
       override func interceptors<Operation: GraphQLOperation>(for operation: Operation) -> [ApolloInterceptor] {
           var interceptors = super.interceptors(for: operation)
           interceptors.insert(DatadogApolloInterceptor(), at: 0)
           return interceptors
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Apollo iOS 2.0+" %}}

   제공된 `DatadogApolloDelegate`와 `DatadogApolloURLSession`을 사용하여 네트워크 계측을 구성합니다.

   ```swift
   import Apollo
   import DatadogApollo
   import DatadogCore

   // Create the Datadog delegate
   let delegate = DatadogApolloDelegate()

   // Create the custom URLSession wrapper
   let customSession = DatadogApolloURLSession(
       configuration: .default,
       delegate: delegate
   )

   // Enable Datadog instrumentation for the delegate
   URLSessionInstrumentation.enable(
       with: .init(delegateClass: DatadogApolloDelegate.self)
   )

   // Configure Apollo Client with the custom session
   let networkTransport = RequestChainNetworkTransport(
       urlSession: customSession,
       interceptorProvider: NetworkInterceptorProvider(),
       store: store,
       endpointURL: url
   )
   ```

   Datadog 인터셉터로 인터셉터 제공자를 생성합니다.

   ```swift
   import Apollo
   import DatadogApollo

   struct NetworkInterceptorProvider: InterceptorProvider {
       func graphQLInterceptors<Operation>(for operation: Operation) -> [any GraphQLInterceptor] where Operation : GraphQLOperation {
           return [DatadogApolloInterceptor()] + DefaultInterceptorProvider.shared.graphQLInterceptors(for: operation)
       }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}

   이렇게 하면 Datadog RUM이 요청에서 Operation 유형, 이름, 변수, 페이로드(선택 사항)를 자동으로 추출하여 GraphQL 요청 RUM 리소스를 강화할 수 있습니다.

   <div class="alert alert-info">
     <ul>
       <li>이 통합은 Apollo iOS 버전 <code>1.0+</code> 및 <code>2.0+</code>를 지원합니다.</li>
       <li><code>query</code> 및 <code>mutation</code> 유형의 Operation은 추적되며, <code>subscription</code> Operation은 추적되지 않습니다.</li>
       <li>GraphQL 페이로드 전송은 기본적으로 비활성화되어 있습니다. 활성화하려면 <code>DatadogApolloInterceptor</code> 생성자의 <code>sendGraphQLPayloads</code> 플래그를 다음과 같이 설정하세요.</li>
     </ul>

     <pre><code class="language-swift">
   let datadogInterceptor = DatadogApolloInterceptor(sendGraphQLPayloads: true)
     </code></pre>
   </div>

### 오류 자동 추적

`Logger`로 전송된 모든 "error" 및 "critical" 로그는 자동으로 RUM 오류로 보고되며 현재 RUM 조회와 연결됩니다.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogLogs

let logger = Logger.create()

logger.error("message")
logger.critical("message")
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
@import DatadogLogs;

DDLogger *logger = [DDLogger create];
[logger error:@"message"];
[logger critical:@"message"];
```
{{% /tab %}}
{{< /tabs >}}

이와 유사하게, 오류로 표시된 모든 완료된 스팬은 RUM 오류로 보고됩니다.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogTrace

let span = Tracer.shared().startSpan(operationName: "operation")
// ... capture the `error`
span.setError(error)
span.finish()
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
// ... capture the `error`
id<OTSpan> span = [[DDTracer shared] startSpan:@"operation"];
[span setError:error];
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

## RUM 이벤트 수정 또는 삭제

RUM 이벤트가 Datadog으로 전송되기 전에 해당 속성을 수정하거나 이벤트를 완전히 삭제하려면 iOS RUM SDK를 설정할 때 Event Mappers API를 사용하세요.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    viewEventMapper: { RUMViewEvent in
        return RUMViewEvent
    }
    resourceEventMapper: { RUMResourceEvent in
        return RUMResourceEvent
    }
    actionEventMapper: { RUMActionEvent in
        return RUMActionEvent
    }
    errorEventMapper: { RUMErrorEvent in
        return RUMErrorEvent
    }
    longTaskEventMapper: { RUMLongTaskEvent in
        return RUMLongTaskEvent
    }
)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setViewEventMapper:^DDRUMViewEvent * _Nonnull(DDRUMViewEvent * _Nonnull RUMViewEvent) {
    return RUMViewEvent;
}];

[configuration setErrorEventMapper:^DDRUMErrorEvent * _Nullable(DDRUMErrorEvent * _Nonnull RUMErrorEvent) {
    return RUMErrorEvent;
}];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];

[configuration setActionEventMapper:^DDRUMActionEvent * _Nullable(DDRUMActionEvent * _Nonnull RUMActionEvent) {
    return RUMActionEvent;
}];

[configuration setLongTaskEventMapper:^DDRUMLongTaskEvent * _Nullable(DDRUMLongTaskEvent * _Nonnull RUMLongTaskEvent) {
    return RUMLongTaskEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

각 맵퍼는 `(T) -> T?` 서명을 가진 Swift 클로저이며, 여기서 `T`는 구체적인 RUM 이벤트 유형입니다. 이를 통해 이벤트가 전송되기 전에 일부 내용을 변경할 수 있습니다.

예를 들어, RUM 리소스의 `url`에서 민감한 정보를 가리려면, 커스텀 `redacted(_:) -> String` 함수를 구현하고 `resourceEventMapper`에서 사용하면 됩니다.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    resourceEventMapper: { RUMResourceEvent in
        var RUMResourceEvent = RUMResourceEvent
        RUMResourceEvent.resource.url = redacted(RUMResourceEvent.resource.url)
        return RUMResourceEvent
    }
)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

오류, 리소스 또는 액션 맵퍼에서 `nil`을 반환하면 이벤트가 완전히 삭제됩니다; 이벤트는 Datadog으로 전송되지 않습니다. 조회 이벤트 맵퍼에서 반환하는 값은 `nil`이 될 수 없습니다(조회를 삭제하려면 `UIKitRUMViewsPredicate` 구현을 사용자 지정해야 합니다. 자세한 내용은 [자동으로 조회 추적하기](#automaticallytrackviews) 참조).

이벤트 유형에 따라 일부 특정 속성만 수정할 수 있습니다:

| 이벤트 유형       | 속성 키                        | 설명                                      |
|  |  |  |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | 액션의 이름입니다.                              |
|                  | `RUMActionEvent.view.url`            | 이 액션과 연결된 조회의 URL입니다.           |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | 오류 메시지입니다.                                   |
|                  | `RUMErrorEvent.error.stack`          | 오류의 스택 트레이스입니다.                         |
|                  | `RUMErrorEvent.error.resource?.url`  | 오류가 참조하는 리소스의 URL입니다.         |
|                  | `RUMErrorEvent.view.url`             | 이 오류와 연결된 조회의 URL입니다.            |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | 리소스의 URL입니다.                             |
|                  | `RUMResourceEvent.view.url`          | 이 리소스와 연결된 조회의 URL입니다.         |
| RUMViewEvent     | `RUMViewEvent.view.name`             | 조회의 이름입니다.                                |
|                  | `RUMViewEvent.view.url`              | 조회의 URL입니다.                                 |
|                  | `RUMViewEvent.view.referrer`         | 페이지의 초기 조회에 연결된 URL입니다. |

## RUM 세션 ID 검색

RUM 세션 ID를 검색하면 문제 해결에 도움이 될 수 있습니다. 예를 들어, 지원 요청, 이메일 또는 버그 보고서에 세션 ID를 첨부하면, 지원팀이 나중에 Datadog에서 사용자 세션을 찾을 수 있습니다.

`sessionStarted` 이벤트를 기다리지 않고 런타임 중에 RUM 세션 ID에 액세스할 수 있습니다.

```swift
RumMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

## 추적 동의 설정(GDPR 준수)

GDPR 규정을 준수하려면, RUM iOS 소프트웨어 개발 키트(SDK)는 초기화 시 추적 동의 값이 필요합니다.

`trackingConsent` 설정은 다음 값 중 하나가 될 수 있습니다.

1. `.pending`: RUM iOS SDK에서 데이터를 수집 및 일괄 처리하나 Datadog으로 전송하지는 않습니다. RUM iOS SDK는 새로운 추적 동의 값을 기다렸다가 일괄 처리된 데이터를 어떻게 처리할지 결정합니다.
2. `.granted`: RUM iOS SDK가 데이터 수집을 시작하고 Datadog으로 해당 데이터를 전송합니다.
3. `.notGranted`: RUM iOS SDK는 데이터를 수집하지 않습니다. 로그, 트레이스 또는 RUM 이벤트가 Datadog으로 전송되지 않습니다.

RUM iOS SDK 초기화후 추적 동의 값을 변경하려면 `Datadog.set(trackingConsent:)` API 호출을 사용합니다. RUM iOS SDK는 새 값에 따라 동작을 변경합니다.

예를 들어 현재 추적 동의가 `.pending`인 경우는 다음과 같습니다.

 값을 `.granted`로 변경하면 RUM iOS SDK는 현재 및 향후 모든 데이터를 Datadog으로 전송합니다.
 값을 `.notGranted`로 변경하면 RUM iOS SDK는 현재 데이터를 모두 삭제하고 향후 데이터를 수집하지 않습니다.

##사용자 속성 추가

`Datadog.addUserExtraInfo(_:)` API로 이전에 설정한 속성에 추가 사용자 속성을 추가할 수 있습니다.

```swift
import DatadogCore

Datadog.addUserExtraInfo(["company": "Foo"])
```

## 데이터 관리

iOS SDK는 먼저 이벤트를 로컬에 저장하고 [인테이크 사양][9]이 충족될 때만 이벤트를 업로드합니다.

### 모든 데이터 삭제

`Datadog.clearAllData()` API로 SDK에 저장된 모든 미전송 데이터를 삭제할 수 있습니다.

```swift
import DatadogCore

Datadog.clearAllData()
```

### 데이터 수집 중지

`Datadog.stopInstance()` API로 SDK 인스턴스(또는 이름이 `nil`인 경우 기본 인스턴스)가 더 이상 데이터를 수집하고 업로드하지 않도록 중지할 수 있습니다.

```swift
import DatadogCore

Datadog.stopInstance()
```

이 메서드를 호출하면 SDK와 모든 활성 기능(예: RUM)이 비활성화됩니다. 데이터 수집을 재개하려면 SDK를 다시 초기화해야 합니다. 이 API는 구성 변경을 동적으로 적용하고자 할 때 사용할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/real_user_monitoring/application_monitoring/ios
[3]: /ko/real_user_monitoring/application_monitoring/ios/data_collected/
[4]: https://github.com/DataDog/ddsdkios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
[5]: /ko/real_user_monitoring/application_monitoring/ios/data_collected/?tab=error#errorattributes
[6]: /ko/real_user_monitoring/application_monitoring/ios/data_collected/?tab=session#defaultattributes
[7]: https://www.ntppool.org/en/
[8]: /ko/real_user_monitoring/error_tracking/mobile/ios/#addapphangreporting
[9]: /ko/real_user_monitoring/application_monitoring/ios/setup