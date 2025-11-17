---
aliases:
- /es/security/cloud_security_management/setup/csm_cloud_workload_security/agent/docker
- /es/security/cloud_security_management/setup/csm_enterprise/agent/docker
code_lang: docker
code_lang_weight: 65
title: Configuración de Cloud Security en Docker
type: multi-code-lang
---

Sigue las siguientes instrucciones para activar Misconfigurations y Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Requisitos previos

- Datadog Agent versión `7.46` o posterior.

## Instalación

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
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  gcr.io/datadoghq/agent:7

{{< /code-block >}}

[1]: /es/security/cloud_security_management/misconfigurations/
[2]: /es/security/threats
[3]: /es/security/cloud_security_management/setup#supported-deployment-types-and-features