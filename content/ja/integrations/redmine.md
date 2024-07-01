---
"categories":
- "collaboration"
- "developer tools"
- "issue tracking"
"custom_kind": "integration"
"dependencies": []
"description": "View, search on, and discuss Redmine updates in your Datadog event stream."
"doc_link": "https://docs.datadoghq.com/integrations/redmine/"
"draft": false
"git_integration_title": "redmine"
"has_logo": true
"integration_id": "redmine"
"integration_title": "Redmine"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "redmine"
"public_title": "Datadog-Redmine Integration"
"short_description": "View, search on, and discuss Redmine updates in your Datadog event stream."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Redmine is an open source project management web application. Capture Redmine activity in Datadog to:

- Track your development cycle.
- View open issues in the Datadog event stream.
- Discuss projects with your team.

The Redmine configuration requires a full URL to the desired activity feed. You can add multiple URLs.

## Setup

### Installation

See the [Redmine integration tile][1] to configure your integration.

## Data Collected

### Metrics

The Redmine integration does not include any metric.

### Events

All created issues appear as events within Datadog. After installing and configuring the integration, you can search the [Events Explorer][2] for `source:redmine` to see issues in your Redmine activity feed.

### Service Checks

The Redmine integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://app.datadoghq.com/integrations/redmine
[2]: https://docs.datadoghq.com/service_management/events/explorer/
[3]: https://docs.datadoghq.com/help/

