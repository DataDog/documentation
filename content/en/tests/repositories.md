---
title: Repositories
description: Gain insight into test performance in your repositories.
aliases:
- /tests/search/
algolia:
   rank: 70
   tags: ['flaky test', 'flaky tests', 'test regression', 'test regressions', 'test service', 'test services']
further_reading:
- link: "/continuous_integration/explorer"
  tag: "Documentation"
  text: "Search and filter test runs"
- link: "/continuous_integration/guides/flaky_test_management"
  tag: "Documentation"
  text: "Learn how to manage flaky tests"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Test Optimization is not available in ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

[Repositories page][1]

## Repository trends

The [Repositories view][1] displays aggregated health metrics for the default branch of each repository. This view is useful for gaining a high-level overview of test performance across your organization's repositories.

Use the Repositories page to:
- See the total number of flaky tests in each repo.
- Track whether tests are becoming more or less unreliable over time.
- See the test status for the most recent commit in each repository.
- See how many {{< tooltip glossary="test service" >}}s are associated with each repo.

<!-- vale Datadog.pronouns = NO -->

To filter the list down to only repositories that you have committed to, toggle **My Repositories** and enter the email address associated with your GitHub account. You can enter multiple email addresses. Edit your address later by clicking **Edit Authors**.

<!-- vale Datadog.pronouns = YES -->

### Investigate a repository

Select a repository to gain granular insights into its test performance. Use the **Branch**, **Test Service**, and **Env** drop-downs to filter for the desired data. Selecting the **\*** filter gives you an aggregated view across that category.

The page for a specific repository gives you access to:
- **Latest Commit**: Test status and performance for the latest commit.
- **Commits**: A list of recent commits and their test statistics.
- **Test Services**: A summary of any test services you've added to the repo.
- **Flaky Tests**: Insights into [flaky tests][2] in the repo.
- **Test Regressions**: Insights into {{< tooltip glossary="test regression" >}}s.
- **Test Performance**: See which tests have become slower over time.
- **Common Error Types**: See the most common error types in the repo.
- **All Test Runs**: Explore all test runs in the repo.

### Repository settings

The [Test Optimization settings][3] page gives you an overview of the features enabled on each of your repos together with any overrides you've applied. Select a repo to configure the following repository capabilities:
- **[GitHub Comments][4]**: Show summaries of your test results directly in pull requests.
- **[Auto Test Retries][5]**: Retry failing tests to avoid failing your build due to flaky tests.
- **[Early Flake Detection][6]**: Identify flaky tests early in the development cycle.
- **[Test Impact Analysis][7]**: Automatically select and run only the relevant tests for a given commit based on the code being changed.

#### Overrides for test services

If you have test services that require their own configuration, you can override your default repository settings.

To create an override:
1. From the [Test Optimization settings][3] page, select a repo with a test service.
1. Click **Edit Custom Settings**.
1. Select the test service you want to apply an override to and expand it to view the available settings.
1. Toggle the desired settings.

You can view the number of overrides in effect on each repo from the [settings][3] page.

## Debugging commits




## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-repositories
[2]: https://app.datadoghq.com/ci/test-repositories?view=repositories
[3]: /tests/flaky_test_management
[4]: https://app.datadoghq.com/ci/settings/test-optimization
[5]: /tests/developer_workflows/#test-summaries-in-github-pull-requests
[6]: /tests/flaky_test_management/auto_test_retries/
[7]: /tests/flaky_test_management/early_flake_detection/
[8]: /tests/test_impact_analysis/