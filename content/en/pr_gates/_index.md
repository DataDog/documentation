---
title: PR Gates
description: Learn how to use PR Gates to enable your team to control what code makes it to production.
is_beta: false
aliases:
  - /quality_gates/
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
- link: "/pr_gates/explorer"
  tag: "Documentation"
  text: "Learn about the PR Gates Explorer"
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Learn about Audit Trail"
- link: "https://www.datadoghq.com/blog/datadog-flaky-tests/"
  tag: "Blog"
  text: "Flaky tests: their hidden costs and how to address flaky behavior"
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
PR Gates is in Preview.
{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">PR Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

PR Gates allow you to control software quality by configuring rules to block substandard code from deployment. You have control over what is merged into the default branch and deployed to production, and can ensure that the code running in production adheres to high quality standards, reducing incidents and minimizing unwanted behaviors.

{{< img src="pr_gates/setup/sca_2.png" alt="An SCA rule that triggers a failure if any library vulnerabilities with critical or high severity are detected in the repository." style="width:100%" >}}

Use PR Gates to:

* Create rules that block workflows using data in Datadog, ensuring that only code that meets your standards end up in production.
* Give your organization the ability to decide what code makes it to production, enhancing your deployment discipline and mitigating potential issues in live environments.
* Continually improve code quality and system performance with precise enforcement and customizable rules.

You can configure PR Gates rules for the following categories: 

[Test Optimization][9]

: <br> - New flaky tests <br> - Code coverage

[Static Analysis][11]

: <br> - Code vulnerability violations <br> - Code quality violations

[Software Composition Analysis][12]

: <br> - Vulnerabilities <br> - Detected licenses

By integrating PR Gates [into your CI/CD pipelines][7] or allowing the [Datadog GitHub integration][13] to create status checks on your Pull Requests automatically (currently available for SCA rules only), you can create a robust framework for maintaining and improving software quality that aligns with your organization's operational goals and business objectives. 

## Setup

PR Gates offers the following rule types:

{{< tabs >}}
{{% tab "Tests" %}}

You can create rules to block code from being merged that introduces new [flaky tests][101] or that decreases [code coverage][102].

{{< img src="pr_gates/setup/flaky_test_2.png" alt="A PR Gate rule that blocks when one or more flaky tests occur" style="width:80%" >}}

[101]: /tests/flaky_test_management/
[102]: /tests/code_coverage/

{{% /tab %}}
{{% tab "Static Analysis" %}}

You can create rules to block code from being merged when your repository has a certain number of code quality or code vulnerability violations.

{{< img src="pr_gates/setup/static_analysis_2.png" alt="A PR Gate rule that fails when one or more new code quality violations of error-level severity are contained in the repository" style="width:80%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

You can create rules to block code from being merged when your repository has a certain number of library vulnerabilities or forbidden licenses.

{{< img src="pr_gates/setup/sca_2.png" alt="A PR Gate rule that fails when one or more critical or high severity library vulnerabilities are contained in the repository" style="width:80%" >}}

{{% /tab %}}
{{< /tabs >}}

To create a PR Gate rule, see the [Setup documentation][2]. 

## Search rules

You can evaluate and update quality control processes by accessing PR Gates rules on the [**PR Gates Rules** page][6]. Improve your deployment practices based on your project requirements and desired performance outcomes. 

{{< img src="pr_gates/rules_list_2.png" alt="List of PR Gate rules in Datadog" style="width:100%" >}}

To search for PR Gate rules, see the [Search and Manage documentation][5].

## Analyze executions in the PR Gates Explorer

You can search and filter for PR gates or rule executions, create visualizations, and export saved views of your search query on the [**PR Gates Executions** page][14].

{{< tabs >}}
{{% tab "Gates" %}}

{{< img src="pr_gates/explorer/gates_3.png" alt="PR Gate results in the PR Gates Explorer" style="width:100%" >}}

{{% /tab %}}
{{% tab "Rule Executions" %}}

{{< img src="pr_gates/explorer/executions_1.png" alt="PR Gate rule execution results in the PR Gates Explorer" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

For more information, see the [PR Gates Explorer documentation][8].

## Track changes in rules

You can view information about who created, modified, and deleted PR Gates rules in [Audit Trail][3].

{{< img src="pr_gates/audit_event.png" alt="A PR Gates event in Datadog Audit Trail" style="width:100%" >}}

For more information, see the [Audit Trail documentation][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/flaky_test_management/
[2]: /pr_gates/setup/
[3]: /account_management/audit_trail/
[4]: /account_management/audit_trail/events/#ci-visibility-events
[5]: /pr_gates/search/
[6]: https://app.datadoghq.com/ci/pr-gates
[7]: https://github.com/DataDog/datadog-ci
[8]: /pr_gates/explorer/
[9]: /tests/
[10]: /continuous_integration/
[11]: /security/code_security/static_analysis
[12]: /security/code_security/software_composition_analysis
[13]: /integrations/github/
[14]: https://app.datadoghq.com/ci/pr-gates/
