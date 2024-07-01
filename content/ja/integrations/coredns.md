---
"app_id": "coredns"
"app_uuid": "b613759e-89ca-4d98-a2c1-4d465c42e413"
"assets":
  "dashboards":
    "CoreDNS": assets/dashboards/coredns.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": coredns.request_count
      "metadata_path": metadata.csv
      "prefix": coredns.
    "process_signatures":
    - coredns
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10038"
    "source_type_name": CoreDNS
  "monitors":
    "[CoreDNS] Cache hits count low": assets/monitors/coredns_cache_hits_low.json
    "[CoreDNS] Request duration high": assets/monitors/coredns_request_duration_high.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- caching
- containers
- kubernetes
- log collection
- network
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/coredns/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "coredns"
"integration_id": "coredns"
"integration_title": "CoreDNS"
"integration_version": "3.2.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "coredns"
"public_title": "CoreDNS"
"short_description": "CoreDNS collects DNS metrics in Kubernetes."
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Log Collection"
  - "Category::Network"
  - "Supported OS::Linux"
  "configuration": "README.md#Setup"
  "description": CoreDNS collects DNS metrics in Kubernetes.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": CoreDNS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Get metrics from CoreDNS in real time to visualize and monitor DNS failures and cache hits or misses.

## Setup


Starting with version 1.11.0, this OpenMetrics-based integration has a latest mode (enabled by setting `openmetrics_endpoint` to point to the target endpoint) and a legacy mode (enabled by setting `prometheus_url` instead). To get all the most up-to-date features, Datadog recommends enabling the latest mode. For more information, see [Latest and Legacy Versioning For OpenMetrics-based Integrations][1].

The latest mode of the CoreDNS check requires Python 3 and submits `.bucket` metrics and submits the `.sum` and `.count` histogram samples as monotonic count type. These metrics were previously submitted as `gauge` type in the legacy mode. See the [`metadata.csv` file][2] for a list of metrics available in each mode. 

For hosts unable to use Python 3, or if you previously implemented this integration mode, see the `legacy` mode [configuration example][3]. For Autodiscovery users relying on the `coredns.d/auto_conf.yaml` file, this file enables the `prometheus_url` option for the `legacy` mode of the check by default. See the sample [coredns.d/auto_conf.yaml][4] for the default configuration options and the sample [coredns.d/conf.yaml.example][5] for all available configuration options.

### Installation

The CoreDNS check is included in the [Datadog Agent][6] package, so you don't need to install anything else on your servers.

### Configuration
{{< tabs >}}
{{% tab "Docker" %}}
#### Docker

To configure this check for an Agent running on a container:

##### Metric collection

Set [Autodiscovery Integration Templates][1] as Docker labels on your application container:

```yaml
LABEL "com.datadoghq.ad.check_names"='["coredns"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]'
```

To enable the legacy mode of this OpenMetrics-based check, replace `openmetrics_endpoint` with `prometheus_url`:

```yaml
LABEL "com.datadoghq.ad.instances"='[{"prometheus_url":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]' 
```

**Notes**:

- The shipped `coredns.d/auto_conf.yaml` file enables the `prometheus_url` option by default for legacy mode. 
- The `dns-pod` tag keeps track of the target DNS pod IP. The other tags are related to the Datadog Agent that is polling the information using the service discovery.
- The service discovery annotations need to be done on the pod. In case of a deployment, add the annotations to the metadata of the template's specifications. Do not add it at the outer specification level.

#### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Docker Log Collection][2].

Then, set [Log Integrations][3] as Docker labels:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"coredns","service":"<SERVICE_NAME>"}]'
```

[1]: http://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation
[3]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

To configure this check for an Agent running on Kubernetes:

##### Metric collection

Set [Autodiscovery Integrations Templates][1] as pod annotations on your application container. Alternatively, you can configure templates with a [file, configmap, or key-value store][2].

**Annotations v1** (for Datadog Agent < v7.36)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.check_names: '["coredns"]'
    ad.datadoghq.com/coredns.init_configs: '[{}]'
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
  labels:
    name: coredns
spec:
  containers:
    - name: coredns
```

**Annotations v2** (for Datadog Agent v7.36 or later)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.checks: |
      {
        "coredns": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:9153/metrics", 
              "tags": ["dns-pod:%%host%%"]
            }
          ]
        }
      }
  labels:
    name: coredns
spec:
  containers:
    - name: coredns
```

To enable the legacy mode of this OpenMetrics-based check, replace `openmetrics_endpoint` with `prometheus_url`:

**Annotations v1** (for Datadog Agent < v7.36)

```yaml
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
```

**Annotations v2** (for Datadog Agent v7.36 or later)

```yaml
          "instances": [
            {
              "prometheus_url": "http://%%host%%:9153/metrics", 
              "tags": ["dns-pod:%%host%%"]
            }
          ]
```

**Notes**:

- The shipped `coredns.d/auto_conf.yaml` file enables the `prometheus_url` option by default for legacy mode. 
- The `dns-pod` tag keeps track of the target DNS pod IP. The other tags are related to the Datadog Agent that is polling the information using the service discovery.
- The service discovery annotations need to be done on the pod. In case of a deployment, add the annotations to the metadata of the template's specifications. Do not add it at the outer specification level.

#### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][3].

Then, set [Log Integrations][4] as pod annotations. Alternatively, you can configure this with a [file, configmap, or key-value store][5].

**Annotations v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.logs: '[{"source": "coredns", "service": "<SERVICE_NAME>"}]'
  labels:
    name: coredns
```

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset
[4]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=kubernetes#examples---datadog-redis-integration
[5]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=file
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

To configure this check for an Agent running on ECS:

##### Metric collection

Set [Autodiscovery Integrations Templates][1] as Docker labels on your application container:

```json
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"coredns\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"openmetrics_endpoint\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
    }
  }]
}
```

To enable the legacy mode of this OpenMetrics-based check, replace `openmetrics_endpoint` with `prometheus_url`:

```json
      "com.datadoghq.ad.instances": "[{\"prometheus_url\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
```

**Notes**:

- The shipped `coredns.d/auto_conf.yaml` file enables the `prometheus_url` option by default for legacy mode. 
- The `dns-pod` tag keeps track of the target DNS pod IP. The other tags are related to the Datadog Agent that is polling the information using the service discovery.
- The service discovery annotations need to be done on the pod. In case of a deployment, add the annotations to the metadata of the template's specifications. Do not add it at the outer specification level.

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [ECS Log Collection][2].

Then, set [Log Integrations][3] as Docker labels:

```yaml
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"coredns\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```
[1]: https://docs.datadoghq.com/agent/amazon_ecs/?tab=awscli#process-collection
[2]: https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux#activate-log-integrations
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's `status` subcommand][7] and look for `coredns` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "coredns" >}}


### Events

The CoreDNS check does not include any events.

### Service Checks
{{< get-service-checks-from-git "coredns" >}}


## Troubleshooting

Need help? Contact [Datadog support][8].

## Further Reading

Additional helpful documentation, links, and articles:

- [Key metrics for CoreDNS monitoring][9]
- [Tools for collecting metrics and logs from CoreDNS][10]
- [How to monitor CoreDNS with Datadog][11]



[1]: https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations
[2]: https://github.com/DataDog/integrations-core/blob/master/coredns/metadata.csv
[3]: https://github.com/DataDog/integrations-core/blob/7.32.x/coredns/datadog_checks/coredns/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[5]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/conf.yaml.example
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: http://docs.datadoghq.com/help
[9]: https://www.datadoghq.com/blog/coredns-metrics/
[10]: https://www.datadoghq.com/blog/coredns-monitoring-tools/
[11]: https://www.datadoghq.com/blog/monitoring-coredns-with-datadog/
