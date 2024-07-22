---
aliases:
- /ko/network_performance_monitoring/installation/
description: 에이전트를 사용하여 네트워크 데이터를 수집합니다.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: 블로그
  text: 네트워크 성능 모니터링
- link: https://www.datadoghq.com/blog/monitor-containers-with-npm/
  tag: 블로그
  text: 컨테이너 및 서비스 메시 네트워크가 포함된 Datadog NPM
- link: /network_monitoring/devices
  tag: 설명서
  text: 네트워크 장치 모니터링
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: 블로그
  text: Datadog NPM는 콘술 네트워킹을 지원합니다.
title: 네트워크 성능 모니터링 설정
---

Datadog 네트워크 성능 모니터링(NPM)은 서비스, 컨테이너, 가용 영역 및 Datadog 기타 태그 간의 네트워크 트래픽에 대한 가시성을 제공해 드리므로, 아래와 같은 작업을 수행할 수 있습니다.

- 예상치 못한 또는 잠재적인 서비스 종속성 파악.
- 비용이 많이 드는 지역 간 또는 멀티 클라우드 통신 최적화.
- 클라우드 공급자 지역 및 타사 툴의 운영 중단 파악.
- DNS 서버 메트릭으로 서비스 탐지 오류 문제를 해결하세요.

네트워크 성능 모니터링 기능을 활용하려면 [Datadog Agent v6.14+][1]가 필요합니다. 메트릭은 상위 버전의 에이전트에서 자동으로 수집되므로, [메트릭 설정 섹션][2]을 참조하여 DNS 모니터링을 설정하세요.

## 지원 플랫폼

### 운영 체제

#### Linux OS

데이터 수집은 eBPF를 사용하여 진행되모르, Datadog은 최소 기본 Linux 커널 버전이 4.4.0+이거나 eBPF 기능이 백포트된 플랫폼이 필요합니다. NPM은 다음과 같은 Linux 배포판을 지원합니다.

- Ubuntu 16.04+
- Debian 9+
- Fedora 26+
- SUSE 15+
- 아마존 AMI 2016.03+
- 아마존 리눅스 2
- CentOS/RHEL 7.6+

**참고**: [CentOS/RHEL 7.6+][3]의 경우 4.4.0+ 커널 요구 사항에 예외가 있습니다. [DNS 확인][4] 기능은 CentOS/RHEL 7.6에서 지원되지 않습니다.

#### Windows OS

데이터 수집은 네트워크 커널 장치 드라이버를 사용하여 진행됩니다. Windows 버전 2012 R2 (및 Windows 10을 포함한 동급 데스크톱 OS) 이상에서, Datadog Agent 버전 7.27.1부터 지원됩니다.

#### 맥OS(macOS)

Datadog 네트워크 성능 모니터링은 macOS 플랫폼을 지원하지 않습니다.

### 컨테이너

NPM은 [도커(Docker)][5], [쿠버네티스(Kubernetes)][6], [ECS][7], 기타 컨테이너 기술을 지원하여, 컨테이너화 및 오케스트레이션된 환경의 아키텍처와 성능을 시각화할 수 있도록 도와드립니다. Datadog의 컨테이너 통합을 사용하면 `container_name`, `task_name`, `kube_service` 등의 즉시 사용 가능한 태그로 컨테이너, 작업, 포드, 클러스터, 배포와 같은 유용한 엔티티별로 트래픽을 집계할 수 있습니다.

NPM은 GKE(Google Kubernetes Engine) Autopilot에 대해 지원되지 않습니다.

### 네트워크 라우팅 툴

#### Istio

NPM을 사용하면 Istio 서비스 메시를 통해 컨테이너, 포드, 서비스 간의 네트워크 통신을 매핑할 수 있습니다.

Datadog은 Istio 환경의 모든 부분을 모니터링하므로 다음과 같은 작업을 할 수 있습니다.

- [로그][8]로 Envoy와 Istio 컨트롤 패널의 상태를 평가합니다.
- 요청, 대역폭, 리소스 소비 [메트릭][8]을 활용해 서비스 메시의 성능을 분석합니다.
- 메시를 통해 [애플리케이션 성능 모니터링(APM)][9]으로 트랜잭션하는 애플리케이션에 대한 분산 트레이스를 검토합니다.

NPM은 [Datadog Agent v7.24.1+][1]로 Istio v1.6.4+를 지원합니다.

Datadog으로 Istio 환경을 모니터링하는 방법에 대해 자세히 살펴보려면 [Istio 블로그][10]를 참조하세요.

#### Cilium

다음 요구 사항을 충족하는 경우 네트워크 성능 모니터링은 **Cilium** 설치와 호환됩니다:
1) Cilium 버전 1.6 이상 및
2) 커널 버전 5.1.16 이상, 또는 4.19.x 커널의 경우 4.19.57 이상

### 프로비저닝 시스템

네트워크 성능 모니터링은 다음과 같은 프로비저닝 시스템 사용을 지원합니다.

- Daemonset / Helm 1.38.11+: [Datadog Helm 차트][11]를 참조하세요.
- Chef 12.7+: [Datadog 셰프 레시피][12]를 참조하세요.
- Ansible 2.6+: [Datadog Ansible 역할][13]을 참조하세요.

## 설정

해당 툴의 중점과 강점은 네트워크 엔드포인트 간 트래픽을 분석하고 네트워크 종속성을 매핑하는 것이므로, 이러한 성능을 극대화하려면 인프라스트럭처 내 중요 하위 집합과 **최소 2개 호스트**에 설치할 것을 권장합니다.

{{< tabs >}}
{{% tab "Agent (Linux)" %}}

Datadog 에이전트로 네트워크 성능 모니터링 기능을 사용하도록 구성하려면 다음과 같이 설정하세요.

1. **6.14+ 이전 버전 에이전트를 사용하는 경우**에는 먼저 [실시간 프로세스 수집][1]을 활성화하세요. 그렇지 않은 경우에는 이 단계를 건너뜁니다.

2. 시스템 프로브 예제 설정을 복사합니다:

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. `/etc/datadog-agent/system-probe.yaml`을 편집하여 활성 플래그를 `true`로 설정합니다:

    ```yaml
    network_config:   # use system_probe_config for Agent's older than 7.24.1
      ## @param enabled - boolean - optional - default: false
      ## Set to true to enable Network Performance Monitoring.
      #
      enabled: true
    ```

4. **6.18 또는 7.18 이전 버전의 에이전트를 실행 중인 경우** 수동으로 시스템 프로브를 시작하고, 부팅 시 시작하도록 설정합니다 (6.18 및 7.18 버전부터는 에이전트가 시작될 때 시스템 프로브가 자동으로 시작됨):

    ```shell
    sudo systemctl start datadog-agent-sysprobe
    sudo systemctl enable datadog-agent-sysprobe
    ```

    **참고**: 시스템에서 `systemctl` 명령을 사용할 수 없는 경우, `sudo service datadog-agent-sysprobe start`명령을 대신 실행합니다. 그 다음 `datadog-agent` 시작 전에, 부팅 시 시작되도록 설정합니다.

5. [에이전트를 다시 시작합니다][2].

    ```shell
    sudo systemctl restart datadog-agent
    ```

   **참고**: `systemctl` 명령이 시스템에서 제공되지 않으면 대신 다음 명령(`sudo service datadog-agent restart`)을 실행합니다.

### SELinux 지원 시스템

SELinux가 활성화된 시스템에서 시스템 프로브 바이너리가 eBPF 기능을 사용하려면 특별 권한이 필요합니다.

CentOS 기반 시스템용 Datadog 에이전트 RPM 패키지는 시스템 프로브 바이너리에 해당 권한을 부여할 목적으로 [SELinux 정책][3]을 번들로 제공합니다.

SELinux가 활성화된 다른 시스템에서 네트워크 성능 모니터링 기능을 사용해야 한다면 다음 작업을 수행합니다.

1. 기본 [SELinux 정책][3]을 SELinux 설정에 맞게 수정합니다.
    시스템에 따라 일부 유형 또는 속성은 존재하지 않거나 이름이 다를 수 있습니다.

2. 정책 파일의 이름이 `system_probe_policy.te`이라는 가정 하에 해당 정책을 모듈로 컴파일합니다.

    ```shell
    checkmodule -M -m -o system_probe_policy.mod system_probe_policy.te
    semodule_package -o system_probe_policy.pp -m system_probe_policy.mod
    ```

3. 모듈을 SELinux 시스템에 적용합니다.

    ```shell
    semodule -v -i system_probe_policy.pp
    ```

4. 에이전트 설치 디렉토리가 `/opt/datadog-agent`이라는 가정 하에, 정책에 정의된 것을 사용하도록 시스템 프로브 바이너리 유형을 변경합니다.

    ```shell
    semanage fcontext -a -t system_probe_t /opt/datadog-agent/embedded/bin/system-probe
    restorecon -v /opt/datadog-agent/embedded/bin/system-probe
    ```

5. [에이전트를 다시 시작합니다][2].

**참고**: 이 지침을 사용하려면 시스템에 대부분의 표준 배포판(우분투(Ubuntu), 데비안(Debian), RHEL, CentOS, SUSE)에서 사용할 수 있는 SELinux 유틸리티(`checkmodule`, `semodule`, `semodule_package`, `semanage`,`restorecon`)가 설치되어 있어야 합니다. 설치 방법에 대한 자세한 내용을 확인하려면 사용 중인 배포판을 확인하세요.

배포판에 해당 유틸리티가 없는 경우, 동일한 절차를 따르되 배포판에서 제공하는 유틸리티를 대신 사용합니다.


[1]: /ko/infrastructure/process/?tab=linuxwindows#installation
[2]: /ko/agent/configuration/agent-commands/#restart-the-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/selinux/system_probe_policy.te
{{% /tab %}}
{{% tab "Agent (Windows)" %}}

Windows용 데이터 수집은 네트워크 데이터 수집용 필터 드라이버에 의존합니다.

Windows 호스트용 네트워크 성능 모니터링을 활성화하려면 다음의 작업을 수행합니다.

1. 네트워크 드라이버 구성 요소를 활성화한 상태에서 [Datadog Agent][1](버전 7.27.1 이상)를 설치합니다.

   [사용 중단됨]_(버전 7.44 이하)_ 설치 중에 `ADDLOCAL="MainApplication,NPM"`을 `msiexec` 명령으로 전달하거나, GUI로 에이전트 설치를 실행할 때 "네트워크 성능 모니터링"을 선택합니다.

1. `C:\ProgramData\Datadog\system-probe.yaml`을 편집하여 활성 플래그를 `true`로 설정합니다:

    ```yaml
    network_config:
        enabled: true
    ```
3. [에이전트를 다시 시작합니다][2].

    PowerShell (`powershell.exe`)의 경우:
    ```shell
    restart-service -f datadogagent
    ```
    명령 프롬프트(`cmd.exe`)의 경우:
    ```shell
    net /y stop datadogagent && net start datadogagent
    ```
**참고**: 네트워크 성능 모니터링은 Windows 호스트만 모니터링하며 Windows 컨테이너는 모니터링하지 않습니다.


[1]: /ko/agent/basic_agent_usage/windows/?tab=commandline
[2]: /ko/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

Helm으로 쿠버네티스(Kubernetes)용 네트워크 성능 모니터링을 활성화하려면 다음을 추가합니다.

  ```yaml
  datadog:
    networkMonitoring:
      enabled: true
  ```
values.yaml에 추가하려면, **Helm 차트 v2.4.39 버전 이상이 필요**합니다. 자세한 내용을 확인하려면 [Datadog 헬름 차트 문서][1]를 참조하세요.

Helm을 사용하지 않는다면 처음부터 쿠버네티스(Kubernetes)에서 네트워크 성능 모니터링을 사용하도록 설정할 수 있습니다:

1. [datadog-agent.yaml 매니페스트][2] 템플릿을 다운로드하세요.
2. `<DATADOG_API_KEY>`를 [Datadog API 키][3]로 교체합니다.
3. 옵션 - **Datadog 사이트 설정**. Datadog EU 사이트를 사용한다면, `datadog-agent.yaml` 매니페스트에서 `DD_SITE` 환경 변수를 `datadoghq.eu`로 설정합니다.
4. 명령어와 함께 **데몬셋을 배포합니다**:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

이미 [매니페스트와 함께 실행 중인 에이전트][4]가 있는 경우:

1. `datadog-agent` 템플릿에 `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` 어노테이션을 추가합니다:

    ```yaml
    spec:
        selector:
            matchLabels:
                app: datadog-agent
        template:
            metadata:
                labels:
                    app: datadog-agent
                name: datadog-agent
                annotations:
                    container.apparmor.security.beta.kubernetes.io/system-probe: unconfined
    ```

2. 에이전트 데몬셋에서 다음 환경 변수를 사용하여 프로세스 수집 및 시스템 프로브를 활성화합니다. 에이전트 프로세스별로 컨테이너를 실행한다면 다음 환경 변수를 프로세스 에이전트 컨테이너에 추가하고, 그렇지 않다면 에이전트 컨테이너에 추가합니다.

    ```yaml
      # (...)
                      env:
                      # (...)
                          - name: DD_PROCESS_AGENT_ENABLED
                            value: 'true'
                          - name: DD_SYSTEM_PROBE_ENABLED
                            value: 'true'
                          - name: DD_SYSTEM_PROBE_EXTERNAL
                            value: 'true'
                          - name: DD_SYSPROBE_SOCKET
                            value: /var/run/sysprobe/sysprobe.sock
    ```

3. `datadog-agent` 컨테이너에 다음 추가 볼륨을 마운트합니다:

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'gcr.io/datadoghq/agent:latest'
                      # (...)
                  volumeMounts:
                      - name: procdir
                        mountPath: /host/proc
                        readOnly: true
                      - name: cgroups
                        mountPath: /host/sys/fs/cgroup
                        readOnly: true
                      - name: debugfs
                        mountPath: /sys/kernel/debug
                      - name: sysprobe-socket-dir
                        mountPath: /var/run/sysprobe
    ```

4. 에이전트에 새 시스템 프로브를 사이드카로 추가합니다:

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'gcr.io/datadoghq/agent:latest'
                    # (...)
                    - name: system-probe
                      image: 'gcr.io/datadoghq/agent:latest'
                      imagePullPolicy: Always
                      securityContext:
                          capabilities:
                              add:
                                  - SYS_ADMIN
                                  - SYS_RESOURCE
                                  - SYS_PTRACE
                                  - NET_ADMIN
                                  - NET_BROADCAST
                                  - NET_RAW
                                  - IPC_LOCK
                                  - CHOWN
                      command:
                          - /opt/datadog-agent/embedded/bin/system-probe
                      env:
                          - name: DD_SYSPROBE_SOCKET
                            value: /var/run/sysprobe/sysprobe.sock
                      resources:
                          requests:
                              memory: 150Mi
                              cpu: 200m
                          limits:
                              memory: 150Mi
                              cpu: 200m
                      volumeMounts:
                          - name: procdir
                            mountPath: /host/proc
                            readOnly: true
                          - name: cgroups
                            mountPath: /host/sys/fs/cgroup
                            readOnly: true
                          - name: debugfs
                            mountPath: /sys/kernel/debug
                          - name: sysprobe-socket-dir
                            mountPath: /var/run/sysprobe
    ```

5. 마지막으로 매니페스트에 다음 볼륨을 추가합니다:

    ```yaml
                volumes:
                    - name: sysprobe-socket-dir
                      emptyDir: {}
                    - name: debugfs
                      hostPath:
                          path: /sys/kernel/debug
    ```


[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[2]: /resources/yaml/datadog-agent-npm.yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ko/agent/kubernetes/
{{% /tab %}}
{{% tab "Operator" %}}
<div class="alert alert-warning">Datadog 오퍼레이터는 일반적으로 `1.0.0` 버전과 함께 사용할 수 있으며, DatadogAgent 커스텀 리소스의 `v2alpha1`버전을 조정합니다.</div>

[Datadog 오퍼레이터][1]는 쿠버네티스와 OpenShift에 Datadog 에이전트를 배포하는 방법입니다. 커스텀 리소스 상태에서 배포 상황, 상태, 오류를 보고하고 고급 설정 옵션을 통해 오류 발생 위험을 줄입니다.

오퍼레이터에서 네트워크 성능 모니터링 기능을 사용하도록 구성하려면 다음과 같이 설정하세요.

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: placeholder
  namespace: placeholder
spec:
  features:
    npm:
      enabled: true
```

[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "Docker" %}}

도커(Docker)에서 네트워크 성능 모니터링 기능을 사용하도록 구성하려면 컨테이너 에이전트를 시작할 때 다음 설정을 활용하세요.

```shell
docker run --cgroupns host \
--pid host \
-e DD_API_KEY="<DATADOG_API_KEY>" \
-e DD_SYSTEM_PROBE_NETWORK_ENABLED=true \
-e DD_PROCESS_AGENT_ENABLED=true \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-v /proc/:/host/proc/:ro \
-v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
-v /sys/kernel/debug:/sys/kernel/debug \
--security-opt apparmor:unconfined \
--cap-add=SYS_ADMIN \
--cap-add=SYS_RESOURCE \
--cap-add=SYS_PTRACE \
--cap-add=NET_ADMIN \
--cap-add=NET_BROADCAST \
--cap-add=NET_RAW \
--cap-add=IPC_LOCK \
--cap-add=CHOWN \
gcr.io/datadoghq/agent:latest
```

`<DATADOG_API_KEY>`를 [Datadog API 키][1]로 교체합니다.

`docker-compose`를 사용한다면 Datadog 에이전트 서비스에 다음을 추가합니다.

```
version: '3'
services:
  datadog:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_SYSTEM_PROBE_NETWORK_ENABLED=true
      - DD_PROCESS_AGENT_ENABLED=true
      - DD_API_KEY=<DATADOG_API_KEY>
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /sys/kernel/debug:/sys/kernel/debug
    cap_add:
      - SYS_ADMIN
      - SYS_RESOURCE
      - SYS_PTRACE
      - NET_ADMIN
      - NET_BROADCAST
      - NET_RAW
      - IPC_LOCK
      - CHOWN
    security_opt:
      - apparmor:unconfined
```

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "ECS" %}}
 Amazon ECS를 설정하려면 [Amazon ECS][1] 설명서 페이지를 참조하세요.


[1]: /ko/agent/amazon_ecs/#network-performance-monitoring-collection-linux-only
{{% /tab %}}
{{< /tabs >}}

{{< site-region region="us,us3,us5,eu" >}}
### 향상된 확인 기능

옵션으로 클라우드 통합용 리소스 수집을 활성화하여 네트워크 성능 모니터링에서 클라우드 관리 엔터티를 검색할 수 있습니다.
- Azure 로드 밸런서 및 애플리케이션 게이트웨이에 대한 가시성을 확보하려면 [Azure 통합][1]을 설치하세요.
- AWS 로드 밸런서에 대한 가시성을 확보하기 위해  [AWS 통합][2]을 설치합니다. **ENI 및 EC2 메트릭 수집을 활성화해야 합니다**.

해당 기능에 대한 자세한 내용을 확인하려면 [향상된 클라우드 서비스 확인 기능][3]을 참조하세요.

  [1]: /integrations/azure
  [2]: /integrations/amazon_web_services/#resource-collection
  [3]: /network_monitoring/performance/network_analytics/#cloud-service-enhanced-resolution

{{< /site-region >}}

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/network_monitoring/dns/#setup
[3]: https://www.redhat.com/en/blog/introduction-ebpf-red-hat-enterprise-linux-7
[4]: /ko/network_monitoring/dns/
[5]: https://docs.datadoghq.com/ko/agent/docker/
[6]: https://docs.datadoghq.com/ko/agent/kubernetes/
[7]: https://docs.datadoghq.com/ko/agent/amazon_ecs
[8]: https://docs.datadoghq.com/ko/integrations/istio/
[9]: https://docs.datadoghq.com/ko/tracing/setup_overview/proxy_setup/?tab=istio
[10]: https://www.datadoghq.com/blog/istio-datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[12]: https://github.com/DataDog/chef-datadog
[13]: https://github.com/DataDog/ansible-datadog/blob/master/README.md#system-probe