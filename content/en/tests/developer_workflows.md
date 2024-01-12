---
title: Enhancing Developer Workflows with Datadog 
kind: documentation
description: Learn how to use Datadog CI Visibility & other features to accelerate your development process.
aliases:
- /continuous_integration/guides/developer_workflows
- /continuous_integration/guides/pull_request_comments
- /continuous_integration/integrate_tests/developer_workflows
- /continuous_integration/tests/developer_workflows
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/"
  tag: "Blog"
  text: "Monitor your GitHub Actions workflows with Datadog CI Visibility"
- link: "/integrations/guide/source-code-integration"
  tag: "Documentation"
  text: "Learn about the source code integration"
---

## Overview

{{< site-region region="gov" >}}
<div class="alert alert-warning">Test Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

[Test Visibility][5] integrates with other developer-oriented Datadog products as well as external partners such as GitHub to streamline developer workflows with features including being able to:

- [Create and open GitHub issues](#create-and-open-github-issues) 
- [Open tests in GitHub and your IDE](#open-tests-in-github-and-your-ide)
- [Enable test summaries in GitHub Pull Request comments](#test-summaries-in-github-pull-requests)

These features are available for all Test Visibility customers, and they do not require usage of the [Datadog GitHub integration][4].

## Create and open GitHub issues

With Test Visibility, you can create and open pre-filled GitHub issues with relevant context into your tests as well as deep links back to Datadog for more streamlined debugging workflows. Creating issues directly from Test Visibility can help you track and maintain accountability for test failures and flaky tests.

### In-app entry points

You can create pre-filled GitHub issues from three areas within Test Visibility:

- [Commit Overview page (from the **Commits** table)](#commit-overview) 
- [Branch Overview page](#branch-overview)
- [Test Details side panel](#test-details-view)

#### Commit Overview

The overview page for any commit can be discovered through a particular branch or from within any particular test. 

{{< img src="ci/github_issues_commit_overview_updated.png" alt="Datadog GitHub issues preview" style="width:100%;">}}

From the Commit Overview page, click on any row in the `Failed Tests` or `New Flaky Tests` tables and select **Open issue in GitHub**. 

#### Branch Overview
From this page, click on any row in the **Flaky Tests** table and select **Open issue in GitHub**.

{{< img src="ci/github_issues_flaky_test_updated.png" alt="Datadog GitHub issues flaky tests table preview" style="width:100%;">}}

#### Test Details View
From within a specific test run, click the **Actions** button and select **Open issue in GitHub**. 

{{< img src="ci/github_issues_detail_light.png" alt="Datadog GitHub issues test detail view preview" style="width:100%;">}}

You also have the option to copy an issue description in Markdown for pasting test details elsewhere. The Markdown description contains information such as the test execution link, service, branch, commit, author, and error. 

{{< img src="ci/github_issues_markdown.png" alt="Copy issue description in Markdown format for GitHub issues" style="width:50%;">}}

### Sample GitHub issue
Below is what a pre-filled GitHub issue might look like:
{{< img src="ci/prefilled_github_issue.png" alt="Pre-filled GitHub issue" style="width:80%;">}}

## Open tests in GitHub and your IDE
### In-app entry points
After detecting a failed and/or flaky test within Datadog, you have the option to open that test in GitHub or your IDE to fix it immediately.

Under the **Error Message** section in the **Overview** tab of a test run, click the **View Code** button to view the relevant lines of code for that test within Visual Studio Code, IntelliJ, or GitHub.

{{< img src="ci/IDE.png" alt="Open test in IDE" style="width:50%;">}}

The order of options in this dropdown changes depending on the language your test was written in:

- IntelliJ is prioritized for Java-based tests
- Visual Studio Code is prioritized for JavaScript and Python-based tests

### Installing IDE plugins
IDE plugins and extensions are required to view your test in your IDE. 
- If you do not have the VS Code extension installed, click **View in VS Code** to open the extension directly in VS Code for installation.
- If you do not have the IntelliJ plugin installed, click **View in IntelliJ** to get the extension installation. Compatible Datadog versions can be found on the [Plugin Versions page][2].

## Test summaries in GitHub pull requests

Datadog integrates with GitHub to show test results summaries directly in your pull requests. The summary contains an overview of the tests executions, flakiness information, error messages for failed tests, performance regressions, and code coverage changes in pull request comments.

{{< img src="ci/github_comments_light.png" alt="Datadog GitHub pull request comment preview" style="width:100%;">}}

With this report, developers get instant feedback about their tests results, including the ability to debug any failed or flaky tests without leaving the pull request view.

<div class="alert alert-info">This integration is only available for test services hosted on `github.com`.</div>

### Enable test summaries

You can enable test summaries in pull requests with the following steps:

1. Install the [GitHub integration][4]:
   1. Navigate to the **Configuration** tab on the [GitHub integration tile][6] and click **+ Create GitHub App**.
   2. Give the application read and write permissions for pull requests.
2. Enable test summaries for one or more test services. It can be done from the [Test Service Settings page][3] or from the commit/branch page.

### Test service settings page

1. Navigate to the [Test Service Settings page][3] and search for the repository or test service.
2. Click on the toggle under the **GitHub Comments** column for the desired service.

{{< img src="ci/enable-settings-github-comments.png" alt="The Test Service Settings tab in Datadog with GitHub comments enabled for one test service" style="width:100%;">}}

### Commit or branch page

1. Go to the test service commit or branch page where you want to enable GitHub comments.
2. Click on the **Settings** icon and click **View Test Service Settings**.
3. Select **Enable GitHub Comments** so that comments display on new pull requests. This change may take a few minutes.

{{< img src="ci/enable-github-comments.png" alt="Enable GitHub comments dropdown" style="width:100%;">}}

Comments only appear on pull requests that were opened before the test run and that have run at least one test for an enabled test service.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: /integrations/github/
[5]: /continuous_integration/tests/
[6]: https://app.datadoghq.com/integrations/github