---
aliases:
- /ko/security/misconfigurations/supported_frameworks
- /ko/security/misconfigurations/frameworks_and_benchmarks/supported_frameworks
further_reading:
- link: security/cspm/setup
  tag: 설명서
  text: Cloud Security Misconfigurations 시작하기
- link: security/default_rules
  tag: 설명서
  text: 기본 Cloud Security Misconfigurations 클라우드 구성 규정 준수 규칙 살펴보기
- link: security/cspm/findings
  tag: 설명서
  text: 잘못된 구성 검색 및 탐색
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: 블로그
  text: Datadog 보안이 Google Cloud 기능의 규정을 준수하고 위협으로부터 보호하도록 확장됨
title: 지원되는 프레임워크
---

Cloud Security Misconfigurations에는 클라우드 리소스 구성을 평가하고 잠재적인 오류 구성을 식별하는 1,000개 이상의 기본 제공 규정 준수 규칙이 포함되어 있습니다. 각 [규정 준수 규칙][1]은 다음 규정 준수 표준 및 업계 벤치마크 내의 하나 이상의 통제 항목에 매핑됩니다.

{{% cloud-sec-cloud-infra %}}

| 프레임워크                                       | 지원되는 버전             | 프레임워크 태그                       | 규칙 유형                |
|-------------------------------------------------|--------------------------------|-------------------------------------|--------------------------|
| [AICPA SOC 2][7]                                |                                | `soc-2`                             | 클라우드                    |
| [AWS Foundational Security Best Practices][13]  | v1.0.0                         | `aws-fsbp`                          | 클라우드                    |
| [CIS AlmaLinux 9][16]                           | v2.0.0                         | `cis-almalinux9`                    | 인프라스트럭처           |
| [CIS Amazon Linux 2023][25]                     | v1.0.0                         | `cis-al2023`                        | 인프라스트럭처           |
| [CIS Amazon Linux 2][25]                        | v3.0.0                         | `cis-amzn2`                         | 인프라스트럭처           |
| [CIS AWS Foundations Benchmark*][2]             | v5.0.0, v4.0.0, v3.0.0, v1.5.0 | `cis-aws`                           | 클라우드                    |
| [CIS Azure Foundations Benchmark][3]            | v4.0.0, v2.0.0                 | `cis-azure`                         | 클라우드                    |
| [CIS Docker Benchmark][4]                       | v1.2                           | `cis-docker`                        | 인프라스트럭처           |
| [CIS GCP Foundations Benchmark][22]             | v3.0.0                         | `cis-gcp`                           | 클라우드                    |
| [CIS GKE][34]                                   | v1.6.0                         | `cis-gke`                           | 클라우드                    |
| [CIS Kubernetes (AKS) Benchmark**][5]           | v1.4.0                         | `cis-aks`                           | 클라우드 및 인프라스트럭처 |
| [CIS Kubernetes (EKS) Benchmark**][5]           | v1.7.0, v1.4.0                 | `cis-eks`                           | 클라우드 및 인프라스트럭처 |
| [CIS Kubernetes Benchmark**][5]                 | v1.9.0                         | `cis-kubernetes`                    | 인프라스트럭처           |
| [CIS Red Hat Linux 7][24]                       | v3.1.1                         | `cis-rhel7`                         | 인프라스트럭처           |
| [CIS Red Hat Linux 8][24]                       | v2.0.0                         | `cis-rhel8`                         | 인프라스트럭처           |
| [CIS Red Hat Linux 9][24]                       | v1.0.0                         | `cis-rhel9`                         | 인프라스트럭처           |
| [CIS Ubuntu 20.04][23]                          | v1.0.0                         | `cis-ubuntu2004`                    | 인프라스트럭처           |
| [CIS Ubuntu 22.04][23]                          | v2.0.0                         | `cis-ubuntu2204`                    | 인프라스트럭처           |
| [Digital Operational Resilience Act (DORA)][35] | C(2024) 1532                   | `dora`                              | 클라우드                    |
| [Essential Cloud Security Controls][33]         | v2                             | `essential-cloud-security-controls` | 클라우드                    |
| [FedRAMP High][36] (Preview)                    | v5                             | `fedramp-high`                      | 클라우드                    |
| [GDPR][10]                                      |                                | `gdpr`                              | 클라우드                    |
| [HIPAA][9]                                      |                                | `hipaa`                             | 클라우드                    |
| [ISO/IEC 27001][8]                              | 2022, 2013                     | `iso-27001`                         | 클라우드                    |
| [NIS2 Directive (EU)][14]                       | 2022/2555                      | `nis2`                              | 클라우드                    |
| [NIST 800-171][31]                              | v2                             | `nist-800-171`                      | 클라우드                    |
| [NIST 800-53][30]                               | v5                             | `nist-800-53`                       | 클라우드                    |
| [NIST AI Risk Management Framework][15]         | v1.0                           | `nist-ai-rmf`                       | 클라우드                    |
| [NIST Cybersecurity Framework][32]              | v2.0, v1.1                     | `nist-csf`                          | 클라우드                    |
| [PCI DSS][6]                                    | v4.0                           | `pci-dss`                           | 클라우드                    |

*[CIS AWS Foundations 벤치마크][2]의 Monitoring Section을 통과하려면 **반드시** [Cloud SIEM][11]을 활성화하고 [CloudTrail 로그를 Datadog으로][12] 전달해야 합니다.

**일부 [CIS Kubernetes Benchmark][5] 컴플라이언스 규칙은 자체 호스팅 Kubernetes 클러스터에만 적용됩니다.

**참고**:

- Cloud Security Misconfigurations는 리소스가 특정 규정 준수 규칙에 따라 구성되었는지 여부를 파악할 수 있도록 지원합니다. 이러한 규칙은 다양한 규제 프레임워크, 벤치마크, 표준(Security Posture Frameworks)을 다룹니다. Cloud Security Misconfigurations는 특정 Security Posture Framework에 대한 실제 규정 준수 여부를 평가하는 것은 아니며, 규정 준수 규칙이 특정 프레임워크와 관련된 모든 구성 설정을 다루지 않을 수 있습니다. Datadog에서는 법률 자문 또는 규정 준수 전문가와 협의하여 Cloud Security Misconfigurations를 사용할 것을 권장합니다.
- CIS 벤치마크의 컴플라이언스 규칙은 CIS 자동화 권장 사항을 따릅니다. CIS 인증을 취득하는 경우 Datadog에서는 전반적인 보안 평가의 일부로 수동 권장 사항도 검토할 것을 권장합니다.
- Datadog은 또한 Datadog 내부 보안 전문가가 개발한 권장 사항 세트인 Essential Cloud Security Controls도 제공합니다. 이 규칙 세트는 Datadog이 관찰한 일반적인 클라우드 보안 위험을 기반으로 하며 클라우드 보안을 처음 접하는 사용자가 클라우드 환경에 심각한 영향을 미치는 잘못된 구성을 수정하도록 돕습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/azure
[4]: https://www.cisecurity.org/benchmark/docker
[5]: https://www.cisecurity.org/benchmark/kubernetes/
[6]: https://www.pcisecuritystandards.org/document_library
[7]: https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2
[8]: https://www.iso.org/isoiec-27001-information-security.html
[9]: https://www.hhs.gov/hipaa/index.html
[10]: https://gdpr.eu/
[11]: /ko/security/cloud_siem/
[12]: /ko/integrations/amazon_cloudtrail/
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