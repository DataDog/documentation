---
app_id: portworx
app_uuid: e682ab93-39cd-403b-a16f-8082961bc081
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: portworx.cluster.cpu_percent
      metadata_path: metadata.csv
      prefix: portworx.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10021
    source_type_name: Portworx
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Portworx
  sales_email: paul@portworx.com
  support_email: paul@portworx.com
categories:
- 쿠버네티스(Kubernetes)
- 데이터 저장소
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/portworx/README.md
display_on_public_website: true
draft: false
git_integration_title: portworx
integration_id: portworx
integration_title: Portworx
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: portworx
public_title: Portworx
short_description: Portworx 인스턴스에서 런타임 메트릭을 수집합니다.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Kubernetes
  - Category::Data Stores
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: Portworx 인스턴스에서 런타임 메트릭을 수집합니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/portworx-integration/
  support: README.md#Support
  title: Portworx
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Portworx 서비스에서 실시간으로 메트릭을 수집하면 다음을 할 수 있습니다.

- Portworx 클러스터의 상태 및 성능 모니터링
- Portworx 볼륨 디스크 사용량, 지연 시간, 처리량 추적

## 설정

Portworx 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있지 않기 때문에 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우, 하단 지침에 따라 호스트에 Portworx 점검을 설치하세요. Docker 에이전트 또는 이전 버전의 에이전트와 같이 설치하려면 [커뮤니티 통합 사용][4]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-portworx==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][3]과 유사하게 설정하세요.

### 설정

1. [에이전트 설정 디렉터리][4]의 루트에 있는 `conf.d/` 폴더에서 `portworx.d/conf.yaml` 파일을 편집하여 Portworx [메트릭](#metrics) 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [portworx.d/conf.yaml 샘플][5]을 참고하세요.

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_endpoint: http://localhost:9001/metrics
    ```

2. [에이전트 재시작][6]

### 검증

[에이전트의 `info` 하위 명령을 실행][7]하면 다음과 같은 화면이 표시됩니다. 

## 호환성

Portworx 점검은 Portworx 1.4.0 및 이전 버전과 호환됩니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "portworx" >}}


### 이벤트

Portworx 점검에는 이벤트가 포함되지 않습니다.

## 트러블슈팅

### 에이전트 연결 불가

```text
    portworx
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

`portworx.yaml`에 있는 `url`이 올바른지 확인하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Portworx와 Datadog로 멀티 클라우드 컨테이너 스토리지 모니터링][9]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ko/getting_started/integrations/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/faq/agent-status-and-information/
[8]: https://github.com/DataDog/integrations-extras/blob/master/portworx/metadata.csv
[9]: https://www.datadoghq.com/blog/portworx-integration/