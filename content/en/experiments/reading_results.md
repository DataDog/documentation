---
title: Read Experiment Results
description: Read and understand the results of your experiments.
aliases:
  - /product_analytics/experimentation/reading_results/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/product_analytics/analytics_explorer/"
  tag: "Documentation"
  text: "Analytics Explorer"
---

{{< jqmath-vanilla >}}

## Overview 

After [launching an experiment][2], use this page to interpret your metrics, assess statistical significance, and explore results across user segments.

{{< img src="/product_analytics/experiment/exp_reading_exps_overview.png" alt="The experiment results overview showing a decision metrics table with control and treatment values, relative lift, and confidence interval bars for three metrics." style="width:90%;" >}}

## Confidence intervals

The confidence interval represents the range of lift values the experiment's data can support. While the true lift can fall outside this range, values inside the interval are statistically more consistent with the observed data.

Datadog also reports the relative lift and its associated confidence interval. Datadog calculates the relative lift as:

$$(\text"Average metric value per treatment subject – Average metric value per control subject") / {\text"Average metric value per control subject"}$$

After you launch your experiment, Datadog begins to calculate results for your selected metrics. For each metric, Datadog shows the average per-subject value for both the control and treatment variants. The per-subject value uses the [subject type][3] you are using for your experiment. The default subject type is **User**.

If the confidence interval is above zero, the result is statistically significant. This suggests that the observed difference in metrics is unlikely to be attributable to random noise but that the experiment produced a true effect.

## Exploring results 
You can add additional metrics, organize metrics into groups, and explore related user sessions to understand the impact of each variant. To dive deeper into a specific metric, hover over it and click **Chart**. This gives you the option to compare the experiment’s impact across different user segments.

### Segment-level results
Each experiment subject (for example, a user) has properties captured at the time of exposure, such as region, device type, or visitor status. Subjects that share a property form a segment. Use segment-level results to understand whether specific groups of users reacted differently to the new experience.


{{< img src="/product_analytics/experiment/exp_segment_view.png" alt="Segment-level view of a metric split by Country ISO Code, showing a bar chart of relative lift and a data table with control and treatment values per country." style="width:90%;" >}}


## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/
[2]: /experiments/plan_and_launch_experiments
[3]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types