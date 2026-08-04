---
further_reading:
- link: /database_monitoring/setup_postgres/
  tag: 설명서
  text: Postgres 설정
- link: /database_monitoring/setup_postgres/rds
  tag: 설명서
  text: Amazon RDS 관리형 Postgres에서 데이터베이스 모니터링 설정
title: Postgres RDS용 Database Monitoring 빠른 설치
---

RDS용 Database Monitoring 빠른 설치로 Agent를 빠르게 설정하여 RDS Postgres 인스턴스를 모니터링합니다. 몇 가지 옵션을 지정하면, Datadog은 모니터링할 수 있도록 인스턴스를 구성하는 CloudFormation 템플릿을 생성합니다. 또한 Amazon ECS를 사용하여 Agent를 권장 DBM 구성으로 RDS 인스턴스에 배포합니다.

## 사전 필수 조건

- 인스턴스의 VPC 인바운드 연결과 인터넷 아웃바운드 연결을 허용하려면 인스턴스에서 보안 그룹을 구성해야 합니다.
- RDS 인스턴스의 관리자 액세스 사용자 이름과 비밀번호는 AWS Secrets Manager의 AWS Secret에 저장해야 합니다. Datadog은 설정 및 운영 중 자격 증명에 액세스하는 데 이 시크릿을 사용하므로, 해당 시크릿의 Amazon Resource Name(ARN)을 기록해 두세요.

<div class="alert alert-info">Datadog은 관리자 자격 증명을 저장하지 않습니다. Agent에 연결하기 위해 일시적으로만 사용하며, 프로세스가 완료된 후에는 데이터를 보관하지 않습니다.</div>

## 설치

1. [Database Monitoring Setup][1] 페이지로 이동합니다.
1. **Unmonitored Hosts** 탭에서 Agent를 설치하려는 RDS 인스턴스의 **Add Agent**를 클릭합니다.
1. 계정 및 리전에 ECS 클러스터가 설치되어 있지 않은 경우 **Create Cluster**를 클릭합니다.
1. **Security Group** 드롭다운 목록에서 보안 그룹을 선택합니다.
1. **Select API Key**를 클릭하고 목록에서 API 키를 선택한 후 **Use API Key**를 클릭합니다.
1. **Launch CloudFormation Stack in AWS Console**를 클릭합니다. 그러면 AWS CloudFormation 화면이 표시된 새 페이지가 열립니다. 제공된 CloudFormation 템플릿을 사용하여 스택을 생성합니다. 해당 템플릿에는 Agent를 배포하여 RDS 인스턴스를 모니터링하는 데 필요한 구성이 포함됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases/setup