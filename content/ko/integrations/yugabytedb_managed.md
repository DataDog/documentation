---
app_id: yugabytedb-managed
app_uuid: c5cf1ad4-fa3f-4835-9f3b-f467288b382a
assets:
  dashboards:
    yugabytedb_managed_overview: assets/dashboards/yugabytedb_managed_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: ybdb.up
      metadata_path: metadata.csv
      prefix: ybdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10408
    source_type_name: YugabyteDB Managed
author:
  homepage: https://yugabyte.com/
  name: YugabyteDB
  sales_email: sales@yugabyte.com
  support_email: support@yugabyte.com
categories:
- 데이터 스토어
- cloud
- aws
- azure
- google cloud
- metrics
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/yugabytedb_managed/README.md
display_on_public_website: true
draft: false
git_integration_title: yugabytedb_managed
integration_id: yugabytedb-managed
integration_title: YugabyteDB Managed
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: yugabytedb_managed
public_title: YugabyteDB Managed
short_description: YugabyteDB Managed 클러스터 메트릭을 Datadog로 내보내기
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::데이터 저장
  - Supported OS::Linux
  - "\b카테고리::클라우드"
  - Category::AWS
  - Category::Azure
  - Category::Google Cloud
  - 카테고리::메트릭
  - 제출한 데이터 유형::메트릭
  - 제공::통합
  configuration: README.md#Setup
  description: YugabyteDB Managed 클러스터 메트릭을 Datadog로 내보내기
  media:
  - caption: YugabyteDB Managed Overview 대시보드
    image_url: images/overview.png
    media_type: image
  - caption: YSQL 메트릭을 모니터링하는 그래프
    image_url: images/ysql.png
    media_type: image
  - caption: YCQL 메트릭을 모니터링하는 그래프
    image_url: images/ycql.png
    media_type: image
  - caption: node/infrastructure 메트릭을 모니터링하는 그래프
    image_url: images/infrastructure.png
    media_type: image
  - caption: master server 메트릭을 모니터링하는 그래프
    image_url: images/master.png
    media_type: image
  - caption: tablet-server 메트릭을 모니터링하는 그래프
    image_url: images/tserver.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: YugabyteDB Managed
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[YugabyteDB][1]는 클라우드 네이티브 분산 데이터베이스로, PostgreSQL과 API 호환이 가능합니다.

[YugabyteDB Managed][2]는 YugabyteDB의 완전 관리형 Database-as-a-service (DBaaS)입니다. 이 통합을 통해 클러스터 메트릭을 Datadog에 전송하여 YugabyteDB Managed 클러스터의 상태 및 성능을 파악할 수 있습니다. 또한, 이 통합의 기본 대시보드에서 YugabyteDB Managed 클러스터의 상태 및 성능을 모니터링하는 데 필요한 모든 주요 메트릭을 파악할 수 있습니다. 확인 가능한 메트릭은 다음과 같습니다.
- 노드 리소스 사용량(디스크, 메모리, CPU, 네트워킹 등)
- 읽기/쓰기 작업 처리량 및 대기 시간(YSQL과 YCQL 모두).
- 고급 Master 및 Tablet Server 원격 측정(예: 내부 RPC 처리량/대기 시간 및 WAL 읽기/쓰기 처리량).

## 설정
**참고**: 이 기능은 [Sandbox Clusters][3]에서 사용할 수 없습니다.

### 설치

Datadog과 YugabyteDB Managed 통합을 활성화하는 방법:

#### 구성 만들기
1. YugabyteDB Managed에서 **Integrations > Metrics** 탭으로 이동합니다.
2. **Create Export Configuration** 또는 **Add Export Configuration**을 클릭합니다.
3. **Datadog** 공급자를 선택합니다.
4. **API key** 및 **Site** 필드에 해당 값을 입력합니다. 자세한 내용은 [Datadog API 및 Application Keys][4], [Datadog Site URL][5] 문서에서 확인하세요.
5. **Test Configuration**을 클릭하여 구성을 검증합니다.
6. **Create Configuration**을 클릭합니다.

#### 클러스터에 구성 연결하기
1. YugabyteDB Managed에서 **Integrations > Metrics** 탭으로 이동합니다.
2. **Export Metrics by Cluster** 표에서 해당 클러스터를 찾습니다.
3. **Export Configuration** 드롭다운 메뉴에서 원하는 구성을 선택합니다.
4. **Export Status**에 `Active`가 표시될 때까지 기다립니다.

**참고**: 클러스터가 일시 중지되었거나 다른 작업이 진행 중일 때는 구성을 연결할 수 없습니다.

설정에 대한 자세한 내용은 [YugabyteDB 문서][6]를 참고하세요.

## 삭제

Datadog으로 메트릭 내보내기를 비활성화하는 방법:
1. YugabyteDB Managed에서 **Integrations > Metrics** 탭으로 이동합니다.
2. **Export Metrics by Cluster** 표에서 해당 클러스터를 찾습니다.
3. **Export Configuration** 드롭다운에서 해당 클러스터의 드롭다운을 열고 `None`을 선택합니다.
4. **Export Status**에 `-`가 표시될 때까지 기다립니다.

**참고**: 클러스터가 일시 중지되었거나 다른 작업이 진행 중일 때는 구성을 연결할 수 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "yugabytedb_managed" >}}


### 서비스 점검

YugabyteDB Managed는 서비스 점검을 포함하지 않습니다.

### 이벤트

YugabyteDB Managed는 이벤트를 포함하지 않습니다.

## 지원

도움이 필요하신가요? [YugabyteDB 지원팀][8]에 문의하세요.


[1]: https://yugabyte.com/
[2]: https://www.yugabyte.com/managed/
[3]: https://docs.yugabyte.com/preview/yugabyte-cloud/cloud-basics/create-clusters/create-clusters-free/
[4]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[5]: https://docs.datadoghq.com/ko/getting_started/site/
[6]: https://docs.yugabyte.com/preview/yugabyte-cloud/cloud-monitor/metrics-export/#datadog
[7]: https://github.com/DataDog/integrations-extras/blob/master/yugabytedb_managed/metadata.csv
[8]: https://support.yugabyte.com/hc/en-us/requests/new