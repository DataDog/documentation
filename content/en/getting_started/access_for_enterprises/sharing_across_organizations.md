---
title: Sharing Across Organizations
description: Share data and views across multiple Datadog organizations using Cross-Org Visibility, Shared Dashboards, and Organization Groups.
further_reading:
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Multi-Organization Account Management"
- link: "/dashboards/sharing/"
  tag: "Documentation"
  text: "Dashboard Sharing"
- link: "/dashboards/sharing/shared_dashboards/#embedded-shared-dashboards"
  tag: "Documentation"
  text: "Dashboard Embedding"
---

## Overview

If your enterprise uses [multiple Datadog organizations][1], you need to share data or views across them. A Central Observability team may need a unified view of health across all orgs. An executive may want a single dashboard showing business metrics from multiple divisions. An acquisition may need to be integrated gradually without merging orgs immediately.

This section covers the mechanisms available for cross-org sharing and when to use each.

## Cross-Org Visibility

[Cross-Org Visibility][2] allows you to query and display data from multiple child orgs within dashboards in a connected org (typically the parent org). This is useful for centralized reporting without requiring users to switch between orgs.

### Use cases

- **Central Observability or SRE dashboards** that show system health across all orgs in a single view
- **Executive reporting** with aggregated metrics across divisions or subsidiaries
- **Post-acquisition integration** where the acquired organization's data needs to be visible alongside existing data before a full migration

### How it works

Cross-Org Visibility lets you build dashboard widgets that pull data from connected orgs. The data stays in its source org, which means it is queried at render time, not copied. Users viewing the dashboard need access to the org where the dashboard lives, but do not need accounts in the source orgs.

### Limitations

- Cross-Org Visibility is available for dashboards. Not all Datadog products support cross-org queries.
- Query performance may differ from single-org queries, particularly for large aggregations across many orgs.
- Data access controls within the source org still apply: users cannot share data they do not have access to. If a dataset is restricted in the source org, it remains restricted when queried cross-org.
- Cross-Org Visibility requires configuration by your Datadog account team. Contact your Customer Success Manager to enable it.

## Shared Dashboards

[Shared Dashboards][3] allow you to make individual dashboards accessible to users outside your Datadog org, including users without a Datadog account.

### Public sharing

You can generate a public URL for any dashboard, making it viewable by anyone with the link. This is useful for:

- Status pages or operational displays visible to external stakeholders
- Embedding dashboards in internal wikis or portals that don't require Datadog authentication
- Sharing a specific view with a customer or partner

Public URLs can be revoked at any time. They provide read-only access to the dashboard as it was configured. Viewers cannot navigate to or edit other Datadog pages.

### Authenticated sharing

For cases where you want to share a dashboard but require authentication, you can restrict shared dashboards to users who have authenticated through your organization's SAML provider. This provides the convenience of sharing without exposing the dashboard to the open internet.

### Embedded dashboards

Dashboards can be [embedded][4] in external applications or portals, or even another org's Datadog dashboards, using iframes. This is useful for integrating Datadog views into internal tools, customer portals, or ITSM platforms. Embedded dashboards inherit the same access controls as shared dashboards.

## Organization Groups (Preview)

For enterprises with many Datadog organizations, [Organization Groups][5] (in Preview) provide a governance layer across your multi-org deployment. Organization Groups allow you to manage policies, configurations, and access controls centrally and cascade them to child orgs, reducing the need to configure each org individually.

If your enterprise manages more than a handful of orgs and struggles with configuration consistency, contact your Datadog account team to learn more about Organization Groups.

## Recommendations

- **Use Cross-Org Visibility for centralized dashboards.** If your leadership or operations team needs a unified view across orgs, Cross-Org Visibility is the right approach. Don't give users accounts in orgs they don't need to access directly.
- **Be deliberate about public sharing.** Shared dashboards with public URLs are powerful but carry risk. Review which dashboards are shared publicly on a regular basis, and revoke URLs that are no longer needed.
- **Use authenticated sharing for sensitive dashboards.** If the dashboard contains data that should not be publicly accessible, require SAML authentication.
- **Plan for cross-org governance.** If you manage many orgs, use Organization Groups to reduce configuration drift and centralize policy management.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/multi_organization/
[2]: /account_management/org_settings/cross_org_visibility/
[3]: /dashboards/sharing/
[4]: /dashboards/sharing/shared_dashboards/#embedded-shared-dashboards
[5]: /account_management/organization_groups/
