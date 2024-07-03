---
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management について
- link: /getting_started/tagging/
  tag: ドキュメント
  text: タグの使用を開始する
- link: /integrations/guide/reference-tables
  tag: ドキュメント
  text: Learn about Reference Tables
title: タグパイプライン
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

To effectively monitor cloud costs, you need a comprehensive understanding of how various services, teams, and products contribute to your overall spending. Tag Pipelines enforce the use of standardized tags across your cloud resources and ensure consistent, accurate cost attribution throughout your organization.

With [Tag Pipelines][1], you can create tag rules to address missing or incorrect tags on your cloud bills. You can also create new inferred tags that align with specific business logic to enhance the accuracy of your cost tracking.

## Create a ruleset

<div class="alert alert-warning"> You can create up to 100 rules. API-based Reference Tables are not supported. </div>

Before creating individual rules, create a ruleset (a folder for your rules) by clicking **+ New Ruleset**. 

Within each ruleset, click **+ Add New Rule** and select a rule type: **Add tag**, **Alias tag keys**, or **Map multiple tags**. These rules execute in a sequential, deterministic order from top to bottom. 

{{< img src="cloud_cost/tags_order.png" alt="A list of tag rules on the Tag Pipelines page displaying various categories such as team, account, service, department, business unit, and more" style="width:80%;" >}}

You can organize rules and rulesets to ensure the order of execution matches your business logic.

### タグの追加

Add a new tag (key + value) based on the presence of existing tags on your Cloud Costs data.

For example, you can create a rule to tag all resources with their business unit based on the services those resources are a part of.

{{< img src="cloud_cost/tags_addnew.png" alt="Add new business unit tag to resources with service:processing, service:creditcard, or service:payment-notification." style="width:60%;" >}}

To ensure the rule only applies if the `business_unit` tag doesn't already exist, click the toggle in the **Additional options** section.

### タグキーのエイリアス設定

Map existing tag values to a more standardized tag.

For example, if your organization wants to use the standard `application` tag key, but several teams have a variation of that tag (like `app`, `webapp`, or `apps`), you can alias `apps` to `application`. Each alias tag rule allows you to alias a maximum of 25 tag keys to a new tag.

{{< img src="cloud_cost/tags_alias.png" alt="Add application tag to resources with app, webapp, or apps tag." style="width:60%;" >}}

Add the application tag to resources with `app`, `webapp`, or `apps` tags. The rule stops executing for each resource after a first match is found. For example, if a resource already has a `app` tag, then the rule no longer attempts to identify a `webapp` or `apps` tag.

To ensure the rule only applies if the `application` tag doesn't already exist, click the toggle in the **Additional options** section.

### 複数のタグのマッピング

[リファレンステーブル][2]を使用すると、複数のルールを作成することなく、コストデータに複数のタグを追加できます。これにより、リファレンステーブルのプライマリキー列の値がコストタグの値にマップされます。見つかった場合、パイプラインは選択したリファレンステーブルの列をタグとしてコストデータに追加します。

For example, if you want to add information about which VPs, organizations, and business_units different AWS and Azure accounts fall under, you can create a table and map the tags. 

{{< img src="cloud_cost/tags_mapmultiple.png" alt="Add account metadata like vp, organization, and businessunit using reference tables for tag pipelines" style="width:60%;" >}}

Similar to [Alias tag keys](#alias-tag-keys), the rule stops executing for each resource after a first match is found. For example, if an `aws_member_account_id` is found, then the rule no longer attempts to find a `subscriptionid`.

## Reserved tags

Certain tags such as `env` and `host` are [reserved tags][4], and are part of [Unified Service Tagging][3]. The `host` tag cannot be added in Tag Pipelines. 

Using tags helps correlate your metrics, traces, processes, and logs. Reserved tags like `host` provide visibility and effective monitoring across your infrastructure. For optimal correlation and actionable insights, use these reserved tags as part of your tagging strategy in Datadog.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/tag-pipelines
[2]: /ja/integrations/guide/reference-tables/?tab=manualupload
[3]: /ja/getting_started/tagging/unified_service_tagging/
[4]: /ja/getting_started/tagging/