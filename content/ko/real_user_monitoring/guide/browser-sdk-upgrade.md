---
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: 탐색기에서 RUM 데이터 시각화
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: 블로그
  text: Datadog 세션 재생을 사용하여 실제 사용자 이동 경로 보기
kind: 가이드
title: RUM 브라우저 SDK 업그레이드
---

## 개요

주요 버전의 브라우저 RUM과 브라우저 로그 SDK 간에 마이그레이션하려면 이 가이드를 따르세요. 기능에 대한 자세한 내용은 [SDK 설명서][26]를 참조하세요.

## v4에서 v5로

V5에는 다음과 같은 변경 사항이 추가되었습니다:

- 세션 재생을 위한 새로운 설정 및 개인 정보 보호 기본 설정
- 좌절 신호 자동 수집
- 업데이트된 성능 메트릭
- 업데이트된 SDK 파라미터 및 API

SDK를 업그레이드할 때 다음 변경 사항을 참고하세요. 변경 사항은 영향을 받는 영역별로 그룹화됩니다.

### 일반

#### SDK 초기화 파라미터

** 조치 사항**: 더 이상 사용되지 않는 파라미터를 v5의 새로운 동등한 파라미터로 교체합니다. 이전 파라미터 이름은 더 이상 v5에서 사용할 수 없습니다.

| 더 이상 사용하지 않는 파라미터 이름 (v4 또는 이전) | 새 파라미터 이름 (v5) |
|-------------------------------------------|-------------------------|
| proxyUrl | proxy |
| sampleRate | sessionSampleRate |
| allowedTracingOrigins | allowedTracingUrls |
| tracingSampleRate | traceSampleRate |
| trackInteractions | trackUserInteractions |
| premiumSampleRate | sessionReplaySampleRate |
| replaySampleRate | sessionReplaySampleRate |

#### 공개 API

**조치 사항**: 더 이상 사용하지 않는 API를 새로운 동등한 API로 교체합니다. 기존 API는 버전 5에서 더 이상 사용할 수 없습니다.

| 사용하지 않는 파라미터 이름 (버전 4 이상) | 새 파라미터 이름 (v5) |
|-------------------------------------------|-------------------------|
| DD_RUM.removeUser | [DD_RUM.clearUser][7] |
| DD_RUM.addRumGlobalContext | [DD_RUM.setGlobalContextProperty][8] |
| DD_RUM.removeRumGlobalContext | [DD_RUM.removeGlobalContextProperty][9] |
| DD_RUM.getRumGlobalContext | [DD_RUM.getGlobalContext][10] |
| DD_RUM.setRumGlobalContext | [DD_RUM.setGlobalContext][11] |
| DD_LOGS.addLoggerGlobalContext | [DD_LOGS.setGlobalContextProperty][8] |
| DD_LOGS.removeLoggerGlobalContext | [DD_LOGS.removeGlobalContextProperty][9] |
| DD_LOGS.getLoggerGlobalContext | [DD_LOGS.getGlobalContext][12] |
| DD_LOGS.setLoggerGlobalContext | [DD_LOGS.setGlobalContext][13] |
| logger.addContext | [logger.setContextProperty][14] |
| logger.removeContext | [logger.removeContextProperty][15] |

#### 인테이크 도메인
버전 5는 이전 버전과 다른 인테이크 도메인으로 데이터를 전송합니다.

** 조치 사항**: [콘텐트 보안 정책(CSP)][18] `connect-src` 항목을 업데이트하여 새 도메인을 사용합니다.

| Datadog 사이트 | 도메인 |
|--------------|--------|
| US1 | `connect-src https://browser-intake-datadoghq.com` |
| US3 | `connect-src https://browser-intake-us3-datadoghq.com` |
| US5 | `connect-src https://browser-intake-us5-datadoghq.com` |
| EU1 | `connect-src https://browser-intake-datadoghq.eu` |
| US1-FED | `connect-src https://browser-intake-ddog-gov.com` |
| AP1 | `connect-src https://browser-intake-ap1-datadoghq.com` |

#### 신뢰할 수 있는 이벤트
부정확하거나 불법적인 데이터 수집을 피하기 위해 v5는 사용자 작업에 의해 생성된 이벤트만 수신하고 스크립트에 의해 생성된 이벤트는 무시합니다. 자세한 내용은 [신뢰할 수 있는 이벤트][19]를 참조하세요.

**조치 사항**: 프로그램 이벤트에 의존하고 SDK에서 이벤트를 고려하도록 하려면 아래와 같이 `__ddIsTrusted` 속성을 추가하세요.

```javascript
const click = new Event('click')
click.__ddIsTrusted = true
document.dispatchEvent(click)
```

** 조치 사항**: 자동화된 UI 테스트 환경과 같이 계획된 이벤트에 크게 의존하는 경우 `allowUntrustedEvents: true` 설정을 통해 신뢰할 수 없는 모든 이벤트를 허용할 수 있습니다.

#### `beforeSend` 반환 유형
`beforeSend` 콜백 함수는 부울 값을 반환해야 합니다:

```javascript
beforeSend(event: any, context?: any) => boolean
```

구현이 변경되지 않았습니다. 값이 반환되지 않으면 이벤트가 폐기되지 않습니다.

**조치 사항**: `beforeSend`가 이벤트를 유지하려면 `true`를, 버리려면 `false`를 반환해야 합니다. 이를 통해 관련 TypeScript 컴파일 오류가 해결됩니다.

### 세션 재생

#### 세션 재생 마스킹

기본 세션 재생 마스킹 설정 `defaultPrivacyLevel`이 `mask-user-input`에서 `mask`로 변경되었습니다. 이렇게 하면 기본적으로 세션 재생 녹화의 모든 데이터가 숨겨져 개인 정보를 보호할 수 있습니다. 자세한 내용은 [세션 재생 브라우저 개인 정보 보호 옵션][20]을 참조하세요.

**조치 사항**: 세션 재생에서 중요하지 않은 HTML 내용이나 사용자가 입력한 텍스트와 같이 마스킹되지 않은 데이터를 보려면 `defaultPrivacyLevel`을 `mask-user-input` 또는 `allow`로 설정합니다.

#### 세션 재생을 위해 샘플링된 세션의 자동 녹화
[`sessionReplaySampleRate`][21]을 사용하여 세션 재생을 위해 샘플링된 세션은 세션 시작 시 자동으로 기록됩니다. 즉, 녹음을 캡처하기 위해 [`startSessionReplayRecording()`][22] 메서드를 호출할 필요가 없습니다. 즉, 실수로 녹음 내용을 놓치는 일이 없습니다.

**조치 사항**: 이전 녹화 동작을 계속 사용하고 녹화 시작을 사용자에 맞게 설정하려면 `startSessionReplayRecordingManually`을 `true`로 설정합니다.

#### 세션이 녹화를 캡처하는 경우에만 세션 재생 비용을 지불합니다.
이전 SDK 버전에서는 샘플링 메커니즘을 통해 세션이 세션 재생 세션으로 결정됩니다. v5에서는 세션 중에 녹음이 캡처된 경우에만 세션이 세션 재생 세션으로 계산됩니다. 이렇게 하면 세션 재생 사용량을 더 쉽게 추적할 수 있습니다.

**별다른 조치 필요 없음**: 이 동작은 v5에서 자동으로 적용됩니다.

#### 기본 세션 재생 샘플링 속도
v5에서 기본값`sessionReplaySampleRate`은 100이 아니라 0입니다. 샘플링 속도를 포함하지 않으면 재생이 녹화되지 않습니다.

**조치 사항**: 세션 재생을 사용하려면 샘플링 속도를 `sessionReplaySampleRate: 100`와 함께 명시적으로 설정합니다(또는 다른 샘플링 속도).

### RUM

### APM 통합

OpenTelemetry의 지원 및 사용을 활성화하기 위해 기본 전파자 유형이 `datadog`과 더불어 `tracecontext`도 포함하도록 변경되었습니다.

**조치 사항**: `allowedTracingUrls` 초기화 파라미터에 원하는 전파자를 아직 지정하지 않은 경우, `traceparent` 헤더도 허용하도록 서버 Access-Control-Allow-Headers를 설정합니다. 자세한 내용은 [RUM 및 트레이스 연결][25]를 참조하세요.

### 세션 플랜 필드

세션 재생 변경 사항과 관련하여 `session.plan` 필드는 세션 이벤트에 대해서만 사용할 수 있습니다.

**조치 사항**: 저장한 모니터 또는 대시보드 쿼리를 업데이트하여 비세션 이벤트에 대한 `session.plan` 필드를 제외합니다.

#### 좌절 신호는 자동으로 수집
좌절 신호를 포함한 모든 사용자 상호 작용을 수집하도록 `trackUserInteractions: true`로 설정하기만 하면 됩니다. 더 이상 `trackFrustrations` 파라미터를 따로 설정할 필요가 없습니다.

**조치 사항**: 좌절 신호를 추적하려면 `trackUserInteractions: true`를 설정하세요. `trackFrustrations` 파라미터를 제거할 수 있습니다.

#### 동결된 페이지에 대한 리소스 기간이 생략됨
리소스 수집은 페이지가 백그라운드로 이동하여 연장된 리소스 기간을 생략합니다. 예를 들어, 페이지가 로드되는 동안 사용자가 별도의 탭을 클릭하는 경우입니다.

**별다른 조치 필요 없음**: 이 동작은 v5에서 자동으로 적용됩니다.

#### 리소스 및 긴 작업 추적
`replaySampleRate` 또는 `premiumSampleRate`(둘 다 사용되지 않음) 대신 `sessionReplaySampleRate`를 사용할 때는 리소스 및 긴 작업을 명시적으로 설정해야 합니다.

** 조치 사항**: 이러한 이벤트를 수집하려면 `trackResources` 및 `trackLongTasks`가 `true`로 설정되어 있는지 확인합니다.

#### 리소스 메서드 이름은 대문자임
대소문자(POST vs post)에 따라 동일한 메서드 이름에 대해 다른 값을 가지는 것을 방지하기 위해 메서드 이름은 대문자로 일관되게 전송됩니다.

**조치 사항**: 모니터 또는 대시보드 쿼리를 업데이트하여 `resource.method` 필드를 대문자 값으로 사용합니다.

#### `beforeSend` 액션 이벤트
`beforeSend` API를 통해 수집된 이벤트의 상황 정보에 액세스할 수 있습니다([RUM 데이터 강화 및 제어][23] 참조).

좌절 신호의 도입으로 액션 이벤트는 여러 DOM 이벤트와 연관될 수 있습니다.

이 업데이트와 함께 `context.event` 속성은 `context.events` 속성을 위해 제거되었습니다.

** 조치 사항**: `context.event` 대신 `context.events`를 사용할 `beforeSend` 코드를 업데이트합니다.

```javascript
beforeSend: (event, context) => {
  if (event.type === 'action' && event.action.type === 'click') {
    // accessing browser events related to the action event
    // before, single event: context.event
    // now, multiple events: context.events
  }
}
```

#### 포그라운드 기간에서의 `beforeSend`
`view.in_foreground_periods` 속성은 SDK가 전송하는 것이 아니라 백엔드에서 직접 생성됩니다.

** 조치 사항**: `beforeSend` 코드에서 `view.in_foreground_periods`를 제거합니다. 특정 사용 사례에 대해 이 속성에 의존하는 경우 [지원팀][24]에 문의하여 도움을 받으세요.

#### `beforeSend` 성능 항목
`beforeSend` 컨텍스트 `performanceEntry` 속성이 JSON 표현에서 업데이트되어 성능 항목 개체를 직접 포함합니다.

내보낸 `PerformanceEntryRepresentation` 유형이 표준 `PerformanceEntry` 유형을 위해 제거되었습니다.

**조치 사항**: `beforeSend` 코드에서 `PerformanceEntryRepresentation` 유형 대신 `PerformanceEntry` 유형을 직접 사용하세요.

### 로그
#### 콘솔 오류 접두사 제거
로그 메시지의 "`console error:`" 접두사가 제거되었습니다. 이 정보는 `origin` 속성에서 확인할 수 있습니다.

**조치 사항**: `@origin:console`을 대신 사용하기 위해 `"console error:"` 접두사를 사용하여 모니터 또는 대시보드 쿼리를 업데이트합니다.

#### `error.origin` 제거

모든 로그에 `origin` 속성이 도입된 이후 `error.origin`가 중복되어 제거되었습니다.

** 조치 사항**: `origin`을 대신 사용하기 위해 `error.origin`를 사용하여 모니터 또는 대시보드 쿼리를 업데이트하세요.

#### 주요 로거 분리
SDK는 런타임 오류나 네트워크, 보고서 또는 콘솔 로그를 수집할 때 기본 로거(`DD_LOGS.logger`)에 특정한 컨텍스트를 추가하지 않으며 해당 로거에 설정된 수준이나 핸들러를 사용하지 않습니다.

**조치 사항**: 로거가 아닌 로그를 제외하기 위해 메인 로거 레벨에 의존했다면, 전용 초기화 파라미터를 대신 사용하세요.

**조치 사항**: 메인 로거 컨텍스트에 의존하여 로거가 아닌 로그에 컨텍스트를 추가했다면 글로벌 컨텍스트를 대신 사용하세요.

## v3에서 v4로

v4 버전을 사용하는 RUM 및 로그 브라우저 SDK에 몇 가지 변경 사항이 추가되었습니다.

### 변경 사항

#### 인테이크 URL

RUM 브라우저 SDK 데이터가 전송되는 URL이 변경되었습니다. [컨텍스트 보안 정책이 최신 버전][1]인지 확인하세요.

#### 최소 Typescript 버전 지원

RUM 브라우저 SDK v4는 v3.8.2 이전 버전의 TypeScript와 호환되지 않습니다. TypeScript를 사용하는 경우 버전이 v3.8.2 이상이어야 합니다.

#### 태그 구문

`version`, `env` 및 `service` 초기화 파라미터는 Datadog에 태그로 전송됩니다. RUM 브라우저 SDK는 태그가 여러 개 생성되지 않도록 정리하고, 해당 값이 태그 요구 사항 구문에 맞지 않을 경우 경고를 출력합니다.

#### 엄격한 초기화 파라미터 입력

초기화 파라미터를 나타내는 TypeScript 유형은 더 엄격하며 이전에 허용된 지원되지 않는 파라미터를 거부할 수 있습니다. 유형 확인 오류가 발생하면 지원되는 초기화 파라미터를 제공하고 있는지 확인하세요.

#### 개인 정보 옵션 우선 순위

동일한 요소에 여러 개의 개인 정보 보호 옵션이 지정되어 있는 경우 Datadog은 민감한 데이터가 예기치 않게 유출되지 않도록 가장 제한적인 옵션을 적용합니다. 예를 들어, 동일한 요소에 `dd-privacy-allow` 및 `dd-privacy-hidden` 클래스가 모두 지정되어 있는 경우 허용하는 대신 숨깁니다.

#### 액션 이름 생성

액션 이름을 생성할 때 RUM 브라우저 SDK는 `data-dd-action-name` 속성이 있는 하위 요소의 텍스트를 내부 텍스트에서 제거합니다.

예를 들어, 이전에 생성된 액션 이름이 `Container sensitive data`인 다음 `container` 요소의 경우 버전 4에서 생성된 작업 이름은 `Container`입니다:
```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```

### 제거

#### XHR `_datadog_xhr` 필드

RUM 브라우저 SDK는 이전에 내부 상태를 나타내는 `XMLHttpRequest` 개체에 대한 `_datadog_xhr` 속성을 사용했습니다. 이 속성은 외부에서 사용할 목적이 없으므로 교체 없이 제거되었습니다.

#### `proxyHost` 초기화 파라미터

`proxyHost` 초기화 파라미터가 제거되었습니다. 대신 `proxyUrl` 초기화 파라미터를 사용하세요.

#### 개인 정보 보호 옵션 지원

개인 정보 보호 옵션 `input-ignored` 및 `input-masked`은 더 이상 유효하지 않습니다. 대신 `mask-user-input` 개인 정보 보호 옵션을 사용하세요.

구체적으로 다음을 변경합니다:

* `dd-privacy-input-ignored` 및 `dd-privacy-input-masked` 클래스 이름을 `dd-privacy-mask-user-input`로 변경
* `dd-privacy="input-masked"` 및 `dd-privacy="input-ignored"` 속성 값을 `dd-privacy="mask-user-input"`으로 변경

## v2에서 v3로

브라우저 SDK v3에서는 [세션 재생][2]을 소개합니다. 이번 주요 버전 업데이트를 통해 RUM 및 로그 브라우저 SDK에 몇 가지 변경 사항이 추가되었습니다.

### 변경 사항
#### RUM 오류

RUM 브라우저 SDK는 실패한 XHR 및 Fetch 호출에 대해 더 이상 [RUM 오류][3]를 발생시키지 않습니다. 실패한 네트워크 요청은 상태 코드 특성을 포함하는 [RUM 리소스][4]로 계속 수집됩니다.

실패한 네트워크 요청을 RUM 오류로 계속 확인하려면 Datadog에서는 [beforeSend API][5]를 사용하여 리소스를 가로채서 `status_code` 속성을 확인한 후 [addError API][6]를 사용하여 수동으로 오류를 보낼 것을 권장합니다.

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### RUM 오류 소스 속성

RUM 브라우저 SDK에서는 더 이상 [addError API][6]를 통해 수집된 오류의 소스를 지정할 수 없습니다. 이 API로 수집된 모든 오류의 소스 속성은 `custom`으로 설정됩니다. [addError API][6]는 오류에 대한 추가 컨텍스트를 전달하는 데 사용되는 두 번째 파라미터로 컨텍스트 개체를 허용합니다.

### 제거
#### RUM API

| 이전 API       | 새로운 API   |
| ------------- | --------- |
| addUserAction | addAction |

#### 초기화 옵션

| 이전 옵션        | 새로운 옵션 |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | NONE        |

#### TypeScript 유형

| 이전 유형                    | 새로운 유형                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/faq/content_security_policy
[2]: /ko/real_user_monitoring/session_replay
[3]: /ko/real_user_monitoring/browser/collecting_browser_errors/
[4]: /ko/real_user_monitoring/browser/monitoring_resource_performance/
[5]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[6]: /ko/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[7]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#clear-user-session-property
[8]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#add-global-context-property
[9]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#remove-global-context-property
[10]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#read-global-context
[11]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#replace-global-context
[12]: /ko/api/latest/rum/
[13]: /ko/api/latest/rum/
[14]: /ko/api/latest/rum/
[15]: /ko/api/latest/rum/
[16]: /ko/api/latest/rum/
[17]: /ko/api/latest/rum/
[18]: /ko/integrations/content_security_policy_logs/?tab=firefox#use-csp-with-real-user-monitoring-and-session-replay
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[20]: /ko/real_user_monitoring/session_replay/privacy_options/#configuration
[21]: /ko/real_user_monitoring/guide/sampling-browser-plans/#setup
[22]: /ko/real_user_monitoring/session_replay/#usage
[23]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[24]: /ko/help/
[26]: /ko/real_user_monitoring/browser/
[25]: /ko/real_user_monitoring/connect_rum_and_traces#opentelemetry-support