---
title: Search and Manage CI Tests and Pipelines 
description: Learn how to search for your CI tests and pipelines.
further_reading:
- link: "/continuous_integration/explorer"
  tag: "Documentation"
  text: "Search and filter test runs or pipeline executions"
---

## Overview

{{< tabs >}}
{{% tab "Tests" %}}

The [Tests page][101] is useful for developers who keep an eye on their test results. 

{{< img src="/continuous_integration/tests.png" text="CI Pipelines page" style="width:100%" >}}

You can access low-level and immediate insights:

- See what tests are failing and why.
- See your last commit's test results.
- View the wall time of your tests in your feature branch and compare it to the default branch, to identify if you're about to introduce a performance regression.
- Find out if your commit introduces a new flaky test that wasn't flaky before, indicating that your code change is what's making it flaky. This gives you the opportunity to fix the problem before proceeding rather than contributing to the number of flaky tests in your CI.

You can also access high-level accumulation and trends:

- See the effects that changed code, added tests, and increased complexity have on your test suite performance over time.
- See which tests have become slower over time and identify the commit that introduced the regression.
- Take advantage of Datadog's automatic test flakiness detection and tracking, which shows you which tests are becoming more or less unreliable over time.

[101]: https://app.datadoghq.com/ci/test-services

{{% /tab %}}
{{% tab "Pipelines" %}}

The [Pipelines page][101] is useful for developers who keep an eye on the build pipeline for their service.

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines page" style="width:100%" >}}

This page answers the following questions:

- Is the pipeline for your service succeeding, especially on the default branch?
- If not, what's the root cause?

You can access high-level accumulation and trends, including:

- An overview of the health of the whole build system, with aggregated stats for pipeline runs and branches.
- A window to quickly spotting and fixing immediate, urgent issues like broken pipelines to production.
- How each pipeline has run, over time, and with what results and trends.
- The breakdown of where time is spent in each build stage, over time, so you can focus your improvement efforts where it makes the biggest difference.

[101]: https://app.datadoghq.com/ci/pipelines

{{% /tab %}}
{{< /tabs >}}

## Search for tests

Enter the name of a branch, test service, repository, or the commit SHA in the search bar to filter your CI tests. You can view all branches for every service in the **Branches** view, or the default branches for each service in the **Default Branches** view. Select the `env:*` dropdown to filter on the environment. 

To see your latest test services and branches, click the **My branches** toggle and add your Git author email address.

For more information about test configuration tags, see [Test Configurations][1].

## Search for pipelines

Enter the name of a repository, branch, default branch, or the build status to filter your CI pipelines. Select the `env:*` dropdown to filter on the environment. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/guides/test_configurations