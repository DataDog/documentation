---
"categories":
- cloud
- log collection
- log collection
- network
- security
"custom_kind": "integration"
"dependencies": []
"description": "CrowdStrike"
"doc_link": "https://docs.datadoghq.com/integrations/crowdstrike/"
"draft": false
"git_integration_title": "crowdstrike"
"has_logo": true
"integration_id": ""
"integration_title": "CrowdStrike"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "crowdstrike"
"public_title": "CrowdStrike"
"short_description": "Collect real-time CrowdStrike detection events and alerts as Datadog logs."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

[CrowdStrike][1] is a single agent solution to stop breaches, ransomware, and cyber attacks with comprehensive visibility and protection across endpoints, workloads, data, and identity. 

The CrowdStrike integration allows you to collect real-time CrowdStrike detection events and alerts as Datadog logs.

## Setup

### Installation

No installation is required.

### Configuration

#### Enabling event streaming

Before you can connect to the [Event Stream][2], [contact the CrowdStrike support team][3] to enable the streaming of APIs on your customer account.

#### Connecting your CrowdStrike Account

Once streaming is enabled, add a new API client in CrowdStrike:

1. Sign in to the Falcon console.
1. Go to [Support > API Clients and Keys][4].
1. Click **Add new API client**.
1. Enter a descriptive client name that identifies your API client in Falcon and in API action logs (for example, `Datadog`).
1. Optionally, enter a description such as your API client's intended use.
1. Select **Read** access for all API scopes.
1. Click **Add**.

#### Enabling log collection

Add the API client details on the [CrowdStrike integration tile][5] in Datadog:

1. Click **Connect a CrowdStrike Account**.
1. Copy over your API client ID, client secret, and API domain.
1. Optionally, enter a list of tags separated by comma.
1. Click **Submit**.

After a few minutes, [logs][6] with the source `crowdstrike` appear on the [Crowdstrike Log Overview dashboard][7].

## Data Collected

### Metrics

The CrowdStrike integration does not include any metrics.

### Events

The CrowdStrike integration allows Datadog to ingest the following events:

* Detection Summary
* Firewall Match
* Identity Protection
* Idp Detection Summary
* Incident Summary
* Authentication Events
* Detection Status Updates
* Uploaded IoCs
* Network Containment Events
* IP Allowlisting Events
* Policy Management Events
* CrowdStrike Store Activity
* Real Time Response Session Start/End
* Event stream start/stop

These events appear on the [Crowdstrike Log Overview dashboard][7].

### Service Checks

The CrowdStrike integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://www.crowdstrike.com/
[2]: https://docs.datadoghq.com/service_management/events/explorer/
[3]: https://supportportal.crowdstrike.com/
[4]: https://falcon.crowdstrike.com/support/api-clients-and-keys
[5]: https://app.datadoghq.com/integrations/crowdstrike
[6]: /logs/
[7]: https://app.datadoghq.com/dash/integration/32115/crowdstrike-overview
[8]: https://docs.datadoghq.com/help/

