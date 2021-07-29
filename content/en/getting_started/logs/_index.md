---
title: Send logs to Datadog
kind: documentation
further_reading:
    - link: 'https://learn.datadoghq.com/enrol/index.php?id=15'
      tag: 'Learning Center'
      text: 'Introduction to Logs in Datadog'
    - link: '/logs/log_collection/'
      tag: 'Documentation'
      text: 'Log Collection & Integrations'
    - link: /getting_started/tagging/unified_service_tagging
      tag: 'Documentation'
      text: 'Learn how to configure unified service tagging'
---

## Overview

Datadog Log Management is used to collect logs across multiple logging sources, such as your server, container, cloud environment, application, or other logging sources. With conventional logging, you have to choose which logs to analyze and retain to maintain cost-efficiency. With Datadog Logging without Limits*, you can collect, process, archive, explore, and monitor your logs without logging limits. Log management is what powers Datadog [Security Monitoring][1], and can be used in conjunction with [Tracing][2] and [Metrics][3] to correlate valuable data across Datadog.

This page shows you how to get started with Log Management in Datadog. As a prerequisite to the following guide, a Datadog account is required. If you haven't already, create a [Datadog account][4].

## Configure a logging source

### Server

There are several [integrations][5] available to forward logs from your server to Datadog. Integrations use a log configuration block in their `conf.yaml` file, which is available in the `conf.d/` folder at the root of your Agent’s configuration directory, to forward logs to Datadog from your server.

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

2. Collecting logs is disabled by default in the Datadog Agent. To enable log collection, set `logs_enabled` to `true` in your `datadog.yaml` file.

3. Restart the [Datadog Agent][7].

4. Follow the integration [activation steps][8] or the custom files log collection steps in the Datadog app.

  **Note**: If you're collecting logs from custom files and need examples for tail files, TCP/UDP, journald, or Windows Events, see the [Custom log collection documentation][9].

### Container

As of Datadog Agent v6, the Agent can collect logs from containers. Each containerization service has specific configuration instructions based where the Agent is deployed or run, or how logs are routed.

For example, [Docker][10], has two different types of Agent installation available: on your host, where the Agent is external to the Docker environment, or deploying a containerized version of the Agent in your Docker environment.

[Kubernetes][11] requires that the Datadog Agent run in your Kubernetes cluster, and log collection can be configured using a DaemonSet spec, Helm chart, or with the Datadog Operator.

To begin collecting logs from a container service, follow the [in-app instructions][12].

### Cloud

You can forward logs from multiple cloud providers, such as AWS, Azure, and GCP, to Datadog. Each cloud provider has their own set of configuration instructions.

For example, ​AWS service logs are usually stored in S3 buckets or CloudWatch Log groups. You can subscribe to these logs and forward them to an Amazon Kinesis stream to then forward them to one or multiple destinations. Datadog is one of the default destinations for Amazon Kinesis Delivery streams.​

To begin collecting logs from a cloud service, follow the [in-app instructions][13].

### Client

Datadog permits log collection from clients through SDKs or libraries. For example, use the `datadog-logs` SDK to send logs to Datadog from JavaScript clients.

To begin collecting logs from a cloud service, follow the [in-app instructions][14].

### Other

If you're using existing logging services or utilities such as rsyslog, flutend, or logstash, Datadog offers plugins and log forwarding options.

If you don't see your integration, you can type it in the *other integrations* box and get notifications for when the integration is available.

To begin collecting logs from a cloud service, follow the [in-app instructions][15].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: https://docs.datadoghq.com/security_platform/security_monitoring/
[2]: https://docs.datadoghq.com/tracing/connect_logs_and_traces/
[3]: https://docs.datadoghq.com/logs/guide/correlate-logs-with-metrics/
[4]: https://www.datadoghq.com
[5]: https://docs.datadoghq.com/getting_started/integrations/
[6]: https://docs.datadoghq.com/agent/
[7]: https://github.com/DataDog/datadog-agent/blob/main/docs/agent/changes.md#cli
[8]: https://app.datadoghq.com/logs/onboarding/server
[9]: https://docs.datadoghq.com/agent/logs/?tab=tailfiles#custom-log-collection
[10]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation
[11]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset
[12]: https://app.datadoghq.com/logs/onboarding/container
[13]: https://app.datadoghq.com/logs/onboarding/cloud
[14]: https://app.datadoghq.com/logs/onboarding/client
[15]: https://app.datadoghq.com/logs/onboarding/other
