---
title: Quality Gates
description: Learn how to use Quality Gates to enable your team to control what code makes it to production.
is_beta: false
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
- link: "https://www.datadoghq.com/blog/datadog-flaky-tests/"
  tag: "Blog"
  text: "Flaky tests: their hidden costs and how to address flaky behavior"
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Quality Gates is in Preview.
{{< /callout >}}

## Overview

Quality Gates allow you to control software quality by configuring rules to block substandard code from deployment. You have control over what is merged into the default branch and deployed to production, and can ensure that the code running in production adheres to high quality standards, reducing incidents and minimizing unwanted behaviors.

{{< img src="quality_gates/setup/sca_2.png" alt="An SCA rule that triggers a failure if any library vulnerabilities with critical or high severity are detected in the repository." style="width:100%" >}}

Use Quality Gates to:

* Create rules that block workflows using data in Datadog, ensuring that only code that meets your standards end up in production.
* Give your organization the ability to decide what code makes it to production, enhancing your deployment discipline and mitigating potential issues in live environments.
* Continually improve code quality and system performance with precise enforcement and customizable rules.

You can configure Quality Gates rules for the following categories: 

[Test Optimization][9]

: <br> - New flaky tests <br> - Code coverage

[Static Analysis][11]

: <br> - Code vulnerability violations <br> - Code quality violations

[Software Composition Analysis][12]

: <br> - Vulnerabilities <br> - Detected licenses

By integrating Quality Gates [into your CI/CD pipelines][7] or allowing the [Datadog GitHub integration][13] to create status checks on your Pull Requests automatically (currently available for SCA rules only), you can create a robust framework for maintaining and improving software quality that aligns with your organization's operational goals and business objectives. 

## Setup

Quality Gates offers the following rule types:

{{< tabs >}}
{{% tab "Tests" %}}

You can create rules to block code from being merged that introduces new [flaky tests][101] or that decreases [code coverage][102].

{{< img src="quality_gates/setup/flaky_test_2.png" alt="A Quality Gate rule that blocks when one or more flaky tests occur" style="width:80%" >}}

[101]: /tests/flaky_test_management/
[102]: /tests/code_coverage/

{{% /tab %}}
{{% tab "Static Analysis" %}}

You can create rules to block code from being merged when your repository has a certain number of code quality or code vulnerability violations.

{{< img src="quality_gates/setup/static_analysis_2.png" alt="A Quality Gate rule that fails when one or more new code quality violations of error-level severity are contained in the repository" style="width:80%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

You can create rules to block code from being merged when your repository has a certain number of library vulnerabilities or forbidden licenses.

{{< img src="quality_gates/setup/sca_2.png" alt="A Quality Gate rule that fails when one or more critical or high severity library vulnerabilities are contained in the repository" style="width:80%" >}}

{{% /tab %}}
{{< /tabs >}}

To create a Quality Gate rule, see the [Setup documentation][2]. 

## Search rules

You can evaluate and update quality control processes by accessing Quality Gates rules on the [**Quality Gates Rules** page][6]. Improve your deployment practices based on your project requirements and desired performance outcomes. 

{{< img src="quality_gates/rules_list_2.png" alt="List of Quality Gate rules in Datadog" style="width:100%" >}}

To search for Quality Gate rules, see the [Search and Manage documentation][5].

## Analyze executions in the Quality Gates Explorer

You can search and filter for quality gates or rule executions, create visualizations, and export saved views of your search query on the [**Quality Gates Executions** page][14].

{{< tabs >}}
{{% tab "Gates" %}}

{{< img src="quality_gates/explorer/gates_3.png" alt="Quality Gate results in the Quality Gates Explorer" style="width:100%" >}}

{{% /tab %}}
{{% tab "Rule Executions" %}}

{{< img src="quality_gates/explorer/executions_1.png" alt="Quality Gate rule execution results in the Quality Gates Explorer" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

For more information, see the [Quality Gates Explorer documentation][8].

## Track changes in rules

You can view information about who created, modified, and deleted Quality Gates rules in [Audit Trail][3].

{{< img src="/quality_gates/audit_event.png" alt="A Quality Gates event in Datadog Audit Trail" style="width:100%" >}}

For more information, see the [Audit Trail documentation][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/flaky_test_management/
[2]: /quality_gates/setup/
[3]: /account_management/audit_trail/
[4]: /account_management/audit_trail/events/#ci-visibility-events
[5]: /quality_gates/search/
[6]: https://app.datadoghq.com/ci/quality-gates
[7]: https://github.com/DataDog/datadog-ci
[8]: /quality_gates/explorer/
[9]: /tests/
[10]: /continuous_integration/
[11]: /security/code_security/static_analysis
[12]: /security/code_security/software_composition_analysis
[13]: /integrations/github/
[14]: https://app.datadoghq.com/ci/quality-gates/executions
