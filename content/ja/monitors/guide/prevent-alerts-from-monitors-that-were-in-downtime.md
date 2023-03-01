---
aliases:
- /ja/monitors/faq/why-did-i-get-a-recovery-event-from-a-monitor-that-was-in-a-downtime-when-it-alerted/
- /ja/monitors/faq/i-have-a-downtime-scheduled-on-my-monitor-why-did-it-still-alert/
further_reading:
- link: /monitors/
  tag: ドキュメント
  text: モニターの作成方法
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/notify/downtimes/
  tag: ドキュメント
  text: ダウンタイムについて
kind: ガイド
title: ダウンタイムになったモニターからのアラートを防止する
---

グループが[ダウンタイム][1]になり、**`OK`** から **`ALERT`**、**`WARNING`**、**`NO DATA`** のいずれかの状態に移行すると、このイベントは通知を抑止されます。
このダウンタイムが終了またはキャンセルされると、再通知イベント (構成されている場合) と回復イベントの両方が送信されるようになります。

回復通知を抑制するために、ダウンタイムをキャンセルする前にモニターを解決するオプションがあります。しかし、非 **`OK`** 状態にあったグループは、以前の状態に戻る可能性があり、その結果、別の通知が発生します。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/notify/downtimes/