---
aliases:
- /ko/real_user_monitoring/react-native/advanced_configuration/
- /ko/real_user_monitoring/reactnative/advanced_configuration/
code_lang: 리액티브
code_lang_weight: 40
description: React Native 설정을 위한 고급 설정 옵션에 대해 알아보세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: 소스 코드
  text: dd-sdk-reactnative를 위한 소스 코드
- link: real_user_monitoring/reactnative/
  tag: 설명서
  text: React Native 모니터링에 대해 알아보기
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: 설명서
  text: 하이브리드 React Native 애플리케이션 모니터링
title: RUM React Native 고급 설정
type: multi-code-lang
---

## 개요

SDK를 아직 설정하지 않은 경우 [앱 내 설정 지침서][1]를 따르거나 [React Native RUM 설정 설명서][2]를 참조하세요.

## Jest로 테스트하기

네이티브 모듈은 테스트 환경에서 존재하지 않기 때문에 `'@datadog/mobile-react-native'`를 사용하여 앱을 테스트하려면 추가 단계를 완료해야 할 수 있습니다.

Datadog은 `'@datadog/mobile-react-native'` 패키지에 대한 가짜 객체를 제공합니다. [Jest][4]와 함께 사용하려면 Jest 설정 파일에 다음을 추가합니다:

```javascript
jest.mock('@datadog/mobile-react-native', () => {
    return require('@datadog/mobile-react-native/jest/mock');
});
```

`DatadogProvider` 구성 요소로 SDK를 초기화하면 테스트에서 상호 작용, 오류 및 리소스 자동 추적이 비활성화됩니다.

`jest.fn()`에 의해 모든 SDK 방식이 모킹되므로 Datadog SDK 방식이 호출되었다고 주장할 수 있습니다:

```javascript
import { DdLogs } from '@datadog/mobile-react-native';

describe('App', () => {
    it('calls DdLogs.debug on mount', () => {
        renderer.create(<App />);
        expect(DdLogs.debug).toHaveBeenCalledWith('app started');
    });
});
```

Jest 이외의 테스트 러너를 사용하는 경우 테스트 러너에 대한 가짜 객체를 생성해야 합니다.

## 초기화 파라미터

SDK를 초기화할 때 설정에서 다음 파라미터를 지정할 수 있습니다:

`clientToken`
: 필수<br/>
**유형**: 문자열<br/>
[Datadog 클라이언트 토큰][8].

`env`
: 필수<br/>
**유형**: 문자열<br/>
애플리케이션의 환경(예: prod, pre-prod, staging). [태그 구문 요건][15]을 따릅니다.

`applicationId`
: 필수<br/>
**유형**: 문자열<br/>
RUM 애플리케이션 ID.

`trackInteractions`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/> 
사용자 액션 자동 수집 활성화

`trackResources`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `false` <br/>
리소스 이벤트 수집 활성화.

`trackErrors`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/> 
React Native 충돌 수집 활성화

`site`
: 선택 사항<br/>
**유형**: 문자열<br/>
**기본값**: `US1`<br/>
[조직의 Datadog 사이트 파라미터][9].

`serviceName`
: 선택 사항<br/>
**유형**: 문자열<br/>
애플리케이션 서비스 이름. [태그 구문 요건][15]을 따릅니다.

`version`
: 선택 사항<br/>
**유형**: 문자열<br/>
애플리케이션 버전(예: 1.2.3, 6c44da20, 2020.02.13). [태그 구문 요건][15]을 따릅니다.

`versionSuffix`
: 선택 사항<br/>
**유형**: 문자열<br/>
보고된 버전의 앱에 접미사를 추가합니다. 허용되는 문자는 영숫자이며, 버전과 접미사 사이에 자동으로 `_`,`-`, `:`, `.`, `/`. Other special characters are converted to underscores. A dash (`-`) 가 추가됩니다. [태그 구문 요건][15]을 따릅니다.

`trackFrustrations`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `true` <br/>
[사용자 좌절 자동 수집][11]을 활성화합니다. 오류 탭만 지원되며,`trackInteractions: true`를 포함합니다.

`nativeCrashReportEnabled`
: 선택 사항<br/>
**Type**: 부울<br/>
**Default**: `false` <br/>
기본 플랫폼(iOS, Android)에 관한 크래시 보고를 활성화합니다.

`sampleRate`
: 선택 사항 - **더 이상 사용되지 않음**<br/>
**유형**: 숫자<br/>
**기본값**: `100`<br/>
`sessionSampleRate`를 확인하세요.

`sessionSampleRate`
: 선택사 항<br/>
**유형**: 숫자<br/>
**기본값**:`100` <br/>
추적하는 세션의 비율: 모두는 `100`이고 없음은 `0`입니다. 추적하는 세션만 RUM 이벤트를 보냅니다.

`resourceTracingSamplingRate`
: 선택 사항<br/>
**유형**: 숫자<br/>
**기본값**: `20`<br/>
추적 요청의 백분율: 모두 `100`이고 없음은 `0`입니다. 자세한 내용은 [RUM과 트레이스 연결][12]을 참조하세요.

`verbosity`
: 선택 사항<br/>
**유형**: SdkVerbosity<br/>
**기본값**: `undefined`<br/>
내부 SDK 로깅에 대한 상세도입니다. SDK 구현을 디버깅하도록 `SdkVerbosity.DEBUG`로 설정합니다.

`nativeViewTracking`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/>
기본 보기 추적을 활성화합니다. 기본 보기에 의존하는 커스텀 네비게이션 시스템을 사용하는 경우 `true`로 설정합니다.

`nativeInteractionTracking`
: 선택사 항<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/>
기본 상호작용 추적을 활성화합니다. 기본 화면에서 상호작용을 추적하려면 `true`로 설정합니다.

`firstPartyHosts`
: 선택 사항<br/>
**Type**: 목록<br/>
**Default**: `[]`<br/>
추적을 활성화할 백엔드 호스트 목록입니다. 자세한 내용은 [RUM과 추적 연결하기][12]를 참조하세요.

`telemetrySampleRate`
: 선택 사항<br/>
**유형**: 숫자<br/>
**기본값**: `20`<br/>
잠재적인 문제를 감지하고 해결하기 위해 SDK 실행에 대한 텔레메트리 데이터(예: 오류 및 디버그 로그)가 Datadog으로 전송됩니다. 텔레메트리 수집을 거부하려면 이 옵션을 `0`으로 설정하세요.

`longTaskThresholdMs`
: 선택 사항<br/>
**유형**: 숫자 | 거짓<br/>
**기본값**: `0`<br/>
밀리초 단위로 보고되는 JavaScript 긴 작업의 임계값입니다. `0` 또는 `false`로 설정하면 JavaScript 긴 작업 보고가 비활성화됩니다. `100` 미만 값은 `100`으로 오르고 `5000` 이상 값은 `5000`으로 낮아집니다.

`nativeLongTaskThresholdMs`
: 선택 사항<br/>
**유형**: 숫자 | 거짓<br/>
**기본값**: `200`<br/>
밀리초 단위로 보고되는 기본 긴 작업의 임계값입니다. `0` 또는 `false`로 설정하면 JavaScript 의 긴 작업 보고를 비활성화합니다. `100`미만 값은 `100`으로 오르고 `5000`이상 값은 `5000`으로 낮아집니다.

`vitalsUpdateFrequency`
: 선택 사항<br/>
**유형**: VitalsUpdateFrequency<br/>
**기본값**: `VitalsUpdateFrequency.AVERAGE`<br/>
모바일 바이탈을 수집할 때 선호하는 빈도를 설정합니다.

`uploadFrequency`
: 선택 사항<br/>
**유형**: UploadFrequency<br/>
**기본값**: `UploadFrequency.AVERAGE`<br/>
데이터 배치를 업로드할 때 선호하는 빈도를 설정합니다.

`batchSize`
: 선택 사항<br/>
**유형**: BatchSize<br/>
**기본값**: `BatchSize.MEDIUM`<br/>
데이터를 Datadog 서버에 업로드하기 전에 데이터를 일괄 처리할 때 Datadog SDK 정책을 정의합니다. 작은 배치는 더 작지만 더 많은 네트워크 요청을 의미하고 큰 배치는 더 적지만 더 큰 네트워크 요청을 의미합니다.

`trackBackgroundEvents`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/>
RUM 보기가 활성화되지 않은 경우 RUM 이벤트 추적을 활성화합니다. 기본적으로 백그라운드 이벤트는 추적되지 않습니다. 이 기능을 활성화하면 추적되는 세션 수가 증가하고 빌링에 영향을 미칠 수 있습니다.

`proxyConfig`
: 선택 사항<br/>
**Type**: 프록시 구성<br/>
선택적 [프록시 구성][13].

`useAccessibilityLabel`
: 선택 사항<br/>
**Type**: 부울<br/>
**Default**: `true`<br/>
접근성 레이블을 사용하여 RUM 작업의 이름을 지정할지 여부를 결정합니다(기본값은 참).

`bundleLogsWithRum`
: 선택 사항<br/>
**Type**: 부울<br/>
**Default**: `true`<br/>
로그와의 RUM 상관관계를 활성화합니다(기본값은 참).

`bundleLogsWithTraces`
: 선택 사항<br/>
**Type**:: 부울<br/>
**Default**: `true`<br/>
로그와 트레이스 상관관계를 활성화합니다(기본값은 참).

## 수동 계측

자동 계측이 필요에 맞지 않을 경우, RUM 이벤트 및 로그를 수동으로 생성할 수 있습니다:

### 로그 전송
코드를 계측하여 로그를 전송하는 경우 디버그, 정보, 경고, 또는 오류 세부 정보를 포함할 수 있습니다.

```javascript
DdLogs.debug('Lorem ipsum dolor sit amet...', {});
DdLogs.info('Lorem ipsum dolor sit amet...', {});
DdLogs.warn('Lorem ipsum dolor sit amet...', {});
DdLogs.error('Lorem ipsum dolor sit amet...', {});
```

### RUM Views 수동 추적
RUM Views를 수동으로 추적하려면 초기화 시 `view key`, `view name`, `action name`을 제공합니다. 필요에 따라 다음 전략 중 하나를 선택할 수 있습니다.

```javascript
DdRum.startView('<view-key>', 'View Name', {}, Date.now());
//...
DdRum.stopView('<view-key>', { custom: 42 }, Date.now());
```

### RUM Actions 수동 추적
RUM 작업을 수동으로 추적할 수 있습니다.

```javascript
DdRum.addAction(RumActionType.TAP, 'action name', {}, Date.now());
```

지속적 작업을 추적하려면,

```javascript
DdRum.startAction(RumActionType.TAP, 'action name', {}, Date.now());
//...
DdRum.stopAction({}, Date.now());
```

### RUM Errors 수동 추적
RUM 오류를 수동으로 추적할 수 있습니다.

```javascript
DdRum.addError('<message>', ErrorSource.SOURCE, '<stacktrace>', {}, Date.now());
```

### RUM Resources 수동 추적
RUM 리소스를 수동으로 추적할 수 있습니다.

```javascript
DdRum.startResource('<res-key>', 'GET', 'http://www.example.com/api/v1/test', {}, Date.now());
//...
DdRum.stopResource('<res-key>', 200, 'xhr', (size = 1337), {}, Date.now());
```

### 사용자 지정 타이밍 추가
사용자 지정 타이밍을 추가할 수 있습니다.

```javascript
DdRum.addTiming('<timing-name>');
```

### 수동 스팬 전송
수동으로 스팬을 전송할 수 있습니다.

```javascript
const spanId = await DdTrace.startSpan('foo', { custom: 42 }, Date.now());
//...
DdTrace.finishSpan(spanId, { custom: 21 }, Date.now());
```

## 커스텀 글로벌 속성 추적

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

사용자 정보를 추가하거나 업데이트하려는 경우 다음 코드를 사용하여 기존 사용자의 세부 정보를 수정할 수 있습니다.

```js
DdSdkReactNative.addUserExtraInfo({
    hasPaid: 'true'
});
```

사용자 정보를 지우려면(예: 사용자가 로그아웃할 때) 다음과 같이 빈 개체를 전달하면 됩니다:

```js
DdSdkReactNative.setUser({});
```

### 전역 속성

A/B 테스트 설정, 광고 캠페인 출처, 카트 상태 등 특정 세션에 대한 정보를 추적하기 위해 글로벌 속성을 유지할 수도 있습니다.

```js
DdSdkReactNative.setAttributes({
    profile_mode: 'wall',
    chat_enabled: true,
    campaign_origin: 'example_ad_network'
});
```

## 모든 데이터 삭제

Datadog로 전송되지 않은 모든 데이터를 지우려면 `clearAllData`를 사용합니다.

```js
DdSdkReactNative.clearAllData();
```

## RUM 이벤트 수정 또는 삭제

RUM 이벤트가 Datadog으로 전송되기 전에 해당 특성을 수정하거나 이벤트를 완전히 삭제하려면 RUM React Native SDK를 설정할 때 Event Mappers API를 사용합니다:

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // 사용자 상호 작용(예: 버튼 탭 등) 추적
    true, // XHR 리소스 추적
    true // 오류 추적
);
config.logEventMapper = (event) => event;
config.errorEventMapper = (event) => event;
config.resourceEventMapper = (event) => event;
config.actionEventMapper = (event) => event;
```

각 맵퍼는 시그니처가 `(T) -> T?`인 함수이며, 여기서 `T`는 구체적인 RUM 이벤트 유형입니다. 이렇게 하면 이벤트가 전송되기 전에 이벤트의 일부를 변경하거나 이벤트를 완전히 삭제할 수 있습니다.

예를 들어, RUM 오류 `message`에서 민감한 정보를 삭제하려면 커스텀 `redacted` 함수를 실행하고`errorEventMapper`에서 사용합니다:

```javascript
config.errorEventMapper = (event) => {
    event.message = redacted(event.message);
    return event;
};
```

오류, 리소스 또는 액션 맵퍼에서 `null`을 반환하면 이벤트가 완전히 삭제됩니다. 이벤트는 Datadog으로 전송되지 않습니다.

이벤트 유형에 따라 일부 특정 프로퍼티만 수정할 수 있습니다:

| 이벤트 유형    | 속성 키            | 설명                        |
| ------------- | ------------------------ | ---------------------------------- |
| LogEvent      | `logEvent.message`       | 로그 메시지.                |
|               | `logEvent.context`       | 로그의 커스텀 속성.      |
| ActionEvent   | `actionEvent.context`    | 액션의 커스텀 속성.   |
| ErrorEvent    | `errorEvent.message`     | 오류 메시지.                     |
|               | `errorEvent.source`      | 오류 소스.               |
|               | `errorEvent.stacktrace`  | 오류의 스택 트레이스.           |
|               | `errorEvent.context`     | 오류의 커스텀 속성.    |
|               | `errorEvent.timestampMs` | 오류의 타임스탬프.            |
| ResourceEvent | `resourceEvent.context`  | 리소스의 커스텀 속성. |

이벤트는 추가 컨텍스트를 포함합니다:

| 이벤트 유형    | 컨텍스트 속성 키                            | 설명                                                             |
| ------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| LogEvent      | `logEvent.additionalInformation.userInfo`        | `DdSdkReactNative.setUser`가 설정한 글로벌 사용자 정보를 포함합니다.        |
|               | `logEvent.additionalInformation.attributes`      | `DdSdkReactNative.setAttributes`가 설정한 글로벌 속성을 포함합니다. |
| ActionEvent   | `actionEvent.actionContext`                      | 액션 또는 `undefined`에 해당하는 [GestureResponderEvent][5] 입니다.  |
|               | `actionEvent.additionalInformation.userInfo`     | `DdSdkReactNative.setUser`가 설정한 글로벌 사용자 정보를 포함합니다.        |
|               | `actionEvent.additionalInformation.attributes`   | `DdSdkReactNative.setAttributes`가 설정한 글로벌 속성을 포함합니다. |
| ErrorEvent    | `errorEvent.additionalInformation.userInfo`      | `DdSdkReactNative.setUser`가 설정한 글로벌 사용자 정보를 포함합니다.        |
|               | `errorEvent.additionalInformation.attributes`    | `DdSdkReactNative.setAttributes`가 설정한 글로벌 속성을 포함합니다. |
| ResourceEvent | `resourceEvent.resourceContext`                  | 리소스 또는 `undefined`에 해당하는 [XMLHttpRequest][6] 입니다.       |
|               | `resourceEvent.additionalInformation.userInfo`   | `DdSdkReactNative.setUser`가 설정한 글로벌 사용자 정보를 포함합니다.        |
|               | `resourceEvent.additionalInformation.attributes` | `DdSdkReactNative.setAttributes`가 설정한 글로벌 속성을 포함합니다. |

## RUM 세션 ID 검색

RUM 세션 ID를 검색하면 문제 해결에 도움이 될 수 있습니다. 예를 들어 지원 요청, 이메일 또는 버그 보고서에 세션 ID를 첨부하면 나중에 지원 팀이 Datadog에서 사용자 세션을 찾을 수 있습니다.

`sessionStarted` 이벤트를 기다리지 않고 런타임 중에 RUM 세션 ID에 액세스할 수 있습니다.

```kotlin
   fun getCurrentSessionId(promise: Promise) {
       datadog.getRumMonitor().getCurrentSessionId {
           promise.resolve(it)
        }
    }
```

## 리소스 타이밍

리소스 추적은 다음과 같은 타이밍을 제공합니다:

-   `First Byte`: 예약된 요청과 응답의 첫 번째 바이트 사이의 시간입니다. 이 시간에는 네이티브 수준의 요청 준비 시간, 네트워크 지연 시간, 서버가 응답을 준비하는 데 걸린 시간이 포함됩니다.
-   `Download`: 응답을 받는 데 걸린 시간입니다.

## 비동기적으로 초기화하기

앱이 시작될 때 많은 애니메이션이 포함되어 있는 경우, 이러한 애니메이션 중에 코드를 실행하면 일부 기기에서 애니메이션이 실행되는 것이 지연될 수 있습니다. 현재 모든 애니메이션이 시작된 후에 RUM용 Datadog React Native SDK 가 실행되도록 지연하려면 설정에서 `initializationMode`를 `InitializationMode.ASYNC`로 설정합니다:

```js
import { DatadogProvider, DatadogProviderConfiguration, InitializationMode } from '@datadog/mobile-react-native';

const datadogConfiguration = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true
);
datadogConfiguration.initializationMode = InitializationMode.ASYNC;

export default function App() {
    return (
        <DatadogProvider configuration={datadogConfiguration}>
            <Navigation />
        </DatadogProvider>
    );
}
```

React Native의 [InteractionManager.runAfterInteractions][3]를 사용하여 애니메이션을 지연시킵니다.

RUM SDK와의 모든 상호 작용(보기 추적, 액션, 리소스 추적 등)은 기록되고 100개의 이벤트 제한이 있는 대기열에 보관됩니다.

로그는 기록되지 않으며 실제 초기화 전에 `DdLogs` 메서드를 호출하면 로깅이 중단될 수 있습니다.

Datadog의 비동기 초기화를 설정하는 데 문제가 발생할 경우, [예제 애플리케이션][7]을 확인하세요.

## 초기화 지연

SDK를 초기화하기 전에 기다려야 하는 상황이 있을 수 있습니다. 예를 들어 사용자 역할에 따라 다른 구성을 사용하거나 서버 중 하나에서 구성을 가져오고자 하는 경우입니다.

이 경우 처음부터 앱을 자동 계측하고(사용자 상호작용, XHR 리소스 및 오류를 자동으로 수집) SDK를 초기화하기 전에 최대 100개의 RUM 및 스팬 이벤트를 기록할 수 있습니다.

```js
import { DatadogProvider, DatadogProviderConfiguration } from '@datadog/mobile-react-native';

const datadogAutoInstrumentation = {
    trackErrors: true,
    trackInteractions: true,
    trackResources: true,
    firstPartyHosts: [''],
    resourceTracingSamplingRate: 100
};

const initializeApp = async () => {
    const configuration = await fetchDatadogConfiguration(); // 서버 중 하나에서 구성을 가져옵니다.
    await DatadogProvider.initialize(configuration);
};

export default function App() {
    useEffect(() => initializeApp(), []);

    return (
        <DatadogProvider configuration={datadogAutoInstrumentation}>
            <Navigation />
        </DatadogProvider>
    );
}
```

설정에 다음과 같은 키가 있는 경우:

```js
import { ProxyConfig, SdkVerbosity, TrackingConsent } from '@datadog/mobile-react-native';

const configuration = {
    clientToken: '<CLIENT_TOKEN>',
    env: '<ENVIRONMENT_NAME>',
    applicationId: '<RUM_APPLICATION_ID>',
    sessionSamplingRate: 80, // 선택 사항: RUM 세션 샘플링(여기서는 세션의 80%가 Datadog으로 전송됩니다). Default = 100%
    site: 'US1', // 선택 사항: Datadog 사이트를 지정합니다. Default = 'US1'
    verbosity: SdkVerbosity.WARN, // 선택 사항: SDK가 내부 로그를 출력하도록 설정할 수 있습니다 (제공된 수준 이상). Default = undefined (no logs)
    serviceName: 'com.myapp', // Optional: set the reported service name. Default = package name / bundleIdentifier of your Android / iOS app respectively
    nativeCrashReportEnabled: true, // 선택 사항: 네이티브 충돌 리포트를 활성화합니다. Default = false
    version: '1.0.0', // 선택 사항: 보고되는 버전 재정의 방법은 문서를 참조하세요. Default = VersionName / Version of your Android / iOS app respectively
    versionSuffix: 'codepush.v3', // 선택 사항: 보고되는 버전 재정의 방법은 문서를 참조하세요. Default = undefined
    trackingConsent: TrackingConsent.GRANTED, // Optional: disable collection if user has not granted consent for tracking. Default = TrackingConsent.GRANTED
    nativeViewTracking: true, // 선택 사항: 네이티브 뷰 추적을 활성화합니다. Default = false
    proxyConfig: new ProxyConfig() // 선택 사항: 프록시를 통해 요청을 전송합니다. Default = undefined
};
```

## 하이브리드 React Native 애플리케이션 모니터링

[하이브리드 리액트 네이티브 애플리케이션 모니터링][16]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/real_user_monitoring/reactnative
[3]: https://reactnative.dev/docs/interactionmanager#runafterinteractions
[4]: https://jestjs.io/
[5]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/v0.70/index.d.ts#L548
[6]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[7]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-async
[8]: /ko/account_management/api-app-keys/#client-tokens
[9]: /ko/getting_started/site/
[11]: /ko/real_user_monitoring/browser/frustration_signals/
[12]: /ko/real_user_monitoring/platform/connect_rum_and_traces?tab=reactnativerum
[13]: /ko/real_user_monitoring/guide/proxy-mobile-rum-data/
[15]: /ko/getting_started/tagging/#define-tags
[16]: /ko/real_user_monitoring/guide/monitor-hybrid-react-native-applications