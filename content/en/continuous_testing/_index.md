---
title: Continuous Testing
kind: documentation
description: Customize the number of Continuous Testing tests running in parallel in your CI/CD pipelines to increase your testing coverage.
disable_sidebar: true
further_reading:
- link: 'https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring'
  tag: 'Release Notes'
  text: 'Check out the latest Datadog Continuous Testing releases! (App login required)'
- link: 'https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline'
  tag: 'Learning Center'
  text: 'Continuous Testing in a CI/CD Pipeline'
- link: '/getting_started/continuous_testing'
  tag: 'Documentation'
  text: 'Learn about Continuous Testing'
- link: '/synthetics/private_locations/#scale-your-private-location'
  tag: 'Documentation'
  text: 'Learn about Private Locations'
- link: '/continuous_testing/environments'
  tag: 'Documentation'
  text: 'Learn about Testing in Local and Staging Environments'
- link: '/continuous_testing/troubleshooting/'
  tag: 'Documentation'
  text: 'Troubleshoot Continuous Testing and CI/CD'
- link: 'https://www.datadoghq.com/blog/release-confidently-with-datadog-continuous-testing/'
  tag: 'Blog'
  text: 'Use Datadog Continuous Testing to release with confidence'
- link: 'https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/'
  tag: 'Blog'
  text: 'Best practices for continuous testing with Datadog'
cascade:
    algolia:
        rank: 70
---

<div class="alert alert-info">This page is about running Continuous Testing tests in your CI/CD pipelines. If you want to view CI/CD metrics and dashboards, see the <a href="/continuous_integration/" target="_blank">CI Visibility documentation.</a></div>

Datadog Continuous Testing offers a set of tools that enable you to automate software testing for a product's entire lifecycle. By offering code-free, reliable end-to-end testing and seamless integrations with [popular CI providers][1] and collaboration tools, Continuous Testing helps you accelerate application development and ship high-quality features faster.

## Test with ease and speed

Use scalable features such as a codeless [web recorder][2], [mobile app recorder][15], [parallel test runs][3], and built-in multi-location testing to save time and effort for your QA team.

{{< img src="continuous_testing/continuous_testing_selection.png" alt="Choose between running your tests sequentially and customizing the number of tests you want to run at the same time in the Continuous Testing Settings page" style="width:100%;">}}

With support for multiple protocols, frameworks, and APIs—including gRPC and WebSockets—you can test across every level of your application stack, and [across any pre-production environment][17].

## Improve test reliability

Instead of having to implement test code, you can build software using [Synthetic Monitoring's resilient, scalable, and codeless tests][4]. Gain confidence in your test results by minimizing false positives through self-healing browser tests, mobile app tests, and automatic test retries. To ensure your users have the best experience, you can automate [cross-browser testing][2] and [mobile application testing][16].

## Increase efficiency through seamless integrations

Fast-track your application development by testing and troubleshooting in one platform. Select from the following types of CI providers and collaboration tools such as Slack or Jira to merge workflows and avoid context switching.

{{< partial name="continuous_testing/ct-getting-started.html" >}}

</br>

You can use the [Datadog Terraform provider][10] to control test creation and state management. Leverage your Synthetic tests as [integration and end-to-end tests][11] for your staging, pre-prod, and canary deployments, or run them directly in your [CI pipelines][11].

## Accelerate troubleshooting

Performing tests in a unified monitoring platform helps you find the root cause of failed test runs and reduce MTTR. You can obtain the full context for troubleshooting—without switching between tools—through correlated metrics, traces, and logs surfaced by the Datadog [APM integration][12] by looking at executed jobs in the [Synthetic Monitoring & Continuous Testing Explorer][11].

{{< img src="continuous_testing/open_sidepanel.png" alt="CI batches in the Continuous Testing Explorer" style="width:100%;">}}

## Use the Synthetic Monitoring & Continuous Testing Explorer

Create [search queries and visualizations][11] for your Synthetic test runs or batches of tests running in CI/CD pipelines.

{{< img src="continuous_testing/explorer_ci_batches.png" alt="Continuous Testing Explorer" style="width:100%;">}}

## Ready to start?

Once you have configured some [Synthetic tests][4], see the documentation for your preferred [CI/CD provider][1] or use the [datadog-ci NPM package][14] in your CI/CD pipelines. See [Testing Local and Staging Environments][17] to use Continuous Testing in environments that are not publicly available or production, for example, running tests against your local development environment or a staging environment within a private network. Then, start exploring details about your batch runs in the [Synthetic Monitoring & Continuous Testing Explorer][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/cicd_integrations/
[2]: /synthetics/browser_tests
[3]: /continuous_testing/settings
[4]: /synthetics/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[11]: /continuous_testing/explorer
[12]: /synthetics/apm/
[13]: https://app.datadoghq.com/synthetics/create#
[14]: /continuous_testing/cicd_integrations/configuration
[15]: /mobile_app_testing/mobile_app_tests
[16]: /mobile_app_testing/
[17]: /continuous_testing/environments
