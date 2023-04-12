---
title: Ingestion Control for CI Visibility
kind: guide
description: Learn how to define condition(s) by which to exclude specific events from being processed by CI Visibility
further_reading:
  - link: "https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/"
    tag: "Blog"
    text: "Streamline your CI testing with Datadog Intelligent Test Runner"
  - link: "https://www.datadoghq.com/pricing/?product=ci-visibility#ci-visibility"
    tag: "Pricing"
    text: "See CI Visibility pricing"
---

## Overview

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

Exclusion filters provide fine-grained control over your CI Visibility budget by allowing you to define one or more conditions by which to exclude specific events from being processed by Datadog.

**Compatibility**
Filters are currently available for Pipeline Visibility.

## Adding an exclusion filter
Exclusion filters are not required for setting up Pipeline Visibility, and by default, all data is ingested and processed.

To create filters for your organization, your user account must have `ci_ingestion_control_write` [permissions][1].

1. Navigate to the _Ingestion Settings_ tab in-app
2. Select `Add an Exclusion Filter`

[ ADD SCREENSHOT OF ADDING AN EXCLUSION FILTER ]

3. Name the filter and define a query. After you define a query, the preview above the input fields shows ingested data that matches your query. Once your filter is created and enabled, events like the ones shown in the preview will be excluded from ingestion. 

[ ADD SCREENSHOT OF FILTER CREATION ]

Once you have added a filter, each row in this page should display:
- `Filter name` - the name of the filter
- `Exclusion query` - the query that was defined for that filter
- Toggle to [enable/disable the filter][2] - newly created filters are toggled on by default

All spans matching one or more filters are not ingested nor processed by Datadog.

## Defining queries for an exclusion filter
Filters are defined flexibly through a query editor interface. Rely on [tags][3] and attributes to create your filters.

### Example exclusion filters
Below are examples of how exclusion filters can help you optimize your CI Visibility usage and billing. 

**Filter by git author email address**
You can exclude one or more specific committers from being monitored by defining a filter with git author email address (`@git.commit.author.email`). The screenshot below shows a filter in which all spans associated with commits from this particular git author email will not be ingested.

[ ADD SCREENSHOT to exclude committers by email address - `@git.commit.author.email:john@datadoghq.com`]

**Filter by git author email domain**
You can also exclude many committers at once by email domain (e.g. excluding open source/external contributors committing to monitored repositories). The screenshot below shows a filter in which all spans associated with commits from email address domains that does not match the one in the query will not be ingested.

[ ADD SCREENSHOT to exclude committers by domain]

**Filter by repository** 
You can exclude specific repositories from being monitored (e.g. an internal testing repository) by defining a filter with repository name (`@git.repository.name`) or ID (`@git.repository.id`). The screenshot below shows a filter in which all spans associated with commits to this repository will not be ingested.

[ADD SCREENSHOT to exclude by repository name. `@git.repository.name:"DataDog/shopist"`]

## Updating exclusion filters
Exclusion filters can be enabled/disabled, updated, and deleted by users with `ci_ingestion_control_write` [permissions][4]. They are applied at the organization level. You can view detailed information about who modified exclusion filters via Datadog [Audit Trail][5]. 

### Enabling and disabling filters
There is a toggle on the right hand side of each filter that allows you to enable and disable the filter at any time.* Newly created filters are toggled on by default.

_*While in most scenarios, filters will be applied to ingested data within <1 second (p95) of being enabled, it is possible that an enabled filter takes up to a few minutes to take effect._


## Example quality checks
**Application performance**
[APM monitors][7] can be used to ensure that your application’s error rate and/or average latency are below certain thresholds prior to deployment.  

## Updating filters
You can rename a filter or modify the query for an exclusion filter at any time within the “Ingestion Settings” page.

[ ADD SCREENSHOT of edit button ]

## Deleting filters
You can delete a filter by clicking on the deletion icon. 

[ ADD SCREENSHOT ]

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/account_management/rbac/permissions/#ci-visibility
[2]: /###enabling-and-disabling-filters
[3]: https://docs.datadoghq.com/getting_started/tagging/
[4]: https://docs.datadoghq.com/account_management/rbac/permissions/#ci-visibility
[5]: https://www.datadoghq.com/product/audit-trail/