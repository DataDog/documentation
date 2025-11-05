---
app_id: tidb-cloud
app_uuid: 9ed710d3-49d4-41fa-a304-0b27f289bdb7
assets:
  dashboards:
    TiDB Cloud Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: tidb_cloud.db_queries_total
      metadata_path: metadata.csv
      prefix: tidb_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10247
    source_type_name: TiDB Cloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: PingCAP
  sales_email: xuyifan02@pingcap.com
  support_email: xuyifan02@pingcap.com
categories:
- cloud
- 데이터 스토어
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tidb_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: tidb_cloud
integration_id: tidb-cloud
integration_title: TiDB Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tidb_cloud
public_title: TiDB Cloud
short_description: 'Datadog를 통한 TiDB 클라우드 클러스터 모니터링 '
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
  - 카테고리::데이터 저장
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog를 통한 TiDB 클라우드 클러스터 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TiDB Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[TiDB 클라우드][1]는 오픈소스 데이터베이스인 TiDB의 완전 관리형 클라우드 서비스입니다.

TiDB Cloud Datadog 통합을 사용하여 TiDB Cloud 클러스터에서 Datadog로 메트릭을 내보내세요.

> **참고:**
>
> - 온프레미스 TiDB 클러스터의 경우 [TiDB 통합][2]을 참조하세요.

## 설정

클러스터에 대한 TiDB Cloud Datadog 통합을 설정하려면, Datadog API 키와 지역을 TiDB Cloud에 제공하세요.

TiDB 클라우드 프로젝트에 대한 Datadog 통합을 구성하려면 [TiDB 클라우드 기본 설정][3]을 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "tidb_cloud" >}}


### 서비스 점검

TiDB Cloud 통합에는 서비스 점검이 포함되지 않습니다.

### 이벤트

TiDB Cloud 통합에는 이벤트가 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://tidbcloud.com
[2]: https://docs.datadoghq.com/ko/integrations/tidb/
[3]: https://tidbcloud.com/console/preferences
[4]: https://github.com/DataDog/integrations-extras/blob/master/tidb_cloud/metadata.csv
[5]: https://docs.datadoghq.com/ko/help/