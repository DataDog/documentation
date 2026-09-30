---
title: Bits 메뉴 사용하기
---

## 개요

Cloudcraft의 Bits 메뉴를 사용하면 Cloudcraft 내 아무 리소스에서나 Datadog의 가장 관련된 보기로 원활하게 이동할 수 있습니다. 이 기능을 통해 검사하는 특정 리소스에 맞춤화된 관련 정보에 빠르게 액세스할 수 있습니다. 한 번의 클릭이면 Cloudcraft 다이어그램에서 Datadog의 로그, 애플리케이션 성능 모니터링(APM) 트레이스, 기타 데이터에 액세스가 가능합니다.

<div class="alert alert-info">이 기능에 액세스하려면 Datadog 계정을 사용하여 Cloudcraft에  로그인합니다. 다른 로그인 방법을 사용해 로그인하는 데 지원이 필요하다면 <a href="https://app.cloudcraft.co/app/support">지원팀</a>에 문의하세요.</div>

## Bits 메뉴

다이어그램에서 [지원되는 구성 요소](#supported-components)를 클릭하는 것으로 시작하세요. 구성 요소를 선택하면 화면 오른쪽에 Bits 메뉴가 나타납니다.

{{< img src="cloudcraft/getting-started/using-bits-menu/bits-menu.png" alt="Bits 메뉴를 강조 표시하는 빨간색 화살표가 있는 Cloudcraft 인터페이스 스크린샷스타일" responsive="true" style="width:100%;">}}

Bits 메뉴를 클릭하여 선택한 구성 요소에 대해 사용할 수 있는 옵션을 봅니다.

{{< img src="cloudcraft/getting-started/using-bits-menu/bits-menu-clicked.png" alt="Bits 메뉴를 클릭했을 때의 Cloudcraft 스크린샷으로, 호스트 대시보드, 데이터베이스 모니터링, 쿼리 메트릭 및 MySQL 대시보드 등 다양한 옵션을 보여줍니다." responsive="true" style="width:100%;">}}

아무 옵션이나 클릭하여 Datadog에서 관련 보기를 엽니다.

## 지원되는 구성 요소

Bits 메뉴는 다음 Cloudcraft 구성 요소에서 사용할 수 있습니다.

**AWS:**

- Cloudfront.
- DocumentDB.
- DynamoDB.
- EBS.
- EC2.
- EKS Cluster.
- ELB/ALB.
- Elasticache.
- Lambda.
- NAT Gateway.
- OpenSearch.
- RDS.
- Redshift.
- S3.
- SNS Topic.
- SQS.
- VPC Endpoint.

**Azure:**

- AKS Cluster.
- MySQL용 데이터베이스.
- PostgreSQL용 데이터베이스.
- 함수 애플리케이션.
- 관리형 디스크.
- SQL 데이터베이스.
- 가상 머신.
- 웹 애플리케이션.

추가 구성 요소에 대한 지원이 곧 제공됩니다.

**참고**: Datadog에서 구성 요소에 대한 텔레메트리를 보려면 해당 구성 요소에 Datadog 에이전트 또는 기타 통합이 설치 및 설정되어 있어야 합니다.