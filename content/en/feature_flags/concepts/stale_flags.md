---
title: Stale Flags
description: 'Identify and clean up stale feature flags to reduce flag debt.'
further_reading:
    - link: '/feature_flags/concepts/flag_history'
      tag: 'Documentation'
      text: 'Feature Flag History'
    - link: '/feature_flags/concepts/variants_and_flag_types'
      tag: 'Documentation'
      text: 'Variants and Flag Types'
    - link: '/feature_flags/'
      tag: 'Documentation'
      text: 'Learn about Feature Flags'
---

## Overview

Creating feature flags is straightforward, but decommissioning them is not. Over time, unused or fully rolled-out flags accumulate into **flag debt** that increases cognitive load, complicates code paths, and raises the risk of incidents when stale logic interacts with new code. Datadog automatically detects stale flags, surfaces them in the UI, and provides in-product actions to help you resolve them.

## How Datadog detects stale flags

A flag is evaluated for staleness only if it is not archived, not marked as permanent, and not tied to a running experiment. A flag is marked `STALE` when any of the following signals are true:

- **Fully rolled out**: The same variant has been served to 100% of traffic in all production environments for the past 30 days. This indicates the flag is behaving like static code and may no longer provide value as a runtime control.
- **No evaluations**: No evaluation events have been recorded for the flag in the past 30 days across all environments. This may indicate that the flag is no longer referenced in your application code.
- **No activity**: The flag has not been modified in the past 30 days across all environments. This may indicate that the rollout has been deprioritized or completed.

**Note**: Evaluation logging is not supported by every SDK, and some customers opt out. As a result, the **No evaluations** signal is a strong but imperfect indicator that a flag is ready to be archived.

## View stale flags in the flag list

The [Feature Flags list page][1] shows a {{< ui >}}STALE{{< /ui >}} chip next to each flag that Datadog has identified as stale. Hover over the chip to see which signal triggered it.

- Use the {{< ui >}}Stale Flags{{< /ui >}} toggle to narrow the list to stale flags only.
- Filter by team to see the flag debt your team is responsible for.

{{< img src="feature_flags/stale_flag_chip.png" alt="Feature flag list view showing the STALE chip and staleness filter." style="width:100%;" >}}

## Review a stale flag

When you open a stale flag, a banner at the top of the flag details page explains why the flag is considered stale and recommends actions to resolve it. The banner highlights one **primary suggestion** based on the highest-confidence signal and the lowest-risk action, and provides additional secondary actions.

{{< img src="feature_flags/stale_flag_banner-2.png" alt="Stale banner on the feature flag details page with recommended actions." style="width:100%;" >}}

## Manage stale flags

### Generate a removal PR with Bits

From the stale banner, select {{< ui >}}Generate Removal PR with Bits{{< /ui >}} to open a pull request that removes the flag-gating logic from your application code. This is the recommended action when the flag is fully rolled out and is still receiving evaluation traffic.

**Note**: Remove the flag from your code and deploy the change before you archive the flag. Archiving a flag that is still referenced in code can cause unexpected behavior in your application.

{{< img src="feature_flags/generate_removal_pr-2.png" alt="Generate Removal PR with Bits modal." style="width:60%;" >}}

### Archive the flag

Archiving marks the flag as inactive so it is no longer evaluated or editable. Archive a flag after you have removed its references from application code and confirmed it is no longer receiving evaluation traffic. Archiving a flag requires approval and cancels any experiments running on the flag.

### Mark as permanent

Some flags are intentionally long-lived, such as kill switches or permission gates. Select {{< ui >}}Mark as Permanent{{< /ui >}} on the stale banner to designate a flag as a permanent operational control and exclude it from future stale detection. Permanent flags show a {{< ui >}}Permanent{{< /ui >}} indicator in the flag details sidebar.

{{< img src="feature_flags/mark_as_permanent-2.png" alt="Feature flag marked as Permanent on the flag details page." style="width:35%;" >}}

### Dismiss for 30 days

If a flag is temporarily inactive or cleanup is intentionally deferred, select {{< ui >}}Dismiss for 30 days{{< /ui >}} to silence the staleness indicator. The flag is re-evaluated for staleness after 30 days, so you do not need to manually reverse the dismissal.

## Permissions

The `FeatureFlagConfigWrite` permission is required to mark a flag as permanent. Archiving a flag also requires `FeatureFlagConfigWrite`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/feature-flags
