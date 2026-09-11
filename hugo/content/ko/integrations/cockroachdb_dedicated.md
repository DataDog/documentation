---
app_id: cockroach-cloud
app_uuid: e0ab9a47-da5b-4008-8571-3842ac318f74
assets:
  dashboards:
    cockroach_cloud_dedicated_overview: assets/dashboards/cockroach_cloud_dedicated_overview.json
    cockroach_cloud_serverless_overview: assets/dashboards/cockroach_cloud_serverless_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - crdb_dedicated.sys.uptime
      - crdb_cloud.sys.uptime
      metadata_path: metadata.csv
      prefix: crdb_
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10274
    source_type_name: CockroachDB 전용
  logs:
    source: cockroach-cloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 데이터 스토어
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cockroachdb_dedicated/README.md
display_on_public_website: true
draft: false
git_integration_title: cockroachdb_dedicated
integration_id: cockroach-cloud
integration_title: Cockroach Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cockroachdb_dedicated
public_title: Cockroach Cloud
short_description: Cockroach Cloud 메트릭을 DataDog에 전송하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::데이터 저장
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Cockroach Cloud 메트릭을 DataDog에 전송하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cockroach Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Datadog용 CockroachDB Cloud 통합을 사용하면 Datadog 플랫폼에서 CockroachDB 메트릭의 하위 집합에 관한 데이터 수집과 알림을 사용할 수 있습니다.

## 설정

### 설치

Cockroach Cloud 클러스터에 Datadog 모니터링을 사용하려면 다음을 실행하세요.

1. 클러스터의 **Monitoring** > [**Tools** 페이지][1]에서 확인할 수 있습니다.

2. **API key** 및 **Datadog Site**필드에 해당 값을 입력합니다.
    - **API key**는 Datadog 조직과 연결되어 있습니다. Cockroach Cloud 클러스터에 사용할 API 키가 없는 경우 키를 생성해야 합니다. 지침은 [Datadog 설명서][2]를 참조하세요.
    - **Datadog Site**는 Datadog 사이트 URL에 대응합니다. 자세한 내용은 [Datadog 설명서][3]를 참조하세요.

3. **Create**를 클릭합니다.  클러스터의 크기와 시스템의 현재 부하에 따라 통합이 활성화되는데 다소 시간이 걸릴 수 있습니다.

4. Datadog에 클러스터가 등록되면 Datadog [인프라 목록][4]에 클러스터가 표시됩니다. 최대 몇 분 정도 걸릴 수 있습니다.

### 구성

Datadog [대시보드 목록][5]를 엽니다. CockroachDB 메트릭을 표시하는 두 가지 기본 대시보드가 있습니다.
- CockroachDB Cloud 서버리스(제한적 미리 보기)
- CockroachDB Cloud 전용

나만의 Cockroach Cloud 대시보드를 만들려면 기본 `CockroachDB Cloud Dedicated` 대시보드를 [복제][6]하고 위젯을 편집하거나 [새 대시보드를 생성합니다][7].

[사용 가능한 메트릭][8]은 나만의 차트를 위한 빌딩 블록으로 사용하기 위한 것입니다.

수집 중인 메트릭을 미리 보려면 다음을 실행합니다.

- [인프라 목록][4]에서 클러스터의 항목을 클릭하면 사용 가능한 각 메트릭에 시계열 그래프가 표시됩니다.
- [메트릭 탐색기][9]를 사용하여 `crdb_cloud` 또는 `crdb_dedicated` 메트릭을 검색하고 확인합니다.

### 검증

활성화되면 **Monitoring** 페이지의 **Datadog** 패널에서 **Integration status**가 `Active`로 표시됩니다.

통합 중에 문제가 발생하면 다음 상태 중 하나가 대신 표시될 수 있습니다.
- `Active`는 통합이 성공적으로 배포되었음을 나타냅니다.
- `Inactive`는 통합이 성공적으로 배포되지 않았음을 나타냅니다. 설정이 시도되지 않았거나 오류가 발생했습니다.
- `Unhealthy`는 연동 API 키가 유효하지 않으므로 [업데이트](#update-integration)해야 함을 나타냅니다.
- `Unknown`은 알 수 없는 오류가 발생했음을 나타냅니다. 이 상태가 표시되면 [지원팀에 문의][10]하세요.

다음 경우 CockroachDB에서 메트릭 내보내기가 중단될 수 있습니다.

- 오래된 API 키입니다. 이 사례에서 통합 상태는 `Unhealthy`입니다. 이 문제를 해결하려면 새 API 키로 [통합 업데이트](#update-integration)를 실행하세요.
- 일시적으로 CockroachDB를 사용할 수 없습니다. 이 사례에서 통합 상태는 계속 `Active`로 유지됩니다. 문제를 해결하려면 **Datadog** 패널에서 [비활성화](#deactivate-integration)를 시도하고 연동을 다시 활성화하세요. 그래도 문제가 해결되지 않으면 [지원팀에 문의][10]하세요.

메트릭 내보내기 상태를 모니터링하려면 Datadog에서 커스텀 모니터를 생성할 수 있습니다.

### 업데이트 통합

통합과 관련된 메타데이터를 업데이트하려면(예: API 키 회전) 다음을 실행하세요.

1. **Datadog** 패널에서 줄임표를 클릭하고 **Update**를 선택합니다.

1. **API key** 및 **Datadog Site** 필드를 업데이트하고 **Create**를 클릭합니다. 통합이 다시 배포됩니다. 

### 통합 비활성화

통합을 비활성화하려면 다음을 실행합니다.

1. **Datadog** 패널에서 줄임표를 클릭하고 **통합 비활성화**를 선택합니다.

1. 비활성화하면 패널의 **통합 상태**가 `Inactive`로 표시됩니다.

통합을 비활성화한 후에도 메트릭 데이터는 기본 [보존 기간][11] 동안 Datadog에 유지됩니다. 

## 수집한 데이터

### 메트릭

- `crdb_cloud` & `crdb_dedicated` [메트릭][12]

### 서비스 점검

Cockroach Cloud 통합에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

Cockroach Cloud 통합에는 이벤트가 포함되어 있지 않습니다.

## 지원

도움이 필요하세요? [Datadog 지원팀][13]에 문의하세요.


[1]: https://www.cockroachlabs.com/docs/cockroachcloud/tools-page
[2]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.datadoghq.com/ko/getting_started/site/
[4]: https://docs.datadoghq.com/ko/infrastructure/list/
[5]: https://app.datadoghq.com/dashboard/lists
[6]: https://docs.datadoghq.com/ko/dashboards/configure/#configuration-actions
[7]: https://docs.datadoghq.com/ko/dashboards/#new-dashboard
[8]: https://docs.datadoghq.com/ko/integrations/cockroachdb_dedicated/#data-collected
[9]: https://docs.datadoghq.com/ko/metrics/explorer/
[10]: https://support.cockroachlabs.com/
[11]: https://docs.datadoghq.com/ko/developers/guide/data-collection-resolution-retention/
[12]: https://github.com/DataDog/integrations-extras/blob/master/cockroachdb_dedicated/metadata.csv
[13]: https://docs.datadoghq.com/ko/help/