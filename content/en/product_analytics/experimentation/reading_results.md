---
title: Reading Experiment Results
description: Read and understand the results of your Experimentation.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/product_analytics/analytics_explorer/"
  tag: "Documentation"
  text: "Analytics Explorer"
---

## Overview 

After launching your experiment, Datadog immediately begins calculating results for the metrics you selected. You can add additional metrics at any time, organize metrics into groups, and explore related user sessions to understand the impact of each variant.

{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}


## Confidence intervals
For each metric, Datadog shows the average per-subject value (typically per user) for both the control and treatment variants. It also reports the relative lift and the associated confidence interval.

The relative lift is defined as:

```
                      (Average metric value per treatment subject - Average metric value per control subject)
 Relative lift =   -----------------------------------------------------------------------------------------------             
                                       (Average metric value per control subject)
```

The confidence interval represents the range of lift values that are plausibly supported by the experiment’s data. While the true lift could fall outside this range, values inside the interval are statistically more consistent with the observed data.

If the entire confidence interval is above zero, then the result is statistically significant. This suggests that the observed difference in metrics is unlikely to be attributable to random noise, supporting the conclusion that the experiment produced a true effect.

## Exploring results 
To dive deeper into experiment results, hover over a metric and click **Chart**. This gives you the option to compare the experiment’s impact across different user segments.


### Segment-level results
Subject level properties are based on attributes at the initial time of exposure (for example, region, new vistor vs repeat visitor etc.). This is useful for understanding when certain cohorts of users reacted differently to the new experience. 


<!-- [SCREENSHOT OF SEGMENT VIEW] -->
{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}





## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[2]: https://en.wikipedia.org/wiki/Delta_method
[3]: ADD-LINK
[4]: /getting_started/feature_flags/