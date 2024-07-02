---
"app_id": "purefb"
"app_uuid": "50ae3c61-a87d-44ee-9917-df981184ff8a"
"assets":
  "dashboards":
    "purefb_overview": assets/dashboards/purefb_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": purefb.info
      "metadata_path": metadata.csv
      "prefix": purefb.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10269"
    "source_type_name": PureFB
"author":
  "homepage": "https://purestorage.com"
  "name": Pure Storage
  "sales_email": sales@purestorage.com
  "support_email": pure-observability@purestorage.com
"categories":
- data stores
- os & system
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/purefb/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "purefb"
"integration_id": "purefb"
"integration_title": "Pure Storage FlashBlade"
"integration_version": "1.0.4"
"is_public": true
"manifest_version": "2.0.0"
"name": "purefb"
"public_title": "Pure Storage FlashBlade"
"short_description": "Monitor the performance and utilization of Pure Storage FlashBlade"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Data Stores"
  - "Category::OS & System"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor the performance and utilization of Pure Storage FlashBlade
  "media":
  - "caption": Pure Storage FlashBlade Dashboard - Overview (Top)
    "image_url": images/FB-overview-1.png
    "media_type": image
  - "caption": Pure Storage FlashBlade Dashboard - Overview (Middle)
    "image_url": images/FB-overview-2.png
    "media_type": image
  - "caption": Pure Storage FlashBlade Dashboard - Overview (Bottom)
    "image_url": images/FB-overview-3.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Pure Storage FlashBlade
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors the [Pure Storage FlashBlade][1] through the [Datadog Agent][2] and the [Pure Storage FlashBlade OpenMetrics exporter][3]. 

The integration can provide performance data at the array, client, share, and bucket level, as well as high-level capacity and configuration information.

You can monitor multiple FlashBlades and aggregate these into a single dashboard, or group them together by customer-defined environment.

**This integration requires the following**:

 - FlashBlade Purity 3.2.x+
 - Datadog Agent v7.26.x+ to use OpenMetricsBaseCheckV2
 - Python 3
 - The Pure Storage FlashBlade OpenMetrics exporter is installed and running in a containerized environment. Refer to the [Pure Storage GitHub repo][3] for installation instructions.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][4] for guidance on applying these instructions.

### インストール

1. [Download and launch the Datadog Agent][2].
2. Manually install the Pure FlashBlade integration. See [Use Community Integrations][5] for more details based on your environment.


#### ホスト

To configure this check for an Agent running on a host, run `datadog-agent integration install -t datadog-purefb==1.0.4`.


### 構成

1. Create a user on your FlashBlade with the Read-Only role and generate an API token for this user.

2. Add the following configuration block to the `purefb.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory, to start collecting your PureFB performance data. See the sample [purefb.d/conf.yaml][6] for all available configuration options.

**Note**: The `/array` endpoint is required as an absolute minimum when creating your configuration file.

```yaml
init_config:
   timeout: 120

instances:

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/array?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/clients?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 600

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/usage?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 600

```

2. [Restart the Agent][7].

### Validation

[Run the Agent's status subcommand][8] and look for `purefb` under the Checks section.

### トラブルシューティング

#### Arrays are not showing in dashboard

The dashboards included in this integration use the tags `env`, `host`, and `fb_array_name`. Make sure that these are set per instance.

```yaml
 tags:
    - env:<env>
    - fb_array_name:<full_fqdn>
    - host:<full_fqdn>
```

#### Increasing collection interval

For the `/array` endpoint, the Pure Storage FlashBlade check sets `min_collection_interval` to `120` by default, and the minimum recommended value is `15`. You may increase or decrease `min_collection_interval` in the `purefb.d/conf.yaml` file if necessary:

```yaml
min_collection_interval: 120
```

For the `/clients`, and `/usage` endpoints, the Pure Storage FlashBlade check sets `min_collection_interval` to `600` by default , and the minimum recommended value is `120`. You may increase or decrease `min_collection_interval` in the `purefb.d/conf.yaml` file if necessary:

```yaml
min_collection_interval: 600
```


## 収集データ

### メトリクス
{{< get-metrics-from-git "purefb" >}}


### イベント

The PureFB integration does not include any events.

### サービスチェック

See [service_checks.json][10] for a list of service checks provided by this integration.

## Support

For support or feature requests, contact Pure Storage through the following methods:
* Email: pure-observability@purestorage.com
* Slack: [Pure Storage Code// Observability Channel][11].

[1]: https://www.purestorage.com/products.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/PureStorage-OpenConnect/pure-fb-openmetrics-exporter
[4]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[5]: https://docs.datadoghq.com/agent/guide/community-integrations-installation-with-docker-agent
[6]: https://github.com/DataDog/integrations-extras/blob/master/purefb/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/purefb/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/purefb/assets/service_checks.json
[11]: https://code-purestorage.slack.com/messages/C0357KLR1EU

