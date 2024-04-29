---
further_reading:
- link: /integrations/java/
  tag: 설명서
  text: Java 통합
- link: https://www.datadoghq.com/blog/easy-jmx-discovery-browsing-open-source-agent/
  tag: 블로그
  text: 오픈 소스 에이전트를 활용한 손쉬운 JMX 검색 및 탐색
kind: faq
title: jConsole에서 JMX 데이터를 확인하고 수집하도록 jmx.yaml을 설정합니다.
---

본 문서에서는 jConsole의 메트릭 데이터를 유효한 Datadog 에이전트 설정 파일(`jmx.yaml`)로 변환하는 두 가지 예를 알아봅니다.

첫 번째 예는 `domain -> type -> bean -> attribute` 변환을 설명합니다.

{{< img src="integrations/faq/jConsolejmx.png" alt="jConsolejmx" >}}

두 번째 예는 `domain -> bean -> attribute` 변환을 설명합니다.

{{< img src="integrations/faq/jConsolejmx2.png" alt="jConsolejmx" >}}

Datadog 에이전트 메트릭을 전송하도록 설정한 후 [메트릭 탐색기][1]를 사용하여 메트릭이 Datadog으로 전송되고 있는지 확인합니다. 아래는 태그로 메트릭을 필터링하는 방법을 설명합니다.

{{< img src="integrations/faq/jmxGraphMetric.png" alt="jmxGraphMetric" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/explorer/