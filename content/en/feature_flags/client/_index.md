---
title: Client-Side Feature Flags
description: Set up Datadog Feature Flags for client-side applications.
aliases:
  - /feature_flags/setup/
further_reading:
- link: "/feature_flags/"
  tag: "Documentation"
  text: "Learn about Feature Flags"
- link: "/getting_started/feature_flags/"
  tag: "Documentation"
  text: "Getting Started with Feature Flags"
- link: "feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
---

## Overview

Set up Datadog Feature Flags for your applications. Follow the platform-specific guides below to integrate feature flags into your application and start collecting feature flag data:

{{< partial name="feature_flags/feature_flags_client.html" >}}

## Testing with in-memory providers

The Datadog OpenFeature provider is designed for production use: it requires network connectivity to Datadog's Remote Configuration backend to receive flag definitions. It is **not suitable for unit tests**, which should be hermetic, fast, and offline.

For tests, swap the Datadog provider for OpenFeature's standard `InMemoryProvider` (or an equivalent test stub, where no in-memory provider is available in the language). Because the OpenFeature API is designed to make providers swappable at runtime, your application code does not change — only the provider registered during test setup.

A typical test follows this pattern:

1. Build a map of flag keys to variants in your test setup.
2. Register an `InMemoryProvider` with that map through the OpenFeature API.
3. Evaluate flags through the same OpenFeature client your application uses.
4. Reset the provider in test teardown to avoid cross-test state leakage.

See your platform's SDK page for a concrete test example:

{{< partial name="feature_flags/feature_flags_client.html" >}}

## Context attribute requirements

<div class="alert alert-warning">
Evaluation context attributes must be flat primitive values (strings, numbers, booleans). Nested objects and arrays are <strong>not supported</strong> and will cause exposure events to be silently dropped.
</div>

Use flat attributes in your evaluation context:

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: 'user-123',
  userId: 'user-123',
  tier: 'premium',
  age: 25
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

Avoid nested objects and arrays:

{{< code-block lang="javascript" >}}
// These attributes will cause exposure events to be dropped
const evaluationContext = {
  targetingKey: 'user-123',
  user: { id: 'user-123' },        // nested object - NOT SUPPORTED
  features: ['beta', 'analytics']  // array - NOT SUPPORTED
};
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
