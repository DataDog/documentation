---
title: Search and Manage PR Gate Rules 
description: Learn how to search for your PR Gate rules.
aliases:
  - /quality_gates/search/
further_reading:
- link: "/pr_gates"
  tag: "Documentation"
  text: "Learn about PR Gates"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">PR Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

The [**PR Gate Rules** page][1] is useful for developers who want to keep an eye on the PR gates for their build pipelines. You can see all of the rules defined by the organization.

{{< img src="pr_gates/rules_list_2.png" alt="PR Gate rules in Datadog displaying the rule name, evaluation, scope, blocking status, last modified date, and the creator avatar" style="width:100%" >}}

Use this page to create a rule, edit an existing rule, or click on a rule to investigate its past executions.

## Search for rules

To see your PR gate rules, navigate to [**Software Delivery** > **PR Gates** > **PR Gate Rules**][1].

You can filter the page by rule name to see the rules you're most concerned with. Click on a rule to investigate details that show, for example, what commit might have introduced a performance regression or build error. 

## Explore rule executions

Click into a specific rule execution to see the results for past rule execution, including the status and specific conditions. 

{{< img src="pr_gates/executions_sidepanel.png" alt="PR Gate rule displaying the rule execution status over time and rule executions" style="width:100%" >}}

To pivot to related Static Analysis or Software Composition Analysis results in [Datadog Code Security][2], click `See related events`.  You can edit the PR Gate rule according to your execution results by clicking **Manage Rule**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pr-gates/
[2]: /security/code_security/
