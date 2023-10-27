---
description: Flutter Monitoring으로 문제를 해결하는 방법에 대해 알아보세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter의 소스 코드
- link: real_user_monitoring/flutter/
  tag: 설명서
  text: Flutter Monitoring에 대해 알아보기
kind: 설명서
title: 트러블슈팅
---
## Cocoapods 이슈

Cocoapods에서 발생하는 오류로 인해 Datadog SDK를 추가한 후 iOS 애플리케이션을 빌드하는 데 문제가 있는 경우, 어떤 오류가 발생하는지 확인하세요. 가장 일반적인 오류는 Cocoapods에서 최신 네이티브 라이브러리를 가져오는 데 문제가 있는 경우이며, `ios` 디렉터리에서 다음을 실행하여 해결할 수 있습니다:

```bash
pod install --repo-update
```

또 다른 일반적인 오류는 Apple Silicon Macs에서 FFI 라이브러리를 로드하는 데 문제가 있는 경우입니다. 다음과 유사한 오류가 표시되는 경우:

```bash
LoadError - dlsym(0x7fbbeb6837d0, Init_ffi_c): symbol not found - /Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi_c.bundle
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:6:in `rescue in <top (required)>'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:3:in `<top (required)>'
```

Apple Silicon에서 Flutter를 사용하려면 [Flutter 설명서][1]를 참조하세요.

## sdkVerbosity 설정

앱을 실행할 수 있지만 Datadog 사이트에서 예상하는 데이터를 볼 수 없다면, `DatadogSdk.initialize`를 호출하기 전코드에 다음을 추가하세요:

```dart
DatadogSdk.instance.sdkVerbosity = Verbosity.verbose;
```

이렇게 하면 SDK가 수행 중인 작업과 발생한 오류에 대한 추가 정보를 출력하여 사용자와 Datadog 지원팀이 문제 범위를 좁히는 데 도움이 될 수 있습니다.

## 오류가 보이지 않음

RUM에서 오류가 발견되지 않으면 보기가 시작되지 않았을 가능성이 높습니다. `DatadogSdk.instance.rum?.startView`와 함께 보기가 시작되었는지 또는 `DatadogRouteObserver`를 사용하고 있다면 현재 Route에 이름이 있는지 확인하세요.

## 자동 리소스 추적 및 분산 추적 관련 이슈

[Datadog tracking HTTP client][2] 패키지는  [`http`][3] 및 [`Dio`][4]를 포함해 `dart:io`에 의존하는 대부분의 일반적인 Flutter 네트워킹 패키지와 함께 작동합니다.

RUM 세션에 리소스가 있는 경우 추적 HTTP 클라이언트가 작동 중이지만 분산 추적을 사용하려면 다른 단계가 필요할 수 있습니다.

기본적으로 Datadog RUM Flutter SDK는 리소스 요청의 20%에서만 분산 트레이스를 샘플링합니다. 설정에 문제가 있는지 확인하는 동안 다음 줄로 초기화를 수정하여 이 값을 트레이스의 100%로 설정해야 합니다:
```dart
final configuration = DdSdkConfiguration(
   //
   rumConfiguration: RumConfiguration(
    applicationId: '<RUM_APPLICATION_ID>',
    tracingSamplingRate: 100.0
   ),
);
```

여전히 문제가 있는 경우 `firstPartyHosts` 속성이 올바르게 설정되어 있는지 확인하세요. 스키마나 경로가 없는 호스트만 있어야 하며 정규식이나 와일드카드를 지원하지 않습니다. 예:

    ✅ 좋음 - 'example.com', 'api.example.com', 'us1.api.sample.com'
    ❌ 나쁨 - 'https://example.com', '*.example.com', 'us1.sample.com/api/*', 'api.sample.com/api'

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/flutter/flutter/wiki/Developing-with-Flutter-on-Apple-Silicon
[2]: https://pub.dev/packages/datadog_tracking_http_client
[3]: https://pub.dev/packages/http
[4]: https://pub.dev/packages/dio