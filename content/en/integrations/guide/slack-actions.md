---
title: Slack Actions
description: "Utilize these Slack actions for the workspaces you have set up. Follow the [Slack integration documentation for setup.][1]"

---

## Overview

To run any Slack actions, type `/dd` in any workspace with the Datadog App installed to pull up an action tray listing all actions you can take. Alternatively, directly type out the action.

## Incidents
Use the following keyboard shortcuts for incidents navigation. All commands can utilize `/dd in` as an alias for `/dd incident`. For more details, refer to [Incident documentation][2].

| Command | Description|
| ------------------ | ---------- |
| `/dd in` or `/dd incident` | Declare an incident.|
| `/dd in update` or `/dd in edit`| Update the incident's title, state, severity, and attributes.|
| `/dd in responders`| Manage the incident's response team.|
| `/dd in investigate` | Trigger Bits Investigation. |
| `/dd in summary` | Generate the incident's summary with AI. |
| `/dd in notify` | Notify @-handles about the incident. |
| `/dd in list` | List open incidents.|
| `/dd in private`| Archive the current channel, create a new private channel, and add all existing responders.|
| `/dd in public` | Make the incident and its timeline visible to anyone with incident-read permissions. |
| `/dd followup` | Create a new follow-up.|
| `/dd followup list`  | List Incident Follow-ups |
| `/dd shortcuts` | View Incident Actions.|

## On-Call
Use the following keyboard shortcuts for On-Call. For more details, refer to [On-Call documentation][3].

| Command | Description|
| ------------------ | ---------- |
| `/dd page` | Page an on-call team.|
| `/dd shifts`| See your upcoming on-call shifts.|
| `/dd override`| Request someone to cover an on-call shift. |

## Monitors
Use the following keyboard shortcuts for Monitors. For more details, refer to [Alerting documentation][4].

| Command | Description|
| ------------------ | ---------- |
| `/dd monitors` | List monitors that are currently alerting.|


## Dashboard
Use the following keyboard shortcuts for Dashboards. For more details, refer to [Dashboard documentation][5].

| Command | Description|
| ------------------ | ---------- |
| `/dd dashboard` | Share a dashboard widget to this channel.|


## Workflows
Use the following keyboard shortcuts for Workflows. For more details, refer to [Workflow Automation documentation][6].

| Command | Description|
| ------------------ | ---------- |
| `/dd workflow` | Run an automation workflow.|


## Accounts
Use the following keyboard shortcuts for account management. For more details, refer to [Account Management documentation][7].

| Command | Description|
| ------------------ | ---------- |
| `/dd accounts` | Manage your linked Datadog accounts. |


[1]: /integrations/slack/?tab=datadogforslack
[2]: /incident_response/incident_management/setup_and_configuration/integrations/slack/#slack-commands
[3]: /incident_response/on-call/pages/#through-slack
[4]: /monitors/notify/#notification-recipients
[5]: /product_analytics/dashboards/
[6]: /actions/workflows/trigger/#slack-triggers
[7]: /account_management/
