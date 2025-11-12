---
title: Reading Experiment Results
description: Learn to read and understand the results of your Experimentation.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/product_analytics/analytics_explorer/"
  tag: "Documentation"
  text: "Analytics Explorer"
---

## Overview 

Once you’ve launched your experiment, you can immediately see the impact on the metrics you’ve selected. You can also add more metrics to your experiment, organize metrics into groups, and view related sessions:

{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}


## Confidence intervals
For each metric you’ll see the average per-subject (typically user) metric value in both control and treatment. You’ll also see the relative lift and the associated confidence interval. The relative lift is defined as:

```
Relative lift = 
(average metric value per treatment subject - average metric value per control subject)/
(average metric value per control subject)
```

The confidence interval around the estimated lift show the range of lifts that could be plausibly supported by the data from the experiment; lifts outside that confidence interval are possible, but unlikely. If the entire confidence interval is above zero, then it is unlikely for the true lift to be zero, or negative: the experiment data indicates that the treatment had a positive effect on that metric (and vice versa if the entire confidence interval is below zero).


## Exploring results 
To dive deeper into experiment results, hover over a metric and click “Chart”. This will give you the option to both view results over time and compare the experiment’s impact across different user segments.

### Time series
The time series chart shows how the percent lift and precision have changed over the duration of the experiment. The relative lift is shown as the center line, and the confidence interval bands are shown in the lower opacity shading.

If there is not enough data to calculate the confidence of a lift, then the bands will be shown in a gradient fading out from the center line.

<!-- [SCREENSHOT OF TIME SERIES RESULTS] -->
{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}


### Segment-level results
You can also measure metric lift grouped by subject-level properties. Subject level properties are based on attributes at initial time of exposure: region, new vs repeat visitor, and so forth. This is useful for understanding when certain cohorts of users reacted differently to the new experience. 

You can view segment-level results in aggregate or as a time series.

<!-- [SCREENSHOT OF SEGMENT VIEW] -->
{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}

<!-- The following page was copied directly from [Eppo’s docs](https://docs.geteppo.com/statistics/sample-size-calculator/mde/) 

Questions: will the Eppo page or the Datadog page be the source of truth? 
- this dictates if we pull this in a a single sourced file or keep it here as a new page in the DD docs.
-->




## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[2]: https://en.wikipedia.org/wiki/Delta_method
[3]: ADD-LINK
[4]: /getting_started/feature_flags/