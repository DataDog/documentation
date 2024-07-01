---
"categories":
- "network"
- "metrics"
- "oracle"
"custom_kind": "integration"
"dependencies": []
"description": "Monitor zone changes and track queries per second by zone or record."
"doc_link": "https://docs.datadoghq.com/integrations/dyn/"
"draft": false
"git_integration_title": "dyn"
"has_logo": true
"integration_id": ""
"integration_title": "Dyn"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "dyn"
"public_title": "Datadog-Dyn Integration"
"short_description": "Monitor zone changes and track queries per second by zone or record."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/dyn/dyn_overview.png" alt="Dyn Overview" popup="true">}}

## Overview

<div class="alert alert-warning">
Oracle Cloud Infrastructure acquired Dyn in 2016 and integrated Dyn's products and services into the Oracle Cloud Infrastructure platform. See <a href="https://www.oracle.com/corporate/acquisitions/dyn/technologies/migrate-your-services/" target="_blank">Migrating Dyn Services to Oracle Cloud Infrastructure</a> for information about migrating your services.
</div>

Monitor your zones with advanced graphs and events.

- Keep track of the changes made when a zone is updated.
- Analyze the QPS made by zone or record type thanks to advanced graphing tools.

## Setup

### Configuration

If you have not created a `datadog` read-only user on Dyn yet, [log in to Dyn][1] and follow these instructions:

1. Choose a username and a password:
   {{< img src="integrations/dyn/create_dyn_user.png" alt="Create dyn user" style="width:75%;" popup="true">}}

2. Select the **READONLY** user group:
   {{< img src="integrations/dyn/choose_dyn_group.png" alt="Choose dyn group" style="width:75%;" popup="true">}}

3. Click on **Add New User**.

Once you have created a Datadog read-only user:

1. Configure the Datadog [Dyn integration][2] using the integration tile:
   {{< img src="integrations/dyn/dyn_integration.png" alt="Dyn Integration" style="width:75%;" popup="true">}}

2. Select the zones (_Zone notes_) that you want to collect events and the `dyn.changes` metric from:<br>

{{< img src="integrations/dyn/dyn_zone.png" alt="Dyn zone" style="width:75%;" popup="true">}}

Dyn `QPS` metrics are collected for all zones by default.

<div class="alert alert-info">
IP ACLs must be disabled for the Dyn integration.
</div>

## Data Collected

### Metrics
{{< get-metrics-from-git "dyn" >}}


**Note**: The `dyn.qps` metric is made available to Datadog about 90 minutes after the current time.

### Events

The Dyn integration does not include any events.

### Service Checks

The Dyn integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][4].

[1]: https://manage.dynect.net/login
[2]: https://app.datadoghq.com/integrations/dyn
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/dyn/dyn_metadata.csv
[4]: https://docs.datadoghq.com/help/

