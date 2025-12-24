---
title: Cross-org Paging
aliases:
- /service_management/on-call/cross_org_paging/
private: true
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

<div class="alert alert-info">
Cross-org paging is in Preview and only supported for automated workflows (for example: monitor alerts, incident notification rules). Manual paging through the Datadog UI or API is limited to local organizations and data centers.
</div>

## Overview

Cross-org paging enables users to automatically trigger alerts to On-Call teams that reside in other Datadog organizations or data centers. Cross-org paging is useful when your operational or organizational setup spans multiple Datadog orgs or data centers, and you want to centralize incident response in one single org. 

With cross-org paging, you can:

- **Manage On-Call teams in a central org**: Consolidate all On-Call teams in a single org, and trigger pages from any org or region.

- **Avoid duplicating On-Call configs**: Instead of replicating the same team structures across orgs, use one set of configs and page teams from anywhere.

- **Page teams across regional or compliance boundaries**: Page teams in compliant regions (like US1 or AP1) while keeping alerting logic where it originates.

## Setup

To enable paging between orgs or datacenters, you must establish a secure connection between the **source org** (where alerts originate) and the **destination org** (where the On-Call team is managed).

1. In your destination org, [create a service account][1] with On-Call API access. Assign the service account to a role that includes the following permissions:
   - `on_call_read` - Read access to On-Call teams and configurations
   - `on_call_page` - Ability to trigger pages to On-Call teams  
   - `on_call_respond` - Respond to On-Call Pages
   - `user_access_read` - Read user information (automatically included in most roles)
 
   <div class="alert alert-danger">
   Service accounts created with Terraform may be missing the <code>user_access_read</code> permission. This permission is automatically added to roles created through the UI, but it cannot be manually added through the UI and may not be included in Terraform-configured roles. If cross-org paging fails with permission errors, add an additional role to your service account that includes the <code>user_access_read</code> permission.
   </div>

2. In your destination org, [create an API key][2].

2. In your destination org, [create an application key][3] for each source org you want to allow. Ensure that each application key is **unscoped** (not restricted to specific scopes).

3. In your source org, navigate to your [On-Call settings][4] and select [**Cross-Org Paging**][5].

4. Select **Add Connection** and provide the following values:
   - **Connection Name**: A name for your new connection.
   - **Datacenter**: Your destination org's data center.
   - **API Key**: The API key you created in your destination org.
   - **Application Key**: The application key you created in your destination org for this source org.

When you create this connection, Datadog securely stores your credentials and fetches available On-Call team handles from the destination org. This process may take up to five minutes.

After this process is complete, destination org team handles appear in your source org's autocomplete menus (for example, in monitors).

### Usage
After the setup process is complete, you can reference cross-org On-Call team handles in automated alert workflows, in the same way that you reference local handles.

For example, if your `@oncall-core-infra` team is managed in your destination org, you can use the following in an automated alert in your source org:

```
High memory usage detected on backend services. @oncall-core-infra
```

When an alert is triggered, Datadog detects that the handle is external, and the page is routed to the correct destination org using the stored service account credentials.

## Limitations 
- Manual paging (for example, through the API or web UI) is not supported across orgs. Manual paging is only supported within your current org or data center.
- Links in cross-org notifications (for example, monitor or incident URLs) point to the source org. They may not resolve cleanly in the destination org UI.
- Handle syncing happens periodically; changes in destination org On-Call teams may take time to propagate.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/service-accounts
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/personal-settings/application-keys
[4]: https://app.datadoghq.com/on-call/settings
[5]: https://app.datadoghq.com/on-call/settings/cross-org-paging