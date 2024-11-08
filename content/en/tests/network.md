---
title: Network Traffic
further_reading:
  - link: "/tests/setup/"
    tag: "Documentation"
    text: "Set up Test Optimization for your language"
  - link: "/tests/containers/"
    tag: "Documentation"
    text: "Forwarding Environment Variables for Tests in Containers"
  - link: "/tests/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting Test Optimization"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
The selected Datadog site ({{< region-param key="dd_site_name" >}}) is not supported.
</div>
{{< /site-region >}}

<div class="alert alert-warning">
Traffic is always initiated by the tracers to Datadog. No sessions are ever initiated from Datadog back to the tracers.
</div>

## Destinations

The network endpoints accessed by the tracers are dependent on the Datadog site.
To see destinations based on your [Datadog site][1], click the `DATADOG SITE` selector on the right.

Ensure the following HTTP endpoints are accessible from the host where your tests are executed:

- `api.`{{< region-param key="dd_site" code="true" >}}
- `citestcycle-intake.`{{< region-param key="dd_site" code="true" >}}
- `citestcov-intake.`{{< region-param key="dd_site" code="true" >}}
- `http-intake.logs.`{{< region-param key="dd_site" code="true" >}}
- `instrumentation-telemetry-intake.`{{< region-param key="dd_site" code="true" >}}
- `webhook-intake.`{{< region-param key="dd_site" code="true" >}}

### Static IP addresses

Some of these domains are **CNAME** records pointing to a set of static IP addresses. These addresses can be found at `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

The information is structured as JSON following this schema:

{{< code-block lang="text" disable_copy="true" >}}
{
  "version": 1,                          // <-- incremented every time this information is changed
  "modified": "YYYY-MM-DD-HH-MM-SS",     // <-- timestamp of the last modification
  "<SECTION-NAME>": {                    // <-- the section for a specific service
      "prefixes_ipv4": [                 // <-- list of IPv4 CIDR blocks
        "a.b.c.d/x",
        ...
      ],
      "prefixes_ipv6": [                 // <-- list of IPv6 CIDR blocks
        ...
      ]
  },
  ...
}
{{< /code-block >}}

Each section has a dedicated endpoint, for example `https://ip-ranges.{{< region-param key="dd_site" >}}/api.json`.

### Inclusion

Add all of the `ip-ranges` to your inclusion list. While only a subset are active at any given moment, there are variations over time within the entire set due to regular network operation and maintenance.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
