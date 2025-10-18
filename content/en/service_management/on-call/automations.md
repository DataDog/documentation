---
title: Automations
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
- link: "https://docs.datadoghq.com/service_management/workflows/"
  tag: "Documentation"
  text: "Workflow Automation"
---

## Overview

Automations allow you to trigger actions based on events in On-Call. There are two types:
- **Handover automations**: Triggered automatically when an on-call shift changes.
- **[Workflow automations][1]**: A low-code/no-code solution that can include on-call actions (such as paging or updating schedules) within automated workflows. For all on-call related actions, see the [Actions Catalog][5].


## Handover automations
Handover automations run automatically at the start or end of an on-call shift. They're designed to handle tasks that teams typically manage with custom scripts—such as notifying other systems about who's on-call, updating internal dashboards, or rotating credentials.

By using built-in automations instead of maintaining cron jobs or custom tools, you can streamline operations, eliminate manual steps, and ensure the right actions always run when a shift changes.


<div class="alert alert-danger">
If you need a specific action that isn't listed, contact your account representative or <a href="mailto:support@datadoghq.com">support@datadoghq.com</a>.
</div>

Handover Automations are maintained on a Team level. To get started, navigate to [On-Call Team][4], open a specific team, and scroll down to the **Handover Automation** section.

### Send a Slack message
Post a message to Slack at the start or end of a shift using a handover automation. The message shows the previous and next on-call users (if any). **Note**: This requires the Datadog Slack app—make sure it's [added to your workspace][2].

#### Troubleshooting
If you're not receiving @ mentions in Slack, your Slack and Datadog profiles may not be linked. To connect them, run any Datadog Slack command, such as `/dd page`.

### Send a Microsoft Teams message
Post a message to Microsoft Teams at the start or end of a shift using a handover automation. The message shows the previous and next on-call users (if any). **Note**: This requires the Datadog Teams app—make sure it's [added to your workspace][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/workflows/
[2]: /integrations/slack/?tab=datadogforslack#install-the-datadog-app-in-your-slack-workspace
[3]: /integrations/microsoft_teams/?tab=datadogapprecommended#overview
[4]: https://app.datadoghq.com/on-call/teams
[5]: /actions/actions_catalog/?search=datadog+on-call