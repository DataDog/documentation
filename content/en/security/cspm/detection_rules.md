---
title: Managing CSPM Detection Rules
kind: documentation
aliases:
  - /security_platform/cspm/configuration_rules
  - /security/cspm/configuration_rules
further_reading:
  - link: "/security/cspm/getting_started"
    tag: "Documentation"
    text: Getting Started with CSPM
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

Datadog provides [out-of-the-box (OOTB) detection rules][1] to flag potential misconfigurations and help improve your security posture. OOTB detection rules follow the same [conditional logic][2] as all Datadog Security detection rules.

These detection rules work with out-of-the-box integration configurations and map to controls within a [compliance framework or industry benchmark][4]. When new default configuration detection rules are added, they are automatically imported into your account.

Datadog Cloud Security Posture Management (CSPM) uses the following rule types to validate the configuration of your cloud infrastructure:

- [**Cloud configuration**][1]: These detection rules analyze the configuration of resources within your cloud environment. For example, the rule [Cloudfront distribution is encrypted][3] evaluates an AWS Cloudfront distribution's configuration for encrypted status.

- [**Infrastructure configuration**][5]: These detection rules analyze your containers and Kubernetes clusters to find configuration issues, as defined in the popular CIS compliance benchmarks for Docker and Kubernetes. For example, the rule [/etc/default/docker file permissions are set to 644 or more restrictively][6] evaluates Docker file permissions running on a host.

Customization of a cloud configuration query directly is not supported at this time, but you can customize how you environment is [scanned][4] for each rule.

## Customize how your environment is scanned by each rule

On the [Rules][13] page, hover over a rule and click on the pencil icon to edit the rule. Under **Define search queries**, click the **Advanced** drop down menu to set filtering logic for how the rule scans your environment.

For example, you can remove all resources tagged with `env:staging` using the **This rule will not generate a finding if there is a match with any of the following suppression queries** function. Or, limit the scope for a certain rule to resources tagged with `compliance:pci` using the **Only generate a finding if there is a match with any of the following queries** function.

{{< img src="security/cspm/frameworks_and_benchmarks/never-trigger-a-finding.png" alt="In the Datadog app, select Advanced to populate Never trigger a finding when, and add a query." >}}

## Set notification targets for detection rules

From the [Rules][13] page, you can add notification targets. The complete list of notification options are:

- [Slack][14]
- [Jira][15]
- [PagerDuty][16]
- [ServiceNow][17]
- [Microsoft Teams][18]
- [Webhooks][19]
- Email

In the “Notify” section, configure zero or more notification targets for each rule case. You cannot edit the preset severity.

{{< img src="security/cspm/frameworks_and_benchmarks/notification.png" alt="Select a severity and notification target" >}}

[1]: /security/default_rules/#cat-posture-management-cloud
[2]: /security/detection_rules/
[3]: https://docs.datadoghq.com/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /security/cspm/frameworks_and_benchmarks
[5]: /security/default_rules/#cat-posture-management-infra
[6]: https://docs.datadoghq.com/security_monitoring/default_rules/cis-docker-1.2.0-3.22/

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}