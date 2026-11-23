---
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: 설명서
  text: Cloud Security Misconfigurations를 사용하여 구성 오류 추적 시작
- link: /security/default_rules/#cat-cloud-security-management
  tag: 설명서
  text: 기본 제공 탐지 규칙
title: Datadog에서 리소스의 공개 액세스 가능 여부를 결정하는 방법
---
Datadog은 그래프 처리 프레임워크를 사용하여 클라우드 리소스 간의 관계를 매핑함으로써 인터넷에서 액세스할 수 있는지 여부를 판단합니다. 이 가이드에서는 그래프 프레임워크 내에서 리소스를 공개적으로 액세스 가능한 것으로 분류하는 데 사용되는 로직을 설명합니다.

## 리소스 종속성 그래프 {#resource-dependency-graph}

다음 다이어그램은 관련 리소스를 사용하여 다른 리소스가 공개적으로 액세스 가능한지 여부를 판단하는 방법을 보여줍니다. 예를 들어, 퍼블릭 Amazon S3 버킷에 저장된 AWS CloudTrail trail은 그 자체로 공개적으로 액세스할 수 있습니다. 리소스가 다른 리소스로 인해 공개적으로 액세스 가능한 경우, 해당 관계는 Cloud Security Misconfigurations 리소스 관계 그래프에 표시됩니다.


<div class="alert alert-info">공개적으로 액세스 가능 속성이 있는 모든 리소스가 이 다이어그램에 표시되는 것은 아닙니다.</div>

### AWS {#aws}

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_aws.png" alt="AWS 리소스의 공개 액세스 가능 여부를 판단하는 데 사용되는 리소스 간의 관계를 보여주는 그래프 다이어그램입니다." width="100%">}}

### Azure {#azure}

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_azure.png" alt="Azure의 공개 액세스 가능 여부를 판단하는 데 사용되는 리소스 간의 관계를 보여주는 그래프 다이어그램입니다." width="70%">}}

### Google Cloud {#google-cloud}

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_gcp.png" alt="Google Cloud의 공개 액세스 가능 여부를 판단하는 데 사용되는 리소스 간의 관계를 보여주는 그래프 다이어그램입니다." width="50%">}}

## 리소스별 AWS 공개 액세스 가능 로직 {#aws-public-accessibility-logic-by-resource}

AWS 네트워크 도달 가능성에 대한 자세한 내용은 [AWS 설명서][34] 및 [AWS Network Reachability Analyser][35]를 참조하세요.

### Amazon S3 버킷 {#amazon-s3-bucket}

[S3 버킷][1](`aws_s3_bucket`)은 다음 중 하나에 해당하는 경우 공개적으로 액세스할 수 있는 것으로 간주됩니다.

* **버킷 정책에 따른 공개** 다음 조건이 모두 충족되는 경우:

  | **기준** | **설명** |
  |--------------|-----------------|
  | 버킷 정책에서 리소스와 보안 주체를 `"*"`로 설정하고 위험한 S3 작업(읽기, 쓰기, 삭제 또는 관리 권한)을 무조건 허용합니다. |이는 버킷에 대한 공개 정책을 정의하며, 인증되지 않은 액세스가 허용됨을 의미합니다. `"*"`는 Wildcard로, 모든 리소스와 보안 주체에 액세스 권한이 부여됨을 의미합니다. `s3:*` 또는 `s3:Put*`과 같은 Wildcard 작업도 일치하는 것으로 처리됩니다. |
  | 버킷의 `public_access_block_configuration` 및 AWS 계정의 퍼블릭 액세스 차단(`aws_s3_account_public_access_block`) 중 어느 것도 `restrict_public_buckets` 값이 `true`로 설정되어 있지 않습니다. | 버킷이나 계정 중 어느 것도 퍼블릭 액세스를 명시적으로 차단하지 않으므로 퍼블릭 버킷 정책이 적용됩니다. |

***OR***

* **Access Control List(ACL)에 따른 공개** 다음 조건이 모두 충족되는 경우:

  | **기준** | **설명** |
  |--------------|-----------------|
  | 버킷에 퍼블릭 수신자에게 안전하지 않은 권한을 허용하는 ACL 권한 부여가 있습니다. |버킷의 ACL은 인증된 사용자(`http://acs.amazonaws.com/groups/global/authenticatedusers`) 또는 모든 사용자(`http://acs.amazonaws.com/groups/global/allusers`)에게 다음 권한(`full_control`, `read`, `write`, `write_acp`) 중 하나 이상을 부여합니다. |
  | 버킷의 `public_access_block_configuration` 및 AWS 계정의 퍼블릭 액세스 차단(`aws_s3_account_public_access_block`) 중 어느 것에도 `ignore_public_acls` 값이 `true`로 설정되어 있지 않습니다. | 버킷이나 계정 중 어느 것도 퍼블릭 ACL을 명시적으로 무시하지 않으므로 퍼블릭 ACL 권한 부여가 적용됩니다. |

자세한 내용은 [Amazon S3 스토리지에 대한 퍼블릭 액세스 차단][2]을 참조하세요.

### AWS CloudTrail trail {#aws-cloudtrail-trail}

[CloudTrail trail][3] (`aws_cloudtrail_trail`)은 다음 조건에 해당하면 퍼블릭 액세스가 가능한 것으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|CloudTrail trail의 `s3_bucket_name` 값이 퍼블릭 액세스가 가능한 것으로 간주되는 S3 버킷으로 설정되어 있습니다. |CloudTrail trail은 S3 버킷으로 전달되는 로그 파일입니다. CloudTrail trail이 퍼블릭 S3 버킷에 저장된 경우 해당 trail은 퍼블릭 액세스가 가능합니다. |

### Amazon VPC 서브넷 {#amazon-vpc-subnet}

[서브넷][4] (`aws_subnet`)은 다음 조건이 모두 참인 경우 퍼블릭으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|[인터넷 게이트웨이][6]에 연결되어 있고 `"0.0.0.0/0"`의 대상 CIDR 블록 또는 `"::/0"`의 IPv6 CIDR 블록으로 라우팅되는 하나 이상의 [라우팅 표][5]에 연결되어 있습니다.| 이 서브넷에 연결된 라우팅 표는 인터넷 게이트웨이를 통해 송신 트래픽을 라우팅하므로 서브넷의 리소스가 퍼블릭 인터넷에 액세스할 수 있습니다.|
|`"0.0.0.0/0"`의 CIDR 블록 또는 `"::/0"`의 IPv6 CIDR 블록을 가진 수신 항목과 송신 항목이 각각 하나 이상 있는 하나 이상의 [네트워크 ACL][7]에 연결되어 있습니다.| 네트워크 ACL은 서브넷 수준에서 서브넷을 나가거나 들어오는 트래픽을 제어합니다. 네트워크 ACL 규칙이 인터넷으로부터의 인바운드 트래픽을 허용하고 임시 포트로의 아웃바운드 트래픽을 허용하는 경우, 서브넷 내의 리소스에 퍼블릭 IP가 할당되어 있고 보안 그룹이 이를 허용하면 해당 리소스가 인터넷에 노출될 수 있습니다.|

퍼블릭 서브넷에 대한 AWS 정의는 [VPC용 서브넷][8]을 참조하세요.

### Amazon Redshift 클러스터 {#amazon-redshift-cluster}

[Redshift 클러스터][9](`aws_redshift_cluster`)는 다음 조건이 모두 충족되는 경우 퍼블릭 액세스 가능으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|구성에서 `publicly_accessible` 값이 `true`로 설정되어 있습니다.|[VPC에서 클러스터 관리][10]를 참조하세요. |
|퍼블릭 [VPC][11]에 있습니다. |퍼블릭 VPC는 하나 이상의 퍼블릭 서브넷이 있고, `"0.0.0.0/0"`의 CIDR 블록 또는 `"::/0"`의 IPv6 CIDR 블록을 가진 하나 이상의 인바운드 및 하나 이상의 아웃바운드 항목이 있는 하나 이상의 네트워크 ACL에 연결된 VPC입니다.|
|`"0.0.0.0/0"`의 CIDR 범위 또는 `"::/0"`의 IPv6 CIDR 범위에서 액세스를 허용하는 규칙이 있는 [보안 그룹][12]과 연결되어 있습니다. |보안 그룹은 VPC로 들어오는 인바운드 트래픽을 제어합니다. 개방형 CIDR 범위를 사용하면 모든 IP 주소에서 액세스할 수 있습니다. |
|[인터넷 게이트웨이][6]에 연결되어 있고 `"0.0.0.0/0"`의 대상 CIDR 블록 또는 `"::/0"`의 IPv6 CIDR 블록으로 라우팅되는 하나 이상의 [라우팅 표][5]에 연결되어 있습니다.| 이 서브넷에 연결된 라우팅 표는 아웃바운드 트래픽을 인터넷 게이트웨이를 통해 라우팅하므로 서브넷 내의 리소스가 퍼블릭 인터넷에 액세스할 수 있습니다.|

Redshift 클러스터 및 퍼블릭 액세스 가능성에 대한 자세한 내용은 [비공개 Amazon Redshift 클러스터를 퍼블릭 액세스 가능하게 만들기][13]를 참조하세요.

### Amazon RDS DB instance {#amazon-rds-db-instance}

[RDS DB 인스턴스][14] (`aws_rds_instance`)는 다음 조건이 모두 충족되는 경우 퍼블릭 액세스 가능으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|연결 구성에서 `publicly_accessible` 값이 `true`로 설정되어 있습니다.|이 설정을 사용하면 DB에 퍼블릭으로 액세스할 수 있습니다. 즉, DNS 엔드포인트는 VPC 내부에서는 프라이빗 IP 주소로, VPC 외부에서는 퍼블릭 IP 주소로 확인됩니다. 그러나 클러스터에 대한 액세스는 여전히 관련 보안 그룹에 의해 제어됩니다. |
|퍼블릭 [서브넷][4]에 있습니다.|-|
|`"0.0.0.0/0"`의 CIDR 범위 또는 `"::/0"`의 IPv6 CIDR 범위에서 액세스를 허용하는 규칙이 있는 [보안 그룹][12]과 연결되어 있습니다. |보안 그룹은 VPC로 들어오는 인바운드 트래픽을 제어합니다. 개방형 CIDR 범위를 사용하면 모든 IP 주소에서 액세스할 수 있습니다. |

RDS DB 인스턴스의 퍼블릭 액세스에 관한 자세한 내용은 [VPC 서브넷을 사용하는 RDS DB 인스턴스에 대한 연결 수정][15]을 참조하세요.

### Amazon RDS DB 스냅샷 {#amazon-rds-db-snapshot}

[RDS DB 스냅샷][16](`aws_rds_db_snapshot`)은 다음 경우에 퍼블릭 액세스가 가능한 것으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|속성이 `"restore"`로 설정되어 있고 속성 값이 `"all"`로 설정되어 있습니다.|DB 스냅샷 가시성을 Public으로 설정하면 모든 AWS 계정이 수동 DB 스냅샷에서 DB 인스턴스를 복원하고 데이터에 액세스할 수 있습니다.|

자세한 내용은 [DB 스냅샷 공유][17]를 참조하세요.

### Amazon Elastic Load Balancer {#amazon-elastic-load-balancer}

ELB(`aws_elbv2_load_balancer`)는 다음 조건이 모두 충족되는 경우 퍼블릭 액세스가 가능한 것으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|[scheme][21]이 `internet-facing`로 설정되어 있습니다.|scheme은 로드 밸런서가 내부 로드 밸런서인지 인터넷 연결형 로드 밸런서인지 결정합니다.|
|`"0.0.0.0/0"`의 CIDR 범위 또는 `"::/0"`의 IPv6 CIDR 범위에서 액세스를 허용하는 규칙이 있는 [보안 그룹][12]에 연결되어 있습니다. |보안 그룹은 VPC로 들어오는 인바운드 트래픽을 제어합니다. 개방형 CIDR 범위를 사용하면 모든 IP 주소에서 액세스할 수 있습니다. |

인터넷 연결형 로드 밸런서에 대한 자세한 내용은 [Application Load Balancer 생성][20]을 참조하세요.

### Amazon EC2 instance {#amazon-ec2-instance}

[EC2 인스턴스][18](`aws_ec2_instance`)는 다음 중 하나라도 해당하면 퍼블릭 액세스가 가능한 것으로 간주됩니다.

* **'퍼블릭 서브넷'에 따라 결정되는 액세스** 다음 조건이 모두 충족되는 경우:

  | **기준** | **설명** |
  |--------------|-----------------|
  |하나 이상의 [퍼블릭 IP 주소][18]를 가지고 있습니다.|퍼블릭 IP 주소를 사용하면 인터넷에서 인스턴스에 연결할 수 있습니다.|
  |퍼블릭 [서브넷][4]에 있습니다.|-|
  |`"0.0.0.0/0"`의 CIDR 범위 또는 `"::/0"`의 IPv6 CIDR 범위에서 액세스를 허용하는 규칙이 있는 [보안 그룹][12]과 연결되어 있습니다. |보안 그룹은 VPC로 들어오는 인바운드 트래픽을 제어합니다. 개방형 CIDR 범위를 사용하면 모든 IP 주소에서 액세스할 수 있습니다. |

***OR***

* **ELB에 따라 결정되는 액세스** 다음 조건이 모두 충족되는 경우:

  | **기준** | **설명** |
  |--------------|-----------------|
  | 로드 밸런서에 연결된 보안 그룹(예: `SG1`)은 퍼블릭 액세스가 가능하며 특정 포트 `X`로 들어오는 트래픽을 허용합니다. | 이렇게 하면 로드 밸런서가 특정 포트에서 인터넷으로부터 들어오는 트래픽을 수신할 수 있습니다. |
  | 로드 밸런서에는 포트 `X`에서 트래픽을 수락하는 리스너가 있습니다. | [리스너][37]는 사용자가 구성한 프로토콜 및 포트를 사용하여 연결 요청을 확인하는 프로세스입니다. |
  | 로드 밸런서에는 특정 포트 `Y`로 트래픽을 전달하는 대상 그룹이 있습니다. | [대상 그룹][38]은 사용자가 지정한 프로토콜 및 포트에서 EC2 인스턴스와 같은 하나 이상의 등록된 대상으로 요청을 라우팅합니다. |
  | EC2 인스턴스는 대상 그룹의 대상으로 나열되어 있으며, `0.0.0.0/0`에서, VPC CIDR(예: `10.0.0.0/8`)에서, 또는 로드 밸런서의 보안 그룹(`SG1`)에서 포트 `Y`로의 수신 트래픽을 허용하는 규칙이 하나 이상 포함된 보안 그룹을 가지고 있습니다. | 인스턴스가 대상 그룹의 대상으로 등록되어 있으므로 로드 밸런서는 포트 `Y`를 통해 해당 인스턴스로 트래픽을 전달할 수 있습니다. 보안 그룹은 로드 밸런서에서 오는 트래픽을 허용해야 합니다. |

***OR***

- **도달 가능성 경로로 결정된 액세스**: Security Graph가 다음 경로 중 하나를 통해 인스턴스와 인터넷을 연결하는 네트워크 도달 가능성 경로를 식별하는 경우
  - [AWS Global Accelerator][64] 뒤.
  - VPC 링크를 통해 내부 로드 밸런서로 연결되는 [Amazon API Gateway][65] 뒤.
  - 로드 밸런서가 CloudFront의 IP 목록으로 제한되는 [Amazon CloudFront][66] 뒤.

EC2 인스턴스 및 퍼블릭 액세스에 대한 자세한 내용은 [Linux 인스턴스에 대한 인바운드 트래픽 권한 부여][19]를 참조하세요. 로드 밸런서를 통해 노출되는 EC2 인스턴스의 예는 [예: 프라이빗 서브넷과 NAT가 있는 서버가 포함된 VPC][36]를 참조하세요.

### Amazon Elasticsearch Domain {#amazon-elasticsearch-domain}

[Elasticsearch 도메인][22](`aws_elasticsearch_domain`)은 다음 경우에 퍼블릭 액세스가 가능한 것으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|정규식 패턴 `^search-.*\.es\.amazonaws\.com$`과 일치하는 엔드포인트가 있습니다.|이는 퍼블릭 액세스가 가능한 도메인의 [엔드포인트][23] 형식입니다.|

Elasticsearch 도메인에 더 이상 퍼블릭 액세스가 불가능하도록 설정하는 방법에 대한 자세한 내용은 [VPC 내에서 Amazon OpenSearch Service 도메인 시작][24]을 참조하세요.

### Amazon 머신 이미지(AMI) {#amazon-machine-images-ami}

[머신 이미지][25](`aws_ami`)는 다음 조건을 모두 충족하는 경우 퍼블릭 액세스가 가능한 것으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|고객 소유입니다. 즉, 별칭이 지정된 소유자가 없습니다(계정 필드에 `amazon` 또는 `aws-marketplace`가 없음).|검증된 공급자(Amazon 또는 검증된 파트너)가 소유한 공개 AMI에는 별칭이 지정된 소유자가 있으며, 계정 필드에 `amazon` 또는 `aws-marketplace`로 표시됩니다. AWS 문서에서 [공유 AMI 찾기][26]를 참조하세요.|
|이미지가 `public`로 설정되어 있어 이미지의 시작 권한이 공개되어 있습니다.|AMI의 `launchPermission` 속성을 수정하여 AMI를 공개(모든 AWS 계정에 시작 권한 부여)하거나 지정한 AWS 계정과만 공유할 수 있습니다.|

AMI를 공개 또는 비공개로 설정하는 방법에 대한 설명은 [AMI 공개][27]를 참조하세요.

### Amazon EBS 스냅샷 {#amazon-ebs-snapshots}

[EBS 스냅샷][28](`aws_ebs_snapshot`)은 다음 경우에 퍼블릭 액세스가 가능한 것으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|`create_volume_permission`이 `all`로 설정되어 있습니다.|각 스냅샷에는 스냅샷 데이터를 새 EBS 볼륨으로 복원하는 데 필요한 모든 정보가 포함되어 있습니다. 누구나 스냅샷에서 볼륨을 생성할 수 있다면 해당 정보에 퍼블릭 액세스가 가능합니다.|

공개 EBS 스냅샷 및 이를 비공개로 설정하는 방법에 대한 자세한 내용은 [Amazon EBS 스냅샷 공유][29]를 참조하세요.

### Amazon EKS clusters {#amazon-eks-clusters}

[EKS 클러스터][30](`aws_eks_cluster`)는 다음 사항이 모두 참인 경우 공개적으로 액세스할 수 있는 것으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|`endpoint_public_access`이 클러스터 구성에서 `true`로 설정되어 있습니다.|이 설정은 개방형 퍼블릭 CIDR과 결합되면 클러스터에 공개적으로 액세스할 수 있게 합니다. |
|클러스터의 `public_access_cidrs`에 개방형 CIDR 블록(`"0.0.0.0/0"`)이 포함되어 있습니다.|EKS 클러스터의 퍼블릭 엔드포인트에 액세스할 수 있는 CIDR 블록을 제한할 수 있습니다. 개방형 CIDR 블록은 인터넷상의 누구나 엔드포인트에 액세스할 수 있음을 의미합니다.|

퍼블릭 EKS 클러스터에 대한 자세한 내용은 [Amazon EKS 클러스터 엔드포인트 액세스 제어][31]를 참조하세요.

### Amazon SQS queue {#amazon-sqs-queue}

[SQS 대기열][32](`aws_sqs_queue`)은 다음과 같은 경우 퍼블릭으로 액세스할 수 있는 것으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|대기열에 모든 주체(주체가 `"*"`(으)로 설정됨)가 조건 없이(`statement_has_condition`이(가) `false`(으)로 설정됨) 작업을 수행하도록 허용하는 정책이 있습니다.|이 설정은 전 세계 모든 사용자나 인증된 AWS 사용자가 대기열에 액세스할 수 있게 만듭니다.|

공용 SQS 대기열에 대한 자세한 내용은 [Amazon SQS 보안 모범 사례][33]를 참조하세요.

### AWS Lambda 함수 {#aws-lambda-function}

[Lambda 함수][58](`aws_lambda_function`)는 다음과 같은 경우 퍼블릭으로 액세스할 수 있는 것으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|함수에 `principal_policy` 또는 `principal_aws`이 `"*"`(으)로 설정된 모든 주체를 허용하는 정책이 있습니다. |이 설정은 전 세계 모든 사용자나 인증된 AWS 사용자가 함수에 액세스할 수 있게 만듭니다.|

공용 Lambda 함수에 대한 자세한 내용은 [AWS Lambda 함수 작업 모범 사례][59]를 참조하세요.

## 리소스별 Azure 퍼블릭 액세스 가능성 논리 {#azure-public-accessibility-logic-by-resource}

### Azure Network Security Group (NSG) {#azure-network-security-group-nsg}

Azure NSG(`azure_security_group`)는 다음 사항이 모두 참인 경우 퍼블릭 액세스를 허용합니다.

| 기준 | 설명 |
|----------|-------------|
|보안 그룹에 프로토콜 `tcp`, `udp` 또는 `*`을(를) 사용하는 규칙이 있습니다. | 이는 Azure 리소스의 퍼블릭 액세스 여부를 결정하는 데 관련된 프로토콜 값입니다. |
|보안 그룹에 액세스가 `Allow`(으)로 설정된 `inbound` 규칙이 있습니다. | 이 값들은 해당 규칙이 인바운드 트래픽을 허용하고 있음을 나타냅니다. |
|보안 그룹에 소스 주소 접두사(source_address_prefix)가 `*`, `0.0.0.0`, `/0`, `::/0`, `internet` 또는 `any`와(과) 같은 규칙이 있습니다. | 이 CIDR 접두사는 인터넷 액세스를 허용합니다. |
|위 속성과 일치하는 규칙은 우선순위가 더 높은 다른 `Deny` 규칙과 결합되어 인터넷에 대한 포트를 하나 이상 엽니다. | Azure가 보안 그룹 규칙을 결합하여 액세스를 계산하는 방법을 알아보려면 [Security 규칙][39]을 참조하세요. |

Azure NSG가 리소스에 대한 인터넷 액세스를 허용하거나 거부하는 방법에 대한 자세한 내용은 [Network Security Groups][40]를 참조하세요.

### Azure Virtual Machine Instance {#azure-virtual-machine-instance}

가상 머신 인스턴스(`azure_virtual_machine_instance`)는 다음 중 하나에 해당하는 경우 공개적으로 액세스할 수 있는 것으로 간주됩니다.

* **퍼블릭 액세스를 허용하는 Network Security Group에 연결됨**: 다음 조건이 모두 참인 경우

  | 기준 | 설명 |
  |----------|-------------|
  |가상 머신 인스턴스의 네트워크 인터페이스 중 하나에 공용 IP 주소가 연결되어 있습니다. | 가상 머신 인스턴스에 대한 인터넷 액세스에는 공용 IP가 필요합니다. |
  |가상 머신 인스턴스의 네트워크 인터페이스 중 하나에 공용 액세스를 허용하는 네트워크 보안 그룹이 연결되어 있습니다. | 네트워크가 퍼블릭 액세스를 허용하는 방법에 대해 자세히 알아보려면 [Azure Network Security Group (NSG)](#azure-network-security-group-nsg)을 참조하세요. |

***OR***

* **Basic SKU의 공용 IP 보유**: 다음 조건이 모두 참인 경우

  | 기준 | 설명 |
  |----------|-------------|
  |가상 머신 인스턴스의 네트워크 인터페이스에 Basic SKU의 공용 IP 주소가 연결되어 있습니다. | Basic SKU의 공용 IP 주소는 기본적으로 열려 있습니다([공용 IP 주소][41] 참조). |
  |가상 머신 인스턴스에 연결된 네트워크 보안 그룹이 없습니다. | 네트워크 보안 그룹이 연결되어 있지 않으면 열려 있는 공용 IP 주소를 통한 액세스를 차단하는 규칙이 없습니다. |

Azure 가상 머신 인스턴스 및 퍼블릭 액세스에 대해 자세히 알아보려면 [가상 머신에 공용 IP 주소 연결][42]을 참조하세요.

### Azure Storage Blob 컨테이너 {#azure-storage-blob-container}

Storage Blob 컨테이너(`azure_storage_blob_container`)는 다음 사항이 모두 참인 경우 공개적으로 액세스할 수 있는 것으로 간주됩니다.

| 기준 | 설명 |
|----------|-------------|
|스토리지 Blob 컨테이너의 스토리지 계정에 `allow_blob_public_access` 속성이 없거나 해당 속성이 `true`로 설정되어 있습니다. | 이는 계정이 Azure Blob Storage에 대한 공용 인터넷 액세스를 허용함을 의미합니다. Azure Storage 계정으로 익명 읽기 액세스를 구성하는 방법에 대한 자세한 내용은 [컨테이너 및 Blob에 대한 익명 읽기 액세스 구성][45]을 참조하세요.|
|스토리지 Blob 컨테이너의 `public_access` 속성이 `blob` 또는 `container`로 설정되어 있습니다. | 이는 계정이 Azure Blob Storage에 대한 공용 인터넷 액세스를 허용함을 의미합니다. |
|스토리지 Blob 컨테이너는 공용 액세스를 명시적으로 차단하지 않는 스토리지 계정의 일부입니다. | 스토리지 계정에서 공용 액세스를 명시적으로 차단하지 않으면 그 안에 있는 스토리지 Blob 컨테이너를 공개할 수 있습니다. |

Azure Storage 계정에서 Blob 공용 액세스를 허용하거나 차단하는 방법에 대한 자세한 내용은 [Azure Storage 계정에서 Blob 공용 액세스 허용 또는 허용 안 함 선택][46]을 참조하세요.

### Azure Kubernetes Service(AKS) 클러스터 {#azure-kubernetes-service-aks-cluster}

[AKS 클러스터][60](`azure_aks_cluster`)는 다음 사항이 모두 참인 경우 공개적으로 액세스할 수 있는 것으로 간주됩니다.

| **기준** | **설명** |
|--------------|-----------------|
|`enable_private_cluster`이 클러스터 구성에서 `false`로 설정되어 있습니다.|이 설정은 개방형 퍼블릭 CIDR과 결합되면 클러스터에 공개적으로 액세스할 수 있게 합니다. |
|클러스터의 `authorized_ip_ranges`에 개방형 CIDR 블록(`"0.0.0.0/0"`)이 포함되어 있거나 설정되지 않았습니다.|개방형 CIDR 블록은 인터넷상의 누구나 엔드포인트에 액세스할 수 있음을 의미합니다.|

공용 AKS 클러스터에 대한 자세한 내용은 [AKS 모범 사례][61]를 참조하세요.

## 리소스별 Google Cloud 공용 액세스 가능성 논리 {#google-cloud-public-accessibility-logic-by-resource}

### Google Cloud Compute 방화벽 {#google-cloud-compute-firewall}

Compute 방화벽(`gcp_compute_firewall`)은 다음 사항이 모두 참인 경우 공용 액세스를 허용합니다.

| 기준 | 설명 |
|----------|-------------|
|방화벽에 프로토콜이 TCP 또는 all이고 `source_ranges`에 `0.0.0.0/0` 또는 `::/0`가 포함된 규칙이 하나 이상 있습니다. | 이러한 CIDR 접두사는 인터넷에서의 액세스를 허용하며, 공용 액세스 여부를 결정하는 데 관련된 프로토콜 값입니다. |
|방화벽의 방향은 `ingress`입니다. | 이는 방화벽이 인터넷에서의 인바운드 액세스와 관련이 있음을 의미합니다. |

Compute 방화벽 사용에 대한 자세한 내용은 [Azure Storage 계정에서 Blob 공용 액세스 허용 또는 허용 안 함 선택][47]을 참조하세요.

### Google Cloud Compute 인스턴스 {#google-cloud-compute-instance}

Compute 인스턴스(`gcp_compute_instance`)는 다음 사항이 모두 참인 경우 공개적으로 액세스할 수 있는 것으로 간주됩니다.

| 기준 | 설명 |
|----------|-------------|
|Compute 인스턴스에 공용 IP 주소가 있습니다. 즉, 네트워크 인터페이스 중 하나 이상에 액세스 구성에 정의된 공용 IP 주소가 있습니다. | Compute 인스턴스에 외부 IP를 추가하는 방법에 대한 자세한 내용은 [고정 외부 IP 주소 예약][48]을 참조하세요. |
|Compute 인스턴스에는 인터넷에 일부 포트 범위를 개방하도록 결합된 방화벽 규칙이 연결되어 있습니다. 방화벽 규칙은 다음 방법으로 인스턴스와 연결될 수 있습니다.<br><ul><li>`target_tags` 또는 `target_service_accounts`가 없어 규칙이 전체 네트워크에 적용되는 경우.</li><li>Compute 인스턴스의 `service_accounts` 중 하나와 연결된 `target_service_accounts`가 있는 경우.</li><li>Compute 인스턴스의 네트워크 태그와 일치하는 `target_tags`이 있는 경우.</li></ul>규칙은 공용 액세스를 허용해야 합니다([Google Cloud Compute 방화벽](#google-cloud-compute-firewall) 참조). | Compute 방화벽 규칙을 사용하여 Compute 인스턴스의 포트 범위를 제한하는 방법을 알아보려면 [방화벽 규칙 구성요소][49]를 참조하세요. |

Compute 방화벽 규칙을 사용하여 Compute 인스턴스의 포트 범위를 제한하는 방법에 대해 자세히 알아보려면 [여기][50]를 참조하세요.

### Google Cloud BigQuery 데이터 세트 {#google-cloud-bigquery-dataset}

BigQuery 데이터 세트(`gcp_bigquery_dataset`)는 다음 사항이 모두 참인 경우 공개적으로 액세스할 수 있는 것으로 간주됩니다.

| 기준 | 설명 |
|----------|-------------|
|데이터 세트에 `AllUsers` 또는 `AllAuthenticatedUsers` 중 하나의 `member` 값을 가진 IAM 정책이 연결되어 있습니다. | 이러한 멤버는 인터넷상의 누구든지 데이터베이스에 액세스할 수 있도록 허용합니다. 자세한 내용은 [IAM 개요][51]를 참조하세요. |
|데이터 세트에는 다음 역할 중 하나에 바인딩되는 IAM 정책이 연결되어 있습니다. 해당 역할은 `roles/viewer`, `roles/owner`, `roles/editor`, `roles/bigquery.admin`, `roles/bigquery.metadataviewer`, `roles/bigquery.dataowner`, `roles/bigquery.dataeditor`, `roles/bigquery.dataviewer` 또는 `roles/bigquery.user`입니다. | 이러한 역할은 리소스에 액세스하는 사람이 데이터베이스에서 위험한 작업을 수행하도록 허용합니다. 자세한 내용은 [역할 참조][52]를 참조하세요. |

[BigQuery 데이터 세트][53]에 대해 자세히 알아보세요.

### Google Cloud Storage 버킷 {#google-cloud-storage-bucket}

스토리지 버킷(`gcp_storage_bucket`)은 다음 사항이 모두 참인 경우 공개적으로 액세스할 수 있는 것으로 간주됩니다.

| 기준 | 설명 |
|----------|-------------|
|버킷에는 `AllUsers` 또는 `AllAuthenticatedUsers`인 `member` 값을 가진 IAM 정책이 연결되어 있습니다. | 이러한 멤버는 인터넷상의 누구든지 데이터베이스에 액세스할 수 있도록 허용합니다. 자세한 내용은 [여기][54]를 참조하세요. |
|버킷의 `iam_configuration`에서 `public_access_prevention` 값이 `inherited`로 설정되어 있습니다. | 이 설정을 `enforced`로 지정하면 공용 액세스가 차단됩니다. 공용 액세스 방지 설정에 대한 자세한 내용은 [공용 액세스 방지][55]를 참조하세요. |
|버킷에는 다음 역할 중 하나에 바인딩되는 IAM 정책이 연결되어 있습니다. 해당 역할은 <ul><li>입니다.<code>roles/backupdr.cloudstorageoperator</code></li><li><code>roles/bigquerymigration.worker</code></li><li><code>roles/cloudbuild.builds.builder</code></li><li><code>roles/clouddeploy.jobrunner</code></li><li><code>roles/cloudmigration.storageaccess</code></li><li><code>roles/cloudtestservice.testadmin</code></li><li><code>roles/cloudtestservice.testviewer</code></li><li><code>roles/composer.environmentandstorageobjectadmin</code></li><li><code>roles/composer.environmentandstorageobjectuser</code></li><li><code>roles/composer.environmentandstorageobjectviewer</code></li><li><code>roles/composer.worker</code></li><li><code>roles/config.agent</code></li><li><code>roles/container.nodeserviceaccount</code></li><li><code>roles/dataflow.admin</code></li><li><code>roles/dataflow.worker</code></li><li><code>roles/dataplex.storagedataowner</code></li><li><code>roles/dataplex.storagedatareader</code></li><li><code>roles/dataproc.hubagent</code></li><li><code>roles/dataproc.worker</code></li><li><code>roles/firebase.admin</code></li><li><code>roles/firebase.developadmin</code></li><li><code>roles/firebase.developviewer</code></li><li><code>roles/firebase.viewer</code></li><li><code>roles/firebaserules.system</code></li><li><code>roles/managedidentities.domaincontrolleroperator</code></li><li><code>roles/storage.admin</code></li><li><code>roles/storage.legacyobjectowner</code></li><li><code>roles/storage.legacyobjectreader</code></li><li><code>roles/storage.objectadmin</code></li><li><code>roles/storage.objectuser</code></li><li><code>roles/storage.objectviewer</code></li></ul>|이러한 역할은 리소스에 액세스하는 사람이 버킷에서 위험한 작업을 수행하도록 허용합니다. 자세한 내용은 [역할 참조][56]를 참조하세요.|

스토리지 버킷을 공개하는 방법에 대한 자세한 내용은 [여기][57]에서 확인하세요.

### Google Cloud Kubernetes Engine 클러스터 {#google-cloud-kubernetes-engine-clusters}

Kubernetes Engine 클러스터(`gcp_kubernetes_engine_cluster`)는 다음 **모든** **기본 기준**과 아래 나열된 추가 조건 중 **최소 하나**를 충족하는 경우 공개적으로 액세스할 수 있는 것으로 간주됩니다.

**기본 기준(모두 필수):**

| **기준** | **설명** |
|--------------|-----------------|
| 비공개 엔드포인트가 사용 중지됨 | 클러스터의 [비공개 엔드포인트][62]가 사용 설정되어 있지 않으므로(`enable_private_endpoint` 값이 false임), 제어 영역에 공용 IP 주소가 있음을 의미합니다. |
| 공용 엔드포인트가 사용 설정됨 | 클러스터에 공용 엔드포인트가 구성되어 있습니다(`public_endpoint` 값이 true임). |

**및 다음 조건 중 하나 이상 충족:**

* **승인된 네트워크가 사용 중지됨**

  | **기준** | **설명** |
  |--------------|-----------------|
  | [승인된 네트워크][63]가 사용 설정되어 있지 않습니다. | 클러스터의 제어 영역에 액세스할 수 있는 사용자에 대한 IP 허용 목록 제한이 없으므로 모든 IP 주소에서 액세스할 수 있습니다. |

***OR***

* **제한 없는 CIDR 블록 허용**

  | **기준** | **설명** |
  |--------------|-----------------|
  | 승인된 네트워크 구성에 `0.0.0.0/0` CIDR 블록이 포함되어 있습니다. | 이 CIDR 블록은 인터넷상의 모든 IP 주소에서 액세스를 허용합니다. |

***OR***

* **승인된 네트워크에 추가된 Google Cloud 외부 IP 주소**

  | **기준** | **설명** |
  |--------------|-----------------|
  | 승인된 네트워크에 Google Cloud 외부 IP 주소가 추가되었습니다(`gcpPublicCidrsAccessEnabled` 값이 `true`로 설정됨). | 이렇게 하면 Google Cloud VM에 할당된 모든 외부 IP 주소에서 액세스가 허용되므로, 누구나 Google Cloud에서 VM을 생성하여 클러스터의 제어 영역에 액세스할 수 있습니다. |

***OR***

* **광범위한 Google Cloud IP 범위 허용**

  | **기준** | **설명** |
  |--------------|-----------------|
  | 승인된 네트워크 구성에 `34.0.0.0/7` CIDR 블록이 포함되어 있습니다. | 이 CIDR 범위는 때때로 Google Cloud IP 범위에서의 액세스를 허용하는 데 사용되며 공개적으로 액세스할 수 있는 것으로 간주됩니다. |

<div class="alert alert-info">승인된 네트워크가 사용 설정된 클러스터(<code>{"enabled":true}</code>)이지만 CIDR 블록 목록이 비어 있는(<code>{"enabled":true, "cidr_blocks":[]}</code>) 경우, 제어 영역에 대한 모든 외부 액세스를 차단하므로 공개적으로 액세스할 수 있는 것으로 간주되지 <strong>않습니다</strong>.</div>

## 추가 자료 {#further-reading}

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
[58]: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
[59]: https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html
[60]: https://learn.microsoft.com/en-us/azure/aks/intro-kubernetes
[61]: https://learn.microsoft.com/en-us/azure/aks/best-practices
[62]: https://cloud.google.com/kubernetes-engine/docs/how-to/latest/network-isolation#private_cp
[63]: https://cloud.google.com/kubernetes-engine/docs/how-to/latest/network-isolation#overview
[64]: https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html
[65]: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html
[66]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html