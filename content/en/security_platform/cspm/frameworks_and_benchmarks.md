---
title: Frameworks and Industry Benchmarks
kind: documentation
further_reading:
- link: "security_platform/default_rules"
  tag: "Documentation"
  text: "Explore default cloud configuration rules"
- link: "security_platform/cspm/findings"
  tag: "Documentation"
  text: "Search and explore CSPM findings"
---

{{< site-region region="us" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is currently in <a href="https://app.datadoghq.com/security/configuration">public beta</a>.
</div>
{{< /site-region >}}

{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in US1-FED, US3, or EU.
</div>
{{< /site-region >}}

## Overview

Each [OOTB rule][1] maps to one or more controls within a compliance standard or industry benchmark. Datadog OOTB rules currently map to controls and requirements for the following frameworks and benchmarks:

- [CIS AWS Foundations Benchmark v1.3.0*][2]
- [CIS Docker Benchmark v1.2.0][2]
- [CIS Kubernetes Benchmark v1.5.1][3]
- [PCI DSS v3.2.1][4]

**Notes**:

- To pass the Monitoring Section of the [CIS AWS Foundations benchmark][2], you **must** enable [Security Monitoring][5] and forward [Cloudtrail logs to Datadog][6].

- Datadog CSPM is designed to provide you with visibility into whether your Resources are configured in accordance with certain Rules. You can create your own Rules and/or utilize Datadog’s OOTB Rules that address various regulatory frameworks, benchmarks, and standards (“Security Posture Frameworks”). Please note that Datadog CSPM does not provide an assessment of your actual compliance with any Security Posture Framework, and the OOTB Rules may not address all configuration settings that are relevant to the Security Posture Frameworks. To be clear: just because your Resources pass the OOTB Rules does not mean that you are meeting all the requirements under any particular Security Posture Framework. Datadog is not providing legal or compliance advice or guidance, and we recommend that you implement Datadog CSPM in consultation with your legal counsel or compliance experts.

## Customize how your environment is scanned by each rule

On the [Rules][7] page, hover over a rule and click on the pencil icon to edit the rule. Under **Define search queries**, click the **Advanced** drop down menu to set filtering logic for how the rule scans your environment.

For example, you can remove all resources tagged with `env:staging` using the **Never trigger a signal when** function. Or, limit the scope for a certain rule to resources tagged with `compliance:pci` using the **Only trigger a signal when** function.

{{< img src="security_platform/cspm/frameworks_and_benchmarks/never-trigger-a-signal.png" alt="In the Datadog app, select Advanced to populate Never trigger a signal when, and add a query." >}}

## Set notification targets for rules

From the [Rules][7] page, you can add notification targets. The complete list of notification options are:

- [Slack][8]
- [Jira][9]
- [PagerDuty][10]
- [ServiceNow][11]
- [Microsoft Teams][12]
- [Webhooks][13]
- Email

{{< img src="security_platform/cspm/frameworks_and_benchmarks/notification.png" alt="Select a severity and notification target" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/kubernetes/
[4]: https://www.pcisecuritystandards.org/document_library
[5]: /security_platform/security_monitoring/
[6]: /integrations/amazon_cloudtrail/
[7]: https://app.datadoghq.com/security/configuration/rules/
[8]: /integrations/slack/
[9]: /integrations/jira/
[10]: /integrations/pagerduty
[11]: /integrations/servicenow/
[12]: /integrations/microsoft_teams/
[13]: /integrations/webhooks/
