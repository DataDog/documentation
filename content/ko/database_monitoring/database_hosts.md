---
description: 데이터베이스 호스트 상태 및 구성을 탐색하고 자세히 알아보기
title: 데이터베이스 호스트 탐색
---

{{< img src="database_monitoring/databases-list-4.png" alt="Datadog의 Databases 페이지" style="width:100%;" >}}

[데이터베이스 페이지][1]에서 데이터베이스 호스트 및 [클러스터](#cluster-grouping)의 상태 및 활동을 평가할 수 있습니다. 목록을 정렬 및 필터링하여 트리거된 알림, 높은 쿼리 볼륨, 기타 기준에 따라 호스트 및 클러스터의 우선순위를 정할 수 있습니다. 목록에서 호스트를 클릭하면 세부 정보 패널이 열립니다.


{{< img src="database_monitoring/db-list-details-panel-cropped-3.png" alt="Databases 페이지의 단일 데이터베이스 호스트 세부 정보 패널" style="width:90%;" >}}

호스트 세부 정보 패널에는 해당 호스트의 활성 연결에 대한 필터링 가능한 그래프와 함께 다음 기능이 표시됩니다.

|                                                 | Postgres  | SQL 서버 | MySQL     | Oracle    |
|-------------------------------------------------|-----------|------------|-----------|-----------|
| [상위 쿼리](#top-queries)                     | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [저장 프로시저](#stored-procedures)         |           | {{< X >}}  |           |           |
| [메트릭](#metrics)                             | {{< X >}} | {{< X >}}  |           |           |
| [활성 연결](#active-connections)       | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [스키마](#schema)                               | {{< X >}} | {{< X >}}  |           |           |
| [차단 쿼리](#blocking-queries)           | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [호출 서비스](#calling-services)           | {{< X >}} | {{< X >}}  | {{< X >}} |           |
| [구성 세부 정보](#configuration-details) | {{< X >}} | {{< X >}}  | {{< X >}} |           |

## 클러스터 그룹화
호스트 태그가 클러스터 토폴로지가 있음을 나타내는 경우 데이터베이스 호스트 목록과 함께 **Group into clusters** 토글이 표시됩니다. 해당 토글을 활성화하면 목록 내에서 호스트를 클러스터로 그룹화할 수 있습니다.

클러스터 행에는 **Cluster** 배지와 클러스터의 인스턴스 수가 표시됩니다. 클러스터 행의 열에는 클러스터 내의 모든 인스턴스에서 집계된 데이터가 표시됩니다. 클러스터 행을 선택하여 펼치면 클러스터에 포함된 모든 인스턴스 목록을 볼 수 있습니다.

클러스터 그룹화는 다음과 같은 데이터베이스 기술 및 클러스터 토폴로지를 지원합니다.

<table>
  <colgroup>
    <col style="width:15%">
    <col style="width:20%">
    <col style="width:30%">
    <col style="width:35%">
  </colgroup>
  <thead>
    <tr>
      <th>데이터베이스</th>
      <th>토폴로지</th>
      <th>태그 그룹화</th>
      <th>클러스터 이름 소스</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Amazon RDS<br><em>(AWS 통합 필요)</em></td>
      <td>
        <ul>
          <li>다중 AZ 클러스터</li>
          <li>읽기 레플리카</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>dbclusteridentifier</code></li>
          <li><code>리전</code></li>
          <li><code>aws_account</code></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>dbclusteridentifier</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>PostgreSQL<br><em>(Agent v7.58+ 필요)</em></td>
      <td>
        <ul>
          <li>물리적 복제</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>system_identifier</code></li>
          <li><code>env</code></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>postgresql_cluster_name</code> (인스턴스<code>cluster_name</code> 구성에서)</li>
          <li>주요 인스턴스 이름</li>
          <li><code>system_identifier</code></li>
        </ul>
      </td>
    </tr>
        <tr>
      <td>MySQL<br><em>(Agent v7.68+ 필요)</em></td>
      <td>
        <ul>
          <li>일반 복제 (그룹 복제 아님)</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>cluster_uuid</code></li>
          <li><code>env</code></li>
        </ul>
      </td>
      <td>
        <ul>
          <li>주요 인스턴스 이름</li>
          <li><code>cluster_uuid</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## 상위 쿼리

호스트 세부 정보 패널의 **Top Queries** 탭에서 최대 실행 시간, 평균 레이턴시 등을 기준으로 가장 일반적인 쿼리를 정렬할 수 있습니다.

{{< img src="database_monitoring/db-list-top-queries.png" alt="Databases 페이지의 단일 데이터베이스 호스트 세부 정보 패널의 Top Queries 탭" style="width:90%;" >}}

쿼리 문을 클릭하면 다음이 포함된 세부 정보 패널이 열립니다.
- 쿼리 인사이트
- 평균 레이턴시 및 기타 주요 메트릭에 대한 그래프
- 플랜 설명
- 차단 활동
- 쿼리를 실행한 호스트
- 호출 서비스

{{< img src="database_monitoring/db-list-query-details.png" alt="개별 상위 쿼리 세부 정보 패널" style="width:90%;" >}}

### 저장 프로시저

지원되는 경우 **Top Queries** 탭에는 각 저장 프로시저를 이름별로 나열한 **Stored Procedures** 섹션과 함께 평균 실행 시간, 논리적 읽기 횟수, 논리적 쓰기 횟수 등이 표시됩니다. 저장 프로시저를 확장하면 개별 SQL 쿼리를 확인할 수 있고, 쿼리를 클릭하면 세부 정보 패널을 볼 수 있습니다.

{{< img src="database_monitoring/stored-procedures.png" alt="저장 프로시저 목록 중 하나를 확장하여 표시된 SQL 쿼리" style="width:90%;" >}}

## Metrics

호스트 세부 정보 패널의 **Metrics** 탭에서 시스템 상태, 쿼리 활동, 차단 작업, 함수 성능 및 기타 주요 영역에 대한 메트릭을 확인 및 필터링할 수 있습니다.

{{< img src="database_monitoring/db-list-metrics.png" alt="Databases 페이지의 단일 데이터베이스 호스트 세부 정보 패널의 메트릭 탭" style="width:90%;" >}}

## 활성 연결

호스트 세부 정보 패널의 **Active Connections** 탭에는 호스트에서 실행 중인 실시간 쿼리가 표시됩니다. 쿼리 문을 클릭하면 이벤트 속성, 관련 트레이스 및 기타 관련 세부 정보가 포함된 패널이 열립니다.

{{< img src="database_monitoring/db-list-active-connections-2.png" alt="Databases 페이지의 단일 데이터베이스 호스트 세부 정보 패널의 Active Connections 탭" style="width:90%;" >}}

## 스키마

**Schema** 탭에서 호스트의 모든 데이터베이스에 대한 데이터베이스 구조, 테이블, 열, 데이터 유형, 기존 외래 키, 인덱싱 전략을 탐색할 수 있습니다.

{{< img src="database_monitoring/db-list-schema-tab.png" alt="Databases 페이지의 단일 데이터베이스 호스트 세부 정보 패널의 Schema 탭" style="width:90%;" >}}

## 차단 쿼리

호스트 세부 정보 패널의 **Blocking Queries** 탭에서 다음에 관한 시각화 정보를 확인할 수 있습니다.

- 차단 쿼리 지속 시간
- 차단 쿼리 실행 횟수
- 대기 중인 쿼리 수

쿼리 또는 샘플을 검색 및 필터링할 수 있습니다. 세부 정보를 보려면 개별 쿼리 행을 클릭합니다.

{{< img src="database_monitoring/db-list-blocking-queries.png" alt="Databases 페이지의 단일 데이터베이스 호스트 세부 정보 패널의 Blocking Queries 탭" style="width:90%;" >}}

## 호출 서비스

호스트 세부 정보 패널의 **Calling Services** 탭에서 호스트를 호출한 서비스 목록을 확인할 수 있습니다. 표시된 서비스 정보에는 서비스가 배포된 시기, 호스트에 대한 초당 요청 횟수, 실행된 데이터베이스 쿼리 수 등이 포함됩니다.

{{< img src="database_monitoring/db-list-calling-services.png" alt="Databases 페이지의 단일 데이터베이스 호스트 세부 정보 패널의 Calling Services 탭" style="width:90%;" >}}

서비스 행을 클릭하면 해당 APM 대시보드를 볼 수 있습니다.

## 구성 세부 정보

<div class="alert alert-info">이 기능이 제대로 작동하려면 호스트의 <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L397">인스턴스 구성</a>에 <code>collect_settings</code>이 활성화되어 있어야 합니다.</div>

호스트 세부 정보 패널의 **Configuration** 탭은 데이터베이스 보안을 유지하면서 호스트의 구성 파라미터를 직접 확인할 수 있는 기능을 제공합니다. 이 탭에서 잘못 구성된 데이터베이스 파라미터를 식별하고 설정을 조정하여 데이터베이스 성능을 최적화할 수 있습니다.

{{< img src="database_monitoring/db-list-configuration.png" alt="Databases 페이지의 단일 데이터베이스 호스트 세부 정보 패널의 Configuration 탭" style="width:90%;" >}}

[1]: https://app.datadoghq.com/databases