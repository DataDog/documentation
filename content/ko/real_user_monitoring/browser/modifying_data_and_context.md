---
aliases:
- /ko/real_user_monitoring/installation/advanced_configuration/
- /ko/real_user_monitoring/browser/advanced_configuration/
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: 실제 사용자 모니터링(RUM)
- link: /real_user_monitoring/browser/data_collected/
  tag: 설명서
  text: 수집된 RUM 브라우저 데이터
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: Datadog에서 보기 탐색
- link: /real_user_monitoring/explorer/visualize/
  tag: 설명서
  text: 이벤트에 시각화 적용
- link: /logs/log_configuration/attributes_naming_convention
  tag: 설명서
  text: Datadog 표준 속성
kind: 설명서
title: RUM 데이터 및 컨텍스트 수정
---

## 개요

다음의 사항을 지원하기 위해 RUM에서 [수집한 데이터][1]를 수정할 수 있는 다양한 방법이 있습니다:

- 개인 식별이 가능한 정보와 같은 민감한 데이터를 보호합니다.
- 사용자 세션을 해당 사용자의 내부 ID와 연결하여 지원합니다.
- 데이터 샘플링을 통해 수집하는 RUM 데이터 양을 줄입니다.
- 데이터의 출처에 대해 기본 속성이 제공하는 것보다 더 많은 컨텍스트를 제공합니다.

## 기본 RUM 보기 이름 재정의

RUM Browser SDK는 사용자가 새 페이지에 액세스할 때마다 또는 페이지의 URL이 변경될 때(단일 페이지 애플리케이션의 경우) [보기 이벤트][2]를 자동으로 생성합니다. 보기 이름은 현재 페이지의 URL에서 생성되며, 가변 영숫자 ID는 자동으로 삭제됩니다. 예를 들어, `/dashboard/1234`는 `/dashboard/?`가 됩니다.

[버전 2.17.0][3]부터 `trackViewsManually` 옵션을 사용하여 보기 이벤트를 수동으로 추적함으로써 보기 이름을 추가하고 팀이 소유한 전용 서비스에 할당할 수 있습니다:

1. RUM Browser SDK를 초기화할 때 `trackViewsManually`를 true로 설정합니다.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
       ...,
       trackViewsManually: true,
       ...
   });
   ```
   {{% /tab %}}
   {{% tab "CDN async" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.init({
           ...,
           trackViewsManually: true,
           ...
       })
   })
   ```
   {{% /tab %}}
   {{% tab "CDN sync" %}}
   ```javascript
   window.DD_RUM &&
       window.DD_RUM.init({
           ...,
           trackViewsManually: true,
           ...
       });
   ```
   {{% /tab %}}
   {{< /tabs >}}

2. 새 페이지 또는 경로 변경(단일 페이지 애플리케이션의 경우)이 있을 때마다 보기를 시작해야 합니다. 보기가 시작될 때 RUM 데이터가 수집됩니다. [버전 4.13.0][17]부터는 선택적으로 관련 서비스 이름과 버전을 정의할 수도 있습니다.

   - View Name: 기본값은 페이지 URL 경로입니다.
   - Service: RUM 애플리케이션을 만들 때 지정된 기본 서비스로 기본 설정됩니다.
   - Version: RUM 애플리케이션을 만들 때 지정된 기본 버전으로 기본 설정됩니다.

   자세한 내용은 [브라우저 모니터링 설정][4]을 참조하세요.

   <details open>
     <summary>Latest version</summary>
   The following example manually tracks the page views on the <code>checkout</code> page in a RUM application. Use <code>checkout</code> for the view name and associate the <code>purchase</code> service with version <code>1.2.3</code>.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
   datadogRum.startView({
     name: 'checkout',
     service: 'purchase',
     version: '1.2.3'
   })
   ```

   {{% /tab %}}
   {{% tab "CDN async" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.startView({
         name: 'checkout',
         service: 'purchase',
         version: '1.2.3'
       })
   })
   ```
   {{% /tab %}}
   {{% tab "CDN sync" %}}
   ```javascript
   window.DD_RUM && window.DD_RUM.startView({
     name: 'checkout',
     service: 'purchase',
     version: '1.2.3'
   })
   ```
   {{% /tab %}}
   {{< /tabs >}}
   </details>

   <details>
     <summary>before <code>v4.13.0</code></summary>
   The following example manually tracks the page views on the <code>checkout</code> page in a RUM application. No service or version can be specified.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
   datadogRum.startView('checkout')
   ```

   {{% /tab %}}
   {{% tab "CDN async" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.startView('checkout')
   })
   ```
   {{% /tab %}}
   {{% tab "CDN sync" %}}
   ```javascript
   window.DD_RUM && window.DD_RUM.startView('checkout')
   ```
   {{% /tab %}}
   {{< /tabs >}}

   </details>

React, Angular, Vue 또는 다른 프론트엔드 프레임워크를 사용하는 경우 Datadog은 프레임워크 라우터 수준에서 `startView` 로직을 구현할 것을 권장합니다.

### React 라우터 계측

기본 RUM 보기 이름을 재정의하여 사용자가 React 애플리케이션에서 정의한 방법과 일치하도록 하려면 다음 단계를 수행해야 합니다.

**참고**: 이 지침서는 **React Router v6** 라이브러리에만 적용됩니다.

1. [위의](#override-default-rum-view-names) 설명대로 RUM browser SDK를 초기화할 때 `trackViewsManually`를 `true`로 설정합니다.

2. 각 경로 변경에 대한 보기를 시작합니다.

   {{< tabs >}}
   {{% tab "NPM" %}}
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

   {{% /tab %}}
   {{% tab "CDN async" %}}
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
   {{% /tab %}}
   {{% tab "CDN sync" %}}
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
   {{% /tab %}}
   {{< /tabs >}}

## RUM 데이터 강화 및 제어

RUM Browser SDK는 RUM 이벤트를 캡처하고 해당 이벤트의 주요 속성을 입력합니다. `beforeSend` 콜백 기능을 통해 Datadog으로 전송되기 전 RUM Browser SDK에서 수집한 모든 이벤트에 액세스할 수 있습니다.

RUM 이벤트를 가로채면 다음과 같은 작업을 수행할 수 있습니다:

- 추가적인 컨텍스트 속성으로 RUM 이벤트 강화
- RUM 이벤트를 수정하여 해당 내용을 변경하거나 민감한 시퀀스 수정 ([편집 가능한 속성 목록](#modify-the-content-of-a-rum-event))
- 선택한 RUM 이벤트 삭제

[버전 2.13.0][5]부터 `beforeSend`는 두가지 인수를 사용합니다: RUM Browser SDK에서 생성된 `event`, 그리고 RUM 이벤트 생성을 트리거한 `context`입니다. 

```javascript
function beforeSend(event, context)
```

잠재적인 `context` 값은 다음과 같습니다:

| RUM 이벤트 유형   | 컨텍스트                   |
|------------------|---------------------------|
| 보기             | [위치][6]                  |
| 액션           | [이벤트][7]                     |
| 리소스 (XHR)   | [XMLHttpRequest][8] 및 [PerformanceResourceTiming][9]            |
| 리소스 (Fetch) | [요청][10], [응답][11] 및 [PerformanceResourceTiming[9]      |
| 리소스 (기타) | [PerformanceResourceTiming][9] |
| 오류            | [오류][12]                     |
| 긴 작업        | [PerformanceLongTaskTiming][13] |

자세한 내용은 [RUM 데이터 강화 및 제어 가이드][14]를 참조하세요.

### RUM 이벤트 강화

[Global Context API](#global-context) 또는 [기능 플래그 데이터 수집](#enrich-rum-events-with-feature-flags)으로 추가된 속성과 함께 이벤트에 추가 컨텍스트 속성을 추가할 수 있습니다. 예를 들어, 가져오기 응답 개체에서 추출한 데이터로 RUM 리소스 이벤트에 태그를 지정할 수 있습니다:

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        // RUM 리소스의 응답 헤더를 수집합니다.
        if (event.type === 'resource' && event.resource.type === 'fetch') {
            event.context = {...event.context, responseHeaders: context.response.headers}
        }
    },
    ...
});
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            // RUM 리소스의 응답 헤더를 수집합니다.
            if (event.type === 'resource' && event.resource.type === 'fetch') {
                event.context = {...event.context, responseHeaders: context.response.headers}
            }
        },
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            // RUM 리소스의 응답 헤더를 수집합니다.
            if (event.type === 'resource' && event.resource.type === 'fetch') {
                event.context = {...event.context, responseHeaders: context.response.headers}
            }
        },
        ...
    });
```
{{% /tab %}}
{{< /tabs >}}

사용자가 여러 팀에 속한 경우, 호출에 포함된 키-값 쌍을 Global Context API에 추가합니다.

RUM Browser SDK는 다음을 무시합니다:

- `event.context` 외부에서 추가된 속성
- RUM 보기 이벤트 컨텍스트에 대한 수정사항

### 기능 플래그를 사용하여 RUM 이벤트 강화
{{< callout btn_hidden="true" header="기능 플래그 추적 베타 버전에 참여하세요!">}}
기능 플래그 추적 베타 버전에 참여하려면 <a href="/real_user_monitoring/guide/setup-feature-flag-data-collection/">데이터 수집을 설정하세요</a>.
{{< /callout >}}

성능 모니터링에 대한 추가적인 컨텍스트와 가시성을 확보하기 위해 [기능 플래그를 사용하여 RUM 이벤트 데이터를 강화][6]할 수 있습니다. 이를 통해 어떤 사용자에게 특정 사용자 경험이 표시되는지, 그리고 해당 경험이 사용자의 성능에 부정적인 영향을 미치는지 확인할 수 있습니다.

### RUM 이벤트 내용 수정

예를 들어 웹 애플리케이션 URL에서 이메일 주소를 삭제할 수 있습니다:

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event) => {
        // 보기 URL에서 이메일 제거
        event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
    },
    ...
});
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            // 보기 URL에서 이메일 제거
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            // 보기 URL에서 이메일 제거
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    });
```
{{% /tab %}}
{{< /tabs >}}

다음 이벤트 속성을 업데이트할 수 있습니다:

|   속성           |   유형    |   설명                                                                                       |
|-----------------------|-----------|-----------------------------------------------------------------------------------------------------|
|   `view.url`            |   문자열  |   활성화된 웹 페이지의 URL.                            |
|   `view.referrer`       |   문자열  |   현재 요청된 페이지에 대한 링크가 따라온 이전 웹 페이지의 URL.  |
|   `view.name`           |   문자열  |   현재 보기의 이름.                            |
|   `action.target.name`  |   문자열  |   사용자가 상호 작용한 요소. 자동으로 수집된 액션에만 해당합니다.              |
|   `error.message`       |   문자열  |   오류를 설명하는 간결하고 사람이 읽을 수 있는 한 줄 메시지.                                 |
|   `error.stack `        |   문자열  |   스택 트레이스 또는 오류에 대한 보완 정보.                                     |
|   `error.resource.url`  |   문자열  |   오류를 트리거한 리소스 URL.                                                        |
|   `resource.url`        |   문자열  |   리소스 URL.                                                                                 |
|   `context`        |   개체  |   [Global Context API](#global-context)로 추가하거나 수동으로 이벤트를 생성할 때 추가된 속성(예: `addError` 및 `addAction`)입니다. RUM 보기 이벤트 `context`는 읽기 전용입니다.                                                                                 |

RUM Browser SDK는 위에 나열되지 않은 이벤트 속성에 대한 수정 사항은 무시합니다. 이벤트 속성에 대한 자세한 내용은 [RUM Browser SDK GitHub 리포지토리][15]를 참조하세요.

### RUM 이벤트 삭제

`beforeSend` API과 함께 `false`를 반환하여 RUM 이벤트를 삭제합니다:

{{< tabs >}}
{{% tab "NPM" %}}

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
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
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
{{% /tab %}}
{{< /tabs >}}

**참고**: 보기 이벤트는 삭제할 수 없습니다.

## 사용자 세션

RUM 세션에 사용자 정보를 추가하면 다음과 같이 도움이 될 수 있습니다.
* 특정 사용자의 활동 경로를 추적합니다.
* 오류의 영향을 가장 많이 받는 사용자를 파악할 수 있습니다.
* 가장 중요한 사용자를 위한 성능 모니터링

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI의 사용자 API" >}}

다음 속성은 선택 사항이지만, Datadog은 이 중 하나 이상을 제공할 것을 권장합니다:

| 속성  | 유형 | 설명                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | 문자열 | 고유한 사용자 식별자.                                                                                  |
| `usr.name`  | 문자열 | RUM UI에 기본적으로 표시되는 사용자 친화적인 이름.                                                  |
| `usr.email` | 문자열 | 사용자 이메일. 사용자 이름이 없는 경우 RUM UI에 표시되며, Gravatars를 가져오는 데 사용되기도 합니다. |

권장 속성 외에 추가 속성을 추가하여 필터링 기능을 향상시킬 수 있습니다. 예를 들어 사용자 요금제 또는 해당 사용자가 속한 사용자 그룹에 대한 정보를 추가할 수 있습니다.

사용자 세션 개체를 변경할 때 변경 후 수집된 모든 RUM 이벤트에는 업데이트된 정보가 포함됩니다.

**참고**: 로그아웃할 때와 같이 사용자 세션 정보를 삭제하면 로그아웃 전 마지막 보기의 사용자 정보는 유지되지만 세션 데이터는 마지막 보기의 값을 사용하므로 이후 보기나 세션 수준에는 유지되지 않습니다.

### 사용자 세션 식별

`datadogRum.setUser(<USER_CONFIG_OBJECT>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```

{{% /tab %}}
{{< /tabs >}}

### 사용자 세션 엑세스

`datadogRum.getUser()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.getUser()
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getUser()
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.getUser()
```

{{% /tab %}}
{{< /tabs >}}

### 사용자 세션 속성 추가/재정의

`datadogRum.setUserProperty('<USER_KEY>', <USER_VALUE>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUserProperty('name', 'John Doe')
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUserProperty('name', 'John Doe')
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setUserProperty('name', 'John Doe')
```

{{% /tab %}}
{{< /tabs >}}

### 사용자 세션 속성 제거

`datadogRum.removeUserProperty('<USER_KEY>')`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.removeUserProperty('name')
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
window.DD_RUM.removeUserProperty('name')
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.removeUserProperty('name')
```
{{% /tab %}}
{{< /tabs >}}

### 사용자 세션 속성 지우기

`datadogRum.clearUser()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.clearUser()
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearUser()
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.clearUser()
```
{{% /tab %}}
{{< /tabs >}}

## 샘플링

기본적으로 수집된 세션 수에는 샘플링이 적용되지 않습니다. 수집된 세션 수에 상대적인 샘플링(%)을 적용하려면 RUM을 초기화할 때 `sessionSampleRate` 파라미터를 사용하세요.

다음 예제는 주어진 RUM 애플리케이션의 모든 세션 중 90%만 수집합니다.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    sessionSampleRate: 90,
});
```
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    });
```
{{% /tab %}}
{{< /tabs >}}

샘플링된 세션의 경우 해당 세션의 모든 페이지 조회수 및 관련 원격 분석이 수집되지 않습니다.

## 글로벌 컨텍스트

### 글로벌 컨텍스트 속성 추가

RUM이 초기화된 후 `setGlobalContextProperty(key: string, value: any)` API를 사용하여 애플리케이션에서 수집된 모든 RUM 이벤트에 추가 컨텍스트를 추가합니다:

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setGlobalContextProperty('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// 코드 예시
datadogRum.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// 코드 예시
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// 코드 예시
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{< /tabs >}}

### 글로벌 컨텍스트 속성 제거

이전에 정의된 글로벌 컨텍스트 속성을 제거할 수 있습니다.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.removeGlobalContextProperty('<CONTEXT_KEY>');

// 코드 예시
datadogRum.removeGlobalContextProperty('codeVersion');
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');
})

// 코드 예시
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');

// 코드 예시
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
```

{{% /tab %}}
{{< /tabs >}}


### 글로벌 컨텍스트 대체

모든 RUM 이벤트에 대한 기본 컨텍스트를 `setGlobalContext(context: Context)` API로 교체합니다.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// 코드 예시
datadogRum.setGlobalContext({
    codeVersion: 34,
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// 코드 예시
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// 코드 예시
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    });
```

{{% /tab %}}
{{< /tabs >}}

### 글로벌 컨텍스트 지우기

`clearGlobalContext`를 사용하여 글로벌 컨텍스트를 지울 수 있습니다.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.clearGlobalContext();
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.clearGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && window.DD_RUM.clearGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

### 글로벌 컨텍스트 읽기

RUM이 초기화되면 `getGlobalContext()` API로 글로벌 컨텍스트를 읽습니다.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getRumGlobalContext();
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
  const context = window.DD_RUM.getRumGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
const context = window.DD_RUM && window.DD_RUM.getRumGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

## 컨텍스트 수명 주기

기본적으로 글로벌 컨텍스트 및 사용자 컨텍스트는 현재 페이지 메모리에 저장되는데 이는 다음을 의미합니다.

- 페이지를 완전히 새로 고침한 후에는 유지되지 않습니다.
- 동일한 세션의 다른 탭 또는 창에서 공유되지 않습니다.

세션의 모든 이벤트에 추가하려면 모든 페이지에 첨부해야 합니다.

브라우저 SDK의 v4.49.0에 `storeContextsAcrossPages`설정 옵션이 도입됨에 따라 이러한 컨텍스트를 [`localStorage`][18]에 저장하여 다음과 같은 동작을 수행할 수 있습니다:

- 컨텍스트는 다시 전체 로드한 후에도 보존됩니다.
- 동일한 출처에서 열린 탭 간에 컨텍스트가 동기화됩니다.

하지만 이 기능에는 몇 가지 **제한 사항**이 있습니다:

- `localStorage`에 저장된 데이터는 사용자 세션보다 오래 지속되므로 이러한 상황에서 개인 식별 정보(PII)를 설정하는 것은 권장되지 않습니다.
- `localStorage` 데이터는 동일한 출처 (login.site.com ≠ app.site.com)에서만 공유되므로 이 기능은 `trackSessionAcrossSubdomains` 옵션과 호환되지 않습니다.
- `localStorage`는 출처별로 5 MiB라는 제한이 있으므로 로컬 스토리지에 저장된 애플리케이션별 데이터, Datadog 컨텍스트 및 기타 타사 데이터는 이 한도 내에 있어야 문제를 방지할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/data_collected/
[2]: /ko/real_user_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: /ko/real_user_monitoring/browser/#setup
[5]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2130
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[12]: https://developer.mozilla.org/en-US/docs/Web//Reference/Global_Objects/Error
[13]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
[14]: /ko/real_user_monitoring/guide/enrich-and-control-rum-data
[15]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/rumEvent.types.ts
[16]: /ko/logs/log_configuration/attributes_naming_convention/#user-related-attributes
[17]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4130
[18]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
