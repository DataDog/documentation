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
Cloud Security Posture Management is not currently available in US1-FED or US3.
</div>
{{< /site-region >}}

## Overview

Each [default rule][1] maps to one or more controls within a compliance framework or industry benchmark. Datadog out-of-the-box (OOTB) rules currently map rules to controls and requirements for the following frameworks and benchmarks:

- [CIS AWS Foundations Benchmark v1.3.0*][2]
- [CIS Docker Benchmark v1.2.0][2]
- [CIS Kubernetes Benchmark v1.5.1][3]
- [PCI DSS v3.2.1][4]

**Notes**:

- To pass the Monitoring Section of the [CIS AWS Foundations benchmark][2], you **must** enable [Security Monitoring][5] and forward [Cloudtrail logs to Datadog][6].

- Datadog CSPM is not designed to ensure compliance with any specific regulatory framework, benchmark, or standard. You are responsible for whether and how security configuration posture findings help your organization meet regulatory requirements and any remediation you implement. Further, Datadog OOTB rules are mapped to a subset of controls related to cloud infrastructure, and not other functions and internal processes that may impact regulatory adherence.

## Customize how your environment is scanned by each rule

On the [Rules][7] page, hover over a rule and click on the pencil icon to edit a rule at the top of the page. Under **Define search queries**, click the **Advanced** drop down menu to set filtering logic for how a rule scans your environment.

For example, you can remove all resources tagged with `env:staging` because this environment is not running production applications using the **Never trigger a signal when** function. Or, you may want to limit the scope for a certain rule to resources tagged with `compliance:pci` using the **Only trigger a signal when** function.

{{< img src="security_platform/cspm/frameworks_and_benchmarks/never-trigger-a-signal.png" alt="In the Datadog app, select Advanced to populate Never trigger a signal when, and add a query." >}}

## Set notification targets for rules

From the [Rules][7] page, you can add notification targets. The complete list of notification options are:

- [Slack][8]
- [Jira][9]
- [PagerDuty][10]
- [ServiceNow][11]
- [Microsoft Teams][12]
- [Webhooks][13]

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
