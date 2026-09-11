---
app_id: varnish
app_uuid: e342e5eb-71ce-4c5b-a9c9-2c33691e858f
assets:
  dashboards:
    varnish: assets/dashboards/varnish_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: varnish.n_backend
      metadata_path: metadata.csv
      prefix: varnish.
    process_signatures:
    - service varnish start
    - varnishd
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 29
    source_type_name: Varnish
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    status_code_overview: assets/saved_views/status_code_overview.json
    varnish_processes: assets/saved_views/varnish_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- log collection
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/varnish/README.md
display_on_public_website: true
draft: false
git_integration_title: varnish
integration_id: varnish
integration_title: Varnish
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: varnish
public_title: Varnish
short_description: 클라이언트 및 백엔드 연결, 캐시 누락, 퇴거 등을 추적하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 클라이언트 및 백엔드 연결, 캐시 누락, 퇴거 등을 추적하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/top-varnish-performance-metrics
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/how-to-collect-varnish-metrics
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-varnish-using-datadog
  support: README.md#Support
  title: Varnish
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Varnish 기본 대시보드][1]

## 개요

이 점검에서는 다음과 관련된 Varnish 메트릭을 수집합니다.

- 클라이언트: 연결 및 요청
- 캐시 성능: 조회수, 퇴장 등
- 스레드: 생성, 실패, 대기 중인 스레드
- 백엔드: 성공, 실패, 재시도 연결

또한 각 백엔드의 상태에 대한 서비스 점검도 제출합니다.

## 설정

### 설치

Varnish 점검은 [Datadog Agent][2] 패키지에 포함되어 있습니다. 서버에 추가 설치가 필요하지 않습니다.

### 구성

##### Varnish 준비

Varnish 4.1+를 실행하는 경우 `dd-agent` 시스템 사용자를 Varnish 그룹에 추가합니다.

```text
sudo usermod -G varnish -a dd-agent
```

`secretfile`을 사용하는 경우 `dd-agent` 사용자가 읽을 수 있는지 확인해야 합니다.

##### 메트릭 수집

1. [Agent 구성 디렉터리][3]의 루트에 있는 `conf.d/` 폴더에서 `varnish.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 varnish.d/conf.yaml][4]을 참조하세요.

   ```yaml
   init_config:

   instances:
     - varnishstat: /usr/bin/varnishstat
       varnishadm: <PATH_TO_VARNISHADM_BIN>
   ```

    **참고**: `varnishadm`을 설정하지 않으면 Agent에서 백엔드 상태를 확인하지 않습니다. 설정하면 Agent에서 루트 권한으로 바이너리를 실행할 수 있는 권한이 필요합니다. `/etc/sudoers` 파일에 다음을 추가합니다.

   ```shell
     dd-agent ALL=(ALL) NOPASSWD:/usr/bin/varnishadm
   ```

2. [Agent를 재시작합니다][5].

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Varnish 로깅을 활성화하려면 `/etc/default/varnishncsa`에서 다음을 취소하세요.

   ```text
     VARNISHNCSA_ENABLED=1
   ```

2. 동일 파일 끝에 다음을 추가합니다.

   ```text
     LOG_FORMAT="{\"date_access\": \"%{%Y-%m-%dT%H:%M:%S%z}t\", \"network.client.ip\":\"%h\", \"http.auth\" : \"%u\", \"varnish.x_forwarded_for\" : \"%{X-Forwarded-For}i\", \"varnish.hit_miss\":  \"%{Varnish:hitmiss}x\", \"network.bytes_written\": %b, \"http.response_time\": %D, \"http.status_code\": \"%s\", \"http.url\": \"%r\", \"http.ident\": \"%{host}i\", \"http.method\": \"%m\", \"varnish.time_first_byte\" : %{Varnish:time_firstbyte}x, \"varnish.handling\" : \"%{Varnish:handling}x\", \"http.referer\": \"%{Referer}i\", \"http.useragent\": \"%{User-agent}i\" }"

     DAEMON_OPTS="$DAEMON_OPTS -c -a -F '${LOG_FORMAT}'"
   ```

3. `varnishncsa` 유틸리티를 다시 시작하여 변경 사항을 적용합니다.

4. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

5. 이 구성 블록을 `varnish.d/conf.yaml` 파일에 추가하여 Varnish 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/varnish/varnishncsa.log
       source: varnish
       service: varnish
   ```

    `path` 및 `service` 파라미터 값을 변경하고 사용자 환경에 맞게 구성합니다. 사용 가능한 모든 구성 옵션은 [샘플 varnish.yaml][4]을 참조하세요.

6. [Agent를 재시작합니다][5].


### 검증

[Agent 상태 하위 명령][6]을 실행하고 Checks 섹션에서 `varnish`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "varnish" >}}


### 이벤트

Varnish 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "varnish" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [상위 Varnish 성능 메트릭][10]
- [Varnish 메트릭 수집 방법][11]
- [Datadog를 통해 Varnish 모니터링][12]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/varnish/images/varnish.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/varnish/datadog_checks/varnish/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/varnish/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/varnish/assets/service_checks.json
[9]: https://docs.datadoghq.com/ko/help/
[10]: https://www.datadoghq.com/blog/top-varnish-performance-metrics
[11]: https://www.datadoghq.com/blog/how-to-collect-varnish-metrics
[12]: https://www.datadoghq.com/blog/monitor-varnish-using-datadog