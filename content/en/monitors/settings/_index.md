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

Monitor tag policies allow you to enforce the presence of certain tags and tag values on your Datadog monitors. This is useful for attribution purposes and for ensuring that alerts are routed to the correct downstream systems and workflows for triage and processing.

Once set up, tag policies apply to **all** Datadog monitors and Synthetic tests.

- To create a new monitor, it must adhere to your organization's tag policies.
- Existing monitors that violate your organization's tag policies continue to provide alerts and notifications, but must be updated to match the tag policies before you can modify other settings.

## Configure monitor tag policies

You can configure tag policies on the **Monitors** > **Settings** page. This page is only available if monitor tag policies are enabled for your account. There are three ways to leverage tag policies:

- Require tags with mandatory values
- Require tags only
- Optional tags with mandatory values

### Require tags with mandatory values

To require a tag with mandatory values, select the **Required** check box and specify both the tag key and values. In this example, monitors are required to have the `cost_center` tag. The value must be set to `cc1`, `cc2`, or `cc3`.

{{< img src="monitors/settings/monitor_tag_enforcement_key_and_value.png" alt="The Monitors Settings page displaying a tag policy for a required tag with mandatory values"  >}}

### Require tags only

Alternatively, you can require a tag but allow users to specify their own values. In this example, monitors are required to have the `product_id` tag. The value can be anything specified by the user.

{{< img src="monitors/settings/monitor_tag_enforcement_key_only.png" alt="The Monitors Settings page displaying a tag policy in which only the tag is required"  >}}

### Optional tag with mandatory values

To make a tag optional but require that monitors with the tag use specific values, enter the values for the tag in the **Values** field. In this example, the `env` tag is optional. However, if a monitor uses this tag, the value must be set to `dev`, `staging`, or `prod`.

{{< img src="monitors/settings/monitor_tag_enforcement_optional_key_with_values.png" alt="The Monitors Settings page displaying a tag policy for an optional tag with mandatory values"  >}}

## Permissions

To configure monitor tag policies, you must be assigned a role with the `MONITOR_CONFIG_POLICY_WRITE_PERMISSION` permission.

For more information, see [Role Based Access Control][2] and [Role Permissions][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /account_management/rbac/
[3]: /account_management/rbac/permissions/
