---
"app_id": "ambassador"
"app_uuid": "eb591405-8cda-486a-8cf5-a06af769a3d7"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": "envoy.listener.downstream_cx_total"
      "metadata_path": "metadata.csv"
      "prefix": "envoy."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10010"
    "source_type_name": "Ambassador"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Ambassador"
  "sales_email": "hello@datawire.io"
  "support_email": "hello@datawire.io"
"categories":
- "cloud"
- "containers"
- "kubernetes"
- "orchestration"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/ambassador/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ambassador"
"integration_id": "ambassador"
"integration_title": "Ambassador API Gateway"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "ambassador"
"public_title": "Ambassador API Gateway"
"short_description": "Ambassador is an open source, Kubernetes-native API Gateway built on Envoy"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Ambassador is an open source, Kubernetes-native API Gateway built on Envoy"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Ambassador API Gateway"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from [Ambassador][1] in real time to:

- Visualize the performance of your microservices

- Understand the impact of new versions of your services as you use Ambassador to do a canary rollout

![snapshot][2]

## Setup

Enable DogStatsD on your Agent Daemonset, and set the following environment variable on your Ambassador pod:

```
name: STATSD_HOST
valueFrom:
  fieldRef:    
    fieldPath: status.hostIP
```

With this setup, StatsD metrics are sent to the IP of the host, which redirects traffic to the Agent port 8125.

See [Envoy statistics with StatsD][3] for more information.

You can also send tracing data from Ambassador to Datadog APM. See [Distributed Tracing with Datadog][4] for more information.

## Data Collected

### Metrics
{{< get-metrics-from-git "ambassador" >}}


### Events

The Ambassador check does not include any events.

### Service Checks

The Ambassador check does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][6].

[1]: https://www.getambassador.io
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ambassador/images/upstream-req-time.png
[3]: https://www.getambassador.io/docs/edge-stack/latest/topics/running/statistics/envoy-statsd/
[4]: https://www.getambassador.io/docs/latest/howtos/tracing-datadog/
[5]: https://github.com/DataDog/integrations-extras/blob/master/ambassador/metadata.csv
[6]: https://docs.datadoghq.com/help/

