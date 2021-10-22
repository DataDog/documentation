---
title: Default Configuration Rules
kind: documentation
disable_toc: true
---

{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in US1-FED, US3, or EU.
</div>
{{< /site-region >}}

## Overview

Datadog provides default configuration rules to flag potential misconfigurations to help immediately improve your security posture. Configuration rules follow the same [conditional logic][1] as all Datadog Security Platform rules.

{{< img src="security_platform/cspm/configuration_rules/configuration_rule.png" alt="A configuration rule in Datadog" width="65%">}}

Datadog CSPM uses the following rule types to validate the configuration of your cloud infrastructure:

- [Cloud configuration][2]: These rules analyze the configuration of resources within your cloud environment. For example, the rule [Cloudfront distribution is encrypted][3] evaluates an AWS Cloudfront distribution’s configuration for encrypted status. Customization of a cloud configuration query directly is not supported at this time, but you can customize how you environment is [scanned][4] for each rule.

- [Infrastructure configuration][5]: These rules analyze your containers and Kubernetes clusters in order to find configuration issues, as defined in the popular CIS compliance benchmarks for Docker and Kubernetes. For example, the rule [/etc/default/docker file permissions are set to 644 or more restrictively][6] evaluates Docker file permissions running on a host.

These rules work with out-of-the-box integration configurations and map to controls within a [compliance framework or industry benchmark][5]. When new default configuration rules are added, they are automatically imported into your account.

{{< whatsnext desc="To get started, choose a type of rule based on your environment:">}}
  {{< nextlink href="/security_platform/default_rules#cat-cloud-configuration">}}<u>Cloud Configuration</u>: These rules analyze the configuration of resources within your cloud environment.{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules#cat-infrastructure-configuration">}}<u>Infrastructure Configuration</u>: These rules analyze your containers, and Kubernetes clusters in order to find configuration issues, as defined in the popular CIS compliance benchmarks for Docker and Kubernetes.{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /security_platform/detection_rules/
[2]: /security_platform/default_rules#cat-cloud-configuration
[3]: https://docs.datadoghq.com/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /security_platform/cspm/frameworks_and_benchmarks
[5]: /security_platform/default_rules#cat-infrastructure-configuration
[6]: https://docs.datadoghq.com/security_monitoring/default_rules/cis-docker-1.2.0-3.22/
