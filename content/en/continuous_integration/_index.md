---
title: Continuous Integration Visibility
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_pipelines/"
      tag: "Documentation"
      text: "Start exploring pipeline data to resolve build problems"
    - link: "/continuous_integration/explore_tests/"
      tag: "Documentation"
      text: "Start exploring tests data to find and fix problem tests"
---

<div class="alert alert-info"><p>CI Visibility is in beta. There are no billing implications for tracing pipelines and tests during this period.</p>
</div>
{{< site-region region="us3,gov" >}}
<div class="alert alert-info"><p>CI Visibility is available only on the US1 and EU1 Datadog sites at this time.</p></div>
{{< /site-region >}}

Datadog Continuous Integration (CI) Visibility brings together information about CI test and pipeline results _plus_ data about CI performance, trends, and reliability, all into one place. Not only does it provide developers with the ability to dig into the reasons for a test or pipeline failure, to monitor trends in test suite execution times, or to see the effect a given commit has on the pipeline, it also gives build engineers visibility into cross-organization CI health and trends in pipeline performance over time.

CI Visibility brings CI metrics and data into Datadog dashboards so you can communicate the health of your CI environment and focus your efforts in improving your team's ability to deliver quality code every time.

CI Visibility helps you troubleshoot test failures and broken builds, connecting the most pressing development outages to the commits that caused them. With the same libraries you use to trace application performance with APM, you can instrument your tests, generating traces from your testing frameworks as they execute in CI. Similarly, Datadog integrates with CI providers to gather pipeline metrics to track performance and results from the moment a commit enters the pipeline until it is ready to be deployed. Use the data aggregated over time to track trends in performance of tests and builds and to identify what is most important to fix.

## Gain insights into your pipelines

The Datadog Pipelines page is useful for developers who keep an eye on the build pipeline for their service. It answers questions such as:
- Is the pipeline for your service succeeding, especially on the default branch?
- If not, what's the root cause?

For build engineers, the Pipelines page provides:
- An overview of the health of the whole build system, with aggregated stats for pipeline runs and branches.
- A window to quickly spotting and fixing immediate, urgent issues like broken pipelines to production.
- How each pipeline has run, over time, and with what results and trends.
- The breakdown of where time is spent in each build stage, over time, so you can focus your improvement efforts where it will make the biggest difference.

CI pipeline data is available in [Dashboards][1] and [Notebooks][2], enabling build engineering teams to customize their communication about high-priority work and CI trends over time.

## Gain insights into your tests

If you're a developer, the Tests and Test Runs pages provide you with two kinds of information about your work:

- Low-level and immediate:
    - See what tests are failing and why.
    - See your last commit's test results.
    - View the wall time of your tests in your feature branch and compare it to the default branch, to identify if you're about to introduce a performance regression.
    - Find out if your commit introduces a new flaky test that wasn't flaky before, indicating that your code change is what's making it flaky. This gives you the opportunity to fix the problem before proceeding rather than contributing to the number of flaky tests in your CI.

- High-level accumulation and trends:
    - See the effects that changed code, added tests, and increased complexity have on your test suite performance over time.
    - See which tests have become slower over time and identify the commit that introduced the regression.
    - Take advantage of Datadog's automatic test flakiness detection and tracking, which shows you which tests are becoming more or less unreliable over time.

Test execution data is also available in [Dashboards][1] and [Notebooks][2].

## Ready to start?

See [Setup Pipelines][3] and [Setup Tests][4] for instructions on setting up Datadog with your CI providers, information about CI product compatibility, and steps for instrumenting and configuring for CI data collection. Then start exploring Datadog CI Visibility views of the data with [Exploring Pipelines][5] and [Exploring Tests][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /continuous_integration/setup_pipelines/
[4]: /continuous_integration/setup_tests/
[5]: /continuous_integration/explore_pipelines/
[6]: /continuous_integration/explore_tests/
