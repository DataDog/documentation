---
title: Cloud Security Posture Management
kind: documentation
---

{{< site-region region="us" >}}
<div class="alert alert-warning">
Cloud Security Posture Management and Cloud Workload Security are currently in <a href="https://app.datadoghq.com/security/configuration">public beta</a>.
</div>
{{< /site-region >}}

{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in US1-FED, US3, or EU.
</div>
{{< /site-region >}}

## Overview

Datadog Cloud Security Posture Management (CSPM) makes it easier to assess and visualize the current and historic security posture of your cloud environment, automate audit evidence collection, and catch misconfigurations that leave your organization vulnerable to attacks.

Assess the configuration of your cloud resources, such as security groups, storage buckets, load balancers, and databases against CSPM controls. Use the Datadog Agent to review local configuration information from servers, containers, and Kubernetes clusters against security best practices.

View your cloud security posture at a higher level level with the CSPM Home page, and drill into the details of findings and analyze historical configurations with the Findings Explorer.

## Get Started

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cspm/getting_started">}}Configure your cloud environment for CSPM scanning.{{< /nextlink >}}
  {{< nextlink href="/security_platform/cspm/findings">}} Search and explore findings to reveal the details about a misconfigured resource, enabling you to identify the steps needed to fix it.{{< /nextlink >}}
  {{< nextlink href="/security_platform/cspm/frameworks_and_benchmarks">}}Get details about Datadog’s OOTB security posture rules and create your own rules to compare your configuration to applicable regulatory frameworks, controls, and industry benchmarks.{{< /nextlink >}}
{{< /whatsnext >}}
