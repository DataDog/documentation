---
aliases:
- /ko/monitors/faq/why-did-i-get-a-recovery-event-from-a-monitor-that-was-in-a-downtime-when-it-alerted/
- /ko/monitors/faq/i-have-a-downtime-scheduled-on-my-monitor-why-did-it-still-alert/
further_reading:
- link: /monitors/
  tag: 설명서
  text: Learn how to create a monitor
- link: /monitors/notify/
  tag: 설명서
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: 설명서
  text: 다운타임에 관해 자세히 보기
title: 다운타임 상태의 모니터에서 전송되는 경고 방지
---

그룹이 [downtimed][1]으로 전환하고 **`OK`**에서 **`ALERT`**, **`WARNING`**, 또는 **`NO DATA`** 상태로 바뀌는 경우, 이 이벤트의 알림이 전송되지 않습니다.
다운타임이 종료 또는 중지되고 나면 이 이벤트(설정에 따름) 및 복구 이벤트 알림이 다시 전송됩니다.

복구 알림을 끄려면 모니터를 해제하고 나서 다운타임을 취소하는 방법이 있습니다. 하지만, **`OK`** 상태가 아닌 모든 그룹이 이전 상태로 돌아가면서 알림이 또 발생할 수도 있습니다.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/downtimes/