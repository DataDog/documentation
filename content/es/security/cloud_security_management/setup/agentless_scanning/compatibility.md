---
aliases:
- /es/security/cloud_security_management/agentless_scanning/compatibility
title: Compatibilidad con el análisis Agentless
---

## Disponibilidad

Agentless Scanning es compatible con AWS, Azure y GCP. Oracle Cloud Infrastructure (OCI) aún no es compatible.

Esta función está disponible en todos los centros de datos comerciales de Datadog. GovCloud no es compatible.

La siguiente tabla proporciona un resumen de las tecnologías de análisis Agentless con respecto a sus componentes correspondientes para cada proveedor de nube compatible:

| Componente                                       | AWS                                                                                                                                       | Azure                                                                                                                                                                             | GCP                                                                                                                                                                             |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sistema operativo | Linux; Windows Server 2016, 2019, 2022; Windows 10 o posterior. | Linux; Windows Server 2016, 2019, 2022; Windows 10 o posterior. | Linux; Windows Server 2016, 2019, 2022; Windows 10 o posterior. |
| Sistema de archivos del host                                 | Btrfs, Ext2, Ext3, Ext4, xfs                                                                                                              | Btrfs, Ext2, Ext3, Ext4, xfs                                                                                                                                                      | Btrfs, Ext2, Ext3, Ext4, xfs                                                                                                                                                    |
| Gestor de paquetes                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                                                    | Deb (Debian, Ubuntu) <br> RPM (Fedora, RedHat, CentOS) <br> APK (Alpine)                                                                                                          | Deb (Debian, Ubuntu) <br> RPM (Fedora, RedHat, CentOS) <br> APK (Alpine)                                                                                                       |
| Cifrado                                      | AWS </br> Sin cifrar </br> Cifrado - Clave gestionada por la plataforma (PMK) y Clave gestionada por el cliente (CMK)                                         | Cifrado - Clave gestionada por la plataforma (PMK): Cifrado del lado del servidor Azure Disk Storage, Cifrado en host </br> **Nota**: Cifrado - Clave gestionada por el cliente (CMK) **no** es compatible. | Cifrado, Clave gestionada por plataforma (PMK): cifrado de disco persistente, VM confidencial </br> **Nota**: Cifrado, Clave de cifrado gestionada por el cliente (CMEK) y Claves de cifrado suministradas por el cliente (CSEK) **no** son compatibles. |
| Tiempo de ejecución del contenedor                               | Docker, en contenedor </br> **Nota**: CRI-O **no** es compatible                                                                             | Docker, en contenedor </br> **Nota**: CRI-O **no** es compatible                                                                                                                     | Docker, en contenedor </br> **Nota**: CRI-O **no** es compatible                                                                                                                   |
| Serverless                                      | AWS Lambda <br> AWS Fargate para ECS                                                                                                              | Para solicitar esta función, ponte en contacto con el [servicio de asistencia de Datadog][16]                                                                                                                                                         | Cloud Run (tipo de despliegue de contenedores)                                                                                                                                           |
| Lenguajes de aplicación (en hosts y contenedores) | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                       | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                               | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                            |
| Registros de contenedores                            | Amazon ECR (público y privado) | | Google Artifact Registry |

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

- Amazon ECR público
- Amazon ECR privado

**Nota**: El análisis de imágenes de contenedores del registro solo es compatible si instalaste Agentless con:
  - Integraciones de Cloudformation >= v2.0.8
  - Módulo Terraform Agentless >= v0.11.7

## Tiempos de ejecución de contenedores

Se admiten los siguientes tiempos de ejecución de contenedores:

- containerd: v1.5.6 o posterior
- Docker

**Nota para observaciones de contenedores**: El análisis Agentless requiere capas de imágenes de contenedor sin comprimir. Como solución alternativa, puedes definir la opción de configuración `discard_unpacked_layers=false` en el archivo de configuración containerd.

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