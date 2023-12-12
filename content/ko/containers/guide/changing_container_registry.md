---
aliases:
- /ko/agent/guide/changing_container_registry
kind: guide
title: 컨테이너 레지스트리 변경하기
---

Datadog은 Google의 gcr.io, AWS의 ECR 및 Docker Hub에 컨테이너 이미지를 게시합니다.

| dockerhub.io                               | gcr.io                                              | public.ecr.aws                                            |
|--------------------------------------------|-----------------------------------------------------|-----------------------------------------------------------|
| datadog/agent                              | gcr.io/datadoghq/agent                              | public.ecr.aws/datadog/agent                              |
| datadog/cluster-agent                      | gcr.io/datadoghq/cluster-agent                      | public.ecr.aws/datadog/cluster-agent                      |
| datadog/dogstatsd                          | gcr.io/datadoghq/dogstatsd                          | public.ecr.aws/datadog/dogstatsd                          |
| datadog/synthetics-private-location-worker | gcr.io/datadoghq/synthetics-private-location-worker | public.ecr.aws/datadog/synthetics-private-location-worker |


GCR 또는 ECR 레지스트리에서 가져오는 것은 Docker Hub에서 가져오는 것과 동일하게 작동합니다(Notary 제외). 동일한 명령(다른 파라미터 포함)을 사용하여 동일한 이미지를 얻을 수 있습니다.

**참고**: ECR 및 GCR은 Notary를 지원하지 않습니다. Docker에서 가져온 이미지의 서명을 확인하는 경우 이 기능은 GCR 또는 ECR에서 작동하지 않습니다.

레지스트리를 업데이트하려면 배포 중인 컨테이너 환경 유형에 따라 레지스트리 값을 업데이트해야 합니다.

## Docker

### 레지스트리 업데이트하기

컨테이너 레지스트리를 업데이트하려면 새 레지스트리에 대해 pull 명령을 실행합니다. 다양한 컨테이너 레지스트리에 대한 Docker 풀 명령을 보려면 [Docker 문서 페이지 개요][1]의 예를 참조하세요.

## Helm 차트를 사용하는 Kubernetes 

Kubernetes(GKE, EKS, AKS 및 OpenShift 포함)에서 Datadog helm 차트를 사용하여 Datadog Agent(또는 Datadog  Cluster Agent)를 배포하는 동안 컨테이너 레지스트리를 업데이트하려면 다른 레지스트리를 지정하도록 `values.yaml`을 업데이트하세요.

### Datadog Helm 차트 >= v2.7.0

1. `values.yaml`을 업데이트하세요.
    ```yaml
    registry: gcr.io/datadoghq
    ```
2. `values.yaml`에서 `agents.image.repository`, `clusterAgent.image.repository`, `clusterChecksRunner.image.repository`에 대한 오버라이드를 제거하세요.

### Datadog Helm 차트 < v2.7.0 

리포지토리를 `gcr.io`로 변경하세요.

```yaml
agents:
  image:
    repository: gcr.io/datadoghq/agent  

clusterAgent:
  image:
    repository: gcr.io/datadoghq/cluster-agent

clusterChecksRunner:
  image:
    repository: gcr.io/datadoghq/agent
```

Datadog Helm 차트 사용에 대한 자세한 내용은 [Datadog Kubernetes 문서][2] 및 예시 [`values.yaml`][3] 파일을 참조하세요.

## Datadog Operator를 사용하는 Kubernetes 

Datadog Operator를 사용하여 Datadog Agent (또는 Datadog Cluster Agent)를 배포하는 동안 레지스트리를 업데이트하려면:

1. Datadog Agent 매니페스트 파일을 업데이트하여 기본 레지스트리(`gcr.io/datadoghq`)를 재정의합니다. 예를 들어 `public.ecr.aws/datadog`을 사용하는 경우는 다음과 같습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    registry: gcr.io/datadoghq
  // ..
```
2. `spec.override.nodeAgent.image.name`, `spec.override.clusterAgent.image.name`, `spec.override.clusterChecksRunner.image.name` 필드에 대한 오버라이드를 제거하세요.

Datadog Operator에 대한 자세한 내용은 [Operator를 사용하여 Agent 배포][4]를 참조하세요.


### Helm과 함께 public.ecr.aws/datadog 레지스트리 사용하기

Helm 차트를 사용하여 Operator를 설치할 때 기본 `gcr.io/datadoghq` 레지스트리에서 `public.ecr.aws/datadog`레지스트리로 전환할 수도 있습니다. `public.ecr.aws/datadog` 레지스트리로 전환하려면:

[`values.yaml`][5]를 새 이미지로 업데이트합니다.

```yaml
image:
  repository: public.ecr.aws/datadog
```

## ECS

ECS에 배포하는 동안 레지스트리를 업데이트하려면 `datadog-agent-ecs.json` 파일에서 `"image"` 키 값을 `containerDefinitions`에서 `"public.ecr.aws/datadog/agent:latest"`로 변경합니다.

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

ECS에 Datadog을 배포하는 방법에 대한 자세한 내용은 [Datadog ECS ​​설명서][6] 및 예시 [`datadog-agent-ecs.json`파일][6]을 참조하세요.

## Fargate

Fargate에 배포하는 동안 레지스트리를 업데이트하려면 `public.ecr.aws`를 사용하여 Fargate 작업 정의에서 이미지를 업데이트합니다.

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

다음에 작업이 시작되면 Docker Hub 대신 `public.ecr.aws`에서 가져옵니다. Fargate 배포에 대한 자세한 내용은 [ECS에 Agent 배포][7] 및 [EKS에 Agent 배포][8]를 참조하세요.


## 클러스터 에이전트

Helm 차트를 사용하여 Datadog Agent 및 Datadog Cluster Agent를 배포하는 경우 [Helm 차트를 사용하는 Kubernetes](#kubernetes-with-helm-chart)의 지침을 따르세요. 다른 업데이트는 필요하지 않습니다. 위에서 설명한 Helm `values.yaml`에 대한 변경 사항은 Cluster Agent와 Datadog Agent를 모두 가져오는 리포지토리를 변경합니다.

Datadog Operator를 사용하여 Datadog Cluster Agent를 배포하는 경우 [Datadog Operator를 사용하는 Kubernetes](#kubernetes-with-the-datadog-operator)의 지침을 따르세요. 그러면 다른 업데이트가 필요하지 않습니다. Operator 설정 업데이트 지침은 Cluster Agent와 Datadog Agent를 모두 가져오는 리포지토리를 업데이트합니다.

Datadog Cluster Agent에 대한 자세한 내용은 [Cluster Agent 문서][9] 및 [설정 문서][10]를 참조하세요.

## Datadog Private Location 작업자를 위한 Kubernetes Helm

Private Location 작업자를 위한 레지스트리를 업데이트하려면 `datadog/synthetics-private-location-worker` 이미지를 `public.ecr.aws/datadog/synthetics-private-location-worker` 또는 `gcr.io/datadoghq/synthetics-private-location-worker` 이미지로 변경하세요.

기본 리포지토리(`gcr.io/datadoghq`)를 변경하려면 `values.yaml`을 새 이미지로 업데이트하세요.

```yaml
image:
  repository: gcr.io/datadoghq/synthetics-private-location-worker
```

[1]: https://docs.datadoghq.com/ko/agent/docker/?tab=standard
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/?tab=helm
[3]: https://github.com/DataDog/helm-charts/blob/dae884481c5b3c9b67fc8dbd69c944bf3ec955e9/charts/datadog/values.yaml#L19
[4]: https://docs.datadoghq.com/ko/agent/kubernetes/?tab=operator#deploy-an-agent-with-the-operator
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/values.yaml#L28
[6]: https://docs.datadoghq.com/ko/agent/amazon_ecs/?tab=awscli
[7]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-ecs
[8]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-eks
[9]: https://docs.datadoghq.com/ko/agent/cluster_agent/
[10]: https://docs.datadoghq.com/ko/agent/cluster_agent/setup/?tab=helm