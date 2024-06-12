---
title: Tag pipelines
kind: Documentation
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

To monitor cloud costs effectively, you need a complete and detailed view of how different services, teams, and products contribute to your overall spend. Tag Pipelines ensure your cloud resources use standard tags that you can leverage across the product so that no resource's cost data slips through the cracks.

Create tag rules with [tag pipelines][1] to fix missing or incorrect tags on your Cloud bill, or to create new, inferred tags that align with business logic.

## Rule types

<div class="alert alert-warning"> A maximum of 100 rules can be created, and API based Reference Tables are not supported. </div>

There are three types of rules supported: **Add tag**, **Alias tag keys**, and **Map multiple tags**. You can keep your rules organized by leveraging rules sets, which act as folders for your rules. The rules are executed in deterministic order (from top to bottom). You can organize rules and rule sets to ensure the order of execution matches your business logic.

### Add tag

Add a new tag (key + value) based on the presence of existing tags on Cloud Costs data.

For example, you can create a rule to tag all resources with their business unit based on the services those resources are a part of.

{{< img src="cloud_cost/tags_addnew.png" alt="Add new business unit tag to resources with service:processing, service:creditcard, or service:payment-notification." >}}

### Alias tag keys

  Map existing tag values to a more standardized tag.

For example, if your organization wants to use the standard `application` tag key, but several teams have a variation of that tag (like `app`, `webapp`, or `apps`), you can alias `apps` to `application`. Each alias tag rule allows you to alias a maximum of 25 tag keys to a new tag.

The rule stops executing for each resource after a first match is found. For example, if a resource already has a `app` tag, then the rule no longer attempts to identify a `webapp` or `apps` tag.
{{< img src="cloud_cost/tags_alias.png" alt="Add application tag to resources with app, webapp, or apps tag." >}}

### Map multiple tags

Use [Reference Tables][2] to add multiple tags to cost data without creating multiple rules. This will map the values from your Reference Table's primary key column to values from cost tags. If found, the pipelines adds the selected Reference Table columns as tags to cost data.

For example, if you want to add information about which VPs, organizations, and business_units different AWS and Azure accounts fall under, you can create a table and map the tags. Similar to Alias tag keys, the rule stops executing for each resource after a first match is found. For example, if an `aws_member_account_id` is found, then the rule no longer attempts to find a `subscriptionid`.
{{< img src="cloud_cost/tags_mapmultiple.png" alt="Add account metadata like vp, organization, and businessunit using reference tables for tag pipelines" >}}

## Reserved tags
You cannot add the tag `host` in Tag Pipelines because it is part of [Unified service Tagging][3].

To correlate metrics, traces, and logs, tag your underlying infrastructure with these tags and take advantage of Unified Service Tagging across Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/tag-pipelines
[2]: https://docs.datadoghq.com/integrations/guide/reference-tables/?tab=manualupload
[3]: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/
