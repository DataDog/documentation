---
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: 탐색기에서 RUM 데이터 시각화
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: 블로그
  text: Datadog 세션 재생을 사용하여 실제 사용자 이동 경로 보기
title: RUM 브라우저 SDK 업그레이드
---

## 개요

본 지침에 따라 브라우저 RUM 주요 버전과 브라우저 로그 SDK 간에 마이그레이션하세요. [SDK 문서][26]에서 해당 기능 및 성능에 대한 자세한 내용을 참조하세요.

## v5에서 v6으로

v6의 주요한 개선점은 번들 규모 축소입니다. IE11 지원을 제거하고 지연 로딩을 활용하여 RUM 번들 규모가 10% 축소되었고 로그 번들은 9% 축소되었습니다.
또 향후 개선에 대비하기 위해 초기화 파라미터 일부를 변경했습니다.

SDK를 업그레이드할 때 아래 단절적 변경 사항에 유의하세요.

### 단절적 변경 사항

#### 브라우저 지원

IE11 및 기타 오래된 브라우저 지원이 중단되었습니다. 이제 브라우저가 최소 ES2018을 지원해야 합니다. 구 브라우저에서 Datadog를 사용하려면 Browser SDK v5 이하 버전을 사용하시기 바랍니다.

#### tracecontext 전파기를 사용할 때 tracestate 헤더 추가

이제 기본 `tracecontext` 전파기에서 새 `tracestate` 헤더를 보내는데, 여기에는 더 나은 트레이스 속성을 허용하는 메타데이터가 추가되어 있습니다. 이 전파기를 사용할 경우 기존 `traceparent` 헤더와 더불어 추적하는 모든 엔드포인트에 새 헤더를 허용해야 합니다.

```
Access-Control-Allow-Headers: traceparent, tracestate
```

#### 강력한 `site` 옵션 사용 가능

이제 `site` 옵션에 더 강력한 유형 정의를 사용할 수 있습니다. TypeScript를 사용할 경우 표준 값 이외의 값을 사용하면 오류가 생길 수 있습니다. 비표준 URL에 RUM 데이터를 전송할 때 [프록시][27]를 사용할 것을 추천합니다.

#### 활동 추적, 리소스, 장기 작업이 기본적으로 활성화됨

이제 사용자 소통, 리소스, 장기 작업을 기본값으로 추적합니다. 이 변화는 요금에 영향을 미치지 않습니다. 이 기능을 비활성화하려면 `trackUserInteractions`, `trackResources`, `trackLongTasks`, [초기화 파라미터][28]를 `false`로 설정합니다.

#### 긴 애니메이션 프레임을 긴 작업으로 수집

이제 지원하는 브라우저에서 긴 작업 대신 [긴 애니메이션 프레임][35]이 수집됩니다. RUM Explorer에서 이벤트 유형은 `long_task`로 표시되지만 긴 애니메이션 프레임 정보를 포함합니다.

#### 쿠키 만료일 연장

익명의 사용자 추적을 지원하기 위해 세션 쿠키(`_dd_s`) 만료일이 1년으로 연장되었습니다. 이 옵션을 비활성화하려면 `trackAnonymousUser` [초기화 파라미터][28]를 `false`로 설정하세요.

#### useCrossSiteSessionCookie 초기화 파라미터 제거됨

`useCrossSiteSessionCookie`가 사용 중지되어 이제 지원되지 않습니다. 대신 `usePartitionedCrossSiteSessionCookie` [초기화 파라미터][28]를 사용하세요.

#### 지연 로드 세션 재생

이제 세션 재생 모듈은 [역동적 가져오기][3]를 사용해 지연 로딩됩니다. 이는 세션 재생으로 샘플된 세션의 모듈만 로딩하기 때문에 다른 번들 규모가 축소됩니다.

**NPM을 통해 SDK를 사용하는 경우** 번들러가 동적 가져오기를 지원하는지 확인하세요. 대부분의 현대 번들러는 기본적으로 이 기능을 지원하지만 구성을 변경해야 하는 일부 번들러가 있을 수 있습니다. 지침을 보려면 번들러의 설명서를 참고하세요([Webpack][31], [Esbuild][32], [Rollup][33], [Parcel][34]).

**CDN을 통해 SDK를 사용하는 경우**에는 단절적 변경이 없습니다. 그러나 메인 스크립트 로딩(예: `datadog-rum.js`) 외에도 SDK가 필요할 때 동적으로 추가 청크를 로딩합니다(예: `recorder-d7628536637b074ddc3b-datadog-rum.js`).

#### 샘플되지 않은 트레이스에 트레이스 컨텍스트를 삽입하지 않음

브라우저 SDK에서 트레이스가 샘플링되지 않을 때 백엔드 서비스 샘플링 결정이 적용되도록 하기 위해 `traceContextInjection` 초기화 파라미터의 기본값이 `sampled`로 업데이트되었습니다.

**참고**: `traceSampleRate`을 100%로 사용하는 중인 경우(기본값) 이 변경 사항이 영향을 미치지 않습니다.



### 향후 단절적 변경

#### Datadog 수집 요청 압축 활성화

이후 주요 버전에서 Datadog 수집 요청 압축이 기본적으로 활성화됩니다.
Datadog에서는 `compressIntakeRequests` [초기화 파라미터][28]를 사용해 이 압축을 활성화할 것을 권고합니다.
압축은 Worker 스레드에서 진행되기 때문에 Content Security Policy를 구성해야 합니다. 자세한 정보는 [CSP 가이드라인][18]을 참고하세요.

## v4에서 v5로

V5에는 다음과 같은 변경 사항이 도입되었습니다.

- 세션 리플레이를 위한 새로운 설정 및 개인정보 보호 기본값
- 좌절 신호 자동 수집
- 업데이트된 성능 메트릭
- 업데이트된 SDK 파라미터 및 API

SDK를 업그레이드할 때 하단의 주요 변경 사항에 유의합니다. 변경 사항은 영향 영역별로 그룹화됩니다.

### 일반

#### SDK 초기화 파라미터

**취해야 할 조치**: v5에서 지원 중단 파라미터를 새로운 관련 파라미터로 교체합니다. 기존 파라미터 이름은 더 이상 v5에서 사용할 수 없습니다.

| 지원 중단 파라미터 이름(v4 이하) | 신규 파라미터 이름 (v5) |
|-------------------------------------------|-------------------------|
| proxyUrl | proxy |
| sampleRate | sessionSampleRate |
| allowedTracingOrigins | allowedTracingUrls |
| tracingSampleRate | traceSampleRate |
| trackInteractions | trackUserInteractions |
| premiumSampleRate | sessionReplaySampleRate |
| replaySampleRate | sessionReplaySampleRate |

#### 공개 API

**취해야 할 조치**: 지원 중단 API를 새로운 관련 API로 교체합니다. 기존 API는 더 이상 v5에서 사용할 수 없습니다.

| 지원 중단 파라미터 이름(v4 이하) | 신규 파라미터 이름 (v5) |
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

#### 수집 도메인
V5는 기존 버전과 다른 수집 도메인으로 데이터를 전송합니다.

**취해야 할 조치**: 새 도메인을 사용하려면 [콘텐츠 보안 정책 (CSP)][18] `connect-src` 항목을 업데이트하세요.

| Datadog 사이트 | 도메인 |
|--------------|--------|
| US1 | `connect-src https://browser-intake-datadoghq.com` |
| US3 | `connect-src https://browser-intake-us3-datadoghq.com` |
| US5 | `connect-src https://browser-intake-us5-datadoghq.com` |
| EU1 | `connect-src https://browser-intake-datadoghq.eu` |
| US1-FED | `connect-src https://browser-intake-ddog-gov.com` |
| AP1 | `connect-src https://browser-intake-ap1-datadoghq.com` |

#### 신뢰할 수 있는 이벤트
부정확하거나 불법적인 데이터 수집을 방지하기 위해, v5는 사용자 작업으로 생성된 이벤트만 수신하고 스크립트로 생성된 이벤트는 무시합니다. 자세한 내용을 확인하려면  [신뢰할 수 있는 이벤트][19]를 참조하세요.

**취해야 할 조치**: 프로그래밍 방식 이벤트를 사용하고 있고 SDK에서 이를 고려하도록 하려면 다음과 같이 `__ddIsTrusted` 속성을 추가하세요.

```javascript
const click = new Event('click')
click.__ddIsTrusted = true
document.dispatchEvent(click)
```

**취해야 할 조치**: 예를 들어, 자동화된 UI 테스트 환경에서와 같이 프로그래밍 방식 이벤트에 크게 의존한다면 `allowUntrustedEvents: true`을 설정하여 신뢰할 수 없는 모든 이벤트를 허용할 수 있습니다.

#### `beforeSend` 반환 유형
`beforeSend` 콜백 함수는 다음과 같이 불리언 값을 반환해야 합니다.

```javascript
beforeSend(event: any, context?: any) => boolean
```

구현이 변경되지 않았습니다. 값이 반환되지 않으면 이벤트는 삭제되지 않습니다.

**취해야 할 조치**: `beforeSend`이 `true`을 반환하여 이벤트를 유지하고 `false`을 폐기하는지 확인합니다. 이렇게 하면 관련된 TypeScript 컴파일 오류가 해결됩니다.

### 세션 리플레이

#### 세션 리플레이 마스킹

기본 세션 리플레이 마스킹 설정 `defaultPrivacyLevel`이 `mask-user-input`에서 `mask`로 변경되었습니다. 해당 방법을 통해 기본값으로 세션 리플레이 녹화본의 모든 민감한 데이터를 숨겨서 녹화본의 개인 정보 민감도를 경감합니다. 자세한 내용을 확인하려면 [세션 리플레이 브라우저 개인정보 보호 옵션][20]을 참조하세요.

**취해야 할 조치**: 세션 리플레이에서 민감한 정보가 아닌 HTML 콘텐츠나 사용자가 입력한 텍스트 등 마스킹되지 않은 데이터를 더 확인하려면 `defaultPrivacyLevel`를 `mask-user-input` 또는 `allow`로 설정합니다.

#### 세션 리플레이용으로 샘플링된 세션의 자동 레코딩
[`sessionReplaySampleRate`][21]을 사용하여 세션 리플레이용으로 샘플링된 세션은 세션 시작 시 자동으로 녹화됩니다. 즉, 레코딩 캡처를 위해 [`startSessionReplayRecording()`][22] 메서드를 호출하지 않아도 되므로 실수로 녹화를 놓치는 일이 없게 됩니다.

**취해야 할 조치**: 기존 레코딩 작업을 계속 사용하고 레코딩 시작 시 이를 사용자 지정하려면 `startSessionReplayRecordingManually`을 `true`로 설정합니다.

#### 세션에서 레코딩을 캡처할 때만 세션 리플레이 비용을 지불합니다.
이전 SDK 버전에서는 샘플링 메커니즘을 통해 세션이 세션 재생 세션으로 결정됩니다. v5에서는 세션 중에 녹음이 캡처된 경우에만 세션이 세션 재생 세션으로 계산됩니다. 이렇게 하면 세션 재생 사용량을 더 쉽게 추적할 수 있습니다.

**조치 필요 없음**: 본 작업은 v5에서 자동으로 적용됩니다.

#### 기본 세션 리플레이 샘플링 속도
v5에서 기본값 `sessionReplaySampleRate`은 100이 아니라 0입니다. 샘플링 속도를 포함시키지 않으면 리플레이가 녹화되지 않습니다.

**취해야 할 조치**: 세션 리플레이를 사용하려면 `sessionReplaySampleRate: 100`(또는 다른 샘플링 속도)로 샘플링 속도를 명시적으로 설정합니다.

### RUM

### 애플리케이션 성능 모니터링(APM) 통합

OpenTelemetry의 지원 및 사용을 촉진할 목적으로, 기본 전파자 유형이 `datadog` 외에도 `tracecontext`를 포함하도록 변경되었습니다.

**취해야 할 조치**: `allowedTracingUrls` 초기화 파라미터에서 원하는 전파자를 아직 지정하지 않은 경우 `traceparent` 헤더도 허용하도록 서버 Access-Control-Allow-Headers를 설정합니다. 자세한 내용을 확인하려면 [RUM과 트레이스 연결하기][25]를 참조하세요.

### 세션 계획 필드

세션 리플레이 변경 사항과 관련하여 `session.plan` 필드는 세션 이벤트에만 사용할 수 있습니다.

**취해야 할 조치**: 저장한 모니터링 또는 대시보드 쿼리를 업데이트하여 비세션 이벤트에 관한 `session.plan` 필드를 제외합니다.

#### 좌절 신호가 자동 수집됩니다.
`trackUserInteractions: true`만 설정하면 좌절 신호를 포함한 모든 사용자 상호작용 데이터를 수집할 수 있습니다. 더 이상 `trackFrustrations` 파라미터를 별도로 설정하지 않아도 됩니다.

**취해야 할 조치**: 좌절 신호를 추적하려면 `trackUserInteractions: true`을 설정합니다. `trackFrustrations` 파라미터를 삭제할 수 있습니다.

#### 정지된 페이지의 리소스 지속 시간은 생략됩니다.
리소스 수집 기능은 페이지가 백그라운드로 이동하여 연장된 리소스 지속 시간을 생략합니다(예: 사용자가 페이지 로드 중 별도의 탭을 클릭하는 경우).

**조치 필요 없음**: 본 작업은 v5에서 자동으로 적용됩니다.

#### 리소스 및 장기 작업 추적
`replaySampleRate` 또는 `premiumSampleRate`(모두 사용 중단됨) 대신 `sessionReplaySampleRate`을 사용하는 경우, 리소스 및 장기 작업을 명시적으로 설정해야 합니다.

**취해야 할 조치**: 해당 이벤트를 수집하려면 `trackResources` 및 `trackLongTasks`이 `true`로 설정되어 있는지 확인합니다.

#### 리소스 메서드 이름은 대문자
대소문자에 따라 동일한 메소드 이름에 다른 값이 표시되는 현상(예: POST vs post)을 방지하기 위해 이제부터 메소드 이름을 일관되게 대문자로 전송합니다.

**취해야 할 조치**: 모니터링 또는 대시보드 쿼리를 업데이트하여 `resource.method` 필드에 대문자 값을 사용하세요.

#### `beforeSend` 작업 이벤트
`beforeSend` API로 수집한 이벤트의 컨텍스트 정보에 액세스할 수 있습니다([RUM 데이터 보강 및 제어][23] 참조).

좌절 신호가 삽입될 경우 이벤트 작업은 여러 DOM 이벤트와 연관될 수 있습니다.

해당 업데이트와 함께 `context.event` 속성은 `context.events` 속성을 위해 삭제되었습니다.

**취해야 할 조치**: `context.event` 대신 `context.events`을 사용하도록 `beforeSend` 코드를 업데이트합니다.

```javascript
beforeSend: (event, context) => {
  if (event.type === 'action' && event.action.type === 'click') {
    // accessing browser events related to the action event
    // before, single event: context.event
    // now, multiple events: context.events
  }
}
```

#### `beforeSend` 포어그라운드 기간
`view.in_foreground_periods` 속성은 SDK에서 전송하지 않고 백엔드에서 직접 컴퓨팅됩니다.

**취해야 할 조치**: `beforeSend` 코드에서 `view.in_foreground_periods` 를 삭제하세요. 특정 사용 케이스에서 해당 속성을 사용하고 있다면 [지원 팀][24]에 문의하여 도움을 받으세요.

#### `beforeSend` 성능 항목
`beforeSend` 컨텍스트 `performanceEntry` 속성은 성능 항목 오브젝트를 직접 포함하도록 JSON 표현에서 업데이트되었습니다.

내보낸 `PerformanceEntryRepresentation` 유형은 표준 `PerformanceEntry` 유형을 위해 삭제되었습니다.

**취해야 할 조치**: `beforeSend` 코드에서 `PerformanceEntryRepresentation` 유형 대신 `PerformanceEntry` 유형을 직접 사용합니다.

### 로그
#### 콘솔 오류 접두어 삭제
로그 메시지의 "`console error:`" 접두어가 삭제되었습니다. 본 정보는 `origin` 속성에서 확인할 수 있습니다.

**취해야 할 조치**: `"console error:"` 접두어를 사용하는 모니터링 또는 대시보드 쿼리를 업데이트하여 해당 접두어 대신 `@origin:console`를 사용합니다.

#### `error.origin` 삭제

모든 로그에 `origin` 속성이 도입된 이후, `error.origin`은 중복되므로 삭제되었습니다.

**취해야 할 조치**: `error.origin`를 사용하는 모니터링 또는 대시보드 쿼리를 업데이트하여 대신 `origin`를 사용합니다.

#### 메인 로거 분리
SDK가 런타임 오류 또는 네트워크, 보고서 또는 콘솔 로그를 수집할 때, 메인 로거(`DD_LOGS.logger`)에 특정 컨텍스트를 추가하지 않으며 해당 로거에 설정된 수준 또는 핸들러를 사용하지 않습니다.

**취해야 할 조치**: 메인 로거 레벨에 기반하여 비로거 로그를 제외했다면 대신 전용 초기화 파라미터를 사용합니다.

**취해야 할 조치**: 메인 로거 컨텍스트에 기반하여 비로거 로그 컨텍스트를 추가했다면 대신 전역 컨텍스트를 사용합니다.

## v3에서 v4로

v4 버전에서는 RUM 및 로그 브라우저 SDK에 몇 가지 주요 변경 사항이 적용되었습니다.

### 변경 사항

#### 수집 URL

RUM 브라우저 SDK 데이터가 전송되는 URL이 변경되었습니다. [콘텐츠 보안 정책이 최신]인지 확인하세요[1].

#### Typescript 지원 최소 버전

RUM 브라우저 SDK v4는 v3.8.2 이전 버전 TypeScript와 호환되지 않습니다. TypeScript를 사용하는 경우 버전이 최소 v3.8.2 이상인지 확인하세요.

#### 태그 구문

`version`, `env`, `service` 초기화 파라미터는 Datadog에 태그로 전송됩니다. RUM 브라우저 SDK는 여러 개의 태그가 생성되지 않도록 가볍게 보안 처리(sanitize)하고, 해당 값이 태그 요구 사항 구문을 충족하지 않으면 경고를 출력합니다.

#### 더 엄격한 초기화 파라미터 유형화

초기화 파라미터를 나타내는 TypeScript 유형이 더 엄격해졌습니다. 기존에는 승인되었으나 지원되지 않는 파라미터를 거부할 수도 있습니다. 유형 검사 오류가 발생하면 지원되는 초기화 파라미터를 제공하는지 확인하세요.

#### 개인정보 보호 옵션 우선순위

동일 요소에 여러 개인정보 보호 옵션이 지정된 경우, Datadog은 예기치 않은 민감한 데이터 유출을 방지하기 위해 가장 제한적인 옵션을 적용합니다. 예를 들어, 동일 요소에 `dd-privacy-allow` 및 `dd-privacy-hidden` 클래스가 모두 지정되어 있다면 허용되지 않고 대신 숨겨집니다.

#### 작업 이름 컴퓨팅

작업 이름을 컴퓨팅할 때 RUM 브라우저 SDK는 `data-dd-action-name` 속성이 있는 자식 요소의 텍스트를 내부 텍스트에서 삭제합니다.

예를 들어, 다음 `container` 요소의 경우 이전에는 컴퓨팅 작업 이름이 `Container sensitive data`이었으나, v4에서는 컴퓨팅된 작업 이름이 `Container`입니다.
```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```

### 삭제

#### XHR `_datadog_xhr` 필드

RUM 브라우저 SDK는 기존에 내부 상태를 나타내는 `XMLHttpRequest` 오브젝트의 `_datadog_xhr` 속성을 사용했습니다. 해당 속성은 외부 사용 용도가 아니었기에 대체되지 않고 삭제되었습니다.

#### `proxyHost` 초기화 파라미터

`proxyHost` 초기화 파라미터가 삭제되었습니다. 대신 `proxyUrl` 초기화 파라미터를 사용하세요.

#### 개인정보 보호 옵션 지원

`input-ignored` 및 `input-masked` 개인정보 보호 옵션은 더 이상 유효하지 않습니다. 대신 `mask-user-input` 개인정보 옵션을 사용하세요.

구체적으로는 다음으로 교체되었습니다.

* `dd-privacy-mask-user-input`가 있는 `dd-privacy-input-ignored` 및 `dd-privacy-input-masked` 클래스 이름
* `dd-privacy="input-masked"` 및 `dd-privacy="input-ignored"` 속성 값을 `dd-privacy="mask-user-input"`으로 변경

## v2에서 v3로

브라우저 SDK v3에는 [세션 리플레이][2]가 도입되었습니다. 이번 주요 버전 업데이트로 RUM 및 로그 브라우저 SDK에 몇 가지 주요 변경 사항이 적용되었습니다.

### 변경 사항
#### RUM 오류

RUM 브라우저 SDK는 더 이상 실패한 XHR 및 Fetch 호출에 대해 [RUM 오류][3]를 생성하지 않습니다. 이러한 실패한 네트워크 요청은 상태 코드 속성이 포함된 [RUM 리소스][4]로 수집됩니다.

실패한 네트워크 요청을 계속 RUM 오류로 확인하려면 Datadog [beforeSend API][5]로 리소스를 인터셉트하여 `status_code` 속성을 확인한 후 [addError API][6]로 해당 오류를 수동 전송할 것을 권장합니다.

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### RUM 오류 소스 속성

RUM 브라우저 SDK에서 [addError API][6]로 수집한 오류의 소스를 더 이상 지정할 수 없습니다. 해당 API로 수집한 모든 오류는 소스 속성이 `custom`로 설정됩니다. [addError API][6]는 두 번째 파라미터로 컨텍스트 오브젝트를 허용하며, 이는 오류에 대한 추가 컨텍스트를 전달하는 데 사용합니다.

### 삭제
#### RUM API

| 기존 API       | 신규 API   |
| ------------- | --------- |
| addUserAction | addAction |

#### 초기화 옵션

| 기존 옵션        | 신규 옵션 |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| 데이터센터         | site        |
| resourceSampleRate | NONE        |

#### TypeScript 유형

| 기존 유형                    | 신규 유형                    |
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
[20]: /ko/real_user_monitoring/session_replay/browser/privacy_options/#configuration
[21]: /ko/real_user_monitoring/guide/sampling-browser-plans/#setup
[22]: /ko/real_user_monitoring/session_replay/browser/#usage
[23]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[24]: /ko/help/
[26]: /ko/real_user_monitoring/browser/
[25]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm#opentelemetry-support
[27]: /ko/real_user_monitoring/guide/proxy-rum-data
[28]: /ko/real_user_monitoring/browser/setup/#initialization-parameters
[29]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#:~:text=configure%20the%20traceContextInjection
[30]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[31]: https://webpack.js.org/guides/code-splitting/#dynamic-imports
[32]: https://esbuild.github.io/api/#splitting
[33]: https://rollupjs.org/tutorial/#code-splitting
[34]: https://parceljs.org/features/code-splitting
[35]: https://developer.chrome.com/docs/web-platform/long-animation-frames#long-frames-api