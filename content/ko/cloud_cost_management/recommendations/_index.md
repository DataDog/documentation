---
algolia:
  tags:
  - cloud cost recommendations
  - cloud cost recommendation
  - cost recommendations
  - cost recommendation
  - cloud resources
  - cloud resource
aliases:
- /ko/cloud_cost_management/recommendations/savings
description: Cost Recommendations를 사용하여 조직의 클라우드 리소스 비용을 절감하는 방법을 알아보세요.
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management에 대해 알아보기
- link: /integrations/guide/aws-integration-and-cloudwatch-faq/
  tag: 설명서
  text: AWS 통합 및 CloudWatch FAQ
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: 블로그
  text: Datadog에서 성공적인 FinOps 사례를 구축한 방법
- link: https://www.datadoghq.com/blog/cloud-cost-recommendations/
  tag: 블로그
  text: Cloud Cost Recommendation을 통해 AWS, Azure 및 Google Cloud 전반의 클라우드 낭비 제거
multifiltersearch:
  data:
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: 프롬프트 캐싱을 사용하지 않는 Anthropic API 키를 식별하고 입력 토큰 비용 절감을
      위해 프롬프트 캐싱 활성화를 권장합니다.
    recommendation_prerequisites: '[Anthropic integration](/integrations/anthropic/)'
    recommendation_type: Enable Anthropic Prompt Caching
    resource_type: Anthropic API Key
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 레거시 인스턴스 유형이 포함된 Auto Scaling 그룹.
    recommendation_prerequisites: ''
    recommendation_type: Migrate ASG Legacy Instances
    resource_type: Auto Scaling Group
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 인스턴스 최소 용량을 줄일 수 있는 Auto Scaling 그룹.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Minimum Capacity
    resource_type: Auto Scaling Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 비용 절감을 위해 유료 이벤트가 포함된 CloudTrail 트레일을 삭제할 수 있습니다.
    recommendation_prerequisites: ''
    recommendation_type: Delete unnecessary CloudTrail trails
    resource_type: CloudTrail Trail
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: DynamoDB 표의 글로벌 보조 인덱스(GSI)가 읽기 사용량 0을 기록하는 경우.
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Global Secondary Index
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: DynamoDB 표의 읽기 사용량과 비복제 쓰기 사용량이 모두 0인 경우.
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Table
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: DynamoDB 표에 2개를 초과하는 온디맨드 백업 비용이 발생하는 경우.
    recommendation_prerequisites: ''
    recommendation_type: Delete Extra On-Demand Backups
    resource_type: DynamoDB Table
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 프로비저닝된 DynamoDB 표가 80% 이상의 기간 동안 읽기 및 쓰기 용량의 80% 미만만
      사용하는 경우.
    recommendation_prerequisites: ''
    recommendation_type: Downsize DynamoDB Capacity
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Infrequent Access(IA) 표 클래스로 마이그레이션하면 용량 비용 증가보다 스토리지
      비용 절감 효과가 더 큰 경우.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Infrequent Access Table Class
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 프로비저닝된 DynamoDB 표의 시간당 읽기 및 쓰기 용량 사용률이 지난 2주 동안 한
      번 이상 18% 미만인 경우.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to On-Demand Capacity Mode
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 온디맨드 DynamoDB 표의 시간당 읽기 및 쓰기 용량 사용률이 항상 18%를 초과하는
      경우.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Provisioned Capacity Mode
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Standard 표 클래스로 마이그레이션하면 스토리지 비용 증가보다 용량 비용 절감 효과가
      더 크거나, Standard 표 클래스의 무료 스토리지 계층을 활용할 수 있는 경우.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Standard Table Class
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 90일 이상 경과하여 삭제 가능한 EBS 스냅샷.
    recommendation_prerequisites: ''
    recommendation_type: Delete Old EBS Snapshots
    resource_type: EBS Snapshot
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 읽기 및 쓰기 작업에서 프로비저닝된 IOPS의 80% 미만만 사용하는 EBS 볼륨.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned IOPS
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 읽기 및 쓰기 작업에서 프로비저닝된 처리량의 구성된 임계값 미만만 사용하는 EBS 볼륨.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned Throughput
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 스토리지 용량의 20% 미만만 사용 중인 EBS 볼륨.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Storage Capacity
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 비용 절감 및 성능 향상을 위해 GP3로 업그레이드할 수 있는 GP2 EBS 볼륨.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from GP2 to GP3
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 비용 절감 및 성능 향상을 위해 GP3로 업그레이드할 수 있는 IO1 EBS 볼륨.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from IO1 to GP3
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: EC2 인스턴스에 연결되지 않은 볼륨.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unattached EBS Volume
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 읽기 또는 쓰기 활동이 없는 볼륨.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused EBS Volume
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: AWS 비용 및 사용량 보고서에서 유휴 요금이 발생하는 Elastic IP 주소.
    recommendation_prerequisites: ''
    recommendation_type: Delete Idle Elastic IP
    resource_type: Elastic IP
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: CPU 및 메모리 사용률이 동일 계열의 다음으로 작은 인스턴스의 가용 리소스보다 낮은 EC2
      인스턴스. Datadog Agent가 없는 경우 이 권장 사항은 CloudWatch 메트릭을 사용하여 생성됩니다.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 최신 인스턴스 유형으로 업그레이드할 수 있는 이전 세대 EC2 인스턴스.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 동등한 Graviton 인스턴스 유형으로 마이그레이션할 수 있는 EC2 인스턴스.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance to Graviton Type
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: CPU 및 메모리 사용률이 사용자 지정 가능한 임계값 미만인 EC2 인스턴스. Datadog
      Agent가 없는 경우 이 권장 사항은 CloudWatch 메트릭을 사용하여 생성됩니다.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate EC2 Instance
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 보류 상태에 머물러 있어 노드가 정상적으로 작동하지 않는 Kubernetes 노드를 호스팅하는
      EC2 인스턴스.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate EC2 Instance with Stuck Node
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 비용 절감을 위해 삭제 가능한, Pull 활동이 없는 ECR 리포지토리.
    recommendation_prerequisites: ''
    recommendation_type: Delete ECR Repository
    resource_type: ECR Repository
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 요청된 CPU 또는 메모리의 50% 미만만 사용하는 ECS 작업.
    recommendation_prerequisites: '[Container Monitoring](/containers/)'
    recommendation_type: Downsize ECS Task Size
    resource_type: ECS Task Definition
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 캐시 적중이 없고 복제도 없는 ElastiCache Redis 클러스터 또는 캐시 적중이
      없는 Memcached 클러스터.
    recommendation_prerequisites: ''
    recommendation_type: Terminate ElastiCache Cluster
    resource_type: ElastiCache Cluster
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 요청 활동이 없는 OpenSearch 도메인.
    recommendation_prerequisites: ''
    recommendation_type: Delete OpenSearch Domain
    resource_type: OpenSearch Domain
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 활성 연결이 없고 EC2 인스턴스에도 연결되지 않은 Classic Elastic Load
      Balancer.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Classic Load Balancer
    resource_type: Classic Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 트래픽을 처리하지 않는 Application Load Balancer.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Application Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 처리된 바이트 수가 0인 Network Load Balancer.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Network Load Balancer
    resource_type: Load Balancer
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 프로비저닝된 동시성이 과도하게 할당된 AWS Lambda 함수.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Lambda Provisioned Concurrency
    resource_type: Lambda
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 불필요한 로그 생성을 방지하기 위해 Lambda CloudWatch Logs의 쓰기 권한
      제거.
    recommendation_prerequisites: ''
    recommendation_type: Delete Lambda CloudWatch Logs and write permissions
    resource_type: CloudWatch Log Group
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 적절한 보존 정책을 설정하여 CloudWatch Logs 스토리지 비용 절감.
    recommendation_prerequisites: ''
    recommendation_type: Set CloudWatch Logs Retention Policy
    resource_type: CloudWatch Log Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 연결 수가 0인 MQ 브로커.
    recommendation_prerequisites: ''
    recommendation_type: Terminate MQ Broker
    resource_type: MQ Broker
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 지난 2주 동안 프로비저닝된 IOPS의 80% 미만만 사용한 RDS 인스턴스.
    recommendation_prerequisites: ''
    recommendation_type: Downsize RDS Instance Provisioned IOPS
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 더 이상 지원되지 않는 엔진 버전을 사용하여 [확장 지원 요금](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html)이
      부과되는 RDS 인스턴스.
    recommendation_prerequisites: ''
    recommendation_type: Migrate RDS Instance Engine
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 동등한 Graviton 인스턴스 유형으로 마이그레이션할 수 있는 RDS 인스턴스.
    recommendation_prerequisites: ''
    recommendation_type: Migrate RDS Instance to Graviton
    resource_type: RDS Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 데이터베이스 연결 수와 복제 지연이 모두 0인 RDS 인스턴스.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused RDS Instance
    resource_type: RDS Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 데이터베이스 연결 수가 0인 Redshift 클러스터.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Redshift Cluster
    resource_type: Redshift Cluster
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 버전 관리가 활성화되어 있으며 오래된 객체 버전으로 인해 상당한 스토리지 비용이 발생하는
      버킷.
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Clean up old versions to reduce storage costs
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 웹사이트를 제공하지 않고 비최신 버전 만료 수명 주기 정책이 없는 표준 S3 버킷에 30일
      이상 된 비최신 버전 스토리지가 존재하는 경우.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete S3 noncurrent version objects
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 7일 이상 된 미완료 다중 파트 업로드로 인해 스토리지 공간을 소비하는 S3 버킷.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete abandoned S3 multipart uploads
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 비정기 액세스 스토리지 클래스에 작은 파일이 과도하게 저장되어 최소 청구 단위로 인해 스토리지
      비용이 증가하는 버킷.
    recommendation_prerequisites: ''
    recommendation_type: Reduce small file count to reduce storage costs
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 스토리지 비용이 매우 적고 GET 또는 PUT 요청이 없는 S3 버킷.
    recommendation_prerequisites: ''
    recommendation_type: Terminate S3 Bucket
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 조기 삭제 비용이 큰 버킷.
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 IA and Glacier objects to Intelligent-Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 비용 대부분이 GB당 표준 스토리지 비용이지만 GET 요청 수가 적어 객체 접근이 거의 없는
      버킷.
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 Standard objects to Intelligent Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: 비용 대부분이 GB당 표준 스토리지 비용이지만 GET 요청 수가 적어 해당 접두사 내 객체
      접근이 거의 없는 버킷 접두사.
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Transition S3 objects to Infrequent Access by Prefix
    resource_type: S3 Bucket
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: NAT 게이트웨이가 필요한 리소스는 동일한 Availability Zone의 NAT 게이트웨이를
      사용해야 하며, 그렇지 않으면 불필요한 영역 간 전송 비용이 발생할 수 있습니다.
    recommendation_prerequisites: ''
    recommendation_type: Reduce NAT Gateway Cross-Zone Transfers
    resource_type: VPC NAT Gateway
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 동일한 VPC 내 리소스는 NAT 게이트웨이를 통해 서로 통신하지 않도록 해야 하며, 그렇지
      않으면 불필요한 NAT 게이트웨이 처리 비용이 발생합니다.
    recommendation_prerequisites: '[NPM](/network_monitoring/performance/setup/)'
    recommendation_type: Reduce NAT Gateway Within-VPC Transfers
    resource_type: VPC NAT Gateway
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: 전송된 바이트가 없는 NAT Gateway.
    recommendation_prerequisites: ''
    recommendation_type: Terminate NAT Gateway
    resource_type: VPC NAT Gateway
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: CPU 사용률이 5% 미만인 AKS 클러스터.
    recommendation_prerequisites: ''
    recommendation_type: Terminate AKS Cluster
    resource_type: AKS Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 필요 이상으로 최소 복제본 수가 높은 Container App.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Container App
    resource_type: Container App
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 전송된 바이트 수가 0인 로드 밸런서.
    recommendation_prerequisites: ''
    recommendation_type: Delete Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 연결되지 않아 삭제 가능한 관리형 디스크.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Managed Disk
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 읽기/쓰기 작업이 없어 삭제 가능한 관리형 디스크.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Managed Disk
    resource_type: Managed Disk
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 프로비저닝된 IOPS 사용량이 구성된 임계값 미만인 관리형 디스크.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk IOPS
    resource_type: Managed Disk
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 프로비저닝된 처리량 사용량이 구성된 임계값 미만인 관리형 디스크.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk Throughput
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 연결이 없어 종료 가능한 데이터베이스 서버.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Database for MySQL
    resource_type: MySQL Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 연결이 없어 종료 가능한 SQL Server.
    recommendation_prerequisites: ''
    recommendation_type: Terminate SQL Server
    resource_type: SQL Server
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: DTU 사용량이 낮아 축소 가능한 SQL Server 데이터베이스.
    recommendation_prerequisites: ''
    recommendation_type: Downsize SQL Server Database DTU
    resource_type: SQL Server Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 정상 연결이 없고 CPU 사용량도 매우 낮아 종료 가능한 SQL Server 데이터베이스.
    recommendation_prerequisites: ''
    recommendation_type: Terminate SQL Server Database
    resource_type: SQL Server Database
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 더 작은 인스턴스 유형으로 축소 가능한 VM 인스턴스.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Azure VM Instance
    resource_type: VM Instance
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: 사용자 CPU 사용률이 5% 미만이고 사용 가능한 메모리가 90%를 초과하는 VM 인스턴스.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate Azure VM Instance
    resource_type: VM Instance
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 과도하게 프로비저닝된 범용 Databricks 클러스터를 식별하고 비용 절감을 위해 더 작은
      인스턴스 유형으로의 적정 규모 조정을 제안합니다.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 과도하게 프로비저닝된 범용 Databricks 클러스터를 식별하고 비용 절감을 위해 더 작은
      인스턴스 유형으로의 적정 규모 조정을 제안합니다.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 과도하게 프로비저닝된 범용 Databricks 클러스터를 식별하고 비용 절감을 위해 더 작은
      인스턴스 유형으로의 적정 규모 조정을 제안합니다.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 과도하게 프로비저닝된 Databricks 작업을 식별하고 비용 절감을 위해 더 작은 인스턴스
      유형으로 적정 규모 조정을 제안합니다.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 과도하게 프로비저닝된 Databricks 작업을 식별하고 비용 절감을 위해 더 작은 인스턴스
      유형으로 적정 규모 조정을 제안합니다.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 과도하게 프로비저닝된 Databricks 작업을 식별하고 비용 절감을 위해 더 작은 인스턴스
      유형으로 적정 규모 조정을 제안합니다.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 사용되지 않는 Compute IP 주소는 삭제할 수 있습니다.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute IP Address
    resource_type: Compute Address
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 연결되지 않은 Compute 디스크는 삭제할 수 있습니다.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 사용되지 않는 Compute 디스크는 삭제할 수 있습니다.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 사용되지 않는 Compute 전역 IP 주소는 삭제할 수 있습니다.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Global IP Address
    resource_type: Compute Global Address
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: CPU와 메모리 사용량이 낮은 Compute 인스턴스는 더 작은 인스턴스 유형으로 축소할
      수 있습니다.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Compute Instance
    resource_type: Compute Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: CPU 사용량이 낮고 사용 가능한 메모리가 많으며 네트워크 활동이 거의 없는 Compute
      인스턴스입니다.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate Compute Instance
    resource_type: Compute Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 최소 인스턴스 수를 줄일 수 있는 Compute Instance Group Autoscaler입니다.
    recommendation_prerequisites: ''
    recommendation_type: Reduce Minimum Capacity
    resource_type: Compute Instance Group
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 과도하게 프로비저닝되어 축소할 수 있는 CloudSQL 인스턴스입니다.
    recommendation_prerequisites: ''
    recommendation_type: Downsize CloudSQL Database
    resource_type: CloudSQL Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 사용량이 매우 적어 종료할 수 있는 CloudSQL 인스턴스입니다.
    recommendation_prerequisites: ''
    recommendation_type: Terminate CloudSQL Instance
    resource_type: CloudSQL Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: 비최신 객체 버전을 자동으로 삭제하는 수명 주기 규칙을 적용하면 비용 절감 효과를 얻을 수
      있는 Cloud Storage 버킷입니다.
    recommendation_prerequisites: ''
    recommendation_type: Delete Noncurrent Cloud Storage Objects
    resource_type: Storage Bucket
  - category: Migrate
    cloud_provider: GCP
    recommendation_description: 스토리지 버킷의 객체를 더 낮은 비용의 아카이브 계층으로 자동 마이그레이션할 수 있습니다.
    recommendation_prerequisites: ''
    recommendation_type: Transition Cloud Storage Bucket to Autoclass
    resource_type: Storage Bucket
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: CPU 또는 메모리 유휴 상태가 높은 Kubernetes 클러스터입니다.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: CPU 또는 메모리 유휴 상태가 높은 Kubernetes 클러스터입니다.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: CPU 또는 메모리 유휴 상태가 높은 Kubernetes 클러스터입니다.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: 컨테이너가 요청된 CPU 또는 메모리의 일부만 사용하고 있습니다.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: 컨테이너가 요청된 CPU 또는 메모리의 일부만 사용하고 있습니다.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: 컨테이너가 요청된 CPU 또는 메모리의 일부만 사용하고 있습니다.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  headers:
  - filter_by: true
    id: category
    name: 권장 카테고리
  - filter_by: true
    id: cloud_provider
    name: 클라우드 공급자
  - filter_by: true
    id: resource_type
    name: 리소스 유형
  - id: recommendation_type
    name: 권장 유형
  - id: recommendation_description
    name: 권장 내용
  - id: recommendation_prerequisites
    name: 권장 전제 조건
title: Cloud Cost Recommendation
---
## 개요 {#overview}

[Cloud Cost Recommendation][1]은 클라우드 리소스 사용을 최적화하여 클라우드 지출을 줄이기 위한 권장 사항을 제공합니다. Datadog은 관측 가능성 데이터와 클라우드 공급자의 청구 데이터를 결합하여 고아 리소스, 레거시 리소스 또는 과도하게 프로비저닝된 클라우드 리소스를 식별하고 권장 사항을 생성합니다.

권장 사항은 매일 실행되며, 새 권장 사항이 릴리스되는 즉시 계정에 자동으로 반영됩니다.

- **모든 리소스**에 대해 해당 리소스의 [클라우드 비용 메트릭][6]도 함께 수집됩니다.
- Kubernetes 및 EC2를 제외한 모든 **AWS 리소스**에 대해 [AWS CloudWatch][7]의 AWS 메트릭도 함께 수집됩니다.

{{< img src="cloud_cost/recommendations/cost_recommendations_1.png" alt="Cloud Cost Recommendation 페이지의 잠재 월간 절감액, 잠재 연간 절감액 및 총 미해결 케이스 수를 보여주는 개요 탭" style="width:100%;" >}}

이 페이지에 표시되는 관측 가능성 메트릭 또는 비용 데이터와 함께 각 권장 사항 유형의 상세 로직을 확인할 수 있습니다.

권장 사항은 [Tag Pipelines][11]를 지원하므로 조직의 표준화된 태그를 사용하여 권장 사항을 필터링, 그룹화 및 분석할 수 있습니다. Tag Pipelines에 구성된 모든 태그 규칙은 권장 사항에 자동 적용되며 [정규화됩니다][12].

## 권장 사항 범주 {#recommendation-categories}

다음은 사용 가능한 클라우드 비용 권장 사항 범주와 설명입니다.

| 권장 카테고리 | 설명 |
|----------|-------------|
| 종료 | 리소스가 사용되지 않거나 사용률이 매우 낮음을 나타내는 신호가 있는 리소스입니다. 비용 절감을 위해 해당 리소스를 종료하거나 삭제하는 것을 고려합니다. |
| 마이그레이션 | 사용률이 다소 낮거나 기타 비효율성이 있는 리소스입니다. 인스턴스 유형 또는 기타 파라미터 조정을 고려합니다. |
| 축소 | 사용률이 낮거나 과도하게 프로비저닝된 리소스입니다. 비용 절감을 위해 크기 또는 기타 파라미터 조정을 고려합니다. |
| 구매 | 온디맨드 요금이 발생하고 장기간 실행 중인 리소스입니다. 예약 인스턴스 또는 Savings Plan을 구매하면 리소스의 상각 비용을 줄일 수 있습니다. |
| 구성 | 용량을 변경하거나 리소스를 종료하지 않고도 비용을 줄일 수 있도록 설정 옵션을 조정할 수 있는 리소스입니다. |

## 전제 조건 {#prerequisites}

Cloud Cost 권장 사항을 받기 위해 필요한 요구 사항은 다음과 같습니다.

- 클라우드 공급자 계정(원하는 모든 Cloud Cost 권장 사항에 필요)
- [AWS 통합 및 리소스 수집][3](AWS 권장 사항용)
- [Azure 통합 및 리소스 수집][8](Azure 권장 사항용)
- [GCP 통합 및 리소스 수집][10](GCP 권장 사항용)
- [Datadog Agent 통합][5](축소 권장 사항용)

## 설정 {#setup}

권장 사항을 받고자 하는 각 클라우드 계정에 대해 다음을 수행합니다.

1. [Cloud Cost Management][2]를 구성하여 청구 데이터를 Datadog으로 전송합니다.
   - Azure의 경우 청구 데이터를 수집하기 위해 App Registration 방식을 사용해야 합니다.
1. 권장 사항을 위해 [리소스 수집][3]을 활성화합니다.
   - AWS의 경우 [AWS 통합 타일][4]의 {{< ui >}}Resource Collection{{< /ui >}} 탭에서 리소스 수집을 활성화합니다.
   - Azure의 경우 적절한 통합을 사용하여 리소스 수집을 활성화합니다. 조직이 Datadog US3 사이트를 사용하는 경우 [Azure Native Integration][9]이 메트릭 수집을 통해 이를 자동으로 활성화합니다. 그 외 모든 사이트에서는 [Azure 통합 타일][8] 내에서 리소스 수집을 활성화해야 합니다.
   - GCP의 경우 [Google Cloud Platform 통합 타일][10]의 {{< ui >}}Resource Collection{{< /ui >}} 탭에서 리소스 수집을 활성화합니다.
1. [Datadog Agent][5]를 설치합니다(축소 권장 사항에 필요).

**참고**: Cloud Cost Recommendation은 고객의 USD 이외 통화로 된 청구도 지원합니다.

## 권장 사항 상태 {#recommendation-statuses}

각 권장 사항에 상태를 할당하여 팀 전반의 비용 최적화 진행 상황을 추적할 수 있습니다. 권장 사항이 매일 다시 생성되더라도 상태는 유지됩니다. 동일한 권장 사항을 다시 분류할 필요가 없습니다.

| 상태 | 설명 |
|--------|-------------|
| {{< ui >}}Open{{< /ui >}} | (기본값) 권장 사항이 아직 분류되지 않았습니다. |
| {{< ui >}}In Progress{{< /ui >}} | 해당 권장 사항을 처리하기 위한 작업이 진행 중입니다. |
| {{< ui >}}Completed{{< /ui >}} | 권장 액션이 취해졌거나 더 이상 관련이 없습니다. |
| {{< ui >}}Dismissed{{< /ui >}} | 권장 사항을 해제할 때 지정한 기간 동안 해당 권장 사항에 대한 작업 계획이 없습니다. |

### 상태별 권장 사항 필터링 {#filter-recommendations-by-status}

[{{< ui >}}Cloud Cost Recommendations{{< /ui >}}][1] 페이지 상단의 상태 탭을 사용하여 상태별로 목록을 필터링합니다. 사용 가능한 탭은 {{< ui >}}Open{{< /ui >}}, {{< ui >}}In Progress{{< /ui >}}, {{< ui >}}Completed{{< /ui >}}, {{< ui >}}Dismissed{{< /ui >}}입니다. 각 탭에는 해당 상태의 권장 사항에 대한 총 예상 절감액이 표시됩니다.

### 상태별 절감액 추적 {#track-savings-by-status}

각 상태 탭에는 해당 상태의 권장 사항에 대한 총 예상 절감액이 표시됩니다.

- {{< ui >}}Open{{< /ui >}}: 아직 분류되지 않은 권장 사항의 잠재 절감액.
- {{< ui >}}In Progress{{< /ui >}}: 작업이 진행 중인 권장 사항의 예상 절감액.
- {{< ui >}}Completed{{< /ui >}}: 권장 액션이 취해진 권장 사항의 실현 절감액.
- {{< ui >}}Dismissed{{< /ui >}}: 해제된 권장 사항의 예상 절감액.

### 권장 사항 상태 변경 {#change-a-recommendation-status}

다음 세 가지 방법으로 권장 사항 상태를 변경할 수 있습니다.

- **대량 업데이트**: {{< ui >}}Active Recommendations{{< /ui >}} 목록에서 하나 이상의 권장 사항을 선택한 후 표 위의 도구 모음에서 상태를 선택하여 선택한 모든 권장 사항에 적용합니다.
- **표에서 변경**: {{< ui >}}Status{{< /ui >}} 열의 상태 드롭다운을 사용하여 권장 사항 목록에서 직접 새 상태를 선택합니다.
- **사이드 패널에서 변경**: 권장 사항을 클릭하여 사이드 패널을 연 후 상태 드롭다운을 사용하여 새 상태를 선택합니다.

## 권장 사항 액션 수행 {#recommendation-action-taking}
비용을 절감하고 최적화하기 위해 권장 사항에 대해 조치를 수행할 수 있습니다. Cloud Cost Recommendation은 Jira, 원클릭 Workflow Automation 및 Datadog Case Management를 지원합니다. 미사용 EBS 및 GP2 EBS 볼륨 권장 사항은 원클릭 Workflow Automation도 지원합니다. 각 액션 수행 옵션에 대한 자세한 내용은 다음과 같습니다.

- **Jira**: 권장 사항 사이드 패널에서 직접 Jira 이슈를 생성하거나 {{< ui >}}Active Recommendations{{< /ui >}} 목록에서 여러 권장 사항을 선택한 후 {{< ui >}}Create Jira issue{{< /ui >}}을 클릭하여 Jira 이슈를 생성할 수 있습니다. 생성된 이슈에는 태그가 지정되며 Datadog의 권장 사항으로 다시 연결됩니다.

  Jira 상태별로 권장 사항을 필터링하려면 다음 쿼리 옵션을 사용합니다.
  - `@jira_issues.issue_key:*` - Jira 이슈가 있는 권장 사항만 표시
  - `-@jira_issues.issue_key:*` - Jira 이슈가 없는 권장 사항만 표시
  - `jira_issues.issue_key:ABC*` - 특정 Jira 프로젝트 접두사로 필터링

- **[Bits Code][14] 코드 수정**: 해당하는 S3 및 DynamoDB 권장 사항과 Kubernetes Deployment 축소 권장 사항에 대해 코드 수정 기능을 사용할 수 있습니다. 이 경우 Bits Code는 Terraform 또는 Helm 차트에서 클라우드 리소스 변경 및 비용 최적화를 구현하기 위한 프로덕션 준비 완료 Pull Request를 생성합니다. 이 기능을 사용하려면 [Bits Code를 설정][13]합니다.
- **원클릭 Workflow Automation 액션**: 제한된 권장 사항 집합에 대해 액션을 사용할 수 있으며, 사용자는 {{< ui >}}Delete EBS Volume{{< /ui >}}를 클릭하는 것과 같은 권장 액션을 Cloud Cost Management 내에서 직접 실행할 수 있습니다.
- **[비용 최적화 자동화][15]**: 반복 일정에 따라 권장 사항에 지속적으로 조치를 수행하는 자동화를 설정합니다. 자동화는 특정 계정, 리전 및 태그 범위에 적용되며, 사전 액션 스냅샷과 Slack 또는 Microsoft Teams를 통한 선택적 인적 승인 등의 안전 장치를 포함합니다.
- **Datadog Case Management**: 사용자는 권장 사항 사이드 패널로 이동하여 {{< ui >}}Create Case{{< /ui >}}를 클릭함으로써 권장 사항을 관리하고 액션을 수행하기 위한 케이스를 생성할 수 있습니다.
- **해제**: 권장 사항 사이드 패널에서 {{< ui >}}Dismiss{{< /ui >}}를 사용하여 선택한 기간 동안 권장 사항을 숨기고 사유를 제공할 수 있습니다. 해제된 권장 사항은 {{< ui >}}Dismissed{{< /ui >}} 탭으로 이동합니다.

## 권장 사항 및 리소스 설명 {#recommendation-and-resource-descriptions}

{{< multifilter-search >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/recommendations
[2]: /ko/cloud_cost_management/setup/aws/#setup
[3]: /ko/integrations/amazon_web_services/#resource-collection
[4]: https://app.datadoghq.com/integrations/aws
[5]: /ko/agent/
[6]: /ko/cloud_cost_management/container_cost_allocation/?tab=aws#cost-metrics
[7]: /ko/integrations/amazon_s3_storage_lens/
[8]: https://app.datadoghq.com/integrations/azure
[9]: /ko/integrations/azure/
[10]: https://app.datadoghq.com/integrations/gcp
[11]: /ko/cloud_cost_management/allocation/tag_pipelines/
[12]: /ko/cloud_cost_management/tags/#how-tags-are-normalized
[13]: /ko/bits_ai/bits_ai_dev_agent/setup
[14]: /ko/bits_ai/bits_ai_dev_agent/
[15]: /ko/cloud_cost_management/recommendations/cost_optimization_automation/