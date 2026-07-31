---
title: Tag Enrichment
description: Automatically enrich telemetry with team and system tags from Catalog service definitions without redeploying code.
further_reading:
- link: "/tracing/services/service_remapping_rules"
  tag: "Documentation"
  text: "Service remapping rules"
- link: "/internal_developer_portal/catalog/"
  tag: "Documentation"
  text: "Catalog"
---

{{< callout url="https://www.datadoghq.com/product-preview/tag-enrichment/" >}}
Tag enrichment is in Preview. To request access, fill out this form.
{{< /callout >}}

## Overview

Use tag enrichment rules to add tags to your Logs and APM spans without code changes or redeployment. You can use values from service metadata you've already defined in Catalog, the value of another tag, or a fixed value.

## Prerequisites

You must have the Datadog Admin Role to create tag enrichment rules. See [Role-based access control][2] for details.

## Create a tag enrichment rule

### Default tag enrichment rules

To enable a default rule, navigate to {{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1] and toggle on the default rule for `team` or `system` at the bottom of the page.

{{< img src="tracing/services/tag_enrichment/tag-enrichment-landing.png" alt="The Tag Enrichment page showing the Suggested rules panel, with options to create enrichment rules for system and team tags for all services." >}}

Enabling a default rule applies `team` or `system` to all telemetry of services based on the Entity Metadata defined in IDP. Only services with Entity Metadata populated are enriched. Tags are added only when the service's telemetry does not already have a value for that tag.

### Custom tag enrichment rules

Custom rules let you target a specific set of services and configure exactly how each tag value is sourced and applied.

1. In Datadog, navigate to {{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1] and click {{< ui >}}+ Add Rule{{< /ui >}}.
1. Select entities to enrich. As you select entities, a query is built in the background. To edit the query, select {{< ui >}}Build Advanced Query{{< /ui >}}.
   {{< img src="tracing/services/tag_enrichment/tag-enrichment-adv-query.png" alt="The Add IDP tag enrichment rule modal with the Build Advanced Query tab selected, showing fields for tag key, operator, and value, with an Add Condition option." >}}
   - Select {{< ui >}}Add Condition{{< /ui >}} to add an `AND` condition to your query.
   - Add multiple values in the {{< ui >}}Value{{< /ui >}} field to create an `OR` condition.
1. Choose tags and enrichment methods:
   - Select the `team` tag, `system` tag, `custom` tag, or multiple.
   - For each tag, select whether the tag value comes from Entity Metadata, the value of a different tag, or a fixed value.
   - Choose whether the value is applied only when it doesn't already exist, or is appended to the current list of values for that tag.
1. By default, tags are added to all telemetry.
1. Optionally, enter a descriptive name for the rule.
1. Review and save your rule. After you save the rule, it can take up to an hour for enrichment to be fully applied to incoming telemetry.

### Add a tag enrichment rule from a service page

On any service page that is missing a `team` or `system` tag, click {{< ui >}}Service Config{{< /ui >}} to open the configuration side panel. A banner at the top of the panel indicates which tags are missing.

{{< img src="tracing/services/tag_enrichment/service-config-side-panel.png" alt="The Service Config side panel for a service, showing a banner that indicates the team and system tags are missing from telemetry, with an Add Tags button." >}}

Click {{< ui >}}Add Tags{{< /ui >}} to open the tag enrichment rule modal pre-populated with that service.

{{< img src="tracing/services/tag_enrichment/add-idp-tag-enrichment-rule.png" alt="The Add IDP tag enrichment rule modal, showing fields for selecting entities to enrich, tags to add, and the tag source method." >}}

## Tag enrichment behavior

- **Impacted telemetry**: Tag enrichment applies to Logs and APM spans only.
- **Historical data**: Tag enrichment rules apply only to telemetry ingested while a rule is active. Past data is not updated retroactively. Deleting or modifying a rule stops it from applying to new telemetry, but does not update previously ingested data.
- **Metadata updates**: Updating or adding Entity Metadata to services while enrichment rules are enabled, including the default rules, automatically updates those tags.
- **Rule processing order**: Tag enrichment rules are applied in the order in which they were created. Rules at the top of the list take precedence over rules below them.
- **Interaction with remapping rules**: Tag enrichment rules are applied after service remapping rules. If a service remapping rule modifies the `service` tag, enrichment uses the updated service name when looking up IDP metadata.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/software/settings/tag-enrichment
[2]: /account_management/rbac/
