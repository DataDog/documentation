---
description: 자체 호스팅 SQL Server에 Database Monitoring 설치 및 구성
further_reading:
- link: /integrations/sqlserver/
  tag: 설명서
  text: 기본 SQL Server 통합
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: 설명서
  text: 일반적인 문제 해결
- link: /database_monitoring/guide/sql_deadlock/
  tag: 설명서
  text: Deadlock Monitoring 구성
- link: /database_monitoring/guide/sql_extended_events/
  tag: 설명서
  text: 쿼리 완료 및 쿼리 오류 수집 구성
- link: /database_monitoring/guide/parameterized_queries/
  tag: 설명서
  text: SQL 쿼리 파라미터 값 캡처
- link: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
  tag: 블로그
  text: Datadog을 사용해 SQL 워크로드의 Azure 마이그레이션 전략 수립
- link: https://www.datadoghq.com/blog/datadog-monitoring-always-on/
  tag: 블로그
  text: Datadog Database Monitoring을 사용하여 AlwaysOn 가용성 그룹 모니터링
title: 자체 호스팅 SQL Server에 대하여 Database Monitoring 설정
---
Database Monitoring은 쿼리 메트릭, 쿼리 샘플, 실행 계획, 데이터베이스 상태, 장애 조치, 이벤트와 같은 정보를 노출하여 Microsoft SQL Server 데이터베이스에 관한 상세한 정보를 가시화합니다.

데이터베이스에서 Database Monitoring을 활성화하려면 다음 단계를 따르세요.

1. [Agent에 액세스 권한 부여](#grant-the-agent-access)
1. [Agent 설치](#install-the-agent)

## 시작 전 참고 사항 {#before-you-begin}

지원되는 SQL Server 버전
: 2012, 2014, 2016, 2017, 2019, 2022, 2025(Agent 7.79+ 필요)

{{% dbm-sqlserver-before-you-begin %}}

## Agent에 액세스 권한 부여 {#grant-the-agent-access}

Datadog Agent가 통계와 쿼리를 수집하려면 데이터베이스 서버에 대한 읽기 전용 액세스가 필요합니다.

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 권한을 부여하세요.

{{< tabs >}}
{{% tab "SQL Server 2014+" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```
{{% /tab %}}
{{% tab "SQL Server 2012" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

각각의 추가적인 애플리케이션 데이터베이스에 `datadog` 사용자를 생성합니다.

```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```
{{% /tab %}}
{{< /tabs >}}

### 비밀번호 안전하게 저장 {#securely-store-your-password}
{{% dbm-secret %}}

## Agent 설치 {#install-the-agent}

에이전트를 SQL Server 호스트에 직접 설치하는 것이 좋습니다. 그렇게 해야 에이전트가 SQL Server에 국한한 텔레메트리 외에 다양한 시스템 텔레메트리(CPU, 메모리, 디스크, 네트워크)도 수집할 수 있습니다.

{{< tabs >}}
{{% tab "Windows 호스트" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Linux 호스트" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{< /tabs >}}

## Agent 구성 예시 {#example-agent-configurations}
{{% dbm-sqlserver-agent-config-examples %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}