---
title: Information
---

## Overview

From the [Incident Settings Information][1] page, define your organization’s severity levels and status levels, and declare incident helper text to reflect the specific needs of your organization. For example, you can customize severity settings differently for security and non-security incidents, creating a more nuanced response strategy. You can also create custom helper text so that when an incident is declared, all the key pieces of information are added.

## Severity levels

 {{< img src="/service_management/incidents/incident_settings/settings_info_severity_levels.png" alt="Customizable severity levels in incident settings" style="width:100%;" >}}

Use severity level settings to:

1. Define your most critical severity as `SEV-0` or `SEV-1` (defaults to `SEV-1`).
2. Customize the sub-labels of your severities (**Defaults:** Critical, High, Moderate, Low, Minor)
3. Customize the descriptions of your severities.
4. Add or delete severities from the bottom of your list, with a minimum of three and a maximum of ten. 

**Note**: If you attempt to delete a severity that is referenced in a [notification rule][2], you are prompted to confirm your decision. Choosing to proceed disables the impacted notification rules as they are no longer valid. Deleting a severity or changing the starting severity does not automatically update any [Incident Management Analytics][3] queries.

## Status levels

{{< img src="/service_management/incidents/incident_settings/settings_info_status_levels.png" alt="Customizable status levels in incident settings" style="width:100%;" >}}

Use status level settings to:

1. Customize the descriptions of the statuses.
2. Choose whether to enable the optional `Completed` status.

**Note**: Deleting the `Completed` status does not automatically update any incidents that are already in the `Completed` status, nor does it automatically update any [Incident Management Analytics][3] queries that explicitly reference it. Any notification rule that references the `Completed` status is disabled, as that rule is no longer valid.

## Helper text

{{< img src="/service_management/incidents/incident_settings/settings_info_helper_text.png" alt="Declare Incident Helper Text Settings" style="width:100%;">}}

Helper text appears alongside the [Incident Creation Modal][4] and can help your incident responders make informed decisions about severity or other attributes when declaring an incident.

When defining helper text, you can use markdown to add indented lists, formatted text, and hyperlinks to other resources.

## Private incidents (incident visibility)

_Default: Enabled_

An incident's **visibility** determines what users in your Datadog organization can see it. If an incident's visbility is **organization**, any user with the **Incidents Read** permission can see it. If the incident's visibility is **private**, only the incident's responders or users with the **Private Incidents Global Access** permission can see it.

On the incident search page, you can search for private incidents using the **visbility** facet on the left. You can also add conditions around incident visibility when defining incident [notification rules][2].

### Private incidents in Slack

When you declare private incidents, Datadog creates private Slack channels instead of public channels.

If you convert an incident to private, Datadog archives the existing incident channel, creates a new public channel, and adds all existing responders to it.

To convert an incident to private in Slack, use `/datadog incident private`.

### Incident deletion

_Default: Disabled_

You can enable incident deletion for a particular incident type in Incident Management settings. It is disabled by default. When enabled, any user with **Incidents Write** can delete any incident of the incident type.

Once you delete an incident, it no longer influences incident analytics, and no user can access it. Deletion cannot be undone.

### Override status timestamps

_Default: Disabled_

When timestamp overrides are enabled, any user with **Incidents Write** can define timestamp overrides in any incident of that incident type.

When enabled, you can define overrides for the `declared`, `detected`, and `resolved` timestamps on an incident. These overrides apply only in incident search and [analytics][3]. Overrides do not affect entries on the incident timeline. You can delete overrides.

Timestamp overrides are disabled by default.

[1]: https://app.datadoghq.com/incidents/settings#Information
[2]: /service_management/incident_management/incident_settings/notification_rules
[3]: /service_management/incident_management/analytics
[4]: /service_management/incident_management/#from-the-incidents-page
