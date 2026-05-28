---
title: Setting up Cloud Security on Docker
code_lang: docker
type: multi-code-lang
code_lang_weight: 65 # a number that represents relative weight.
aliases:
  - /security/cloud_security_management/setup/csm_cloud_workload_security/agent/docker
  - /security/cloud_security_management/setup/csm_enterprise/agent/docker
---

Use the following instructions to enable Misconfigurations and Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Prerequisites

- Datadog Agent version `7.46` or later.

## Installation

The following command starts the Runtime Security Agent and `system-probe` in a Docker environment:

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

## Runtime Package Prioritization (Preview)

Runtime package prioritization enriches each vulnerability finding with real-time signals from the running environment. When enabled, the Agent uses eBPF to monitor file access at runtime and records how packages are actually used by running processes.

Each vulnerability finding is enriched with the following signals:

| Signal | Description |
|--------|-------------|
| Package is running | The package files are actively being accessed by running processes. |
| Accessed by root process | The package is being accessed by a process running as root (UID 0). |
| SUID binary present | The package contains a binary with the SUID bit set, which can enable privilege escalation. |

These signals power vulnerability prioritization in Cloud Security, surfacing findings where vulnerable code is confirmed running in production.

**Requirements**:
- Datadog Agent **7.79.0 or later**
- Linux only (eBPF dependency)

**Note**: Use Datadog Agent **7.79.0 or later**. Earlier Agent versions enable this feature through [Workload Protection][4] and can affect its usage. From 7.79.0, runtime package prioritization runs independently and does not affect its usage.

Add `DD_SBOM_ENRICHMENT_USAGE_ENABLED=true` to your Docker run command:

{{< code-block lang="shell" >}}
docker run -d --name dd-agent \
  [... other flags ...] \
  -e DD_SBOM_ENABLED=true \
  -e DD_SBOM_CONTAINER_IMAGE_ENABLED=true \
  -e DD_SBOM_ENRICHMENT_USAGE_ENABLED=true \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7
{{< /code-block >}}

**Note**: `DD_SBOM_ENRICHMENT_USAGE_ENABLED=true` is in Preview and requires Datadog Agent **7.79.0 or later**. From 7.79.0, runtime package prioritization runs independently of [Workload Protection][4] and does not affect its usage.

[1]: /security/cloud_security_management/misconfigurations/
[2]: /security/threats
[3]: /security/cloud_security_management/setup#supported-deployment-types-and-features
[4]: /security/workload_protection/