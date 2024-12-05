---
further_reading:
- link: /database_monitoring/
  tag: 설명서
  text: 데이터베이스 모니터링
- link: /database_monitoring/setup_sql_server/
  tag: 설명서
  text: SQL 서버 설정
- link: /database_monitoring/troubleshooting/
  tag: 설명서
  text: 데이터베이스 모니터링 트러블슈팅
title: SQL Server AlwaysOn 가용성 그룹 탐색
---

데이터베이스 모니터링 AlwaysOn 클러스터 보기를 사용하면 데이터 동기화 문제를 감지하고, 가용성 그룹 동작을 이해하고, SQL Server 가용성 그룹에서 클러스터 병목 현상을 식별할 수 있습니다.

AlwaysOn 클러스터 보기에 액세스하려면 **애플리케이션 성능 모니터링(APM)** > **데이터베이스 모니터링** > **데이터베이스** 탭 으로 이동하여 **AlwaysOn 클러스터**를 선택합니다.

## 노드 상태 결정

AlwaysOn 클러스터 보기를 사용하여 SQL 서버 가용성 그룹의 상태를 평가할 수 있습니다. 이 보기를 선택하면 각 가용성 그룹의 기본(P) 및 보조(S) 노드 현재 상태를 기반으로 색상으로 시각화된 페이지가 표시됩니다.

문제가 있는 그룹을 식별하려면 상태 필터를 사용하여 **복원 중**, **동기화 중 아님** 등의 노드가 있는 그룹을 표시하세요. 시계열 그래프를 사용하여 로그, 재실행 및 2차 지연 시간 메트릭을 기준으로 클러스터에서 비정상적인 성능 활동을 파악할 수도 있습니다.

{{< img src="database_monitoring/dbm_alwayson.png" alt="SQL 서버 AlwaysOn 그룹 보기" style="width:100%;">}}

## 이전 메트릭 분석

시간 경과에 따른 노드 동기화 상태의 변동 추이를 평가하려면 가용성 그룹을 선택하여 세부정보 사이드 패널을 엽니다. 패널 상단의 **동기화 상태 이력** 그래프에 선택한 기간 동안의 각 노드 상태가 표시됩니다.

보조 노드 및 관련 데이터베이스에 대한 추가 정보는 **보조 노드** 탭 에서 확인하세요. **메트릭** 탭에서 시계열 그래프를 사용하여 보기 전송, 다시 실행 및 지연 메트릭을 기반으로 개별 노드 및 데이터베이스의 비정상적인 동작을 파악할 수도 있습니다.

{{< img src="database_monitoring/dbm_alwayson_history.png" alt="SQL 서버 AlwaysOn 그룹 보기" style="width:80%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}