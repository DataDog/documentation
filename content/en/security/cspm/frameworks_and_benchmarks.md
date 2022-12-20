---
title: Findings Reports
kind: documentation
aliases:
  - /security_platform/cspm/frameworks_and_benchmarks
further_reading:
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default Posture Management cloud configuration detection rules"
- link: "security/cspm/findings"
  tag: "Documentation"
  text: "Search and explore CSPM findings"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

{{< img src="security/cspm/frameworks_and_benchmarks/report.png" alt="Set a findings time window using the dropdown" style="width:80%;">}}

## Overview

Each [OOTB rule][1] maps to one or more controls within a compliance standard or industry benchmark. Datadog OOTB rules currently map to controls and requirements for the following frameworks and benchmarks:

- [CIS AWS Foundations Benchmark v1.3.0*][2]
- [CIS Azure Foundations Benchmark v1.3.0][3]
- [CIS Docker Benchmark v1.2.0][4]
- [CIS Kubernetes Benchmark v1.5.1**][5]
- [PCI DSS v3.2.1][6]
- [AICPA SOC 2][7]
- [ISO/IEC 27001 v2][8]
- [HIPAA][9]
- [GDPR][10]

*To pass the Monitoring Section of the [CIS AWS Foundations benchmark][2], you **must** enable [Cloud SIEM][11] and forward [Cloudtrail logs to Datadog][12].

**Some [CIS Kubernetes Benchmark][5] detection rules only apply to self-hosted Kubernetes clusters.

**Note**: Datadog CSPM provides you with visibility into whether your resources are configured in accordance with certain detection rules. Datadog's OOTB detection rules address various regulatory frameworks, benchmarks, and standards (“Security Posture Frameworks”). Datadog CSPM does not provide an assessment of your actual compliance with any Security Posture Framework, and the OOTB rules may not address all configuration settings that are relevant to the Security Posture Frameworks. To be clear, just because your resources pass the OOTB Rules does not mean that you are meeting all the requirements under any particular Security Posture Framework. Datadog is not providing legal or compliance advice or guidance, and it is recommended that you use Datadog CSPM in consultation with your legal counsel or compliance experts.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/azure
[4]: https://www.cisecurity.org/benchmark/docker
[5]: https://www.cisecurity.org/benchmark/kubernetes/
[6]: https://www.pcisecuritystandards.org/document_library
[7]: https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html
[8]: https://www.iso.org/isoiec-27001-information-security.html
[9]: https://www.hhs.gov/hipaa/index.html
[10]: https://gdpr.eu/
[11]: /security/cloud_siem/
[12]: /integrations/amazon_cloudtrail/
[13]: https://app.datadoghq.com/security/configuration/rules/
[14]: /integrations/slack/
[15]: /integrations/jira/
[16]: /integrations/pagerduty
[17]: /integrations/servicenow/
[18]: /integrations/microsoft_teams/
[19]: /integrations/webhooks/
