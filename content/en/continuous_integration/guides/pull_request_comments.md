---
title: Enabling Test Summaries in GitHub Pull Requests
kind: guide
description: Learn how to automatically generate test results summaries in GitHub Pull Requests.
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

If you're using the Test Visibility product, Datadog can integrate with GitHub to show test results summaries directly
in your pull requests. The summaries contain an overview of the tests executions, flakiness information and
error messages for failed tests.
With this report, the developers get instant feedback about the results of their tests and are able to
debug any failed/flaky tests without leaving the pull requests view.

{{< img src="ci/github_comments_light.png" alt="Datadog GitHub pull request comment preview" style="width:100%;">}}

### Compatibility

This integration works with any CI provider but requires the source code to be hosted on `github.com`.

## Enable test summaries

Enabling test summaries is very quick and can be done in two simple steps.

The first step is to install the [GitHub integration][1]:

1. Navigate to the **Configuration** tab on the [GitHub integration tile][2] and click **+ Create GitHub App**.
2. Give the application read and write permissions for pull requests.

The second step is to enable test summaries for a test service from the Test Service Settings page or from the commit/branch page.

### Test Service Settings page

1. Navigate to the [Test Service Settings page][3] and search for the repository or test service.
2. Click on the toggle under the **GitHub Comments** column for the desired service.

{{< img src="ci/enable-settings-github-comments.png" alt="The Test Service Settings tab in Datadog with GitHub comments enabled for one test service" style="width:100%;">}}

### Commit or branch page

1. Go to the test service commit or branch page where you want to enable GitHub comments.
2. Click on the Settings icon and click **View Test Service Settings**.
3. Select **Enable GitHub Comments** so that comments display on new pull requests. This change may take a few minutes.

{{< img src="ci/enable-github-comments.png" alt="Enable GitHub comments dropdown" style="width:100%;">}}

Comments only appear on pull requests that were opened before the test run and that have run at least one test for an enabled test service.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/github/
[2]: https://app.datadoghq.com/integrations/github
[3]: https://app.datadoghq.com/ci/settings/test-service
