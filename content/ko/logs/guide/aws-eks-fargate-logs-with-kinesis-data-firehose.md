---
further_reading:
- link: https://docs.datadoghq.com/logs/log_configuration/processors/
  tag: 설명서
  text: 인덱스
- link: https://docs.aws.amazon.com/eks/latest/userguide/fargate-logging.html
  tag: 설명서
  text: Fargate 로깅
- link: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
  tag: 설명서
  text: AWS Fargate 프로파일
kind: 가이드
title: Kinesis Data Firehose를 사용해 AWS EKS Fargate 로그 전송하기
---

## 개요

EKS 기반 AWS Fargate는 쿠버네티스(Kubernetes) 워크로드 실행을 위한 완전관리형 환경을 제공합니다. Kinesis Data Firehose를 EKS의 Fluent Bit 로그 라우터와 함께 사용하여 Datadog에서 로그를 수집할 수 있습니다. 이 가이드에서는 Kinesis Data Firehose를 통해 전달되는 로그 및 클라우드와치(CloudWatch) 로그를 비교하고 Kinesis Data Firehose를 통해 Datadog에 로그를 전송하는 샘플 EKS Fargate 애플리케이션을 살펴봅니다.

{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_streaming_diagram.png" alt="Fargate EKS 클러스터가 Fluent Bit 로그 라우터를 통해 Kinesis 데이터 Firehose와 AWS 내의 S3 백업 버킷으로 컨테이너 로그를 전송한 후 다시 Datadog으로 전달하는 것을 보여주는 로그 흐름 다이어그램" responsive="true">}}


### Kinesis Data Firehose 및 클라우드와치 로그 전달

다음은 Kinesis Data Firehose 사용과 클라우드와치 로그 전달 사용 간의 주요 차이점입니다.

- **메타데이터 및 태깅**: Kinesis Data Firehose를 사용해 로그를 전송할 때 쿠버네티스(Kubernetes) 네임스페이스 및 컨테이너 ID 등 메타데이터는 구조화된 속성으로 액세스 가능합니다.

- **AWS 비용**: AWS 비용은 개별 사용 사례에 따라 다를 수 있지만 Kinesis Data Firehose 수집은 일반적으로 유사한 클라우드와치 로그 수집보다 저렴합니다.

## 요건
1. 다음 명령줄 도구:  [`kubectl`][6], [`aws`][7].
2. [Fargate 프로필][1] 및 Fargate 포드 실행 역할이 있는 EKS 클러스터입니다. 이 가이드에서는 `fargate-namespace`네임스페이스에 적용된 `fargate-profile` Fargate 프로필을 사용하여 클러스터 이름 `fargate-cluster`을 지정합니다. 이러한 리소스가 아직 없는 경우 [Amazon EKS 시작하기][8]를 사용하여 클러스터를 생성하고 [Amazon EKS를 사용하여 AWS Fargate 시작하기][9]를 사용하여 Fargate 프로필 및 포드 실행 역할을 생성합니다.


## 설정

다음 단계에서는 Fluent Bit 및 Kinesis Data Firehose 전송 스트림을 통해 EKS 클러스터에 배포된 샘플 애플리케이션의 로그를 Datadog으로 전송하는 프로세스를 간략하게 설명합니다. Datadog의 표준 쿠버네티스 태그와의 일관성을 최대화하기 위해 선택한 속성을 태그 키에 다시 매핑하라는 지침이 포함되어 있습니다.

1. 실패한 로그 전달에 대한 S3 백업과 함께 로그를 Datadog에 전달하는 [Kinesis Data Firehose 전달 스트림을 생성](#create-kinesis-delivery-stream)합니다.
2. [EKS Fargate에서 Firehose용 Fluent Bit를 설정합니다](#configure-fluent-bit-for-firehose-on-an-eks-fargate-cluster).
3. [샘플 애플리케이션을 배포합니다](#deploy-a-sample-application).
4. [리매퍼 프로세서 적용](#remap-attributes-for-log-correlation)을 사용하여 쿠버네티스 태그 및 `container_id` 태그를 사용하여 상관관계를 설정합니다.

### Kinesis Delivery Stream 생성

Ki[Datadog Kinesis Firehose 목적지로 AWS 서비스 로그 전송하기][4] 가이드를 참조하여 Kinesis Firehose Delivery 스트림을 설정하세요.
**참고**: 소스**를 `Direct PUT`로 설정합니다.

### EKS Fargate 클러스터 기반 Firehose용 Fluent Bit 설정

1. `aws-observability` 네임스페이스를 생성합니다.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
kubectl create namespace aws-observability
{{< /code-block >}}

2. Fluent Bit에 대해 다음 Kubernetes ConfigMap을 `aws-logging-configmap.yaml`로 생성합니다. 전송 스트림의 이름을 대체합니다.

{{< code-block lang="yaml" filename="" disable_copy="false" collapsible="false" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-logging
  namespace: aws-observability
data:
  filters.conf: |
    [FILTER]
        Name                kubernetes
        Match               kube.*
        Merge_Log           On
        Buffer_Size         0
        Kube_Meta_Cache_TTL 300s

  flb_log_cw: 'true'

  output.conf: |
    [OUTPUT]
        Name kinesis_firehose
        Match kube.*
        region <REGION>
        delivery_stream <YOUR-DELIVERY-STREAM-NAME>
{{< /code-block >}}

3. `kubectl`를 사용해 ConfigMap 매니페스트를 적용합니다.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
kubectl apply -f aws-logging-configmap.yaml
{{< /code-block >}}

4. IAM 정책을 생성하고 이를 포드 실행 역할에 연결하여 AWS Fargate에서 실행되는 로그 라우터가 Kinesis Data Firehose를 작성할 수 있도록 합니다. 아래 예를 사용하여 **리소스** 필드의 ARN을 전송 스트림의 ARN으로 바꾸고 지역 및 계정 ID를 지정할 수 있습니다.

{{< code-block lang="json" filename="allow_kinesis_put_permission.json" disable_copy="false" collapsible="false" >}}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "firehose:PutRecord",
                "firehose:PutRecordBatch"
            ],
            "Resource":
       "arn:aws:firehose:<REGION>:<ACCOUNTID>:deliverystream/<DELIVERY-STREAM-NAME>"
       }
]
}
{{< /code-block >}}

a. 정책을 생성합니다.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
aws iam create-policy \
         --policy-name FluentBitEKSFargate \
         --policy-document file://allow_kinesis_put_permission.json
{{< /code-block >}}

b. Fargate 포드 실행 역할을 검색하고 IAM 정책을 추가합니다.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 POD_EXEC_ROLE=$(aws eks describe-fargate-profile \
   --cluster-name fargate-cluster \
   --fargate-profile-name fargate-profile \
   --query 'fargateProfile.podExecutionRoleArn' --output text |cut -d '/' -f 2)
 aws iam attach-role-policy \
         --policy-arn arn:aws:iam::<ACCOUNTID>:policy/FluentBitEKSFargate \
         --role-name $POD_EXEC_ROLE
{{< /code-block >}}

### 샘플 애플리케이션 배포

로그를 생성하고 Kinesis 파이프라인을 테스트하려면 EKS Fargate 클러스터에 샘플 워크로드를 배포합니다.

1. 배포 매니페스트 `sample-deployment.yaml`를 생성합니다.

{{< code-block lang="yaml" filename="sample-deployment.yaml" disable_copy="false" collapsible="false" >}}
 apiVersion: apps/v1
 kind: Deployment
 metadata:
   name: sample-app
   namespace: fargate-namespace
 spec:
   selector:
     matchLabels:
       app: nginx
   replicas: 1
   template:
     metadata:
       labels:
         app: nginx
     spec:
       containers:
       - name: nginx
         image: nginx
         ports:
         - containerPort: 80
{{< /code-block >}}

 2. `fargate-namespace` 네임스페이스를 생성합니다.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl create namespace fargate-namespace
 {{< /code-block >}}

 3. `kubectl`를 사용하여 배포 매니페스트를 적용합니다.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl apply -f sample-deployment.yaml
 {{< /code-block >}}

### 검증

1. `sample-app` 포드에 `fargate-namespace` 네임스페이스가 실행되고 있는지 확인합니다.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl get pods -n fargate-namespace
 {{< /code-block >}}

예상 출력:

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
 NAME                          READY   STATUS    RESTARTS   AGE
 sample-app-6c8b449b8f-kq2qz   1/1     Running   0          3m56s
 sample-app-6c8b449b8f-nn2w7   1/1     Running   0          3m56s
 sample-app-6c8b449b8f-wzsjj   1/1     Running   0          3m56s
 {{< /code-block >}}

2. `kubectl describe pod`를 사용해 Fargate 로깅 기능이 활성화되어 있는지 확인합니다.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl describe pod <POD-NAME> -n fargate-namespace |grep Logging
 {{< /code-block >}}

예상 출력:

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
                    Logging: LoggingEnabled
 Normal  LoggingEnabled   5m   fargate-scheduler  Successfully enabled logging for pod
 {{< /code-block >}}

3. 배포 로그를 검사합니다.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl logs -l app=nginx -n fargate-namespace
 {{< /code-block >}}

예상 출력:

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
 /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
 /docker-entrypoint.sh: Configuration complete; ready for start up
 2023/01/27 16:53:42 [notice] 1#1: using the "epoll" event method
 2023/01/27 16:53:42 [notice] 1#1: nginx/1.23.3
 2023/01/27 16:53:42 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6)
 2023/01/27 16:53:42 [notice] 1#1: OS: Linux 4.14.294-220.533.amzn2.x86_64
 2023/01/27 16:53:42 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1024:65535
 2023/01/27 16:53:42 [notice] 1#1: start worker processes
 ...
 {{< /code-block >}}

4. Datadog UI에서 로그를 확인하세요. `source:aws`를 선택하여 Kinesis Data Firehose에서 로그에 대해 필터링합니다.
{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_verification.jpg" alt="Datadog 로그 탐색기에서 nginx 로그 줄 확인" responsive="true">}}

### 로그 상관관계에 대한 속성 다시 매핑

이 설정의 로그에는 Datadog의 표준 Kubernetes 태그와의 일관성을 최대화하기 위해 일부 속성을 다시 매핑하는 작업이 필요합니다.
1. [Datadog 로그 파이프라인][3] 페이지로 이동합니다.
2. **Name** `EKS Fargate Log Pipeline` 및 **Filter** `service:aws source:aws`를 사용하여 새 파이프라인을 생성합니다.
3. [리매퍼 프로세서][5] 4개를 생성하여 다음 속성을 태그 키에 다시 매핑합니다.
 | 다시 매핑할 속성 | 대상 태그 키 |
 |--------------------|----------------|
 | `kubernetes.container_name` | `kube_container_name` |
 | `kubernetes.namespace_name` | `kube_namespace` |
 | `kubernetes.pod_name` | `pod_name` |
 | `kubernetes.docker_id` | `container_id` |

4. 이 파이프라인을 생성한 후, 샘플 앱에서 내보낸 로그는 이 예와 같이 태깅됩니다. 쿠버네티스 태그에 다시 매핑된 로그 속성을 포함하게 됩니다.
{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_example_remapped.jpg" alt="컨테이너_id, kube_container_name, kube_namespace 및 pod_name 태그가 있는 Datadog의 로그 상세 정보 보기" responsive="true">}}

## 참고 자료
 {{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=kinesisfirehosedeliverystream#setup
[5]: /ko/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://kubernetes.io/docs/tasks/tools/
[7]: https://aws.amazon.com/cli/
[8]: https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html
[9]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-getting-started.html