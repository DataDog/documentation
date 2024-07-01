---
"app_id": "confluent-cloud"
"app_uuid": "406c781b-842d-4e0c-84dc-4b13b8e93fb6"
"assets":
  "dashboards":
    "confluent-cloud": assets/dashboards/confluent_cloud_overview.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - confluent_cloud.kafka.received_bytes
      - confluent_cloud.connect.sent_records
      - confluent_cloud.ksql.streaming_unit_count
      - confluent_cloud.schema_registry.schema_count
      "metadata_path": metadata.csv
      "prefix": confluent_cloud.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "609"
    "source_type_name": Confluent Cloud
  "monitors":
    "[Confluent Cloud] Mirror topic lag is increasing": assets/monitors/cluster_link_lag_rate_change_percent.json
    "[Confluent Cloud] Topic lag is Increasing": assets/monitors/consumer_lag_monitor_rate_change_percent.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- cost management
- metrics
- message queues
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "confluent_cloud"
"integration_id": "confluent-cloud"
"integration_title": "Confluent Cloud"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "confluent_cloud"
"public_title": "Confluent Cloud"
"short_description": "Collect various Kafka metrics and related cost data from Confluent Cloud."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cost Management"
  - "Category::Metrics"
  - "Category::Message Queues"
  "configuration": "README.md#Setup"
  "description": Collect various Kafka metrics and related cost data from Confluent Cloud.
  "media":
  - "caption": Confluent Cloud Dashboard Overview
    "image_url": images/confluent_dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": other
    "url": "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_account"
  - "resource_type": other
    "url": "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_resource"
  "support": "README.md#Support"
  "title": Confluent Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview


{{< site-region region="gov" >}}
**The Confluent Cloud integration is not supported for the Datadog {{< region-param key="dd_site_name" >}} site**.
{{< /site-region >}}


Confluent Cloud is a fully managed, cloud-hosted streaming data service. Connect Datadog with Confluent Cloud to visualize and alert on key metrics for your Confluent Cloud resources.

Datadog's out-of-the-box Confluent Cloud dashboard shows you key cluster metrics for monitoring the health and performance of your environment, including information such as the rate of change in active connections and your ratio of average consumed to produced records.

You can use recommended monitors to notify and alert your team when topic lag is getting too high, or use these metrics to create your own.

If you would benefit from visualizing the topology of your streaming data pipelines, or from investigating localized bottlenecks within your data streams setup, check out [Data Streams Monitoring][1].

## Setup

### Installation

Install the integration with the [Datadog Confluent Cloud integration tile][2].

### Configuration

1. In the integration tile, navigate to the **Configuration** tab.
2. Click **+ Add API Key** to enter your [Confluent Cloud API Key and API Secret](#api-key-and-secret).
3. Click **Save**. Datadog searches for accounts associated with those credentials.
4. Add your Confluent Cloud [Cluster ID](#cluster-id) or [Connector ID](#connector-id). Datadog crawls the Confluent Cloud metrics and loads metrics within minutes.
5. If you use Cloud Cost Management and enable collecting cost data
   - Please ensure that the API key has the [BillingAdmin role][3] enabled.
   - It will be visible in [Cloud Cost Management][4] within 24 hours. ([collected data][5])

#### API Key and secret

To create your Confluent Cloud API Key and Secret, see [Add the MetricsViewer role to a new service account in the UI][6].

#### Cluster ID

To find your Confluent Cloud Cluster ID:

1. In Confluent Cloud, navigate to **Environment Overview** and select the cluster you want to monitor.
2. In the left-hand navigation, click **Cluster overview** > **Cluster settings**.
3. Under **Identification**, copy the Cluster ID beginning with `lkc`.

#### Connector ID

To find your Confluent Cloud Connector ID:

1. In Confluent Cloud, navigate to **Environment Overview** and select the cluster you want to monitor.
2. In the left-hand navigation, click **Data integration** > **Connectors**.
3. Under **Connectors**, copy the Connector ID beginning with `lcc`.

## Dashboards

After configuring the integration, see the out-of-the-box Confluent Cloud dashboard for an overview of Kafka cluster and connector metrics.

By default, all metrics collected across Confluent Cloud are displayed.

## Data Collected

### Metrics
{{< get-metrics-from-git "confluent_cloud" >}}


### Events

The Confluent Cloud integration does not include any events.

### Service Checks

The Confluent Cloud integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

## Further reading

- [Create and manage Confluent accounts with Terraform][9]
- [Create and manage Confluent resources with Terraform][10]

[1]: https://www.datadoghq.com/product/data-streams-monitoring/
[2]: https://app.datadoghq.com/integrations/confluent-cloud
[3]: https://docs.confluent.io/cloud/current/access-management/access-control/rbac/predefined-rbac-roles.html#billingadmin-role
[4]: https://app.datadoghq.com/cost
[5]: https://docs.datadoghq.com/cloud_cost_management/saas_costs/?tab=confluentcloud#data-collected
[6]: https://docs.confluent.io/cloud/current/monitoring/metrics-api.html#add-the-metricsviewer-role-to-a-new-service-account-in-the-ui
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/confluent_cloud/confluent_cloud_metadata.csv
[8]: https://docs.datadoghq.com/help/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_account
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_resource

