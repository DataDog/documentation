---
aliases:
- /ko/real_user_monitoring/installation/advanced_configuration/
- /ko/real_user_monitoring/browser/modifying_data_and_context/
- /ko/real_user_monitoring/browser/advanced_configuration/
content_filters:
- option_group_id: rum_browser_sdk_source_options
  trait_id: lib_src
- option_group_id: rum_browser_sdk_version_for_advanced_config_options
  trait_id: rum_browser_sdk_version
description: RUM Browser SDK를 구성하여 데이터 수집을 수정하고 조회 이름을 재정의하고 사용자 세션을 관리하고, 애플리케이션의
  요구 사항에 맞춰 샘플링을 제어하세요.
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: 설명서
  text: 사용자 액션 추적
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: Real User Monitoring
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: 설명서
  text: 수집된 RUM 브라우저 데이터
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: Datadog에서 조회 탐색
- link: /real_user_monitoring/explorer/visualize/
  tag: 설명서
  text: 이벤트에 시각화 적용
- link: /logs/log_configuration/attributes_naming_convention
  tag: 설명서
  text: Datadog 표준 특성
- link: https://learn.datadoghq.com/courses/configure-rum-javascript
  tag: 학습 센터
  text: JavaScript 웹 애플리케이션에 대하여 Real User Monitoring(RUM) 구성
title: 고급 구성
---
## 개요 {% #overview %}

RUM에서 수집한 [데이터 및 컨텍스트][1]를 다양한 방법으로 수정하여 필요에 따라 지원할 수 있습니다:

- 개인 식별 정보와 같은 민감한 데이터를 보호합니다.
- 사용자 세션을 해당 사용자의 내부 ID와 연결하여 지원합니다.
- 데이터 샘플링을 통해 수집하는 RUM 데이터 양을 줄입니다.
- 데이터의 출처에 대해 기본 속성이 제공하는 것보다 더 많은 컨텍스트를 제공합니다.

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}

## 기본 RUM 조회 이름 재정의 {% #override-default-rum-view-names %}

[버전 2.17.0][3]부터 `trackViewsManually` 옵션을 사용하여 조회 이벤트를 수동으로 추적함으로써 조회 이름을 추가하고 팀이 소유한 전용 서비스에 할당할 수 있습니다.

RUM Browser SDK는 사용자가 방문한 각각의 새 페이지에 대하여, 또는 페이지 URL이 변경된 경우(단일 페이지 애플리케이션의 경우) [조회 이벤트][2]를 자동으로 생성합니다. 조회 이름은 현재 페이지 URL에서 계산되며, 여기에서 변수 ID는 자동으로 제거됩니다. 하나 이상의 숫자를 포함하는 경로 세그먼트는 변수 ID로 간주됩니다. 예를 들어 `/dashboard/1234` 및 `/dashboard/9a`는 `/dashboard/?`가 됩니다.

기본 RUM 조회 이름을 재정의하는 방법:

1. RUM Brower SDK를 초기화할 때 `trackViewsManually`를 true로 설정합니다.

   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
         ...,
         trackViewsManually: true,
         ...
   });
   ```
   {% /if %}
   <!-- ends NPM sync -->

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
         window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
         })
   })
   ```
   {% /if %}
   <!-- ends CDN async -->

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
         window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
         });
   ```
   {% /if %}
   <!-- ends CDN sync -->
2. 각 새 페이지 또는 경로 변경(단일 페이지 애플리케이션의 경우)에 대해 조회를 시작해야 합니다. 조회 시작 시 RUM 데이터가 수집됩니다.
{% /if %}
<!-- Ends 2.17.0 -->


<!-- Version must meet 4.13.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "4.13.0") %}

### 서비스 이름 및 버전 정의 {% #define-service-name-and-version %}

[버전 4.13.0][16]부터는 관련 서비스 이름 및 버전도 정의할 수 있습니다(선택 사항).

- **View Name**: 페이지 URL 경로로 기본 설정됩니다.
- **Service**: RUM 애플리케이션을 생성할 때 지정한 기본 서비스로 기본 설정됩니다.
- **Version**: RUM 애플리케이션을 생성할 때 지정한 기본 버전으로 기본 설정됩니다.
{% /if %}
<!-- ends 4.13.0 -->

<!-- version exclusive examples below-->

<!-- before 4.13 -->
{% if includes($rum_browser_sdk_version, ["lt_2_13_0", "gte_2_13_0", "gte_2_17_0"]) %}

## 수동으로 페이지 조회 추적 {% #manually-track-pageviews %}

다음 예에서는 RUM 애플리케이션의 `checkout` 페이지에서 페이지 조회를 수동으로 추적합니다. 서비스 또는 버전을 지정할 수 없습니다.

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.startView('checkout')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
        window.DD_RUM.startView('checkout')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.startView('checkout')
```
{% /if %}
{% /if %}
<!-- ends before 4.13 -->

<!-- Between 4.13 and 5.28 -->
{% if includes($rum_browser_sdk_version, ["gte_4_13_0", "gte_4_49_0", "gte_5_22_0"]) %}

다음 예에서는 RUM 애플리케이션의 `checkout` 페이지에서 페이지 조회를 수동으로 추적합니다. 여기에서는 조회 이름으로 `checkout`을 사용하고 `purchase` 서비스를 버전 `1.2.3`과 연결합니다.

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.startView({
    name: 'checkout',
    service: 'purchase',
    version: '1.2.3'
  })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{% /if %}
{% /if %}
<!-- ends before 5.28 -->
<!-- ends version exclusive examples -->

<!-- Version must meet 5.28.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "5.28.0") %}

- **컨텍스트**: [버전 5.28.0][19]부터 조회 및 조회의 하위 이벤트에 컨텍스트를 추가할 수 있습니다.

다음 예에서는 RUM 애플리케이션의 `checkout` 페이지에서 페이지 조회를 수동으로 추적합니다. 조회 이름으로 `checkout`을 사용하고 `purchase` 서비스를 버전 `1.2.3`과 연결합니다.

   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   datadogRum.startView({
        name: 'checkout',
        service: 'purchase',
        version: '1.2.3',
        context: {
            payment: 'Done'
        },
   })
   ```
   {% /if %}
   <!-- ends NPM -->

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.startView({
            name: 'checkout',
            service: 'purchase',
            version: '1.2.3',
            context: {
                payment: 'Done'
            },
      })
   })
   ```
   {% /if %}
   <!-- ends CDN async  -->

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.startView({
        name: 'checkout',
        service: 'purchase',
        version: '1.2.3',
        context: {
            payment: 'Done'
        },
   })
   ```
   {% /if %}
   <!-- ends CDN sync -->
{% /if %}
<!-- ends 5.28.0 -->

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}

### React 라우터 계측 {% #react-router-instrumentation %}

React, Angular, Vue 또는 여타 모든 프론트엔드 프레임워크를 사용하는 경우, Datadog은 프레임워크 라우터 수준에서 `startView` 로직을 구현할 것을 권장합니다.

기본 RUM 조회 이름을 재정의하여 사용자가 React 애플리케이션에서 정의한 방법과 일치하도록 하려면 다음 단계를 수행해야 합니다.

**참고**: 이 지침은 **React Router v6** 라이브러리에만 적용됩니다.

1. RUM 브라우저 SDK를 초기화할 때 [위](#override-default-rum-view-names)의 설명과 같이 `trackViewsManually`를 `true`로 설정하세요.

2. 각 경로 변경에 대한 조회를 시작합니다.
   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { matchRoutes, useLocation } from 'react-router-dom';
   import { routes } from 'path/to/routes';
   import { datadogRum } from "@datadog/browser-rum";

   export default function App() {
      // Track every route change with useLocation API
      let location = useLocation();

      useEffect(() => {
      const routeMatches = matchRoutes(routes, location.pathname);
      const viewName = routeMatches && computeViewName(routeMatches);
      if (viewName) {
         datadogRum.startView({name: viewName});
      }
      }, [location.pathname]);

      ...
   }

   // Compute view name out of routeMatches
   function computeViewName(routeMatches) {
      let viewName = "";
      for (let index = 0; index < routeMatches.length; index++) {
      const routeMatch = routeMatches[index];
      const path = routeMatch.route.path;
      // Skip pathless routes
      if (!path) {
         continue;
      }

      if (path.startsWith("/")) {
         // Handle absolute child route paths
         viewName = path;
      } else {
         // Handle route paths ending with "/"
         viewName += viewName.endsWith("/") ? path : `/${path}`;
      }
      }

      return viewName || '/';
   }
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   import { matchRoutes, useLocation } from 'react-router-dom';
   import { routes } from 'path/to/routes';

   export default function App() {
      // Track every route change with useLocation API
      let location = useLocation();

      useEffect(() => {
      const routeMatches = matchRoutes(routes, location.pathname);
      const viewName = routeMatches && computeViewName(routeMatches);
      if (viewName) {
         DD_RUM.onReady(function() {
            DD_RUM.startView({name: viewName});
         });
      }
      }, [location.pathname]);

      ...
   }

   // Compute view name out of routeMatches
   function computeViewName(routeMatches) {
      let viewName = "";
      for (let index = 0; index < routeMatches.length; index++) {
      const routeMatch = routeMatches[index];
      const path = routeMatch.route.path;
      // Skip pathless routes
      if (!path) {
         continue;
      }

      if (path.startsWith("/")) {
         // Handle absolute child route paths
         viewName = path;
      } else {
         // Handle route paths ending with "/"
         viewName += viewName.endsWith("/") ? path : `/${path}`;
      }
      }

      return viewName || '/';
   }
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   import { matchRoutes, useLocation } from 'react-router-dom';
   import { routes } from 'path/to/routes';

   export default function App() {
      // Track every route change with useLocation API
      let location = useLocation();

      useEffect(() => {
      const routeMatches = matchRoutes(routes, location.pathname);
      const viewName = routeMatches && computeViewName(routeMatches);
      if (viewName) {
         window.DD_RUM &&
            window.DD_RUM.startView({name: viewName});
      }
      }, [location.pathname]);

      ...
   }

   // Compute view name out of routeMatches
   function computeViewName(routeMatches) {
      let viewName = "";
      for (let index = 0; index < routeMatches.length; index++) {
      const routeMatch = routeMatches[index];
      const path = routeMatch.route.path;
      // Skip pathless routes
      if (!path) {
         continue;
      }

      if (path.startsWith("/")) {
         // Handle absolute child route paths
         viewName = path;
      } else {
         // Handle route paths ending with "/"
         viewName += viewName.endsWith("/") ? path : `/${path}`;
      }
      }

      return viewName || '/';
   }
   ```
   {% /if %}
{% /if %}
<!-- Ends 2.17.0 -->

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}
### 조회 이름 설정 {% #set-view-name %}

현재 조회의 이름을 업데이트하려면 `setViewName(name: string)`을 사용하세요. 이렇게 하면 새 조회를 시작하지 않고 조회 중간에 조회 이름을 변경할 수 있습니다.
   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.setViewName('<VIEW_NAME>');

   // Code example
   datadogRum.setViewName('Checkout');
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.setViewName('<VIEW_NAME>');
   })

   // Code example
   window.DD_RUM.onReady(function() {
      window.DD_RUM.setViewName('Checkout');
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.setViewName('<VIEW_NAME>');

   // Code example
   window.DD_RUM && window.DD_RUM.setViewName('Checkout');
   ```
   {% /if %}

**참고**: 조회 이름을 변경하면 해당 메서드를 호출한 시점부터 조회 및 그 하위 이벤트에 영향을 미칩니다.
{% /if %}
<!-- Ends 2.17.0 -->

자세한 내용은 [브라우저 모니터링 설정][4]을 참조하세요.


## RUM 데이터 강화 및 제어 {% #enrich-and-control-rum-data %}

RUM Browser SDK는 RUM 이벤트를 캡처하고 이벤트의 기본 속성을 채웁니다. `beforeSend` 콜백 함수를 사용하면 RUM Browser SDK가 수집한 모든 이벤트를 Datadog에 보내기 전에 그러한 이벤트에 액세스할 수 있습니다.

RUM 이벤트를 인터셉트하면 다음과 같은 일을 할 수 있습니다.

- 추가 컨텍스트 속성으로 RUM 이벤트 강화
- RUM 이벤트를 수정하여 내용을 변경하거나 민감한 시퀀스 삭제([편집 가능한 속성 목록](#modify-the-content-of-a-rum-event) 참조)
- 선택한 RUM 이벤트 삭제

<!-- Version must meet 2.13.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.13.0") %}
[버전 2.13.0][5]부터 `beforeSend`는 두 개의 인수를 사용합니다. 하나는 RUM Browser SDK가 생성한 `event`, 다른 하나는 RUM 이벤트 생성을 트리거한 `context`입니다.

```javascript
function beforeSend(event, context)
```

가능한 `context` 값은 다음과 같습니다.

| RUM 이벤트 유형   | 컨텍스트                   |
|------------------|---------------------------|
| 조회             | [위치][6]                  |
| 액션           | [이벤트][7] 및 처리 스택                     |
| 리소스(XHR)   | [XMLHttpRequest][8], [PerformanceResourceTiming][9] 및 처리 스택            |
| 리소스(Fetch) | [요청][10], [응답][11], [PerformanceResourceTiming][9] 및 처리 스택      |
| 리소스(기타) | [PerformanceResourceTiming][9] |
| 오류            | [오류][12]                     |
| 긴 작업        | [PerformanceLongTaskTiming][13] |

자세한 내용은 [RUM 데이터 강화 및 제어 가이드][14]를 참조하세요.
{% /if %}
<!-- ends 2.13.0 -->

### RUM 이벤트 강화 {% #enrich-rum-events %}

[Global Context API](#global-context) 또는 [Feature Flag 데이터 수집](#enrich-rum-events-with-feature-flags)으로 추가된 속성 외에 이벤트에 더 많은 컨텍스트 속성을 추가할 수 있습니다. 예를 들어 fetch 응답 개체에서 추출한 데이터로 RUM 리소스 이벤트를 태그할 수 있습니다.
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      ...,
      beforeSend: (event, context) => {
         // collect a RUM resource's response headers
         if (event.type === 'resource' && event.resource.type === 'fetch') {
               event.context.responseHeaders = Object.fromEntries(context.response.headers)
         }
         return true
      },
      ...
   });
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.init({
         ...,
         beforeSend: (event, context) => {
               // collect a RUM resource's response headers
               if (event.type === 'resource' && event.resource.type === 'fetch') {
                  event.context.responseHeaders = Object.fromEntries(context.response.headers)
               }
               return true
         },
         ...
      })
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
      window.DD_RUM.init({
         ...,
         beforeSend: (event, context) => {
               // collect a RUM resource's response headers
               if (event.type === 'resource' && event.resource.type === 'fetch') {
                  event.context.responseHeaders = Object.fromEntries(context.response.headers)
               }
               return true
         },
         ...
      });
   ```   
   {% /if %}

사용자가 여러 팀에 속한 경우, 호출에 포함된 추가적인 키-값 쌍을 Global Context API에 추가합니다.

RUM Browser SDK는 `event.context` 외부에서 추가된 속성을 무시합니다.

### 기능 플래그를 사용하여 RUM 이벤트 강화 {% #enrich-rum-events-with-feature-flags %}

[기능 플래그를 사용하여 RUM 이벤트 데이터를 강화][14]하면 성능 모니터링에 대한 추가적인 컨텍스트와 가시성을 얻을 수 있습니다. 이렇게 하면 어느 사용자에게 특정 사용자 경험이 표시되는지, 그 사실이 해당 사용자의 성능에 좋지 않은 영향을 미치는지 판단할 수 있습니다.

### RUM 이벤트 내용 수정 {% #modify-the-content-of-a-rum-event %}

예를 들어 웹 애플리케이션 URL에서 이메일 주소를 삭제하려면 다음과 같이 설정합니다.
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      ...,
      beforeSend: (event) => {
         // remove email from view url
         event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
      },
      ...
   });
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.init({
         ...,
         beforeSend: (event) => {
               // remove email from view url
               event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
         },
         ...
      })
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
      window.DD_RUM.init({
         ...,
         beforeSend: (event) => {
               // remove email from view url
               event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
         },
         ...
      });
   ```
   {% /if %}

다음 이벤트 속성을 업데이트할 수 있습니다.

| 속성                      | 유형   | 설명                                                                                                                                                                               |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `view.url`                     | 문자열 | 활성 웹 페이지의 URL입니다.                                                                                                                                                           |
| `view.referrer`                | 문자열 | 현재 요청된 페이지로 연결된 링크가 포함되어 있던 이전 웹 페이지의 URL입니다.                                                                                          |
| `view.name`                    | 문자열 | 현재 조회의 이름입니다.                                                                                                                                                             |
| `view.performance.lcp.resource_url` | 문자열 |   Largest Contentful Paint의 리소스 URL입니다.                                                                                                                                 |
| `service`                      | 문자열 | 애플리케이션의 서비스 이름입니다.                                                                                                                                                    |
| `version`                      | 문자열 | 애플리케이션의 버전입니다. 예: 1.2.3, 6c44da20 또는 2020.02.13.                                                                                                                  |
| `action.target.name`           | 문자열 | 사용자가 상호작용한 요소입니다. 자동으로 수집된 액션에만 해당합니다.                                                                                                      |
| `error.message`                | 문자열 | 오류를 설명하는 간결하고 사람이 읽을 수 있는 한 줄 메시지입니다.                                                                                                                         |
| `error.stack`                 | 문자열 | 스택 트레이스 또는 오류에 관한 보완 정보입니다.                                                                                                                             |
| `error.resource.url`           | 문자열 | 오류를 트리거한 리소스 URL입니다.                                                                                                                                                |
| `resource.url`                 | 문자열 | 리소스 URL입니다.                                                                                                                                                                         |
| `long_task.scripts.source_url` | 문자열 | 스크립트 리소스 url                                                                                                                                                                   |
| `long_task.scripts.invoker`    | 문자열 | 스크립트가 어떻게 호출되었는지 나타내는 의미 있는 이름                                                                                                                                    |
| `context`                      | 개체 | [Global Context API](#global-context), [View Context API](#view-context)를 사용하여, 또는 이벤트를 수동으로 생성할 때 추가된 속성입니다(예: `addError` 및 **`addAction`**). |

RUM Browser SDK는 위의 목록에 나열되지 않은 이벤트 속성에 적용된 수정 사항을 무시합니다. 이벤트 속성에 관한 자세한 내용은 [RUM Browser SDK GitHub 리포지토리][15]를 참조하세요.

**참고**: 다른 이벤트와는 달리 조회 이벤트는 이벤트 수명 주기 동안 발생한 업데이트를 반영하여 Datadog에 여러 번 전송됩니다. 새 조회가 활성인 동안에도 이전 조회 이벤트에 대한 업데이트가 전송될 수 있습니다. Datadog에서는 조회 이벤트의 내용을 수정할 때 이 동작을 유의할 것을 권장합니다.

```javascript
beforeSend: (event) => {
    // discouraged, as the current view name could be applied to both the active view and the previous views
    event.view.name = getCurrentViewName()

    // recommended
    event.view.name = getViewNameForUrl(event.view.url)
}
```

### RUM 이벤트 삭제 {% #discard-a-rum-event %}

`beforeSend` API를 사용하여 `false`를 반환하여 RUM 이벤트 삭제:
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
   ...,
   beforeSend: (event) => {
      if (shouldDiscard(event)) {
         return false
      }
      ...
   },
   ...
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            if (shouldDiscard(event)) {
                return false
            },
            ...
        },
        ...
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            if (shouldDiscard(event)) {
                return false
            }
            ...
        },
        ...
    });
```
{% /if %}

**참고**: 조회 이벤트는 삭제할 수 없습니다.

## 사용자 세션 {% #user-session %}

RUM 세션에 사용자 정보를 추가하면 다음과 같은 장점이 있습니다.

- 주어진 사용자의 여정을 따라감
- 오류로 인해 가장 영향을 많이 받는 사용자 파악
- 가장 중요한 사용자의 성능 모니터링

{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI의 사용자 API" /%}

<!-- Version must meet 6.4.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "6.4.0") %}
버전 6.4.0 이상에서는 다음 속성을 사용할 수 있습니다.

| 속성  | 유형 | 필수 |  설명                                                                                              |
|------------|------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | 문자열 | 예 | 고유한 사용자 식별자입니다.                                                                                  |
| `usr.name`  | 문자열 | 아니요 | RUM UI에 기본적으로 표시되는 사용자 친화적인 이름입니다.                                                  |
| `usr.email` | 문자열 | 아니요 | 사용자 이름이 없는 경우 RUM UI에 표시되는 사용자 이메일입니다. Gravatars를 가져오는 데에도 이것이 사용됩니다. |
{% /if %}
<!-- ends  6.4.0 -->

<!-- Version must not meet 6.4.0 -->
{% if not(semverIsAtLeast($rum_browser_sdk_version, "6.4.0")) %}
아래의 속성은 6.4.0 이전 버전에서는 선택 사항이지만, Datadog에서는 이러한 속성을 하나 이상 제공할 것을 강력히 권장합니다. 예를 들어 세션에서 사용자 ID를 설정해야 일부 기본 RUM 대시보드에서 관련 데이터를 확인할 수 있으며, 이것은 쿼리의 일부분으로 `usr.id`에 의존합니다.

| 속성  | 유형 | 설명                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | 문자열 | 고유한 사용자 식별자입니다.                                                                                  |
| `usr.name`  | 문자열 | RUM UI에 기본적으로 표시되는 사용자 친화적인 이름입니다.                                                  |
| `usr.email` | 문자열 | 사용자 이름이 없는 경우 RUM UI에 표시되는 사용자 이메일입니다. Gravatars를 가져오는 데에도 이것이 사용됩니다. |

**참고**:`usr.name`이 설정되지 않은 경우 RUM UI에는 'Public User'가 표시되며, 이는 `usr.email` 및 `usr.id`가 정의되었더라도 마찬가지입니다.

권장 속성에 추가 속성을 더하여 필터링 기능을 강화하세요. 예를 들어 사용자 계획에 관한 정보나, 소속 사용자 그룹이 무엇인지 정보를 추가합니다.

사용자 세션 개체를 변경할 때 변경 후 수집된 모든 RUM 이벤트에는 업데이트된 정보가 포함됩니다.

**참고**: 로그아웃할 때와 같이 사용자 세션 정보를 삭제하면 로그아웃 전 마지막 조회의 사용자 정보는 유지되지만 이후 조회 또는 세션 수준에서는 유지되지 않습니다. 세션 데이터는 마지막 조회의 값을 사용하기 때문입니다.
{% /if %}
<!-- ends not 6.4.0 -->

### 사용자 세션 식별 {% #identify-user-session %}

`datadogRum.setUser(<USER_CONFIG_OBJECT>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUser({
        id: '1234',
        name: 'John Doe',
        email: 'john@doe.com',
        plan: 'premium',
        ...
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{% /if %}

### 사용자 세션 액세스 {% #access-user-session %}

`datadogRum.getUser()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.getUser()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getUser()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getUser()
```
{% /if %}

### 사용자 세션 속성 추가/재정의 {% #addoverride-user-session-property %}

`datadogRum.setUserProperty('<USER_KEY>', <USER_VALUE>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setUserProperty('name', 'John Doe')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUserProperty('name', 'John Doe')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setUserProperty('name', 'John Doe')
```
{% /if %}

### 사용자 세션 속성 제거 {% #remove-user-session-property %}

`datadogRum.removeUserProperty('<USER_KEY>')`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.removeUserProperty('name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeUserProperty('name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.removeUserProperty('name')
```
{% /if %}

### 사용자 세션 속성 지우기 {% #clear-user-session-property %}

`datadogRum.clearUser()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.clearUser()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearUser()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.clearUser()
```
{% /if %}

## 계정 {% #account %}

여러 사용자를 다양한 세트로 그룹화하려면 계정 개념을 사용합니다.

사용할 수 있는 속성은 다음과 같습니다.

| 속성      | 유형   | 필수 | 설명                                                |
|----------------|--------|----------|------------------------------------------------------------|
| `account.id`   | 문자열 | 예      | 고유한 사용자 식별자입니다.                                 |
| `account.name` | 문자열 | 아니요       | RUM UI에 기본적으로 표시되는 계정 친화적인 이름입니다. |

### 계정 식별 {% #identify-account %}

`datadogRum.setAccount(<ACCOUNT_CONFIG_OBJECT>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccount({
        id: '1234',
        name: 'My Company Name',
        ...
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```
{% /if %}

### 계정 액세스 {% #access-account %}

`datadogRum.getAccount()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.getAccount()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getAccount()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getAccount()
```
{% /if %}

### 계정 속성 추가/재정의 {% #addoverride-account-property %}

`datadogRum.setAccountProperty('<ACCOUNT_KEY>', <ACCOUNT_VALUE>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setAccountProperty('name', 'My Company Name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccountProperty('name', 'My Company Name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setAccountProperty('name', 'My Company Name')
```
{% /if %}

### 계정 속성 제거 {% #remove-account-property %}

`datadogRum.removeAccountProperty('<ACCOUNT_KEY>')`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.removeAccountProperty('name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeAccountProperty('name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.removeAccountProperty('name')
```
{% /if %}

### 계정 속성 지우기 {% #clear-account-properties %}

`datadogRum.clearAccount()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.clearAccount()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearAccount()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.clearAccount()
```
{% /if %}

## 샘플링 {% #sampling %}

기본적으로 수집된 세션의 수에는 샘플링이 적용되지 않습니다. 수집된 세션 수에 상대적 샘플링을 적용하려면(백분율로) RUM을 초기화할 때 `sessionSampleRate` 파라미터를 사용하세요.

다음 예에서는 주어진 RUM 애플리케이션의 모든 세션 중 90%만 수집합니다.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    sessionSampleRate: 90,
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    });
```
{% /if %}

샘플링된 세션의 경우 해당 세션에 대한 모든 페이지 조회 수 및 관련 텔레메트리가 수집되지 않습니다.

## 사용자 추적 동의 {% #user-tracking-consent %}

RUM Browser SDK는 GDPR, CCPA 및 유사한 규정을 준수하기 위해 초기화 시 추적 동의 값을 제공하게 해줍니다. 추적 동의에 관한 자세한 내용은 [Data Security][17]를 참조하세요.

`trackingConsent` 초기화 파라미터는 다음 값 중 하나일 수 있습니다.

1. `"granted"`(기본값): RUM Browser SDK가 데이터를 수집하기 시작하고 데이터를 Datadog으로 보냅니다.
2. `"not-granted"`: RUM Browser SDK가 데이터를 수집하지 않습니다.

RUM Browser SDK가 초기화된 이후에 추적 동의 값을 변경하려면 `setTrackingConsent()` API 호출을 사용하세요. RUM Browser SDK는 새 값에 따라 동작을 변경합니다.

- `"granted"`에서 `"not-granted"`로 변경되면 RUM 세션이 중지되고 데이터가 더 이상 Datadog으로 전송되지 않습니다.
- `"not-granted"`에서 `"granted"`로 변경되면 새 RUM 세션이 생성되고(활성인 이전 세션이 없는 경우), 데이터 수집이 재개됩니다.

이 상태는 탭 간에 동기화되지 않고, 탐색 간에 지속되지도 않습니다. 사용자에게는 RUM Browser SDK 초기화 중에 또는 `setTrackingConsent()`를 사용하여 사용자 결정을 제공할 책임이 있습니다.

`setTrackingConsent()`를 `init()` 이전에 사용한 경우, 제공된 값이 초기화 파라미터보다 우선합니다.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', function() {
    datadogRum.setTrackingConsent('granted');
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        trackingConsent: 'not-granted'
    });
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.setTrackingConsent('granted');
    });
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM && window.DD_RUM.setTrackingConsent('granted');
});
```
{% /if %}

## 조회 컨텍스트 {% #view-context %}


[버전 5.28.0][20]부터 조회 이벤트의 컨텍스트를 수정할 수 있습니다. 컨텍스트는 현재 조회에만 추가할 수 있고, 현재 조회의 하위 이벤트(예 `action`, `error`, `timing`)를 `startView`, `setViewContext`, `setViewContextProperty` 함수로 채웁니다.

### 컨텍스트 포함 조회 시작 {% #start-view-with-context %}

선택 사항으로, 조회를 시작하면서 [`startView` 옵션](#override-default-rum-view-names)으로 컨텍스트를 정의합니다.

### 조회 컨텍스트 추가 {% #add-view-context %}

`setViewContextProperty(key: string, value: any)` API.를 사용하여 RUM 조회 이벤트 및 해당 하위 이벤트의 컨텍스트를 강화하거나 수정합니다.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
datadogRum.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

### 조회 컨텍스트 교체 {% #replace-view-context %}

`setViewContext(context: Context)` API를 사용하여 RUM 조회 이벤트 및 해당 하위 이벤트의 컨텍스트를 교체합니다.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setViewContext({
    originalUrl: 'shopist.io/department/chairs',
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContext({
      originalUrl: 'shopist.io/department/chairs',
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setViewContext({
        originalUrl: 'shopist.io/department/chairs',
    });
```
{% /if %}

## 오류 컨텍스트 {% #error-context %}

### dd_context를 사용하여 로컬 오류 컨텍스트 연결 {% #attaching-local-error-context-with-dd-context %}

오류를 캡처할 때 오류가 생성되는 시점에 추가적인 컨텍스트가 제공될 수 있습니다. `addError()` API를 통해 추가 정보를 전달하지 않고, 오류 인스턴스에 직접 `dd_context` 속성을 연결할 수 있습니다. RUM Browser SDK가 이 속성을 자동으로 감지하여 최종 오류 이벤트 컨텍스트에 병합합니다.

```javascript
const error = new Error('Something went wrong')
error.dd_context = { component: 'Menu', param: 123, }
throw error
```

## 글로벌 컨텍스트 {% #global-context %}

### 글로벌 컨텍스트 속성 추가 {% #add-global-context-property %}

RUM이 초기화된 이후 애플리케이션에서 수집된 모든 RUM 이벤트에 추가 컨텍스트를 추가하려면`setGlobalContextProperty(key: string, value: any)` API를 사용합니다.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setGlobalContextProperty('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// Code example
datadogRum.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

### 글로벌 컨텍스트 속성 제거 {% #remove-global-context-property %}

이전에 정의된 글로벌 컨텍스트 속성을 제거할 수 있습니다.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
datadogRum.removeGlobalContextProperty('codeVersion');
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
```
{% /if %}

### 글로벌 컨텍스트 교체 {% #replace-global-context %}

모든 RUM 이벤트의 기본 컨텍스트를 `setGlobalContext(context: Context)` API로 교체합니다.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setGlobalContext({
    codeVersion: 34,
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    });
```
{% /if %}

### 글로벌 컨텍스트 지우기 {% #clear-global-context %}

`clearGlobalContext`를 사용하여 글로벌 컨텍스트를 지울 수 있습니다.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.clearGlobalContext();
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.clearGlobalContext();
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.clearGlobalContext();
```
{% /if %}

### 글로벌 컨텍스트 읽기 {% #read-global-context %}

RUM이 초기화된 이후, 글로벌 컨텍스트를 읽으려면 `getGlobalContext()` API를 사용합니다.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getGlobalContext();
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
  const context = window.DD_RUM.getGlobalContext();
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
const context = window.DD_RUM && window.DD_RUM.getGlobalContext();
```
{% /if %}

## 컨텍스트 수명 주기 {% #contexts-life-cycle %}

기본적으로 글로벌 컨텍스트 및 사용자 컨텍스트는 현재 페이지 메모리에 저장되는데 이는 다음을 의미합니다.

- 페이지를 완전히 다시 로드한 이후 유지되지 않음
- 동일한 세션의 다른 탭이나 창에서 공유되지 않음

컨텍스트를 세션의 모든 이벤트에 추가하려면 모든 페이지에 연결해야 합니다.

<!-- Version must meet 4.49.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "4.49.0") %}
버전 4.49.0에서 `storeContextsAcrossPages` 구성 옵션이 도입되어서, 그러한 컨텍스트를 [`localStorage`][18]에 저장할 수 있으므로 다음과 같은 동작이 가능합니다.

- 전체 다시 로드 이후에도 컨텍스트가 보존됨
- 동일한 출처에서 열린 여러 탭 간에 컨텍스트가 동기화됨

단, 이 기능에는 몇 가지 **제한 사항**이 있습니다.

- `localStorage`가 사용자 세션보다 수명이 길기 때문에 그러한 컨텍스트에 개인 식별 정보(PII)를 설정하는 것은 권장되지 않음
- `localStorage` 데이터는 동일한 출처에서만 공유되므로(login.site.com ≠ app.site.com) 이 기능은 `trackSessionAcrossSubdomains` 옵션과 호환되지 않음
- `localStorage`는 출처별로 5MiB로 제한되므로, 로컬 스토리지에 저장된 애플리케이션별 데이터, Datadog 컨텍스트 및 기타 타사 데이터는 이 한도 이내여야만 문제 발생을 방지할 수 있음

{% /if %}
<!-- ends  4.49.0 -->

## 내부 컨텍스트 {% #internal-context %}

Datadog 브라우저 RUM SDK가 초기화된 후 SDK에 대한 내부 컨텍스트에 액세스할 수 있습니다. 이렇게 하면 세션 ID 및 애플리케이션 세부 정보와 같이 SDK가 내부적으로 사용하는 코어 식별자와 메타데이터가 제공됩니다.

다음 속성을 탐색할 수 있습니다.

| 속성      | 설명                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | 애플리케이션의 ID입니다.                                            |
| session_id     | 세션의 ID입니다.                                                |
| user_action    | 액션 ID를 포함하는 개체입니다(또는, 액션을 찾을 수 없는 경우 undefined). |
| view           | 현재 조회 이벤트에 관한 세부 정보를 포함하는 개체입니다.           |

자세한 정보는 [수집된 RUM 브라우저 데이터][2]를 참조하세요.

### 예시 {% #example %}

```json
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

선택 사항으로 `startTime` 파라미터를 사용해 특정 시간의 컨텍스트를 가져올 수 있습니다. 파라미터가 생략된 경우, 현재 컨텍스트가 반환됩니다.

```typescript
getInternalContext (startTime?: 'number' | undefined)
```
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```
{% /if %}


## 마이크로 프론트엔드 {% #micro-frontend %}

RUM Browser SDK는 `service` 및 `version` 속성을 사용하여 이벤트를 특정 마이크로 프론트엔드에 귀속함으로써 마이크로 프론트엔드 아키텍처를 지원합니다. RUM SDK 인스턴스 한 개가 셸 수준에서 실행됩니다. 이벤트가 `service` 및 `version` 기준으로 세분화되므로 여러 팀이 대시보드를 필터링하고 경보를 설정하고 마이크로 프론트엔드당 성능을 추적할 수 있습니다.

Datadog은 RUM 이벤트를 마이크로 프론트엔드에 귀속하는 두 가지 방법을 제공합니다.

1. **자동 어트리뷰션**: 소스 코드 컨텍스트를 주입하는 빌드 플러그인 사용, 수동 스택 트레이스 구문 분석 제거
2. **수동 어트리뷰션**: `beforeSend` 콜백을 사용하여 스택 트레이스를 구문 분석하고 서비스 정보 추출


### 자동 서비스 및 버전 어트리뷰션 {% #automatic-service-and-version-attribution %}

이 방식은 빌드 플러그인을 사용하여 번들에 소스 코드 컨텍스트를 주입하며, RUM SDK가 이것을 자동으로 읽어 이벤트를 올바른 `service` 및 `version`으로 강화합니다.

#### 전제 조건 및 지원되는 설정 {% #prerequisites-and-supported-setups %}

-   **분리된 번들**: 각 마이크로 프론트엔드에 고유한 파일 경로가 있는 자체 번들이 있습니다. 예를 들어 [모듈 페더레이션][21]을 사용합니다.
-   **지원되는 bundler**: [Datadog 빌드 플러그인이 지원하는][22] bundler를 사용합니다.
-   **Browser SDK**: Browser SDK 버전 v6.30.1 이상이어야 합니다.

#### 설정 가이드 {% #setup-guide %}

**1단계 - 각 마이크로 프론트엔드에 대하여 [빌드 플러그인][23] 구성**

각 마이크로 프론트엔드의 빌드 구성에서 소스 코드 컨텍스트 주입 활성화:

{% tabs %}
{% tab label="Webpack" %}

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
    plugins: [
        new datadogWebpackPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="Vite" %}

```javascript
import { datadogVitePlugin } from '@datadog/vite-plugin';

export default {
    plugins: [
        datadogVitePlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="esbuild" %}

```javascript
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
    plugins: [
        datadogEsbuildPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
});
```
{% /tab %}

{% tab label="Rollup" %}

```javascript
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
    plugins: [
        datadogRollupPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="Rspack" %}

```javascript
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
    plugins: [
        new datadogRspackPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}
{% /tabs %}

**2단계 - 셸 수준에서 Browser SDK 설정**

셸 애플리케이션(메인 진입점)에서 [브라우저 모니터링을 설정][4]합니다. Browser SDK가 컨텍스트 맵의 `service` 및 `version`을 사용하여 자동으로 RUM 이벤트를 강화합니다(오류, 사용자 지정 액션, XHR/Fetch 리소스, 긴 작업, 바이탈).

{% alert level="warning" %}
일치하는 마이크로 프론트엔드가 없는 이벤트는 셸 수준 서비스 및 버전으로 폴백합니다.
{% /alert %}

**3단계 - [Datadog에서 마이크로 프론트엔드 데이터 탐색](#explore-micro-frontend-data-in-datadog)**


<!-- Version must meet 5.22 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "5.22") %}

### 수동 서비스 및 버전 어트리뷰션 {% #manual-service-and-version-attribution %}

`beforeSend` 속성에서 서비스 및 버전 속성을 재정의할 수 있습니다. 이벤트 출처를 알아보기 쉽도록 `context.handlingStack` 속성을 사용하세요.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        const stack = context?.handlingStack || event?.error?.stack;
        const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

        if (service && version) {
          event.service = service;
          event.version = version;
        }

        return true;
    },
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            const stack = context?.handlingStack || event?.error?.stack;
            const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

            if (service && version) {
                event.service = service;
                event.version = version;
            }

            return true;
        },
    });
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

window.DD_RUM && window.DD_RUM.init({
    ...,
    beforeSend: (event, context) => {
        const stack = context?.handlingStack || event?.error?.stack;
        const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

        if (service && version) {
          event.service = service;
          event.version = version;
        }

        return true;
    },
});
```
{% /if %}

정규식이 애플리케이션의 파일 경로 구조와 일치해야 합니다. 패턴을 조정하여 번들 URL에서 서비스 및 버전을 추출하세요. RUM Explorer의 모든 쿼리는 서비스 속성을 사용하여 이벤트를 필터링할 수 있습니다.
<!-- ends  5.22 -->

{% /if %}

### 제한 사항 {% #limitations %}

#### 출처가 귀속되지 않은 이벤트 {% #events-without-an-attributed-origin %}

일부 이벤트는 연결된 처리 스택이 없으므로 출처에 귀속될 수 없음:

-   자동으로 수집된 액션 이벤트
-   XHR 및 Fetch 외의 리소스 이벤트
-   자동으로 수집된 조회 이벤트
-   CORS 및 CSP 위반

#### 마이크로 프론트엔드 간 소스 맵 리졸브 {% #source-map-resolution-across-micro-frontends %}

스택 트레이스가 마이크로 프론트엔드 여러 개의 프레임을 포함하는 경우, 이벤트는 최상위 프레임(오류가 발생한 곳)에서 `service` 및 `version`을 한 개 수신합니다. 소스 맵은 해당 서비스 아래의 이벤트에 대하여 리졸브되므로 다른 마이크로 프론트엔드의 프레임은 축소된 상태로 유지되며, 이는 해당 소스 맵이 자체 `service` 아래에 올바로 업로드되었더라도 마찬가지입니다.

어느 마이크로 프론트엔드의 소스 맵을 사용할지 제어하려면 [수동 어트리뷰션](#manual-service-and-version-attribution) 방식을 `beforeSend`로 사용하여 `event.service` 및 `event.version`을 설정하세요. 선택한 마이크로 프론트엔드에 속하는 프레임만 축소 해제됩니다.

### Datadog에서 마이크로 프론트엔드 데이터 탐색 {% #explore-micro-frontend-data-in-datadog %}

설정한 이후, RUM 이벤트의 `service` 및 `version`을 보면 각 이벤트를 어느 마이크로 프론트엔드가 생성했는지 알 수 있습니다. 이러한 속성을 Datadog의 여러 장소에서 사용합니다.

-   **사이드 패널**: `service` 및 `version` 속성이 RUM Explorer의 세션, 조회, 오류, 리소스, 액션 및 긴 작업 사이드 패널에 표시됩니다.
-   **RUM 요약 대시보드**: `service` 및 `version`을 사용하여 RUM 요약 대시보드를 필터링해 성능 메트릭의 범위를 특정 마이크로 프론트엔드로 지정합니다.
-   **사용자 지정 대시보드**: `service` 및 `version`을 사용하여 대시보드를 생성해 각 마이크로 프론트엔드를 독립적으로 모니터링합니다.

각 마이크로 프론트엔드를 나타내는 `service` 및 `version` 태그는 다음 [RUM without Limits][24] 메트릭에서도 찾을 수 있습니다.

- `rum.measure.error`
- `rum.measure.operation`
- `rum.measure.operation.duration`

[1]: /ko/real_user_monitoring/application_monitoring/browser/data_collected/
[2]: /ko/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: /ko/real_user_monitoring/application_monitoring/browser/setup/
[5]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2130
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[12]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[13]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
[14]: /ko/real_user_monitoring/guide/enrich-and-control-rum-data
[15]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/rumEvent.types.ts
[16]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4130
[17]: /ko/data_security/real_user_monitoring/#browser-rum-use-of-cookies
[18]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[19]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v5280
[20]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration#override-default-rum-view-names
[21]: https://module-federation.io/
[22]: https://github.com/DataDog/build-plugins?tab=readme-ov-file#usage
[23]: https://github.com/DataDog/build-plugins
[24]: /ko/real_user_monitoring/rum_without_limits/