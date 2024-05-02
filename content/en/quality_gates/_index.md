---
title: Quality Gates
kind: documentation
description: Learn how to use Quality Gates to enable your team to control what code makes it to production.
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
- link: "https://www.datadoghq.com/blog/datadog-quality-gates/"
  tag: "Blog"
  text: "Enhance code reliability with Datadog Quality Gates"
- link: "https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/"
  tag: "Blog"
  text: "Use Datadog monitors as quality gates for GitHub Actions deployments"
- link: "/quality_gates/explorer"
  tag: "Documentation"
  text: "Learn about the Quality Gates Explorer"
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Learn about Audit Trail"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Quality Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates is in public beta.
{{< /callout >}}

## Overview

Quality Gates allows you to proactively enhance software quality by setting rules to block substandard code from deployment. You have control over what is merged into the default branch and deployed to production, and can ensure that the code running in production adheres to high quality standards, reducing incidents and minimizing unwanted behaviors.

Use Quality Gates to:

* Create rules that block workflows by using data in Datadog, ensuring that only code that has passed tests affects your production environment.
* Give your organization the ability to decide what code makes it to production, enhancing your deployment discipline and mitigating potential issues in live environments.
* Continually improve code quality and system performance with precise enforcement and customizable rules.

By integrating Quality Gates [into your CI/CD pipelines][7], you can create a robust framework for maintaining and improving software quality that aligns with your organization's operational goals and business objectives. 

## Setup

You can create rules to block code from being merged if it introduces new [flaky tests][1], code quality/vulnerability violations, software vulnerabilities and forbidden licenses, or issues that wouldn't normally fail your CI/CD pipelines and end up deployed to production.

{{< img src="quality_gates/rule_type.png" alt="Options for Quality Gates rule types in Datadog" style="width:80%" >}}

To create a Quality Gate rule, see the [Setup documentation][2]. 

## Search rules

You can evaluate and update quality control processes by accessing Quality Gates rules on the [**Quality Gates Rules** page][6]. Improve your deployment practices based on your project requirements and desired performance outcomes. 

{{< img src="quality_gates/rules_list.png" alt="List of Quality Gate rules in Datadog" style="width:100%" >}}

To access Quality Gate rules, see the [Search and Manage documentation][5].

## Track changes in rules

You can view information about who created, modified, and deleted Quality Gates rules in [Audit Trail][3].

{{< img src="/quality_gates/audit_event.png" alt="A Quality Gates event in Datadog Audit Trail" style="width:100%" >}}

For more information, see the [Audit Trail documentation][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/guides/flaky_test_management/
[2]: /quality_gates/setup/
[3]: /account_management/audit_trail/
[4]: /account_management/audit_trail/events/#ci-visibility-events
[5]: /quality_gates/search/
[6]: https://app.datadoghq.com/ci/quality-gates
[7]: /monitors/guide/github_gating/