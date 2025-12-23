---
title: Troubleshooting Microsoft Teams
description: Troubleshooting steps and solutions for issues with the Microsoft Teams integration.
further_reading:
- link: "https://docs.datadoghq.com/integrations/microsoft-teams/?tab=datadogapprecommended"
  tag: "Documentation"
  text: "Datadog Microsoft Teams Integration"
- link: "https://app.datadoghq.com/integrations?integrationId=microsoft-teams"
  tag: "App"
  text: "Microsoft Teams Integration Tile"
---

## Overview

This guide addresses common issues and FAQs for the Datadog Microsoft Teams integration, including missing teams, syncing channels, private channel support, user mentions, incident troubleshooting, and prompt resolution.

## The team doesn't show up in the integration tile

If you added the bot to the team before adding the tenant to Datadog, then Datadog would have missed the team join event to know that the team exists.
You can try to either:
- Synchronize your team standard channels to Datadog by running a sync command from any standard channel for that team
- Remove the {{< region-param key="microsoft_teams_app_name" >}} app from the team, then add it back again

### Synchronize your team standard channels to Datadog
1. Navigate to a standard channel in the Team that you want to synchronize.
2. Start a post on the channel.
3. Type `@{{< region-param key="microsoft_teams_app_name" >}} sync`, select the `{{< region-param key="microsoft_teams_app_name" >}}` app, and then choose the `sync` command.
4. Post the message to the channel and wait for a confirmation in the thread indicating success.

### Remove and readd {{< region-param key="microsoft_teams_app_name" >}} app

<div class="alert alert-danger">This removes configured connectors for that team. Perform this action only when you are ready to migrate all connectors for that team to Datadog's tenant-based integration.</div>

1. Click the three dots next to the team name in the left sidebar.
2. Click **Manage Team**.
3. Go to the tab labelled **Apps**.
4. Click the three dots next to the {{< region-param key="microsoft_teams_app_name" >}} app.
5. Click **Remove**.
6. Re-add the {{< region-param key="microsoft_teams_app_name" >}} app by following the [setup steps][1].


## Bot support for private channels

Private channels are not supported by the bot, due to the private channel limitations in [Microsoft Teams][2]. If you want to send notifications to private channels, see [Microsoft Workflows Webhooks][3].

## Adding multiple user mentions in monitor notifications

<div class="alert alert-warning">When multiple user mentions are included in a notification and one is invalid, the valid users will still receive notifications, but invalid user mentions may cause the mentions to appear out of order.</div>

To include multiple user mentions in a single notification and ensure all relevant team members are notified, use the following format:

```text
@teams-handle <at>user1@microsoft.com</at> <at>user2@microsoft.com</at> <at>user3@microsoft.com</at>
```

## Troubleshooting Incident features when using delegated permissions

First, ensure that the service account user is a member of the team that the feature is being used in.
- If incident tab is not being created, ensure that you have allowed members to create, update, and remove tabs in channels in that team.
- If new incident channels are not being created or renamed, ensure that you have allowed members to create and update channels in that team.
- If incident channels are not being archived, ensure that you have allowed members to delete and restore channels in that team.

Lastly, it is possible that the delegated user's token has expired or been revoked. If that's the case, re-connect the delegated user.

## App configuration prompts when declaring an incident

If you are seeing a prompt when decalring an incident, verify the following:
- Your app version is 3.1.23 or higher. See instructions on how to [update your app version][4].
- If you're using application permissions, ensure you have granted the `TeamsTab.Create` application permission
- If you're using delegated permissions, ensure you have granted the `TeamsTab.Create` and `TeamsTab.Read.All` delegated permissions.
- If you're using delegated permissions, ensure that the service account is a member of the team you're running the `@Datadog incident` command in.

You can also declare an incident by clicking the `+` sign at the top of a channel and searching for the Datadog app.

## Limitations for US1-FED

- GCC and GCC High tenants are not supported by the app. The Datadog for Government app only supports Datadog US1-FED customers who are trying to connect to their `commercial` Microsoft Teams tenant.
- Datadog Incident management features are not supported.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/microsoft-teams/?tab=datadogapprecommended#setup
[2]: https://learn.microsoft.com/microsoftteams/private-channels#private-channel-limitations
[3]: /integrations/microsoft-teams/?tab=microsoftworkflowswebhooks#what-are-microsoft-workflows-webhooks
[4]: https://support.microsoft.com/office/update-an-app-in-microsoft-teams-3d53d136-5c5d-4dfa-9602-01e6fdd8015b