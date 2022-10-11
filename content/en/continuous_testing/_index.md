---
title: Continuous Testing
kind: documentation
description: With Continuous Testing, use fast, codeless, and reliable testing in your CI/CD pipelines to ship features with confidence.
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

<div class="alert alert-info">This page is about running Continuous Testing tests in your CI/CD pipelines. If you want to view CI/CD metrics and dashoards, see the <a href="/continuous_integration/" target="_blank">CI Visibility documentation.</a></div>

Datadog Continuous Testing offers a set of tools that enable you to automate software testing for a product’s **entire lifecycle**. By offering **code-free**, **reliable end-to-end testing** and seamless integrations with [popular CI providers][1] and collaboration tools, Continuous Testing helps you accelerate application development and ship high-quality features faster. 

## Test with ease and speed

With automation, you can accelerate application testing and save engineering resources by eliminating the need to build, run, and maintain hand-coded tests. With highly scalable features such as a [codeless web recorder][2], parallel test runs, and built-in multi-location testing, you can save a lot of your QA team's time and effort.

Thanks to a broad support of diverse protocols, frameworks, and APIs—including gRPC and WebSockets—you can test across every level of your application stack and earlier.


## Improve test reliability 

Instead of having to implement test code, you can build software using [Synthetic Monitoring's resilient, scalable, and codeless tests][3]. Gain confidence in your test results by minimizing false positives through self-healing browser tests and automatic test retries. 

To ensure your users have the best experience, automate cross-browser testing.

## Increase efficiency through seamless integrations

Fast-track your application development by testing and troubleshooting in one platform. Use integrations with CI providers such as GitHub, GitLab, Jenkins, CircleCI, and Azure DevOps, and collaboration tools such as Slack and Jira to merge workflows and prevent context-switching. 

You can use the [Datadog Terraform provider][4] to control test creation and state management. Leverage your Synthetic tests as [integration and end-to-end tests][5] for your staging, pre-prod, and canary deployments, or run them directly in your [CI pipelines][5].

## Accelerate troubleshooting

Performing tests in a unified monitoring platform allows you to quickly find the root cause of failed test runs and reduce MTTR. You can obtain the full context for troubleshooting—without switching between tools— through correlated metrics, traces, and logs surfaced by the Datadog [APM integration][8]. 

Enable developers to "shift left" and implement testing as part of the CI/CD process, which improves efficiency, release velocity, and business agility. Explore browser tests running in a CI pipeline and troubleshoot failing test results by looking at executed jobs in the [Explorer][6].

{{< img src="continuous_testing/explorer_ci_batches.jpg" alt="CI batches in the Continuous Testing Explorer" style="width:100%;">}}

## Ready to start?

Once you have configured some [Synthetic tests][3], see the documentation for your preferred [CI/CD provider][1] or use the [datadog-ci NPM package][7] in your CI/CD pipelines. Then, start exploring details about your batch runs in the [Explorer][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/cicd_integrations/
[2]: /synthetics/browser_tests
[3]: /synthetics/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[5]: /continuous_testing/explorer
[6]: https://app.datadoghq.com/synthetics/create#
[7]: /continuous_testing/cicd_integrations/configuration
[8]: /synthetics/apm/
