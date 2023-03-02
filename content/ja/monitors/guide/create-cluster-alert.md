---
further_reading:
- link: /monitors/
  tag: ドキュメント
  text: モニターの作成方法
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
kind: ガイド
title: クラスターアラートを作成し、グループの何割かが重大な状態になったときに通知する
---

## 概要

このガイドでは、条件を満たしたグループごとに通知するのではなく、そのうちの一定割合のグループに対してのみ通知するアラートを作成する方法を説明します。
これは、例えば、ホストやコンテナの所定の割合が重大な状態に達したときにのみアラートを発するモニターを作成する場合に便利です。

### 例: CPU 使用率の高いホストの割合でアラートを出す

この例では、40% のホストの CPU 使用率が 50% 以上になったときに通知を受け取りたいとします。`min_cutoff` 関数と `count_nonzero` 関数を利用します。

* CPU 使用率が 50% 以上のホストの数を数えるには、`min_cutoff` 関数を使用します。
* ホストの総数を数えるには `count_nonzero` 関数を使用します。
* 一方を他方で割ると、CPU 使用率が 50% 以上のホストの割合が算出されます。

{{< img src="monitors/faq/cluster-condition.png" alt="cluster-alert-condition"  >}}

* そして、その条件に該当するホストの割合が 40% になったらアラートを出すように設定します。

{{< img src="monitors/faq/cluster-trigger.png" alt="cluster-alert-trigger"  >}}

このモニターは、過去 10 分以内に CPU 使用率が 50% を超えたホストの割合を追跡し、それらのホストの 40% 以上が指定された条件を満たした場合に通知を生成します。

{{< img src="monitors/faq/cluster-status.png" alt="cluster-alert-status"  >}}

{{< partial name="whats-next/whats-next.html" >}}