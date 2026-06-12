---
aliases:
- /ko/agent/faq/why-should-i-install-the-agent-on-my-aws-instances/
- /ko/integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch/
- /ko/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
further_reading:
- link: /integrations/guide/cloud-metric-delay/
  tag: 길라잡이
  text: 클라우드 메트릭 지연
title: 클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유
---

AWS, Azure, Google Cloud 또는 다른 클라우드 기반 메트릭 공급자를 사용하는 경우 인스턴스에 Datadog 에이전트를 설치하면 여러 이점을 얻을 수 있습니다. 예를 들어 다음과 같습니다.

* **더 나은 해상도** - 클라우드 공급자는 5~25분마다 호스트를 샘플링하여 외부에서 내부에 벌어지는 일을 관찰할 수 있습니다. 또한 AWS는 API를 통해 1분 간격으로 메트릭을 제공합니다. 모든 Datadog 메트릭이 1초마다 저장되기 때문에 포스트 프로세싱 과정에서 메트릭은 60개로 나뉩니다. Datadog 에이전트는 15초마다 성능 통계를 수집하여 호스트 측면에서 발생하는 일을 더 정확히 이해할 수 있도록 돕습니다.

* **노출된 메트릭** - Datadog에는 기본적으로 50개 이상의 메트릭이 활성화되어 있습니다. Datadog의 애플리케이션 지정 통합을 사용하면 더 많은 메트릭을 추가할 수 있습니다.

* **통합** - 네이티브 메트릭을 넘어 Datadog 에이전트를 확대하는 것이 단순해지므로 애플리케이션 상태, 프로세스 활용률 등을 모니터링할 수 있습니다. 

* **DogStatsD를 사용한 커스텀 메트릭** - Datadog 에이전트를 온보딩하면 내장 StatsD 클라이언트를 사용해 애플리케이션에서 커스텀 메트릭을 전송할 수 있습니다. 이를 통해 애플리케이션, 사용자, 시스템 차원에서 발생하는 일을 확인할 수 있습니다.

  {{< img src="agent/guide/Agent_VS_AWSA.jpg" alt="에이전트 vs AWS CloudWatch" style="width:70%;">}}

Datadog 에이전트는 경량이며 완전한 오픈 소스로 제공되므로 코드를 검토하고 풀 요청을 통해 기여할 수도 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}