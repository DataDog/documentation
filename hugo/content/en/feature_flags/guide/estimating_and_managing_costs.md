---
title: Estimate and Manage Feature Flags Costs
description: Estimate your Feature Flags usage and costs before you roll out, and apply concrete levers to manage and reduce them after deployment.
further_reading:
- link: "/feature_flags/concepts/monthly_flag_configuration_requests/"
  tag: "Documentation"
  text: "Monthly Flag Configuration Requests"
- link: "/feature_flags/concepts/stale_flags/"
  tag: "Documentation"
  text: "Stale Flags"
- link: "/feature_flags/concepts/environments/"
  tag: "Documentation"
  text: "Environments"
- link: "/feature_flags/concepts/configuration_sources/"
  tag: "Documentation"
  text: "Server SDK Configuration Sources"
- link: "/account_management/plan_and_usage/usage_details/"
  tag: "Documentation"
  text: "Usage Details"
- link: "/account_management/plan_and_usage/bill_overview/"
  tag: "Documentation"
  text: "Bill Overview"
---

## Overview

Feature Flags usage scales with how you deploy flags:

- For **client-side** usage, it depends on the number of client applications and end users connecting to Datadog.
- For **server-side** usage, it depends on the number of backend services polling for configuration.

Two organizations with the same number of flags can generate different amounts of usage, depending on this deployment footprint. This guide helps you estimate usage and cost before you roll out broadly. It also covers the levers available to manage and reduce cost after deployment.

## Estimate your Feature Flags usage and costs

Datadog bills Feature Flags usage in Monthly Flag Configuration Requests (MFCR). An MFCR is a request for the file containing your flags and their targeting rules, not an individual flag evaluation. SDKs cache that file locally and evaluate flags from it without further network calls, so a single configuration request can back many evaluations across many flags. For the full definition and counting rules, see [Monthly Flag Configuration Requests][1].

Because MFCR counts configuration requests, the number of flags you maintain and how often they're evaluated don't directly drive usage. The factors that do:

- **Client-side usage**: A client-side SDK requests configuration when it initializes, which typically happens each time a user opens a browser tab or mobile app. Client-side MFCR closely tracks the total (unsampled) volume of sessions or app opens across the applications where you use flags.
- **Server-side usage**: A server-side SDK polls Datadog (or the Datadog Agent, depending on the [configuration source][2] you choose) at a configurable interval, 30 seconds by default. Server-side MFCR tracks the total number of running hosts, services, or containers with the SDK deployed, multiplied by how often each one polls.
- **Client- and server-side mix**: If you use flags on both the client and server, add the two estimates together.

<div class="alert alert-info">Datadog bills server-side configuration requests at 10 times their raw count, because a single server-side request can serve variant assignments to many more end users than a single client-side request.</div>

### Estimate your usage before you roll out

1. Decide which SDKs you plan to deploy: client-side, server-side, or both.
1. For client-side usage, estimate with one of the following:
   - Your monthly volume of RUM sessions. Alternatively, use your daily active users across the applications where you plan to use flags, multiplied by 30 for a monthly estimate.
   - If flags cover a broader set of applications than your current RUM implementation, use daily active users or daily sessions across those applications instead.
1. For server-side usage, count the total number of running hosts, services, or containers with the SDK deployed. Multiply that count by the number of configuration requests per day at your polling interval, then by 30 for a monthly estimate, and apply the 10 times server-side multiplier.
1. Add the client-side and server-side estimates together for a combined monthly MFCR estimate.

For example, an organization with 1.2 million daily active users on flagged client applications generates approximately 36 million MFCR per month (1.2 million x 30 days).

For a server-side example, an organization running the SDK on 33 hosts generates 2,880 configuration requests per host per day at the default 30-second polling interval (86,400 seconds per day / 30 seconds). That's 33 x 2,880 x 30 days = 2,851,200 (approximately 2.85 million) MFCR before the server-side multiplier, or approximately 28.5 million MFCR after it.

Usage under 1 million MFCR per month is included at no cost. For current pricing tiers above that allotment, see the [Feature Flags pricing page][4].

### Monitor your actual usage and cost

After deployment, compare your estimate against actual usage. Datadog reports Feature Flags usage and cost alongside your other products on the [Usage Details][5] and [Bill Overview][6] pages, where you can view usage trends over time and download detailed usage data.

## Manage and reduce Feature Flags costs

Because MFCR tracks configuration requests rather than flag count, reducing the number of flags you maintain doesn't by itself reduce cost. The following levers target what actually drives MFCR: how many client sessions initialize the SDK, how many server instances poll for configuration, and how often.

### Review environment sprawl and server SDK footprint

Server-side MFCR multiplies with every environment running an instance of the SDK. Review which [environments][3] genuinely need live server-side flag delivery. Ephemeral or short-lived infrastructure, such as per-branch or CI environments, adds request volume without adding rollout value if it doesn't need targeting. Consolidate environment queries where multiple `env` values map to the same logical environment, so you're not duplicating configuration delivery unnecessarily.

### Turn off feature flags where they aren't in use

Installing a server SDK doesn't activate billing by itself; a configuration request only happens after the provider initializes. If a service has the tracer installed but doesn't use flags, set `DD_FEATURE_FLAGS_ENABLED=false` to disable the provider and stop configuration polling. For details, see [Server SDK Configuration Sources][2].

### Adjust the configuration polling interval

For agentless server-side delivery, `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS` controls how often the SDK requests configuration, with a default of 30 seconds and a maximum of 3600 seconds (one hour). A longer interval reduces request volume at the cost of slower flag propagation. Extending the interval on lower-priority environments, such as development or staging, is one way to lower volume where fast propagation matters less than in production.

### Choose a configuration source that matches your deployment

With Agent Remote Configuration, applications communicate with the local Datadog Agent instead of polling Datadog directly. If you run several application processes on the same host, routing them through a shared Agent can consolidate configuration requests compared to each process polling Datadog independently over agentless delivery. Weigh this against the operational cost of running and maintaining Remote Configuration-enabled Agents. See [Server SDK Configuration Sources][2] for how to choose between the two.

### Scope client-side SDK initialization to where you use flags

Client-side MFCR tracks sessions or app opens in applications that initialize the flags provider. Initialize the provider only in the applications and properties where you gate features with flags, rather than universally across every client property.

### Clean up stale and unused flags

[Stale flags][7] don't directly add to MFCR, since a configuration request covers all your flags regardless of count. Archiving them still reduces flag debt and the risk of maintaining logic tied to services or environments you no longer need. Reviewing stale flags is also a useful signal for decommissioning entire environments or SDK deployments that are no longer in use, which does reduce server-side request volume.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/concepts/monthly_flag_configuration_requests/
[2]: /feature_flags/concepts/configuration_sources/
[3]: /feature_flags/concepts/environments/
[4]: https://www.datadoghq.com/pricing/?product=feature-flags#products
[5]: /account_management/plan_and_usage/usage_details/
[6]: /account_management/plan_and_usage/bill_overview/
[7]: /feature_flags/concepts/stale_flags/
