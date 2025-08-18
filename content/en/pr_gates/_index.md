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
- link: "https://www.datadoghq.com/blog/datadog-flaky-tests/"
  tag: "Blog"
  text: "Flaky tests: their hidden costs and how to address flaky behavior"
- link: "https://www.datadoghq.com/blog/datadog-iac-security/"
  tag: "Blog"
  text: "Prevent cloud misconfigurations from reaching production with Datadog IaC Security"
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
PR Gates are in Preview.
{{< /callout >}}

## Overview

PR Gates allow you to control software security and quality by configuring rules to block pull requests with substandard code from being merged. Preventing pull requests with substandard code from being merged can ensure that the code that is eventually deployed to production adheres to high organizational standards, reducing incidents and minimizing unwanted behaviors.

{{< img src="pr_gates/setup/sca_3.png" alt="An SCA rule that triggers a failure if any library vulnerabilities with critical or high severity are detected in the repository." style="width:100%" >}}

Use PR Gates to:

* Create rules that block pull requests using data in Datadog, ensuring that only code that meets your standards end up being merged.
* Give your organization the ability to prevent substandard code changes from ever reaching production.
* Continually improve code security and quality with precise enforcement and customizable rules.

You can configure PR Gates rules for the following categories: 

| Source type     | Condition types |
| --- | ----------- |
| [**Static Code Analysis**][11] | <li> Code vulnerabilities <li> Code quality violations |
| [**Software Composition Analysis**][12] | <li> Library vulnerabilities <li> Library license violations |
| [**Code Coverage**][15] | <li> Total code coverage <li> Patch code coverage |
| [**Infrastructure as Code Scanning**][16] | <li> IaC vulnerabilities |

After creating PR Gates rules, Datadog will automatically create checks on your pull requests using the [GitHub integration][13] or [Azure DevOps integration][14]. Set those checks as required in GitHub or Azure DevOps when you are ready to enforce them.

## Rule types

PR Gates offers the following rule types:

{{< tabs >}}
{{% tab "Static Code Analysis (SAST)" %}}

You can create rules to block code from being merged when a pull request introduces at least one code vulnerability or code quality violation of a certain severity.

{{< img src="pr_gates/setup/static_analysis_3.png" alt="A PR Gate rule that fails when one or more new code quality violations of error-level severity are contained in the repository" style="width:80%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis (SCA)" %}}

You can create rules to block code from being merged when a pull request introduces at least one library vulnerability of a certain severity or at least one library with a forbidden license.

{{< img src="pr_gates/setup/sca_3.png" alt="A PR Gate rule that fails when one or more critical or high severity library vulnerabilities are contained in the repository" style="width:80%" >}}

{{% /tab %}}
{{% tab "Code Coverage" %}}
You can create rules to block code from being merged when a pull request causes the repository's overall code coverage to fall below a certain percentage or if the patch coverage is below a certain threshold.

{{< img src="pr_gates/setup/code_coverage.png" alt="A PR Gate rule that fails when one or more critical or high severity library vulnerabilities are contained in the repository" style="width:80%" >}}


{{% /tab %}}

{{% tab "Infrastructure as Code Scanning" %}}
You can create rules to block code from being merged when a pull request introduces at least one infrastructure as code (IaC) vulnerability of a certain severity.


{{< img src="pr_gates/setup/iac.png" alt="A PR Gate rule that fails when one or more critical or high severity library vulnerabilities are contained in the repository" style="width:80%" >}}


{{% /tab %}}
{{< /tabs >}}

To create a PR Gate rule, see the [Setup documentation][2]. 

## Manage rules

You can manage and update PR Gates rules on the [**PR Gates Rules**][6] page. Improve your security and quality practices based on your project requirements and risk tolerances. 

You can see all of the rules defined by the organization.

{{< img src="pr_gates/rules_list_3.png" alt="List of PR Gate rules in Datadog" style="width:100%" >}}

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
[14]: /integrations/azure_devops_source_code/
[15]: https://www.datadoghq.com/product-preview/code-coverage
[16]: /security/code_security/iac_security/