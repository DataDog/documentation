---
further_reading:
- link: /database_monitoring/setup_postgres/
  tag: 설명서
  text: Postgres 설정
- link: /database_monitoring/setup_postgres/rds
  tag: 설명서
  text: Amazon RDS 관리형 Postgres에서 Database Monitoring 설정
- link: https://www.datadoghq.com/architecture/dbm-quick-install-aws-rds-postgres/
  tag: 아키텍처 센터
  text: AWS RDS용 Datadog DBM 빠른 설치
title: Postgres RDS용 Database Monitoring 빠른 설치
---
RDS용 Database Monitoring 빠른 설치는 RDS Postgres 인스턴스를 모니터링하기 위해 Agent를 빠르게 설정할 수 있는 기능입니다. 몇 가지 옵션을 지정하면 Datadog에서 모니터링을 위해 인스턴스를 구성하는 CloudFormation 템플릿을 생성하고, Amazon ECS를 사용하여 권장 DBM 구성으로 RDS 인스턴스에 Agent를 배포합니다.

## 전제 조건 {#prerequisites}

- 인스턴스의 VPC에서 들어오는 연결과 인터넷으로 나가는 연결을 허용하는 방식으로 인스턴스에 보안 그룹을 구성해야 합니다.
- RDS 인스턴스의 관리자 액세스 권한을 가진 사용자 이름과 암호는 AWS Secrets Manager 내 AWS Secret에 저장해야 합니다. Datadog이 설정 및 운영 과정에서 자격 증명에 액세스할 때 사용하므로, 이 시크릿의 Amazon Resource Name(ARN)을 기록해 두세요.

<div class="alert alert-info">Datadog은 관리자 자격 증명을 저장하지 않습니다. 이 자격 증명은 Agent 연결을 위해 일시적으로 사용되며, 프로세스 완료 후에는 데이터를 보관하지 않습니다.</div>

## 설치 {#installation}

1. [Database Monitoring Setup][1] 페이지로 이동합니다.
1. {{< ui >}}Unmonitored Hosts{{< /ui >}} 탭에서 Agent를 설치하려는 RDS 인스턴스의 {{< ui >}}Add Agent{{< /ui >}}를 클릭합니다.
1. 계정 및 리전에 ECS 클러스터를 설치하지 않은 경우 {{< ui >}}Create Cluster{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Security Group{{< /ui >}} 드롭다운 목록에서 보안 그룹을 선택합니다.
1. {{< ui >}}Select API Key{{< /ui >}}를 클릭하고 목록에서 API 키를 선택한 다음 {{< ui >}}Use API Key{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Launch CloudFormation Stack in AWS Console{{< /ui >}}를 클릭합니다. 새 페이지가 열리고 AWS CloudFormation 화면이 표시됩니다. 제공된 CloudFormation 템플릿을 사용하여 스택을 생성합니다. 이 템플릿은 RDS 인스턴스 모니터링을 위한 Agent 배포에 필요한 구성을 포함하고 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases/setup