---
title: Adjusting No Data alerts for metric Monitors
aliases:
  - /monitors/faq/why-am-i-getting-so-many-no-data-alerts/
  - /monitors/faq/why-am-i-getting-so-many-no-data-alerts-for-my-metric-monitor/
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
---

*No Data* アラートは、インテグレーション/アプリケーションが Datadog にメトリクスを送信しなくなったときに通知される素晴らしい方法です。
[AWS インテグレーション][2]からのメトリクスなど、常に同じ頻度でレポートされない、またはタイムスタンプがわずかに過去に報告されるメトリクスに対して[メトリクスモニター][1]を利用すると、Datadog でこれらの値を見ているにもかかわらず、No Data アラートを受け取る場合があります。このようなタイプのメトリクスを適切に評価するために編集できるモニター構成オプションがいくつかあります。

{{< img src="monitors/guide/AWS_Monitor_Config.png" alt="AWS モニター構成" >}}

1. 上の画像は、このメトリクス: `aws.ec2.cpuutilization` が少し遅れて入ってきていることを表示しています。
これは、このメトリクスが Cloudwatch から入手できるようになる時期が制限されているためです。

{{< img src="monitors/guide/require_full_window.png" alt="フルウィンドウのデータを要求する" >}}

2. 遅延評価オプション。
モニターは 1 分ごとに評価を行うので、過去 X 分のデータを振り返っていることになります。AWS から来るようなバックフィルされたメトリクスでは、モニターは Datadog にデータがない期間を見ている可能性があります。これは、誤った No Data アラートを引き起こします。このフィールドを設定すると、モニターを 900 秒待つことができ、モニターが評価を開始する前に、AWS のメトリクスが Datadog 内で利用できるように 900 秒持つようになります。

3. このオプションは、[Require a Full Window of Data][3] (または、要求しない機能) です。
このオプションは、通常、Datadog Agent によってレポートされるメトリクスや、現在のタイムスタンプで受信されるメトリクスに推奨されます。わずかにバックフィルされたメトリクスでは、このオプションはデータなしイベントを引き起こすか、またはモニターが評価する時に値が存在しないために、モニターが現在の評価期間をスキップすることがあります。このため、すべての疎なメトリクスまたは同じ頻度でレポートしないメトリクスは、デフォルトオプションの "[Do Not [Require a Full Window of Data][3]" を維持する必要があります。

最後に、効果的なモニターを構築する場合、以下の制約を理解することが重要です。[クラウドメトリクスの遅延][4]は、クラウドプロバイダーごとに異なります。遅延を大幅に抑えてメトリクスを受信するには、可能な限り Datadog Agent をクラウドホストにインストールします。Datadog Agent をクラウドインスタンスにインストールする][5]のドキュメントを参照してください。

何か問題が発生した場合は、[当社][6]にご連絡ください。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/metric/
[2]: /integrations/amazon_web_services/
[3]: /monitors/types/metric/?tab=threshold#advanced-alert-conditions
[4]: /integrations/guide/cloud-metric-delay/
[5]: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[6]: /help/
