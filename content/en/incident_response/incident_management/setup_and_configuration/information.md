---
title: Information
aliases:
- /service_management/incident_management/incident_settings/information/
- /incident_response/incident_management/incident_settings/information
---

## Overview

From the [Incident Settings Information][1] page, you can customize the statuses and severities of your incidents and enable core incident capabilities, such as private incidents, test incidents, and timestamp overrides.

## Severity levels

 {{< img src="/service_management/incidents/incident_settings/settings_info_severity_levels.png" alt="Customizable severity levels in incident settings" style="width:100%;" >}}

Use severity level settings to:

1. Define your most critical severity as `SEV-0` or `SEV-1` (defaults to `SEV-1`)
2. Customize the sub-labels of your severities (**Defaults:** Critical, High, Moderate, Low, Minor)
3. Customize the descriptions of your severities
4. Add or delete severities from the bottom of your list, with a minimum of one and a maximum of ten
5. Enable the "Unknown" severity

**Note**: If you attempt to delete a severity that is referenced in a [notification rule][2], you are prompted to confirm your decision. Choosing to proceed disables the impacted notification rules as they are no longer valid. Deleting a severity or changing the starting severity does not automatically update any [Incident Management Analytics][3] queries.

## Status levels

{{< img src="/service_management/incidents/incident_settings/settings_info_status_levels.png" alt="Customizable status levels in incident settings" style="width:100%;" >}}

Use status level settings to:

1. Customize the descriptions of the statuses
2. Enable the optional `Completed` status

**Note**: Deleting the `Completed` status does not automatically update incidents in the `Completed` status and does not automatically update any [Incident Management Analytics][3] query that explicitly references it. Any notification rule that references the `Completed` status becomes disabled.

## Helper text

{{< img src="/service_management/incidents/incident_settings/settings_info_helper_text.png" alt="Declare Incident Helper Text Settings" style="width:100%;">}}

Helper text appears alongside the [Incident Creation Modal][4] and helps your responders understand how they should define the incident.

You can use markdown in helper text to add indented lists, formatted text, and hyperlinks to other resources.

## Private incidents (incident visibility)

_Default: disabled_

An incident's **visibility** determines what users in your Datadog organization can see it. If an incident's visibility is **organization**, any user with the **Incidents Read** permission can see it. If the incident's visibility is **private**, only the incident's responders or users with the **Private Incidents Global Access** permission can see it.

On the [Datadog Incidents page][5], you can search for private incidents using the **Visibility** facet on the left. You can also add conditions around incident visibility when defining incident [notification rules][2].

### Private incidents in Slack

When you declare private incidents, Datadog creates private Slack channels instead of public channels.

If you convert an incident to private, Datadog archives the existing incident channel, creates a new private channel, and adds all existing responders to it.

To convert an incident to private in Slack, use `/datadog incident private`.

## Incident deletion

_Default: disabled_

When incident deletion is enabled for an incident type, any user with the **Incidents Write** permission can delete any incident of the incident type.

After you delete an incident, it no longer influences incident analytics, and no user can access it. Deleted incidents cannot be recovered.

## Override status timestamps

_Default: disabled_

When timestamp overrides are enabled in an incident type, any user with the **Incidents Write** permission can define timestamp overrides in any incident of that incident type.

When enabled, you can define overrides for the `declared`, `detected`, and `resolved` timestamps on an incident. To learn more, see [Incident Analytics][3].

## Test incidents

_Default: disabled_

When test incidents are enabled in an incident type, any user with the **Incidents Write** permission can declare test incidents of the incident type.

Test incidents are visually distinguished by a purple banner. By default, test incidents do not by appear in incident search, execute automations, execute notification rules, or affect analytics. The declarer can opt into these functions during declaration.

[1]: https://app.datadoghq.com/incidents/settings#Information
[2]: /incident_response/incident_management/setup_and_configuration/notification_rules
[3]: /incident_response/incident_management/analytics_and_reporting
[4]: /incident_response/incident_management/#from-the-incidents-page
[5]: https://app.datadoghq.com/incidents
