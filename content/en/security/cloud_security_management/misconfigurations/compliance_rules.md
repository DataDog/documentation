---
title: Manage CSM Misconfigurations Compliance Rules
aliases:
  - /security_platform/cspm/configuration_rules
  - /security/cspm/configuration_rules
  - /security/cspm/detection_rules
  - /security/cspm/compliance_rules
  - /security/misconfigurations/compliance_rules
further_reading:
  - link: "/security/cloud_security_management/misconfigurations"
    tag: "Documentation"
    text: Getting Started with CSM Misconfigurations
  - link: "/security/cloud_security_management/misconfigurations/custom_rules/"
    tag: "Documentation"
    text: Custom Rules
  - link: "/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/"
    tag: "Documentation"
    text: Misconfigurations Reports
---

Cloud Security Management Misconfigurations (CSM Misconfigurations) [out-of-the-box compliance rules][1] evaluate the configuration of your cloud resources and identify potential misconfigurations so you can immediately take steps to remediate.

The compliance rules follow the same [conditional logic][2] as all Datadog Security compliance rules. For CSM Misconfigurations, each rule maps to controls within one or more [compliance frameworks or industry benchmarks][4].

CSM Misconfigurations uses the following rule types to validate the configuration of your cloud infrastructure:

- [**Cloud configuration**][1]: These compliance rules analyze the configuration of resources within your cloud environment. For example, the [Cloudfront distribution is encrypted][3] rule evaluates an Amazon CloudFront distribution's configuration for encrypted status.
- [**Infrastructure configuration**][5]: These compliance rules analyze your containers and Kubernetes clusters to find configuration issues, as defined in the CIS compliance benchmarks for Docker and Kubernetes. For example, the [/etc/default/docker file permissions are set to 644 or more restrictively][6] rule evaluates Docker file permissions running on a host.

## Explore default compliance rules

To filter the default compliance rules by cloud provider:

1. Navigate to the [**Misconfiguration Rules**][13] page.
2. Choose one of the following values from the **Tag** facet.
    - **AWS**: cloud_provider:aws
    - **Azure**: cloud_provider:azure
    - **Google Cloud**: cloud_provider:gcp
    - **Docker**: framework:cis-docker
    - **Kubernetes**: framework:cis-kubernetes

## Customize how your environment is scanned by each rule

Customization of a cloud configuration query directly is not supported at this time, but you can customize how your environment is scanned by each rule.

On the [Rules][13] page, select a rule to open its details page. Under **Exclude benign activity with suppression queries**, set the filtering logic for how the rule scans your environment.

For example, you can exclude resources tagged with `env:staging` using the **This rule will not generate a misconfiguration if there is a match with any of the following suppression queries** function. You can also limit the scope for a certain rule to resources tagged with `compliance:pci` using the **Only generate a misconfiguration if there is a match with any of the following queries** function.

After you customize a rule, click **Update Rule** at the bottom of the page to apply your changes.

{{< img src="security/cspm/frameworks_and_benchmarks/never-trigger-misconfiguration.png" alt="Customize how your environment is scanned by selecting tags to include or exclude from a rule's scope" >}}

## Set notification targets for compliance rules

You can send real-time notifications when a new misconfiguration is detected in your environment by adding notification targets. The available notification options are:

- [Slack][14]
- [Jira][15]
- [PagerDuty][16]
- [ServiceNow][17]
- [Microsoft Teams][18]
- [Webhooks][19]
- Email

On the [Rules][13] page, select a rule to open its details page. In the **Set severity and notifications** section, configure zero or more notification targets for each rule case. You cannot edit the preset severity. See [Notifications][7] for detailed instructions on configuring notifications for compliance rules.

Alternatively, create [notification rules][21] that span across multiple compliance rules based on parameters such as severities, rule types, rule tags, signal attributes, and signal tags. This allows you to avoid having to manually edit notification preferences for individual compliance rules.

**Note**: If a misconfiguration is detected for a rule with notifications enabled, the failed misconfiguration also appears on the [Signals Explorer][22].

{{< img src="security/cspm/frameworks_and_benchmarks/notification-2.png" alt="The Set severity and notifications section of the rule details page" >}}

## Create custom rules

You can create custom rules to extend the rules being applied to your environment to evaluate your security posture. You can also clone the default detection rules and edit the copies (Google Cloud only). See [Custom Rules][20] for more information.

## Rule deprecation

Regular audits of all compliance rules are performed to maintain high fidelity signal quality. Deprecated rules are replaced with an improved rule.

The rule deprecation process is as follows:

1. There is a warning with the deprecation date on the rule. In the UI, the warning is shown in the:
    - Signal side panel's **Rule Details > Playbook** section
    - Misconfigurations side panel
    - [Rule editor][23] for that specific rule
2. Once the rule is deprecated, there is a 15 month period before the rule is deleted. This is due to the signal retention period of 15 months. During this time, you can re-enable the rule by [cloning the rule][23] in the UI.
3. Once the rule is deleted, you can no longer clone and re-enable it.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/#cat-csm-misconfigurations-cloud
[2]: /security/detection_rules/
[3]: https://docs.datadoghq.com/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[5]: /security/default_rules/#cat-posture-management-infra
[6]: https://docs.datadoghq.com/security_monitoring/default_rules/cis-docker-1.2.0-3.22/
[7]: /security/notifications/
[13]: https://app.datadoghq.com/security/configuration/compliance/rules
[14]: /integrations/slack/
[15]: /integrations/jira/
[16]: /integrations/pagerduty
[17]: /integrations/servicenow/
[18]: /integrations/microsoft_teams/
[19]: /integrations/webhooks/
[20]: /security/cloud_security_management/misconfigurations/custom_rules/
[21]: /security/notifications/rules/
[22]: /security/cloud_security_management/misconfigurations/signals_explorer/
[23]: /security/detection_rules/#clone-a-rule
