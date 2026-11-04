---
title: Identity Resolution
description: Connect warehouse experiment exposures and metrics recorded under different identifiers while keeping the original randomization subject.
further_reading:
- link: "/experiments/concepts/subject_types/"
  tag: "Documentation"
  text: "Configure subject types"
- link: "/experiments/concepts/exposure_sql/"
  tag: "Documentation"
  text: "Create Exposure SQL Models"
- link: "/experiments/reading_results/"
  tag: "Documentation"
  text: "Read experiment results"
---

## Overview

Use identity resolution when an experiment's exposures and metric events use different identifiers. For example, a visitor enters a checkout experiment with an anonymous ID, then signs in and makes a purchase recorded under a user ID.

An Exposure SQL Model supplies the relationship between those IDs. Datadog connects the purchase to the anonymous participant and computes results using the original randomization subject.

| Subject role | Meaning | Example |
|---|---|---|
| Randomization subject | The identifier used to assign participants to variants and the unit used to analyze results. | Anonymous browser ID |
| Additional subject | A related identifier used to connect metric events to the randomization subject. | Signed-in user ID |

Each experiment supports one randomization subject and one additional subject. Adding an additional subject does not change variant assignment.

## Prerequisites and limitations

Before you begin:

- [Connect a data warehouse][1] to Datadog Experiments.
- Configure two distinct [subject types][2]. The examples on this page use {{< ui >}}Anonymous user{{< /ui >}} and {{< ui >}}User{{< /ui >}}. Your subject type names can differ.
- Prepare exposure data with the randomization ID, any known additional ID, exposure timestamp, experiment key, and variant.
- Create [warehouse metrics][3] with subject columns that match one or both subject types.
- Use the same warehouse connection for the Exposure SQL Model and Metric SQL Models.
- Don't apply an [experiment protocol][7] to the experiment. Identity resolution is not supported for experiments created from a protocol.

Identity resolution requires warehouse exposures and warehouse metrics. It does not support:

- Product Analytics or RUM metrics queried directly from Datadog.
- Holdout experiments, sample-size calculations, or interaction-effects analysis.
- Metric-property breakouts for ratio metrics whose numerator and denominator use different Metric SQL Models.

## Set up identity resolution

### Prepare exposure data

Follow [Create Exposure SQL Models][4] to create a model that returns both identifiers. Adapt this query to your warehouse schema:

```sql
SELECT
  ANONYMOUS_ID,
  USER_ID,
  ASSIGNED_TS,
  EXPERIMENT,
  VARIANT
FROM analytics.experiment_exposures
```

1. Click {{< ui >}}Run{{< /ui >}} to preview the query output.
1. Under {{< ui >}}Subject columns{{< /ui >}}, map {{< ui >}}Anonymous user{{< /ui >}} to `ANONYMOUS_ID` and {{< ui >}}User{{< /ui >}} to `USER_ID`.
1. Map {{< ui >}}Timestamp column{{< /ui >}} to `ASSIGNED_TS`, {{< ui >}}Experiment key column{{< /ui >}} to `EXPERIMENT`, and {{< ui >}}Variant ID column{{< /ui >}} to `VARIANT`.
1. Click {{< ui >}}Create Exposure SQL Model{{< /ui >}}, or {{< ui >}}Update Exposure SQL Model{{< /ui >}} if you're editing an existing model.

The screenshots on this page use sample checkout data. The [connect an anonymous exposure to a purchase](#example-connect-an-anonymous-exposure-to-a-purchase) example uses a smaller dataset with the same column names.

{{< img src="/experiments/concepts/identity_resolution/exposure-model.png" alt="Exposure SQL Model showing Anonymous user mapped to ANONYMOUS_ID and User mapped to USER_ID, with timestamp, experiment key, and variant mappings." caption="The exposure model maps both anonymous and user IDs." style="width:90%;" >}}

Keep exposure rows where `USER_ID` is null. Removing them excludes participants who have not signed in. If the relationship is stored in another table, use a `LEFT JOIN` to retain unmatched exposures.

Preserve the original exposure timestamp when joining identity data into the model. Replacing it with a sign-in timestamp can exclude metric activity that occurred after exposure but before sign-in.

### Select the experiment subjects

1. [Create a draft experiment][6] and select the warehouse experiment key from the Exposure SQL Model.
1. Under {{< ui >}}Calculate metrics by{{< /ui >}}, click {{< ui >}}+{{< /ui >}} if only one subject selector appears.
1. Select {{< ui >}}Anonymous user{{< /ui >}} as the {{< ui >}}Randomization subject{{< /ui >}} and {{< ui >}}User{{< /ui >}} as the {{< ui >}}Additional subject{{< /ui >}}.
1. Verify that the randomization subject matches the identifier used to assign variants.

**Note**: For a draft with no metrics, Datadog might fill in both subjects for you. Check them before you start the experiment. After the experiment starts, subject roles are locked.

Changing or removing a subject can make existing metrics incompatible. Review the list in {{< ui >}}Remove incompatible metrics?{{< /ui >}} before clicking {{< ui >}}Remove metrics and save{{< /ui >}}.

### Add metrics to the experiment

Add warehouse metrics to the experiment. The purchase Metric SQL Model maps {{< ui >}}User{{< /ui >}} to `USER_ID`, uses `EVENT_TS` as the timestamp, and records purchase amounts in `REVENUE`:

{{< img src="/experiments/concepts/identity_resolution/purchase-model.png" alt="Purchase revenue Metric SQL Model showing User mapped to USER_ID, EVENT_TS as the timestamp, and REVENUE as a measure." caption="The purchase model maps User to USER_ID and records revenue events." style="width:90%;" >}}

Each metric uses one subject to match events to exposures:

| Subject types supported by a metric's SQL model | Subject selected for a newly added metric |
|---|---|
| Randomization subject only | Randomization subject |
| Additional subject only | Additional subject |
| Both subjects | Randomization subject |
| Neither subject | The metric is unavailable for selection. |

For example, a click metric that supports only {{< ui >}}Anonymous user{{< /ui >}} uses the randomization subject. A purchase metric that supports only {{< ui >}}User{{< /ui >}} uses the additional subject. A metric that supports both uses {{< ui >}}Anonymous user{{< /ui >}} when first added. Datadog does not calculate it twice.

Metrics already in the experiment keep their selected subject if it remains compatible. For a ratio metric, both the numerator and denominator must support that subject.

{{< img src="/experiments/concepts/identity_resolution/experiment-setup.png" alt="Draft experiment setup with Anonymous user and User subject roles, purchase revenue as the primary metric, and checkout clicks as a secondary metric." caption="In this draft, Anonymous user is the randomization subject and User is the additional subject. Purchase revenue and checkout clicks are selected as decision metrics." style="width:90%;" >}}

### Start the experiment

1. Complete the variant mappings, expected traffic split, and experiment dates in the [experiment setup][6].
1. Click {{< ui >}}Create Experiment{{< /ui >}}. Datadog starts the analysis using the Exposure SQL Model and Metric SQL Models.

After analysis completes, [review experiment results][5]. Events matched through the additional ID contribute to the original randomization subject's result.

## Example: connect an anonymous exposure to a purchase

Suppose the Exposure SQL Model returns these rows for `checkout_test`. All timestamps in this example are on the same day and use UTC.

| `ANONYMOUS_ID` | `USER_ID` | `ASSIGNED_TS` | `EXPERIMENT` | `VARIANT` |
|---|---|---|---|---|
| `anon_123` | `NULL` | `10:00:00` | `checkout_test` | `control` |
| `anon_123` | `user_456` | `10:05:00` | `checkout_test` | `control` |
| `anon_789` | `NULL` | `10:01:00` | `checkout_test` | `treatment` |

The second row connects `user_456` to `anon_123`. The first exposure for `anon_123` remains `10:00:00`.

A purchase Metric SQL Model maps {{< ui >}}User{{< /ui >}} to `USER_ID` and returns:

| `USER_ID` | `EVENT_TS` | `REVENUE` |
|---|---|---:|
| `user_456` | `09:55:00` | 10 |
| `user_456` | `10:02:00` | 30 |
| `user_unlinked` | `10:10:00` | 15 |

### Expected attribution

For a {{< ui >}}Sum of{{< /ui >}} purchase metric with an observation window starting at exposure and ending after `10:10:00`:

- The purchase at `09:55:00` does not contribute to the purchase {{< ui >}}Sum of{{< /ui >}} because it precedes exposure.
- The purchase at `10:02:00` contributes 30 to `anon_123` in control. Attribution starts at the original exposure time, even though the model first shows the ID relationship at `10:05:00`.
- `user_unlinked` contributes no events because the exposure model contains no matching relationship.
- `anon_789` remains in the experiment population with no attributed purchase events. Its purchase {{< ui >}}Sum of{{< /ui >}} is zero.

This example illustrates event attribution, not a statistical conclusion from two participants.

## Missing or ambiguous relationships

Datadog resolves relationships using the selected experiment's exposures within its configured exposure date range:

| Relationship in the exposure model | Behavior |
|---|---|
| A randomization ID has no additional ID. | The participant stays in the population but has no attributed events for metrics that require the additional ID. |
| An additional ID appears with multiple randomization IDs. | Datadog selects the randomization ID from the earliest exposure row containing that additional ID. The additional ID contributes to only one participant. |
| Multiple candidate relationships have the same earliest timestamp. | Datadog uses the randomization ID to break the tie deterministically. |
| The selected randomization ID was exposed to multiple variants and is excluded. | Datadog excludes its relationships instead of moving them to another participant. |
| One randomization ID has multiple additional IDs. | Metric events from those IDs contribute to the same randomization subject. |

For shared accounts or devices, check that these rules match the population the experiment is intended to measure.

Updated relationships can change historical attribution when results are recalculated. After correcting the exposure data, [update the experiment results][8] and check them again.

## Troubleshooting

| Symptom | What to check |
|---|---|
| The additional subject is missing during setup. | Confirm the Exposure SQL Model maps both subject types under {{< ui >}}Subject columns{{< /ui >}}. Under {{< ui >}}Calculate metrics by{{< /ui >}}, click {{< ui >}}+{{< /ui >}} to add the second selector. |
| A metric is unavailable or shows a subject-type mismatch. | Confirm the Metric SQL Model supports an experiment subject and uses the same warehouse connection. For a ratio metric, check both numerator and denominator models. |
| Expected metric events are missing. | Preview the exposure and metric queries. Check ID values, experiment key, variants, analysis dates, and the metric's observation window. Keep unmatched exposure rows and preserve the original exposure timestamp. |
| A shared ID contributes to an unexpected participant. | Compare exposure rows containing that ID. Check the earliest timestamp, ties, and whether the selected participant was excluded for receiving multiple variants. |
| Results have not changed after correcting a relationship. | [Update the experiment results][8] after the model output includes the corrected relationship, then review the completed results. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/guide/connecting_a_data_warehouse/
[2]: /experiments/concepts/subject_types/
[3]: /experiments/defining_metrics/?tab=warehouse
[4]: /experiments/concepts/exposure_sql/
[5]: /experiments/reading_results/
[6]: /experiments/plan_and_launch_experiments/
[7]: /experiments/protocols/
[8]: /experiments/concepts/exposure_sql/#update-schedule
