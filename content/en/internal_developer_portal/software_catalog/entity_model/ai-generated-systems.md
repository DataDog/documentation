---
title: AI-Generated Systems
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

{{< callout url="https://www.datadoghq.com/product-preview/idp-preview-features/" d_target="#signupModal" btn_hidden="false" header="Join the Preview for AI-generated Systems!" >}}
{{< /callout >}}

## Overview

Bits AI recommends AI-generated Systems that you can add to your Software Catalog. It analyzes the following data sources to identify candidate Systems:
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

To enable it, navigate to **IDP** > **Software Catalog** > [**Suggestions**][2], and click **Enable System Recommendations**.

Recommendations may take up to 30 minutes to appear after enablement.

{{< img src="/tracing/internal_developer_portal/enable-system-recs2.png" alt="The Suggestions page in Software Catalog, showing an option to enable System Recommendations" style="width:100%;" >}}

## Use AI-generated Systems

To view recommendations, navigate to **IDP** > **Software Catalog** > **Suggestions** > [**Systems**][2].

{{< img src="/tracing/internal_developer_portal/suggested-updates.png" alt="The Suggestions view in Software Catalog, showing a list of AI-generated Systems with high-level metadata for each" style="width:100%;" >}}

For each recommended System, you can:
- **Accept** it as-is to add it to your Software Catalog
- **Edit** metadata before accepting
- **Reject** it to remove from your recommendations

Accept or reject Systems directly from the list view, or click into an individual System to view details.

{{< img src="/tracing/internal_developer_portal/add-suggestion-to-catalog.png" alt="The detailed view for one AI-generated System, with an option to reject the suggestion or save it to your Software Catalog" style="width:100%;" >}}

In the detail view, you can modify:
- Name and display name
- Owner
- Description
- Components

After accepting a System, you can update additional metadata on the entity page in your Catalog. AI-generated Systems are automatically tagged with `created_by:ai` so you can identify which Systems in your Catalog were originally created by AI.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#access-management
[2]: https://app.datadoghq.com/software?selectedComponent=suggestionsTable

