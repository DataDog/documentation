---
title: Cloud Cost Management
description: "Use the Cloud Cost Management overlay in Cloudcraft to view resource-level costs and discover savings opportunities directly on your architecture diagrams."
further_reading:
- link: "/datadog_cloudcraft/overlays/infrastructure/"
  tag: "Documentation"
  text: "Infrastructure overlay"
- link: "/datadog_cloudcraft/overlays/observability/"
  tag: "Documentation"
  text: "Observability overlay"
- link: "/datadog_cloudcraft/overlays/security/"
  tag: "Documentation"
  text: "Security overlay"
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

## Overview

The Cloud Cost overlay helps you visualize resource-level costs and identify savings opportunities within your AWS architecture diagrams. This overlay provides two views: **[Cost](#cost-view)** and **[Recommendations](#recommendations-view)**.

## Cost view

The Cost view displays resource-level cloud costs for the last 30 days, allowing you to understand spending patterns across your architecture.

### Filter by cost

Use the slider filter at the bottom of the screen to set a cost range. The diagram updates dynamically to highlight resources within your selected range.

You can also filter by region to focus on specific parts of your infrastructure.

### Resource details

Click a resource to open the side panel, which displays:

- Cost breakdown for the last 30 days
- Tag information associated with the resource
- **Top Cost Changes** section (when applicable) highlighting significant cost fluctuations

**Note**: The time range defaults to the last 30 days and is not configurable.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_ccm_cost_view.png" alt="Cloud Cost Management overlay in Cloudcraft showing the Cost view with resource-level costs." style="width:100%;" >}} 

## Recommendations view

The Recommendations view shows savings opportunities directly on resources with estimated monthly savings (for example, terminate unused RDS instances, migrate storage classes).

Use the filter at the bottom of the screen to narrow recommendations by:

- Potential monthly savings range
- Recommendation type: **Terminate**, **Migrate**, **Downsize**, or **Purchase**

### Resource details

Clicking a resource opens a detailed side panel with:

- Current and projected monthly costs
- A description of recommended changes
- Quick actions to create a Jira issue or support case
- Metrics and usage patterns explaining the recommendation

This enables faster, in-context cost optimization without switching views.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_ccm_overlay_5.png" alt="Cloud Cost Management overlay in Cloudcraft showing the Recommendations view with savings opportunities highlighted." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
