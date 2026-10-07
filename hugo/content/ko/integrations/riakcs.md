---
app_id: riak-cs
app_uuid: 29e6a2b4-7f3a-4243-8e10-d065147c3da0
assets:
  dashboards:
    riakcs: assets/dashboards/riakcs_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: riakcs.bucket_list_pool.workers
      metadata_path: metadata.csv
      prefix: riakcs.
    process_signatures:
    - riak-cs start
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 110
    source_type_name: RiakCS
  saved_views:
    riak-cs_processes: assets/saved_views/riak-cs_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/riakcs/README.md
display_on_public_website: true
draft: false
git_integration_title: riakcs
integration_id: riak-cs
integration_title: Riak CS
integration_version: 4.3.0
is_public: true
manifest_version: 2.0.0
name: riakcs
public_title: Riak CS
short_description: GET, PUT, DELETE 및 기타 메서드의 속도와 평균 지연을 추적하세요.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: GET, PUT, DELETE 및 기타 메서드의 속도와 평균 지연을 추적하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-riak-cs-performance-and-availability
  support: README.md#Support
  title: Riak CS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![RiakCS 대시보드][1]

## 개요

Datadog에서 RiakCS 메트릭을 캡처하면 다음이 가능합니다.

- 핵심 RiakCS 메트릭 시각화
- RiakCS 성능을 나머지 애플리케이션과 연계

## 설정

### 설치

RiakCS 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있으므로 RiakCS 노드에 아무 것도 설치할 필요가 없습니다.

### 구성

1. [에이전트 설정 디렉터리][3] 루트에 있는 `conf.d/` 폴더에서 `riakcs.d/conf.yaml` 파일을 편집하세요. 사용 가능한 모든 설정 옵션은 [샘플 riakcs.d/conf.yaml][4]을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param access_id - string - required
     ## Enter you RiakCS access key.
     #
     - access_id: "<ACCESS_KEY>"

       ## @param access_secret - string - required
       ## Enter the corresponding RiakCS access secret.
       #
       access_secret: "<ACCESS_SECRET>"
   ```

2. [Agent를 재시작합니다][5].

### 검증

[에이전트의 `status` 하위 명령을 실행하여][6] 점검 섹션에서 `riakcs`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "riak-cs" >}}
 메모리 통계를 포함한 대부분의 S3 API 메트릭을 포함합니다. 일부 메트릭이 제외되었습니다.

- bucket*acl*(get|put)
- object*acl*(get|put)
- bucket*policy*(get|put|delete)
- _in_(one|total)
- _time_error_\*
- \_time_100

제외된 메트릭 또는 추가 메트릭(1000개 이상)을 `instance_config`에 `metrics` 키를 사용해 `riakcs.d/conf.yaml` 설정 파일에 추가할 수 있습니다. 값은 메트릭 이름의 목록이어야 합니다.

[사용 가능한 메트릭 전체 목록][8]을 참조하세요.

### 이벤트

RiakCS 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "riak-cs" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Riak CS 성능 및 사용 가능성 모니터링][11]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/riakcs/images/riakcs_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/riakcs/datadog_checks/riakcs/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/riakcs/metadata.csv
[8]: https://github.com/basho/riak_cs/wiki/Riak-cs-and-stanchion-metrics
[9]: https://github.com/DataDog/integrations-core/blob/master/riakcs/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/
[11]: https://www.datadoghq.com/blog/monitor-riak-cs-performance-and-availability
