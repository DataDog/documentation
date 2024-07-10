---
description: 데이터베이스 및 쿼리 성능 메트릭을 탐색하고 살펴보세요.
further_reading:
- link: /database_monitoring/
  tag: 설명서
  text: 데이터베이스 모니터링
- link: /integrations/postgres/
  tag: 설명서
  text: Postgres 통합
- link: /integrations/mysql/
  tag: 설명서
  text: MySQL 통합
- link: /데이터 베이스_모니터링/데이터_수집됨/
  tag: 설명서
  text: 수집한 데이터
- link: /database_monitoring/troubleshooting/
  tag: 설명서
  text: 트러블슈팅
title: 쿼리 메트릭 탐색
---

{{< site-region region="gov" >}}
해당 지역에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}

쿼리 메트릭 보기는 표준화된 쿼리에 대해한 쿼리 성능 기록을 보여줍니다. 데이터 센터 가용성 영역 등 커스텀 태그나 인프라별로 성능 트렌드를 시각화하고 이상 징후에 대한 알림을 받습니다.

UI에서 **[APM > 데이터베이스][1]**를 클릭하여 데이터베이스 모니터링 내 쿼리 메트릭 보기로 이동합니다. 

보기는 _상위_ 200개 쿼리를 보여줍니다. 즉, 선택한 시간 동안 가장 오래 실행된 200개 쿼리입니다. 상세 정보는 [추적되는 쿼리][2]를 참조하세요. 일회성 또는 자주 실행되지 않는 단기 쿼리에 대한 메트릭 총계는 쿼리 메트릭 보기에 표시되지 않지만 지난 15일 내 실행된 경우 [쿼리 샘플][3]에서 스냅샷을 찾아볼 수 있습니다. 

## 필터링 및 그룹화

상단의 **소스** 선택기에서 데이터베이스 소스 Postgres 또는 MySQL을 선택합니다. 검색 태그를 지정해 쿼리 목록을 필터링하고 태그별로 그룹화하여 목록을 정리합니다.

예를 들어, 호스트 또는 클러스터별로 그룹화하는 것이 유용한 경우가 많습니다. 그러면 쿼리가 실행되는 인프라를 빠르게 확인할 수 있습니다.

{{< img src="database_monitoring/dbm_qm_group_by.png" alt="env 태그별로 그룹화" style="width:100%;">}}

예를 들어 호스트, env, 데이터 센터 등 최대 세 개 항목으로 그룹화하여 그룹화된 일련의 필터링된 결과를 얻을 수 있습니다.

{{< img src="database_monitoring/dbm_qm_group_by_three.png" alt="세 개 태그별 그룹화" style="width:100%;">}}

그룹을 확장하여 쿼리 목록을 확인합니다. **이 그룹에 있는 모든 쿼리 보기**를 클릭하여 기준에 따라 해당 그룹을 필터 모음의 검색 필드로 이동시킵니다. 페이지 콘텐츠가 해당 검색 결과로 필터링됩니다.

## 패싯별 필터링

보기 왼쪽에는 쿼리 목록 필터링을 위한 패싯 목록이 있습니다. 패싯은 다음을 포함합니다.

- **핵심**: 서비스, 호스트, 환경
- **데이터베이스**: Postgres에는 `database` 및 `user` 패싯이 있습니다. MySQL에는 `schema` 패싯이 있습니다.
- **인프라**: 에이전트가 수집하는 전통적인 Datadog 인프라 태그입니다.

관심 있는 쿼리 목록을 찾으려면 패싯을 선택하거나 선택 해제합니다.

### 단일 쿼리로 쿼리 메트릭 보기 필터링

쿼리 메트릭 보기의 콘텐츠를 필터링하여 단 하나의 [표준화된 쿼리][4]를 보려면, `query`가 아니라 `query_signature`를 필터링합니다. 태그 이름은 200자 길이에서 잘립니다. 쿼리가 길 수 있기 떄문에 `query` 태그는 고유할 필요가 없습니다. `query_signature`는 표준화된 쿼리의 해시로 표준화된 쿼리에 대한 고유 ID로 작동합니다.

쿼리 서명 값을 찾지 않고 특정 쿼리를 필터링하는 한 방법은 목록에서 쿼리를 클릭하는 것입니다. 그러면 [쿼리 상세 정보 페이지](#query-details-page)가 열리고 **이 쿼리로 필터링**을 클릭할 수 있습니다. `query_signature` 패싯별로 쿼리 메트릭 페이지를 필터링합니다.

## 메트릭 탐색

데이터베이스 제품에 따라 쿼리 메트릭 목록이 요청, 평균 지연, 총 시간 및 백분율 메트릭을 비롯해 기타 메트릭을 표시합니다. **옵션** 메뉴를 클릭해 목록에서 표시되는 메트릭을 제어하세요. 각 메트릭 유형에 대한 설명을 보려면 열 머리글을 마우스로 가리키세요. 열 머리글을 클릭해 해당 메트릭별로 목록을 정렬합니다.

수집된 메트릭 전체 목록을 확인하려면, 데이터베이스 제품에 대한 통합 수집된 데이터 설명서를 참조하세요.

{{< partial name="dbm/dbm-data-collected" >}}
<p></p>

데이터베이스 모니터링 보기에 사용되는 메트릭은 주로 다음과 같습니다.
- **MySQL**: `mysql.queries.*`
- **Postgres**: `postgresql.queries.*`


## 쿼리 상세 정보 페이지

쿼리 메트릭 목록에서 쿼리를 클릭하면 해당 쿼리에 대한 쿼리 상세 정보 페이지가 열립니다. 페이지 상단에 [표준화된 쿼리][4] 및 쿼리에 연결된 모든 태그 목록의 전체 텍스트가 표시됩니다. 태그 목록은 쿼리가 실행되는 각 호스트의 모든 태그를 표시합니다. 목록을 탐색하여 쿼리가 실행되는 서버 등의 정보를 봅니다. 

{{< img src="database_monitoring/dbm_qd_tags.png" alt="Tags list for a query" style="width:100%;">}}

이 쿼리 컨텍스트에서 **쿼리 샘플 보기** 버튼을 사용해 [쿼리 샘플 페이지][3]로 이동하고 **이 쿼리로 필터링** 버튼을 사용해 이 쿼리로 필터링된 쿼리 메트릭으로 되돌아갑니다.

{{< img src="database_monitoring/dbm_qd_jump_buttons.png" alt="Quickly see query sample or metrics for this query" style="width:100%;">}}

쿼리 상세 정보를 찾아보고 실행되는 호스트를 찾으려면, **이 쿼리로 필터링**을 클릭한 다음 호스트별로 그룹화합니다. 메트릭 목록은 쿼리가 실행되는 각 호스트를 표시합니다. **백분율 시간**별로 정렬하면 특정 호스트가 쿼리 실행에 큰 비율을 차지하는지 확인할 수 있습니다.

{{< img src="database_monitoring/dbm_qm_by_host_usecase.png" alt="A query's metrics grouped by host" style="width:100%;">}}

**행/쿼리**별로 정렬하면 특정 호스트가 더 많은 행을 반환하는 경향이 있는지 확인할 수 있습니다. 호스트 전체에서 샤딩이 균형잡히지 않았음을 나타냅니다.

### 메트릭 그래프

그래프는 이 쿼리를 제외한 모든 쿼리와 비교하여 이 쿼리에 대한 메트릭을 표시합니다. 이 쿼리의 평균 지연은 기타 쿼리의 평균보다 훨씬 높을 수 있지만 자주 실행되지 않아 총 영향은 미미할 수 있습니다. 모든 다른 쿼리와 비교해 실행될 때 소비되는 데이터베이스 시간을 확인할 수 있습니다.

**메트릭** 탭을 클릭해 이 쿼리에 대한 더 많은 메트릭 그래프를 확인합니다.

### 설명 플랜

Datadog는 지속적으로 실행 계획을 수집합니다. 그러므로 하나의 쿼리에 여러 계획이 있을 수 있습니다. 해당 계획은 표준화되고 별도로 표시되므로 쿼리가 더 잘 실행되는 계획을 포함하는지, 또는 다른 쿼리 대비 상대적 비용이 더 높은지 확인할 수 있습니다. 예를 들어, 다음은 쿼리에 대한 두 실행 계획을 표시하고 한 쿼리가 더 낮은 평균 지연을 보인다는 것을 나타냅니다.

{{< img src="database_monitoring/dbm_qd_explain_plans.png" alt="Explain plans information for a query" style="width:100%;">}}

계획을 선택하여 비용 메트릭 또는 JSON을 확인합니다. **이 계획에 대한 모든 샘플 보기**를 클릭하여 [이와 연결된 샘플]에 대한 쿼리 샘플 보기로 이동합니다.

쿼리 유형, 다양한 설정  등 다양한 이유로 일부 쿼리만 실행 계획을 보유합니다. 자세한 정보는 [트러블슈팅][6]을 참조하세요.

### 이 쿼리를 실행하는 호스트

**이 쿼리를 실행하는 호스트** 탭은 로그 또는 네트워크 데이터 등 호스트와 관련된 정보로 이동할 수 있도록 해주는 컨텍스트 메뉴와 함께 이 쿼리를 실행하는 호스트를 나열합니다. 지연 문제 발생 시 트러블슈팅에 유용할 수 있습니다.

{{< img src="database_monitoring/dbm_qd_hosts_running_query_menu.png" alt="Host action menu for pivoting to more information" style="width:100%;">}}

## 데이터베이스 모니터링 대시보드

데이터베이스 관련 인프라 및 쿼리 메트릭 시각화를 보여주는 대시보드에 빠르게 액세스하려면 페이지 상단에서 **대시보드** 링크를 클릭합니다. 바로 대시보드를 사용하거나 대시보드를 복제 및 맞춤화하여 요구를 충족하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /ko/database_monitoring/data_collected/#which-queries-are-tracked
[3]: /ko/database_monitoring/query_samples/
[4]: /ko/database_monitoring/data_collected/#normalized-queries
[5]: /ko/database_monitoring/query_samples/#sample-details
[6]: /ko/database_monitoring/troubleshooting/#queries-are-missing-explain-plans