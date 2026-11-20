---
aliases:
- /ko/monitors/faq/why-am-i-getting-so-many-no-data-alerts/
- /ko/monitors/faq/why-am-i-getting-so-many-no-data-alerts-for-my-metric-monitor/
further_reading:
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 설정
- link: /monitors/downtimes/
  tag: 설명서
  text: 다운타임을 예약하여 모니터 음소거
title: 메트릭 모니터에 대한 데이터 없음 경고 조정
---

*데이터 없음* 경고는 통합/애플리케이션이 더 이상 Datadog에 메트릭을 제출하지 않을 때 알림을 받기에 적합한 방법입니다.
[AWS Integration][2]의 메트릭과 같이 항상 동일한 빈도로 보고되지 않거나 가까운 과거의 타임스탬프와 함께 보고되는 메트릭에 대해 [Metric Monitor][1]를 활용하는 경우 Datadog에서 이러한 값을 보았음에도 불구하고 데이터 없음 경고를 받을 수 있습니다. 이러한 유형의 메트릭을 적절하게 평가하기 위해 편집할 수 있는 몇 가지 모니터 설정 옵션으로는 다음이 있습니다.

{{< img src="monitors/guide/AWS_Monitor_Config.png" alt="AWS 모니터 설정"  >}}

1. 위의 이미지는 이 메트릭: `aws.ec2.cpuutilization`이 약간의 지연과 함께 수신되고 있음을 표시합니다.
이는 클라우드와치(CloudWatch)에서 이 메트릭을 사용할 수 있는 시간 제한 때문입니다.

{{< img src="monitors/guide/require_full_window.png" alt="Require a Full Window of Data"  >}}

2. 지연 평가 옵션.
모니터는 1분마다 평가를 수행하므로 지난 X분의 데이터를 되돌아보고 있습니다. AWS에서 오는 메트릭과 같이 백필된 메트릭의 경우 모니터는 데이터가 Datadog에 존재하지 않는 기간을 살펴볼 수 있습니다. 이로 인해 잘못된 데이터 없음 경고가 발생합니다. 이 필드를 설정하면 모니터가 평가를 시작하기 전에 AWS 메트릭이 Datadog 내에서 900초 동안 사용할 수 있도록 모니터가 900초 동안 대기하게 할 수 있습니다.

3. 이 옵션은 [Require a Full Window of Data][3](또는 요구하지 않는 기능)에 해당합니다.
이 옵션은 일반적으로 Datadog 에이전트에서 보고하는 메트릭과 현재 타임스탬프와 함께 들어오는 메트릭에 적합합니다. 소폭 백필된 메트릭의 경우 이 옵션을 사용하면 데이터 없음 이벤트가 발생하거나, 모니터가 평가할 때 어떠한 값도 존재하지 않기 때문에 모니터가 현재 평가 기간을 건너뛸 수 있습니다. 이러한 이유로 동일한 빈도로 보고하지 않는 메트릭 또는 모든 희소 메트릭은 기본 옵션 "Do Not [Require a Full Window of Data][3]"를 유지해야 합니다.

마지막으로 효과적인 모니터를 구축할 때 이러한 제한을 이해하는 것이 중요합니다. [클라우드 메트릭 지연][4]은 클라우드 공급자마다 다릅니다. 상당히 짧은 지연으로 메트릭을 수신하려면 (가능한 경우) 클라우드 호스트에 Datadog 에이전트를 설치하세요. [클라우드 인스턴스에 Datadog 에이전트 설치][5]에 대한 설명서를 참조하세요.

문제가 발생하면 [당사][6]에 문의하시기 바랍니다.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/metric/
[2]: /ko/integrations/amazon_web_services/
[3]: /ko/monitors/types/metric/?tab=threshold#advanced-alert-conditions
[4]: /ko/integrations/guide/cloud-metric-delay/
[5]: /ko/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[6]: /ko/help/