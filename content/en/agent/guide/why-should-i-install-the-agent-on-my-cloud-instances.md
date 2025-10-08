---
title: Why should I install the Datadog Agent on my cloud instances?
description: Explains the benefits of installing the Datadog Agent on cloud instances, including better resolution, more metrics, integrations, and custom monitoring capabilities.
aliases:
    - /agent/faq/why-should-i-install-the-agent-on-my-aws-instances/
    - /integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch/
    - /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
further_reading:
- link: "/integrations/guide/cloud-metric-delay/"
  tag: "Guide"
  text: "Cloud Metric Delay"
---

The Datadog Agent is software that runs on your hosts. It collects events and metrics from hosts and sends them to Datadog, where you can analyze your monitoring and performance data. The Datadog Agent is open source and its source code is available on GitHub at [DataDog/datadog-agent][1].

If you use AWS, Azure, Google Cloud, or another cloud-based metrics provider, installing the Datadog Agent on your instances gives you several benefits, for example:

* **Better resolution** - Cloud providers monitor your hosts externally by sampling them every 5-25 minutes. Additionally, AWS provides metrics on a per-minute basis through their API. As Datadog stores all metrics at a 1-second resolution, AWS metrics are averaged over 60 seconds during post-processing. To provide more granular insight into host performance, the Datadog Agent collects performance statistics every 15 seconds, offering a more detailed view of what's happening inside your hosts.

  {{< img src="agent/guide/Agent_VS_AWSA.jpg" alt="Agent vs AWS CloudWatch" style="width:70%;">}}

* **Exposed metrics** - Datadog has over 50 metrics enabled by default. More metrics can be added with Datadog's application-specific [integrations][2].

* **Integrations** - Over [{{< translate key="integration_count" >}} integrations][2] extend the functionality of the Datadog Agent beyond the native metrics.

* **Tagging consistency across services**: Tags applied at the Agent level are added to all metrics, logs, and traces reported by the Agent. 

* **Custom metrics with DogStatsD** - With the Datadog Agent, use the built-in [StatsD client][4] to send custom metrics from your application, allowing you to correlate what's happening with your application, your users, and your system.

* **Custom Agent checks** - For even deeper customization, implement [custom Agent checks][5] to collect metrics and other data from your custom systems or applications and send them to Datadog.

* **Application logs**: The Datadog Agent [collects and forwards application logs that are created locally][6] on your cloud VMs or containers, so they don't need to be forwarded through the cloud provider integration. These logs also have Agent-level tags applied.

* **Application Performance Monitoring (APM)** - [Traces collected through the Agent][4] give a comprehensive look into your applications, helping you understand end-to-end service performance and identify potential bottlenecks.  

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: https://docs.datadoghq.com/integrations/
[3]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent
[4]: https://docs.datadoghq.com/tracing/
[5]: https://docs.datadoghq.com/developers/custom_checks/
[6]: https://docs.datadoghq.com/agent/logs/?tab=tailfiles
