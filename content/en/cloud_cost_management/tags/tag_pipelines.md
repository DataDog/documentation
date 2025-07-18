---
title: Tag Pipelines
aliases:
  - /cloud_cost_management/tag_pipelines/
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Getting Started with Tags"
- link: "/integrations/guide/reference-tables"
  tag: "Documentation"
  text: "Learn about Reference Tables"
---

## Overview

To effectively monitor cloud costs, you need a comprehensive understanding of how various services, teams, and products contribute to your overall spending. Tag Pipelines enforce the use of standardized tags across your cloud resources and ensure consistent, accurate cost attribution throughout your organization.

With [Tag Pipelines][1], you can create tag rules to address missing or incorrect tags on your cloud bills. You can also create new inferred tags that align with specific business logic to enhance the accuracy of your cost tracking.

Tag pipelines are applied to Cloud Cost metrics from all providers. Tag pipelines are not applied to Cloud Cost Recommendations.

## Create a ruleset

To create a ruleset, navigate to [**Cloud Cost > Settings > Tag Pipelines**][1].

<div class="alert alert-warning"> You can create up to 100 rules. API-based Reference Tables are not supported. </div>

Before creating individual rules, create a ruleset (a folder for your rules) by clicking **+ New Ruleset**.

Within each ruleset, click **+ Add New Rule** and select a rule type: **Add tag**, **Alias tag keys**, or **Map multiple tags**. These rules execute in a sequential, deterministic order from top to bottom.

{{< img src="cloud_cost/pipelines-create-ruleset.png" alt="A list of tag rules on the Tag Pipelines page displaying various categories such as team, account, service, department, business unit, and more" style="width:60%;" >}}

You can organize rules and rulesets to ensure the order of execution matches your business logic.

### Add tag

Add a new tag (key + value) based on the presence of existing tags on your Cloud Costs data.

For example, you can create a rule to tag all resources with their business unit based on the services those resources are a part of.

{{< img src="cloud_cost/pipelines-add-tag.png" alt="Add new business unit tag to resources with service:process-agent or service:process-billing." style="width:60%;" >}}

Under the **Additional options** section, you have the following options:

- **Only apply if tag `{tag}` doesn't exist** - Ensures the rule only applies if the specified tag (`business-unit` in the example above) doesn't already exist.
- **Apply case-insensitive matching to resource tags** - Enables tags defined in the `To resources with tag(s)` field and tags from the cost data to be case insensitive. For example, if resource tags from the UI is: `foo:bar` and the tag from the cost data is `Foo:bar`, then the two can be matched.

### Alias tag keys

Map existing tag values to a more standardized tag.

For example, if your organization wants to use the standard `application` tag key, but several teams have a variation of that tag (like `app`, `webapp`, or `apps`), you can alias `apps` to `application`. Each alias tag rule allows you to alias a maximum of 25 tag keys to a new tag.

{{< img src="cloud_cost/pipelines-alias-tag.png" alt="Add application tag to resources with app, webapp, or apps tag." style="width:60%;" >}}

Add the application tag to resources with `app`, `webapp`, or `apps` tags. The rule stops executing for each resource after a first match is found. For example, if a resource already has a `app` tag, then the rule no longer attempts to identify a `webapp` or `apps` tag.

To ensure the rule only applies if the `application` tag doesn't already exist, click the toggle in the **Additional options** section.

### Map multiple tags

Use [Reference Tables][2] to add multiple tags to cost data without creating multiple rules. This maps the values from your Reference Table's primary key column to values from cost tags. If found, the pipelines adds the selected Reference Table columns as tags to cost data.

For example, if you want to add information about which VPs, organizations, and business_units different AWS and Azure accounts fall under, you can create a table and map the tags.

{{< img src="cloud_cost/pipelines-map-multiple-tags.png" alt="Add account metadata like customer_name using reference tables for tag pipelines" style="width:60%;" >}}

Similar to [Alias tag keys](#alias-tag-keys), the rule stops executing for each resource after a first match is found. For example, if an `aws_member_account_id` is found, then the rule no longer attempts to find a `subscriptionid`.

Under the **Additional options** section, you have the following options:

- **Only apply if columns don't exist** - Ensures the defined columns are only added if they do not already exist with the associated tags from the cost data.
- **Apply case-insensitive matching for primary key values** - Enables case-insensitive matching between the primary key value from the reference table and the value of the tag in the cost data where the tag key matches the primary key. For example, if the primary key value pair from UI is: foo:Bar and the tag from the cost data is foo:bar, then the two can be matched.

## Reserved tags

Certain tags such as `env` and `host` are [reserved tags][4], and are part of [Unified Service Tagging][3]. The `host` tag cannot be added in Tag Pipelines.

Using tags helps correlate your metrics, traces, processes, and logs. Reserved tags like `host` provide visibility and effective monitoring across your infrastructure. For optimal correlation and actionable insights, use these reserved tags as part of your tagging strategy in Datadog.

## Delete tags
To delete a tag created using Tag Pipelines, delete the rule that created it. Within 24 hours, the tag is automatically removed from the most recent three months of data. To remove the tag from older data, request a backfill through [Datadog support][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/tag-pipelines
[2]: /integrations/guide/reference-tables/?tab=manualupload
[3]: /getting_started/tagging/unified_service_tagging/
[4]: /getting_started/tagging/
