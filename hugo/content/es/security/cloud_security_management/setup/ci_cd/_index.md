---
disable_toc: false
further_reading:
- link: /security/cloud_security_management/vulnerabilities
  tag: Documentación
  text: Cloud Security Vulnerabilities
- link: /infrastructure/containers/container_images
  tag: Documentación
  text: Visualización de Container Images
- link: /security/cloud_security_management/setup/agent
  tag: Documentación
  text: Configuración del Datadog Agent para Cloud Security
title: Escaneo de imágenes de contenedor en CI/CD
---
## Descripción general {#overview}

Cloud Security le permite escanear imágenes de contenedor en busca de vulnerabilidades durante CI/CD, antes de que las imágenes se implementen en producción. Al integrar el escaneo de vulnerabilidades directamente en sus pipelines, puede detectar y remediar problemas de seguridad al principio del ciclo de vida de desarrollo.

Para admitir el escaneo de imágenes de contenedor basado en CI/CD, Datadog proporciona la **CLI de Datadog Security**. La CLI está diseñada para ejecutarse directamente dentro de sus trabajos de CI, brindándole control total sobre cuándo y cómo se ejecutan los escaneos como parte de sus pipelines.

**Nota**: Para la gestión de vulnerabilidades en entornos de producción, consulte [Cloud Security Vulnerabilities][1].

## Comience {#get-started}

Para comenzar con el escaneo de imágenes de contenedor en CI/CD:

1. [Configure las credenciales de Datadog](#configure-datadog-credentials)
2. [Instale la CLI de Datadog Security](#install-the-datadog-security-cli) en su pipeline de CI/CD
3. [Visualice los resultados del escaneo](#view-scan-results) en la página de [Cloud Security Vulnerabilities][3]
4. Opcionalmente, [ejecute escaneos locales durante el desarrollo](#run-local-scans-during-development) para una iteración más rápida

### Configure las credenciales de Datadog {#configure-datadog-credentials}

Para cargar los resultados del escaneo a Datadog, configure las siguientes variables de entorno en su pipeline de CI:

| Nombre         | Descripción                                                                                                                | Requerido | Predeterminado         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Su clave de Datadog API. Esta clave es creada por su [organización de Datadog][4] y debe almacenarse como un secreto.            | Sí      |                 |
| `DD_APP_KEY` | Su clave de aplicación de Datadog. Esta clave, creada por su [organización de Datadog][5], debe incluir el contexto `appsec_vm_read` y almacenarse como un secreto.    | Sí      |                 |
| `DD_SITE`    | El [sitio de Datadog][6] al que se enviará la información. Su sitio de Datadog es {{< region-param key="dd_site" code="true" >}}.       | No       | `datadoghq.com` |

<div class="alert alert-info">
Almacene sus claves de API y de aplicación como secretos en su plataforma de CI/CD para proteger las credenciales confidenciales.
</div>


### Instalar la CLI de Datadog Security {#install-the-datadog-security-cli}

La CLI de Datadog Security está disponible para instalar desde los repositorios de paquetes de Datadog. Puede instalar la CLI de Datadog Security en sistemas Debian/Ubuntu, Red Hat/CentOS y macOS. El escaneo de imágenes de contenedor funciona con todas las principales plataformas de CI/CD, incluyendo:
- GitHub Actions
- GitLab CI/CD
- Azure DevOps
- Otros proveedores de CI que puedan ejecutar scripts de shell

El enfoque de script personalizable le brinda control total sobre cuándo y cómo se ejecutan los escaneos en sus pipelines. Elija su método de instalación a continuación.


{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

#### Instalar desde el repositorio de paquetes {#install-from-package-repository}

```bash
# Import Datadog APT signing key
DD_APT_KEY_URL="https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public"
curl -fsSL "$DD_APT_KEY_URL" | sudo gpg --dearmor -o /usr/share/keyrings/datadog-archive-keyring.gpg

# Add Datadog repository
echo "deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable datadog-security-cli" \
| sudo tee /etc/apt/sources.list.d/datadog-security-cli.list

# Update package list and install
sudo apt update
sudo apt install datadog-security-cli
```

{{% /tab %}}
{{% tab "Red Hat/CentOS" %}}

#### Instalar desde el repositorio de paquetes {#install-from-package-repository-1}

```bash
# Import Datadog RPM signing key
sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public

# Add Datadog repository
sudo tee /etc/yum.repos.d/datadog-security-cli.repo > /dev/null <<'EOF'
[datadog-security-cli]
name=Datadog Security CLI
baseurl=https://yum.datadoghq.com/stable/datadog-security-cli/$basearch/
enabled=1
gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
repo_gpgcheck=1
EOF

# Install the CLI
sudo yum install datadog-security-cli
```

{{% /tab %}}
{{% tab "macOS" %}}

#### Instalar con Homebrew {#install-with-homebrew}

```bash
# Install via Homebrew
brew install --cask datadog-security-cli
```

{{% /tab %}}
{{< /tabs >}}

#### Ejecute su primer escaneo {#run-your-first-scan}

Después de instalar la CLI de Datadog Security, configure sus credenciales de Datadog y escanee una imagen de contenedor:

```bash
# Configure Datadog credentials
export DD_API_KEY=<your_api_key>
export DD_APP_KEY=<your_app_key>
export DD_SITE={{< region-param key="dd_site" >}}

# Scan your container image
datadog-security-cli image myimage:tag
```

La CLI muestra los resultados del escaneo directamente en su terminal, mostrando:
- Información de la imagen (nombre, digest, sistema operativo)
- Número total de vulnerabilidades encontradas
- Desglose de gravedad (Crítica, Alta, Media, Baja)
- Tabla detallada de vulnerabilidades con IDs de CVE, paquetes afectados y correcciones disponibles

{{< img src="security/vulnerabilities/csm-vm-cli-output.png" alt="Salida de la CLI de Datadog Security que muestra los resultados del escaneo de vulnerabilidades para una imagen de contenedor" style="width:100%;" >}}

### Visualizar resultados del escaneo {#view-scan-results}

Después de ejecutar su primer escaneo, los resultados aparecen en la página de [Cloud Security Vulnerabilities][3] en cuestión de minutos. Usted puede:

- **Filtrar por tipo de recurso**: Visualizar vulnerabilidades específicas de imágenes de contenedor escaneadas en CI/CD
- **Priorizar por gravedad**: Enfóquese primero en las vulnerabilidades críticas y de alta gravedad
- **Seguimiento de la corrección**: Asigne vulnerabilidades a los miembros del equipo y realice un seguimiento de la resolución
- **Configurar notificaciones**: Reciba alertas cuando se detecten nuevas vulnerabilidades críticas

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="La página de hallazgos de Cloud Security Vulnerabilities" width="100%">}}

### Ejecutar escaneos locales durante el desarrollo {#run-local-scans-during-development}

Para una iteración más rápida antes de hacer commit en CI, instale la CLI de Datadog Security localmente utilizando los mismos métodos de instalación descritos en la [sección de instalación](#install-the-datadog-security-cli) anterior.

#### Escanear localmente sin persistir los resultados {#scan-locally-without-persisting-results}

Al realizar pruebas localmente, escanee las imágenes sin cargar los resultados a Datadog utilizando el indicador `--no-persist`:

```bash
# Scan locally without sending results to Datadog
datadog-security-cli image myapp:latest --no-persist
```

Esto es útil para:
- Probar la funcionalidad de la CLI sin afectar sus datos de Datadog
- Validar imágenes de contenedor durante el desarrollo local
- Iterar rápidamente en las compilaciones de imágenes antes de hacer commit en CI

## Opciones de escaneo {#scan-options}

La CLI de Datadog Security admite varias opciones para personalizar los escaneos de imágenes de contenedor:

### Configurar umbrales de gravedad {#configure-severity-thresholds}

```bash
# Fail the build if critical vulnerabilities are found
datadog-security-cli image myapp:latest --fail-on critical

# Fail on high or critical vulnerabilities
datadog-security-cli image myapp:latest --fail-on high
```

### Formatos de salida {#output-formats}

```bash
# Output results in JSON format
datadog-security-cli image myapp:latest --output json
```

## Vincular Dockerfile a vulnerabilidades {#link-dockerfile-to-vulnerabilities}

<div class="alert alert-info">
Vincular un Dockerfile a vulnerabilidades solo es compatible cuando se escanea con la CLI de Datadog Security en CI/CD. Esta función no está disponible para imágenes escaneadas por el Datadog Agent o mediante escaneo sin agente.
</div>

Para permitir que Datadog vincule las vulnerabilidades detectadas con el código fuente (Dockerfile), debe incluir **anotaciones de imagen OCI** específicas al compilar su imagen de contenedor.

Esto permite a Datadog:
- Mostrar una **vista previa del Dockerfile** directamente en el panel de Vulnerabilidades de imágenes de contenedor
- Habilitar **remediación basada en la fuente**, lo que le ayuda a identificar y solucionar problemas en contexto

Estas anotaciones proporcionan los metadatos necesarios para asociar una imagen escaneada con su repositorio, confirmación (commit) y ruta de Dockerfile correspondientes.

### Anotaciones requeridas {#required-annotations}

Agregue las siguientes anotaciones a su imagen al momento de la compilación:

- `org.opencontainers.image.source`
  La URL del repositorio (por ejemplo, `https://github.com/org/repo`)

- `org.opencontainers.image.revision`
  El SHA de confirmación (commit) utilizado para compilar la imagen

- `com.datadoghq.image.source_path`
  La ruta al Dockerfile dentro del repositorio (por ejemplo, `Dockerfile` o `docker/Dockerfile`)

### Anotaciones opcionales {#optional-annotations}

Estas anotaciones ayudan a Datadog a mejorar las sugerencias de corrección de imágenes base:

- `org.opencontainers.image.base.name`
  El nombre de la imagen base (por ejemplo, `ubuntu:22.04`)

- `org.opencontainers.image.base.digest`
  El digest de la imagen base

Para obtener más detalles, consulte la [documentación de anotaciones de la especificación de imagen OCI][14].

### Ejemplo {#example}

#### Uso de docker build {#using-docker-build}

Las anotaciones son el método preferido. Las etiquetas también son compatibles como alternativa.

```bash
docker build \
  --annotation org.opencontainers.image.source="https://github.com/org/repo" \
  --annotation org.opencontainers.image.revision="$(git rev-parse HEAD)" \
  --annotation com.datadoghq.image.source_path="Dockerfile" \
  -t myapp:latest .
```

#### Uso de la CLI de Datadog Security {#using-the-datadog-security-cli}

Como alternativa a agregar anotaciones manualmente, la CLI de Datadog Security puede inyectar los metadatos requeridos directamente al escanear, usando el indicador `--dockerfile`:

```bash
datadog-security-cli image myapp:latest --dockerfile ./Dockerfile
```

## Solución de problemas {#troubleshooting}

### Errores de autenticación {#authentication-errors}

Si encuentra errores de autenticación:
1. Verifique que su `DD_API_KEY` y `DD_APP_KEY` estén configurados correctamente.
2. Asegúrese de que la clave de aplicación tenga el contexto `appsec_vm_read`.
3. Compruebe que su `DD_SITE` coincida con el sitio de su organización de Datadog.

### Errores de imagen no encontrada {#image-not-found-errors}

Si la CLI no puede encontrar su imagen:
1. Verifique que la imagen exista localmente: `docker images`.
2. Use el nombre completo de la imagen, incluido el registro (si corresponde).
3. Asegúrese de que la imagen esté compilada antes de escanear.

### Problemas de conectividad de red {#network-connectivity-issues}

Si los escaneos fallan debido a problemas de red:
1. Verifique que su entorno de CI pueda acceder al sitio de Datadog.
2. Verifique si existen restricciones de proxy o firewall.
3. Asegúrese de que las conexiones HTTPS salientes estén permitidas.

Para obtener ayuda adicional, consulte la [guía de solución de problemas de Cloud Security][12] o comuníquese con el [soporte de Datadog][13].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/vulnerabilities
[2]: /es/security/code_security/software_composition_analysis/
[3]: https://app.datadoghq.com/security/csm/vm
[4]: /es/account_management/api-app-keys/#api-keys
[5]: /es/account_management/api-app-keys/#application-keys
[6]: /es/getting_started/site/
[7]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /es/integrations/guide/source-code-integration
[9]: /es/security/code_security/dev_tool_int/github_pull_requests
[10]: /es/integrations/gitlab-source-code/#setup
[11]: /es/integrations/azure-devops-source-code/#setup
[12]: /es/security/cloud_security_management/troubleshooting/vulnerabilities/
[13]: /es/help/
[14]: https://specs.opencontainers.org/image-spec/annotations/