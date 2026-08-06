---
title: Feature Flags and Experiments
description: Learn how a feature flag's targeting rules randomize a Datadog Experiment and record exposures for analysis.
further_reading:
- link: "/experiments/"
  tag: "Documentation"
  text: "Learn about Datadog Experiments"
- link: "/experiments/plan_and_launch_experiments"
  tag: "Documentation"
  text: "Plan and Launch Experiments"
- link: "/experiments/concepts/subject_types"
  tag: "Documentation"
  text: "Subject Types in Experiments"
- link: "/feature_flags/concepts/targeting_rules"
  tag: "Documentation"
  text: "Feature Flags Targeting Rules and Filters"
- link: "/feature_flags/concepts/evaluation_context"
  tag: "Documentation"
  text: "Feature Flags Evaluation Context"
---

## Overview

Datadog Feature Flags is the default way to randomize a [Datadog Experiment][1]. When you link a flag to an experiment, Datadog adds an Experiment targeting rule to the flag. Evaluations of that rule assign subjects to a variant and record an exposure event that Datadog uses to analyze the experiment.

## Link a flag to an experiment

Link a flag to an experiment from either side of the workflow:

- From [{{< ui >}}Product Analytics > Experiments{{< /ui >}}][1], create an experiment and [add an existing feature flag][2] to it.
- From a flag's detail page, click {{< ui >}}Create New Experiment{{< /ui >}} in the {{< ui >}}Targeting Rules & Rollouts{{< /ui >}} section to create an experiment pre-filled with that flag.

## Experiment targeting rules

An experiment targeting rule works like any other [targeting rule][3]: it can include a filter, and it uses the same [deterministic randomization][4] to assign subjects to a variant. Randomization is based on the `targetingKey` in your [evaluation context][5], so the same subject consistently receives the same variant for the life of the experiment.

If multiple experiments share the same flag, Datadog evaluates their targeting rules in order, top to bottom. Reorder the rules before you launch an experiment to control which one takes priority for a given subject.

## Exposures

Each time the SDK evaluates a flag's experiment targeting rule for a subject, Datadog records an _exposure_: the subject, the variant served, and a timestamp. Datadog joins exposures to metric events to calculate the lift between variants. Those metric events can come from Product Analytics, Real User Monitoring, or your data warehouse.

Datadog joins exposures and metrics by subject identifier. The `targetingKey` your SDK sets in the [evaluation context][5] must match the [subject type attribute][6] configured for the experiment, such as `@usr.id`, or Datadog can't associate metric events with the correct exposure.

## Bring your own randomization

If you randomize subjects with a system other than Datadog Feature Flags, this flag-to-experiment integration doesn't apply. Datadog can still analyze the experiment: define an [Exposure SQL Model][7] that reads exposure records from your data warehouse instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/
[2]: /experiments/plan_and_launch_experiments/#add-a-feature-flag
[3]: /feature_flags/concepts/targeting_rules/
[4]: /feature_flags/concepts/traffic_splitting/
[5]: /feature_flags/concepts/evaluation_context/
[6]: /experiments/concepts/subject_types/
[7]: /experiments/concepts/exposure_sql/
