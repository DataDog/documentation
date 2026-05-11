---
title: Feature Flags
description: Learn about feature flags in Datadog.
further_reading:
- link: "https://www.datadoghq.com/blog/experiments"
  tag: "Blog"
  text: "Measure the business impact of every product change with Datadog Experiments"
- link: "https://www.datadoghq.com/blog/guardrail-metrics"
  tag: "Blog"
  text: "Make use of guardrail metrics and stop babysitting your releases"
- link: "/getting_started/feature_flags/"
  tag: "Documentation"
  text: "Getting started with Feature Flags"
- link: "/feature_flags/concepts/"
  tag: "Documentation"
  text: "Learn the core concepts of Feature Flags"
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Set up Feature Flags for client-side applications"
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Set up Feature Flags for server-side applications"
- link: "/feature_flags/guide/migrate_from_launchdarkly"
  tag: "Guide"
  text: "Migrate Your Feature Flags from LaunchDarkly"
- link: "/feature_flags/guide/migrate_from_statsig"
  tag: "Guide"
  text: "Migrate Your Feature Flags from Statsig"
---

## Overview

Datadog Feature Flags is Datadog's flag management product. You create flags in Datadog, deliver flag configuration to Datadog Feature Flags SDKs, and evaluate variants in your application through Datadog or OpenFeature APIs.

Datadog Feature Flags is built on the [OpenFeature standard](https://openfeature.dev/docs/reference/intro/), an open-source, vendor-neutral specification for feature flag APIs. See OpenFeature's getting-started guide if you're new to OpenFeature concepts like providers, evaluation context, and hooks.

Feature flags enable you to toggle features on and off, conduct A/B/n testing, gradually roll out new functionality, and personalize user experiences without the need for extensive code deployments. With feature flags, you can empower your team to make dynamic changes, iterate rapidly, and deliver enhanced user experiences.

If your flags are managed by LaunchDarkly, Split, ConfigCat, or another provider and you only want Datadog to record evaluated variants in RUM, see [RUM Feature Flag Tracking](/real_user_monitoring/feature_flag_tracking/) instead.

Use a client-side SDK when the flag must be evaluated in a browser, mobile app, or game client. Use a server-side SDK when the decision should happen in a backend service and the flag configuration can be delivered through the Datadog Agent and Remote Configuration.

### Credentials at a glance

| Credential | Used by | Where it goes | Sensitive? |
| --- | --- | --- | --- |
| Client token | Browser, mobile, and game SDKs | Client application configuration | Public-shipping token |
| Application ID | Browser and RUM-backed client SDKs | Client application configuration | Public-shipping identifier |
| API key | Datadog Agent for server-side Remote Configuration | Agent configuration only | Secret |

Do not put API keys in browser, mobile, or game applications.

### Evaluation context and telemetry

Evaluation context attributes are the flat string, number, and Boolean values that Datadog uses for targeting rules and rollout bucketing. Set a stable `targetingKey`, such as a user ID, session ID, or device ID, so percentage rollouts are consistent.

Feature Flags telemetry includes exposure events, flag evaluation metrics, and optional RUM correlation depending on the SDK and configuration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
