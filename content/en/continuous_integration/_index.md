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

<div class="alert alert-info"><p>CI Visibility is in private beta. There are no billing implications for tracing pipelines and tests during this period. If you want to be added to the private beta, <a href="http://dtdg.co/ci-visibility-beta-request">fill out this form</a>.</p><p>CI Visibility is available only on <a href="/getting_started/site/">the US1 Datadog site</a> at this time.</p>
</div>

Datadog Continuous Integration (CI) Visibility brings together information about CI test and pipeline results _plus_ data about CI performance, trends, and reliability, all into one place. Not only does it provide developers with the ability to dig into the reasons for a test or pipeline failure, or to predict the effect a given commit will have on production CI, it also gives build engineers visibility into trends in test executions times and pipeline performance over time. 

CI Visibility brings to bear the power of all your favorite Datadog tools like dashboards, alerts, and Watchdog, to communicate the health of your CI environment and to focus your efforts in improving your team's ability to deliver quality code every time.

CI Visibility helps you troubleshoot test failures and broken builds, connecting the most pressing stoppages to production to the commits that caused them. With the same libraries you use to trace application performance with APM, you can instrument your development workflow code---integration tests and build pipelines---generating traces from the time a commit is pushed to your repository to when the pipeline is ready to be deployed, and use the data aggregated over time to track trends in performance of tests and builds and to identify what's most important to fix.

## Gain insights into your pipelines

The Datadog Pipelines page is useful for developers who keep an eye on the build pipeline for their service. It answers questions such as:
- Is the pipeline for your service succeeding, especially on the production branch? 
- If not, where does the problem originate?

For build engineers, the Pipelines page provides:
- An overview of the health of the whole build system, with aggregated stats for pipeline runs and branches. 
- A window to quickly spotting and fixing immediate, urgent issues like broken pipelines to production. 
- How each pipeline has run, over time, and with what results and trends. 
- The breakdown of where time is spent in each build stage, over time, so you can focus your improvement efforts where it will make the biggest difference.

CI pipeline data is available in [Dashboards][1] and [Notebooks][2], enabling build engineering teams to customize their communication about high-priority work and CI trends over time.

## Gain insights into your tests

If you're a developer, the Tests and Test Runs pages provide you with two kinds of information about your work: 

- Low-level and immediate: 
    - What tests are failing and why, with an emphasis on production test failures. 
    - What your last commit's test results were. 
    - The effect a branch will have on the time it takes to run your test suite, if you merge it to production. 
    - The reliability of the results for a test run, or whether this test has a history of both passing and failing on the same commit.
    - What tests you should update a test because they're flaky.

- High-level accumulation and trends: 
    - The effects that changed code, added tests, and increased complexity have on your test suite performance over time. 
    - Which commits or branches introduced test suite slow-downs. 
    - Whether tests are becoming more or less flaky and unreliable over time.

Test execution data is also available in [Dashboards][1] and [Notebooks][2]. 

## Ready to start?

See [Setup Pipelines][3] and [Setup Tests][4] for instructions on setting up Datadog Agent for your CI provider and its architecture, information about CI product compatibility, and steps for instrumenting and configuring for CI data collection. Then start exploring Datadog CI Visibility views of the data with [Exploring Pipelines][5] and [Exploring Tests][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /continuous_integration/setup_pipelines/
[4]: /continuous_integration/setup_tests/
[5]: /continuous_integration/explore_pipelines/
[6]: /continuous_integration/explore_tests/
