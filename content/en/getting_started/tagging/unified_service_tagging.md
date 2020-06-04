---
title: Unified Service Tagging
kind: documentation
aliases:
- /tagging/unified_service_tagging
further_reading:
- link: "/tagging/using_tags"
  tag: "Documentation"
  text: "Learn how to use tags in the Datadog UI"
- link: "/blog/autodiscovery-docker-monitoring"
  tag: "Blog"
  text: "Learn more about Autodiscovery"
---

## Overview
Unified service tagging ties Datadog telemetry together through the use of three [reserved tags][1]: `env`, `service`, and `version`. By adding these tags to your [Datadog Agent's][2] configuration file, you can troubleshoot issues and view data pertaining to your services, based on environment or version, in a unified fashion within the Datadog app. Once these tags are configured you'll be able to do things like filter your logs, traces, and metrics by `service` and `version` to see the total service requests and the errors by version.

### Requirements

- Unified service tagging requires knowledge of configuring tags. If you are unsure of how to configure tags, read the [Getting Started with Tagging][3] guide and [Assigning tags][4] documentation before proceeding to configuration.

- Unified service tagging requires the [Datadog Agent][5].

## Environment variables and labels

With a basic [Datadog Agent][2] configuration, service name (`service: apache`) is configured in your agent configuration file at the individual application or integration level. This allows you to filter solely by service within the Datadog app. However, with unified service tagging, the `service` tag is configured with `env` and `version` at container or top-level to automatically apply these tags to all metrics, logs, and traces for all services.

The Datadog Agent uses [environment variables][6], which are in `key:value` pairs, to configure tags for the Datadog app. In containerized environments using [Autodiscovery][7], the agent uses Kubernetes/Docker labels or environment variables to configure tags.

To properly configure unified tagging, choose your environment: [containerized](#containerized-environment) or [non-containerized](#non-containerized-environment).

{{< img src="tagging/unified_service_tagging/overview.gif" alt="Unified Service Tagging"  >}}

## Configuration

### Containerized environment

In containerized environments, `env`, `service`, and `versions` are unified through the use of standard labels and environment variables. Since the agent associates data collected with a specific container, the configuration for these tags can conveniently reside within the container's metadata.

[Autodiscovery][7] is recommended ensure consistent container monitoring when shifting from host to host. Autodiscovery also automatically identifies services running on a specific container and gathers data from those services. Adding standard labels for unified tagging in your Autodiscovery template will automatically assign `env`, `service`, and `versions` to all of your services.

**Note**: While `service` is generally "constant", `env` and `version` might be determined at build time or afterwards. If known at build time, these parameters can be set within a container's image. Since the environment variables become part of the image, they're available when the container is started. Consider this as an option if injecting the environment variables later on is not possible. Conversely, it might be more convenient to inject the `DD_*` environment variables at deploy time. If so, you can leverage the relevant [API][8] for your containerized infrastructure.

#### Adding environment variables and labels

{{< tabs >}}
{{% tab "Kubernetes" %}}

##### Pod-level metrics
Add the following standard labels (`tags.datadoghq.com`) to the pod spec of a Deployment, StatefulSet, or Job.

```yaml
  template:
    metadata:
      labels:
        tags.datadoghq.com/env: <ENV>
        tags.datadoghq.com/service: <SERVICE>
        tags.datadoghq.com/version: <VERSION>
```
These labels cover pod-level Kubernetes CPU, memory, network, and disk metrics, and are used for injecting `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` into your service's container.

If you have multiple containers per pod, you can specify standard labels by container:

```yaml
tags.datadoghq.com/<container-name>.env
tags.datadoghq.com/<container-name>.service
tags.datadoghq.com/<container-name>.version
```

##### State metrics

For [Kubernetes State Metrics][1], add the same standard labels to the collection of labels for the parent resource (e.g., Deployment).

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: <ENV>
    tags.datadoghq.com/service: <SERVICE>
    tags.datadoghq.com/version: <VERSION>
spec:
  <Block from above>
```

##### APM Tracer / StatsD client

[APM Tracer][2] and [StatsD client][3] environment variables can be sourced from the same labels by using the [Kubernetes's downward API][4] in the format below:

```yaml
    containers:
    -  ...
       env:
            - name: DD_ENV
              valueFrom:
                fieldRef:
                  fieldPath: metadata.labels['tags.datadoghq.com/env']
            - name: DD_SERVICE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.labels['tags.datadoghq.com/service']
            - name: DD_VERSION
              valueFrom:
                fieldRef:
                  fieldPath: metadata.labels['tags.datadoghq.com/version']
```

[1]: /agent/kubernetes/data_collected/#kube-state-metrics
[2]: /tracing/send_traces/
[3]: /integrations/statsd/
[4]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#the-downward-api
{{% /tab %}}

{{% tab "Docker" %}}
To achieve a single point of configuration across all telemetry, make `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` available within your container's runtime environment. As long as the Agent can access your container's [Docker socket][1], it will be able to detect the environment variables and map them to the standard tags.

If your service has no need for the Datadog environment variables (for example, third party software like Redis, PostgreSQL, NGINX, and applications not traced by APM), you can instead use Docker labels:

```yaml
  LABEL com.datadoghq.tags.env="<ENV>"
  LABEL com.datadoghq.tags.service="<SERVICE>"
  LABEL com.datadoghq.tags.version="<VERSION>"
```
[1]: https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-socket-option
{{% /tab %}}

{{% tab "ECS" %}}

To achieve a single point of configuration across all telemetry, make `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` available within your container's runtime environment. These variables can be set in the Docker image itself or in the ECS task's definition:

```yaml
        "environment": [
          {
            "name": "DD_ENV",
            "value": "<ENV>"
          },
          {
            "name": "DD_SERVICE",
            "value": "<SERVICE>"
          },
          {
            "name": "DD_VERSION",
            "value": "<VERSION>"
          }
        ]
```

If there are containers that will not benefit from using the environment variables in the application runtime, you can instead use Docker labels:

```yaml
        "dockerLabels": {
          "com.datadoghq.tags.env": "<ENV>",
          "com.datadoghq.tags.service": "<SERVICE>",
          "com.datadoghq.tags.version": "<VERSION>"
        }
```

{{% /tab %}}
{{< /tabs >}}

### Non-containerized environment

Depending on how you build and deploy your services' binaries or executables, you may have several options available for setting environment variables. Since you may run one or more services per host, we recommend that these environment variables be scoped to a single process.

You may elect export the environment variables in the command for your executable:

`DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service`

Or you might use [Chef][9], [Ansible][10], or another orchestration tool to populate a service's systemd or initd configuration file with the `DD` environment variables. That way when the service process is started it will have access to those variables.

To form a single point of configuration for all telemetry emitted directly from your service's runtime for [traces][11], [logs][12], and [StatsD metrics][13], configure based on integration or your application.

{{< tabs >}}
{{% tab "Integrations" %}}

## Agent > v7.18/v6.18

Define `service` under `init_config` in your `conf.yaml` file:

```yaml
init_config:
  service: apache
```

## Agent < v7.18/v6.18

Define `service` under `tags` within your instances in your `conf.yaml` file:

```yaml
instances:
    - apache_status_url: http://localhost/server-status?auto
      tags:
        - "service: apache"
```
{{% /tab %}}

{{% tab "Application" %}}

## APM

[EXAMPLES NEEDED FOR CONFIGURATION]

As a best practice, it is recommended to configure your [APM tracer][1] with `DD_ENV` as it keeps the definition of `env` closer to the application that is generating the traces. This method allows the `env` tag to be sourced automatically from a tag in the span metadata.

When spans are configured with `DD_VERSION`, the tracer will add version to all spans that fall under the service that "owns" the tracer (generally `DD_SERVICE`). This means that if your service creates spans with the name of an external service, those spans will not receive `version` as a tag. As long as version is present in spans, it will be added to trace metrics generated from those spans. The version can be added manually in-code or automatically by the tracer.

At the very least they will be used by the APM and [Dogstatsd clients][2] to tag trace data and statsd metrics with `env`, `service`, and `version`. If enabled, the APM tracer will also inject the values of these variables into your logs.

**Note: There can only be one service per span.** Trace metrics generally have a single service as well. However, if you have a different service defined in your hosts' tags, that configured service tag will show up on all trace metrics emitted from that host.

### Connected logs and traces

If you're using [connected logs and traces][3], it is recommended to enable automatic logs injection for your APM . The APM tracer will then automatically inject `env`, `service`, and `version` into your logs, thereby eliminating manual configuration for those fields elsewhere.

If you already have logs configuration checks defined similarly to the example below, you **do not** need to define `service`:

```yaml
logs:
  - type: file
    path: "/path/to/your/log.log"
    source: python
    service: service_name
    log_processing_rules:
      ...
    tags:
      ...
```
This configuration will allow existing configurations, such as log processing rules or other tags, to continue to work exactly the same.

If you do not wish to use automatic log injection from the APM tracer, you also have the option of [manually injecting these fields into logs][4].

## Custom metrics

Tags are added in an append-only fashion for [custom statsd metrics][5]. For example, if you have two different values for `env`, the metrics will be tagged with both environments. There is no order in which one tag will override another of the same name.


[1]: /tracing/send_traces/
[2]: /developers/dogstatsd/
[3]: /tracing/connect_logs_and_traces/
[4]: /tracing/connect_logs_and_traces/java?tab=log4j2#manual-trace-id-injection
[5]: /developers/metrics/
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/#defining-tags
[2]: /getting_started/agent
[3]: /tagging/
[4]: /tagging/assigning_tags
[5]: /getting_started/agent/#setup
[6]: /tagging/assigning_tags?tab=noncontainerizedenvironments#environment-variables
[7]: /getting_started/agent/autodiscovery
[8]: /api/
[9]: https://www.chef.io/
[10]: https://www.ansible.com/
[11]: /getting_started/tracing/
[12]: /getting_started/logs/
[13]: /integrations/statsd/
