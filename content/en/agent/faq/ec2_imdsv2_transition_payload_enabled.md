---
title: IMDSv2 Enablement by Default
aliases:
  - /ec2_imdsv2_transition_payload_enabled
---

# IMDSv2 Enablement by Default – What You Need to Know

With the release of Agent v7.64.0, Datadog now defaults to using IMDSv2 for enhanced security and consistency in retrieving AWS metadata. This update may result in a change to how hostnames appear in the Datadog UI. Thus your metrics and alerts continue to work as before.

## What’s Changing?

- **Improved Security:**
  The Agent now uses IMDSv2 by default, which strengthens how metadata are accessed on AWS.

- **Hostname Display in the UI:**
  You might notice that in some areas (such as Fleet Automation or the Infrastructure list) the hostname now appears as the AWS instance ID instead of the previous format.
  **Note:** This change is only in display. Internally, the Agent still tags metrics with your original hostname, so your dashboards and alerts remain unaffected.

## Who May See a Change?

- **Upgrading Customers:**
  If you upgrade to Agent v7.64.0 without any custom configuration changes, you may see your host’s display name change to the instance ID.

## What to Look Out For:

- **Visual Changes:**
  After the upgrade, if you struggle to find your host on Fleet Automation or on the Infrastructure list, try to look at their instance ID.

- **No Impact on Metrics:**
  Although the displayed hostname might change, the underlying metric tagging still uses your original hostname. This ensures that your monitoring, alerting, and dashboards continue to work **seamlessly**.
