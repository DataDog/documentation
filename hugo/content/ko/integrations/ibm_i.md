---
app_id: ibm-i
app_uuid: 30045928-4be2-4efd-9a08-160e904494a1
assets:
  dashboards:
    IBM i Overview: assets/dashboards/ibm_i_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_i.system.cpu_usage
      metadata_path: metadata.csv
      prefix: ibm_i.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10219
    source_type_name: IBM i
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- OS & 시스템
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_i/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_i
integration_id: ibm-i
integration_title: IBM i
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: ibm_i
public_title: IBM i
short_description: 작업, 작업 대기열, ASP 등을 포함하여 IBM i 시스템을 원격으로 모니터링하세요.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::OS & System
  - Offering::Integration
  configuration: README.md#Setup
  description: 작업, 작업 대기열, ASP 등을 포함하여 IBM i 시스템을 원격으로 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IBM i
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 검사는 Datadog Agent를 통해 [IBM i][1]를 원격으로 모니터링합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][2]을 참조하세요.

**참고**: 이 검사는 Unix 계열 운영 체제에 특정한 `fcntl()` 시스템 호출을 사용하므로 Windows에서는 사용할 수 없습니다.

### 설치

IBM i 점검은 [Datadog Agent][3] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

#### ODBC 드라이버

IBM i 검사는 IBM i ODBC 드라이버를 사용하여 IBM i 호스트에 원격으로 연결합니다.

[IBM i Access - Client Solutions][4] 페이지에서 드라이버를 다운로드하세요. `Downloads for IBM i Access Client Solutions`을 클릭하고 로그인하면 다운로드 페이지에 액세스할 수 있습니다.

Linux 호스트용 `ACS Linux App Pkg` 등 플랫폼에 맞는 `ACS App Pkg` 패키지를 선택합니다. 패키지를 다운로드하고 설치 지침에 따라 드라이버를 설치합니다.

### 설정

IBM i 검사는 Datadog Agent를 실행하는 호스트에서 원격으로 IBM i 시스템을 쿼리합니다. IBM i 시스템과 통신하려면 Datadog Agent를 실행하는 호스트에 IBM i ODBC 드라이버를 설정해야 합니다.

#### ODBC 드라이버

ODBC 드라이버가 설치되면 ODBC 구성 파일인 `odbc.ini` 및 `odbcinst.ini`를 찾으세요. 위치는 시스템에 따라 다를 수 있습니다. Linux에서는 `/etc` 디렉터리나 `/etc/unixODBC` 디렉터리에 위치할 수 있습니다.

이러한 구성 파일을 내장된 Agent 환경(예: Linux 호스트의 `/opt/datadog-agent/embedded/etc/`)에 복사합니다.

`odbcinst.ini` 파일은 Agent에 사용 가능한 ODBC 드라이버를 정의합니다. 각 섹션은 하나의 드라이버를 정의합니다. 예를 들어 다음 섹션에서는 `IBM i Access ODBC Driver 64-bit`라는 드라이버를 정의합니다.
```
[IBM i Access ODBC Driver 64-bit]
Description=IBM i Access for Linux 64-bit ODBC Driver
Driver=/opt/ibm/iaccess/lib64/libcwbodbc.so
Setup=/opt/ibm/iaccess/lib64/libcwbodbcs.so
Threading=0
DontDLClose=1
UsageCount=1
```

IBM i 검사를 구성하려면 IBM i ODBC 드라이버의 이름이 필요합니다.

#### IBM i 검사

1. Agent의 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `ibm_i.d/conf.yaml` 파일을 편집하여 IBM i 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 ibm_i.d/conf.yaml][5]을 참조하세요.
   `obdcinst.ini` 파일의 드라이버 이름을 사용하세요.

2. [에이전트를 재시작합니다][6].

### 검증

[Agent의 상태 하위 명령을 실행][7]하고 Checks 섹션에서 `ibm_i`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ibm_i" >}}


### 이벤트

IBM i 검사는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

[1]: https://www.ibm.com/it-infrastructure/power/os/ibm-i
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://www.ibm.com/support/pages/ibm-i-access-client-solutions
[5]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/