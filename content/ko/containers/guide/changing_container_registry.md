---
aliases:
- /ko/agent/guide/changing_container_registry
title: 컨테이너 레지스트리 변경하기
---

Datadog은 컨테이너 이미지를 Google gcr.io, Azure ACR, AWS ECR, Docker Hub에 게시합니다.

{{% container-images-table %}}

ACR, GCR 또는 ECR 레지스트리에서 불러오면 Docker 허브에서 불러오는 것과 동일하게 동작합니다(Notary 제외). 동일한 명령(다른 매개변수 포함)을 사용하여 동일한 이미지를 얻을 수 있습니다.

**참고**: ACR, ECR 및 GCR은 Notary를 지원하지 않습니다. Docker에서 가져온 이미지의 서명을 확인하는 경우 이 기능은 GCR 또는 ECR에서 작동하지 않습니다.

레지스트리를 업데이트하려면 배포 중인 컨테이너 환경 유형에 따라 레지스트리 값을 업데이트합니다.

**참고**: 비공개 레지스트리도 사용할 수 있지만 이미지를 비공개 레지스트리에서 가져오려면 풀 시크릿(Pull Secret)을 생성해야 합니다.
풀 시크릿을 생성하는 방법에 대한 자세한 내용은 [Kubernetes 설명서][1]를 참조하세요.

## Docker

### 레지스트리 업데이트

컨테이너 레지스트리를 업데이트하려면 새 레지스트리에 대해 Pull 명령을 실행하세요. 다른 컨테이너 레지스트리에 대한 Docker Pull 명령어를 보려면 [Docker 문서 페이지 개요][2]의 예시를 참조하세요.

## Kubernetes에서 Helm Chart 활용

Datadog Helm Chart로 Kubernetes(GKE, EKS, AKS, OpenShift 포함)에 Datadog Agent(또는 Datadog Cluster Agent)를 배포하면서 컨테이너 레지스트리를 업데이트하려면 `values.yaml` 값을 업데이트하여 다른 레지스트리를 지정하세요.

### Datadog Helm Chart >= v2.7.0

1. `values.yaml`을 업데이트하세요.
    ```yaml
    registry: gcr.io/datadoghq
    ```
2. `values.yaml`에서 `agents.image.repository`, `clusterAgent.image.repository`, `clusterChecksRunner.image.repository`에 대한 재정의를 모두 삭제합니다.

### Datadog Helm Chart < v2.7.0

리포지토리를 `gcr.io`로 변경합니다.

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

Datadog Helm Chart 사용에 대한 자세한 내용은 [Datadog Kubernetes 문서][3] 및 예제 [`values.yaml`][4] 파일을 참조하세요.

비공개 레지스트리를 사용하는 경우 각 이미지의 `[key].image.pullSecrets` 필드에 풀 시크릿(Pull secret)을 추가해야 합니다.
```yaml
agents:
  image:
    pullSecrets:
      - name: PrivateRegistrySecret

clusterAgent:
  image:
    pullSecrets:
    - name: PrivateRegistrySecret

clusterChecksRunner:
  image:
    pullSecrets:
    - name: PrivateRegistrySecret
```

## Kubernetes에서 Datadog Operator 활용

Datadog Operator로 Datadog Agent(또는 Datadog Cluster Agent)를 배포하는 동안 레지스트리를 업데이트합니다.

1. Datadog Agent 매니페스트 파일을 업데이트하여 기본 레지스트리(`gcr.io/datadoghq`)를 재정의합니다. 예를 들어 `public.ecr.aws/datadog`의 경우는 다음과 같습니다.
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

2. `spec.override.nodeAgent.image.name`, `spec.override.clusterAgent.image.name`, `spec.override.clusterChecksRunner.image.name` 필드에 대한 재정의를 모두 삭제합니다.
3. 비공개 레지스트리를 사용하는 경우 각 이미지의 `[key].image.pullSecrets` 필드에 풀 시크릿(Pull secret)을 추가해야 합니다.
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
    clusterAgent:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
    clusterChecksRunner:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
  // ..
```

Datadog Operator에 대한 자세한 내용은 [Operator로 Agent 배포하기][5]를 참조하세요.


### Helm으로 다른 컨테이너 레지스트리 사용하기

Helm Chart로 Operator를 설치할 때 기본 `gcr.io/datadoghq` 레지스트리에서 `datadoghq.azurecr.io`와 같은 다른 레지스트리로 전환할 수 있습니다.

[`values.yaml`][6]을 새 이미지로 업데이트합니다.

```yaml
image:
  repository: datadoghq.azurecr.io
```

## ECS

ECS에 배포하는 동안 레지스트리를 업데이트하려면 `datadog-agent-ecs.json` 파일에서 `containerDefinitions`의 `"image"` 키 값을 `"public.ecr.aws/datadog/agent:latest"`로 변경합니다.

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

ECS에 Datadog 배포하기에 대한 자세한 내용은  [Datadog ECS 문서][7] 및 예제 [`datadog-agent-ecs.json`][7] 파일을 참조하세요.

## Fargate

Fargate에 배포하는 동안 레지스트리를 업데이트하려면 Fargate 작업 정의에서 이미지를 업데이트하여 `public.ecr.aws`을 사용합니다. 

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

다음에 작업이 시작되면 Docker Hub 대신 `public.ecr.aws`에서 가져옵니다. Fargate에 배포하는 방법에 대한 자세한 내용은 [ECS에 Agent 배포하기][8] 및 [EKS에 Agent 배포하기][9]를 참조하세요.

## Cluster Agent

Helm chart로 Datadog Agent 및 Datadog Cluster Agent를 배포하는 경우, [Kubernetes에서 Helm 차트 활용](#kubernetes-with-helm-chart) 지침을 따르세요. 다른 업데이트는 필요하지 않습니다. 위에서 설명한 Helm `values.yaml`을 변경하면 Cluster Agent 및 Datadog Agent가 이미지를 가져오는 리포지토리가 변경됩니다.

Datadog Operator로 Datadog Cluster Agent를 배포하는 경우, [Kubernetes에서 Datadog Operator 활용](#kubernetes-with-the-datadog-operator) 지침을 따르세요. 다른 업데이트는 필요하지 않습니다. Operator 구성 업데이트 지침에 따르면 Cluster Agent 및 Datadog Agent가 이미지를 가져오는 리포지토리가 업데이트됩니다.

Datadog Cluster Agent에 대한 자세한 내용은 [Cluster Agent 문서][10] 및 [설정 문서][11]를 참조하세요.

## Datadog Private Location 워커용 Kubernetes Helm

Private Location 워커의 레지스트리를 업데이트하려면 `datadog/synthetics-private-location-worker` 이미지를 `public.ecr.aws/datadog/synthetics-private-location-worker` 또는 `gcr.io/datadoghq/synthetics-private-location-worker` 이미지로 업데이트하세요.

기본 리포지토리(`gcr.io/datadoghq`)를 변경하려면 `values.yaml`를 새 이미지로 업데이트합니다.

```yaml
image:
  repository: gcr.io/datadoghq/synthetics-private-location-worker
```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials
[2]: https://docs.datadoghq.com/ko/agent/docker/?tab=standard
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/?tab=helm
[4]: https://github.com/DataDog/helm-charts/blob/dae884481c5b3c9b67fc8dbd69c944bf3ec955e9/charts/datadog/values.yaml#L19
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/?tab=operator#deploy-an-agent-with-the-operator
[6]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/values.yaml#L28
[7]: https://docs.datadoghq.com/ko/agent/amazon_ecs/?tab=awscli
[8]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-ecs
[9]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-eks
[10]: https://docs.datadoghq.com/ko/agent/cluster_agent/
[11]: https://docs.datadoghq.com/ko/agent/cluster_agent/setup/?tab=helm