---
description: Azure API Management 정책이 App and API Protection 콜아웃 서비스를 호출하고, 차단 결정을
  적용하며, 트레이스 컨텍스트를 전파하는 방법을 확인하세요.
further_reading:
- link: /security/application_security/setup/azure/api-management
  tag: 문서
  text: Azure API Management용 App and API Protection 활성화하기
- link: /security/application_security/setup/azure/api-management/configuration
  tag: 문서
  text: Azure API Management 콜아웃 구성하기
- link: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
  tag: 문서
  text: Azure API Management send-request 정책
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout
  tag: 소스 코드
  text: App and API Protection Azure API Management 콜아웃 소스 코드
title: App and API Protection을 위한 Azure API Management 정책
---
{{< callout url="#" btn_hidden="true" header="Azure API Management용 App and API Protection은 미리 보기로 제공되고 있습니다." >}}
Azure API Management용 App and API Protection 미리 보기를 사용해 보려면 다음 설정 지침을 따르세요.
{{< /callout >}}

Azure API Management(APIM)용 App and API Protection 통합은 기본 APIM [`send-request`][1] 정책을 사용하여 Datadog 콜아웃 서비스를 호출하고 정책 변수에서 결정을 읽습니다.

[`deploy/azure/policies`][2]에서 세 가지 정책 문서를 제공합니다.

| 파일                       | 내용                                              |
|----------------------------|-------------------------------------------------------|
| `azure-apim-full.xml`      | 두 섹션이 모두 포함된 전체 정책 문서입니다.     |
| `azure-apim-inbound.xml`   | 인바운드 섹션만 포함되어 있습니다.                             |
| `azure-apim-outbound.xml`  | 아웃바운드 섹션만 포함되어 있습니다.                            |

새 정책에는 전체 문서를 사용하세요. 이미 정책 콘텐츠가 있는 경우, 인바운드 및 아웃바운드 조각을 사용하여 Datadog 단계를 해당 섹션에 병합하세요.

## 정책 적용 {#applying-the-policy}

Azure API Management는 전역, 작업 공간, 제품, API 및 작업 범위에서 정책을 평가하며, `<base />`는 해당 범위 간의 상속과 순서를 모두 제어합니다. 보호하려는 범위(모든 API, 단일 제품, 하나의 API 또는 하나의 작업)에 Datadog 정책을 연결하세요.

이 정책은 플레이스홀더 URL `https://<dd-apim-callout-host>:8080`과 함께 제공됩니다. 적용하기 전에 해당 전체 URL이 나타나는 모든 위치를 배포의 `calloutBaseUrl` 출력으로 바꾸세요. `enableHttps`를 `true`로 설정하지 않으면 해당 출력은 `http://<ACA-FQDN>`이며 포트를 포함하지 않으므로 호스트 이름만 바꾸지 말고 전체 URL을 바꾸세요. `deployPolicy`를 `true`로 설정하면 배포가 동일한 대체를 수행하며, `targetApiIds` 파라미터가 정책을 수신할 API를 선택합니다.

`azure-apim-full.xml` 네 개의 섹션 각각에 `<base />` 요소를 포함합니다. APIM은 전역 범위에서 이를 거부하므로 모든 API에 파일을 적용하는 경우 먼저 모든 `<base />` 요소를 제거하세요. 제품, API 또는 작업에 정책을 적용할 때는 상위 범위로부터의 상속을 제어하므로 이를 유지하세요. 배포는 동일한 규칙을 적용합니다. 즉, 모든 API 배포에 대해서는 요소를 제거하고 `targetApiIds`가 특정 API를 지정할 때는 이를 유지합니다.

정책의 형태는 다음과 같습니다.

```xml
<policies>
  <inbound>
    <base />
    <!-- Phase 1: serialize request headers, call the service, read the decision -->
    <!-- Phase 2 (conditional): send the request body when the service asks for it -->
    <!-- If blocked: return-response. Otherwise: inject x-datadog-* headers -->
  </inbound>
  <backend>
    <base />
  </backend>
  <outbound>
    <base />
    <!-- Phase 3: serialize response headers, call the service, read the decision -->
    <!-- Phase 4 (conditional): send the response body when the service asks for it -->
    <!-- If blocked: return-response -->
  </outbound>
  <on-error>
    <base />
  </on-error>
</policies>
```

## 콜아웃 작동 방식 {#how-the-callout-works}

모든 콜아웃은 `mode="new"`, `timeout="3"` 및 `ignore-error="true"`를 포함하는 `send-request`입니다. 각 콜아웃은 `application/json`을 콜아웃 서비스에 게시합니다. 정책은 각 응답을 `ddPhase1Response`~`ddPhase4Response`에 저장하고, 구문 분석된 해당 JSON 본문을 `ddPhase1`~`ddPhase4`에 저장합니다.

교환에는 네 가지 단계가 있습니다.

1. **요청 헤더.** 정책은 요청 메서드, 스킴, 권한, 쿼리 문자열이 포함된 경로, 클라이언트 IP 주소 및 헤더를 직렬화한 다음 게시합니다. 서비스는 요청 ID, 트레이스 전파 헤더, 그리고 본문 검사가 적용될 때 허용된 본문 크기로 응답합니다. 정책은 요청 ID를 변수 `ddRequestId`에 저장합니다.
2. **요청 본문.** 1단계가 허용된 본문 크기를 반환할 때만 실행됩니다. 정책은 요청 본문을 base64로 인코딩하고 해당 크기로 자른 다음 요청 ID와 함께 게시합니다.
3. **응답 헤더.** 정책은 요청 ID와 함께 응답 상태 코드 및 헤더를 게시합니다.
4. **응답 본문.** 3단계가 허용된 본문 크기를 반환한 경우에만 실행되며, 2단계와 동일한 방식으로 본문을 처리합니다.

요청 ID는 네 단계를 모두 단일 Datadog WAF(Web Application Firewall) 평가 컨텍스트에 연결합니다. 콜아웃 서비스는 해당 컨텍스트를 `DD_APIM_CALLOUT_REQUEST_TIMEOUT`에 의해 설정된 기본 TTL(Time-to-Live) 30초의 인메모리 캐시에 보관합니다. 컨텍스트는 1단계에서 생성되어 단계 간에 유지되며, 최종 단계 이후 또는 차단 후에 해제됩니다.

## 차단 {#blocking}

WAF가 차단을 결정하면 콜아웃 서비스는 `block` 객체로 응답합니다.

```json
{
  "block": {
    "status": 403,
    "headers": { "Content-Type": ["application/json"] },
    "content": "<base64-encoded body>"
  }
}
```

정책은 `block`을 탐지하고 `return-response`를 호출하여 상태 코드를 전송하고, `block.headers`에서 `Content-Type`을 설정하며(없는 경우 `application/json`을 기본값으로 사용), `block.content`를 base64로 디코딩하여 본문을 작성합니다.

`return-response`가 파이프라인의 나머지를 취소하므로 인바운드 단계 중 차단이 발생하면 백엔드가 호출되지 않습니다.

## Fail-open 동작 {#fail-open-behavior}

모든 실패 경로에서 트래픽이 통과하도록 허용됩니다.

| 시나리오                                                     | 결과                                                                                              |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 콜아웃 서비스에 연결할 수 없거나 호출 시간이 초과되면 | `ignore-error="true"`가 응답 변수를 설정하지 않은 상태로 둡니다. 정책은 검사를 건너뛰고 트래픽이 계속됩니다. |
| 콜아웃이 `200`           |  이외의 상태로 응답합니다. 정책은 결과를 허용으로 처리하고 트래픽은 계속됩니다.                                        |
| 콜아웃이 잘못된 JSON을 수신합니다. | `400`을 `{}`로 반환하며, 정책은 결과를 허용으로 처리합니다.                               |
| 이후 단계에서 요청 ID를 알 수 없습니다. | 서비스가 `200`을 `{}`로 응답하며, 차단이 적용되지 않습니다.                                        |
| WAF 시간이 초과되거나 프로세서가 오류를 보고합니다. | 서비스가 `200`을 `{}`로 반환하며, 차단이 적용되지 않습니다.                                        |
| 캐시된 요청 상태가 유효 기간을 초과했습니다. | 고아 상태가 해제되고 트래픽이 계속됩니다.                                               |

모든 실패 경로가 트래픽을 허용하므로 잘못된 구성은 트래픽 중단이 아니라 보안 데이터 누락으로 나타납니다. 신호가 누락된 경우 다음을 확인하세요.

1. 정책이 트래픽을 보내는 API에 적용되는 범위에 연결되어 있는지 확인하세요.
2. 정책이 올바른 URL을 호출하는지 확인하세요. `set-url`값을 스킴 및 포트를 포함한 배포의 `calloutBaseUrl` 출력과 비교하세요.
3. 게이트웨이가 해당 URL의 콜아웃 서비스에 도달할 수 있는지 확인하세요. 도착하지 않는 콜아웃은 `ignore-error="true"`가 숨기기 때문에 정책에 트레이스를 남기지 않습니다.
4. 콜아웃 서비스 로그에는 들어오는 요청이 나타납니다. 그렇지 않다면 게이트웨이가 해당 서비스에 도달하지 못하는 것입니다.
5. 콜아웃 서비스가 `8126` 포트에서 Datadog Agent에 도달할 수 있으며, Agent의 `DD_APM_ENABLED` 및 `DD_APM_NON_LOCAL_TRAFFIC`이 `true`로 설정되어 있습니다. 이 설정이 없으면 서비스가 트래픽을 평가하지만 Datadog에는 아무 데이터도 도착하지 않습니다.

`set-body`로 JSON 본문을 구성하고 응답 변수를 구문 분석하는 데 각각 0.1ms 미만이 소요되며, 조건부 평가에는 0.01ms 미만이 소요됩니다. 가장 큰 오버헤드는 콜아웃 서비스로의 네트워크 왕복 시간입니다.

## 트레이스 컨텍스트 전파 {#trace-context-propagation}

요청이 허용되면 1단계에서 전파 헤더를 반환하고, 정책은 이를 요청에 삽입한 후 백엔드로 전달합니다.

- `x-datadog-trace-id`
- `x-datadog-parent-id`
- `x-datadog-sampling-priority`
- `x-datadog-origin`
- `x-datadog-tags`

백엔드 요청에 이러한 헤더가 있으면 인바운드 정책이 실행되어 요청을 허용했음을 확인할 수 있습니다.

## Datadog에서 통합 식별 {#identifying-the-integration-in-datadog}

콜아웃 서비스는 APM에 `apim-callout` 서비스로 표시되며, 해당 스팬에는 `component:apim-callout` 태그가 지정됩니다. 다른 서비스 이름을 사용하려면 콜아웃 컨테이너에 `DD_SERVICE`를 설정하세요.

WAF가 요청과 일치하면 스팬에는 App and API Protection 태그(`appsec.event`, `appsec.blocked`, `http.client_ip` 포함)도 함께 지정됩니다.

클라이언트 IP 주소는 정책이 1단계에서 보내는 값에서 가져옵니다. 해당 값은 APIM 앞에 다른 프록시가 있는 경우에도 `http.client_ip`를 설정합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
[2]: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout/deploy/azure/policies