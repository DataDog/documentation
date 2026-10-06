---
title: Flag Key Obfuscation
description: Understand how flag key obfuscation reduces readable flag names in client assignment payloads and what remains visible.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/feature_flags/concepts/distribution_channels/"
  tag: "Documentation"
  text: "Distribution Channels"
- link: "/feature_flags/concepts/variants_and_flag_types/"
  tag: "Documentation"
  text: "Variants and Flag Types"
---

## Overview

Flag key obfuscation replaces readable flag keys with hashes in precomputed assignment responses. This makes flag names less recognizable to someone inspecting the response. It does not make client-side feature flags secret or prevent response tampering.

Your application continues to evaluate flags with their original keys. Obfuscation does not change targeting, assigned values, default values, or flag keys in telemetry.

## Compatibility and rollout

Obfuscation requires a compatible SDK version. Datadog controls the rollout to compatible SDKs. The SDK handles the encoding automatically. You do not set a provider option, generate hashes, or change evaluation calls.

During rollout, Datadog sends obfuscated responses only to SDKs that report support for the encoding. Other SDK versions continue to receive readable keys. Updating one application does not change the behavior of other applications still running an older SDK version.

This feature applies to precomputed assignments. It does not obfuscate downloaded targeting rules for local evaluation.

### Planned versions

The following versions are planning targets, not confirmed releases. Confirm SDK support and Datadog rollout availability before adopting them.

| Client SDK | Package | Planned minimum version |
| --- | --- | --- |
| Browser | `@datadog/openfeature-browser` | `2.1.0` |
| iOS | `DatadogFlags` | `3.20.0` |
| Android | `dd-sdk-android-flags` | `3.16.0` |
| Dart | `datadog_flags` | `1.3.0` |
| Flutter | `datadog_flags_flutter` | `1.3.0` |
| Unity | `com.datadoghq.unity` | `2.1.0` |

React Native support is not included in this rollout. Updating its native iOS or Android dependency alone does not enable obfuscation.

<!-- Draft targets: each repository package version plus one minor, checked 2026-10-06.
Browser 2.0.0; iOS 3.19.0; Android 3.15.0-SNAPSHOT; Dart/Flutter Flags 1.2.0; Unity 2.0.0.
The browser release must include the compatible @datadog/flagging-core release (planned 3.2.0, from 3.1.1).
Replace planning language with confirmed minimum versions before publishing this page.
-->

## How flag key obfuscation works

1. Datadog evaluates flags for the subject and context supplied by the SDK.
2. Datadog replaces each flag key in the assignment response with a salted SHA-256 hash.
3. The SDK hashes the key from the evaluation call with that salt, finds the assignment, and returns its value.

The salt changes between responses. It is public information, not a secret key. The SDK retains the salt with cached assignments.

For example, the following JavaScript evaluation call stays the same whether the response contains readable or hashed keys:

{{< code-block lang="javascript" >}}
const enabled = client.getBooleanValue('new-route-planner', false);
{{< /code-block >}}

The original key remains unchanged in Datadog and in application code. Variant values, variant identifiers, and allocation identifiers also remain unchanged.

## Protect sensitive feature information

Obfuscation reduces casual discovery of flag names in assignment responses. It does not provide encryption, authorization, or signature verification. Someone who knows a possible flag key can use the public salt to check its hash.

- Keep secrets and sensitive business logic on the server. Restrict server-only flags to the **Server** [distribution channel][1].
- Do not put sensitive information in client-facing values. Strings and JSON objects remain readable. Boolean values can also reveal behavior.
- If flag names in application code are a concern, choose non-descriptive flag keys. Payload obfuscation does not remove strings from browser code or mobile binaries.
- Treat client-visible values, identifiers, telemetry, and application behavior as inspectable. Hashing flag keys does not conceal these other sources of information.
- Enforce sensitive access decisions on the server. Obfuscation does not prevent a modified client from changing its behavior.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/concepts/distribution_channels/
