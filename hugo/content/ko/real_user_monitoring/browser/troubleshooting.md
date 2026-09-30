---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: 실제 사용자 모니터링(RUM)
- link: /real_user_monitoring/faq/content_security_policy/
  tag: 설명서
  text: 콘텐츠 보안 정책
title: 트러블슈팅
---

Datadog Browser RUM에서 예기치 않은 동작이 발생하는 경우, 이 가이드를 사용하여 문제를 신속하게 해결하세요. 계속 문제가 발생하면 [Datadog 지원][1]에 문의하여 추가 지원을 받으시기 바랍니다. 각 릴리스에는 개선 사항과 수정 사항이 포함되어 있으므로 정기적으로 최신 버전의 [RUM Browser SDK[2]로 업데이트하세요.

## 누락된 데이터

RUM 데이터가 보이지 않거나 일부 사용자에 대한 데이터가 누락된 경우

| 일반적인 원인                                                                                               | 권장 수정 사항                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 광고 차단기가 RUM Browser SDK를 다운로드하거나 Datadog에 데이터를 전송하는 것을 방해합니다.     | 일부 광고 차단기는 성능 및 마케팅 추적 도구까지 제한합니다. [npm으로 RUM Browser SDK 설치][3] 및 [프록시를 통해 수집된 데이터 전달][4] 문서를 참조하세요. |
| 네트워크 규칙, VPN 또는 바이러스 백신 소프트웨어는 RUM Browser SDK를 다운로드하거나 데이터를 Datadog으로 전송하지 못하게 할 수 있습니다. | RUM Browser SDK를 다운로드하거나 데이터를 전송하는 데 필요한 엔드포인트에 대한 액세스 권한을 부여합니다. 엔드포인트 목록은 [콘텐츠 보안 정책 문서][5]에서 확인할 수 있습니다.                                        |
| 스크립트, 패키지 및 클라이언트가 RUM Browser SDK 이전에 초기화되면 로그, 리소스 및 사용자 액션이 누락될 수 있습니다. 예를 들어, RUM Browser SDK보다 먼저 ApolloClient를 초기화하면 `graphql` 요청이 RUM 탐색기에서 XHR 리소스로 기록되지 않을 수 있습니다. | RUM Browser SDK가 초기화되는 위치를 확인하고 애플리케이션 코드 실행에 있어 이 단계를 앞으로 두는 것이 좋습니다.                                             |

[콘텐츠 보안 정책 가이드라인][5]을 읽고 웹사이트에서 RUM Browser SDK CDN 및 인테이크 엔드포인트에 대한 액세스 권한을 허용하는지 확인하세요.

### RUM Browser SDK를 초기화합니다

브라우저 콘솔에서 `window.DD_RUM.getInternalContext()`를 실행하여 RUM Browser SDK가 초기화되었는지 확인하고 `application_id`, `session_id` 및 보기 개체가 반환되는지 확인합니다:

{{< img src="real_user_monitoring/browser/troubleshooting/success_rum_internal_context.png" alt="내부 컨텍스트 가져오기 명령 성공">}}

RUM Browser SDK가 설치되어 있지 않거나 성공적으로 초기화되지 않은 경우 아래와 같은 `ReferenceError: DD_RUM is not defined` 오류가 표시될 수 있습니다:

{{< img src="real_user_monitoring/browser/troubleshooting/error_rum_internal_context.png" alt="내부 컨텍스트 가져오기 명령에 오류 발생">}}

브라우저 개발자 도구 콘솔 또는 네트워크 탭에서 RUM Browser SDK 로딩과 관련된 오류를 확인할 수도 있습니다.

**참고**: 정확한 결과를 얻으려면 `sessionSampleRate`를 100으로 설정하세요. 자세한 내용은 [브라우저 RUM 및 브라우저 RUM & 세션 리플레이 샘플링을 위한 설정 구성][8]을 참조하세요.

### Datadog 인테이크에 대한 데이터

RUM Browser SDK는 주기적으로 데이터 배치를 Datadog 인테이크에 전송합니다. 데이터가 전송되는 경우 브라우저 개발자 도구의 네트워크 섹션에 네트워크 요청 타겟팅 `/v1/input`(URL 원본 부분은 RUM 구성에 따라 다를 수 있음)이 표시되어야 합니다:

{{< img src="real_user_monitoring/browser/troubleshooting/network_intake.png" alt="Datadog 인테이크에 대한 RUM 요청">}}

## RUM 쿠키

RUM Browser SDK는 쿠키를 사용하여 세션 정보를 저장하고 여러 페이지에서 [사용자 세션][6]을 추적합니다. 쿠키는 자사 쿠키(도메인에 설정됨)이며 사이트 간 추적에 사용되지 않습니다. 다음은 RUM Browser SDK가 설정하는 쿠키입니다:

| 쿠키 이름        | 세부 정보                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dd_s`             | 여러 페이지에 걸쳐 고유한 사용자 세션에서 생성된 모든 이벤트를 그룹화하는 데 사용되는 쿠키입니다. 여기에는 현재 세션 ID, 샘플링으로 인해 세션이 제외되었는지 여부, 세션 만료 날짜가 포함됩니다. 쿠키는 사용자가 웹사이트와 상호 작용할 때마다 15분씩 추가로 연장되어 최대 사용자 세션 기간(4시간)까지 유지됩니다.|
| `dd_site_test_*`   | 쿠키 지원 여부를 테스트하는 데 사용되는 임시 쿠키입니다. 즉시 만료됩니다.                                                                                                                                                                                                                                     |
| `dd_cookie_test_*` | 쿠키 지원 여부를 테스트하는 데 사용되는 임시 쿠키입니다. 즉시 만료됩니다.                                                                                                                                                                                                                                     |

**참고**: `_dd_l`, `_dd_r` 및 `_dd` 쿠키가 최신 버전의 RUM Browser SDK에서 `_dd_s`로 대체되었습니다.

## 기술적인 제한 사항

RUM Browser SDK가 전송하는 각 이벤트는 다음과 같이 빌드됩니다:

- RUM 글로벌 컨텍스트
- 이벤트 컨텍스트 (존재하는 경우)
- 이벤트와 관련된 속성

예시:

```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('global', {'foo': 'bar'})
window.DD_RUM && window.DD_RUM.addAction('hello', {'action': 'qux'})
```

예제 코드는 다음과 같은 액션 이벤트를 생성합니다:

```json
{
  "type": "action",
  "context": {
    "global": {
      "foo": "bar"
    },
    "action": "qux"
  },
  "action": {
    "id": "xxx",
    "target": {
      "name": "hello"
    },
    "type": "custom"
  },
  ...
}
```

이벤트 또는 요청이 다음 제한 사항 중 하나를 초과하는 경우, Datadog 인테이크에 의해 거부됩니다.

| 속성                                 | 제한 사항   |
| ---------------------------------------- | ------------ |
| 이벤트당 최대 속성 수   | 256          |
| 이벤트당 최대 속성 깊이        | 20           |
| 최대 이벤트 크기                       | 256 KB       |
| 최대 인테이크 페이로드 크기              | 5 MB         |

## 고객 데이터가 권장 3KiB를 초과하는 경우 경고

RUM browser SDK를 사용하면 [글로벌 컨텍스트][9], [사용자 정보][10] 및 [기능 플래그][11]를 설정한 다음 수집된 이벤트에 포함할 수 있습니다.

사용자 대역폭에 미치는 영향을 최소화하기 위해, RUM Browser SDK는 Datadog 인테이크에 전송되는 데이터를 스로틀링합니다. 그러나 대량의 데이터를 전송하면 인터넷 연결 속도가 느린 사용자의 성능에 여전히 영향을 미칠 수 있습니다.

최상의 사용자 경험을 위해 Datadog은 글로벌 컨텍스트, 사용자 정보 및 기능 플래그의 크기를 3KiB 미만으로 유지할 것을 권장합니다. 데이터가 이 제한을 초과하면 경고가 표시됩니다: `The data exceeds the recommended 3KiB threshold.`

## 크로스 오리진 읽기 차단 경고

Chromium 기반 브라우저에서, RUM Browser SDK가 데이터를 Datadog 인테이크에 전송할 때 콘솔에 CORB 경고가 인쇄됩니다: `Cross-Origin Read Blocking (CORB) blocked cross-origin response`.

이 경고는 인테이크가 비어 있지 않은 JSON 객체를 반환하기 때문에 표시됩니다. 이 동작은 보고된 [Chromium 문제][7]입니다. RUM Browser SDK에는 영향을 미치지 않으며 안전하게 무시해도 됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: /ko/real_user_monitoring/browser/#npm
[4]: /ko/real_user_monitoring/guide/proxy-rum-data/
[5]: /ko/real_user_monitoring/faq/content_security_policy/
[6]: /ko/real_user_monitoring/browser/data_collected/?tab=session
[7]: https://bugs.chromium.org/p/chromium/issues/detail?id=1255707
[8]: /ko/real_user_monitoring/guide/sampling-browser-plans/
[9]: /ko/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#global-context
[10]: /ko/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#user-session
[11]: /ko/real_user_monitoring/guide/setup-feature-flag-data-collection/?tab=browser