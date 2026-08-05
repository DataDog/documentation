---
aliases:
- /ko/monitors/faq/how-do-i-monitor-ephemeral-servers-for-reboots
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터를 생성하는 법 확인하기
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 설정하기
title: 재부팅을 위해 수명이 짧은 서버를 모니터링
---

수명이 짧은 환경에서는 호스트가 계속 스핀업 및 종료되므로 새 호스트와 재부팅된 호스트를 구분하기 어려울 수 있습니다.

`system.uptime`메트릭 캔에서 메트릭 모니터를 사용하여 문제를 해결할 수 있습니다. 가동 시간 메트릭은 호스트가 부팅될 때 0으로 재설정하며 증가하는 타이머입니다. `diff()`기능을 이 메트릭과 함께 사용하면 가동 시간이 0인 새 서버와 재부팅된 서버를 구분할 수 있습니다. 재부팅된 서버는 실행 중인 가동 시간이 0으로 변경됩니다.

아래의 예시를 통해 설정 방법을 확인하세요:

{{< img src="monitors/guide/ephemeral_set_up.png" alt="ephemeral_set_up"  >}}


{{< partial name="whats-next/whats-next.html" >}}
