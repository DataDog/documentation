---
aliases:
- /es/security/cloud_security_management/setup/csm_cloud_workload_security/agent/linux
- /es/security/cloud_security_management/setup/csm_pro/agent/linux/
- /es/security/cloud_security_management/setup/csm_enterprise/agent/linux/
code_lang: linux
code_lang_weight: 80
title: Configuración de Cloud Security en Linux
type: multi-code-lang
---
Utilice las siguientes instrucciones para habilitar Misconfigurations y Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}


## Requisitos previos {#prerequisites}

- Datadog Agent versión `7.46` o posterior.

## Instalación {#installation}

Para una implementación basada en paquetes, [instale el paquete de Datadog][6] con su administrador de paquetes y, a continuación, actualice los archivos listados a continuación.

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true

# Vulnerabilities are evaluated and scanned against your containers and hosts every hour.
sbom:
  enabled: true
  # Set to true to enable Container Vulnerability Management
  container_image:
    enabled: true
    # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
    analyzers: ["os", "languages"]
  # Set to true to enable Host Vulnerability Management
  host:
    enabled: true
    # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
    analyzers: ["os", "languages"]
  # Enables runtime package prioritization (Preview, Agent 7.79+)
  # See Runtime Package Prioritization section below.
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

**Nota**: `enrichment.usage.enabled: true` requiere Datadog Agent **7.79.0 o posterior**. Consulte la sección [Runtime Package Prioritization](#runtime-package-prioritization-preview) para conocer los requisitos.

{{< code-block lang="bash" filename="/etc/datadog-agent/security-agent.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true
{{< /code-block >}}

**Nota**: El analizador `languages` requiere Datadog Agent **7.70 o posterior**. Cuando está habilitado, detecta vulnerabilidades en bibliotecas de aplicaciones administradas por administradores de paquetes como npm, pip, Maven/Gradle, NuGet, módulos de Go, Cargo y Bundler, además de paquetes del SO. Cuando se omite el campo `analyzers`, solo se escanean los paquetes del SO para las imágenes de contenedor. Consulte [Administradores de paquetes de bibliotecas de aplicaciones compatibles](#supported-application-library-package-managers) para ver la lista completa.

### Administradores de paquetes de bibliotecas de aplicaciones compatibles {#supported-application-library-package-managers}

El analizador `languages` cubre los siguientes ecosistemas de paquetes:

| Ecosistema | Administrador de paquetes / formato |
|-----------|--------------------------|
| Ruby | Bundler, GemSpec |
| Rust | Cargo, binario de Rust |
| PHP | Composer |
| Java | Jar, Maven (pom.xml), lock de Gradle, lock de Sbt |
| JavaScript | npm (package-lock.json), Yarn, pnpm, paquete de Node |
| .NET | NuGet, .NET Core, PackagesProps |
| Python | Paquete de Python (egg), pip, Pipenv, Poetry, uv, paquete de Conda, entorno de Conda |
| Go | Binario de Go, módulos de Go |
| C/C++ | lock de Conan |
| Swift / Objective-C | CocoaPods, Swift |
| Dart | lock de PubSpec |
| Elixir | lock de Mix |
| Julia | Julia |

## Runtime Package Prioritization (Preview) {#runtime-package-prioritization-preview}

Runtime Package Prioritization identifica qué paquetes en una imagen de contenedor se utilizan durante la ejecución, para que pueda priorizar las vulnerabilidades en el código que se ejecuta sobre las vulnerabilidades en paquetes que están instalados pero nunca se ejecutan.

Cuando se habilita, el Agent utiliza eBPF para observar el acceso a archivos en sus cargas de trabajo y añade estas señales a los hallazgos de vulnerabilidades para esa imagen:

| Señal | Qué le indica |
|--------|-------------------|
| El paquete se está ejecutando | Se observó que los archivos del paquete fueron accedidos por un proceso en ejecución. |
| Accedido por proceso raíz | El paquete fue accedido por un proceso que se ejecuta como root (UID 0). |
| Binario SUID presente | El paquete contiene un binario con el bit SUID establecido, lo cual puede permitir la escalada de privilegios. |

*El paquete se está ejecutando* alimenta la dimensión de **Reachability** del [Runtime Prioritization Engine][8]. Para consultar estas señales directamente, consulte [Filtrar hallazgos por señales de tiempo de ejecución][9].

**Requisitos**:
- Datadog Agent **7.79.0 o posterior**.
- Solo Linux (dependencia de eBPF). Consulte la [Workload Protection setup][10] para conocer las distribuciones y versiones de kernel compatibles.

Las señales de tiempo de ejecución se aplican a los paquetes instalados por un administrador de paquetes del sistema operativo (`apt`, `yum` o `apk`) en los hallazgos de vulnerabilidades de imágenes de contenedor.

Agregue el bloque `enrichment` a la sección `sbom` de su archivo `datadog.yaml`:

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
sbom:
  enabled: true
  container_image:
    enabled: true
  # Enables runtime package prioritization (Preview, Agent 7.79+)
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

Reinicie el Agent después de aplicar los cambios.

Para verificar la configuración, filtre los hallazgos de vulnerabilidades por [señales de tiempo de ejecución][9].

**Notas**:

- También puede usar el siguiente [Agent install script][5] para habilitar automáticamente Misconfigurations y Threat Detection:

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- Si usa el script de instalación del Agent para habilitar Misconfigurations and Vulnerability Management, debe actualizar manualmente el archivo `datadog.yaml` para habilitar `host_benchmarks` para Misconfigurations, y `sbom` y `container_image` para Vulnerability Management.

```shell
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/security-agent.yaml
```

[1]: /es/security/cloud_security_management/misconfigurations/
[2]: /es/security/threats
[3]: /es/security/cloud_security_management/vulnerabilities
[4]: /es/security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /es/getting_started/agent/#installation
[6]: /es/agent/?tab=Linux
[7]: /es/security/workload_protection/
[8]: /es/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[9]: /es/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[10]: /es/security/workload_protection/setup/