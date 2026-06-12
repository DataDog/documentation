---
title: Tipos de despliegue de Cloud Security compatibles
---

{{< partial name="security-platform/CSW-billing-note.html" >}}

La siguiente tabla resume las funciones de Cloud Security disponibles en relación con cada tipo de despliegue.

| Tipo de despliegue     | Agent obligatorio (7.46 o posterior) | Errores de configuración | Vulnerabilidades              | Riesgos de identidad | Agentless Scanning |
|---------------------|------------------------|-------------------|------------------------------|----------------|--------------------|
| Cuenta de AWS         |                        | {{< X >}}         | {{< X >}}                    | {{< X >}}      | {{< X >}}          |
| Cuenta de Azure       |                        | {{< X >}}         | Agentless Scanning (Vista previa) | {{< X >}}      |                    |
| Cuenta de GCP         |                        | {{< X >}}         |                              |                |                    |
| Terraform           |                        |                   |                              |                | {{< X >}}          |
| Docker              | {{< X >}}              | {{< X >}}         |                              |                |                    |
| Kubernetes          | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                |                    |
| Linux               | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                |                    |
| Amazon ECS/EKS      | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                |                    |
| Windows             | {{< X >}}              |                   | {{< X >}}                    |                |                    |
| AWS Fargate ECS/EKS | {{< X >}}              |                   |                              |                |                    |

La siguiente tabla resume el alcance de la cobertura disponible relativa a cada función de Cloud Security.
| Recursos monitorizados             | Errores de configuración | Vulnerabilidades | Riesgos de identidad | Agentless Scanning |
|---------------------------------|-------------------|-----------------|----------------|--------------------|
| Recursos en cuenta de AWS         | {{< X >}}         | {{< X >}}       |                | {{< X >}}          |
| Recursos en suscripción de Azure | {{< X >}}         |                 |                |                    |
| Recursos en proyecto de GCP        | {{< X >}}         |                 |                |                    |
| Clúster Kubernetes              | {{< X >}}         |                 |                |                    |
| Host Docker                     | {{< X >}}         |                 |                |                    |
| Host Linux                      | {{< X >}}         | {{< X >}}       |                | {{< X >}}          |
| Host Windows                    |                   | {{< X >}}       |                |                    |
| Contenedor Docker                |                   |                 |                |                    |
| Imagen de contenedor            |                   | {{< X >}}       |                | {{< X >}}          |
| IAM en cuenta de AWS              |                   |                 | {{< X >}}      |                    |

**Nota**: Cloud Security Misconfigurations monitoriza además los recursos comunes utilizados en tus cuentas en la nube que ejecutan Windows y AWS Fargate, como las instancias EC2, RDS, S3 y ELB.

[1]: /es/security/cloud_security_management/setup/#cloud-security-threats
[2]: /es/security/cloud_security_management/setup/#cloud-security-vulnerabilities
[3]: /es/security/cloud_security_management/setup/#cloud-security-identity-risks