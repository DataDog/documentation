---
"aliases":
- /integrations/azure_notificationhubs
"categories":
- azure
- cloud
- notifications
"custom_kind": "integration"
"dependencies": []
"description": "Track key Azure Notification Hubs metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_notification_hubs/"
"draft": false
"git_integration_title": "azure_notification_hubs"
"has_logo": true
"integration_id": "azure-notificationhubs"
"integration_title": "Microsoft Azure Notification Hubs"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_notification_hubs"
"public_title": "Datadog-Microsoft Azure Notification Hubs Integration"
"short_description": "Track key Azure Notification Hubs metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Notification Hubs provide an easy-to-use and scaled-out push engine that allows you to send notifications to any platform (iOS, Android, Windows, Kindle, Baidu, etc.) from any backend (cloud or on-premises).

Use the Datadog Azure integration to collect metrics from Azure Notification Hubs.

## Setup

### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_notification_hubs" >}}


### Events

The Azure Notification Hubs integration does not include any events.

### Service Checks

The Azure Notification Hubs integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_notification_hubs/azure_notification_hubs_metadata.csv
[3]: https://docs.datadoghq.com/help/

