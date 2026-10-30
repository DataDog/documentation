---
aliases:
- /ko/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios
- /ko/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/ios/supported_versions
description: iOS, iPadOS, tvOS, watchOS 및 visionOS를 포함한 Datadog iOS SDK 지원 운영 체제 및
  플랫폼입니다.
further_reading:
- link: /real_user_monitoring/application_monitoring/ios/advanced_configuration/
  tag: 문서
  text: RUM iOS 고급 구성
- link: https://github.com/DataDog/dd-sdk-ios
  tag: 소스 코드
  text: dd-sdk-ios 소스 코드
- link: /real_user_monitoring
  tag: 문서
  text: RUM 데이터를 탐색하는 방법 알아보기
- link: /real_user_monitoring/error_tracking/ios/
  tag: 문서
  text: iOS 오류 추적 방법 알아보기
- link: /real_user_monitoring/ios/swiftui/
  tag: 문서
  text: SwiftUI 애플리케이션 계측에 대해 알아보기
title: Apple 플랫폼 모니터링 지원 버전
---
## 개요 {#overview}

Datadog iOS SDK는 iOS, iPadOS, tvOS, watchOS 및 visionOS 등 모든 Apple 플랫폼에서 Real User Monitoring을 계측하는 단일 SDK입니다. 이 페이지를 사용하여 각 플랫폼에서 사용할 수 있는 최소 OS 버전, 종속성 관리자 및 Datadog 모듈을 확인하세요.

## 지원되는 버전 {#supported-versions}

RUM iOS SDK는 다음 플랫폼 및 버전을 지원합니다.

| 플랫폼 | 지원 | 버전 | 참고 |
|--------|-------------|---------|-------|
| iOS | {{< X >}} | 12+ | |
| iPadOS | {{< X >}} | 12+ | |
| tvOS | {{< X >}} | 12+ | |
| visionOS | {{< X >}} | 1.0+ | |
| watchOS | {{< X >}} | 7.0+ | |
| macOS(iPad용으로 설계됨) | {{< X >}} | 11+ | |
| macOS (Catalyst) | | 12+ | macOS (Catalyst)는 공식적으로 지원되지 않습니다 |
| macOS | | 12+ | Datadog SDK는 macOS를 공식적으로 지원하지 않습니다. 일부 기능은 완전히 작동하지 않을 수 있습니다. **참고**: `DatadogRUM`, `DatadogSessionReplay` 및 `DatadogObjc`는 `UIKit`에 크게 의존하므로 macOS에서 빌드되지 않습니다. |
| Linux | | n/a | |

### 플랫폼별 모듈 지원 {#module-support-by-platform}

  | 모듈 | iOS | tvOS | watchOS | visionOS | 참고 |
  |--------|-----|------|---------|----------|-------|
  | DatadogCore | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogLogs | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogTrace | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogCrashReporting | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogRUM | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | watchOS: 자동 보기/액션 추적, 프레임 속도 모니터링 및 메모리 경고 탐지는 사용할 수 없습니다. |
  | DatadogFlags | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogProfiling | {{< X >}} | {{< X >}} | | {{< X >}} | watchOS에서는 사용할 수 없습니다. 프로파일링 모듈은 watchOS에서 지원하지 않는 시스템 수준 API가 필요합니다. |
  | DatadogSessionReplay | {{< X >}} | | | | tvOS, watchOS 및 visionOS에서는 사용할 수 없습니다. SessionReplay는 이러한 플랫폼에서 사용할 수 없는 렌더링 기능이 필요합니다. |
  | DatadogWebViewTracking | {{< X >}} | | | {{< X >}} | tvOS 및 watchOS에서는 사용할 수 없습니다. WebViewTracking은 이러한 플랫폼에서 사용할 수 없는 브라우저 렌더링 기능이 필요합니다. |

## 지원 플랫폼 {#supported-platforms}

### Xcode {#xcode}
SDK는 최신 버전의 [Xcode][1]를 사용하여 빌드되지만, App Store 제출을 위한 [최소 지원 Xcode 버전][2]과 항상 하위 호환성을 유지합니다.

### 종속성 관리자 {#dependency-managers}
iOS SDK는 다음 종속성 관리자를 지원합니다.

- [Swift Package Manager][3]
- [Cocoapods][4]
- [Carthage][5]

### 언어 {#languages}

| 언어 | 버전 |
|----------|---------|
| UIKit | 5.* |
| Objective-C | 2.0 |

### UI 프레임워크 계측 {#ui-framework-instrumentation}

| 프레임워크 | 자동 | 수동 |
|--------|-------|-------|
| UIKit | {{< X >}} | {{< X >}} |
| SwiftUI | {{< X >}} | {{< X >}} |

### 네트워크 호환성 {#network-compatibility}

| 프레임워크 | 자동 | 수동 |
|--------|-------|-------|
| URLSession | {{< X >}} | {{< X >}} |
| [Alamofire][6] | {{< X >}} | {{< X >}} |
| [Apollo GraphQL][7] | {{< X >}} | {{< X >}} |
| [SDWebImage][8] | {{< X >}} | {{< X >}} |
| [OpenAPI Generator][9] | {{< X >}} | {{< X >}} |
| SwiftNIO | | |

### 종속성 {#dependencies}

Datadog RUM SDK는 다음 타사 라이브러리에 종속됩니다.

- [KSCrash][10] 2.5.0

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.apple.com/xcode/
[2]: https://developer.apple.com/news/?id=fxu2qp7b
[3]: /ko/real_user_monitoring/application_monitoring/ios/setup/?tab=swiftpackagemanagerspm#declare-the-sdk-as-a-dependency
[4]: /ko/real_user_monitoring/application_monitoring/ios/setup/?tab=cocoapods#declare-the-sdk-as-a-dependency
[5]: /ko/real_user_monitoring/application_monitoring/ios/setup/?tab=carthage#declare-the-sdk-as-a-dependency
[6]: /ko/real_user_monitoring/application_monitoring/ios/integrated_libraries/#alamofire
[7]: /ko/real_user_monitoring/application_monitoring/ios/integrated_libraries/#apollo-graphql
[8]: /ko/real_user_monitoring/application_monitoring/ios/integrated_libraries#sdwebimage
[9]: /ko/real_user_monitoring/application_monitoring/ios/integrated_libraries#openapi-generator
[10]: https://github.com/kstenerud/KSCrash