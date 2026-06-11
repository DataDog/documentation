---
algolia:
  tags:
  - browser logs
aliases:
- /ko/logs/log_collection/web_browser
title: 브라우저 로그 수집
---
브라우저 로그 SDK를 사용해 웹 브라우저 페이지에서 Datadog로 로그를 보냅니다.

브라우저 로그 SDK를 사용하면 웹 브라우저 페이지에서 직접 Datadog로 로그를 보낼 수 있고, 다음과 같은 기능을 활용할 수 있습니다.

 SDK를 로거로 사용합니다. 모든 항목이 Datadog에 JSON 문서로 전달됩니다.
 전송한 각 로그에 `context` 및 추가 사용자 지정 특성을 추가합니다.
 모든 프런트엔드 오류를 자동으로 래핑하고 전달합니다.
 프런트엔드 오류를 전달합니다.
 실제 클라이언트 IP 주소 및 사용자 에이전트를 기록합니다.
 자동 일괄 포스트를 사용해 네트워크 사용량을 최적화합니다.
 Worker 및 Service Worker 환경에서 사용합니다.

**참고**:

 **RUM SDK와 무관**: 브라우저 로그 SDK는 RUM SDK 없이 사용할 수 있습니다.
 **Worker 환경**: 브라우저 로그 SDK는 Worker 및 Service Worker 환경에서 같은 설정 방법을 사용하여 작동합니다. 하지만 Worker 환경에서 보낸 로그에는 세션 정보가 자동으로 포함되지 않습니다.

## 설정

### 1단계 클라이언트 토큰 생성

Datadog에서 [**조직 설정 > 새 클라이언트 토큰**][1]으로 이동

**지원되는 환경**: 브라우저 로그 SDK는 모든 최신 데스크톱 및 모바일 브라우저, 그리고 Worker 및 Service Worker 환경을 지원합니다. [브라우저 지원][4] 표를 참조하세요.

<div class="alert alert-info">보안상의 이유로, 브라우저 로그 SDK를 구성하는 데 <a href="https://docs.datadoghq.com/account_management/api-app-keys/#api-keys">API 키</a>를 사용할 수는 없습니다. 해당 키가 JavaScript 코드의 클라이언트 측에 노출되기 때문입니다. 웹 브라우저에서 로그를 수집하려면 반드시 <a href="https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens">클라이언트 토큰</a>을 사용해야 합니다.</div>  

### 2단계 로그 브라우저 SDK 설치

브라우저 SDK의 설치 방법을 선택합니다.

{{< tabs >}}
{{% tab "NPM" %}}

최신 웹 애플리케이션의 경우, Datadog에서는 노드 패키지 관리자(npm)를 통해 설치하는 편을 권장합니다. 브라우저 SDK는 나머지 프런트엔드 JavaScript 코드로 패키징됩니다. 페이지 로드 성능에는 아무런 영향이 없습니다. 하지만 SDK가 해당 SDK를 초기화하기 전에 발생하는 오류 또는 콘솔 로그를 캡처하지 않을 가능성이 있습니다. Datadog에서는 브라우저 로그 SDK와 일치하는 버전을 사용하도록 권장합니다.  

[`@datadog/browserlogs`][13]를 `package.json` 파일에 추가합니다. 예를 들어 npm cli를 사용하는 경우입니다.  

[13]: https://www.npmjs.com/package/@datadog/browserlogs

{{% /tab %}}
{{% tab "CDN async" %}}

성능 목표가 있는 웹 애플리케이션은 CDN async를 통해 설치해야 합니다. 브라우저 SDK는 Datadog의 CDN에서 비동기식으로 로드되어 페이지 로드 성능에 영향을 미치지 않습니다. 하지만 SDK가 해당 SDK를 초기화하기 전에 발생하는 오류 또는 콘솔 로그를 캡처하지 않을 가능성이 있습니다.  

애플리케이션에서 모니터링하고자 하는 모든 HTML 페이지의 헤드 태그에 생성된 코드 스니펫을 추가합니다.

{{< site-region region="us" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v6.js','DD_LOGS')
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{% tab "CDN sync" %}}

모든 이벤트를 수집하려면 CDN sync를 통해 설치해야 합니다. 브라우저 SDK가 Datadog의 CDN에서 동기식으로 로드되어 SDK가 먼저 로드되고 모든 오류, 리소스와 사용자 액션을 수집합니다. 이 방법은 페이지 로드 성능에 영향을 미칠 수 있습니다.  

애플리케이션에서 모니터링하고자 하는 모든 HTML 페이지의 헤드 태그(다른 모든 스크립트 태그 앞)에 생성된 코드 스니펫을 추가합니다. 스크립트 태그를 더 높이 배치하고 동기식으로 로드하면 Datadog RUM이 모든 성능 데이터와 오류를 수집할 수 있습니다.

{{< site-region region="us" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/eu/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/datadog-logs-v6.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### 3단계 로그 브라우저 SDK 초기화

SDK는 앱 수명 주기에서 최대한 일찍 초기화되어야 합니다. 이렇게 해야 모든 로그가 정확하게 캡처됩니다.

초기화 스니펫에서 클라이언트 토큰과 사이트를 설정합니다. [초기화 파라미터][4]의 전체 목록을 참조하세요.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
  clientToken: '<CLIENT_TOKEN>',
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
});

```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
<script>
  window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
      clientToken: '<CLIENT_TOKEN>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: '<DATADOG_SITE>',
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
    });
  })
</script>
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
<script>
    window.DD_LOGS && window.DD_LOGS.init({
      clientToken: '<CLIENT_TOKEN>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: '<DATADOG_SITE>',
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
    });
</script>
```

{{% /tab %}}
{{< /tabs >}}

#### 추적 동의 구성(GDPR 규정 준수)

RUM 브라우저 SDK는 GDPR, CCPA 및 유사한 규정을 준수하기 위해 [초기화 시 추적 동의 값][5]을 제공하게 해줍니다.

#### 콘텐츠 보안 정책(CSP) 구성

사이트에서 Datadog 콘텐츠 보안 정책(CSP) 통합을 사용하는 경우, 추가적인 설정 단계를 [CSP 설명서][6]에서 참조하세요.

### 4단계 데이터 시각화

이렇게 해서 로그 기본 설정을 완료했으므로, 애플리케이션이 브라우저 로그를 수집하며 실시간으로 문제 모니터링과 디버깅을 시작할 수 있습니다.

[Log Explorer][7]에서 로그를 시각화합니다.

## 사용량

### 사용자 지정 로그

Datadog 브라우저 로그 SDK가 초기화된 후 API를 사용해 사용자 지정 로그 항목을 Datadog에 직접 전송합니다.

```typescript
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
})
```

**참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백에서 래핑되어야 합니다. 이렇게 해야 SDK가 적절히 로드된 다음에만 코드가 실행됩니다.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**참고**: `window.DD_LOGS` 검사는 SDK와 관련해 로딩이 실패할 경우 발생하는 문제를 방지합니다.

{{% /tab %}}
{{< /tabs >}}

#### 결과

NPM, CDN async 또는 CDN sync 사용 시 결과는 모두 같음:

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

로그 SDK가 기본적으로 다음 정보를 추가합니다(RUM SDK가 있는 경우 더 많은 필드가
추가될 수 있음).

 `date`
 `view.url`
 `view.referrer`
 `session_id`(세션이 사용된 경우에만)

Datadog 백엔드는 다음과 같은 더 많은 필드를 추가합니다.

 `http.useragent`
 `network.client.ip`

### Error tracking

Datadog 브라우저 로그 SDK를 사용하면 선택 사항인 `error` 파라미터(SDK v4.36.0+에서 사용 가능)를 사용하여 수동으로 오류를 추적할 수 있습니다. [JavaScript 오류][8]의 인스턴스가 제공된 경우, SDK가 해당 오류에서 관련 정보(종류, 메시지, 스택 트레이스)를 추출합니다.

```typescript
logger.{debug|info|warn|error}(message: string, messageContext?: Context, error?: Error)
```

{{< tabs >}}
{{% tab "NPM" %}}

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

{{% /tab %}}
{{% tab "CDN async" %}}

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

**참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백에서 래핑되어야 합니다. 이렇게 해야 SDK가 적절히 로드된 다음에만 코드가 실행됩니다.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
    window.DD_LOGS && window.DD_LOGS.logger.error('Error occurred', {}, ex)
}
```

**참고**: `window.DD_LOGS` 검사는 SDK와 관련해 로딩이 실패할 경우 발생하는 문제를 방지합니다.

{{% /tab %}}
{{< /tabs >}}

#### 결과

NPM, CDN async 또는 CDN sync 사용 시 결과는 모두 같음:

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

### 일반 로거 함수

Datadog 브라우저 로그 SDK는 편의상 로거에 약식 함수(`.debug`, `.info`, `.warn`, `.error`)를 추가합니다. 일반 로거 함수도 사용할 수 있으며, 이 경우 `status` 파라미터가 노출됩니다.

```typescript
log(message: string, messageContext?: Context, status? = 'debug' | 'info' | 'warn' | 'error', error?: Error)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function() {
  window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
})
```

**참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백에서 래핑되어야 합니다. 이렇게 해야 SDK가 적절히 로드된 다음에만 코드가 실행됩니다.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

**참고**: `window.DD_LOGS` 검사는 SDK와 관련해 로딩이 실패할 경우 발생하는 문제를 방지합니다.

{{% /tab %}}
{{< /tabs >}}

#### 플레이스홀더

위 예시에서 사용한 플레이스홀더의 설명은 아래를 참조하세요.

| 플레이스홀더         | 설명                                                                             |
|  |  |
| `<MESSAGE>`         | Datadog가 전체 인덱싱한 로그의 메시지입니다.                               |
| `<JSON_ATTRIBUTES>` | 유효한 JSON 개체이며, `<MESSAGE>`에 연결된 모든 특성을 포함합니다.         |
| `<STATUS>`          | 로그의 상태이며, 허용되는 상태 값은 `debug`, `info`, `warn` 또는 `error`입니다. |
| `<ERROR>`           | [JavaScript 오류][8] 개체의 인스턴스입니다.                                         |

## 고급 사용

### 브라우저 로그에서 민감한 데이터 스크러빙

브라우저 로그에 삭제해야 하는 민감한 정보가 포함된 경우, 브라우저 로그 컬렉터를 초기화할 때 `beforeSend` 콜백을 사용해 브라우저 SDK가 민감한 시퀀스를 스크러빙하도록 구성하세요.

`beforeSend` 콜백 함수는 두 가지 인수인 `log` 이벤트 및 `context`로 호출할 수 있습니다. 이 함수를 사용하면 Datadog로 전송되기 전에 브라우저 SDK가 수집한 각 로그에 액세스할 수 있으며, 컨텍스트를 사용해 로그 속성을 조정할 수 있습니다. 컨텍스트에는 이벤트와 관련되지만, 이벤트에 꼭 포함되는 것은 아닌 추가 정보가 포함됩니다. 일반적으로 이 정보를 사용해 이벤트를 [강화][11]하거나 [폐기][12]할 수 있습니다.

```javascript
function beforeSend(log, context)
```

잠재적 `context` 값은 다음과 같습니다.

| 값 | 데이터 유형 | 사용 사례 |
||||
| `isAborted` | 부울 | 네트워크 로그 이벤트의 경우, 이 속성을 통해 애플리케이션이 실패하는 요청을 중단했는지 여부를 알 수 있습니다. 이 경우, 이 이벤트가 고의로 중단될 가능성이 있으므로 이벤트를 보내지 않는 것이 좋습니다. |
| `handlingStack` | 문자열 | 로그 이벤트가 처리된 스택 트레이스입니다. 이것을 사용해 로그를 어느 [마이크로프런트엔드][9]에서 보냈는지 확인할 수 있습니다. |

웹 애플리케이션 URL에서 이메일 주소를 삭제하는 방법:

{{< tabs >}}
{{% tab "NPM" %}}

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

{{% /tab %}}
{{% tab "CDN async" %}}

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

**참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백에서 래핑되어야 합니다. 이렇게 해야 SDK가 적절히 로드된 다음에만 코드가 실행됩니다.

{{% /tab %}}
{{% tab "CDN sync" %}}

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

**참고**: `window.DD_LOGS` 검사는 SDK와 관련해 로딩이 실패할 경우 발생하는 문제를 방지합니다.

{{% /tab %}}
{{< /tabs >}}

다음 속성은 SDK가 자동으로 수집하며, 민감한 데이터를 포함할 수 있습니다.

| 특성       | 유형   | 설명                                                                                      |
|  |  |  |
| `view.url`      | 문자열 | 활성 웹 페이지의 URL입니다.                                                                  |
| `view.referrer` | 문자열 | 현재 요청된 페이지로 연결된 링크를 따라온 이전 웹 페이지의 URL입니다. |
| `message`       | 문자열 | 로그의 내용입니다.                                                                          |
| `error.stack`   | 문자열 | 오류에 관한 스택 트레이스 또는 보충 정보입니다.                                    |
| `http.url`      | 문자열 | HTTP URL입니다.                                                                                    |

### 특정 로그 삭제

`beforeSend` 콜백 함수를 사용하면 로그를 Datadog로 보내기 전에 삭제할 수도 있습니다.

네트워크 오류의 상태가 404인 경우 해당 오류를 삭제하는 방법:

{{< tabs >}}
{{% tab "NPM" %}}

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

{{% /tab %}}
{{% tab "CDN async" %}}

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

**참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백에서 래핑되어야 합니다. 이렇게 해야 SDK가 적절히 로드된 다음에만 코드가 실행됩니다.

{{% /tab %}}
{{% tab "CDN sync" %}}

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

**참고**: `window.DD_LOGS` 검사는 SDK와 관련해 로딩이 실패할 경우 발생하는 문제를 방지합니다.

{{% /tab %}}
{{< /tabs >}}

### 여러 로거 정의

Datadog 브라우저 로그 SDK에는 기본 로거가 포함되지만, 다른 로거를 정의할 수도 있습니다.

#### 새 로거 생성

Datadog 브라우저 로그 SDK가 초기화되고 나서, API `createLogger`를 사용해 새 로거를 정의합니다.

```typescript
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**참고**: 이러한 파라미터는 [setLevel](#filterbystatus), [setHandler](#changethedestination) 및 [setContext](#overwritecontext) API를 사용해 설정할 수 있습니다.

#### 사용자 지정 로거 가져오기

로거를 생성하고 나서, 다음 API를 사용해 JavaScript 코드의 아무 부분에서나 액세스합니다.

```typescript
getLogger(name: string)
```

{{< tabs >}}
{{% tab "NPM" %}}

예를 들어 다른 모든 로거로 정의된 `signupLogger`가 있다고 가정하는 경우:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', {
  level: 'info',
  handler: 'http',
  context: { env: 'staging' }
})
```

다음을 사용해 이것을 코드의 다른 부분에서 사용 가능:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "CDN async" %}}

예를 들어 다른 모든 로거로 정의된 `signupLogger`가 있다고 가정하는 경우:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
})
```

다음을 사용해 이것을 코드의 다른 부분에서 사용 가능:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백에서 래핑되어야 합니다. 이렇게 해야 SDK가 적절히 로드된 다음에만 코드가 실행됩니다.

{{% /tab %}}
{{% tab "CDN sync" %}}

예를 들어 다른 모든 로거로 정의된 `signupLogger`가 있다고 가정하는 경우:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
}
```

다음을 사용해 이것을 코드의 다른 부분에서 사용 가능:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**참고**: `window.DD_LOGS` 검사는 SDK와 관련해 로딩이 실패할 경우 발생하는 문제를 방지합니다.

{{% /tab %}}
{{< /tabs >}}

### 컨텍스트 덮어쓰기

#### 글로벌 컨텍스트

Datadog 브라우저 로그 SDK가 초기화되고 나면, 다음과 같이 할 수 있습니다.

 `setGlobalContext (context: object)` API를 사용해 모든 로거에 대한 전체 컨텍스트를 설정합니다.
 `setGlobalContextProperty (key: string, value: any)` API를 사용해 모든 로거에 컨텍스트를 추가합니다.
 `getGlobalContext ()` API를 사용해 전체 글로벌 컨텍스트를 가져옵니다.
 `removeGlobalContextProperty (key: string)` API를 사용해 컨텍스트 속성을 제거합니다.
 `clearGlobalContext ()` API를 사용해 기존 컨텍스트 속성을 모두 지웁니다.

> 로그 브라우저 SDK v4.17.0에서는 여러 API 이름이 다음과 같이 업데이트되었습니다.
>
`getLoggerGlobalContext` 대신 >  `getGlobalContext`
`setLoggerGlobalContext` 대신 >  `setGlobalContext`
`addLoggerGlobalContext` 대신 >  `setGlobalContextProperty`
`removeLoggerGlobalContext` 대신 >  `removeGlobalContextProperty`

{{< tabs >}}
{{% tab "NPM" %}}

NPM의 경우, 다음 사용:

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

{{% /tab %}}
{{% tab "CDN async" %}}

CDN async의 경우, 다음 사용:

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

**참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백에서 래핑되어야 합니다. 이렇게 해야 SDK가 적절히 로드된 다음에만 코드가 실행됩니다.

{{% /tab %}}
{{% tab "CDN sync" %}}

CDN sync의 경우, 다음 사용:

```javascript
window.DD_LOGS && window.DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && window.DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && window.DD_LOGS.clearGlobalContext()

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {}
```

**참고**: `window.DD_LOGS` 검사는 SDK와 관련해 로딩이 실패할 경우 발생하는 문제를 방지합니다.

{{% /tab %}}
{{< /tabs >}}

#### 사용자 컨텍스트

Datadog 로그 SDK는 `User`를 생성된 로그와 연결하는 편리한 함수를 제공합니다.

 `setUser (newUser: User)` API를 사용해 사용자를 모든 로그에 대해 설정합니다.
 `setUserProperty (key: string, value: any)` API를 사용해 모든 로거에 대하여 사용자 속성을 추가하거나 수정합니다.
 `getUser ()` API를 사용해 현재 저장된 사용자를 가져옵니다.
 `removeUserProperty (key: string)` API를 사용해 사용자 속성을 제거합니다.
 `clearUser ()` API를 사용해 기존 사용자 속성을 모두 지웁니다.

**참고**: 사용자 컨텍스트가 글로벌 컨텍스트 전에 적용됩니다. 따라서 글로벌 컨텍스트에 포함된 모든 사용자 속성이 로그 생성 시 사용자 컨텍스트를 재정의하게 됩니다.

{{< tabs >}}
{{% tab "NPM" %}}

NPM의 경우, 다음 사용:

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

{{% /tab %}}
{{% tab "CDN async" %}}

CDN async의 경우, 다음 사용:

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

**참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백에서 래핑되어야 합니다. 이렇게 해야 SDK가 적절히 로드된 다음에만 코드가 실행됩니다.

{{% /tab %}}
{{% tab "CDN sync" %}}

CDN sync의 경우, 다음 사용:

```javascript
window.DD_LOGS && window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && window.DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && window.DD_LOGS.removeUserProperty('type')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && window.DD_LOGS.clearUser()

window.DD_LOGS && window.DD_LOGS.getUser() // => {}
```

**참고**: `window.DD_LOGS` 검사는 SDK와 관련해 로딩이 실패할 경우 발생하는 문제를 방지합니다.

{{% /tab %}}
{{< /tabs >}}

#### 계정 컨텍스트

Datadog 로그 SDK는 `Account`를 생성된 로그와 연결하는 편리한 함수를 제공합니다.

 `setAccount (newAccount: Account)` API를 사용해 계정을 모든 로거에 대해 설정합니다.
 `setAccountProperty (key: string, value: any)` API를 사용해 모든 로거에 대하여 계정 속성을 추가하거나 수정합니다.
 `getAccount ()` API를 사용해 현재 저장된 계정을 가져옵니다.
 `removeAccountProperty (key: string)` API를 사용해 계정 속성을 제거합니다.
 `clearAccount ()` API를 사용해 기존 계정 속성을 모두 지웁니다.

**참고**: 계정 컨텍스트가 글로벌 컨텍스트 전에 적용됩니다. 따라서 글로벌 컨텍스트에 포함된 모든 계정 속성이 로그 생성 시 계정 컨텍스트를 재정의하게 됩니다.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setAccount({ id: '1234', name: 'My Company Name' })
datadogLogs.setAccountProperty('type', 'premium')
datadogLogs.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

datadogLogs.removeAccountProperty('type')
datadogLogs.getAccount() // => {id: '1234', name: 'My Company Name'}

datadogLogs.clearAccount()
datadogLogs.getAccount() // => {}
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setAccountProperty('type', 'premium')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeAccountProperty('type')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearAccount()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {}
})
```

**참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백에서 래핑되어야 합니다. 이렇게 해야 SDK가 적절히 로드된 다음에만 코드가 실행됩니다.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })

window.DD_LOGS && window.DD_LOGS.setAccountProperty('type', 'premium')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

window.DD_LOGS && window.DD_LOGS.removeAccountProperty('type')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}

window.DD_LOGS && window.DD_LOGS.clearAccount()

window.DD_LOGS && window.DD_LOGS.getAccount() // => {}
```

**참고**: `window.DD_LOGS` 검사는 SDK와 관련해 로딩이 실패할 경우 발생하는 문제를 방지합니다.

{{% /tab %}}
{{< /tabs >}}

#### 컨텍스트 수명 주기

기본적으로 컨텍스트는 현재 페이지 메모리에 저장되며, 이는 다음과 같은 의미입니다.

 페이지를 완전히 다시 로드한 이후 유지되지 않음
 같은 세션의 다른 탭 또는 창에서 공유되지 않음

컨텍스트를 세션의 모든 이벤트에 추가하려면 모든 페이지에 연결해야 합니다.

브라우저 SDK의 v4.49.0에 `storeContextsAcrossPages` 구성 옵션이 도입되어서, 그러한 컨텍스트를 [`localStorage`][9]에 저장할 수 있으므로 다음과 같은 동작이 가능합니다.

 전체 다시 로드 이후에도 컨텍스트가 보존됨
 동일한 출처에서 열린 탭 간에 컨텍스트가 동기화됨

단, 이 기능에는 몇 가지 **제한 사항**이 있습니다.

 `localStorage`에 저장된 데이터는 사용자 세션보다 오래 지속되므로 이러한 상황에서 개인 식별 정보(PII)를 설정하는 것은 권장되지 않습니다.
 `localStorage` 데이터는 동일한 출처 (login.site.com ≠ app.site.com)에서만 공유되므로 이 기능은 `trackSessionAcrossSubdomains` 옵션과 호환되지 않습니다.
 `localStorage`는 출처별로 5 MiB라는 제한이 있으므로, `localStorage`에 저장된 애플리케이션별 데이터, Datadog 컨텍스트 및 기타 타사 데이터는 이 한도 내에 있어야 문제를 방지할 수 있습니다.

#### 로거 컨텍스트

로거가 생성되고 나면, 다음과 같이 할 수 있습니다.

 `setContext (context: object)` API를 사용해 로거에 대하여 전체 컨텍스트를 설정합니다.
 `setContextProperty (key: string, value: any)` API를 사용해 로거에서 컨텍스트 속성을 설정:

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.setContextProperty('referrer', document.referrer)
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContext("{'env': 'staging'}")
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContextProperty('referrer', document.referrer)
})
```

**참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백에서 래핑되어야 합니다. 이렇게 해야 SDK가 적절히 로드된 다음에만 코드가 실행됩니다.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**참고**: `window.DD_LOGS` 검사는 SDK와 관련해 로딩이 실패할 경우 발생하는 문제를 방지합니다.

{{% /tab %}}
{{< /tabs >}}

### 상태 기준 필터링

Datadog 브라우저 로그 SDK가 초기화된 후 로거에 대한 최소 로그 수준이 API를 사용해 설정됩니다.

```typescript
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

지정된 수준 이상인 상태의 로그만 전송됩니다.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setLevel('<LEVEL>')
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setLevel('<LEVEL>')
})
```

**참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백에서 래핑되어야 합니다. 이렇게 해야 SDK가 적절히 로드된 다음에만 코드가 실행됩니다.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**참고**: `window.DD_LOGS` 검사는 SDK와 관련해 로딩이 실패할 경우 발생하는 문제를 방지합니다.

{{% /tab %}}
{{< /tabs >}}

### 대상 변경

기본적으로 Datadog 브라우저 로그 SDK가 생성한 로거는 Datadog로 로그를 보냅니다. Datadog 브라우저 로그 SDK가 초기화되고 나면, 로거를 구성해 다음과 같이 할 수 있습니다.

 `console` 및 Datadog(`http`)에 로그 보내기
 `console`에만 로그 보내기
 로그를 보내지 않음(`silent`)

```typescript
setHandler (handler?: 'http' | 'console' | 'silent' | Array<handler>)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<HANDLER>')
datadogLogs.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

{{% /tab %}}

{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setHandler('<HANDLER>')
  window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
})
```

**참고**: 초기 API 호출은 `window.DD_LOGS.onReady()` 콜백에서 래핑되어야 합니다. 이렇게 해야 SDK가 적절히 로드된 다음에만 코드가 실행됩니다.

{{% /tab %}}
{{% tab "CDN sync" %}}

CDN sync의 경우, 다음 사용:

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**참고**: `window.DD_LOGS` 검사는 SDK와 관련해 로딩이 실패할 경우 발생하는 문제를 방지합니다.

{{% /tab %}}
{{< /tabs >}}

### 사용자 추적 동의

로그 브라우저 SDK는 GDPR, CCPA 및 유사한 규정을 준수하기 위해 초기화 시 추적 동의 값을 제공하게 해줍니다.

`trackingConsent` 초기화 파라미터는 다음 값 중 하나일 수 있습니다.

1. `"granted"`: 로그 브라우저 SDK가 데이터를 수집하기 시작하고 이를 Datadog로 보냅니다.
2. `"notgranted"`: 로그 브라우저 SDK가 데이터를 수집하지 않습니다.

로그 브라우저 SDK가 초기화된 다음에 추적 동의 값을 변경하려면 `setTrackingConsent()` API 호출을 사용합니다. 로그 브라우저 SDK는 새 값에 따라 동작을 변경합니다.

 `"granted"`에서 `"notgranted"`로 변경된 경우, 로그 세션이 중지되고 더 이상 데이터를 Datadog로 보내지 않습니다.
 `"notgranted"`에서 `"granted"`로 변경된 경우, 활성 상태인 이전 세션이 없는 경우 새 로그 세션이 생성되고 데이터 수집이 재개됩니다.

이 상태는 탭 간에 동기화되지 않고, 탐색 간에 지속되지도 않습니다. 사용자에게는 로그 브라우저 SDK 초기화 중에 또는 `setTrackingConsent()`를 사용해 사용자 결정을 제공할 책임이 있습니다.

`setTrackingConsent()`를 `init()` 이전에 사용한 경우, 제공된 값이 초기화 파라미터보다 우선합니다.

{{< tabs >}}
{{% tab "NPM" %}}

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

{{% /tab %}}
{{% tab "CDN async" %}}

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

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS && window.DD_LOGS.setTrackingConsent('granted');
});
```

{{% /tab %}}
{{< /tabs >}}

### 내부 컨텍스트 액세스

Datadog 브라우저 로그 SDK가 초기화되고 나면, 해당 SDK의 내부 컨텍스트에 액세스할 수 있습니다. 이렇게 하면 `session_id`에 액세스할 수 있습니다.

```typescript
getInternalContext (startTime?: 'number' | undefined)
```

선택 사항으로 `startTime` 파라미터를 사용해 특정 시간의 컨텍스트를 가져올 수 있습니다. 파라미터가 생략된 경우, 현재 컨텍스트가 반환됩니다.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

{{% /tab %}}

{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
})
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

{{% /tab %}}
{{< /tabs >}}

<!-- Note: all URLs should be absolute -->

[1]: https://app.datadoghq.com/organizationsettings/clienttokens
[4]: https://datadoghq.dev/browsersdk/interfaces/_datadog_browserlogs.LogsInitConfiguration.html
[5]: /ko/logs/log_collection/javascript/#usertrackingconsent
[6]: /ko/integrations/content_security_policy_logs/#usecspwithrealusermonitoringandsessionreplay
[7]: /ko/logs/explorer/
[8]: <https: developer.mozilla.org en-us docs web javascript reference global_objects error>
[9]: https://developer.mozilla.org/enUS/docs/Web/API/Window/localStorage
[11]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrichandcontrolrumdata
[12]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#discardarumevent