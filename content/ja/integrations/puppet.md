---
"categories":
- "provisioning"
- "configuration & deployment"
"custom_kind": "integration"
"dependencies": []
"description": "Track Puppet runs: know when they fail, succeed, or make big changes."
"doc_link": "https://docs.datadoghq.com/integrations/puppet/"
"draft": false
"git_integration_title": "puppet"
"has_logo": true
"integration_id": "puppet"
"integration_title": "Puppet"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "puppet"
"public_title": "Datadog-Puppet Integration"
"short_description": "Track Puppet runs: know when they fail, succeed, or make big changes."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Connect Puppet to Datadog in order to:

- Get real-time reports on Puppet Agent runs.
- Track key Puppet performance metrics across all your servers.
- Quickly identify and discuss failed Puppet runs with your team

## Setup

### Installation

To install the Datadog Agent with Puppet, see the [Datadog Puppet Agent repository][1] on GitHub.

## Data Collected

### Metrics
{{< get-metrics-from-git "puppet" >}}


### Events

The Puppet integration includes status events for failure, success, changed, and unchanged resources.

### Service Checks

The Puppet integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://github.com/datadog/puppet-datadog-agent
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/puppet/puppet_metadata.csv
[3]: https://docs.datadoghq.com/help/

