---
title: Enabling Test Summaries in GitHub Pull Request Comments
kind: guide
description: Learn how to use the GitHub integration with CI Visibility.
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

Datadog integrates with GitHub to show test result summaries and error messages for failed tests in pull request comments.

{{< img src="ci/github_comments_light.png" alt="Datadog GitHub pull request comment preview" style="width:100%;">}}

### Compatibility

This integration is only available for test services hosted on `github.com`.

## Install the GitHub integration

<div class="alert alert-info">The integration is not available for GitHub Actions when triggered by the <code>pull_request*</code> event. </div>

To install the [GitHub integration][1]:

1. Navigate to the **Configuration** tab on the [GitHub integration tile][2] and click **+ Create GitHub App**.
2. Give the application read and write permissions for pull requests.

## Enable pull request comments

You can enable GitHub comments from the Test Service Settings page or the commit or branch page.

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
