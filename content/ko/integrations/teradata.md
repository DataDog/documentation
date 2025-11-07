---
app_id: teradata
app_uuid: 8cac0599-64ca-4a46-8c68-1c5db6cc65ca
assets:
  dashboards:
    Teradata Overview: assets/dashboards/teradata_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: teradata.disk_space.curr_perm.total
      metadata_path: metadata.csv
      prefix: teradata.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10275
    source_type_name: Teradata
  monitors:
    Database ready thread count is too low: assets/monitors/low_ready_threads.json
    Datadase disk space usage is high: assets/monitors/high_disk_space.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 캐싱(caching)
- 데이터 스토어
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/teradata/README.md
display_on_public_website: true
draft: false
git_integration_title: teradata
integration_id: teradata
integration_title: Teradata
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: teradata
public_title: Teradata
short_description: Teradata Vantage Database의 상태 및 성능을 모니터합니다.
supported_os:
- Linux
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::캐싱(Caching)
  - 카테고리::데이터 저장
  - Supported OS::Linux
  - Supported OS::Windows
  - 제공::통합
  configuration: README.md#Setup
  description: Teradata Vantage Database의 상태 및 성능을 모니터합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Teradata
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

[Teradata][1]는 멀티 클라우드 데이터 플랫폼 내의 엔터프라이즈급 관계형 데이터베이스 관리 시스템입니다.

본 검사는 Datadog Agent를 통해 Teradata를 모니터링합니다. Datadog-Teradata 통합을 활성화하여 Teradata 성능, 디스크 사용량, 리소스 소비량을 확인합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [오토파일럿 통합 템플릿][3]을 참조하세요.

### 설치

Teradata 검사는 [Datadog Agent][3] 패키지에 포함되어 있습니다.

#### Teradata 준비

1. [운영 체제][5]에 내장된 Agent pip 명령을 사용하여 [Python용 Teradata SQL Driver][4]를 다운로드하여 설치합니다.

**Linux**

```
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install teradatasql
```

**Windows**

```
%PROGRAMFILES%\Datadog\"Datadog Agent"\embedded<PYTHON_MAJOR_VERSION>\python -m pip install teradatasql
```

2. Teradata Database에 적절한 액세스 권한이 있는 읽기 전용 `datadog` 사용자를 생성합니다. Teradata Database에서 `BTEQ` 세션을 시작합니다.

```shell
CREATE USER "datadog" AS PASSWORD="<PASSWORD>";
```

읽기 전용 모니터용으로 지정된 `datadog` 사용자에게 새 역할 또는 기존 역할을 부여합니다. 옵션이지만 강력히 권장합니다.

```shell
GRANT "<READ_ONLY_ROLE>" TO "datadog"; 
```

Teradata 시스템은 기본적으로 대부분의 [Data Dictionary 보기][12]에 PUBLIC `SELECT` 권한을 부여합니다. 모든 Teradata Database 사용자에게는 `PUBLIC` 권한이 있습니다.

3. 리소스 사용량 메트릭을 수집하려면 [SPMA Resource Usage Table][6]을 활성화합니다. 본 작업은 [`ctl` Teradata Utility][7]로 실행합니다.

```shell
# Start ctl session
ctl

# View RSS screen
screen rss

# Enable SPMA resource usage table
SPMA=yes

# Save the configuration setting
write
```

참고: SPMA Resource Table은 기본적으로 10분마다 통계를 로깅합니다. `ctl`을 사용해 `rss` 화면에서 로깅 간격을 구성할 수 있습니다. Resource Usage 로깅은 데이터베이스 성능에 영향을 줄 수 있습니다. Resource Usage 로깅 빈도를 줄이려면 `Node Logging Rate` 설정의 로깅 간격을 늘립니다. Resource Usage 로깅에 대한 자세한 내용은 Teradata [문서][8]를 참조하세요.

4. Teradata 통합은 기본적으로 DBC.DiskSpaceV 시스템 뷰에서 디스크 공간 메트릭을 수집합니다. 데이터베이스 테이블에서 추가 디스크 공간 메트릭을 수집하려면 `collect_table_disk_metrics` 옵션을 활성화합니다. 

```
collect_table_disk_metrics: true
```

모니터되는 테이블을 필터링하려면 `tables` 옵션을 구성합니다.

목록으로 모니터할 테이블을 지정합니다.

```
tables:
    - <TABLE_1>
    - <TABLE_2>
```

`include` 및 `exclude` 옵션으로 맵을 지정하여 모니터되는 테이블을 사용자 지정합니다.

```
tables:
    include:
        - <TABLE_1>
        - <TABLE_2>
    exclude:
        - <TABLE_3>
```

### 구성

1. Agent 설정 디렉터리 루트의 `conf.d/` 폴더에 있는 `teradata.d/conf.yaml` 파일을 편집하여 Teradata 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 teradata.d/conf.yaml][9]을 참조하세요.

2. [에이전트를 다시 시작합니다][10].

### 검증

[Agent 상태 하위 명령을 실행][11]하고 Checks 섹션에서 `teradata`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "teradata" >}}


### 이벤트

Teradata 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "teradata" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][14]에 문의하세요.


[12]:https://docs.teradata.com/r/Teradata-VantageTM-Data-Dictionary/July-2021/Data-Dictionary-Views/Access-to-Data-Dictionary-Views/Default-PUBLIC-Privileges-for-Views
[1]: https://www.teradata.com/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/Teradata/python-driver#Installation
[5]: https://docs.datadoghq.com/ko/developers/guide/custom-python-package/?tab=linux#pagetitle
[6]: https://docs.teradata.com/r/Teradata-VantageTM-Resource-Usage-Macros-and-Tables/July-2021/ResUsageSpma-Table
[7]: https://docs.teradata.com/r/Teradata-VantageTM-Database-Utilities/July-2021/Control-GDO-Editor-ctl/Ctl-Commands/SCREEN
[8]: https://docs.teradata.com/r/Teradata-VantageTM-Resource-Usage-Macros-and-Tables/July-2021/Planning-Your-Resource-Usage-Data/Resource-Usage-Logging
[9]: https://github.com/DataDog/integrations-core/blob/master/teradata/datadog_checks/teradata/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/teradata/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/teradata/assets/service_checks.json
[14]: https://docs.datadoghq.com/ko/help/