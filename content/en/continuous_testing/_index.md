---
title: Continuous Testing
kind: documentation
description: With test automation, use fast, codeless, and reliable testing in your CI pipelines to ship features with confidence.
disable_sidebar: true
further_reading:
- link: 'https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline'
  tag: 'Learning Center'
  text: 'Synthetic Tests in a CI/CD Pipeline'
- link: '/continuous_testing/troubleshooting/'
  tag: 'Documentation'
  text: 'Synthetics and CI/CD Troubleshooting'
---

With **end-to-end testing in production and CI environments**, your development teams can proactively ensure that defective code does not impact your users' experience. 

You can run Synthetic tests on a CI pipeline in the [Datadog application][1], with the [API][2], or with [Terraform][2].

## Run tests with your integration and deployment processes

Leverage your Synthetic tests as [canary deployments][3] or run them directly in your [CI pipelines][3].

{{< img src="synthetics/ci.png" alt="CI tests" style="width:100%;">}}

## Examine test results in your CI environment

Explore browser tests running in a CI pipeline and troubleshoot failing test results by looking at executed jobs in the [CI Results Explorer][4].

{{< img src="synthetics/ci_results_explorer/ci_results_explorer_1.png" alt="CI Results Explorer" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/ci
[2]: /api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[3]: /continuous_testing/cicd_integrations
[4]: /continuous_testing/explorer
