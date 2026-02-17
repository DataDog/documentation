---
app_id: redis-sentinel
app_uuid: 207e2b2c-5fad-40a4-a4fc-09f119e142d3
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: redis.sentinel.known_sentinels
      metadata_path: metadata.csv
      prefix: redis.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10210
    source_type_name: Redis Sentinel
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/README.md
display_on_public_website: true
draft: false
git_integration_title: redis_sentinel
integration_id: redis-sentinel
integration_title: Redis Sentinel
integration_version: 1.1.1
is_public: true
manifest_version: 2.0.0
name: redis_sentinel
public_title: Redis Sentinel
short_description: Redis Sentinel은 Redis에 대한 고가용성을 제공합니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::OS & System
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Redis Sentinel은 Redis에 대한 고가용성을 제공합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Redis Sentinel
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Redis Sentinel 서비스에서 실시간으로 메트릭을 받아 다음을 수행할 수 있습니다.

- Sentinel 상태 시각화 및 모니터링
- 장애 조치에 대한 알림 받기

## 설정

Redis Sentinel 점검은 [Datadog 에이전트][1] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우 아래 지침을 따라 호스트에 Redis Sentinel 점검을 설치하세요. [커뮤니티 통합 사용][2]을 확인하여 도커(Docker) 에이전트 또는 이전 버전의 에이전트를 설치합니다.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-redis_sentinel==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][3]과 유사하게 설정하세요.

### 구성

1. Redis Sentinel [메트릭](#metrics) 수집을 시작하려면 [에이전트 설정 디렉토리][4]의 루트에 있는 `conf.d/` 폴더에서 `redis_sentinel.d/conf.yaml` 파일을 편집합니다.
   사용 가능한 모든 설정 옵션은 [upsc.d/conf.yaml 샘플][5]을 참조하세요.

2. [에이전트 재시작][6]

## 검증

[에이전트 상태 하위 명령][7]을 실행하고 점검 섹션에서 `redis_sentinel`을 찾습니다. 

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "redis-sentinel" >}}


### 이벤트

Redis Sentinel 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "redis-sentinel" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ko/getting_started/integrations/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/datadog_checks/redis_sentinel/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/assets/service_checks.json
[10]: http://docs.datadoghq.com/help