---
description: 자체 호스팅 SQL Server에 데이터베이스 모니터링을 설치하고 설정합니다.
further_reading:
- link: /integrations/sqlserver/
  tag: 설명서
  text: 기본 SQL Server 통합
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: 설명서
  text: 일반적인 이슈 트러블슈팅
- link: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
  tag: 블로그
  text: Datadog를 사용해 전략적으로 SQL 워크로드를 Azure로 마이그레이션하기
- link: https://www.datadoghq.com/blog/datadog-monitoring-always-on/
  tag: 블로그
  text: Datadog 데이터베이스 모니터링으로 AlwaysOn 가용성 그룹 모니터링
kind: 설명서
title: 자체 호스팅 SQL Server에 데이터베이스 모니터링 설정
---

데이터베이스 모니터링은 쿼리 메트릭, 쿼리 샘플, 실행 계획, 데이터베이스 상태, 장애 조치, 이벤트와 같은 정보를 수집해 Microsoft SQL Server 데이터베이스에 관한 상세한 정보를 가시화합니다.

데이터베이스에서 데이터베이스 모니터링을 활성화하려면 다음 단계를 따르세요.

1. [에이전트 액세스 권한 부여](#grant-the-agent-access)
1. [Agent 설치](#install-the-agent)

## 시작 전 참고 사항

지원되는 SQL Server 버전
: 2012, 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## 에이전트에 접근 권한 부여

Datadog 에이전트가 통계와 쿼리를 수집하려면 데이터베이스에 읽기 전용 액세스가 필요합니다.

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 권한을 부여하세요.

{{< tabs >}}
{{% tab "SQL Server 2014+" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- 로그 전송 모니터링(에이전트 v7.50+에서 사용 가능) 기능을 활용하려면 다음 세 줄의 주석 처리를 해제하세요.
-- USE msdb;
-- CREATE USER datadog FOR LOGIN datadog;
-- GRANT SELECT to datadog;
```
{{% /tab %}}
{{% tab "SQL Server 2012" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- 로그 전송 모니터링(에이전트 v7.50+에서 사용 가능) 기능을 활용하려면 다음 세 줄의 주석 처리를 해제하세요.
-- USE msdb;
-- CREATE USER datadog FOR LOGIN datadog;
-- GRANT SELECT to datadog;
```

각 애플리케이션 추가 데이터베이스에 `datadog` 사용자를 생성합니다.
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```
{{% /tab %}}
{{< /tabs >}}

## 에이전트 설치

에이전트가 SQL Server에 지정된 텔레메트리 외에도 다양한 시스템 텔레메트리(CPU, 메모리, 디스크, 네트워크)를 수집하도록 하려면 SQL Server 호스트에 바로 에이전트를 설치하는 것이 좋습니다.

{{< tabs >}}
{{% tab "Windows 호스트" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Linux 호스트" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-docker %}}
{{% /tab %}}
{{% tab "쿠버네티스" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

## 에이전트 설정 예시
{{% dbm-sqlserver-agent-config-examples %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}