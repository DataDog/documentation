---
title: Continuous Integration Visibility
kind: documentation
aliases:
  - /ci
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=CI%20Visibility"
    tag: "Release Notes"
    text: "Check out the latest CI Visibility releases! (App login required)"
  - link: "https://www.datadoghq.com/blog/circleci-monitoring-datadog/"
    tag: "Blog"
    text: "Monitor your CircleCI environment with Datadog"
  - link: "https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/"
    tag: "Blog"
    text: "Configure pipeline alerts with Datadog CI monitors"
  - link: "/continuous_integration/pipelines/"
    tag: "Documentation"
    text: "Explore pipeline data to resolve build problems"
  - link: "/continuous_integration/tests/"
    tag: "Documentation"
    text: "Explore test data to find and fix problem tests"
  - link: "https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/"
    tag: "Blog"
    text: "Best practices for monitoring static web applications"
  - link: "https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/"
    tag: "Blog"
    text: "Best practices for CI/CD monitoring"
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

Datadog Continuous Integration (CI) Visibility unifies information about CI test and pipeline results in addition to data about CI performance, trends, and reliability. CI Visibility brings CI metrics and data into Datadog dashboards and notebooks so you can communicate the health of your CI environment and focus your efforts in improving your team's ability to deliver quality code every time.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

CI Visibility enables developers to identify the reasons behind a test or pipeline failure, monitor trends in test suite execution times, and see the effect that a given commit has on the pipeline. Further, it also provides build engineers with visibility into cross-organization CI health and trends in pipeline performance over time. 

## Improve test reliability and create traces

CI Visibility helps you troubleshoot test failures and broken builds by connecting the most important development outages to the commits that caused them. You can instrument your tests and generate traces from your testing frameworks as they execute in CI. 

## Increase efficiency through seamless integrations

Datadog integrates with the following CI providers to gather pipeline metrics which track the performance and results from the moment a commit enters the pipeline until it is ready to be deployed. Use the data aggregated over time to track trends in the performance of tests and builds, and identify what is most important to fix.

{{< partial name="continuous_integration/ci-pipelines-getting-started.html" >}}

</br>

You can use the `datadog-ci` CLI to [trace commands][8] in your pipelines, as well as the [custom tags and metrics commands][9] to add user-defined text and numerical tags in your pipeline traces.

## Ready to start?

See [Pipeline Visibility][3] and [Test Visibility][4] for instructions on setting up CI Visibility with your CI providers, information about compatibility requirements, and steps for instrumenting and configuring data collection. Then, start exploring details about your test runs and pipeline executions in the [CI Visibility Explorer][7] and export your search query into a [CI Pipeline or Test Monitor][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /continuous_integration/pipelines/
[4]: /continuous_integration/tests/
[6]: /monitors/types/ci/
[7]: /continuous_integration/explorer/
[8]: /continuous_integration/pipelines/custom_commands/
[9]: /continuous_integration/pipelines/custom_tags_and_metrics/
