---
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Github
  text: dd-sdk-reactnative의 소스 코드
- link: /real_user_monitoring
  tag: 설명서
  text: Datadog 실제 사용자 모니터링
kind: 설명서
title: 문제 해결
---

Datadog React Native RUM에서 예기치 않은 동작이 발생하는 경우, 이 가이드를 사용하여 문제를 신속하게 해결하세요. 계속해서 문제가 발생하면 [Datadog 지원][1]에 문의하여 추가 지원을 받으세요.

## Datadog으로 전송되는 데이터가 없습니다.

SDK가 설치되고 앱이 컴파일되었지만 Datadog에서 데이터를 수신하지 못하는 경우 다음 지침을 순서대로 따르세요.

### 설정 확인하기

간혹 설정에 작은 실수로 인해 데이터가 전송되지 않는 경우가 있습니다.

다음은 몇 가지 일반적인 확인 사항입니다:

- `clientToken`과 `applicationId`가 올바르게 설정되어 있는지 확인합니다.
- `sessionSamplingRate`를 100(기본값은 100)이 아닌 다른 값으로 설정하지 않았는지 확인하세요. 그렇지 않으면 세션이 전송될 수 있습니다.
- Datadog 설정에서 `Proxy`를 설정한 경우 올바르게 설정되었는지 확인하세요.
- **보기를 추적**(모든 이벤트는 보기에 첨부되어야 함)하고 **이벤트를 발송**하고 있는지 확인합니다.

### React Native에서 SDK 로그 검토하기

- `@datadog/mobile-react-native`에서 `SdkVerbosity`를 가져오는 `config.verbosity = SdkVerbosity.DEBUG`를 설정하세요.
- 다음 출력과 같이 JavaScript 콘솔에 로그가 나타나기 시작합니다:

  ```
  INFO  DATADOG: Datadog SDK was initialized
  INFO  DATADOG: Datadog SDK is tracking interactions
  INFO  DATADOG: Datadog SDK is tracking XHR resources
  INFO  DATADOG: Datadog SDK is tracking errors
  DEBUG  DATADOG: Starting RUM View “Products” #Products-oaZlP_FVwGM5vtPoup_rT
  DEBUG  DATADOG: Adding RUM Action “RCTView” (TAP)
  ```

  **참고**: 이 예제에서 처음 네 줄의 로그는 SDK가 올바르게 구성되었음을 나타내며, 마지막 두 줄은 전송된 이벤트입니다.

#### 가능한 원인

iOS를 사용 중이고 초기화 로그가 전송되기 **전에** 로그 또는 RUM 이벤트가 전송되었음을 나타내는 일부 DEBUG 로그가 표시되는 경우, 이 때문에 SDK가 이벤트를 전송하지 않는 것일 수 있습니다.

초기화 전에는 이벤트를 전송할 수 없으며, 전송을 시도하면 SDK가 데이터를 전송할 수 없는 상태가 됩니다.

#### 해결 방법

**`DdSdkReactNative.initialize`**를 사용:

Datadog SDK를 시작하는 데 `DdSdkReactNative.initialize`를 사용하는 경우, 최상위 `index.js` 파일에서 이 함수를 호출하여 다른 이벤트가 전송되기 전에 SDK가 초기화되도록 하세요.

**`DatadogProvider`**를 사용:

SDK 버전 `1.2.0`부터 `DatadogProvider` 컴포넌트를 사용하여 SDK를 초기화할 수 있습니다. 이 컴포넌트에는 데이터를 Datadog으로 전송하기 전에 SDK가 초기화되었는지 확인하는 RUM 이벤트 버퍼가 포함되어 있어 이 문제가 발생하지 않도록 합니다.

이를 사용하려면 [Datadog 공급자로 마이그레이션 가이드][2]를 참조하세요.

### 기본 로그 검토하기

기본 로그를 검토하면 무엇이 잘못되었는지에 대한 더 많은 정보를 얻을 수 있습니다.

#### iOS에서

- `xed ios`를 실행하여 Xcode에서 프로젝트를 엽니다.
- 시뮬레이터 또는 디바이스용 프로젝트를 빌드합니다.
- 오른쪽 하단 코너에 기본 로그가 표시되기 시작합니다:

  {{< img src="real_user_monitoring/react_native/troubleshooting-xcode-logs.png" alt="기본 로그를 검토하면 데이터가 전송되지 않는 이유를 파악하는 데 도움이 될 수 있습니다." >}}

"DATADOG"으로 로그를 필터링하고 오류를 찾을 수 있습니다.

실제로 이벤트를 전송하고 있다면 다음 로그가 표시되어야 합니다:

```
[DATADOG SDK] 🐶 → 10:02:47.398 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 10:02:47.538 [DEBUG]    → (rum) accepted, won't be retransmitted: [response code: 202 (accepted), request ID: AAAABBBB-1111-2222-3333-777788883333]
```

첫 번째 로그는 일부 데이터가 전송되고 있음을 나타내고, 두 번째 로그는 데이터가 수신되었음을 나타냅니다.

##### 가능한 원인

아래 로그가 표시되면 SDK를 초기화하기 전에 RUM 메서드를 호출했다는 의미입니다.

```
[DATADOG SDK] 🐶 → 10:09:13.621 [WARN] The `Global.rum` was called but no `RUMMonitor` is registered. Configure and register the RUM Monitor globally before invoking the feature:
```

##### 해결 방법

**`DdSdkReactNative.initialize`**를 사용:

Datadog SDK를 시작하는 데 `DdSdkReactNative.initialize`를 사용하는 경우, 최상위 `index.js` 파일에서 이 함수를 호출하여 다른 이벤트가 전송되기 전에 SDK가 초기화되도록 하세요.

**`DatadogProvider`**를 사용:

SDK 버전 `1.2.0`부터 `DatadogProvider` 컴포넌트를 사용하여 SDK를 초기화할 수 있습니다. 이 컴포넌트에는 데이터를 Datadog으로 전송하기 전에 SDK가 초기화되었는지 확인하는 RUM 이벤트 버퍼가 포함되어 있어 이 문제가 발생하지 않도록 합니다.

이를 사용하려면 [Datadog 공급자로 마이그레이션 가이드][2]를 참조하세요.

#### Android에서

- 더 나은 디버깅 환경을 위해 Datadog은 [pidcat][3]을 설치할 것을 권장합니다.
  - pidcat은 `adb logcat`을 통해 얻은 디바이스 로그를 필터링하여 애플리케이션에서 가져온 로그만 표시합니다.
  - Python 2가 없는 M1 사용자는 [이 문제][4]를 참조하세요.
- `node_modules/@datadog/mobile-react-native/android/src/main/kotlin/com/datadog/reactnative/DdSdk.kt`를 수정하여 기본 SDK에서 상세한 로깅을 사용하도록 합니다.

  ```java
  fun initialize(configuration: ReadableMap, promise: Promise) {
      // ...

      datadog.initialize(appContext, credentials, nativeConfiguration, trackingConsent)
      datadog.setVerbosity(Log.VERBOSE) // Add this line

      // ...
  }
  ```

- 디버그 모드로 노트북에 연결된 휴대폰에서 앱을 실행하거나(`adb devices`를 실행할 때 표시되어야 함) 에뮬레이터에서 앱을 실행합니다.
- 노트북에서 pidcat `my.app.package.name` 또는 `adb logcat`을 실행합니다.
- Datadog에 대한 오류가 있는지 확인합니다.

Pidcat 출력은 다음과 같습니다.

{{< img src="real_user_monitoring/react_native/troubleshooting-pidcat-logs.png" alt="pidcat 출력의 예" >}}

이 예에서 마지막 로그는 RUM 데이터 배치가 성공적으로 전송되었음을 나타냅니다.

## Undefined symbols: Swift

다음 오류 메시지를 본다면:

```
Undefined symbols for architecture x86_64:
  "static Foundation.JSONEncoder.OutputFormatting.withoutEscapingSlashes.getter : Foundation.JSONEncoder.OutputFormatting", referenced from:
      static (extension in Datadog):Foundation.JSONEncoder.default() -> Foundation.JSONEncoder in libDatadogSDK.a(JSONEncoder.o)
...
```

Xcode를 열고 프로젝트(앱 타겟이 아닌)의 `Build Settings`로 이동한 다음  Library Search Paths에 다음 설정이 있는지 확인합니다:

```shell
LIBRARY_SEARCH_PATHS = (
  "\"$(TOOLCHAIN_DIR)/usr/lib/swift/$(PLATFORM_NAME)\"",
  "\"/usr/lib/swift\"",
  "\"$(inherited)\"",
);
```

## Undefined symbols: _RCTModule

undefined _RCTModule symbol이 표시되면 [react-native v0.63 changelog][5]의 이 변경 사항과 관련이 있을 수 있습니다.

다음과 같이 변경하여 문제를 해결할 수 있습니다:

```objectivec
// DdSdk.m
// instead of
#import <React/RCTBridgeModule.h>
// maybe that:
@import React // or @import React-Core
```

## Infinite loop과 유사한 오류 메시지

[React Native 프로젝트에 오류 메시지 스트림이 표시되고 CPU 사용량이 크게 증가하는 문제][5]가 발생하면, 새 React Native 프로젝트를 생성해 보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help
[2]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/docs/migrating_to_datadog_provider.md
[3]: https://github.com/JakeWharton/pidcat
[4]: https://github.com/JakeWharton/pidcat/issues/180#issuecomment-1124019329
[5]: https://github.com/facebook/react-native/commit/6e08f84719c47985e80123c72686d7a1c89b72ed
[6]: https://github.com/facebook/react-native/issues/28801