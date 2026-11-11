---
title: PR Comments
description: "Learn how Datadog posts automated comments on your pull requests through source code management integrations."
further_reading:
- link: "/source_code/source-code-management/"
  tag: "Documentation"
  text: "Learn about source code management provider integrations"
- link: "/pr_gates/"
  tag: "Documentation"
  text: "Learn about PR Gates"
---

PR comments are automated comments added by Datadog's [source code management integrations][10] to inform developers of issues detected in their code changes and, in certain cases, suggest remediation.

<div class="alert alert-warning">
  PR comments are not supported in pull requests in public repositories, or on pull requests targeting a destination branch in a different repository from the source branch (that is, forked repositories trying to merge into the main repository).
</div>

There is a maximum of 31 unique comments per PR at any time to reduce noise and clutter. These comments include:
* One summary comment is always posted to give a high-level view of all the issues Datadog detected in the PR. This comment is edited by Datadog as new commits pushed to the PR change the results.
* For products that post inline comments, such as Code Security, up to 30 inline comments are posted. Each one appears on the line of code that triggered a violation. If more than 30 violations are introduced in the PR's diff, the 30 highest severity violations are posted.
* Datadog posts a 👀 reaction on the description of the PR when a product that has PR comments (or [PR Gates][11]) enabled is still waiting for results to arrive. After all results have arrived:
  * If all results are positive, the reaction is changed to 👍.
  * If there is at least one finding, the 👀 reaction is removed because the summary comment includes details on the findings instead.

## PR comments for CI Visibility

PR comments are enabled by default when first onboarding to [CI Visibility][7] if a [source code management integration][10] is installed correctly. Datadog posts a comment summarizing the failed jobs detected in your pull request.

{{< img src="source_code_integration/ci-visibility-pr-comment.png" alt="PR Comment summarizing failed jobs detected by CI Visibility" style="width:100%;">}}

To disable PR comments for CI Visibility, go to the [CI Visibility Repository Settings][12].

## PR comments for Code Security

PR comments are enabled by default when first onboarding to [Code Security][8] if a [source code management integration][10] is installed correctly. Datadog posts two types of comments on your pull requests:

1. A single comment summarizing the new violations detected in your pull request.

{{< img src="source_code_integration/code-security-summary-pr-comment.png" alt="PR Comment summarizing the new violations detected by Code Security" style="width:100%;">}}

2. Inline comments for each violation detected in your pull request placed directly on the lines of code that triggered the violation in the diff of the pull request.

{{< img src="source_code_integration/code-security-inline-pr-comment.png" alt="Inline comment for a specific violation detected by Code Security" style="width:100%;">}}

To disable PR comments for Code Security, go to the [Code Security Repository Settings][13].

## PR comments for Test Optimization

PR comments are enabled by default when first onboarding to [Test Optimization][9] if a [source code management integration][10] is installed correctly. Datadog posts a comment summarizing the failed and flaky tests detected in your pull request.

{{< img src="source_code_integration/test-optimization-pr-comment.png" alt="PR Comment summarizing failed and flaky tests detected by Test Optimization" style="width:100%;">}}

To disable PR comments for Test Optimization, go to the [Test Optimization Advanced Features Settings][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[7]: /continuous_integration/
[8]: /security/code_security/
[9]: /tests/
[10]: /source_code/source-code-management/
[11]: /pr_gates
[12]: https://app.datadoghq.com/ci/settings/ci-visibility
[13]: https://app.datadoghq.com/security/configuration/code-security/settings
[14]: https://app.datadoghq.com/ci/settings/test-optimization/advanced-features
