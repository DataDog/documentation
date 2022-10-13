---
title: Enabling Test Summaries in GitHub Pull Request Comments
kind: guide
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

Datadog integrates with GitHub to show test result summaries and error messages for failed tests in pull request comments.

### Compatibility
This integration is only available for test services hosted on `github.com`. It is also unavailable for workflows running on `pull_request` triggers.

{{< img src="ci/pr-comment-preview.png" alt="Datadog GitHub pull request comment preview" style="width:100%;">}}

### Enabling
To enable the GitHub comments integration:

1. Go to the [GitHub App integration tile][1] and install the [Datadog GitHub App][2].
2. Give the application read and write permissions for pull requests.

In the UI, you can do it in two different ways:

1. Go to [CI Test Service Settings page][3] and search for the repository or test service.
2. Toggle the `GitHub Comments` column for the desired service.

{{< img src="ci/enable-settings-github-comments.png" alt="Enable GitHub comments dropdown" style="width:100%;">}}

Or

1. Go to the test service commit or branch page where you would like to enable GitHub comments.
2. Click on the settings icon at the top right.
3. Select `Enable GitHub Comments` so that comments display on new pull requests. Note this change takes a few minutes.

{{< img src="ci/enable-github-comments.png" alt="Enable GitHub comments dropdown" style="width:100%;">}}

Comments only appear on pull requests that were opened before the test run and that have run at least one test for an enabled test service.

[1]: https://app.datadoghq.com/integrations/github-apps
[2]: /integrations/github_apps/
[3]: https://app.datadoghq.com/ci/settings/test-service
