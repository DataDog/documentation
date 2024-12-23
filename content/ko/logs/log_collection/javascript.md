---
algolia:
  tags:
  - 브라우저 로그
aliases:
- /ko/logs/log_collection/web_browser
title: 브라우저 로그 수집
---

브라우저 로그 SDK를 사용해 웹 브라우저 페이지에서 Datadog로 로그를 전송합니다.

브라우저 로그 SDK를 사용해 웹 브라우저 페이지에서 바로 Datadog로 로그를 전송하고 다음 기능을 활용할 수 있습니다.

- SDK를 로거로 사용합니다. 모든 항목이 JSON 문서로 Datadog에 전달됩니다.
- `context` 및 그외 커스텀 속성을 전송된 각 로그에 추가합니다.
- 모든 프런트엔드 오류를 자동으로 래핑하여 전달합니다.
- 프런트엔드 오류를 전달합니다.
- 실제 클라이언트 IP 주소와 사용자 에이전트를 기록합니다.
- 자동 대량 포스트로 네트워크 사용량을 최적화했습니다.

## 설정

**Datadog 클라이언트 토큰**: 보안상의 이유로 [API 키][1]는 브라우저 로그 SDK를 설정하는 데 사용할 수 없습니다. 키가 클라이언트 사이드 자바스크립트(Javascript) 코드에 노출되기 때문입니다. 웹 브라우저에서 로그를 수집하려면 반드시 [클라이언트 토큰][2]을 사용해야 합니다. 자세한 정보는 [클라이언트 토큰 설명서][2]를 참조하세요.

**Datadog 브라우저 로그 SDK**: [NPM](#npm)를 사용해 SDK를 설정하거나 헤드 태그에서 [CDN 비동기화](#cdn-async) 또는 [CDN 동기화](#cdn-sync) 코드 스니펫을 사용합니다.

**지원되는 브라우저**: 브라우저 로그 SDK는 현대의 모든 데스크탑 및 IE11를 포함하는 모바일 브라우저를 지원합니다. [브라우저 지원][4] 표를 참조하세요.

### 올바른 설치 방법 선택

| 설치 방법        | 사용 사례                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 노드 패키지 관리자(npm) | 이 방법은 현대의 웹 애플리케이션에 권장됩니다. 브라우저 로그 SDK는 나머지 프런트엔드 자바스크립트 코드와 함께 패키징됩니다. 페이지 로드 성능에 영향을 미치지 않습니다. 하지만 SDK가 초가화되기 전 트리거된 오류, 리소스 및 사용자 작업을 놓칠 수 있습니다. **참고**: 사용된 경우 RUM SDK를 사용해 일치하는 버전을 사용하는 것이 좋습니다. |
| CDN 비동기화                  | 이 방법은 성능 목표가 있는 웹 애플리케이션에 권장됩니다. 브라우저 로그 SDK는 비동기적으로 CDN에서 로그됩니다. 이 방법은 SDK 다운로드가 페이지 로드 성능에 영향을 미치지 않도록 보장합니다. 하지만 SDK는 초기화 전 트리거된 오류, 리소스 및 사용자 작업을 놓칠 수 있습니다.                                                  |
| CDN 동기화                   | 이 방법은 모든 RUM 이벤트 수집에 대해 권장됩니다. 브라우저 로그 SDK는 CDN에서 동기적으로 로드됩니다. 이 방법을 통해 SDK가 먼저 로드되어 모든 오류, 리소스 및 사용자 작업을 수집하도록 할 수 있습니다 이 방법은 페이지 로드 성능에 영향을 미칠 수 있습니다.                                                                                                      |

### NPM

 [`@datadog/browser-logs`][3]을 `package.json` 파일에 추가한 후, 다음을 사용해 초기화됩니다.

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
})
```

### CDN 비동기화

페이지의 헤드 섹션에서 SDK를 로드하고 설정합니다. **{{<region-param key="dd_site_name">}}** 사이트의 경우:

{{< site-region region="us" >}}
```html
<html>
  <head>
    <title>Datadog 로그 전송 예시</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<html>
  <head>
    <title>Datadog 로그 전송 예시</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v5/datadog-logs.js','DD_LOGS')
      DD_LOGS.onReady(function() {
          DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'ap1.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<html>
  <head>
    <title>Datadog 로그 전송 예시</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v5/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'datadoghq.eu',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<html>
  <head>
    <title>Datadog 로그 전송 예시</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v5/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'us3.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<html>
  <head>
    <title>Datadog 로그 전송 예시</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v5/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'us5.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<html>
  <head>
    <title>Datadog 로그 전송 예시</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v5.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'ddog-gov.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}


*참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백으로 래핑되어야 합니다. 이를 통해 SDK가 적절하게 로드될 때만 코드가 실행되도록 할 수 있습니다.

### CDN 동기화

모든 로그와 오류를 받으려면 페이지의 헤드 섹션 앞 부분에 SDK를 로드하고 설정해야 합니다. **{{<region-param key="dd_site_name">}}** 사이트의 경우:

{{< site-region region="us" >}}
```html
<html>
  <head>
    <title>Datadog 로그 전송 예시</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<html>
  <head>
    <title>Datadog 로그 전송 예시</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap1/v5/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'ap1.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<html>
  <head>
    <title>Datadog 로그 전송 예시</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/eu1/v5/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'datadoghq.eu',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<html>
  <head>
    <title>Datadog 로그 전송 예시</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us3/v5/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'us3.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<html>
  <head>
    <title>Datadog 로그 전송 예시</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us5/v5/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'us5.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<html>
  <head>
    <title>Datadog 로그 전송 예시</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v5.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'ddog-gov.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}

**참고**: `window.DD_LOGS` 검사는 SDK를 사용해 로딩 실패가 발생할 때 문제를 방지합니다.

### TypeScript

Type은 TypeScript >= 3.8.2와 호환 가능합니다. 이전 버전의 경우 JS 소스를 가져오기하고 글로벌 변수를 사용해 컴파일 문제를 피할 수 있습니다.

```typescript
import '@datadog/browser-logs/bundle/datadog-logs'

window.DD_LOGS.init({
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
})
```

## 설정

### 콘텐츠 보안 정책 통합

사이트에서 Datadog 콘텐츠 보안 정책(CSP) 통합을 사용하는 경우, 설정 단계는 [CSP 설명서의 RUM 섹션][14]을 참조하세요.

### 초기화 파라미터

다음 파라미터를 사용해 Datadog 브라우저 로그 SDK를 설정하여 Datadog에 로그를 전송할 수 있습니다.

| 파라미터                  | 유형                                                                      | 필수 | 기본값         | 설명                                                                                                                                                                           |
|----------------------------|---------------------------------------------------------------------------|----------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `clientToken`              | 문자열                                                                    | 네      |                 | [Datadog 클라이언트 토큰][2].                                                                                                                                                          |
| `site`                     | 문자열                                                                    | 네      | `datadoghq.com` |  [조직의 Datadog 사이트 파라미터][9]                                                                                                                                 |
| `service`                  | 문자열                                                                    | 아니요       |                 | 애플리케이션의 서비스 이름. [태그 구문 요건][7] 뒤에 와야 합니다.                                                                                             |
| `env`                      | 문자열                                                                    | 아니요       |                 | 애플리케이션의 환경. 예:  prod, pre-prod, staging 등. [태그 구문 요건][7] 뒤에 와야 합니다.                                                    |
| `version`                  | 문자열                                                                    | 아니요       |                 | 애플리케이션 버전. 예: .2.3, 6c44da20, 2020.02.13 등. [태그 구문 요건][7] 뒤에 와야 합니다.                                                    |
| `forwardErrorsToLogs`      | 부울 연산자                                                                   | 아니요       | `true`          | `false`로 설정해 콘솔 오류 로그, 발견되지 않은 예외와 네트워크 오류가 Datadog로 전달되는 것을 막습니다.                                                                              |
| `forwardConsoleLogs`       | `"all"` 또는 `"log"` `"debug"` `"info"` `"warn"` `"error"` 어레이      | 아니요       | `[]`            | `console.*`에서 Datadog로 로그를 전달합니다. `"all"`을 사용해 전체를 전달하거나 콘솔 API 이름 어레이를 사용해 하위 집합만 전달합니다.                                                |
| `forwardReports`           | `"all"` 또는 `"intervention"` `"deprecation"` `"csp_violation"` 어레이 | 아니요       | `[]`            | [보고 API][8]에서 Datadog로 보고서를 전달합니다. `"all"`을 사용해 전체를 전달하거나 보고 유형 어레이를 사용해 하위 집합만 전달합니다.                                       |
| `sampleRate`               | 숫자                                                                    | 아니요       | `100`           | **지원 중단됨** - `sessionSampleRate` 참조                                                                                                                                             |
| `sessionSampleRate`        | 숫자                                                                    | 아니요       | `100`           | 추적할 세션 비율: 전체의 경우 `100`, 전체 해제의 경우 `0`. 추적된 세션만 로그를 전송합니다.                                                                                    |
| `trackingConsent`          | `"granted"` 또는 `"not-granted"`                                            | 아니요       | `"granted"`     | 초기 사용자 추적 동의 상태를 설정합니다. [사용자 추적 동의][15]를 참조하세요.                                                                                                         |
| `silentMultipleInit`       | 부울 연산자                                                                   | 아니요       |                 | 여러 init을 포함하면서 오류를 기록하는 것을 방지합니다.                                                                                                                                    |
| `proxy`                    | 문자열                                                                    | 아니요       |                 | 부수적 프록시 URL(예: https://www.proxy.com/path). 자세한 정보는 전체 [프록시 설정 가이드][6]를 참조합니다.                                                                        |
| `telemetrySampleRate`      | 숫자                                                                    | 아니요       | `20`            | SDK 실행에 대한 텔레메트리 데이터(오류, 디버그 로그)는 잠재적 문제를 감지하고 해결하기 위해 Datadog로 전송됩니다. 이 옵션을 `0`으로 설정해 텔레메트리 수집을 사용 중지합니다. |
| `storeContextsAcrossPages` | 부울 연산자                                                                   | 아니요       |                 | `localStorage`에 글로벌 컨텍스트와 사용자 컨텍스트를 저장하여 사용자 탐색 시 이를 보존합니다. 자세한 정보와 구체적인 제한은 [컨텍스트 라이프사이클][11]을 참조하세요.          |
| `allowUntrustedEvents`     | 부울 연산자                                                                   | 아니요       |                 | 자동화된 UI 테스트 예시의 경우 [신뢰할 수 없는 이벤트][13] 수집을 허용합니다.                                                                                                           |


`RUM` SDK를 사용할 때 옵션에 일치하는 설정이 있어야 합니다.

| 파라미터                              | 유형    | 필수 | 기본값 | 설명                                                                                                                                                              |
|----------------------------------------| ------- | -------- | ------- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `trackSessionAcrossSubdomains`         | 부울 연산자 | 아니요       | `false` | 동일한 사이트에 대한 하위 도메인에서 세션을 보존합니다.                                                                                                                |
| `useSecureSessionCookie`               | 부울 연산자 | 아니요       | `false` | 보안 세션 쿠키를 사용합니다. 이를 통해 안전하지 않은(비-HTTPS) 연결에서 전송된 로그를 비활성화합니다.                                                                                |
| `usePartitionedCrossSiteSessionCookie` | 부울 연산자 | 아니요       | `false` | 파티션된 보안 크로스 사이트 세션 쿠키를 사용합니다. 이를 통해 사이트가 또 다른 iframe에서 로딩될 때 로그 SDK가 실행되도록 할 수 있습니다. `useSecureSessionCookie`를 의미합니다. |
| `useCrossSiteSessionCookie`            | 부울 연산자 | 아니요       | `false` | **지원 중단됨** `usePartitionedCrossSiteSessionCookie`를 참조합니다.                                                                                                              |

## 사용법

### 커스텀 로그

Datadog 브라우저 로그 SDK가 초기화된 후 API를 사용해 커스텀 로그 항목을 Datadog에 직접 전송합니다.

```
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

#### CDN 비동기화

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
})
```

*참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백으로 래핑되어야 합니다. 이를 통해 SDK가 적절하게 로드될 때만 코드가 실행되도록 할 수 있습니다.

#### CDN 동기화

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**참고**: `window.DD_LOGS` 검사는 SDK를 사용해 로딩 실패가 발생할 때 문제를 방지합니다.

#### 결과

NPM, CDN 비동기화 또는 CDN 동기화를 사용할 때 결과가 동일합니다.

```json
{
  "status": "info",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "buttonName",
  "id": 123,
  "message": "Button clicked",
  "date": 1234567890000,
  "origin": "logger",
  "http": {
    "useragent": "Mozilla/5.0 ...",
  },
  "view": {
    "url": "https://...",
    "referrer": "https://...",
  },
  "network": {
    "client": {
      "geoip": {...}
      "ip": "xxx.xxx.xxx.xxx"
    }
  }
}
```

로그 SDK는 기본적으로 다음 정보를 추가합니다. RUM SDK가 존재하면 더 많은 필드가 추가될 수 있습니다.

- `date`
- `view.url`
- `view.referrer`
- `session_id`(세션이 사용된 경우에만)

Datadog 백엔드가 더 많은 필드를 추가합니다.

- `http.useragent`
- `network.client.ip`

### 오류 추적

Datadog 브라우저 로그 SDK는 부수적 `error` 파라미터(SDK v4.36.0+에서 사용 가능)를 사용하는 수동 오류 추적을 허용합니다. [자바스크립트(Javascript) 오류][10] 인스턴스가 제공되면 SDK는 오류에서 관련 정보(유형, 메시지, 스택 트레이스)를 추출합니다.

```
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
  datadogLogs.logger.error('Error occurred', {}, ex)
}
```

#### CDN 비동기화

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
  window.DD_LOGS.onReady(function () {
    window.DD_LOGS.logger.error('Error occurred', {}, ex)
  })
}
```

*참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백으로 래핑되어야 합니다. 이를 통해 SDK가 적절하게 로드될 때만 코드가 실행되도록 할 수 있습니다.

#### CDN 동기화

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
    window.DD_LOGS && window.DD_LOGS.logger.error('Error occurred', {}, ex)
}
```

**참고**: `window.DD_LOGS` 검사는 SDK를 사용해 로딩 실패가 발생할 때 문제를 방지합니다.

#### 결과

NPM, CDN 비동기화 또는 CDN 동기화를 사용할 때 결과가 동일합니다.

```json
{
  "status": "error",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "message": "Error occurred",
  "date": 1234567890000,
  "origin": "logger",
  "error" : {
    "message": "Wrong behavior",
    "kind" : "Error",
    "stack" : "Error: Wrong behavior at <anonymous> @ <anonymous>:1:1"
  },
  ...
}
```

### 일반적인 로거 함수

Datadog 브라우저 로그 SDK는 편의를 위해 로거에 몇몇 함수(`.debug`, `.info`, `.warn`, `.error`)를 추가했습니다. 일반적인 로거 함수도 사용할 수 있으므로 `status` 파라미터를 노출시킬 수 있습니다.

```
log (message: string, messageContext?: Context, status? = 'debug' | 'info' | 'warn' | 'error', error?: Error)
```

#### NPM

NPM의 경우 다음을 사용합니다.

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

#### CDN 비동기화

CDN 비동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS.onReady(function() {
  window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
})
```

*참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백으로 래핑되어야 합니다. 이를 통해 SDK가 적절하게 로드될 때만 코드가 실행되도록 할 수 있습니다.

#### CDN 동기화

CDN 동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

#### 자리표시자

위 예시의 자리표시자는 아래에 설명되어 있습니다.

| 자리표시자         | 설명                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | Datadog가 완전히 인덱싱한 로그 메시지입니다.                               |
| `<JSON_ATTRIBUTES>` | `<MESSAGE>`와 연결된 모든 속성을 포함하는 유효한 JSON 개체입니다.         |
| `<STATUS>`          | 로그 상태로, 허용되는 상태 값은 `debug`, `info`, `warn` 또는 `error`입니다. |
| `<ERROR>`           | [자바스크립트 오류][10] 개체의 인스턴스입니다.                                         |

## 고급 사용량

### 브라우저 로그에서 민감한 데이터 스크럽

브라우저 로그가 삭제를 필요로 하는 민감한 정보를 포함하는 경우 브라우저 SDK를 설정하고 브라우저 로그 컬렉터를 초기화할 때 `beforeSend` 콜백을 사용해여 민감한 시퀀스를 스크럽하세요.

`beforeSend` 콜백 함수는 Datadog로 전송되기 전 브라우저 SDK가 수집한 각 로그에 액세스하고 모든 속성을 업데이트할 수 있도록 해줍니다.

웹 애플리케이션 URL에서 이메일 주소를 삭제하려면,

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // remove email from view url
        log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
    },
    ...
});
```

#### CDN 비동기화

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // remove email from view url
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    })
})
```

#### CDN 동기화

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // remove email from view url
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    });
```

다음 속성은 SDK가 자동으로 수집하며 민감한 데이터를 포함할 수 있습니다.

| 속성       | 유형   | 설명                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | 문자열 | 활성화된 웹 페이지의 URL.                                                                  |
| `view.referrer` | 문자열 | 현재 요청된 페이지로 연결되는 링크를 따라간 이전 웹 페이지의 URL. |
| `message`       | 문자열 | 로그의 콘텐츠.                                                                          |
| `error.stack`   | 문자열 | 스택 트레이스 또는 오류에 대한 보완 정보.                                    |
| `http.url`      | 문자열 | HTTP URL.                                                                                    |

### 특정 로그 삭제

`beforeSend` 콜백 함수는 또한 Datadog에 로그 전송 전 로그를 삭제할 수 있도록 해줍니다.

상태가 404인 경우 네트워크 오류를 삭제하는 방법:

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // discard 404 network errors
        if (log.http && log.http.status_code === 404) {
          return false
        }
    },
    ...
});
```

#### CDN 비동기화

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // discard 404 network errors
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    })
})
```

#### CDN 동기화

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // discard 404 network errors
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    });
```

### 여러 로거 정의

Datadog 브라우저 로그 SDK는 기본 로거를 포함하지만 각기 다른 로거를 정의하는 것도 가능합니다.

#### 새로운 로거 생성

Datadog 브라우저 로그 SDK가 초기화된 후 API `createLogger`를 사용해 새로운 로거를 정의합니다.

```typescript
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**참고**: 이러한 파라미터는 [setLevel](#filter-by-status), [setHandler](#change-the-destination) 및 [setContext](#overwrite-context) API로 설정할 수 있습니다.

#### 커스텀 로거 얻기

로거 생성 이후 API를 사용해 자바스크립트(Javascript) 코드의 모든 부분에 액세스할 수 있습니다.

```typescript
getLogger(name: string)
```

##### NPM

예를 들어 다른 모든 로거에 정의된 `signupLogger`가 있다고 정의합니다.

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', {
  level: 'info',
  handler: 'http',
  context: { env: 'staging' }
})
```

다음을 사용하여 코드의 다른 부분에서 사용할 수 있습니다.

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

##### CDN 비동기화

예를 들어 다른 모든 로거에 정의된 `signupLogger`가 있다고 정의합니다.

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  )
})
```

다음을 사용하여 코드의 다른 부분에서 사용할 수 있습니다.

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

*참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백으로 래핑되어야 합니다. 이를 통해 SDK가 적절하게 로드될 때만 코드가 실행되도록 할 수 있습니다.

##### CDN 동기화

예를 들어 다른 모든 로거에 정의된 `signupLogger`가 있다고 정의합니다.

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
}
```

다음을 사용하여 코드의 다른 부분에서 사용할 수 있습니다.

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**참고**: `window.DD_LOGS` 검사는 SDK를 사용해 로딩 실패가 발생할 때 문제를 방지합니다.

### 컨텍스트 덮어쓰기

#### 글로벌 컨텍스트

Datadog 브라우저 로그 SDK가 초기화된 후 다음이 가능합니다.

- `setGlobalContext (context: object)` API를 사용해 모든 로거에 대한 전체 컨텍스트를 설정합니다.
- `setGlobalContextProperty (key: string, value: any)` API를 사용해 모든 로거에 컨텍스트를 추가합니다.
- `getGlobalContext ()` API를 사용해 전체 글로벌 컨텍스트를 받습니다.
- `removeGlobalContextProperty (key: string)` API를 사용해 컨텍스트 속성을 제거합니다.
- `clearGlobalContext ()` API를 사용해 기존의 모든 컨텍스트 속성을 선택 해제합니다.

> 로그 브라우저  SDK v4.17.0가 여러 API 이름을 업데이트했습니다.
>
> - `getGlobalContext`, 이전 `getLoggerGlobalContext`
> - `setGlobalContext`, 이전 `setLoggerGlobalContext`
> - `setGlobalContextProperty`, 이전 `addLoggerGlobalContext`
> - `removeGlobalContextProperty`, 이전 `removeLoggerGlobalContext`

##### NPM

NPM의 경우 다음을 사용합니다.

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setGlobalContext({ env: 'staging' })

datadogLogs.setGlobalContextProperty('referrer', document.referrer)

datadogLogs.getGlobalContext() // => {env: 'staging', referrer: ...}

datadogLogs.removeGlobalContextProperty('referrer')

datadogLogs.getGlobalContext() // => {env: 'staging'}

datadogLogs.clearGlobalContext()

datadogLogs.getGlobalContext() // => {}
```

##### CDN 비동기화

CDN 비동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setGlobalContext({ env: 'staging' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeGlobalContextProperty('referrer')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {env: 'staging'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearGlobalContext()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {}
})
```

*참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백으로 래핑되어야 합니다. 이를 통해 SDK가 적절하게 로드될 때만 코드가 실행되도록 할 수 있습니다.

##### CDN 동기화

CDN 동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS && window.DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && window.DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && window.DD_LOGS.clearGlobalContext()

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {}
```

**참고**: `window.DD_LOGS` 검사는 SDK를 사용해 로딩 실패가 발생할 때 문제를 방지합니다.

#### 사용자 컨텍스트

Datadog 로그 SDK는 `User`와 일반적인 로그를 연결하는 편리한 함수를 제공합니다.

- `setUser (newUser: User)` API를 사용해 모든 로거에 대한 사용자를 설정합니다.
- `setUserProperty (key: string, value: any)` API를 사용자 속성을 모든 로거에 추가하거나 수정합니다.
- `getUser ()` API를 사용해 현재 저장된 사용자를 받습니다.
- `removeUserProperty (key: string)` API를 사용해 사용자 속성을 제거합니다.
- `clearUser ()` API를 사용해 모든 기존 사용자 속성을 선택 해제합니다.

**참고**: 사용자 컨텍스트는 글로벌 컨텍스트 이전에 적용됩니다. 그러므로 글로벌 컨텍스트에 포함된 모든 사용자 속성은 로그를 생성할 때 사용자 컨텍스트를 덮어씁니다.

##### NPM

NPM의 경우 다음을 사용합니다.

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })
datadogLogs.setUserProperty('type', 'customer')
datadogLogs.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

datadogLogs.removeUserProperty('type')
datadogLogs.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

datadogLogs.clearUser()
datadogLogs.getUser() // => {}
```

##### CDN 비동기화

CDN 비동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setUserProperty('type', 'customer')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeUserProperty('type')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearUser()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {}
})
```

*참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백으로 래핑되어야 합니다. 이를 통해 SDK가 적절하게 로드될 때만 코드가 실행되도록 할 수 있습니다.

##### CDN 동기화

CDN 동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS && window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && window.DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && window.DD_LOGS.removeUserProperty('type')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && window.DD_LOGS.clearUser()

window.DD_LOGS && window.DD_LOGS.getUser() // => {}
```

**참고**: `window.DD_LOGS` 검사는 SDK를 사용해 로딩 실패가 발생할 때 문제를 방지합니다.

#### 컨텍스트 수명 주기

기본적으로 글로벌 컨텍스트 및 사용자 컨텍스트는 현재 페이지 메모리에 저장되는데 이는 다음을 의미합니다.

- 페이지를 완전히 새로 고침한 후에는 유지되지 않습니다.
- 동일한 세션의 다른 탭 또는 창에서 공유되지 않습니다.

세션의 모든 이벤트에 추가하려면 모든 페이지에 첨부해야 합니다.

브라우저 SDK v4.49.0에서 `storeContextsAcrossPages` 설정 옵션이 도입되어 해당 컨텍스트는 [`localStorage`][12]에 보관될 수 있어 다음 작업이 가능합니다.

- 컨텍스트는 다시 전체 로드한 후에도 보존됩니다.
- 동일한 출처에서 열린 탭 간에 컨텍스트가 동기화됩니다.

하지만 이 기능에는 몇 가지 **제한 사항**이 있습니다:

- `localStorage`에 저장된 데이터는 사용자 세션보다 오래 지속되므로 이러한 상황에서 개인 식별 정보(PII)를 설정하는 것은 권장되지 않습니다.
- `localStorage` 데이터는 동일한 출처 (login.site.com ≠ app.site.com)에서만 공유되므로 이 기능은 `trackSessionAcrossSubdomains` 옵션과 호환되지 않습니다.
- `localStorage`는 기본적으로 5MiB로 제한되므로 애플리케이션별 데이터, Datadog 컨텍스트 및 `localStorage`에 보관된 기타 타사 데이터는 문제 방지를 위해 이 한도 내여야 합니다.

#### 로거 컨텍스트

로거가 생성된 후 다음이 가능합니다.

- `setContext (context: object)` API를 사용하여 로거에 대한 전체 컨텍스트를 설정합니다.
- `setContextProperty (key: string, value: any)` API를 사용하여 로커에 컨텍스트 속성을 설정합니다.

##### NPM

NPM의 경우 다음을 사용합니다.

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.setContextProperty('referrer', document.referrer)
```

##### CDN 비동기화

CDN 비동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContext("{'env': 'staging'}")
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContextProperty('referrer', document.referrer)
})
```

*참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백으로 래핑되어야 합니다. 이를 통해 SDK가 적절하게 로드될 때만 코드가 실행되도록 할 수 있습니다.

##### CDN 동기화

CDN 동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**참고**: `window.DD_LOGS` 검사는 SDK를 사용해 로딩 실패가 발생할 때 문제를 방지합니다.

### 상태별 필터링

Datadog 브라우저 로그 SDK가 초기화된 후 로거에 대한 최소 로그 수준이 API를 사용해 설정됩니다.

```
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

지정된 수준 이상인 상태의 로그만 전송됩니다.

#### NPM

NPM의 경우 다음을 사용합니다.

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setLevel('<LEVEL>')
```

#### CDN 비동기화

CDN 비동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setLevel('<LEVEL>')
})
```

*참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백으로 래핑되어야 합니다. 이를 통해 SDK가 적절하게 로드될 때만 코드가 실행되도록 할 수 있습니다.

#### CDN 동기화

CDN 동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**참고**: `window.DD_LOGS` 검사는 SDK를 사용해 로딩 실패가 발생할 때 문제를 방지합니다.

### 목적지 변경

기본적으로 Datadog 브라우저 로그 SDK로 생성된 로거는 로그를 Datadog로 전송합니다. Datadog 브라우저 로그 SDK가 초기화되면 로거를 다음과 같이 구성할 수 있습니다.

- `console` 및 Datadog(`http`)에 로그 전송
- `console`에만 로그 전송
- 로그를 전혀 전송하지 않음(`silent`)

```
setHandler (handler?: 'http' | 'console' | 'silent' | Array<handler>)
```

#### NPM

NPM의 경우 다음을 사용합니다.

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<HANDLER>')
datadogLogs.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

#### CDN 비동기화

CDN 비동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setHandler('<HANDLER>')
  window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
})
```

*참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백으로 래핑되어야 합니다. 이를 통해 SDK가 적절하게 로드될 때만 코드가 실행되도록 할 수 있습니다.

#### CDN 동기화

CDN 동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**참고**: `window.DD_LOGS` 검사는 SDK를 사용해 로딩 실패가 발생할 때 문제를 방지합니다.

### 사용자 추적 동의

GDPR, CCPA 및 유사한 규정을 준수하기 위해 Logs Browser SDK를 사용하면 초기화 시 추적 동의 값을 제공할 수 있습니다.

`trackingConsent` 초기화 파라미터는 다음 값 중 하나가 될 수 있습니다.

1. `"granted"`: Logs Browser SDK가 데이터 수집을 시작하고 이를 Datadog으로 보냅니다.
2. `"not-granted"`: Logs Browser SDK는 데이터를 수집하지 않습니다.

Logs Browser SDK가 초기화된 후 추적 동의 값을 변경하려면 `setTrackingConsent()` API 호출을 사용하세요. Logs Browser SDK는 새 값에 따라 동작을 변경합니다.

* `"granted"`에서 `"not-granted"`로 변경되면 로그 세션이 중지되고 데이터가 더 이상 Datadog으로 전송되지 않습니다.
* `"not-granted"`에서 `"granted"`로 변경하면 이전 세션이 활성화되지 않은 경우 새 로그 세션이 생성되고 데이터 수집이 재개됩니다.

이 상태는 탭 간에 동기화되지 않으며 탐색 간에 유지되지 않습니다. Logs Browser SDK를 초기화하는 동안 또는 `setTrackingConsent()`를 통해 사용자 결정을 제공하는 것은 사용자의 책임입니다.

`init()`전에 `setTrackingConsent()`를 사용하면 제공된 값이 초기화 파라미터보다 우선합니다.

#### NPM

NPM의 경우 다음을 사용합니다.

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
    ...,
    trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', function() {
    datadogLogs.setTrackingConsent('granted');
});
```

#### CDN 비동기화

CDN 비동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        trackingConsent: 'not-granted'
    });
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS.onReady(function() {
        window.DD_LOGS.setTrackingConsent('granted');
    });
});
```

#### CDN 동기화

CDN 동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS && window.DD_LOGS.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS && window.DD_LOGS.setTrackingConsent('granted');
});
```

### 내부 컨텍스트 액세스

Datadog 브라우저 로그 SDK가 초기화된 후 SDK 내부 컨텍스트에 액세스할 수 있습니다. 이를 통해 `session_id`에 액세스할 수 있습니다.

```
getInternalContext (startTime?: 'number' | undefined)
```

선택적으로 `startTime` 파라미터를 사용하여 특정 시간의 컨텍스트를 확보할 수 있습니다. 파라미터가 제거된 경우 현재 컨텍스트가 반환됩니다.

#### NPM

NPM의 경우 다음을 사용합니다.

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

#### CDN 비동기화

CDN 비동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
})
```

#### CDN 동기화

CDN 동기화의 경우 다음을 사용합니다.

```javascript
window.DD_LOGS && window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

<!-- Note: all URLs should be absolute -->

[1]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#client-tokens
[3]: https://www.npmjs.com/package/@datadog/browser-logs
[4]: https://github.com/DataDog/browser-sdk/blob/main/packages/logs/BROWSER_SUPPORT.md
[5]: https://docs.datadoghq.com/ko/real_user_monitoring/guide/enrich-and-control-rum-data/
[6]: https://docs.datadoghq.com/ko/real_user_monitoring/faq/proxy_rum_data/
[7]: https://docs.datadoghq.com/ko/getting_started/tagging/#define-tags
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Reporting_API
[9]: https://docs.datadoghq.com/ko/getting_started/site/
[10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[11]: https://docs.datadoghq.com/ko/logs/log_collection/javascript/#contexts-life-cycle
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[14]: /ko/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[15]: #user-tracking-consent