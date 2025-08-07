---
app_id: grpc-check
app_uuid: f0317cd5-e4b9-4147-998e-25c69fad94ed
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - grpc_check.healthy
      - grpc_check.unhealthy
      metadata_path: metadata.csv
      prefix: grpc_check.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10296
    source_type_name: gRPC 점검
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: help@datadoghq.com
  support_email: keisuke.umegaki.630@gmail.com
categories: []
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/grpc_check/README.md
display_on_public_website: true
draft: false
git_integration_title: grpc_check
integration_id: grpc-check
integration_title: gRPC 상태
integration_version: 1.0.2
is_public: true
manifest_version: 2.0.0
name: grpc_check
public_title: gRPC 상태
short_description: gRPC Health Checking Protocol 기반 gRPC 서버 모니터링
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - 제공::통합
  configuration: README.md#Setup
  description: gRPC Health Checking Protocol 기반 gRPC 서버 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: gRPC 상태
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 Datadog Agent를 통해 [gRPC 상태 확인 프로토콜][1]을 구현하는 엔드포인트를 모니터링합니다. 

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [오토파일럿 통합 템플릿][3]을 참조하세요.

### 설치

#### 호스트

호스트에 grpc_check 점검을 설치하려면 다음을 실행합니다.

```bash
sudo -u dd-agent datadog-agent integration install -t datadog-grpc-check==1.0.2
```

#### Dockerfile

이 Dockerfile로 Agent 이미지를 빌드합니다.

```Dockerfile
FROM datadog/agent:7
RUN agent integration install -r -t datadog-grpc-check==1.0.2 \
  && /opt/datadog-agent/embedded/bin/pip3 install grpcio grpcio-health-checking
```

### 구성

1. Agent 구성 디렉터리 루트에 있는 `conf.d/` 폴더 내 `grpc_check.d/conf.yaml` 파일을 편집하여 grpc_check 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 grpc_check.d/conf.yaml][3]을 참고하세요.

2. [Agent를 재시작합니다][4].

### 검증

[Agent 상태 하위 명령][5]을 실행하고 점검 섹션에서 `grpc_check`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "grpc_check" >}}


### 이벤트

grpc_check 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "grpc_check" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/datadog_checks/grpc_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/metadata.csv
[7]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/assets/service_checks.json
[8]: https://app.datadoghq.com/help@datadoghq.com