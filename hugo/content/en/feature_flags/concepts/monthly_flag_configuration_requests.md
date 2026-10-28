---
title: Monthly Flag Configuration Requests (MFCR)
description: Understand Monthly Flag Configuration Requests (MFCR), the billing unit for Feature Flags, and how client-side and server-side SDKs generate them differently.
further_reading:
    - link: '/feature_flags/concepts/configuration_sources'
      tag: 'Documentation'
      text: 'Server SDK Configuration Sources'
    - link: '/feature_flags/guide/estimating_and_managing_costs'
      tag: 'Documentation'
      text: 'Estimate and Manage Feature Flags Costs'
    - link: '/account_management/plan_and_usage/usage_details'
      tag: 'Documentation'
      text: 'Usage Details'
    - link: '/account_management/plan_and_usage/bill_overview'
      tag: 'Documentation'
      text: 'Bill Overview'
---

## Overview

Datadog bills Feature Flags based on **Monthly Flag Configuration Requests (MFCR)**. An MFCR counts each time an SDK requests the flag configuration file—the payload that contains your flags, their variants, and targeting rules. An MFCR does not count how many times application code evaluates a flag.

Feature Flags SDKs evaluate flags locally, in memory, against a configuration file they already hold. Because evaluation does not make a network call, Datadog cannot measure usage by evaluation volume. Instead, Feature Flags billing measures how often SDKs request the configuration file that makes local evaluation possible.

## What generates an MFCR

An MFCR increments each time the flag configuration file is requested. A configuration request happens when:

- A **client-side SDK** initializes, which generally happens when a user opens a mobile app or loads a web page.
- A **server-side SDK** checks for an updated configuration file, at a recurring interval.

The request itself goes to different places depending on the delivery path. Client-side SDKs, and server-side SDKs using agentless delivery, request configuration directly from Datadog's CDN, which runs on Fastly. Server-side SDKs using Agent delivery do not request configuration directly; the Datadog Agent requests it on the SDK's behalf through Remote Configuration. See [Server SDK Configuration Sources][1] for how server-side SDKs choose between these delivery paths.

Installing an SDK does not generate configuration requests by itself. Requests start only after application code initializes the SDK (client-side) or explicitly selects a configuration source (server-side).

The number of flags in the configuration file does not affect the count. A single configuration request can deliver any number of flags. See [What doesn't count as an MFCR](#what-doesnt-count-as-an-mfcr).

## Client-side vs. server-side SDK billing

Client-side and server-side SDKs generate configuration requests differently, so they contribute to MFCR volume differently.

### Client-side SDKs

[Client-side SDKs][2] request configuration from the CDN when they initialize. This typically happens when a user opens a mobile app or loads a web page. The SDK caches that configuration locally on the device for the rest of the session.

Because each request maps to an app open or page load, client-side MFCR volume tracks closely with end-user traffic. Examples include unsampled RUM sessions, or daily active users or sessions across the properties where client-side flags are in use.

### Server-side SDKs

[Server-side SDKs][3] request configuration at a recurring interval instead of per end-user request. Depending on the delivery path, that request goes directly to the CDN (agentless delivery) or through the Datadog Agent (Agent delivery). Each running instance—for example, each host, container, or service—generates its own configuration requests independently. As a result, MFCR volume for server-side SDKs depends on the number of running instances and how often they request updated configuration. It does not depend on the volume of end-user traffic those instances handle.

A single server-side configuration request can serve configuration to an instance that handles a large volume of end-user traffic. Because of this, Datadog bills server-side configuration requests at 10 times their raw count.

### Combined client-side and server-side usage

If you use both client-side and server-side SDKs, total MFCR usage is the sum of both. Add the client-side configuration requests to the server-side configuration requests after the server-side multiplier is applied.

## What doesn't count as an MFCR

Flag evaluations do not count as MFCRs. After an SDK receives a configuration file, it evaluates flags locally against that cached file without an additional network call. As a result:

- A single configuration request can include any number of flags.
- The application can evaluate each of those flags any number of times without generating additional MFCRs.

## View usage and billing

To see MFCR usage and how it contributes to the Feature Flags bill, go to [Usage Details][4] and [Bill Overview][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/concepts/configuration_sources/
[2]: /feature_flags/client/
[3]: /feature_flags/server/
[4]: /account_management/plan_and_usage/usage_details/
[5]: /account_management/plan_and_usage/bill_overview/
