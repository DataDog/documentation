---
title: Concepts
description: Core concepts for configuring subjects, exposures, warehouse queries, and cumulative experiment impact.
---

## Overview

These pages cover foundational Experiments concepts: subject randomization, analysis with external randomization, and warehouse-native query optimization. They also explain how to measure cumulative impact across experiments and the combined effect of shipped changes with holdouts.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/experiments/concepts/subject_types" >}}Subject Types: Configure the units Datadog uses to randomize experiments and join exposures to metrics{{< /nextlink >}}
    {{< nextlink href="/experiments/concepts/exposure_sql" >}}Exposure SQL Models: Supply exposure data from your warehouse for bring-your-own randomization{{< /nextlink >}}
    {{< nextlink href="/experiments/concepts/identity_resolution" >}}Identity Resolution: Connect experiment exposures and metrics recorded under different identifiers{{< /nextlink >}}
    {{< nextlink href="/experiments/concepts/sql_template_variables" >}}SQL Template Variables: Reduce the data scanned by warehouse-native experiment pipelines{{< /nextlink >}}
    {{< nextlink href="/experiments/concepts/cumulative_impact" >}}Cumulative Impact: Aggregate the noise-adjusted effect of experiments run against a metric over time{{< /nextlink >}}
    {{< nextlink href="/experiments/holdouts" >}}Experiment Holdouts: Measure the combined effect of released changes{{< /nextlink >}}
{{< /whatsnext >}}
