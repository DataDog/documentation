---
title: OCI Integration Billing
---

## Overview

Datadog bills for hosts running the Datadog Agent and all Oracle Cloud Infrastructure (OCI) Compute instances detected by the OCI integration. You are not billed twice if the Datadog Agent runs on a Compute instance that is also detected by the OCI integration.

Other OCI resources—such as Autonomous Database, Object Storage, Load Balancer, and other managed services—do not impact monthly infrastructure billing. These services can send metrics to Datadog through the integration without additional host charges.

If you run containers on OCI (for example, on Oracle Kubernetes Engine), container usage is billed separately. See the [containers billing guide][6] for details.

## OCI metric exclusion

Use the OCI integration tile to control which resources Datadog collects metrics from:

1. Open the [OCI integration tile][1].
2. Go to the **Metric Collection** tab.
3. For each connected tenancy, optionally:
   - Limit metric collection to specific compartments or regions.
   - Limit metric collection to resources with specific [tags][2] using `key:value` pairs.

When you add or change limits for an existing OCI tenancy, previously discovered Compute instances can remain in the [Infrastructure List][3] for up to two hours while filters propagate. During this transition period, affected instances can display a status of `???`. This does not count toward your billing.

Hosts with a running Datadog Agent continue to be included in billing. Limiting metric collection in the OCI integration tile applies to instances discovered by the integration and does not exclude hosts that report directly through the Agent.

## Check if a host is monitored by the Agent or OCI

In the Infrastructure Host list:

- Monitored by OCI integration
  
  If a host displays only the OCI logo, or if its metrics are limited to `oci.*` namespaces, the host is monitored exclusively through the OCI integration.

- Monitored by the Datadog Agent
  
  If a host displays the Datadog Agent logo but not the OCI logo, or if its metrics include Agent-collected namespaces (such as `datadog.*`, `system.*`, and others), the host is monitored by the Datadog Agent.

## Troubleshooting

For technical questions, contact [Datadog support][4].

For billing questions, contact your [Customer Success][5] Manager.

[1]: https://app.datadoghq.com/integrations?integrationId=oracle-cloud-infrastructure
[2]: /getting_started/tagging/using_tags/#integrations
[3]: /infrastructure/
[4]: /help/
[5]: mailto:success@datadoghq.com
[6]: /account_management/billing/containers/


