---
title: Integrate ServiceNow with Datadog Incident Management
further_reading:
- link: "integrations/servicenow/"
  tag: "Documentation"
  text: "Install the ServiceNow Integration"
- link: "/integrations/guide/servicenow-itom-itsm-setup"
  tag: "Documentation"
  text: "Set up ServiceNow ITOM and ITSM"
- link: "https://app.datadoghq.com/integrations/servicenow"
  tag: "App"
  text: "In-app ServiceNow integration tile"
---

## Overview

ServiceNow is an IT service management platform that provides solutions for managing digital workflows, IT operations, and business processes. The Datadog ServiceNow integration allows you to create incidents in ServiceNow from Datadog incidents and sync data bidirectionally between the two platforms.

The ServiceNow integration with Datadog Incident Management provides you with the following benefits:
- **Improved Visibility**: Ensure that all stakeholders are immediately informed about incidents, facilitating a quicker response.
- **Bidirectional Sync**: Sync incident state, severity (impact and urgency), and status updates between Datadog and ServiceNow automatically.
- **Supporting Existing Workflows**: Seamlessly integrate with your current processes, making it easier to manage incidents within your established ServiceNow workflows.

## Prerequisites

To use automatic incident creation and bidirectional sync with ServiceNow:

1. Install the [ServiceNow integration][1] through the ServiceNow Integration tile and ensure you have the [ServiceNow tile configured][2] with your ServiceNow instance in Datadog.
2. Install the [ITOM/ITSM Integration for Datadog][3](Recommended) from the ServiceNow store, or download the latest Update Set ([Datadog-Snow_Update_Set_v2.7.7.xml][4]) and upload it to your ServiceNow instance manually.
3. Create a [service account application key][5] in Datadog for secure authentication. **Note**: Datadog recommends creating a service account key instead of using a personal one, which risks breaking the ServiceNow sync if the user's account is deactivated or if their permissions change.

## Setup

### Configure automatic incident creation

1. Navigate to [Integration Settings][6].
1. In the left menu, click **Integrations**.
1. Find and click the **ServiceNow** integration tile to open the configuration.
2. Click the toggle for **Enable ServiceNow incident creation**.
3. Click the toggle for **Automatically create a ServiceNow incident**.
4. Add a condition to define when to automatically create a ServiceNow incident. If this condition is left blank, the integration creates a ServiceNow incident when Datadog creates an incident.

### Configure bidirectional sync

In ServiceNow, you can sync state, impact, and urgency bidirectionally with Incident Management.

1. In ServiceNow, click the globe icon in the top-right corner, then make sure the **Application Scope** is set to **ITOM/ITSM Integration for Datadog**.
2. In the top-left navigation menu, click **All**.
3. Type **ITOM/ITSM Integration for Datadog** in the filter.
4. Click the **Configuration** link from the filtered results, then enter the required settings:
   1. Select your **Datadog Data Center**.
   2. Paste in your **Datadog API Key**.
   3. Paste in your **Service Account Application Key** you created.
   4. Check the **Enabled** box.
5. Click **Save**.

As incidents are created in Datadog, an incident is also created in the corresponding ServiceNow instance. This ServiceNow incident links to the incident in Datadog for reference and syncs bidirectionally based on the [field mappings](#field-mappings).

### Field mappings

Field mappings define how information in Datadog incidents is transferred to, and synchronized with, fields in ServiceNow incidents. This ensures that key incident details such as status, severity, and descriptions are consistent and up-to-date in both systems.

Below are the default field mappings used in the integration. You can customize mappings within ServiceNow using its [transform map][7] mechanism if your workflow requires advanced field configuration.

The following fields are synced between Datadog Incident Management and ServiceNow:

| **Incident Management** | **ServiceNow Cases Table** | **ServiceNow Incident** | **Sync Status**                         |
| ----------------------- | -------------------------- | ----------------------- | --------------------------------------- |
| Title                   | Title - String             | Short Description       | One way sync from Datadog → ServiceNow |
| What Happened           | Description - String       | Description             | One way sync from Datadog → ServiceNow |
| State                   | State - String             | State                   | Bi-directionally synced                 |
| DD Incident URL         | Incident URL - String      | Work Notes              | One way sync from Datadog → ServiceNow |
| Severity                | Incident Urgency (int)     | Urgency                 | Bi-directionally synced                 |
| Severity                | Incident Impact (int)      | Impact                  | Bi-directionally synced                 |

#### Datadog incident state to ServiceNow incident state mapping

| **Datadog Monitor State**                     | **ServiceNow Incident State** |
| ---------------------------------------------- | ----------------------------- |
| Active                                         | In Progress                   |
| Warn                                         | In Progress                   |
| OK                                       | Resolved                      |
| Completed _(optional, configured in settings)_ | Resolved                      |

#### Datadog incident severity to ServiceNow priority mapping

| **Datadog Incident Severity** | **ServiceNow Urgency** | **ServiceNow Impact** | **ServiceNow Priority** |
|-------------------------------|------------------------|-----------------------|-------------------------|
| SEV-1                         | 1                      | 1                     | 1 - Critical            |
| SEV-2                         | 1                      | 2                     | 2 - High                |
| SEV-2                         | 2                      | 1                     | 2 - High                |
| SEV-3                         | 1                      | 3                     | 3 - Moderate            |
| SEV-3                         | 2                      | 2                     | 3 - Moderate            |
| SEV-3                         | 3                      | 1                     | 3 - Moderate            |
| SEV-4                         | 2                      | 3                     | 4 - Low                 |
| SEV-4                         | 3                      | 2                     | 4 - Low                 |
| SEV-5 (Minor)                 | 3                      | 3                     | 5 - Planning            |
| Unknown                       | 3                      | 3                     | 5 - Planning            |

**Note**: If `Start at SEV-0` is enabled in Incident Management settings, the values in `ServiceNow Urgency`, `ServiceNow Impact`, and `ServiceNow Priority` will all stay the same, but the `Datadog Incident Severity` shifts down by 1. For example, in the first row of this table, the Datadog Incident Severity would be 0, but the rest of the values in the rest of the row would stay the same.

<!-- TODO: Add information about customization options. Questions:
- Can users customize these field mappings?
- Are there transform map customization options available specifically for Incident Management?
- Should we reference the ITOM/ITSM setup guide for advanced customization?
-->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/servicenow
[2]: /integrations/servicenow/#configure-the-servicenow-tile-in-datadog
[3]: https://store.servicenow.com/store/app/e0e963a21b246a50a85b16db234bcb67
[4]: /resources/xml/Datadog-Snow_Update_Set_v2.7.7.xml
[5]: /account_management/org_settings/service_accounts/#create-or-revoke-application-keys
[6]: https://app.datadoghq.com/incidents/settings#Integrations
[7]: /integrations/guide/servicenow-itom-itsm-setup/#tranform-maps
