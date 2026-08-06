---
app_id: singlestoredb-cloud
app_uuid: c7638089-0864-4ddc-bd32-b731c58fe567
assets:
  dashboards:
    singlestoredb_cloud_overview: assets/dashboards/singlestoredb_cloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: singlestoredb_cloud.cpu_resource_limits
      metadata_path: metadata.csv
      prefix: singlestoredb_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10373
    source_type_name: SinglestoreDB Cloud
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.singlestore.com
  name: Singlestore
  sales_email: info@singlestore.com
  support_email: support@singlestore.com
categories:
- 데이터 스토어
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/singlestoredb_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: singlestoredb_cloud
integration_id: singlestoredb-cloud
integration_title: SingleStoreDB Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: singlestoredb_cloud
public_title: SingleStoreDB Cloud
short_description: SinglestoreDB Cloud 메트릭을 Datadog으로 전송
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
  - Offering::Integration
  - 제출한 데이터 유형::메트릭
  configuration: README.md#Setup
  description: SinglestoreDB Cloud 메트릭을 Datadog으로 전송
  media:
  - caption: SinglestoreDB Cloud - 대시보드
    image_url: images/singlestoredb-cloud-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SingleStoreDB Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

SingleStoreDB Cloud는 데이터 집약적인 실시간 애플리케이션을 지원하기 위해 최적화된 속도와 확장성을 갖춘 분산 관계형 데이터베이스입니다. 이 통합을 사용하면 SinglestoreDB Cloud Workspace 그룹/클러스터의 전반적인 상태와 성능을 모니터링할 수 있습니다. Datadog을 SingleStoreDB Cloud와 통합하려면 Datadog SingleStore 통합을 설치한 후 [클라우드 포털][1]에서 구성하세요.

SinglestoreDB Cloud를 Datadog에 연결하여 다음을 수행할 수 있습니다.

- 주요 SinglestoreDB Cloud 메트릭 시각화
- 자원 활용 효율성 향상
- 쿼리 속도 및 성능 관찰
- SinglestoreDB 성능을 나머지 애플리케이션과 상호 연결

## 설정

### Datadog에 SingleStoreDB Cloud 통합 설치

1. Datadog에서 [SingleStoreDB Cloud][2] 통합 타일로 이동합니다.
3. **Install Integration**를 선택하고 계속 진행하기 전에 설치가 완료될 때까지 기다립니다.
4. **Configure** 탭에서 **Connect Accounts**를 선택합니다. 이 작업을 수행하면 [클라우드 포털][1]로 이동하여 OAuth를 통한 통합을 승인할 수 있습니다.

위 단계는 첫 번째 워크스페이스 그룹을 Datadog에 연결하기 위해 한 번만 수행하면 됩니다. 통합이 설치되고 계정이 연결되면 [클라우드 포털에서 Datadog 통합 구성](#configure-the-datadog-integration-in-the-cloud-portal)에 지정된 단계에 따라 연속 워크스페이스 그룹을 연결합니다.

### 클라우드 포털에서 Datadog 통합 구성

SingleStoreDB Cloud 워크스페이스 그룹을 Datadog과 연결하려면:

1. 클라우드 포털에 로그인합니다. 로그인하면 **Integration** 페이지가 나타납니다. 왼쪽 탐색 창에서 **Monitoring > Integration**을 선택하여 이 페이지에 액세스할 수도 있습니다.
2. 사용 가능한 통합 목록에서 Datadog에 대한 **+ Integration**을 선택합니다.
3. **Create Datadog Integration** 대화 상자의 **Workspace Group** 목록에서 워크스페이스 그룹을 선택합니다.
4. **Create***를 선택합니다. 이 작업을 수행하면 Datadog 로그인 페이지로 연결됩니다. Datadog에 로그인한 후 다음 단계로 진행하세요.
5. **Authorize access** 화면에서 **Authorize** 버튼을 선택합니다. 승인이 성공적으로 완료되면 클라우드 포털의 **Integration** 페이지로 이동됩니다.

이제 Datadog을 사용하여 SingleStoreDB Cloud 데이터베이스를 모니터링할 수 있습니다.

### Datadog 통합 제거

Datadog 통합을 제거하려면 다음 단계를 따르세요.

1. **Datadog에서 SingleStoreDB Cloud 통합 제거**: Datadog에서 [SingleStore DB Cloud 통합 타일][2]로 이동하여 **Uninstall Integration**를 클릭합니다. 이 통합이 제거되면 이전의 모든 인증이 취소됩니다.
2. **SingleStore 클라우드 포털에서 Datadog 통합 제거**: 클라우드 포털에서 **Monitoring > Integration**으로 이동합니다. 제거하려는 각 Datadog 구성에 대해 **Delete**를 선택합니다.

추가적으로 이 통합과 관련된 모든 API 키를 제거합니다.

특정 워크스페이스 그룹의 모니터링을 중지하고 통합을 유지하려면 SingleStore DB 클라우드 포털로 이동한 후 **Delete** (**Cloud Portal > Monitoring > Integration**)를 선택하여 이 워크스페이스 그룹에 대한 Datadog 구성을 제거합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "singlestoredb-cloud" >}}


### 서비스 점검

SingleStoreDB Cloud는 서비스 점검을 포함하지 않습니다.

### 이벤트

SingleStoreDB Cloud는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.


[1]: https://portal.singlestore.com
[2]: https://app.datadoghq.com/integrations/singlestoredb-cloud
[3]: https://github.com/DataDog/integrations-extras/blob/master/singlestoredb_cloud/metadata.csv
[4]: https://docs.datadoghq.com/ko/help/