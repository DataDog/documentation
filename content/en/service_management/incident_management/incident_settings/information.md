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

For the Declare Incident Helper Text settings, you can customize the helper text that appears alongside the severity and status level descriptions in the [Incident Creation Modal][4]. The helper text has Markdown support, which allows indented lists, text formatting, and hyperlinks to other instruction resources for incident responders.

## Additional information settings

| Setting     | Description    |
| ---  | ----------- |
| Private&nbsp;Incidents | Enable users in your organization to make incidents private and to delete incidents. Private Incidents gives users the ability to limit access to incidents with sensitive information so that only responders of the incident can see it the details. Any previously created notification rules will not be sent when an incident is private.|
| Incident&nbsp;Deletion | Incident Deletion gives users the ability to remove the incidents from the UI, including the analytics. By default, incident deletion is disabled. |
| Portmortem&nbsp;Generation Anytime| Enable users to to generate a postmortem regardless of the incident status. When this setting is disabled, users can only generate postmortems after an incident has been resolved. |


[1]: https://app.datadoghq.com/incidents/settings#Information
[2]: /service_management/incident_management/incident_settings/notification_rules
[3]: /service_management/incident_management/analytics
[4]: /service_management/incident_management/#from-the-incidents-page
