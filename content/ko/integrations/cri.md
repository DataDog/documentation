---
app_id: cri
categories:
- 컨테이너
- Kubernetes
custom_kind: 통합
description: Datadog로 CRI 메트릭을 모두 추적하기
integration_version: 1.0.0
media: []
supported_os:
- linux
title: CRI
---
## 개요

이 점검은 컨테이너 Container Runtime Interface를 모니터링합니다.

## 설정

### 설치

CRI is a core [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) check that needs to be configured in the `datadog.yaml` with the `cri.d/conf.yaml`.

`datadog.yaml`에서 에이전트 `cri_socket_path`를 구성해 기존 CRI를 쿼리하도록 합니다(또 기본 시간 제한을 구성할 수 있음). CRI(예: `containerd`)에서 디스크 사용량 메트릭을 보고한다면 `collect_disk`와 같은 점검 인스턴스 설정을 `cri.d/conf.yaml`에서 구성하세요.

**참고**: 컨테이너에서 에이전트를 사용하는 경우 환경 변수 `DD_CRI_SOCKET_PATH`를 설정하면 기본 구성으로 `CRI` 점검을 자동으로 사용할 수 있습니다.

#### 컨테이너에서 설치

컨테이너에서 에이전트를 사용하는 경우 CRI 소켓에 `DD_CRI_SOCKET_PATH` 환경 변수를 설정하면 `CRI` 통합이 기본 구성으로 자동 활성화됩니다.

예를 들어 쿠버네티스에 통합을 설치하려면 daemonset을 편집해 호스트 노드에서 CRI 소켓을 에이전트 컨테이너로 연결하고 환경 변수를 `DD_CRI_SOCKET_PATH`를 daemonset mountPath로 설정합니다.

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
              value: /var/run/crio/crio.sock
          volumeMounts:
            - name: crisocket
              mountPath: /var/run/crio/crio.sock
            - mountPath: /host/var/run
              name: var-run
              readOnly: true
          volumes:
            - hostPath:
                path: /var/run/crio/crio.sock
              name: crisocket
            - hostPath:
                path: /var/run
              name: var-run
```

**참고:** 호스트에 `/var/run` 디렉터리가 연결되어 있어야 통합이 정상적으로 작동합니다.

### 설정

1. Edit the `cri.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your crio performance data. See the [sample cri.d/conf.yaml](https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/cri.d/conf.yaml.default) for all available configuration options.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

Run the Agent's [status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) and look for `cri` under the Checks section.

## 수집한 데이터

### Metrics

CRI collect metrics about the resource usage of your containers running through the CRI.

CPU and memory metrics are collected out of the box and you can additionally collect some disk metrics if they are supported by your CRI (CRI-O doesn't support them).

| | |
| --- | --- |
| **cri.cpu.usage** <br>(gauge) | Cumulative CPU usage (sum across all cores) since object creation<br>_Shown as nanocore_ |
| **cri.disk.inodes** <br>(gauge) | Represents the inodes used by the images<br>_Shown as inode_ |
| **cri.disk.used** <br>(gauge) | Represents the bytes used for images on the filesystem<br>_Shown as byte_ |
| **cri.mem.rss** <br>(gauge) | The amount of working set memory in bytes <br>_Shown as byte_ |
| **cri.uptime** <br>(gauge) | Time since the container was started<br>_Shown as second_ |

### 서비스 점검

CRI에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

CRI에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.