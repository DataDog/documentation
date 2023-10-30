---
description: React Native 프로젝트에서 RUM 데이터를 수집합니다.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative를 위한 소스 코드
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: 블로그
  text: React Native 애플리케이션 모니터링
- link: real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
kind: 설명서
title: React Native 모니터링
---
## 개요

Datadog 실제 사용자 모니터링(RUM)을 사용하면 애플리케이션 개별 사용자의 실시간 성능 및 사용자 여정을 시각화하고 분석할 수 있습니다.

RUM React Native SDK에 대해 지원되는 최소 버전은 React Native 버전 0.63.4이상 입니다. 이전 버전과의 호환성은 즉시 보장되지 않습니다.

RUM React Native SDK는 [Expo][12]를 지원합니다. 자세한 내용은 [Expo 설명서][13]를 참조하세요.

## 설정

NPM으로 설치하려면 다음을 실행합니다:

```sh
npm install @datadog/mobile-react-native
```

Yarn으로 설치하려면 다음을 실행합니다:

```sh
yarn add @datadog/mobile-react-native
```

추가된 포드를 설치합니다:

```sh
(cd ios && pod install)
```

`1.0.0-rc5`버전 이상에서는 Android 애플리케이션 설정에서 `compileSdkVersion = 31`가 필요하므로 Build Tools 버전 31, Android Gradle Plugin 버전 7 및 Gradle 버전 7 이상을 사용해야 합니다. 버전을 수정하려면 애플리케이션 최상위 `build.gradle` 파일의 `buildscript.ext` 블록에서 값을 변경하세요. Datadog은 React Native 버전 0.67 이상을 사용할 것을 권장합니다.

### UI에서 애플리케이션 세부 정보 지정

1. [Datadog앱][1]에서 **UX Monitoring** > **RUM Applications** > **New Application**으로 이동합니다.
2. 애플리케이션 유형으로 `react-native`를 선택합니다.
3. 고유한 Datadog 애플리케이션 ID 및 클라이언트 토큰을 생성하기 위한 애플리케이션 이름을 제공합니다.
4. 클라이언트 IP 또는 지리적 위치 데이터에 대해 자동 사용자 데이터 수집을 비활성화하려면 해당 설정의 확인란을 선택 취소합니다.

   {{< img src="real_user_monitoring/react_native/reactnative_setup.png" alt="Datadog에서 React Native용 RUM 애플리케이션 만들기" style="width:90%;">}}

데이터의 안전을 위해 클라이언트 토큰을 사용해야 합니다. `@datadog/mobile-react-native` 라이브러리를 설정할 때 [Datadog API 키][3]만 사용했다면 React Native 애플리케이션의 코드에서 클라이언트 측에 노출됩니다.

클라이언트 토큰 설정에 대한 자세한 내용은 [클라이언트 토큰 설명서][4]를 참조하세요.

### 애플리케이션 컨텍스트로 라이브러리 초기화

{{< site-region region="us" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // 사용자 상호 작용(예: 버튼 탭 등)을 추적
    true, // XHR 리소스 추적
    true // 오류 추적
);
config.site = 'US1';
// 선택사항: 기본 충돌 보고서 사용 또는 사용 안 함
config.nativeCrashReportEnabled = true;
// 선택사항: 샘플 RUM 세션(이 예에서는 세션의 80%가 Datadog로 전송됩니다. 기본값은 100%입니다.)
config.sessionSamplingRate = 80;
// 선택사항: 앱과 백엔드 간의 네트워크 호출에 대한 샘플 추적 통합(이 예에서는 계측된 백엔드 호출의 80%가 RUM 보기에서 APM 보기로 연결됩니다. 기본값은 20%입니다.)
// 이러한 백엔드를 사용하여 추적할 수 있도록 하려면 백엔드의 호스트를 지정해야 합니다.
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; //'example.com' 및 'api.example.com'과 같은 하위 도메인과 일치합니다.
// 선택사항: 보고된 서비스 이름을 설정합니다(기본적으로 Android 또는 iOS 앱의 패키지 이름 또는 bundleIdentifier를 각각 사용합니다).
config.serviceName = 'com.example.reactnative';
// 선택사항: SDK에서 제공된 수준 이상의 내부 로그를 출력하도록 합니다. 기본값은 undefined (로그를 출력하지 않음)
config.verbosity = SdkVerbosity.WARN;

// App 컴포넌트의 내용을 DatadogProvider 컴포넌트로 래핑하고 구성을 전달합니다.

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// RUM용 Datadog React Native SDK가 초기화되면 보기 추적을 설정해야 RUM 대시보드에서 데이터를 볼 수 있습니다.
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // 사용자 상호 작용(예: 버튼 탭 등)을 추적
    true, // XHR 리소스 추적
    true // 오류 추적
);
config.site = 'US3';
// 선택사항: 기본 충돌 보고서 사용 또는 사용 안 함
config.nativeCrashReportEnabled = true;
// 선택사항: 샘플 RUM 세션 (여기서는 세션의 80%가 Datadog로 전송됩니다. 기본값 = 100%)
config.sessionSamplingRate = 80;
// 선택사항: 앱과 백엔드 간의 네트워크 호출에 대한 샘플 추적 통합(여기서는 계측된 백엔드 호출의 80%가 RUM 보기에서 APM 보기로 연결됩니다. 기본값 = 20%)
// 이러한 백엔드를 사용하여 추적할 수 있도록 하려면 백엔드의 호스트를 지정해야 합니다.
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // 'example.com' 및 'api.example.com'과 같은 하위 도메인과 일치합니다.

await DdSdkReactNative.initialize(config);

// RUM용 React Native SDK가 초기화되면 보기 추적을 설정해야 RUM 대시보드에서 데이터를 볼 수 있습니다.
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // 사용자 상호 작용(예: 버튼 탭 등)을 추적
    true, // XHR 리소스 추적
    true // 오류 추적
);
config.site = 'US5';
// 선택사항: 기본 충돌 보고서 사용 또는 사용 안 함
config.nativeCrashReportEnabled = true;
// 선택사항: 샘플 RUM 세션 (여기서는 세션의 80%가 Datadog로 전송됩니다. 기본값 = 100%)
config.sessionSamplingRate = 80;
// 선택사항: 앱과 백엔드 간의 네트워크 호출에 대한 샘플 추적 통합(여기서는 계측된 백엔드 호출의 80%가 RUM 보기에서 APM 보기로 연결됩니다. 기본값 = 20%)
// 이러한 백엔드를 사용하여 추적할 수 있도록 하려면 백엔드의 호스트를 지정해야 합니다.
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // 'example.com' 및 'api.example.com'과 같은 하위 도메인이 일치합니다.

await DdSdkReactNative.initialize(config);

// RUM용 Datadog React Native SDK가 초기화되면 보기 추적을 설정해야 RUM 대시보드에서 데이터를 볼 수 있습니다.
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // 사용자 상호 작용(예: 버튼 탭 등)을 추적
    true, // XHR 리소스 추적
    true // 오류 추적
);
config.site = 'EU1';
// 선택사항: 기본 충돌 보고서 사용 또는 사용 안 함
config.nativeCrashReportEnabled = true;
// 선택사항: 샘플 RUM 세션 (여기서는 세션의 80%가 Datadog로 전송됩니다. 기본값 = 100%)
config.sessionSamplingRate = 80;
// 선택사항: 앱과 백엔드 간의 네트워크 호출에 대한 샘플 추적 통합(여기서는 계측된 백엔드 호출의 80%가 RUM 보기에서 APM 보기로 연결됩니다. 기본값 = 20%)
// 이러한 백엔드를 사용하여 추적할 수 있도록 하려면 백엔드의 호스트를 지정해야 합니다.
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // 'example.com' 및 'api.example.com'과 같은 하위 도메인과 일치합니다.

await DdSdkReactNative.initialize(config);

// RUM용 Datadog React Native SDK가 초기화되면 보기 추적을 설정해야 RUM 대시보드에서 데이터를 볼 수 있습니다.
```

{{< /site-region >}}

{{< site-region region="gov" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // 사용자 상호 작용(예: 버튼 탭 등)을 추적
    true, // XHR 리소스 추적
    true // 오류 추적
);
config.site = 'US1_FED';
// 선택사항: 기본 충돌 보고서 사용 또는 사용 안 함
config.nativeCrashReportEnabled = true;
// 선택사항: 샘플 RUM 세션 (여기서는 세션의 80%가 Datadog로 전송됩니다. 기본값 = 100%)
config.sessionSamplingRate = 80;
// 선택사항: 앱과 백엔드 간의 네트워크 호출에 대한 샘플 추적 통합(여기서는 계측된 백엔드 호출의 80%가 RUM 보기에서 APM 보기로 연결됩니다. 기본값 = 20%)
// 이러한 백엔드를 사용하여 추적할 수 있도록 하려면 백엔드의 호스트를 지정해야 합니다.
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // 'example.com' 및 'api.example.com'과 같은 하위 도메인과 일치합니다.

await DdSdkReactNative.initialize(config);

// RUM용 Datadog React Native SDK가 초기화되면 보기 추적을 설정해야 RUM 대시보드에서 데이터를 볼 수 있습니다.
```

{{< /site-region >}}

### 보고된 버전 재정의

기본적으로 Datadog React Native SDK는 `version`을 앱의 상용 버전(예: "1.2.44")으로 보고합니다.

Microsoft의 CodePush와 같은 Over The Air (OTA)  업데이트 공급자를 사용하는 경우 이 버전을 재정의하여 실행 중인 JavaScript 코드의 버전을 나타낼 수 있습니다.

Datadog은 `DdSdkReactNativeConfiguration` 개체에 `versionSuffix`를 사용하는 것을 권장합니다:

```js
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true
);

config.versionSuffix = 'codepush.3';
```

앱의 상용 버전이 "1.2.44"인 경우 Datadog에서 "1.2.44-codepush.3"으로 보고됩니다. 버전과 접미사 사이에 대시(`-`)가 자동으로 추가됩니다.

`version` 필드를 지정하여 버전을 완전히 재정의할 수도 있습니다. 그러나 소스 맵 및 기타 매핑 파일을 업로드할 때 지정한 것과 일치해야 하므로 올바르게 설정해야 합니다.

버전 필드 제한에 대한 자세한 내용은 [태그 설명서][15]를 참조하세요.

### 사용자 상호작용 추적

위의 코드 예시처럼 사용자 상호 작용 추적이 활성화된 경우, Datadog React Native SDK는 탭을 받은 컴포넌트부터 시작하여 컴포넌트의 계층 구조를 탐색하여 `dd-action-name` 프로퍼티를 찾습니다. 프로퍼티가 발견되면 보고된 액션의 이름으로 사용됩니다.

또는 `accessibilityLabel` 요소 프로퍼티를 사용하여 탭 액션에 이름을 지정할 수 있으며, 그렇지 않으면 요소 유형이 보고됩니다. 샘플 앱에서 사용 예시를 확인할 수 있습니다.

### 보기 탐색 추적

React Native는 화면 탐색을 만들 수 있는 다양한 라이브러리를 제공하기 때문에 기본적으로 수동 보기 추적만 지원됩니다. Datadog에서 RUM 세션이 입력되는 것을 보려면 보기 추적을 구현해야 합니다.

다음 `startView()`와 `stopView` 방법을 사용하여 보기를 수동으로 시작하고 중지할 수 있습니다.

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration,
    DdLogs,
    DdRum
} from '@datadog/mobile-react-native';

// 고유한 보기 식별자, 커스텀 보기 이름 및 보기에 추가 속성을 첨부할 개체를 사용하여 보기를 시작합니다.
DdRum.startView(
    '<view-key>', // <view-key> 은 고유해야 하며 예를 들어, ViewName-unique-id일 수 있음
    'View Name',
    { 'custom.foo': 'something' },
    Date.now()
);
// 동일한 고유 보기 식별자와 보기에 추가 속성을 연결하는 객체를 사용하여 이전에 시작한 보기를 중지합니다.
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

Datadog의 통합 중 하나를 사용하여 다음 라이브러리에 대한 보기를 자동으로 추적합니다:

-   [`react-native-navigation`][5] 라이브러리를 사용하는 경우 `@datadog/mobile-react-native-navigation` 패키지를 추가하고 [설정 지침서][6]을 따릅니다.
-   [`react-navigation`][7] 라이브러리를 사용하는 경우 `@datadog/mobile-react-navigation` 패키지를 추가하고 [설정 지침서][8]을 따릅니다.

`@datadog/mobile-react-navigation`과 함께 보기 추적을 설정하는 데 문제가 발생하면 [예제 애플리케이션][16]을 참조할 수 있습니다.

## 커스텀 속성 추적

모든 RUM 이벤트에 사용자 정보를 첨부하여 RUM 세션에서 보다 자세한 정보를 얻을 수 있습니다.

### 사용자 정보

사용자별 정보는 (SDK 초기화 후) 앱에서 원하는 곳에 다음 코드를 사용하세요. `id`, `name` 및 `email` 속성은 Datadog에 내장되어 있으며, 앱에 적합한 다른 속성을 추가할 수 있습니다.

```js
DdSdkReactNative.setUser({
    id: '1337',
    name: 'John Smith',
    email: 'john@example.com',
    type: 'premium'
});
```

사용자 정보를 지우려면(예: 사용자가 로그아웃할 때) 다음과 같이 빈 개체를 전달하면 됩니다:

```js
DdSdkReactNative.setUser({});
```

### 글로벌 속성

A/B 테스트 설정, 광고 캠페인 출처, 카트 상태 등 특정 세션에 대한 정보를 추적하기 위해 글로벌 속성을 유지할 수도 있습니다.

```js
DdSdkReactNative.setAttributes({
    profile_mode: 'wall',
    chat_enabled: true,
    campaign_origin: 'example_ad_network'
});
```

## 백그라운드 이벤트 추적

<div class="alert alert-info"><p>백그라운드 이벤트 추적으로 인해 추가 세션이 발생하여 빌링에 추가될 수 있습니다. 자세한 내용은 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀에 문의하세요.</a></p>
</div>

애플리케이션이 백그라운드에 있을 때(예: 활성 보기를 사용할 수 없는 경우) 충돌 및 네트워크 요청과 같은 이벤트를 추적할 수 있습니다.

Datadog 설정에서 초기화하는 동안 다음 스니펫을 추가합니다:

```javascript
configuration.trackBackgroundEvents = true;
```

## 데이터 저장 공간

### Android

데이터가 Datadog에 업로드되기 전에, 데이터는 애플리케이션의 캐시 디렉토리에 일반 텍스트로 저장됩니다. 이 캐시 폴더는 [Android의 애플리케이션 샌드박스][10]에 의해 보호되므로, 대부분의 기기에서 다른 애플리케이션이 이 데이터를 읽을 수 없습니다. 그러나 모바일 디바이스가 루팅되었거나 누군가 Linux 커널을 템퍼링하는 경우 저장된 데이터를 읽을 수도 있습니다.

### iOS

데이터가 Datadog에 업로드되기 전 [애플리케이션 샌드박스][11]의 캐시 디렉토리(`Library/Caches`)에 일반텍스트로 저장되어 디바이스에 설치된 다른 앱으로는 읽을 수 없습니다.

## 개발 모드

개발 모드에서 애플리케이션은 코드 변환 오류 및 로컬 개발 서버에 대한 요청과 같은 React Native 툴링과 관련된 추가 이벤트를 제출할 수 있습니다.

대시보드에 이러한 이벤트가 표시되지 않도록 하려면 `__DEV__` 플래그를 사용하여 개발 모드에서 오류 및 리소스 추적을 사용하지 않도록 설정할 수 있습니다:

```js
const config = new DdSdkReactNativeConfiguration(
    CLIENT_TOKEN,
    ENVIRONMENT,
    APPLICATION_ID,
    true,
    !__DEV__  /* trackResources는 DEV 모드에서는 false가 되고 그렇지 않으면 true가 됩니다 */,
    !__DEV__  /* trackErrors는 DEV 모드에서는 false가 되고 그렇지 않으면 true가 됩니다 */,
    trackingConsent
)
```

## 문제 해결

### `use_frameworks!`와 함께 사용

`Podfile`에서 `use_frameworks!`를 활성화했다면 SDK 추가 후 `pod install` 실행 시 다음과 같은 오류가 발생할 수 있습니다:

```shell
The 'Pods-MyApp' target has transitive dependencies that include statically linked binaries: (DatadogSDKBridge, DatadogSDKCrashReporting)
```

이 오류를 방지하려면 `Podfile`을 편집하여 React Native SDK 포드를 정적 라이브러리로 설치합니다:

```ruby
static_libraries = ['DatadogSDKReactNative']

# static_framework? 함수를 재정의하고 true를 반환하여 정적 종속성이 있는 포드를 정적 라이브러리로 변경
pre_install do |installer|
  installer.pod_targets.each do |pod|
    if static_libraries.include?(pod.name)
      def pod.static_framework?;
        true
      end
      def pod.build_type;
        Pod::BuildType.static_library
      end
    end
  end
end
```

**참고**: 이 솔루션은 이 [StackOverflow][14] 게시물에서 가져온 것입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-reactnative/main/docs/image_reactnative.png
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: /ko/account_management/api-app-keys/#client-tokens
[5]: https://github.com/wix/react-native-navigation
[6]: /ko/real_user_monitoring/reactnative/integrated_libraries/
[7]: https://github.com/react-navigation/react-navigation
[8]: /ko/real_user_monitoring/reactnative/integrated_libraries/
[9]: https://github.com/DataDog/dd-sdk-reactnative/blob/main/LICENSE
[10]: https://source.android.com/security/app-sandbox
[11]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[12]: https://docs.expo.dev/
[13]: /ko/real_user_monitoring/reactnative/expo/
[14]: https://stackoverflow.com/questions/37388126/use-frameworks-for-only-some-pods-or-swift-pods/60914505#60914505
[15]: /ko/getting_started/tagging/#define-tags
[16]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation