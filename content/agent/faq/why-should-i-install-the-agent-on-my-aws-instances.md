---
title: Why should I install the Datadog Agent on my AWS instances?
kind: faq
---

If you use AWS CloudWatch or another cloud-based metrics provider, you may already get some metrics for your hosts. However, installing the Datadog Agent on these hosts gives you a number of benefits, including:

* **Better resolution** - CloudWatch observes what's happening from the outside by sampling hosts every ~5-25 minutes, whereas the Datadog Agent captures performance statistics every 15 seconds to provide a more accurate understanding of what's happening from the hosts' perspective.

* **Exposed metrics** - AWS only exposes 10+ metrics for EC2 instances, so you'll miss critical KPI's such as memory, disk utilization, swap, network errors, etc. Datadog has over 50 metrics enabled by default. More metrics may be added with Datadog's application-specific integrations.

* **Integrations** - These make it simple to extend our Agent beyond the native metrics so you easily monitor application health, process utilization, and more.

* **Custom metrics with DogStatsD** - With the Datadog Agent on board, use the built-in StatsD client to send custom metrics from your application, making it easier to correlate what's happening with your application, your users, and your system. {{< img src="agent/faq/Agent_VS_AWSA.jpg" alt="Agent vs AWSA" responsive="true" style="width:40%;">}}

The Datadog Agent is lightweight and fully open source, so you can review the code and even contribute by making a pull request.

Also reference this article if you suspect you're seeing [latency reporting AWS metrics][1].

[1]: /integrations/faq/are-my-aws-cloudwatch-metrics-delayed
