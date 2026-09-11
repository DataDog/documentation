---
aliases:
- /ko/network_performance_monitoring/installation/
- /ko/network_monitoring/performance/setup
description: Agent를 사용하여 네트워크 데이터를 수집합니다.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: 블로그
  text: Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/monitor-containers-with-npm/
  tag: 블로그
  text: 컨테이너 및 서비스 메시 네트워크가 포함된 Datadog CNM
- link: /network_monitoring/devices
  tag: 설명서
  text: Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: 블로그
  text: Datadog CNM은 이제 Consul 네트워킹을 지원합니다.
- link: https://www.datadoghq.com/blog/cnm-kubernetes-egress/
  tag: 블로그
  text: Datadog Cloud Network Monitoring이 대규모 환경에서 기본 거부 네트워크 송신 정책으로 전환하는 데 도움이 되는
    방법
- link: /network_monitoring/cloud_network_monitoring/glossary
  tag: 문서
  text: CNM 용어 및 개념
title: Cloud Network Monitoring 설정
---
Datadog Cloud Network Monitoring(CNM)은 서비스, 컨테이너, Availability Zone 및 Datadog의 기타 태그 간 네트워크 트래픽에 대한 가시성을 제공하여 다음 작업을 수행할 수 있습니다.

- 예상치 못한 또는 숨겨진 서비스 종속성 파악
- 비용이 많이 드는 리전 간 또는 멀티 클라우드 통신 최적화
- 클라우드 공급자 리전 및 타사 도구의 운영 중단 파악
- DNS 서버 메트릭으로 서비스 검색 문제 해결

Cloud Network Monitoring을 사용하려면 [Datadog Agent v6.14 이상][1]이 필요합니다. 상위 버전의 Agent에서는 메트릭이 자동 수집되므로 DNS Monitoring 구성은 [메트릭 설정 섹션][2]을 참조하세요.

## 지원 플랫폼 {#supported-platforms}

### 운영 체제 {#operating-systems}

#### Linux OS {#linux-os}

데이터 수집은 eBPF를 사용하여 실행되므로 Datadog에 기본 Linux 커널 버전이 최소 4.4.0 이상이거나 eBPF 기능이 백포트된 플랫폼이 필요합니다. CNM은 다음 Linux 배포판을 지원합니다.

- Ubuntu 16.04 이상
- Debian 9 이상
- Fedora 26 이상
- SUSE 15 이상
- Amazon AMI 2016.03 이상
- Amazon Linux 2
- CentOS/RHEL 7.6 이상

**참고:** [CentOS/RHEL 7.6 이상][3]에 대한 4.4.0+ 커널 요구 사항의 예외가 있습니다. [DNS Resolution][4] 기능은 CentOS/RHEL 7.6에서 지원되지 않습니다.

#### Windows OS {#windows-os}

데이터 수집은 네트워크 커널 장치 드라이버를 사용하여 진행됩니다. Windows 버전 2012 R2 (및 Windows 10을 포함한 동급 데스크톱 OS) 이상에서, Datadog Agent 버전 7.27.1부터 지원됩니다.

#### macOS {#macos}

Datadog Cloud Network Monitoring은 macOS 플랫폼을 지원하지 않습니다.

### 컨테이너 {#containers}

CNM은 [Docker][5], [Kubernetes][6], [ECS][7] 및 기타 컨테이너 기술에 대한 지원을 통해 컨테이너화되고 오케스트레이션된 환경의 아키텍처와 성능을 시각화하는 데 도움을 줍니다. Datadog의 컨테이너 통합 기능을 사용하면 `container_name`, `task_name`, `kube_service`과 같은 기본 제공 태그를 통해 컨테이너, 작업, 포드, 클러스터 및 배포와 같은 의미 있는 엔터티별로 트래픽을 집계할 수 있습니다.

### 네트워크 라우팅 도구 {#network-routing-tools}

#### Istio {#istio}

CNM을 사용하면 Istio 서비스 메시를 통해 컨테이너, 포드, 서비스 간의 네트워크 통신을 매핑할 수 있습니다.

Datadog은 Istio 환경의 모든 부분을 모니터링하므로 다음과 같은 작업을 할 수 있습니다.

- [로그][8]로 Envoy와 Istio 컨트롤 패널의 상태를 평가합니다.
- 요청, 대역폭, 리소스 소비 [메트릭][8]을 활용해 서비스 메시의 성능을 분석합니다.
- 메시를 통해 [APM][9]으로 트랜잭션하는 애플리케이션에 대한 분산 트레이스를 검토합니다.

CNM은 [Datadog Agent v7.24.1 이상][1]에서 Istio v1.6.4 이상을 지원합니다.

Datadog으로 Istio 환경을 모니터링하는 방법에 대해 자세히 살펴보려면 [Istio 블로그][10]를 참조하세요.

#### Cilium {#cilium}

Cloud Network Monitoring은 다음 요구 사항이 충족되는 경우 **Cilium** 설치와 호환됩니다.
1) Cilium 버전 1.6 이상, 그리고
2) 커널 버전 5.1.16 이상 또는 4.19.x 커널의 경우 4.19.57 이상

### 프로비저닝 시스템 {#provisioning-systems}

CNM은 다음과 같은 프로비저닝 시스템 사용을 지원합니다.

- Daemonset / Helm 1.38.11 이상: [Datadog Helm 차트][11] 참조
- Chef 12.7 이상: [Datadog 셰프 레시피][12] 참조.
- Ansible 2.6 이상: [Datadog Ansible 역할][13] 참조

## 설정 {#setup}

Cloud Network Monitoring은 네트워크 엔드포인트 _간의_ 트래픽을 분석하고 네트워크 종속성을 매핑하도록 설계되었습니다. Datadog은 가치를 극대화하기 위해 인프라의 의미 있는 일부 및 **_최소 2개의 호스트_**에 CNM을 설치할 것을 권장합니다.

{{< tabs >}}
{{% tab "Agent(Linux)" %}}

Datadog Agent에서 Cloud Network Monitoring을 활성화하려면 다음 구성을 사용합니다.

1. **사용 중인 Agent가 6.14 이전 버전인 경우**, 먼저 [실시간 프로세스 수집][1]을 활성화하세요. 그렇지 않은 경우에는 이 단계를 건너뜁니다.

2. system-probe 예제 구성 파일을 복사합니다.

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. `/etc/datadog-agent/system-probe.yaml`을 편집하여 enable 플래그를 `true`로 설정합니다.

    ```yaml
    network_config:   # use system_probe_config for Agent's older than 7.24.1
      ## @param enabled - boolean - optional - default: false
      ## Set to true to enable Cloud Network Monitoring.
      #
      enabled: true
    ```

    **Optional**: To monitor DNS traffic on non-standard ports (Agent v7.76.0+), add the `dns_monitoring_ports` option:

    ```yaml
    network_config:
      enabled: true
      dns_monitoring_ports:
        - 53
        - 5353
    ```

4. **6.18 또는 7.18 이전 버전의 Agent를 실행 중인 경우** 수동으로 시스템 프로브를 시작하고, 부팅 시 시작하도록 설정합니다(6.18 및 7.18 버전부터는 Agent가 시작될 때 system-probe가 자동으로 시작됨).

    ```shell
    sudo systemctl start datadog-agent-sysprobe
    sudo systemctl enable datadog-agent-sysprobe
    ```

    **Note**: If the `systemctl` command is not available on your system, start it with following command instead: `sudo service datadog-agent-sysprobe start` and then set it up to start on boot before `datadog-agent` starts.

5. [Agent를 재시작][2]합니다.

    ```shell
    sudo systemctl restart datadog-agent
    ```

    **Note**: If the `systemctl` command is not available on your system, run the following command instead: `sudo service datadog-agent restart`

### SELinux 지원 시스템 {#selinux-enabled-systems}

SELinux가 활성화된 시스템에서 시스템 프로브 바이너리가 eBPF 기능을 사용하려면 특별 권한이 필요합니다.

CentOS 기반 시스템용 Datadog Agent RPM 패키지는 시스템 프로브 바이너리에 해당 권한을 부여할 목적으로 [SELinux 정책][3]을 번들로 제공합니다.

SELinux가 활성화된 다른 시스템에서 Cloud Network Monitoring을 사용해야 한다면 다음 작업을 수행합니다.

1. 기본 [SELinux 정책][3]을 SELinux 구성에 맞게 수정합니다.
    시스템에 따라 일부 유형 또는 속성은 존재하지 않거나 이름이 다를 수 있습니다.

2. 정책 파일의 이름이 `system_probe_policy.te`라고 가정할 때 정책을 모듈로 컴파일합니다.

    ```shell
    checkmodule -M -m -o system_probe_policy.mod system_probe_policy.te
    semodule_package -o system_probe_policy.pp -m system_probe_policy.mod
    ```

3. 모듈을 SELinux 시스템에 적용합니다.

    ```shell
    semodule -v -i system_probe_policy.pp
    ```

4. Agent 설치 디렉터리가 `/opt/datadog-agent`라고 가정할 때 system-probe 바이너리의 SELinux 유형을 정책에 정의된 유형으로 변경합니다.

    ```shell
    semanage fcontext -a -t system_probe_t /opt/datadog-agent/embedded/bin/system-probe
    restorecon -v /opt/datadog-agent/embedded/bin/system-probe
    ```

5. [Agent를 재시작][2]합니다.

**참고**: 이 지침을 따르려면 시스템에 SELinux 유틸리티(`checkmodule`, `semodule`, `semodule_package`, `semanage` 및 `restorecon`)가 설치되어 있어야 하며, 이는 대부분의 표준 배포판(Ubuntu, Debian, RHEL, CentOS, SUSE)에서 사용할 수 있습니다. 설치 방법에 대한 자세한 내용은 배포판을 확인하세요.

배포판에 해당 유틸리티가 없는 경우, 동일한 절차를 따르되 배포판에서 제공하는 유틸리티를 대신 사용합니다.


[1]: /ko/infrastructure/process/?tab=linuxwindows#installation
[2]: /ko/agent/configuration/agent-commands/#restart-the-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/selinux/system_probe_policy.te
{{% /tab %}}
{{% tab "Agent(Windows)" %}}

Windows용 데이터 수집은 네트워크 데이터 수집용 필터 드라이버에 의존합니다.

Windows 호스트에서 Cloud Network Monitoring을 활성화하려면 다음 작업을 수행합니다.

1. [Datadog Agent][1](버전 7.27.1 이상)를 네트워크 드라이버 구성 요소를 활성화한 상태에서 설치합니다.

   [사용 중단됨] _(버전 7.44 이하)_ 설치 시 `msiexec` 명령에 `ADDLOCAL="MainApplication,NPM"`을 전달하거나, GUI를 통해 Agent 설치 프로그램을 실행할 때 "Cloud Network Monitoring"을 선택합니다.

2. `C:\ProgramData\Datadog\system-probe.yaml`을 편집하여 enabled 플래그를 `true`로 설정합니다.

    ```yaml
    network_config:
        enabled: true
    ```

    **Optional**: To monitor DNS traffic on non-standard ports (Agent v7.76.0+), add the `dns_monitoring_ports` option:

    ```yaml
    network_config:
        enabled: true
        dns_monitoring_ports:
            - 53
            - 5353
    ```

3. [Agent를 재시작][2]합니다.

    PowerShell(`powershell.exe`)의 경우:
    ```shell
    restart-service -f datadogagent
    ```
    For Command Prompt (`cmd.exe`):
    ```shell
    net /y stop datadogagent && net start datadogagent
    ```
**참고**: Cloud Network Monitoring은 Windows 호스트만 모니터링하며 Windows 컨테이너는 지원하지 않습니다.


[1]: /ko/agent/basic_agent_usage/windows/?tab=commandline
[2]: /ko/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Helm" %}}

Helm을 사용하여 Kubernetes에서 Cloud Network Monitoring을 활성화하려면 `values.yaml` 파일에 다음 설정을 추가하세요.</br>
**참고:** Helm 차트 v3.135.3 이상이 필요합니다. 자세한 내용을 보려면 [Datadog Helm Chart 설명서][1]를 참조하세요.

  ```yaml
  datadog:
    ...
    networkMonitoring:
      enabled: true
  ```

**선택 사항**: 비표준 포트에서 DNS 트래픽을 모니터링하려면(Agent v7.76.0 이상), `dnsMonitoringPorts` 옵션을 추가하세요.

  ```yaml
  datadog:
    networkMonitoring:
      enabled: true
      dnsMonitoringPorts:
        - 53
        - 5353
  ```

환경에 따라 다음 추가 단계가 필요할 수 있습니다.

{{< collapse-content title="Google GKE Autopilot" level="h4" >}}

클러스터가 Google의 GKE Autopilot을 실행 중인 경우, values 파일에 다음을 추가합니다.

```
providers:
  gke:
    autopilot: true
```

{{< /collapse-content >}}

{{< collapse-content title="Google Container-Optimized OS(COS)" level="h4" >}}

클러스터가 Google Container-Optimized OS(COS)를 실행 중인 경우, values 파일에 다음을 추가합니다.

```
providers:
  gke:
    cos: true
```


{{< /collapse-content >}}

{{< collapse-content title="Bottlerocket Linux" level="h4" >}}

클러스터가 Bottlerocket Linux 배포판을 사용하는 경우, values 파일에 다음을 추가합니다.

```
agents:
  containers:
    systemProbe:
      securityContext:
        seLinuxOptions:
          user: "system_u"
          role: "system_r"
          type: "super_t"
          level: "s0"
```

{{< /collapse-content >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#enabling-npm-collection

{{% /tab %}}
{{% tab "Helm을 사용하지 않는 Kubernetes" %}}

Helm을 사용하지 않는다면 처음부터 Kubernetes에서 Cloud Network Monitoring을 활성화할 수 있습니다.

1. [datadog-agent.yaml 매니페스트][1] 템플릿을 다운로드합니다.
2. `<DATADOG_API_KEY>`를 [Datadog API 키][2]로 대체합니다.
3. 선택 사항 - **Datadog 사이트를 설정**합니다. Datadog EU 사이트를 사용 중이라면, `datadog-agent.yaml` 매니페스트의`DD_SITE` 환경 변수를 `datadoghq.eu`로 설정합니다.
다음 명령으로 4. **DaemonSet을 배포**합니다.

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

이미 [매니페스트와 함께 실행 중인 Agent][3]가 있는 경우:

1. Kubernetes 버전 `1.30` 이하에서는 `datadog-agent` 템플릿에 지정된 주석 `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined`을 추가합니다.

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
    For Kubernetes versions `1.30+`, add the following `securityContext` on the `datadog-agent` template:

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
            spec:
                serviceAccountName: datadog-agent
                securityContext:
                  appArmorProfile:
                    type: Unconfined
                containers:
                # (...)
    ```

2. Agent DaemonSet에서 다음 환경 변수를 사용하여 프로세스 수집 및 시스템 프로브를 활성화합니다. Agent 프로세스별 컨테이너를 실행 중인 경우, 다음 환경 변수를 Process Agent 컨테이너에 추가하고, 그렇지 않으면 Agent 컨테이너에 추가합니다.

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
                          - name: DD_AUTH_TOKEN_FILE_PATH
                            value: /etc/datadog-agent/auth/token
    ```

3. `datadog-agent` 컨테이너에 다음과 같은 추가 볼륨을 마운트합니다.

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'registry.datadoghq.com/agent:latest'
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
                      - name: auth-token
                        mountPath: /etc/datadog-agent/auth
                        readOnly: false # needs RW to write auth token
    ```

4. Agent에 새 system-probe를 사이드카로 추가합니다.

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'registry.datadoghq.com/agent:latest'
                    # (...)
                    - name: system-probe
                      image: 'registry.datadoghq.com/agent:latest'
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
                          - name: DD_SYSTEM_PROBE_ENABLED
                            value: 'true'
                          - name: DD_SYSPROBE_SOCKET
                            value: /var/run/sysprobe/sysprobe.sock
                          - name: DD_AUTH_TOKEN_FILE_PATH
                            value: /etc/datadog-agent/auth/token
                      resources:
                          requests:
                              memory: 150Mi
                              cpu: 200m
                          limits:
                              memory: 300Mi
                              cpu: 400m
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
                          - name: auth-token
                            mountPath: /etc/datadog-agent/auth
                            readOnly: true
    ```

5. 마지막으로 매니페스트에 다음 볼륨을 추가합니다.

    ```yaml
                volumes:
                    - name: debugfs
                      hostPath:
                          path: /sys/kernel/debug
                    - name: sysprobe-socket-dir
                      emptyDir: { }
                    - name: auth-token
                      emptyDir: { }
    ```

[1]: /ko/resources/yaml/datadog-agent-npm.yaml
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ko/agent/kubernetes/

{{% /tab %}}
{{% tab "Operator" %}}

[Datadog Operator][1]는 Kubernetes 및 OpenShift에서 Datadog Agent를 배포하는 과정을 간소화합니다. 사용자 지정 리소스 상태를 통해 배포 상태, 상태 및 오류 보고를 제공하며, 상위 수준 구성 옵션을 통해 구성 오류의 위험을 줄입니다.

Datadog Operator에서 Cloud Network Monitoring을 활성화하려면 다음 구성을 사용합니다.

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

[1]: /ko/containers/datadog_operator 
{{% /tab %}}
{{% tab "Docker" %}}

Docker에서 Cloud Network Monitoring을 활성화하려면 컨테이너 Agent를 시작할 때 다음 구성을 사용하세요.

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
registry.datadoghq.com/agent:latest
```

`<DATADOG_API_KEY>`를 [Datadog API 키][1]로 대체합니다.

`docker-compose`를 사용한다면 Datadog Agent 서비스에 다음을 추가합니다.

```shell
version: '3'
services:
  datadog:
    image: "registry.datadoghq.com/agent:latest"
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
Amazon ECS에서 CNM을 설정하려면 [Amazon ECS][1] 설명서 페이지를 참조하세요.


[1]: /ko/agent/amazon_ecs/#network-performance-monitoring-collection-linux-only
{{% /tab %}}

{{% tab "ECS Fargate" %}}

<div class="alert alert-info">ECS Fargate용 CNM은 현재 미리보기 상태입니다. Datadog 담당자에게 연락하여 등록하세요.</div>

ECS Fargate에서 Cloud Network Monitoring을 활성화하려면 다음 지침을 사용하세요.

**Agent 버전 `7.58` 이상이 필요합니다**.

- 새로운 Fargate 배포의 경우, Fargate 호스트에서 [프로세스 수집][1]을 활성화하여 Datadog Agent가 ECS의 Fargate 환경을 모니터링하도록 구성합니다.

- 기존 배포의 경우, `task.json` 파일을 업데이트하여 다음 구성 설정을 포함합니다.

```json
{
 "containerDefinitions": [
   (...)
     "environment": [
       (...)
       {
         "name": "DD_SYSTEM_PROBE_NETWORK_ENABLED",
         "value": "true"
       },
       {
          "name": "DD_NETWORK_CONFIG_ENABLE_EBPFLESS",
          "value": "true"
       },
       {
          "name": "DD_PROCESS_AGENT_ENABLED",
          "value": "true"
       }      
     ],
     "linuxParameters": {
      "capabilities": {
        "add": [
          "SYS_PTRACE"
        ]
      }
    },
 ],
}
```
[1]: /ko/integrations/ecs_fargate/?tab=webui#process-collection 

{{% /tab %}}
{{< /tabs >}}

{{< site-region region="us,us3,us5,eu" >}}
### 향상된 해상도 {#enhanced-resolution}

원할 경우, 클라우드 통합용 리소스 수집을 활성화하면 Cloud Network Monitoring에서 클라우드 관리형 엔터티를 검색할 수 있습니다.
- AWS Load Balancer 및 애플리케이션 게이트웨이에 대한 가시성을 확보하려면 [Azure 통합][101]을 설치합니다.
- AWS Load Balancer 가시성을 확보하려면 [AWS 통합][102]을 설치합니다. **ENI 및 EC2 메트릭 수집을 활성화해야 합니다.**.

이러한 기능에 대한 자세한 내용은 [Cloud service enhanced resolution][103]을 참조하세요.

[101]: /ko/integrations/azure
[102]: /ko/integrations/amazon_web_services/#resource-collection
[103]: /ko/network_monitoring/cloud_network_monitoring/network_analytics/#cloud-service-enhanced-resolution

{{< /site-region >}}

### 실패한 연결 {#failed-connections}

Failed Connections는 [재설정, 거부 및 시간 초과][14]을 포함한 TCP 실패의 수집 및 보고를 허용합니다. 이 기능은 Agent 버전 `7.59+`부터 기본적으로 활성화되어 있으며, [CNM 분석][15] 페이지의 **Customize** 메뉴에서 **Failures** 토글을 켜서 사용할 수 있습니다.

**참고**: 인프라의 일부 Agent가 `7.59`보다 이전 버전을 실행 중인 경우 실패 연결 수가 실제보다 적게 보고될 수 있습니다. CNM은 _모든_ 호스트에서 동일한 Agent 버전을 유지할 것을 권장합니다.

{{< img src="network_performance_monitoring/setup/cnm_tcp_failures_toggle.png" alt="CNM Customize 메뉴에서 Failures 토글을 강조 표시한 스크린샷" style="width:50%;">}}

## 추가 자료 {#further-reading}
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
[14]: /ko/network_monitoring/cloud_network_monitoring/network_analytics/?tab=loadbalancers#tcp
[15]: https://app.datadoghq.com/network