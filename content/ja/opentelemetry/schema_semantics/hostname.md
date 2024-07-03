---
further_reading:
- link: /opentelemetry/
  tag: Documentation
  text: OpenTelemetry Support in Datadog
title: Mapping OpenTelemetry Semantic Conventions to Hostnames
---

## 概要

OpenTelemetry defines certain semantic conventions related to hostnames. If an OpenTelemetry Protocol (OTLP) payload for any signal type has known hostname attributes, Datadog honors these conventions and tries to use its value as a hostname. The default hostname resolution algorithm is built with compatibility with the rest of Datadog products in mind, but you can override it if needed.

This algorithm is used in the [Datadog exporter][3] as well as the [OTLP ingest pipeline in the Datadog Agent][2]. When using the [recommended configuration][4] for the Datadog exporter, the [resource detection processor][1] adds the necessary attributes to the payload to ensure accurate hostname resolution.

## Conventions used to determine the hostname

Conventions are checked in the following order, and the first valid hostname is used. If no valid conventions are present, the fallback hostname logic is used. This fallback logic varies by product.

1. Check Datadog-specific conventions: `host` and `datadog.host.name`.
1. Check cloud provider-specific conventions for AWS, Azure and GCP.
1. Check Kubernetes-specific conventions.
1. If no specific conventions are found, fall back to `host.id` and `host.name`.

The following sections explain each set of conventions in more detail.

### General hostname semantic conventions

The `host` and `datadog.host.name` conventions are Datadog-specific conventions. They are considered first and can be used to override the hostname detected using the usual OpenTelemetry semantic conventions. Prefer using the `datadog.host.name` convention since it is namespaced, and it is less likely to conflict with other vendor-specific behavior.

When using the OpenTelemetry Collector, you can use the `transform` processor to set the `datadog.host.name` convention in your pipelines. For example, to set the hostname as `my-custom-hostname` in all metrics, traces, and logs on a given pipeline, use the following configuration:

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

#### アマゾン ウェブ サービス (AWS)

If `cloud.provider` has the value `aws`, the following conventions are checked:

1. Check `aws.ecs.launchtype` to determine if the payload comes from an ECS Fargate task. If so, use `aws.ecs.task.arn` as the identifier with tag name `task_arn`.
1. Otherwise, use `host.id` as the hostname. This matches the EC2 instance id.

#### Google Cloud

If `cloud.provider` has the value `gcp`, the following conventions are checked:

1. Check that both `host.name` and `cloud.account.id` are available and have the expected format, remove the prefix from `host.name`, and merge both into a hostname.

#### Azure

If `cloud.provider` has the value `azure`, the following conventions are checked:

1. Use `host.id` as the hostname if it is available and has the expected format.
1. Otherwise, fall back to `host.name`.

### Kubernetes-specific conventions

If `k8s.node.name` and the cluster name are available, the hostname is set to `<node name>-<cluster name>`. If only `k8s.node.name` is available, the hostname is set to the node name.

To get the cluster name, the following conventions are checked:

1. Check `k8s.cluster.name` and use it if present.
2. If `cloud.provider` is set to `azure`, extract the cluster name from `azure.resourcegroup.name`.
3. If `cloud.provider` is set to `aws`, extract the cluster name from the first attribute starting with `ec2.tag.kubernetes.io/cluster/`.

### `host.id` and `host.name`

If none of the above conventions are present, the `host.id` and `host.name` attributes are used as-is to determine the hostname. 

**Note:** The OpenTelemetry specification allows `host.id` and `host.name` to have values that may not match those used by other Datadog products in a given environment. If using multiple Datadog products to monitor the same host, you may have to override the hostname using `datadog.host.name` to ensure consistency.

## Fallback hostname logic

If no valid host names are found, the behavior varies depending on the ingestion path. 

{{< tabs >}}
{{% tab "Datadog Exporter" %}}

The fallback hostname logic is used. This logic generates a hostname for the machine where 
the Datadog Exporter is running, which is compatible with the rest of Datadog products, by checking the following sources:

1. Datadog Exporter の構成にある `hostname` フィールド。
1. クラウドプロバイダー API。
1. Kubernetes のホスト名。
1. 完全修飾ドメイン名。
1. オペレーティングシステムのホスト名。

This may lead to incorrect hostnames in [gateway deployments][1]. To avoid this, use the `resource detection` processor in your pipelines to ensure accurate hostname resolution.

[1]: https://opentelemetry.io/docs/collector/deployment/gateway/
{{% /tab %}}
{{% tab "OTLP ingest pipeline in the Datadog Agent" %}}

The Datadog Agent hostname is used. See [How does Datadog determine the Agent hostname?][1] for more information.

[1]: /ja/agent/faq/how-datadog-agent-determines-the-hostname/
{{% /tab %}}
{{< /tabs >}}

## Invalid hostnames

以下のホスト名は無効とみなされ、破棄されます。
- `0.0.0.0`
- `127.0.0.1`
- `localhost`
- `localhost.localdomain`
- `localhost6.localdomain6`
- `ip6-localhost`

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#resource-detection-processor
[2]: /ja/opentelemetry/interoperability/otlp_ingest_in_the_agent
[3]: /ja/opentelemetry/collector_exporter/otel_collector_datadog_exporter
[4]: /ja/opentelemetry/collector_exporter/hostname_tagging/?tab=host