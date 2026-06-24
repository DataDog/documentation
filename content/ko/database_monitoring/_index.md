---
algolia:
  tags:
  - database monitoring
  - dbm
cascade:
  algolia:
    rank: 70
description: Database Monitoring에 관해 알아보기 및 시작하기
further_reading:
- link: https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency
  tag: 블로그
  text: 왕복 쿼리 지연 시간 분석
- link: https://www.datadoghq.com/blog/database-monitoring-recommendations/
  tag: 블로그
  text: Database Monitoring 권장 사항을 사용하여 데이터베이스 호스트 및 쿼리 성능 향상
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: 블로그
  text: 데이터베이스 성능 모니터링 및 시각화
- link: https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/
  tag: 블로그
  text: Datadog DBM을 사용하여 SQL Server 및 Azure 관리형 데이터베이스 모니터링
- link: https://www.datadoghq.com/blog/mongodb-database-monitoring/
  tag: 블로그
  text: Datadog Database Monitoring으로 MongoDB 성능 추적 및 문제 해결
- link: https://www.datadoghq.com/blog/datadog-database-research/
  tag: 블로그
  text: 마이크로서비스가 데이터베이스 기술 사용을 형성한 과정
- link: /database_monitoring/data_collected/
  tag: 설명서
  text: 수집된 데이터
- link: /database_monitoring/troubleshooting/
  tag: 설명서
  text: 문제 해결
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여해 Database Monitoring을 한 단계 업그레이드
- link: https://learn.datadoghq.com/courses/database-monitoring
  tag: 학습 센터
  text: Datadog DBM으로 Postgres 데이터베이스 모니터링
title: Database Monitoring
---
{{< learning-center-callout header="활성화 웨비나 세션에 참여하기" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Database">}}
  Database Monitoring을 사용하여 비용이 많이 들고 속도가 느린 쿼리를 신속하게 찾아내는 방법을 알아보세요. 정확한 실행 세부 정보를 드릴다운하여 병목을 해결합니다.
{{< /learning-center-callout >}}

Datadog Database Monitoring은 호스트 전체의 데이터베이스에 대한 심층 가시성을 제공합니다. 과거 쿼리 성능 메트릭, 실행 계획, 호스트 수준 메트릭을 모두 한곳에서 심층 탐구하여 데이터베이스의 상태와 성능을 파악하고 문제가 발생하면 해결하세요.

## 시작하기 {#getting-started}

Datadog Database Monitoring은 **Postgres**, **MySQL**, **Oracle**, **SQL Server**, **MongoDB**, **Amazon DocumentDB** 및 **ClickHouse**의 자체 호스팅 및 관리형 클라우드 버전을 지원합니다. Datadog Database Monitoring을 시작하려면 데이터베이스를 구성하고 Datadog Agent를 설치하세요. 설정 지침을 보려면 해당하는 데이터베이스 기술 선택:

### Postgres {#postgres}

{{< partial name="dbm/dbm-setup-postgres" >}}
<p></p>

### MySQL {#mysql}

{{< partial name="dbm/dbm-setup-mysql" >}}
<p></p>

### Oracle {#oracle}

{{< partial name="dbm/dbm-setup-oracle" >}}
<p></p>

### SQL Server {#sql-server}

{{< partial name="dbm/dbm-setup-sql-server" >}}
<p></p>

### MongoDB {#mongodb}

{{< partial name="dbm/dbm-setup-mongodb" >}}
<p></p>

### Amazon DocumentDB {#amazon-documentdb}

{{< partial name="dbm/dbm-setup-documentdb" >}}
<p></p>

### ClickHouse {#clickhouse}

{{< partial name="dbm/dbm-setup-clickhouse" >}}
<p></p>

## Datadog Database Monitoring 둘러보기 {#explore-datadog-database-monitoring}

Datadog에서 [Database Monitoring][1]으로 이동합니다.

### 쿼리 성능 메트릭 자세히 살펴보기 {#dig-into-query-performance-metrics}

[쿼리 메트릭 조회][2]에 정규화된 쿼리의 과거 쿼리 성능이 표시됩니다. 성능 추세를 인프라 또는 데이터센터 Availability Zone과 같은 사용자 지정 태그 기준으로 시각화하고, 이상치 경보를 설정하세요.

- 느린 쿼리 및 가장 많은 시간을 소비하는 쿼리를 식별합니다.
- 업데이트된/반환된 행과 같이 APM이 캡처하지 않은 데이터베이스 수준 메트릭을 표시합니다.
- 팀, 사용자, 클러스터 및 호스트와 같은 임의의 디멘션을 기준으로 쿼리를 필터링 및 그룹화합니다.

{{< img src="database_monitoring/dbm-query-metrics-2.png" alt="Database Monitoring" style="width:100%;">}}

### 쿼리 샘플 탐색 {#explore-query-samples}

[쿼리 샘플 조회][3]를 이용하면 주어진 시간에 어느 쿼리가 실행 중인지 파악할 수 있습니다. 각 실행을 쿼리 및 관련 쿼리의 평균 성능에 비교하세요.

- 메트릭이 캡처하지 않는, 비정상적으로 느리지만 빈도가 낮은 쿼리를 식별합니다.
- 쿼리의 실행 시간 또는 실행 비용에서 이상치를 찾습니다.
- 특정 쿼리 실행을 사용자, 애플리케이션 또는 클라이언트 호스트에 귀속시킵니다.

{{< img src="database_monitoring/dbm-query-sample-2.png" alt="Database Monitoring" style="width:100%;">}}

### 실행하기 전에 이해하기 {#understand-before-you-run}

[실행 계획][4]은 데이터베이스가 쿼리를 어떻게 실행하려고 계획하는지 이해하는 데 도움이 됩니다.

- 각 작업을 단계별로 진행하여 병목을 식별합니다.
- 쿼리 효율성을 향상하고 큰 규모의 표에서 비용이 많이 드는 순차 스캔 비용을 절약합니다.
- 시간이 지남에 따라 쿼리의 계획이 어떻게 변경되는지 확인합니다.

{{< img src="database_monitoring/dbm-explain-plan-3.png" alt="Database Monitoring" style="width:100%;">}}

### 사용자 지정 메트릭 수집 {#collect-custom-metrics}

[`custom_queries`][7]를 사용하여 데이터베이스 표에서 메트릭을 수집하세요. 애플리케이션 상태, 비즈니스 카운터, 대기열 깊이 또는 쿼리 성능과 상호 연계하고자 하는 모든 데이터를 수집할 수 있습니다.

### 보강된 대시보드에서 모든 항목 시각화 {#visualize-everything-on-enriched-dashboards}

자체 호스팅 및 클라우드 관리형 인스턴스 둘 모두에 대하여 보강된 통합 대시보드에서 데이터베이스 및 시스템 메트릭을 조회하여 문제 영역을 신속하게 찾아냅니다. 대시보드를 복제하여 사용자 지정하고 자체 사용자 지정 메트릭으로 강화할 수 있습니다. 쿼리 메트릭 및 쿼리 샘플 페이지 상단의 {{< ui >}}Dashboards{{< /ui >}} 링크를 클릭하면 Database Monitoring 대시보드로 이동합니다.

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Database Monitoring" style="width:100%;">}}

### 호스트 상태 및 성능 최적화 {#optimize-host-health-and-performance}

[데이터베이스 페이지][1]에서 데이터베이스 호스트의 상태 및 활동을 평가할 수 있습니다. 목록을 정렬 및 필터링하여 트리거된 경보, 높은 쿼리량 및 기타 기준에 따라 호스트의 우선순위를 지정하세요. 개별 호스트를 클릭하면 해당 호스트의 구성, 일반적인 차단 쿼리 및 호출 서비스와 같은 세부 정보를 조회할 수 있습니다. 자세한 내용은 [데이터베이스 호스트 탐색][5]을 참조하세요.

{{< img src="database_monitoring/databases-list.png" alt="Datadog의 데이터베이스 페이지" style="width:90%;" >}}

### 최적화 권장 사항 조회 {#view-optimization-recommendations}

[권장 사항 페이지][6]에는 문제점과 최적화 기회가 강조 표시되어 있어 무엇이 가장 중요한지 우선순위를 정함으로써 시간을 절약하는 데 도움이 됩니다. 권장 사항을 선택하면 문제의 요약과 같은 세부 정보가 표시되며, 해당 문제를 해결하기 위한 잠재적인 다음 단계도 확인할 수 있습니다.

{{< img src="database_monitoring/recommendations-page.png" alt="Datadog의 권장 사항 페이지" style="width:90%;" >}}


## 추가 자료 {#further-reading}

{{< learning-center-callout header="학습 센터에서 Datadog DBM으로 Postgres Database 모니터링 수강해 보기" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/database-monitoring">}}
  Datadog 학습 센터에는 이 주제에 관해 배워 보는 데 도움이 되는 실습 과정이 많습니다. 무료로 등록하여 Postgres 데이터베이스의 비효율성을 알아보고 최적화하세요.
{{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /ko/database_monitoring/query_metrics/
[3]: /ko/database_monitoring/query_samples/
[4]: /ko/database_monitoring/query_metrics/#explain-plans
[5]: /ko/database_monitoring/database_hosts/
[6]: /ko/database_monitoring/recommendations/
[7]: /ko/database_monitoring/custom_metrics/