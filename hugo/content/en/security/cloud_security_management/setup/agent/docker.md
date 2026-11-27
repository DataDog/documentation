---
title: Setting up Cloud Security on Docker
code_lang: docker
type: multi-code-lang
code_lang_weight: 65 # a number that represents relative weight.
aliases:
  - /security/cloud_security_management/setup/csm_cloud_workload_security/agent/docker
  - /security/cloud_security_management/setup/csm_enterprise/agent/docker
---

Use the following instructions to enable Misconfigurations and Cloud Security Vulnerabilities.

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Prerequisites

- Datadog Agent version `7.46` or later.

## Installation

The following command starts the Datadog Agent in a Docker environment with Misconfigurations, Cloud Security Vulnerabilities, and runtime package prioritization enabled:

{{< code-block lang="shell" filename="docker-cloud-security.sh" >}}

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
  -e DD_SBOM_ENABLED=true \
  -e DD_SBOM_CONTAINER_IMAGE_ENABLED=true \
  -e DD_SBOM_HOST_ENABLED=true \
  -e DD_SBOM_ENRICHMENT_USAGE_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7

{{< /code-block >}}

## Runtime Package Prioritization

{{% csm-runtime-package-prioritization %}}

The installation command includes `DD_SBOM_ENRICHMENT_USAGE_ENABLED=true`. If you start the Agent with a different command, add the variable to it:

{{< code-block lang="shell" >}}
docker run -d --name dd-agent \
  [... other flags ...] \
  -e DD_SBOM_ENABLED=true \
  -e DD_SBOM_CONTAINER_IMAGE_ENABLED=true \
  -e DD_SBOM_ENRICHMENT_USAGE_ENABLED=true \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7
{{< /code-block >}}

To verify the setup, filter vulnerability findings by [runtime signals][1].

[1]: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
