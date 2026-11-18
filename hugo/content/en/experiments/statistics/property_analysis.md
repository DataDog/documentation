---
title: Property Analysis
description: Understand how Datadog recommends charts where experiment lift differs across segmentation property values.
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

Property analysis finds differences in treatment effects across segmentation property values. These differences are called **effect heterogeneity**. For example, a treatment might increase conversion more on mobile devices than on desktop devices.

The analysis powers [Interesting property breakouts][1] in the experiment's {{< ui >}}Deep-dive analysis{{< /ui >}} section. It uses properties captured at a subject's first experiment exposure. This differs from [metric property breakouts][2], which filter metric events by their property values.

## How the test works

For each metric and segmentation property, Datadog estimates each treatment's relative lift against the control within each property value. A **joint Wald test** checks whether each treatment's relative lift is the same across those values. The test considers all treatment variants together and accounts for their shared control group.

The test produces one p-value for the metric and property pair. A smaller p-value means stronger evidence that relative lift differs across property values. This is a test of differences in effects, rather than a test of whether a single segment's lift differs from zero.

Each property value needs data for the control and every treatment variant. Datadog excludes values with missing data or unstable relative lift estimates. For example, a control mean or ratio denominator near zero can make relative lift unstable. A result requires at least two remaining property values, finite lift estimates, and positive sampling variances.

Recommendations use the latest successful experiment analysis and match the experiment's [CUPED][3] setting.

## Multiple testing correction

Testing many properties increases the chance of a **false positive**: a reported difference caused by sampling noise. Datadog applies **Bonferroni correction** by dividing the starting significance threshold of `0.05` by the number of properties tested for a metric:

```
Significance threshold = 0.05 / number of tested properties
```

The count includes properties with a computed test for that metric and CUPED setting. Each property counts as one comparison, regardless of its number of values or the number of treatment variants. Datadog recommends a chart when its p-value is less than or equal to this threshold.

For example, if Datadog tests 10 properties for a metric, the threshold is `0.005`.

This correction is separate from the experiment's optional [multiple testing correction][4] for scorecard confidence intervals. Property analysis uses a starting threshold of `0.05`, independent of the experiment's configured confidence level and analysis method.

## Interpret findings

A recommendation indicates evidence that at least one treatment's relative lift differs across property values. The test does not identify which specific pairs of values differ. Open the chart to examine the segment estimates and their uncertainty.

An absent recommendation does not establish equal effects across segments. A property can have too little usable data to detect a difference.

Treat these findings as hypotheses for further investigation. The correction covers properties tested for one metric in one analysis run. It does not cover comparisons across metrics or repeated analysis runs. Use a planned follow-up experiment to confirm findings before basing a targeting decision on them.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/reading_results/#interesting-property-breakouts
[2]: /experiments/metric_property_breakouts/
[3]: /experiments/statistics/cuped/
[4]: /experiments/statistics/multiple_testing_correction/
