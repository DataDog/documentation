---
title: Migrate from Office 365 Connectors in Microsoft Teams
description: "How to migrate from Office 365 connectors in Microsoft Teams."
further_reading:
- link: "/integrations/microsoft-teams"
  tag: "Documentation"
  text: "Set up Microsoft Teams in Datadog"
- link: "/integrations/guide/microsoft_teams_troubleshooting"
  tag: "Guide"
  text: "Troubleshooting Microsoft Teams"
---

## Overview

Microsoft has retired Office 365 connectors for Microsoft Teams. All connectors stop working on April 30, 2026. See Microsoft's [blog post][1] for timeline details.

This guide covers two migration options:

- **Tenant-based integration (recommended)**: Migrate to the Datadog app for Microsoft Teams, which connects your Microsoft tenant directly to Datadog.
- **Microsoft Workflows Webhooks**: Migrate to webhook-based handles using Microsoft's Power Automate Workflows.

## Migrate legacy connectors to tenant-based integration

To migrate all notification handles currently using the legacy Office 365 connectors over to the tenant-based Datadog app:

1. Follow the [setup steps][3] to connect your Microsoft tenant to Datadog.
2. Add the {{< region-param key="microsoft_teams_app_name" >}} app to all teams where you have a legacy Office 365 connector configured.
3. For each legacy notification connector handle in the [Microsoft Teams Integration Tile][2]:
   1. Under the configured tenant, click **Add Handle**.
   2. Give the new handle the same name as the connector handle. For example, if your legacy connector handle is named `channel-123`, create a new handle in the tenant configuration with the name `channel-123`.
   3. Select the desired team and channel from the drop-down menus that the legacy connector handle was sending the message to, and click **Save**. This new handle overrides the existing legacy connector handle.

## Migrate legacy connectors to the Microsoft Workflows Webhooks integration

To migrate all notification handles currently using the legacy Office 365 connectors over to Datadog's Microsoft Workflows webhooks integration:

1. Follow the [setup steps][3] to create a workflow webhook handle for the desired Microsoft Teams channel.
2. Under the Microsoft Workflows Webhooks section, give the new handle the same name as the connector handle it should replace. For example, if your legacy connector handle is named `channel-123`, name your new handle in the Microsoft Workflows Webhooks section with the name `channel-123`. This new handle overrides the existing legacy connector handle.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[2]: https://app.datadoghq.com/integrations/microsoft-teams
[3]: https://docs.datadoghq.com/integrations/microsoft-teams/#setup
