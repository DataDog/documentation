---
description: 주요 변경 사항, 새로운 기능 및 호환성 업데이트를 포함한 RUM Browser SDK 주요 버전 간 마이그레이션 업그레이드
  가이드
further_reading:
- link: /real_user_monitoring/explorer
  tag: 문서
  text: 탐색기에서 RUM 데이터 시각화하기
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: 블로그
  text: Datadog Session Replay를 사용하여 실시간 사용자 여정 보기
title: RUM Browser SDK 업그레이드하기
---
## 개요 {#overview}

이 가이드를 따라 Browser RUM 및 Browser Logs SDK의 주요 버전 간 마이그레이션을 수행하세요. 각 SDK의 기능 및 역량에 대한 자세한 내용은 [SDK 문서][26]를 참조하세요.

## v6에서 v7로 업그레이드 {#from-v6-to-v7}

v7 SDK는 개인정보 보호 기본 설정을 개선하고, 지원이 중단된 옵션을 제거하며, SDK 내부를 현대화합니다. 대부분의 변경 사항은 구성 업데이트가 필요합니다.

SDK를 업그레이드할 때 아래 단절적 변경 사항에 유의하세요. 변경 사항은 영향 영역별로 그룹화되어 있습니다.

<div class="alert alert-tip"> 에이전트 스킬을 지원하는 AI 코딩 어시스턴트를 사용하는 경우 <a href="https://github.com/datadog-labs/agent-skills/blob/main/dd-browser-sdk/upgrade-v7/SKILL.md"><code>upgrade-browser-sdk-v7</code> 스킬</a>을 적용하여 아래 마이그레이션 단계 대부분을 자동화할 수 있습니다. </div>

### 코어 {#core}

#### 세션 관리자 재작성 {#session-manager-rewrite}

데이터 신뢰성을 개선하고 청구 불일치를 줄이기 위해 세션을 추적하는 시스템이 재작성되었습니다. 설정에 따라 세션 수의 변화가 나타날 수 있습니다.

#### 결정론적 샘플링 결정 {#deterministic-sampling-decisions}

이전에는 샘플링 결정이 세션 생성 시 한 번 이루어지고 유지되었습니다. v7에서는 세션 ID와 샘플링 비율을 기반으로 필요에 따라 계산되므로 어느 페이지에서 SDK를 초기화하더라도 일관되게 적용됩니다. 페이지마다 다른 샘플링 비율을 사용하는 경우 해당 비율이 일관되게 적용됩니다.

<div class="alert alert-warning">v7로 업그레이드하면 RUM 세션 ID를 기반으로 분산 트레이스에 결정론적 샘플링이 도입됩니다. 결과적으로 RUM without Limits™에서는 관련 트레이스가 샘플링된 세션이 인덱싱될 가능성이 크게 증가합니다. 구성 변경이 없어도 기존 Cross-Product Retention Filters에서 더 많은 트레이스가 보존됩니다.<br><br>교차 제품 Retention Filters(예: RUM 연결 APM 트레이스)를 사용하는 경우 <strong>인덱싱된 스팬 볼륨이 증가</strong>하여 <strong>비용이 증가할 수 있습니다</strong>. 업그레이드 후 Retention Filter 구성과 예상 스팬 볼륨을 검토하세요.</div>

#### 세션 저장소 키 이름 변경 {#session-store-key-renamed}

새 세션 관리자가 호환되지 않는 저장소 형식을 사용하므로 세션 저장소 키가 `_dd_s`에서 `_dd_s_v2`로 변경되었습니다. 업그레이드 시 기존 세션은 `_dd_s`에서 자동으로 마이그레이션됩니다.

**참고**: 업그레이드 후 v6으로 롤백하면 v6 SDK는 `_dd_s_v2` 키를 읽지 않으므로 새 세션을 시작합니다. 특정 쿠키 이름을 허용 목록에 추가하는 CSP 또는 쿠키 정책이 있는 경우 `_dd_s_v2`를 추가하세요.

#### CDN 번들 URL 업데이트 {#update-the-cdn-bundle-url}

Datadog CDN에서 SDK를 로드하는 경우 번들 URL의 버전 세그먼트를 `v6`에서 `v7`로 업데이트하세요. 이는 모든 번들에 적용됩니다.

| 번들   | URL                                                                     |
| -------- | ----------------------------------------------------------------------- |
| RUM      | `https://www.datadoghq-browser-agent.com/<SITE>/v7/datadog-rum.js`      |
| RUM Slim | `https://www.datadoghq-browser-agent.com/<SITE>/v7/datadog-rum-slim.js` |
| Logs     | `https://www.datadoghq-browser-agent.com/<SITE>/v7/datadog-logs.js`     |

`<SITE>`를 사용 중인 Datadog 사이트로 바꾸세요(예: `us1`, `us3`, `us5`, `eu1`, `ap1`, `ap2` 또는 `uk1`). 사이트 URL은 [설정 문서][26]를 참조하세요.

#### ESM 동적 가져오기를 사용하는 CDN 번들 {#cdn-bundles-use-esm-dynamic-imports}

CDN 번들은 CommonJS 대신 ESM 동적 가져오기를 사용하여 webpack 오버헤드와 전체 번들 크기를 줄입니다. CDN 스니펫을 사용하는 경우 스크립트 태그에 `crossorigin` 속성을 추가하세요.

```html
<script src="https://www.datadoghq-browser-agent.com/..." crossorigin="anonymous"></script>
```

전체 스니펫 예시는 [설정 문서][26]를 참조하세요.

#### ES2020 브라우저 기준 {#es2020-browser-baseline}

호환성 심 및 폴리필을 제거하여 번들 크기를 줄이기 위해 ES2020 이전 브라우저 지원이 중단되었습니다. 최소 지원 버전은 Chrome 80+, Firefox 78+, Safari 14+입니다. 예상 영향: 적용 범위 약 0.048% 감소

이전 브라우저를 계속 지원하려면 Browser SDK v6 이하 버전을 계속 사용하세요.

#### 제거된 옵션 {#removed-options}

| 지원이 중단된 옵션(v6 이하) | 대체 옵션(v7) |
| --------------------------------- | ------------------------------------------------------ |
| `betaEncodeCookieOptions`         | 쿠키 인코딩은 항상 활성화되어 있습니다.                     |
| `allowFallbackToLocalStorage`     | `sessionPersistence: ['cookie', 'local-storage']`를 사용합니다. |

### RUM {#rum}

#### `propagateTraceBaggage` 기본적으로 활성화 {#propagatetracebaggage-enabled-by-default}

`propagateTraceBaggage` [초기화 파라미터][28]는 v7에서 기본적으로 `true`로 설정됩니다. Baggage를 전파하면 테일링 기반 샘플링이 활성화되고 트레이스에서 사용자 및 계정 컨텍스트에 액세스할 수 있습니다.

교차 출처 요청에서 분산 트레이싱을 사용하는 경우 `propagateTraceBaggage: false`를 설정하거나 `Access-Control-Allow-Headers` 응답 헤더에 `baggage`를 추가합니다.

```
Access-Control-Allow-Headers: traceparent, tracestate, baggage
```

#### `defaultPrivacyLevel`의 새로운 기본값 {#new-default-for-defaultprivacylevel}

`defaultPrivacyLevel`은 v7에서 기본적으로 `mask-user-input`으로 설정됩니다(기존에는 `mask`). 이는 전체 마스킹의 제약 없이 사용자 입력을 마스킹하는 개인정보 보호 기본 설정을 제공합니다. 새로운 기본값은 다른 콘텐츠가 수집되는 동안 사용자 입력을 마스킹합니다.

전체 마스킹을 유지하려면 `defaultPrivacyLevel: "mask"`를 명시적으로 설정하세요.

#### `enablePrivacyForActionName` 기본적으로 활성화 {#enableprivacyforactionname-enabled-by-default}

`enablePrivacyForActionName`은 v7에서 기본적으로 `true`로 설정됩니다. 클릭 작업 이름은 기본적으로 `defaultPrivacyLevel` 설정을 따릅니다. 옵트아웃하려면 `enablePrivacyForActionName: false`를 설정하세요.

#### `startDurationVital` 및 `stopDurationVital` API 변경 {#startdurationvital-and-stopdurationvital-api-change}

`DurationVitalReference` 객체가 `vitalKey` 문자열 옵션으로 대체되었습니다. 이는 API를 `startResource`/`stopResource`, `startAction`/`stopAction` 및 Mobile SDK와 일치시킵니다. 동일한 이름의 여러 동시 바이탈도 계속 지원됩니다.

```js
// Before
const ref = datadogRum.startDurationVital('myVital')
datadogRum.stopDurationVital(ref)

// After
datadogRum.startDurationVital('myVital', { vitalKey: 'uniqueKey' })
datadogRum.stopDurationVital('myVital', { vitalKey: 'uniqueKey' })
```

#### 새로운 `session_renewal` 보기 로딩 유형 {#new-session-renewal-view-loading-type}

세션이 만료된 후 갱신되면 새 보기는 `route_change` 대신 `@view.loading_type:session_renewal`로 생성됩니다. 세션 갱신 보기도 포함해야 하는 경우 `@view.loading_type`을 필터링하는 대시보드나 모니터를 업데이트하세요.

#### `PerformanceNavigationTiming`을 사용하는 문서 리소스 {#document-resource-uses-performancenavigationtiming}

초기 문서 리소스 이벤트는 이전에 합성 타이밍 항목을 사용했습니다. v7에서는 브라우저의 네이티브 `PerformanceNavigationTiming`을 직접 사용하므로 문서 리소스의 `resource.duration` 값이 약간 달라질 수 있습니다. 문서 리소스에 대한 `initiatorType`이 `initial_document`에서 `navigation`으로 변경됩니다.

문서 리소스의 `performanceEntry`를 검사하는 플러그인이나 도메인 컨텍스트 핸들러를 사용하는 경우 `PerformanceResourceTiming` 대신 `PerformanceNavigationTiming`을 예상하도록 업데이트하세요.

#### First Input Delay(FID) 제거 {#first-input-delay-fid-removed}

Google은 Core Web Vital로 FID를 Interaction to Next Paint(INP)로 대체했습니다. 번들 크기를 줄이기 위해 SDK에서 FID가 제거되었습니다. 대신 INP를 사용하세요.

#### 플러그인 API: `strategy` 제거 {#plugin-api-strategy-removed}

`strategy` 필드가 플러그인 API에서 제거되었습니다. `rum-react` 또는 기타 통합을 사용하는 경우 코어 SDK와 함께 v7로 업그레이드하세요.

#### 작업 이름 계산 개선 {#improved-action-name-computation}

v7에서 SDK는 DOM 구조를 고려하는 새로운 작업 이름 계산 전략을 사용하여 요소의 개인정보 보호 수준을 더 정확하게 적용하고 Shadow DOM 콘텐츠 처리를 개선합니다. 작업 이름이 약간 변경될 수 있습니다. `betaTrackActionsInShadowDom` 옵션이 제거되었습니다.

#### BFCache 탐색 항상 추적 {#bfcache-navigations-always-tracked}

Back/Forward Cache 복원은 `@view.loading_type:bf_cache`가 포함된 별도의 보기로 추적되며 정확한 로딩 시간과 Core Web Vitals도 포함됩니다. `trackBfCacheViews` 옵션이 제거되었습니다.

#### 초기 요청 항상 수집 {#early-requests-always-collected}

SDK가 초기화되기 전에 발생한 리소스와 요청은 자동으로 캡처됩니다. 일부 초기 리소스에는 상태 코드와 같은 속성이 누락될 수 있습니다. `trackEarlyRequests` 옵션이 제거되었습니다.

#### 비동기 청크 파일 이름에 `datadog` 접두사 추가 {#async-chunk-file-names-prefixed-with-datadog}

비동기 청크 파일 이름에는 `datadog` 접두사가 포함됩니다(예: `datadog-rum-recorder.js`). CSP 또는 캐싱 규칙이 이전 이름과 일치하는 경우 이에 맞게 업데이트하세요.

### Logs {#logs}

#### Logs에 필요한 세션 관리자 {#logs-require-a-session-manager}

Logs는 항상 세션 관리자를 사용하므로 Logs 이벤트가 세션 ID와 일관되게 연결됩니다. 쿠키와 로컬 스토리지를 모두 사용할 수 없는 경우 SDK는 데이터를 전송하지 않고 경고를 기록합니다. 이전에는 스토리지가 없어도 Logs가 시작되었습니다.

메모리 기반 세션을 명시적으로 활성화하려면 `sessionPersistence: 'memory'`를 사용하세요. Worker 환경에서는 이 폴백이 자동으로 적용됩니다.

#### `forwardErrorsToLogs` 및 `forwardConsoleLogs`는 서로 독립적임 {#forwarderrorstologs-and-forwardconsolelogs-are-independent}

이전에는 `forwardErrorsToLogs`를 활성화하면 `console.error` 호출도 자동으로 전달되었습니다. v7에서는 이러한 옵션이 완전히 독립적입니다. 전달되는 항목을 세밀하게 제어할 수 있습니다. `forwardErrorsToLogs`는 처리되지 않은 오류만 제어합니다.

이전 동작을 유지하려면 `forwardConsoleLogs` 배열에 `error`를 추가합니다.

```js
DD_LOGS.init({
  forwardConsoleLogs: ['error', 'warn'],
})
```

#### 취소된 요청의 네트워크 오류 제외 {#network-errors-for-canceled-requests-are-dropped}

애플리케이션에 의해 취소된 요청(중단된 fetch 또는 XHR)은 더 이상 네트워크 오류 로그를 생성하지 않습니다. 이는 Error Tracking의 노이즈를 줄입니다.

#### 제거된 옵션 {#removed-options-1}

| 지원이 중단된 옵션(v6 이하) | 대체 옵션(v7) |
| --------------------------------- | -------------------------------------------------------------------------- |
| `usePciIntake`                    | 표준 수집은 PCI를 준수합니다. 필요한 경우 [CSP][18]를 업데이트하세요. |

### Session Replay {#session-replay}

#### 새 데이터 형식 {#new-data-format}

v7에서 Session Replay는 대역폭 사용량을 크게 줄이는 새롭고 더 압축된 데이터 형식을 사용합니다. Session Replay 데이터는 브라우저 SDK API를 통해 직접 노출되지 않으므로 이 변경 사항을 적용하기 위해 별도로 수행할 작업은 없습니다.

## v5에서 v6으로 업그레이드 {#from-v5-to-v6}

v6이 제공하는 주요 개선 사항은 번들 크기 축소입니다. IE11 지원을 중단하고 지연 로딩을 활용하여 RUM 번들 크기는 10%, Logs 번들 크기는 약 9% 감소했습니다.
또한 기본 초기화 파라미터 몇 가지를 변경하고 향후 개선을 위한 준비를 마쳤습니다.

SDK를 업그레이드할 때 아래 단절적 변경 사항에 유의하세요.

### 호환성에 영향을 주는 변경 사항 {#breaking-changes}

#### 브라우저 지원 {#browser-support}

IE11 및 기타 구형 브라우저에 대한 지원이 중단되었습니다. 이제 브라우저는 최소한 ES2018을 지원해야 합니다.
구형 브라우저에서 Datadog을 사용하려면 Browser SDK v5 이하 버전을 계속 사용하세요.

#### tracecontext 전파기를 사용할 때 tracestate 헤더 추가 {#add-tracestate-header-when-using-tracecontext-propagator}

기본 `tracecontext` 전파자는 이제 트레이스의 출처를 더 정확하게 파악할 수 있도록 추가 메타데이터가 포함된 새로운 `tracestate` 헤더를 전송합니다. 이 전파자를 사용하는 경우 기존 `traceparent` 헤더와 함께 추적 대상인 모든 엔드포인트에서 이 새로운 헤더도 허용해야 합니다.

```
Access-Control-Allow-Headers: traceparent, tracestate
```

#### `site` 옵션의 타입 강화 {#strongly-type-site-option}

`site` 옵션의 형식 정의가 더 강력해졌습니다. TypeScript를 사용하는 경우 표준이 아닌 값을 사용하면 오류가 발생할 수 있습니다. RUM 데이터를 표준이 아닌 URL로 보내려면 [proxy][27]를 사용하는 것이 좋습니다.

#### Actions, Resources 및 LongTask 추적이 기본적으로 활성화됨 {#tracking-actions-resources-and-longtask-are-now-enabled-by-default}

사용자 상호 작용, 리소스 및 긴 작업이 이제 기본적으로 추적됩니다. 이 변경 사항은 청구에 영향을 미치지 않습니다. 옵트아웃하려면 `trackUserInteractions`, `trackResources`, `trackLongTasks` [초기화 파라미터][28]를 `false`로 설정하세요.

#### Long Animation Frames를 Long Tasks로 수집 {#collect-long-animation-frames-as-long-tasks}

지원되는 브라우저에서는 이제 Long Tasks 대신 [Long Animation Frames][35]가 수집됩니다. RUM Explorer의 이벤트 유형은 여전히 `long_task`이지만 Long Animation Frame에 대한 정보가 포함됩니다.

#### 쿠키 만료일 연장 {#increased-cookies-expiration-date}

익명 사용자 추적을 지원하기 위해 세션 쿠키(`_dd_s`) 만료일이 1년으로 연장되었습니다. 옵트아웃하려면 `trackAnonymousUser` [초기화 파라미터][28]를 `false`로 설정하세요.

#### Removed useCrossSiteSessionCookie initialization parameter {#removed-usecrosssitesessioncookie-initialization-parameter}

`useCrossSiteSessionCookie`는 지원이 중단되었으며 이제 지원되지 않습니다. 대신 `usePartitionedCrossSiteSessionCookie` [초기화 파라미터][28]를 사용하세요.

#### Session Replay 지연 로드 {#lazy-load-session-replay}

Session Replay 모듈은 이제 [동적 가져오기][30]를 사용하여 지연 로드됩니다. Session Replay용으로 샘플링된 세션에서만 모듈을 로드하므로 그 외의 경우 번들 크기가 줄어듭니다.

**NPM을 통해 SDK를 사용하는 경우**, 번들러가 동적 가져오기를 지원하는지 확인하세요. 대부분의 최신 번들러는 이 기능을 기본 제공하지만, 일부는 구성 변경이 필요할 수 있습니다. 자세한 지침은 번들러 문서([Webpack][31], [Esbuild][32], [Rollup][33], [Parcel][34])를 참조하세요.

**CDN을 통해 SDK를 사용하는 경우**, 호환성에 영향을 주는 변경 사항은 없습니다. 단, 메인 스크립트가 로드되는 것 외에도(예: 
`datadog-rum.js`), SDK는 필요할 때 추가 청크를 동적으로 로드합니다(예: 
`recorder-d7628536637b074ddc3b-datadog-rum.js`).

#### 샘플되지 않은 트레이스에 트레이스 컨텍스트를 주입하지 않음 {#do-not-inject-trace-context-for-non-sampled-traces}

`traceContextInjection` 초기화 파라미터의 기본값이 `sampled`로 업데이트되어 Browser SDK에서 트레이스가 샘플링되지 않을 때 백엔드 서비스의 샘플링 결정이 적용되도록 합니다. 자세한 내용은 [Connect RUM and Traces 문서][29]를 참조하세요.

**참고**: `traceSampleRate`를 100%(기본값)로 사용하는 경우 이 변경 사항은 영향을 미치지 않습니다.



### 향후 호환성에 영향을 주는 변경 사항 {#future-breaking-changes}

#### Datadog 수집 요청 압축 활성화 {#enabling-compression-for-datadog-intake-requests}

Datadog 수집 요청에 대한 압축이 향후 메이저 버전에서 기본적으로 활성화됩니다.
Datadog은 `compressIntakeRequests` [초기화 파라미터][28]를 사용하여 지금 압축을 활성화할 것을 권장합니다.
압축은 Worker 스레드에서 수행되므로 콘텐츠 보안 정책(CSP) 구성이 필요합니다. 자세한 내용은 [CSP 가이드라인][18]을 참조하세요.

## v4에서 v5로 업그레이드 {#from-v4-to-v5}

V5에는 다음과 같은 변경 사항이 도입되었습니다.

- Session Replay를 위한 새로운 구성 및 개인정보 보호 기본 설정
- 좌절 신호 자동 수집
- 업데이트된 성능 메트릭
- 업데이트된 SDK 파라미터 및 API

SDK를 업그레이드할 때 아래 단절적 변경 사항에 유의하세요. 변경 사항은 영향 영역별로 그룹화되어 있습니다.

### 일반 {#general}

#### SDK 초기화 파라미터 {#sdk-initialization-parameters}

**취해야 할 조치**: v5에서 지원이 중단된 파라미터를 새로운 동등한 파라미터로 교체합니다. 기존 파라미터 이름은 더 이상 v5에서 사용할 수 없습니다.

| 지원이 중단된 파라미터 이름(v4 이하) | 새로운 파라미터 이름(v5) |
|-------------------------------------------|-------------------------|
| proxyUrl | proxy |
| sampleRate | sessionSampleRate |
| allowedTracingOrigins | allowedTracingUrls |
| tracingSampleRate | traceSampleRate |
| trackInteractions | trackUserInteractions |
| premiumSampleRate | sessionReplaySampleRate |
| replaySampleRate | sessionReplaySampleRate |

#### 공개 API {#public-apis}

**취해야 할 조치**: 지원이 중단된 API를 새로운 동등한 API로 교체합니다. 기존 API는 더 이상 v5에서 사용할 수 없습니다.

| 지원이 중단된 파라미터 이름(v4 이하) | 새로운 파라미터 이름(v5) |
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

#### 수집 도메인 {#intake-domains}
V5는 기존 버전과 다른 수집 도메인으로 데이터를 전송합니다.

**취해야 할 조치**: 새 도메인을 사용하도록 [콘텐츠 보안 정책(CSP)][18] `connect-src` 항목을 업데이트하세요.

| Datadog 사이트 | 도메인 |
|--------------|--------|
| US1 | `connect-src https://browser-intake-datadoghq.com` |
| US3 | `connect-src https://browser-intake-us3-datadoghq.com` |
| US5 | `connect-src https://browser-intake-us5-datadoghq.com` |
| EU1 | `connect-src https://browser-intake-datadoghq.eu` |
| US1-FED | `connect-src https://browser-intake-ddog-gov.com` |
| US2-FED | `connect-src https://browser-intake-us2-ddog-gov.com` |
| AP1 | `connect-src https://browser-intake-ap1-datadoghq.com` |
| UK1 | `connect-src https://browser-intake-uk1-datadoghq.com` |

#### 신뢰할 수 있는 이벤트 {#trusted-events}
부정확하거나 유효하지 않은 데이터가 수집되지 않도록 v5는 사용자 동작으로 생성된 이벤트만 수신하고 스크립트로 생성된 이벤트는 무시합니다. 자세한 내용은 [trusted events][19]를 참조하세요.

**취해야 할 조치**: 프로그래밍 방식 이벤트를 사용하고 SDK에서 이를 처리하도록 하려면 다음과 같이 `__ddIsTrusted` 속성을 추가하세요.

```javascript
const click = new Event('click')
click.__ddIsTrusted = true
document.dispatchEvent(click)
```

**취해야 할 조치**: 예를 들어, 자동화된 UI 테스트 환경처럼 프로그래밍 방식 이벤트에 크게 의존하는 경우 `allowUntrustedEvents: true`를 설정하여 신뢰할 수 없는 모든 이벤트를 허용할 수 있습니다.

#### `beforeSend` 반환 유형 {#beforesend-return-type}
`beforeSend` 콜백 함수는 불리언 값을 반환해야 합니다.

```javascript
beforeSend(event: any, context?: any) => boolean
```

구현은 변경되지 않았습니다. 값이 반환되지 않으면 이벤트가 삭제되지 않습니다.

**취해야 할 조치**: 이벤트를 유지하려면 `beforeSend`가 `true`를, 삭제하려면 `false`를 반환하도록 하세요. 이는 관련 TypeScript 컴파일 오류를 해결합니다.

### Session Replay {#session-replay-1}

#### Session Replay 마스킹 {#session-replay-masking}

기본 Session Replay 마스킹 설정 `defaultPrivacyLevel`이 `mask-user-input`에서 `mask`로 변경되었습니다. 이렇게 하면 기본적으로 Session Replay 녹화의 모든 데이터가 숨겨져 녹화 내용을 볼 때 민감한 정보가 노출될 가능성이 줄어듭니다. 자세한 내용은 [Session Replay 브라우저 개인정보 보호 옵션][20]을 참조하세요.

**취해야 할 조치**: Session Replay에서 민감한 정보가 아닌 HTML 콘텐츠나 사용자가 입력한 텍스트 등 마스킹되지 않은 데이터를 더 확인하려면 `defaultPrivacyLevel`을 `mask-user-input` 또는 `allow`로 설정하세요.

#### Session Replay용으로 샘플링된 세션 자동 녹화 {#automatic-recording-of-sessions-sampled-for-session-replay}
[`sessionReplaySampleRate`][21]을 사용하여 Session Replay용으로 샘플링된 세션은 세션 시작 시 자동으로 녹화됩니다. 즉, 녹화를 캡처하기 위해 [`startSessionReplayRecording()`][22] 메서드를 호출할 필요가 없습니다. 다시 말해, 실수로 녹화를 누락하는 일이 없습니다.

**취해야 할 조치**: 기존 녹화 동작을 계속 사용하고 녹화 시작 시점을 사용자 지정하려면 `startSessionReplayRecordingManually`를 `true`로 설정하세요.

#### 세션에서 녹화가 캡처된 경우에만 Session Replay 비용 지불 {#only-pay-for-session-replay-when-the-session-captures-a-recording}
이전 SDK 버전에서는 샘플링 메커니즘을 통해 Session Replay 세션 여부가 결정됩니다. v5에서 세션은 세션 중 녹화가 발생한 경우에만 Session Replay 세션으로 간주됩니다. 이를 통해 Session Replay 사용량을 더 쉽게 추적할 수 있습니다.

**조치 필요 없음**: 이 동작은 v5에서 자동으로 적용됩니다.

#### 기본 Session Replay 샘플링 비율 {#default-session-replay-sampling-rate}
v5에서 `sessionReplaySampleRate`의 기본값은 100이 아니라 0입니다. 샘플링 비율을 지정하지 않으면 Replay가 녹화되지 않습니다.

**취해야 할 조치**: Session Replay를 사용하려면 `sessionReplaySampleRate: 100`(또는 다른 샘플링 비율)로 샘플링 비율을 명시적으로 설정하세요.

### RUM {#rum-1}

### APM 통합 {#apm-integration}

OpenTelemetry의 지원 및 사용을 촉진하기 위해 기본 전파자 유형이 `datadog` 외에 `tracecontext`도 포함하도록 변경되었습니다.

**취해야 할 조치**: `allowedTracingUrls` 초기화 파라미터에서 원하는 전파자를 아직 지정하지 않은 경우 서버의 Access-Control-Allow-Headers가 `traceparent` 헤더도 허용하도록 구성하세요. 자세한 내용은 [RUM과 트레이스 연결][25]을 참조하세요.

### 세션 계획 필드 {#session-plan-field}

Session Replay 변경 사항과 관련하여 `session.plan` 필드는 세션 이벤트에서만 사용할 수 있습니다.

**취해야 할 조치**: 저장된 모니터 또는 대시보드 쿼리를 업데이트하여 비세션 이벤트에서 `session.plan` 필드를 제외하세요.

#### 좌절 신호 자동 수집 {#frustration-signals-are-collected-automatically}
좌절 신호를 포함한 모든 사용자 상호작용을 수집하려면 `trackUserInteractions: true`만 설정하면 됩니다. 더 이상 `trackFrustrations` 파라미터를 별도로 설정할 필요가 없습니다.

**취해야 할 조치**: 좌절 신호를 추적하려면 `trackUserInteractions: true`를 설정합하세요. `trackFrustrations` 파라미터는 제거해도 됩니다.

#### 정지된 페이지의 리소스 지속 시간 생략 {#resource-durations-are-omitted-for-frozen-pages}
리소스 수집 기능은 페이지가 백그라운드로 이동하여 연장된 리소스 지속 시간을 생략합니다(예: 사용자가 페이지 로드 중 별도의 탭을 클릭하는 경우).

**조치 필요 없음**: 이 동작은 v5에서 자동으로 적용됩니다.

#### 리소스 및 긴 작업 추적 {#resources-and-long-task-tracking}
`replaySampleRate` 또는 `premiumSampleRate`(둘 다 지원이 중단됨) 대신 `sessionReplaySampleRate`를 사용하는 경우 리소스와 긴 작업을 명시적으로 구성해야 합니다.

**취해야 할 조치**: 이러한 이벤트를 수집하려면 `trackResources` 및 `trackLongTasks`가 `true`로 설정되어 있는지 확인하세요.

#### 리소스 메서드 이름 대문자 표기 {#resource-method-names-are-in-uppercase}
대소문자에 따라 동일한 메소드 이름에 다른 값이 표시되는 현상(예: POST vs post)을 방지하기 위해 이제부터 메소드 이름을 일관되게 대문자로 전송합니다.

**취해야 할 조치**: 모니터 또는 대시보드 쿼리를 업데이트하여 `resource.method` 필드에 대문자 값을 사용하세요.

#### `beforeSend` 작업 이벤트 {#beforesend-action-event}
`beforeSend` API로 수집한 이벤트의 컨텍스트 정보에 액세스할 수 있습니다([RUM 데이터 보강 및 제어][23] 참조).

좌절 신호가 삽입될 경우 이벤트 작업은 여러 DOM 이벤트와 연관될 수 있습니다.

이번 업데이트와 함께 `context.event` 속성은 `context.events` 속성으로 대체되어 제거되었습니다.

**취해야 할 조치**: `beforeSend` 코드를 업데이트하여 `context.event` 대신 `context.events`를 사용하세요.

```javascript
beforeSend: (event, context) => {
  if (event.type === 'action' && event.action.type === 'click') {
    // accessing browser events related to the action event
    // before, single event: context.event
    // now, multiple events: context.events
  }
}
```

#### `beforeSend` 포그라운드 기간 동안 {#beforesend-in-foreground-periods}
`view.in_foreground_periods` 속성은 SDK에서 전송되지 않고 백엔드에서 직접 계산됩니다.

**취해야 할 조치**: `beforeSend` 코드에서 `view.in_foreground_periods`를 제거하세요. 특정 사용 사례에서 이 속성을 사용하고 있었다면 [지원팀][24]에 문의하여 도움을 받으세요.

#### `beforeSend` 성능 항목 {#beforesend-performance-entry}
`beforeSend` 컨텍스트 `performanceEntry` 속성은 JSON 표현 대신 성능 항목 객체를 직접 포함하도록 업데이트되었습니다.

내보낸 `PerformanceEntryRepresentation` 유형은 표준 `PerformanceEntry` 유형으로 대체되어 제거되었습니다.

**취해야 할 조치**: `beforeSend` 코드에서 `PerformanceEntryRepresentation` 유형 대신 `PerformanceEntry` 유형을 직접 사용하세요.

### Logs {#logs-1}
#### 콘솔 오류 접두어 삭제 {#remove-console-error-prefix}
로그 메시지의 '`console error:`' 접두어가 삭제되었습니다. 이 정보는 `origin` 속성에서 찾을 수 있습니다.

**취해야 할 조치**: `"console error:"` 접두사를 사용하는 모니터 또는 대시보드 쿼리를 업데이트하여 대신 `@origin:console`을 사용하세요.

#### `error.origin` {#remove-errororigin} 제거

모든 로그에 `origin` 속성이 도입된 이후, `error.origin`은 중복되므로 삭제되었습니다.

**취해야 할 조치**: `error.origin`을 사용하는 모니터 또는 대시보드 쿼리를 업데이트하여 대신 `origin`을 사용하세요.

#### 메인 로거 분리 {#decouple-main-logger}
SDK가 런타임 오류나 네트워크, 보고서 또는 콘솔 로그를 수집할 때 메인 로거(`DD_LOGS.logger`) 전용 컨텍스트를 추가하지 않으며 해당 로거에 설정된 레벨이나 핸들러도 사용하지 않습니다.

**취해야 할 조치**: 메인 로거 레벨을 사용하여 로거가 아닌 로그를 제외했다면 대신 전용 초기화 파라미터를 사용하세요.

**취해야 할 조치**: 메인 로거 컨텍스트를 사용하여 로거가 아닌 로그에 컨텍스트를 추가했다면 대신 전역 컨텍스트를 사용하세요.

## v3에서 v4로 업그레이드 {#from-v3-to-v4}

v4 버전에서는 RUM 및 로그 브라우저 SDK에 몇 가지 주요 변경 사항이 적용되었습니다.

### 변경 사항 {#changes}

#### 수집 URL {#intake-urls}

RUM Browser SDK 데이터가 전송되는 URL이 변경되었습니다. [Content Security Policy가 최신 상태인지][1] 확인하세요.

#### 최소 지원 TypeScript 버전 {#minimal-typescript-version-support}

RUM 브라우저 SDK v4는 v3.8.2 이전 버전 TypeScript와 호환되지 않습니다. TypeScript를 사용하는 경우 버전이 최소 v3.8.2 이상인지 확인하세요.

#### 태그 구문 {#tags-syntax}

`version`, `env`, `service` 초기화 파라미터는 Datadog에 태그로 전송됩니다. RUM Browser SDK는 여러 태그가 생성되지 않도록 해당 값을 일부 새니타이징하고, 값이 태그 요구 사항 구문을 충족하지 않으면 경고를 출력합니다.

#### 더 엄격한 초기화 파라미터 유형화 {#stricter-initialization-parameters-typing}

초기화 파라미터를 나타내는 TypeScript 유형이 더 엄격해져 이전에 허용되던 지원되지 않는 파라미터가 거부될 수 있습니다. 유형 검사 오류가 발생하면 지원되는 초기화 파라미터를 제공하고 있는지 확인하세요.

#### 개인정보 보호 옵션 우선순위 {#privacy-options-precedence}

동일한 요소에 여러 개인정보 보호 옵션이 지정된 경우, Datadog은 민감한 데이터가 예기치 않게 유출되는 것을 방지하기 위해 가장 제한적인 옵션을 적용합니다. 예를 들어, 동일한 요소에 `dd-privacy-allow` 및 `dd-privacy-hidden` 클래스가 모두 지정된 경우, 허용되는 대신 숨겨집니다.

#### 작업 이름 계산 {#action-names-computation}

작업 이름을 계산할 때 RUM Browser SDK는 `data-dd-action-name` 속성이 있는 자식 요소의 텍스트를 내부 텍스트에서 제거합니다.

예를 들어, 다음 `container` 요소에서 이전에는 계산된 작업 이름이 `Container sensitive data`이었지만 v4에서는 `Container`입니다.

```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```

### 삭제{#removals}

#### XHR `_datadog_xhr` 필드 {#xhr-datadog-xhr-field}

RUM 브라우저 SDK는 이전에 내부 상태를 나타내는 `XMLHttpRequest` 객체에 `_datadog_xhr` 속성을 사용했습니다. 이 속성은 외부에서 사용하도록 의도된 것이 아니었으므로 대체 없이 제거되었습니다.

#### `proxyHost` 초기화 파라미터 {#proxyhost-initialization-parameter}

`proxyHost` 초기화 파라미터가 제거되었습니다. 대신 `proxyUrl` 초기화 파라미터를 사용하세요.

#### 개인정보 보호 옵션 지원 {#privacy-options-support}

개인정보 보호 옵션 `input-ignored` 및 `input-masked`는 더 이상 유효하지 않습니다. 대신 `mask-user-input` 개인정보 보호 옵션을 사용하세요.

구체적으로 다음과 같이 교체하세요.

* `dd-privacy-input-ignored` 및 `dd-privacy-input-masked` 클래스 이름을 `dd-privacy-mask-user-input`으로 교체
* `dd-privacy="input-masked"` 및 `dd-privacy="input-ignored"` 속성 값을 `dd-privacy="mask-user-input"`으로 교체

## v2에서 v3로 {#from-v2-to-v3}

브라우저 SDK v3는 [Session Replay][2]를 도입합니다. 이번 메이저 버전 업데이트를 통해 RUM 및 Logs Browser SDK에 여러 호환성에 영향을 주는 변경 사항이 적용되었습니다.

### 변경 사항 {#changes-1}
#### RUM 오류 {#rum-errors}

RUM 브라우저 SDK는 더 이상 실패한 XHR 및 Fetch 호출에 대해 [RUM 오류][3]를 발생시키지 않습니다. 이러한 실패한 네트워크 요청은 여전히 상태 코드 속성을 포함하는 [RUM 리소스][4]로 수집됩니다.

실패한 네트워크 요청을 계속 RUM 오류로 확인하려면 [beforeSend API][5]를 사용하여 리소스를 인터셉트하고 `status_code` 속성을 확인한 다음 [addError API][6]를 사용하여 오류를 수동으로 전송하는 것이 좋습니다.

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### RUM 오류 소스 속성 {#rum-error-source-attribute}

RUM 브라우저 SDK는 더 이상 [addError API][6]로 수집된 오류의 소스를 지정할 수 없습니다. 이 API로 수집된 모든 오류의 소스 속성은 `custom`으로 설정됩니다. [addError API][6]는 두 번째 파라미터로 컨텍스트 객체를 받으며 이를 사용하여 오류에 대한 추가 컨텍스트를 전달해야 합니다.

### 삭제 {#removals-1}
#### RUM API {#rum-api}

| 기존 API       | 새 API   |
| ------------- | --------- |
| addUserAction | addAction |

#### 초기화 옵션 {#initialization-options}

| 기존 옵션        | 새 옵션 |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | NONE        |

#### TypeScript 유형 {#typescript-types}

| 기존 유형                    | 새 유형                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/faq/content_security_policy
[2]: /ko/session_replay/
[3]: /ko/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/
[4]: /ko/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[5]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[6]: /ko/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[7]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#clear-user-session-property
[8]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#add-global-context-property
[9]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#remove-global-context-property
[10]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#read-global-context
[11]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#replace-global-context
[12]: /ko/api/latest/rum/
[13]: /ko/api/latest/rum/
[14]: /ko/api/latest/rum/
[15]: /ko/api/latest/rum/
[16]: /ko/api/latest/rum/
[17]: /ko/api/latest/rum/
[18]: /ko/integrations/content_security_policy_logs/?tab=firefox#use-csp-with-real-user-monitoring-and-session-replay
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[20]: /ko/session_replay/privacy_options?platform=browser#configuration
[21]: /ko/real_user_monitoring/guide/sampling-browser-plans/#setup
[22]: /ko/session_replay/
[23]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[24]: /ko/help/
[26]: /ko/real_user_monitoring/application_monitoring/browser/
[25]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm#opentelemetry-support
[27]: /ko/real_user_monitoring/guide/proxy-rum-data
[28]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[29]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#:~:text=configure%20the%20traceContextInjection
[30]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[31]: https://webpack.js.org/guides/code-splitting/#dynamic-imports
[32]: https://esbuild.github.io/api/#splitting
[33]: https://rollupjs.org/tutorial/#code-splitting
[34]: https://parceljs.org/features/code-splitting
[35]: https://developer.chrome.com/docs/web-platform/long-animation-frames#long-frames-api