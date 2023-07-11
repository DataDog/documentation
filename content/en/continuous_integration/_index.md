---
title: Continuous Integration Visibility
kind: documentation
aliases:
  - /ci
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=CI%20Visibility"
    tag: "Release Notes"
    text: "Check out the latest CI Visibility releases! (App login required)"
  - link: "/continuous_integration/pipelines/"
    tag: "Documentation"
    text: "Explore pipeline data to resolve build problems"
  - link: "/continuous_integration/tests/"
    tag: "Documentation"
    text: "Explore test data to find and fix problem tests"
  - link: "https://www.datadoghq.com/blog/circleci-monitoring-datadog/"
    tag: "Blog"
    text: "Monitor your CircleCI environment with Datadog"
  - link: "https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/"
    tag: "Blog"
    text: "Configure pipeline alerts with Datadog CI monitors"
cascade:
    algolia:
        rank: 70
        tags: ['ci/cd', 'continuous integration']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-info">This page is about bringing your continuous integration (CI) metrics and data into Datadog dashboards. If you want to run Continuous Testing tests in your CI pipelines, see the <a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing and CI/CD</a> section.</div>

## Overview

Datadog Continuous Integration (CI) Visibility unifies information about CI test and pipeline results in addition to data about CI performance, trends, and reliability. CI Visibility can not only enable developers to identify the reasons behind a test or pipeline failure, monitor trends in test suite execution times, and see the effect that a given commit has on the pipeline, but also it can provide build engineers with visibility into cross-organization CI health and trends in pipeline performance over time.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

CI Visibility brings CI metrics and data into Datadog dashboards so you can communicate the health of your CI environment and focus your efforts in improving your team's ability to deliver quality code every time.

CI Visibility helps you troubleshoot test failures and broken builds by connecting the most important development outages to the commits that caused them. Using the same libraries you are using to trace application performance with [APM][5], you can instrument your tests and generate traces from your testing frameworks as they execute in CI. 

Similarly, Datadog integrates with CI providers to gather pipeline metrics which track the performance and results from the moment a commit enters the pipeline until it is ready to be deployed. Use the data aggregated over time to track trends in the performance of tests and builds and identify what is most important to fix.

## Gain insights into your pipelines

The [Pipelines page][3] is useful for developers who keep an eye on the build pipeline for their service. It answers questions such as:
- Is the pipeline for your service succeeding, especially on the default branch?
- If not, what's the root cause?

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines page" style="width:100%" >}}

For build engineers, the [Pipeline Executions page][3] provides:

- An overview of the health of the whole build system, with aggregated stats for pipeline runs and branches.
- A window to quickly spotting and fixing immediate, urgent issues like broken pipelines to production.
- How each pipeline has run, over time, and with what results and trends.
- The breakdown of where time is spent in each build stage, over time, so you can focus your improvement efforts where it makes the biggest difference.

{{< img src="/continuous_integration/pipeline_executions.png" text="CI Pipeline Executions page" style="width:100%" >}}

CI pipeline data is available in [Dashboards][1] and [Notebooks][2], enabling build engineering teams to customize their communication about high-priority work and CI trends over time.

## Gain insights into your tests

The [Tests and Test Runs pages][4] are useful for developers who keep an eye on their test results. It provides insight on two levels:

- Low-level and immediate insights:
    - See what tests are failing and why.
    - See your last commit's test results.
    - View the wall time of your tests in your feature branch and compare it to the default branch, to identify if you're about to introduce a performance regression.
    - Find out if your commit introduces a new flaky test that wasn't flaky before, indicating that your code change is what's making it flaky. This gives you the opportunity to fix the problem before proceeding rather than contributing to the number of flaky tests in your CI.

  {{< img src="/continuous_integration/tests.png" text="CI Tests page" style="width:100%" >}}

- High-level accumulation and trends:
    - See the effects that changed code, added tests, and increased complexity have on your test suite performance over time.
    - See which tests have become slower over time and identify the commit that introduced the regression.
    - Take advantage of Datadog's automatic test flakiness detection and tracking, which shows you which tests are becoming more or less unreliable over time.
  
  {{< img src="/continuous_integration/test_runs.png" text="Test Runs page" style="width:100%" >}}

Test execution data is also available in [Dashboards][1] and [Notebooks][2].

## Ready to start?

See [Pipeline Visibility][3] and [Test Visibility][4] for instructions on setting up CI Visibility with your CI providers, information about compatibility requirements, and steps for instrumenting and configuring data collection. Then, see [CI Pipeline or Test Monitor][6] to create a monitor.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /continuous_integration/pipelines/
[4]: /continuous_integration/tests/
[5]: /tracing/
[6]: /monitors/types/ci/
