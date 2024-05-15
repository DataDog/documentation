---
aliases:
- /ko/real_user_monitoring/setup
further_reading:
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: RUM Explorer에 대해 자세히 알아보기
- link: /logs/log_collection/javascript/
  tag: 설명서
  text: 로그를 위한 Datadog Browser SDK에 대해 자세히 알아보기
kind: 설명서
title: RUM 브라우저 모니터링
---

## 개요

Datadog 실제 사용자 모니터링(RUM)을 사용하면 애플리케이션의 개별 사용자의 사용자 여정과 실시간 성능을 시각화하고 분석할 수 있습니다. 이벤트를 수집하려면 RUM 브라우저 SDK를 브라우저 애플리케이션에 추가하고 초기화 파라미터를 사용해 어떤 데이터를 수집할지 설정합니다.

사용자 데이터를 안전하게 유지하는 책임은 Datadog과 RUM SDK를 활용하는 개발자 간에 공유됩니다. [책임 공유][1]에 대해 자세히 알아보세요.

## 설정

RUM Browser SDK는 IE11을 포함한 모든 최신 데스크톱 및 모바일 브라우저를 지원합니다. 자세한 내용은 [브라우저 지원][2] 표를 참조하세요.

RUM 브라우저 모니터링을 설정하려면, RUM 애플리케이션을 생성합니다.

1. Datadog에서 [**Digital Experience** > **Add an Application** 페이지][3] 로 이동하여 JavaScript(JS) 애플리케이션 유형을 선택합니다.
   - 기본적으로 자동 사용자 데이터 수집이 활성화되어 있습니다. 클라이언트 IP 또는 지리적 위치 데이터에 대한 자동 사용자 데이터 수집을 비활성화하려면 해당 설정을 선택 취소합니다. 자세한 내용은 [수집되는 RUM 브라우저 데이터][4]를 참조하세요.
   - 애플리케이션 이름을 입력하고 **클라이언트 토큰 생성**을 클릭합니다. 이를 통해 애플리케이션에 대해 `clientToken` 및 `applicationId`를 생성할 수 있습니다. 
   - RUM 브라우저 SDK에 대해 설치 유형을 선택합니다. [npm](#npm), 또는 호스팅된 버전 ([CDN 비동기화](#cdn-async) 또는 [CDN 동기화](#cdn-sync))를 선택할 수 있습니다.
   - [RUM 및 세션 재생][5]에 통합 서비스 태깅을 사용하려면 애플리케이션의 환경 이름과 서비스 이름을 정의합니다. 초기화 스니펫에서 배포된 애플리케이션의 버전 번호를 설정합니다. 자세한 내용은 [태그 지정]((#tagging)을 참조하세요.
   - 수집된 총 사용자 세션의 샘플링 속도를 설정하고 슬라이더를 사용하여 수집된 총 [브라우저 RUM 및 세션 재생][6] 세션의 백분율을 설정합니다. 브라우저 RUM 및 세션 재생 세션에는 리소스, 장기 작업 및 재생 녹화가 포함됩니다. 총 사용자 세션 수에서 수집된 브라우저 RUM 및 세션 재생 세션의 비율 설정에 대한 내용은 [브라우저와 브라우저 RUM 및세션 재생 샘플링에 대한 설정][7]을 참조하세요.
   - **Session Replay Enabled** 토글을 클릭하여 [세션 재생][8]에서 재생 녹화에 액세스합니다.
   - 드롭다운 메뉴에서 세션 재생에 대한 [개인정보 설정][9]을 선택합니다.
2. 애플리케이션에 변경 사항을 구축합니다. 구축이 프로덕션으로 전환되면 Datadog가 사용자 브라우저에서 이벤트를 수집합니다.
3. [대시보드][10]에서 [수집된 데이터][4]를 시각화하거나 [RUM Explorer][11]에서 검색 쿼리를 생성하세요.
4. (선택 사항) 웹 및 모바일 애플리케이션의 요청을 해당 백엔드 트레이스에 연결하려면 [RUM과 트레이스 연결][12]을 위해`allowedTracingUrls` 파라미터를 사용하여 RUM SDK를 초기화합니다. [초기화 파라미터](#initialization-parameter)의 전체 목록을 확인하세요.
5. 사이트에서 Datadog 콘텐츠 보안 정책(CSP) 통합을 사용하는 경우 [CSP 설명서의 RUM 섹션][13]을 참조하여 추가로 설정하세요.

Datadog이 데이터 수신을 시작할 때까지 애플리케이션은 **RUM Applications** 페이지에 `pending`으로 표시됩니다.

### 올바른 설치 방법 선택

npm (node package manager)
: 이 방법은 최신 웹 애플리케이션에 권장됩니다. RUM Browser SDK는 나머지 프런트엔드 JavaScript 코드와 함께 패키지로 제공됩니다. 페이지 로드 성능에는 영향을 미치지 않습니다. 그러나 SDK가 초기화되기 전에 트리거된 오류, 리소스 및 사용자 작업을 놓칠 수 있습니다. Datadog은 Browser Logs SDK와 일치하는 버전을 사용할 것을 권장합니다.

CDN async
: 이 방법은 성능 목표가 있는 웹 애플리케이션에 권장됩니다. RUM 브라우저 SDK는 CDN에서 비동기식으로 로드되므로 SDK 다운로드가 페이지 로드 성능에 영향을 미치지 않습니다. 그러나 SDK가 초기화되기 전에 트리거된 오류, 리소스 및 사용자 작업을 놓칠 수 있습니다.


CDN sync
: 이 방법은 모든 RUM 이벤트를 수집하는 데 권장됩니다. RUM 브라우저 SDK는 CDN에서 동기식으로 로드되므로 SDK가 먼저 로드되고 모든 오류, 리소스 및 사용자 작업을 수집합니다. 이 방법은 페이지 로드 성능에 영향을 줄 수 있습니다.

### npm

`package.json` 파일에 [`@datadog/browser-rum`][14]을 추가한 후 다음을 사용하여 초기합니다.

<details open>
  <summary>최신 버전</summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site`는 조직의 Datadog 사이트 파라미터입니다.
  // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
});
```

</details>

<details>
  <summary><code>v5.0.0</code> 이전</summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site`는 조직의 Datadog 사이트 파라미터입니다.
  // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

</details>

<details>
  <summary><code>v4.30.0</code> 이전 </summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site`는 조직의 Datadog 사이트 파라미터입니다.
  // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
  trackResources: true,
  trackLongTasks: true,
  trackInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

</details>

<details>
  <summary><code>v4.20.0</code> 이전</summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site`는 조직의 Datadog 사이트 파라미터입니다.
  //https://docs.datadoghq.com/getting_started/site/를 참조하세요.
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
  trackInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

</details>

<details>
  <summary><code>v4.10.2</code> 이전</summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site`는 조직의 Datadog 사이트 파라미터입니다.
  // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  replaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
  trackInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

</details>

 `trackUserInteractions` 파라미터를 사용하면 애플리케이션에서 사용자 클릭 정보를 자동으로 수집할 수 있습니다. 이는 사용자가 상호작용한 요소를 확인할 목적으로 페이지의  **민감한 개인정보 데이터**가 포함될 수 있음을 의미합니다.

### CDN 비동기화

애플리케이션에서 모니터링하려는 모든 HTML 페이지의 헤드 태그에 생성된 코드 스니펫을 추가하세요. **{{<region-param key="dd_site_name">}}** 사이트의 경우:

<details open>
  <summary>최신 버전</summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다. 
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v5.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  })
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v5.0.0</code> 이전</summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경욱 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
     });
    window.DD_RUM.startSessionReplayRecording();
   })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다. 
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v4.30.0</code> 이전</summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v4.20.0</code> 이전</summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v4.10.2</code> 이전</summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

 `trackUserInteractions` 파라미터를 사용하면 애플리케이션에서 사용자 클릭 정보를 자동으로 수집할 수 있습니다. 이는 사용자가 상호작용한 요소를 확인할 목적으로 페이지의  **민감한 개인정보 데이터**가 포함될 수 있음을 의미합니다.

초기 RUM API 호출은 `window.DD_RUM.onReady()` 콜백으로 래핑해야 합니다. 이렇게 하면 SDK가 제대로 로드된 후에만 코드가 실행됩니다.

### CDN 동기화

생성된 코드 스니펫을 애플리케이션에서 모니터링하려는 모든 HTML 페이지의 헤드 태그(다른 스크립트 태그 앞)에 추가합니다. 더 상위의 동기화된 스크립트 태그를 포함하면 Datadog RUM이 모든 성능 데이터 및 오류를 수집할 수 있습니다. **{{<region-param key="dd_site_name">}}** 사이트의 경우: 

<details open>
  <summary>최신 버전</summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v5.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v5.0.0</code> 이전</summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v4.30.0</code> 이전</summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v4.20.0</code> 이전</summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary><code>v4.10.2</code> 이전</summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 포함되지 않은 경우 기본값은 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 포함되지 않은 경우 기본값 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 포함되지 않은 경우 기본값 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site`는 조직의 Datadog 사이트 파라미터입니다.
      // https://docs.datadoghq.com/getting_started/site/를 참조하세요.
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // 포함되지 않은 경우 기본값 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

 `trackUserInteractions` 파라미터를 사용하면 애플리케이션에서 사용자 클릭 정보를 자동으로 수집할 수 있습니다. 이는 사용자가 상호작용한 요소를 확인할 목적으로 페이지의  **민감한 개인정보 데이터**가 포함될 수 있음을 의미합니다.

`window.DD_RUM` 검사는 RUM 브라우저 SDK에서 로딩 실패가 발생할 경우 문제를 방지하는 데 사용됩니다.

### TypeScript

타입은 TypeScript >= 3.8.2와 호환됩니다. 이전 버전의 경우 JavaScript 소스를 가져오고 글로벌 변수를 사용하여 컴파일 문제를 방지합니다.

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  ...
})
```

## 설정

### 초기화 파라미터

초기화 명령을 호출해 추적을 시작합니다. 다음 파라미터를 사용할 수 있습니다.

`applicationId`
: 필수<br/>
**유형**: 문자열<br/>
RUM 애플리케이션 ID.

`clientToken`
: 필수<br/>
**유형**: 문자열<br/>
[Datadog 클라이언트 토큰][15].

`site`
: 필수<br/>
**유형**: 문자열<br/>
**기본값**: `datadoghq.com`<br/>
[조직의 Datadog 사이트 파라미터][16].

`service`
: 선택 사항<br/>
**유형**: 문자열<br/>
애플리케이션의 서비스 이름. [태그 구문 요건][17]을 따름.

`env`
: 선택 사항<br/>
**유형**: 문자열<br/>
애플리케이션의 환경 (예: prod, pre-prod 및 staging). [태그 구문 요건][17]을 따름.

`version`
: 선택 사항<br/>
**유형**: 문자열<br/>
애플리케이션의 버전 (예: 1.2.3, 6c44da20 및 2020.02.13). [태그 구문 요건][17]을 따름.

`trackingConsent`
: 선택 사항<br/>
**유형**: `"granted"` 또는 `"not-granted"`<br/>
**기본값**: `"granted"`<br/>
초기 사용자 추적 동의 상태 설정. [사용자 추적 동의][18] 참조.

`trackViewsManually`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `false` <br/>
RUM 보기 생성을 제어할 수 있음. [기본 RUM 보기 이름 덮어쓰기][19] 참조.

`trackUserInteractions`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/> 
[사용자 작업 자동 수집][20] 활성화.

`trackResources`
: 선택 사항<br/>
**유형**: 불리언(Boolean)<br/>
**기본값**: `false` <br/>
리소스 이벤트 수집 활성화.

`trackLongTasks`
: 선택 사항<br/>
**유형**: 불리언(Boolean)<br/>
**기본값**: `false` <br/>
긴 작업 이벤트 수집 활성화.

`defaultPrivacyLevel`
: 선택 사항<br/>
**유형**: 문자열<br/>
**기본값**: `mask` <br/>
[세션 재생 개인정보 보호 옵션][21] 참조.

`actionNameAttribute`
: 선택 사항<br/>
**유형**: 문자열<br/>
[작업 이름][22]에 사용할 고유 속성 지정.

`sessionSampleRate`
: 선택 사항 <br/>
**유형**: 숫자<br/>
**기본값**: `100`<br/>
추적할 세션 비율: 전체인 경우 `100`, 없는 경우 `0`. 추적된 세션만 RUM 이벤트를 전송함.  `sessionSampleRate`에 대한 자세한 내용은 [샘플링 설정][7] 참조.

`sessionReplaySampleRate`
: 선택 사항<br/>
**유형**: 숫자<br/>
**기본값**: `0`<br/>
[브라우저 RUM 및 세션 재생 가격 책정][6] 기능을 사용해 추적된 세션 비율: 전체인 경우 `100`, 없을 경우 `0`. `sessionReplaySampleRate`에 대한 자세한 내용을 확인하려면 [샘플링 설정][21] 참조.

`startSessionReplayRecordingManually`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/>
세션 재생을 위해 세션을 샘플링하는 경우, 세션이 시작될 때가 아닌 `startSessionReplayRecording()`이 호출될 때만 녹화 시작. 자세한 내용은 [세션 재생 사용법][23] 참조.

`silentMultipleInit`
: 선택 사항<br/>
**유형**: 불리언(Boolean)<br/>
**기본값**: `false`<br/>
페이지에서 RUM 브라우저 SDK가 이미 초기화되어 있는 경우 초기화가 자동으로 실패합니다.

`proxy`
: 선택 사항<br/>
**유형**: 문자열<br/>
부수적인 프록시 URL (예: https://www.proxy.com/path). 자세한 내용은 전체 [프록시 설정 지침][24] 참조.

`allowedTracingUrls`
: 선택 사항<br/>
**유형**: 목록<br/>
추적 헤더를 삽입하는 데 사용되는 요청 URL 목록. 자세한 내용은 [RUM과 트레이스 연결][12]을 참조하세요.

`traceSampleRate`
: 선택 사항<br/>
**유형**: 숫자<br/>
**기본값**: `100`<br/>
추적할 요청 비율: `100`: 전체, `0`: 없음. 자세한 내용은 [RUM과 트레이스 연결][12]을 참조하세요. 

`telemetrySampleRate`
: 선택 사항<br/>
**유형**: 숫자<br/>
**기본값**: `20`<br/>
잠재적인 문제를 감지하고 해결하기 위해 SDK 실행에 대한 텔레메트리 데이터(예: 오류 및 디버그 로그)가 Datadog으로 전송됩니다. 텔레메트리 수집을 거부하려면 이 옵션을 `0`으로 설정하세요.

`excludedActivityUrls`
: 선택 사항<br/>
**유형**: 목록<br/>
페이지 활동을 계산할 때 무시되는 요청 발신지 목록. [페이지 활동 계산 방법][11] 참조.

`workerUrl`
: 선택 사항<br/>
**유형**: 문자열<br/>
Datadog Browser SDK Worker JavaScript 파일을 가리키는 URL. URL은 상대적이거나 절대적일 수 있지만 웹 애플리케이션과 동일한 출처를 가져야 함. 자세한 내용은 [콘텐츠 보안 정책 가이드라인][13] 참조.

`compressIntakeRequests`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/>
Datadog 인테이크에 전송된 요청을 압축하여 대량의 데이터 전송 시 대역폭 사용량을 감소시킴. 압축은 Worker 스레드에서 수행함. 자세한 내용은 [콘텐츠 보안 정책 가이드라인][13] 참조.

`storeContextsAcrossPages`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/>
`localStorage`에서 글로벌 컨텍스트와 사용자 컨텍스트를 저장하여 사용자 탐색에 따라 보존함. 자세한 내용 및 제한 사항은 [컨텍스트 수명 주기][25] 참조.

`allowUntrustedEvents`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/>
예를 들어, 자동화된 UI 테스트에서 [신뢰할 수 없는 이벤트][26] 캡처를 허용함.

Logs Browser SDK를 사용하는 경우 일치하는 구성이 필요한 옵션 :

`trackSessionAcrossSubdomains`
: 선택 사항<br/>
**유형**: 불리언(Boolean)<br/>
**기본값**: `false`<br/>
동일한 사이트의 하위 도메인 전체에서 세션을 보존합니다.

`useSecureSessionCookie`
: 선택 사항 <br/>
**유형**: 불리언(Boolean)<br/>
**기본값**: `false`<br/>
보안 세션 쿠키를 사용합니다. 이는 안전하지 않은 (비-HTTPS) 연결에 전송된 RUM 이벤트를 비활성화합니다.

`usePartitionedCrossSiteSessionCookie`
: 선택 사항<br/>
**유형**: 불리언(Boolean)<br/>
**기본값**:`false`<br/>
안전한 사이트 간 파티션 세션 쿠키를 사용합니다. 이렇게 하면 사이트가 다른 사이트(iframe)에서 로드될 때 RUM 브라우저 SDK가 실행될 수 있습니다. `useSecureSessionCookie`를 나타냅니다.

`useCrossSiteSessionCookie`
: 선택 사항 - **더 이상 사용되지 않음**<br/>
**유형**: 불리언(Boolean)<br/>
**기본값**:`false`<br/>
`usePartitionedCrossSiteSessionCookie` 참조.

`allowFallbackToLocalStorage`
: 선택 사항<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/>
쿠키를 설정할 수 없는 경우 `localStorage` 사용을 허용함. 이를 통해 쿠키를 지원하지 않는 환경에서도 RUM Browser SDK 실행 가능. 일반적인 사용 사례는 [Browser SDK를 사용하여 Electron 애플리케이션 모니터링][27] 참조.

### 태깅

서비스는 페이지 집합에 매핑되는 독립적이고 배포 가능한 코드 리포지토리입니다.

- 브라우저 애플리케이션이 모놀리스로 구성된 경우 RUM 애플리케이션에는 애플리케이션에 대한 하나의 서비스 이름이 있습니다.
- 브라우저 애플리케이션이 여러 페이지에 대해 별도의 리포지토리로 구성된 경우 애플리케이션의 수명 주기 동안 기본 서비스 이름을 편집하세요.

### 내부 컨텍스트 액세스

Datadog 브라우저 RUM SDK가 초기화된 후 SDK에 대한 내부 컨텍스트에 액세스할 수 있습니다.

다음 속성을 탐색할 수 있습니다.

| 속성      | 설명                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | 애플리케이션의 ID.                                            |
| session_id     | 세션 ID.                                                |
| user_action    | 작업 ID가 포함된 개체(또는 작업이 없는 경우 정의되지 않음). |
| view           | 현재 보기 이벤트에 대한 상세 정보를 포함하는 개체.           |

자세한 정보는 [수집된 RUM 브라우저 데이터][4]를 참조하세요.

#### 예시

```
{
  application_id : "xxx",
  session_id : "xxx",
  user_action: { id: "xxx" },
  view : {
    id : "xxx",
    referrer : "",
    url: "http://localhost:8080/",
    name: "homepage"
  }
}
```

선택적으로 `startTime` 파라미터를 사용하여 특정 시간의 컨텍스트를 확보할 수 있습니다. 파라미터가 제거된 경우 현재 컨텍스트가 반환됩니다.

```
getInternalContext (startTime?: 'number' | undefined)
```

#### NPM

NPM의 경우 다음을 사용합니다.

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

#### CDN 비동기화

CDN 비동기화의 경우 다음을 사용합니다.

```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
})
```

#### CDN 동기화

CDN 동기화의 경우 다음을 사용합니다.

```javascript
window.DD_RUM && window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_security/real_user_monitoring/#shared-responsibility
[2]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[3]: https://app.datadoghq.com/rum/list
[4]: /ko/real_user_monitoring/data_collected/
[5]: /ko/getting_started/tagging/using_tags
[6]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[7]: /ko/real_user_monitoring/guide/sampling-browser-plans/
[8]: /ko/real_user_monitoring/session_replay/browser/
[9]: /ko/real_user_monitoring/session_replay/browser/privacy_options
[10]: /ko/real_user_monitoring/platform/dashboards/
[11]: /ko/real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[12]: /ko/real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum
[13]: /ko/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[14]: https://www.npmjs.com/package/@datadog/browser-rum
[15]: /ko/account_management/api-app-keys/#client-tokens
[16]: /ko/getting_started/site/
[17]: /ko/getting_started/tagging/#define-tags
[18]: /ko/real_user_monitoring/browser/advanced_configuration/#user-tracking-consent
[19]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[20]: /ko/real_user_monitoring/browser/tracking_user_actions
[21]: /ko/real_user_monitoring/session_replay/privacy_options?tab=maskuserinput
[22]: /ko/real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[23]: /ko/real_user_monitoring/session_replay/browser/#usage
[24]: /ko/real_user_monitoring/guide/proxy-rum-data/
[25]: https://docs.datadoghq.com/ko/real_user_monitoring/browser/advanced_configuration#contexts-life-cycle
[26]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[27]: /ko/real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk