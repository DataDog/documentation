---
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: 설명서
  text: 오류 추적
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: 실제 사용자 모니터링(RUM)
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: Datadog에서 보기 탐색
- link: /real_user_monitoring/explorer/visualize/
  tag: 설명서
  text: 이벤트에 시각화 적용
- link: /real_user_monitoring/platform/dashboards/
  tag: 설명서
  text: RUM 대시보드
title: 브라우저 오류 수집
---
## 개요

프론트 엔드 오류는 실제 사용자 모니터링(RUM)을 사용하여 수집됩니다. 오류 메시지와 스택 트레이스는 사용 가능한 경우 포함됩니다.

## 오류 소스
프런트엔드 오류는 다음과 같은 여러 원인으로 인해 발생합니다.

- **에이전트**: SDK 실행 시
- **콘솔**: `console.error()` API 호출 시
- **커스텀**: [RUM `addError` API]와 함께 전송 시(#collect-errors-manually)
- **보고**: `ReportingObserver` API에서
- **소스**: 소스 코드에서 처리되지 않은 예외 또는 처리되지 않은 약속 거부 발생 시

## 오류 속성

모든 RUM 이벤트 유형의 기본 속성에 대한 내용은 [수집된 데이터][1]를 참조하세요. 샘플링 또는 글로벌 컨텍스트 구성에 대한 내용은 [RUM 데이터 및 콘텍스트 수정하기][2]를 참조하세요.

| 속성       | 유형   | 설명                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | 문자열 | 오류가 발생한 곳 (예:`console`).         |
| `error.type`    | 문자열 | 오류 유형(또는 경우에 따라 오류 코드).                     |
| `error.message` | 문자열 | 이벤트를 설명하는 간결하고 사람이 읽을 수 있는 한 줄 메시지. |
| `error.stack`   | 문자열 | 스택 트레이스 또는 오류에 대한 보완 정보.     |

### 소스 오류

소스 오류에는 오류에 대한 코드 레벨 정보가 포함됩니다. 다양한 오류 유형에 대한 자세한 내용은 [MDN 문서][3]에서 확인할 수 있습니다.

| 속성       | 유형   | 설명                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | 문자열 | 오류 유형(또는 경우에 따라 오류 코드).                     |

## 수동으로 오류 수집

처리된 예외, 처리된 약속 거부 및 RUM Browser SDK에서 자동으로 추적되지 않는 기타 오류를 `addError()`API를 통해 모니터링하세요:

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context
);
{{< /code-block >}}

**참고**: [오류 추적][4] 기능은 `custom`, `source` 또는 `report`로 설정된 소스를 전송하는 오류 및 스택 트레이스가 포함된 오류를 처리합니다. 다른 소스(예: `console`) 또는 브라우저 확장 프로그램으로 전송된 오류는 처리하지 않습니다.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// 컨텍스트와 함께 커스텀 오류 전송
const error = new Error('Something wrong occurred.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// 네트워크 오류 전송
fetch('<SOME_URL>').catch(function(error) {
    datadogRum.addError(error);
})

// 처리된 예외 오류 전송
try {
    // 일부 코드 로직
} catch (error) {
    datadogRum.addError(error);
}
```
{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
// 컨텍스트와 함께 커스텀 오류 전송
const error = new Error('Something wrong occurred.');

window.DD_RUM.onReady(function() {
    window.DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// 네트워크 오류 전송
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    });
})

// 처리된 예외 오류 전송
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
// 컨텍스트와 함께 커스텀 오류 전송
const error = new Error('Something wrong occurred.');

window.DD_RUM && window.DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// 네트워크 오류 전송
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && window.DD_RUM.addError(error);
})

// 처리된 예외 오류 전송
try {
    // 일부 코드 로직
} catch (error) {
    window.DD_RUM && window.DD_RUM.addError(error);
}
```
{{% /tab %}}
{{< /tabs >}}

### React 오류 경계 계측

RUM Browser SDK `addError()` API를 사용하여 React [오류 경계][5]를 계측함으로써 React 렌더링 오류를 모니터링할 수 있습니다.

수집된 렌더링 오류에는 컴포넌트 스택이 포함되며, 이 스택은 [소스맵 업로드][6] 후 다른 오류 스택 추적과 마찬가지로 축소되지 않습니다.

모니터링을 위해 React 오류 경계를 계측하려면 다음을 사용하세요:

{{< tabs >}}
{{% tab "NPM" %}}

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


## 트러블슈팅

### 스크립트 오류

보안상의 이유로 브라우저는 크로스 오리진 스크립트에 의해 트리거된 오류의 세부 정보를 숨깁니다. 이 경우 Error Details 탭에 "Script error"라는 최소한의 메시지와 함께 오류가 표시됩니다.

{{< img src="real_user_monitoring/browser/script-error.png" alt="실제 사용자 모니터링 스크립트 오류 예시" style="width:75%;" >}}

크로스 오리진 스크립트 및 세부 정보가 숨겨지는 이유에 대한 자세한 내용은 [CORS][7] 및 [글로벌 이벤트 핸들러에 대한 이 참고 사항][8]을 참조하세요. 이 오류의 원인은 다음과 같습니다:
- JavaScript 파일은 다른 호스트 이름(예: `example.com`은 `static.example.com`의 어셋 포함)에서 호스팅됩니다.
- 귀하의 웹사이트에는 CDN에서 호스팅되는 JavaScript 라이브러리가 포함되어 있습니다.
- 귀하의 웹사이트에는 공급자의 서버에서 호스팅되는 타사 JavaScript 라이브러리가 포함되어 있습니다.

다음 두 단계를 수행하여 크로스 오리진 스크립트에 대한 가시성을 확보하세요:
1. [`crossorigin="anonymous"`][9]로 JavaScript 라이브러리를 호출하세요.

   `crossorigin="anonymous"`를 사용하면 스크립트 가져오기 요청은 안전하게 수행됩니다. 쿠키나 HTTP 인증을 통해 민감한 데이터가 전달되지 않습니다.

2. [`Access-Control-Allow-Origin`][10] HTTP 응답 헤더를 설정하세요.

    - `Access-Control-Allow-Origin: *`은 모든 출처에서 리소스를 가져올 수 있도록 허용합니다.
    - `Access-Control-Allow-Origin: example.com`는 하나의 허용된 오리진을 지정합니다. 서버가 여러 오리진 클라이언트를 지원하는 경우 요청하는 특정 클라이언트의 오리진을 반환해야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/real_user_monitoring/browser/data_collected/
[2]: /ko/real_user_monitoring/browser/advanced_configuration/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[4]: /ko/real_user_monitoring/error_tracking
[5]: https://legacy.reactjs.org/docs/error-boundaries.html
[6]: /ko/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs#upload-your-source-maps
[7]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[8]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes
[9]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[10]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[11]: /ko/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs