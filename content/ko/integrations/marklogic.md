---
app_id: marklogic
app_uuid: 92342b09-db9a-4542-b442-76bb9b7f716e
assets:
  dashboards:
    MarkLogic - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: marklogic.hosts.total_hosts
      metadata_path: metadata.csv
      prefix: marklogic.
    process_signatures:
    - MarkLogic
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10124
    source_type_name: MarkLogic
  monitors:
    Active requests are taking too long: assets/monitors/marklogic_long_requests.json
    Cache is not large enough: assets/monitors/marklogic_low_cache.json
    Forest processing load is high: assets/monitors/marklogic_high_load.json
  saved_views:
    marklogic_processes: assets/saved_views/marklogic_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 데이터 저장소
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/marklogic/README.md
display_on_public_website: true
draft: false
git_integration_title: marklogic
integration_id: marklogic
integration_title: MarkLogic
integration_version: 6.1.1
is_public: true
manifest_version: 2.0.0
name: marklogic
public_title: MarkLogic
short_description: MarkLogic 데이터베이스, 포레스트(forests), 호스트 및 서버에 대한 메트릭을 추적합니다.
supported_os:
- linux
- macos
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: MarkLogic 데이터베이스, 포레스트(forests), 호스트 및 서버에 대한 메트릭을 추적합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: MarkLogic
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog 에이전트로 [MarkLogic][1]을 모니터링합니다. MarkLogic 서버는 운영 및 분석 데이터를 위한 데이터 허브로 설계된 다중 모델 데이터베이스입니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][2]을 참조하세요.

### 설치

MarkLogic 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

#### MarkLogic 준비

API 또는 관리자 인터페이스를 사용하여 최소 [`manage-user`][4] 역할 권한이 있는 Datadog 에이전트 사용자를 생성합니다.
`enable_health_service_checks` 설정을 사용하려는 경우 Datadog MarkLogic 사용자에게 [`manage-admin`][5] 이상의 역할을 부여하세요.

##### API

1. 이 요청을 다음 특정 값으로 수정하여 Datadog 사용자를 생성합니다.
    ```shell
    curl -X POST --anyauth --user <ADMIN_USER>:<ADMIN_PASSWORD> -i -H "Content-Type: application/json" -d '{"user-name": "<USER>", "password": "<PASSWORD>", "roles": {"role": "manage-user"}}' http://<HOSTNAME>:8002/manage/v2/users
    ```
    정확한 `<ADMIN_USER>` 및 `<ADMIN_PASSWORD>`을 사용하고 `<USER>` 및 `<PASSWORD>`을 Datadog 에이전트에서 사용하는 사용자 아이디와 비밀번호로 바꿉니다.
    자세한 내용은 MarkLogic [POST /manage/v2/users][6] 문서를 참고하세요.

2. 다음과 같이 충분한 권한이 있는 사용자를 생성했는지 확인합니다.
    ```shell
    curl -X GET --anyauth --user <USER>:<PASSWORD> -i http://<HOSTNAME>:8002/manage/v2
    ```

##### 관리자 인터페이스

1. 관리자 계정으로 QConsole에 로그인합니다. 기본적으로 QConsole은 `http://<HOSTNAME>:8000/qconsole`에서 사용할 수 있습니다.

2. 데이터베이스로 `Security`, 쿼리 유형으로 `XQuery`을 선택합니다.

3. 쿼리를 실행하여 `<USER>` 및 `<PASSWORD>`을 Datadog 에이전트에서 사용하는 항목으로 변경합니다.
    ```
    xquery version "1.0-ml";
    import module namespace sec="http://marklogic.com/xdmp/security" at 
        "/MarkLogic/security.xqy";

    sec:create-user(
        "<USER>",
        "Datadog Agent user",
        "<PASSWORD>",
        "manage-user",
        (xdmp:permission("security", "read")),
        ("http://marklogic.com/dev_modules"))

    ```
   자세한 내용은 MarkLogic [sec:create-user][7] 문서를 참고하세요.

4. 충분한 권한이 있는 사용자를 생성했는지 확인하려면 `<USER>` 및 `<PASSWORD>`을 사용하여 `http://<HOSTNAME>:8002`(기본 포트)에서 인증합니다.

### 설정

#### 호스트

1. 에이전트의 설정 디렉토리 루트에 있는 `conf.d/` 폴더에서 `marklogic.d/conf.yaml` 파일을 편집하여 MarkLogic 성능 데이터 수집을 시작하세요.사용 가능한 모든 설정 옵션은 [`marklogic.d/conf.yaml` 샘플 파일][8]에서 확인하세요. 설정 파일의 사용자 관련 설정의 경우 생성한 Datadog 에이전트 사용자를 사용합니다.

2. [에이전트를 재시작합니다] [9].

#### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. `marklogic.d/conf.yaml` 파일에 이 설정 블록을 추가하여 MarkLogic 로그 수집을 시작하세요.

   ```yaml
     logs:
       - type: file
         path: /var/opt/MarkLogic/Logs/ErrorLog.txt
         source: marklogic
       - type: file
         path: /var/opt/MarkLogic/Logs/80002_AccessLog.txt
         source: marklogic
   ```

    `path` 값을 변경하고 환경에 설정합니다. 사용 가능한 모든 설정 옵션은 [`marklogic.d/conf.yaml` 샘플 파일][8]을 참조합니다.

3. [에이전트를 재시작합니다] [9].

### 검증

[에이전트의 상태 하위 명령을 실행][10]하고 점검 섹션에서 `marklogic`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "marklogic" >}}


### 이벤트

MarkLogic은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "marklogic" >}}


## 트러블슈팅

도움이 필요하세요? [Datadog 지원팀][13]에 문의하세요.


[1]: https://www.marklogic.com
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.marklogic.com/guide/admin/pre_def_roles#id_64197
[5]: https://docs.marklogic.com/guide/admin/pre_def_roles#id_28243
[6]: https://docs.marklogic.com/REST/POST/manage/v2/users
[7]: https://docs.marklogic.com/sec:create-user
[8]: https://github.com/DataDog/integrations-core/blob/master/marklogic/datadog_checks/marklogic/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/marklogic/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/marklogic/assets/service_checks.json
[13]: https://docs.datadoghq.com/ko/help