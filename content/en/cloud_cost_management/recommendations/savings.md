---
title: Savings
description: Learn how to track net savings to inform your cost savings initiatives.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/recommendations"
  tag: "Documentation"
  text: "Cloud Cost Recommendations"

---

## Overview

The CCM Recommendations Savings tab gives you visibility into how your savings opportunities change over time. This information can be useful for tracking cost saving initiatives. The Savings tab visualizes two kinds of savings values:

- The **potential daily savings** is an estimate of the amount of money you would save each day moving forward if, at the time the estimate was calculated, you were to implement the top recommendation for every resource selected.
  - Example: The potential daily savings on June 1 is $100 for a set of resources. If you implemented the top recommendations for every resource on June 1, you would save an estimated $100 per day from then onward.

- For a given set of resources over a time frame, the **net daily savings** is an estimate of the amount of money you are saving each day, compared to what you were saving at the beginning of the time frame. This number is positive when more savings have been realized than discovered, and negative when the reverse is true.
  - Example: In the example above, if you made no further changes by June 30, then the net daily savings from June 1 to June 30 would be $100 for that set of resources. Then, if by the end of July, the only change was that $150 of unused resources were discovered, the net daily savings from June 1 to July 31 would be -$50.
 
## Widget Guide
 
The Savings tab represents **potential daily savings** and **net daily savings** in three widgets:

- The **Net Daily Savings** widget shows the net daily savings across all resources from the beginning to the end of the selected time frame.
- The **Potential Daily Savings Over Time** widget graphs the potential daily savings calculated each day during the time frame. The difference between the first and last bars has the same absolute value as the net daily savings in the previous widget.
- The **Net Daily Savings by Group** widget provides more granular visibility into the net daily savings, allowing you to group savings by tags of your choice.

{{< img src="cloud_cost/recommendations/savings-page-ui.png" alt="Cloud Cost Recommendations Savings Page." style="width:100%;" >}}

<div class="alert alert-info">**Filter and Group By:** When tracking a specific cost initiative, the Savings tab is most useful when you filter and group by the resources and tags that your cost initiative targets. For example: one team may be causing more recommendations to be generated, increasing your overall potential daily savings value. This might cancel out any specific savings initiatives you might have for other teams. In this case, you may wish to filter by team to track the progress of a team-specific cost initiative. Suggested tags are provided in the filter and group by options, but you can also enter your tag of choice as needed.</div>

<div class="alert alert-info">**Clone Dashboard and Schedule Report:** Sharing data from the Savings tab can also help propel your cost savings initiatives. With the Clone button, you can copy these widgets into an editable dashboard. You can also use the Schedule Report feature to receive regular updates on the status of your savings.</div>

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/recommendations/
[2]: https://app.datadoghq.com/cost/settings/configure-recommendations
