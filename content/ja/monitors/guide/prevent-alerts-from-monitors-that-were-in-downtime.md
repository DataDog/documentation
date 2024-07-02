---
title: Prevent alerts from Monitors that were in downtime
further_reading:
- link: /monitors/
  tag: Documentation
  text: Learn how to create a monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Learn more about downtimes
aliases:
- /monitors/faq/why-did-i-get-a-recovery-event-from-a-monitor-that-was-in-a-downtime-when-it-alerted/
- /monitors/faq/i-have-a-downtime-scheduled-on-my-monitor-why-did-it-still-alert/
---

グループが[ダウンタイム][1]になり、**`OK`** から **`ALERT`**、**`WARNING`**、**`NO DATA`** のいずれかの状態に移行すると、このイベントは通知を抑止されます。
このダウンタイムが終了またはキャンセルされると、再通知イベント (構成されている場合) と回復イベントの両方が送信されるようになります。

回復通知を抑制するために、ダウンタイムをキャンセルする前にモニターを解決するオプションがあります。しかし、非 **`OK`** 状態にあったグループは、以前の状態に戻る可能性があり、その結果、別の通知が発生します。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/downtimes/
