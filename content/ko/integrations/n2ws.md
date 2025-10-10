---
app_id: n2ws
app_uuid: 6c0176c4-b878-43e0-a5a8-d280b0fa123e
assets:
  dashboards:
    N2WSBackup&Recovery-EntitiesSpecificDashboard: assets/dashboards/N2WSBackup&Recovery-EntityTypesDetails.json
    N2WSBackup&Recovery-EntitiesSpecificDashboardV4.0: assets/dashboards/N2WSBackup&Recoveryv4.1-EntityTypesDetails.json
    N2WSBackup&Recovery-GraphicalVersion: assets/dashboards/N2WSBackup&Recovery-BackupSuccessRates(ColumnGraphs).json
    N2WSBackup&Recovery-GraphicalVersion-Areas: assets/dashboards/N2WSBackup&Recovery-BackupSuccessRates(AreasGraphs).json
    N2WSBackup&Recovery-GraphicalVersionV4.0: assets/dashboards/N2WSBackup&Recoveryv4.1-BackupSuccessRates(ColumnGraphs).json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: cpm_metric.dashboard_activity.backup_success_num
      metadata_path: metadata.csv
      prefix: cpm_metric.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10129
    source_type_name: N2WS 백업 및 복구
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: N2WS
  sales_email: eliad.eini@n2ws.com
  support_email: eliad.eini@n2ws.com
categories:
- cloud
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/n2ws/README.md
display_on_public_website: true
draft: false
git_integration_title: n2ws
integration_id: n2ws
integration_title: N2WS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: n2ws
public_title: N2WS
short_description: 연결된 모든 N2WS 백업 및 복구 호스트의 요약 데이터 보기
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
  - "\b카테고리::클라우드"
  - 제공::통합
  configuration: README.md#Setup
  description: 연결된 모든 N2WS 백업 및 복구 호스트의 요약 데이터 보기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: N2WS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요


N2WS Backup & Recovery(CPM)는 Amazon Web Service(AWS) 및 Microsoft Azure를 위한 엔터프라이즈급 백업, 복구 및 재해 복구 솔루션입니다. N2WS는 클라우드 네이티브 기술(스냅샷)을 사용하여 AWS 및 Azure에서 백업 및 복원 기능을 제공합니다.

N2WS Backup & Recovery 인스턴스는 모니터링 백업, 재해 복구, S3로 복사, 알림을 지원합니다.
Datadog의 모니터링 서비스 등을 지원합니다. 이 통합을 통해 사용자는 N2WS Backup & Recovery 대시보드 메트릭을 모니터링하고 분석할 수 있습니다.

## 설정

### 설치

1.  파이썬(Python) 통합 ][1]을 설치합니다.

2.  N2WS 인스턴스에서 Datadog 지원을 활성화합니다.
    - SSH로 N2WS 백업 및 복구 인스턴스에 연결합니다.
    - `/cpmdata/conf/cpmserver.cfg`에 아래 줄을 추가합니다. 이 작업을 수행하려면 `sudo` 권한이 필요할 수 있습니다.
        ```
        [external_monitoring]
        enabled=True
        ```
    - 실행 `service apache2 restart`

3.  N2WS 인스턴스에 Datadog 에이전트를 설치합니다.
    - Datadog에 로그인하고 통합 -> 에이전트 -> 우분투(Ubuntu)로 이동합니다. 
    - 에이전트 원스텝 설치 명령을 복사합니다.
    - SSH로 N2WS 백업 및 복구 인스턴스에 연결하고 다음 명령을 실행합니다. 이 작업을 수행하려면 `sudo` 권한이 필요할 수 있습니다.

4.  Datadog 대시보드 메트릭 설정:
    - [메트릭** -> **탐색기**][2]로 이동합니다.

    **그래프**: 목록에서 메트릭을 선택합니다. 모든 N2WS 메트릭은 문자열 `cpm_metric`으로 시작합니다.

    **이상**: 목록에서 데이터를 선택합니다. 모든 N2WS 사용자의 데이터는 `cpm:user:<user-name>` 문자열로 시작됩니다.
              특정 사용자 또는 전체 N2WS 인스턴스를 선택할 수 있습니다.


5.  N2WS 받기 대시보드
    - [Datadog 통합][3]에서 검색 `N2WS` 타일을 검색하여 설치합니다.
    - 계정에 대시보드 5개가 설치됩니다.
     N2WS Backup & Recovery v3.2.1의 경우 `N2WSBackup&Recovery-Graphicalversion`, `N2WSBackup&Recovery-Graphicalversion-areas` 및 `N2WSBackup&Recovery-EntitiesSpecificDashboard`를 확인하세요.
    **참고**: 대시보드 AWS 사용자만 사용할 수 있습니다.
    N2WS Backup & Recovery v4.1의 경우 `N2WSBackup&Recovery-EntitiesSpecificDashboardV4.1` 및 `N2WSBackup&Recovery-GraphicalVersionV4.1`를 확인하세요.

    또는 [N2WS에서 JSON 템플릿 가져오기][4]를 통해 대시보드를 만들 수 있습니다.

## 수집한 데이터

Datadog는 N2WS 백업 및 복구 백업에 대한 다음 데이터를 수집합니다.

- 각 유형의 스냅샷 개수
- 백업 성공(AWS 전용)
- 백업 실패(AWS 전용)
- 백업 부분 성공(AWS 전용)
- 모든 유형의 리소스 보호
- 볼륨 용량에 대한 데이터(AWS 전용), 알림 등

### 메트릭
{{< get-metrics-from-git "n2ws" >}}


### 이벤트

Datadog는 모든 N2WS Backup & Recovery 호스트에서 경고 메시지를 수집합니다.

### 서비스 점검

N2WS Backup & Recovery 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

- [N2WS 사용자 가이드 및 설명서][6]
- [N2WS 지원][7]
- [Datadog 지원][8]


[1]: https://app.datadoghq.com/account/settings#integrations/python
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://app.datadoghq.com/account/settings#integrations/n2ws
[4]: https://support.n2ws.com/portal/en/kb/articles/datadog-templates
[5]: https://github.com/DataDog/integrations-extras/blob/master/n2ws/metadata.csv
[6]: https://n2ws.com/support/documentation
[7]: https://n2ws.com/support
[8]: https://docs.datadoghq.com/ko/help/