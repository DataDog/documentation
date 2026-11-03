---
aliases:
- /ko/security/cloud_security_management/setup/csm_cloud_workload_security/agent/docker
- /ko/security/cloud_security_management/setup/csm_enterprise/agent/docker
code_lang: docker
code_lang_weight: 65
title: Docker에서 Cloud Security 설정
type: multi-code-lang
---
다음 지침을 따라 잘못된 구성 및 Vulnerability Management를 활성화하세요.

{{< partial name="security-platform/CSW-billing-note.html" >}}

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
  -e DD_CONTAINER_IMAGE_ENABLE=true
  -e DD_SBOM_ENABLED=true
  -e DD_SBOM_CONTAINER_IMAGE_ENABLED=true
  -e DD_SBOM_HOST_ENABLED=true
  -e DD_SBOM_ENRICHMENT_USAGE_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7

{{< /code-block >}}

## 런타임 패키지 우선순위 지정{#runtime-package-prioritization}

런타임 패키지 우선순위 지정은 컨테이너 이미지 내에서 어떤 패키지가 런타임에 사용되는지 식별하여, 설치되었지만 실행되지 않는 패키지보다 실제로 실행되는 코드의 취약성을 우선적으로 처리할 수 있도록 합니다.

활성화되면 Agent는 eBPF를 사용하여 워크로드의 파일 액세스를 관찰하고, 이러한 신호를 해당 이미지의 취약성 결과에 추가합니다.

| 신호 | 제공 정보 |
|--------|-------------------|
| 패키지 실행 중 | 실행 중인 프로세스가 패키지 파일에 액세스하는 것이 관찰되었습니다. |
| 루트 프로세스에 의해 액세스됨 | 패키지가 루트(UID 0)로 실행 중인 프로세스에 의해 액세스되었습니다. |
| SUID 바이너리 존재 | 패키지에 SUID 비트가 설정된 바이너리가 포함되어 있어 권한 상승이 가능할 수 있습니다. |

*패키지 실행 중*은 [Runtime Prioritization Engine][5]의 **Reachability** 차원에 데이터를 제공합니다. 이 신호를 직접 쿼리하려면 [런타임 신호별 결과 필터링][6]을 참조하세요.

**요구 사항**:
- Datadog Agent **7.79.0 이상**.
- Linux 전용(eBPF 종속성). 지원되는 배포판 및 커널 버전은 [Workload Protection 설정][7]을 참조하세요.

런타임 신호는 컨테이너 이미지 취약성 탐지 결과에서 운영 체제 패키지 관리자(`apt`, `yum` 또는 `apk`)를 통해 설치된 패키지에 적용됩니다.

Docker run 명령에 `DD_SBOM_ENRICHMENT_USAGE_ENABLED=true`를 추가합니다.

{{< code-block lang="shell" >}}
docker run -d --name dd-agent \
  [... other flags ...] \
  -e DD_SBOM_ENABLED=true \
  -e DD_SBOM_CONTAINER_IMAGE_ENABLED=true \
  -e DD_SBOM_ENRICHMENT_USAGE_ENABLED=true \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7
{{< /code-block >}}

설정을 확인하려면 [런타임 신호][6]별로 취약성 탐지 결과를 필터링하세요.

[1]: /ko/security/cloud_security_management/misconfigurations/
[2]: /ko/security/threats
[3]: /ko/security/cloud_security_management/setup#supported-deployment-types-and-features
[4]: /ko/security/workload_protection/
[5]: /ko/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[6]: /ko/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[7]: /ko/security/workload_protection/setup/