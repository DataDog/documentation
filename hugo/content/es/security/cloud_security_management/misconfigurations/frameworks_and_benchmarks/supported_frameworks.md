---
aliases:
- /es/security/misconfigurations/supported_frameworks
- /es/security/misconfigurations/frameworks_and_benchmarks/supported_frameworks
further_reading:
- link: security/cspm/setup
  tag: Documentación
  text: Primeros pasos con Cloud Security Misconfigurations
- link: security/default_rules
  tag: Documentación
  text: Explore las reglas de cumplimiento de configuración en la nube para las Cloud
    Security Misconfigurations predeterminadas
- link: security/cspm/findings
  tag: Documentación
  text: Busque y explore misconfiguraciones
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: blog
  text: Datadog Security amplía las capacidades de cumplimiento y protección contra
    amenazas para Google Cloud
title: Marcos de trabajo compatibles
---
Cloud Security Misconfigurations incluye más de 1,000 reglas de cumplimiento listas para usar que evalúan la configuración de sus recursos en la nube e identifican posibles misconfiguraciones. Cada [regla de cumplimiento][1] se asigna a uno o más controles dentro de los siguientes estándares de cumplimiento y puntos de referencia de la industria.

{{% cloud-sec-cloud-infra %}}

| Marco de trabajo                                       | Versiones compatibles             | Etiqueta del marco de trabajo                       | Tipo de regla                |
|-------------------------------------------------|--------------------------------|-------------------------------------|--------------------------|
| [AICPA SOC 2][7]                                | 2017 TSC con rev POF - 2022     | `soc-2`                             | Nube                    |
| [Australia APRA CPS 234][39]                    | 2019                           | `cps234`                            | Nube                    |
| [Australia ASD Essential 8][40]                 | 2024                           | `essential8`                        | Nube                    |
| [Prácticas recomendadas de seguridad fundamentales de AWS][13]  | v1.0.0                         | `aws-fsbp`                          | Nube                    |
| [LGPD de Brasil][44]                               | 2018                           | `lgpd`                              | Nube                    |
| [California CCPA/CPRA][38]                      | Nov. de 2022                       | `ccpa`                              | Nube                    |
| [CIS AlmaLinux 9][16]                           | v2.0.0                         | `cis-almalinux9`                    | Infraestructura           |
| [CIS Amazon Linux 2023][25]                     | v1.0.0                         | `cis-al2023`                        | Infraestructura           |
| [CIS Amazon Linux 2][25]                        | v3.0.0                         | `cis-amzn2`                         | Infraestructura           |
| [CIS AWS Foundations Benchmark*][2]             | v5.0.0, v4.0.0, v3.0.0, v1.5.0 | `cis-aws`                           | Nube                    |
| [CIS Azure Foundations Benchmark][3]            | v4.0.0, v2.0.0                 | `cis-azure`                         | Nube                    |
| [CIS Docker Benchmark][4]                       | v1.2                           | `cis-docker`                        | Infraestructura           |
| [CIS GCP Foundations Benchmark][22]             | v3.0.0                         | `cis-gcp`                           | Cloud                    |
| [CIS GKE][34]                                   | v1.6.0                         | `cis-gke`                           | Cloud                    |
| [CIS Kubernetes (AKS) Benchmark**][5]           | v1.4.0                         | `cis-aks`                           | Cloud e infraestructura |
| [CIS Kubernetes (EKS) Benchmark**][5]           | v1.7.0, v1.4.0                 | `cis-eks`                           | Cloud e infraestructura |
| [CIS Kubernetes Benchmark**][5]                 | v1.9.0                         | `cis-kubernetes`                    | Infraestructura           |
| [CIS Red Hat Linux 7][24]                       | v3.1.1                         | `cis-rhel7`                         | Infraestructura           |
| [CIS Red Hat Linux 8][24]                       | v3.0.0                         | `cis-rhel8`                         | Infraestructura           |
| [CIS Red Hat Linux 9][24]                       | v2.0.0                         | `cis-rhel9`                         | Infraestructura           |
| [CIS Ubuntu 20.04][23]                          | v1.0.0                         | `cis-ubuntu2004`                    | Infraestructura           |
| [CIS Ubuntu 22.04][23]                          | v2.0.0                         | `cis-ubuntu2204`                    | Infraestructura           |
| [CIS Ubuntu 24.04][23]                          | v1.0.0                         | `cis-ubuntu2404`                    | Infraestructura           |
| [CMMC][37]                                      | v2.0                           | `cmmc-level-2`                      | Cloud                    |
| [Ley de Resiliencia Operativa Digital (DORA)][35] | C(2024) 1532                   | `dora`                              | Cloud                    |
| [Controles esenciales de Cloud Security][33]         | v2                             | `essential-cloud-security-controls` | Cloud                    |
| [Ley de Ciberresiliencia de la UE][43]                   | 2024                           | `cyber-resilience-act`              | Cloud                    |
| [FedRAMP High][36]                              | v5                             | `fedramp-high`                      | Cloud                    |
| [FedRAMP Moderate][36]                          | v5                             | `fedramp-moderate`                  | Cloud                    |
| [FedRAMP Low][36]                               | v5                             | `fedramp-low`                       | Cloud                    |
| [GDPR][10]                                      | 2016/679                       | `gdpr`                              | Cloud                    |
| [HIPAA][9]                                      | 800-66-r2                      | `hipaa`                             | Cloud                    |
| [ISO/IEC 27001][8]                              | 2022, 2013                     | `iso-27001`                         | Cloud                    |
| [NIS2 Directive (EU)][14]                       | 2022/2555                      | `nis2`                              | Cloud                    |
| [NIST 800-171][31]                              | v3                             | `nist-800-171`                      | Cloud                    |
| [NIST 800-53][30]                               | v5                             | `nist-800-53`                       | Cloud                    |
| [Marco de Gestión de Riesgos de IA del NIST][15]         | v1.0                           | `nist-ai-rmf`                       | Cloud                    |
| [Marco de Ciberseguridad del NIST][32]              | v2.0, v1.1                     | `nist-csf`                          | Cloud                    |
| [PCI DSS][6]                                    | v4.0                           | `pci-dss`                           | Cloud                    |
| [UK Cyber Essentials][42]                       | 2024                           | `cyber-essentials`                  | Cloud                    |
| [Singapore MAS TRM][41]                         | 2021                           | `mas-trm`                           | Cloud                    |

*Para aprobar la Sección de Monitoreo del [CIS AWS Foundations benchmark][2], usted **debe** habilitar [Cloud SIEM][11] y reenviar [CloudTrail logs to Datadog][12].

**Algunas reglas de cumplimiento del [CIS Kubernetes Benchmark][5] solo se aplican a clústeres de Kubernetes autohospedados.**Notas**:

- Cloud Security Misconfigurations proporciona visibilidad sobre si sus recursos están configurados de acuerdo con ciertas reglas de cumplimiento. Estas reglas abordan diversos marcos regulatorios, puntos de referencia y estándares (Marcos de Postura de Seguridad). Cloud Security Misconfigurations no proporciona una evaluación de su cumplimiento real con ningún Marco de Postura de Seguridad, y es posible que las reglas de cumplimiento no aborden todas las configuraciones que sean relevantes para un marco determinado. Datadog recomienda que utilice Cloud Security Misconfigurations en consulta con su asesor legal o expertos en cumplimiento.
- Las reglas de cumplimiento para los puntos de referencia CIS siguen las recomendaciones automatizadas de CIS. Si está obteniendo la certificación CIS, Datadog recomienda también revisar las recomendaciones manuales como parte de su evaluación de seguridad general.
- Datadog también proporciona Essential Cloud Security Controls, un conjunto de recomendaciones desarrolladas por los expertos en seguridad internos de Datadog. Basado en los riesgos comunes de Cloud Security observados por Datadog, este conjunto de reglas tiene como objetivo ayudar a los usuarios que son nuevos en Cloud Security a remediar misconfiguraciones de alto impacto en sus entornos de nube.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/azure
[4]: https://www.cisecurity.org/benchmark/docker
[5]: https://www.cisecurity.org/benchmark/kubernetes/
[6]: https://www.pcisecuritystandards.org/document_library
[7]: https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2
[8]: https://www.iso.org/isoiec-27001-information-security.html
[9]: https://www.hhs.gov/hipaa/index.html
[10]: https://gdpr.eu/
[11]: /es/security/cloud_siem/
[12]: /es/integrations/amazon_cloudtrail/
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