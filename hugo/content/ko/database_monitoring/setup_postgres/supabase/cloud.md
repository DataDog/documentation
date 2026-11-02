---
aliases:
- /ko/database_monitoring/setup_postgres/supabase/
description: Supabase Cloud 통합을 사용하여 Supabase용 Database Monitoring을 설치하고 구성하세요.
further_reading:
- link: /integrations/supabase-cloud/
  tag: 설명서
  text: Supabase Cloud 통합
- link: /integrations/postgres/
  tag: 설명서
  text: 기본 Postgres 통합
- link: /database_monitoring/setup_postgres/supabase/agent
  tag: 설명서
  text: Supabase 자체 호스팅 설정(Agent 설치)
title: Supabase Cloud용 Database Monitoring 설정
---
Supabase Cloud용 Database Monitoring은 자체 호스팅 Datadog Agent 없이도 쿼리 성능 메트릭과 쿼리 샘플을 노출하여 [Supabase 데이터베이스][3]에 대한 가시성을 제공합니다.

<div class="alert alert-info">Datadog Agent가 필요한 자체 호스팅 Supabase 배포의 경우, <a href="/database_monitoring/setup_postgres/supabase/agent">Supabase 자체 호스팅 설정</a>을 참조하세요.</div>

## 전제 조건 {#prerequisites}

- Postgres 데이터베이스가 있는 Supabase 프로젝트.
- Supabase {{< ui >}}Project ID{{< /ui >}}(Supabase 프로젝트 설정에서 확인 가능).
- Supabase {{< ui >}}API key{{< /ui >}}(Supabase 프로젝트 설정의 {{< ui >}}API{{< /ui >}}에서 확인 가능).
- Management API에 액세스할 수 있는 Supabase [{{< ui >}}Personal Access Token{{< /ui >}}][4].

## 설정 {#setup}

{{< img src="database_monitoring/supabase_cloud_integration_tile.png" alt="Supabase Cloud 통합 타일 구성" style="width:80%;" >}}

1. Datadog에서 [Supabase 통합 타일][1]로 이동합니다.
1. {{< ui >}}Add Account{{< /ui >}}를 클릭합니다.
1. Supabase {{< ui >}}Project ID{{< /ui >}} 및 {{< ui >}}API Key{{< /ui >}}를 입력합니다.
1. {{< ui >}}Enable Database Monitoring for query performance optimizations{{< /ui >}}를 선택합니다.
1. {{< ui >}}Personal Access Token{{< /ui >}}을 입력합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

Datadog이 Supabase 프로젝트에 연결되어 Database Monitoring 텔레메트리 수집을 시작합니다. Agent 설치는 필요하지 않습니다.

<div class="alert alert-info">각 Supabase 프로젝트는 별도로 구성해야 합니다. 연결된 Supabase 계정에 새 프로젝트를 추가해도 Database Monitoring이 자동으로 활성화되지는 않습니다.</div>

## 수집된 데이터 {#data-collected}

Database Monitoring을 활성화하면 Datadog은 Supabase Cloud 데이터베이스에서 다음 텔레메트리를 수집합니다.

### 쿼리 성능 메트릭 {#query-performance-metrics}
`pg_stat_statements`에서 가져오며, 5초마다 수집됩니다.
- 호출 횟수 및 처리된 행 수
- 총 실행 시간 및 평균 실행 시간
- 공유 및 로컬 버퍼 적중/읽기/더티/쓰기 통계
- 블록 I/O 읽기 및 쓰기 시간
- 임시 버퍼 읽기 및 쓰기 횟수

### 쿼리 샘플 {#query-samples}
`pg_stat_activity`에서 가져오며, 5초마다 수집됩니다.
- 활성 및 유휴 쿼리 스냅샷
- 난독화된 쿼리 텍스트 및 쿼리 서명
- 대기 이벤트 유형 및 이벤트 이름
- 세션 상태 및 백엔드 유형
- 차단 PID
- 애플리케이션, 상태, 사용자 및 데이터베이스별로 그룹화된 연결 집계

### 데이터베이스 인스턴스 메타데이터 {#database-instance-metadata}
5분마다 수집됩니다.
- PostgreSQL 버전
- 인스턴스 식별자 및 호스트 이름
- 연결 모드(직접 또는 풀러)

## 검증 {#validate}

설정 후 Datadog의 [Database Monitoring][2] 페이지로 이동하여 Supabase 데이터베이스 쿼리 및 성능 메트릭을 확인하세요.

{{< img src="database_monitoring/supabase_cloud_product.png" alt="Supabase Cloud 인스턴스에 대한 Database Monitoring 개요" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/supabase-cloud
[2]: https://app.datadoghq.com/databases
[3]: https://supabase.com/docs/guides/database/overview
[4]: https://supabase.com/docs/guides/platform/personal-access-tokens