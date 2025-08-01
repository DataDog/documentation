---
aliases:
- /ko/real_user_monitoring/ios/advanced_configuration
- /ko/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: 소스 코드
  text: dd-sdk-ios 소스 코드
- link: /real_user_monitoring
  tag: 설명서
  text: RUM & 세션 재생
- link: /real_user_monitoring/mobile_and_tv_monitoring/ios/supported_versions/
  tag: 설명서
  text: RUM iOS 및 tvOS 모니터링 지원 버전
title: iOS 고급 설정
---

RUM iOS SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][1]을 따르거나 [RUM iOS 설정 설명서][2]를 참조하세요.

## 사용자 세션 강화

iOS RUM은 사용자 활동, 화면, 오류 및 네트워크 요청과 같은 속성을 자동으로 추적합니다. RUM 이벤트 및 기본 속성에 대한 자세한 내용은 [RUM 데이터 수집 설명서][3]를 참조하세요. 커스텀 이벤트를 추적하여 사용자 세션 정보를 보강하고 수집된 속성을 보다 세밀하게 제어할 수 있습니다.

### Custom views

[뷰 자동 추적](#automatically-track-views) 외에도, `viewControllers` 같은 특정 개별 뷰가 표시되고 상호작용할 때 추적할 수 있습니다. `RUMMonitor.shared()`에서 다음 방법을 사용하여 뷰가 더 이상 표시되지 않을 때 추적을 중지합니다.

- `.startView(viewController:)`
- `.stopView(viewController:)`

예시:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// `UIViewController` 내에서:
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
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;
// `UIViewController` 내에서:

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

자세한 내용 및 사용 가능한 선택 사항은 [GitHub의`RUMMonitorProtocol`][4]를 참조하세요.

### Custom actions

[동작 자동 추적](#automatically-track-user-actions) 외에도, `addAction(type:name:)` API를 사용하여 특정 사용자 지정 동작(탭, 클릭, 스크롤)을 추적할 수 있습니다.

`.tap`과 같은 즉각적인 RUM 동작을 `RUMMonitor.shared()`에 수동 등록하려면 `.addAction(type:name:)`을 사용합니다. `.scroll`와 같은 연속적인 RUM 동작의 경우 `.startAction(type:name:)` 또는 `.stopAction(type:)`를 사용합니다.

예시:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// `UIViewController`내에서:

let rum = RUMMonitor.shared()

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    rum.addAction(
        type: .tap,
        name: sender.currentTitle ?? ""
    )
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (IBAction)didTapDownloadResourceButton:(UIButton *)sender {
    NSString *name = sender.currentTitle ? sender.currentTitle : @"";
    [[DDRUMMonitor shared] addActionWithType:DDRUMActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**참고**: `.startAction(type:name:)`와 `.stopAction(type:)`을 사용할 때 `type` 작업은 반드시 동일해야 합니다. 이는 RUM iOS SDK가 작업 시작과 완료를 일치시키기 위해 필요합니다.

자세한 내용 및 사용 가능한 옵션은 [GitHub의`RUMMonitorProtocol`][4]를 참조하세요.

### Custom resources

[리소스 자동 추적](#automatically-track-network-requests)외에도 네트워크 요청 또는 타사 공급자 API와 같은 특정 커스텀 리소스를 추적할 수 있습니다. `RUMMonitor.shared()`에서 다음 메서드를 사용하여 RUM 리소스를 수동으로 수집합니다.

- `.startResource(resourceKey:request:)`
- `.stopResource(resourceKey:response:)`
- `.stopResourceWithError(resourceKey:error:)`
- `.stopResourceWithError(resourceKey:message:)`

예시:

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
{{% tab "Objective-C" %}}
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

**참고**: 호출하는 리소스의 두 호출에서 `resourceKey`로 사용되는 `String`이 고유해야 합니다. RUM iOS SDK가 리소스의 시작과 완료를 일치시키는데 필요합니다.

자세한 내용 및 사용 가능한 옵션은 [GitHub의`RUMMonitorProtocol`][4]를 참조하세요.

### Custom errors

특정 오류를 추적하려면, 다음 메서드 중 하나를 사용하여 오류 발생 시 `RUMMonitor.shared()`에게 알립니다.

- `.addError(message:)`
- `.addError(error:)`

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

자세한 내용 및 사용 가능한 선택 사항은 [GitHub의`RUMMonitorProtocol`][4] 및 [오류 특성 문서][5]를 참조하세요.

## 커스텀 글로벌 속성 추적

RUM iOS SDK에서 자동으로 캡처하는 [기본 RUM 속성][6] 외에도 추가 컨텍스트 정보(커스텀 속성 등)를 RUM 이벤트에 추가하여 Datadog 내에서의 가시성을 강화할 수 있습니다.

커스텀 속성을 사용하면 관찰된 사용자 행동에 대한 정보(예: 카트 값, 판매자 계층 또는 광고 캠페인)를 코드 수준 정보(예: 백엔드 서비스, 세션 타임라인, 오류 로그 및 네트워크 상태)로 필터링하고 그룹화할 수 있습니다.

<div class="alert alert-info">사용자 정의 속성은 특정 소용량 정보(예: ID, 플래그 또는 짧은 레이블) 용도입니다. 전체 HTTP 응답 페이로드와 같은 대용량 오브젝트는 첨부하지 마세요. 이벤트 사이즈가 크게 증가하여 성능에 영향을 미칠 수 있습니다.</div>

### 커스텀 전역 속성 설정

커스텀 전역 속성을 설정하려면 `RUMMonitor.shared().addAttribute(forKey:value:)`을 사용합니다.

* 속성을 추가하려면 `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`을 사용합니다.
* 값을 업데이트하려면 `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`을 사용합니다.
* 키를 삭제하려면 `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`을 사용합니다.

대량 작업(여러 속성을 한 번에 수정)의 성능을 높이려면 `.addAttributes(_:)` 및 `.removeAttributes(forKeys:)`을 사용합니다.

**참고**: 키 이름에 공백이나 특수 문자를 사용하는 경우 커스텀 속성에 패싯을 생성할 수 없습니다. 예를 들어, `forKey: "Store ID"` 대신 `forKey: "store_id"`을 사용합니다.

### 사용자 세션 추적

RUM 세션에 사용자 정보를 추가하면 다음 작업을 쉽게 수행할 수 있습니다:

* 특정 사용자의 활동 경로를 추적합니다.
* 오류의 영향을 가장 많이 받는 사용자를 파악합니다.
* 가장 중요한 사용자를 위해 성능을 모니터링합니다.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI의 사용자 API" >}}

| 속성   | 유형   | 설명                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | 문자열 | (필수) 고유 사용자 식별자입니다.                                              |
| `usr.name`  | 문자열 | (선택 사항) RUM UI에 기본적으로 표시되는 사용자 친화적인 이름입니다.              |
| `usr.email` | 문자열 | (선택 사항) 사용자 이메일로, 사용자 이름이 없는 경우 RUM UI에 표시됩니다. |

사용자 세션을 식별하려면 `Datadog.setUserInfo(id:name:email:)` API를 사용합니다.

예시:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

## 백그라운드 이벤트 추적

<div class="alert alert-info"><p>백그라운드 이벤트 추적으로 추가 세션이 발생하여 청구 금액에 영향을 미칠 수 있습니다. 자세한 내용은 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀에 문의하세요.</a></p>
</div>

애플리케이션이 백그라운드에서 동작할 때(예: 활성 뷰를 사용할 수 없음) 크래시 및 네트워크 요청과 같은 이벤트를 추적할 수 있습니다.

백그라운드 이벤트를 추적하려면 초기화 중에 Datadog 설정에 다음 스니펫을 추가합니다.

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

Datadog 설정을 생성할 때 `Datadog.Configuration`에서 다음 속성을 사용하여 라이브러리를 초기화할 수 있습니다.

`backgroundTasksEnabled`
: 본 플래그는 `UIApplication` 메서드 `beginBackgroundTask(expirationHandler:)` 및 `endBackgroundTask:`를 사용하여 백그라운드 업로드를 수행할지 결정합니다. 해당 플래그를 활성화하면 앱이 백그라운드에서 작동하는 시간이 30초 증가할 수 있습니다. 업로드할 항목이 없거나, 인터넷이 연결이 없는 경우 또는 배터리가 부족한 경우와 같이 업로드에 방해가 되는 상황에서는 일반적으로 작업이 중지됩니다. 기본적으로 해당 플래그는 `false`로 설정되어 있습니다.

`batchSize`
: Datadog에 업로드되는 일괄 데이터의 기본 크기를 설정합니다. 이 값은 RUM iOS SDK가 수행하는 요청의 크기와 횟수에 영향을 미칩니다(배치가 적을수록 요청이 많아지지만 각 요청의 크기는 작아집니다). 사용 가능한 값은 `.small`, `.medium`, 및 `.large`입니다.

`bundle`
: 현재 실행 파일이 포함된 번들 오브젝트입니다.

`clientToken`
: RUM 클라이언트 토큰(RUM, 로깅 및 APM 지원)이나 일반 클라이언트 토큰(로깅 및 APM 지원).

`encryption`
: `DataEncryption` 프로토콜을 준수하는 오브젝트를 제공하여 온디스크 데이터 지속성에 사용하는 데이터 암호화입니다.

`env`
: Datadog으로 전송되는 환경 이름입니다. 다른 환경(예: `staging` 또는 `production`)을 기준으로 이벤트를 필터링하는 데 사용할 수 있습니다.

`proxyConfiguration`
: 추적한 데이터를 Datadog 인테이크에 업로드하기 위해 커스텀 프록시를 활성화하는 데 사용할 수 있는 프록시 설정 속성입니다.

`serverDateProvider`
: 커스텀 NTP 동기화 인터페이스입니다. 기본적으로 Datadog SDK는 [NTP Pool 프로젝트][7]에서 제공하는 전용 NTP Pool과 동기화됩니다. 다른 풀을 사용하거나 작업 없음 `ServerDateProvider` 구현을 설정하면 SDK 인스턴스와 Datadog 서버의 동기화가 해제됩니다. 이로 인해 RUM 세션 또는 분산 추적에서 상당한 시간 차이가 발생할 수 있습니다.

`service`
: Datadog으로 전송된 데이터와 관련된 서비스 이름입니다. 기본값은 애플리케이션 번들 식별자입니다.

`site`
: 데이터가 전송되는 Datadog 서버 엔드포인트입니다. 기본값은 `.us1`입니다.

`uploadFrequency`
: Datadog에 데이터를 업로드하는 기본 빈도입니다. 사용 가능한 값에는 `.frequent`, `.average`, 및 `.rare`가 포함됩니다.

### RUM 설정

RUM을 활성화할 때 `RUM.Configuration`에서 다음 속성을 사용할 수 있습니다.

`actionEventMapper`
: 작업에 대한 데이터 스크러빙 콜백을 설정합니다. 작업 이벤트를 Datadog으로 전송하기 전에 수정하거나 삭제하는 데 사용할 수 있습니다. 자세한 내용은 [RUM 이벤트 수정 또는 삭제하기](#modify-or-drop-rum-events)를 참조하세요.

`appHangThreshold`
: 앱이 중단될 때 보고할 임계값을 설정합니다. 이 선택 사항의 최소 허용 값은 `0.1`초입니다. 보고를 비활성화하려면 이 값을 `nil`로 설정합니다. 자세한 내용은 [앱 중단 보고 추가하기][8]를 참조하세요.

`applicationID`
: RUM 애플리케이션 식별자입니다.

`customEndpoint`
: RUM 데이터를 전송하기 위한 커스텀 서버 URL입니다.

`errorEventMapper`
: 오류에 대한 데이터 스크러빙 콜백입니다. 오류 이벤트를 Datadog으로 전송하기 전에 수정하거나 삭제하는 데 사용할 수 있습니다. 자세한 내용은 [RUM 이벤트 수정 또는 삭제하기](#modify-or-drop-rum-events)를 참조하세요.

`longTaskEventMapper`
: 긴 작업에 대한 데이터 스크러빙 콜백입니다. 긴 작업 이벤트를 Datadog으로 전송하기 전에 수정하거나 삭제하는 데 사용할 수 있습니다. 자세한 내용은 [RUM 이벤트 수정 또는 삭제하기](#modify-or-drop-rum-events)를 참조하세요.

`longTaskThreshold`
: RUM 긴 작업 추적에 대한 임계값(초 단위)입니다. 기본적으로 `0.1`초로 전송됩니다.

`networkSettledResourcePredicate`
: Time-to-Network-Settled (TNS) 뷰 타이밍을 계산할 때 "초기" 리소스를 분류하는 데 사용되는 조건자입니다.

`nextViewActionPredicate`
: Interaction-to-Next-View (INV) 타이밍을 계산할 때 "마지막" 작업을 분류하는 데 사용되는 조건자입니다.

`onSessionStart`
: (선택 사항) RUM이 세션을 시작할 때 호출되는 메서드입니다.

`resourceEventMapper`
: 리소스에 대한 데이터 스크러빙 콜백입니다. 리소스 이벤트를 Datadog으로 전송하기 전에 수정하거나 삭제하는 데 사용할 수 있습니다. 자세한 내용은 [RUM 이벤트 수정 또는 삭제하기](#modify-or-drop-rum-events)를 참조하세요.

`sessionSampleRate`
: RUM 세션의 샘플링 속도입니다. `sessionSampleRate` 값은 `0.0`과 `100.0` 사이여야 합니다. `0.0` 값은 세션이 전송되지 않음을 뜻하고, `100.0`은 모든 세션이 Datadog으로 전송됨을 뜻합니다. 기본값은 `100.0`입니다.

`telemetrySampleRate`
: Datadog이 사용하는 SDK 내부 텔레메트리 샘플링 속도입니다. 해당 속도는 추적 시스템에 보고되는 요청 수를 제어합니다. 이는 `0` 과 `100` 사이의 값이어야 합니다. 해당 값은 기본적으로 `20`으로 설정되어 있습니다.

`trackAnonymousUser`
: 활성화하면 SDK가 앱을 실행해도 유지되는 익명 사용자 ID를 생성합니다. 이 ID는 각 RUM 세션에 첨부되므로 개인 데이터를 수집하지 않고도 동일한 사용자/기기에서 시작된 세션을 연결할 수 있습니다. 기본적으로 `true`로 설정되어 있습니다.

`trackFrustrations`
: 사용자 불만 자동 추적 사용 여부를 결정합니다. 기본적으로 `true`로 설정되어 있습니다.

`trackBackgroundEvents`
: 뷰가 활성화되어 있지 않을 때 RUM 이벤트 추적 여부를 결정합니다. 기본적으로 `false`로 설정되어 있습니다.

`trackWatchdogTerminations`
: Watchdog이 실행한 애플리케이션 종료를 SDK가 추적할지를 결정합니다. 기본 설정은 `false`입니다.

`uiKitActionsPredicate`
: 사용자 상호작용(탭)을 RUM 작업으로 추적하도록 활성화합니다. `DefaultUIKitRUMActionsPredicate`를 설정하여 `predicate` 기본 구현을 사용하거나 앱에 맞게 커스텀한 [자체 `UIKitRUMActionsPredicate`](#automatically-track-user-actions)를 구현할 수 있습니다.

`uiKitViewsPredicate`
: `UIViewControllers`을 RUM 작업으로 추적하도록 활성화합니다. `DefaultUIKitRUMViewsPredicate`를 설정하여 `predicate` 기본 구현을 사용하거나 앱에 맞게 맞춤형으로 [자체 `UIKitRUMViewsPredicate`](#automatically-track-views)를 구현할 수 있습니다.

`urlSessionTracking`
: `URLSession` 작업(네트워크 요청)을 RUM 리소스로 추적할 수 있도록 활성화합니다. `firstPartyHostsTracing` 파라미터는 `first-party` 리소스로 분류되고(RUM이 활성화된 경우) 추적 정보가 삽입된 호스트(추적 기능이 활성화된 경우)를 정의합니다. `resourceAttributesProvider` 파라미터는 RUM iOS SDK가 수집한 각 리소스별로 호출되고 인터셉트된 리소스에 커스텀 속성을 제공하는 클로저를 정의합니다. 해당 클로저는 작업 정보와 함께 호출되며, 커스텀 리소스 속성을 반환하거나 속성을 첨부할 필요가 없는 경우 `nil`을 반환할 수 있습니다.

`viewEventMapper`
: 뷰에 대한 데이터 스크러빙 콜백입니다. 뷰 이벤트를 Datadog으로 전송하기 전에 수정하는 데 사용할 수 있습니다. 자세한 내용은 [RUM 이벤트 수정 또는 삭제하기](#modify-or-drop-rum-events)를 참조하세요.

`vitalsUpdateFrequency`
: 모바일 바이탈을 수집하는 기본 빈도입니다. 사용 가능한 값에는 `.frequent`(100ms마다), `.average`(500ms마다), `.rare`(1초마다), `.never`(바이탈 모니터링 비활성화)가 포함됩니다.

### 보기 자동 추적

UIKit 및 SwiftUI로 뷰를 자동 추적할 수 있습니다.

{{% collapse-content title="UIKit" level="h4" expanded=true id="auto-track-views-uikit" %}}

뷰를 자동 추적하려면(`UIViewControllers`), RUM을 활성화할 때 `uiKitViewsPredicate` 선택 사항을 사용합니다. 기본적으로 뷰의 이름은 뷰 컨트롤러의 클래스 이름으로 지정됩니다. 이를 사용자 지정하려면 `UIKitRUMViewsPredicate` 프로토콜을 따르는 `predicate` 구현을 직접 제공합니다.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```swift
@objc
public protocol DDUIKitRUMViewsPredicate: AnyObject {
    func rumView(for viewController: UIViewController) -> DDRUMView?
}
```
{{% /tab %}}
{{< /tabs >}}

`rumView(for:)` 구현 내에서 앱은 지정된 `UIViewController` 인스턴스가 RUM 뷰를 시작할지(값을 반환할지) 아니면 시작하지 않을지(`nil` 반환)를 결정해야 합니다. 반환된 `RUMView` 값은 `name`을 지정해야 하며, 생성된 RUM 뷰에 대해 추가 `attributes`을 제공할 수 있습니다.

예를 들어, 앱의 각 뷰 컨트롤러에 명시적인 형식 검사를 하도록 조건자를 설정할 수 있습니다.

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
{{% tab "Objective-C" %}}
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

예를 들어, 뷰 컨트롤러가 `accessibilityLabel`을 일관되게 사용하는 경우 접근성 레이블 값으로 뷰의 이름을 지정할 수 있습니다.

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
{{% tab "Objective-C" %}}
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

**참고**: 앱이 실행되는 동안 RUM iOS SDK는 `rumView(for:)`를 여러 번 호출합니다. Datadog은 빠른 단일 스레드로 구성하고 유지할 것을 권장합니다.
{{% /collapse-content %}}

{{% collapse-content title="SwiftUI" level="h4" expanded=true id="auto-track-views-swiftui" %}}

SwiftUI로 뷰를 자동 추적하려면 RUM을 활성화할 때 `swiftUIViewsPredicate` 옵션을 사용하세요.

SwiftUI 뷰 이름을 추출하는 메커니즘은 리플렉션(Reflection)에 의존합니다. 따라서 뷰 이름이 항상 의미가 있는 것은 아닙니다. 의미 있는 이름을 추출할 수 없는 경우 `AutoTracked_HostingController_Fallback` 또는 `AutoTracked_NavigationStackController_Fallback` 같은 일반 이름이 사용됩니다.

기본 조건자(`DefaultSwiftUIRUMViewsPredicate`)를 사용하거나 `SwiftUIRUMViewsPredicate` 프로토콜을 직접 구현하여 뷰 이름을 사용자 지정 또는 필터링할 수 있습니다.

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
{{% tab "Objective-C" %}}
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

**참조**:
- Datadog은 앱이 SwiftUI로만 빌드된 경우에도 UIKit 뷰 추적을 활성화할 것을 권장합니다.
- 탭 바는 자동 추적되지 않습니다. [수동 추적](#custom-views)을 사용하여 각 탭 뷰를 추적합니다.
- 자동 추적과 수동 추적을 모두 사용하는 경우 중복 이벤트가 표시될 수 있습니다. 이를 방지하려면 단일 계측 메서드를 사용하거나 사용자 지정 조건자로 중복을 필터링합니다.
{{% /collapse-content %}}

### 사용자 작업 자동 추적

#### UIKit

UIKit으로 사용자 탭 동작을 자동 추적하려면 RUM을 활성화할 때 `uiKitActionsPredicate` 옵션을 설정합니다.

#### SwiftUI

SwiftUI으로 사용자 탭 동작을 자동 추적하려면 RUM을 활성화할 때 `swiftUIActionsPredicate` 옵션을 활성화합니다.

**참조**:
- Datadog은 많은 인터랙티브 컴포넌트가 내부적으로는 UIKit로 동작하므로 순수 SwiftUI 앱의 경우에도 UIKit 작업 추적을 활성화할 것을 권장합니다.
- tvOS에서는 리모콘 누르기 상호작용만 추적됩니다. 해당 작업에는 UIKit 조건자만 필요합니다. 순수 SwiftUI 앱이지만 tvOS에서 리모트 누르기 동작을 추적하려는 경우 UIKit 계측도 활성화해야 합니다.
- iOS 18 이상과 iOS 17 이하에서는 구현 방식이 다음과 같이 다릅니다.
  - **iOS 18 이상:** 대부분의 상호작용이 올바른 컴포넌트 이름(예: `SwiftUI_Button`, `SwiftUI_NavigationLink`)으로 안정적으로 추적됩니다.
  - **iOS 17 이하:** SDK는 인터렉티브 및 비인터렉티브 컴포넌트(예: 버튼 vs. 레이블)를 구분할 수 없습니다. 따라서 동작은 `SwiftUI_Unidentified_Element`로 보고됩니다.
- If you use both automatic and manual tracking, you may see duplicate events. This is a known limitation. To avoid this, use only one instrumentation type - either automatic or manual.
- 기본 조건자인 `DefaultSwiftUIRUMActionsPredicate`를 사용하거나 직접 입력하여 동작을 필터링하거나 이름을 바꿀 수 있습니다. 안정적인 iOS 18 이상만 추적하려는 경우 다음과 같이 레거시 탐지(iOS 17 이하)를 비활성화할 수도 있습니다.

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
{{% tab "Objective-C" %}}
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

#### iOS 버전별 작업 보고

하단 테이블은 iOS 17과 iOS 18이 서로 다른 사용자 상호작용을 보고하는 방법을 보여줍니다.

| **컴포넌트**    | **iOS 18 보고 이름**                          | **iOS 17 보고 이름**             |
|------------------|---------------------------------------------------|--------------------------------------|
| 버튼           | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |
| NavigationLink   | NavigationLink                                    | SwiftUI_Unidentified_Element         |
| 메뉴             | SwiftUI_Menu(및 해당 항목은 _UIContextMenuCell로 표시)| SwiftUI_Menu(및 해당 항목은 _UIContextMenuCell로 표시) |
| 링크             | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |

### 네트워크 요청 자동 추적

리소스(네트워크 요청)를 자동 추적하고 첫 바이트 수신 시간 또는 DNS 조회와 같은 타이밍 정보를 수집하려면 RUM을 활성화할 때 `urlSessionTracking` 선택 사항을 사용하고 `URLSessionInstrumentation`을 활성화합니다.

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

<div class="alert alert-info">Be mindful of delegate retention. 
While Datadog instrumentation does not create memory leaks directly, it relies on `URLSession` delegates. According to [Apple's documentation][10]:
"The session object keeps a strong reference to the delegate until your app exits or explicitly invalidates the session. If you do not invalidate the session by calling the `invalidateAndCancel()` or `finishTasksAndInvalidate()` method, your app leaks memory until it exits."
To avoid memory leaks, make sure to invalidate any `URLSession` instances you no longer need.</div>


앱에 계측하려는 위임 유형이 두 개 이상 있는 경우 각 위임 유형에 대해 `URLSessionInstrumentation.enable(with:)`를 호출할 수 있습니다.

또한 `urlSessionTracking`으로 자사 호스트를 설정할 수 있습니다. 이렇게 하면 지정된 도메인과 일치하는 리소스를 RUM에서 '자사(퍼스트 파티)'로 분류하고, 추적 정보를 백엔드에 전파합니다(추적을 사용 설정한 경우). 네트워크 트레이스는 조정 가능한 샘플링 비율로 샘플링됩니다. 기본적으로 20%의 샘플링이 적용됩니다.

예를 들어, `example.com`을 자사 호스트로 설정하고 RUM 및 추적 기능을 모두 사용하도록 설정할 수 있습니다.

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

이렇게 하면 계측된 `session`을 통해 전송된 모든 요청을 추적합니다. `example.com` 도메인과 일치하는 요청은 '자사'(퍼스트 파티)로 표시되며 추적 정보가 백엔드로 전송되어 [트레이스와 RUM 리소스를 연결][1]합니다.


[1]: https://docs.datadoghq.com/ko/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
DDRUMURLSessionTracking *urlSessionTracking = [DDRUMURLSessionTracking new];
[urlSessionTracking setFirstPartyHostsTracing:[DDRUMFirstPartyHostsTracing alloc] initWithHosts:@[@"example.com"] sampleRate:20];
[configuration setURLSessionTracking:urlSessionTracking];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{< /tabs >}}

리소스에 커스텀 속성을 추가하려면 RUM을 활성화할 때 `URLSessionTracking.resourceAttributesProvider` 옵션을 사용합니다. 속성 공급자 클로저를 설정하면 추적된 리소스에 첨부할 추가 속성을 반환할 수 있습니다.

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
{{% tab "Objective-C" %}}
```objective-c
[DDURLSessionInstrumentation disableWithDelegateClass:[<YourSessionDelegate> class]];
```
{{% /tab %}}
{{< /tabs >}}

### 오류 자동 추적

`Logger`를 통해 전송된 모든 '오류' 및 '중요' 로그는 자동으로 RUM 오류로 보고되고 현재 RUM 뷰와 연결됩니다.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogLogs

let logger = Logger.create()

logger.error("message")
logger.critical("message")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

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
{{% tab "Objective-C" %}}
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
{{% tab "Objective-C" %}}
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

각 맵퍼는 시그니처가 `(T) -> T?`인 Swift 클로저이며, 여기서 `T`는 구체적인 RUM 이벤트 유형입니다. 이렇게 하면 이벤트가 전송되기 전에 이벤트의 일부를 변경할 수 있습니다.

예를 들어, RUM 리소스의 `url`에서 민감한 정보를 삭제하려면 커스텀 `redacted(_:) -> String` 함수을 구현하고 `resourceEventMapper`에서 사용합니다.

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
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

오류, 리소스 또는 작업 매퍼에서 `nil`을 반환하면 이벤트가 완전히 삭제되고 Datadog으로 전송되지 않습니다. 뷰 이벤트 매퍼에서 반환되는 값은 `nil`이 아니어야 합니다(뷰를 삭제하려면 `UIKitRUMViewsPredicate` 구현을 사용자 정의합니다. 자세한 내용은 [뷰 자동 추적](#automatically-track-views)을 참조하세요).

이벤트 유형에 따라 일부 특정 속성만 수정할 수 있습니다:

| 이벤트 유형       | 속성 키                        | 설명                                      |
| ---------------- | ------------------------------------ | ------------------------------------------------ |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | 액션의 이름.                              |
|                  | `RUMActionEvent.view.url`            | 이 작업에 연결된 보기의 URL.           |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | 오류 메시지.                                   |
|                  | `RUMErrorEvent.error.stack`          | 오류의 스택 트레이스.                         |
|                  | `RUMErrorEvent.error.resource?.url`  | 오류가 참조하는 리소스의 URL.         |
|                  | `RUMErrorEvent.view.url`             | 이 오류에 연결된 보기의 URL.            |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | 리소스의 URL.                             |
|                  | `RUMResourceEvent.view.url`          | 이 리소스에 연결된 보기의 URL.         |
| RUMViewEvent     | `RUMViewEvent.view.name`             | 보기의 이름.                                |
|                  | `RUMViewEvent.view.url`              | 보기 URL.                                 |
|                  | `RUMViewEvent.view.referrer`         | 페이지의 초기 보기에 연결된 URL. |

## RUM 세션 ID 검색

RUM 세션 ID를 검색하면 문제 해결에 도움이 될 수 있습니다. 예를 들어 지원 요청, 이메일 또는 버그 보고서에 세션 ID를 첨부하면 나중에 지원 팀이 Datadog에서 사용자 세션을 찾을 수 있습니다.

`sessionStarted` 이벤트를 기다리지 않고 런타임 중에 RUM 세션 ID에 액세스할 수 있습니다.

```swift
RumMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

## 추적 동의 설정(GDPR 준수)

GDPR 규정을 준수하기 위해 RUM iOS SDK는 초기화 시 추적 동의 값이 필요합니다.

`trackingConsent` 설정은 다음 값 중 하나가 될 수 있습니다:

1. `.pending`: RUM iOS SDK는 데이터 수집 및 일괄 처리 작업을 시작하지만 해당 데이터를 Datadog으로 전송하지는 않습니다. RUM iOSSDK는 새로운 추적 동의 값을 기다렸다가 일괄 처리된 데이터로 실행할 작업을 결정합니다.
2. `.granted`: RUM iOS SDK가 데이터 수집을 시작하고 Datadog으로 해당 데이터를 전송합니다.
3. `.notGranted`: RUM iOS SDK는 어떠한 데이터도 수집하지 않습니다. 로그, 트레이스, 또는 RUM 이벤트가 Datadog으로 전송되지 않습니다.

 RUM iOS SDK 초기화 후 추적 동의 값을 변경하려면 `Datadog.set(trackingConsent:)` API 호출을 사용합니다. RUM iOS SDK에서 새로운 값에 따라 동작을 변경합니다.

예를 들어 현재 추적 동의가 `.pending`인 경우는 다음과 같습니다.

- 값을 `.granted`로 변경하면 RUM iOS SDK는 현재 및 향후 모든 데이터를 Datadog 으로 전송합니다.
- 값을 `.notGranted`로 변경하면 RUM iOS SDK는 현재 데이터를 모두 삭제하고 향후 데이터를 수집하지 않습니다.

## 사용자 속성 추가

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

이 메서드를 호출하면 SDK 및 모든 활성 기능(예: RUM)이 비활성화됩니다. 데이터 수집을 재개하려면 SDK를 다시 초기화해야 합니다. 설정을 동적 변경하려는 경우 이 API를 사용할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/real_user_monitoring/mobile_and_tv_monitoring/ios
[3]: /ko/real_user_monitoring/mobile_and_tv_monitoring/ios/data_collected/
[4]: https://github.com/DataDog/dd-sdk-ios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
[5]: /ko/real_user_monitoring/mobile_and_tv_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: /ko/real_user_monitoring/mobile_and_tv_monitoring/ios/data_collected/?tab=session#default-attributes
[7]: https://www.ntppool.org/en/
[8]: /ko/real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting
[9]: /ko/real_user_monitoring/mobile_and_tv_monitoring/ios/setup
[10]: https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters