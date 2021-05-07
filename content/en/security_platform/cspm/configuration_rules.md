---
title: Default Configuration Rules
kind: documentation
disable_toc: true
---

{{< site-region region="us" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is currently in public beta.
</div>
{{< /site-region >}}

{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in US1-FED or US3.
</div>
{{< /site-region >}}

## Overview

Datadog provides default configuration rules to flag potential misconfigurations to help immediately improve your security posture. Configuration rules follow the same [conditional logic][1] as all Datadog Security Platform rules.

{{< img src="security_platform/cspm/configuration_rules/configuration_rule.png" alt="A configuration rule in Datadog" width="50%">}}

Datadog CSPM uses default [cloud configuration][2] and [infrastructure configuration][3] rules to scan the state of your environment. These rules work with out-of-the-box integration configurations and map to controls within a [compliance framework or industry benchmark][4]. When new default configuration rules are added, they are automatically imported into your account.

{{< whatsnext desc="To get started, choose a type of rule based on your environment:">}}
  {{< nextlink href="/security_platform/default_rules#cat-cloud-configuration">}}<u>Cloud Configuration</u>: These rules analyze the configuration of resources within your cloud environment.{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules#cat-infrastructure-configuration">}}<u>Infrastructure Configuration</u>: These rules analyze your containers, and Kubernetes clusters in order to find configuration issues, as defined in the popular CIS compliance benchmarks for Docker and Kubernetes.{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /security_platform/detection_rules/
[2]: /security_platform/default_rules#cat-cloud-configuration
[3]: /security_platform/default_rules#cat-infrastructure-configuration
[4]: /security_platform/cspm/frameworks_and_benchmarks
