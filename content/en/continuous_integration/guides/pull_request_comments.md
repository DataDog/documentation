---
title: Test Summary Pull Request Comments
kind: guide
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

CI Visibility allows you to get insights into your test. With the GitHub Pull Request Comment integration
Datadog brings those details to your pull requests. With the comment integration you can get a break down
of your test services results as well as the error messages for failed test, so that you can resolve all
your issues quicker.

{{< img src="ci/pr-comment-preview.png" alt="Datadog GitHub pull request comment preview" style="width:100%;">}}

### Enabling

To enable GitHub comments you first need to install the Datadog GitHub App and give it read and write
permissions for pull requests. To do this go to the GitHub App integration tile.

To enable GitHub comments go to the test service commit or branch page. Click on the settings icon and then on *Enable GitHub Comments*.
After a few minutes comments will show on new pull requests.

{{< img src="ci/enable-github-comments.png" alt="Enable GitHub comments dropdown" style="width:100%;">}}

Comments will only show in pull requests that where opened after the test run and that have run
at least one test for an enabled test service.

### Compatibility

The GitHub Pull Request Comment integration is only available for test services hosted in `github.com`

Due to some limitations the integration won't work for workflows running on `pull_request` triggers as the
PR head commit SHA does not match the one reported in the tests.

