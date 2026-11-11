---
aliases:
- /ko/error_tracking/standalone_frontend/collecting_browser_errors
- /ko/real_user_monitoring/browser/collecting_browser_errors/
description: 수동 오류 수집 및 React 오류 경계를 포함해 RUM 브라우저 SDK를 사용하여 여러 소스에서 프런트엔드 오류를 수집하고
  추적하는 방법을 알아보세요.
further_reading:
- link: /error_tracking/explorer/
  tag: 설명서
  text: Datadog에서 오류 탐색
- link: /error_tracking/monitors/
  tag: 설명서
  text: 영향력이 큰 문제에 대한 선제적 경보
- link: /real_user_monitoring
  tag: 설명서
  text: 성능 및 사용자 영향 측정
title: 브라우저 오류 수집
---
## 개요 {#overview}

브라우저 SDK는 오류 메시지와 스택 트레이스(사용 가능한 경우) 등의 프런트엔드 오류를 수집합니다. Error Tracking 제품에서 이러한 오류를 분류하고 관리하는 방법은 [브라우저 오류 추적][4]을 참조하세요.

브라우저 SDK가 오류를 수집할 때 다음과 같은 작업이 실행됩니다.

* 오류는 RUM의 [오류 이벤트][14]로 캡처됩니다.
* 오류 이벤트가 포함된 세션을 대상으로 지정한 [보존 필터][15]는 현재 세션을 유지합니다.
* [RUM 메트릭][16] `rum.measure.error`, `rum.measure.session.error`, `rum.measure.view.error_free`는 세션 유지 여부와 관계없이 업데이트됩니다.
* 오류는 [Error Tracking][4]에 캡처됩니다.

[Error Tracking 규칙][17]은 _오류 이벤트_에 적용되지 않으며, RUM은 Error Tracking의 [무시 및 제외된 문제][18]와 일치하는 오류 이벤트를 계속 기록합니다. 오류가 오류 이벤트로 기록되는 것을 방지하려면 [`beforeSend` 콜백을 사용][19]하여 Datadog으로 전송되기 전에 해당 오류를 삭제해야 합니다.

## 오류 소스 {#error-sources}
프런트엔드 오류는 다음과 같은 여러 원인으로 인해 발생합니다.

- **에이전트**: SDK 실행 시
- **콘솔**: `console.error()` API 호출 시
- **커스텀**: [`addError` API를 통해 전송됨](#collect-errors-manually)
- **보고**: `ReportingObserver` API에서 발생
- **소스**: 소스 코드에서 처리되지 않은 예외 또는 처리되지 않은 약속 거부 발생 시

## 오류 속성 {#error-attributes}

모든 이벤트 유형의 기본 속성에 대한 자세한 내용은 [수집된 데이터][1]을 참조하세요. 샘플링 또는 글로벌 컨텍스트 설정에 대한 자세한 내용은 [데이터 및 컨텍스트 수정하기][2]를 참조하세요.

| 속성       | 유형   | 설명                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | 문자열 | 오류가 발생한 곳(예: `console`).         |
| `error.type`    | 문자열 | 오류 유형(또는 경우에 따라 오류 코드)입니다.                     |
| `error.message` | 문자열 | 이벤트를 설명하는 간결하고 사람이 읽을 수 있는 한 줄 메시지입니다. |
| `error.stack`   | 문자열 | 오류에 대한 스택 트레이스 또는 보완 정보입니다.     |
| `error.causes` | [목록][12] | 추가 컨텍스트를 제공하는 선택적 오류 목록입니다. 이 속성은 오류를 개별적으로 표시하고 형식을 개선하는 데 사용됩니다. 자세한 내용은 [MDN 설명서][13]를 참조하세요. |

### 소스 오류 {#source-errors}

소스 오류에는 오류에 대한 코드 수준 정보가 포함됩니다. 다양한 오류 유형에 대한 자세한 내용은 [MDN 설명서][3]에서 확인할 수 있습니다.

| 속성       | 유형   | 설명                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | 문자열 | 오류 유형(또는 경우에 따라 오류 코드)입니다.                     |

## WebAssembly 오류 추적 구성 {#configure-webassembly-error-tracking}

WebAssembly(WASM) 오류를 추적하려면 Browser SDK WASM 플러그인을 설치합니다. 플러그인과 RUM Browser SDK의 버전이 동일해야 합니다.

```shell
npm install --save-exact \
  @datadog/browser-rum@<VERSION> \
  @datadog/browser-plugin-wasm@<VERSION>
```

RUM을 초기화할 때 플러그인을 등록합니다.

```javascript
import { makeWasmPlugin } from '@datadog/browser-plugin-wasm';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  // ...
  plugins: [makeWasmPlugin()],
});
```

WASM 모듈을 로드하기 전에 RUM을 초기화합니다. 플러그인은 브라우저의 `WebAssembly` API로 생성된 모듈을 관찰하고, WASM 스택 프레임이 포함된 오류에 해당 URL 및 빌드 ID를 추가합니다. 이렇게 하면 애플리케이션이 여러 모듈을 로드할 때 Datadog에서 올바른 빌드 ID를 선택할 수 있습니다.

처리되지 않은 오류는 자동으로 수집됩니다. 처리된 WASM 오류를 보고하려면 `Error` 객체를 [`addError()`](#collect-errors-manually)에 전달합니다.

그런 다음 [WebAssembly 심볼을 업로드][20]하여 오류 심볼화를 수행합니다.

## 수동으로 오류 수집 {#collect-errors-manually}

처리된 예외, 처리된 프라미스 거부 및 Browser SDK에서 자동으로 추적되지 않는 기타 오류를 `addError()` API로 모니터링합니다.

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context
);
{{< /code-block >}}

**참고**: [Error Tracking][4]은 `custom`, `source`, `report` 또는 `console`로 설정된 소스를 전송하는 오류 및 스택 트레이스가 포함된 오류를 처리합니다. 다른 소스(예: `network`)로 전송되거나 브라우저 확장 프로그램에서 전송된 오류는 Error Tracking을 통해 처리되지 않습니다.

{{< tabs >}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Send a custom error with context
const error = new Error('Something wrong occurred.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    datadogRum.addError(error);
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    datadogRum.addError(error);
}
```
{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occurred.');

window.DD_RUM.onReady(function() {
    window.DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    });
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    })
}
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occurred.');

window.DD_RUM && window.DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && window.DD_RUM.addError(error);
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM && window.DD_RUM.addError(error);
}
```
{{% /tab %}}
{{< /tabs >}}

### React 오류 경계 계측 {#react-error-boundaries-instrumentation}

RUM Browser SDK `addError()` API를 사용하여 React [오류 경계][5]를 계측함으로써 React 렌더링 오류를 모니터링할 수 있습니다.

수집된 렌더링 오류에는 컴포넌트 스택이 포함되며, 이 스택은 [소스맵 업로드][6] 후 다른 오류 스택 추적과 마찬가지로 축소되지 않습니다.

모니터링을 위해 React 오류 경계를 계측하려면 다음을 사용하세요:

{{< tabs >}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

    datadogRum.addError(renderingError);
  }

  ...
}
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

    DD_RUM.onReady(function() {
       DD_RUM.addError(renderingError);
    });
  }

  ...
}
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

     window.DD_RUM &&
       window.DD_RUM.addError(renderingError);

  }

  ...
}
```

{{% /tab %}}
{{< /tabs >}}


## 문제 해결 {#troubleshooting}

### 스크립트 오류 {#script-error}

보안상의 이유로 브라우저는 크로스 오리진 스크립트로 인해 트리거된 오류의 세부 정보를 숨깁니다. 이 경우 {{< ui >}}Error Details{{< /ui >}} 탭에는 "Script error"라는 간략한 메시지와 함께 오류가 표시됩니다.

{{< img src="real_user_monitoring/browser/script-error.png" alt="Real User Monitoring 스크립트 오류 예시" style="width:75%;" >}}

크로스 오리진 스크립트에 대한 자세한 내용과 세부 정보가 숨겨지는 이유는 [CORS][7] 및 [글로벌 이벤트 핸들러에 대한 참고 사항][8]을 참조하세요. 이 오류 발생의 가능한 원인은 다음과 같습니다.
- JavaScript 파일이 다른 호스트 이름에서 호스팅됩니다(예: `example.com`은 `static.example.com`의 에셋 포함).
- 귀하의 웹사이트에는 CDN에서 호스팅되는 JavaScript 라이브러리가 포함되어 있습니다.
- 귀하의 웹사이트에는 공급자의 서버에서 호스팅되는 타사 JavaScript 라이브러리가 포함되어 있습니다.

다음 두 단계를 수행하여 크로스 오리진 스크립트에 대한 가시성을 확보하세요.
1. [`crossorigin="anonymous"`][9]를 통해 JavaScript 라이브러리를 호출합니다.

    `crossorigin="anonymous"`를 사용하면 스크립트를 가져오기 위한 요청이 안전하게 수행됩니다. 쿠키나 HTTP 인증을 통해 민감한 데이터가 전송되지 않습니다.

2. [`Access-Control-Allow-Origin`][10] HTTP 응답 헤더 구성:

    - `Access-Control-Allow-Origin: *` 모든 출처에서 리소스를 가져올 수 있도록 허용합니다.
    - `Access-Control-Allow-Origin: example.com` 하나의 허용된 출처를 지정합니다. 서버가 여러 출처의 클라이언트를 지원하는 경우 요청을 수행하는 특정 클라이언트의 출처를 반환해야 합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/real_user_monitoring/application_monitoring/browser/data_collected/
[2]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[4]: /ko/real_user_monitoring/error_tracking
[5]: https://legacy.reactjs.org/docs/error-boundaries.html
[6]: /ko/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs#upload-your-source-maps
[7]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[8]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes
[9]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[10]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[11]: /ko/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs
[12]: https://github.com/DataDog/rum-events-format/blob/69147431d689b3e59bff87e15bb0088a9bb319a9/lib/esm/generated/rum.d.ts#L185-L203
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
[14]: /ko/real_user_monitoring/explorer/search/#event-types
[15]: /ko/real_user_monitoring/rum_without_limits/retention_filters
[16]: /ko/real_user_monitoring/rum_without_limits/metrics
[17]: /ko/error_tracking/manage_data_collection
[18]: /ko/error_tracking/issue_states#excluding-an-issue
[19]: /ko/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#discard-a-frontend-error
[20]: /ko/real_user_monitoring/guide/upload-webassembly-symbols/