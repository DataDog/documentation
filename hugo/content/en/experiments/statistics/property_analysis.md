---
title: Treatment Effect Heterogeneity
description: Understand the statistical test behind recommended property breakout charts.
further_reading:
- link: "/experiments/reading_results/#interesting-property-breakouts"
  tag: "Documentation"
  text: "Explore Recommended Property Breakouts"
- link: "/experiments/statistics/cuped/"
  tag: "Documentation"
  text: "CUPED: Variance Reduction Technique"
- link: "/experiments/statistics/multiple_testing_correction/"
  tag: "Documentation"
  text: "Multiple Testing Correction"
---

## Overview

**Treatment effect heterogeneity** means that a treatment's effect differs across groups. For example, a treatment might increase conversion more on mobile devices than on desktop devices.

Datadog tests for these differences to recommend [Interesting property breakouts][1] in the experiment's {{< ui >}}Deep-dive analysis{{< /ui >}} section. It uses properties captured at a subject's first experiment exposure. This differs from [metric property breakouts][2], which filter metric events by their property values.

## How the test works

For each metric and segmentation property, Datadog estimates each treatment's relative lift against the control within each property value. A **joint Wald test** checks whether each treatment's relative lift is the same across those values. The test considers all treatment variants together and accounts for their shared control group.

The test produces one p-value for the metric and property pair. It tests differences in effects across groups, rather than whether a single group's lift differs from zero.

Each property value needs data for the control and every treatment variant. Datadog excludes values with missing data or unstable relative lift estimates. For example, a control mean or ratio denominator near zero can make relative lift unstable. A result requires at least two remaining property values, finite lift estimates, and positive sampling variances.

Recommendations use the latest successful experiment analysis and match the experiment's [CUPED][3] setting.

## Multiple testing correction

For each metric, Datadog applies Bonferroni correction across all properties that produced a p-value with the same CUPED setting. Non-significant results count; skipped tests do not. Each property counts once, regardless of its number of values or treatment variants. A chart qualifies when its p-value is at most `0.05 / number of tested properties`.

This threshold is separate from the optional scorecard correction described in [Multiple Testing Correction][4]. It does not use the experiment's configured confidence level or analysis method.

## Interpret findings

A recommendation indicates evidence that at least one treatment's relative lift differs across property values. The test does not identify which specific pairs of values differ. Open the chart to examine the segment estimates and their uncertainty.

An absent recommendation does not establish equal effects across segments. There may not be enough data to detect a difference.

These findings are exploratory. The correction does not cover comparisons across metrics or repeated analysis runs. Use a planned follow-up experiment to confirm findings before basing a targeting decision on them.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/reading_results/#interesting-property-breakouts
[2]: /experiments/metric_property_breakouts/
[3]: /experiments/statistics/cuped/
[4]: /experiments/statistics/multiple_testing_correction/
