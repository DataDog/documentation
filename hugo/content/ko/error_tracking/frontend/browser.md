---
aliases:
- /ko/real_user_monitoring/error_tracking/browser_errors
- /ko/error_tracking/standalone_frontend/browser
further_reading:
- link: https://learn.datadoghq.com/courses/tracking-errors-rum-javascript
  tag: 학습 센터
  text: JavaScript 웹 애플리케이션용 RUM으로 오류 추적
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps
  tag: 소스 코드
  text: datadog-ci Source code
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: 설명서
  text: 자바스크립트(Javascript) 소스 맵 업로드
- link: /real_user_monitoring/guide/upload-webassembly-symbols
  tag: 설명서
  text: WebAssembly 심볼 업로드
- link: /error_tracking/explorer
  tag: 설명서
  text: Error Tracking 탐색기에 대해 알아보기
title: Browser Error Tracking
---
## 개요 {#overview}

[Error Tracking][1]은 Browser SDK를 통해 브라우저에서 수집한 오류를 처리합니다. 스택 트레이스를 포함하는 [소스][2], [커스텀][3], [보고][4], [콘솔][4] 오류가 수집될 때마다, Error Tracking은 이를 처리하여 [Error Tracking 탐색기][16]에서 찾을 수 있는 이슈 또는 유사한 오류 그룹으로 그룹화합니다.

## 전제 조건 {#prerequisites}

[Browser SDK][5]의 최신 버전을 다운로드합니다.

## 설정 {#setup}

브라우저 애플리케이션에서 Datadog으로 Error Tracking 데이터 전송을 시작하려면 [인앱 설정 지침][6] 또는 아래 단계를 따르세요.

### 1단계 - 애플리케이션 생성 {#step-1-create-the-application}

1. Datadog에서 [{{< ui >}}Errors{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Browser and Mobile{{< /ui >}} > {{< ui >}}Add an Application{{< /ui >}}][6] 페이지로 이동하여 JavaScript(JS) 애플리케이션 유형을 선택합니다.
2. 애플리케이션 이름을 입력한 다음 {{< ui >}}Create Application{{< /ui >}}을 클릭합니다. 그러면 애플리케이션의 `clientToken` 및 `applicationId`가 생성됩니다.

### 2단계 - 올바른 설치 방법 선택 {#step-2-choose-the-right-installation-method}

브라우저 SDK의 설치 유형을 선택합니다.

{{< tabs >}}
{{% tab "npm" %}}

최신 웹 애플리케이션의 경우 npm(Node Package Manager)을 통해 설치할 것을 권장합니다. 브라우저 SDK는 나머지 프론트엔드 JavaScript 코드로 패키징됩니다. 페이지 로드 성능에는 아무런 영향이 없습니다. 단, SDK 초기화 이전에 트리거된 오류, 리소스, 사용자 작업은 SDK에서 누락될 수 있습니다. Datadog에서는 브라우저 로그 SDK와 일치하는 버전을 사용하도록 권장합니다.

[`@datadog/browser-rum`][1]을 `package.json` 파일에 추가한 후 다음과 같이 초기화합니다.

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({

   applicationId: '<APP_ID>',
   clientToken: '<CLIENT_TOKEN>',
   service: '<SERVICE>',
   env: '<ENV_NAME>',
   // site: '<SITE>',
   // version: '1.0.0',
   trackUserInteractions: true,
   trackResources: true
});

```

`trackUserInteractions` 파라미터는 애플리케이션 내 사용자 클릭의 자동 수집을 활성화합니다. 페이지에 기재된 **민감한 개인 정보**는 상호작용한 요소 파악을 위해 포함될 수 있습니다.

[1]: https://www.npmjs.com/package/@datadog/browser-rum

{{% /tab %}}
{{% tab "CDN async" %}}

성능 목표가 있는 웹 애플리케이션의 경우 CDN async를 통해 설치할 것을 권장합니다. 브라우저 SDK는 Datadog의 CDN에서 비동기식으로 로드되어, SDK 다운로드는 페이지 로드 성능에 영향을 미치지 않습니다. 단, SDK 초기화 이전에 트리거된 오류, 리소스, 사용자 작업은 SDK에서 누락될 수 있습니다.

애플리케이션에서 모니터링하려는 모든 HTML 페이지의 헤드 태그에 생성된 코드 스니펫을 추가합니다. 다음의 **{{<region-param key="dd_site_name">}}** [site][1] 경우:

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v7/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // site: '<SITE>',
      service: '<APP_ID>',
      env: '<ENV_NAME>',
      // version: '1.0.0'
    });
  })
</script>
```

`trackUserInteractions` 파라미터는 애플리케이션 내 사용자 클릭의 자동 수집을 활성화합니다. 페이지에 기재된 **민감한 개인 정보**는 상호작용한 요소 파악을 위해 포함될 수 있습니다.

[1]: /ko/getting_started/site/

{{% /tab %}}
{{% tab "CDN sync" %}}

모든 이벤트 수집 시 CDN sync를 통해 설치할 것을 권장합니다. 브라우저 SDK가 Datadog의 CDN에서 동기식으로 로드되어 SDK가 먼저 로드되고 모든 오류, 리소스와 사용자 액션을 수집합니다. 이 방법은 페이지 로드 성능에 영향을 미칠 수 있습니다.

애플리케이션에서 모니터링하려는 모든 HTML 페이지의 헤드 태그(다른 모든 스크립트 태그 앞)에 생성된 코드 스니펫을 추가합니다. 스크립트 태그를 더 높이 배치하고 동기식으로 로드하면 Datadog RUM이 모든 성능 데이터와 오류를 수집할 수 있습니다. 다음의 **{{<region-param key="dd_site_name">}}** [site][1] 경우:

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v7/datadog-rum.js"
    type="text/javascript"
    crossorigin>
</script>
<script>
    window.DD_RUM && window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // site: '<SITE>',
      service: '<APP_ID>',
      env: '<ENV_NAME>',
      // version: '1.0.0'
    });
</script>
```

`trackUserInteractions` 파라미터는 애플리케이션 내 사용자 클릭의 자동 수집을 활성화합니다. 페이지에 기재된 **민감한 개인 정보**는 상호작용한 요소 파악을 위해 포함될 수 있습니다.

[1]: /ko/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

#### TypeScript(선택 사항) {#typescript-optional}

TypeScript 프로젝트에서 SDK를 초기화하는 경우, 아래 코드 스니펫을 사용합니다. 타입은 TypeScript >= 3.8.2와 호환됩니다.

<div class="alert alert-info">이전 버전 TypeScript의 경우, 컴파일 문제를 방지하려면 JavaScript 소스를 불러오고 전역 변수를 사용합니다.</div>

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  trackUserInteractions: true,
  trackResources: true,
  ...
})
```

### 3단계 - 환경 및 설정 구성 {#step-3-configure-environment-and-settings}

1. 환경 필드에서 [unified service tagging][18]을 사용할 애플리케이션의 환경(`env`)을 정의합니다.
2. 서비스 필드에서 [unified service tagging][18]을 사용할 애플리케이션의 서비스(`service`)를 정의합니다.
3. 사용자 입력에 대해 개인정보 보호 수준을 설정합니다. 자세한 내용은 [Session Replay 브라우저 개인정보 보호 옵션][10]을 참조하세요.
4. 초기화 스니펫에 배포된 애플리케이션의 버전 번호(`version`)를 설정합니다. 자세한 내용은 [태깅](#tagging-for-error-tracking)을 참조하세요.
5. 필요에 따라 추가 파라미터를 구성합니다. 사용 가능한 모든 옵션을 확인하려면 아래의 [구성 참조](#configuration-reference) 섹션을 참조하세요.

### 4단계 - 애플리케이션 배포 {#step-4-deploy-your-application}

애플리케이션에 변경 사항을 배포합니다. 배포가 실제로 적용되면 Datadog가 사용자 브라우저에서 이벤트를 수집합니다.

### 5단계 - 소스 맵 및 WebAssembly 심볼 업로드(선택 사항이지만 권장됨) {#step-5-upload-source-maps-and-webassembly-symbols-optional-but-recommended}

JavaScript 소스 맵을 업로드하여 축소되지 않은 스택 트레이스에 액세스합니다. [소스 맵 업로드 가이드][17]를 참조하세요.

브라우저 애플리케이션에서 WebAssembly를 사용하는 경우, [Browser SDK WASM 플러그인 구성][20]과 [모듈의 디버그 심볼 업로드][21]를 실행합니다.

### 6단계 - 데이터 시각화 {#step-6-visualize-your-data}

Browser Error Tracking의 기본 설정을 완료했으므로, 애플리케이션이 브라우저 오류를 수집하고 실시간으로 문제 모니터링과 디버깅을 시작할 수 있습니다.

[대시보드][8]에서 [수집된 데이터][7]를 시각화하거나 Error Tracking에서 검색 쿼리를 생성합니다.

Datadog이 데이터 수신을 시작할 때까지 애플리케이션은 {{< ui >}}Applications{{< /ui >}} 페이지에 `pending`으로 표시됩니다.

### 7단계 - 오류와 소스 코드 연결(선택 사항) {#step-7-link-errors-with-your-source-code-optional}

소스 맵 전송 외에도 [Datadog CLI][11]는 코드 리포지토리에서 커밋 해시, 리포지토리 URL 및 추적된 파일 경로 목록과 같은 Git 정보를 보고합니다.

Error Tracking은 이 정보를 사용하여 오류와 [소스 코드][15]의 상관관계를 파악할 수 있으므로 [GitHub][12], [GitLab][13], [Bitbucket][14]의 모든 스택 트레이스 프레임에서 관련 코드 줄로 피벗할 수 있습니다.

<div class="alert alert-info">스택 프레임에서 소스 코드로 연결하는 기능은 <a href="https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> 버전과 <code>0.12.0</code> 이후 버전에서 지원됩니다.</div>

자세한 내용은 [Datadog 소스 코드 통합][15]을 참조하세요.

## Error Tracking 태깅 {#tagging-for-error-tracking}

이 태그(위 3단계에서 구성)는 Error Tracking 기능을 지원합니다.

- `service` 및 `env` 기준으로 문제를 필터링하고 패싯을 지정합니다.
- 동일한 `service`/`env`에 대해 RUM, Logs, APM과의 제품 간 상호 연결을 활용합니다.
- 업로드 시 구성한 것과 동일한 `service` 및 `version`을 통해 업로드된 소스 맵을 매칭합니다.

서비스는 페이지 집합에 매핑되는 독립적이고 배포 가능한 코드 리포지토리입니다.

- 브라우저 애플리케이션이 모놀리스 구조로 구성된 경우 Datadog 애플리케이션에는 애플리케이션에 대한 하나의 서비스 이름이 있습니다.
- 브라우저 애플리케이션이 여러 페이지에 대해 별도의 리포지토리로 구성된 경우 애플리케이션의 수명 주기 동안 기본 서비스 이름을 편집하세요.

Datadog의 [태깅][19]에 대해 자세히 알아보세요.

## 구성 참조 {#configuration-reference}

사용 가능한 구성 옵션의 전체 목록은 [Browser SDK API Reference][9]를 참조하세요.

## 다음 단계 {#next-steps}

처리되지 않은 예외, 처리되지 않은 약속 거부, 처리된 예외, 처리된 약속 거부, Browser SDK에서 자동으로 추적되지 않는 기타 오류를 모니터링할 수 있습니다. [브라우저 오류 수집][3]에 대해 자세히 알아보세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/error_tracking/
[2]: /ko/real_user_monitoring/application_monitoring/browser/data_collected/?tab=error#source-errors
[3]: /ko/error_tracking/frontend/collecting_browser_errors/
[4]: /ko/error_tracking/frontend/collecting_browser_errors/?tab=npm#error-sources
[5]: https://www.npmjs.com/package/@datadog/browser-rum
[6]: https://app.datadoghq.com/error-tracking/settings/setup/client
[7]: /ko/real_user_monitoring/application_monitoring/browser/data_collected/
[8]: /ko/real_user_monitoring/platform/dashboards/errors/
[9]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[10]: /ko/session_replay/privacy_options?platform=browser#mask-action-names
[11]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command
[12]: https://github.com
[13]: https://about.gitlab.com
[14]: https://bitbucket.org/product
[15]: /ko/integrations/guide/source-code-integration/
[16]: /ko/error_tracking/explorer
[17]: /ko/real_user_monitoring/guide/upload-javascript-source-maps
[18]: /ko/getting_started/tagging/unified_service_tagging/
[19]: /ko/getting_started/tagging/
[20]: /ko/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/#configure-webassembly-error-tracking
[21]: /ko/real_user_monitoring/guide/upload-webassembly-symbols/#upload-your-symbols