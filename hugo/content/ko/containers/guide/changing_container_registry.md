---
aliases:
- /ko/agent/guide/changing_container_registry
description: 배포 환경과 요구 사항에 따라 Datadog 컨테이너 이미지 레지스트리를 전환합니다.
title: 컨테이너 레지스트리 변경하기
---
Datadog은 Datadog Container Registry, Google Artifact Registry(GAR), Amazon ECR, Azure ACR, Docker Hub에 컨테이너 이미지를 게시합니다.

{{% container-images-table %}}

## 컨테이너 레지스트리 선택{#choosing-a-container-registry}

Datadog은 컨테이너 레지스트리를 선택할 때 다음 방식을 권장합니다.

1. **비공개 풀스루 캐시**: 자체 인프라에 풀스루 캐시를 설정합니다. 이렇게 하면 컨테이너 이미지 종속성을 가장 효과적으로 제어할 수 있습니다. 사용 중인 클라우드 공급자의 문서를 참조하세요.
   - AWS: [Amazon ECR 풀스루 캐시][12]
   - GCP: [Artifact Registry 원격 리포지토리][13]
   - Azure: [Azure Container Registry 캐시][14]

2. **클라우드 공급자 레지스트리**: 특정 클라우드 공급자(AWS, GCP 또는 Azure)에 배포하는 경우 해당 Datadog 퍼블릭 레지스트리를 사용하세요.
   - AWS 배포: `public.ecr.aws/datadog`
   - GCP 배포: `gcr.io/datadoghq`, `eu.gcr.io/datadoghq` 또는 `asia.gcr.io/datadoghq`
   - Azure 배포: `datadoghq.azurecr.io`

3. **Datadog Container Registry**: 간편하게 사용하려면 `registry.datadoghq.com`을 사용하세요. 이 레지스트리는 추가 설정이 필요 없으며 요청 한도가 매우 높습니다. 레지스트리가 요청을 `us-docker.pkg.dev/datadog-prod/public-images`로 리디렉션할 수 있으므로 방화벽이 이 URL로의 트래픽을 허용하는지 확인하세요.

4. **Docker Hub**: 요청 한도가 적용되므로 Docker Hub 구독이 있는 경우가 아니라면 사용을 피하세요.

<div class="alert alert-info">기본적으로 Datadog Agent Helm 차트는 Datadog 사이트, 클러스터 유형 및 <code>registryMigrationMode</code>값을 기준으로 기본 Agent 이미지 레지스트리를 결정합니다. Datadog Operator 차트는 기본적으로 Datadog Agent Helm 차트의 종속성으로 포함되어 있습니다. Datadog Operator 차트 버전 2.19.0부터 해당 종속성을 통해 Operator를 설치하면 Datadog Agent Helm 차트의 <code>registryMigrationMode</code> 설정이 Operator가 관리하는 Agent 이미지에도 적용됩니다. Operator Helm 차트 자체에는 <code>registryMigrationMode</code>가 정의되어 있지 않습니다. Operator 포드 이미지는 Operator 차트의 <code>image.repository</code> </div> 값으로 별도로 제어됩니다.

레지스트리를 업데이트하려면 배포 중인 컨테이너 환경 유형에 따라 레지스트리 값을 업데이트하세요. 비공개 레지스트리를 사용할 수도 있지만, 이미지를 가져오려면 [풀 시크릿을 생성][1]해야 합니다.

## Docker {#docker}

### Registry 업데이트 {#updating-your-registry}

컨테이너 레지스트리를 업데이트하려면 새 레지스트리에 대해 Pull 명령을 실행하세요. 다른 컨테이너 레지스트리에 대한 Docker Pull 명령어를 확인하려면 [Docker 문서 페이지 개요][2]의 예시를 참조하세요.

## Kubernetes에서 Helm 차트 활용{#kubernetes-with-helm-chart}

Datadog Helm 차트로 Kubernetes(GKE, EKS, AKS, OpenShift 포함)에 Datadog Agent(또는 Datadog Cluster Agent)를 배포하면서 컨테이너 레지스트리를 업데이트하려면 `values.yaml` 값을 업데이트하여 다른 레지스트리를 지정하세요.

### Datadog Helm 차트 >= v2.7.0 {#datadog-helm-chart-v270}

1. `values.yaml`을 업데이트하세요. 예를 들어 Amazon ECR을 사용하려면 다음과 같이 설정합니다.
    ```yaml
    registry: public.ecr.aws/datadog
    ```
2. `agents.image.repository`, `clusterAgent.image.repository` 또는 `clusterChecksRunner.image.repository`에 대한 모든 재정의를 `values.yaml`에서 제거하세요.

### Datadog Helm 차트 < v2.7.0 {#datadog-helm-chart-v270-1}

리포지토리를 원하는 레지스트리로 변경하세요. 예를 들어, Datadog Container Registry를 사용하는 경우:

```yaml
agents:
  image:
    repository: registry.datadoghq.com/agent

clusterAgent:
  image:
    repository: registry.datadoghq.com/cluster-agent

clusterChecksRunner:
  image:
    repository: registry.datadoghq.com/agent
```

Datadog Helm 차트 사용에 대한 자세한 내용은 [Datadog Kubernetes 문서][3] 및 예제 [`values.yaml`][4] 파일을 참조하세요.

비공개 레지스트리를 사용하는 경우 각 이미지의 `[key].image.pullSecrets` 필드에 풀 시크릿을 추가해야 합니다.

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

## Kubernetes에서 Datadog Operator 활용{#kubernetes-with-the-datadog-operator}

Datadog Operator 차트 버전 2.19.0부터 Datadog Agent Helm 차트의 종속성을 통해 Operator를 설치하는 경우, Datadog Agent Helm 차트의 `registryMigrationMode` 설정에서 Operator가 관리하는 Agent 이미지에 대해 `registry.datadoghq.com`를 사용할 수 있습니다. 이전 버전에서는 Agent 이미지를 사이트별 레지스트리(`gcr.io/datadoghq`, `eu.gcr.io/datadoghq`, `asia.gcr.io/datadoghq` 또는 `datadoghq.azurecr.io`)에서 가져왔습니다. 이 배포 경로에서 이전 사이트별 레지스트리를 계속 사용하려면 Datadog Agent Helm 차트의 `values.yaml`에서 `registryMigrationMode: ""`를 설정하세요. 이 설정은 레지스트리를 명시적으로 지정한 경우에는 영향을 미치지 않으며, 독립형 Operator Helm 차트의 설정 항목도 아닙니다. Operator 포드 이미지에 다른 레지스트리를 사용하려면 Operator Helm의 `values.yaml`에서 `image.repository`를 설정하세요.

Datadog Operator로 Datadog Agent(또는 Datadog Cluster Agent)를 배포하는 동안 레지스트리를 업데이트합니다.

1. Datadog Agent 매니페스트 파일을 업데이트하여 확인된 레지스트리를 재정의하세요. 예를 들어 `public.ecr.aws/datadog`의 경우:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    registry: public.ecr.aws/datadog
  // ..
```

2. `spec.override.nodeAgent.image.name`, `spec.override.clusterAgent.image.name`, `spec.override.clusterChecksRunner.image.name` 필드에 대한 모든 재정의를 제거하세요.
3. 비공개 레지스트리를 사용하는 경우 각 이미지의 `[key].image.pullSecrets` 필드에 풀 시크릿을 추가해야 합니다.

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


### Helm으로 다른 Container Registry 사용하기 {#using-another-container-registry-with-helm}

독립형 Operator Helm 차트를 설치할 때 `public.ecr.aws/datadog`과 같이 Operator 포드 이미지에 다른 레지스트리를 사용하려면 다음과 같이 하세요.

[`values.yaml`][6]을 새 이미지로 업데이트하세요.

```yaml
image:
  repository: public.ecr.aws/datadog
```

## ECS {#ecs}

ECS에 배포하는 동안 레지스트리를 업데이트하려면 `datadog-agent-ecs.json` 파일에서 `containerDefinitions` 아래의 `"image"` 키 값을 `"public.ecr.aws/datadog/agent:latest"`로 변경하세요.

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

ECS에 Datadog 배포하기에 대한 자세한 내용은 [Datadog ECS 문서][7] 및 예제 [`datadog-agent-ecs.json`][7] 파일을 참조하세요.

## Fargate {#fargate}

Fargate에 배포하는 동안 레지스트리를 업데이트하려면 Fargate 작업 정의에서 이미지를 업데이트하여 `public.ecr.aws`를 사용합니다.

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

다음에 작업이 시작될 때 Docker Hub 대신 `public.ecr.aws`에서 이미지를 가져옵니다. Fargate 배포에 대한 자세한 내용은 [ECS에서 Agent 배포][8] 및 [EKS에서 Agent 배포][9]를 참조하세요.

## Cluster Agent {#cluster-agent}

Helm 차트를 사용하여 Datadog Agent와 Datadog Cluster Agent를 배포하는 경우 [Kubernetes에서 Helm 차트 활용](#kubernetes-with-helm-chart)에 나와 있는 지침을 따르세요. 다른 업데이트는 필요하지 않습니다. 위에서 설명한 Helm `values.yaml` 변경 사항을 적용하면 Cluster Agent와 Datadog Agent를 둘 다 가져오는 리포지토리가 변경됩니다.

Datadog Operator를 사용하여 Datadog Cluster Agent를 배포하는 경우 [Kubernetes에서 Datadog Operator 활용](#kubernetes-with-the-datadog-operator)에 나와 있는 지침을 따르세요. 다른 업데이트는 필요하지 않습니다. Operator 구성 업데이트 지침은 Cluster Agent와 Datadog Agent를 둘 다 가져오는 리포지토리를 업데이트합니다.

Datadog Cluster Agent에 대한 자세한 내용은 [Cluster Agent 문서][10] 및 [설정 문서][11]를 참조하세요.

## Datadog Private Location 워커용 Kubernetes Helm{#kubernetes-helm-for-the-datadog-private-location-worker}

Private Location 워커의 레지스트리를 업데이트하려면 `datadog/synthetics-private-location-worker` 이미지를 `public.ecr.aws/datadog/synthetics-private-location-worker` 또는 `gcr.io/datadoghq/synthetics-private-location-worker`와 같은 다른 레지스트리로 변경하세요.

기본 리포지토리(`gcr.io/datadoghq`)를 변경하려면 `values.yaml`을 새 이미지로 업데이트하세요.

```yaml
image:
  repository: public.ecr.aws/datadog/synthetics-private-location-worker
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
[12]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/pull-through-cache.html
[13]: https://cloud.google.com/artifact-registry/docs/repositories/remote-repo
[14]: https://learn.microsoft.com/en-us/azure/container-registry/container-registry-artifact-cache