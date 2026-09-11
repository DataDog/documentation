---
aliases:
- /ko/cloudprem/configure/aws_config/
description: AWS EKS에 CloudPrem 설치 및 구성 방법
further_reading:
- link: /cloudprem/configure/ingress/
  tag: 설명서
  text: CloudPrem Ingress 구성하기
- link: /cloudprem/ingest/
  tag: 설명서
  text: 로그 수집 구성
title: AWS EKS에 CloudPrem 설치하기
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

이 문서에서는 AWS 환경을 구성하고 AWS EKS에 CloudPrem을 설치하는 과정을 다룹니다.

## 사전 필수 조건

AWS에 CloudPrem을 배포하려면 다음을 구성해야 합니다.
- AWS 자격 증명 및 인증
- AWS 리전 선택
- S3 객체 스토리지에 대한 IAM 권한
- RDS PostgreSQL 데이터베이스(권장)
- AWS Load Balancer Controller를 포함한 EKS 클러스터

### AWS 자격 증명

노드를 시작할 때 CloudPrem은 [rusoto_core::ChainProvider][2]에서 구현한 자격 증명 공급자 체인을 사용하여 AWS 자격 증명을 찾으려고 하며 다음 순서로 진행합니다.

1. 환경 변수 `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`(선택 사항).
2. 자격 증명 프로필 파일은 일반적으로 `~/.aws/credentials`에 위치합니다. 또는 설정되고 비어 있지 않은 경우 `AWS_SHARED_CREDENTIALS_FILE` 및 `AWS_PROFILE` 환경 변수에 지정됩니다.
3. `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI`가 설정되어 있으면 Amazon ECS 컨테이너에서 로드된 Amazon ECS 컨테이너 자격 증명입니다.
4. Amazon EC2 인스턴스에서 사용되는 인스턴스 프로필 자격 증명은 Amazon EC2 메타데이터 서비스를 통해 제공됩니다.

인증 체인에서 자격 증명을 찾을 수 없는 경우 오류가 반환됩니다.

### AWS 리전

CloudPrem은 다음 우선순위에 따라 여러 소스에서 AWS 리전을 찾으려고 시도합니다.

1. **환경 변수**: `AWS_REGION`을 먼저 확인한 후 `AWS_DEFAULT_REGION`.
2. **AWS 구성 파일**: 일반적으로 `~/.aws/config`에 있으며, 설정되어 있고 비어있지 않은 경우`AWS_CONFIG_FILE` 환경 변수가 지정한 경로.
3. **EC2 인스턴스 메타데이터**: 현재 실행 중인 Amazon EC2 인스턴스의 리전 사용.
4. **기본값**: 다른 소스에서 리전을 제공하지 않으면 `us-east-1`로 대체.

### S3용 IAM 권한

필수 승인 조치:

* `ListBucket`(버킷에 직접)
* `GetObject`
* `PutObject`
* `DeleteObject`
* `ListMultipartUploadParts`
* `AbortMultipartUpload`

다음은 버킷 정책의 예입니다.

```json
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Effect": "Allow",
     "Action": [
       "s3:ListBucket"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket"
     ]
   },
   {
     "Effect": "Allow",
     "Action": [
       "s3:GetObject",
       "s3:PutObject",
       "s3:DeleteObject",
       "s3:ListMultipartUploadParts",
       "s3:AbortMultipartUpload"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket/*"
     ]
   }
 ]
}
```

### RDS 데이터 베이스 생성

다음 명령어를 사용하여 마이크로 RDS 인스턴스를 생성할 수 있습니다. 프로덕션 환경에서는 여러 Availability Zones (multi-AZ)에 걸쳐 배포되는 소규모 인스턴스면 충분합니다.

```shell
# 테스트 목적으로 사용하는 마이크로 RDS 인스턴스이며, 약 5분 정도 소요됩니다.
aws rds create-db-instance --db-instance-identifier cloudprem-postgres --db-instance-class db.t3.micro --engine postgres --engine-version 16.3 --master-username cloudprem --master-user-password 'FixMeCloudPrem' --allocated-storage 20 --storage-type gp2 --db-subnet-group-name <VPC-ID> --vpc-security-group-ids <VPC-SECURITY-GROUP-ID> --db-name cloudprem --backup-retention-period 0 --no-multi-az
```

다음 셸 명령을 실행하여 RDS 정보를 검색할 수 있습니다.

```shell
# RDS 인스턴스 세부 정보를 가져옵니다.
RDS_INFO=$(aws rds describe-db-instances --db-instance-identifier cloudprem-demo-postgres --query 'DBInstances[0].{Status:DBInstanceStatus,Endpoint:Endpoint.Address,Port:Endpoint.Port,Database:DBName}' --output json 2>/dev/null)

STATUS=$(echo $RDS_INFO | jq -r '.Status')
ENDPOINT=$(echo $RDS_INFO | jq -r '.Endpoint')
PORT=$(echo $RDS_INFO | jq -r '.Port')
DATABASE=$(echo $RDS_INFO | jq -r '.Database')

echo ""
echo "🔗 Full URI:"
echo "postgres://cloudprem:FixMeCloudPrem@$ENDPOINT:$PORT/$DATABASE"
echo ""
```

## 설치 단계

1. [CloudPrem Helm 차트를 설치합니다](#install-the-cloudprem-helm-chart)
2. [설치를 인증합니다](#verification)

## CloudPrem Helm 차트 설치

1. Datadog Helm 스토리지를 추가하고 업데이트합니다.
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. 차트용 Kubernetes 네임스페이스를 생성합니다.
   ```shell
   kubectl create namespace <NAMESPACE_NAME>
   ```

   예를 들어, `cloudprem` 네임스페이스를 생성하는 방법은 다음과 같습니다.
   ```shell
   kubectl create namespace cloudprem
   ```

   **참고**: 현재 컨텍스트에 관한 기본 네임스페이스를 설정하면 모든 명령마다 `-n <NAMESPACE_NAME>`을 입력하는 번거로움을 피할 수 있습니다.
   ```shell
   kubectl config set-context --current --namespace=cloudprem
   ```

1. Datadog API 키를 Kubernetes 시크릿으로 저장합니다.

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

1. PostgreSQL 데이터베이스 연결 문자열을 Kubernetes 시크릿으로 저장합니다.
   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI="postgres://<USERNAME>:<PASSWORD>@<ENDPOINT>:<PORT>/<DATABASE>"
   ```

1. Helm 차트를 커스터마이징합니다.

   `datadog-values.yaml` 파일을 생성하여 기본값을 사용자 지정 구성으로 재정의하세요. 이 파일에서 이미지 태그, AWS 계정 ID, 서비스 계정, 수신 설정, 리소스 요청 및 제한 등 환경별 설정을 정의할 수 있습니다.

   명시적으로 `datadog-values.yaml`에 재정의되지 않은 모든 파라미터는 차트 `values.yaml`에 정의된 기본값으로 되돌아갑니다.

   ```shell
   # Show default values
   helm show values datadog/cloudprem
   ```

   다음은 그러한 재정의가 포함된 `datadog-values.yaml` 파일의 예입니다.

   ```yaml
   aws:
     accountId: "123456789012"

   # Environment variables
   # Any environment variables defined here are available to all pods in the deployment
   environment:
     AWS_REGION: us-east-1

   # Datadog configuration
   datadog:
      # The Datadog [site](https://docs.datadoghq.com/getting_started/site/) to connect to. Defaults to `datadoghq.com`.
      # site: datadoghq.com
      # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
      apiKeyExistingSecret: datadog-secret

   # Service account configuration
   # If `serviceAccount.create` is set to `true`, a service account is created with the specified name.
   # The service account will be annotated with the IAM role ARN if `aws.accountId` and serviceAccount.eksRoleName` are set.
   # Additional annotations can be added using serviceAccount.extraAnnotations.
   serviceAccount:
     create: true
     name: cloudprem
     # The name of the IAM role to use for the service account. If set, the following annotations will be added to the service account:
     # - eks.amazonaws.com/role-arn: arn:aws:iam::<aws.accountId>:role/<serviceAccount.eksRoleName>
     # - eks.amazonaws.com/sts-regional-endpoints: "true"
     eksRoleName: cloudprem
     extraAnnotations: {}

   # CloudPrem node configuration
   config:
     # The root URI where index data is stored. This should be an S3 path.
     # All indexes created in CloudPrem are stored under this location.
     default_index_root_uri: s3://<BUCKET_NAME>/indexes

   # Internal ingress configuration for access within the VPC
   # The ingress provisions an Application Load Balancers (ALBs) in AWS which is created in private subnets.
   #
   # Additional annotations can be added to customize the ALB behavior.
   ingress:
     internal:
       enabled: true
       name: cloudprem-internal
       host: cloudprem.acme.internal
       extraAnnotations:
         alb.ingress.kubernetes.io/load-balancer-name: cloudprem-internal

   # Metastore configuration
   # The metastore is responsible for storing and managing index metadata.
   # It requires a PostgreSQL database connection string to be provided by a Kubernetes secret.
   # The secret should contain a key named `QW_METASTORE_URI` with a value in the format:
   # postgresql://<username>:<password>@<host>:<port>/<database>
   #
   # The metastore connection string is mounted into the pods using extraEnvFrom to reference the secret.
   metastore:
     extraEnvFrom:
       - secretRef:
           name: cloudprem-metastore-uri

   # Indexer configuration
   # The indexer is responsible for processing and indexing incoming data it receives data from various sources (for example, Datadog Agents, log collectors)
   # and transforms it into searchable files called "splits" stored in S3.
   #
   # The indexer is horizontally scalable - you can increase `replicaCount` to handle higher indexing throughput.
   # The `podSize` parameter sets vCPU, memory, and component-specific settings automatically.
   # See the sizing guide for available tiers and their configurations.
   indexer:
     replicaCount: 2
     podSize: xlarge

   # Searcher configuration
   # The searcher is responsible for executing search queries against the indexed data stored in S3.
   # It handles search requests from Datadog's query service and returns matching results.
   #
   # The searcher is horizontally scalable - you can increase `replicaCount` to handle more concurrent searches.
   # Resource requirements for searchers are highly workload-dependent and should be determined empirically.
   # Key factors that impact searcher performance include:
   # - Query complexity (for example, number of terms, use of wildcards or regex)
   # - Query concurrency (number of simultaneous searches)
   # - Amount of data scanned per query
   # - Data access patterns (cache hit rates)
   #
   # Memory is particularly important for searchers as they cache frequently accessed index data in memory.
   searcher:
     replicaCount: 2
     podSize: xlarge
   ```

1. Helm 차트를 설치하거나 업그레이드합니다.

   ```shell
   helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
   -n <NAMESPACE_NAME> \
   -f datadog-values.yaml
   ```

## 확인

### 배포 상태 확인

모든 CloudPrem 구성 요소가 실행 중인지 확인합니다.

```shell
kubectl get pods -n <NAMESPACE_NAME>
kubectl get ingress -n <NAMESPACE_NAME>
kubectl get services -n <NAMESPACE_NAME>
```

## 설치 제거

CloudPrem을 제거하려면 다음 단계를 따르세요.

```shell
helm uninstall <RELEASE_NAME>
```

## 다음 단계

**[Datadog Agent를 사용한 로그 수집 설정][8]** - Datadog Agent가 CloudPrem으로 로그를 전송하도록 구성하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/eks/
[2]: https://docs.rs/rusoto_credential/latest/rusoto_credential/struct.ChainProvider.html
[3]: https://aws.amazon.com/rds/
[8]: /ko/cloudprem/ingest/agent/