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

Datadog Continuous Testing offers a set of tools that enable you to automate software testing for a product’s **entire lifecycle**. By offering **code-free** and **reliable** end-to-end testing, and integrating seamlessly with [popular CI providers][1] and collaboration tools, Continuous Testing helps you accelerate application development and ship high-quality features faster. 

## Test with ease and speed

Use automation to accelerate application testing and stop wasting engineering resources with the need to build, run, and maintain hand-coded tests. Save QA effort through time-saving and highly scalable features such as a [codeless web recorder][2], parallel test runs, and built-in multi-location testing. Test even earlier and across every level of your application stack, thanks to broad support for diverse protocols, frameworks, and APIs—including gRPC and WebSockets

## Improve test reliability 

Stay focused on building software through our resilient, scalable, and codeless tests that eliminate the burden of implementing test code. Gain confidence in your test results by minimizing false positives through self-healing browser tests and automatic test retries. Automate cross-browser testing to easily ensure the best end-user experience  

## Increase efficiency through seamless integrations

Fast-track your application development by testing and troubleshooting on the same unified platform. Use integrations with popular CI providers (GitHub, GitLab, Jenkins, CircleCI, Azure DevOps) and collaboration tools (Slack, Jira) to merge workflows and avoid context-switching. Gain unified control over test creation and state management with the Datadog Terraform provider. Leverage your Synthetic tests as [integration and end-to-end tests][3] for your staging, pre-prod, and canary deployments, or run them directly in your [CI pipelines][3].

## Accelerate troubleshooting

Quickly find the root cause of failed test runs and reduce MTTR by performing tests within a unified monitoring platform. Gain the full context for troubleshooting—without switching between tools— through correlated metrics, traces, and logs surfaced by Datadog APM integration. Enable developers to 'shift left' and implement testing as part of the CI/CD process, helping improve efficiency, release velocity, and business agility. Explore browser tests running in a CI pipeline and troubleshoot failing test results by looking at executed jobs in the [CI Results Explorer][4].


{{< img src="continuous_testing/explorer_ci_batches.jpg" alt="CI batches in the Continuous Testing Explorer" style="width:100%;">}}

## Ready to start?

Ensure you have [Synthetic tests][5] configured, then find the documentation for your [CI/CD provider][1], or use the [datadog-ci NPM package][6] in your CI or CD pipelines. Then start exploring Datadog Continuous Testing runs in the [Explorer][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}




## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_testing/cicd_integrations/
[2]: /synthetics/browser_tests
[3]: /continuous_testing/explorer
[4]: https://app.datadoghq.com/synthetics/create#
[5]: /synthetics/
[6]: /continuous_testing/cicd_integrations/configuration
