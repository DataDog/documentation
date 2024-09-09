---
aliases:
- /ko/synthetics/identify_synthetics_bots
description: 수신된 신서틱 요청 확인하기
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog 신서틱 모니터링 소개
- link: /synthetics/
  tag: 설명서
  text: 신서틱 모니터링에 대해 알아보기
- link: /synthetics/browser_tests/
  tag: 설명서
  text: 브라우저 테스트 설정
- link: /synthetics/api_tests/
  tag: 설명서
  text: API 테스트 설정
title: 신서틱 봇 확인하기
---

## 개요

적절한 ID가 없으면 로봇이 시스템 일부를 사용하지 못합니다. 또 Datadog 로봇으로 분석 정보를 수집하는 것을 피해야 합니다.

Datadog의 신서틱 모니터링 로봇을 탐지하려면 다음 방법을 조합해 사용해 보세요.

## IP 주소

각 Datadog 관리 위치에 해당하는 **신서틱 모니터링 IP 범위**를 사용하세요.

```
https://ip-ranges.{{< region-param key="dd_site" >}}/synthetics.json
```

목록에 있는 IP는 CIDR(Classless Inter-Domain Routing) 표기법을 사용하며, 사용 전에 IPv4 주소 범위로 변환해야 할 수 있습니다. 새 관리 위치 IP를 제외하고, 목록에 있는 IP는 거의 변하지 않습니다.

목록에 있는 IP가 변경될 때 알림을 받고 싶으면 `$.synthetics['prefixes_ipv4_by_location']['aws:ap-northeast-1'].length`와 같은 JSONPath 어설션으로 위 엔드포인트에 API 테스트를 생성하세요.

## 기본 헤더

**기본 헤더**로 Datadog 로봇을 확인합니다. 기본 헤더는 신서틱 테스트가 생성한 요청에 연결되어 있습니다.

### `user-agent`

기본적으로 신서틱 테스트가 실행하는 요청 모두에 `user-agent`가 추가됩니다. 테스트에 커스텀 `user-agent`을 추가하면 이것으로 기본 값이 재정의됩니다.

{{< tabs >}}
{{% tab "단일 및 다단계 API 테스트" %}}

단일 및 다단계 API 테스트의 경우 기본 `user-agent` 헤더가 `Datadog/Synthetics`입니다.

{{% /tab %}}
{{% tab "브라우저 테스트" %}}

브라우저 테스트의 경우 테스트를 실행하는 브라우저와 디바이스에 따라 기본 `user-agent` 헤더가 다릅니다. 기본 `user-agent` 값은 사용자가 신서틱 테스트 확인을 할 수 있도록 항상 `DatadogSynthetics`로 끝납니다.  

{{% /tab %}}
{{< /tabs >}}

### `sec-datadog`

신서틱 테스트가 실행하는 요청 모두에 `sec-datadog` 헤더가 추가됩니다. 값에는 요청이 시작된 테스트 ID가 포함됩니다.

{{< tabs >}}
{{% tab "단일 및 다단계 API 테스트" %}}

```
sec-datadog: Request sent by a Datadog Synthetics API Test (https://docs.datadoghq.com/synthetics/) - test_id: <SYNTHETIC_TEST_PUBLIC_ID>
```

{{% /tab %}}
{{% tab "브라우저 테스트" %}}

```
sec-datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - test_id: <SYNTHETIC_TEST_PUBLIC_ID>
```

{{% /tab %}}
{{< /tabs >}}

### APM 헤더

`x-datadog-origin: synthetics`와 같은 [**기타 APM 특정 헤더**][1] 여러 개도 신서틱 API와 브라우저 테스트에서 생성한 요청에 추가됩니다.

## 요청 사용자 지정하기

**Advanced options**에서 API와 브라우저 테스트 구성을 활용할 수 있고, **custom headers**, **cookies**, **request bodies**와 같은 특정 식별자를 테스트 요청에 추가할 수 있습니다.

## 브라우저 변수

Datadog 로봇이 애플리케이션을 렌더링할 때 `window._DATADOG_SYNTHETICS_BROWSER` 변수가 `true`로 설정됩니다. 분석 데이터에서 로봇 작업을 제거하려면 분석 도구 코드를 다음 테스트로 래핑하세요. 

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

Firefox에서 브라우저 변수를 사용해 신서틱 봇을 확인하는 경우, 코드 실행 전에 브라우저 변수가 설정되는 것을 Datadog에서 보장할 수 없습니다.

## 쿠키

브라우저에 적용되는 쿠키는 `datadog-synthetics-public-id`와 `datadog-synthetics-result-id`입니다.

이 쿠키는 Firefox 단계 모두에서 사용할 수 있습니다. Microsoft Edge와 Google Chrome의 경우에는 시작 URL에서만 이 쿠키를 설정합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/apm/#how-are-traces-linked-to-tests