---
aliases:
- /es/security/cloud_security_management/setup/csm_cloud_workload_security/agent/kubernetes/
- /es/security/cloud_security_management/setup/csm_pro/agent/kubernetes/
- /es/security/cloud_security_management/setup/csm_enterprise/agent/kubernetes/
code_lang: kubernetes
code_lang_weight: 60
title: Configuración de Cloud Security en Kubernetes
type: multi-code-lang
---
Utilice las siguientes instrucciones para habilitar Misconfigurations y Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Requisitos previos {#prerequisites}

- Última versión del Datadog Agent. Para obtener instrucciones de instalación, consulte [Getting Started with the Agent][5] o instale el Agent desde la [Datadog UI][6].

**Nota**: La recopilación de SBOM no es compatible con la función de transmisión de imágenes en Google Kubernetes Engine (GKE). Para deshabilitarla, consulte la sección [Deshabilitar la transmisión de imágenes][7] de la documentación de GKE.

## Instalación {#installation}

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. Agregue lo siguiente a la sección `spec` del archivo `datadog-agent.yaml`:

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # Enables Misconfigurations
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true

        # Enables Software Bill of Materials (SBOM) collection
        sbom:
          enabled: true

          # Enables Container Vulnerability Management
          containerImage:
            enabled: true
            # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
            analyzers: ["os", "languages"]

          # Enables Host Vulnerability Management
          host:
            enabled: true
            # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
            analyzers: ["os", "languages"]

          # Enables runtime package prioritization (Preview, Agent 7.79+)
          # See Runtime Package Prioritization section below.
          enrichment:
            usage:
              enabled: true
    ```

2. Aplique los cambios y reinicie el Agent.

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. Agregue lo siguiente a la sección `datadog` del archivo `datadog-values.yaml`:

    ```yaml
    # datadog-values.yaml file
    datadog:
      securityAgent:
        # Enables Misconfigurations
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true

      # Enables Software Bill of Materials (SBOM) collection
      sbom:
        # Enables Container Vulnerability Management
        containerImage:
          enabled: true
          # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
          analyzers: ["os", "languages"]

        # Enables Host Vulnerability Management
        host:
          enabled: true
          # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
          analyzers: ["os", "languages"]

        # Enables runtime package prioritization (Preview, Agent 7.79+)
        # See Runtime Package Prioritization section below.
        enrichment:
          usage:
            enabled: true
    ```

2. Reinicie el Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. Agregue las siguientes variables de entorno a cada contenedor del Agent en el archivo `daemonset.yaml`, incluyendo `agent`, `security-agent` y `system-probe`. Estas variables habilitan Misconfigurations, Vulnerability Management, el escaneo de imágenes de contenedores basado en montaje y la priorización de paquetes en tiempo de ejecución.

    ```yaml
    - name: DD_COMPLIANCE_CONFIG_ENABLED
      value: "true"
    - name: DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED
      value: "true"
    - name: DD_SBOM_ENABLED
      value: "true"
    - name: DD_SBOM_CONTAINER_IMAGE_ENABLED
      value: "true"
    - name: DD_SBOM_HOST_ENABLED
      value: "true"
    - name: DD_SBOM_CONTAINER_IMAGE_USE_MOUNT
      value: "true"
    - name: DD_SBOM_ENRICHMENT_USAGE_ENABLED
      value: "true"
    - name: HOST_ROOT
      value: /host/root
    ```

   Si su DaemonSet monta la raíz del servidor en una ruta diferente, establezca `HOST_ROOT` en esa ruta de montaje en cada contenedor del Agent.

2. Establezca `hostPID: true` en la especificación del pod y agregue el siguiente `securityContext` al contenedor `agent`. Estos ajustes son necesarios para el escaneo de imágenes de contenedores basado en montaje con `DD_SBOM_CONTAINER_IMAGE_USE_MOUNT=true`.

    ```yaml
      # Source: datadog/templates/daemonset.yaml
      apiVersion: apps/v1
      kind: DaemonSet
      [...]
      spec:
        [...]
        template:
          [...]
          spec:
            hostPID: true
            containers:
            [...]
              - name: agent
                [...]
                securityContext:
                  capabilities:
                    add:
                      - SYS_ADMIN
                  readOnlyRootFilesystem: true
                  appArmorProfile:
                    type: Unconfined
    ```

3. Reinicie el Agent.

{{% /tab %}}

{{< /tabs >}}

**Nota**: `enrichment.usage.enabled: true` requiere Datadog Agent **7.79.0 o posterior**. Consulte la sección [Priorización de paquetes en tiempo de ejecución](#runtime-package-prioritization-preview) para conocer los requisitos.

**Nota**: El `languages` analyzer requiere Datadog Agent **7.70 o posterior**. Cuando está habilitado, detecta vulnerabilidades en las bibliotecas de aplicaciones administradas por los administradores de paquetes a continuación, además de los paquetes del SO. Cuando se omite el campo `analyzers`, Datadog solo escanea los paquetes del SO para las imágenes de contenedor.

### Administradores de paquetes de bibliotecas de aplicaciones compatibles {#supported-application-library-package-managers}

El `languages` analyzer cubre los siguientes ecosistemas de paquetes:

| Ecosistema | Administrador de paquetes/formato |
|-----------|------------------------|
| Ruby | Bundler, GemSpec |
| Rust | Cargo, binario de Rust |
| PHP | Composer |
| Java | Jar, Maven (pom.xml), Gradle lock, Sbt lock |
| JavaScript | npm (package-lock.json), Yarn, pnpm, Node package |
| .NET | NuGet, .NET Core, PackagesProps |
| Python | Python package (egg), pip, Pipenv, Poetry, uv, Conda package, Conda environment |
| Go | Go binary, Go modules |
| C/C++ | Conan lock |
| Swift / Objective-C | CocoaPods, Swift |
| Dart | PubSpec lock |
| Elixir | Mix lock |
| Julia | Julia |

## Priorización de paquetes en tiempo de ejecución (versión preliminar) {#runtime-package-prioritization-preview}

La priorización de paquetes en tiempo de ejecución identifica qué paquetes en una imagen de contenedor se utilizan durante la ejecución, para que pueda priorizar las vulnerabilidades en el código que se ejecuta sobre las vulnerabilidades en los paquetes que están instalados pero nunca se ejecutan.

Cuando está habilitado, el Agente utiliza eBPF para observar el acceso a archivos en sus cargas de trabajo y añade estas señales a los hallazgos de vulnerabilidad para esa imagen:

| Señal | Qué le indica |
|--------|-------------------|
| El paquete se está ejecutando | Se observó que los archivos del paquete fueron accedidos por un proceso en ejecución. |
| Accedido por proceso root | El paquete fue accedido por un proceso que se ejecuta como root (UID 0). |
| Binario SUID presente | El paquete contiene un binario con el bit SUID establecido, lo cual puede permitir la escalada de privilegios. |

*Package is running* alimenta la dimensión de **Reachability** del [Runtime Prioritization Engine][9]. Para consultar estas señales directamente, consulte [Filter findings by runtime signals][10].

**Requisitos**:
- Datadog Agent **7.79.0 o posterior**. En Kubernetes, utilice **7.81.0 o posterior** para obtener la cobertura de señales más completa.
- Solo Linux (dependencia de eBPF). Consulte [Workload Protection setup][11] para conocer las distribuciones y versiones de kernel compatibles.

Las señales de tiempo de ejecución se aplican a los paquetes instalados por un administrador de paquetes del sistema operativo (`apt`, `yum` o `apk`) en los hallazgos de vulnerabilidad de imágenes de contenedor.

{{< tabs >}}

{{% tab "Datadog Operator" %}}

Añada el bloque `enrichment` a la sección `sbom` de su archivo `datadog-agent.yaml`:

```yaml
spec:
  features:
    sbom:
      enabled: true
      containerImage:
        enabled: true
      # Enables runtime package prioritization (Preview, Agent 7.79+)
      enrichment:
        usage:
          enabled: true
```

Aplique los cambios y reinicie el Agent.

{{% /tab %}}

{{% tab "Helm" %}}

Añada el bloque `enrichment` a la sección `sbom` de su archivo `datadog-values.yaml`:

```yaml
datadog:
  sbom:
    containerImage:
      enabled: true
    # Enables runtime package prioritization (Preview, Agent 7.79+)
    enrichment:
      usage:
        enabled: true
```

Reinicie el Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

Establezca `hostPID: true` en la especificación del pod y añada las siguientes variables de entorno a cada contenedor de Agent en su archivo `daemonset.yaml`, incluyendo `agent`, `security-agent` y `system-probe`:

```yaml
# Pod spec
hostPID: true

# Add to each Agent container's env section.
- name: DD_SBOM_ENABLED
  value: "true"
- name: DD_SBOM_CONTAINER_IMAGE_ENABLED
  value: "true"
- name: DD_SBOM_ENRICHMENT_USAGE_ENABLED
  value: "true"
```

Reinicie el Agent.

{{% /tab %}}

{{< /tabs >}}

Para verificar la configuración, filtre los hallazgos de vulnerabilidad por [runtime signals][10].

[1]: /es/security/cloud_security_management/misconfigurations/
[2]: /es/security/threats
[3]: /es/security/cloud_security_management/vulnerabilities
[4]: /es/security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /es/getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable
[8]: /es/security/workload_protection/
[9]: /es/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[10]: /es/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[11]: /es/security/workload_protection/setup/