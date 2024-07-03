---
app_id: akeyless-gateway
app_uuid: a71a3b29-5921-4bc9-8a7e-38de5a940ad8
assets:
  dashboards:
    akeyless_gateway_dashboard: assets/dashboards/akeyless_gateway_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - akeyless.gw.system.cpu
      - akeyless.gw.system.disk
      - akeyless.gw.system.load
      - akeyless.gw.system.memory
      - akeyless.gw.system.network
      - akeyless.gw.quota.current_transactions_number
      - akeyless.gw.quota.gw_admin_client_transactions
      - akeyless.gw.quota.total_transactions_limit
      - akeyless.gw.system.http_response_status_code
      - akeyless.gw.system.request_count
      - akeyless.gw.system.healthcheck.status
      metadata_path: metadata.csv
      prefix: akeyless
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10426
    source_type_name: Akeyless Gateway
author:
  homepage: https://www.akeyless.io
  name: Akeyless Security
  sales_email: sales@akeyless.io
  support_email: support@akeyless.io
categories:
- security
- kubernetes
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/akeyless_gateway/README.md
display_on_public_website: true
draft: false
git_integration_title: akeyless_gateway
integration_id: akeyless-gateway
integration_title: Akeyless Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akeyless_gateway
public_title: Akeyless Gateway
short_description: Track your Akeyless Gateway key metrics.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Security
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Track your Akeyless Gateway key metrics.
  media:
  - caption: Akeyless Gateway metrics dashboard
    image_url: images/AKs-Graphs-Light.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Akeyless Gateway
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

The Akeyless Platform is a unified secrets management system that enables you to store, protect, rotate, and dynamically create credentials, certificates, and encryption keys. Our platform supports several use cases, including managing static and dynamic credentials, certificate automation, encryption and digital signing, and zero-trust application access that secures remote access to your internal resources.

This integration allows you to visualize and monitor performance of your [Akeyless Gateway][1]. Telemetry metrics are sourced from the application and the runtime environment.

## Setup

Akeyless offers a unique Gateway which adds an extra level of protection between your private network and the cloud. Acting as a SaaS extension of our core services, our stateless Gateway enables a transparent internal operation with a robust out-of-the-box mechanism to ensure service continuity and recovery without having to change any network infrastructure in order to work with your internal resources.

To configure the integration with Datadog to view important Akeyless Gateway metrics, follow the instructions below for the method you are using (or have used) for your Gateway deployment.

### Prerequisites
- An Akeyless Gateway either running or being deployed for the first time

### Configure

This integration works with one Gateway or multiple instances using the same API key. Metrics can be shown per `host` or `instance` in the **Akeyless GW** dashboard.

#### For a Gateway running on Kubernetes

To configure the Akeyless Gateway integration on a [Gateway running on K8s][2]:

1. In your `values.yaml` file you use to deploy your Gateway on Kubernetes, under the `metrics` section, add the following configuration. Set the relevant API Key of your Datadog server, and the relevant [Datadog site][3] such as: `app.datadoghq.com`.

```
metrics:
  enabled: true  
  config: |
    exporters:    
      datadog:
        api:
          key: "<Your Datadog API key>"
          site: <Your Datadog server site>         
    service:
      pipelines:
        metrics:
          exporters: [datadog]
```

2. If you have not yet deployed the Gateway, continue with your installation as usual and run the following command when you are ready to deploy:

```
helm install <your-gateway-name> akeyless/akeyless-api-gateway -f values.yaml
```

3. If you are updating an existing Gateway on Kubernetes, run the following commands to update:

```
helm upgrade <your-gateway-name> akeyless/akeyless-api-gateway -f values.yaml
```

#### For a standalone Gateway running on Docker

To configure the Akeyless Gateway integration on a [Standalone Gateway][4]:

1. Create a local file called `otel-config.yaml` with the following configuration. Set the relevant API Key of your Datadog server, and the relevant [Datadog site][3] such as `app.datadoghq.com`.

```
exporters:
  datadog:
    api:
      key: "<Your Datadog API key>"
      site: <Your Datadog server site>
service:
  pipelines:
    metrics:
      exporters: [datadog]
```

2. If you have not yet deployed the Gateway, run the following command to spin up your Akeyless Gateway with the `ENABLE_METRICS=true` variable and mount the `otel-config.yaml` file:

```
docker run -d -p 8000:8000 -p 8200:8200 -p 18888:18888 -p 8080:8080 -p 8081:8081 -p 5696:5696 -e ENABLE_METRICS="true" -v $PWD/otel-config.yaml:/akeyless/otel-config.yaml --name <your-gateway-name> akeyless/base:latest-akeyless
```
3. If you are updating an existing Gateway, use the same `Admin Access ID` and `Cluster Name` for the updated Gateway in order to retrieve the latest settings and data from the previously removed Docker instance:

```
docker run -d -p 8000:8000 -p 8200:8200 -p 18888:18888 -p 8080:8080 -p 8081:8081 -p 5696:5696 -e ADMIN_ACCESS_ID="p-xxxxxx" -e ADMIN_ACCESS_KEY="62Hu...xxx....qlg=" -e ENABLE_METRICS="true" -v $PWD/otel-config.yaml:/akeyless/otel-config.yaml --name <your-gateway-name> akeyless/base:latest-akeyless
```

### Validation

Upon successful setup of the Gateway, go to the [Metrics Explorer][5] on the Datadog site, and filter the Akeyless metrics on the summary page.

## 収集データ

### Metrics
{{< get-metrics-from-git "akeyless_gateway" >}}


### Service Checks

The Akeyless Gateway integration does not include any service checks.

### Events

The Akeyless Gateway integration does not include any events.

## Support

Need help? Contact [Akeyless Support][7].


[1]: https://docs.akeyless.io/docs/api-gw
[2]: https://docs.akeyless.io/docs/gateway-k8s
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://docs.akeyless.io/docs/install-and-configure-the-gateway
[5]: https://app.datadoghq.com/metric/explorer
[6]: https://github.com/DataDog/integrations-extras/blob/master/akeyless_gateway/metadata.csv
[7]: mailto:support@akeyless.io