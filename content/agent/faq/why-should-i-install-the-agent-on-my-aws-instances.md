---
title: Why should I install the agent on my AWS instances?
kind: faq
customnav: agentnav
---

If you use AWS CloudWatch or another cloud-based metrics provider, you may already be getting some metrics for your hosts. However, installing the [Datadog agent](/agent/) on these hosts will give you a number of benefits, including:

* **Better resolution** - CloudWatch observes what's happening from the outside by sampling hosts every ~5-25 minutes, whereas Datadog's agent is capturing performance stats every 15 seconds to provide a more realistic understanding of what's happening from the hosts' perspective.

* **Exposed metrics** - AWS only exposes 10+ metrics for EC2 instances so you'll miss critical KPI's such as memory, disk utilization, swap, network errors, etc. Datadog has over 50 metrics enabled by default and can push this further with our many application-specific integrations.

* **Integrations** - These make it simple to extend our agent beyond the native metrics so you can easily monitor application health, process utilization, and more.

* **Custom metrics with Dogstatsd** - With the Datadog agent on board, you can use the built-in statsd client to send custom metrics from your application, making it easier to correlate what’s happening with your application, your users and your system.
{{< img src="agent/faq/Agent_VS_AWSA.jpg" alt="Agent vs AWSA" responsive="true" >}}

The Datadog agent [is lightweight](/agent) and [fully open source](https://github.com/DataDog/dd-agent), so you can review the code and even contribute by making a pull request.

Also reference this article if you suspect you're seeing [latency reporting AWS metrics](/integrations/faq/are-my-aws-cloudwatch-metrics-delayed).