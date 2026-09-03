---
title: Datadog Disaster Recovery
aliases:
- /agent/guide/datadog-disaster-recovery/
site_support_id: datadog_disaster_recovery
further_reading:
- link: "https://www.datadoghq.com/blog/ddr-mitigates-cloud-provider-outages/"
  tag: "Blog"
  text: "Datadog Disaster Recovery mitigates cloud provider outages"
---

## Overview

Datadog Disaster Recovery (DDR) provides you with observability continuity during events that may impact a cloud service provider region or Datadog services running within a cloud provider region. Using DDR, you can recover live observability at an alternate, functional Datadog site, enabling you to meet your critical observability availability goals.

DDR also allows you to periodically conduct disaster recovery drills to not only test your ability to recover from outage events, but to also meet your business and regulatory compliance needs.

## Prerequisites

The minimum version of the Datadog Agent you need depends on the types of telemetry you need to use:

|Supported telemetry |Supported products          |Agent version required |
|--------------------|----------------------------|-----------------------|
|Logs                |Logs                        | v7.54+                |
|Metrics             |Infrastructure Monitoring   | v7.54+                |
|Traces              |APM                         | v7.68+                |

<div class="alert alert-info">
Datadog is continuously evaluating customer requests to support DDR for additional products. Contact the <a href="mailto:disaster-recovery@datadoghq.com">Disaster Recovery team</a> to learn about upcoming capabilities and your specific needs if they are not covered above.
</div>

## Setup

To enable Datadog Disaster Recovery, follow these steps. If you have any questions about any of the steps, contact your [Customer Success Manager][1] or [Datadog Support][2].

1. [Create a DDR org and link it to your primary org][3]
2. [Set up access, integrations, syncing, and agents][4]
3. [Run failover tests in various environments][5]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: mailto:success@datadoghq.com
[2]: https://www.datadoghq.com/support/
[3]: /disaster_recovery/create_ddr_org/
[4]: /disaster_recovery/setup/
[5]: /disaster_recovery/failover_tests/
