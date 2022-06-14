---
title: Observability Pipelines
kind: Documentation
further_reading:
  - link: /integrations/observability_pipelines/setup/
    tag: Documentation
    text: Set up Observability Pipelines 
  - link: /integrations/observability_pipelines/vector_configurations/
    tag: Documentation
    text: Learn more about Vector configurations
  - link: https://vector.dev/docs/setup/going-to-prod/
    tag: Documentation
    text: Take Observability Pipelines to production with capacity planning
  - link: https://vector.dev/releases/ 
    tag: Documentation
    text: Check out the new release for Vector
  - link: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
    tag: Documentation
    text: Datadog Agent as a source for Vector
  - link: https://docs.datadoghq.com/agent/vector_aggregation/ 
    tag: Documentation
    text: Configure Datadog Agents to send data to Vector aggregators
---

{{< img src="integrations/observability_pipelines/obs_pipelines_overview.png" alt="test" style="width:100%;" >}}

## What is Observability Pipelines?

Observability Pipelines is a monitoring solution built on [Vector][1], an open source tool that enables you to monitor and manage all of your telemetry pipelines at scale. Vector can be deployed as an agent or an aggregator within your infrastructure to collect, transform, and route all of your logs, metrics, and traces to any destination. 

Add a Datadog API key into your Vector configuration to connect it to Observability Pipelines. Use Observability Pipelines to monitor your Vector pipelines and identify bottlenecks and latencies, fine-tune performance, monitor data delivery, and more. 

With Observability Pipelines, you can also:

- Control your data volume before routing them to manage costs.
- Route data anywhere to reduce lock-in and simplify migrations.
- Meet residency requirements and redact sensitive data to stay more compliant.
- Enrich, structure, and transform your events to make them more useful.

Build performant and reliable data pipelines with complete visibility and simplified management using Observability Pipelines. 

## Get started

- [Install Vector][2] using the quick start method, your preferred package manager, or based on your specific platform or operating system.
- [Set up Vector configurations][3] to collect, transform and route your data.
- [Connect Vector to Observability Pipelines][4] with your Datadog API.

## Explore Observability Pipelines

Now that you are sending configuration data to Observability Pipelines, start getting insights into your Vector pipelines:

### Monitor the entire health of your Vector pipelines

Get a holistic view of all of your pipelines’ topologies and monitor key performance indicators, such as average load, error rate, and throughput for each of your flows. 

{{< img src="integrations/observability_pipelines/config-map.png" alt="test" style="width:80%;" >}}

### Quickly identify bottlenecks and optimize performance

Dive into specific Vector components to understand how observability data is flowing into your pipeline to troubleshoot and pinpoint performance bottlenecks and to optimize your pipeline. 

{{< img src="integrations/observability_pipelines/config-map-side-panel.png" alt="test" style="width:85%;" >}}

### Ensure data delivery and reduce latency. 

Find out if data is reaching its destination and get full visibility into any latency issues to meet SLIs and SLOs.

{{< img src="integrations/observability_pipelines/configuration-list.png" alt="test" style="width:85%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/
[2]: /integrations/observability_pipelines/setup/#install-vector
[3]: /integrations/observability_pipelines/setup/#set-up-vector-configurations
[4]: /integrations/observability_pipelines/setup/#connect-vector-to-observability-pipelines
