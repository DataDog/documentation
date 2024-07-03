---
aliases:
- /ja/agent/faq/why-should-i-install-the-agent-on-my-aws-instances/
- /ja/integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch/
- /ja/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
further_reading:
- link: /integrations/guide/cloud-metric-delay/
  tag: Guide
  text: Cloud Metric Delay
title: Why should I install the Datadog Agent on my cloud instances?
---

If you use AWS, Azure, Google Cloud, or another cloud-based metrics provider, installing the Datadog Agent on your instances gives you several benefits, for example:

* **解像度の向上** - クラウドプロバイダーは、5～25 分ごとにホストをサンプリングして、外から何が起こっているかを観測可能です。さらに、AWS は API を通じて 1 分単位でメトリクスを提供しています。Datadog のメトリクスはすべて 1 秒の解像度で保存されているため、これらのメトリクスは後処理時に 60 で割られます。Datadog Agent は、15 秒ごとにパフォーマンス統計をキャプチャし、ホストの視点から何が起こっているかをより正確に理解することができます。

* **公開メトリクス** - Datadog は、デフォルトで 50 以上のメトリクスを有効にしています。Datadog のアプリケーション固有のインテグレーションにより、さらに多くのメトリクスを追加することが可能です。

* **インテグレーション** - これにより、Datadog Agent をネイティブメトリクス以外にも簡単に拡張し、アプリケーションの健全性やプロセスの利用状況などを監視することができます。

* **DogStatsD によるカスタムメトリクス** - Datadog Agent があれば、内蔵の StatsD クライアントを使用してアプリケーションからカスタムメトリクスを送信し、アプリケーション、ユーザー、システムで発生していることを関連付けることができます。

  {{< img src="agent/guide/Agent_VS_AWSA.jpg" alt="Agent vs AWS CloudWatch" style="width:70%;">}}

Datadog Agent は軽量で完全なオープンソースであるため、コードをレビューしたり、プルリクエストをして貢献することもできます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}