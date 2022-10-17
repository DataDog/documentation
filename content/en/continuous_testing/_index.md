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
- link: '/synthetics/private_locations/#scale-your-private-location'
  tag: 'Documentation'
  text: 'Learn about Private Locations'
- link: '/continuous_testing/troubleshooting/'
  tag: 'Documentation'
  text: 'Troubleshoot Continuous Testing and CI/CD'
---

<div class="alert alert-info">This page is about running Continuous Testing tests in your CI/CD pipelines. If you want to view CI/CD metrics and dashoards, see the <a href="/continuous_integration/" target="_blank">CI Visibility documentation.</a></div>

Datadog Continuous Testing offers a set of tools that enable you to automate software testing for a product’s entire lifecycle. By offering code-free, reliable end-to-end testing and seamless integrations with [popular CI providers][1] and collaboration tools, Continuous Testing helps you accelerate application development and ship high-quality features faster. 

## Test with ease and speed

With scalable features such as a [codeless web recorder][2], parallel test runs, and built-in multi-location testing, you can save your QA teams time and effort.

With support for multiple protocols, frameworks, and APIs—including gRPC and WebSockets—you can test across every level of your application stack.


## Improve test reliability 

Instead of having to implement test code, you can build software using [Synthetic Monitoring's resilient, scalable, and codeless tests][3]. Gain confidence in your test results by minimizing false positives through self-healing browser tests and automatic test retries. To ensure your users have the best experience, you can automate [cross-browser testing][2].

## Increase efficiency through seamless integrations

Fast-track your application development by testing and troubleshooting in one platform. Use integrations with CI providers such as [GitHub][4], [GitLab][5], [Jenkins][6], [CircleCI][7], and [Azure DevOps][8], and collaboration tools such as Slack or Jira to merge workflows and prevent context switching. 

You can use the [Datadog Terraform provider][9] to control test creation and state management. Leverage your Synthetic tests as [integration and end-to-end tests][10] for your staging, pre-prod, and canary deployments, or run them directly in your [CI pipelines][10].

## Accelerate troubleshooting

Performing tests in a unified monitoring platform helps you to quickly find the root cause of failed test runs and reduce MTTR. You can obtain the full context for troubleshooting—without switching between tools— through correlated metrics, traces, and logs surfaced by the Datadog [APM integration][11]. 

Explore browser tests running in a CI pipeline and troubleshoot failing test results by looking at executed jobs in the [Continuous Testing Explorer][12].

{{< img src="continuous_testing/open_sidepanel.png" alt="CI batches in the Continuous Testing Explorer" style="width:100%;">}}

## Ready to start?

Once you have configured some [Synthetic tests][3], see the documentation for your preferred [CI/CD provider][1] or use the [datadog-ci NPM package][13] in your CI/CD pipelines. Then, start exploring details about your batch runs in the [Continuous Testing Explorer][10].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/cicd_integrations/
[2]: /synthetics/browser_tests
[3]: /synthetics/
[4]: /continuous_testing/cicd_integrations/github_actions
[5]: /continuous_testing/cicd_integrations/gitlab
[6]: /continuous_testing/cicd_integrations/jenkins
[7]: /continuous_testing/cicd_integrations/circleci_orb
[8]: /continuous_testing/cicd_integrations/azure_devops_extension
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: /continuous_testing/explorer
[11]: /synthetics/apm/
[12]: https://app.datadoghq.com/synthetics/create#
[13]: /continuous_testing/cicd_integrations/configuration
