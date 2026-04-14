---
description: iOS 애플리케이션에서 로그를 수집합니다.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: 소스 코드
  text: dd-sdk-ios 소스 코드
- link: logs/explorer
  tag: 설명서
  text: 로그 탐색 방법 알아보기
title: iOS 로그 수집
---
## 개요

[Datadog의 `dd-sdk-ios` 클라이언트측 로깅 라이브러리][1]를 사용해 iOS 애플리케이션에서 Datadog으로 로그를 전송하고 다음 기능을 활용해 보세요.

* JSON 네이티브 형식으로 Datadog에 로깅합니다.
* 기본 설정으로 전송한 각 로그에 커스텀 속성을 추가합니다.
* 실제 클라이언트 IP 주소와 User-Agents를 기록합니다.
* 자동 대량 포스트로 네트워크 사용량을 최적화합니다.

`dd-sdk-ios` 라이브러리는 iOS 11 이상의 모든 버전을 지원합니다.

## 설정

1. 패키지 관리자에 따라 라이브러리를 종속성으로 선언합니다. Swift 패키지 관리자 사용을 권장합니다.

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple의 Swift 패키지 관리자를 사용하여 통합하려면 다음을 종속 항목으로 `Package.swift`에 추가합니다.
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

프로젝트에서 다음 라이브러리를 연결합니다.
```
DatadogCore
DatadogLogs
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

[CocoaPods][6]을 사용하여 `dd-sdk-ios`을 설치할 수 있습니다.
```
pod 'DatadogCore'
pod 'DatadogLogs'
```

[6]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Carthage" %}}

[Carthage][7]를 사용해 `dd-sdk-ios`를 설치할 수 있습니다.
```
github "DataDog/dd-sdk-ios"
```

Xcode에서 다음 프레임워크를 연결합니다.
```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogLogs.xcframework
```

[7]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

2. 애플리케이션 컨텍스트 및 [Datadog 클라이언트 토큰][2]으로 라이브러리를 초기화합니다. 보안을 위해서 클라이언트 토큰을 사용해야 합니다. iOS 애플리케이션 IPA 바이트 코드의 클라이언트 측에 노출되므로 [Datadog API 키][3]를 사용해 `dd-sdk-ios` 라이브러리를 설정하지 마세요.

클라이언트 토큰을 설정하는 방법에 관한 자세한 내용을 확인하려면 [클라이언트 토큰 설명서][2]를 참고하세요.

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .eu1,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite eu1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us3,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
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

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us5,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
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

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us1_fed,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
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

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .ap1,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
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

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

GDPR 규정을 준수하려면 SDK는 초기화 시 `trackingConsent` 값이 필요합니다. `trackingConsent`은 다음 값 중 하나일 수 있습니다.

- `.pending`: SDK는 데이터 수집 및 일괄 처리 작업을 시작하지만 해당 데이터를 Datadog으로 전송하지는 않습니다. SDK는 새로운 추적 동의 값을 기다렸다가 일괄 처리된 데이터로 실행할 작업을 결정합니다.
- `.granted`: SDK가 데이터 수집을 시작하고 Datadog으로 해당 데이터를 전송합니다.
- `.notGranted`: SDK는 어떠한 데이터도 수집하지 않습니다. 로그, 트레이스, 또는 RUM 이벤트가 Datadog으로 전송되지 않습니다.

SDK 초기화 후 추적 동의 값을 변경하려면 `Datadog.set(trackingConsent:)` API 호출을 사용합니다.

SDK는 새 값에 따라 동작을 변경합니다. 예를 들어, 현재 추적 동의가 `.pending`인 경우는 다음과 같습니다.

- `.granted`로 변경하면 SDK는 현재와 이후의 모든 데이터를 Datadog로 전송합니다.
- `.notGranted`로 변경하면 SDK는 현재 데이터를 모두 삭제하고 이후 데이터는 수집하지 않습니다.

데이터는 Datadog에 업로드되기 전 [애플리케이션 샌드박스][6]의 캐시 디렉터리(`Library/Caches`)에 일반 텍스트로 저장됩니다. 기기에 설치된 다른 앱으로 캐시 디렉터리를 읽을 수 없습니다.

애플리케이션을 작성할 때 개발 로그를 활성화하여 우선 순위가 특정 레벨과 동일하거나 더 높은 SDK의 모든 내부 메시지를 콘솔에 로깅합니다.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.verbosityLevel = .debug
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDDatadog.verbosityLevel = DDSDKVerbosityLevelDebug;
```
{{% /tab %}}
{{< /tabs >}}

3. `Logger`를 설정합니다. <br>
**참고**: `Logs.enable()`을 호출한 *후에* 로거를 생성해야 합니다.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let logger = Logger.create(
    with: Logger.Configuration(
        name: "<logger name>",
        networkInfoEnabled: true,
        remoteLogThreshold: .info,
        consoleLogFormat: .shortWith(prefix: "[iOS App] ")
    )
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDLoggerConfiguration *configuration = [[DDLoggerConfiguration alloc] init];
configuration.networkInfoEnabled = YES;
configuration.remoteLogThreshold = [DDLogLevel info];
configuration.printLogsToConsole = YES;

DDLogger *logger = [DDLogger createWithConfiguration:configuration];
```
{{% /tab %}}
{{< /tabs >}}

4. 다음 메서드 중 하나를 사용해 커스텀 로그 엔트리를 Datadog으로 직접 전송합니다.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
logger.debug("A debug message.")
logger.info("Some relevant information?")
logger.notice("Have you noticed?")
logger.warn("An important warning...")
logger.error("An error was met!")
logger.critical("Something critical happened!")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger debug:@"A debug message."];
[logger info:@"Some relevant information?"];
[logger notice:@"Have you noticed?"];
[logger warn:@"An important warning..."];
[logger error:@"An error was met!"];
[logger critical:@"Something critical happened!"];
```
{{% /tab %}}
{{< /tabs >}}

**참고:** 새로 생성한 RUM 보기에 커스텀 iOS 로그를  추가하려면 `viewDidAppear` 메서드를 사용합니다. `viewDidLoad`에서와 같이 `viewDidAppear`이 발생하기 전에 로그를 적용할 경우, 해당 로그는 기술적으로 아직 활성 보기인 기존 RUM 보기에 적용됩니다.

5. (선택 사항) 전송하는 로그에 속성을 추가하기 위해 로그 메시지에 `attributes` 맵을 제공하세요. 맵의 각 엔트리에 속성으로 추가됩니다.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
logger.info("Clicked OK", attributes: ["context": "onboarding flow"])
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger info:@"Clicked OK" attributes:@{@"context": @"onboarding flow"}];
```
{{% /tab %}}
{{< /tabs >}}

## 고급 로깅

### 초기화

로거를 초기화하여 로그를 Datadog으로 보내려고 할 때 `Logger.Configuration`의 다음 메서드를 사용합니다.

| 방법 | 설명 |
|---|---|
| `Logger.Configuration.networkInfoEnabled` | 모든 로그에 `network.client.*` 속성을 추가합니다. 기본적으로 로깅되는 데이터는 `reachability` (`yes`, `no`, `maybe`), `available_interfaces` (`wifi`, `cellular` 등), `sim_carrier.name` (예: `AT&T - US`), `sim_carrier.technology` (`3G`, `LTE` 등), `sim_carrier.iso_country` (예: `US`)입니다. |
| `Logger.Configuration.service` | Datadog으로 전송되는 모든 로그에 추가된 `service` [표준 속성][4]의 값을 설정합니다. |
| `Logger.Configuration.consoleLogFormat` | 로그를 디버거(debugger) 콘솔로 전송합니다. |
| `Logger.Configuration.remoteSampleRate` | Datadog으로 전송되는 로그의 샘플 속도를 설정합니다. |
| `Logger.Configuration.name` | Datadog으로 전송되는 모든 로그에 추가된 `logger.name` 속성 값을 설정합니다. |

### 전역 설정

특정 로거가 전송한 로그 전체에 태그 및 속성을 추가 또는 삭제하려면 다음 메서드를 사용합니다.

#### 전역 태그

##### 태그 추가

특정 로거가 전송한 로그 전체에 태그를 추가하려면 `addTag(withKey:value:)` 메서드를 사용하세요.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// "build_configuration:debug" 태그를 추가힙니다.
logger.addTag(withKey: "build_configuration", value: "debug")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger addTagWithKey:@"build_configuration" value:@"debug"];
```
{{% /tab %}}
{{< /tabs >}}

`<TAG_VALUE>`는 `String`이어야 합니다.

##### 태그 제거

특정 로거가 전송한 로그 전체에서 태그를 삭제하려면 `removeTag(withKey:)` 메서드를 사용하세요.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// "build_configuration"로 시작하는 태그를 삭제합니다.
logger.removeTag(withKey: "build_configuration")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger removeTagWithKey:@"build_configuration"];
```
{{% /tab %}}
{{< /tabs >}}

자세한 내용을 확인하려면 [태그 시작하기][5]를 참조하세요.

#### 전역 속성

##### 속성 추가

기본적으로 로거에서 보낸 로그 전체에 다음 속성이 추가됩니다.

* `http.useragent` 및 추출 `device`와 `OS` 속성
* `network.client.ip`와 추출된 지역 속성(`country`, `city`)
* `logger.version`, Datadog SDK 버전
* `logger.thread_name`, (`main`, `background`)
* `version`, `Info.plist`에서 추출한 클라이언트의 앱 버전
* `environment`, SDK 초기화에 사용되는 환경 이름

특정 로거가 전송한 로그 전체에 커스텀 속성을 추가하려면 `addAttribute(forKey:value:)` 메서드를 사용하세요.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// 문자열 값에 "device-model" 속성을 추가합니다.
logger.addAttribute(forKey: "device-model", value: UIDevice.current.model)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger addAttributeForKey:@"device-model" value:UIDevice.currentDevice.model];
```
{{% /tab %}}
{{< /tabs >}}

`<ATTRIBUTE_VALUE>`는 `String`, `Date`, 커스텀 `Codable` 데이터 모델 등과 같이 `Encodable`를 준수한다면 무엇이든 괜찮습니다.

##### 속성 삭제

특정 로거가 전송한 로그 전체에서 커스텀 속성을 삭제하려면 `removeAttribute(forKey:)` 메서드를 사용하세요.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// 모든 추가 로그 전송에서 "device-model" 속성을 삭제합니다.
logger.removeAttribute(forKey: "device-model")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger removeAttributeForKey:@"device-model"];
```
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-ios
[2]: /ko/account_management/api-app-keys/#client-tokens
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: /ko/logs/processing/attributes_naming_convention/
[5]: /ko/getting_started/tagging/
[6]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web