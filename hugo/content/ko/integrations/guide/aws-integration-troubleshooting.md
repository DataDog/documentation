---
description: Datadog AWS 통합 문제 해결 단계
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: 통합
  text: AWS 통합
title: AWS 통합 문제 해결
---
## 개요 {#overview}

이 가이드를 활용하여 Datadog [AWS 통합][1] 관련 문제를 해결할 수 있습니다.

## IAM 권한 오류 {#iam-permission-errors}

<div class="alert alert-info">
IAM 변경 사항이 AWS 전체에 전파되는 데 몇 분 정도 걸릴 수 있습니다. IAM 역할, 정책 또는 신뢰 관계를 수정한 후에는 통합을 다시 검증하기 전에 최소 5분 동안 기다리세요. 변경 사항이 전파된 이후에도 최대 몇 시간 동안 Datadog UI에 이전 권한 오류가 계속 표시될 수 있습니다.
</div>

### Datadog에 sts:AssumeRole을 수행할 권한이 없음 {#datadog-is-not-authorized-to-perform-stsassumerole}

`sts:Assumerole` 권한 오류는 `DatadogAWSIntegrationRole`과 관련된 신뢰 정책에 문제가 있음을 나타냅니다. 이 문제를 해결하는 방법은 [오류: Datadog에 sts:AssumeRole을 수행할 권한이 없음][2] 설명서를 참조하세요.

**참고**: 변경 사항이 전파되는 동안 이 오류가 Datadog UI에 몇 시간 동안 계속해서 표시될 수 있습니다.

### 모든 AWS 권한 문제 해결 {#resolve-all-aws-permissions-issues}

AWS 통합 페이지에서 **Resolve all AWS permissions issues** 버튼을 사용하면 CloudFormation QuickStart 스택을 통해 Datadog 통합 IAM 역할을 업데이트하고 누락된 권한 문제를 해결할 수 있습니다. 
**Issues** 아래에서 **Resolve All AWS Permissions Issues**를 클릭합니다. 그러면 Datadog의 퍼블릭 API [엔드포인트][13]를 호출하여 통합에 필요한 최신 IAM 권한을 가져오고, 해당 권한이 포함된 새 IAM 정책을 생성한 다음, 이를 통합 역할에 연결하는 CloudFormation 스택을 실행합니다. 또한 `SecurityAudit` 관리형 AWS 정책이 없으면 해당 정책을 연결합니다.

생성된 정책은 `datadog-aws-integration-iam-permissions-` 접두사를 사용하여 이름이 지정되며, 사용자가 구성한 기존 정책과 충돌하지 않도록 고유한 해시가 뒤에 붙습니다. Datadog의 퍼블릭 [cloudformation-template 리포지토리][14]에서 CloudFormation 템플릿을 확인할 수 있습니다.

<div class="alert alert-danger">
<strong>Resolve All AWS Permissions Issues</strong>를 클릭할 경우:<br>
  - 역할과 관련된 손상된 인증 문제(역할 이름, 외부 ID 또는 신뢰 정책 구성으로 인해 Datadog이 AWS 계정으로 인증할 수 없는 경우)는 해결되지 않습니다.<br>
  - 필수 권한을 명시적으로 거부하는 SCP(서비스 제어 정책)이 적용된 경우는 해결되지 않습니다.<br>
  - Datadog 통합 IAM 역할에 연결하는 정책에는 영향을 주지 않습니다.<br>
  - 여러 번 클릭하면 해당 접두사로 생성된 이전 정책은 새 정책이 생성되기 전에 삭제됩니다.
</div>

## 데이터 불일치 {#data-discrepancies}

### CloudWatch와 Datadog의 데이터 불일치 {#discrepancy-between-your-data-in-cloudwatch-and-datadog}

아래 섹션에서는 주의해야 할 세 가지 중요한 차이점과 [불일치를 조정하는](#reconcile-the-discrepancy) 단계를 설명합니다.

#### 1. 시간 집계 {#1-time-aggregation}

Datadog은 AWS에서 선택한 시간 범위와 관계없이 AWS의 원시 데이터를 초당 값으로 표시합니다. 이것이 Datadog의 값이 더 작아 보일 수 있는 이유입니다. 자세한 내용은 메트릭 설명서의 [시간 집계][20]를 참조하세요.

#### 2. 공간 집계 {#2-space-aggregation}

공간 애그리게이터인 `min`, `max`, `avg`는 AWS와 Datadog에서 서로 다른 의미로 사용됩니다. AWS에서 평균 지연 시간, 최소 지연 시간, 최대 지연 시간은 AWS가 수집하는 3가지 별도의 메트릭입니다. Datadog이 AWS CloudWatch에서 메트릭을 폴링할 때, 평균 지연 시간은 ELB(Elastic Load Balancer)당 단일 시계열로 수신됩니다.

Datadog 내에서 `min`, `max` 또는 `avg`를 선택할 경우, 여러 시계열이 통합되는 방식을 제어하게 됩니다. 예를 들어, 필터 없이 `system.cpu.idle`을 요청하면 해당 메트릭을 보고하는 각 호스트에 대해 하나의 시계열이 반환되며, 그래프로 표시하려면 이러한 시계열을 결합해야 합니다. 대신 단일 호스트에서 `system.cpu.idle` 메트릭을 요청하는 경우 집계가 필요하지 않으며 평균과 최댓값 사이를 전환해도 동일한 결과가 나옵니다.

자세한 내용은 메트릭 설명서의 [공간 집계][21]를 참조하세요.

#### 3. 차원별 메트릭 {#3-per-dimension-metrics}

일부 AWS CloudWatch 메트릭은 차원 조합당 한 번씩 전송되므로 Datadog에서 집계할 때 값이 부풀려져 보일 수 있습니다. 예를 들어, Classic ELB 메트릭 `aws.elb.healthy_host_count`는 각 가용 영역에 대해 별도로 보고됩니다. 영역 간 로드 밸런싱이 활성화된 경우 모든 가용 영역에서 이 메트릭을 합산하면 실제 정상 호스트 수보다 큰 총계가 산출됩니다. 자세한 내용은 [aws.elb.healthy_host_count의 잘못된 계산](#wrong-count-of-awselbhealthy_host_count)을 참조하세요.

집계가 부풀려지는 것을 방지하려면 가능한 경우 `_deduped` 메트릭 변형을 사용하거나 단일 가용 영역과 같은 특정 차원 값으로 쿼리 범위를 지정합니다. `_deduped` 변형을 지원하는 로드 밸런서 유형의 전체 목록은 [ELB 통합 페이지][27]를 참조하세요.

#### 불일치 조정 {#reconcile-the-discrepancy}

1. **CloudWatch**로 이동한 다음 **All metrics**로 이동합니다.
2. 메트릭을 검색하고 그래프로 표시합니다. 
3. **Source** 탭을 선택하여 전체 메트릭 쿼리를 표시합니다.

{{< img src="integrations/guide/aws_integration_troubleshooting/cloudwatch-metric-explorer.png" alt="Source 탭 아래에 메트릭 쿼리가 표시되어 있는 CloudWatch의 All metrics 페이지. 그래프의 한 지점 위에 커서가 올려져 있어 메트릭 값과 타임스탬프가 표시되어 있습니다." responsive="true" style="width:90%;" >}}

4. CloudWatch의 쿼리 범위가 Datadog의 쿼리 범위와 동일한지 확인합니다.
   - CloudWatch 메트릭 쿼리에 사용된 모든 [Dimensions][17]은 Datadog 메트릭 쿼리에 사용된 태그와 일치해야 합니다.
   - Datadog은 1분 단위로 메트릭을 쿼리하므로, CloudWatch 메트릭 쿼리의 **Period**도 1분 정밀도로 설정해야 합니다.
   - 리전
   - 메트릭 네임스페이스 및 이름
5. 그래프의 데이터 포인트 위로 마우스를 가져가 타임스탬프와 값을 표시합니다.
6. Datadog 그래프에서 동일한 시점을 찾아 값을 비교합니다. 값이 동일하다면, 원래의 불일치는 두 그래프 간의 시간 또는 공간 집계의 차이 때문입니다.

## 메트릭 {#metrics}

### 메트릭 지연 {#metrics-delayed}

AWS 통합을 사용하는 경우 Datadog은 CloudWatch API를 통해 메트릭을 가져옵니다. AWS API에 존재하는 몇 가지 제약 조건으로 인해 AWS에서 가져오는 메트릭에 지연이 발생할 수 있습니다.

CloudWatch API는 데이터를 가져오기 위해 메트릭별 크롤링만 제공합니다. CloudWatch API에는 인증 정보, 리전 및 서비스의 조합에 따라 달라지는 요청 속도 제한이 있습니다. AWS는 계정 수준에 따라 메트릭을 제공합니다 예를 들어, AWS에서 '상세 메트릭'을 유료로 이용하는 경우 해당 메트릭을 더 자주 사용할 수 있습니다. 상세 메트릭의 이러한 서비스 수준은 데이터의 세분성에도 적용되며, 일부 메트릭은 1분 단위로, 다른 메트릭은 5분 단위로 제공됩니다.

메트릭 지연을 방지하려면 호스트에 Datadog Agent를 설치하세요. 시작하려면 [Datadog Agent 설명서][3]를 참조하세요. Datadog은 상황에 따라 계정 내 특정 메트릭의 우선순위를 지정하여 더 빠르게 가져올 수 있습니다. 자세한 내용은 [Datadog 지원팀][4]에 문의하세요.

### 예상 메트릭 지연 {#expected-metric-delays}

AWS에서 메트릭이 생성된 시점과 Datadog에 나타나는 시점 사이의 지연 시간은 수집 방법에 따라 다릅니다.

| 수집 방법 | 일반적인 지연 시간 | 참고 사항 |
|---|---|---|
| API 폴링(기본값) | 약 10분 | CloudWatch API 속도 제한 및 계정 크기로 인해 지연이 증가할 수 있습니다. |
| [CloudWatch Metric Streams][23] | 2~3분 | Amazon Data Firehose를 통한 별도의 설정이 필요합니다. |
| [Datadog Agent][3] | 실시간 | CloudWatch 없이 호스트 수준 메트릭을 직접 수집합니다. |

수집 방법으로 인한 지연 외에도 일부 AWS 서비스는 CloudWatch 측에서 자체적인 지연 시간을 발생시킵니다.

- **S3 Storage Lens** 메트릭은 지속적으로 게시되지 않고 일 단위로 게시됩니다.
- **AWS 결제 메트릭**은 몇 시간 지연되며 드물게 업데이트됩니다.
EC2에 대한 - **상세 모니터링**은 기본 5분 단위 대신 1분 단위 메트릭을 제공하지만, AWS에서 인스턴스별로 활성화해야 합니다.

**참고**: Datadog은 과거 메트릭 데이터를 백필하지 않습니다. 자세한 내용은 [설정 후 예상되는 사항][25]을 참조하세요.

### 누락 메트릭 {#missing-metrics}

Datadog에서 예상한 AWS 메트릭이 보이지 않으면 다음 체크리스트를 확인하세요.

1. **IAM 권한을 확인합니다.** `DatadogAWSIntegrationRole`에 해당 AWS 서비스에 필요한 권한이 포함되어 있는지 확인합니다. 일부 서비스는 핵심 통합 정책 외에 서비스별 권한이 필요합니다. 서비스별 권한 요구 사항은 개별 [AWS 통합 페이지][15]를 참조하세요.
2. **AWS 리전이 활성화되어 있는지 확인합니다.** [AWS 통합 페이지][16]에서 리소스가 배포된 리전이 **General** 탭에서 선택되어 있는지 확인하세요. 메트릭은 활성화된 리전에서만 수집됩니다.
3. **서비스가 CloudWatch로 메트릭을 내보내고 있는지 확인합니다.** AWS에서 CloudWatch 콘솔을 열고 예상 메트릭이 존재하는지 확인합니다. CloudWatch API는 데이터 포인트가 있는 메트릭만 반환하므로, 리소스가 유휴 상태이거나 연결된 구성 요소가 없는 경우(예: 인스턴스가 연결되지 않은 ELB) CloudWatch는 해당 리소스에 대한 메트릭을 보고하지 않을 수 있습니다.
4. **서비스에 추가 활성화가 필요한지 확인합니다.** 일부 AWS 서비스는 기본적으로 CloudWatch에 메트릭을 내보내지 않으므로 AWS 콘솔에서 추가 구성이 필요합니다. 전체 목록은 [핵심 통합 외에 추가 설정이 필요한 AWS 서비스는 무엇인가요?][26]를 참조하세요.
5. **폴링 간격이 지날 때까지 기다립니다.** 추가 조사를 수행하기 전에 최소 1번의 수집 주기가 완료될 때까지 기다립니다. 수집 방법별 타이밍은 [예상 메트릭 지연](#expected-metric-delays)을 참조하세요.
6. **SCP(서비스 제어 정책)를 확인합니다.** 계정이 AWS Organization의 일부인 경우, 조직 또는 OU(조직 단위) 수준에서 적용된 SCP가 IAM 권한을 재정의하고 API 호출을 차단할 수 있습니다. 필요한 권한을 거부하는 SCP가 없는지 확인하세요.
7. **권한 경계를 확인합니다.** [권한 경계][30]는 역할에 지정할 수 있는 최대 권한을 설정합니다. 경계에 Datadog 통합에 필요한 작업이 포함되어 있지 않으면, 통합 역할 정책이 해당 작업을 허용하는 것처럼 보이더라도 AWS는 해당 작업에 대해 `AccessDenied`를 반환합니다. AWS IAM 콘솔에서 통합 역할을 열고 **Permissions boundary** 탭에서 권한 경계가 연결되어 있는지 확인합니다.

### aws.elb.healthy_host_count의 잘못된 집계값 {#wrong-count-of-awselbhealthy-host-count}

ELB에서 교차 영역 로드 밸런싱 옵션이 활성화되면 이 ELB에 연결된 모든 인스턴스는 (CloudWatch 측에서) 모든 가용 영역의 일부로 간주됩니다. 예를 들어, `1a`에 인스턴스 2개가 있고 `1b`에 인스턴스 3개가 있는 경우 메트릭은 가용 영역당 5개의 인스턴스를 표시합니다.
이는 직관적이지 않을 수 있으므로, **aws.elb.healthy_host_count_deduped** 및 **aws.elb.un_healthy_host_count_deduped** 메트릭은 이 교차 영역 로드 밸런싱 옵션의 활성화 여부와 관계없이 가용 영역당 정상 및 비정상 인스턴스 수를 표시합니다.

## 리전 {#regions}

### 리전 동작 {#region-behavior}

Datadog은 [AWS 통합 페이지][16]에서 선택한 AWS 리전에서만 메트릭을 수집합니다. 특정 서비스에 대한 데이터가 보이지 않으면 해당 리소스가 배포된 리전이 활성화되어 있는지 확인하세요.

#### 고려 사항 {#considerations}

- **글로벌 서비스**: 일부 AWS 서비스(IAM, CloudFront, Route 53 등)는 글로벌 서비스이며 특정 리전에 종속되지 않습니다. 이러한 서비스의 메트릭은 일반적으로 Datadog의 리전 구성과 관계없이 `us-east-1` 아래에 나타납니다.
- **리전 서비스**: 대부분의 AWS 서비스는 리전별로 제공됩니다. Datadog은 통합 타일에서 명시적으로 활성화된 리전에 대해서만 메트릭을 수집합니다.
- **옵트인 리전**: AWS 옵트인 리전(예: `af-south-1`, `ap-east-1`, `me-south-1`)은 [AWS 계정 설정][22]과 Datadog 통합 타일 모두에서 활성화되어야 합니다. AWS 측에서 리전이 활성화되지 않은 경우 Datadog은 해당 리전에서 데이터를 수집할 수 없습니다.
- **새 리전**: 최근에 출시된 AWS 리전은 크롤링되지만 Datadog 통합 UI나 Terraform 공급자에게 즉시 나타나지 않을 수 있습니다. 지원되는 리전의 최신 목록은 [AWS 통합 페이지][16]에서 확인하세요.

## Datadog UI {#datadog-ui}

### Agent 설치 시 중복되는 호스트 {#duplicated-hosts-when-installing-the-agent}

AWS 호스트에 Agent를 설치할 때 Agent 구성에서 호스트 이름을 수동으로 설정하면 몇 시간 동안 Datadog 인프라 페이지에 호스트가 중복되어 나타날 수 있습니다. 중복된 호스트는 몇 시간 후에 사라지며 청구에는 영향을 미치지 않습니다.

## Datadog Agent {#datadog-agent}

### IMDS v2를 사용하는 EC2 메타데이터 {#ec2-metadata-with-imds-v2}

컨테이너화된 환경에서는 Kubernetes 클러스터에서 실행 중인 포드에 IAM 역할/자격 증명을 할당하는 방식으로 EC2 메타데이터 엔드포인트를 잠가 두었기 때문에 문제가 발생할 수 있습니다. `Kube2IAM` 및 `kiam`은 이를 수행하는 데 일반적으로 사용되는 도구입니다. 이 문제를 해결하려면 `Kube2IAM` 또는 `kiam` 구성을 업데이트하여 이 엔드포인트에 대한 접근을 허용하세요.

IMDSv2는 기본 구성에서 IP 홉 수가 1보다 큰 연결, 즉 IP 게이트웨이를 통과한 연결을 거부합니다. 런타임이 컨테이너의 트래픽을 가상 IP 게이트웨이를 통해 전달하므로 Agent가 호스트 네트워크가 아닌 다른 네트워크의 컨테이너에서 실행 중일 때 문제가 발생할 수 있습니다. 이는 ECS 배포에서 흔히 발생합니다. 이 문제는 다음 옵션으로 해결할 수 있습니다.

 * [최대 홉 수를 `2` 이상으로 늘리기][8]. 이렇게 하면 Agent 이외의 컨테이너도 IMDS에 저장된 데이터에 접근할 수 있게 되므로 IMDS에 저장된 데이터의 보안에 영향을 줄 수 있습니다.
 * cloud-init에서 발견한 호스트 이름을 사용하세요.
     * Helm을 사용하여 [`providers.eks.ec2.useHostnameFromFile`을 `true`로 설정[9]하세요.
     * Datadog Operator 버전 1.29.0 이상에서는 `DatadogAgent` 또는 영향을 받는 노드를 대상으로 하는 [DatadogAgentProfile][31]에서 `agent.datadoghq.com/cluster-provider` 주석을 `eks-ec2-use-hostname-from-file` 값으로 설정하세요. [공급자 문서][32]를 참조하세요.
 * [`agents.useHostNetwork`를 true로 설정][10]하여 호스트 UTS 네임스페이스에서 Agent를 실행합니다.

### IMDS를 사용하는 EC2 호스트 이름 {#ec2-hostname-with-imds}

#### 7.64.0 이전의 Agent 버전 {#agent-versions-before-7640}

일부 상황에서는 EC2 [IMDSv2][5] 구성으로 인해 Agent가 필요한 메타데이터에 액세스하지 못할 수 있습니다. 이로 인해 `agent status`의 출력에서 볼 수 있듯이 Agent가 `aws` 대신 `os` 호스트 이름 공급자를 사용하게 될 수 있습니다.

AWS API는 Agent가 기본적으로 사용하는 IMDSv1 비활성화를 지원합니다. 이 경우 IMDSv2가 활성화되어 있고 접근 가능한 상태라면 [Agent 구성][6]에서 `ec2_prefer_imdsv2` 파라미터의 값을 `true`로 설정합니다(기본값: `false`). 자세한 내용은 [인스턴스 메타데이터 서비스 버전 2 사용으로 전환][7] 설명서를 참조하세요.

최신 버전의 Agent는 기본적으로 IMDSv2를 사용하므로 Datadog Agent 7.64.0 이상으로 업그레이드하면 이러한 문제가 해결될 것입니다.

#### Agent 버전 7.64.0 이상 {#agent-version-7640-and-after}

v7.64.0부터 Datadog Agent는 기본적으로 IMDSv2를 사용하며, 실패하면 IMDSv1을 대신 사용합니다. 이전 동작으로 되돌리려면 호스트 구성에서 `ec2_imdsv2_transition_payload_enabled`를 `false`로 설정하세요.
자세한 내용은 [인스턴스 메타데이터 서비스 버전 2 사용으로 전환][7] 설명서를 참조하세요.

## 태그 {#tags}

### 태그 수집 및 전파 지연 {#tag-collection-and-propagation-delays}

AWS 태그는 통합의 크롤링 주기 동안 수집됩니다. AWS 서비스 및 계정의 리소스 볼륨에 따라 다르지만, AWS에서 태그를 지정한 후 태그가 전파되기까지 15분에서 몇 시간이 소요될 수 있습니다.

최근 AWS에서 태그를 추가하거나 변경했는데 Datadog에 반영되지 않는 경우:
1. 최소 한 번의 전체 크롤링 주기를 기다립니다(API 폴링의 경우 약 10분).
2. `DatadogAWSIntegrationRole`에 필요한 태그 관련 권한이 있는지 확인합니다(예: `tag:GetResources`).
3. 리소스 유형이 태그 수집을 지원하는지 확인합니다. Datadog은 [AWS Resource Groups Tagging API][28]를 통해 태그를 수집합니다. AWS 설명서에서 [지원되는 리소스 유형][29]을 참조하여 해당 리소스 유형이 지원되는지 확인하세요.

### Amazon EC2 통합을 제거한 후에도 호스트에 AWS 태그가 남아 있음 {#hosts-still-have-aws-tags-after-removing-the-amazon-ec2-integration}

AWS 통합을 사용하여 CloudWatch에서 데이터를 수집하거나 각 EC2 인스턴스에 Datadog Agent를 직접 설치하여 데이터와 태그를 가져올 수 있습니다. 이 두 가지 방법을 모두 사용하여 데이터를 수집하도록 선택한 경우, Datadog 백엔드는 통합과 Datadog Agent에서 수집된 데이터를 단일 호스트 객체로 병합합니다.

AWS 통합을 제거했더라도 EC2 인스턴스에서 Datadog Agent를 계속 실행하면, Datadog 계정의 호스트에는 AWS에서 수집되었고 AWS 통합과 연관된 이전 호스트 태그가 계속 연결되어 있습니다. 이는 의도된 동작이며, AWS 통합이나 Amazon EC2 통합이 여전히 활성화되어 있음을 의미하지는 않습니다.

인프라 목록에서 해당 호스트의 'Apps Running'을 확인하거나 Metrics Catalog를 확인하고 해당 호스트로 범위가 지정된 노트북을 생성하여 통합이 활성화되었는지 확인할 수 있습니다.

기본적으로 호스트 수준 태그는 AWS 호스트에 영구적으로 연결된 상태로 유지됩니다. 호스트에서 AWS 호스트 태그를 영구적으로 제거하려면 다음 방법을 사용할 수 있습니다.
   - [호스트 태그 제거 API 엔드포인트][11]를 사용하여 단일 호스트에 대해 사용자가 지정한 모든 태그를 제거합니다.
   - [remove_lingering_aws_host_tags.py 도구][12]를 사용하여 호스트 목록 또는 모든 호스트에서 사용자가 할당한 모든 태그를 제거합니다.

[1]: /ko/integrations/amazon_web_services/
[2]: /ko/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[3]: /ko/agent/
[4]: /ko/help/
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[6]: /ko/agent/configuration/agent-configuration-files/
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-transition-to-version-2
[8]: https://docs.aws.amazon.com/cli/latest/reference/ec2/modify-instance-metadata-options.html
[9]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L1683-L1688
[10]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L930-L937
[11]: /ko/api/latest/tags/#remove-host-tags
[12]: https://github.com/DataDog/Miscellany/blob/master/remove_lingering_aws_host_tags.py
[13]: https://api.datadoghq.com/api/v2/integration/aws/iam_permissions
[14]: https://github.com/DataDog/cloudformation-template/tree/master/aws_attach_integration_permissions
[15]: /ko/integrations/#cat-aws
[16]: https://app.datadoghq.com/integrations/amazon-web-services
[17]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Dimension
[18]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.Enabling.html
[19]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[20]: /ko/metrics/#time-aggregation
[21]: /ko/metrics/#space-aggregation
[22]: https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html
[23]: /ko/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[24]: /ko/integrations/guide/monitor-your-aws-billing-details/
[25]: /ko/getting_started/integrations/aws/#what-to-expect-after-setup
[26]: /ko/integrations/guide/aws-integration-and-cloudwatch-faq/#which-aws-services-require-additional-setup-beyond-the-core-integration
[27]: /ko/integrations/amazon_elb/
[28]: https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/overview.html
[29]: https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/supported-services.html
[30]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html
[31]: /ko/containers/datadog_operator/datadog_agent_profiles
[32]: /ko/containers/datadog_operator/providers