---
aliases:
- /ko/synthetics/identify_synthetics_bots
description: 수신된 Synthetic 요청 확인하기
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog Synthetic Monitoring 소개
- link: /synthetics/
  tag: 설명서
  text: Synthetic Monitoring에 대해 알아보기
- link: /synthetics/browser_tests/
  tag: 설명서
  text: 브라우저 테스트 설정하기
- link: /synthetics/api_tests/
  tag: 설명서
  text: API 테스트 설정하기
title: Synthetic 봇 확인하기
---
## 개요 {#overview}

적절한 식별 정보가 없으면 로봇이 시스템의 일부를 사용하지 못할 수도 있습니다. 또한 Datadog 로봇으로부터 분석 데이터를 수집하지 않도록 설정하는 것이 좋습니다. 

Datadog의 Synthetic Monitoring 로봇을 탐지하려면 다음 방법을 조합해 사용해 보세요.

## IP 주소 {#ip-addresses}

각 Datadog 관리 위치에 해당하는 **Synthetic Monitoring IP 범위**를 사용합니다.

```
https://ip-ranges.{{< region-param key="dd_site" >}}/synthetics.json
```

나열된 IP는 CIDR(Classless Inter-Domain Routing) 표기법을 사용하며 사용하기 전에 IPv4 주소 범위로 변환해야 할 수도 있습니다. 새로운 관리 위치 IP의 경우를 제외하고 나열된 IP는 거의 변경되지 않습니다. 

나열된 IP가 변경될 때 알림을 받으려면 `$.synthetics['prefixes_ipv4_by_location']['aws:ap-northeast-1'].length` 같은 JSONPath 어설션을 사용하여 위 엔드포인트에 API 테스트를 생성하세요.

## 기본 헤더 {#default-headers}

Synthetic 테스트에서 생성된 요청에 첨부되는 **기본 헤더**를 사용하여 Datadog 로봇을 확인합니다.

### `user-agent` {#user-agent}

기본적으로 `user-agent` 헤더가 Synthetic 테스트에서 수행하는 모든 요청에 추가됩니다. 테스트에 추가된 사용자 지정 `user-agent`는 기본 헤더를 재정의합니다.

{{< tabs >}}
{{% tab "단일 및 다단계 API 테스트" %}}

단일 및 다단계 API 테스트의 경우 기본 `user-agent` 헤더는 `Datadog/Synthetics`입니다.

{{% /tab %}}
{{% tab "브라우저 테스트" %}}

브라우저 테스트의 경우 기본 `user-agent` 헤더의 값은 테스트를 실행하는 브라우저와 기기에 따라 다릅니다. 기본 `user-agent` 값은 항상 `DatadogSynthetics`로 끝나므로 Synthetic 테스트를 식별할 수 있습니다.

{{% /tab %}}
{{< /tabs >}}

### APM 헤더 {#apm-headers}

Synthetic API 테스트와 브라우저 테스트에서 생성된 요청에는 `x-datadog-origin: synthetics`와 같은 [**기타 APM 전용 헤더**][1]도 여러 개 추가됩니다.

## 요청 사용자 지정하기 {#customize-requests}

{{< ui >}}Advanced options{{< /ui >}}에서 API와 브라우저 테스트 구성을 활용할 수 있고, **사용자 지정 헤더**, **쿠키**, **요청 본문**과 같은 특정 식별자를 테스트 요청에 추가할 수 있습니다.

## 브라우저 변수 {#browser-variables}

Datadog 로봇이 애플리케이션을 렌더링할 때 `window._DATADOG_SYNTHETICS_BROWSER` 변수는 `true`로 설정됩니다. 분석 데이터에서 로봇 작업을 제거하려면 다음 테스트로 분석 도구 코드를 감싸세요.

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

Firefox에서 브라우저 변수를 사용해 Synthetic 봇을 확인하는 경우, 코드 실행 전에 브라우저 변수가 설정되는 것을 Datadog에서 보장할 수 없습니다. 

## 쿠키 {#cookies}

브라우저에 적용되는 쿠키로는 `datadog-synthetics-public-id`와 `datadog-synthetics-result-id`가 있습니다.

이 쿠키는 Firefox의 모든 단계에서 사용할 수 있습니다. Microsoft Edge 및 Google Chrome의 경우, 이 쿠키는 시작 URL에 대해서만 설정됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/apm/#how-are-traces-linked-to-tests