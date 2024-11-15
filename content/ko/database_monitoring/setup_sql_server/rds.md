---
description: RDS에서 SQL 서버 관리형용 데이터베이스 모니터링을 설치하고 구성합니다.
further_reading:
- link: /integrations/sqlserver/
  tag: 설명서
  text: 기본 SQ 통합
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: 설명서
  text: 일반적인 문제 트러블슈팅
title: Amazon RDS에서 SQL용 데이터베이스 모니터링 설정
---

{{< site-region region="gov" >}}
해당 지역에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}

데이터베이스 모니터링은 쿼리 메트릭, 쿼리 샘플, 실행 계획, 데이터베이스 상태, 장애 조치, 이벤트와 같은 정보를 수집해 Microsoft SQL Server 데이터베이스에 관한 상세한 정보를 가시화합니다.

데이터베이스에서 데이터베이스 모니터링을 활성화하려면 다음 단계를 따르세요.

1. [AWS 통합 설정](#configure-the-aws-integration)
1. [데이터베이스에 에이전트 액세스 권한 부여](#grant-the-agent-access)
1. [에이전트 설치](#install-the-agent)
1. [RDS 통합 설치](#install-the-rds-integration)

## 시작 전 참고 사항

지원되는 SQL 서버 버전
: 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## AWS 통합 설정

[Amazon Web Service 통합 타이틀][2]에 있는 **Resource Collection** 섹션에서 **Standard Collection**을 활성화합니다.

## 에이전트 액세스 권한 부여

Datadog 에이전트가 통계와 쿼리를 수집하려면 데이터베이스에 읽기 전용 액세스가 필요합니다.

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 권한을 부여하세요.

```SQL
USE [master];
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
GO
--Set context to msdb database and create datadog user
USE [msdb];
CREATE USER datadog FOR LOGIN datadog;
GO
--Switch back to master and grant datadog user server permissions
USE [master];
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
GO
```

각 애플리케이션 추가 데이터베이스에 `datadog` 사용자를 생성합니다.
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

RDS에서는 `CONNECT ANY DATABASE`를 허용하지 않기 때문에 이 단계를 실행해야 합니다. Datadog 에이전트가 각 데이터베이스에 연결되어 있어야 해당 데이터베이스에 맞는 파일 I/O 통계를 수집할 수 있습니다.

## 에이전트 설치하기

AWS에서는 호스트에 바로 액세스하는 것을 허용하지 않기 때문에 SQL 서버 호스트와 통신할 수 있는 별도 호스트에 Datadog 에이전트를 설치해야 합니다. 에이전트를 설치하고 실행하는 데는 여러 가지 방법이 있습니다.

**AlwaysOn 사용자**의 경우 에이전트를 별도 서버에 설치하고 리스너 엔드포인트를 통해 클러스터에 연결해야 합니다. 왜냐하면 가용 그룹(AG)의 보조 복제본에 관한 정보가 주 복제본에서 수집되기 때문입니다. 또 에이전트를 이렇게 설치하면 이벤트 장애 조치를 발견하고 해결하는 데 도움이 됩니다.

{{< tabs >}}
{{% tab "Windows Host" %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Linux Host" %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-sqlserver-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-sqlserver-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

## 에이전트 설정 예시
{{% dbm-sqlserver-agent-config-examples %}}

## RDS 통합 설치

AWS에서 좀 더 포괄적인 데이터베이스 메트릭과 로그를 수집하려면 [RDS 통합][1]을 설치하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/amazon_rds
[2]: https://app.datadoghq.com/integrations/amazon-web-services