---
"app_id": "retool"
"app_uuid": "13239057-ebc6-4cb6-a789-35f064bbcd0f"
"assets":
  "dashboards":
    "Retool + Datadog: ElasticSearch Action Console": assets/dashboards/retool_retool_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": retool
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10176"
    "source_type_name": Retool
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Retool
  "sales_email": support@retool.com
  "support_email": support@retool.com
"categories":
- developer tools
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/retool/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "retool"
"integration_id": "retool"
"integration_title": "Retool"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "retool"
"public_title": "Retool"
"short_description": "Retool is a fast way to build internal tools"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Developer Tools"
  "configuration": "README.md#Setup"
  "description": Retool is a fast way to build internal tools
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Retool
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview
Monitoring and analytics offer mission-critical insights, but developers often have to jump between separate, siloed, and often custom tools to take action on the insights-leading to inefficient or ineffective responses to those insights.

Retool helps developers create custom apps that embed directly into a Datadog dashboard, giving you the ability to take action and automate workflows without having to leave Datadog.

![Screenshot1][1]

### Metrics
Datadog's embedded Retool app for Elasticsearch Management combines existing visibility into key Elasticsearch metrics and logs with the power to manage clusters, accounts, and more without leaving your Datadog dashboard.

### Dashboards
Retool built an embedded app for Elasticsearch Management. You can already monitor Elasticsearch metrics, traces, and logs in Datadog today. With the embedded app, developers can take action on their rich Datadog insights directly in the Datadog dashboard. These actions include:

- Add a new index with shards and replicas
- Manage nodes by rerouting shards and excluding indexes
- Create new snapshots and restore indexes

## Setup
The Retool integration comes with an out-of-the-box dashboard, which allows you to sign up or log into Retool through an iframe.

You are prompted to connect to your ElasticSearch cluster with a connection string. This app is automatically added to your instance. You then need to click resources in the navbar and create a new Datadog resource (adding your api and application keys). Finally connect your Datadog resource to the two Datadog queries by selecting it from the select resource dropdown in the query editor.

Return to Datadog to see the app up and running in your dashboard. You can edit the app anytime to customize it for your DevOps workflows.

## Data Collected

### Metrics
The Retool integration does not include any metrics at this time.

### Events
The Retool integration does not include any events at this time.

### Service Checks
The Retool does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog support][2]

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/retool/images/1.png
[2]: https://docs.datadoghq.com/help/

