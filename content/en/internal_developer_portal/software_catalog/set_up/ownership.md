---
title: Define ownership for Software Catalog entities
description: Link services and other entities to Datadog Teams so you can filter views, route notifications, and drive accountability across your software portfolio.
further_reading:
- link: "/account_management/teams/"
  tag: "Documentation"
  text: "Teams"
- link: "/tracing/software_catalog/adding_metadata/#add-metadata-from-the-datadog-ui"
  tag: "Documentation"
  text: "Add metadata from the Datadog UI"
---

## Overview

Define ownership in Software Catalog to connect entities to the Datadog Teams responsible for them. Ownership information appears on each entity's details page and allows you to: 
- Filter views by team across Datadog products.
- Attribute Scorecards and Campaigns to the right owners.
- Route notifications and on-call context to the correct team.

## Create a Team

You can create a Team from your [Datadog Organization Settings][3] or directly from [Software Catalog][1]. For full instructions, see [Team set up and configuration][2]. 

A Team definition includes the following:
1. **Team name**: For example, "Bits Demo".
2. **Handle**: A unique identifier, such as `bits-demo`. Handles can be used as search facets (for example, `team:bits-demo`).
3. **Members**: One or more Datadog users. 
4. **Description**: Optional, but recommended for context.

After creating a Team, you can add reference links, configure notifications, and associate the Team with Datadog resources such as Monitors and Dashboards.

## Configure entity ownership

### In Datadog

To add or update an entity's owner in Datadog:

1. Go to **Software Catalog**, and open the entity.
2. Click **Edit in UI** on the entity page.
3. In the **Ownership** section, set the **Owner** and optionally add **Additional owners**.
   - Search by team name or paste a handle (for example, `team:example-team`).
5. Click **Save Entry**.

### Through configuration files

If you manage entities as code (for example, through repository-backed service definitions or automation), include the team handle(s) in the entity metadata field that maps to owners. Ensure handles exactly match existing Datadog Teams.

## Best practices

- **Use Teams, not individuals:** Assign entities to Teams so membership changes don't break ownership links, filters, or notifications.
- **Choose a primary owner:** Designate one accountable Team; add secondary owners only when necessary.
- **Keep handles consistent:** Use lowercase, hyphenated handles for consistency and searchability (for example, `payments-platform`, not `Payments Platform`).
- **Sync from your IDP:** If possible, provision Teams from SAML or SCIM to keep membership current.
- **Use team filters:** Encourage engineers to enable [**My Teams**][4] to focus views on owned entities.
- **Use team hierarchies**: Create [subteams][5] to reflect your organization's structure and enable hierarchical filtering. 



[1]: https://app.datadoghq.com/teams
[2]: /account_management/teams/
[3]: https://app.datadoghq.com/organization-settings/teams
[4]: /account_management/teams/#team-filter
[5]: /account_management/teams/manage/#subteams-hierarchical-teams