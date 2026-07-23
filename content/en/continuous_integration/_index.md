---
title: Continuous Integration Visibility
aliases:
  - /ci
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
    tag: "Release Notes"
    text: "Check out the latest Software Delivery releases! (App login required)"
  - link: "https://www.datadoghq.com/blog/circleci-monitoring-datadog/"
    tag: "Blog"
    text: "Monitor your CircleCI environment with Datadog"
  - link: "https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/"
    tag: "Blog"
    text: "Configure pipeline alerts with Datadog CI monitors"
  - link: "/continuous_integration/pipelines/"
    tag: "Documentation"
    text: "Explore pipeline data to resolve build problems"
  - link: "/account_management/billing/ci_visibility"
    tag: "Documentation"
    text: "Learn about billing considerations for CI Visibility"
  - link: "/continuous_integration/tests/"
    tag: "Documentation"
    text: "Explore test data to find and fix problem tests"
  - link: "https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/"
    tag: "Blog"
    text: "Best practices for monitoring static web applications"
  - link: "https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/"
    tag: "Blog"
    text: "Best practices for CI/CD monitoring"
  - link: "https://www.datadoghq.com/blog/best-practices-for-monitoring-software-testing/"
    tag: "Blog"
    text: "Best practices for monitoring software testing in CI/CD"
  - link: "https://www.datadoghq.com/blog/modernize-your-ci-cd-environment/"
    tag: "Blog"
    text: "Monitor your CI/CD modernizations with Datadog CI Pipeline Visibility"
  - link: "https://www.datadoghq.com/blog/datadog-detection-as-code/"
    tag: "Blog"
    text: "How we use Datadog for detection as code"
  - link: "https://www.datadoghq.com/blog/cache-purge-ci-cd/"
    tag: "Blog"
    text: "Patterns for safe and efficient cache purging in CI/CD pipelines"
  - link: "https://www.datadoghq.com/blog/gitlab-source-code-integration"
    tag: "Blog"
    text: "Troubleshoot faster with the GitLab Source Code integration in Datadog"
cascade:
    algolia:
        rank: 70
        tags: ['ci/cd', 'continuous integration']
---

{{< callout url=# btn_hidden="true" header="Try the new CI/CD Optimization experience!">}}[CI/CD Optimization][1] combines Datadog's CI Visibility and Test Optimization experiences into one unified interface. Click {{< ui >}}Try It Now{{< /ui >}} at the top of any page in CI Visibility or Test Optimization, and switch back to the original UI at any time.

[1]: /continuous_integration/cicd_optimization/
{{< /callout >}}

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=CI">}}
  Join the Introduction to CI Visibility session to understand how Datadog CI Visibility enhances the efficiency of CI pipelines and how to configure the Testing Visibility and Pipeline Visibility products. 
{{< /learning-center-callout >}}

## Overview

<div class="alert alert-info">This page is about bringing your continuous integration (CI) metrics and data into Datadog dashboards. If you want to run Continuous Testing tests in your CI pipelines, see the <a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing and CI/CD</a> section.</div>

Datadog Continuous Integration (CI) Visibility provides a unified view of pipeline results, performance, trends, and reliability across your CI environments. By integrating Datadog with your CI pipelines, you can create monitors, display data within [Datadog dashboards][1] and [notebooks][2], and create visualizations for your organization's CI health.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

</br>

CI Visibility helps developers understand the causes of pipeline disruptions and monitor trends in pipeline execution times. It also offers build engineers insights into cross-organization CI health and pipeline performance over time.

## Improve pipeline reliability and create traces

CI Visibility helps you troubleshoot pipeline failures and broken builds by connecting the most significant development outages to the commits that caused them. You can instrument your pipelines and trace them as they execute, enabling deeper insights into pipeline performance.

## Increase efficiency through seamless integrations

Datadog integrates with a variety of CI providers to collect metrics that track the performance of your CI pipelines from commit to deployment. These metrics are used to identify performance trends and improvement opportunities.

{{< card-grid >}}
  {{< image-card href="/continuous_integration/pipelines/awscodepipeline/" src="integrations_logos/aws-codepipeline_small.svg" alt="aws codepipeline" >}}
  {{< image-card href="/continuous_integration/pipelines/azure/" src="integrations_logos/azure-pipelines_small.svg" alt="azure devops extension" >}}
  {{< image-card href="/continuous_integration/pipelines/buildkite/" src="integrations_logos/buildkite_small.svg" alt="buildkite" >}}
  {{< image-card href="/continuous_integration/pipelines/circleci/" src="integrations_logos/circleci.png" alt="circleci orb" >}}
  {{< image-card href="/continuous_integration/pipelines/codefresh/" src="integrations_logos/codefresh_small.svg" alt="codefresh" >}}
  {{< image-card href="/continuous_integration/pipelines/github/" src="integrations_logos/github_small.svg" alt="github actions" >}}
  {{< image-card href="/continuous_integration/pipelines/gitlab/" src="integrations_logos/gitlab-logo-100.svg" alt="gitlab" >}}
  {{< image-card href="/continuous_integration/pipelines/jenkins/" src="integrations_logos/jenkins.png" alt="jenkins" >}}
  {{< image-card href="/continuous_integration/pipelines/teamcity/" src="integrations_logos/teamcity_small.svg" alt="teamcity" >}}
  {{< image-card href="/continuous_integration/pipelines/custom/" src="integrations_logos/docs_other_ci_providers.png" alt="other ci providers" >}}
{{< /card-grid >}}

</br>

You can use the `datadog-ci` CLI to [trace commands][8] and add [custom tags and measures][9], which allows you to add user-defined text and numerical tags in your pipeline traces.

## Ready to start?

Visit [Pipeline Visibility][3] for instructions on setting up CI Visibility with your CI providers, including details on compatibility requirements and steps for configuring data collection. Then, start exploring details about your pipeline executions in the [CI Visibility Explorer][7] and export your search query into a [CI Pipeline Monitor][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /continuous_integration/pipelines/
[4]: /continuous_integration/tests/
[6]: /monitors/types/ci/
[7]: /continuous_integration/explorer/
[8]: /continuous_integration/pipelines/custom_commands/
[9]: /continuous_integration/pipelines/custom_tags_and_measures/
