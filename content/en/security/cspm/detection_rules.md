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

Cloud Security Posture Management (CSPM) [out-of-the-box detection rules][1] evaluate the configuration of your cloud resources and identify potential misconfigurations so you can immediately take steps to remediate.

The detection rules follow the same [conditional logic][2] as all Datadog Security detection rules. For CSPM, each rule maps to controls within one or more [compliance frameworks or industry benchmarks][4].

CSPM uses the following rule types to validate the configuration of your cloud infrastructure:

- [**Cloud configuration**][1]: These detection rules analyze the configuration of resources within your cloud environment. For example, the [Cloudfront distribution is encrypted][3] rule evaluates an AWS Cloudfront distribution's configuration for encrypted status.
- [**Infrastructure configuration**][5]: These detection rules analyze your containers and Kubernetes clusters to find configuration issues, as defined in the popular CIS compliance benchmarks for Docker and Kubernetes. For example, the [/etc/default/docker file permissions are set to 644 or more restrictively][6] rule evaluates Docker file permissions running on a host.

Customization of a cloud configuration query directly is not supported at this time, but you can customize how you environment is [scanned][4] for each rule.

Datadog continuously develops new default rules, which are automatically imported into your account.

## Customize how your environment is scanned by each rule

*ex: all resources tagged with env:dev should not be assessed for PCI)*

On the [Rules][13] page, select a rule to open its details page. Under **Exclude benign activity with suppression queries**, set the filtering logic for how the rule scans your environment.

For example, you can remove all resources tagged with `env:staging` using the **This rule will not generate a finding if there is a match with any of the following suppression queries** function. Or, limit the scope for a certain rule to resources tagged with `compliance:pci` using the **Only generate a finding if there is a match with any of the following queries** function.

*Add note about ability to do this via API with link to docs*

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

In the **Set severity and notifications** section, configure zero or more notification targets for each rule case. You cannot edit the preset severity. See [Notifications][7] for more information.

{{< img src="security/cspm/frameworks_and_benchmarks/notification.png" alt="Select a severity and notification target" >}}

## Create custom rules

To extend the rules being applied to your environment to evaluate your security posture, you can clone detection rules and edit the copies, and you can create your own rules from scratch.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/#cat-posture-management-cloud
[2]: /security/detection_rules/
[3]: https://docs.datadoghq.com/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /security/cspm/frameworks_and_benchmarks
[5]: /security/default_rules/#cat-posture-management-infra
[6]: https://docs.datadoghq.com/security_monitoring/default_rules/cis-docker-1.2.0-3.22/
[7]: /security/notifications/
[13]: https://app.datadoghq.com/security/configuration/rules/
[14]: /integrations/slack/
[15]: /integrations/jira/
[16]: /integrations/pagerduty
[17]: /integrations/servicenow/
[18]: /integrations/microsoft_teams/
[19]: /integrations/webhooks/