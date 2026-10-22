---
title: Integrate ServiceNow with Datadog On-Call
description: Create ServiceNow incidents from On-Call Pages, keep them in sync, and trigger Pages from ServiceNow incidents.
further_reading:
- link: '/integrations/servicenow/'
  tag: 'Documentation'
  text: 'Install the ServiceNow integration'
- link: '/integrations/guide/servicenow-itom-itsm-setup'
  tag: 'Documentation'
  text: 'Set up ServiceNow ITOM and ITSM'
- link: '/incident_response/on-call/routing_rules/'
  tag: 'Documentation'
  text: 'Routing Rules'
- link: '/incident_response/on-call/integrations/'
  tag: 'Documentation'
  text: 'On-Call Integrations'
---

{{< callout url="https://www.datadoghq.com/product-preview/on-call-integrations/" btn_hidden="false" header="Join the Preview">}}
The ServiceNow integration for Datadog On-Call is in Preview.
{{< /callout >}}

## Overview

The ServiceNow integration for Datadog On-Call connects On-Call Pages with ServiceNow incidents. It supports two flows:

- **[Sync Pages to ServiceNow](#sync-pages-to-servicenow-incidents)**: When a routing rule creates a Page, Datadog creates a ServiceNow incident and keeps it in sync with the Page. Status, urgency, and comments sync based on the mappings you configure.
- **[Trigger Pages from ServiceNow](#trigger-pages-from-servicenow-incidents)**: When a ServiceNow record matches a business rule, the rule triggers a Page for a Datadog On-Call team or user.

## Prerequisites

- Make sure you have the [On-Call Admin (`on_call_admin`)][1] permission, which you need to create ServiceNow connections in On-Call settings.
- Complete the [ServiceNow ITOM/ITSM setup][2]:
  1. Configure the ServiceNow tile and install version 2.9.3 or later of the ITOM/ITSM Integration for Datadog.
  1. Complete the steps in [Sync data bidirectionally between ServiceNow and Datadog][3]. Both flows on this page use the credentials from that configuration.

## Sync Pages to ServiceNow incidents

### Create a ServiceNow connection

A connection defines which ServiceNow instance receives incidents and how Pages and incidents stay in sync. You can create more than one connection, such as one for each assignment group.

1. In Datadog, go to [**On-Call > Settings > Integrations**][4].
1. Select **ServiceNow** and click **Add Connection**.
1. Configure the connection:
   - **ServiceNow instance**: Select the ServiceNow instance configured in the ServiceNow tile. To add an instance, click **Manage accounts**.
   - **Assignment group** (optional): Select the ServiceNow assignment group for incidents created from Pages.
   - **Automatically create ServiceNow incidents from Pages**: Enable this toggle to create a ServiceNow incident each time a routing rule that uses this connection creates a Page.
   - **Sync methods and mappings**: Choose how each field syncs between the Page and the ServiceNow incident, and map its values. You can sync the Page's status to the incident's **State**, its urgency to the incident's **Impact** and **Urgency**, and its comments to the incident's **Work Notes**.
1. Save the connection.

### Sync Pages from a routing rule

After you create a connection, add ServiceNow sync to a team's [routing rules][5]:

1. Go to [**On-Call > Teams**][6] and select a team.
1. Find the **Page Routing** section and click **Edit**.
1. Add or edit a routing rule.
1. Under **Set targets**, click **Add**, select **Sync with a ServiceNow Incident**, then select the connection to use.
1. Save the routing rule.

When the rule matches an alert, Datadog creates the Page and a ServiceNow incident at the same time. The incident stays in sync with the Page based on the connection's settings.

## Trigger Pages from ServiceNow incidents

The ITOM/ITSM Integration for Datadog includes a `PublishOnCallPage` script include. Call it from a ServiceNow business rule to trigger an On-Call Page, such as when an incident is created.

1. In ServiceNow, go to **System Definition > Business Rules** and click **New**.
1. Configure the business rule's table, when it runs, and its filter conditions to define which records trigger a Page. Select the **Advanced** checkbox to enable scripting.
1. On the **Advanced** tab, call `PublishOnCallPage` in the script. For example, to page the `database` team at high urgency:

   ```javascript
   (function executeRule(current, previous /* null when async */) {
       new PublishOnCallPage("team_handle", "database", "high").execute(current);
   })(current, previous);
   ```

   For the supported target types, the urgency argument, and the application key scopes the script requires, see [Create a Datadog On-Call Page from ServiceNow][7].
1. Click **Submit**.

When the business rule runs, Datadog triggers a Page for the target team or user.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#on-call
[2]: /integrations/guide/servicenow-itom-itsm-setup/
[3]: /integrations/guide/servicenow-itom-itsm-setup/#sync-bidirectionally
[4]: https://app.datadoghq.com/on-call/settings/integrations
[5]: /incident_response/on-call/routing_rules/
[6]: https://app.datadoghq.com/on-call/teams
[7]: /integrations/guide/servicenow-itom-itsm-setup/#create-on-call-page
