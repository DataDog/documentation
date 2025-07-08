---
app_id: eversql
app_uuid: bc900600-d0cf-4ddf-83b7-cdaba44d1525
assets: {}
author:
  homepage: https://eversql.com
  name: EverSQL
  sales_email: sales@eversql.com
  support_email: support@eversql.com
categories:
- 자동화
- 데이터 저장소
- 개발 툴
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/eversql/README.md
display_on_public_website: true
draft: false
git_integration_title: eversql
integration_id: eversql
integration_title: 'EverSQL: 데이터베이스 튜닝'
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: eversql
public_title: 'EverSQL: 데이터베이스 튜닝'
short_description: MySQL, PostgreSQL, Aurora를 위한 자동 SQL 및 데이터베이스 튜닝
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::자동화
  - Category::Data Stores
  - Category::Developer Tools
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: MySQL, PostgreSQL, Aurora를 위한 자동 SQL 및 데이터베이스 튜닝
  media:
  - caption: EverSQL SQL 최적화
    image_url: images/1.png
    media_type: image
  - caption: EverSQL 쿼리 차이
    image_url: images/2.png
    media_type: image
  - caption: EverSQL 지원 데이터베이스
    image_url: images/3.png
    media_type: image
  - caption: EverSQL 지원 OS
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: 'EverSQL: 데이터베이스 튜닝'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[EverSQL][1]은 개발자, DBA 및 DevOps 엔지니어를 위한 자동 SQL 튜닝 및 인덱싱을 제공하여 데이터베이스 속도를 높이고 SQL 쿼리를 최적화하는 방법입니다.

EverSQL은 비침해적이며 데이터베이스의 민감한 데이터에 액세스하지 않습니다.

### 사용법

Datadog Database Monitoring 대시보드에서 발견된 느린 SQL 쿼리는 EverSQL을 사용하여 최적화할 수 있습니다. Datadog에서 느린 SQL 쿼리를 복사하여 EverSQL의 [SQL Optimization][2] 프로세스에 직접 붙여넣습니다. [데이터베이스 모니터링 시작하기][3] 가이드에서 느린 쿼리 문제 해결에 대해 자세히 알아보세요.

### 지원되는 데이터베이스:
MySQL, PostgreSQL, AWS Aurora, Google Cloud SQL, Azure DB, Percona, MariaDB.

## 설정

### 설정
Datadog으로 식별된 느린 SQL 쿼리 속도를 높이려면 다음을 수행하세요.
1. [Datadog Database Monitoring][4] 대시보드로 이동하여 느린 SQL 쿼리 테이블을 찾습니다.
2. 관련 데이터베이스에 대한 필터를 추가하고 Average Latency와 같은 관련 성능 메트릭을 기준으로 정렬합니다.
3. 속도를 높이고 싶은 SQL 쿼리를 식별한 후 Datadog에서 복사합니다.
4. [EverSQL][2]로 이동하여 쿼리 최적화 프로세스의 일부로 SQL 쿼리를 붙여넣습니다.
5. 최적화 보고서에서 데이터베이스에 최적의 인덱스를 복사하고 생성합니다.
6. 다시 작성된 최적화된 쿼리를 애플리케이션 코드에 복사합니다.

## 수집한 데이터

### 메트릭

EverSQL은 메트릭을 포함하지 않습니다.

### 서비스 점검

EverSQL은 서비스 점검을 포함하지 않습니다.

### 이벤트

EverSQL은 이벤트를 포함하지 않습니다.

## 지원

도움이 필요하신가요? [EverSQL 지원팀][5]에 문의하세요.

[1]: https://www.eversql.com/
[2]: https://www.eversql.com/sql-query-optimizer/
[3]: https://docs.datadoghq.com/ko/getting_started/database_monitoring/#troubleshoot-a-slow-query
[4]: https://app.datadoghq.com/databases/
[5]: https://eversql.freshdesk.com/support/tickets/new