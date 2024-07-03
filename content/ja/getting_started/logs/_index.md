---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Learning Center
  text: Introduction to Log Management
- link: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
  tag: Learning Center
  text: Going Deeper with Logs Processing
- link: /logs/log_collection/
  tag: Documentation
  text: Log Collection & Integrations
- link: /getting_started/tagging/unified_service_tagging
  tag: Documentation
  text: Learn how to configure unified service tagging
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Join an interactive session to optimize your Log Management
kind: documentation
title: Getting Started with Logs
---

## Overview

Use Datadog Log Management, also called logs, to collect logs across multiple logging sources, such as your server, container, cloud environment, application, or existing log processors and forwarders. With conventional logging, you have to choose which logs to analyze and retain to maintain cost-efficiency. With Datadog Logging without Limits*, you can collect, process, archive, explore, and monitor your logs without logging limits.

This page shows you how to get started with Log Management in Datadog. If you haven't already, create a [Datadog account][1].

## Configure a logging source

With Log Management, you can analyze and explore data in the Log Explorer, connect [Tracing][2] and [Metrics][3] to correlate valuable data across Datadog, and use ingested logs for Datadog [Cloud SIEM][4]. The lifecycle of a log within Datadog begins at ingestion from a logging source.

{{< img src="/getting_started/logs/getting-started-overview.png" alt="Different types of log configurations">}}

### Server

There are several [integrations][5] available to forward logs from your server to Datadog. Integrations use a log configuration block in their `conf.yaml` file, which is available in the `conf.d/` folder at the root of your Agent's configuration directory, to forward logs to Datadog from your server.

```yaml
logs:
  - type: file
    path: /path/to/your/integration/access.log
    source: integration_name
    service: integration_name
    sourcecategory: http_web_access
```

To begin collecting logs from a server:

1. If you haven't already, install the [Datadog Agent][6] based on your platform.

    **Note**: Log collection requires Datadog Agent v6+.

2. Collecting logs is **not enabled** by default in the Datadog Agent. To enable log collection, set `logs_enabled` to `true` in your `datadog.yaml` file.

    {{< agent-config type="log collection configuration" filename="datadog.yaml" collapsible="true">}}

3. Restart the [Datadog Agent][7].

4. Follow the integration [activation steps][8] or the custom files log collection steps on the Datadog site.

    **Note**: If you're collecting logs from custom files and need examples for tail files, TCP/UDP, journald, or Windows Events, see [Custom log collection][9].

### Container

As of Datadog Agent v6, the Agent can collect logs from containers. Each containerization service has specific configuration instructions based where the Agent is deployed or run, or how logs are routed.

For example, [Docker][10] has two different types of Agent installation available: on your host, where the Agent is external to the Docker environment, or deploying a containerized version of the Agent in your Docker environment.

[Kubernetes][11] requires that the Datadog Agent run in your Kubernetes cluster, and log collection can be configured using a DaemonSet spec, Helm chart, or with the Datadog Operator.

To begin collecting logs from a container service, follow the [in-app instructions][12].

### Cloud

You can forward logs from multiple cloud providers, such as AWS, Azure, and Google Cloud, to Datadog. Each cloud provider has its own set of configuration instructions.

For example, ​AWS service logs are usually stored in S3 buckets or CloudWatch Log groups. You can subscribe to these logs and forward them to an Amazon Kinesis stream to then forward them to one or multiple destinations. Datadog is one of the default destinations for Amazon Kinesis Delivery streams.​

To begin collecting logs from a cloud service, follow the [in-app instructions][13].

### Client

Datadog permits log collection from clients through SDKs or libraries. For example, use the `datadog-logs` SDK to send logs to Datadog from JavaScript clients.

To begin collecting logs from a client, follow the [in-app instructions][14].

### Other

If you're using existing logging services or utilities such as rsyslog, Fluentd, or Logstash, Datadog offers plugins and log forwarding options.

If you don't see your integration, you can type it in the *other integrations* box and get notifications for when the integration is available.

To begin collecting logs from a cloud service, follow the [in-app instructions][15].

## Explore your logs

Once a logging source is configured, your logs are available in the [Log Explorer][16]. This is where you can filter, aggregate, and visualize your logs.

For example, if you have logs flowing in from a service that you wish to examine further, filter by `service`. You can further filter by `status`, such as `ERROR`, and select [Aggregate by Patterns][17] to see which part of your service is logging the most errors.

{{< img src="/getting_started/logs/error-pattern.png" alt="Filtering in the Log Explorer by error pattern">}}

Aggregate your logs by `Field` of `Source` and switch to the **Top List** visualization option to see your top logging services. Select a source, such as `error`, and select **View Logs** from the dropdown menu. The side panel populates logs based on error, so you quickly see which host and services require attention.

{{< img src="/getting_started/logs/top-list-view.png" alt="A top list in the Log Explorer">}}

## What's next?

Once a logging source is configured, and your logs are available in the Log Explorer, you can begin to explore a few other areas of log management.

### Log configuration

* Set [attributes and aliasing][18] to unify your logs environment.
* Control how your logs are processed with [pipelines][19] and [processors][20].
* As Logging without Limits* decouples log ingestion and indexing, you can [configure your logs][21] by choosing which to index, retain, or archive.

### Log correlation

* [Connect logs and traces][2] to exact logs associated with a specific `env`, `service,` or `version`.
* If you're already using metrics in Datadog, you can [correlate logs and metrics][3] to gain context of an issue.

### Guides

* [Best practices for Log Management][22]
* Dive further into [Logging without Limits*][23]
* Manage sensitive log data with [RBAC settings][24]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: https://www.datadoghq.com
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[3]: /ja/logs/guide/correlate-logs-with-metrics/
[4]: /ja/security/cloud_siem/
[5]: /ja/getting_started/integrations/
[6]: /ja/agent/
[7]: https://github.com/DataDog/datadog-agent/blob/main/docs/agent/changes.md#cli
[8]: https://app.datadoghq.com/logs/onboarding/server
[9]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[10]: /ja/agent/docker/log/?tab=containerinstallation
[11]: /ja/agent/kubernetes/log/?tab=daemonset
[12]: https://app.datadoghq.com/logs/onboarding/container
[13]: https://app.datadoghq.com/logs/onboarding/cloud
[14]: https://app.datadoghq.com/logs/onboarding/client
[15]: https://app.datadoghq.com/logs/onboarding/other
[16]: /ja/logs/explorer/
[17]: /ja/logs/explorer/#patterns
[18]: /ja/logs/log_configuration/attributes_naming_convention/
[19]: /ja/logs/log_configuration/pipelines/
[20]: /ja/logs/log_configuration/processors/
[21]: /ja/logs/log_configuration/
[22]: /ja/logs/guide/best-practices-for-log-management/
[23]: /ja/logs/guide/getting-started-lwl/
[24]: /ja/logs/guide/logs-rbac/