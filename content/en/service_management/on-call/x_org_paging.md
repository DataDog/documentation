---
title: Cross-org Paging
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

Cross-org paging enables users to automatically trigger alerts to On-Call teams that reside in other Datadog organizations or datacenters. This is especially useful for enterprises with multi-org setups that want to centralize On-Call configuration while maintaining flexible, cross-org incident response.

<div class="alert alert-info">
Note: Cross-org paging is currently supported only for automated workflows (e.g. monitor alerts, incident notification rules). Manual paging via UI or API is limited to local orgs/datacenters.
</div>

## When should you use Cross-Org Paging?
Use Cross-Org Paging when your operational or organizational setup spans multiple Datadog orgs or datacenters, and you want to centralise incident response **in one single org**. Here are common scenarios where this feature is a good fit:

**You manage On-Call teams in a central org**: Consolidate all On-Call teams in a single organization, and trigger pages from any org or region (e.g., GovCloud → US1).

**You want to avoid duplicating On-Call configs**: Instead of replicating the same team structures across orgs, use one source of truth and page them from anywhere.

**Your teams operate across regional or compliance boundaries**: Page teams in compliant regions (like US1 or GovCloud) while keeping alerting logic where it originates.


## How it works
Cross-Org Paging involves two parts: setting up the connection between organizations, and triggering pages using that connection.

### Configuration: Set Up the Cross-Org Connection
To enable paging between orgs or datacenters, you'll first need to establish a secure connection between the source org (where alerts originate) and the destination org (where the On-Call team is managed).

#### In the Destination Org:
- Create a service account with On-Call API access (Read + Page).
- Generate application keys for each source org you want to allow.

#### In the Source Org:
- Go to On-Call > Settings > Cross-Org Paging.
- Choose a destination datacenter (e.g. US1, EU1).
- Enter the API and application keys from the destination org's service account.

Datadog will:

- Securely store the credentials
- Fetch available On-Call team handles from the destination org
- Validate the connection

Once complete, destination org team handles will appear in the source org's autocomplete menus, e.g. in Monitors.

### Paging: Trigger Alerts to Remote On-Call Teams
After configuration, you can reference cross-org On-Call team handles in automated alert workflows, just like local handles.

For example:
```
High memory usage detected on backend services. @oncall-core-infra
```

When an alert is triggered:

- Datadog detects that the handle is external.
- The page is routed to the correct destination org using the stored service account credentials.
- A unique identifier ensures pages aren't duplicated.

## Limitations 
- Manual paging (e.g., via API or web UI) is not supported across orgs — only within your current org/datacenter.
- Links in cross-org notifications (e.g. monitor or incident URLs) will point to the source org. They may not resolve cleanly in the destination org UI.
- Handle syncing happens periodically; changes in destination org On-Call teams may take time to propagate.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}