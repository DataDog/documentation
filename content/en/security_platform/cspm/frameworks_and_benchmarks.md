---
title: Compliance Findings
kind: documentation
further_reading:
- link: "security_platform/default_rules"
  tag: "Documentation"
  text: "Explore default cloud configuration rules"
- link: "security_platform/cspm/findings"
  tag: "Documentation"
  text: "Search and explore compliance findings"
---

## Overview

Each default rule maps to one or more controls within a compliance framework or industry benchmark. Datadog currently map rules to the following frameworks & benchmarks:

- [CIS AWS Foundations Benchmark v1.3.0*][1]
- [CIS Docker Benchmark v1.2.0][1]
- [CIS Kubernetes Benchmark v1.5.1][2]
- [PCI DSS v3.2.1][3]
- [AISCA SOC 2][4]
- [GDPR][5]
- [HIPAA][6]
- [NIST 800-53 revision 5][7]
- [NIST 800-171][8]

**Notes**:

- To pass the Monitoring Section of the CIS AWS Foundations benchmark, you **must** enable Security Monitoring and forward Cloudtrail logs to Datadog.

- Datadog CSPM is not designed to ensure compliance with a specific regulatory framework. You are responsible for how Datadog findings help your organization meet regulatory requirements. Further, Datadog focuses on mapping Datadog rules to a subset of compliance controls that are directly related to cloud infrastructure, and not other functions and internal processes that may impact regulatory adherence.

## Customize how your environment is scanned by each rule

On the [Rules][9] page, hover over a rule and click on the pencil icon to edit a rule **OR** select `New Rule` at the top of the page. Under **Define search queries**, click the **Advanced** drop down menu to set filtering logic for how a rule scans your environment.

For example, you can remove all resources tagged with `env:staging` because this environment is not running production applications using the **Never trigger a signal when** function. Or, you may want to limit scope for a certain rule to resources tagged with `compliance:pci` using the **Only trigger a signal when** function.

[img here]

## Set notification targets for rules

From the [Rules][9] page, you can add notification targets. The complete list of notification options are:

- Slack
- Jira
- PagerDuty
- ServiceNow
- Microsoft Teams
- Webhooks

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisecurity.org/benchmark/amazon_web_services/
[2]: https://www.cisecurity.org/benchmark/kubernetes/
[3]: https://www.pcisecuritystandards.org/document_library
[4]: https://www.isaca.org/resources/isaca-journal/issues/2019/volume-6/soc-reports-for-cloud-security-and-privacy
[5]: https://gdpr-info.eu/
[6]: https://www.hhs.gov/hipaa/index.html
[7]: https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final
[8]: https://csrc.nist.gov/publications/detail/sp/800-171/rev-2/final
[9]: https://app.datadoghq.com/security/configuration/rules/
