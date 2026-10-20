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

- **[Sync Pages to ServiceNow](#sync-pages-to-servicenow-incidents)**: When a routing rule creates a Page, Datadog creates a ServiceNow incident and keeps it in sync with the Page. Status, priority, and comments sync based on the mappings you configure.
- **[Trigger Pages from ServiceNow](#trigger-pages-from-servicenow-incidents)**: When an incident is created in ServiceNow, a business rule triggers a Page for a Datadog On-Call Team.

## Prerequisites

1. Install the [ServiceNow integration][1] and [configure the ServiceNow tile][2] with your ServiceNow instance in Datadog.
1. Install the Update Set for the ITOM/ITSM Integration for Datadog in your ServiceNow instance. Datadog provides the Update Set when you join the Preview.
1. Create a [service account application key][3] in Datadog for secure authentication. **Note**: Datadog recommends creating a service account key instead of using a personal one, which risks breaking the ServiceNow sync if the user's account is deactivated or if their permissions change.
1. Make sure you have the [On-Call Admin (`on_call_admin`)][4] permission. You need it to create ServiceNow connections in On-Call settings.

## Configure bidirectional sync

Configure the ITOM/ITSM Integration for Datadog in your ServiceNow instance so it can send updates to Datadog. Both flows require this setup.

1. In ServiceNow, click the globe icon in the top-right corner, then make sure the **Application Scope** is set to **ITOM/ITSM Integration for Datadog**.
1. In the top-left navigation menu, click **All**.
1. Type **ITOM/ITSM Integration for Datadog** in the filter.
1. Click the **Configuration** link from the filtered results, then enter the required settings:
   1. Select your **Datadog Data Center**.
   1. Paste in your **Datadog API Key**.
   1. Paste in the **Service Account Application Key** you created.
   1. Check the **Enabled** box.
1. Click **Save**.

## Sync Pages to ServiceNow incidents

### Create a ServiceNow connection

A connection defines which ServiceNow instance receives incidents and how Pages and incidents stay in sync. You can create more than one connection, for example, one for each assignment group.

1. In Datadog, go to [**On-Call > Settings > Integrations**][5].
1. Select **ServiceNow** and click **Add Connection**.
1. Configure the connection:
   - **ServiceNow instance**: Select the ServiceNow instance configured in the ServiceNow tile. To add an instance, click **Manage accounts**.
   - **Assignment group** (optional): Select the ServiceNow assignment group for incidents created from Pages.
   - **Automatically create ServiceNow incidents from Pages**: Enable this toggle to create a ServiceNow incident each time a routing rule that uses this connection creates a Page.
   - **Sync methods and mappings**: Choose how each field syncs between the Page and the ServiceNow incident, and map its values. You can sync the Page's status to the incident's **State**, its urgency to the incident's **Impact** and **Urgency**, and its comments to the incident's **Work Notes**.
1. Save the connection.

### Sync Pages from a routing rule

After you create a connection, add ServiceNow sync to a team's [routing rules][6]:

1. Go to the team's On-Call page and click **Edit** in the **Page Routing** section.
1. Add or edit a routing rule.
1. Under **Set targets**, select **Sync with a ServiceNow Incident**, then select the connection to use.
1. Save the routing rule.

When the rule matches an alert, Datadog creates the Page and a ServiceNow incident at the same time. The incident stays in sync with the Page based on the connection's settings.

## Trigger Pages from ServiceNow incidents

The ITOM/ITSM Integration for Datadog includes a `PublishOnCallPage` function. Call it from a ServiceNow business rule to trigger an On-Call Page, for example, when an incident is created.

1. In ServiceNow, go to **System Definition > Business Rules** and click **New**.
1. Configure the business rule's table, when it runs, and its filter conditions to define which records trigger a Page. Select **Advanced** to enable scripting.
1. On the **Advanced** tab, call `PublishOnCallPage` in the script. For example, to page the `database` team at high urgency:

   ```javascript
   (function executeRule(current, previous /* null when async */) {
       new PublishOnCallPage("team_handle", "database", "high").execute(current);
   })(current, previous);
   ```

   The arguments are, in order:
   - **Target type**: `team_handle`, `team_uuid`, or `user_uuid`.
   - **Target identifier**: The team's handle, the team's UUID, or the user's UUID, matching the target type.
   - **Urgency** (optional): `high` or `low`. Defaults to `high`.
1. Click **Submit**.

When the business rule runs, Datadog triggers a Page for the target team or user.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/servicenow
[2]: /integrations/servicenow/#configure-the-servicenow-tile-in-datadog
[3]: /account_management/org_settings/service_accounts/#create-or-revoke-application-keys
[4]: /account_management/rbac/permissions/#on-call
[5]: https://app.datadoghq.com/on-call/settings/integrations
[6]: /incident_response/on-call/routing_rules/
