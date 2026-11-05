---
code_lang: ios
code_lang_weight: 20
description: iOS 애플리케이션의 포괄적인 충돌 보고 및 오류 추적 기능을 활성화하고 상세 보고서를 활용하여 문제를 모니터링하고 해결합니다.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-watchos-visionos-datadog-rum/
  tag: 블로그
  text: Datadog RUM으로 watchOS 및 visionOS 앱 모니터링
- link: https://github.com/DataDog/dd-sdk-ios
  tag: 소스 코드
  text: dd-sdk-ios 소스 코드
title: iOS 충돌 보고 및 Error Tracking
type: multi-code-lang
---
## 개요 {#overview}

iOS Crash Reporting과 Error Tracking을 활성화하여 종합적인 충돌 보고서와 오류 추세를 확인합니다. 이 기능을 사용하면 다음 항목에 액세스할 수 있습니다.

 - 집계된 iOS 충돌 대시보드 및 속성
 - 심볼화된 iOS 충돌 보고서
 - iOS Error Tracking을 사용한 추세 분석

스택 트레이스를 심볼화하려면 `.dSYM` 파일을 찾아 Datadog에 업로드합니다. 그런 다음 테스트 충돌을 발생시키고 애플리케이션을 다시 시작하여 구성을 검증합니다.

충돌 보고서는 [{{< ui >}}Error Tracking{{< /ui >}}][1]에서 확인할 수 있습니다.

## 호환성 {#compatibility}

iOS SDK와 호환되는 운영 체제 버전 및 플랫폼 목록은 [지원되는 버전][15]을 참조하세요.

## 설정 {#setup}

iOS 또는 tvOS 애플리케이션에서 Datadog으로 Error Tracking 데이터를 전송하려면 다음 단계를 따르세요.

### 1단계 - iOS SDK를 종속성으로 선언 {#step-1-declare-the-ios-sdk-as-a-dependency}

사용 중인 패키지 관리자에 따라 iOS 라이브러리를 종속성으로 선언합니다. Datadog은 Swift Package Manager(SPM) 사용을 권장합니다.

{{< tabs >}}
{{% tab "SPM(Swift Package Manager)" %}}

Apple의 Swift Package Manager를 사용하여 통합하려면 다음 항목을 `Package.swift`에 종속성으로 추가합니다.

```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
```

프로젝트에서 다음 라이브러리를 연결합니다.

```
DatadogCore
DatadogRUM
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

[CocoaPods][1]을 사용하여 `dd-sdk-ios`를 설치할 수 있습니다.

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

**참고**: Datadog은 사전 구축된 Carthage 바이너리를 제공하지 않습니다. 즉, Carthage가 소스에서 SDK를 빌드합니다.
SDK를 빌드하고 통합하려면 다음을 실행합니다.

```
carthage bootstrap --use-xcframeworks --no-use-binaries
```

빌드 후 다음 XCFramework를 Xcode 프로젝트의 'Frameworks, Libraries, and Embedded Content' 섹션에 추가합니다.

```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogRUM.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

### 2단계 - UI에서 애플리케이션 세부 정보 지정 {#step-2-specify-application-details-in-the-ui}

1. {{< ui >}}Error Tracking{{< /ui >}} > [{{< ui >}}Settings{{< /ui >}}][2] > {{< ui >}}Browser and Mobile{{< /ui >}}로 이동합니다.
2. {{< ui >}}New Application{{< /ui >}}을 클릭합니다.
3. 애플리케이션 이름을 입력하고 애플리케이션 유형으로 {{< ui >}}iOS{{< /ui >}}를 선택합니다.
4. {{< ui >}}Create Application{{< /ui >}}을 클릭하여 고유한 Datadog 애플리케이션 ID와 클라이언트 토큰을 생성합니다.

### 3단계 - 라이브러리 초기화 {#step-3-initialize-the-library}

#### 초기화 스니펫 업데이트 {#update-the-initialization-snippet}

초기화 스니펫에서 환경 이름과 서비스 이름을 설정합니다.

데이터의 안전을 보장하려면 클라이언트 토큰을 사용해야 합니다. [Datadog API 키][5]만 사용하여 `dd-sdk-ios` 라이브러리를 구성하면 해당 키가 iOS 애플리케이션의 바이트코드를 통해 클라이언트 측에 노출됩니다.

클라이언트 토큰 설정에 대한 자세한 내용은 [클라이언트 토큰 설명서][6]를 참조하세요.

SDK는 앱 수명 주기에서 가능한 한 빨리, 구체적으로 `AppDelegate`의 `application(_:didFinishLaunchingWithOptions:)` 콜백에서 초기화되어야 합니다. 이렇게 하면 애플리케이션 시작 시간을 포함한 모든 측정값이 정확하게 수집됩니다. SwiftUI로 빌드된 앱의 경우 `@UIApplicationDelegateAdaptor`를 사용하여 `AppDelegate`에 연결할 수 있습니다.

<div class="alert alert-warning">SDK를 다른 곳(예: 보기 로딩 과정의 후반부)에서 초기화하면 특히 앱 시작 성능과 관련된 텔레메트리 데이터가 부정확하거나 누락될 수 있습니다.</div>

자세한 내용은 [태그 사용][7]을 참조하세요.

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
@import DatadogCore;

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
@import DatadogCore;

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
@import DatadogCore;

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
@import DatadogCore;

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
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us1_fed];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov2" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us2_fed,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us2_fed];

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
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap2" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .ap2,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap2];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="uk1" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .uk1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite uk1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

#### 웹뷰 계측(선택 사항) {#instrument-your-webviews-optional}

원하는 종속성 관리자를 사용하여 DatadogWebViewTracking 모듈을 추가합니다.

웹 콘텐츠 내의 오류 및 성능 문제를 추적하려면 WKWebView 인스턴스에서 웹뷰 추적을 활성화합니다. 이를 통해 임베디드 웹페이지에서 발생하는 JavaScript 오류, 네트워크 요청 및 사용자 상호작용을 모니터링하고 하이브리드 앱의 웹 구성 요소를 종합적으로 파악할 수 있습니다.

도메인 목록을 입력하여 추적할 호스트를 지정합니다. 지정된 호스트의 웹 콘텐츠만 모니터링되고 Datadog에 보고됩니다.

```swift
import DatadogWebViewTracking

let webview = WKWebView(...)

// start tracking webviews
WebViewTracking.enable(webView: webview, hosts: ["foo.bar"])

//stop tracking webviews (after the user stops navigating the web page)
WebViewTracking.disable(webView: webview)
```

자세한 내용은 [WebView 추적][3]을 참조하세요.

### 4단계 - 충돌 보고 추가 {#step-4-add-crash-reporting}

충돌 보고는 Error Tracking의 통합 인터페이스에 표시되는 오류 외에도 앱이 예기치 않게 종료될 때 발생하는 치명적인 충돌을 수집합니다.

충돌 보고를 활성화하려면 사용 중인 종속성 관리자에 따라 패키지를 추가하고 초기화 스니펫을 업데이트합니다.

{{< tabs >}}
{{% tab "SPM(Swift Package Manager)" %}}

Apple의 Swift Package Manager를 사용하여 통합하려면 다음 항목을 `Package.swift`에 종속성으로 추가합니다.

```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
```

프로젝트에서 다음 라이브러리를 연결합니다.

```
DatadogCrashReporting
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

[CocoaPods][1]을 사용하여 `dd-sdk-ios`를 설치할 수 있습니다.

```
pod 'DatadogCrashReporting'
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
DatadogCrashReporting.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

초기화 스니펫을 업데이트하여 충돌 보고를 포함합니다.

```swift
import DatadogCore
import DatadogCrashReporting

Datadog.initialize(...)

CrashReporting.enable()
```

### 5단계 - 앱 중단 보고 추가 {#step-5-add-app-hang-reporting}

앱 중단은 애플리케이션이 장시간 응답하지 않을 때 발생하는 iOS 고유의 오류 유형입니다. 앱 중단은 iOS SDK를 통해 보고됩니다([로그][10]를 통해서는 보고되지 않음). 기본적으로 앱 중단 보고는 **비활성화**되어 있지만, 이 기능을 활성화하고 임계값을 직접 설정하여 `appHangThreshold` 초기화 파라미터에 지정한 시간보다 오래 지속되는 앱 중단을 모니터링할 수 있습니다. 이 기능을 활성화하면 메인 스레드가 지정된 `appHangThreshold`보다 오래 일시 중지되는 경우 [{{< ui >}}Error Tracking{{< /ui >}}][1]에서 '중단'으로 간주합니다. 임계값을 사용자 지정하여 세밀한 관측과 과도한 노이즈 사이에서 적절한 균형을 유지할 수 있습니다. 이 값을 설정하는 방법에 대한 자세한 내용은 [앱 중단 임계값 구성](#configure-app-hang-threshold)을 참조하세요.

앱 중단은 다음 두 가지 유형으로 구분됩니다.

- **치명적인 앱 중단**: 앱 중단이 복구되지 않고 앱이 종료되었을 때 해당 중단이 보고되는 방식입니다. 치명적인 앱 중단은 Error Tracking 및 RUM 탐색기에서 'Crash'로 표시됩니다.

  {{< img src="real_user_monitoring/error_tracking/ios-fatal-app-hang-1.png" alt="오류 사이드 패널에 표시된 치명적인 앱 중단" style="width:100%;" >}}

- **비치명적인 앱 중단**: 비교적 짧은 중단 후 앱이 복구되어 계속 실행될 때 해당 중단이 보고되는 방식입니다. 비치명적인 앱 중단은 Error Tracking 및 RUM 탐색기에서 'Crash'로 표시되지 않습니다.

  {{< img src="real_user_monitoring/error_tracking/ios-non-fatal-app-hang-1.png" alt="오류 사이드 패널에 표시된 비치명적인 앱 중단" style="width:100%;" >}}

{{% collapse-content title="앱 중단 모니터링 활성화" level="h4" expanded=false id="enable-app-hang-monitoring" %}}

앱 중단 모니터링을 활성화하려면 다음 단계를 따르세요.

1. [Crash Reporting을 활성화합니다.](#step-4---add-crash-reporting)

2. 앱 중단을 보고할 최소 지속 시간을 초 단위로 `appHangThreshold` 파라미터에 설정하고 초기화 스니펫을 업데이트합니다. 예를 들어, 250ms 이상 지속되는 앱 중단을 보고하려면 `0.25`를 사용합니다.

   ```swift
   RUM.enable(
       with: RUM.Configuration(
           applicationID: "<application id>",
           appHangThreshold: 0.25
       )
   )
   ```

   이 값을 설정하는 방법에 대한 자세한 내용은 [앱 중단 임계값 구성](#configure-app-hang-threshold)을 참조하세요.

   난해한 메모리 주소를 읽기 쉬운 함수 이름과 줄 번호로 변환하여 효과적으로 디버깅할 수 있도록 아래 단계에 따라 [난독화가 해제된 스택 트레이스](#step-6---get-deobfuscated-stack-traces)를 확보합니다.

{{% /collapse-content %}}

{{% collapse-content title="앱 중단 임계값 구성" level="h4" expanded=false id="configure-app-hang-threshold" %}}

모니터링 요구 사항에 맞는 임계값을 선택합니다.

- **개발 및 디버깅:**
  - 대부분의 성능 문제를 포착하려면 `appHangThreshold: 0.25`초(250ms)를 초기값으로 설정합니다.
  - 필요에 맞는 설정을 찾을 때까지 값을 점진적으로 높이거나 낮춥니다.
- **프로덕션 모니터링:**
  - `appHangThreshold`를 `2.0`~`3.0`초로 설정하여 노이즈를 유발하는 앱 중단을 걸러내고 심각한 성능 문제에 집중합니다.
  - 이는 2초 미만의 앱 중단은 사용자가 알아차리기 어렵다는 사용자 경험에 대한 기대치와 일치합니다.

#### 임계값 제한 {#threshold-limits}
- 최소: `0.1`초(100ms) - 단, 임계값을 이처럼 낮게 설정하면 앱 중단이 과도하게 보고될 수 있습니다.
- 권장 범위: `0.25`~`3.0`초
- SDK는 CPU 사용량을 줄이기 위해 2.5%의 허용 오차를 적용하므로 `appHangThreshold`에 가까운 시간 동안 지속되는 일부 앱 중단은 보고되지 않을 수 있습니다.

##### 구성 예시 {#configuration-example}

```swift
RUM.enable(
    with: RUM.Configuration(
        applicationID: "<application id>",
        appHangThreshold: 2.0  // Report hangs lasting 2+ seconds
    )
)
```

{{% /collapse-content %}}

{{% collapse-content title="앱 중단 모니터링 비활성화" level="h4" expanded=false id="set-tracking-consent" %}}

앱 중단 모니터링을 비활성화하려면 초기화 스니펫을 업데이트하여 `appHangThreshold` 파라미터를 `nil`로 설정합니다.

{{% /collapse-content %}}

### 6단계 - 난독화 해제된 스택 트레이스 가져오기 {#step-6-get-deobfuscated-stack-traces}

충돌 보고서는 원시 형식으로 수집되며 대부분 메모리 주소를 포함합니다. 이러한 주소를 읽을 수 있는 심볼 정보로 매핑하는 심볼화 작업을 수행하려면 Datadog에 애플리케이션의 빌드 또는 배포 과정에서 생성된 `.dSYM` 파일이 필요합니다.

**참고:** Error Tracking은 iOS 14 이상에서 arm64 및 arm64e 아키텍처의 시스템 심볼 파일에 대한 심볼화를 지원합니다. `.dSYM` 파일의 크기는 각각 최대 **2GB**로 제한됩니다.

오류 디버깅을 지원하기 위해 Datadog은 고유하게 생성된 빌드 ID를 사용하여 스택 트레이스를 해당 매핑 파일과 연결하고 난독화를 해제합니다. 이 과정은 매핑 파일이 사전 프로덕션 빌드와 프로덕션 빌드 중 어느 단계에서 업로드되었는지와 관계없이 수행되므로 Datadog에서 충돌과 오류를 검토할 때 효율적인 QA 작업에 필요한 정확한 정보를 활용할 수 있습니다.

iOS 애플리케이션의 경우 스택 트레이스와 심볼 파일은 `uuid` 필드를 기준으로 매칭됩니다.

{{% collapse-content title=".dSYM 파일 찾기" level="h4" expanded=false id="find-your-dsym-files" %}}

모든 iOS 애플리케이션에서는 각 애플리케이션 모듈에 대한 `.dSYM` 파일이 생성됩니다. 이 파일을 사용하면 애플리케이션의 바이너리 크기를 최소화하고 다운로드 속도를 높일 수 있습니다. 각 애플리케이션 버전에는 `.dSYM` 파일 세트가 포함되어 있습니다.

설정에 따라 App Store Connect에서 `.dSYM` 파일을 다운로드하거나 로컬 컴퓨터에서 찾아야 할 수 있습니다.

| Bitcode 활성화 | 설명 |
|---|---|
| 예 | `.dSYM` 파일은 [App Store Connect][12]에서 애플리케이션 빌드 처리가 완료된 후 사용할 수 있습니다. |
| 아니요 | Xcode는 애플리케이션 빌드가 끝날 때 `.dSYM` 파일을 `$DWARF_DSYM_FOLDER_PATH`로 내보냅니다. `DEBUG_INFORMATION_FORMAT` 빌드 설정이 {{< ui >}}DWARF with dSYM File{{< /ui >}}로 지정되어 있는지 확인합니다. 기본적으로 Xcode 프로젝트에서는 Release 프로젝트 구성에 대해서만 `DEBUG_INFORMATION_FORMAT`을 {{< ui >}}DWARF with dSYM File{{< /ui >}}로 설정합니다. |

{{% /collapse-content %}}

{{% collapse-content title=".dSYM 파일 업로드" level="h4" expanded=false id="upload-your-dsym-files" %}}

`.dSYM` 파일을 Datadog에 업로드하면 오류와 관련된 스택 트레이스에서 각 프레임의 파일 경로와 줄 번호를 확인할 수 있습니다.

애플리케이션이 충돌하여 애플리케이션을 다시 시작하면 iOS SDK가 충돌 보고서를 Datadog에 업로드합니다.

**참고**: 동일한 애플리케이션 버전으로 `.dSYM` 파일을 다시 업로드해도 기존 파일을 덮어쓰지 않습니다.

{{< tabs >}}
{{% tab "Datadog CI" %}}

명령줄 도구 [@datadog/datadog-ci][1]를 사용하여 `.dSYM` 파일을 업로드할 수 있습니다.

```sh
export DATADOG_API_KEY="<API KEY>"

// if you have a zip file containing dSYM files
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// if you have a folder containing dSYM files
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

**참고**: EU 엔드포인트를 사용하여 도구를 구성하려면 `DATADOG_SITE` 환경 변수를 `datadoghq.eu`로 설정합니다. 인테이크 엔드포인트의 전체 URL을 재정의하려면 `DATADOG_DSYM_INTAKE_URL` 환경 변수를 정의합니다.

  예를 들어 다른 Datadog 사이트를 사용하도록 구성하려면 다음과 같이 설정합니다.

  ```sh
  # For EU endpoint
  export DATADOG_SITE="datadoghq.eu"
  export DATADOG_API_KEY="<API KEY>"
  npx @datadog/datadog-ci dsyms upload appDsyms.zip

  # For custom intake URL
  export DATADOG_DSYM_INTAKE_URL="https://your-custom-endpoint.com"
  export DATADOG_API_KEY="<API KEY>"
  npx @datadog/datadog-ci dsyms upload appDsyms.zip
  ```

[1]: https://www.npmjs.com/package/@datadog/datadog-ci

{{% /tab %}}
{{% tab "Fastlane" %}}

Fastlane 플러그인은 Fastlane 설정에서 `.dSYM` 파일을 Datadog에 업로드할 수 있도록 합니다.

1. 프로젝트에 [`fastlane-plugin-datadog`][1]을 추가합니다.

   ```sh
   fastlane add_plugin datadog
   ```

2. 심볼을 업로드하도록 Fastlane을 구성합니다.

   ```ruby
   # download_dsyms action feeds dsym_paths automatically
   lane :upload_dsym_with_download_dsyms do
     download_dsyms
     upload_symbols_to_datadog(api_key: "datadog-api-key")
   end
   ```

자세한 내용은 [`fastlane-plugin-datadog`][1]을 참조하세요.

[1]: https://github.com/DataDog/datadog-fastlane-plugin

{{% /tab %}}
{{% tab "GitHub Actions" %}}

[Datadog Upload dSYMs GitHub Action][1]을 사용하면 GitHub Actions 작업에서 심볼을 업로드할 수 있습니다.

```yml
name: Upload dSYM Files

jobs:
  build:
    runs-on: macos-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Generate/Download dSYM Files
        uses: ./release.sh

      - name: Upload dSYMs to Datadog
        uses: DataDog/upload-dsyms-github-action@v1
        with:
          api_key: ${{ secrets.DATADOG_API_KEY }}
          site: datadoghq.com
          dsym_paths: |
            path/to/dsyms/folder
            path/to/zip/dsyms.zip
```

자세한 내용은 [dSYMs 명령][2]을 참조하세요.

[1]: https://github.com/marketplace/actions/datadog-upload-dsyms
[2]: https://github.com/DataDog/datadog-ci/blob/master/packages/datadog-ci/src/commands/dsyms/README.md

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## 구현 테스트 {#test-your-implementation}

iOS 충돌 보고 및 Error Tracking 구성을 검증하려면 애플리케이션에서 충돌을 발생시키고 Datadog에 해당 오류가 표시되는지 확인합니다.

1. iOS 시뮬레이터 또는 실제 장치에서 애플리케이션을 실행합니다. 디버거가 연결되어 있지 않은지 확인합니다. 디버거가 연결되어 있으면 Xcode가 iOS SDK보다 먼저 충돌을 포착합니다.
2. 충돌을 유발하는 코드를 실행합니다.

   ```swift
   func didTapButton() {
   fatalError("Crash the app")
   }
   ```

3. 충돌이 발생한 후 애플리케이션을 다시 시작하고 iOS SDK가 [{{< ui >}}Error Tracking{{< /ui >}}][1]에 충돌 보고서를 업로드할 때까지 기다립니다.

## 고급 Error Tracking 기능 {#advanced-error-tracking-features}

{{% collapse-content title="추적 동의 설정(GDPR 준수)" level="h3" expanded=false id="set-tracking-consent" %}}

GDPR을 준수하려면 iOS SDK 초기화 시 추적 동의 값을 지정해야 합니다.

`trackingConsent` 설정에는 다음 값 중 하나를 지정할 수 있습니다.

1. `.pending`: iOS SDK는 데이터를 수집하고 배치로 묶지만 Datadog으로 전송하지는 않습니다. iOS SDK는 새로운 추적 동의 값이 지정될 때까지 기다린 후 해당 값에 따라 배치 데이터를 처리합니다.
2. `.granted`: iOS SDK가 데이터 수집을 시작하고 Datadog으로 해당 데이터를 전송합니다.
3. `.notGranted`: iOS SDK는 데이터를 수집하지 않으며, 로그, 트레이스 또는 이벤트를 Datadog으로 전송하지 않습니다.

iOS SDK를 초기화한 후 **추적 동의 값을 변경하려면** `Datadog.set(trackingConsent:)` API 호출을 사용합니다. iOS SDK는 새 값에 따라 동작을 변경합니다.

예를 들어 현재 추적 동의 값이 `.pending`이라면 다음과 같이 동작합니다.

- 값을 `.granted`로 변경하면 iOS SDK가 현재 데이터와 향후 수집되는 모든 데이터를 Datadog으로 전송합니다.
- 값을 `.notGranted`로 변경하면 iOS SDK가 현재 데이터를 모두 삭제하고 이후에는 데이터를 수집하지 않습니다.

{{% /collapse-content %}}

{{% collapse-content title="샘플 세션 레이트" level="h3" expanded=false id="sample-session-rates" %}}

애플리케이션에서 Datadog으로 전송하는 데이터를 제어하기 위해 [iOS SDK를 초기화][14]할 때 세션 샘플링 비율을 지정할 수 있습니다. 이 비율은 0~100%로 지정하며, 기본적으로 `sessionSamplingRate`는 100으로 설정되어 모든 세션을 유지합니다.

예를 들어 세션의 50%만 유지하려면 다음을 사용합니다.

{{< tabs >}}
{{% tab "Swift" %}}

```swift
let configuration = RUM.Configuration(
    applicationID: "<application id>",
    sessionSampleRate: 50
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<application id>"];
configuration.sessionSampleRate = 50;
```
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="장치가 오프라인 상태일 때 데이터 전송" level="h3" expanded=false id="sending-data-device-offline" %}}

iOS SDK는 최종 사용자의 장치가 오프라인 상태에서도 데이터를 계속 사용할 수 있도록 합니다. 네트워크 연결이 불안정하거나 장치의 배터리 잔량이 부족하면 장치에서 모든 이벤트를 먼저 배치로 묶어 저장합니다. 네트워크를 사용할 수 있고 배터리 잔량이 충분해져 iOS SDK가 최종 사용자 경험에 영향을 주지 않는 상태가 되면 저장된 이벤트를 즉시 전송합니다. 애플리케이션이 포그라운드에서 실행되는 동안 네트워크를 사용할 수 없거나 데이터 업로드에 실패하면 업로드에 성공할 때까지 장치에 해당 배치를 보관합니다.

즉, 사용자가 오프라인 상태에서 애플리케이션을 열어도 데이터가 손실되지 않습니다.

**참고**: iOS SDK가 디스크 공간을 과도하게 사용하지 않도록 오래된 데이터는 장치에서 자동으로 삭제됩니다.

{{% /collapse-content %}}

{{% collapse-content title="워치독 종료 보고 추가" level="h3" expanded=false id="add-watchdog-terminations-reporting" %}}

Apple 환경에서 운영 체제는 워치독 메커니즘으로 애플리케이션의 상태를 모니터링하고, 애플리케이션이 응답하지 않거나 CPU와 메모리 등의 리소스를 과도하게 사용하면 해당 애플리케이션을 종료합니다. 이러한 워치독 종료는 치명적이며 복구가 불가능합니다(자세한 내용은 공식 [Apple 설명서][13] 참조).

기본적으로 워치독 종료 보고 기능은 **비활성화**되어 있지만, `trackWatchdogTerminations` 초기화 파라미터를 사용하여 활성화할 수 있습니다.

이 기능이 활성화되어 있고 다음 조건을 모두 충족하면 앱을 다음에 실행할 때 워치독 종료가 보고되고 해당 보고가 이전 사용자 세션에 연결됩니다.

- 그동안 애플리케이션이 업그레이드되지 않았습니다.

- `exit`과 `abort`를 모두 호출하지 않았습니다.

- 예외나 치명적인 [앱 중단](#step-5---add-app-hang-reporting)으로 인해 충돌이 발생하지 않았습니다.

- 사용자가 앱을 강제 종료하지 않았습니다.

- 운영 체제 업그레이드를 포함하여 장치가 재부팅되지 않았습니다.

{{< img src="real_user_monitoring/error_tracking/ios-watchdog-termination-1.png" alt="Error Tracking 사이드 패널에 표시된 워치독 종료" style="width:100%;" >}}

#### 워치독 종료 보고 활성화 {#enable-watchdog-terminations-reporting}

워치독 종료 보고를 활성화하려면 다음 단계를 따르세요.

1. [Crash Reporting을 활성화합니다.](#step-4---add-crash-reporting)

2. `trackWatchdogTerminations` 플래그를 포함하도록 초기화 스니펫을 업데이트합니다.

    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<application id>",
            trackWatchdogTerminations: true
        )
    )
    ```

#### 워치독 종료 보고 비활성화 {#disable-watchdog-terminations-reporting}

워치독 종료 보고를 비활성화하려면 초기화 스니펫을 업데이트하고 `trackWatchdogTerminations` 파라미터를 `false`로 설정합니다.

{{% /collapse-content %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/error-tracking/settings/setup/client
[3]: /ko/real_user_monitoring/ios/web_view_tracking/
[4]: /ko/real_user_monitoring/ios/data_collected/
[5]: /ko/account_management/api-app-keys/#api-keys
[6]: /ko/account_management/api-app-keys/#client-tokens
[7]: /ko/getting_started/tagging/using_tags/#rum--session-replay
[8]: /ko/real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[9]: /ko/real_user_monitoring/explorer/
[10]: /ko/logs/log_collection/ios
[12]: https://appstoreconnect.apple.com/
[13]: https://developer.apple.com/documentation/xcode/addressing-watchdog-terminations
[14]: https://github.com/DataDog/dd-sdk-ios
[15]: /ko/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/