---
algolia:
  subcategory: Marketplace 통합
app_id: itunified-ug-dbxplorer
app_uuid: 1349589a-6fc1-4ddd-99c7-7b23ba82903a
assets:
  dashboards:
    dbXplorer - ASH Monitor: assets/dashboards/itunified_ug_dbxplorer_ash_monitor.json
    dbXplorer - DB Performance Health: assets/dashboards/itunified_ug_dbxplorer_db_health_performance.json
    dbXplorer - Oracle LMS: assets/dashboards/itunified_ug_dbxplorer_oracle_lms.json
    dbXplorer - Space Monitoring: assets/dashboards/itunified_ug_dbxplorer_space_monitoring.json
    dbXplorer - Status Summary: assets/dashboards/itunified_ug_dbxplorer_status_summary.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: dbxplorer.oracle.database.availability.status
      metadata_path: metadata.csv
      prefix: dbxplorer.oracle
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14507249
    source_type_name: itunified_ug_dbxplorer
  monitors:
    ASM diskgroup space is running low: assets/monitors/dbxplorer_space_prdictive_diskgroup_usage.json
    DB wait event higher than usual: assets/monitors/dbxplorer_db_health_anomaly_wait_events.json
    Database is unavailable: assets/monitors/dbxplorer_db_health_availability.json
    Database load higher than usual: assets/monitors/dbxplorer_db_health_anomaly_load.json
    Permanent tablespace usage predicted to be too high: assets/monitors/dbxplorer_space_predictive_tablespace_permanent.json
    Recovery area capacity is predicted to be too low: assets/monitors/dbxplorer_space_predictive_recovery_area.json
    SQL query CPU time higher than usual: assets/monitors/dbxplorer_ash_sql_id_cpu_time.json
    SQL query elapsed time higher than usual: assets/monitors/dbxplorer_ash_sql_id_elapsed_time.json
    SQL query elapsed time is longer than usual (1 week): assets/monitors/dbxplorer_ash_sql_id_1w.json
    SQL query elapsed time is longer than usual (4 hours): assets/monitors/dbxplorer_ash_sql_id_4h.json
    Temporary tablespace usage predicted to be too high: assets/monitors/dbxplorer_space_predictive_tablespace_temp.json
    Undo tablespace usage predicted to be too high: assets/monitors/dbxplorer_space_predictive_tablespace_undo.json
author:
  homepage: https://www.itunified.de
  name: ITUNIFIED UG
  sales_email: support.datadog@itunified.de
  support_email: support.datadog@itunified.de
  vendor_id: itunified
categories:
- marketplace
- 클라우드
- oracle
- 데이터 저장
- 메트릭
- 경고
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: itunified_ug_dbxplorer
integration_id: itunified-ug-dbxplorer
integration_title: Oracle DBMS용 dbXplorer
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: itunified_ug_dbxplorer
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.itunified_ug.itunified_ug_dbxplorer.dbxplorer.oracle.database.integration.status
  product_id: itunified-ug-dbxplorer
  short_description: Oracle 클러스터, DB, 파일 시스템을 모니터링하세요.
  tag: db_unique_name
  unit_label: 고유한 DB 이름
  unit_price: 50.0
public_title: Oracle DBMS용 dbXplorer
short_description: Oracle 데이터베이스 상태 및 성능을 모니터링하고 분석하세요
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 지원 OS::Linux
  - 제공::통합
  - Category::Marketplace
  - Category::Cloud
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Category::Oracle
  - 카테고리::데이터 저장
  - Category::Metrics
  - Category::Alerting
  configuration: README.md#Setup
  description: Oracle 데이터베이스 상태 및 성능을 모니터링하고 분석하세요
  media:
  - caption: dbXplorer - ASH Monitoring
    image_url: images/1.png
    media_type: 이미지
  - caption: dbXplorer - ASH Monitoring sql_id related logs view
    image_url: images/2.png
    media_type: 이미지
  - caption: dbXplorer - DB Performance Health
    image_url: images/3.png
    media_type: 이미지
  - caption: dbXplorer - Space Monitoring
    image_url: images/4.png
    media_type: 이미지
  - caption: dbXplorer - Status Summary
    image_url: images/5.png
    media_type: 이미지
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/itunified-datadog-marketplace/
  support: README.md#Support
  title: Oracle DBMS용 dbXplorer
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

**dbXplorer**를 사용하면 Oracle(19c 이상) 데이터베이스를 모니터링하여 Datadog에서 제공하는 실시간 분석 및 성능 메트릭을 확인할 수 있습니다. 또한 Oracle 데이터베이스 인스턴스의 상태와 성능에 관한 심층적인 가시성을 확보할 수 있습니다.

이 통합으로 다음 이점을 누릴 수 있습니다.
- 사전 모니터링: 성능 병목 현상, 비정상적인 활동, 오류에 관한 실시간 알림을 통해 잠재적인 문제를 조기에 감지합니다.
- 성능 최적화: 데이터베이스 성능 인사이트를 수집하여 쿼리와 리소스를 조정하고 최적의 활용도와 응답 시간을 보장합니다.
- 간소화된 관리: 여러 Oracle 데이터베이스의 모니터링을 단일 플랫폼으로 중앙화하여 관리 프로세스를 간소화하고 운영 오버헤드를 줄입니다.

이 통합은 Oracle 데이터베이스에서 다음 유형의 데이터를 모니터링합니다.
- 성능 메트릭: 쿼리 응답 시간, 메모리 사용량(예: PGA 및 SGA 통계), 리소스 병목 현상에 관한 데이터가 포함됩니다. 이 데이터는 성능 문제를 파악하고 데이터베이스 운영을 최적화하는 데 도움이 됩니다.
- 상태 메트릭: 연결 시간, 사용자 세션, 시스템 가용성 등의 중요한 상태 메트릭을 추적하여 적절한 개입하고 가동 중지를 방지할 수 있습니다.

**ITUnified 소개:** 20년 이상의 전문 지식을 보유한 Oracle 인증 데이터베이스 관리자(DBA) 전문가들은 복잡한 프로젝트를 처리하고 고객의 데이터베이스 관리 및 운영을 지원하는 데 필요한 기술을 갖추고 있습니다. ITUnified는 상세한 니즈 평가를 통해 맞춤형 데이터베이스 지원 및 서비스를 전문적으로 제공합니다.

### 메트릭

dbXplorer 통합은 8개 카테고리에서 77개의 메트릭을 수집합니다.

Oracle 내부 DBA_HIST_ACTIVE_SESS_HISTORY 테이블을 기반으로 하는 11개의 메트릭입니다. 이전 및 반복된 SQL 쿼리 값을 제공합니다.

Oracle의 내부 DBA_HIST_SQLSTAT 테이블을 기반으로 한 28개의 메트릭은 SQL 쿼리에 대한 애플리케이션, CPU, 디스크 읽기 및 쓰기, I/O, 동시성 대기 시간을 제공합니다.

Oracle 내부 V$OSSTAT 테이블을 기반으로 한 11가지 메트릭입니다. 이 테이블에는 운영 체제의 시스템 사용률 통계가 포함되어 있습니다.

V$SESSION_EVENT 테이블에서 2개의 메트릭이 검색되고 세션의 이벤트 대기에 관한 정보가 표시됩니다.

v$system_event 테이블에서 10개의 메트릭이 검색되고 이벤트에 대한 총 대기 시간 정보가 표시됩니다.

1개의 메트릭에 통계 이름이 포함되어 있습니다. 다양한 통계 이름은 [여기][2]에서 확인할 수 있습니다.

데이터베이스 복구 영역과 관련된 5개 메트릭.

테이블스페이스 사용과 관련된 8개 메트릭.

### 모니터링

12개의 모니터가 포함되어 있으며, 다음과 같은 알림을 받을 수 있습니다.
- CPU 및 경과 시간을 기반으로 SQL 실행과 관련된 이상 감지.
- 로드 및 대기 이벤트의 데이터베이스 상태 알림
- 일반 데이터베이스 가용성
- 실행 취소, 임시 및 영구 테이블스페이스 사용량에 관한 예측 알림
- 복구 영역 사용에 관한 예측 알림
- ASM 디스크 사용에 관한 예측 알림

### 대시보드

dbXplorer 통합에는 4개의 대시보드가 ​​포함되어 있습니다.

#### dbXplorer - ASH Monitoring
"dbXplorer - ASH Monitoring" 대시보드는 SQLSTAT 및 ACTIVE SESSION HISTORY(ASH) 데이터를 활용하여 Oracle 데이터베이스에 관한 포괄적인 성능 분석을 제공하도록 설계되었습니다. 이 대시보드는 SQLSTAT의 SQL 실행 메트릭과 ASH의 세션 수준 활동 인사이트를 결합하여 데이터베이스 성능과 최적화 기회에 관한 전체적인 뷰를 제공합니다. 경과 시간, CPU 시간, I/O 작업과 같은 다양한 성능 메트릭을 모니터링하고 분석하는 상세한 시계열 그래프와 쿼리 테이블을 포함한 여러 위젯 또한 있습니다. 주요 기능으로는 특정 SQL 식별자에 대한 이상 탐지, 과거 성능 분석, 성능 문제를 진단하고 데이터베이스 운영을 최적화하기 위한 트렌드 모니터링이 있습니다.

#### dbXplorer - DB Performance Health
"dbXplorer - DB Performance Health" 대시보드는 로드 이상, 세션 대기 이상, CPU 사용량, 메모리 사용량 등 다양한 측면에 초점을 맞춰 Oracle 데이터베이스 성능을 종합적으로 모니터링하도록 설계되었습니다. 그래프와 표를 사용해 데이터를 시각적으로 표시하는 여러 위젯을 활용하여 데이터베이스 관리자가 성능 병목 현상을 신속하게 파악하고 해결할 수 있도록 지원합니다. 주요 기능으로는 v$session_event 및 v$session_wait 뷰를 통한 세션 대기 이벤트 상세 분석이 있으며, 이를 통해 특정 대기 이벤트와 데이터베이스 세션에 미치는 영향에 관한 인사이트를 제공합니다. 또한, v$system_event 및 v$osstat 뷰를 통해 시스템 전체 성능 메트릭을 모니터링하고 분석하는 도구를 제공하며, 시스템 수준 대기 및 데이터베이스 운영에 영향을 미치는 운영 체제 상호작용을 다룹니다.

#### dbXplorer - Space Monitoring
"dbXplorer - Space Monitoring" 대시보드는 Oracle 데이터베이스 테이블스페이스, 복구 영역 및 ASM(Automatic Storage Management) 디스크 그룹에 관한 자세한 모니터링 및 예측 기능을 제공합니다. 현재 및 과거 데이터 사용량, 중요 임계값 알림, 여러 기간의 공간 할당 추세를 시각화할 수 있습니다. 대시보드 내 위젯에는 시계열 그래프, 쿼리 테이블, 상태 요약이 포함되어 있어 사용자가 총 공간, 사용된 공간, 사용 가능한 공간 등의 메트릭을 효율적으로 추적할 수 있습니다. 또한, 대시보드는 템플릿 변수를 통한 동적 필터링 옵션을 제공하여 특정 데이터베이스 인스턴스 또는 클러스터에 맞게 사용자 정의가 가능합니다. 이 도구는 최적의 성능을 유지하고 시스템에서 잠재적인 공간 관련 문제를 사전에 방지하려는 데이터베이스 관리자에게 유용합니다.

#### dbXplorer - Status Summary 
"dbXplorer - Status Summary" 대시보드는 데이터베이스 작업의 상태 및 로그를 간략하게 보여줍니다. "Availability Logs"는 데이터베이스 가용성 관련 이벤트를 타임스탬프 및 인스턴스 이름과 같은 다양한 파라미터를 기준으로 정렬하여 표시합니다. 또 다른 위젯인 "dbXplorer Logs"는 데이터베이스 트랜잭션의 로그 데이터를 요약된 뷰로 구성하여 로거 이름별로 그룹화하고 심각도별 로그 수를 표시합니다. "Status Summary" 위젯은 목록 및 개수 형식으로 상태 개요를 제공하며, 문제 심각도에 따라 데이터 표시 우선순위를 지정합니다.

#### dbXplorer - Oracle LMS
"dbXplorer - Oracle LMS" 대시보드는 Oracle License Management Services(LMS)에 중점을 두고 라이선스 관련 데이터베이스 기능의 사용량을 추적하고 보고합니다. CPU 사용량을 시각화하여 데이터베이스 작업 규모와 잠재적 라이선스 요구 사항을 파악하는 데 도움이 됩니다. 또한, 대시보드에는 데이터베이스 기능을 제품에 매핑하기 위해 복잡한 쿼리를 실행하는 기능 사용 통계가 포함되어 있으며, 사용량을 현재 및 과거 사용량과 같은 카테고리로 분류하고 기능 보고에서 예외를 관리할 수 있습니다. 이 대시보드는 데이터베이스 관리자가 Oracle 라이선스 준수를 확인하는데 도움이 되지만, 이 대시보드에만 의존해서는 안됩니다.


### 사전 필수 조건

- Oracle Grid Infrastructure를 사용하는 19c EE 이후의 Oracle 데이터베이스 버전은 지원됩니다. 이전 데이터베이스 버전이나 서버리스 설치 환경에서의 데이터 수집은 지원되지 않습니다.

- 이 통합에는 Oracle Diagnostic 및 Tuning Pack 라이선스가 필요합니다. 이 팩을 사용하거나 라이선스를 구매하지 않으려면 ASH 및 AWR 메트릭 수집을 비활성화해야 합니다. 이러한 메트릭을 수집하거나 비활성화하는 방법에 관한 설명은 설정 지침에서 확인할 수 있습니다.

## 지원
기능 요청이나 문의 사항은 [support.datadog@itunified.de][1]로 문의하세요.

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 ITUnified의 제품으로Oracle 데이터베이스 성능 최적화][5]

[1]: mailto:support.datadog@itunified.de
[2]: https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/statistics-descriptions-2.html#GUID-2FBC1B7E-9123-41DD-8178-96176260A639
[3]: https://hub.docker.com/repository/docker/itunified/dbxagent/general
[4]: https://app.datadoghq.com/monitors/recommended?q=dbXplorer&only_installed=false&p=1
[5]: https://www.datadoghq.com/blog/itunified-datadog-marketplace/

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/itunified-ug-dbxplorer" target="_blank">Marketplace에서 구매하세요</a>.