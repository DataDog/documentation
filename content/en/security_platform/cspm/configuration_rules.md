---
title: OOTB Rules
kind: documentation
---

{{< site-region region="us3,us5,gov,eu" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

## Overview

Datadog provides [out-of-the-box (OOTB) detection rules][1] to flag potential misconfigurations and help improve your security posture. OOTB detection rules follow the same [conditional logic][2] as all Datadog Security Platform detection rules.

{{< img src="security_platform/cspm/configuration_rules/configuration_rule.png" alt="A configuration rule in Datadog" width="65%">}}

Datadog Cloud Security Posture Management (CSPM) uses the following rule types to validate the configuration of your cloud infrastructure:

- [Cloud configuration][1]: These detection rules analyze the configuration of resources within your cloud environment. For example, the rule [Cloudfront distribution is encrypted][3] evaluates an AWS Cloudfront distribution’s configuration for encrypted status. Customization of a cloud configuration query directly is not supported at this time, but you can customize how you environment is [scanned][4] for each rule.

- [Infrastructure configuration][5]: These detection rules analyze your containers and Kubernetes clusters to find configuration issues, as defined in the popular CIS compliance benchmarks for Docker and Kubernetes. For example, the rule [/etc/default/docker file permissions are set to 644 or more restrictively][6] evaluates Docker file permissions running on a host.

These detection rules work with out-of-the-box integration configurations and map to controls within a [compliance framework or industry benchmark][4]. When new default configuration detection rules are added, they are automatically imported into your account.

{{< whatsnext desc="To get started, choose a type of rule based on your environment:">}}
  {{< nextlink href="/security_platform/default_rules/#cat-posture-management-cloud">}}<u>Cloud Configuration</u>{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules/#cat-posture-management-infra">}}<u>Infrastructure Configuration</u>{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /security_platform/default_rules/#cat-posture-management-cloud
[2]: /security_platform/detection_rules/
[3]: https://docs.datadoghq.com/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /security_platform/cspm/frameworks_and_benchmarks
[5]: /security_platform/default_rules/#cat-posture-management-infra
[6]: https://docs.datadoghq.com/security_monitoring/default_rules/cis-docker-1.2.0-3.22/
