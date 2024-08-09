---
aliases:
- /es/security/misconfigurations/supported_frameworks
- /es/security/misconfigurations/frameworks_and_benchmarks/supported_frameworks
further_reading:
- link: security/cspm/setup
  tag: Documentación
  text: Empezando con CSM Misconfigurations
- link: security/default_rules
  tag: Documentación
  text: Explorar las reglas de cumplimiento predeterminadas de configuración en la
    nube de CSM Misconfigurations
- link: security/cspm/findings
  tag: Documentación
  text: Buscar y explorar los errores de configuración
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: Blog
  text: Datadog Security amplía las funciones de cumplimiento de normativas y protección
    frente a amenazas para Google Cloud
title: Marcos compatibles
---

CSM Misconfigurations incluye más de 1000 reglas de cumplimiento predefinidas que evalúan la configuración de tus recursos en la nube e identifican posibles errores de configuración. Cada [regla de cumplimiento][1] se asigna a uno o más controles dentro de las siguientes normas de cumplimiento y puntos de referencia del sector:

| Marco                                   | Etiqueta de marco     | Tipo de regla                |
|---------------------------------------------|-------------------|--------------------------|
| [CIS AWS Foundations Benchmark v1.5.0*][2]  | `cis-aws`         | Nube                    |
| [CIS Azure Foundations Benchmark v2.0.0][3] | `cis-azure`       | Nube                    |
| [CIS GCP Foundations Benchmark v1.3.0][22]  | `cis-gcp`         | Nube                    |
| [CIS Docker Benchmark v1.2.0][4]            | `cis-docker `     | Infraestructura           |
| [CIS Kubernetes Benchmark v1.7.0**][5]      | `cis-kubernetes`  | Infraestructura           |
| [CIS Kubernetes (AKS) Benchmark v1.4.0**][5]      | `cis-aks`         | Nube e infraestructura |
| [CIS Kubernetes (EKS) Benchmark v1.3.0 **][5]     | `cis-eks`         | Nube y infraestructura |
| [CIS Ubuntu 20.04 v1.0.0][23]               | `cis-ubuntu2004`  | Infraestructura           |
| [CIS Ubuntu 22.04 v1.0.0][23]               | `cis-ubuntu2204 ` | Infraestructura           |
| [CIS Red Hat Linux 7 v3.1.1][24]            | `cis-rhel7`       | Infraestructura           |
| [CIS Red Hat Linux 8 v2.0.0][24]            | `cis-rhel8`       | Infraestructura           |
| [CIS Red Hat Linux 9 v1.0.0][24]            | `cis-rhel9`       | Infraestructura           |
| [CIS Amazon Linux 2 v1.0.0][25]             | `cis-amzn2`       | Infraestructura           |
| [CIS Amazon Linux 2023 v1.0.0][25]          | `cis-al2023`      | Infraestructura           |
| [PCI DSS v4.0][6]                           | `pci-dss`         | Nube                    |
| [AICPA SOC 2][7]                            | `soc-2`           | Nube                    |
| [ISO/IEC 27001 v2][8]                       | `iso-27001`       | Nube                    |
| [HIPAA][9]                                  | `hipaa`           | Nube                    |
| [GDPR][10]                                  | `gdpr`            | Nube                    |
| [NIST 800-53][30]                           | `nist-800-53`     | Nube                    |
| [NIST 800-171][31]                          | `nist-800-171`    | Nube                    |
| [NIST Cybersecurity Framework v1.1][32]     | `nist-csf`        | Nube                    |

*Para aprobar la sección Monitorización de [CIS AWS Foundations Benchmark][2], **debes** habilitar [Cloud SIEM][11] y reenviar [logs de CloudTrail a Datadog][12].

**Algunas normas de cumplimiento de [CIS Kubernetes Benchmark][5] solo se aplican a clústeres de Kubernetes autoalojados.

**Notas**:

- CSM Misconfigurations proporciona visibilidad sobre si tus recursos están configurados de acuerdo con ciertas reglas de cumplimiento. Estas reglas se refieren a varios marcos normativos, puntos de referencia y estándares (marcos de posición de seguridad). CSM Misconfigurations no proporciona una evaluación de tu cumplimiento real con cualquier marco de posición de seguridad, y las reglas de cumplimiento pueden no abordar todos los ajustes de configuración que son relevantes para un marco determinado. Datadog recomienda que utilices CSM Misconfigurations en consulta con tu asesor legal o expertos en cumplimiento.
- Las normas de cumplimiento para CIS Benchmarks siguen las recomendaciones automatizadas de CIS. Si estás en proceso de obtener la certificación CIS, Datadog recomienda revisar también las recomendaciones manuales como parte de tu evaluación general de seguridad.
- Datadog también ofrece Essential Cloud Security Controls, un conjunto de recomendaciones desarrolladas por expertos en seguridad interna de Datadog. Basado en los riesgos comunes de seguridad en la nube observados por Datadog, este conjunto de reglas tiene como objetivo ayudar a que los usuarios que son nuevos en la seguridad en la nube corrijan los errores de configuración de alto impacto en todos sus entornos en la nube.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/azure
[4]: https://www.cisecurity.org/benchmark/docker
[5]: https://www.cisecurity.org/benchmark/kubernetes/
[6]: https://www.pcisecuritystandards.org/document_library
[7]: https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html
[8]: https://www.iso.org/isoiec-27001-information-security.html
[9]: https://www.hhs.gov/hipaa/index.html
[10]: https://gdpr.eu/
[11]: /es/security/cloud_siem/
[12]: /es/integrations/amazon_cloudtrail/
[22]: https://www.cisecurity.org/benchmark/google_cloud_computing_platform
[23]: https://www.cisecurity.org/benchmark/ubuntu_linux
[24]: https://www.cisecurity.org/benchmark/red_hat_linux
[25]: https://www.cisecurity.org/benchmark/amazon_linux
[30]: https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final
[31]: https://csrc.nist.gov/pubs/sp/800/171/r2/upd1/final
[32]: https://www.nist.gov/cyberframework/framework