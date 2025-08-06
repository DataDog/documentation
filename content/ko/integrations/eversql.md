---
app_id: eversql
categories:
- 자동화
- 데이터 저장소
- 개발 툴
custom_kind: 통합
description: MySQL, PostgreSQL, Aurora를 위한 자동 SQL 및 데이터베이스 튜닝
integration_version: 1.0.0
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
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: 'EverSQL: 데이터베이스 튜닝'
---
## 개요

[EverSQL](https://www.eversql.com/) is a way to speed up your database and optimize SQL queries, providing automatic SQL tuning and indexing for developers, DBAs, and DevOps engineers.

EverSQL은 비침해적이며 데이터베이스의 민감한 데이터에 액세스하지 않습니다.

### 사용법

Slow SQL queries found in the Datadog Database Monitoring dashboard can be optimized using EverSQL. Copy the slow SQL query from Datadog and paste it directly into EverSQL's [SQL Optimization](https://www.eversql.com/sql-query-optimizer/) process. Learn more about troubleshooting a slow query in the [Getting Started with Database Monitoring](https://docs.datadoghq.com/getting_started/database_monitoring/#troubleshoot-a-slow-query) guide.

### Supported Databases:

MySQL, PostgreSQL, AWS Aurora, Google Cloud SQL, Azure DB, Percona, MariaDB.

## 설정

### 설정

Datadog으로 식별된 느린 SQL 쿼리 속도를 높이려면 다음을 수행하세요.

1. Navigate to the [Datadog Database Monitoring](https://app.datadoghq.com/databases/) dashboard and locate the slow SQL queries table.
1. 관련 데이터베이스에 대한 필터를 추가하고 Average Latency와 같은 관련 성능 메트릭을 기준으로 정렬합니다.
1. 속도를 높이고 싶은 SQL 쿼리를 식별한 후 Datadog에서 복사합니다.
1. Navigate to [EverSQL](https://www.eversql.com/sql-query-optimizer/) and paste the SQL query as part of the query optimization process.
1. 최적화 보고서에서 데이터베이스에 최적의 인덱스를 복사하고 생성합니다.
1. 다시 작성된 최적화된 쿼리를 애플리케이션 코드에 복사합니다.

## 수집한 데이터

### Metrics

EverSQL은 메트릭을 포함하지 않습니다.

### 서비스 점검

EverSQL은 서비스 점검을 포함하지 않습니다.

### 이벤트

EverSQL은 이벤트를 포함하지 않습니다.

## 지원

Need help? Contact [EverSQL support](https://eversql.freshdesk.com/support/tickets/new).