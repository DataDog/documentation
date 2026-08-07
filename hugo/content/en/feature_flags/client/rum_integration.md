---
title: RUM Integration
description: Use RUM user attributes in feature flag evaluation context and add flag evaluations to RUM events.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/real_user_monitoring/feature_flag_tracking/"
  tag: "Documentation"
  text: "RUM Feature Flag Tracking"
- link: "https://openfeature.dev/docs/reference/concepts/evaluation-context/"
  tag: "External"
  text: "OpenFeature Evaluation Context"
---

## Overview

Datadog client Feature Flags SDKs can integrate with Real User Monitoring (RUM) in two ways:

- Use the current RUM user as default values for the feature flag evaluation context.
- Add feature flag evaluation results to RUM events for analysis in RUM Feature Flag Tracking.

RUM integration availability and configuration depend on the platform and SDK version. See the [client SDK guide][1] for your platform.

## Use RUM user context for flag evaluation

When RUM user context integration is enabled, the Feature Flags provider reads the RUM user when the provider initializes or reconciles an evaluation context. The provider combines the RUM user with context explicitly supplied through OpenFeature:

| RUM user data | Evaluation context behavior |
|---|---|
| User ID | Supplies the `targetingKey` when the OpenFeature context does not define one. |
| Flat string, number, and Boolean user attributes | Supply evaluation attributes when the OpenFeature context does not define attributes with the same names. |
| Nested objects, arrays, `null`, and other values | Are not added to the evaluation context. |

The provider does not recursively flatten nested values. Some RUM user APIs store custom attributes in a container such as `extraInfo`. In those SDKs, the provider copies supported primitive entries from the container and excludes nested values.

Fields explicitly supplied through OpenFeature take precedence over fields from the RUM user. This lets the application override a RUM value for feature flag targeting without changing the RUM user.

An online provider uses the effective context for assignment requests, flag evaluation, exposure events, and evaluation telemetry. This keeps targeting and telemetry associated with the same subject. Precomputed and offline provider behavior depends on the platform because a configuration can be bound to a specific context.

### Set the RUM user before the provider

Set the RUM user before registering the Feature Flags provider. This lets the provider use the RUM user for its initial assignment request.

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
DD_RUM.setUser({
  id: 'user-123',
  email: 'user@example.com',
  plan: 'premium',
})

await OpenFeature.setProviderAndWait(new DatadogProvider(configuration))
```

{{% /tab %}}
{{% tab "React Native" %}}

```tsx
await DdSdkReactNative.setUserInfo({
  id: 'user-123',
  email: 'user@example.com',
  extraInfo: { plan: 'premium' },
})

await OpenFeature.setProviderAndWait(new DatadogOpenFeatureProvider())
```

{{% /tab %}}
{{< /tabs >}}

### Reconcile context after the RUM user changes

Changing the RUM user after provider initialization does not automatically change the effective evaluation context. After a login, logout, or account switch, update the RUM user and reconcile the provider with the existing OpenFeature context. Reconciliation preserves fields explicitly supplied through OpenFeature while reading the latest RUM user.

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
DD_RUM.setUser(newUser)
await OpenFeature.setContext(OpenFeature.getContext())
```

For logout:

```javascript
DD_RUM.clearUser()
await OpenFeature.setContext(OpenFeature.getContext())
```

{{% /tab %}}
{{% tab "React Native" %}}

```tsx
await DdSdkReactNative.setUserInfo(newUser)
await OpenFeature.setContext(OpenFeature.getContext())
```

{{% /tab %}}
{{< /tabs >}}

Until reconciliation completes, the provider continues to use the previous effective context. Reconciliation fetches assignments for the updated subject before subsequent evaluations use the new context.

## Add flag evaluations to RUM

When RUM feature flag tracking is enabled, the Feature Flags SDK adds evaluated flag variants to RUM. RUM events collected after the evaluation include the flag name and variant, which lets you compare user behavior, errors, and performance across variants.

For information about analyzing evaluations, see [Using Feature Flag Tracking][2].

## Disable RUM integration

Use the RUM integration option documented in the platform's [client SDK guide][1] to opt out. For SDKs that support RUM user context, disabling RUM integration prevents both context enrichment and adding flag evaluations to RUM.

[1]: /feature_flags/client/
[2]: /real_user_monitoring/feature_flag_tracking/using_feature_flags/
