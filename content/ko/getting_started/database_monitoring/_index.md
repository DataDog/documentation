---
further_reading:
- link: /database_monitoring/
  tag: 설명서
  text: 데이터베이스 모니터링
- link: /database_monitoring/troubleshooting/
  tag: 설명서
  text: 트러블슈팅
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog/
  tag: 블로그
  text: Datadog의 데이터베이스 성능 모니터링
kind: 설명서
title: 데이터베이스 모니터링 시작하기
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택하신 Datadog 사이트({{< region-param key="dd_site_name" >}})에서 데이터베이스 모니터링을 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요

Datadog 데이터베이스 모니터링을 이용하면 데이터베이스 건전성과 성능을 더욱 상세히 파악하고, 문제의 근본 원인을 빠르게 찾는 데 도움이 됩니다.

한 화면에서 다음을 조회할 수 있습니다.

* 호스트 수준의 메트릭
* 실행 계획
* 과거 쿼리 성능 메트릭

이번 가이드에서는 PostgreSQL 데이터베이스를 예시로 들어 Datadog 데이터베이스 모니터링을 설정하는 방법을 알려드립니다. 다음으로 결과가 나오기까지 오래 걸리는 쿼리를 식별하는 방법, 느린 쿼리를 트러블슈팅하는 방법, 대시보드를 만들어 쿼리량의 변화를 확인하는 방법을 살펴봅니다.

## 구성

### 전제 조건

시작하기 전에 [Datadog 계정][1]이 있어야 합니다.

예시 애플리케이션을 실행하려면 [GNU Make][2] 및 [도커(Docker)][3]가 있는 머신이 필요합니다. Datadog [API 키][4]도 사용할 수 있도록 준비하세요.

### 예시 애플리케이션 설치

예시 애플리케이션은 도커 컨테이너 내의 Datadog Agent와 PostgreSQL 데이터베이스로 시작합니다. 애플리케이션을 실행하는 동안 Agent는 데이터베이스 메트릭을 Datadog으로 보냅니다. 애플리케이션에서 발생한 데이터는 Datadog 데이터베이스 모니터링에서 조회할 수 있습니다.

안내에 따라 예시 애플리케이션을 맥OS(MacOS)나 리눅스(Linux)에 설치하세요.

1. 예시 애플리케이션이 있는 [저장소][5]를 복제합니다.
```
git clone https://github.com/DataDog/dd-database-monitoring-example
```

2. `dd-database-monitoring-example` 디렉터리로 변경합니다.
```
cd dd-database-monitoring-example
```

3. 환경 변수 `DD_API_KEY`를 Datadog API 키로 설정합니다.
```
export DD_API_KEY=<API_KEY>
```

4. 애플리케이션을 시작합니다.
```
make postgres
```

명령은 Ctrl + C 키를 눌러 중단하기 전까지 계속 실행됩니다.

## 느린 쿼리 식별하기

데이터베이스 시간을 가장 많이 소모하는 쿼리는 무엇인가요? 쿼리 메트릭 조회 화면을 활용해 이를 알아볼 수 있습니다.

1. UI에서  **APM > Databases**를 클릭해 데이터베이스 모니터링으로 이동합니다. 쿼리 메트릭 조회 화면이 열립니다.

2. **Percent time** 기준으로 정규화된 쿼리(Normalized Query) 테이블을 정렬하여 데이터베이스에서 가장 실행 시간이 오래 걸리는 쿼리를 찾아냅니다.

데이터베이스 시간을 가장 오래 소모하는 쿼리가 첫 번째 줄에 표시됩니다.

{{< img src="database_monitoring/dbm_qm_sort_time.png" alt="퍼센트 시간 기준으로 정렬된 정규화 쿼리" style="width:100%;">}}

## 느린 쿼리의 트러블슈팅

Datadog 데이터베이스 모니터링은 시간이 오래 걸리는 쿼리(느린 쿼리)를 식별할 뿐만 아니라 이를 진단하도록 도와줍니다. 쿼리의 실행 계획은 데이터베이스가 쿼리를 해결하기 위해 진행해야 하는 단계를 설명합니다. 쿼리 샘플 조회 화면의 샘플을 클릭하면 실행 계획을 볼 수 있습니다.

데이터베이스 모니터링에서 **[APM > Databases][6]**를 클릭한 다음 UI에서 **Query Samples** 탭을 선택해 쿼리 샘플 조회 화면으로 이동합니다.

정규화된 쿼리 테이블을 **Duration** 기준으로 정렬합니다.

{{< img src="database_monitoring/dbm_qs_sort_duration.png" alt="기간을 기준으로 정렬된 정규화 쿼리" style="width:100%;">}}

**Explain Plan** 열의 데이터로 테이블 내 쿼리를 찾을 수 있고, 해당 쿼리를 클릭하면 샘플 디테일 페이지가 열립니다. 샘플 디테일 하단의 실행 계획을 보면 쿼리에 _Index Scan_이 필요하다는 점을 알 수 있습니다.

{{< img src="database_monitoring/dbm_qs_explain_plan.png" alt="인덱스 스캔을 보여주는 쿼리 실행 계획" style="width:100%;">}}

## 데이터베이스 건전성 및 성능의 시각화

데이터베이스의 건전성과 성능을 한눈에 파악하려면 Datadog 데이터베이스 모니터링 메트릭을 대시보드에 추가하세요.

### 쿼리량의 변화 확인

예를 들어, 쿼리 개수 메트릭을 추적하는 **Change** 위젯을 추가해 지난 시간 동안 쿼리량의 절대적인 변화량을 알 수 있습니다.

1. UI에서 **Dashboards > New Dashboard**를 선택합니다.

2. 대시보드 이름을 입력합니다. **New Dashboard** 버튼을 클릭하면 새 대시보드로 이동합니다.

2. **Add Widgets**를 클릭해 대시보드에 콘텐츠를 추가합니다.

3. 위젯 회전 메뉴에서 **Change** 위젯을 선택합니다.

4. **Metric** 드롭다운 메뉴에서 `postgresql.queries.count`를 선택합니다. 이 메트릭은 PostgreSQL 데이터베이스로 전송된 쿼리 개수를 셉니다.

5. **Break it down by** 드롭다운 메뉴에서 `host`를 선택해 위젯이 호스트별로 쿼리를 집계하도록 설정합니다.

{{< img src="database_monitoring/dashboard_change_postgres.png" alt="postgres  쿼리 메트릭용 change 위젯 설정" style="width:100%;">}}

7. **Save** 버튼을 클릭합니다. 대시보드에 새 위젯이 표시됩니다.

{{< img src="database_monitoring/dashboard_change_widget.png" alt="쿼리 개수를 보여주는 Change 위젯" style="width:100%;">}}

### 기본 대시보드 보기

Datadog 데이터베이스 모니터링이 제공하는 조립형 대시보드에서 현재 데이터베이스 활동, 리소스 활용 등을 살펴보세요.

대시보드에 액세스하는 방법:

1. UI에서 **APM > Databases**를 클릭해 데이터베이스 모니터링으로 이동합니다.

2. **Dashboards** 탭을 선택하고, 확인할 대시보드를 선택하세요.

조립형 대시보드를 복제하고 수정하여 니즈에 맞추어 구성할 수도 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://www.gnu.org/software/make/
[3]: https://www.docker.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/DataDog/dd-database-monitoring-example
[6]: https://app.datadoghq.com/databases