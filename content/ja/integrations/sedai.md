---
"app_id": "sedai"
"app_uuid": "fa7de455-fef8-4cb2-af30-9baa50e351f2"
"assets":
  "dashboards":
    "Sedai Overview": assets/dashboards/sedai_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": sedai.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10249"
    "source_type_name": Sedai
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Sedai
  "sales_email": praveen.prakash@sedai.io
  "support_email": praveen.prakash@sedai.io
"categories":
- automation
- cloud
- cost management
- notifications
- orchestration
- provisioning
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/sedai/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "sedai"
"integration_id": "sedai"
"integration_title": "Sedai"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "sedai"
"public_title": "Sedai"
"short_description": "An autonomous platform to intelligently manage your cloud applications"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Automation"
  - "Category::Cloud"
  - "Category::Cost Management"
  - "Category::Notifications"
  - "Category::Orchestration"
  - "Category::Provisioning"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": An autonomous platform to intelligently manage your cloud applications
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Sedai
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

Sedai is an autonomous cloud platform that proactively manages production environments to prevent issues and improve availability, performance, and cloud costs. As an intelligent autopilot for SREs, Sedai independently detects, prioritizes, and analyzes monitoring data to safely and autonomously act in production without thresholds.

Enable this integration to receive notifications in Datadog about actions that Sedai autonomously executes in your production environments.

### How it Works

* **Agentless:** Seamlessly connects to your cloud accounts and automatically discovers and understands production environments.

* **Configuration-free:** Easily connects to Datadog API and intelligently identifies, prioritizes and learns metric behavior.

* **Proactive Actions:** Safely acts in production on your behalf to ensure that resources avoid availability issues and run optimally at all times.

## Setup

In Sedai:

1. Navigate to Settings > Notifications > Add Integration > Datadog Icon

   ![Add Datadog Integration][1]

2. Enter a nickname and the API key for your Datadog account. Enable and test the integration.

   ![Setup Datadog API Key][2]

3. Once the test is verified to be working, click Save.

   ![Save Working Datadog Integration][3]

4. Under Settings > Notifications, [select which notifications][4] you want to send to Datadog. 

   ![Enable Datadog Notifications][5]

## Data Collected

This integration sends events into Datadog.

## Support

For help with this integration, contact [Datadog support][6].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/DataDog_Notification_Integration.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Add_DataDog_Channel.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Add_DataDog_Channel-Working_REC.png
[4]: https://sedai.gitbook.io/sedai/sedai-user-guide/controls/notifications
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Enable_Notifications.png
[6]: https://docs.datadoghq.com/help/

