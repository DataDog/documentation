---
description: Kubernetes, Docker, ECS 및 Windows 환경을 포함한 다양한 플랫폼에서 Datadog Agent를 사용하여
  Universal Service Monitoring(USM)을 구성합니다.
further_reading:
- link: /universal_service_monitoring/
  tag: Documentation
  text: Universal Service Monitoring에 대해 알아보기
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Universal Service Monitoring으로 초 단위의 핵심 신호 읽기
title: Universal Service Monitoring 설정
---
## 지원되는 버전 및 호환성

필수 Agent 버전
: Universal Service Monitoring은 컨테이너화된 서비스와 함께 설치된 Datadog Agent가 최소 6.40 또는 7.40 버전 이상이어야 합니다. 아래에 언급된 바와 같이 미리 보기에서 일부 기능은 더 높은 버전을 요구합니다.

지원되는 Linux 플랫폼
: Linux 커널 4.14 이상<br/>
CentOS 또는 RHEL 8.0 이상

지원되는 Windows 플랫폼
: Windows 2012 R2 이상

지원되는 애플리케이션 계층 프로토콜
: HTTP<br/>
HTTPS (OpenSSL)

알려진 제한사항
: Universal Service Monitoring은 Datadog의 `systemprobe` 사용을 요구하며, 이는 Google Kubernetes Engine(GKE) Autopilot에서는 지원되지 않습니다.

<div class="alert alert-info">
추가 프로토콜 및 트래픽 암호화 방식은 <a href="/universal_service_monitoring/additional_protocols/">미리 보기</a> 상태에 있습니다. 지원되기를 원하는 플랫폼 및 프로토콜에 대한 피드백이 있다면 <a href="/help/">지원팀에 문의</a>하세요.
</div>

## 전제 조건

 Linux의 경우:
     서비스가 컨테이너에서 실행 중이어야 합니다.
     **미리 보기 상태:** 컨테이너화되지 않은 서비스의 경우, [여기 지침](#additionalconfiguration)을 참조하세요.
 Windows의 경우:
     서비스가 가상 머신에서 실행 중이어야 합니다.
 Datadog Agent가 서비스와 함께 설치되어 있어야 합니다. 트레이싱 라이브러리 설치는 필요하지 _않습니다_.
 [Unified Service Tagging][1]을 위해 `env` 태그가 배포에 적용되어 있어야 합니다. `service` 및 `version` 태그는 선택 사항입니다.

## USM이 서비스 이름을 감지하는 방법

<div class="alert alert-warning">
Universal Service Monitoring은 프로세스가 시작될 때 존재하는 환경 변수를 통해 서비스 이름을 감지합니다. USM은 Linux에서는 `<code>/proc/PID/environ`</code>에서, Windows에서는 시스템 API를 통해 이러한 값을 읽습니다.
</div>

USM은 다음 환경 변수를 인식합니다.
 `DD_SERVICE`: 서비스 이름을 명시적으로 설정
 `DD_ENV`: 환경 태그 설정
 `DD_VERSION`: 버전 태그 설정
 `DD_TAGS`: 추가 태그, `service:name` 태그 포함 가능

### 주요 제한 사항: USM과 프로그래밍 방식으로 설정된 환경 변수(APM용)

애플리케이션 코드**내에서 프로그래밍 방식**으로 환경 변수를 설정한 경우(예: Java의 `System.setProperty("dd.service", "myservice")` 또는 .NET의 `Environment.SetEnvironmentVariable("DD_SERVICE", "myservice")`), 이 환경 변수는 USM에서 감지되지 **않습니다**. 하지만 이러한 값들은 APM 추적 계측에서 작동합니다.

USM이 Datadog Agent에서 별도 프로세스로 실행되며 사용자는 프로세스 시작 시점에 설정된 환경 변수만 볼 수 있기 때문입니다. 반면, APM 계측 라이브러리는 애플리케이션 프로세스 내에서 실행되므로 런타임 환경 변수 변경을 읽을 수 있습니다.

**USM이 올바르게 감지되도록 하려면 애플리케이션 시작 전에 환경 변수를 설정하세요.**

{{< tabs >}}
{{% tab "Docker" %}}

```yaml
environment:
  - DD_SERVICE=my-service
  - DD_ENV=production
```
{{% /tab %}}
{{% tab "Kubernetes" %}}

```yaml
env:
  - name: DD_SERVICE
    value: "my-service"
  - name: DD_ENV
    value: "production"
```
{{% /tab %}}
{{% tab "Shell" %}}

```bash
export DD_SERVICE=my-service
export DD_ENV=production
java -jar myapp.jar
```
{{% /tab %}}
{{< /tabs >}}

## Universal Service Monitoring 활성화

Agent에서 Universal Service Monitoring을 활성화하려면 서비스가 배포된 방식과 Agent 구성에 따라 다음 방법 중 하나를 사용합니다.

{{< tabs >}}
{{% tab "Helm" %}}

Datadog 차트 버전 2.26.2 이상을 사용하여 values 파일에 다음을 추가합니다.

```
datadog:
  ...
  serviceMonitoring:
    enabled: true
```

클러스터가 Google ContainerOptimized OS(COS) 사용하는 경우, values 파일에 다음을 추가합니다.

```
providers:
  gke:
    cos: true
```

클러스터가 Bottlerocket Linux 배포판을 사용하는 경우, values 파일에 다음을 추가합니다.

```
agents:
  containers:
    systemProbe:
      securityContext:
        seLinuxOptions:
          user: "system_u"
          role: "system_r"
          type: "spc_t"
          level: "s0"
```

{{% /tab %}}
{{% tab "Operator" %}}

Datadog Operator v1.0.0 이상이 필요합니다.

[Datadog Operator][1]를 사용하여 Universal Service Monitoring을 활성화하려면 `datadogagent.yaml` 매니페스트를 업데이트합니다. `DatadogAgent` 리소스에서 `spec.features.usm.enabled`를 `true`로 설정합니다.

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       credentials:
        apiSecret:
           secretName: datadog-secret
           keyName: api-key
        appSecret:
         secretName: datadog-secret
         keyName: app-key
     features:
       usm:
         enabled: true
   ```


[1]: https://github.com/DataDog/datadogoperator

{{% /tab %}}
{{% tab "Helm 없이 Kubernetes" %}}

1. `datadogagent` 템플릿에 `container.apparmor.security.beta.kubernetes.io/systemprobe: unconfined` 주석을 추가합니다.

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
2. Agent daemonset에서 환경 변수를 설정하여 Universal Service Monitoring을 활성화합니다. Agent 프로세스별 컨테이너를 실행 중인 경우, `processagent` 컨테이너에 환경 변수를 추가합니다. 그렇지 않은 경우, `agent` 컨테이너에 환경 변수를 추가합니다.

   ```yaml
   ...
     env:
       ...
       - name: DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED
         value: 'true'
       - name: DD_SYSTEM_PROBE_EXTERNAL
         value: 'true'
       - name: DD_SYSPROBE_SOCKET
         value: /var/run/sysprobe/sysprobe.sock
   ```

3. `datadogagent` 컨테이너에 다음과 같은 추가 볼륨을 마운트합니다.
   ```yaml
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'registry.datadoghq.com/agent:latest'
         ...
     volumeMounts:
       ...
       - name: sysprobe-socket-dir
       mountPath: /var/run/sysprobe
   ```

4. Agent의 사이드카로 새 `systemprobe` 컨테이너를 추가합니다.

   ```yaml
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'registry.datadoghq.com/agent:latest'
         ...
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
           - name: DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED
             value: 'true'
           - name: DD_SYSPROBE_SOCKET
             value: /var/run/sysprobe/sysprobe.sock
         resources: {}
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
           - name: modules
             mountPath: /lib/modules
             readOnly: true
           - name: src
             mountPath: /usr/src
             readOnly: true
           - name: runtime-compiler-output-dir
             mountPath: /var/tmp/datadog-agent/system-probe/build
           - name: kernel-headers-download-dir
             mountPath: /var/tmp/datadog-agent/system-probe/kernel-headers
             readOnly: false
           - name: apt-config-dir
             mountPath: /host/etc/apt
             readOnly: true
           - name: yum-repos-dir
             mountPath: /host/etc/yum.repos.d
             readOnly: true
           - name: opensuse-repos-dir
             mountPath: /host/etc/zypp
             readOnly: true
           - name: public-key-dir
             mountPath: /host/etc/pki
             readOnly: true
           - name: yum-vars-dir
             mountPath: /host/etc/yum/vars
             readOnly: true
           - name: dnf-vars-dir
             mountPath: /host/etc/dnf/vars
             readOnly: true
           - name: rhel-subscription-dir
             mountPath: /host/etc/rhsm
             readOnly: true
   ```

5. 매니페스트에 다음 볼륨을 추가합니다.
   ```yaml
   volumes:
     - name: sysprobe-socket-dir
       emptyDir: {}
     - name: procdir
       hostPath:
         path: /proc
     - name: debugfs
       hostPath:
         path: /sys/kernel/debug
     - hostPath:
         path: /lib/modules
       name: modules
     - hostPath:
         path: /usr/src
       name: src
     - hostPath:
         path: /var/tmp/datadog-agent/system-probe/build
       name: runtime-compiler-output-dir
     - hostPath:
         path: /var/tmp/datadog-agent/system-probe/kernel-headers
       name: kernel-headers-download-dir
     - hostPath:
         path: /etc/apt
       name: apt-config-dir
     - hostPath:
         path: /etc/yum.repos.d
       name: yum-repos-dir
     - hostPath:
         path: /etc/zypp
       name: opensuse-repos-dir
     - hostPath:
         path: /etc/pki
       name: public-key-dir
     - hostPath:
         path: /etc/yum/vars
       name: yum-vars-dir
     - hostPath:
         path: /etc/dnf/vars
       name: dnf-vars-dir
     - hostPath:
         path: /etc/rhsm
       name: rhel-subscription-dir

   ```

    **참고**: 클러스터가 Google ContainerOptimized OS(COS)에서 실행 중인 경우, 컨테이너 정의에서 다음을 제거하여 `src` 마운트를 제거합니다.
   ```yaml
    - name: src
      mountPath: /usr/src
      readOnly: true
   ```
    매니페스트에서도 다음을 제거합니다.
   ```yaml
    - hostPath:
        path: /usr/src
      name: src
   ```

6. 선택적 HTTPS 지원을 위해 `systemprobe` 컨테이너에 다음을 추가합니다.

   ```yaml
   env:
     - name: HOST_ROOT
       value: /host/root
   volumeMounts:
     - name: hostroot
       mountPath: /host/root
       readOnly: true
   ```

   매니페스트에 볼륨도 추가합니다.
   ```yaml
   volumes:
     - name: hostroot
       hostPath:
       path: /
   ```

{{% /tab %}}
{{% tab "Docker" %}}

`docker run` 명령어에 다음을 추가합니다.

```shell
docker run --cgroupns host \
--pid host \
-e DD_API_KEY="<DATADOG_API_KEY>" \
-e DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-v /proc/:/host/proc/:ro \
-v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /lib/modules:/lib/modules:ro \
-v /usr/src:/usr/src:ro \
-v /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build \
-v /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers \
-v /etc/apt:/host/etc/apt:ro \
-v /etc/yum.repos.d:/host/etc/yum.repos.d:ro \
-v /etc/zypp:/host/etc/zypp:ro \
-v /etc/pki:/host/etc/pki:ro \
-v /etc/yum/vars:/host/etc/yum/vars:ro \
-v /etc/dnf/vars:/host/etc/dnf/vars:ro \
-v /etc/rhsm:/host/etc/rhsm:ro \
-e HOST_ROOT=/host/root \
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

{{% /tab %}}
{{% tab "Docker Compose" %}}

`dockercompose.yml` 파일에 다음을 추가합니다.

```yaml
services:
  ...
  datadog:
    ...
    environment:
     - DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED='true'
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock:ro
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
     - /sys/kernel/debug:/sys/kernel/debug
     - /lib/modules:/lib/modules
     - /usr/src:/usr/src
     - /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build
     - /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers
     - /etc/apt:/host/etc/apt
     - /etc/yum.repos.d:/host/etc/yum.repos.d
     - /etc/zypp:/host/etc/zypp
     - /etc/pki:/host/etc/pki
     - /etc/yum/vars:/host/etc/yum/vars
     - /etc/dnf/vars:/host/etc/dnf/vars
     - /etc/rhsm:/host/etc/rhsm
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

선택적 HTTPS 지원을 위해 다음도 추가합니다.

```yaml
services:
  ...
  datadog:
    ...
    environment:
     - HOST_ROOT: '/host/root'
    volumes:
     - /:/host/root:ro
```

{{% /tab %}}
{{% tab "Docker Swarm" %}}

`Docker Swarm`은 아직 `security_opt` 변경을 지원하지 않으므로, 운영 체제에서
`apparmor` 인스턴스가 실행 중이지 않아야 합니다.

운영 체제에서 `apparmor` 인스턴스가 실행 중이 아니면, `DockerCompose` [섹션][1]의 동일한 `dockercompose.yml` 파일을 `security_opt` 필드 옆에 사용합니다.

[1]: /ko/universal_service_monitoring/setup/?tab=dockercompose#enablinguniversalservicemonitoring

{{% /tab %}}
{{% tab "구성 파일(Linux)" %}}

Helm 차트나 환경 변수를 사용하지 않는 경우, `systemprobe.yaml` 파일에 다음을 설정합니다.

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}
{{% tab "환경 변수(Linux)" %}}

Docker 및 ECS 설치에서처럼 `systemprobe`를 환경 변수로 구성하는 경우, 다음 환경 변수를 `processagent`와 `systemprobe` **모두**에 전달해야 합니다.

```yaml
DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true
```

{{% /tab %}}
{{% tab "Chef" %}}

노드에 다음 속성을 설정합니다.

```rb
node["datadog"]["system_probe"]["service_monitoring_enabled"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

`service_monitoring_enabled`를 설정합니다.

```conf
class { 'datadog_agent::system_probe':
    service_monitoring_enabled => true,
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

플레이북에 다음 속성을 추가합니다.

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}

{{% tab "ECS" %}}

ECS의 경우, 다음 JSON 작업 정의에서 USM과 시스템 프로브를 활성화합니다. 작업 정의를 [daemon 서비스][1]로 배포합니다.

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:7",
      "cpu": 500,
      "memory": 1024,
      "essential": true,
      "mountPoints": [
        ...
        {
          "containerPath": "/sys/kernel/debug",
          "sourceVolume": "sys_kernel_debug"
        },
        {
          "containerPath": "/host/proc",
          "sourceVolume": "proc"
        },
        {
          "containerPath": "/var/run/docker.sock",
          "sourceVolume": "var_run_docker_sock"
        },
        {
          "containerPath": "/host/sys/fs/cgroup",
          "sourceVolume": "sys_fs_cgroup"
        },
        {
          "readOnly": true,
          "containerPath": "/var/lib/docker/containers",
          "sourceVolume": "var_lib_docker_containers"
        },
        {
          "containerPath": "/lib/modules",
          "sourceVolume": "lib_modules"
        },
        {
          "containerPath": "/usr/src",
          "sourceVolume": "usr_src"
        },
        {
          "containerPath": "/var/tmp/datadog-agent/system-probe/build",
          "sourceVolume": "var_tmp_datadog_agent_system_probe_build"
        },
        {
          "containerPath": "/var/tmp/datadog-agent/system-probe/kernel-headers",
          "sourceVolume": "var_tmp_datadog_agent_system_probe_kernel_headers"
        },
        {
          "containerPath": "/host/etc/apt",
          "sourceVolume": "etc_apt"
        },
        {
          "containerPath": "/host/etc/yum.repos.d",
          "sourceVolume": "etc_yum_repos_d"
        },
        {
          "containerPath": "/host/etc/zypp",
          "sourceVolume": "etc_zypp"
        },
        {
          "containerPath": "/host/etc/pki",
          "sourceVolume": "etc_pki"
        },
        {
          "containerPath": "/host/etc/yum/vars",
          "sourceVolume": "etc_yum_vars"
        },
        {
          "containerPath": "/host/etc/dnf/vars",
          "sourceVolume": "etc_dnf_vars"
        },
        {
          "containerPath": "/host/etc/rhsm",
          "sourceVolume": "etc_rhsm"
        }
      ],
      "environment": [
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_DATADOG_API_KEY>"
        },
        ...
        {
          "name": "DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED",
          "value": "true"
        }
      ],
      "linuxParameters": {
        "capabilities": {
          "add": [
            "SYS_ADMIN",
            "SYS_RESOURCE",
            "SYS_PTRACE",
            "NET_ADMIN",
            "NET_BROADCAST",
            "NET_RAW",
            "IPC_LOCK",
            "CHOWN"
          ]
        }
      }
    }
  ],
  "requiresCompatibilities": [
    "EC2"
  ],
  "volumes": [
    ...
    {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "sys_kernel_debug"
    },
    {
      "host": {
        "sourcePath": "/proc/"
      },
      "name": "proc"
    },
    {
      "host": {
        "sourcePath": "/var/run/docker.sock"
      },
      "name": "var_run_docker_sock"
    },
    {
      "host": {
        "sourcePath": "/sys/fs/cgroup/"
      },
      "name": "sys_fs_cgroup"
    },
    {
      "host": {
        "sourcePath": "/var/lib/docker/containers/"
      },
      "name": "var_lib_docker_containers"
    },
    {
      "host": {
        "sourcePath": "/lib/modules"
      },
      "name": "lib_modules"
    },
    {
      "host": {
        "sourcePath": "/usr/src"
      },
      "name": "usr_src"
    },
    {
      "host": {
        "sourcePath": "/var/tmp/datadog-agent/system-probe/build"
      },
      "name": "var_tmp_datadog_agent_system_probe_build"
    },
    {
      "host": {
        "sourcePath": "/var/tmp/datadog-agent/system-probe/kernel-headers"
      },
      "name": "var_tmp_datadog_agent_system_probe_kernel_headers"
    },
    {
      "host": {
        "sourcePath": "/etc/apt"
      },
      "name": "etc_apt"
    },
    {
      "host": {
        "sourcePath": "/etc/yum.repos.d"
      },
      "name": "etc_yum_repos_d"
    },
    {
      "host": {
        "sourcePath": "/etc/zypp"
      },
      "name": "etc_zypp"
    },
    {
      "host": {
        "sourcePath": "/etc/pki"
      },
      "name": "etc_pki"
    },
    {
      "host": {
        "sourcePath": "/etc/yum/vars"
      },
      "name": "etc_yum_vars"
    },
    {
      "host": {
        "sourcePath": "/etc/dnf/vars"
      },
      "name": "etc_dnf_vars"
    },
    {
      "host": {
        "sourcePath": "/etc/rhsm"
      },
      "name": "etc_rhsm"
    }
  ],
  "family": "datadog-agent-task"
}
```

운영 체제 이미지가 Ubuntu 또는 Debian인 경우, `environment` 이후에 다음을 추가합니다.

```yaml
"dockerSecurityOptions": [
  "apparmor:unconfined"
]
```

선택적 HTTPS 지원을 위해 다음도 추가합니다.

```yaml
"mountPoints": [
  ...
  {
    "containerPath": "/host/root",
    "sourceVolume": "host_root"
  },
  ...
]
...
"volumes": [
  ...
  {
    "host": {
      "sourcePath": "/"
    },
    "name": "host_root"
  },
  ...
]
```

로드 밸런서를 사용하는 서비스가 있다면, Universal Service Monitoring이 클라우드 관리 엔터티를 발견할 수 있도록 추가 클라우드 통합을 활성화합니다.

1. AWS Load Balancer 가시성을 위해 [AWS Integration][2]을 설치합니다.
2. ENI 및 EC2 메트릭 수집을 활성화합니다.
3. 각 로드 밸런서에 다음 태그를 추가합니다.
   ```conf
   ENV=<env>
   SERVICE=<service>
   ```

[1]: /ko/containers/amazon_ecs/?tab=awscli#runtheagentasadaemonservice
[2]: /ko/integrations/amazon_web_services/
{{% /tab %}}

{{% tab "Windows" %}}

**IIS에서 실행 중인 서비스의 경우:**

1. 네트워크 커널 장치 드라이버 구성 요소가 활성화된 [Datadog Agent][1](버전 6.41 이상 또는 7.41 이상)를 설치합니다.
   Agent 버전 7.44 이하에서는 설치 중 `msiexec` 명령에 `ADDLOCAL="MainApplication,NPM"`를 전달하거나, GUI를 통해 Agent를 설치할 때 **Cloud Network Monitoring**을 선택해야 합니다.

2. `C:\ProgramData\Datadog\systemprobe.yaml`을 편집하여 enabled 플래그를 `true`로 설정합니다.

   ```yaml
   service_monitoring_config:
     enabled: true
   ```
**비IIS 서비스의 경우:**

Agent 버전 7.57부터는 비IIS 서비스 발견이 기본적으로 활성화됩니다. 이전 버전의 Agent는 `systemprobe.yaml`에 다음과 같은 구성 변경이 필요할 수 있습니다.

```yaml
service_monitoring_config:
  enabled: true
  process_service_inference:
    enabled: true
```

<div class="alert alert-warning">
<strong>비IIS Windows 서비스의 중요한 제한 사항:</strong> Windows에서 Universal Service Monitoring은 HTTPS 트래픽 모니터링을 위해 <code>MicrosoftWindowsHttpService</code> 공급자를 통한 ETW(Windows용 이벤트 추적)를 사용합니다. 이 ETW 공급자는 IIS 기반 서비스에만 사용할 수 있습니다. 비IIS 서비스(예: 사용자 지정 .NET 애플리케이션, Node.js 서버, Java 서버 또는 Windows에서 실행되는 기타 HTTP 서버)는 USM을 통한 <strong>HTTPS 모니터링을 지원하지 않습니다</strong>. 비IIS Windows 서비스에서는 일반 HTTP 트래픽만 모니터링할 수 있습니다.
</div>

### IIS 및 비IIS 서비스 지원

| 서비스 유형     | HTTP 트래픽 모니터링 | HTTPS 트래픽 모니터링 |
|   |  |  |
| IIS 서비스     | 지원됨 | 지원됨               |
| 비IIS 서비스 | 지원됨 | **지원되지 않음** |

   
[1]: /ko/agent/basic_agent_usage/windows/?tab=commandline
{{% /tab %}}

{{< /tabs >}}

## 추가 구성

다음 시스템 또는 서비스는 추가 구성이 필요합니다.

{{< collapse-content title="Linux에서 비컨테이너화된 서비스" level="h4" >}}
<div class="alert alert-info">
Universal Service Monitoring은 Linux 가상 머신에서 베어메탈로 실행되는 서비스를 모니터링할 수 있습니다.
</div>

Agent 버전 7.42 이상이 필요합니다.

{{< tabs >}}
{{% tab "구성 파일" %}}

`systemprobe.yaml`에 다음 구성을 추가합니다.

```yaml
service_monitoring_config:
  enabled: true
  process_service_inference:
    enabled: true
```

{{% /tab %}}
{{% tab "환경 변수" %}}

```conf
DD_SYSTEM_PROBE_PROCESS_SERVICE_INFERENCE_ENABLED=true
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="Go TLS 모니터링" level="h4" >}}
<div class="alert alert-info">
Universal Service Monitoring은 Golang으로 구현된 서비스의 TLS 암호화 트래픽을 모니터링하기 위해 미리 보기 상태로 제공됩니다.
</div>

<strong>참고</strong>:
<br>
<ul role="list">
  <li>Go HTTPS 서버는 HTTP1.1 프로토콜을 미리 보기 상태에서 지원되는 HTTP/2로 업그레이드할 수 있습니다. 자세한 내용은 계정 관리자에게 문의하세요.</li>
  <li>Agent 버전 7.51 이상이 필요합니다.</li>
</ul>

{{< tabs >}}
{{% tab "구성 파일" %}}

`systemprobe.yaml`에 다음 구성을 추가합니다.

```yaml
service_monitoring_config:
  enabled: true
  tls:
    go:
      enabled: true
```

{{% /tab %}}
{{% tab "환경 변수" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_GO_ENABLED=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_TLS_GO_ENABLED
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="Node.js TLS 모니터링" level="h4" >}}

<div class="alert alert-info">
Universal Service Monitoring은 Node.js로 구현된 서비스의 HTTP, HTTP/2 및 gRPC 요청을 모니터링하기 위해 미리 보기 상태로 제공됩니다.
</div>

Agent 버전 7.54 이상이 필요합니다.

{{< tabs >}}
{{% tab "구성 파일" %}}

`systemprobe.yaml`에 다음 구성을 추가합니다.

```yaml
service_monitoring_config:
  enabled: true
  tls:
    nodejs:
      enabled: true
```

{{% /tab %}}
{{% tab "환경 변수" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_NODEJS_ENABLED=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_TLS_NODEJS_ENABLED
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="Istio 모니터링" level="h4" >}}

Universal Service Monitoring은 <a href="https://istio.io/latest/docs/tasks/security/authentication/mtls-migration/">Istio mTLS</a> 뒤에서 실행되는 서비스를 모니터링하고, 암호화된 HTTPS, HTTP/2, gRPC 트래픽을 캡처할 수 있습니다.

Agent 버전 7.50 이상이 필요합니다.

{{< tabs >}}
{{% tab "구성 파일" %}}

`systemprobe.yaml`에 다음 구성을 추가합니다.

```yaml
service_monitoring_config:
  enabled: true
  tls:
    istio:
      enabled: true
```

{{% /tab %}}
{{% tab "환경 변수" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_ISTIO_ENABLED=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_TLS_ISTIO_ENABLED
          value: "true"
```

{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="HTTP/2 모니터링" level="h4" >}}
Universal Service Monitoring은 HTTP/2 및 gRPC 트래픽을 캡처할 수 있습니다.

<strong>참고</strong>:
<br>
<ul role="list">
  <li>Linux 커널 버전 5.2 이상이 필요합니다.</li>
  <li>Agent 버전 7.53 이상이 필요합니다.</li>
</ul>

{{< tabs >}}
{{% tab "구성 파일" %}}

`systemprobe.yaml`에 다음 구성을 추가합니다.

```yaml
service_monitoring_config:
  enable_http2_monitoring: true
```

{{% /tab %}}
{{% tab "환경 변수" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_ENABLE_HTTP2_MONITORING=true
```
{{% /tab %}}
{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_ENABLE_HTTP2_MONITORING
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="Kafka 모니터링(미리 보기)" level="h4" >}}

<div class="alert alert-info">
Kafka 모니터링은 <strong>미리 보기</strong> 상태에서 사용 가능합니다.
</div>

<strong>참고</strong>:
<br>
<ul role="list">
  <li>프로듀서와 컨슈머는 Linux 커널 버전 5.2 이상이 필요합니다.</li>
  <li>프로듀서와 컨슈머는 TLS <strong>없이</strong> Kafka와 인터페이스해야 합니다.</li>
  <li>Agent 버전 7.53 이상이 필요합니다.</li>
</ul>

{{< tabs >}}
{{% tab "구성 파일" %}}

`systemprobe.yaml`에 다음 구성을 추가합니다.

```yaml
service_monitoring_config:
  enabled: true
  enable_kafka_monitoring: true
```

{{% /tab %}}
{{% tab "환경 변수" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_ENABLE_KAFKA_MONITORING=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
datadog:
  ...
  serviceMonitoring:
    enabled: true

agents:
  ...
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_ENABLE_KAFKA_MONITORING
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}


## 경로 제외 및 대체

`http_replace_rules` 또는 `DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES`를 사용하여 정규식과 일치하는 HTTP 엔드포인트를 제거하거나 다른 형식으로 변환하도록 Agent를 구성할 수 있습니다.

{{< tabs >}}
{{% tab "구성 파일" %}}

다음 구성을 `systemprobe`에 추가합니다.

```yaml
network_config:
  http_replace_rules:
    - pattern: "<exclusion rule>"
      repl: ""
    - pattern: "<replacement rule>"
      repl: "<new format>"
```

예를 들어, `/api/`로 시작하는 엔드포인트(예: `/api/v1/users`)를 제거할 수 있습니다. 단, `/api` 또는 `/users/api`는 삭제하지 않습니다.

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/.*"
      repl: ""
```

다음 구성은 엔드포인트 `/api/users`를 새 형식의 `/api/v1/users`에 맞춰 대체합니다.

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/users"
      repl: "/api/v1/users"
```

{{% /tab %}}
{{% tab "환경 변수" %}}
다음 항목을 추가합니다.

```conf
DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES=[{"pattern":"<drop regex>","repl":""},{"pattern":"<replace regex>","repl":"<replace pattern>"}]
```
{{% /tab %}}
{{% tab "Helm" %}}

다음 예제는 `/myapi` 엔드포인트를 제거하고 `/myapi2`를 `/newversion`으로 대체합니다.

```yaml
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES
          value: '[{"pattern":"/my-api","repl":""},{"pattern":"/my-api-2","repl":"/new-version"}]'
```

{{% /tab %}}
{{< /tabs >}}


<div class="alert alert-info"><strong>추가 프로토콜 및 암호화 방식 지원</strong><p>USM은 미리 보기 단계에서 클라우드 서비스 발견 및 추가 프로토콜과 트래픽 암호화 방식 디코딩을 지원합니다. 자세한 정보와 미리 보기 액세스 요청은 <a href="/universal_service_monitoring/additional_protocols/">클라우드 서비스 발견 및 추가 프로토콜</a>.을 참고하세요.</p></div>


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging