---
algolia:
  tags:
  - 데이터베이스 모니터링
  - dbm
cascade:
  algolia:
    rank: 70
description: 데이터베이스 모니터링 시작하기
further_reading:
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: 블로그
  text: 데이터베이스 성능 모니터링 및 시각화
- link: https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/
  tag: 블로그
  text: Datadog DBM을 사용하여 SQL Server 및 Azure 관리 데이터베이스 모니터링
- link: /database_monitoring/data_collected/
  tag: 설명서
  text: 수집한 데이터
- link: /database_monitoring/troubleshooting/
  tag: 설명서
  text: 트러블슈팅
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세선에 참여해 데이터베이스 모니터링을 한 단계 업그레이드하세요.
kind: 설명서
title: 데이터베이스 모니터링
---
Datadog 데이터베이스 모니터링을 사용하면 호스트 전반에 있는 데이터베이스에 대한 가시성을 확보할 수 있습니다. 쿼리 성능 메트릭 내역, 설명 계획, 호스트 수준 메트릭 등을 모두 한 곳에서 살펴보고, 데이터베이스의 상태와 성능을 파악하여 문제 발생 시 문제를 해결할 수 있습니다.

## 시작하기

Datadog 데이터베이스 모니터링은 자체 호스팅과 **Postgres**, **MySQL**, **Oracle**, **SQL Server**의 관리형 클라우드 버전을 지원합니다. Datadog 데이터베이스 모니터링을 시작하려면 데이터베이스를 설정하고 Datadog 에이전트를 설치하세요. 설정 지침을 확인하려면 데이터베이스 기술을 선택하세요.

### Postgres

{{< partial name="dbm/dbm-setup-postgres" >}}
<p></p>

### MySQL

{{< partial name="dbm/dbm-setup-mysql" >}}
<p></p>

### Oracle

{{< partial name="dbm/dbm-setup-oracle" >}}
<p></p>

### SQL 서버

{{< partial name="dbm/dbm-setup-sql-server" >}}
<p></p>

## Datadog 데이터베이스 모니터링 탐색하기

Datadog에서 [데이터베이스 모니터링][1]로 이동합니다.

### 쿼리 성능 메트릭 세부 정보

[쿼리 메트릭 보기][2]에서 표준화된 쿼리의 쿼리 성능 내역을 확인할 수 있습니다. 데이터센터 가용 영역과 같은 인프라스트럭처나 커스텀 태그로 성능 트렌드를 가시화하고 이상 징후 알림을 설정하세요.

- 느린 쿼리와 가장 많은 시간을 소비하는 쿼리를 식별합니다.
- 업데이트/반환된 행과 같이 APM에서 캡처하지 않는 데이터베이스 수준 메트릭을 표시합니다.
- 팀, 사용자, 클러스터, 호스트 등의 모든 차원에서 쿼리를 필터링하고 그룹화합니다.

{{< img src="database_monitoring/dbm-query-metrics-2.png" alt="데이터베이스 모니터링" style="width:100%;">}}

### 쿼리 샘플 탐색

[쿼리 샘플 보기][3]에서 주어진 시간 내에 어떤 쿼리가 실행되는지 확인할 수 있습니다. 각 실행을 쿼리 평균 성능 및 관련 쿼리와 비교할 수 있습니다.

- 메트릭에 의해 캡처되지 않는 비정상적으로 느리지만 드문 쿼리를 식별합니다.
- 쿼리 실행 시간이나 실행 비용에서 이상값을 찾아냅니다.
- 특정 쿼리 실행을 사용자, 애플리케이션 또는 클라이언트 호스트와 연결합니다.

{{< img src="database_monitoring/dbm-query-sample-2.png" alt="데이터베이스 모니터링" style="width:100%;">}}

### 실행하기 전에 이해하기

[Explain Plans][4]는 데이터베이스가 쿼리 실행을 계획하는 방법을 이해하는 데 도움이 됩니다.

- 각 작업을 단계별로 진행하여 병목 현상을 파악합니다.
- 쿼리 효율성을 개선하고 큰 규모의 테이블에서 비용이 많이 드는 순차 스캔을 절약할 수 있습니다.
- 시간이 지남에 따라 쿼리의 계획이 어떻게 변경되는지 확인하세요.

{{< img src="database_monitoring/dbm-explain-plan-3.png" alt="데이터베이스 모니터링" style="width:100%;">}}

### 향상된 대시보드로 모든 것을 시각화

자체 호스팅 인스턴스 및 클라우드 관리형 인스턴스용 향상된 통합 대시보드에서 데이터베이스와 시스템 메트릭을 함께 표시하여 문제가 되는 영역을 빠르게 찾아낼 수 있습니다. 대시보드를 복제하여 커스텀 메트릭과 함께 사용자 맞춤 기능을 사용해 보세요. Query Metrics와 Query Samples 페이지 상단에 있는 **Dashboards** 링크를 클릭하여 데이터베이스 모니터링 대시보드로 이동할 수 있습니다. 

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Database Monitoring" style="width:100%;">}}

### 호스트 상태 및 성능 최적화

[데이터베이스 페이지][1]에서 데이터베이스 호스트의 활동과 상태를 확인할 수 있습니다. 알림이 트리거되었거나 쿼리 볼륨이 높은 호스트 등 여러 기준에 따라 호스트 우선순위를 정렬하고 필터링할 수 있습니다. 각 호스트를 클릭하면 호스트 구성, 일반적으로 블록된 쿼리, 서비스 호출과 같은 상세 내역을 확인할 수 있습니다. 자세한 내용은 [데이터베이스 호스트 탐색][5]을 참고하세요.

{{< img src="database_monitoring/databases-list.png" alt="Datadog 데이터베이스 페이지" style="width:90%;" >}}

## 참고 자료

{{< learning-center-callout header="학습 센터에서 Datadog DBM으로 Postgres 데이터베이스를 모니터링해 보세요." btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/database-monitoring" >}}
Datadog 학습 센터에는 이 주제에 대해 학습하는 데 유용한 실습 과정이 다양하게 준비되어 있습니다. 무료로 등록하여 비효율성을 식별하고 Postgres 데이터베이스를 최적화하세요.
{{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /ko/database_monitoring/query_metrics/
[3]: /ko/database_monitoring/query_samples/
[4]: /ko/database_monitoring/query_metrics/#explain-plans
[5]: /ko/database_monitoring/database_hosts/