---
aliases:
- /ja/monitors/faq/i-have-a-downtime-scheduled-on-my-monitor-why-did-it-still-alert
further_reading:
- link: /monitors/create/
  tag: ドキュメント
  text: モニターの作成方法
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/notify/downtimes/
  tag: ドキュメント
  text: ダウンタイムについて
kind: faq
title: 一部のホストのダウンタイムをスケジューリングする
---

特定のタグスコープで[ダウンタイムをスケジュールする][1]場合、ダウンタイムはそれらのタグに "AND" ロジックを適用します。つまり、`host:A` と `host:B` のダウンタイムを設定したい場合、ダウンタイムは **`host:A` と `host:B`** の両方のタグを含む評価グループでアラートするモニターだけを停止します (そしてそのダウンタイムはアラートを停止しない可能性があります)。

もし、一部のホストに対してダウンタイムをスケジュールしたい場合、良い方法は、それらすべてのホストに共通するホストタグを見つけ、そのタグによってダウンタイムをスコープすることです。

これを利用する 1 つの方法として、Datadog UI でホストを選択して **Edit Tags** ボタン (下図) を押して[インフラストラクチャーリスト][2]や[ホストマップ][3]から直接新しいホストタグを作成するか、[Datadog API][4] で作成することが挙げられます。

{{< img src="monitors/guide/edit_tag.png" alt="タグの編集"  >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/notify/downtimes/
[2]: /ja/infrastructure/
[3]: /ja/infrastructure/hostmap/
[4]: /ja/api/v1/tags/#add-tags-to-a-host