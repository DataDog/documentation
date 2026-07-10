---
title: Subject Types
description: Configure subject types so Datadog can randomize experiments and join exposures to metrics.
aliases:
  - /experiments/subject_types
  - /experiments/subject_types/
further_reading:
- link: "/experiments/plan_and_launch_experiments"
  tag: "Documentation"
  text: "Plan and Launch Experiments"
- link: "/experiments/defining_metrics/?tab=warehouse"
  tag: "Documentation"
  text: "Create Experiment Metrics From Warehouse Data"
- link: "/experiments/reading_results"
  tag: "Documentation"
  text: "Read Experiment Results"
- link: "/experiments/guide/connecting_a_data_warehouse/"
  tag: "Documentation"
  text: "Connect your data warehouse"
---

## Overview

Use this page to configure subject types, the unit Datadog uses to randomize experiment traffic, such as a user or an organization.

Experiments assign traffic to different variations of an experience and measure outcomes across those groups. Subjects are users by default, but you can define other randomization units.

For a given subject, the Datadog SDK returns the same variant on every evaluation, keeping the experience consistent across sessions and devices.

Subject types also determine how Datadog associates metric events with experiment exposures for statistical analysis.

## Specify the subject identifier in code

When you use the Datadog SDK, pass a unique identifier for the experiment subject as the `targetingKey`:

```js
const evaluationContext = {
    targetingKey: 'user_1234',
};
```

Randomization uses deterministic hashing. Each time the user returns to the application, Datadog assigns the same variant as long as the user remains eligible based on targeting rules.

## Map experiment exposures to metrics

When you [plan an experiment][1], select the appropriate subject type:

{{< img src="/product_analytics/experiment/subject_types/select_subject_type.png" alt="The experiment setup page with the subject type selector above primary metric selection, showing User and Organization options." style="width:80%;" >}}

By default, Datadog includes a **User** subject type. To manage subject types, navigate to **Experiments** > **Settings** > **Subject Types**:

{{< img src="/product_analytics/experiment/subject_types/subject_type_list.png" alt="The Subject Types settings page listing User and Organization subject types." style="width:80%;" >}}

### Warehouse metrics

When you configure [Metric SQL Models][2], map warehouse columns to subject types in the right panel:

{{< img src="/product_analytics/experiment/subject_types/sql_model_setup.png" alt="The Metric SQL Model setup page with warehouse columns mapped to subject types in the right panel." style="width:80%;" >}}

<div class="alert alert-info">If you add a default warehouse column ID on the Subject Types page (for example, <code>user_id</code>), Datadog automatically maps columns with that name to the matching subject type.</div>

Datadog writes experiment exposures to the `g_exposures` table in the output schema you configure when you [connect your warehouse][4]. Datadog joins that table to your Metric SQL on the subject column you mapped above. Values in the subject column must match the `targetingKey` you pass with the Datadog SDK.

For example, if a Metric SQL Model uses a `user_id` column for the experiment subject type, Datadog analyzes results with SQL similar to the following:

```sql
WITH assignments AS (
    -- Assignment deduplication and date filtering omitted for brevity
    SELECT * FROM g_exposures
),
measures AS (
    -- Your Metric SQL Model logic goes here
)
SELECT
    ...
FROM assignments
LEFT JOIN measures
    ON assignments.subject_id = measures.user_id
    AND measures.timestamp BETWEEN assignments.timestamp AND {{experiment_end_timestamp}}
```

### Product Analytics and RUM metrics

Each subject type has an associated **attribute**. Datadog uses this attribute to associate Product Analytics and Real User Monitoring (RUM) data with experiment exposures. The attribute value must match the identifier you pass as `targetingKey`.

For example:

```js
const evaluationContext = {
    targetingKey: 'user_1234',
};

datadogRum.setUser({
    id: 'user_1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
});
```

When Datadog computes experiment results, it joins experiment exposures to Product Analytics and RUM events on the subject type attribute. By default, the analysis includes events that occur between a subject's first exposure and the end of the experiment. Datadog aggregates those events using the metric definition you configured (for example, count or sum), then runs a [statistical analysis][3] for the experiment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /experiments/plan_and_launch_experiments/
[2]: /experiments/defining_metrics/?tab=warehouse#create-a-sql-model
[3]: /experiments/statistics/analysis_methods/
[4]: /experiments/guide/connecting_a_data_warehouse/
