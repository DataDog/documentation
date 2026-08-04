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

Most vulnerabilities Datadog detects are in packages that ship inside an image but never execute. Runtime package prioritization identifies the ones that actually run, so you can remediate those first.

When enabled, the Agent uses eBPF to observe file access on your workloads and records how each package in the image is used at runtime. Datadog adds these signals to every vulnerability finding for that image:

| Signal | What it tells you |
|--------|-------------------|
| Package is running | The package's files were observed being accessed by a running process. |
| Accessed by root process | The package was accessed by a process running as root (UID 0). |
| SUID binary present | The package contains a binary with the SUID bit set, which can enable privilege escalation. |

Together, these answer whether a vulnerability is reachable and how much damage it could do. They feed the **Reachability** dimension of the [Runtime Prioritization Engine][5]. Once enabled, you can filter and group findings by them — see [Filter findings by runtime signals][6].

**Requirements**:
- Datadog Agent **7.79.0 or later**
- Linux only (eBPF dependency)
- Applies to container image vulnerability findings, for operating system packages

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
[5]: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[6]: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals