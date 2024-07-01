---
title: Testing Local and Staging Environments
description: Learn about using Continuous Testing in local and remote environments.
aliases:
  - /synthetics/testing_tunnel
  - /continuous_testing/testing_tunnel
further_reading:
- link: "https://www.datadoghq.com/blog/shift-left-testing-best-practices/"
  tag: Blog
  text: Best practices for shift-left testing
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: Blog
  text: Incorporate Datadog Synthetic tests into your CI/CD pipeline
- link: "https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline"
  tag: Learning Center
  text: Learn how to run tests in a CI/CD pipeline
- link: /continuous_testing/environments/multiple_env
  tag: Documentation
  text: Learn about testing in multiple environments
- link: /continuous_testing/environments/proxy_firewall_vpn
  tag: Documentation
  text: Learn about testing while using proxies, firewalls, or VPNs
- link: /synthetics/private_locations
  tag: Documentation
  text: Learn about private locations
---

## Overview

In the context of [testing within a CI/CD pipeline, also known as shift-left testing][1], the production environment is typically the last link in the chain. Your application is likely to go through several steps before reaching this stage.

{{< img src="continuous_testing/environments.png" alt="Continuous Testing can be used all along the development cycle, from the local development environment to staging to prod." width="100%" >}}

While [scheduled Synthetic tests focus primarily on publicly available production environments][2], Continuous Testing allows you to test your application in any or all environments it's deployed in throughout the development cycle.

## Testing in multiple environments

Continuous Testing can reuse the same scenario from scheduled tests used against the production environment to test publicly available pre-production environments.

Whether it's for a [blue—green deployment][3], or a dedicated staging environment, Continuous Testing allows you to reroute an existing scenario to a different environment. For more information, see [Testing Multiple Environments][4].

## Testing while using proxies, firewalls, or VPNs

Continuous Testing can test your application in the early steps of the development cycle, including behind a private network protected by a proxy, firewall, or VPN.

It can run the same scenario from scheduled Synthetic tests against changes deployed in a local server running on your development environment (such as a dev laptop), or in a CI/CD pipeline where your application is deployed in an ephemeral environment that lasts the same amount of time as the CI/CD job, or in a private staging environment.

Continuous Testing provides a [testing tunnel][5] which allows the Synthetic managed location to reach private environments. For more information, see [Testing While Using Proxies, Firewalls, or VPNs][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/shift-left-testing-best-practices/
[2]: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
[3]: https://en.wikipedia.org/wiki/Blue%E2%80%93green_deployment
[4]: /continuous_testing/environments/multiple_env
[5]: /continuous_testing/environments/proxy_firewall_vpn/#what-is-the-testing-tunnel
[6]: /continuous_testing/environments/proxy_firewall_vpn
