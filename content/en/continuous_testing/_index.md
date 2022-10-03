---
title: Continuous Testing
kind: documentation
description: With test automation, use fast, codeless, and reliable testing in your CI/CD pipelines to ship features with confidence.
disable_sidebar: true
further_reading:
- link: 'https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring'
  tag: 'Release Notes'
  text: 'Check out the latest Datadog Continuous Testing releases! (App login required)'
- link: 'https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline'
  tag: 'Learning Center'
  text: 'Continuous Testing in a CI/CD Pipeline'
- link: '/synthetics/private_locations/#scale-your-private-location'
  tag: 'Documentation'
  text: 'Learn about Private Locations'
- link: '/continuous_testing/troubleshooting/'
  tag: 'Documentation'
  text: 'Troubleshoot Continuous Testing and CI/CD'
---

With **integration and end-to-end testing in production and CI environments**, your development teams can proactively ensure that defective code does not impact your users' experience. 

You can run Synthetic tests on a CI pipeline in the [Datadog application][1], with the [API][2], or with [Terraform][2].

## Set up private locations

Set the [concurrency value][3] for your private location to customize your continuous testing settings.

## Run tests with your integration and deployment processes

Leverage your Synthetic tests as [integration and end-to-end tests][4] for your staging, pre-prod, and canary deployments, or run them directly in your [CI pipelines][4].

{{< img src="synthetics/ci.png" alt="CI tests" style="width:100%;">}}

## Examine test results in your CI environment

Explore browser tests running in a CI pipeline and troubleshoot failing test results by looking at executed jobs in the [CI Results Explorer][5].

{{< img src="continuous_testing/explorer/explorer_ci_batches.png" alt="CI batches in the Continuous Testing Explorer" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/ci
[2]: /api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[3]: /synthetics/private_locations/configuration/#advanced-configuration
[4]: /continuous_testing/cicd_integrations
[5]: /continuous_testing/explorer
