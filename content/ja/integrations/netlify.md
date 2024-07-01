---
"categories":
- collaboration
- log collection
- provisioning
"custom_kind": "integration"
"dependencies": []
"description": "Track Netlify logs."
"doc_link": "https://docs.datadoghq.com/integrations/netlify/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-netlify-with-datadog/"
  "tag": Blog
  "text": Monitor your Netlify sites with Datadog
"git_integration_title": "netlify"
"has_logo": true
"integration_id": "netlify"
"integration_title": "Netlify"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "netlify"
"public_title": "Datadog-Netlify Integration"
"short_description": "Track Netlify logs."
"team": "web-integrations"
"type": ""
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

[Netlify][1] is a Jamstack web development platform that allows customers to build and deploy dynamic, highly performant web apps.

Integrate Netlify with Datadog to:

* View and parse your function and traffic logs using [Datadog’s Log Management][2]
* See the number of requests to your applications broken down by HTTP status code
* Visualize your function duration and see corresponding logs for each request
* Monitor frontend performance with [Datadog's Synthetic Monitoring][3]

## Setup

1. Generate a [Datadog API key][4].
2. Configure your [Netlify Log Drains][5] to send logs to Datadog.

## Data Collected

### Metrics

The Netlify integration does not include any metrics.

### Service Checks

The Netlify integration does not include any service checks.

### Events

The Netlify integration does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.netlify.com/
[2]: https://docs.datadoghq.com/logs/
[3]: https://docs.datadoghq.com/synthetics/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.netlify.com/monitor-sites/log-drains/
[6]: https://docs.datadoghq.com/help/

