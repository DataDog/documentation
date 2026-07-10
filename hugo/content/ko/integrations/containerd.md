---
app_id: containerd
app_uuid: 206cf95f-1d2a-4ad5-b027-0de15431833b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: containerd.cpu.user
      metadata_path: metadata.csv
      prefix: containerd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10082
    source_type_name: Containerd
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
- 쿠버네티스(Kubernetes)
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/containerd/README.md
display_on_public_website: true
draft: false
git_integration_title: containerd
integration_id: containerd
integration_title: Containerd
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: containerd
public_title: Containerd
short_description: Datadog로 Containerd 메트릭 모두 추적하기
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Datadog로 Containerd 메트릭 모두 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Containerd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Containerd 컨테이너 런타임을 모니터링합니다.

## 설정

### 설치

Containerd는 [Datadog 에이전트][1] 코어 점검입니다.`datadog.yaml`과 `containerd.d/conf.yaml` 모두에서 Containerd를 구성해야 합니다.

에이전트가 Containerd에 쿼리할 수 있도록 `datadog.yaml`에서 `cri_socket_path`를 구성하세요. `containerd.d/conf.yaml`에서 이벤트의 점검 인스턴스 설정(예: `filters`)을 구성합니다.

#### 컨테이너에서 설치

컨테이너에서 에이전트를 사용하는 경우 Containerd 소켓에 `DD_CRI_SOCKET_PATH` 환경 변수를 설정하면 Containerd 통합이 기본 구성으로 자동 활성화됩니다.

예를 들어 쿠버네티스에서 통합을 설치하려면 DaemonSet을 편집해 호스트 노드에서 Containerd 소켓을 에이전트 컨테이너에 연결하고 `DD_CRI_SOCKET_PATH` 환경 변수를 DaemonSet 연결 경로로 설정합니다.

{{< tabs >}}
{{% tab "Linux 컨테이너" %}}

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
{{% tab "Windows 컨테이너" %}}

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

1. 에이전트의 구성 디렉터리 루트에서 `conf.d/` 폴더의 `containerd.d/conf.yaml` 파일을 편집해 Containerd 성능 데이터 수집을 시작할 수 있습니다. 구성 옵션 전체를 보려면 [containerd.d/conf.yaml 샘플][2]을 보세요.

2. [에이전트]를 다시 시작합니다[3].

### 검증

[에이전트의 `status` 하위 명령을 실행][4]하고 Checks 섹션 아래에서 `containerd`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "containerd" >}}


이 통합은 Linux와 Windows에서 잘 작동하나 OS에 종속된 메트릭이 일부 있습니다. OS 종속 메트릭 목록을 보려면 `metadata.csv`를 살펴보세요.

### 이벤트

Containerd 점검은 이벤트를 수집할 수 있습니다. `filters`를 사용해 관련 이벤트를 선택하세요. 자세한 내용은 [containerd.d/conf.yaml 샘플][2]을 참고하세요.

### 서비스 점검
{{< get-service-checks-from-git "containerd" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default
[3]: https://docs.datadoghq.com/ko/help/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent