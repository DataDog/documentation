---
app_id: eks-fargate
app_uuid: f5919a4b-4142-4889-b9c0-6ecdab299ebb
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: eks.fargate.pods.running
      metadata_path: metadata.csv
      prefix: eks.fargate.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: EKS Fargate
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- aws
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/eks_fargate/README.md
display_on_public_website: true
draft: false
git_integration_title: eks_fargate
integration_id: eks-fargate
integration_title: AWS Fargate에서의 Amazon EKS
integration_version: 4.2.1
is_public: true
manifest_version: 2.0.0
name: eks_fargate
public_title: AWS Fargate에서의 Amazon EKS
short_description: Amazon EKS 메트릭, 트레이스, 로그를 수집하세요.
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Cloud
  - Category::AWS
  - Category::Log Collection
  configuration: README.md#Setup
  description: Amazon EKS 메트릭, 트레이스, 로그를 수집하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Fargate에서의 Amazon EKS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

<div class="alert alert-warning"> 본 페이지에서는 EKS Fargate 통합에 대해 설명합니다. ECS Fargate의 경우 Datadog <a href="http://docs.datadoghq.com/통합/ecs_fargate">ECS Fargate 통합</a> 설명서를 참조하세요.
</div>

AWS Fargate의 Amazon EKS는 표준 쿠버네티스(Kubernetes) 환경의 배포 및 유지 관리의 특정 측면을 자동화하는 관리형 쿠버네티스(Kubernetes) 서비스입니다. 쿠버네티스(Kubernetes) 노드는 AWS Fargate로 관리하며 사용자로부터 추상화됩니다.

**참고**: EKS Fargate는 네트워크 성능 모니터링(NPM)을 지원하지 않습니다.

## 설정

본 단계에서는 AWS Fargate의 Amazon EKS 내부 컨테이너에서 Datadog 에이전트 v7.17+를 설정하는 방법을 알아봅니다. AWS Fargate를 사용하지 않는 경우 [Datadog-Amazon EKS 통합 문서][1]를 참조하세요.

AWS Fargate 파드(pod)는 물리적 파드가 아니므로 CPU, 메모리 등과 같은 [호스트 기반 시스템 점검][2]에서 제외됩니다. AWS Fargate 파드에서 데이터를 수집하려면, 다음 기능을 활성화하는 커스텀 RBAC을 사용하여 애플리케이션 파드의 사이드카로 해당 에이전트를 실행합니다.

- 애플리케이션 컨테이너를 실행하는 파드와 에이전트에서 쿠버네티스(Kubernetes) 메트릭 수집
- [자동탐지][3]
- 동일한 파드의 대상 컨테이너에 대해 커스텀 에이전트 점검 설정
- 동일한 파드의 컨테이너에 대한 애플리케이션 성능 모니터링(APM) 및 DogStatsD

### EC2 노드

[AWS Fargate 프로파일][4]로 파드가 fargate 실행되도록 지정하지 않으면, 해당 파드는 기존 EC2 머신을 사용할 수 있습니다. 이러한 경우 [Datadog-Amazon EKS 통합 설정][5] 항목을 참조하여 데이터를 수집하세요. 해당 통합은 에이전트를 EC2 유형 워크로드로 실행하여 동작합니다. 에이전트 설정은 [쿠버네티스(Kubernetes) 에이전트 설정][6]과 동일하며 모든 옵션을 사용할 수 있습니다. EC2 노드에 에이전트를 배포하려면 [Datadog 에이전트용 DaemonSet 설정][7]을 사용합니다.

### 설치

AWS EKS Fargate에서 워크로드 모니터링을 위한 최적의 옵저빌리티(observability) 범위를 확보하려면 다음 Datadog 통합을 설치하세요.

- [쿠버네티스][8]
- [AWS][9]
- [EKS][10]
- [EC2][11](EC2 유형 노드를 실행하는 경우)

EKS로 실행하는 기타 AWS 서비스에 대한 통합도 설치하세요(예: [ELB][12]).

#### 수동 설치

설치하려면 버전 7.17 이상 `datadog/agent` 커스텀 에이전트 이미지를 다운로드하세요.

에이전트가 사이드카로 실행되는 경우, 동일한 파드의 컨테이너와만 통신할 수 있습니다. 모니터링하려는 모든 파드에 대해 에이전트를 실행합니다.

### 설정

Fargate 노드로 AWS EKS Fargate에서 실행 중인 애플리케이션의 데이터를 수집하려면 다음 설정 단계를 따릅니다.

- [AWS EKS Fargate RBAC 규칙을 설정](#AWS-eks-fargate-rbac)합니다.
- [에이전트를 사이드카로 배포](#running-the-agent-as-a-sidecar)합니다.
- Datadog [메트릭](#metrics-collection), [로그](#log-collection), [이벤트](#events-collection), 및 [트레이스](#traces-collection) 수집을 설정합니다.

Datadog 라이브 컨테이너 보기에서 EKS Fargate 컨테이너를 사용하려면, 파드 사양에서 `shareProcessNamespace`를 활성화합니다. [프로세스 수집](#process-collection)을 참조하세요.

#### AWS EKS Fargate RBAC

AWS EKS Fargate에서 에이전트를 사이드카로 배포할 때 다음 RBAC 에이전트를 사용합니다.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: datadog-agent
rules:
  - apiGroups:
    - ""
    resources:
    - nodes
    - namespaces
    - endpoints
    verbs:
    - get
    - list
  - apiGroups:
      - ""
    resources:
      - nodes/metrics
      - nodes/spec
      - nodes/stats
      - nodes/proxy
      - nodes/pods
      - nodes/healthz
    verbs:
      - get
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-agent
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: datadog-agent
subjects:
  - kind: ServiceAccount
    name: datadog-agent
    namespace: default
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: datadog-agent
  namespace: default
```

#### 에이전트를 사이드카로 실행하기

[Datadog 어드미션 컨트롤러][13](클러스터 에이전트 v7.52 이상 필요) 또는 수동으로 사이드카를 설정하여 에이전트를 사이드카로 실행할 수 있습니다. 어드미션 컨트롤러를 사용하면 `agent.datadoghq.com/sidecar:fargate` 레이블이 있는 모든 파드에 에이전트 사이드카를 삽입할 수 있습니다. 

수동 설정의 경우 에이전트 사이드카를 추가하거나 변경할 때는 모든 워크로드 매니페스트를 수정해야 합니다. Datadog은 어드미션 컨트롤러를 사용할 것을 권장합니다.

{{< tabs >}}
{{% tab "Admission Controller" %}}
##### 어드미션 컨트롤러

<div class="alert alert-warning">이 기능을 사용하려면 클러스터 에이전트 v7.52.0 이상 및 <a href="http://docs.datadoghq.com/통합/ecs_fargate">ECS Fargate 통합</a>이 필요합니다.
</div>

하단의 설정으로 에이전트 사이드카와 통신하도록 클러스터 에이전트를 설정하여 [이벤트 컬렉션][1], [쿠버네티스(Kubernetes) 리소스 보기][2], [클러스터 점검][3] 등의 기능에 접근할 수 있게 합니다.

**전제 조건**

* 애플리케이션 네임스페이스에서 RBAC를 설정합니다. 본 페이지의 [AWS EKS Fargate RBAC](#AWS-eks-fargate-rbac) 섹션을 참조하세요.
* Datadog 설치 및 애플리케이션 네임스페이스에서 Datadog API 키와 클러스터 에이전트 토큰이 포함된 쿠버네티스(Kubernetes) 시크릿을 생성합니다.

   ```shell
   kubectl create secret generic datadog-secret -n datadog-agent \
           --from-literal api-key=<YOUR_DATADOG_API_KEY> --from-literal token=<CLUSTER_AGENT_ TOKEN>
   kubectl create secret generic datadog-secret -n fargate \
           --from-literal api-key=<YOUR_DATADOG_API_KEY> --from-literal token=<CLUSTER_AGENT_TOKEN>
   ```
   해당 시크릿이 어떻게 사용되는지 자세히 알아보려면 [클러스터 에이전트 설정][4]을 참조하세요.

###### 설정

1. 활성화된 클러스터 에이전트 및 어드미션 컨트롤러로 Datadog 에이전트를 설치합니다.

   ```sh
   helm install datadog datadog/datadog -n datadog-agent \
       --set datadog.clusterName=cluster-name \
       --set agents.enabled=false \
       --set datadog.apiKeyExistingSecret=datadog-secret \
       --set clusterAgent.tokenExistingSecret=datadog-secret \
       --set clusterAgent.admissionController.agentSidecarInjection.enabled=true \
       --set clusterAgent.admissionController.agentSidecarInjection.provider=fargate
   ```
   **참고**: Fargate 전용 클러스터에는 `agents.enabled=false`을 사용하고, 혼합 클러스터의 경우 `agents.enabled=true`을 설정하여 EC2 인스턴스의 워크로드 모니터링 DaemonSet을 생성합니다.

2. 클러스터 에이전트를 실행한 후 어드미션 컨트롤러를 변경하는 웹훅(webhook)을 등록하면 에이전트 사이드카가 `agent.datadoghq.com/sidecar:fargate` 레이블로 생성된 모든 파드에 자동 삽입됩니다.
   **어드미션 컨트롤러는 이미 생성된 파드를 변경하지 않습니다**.

**결과 예시**

다음은 어드미션 컨트롤러가 에이전트 사이드카를 삽입한 Redis 배포의 `spec.containers` 스니펫입니다. 사이드카는 내부 기본값을 사용하여 자동 설정되는데, EKS Fargate 환경에서 실행하기 위한 추가 설정도 포함됩니다. 사이드카는 Helm 값에 설정된 이미지 리포지토리와 태그를 사용합니다. 클러스터 에이전트와 사이드카 간의 통신은 기본값으로 활성화되어 있습니다.

{{< highlight yaml "hl_lines=7-29" >}}
  containers:
  - args:
    - redis-server
    image: redis:latest
  # ...
  - env:
    - name: DD_API_KEY
      valueFrom:
        secretKeyRef:
          key: api-key
          name: datadog-secret
    - name: DD_CLUSTER_AGENT_AUTH_TOKEN
      valueFrom:
        secretKeyRef:
          key: token
          name: datadog-secret
    - name: DD_EKS_FARGATE
      value: "true"
    # ...
    image: gcr.io/datadoghq/agent:7.51.0
    imagePullPolicy: IfNotPresent
    name: datadog-agent-injected
    resources:
      limits:
        cpu: 200m
        memory: 256Mi
      requests:
        cpu: 200m
        memory: 256Mi
{{< /highlight >}}

###### 사이드카 프로필 및 커스텀 선택기

에이전트 또는 컨테이너 리소스를 추가 설정하려면, Helm 속성 `clusterAgent.admissionController.agentSidecarInjection.profiles`으로 환경 변수 정의 및 리소스 설정을 추가합니다. `clusterAgent.admissionController.agentSidecarInjection.selectors` 속성으로 커스텀 선택기를 설정하여 `agent.datadoghq.com/sidecar:fargate` 레이블을 추가하여 워크로드를 업데이트하는 대신 워크로드 파드를 타겟팅합니다.

1. 사이드카 프로필과 커스텀 파드 선택기를 설정하는 Helm `datadog-values.yaml` 파일을 생성합니다.

   **예시**

   다음 예제에서 선택기는 레이블이 `"app": redis`인 모든 파드를 타겟으로 합니다. 사이드카 프로파일은 `DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED` 환경 변수와 리소스 설정을 구성합니다. 

   ```yaml
   clusterAgent:
     admissionController:
       agentSidecarInjection:
         selectors:
           - objectSelector:
               matchLabels:
                   "app": redis
         profiles:
           - env:
             - name: DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED
               value: "true"
             resources:
               requests:
                 cpu: "400m"
                 memory: "256Mi"
               limits:
                 cpu: "800m"
                 memory: "512Mi"
   ```

2. 차트를 설치합니다.

   ```shell
   helm install datadog datadog/datadog -n datadog-agent \
       --set datadog.clusterName=cluster-name \
       --set agents.enabled=false \
       --set datadog.apiKeyExistingSecret=datadog-secret \
       --set clusterAgent.tokenExistingSecret=datadog-secret \
       --set clusterAgent.admissionController.agentSidecarInjection.enabled=true \
       --set clusterAgent.admissionController.agentSidecarInjection.provider=fargate \
       -f datadog-values.yaml
   ```
   **참고**: Fargate 전용 클러스터에는 `agents.enabled=false`을 사용하고, 혼합 클러스터의 경우 `agents.enabled=true`을 설정하여 EC2 인스턴스의 워크로드 모니터링 DaemonSet을 생성합니다.

3. 클러스터 에이전트를 실행한 후 어드미션 컨트롤러를 변경하는 웹훅(webhook)을 등록하면 에이전트 사이드카가 `app:redis` 레이블로 생성된 모든 파드에 자동 삽입됩니다.
   **어드미션 컨트롤러는 이미 생성된 파드를 변경하지 않습니다**.

**결과 예시**

다음은 어드미션 컨트롤러가 에이전트 사이드카를 삽입한 Redis 배포의 `spec.containers` 스니펫입니다. `datadog-values.yaml`의 환경 변수와 리소스 설정이 자동 적용됩니다.

{{< highlight yaml "hl_lines=12-30" >}}
labels:
  app: redis
  eks.amazonaws.com/fargate-profile: fp-fargate
  pod-template-hash: 7b86c456c4
# ...
containers:
- args:
  - redis-server
  image: redis:latest
# ...
- env:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        key: api-key
        name: datadog-secret
  # ...
  - name: DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED
    value: "true"
  # ...
  image: gcr.io/datadoghq/agent:7.51.0
  imagePullPolicy: IfNotPresent
  name: datadog-agent-injected
  resources:
    limits:
      cpu: 800m
      memory: 512Mi
    requests:
      cpu: 400m
      memory: 256Mi
{{< /highlight >}}


[1]: https://docs.datadoghq.com/ko/agent/kubernetes/?tab=helm#event-collection
[2]: https://docs.datadoghq.com/ko/infrastructure/livecontainers/#kubernetes-resources-view
[3]: https://docs.datadoghq.com/ko/agent/cluster_agent/clusterchecks/#overview
[4]: http://docs.datadoghq.com/agent/cluster_agent
{{% /tab %}}
{{% tab "Manual" %}}
##### 수동

Fargate 타입 파드에서 데이터 수집을 시작하려면 애플리케이션의 사이드카로 Datadog 에이전트 v7.17+를 배포하세요. 이는 포드에서 실행 중인 애플리케이션에서 메트릭을 수집하는 데 필요한 최소 설정입니다. Datadog 에이전트 사이드카를 배포하려면 매니페스트에 `DD_EKS_FARGATE=true`가 추가되어 있는지 확인하세요.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 replicas: 1
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<APPLICATION_NAME>"
       image: "<APPLICATION_IMAGE>"
     ## 에이전트를 사이드카로 실행
     - image: datadog/agent
       name: datadog-agent
       env:
       - name: DD_API_KEY
         value: "<YOUR_DATADOG_API_KEY>"
         ## DD_SITE를 "datadoghq.eu"로 설정하여 
         ## Datadog EU 사이트로 에이전트 데이터 전송
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_CLUSTER_NAME
         value: "<CLUSTER_NAME>"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**참고**: `<YOUR_DATADOG_API_KEY>`를 [조직의 Datadog API 키][1]로 꼭 교체하세요.

**참고**: `DD_TAGS`의 목록에 원하는 `kube_cluster_name:<CLUSTER_NAME>`을 추가하여 메트릭에 원하는 클러스터 태그가 지정되도록 합니다. 여기에 공백으로 구분되는 `<KEY>:<VALUE>` 태그를 추가 태그로 추가할 수 있습니다. `7.34+` 및 `6.34+` 에이전트의 경우 해당 작업이 필요하지 않습니다. 대신 `DD_CLUSTER_NAME` 환경 변수를 설정하세요.

###### 클러스터 에이전트 또는 클러스터 점검 실행기를 실행합니다.

Datadog은 클러스터 에이전트를 실행하여 [이벤트 컬렉션][2], [쿠버네티스(Kubernetes) 리소스 보기][3], [클러스터 점검][4] 등의 기능에 접근하시기를 권장합니다.

EKS Fargate를 사용하는 경우, EKS 클러스터가 혼합 워크로드(Fargate/비 Fargate)를 실행 중인지 여부에 따라 다음 두 가지 가능한 시나리오가 있습니다.

EKS 클러스터로 Fargate 및 논-Fargate 워크로드를 실행하고 노드 에이전트 DaemonSet을 통해 논-Fargate 워크로드를 모니터링하려면 클러스터 에이전트/클러스터 점검 실행기를 이 배포에 추가하세요. 자세한 내용을 확인하려면 [클러스터 에이전트 설정][5]을 참조하세요.

클러스터 에이전트 토큰은 모니터링하러는 Fargate 작업에서 접근할 수 있어야 합니다. Helm 차트 또는 Datadog 오퍼레이터를 사용하는 경우, 타겟 네임스페이스에 시크릿이 생성되어 있어서 기본적으로 접근할 수 없습니다.

해당 기능이 제대로 작동하려면 다음 두 가지 옵션이 있습니다.

* 하드코딩된 토큰 값(Helm의 경우 `clusterAgent.token`, Datadog 오퍼레이터의 경우 `credentials.token`)을 사용하면 편리하지만 보안성이 떨어집니다.
* 수동으로 생성한 시크릿(헬름의 경우 `clusterAgent.tokenExistingSecret`, Datadog 오퍼레이터에서는 불가)을 사용하여 Fargate 작업을 모니터링하려는 모든 네임스페이스에 복제하면 안전하지만 추가 작업이 필요합니다.
**참고**:  `token` 값은 최소 32자 이상이어야 합니다.

EKS 클러스터가 Fargate 워크로드만 실행하는 경우, 독립형 클러스터 에이전트를 배포해야 합니다. 또한 위에서 설명한 것처럼 토큰이 접근할 수 있도록 두 가지 옵션 중 하나를 선택하여 설정합니다.

다음 헬름 `values.yaml`을 사용합니다.

```yaml
datadog:
  apiKey: <YOUR_DATADOG_API_KEY>
  clusterName: <CLUSTER_NAME>
agents:
  enabled: false
clusterAgent:
  enabled: true
  replicas: 2
  env:
    - name: DD_EKS_FARGATE
      value: "true"
```


두 경우 모두 클러스터 에이전트와의 통신을 허용하려면 다음과 같이 Datadog 에이전트 사이드카 매니페스트를 변경해야 합니다.

```yaml
       env:
        - name: DD_CLUSTER_AGENT_ENABLED
          value: "true"
        - name: DD_CLUSTER_AGENT_AUTH_TOKEN
          value: <hardcoded token value> # Use valueFrom: if you're using a secret
        - name: DD_CLUSTER_AGENT_URL
          value: https://<CLUSTER_AGENT_SERVICE_NAME>.<CLUSTER_AGENT_SERVICE_NAMESPACE>.svc.cluster.local:5005
        - name: DD_ORCHESTRATOR_EXPLORER_ENABLED # Kubernetes 리소스 보기를 얻는데 필요
          value: "true"
        - name: DD_CLUSTER_NAME
          value: <CLUSTER_NAME>
```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/?tab=helm#event-collection
[3]: https://docs.datadoghq.com/ko/infrastructure/livecontainers/#kubernetes-resources-view
[4]: https://docs.datadoghq.com/ko/agent/cluster_agent/clusterchecks/#overview
[5]: http://docs.datadoghq.com/agent/cluster_agent/setup/
{{% /tab %}}
{{< /tabs >}}


## 클러스터 성능

EKS 클러스터 성능에 대한 통찰을 얻으려면 [클러스터 점검 실행기][14]를 활성화하여 [`kube-state-metrics`][15] 서비스에서 메트릭을 수집하세요.

## 메트릭 수집

### 통합 메트릭

[애플리케이션 컨테이너의 자동탐지 레이블][16]을 사용하여 [지원되는 에이전트 통합][17]에 대한 메트릭을 수집하세요.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
     annotations:
      ad.datadoghq.com/<CONTAINER_NAME>.check_names: '[<CHECK_NAME>]'
      ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[<INIT_CONFIG>]'
      ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[<INSTANCE_CONFIG>]'
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<APPLICATION_NAME>"
       image: "<APPLICATION_IMAGE>"
     ## 에이전트를 사이드카로 실행
     - image: datadog/agent
       name: datadog-agent
       env:
       - name: DD_API_KEY
         value: "<YOUR_DATADOG_API_KEY>"
         ## Set DD_SITE를 "datadoghq.eu"로 설정하여
         ## Datadog EU 사이트에 에이전트 데이터 전송
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**참고**:

- `<YOUR_DATADOG_API_KEY>`를 [조직의 Datadog API 키][18]로 꼭 교체하세요.
- 컨테이너 메트릭은 호스트의 `cgroups` 볼륨을 에이전트에 마운트할 수 없으므로 Fargate에서 사용할 수 없습니다. [실시간 컨테이너][19] 보기는 CPU 및 메모리에 대해 0을 보고합니다.

### DogStatsD

컨테이너 에이전트의 포트 `8125` 컨테이너를 설정하여 애플리케이션 컨테이너에서 Datadog으로 [DogStatsD 메트릭][20]을 전달합니다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<APPLICATION_NAME>"
       image: "<APPLICATION_IMAGE>"
     ## 에이전트를 사이드카로 실행
     - image: datadog/agent
       name: datadog-agent
       ## DogStatsD 메트릭 수집용 8125 포트 활성화
       ports:
        - containerPort: 8125
          name: dogstatsdport
          protocol: UDP
       env:
       - name: DD_API_KEY
         value: "<YOUR_DATADOG_API_KEY>"
         ## DD_SITE를 "datadoghq.eu"로 설정하여
         ## Datadog EU 사이트로 에이전트 데이터 전송
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**참고**: `<YOUR_DATADOG_API_KEY>`를 [조직의 Datadog API 키][18]로 꼭 교체하세요.

### 실시간 컨테이너

Datadog 에이전트 v6.19 이상 버전은 EKS Fargate 통합의 실시간 컨테이너를 지원합니다. 실시간 컨테이너는 [컨테이너][19] 페이지에 표시됩니다.

### 실시간 프로세스

Datadog 에이전트 v6.19 이상 버전은 EKS Fargate 통합의 실시간 프로세스를 지원합니다. 실시간 프로세스는 [프로세스][21] 페이지에 표시됩니다. 실시간 프로세스를 활성화하려면 [파드 사양에서 shareProcessNamespace를 활성화][22]하세요.

### 쿠버네티스 리소스 보기

쿠버네티스(Kubernetes) 리소스 보기 데이터를 수집하려면 [클러스터 에이전트를 설정](#running-the-cluster-agent-or-the-cluster-checks-runner)해야 합니다.

## 로그 수집

### Fluent Bit로 Fargate의 EKS에서 로그를 수집합니다.

[Fluent Bit][23]를 사용하여 EKS 로그를 클라우드와치(CloudWatch) 로그로 라우팅, [Datadog 포워더(Forwarder)][24]를 사용하여 로그를 Datadog으로 라우팅해 EKS Fargate 로그를 모니터링합니다.

1. Fluent Bit를 설정하여 로그를 클라우드와치(CloudWatch)로 전송하고, 클라우드와치(CloudWatch) 로그를 출력값으로 지정하는 쿠버네티스(Kubernetes) ConfigMap을 생성합니다. ConfigMap으로 로그 그룹, 지역, 접두사 문자열, 로그 그룹 자동 생성 여부를 지정합니다.

   ```yaml
    kind: ConfigMap
    apiVersion: v1
    metadata:
      name: aws-logging
      namespace: aws-observability
    data:
      output.conf: |
        [OUTPUT]
            Name cloudwatch_logs
            Match   *
            region us-east-1
            log_group_name awslogs-https
            log_stream_prefix awslogs-firelens-example
            auto_create_group true
   ```
2. [Datadog 포워더(Forwarder)][24]를 사용하여 클라우드와치(CloudWatch) 로그를 수집하고 Datadog로 전송합니다.

## 트레이스 수집

컨테이너 에이전트의 포트 `8126` 컨테이너를 설정하여 애플리케이션 컨테이너에서 트레이스를 수집합니다. [트레이싱 설정 방법에 대한 자세한 내용을 확인하세요][25].

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     serviceAccountName: datadog-agent
     ## cgroup v2를 사용하여 원본 감지용 애플리케이션과 동일한 네임스페이스에 에이전트 배치
     shareProcessNamespace: true
     containers:
     - name: "<APPLICATION_NAME>"
       image: "<APPLICATION_IMAGE>"
     ## 에이전트를 사이드카로 실행
     - image: datadog/agent
       name: datadog-agent
       ## 트레이스 수집용 8126 포트 활성화:
        - containerPort: 8126
          name: traceport
          protocol: TCP
       env:
       - name: DD_API_KEY
         value: "<YOUR_DATADOG_API_KEY>"
         ## DD_SITE를 "datadoghq.eu"로 설정하여
         ## Datadog EU 사이트로 에이전트 데이터 전송
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_APM_ENABLED
         value: "true"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**참고**: `<YOUR_DATADOG_API_KEY>`를 [조직의 Datadog API 키][18]로 꼭 교체하세요.

## 이벤트 수집

AWS EKS Fargate API 서버에서 이벤트를 수집하려면 [EKS 클러스터 내부에서 Datadog 클러스터 에이전트](#running-the-cluster-agent-or-the-cluster-checks-runner)를 실행하고 [클러스터 에이전트 이벤트 수집][19]을 활성화합니다.

옵션으로 Datadog 클러스터 에이전트를 설정하여 클러스터 점검을 활성화하고 클러스터 점검 실행기를 배포합니다.

**참고**: Fargate의 파드에서 Datadog 클러스터 에이전트를 실행하면 이벤트를 수집할 수도 있습니다.

## 프로세스 수집

에이전트 6.19+/7.19+의 경우, [프로세스 수집][26] 기능을 사용할 수 있습니다. 파드 사양에서 `shareProcessNamespace`을 활성화하여 Fargate 파드에서 실행 중인 모든 프로세스를 수집하세요. 예시:

```
apiVersion: v1
kind: Pod
metadata:
  name: <NAME>
spec:
  shareProcessNamespace: true
...
```

**참고**: CPU 및 메모리 메트릭를 사용할 수 없습니다.

## 수집한 데이터

### 메트릭

eks_fargate 점검은 `pod_name` 및 `virtual_node` 태그를 지정한 하트비트(heartbeat) 메트릭 `eks.fargate.pods.running`을 제출하므로 실행 중인 파드 수를 추적할 수 있습니다.

### 서비스 점검

eks_fargate는 서비스 점검을 포함하지 않습니다.

### 이벤트

eks_fargate는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원][21]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [AWS Fargate 모니터링용 주요 메트릭][27]
- [AWS Fargate 워크로드에서 메트릭 및 로그를 수집하는 방법][28]
- [Datadog으로 AWS Fargate 모니터링][29]


[1]: http://docs.datadoghq.com/integrations/amazon_eks/
[2]: http://docs.datadoghq.com/integrations/system
[3]: https://docs.datadoghq.com/ko/getting_started/agent/autodiscovery/
[4]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[5]: http://docs.datadoghq.com/integrations/amazon_eks/#setup
[6]: http://docs.datadoghq.com/agent/kubernetes
[7]: http://docs.datadoghq.com/agent/kubernetes/daemonset_setup
[8]: https://app.datadoghq.com/account/settings#integrations/kubernetes
[9]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[10]: https://app.datadoghq.com/account/settings#integrations/amazon-eks
[11]: https://app.datadoghq.com/account/settings#integrations/amazon-ec2
[12]: http://docs.datadoghq.com/integrations/kubernetes
[13]: https://docs.datadoghq.com/ko/containers/cluster_agent/admission_controller/?tab=operator
[14]: https://docs.datadoghq.com/ko/containers/guide/clustercheckrunners
[15]: https://github.com/kubernetes/kube-state-metrics
[16]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[17]: https://docs.datadoghq.com/ko/integrations/#cat-autodiscovery
[18]: https://app.datadoghq.com/organization-settings/api-keys
[19]: https://app.datadoghq.com/containers
[20]: http://docs.datadoghq.com/tracing/setup
[21]: https://app.datadoghq.com/process
[22]: https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/
[23]: https://aws.amazon.com/blogs/containers/fluent-bit-for-amazon-eks-on-aws-fargate-is-here/
[24]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/forwarder/
[25]: http://docs.datadoghq.com/tracing/#send-traces-to-datadog
[26]: https://docs.datadoghq.com/ko/agent/kubernetes/daemonset_setup/?tab=k8sfile#process-collection
[27]: https://www.datadoghq.com/blog/aws-fargate-metrics/
[28]: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
[29]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/