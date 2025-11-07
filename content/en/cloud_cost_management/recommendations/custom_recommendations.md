---
title: Custom Recommendations
description: Learn how to customize and manage custom recommendations to fit your business needs.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/recommendations"
  tag: "Documentation"
  text: "Cloud Cost Recommendations"

---

## Overview

{{< img src="cloud_cost/recommendations/custom-recommendations-without-history.png" alt="Configure custom recommendations from the Cloud Cost Settings page." style="width:100%;" >}}

[CCM Recommendations][1] are designed to be informative and actionable from the start. You can customize these recommendations to fit your specific business use cases and needs. Set your own metric thresholds and evaluation time frames to reduce unnecessary alerts and focus on the recommendations that matter most.

With custom recommendations, you can:
- Configure multiple rules for any default recommendation
- View the history and changes made to your configurations
- Modify, restore, or delete previously set rules
  
## Customize a recommendation

<div class="alert alert-danger">To customize a recommendation, you must be assigned the **Cloud Cost Management - Cloud Cost Management Write** permission. </div>

<div class="alert alert-info">Customizations reflect within 24 hours, when recommendations are generated next.</div>

To access custom recommendations, go to [**Cloud Cost > Settings > Configure Recommendations**][2].

On this page, you can see a list of out-of-the-box recommendations that can be customized.

Click a recommendation, then click **Create New Configuration** to get started.

### Step 1: Set custom metric thresholds

You can set a value for each metric threshold used to generate resource recommendations.

Metric thresholds that cannot be customized appear grayed out.

### Step 2: Customize the evaluation time frame

Adjust the evaluation time frame to match your business's seasonality or operational patterns. Options include: 1 week, 2 weeks, 15 days, 3 weeks, 1 month, 2 months, and 3 months.

### Step 3: Apply this rule to all resources or add a filter

You can select whether to apply the rule to **All Resources** or **Some Resources** in your environment.

If you select **Some Resources**, you can filter resources by tag (for example, `team`, `service`, or `environment`) to target specific parts of your business.

### Step 4: (optional) Label and document the customization

Use this step to add a reason and unique name to your configuration so you can audit and reference this recommendation later.

- **Reason:** Provide a reason for your customization to support future audits and maintain a clear record of changes.
- **Name:** Enter a descriptive name for the configuration to identify and locate this recommendation in the future.

### Step 5: Save the recommendation

Click **Save** to save your customized recommendation. Recommendations that have already been customized **once** are labeled **Configured**.

## Updating custom recommendations

You can update a custom recommendation at any time to reflect changes in your business needs.

To update a custom recommendation:

1. Navigate to [**Cloud Cost > Settings > Configure Recommendations**][2].
2. Go to the customized recommendation.
3. Modify the parameters as needed.
4. Click **Save**.
5. In the confirmation popup, click **Yes, save custom parameters** to apply your changes.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/recommendations/
[2]: https://app.datadoghq.com/cost/settings/configure-recommendations
