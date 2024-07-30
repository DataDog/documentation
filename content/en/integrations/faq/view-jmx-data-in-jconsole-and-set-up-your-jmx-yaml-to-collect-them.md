---
title: View JMX data in jConsole and set up your jmx.yaml to collect them

further_reading:
- link: "/integrations/java/"
  tag: "Documentation"
  text: "Java integration"
- link: "https://www.datadoghq.com/blog/easy-jmx-discovery-browsing-open-source-agent/"
  tag: "Blog"
  text: "Easy JMX discovery & browsing with the open source Agent"
---

This article provides two examples of converting metric data from your jConsole into a valid Datadog Agent configuration file (`jmx.yaml`).

The first example shows conversion for `domain -> type -> bean -> attribute`:

{{< img src="integrations/faq/jConsolejmx.png" alt="jConsolejmx" >}}

The second example shows conversion for `domain -> bean -> attribute`:

{{< img src="integrations/faq/jConsolejmx2.png" alt="jConsolejmx" >}}

After the Datadog Agent is set up to submit JMX metrics, use the [Metrics Explorer][1] to verify the metrics are being submitted to Datadog. The example below demonstrates how you can filter the metrics by tags:

{{< img src="integrations/faq/jmxGraphMetric.png" alt="jmxGraphMetric" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/explorer/
