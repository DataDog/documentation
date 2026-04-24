---
title: Tag Enrichment
description: Automatically enrich telemetry with team and system tags from Software Catalog service definitions without redeploying code.
further_reading:
- link: "/tracing/services/service_remapping_rules"
  tag: "Documentation"
  text: "Service remapping rules"
- link: "/internal_developer_portal/software_catalog/"
  tag: "Documentation"
  text: "Software Catalog"
---

{{< callout btn_hidden="true" >}}
Tag enrichment is in Preview.
{{< /callout >}}

## Overview

Automatically enrich your telemetry with `team` and `system` tags sourced from your service definitions in Software Catalog, without changing tracer configuration or redeploying code.

Tag enrichment rules let you define which services to target, where tag values come from, and how they are applied to telemetry.

## Prerequisites

You must have admin permissions to create tag enrichment rules.

## Create a tag enrichment rule

### Default tag enrichment rules

To enable a default rule, navigate to **IDP** > **Manage** > [**Tag Enrichment**][1] and toggle on the default rule for `team` or `system` at the bottom of the page.

Enabling a default rule applies `team` or `system` to all telemetry of services based on the Entity Metadata defined in IDP. Only services with Entity Metadata populated are enriched. Tags are added only when the service's telemetry does not already have a value for that tag.

### Custom tag enrichment rules

Custom rules let you target a specific set of services and configure exactly how each tag value is sourced and applied.

1. In Datadog, navigate to **IDP** > **Manage** > [**Tag Enrichment**][1] and click **+ Add Rule**.
1. Select entities to enrich. As you select entities, a query is built in the background. To edit the query, select **Build Advanced Query**.
   - Select **Add Condition** to add an `AND` condition to your query.
   - Add multiple values in the **Value** section to create an `OR` condition.
1. Choose tags and enrichment methods:
   - Select the `team` tag, `system` tag, or both.
   - For each tag, select whether the tag value comes from Entity Metadata, the value of a different tag, or a fixed value.
   - Choose whether the value is applied only when it doesn't already exist, or is appended to the current list of values for that tag.
1. By default, tags are added to all telemetry. Select which telemetry types to enrich.
1. Optionally, enter a descriptive name for the rule.
1. Review and save your rule. After you save the rule, it may take a minute for it to take effect.

### Add a tag enrichment rule from a service page

On any service page that is missing a `team` or `system` tag, click **Add Tags** on the top banner to enrich telemetry for that service.

## Tag enrichment behavior

- **Impacted telemetry**: Tag enrichment applies to APM spans only.
- **Historical data**: Tag enrichment rules apply only to telemetry ingested while a rule is active. Past data is not updated retroactively. Deleting or modifying a rule stops it from applying to new telemetry, but does not update previously ingested data.
- **Metadata updates**: Updating or adding Entity Metadata to services for `team` or `system` while an enrichment rule is enabled, including the default rule, automatically updates those tags.
- **Rule processing order**: Tag enrichment rules are applied in the order in which they were created. Rules at the top of the list take precedence over rules below them.
- **Interaction with remapping rules**: Tag enrichment rules are applied after service remapping rules. If a service remapping rule modifies the `service` tag, enrichment uses the updated service name when looking up IDP metadata.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/software/settings/tag-enrichment
