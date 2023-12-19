---
title: Search and Manage Quality Gate Rules 
description: Learn how to search for your Quality Gate rules.
further_reading:
- link: "/quality_gates"
  tag: "Documentation"
  text: "Learn about Quality Gates"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Quality Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates is in public beta.
{{< /callout >}}

## Overview

The [Quality Gate Rules page][1] is useful for developers who want to keep an eye on the quality gates for their build pipelines.

{{< img src="quality_gates/search.png" alt="Quality Gate rules in Datadog displaying the rule name, evaluation, scope, blocking status, last modified date, and the creator avatar" style="width:100%" >}}

## Search for rules

To see your quality gate rules, navigate to [**CI** > **Quality Gate Rules**][1].

The [Quality Gate Rules page][1] shows all of the rules defined by the organization. Use this page to create a rule, edit an existing rule, or click on a rule to investigate its past executions.

You can filter the page by rule name to see the rules you're most concerned with. Click on a rule to investigate details that show, for example, what commit might have introduced a performance regression or build error. 

## Explore rule executions

Click into a specific rule execution to see the _Rule Details_ page which provides a view of the data for the Quality Gate rule you selected over a specified time frame.

{{< img src="quality_gates/rule.png" alt="Quality Gate rule displaying the rule execution status over time and rule executions" style="width:100%" >}}

The rule execution list shows all the times that a Quality Gate rule was executed during the selected time frame. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/quality-gates
