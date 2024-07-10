---
aliases:
- /ko/real_user_monitoring/ios/advanced_configuration
code_lang: ios
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Github
  text: dd-sdk-ios 소스 코드
- link: /real_user_monitoring
  tag: 설명서
  text: RUM & 세션 재생
title: RUM iOS 고급 구성
type: multi-code-lang
---

아직 RUM iOS SDK를 설정하지 않은 경우, [인앱 설정 지침][1]을 따르거나 [RUM iOS 설정 설명서][2]를 참고하세요.

## 사용자 세션 보강

iOS RUM은 사용자 활동, 화면, 오류, 네트워크 요청과 같은 속성을 자동으로 추적합니다. RUM 이벤트 및 기본 속성에 대한 자세한 내용은 [RUM 데이터 수집 설명서][3]를 참고하세요. 커스텀 이벤트를 추적하여 사용자 세션 정보를 보강하고 수집된 속성을 보다 세밀하게 제어할 수 있습니다.

### 커스텀 보기

[자동으로 보기 추적](#automatically-track-views)에 더해, `viewControllers`와 같은 특정 보기가 확인 가능하고 상호작용 가능해졌을 때 이를 추적할 수 있습니다. 보기를 더 이상 확인할 수 없을 경우에는 `RUMMonitor.shared()`에서 다음 방법을 사용해 추적을 중단하세요.

- `.startView(viewController:)`
- `.stopView(viewController:)`

예시:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// 내 `UIViewController`에서:
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
// 내 `UIViewController`에서:

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

사용 가능한 옵션에 대한 자세한 내용은 [GitHub 관련 파일]에서 `DDRUMMonitor` 클래스로 필터링하세요.

### 자체 성능 타이밍 추가

RUM의 기본 속성 외에도 `addTiming(name:)`API를 사용해 애플리케이션이 시간을 소비하는 위치를 측정할 수 있습니다. 이 타이밍 측정값은 현재 RUM 보기의 시작을 기준으로 합니다.

예를 들어 히어로 이미지가 나타나는 데 걸리는 시간을 지정할 수 있습니다.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
func onHeroImageLoaded() {
    let rum = RUMMonitor.shared()
    rum.addTiming(name: "hero_image")
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (void)onHeroImageLoad {
    [[DDRUMMonitor shared] addTimingWithName:@"hero_image"];
}
```
{{% /tab %}}
{{< /tabs >}}

타이밍을 설정하면 `@view.custom_timings.<timing_name>`로 액세스할 수 있습니다. 예를 들어 `@view.custom_timings.hero_image`입니다.

대시보드에서 시각화를 만들려면 먼저 [측정값을 생성]합니다[4].

### 커스텀 작업

[자동으로 작업을 추적](#automatically-track-user-actions)하는 것에 더해, `addAction(type:name:)` API를 사용해 특정 커스텀 사용자 작업(탭, 클릭, 스크롤)을 추적할 수 있습니다.

`RUMMonitor.shared()`에서 `.tap`과 같이 즉각적인 RUM 작업을 수동으로 등록하려면 `.addAction(type:name:)`을 사용하세요. `.scroll`과 같이 지속적인 RUM 작업의 경우에는 `.startAction(type:name:)`나 `.stopAction(type:name:)`을 사용하세요.

예시:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// 내 `UIViewController`에서:

let rum = RUMMonitor.shared()

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    rum.addAction(
        type: .tap,
        name: sender.currentTitle ?? "",
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

**참고**: `.startAction(type:name:)`과  `.stopAction(type:name:)`을 사용할 때, `type` 작업이 같아야 합니다. 이는 RUM iOS SDK에서 작업 시작과 완료를 매칭할 때 필요합니다.

[`DDRUMMonitor` 클래스][9]에서 자세한 내용과 사용할 수 있는 옵션을 알아보세요.

### 커스텀 리소스

[리소스를 자동으로 추적](#automatically-track-network-requests)하는 것 외에도 네트워크 요청이나 타사 제공자 API와 같은 특정 커스텀 리소스를 추적할 수 있습니다. `RUMMonitor.shared()`에서 다음 방법을 사용해 수동으로 RUM 리소스를 수집할 수 있습니다.

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

**참고**: RUM iOS SDK가 리소스의 시작과 완료를 일치시키려면 호출하는 리소스의 두 호출에서 `resourceKey`로 사용되는 `String`이 고유해야 합니다.

[`DDRUMMonitor` 클래스][9]에서 자세한 내용과 사용할 수 있는 옵션을 알아보세요.

### 커스텀 오류

특정 오류를 추적하려면 메시지, 소스, 예외, 추가 속성에 함께 `RUMMonitor`에 알립니다. [오류 속성 설명서][5]를 참고하세요.

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

자세한 내용과 사용할 수 있는 옵션을 보려면 [`DDRUMMonitor` 클래스][9]에서 코드 설명서 코멘트를 참고하세요.

## 커스텀 전역 속성 추적

RUM iOS SDK에서 자동으로 캡처하는 [기본 RUM 속성][7] 외에도 추가 컨텍스트 정보(커스텀 속성 등)를 RUM 이벤트에 추가하여 Datadog 내에서의 가시성을 보강할 수 있습니다.

커스텀 속성을 사용하면 관찰된 사용자 행동에 대한 정보(예: 카트 값, 판매자 계층, 또는 광고 캠페인)를 코드 수준 정보(예: 백엔드 서비스, 세션 타임라인, 오류 로그 및 네트워크 상태)로 필터링하고 그룹화할 수 있습니다.

### 커스텀 전역 속성 설정

커스텀 전역 속성을 설정하려면 `RUMMonitor.shared().addAttribute(forKey:value:)`를 사용합니다.

* 속성을 추가하려면 `RUMMonitor.shared().addAttribute(forKey: "some key", value: "some value")`를 사용합니다.
* 값을 업데이트하려면 `RUMMonitor.shared().addAttribute(forKey: "some key", value: "some other value")`를 사용합니다.
* 키를 제거하려면 `RUMMonitor.shared().removeAttribute(forKey: "some key")`를 사용합니다.

### 사용자 세션 추적

RUM 세션에 사용자 정보를 추가하면 다음 작업이 용이해집니다.

* 특정 사용자의 활동 경로를 추적합니다.
* 오류의 영향을 가장 많이 받는 사용자를 파악합니다.
* 가장 중요한 사용자를 위해 성능을 모니터링합니다.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI의 사용자 API" >}}

다음 속성은 **선택 사항**이며, 이 정보 중에서 **최소 하나**를 제공해야 합니다.

| 속성   | 유형   | 설명                                                                                              |
|-------------|--------|----------------------------------------------------------------------------------------------------------|
| `usr.id`    | 문자열 | 고유한 사용자 식별자.                                                                                  |
| `usr.name`  | 문자열 | RUM UI에 기본적으로 표시되는 사용자 친화적인 이름.                                                  |
| `usr.email` | 문자열 | 사용자 이메일. 사용자 이름이 없는 경우 RUM UI에 표시됨. Gravatars를 가져오는 데 사용되기도 함.  |

사용자 세션을 확인하려면 `setUserInfo(id:name:email:)` API를 사용합니다.

예시:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

## 초기화 파라미터

Datadog 구성을 생성할 때 `Datadog.Configuration`에서 다음 속성을 사용해 라이브러리를 초기화할 수 있습니다.

`site`
: 데이터를 받을 Datadog 서버 엔드포인트 설정.

`batchSize`
: Datadog에 업로드되는 배치 데이터의 선호하는 크기를 설정합니다. 이 값은 RUM iOS SDK가 처리하는 요청 수와 크기에 영향을 줍니다(배치가 적으면 각 요청의 크기가 적어지나 요청 수가 많아짐). `.small`, `.medium`, `.large` 값을 사용할 수 있습니다. 

`uploadFrequency`
: Datadog에 데이터를 업로드하는 선호 주기를 설정합니다. 값은 `.frequent`, `.average`, `.rare`를 포함해 선택할 수 있습니다.

### RUM 구성

RUM을 활성화할 때 `RUM.Configuration`에서 다음 속성을 사용할 수 있습니다.

`sessionSampleRate`
: RUM 세션의 샘플링 속도를 설정합니다. `sessionSampleRate` 값은 `0.0`와 `100.0` 사이여야 합니다. `0.0` 값은 전송 세션이 없다는 뜻이고, `100.0`은 모든 세션이 Datadog에 전송된다는 뜻입니다. 이 설정이 구성되지 않으면 기본값 `100.0`이 사용됩니다.

`uiKitViewsPredicate`
: `UIViewControllers`을 RUM 보기로 추적 활성화합니다. `DefaultUIKitRUMViewsPredicate`로 설정해 기본값 `predicate`을 사용하거나 내 앱에 맞게 사용자 지정된 고유 `UIKitRUMViewsPredicate`]((#automatically-track-views)를 구현할 수 있습니다.

`uiKitActionsPredicate`
: 사용자 인터페이스(탭)를 RUM 작업으로 추적 활성화합니다. `DefaultUIKitRUMActionsPredicate`로 설정해 기본값 `predicate`을 사용하거나 내 앱에 맞게 사용자 지정된 고유 `UIKitRUMActionsPredicate`](#automatically-track-user-actions)를 구현할 수 있습니다.

`urlSessionTracking`
: `URLSession` 작업(네트워크 요청)을 RUM 리소스로 추적 활성화합니다. `firstPartyHostsTracing` 파라미터는 `first-party` 리소스로 카테고리화되고(RUM이 활성화된 경우) 추적 정보가 주입된(추적 기능이 활성화된 경우) 호스트를 정의합니다. `resourceAttributesProvider` 파라미터는 클로저를 정의해 RUM iOS SDK에서 수집한 각 리소스에 호출된 추적 대상 리소스의 커스텀 속성을 제공합니다. 이 클로저는 작업 정보와 함께 호출되고 커스텀 리소스 속성을 반환하거나 속성이 연결될 수 없을 경우 `nil`을 반환합니다.

`viewEventMapper`
: 보기를 위한 데이터 스크러빙 콜백을 설정합니다. Datadog에 전송하기 전에 보기 이벤트를 수정할 때 사용할 수 있습니다. 자세한 정보는 [RUM 이벤트 수정 또는 드롭]((#modify-or-drop-rum-events)을 참고하세요.

`resourceEventMapper`
: 리소스를 위한 데이터 스크러빙 콜백을 설정합니다. Datadog에 전송하기 전에 리소스 이벤트를 수정하거나 드롭할 때 사용할 수 있습니다. 자세한 정보는 [RUM 이벤트 수정 또는 드롭]((#modify-or-drop-rum-events)을 참고하세요.

`actionEventMapper`
: 작업을 위한 데이터 스크러빙 콜백을 설정합니다. Datadog에 전송하기 전에 작업 이벤트를 수정하거나 드롭할 때 사용할 수 있습니다. 자세한 정보는 [RUM 이벤트 수정 또는 드롭]((#modify-or-drop-rum-events)을 참고하세요.

`errorEventMapper`
: 오류를 위한 데이터 스크러빙 콜백을 설정합니다. Datadog에 전송하기 전에 오류 이벤트를 수정하거나 드롭할 때 사용할 수 있습니다. 자세한 정보는 [RUM 이벤트 수정 또는 드롭]((#modify-or-drop-rum-events)을 참고하세요.

`longTaskEventMapper`
: 긴 작업을 위한 데이터 스크러빙 콜백을 설정합니다. Datadog에 전송하기 전에 긴 작업 이벤트를 수정하거나 드롭할 때 사용할 수 있습니다. 자세한 정보는 [RUM 이벤트 수정 또는 드롭]((#modify-or-drop-rum-events)을 참고하세요.

`vitalsUpdateFrequency`
: 모바일 활력 징후를 수집하는 선호 주기를 설정합니다. 사용할 수 있는 값에는 `.frequent`(100ms 마다), `.average`(500ms 마다), `.rare`(1s 마다), `.never`(활력 징후 모니터링 비활성화)가 있습니다.

### 보기 자동 추적

자동으로 보기를 추적(`UIViewControllers`)하려면 RUM을 활성화할 때 `uiKitViewsPredicate` 옵션을 사용하세요. 기본값은 보기 컨트롤러의 클래스 이름으로 보기 이름이 지정되어 있습니다. 사용자 지정하려면 `UIKitRUMViewsPredicate` 프로토콜을 준수하는 나만의 `predicate` 구현을 제공하세요.

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

`rumView(for:)` 구현 내에서 사용자 앱이 `UIViewController` 인스턴스가 RUM 보기로 시작할지(반환 값) 아닐 지(`nil` 반환)을 결정합니다. 반환된 `RUMView` 값은 `name`을 지정해야 하고 생성된 RUM 보기를 위해 추가 `attributes`를 제공해야 할 수 있습니다.

예를 들어 앱의 각 보기 컨트롤러에 명시적인 유형의 점검을 사용하도록 조건자를 구성할 수 있습니다.

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

앱의 아키텍처에 따라 더 역동적인 솔루션을 사용할 수도 있습니다.

예를 들어 보기 컨트롤러가 일관되게 `accessibilityLabel`를 사용한다면 접근성 레이블값으로 보기 이름을 지정할 수 있습니다. 

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

**참고**: RUM iOS SDK는 앱이 실행되는 동안 `rumView(for:)`를 많이 호출합니다. 단일 스레드로 속도가 빠르도록 구현하는 것이 좋습니다.

### 자동으로 사용자 작업 추적

자동으로 사용자의 탭 작업을 추적하려면 RUM을 활성화할 때 `uiKitActionsPredicate` 옵션을 설정하세요.

### 네트워크 요청 자동 추적

자동으로 리소스(네트워크 요청)을 추적하고 첫 바이트나 DNS 확인 시간과 같은 시간 정보를 수신하려면 RUM을 활성화할 때 `urlSessionTracking` 옵션을 사용하고 `URLSessionInstrumentation`을 활성화하세요.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: SessionDelegate.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: SessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[SessionDelegate class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[SessionDelegate alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

또한 `urlSessionTracking`을 사용해 퍼스트 파티 호스트를 구성할 수 있습니다. 그러면 RUM에서 "퍼스트 파티"와 일치하는 도메인을 구분하고 추적 정보를 백엔드로 전파합니다(추적을 활성화한 경우). 네트워크 트레이스는 조정 가능한 샘플링 속도로 샘플링 됩니다. 샘플링 기본값은 20%입니다.

예를 들어 퍼스트 파티 호스트를 `example.com`로 구성하고 RUM과 추적 기능을 모두 활성화할 수 있습니다.

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
        delegateClass: SessionDelegate.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: SessionDelegate(),
    delegateQueue: nil
)
```

이는 계측된 `session`과 함께 전송된 모든 요청을 추적합니다. `example.com` 도메인과 일치하는 요청은 "퍼스트 파티"로 표시되고 추적 정보는 백엔드로 전송되어 [RUM 리소스를 트레이스와 연결][1]합니다.

[1]: https://docs.datadoghq.com/ko/real_user_monitoring/connect_rum_and_traces?tab=browserrum

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

커스텀 속성을 리소스에 추가하려면 RUM을 활성화할 때 `URLSessionTracking.resourceAttributesProvider` 옵션을 사용하세요. 속성 제공자 클로저를 설정하면 추가 속성을 반환해 추적된 리소스에 연결할 수 있습니다. 

예를 들어 HTTP 요청과 응답 헤더를 RUM 리소스에 추가할 수 있습니다.

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

요청을 추적하고 싶지 않으면 대리인 유형의 URLSessionInstrumentation을 비활성화할 수 있습니다.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
```swift
URLSessionInstrumentation.disable(delegateClass: SessionDelegate.self)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDURLSessionInstrumentation disableWithDelegateClass:[SessionDelegate class]];
```
{{% /tab %}}
{{< /tabs >}}

### 오류 자동으로 추적

`Logger`와 함께 전송되는 "오류"와 "크리티컬" 로그 모두는 자동으로 RUM 오류로 보고되고 현재 RUM 보기에 연결됩니다.

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

마찬가지로 완료된 스팬 모두는 오류로 표시되고 RUM 오류로 보고됩니다.

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

RUM 이벤트가 Datadog으로 전송되기 전에 해당 속성을 수정하거나 이벤트를 완전히 삭제하려면 RUM iOS SDK를 설정할 때 Event Mappers API를 사용하세요.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    viewEventMapper: { viewEvent in
        return viewEvent
    }
    resourceEventMapper: { resourceEvent in
        return resourceEvent
    }
    actionEventMapper: { actionEvent in
        return actionEvent
    }
    errorEventMapper: { errorEvent in
        return errorEvent
    }
    longTaskEventMapper: { longTaskEvent in
        return longTaskEvent
    }
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setViewEventMapper:^DDRUMViewEvent * _Nonnull(DDRUMViewEvent * _Nonnull viewEvent) {
    return viewEvent;
}];

[configuration setErrorEventMapper:^DDRUMErrorEvent * _Nullable(DDRUMErrorEvent * _Nonnull errorEvent) {
    return errorEvent;
}];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull resourceEvent) {
    return resourceEvent;
}];

[configuration setActionEventMapper:^DDRUMActionEvent * _Nullable(DDRUMActionEvent * _Nonnull actionEvent) {
    return actionEvent;
}];

[configuration setLongTaskEventMapper:^DDRUMLongTaskEvent * _Nullable(DDRUMLongTaskEvent * _Nonnull longTaskEvent) {
    return longTaskEvent;
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
    resourceEventMapper: { resourceEvent in
        var resourceEvent = resourceEvent
        resourceEvent.resource.url = redacted(resourceEvent.resource.url)
        return resourceEvent
    }
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull resourceEvent) {
    return resourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

오류, 리소스, 또는 작업 맵퍼에서 `nil`이 반환되면 이벤트 전체가 드롭되고 해당 이벤트가 Datadog로 전송되지 않습니다. 보기 이벤트 맵퍼에서 반환된 값이 `nil`여서는 안됩니다(보기를 드롭하고, `UIKitRUMViewsPredicate`의 구현을 사용자 지정하는 방법에 관한 자세한 정보는 [자동으로 보기 추적](#automatically-track-views)을 참고).

이벤트 유형에 따라 일부 특정 속성만 수정할 수 있습니다:

| 이벤트 유형       | 속성 키                     | 설명                             |
|------------------|-----------------------------------|-----------------------------------------|
| RUMViewEvent     | `viewEvent.view.name`             | 보기의 이름.                        |
|                  | `viewEvent.view.url`              | 보기 URL.                         |
| RUMActionEvent   | `actionEvent.action.target?.name` | 작업 이름.                      |
|                  | `actionEvent.view.url`            | 이 작업에 연결된 보기의 URL.   |
| RUMErrorEvent    | `errorEvent.error.message`        | 오류 메시지.                           |
|                  | `errorEvent.error.stack`          | 오류의 스택 트레이스.                 |
|                  | `errorEvent.error.resource?.url`  | 오류가 참조하는 리소스의 URL. |
|                  | `errorEvent.view.url`             | 이 오류에 연결된 보기의 URL.    |
| RUMResourceEvent | `resourceEvent.resource.url`      | 리소스의 URL.                     |
|                  | `resourceEvent.view.url`          | 이 리소스에 연결된 보기의 URL. |

## 추적 동의 설정(GDPR 준수)

GDPR 규정을 준수하려면 RUM iOS SDK 초기화 시 추적 동의 값이 필요합니다.

`trackingConsent` 설정은 다음 값 중 하나가 될 수 있습니다.

1. `.pending`: RUM iOS SDK는 데이터 수집 및 일괄 처리를 시작하지만 데이터를 Datadog으로 전송하지는 않습니다. RUM iOS SDK는 새로운 추적 동의 값을 기다렸다가 일괄 처리된 데이터로 실행할 작업을 결정합니다.
2. `.granted`: RUM iOS SDK가 데이터 수집을 시작하여 Datadog으로 전송합니다.
3. `.notGranted`: RUM iOS SDK에서는 어떠한 데이터도 수집하지 않습니다. 로그, 추적 또는 RUM 이벤트가 Datadog으로 전송되지 않습니다.

 RUM iOS SDK 초기화 후 추적 동의 값을 변경하려면 `Datadog.set(trackingConsent:)` API 호출을 사용합니다. RUM iOS SDK에서 새로운 값에 따라 동작을 변경합니다.

예를 들어, 현재 추적 동의가 `.pending`로 되어 있을 경우:

- 값을 `.granted`로 변경하면 RUM iOS SDK에서 현재부터 이후 모든 데이터를 Datadog로 전송합니다.
- 값을 `.notGranted`로 변경하면 RUM iOS SDK에서는 현재 데이터를 모두 삭제하고 이후 데이터를 수집하지 않습니다.

## RUM 세션 예시

애플리케이션이 Datadog RUM으로 전송하는 데이터를 제어하려면 [RUM iOS SDK를 초기화할 때][1] 0과 100 사이의 백분율을 지정해 RUM 세션의 샘플링 속도를 정할 수 있습니다.

예를 들어 세션의 50%만 유지하려면 다음을 사용합니다.

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

## 디바이스가 오프라인일 때 데이터 전송

RUM은 사용자 디바이스가 오프라인 상태일 때 데이터의 가용성을 보장합니다. 네트워크 연결이 원활하지 않은 지역이 디바이스 배터리가 너무 부족한 경우 모든 RUM 이벤트는 먼저 로컬 디바이스에 일괄적으로 저장됩니다. 네트워크를 사용할 수 있고 배터리가 충분히 충전되어 RUM iOS SDK가 최종 사용자 경험에 영향을 미치지 않는 환경이 되면 즉시 전송됩니다. 애플리케이션이 포그라운드에서 실행 중인 상태에서 네트워크를 사용할 수 없거나 데이터 업로드에 실패하면 배치가 성공적으로 전송될 때까지 보관됩니다.

즉, 사용자가 오프라인 상태에서 애플리케이션을 열어도 데이터가 손실되지 않습니다.

**참고**: RUM iOS SDK가 디스크 공간을 너무 많이 사용하지 않도록 하기 위해 너무 오래된 디스크 데이터는 자동으로 삭제됩니다.

## Datadog 데이터 업로드를 위한 커스텀 프록시 구성

커스텀 프록시를 사용해 디바이스에서 앱을 실행 중인 경우, RUM iOS SDK의 데이터 업로더에 이 정보를 제공해 추적 중인 모든 데이터가 관련 구성과 함께 업로드되도록 합니다.

iOS SDK를 초기화할 때 프록시 구성에서 이를 지정하세요.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    proxyConfiguration: [
        kCFNetworkProxiesHTTPEnable: true,
        kCFNetworkProxiesHTTPPort: 123,
        kCFNetworkProxiesHTTPProxy: "www.example.com",
        kCFProxyUsernameKey: "proxyuser",
        kCFProxyPasswordKey: "proxypass"
    ]
  ),
  trackingConsent: trackingConsent
)
```

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.proxyConfiguration = @{
    (NSString *)kCFNetworkProxiesHTTPEnable: @YES,
    (NSString *)kCFNetworkProxiesHTTPPort: @123,
    (NSString *)kCFNetworkProxiesHTTPProxy: @"www.example.com",
    (NSString *)kCFProxyUsernameKey: @"proxyuser",
    (NSString *)kCFProxyPasswordKey: @"proxypass"
}];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}

자세한 정보는 [URLSessionConfiguration.connectionProxyDictionary][8] 설명서를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/real_user_monitoring/ios
[3]: /ko/real_user_monitoring/ios/data_collected
[4]: /ko/real_user_monitoring/explorer/search/#setup-facets-and-measures
[5]: /ko/real_user_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: /ko/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[7]: /ko/real_user_monitoring/ios/data_collected?tab=session#default-attributes
[8]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary
[9]: https://github.com/DataDog/dd-sdk-ios/blob/56e972a6d3070279adbe01850f51cb8c0c929c52/DatadogObjc/Sources/RUM/RUM%2Bobjc.swift