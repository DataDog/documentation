---
title: Cloud Cost Management
description: "Use the Cloud Cost Management overlay in Cloudcraft to discover savings opportunities with cost recommendations shown directly on resources."
further_reading:
- link: "/datadog_cloudcraft/overlays/"
  tag: "Documentation"
  text: "Learn about Cloudcraft overlays"
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

## Overview

The Cloud Cost overlay helps you identify and act on savings opportunities within your AWS architecture diagrams.

In this view:

- Recommendations are shown directly on resources with estimated monthly savings (for example, terminate unused RDS instances, migrate storage classes).
- Use the filter at the bottom of the screen to narrow recommendations by potential monthly savings range and recommendation type (**Terminate**, **Migrate**, **Downsize**, **Purchase**).

## Resource details

Clicking a resource opens a detailed side panel with:

- Current and projected monthly costs.
- A description of recommended changes.
- Quick actions to create a Jira issue or support case.
- Metrics and usage patterns explaining the recommendation.

This enables faster, in-context cost optimization without switching views.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_ccm_overlay_4.png" alt="Cloud Cost Management (CCM) overlay in Cloudcraft, highlighting the recommendations option in the collapsible legend at the bottom left hand side of the screen." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

