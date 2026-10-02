---
aliases:
- /fr/security/misconfigurations/supported_frameworks
- /fr/security/misconfigurations/frameworks_and_benchmarks/supported_frameworks
further_reading:
- link: security/cspm/setup
  tag: Documentation
  text: Premiers pas avec Cloud Security Misconfigurations
- link: security/default_rules
  tag: Documentation
  text: Explorez les règles de conformité de la configuration cloud par défaut de
    Cloud Security Misconfigurations
- link: security/cspm/findings
  tag: Documentation
  text: Recherchez et explorez les erreurs de configuration
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: Blog
  text: Datadog Security propose davantage de fonctionnalités de conformité et de
    protection contre les menaces pour Google Cloud
title: Frameworks pris en charge
---
Cloud Security Misconfigurations comporte plus de 1 000 règles de conformité intégrées qui évaluent la configuration de vos ressources cloud et identifient d'éventuelles erreurs de configuration. Chaque [règle de conformité][1] correspond à un ou plusieurs contrôles dans les normes de conformité et benchmarks industriels suivants.

{{% cloud-sec-cloud-infra %}}

| Framework                                       | Versions prises en charge             | Tag de framework                       | Type de règle                |
|-------------------------------------------------|--------------------------------|-------------------------------------|--------------------------|
| [AICPA SOC 2][7]                                | 2017 TSC w/ rev POF – 2022     | `soc-2`                             | Cloud                    |
| [Australia APRA CPS 234][39]                    | 2019                           | `cps234`                            | Cloud                    |
| [Australia ASD Essential 8][40]                 | 2024                           | `essential8`                        | Cloud                    |
| [AWS Foundational Security Best Practices][13]  | v1.0.0                         | `aws-fsbp`                          | Cloud                    |
| [Brazil LGPD][44]                               | 2018                           | `lgpd`                              | Cloud                    |
| [California CCPA/CPRA][38]                      | Nov 2022                       | `ccpa`                              | Cloud                    |
| [CIS AlmaLinux 9][16]                           | v2.0.0                         | `cis-almalinux9`                    | Infrastructure           |
| [CIS Amazon Linux 2023][25]                     | v1.0.0                         | `cis-al2023`                        | Infrastructure           |
| [CIS Amazon Linux 2][25]                        | v3.0.0                         | `cis-amzn2`                         | Infrastructure           |
| [CIS AWS Foundations Benchmark*][2]             | v5.0.0, v4.0.0, v3.0.0, v1.5.0 | `cis-aws`                           | Cloud                    |
| [CIS Azure Foundations Benchmark][3]            | v4.0.0, v2.0.0                 | `cis-azure`                         | Cloud                    |
| [CIS Docker Benchmark][4]                       | v1.2                           | `cis-docker`                        | Infrastructure           |
| [CIS GCP Foundations Benchmark][22]             | v3.0.0                         | `cis-gcp`                           | Cloud                    |
| [CIS GKE][34]                                   | v1.6.0                         | `cis-gke`                           | Cloud                    |
| [CIS Kubernetes (AKS) Benchmark**][5]           | v1.4.0                         | `cis-aks`                           | Cloud et Infrastructure |
| [CIS Kubernetes (EKS) Benchmark**][5]           | v1.7.0, v1.4.0                 | `cis-eks`                           | Cloud et Infrastructure |
| [CIS Kubernetes Benchmark**][5]                 | v1.9.0                         | `cis-kubernetes`                    | Infrastructure           |
| [CIS Red Hat Linux 7][24]                       | v3.1.1                         | `cis-rhel7`                         | Infrastructure           |
| [CIS Red Hat Linux 8][24]                       | v3.0.0                         | `cis-rhel8`                         | Infrastructure           |
| [CIS Red Hat Linux 9][24]                       | v2.0.0                         | `cis-rhel9`                         | Infrastructure           |
| [CIS Ubuntu 20.04][23]                          | v1.0.0                         | `cis-ubuntu2004`                    | Infrastructure           |
| [CIS Ubuntu 22.04][23]                          | v2.0.0                         | `cis-ubuntu2204`                    | Infrastructure           |
| [CIS Ubuntu 24.04][23]                          | v1.0.0                         | `cis-ubuntu2404`                    | Infrastructure           |
| [CMMC][37]                                      | v2.0                           | `cmmc-level-2`                      | Cloud                    |
| [Digital Operational Resilience Act (DORA)][35] | C(2024) 1532                   | `dora`                              | Cloud                    |
| [Contrôles essentiels de Cloud Security][33]         | v2                             | `essential-cloud-security-controls` | Cloud                    |
| [EU Cyber Resilience Act][43]                   | 2024                           | `cyber-resilience-act`              | Cloud                    |
| [FedRAMP High][36]                              | v5                             | `fedramp-high`                      | Cloud                    |
| [FedRAMP Moderate][36]                          | v5                             | `fedramp-moderate`                  | Cloud                    |
| [FedRAMP Low][36]                               | v5                             | `fedramp-low`                       | Cloud                    |
| [RGPD][10]                                      | 2016/679                       | `gdpr`                              | Cloud                    |
| [HIPAA][9]                                      | 800-66-r2                      | `hipaa`                             | Cloud                    |
| [ISO/IEC 27001][8]                              | 2022, 2013                     | `iso-27001`                         | Cloud                    |
| [NIS2 Directive (EU)][14]                       | 2022/2555                      | `nis2`                              | Cloud                    |
| [NIST 800-171][31]                              | v3                             | `nist-800-171`                      | Cloud                    |
| [NIST 800-53][30]                               | v5                             | `nist-800-53`                       | Cloud                    |
| [NIST AI Risk Management Framework][15]         | v1.0                           | `nist-ai-rmf`                       | Cloud                    |
| [NIST Cybersecurity Framework][32]              | v2.0, v1.1                     | `nist-csf`                          | Cloud                    |
| [PCI DSS][6]                                    | v4.0                           | `pci-dss`                           | Cloud                    |
| [UK Cyber Essentials][42]                       | 2024                           | `cyber-essentials`                  | Cloud                    |
| [Singapore MAS TRM][41]                         | 2021                           | `mas-trm`                           | Cloud                    |

*Pour réussir la section Surveillance du [CIS AWS Foundations Benchmark][2], **activez** [Cloud SIEM][11] et redirigez les [logs CloudTrail vers Datadog][12].

**Certaines règles de conformité des [benchmarks CIS Kubernetes][5] s'appliquent uniquement aux clusters Kubernetes autohébergés.**Remarques** :

- Cloud Security Misconfigurations offre une visibilité sur la configuration de vos ressources, afin de vérifier si elles respectent certaines règles de conformité. Ces règles concernent divers cadres réglementaires, benchmarks et normes (Security Posture Frameworks). Cloud Security Misconfigurations n'évalue pas votre conformité réelle à un quelconque Security Posture Framework, et les règles de conformité peuvent ne pas couvrir l'ensemble des paramètres de configuration pertinents pour un cadre donné. Datadog vous recommande d'utiliser Cloud Security Misconfigurations en collaboration avec votre conseiller juridique ou vos experts en conformité.
- Les règles de conformité pour les benchmarks CIS suivent les recommandations automatisées du CIS. Si vous obtenez la certification CIS, Datadog vous recommande également d'examiner les recommandations manuelles dans le cadre de votre évaluation globale de sécurité.
- Datadog fournit également des contrôles essentiels de Cloud Security, un ensemble de recommandations élaborées par les experts internes en sécurité de Datadog. Basé sur les risques courants en sécurité cloud identifiés par Datadog, cet ensemble de règles vise à aider les utilisateurs novices en sécurité cloud à corriger les erreurs de configuration à fort impact dans leurs environnements cloud.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/azure
[4]: https://www.cisecurity.org/benchmark/docker
[5]: https://www.cisecurity.org/benchmark/kubernetes/
[6]: https://www.pcisecuritystandards.org/document_library
[7]: https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2
[8]: https://www.iso.org/isoiec-27001-information-security.html
[9]: https://www.hhs.gov/hipaa/index.html
[10]: https://gdpr.eu/
[11]: /fr/security/cloud_siem/
[12]: /fr/integrations/amazon_cloudtrail/
[13]: https://docs.aws.amazon.com/securityhub/latest/userguide/fsbp-standard.html
[14]: https://digital-strategy.ec.europa.eu/en/policies/nis2-directive
[15]: https://www.nist.gov/itl/ai-risk-management-framework
[16]: https://www.cisecurity.org/benchmark/almalinuxos_linux
[22]: https://www.cisecurity.org/benchmark/google_cloud_computing_platform
[23]: https://www.cisecurity.org/benchmark/ubuntu_linux
[24]: https://www.cisecurity.org/benchmark/red_hat_linux
[25]: https://www.cisecurity.org/benchmark/amazon_linux
[30]: https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final
[31]: https://csrc.nist.gov/pubs/sp/800/171/r3/final
[32]: https://www.nist.gov/cyberframework/framework
[33]: https://www.datadoghq.com/blog/essential-cloud-security-controls-ruleset-v2/
[34]: https://www.cisecurity.org/benchmark/kubernetes
[35]: https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en
[36]: https://www.fedramp.gov/
[37]: https://dowcio.war.gov/CMMC/About/
[38]: https://oag.ca.gov/privacy/ccpa
[39]: https://www.apra.gov.au/sites/default/files/cps_234_july_2019_for_public_release.pdf
[40]: https://www.cyber.gov.au/business-government/asds-cyber-security-frameworks/essential-eight
[41]: https://www.mas.gov.sg/regulation/guidelines/technology-risk-management-guidelines
[42]: https://www.ncsc.gov.uk/cyberessentials/overview
[43]: https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act
[44]: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/outros-documentos-e-publicacoes-institucionais/lgpd-en-lei-no-13-709-capa.pdf