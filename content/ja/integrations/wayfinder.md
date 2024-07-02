---
"app_id": "wayfinder"
"app_uuid": "a68bad83-ba55-4350-a913-2f98bb667bad"
"assets":
  "dashboards":
    "Wayfinder": assets/dashboards/wayfinder_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": wayfinder.workqueue.depth
      "metadata_path": metadata.csv
      "prefix": wayfinder.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10370"
    "source_type_name": wayfinder
  "logs": {}
"author":
  "homepage": "https://www.appvia.io/product/"
  "name": Appvia
  "sales_email": info@appvia.io
  "support_email": support@appvia.io
"categories":
- containers
- developer tools
- kubernetes
- モニター
- orchestration
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/wayfinder/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "wayfinder"
"integration_id": "wayfinder"
"integration_title": "Wayfinder"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "wayfinder"
"public_title": "Wayfinder"
"short_description": "Send Wayfinder metrics to Datadog"
"supported_os":
- linux
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Developer Tools"
  - "Category::Kubernetes"
  - "Category::Metrics"
  - "Category::Orchestration"
  - "Submitted Data Type::Metrics"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": Send Wayfinder metrics to Datadog
  "media":
  - "caption": Wayfinder Sample Datadog Dashboard
    "image_url": images/wayfinder-datadog-dash.png
    "media_type": image
  - "caption": Wayfinder UI
    "image_url": images/wayfinder-ui.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Wayfinder
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Wayfinder][1] is an infrastructure management platform that enables developer
self-service through a centralized configuration. This check monitors Wayfinder
key management components through the Datadog Agent.

The integration collects key metrics from the Wayfinder API server, controller,
and webhook components. These metrics should highlight issues in managed
workspaces. 

## セットアップ

Follow the instructions below to install the integration in the Wayfinder
Kubernetes management cluster.

### インストール

For containerized environments, the best way to use this integration with the
Docker Agent is to build the Agent with the Wayfinder integration installed. 

### Prerequisites:

A network policy must be configured to allow the Datadog Agent to connect to
Wayfinder components. The network policy below assumes Datadog is deployed to
the Datadog namespace and Wayfinder is deployed to the Wayfinder namespace.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: datadog-agent
  namespace: wayfinder
spec:
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: datadog
      podSelector:
        matchLabels:
          app: datadog-agent
    ports:
    - port: 9090
      protocol: TCP
  podSelector:
    matchExpressions:
    - key: name
      operator: In
      values:
      - wayfinder-controllers
      - wayfinder-apiserver
      - wayfinder-webhooks
  policyTypes:
  - Ingress
```

To build an updated version of the Agent:

1. Use the following Dockerfile:

    ```dockerfile
    FROM gcr.io/datadoghq/agent:latest

    ARG INTEGRATION_VERSION=1.0.0

    RUN agent integration install -r -t datadog-wayfinder==${INTEGRATION_VERSION}
    ```

2. Build the image and push it to your private Docker registry.

3. Upgrade the Datadog Agent container image. If you are using a Helm chart,
   modify the `agents.image` section in the `values.yaml` file to replace the
   default agent image:

    ```yaml
    agents:
      enabled: true
      image:
        tag: <NEW_TAG>
        repository: <YOUR_PRIVATE_REPOSITORY>/<AGENT_NAME>
    ```

4. Use the new `values.yaml` file to upgrade the Agent:

    ```shell
    helm upgrade -f values.yaml <RELEASE_NAME> datadog/datadog
    ```

### 構成

1. Edit the `wayfinder/conf.yaml` file, in the `conf.d/` folder at the root of
   your Agent's configuration directory to start collecting your Wayfinder data.
   See the [sample wayfinder/conf.yaml][4] for all available configuration
   options.

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `wayfinder` under the Checks
section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "wayfinder" >}}


### サービスチェック

Wayfinder does not include any service checks.

### イベント

Wayfinder does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][2].

[4]:
    https://github.com/DataDog/integrations-extras/blob/master/wayfinder/datadog_checks/wayfinder/data/conf.yaml.example
[5]:
    https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]:
    https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]:
    https://github.com/DataDog/integrations-extras/blob/master/wayfinder/metadata.csv
[8]:
    https://github.com/DataDog/integrations-extras/blob/master/wayfinder/assets/service_checks.json

[1]: https://www.appvia.io/product/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/

