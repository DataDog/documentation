---
app_id: containerd
categories:
- 컨테이너
- 쿠버네티스(Kubernetes)
custom_kind: 통합
description: Datadog로 Containerd 메트릭 모두 추적하기
integration_version: 1.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
title: Containerd
---
## 개요

이 점검은 Containerd 컨테이너 런타임을 모니터링합니다.

## 설정

### 설치

Containerd is a core [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) check. You must configure Containerd in both `datadog.yaml` and `containerd.d/conf.yaml`.

에이전트가 Containerd에 쿼리할 수 있도록 `datadog.yaml`에서 `cri_socket_path`를 구성하세요. `containerd.d/conf.yaml`에서 이벤트의 점검 인스턴스 설정(예: `filters`)을 구성합니다.

#### 컨테이너에서 설치

컨테이너에서 에이전트를 사용하는 경우 Containerd 소켓에 `DD_CRI_SOCKET_PATH` 환경 변수를 설정하면 Containerd 통합이 기본 구성으로 자동 활성화됩니다.

예를 들어 쿠버네티스에서 통합을 설치하려면 DaemonSet을 편집해 호스트 노드에서 Containerd 소켓을 에이전트 컨테이너에 연결하고 `DD_CRI_SOCKET_PATH` 환경 변수를 DaemonSet 연결 경로로 설정합니다.

{{< tabs >}}

{{% tab "Linux container" %}}

##### Linux 컨테이너

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
        - name: datadog-agent
          # ...
          env:
            - name: DD_CRI_SOCKET_PATH
              value: /var/run/containerd/containerd.sock
          volumeMounts:
            - name: containerdsocket
              mountPath: /var/run/containerd/containerd.sock
            - mountPath: /host/var/run
              name: var-run
              readOnly: true
          volumes:
            - hostPath:
                path: /var/run/containerd/containerd.sock
              name: containerdsocket
            - hostPath:
                path: /var/run
              name: var-run
```

**참고:** 호스트에 `/var/run` 디렉터리가 연결되어 있어야 통합이 정상적으로 작동합니다.

{{% /tab %}}

{{% tab "Windows Container" %}}

##### Windows 컨테이너

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
        - name: datadog-agent
          # ...
          env:
            - name: DD_CRI_SOCKET_PATH
              value: \\\\.\\pipe\\containerd-containerd
          volumes:
            - hostPath:
                path: \\\\.\\pipe\\containerd-containerd
              name: containerdsocket
          volumeMounts:
            - name: containerdsocket
              mountPath: \\\\.\\pipe\\containerd-containerd
```

{{% /tab %}}

{{< /tabs >}}

### 설정

1. Edit the `containerd.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Containerd performance data. See the [sample containerd.d/conf.yaml](https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default) for all available configuration options.

1. [Restart the Agent](https://docs.datadoghq.com/help/)

### 검증

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) and look for `containerd` under the Checks section.

## 수집한 데이터

### Metrics

Containerd collects metrics about the resource usage of your containers.

CPU, memory, block I/O, or huge page table metrics are collected out of the box. Additionally, you can also collect some disk metrics.

| | |
| --- | --- |
| **containerd.cpu.system** <br>(gauge) | The total CPU time<br>_Shown as nanosecond_ |
| **containerd.cpu.throttled.periods** <br>(gauge) | The total CPU throttled time (Linux only)<br>_Shown as nanosecond_ |
| **containerd.cpu.total** <br>(gauge) | The total CPU time<br>_Shown as nanosecond_ |
| **containerd.cpu.user** <br>(gauge) | The total user CPU time<br>_Shown as nanosecond_ |
| **containerd.image.pull** <br>(count) | The number of image pull requests<br>_Shown as byte_ |
| **containerd.image.size** <br>(gauge) | The size of the container image<br>_Shown as byte_ |
| **containerd.mem.cache** <br>(gauge) | The cache amount used (Linux only)<br>_Shown as byte_ |
| **containerd.mem.commit** <br>(gauge) | The committed memory (Windows only)<br>_Shown as byte_ |
| **containerd.mem.commit_peak** <br>(gauge) | The peak committed memory (Windows only)<br>_Shown as byte_ |
| **containerd.mem.current.failcnt** <br>(gauge) | The usage failcnt (Linux only)|
| **containerd.mem.current.limit** <br>(gauge) | The memory limit (Linux only)<br>_Shown as byte_ |
| **containerd.mem.current.usage** <br>(gauge) | The memory usage (Linux only)<br>_Shown as byte_ |
| **containerd.mem.kernel.usage** <br>(gauge) | The kernel usage (Linux only)<br>_Shown as byte_ |
| **containerd.mem.kernel_tcp.failcnt** <br>(gauge) | The kerneltcp failcnt (Linux only)|
| **containerd.mem.kernel_tcp.limit** <br>(gauge) | The kerneltcp limit (Linux only)<br>_Shown as byte_ |
| **containerd.mem.kernel_tcp.max** <br>(gauge) | The kerneltcp maximum usage (Linux only)<br>_Shown as byte_ |
| **containerd.mem.kernel_tcp.usage** <br>(gauge) | The kerneltcp usage (Linux only)<br>_Shown as byte_ |
| **containerd.mem.rss** <br>(gauge) | The rss amount used (Linux only)<br>_Shown as byte_ |
| **containerd.mem.swap.usage** <br>(gauge) | The swap usage (Linux only)<br>_Shown as byte_ |
| **containerd.mem.working_set** <br>(gauge) | The container working set usage<br>_Shown as byte_ |
| **containerd.proc.open_fds** <br>(gauge) | The number of open file descriptors<br>_Shown as file_ |
| **containerd.storage.read** <br>(rate) | Read bytes (Windows only)<br>_Shown as byte_ |
| **containerd.storage.write** <br>(rate) | Write bytes (Windows only)<br>_Shown as byte_ |
| **containerd.uptime** <br>(gauge) | Time since the container was started<br>_Shown as second_ |

This integration works on Linux and Windows, but some metrics are OS dependent. Look at `metadata.csv` for the list of OS dependent metrics.

### 이벤트

The Containerd check can collect events. Use `filters` to select the relevant events. See the [sample containerd.d/conf.yaml](https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default) to have more details.

### 서비스 점검

**containerd.health**

Returns `CRITICAL` if the Agent check is unable to connect to the monitored containerd socket. Returns `OK` otherwise.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.