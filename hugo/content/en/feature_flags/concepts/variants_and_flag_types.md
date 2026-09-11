---
title: Variants and Flag Types
description: Learn about feature flag data types and how to manage flag variants in Datadog.
further_reading:
- link: "/feature_flags/concepts/environments"
  tag: "Documentation"
  text: "Environments"
- link: "/feature_flags/concepts/distribution_channels"
  tag: "Documentation"
  text: "Distribution Channels"
---

## Overview

Each feature flag has a **variant type** that defines the data type of values the flag can return. **Variants** are the specific values your application can receive when it evaluates the flag.

## Flag types

Datadog Feature Flags support five data types:

| Type | Description |
|------|-------------|
| **Boolean** | `true` or `false` |
| **String** | Text values |
| **Integer** | Whole numbers |
| **Number** | Floating-point numbers |
| **JSON** | Structured JSON objects |

**Note**: The flag key and variant type cannot be changed after you create the flag.

## Add a variant

1. Navigate to your feature flag's details page.
2. Open the **Manage Implementation & Variants** side panel.
3. Click **Add Variant**.
4. Enter the variant name and value, then save.

**Note**: You cannot add variants to Boolean flags. Boolean flags are limited to `true` and `false`.

## Edit a variant

1. Navigate to your feature flag's details page.
2. Open the **Manage Implementation & Variants** side panel.
3. Click the pencil icon next to the variant you want to modify.
4. Update the variant's name, value, or both, then save.

<div class="alert alert-warning">
Changing the value of a variant that is being served as part of a running experiment may invalidate the results of that experiment.
</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
