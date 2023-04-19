---
title: Enhancing Developer Workflows with Datadog 
kind: guide
description: Learn how to use Datadog CI Visibility & other features to accelerate your development process.
further_reading:
  - link: "https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/"
    tag: "Blog"
    text: "Monitor your GitHub Actions workflows with Datadog CI Visibility"
  - link: "/integrations/guide/source-code-integration"
    tag: "Documentation"
    text: "Learn about the GitHub integration"
---

## Overview

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

CI Test Visibility integrates with other developer-oriented Datadog products as well as external partners such as GitHub to streamline developer workflows. Relevant features include being able to:
- Create and open GitHub issues 
- Open tests in GitHub and your IDE
- [Enabling Test Summaries in GitHub Pull Request Comments][1]

These features are available for all Test Visibility customers, and they do not require usage of the Datadog GitHub App integration.

## Create and open GitHub issues
From Test Visibility, you can create and open pre-filled GitHub issues with relevant context into your tests as well as deep links back to Datadog for more streamlined debugging workflows. Creating issues directly from Test Visibility can help you track and maintain accountability for test failures and flaky tests.

### In-app entry points

You can create pre-filled GitHub issues from three areas within CI Test Visibility:

1. Commit Overview (from Commits table) 
2. Branch Overview 
3. Test Detail View

#### Commit Overview
{{< img src="ci/github_issues_light.png" alt="Datadog GitHub issues preview" style="width:100%;">}}

The overview page for any commit can be discovered through a particular branch or from within any particular test. 

From the Commit Overview page, click on any row in the `Failed Tests` or `New Flaky Tests` tables and select `Open issue in GitHub`. 

#### Branch Overview
From this page, click on any row in the `Flaky Tests` table and select `Open issue in GitHub`.
{{< img src="ci/github_issues_flaky_light.png" alt="Datadog GitHub issues flaky tests table preview" style="width:100%;">}}

#### Test Detail View
From within a specific test run, click the `Actions` button at the top right and select `Open issue in GitHub`. 
{{< img src="ci/github_issues_detail_light.png" alt="Datadog GitHub issues test detail view preview" style="width:100%;">}}

You also have the option to copy an issue description in Markdown for pasting test details elsewhere. The Markdown description will contain information such as the test execution link, service, branch, commit, author, and error. 
{{< img src="ci/github_issues_markdown.png" alt="Copy issue description in Markdown format for GitHub issues" style="width:40%;">}}

### Sample GitHub issue
Below is what a pre-filled GitHub issue might look like:
{{< img src="ci/prefilled_github_issue.png" alt="Pre-filled GitHub issue" style="width:60%;">}}

## Open tests in GitHub and your IDE
### In-app entry points
After detecting a failed and/or flaky test within Datadog, you have the option to open that test in GitHub or your IDE to fix it immediately.

Under the Error Message section in the Overview tab of a test run, click the `View Code` button to view the relevant lines of code for that test within Visual Studio Code, IntelliJ, or GitHub.
The order of options in this dropdown changes depending on the language your test was written in:

- IntelliJ is prioritized for Java-based tests
- Visual Studio Code is prioritized for JavaScript and Python-based tests
{{< img src="ci/IDE.png" alt="Open test in IDE" style="width:30%;">}}

### Installing IDE plugins
IDE plugins/extensions are required to view your test in your IDE. 
- If you do not have the VS Code extension installed, clicking `View in VS Code` will open the extension directly in VS Code for installation.
- If you do not have the IntelliJ plugin installed, clicking `View in IntelliJ` leads to the extension installation. Compatible Datadog versions can be found [here.][2] 

## Test summaries in GitHub pull requests
Datadog integrates with GitHub to show test result summaries and error messages for failed tests in pull request comments. To learn more, see this [guide.][1] 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/test-service
