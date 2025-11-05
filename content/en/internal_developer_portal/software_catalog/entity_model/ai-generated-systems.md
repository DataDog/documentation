---
title: AI-generated Systems
description: Discover recommended System entities powered by Bits AI to organize your Software Catalog.
disable_toc: false
further_reading:
- link: "/internal_developer_portal/software_catalog/entity_model/entity_types"
  tag: "Documentation"
  text: "Entity Types"
- link: "/internal_developer_portal/software_catalog/set_up/discover_entities"
  tag: "Documentation"
  text: "Discover Entities"
---

## Overview

AI-generated Systems surface recommended System entities that you can add to your Software Catalog. Bits AI generates these recommendations using:
- Observability data, including distributed traces
- Component dependencies (automatically detected with APM or manually declared)
- Ownership metadata from your Software Catalog

Recommendations include service, datastore, and queue entity types and automatically populate the following System metadata:
- Name and display name
- Owner
- Description
- Components

**Note**: AI-generated Systems only suggest new Systems; they do not propose updates to existing ones.

## Enable AI-generated Systems

AI-generated Systems must be enabled once per organization by a user with the `org_management` permission (included in the default [Datadog Admin role][1]).

To enable:

1. Navigate to **IDP** > **Software Catalog** > **Suggestions**.
2. In the **Suggested Updates** section, click **Enable System Recommendations**.

{{< img src="path/to/your/image-name-here.png" alt="Your image description" style="width:100%;" >}}

Recommendations may take up to 30 minutes to appear after enablement.

## Use AI-generated Systems

To view recommendations, navigate to **IDP** > **Software Catalog** > **Suggestions** > **Systems**.

{{< img src="path/to/your/image-name-here.png" alt="Your image description" style="width:100%;" >}}

For each recommended System, you can:
- **Accept** it as-is to add it to your Software Catalog
- **Edit** metadata before accepting
- **Reject** it to remove from your recommendations

Accept or reject Systems directly from the list view, or click into an individual System to view details.

{{< img src="path/to/your/image-name-here.png" alt="Your image description" style="width:100%;" >}}

In the detail view, you can modify:
- Name and display name
- Owner
- Description
- Components

After accepting a System, you can update additional metadata on the entity page in your Catalog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#access-management

