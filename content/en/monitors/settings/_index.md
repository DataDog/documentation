---
title: Monitor Tag Policies
kind: documentation
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "Create monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor Notifications"
---

## Overview

Monitor tag policies allow you to enforce data validation on tags and tag values on your Datadog monitors. This ensures that alerts are sent to the correct downstream systems and workflows for triage and processing.

<div class="alert alert-warning">After set up, tag policies apply to <strong>all</strong> Datadog monitors and Synthetic tests.</div>

- To create a new monitor, it must adhere to your organization's tag policies.
- Existing monitors that violate your organization's tag policies continue to provide alerts and notifications, but must be updated to match the tag policies before you can modify other settings.

## Configure monitor tag policies

1. Navigate to the **Monitors** > **Settings** page.
2. Configure tag policies. There are three data validation rules that are enforced through tag policies:
    - Require tags with mandatory values
    - Require tags only
    - Optional tags with mandatory values
3. Click the green checkmark to save the policy.

{{< img src="/monitors/settings/tag_policies.png" alt="Monitor setting tag policies page" style="width:100%;" >}}

### Require tags with mandatory values

To enforce mandatory tags, select the **Required** check box and specify both the tag key and values. In this example, monitors are required to have the `cost_center` tag. The value must be set to `cc1`, `cc2`, or `cc3`.

{{< img src="monitors/settings/monitor_tag_enforcement_key_and_value.png" alt="The Monitors Settings page displaying a tag policy for a required tag with mandatory values"  >}}

### Require tags only

You can require a tag but allow users to specify their own values. In this example, monitors are required to have the `product_id` tag. The value can be anything specified by the user.

{{< img src="monitors/settings/monitor_tag_enforcement_key_only.png" alt="The Monitors Settings page displaying a tag policy in which only the tag is required"  >}}

### Optional tag with mandatory values

To make a tag optional but require that monitors with the tag use specific values, enter the values for the tag in the **Values** field. In this example, the `env` tag is optional. However, if a monitor uses this tag, the value must be set to `dev`, `staging`, or `prod`.

{{< img src="monitors/settings/monitor_tag_enforcement_optional_key_with_values.png" alt="The Monitors Settings page displaying a tag policy for an optional tag with mandatory values"  >}}

## Permissions

To configure monitor tag policies, you must be assigned a role with the `MONITOR_CONFIG_POLICY_WRITE_PERMISSION` permission.

For more information, see [Role Based Access Control][1] and [Role Permissions][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: /account_management/rbac/permissions/
