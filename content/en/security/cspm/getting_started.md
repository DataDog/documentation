---
title: Getting Started with CSPM
kind: documentation
aliases:
  - /security_platform/cspm/getting_started
further_reading:
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default cloud configuration detection rules"
- link: "security/cspm/findings"
  tag: "Documentation"
  text: "Search and explore CSPM findings"
- link: "security/cspm/frameworks_and_benchmarks"
  tag: "Documentation"
  text: "Learn about frameworks and industry benchmarks"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

## Overview

Navigate to the [Getting Started page][1] to configure your environment for scanning.

{{< img src="security/cspm/getting_started/posture-management-setup.png" alt="Setup page for CSPM" style="width:100%;">}}

## Setup

### Product configuration

Select `Posture Management`. You can also configure multiple products at once by selecting their checkbox.

### Assess your cloud environment

Detect misconfigurations in your cloud environment. This section guides you through collecting resource configuration data from cloud providers. Resource configuration collection allows Datadog to assess your environments against Datadog’s out-of-the-box [Posture Management cloud configuration detection rules][2].

### Assess your host and containers

Evaluate the security posture of your hosts and containers. This section guides you through configuring the Datadog Agent to scan your hosts and containers. Our agent allows Datadog to continuously assess the state of your hosts and containers against Datadog’s out-of-the-box [Posture Management Infrastructure Configuration detection rules][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration?config_k9_configuration=true&detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=compliance_monitoring
[2]: /security/default_rules#cat-posture-management-cloud
[3]: /security/default_rules/#cat-posture-management-infra