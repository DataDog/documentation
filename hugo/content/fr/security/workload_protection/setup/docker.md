---
aliases:
- /fr/security/workload_protection/setup/agent/docker
description: Activez Workload Protection sur Docker avec Datadog Agent.
disable_toc: false
title: Configuration de Workload Protection sur Docker
---
Utilisez les instructions suivantes pour activer Workload Protection.

{{< partial name="security-platform/WP-billing-note.html" >}}

## Prérequis {#prerequisites}

- Datadog Agent version `7.46` ou ultérieure.

## Installation {#installation}

La commande suivante démarre Runtime Security Agent et `system-probe` dans un environnement Docker :

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
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7

{{< /code-block >}}