---
description: Learn how to search for your Quality Gate rules.
further_reading:
- link: /quality_gates
  tag: Documentation
  text: Learn about Quality Gates
title: Search and Manage Quality Gate Rules
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Quality Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## 概要

The [**Quality Gate Rules** page][1] is useful for developers who want to keep an eye on the quality gates for their build pipelines. You can see all of the rules defined by the organization.

{{< img src="quality_gates/search.png" alt="Quality Gate rules in Datadog displaying the rule name, evaluation, scope, blocking status, last modified date, and the creator avatar" style="width:100%" >}}

Use this page to create a rule, edit an existing rule, or click on a rule to investigate its past executions.

## Search for rules

To see your quality gate rules, navigate to [**Software Delivery** > **Quality Gates** > **Quality Gate Rules**][1].

You can filter the page by rule name to see the rules you're most concerned with. Click on a rule to investigate details that show, for example, what commit might have introduced a performance regression or build error. 

## ルール実行を探る

Click into a specific rule execution to see the results for past rule execution, including the status and specific conditions. 

{{< img src="quality_gates/executions_sidepanel.png" alt="Quality Gate rule displaying the rule execution status over time and rule executions" style="width:100%" >}}

To pivot to related Static Analysis or Software Composition Analysis results in [Datadog Code Analysis][2], click `See related events`.  You can edit the Quality Gate rule according to your execution results by clicking **Manage Rule**.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/quality-gates
[2]: /ja/code_analysis/