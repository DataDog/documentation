---
"app_id": "weaviate"
"app_uuid": "3bb2d803-0608-4da3-8987-e6f7feb4e481"
"assets":
  "dashboards":
    "Weaviate Overview Dashboard": assets/dashboards/overview_dashboard.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": weaviate.go.goroutines
      "metadata_path": metadata.csv
      "prefix": weaviate.
    "process_signatures":
    - weaviate
    - /bin/weaviate
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10371"
    "source_type_name": Weaviate
  "monitors":
    "node_status": assets/monitors/node_status.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- ai/ml
- data stores
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/weaviate/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "weaviate"
"integration_id": "weaviate"
"integration_title": "Weaviate"
"integration_version": "2.3.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "weaviate"
"public_title": "Weaviate"
"short_description": "Open-source vector database for building AI-powered applications."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AI/ML"
  - "Category::Data Stores"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Open-source vector database for building AI-powered applications.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Weaviate
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Weaviate Overview Dashboard][1]

## Overview

Weaviate is an open source, AI-native vector database that helps create AI-powered applications. With Datadog's Weaviate integration, you can:

- Monitor usage statistics (such as duration of insert, delete, and maintenance operations) to identify potential storage issues, bottlenecks, and assess the impact of data modifications on system responsiveness.
- Track query latency, rate, and concurrent read/write requests to gain insight into the vector database's overall responsiveness and load handling capabilities.
- Optimize write-heavy workloads with object statistics, like the average time taken for "put" (write) operations.
- Ensure smooth and efficient data ingestion with import-related metrics that offer insights into operations like data loading process. 

This check monitors [Weaviate][2] through the Datadog Agent. For more information, see [Weaviate monitoring][3]. To learn more about Datadog's suite of AI integrations, see this [blog][4].

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][5] for guidance on applying these instructions.

### Installation

Starting from Agent release 7.47.0, the Weaviate check is included in the [Datadog Agent][3] package. 

**Note**: This check requires Agent v7.47.0 or later.

### Configuration

Weaviate can be configured to expose Prometheus-formatted metrics. The Datadog Agent can collect these metrics using the integration described below. Follow the instructions to configure data collection for your Weaviate instances. For the required configurations to expose the Prometheus metrics, see the [Monitoring][6] page in the Weaviate documentation.

In addition, a small subset of metrics can be collected by communicating with different [API endpoints][7]. Specifically:
- `/v1/meta`: Version information
- `/v1/nodes`: Node-specific metrics such as objects and shards
- `/v1/.well-known/live`: HTTP response time and service liveness

**Note**: This check uses [OpenMetrics][8] for metric collection, which requires Python 3.

#### Containerized
##### Metric collection

Make sure that the Prometheus-formatted metrics are exposed in your Weaviate cluster. You can configure and customize this by following the instructions on the [Monitoring][6] page in the Weaviate documentation. For the Agent to start collecting metrics, the Weaviate pods need to be annotated. For more information about annotations, refer to the [Autodiscovery Integration Templates][5] for guidance. You can find additional configuration options by reviewing the [sample weaviate.d/conf.yaml][9]

**Note**: The listed metrics can only be collected if they are available. Some metrics are generated only when certain actions are performed. For example, the object deletion metric is exposed only when an object is deleted.

The two most important parameters for configuring the Weaviate check are as follows:
- `openmetrics_endpoint`: This parameter should be set to the location where the Prometheus-formatted metrics are exposed. The default port is `2112`, but it can be configured using the `PROMETHEUS_MONITORING_PORT` [environment variable][6]. In containerized environments, `%%host%%` should be used for [host autodetection][5]. 
- `weaviate_api_endpoint`: This parameter is optional. By default, this parameter is set to `<hostname>:8080` and it specifies the configuration of the [RESTful API][7].

If authentication is required for the RESTful API endpoints, the check can be configured to provide an API key as part of the [request header][10].


```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/weaviate.checks: |
      {
        "weaviate": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:2112/metrics",
              "weaviate_api_endpoint": "http://%%host%%:8080",
              "headers": {'Authorization': 'Bearer if_needed_for_auth'}
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'weaviate'
# (...)
```

**Note**: You can set these annotations directly in your [Weaviate Helm chart][11] using `annotations` key.

### Validation

[Run the Agent's status subcommand][12] and look for `weaviate` under the Checks section.

## 収集データ

### Metrics
{{< get-metrics-from-git "weaviate" >}}


### Events

The Weaviate integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "weaviate" >}}


## Troubleshooting

Need help? Contact [Datadog support][15].

## Further Reading

Additional helpful documentation, links, and articles:

- [Integration roundup: Monitoring your AI stack][4]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/weaviate/images/weaviate_dashboard.png
[2]: https://weaviate.io/developers/weaviate
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://www.datadoghq.com/blog/ai-integrations/
[5]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[6]: https://weaviate.io/developers/weaviate/configuration/monitoring
[7]: https://weaviate.io/developers/weaviate/api/rest
[8]: https://docs.datadoghq.com/integrations/openmetrics/
[9]: https://github.com/DataDog/integrations-core/blob/master/weaviate/datadog_checks/weaviate/data/conf.yaml.example
[10]: https://github.com/DataDog/integrations-core/blob/7.46.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L544-L546
[11]: https://github.com/weaviate/weaviate-helm/blob/576f613bad3f8e25015c61a7143800123ab378d3/weaviate/values.yaml#L1196
[12]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-core/blob/master/weaviate/metadata.csv
[14]: https://github.com/DataDog/integrations-core/blob/master/weaviate/assets/service_checks.json
[15]: https://docs.datadoghq.com/help/

