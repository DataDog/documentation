---
"app_id": "elastic-cloud"
"app_uuid": "f00a0b0b-b25f-4b9b-af4d-dda28f33609a"
"assets":
  "dashboards":
    "elastic_cloud": assets/dashboards/elastic_cloud_overview.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": elastic_cloud.docs.count
      "metadata_path": metadata.csv
      "prefix": elastic_cloud.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10315"
    "source_type_name": Elastic Cloud
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- metrics
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "elastic_cloud"
"integration_id": "elastic-cloud"
"integration_title": "Elastic Cloud"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "elastic_cloud"
"public_title": "Elastic Cloud"
"short_description": "Metrics monitoring for Elasticsearch services hosted by Elastic Cloud."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Metrics"
  "configuration": "README.md#Setup"
  "description": Metrics monitoring for Elasticsearch services hosted by Elastic Cloud.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Troubleshooting"
  "title": Elastic Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Integrate with Elastic Cloud to stay up to date with your hosted Elasticsearch services.

The integration provides metrics for your Elastic Cloud services, including the following:

- Cluster statistics
- Cluster health
- Node and index statistics
- Resource utilization metrics

## Setup

### Installation

No installation steps required.

### Configuration

#### Metric collection

Create a read-only Elastic Cloud user for your deployment and enter the user credentials in the [Elastic Cloud
integration tile](https://app.datadoghq.com/account/settings#integrations/elastic-cloud).

1. Access all your [Elastic Cloud deployments][1].
2. Select your deployment name.
3. Click **Manage permissions** under **Management**.
4. Under the **Roles** tab, create a role by clicking **Create role**.
    1. Enter **Datadog-Role** in **Role name**.
    2. Enter **monitor, read_slm** in **Elasticsearch Cluster privileges**.
    3. Under **Indices**, enter the indices you want metrics for.
    4. In **privileges**, enter **monitor**.
    5. Click **Create role**.
5. Select the **Users** tab.
    1. Click **Create user**.
    2. Fill out the form with a username, email, and password.
    3. Under **Privileges**, select **Datadog-Role** in the **Roles** drop-down.
    4. Click **create user**.

Get your Elastic Cloud deployment URL with the following steps:
1. Access all your [Elastic Cloud deployments][1].
2. Select your deployment.
3. Find **Elasticsearch** under **Applications**.
4. Click **Copy Endpoint** to copy the deployment URL

By default, the integration will collect statistics for nodes in your clusters, such as the number of nodes or number of
docs in each node.

The following are configurable flags you can set on the integration tile to receive specific metrics:

Primary shard stats
: Metrics for only the cluster's primary shards.

Primary shard graceful timeout
: Metrics for cluster primary shards can get very large, so there is a chance the request may time out. Enable this
flag to continue collecting all other metrics despite the time-out.

Detailed index stats
: Enable to obtain index-specific primary shard stats.

Pending tasks stats
: Metrics for cluster-level changes that have not yet been executed.

Shard allocation stats
: Metrics for the number of shards allocated to each data node and their disk space.

Snapshot life cycle management stats
: Metrics about actions taken by snapshot lifecycle management.

Index stats
: Enable to collect metrics for individual indices.

### IP Traffic Filter

Elastic Cloud allows traffic filtering, either by IP address or CIDR block, as a security layer. It limits how
deployments can be accessed.
Certain IP address prefixes must be permitted for Datadog to retrieve metrics from the deployment.

Follow these [steps][2] to create a traffic filter rule set. After creating the rule set, associate the rule
set with your deployment.

To include the Datadog IP prefixes:

1. Find the Datadog IP ranges [here][3].
2. Enter each prefix under **webhooks** into the traffic rule set as a **source**.

## Data Collected

### Metrics
{{< get-metrics-from-git "elastic_cloud" >}}


### Logs

The Elastic Cloud integration does not include any logs.

### Events

The Elastic Cloud integration does not include any events.

### Service Checks

The Elastic Cloud integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].






[1]: https://cloud.elastic.co/deployments
[2]: https://www.elastic.co/guide/en/cloud-enterprise/current/ece-traffic-filtering-ip.html
[3]: https://docs.datadoghq.com/api/latest/ip-ranges/
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/elastic_cloud/metadata.csv
[5]: https://docs.datadoghq.com/help

