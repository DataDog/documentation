---
aliases:
- /ko/real_user_monitoring/react-native/advanced_configuration/
- /ko/real_user_monitoring/reactnative/advanced_configuration/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/setup/react_native/
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
title: React Native 고급 구성
---

## 개요

SDK를 아직 설정하지 않은 경우 [앱 내 설정 지침서][1]를 따르거나 [React Native RUM 설정 설명서][2]를 참조하세요.

## Jest로 테스트하기

네이티브 모듈은 테스트 환경에서 존재하지 않기 때문에 `'@datadog/mobile-react-native'`를 사용하여 앱을 테스트하려면 추가 단계를 완료해야 할 수 있습니다.

Datadog은 `'@datadog/mobile-react-native'` 패키지의 mock을 제공합니다. 이를 [Jest][3]와 함께 사용하려면, Jest 설정 파일에 다음 내용을 추가하세요.

```javascript
jest.mock('@datadog/mobile-react-native', () => {
  return require('@datadog/mobile-react-native/jest')
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
[Datadog 클라이언트 토큰][4].

`env`
: 필수<br/>
**유형**: 문자열<br/>
애플리케이션의 환경(예: prod, pre-prod, staging)을 의미합니다. [태그 구문 요건][5]을 준수해야 합니다.

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
: 옵션<br/>
**유형**: 문자열<br/>
**기본값**: `US1`<br/>
[조직의 Datadog 사이트 파라미터][6].

`serviceName`
: 옵션<br/>
**유형**: 문자열<br/>
애플리케이션의 서비스 이름입니다. [태그 구문 요건][5]을 따르세요.

`version`
: 옵션<br/>
**유형**: 문자열<br/>
애플리케이션의 버전입니다. 예: 1.2.3, 6c44da20, 2020.02.13. [태그 구문 요건][5]을 준수해야 합니다.

`versionSuffix`
: 옵션<br/>
**유형**: 문자열<br/>
앱에 보고되는 버전에 접미사를 추가합니다. 허용되는 문자는 영숫자와 `_`, `-`, `:`, `.`, `/`입니다. 그 외의 특수 문자는 밑줄(_)로 변환됩니다. 버전과 접미사 사이에는 대시(`-`)가 자동으로 추가됩니다. [태그 구문 요건][5]을 준수해야 합니다.

`trackFrustrations`
: 옵션<br/>
**유형**: 부울<br/>
**기본값**: `true` <br/>
[사용자 불편 자동 수집][7] 기능을 활성화합니다. 현재는 오류 탭만 지원됩니다. `trackInteractions: true`를 의미합니다.

`nativeCrashReportEnabled`
: 선택 사항<br/>
**Type**: 부울<br/>
**Default**: `false` <br/>
기본 플랫폼(iOS, Android)에 대한 크래시 보고를 활성화합니다.

`sampleRate`
: 선택 사항 - **더 이상 사용되지 않음**<br/>
**유형**: 숫자<br/>
**기본값**: `100`<br/>
`sessionSampleRate`를 확인하세요.

`sessionSamplingRate`
: 선택 사항<br/>
**유형**: 숫자<br/>
**기본값**: `100`<br/>
추적할 세션의 비율입니다. 전체는 `100`, 없음은 `0`입니다. 추적된 세션만 RUM 이벤트를 전송합니다.

`resourceTracingSamplingRate`
: 선택 사항<br/>
**유형**: 숫자<br/>
**기본값**: `20`<br/>
트레이싱할 요청의 비율. 전체는 `100`, 없음은 `0`입니다. 자세한 내용은 [RUM 및 트레이스 연결][8]을 참조하세요.

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
**유형**: List<br/>
**기본값**: `[]`<br/>
트레이싱을 활성화할 백엔드 호스트 목록입니다. 자세한 내용은 [RUM 및 트레이스 연결][8]을 참조하세요.

`telemetrySampleRate`
: 선택 사항<br/>
**유형**: 숫자<br/>
**기본값**: `20`<br/>
잠재적인 문제를 감지하고 해결하기 위해 SDK 실행에 대한 텔레메트리 데이터(예: 오류 및 디버그 로그)가 Datadog으로 전송됩니다. 텔레메트리 수집을 거부하려면 이 옵션을 `0`으로 설정하세요.

`longTaskThresholdMs`
: 선택 사항<br/>
**유형**: Number | false<br/>
**기본값**: `0`<br/>
JavaScript long task 보고를 위한 임계값(밀리초 단위)입니다. `0` 또는 `false`로 설정하면 JavaScript long task 보고가 비활성화됩니다. `100` 미만의 값은 `100`으로 상향 조정되며, `5000`을 초과하는 값은 `5000`으로 하향 조정됩니다.

`nativeLongTaskThresholdMs`
: 선택 사항<br/>
**유형**: Number | false<br/>
**기본값**: `200`<br/>
네이티브 롱 태스크 보고를 위한 임계값(밀리초 단위)입니다. `0` 또는 `false`로 설정하면 네이티브 롱 태스크 보고가 비활성화됩니다. `100` 미만의 값은 `100`으로 상향 조정되며, `5000`을 초과하는 값은 `5000`으로 하향 조정됩니다.

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
:옵션<br/>
**유형**: ProxyConfiguration<br/>
선택적 [프록시 구성][9]입니다.

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
코드를 계측하여 로그를 전송하는 경우 디버그, 정보, 경고 또는 오류 세부 정보를 포함할 수 있습니다.

```javascript
DdLogs.debug('Lorem ipsum dolor sit amet...', {});
DdLogs.info('Lorem ipsum dolor sit amet...', {});
DdLogs.warn('Lorem ipsum dolor sit amet...', {});
DdLogs.error('Lorem ipsum dolor sit amet...', {});
```

### RUM 뷰 수동 추적
RUM Views를 수동으로 추적하려면 초기화 시 `view key`, `view name`, `action (작업) name`을 제공합니다. 필요에 따라 다음 전략 중 하나를 선택할 수 있습니다.

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

### 뷰 로딩이 완료되었음을 SDK에 알립니다

`DdRum`에서 `addViewLoadingTime` 메서드를 호출하여 뷰 로딩이 완료되었음을 SDK에 알릴 수 있습니다.
뷰가 완전히 로드되어 사용자에게 표시할 준비가 되었을 때 이 메서드를 호출하세요.

```javascript
DdRum.addViewLoadingTime(true);
```

현재 뷰의 기존에 계산된 로딩 시간을 대체하려면 `overwrite` 파라미터를 사용하세요.

로딩 시간이 전송된 후에는 `@view.loading_time`로 접근할 수 있으며, RUM UI에서 확인할 수 있습니다.

**참고:** 이 API는 실험적 기능입니다.

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

### 사용자 세션 추적

RUM 세션에 사용자 정보를 추가하면 다음 작업을 쉽게 수행할 수 있습니다:
* 특정 사용자의 활동 경로를 추적합니다.
* 오류의 영향을 가장 많이 받는 사용자를 파악합니다.
* 가장 중요한 사용자를 위해 성능을 모니터링합니다.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI의 사용자 API" >}}

{{< tabs >}}
{{% tab "SDK version >= 2.6.5" %}}
<!-- source of truth: https://github.com/DataDog/dd-sdk-reactnative/pull/818 -->

| 속성   | 유형   | 설명                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | 문자열 | (필수) 고유 사용자 식별자입니다.                                              |
| `usr.name`  | 문자열 | (옵션) RUM UI에 기본적으로 표시되는 사용자 친화적인 이름입니다.              |
| `usr.email` | 문자열 | (옵션) 사용자 이메일로, 사용자 이름이 없는 경우 RUM UI에 표시됩니다. |
| `usr.extraInfo` | 개체 | (선택 사항) 구독 유형과 같은 사용자 정의 속성이나, RUM 세션에서 사용자 컨텍스트를 향상시키는 사용자 관련 정보를 포함합니다. |

사용자 세션을 식별하려면 다음과 같은 `setUserInfo` API를 사용합니다:

```js
DdSdkReactNative.setUserInfo({
    id: '1337',
    name: 'John Smith',
    email: 'john@example.com',
    extraInfo: {
        type: 'premium'
    }
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

{{% /tab %}}
{{% tab "Legacy" %}}

| 속성   | 유형   | 설명                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | 문자열 | (필수) 고유 사용자 식별자입니다.                                              |
| `usr.name`  | 문자열 | (옵션) RUM UI에 기본적으로 표시되는 사용자 친화적인 이름입니다.              |
| `usr.email` | 문자열 | (옵션) 사용자 이메일로, 사용자 이름이 없는 경우 RUM UI에 표시됩니다. |

사용자 세션을 식별하려면 예를 들어, `setUser` API를 사용합니다.

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

{{% /tab %}}
{{< /tabs >}}

### 전역 속성

A/B 테스트 설정, 광고 캠페인 출처, 카트 상태 등 특정 세션에 대한 정보를 추적하기 위해 글로벌 속성을 유지할 수도 있습니다.

```js
DdSdkReactNative.setAttributes({
    profile_mode: 'wall',
    chat_enabled: true,
    campaign_origin: 'example_ad_network'
});
```

## 보기 탐색 추적

React Native는 화면 내비게이션을 구성하기 위한 다양한 라이브러리를 제공하기 때문에, 기본적으로는 수동 추적 보기만 지원됩니다. Datadog에서 RUM 또는 Error Tracking 세션이 표시되도록 하려면 추적 보기를 구현해야 합니다.

다음 `startView()`와 `stopView` 방법을 사용하여 보기를 수동으로 시작하고 중지할 수 있습니다.

```js
import {
    DdRum
} from '@datadog/mobile-react-native';

// 고유한 뷰 식별자, 사용자 정의 뷰 이름, 추가 속성을 뷰에 연결하기 위한 객체를 사용하여 뷰를 시작합니다.
DdRum.startView(
    '<view-key>', // <view-key> has to be unique, for example it can be ViewName-unique-id
    'View Name',
    { 'custom.foo': 'something' },
    Date.now()
);
// 이전에 시작한 동일한 고유 뷰 식별자를 가진 뷰를 종료하고, 추가 속성을 뷰에 연결하기 위한 객체를 함께 전달합니다.
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

Datadog의 통합 중 하나를 사용하여 다음 라이브러리에 대한 보기를 자동으로 추적합니다.

-   [`react-native-navigation`][10] 라이브러리를 사용하는 경우, `@datadog/mobile-react-native-navigation` 패키지를 추가한 후 [설정 지침][11]을 따르세요.
-   [`react-navigation`][12] 라이브러리를 사용하는 경우, `@datadog/mobile-react-navigation` 패키지를 추가한 후 [설정 지침][11]을 따르세요.

`@datadog/mobile-react-navigation`을 사용한 View tracking 설정 중 문제가 발생한 경우, Datadog의 [예시 애플리케이션][13]을 참고할 수 있습니다.

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
| ActionEvent   | `actionEvent.actionContext`                      | 작업 또는 `undefined`에 해당하는 [GestureResponderEvent][14] |
|               | `actionEvent.additionalInformation.userInfo`     | `DdSdkReactNative.setUser`가 설정한 글로벌 사용자 정보를 포함합니다.        |
|               | `actionEvent.additionalInformation.attributes`   | `DdSdkReactNative.setAttributes`가 설정한 글로벌 속성을 포함합니다. |
| ErrorEvent    | `errorEvent.additionalInformation.userInfo`      | `DdSdkReactNative.setUser`가 설정한 글로벌 사용자 정보를 포함합니다.        |
|               | `errorEvent.additionalInformation.attributes`    | `DdSdkReactNative.setAttributes`가 설정한 글로벌 속성을 포함합니다. |
| ResourceEvent | `resourceEvent.resourceContext`                  | 리소스 또는 `undefined`에 해당하는 [XMLHttpRequest][15]      |
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

이는 애니메이션을 지연시키기 위해 React Native의 [InteractionManager.runAfterInteractions][16]를 사용합니다.

RUM SDK와의 모든 상호 작용(보기 추적, 액션, 리소스 추적 등)은 기록되고 100개의 이벤트 제한이 있는 대기열에 보관됩니다.

로그는 기록되지 않으며 실제 초기화 전에 `DdLogs` 메서드를 호출하면 로깅이 중단될 수 있습니다.

Datadog의 비동기 초기화 설정 중 문제가 발생한 경우, [예시 애플리케이션][17]을 참고할 수 있습니다.

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
    sessionSamplingRate: 80, // Optional: sample RUM sessions (here, 80% of session will be sent to Datadog). Default = 100%
    site: 'US1', // Optional: specify Datadog site. Default = 'US1'
    verbosity: SdkVerbosity.WARN, // Optional: let the SDK print internal logs (above or equal to the provided level). Default = undefined (no logs)
    serviceName: 'com.myapp', // Optional: set the reported service name. Default = package name / bundleIdentifier of your Android / iOS app respectively
    nativeCrashReportEnabled: true, // Optional: enable native crash reports. Default = false
    version: '1.0.0', // Optional: see overriding the reported version in the documentation. Default = VersionName / Version of your Android / iOS app respectively
    versionSuffix: 'codepush.v3', // Optional: see overriding the reported version in the documentation. Default = undefined
    trackingConsent: TrackingConsent.GRANTED, // Optional: disable collection if user has not granted consent for tracking. Default = TrackingConsent.GRANTED
    nativeViewTracking: true, // Optional: enables tracking of native views. Default = false
    proxyConfig: new ProxyConfig() // Optional: send requests through a proxy. Default = undefined
};
```

## 하이브리드 React Native 애플리케이션 모니터링

[하이브리드 React Native 애플리케이션 모니터링][18]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/real_user_monitoring/mobile_and_tv_monitoring/react_native
[3]: https://jestjs.io/
[4]: /ko/account_management/api-app-keys/#client-tokens
[5]: /ko/getting_started/tagging/#define-tags
[6]: /ko/getting_started/site/
[7]: /ko/real_user_monitoring/browser/frustration_signals/
[8]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm?tab=reactnativerum
[9]: /ko/real_user_monitoring/guide/proxy-mobile-rum-data/
[10]: https://github.com/wix/react-native-navigation
[11]: /ko/real_user_monitoring/mobile_and_tv_monitoring/react_native/integrated_libraries/
[12]: https://github.com/rmobile_and_tv_monitoring/eact-navigation/react-navigation
[13]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation
[14]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/683ec4a2b420ff6bd3873a7338416ad3ec0b6595/types/react-native-side-menu/index.d.ts#L2
[15]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[16]: https://reactnative.dev/docs/interactionmanager#runafterinteractions
[17]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-async
[18]: /ko/real_user_monitoring/guide/monitor-hybrid-react-native-applications