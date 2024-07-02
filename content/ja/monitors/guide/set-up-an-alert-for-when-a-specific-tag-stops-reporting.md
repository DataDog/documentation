---
title: Set up an alert for when a specific tag stops reporting
further_reading:
- link: /monitors/
  tag: Documentation
  text: Learn how to create a monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
aliases:
- /monitors/faq/how-can-i-setup-an-alert-for-when-a-specific-tag-stops-reporting  
---

場合によっては、タグの 1 つがシステムのいくつかから消えたときに知りたいことがあります。Datadog では、このようなアラートスキームのための[モニター][1]をセットアップすることが可能です。

1. 古典的な[メトリクスモニター][2]を設定し、欠落したときにアラートを発行させたいメトリクスとタグを指定します。
1. 決してトリガーされることのないアラート条件を選択します。例えば、`system.cpu.user` のような正のメトリクスには、`a < -1` を指定します。
1. この例で見られるように、_Notify if data is missing_ オプションを有効にします。

{{< img src="monitors/guide/tag_stop_reporting.png" alt="Tag stop reporting" >}}

タグがレポートを停止した場合、アラートがトリガーします。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: /monitors/types/metric/
