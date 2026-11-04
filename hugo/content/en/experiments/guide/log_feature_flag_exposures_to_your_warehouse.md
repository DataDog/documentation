---
title: Log Feature Flag Exposures to Your Data Warehouse
description: Use an OpenFeature hook to log Datadog Feature Flags experiment exposures, including the allocation key, to a table in your data warehouse.
further_reading:
- link: "/experiments/concepts/exposure_sql/"
  tag: "Documentation"
  text: "Exposure SQL Models"
- link: "/experiments/concepts/sql_template_variables/"
  tag: "Documentation"
  text: "SQL Template Variables"
- link: "/feature_flags/concepts/experiments/"
  tag: "Documentation"
  text: "Feature Flags and Experiments"
- link: "/experiments/guide/connecting_a_data_warehouse/"
  tag: "Documentation"
  text: "Connect a Data Warehouse"
---

## Overview

Datadog Feature Flags SDKs send experiment exposures to Datadog. If you analyze experiments in your data warehouse, you can also log exposures from your application to a table in your warehouse. An [Exposure SQL Model][1] then reads that table.

Use this guide if one of these conditions applies:

- You use Datadog Feature Flags to randomize an experiment, and you log exposures to your own warehouse table.
- You migrated flags from Eppo, and you keep your own assignment logging.

To log exposures, add an [OpenFeature hook][2] to your application. The hook runs after each flag evaluation. It reads the evaluation details and the flag metadata, and it writes one exposure record.

Each exposure record must contain the **allocation key**. Without the allocation key, Datadog cannot separate a subject in the experiment from a subject that got the same variant from a different targeting rule.

## Allocations and the allocation key

In Datadog, each [targeting rule][3] of a flag in an environment is an _allocation_. An experiment targeting rule is also an allocation. Each allocation has an _allocation key_. After a successful evaluation, the SDK puts the allocation key of the matched allocation in the flag metadata.

Datadog identifies an experiment by its flag key and its allocation key. Subjects can get the same variant from different allocations. In this example, the flag has a targeting rule for VIP users above the experiment targeting rule:

| Subject | Matched allocation | Variant | In the experiment |
|---|---|---|---|
| `user-1` | Experiment targeting rule | `control` | Yes |
| `user-2` | Targeting rule for VIP users | `control` | No |
| `user-3` | Default allocation (no rule matched) | `control` | No |

Only `user-1` is in the experiment. If you log only the flag key and the variant, you cannot find which of these subjects is in the experiment.

### Allocation key and allocation ID

An allocation has an allocation key and an allocation ID. For an allocation that you create in Datadog, both values are UUIDs, but they are different values. Log the allocation key. Datadog exposure events and the `g_exposures` table also use the allocation key.

### Default and override allocations

If no targeting rule matches, the SDK serves the default variant from a default allocation. If you override a flag in an environment, the SDK serves the override variant from an override allocation. These allocations are not experiments. Their keys start with `allocation-default-` and `allocation-override-`.

## Fields to log

Log these fields for each exposure:

| Field | Source | Description |
|---|---|---|
| Flag key | Hook context | The key of the evaluated flag. |
| Allocation key | Flag metadata | The key of the matched allocation. The metadata key name is different for each SDK. See [Metadata key for each SDK](#metadata-key-for-each-sdk). |
| Variant | Evaluation details | The key of the variant that the SDK served. |
| Subject | Evaluation context | The `targetingKey`. This value must match the [subject type][4] of the experiment. |
| Timestamp | Your application | The time of the evaluation, in UTC. |

You can also log other evaluation context attributes, for example a country or a device type. An Exposure SQL Model can map them as split-by properties.

## When to log an exposure

- **Log only successful evaluations.** In most SDKs, the OpenFeature `after` hook runs only when the evaluation succeeds. In some SDKs, `after` also runs when the evaluation returns an error code. The [Metadata key for each SDK](#metadata-key-for-each-sdk) table identifies these SDKs. If the evaluation fails, the SDK returns your default value.
- **Log only records that have an allocation key.** If the allocation key is missing, do not write the record.
- **Use the log flag when the SDK gives it.** Some SDKs put a Boolean `__dd_do_log` value in the flag metadata. When this value is `false`, the evaluation is not an experiment exposure. Do not log it.

### Duplicate exposures

The `after` hook runs on each evaluation. It does not remove duplicate exposures. If your application evaluates a flag for the same subject 100 times, the hook writes 100 records.

Datadog uses the first record for each subject and experiment, so duplicate records do not change experiment results. But duplicate records increase the size of your table and the cost of each analysis run. To decrease the number of records, remove duplicates in your application, for example with a cache of flag key, allocation key, and subject. You can also remove duplicates in your warehouse.

### Exposure hook for Browser

The Browser SDK (`@datadog/openfeature-browser` 2.3.0 and later) includes an `ExposureHook` class. `ExposureHook` reads the flag metadata for you, and it can tell you if an exposure is new:

- Your callback runs after each evaluation, also after errors and repeated evaluations.
- The callback gets an evaluation object with the `flagKey`, `variant`, `allocation`, and `targetingKey` properties.
- The `shouldSend()` method returns `true` only for a new or changed exposure of the subject. Use it to decrease the number of duplicate records.
- The callback does not run if you wrap the Datadog provider in a `MultiProvider`.

{{< code-block lang="javascript" >}}
import { ExposureHook } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

OpenFeature.addHooks(new ExposureHook((evaluation) => {
  if (!evaluation.shouldSend()) {
    return;
  }

  // Your function that sends a row to your warehouse
  writeExposure({
    flagKey: evaluation.flagKey,
    allocationKey: evaluation.allocation,
    variant: evaluation.variant,
    subject: evaluation.targetingKey,
    timestamp: new Date().toISOString(),
  });
}));
{{< /code-block >}}

The callback runs during flag evaluation. Do not write to the network in the callback. Put the record in a queue, and send the queue in the background.

## Metadata key for each SDK

After a successful evaluation, each SDK puts the allocation key in the flag metadata. The metadata key name is different for each SDK:

| SDK | Allocation key | Log flag | Notes |
|---|---|---|---|
| Go | `dd.allocation.key` | `__dd_do_log` | |
| Java | `allocationKey` | `__dd_do_log` | Log only when `__dd_do_log` is `true`. The SDK can leave out `__dd_do_log` when its value is `false`. |
| Node.js | `__dd_allocation_key` | `__dd_do_log` | |
| Python | `allocation_key` | `__dd_do_log` | Also make sure that the variant is not empty. |
| Ruby | `__dd_allocation_key` | Not available | Requires `openfeature-sdk` 0.5.1 or later. In `openfeature-sdk` 0.5.1 to 0.6.2, `after` also runs when the evaluation returns an error code. |
| .NET | `__dd_allocation_key` | Not available | Hooks run only with the asynchronous evaluation methods, for example `GetBooleanDetailsAsync`. |
| Browser and React | `__dd_allocation_key` | `__dd_do_log` | See also [Exposure hook for Browser](#exposure-hook-for-browser). |
| iOS | `allocationKey` | Not available | `after` also runs when the flag is not found. |
| Android | `allocationKey` | Not available | Not set for object flags. `after` also runs when the evaluation returns an error code. |
| PHP | Not available | Not available | See [PHP](#php). |

## Add an exposure hook

Each example defines an OpenFeature hook with an `after` method and registers it at the API level. The hook reads the allocation key from the flag metadata. Then it calls `writeExposure`, which is a function that you supply. Make `writeExposure` put the record in a queue, a log, or a stream that your warehouse reads. Do not write to the warehouse during flag evaluation.

These examples do not remove duplicate exposures. See [Duplicate exposures](#duplicate-exposures).

{{< tabs >}}
{{% tab "Go" %}}

{{< code-block lang="go" >}}
import (
    "context"
    "time"

    "github.com/open-feature/go-sdk/openfeature"
)

type exposureHook struct {
    openfeature.UnimplementedHook
}

func (h exposureHook) After(ctx context.Context, hookContext openfeature.HookContext,
    details openfeature.InterfaceEvaluationDetails, hints openfeature.HookHints) error {
    allocationKey, err := details.FlagMetadata.GetString("dd.allocation.key")
    if err != nil || allocationKey == "" {
        return nil
    }
    if doLog, err := details.FlagMetadata.GetBool("__dd_do_log"); err == nil && !doLog {
        return nil
    }

    // Your function that sends a row to your warehouse
    writeExposure(Exposure{
        FlagKey:       details.FlagKey,
        AllocationKey: allocationKey,
        Variant:       details.Variant,
        Subject:       hookContext.EvaluationContext().TargetingKey(),
        Timestamp:     time.Now().UTC(),
    })
    return nil
}

// Register the hook after you set the Datadog provider
openfeature.AddHooks(exposureHook{})
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import dev.openfeature.sdk.FlagEvaluationDetails;
import dev.openfeature.sdk.Hook;
import dev.openfeature.sdk.HookContext;
import dev.openfeature.sdk.ImmutableMetadata;
import dev.openfeature.sdk.OpenFeatureAPI;
import java.time.Instant;
import java.util.Map;

public class ExposureHook implements Hook<Object> {
    @Override
    public void after(HookContext<Object> ctx, FlagEvaluationDetails<Object> details,
                      Map<String, Object> hints) {
        ImmutableMetadata metadata = details.getFlagMetadata();
        String allocationKey = metadata.getString("allocationKey");
        if (allocationKey == null || allocationKey.isEmpty()) {
            return;
        }
        if (!Boolean.TRUE.equals(metadata.getBoolean("__dd_do_log"))) {
            return;
        }

        // Your method that sends a row to your warehouse
        writeExposure(
            details.getFlagKey(),
            allocationKey,
            details.getVariant(),
            ctx.getCtx().getTargetingKey(),
            Instant.now());
    }
}

// Register the hook after you set the Datadog provider
OpenFeatureAPI.getInstance().addHooks(new ExposureHook());
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/server-sdk';

const exposureHook = {
  after(hookContext, evaluationDetails) {
    const metadata = evaluationDetails.flagMetadata;
    const allocationKey = metadata.__dd_allocation_key;
    if (!allocationKey || metadata.__dd_do_log === false) {
      return;
    }

    // Your function that sends a row to your warehouse
    writeExposure({
      flagKey: hookContext.flagKey,
      allocationKey,
      variant: evaluationDetails.variant,
      subject: hookContext.context.targetingKey,
      timestamp: new Date().toISOString(),
    });
  },
};

// Register the hook after you set the Datadog provider
OpenFeature.addHooks(exposureHook);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from datetime import datetime, timezone

from openfeature import api
from openfeature.hook import Hook


class ExposureHook(Hook):
    def after(self, hook_context, details, hints):
        metadata = details.flag_metadata or {}
        allocation_key = metadata.get("allocation_key")
        if not allocation_key or not details.variant:
            return
        if metadata.get("__dd_do_log") is False:
            return

        # Your function that sends a row to your warehouse
        write_exposure(
            flag_key=hook_context.flag_key,
            allocation_key=allocation_key,
            variant=details.variant,
            subject=hook_context.evaluation_context.targeting_key,
            timestamp=datetime.now(timezone.utc),
        )


# Register the hook after you set the Datadog provider
api.add_hooks([ExposureHook()])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="ruby" >}}
class ExposureHook
  include OpenFeature::SDK::Hooks::Hook

  def after(hook_context:, evaluation_details:, hints:)
    # Required for openfeature-sdk 0.5.1 to 0.6.2
    return unless evaluation_details.error_code.nil?

    allocation_key = (evaluation_details.flag_metadata || {})['__dd_allocation_key']
    return if allocation_key.nil? || allocation_key.empty?

    # Your method that sends a row to your warehouse
    write_exposure(
      flag_key: hook_context.flag_key,
      allocation_key: allocation_key,
      variant: evaluation_details.variant,
      subject: hook_context.evaluation_context&.targeting_key,
      timestamp: Time.now.utc
    )
  end
end

# Register the hook after you set the Datadog provider
OpenFeature::SDK.hooks << ExposureHook.new
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

{{< code-block lang="csharp" >}}
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OpenFeature;
using OpenFeature.Model;

public class ExposureHook : Hook
{
    public override ValueTask AfterAsync<T>(HookContext<T> context, FlagEvaluationDetails<T> details,
        IReadOnlyDictionary<string, object>? hints = null, CancellationToken cancellationToken = default)
    {
        var allocationKey = details.FlagMetadata?.GetString("__dd_allocation_key");
        if (!string.IsNullOrEmpty(allocationKey))
        {
            // Your method that sends a row to your warehouse
            WriteExposure(
                context.FlagKey,
                allocationKey,
                details.Variant,
                context.EvaluationContext.TargetingKey,
                DateTimeOffset.UtcNow);
        }
        return default;
    }
}

// Register the hook after you set the Datadog provider
Api.Instance.AddHooks(new ExposureHook());
{{< /code-block >}}

{{% /tab %}}
{{% tab "Browser and React" %}}

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/web-sdk';

const exposureHook = {
  after(hookContext, evaluationDetails) {
    const metadata = evaluationDetails.flagMetadata;
    const allocationKey = metadata.__dd_allocation_key;
    if (!allocationKey || metadata.__dd_do_log === false) {
      return;
    }

    // Your function that sends a row to your warehouse
    writeExposure({
      flagKey: hookContext.flagKey,
      allocationKey,
      variant: evaluationDetails.variant,
      subject: hookContext.context.targetingKey,
      timestamp: new Date().toISOString(),
    });
  },
};

// Register the hook after you set the Datadog provider
OpenFeature.addHooks(exposureHook);
{{< /code-block >}}

To remove duplicate exposures in the browser, you can use the [exposure hook for Browser](#exposure-hook-for-browser) instead.

{{% /tab %}}
{{% tab "iOS" %}}

{{< code-block lang="swift" >}}
import Foundation
import OpenFeature

final class ExposureHook: Hook {
    typealias HookValue = Bool

    // Run this hook for flags of all types
    func supportsFlagValueType(flagValueType: FlagValueType) -> Bool {
        true
    }

    func after<HookValue>(ctx: HookContext<HookValue>, details: FlagEvaluationDetails<HookValue>,
                          hints: [String: Any]) {
        guard let allocationKey = details.flagMetadata["allocationKey"]?.asString(),
              !allocationKey.isEmpty else {
            return
        }

        // Your function that sends a row to your warehouse
        writeExposure(
            flagKey: ctx.flagKey,
            allocationKey: allocationKey,
            variant: details.variant,
            subject: ctx.ctx?.getTargetingKey(),
            timestamp: Date()
        )
    }
}

// Register the hook after you set the Datadog provider
OpenFeatureAPI.shared.addHooks(hooks: ExposureHook())
{{< /code-block >}}

{{% /tab %}}
{{% tab "Android" %}}

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.FlagEvaluationDetails
import dev.openfeature.kotlin.sdk.Hook
import dev.openfeature.kotlin.sdk.HookContext
import dev.openfeature.kotlin.sdk.OpenFeatureAPI

class ExposureHook : Hook<Any> {
    override fun after(ctx: HookContext<Any>, details: FlagEvaluationDetails<Any>, hints: Map<String, Any>) {
        if (details.errorCode != null) return
        val allocationKey = details.metadata.getString("allocationKey")
        if (allocationKey.isNullOrEmpty()) return

        // Your function that sends a row to your warehouse
        writeExposure(
            flagKey = ctx.flagKey,
            allocationKey = allocationKey,
            variant = details.variant,
            subject = ctx.ctx?.getTargetingKey(),
            timestampMillis = System.currentTimeMillis()
        )
    }
}

// Register the hook after you set the Datadog provider
OpenFeatureAPI.addHooks(listOf(ExposureHook()))
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Map the logged columns to an Exposure SQL Model

For an experiment that uses Datadog Feature Flags, the experiment key is the flag key, a hyphen, and the allocation key:

```text
<FLAG_KEY>-<ALLOCATION_KEY>
```

Map the **Experiment ID** field of the [Exposure SQL Model][1] to a column with this value. Do not map Experiment ID to the flag key alone. A flag key alone includes evaluations from all allocations of the flag.

| Logged field | Exposure SQL Model field |
|---|---|
| Subject (`targetingKey`) | Subject Key |
| Timestamp | Timestamp |
| Flag key and allocation key | Experiment ID, as `<FLAG_KEY>-<ALLOCATION_KEY>` |
| Variant | Variant ID |
| Other context attributes | Split-by properties |

This example makes the experiment key from two logged columns. It uses [SQL template variables][5] to read only the exposures for the experiment that Datadog analyzes:

```sql
SELECT
  subject_id,
  exposed_at,
  flag_key || '-' || allocation_key AS experiment_id,
  variant AS variant_id,
  allocation_key
FROM analytics.flag_exposures
WHERE flag_key || '-' || allocation_key = {{experiment_key}}
  AND exposed_at BETWEEN '{{analysis_start_timestamp}}' AND '{{analysis_end_timestamp}}'
```

You can also write the experiment key to its own column when you log the exposure.

If you use a [selective holdout][6], also map the `allocation_key` column to the **Allocation key column** field.

## Flags migrated from Eppo

If you migrated flags from Eppo with the [Flag Migration CLI][7], make sure that your hook logs the Datadog allocation key:

- Read the allocation key from the metadata key for your SDK in the [Metadata key for each SDK](#metadata-key-for-each-sdk) table. Flags migrated from Eppo can also contain other metadata values from Eppo. Do not log these values as the allocation key.
- For flags that keep Eppo bucketing, the migration can change the allocation key to `<EPPO_ALLOCATION_KEY>-<ENVIRONMENT>`. If the Eppo allocation had no key, the new key is `<FLAG_KEY>-<ENVIRONMENT>-<EPPO_ALLOCATION_ID>`.
- Exposures that you logged with Eppo can have a different allocation key from exposures that you log with Datadog. Do not join old Eppo records and new Datadog records on the allocation key.

## PHP

Logging exposures with an OpenFeature hook is not supported in PHP yet. The PHP OpenFeature provider (`DDTrace\OpenFeature\DataDogProvider`) does not set flag metadata, so a hook cannot read the allocation key.

As a workaround, evaluate the flag with the [Datadog PHP API][8] (`DDTrace\FeatureFlags\Client`). Then read the allocation key from the `getExposureData()` method of the evaluation details:

{{< code-block lang="php" >}}
<?php

use DDTrace\FeatureFlags\Client;

$flags = new Client();

$context = [
    'targetingKey' => 'user-123',
    'attributes' => [
        'country' => 'US',
    ],
];

$details = $flags->getStringDetails('checkout-flow', 'control', $context);
$exposure = $details->getExposureData();

if (!$details->isError()
    && !empty($exposure['allocationKey'])
    && !empty($exposure['doLog'])) {
    // Your function that sends a row to your warehouse
    write_exposure([
        'flag_key' => 'checkout-flow',
        'allocation_key' => $exposure['allocationKey'],
        'variant' => $details->getVariant(),
        'subject' => $context['targetingKey'],
        'timestamp' => gmdate('Y-m-d\TH:i:s\Z'),
    ]);
}
{{< /code-block >}}

`getExposureData()` returns an empty array when the evaluation fails or returns the default value.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/concepts/exposure_sql/
[2]: https://openfeature.dev/docs/reference/concepts/hooks
[3]: /feature_flags/concepts/targeting_rules/
[4]: /experiments/concepts/subject_types/
[5]: /experiments/concepts/sql_template_variables/
[6]: /experiments/holdouts/#analyze-holdouts-with-your-own-exposure-data
[7]: /feature_flags/guide/migrate_flags_with_cli/
[8]: /feature_flags/server/php/
