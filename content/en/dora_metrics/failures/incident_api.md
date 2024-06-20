---
title: Configuring Incident Event Submission for DORA Metrics
kind: documentation
description: Learn how to send incident events for DORA Metrics.
aliases:
- /continuous_integration/dora_metrics/setup/incidents
is_beta: true
further_reading:
- link: "/dora_metrics/failures"
  tag: "Documentation"
  text: "See other incident data source options"
- link: "/tracing/service_catalog"
  tag: "Documentation"
  text: "Learn about the Service Catalog"
- link: "/continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}



## Overview

To send your own incident events, use the [DORA Metrics API][1]. Incident events are used in order to compute change failure rate and mean time to restore.

Include the `finished_at` attribute in an incident event to mark that the incident is resolved. You can send events at the start of the incident and after incident resolution. Incident events are matched by the `env`, `service`, and `started_at` attributes.

The following attributes are required:

- `services` or `team` (at least one must be present)
- `started_at`

You can optionally add the following attributes to the incident events:

- `finished_at` for *resolved incidents*. This attribute is required for calculating the time to restore service.
- `id` for identifying incidents when they are created and resolved. This attribute is user-generated; when not provided, the endpoint returns a Datadog-generated UUID.
- `name` to describe the incident.
- `severity`
- `env` to filter your DORA metrics by environment on the [**DORA Metrics** page][3].
- `repository_url`
- `commit_sha`

See the [DORA Metrics API reference documentation][1] for the full spec and additional code samples.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dora-metrics/#send-an-incident-event-for-dora-metrics
[2]: /dora_metrics/deployments
[3]: https://app.datadoghq.com/ci/dora