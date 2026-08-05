---
title: Slack Actions
description: "Use Slack actions to manage incidents, on-call, monitors, dashboards, workflows, and accounts directly from a Slack workspace with the Datadog app installed."
further_reading:
- link: "/integrations/slack/?tab=datadogforslack"
  tag: "Documentation"
  text: "Slack Integration"
---
## Overview

Slack actions are available in any Slack workspace with the Datadog App installed. Type `/dd` in the workspace to open an action tray listing all available actions. Alternatively, type the full command directly.

## Incidents
Use the following commands for incidents navigation. All commands can use `/dd in` as an alias for `/dd incident`. For more details, see [Integrate Slack with Datadog Incident Management][2].

| Command | Description|
| ------------------ | ---------- |
| `/dd in` or `/dd incident` | Declare an incident.|
| `/dd in test` | Declare a test incident.|
| `/dd in update` or `/dd in edit`| Update the incident's title, state, severity, and attributes.|
| `/dd in responders`| Manage the incident's response team.|
| `/dd in investigate` | Trigger Bits Investigation. |
| `/dd in summary` | Generate the incident's summary with AI. Not available in Gov and Gov2 regions.|
| `/dd in notify` | Notify @-handles about the incident. |
| `/dd in list` | List open incidents.|
| `/dd in private`| Archive the current channel, create a private channel, and add all existing responders.|
| `/dd in public` | Make the incident and its timeline visible to anyone with incident-read permissions. |
| `/dd followup` | Create a new follow-up.|
| `/dd followup list`  | List Incident Follow-ups.|
| `/dd task` | Create an incident task.|
| `/dd task list` | List incident tasks.|
| `/dd shortcuts` | View Incident Actions.|

## On-Call
Use the following commands for On-Call. For more details, see [On-Call Pages][3].

| Command | Description|
| ------------------ | ---------- |
| `/dd page` | Page an on-call team.|
| `/dd shifts`| See your upcoming on-call shifts.|
| `/dd override`| Request someone to cover an on-call shift. |

## Monitors
Use the following commands for Monitors. For more information on adding Slack to monitors, see [Monitor Notifications][4].

| Command | Description|
| ------------------ | ---------- |
| `/dd monitors` | List monitors that are currently alerting.|


## Dashboard
Use the following commands for [Dashboards][5].

| Command | Description|
| ------------------ | ---------- |
| `/dd dashboard` | Share a dashboard widget to this channel.|


## Workflows
Use the following commands for Workflows. For more information on using Slack in Workflows, see [Trigger a workflow][6].

| Command | Description|
| ------------------ | ---------- |
| `/dd workflow` | Run an automation workflow.|


## Accounts
Use the following commands for [account management][7].

| Command | Description|
| ------------------ | ---------- |
| `/dd accounts` | Manage your linked Datadog accounts. |


[1]: /integrations/slack/?tab=datadogforslack
[2]: /incident_response/incident_management/setup_and_configuration/integrations/slack/#slack-commands
[3]: /incident_response/on-call/pages/#through-slack
[4]: /monitors/notify/#notification-recipients
[5]: /dashboards/
[6]: /actions/workflows/trigger/#slack-triggers
[7]: /account_management/
