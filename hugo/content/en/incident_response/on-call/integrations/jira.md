---
title: Integrate Jira with Datadog On-Call
description: Create Jira work items from On-Call Pages and keep their status, priority, and comments in sync.
further_reading:
- link: '/integrations/jira/'
  tag: 'Documentation'
  text: 'Install the Jira integration'
- link: '/incident_response/on-call/routing_rules/'
  tag: 'Documentation'
  text: 'Routing Rules'
- link: '/incident_response/on-call/integrations/'
  tag: 'Documentation'
  text: 'On-Call Integrations'
---

{{< callout url="https://www.datadoghq.com/product-preview/on-call-integrations/" btn_hidden="false" header="Join the Preview">}}
The Jira integration for Datadog On-Call is in Preview.
{{< /callout >}}

## Overview

The Jira integration for Datadog On-Call creates Jira work items from On-Call Pages. When a routing rule creates a Page, Datadog creates a Jira work item and keeps it in sync with the Page. Status, priority, and comments sync based on the mappings you configure.

## Prerequisites

Install the integration through the [Jira integration tile][6] and add your Jira account. For more information, see the [Jira integration][2] documentation.

To create Jira connections in On-Call settings, you need the [On-Call Admin (`on_call_admin`)][1] permission.

To enable bidirectional sync, you must also configure a Jira webhook. See [Configure a Jira webhook][7] for instructions.

## Create a Jira connection

A connection defines which Jira project receives work items and how Pages and work items stay in sync. You can create more than one connection, for example, one for each project or work type.

1. In Datadog, go to [**On-Call > Settings > Integrations**][3].
1. Select **Jira** and click **Add Connection**.
1. Configure the connection:
   - **Jira Account**: Select the Jira account configured in the Jira integration tile.
   - **Project**: Select the Jira project to create work items in.
   - **Work Type**: Select the type of work item to create, such as **Task**.
   - **Sync methods and mappings**: Choose how each field syncs between the Page and the Jira work item, and map its values:
     - **Status**: Map each Page status (**Triggered**, **Acknowledged**, and **Resolved**) to a Jira status, such as **Open**, **In Progress**, and **Done**.
     - **Priority**: Map each Page urgency (**High** and **Low**) to a Jira priority, such as **Highest** and **Low**.
     - **Comments**: Sync comments between the Page and the Jira work item.
1. Save the connection.

## Create Jira work items from a routing rule

After you create a connection, add a Jira target to a team's [routing rules][4]:

1. Go to [**On-Call > Teams**][5] and select a team.
1. Find the **Page Routing** section and click **Edit**.
1. Add or edit a routing rule.
1. Under **Configure targets**, click **Add**, select **Jira work item**, then select the connection to use.
1. Save the routing rule.

When the rule matches an alert, Datadog creates the Page and a Jira work item at the same time. The work item stays in sync with the Page based on the connection's settings.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#on-call
[2]: /integrations/jira/
[3]: https://app.datadoghq.com/on-call/settings/integrations
[4]: /incident_response/on-call/routing_rules/
[5]: https://app.datadoghq.com/on-call/teams
[6]: https://app.datadoghq.com/integrations/jira
[7]: /integrations/jira/#configure-a-jira-webhook
