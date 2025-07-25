---
title: PR Gates
description: Learn how to use PR Gates to enable your team to control what code makes it to production.
is_beta: false
aliases:
  - /quality_gates/
  - /quality_gates/explorer/
  - /quality_gates/explorer/search_syntax/
  - /quality_gates/explorer/facets/
  - /quality_gates/explorer/saved_views/
  - /quality_gates/search/
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

{{< img src="pr_gates/setup/sca_3.png" alt="An SCA rule that triggers a failure if any library vulnerabilities with critical or high severity are detected in the repository." style="width:100%" >}}

Use PR Gates to:

* Create rules that block workflows using data in Datadog, ensuring that only code that meets your standards end up in production.
* Give your organization the ability to decide what code makes it to production, enhancing your deployment discipline and mitigating potential issues in live environments.
* Continually improve code quality and system performance with precise enforcement and customizable rules.

You can configure PR Gates rules for the following categories: 

| Source type     | Condition types |
| --- | ----------- |
| [**Static Code Analysis**][11] | <li> Code vulnerability violations <li> Code quality violations |
| [**Software Composition Analysis**][12] | <li> Library vulnerability violations <li> Detected license violations |
| [**Code Coverage**][15] | <li> Total code coverage threshold <li> Patch code coverage threshold |
| [**Infrastructure as Code Scanning**][15] | <li> IaC vulnerability severity |

By integrating PR Gates [into your CI/CD pipelines][7] or allowing the [Datadog GitHub integration][13] to create status checks on your Pull Requests automatically (available for SCA rules only), you can create a robust framework for maintaining and improving software quality that aligns with your organization's operational goals and business objectives. 

## Rule types

PR Gates offers the following rule types:

{{< tabs >}}
{{% tab "Static Code Analysis" %}}

You can create rules to block code from being merged when a pull request introduces at least one code vulnerability or code quality violation of a certain severity.

{{< img src="pr_gates/setup/static_analysis_3.png" alt="A PR Gate rule that fails when one or more new code quality violations of error-level severity are contained in the repository" style="width:80%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

You can create rules to block code from being merged when a pull request introduces at least one library vulnerability or forbidden license of a certain severity.

{{< img src="pr_gates/setup/sca_3.png" alt="A PR Gate rule that fails when one or more critical or high severity library vulnerabilities are contained in the repository" style="width:80%" >}}

{{% /tab %}}
{{% tab "Code Coverage" %}}
You can create rules to block code from being merged when a pull request causes the repository's overall code coverage to fall below a certain percentage.

{{< img src="pr_gates/setup/code_coverage.png" alt="A PR Gate rule that fails when one or more critical or high severity library vulnerabilities are contained in the repository" style="width:80%" >}}


{{% /tab %}}

{{% tab "Infrastructure as Code Scanning" %}}
You can create rules to block code from being merged when a pull request introduces at least one infrastructure as code (IaC) vulnerability of a certain severity.


{{< img src="pr_gates/setup/iac.png" alt="A PR Gate rule that fails when one or more critical or high severity library vulnerabilities are contained in the repository" style="width:80%" >}}


{{% /tab %}}
{{< /tabs >}}

To create a PR Gate rule, see the [Setup documentation][2]. 

## Manage rules

You can evaluate and update quality control processes by accessing PR Gates rules on the [**PR Gates Rules**][6] page. Improve your deployment practices based on your project requirements and desired performance outcomes. 

This view is useful for developers who want to keep an eye on the PR gates for their build pipelines. You can see all of the rules defined by the organization.

{{< img src="pr_gates/rules_list_3.png" alt="List of PR Gate rules in Datadog" style="width:100%" >}}

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
[6]: https://app.datadoghq.com/ci/pr-gates
[7]: https://github.com/DataDog/datadog-ci
[9]: /tests/
[10]: /continuous_integration/
[11]: /security/code_security/static_analysis
[12]: /security/code_security/software_composition_analysis
[13]: /integrations/github/
[15]: https://www.datadoghq.com/product-preview/code-coverage
[16]: /security/code_security/iac_security/
