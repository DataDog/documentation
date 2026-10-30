---
title: Server-Side Evaluation Events and Privacy
description: Understand flag evaluation events, their privacy controls, and event delivery with Datadog Feature Flags server SDKs.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/feature_flags/concepts/configuration_sources/"
  tag: "Concept"
  text: "Server SDK Configuration Sources"
- link: "/feature_flags/guide/server_flag_evaluation_metrics/"
  tag: "Guide"
  text: "Set Up Server-Side Flag Evaluation Metrics"
---

## Overview

Datadog Feature Flags server SDKs can send aggregated flag evaluation events to Datadog through the Event Platform Proxy (EVP) or direct intake. These events count evaluations, including evaluations that return the caller-provided default value. The SDK batches and sends events in the background; flag evaluation uses local configuration.

Use these SDK versions or later for the evaluation-event privacy behavior described in this guide. For Node.js, use the listed version or later within the same major release line:

<!-- Release readiness: Publish after .NET tracer 3.57.0 and PHP 1.27.0 are released. Confirm the .NET provider package containing the evaluation-event hook and replace the provider requirement below with its released version. -->

| SDK | Recommended version | Event delivery |
|---|---|---|
| Node.js `dd-trace` | 6.20.0 and 5.131.0 | Local relay with direct fallback |
| Java `dd-openfeature` and `dd-java-agent` | 1.68.0 | Local relay with direct fallback |
| Python `ddtrace` | 4.16.0 | Local relay with direct fallback |
| Go `dd-trace-go/v2` | 2.11.0 | Local relay with direct fallback |
| Ruby `datadog` | 2.46.0 | Local relay required; no direct fallback |
| .NET `dd-trace-dotnet` | 3.57.0 | Local relay with direct fallback |
| PHP `dd-trace-php` | 1.27.0 | Agent required; no direct fallback |

Direct fallback requires the `agentless` configuration source. PHP uses Agent Remote Configuration and supports evaluation events through both the native PHP client and OpenFeature.

.NET evaluation events also require a `Datadog.FeatureFlags.OpenFeature` package with evaluation-event support. Provider versions through 2.3.2 do not include this support. The tracer must be loaded with [automatic instrumentation][7]; installing the provider alone is not sufficient.

This guide does not describe client-side SDK telemetry.

## Choose the telemetry you need

| Signal | Purpose | Configuration |
|---|---|---|
| EVP flag evaluation events | Count flag evaluations and report evaluation outcomes | Enabled by default in the versions listed above. Set `DD_FLAGGING_EVALUATION_COUNTS_ENABLED=false` to disable collection. |
| Experiment exposure events | Associate a subject with an experiment variation | Separate from evaluation counts; emitted for flags associated with experiments. |
| `feature_flag.evaluations` OTLP metric | Graph evaluations as an OpenTelemetry metric | Configure the separate [metrics export path][1]. |
| APM trace enrichment | Attach evaluated flags to traces | Configure [APM trace enrichment][2] separately. |

To disable only EVP flag evaluation events, set this variable before starting the application, then restart it:

{{< code-block lang="bash" >}}
DD_FLAGGING_EVALUATION_COUNTS_ENABLED=false
{{< /code-block >}}

This setting leaves local flag evaluation, experiment exposures, trace enrichment, and OTLP evaluation metrics unchanged. It does not stop configuration polling or the associated [configuration requests][3]. To disable the provider and configuration delivery as well, set `DD_FEATURE_FLAGS_ENABLED=false`. For PHP 1.27.0, use `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false`.

## Evaluation-event privacy

To include original targeting keys and evaluation context in EVP flag evaluation events, set `observe_full_evaluation_data` to `true` for the environment using the [Feature Flags API][8]. The SDK receives this setting through flag configuration updates. Setting it in your application's evaluation context has no effect.

| `observe_full_evaluation_data` (Feature Flags API) | Targeting key in EVP flag evaluation events | Evaluation context in EVP flag evaluation events |
|---|---|---|
| `false`, absent, or not a Boolean `true` | Unsalted SHA-256 digest with a `sha256_` prefix. | Omitted. |
| `true` | Events can include the original targeting key. | Events can include a bounded snapshot of evaluation attributes. |

The SDK uses the `observe_full_evaluation_data` value captured at evaluation time. A later configuration change does not rewrite events already queued for delivery. To keep SDK memory use bounded, the SDK can omit targeting keys and context when aggregation limits are reached while retaining aggregate counts, even when full data collection is enabled.

Hashing pseudonymizes targeting keys. Identical keys produce identical hashes, allowing you to correlate evaluations for the same subject.

These controls apply to EVP flag evaluation events. They do not redact application logs, experiment exposure payloads, or other telemetry. Review the attributes you put in evaluation contexts before enabling full data collection. Do not include passwords, API keys, or other secrets.

## Enable full evaluation data

We recommend setting `observe_full_evaluation_data` to `true` for each environment. This allows EVP flag evaluation events to include original targeting keys and evaluation attributes, giving you more detail about how your application uses feature flags.

Use this data in Datadog to:

- Identify which subjects evaluated a flag and which variants they received.
- Investigate unexpected evaluation results using the attributes supplied with the evaluation.
- Compare evaluation patterns across groups defined by attributes you provided such as subscription plan, region, or application version.

## Event delivery and direct fallback

Configuration delivery and event delivery use separate connections. Successfully loading flags from the CDN does not confirm that telemetry can reach Datadog.

With `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`, the SDKs that support direct fallback prefer a compatible local EVP relay. If no compatible route is available, they can send events directly to `https://event-platform-intake.<DD_SITE>` using the application's `DD_API_KEY`.

For direct delivery:

1. Use a version listed above for an SDK that supports direct fallback. For .NET, also meet the OpenFeature provider requirement described in the overview.
2. Configure `DD_API_KEY`, `DD_SITE`, and `DD_ENV` in the application process, as described in [agentless setup][5]. Store the API key in a secret manager.
3. Allow outbound HTTPS to the event intake for the selected Datadog site, in addition to the flag configuration endpoint.
4. Initialize the provider using the language-specific setup instructions.

The custom `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL` setting changes only the configuration endpoint. It does not redirect event delivery. Without an application API key, a custom configuration endpoint can serve flags, but direct event delivery is unavailable.

With `remote_config`, event delivery remains Agent-backed. Supplying an application API key does not enable direct fallback in this mode. Ruby 2.46.0 requires a compatible local relay for events with either configuration source. PHP 1.27.0 requires Agent-backed delivery for both configuration and events. See [serverless telemetry setup][6] for relay requirements.

### Delivery limits

Event delivery is best effort. Pending events can be lost when a process exits abruptly, a runtime freezes, a buffer fills, or the network is unavailable.

Python 4.16.0, Go 2.11.0, and .NET 3.57.0 can retry a batch directly after a local HTTP `404` or `405`. A confirmed connection failure before sending can also trigger this retry. A timeout or connection reset can leave delivery uncertain. The SDK does not replay that batch through direct intake when the local receiver might already have accepted it. Later batches can use direct intake. Do not treat direct fallback as a durable event queue or a guarantee that every evaluation is delivered.

For Node.js, keep `dd-trace` external to a single-file application bundle and make its installed package available at runtime. The evaluation-event worker needs its JavaScript file and dependencies. If it cannot load, evaluation events are disabled for that provider while local flag evaluation and experiment exposures continue.

## Verify the setup

1. Confirm the SDK version and selected configuration source.
2. Initialize the provider and evaluate an enabled non-production flag with a non-sensitive targeting key.
3. Open the flag's details page in Datadog and select the environment and time range used for your test. In the **Evaluations** graph, select **Total** and confirm that data appears for your server SDK source. Allow time for the SDK to send its batch and for Datadog to process it. Data from a browser or another SDK does not confirm delivery from the server application you are testing.
4. Check application logs for event transport errors. A ready provider confirms configuration delivery, not event delivery.
5. Confirm that `DD_FLAGGING_EVALUATION_COUNTS_ENABLED` is not `false` when you need EVP flag evaluation events.
6. Check the environment's `observe_full_evaluation_data` value in the [environment API response][4] when troubleshooting missing targeting attributes. Allow the configuration polling interval for changes to reach the SDK.
7. Validate experiment exposures and the OTLP metric separately if your application uses them.

EVP flag evaluation event counts are available with either value of `observe_full_evaluation_data`. Setting it to `true` enables the additional targeting-key and evaluation-context data described above.

{{< img src="feature_flags/guide/server_evaluation_events/evaluations_graph.png" alt="Evaluations graph in Unique mode showing server SDK data grouped by variant and SDK source" style="width:100%;" >}}

The example above shows server SDK data in **Unique** mode (aggregated by targeting key). Check `source.name` labels to determine which server SDKs are sending flag evaluation events.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/guide/server_flag_evaluation_metrics/
[2]: /feature_flags/guide/apm_trace_enrichment/
[3]: /feature_flags/concepts/configuration_sources/#activation-and-billing
[4]: /api/latest/feature-flags/#get-an-environment
[5]: /feature_flags/concepts/configuration_sources/#use-agentless-delivery
[6]: /feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry
[7]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/
[8]: /api/latest/feature-flags/#update-an-environment
