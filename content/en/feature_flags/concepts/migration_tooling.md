---
title: Migration Tooling
description: Migrate feature flags from other providers using the Datadog flag migration CLI.
further_reading:
- link: "/feature_flags/guide/migrate_from_launchdarkly"
  tag: "Guide"
  text: "Migrate from LaunchDarkly"
- link: "/feature_flags/guide/migrate_from_statsig"
  tag: "Guide"
  text: "Migrate from Statsig"
---

## Overview

The [Datadog flag migration CLI](https://github.com/DataDog/dd-flag-migration) helps you migrate feature flag definitions from other feature flag providers into Datadog Feature Flags.

Use the CLI to export flags from a source system and import them into Datadog, reducing manual recreation of flag keys, variants, and environment configuration.

For provider-specific migration steps in your application code, see the [Feature Flags guides](/feature_flags/guide/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
