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

Automations let you trigger actions based on events in On-Call. There are two types: handover automations, which run when an on-call shift changes, and [workflow automations][1], a low-code/no-code solution that will allow users to trigger actions based on on-call activity.

# Handover Automations
Handover automations run automatically at the start or end of an on-call shift. They’re built for the kinds of tasks teams often handled with custom scripts—like alerting another system about who’s on-call, updating internal dashboards, or rotating credentials. Instead of maintaining cron jobs or one-off tools, you can now run these actions directly through built-in automation. It removes manual steps and makes sure the right tasks run every time a shift changes.

<div class="alert alert-warning">
The list of supported actions isn’t final. If you need a specific action that isn’t currently offered, contact your account representative or <a href="mailto:support@datadoghq.com">support@datadoghq.com</a> to let us know.
</div>

Handover Automations are maintained on a Team level. To get started, visit your On-Call Team and scroll down to the Handover Automation section!

### Send a Slack Message
Post a message to Slack at the start or end of a shift using a handover automation. The message shows the previous and next on-call users (if any). Note: This requires the Datadog Slack app—make sure it’s [added to your workspace][2].

### Send a Microsoft Teams Message
Post a message to Microsoft Teams at the start or end of a shift using a handover automation. The message shows the previous and next on-call users (if any). Note: This requires the Datadog Teams app—make sure it’s [added to your workspace][3].


[1]: /service_management/workflows/
[2]: /integrations/slack/?tab=datadogforslack#install-the-datadog-app-in-your-slack-workspace
[3]: /integrations/microsoft_teams/?tab=datadogapprecommended#overview