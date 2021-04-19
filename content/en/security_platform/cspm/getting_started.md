---
title: Getting Started with CSPM
kind: documentation
further_reading:
- link: "security_platform/default_rules"
  tag: "Documentation"
  text: "Explore default detection rules"
---

## Overview

Navigate to the [Getting Started page][1] to configure your environment for scanning.

{{< img src="security_platform/cspm/getting_started/overview.png" alt="CSPM Configuration">}}

## Setup

### Secure your cloud environment

This section guides you through collecting resource configuration data from cloud providers. Resource configuration collection allows Datadog to assess your environments against Cloud Configuration rules [Add link].

{{< img src="security_platform/cspm/getting_started/cloud.png" alt="Secure your cloud environment">}}

### Secure your hosts and containers

This section guides you through configuring the Datadog agent to scan your hosts and containers. Our agent allows Datadog to continuously assess the state of your hosts and containers against Runtime Compliance rules [Add link].

{{< img src="security_platform/cspm/getting_started/host-containers.png" alt="Secure your hosts and containers">}}


[1]: https://app.datadoghq.com/security/configuration?config_k9_configuration=true&detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=compliance_monitoring
