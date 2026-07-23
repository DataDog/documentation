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
- link: "/feature_flags/use_cases/"
  tag: "Documentation"
  text: "Feature Flags Use Cases"
- link: "/feature_flags/concepts/"
  tag: "Documentation"
  text: "Learn the core concepts of Feature Flags"
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Set up Feature Flags for client-side applications"
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Set up Feature Flags for server-side applications"
- link: "/feature_flags/implementation_patterns/"
  tag: "Documentation"
  text: "Explore Feature Flags implementation patterns"
- link: "/feature_flags/guide/migrate_from_launchdarkly"
  tag: "Guide"
  text: "Migrate Your Feature Flags from LaunchDarkly"
- link: "/feature_flags/guide/migrate_from_statsig"
  tag: "Guide"
  text: "Migrate Your Feature Flags from Statsig"
- link: "/feature_flags/guide/headless_cms"
  tag: "Guide"
  text: "Integrate Feature Flags with a Headless CMS"
---

## Overview

Datadog Feature Flags is Datadog's flag management product. You create flags in Datadog, deliver flag configuration to Datadog Feature Flags SDKs, and evaluate variants in your application through Datadog or OpenFeature APIs.

Datadog Feature Flags is built on the [OpenFeature standard](https://openfeature.dev/docs/reference/intro/), an open-source, vendor-neutral specification for feature flag APIs. If you're new to OpenFeature concepts like providers, evaluation context, and hooks, see the [OpenFeature concepts documentation](https://openfeature.dev/docs/category/concepts).

Feature flags enable you to toggle features on and off, conduct A/B/n testing, gradually roll out new functionality, and personalize user experiences without the need for extensive code deployments. With feature flags, you can empower your team to make dynamic changes, iterate rapidly, and deliver enhanced user experiences.

If your flags are managed by LaunchDarkly, Split, ConfigCat, or another provider and you only want Datadog to record evaluated variants in RUM, see [RUM Feature Flag Tracking](/real_user_monitoring/feature_flag_tracking/) instead.

Use a client-side SDK when the flag is evaluated in a browser, mobile app, or game client. Use a server-side SDK when the flag is evaluated in a backend service that receives flag configuration through the Datadog Agent and Remote Configuration.

### Credentials at a glance

| Credential | Used by | Where it goes | Sensitive? |
| --- | --- | --- | --- |
| Client token | Browser, mobile, and game SDKs | Client application configuration | No — safe to ship in public client code |
| Application ID | Browser and RUM-backed client SDKs | Client application configuration | No — public identifier |
| API key | Datadog Agent for server-side Remote Configuration | Agent configuration only | Yes — keep server-side only |

Do not put API keys in browser, mobile, or game applications.

### Evaluation context and telemetry

Evaluation context attributes are the flat string, number, and Boolean values that Datadog uses for targeting rules and rollout bucketing. Set a stable `targetingKey`, such as a user ID, session ID, or device ID, so percentage rollouts are consistent.

Feature Flags telemetry includes exposure events, flag evaluation metrics, and optional RUM correlation depending on the SDK and configuration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
