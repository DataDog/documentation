---
aliases:
- /es/security/cloud_security_management/agentless_scanning/compatibility
title: Compatibilidad con el análisis Agentless
---

## Disponibilidad

Agentless Scanning es compatible con AWS, Azure y GCP.

La siguiente tabla proporciona un resumen de las tecnologías de Agentless Scanning en relación con sus componentes correspondientes para cada proveedor de nube compatible:

| Componente                                       | AWS                                                                                                      | Azure                                                                                                                                                                             | GCP                                                                                                                                                                                                                       |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sistema operativo                                | Linux; Windows Server 2016 o posterior; Windows 10 o posterior                                                 | Linux; Windows Server 2016 o posterior; Windows 10 o posterior                                                                                                                          | Linux; Windows Server 2016 o posterior; Windows 10 o posterior                                                                                                                                                                  |
| Sistema de archivos de host                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                       | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                                                        |
| Gestor de paquetes                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                   | Deb (Debian, Ubuntu) <br> RPM (Fedora, RedHat, CentOS) <br> APK (Alpine)                                                                                                          | Deb (Debian, Ubuntu) <br> RPM (Fedora, RedHat, CentOS) <br> APK (Alpine)                                                                                                                                                  |
| Cifrado                                      | AWS </br> Sin cifrar </br> Cifrado - Clave gestionada por la plataforma (PMK) y Clave gestionada por el cliente (CMK)        | Cifrado - Clave gestionada por la plataforma (PMK): Cifrado del lado del servidor Azure Disk Storage, Cifrado en host </br> **Nota**: Cifrado - Clave gestionada por el cliente (CMK) **no** es compatible. | Cifrado, Clave gestionada por plataforma (PMK): cifrado de disco persistente, VM confidencial </br> **Nota**: Cifrado, Clave de cifrado gestionada por el cliente (CMEK) y Claves de cifrado suministradas por el cliente (CSEK) **no** son compatibles. |
| Tiempo de ejecución del contenedor                               | Docker, en contenedor </br> **Nota**: CRI-O **no** es compatible                                            | Docker, en contenedor </br> **Nota**: CRI-O **no** es compatible                                                                                                                     | Docker, en contenedor </br> **Nota**: CRI-O **no** es compatible                                                                                                                                                             |
| Serverless                                      | AWS Lambda <br> AWS Fargate para ECS                                                                      | Azure Container Apps y Azure Container Instances<br />**Nota**: Requiere la última versión de Agentless Scanner. Consulta [Actualización deAgentless Scanning][17].                                                                           | Cloud Run (solo despliegue de contenedores, no desde repositorios de GitHub o editores en línea)                                                                                                                                           |
| Kubernetes                                      | EKS solo en nodos de EC2 </br> **Nota**: Los nodos de EKS respaldados por Fargate **no** son compatibles                     | AKS en máquinas virtuales y Virtual Machine Scale Sets (VMSS) </br> **Nota**: AKS en ACI **no** es compatible                                                                     | Solo GKE Standard </br> **Nota**: GKE Autopilot y la transmisión de imágenes **no** son compatibles.                                                                                                                                 |
| Lenguajes de aplicación (en hosts y contenedores) | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                      | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                               | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                                                                       |
| Registros de contenedores                            | Amazon ECR (público y privado): escanea imágenes de contenedores en ejecución y las últimas 1000 imágenes push en reposo. | ACR: explora solo las imágenes de contenedor en ejecución<br />**Nota:** Para solicitar la exploración del registro en reposo, ponte en contacto con el [soporte de Datadog][16]                                             | Google Artifact Registry: escanea imágenes de cargas de trabajo en ejecución únicamente<br />**Nota:** Para solicitar el escaneado del registro en reposo, ponte en contacto con el [soporte de Datadog][16]                                                                     |
| Imágenes de host                                     | AMI                                                                                                      | No compatible                                                                                                                                                                     | No compatible                                                                                                                                                                                                             |
| Datos confidenciales (SDS)                            | S3, RDS (beta privada)                                                                                   | No compatible                                                                                                                                                                     | No compatible                                                                                                                                                                                                             |

**Nota**: Las AMI deben almacenarse en una cuenta que utilice la integración AWS de Datadog. De lo contrario, Datadog no puede leer el snapshot subyacente de Amazon Elastic Block Store (EBS) de la AMI, por lo que no puede analizarla ni generar informes sobre ella.

## Distribuciones Linux

Las siguientes distribuciones Linux son compatibles con los análisis de hosts y contenedores:

| Sistema operativo         | Versiones compatibles                                  | Gestores de paquetes | Avisos de seguridad                                                                                       |
|--------------------------|-----------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge no compatible)           | apk              | [https://secdb.alpinelinux.org/][1]                                                                       |
| Wolfi Linux              | N/A                                                 | apk              | [https://packages.wolfi.dev/os/security.json][2]                                                          |
| Chainguard               | N/A                                                 | apk              | [https://packages.cgr.dev/chainguard/security.json][3]                                                    |
| Red Hat Enterprise Linux | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] y [https://www.redhat.com/security/data/oval/v2/][5] |
| CentOS                   | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] y [https://www.redhat.com/security/data/oval/v2/][5] |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm      | [https://errata.almalinux.org/][6]                                                                        |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm      | [https://download.rockylinux.org/pub/rocky/][7]                                                           |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm      | [https://linux.oracle.com/security/oval/][8]                                                              |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm      | [https://github.com/microsoft/CBL-MarinerVulnerabilityData/][9]                                           |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm      | [https://alas.aws.amazon.com/][10]                                                                        |
| openSUSE Leap            | 42, 15                                              | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| SUSE Linux Enterprise    | 11, 12, 15                                          | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tdnf/yum/rpm     | [https://packages.vmware.com/photon/photon_cve_metadata/][12]                                             |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid no es compatible) | apt/dpkg         | [https://security-tracker.debian.org/tracker/][13] y [https://www.debian.org/security/oval/][14]        |
| Ubuntu                   | Todas las versiones compatibles con Canonical                 | apt/dpkg         | [https://ubuntu.com/security/cve][15]                                                                     |

## Bibliotecas de aplicaciones

Los siguientes lenguajes de aplicación y bibliotecas son compatibles con los análisis de vulnerabilidades en imágenes de contenedores, funciones de Lambda y contenedores que se ejecutan en hosts:

| Lenguaje | Gestor de paquetes compatible | Archivos compatibles                                                      |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby     | agrupador                   | Gemfile.lock, gemspec                                                |
| .NET     | nuget                     | packages.lock.json, packages.config, .deps.json, *packages.props     |
| Go       | mod                       | Binarios creados por Go, go.mod                                         |
| Java     | Gradle, Maven             | pom.xml, *gradle.lockfile, JAR/WAR/PAR/EAR (con pom.properties)     |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           |
| PHP      | composer                  | composer.lock                                                        |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, egg package, wheel package, conda package |

## Registros de imágenes de contenedores

Los siguientes registros de imágenes de contenedores son compatibles con los análisis de imágenes de contenedores:

| Registro                        | Nivel de compatibilidad | Notas                                                                                                                                                                          |
|---------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon ECR (público y privado) | GA            | Escanea imágenes de contenedores en ejecución **y** las últimas 1000 imágenes push en reposo (por fecha). Este es el único registro compatible con el escaneo en reposo                                 |
| Google Artifact Registry (GAR)  | GA            | Escanea imágenes vinculadas a cargas de trabajo en ejecución (Cloud Run, GKE) únicamente<br />**Nota**: Para solicitar el escaneo del registro en reposo, ponte en contacto con el [soporte de Datadog][16]                                |
| Azure Container Registry (ACR)  | GA            | Analiza imágenes de contenedores en ejecución de Azure Container Apps y Azure Container Instances únicamente<br />**Nota**: Para solicitar el escaneo del registro en reposo, ponte en contacto con el [soporte de Datadog][16] |

**Nota**: El análisis de imágenes de contenedores del registro solo es compatible si instalaste Agentless con:
  - Integraciones de CloudFormation >= v2.0.8
  - Módulo Terraform Agentless >= v0.11.7

## Tiempos de ejecución de contenedores

Se admiten los siguientes tiempos de ejecución de contenedores:

- containerd: v1.5.6 o posterior
- Docker

**Nota para observaciones de contenedores**: Agentless Scanning requiere capas de imágenes de contenedor sin comprimir. Como solución alternativa, puedes definir la opción de configuración `discard_unpacked_layers=false` en el archivo de configuración containerd.

[1]: https://secdb.alpinelinux.org/
[2]: https://packages.wolfi.dev/os/security.json
[3]: https://packages.cgr.dev/chainguard/security.json
[4]: https://www.redhat.com/security/data/metrics/
[5]: https://www.redhat.com/security/data/oval/v2/
[6]: https://errata.almalinux.org/
[7]: https://download.rockylinux.org/pub/rocky/
[8]: https://linux.oracle.com/security/oval/
[9]: https://github.com/microsoft/CBL-MarinerVulnerabilityData/
[10]: https://alas.aws.amazon.com/
[11]: http://ftp.suse.com/pub/projects/security/cvrf/
[12]: https://packages.vmware.com/photon/photon_cve_metadata/
[13]: https://security-tracker.debian.org/tracker/
[14]: https://www.debian.org/security/oval/
[15]: https://ubuntu.com/security/cve
[16]: /es/help
[17]: /es/security/cloud_security_management/setup/agentless_scanning/update