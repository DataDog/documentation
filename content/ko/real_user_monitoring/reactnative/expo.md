---
description: Datadog과 함께 Expo 및 Expo Go를 사용하여 React Native 프로젝트를 모니터링하세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative를 위한 소스 코드
- link: real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
kind: 설명서
title: Expo
---
## 개요

RUM React Native SDK는 Expo와 Expo Go를 지원합니다. 이를 사용하려면, `expo-datadog`과`@datadog/mobile-react-native`를 설치하세요.

`expo-datadog`은 SDK 45부터 Expo를 지원하며 플러그인의 버전은 Expo 버전을 따릅니다. 예를 들어, Expo SDK 45를 사용하는 경우 `expo-datadog` 버전 `45.x.x`를 사용하세요. Datadog은 **Expo SDK 45**를 최소 버전으로 사용할 것을 권장하며, 이전 버전에서는 수동 단계가 필요할 수 있습니다.

Expo 애플리케이션으로 Datadog SDK를 설정하는 데 문제가 발생하면 [예제 애플리케이션][8]을 참조하세요.

## 설정

NPM으로 설치하려면 다음을 실행하세요:

```sh
npm install expo-datadog @datadog/mobile-react-native
```

Yarn으로 설치하려면 다음을 실행하세요:

```sh
yarn add expo-datadog @datadog/mobile-react-native
```

## 사용법

### 애플리케이션 컨텍스트로 라이브러리 초기화

초기화 파일에 다음 코드 스니펫을 추가하세요:

```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from 'expo-datadog';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // 버튼을 탭하는 등의 사용자 상호작용을 추적합니다.  'accessibilityLabel' 요소 속성을 사용하여 탭 동작에 이름을 지정할 수 있으며, 그렇지 않으면 요소 유형이 보고됩니다.
    true, // XHR 리소스 추적
    true // 오류 추적
);
// 선택 사항: Datadog 웹사이트를 선택합니다 ("US1", "US3", "US5", EU1", 또는 "US1_FED"). 기본값은 "US1".
config.site = 'US1';
// 선택 사항: 기본 충돌 보고서를 활성화 또는 비활성화합니다.
config.nativeCrashReportEnabled = true;
// 선택 사항: 샘플 RUM 세션(예: 세션의 80%가 Datadog으로 전송됨). 기본값은 100%입니다.
config.sessionSamplingRate = 80;
// 선택 사항: 앱과 백엔드 간의 네트워크 호출에 대한 샘플 추적 통합(예: 계측된 백엔드로의 호출 중 80%가 RUM 보기에서 APM 보기로 연결됨). 기본값은 20%입니다.
// 이러한 백엔드에서 추적을 사용하려면 백엔드의 호스트를 지정해야 합니다.
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // 'example.com'과 'api.example.com'과 같은 하위 도메인을 일치시킵니다.
// 선택 사항: Datadog SDK가 제공된 수준 이상의 내부 로그를 출력하도록 합니다. 기본값은 정의되지 않습니다. 즉, 로그가 없습니다.
config.verbosity = SdkVerbosity.WARN;

await DdSdkReactNative.initialize(config);

// Datadog SDK가 초기화되면, RUM 대시보드에서 데이터를 보기 위해 보기 추적을 설정해야 합니다.
```

### EAS 빌드에서 소스 맵 업로드

<div class="alert alert-info"><p>Crash Reporting을 활성화하지 않은 경우 이 단계를 건너뛸 수 있습니다.<p></div>

`app.json` 파일에서 플러그인에 `expo-datadog`를 추가하세요:

```json
{
    "expo": {
        "plugins": ["expo-datadog"]
    }
}
```

이 플러그인은 모든 EAS 빌드에 dSYM, 소스 맵 및 Proguard 매핑 파일 업로드를 처리합니다.

개발 종속성으로 `@datadog/datadog-ci`를 추가합니다. 이 패키지에는 소스 맵을 업로드하기 위한 스크립트가 포함되어 있습니다. NPM과 함께 설치할 수 있습니다:

```sh
npm install @datadog/datadog-ci --save-dev
```

또는 Yarn과 함께:

```sh
yarn add -D @datadog/datadog-ci
```

`eas secret:create`를 실행하여 `DATADOG_API_KEY`를 Datadog API 키로 설정합니다. 그리고 `DATADOG_SITE`를 Datadog 사이트(예: `datadoghq.com`)의 호스트로 설정합니다.

 Expo 크래시 추적에 대한 자세한 내용은 [Expo 크래시 보고 및 오류 추적][6]을 참조하세요.

## Expo Router 화면 추적

[Expo Router][7]를 사용하는 경우 `app/_layout.js` 파일에서 화면을 추적합니다:

```javascript
import { useEffect } from 'react';
import { usePathname, useSearchParams, useSegments, Slot } from 'expo-router';

export default function Layout() {
    const pathname = usePathname();
    const segments = useSegments();
    const viewKey = segments.join('/');

    useEffect(() => {
        DdRum.startView(viewKey, pathname);
    }, [viewKey, pathname]);

    // 가장 기본적인 방법으로 모든 하위 경로를 내보냅니다.
    return <Slot />;
}
```

## Expo Go

Expo Go를 사용하는 경우 개발 빌드로 전환하거나(권장), 독립 실행형 애플리케이션에서 실행하는 동안 Datadog 없이 Expo Go를 계속 사용합니다(권장되지 않음).

### Expo Go에서 개발 빌드로 전환

애플리케이션의 [개발 빌드][3]는 `expo-dev-client` 패키지를 포함하는 디버그 빌드입니다.

1. `expo run:android` 및 `expo run:ios`를 사용하여 [커스텀 네이티브 코드][4]를 실행합니다.
2. 개발 애플리케이션 사용을 시작하려면 `expo install expo-dev-client`와 `expo start --dev-client`를 실행합니다. 이는 [`expo-dev-client` 패키지][5]를 설치하고 시작하여 추가된 네이티브 코드를 개발 모드에서 실행합니다.

### Expo Go로 개발

애플리케이션이 Expo Go 내부에서 실행될 때 Expo Go 애플리케이션에 속하지 않는 커스텀 네이티브 코드를 추가할 수 없습니다. RUM React Native SDK는 일부 커스텀 네이티브 코드를 사용하여 실행되므로 Datadog 없이도 Expo Go 내부에서 애플리케이션을 개발하고 독립형 빌드에서 Datadog을 사용할 수 있습니다.

일부 네이티브 코드(포함되지 않은 코드)가 호출될 때 애플리케이션이 Expo Go에서 충돌합니다. 독립 실행형 애플리케이션과 함께 Datadog을 사용하고 개발 중에 Expo Go를 계속 사용하려면 프로젝트에 다음 TypeScript 파일을 추가하세요:

```typescript
// mockDatadog.ts
// Datadog은 이 접근 방식을 권장하지 않으므로 Expo 개발 빌드로 이동하는 것이 좋습니다.
// 이 파일은 공식적으로 유지 관리되지 않으며, 새 릴리스에 대한 최신 정보가 없을 수 있습니다.

import { DdLogs, DdTrace, DdRum, DdSdkReactNative } from 'expo-datadog';

if (__DEV__) {
    const emptyAsyncFunction = () => new Promise<void>(resolve => resolve());

    DdLogs.debug = emptyAsyncFunction;
    DdLogs.info = emptyAsyncFunction;
    DdLogs.warn = emptyAsyncFunction;
    DdLogs.error = emptyAsyncFunction;

    DdTrace.startSpan = () =>
        new Promise<string>(resolve => resolve('fakeSpanId'));
    DdTrace.finishSpan = emptyAsyncFunction;
    DdRum.startView = emptyAsyncFunction;
    DdRum.stopView = emptyAsyncFunction;
    DdRum.startAction = emptyAsyncFunction;
    DdRum.stopAction = emptyAsyncFunction;
    DdRum.addAction = emptyAsyncFunction;
    DdRum.startResource = emptyAsyncFunction;
    DdRum.stopResource = emptyAsyncFunction;
    DdRum.addError = emptyAsyncFunction;
    DdRum.addTiming = emptyAsyncFunction;

    DdSdkReactNative.initialize = emptyAsyncFunction;
    DdSdkReactNative.setUser = emptyAsyncFunction;
    DdSdkReactNative.setAttributes = emptyAsyncFunction;
    DdSdkReactNative.setTrackingConsent = emptyAsyncFunction;
}
```

그런 다음 Datadog React Native SDK를 초기화하기 전에 가져옵니다:

```typescript
import './mockDatadog';
import { DdSdkReactNative } from 'expo-datadog';

const config = new DdSdkReactNativeConfiguration(/* your config */);
DdSdkReactNative.initialize(config);
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://docs.expo.dev/development/introduction/
[4]: https://docs.expo.dev/workflow/customizing/#releasing-apps-with-custom-native-code-to
[5]: https://docs.expo.dev/development/getting-started/
[6]: /ko/real_user_monitoring/error_tracking/expo/
[7]: https://expo.github.io/router/docs/
[8]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-expo-react-navigation