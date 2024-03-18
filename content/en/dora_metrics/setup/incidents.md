---
title: Sending Incident Events for DORA Metrics
kind: documentation
description: Learn how to send incident events for DORA Metrics.
aliases:
- /continuous_integration/dora_metrics/setup/incidents
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
- link: "/tracing/service_catalog"
  tag: "Documentation"
  text: "Learn about the Service Catalog"
- link: "/code_analysis"
  tag: "Documentation"
  text: "Learn about Code Analysis"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
DORA Metrics are in private beta. Fill out the form below to be added to the waitlist.
{{< /callout >}}

## Overview

Incident events are used in order to compute Change Failure Rate and Mean Time to Restore.
To send incident events, use the [DORA Metrics API][1]. The following attributes are required:

- At least one between `services` and `team`
- `started_at`

You can optionally add the following attributes to the incident events:
- `finished_at` for *resolved incidents*. This attribute is required for [time to restore service](#time-to-restore-service).
- `id` for identifying incidents when they are created and resolved. This attribute is user-generated; when not provided, the endpoint returns a Datadog-generated UUID.
- `name` to describe the incident.
- `severity`
- `env` to accurately filter your DORA metrics by environment.
- `repository_url`
- `commit_sha`

See the [DORA Metrics API reference documentation][1] for the full spec and more examples with the API SDKs.

### Example

```shell
curl -X POST "https://api.{{< region-param key="dd_site" >}}/api/v2/dora/incident" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "services": ["shopist"],
        "team": "shopist-devs",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "name": "Web server is down failing all requests",
        "severity": "High"
      }
    }
  }
EOF
```

## Change Failure Rate

The Change Failure Rate metric is calculated as the percentage of incident events out of the total number of deployments.
Send both [deployment events][2] and [incident events](#overview) to correctly populate this metric.

## Time to restore service

The Mean Time to Restore (MTTR) metric is calculated as the duration distribution for *resolved incident* events.
Include the `finished_at` attribute in an incident event to mark that the incident is resolved.

Events can be sent both at the start of and after incident resolution. Incident events are matched by the `env`, `service`, and `started_at` attributes.


[1]: /api/latest/dora-metrics/#send-an-incident-event-for-dora-metrics
[2]: /continuous_integration/dora_metrics/setup/deployments
