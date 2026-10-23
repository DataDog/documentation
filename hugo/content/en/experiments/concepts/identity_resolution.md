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

Each experiment supports one randomization subject and one additional subject. Adding an additional subject does not change variant assignment or turn multiple randomization subjects into one participant.

## Prerequisites

Before you begin:

- [Connect a data warehouse][1] to Datadog Experiments.
- Configure two distinct [subject types][2]. The examples below use **Anonymous** and **User**.
- Prepare exposure data with the randomization ID, any known additional ID, exposure timestamp, experiment key, and variant.
- Create [warehouse metrics][3] with subject columns that match one or both subject types.
- Use the same warehouse connection for the Exposure SQL Model and Metric SQL Models.
- Create a manually configured experiment without an experiment protocol.

Identity resolution requires warehouse exposures and warehouse metrics. It does not support Product Analytics or RUM metrics queried directly from Datadog.

## Set up identity resolution

### Prepare exposure data

Follow [Create Exposure SQL Models][4] to create a model that returns both identifiers. Adapt this query to the warehouse schema:

```sql
SELECT
  anonymous_id,
  user_id,
  exposed_at,
  experiment_key,
  variant_id
FROM analytics.experiment_exposures
```

1. Click **Run** to preview the query output.
1. Under **Subject columns**, map **Anonymous** to `anonymous_id` and **User** to `user_id`.
1. Map **Timestamp column** to `exposed_at`, **Experiment key column** to `experiment_key`, and **Variant ID column** to `variant_id`.
1. Click **Create exposure SQL model**, or **Update exposure SQL model** when editing an existing model.

The screenshots use synthetic checkout data. The subject named **Anonymous user** corresponds to **Anonymous** in this guide.

{{< img src="experiments/concepts/identity_resolution/exposure-model.png" alt="Exposure SQL Model showing Anonymous user mapped to ANONYMOUS_ID and User mapped to USER_ID, with timestamp, experiment key, and variant mappings." caption="The exposure model maps both anonymous and user IDs. Click Run to refresh the preview before editing the mappings." >}}

Keep exposure rows where `user_id` is null. Removing them excludes participants who have not signed in. If the relationship is stored in another table, use a `LEFT JOIN` to retain unmatched exposures.

Preserve the original exposure timestamp when joining identity data into the model. Replacing it with a sign-in timestamp can exclude metric activity that occurred after exposure but before sign-in.

### Select the experiment subjects

1. [Create a draft experiment][6] and select the warehouse experiment key from the Exposure SQL Model.
1. Under **Calculate metrics by**, click **+** if only one subject selector appears.
1. Select **Anonymous** as the **Randomization subject** and **User** as the **Additional subject**.
1. Verify that the randomization subject matches the identifier used to assign variants.

For a draft without metrics or manually selected subjects, Datadog can preselect both subjects. This requires exactly two distinct subject types in the exposure model and one identifiable as Anonymous. Review these selections before starting the experiment.

Removing the additional subject preserves that choice while the key stays selected. Clearing and reselecting the key can fill both subjects again for a draft without metrics.

Subject roles can be edited while the experiment is a draft. They cannot be changed after the experiment starts.

Changing or removing a subject can make existing metrics incompatible. Review the list in **Remove incompatible metrics?** before clicking **Remove metrics and save**.

### Add metrics and start the experiment

Add warehouse metrics and complete the [experiment setup][6]. The purchase Metric SQL Model maps events to the **User** subject:

{{< img src="experiments/concepts/identity_resolution/purchase-model.png" alt="Purchase revenue Metric SQL Model showing User mapped to USER_ID, EVENT_TS as the timestamp, and REVENUE as a measure." caption="The purchase model maps User to USER_ID and records revenue events. Click Run before editing the mappings." >}}

Each metric uses one subject to match events to exposures:

| Subject types supported by a metric's SQL model | Subject selected for a newly added metric |
|---|---|
| Randomization subject only | Randomization subject |
| Additional subject only | Additional subject |
| Both subjects | Randomization subject |
| Neither subject | The metric is unavailable for selection. |

For example, a click metric that supports only **Anonymous** uses the randomization subject. A purchase metric that supports only **User** uses the additional subject. A metric that supports both uses **Anonymous** when first added; Datadog does not calculate it twice.

Metrics already in the experiment keep their selected subject if it remains compatible. For a ratio metric, both the numerator and denominator must support that subject.

{{< img src="experiments/concepts/identity_resolution/experiment-setup.png" alt="Draft experiment setup with Anonymous user and User subject roles, purchase revenue as the primary metric, and checkout clicks as a secondary metric." caption="In this draft, Anonymous user is the randomization subject and User is the additional subject. Purchase revenue and checkout clicks are selected as decision metrics." >}}

After analysis completes, [review experiment results][5]. Events matched through the additional ID contribute to the original randomization subject's result.

## Example: connect an anonymous exposure to a purchase

Suppose the Exposure SQL Model returns these rows for `checkout_test`. All timestamps in this example are on the same day and use UTC.

| `anonymous_id` | `user_id` | `exposed_at` | `experiment_key` | `variant_id` |
|---|---|---|---|---|
| `anon_123` | `NULL` | `10:00:00` | `checkout_test` | `control` |
| `anon_123` | `user_456` | `10:05:00` | `checkout_test` | `control` |
| `anon_789` | `NULL` | `10:01:00` | `checkout_test` | `treatment` |

The second row connects `user_456` to `anon_123`. The first exposure for `anon_123` remains `10:00:00`.

A purchase Metric SQL Model maps **User** to `user_id` and returns:

| `user_id` | Purchase time | Amount |
|---|---|---:|
| `user_456` | `09:55:00` | 10 |
| `user_456` | `10:02:00` | 30 |
| `user_unlinked` | `10:10:00` | 15 |

### Expected attribution

For a SUM purchase metric with an observation window starting at exposure and ending after `10:10:00`:

- The purchase at `09:55:00` does not contribute to the purchase SUM because it precedes exposure.
- The purchase at `10:02:00` contributes 30 to `anon_123` in control. Attribution starts at the original exposure time, even though the model first shows the ID relationship at `10:05:00`.
- `user_unlinked` contributes no events because the exposure model contains no matching relationship.
- `anon_789` remains in the experiment population with no attributed purchase events. Its purchase SUM is zero.

The experiment still analyzes anonymous participants. The user ID connects metric events to those participants; it does not replace the randomization subject. This example illustrates event attribution, not a statistical conclusion from two participants.

Updated relationships can change historical attribution when results are recalculated. After correcting the exposure data, [update the experiment results][5] and check them again.

## Missing or ambiguous relationships

Datadog resolves relationships using the selected experiment's exposures within its configured exposure date range:

| Relationship in the exposure model | Behavior |
|---|---|
| A randomization ID has no additional ID. | The participant stays in the population but has no attributed events for metrics that require the additional ID. |
| An additional ID appears with multiple randomization IDs. | Datadog selects the randomization ID from the earliest exposure row containing that additional ID. The additional ID contributes to only one participant. |
| Multiple candidate relationships have the same earliest timestamp. | Datadog uses the randomization ID to break the tie deterministically. |
| The selected randomization ID was exposed to multiple variants and is excluded. | Datadog excludes its relationships instead of moving them to another participant. |
| One randomization ID has multiple additional IDs. | Metric events from those IDs contribute to the same randomization subject. |

For shared accounts or devices, check that these rules match the population the experiment is intended to measure. An additional ID shared across participants does not contribute its events to every participant.

## Limitations

- Identity resolution requires warehouse exposures and metrics on the same warehouse connection, and an experiment without a protocol.
- Holdout experiments, sample-size calculations, and interaction-effects analysis are not supported.
- Metric-property breakouts are not supported for ratio metrics whose numerator and denominator use different Metric SQL Models.

## Troubleshooting

| Symptom | What to check |
|---|---|
| The additional subject is missing during setup. | Confirm the Exposure SQL Model maps both subject types under **Subject columns**. Under **Calculate metrics by**, click **+** to add the second selector. |
| A metric is unavailable or shows a subject-type mismatch. | Confirm the Metric SQL Model supports an experiment subject and uses the same warehouse connection. For a ratio metric, check both numerator and denominator models. |
| Expected metric events are missing. | Preview the exposure and metric queries. Check ID values, experiment key, variants, analysis dates, and the metric's observation window. Keep unmatched exposure rows and preserve the original exposure timestamp. |
| A shared ID contributes to an unexpected participant. | Compare exposure rows containing that ID. Check the earliest timestamp, ties, and whether the selected participant was excluded for receiving multiple variants. |
| Results have not changed after correcting a relationship. | [Update the experiment results][5] after the model output includes the corrected relationship, then review the completed results. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/guide/connecting_a_data_warehouse/
[2]: /experiments/concepts/subject_types/
[3]: /experiments/defining_metrics/?tab=warehouse
[4]: /experiments/concepts/exposure_sql/
[5]: /experiments/reading_results/
[6]: /experiments/plan_and_launch_experiments/
