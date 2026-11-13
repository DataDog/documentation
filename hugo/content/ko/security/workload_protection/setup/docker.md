---
aliases:
- /ko/security/workload_protection/setup/agent/docker
description: Datadog Agent를 사용하여 Docker에서 Workload Protection을 활성화하세요.
disable_toc: false
title: Docker에서 Workload Protection 설정
---
다음 지침을 따라 Workload Protection을 활성화하세요.

{{< partial name="security-platform/WP-billing-note.html" >}}

## 전제 조건 {#prerequisites}

- Datadog Agent 버전 `7.46` 이상.

## 설치 {#installation}

다음 명령은 Docker 환경에서 Runtime Security Agent와 `system-probe`를 시작합니다.

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