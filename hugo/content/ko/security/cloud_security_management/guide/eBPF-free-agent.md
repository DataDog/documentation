---
disable_toc: false
title: eBPF 지원 없이 Linux 용 위협 탐지
---
이 가이드는 AWS Fargate와 같이 eBPF가 비활성화된 환경에 맞춰 Workload Protection eBPF-less 솔루션을 설정하는 방법을 설명합니다. eBPF-less 솔루션은 ptrace 기반 Datadog Agent를 사용합니다.

이 가이드는 ptrace 솔루션의 몇 가지 장점도 설명합니다.

## Agent 옵션 요약 {#summary-of-agent-options}

Workload Protection에는 위협 탐지 및 대응을 위한 두 가지 Agent 옵션이 포함되어 있습니다.

- eBPF 솔루션
- ptrace를 사용하는 eBPF-less 솔루션: 이 버전은 eBPF가 지원되지 않는 경우(Linux 커널 버전 3.4~4.14)에만 사용할 수 있습니다.

{{% collapse-content title="eBPF 솔루션" level="h3" %}}

Datadog은 모든 Security 제품을 [eBPF(extended Berkeley Packet Filter)][1]를 중심으로 빌드했습니다. eBPF의 장점은 다음과 같습니다.

- eBPF는 Linux 커널 검증기를 통해 각 프로그램을 검증함으로써 안전성을 개선합니다. 이를 통해 프로그램이 충돌하거나 무한 루프에 빠지거나 시스템에 해를 끼치지 않도록 보장합니다.
- eBPF는 JIT(Just In Time) 컴파일되며 출력된 바이트코드는 eBPF VM 샌드박스에서 실행됩니다. 이는 커널 충돌을 방지하고 경쟁력 있는 성능을 제공합니다.
- 디버깅 및 유지 관리가 쉽고 프로그램을 동적으로 로드할 수 있으며 사용자 공간을 추적하는 데 필요한 모든 정보에 액세스할 수 있습니다.

Datadog eBPF Agent 코드는 [완전한 오픈 소스][2]입니다.

{{% /collapse-content %}}

{{% collapse-content title="ptrace를 사용하는 eBPF-less 솔루션" level="h3" %}}
일부 환경에서는 eBPF가 전혀 없는 이전 커널이 포함된 인스턴스를 사용합니다. ptrace 솔루션은 이러한 환경을 위해 제공됩니다.

eBPF-less Agent 에서는 다음 기능을 사용할 수 없습니다.

- Security 프로필, 다음 기능 제공:
  - 이상 탐지
  - 신호 분류를 위한 정상 동작 자동 억제
  - 멀웨어 탐지
- 네트워크 탐지

<div class="alert alert-info">현재 구현은 amd64 및 arm64 아키텍처와 ABI를 지원하지만 32비트 ABI로 확장할 수 있습니다.</div>

### ptrace 솔루션의 장점 {#advantages-of-ptrace-solution}

ptrace 기반 솔루션은 강력한 위협 탐지와 흔들림 없는 서비스 가용성 사이의 균형을 달성합니다. ptrace 기반 솔루션의 장점은 다음과 같습니다.

- 정밀한 프로세스 제어: ptrace는 메모리와 레지스터에 대한 상세한 검사를 제공하여 중요한 애플리케이션 워크로드를 보호합니다. 이러한 세밀한 가시성은 정교한 위협을 식별하는 데 필수적입니다. Datadog procfs(프로세스 파일 시스템) 스캐너는 시스템 전체의 모든 실행을 모니터링하여 악성 프로세스를 정밀하게 종료할 수 있도록 합니다. 이러한 도구는 함께 작용하여 악성 활동으로부터 보호합니다.
- 운영 안정성: 사용자 공간에서 작동하는 ptrace는 커널 공간의 복잡성과 위험을 피하여 더 안전하고 관리하기 쉬운 접근 방식을 제공합니다. 장애 발생 시, ptrace 기반 Agent는 OS 계층에서 기본적으로 fail-open 상태가 되어 애플리케이션이 중단되더라도 시스템에 영향을 주지 않습니다.
- 성능 효율성: Datadog 엔지니어링 팀이 수행한 최근 벤치마크에 따르면 Datadog의 ptrace 기반 구현은 커널 기반 솔루션과 비교할 만한 성능을 보여줍니다. 구체적으로, PostgreSQL 워크로드의 경우 약 3%의 최소한의 오버헤드만 발생하며 Redis 작업에는 거의 영향을 미치지 않아 대부분의 사용 사례에서 매우 효율적입니다.
- 오픈 소스 검증: Datadog은 ptrace 기반 및 eBPF Agent를 오픈 소스로 공개하여 고객과 보안 커뮤니티가 직접 안전성과 효과를 검증할 수 있도록 함으로써 솔루션에 대한 투명성과 신뢰를 높였습니다.
{{% /collapse-content %}}


## eBPF-less Agent 설정 {#ebpf-less-agent-setup}

Docker 및 Linux 호스트를 포함한 다양한 플랫폼에서 eBPF-less Agent를 설정할 수 있습니다.

이 섹션에서는 Docker 및 Linux 호스트에 대해 다룹니다. eBPF가 비활성화된 Amazon Fargate 환경 설정 단계는 [Datadog Security를 위한 AWS Fargate 구성 가이드][3]를 참조하세요.

### eBPF-less Agent 요구 사항 {#ebpf-less-agent-requirements}

- eBPF-less Agent는 eBPF가 비활성화된 환경을 위해 설계되었으며, 런타임 보안에 ptrace를 사용하고 arm64/amd64 아키텍처를 지원합니다.
- eBPF-less Agent를 배포하려면 사용자 지정 설치 명령 및 구성이 필요합니다. 이 섹션에서는 Docker 및 Linux 호스트 설치에 대한 구체적인 지침을 제공합니다.

eBPF-less 솔루션에는 애플리케이션을 위한 다음 2가지 추적 모드가 포함되어 있습니다:

- 래핑 모드: 시작부터 애플리케이션을 추적합니다.
- Attach 모드: 이미 실행 중인 애플리케이션에 연결하지만, 더 많은 성능 오버헤드와 제한 사항이 따릅니다.

### eBPF-less 설정 단계 {#ebpf-less-setup-steps}

{{< tabs >}}
{{% tab "Docker" %}}
Docker에서는 추가 환경 변수가 필요합니다. Docker 설치 명령에 다음 줄을 추가합니다.

```shell
-e DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED=true
```

해당 명령은 다음과 같아야 합니다.

```shell
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
  -e DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7
```
{{% /tab %}}

{{% tab "Linux 호스트" %}}
Linux 호스트에 Agent를 설치하려면 다음 설치 스크립트를 사용하여 사용자 지정 빌드를 설치합니다.

```shell
DD_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX DD_SITE="datadoghq.com" \
DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

다음으로, `/etc/datadog-agent/system-probe.yaml` 파일을 수정하여 다음과 같이 CWS 및 eBPF-less 모드를 활성화합니다.

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}

또는 `.deb/.rmp`에서 제공하는 사용자 지정 빌드 패키지를 수동으로 설치하려면 `/etc/datadog-agent/system-probe.yaml` 파일을 수정하여 다음과 같이 CWS 및 eBPF-less 모드를 활성화합니다.

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}





## eBPF-less Agent 배포 {#deploy-ebpf-less-agent}

Agent를 배포하기 전에 다음 구성 요구 사항을 수행했는지 확인합니다.

1. 설치를 진행하기 전에 [Agent 설치 지침][5]을 사용자 지정합니다.
2. Cloud Security가 활성화된 상태에서 Agent를 설치/업데이트합니다. 단계는 [Agent에서 Cloud Security 설정][4]을 참조하세요.
3. 이전 **eBPF-less agent setup** 섹션에서 추가 구성을 지정하여 사용자 지정 버전을 설치하고 eBPF-less 모드를 활성화합니다.


## 설정 확인 {#verify-setup}

Agent 설치 및 설정을 확인하려면 Linux 호스트 또는 Docker 컨테이너에 연결하여 다음 작업을 실행합니다.

```shell
sudo /opt/datadog-agent/embedded/bin/system-probe config|grep -A 1 ebpfless
```

다음과 같은 출력이 표시되어야 합니다.

```
  ebpfless:
    enabled: true
```

## eBPF-less Agent로 애플리케이션 추적 설정 {#set-up-application-tracing-with-ebpf-less-agent}

eBPF-less Agent가 설치되고 eBPF-Free 모드를 사용하도록 설정된 후에는 애플리케이션 추적 방식을 설정할 수 있습니다. 이 섹션에서는 다음 2가지 다른 방법을 제공합니다.

- **래핑 모드:**(권장) 이 모드에서는 ptrace를 사용하여 처음부터 애플리케이션을 추적하는 Datadog wrapper에 의해 애플리케이션이 실행됩니다.
  - 생성된 모든 자식 프로세스도 추적됩니다.
  - ptrace 오버헤드를 크게 줄이기 위해 seccomp 프로필이 적용됩니다.
- **연결 모드:** 이 모드에서는 애플리케이션 프로세스에 연결할 PID 목록을 지정할 수 있습니다. 이 작업이 완료될 때까지 애플리케이션이 ptrace되지 않으므로 신속하게 수행해야 합니다.
  - 이 모드에서는 seccomp 프로필을 적용할 수 없습니다. 결과적으로 약간의 ptrace 오버헤드가 발생합니다.

두 모드 모두 Datadog Agent와 함께 패키징되어 `/opt/datadog-agent/embedded/bin/cws-instrumentation`에 위치한 **cws-instrumentation** 바이너리를 사용합니다.

<div class="alert alert-info">
이 트레이서는 포트 5678을 사용하여 localhost에서 system-probe(Datadog Agent의 일부)와 통신합니다. system-probe 주소는 <code>--probe-addr=host:port</code> cws-instrumentation 옵션을 사용하여 구성할 수 있습니다. 서버 측 주소는 Agent 구성 파일의 runtime_security_config.ebpfless.socket 옵션을 통해 <code>/etc/datadog-agent/system-probe.yaml</code> 업데이트할 수 있습니다.
</div>

{{< tabs >}}
{{% tab "래핑 모드" %}}
래핑 모드에서는 Datadog Wrapper가 애플리케이션을 시작합니다. 여기에 예시가 있습니다.

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/your_application
```

애플리케이션이 루트가 아닌 사용자로 실행되는 경우, uid/gid를 숫자 값으로 지정합니다.

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --uid 100 --gid 100 -- /usr/bin/your_application
```

<div class="alert alert-info">cws-instrumentation이 Datadog Agent와의 연결을 초기화할 때까지 애플리케이션이 시작되지 않습니다.</div>

다음 예시는 다양한 배포 유형에 대해 애플리케이션 내에서 트레이서를 통합하는 방법을 보여줍니다.

<div class="alert alert-info">이전 3.4 커널에서는 seccomp 프로필을 사용할 수 없으며 <code>–disable-seccomp</code> 옵션을 사용하여 비활성화해야 합니다.</div>

#### Linux systemd 서비스 {#linux-systemd-service}

이미 init 스크립트가 있는 경우 필요한 변경 사항에 대한 간단한 예시는 다음과 같습니다.

```shell
   [Unit]
   Description=My application
   After=datadog-agent-sysprobe.service

   [Service]
   ExecStart=/opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/myapp
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
```

#### Linux sysvinit 서비스 {#linux-sysvinit-service}

이미 init 스크립트가 있는 경우 필요한 변경 사항에 대한 간단한 예시는 다음과 같습니다.

```shell
#!/bin/sh
set -e
### BEGIN INIT INFO
# Provides:           my_app
# Required-Start:     $network
# Required-Stop:      $network
# Default-Start:      2 3 4 5
# Default-Stop:       0 1 6
# Short-Description:  My application
# Description: My application
### END INIT INFO

# Start the service
start() {
        echo "Starting my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/myapp &
}


# Stop the service
stop() {
       echo "Stopping my app"
	pkill -f /usr/bin/myapp
}

### main logic ###
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart)
        stop
        start
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
esac

exit 0
```

#### Docker {#docker}

Docker 애플리케이션 배포의 경우 다음과 같이 Dockerfile을 수정하여 애플리케이션을 래핑해야 합니다.

```shell
FROM registry.datadoghq.com/agent:7 AS datadogagent

FROM ubuntu:latest

COPY --from=datadogagent /opt/datadog-agent/embedded/bin/cws-instrumentation .

ENTRYPOINT ["/cws-instrumentation", "trace", "--"]

CMD ["/bin/bash", "-c", "while true; do sleep 1; echo my app is running; done"]
```

Docker 애플리케이션을 실행할 때 `--cap-add=SYS_PTRACE`를 `docker run` 명령에 추가하여 추가 기능을 부여하는 것이 중요합니다.

또한 다음 중 하나를 수행하여 5678 포트에서 컨테이너를 Datadog에 연결해야 합니다.

- `--network` 호스트 옵션을 사용하여 두 컨테이너를 모두 시작합니다.
- [Docker 네트워크][6] 기능을 사용하여 두 컨테이너를 동일한 브리지 네트워크에서 실행합니다.

{{% /tab %}}

{{% tab "연결 모드" %}}
연결 모드에는 다음과 같은 제한 사항이 있으므로 래핑 모드를 사용하는 것이 좋습니다.

- Datadog이 애플리케이션에 연결될 때까지 애플리케이션에서 수행되는 모든 초기화를 놓칩니다.
- - 연결 시 Datadog은 seccomp 프로필을 설정할 수 없습니다.
- 더 많은 성능 오버헤드.
- 추적된 애플리케이션이 다시 시작되면 Datadog은 트레이서도 다시 시작되도록 해야 합니다.

연결 모드는 이미 실행 중인 애플리케이션에 추적기를 직접 연결한다는 점에서 래핑 모드와 다르며, 방식은 다음과 같습니다:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301
```

여러 PID를 한 번에 연결할 수 있습니다.

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301 --pid 2302 --pid 2303
```

다음 예시는 다양한 배포 유형에 대해 애플리케이션 내에서 트레이서를 통합하는 방법을 보여줍니다.

#### Linux systemd 서비스 {#linux-systemd-service-1}

이미 init 스크립트가 있는 경우 새 systemd 서비스를 사용하여 래퍼를 통합하는 방법의 예는 다음과 같습니다.

```shell
[Unit]
Description=Datadog CWS instrumentation attach to my application
After=datadog-agent-sysprobe.service my-app.service

[Service]
ExecStart=/bin/bash -c "/opt/datadog-agent/embedded/bin/cws-instrumentation trace $(for pid in $(pidof myapp); do echo --pid $pid; done)"
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

#### Linux sysvinit 서비스 {#linux-sysvinit-service-1}

이미 init 스크립트가 있는 경우, 새 sysvinit 서비스를 사용하여 트레이서를 통합하는 방법의 예는 다음과 같습니다.

```shell
#!/bin/sh
set -e
### BEGIN INIT INFO
# Provides:           dd_tracing_my_app
# Required-Start:     $network
# Required-Stop:      $network
# Default-Start:      2 3 4 5
# Default-Stop:       0 1 6
# Short-Description:  Datadog tracing of my application
# Description: Datadog tracing of my application
### END INIT INFO

# Start the service
start() {
        echo "Starting tracing my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace $(for pid in $(pidof myapp); do echo --pid $pid; done) &
}


# Stop the service
stop() {
       echo "Stopping my app"
	pkill -f /opt/datadog-agent/embedded/bin/cws-instrumentation
}

### main logic ###
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart)
        stop
        start
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
esac

exit 0
```

#### Docker {#docker-1}

애플리케이션을 실행하는 Docker 이미지에 래퍼를 연결하려면 다음 Dockerfile을 사용합니다.

```shell
FROM registry.datadoghq.com/agent:7

ENTRYPOINT ["/opt/datadog-agent/embedded/bin/cws-instrumentation", "trace", "--pid", "$PID"]
```

다음으로, Docker에 연결하기 위한 호스트 PID를 환경 변수로 제공합니다.

애플리케이션에 연결하려면 다음이 필요합니다.

- Docker 애플리케이션을 실행할 때 `--cap-add=SYS_PTRACE` 명령에 `docker run`을 포함하여 필요한 기능을 추가합니다.
- 다음 방법 중 하나를 사용하여 애플리케이션 컨테이너가 5678 포트에서 Datadog 컨테이너에 연결할 수 있는지 확인하세요.
  - `--network` 호스트 옵션을 사용하여 두 컨테이너를 모두 시작합니다.
  - [Docker 네트워크][6] 기능을 사용하여 두 컨테이너를 동일한 브리지 네트워크에서 실행합니다.
- 애플리케이션 컨테이너가 (Datadog Agent와 마찬가지로) 호스트 PID에서 실행되도록 하려면 다음 옵션을 추가합니다. `--cgroupns host --pid host`.
{{% /tab %}}
{{< /tabs >}}



[1]: https://ebpf.io/what-is-ebpf/
[2]: https://github.com/DataDog/datadog-agent
[3]: /ko/security/guide/aws_fargate_config_guide/?tab=amazonecs
[4]: /ko/security/cloud_security_management/setup/agent
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: https://docs.docker.com/network/