---
title: Record Feature Flag Exposures in Your Own Data Store
description: Use the Datadog ExposureHook to record feature flag exposures in your own logs, data warehouse, or analytics pipeline, and optionally stop sending exposures to Datadog.
further_reading:
- link: "/feature_flags/concepts/experiments/"
  tag: "Documentation"
  text: "Feature Flags and Experiments"
- link: "/experiments/concepts/exposure_sql/"
  tag: "Documentation"
  text: "Exposure SQL Models"
- link: "/experiments/holdouts/#analyze-holdouts-with-your-own-exposure-data"
  tag: "Documentation"
  text: "Analyze holdouts with your own exposure data"
---

## Overview

The Datadog Feature Flags SDKs send _exposures_ to Datadog: records of which subject received which variant of a flag, and when. You can also record these exposures in your own system, such as your logs, a data warehouse, or an analytics pipeline. You can do this instead of sending exposures to Datadog, or in addition to it.

Each supported SDK includes an `ExposureHook`, an [OpenFeature hook][1] that calls your code after every flag evaluation. The hook tells you whether the evaluation is an exposure, and whether it is new. It uses the same decision that the SDK uses when it sends exposures to Datadog, so your records match what Datadog records.

## Supported SDKs

| SDK | Minimum version |
| --- | --- |
| [Java][2] | `dd-java-agent` and `dd-openfeature` 1.68.0 |
| [Go][3] | `dd-trace-go` 2.12.0 |
| [Browser][4] (JavaScript, React, Angular) | `@datadog/openfeature-browser` 2.3.0 |

## How the SDK identifies exposures

An evaluation is an exposure when it succeeds and selects an allocation that logs exposures, such as an experiment or a holdout. A failed evaluation is not an exposure, including an evaluation that a later hook marks as failed.

The SDK deduplicates exposures for each flag and subject. It records an exposure again only when the subject's allocation, variant, or split changes. A repeated evaluation with the same result is a _cache hit_.

## Record exposures with ExposureHook

Create an `ExposureHook` with a callback and register it with OpenFeature. The callback runs for every completed evaluation, including evaluations that error, evaluations that are not exposures, and repeats. Use `shouldSend()` to keep only new exposures.

The callback runs on the evaluation thread, inside your request. Do not write to your data store or do other blocking I/O in the callback. Copy the values you need to a background queue, and write them to your data store from that queue. An error in the callback does not affect the flag evaluation.

{{< tabs >}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import datadog.trace.api.openfeature.ExposureHook;
import dev.openfeature.sdk.OpenFeatureAPI;

BlockingQueue<ExposureRecord> exposures = new LinkedBlockingQueue<>(10_000);

OpenFeatureAPI.getInstance().addHooks(new ExposureHook(evaluation -> {
    if (!evaluation.shouldSend()) {
        return;
    }
    // ExposureRecord is your application's own type.
    exposures.offer(new ExposureRecord(
        Instant.now(),
        evaluation.getContext().getTargetingKey(),
        evaluation.getDetails().getFlagKey(),
        evaluation.getDetails().getFlagMetadata().getString("allocationKey"),
        evaluation.getDetails().getVariant(),
        evaluation.getFeatures()));
}));
// A background thread takes records from `exposures` and writes them to your data store.
{{< /code-block >}}

<div class="alert alert-info">In version 1.68.x, read the allocation key from the flag metadata, under the <code>allocationKey</code> key, as in the example.</div>

Evaluate flags through an OpenFeature client. If you call the Datadog provider directly, the SDK records no exposure.

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="go" >}}
import ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"

exposures := make(chan ExposureRecord, 10000)

client.AddHooks(ddopenfeature.NewExposureHook(func(e ddopenfeature.ExposureEvaluation) {
    if !e.ShouldSend() {
        return
    }
    allocation, _ := e.AllocationKey()
    // ExposureRecord is your application's own type.
    record := ExposureRecord{
        Timestamp:  time.Now(),
        Subject:    e.Context.TargetingKey(),
        Flag:       e.Details.FlagKey,
        Allocation: allocation,
        Variant:    e.Details.Variant,
        Features:   e.Features(),
    }
    select {
    case exposures <- record:
    default:
        // The queue is full. Drop the record instead of blocking the evaluation.
    }
}))
// A background goroutine reads from `exposures` and writes the records to your data store.
{{< /code-block >}}

Create the hook once and reuse it. The callback can run concurrently, so make it safe to call from more than one goroutine.

Do not change `e.Details.Value`. For object flags, the value can share data with the provider. Copy it before you change it or process it in the background.

{{% /tab %}}
{{% tab "Browser" %}}

{{< code-block lang="javascript" >}}
import { ExposureHook } from '@datadog/openfeature-browser'
import { OpenFeature } from '@openfeature/web-sdk'

const exposures = []

OpenFeature.addHooks(
  new ExposureHook((evaluation) => {
    if (!evaluation.shouldSend()) return
    exposures.push({
      timestamp: new Date().toISOString(),
      subject: evaluation.targetingKey,
      flag: evaluation.flagKey,
      allocation: evaluation.allocation,
      variant: evaluation.variant,
      features: evaluation.getFeatures(),
    })
  })
)
// Send the records in `exposures` to your own endpoint in batches, outside the callback.
{{< /code-block >}}

The browser SDK keeps its exposure cache across page loads. When a page reload gives a subject the same result, the evaluation is a cache hit.

{{% /tab %}}
{{< /tabs >}}

### What the callback receives

| Member | Java and browser | Go | Description |
| --- | --- | --- | --- |
| Is exposure | `isExposure()` | `IsExposure()` | `true` when the evaluation succeeded and selected an allocation that logs exposures. Repeats are included. |
| Is cache hit | `isCacheHit()` | `IsCacheHit()` | `true` when the subject already received the same allocation, variant, and split for this flag. |
| Should send | `shouldSend()` | `ShouldSend()` | `true` for a new or changed exposure: an exposure that is not a cache hit. These are the exposures that the SDK sends to Datadog. |
| Split features | `getFeatures()` | `Features()` | The split features attached to the selected split, such as the [holdout fields](#holdout-fields). Empty when the split has none. |
| Evaluation | Java: `getDetails()` and `getContext()`<br>Browser: `details`, `context`, `flagKey`, `variant`, `allocation`, `targetingKey` | `Details`, `Context`, `AllocationKey()` | The flag key, variant, flag metadata, and evaluation context, including the targeting key. |

If you use `isExposure()` instead of `shouldSend()`, deduplicate the records yourself.

## Split features

Split features are values that Datadog attaches to a split of a flag. The hook returns them as a read-only map. Values are strings, numbers, or Booleans.

The same values are also in the evaluation's flag metadata, under keys that start with `__dd_feature.` followed by the feature key, such as `__dd_feature.holdout.key`. A hook that uses only the OpenFeature API can read them there. Read them in the `finally` stage of the hook and skip evaluations that have an error code.

<div class="alert alert-warning">The <code>__dd_feature.&lt;key&gt;</code> entries are the only flag metadata intended for your code. Other flag metadata keys that start with <code>__dd_</code> are internal to the SDK and can change without notice.</div>

### Holdout fields

When a flag is part of a [holdout][5], the selected split carries these split features:

| Feature | Value |
| --- | --- |
| `holdout.key` | The holdout key. |
| `holdout.assignment_group` | `status_quo` or `all_shipped`. |
| `holdout.should_include_in_holdout_analysis` | `true` when the exposure counts in the primary holdout analysis. `false` before a [covered experiment][5] ships a non-control variant. |

## Fields to record

To analyze exposures in Datadog Experiments with an [Exposure SQL Model][6], record at least these fields for each exposure:

| Field | Source |
| --- | --- |
| Timestamp | The time of the evaluation. |
| Subject | The targeting key of the evaluation context. |
| Flag key | The evaluation details. |
| Allocation key | Java 1.68.x: the `allocationKey` flag metadata key. Go: `AllocationKey()`. Browser: `allocation`. |
| Variant | The evaluation details. |
| `holdout.key`, `holdout.assignment_group`, `holdout.should_include_in_holdout_analysis` | The split features, for flags in a holdout. |

To map these columns for a holdout, see [Analyze holdouts with your own exposure data][7].

## Stop sending data to Datadog

You can stop sending exposures to Datadog and still record them yourself. The exposure cache and `ExposureHook` keep working, and `shouldSend()` gives the same results.

### Server SDKs

Set this environment variable on your application. The SDK reads it when it creates the Datadog provider.

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_EXPOSURES_DATADOG_LOGGING_ENABLED=false
{{< /code-block >}}

This setting stops only the exposures sent to Datadog. It does not stop the aggregated flag evaluation events. To stop those events too, set:

{{< code-block lang="bash" >}}
DD_FLAGGING_EVALUATION_COUNTS_ENABLED=false
{{< /code-block >}}

### Browser SDK

Set `trackExposures` to `false` when you create the provider:

{{< code-block lang="javascript" >}}
const provider = new DatadogProvider({
  // ...
  trackExposures: false,
})
{{< /code-block >}}

`trackExposures` replaces the deprecated `enableExposureLogging` option. When both are set, `trackExposures` takes precedence. To also stop the aggregated flag evaluation telemetry, set `enableFlagEvaluationTracking` to `false`.

## Limitations

- **OpenFeature MultiProvider**:
  - Java: Use OpenFeature SDK 1.23.0 or later. With an earlier SDK, a Datadog provider inside a `MultiProvider` sends no exposures to Datadog, and `shouldSend()` is `true` for every exposure.
  - Go and browser: Under a `MultiProvider`, the SDK records no exposures and does not call the `ExposureHook` callback. Flag evaluation is not affected. Register the Datadog provider directly with OpenFeature. In the browser, you can also wrap it in `DatadogDevtools`, the provider wrapper for the [Datadog Browser SDK developer extension][8].
- **Java agent version**: Split features require `dd-java-agent` 1.68.0 or later. With an earlier agent, `getFeatures()` is empty.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/concepts/hooks
[2]: /feature_flags/server/java/
[3]: /feature_flags/server/go/
[4]: /feature_flags/client/javascript/
[5]: /experiments/holdouts/
[6]: /experiments/concepts/exposure_sql/
[7]: /experiments/holdouts/#analyze-holdouts-with-your-own-exposure-data
[8]: /feature_flags/browser_developer_extension/
