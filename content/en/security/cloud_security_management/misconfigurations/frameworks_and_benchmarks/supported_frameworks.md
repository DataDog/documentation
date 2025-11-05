---
title: Supported Frameworks
aliases:
  - /security/misconfigurations/supported_frameworks
  - /security/misconfigurations/frameworks_and_benchmarks/supported_frameworks
further_reading:
- link: "security/cspm/setup"
  tag: "Documentation"
  text: "Getting started with Cloud Security Misconfigurations"
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default Cloud Security Misconfigurations cloud configuration compliance rules"
- link: "security/cspm/findings"
  tag: "Documentation"
  text: "Search and explore misconfigurations"
- link: "https://www.datadoghq.com/blog/datadog-security-google-cloud/"
  tag: "Blog"
  text: "Datadog Security extends compliance and threat protection capabilities for Google Cloud"
---

Cloud Security Misconfigurations comes with more than 1,000 out-of-the-box compliance rules that evaluate the configuration of your cloud resources and identify potential misconfigurations. Each [compliance rule][1] maps to one or more controls within the following compliance standards and industry benchmarks.

{{% cloud-sec-cloud-infra %}}

| Framework                                       | Supported Versions             | Framework Tag                       | Rule Type                |
|-------------------------------------------------|--------------------------------|-------------------------------------|--------------------------|
| [AICPA SOC 2][7]                                |                                | `soc-2`                             | Cloud                    |
| [AWS Foundational Security Best Practices][13]  | v1.0.0                         | `aws-fsbp`                          | Cloud                    |
| [CIS AlmaLinux 9][16]                           | v2.0.0                         | `cis-almalinux9`                    | Infrastructure           |
| [CIS Amazon Linux 2023][25]                     | v1.0.0                         | `cis-al2023`                        | Infrastructure           |
| [CIS Amazon Linux 2][25]                        | v3.0.0                         | `cis-amzn2`                         | Infrastructure           |
| [CIS AWS Foundations Benchmark*][2]             | v5.0.0, v4.0.0, v3.0.0, v1.5.0 | `cis-aws`                           | Cloud                    |
| [CIS Azure Foundations Benchmark][3]            | v4.0.0, v2.0.0                 | `cis-azure`                         | Cloud                    |
| [CIS Docker Benchmark][4]                       | v1.2                           | `cis-docker`                        | Infrastructure           |
| [CIS GCP Foundations Benchmark][22]             | v3.0.0                         | `cis-gcp`                           | Cloud                    |
| [CIS GKE][34]                                   | v1.6.0                         | `cis-gke`                           | Cloud                    |
| [CIS Kubernetes (AKS) Benchmark**][5]           | v1.4.0                         | `cis-aks`                           | Cloud and Infrastructure |
| [CIS Kubernetes (EKS) Benchmark**][5]           | v1.7.0, v1.4.0                 | `cis-eks`                           | Cloud and Infrastructure |
| [CIS Kubernetes Benchmark**][5]                 | v1.9.0                         | `cis-kubernetes`                    | Infrastructure           |
| [CIS Red Hat Linux 7][24]                       | v3.1.1                         | `cis-rhel7`                         | Infrastructure           |
| [CIS Red Hat Linux 8][24]                       | v2.0.0                         | `cis-rhel8`                         | Infrastructure           |
| [CIS Red Hat Linux 9][24]                       | v1.0.0                         | `cis-rhel9`                         | Infrastructure           |
| [CIS Ubuntu 20.04][23]                          | v1.0.0                         | `cis-ubuntu2004`                    | Infrastructure           |
| [CIS Ubuntu 22.04][23]                          | v2.0.0                         | `cis-ubuntu2204`                    | Infrastructure           |
| [Digital Operational Resilience Act (DORA)][35] | C(2024) 1532                   | `dora`                              | Cloud                    |
| [Essential Cloud Security Controls][33]         | v2                             | `essential-cloud-security-controls` | Cloud                    |
| [FedRAMP High][36] (Preview)                    | v5                             | `fedramp-high`                      | Cloud                    |
| [GDPR][10]                                      |                                | `gdpr`                              | Cloud                    |
| [HIPAA][9]                                      |                                | `hipaa`                             | Cloud                    |
| [ISO/IEC 27001][8]                              | 2022, 2013                     | `iso-27001`                         | Cloud                    |
| [NIS2 Directive (EU)][14]                       | 2022/2555                      | `nis2`                              | Cloud                    |
| [NIST 800-171][31]                              | v2                             | `nist-800-171`                      | Cloud                    |
| [NIST 800-53][30]                               | v5                             | `nist-800-53`                       | Cloud                    |
| [NIST AI Risk Management Framework][15]         | v1.0                           | `nist-ai-rmf`                       | Cloud                    |
| [NIST Cybersecurity Framework][32]              | v2.0, v1.1                     | `nist-csf`                          | Cloud                    |
| [PCI DSS][6]                                    | v4.0                           | `pci-dss`                           | Cloud                    |

*To pass the Monitoring Section of the [CIS AWS Foundations benchmark][2], you **must** enable [Cloud SIEM][11] and forward [CloudTrail logs to Datadog][12].

**Some [CIS Kubernetes Benchmark][5] compliance rules only apply to self-hosted Kubernetes clusters.

**Notes**:

- Cloud Security Misconfigurations provides visibility into whether your resources are configured in accordance with certain compliance rules. These rules address various regulatory frameworks, benchmarks, and standards (Security Posture Frameworks). Cloud Security Misconfigurations does not provide an assessment of your actual compliance with any Security Posture Framework, and the compliance rules may not address all configuration settings that are relevant to a given framework. Datadog recommends that you use Cloud Security Misconfigurations in consultation with your legal counsel or compliance experts.
- The compliance rules for the CIS benchmarks follow the CIS automated recommendations. If you're obtaining CIS certification, Datadog recommends also reviewing the manual recommendations as part of your overall security assessment.
- Datadog also provides Essential Cloud Security Controls, a set of recommendations developed by Datadog internal security experts. Based on common cloud security risks observed by Datadog, this ruleset aims to help users that are new to cloud security remediate high-impact misconfigurations across their cloud environments.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/azure
[4]: https://www.cisecurity.org/benchmark/docker
[5]: https://www.cisecurity.org/benchmark/kubernetes/
[6]: https://www.pcisecuritystandards.org/document_library
[7]: https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2
[8]: https://www.iso.org/isoiec-27001-information-security.html
[9]: https://www.hhs.gov/hipaa/index.html
[10]: https://gdpr.eu/
[11]: /security/cloud_siem/
[12]: /integrations/amazon_cloudtrail/
[13]: https://docs.aws.amazon.com/securityhub/latest/userguide/fsbp-standard.html
[14]: https://digital-strategy.ec.europa.eu/en/policies/nis2-directive
[15]: https://www.nist.gov/itl/ai-risk-management-framework
[16]: https://www.cisecurity.org/benchmark/almalinuxos_linux
[22]: https://www.cisecurity.org/benchmark/google_cloud_computing_platform
[23]: https://www.cisecurity.org/benchmark/ubuntu_linux
[24]: https://www.cisecurity.org/benchmark/red_hat_linux
[25]: https://www.cisecurity.org/benchmark/amazon_linux
[30]: https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final
[31]: https://csrc.nist.gov/pubs/sp/800/171/r2/upd1/final
[32]: https://www.nist.gov/cyberframework/framework
[33]: https://www.datadoghq.com/blog/essential-cloud-security-controls-ruleset-v2/
[34]: https://www.cisecurity.org/benchmark/kubernetes
[35]: https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en
[36]: https://www.fedramp.gov/
