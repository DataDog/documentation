---
aliases:
- /ko/monitors/faq/how-can-i-setup-an-alert-for-when-a-specific-tag-stops-reporting
further_reading:
- link: /monitors/
  tag: 설명서
  text: Learn how to create a monitor
- link: /monitors/notify/
  tag: 설명서
  text: Configure your monitor notifications
title: 특정 태그 보고 중단 시 경고 설정하기
---

경우에 따라, 일부 시스템에서 태그가 사라질 때 알고 싶을 것입니다. 그런 경우 Datadog 내의 경고 제도를 통해 [모니터][1]를 설정할 수 있습니다.

1. 일반적인 [메트릭 모니터][2]를 설정하고 사라질 때 경고를 발동하고 싶은 메트릭과 태그를 지정하세요.
1. 가령, `system.cpu.user`와 같은 양수 메트릭에 대해 `a < -1`의 조건을 설정하는 것처럼 절대 작동되지 않는 경고 조건을 선택하세요.
1. 이 예시에서 보는 것처럼, _Notify if data is missing_ 옵션을 활성화하세요.

{{< img src="monitors/guide/tag_stop_reporting.png" alt="Tag stop reporting"  >}}

태그가 보고를 중단하면 경고가 작동합니다.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/
[2]: /ko/monitors/types/metric/