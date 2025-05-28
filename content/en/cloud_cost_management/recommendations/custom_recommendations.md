---
title: Custom Recommendations
description: 
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"

---

## Overview

{{< img src="cloud_cost/.png" alt="Configure custom recommendations from the Cloud Cost Settings page." style="width:80%;" >}}

While [CCM Recommendations][1] are designed to be informative and actionable from the start, you can customize recommendations that you receive to fit your specific business use cases and needs. Set your own metric thresholds and evaluation time frames to reduce unnecessary alerts and focus on the recommendations that matter most.

With custom recommendations, you can:
- Configure multiple rules for any default recommendation
- View the history and changes made to your configurations
- Modify, restore, or delete previously set rules

## Customize a recommendation

<div class="alert alert-info">Customizations reflect within 24 hours, when recommendations are generated next.</div>

To access custom recommendations, go to [**Cloud Cost > Settings > Configure Recommendations**][2].

On this page, you can see a list of out-of-the-box recommendations that can be customized.

Click a recommendation, then click **Create New Configuration** to get started.

### Step 1: Set custom metric thresholds

You can determine a value for each metric threshold used to generate recommendations for resources.

Any metric threshold unavailable for customization is grayed out.

### Step 2: Customize the evaluation time frame

Adjust the evaluation time frame to better match your business's seasonality or operational patterns. Options include: 1 week, 2 weeks, 15 days, 3 weeks, 1 month, 2 months, and 3 months.

### Step 3: Apply this rule to all resources or add a filter

You can select whether to apply the rule to **All Resources** or **Some Resources**.

If you choose to apply the rule to **Some Resources**, you can filter resources by their tag - team, service, environment - for more specific parts of your business.

### Step 4: (optional) Label and document the customization

Use this step to add a reason and unique name to your configuration so you can audit and reference this recommendation later.

- **Reason:** Provide a reason for your customization to support future audits and maintain a clear record of changes.
- **Name:** Enter a descriptive name for the configuration to identify and locate this recommendation in the future.

### Step 5: Save the recommendation

Click **Save** to save your customized recommendation.

- Recommendations that have already been customized **once** are labeled **Configured**.
- Recommendations that have been customized **more than once** are labeled with the **number of rules** that are associated with it.

## Updating custom recommendations

You can update a custom recommendation at any time to reflect changes in your business needs.

To update a custom recommendation:

1. Navigate to [**Cloud Cost > Settings > Configure Recommendations**][2].
2. Go to the customized recommendation.
3. Modify the parameters as needed.
4. Click **Save**.
5. In the confirmation popup, click **Yes, save custom parameters** to apply your changes.

## Disabling custom recommendations

Temporarily stop applying a custom recommendation without deleting its configuration.

To disable a custom recommendation:

1. Go to [**Cloud Cost > Settings > Configure Recommendations**][2].
2. Select the customized recommendation.
3. Click the toggle next to the recommendation to disable it.
4. Click **Save**.

## Viewing configuration history

Track changes and review the history of your custom recommendations.

1. Navigate to [**Cloud Cost > Settings > Configure Recommendations**][2].
2. Select the customized recommendation.
3. Click the **History** tab.
4. Review the list of updates, with the most recent at the top.

## Restoring configuration versions

Revert a custom recommendation to a previous version or to its default settings if needed.

{{< img src="cloud_cost/.png" alt="Go to the history tab to revert your rule to a previous version or its default settings." style="width:80%;" >}}

To restore configuration versions:

1. Navigate to [**Cloud Cost > Settings > Configure Recommendations**][2].
2. Go to the customized recommendation.
3. Click the **History** tab.
4. Hover over the version you want to restore and click **Restore this version**.
5. Click **Save**.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/recommendations/
[2]: 