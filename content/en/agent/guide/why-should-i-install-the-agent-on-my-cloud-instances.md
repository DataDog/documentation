---
title: Why should I install the Datadog Agent on my cloud instances?
aliases:
    - /agent/faq/why-should-i-install-the-agent-on-my-aws-instances/
    - /integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch/
    - /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
further_reading:
- link: "/integrations/guide/cloud-metric-delay/"
  tag: "Guide"
  text: "Cloud Metric Delay"
---

If you use AWS, Azure, Google Cloud, or another cloud-based metrics provider, installing the Datadog Agent on your instances gives you several benefits, for example:

* **Better resolution** - Cloud providers observe what's happening from the outside by sampling hosts every 5-25 minutes. Additionally, AWS provides metrics on a per minute basis through their API. Because all Datadog metrics are stored at a 1-second resolution, these metrics are divided by 60 during post-processing. The Datadog Agent captures performance statistics every 15 seconds to provide a more accurate understanding of what's happening from the hosts' perspective.

* **Exposed metrics** - Datadog has over 50 metrics enabled by default. More metrics can be added with Datadog's application-specific integrations.

* **Integrations** - These make it simple to extend the Datadog Agent beyond the native metrics so you can monitor application health, process utilization, and more.

* **Custom metrics with DogStatsD** - With the Datadog Agent on board, use the built-in StatsD client to send custom metrics from your application, allowing you to correlate what's happening with your application, your users, and your system.

  {{< img src="agent/guide/Agent_VS_AWSA.jpg" alt="Agent vs AWS CloudWatch" style="width:70%;">}}

The Datadog Agent is lightweight and fully open source, so you can review the code and even contribute by making a pull request.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
