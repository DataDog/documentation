---
title: Testing Local and Staging Environments
kind: documentation
description: Learn about using Continuous Testing in local and remote environments.
aliases:
  - /continuous_testing/environments
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: "Blog"
  text: "Incorporate Datadog Continuous Testing tests into your CI/CD pipeline"
- link: "https://www.datadoghq.com/blog/internal-application-testing-with-datadog/"
  tag: "Blog"
  text: "Test internal applications with Datadog's testing tunnel and private locations"
- link: "https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline"
  tag: "Learning Center"
  text: "Learn how to run tests in a CI/CD pipeline"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a browser test"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API test"

---

## Testing Local and Staging Environments

In the context of CI/CD, the production environment is only the last link in the chain. Your application is likely to go through a number of steps before reaching this last stage.
Synthetics scheduled tests focus only the publicly available production environment.
On the other hand, Continuous Testing can be used to test your application in all the environments it's deployed along the development cycle.

{{< img src="continuous_testing/continuous_environments.png" alt="Continuous Testing can be used all along the development cycle, from the local development environment to staging to prod." width="100%" >}}

### Multiple env

Continuous Testing can reuse the same scenarii from scheduled tests used against the production environement to test publicly available pre-production environements.
Whether during a blue green deployment, or a dedicated staging environement, Continuous Testing provides ways to reroute an existing scenario to a different environment: `startUrlSubstitutionRegex`<!-- and `resourceUrlSubistitutionRegex`-->.
To learn more about this, head over to the [Testing Multiple Environment](multiple_env) page.

### Testing While Using Proxies, Firewalls, or VPNs

Continuous Testing can test your application in the early steps of the development cycle, even behind a private network protected by a Proxy, a Firewall or a VPN.
It can run the same scenario than scheduled Synthetics tests against changes deployed in a local server running on your development environment (e.g. dev laptop), or in a CI/CD pipeline while they are deployed in an ephemeral environments that lasts only the time the CI/CD job, or in a private staging environement.

For these situation, Continuous Testing provides a testing tunnel which allows the Synthetic managed location to reach private environments.
To learn more about the testing tunnel, head over to the [Testing While Using Proxies, Firewalls, or VPNs](proxy_firewall_vpn) page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
