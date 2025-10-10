---
title: Monitor Settings
description: "Configure organization settings, tag policies, notification rules, and manage deleted monitors through the Monitor Settings page."
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "Create monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor Notifications"
- link: "/monitors/notify/notification_rules/"
  tag: "Documentation"
  text: "Monitor Notification Rules"
- link: "https://www.datadoghq.com/blog/tagging-best-practices-monitors/"
  tag: "Blog"
  text: "Best practices for tagging your monitors"
- link: "https://www.datadoghq.com/blog/monitor-notification-rules/"
  tag: "Blog"
  text: "Route your monitor alerts with Datadog monitor notification rules"
---

## Overview

On the [Monitor Settings page][1], you can access and control the following topics:

* [Organization Settings](#organization-settings)
* [Tag Policies](#tag-policies)
* [Notification Rules](#notification-rules)
* [Deleted Monitors](#deleted-monitors)


## Organization settings

### Monitors time zone preference

Users with the `Org Management` permission can customize the time zone used in alert graph snapshots within Monitor alert notifications.

{{< img src="monitors/settings/monitors-time-zone-preference.png" alt="Monitors Time Zone Preferences" style="width:70%;" >}}

The setting applies to **all** Monitor alert notifications, as it's an org-wide setting.

## Tag policies

Monitor tag policies allow you to enforce data validation on tags and tag values on your Datadog monitors. This ensures that alerts are sent to the correct downstream systems and workflows for triage and processing.

<div class="alert alert-danger">After set up, tag policies apply to <strong>all</strong> Datadog monitors</div>

- To create a new monitor, it must adhere to your organization's tag policies.
- Existing monitors that violate your organization's tag policies continue to provide alerts and notifications, but must be updated to match the tag policies before you can modify other settings.

### Configure monitor tag policies

1. Navigate to the [**Monitors Settings**][1] page.
2. Open the "Tag policies" tab. There are three data validation rules that are enforced through tag policies:
    - Require tags with mandatory values
    - Require tags only
    - Optional tags with mandatory values
3. Click the green checkmark to save the policy.

{{< img src="/monitors/settings/tag_policies.png" alt="Monitor setting tag policies page" style="width:100%;" >}}

### Require tags with mandatory values

To enforce mandatory tags, select the **Required** check box and specify both the tag key and values. In this example, monitors are required to have the `cost_center` tag. The value must be set to `cc1`, `cc2`, or `cc3`.

{{< img src="monitors/settings/monitor_tag_enforcement_key_and_value.png" alt="The Monitors Settings page displaying a tag policy for a required tag with mandatory values" >}}

### Require tags only

You can require a tag but allow users to specify their own values. In this example, monitors are required to have the `product_id` tag. The value can be anything specified by the user.

{{< img src="monitors/settings/monitor_tag_enforcement_key_only.png" alt="The Monitors Settings page displaying a tag policy in which only the tag is required" >}}

### Optional tag with mandatory values

To make a tag optional but require that monitors with the tag use specific values, enter the values for the tag in the **Values** field. In this example, the `env` tag is optional. However, if a monitor uses this tag, the value must be set to `dev`, `staging`, or `prod`.

{{< img src="monitors/settings/monitor_tag_enforcement_optional_key_with_values.png" alt="The Monitors Settings page displaying a tag policy for an optional tag with mandatory values" >}}

### Permissions

To configure monitor tag policies, you must be assigned a role with the `MONITOR_CONFIG_POLICY_WRITE_PERMISSION` permission.

For more information, see [Role Based Access Control][2] and [Role Permissions][3].

## Notification rules

Notification rules provide a method for routing monitor notifications more effectively. With Monitor Notification Rules, you can create rules to route alerts based on the tags associated with the monitor to reduce repetitive tasks in managing alert communications.

To create and manage monitor notification rules, see [Monitor notification rules][4].


## Deleted monitors
Monitors are retained for 7 days before being permanently deleted. To restore recently deleted Datadog monitors:
1. Navigate to the [**Monitors** > **Settings**][1] page.
1. Open the **Deleted Monitors** tab.
1. Select the monitor(s) you want to restore.
1. Click the **Restore** button at the top of the table.

{{< img src="monitors/settings/recently_deleted.png" alt="Restore deleted monitor" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/settings
[2]: /account_management/rbac/
[3]: /account_management/rbac/permissions/
[4]: /monitors/notify/notification_rules/