---
aliases:
- /ko/real_user_monitoring/setup
further_reading:
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 탐색기에 대해 자세히 알아보기
- link: /logs/log_collection/javascript/
  tag: 설명서
  text: 로그를 위한 Datadog 브라우저 SDK에 대해 자세히 알아보기
kind: 설명서
title: RUM 브라우저 모니터링
---

## 개요

Datadog 실제 사용자 모니터링(RUM)을 사용하면 애플리케이션의 개별 사용자의 사용자 여정과 실시간 성능을 시각화하고 분석할 수 있습니다. 이벤트를 수집하려면 RUM 브라우저 SDK를 브라우저 애플리케이션에 추가하고 초기화 파라미터를 사용해 어떤 데이터를 수집할지 설정합니다.

## 설정

RUM 브라우저 SDK는 IE11를 포함해 현대의 모든 데스크탑과 모바일 브러우저를 지원합니다. 자세한 정보는 [브라우저 지원][8] 테이블을 참조하세요.

RUM 브라우저 모니터링을 설정하려면, RUM 애플리케이션을 생성합니다.

1. Datadog에서 [**RUM 애플리케이션** 페이지][1]로 이동해 **새 애플리케이션** 버튼을 클릭합니다.
  - 애플리케이션 이름을 입력하고 **클라이언트 토큰 생성**을 클릭합니다. 이를 통해 애플리케이션에 대해 `clientToken` 및 `applicationId`를 생성할 수 있습니다. 
  - RUM 브라우저 SDK에 대해 설치 유형을 선택합니다. [npm](#npm), 또는 호스팅된 버전 ([CDN 비동기화](#cdn-async) 또는 [CDN 동기화](#cdn-sync))를 선택할 수 있습니다.
  - 애플리케이션 환경 이름과 서비스 이름을 정의하여 [RUM 및 세션 재생][19]을 위한 통합 서비스 태깅을 사용합니다. 초기화 스니펫에서 구축된 애플리케이션의 버전 번호를 설정합니다. 자세한 내용은 [태깅](#tagging)을 참조하세요.
  - 수집된 총 사용자 세션의 샘플 비율을 설정하고 슬라이더를 사용해 수집된 총 [브라우저 RUM 및 세션 재생][11] 세션 백분율을 설정합니다. 브라우저 RUM 및 세션 재생 세션은 리소스, 긴 작업 및 재생 레코딩을 포함합니다. 총 사용자 세션에서 수집된 브라우저 RUM 및 세션 재생 세션 비율 설정 방법에 대한 자세한 정보는 [브라우저 및 브라우저 RUM 및 세션 재생 샘플링 설정][21]을 참조하세요.
  - **세션 재생 활성화됨** 토글을 클릭하여 [세션 재생][17] 재생 레코딩에 액세스합니다.
  - 드롭다운 메뉴에서 세션 재생에 대한 [개인정보보호 설정][18]을 선택합니다.
2. 애플리케이션에 변경 사항을 구축합니다. 구축이 프로덕션으로 전환되면 Datadog가 사용자 브라우저에서 이벤트를 수집합니다.
3. [대시보드][3]에서 [수집된 데이터][2]를 시각화하거나 [RUM 탐색기][16]에서 검색 쿼리를 생성합니다.

Datadog에서 데이터를 수집하기 시작할 때까지 애플리케이션은 **RUM 애플리케이션** 페이지에서 `pending`으로 표시됩니다.

### 올바른 설치 방법 선택

노드 패키지 관리자(npm)
: 이 방법은 현대의 웹 애플리케이션에 권장됩니다. RUM 브라우저 SDK는 남은 프런트엔드 JavaScript 코드로 패키지되어 있습니다. 페이지 로드 성능에 영향을 미치지 않습니다. 하지만 SDK는 SDK가 초기화되기 전 트리거된 오류, 리소스 및 사용자 작업을 놓칠 수 있습니다. Datadog에서는 브라우저 로그 SDK와 일치하는 버전을 사용할 것을 권장합니다.

CDN 비동기화
: 이 방법은 성능 목표가 있는 웹 애플리케이션에 사용하는 것이 좋습니다. RUM 브라우저 SDK는 CDN에서 비동기적으로 로드하여 SDK 다운로드가 페이지 로드 성능에 영향을 미치지 않도록 보장합니다. 하지만 SDK는 해당 SDK가 초기화되기 전 트리거된 오류, 리소스 및 사용자 작업을 놓칠 수 있습니다.

CDN 동기화
: 이 방법은  모든 RUM 이벤트를 수집하는 데 좋습니다. RUM 브라우저 SDK는 CDN에서 SDK를 먼저 동기적으로 로드하고 모든 오류, 리소스와 사용자 작업이 수집되도록 보장합니다. 이 방법은 페이지 로드 성능에 영향을 미칠 수 있습니다.

### npm

[`@datadog/browser-rum`][4]을 `package.json` 파일에 추가한 뒤, 다음을 사용해 초기화합니다.

<details open>
  <summary>최신 버전</summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100, // if not included, the default is 100
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
  });
datadogRum.startSessionReplayRecording();

```

</details>

<details>
  <summary><code>v4.30.0</code> 이전</summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  sessionReplaySampleRate: 100, // if not included, the default is 100
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
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  premiumSampleRate: 100, // if not included, the default is 100
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
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  replaySampleRate: 100, // if not included, the default is 100
  trackInteractions: true,
  });
datadogRum.startSessionReplayRecording();

```

</details>

`trackUserInteractions` 및 `trackFrustrations` 파라미터는 애플리케이션에서 사용자 클릭 자동 수집을 지원합니다. 페이지에 포함된 **민감한 개인 정보**가 상호 작용하는 요소 파악을 위해 포함될 수 있습니다.

### CDN 비동기화

생성된 코드 스니펫을 애플리케이션에서 모니터링하려는 모든 HTML 페이지 헤드 태그에 추가합니다. **{{1}}** 사이트의 경우:

<details open>
  <summary>최신 버전</summary>

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
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
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
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
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
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
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
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
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
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
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
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
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
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
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
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
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
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
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
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
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
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
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
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
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
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
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
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
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
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
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
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
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
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
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
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
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
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
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
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
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
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
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
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
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
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
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
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

`trackUserInteractions` 및 `trackFrustrations` 파라미터는 애플리케이션에서 사용자 클릭 자동 수집을 지원합니다. 페이지에 포함된 **민감한 개인 정보**가 상호 작용하는 요소 파악을 위해 포함될 수 있습니다.

초기 RUM API 호출은 `window.DD_RUM.onReady()` 콜백으로 묶어야 합니다. 이를 통해 SDK가 적절하게 로드되면 코드가 실행되도록 보장할 수 있습니다.

### CDN 동기화

생성된 코드 스니펫을 애플리케이션에서 모니터링하려는 모든 HTML 페이지의 헤드 태그(기타 모든 스크립트 태그 앞)에 추가합니다. 더 상위의 동기화된 스크립트 태그를 포함하면 Datadog RUM이 모든 성능 데이터 및 오류를 수집할 수 있도록 보장합니다. **{{<region-param key="dd_site_name">}}** 사이트의 경우: 

<details open>
  <summary>최신 버전</summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
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
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
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
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
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
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
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
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
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
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
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
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
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
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
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
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
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
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
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
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
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
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
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
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
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
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
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
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
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
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
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
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
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
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
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
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
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
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
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
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
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
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
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
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
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
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

`trackUserInteractions` 및 `trackFrustrations` 파라미터는 애플리케이션에서 사용자 클릭 자동 수집을 지원합니다. 페이지에 포함된 **민감한 개인 정보**가 상호 작용하는 요소 파악을 위해 포함될 수 있습니다.

`window.DD_RUM` 점검은 RUM 브라우저 SDK에서 로딩 실패가 발생한 경우 문제를 방지하는 데 사용됩니다.

### TypeScript

Types는 TypeScript >= 3.8.2와 호환됩니다. 이전 버전의 경우 자바스크립트(Javascript) 소스를 가져오기하고 글로벌 변수를 사용하여 컴파일 문제를 방지합니다.

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100, // if not included, the default is 100
  trackResources: true,
  trackLongTasks: true,
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
[Datadog 클라이언트 토큰][5].

`site`
: 필수<br/>
**유형**: 문자열<br/>
**기본값**: `datadoghq.com`<br/>
[조직의 Datadog 사이트 파라미터][14].

`service`
: 선택 항목<br/>
**유형**: 문자열<br/>
애플리케이션 서비스 이름입니다. [태그 구문 요건][15]을 따르세요.

`env`
: 선택 항목<br/>
**유형**: 문자열<br/>
애플리케이션 환경, 예: prod, pre-prod 및 staging, [태그 구문 요건][15]을 따르세요.

`version`
: 선택 항목<br/>
**유형**: 문자열<br/>
애플리케이션 버전, 예: 1.2.3, 6c44da20 및 2020.02.13. [태그 구문 요건][15]을 따르세요.

`trackViewsManually`
: 선택 항목<br/>
**유형**: 부울<br/>
**기본값**: `false` <br/>
RUM 보기 생성을 관리할 수 있도록 해줍니다. [기본값 RUM 보기 이름 덮어쓰기][10]를 참조하세요.

`trackInteractions`
: 선택 항목 - **사용되지 않음**<br/>
**유형**: 부울<br/>
**기본값**: `false` <br/>
`trackUserInteractions`를 참조하세요.

`trackUserInteractions`
: 선택 항목<br/>
**유형**: 부울<br/>
**기본값**: `false` <br/>
[자동 사용자 작업 수집][6]을 활성화하세요.

`trackFrustrations`
: 선택 항목<br/>
**유형**: 부울<br/>
**기본값**: `false` <br/>
[자동 사용자 불만 수집][20]을 활성화합니다. `trackUserInteractions: true`을 의미합니다.

`trackResources`
: 선택 항목<br/>
**유형**: 부울<br/>
**기본값**: `false` <br/>
리소스 이벤트 수집을 활성화합니다.

`trackLongTasks`
: 선택 항목<br/>
**유형**: 부울<br/>
**기본갑**: `false` <br/>
긴 작업 이벤트 수집을 활성화합니다.

`defaultPrivacyLevel`
: 선택 항목<br/>
**유형**: 문자열<br/>
**기본값**: `mask-user-input` <br/>
[세션 재생 개인정보보호 옵션][13]을 참조합니다.

`actionNameAttribute`
: 선택 항목<br/>
**유형**: 문자열<br/>
[이름 동작][9]에 사용될 자체적인 속성을 지정합니다.

`sampleRate`
: 선택 항목 - **사용되지 않음**<br/>
**유형**: 숫자<br/>
**기본값**: `100`<br/>
``sessionSampleRate`을 참조합니다.

`sessionSampleRate`
: 선택 항목 <br/>
**유형**: 숫자<br/>
**기본값**: `100`<br/>
추적할 세션 비율: `100`: 전체, `0`: 대상 없음. 추적된 세션만 RUM 이벤트로 전송됩니다.  `sessionSampleRate`에 대한 자세한 내용은 [샘플링 설정][21]을 참조합니다.

`replaySampleRate`
: 선택 항목 - **사용되지 않음**<br/>
**유형**: 숫자<br/>
**기본값**: `100`<br/>
`sessionReplaySampleRate`을 참조합니다.

`premiumSampleRate`
: 선택 항목 - **사용되지 않음**<br/>
**유형**: 숫자<br/>
**기본값**: `100`<br/>
`sessionReplaySampleRate`을 참조합니다.

`sessionReplaySampleRate`
: 선택 항목 <br/>
**유형**: 숫자<br/>
**기본값**: `100`<br/>
[브라우저 RUM 및 세션 재생 가격 책정][11] 기능을 포함하는 추적된 세션 비율입니다: `100`: 전체, `0`: 대상 없음 . `sessionReplaySampleRate`에 대한 자세한 내용은 [샘플링 설정][21]을 참조합니다.

`silentMultipleInit`
: 선택 항목<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/>
RUM 브라우저 SDK가 이미 페이지에서 초기화된 경우 초기화는 자동으로 실패합니다.

`proxyUrl`
: 선택 항목 <br/>
**유형**: 문자열<br/>
선택 항목인 프록시 URL입니다. 예: https://www.proxy.com/path. 자세한 정보는 전체 [프록시 설정 가이드][7]를 참조합니다.

`allowedTracingOrigins`
: 선택 항목 - **사용되지 않음**<br/>
**유형**: 목록<br/>
요청 출처 목록은 추적 머리글을 삽입하는 데 사용됩니다. [RUM 및 트레이스 연결][12]을 참조합니다.

`allowedTracingUrls`
: 선택 항목<br/>
**유형**: 목록<br/>
요청 URL 목록은 추적 머리글을 삽입하는 데 사용됩니다. 자세한 정보는 [RUM 및 트레이스 연결][12]을 참조합니다.

`tracingSampleRate`
: 선택 항목 - **사용되지 않음**<br/>
**유형**: 숫자<br/>
**기본값**: `100`<br/>
`traceSampleRate`을 참조합니다.

`traceSampleRate`
: 선택 항목<br/>
**유형**: 숫자<br/>
**기본값**: `100`<br/>
추적할 요청 비율: `100`: 전체, `0`: 대상 없음. 자세한 내용은 [RUM 및 트레이스][12]를 참조합니다.

`telemetrySampleRate`
: 선택 항목<br/>
**유형**: 숫자<br/>
**기본값**: `20`<br/>
SDK 실행에 대한 원격 측정 데이터(오류 및 디버그 로그)가 잠재적 문제 해결을 위해 Datadog로 전송됩니다. `0`에 이 옵션을 설정해 원격 측정 수집에서 옵트아웃합니다. 

`excludedActivityUrls`
: 선택 항목<br/>
**유형:** 목록<br/>
페이지 활동을 계산할 때 요청 출처 목록을 무시합니다. [페이지 활동 계산 방법][16]을 참조합니다.

로그 브라우저 SDK를 사용해야 하는 경우 옵션에는 일치하는 설정이 있어야 합니다.

`trackSessionAcrossSubdomains`
: 선택 항목<br/>
**유형**: 부울<br/>
**기본값**: `false`<br/>
동일한 사이트의 하위 도메인 전체에서 세션을 보존합니다.

`useSecureSessionCookie`
: 선택 항목 <br/>
**유형**: 부울<br/>
**기본값**: `false`<br/>
보안 세션 쿠키를 사용합니다. 이는 안전하지 않은 (비-HTTPS) 연결에 전송된 RUM 이벤트를 비활성화합니다.

`useCrossSiteSessionCookie`
: 선택 항목<br/>
**유형**: 부울<br/>
**기본값**:`false`<br/>
보안 교차 사이트 세션 쿠키를 사용합니다. 이를 통해 사이트에서 또 다른 (iframe)에서 로드될 때 RUM 브라우저 SDK가 실행될 수 있습니다. `useSecureSessionCookie`을 나타냅니다.

### 태그 설정

서비스는 일련의 페이지로 매핑되는 비종속적이고 구축 가능한 코드 리포지토리입니다.

- 브라우저 애플리케이션이 모놀리식(monolithic)으로 구성된 경우 RUM 애플리케이션은 해당 애플리케이션에 대해 단일 서비스 이름을 갖습니다.
- 브라우저 애플리케이션이 여러 페이지에 대한 별도의 리포지토리로 구성된 경우, 애플리케이션 수명 주기 동안 기본 서비스 이름을 편집합니다.

### 내부 컨텍스트 액세스

Datadog 브라우저 RUM SDK가 초기화된 후 SDK에 대한 내부 컨텍스트에 액세스할 수 있습니다.

다음 속성을 탐색할 수 있습니다.

| 속성      | 설명                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | 애플리케이션 ID입니다.                                            |
| session_id     | 세션 ID입니다.                                                |
| user_action    | 작업 ID를 포함하는 개체(또는 작업을 찾을 수 없는 경우 정의 안 됨)입니다. |
| view           | 현재 보기 이벤트에 대한 상세 정보를 포함하는 개체입니다.           |

자세한 정보는 [수집된 RUM 브라우저 데이터][2]를 참조합니다.

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

[1]: https://app.datadoghq.com/rum/list
[2]: /ko/real_user_monitoring/data_collected/
[3]: /ko/real_user_monitoring/dashboards/
[4]: https://www.npmjs.com/package/@datadog/browser-rum
[5]: /ko/account_management/api-app-keys/#client-tokens
[6]: /ko/real_user_monitoring/browser/tracking_user_actions
[7]: /ko/real_user_monitoring/guide/proxy-rum-data/
[8]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[9]: /ko/real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[10]: /ko/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#override-default-rum-view-names
[11]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[12]: /ko/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[13]: /ko/real_user_monitoring/session_replay/privacy_options?tab=maskuserinput
[14]: /ko/getting_started/site/
[15]: /ko/getting_started/tagging/#defining-tags
[16]: /ko/real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[17]: /ko/real_user_monitoring/session_replay/
[18]: /ko/real_user_monitoring/session_replay/privacy_options
[19]: /ko/getting_started/tagging/using_tags
[20]: /ko/real_user_monitoring/frustration_signals/
[21]: /ko/real_user_monitoring/guide/sampling-browser-plans/