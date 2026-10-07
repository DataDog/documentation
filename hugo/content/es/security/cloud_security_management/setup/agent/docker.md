---
aliases:
- /es/security/cloud_security_management/setup/csm_cloud_workload_security/agent/docker
- /es/security/cloud_security_management/setup/csm_enterprise/agent/docker
code_lang: docker
code_lang_weight: 65
title: Configuración de Cloud Security en Docker
type: multi-code-lang
---
Utilice las siguientes instrucciones para habilitar Misconfigurations y Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Requisitos previos {#prerequisites}

- Datadog Agent versión `7.46` o superior.

## Instalación {#installation}

El siguiente comando inicia el Runtime Security Agent y `system-probe` en un entorno Docker:

{{< code-block lang="shell" filename="docker-runtime-security.sh" >}}

docker run -d --name dd-agent \
  --cgroupns host \
  --pid host \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add NET_BROADCAST \
  --cap-add NET_RAW \
  --cap-add IPC_LOCK \
  --cap-add CHOWN \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /etc/os-release:/etc/os-release \
  -e DD_COMPLIANCE_CONFIG_ENABLED=true \
  -e DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED=true \
  -e DD_CONTAINER_IMAGE_ENABLE=true
  -e DD_SBOM_ENABLED=true
  -e DD_SBOM_CONTAINER_IMAGE_ENABLED=true
  -e DD_SBOM_HOST_ENABLED=true
  -e DD_SBOM_ENRICHMENT_USAGE_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7

{{< /code-block >}}

## Runtime Package Prioritization {#runtime-package-prioritization}

Runtime Package Prioritization identifica qué paquetes en una imagen de contenedor se utilizan durante la ejecución, para que pueda priorizar las vulnerabilidades en el código que se ejecuta por sobre las vulnerabilidades en los paquetes que están instalados pero nunca se ejecutan.

Cuando está habilitado, el Agent utiliza eBPF para observar el acceso a archivos en sus cargas de trabajo y agrega estas señales a los hallazgos de vulnerabilidades para esa imagen:

| Señal | Qué le indica |
|--------|-------------------|
| El paquete se está ejecutando| Se observó que los archivos del paquete fueron accedidos por un proceso en ejecución. |
| Accedido por proceso raíz| El paquete fue accedido por un proceso que se ejecuta como raíz (UID 0). |
| Binario SUID presente| El paquete contiene un binario con el bit SUID establecido, lo cual puede permitir la escalada de privilegios. |

*El paquete se está ejecutando* alimenta la dimensión **Reachability** del [Runtime Prioritization Engine][5]. Para consultar estas señales directamente, consulte [Filter findings by runtime signals][6].

**Requisitos**:
- Datadog Agent **7.79.0 o superior**.
- Solo Linux (dependencia de eBPF). Consulte [Workload Protection setup][7] para conocer las distribuciones y versiones de kernel compatibles.

Los Runtime signals se aplican a los paquetes instalados por un administrador de paquetes del sistema operativo (`apt`, `yum` o `apk`) en los hallazgos de vulnerabilidades de imágenes de contenedor.

Agregue `DD_SBOM_ENRICHMENT_USAGE_ENABLED=true` a su comando docker run:

{{< code-block lang="shell" >}}
docker run -d --name dd-agent \
  [... other flags ...] \
  -e DD_SBOM_ENABLED=true \
  -e DD_SBOM_CONTAINER_IMAGE_ENABLED=true \
  -e DD_SBOM_ENRICHMENT_USAGE_ENABLED=true \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7
{{< /code-block >}}

Para verificar la configuración, filtre los hallazgos de vulnerabilidades por [runtime signals][6].

[1]: /es/security/cloud_security_management/misconfigurations/
[2]: /es/security/threats
[3]: /es/security/cloud_security_management/setup#supported-deployment-types-and-features
[4]: /es/security/workload_protection/
[5]: /es/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[6]: /es/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[7]: /es/security/workload_protection/setup/