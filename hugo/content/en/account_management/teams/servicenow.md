---
title: Provision Datadog Teams with ServiceNow
description: Create, link, and keep Datadog Teams in-sync with ServiceNow assignment groups.
further_reading:
    - link: '/integrations/servicenow/'
      tag: 'Documentation'
      text: 'ServiceNow integration'
    - link: '/account_management/teams/'
      tag: 'Documentation'
      text: 'Datadog Teams'
    - link: '/account_management/teams/github/'
      tag: 'Documentation'
      text: 'Provision Datadog Teams with GitHub'
---

## Overview

If your organization already maintains assignment groups in ServiceNow, you can use them as the source for Datadog Teams instead of re-creating teams by hand. Connecting ServiceNow assignment groups to Datadog Teams supports:

- Creating Datadog Teams from your ServiceNow assignment groups.
- Linking existing Datadog Teams to ServiceNow assignment groups, for example to route On-Call and Incidents by ServiceNow group.
- Keeping team membership in-sync with ServiceNow, on a one-time or recurring schedule.

Existing Datadog Teams are linked, not duplicated, when a Datadog team [handle][7] matches a ServiceNow assignment group name. The match is case-insensitive and ignores whitespace differences. All other existing Datadog Teams, and their permissions, are not affected.

Datadog has read-only access to ServiceNow assignment groups. It never writes to, creates, or modifies them.

## Prerequisites

### ServiceNow integration

Your Datadog organization must be connected to at least one ServiceNow instance through the [ServiceNow integration][1]. No ServiceNow permissions beyond the standard integration setup are required.

The integration is configured per Datadog organization.

### Permissions

- Linking and creating teams requires the `teams_manage` permission.
- Syncing team membership requires the `user_access_manage` permission.
- Setting up the ServiceNow integration, or editing its tile to add or change an assignment group filter, requires the `manage_integrations` permission.

## Setup

### Connect ServiceNow assignment groups to Datadog Teams

1. Go to [Teams > Data Sources][6].
2. Select {{< ui >}}ServiceNow{{< /ui >}}.
3. Choose the import type:
   - {{< ui >}}Import, create, and link teams{{< /ui >}}: Datadog creates a team for each ServiceNow assignment group in scope and links it to that group.
   - {{< ui >}}Link only{{< /ui >}}: Datadog links existing Datadog Teams to matching assignment groups without creating teams. Use this option when you manage teams from Datadog or SAML and only need the Datadog-to-ServiceNow mapping.
4. Choose whether to manage team membership from ServiceNow. If you selected {{< ui >}}Import, create, and link teams{{< /ui >}}, turn on membership sync so the teams Datadog creates have members. Membership sync can take up to 24 hours to take effect.
5. Choose the sync cadence:
   - {{< ui >}}One-time{{< /ui >}}: Datadog imports the assignment groups once.
   - {{< ui >}}Recurring{{< /ui >}}: Datadog syncs at least once every 24 hours.
6. Select which of your connected ServiceNow instances to include.
7. Select {{< ui >}}Save{{< /ui >}}.

### Filter assignment groups

By default, Datadog syncs every assignment group in the selected instances. To sync only a subset, add a filter in the [ServiceNow integration tile][3] using ServiceNow [encoded query syntax][4]. Datadog passes the filter to ServiceNow and receives only the matching assignment groups.

Datadog imports up to 100,000 assignment groups per organization and up to 10,000 members per assignment group. If you have more, use a filter to import fewer assignment groups, or contact [Datadog Support][8] to request a higher limit.

Common filters include:

- Only active assignment groups.
- Only assignment groups that appear in your service catalog.

Define the filter before your first sync. Narrowing it later does not delete teams that already exist. See [Removing assignment groups from the sync](#removing-assignment-groups-from-the-sync).

### View Datadog Teams

1. Go to [Teams > Data Sources][6].
2. If no created or linked teams appear, select {{< ui >}}Refresh{{< /ui >}}.
3. Optionally, edit Datadog Teams manually to reach the state you want.

You can also find synced teams from the [Teams][2] list: filter the {{< ui >}}Connection{{< /ui >}} facet to `ServiceNow`.

## User matching

Datadog matches users by email address. A user is added to a team when their Datadog email address matches their email address in ServiceNow.

The integration does not create Datadog users or send invitations. If a member of a ServiceNow assignment group does not have a Datadog account, Datadog skips them.

If a user's email address changes, for example after a domain migration, update the address in both Datadog and ServiceNow. The next sync picks up the new address and relinks the user.

## Renaming assignment groups

Datadog identifies each ServiceNow assignment group by its unique ID, so renaming a group in ServiceNow does not create a Datadog team. The Datadog team handle never changes, which keeps telemetry and dashboards tagged with that handle linked to the team.

The Datadog team name follows the ServiceNow rename only when all of the following are true:

- This ServiceNow connection created the Datadog team.
- No other source, such as SCIM, manages the team.
- The connection uses {{< ui >}}Import, create, and link teams{{< /ui >}}.

In all other cases, Datadog leaves the team name unchanged.

## Removing assignment groups from the sync

When an assignment group falls out of the sync, for example because you narrowed the filter, Datadog does not delete the matching Datadog team. Instead, Datadog removes all synced members from the team and leaves the team in place with no members. This applies to both one-time and recurring syncs.

To remove the empty teams:

1. Go to [Teams][2].
2. Filter the {{< ui >}}Connection{{< /ui >}} facet to `ServiceNow`.
3. Select the teams to remove and delete them.

Changes made by the sync cannot be rolled back automatically. [Audit Trail][5] records each change, which you can use to restore a previous state manually.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/servicenow/
[2]: https://app.datadoghq.com/organization-settings/teams
[3]: https://app.datadoghq.com/integrations/servicenow
[4]: https://www.servicenow.com/docs/r/platform-user-interface/c_EncodedQueryStrings.html
[5]: /account_management/audit_trail/
[6]: https://app.datadoghq.com/organization-settings/teams/data-sources
[7]: /account_management/teams/#team-handle
[8]: /help/
