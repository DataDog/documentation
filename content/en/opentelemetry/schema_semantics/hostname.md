---
title: Mapping OpenTelemetry Semantic Conventions to Hostnames
kind: documentation
further_reading:
- link: "/opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry Support in Datadog"
---

## Overview

OpenTelemetry defines certain semantic conventions related to host names. If an OTLP payload for any signal type has known hostname attributes, Datadog honors these conventions and tries to use its value as a hostname. The default hostname resolution algorithm is built with compatibility with the rest of Datadog products in mind, but you can override it if needed.

This algorithm is used in the [Datadog exporter][3] as well as the [OTLP ingest pipeline in the Datadog Agent][2]. When using the [recommended configuration][6] for the Datadog exporter, the resource detection processor adds the necessary attributes to the payload to ensure accurate hostname resolution.

## Conventions used to determine the hostname

Conventions are checked in the following order, and the first valid hostname is used. If no valid conventions are present, the fallback hostname logic is used. This fallback logic varies by product.

1. Check the general `host` and `datadog.host.name` Datadog-specific conventions.
1. Cloud provider-specific conventions for AWS, Azure and GCP.
1. Kubernetes-specific conventions.
1. Fall back to `host.id` and `host.name` if no specific conventions are found.

The following sections explain each set of specific conventions in detail.

### General hostname semantic conventions

The `host` and `datadog.host.name` conventions are Datadog-specific conventions. They are considered first and can be used to override the hostname detected using the usual OpenTelemetry semantic conventions. We recommend using the `datadog.host.name` convention since it is namespaced and it is less likely to conflict with other vendor-specific behavior.

When using the OpenTelemetry Collector, you can use the `transform` processor to set the `datadog.host.name` convention in your pipelines. For example, to change set the hostname as `my-custom-hostname` in all metrics, traces and logs on a given pipeline, you can use the following configuration:

```yaml
transform:
      metric_statements: &statements
        - context: resource
          statements:
            - set(attributes["datadog.host.name"], "my-custom-hostname")
      trace_statements: *statements # Use the same statements as in metrics
      log_statements:   *statements # Use the same statements as in metrics
```

Don't forget to add the `transform` processor to your pipelines.

### Cloud provider-specific conventions

The `cloud.provider` attribute is used to determine the cloud provider. Further attributes are used to determine the hostname for each specific platform. If `cloud.provider` or any of the attributes are missing, the next set of conventions is checked.

#### AWS

These conventions are checked if `cloud.provider` has the value `aws`:

1. Check `aws.ecs.launchtype` to determine if we are running on ECS Fargate. If so, since this is a serverless environment, use `aws.ecs.task.arn` as the identifier with tag name `task_arn`.
1. Use `host.id` as the hostname otherwise. This will match the EC2 instance id.

#### GCP

These conventions are checked if `cloud.provider` has the value `gcp`:

1. Check that both `host.name` and `cloud.account.id` are available and have the expected format, remove the prefix from `host.name` and merge both into a hostname.

#### Azure

These conventions are checked if `cloud.provider` has the value `azure`:

1. Use `host.id` as the hostname if it is available and has the expected format, fall back to `host.name` otherwise.

### Kubernetes-specific conventions

If `k8s.node.name` and `k8s.cluster.name` are available, the hostname is set to `<node name>-<cluster name>`. If only `k8s.node.name` is available, the hostname is set to the node name.

## Fallback hostname logic

If no valid host names are found, the behavior varies depending on the ingestion path. 

{{< tabs >}}
{{% tab "Datadog exporter" %}}

The fallback hostname logic is used. This logic generates a hostname for the machine where 
the Datadog exporter is running which is compatible with the rest of Datadog products.
You can use the `hostname` setting to set a fallback hostname.

This may lead to incorrect hostnames in [gateway deployments][5]. To avoid this, use the `resource detection` processor in your pipelines to ensure accurate hostname resolution.

{{% /tab %}}
{{% tab "OTLP ingest pipeline in the Datadog Agent" %}}

The Datadog Agent hostname is used. See [How does Datadog determine the Agent hostname?][4] for more information.

{{% /tab %}}
{{< /tabs >}}

## Invalid hostnames

The following host names are deemed invalid and discarded:
1. `0.0.0.0`
1. `127.0.0.1`
1. `localhost`
1. `localhost.localdomain`
1. `localhost6.localdomain6`
1. `ip6-localhost`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#resource-detection-processor
[2]: /opentelemetry/interoperability/otlp_ingest_in_the_agent
[3]: /opentelemetry/collector_exporter/otel_collector_datadog_exporter
[4]: /agent/faq/how-datadog-agent-determines-the-hostname/
[5]: https://opentelemetry.io/docs/collector/deployment/gateway/
[6]: /opentelemetry/collector_exporter/hostname_tagging/?tab=host
