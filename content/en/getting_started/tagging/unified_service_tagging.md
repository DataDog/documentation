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

{{< img src="tagging/unified_service_tagging/overview.gif" alt="Unified Service Tagging"  >}}

### Requirements

- Unified service tagging requires knowledge of configuring tags. If you are unsure of how to configure tags, read the [Getting Started with Tagging][3] guide and [Assigning tags][4] documentation before proceeding to configuration.

- Unified service tagging requires setup of the [Datadog Agent][5].


## Configuration

With unified service tagging, the `service` tag is configured with `env` and `version` at container or top-level to automatically apply these tags to all metrics, logs, and traces for all services. In containerized environments using [Autodiscovery][6], the agent uses Kubernetes/Docker labels or environment variables to configure tags.

To properly configure unified tagging, choose your environment: [containerized](#containerized-environment) or [non-containerized](#non-containerized-environment).

### Containerized environment

In containerized environments, `env`, `service`, and `versions` are set through environment variables or standard labels in your Datadog Agent configuration file. Since the agent associates data collected with a specific container, the configuration for these tags can conveniently reside within the container's metadata.

For unified service tagging, enable [Autodiscovery][6]. This allows the Datadog Agent to automatically identify services running on a specific container and gathers data from those services to map environment variables to the `env`, `service,` and `version` tags.

If you are using [Docker][7], as long as the Agent can access your container's [Docker socket][8], it will be able to detect the environment variables and map them to the standard tags.

**Note**: While `service` is generally "constant", `env` and `version` might be determined at build time or afterwards. If known at build time, these parameters can be set within a container's image. Since the environment variables become part of the image, they're available when the container is started. Consider this as an option if injecting the environment variables later on is not possible. Conversely, it might be more convenient to inject the `DD_*` environment variables at deploy time. If so, you can leverage the relevant [API][9] for your containerized infrastructure.

#### Configuration

{{< tabs >}}
{{% tab "Kubernetes" %}}

##### Full configuration

Once Autodiscovery is enabled, the Agent detects if it’s running on Kubernetes and automatically searches all pod annotations for [integration templates][1]. It is recommended to add environment variables to both the deployment object level and the pod template spec level to get the full range of unified service tagging:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: <ENV>
    tags.datadoghq.com/service: <SERVICE>
    tags.datadoghq.com/version: <VERSION>
...
template:
  metadata:
    labels:
      tags.datadoghq.com/env: <ENV>
      tags.datadoghq.com/service: <SERVICE>
      tags.datadoghq.com/version: <VERSION>
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

##### Partial configuration

###### Pod-level metrics
Add the following standard labels (`tags.datadoghq.com`) to the pod spec of a Deployment, StatefulSet, or Job:

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

###### State metrics

For [Kubernetes State Metrics][2], add the same standard labels to the collection of labels for the parent resource (e.g., Deployment).

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: <ENV>
    tags.datadoghq.com/service: <SERVICE>
    tags.datadoghq.com/version: <VERSION>
spec:
  template:
    metadata:
      labels:
        tags.datadoghq.com/env: <ENV>
        tags.datadoghq.com/service: <SERVICE>
        tags.datadoghq.com/version: <VERSION>
```

###### APM Tracer / StatsD client

[APM Tracer][3] and [StatsD client][4] environment variables can be sourced from the same labels by using the [Kubernetes's downward API][5] in the format below:

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

[1]: /agent/faq/auto_conf/
[2]: /agent/kubernetes/data_collected/#kube-state-metrics
[3]: /tracing/send_traces/
[4]: /integrations/statsd/
[5]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#the-downward-api
{{% /tab %}}

{{% tab "Docker" %}}
##### Full configuration

To achieve a single point of configuration across all telemetry, it is recommended to set up [logs injection][1] first if you plan to connect logs, traces, and metrics. Once setup is complete, make `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` available within your container's runtime environment.

As long as the agent can access your container's [Docker socket][2], it will be able to detect the environment variables and map them to the standard tags. Set service and version through environment variables in your Dockerfile:

```
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION

LABEL com.datadoghq.tags.env="<ENV>"
LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>"
```

Since `env` is generally determined at deploy or run time, you can inject it later:

`docker run ... -e DD_ENV=<ENV>`

You may also inject `DD_SERVICE` and `DD_VERSION` at this time as well if you prefer.

##### Partial configuration

If you do not need to set up logs injection or your service has no need for the Datadog environment variables (for example, third party software like Redis, PostgreSQL, NGINX, and applications not traced by APM), you can instead use Docker labels:

```
  LABEL com.datadoghq.tags.env="<ENV>"
  LABEL com.datadoghq.tags.service="<SERVICE>"
  LABEL com.datadoghq.tags.version="<VERSION>"
```

Or as an option to `docker run`:

`docker run ... -l com.datadoghq.tags.service=<SERVICE>`

[1]: /tracing/connect_logs_and_traces/
[2]: https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-socket-option
{{% /tab %}}

{{% tab "ECS" %}}
##### Full configuration

To achieve a single point of configuration across all telemetry, it is recommended to set up [logs injection][1] first if you plan to connect logs, traces, and metrics. Once setup is complete, make `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` available within your container's runtime environment. For instance, you can add these environment variables in one place through your ECS task definition:

```
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

"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
```

##### Partial configuration

If you do not need to set up logs injection or there are containers that will not benefit from using the environment variables in the application runtime, you can instead use Docker labels in your ECS task definition:

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

[1]: /tracing/connect_logs_and_traces/
{{% /tab %}}
{{< /tabs >}}

### Non-containerized environment

<div class="alert alert-warning">Unified service tagging for non-containerized environments is in public beta. Contact <a href="/help/">Datadog Support</a> if you have questions or feedback.</div>

Depending on how you build and deploy your services' binaries or executables, you may have several options available for setting environment variables. Since you may run one or more services per host, it is recommended that these environment variables be scoped to a single process.

To form a single point of configuration for all telemetry emitted directly from your service's runtime for [traces][10], [logs][11], and [StatsD metrics][12], you can either:

1. Export the environment variables in the command for your executable:

    `DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service`

2. Or use [Chef][13], [Ansible][14], or another orchestration tool to populate a service's systemd or initd configuration file with the `DD` environment variables. That way when the service process is started it will have access to those variables.

{{< tabs >}}
{{% tab "Traces" %}}

As a best practice, it is recommended to configure the [APM tracer][1] with `DD_ENV` as it keeps the definition of `env` closer to the application that is generating the traces. This method allows the `env` tag to be sourced automatically from a tag in the span metadata.

When spans are configured with `DD_VERSION`, the tracer will add version to all spans that fall under the service that "owns" the tracer (generally `DD_SERVICE`). This means that if your service creates spans with the name of an external service, those spans will not receive `version` as a tag. As long as version is present in spans, it will be added to trace metrics generated from those spans. The version can be added manually in-code or automatically by the tracer.

At the very least they will be used by the APM and [Dogstatsd clients][2] to tag trace data and statsd metrics with `env`, `service`, and `version`. If enabled, the APM tracer will also inject the values of these variables into your logs.

**Note: There can only be one service per span.** Trace metrics generally have a single service as well. However, if you have a different service defined in your hosts' tags, that configured service tag will show up on all trace metrics emitted from that host.


[1]: /tracing/send_traces/
[2]: /developers/dogstatsd/
{{% /tab %}}

{{% tab "Logs" %}}

If you're using [connected logs and traces][1], it is recommended to enable automatic logs injection if supported for your APM Tracer. The APM Tracer will then automatically inject `env`, `service`, and `version` into your logs, thereby eliminating manual configuration for those fields elsewhere.

**Note**: The Java, Ruby, and PHP Tracer do not currently support configuration of unified service tagging for logs.

[1]: /tracing/connect_logs_and_traces/
{{% /tab %}}

{{% tab "Custom Metrics" %}}

Tags are added in an append-only fashion for [custom statsd metrics][1]. For example, if you have two different values for `env`, the metrics will be tagged with both environments. There is no order in which one tag will override another of the same name.

[1]: /developers/metrics/
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/#defining-tags
[2]: /getting_started/agent
[3]: /tagging/
[4]: /tagging/assigning_tags
[5]: /getting_started/agent/#setup
[6]: /getting_started/agent/autodiscovery
[7]: /agent/docker/integrations/?tab=docker
[8]: /agent/docker/?tab=standard#optional-collection-agents
[9]: /api/
[10]: /getting_started/tracing/
[11]: /getting_started/logs/
[12]: /integrations/statsd/
[13]: https://www.chef.io/
[14]: https://www.ansible.com/
