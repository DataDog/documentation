---
title: Setting up Cloud Security Management on Docker
code_lang: docker
type: multi-code-lang
code_lang_weight: 65 # a number that represents relative weight.
aliases:
  - /security/cloud_security_management/setup/csm_cloud_workload_security/agent/docker
  - /security/cloud_security_management/setup/csm_enterprise/agent/docker
---

Use the following instructions to enable Misconfigurations and Threat Detection.

## 前提条件

- Datadog Agent version `7.46` or later.

## インストール

以下のコマンドは、Docker 環境で Runtime Security Agent と `system-probe` を起動します。

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
  gcr.io/datadoghq/agent:7

{{< /code-block >}}

[1]: /security/cloud_security_management/misconfigurations/
[2]: /security/threats
[3]: /security/cloud_security_management/setup#supported-deployment-types-and-features