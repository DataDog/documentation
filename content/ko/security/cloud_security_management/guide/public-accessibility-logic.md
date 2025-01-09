---
further_reading:
- link: /security/misconfigurations
  tag: 설명서
  text: CSM Misconfigurations로 잘못된 구성 추적하기
- link: /security/default_rules/#cat-cloud-security-management
  tag: 설명서
  text: 기본 탐지 규칙
title: Datadog에서 리소스가 공용인지 확인하는 방법
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a>는 클라우드 보안 관리 설정 오류를 지원하지 않습니다. ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Datadog에서는 클라우드 그래프 처리 프레임워크를 사용해 클라우드 리소스 간의 관계를 매핑하여 인터넷으로 접근할 수 있는지를 판단합니다. 이 가이드에서는 그래프 프레임워크 내에서 공용으로 접근할 수 있는 리소스를 구분하는 로직을 설명합니다.

네트워크 도달 가능성과 관련한 더 자세한 정보는 [AWS 설명서][34]와 [AWS Network Reachability Analyser][3]5를 참고하세요. 현재 `Is Publicly Accessible` 패싯은 AWS 리소스에만 사용할 수 있습니다.

## 리소스 종속성 그래프

다음 다이어그램은 서로 연관된 리소스를 통해 리소스가 공용 접근 가능한지 확인하는 방법을 설명합니다. 예를 들어 공용 Amazon S3 버킷에 저장된 AWS CloudTrail의 경우 그 자체로 공용 접근 가능합니다. 리소스가 다른 리소스 때문에 공용 접근이 가능한 경우, 그 관계가 Cloud Security Management Misconfigurations 리소스 관계 그래프에 표시됩니다.


**참고**: 공용 접근 가능 속성이 있는 모든 리소스가 이 다이어그램에 표시되는 것은 아닙니다.

### 가이드

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_aws.png" alt="AWS에서 리소스간 관계성을 보여주는 다이어그램. 이 관계성은 공용 접근이 가능한지를 판단하는 데 사용됨" width="100%">}}

### Python

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_azure.png" alt="Azure에서 리소스간 관계성을 보여주는 다이어그램. 이 관계성은 공용 접근이 가능한지를 판단하는 데 사용됨" width="70%">}}

### 가이드

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_gcp.png" alt="Google Cloud에서 리소스간 관계성을 보여주는 다이어그램. 이 관계성은 공용 접근이 가능한지를 판단하는 데 사용됨" width="50%">}}

## 리소스별 AWS 공용 접근성 로직

### Amazon S3 버킷

[S3 버킷][1](`aws_s3_bucket`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| **조건** | **설명** |
|--------------|-----------------|
|이 버킷 정책은 `s3:GetObject` 권한을 무조건적으로 허용합니다. 리소스와 보안 주체가 `"*"`로 설정되어 있습니다. |이는 버킷에 공용 정책이 적용되어 있고 인증되지 않은 액세스도 허용한다는 뜻입니다. `"*"`는 와일드카드로, 모든 리소스와  보안 주체가 접근 가능하다는 뜻입니다. |
| 버킷의 `public_access_block_configuration`과 AWS 계정의 공용 접근 블록(`aws_s3_account_public_access_block`)에서 `restrict_public_buckets`가 모두 `true`로 설정되어 있습니다. | 버킷과 계정에서 모두 공용 접근을 차단하지 않습니다. 이는 공용 버킷 정책이 적용된다는 뜻입니다. |

자세한 정보를 보려면 [Amazon S3 스토리지에서 공용 접근 차단]을 참고하세요.

### AWS CloudTrail Trail

[CloudTrail Trail][3](`aws_cloudtrail_trail`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| **조건** | **설명** |
|--------------|-----------------|
|추적의 `s3_bucket_name`이 공용 접근 가능한 S3 버킷으로 설정되어 있습니다. |CloudTrail Trails는 S3 버킷으로 전달되는 로그 파일입니다. 공용 S3 버킷에 추적이 저장되어 있다면 추적에 공용 접근할 수 있습니다. |

### Amazon VPC 서브넷

[서브넷][4](`aws_subnet`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| **조건** | **설명** |
|--------------|-----------------|
|[인터넷 게이트웨이][6]와 연결되어 있고 CIDR 블록이 `"0.0.0.0/0"`이거나 IPv6 CIDR 블록이 `"::/0"`인 대상으로 라우팅하는 [라우트 테이블][5] 1개 이상에 연결되어 있습니다.| 이 서브넷에 연결된 라우팅 테이블은 송신 트래픽을 인터넷 게이트웨이를 통하도록 라우팅합니다. 따라서 공용 인터넷으로 서브넷에 있는 리소스에 접근할 수 있습니다.|
|송신 항목 최소 1개와 수신 항목 최소 1개가 있는 [네트워크 ACL][7] 1개 이상에 연결되어 있고, 이 송신 항목과 수신 항목에는 CIDR 블록 `"0.0.0.0/0"`이나 IPv6 CIDR 블록 `"::/0"`이 있습니다.| 네트워크 ACL에서는 서브넷에 들어오고 나가는 트래픽을 서브넷 수준에서 컨트롤합니다. 네트워크 ACL 규칙에 따라 인터넷에서 오는 수신 트래픽과 임시 포트로 나가는 송신 트래픽을 허용하는 경우, 공용 IP에 할당되고 보안 그룹이 허용하면 서브넷에 있는 리소스가 인터넷에 노출됩니다.|

AWS 공용 서브넷에 관한 자세한 정보는 [VPC 서브넷]을 참고하세요.

### Amazon Redshift 클러스터

[Redshift 클러스터][9](`aws_redshift_cluster`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| **조건** | **설명** |
|--------------|-----------------|
|구성에 `publicly_accessible`이 `true`로 설정되어 있습니다.|[VPC에서 클러스터 관리][10]를 참고하세요. |
|공용 [VPC][11]에 위치합니다. |공용 VPC는 공용 서브넷이 최소 1개인 VPC로, 송신 항목 최소 1개와 수신 항목 최소 1개가 있는 네트워크 ACL 1개 이상에 연결되어 있습니다. 이 송신 항목과 수신 항목에는 CIDR 블록 `"0.0.0.0/0"`이나 IPv6 CIDR 블록 `"::/0"`이 있습니다.|
|CIDR 범위 `"0.0.0.0/0"`이나 IPv6 CIDR 범위 `"::/0"`에서 접근을 허용하는 규칙이 있는 [보안 그룹][12]과 연결되어 있습니다. |보안 그룹이 VPC로 가는 인바운드 트래픽을 컨트롤합니다. 개방형 CIDR 범위에서는 모든 IP 주소가 접근할 수 있습니다. |
|[인터넷 게이트웨이][6]와 연결되어 있고 CIDR 블록 `"0.0.0.0/0"`이나 IPv6 CIDR 블록 `"::/0"`인 대상으로 라우팅하는 [라우트 테이블][5] 1개 이상에 연결되어 있습니다.| 이 서브넷에 연결된 라우팅 테이블은 송신 트래픽을 인터넷 게이트웨이를 통하도록 라우팅합니다. 따라서 공용 인터넷으로 서브넷에 있는 리소스에 접근할 수 있습니다.|

Redshift 클러스터와 공용 접근과 관련한 더 자세한 내용은 [프라이빗 Amazon Redshift 클러스터를 공용으로 접근할 수 있도록 하기][13]를 참고하세요.

### Amazon RDS DB 인스턴스

[RDS DB 인스턴스][14](`aws_rds_instance`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| **조건** | **설명** |
|--------------|-----------------|
|구성에 `publicly_accessible`이 `true`로 설정되어 있습니다.|이 설정을 사용하면 DB에 공용으로 접근할 수 있어 DNS 엔드포인트가 VPC 내 프라이빗 IP 주소와 VPC 외 공용 IP 주소를 확인합니다.
그러나 클러스터 접근은 여전히 관련 보안 그룹이 컨트롤합니다. |
|공용 [서브넷][4]에 있습니다.|-|
|CIDR 범위 `"0.0.0.0/0"`이나 IPv6 CIDR 범위 `"::/0"`에서 접근을 허용하는 규칙이 있는 [보안 그룹][12]과 연결되어 있습니다. |보안 그룹이 VPC로 가는 인바운드 트래픽을 컨트롤합니다. 개방형 CIDR 범위에서는 모든 IP 주소가 접근할 수 있습니다. |

RDS DB 인스턴스에 공용으로 접근하는 것에 관한 더 많은 정보는 [VPC의 서브넷을 사용하는 RDS DB 인스턴스 연결 문제 해결][15]을 참고하세요.

### Amazon RDS DB 스냅샷

[RDS DB 스냅샷][16](`aws_rds_db_snapshot`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| **조건** | **설명** |
|--------------|-----------------|
|`"restore"`로 설정된 속성이 있고 속성 값이 `"all"`로 설정되어 있습니다.|DB 스냅샷 가시성을 공용으로 지정하면 모든 AWS 계정에서 사용자의 수동 DB 스냅샷에서 DB 인스턴스를 복구할 수 있고, 사용자의 데이터에 접근할 수 있습니다.|

자세한 정보는 [DB 스냅샷 공유][17]를 참고하세요.

### Amazon Elastic Load Balancer

ELB(`aws_elbv2_load_balancer`)의 경우, 다음 조건에서 공용 접근이 가능한 것으로 판단합니다.

| **조건** | **설명** |
|--------------|-----------------|
|[구성][21]이 `internet-facing`으로 설정되어 있습니다.|로드 밸런서가 내부 로드 밸런서인지, 아니면 인터넷 연결 로드 밸런서인지는 구성에서 결정합니다.|
|CIDR 범위 `"0.0.0.0/0"`이나 IPv6 CIDR 범위 `"::/0"`에서 접근을 허용하는 규칙이 있는 [보안 그룹][12]과 연결되어 있습니다. |보안 그룹이 VPC로 가는 인바운드 트래픽을 컨트롤합니다. 개방형 CIDR 범위에서는 모든 IP 주소가 접근할 수 있습니다. |

인터넷 연결 로드 밸런서와 관련한 더 많은 정보는 [Application Load Balancer 생성][20]을 참고하세요.

### Amazon EC2 인스턴스

[EC2 인스턴스][18]의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

* _"공용 서브넷" 기반 접근:_

| **조건** | **설명** |
|--------------|-----------------|
|[공용 IP 주소][18]가 1개 이상 있습니다. |공용 IP 주소을 사용하면 인터넷을 통해 인스턴스에 접근할 수 있습니다.|
|공용 [서브넷][4]에 있습니다.|-|
|CIDR 범위 `"0.0.0.0/0"`이나 IPv6 CIDR 범위 `"::/0"`에서 접근을 허용하는 규칙이 있는 [보안 그룹][12]과 연결되어 있습니다. |보안 그룹이 VPC로 가는 인바운드 트래픽을 컨트롤합니다. 개방형 CIDR 범위에서는 모든 IP 주소가 접근할 수 있습니다. |

***또는***

* _오토스케일링 그룹을 통한 ELB 기반 액세스:_

| **조건** | **설명** |
|--------------|-----------------|
|로드 밸런서에 연결된 보안 그룹(예: `SG1`)이 공용으로 접근할 수 있는 것이고 포트 `X`와 같은 수신 트래픽을 허용합니다.|로드 밸런서가 특정 포트에서 인터넷을 통해 들어오는 트래픽을 허용합니다.|
|로드 밸런서에 포트 `X`로 들어오는 트래픽을 허용하는 리스너가 있습니다.|[리스너][37]는 사용자가 구성한 프로토콜과 포트를 이용해 특정 연결 요청을 확인하는 프로세스입니다.|
|로드 밸런서에 트래픽을 포트 `Y`로 전송하는 대상 그룹이 있습니다.|[대상 그룹][38]에서는 사용자가 지정한 프로토콜이나 포트에서 EC2 인스턴스와 같은 등록된 대상 1개나 1개 이상으로 요청을 라우팅합니다. |
|오토스케일링 그룹은 로드 밸런서의 대상 그룹에 연결되어 있습니다.|-|
|EC2 인스턴스는 오토스케일링 그룹의 일부이며, 포트 `Y`에서 수신 트래픽을 허용하는 규칙이 최소 1개가 있는 보안 그룹이 있습니다. 이 경우 트래픽은 `0.0.0.0/0`, VPC의 CIDR(예: `10.0.0.0/8`), 또는 로드 밸런서의 보안 그룹(`SG1`)에서 옵니다.|이 설정에서 EC2는 로드 밸런서에서 오는 트래픽을 수신합니다. 로드 밸런서에서 오는 트래픽을 보안 그룹에서 모두 허용해야 하며, 이에 따라 모든 IP, VPC에 있는 모든 IP, 또는 특정 보안 그룹에서 오는 트래픽에 개방되어 있습니다.|

***또는***

* _대상 그룹만을 통한 ELB 기반 액세스:_

| **조건** | **설명** |
|--------------|-----------------|
|위 조건 1, 2, 3이 적용됨(_오토 스케일링 그룹을 통한 ELB 기반 접근_). |-|
|EC2 인스턴스는 대상 그룹 목록에 대상으로 포함되어 있으며, 포트 `Y`에서 수신 트래픽을 허용하는 규칙이 최소 1개가 있는 보안 그룹이 있습니다. 이 경우 트래픽은 `0.0.0.0/0`, VPC의 CIDR(예: `10.0.0.0/8`), 또는 로드 밸런서의 보안 그룹(`SG1`)에서 옵니다.|인스턴스가 대상 그룹의 대상 목록에 포함되어 있기 때문에 로드 밸런서가 포트 `Y`를 통해 트래픽을 전송할 수 있습니다. 보안 그룹이 로드 밸런서의 트래픽을 허용합니다.|

EC2 인스턴스와 공용 액세스에 관한 자세한 정보는 [Linux 인스턴스에서 인바운드 트래픽 권한 부여][19]를 참고하세요. 로드 밸런서를 통해 노출되는 EC2 인스턴스의 예시를 보려면 [예: 프라이빗 서브넷과 NAT이 있는 VPC]를 참고하세요. 

### Amazon Elasticsearch 도메인

[Elasticsearch 도메인][22](`aws_elasticsearch_domain`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| **조건** | **설명** |
|--------------|-----------------|
|regex 패턴 `^search-.*\.es\.amazonaws\.com$`과 일치하는 엔드포인트가 있습니다.|이 형식은 공용 접근이 가능한 도메인일 경우 [엔드포인트][23]가 취하는 형식입니다.|

Elasticsearch 도메인을 공용 접근 불가하도록 만들고 싶을 경우 [VPC 내에서 Amazon OpensSearch Service 도메인 실행[24]을 참고하세요.

### Amazon Machine Images(AMI)

[머신 이미지][25](`aws_ami`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| **조건** | **설명** |
|--------------|-----------------|
|고객 소유이며 별칭 소유자가 아닙니다(계정 필드에 `amazon` 또는 `aws-marketplace`).|인증된 제공자(Amazon 또는 다른 인증된 파트너)가 소유한 공용 AMI의 경우 별칭 소유자가 있는데, 계정 필드에 `amazon` 또는 `aws-marketplace`와 같이 나타납니다. AWS 설명서에서 [공유 AMI 찾기][26]를 참고하세요.|
|이미지가 `public`으로 설정되어 있어 실행 권한이 공개되어 있습니다.|AMI의 `launchPermission` 속성을 수정해 AMI를 공개(모든 AWS 계정에서 실행할 수 있음)하거나 공유하고자 하는 AWS 계정을 지정할 수 있습니다.|

AMI를 공개하거나 비공개하는 방법에 관한 설명은 [AMI 공개하기][27]를 참고하세요.

### Amazon EBS 스냅샷

[EBS 스냅샷][28](`aws_ebs_snapshot`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| **조건** | **설명** |
|--------------|-----------------|
|`create_volume_permission`이 `all`로 설정되어 있습니다.|각 스냅샷에는 새 EBS 볼륨에 스냅샷 데이터를 복구하는 데 필요한 정보가 포함되어 있습니다. 이 스냅샷으로 볼륨을 생성할 수 있다면 정보에 공개적으로 접근할 수 있습니다.|

공용 EBS 스냅샷과 이를 비공개로 전환하는 방법에 관한 자세한 정보는 [Amazon EBS 스냅샷 공유][29]를 참고하세요.

### Amazon EKS 클러스터

[EKS 클러스터][30](`aws_eks_cluster`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| **조건** | **설명** |
|--------------|-----------------|
|클러스터 구성에서 `endpoint_public_access`가 `true`로 설정되어 있습니다.|이 설정을 공개된 공용 CIDR과 함께 사용할 경우 클러스터가 공개적으로 접근 가능한 것이 됩니다. |
|클러스터의 `public_access_cidrs`가 공개 CIDR 블록(`"0.0.0.0/0"`)을 포함합니다.|EKS 클러스터의 퍼블릭 엔드포인트에 접근할 수 있는 CIDR 블록을 제한할 수 있습니다. 공개 CIDR 블록의 경우 인터넷 사용자 누구나 엔드포인트에 접근할 수 있습니다.|

공용 EKS 클러스터에 관한 자세한 정보는 [Amazon EKS 클러스터 엔드포인트 액세스 컨트롤][31]을 참고하세요.

### Amazon SQS Queue

[SQS Queue][32](`aws_sqs_queue`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| **조건** | **설명** |
|--------------|-----------------|
|대기열에는 어떤 보안 주체이든(보안 주체가 `"*"`로 설정됨) 무조건적으로 작업을 실행하도록 허용하는 정책이 있습니다(`statement_has_condition`이 `false`로 설정됨).|이 설정을 사용하면 전 세계 누구나, 또는 인증된 AWS 사용자라면 누구나 대기열에 접근할 수 있습니다. |

공용 SQS 대기열에 관한 더 자세한 정보는 [Amazon SQS 보안 모범 사례][33]를 참고하세요.

## 리소스별 Azure 공용 접근성 로직

### Azure 네트워크 보안 그룹(NSG)

Azure NSG(`azure_security_group`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| 조건 | 설명 |
|----------|-------------|
|보안 그룹에 프로토콜 `tcp`, `udp`, 또는 `*`가 있는 규칙이 있습니다. | 이는 Azure 리소스에 공용 접근 가능 여부를 결정하는 것과 관련된 프로토콜 값입니다. |
|보안 그룹에 액세스가 `Allow`로 설정된 `inbound` 규칙이 있습니다. | 이 값은 인바운드 트래픽을 허용한다는 뜻입니다. |
|보안 그룹에 source_address_prefix가 `*`, `0.0.0.0`, `/0`, `::/0`, `internet`, 또는 `any`입니다. | 이 CIDR 접두사는 인터넷 접근을 허용합니다. |
|최소 1개 포트에 위 속성이 있는 규칙과 우선 순위가 높은 `Deny` 규칙을 함께 사용하여 인터넷에 개방되어 있습니다. | Azure에서 액세스를 계산할 때 어떻게 보안 그룹 규칙을 조합하는지 알아보려면 [보안 규칙][39]을 참고하세요. |

Azure NSG에서 리소스의 인터넷 접근을 허용하고 거부하는 방법에 관한 자세한 정보는 [네트워크 보안 그룹][40]을 참고하세요.

### Azure Virtual Machine 인스턴스

Virtual Machine 인스턴스(`azure_virtual_machine_instance`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

* _공용 접근을 허용하는 네트워크 보안 그룹에 연결됨:_

| 조건 | 설명 |
|----------|-------------|
|가상 머신 인스턴스에 네트워크 인터페이스에 연결된 공용 IP 주소가 있습니다. | 가상 머신 인스턴스에 인터넷으로 접근하려면 공용 IP가 필요합니다. |
|가상 머신 인스턴스에 네트워크 인터페이스에 연결되어 공용 접근을 허용하는 네트워크 보안 그룹이 있습니다. | 네트워크에서 공용 접근을 허용하는 방법에 관해 알아보려면 [Azure 네트워크 보안 그룹(NSG)](#azure-network-security-group-nsg)을 참고하세요. |

***또는***

* _SKU "Basic"인 공용 IP가 있음:_

| 조건 | 설명 |
|----------|-------------|
|가상 머신 인스턴스에 SKU Basic이 네트워크 인터페이스에 연결된 공용 IP 주소가 있습니다. | SKU Basic이 있는 공용 IP 주소는 기본적으로 개방된 상태입니다([공용 IP 주소][41] 참고). |
|가상 머신 인스턴스에 연결된 네트워크 보안 그룹이 없습니다.  | 연결된 네트워크 보안 그룹이 없으면 개방된 공용 IP 주소로 접근하는 것을 막는 규칙이 없다는 뜻입니다. |

Azure Virtual Machine 인스턴스와 공용 접근에 관해 자세히 알아보려면 [가상 머신에 공용 IP 주소 연결][42]을 참고하세요.

### Azure Storage Blob 컨테이너

Storage Blog 컨테이너(`azure_storage_blob_container`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| 조건 | 설명 |
|----------|-------------|
|Storage Blob 컨테이너의 스토리지 계정에 `allow_blob_public_access` 속성이 없거나, 해당 속성이 `true`로 설정되어 있습니다. | 이는 계정에서 개방된 인터넷으로 Azure Blog Storage에 접근하는 것을 허용한다는 뜻입니다. Azure Storage 계정에서 익명으로 읽기 접근을 구성하는 방법에 대해 알아보려면 [컨테이너와 Blob에서 익명으로 읽기 접근 구성][45]을 참고하세요.|
|Storage Blob 컨테이너의 `public_access` 속성이 `blob` 또는 `container`로 설정되어 있습니다. | 이는 계정에서 개방된 인터넷으로 Azure Blob Storage에 접근하는 것을 허용한다는 뜻입니다. |
|Storage Blob 컨테이너는 공용 접근을 명시적으로 차단하지 않는 스토리지 계정에 속해 있습니다. | Storage 계정에서 공용 접근을 명시적으로 차단하지 않으면 그 안에 있는 Storage Blob 컨테이너에 공용 접근이 가능합니다. |

Azure Storage 계정에서 Blob 공용 접근을 차단하는 방법에 대해 자세히 알아보려면 [Azure Storage 계정에서 Blob 공용 접근을 허용 또는 차단하도록 선택][46]을 참고하세요.

## 리소스별 Google Cloud 공용 접근성 로직

### Google Cloud Compute Firewall

Compute Firewall(`gcp_compute_firewall`)의 경우, 다음 조건에서 공용 접근을 허용합니다.

| 조건 | 설명 |
|----------|-------------|
|방화벽에 프로토콜이 TCP이거나 모두이고, `source_ranges`가 `0.0.0.0/0` 또는 `::/0`로 설정되어 있는 규칙이 하나 이상이 있습니다.  | 이 같은 CIDR 접두사는 인터넷 접근을 허용하고 공용 접근 여부를 결정하는 프로토콜 값과 관련이 있습니다. |
|방화벽 방향이 `ingress`입니다. | 이는 방화벽이 인터넷 인바운드 접근과 관련이 있다는 뜻입니다. |

Compute Firewalls를 사용하는 방법에 관한 자세한 정보는 [Azure Storage 계정에서 Blob 공용 접근을 허용 또는 차단하도록 선택][47]을 참고하세요.

### Google Cloud Compute 인스턴스

Compute Instance(`gcp_compute_instance`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| 조건 | 설명 |
|----------|-------------|
|컴퓨팅 인스턴스에 공용 IP 주소가 있으면 액세스 구성에 공용 IP 주소가 정의되어 있는 네트워크 인터페이스가 최소 1개 있다는 뜻입니다. | 컴퓨팅 인스턴스에 외부 IP를 추가하는 방법에 대해 자세히 알아보려면 [고정 외부 IP 주소 예약][48]을 참고하세요. |
|컴퓨팅 인스턴스가 일부 포트에서 인터넷에 개방되는 방화벽 규칙과 연결되어 있습니다. 다음과 같은 방법으로 인스턴스와 방화벽이 연결됩니다. <br><p><ul><li>`target_tags` 또는 `target_service_accounts`가 없음. 따라서 전체 네트워크에 규칙이 적용됨.</li><li>`target_service_accounts`가 컴퓨팅 인스턴스의 `service_accounts` 중 하나와 연결됨.</li><li>컴퓨팅 인스턴스의 네트워크 태그와 일치하는 `target_tags`가 있음.</li></ul></p>이와 같은 규칙을 사용하면 공용 접근이 가능합니다([Google Cloud Compute Firewall] 참고(#google-cloud-compute-firewall)). | 컴퓨팅 인스턴스에서 컴퓨팅 방화벽 규칙을 사용해 포트 범위를 제한하는 방법에 대해 자세히 알아보려면 [방화벽 규칙 구성 요소][49]를 참고하세요. |

컴퓨팅 인스턴스에서 컴퓨팅 방화벽 규칙을 사용해 포트 범위를 제한하는 방법을 알아보려면 [여기][50]를 참고하세요.

### Google Cloud BigQuery Dataset

BigQuery Dataset(`gcp_bigquery_dataset`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| 조건 | 설명 |
|----------|-------------|
|데이터 세트에 `member` 값이 `AllUsers` 또는 `AllAuthenticatedUsers`인 IAM 정책에 연결되어 있습니다. | 이와 같은 구성원 값은 인터넷을 사용하는 누구나 데이터베이스에 접근할 수 있도록 합니다. 자세한 정보는 [IAM 개요][51]를 참고하세요. |
|데이터 세트가 `roles/viewer`, `roles/owner`, `roles/editor`, `roles/bigquery.admin`, `roles/bigquery.metadataviewer`, `roles/bigquery.dataowner`, `roles/bigquery.dataeditor`, `roles/bigquery.dataviewer`, 또는 `roles/bigquery.user` 역할 중 하나에 바인딩하는 IAM 정책과 연결되어 있습니다. | 이와 같은 역할은 리소스에 접근하는 사람이 데이터베이스에 위험한 작업을 할 수 있도록 허용합니다. 자세한 정보는 [역할 참조][52]를 참고하세요. |

[BigQuery Datasets][53]에 대해 자세히 알아보세요.

### Google Cloud Storage 버킷

Storage Bucket(`gcp_storage_bucket`)의 경우, 다음 조건에서 공용 접근 가능한 것으로 판단합니다.

| 조건 | 설명 |
|----------|-------------|
|버킷에 `member` 값이 `AllUsers` 또는 `AllAuthenticatedUsers`인 IAM 정책에 연결되어 있습니다. | 이와 같은 구성원 값은 인터넷을 사용하는 누구나 데이터베이스에 접근할 수 있도록 합니다. 더 자세한 정보는 [여기][54]를 참고하세요. |
|`iam_configuration`의 버킷에 `public_access_prevention`이 `inherited`로 설정되어 있습니다. | 이 설정이 `enforced`로 설정되어 있으면 공용 접근을 차단합니다. 공용 접근 차단 설정에 관한 자세한 정보는 [공요 접근 차단][55]을 참고하세요. |
|버킷이 다음 역할 중 하나에 바인딩하는 IAM 정책과 연결되어 있습니다.<ul><li><code>roles/backupdr.cloudstorageoperator</code></li><li><code>roles/bigquerymigration.worker</code></li><li><code>roles/cloudbuild.builds.builder</code></li><li><code>roles/clouddeploy.jobrunner</code></li><li><code>roles/cloudmigration.storageaccess</code></li><li><code>roles/cloudtestservice.testadmin</code></li><li><code>roles/cloudtestservice.testviewer</code></li><li><code>roles/composer.environmentandstorageobjectadmin</code></li><li><code>roles/composer.environmentandstorageobjectuser</code></li><li><code>roles/composer.environmentandstorageobjectviewer</code></li><li><code>roles/composer.worker</code></li><li><code>roles/config.agent</code></li><li><code>roles/container.nodeserviceaccount</code></li><li><code>roles/dataflow.admin</code></li><li><code>roles/dataflow.worker</code></li><li><code>roles/dataplex.storagedataowner</code></li><li><code>roles/dataplex.storagedatareader</code></li><li><code>roles/dataproc.hubagent</code></li><li><code>roles/dataproc.worker</code></li><li><code>roles/firebase.admin</code></li><li><code>roles/firebase.developadmin</code></li><li><code>roles/firebase.developviewer</code></li><li><code>roles/firebase.viewer</code></li><li><code>roles/firebaserules.system</code></li><li><code>roles/managedidentities.domaincontrolleroperator</code></li><li><code>roles/storage.admin</code></li><li><code>roles/storage.legacyobjectowner</code></li><li><code>roles/storage.legacyobjectreader</code></li><li><code>roles/storage.objectadmin</code></li><li><code>roles/storage.objectuser</code></li><li><code>roles/storage.objectviewer</code></li></ul>|이와 같은 역할은 리소스에 접근하는 사람이 버킷에 위험한 작업을 할 수 있도록 허용합니다. 더 자세한 정보는 [역할 참조][56]를 참고하세요.|

스토리지 버킷을 공용으로 만드는 방법에 관한 자세한 정보는 [여기][57]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#BasicsBucket
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-trails
[4]: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#subnet-basics
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html#RouteTables
[6]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html
[7]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html
[8]: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html
[9]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#working-with-clusters-overview
[10]: https://docs.aws.amazon.com/redshift/latest/mgmt/managing-clusters-vpc.html
[11]: https://docs.aws.amazon.com/vpc/latest/userguide/configure-your-vpc.html
[12]: https://docs.aws.amazon.com/vpc/latest/userguide/security-groups.html
[13]: https://repost.aws/knowledge-center/redshift-cluster-private-public
[14]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.html
[15]: https://repost.aws/knowledge-center/rds-connectivity-instance-subnet-vpc
[16]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateSnapshot.html
[17]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ShareSnapshot.html
[18]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html#concepts-public-addresses
[19]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html
[20]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html
[21]: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#load-balancer-scheme
[22]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/createupdatedomains.html
[23]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/vpc.html#vpc-architecture
[24]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/vpc.html
[25]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[26]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/usingsharedamis-finding.html#usingsharedamis-finding-cli
[27]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-intro.html
[28]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSSnapshots.html
[29]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-modifying-snapshot-permissions.html
[30]: https://docs.aws.amazon.com/eks/latest/userguide/clusters.html
[31]: https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html
[32]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
[33]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-security-best-practices.html
[34]: https://docs.aws.amazon.com/
[35]: https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html
[36]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html
[37]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html
[38]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html
[39]: https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview#security-rules
[40]: https://azure.microsoft.com/en-us/blog/network-security-groups/
[41]: https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses
[42]: https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/associate-public-ip-address-vm?tabs=azure-portal
[43]: https://learn.microsoft.com/en-us/rest/api/compute/disks/create-or-update?view=rest-compute-2023-04-02&tabs=HTTP
[44]: https://learn.microsoft.com/en-us/azure/virtual-machines/disks-enable-private-links-for-import-export-portal
[45]: https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-configure?tabs=portal
[46]: https://azure.microsoft.com/en-us/updates/choose-to-allow-or-disallow-blob-public-access-on-azure-storage-accounts/
[47]: https://azure.microsoft.com/en-us/updates/choose-to-allow-or-disallow-blob-public-access-on-azure-storage-accounts/
[48]: https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address
[49]: https://cloud.google.com/firewall/docs/firewalls#firewall_rule_components
[50]: https://cloud.google.com/compute/docs/instances
[51]: https://cloud.google.com/iam/docs/overview
[52]: https://cloud.google.com/iam/docs/understanding-roles#bigquery-roles
[53]: https://cloud.google.com/bigquery?hl=en
[54]: https://cloud.google.com/iam/docs/overview
[55]: https://cloud.google.com/storage/docs/public-access-prevention
[56]: https://cloud.google.com/iam/docs/understanding-roles#cloud-storage-roles
[57]: https://cloud.google.com/storage/docs/access-control/making-data-public