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

Use identity resolution when an experiment's exposures and outcomes use different identifiers. For example, a visitor enters a checkout experiment with an anonymous ID, then signs in and makes a purchase recorded under a user ID.

Identity resolution connects those records through an Exposure SQL Model. The experiment keeps its original randomization subject and includes metrics recorded under the related identity.

| Subject role | Purpose | Example |
|---|---|---|
| Randomization subject | The identifier used to assign participants to variants. This remains the unit of analysis. | Anonymous browser ID |
| Additional subject | A related identifier used to connect metric events to the randomization subject. | Signed-in user ID |

An experiment supports one randomization subject and one additional subject. Adding a subject does not change how participants are randomized.

## Prerequisites

Before you begin:

- [Connect a data warehouse][1] to Datadog Experiments.
- Create two distinct [subject types][2], such as **Anonymous** and **User**.
- Prepare warehouse exposure data that includes both identifiers when their relationship is known, along with the exposure timestamp, experiment key, and variant.
- Create [warehouse metrics][3] with subject columns that match one or both of those subject types.
- Use a manually configured experiment without an experiment protocol.

Identity resolution uses warehouse exposures and warehouse metrics. Product Analytics and RUM metrics queried directly from Datadog are not supported.

## Prepare exposure data

Create an [Exposure SQL Model][4] that returns both identifiers. Adapt this query to the warehouse schema:

```sql
SELECT
  anonymous_id,
  user_id,
  exposed_at,
  experiment_key,
  variant_id
FROM analytics.experiment_exposures
```

The model's output supplies the relationship between the identifiers. If relationships are stored in a separate warehouse table, use a `LEFT JOIN` to include them without removing unmatched exposures.

1. Run the query to preview its output.
1. Under **Subject columns**, map **Anonymous** to `anonymous_id` and **User** to `user_id`.
1. Map `exposed_at` to the timestamp, `experiment_key` to the experiment identifier, and `variant_id` to the variant identifier.
1. Save the model.

For example, the output for one participant in the same experiment and variant could contain these rows:

| `anonymous_id` | `user_id` | `exposed_at` |
|---|---|---|
| `anon_123` | `NULL` | `2026-10-01 10:00:00` |
| `anon_123` | `user_456` | `2026-10-01 10:05:00` |

The second row connects `user_456` to `anon_123`. Keep the first row, even though `user_id` is null. Filtering out rows without a user ID removes participants who have not signed in from the experiment population.

Preserve the original exposure timestamp when joining identity data into the model. Datadog attributes metric activity from that exposure time, rather than the time the relationship between IDs became known.

## Select the subjects

1. Create a draft experiment and select the warehouse experiment key from the Exposure SQL Model.
1. Under **Calculate metrics by**, select **Anonymous** as the **Randomization subject** and **User** as the **Additional subject**. If only one selector appears, click **+** to add the additional subject.
1. Verify that the randomization subject matches the identifier used to assign variants in the experiment.
1. Add warehouse metrics and complete the experiment setup.
1. After analysis completes, [review results][5] for metrics using each subject.

Datadog can preselect both subjects for a draft without metrics. This requires exactly two subject types in the exposure model and an unambiguous Anonymous subject. Review the selections before starting the experiment.

Removing the additional subject keeps that choice while the experiment key stays selected. Clearing and reselecting the key can restore automatic selection for a draft without metrics.

Subject roles can be edited while the experiment is a draft. They cannot be changed after the experiment starts.

## Choose metrics

Each metric uses one subject to match metric events to exposures. Datadog selects a compatible subject from the metric's SQL model:

| Subjects supported by a new metric | Subject used |
|---|---|
| Randomization subject only | Randomization subject |
| Additional subject only | Additional subject |
| Both subjects | Randomization subject |

Metrics already added to the experiment keep their existing subject if it remains compatible. Adding a metric that supports both subjects does not calculate it twice.

For example, anonymous click events can use the randomization subject, while purchase events recorded under `user_id` can use the additional subject. Datadog connects the purchase events to their randomization subject before computing experiment results.

For ratio metrics, both the numerator and denominator must support the selected subject. A metric that supports neither experiment subject is unavailable for selection.

## Review identity relationships

The quality of the relationships in the exposure model affects which metric events Datadog can attribute:

- Participants without a matching additional ID remain in the experiment population, but have no attributed events for metrics that require that ID.
- If one additional ID appears with multiple randomization IDs, Datadog uses the pair with the earliest exposure timestamp in the model output. If timestamps are equal, Datadog breaks the tie using the randomization ID. The additional ID contributes to only one participant.
- If that first randomization ID is excluded because it received multiple variants, Datadog excludes the relationship instead of assigning it to another participant.
- Multiple additional IDs can contribute metric activity to one randomization subject. Datadog aggregates that activity back to the original unit of analysis.

Review the Exposure SQL Model's output when expected metric events are missing or identifiers represent shared accounts or devices. Use identifiers that reflect the populations the experiment is intended to measure.

## Limitations

- Sample-size calculations and interaction-effects analysis are not supported for experiments with identity resolution.
- Metric-property breakouts are not supported for ratio metrics whose numerator and denominator use different Metric SQL Models.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/guide/connecting_a_data_warehouse/
[2]: /experiments/concepts/subject_types/
[3]: /experiments/defining_metrics/?tab=warehouse
[4]: /experiments/concepts/exposure_sql/
[5]: /experiments/reading_results/
