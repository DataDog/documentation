---
app_id: cri
app_uuid: 81805522-0f55-45a4-95f6-23dd9ea46361
assets:
  dashboards:
    cri: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: cri.cpu.usage
      metadata_path: metadata.csv
      prefix: cri.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10043
    source_type_name: CRI
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
- 쿠버네티스(Kubernetes)
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cri/README.md
display_on_public_website: true
draft: false
git_integration_title: cri
integration_id: cri
integration_title: CRI
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cri
public_title: CRI
short_description: Datadog로 CRI 메트릭을 모두 추적하기
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Datadog로 CRI 메트릭을 모두 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CRI
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 컨테이너 Container Runtime Interface를 모니터링합니다.

## 설정

### 설치

CRI는 코어는 [Datadog 에이전트][1] 점검입니다. `datadog.yaml`에서 `cri.d/conf.yaml`로 구성합니다.

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

1. 에이전트 구성 디렉터리의 루트 수준에 있는 `conf.d/` 폴더에서 `cri.d/conf.yaml` 파일을 편집해 crio 성능 데이터 수집을 시작하세요. 사용할 수 있는 구성 옵션을 모두 보려면 [sample cri.d/conf.yaml][2]을 참고하세요.

2. [에이전트를 재시작][3]하세요.

### 검증

[에이전트 상태 하위 명령을 실행][3]하고 Checks 섹션에서 `cri`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cri" >}}


### 서비스 점검

CRI에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

CRI에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/cri.d/conf.yaml.default
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/cri/metadata.csv
[5]: https://docs.datadoghq.com/ko/help/