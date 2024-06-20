---
title: Set Ingestion Control for CI Visibility
description: Learn how to define condition(s) by which to exclude specific events from being processed by CI Visibility.
further_reading:
  - link: "https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/"
    tag: "Blog"
    text: "Streamline your CI testing with Datadog Intelligent Test Runner"
  - link: "/continuous_integration/pipelines"
    tag: "Documentation"
    text: "Learn about Pipeline Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Exclusion filters provide fine-grained control over your CI Visibility budget by allowing you to define one or more conditions by which to exclude specific events from being processed by Datadog.

### Compatibility
Filters are available for Pipeline Visibility.

## Adding an exclusion filter
Exclusion filters are not required for setting up Pipeline Visibility. By default, all data is ingested and processed.

To create filters for your organization, your user account must have the `ci_ingestion_control_write` [permission][1].

1. In Datadog, navigate to **CI** > **Settings** > **Ingestion Settings**.
2. Select **Add an Exclusion Filter**.

{{< img src="ci/add-ci-exclusion-filter.png" alt="Add an Exclusion Filter button" style="width:90%;">}}

3. Name the filter and define a query. After you define a query, the preview above the input fields shows ingested data that matches your query. Once your filter is created and enabled, events like the ones shown in the preview are excluded from ingestion.

{{< img src="ci/exclusion-filter-pipeline.png" alt="Creating an exclusion filter for a specific pipeline" style="width:100%;">}}

Once you have added a filter, each row in this page displays:
- **Filter name** - the name of the filter
- **Exclusion query** - the query that was defined for that filter
- Toggle to [enable/disable the filter](#enabling-and-disabling-filters) - newly created filters are toggled on by default

All spans matching one or more filters are neither ingested nor processed by Datadog.

## Defining queries for an exclusion filter
Filters are defined flexibly through a query editor interface. Rely on [tags][3] and attributes to create your filters.

### Example exclusion filters
Below are examples of how exclusion filters can help you optimize your CI Visibility usage and billing.

#### Filter by git author email address
You can exclude one or more specific committers from being monitored by defining a filter with git author email address (`@git.commit.author.email`). The screenshot below shows a filter in which all spans associated with commits from this particular git author email are not ingested.

{{< img src="ci/exclusion-filter-email.png" alt="Ingestion control exclusion filter for email address" style="width:100%;">}}

#### Filter by git author email domain
You can also exclude many committers at once by email domain (for instance, you may want to exclude external contributors committing to monitored repositories). The screenshot below shows a filter in which all spans associated with commits from email address domains that do not match the one in the query are not ingested.

{{< img src="ci/exclusion-filter-domain.png" alt="Ingestion control exclusion filter for email domain" style="width:100%;">}}

#### Filter by repository
You can exclude specific repositories from being monitored (for example, an internal testing repository) by defining a filter with repository name (`@git.repository.name`) or ID (`@git.repository.id`). The screenshot below shows a filter in which all spans associated with commits to this repository are not ingested.

{{< img src="ci/exclusion-filter-repo.png" alt="Ingestion control exclusion filter for repository" style="width:100%;">}}

## Updating exclusion filters
Exclusion filters can be enabled/disabled, updated, and deleted by users with `ci_ingestion_control_write` [permissions][4]. They are applied at the organization level. You can view detailed information about who modified exclusion filters by using Datadog [Audit Trail][5].

### Enabling and disabling filters
A toggle on the right hand side of each filter allows you to enable and disable the filter at any time. Newly created filters are toggled on by default.

**Note**: In most scenarios, filters are applied to ingested data within <1 second (p95) of being enabled. However, it is possible that an enabled filter takes up to a few minutes to take effect.

### Updating filters
You can rename a filter or modify the query for an exclusion filter at any time within the **Ingestion Settings** page.

{{< img src="ci/exclusion-filter-edit.png" alt="Ingestion control edit exclusion filter button" style="width:90%;">}}

### Deleting filters
You can delete a filter by clicking on the deletion icon.

{{< img src="ci/exclusion-filter-delete.png" alt="Ingestion control delete exclusion filter button" style="width:90%;">}}

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#ci-visibility
[3]: /getting_started/tagging/
[4]: /account_management/rbac/permissions/#ci-visibility
[5]: /account_management/audit_trail/events/#ci-visibility-events
[6]: /monitors/types/apm/
