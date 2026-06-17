---
title: Migrating Flags with the Flag Migration CLI
description: Learn how to use the Datadog Flag Migration CLI to migrate feature flags from other providers to Datadog Feature Flags.
further_reading:
- link: "/feature_flags/"
  tag: "Documentation"
  text: "Feature Flags Overview"
- link: "/feature_flags/guide/migrate_from_launchdarkly"
  tag: "Guide"
  text: "Migrate Your Feature Flags from LaunchDarkly"
---

## Overview

The [Datadog Flag Migration CLI][1] is a command-line tool that helps you migrate feature flags from other providers to [Datadog Feature Flags][2]. The CLI reads flag definitions from a source provider and recreates them in Datadog, preserving targeting rules, variations, and rollout configurations where possible.

## Prerequisites

Before running the CLI, make sure your Datadog organization is set up:

- **Users and Teams**: Datadog organization should be provisioned with the users and teams needed to manage flags.
- **Feature Flag Environments**: Create the [feature flag environments][3] you plan to migrate into before running the CLI. The CLI does not create environments for you.

For details on how the migration works and the providers it supports, see the [GitHub repository][1].

## Run the CLI

Run the migration with `npx`:

```bash
npx @datadog/dd-flag-migration migrate
```

For full configuration options, supported source providers, authentication setup, and troubleshooting, see the [`dd-flag-migration` README on GitHub][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-flag-migration
[2]: /feature_flags/
[3]: /feature_flags/concepts/environments/
