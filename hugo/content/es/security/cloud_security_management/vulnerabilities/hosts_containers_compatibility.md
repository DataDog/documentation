---
title: Compatibilidad de servidores y Containers con Cloud Security Vulnerabilities
---
## Sistemas operativos {#operating-systems}

Cloud Security Vulnerabilities admite el escaneo de vulnerabilidades para servidores y Containers que ejecutan las siguientes versiones de sistemas operativos:

| Sistema operativo         | Versiones compatibles                                  | Administradores de paquetes / Fuente | Compatibilidad con Agentless | Compatibilidad con Agent     | Compatibilidad con CLI       |
|--------------------------|-----------------------------------------------------|---------------------------|-------------------|-------------------|-------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge no es compatible)           | apk                       | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Wolfi Linux              | N/A                                                 | apk                       | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Chainguard               | N/A                                                 | apk                       | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Red Hat Enterprise Linux | 6, 7, 8, 9                                          | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| CentOS                   | 6, 7, 8                                             | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| openSUSE Leap            | 42, 15                                              | zypper/rpm                | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| SUSE Enterprise Linux    | 11, 12, 15                                          | zypper/rpm                | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tndf/yum/rpm              | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid no es compatible) | apt/dpkg                  | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Ubuntu                   | Todas las versiones compatibles con Canonical       | apt/dpkg                  | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Windows                  | Windows Server 2016/2019/2022, Windows 10 y versiones posteriores | SO Windows                | {{< X >}}         | {{< X >}}         |                   |

<div class="alert alert-info">
Datadog admite paquetes de SO oficiales de los proveedores enumerados anteriormente. No se admiten paquetes de terceros o compilados por el usuario.
</div>

{{% collapse-content title="Paquetes del kernel de Linux en imágenes de contenedor" level="h3" %}}

Datadog no informa vulnerabilidades para los paquetes de encabezado y desarrollo del kernel enumerados a continuación en imágenes de contenedor. Los contenedores utilizan el kernel del servidor, por lo que estos paquetes no pueden introducir vulnerabilidades del kernel en un contenedor en ejecución. Esto se aplica a las imágenes escaneadas con el Agent, mediante el escaneo Agentless o con la CLI. La propia salida de la CLI y la comprobación `--fail-on` aún pueden incluir estos paquetes. Estos paquetes siguen apareciendo en la Lista de materiales de software (SBOM) de la imagen.

**No se informan en imágenes de contenedor:** paquetes de encabezado y desarrollo compilados a partir de la fuente principal del kernel de Linux:
- En Debian y Ubuntu: `linux-libc-dev`, `linux-kbuild-*` y `linux-headers-*` para el kernel estándar y sus variantes HWE, AWS, GCP, Azure y Oracle.
- En distribuciones basadas en RPM como RHEL, Amazon Linux y SUSE: `kernel-headers`, `kernel-devel` y `kernel-syms`.

**Aún se informan:**
- Vulnerabilidades del kernel en servidores, donde se ejecuta el kernel.
- Todos los paquetes en una imagen de contenedor que también contiene un paquete de kernel, como `linux-image-*`, `linux-modules-*` o `kernel-core`.
- Todos los paquetes en una imagen de contenedor que también contiene cualquier otro paquete compilado a partir de la fuente principal del kernel que Datadog no reconozca como un paquete de encabezado o desarrollo.
- Paquetes con nombres similares que no forman parte del kernel, como `linux-firmware`, `linux-pam` y `util-linux`.
{{% /collapse-content %}}

{{% collapse-content title="Limitaciones de Windows" level="h3" %}}
- Datadog detecta vulnerabilidades en Windows identificando la versión de Windows y las actualizaciones de la base de conocimientos (KB) de seguridad instaladas para abordar las vulnerabilidades asociadas con esa versión. Sin embargo, algunas actualizaciones de KB son acumulativas y contienen otras actualizaciones de KB, lo que podría causar que Datadog identifique erróneamente qué actualizaciones se han instalado.
- Datadog no puede rastrear las correcciones de vulnerabilidades que Windows aplica fuera de las actualizaciones de KB.
- Datadog no puede rastrear las vulnerabilidades asociadas con software de terceros.
{{% /collapse-content %}}

## Bibliotecas de aplicaciones {#application-libraries}

Cloud Security Vulnerabilities admite el escaneo de vulnerabilidades para los siguientes lenguajes de programación y bibliotecas de aplicaciones en contenedores e instancias Lambda:

| Lenguaje | Administrador de paquetes compatible | Archivos compatibles                                                      | Compatibilidad con Agentless | Compatibilidad con Agent     | Compatibilidad con CLI       |
|----------|---------------------------|----------------------------------------------------------------------|-------------------|-------------------|-------------------|
| Ruby     | bundler                   | Gemfile.lock, gemspec                                                | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| .NET     | nuget                     | packages.lock.json, packages.config, .deps.json, *packages.props     | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Go       | mod                       | Binarios compilados con Go, go.mod                                         | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Java     | Gradle, Maven             | pom.xml, *gradle.lockfile, JAR/WAR/PAR/EAR (con pom.properties)     | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| PHP      | composer                  | composer.lock                                                        | {{< X >}}         | {{< X >}}         | {{< X >}}         |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, paquete egg, paquete wheel, paquete conda | {{< X >}}         | {{< X >}}         | {{< X >}}         |

**Nota**: La gestión de vulnerabilidades basada en Agent en bibliotecas de aplicaciones está disponible en las versiones [7.64 o posteriores][2] del Agent.


[1]: /es/security/code_security/software_composition_analysis/
[2]: https://github.com/DataDog/datadog-agent/releases