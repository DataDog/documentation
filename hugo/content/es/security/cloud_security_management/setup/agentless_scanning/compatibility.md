---
aliases:
- /es/security/cloud_security_management/agentless_scanning/compatibility
title: Compatibilidad con Agentless Scanning
---
## Disponibilidad {#availability}

El escaneo sin agente es compatible con AWS, Azure y GCP.

La siguiente tabla proporciona un resumen de las tecnologías de escaneo sin agente en relación con sus componentes correspondientes para cada proveedor de nube compatible:

| Componente | AWS | Azure | GCP |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sistema operativo | Linux; Windows Server 2016 o posterior; Windows 10 o posterior | Linux; Windows Server 2016 o posterior; Windows 10 o posterior | Linux; Windows Server 2016 o posterior; Windows 10 o posterior |
| Sistema de archivos del servidor | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS |
| Administrador de paquetes | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine) | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine) | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine) |
| Cifrado | AWS </br> Sin cifrar </br> Cifrado - Clave administrada por la plataforma (PMK) y clave administrada por el cliente (CMK) | Cifrado - Clave administrada por la plataforma (PMK): Cifrado del almacenamiento de disco de Azure en el lado del servidor, cifrado en el servidor </br> **Nota**: Cifrado - Clave administrada por el cliente (CMK) **no** es compatible | Cifrado - Clave administrada por la plataforma (PMK): Cifrado de disco persistente, VM confidencial </br> **Nota**: Cifrado - Clave de cifrado administrada por el cliente (CMEK) y claves de cifrado proporcionadas por el cliente (CSEK) **no** son compatibles |
| Tiempo de ejecución de Container| Docker, containerd </br> **Nota**: CRI-O **no** es compatible | Docker, containerd </br> **Nota**: CRI-O **no** es compatible | Docker, containerd </br> **Nota**: CRI-O **no** es compatible |
| Serverless | AWS Lambda <br> AWS Fargate para ECS | Azure Functions ([Vista previa][20]), Azure Container Apps, Azure Container Instances<br />**Nota**: Requiere el agentless scanner más reciente. Consulte [Actualizar Agentless Scanning][17].                                     | Cloud Run ([Vista previa][21]) |
| Kubernetes | EKS en nodos EC2 </br> EKS en Fargate </br> **Nota**: EKS en Fargate requiere que se instale el [Datadog Cluster Agent][18] | AKS en VMs, conjuntos de escalado de máquinas virtuales (VMSS) y Azure Container Instances (ACI) </br> **Nota**: AKS en ACI requiere que se instale el [Datadog Cluster Agent][18] | GKE Standard y GKE Autopilot </br> **Nota**: GKE Autopilot requiere que se instale el [Datadog Cluster Agent][18] |
| Lenguajes de aplicación (en servidores y contenedores) | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda |
| Registros de contenedores | Amazon ECR (público y privado): analiza imágenes de contenedores en ejecución y las últimas 1,000 imágenes cargadas en reposo | ACR: analiza solo imágenes de contenedores en ejecución <br />**Nota:** El escaneo de registros en reposo no es compatible. Para solicitarlo, contacte al [Soporte de Datadog][16] | Google Artifact Registry: analiza imágenes solo de cargas de trabajo en ejecución <br />**Nota**: El soporte para escaneo en reposo de Google Artifact Registry está en [Vista previa][19] |
| Imágenes del servidor | AMI | No compatible | No compatible |
| Datos sensibles (SDS) | S3 | No compatible | No compatible |

**Nota**: Las AMI deben almacenarse en una cuenta que utilice la integración de AWS de Datadog. De lo contrario, Datadog no puede leer la instantánea de Amazon Elastic Block Store (EBS) subyacente de la AMI, por lo que no puede escanear ni informar sobre la AMI.

## Distribuciones de Linux {#linux-distributions}

Las siguientes distribuciones de Linux son compatibles para escaneos de servidores y contenedores:

| Sistema operativo         | Versiones compatibles                                  | Gestores de paquetes | Avisos de seguridad                                                                                       |
|--------------------------|-----------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge no es compatible)           | apk              | [https://secdb.alpinelinux.org/][1]                                                                       |
| Wolfi Linux              | N/D                                                 | apk              | [https://packages.wolfi.dev/os/security.json][2]                                                          |
| Chainguard               | N/D                                                 | apk              | [https://packages.cgr.dev/chainguard/security.json][3]                                                    |
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
| Ubuntu                   | Todas las versiones admitidas por Canonical                 | apt/dpkg         | [https://ubuntu.com/security/cve][15]                                                                     |

## Bibliotecas de aplicaciones {#application-libraries}

Los siguientes lenguajes y bibliotecas de aplicaciones son compatibles para escaneos de vulnerabilidades en imágenes de contenedores, funciones Lambda y contenedores que se ejecutan en hosts:

| Lenguaje | Gestor de paquetes compatible | Archivos compatibles                                                      |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby     | bundler                   | Gemfile.lock, gemspec                                                |
| .NET     | nuget                     | packages.lock.json, packages.config, .deps.json, *packages.props     |
| Go       | mod                       | Binarios compilados por Go, go.mod                                         |
| Java     | Gradle, Maven             | pom.xml, *gradle.lockfile, JAR/WAR/PAR/EAR (con pom.properties)     |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           |
| PHP      | composer                  | composer.lock                                                        |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, paquete egg, paquete wheel, paquete conda |

## Registros de imágenes de contenedor {#container-image-registries}

Los siguientes registros de imágenes de contenedores son compatibles para escaneos de imágenes de contenedores:

| Registro                        | Nivel de soporte | Notas                                                                                                                                                                                                                                         |
|---------------------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon ECR (público y privado) | GA            | Escanea imágenes de contenedor en ejecución **y** las últimas 1,000 imágenes enviadas en reposo (por fecha). Este es el único registro con soporte de escaneo en reposo<br />**Nota:** Para aumentar el número de imágenes en reposo a escanear, contacte a [Datadog Support][16] |
| Google Artifact Registry (GAR)  | Preview       | Escanea solo imágenes vinculadas a cargas de trabajo en ejecución (Cloud Run, GKE)<br />**Nota**: El soporte de escaneo en reposo de Google Artifact Registry está en [Preview][19]                                                                                             |
| Azure Container Registry (ACR)  | GA            | Escanea solo imágenes de contenedor en ejecución de Azure Container Apps y Azure Container Instances<br />**Nota**: El escaneo de registro en reposo no es compatible. Para solicitarlo, contacte a [Datadog Support][16]                                                                |

**Nota**: El escaneo de imágenes de contenedor desde el registro solo es compatible si ha instalado Agentless con:
  - CloudFormation Integrations >= v2.0.8
  - Módulo Agentless de Terraform >= v0.11.7

## Entornos de ejecución de contenedores {#container-runtimes}

Se admiten los siguientes entornos de ejecución de contenedores:

- containerd: v1.5.6 o posterior
- Docker

**Nota para observaciones de contenedor**: El escaneo Agentless requiere capas de imagen de contenedor sin comprimir. Como solución alternativa, puede establecer la opción de configuración `discard_unpacked_layers=false` en el archivo de configuración de containerd.

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
[18]: /es/containers/cluster_agent/setup/
[19]: https://www.datadoghq.com/product-preview/google-artifact-registry-at-rest-scanning/
[20]: https://www.datadoghq.com/product-preview/azure-functions-vulnerability-scanning/
[21]: https://www.datadoghq.com/product-preview/google-cloud-run-functions-vulnerability-scanning/