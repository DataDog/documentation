---
aliases:
- /ko/infrastructure/containers/orchestrator_explorer
description: Datadog의 Kubernetes Explorer 페이지를 사용하여 포드 및 배포와 같은 Kubernetes 리소스를 모니터링합니다.
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: 블로그
  text: Kubernetes 오퍼레이터를 모니터링하여 애플리케이션을 원활하게 운영하기
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: 학습 센터
  text: Kubernetes Observability 시작하기
title: Kubernetes Explorer
---
{{< img src="infrastructure/livecontainers/orch_ex.png" alt="Kubernetes 포드를 보여주는 Kubernetes Explorer입니다." style="width:80%;">}}

Datadog의 [Kubernetes Explorer][1]를 사용하면 포드, 배포, 기타 Kubernetes 리소스의 상태를 모니터링할 수 있습니다. 배포 내 실패한 포드의 리소스 사양을 확인하고, 노드 활동을 관련 로그와 연결하고, 리소스 사용률을 추적하고, 워크로드를 자동으로 확장하며, 오류를 해결할 수 있습니다.

<div class="alert alert-info">Datadog Agent를 사용할 때 Kubernetes Explorer에는 Agent 7.27.0 이상 및 Cluster Agent 1.11.0 이상이 필요합니다. Kubernetes 1.25 이상을 사용하는 경우 Cluster Agent 7.40.0 이상이 필요합니다.</div>


## 구성 {#configuration}

### Kubernetes Explorer 활성화 {#enable-kubernetes-explorer}

Kubernetes Explorer는 대부분의 Datadog Agent 설치에서 **기본적으로 활성화**되어 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator를 사용하여 Datadog Agent를 설치하면 Kubernetes Explorer가 기본적으로 활성화됩니다.

Kubernetes Explorer가 활성화되어 있는지 확인하려면 `datadog-agent.yaml`에서 `features.orchestratorExplorer.enabled` 매개변수가 `true`로 설정되어 있는지 확인합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

[공식 Helm 차트][1]를 사용하여 Datadog Agent를 설치하면 Kubernetes Explorer가 기본적으로 활성화됩니다.

Kubernetes Explorer가 활성화되어 있는지 확인하려면 `datadog-values.yaml` 파일에서 `orchestratorExplorer.enabled` 매개변수가 `true`로 설정되어 있는지 확인합니다.

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

그런 다음 Helm 차트를 업그레이드합니다.

[1]: https://github.com/DataDog/helm-charts

{{% /tab %}}
{{% tab "수동" %}}
수동 설정은 [DaemonSet으로 Kubernetes Explorer 설정][1]을 참조하세요.

[1]: /ko/infrastructure/faq/set-up-orchestrator-explorer-daemonset

{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

Datadog Agent 대신 네이티브 OpenTelemetry 파이프라인을 사용하여 Kubernetes Explorer를 채울 수 있습니다. 이 설정은 [`k8sobjects`][1] 수신기를 사용하여 Kubernetes 리소스 데이터를 수집하고 [Datadog Exporter][2]의 Orchestrator Explorer 기능을 통해 전달합니다.

#### 전제 조건 {#prerequisites}

- OpenTelemetry Collector Contrib [v0.154.0][3] 이상.
- OpenTelemetry Collector [Helm 차트][4] v0.156.2 이상.

#### 제한 사항 {#limitations}

오픈 소스 `k8sobjects` 수신기는 클러스터의 Kubernetes API 서버에 상당한 부하를 줄 수 있습니다.

권장 사항:

- API 서버 영향을 줄이는 [스트리밍 목록 개선 사항][5]이 포함된 Kubernetes 1.33 이상을 사용합니다.
- 더 작은 클러스터로 시작합니다. 시작점으로 리소스 유형당 객체 수를 5,000개 미만으로 제한하고 클러스터 상태를 모니터링하면서 점진적으로 확장합니다.

다음 단계에서는 Kubernetes Explorer에 필요한 구성 요소를 살펴봅니다. Kubernetes 인프라 메트릭도 수집하는 전체 참조 예시는 [Kubernetes 메트릭][6]을 참조하세요.

#### 1. Datadog API 키 시크릿 생성 {#1-create-a-datadog-api-key-secret}

Datadog API 키를 저장할 Kubernetes 시크릿을 생성합니다.

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
```

#### 2. 클러스터 Collector 구성 {#2-configure-the-cluster-collector}

이 설정은 OTel Collector를 Kubernetes Deployment로 배포합니다. `deployment-collector.yaml` 파일을 생성하여 다음 구성 블록을 포함하거나 기존 OpenTelemetry Collector 값 파일에 병합합니다.

##### Collector 이미지 및 모드 {#collector-image-and-mode}

Contrib 배포를 사용하여 Collector를 단일 복제본 Deployment로 실행하도록 설정합니다.

```yaml
mode: deployment
replicaCount: 1

image:
  repository: otel/opentelemetry-collector-contrib
  tag: 0.154.0
  pullPolicy: IfNotPresent

extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        name: datadog-secret
        key: api-key
```

##### Kubernetes 객체 수집 {#kubernetes-objects-collection}

`kubernetesObjects` [프리셋][4]은 Kubernetes Explorer를 채우는 데 필요한 서비스 계정, RBAC 권한 및 `k8sobjects` 수신기 기본값을 자동으로 프로비저닝합니다. Kubernetes Explorer에 필요한 수신기(`interval`)를 재정의(`3m`)합니다.

```yaml
presets:
  kubernetesObjects:
    enabled: true
    watch: true

config:
  receivers:
    k8sobjects:
      interval: 3m
```

##### Datadog Exporter {#datadog-exporter}

Datadog Exporter에서 `orchestrator_explorer` 옵션을 활성화합니다. 이 설정은 Kubernetes 객체 데이터를 Kubernetes Explorer로 보냅니다. `<YOUR_DATADOG_SITE>` 항목을 [Datadog 사이트][7]로 바꿉니다.

```yaml
config:
  exporters:
    datadog:
      api:
        site: <YOUR_DATADOG_SITE>
        key: ${env:DD_API_KEY}
      orchestrator_explorer:
        enabled: true
```

##### 프로세서 및 파이프라인 {#processors-and-pipeline}

클러스터 UID와 이름을 감지하려면 [`resourcedetection`][8] 프로세서를 추가합니다.

- 클러스터 UID(`k8s.cluster.uid`)를 감지하려면 `k8s_api` 감지기가 필요합니다.
- 클러스터 이름 감지는 클라우드 공급자에 따라 다릅니다. 지원되는 공급자(EKS, AKS, GCP) 및 필요한 권한은 [`resourcedetection` 프로세서 문서][8]를 확인합니다.
- 공급자가 지원되지 않는 경우 `resource/add-cluster-name` 프로세서를 사용하여 클러스터 이름을 수동으로 설정합니다. `<YOUR_CLUSTER_NAME>` 항목을 클러스터 이름으로 바꿉니다.

그런 다음 `logs` 파이프라인에서 구성 요소를 연결합니다.

다음 예시는 두 가지 접근 방식을 보여줍니다. EKS, AKS 또는 GCP에서 실행하는 경우 클라우드 공급자 예시를 사용합니다. 공급자가 지원되지 않는 경우 수동 대체를 사용합니다.

**클라우드 공급자 감지(EKS 예시):**

```yaml
  processors:
    resourcedetection:
      detectors: [k8s_api, eks]
      override: false
      eks:
        resource_attributes:
          k8s.cluster.name:
            enabled: true

  service:
    pipelines:
      logs:
        receivers: [k8sobjects]
        processors: [resourcedetection]
        exporters: [datadog]
```

`eks` 항목을 공급자의 감지기(`aks`, `gcp`)로 바꿉니다. 공급자별 구성은 [`resourcedetection` 프로세서 문서][8]를 참조합니다.

**수동 대체:**

`resourcedetection` 프로세서가 클라우드 공급자를 지원하지 않는 경우 클러스터 이름을 수동으로 설정합니다. `<YOUR_CLUSTER_NAME>` 항목을 클러스터 이름으로 바꿉니다.

```yaml
  processors:
    resourcedetection:
      detectors: [k8s_api]
      override: false
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: <YOUR_CLUSTER_NAME>
          action: upsert

  service:
    pipelines:
      logs:
        receivers: [k8sobjects]
        processors: [resourcedetection, resource/add-cluster-name]
        exporters: [datadog]
```

#### 3. Helm으로 배포 {#3-deploy-with-helm}

구성 파일을 사용하여 OpenTelemetry Collector를 설치합니다.

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm install deployment-collector open-telemetry/opentelemetry-collector \
  --values ./deployment-collector.yaml
```

#### 4. 설치 확인 {#4-verify-the-installation}

[Kubernetes Explorer][9]를 열고 OpenTelemetry 클러스터 이름으로 필터링합니다. 모든 핵심 Kubernetes 리소스 섹션과 **커스텀 리소스 > CRD**가 채워져야 합니다. **커스텀 리소스 > 리소스** 섹션은 이 설정에서 지원되지 않습니다.

#### 5. Kubernetes Explorer와 로그, 메트릭 및 트레이스 연결(선택 사항) {#5-correlate-logs-metrics-and-traces-with-kubernetes-explorer-optional}

Kubernetes 리소스와 관련 로그, 메트릭 및 트레이스 간에 이동하려면 기존 수집기 파이프라인에 [`k8sattributes`][10] 및 [`resourcedetection`][8] 프로세서를 추가합니다. `resourcedetection` 구성은 위의 [프로세서 및 파이프라인](#processors-and-pipeline)을 참조하세요.

```yaml
processors:
  k8sattributes:
    auth_type: "serviceAccount"
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.namespace.name
        - k8s.node.name
        - k8s.replicaset.name
        - k8s.statefulset.name
        - k8s.daemonset.name
        - k8s.cronjob.name
        - k8s.job.name
        - k8s.container.name
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.uid
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
      - sources:
          - from: resource_attribute
            name: k8s.pod.name
          - from: resource_attribute
            name: k8s.namespace.name
      - sources:
          - from: connection

service:
  pipelines:
    logs:
      processors: [k8sattributes, resourcedetection, ...]
    metrics:
      processors: [k8sattributes, resourcedetection, ...]
    traces:
      processors: [k8sattributes, resourcedetection, ...]
```

전체 참조 예시는 [DaemonSet 수집기 구성][11]을 참조하세요.

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/k8sobjectsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.154.0
[4]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/opentelemetry-collector-0.156.2/charts/opentelemetry-collector
[5]: https://kubernetes.io/blog/2025/05/09/kubernetes-v1-33-streaming-list-responses/
[6]: /ko/opentelemetry/integrations/kubernetes_metrics/#setup
[7]: /ko/getting_started/site/
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor
[9]: https://app.datadoghq.com/orchestration/overview
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor
[11]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/daemonset-collector.yaml

{{% /tab %}}
{{% tab "OpenTelemetry Kube Stack" %}}

Datadog Agent 대신 `opentelemetry-kube-stack` Helm 차트를 사용하여 Kubernetes Explorer를 채울 수 있습니다.

[`opentelemetry-kube-stack`][1] Helm 차트는 OpenTelemetry Operator를 설치하고 수집기를 `OpenTelemetryCollector` 커스텀 리소스(CR)로 관리합니다. Datadog은 두 개의 수집기를 구성하는 참조 [`values.yaml`][2]를 유지 관리합니다.

- **`cluster`** (Deployment): kube-state-metrics를 수집하고, Kubernetes 객체를 감시하며, `orchestrator_explorer`를 활성화하여 Kubernetes Explorer를 채웁니다.
- **`daemon`** (DaemonSet): 호스트 및 kubelet 메트릭을 수집하고 애플리케이션 텔레메트리 데이터를 위한 OTLP 엔드포인트를 노출합니다.

#### 전제 조건 {#prerequisites-1}

- OpenTelemetry Kube Stack Helm 차트 [0.20.1][3] 이상.
- OpenTelemetry Collector Contrib [v0.154.0][4] 이상(참조 값 파일에 의해 고정됨).
- cert-manager(Operator의 어드미션 웹훅에 필요).

#### 제한 사항 {#limitations-1}

오픈 소스 `k8sobjects` 수신기는 클러스터의 Kubernetes API 서버에 상당한 부하를 줄 수 있습니다.

권장 사항:

- API 서버 영향을 줄이는 [스트리밍 목록 개선 사항][5]이 포함된 Kubernetes 1.33 이상을 사용합니다.
- 더 작은 클러스터로 시작합니다. 시작점으로 리소스 유형당 객체 수를 5,000개 미만으로 제한하고 클러스터 상태를 모니터링하면서 점진적으로 확장합니다.

#### 빠른 시작(대화형 설치 프로그램) {#quickstart-interactive-installer}

[`opentelemetry-examples`][6] 저장소는 아래의 모든 단계를 처리하는 대화형 설치 프로그램을 제공합니다. `guides/kubernetes/configuration/opentelemetry-kube-stack/`에서:

```sh
./install
```

설치 프로그램은 Datadog API 키, [Datadog 사이트][7], Kubernetes 플랫폼 및 배포 환경을 묻습니다. EKS, GKE 및 AKS의 경우 일치하는 리소스 감지 프리셋을 활성화합니다. 다른 플랫폼의 경우 클러스터 이름을 묻습니다. 그런 다음 `opentelemetry-operator-system` 네임스페이스와 `datadog-secret`을 생성하고, 필요한 경우 cert-manager를 설치하며, 차트를 설치하거나 업그레이드합니다.

#### 값 파일을 사용하여 설치 {#install-with-values-files}

위의 대화형 설치 프로그램을 사용하지 않은 경우 아래 단계에 따라 수동으로 설치하세요.

##### 1. cert-manager 설치(아직 없는 경우) {#1-install-cert-manager-if-not-already-present}

```sh
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager --create-namespace \
  --set crds.enabled=true
```

##### 2. Datadog 시크릿 생성 {#2-create-the-datadog-secret}

`DD_SITE`를 [Datadog 사이트][7](기본값 `datadoghq.com`)로 설정:

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
export DD_SITE="datadoghq.com"  # for example us3.datadoghq.com, datadoghq.eu

kubectl create namespace opentelemetry-operator-system \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic datadog-secret \
  --namespace opentelemetry-operator-system \
  --from-literal="api-key=$DD_API_KEY" \
  --from-literal="dd-site=$DD_SITE" \
  --dry-run=client -o yaml | kubectl apply -f -
```

##### 3. 배포 오버레이 생성 {#3-create-a-deployment-overlay}

참조 `values.yaml`은 기본이며, 배포별 설정(클러스터 플랫폼, 환경, 클러스터 이름)은 오버레이 파일에 있습니다. `guides/kubernetes/configuration/opentelemetry-kube-stack/`에서 플랫폼과 일치하는 예시를 복사합니다.

```sh
mkdir -p deployment

# EKS, GKE, or AKS (resource detector auto-populates k8s.cluster.name):
cp examples/eks-deployment/values.yaml deployment/values.yaml
cp examples/gcp-deployment/values.yaml deployment/values.yaml
cp examples/aks-deployment/values.yaml deployment/values.yaml

# Other platforms (set the cluster name manually):
cp examples/manually-set-k8s-cluster-name/values.yaml deployment/values.yaml
```

EKS/GKE/AKS가 아닌 플랫폼의 경우 `deployment/values.yaml`을 편집하고 `my_k8s_cluster` 및 `production`을 클러스터 이름과 배포 환경으로 바꿉니다.

##### 4. 참조 컬렉터 배포 {#4-deploy-the-reference-collectors}

기본 `values.yaml` 및 오버레이를 모두 사용하여 차트를 설치하거나 업그레이드합니다.

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm upgrade --install opentelemetry-kube-stack \
  open-telemetry/opentelemetry-kube-stack \
  --namespace opentelemetry-operator-system \
  --values ./values.yaml \
  --values ./deployment/values.yaml
```

두 컬렉터 모두 기본적으로 `500m` CPU 및 `1Gi` 메모리 제한과 `200m` CPU 및 `500Mi` 메모리 요청으로 설정됩니다. 대규모 클러스터의 경우 확장합니다.

#### 설치 확인 {#verify-the-installation}

[Kubernetes Explorer][8]를 열고 클러스터 이름으로 필터링합니다. 모든 핵심 Kubernetes 리소스 섹션과 **커스텀 리소스 > CRD**가 채워져야 합니다. **커스텀 리소스 > 리소스** 섹션은 이 설정에서 지원되지 않습니다.

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-kube-stack
[2]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/opentelemetry-kube-stack/values.yaml
[3]: https://github.com/open-telemetry/opentelemetry-helm-charts/releases/tag/opentelemetry-kube-stack-0.20.1
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.154.0
[5]: https://kubernetes.io/blog/2025/05/09/kubernetes-v1-33-streaming-list-responses/
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/guides/kubernetes/configuration/opentelemetry-kube-stack
[7]: /ko/getting_started/site/
[8]: https://app.datadoghq.com/orchestration/overview

{{% /tab %}}
{{< /tabs >}}

### 리소스에 커스텀 태그 추가 {#add-custom-tags-to-resources}

필터링을 쉽게 하려면 `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 환경 변수를 통해 Kubernetes 리소스에 커스텀 태그를 추가할 수 있습니다. **이 태그는 Kubernetes Explorer에만 나타납니다.**

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml`에서 `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 환경 변수를 **두 번** 설정합니다.
- `agents.containers.processAgent.env`에서
- `clusterAgent.env` 에서

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    liveContainerCollection:
      enabled: true
    orchestratorExplorer:
      enabled: true
  override:
    agents:
      containers:
        processAgent:
          env:
            - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
              value: "tag1:value1 tag2:value2"
    clusterAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
```

그런 다음 새로운 구성을 적용합니다.

```bash
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-agent.yaml`에서 `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 환경 변수를 **두 번** 설정합니다.
- `processAgent.env`에서
- `clusterAgent.env` 에서

```yaml
agents:
  containers:
    processAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
clusterAgent:
  env:
    - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
      value: "tag1:value1 tag2:value2"
```

그런 다음 Helm 차트를 업그레이드합니다.

{{% /tab %}}
{{% tab "DaemonSet" %}}

프로세스 에이전트와 클러스터 에이전트 컨테이너 모두에서 환경 변수를 설정합니다.

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

## 사용 방법 {#usage}

### 보기 {#views}

페이지 왼쪽 상단에 있는 {{< ui >}}Select Resources{{< /ui >}} 드롭다운 메뉴에서 {{< ui >}}Pods{{< /ui >}}, {{< ui >}}Clusters{{< /ui >}}, {{< ui >}}Namespaces{{< /ui >}} 및 기타 Kubernetes 리소스 간에 전환합니다.

이러한 각 보기에는 상태, 이름, Kubernetes 레이블과 같은 필드별로 데이터를 더 잘 구성할 수 있도록 돕는 데이터 표와 포드 및 Kubernetes 클러스터의 전체적인 모습을 보여주는 상세 클러스터 맵이 포함되어 있습니다.

**이러한 보기를 필터링하는 방법에 대한 자세한 내용은 [쿼리 필터 세부 정보](#query-filter-details)를 참조하세요.**

{{< img src="infrastructure/livecontainers/orch_ex_replicasets.png" alt="Orchestrator Explorer가 요약 모드에서 Workloads > Replica Sets를 표시하도록 열렸습니다." style="width:80%;">}}

#### 기능 및 패싯별로 그룹화 {#group-by-functionality-and-facets}

태그, Kubernetes 레이블 또는 Kubernetes 주석별로 포드를 그룹화하여 정보를 더 빠르게 찾을 수 있는 집계된 조회를 확인합니다. 페이지 오른쪽 상단에 있는 '그룹화(Group by)' 막대를 사용하거나 특정 태그 또는 레이블을 클릭하고 아래와 같이 컨텍스트 메뉴에서 그룹화 기능을 찾아 그룹화를 수행할 수 있습니다.

{{< img src="infrastructure/livecontainers/orch_ex_groupby.png" alt="팀별 그룹화 예시" style="width:80%;">}}

페이지 왼쪽에 있는 패싯을 사용하여 리소스를 그룹화하거나 CrashLoopBackOff 포드 상태의 포드와 같이 가장 중요한 리소스를 필터링할 수도 있습니다.

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="CrashLoopBackOff 포드 상태 그룹화 예시" video=true style="width:80%;">}}

### 클러스터 맵 {#cluster-map}

클러스터 맵은 포드와 Kubernetes 클러스터의 전체적인 모습을 보여줍니다. 사용자 지정 그룹 및 필터를 사용하여 한 화면에서 모든 리소스를 함께 볼 수 있으며, 노드의 색상을 채울 메트릭을 선택할 수 있습니다.

상세 패널을 채우려면 클러스터 맵에서 원이나 그룹을 클릭하여 리소스를 살펴봅니다.

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="사용자 지정 그룹 및 필터가 적용된 클러스터 맵" video=true style="width:80%;">}}

### 정보 패널 {#information-panel}

표의 행이나 클러스터 맵의 개체를 클릭하면 사이드 패널에서 특정 리소스에 대한 정보를 볼 수 있습니다.

{{< img src="infrastructure/livecontainers/orch_ex_panel.png" alt="프로세스가 열려 있는 사이드 패널의 리소스 보기" style="width:80%;">}}

사이드 패널의 {{< ui >}}YAML{{< /ui >}} 탭에는 전체 리소스 정의가 표시됩니다. **Agent 버전 7.44.0**부터는 7일간의 정의 기록도 포함됩니다. 시간 경과에 따른 변경 사항 및 서로 다른 버전 간에 무엇이 변경되었는지 비교할 수 있습니다. 표시된 시간은 변경 사항이 리소스에 적용된 대략적인 시간입니다.

관련 없는 변경 사항이 너무 많이 표시되는 것을 방지하기 위해 다음 필드에만 영향을 주는 업데이트는 무시됩니다,

* metadata.resourceVersion
* metadata.managedFields
* metadata.generation
* metadata.annotations["kubernetes.io/config.seen"]
* status

{{< img src="infrastructure/livecontainers/orch_ex_manifest_history.png" alt="yaml 기록 기능이 표시된 사이드 패널의 리소스 보기" style="width:80%;">}}

다른 탭에는 선택한 리소스의 문제를 해결하기 위한 추가 정보가 표시됩니다.

* [**로그**][2]: 컨테이너 또는 리소스에서 로그를 확인합니다. 로그를 클릭하여 로그 탐색기에서 관련 로그를 확인합니다.
* [**APM**][3]: 트레이스의 날짜, 서비스, 기간, 방법, 상태 코드를 포함하여 컨테이너 또는 리소스에서 트레이스를 확인합니다.
* [**메트릭**][4]: 컨테이너 또는 리소스에 대한 실시간 메트릭을 조회합니다. 이 탭에서 그래프를 전체 화면으로 보거나, 스냅샷을 공유하거나, 내보낼 수 있습니다.
* {{< ui >}}Processes{{< /ui >}}: 이 리소스의 컨테이너에서 실행 중인 모든 프로세스를 조회합니다.
* {{< ui >}}Network{{< /ui >}}: 소스, 대상, 전송 및 수신 볼륨, 처리량 필드를 포함하여 컨테이너 또는 리소스의 네트워크 성능을 조회합니다. {{< ui >}}Destination{{< /ui >}} 필드를 사용하여 `DNS` 또는 `ip_type`과 같은 태그로 검색하거나, 이 조회에서 {{< ui >}}Group by{{< /ui >}} 필터를 사용하여 `pod_name` 또는 `service`와 같은 태그별로 네트워크 데이터를 그룹화할 수 있습니다.
* [**이벤트**][5]: 리소스에 대한 모든 Kubernetes 이벤트를 조회합니다.
* {{< ui >}}Monitors{{< /ui >}}: 이 리소스에 대해 태그가 지정되거나, 범위가 지정되거나, 그룹화된 모니터를 조회합니다.

이 리소스에 대한 자세한 대시보드를 보려면 이 패널의 오른쪽 상단에 있는 대시보드 보기를 클릭합니다.

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="Live Containers 개요에서 포드 대시보드로 연결되는 링크" style="width:80%;">}}

### 리소스 사용률 {#resource-utilization}

_리소스 사용률 페이지는 [리소스 사용률][6]을 참조하세요_.

Kubernetes Explorer 탭 내에서 리소스 사용률 메트릭을 선택하여 탐색할 수 있습니다.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization.png" alt="컨테이너 리소스 사용률" style="width:80%;">}}

이 모든 열은 정렬을 지원하므로 리소스 사용률을 기준으로 개별 워크로드를 정확하게 파악할 수 있습니다.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization_sorted_column.png" alt="컨테이너 리소스 사용률 정렬 열" style="width:50%;">}}

## 쿼리 필터 세부 정보 {#query-filter-details}

페이지 왼쪽 상단에 있는 '필터링(Filter by)' 검색창에 쿼리를 입력하여 표시되는 리소스를 좁힐 수 있습니다.

### 구문 {#syntax}

쿼리 필터는 용어와 연산자로 구성됩니다. 예:

{{< img src="infrastructure/livecontainers/orch_syntax.png" alt="Orchestrator Explorer 쿼리 필터 구문." style="width:80%;">}}

#### 용어 {#terms}

사용 가능한 여러 유형의 용어가 있습니다.

| 유형 | 예시 |
|---|---|
| **태그**: [데이터를 수집하는 Agent][7]에 의해 리소스에 연결됩니다. Datadog이 Kubernetes 리소스에 대해 생성하는 추가 태그도 있습니다. | `datacenter:staging`, `tag#datacenter:staging`<br>_(`tag#`은 선택 사항입니다)_ |
| **레이블**: [리소스 메타데이터][8]에서 추출됩니다. 일반적으로 클러스터를 구성하고 선택기를 사용하여 특정 리소스를 타겟팅하는 데 사용됩니다. | `label#chart_version:2.1.0` |
| **주석**: [리소스 메타데이터][9]에서 추출됩니다. 일반적으로 클러스터 관리를 지원하는 도구를 보조하는 데 사용됩니다. | `annotation#checksum/configmap:a1bc23d4` |
| **메트릭**: 워크로드 리소스(포드, 디플로이먼트 등)에 추가됩니다. 사용률을 기준으로 리소스를 찾을 수 있습니다. 지원되는 메트릭을 확인하려면 [리소스 사용률 필터](#resource-utilization-filters)를 참조하세요. | `metric#cpu_usage_pct_limits_avg15:>80%` |
| **문자열 일치**: 일부 특정 리소스 속성에서 지원됩니다. 아래를 참조하세요.<br>_참고: 문자열 일치는 키-값 형식을 사용하지 않으며, 일치시킬 속성을 지정할 수 없습니다._ | `"10.132.6.23"` (IP),<br>`"9cb4b43f-8dc1-4a0e"` (UID),<br>`web-api-3` (이름) |
| **필드**: [리소스 메타데이터][10] 또는 커스텀 리소스의 인덱싱된 필드에서 추출됩니다. | `field#metadata.creationTimestamp:>=4wk`, `field#metadata.deletionTimestamp:<=1hr`, `field#status.currentReplicas:3`, `field#status.conditions.Active.status:True` |

>  ***참고**: 동일한 키-값 쌍이 태그와 레이블(또는 주석)로 모두 존재할 수 있습니다. 이는 클러스터의 구성 방식에 따라 다릅니다.*

다음 리소스 속성은 임의의 **문자열 일치**에서 지원됩니다.
- `metadata.name`
- `metadata.uid`
- 다음에서 발견된 IP 주소:
  - 포드
  - 노드(내부 및 외부)
  - 서비스(클러스터, 외부 및 로드 밸런서 IP)

이름이나 IP로 리소스를 검색하기 위해 키를 지정할 필요는 없습니다. 문자열 검색에 특정 특수 문자가 포함되지 않는 한 따옴표는 필요하지 않습니다.

#### 비교 연산자 {#comparators}

모든 용어는 `:` 등가 연산자를 지원합니다. [메트릭 값](#resource-utilization-filters) 용어는 숫자 비교도 지원합니다.

- `:>` 초과(예: `metric#cpu_usage_avg15:>0.9`)
- `:>=` 이상
- `:<` 미만
- `:<=` 이하

#### 연산자 {#operators}

여러 용어를 복잡한 쿼리로 결합하려면, 대소문자를 구분하는 다음 부울 연산자를 사용할 수 있습니다.

| 연산자 | 설명 | 예시 |
|---|---|---|
| `AND` | **교집합**: 두 용어 모두 선택한 이벤트에 존재합니다(추가된 것이 없으면 AND가 기본적으로 적용됨). | `a AND b`   |
| `OR` | **합집합**: 두 용어 중 하나가 선택한 이벤트에 포함되어 있습니다.                                             | `a OR b`   |
| `NOT` / `-` | **제외**: 다음 용어가 이벤트에 존재하지 않습니다(개별 원본 텍스트 검색에 적용됨). | `a AND NOT b` 또는<br>`a AND -b` |
|  `( )` | **그룹화:** 용어를 논리적으로 그룹화하는 방법을 지정합니다. | `a AND (b OR c)` 또는<br>`(a AND b) or c` |

##### `OR` 값 약어 {#or-value-shorthand}

동일한 키를 공유하는 여러 용어는 모두 `OR` 연산자를 사용하는 경우 단일 용어로 결합할 수 있습니다. 예를 들어, 이 쿼리의 경우:

```
app_name:web-server OR app_name:database OR app_name:event-consumer
```

다음과 같이 줄일 수 있습니다.

```
app_name:(web-server OR database OR event-consumer)
```

### 와일드카드 {#wildcards}

`*` 와일드카드를 용어의 일부로 사용하여 값과 키 모두에 대해 부분 일치로 필터링할 수 있습니다. 몇 가지 예:

- `kube_job:stats-*`: `kube_deployment` 항목으로 시작하는 `stats-` 태그 값을 가진 모든 리소스를 찾습니다.
- `pod_name:*canary`: `pod_name` 항목으로 끝나는 `canary` 값을 가진 모든 리소스를 찾습니다.
- `label#release:*`: 값에 상관없이 `release` 레이블이 있는 모든 리소스를 찾습니다.
- `-label#*.datadoghq.com/*`: Datadog 범위 레이블이 없는 리소스를 찾습니다.
- `kube_*:*stats*canary`: 값 중간에 `stats` 항목이 포함되고 `canary` 항목으로 끝나는 관련 리소스 태그(`kube_*`)가 있는 리소스를 찾습니다.

### 추출된 태그 {#extracted-tags}

Datadog Agent 내에서 [구성][7]한 태그 외에도, Datadog은 검색 및 그룹화 요구 사항에 도움이 될 수 있는 리소스 속성을 기반으로 생성된 태그를 삽입합니다. 이러한 태그는 관련이 있을 때 조건부로 리소스에 추가됩니다.

#### 모든 리소스 {#all-resources}

모든 리소스에는 `kube_cluster_name` 태그가 있고 모든 네임스페이스 리소스에는 `kube_namespace` 태그가 추가됩니다.

또한 리소스에는 `kube_<api_kind>:<metadata.name>` 태그가 포함됩니다. 예를 들어, `web-server-2`라는 이름의 배포에는 `kube_deployment:web-server-2` 태그가 자동으로 추가됩니다.

> **참고**: 이 패턴에는 몇 가지 예외가 있습니다.
>
> - 포드는 대신 `pod_name` 항목을 사용합니다.
> - *VPA: `verticalpodautoscaler`*.
> - *HPA: `horizontalpodautoscaler`*.
> - *Persistent Volume Claims: `persistentvolumeclaim`*.

리소스에 첨부된 레이블을 기반으로 다음 태그도 추출됩니다.

| 태그 | 소스 레이블 |
|---|---|
| `kube_app_name` | `app.kubernetes.io/name` |
| `kube_app_instance` | `app.kubernetes.io/instance` |
| `kube_app_version` | `app.kubernetes.io/version` |
| `kube_app_component` | `app.kubernetes.io/component` |
| `kube_app_part_of` | `app.kubernetes.io/part-of` |
| `kube_app_managed_by` | `app.kubernetes.io/managed-by` |
| `env` | `tags.datadoghq.com/env` |
| `version` | `tags.datadoghq.com/version` |
| `service` | `tags.datadoghq.com/service` |

#### 연관성 {#relationships}

관련 리소스는 서로 태그가 지정됩니다. 몇 가지 예:

- 'XYZ' 배포의 일부인 포드에는 `kube_deployment:xyz` 태그가 지정됩니다.
- 서비스 'A'를 가리키는 수신에는 `kube_service:a` 태그가 지정됩니다.

'상위' 리소스에서 생성된 리소스에는 `kube_ownerref_kind` 및 `kube_ownerref_name` 태그(예: 포드 및 작업)가 지정됩니다.

> **팁:** 필터 쿼리 자동 완성 기능을 활용하여 사용 가능한 관련 리소스 태그를 확인하세요. `kube_` 항목을 입력하고 어떤 결과가 제안되는지 확인하세요.

#### 포드 {#pods}

포드에는 다음 태그가 지정됩니다.

- `pod_name`
- `pod_phase`(매니페스트에서 추출됨)
- `pod_status`(`kubectl`과 유사하게 계산됨)

#### 워크로드 {#workloads}

워크로드 리소스(포드, 배포, 스테이트풀셋 등)에는 리소스 사용률 페이지 내에서의 지원 여부를 나타내는 다음 태그가 지정됩니다.

- `resource_utilization`(`supported` 또는 `unsupported`)
- `missing_cpu_requests`
- `missing_cpu_limits`
- `missing_memory_requests`
- `missing_memory_limits`

#### 조건 {#conditions}

일부 리소스의 특정 조건은 태그로 추출됩니다. 예를 들어, 배포에서 `kube_condition_available` 태그를 찾을 수 있습니다. 태그는 항상 `kube_condition_<name>` 형식이며 `true` 또는 `false` 값을 가집니다.

> **팁**: 자동 완성 기능을 사용하여 특정 리소스 유형에서 사용 가능한 조건이 무엇인지 확인하려면 `kube_condition` 항목을 입력하고 결과를 검토하세요.

#### 리소스별 태그 {#resource-specific-tags}

일부 리소스에는 클러스터의 환경에 따라 추출되는 특정 태그가 있습니다. 위의 공유 태그 외에도 다음 태그를 사용할 수 있습니다.

| 리소스 | 추출된 태그 |
|---|---|
| **클러스터** | `api_server_version`<br>`kubelet_version` |
| **커스텀 리소스 정의** 및 <br>**커스텀 리소스** | `kube_crd_kind`<br>`kube_crd_group`<br>`kube_crd_version`<br>`kube_crd_scope`<br>`kube_crd_resource` |
| **네임스페이스** | `phase` |
| **노드** | `kube_node_unschedulable`<br>`kube_node_kubelet_version`<br>`kube_node_kernel_version`<br>`kube_node_runtime_version`<br>`eks_fargate_node`<br>`node_schedulable`<br>`node_status` |
| **Persistent Volume** | `kube_reclaim_policy`<br>`kube_storage_class_name`<br>`pv_type`<br>`pv_phase` |
| **Persistent Volume Claim** | `pvc_phase`<br>`kube_storage_class_name` |
| **포드** | `pod_name` (`kube_pod` 대신) <br>`pod_phase`(매니페스트에서 추출됨) <br>`pod_status`(`kubectl`과 유사하게 계산됨) |
| **서비스** | `kube_service_type`<br>`kube_service_port` |

### 리소스 사용률 필터 {#resource-utilization-filters}

다음 워크로드 리소스는 리소스 사용률 메트릭으로 보강됩니다.

- 클러스터
- 노드
- 포드

이 메트릭은 수집 시점에 지난 15분 동안의 평균값을 기준으로 계산됩니다. 다음과 같이 메트릭 값으로 필터링할 수 있습니다. `metric#<metric_name><comparator><numeric_value>`.

- `metric_name` 항목은 사용 가능한 메트릭입니다(아래 참조).
- `comparator` 항목은 지원되는 [비교 연산자](#comparator)입니다.
- 및 `numeric_value` 항목은 부동 소수점 값입니다.

포드의 경우 다음 메트릭 이름을 사용할 수 있습니다.

| CPU | 메모리 |
|---|---|
| `cpu_limits_avg15` | `mem_limits_avg15` |
| `cpu_requests_avg15` | `mem_requests_avg15` |
| `cpu_usage_avg15` | `mem_usage_avg15` |
| `cpu_usage_pct_limits_avg15` | `mem_usage_pct_limits_avg15` |
| `cpu_usage_pct_requests_avg15` | `mem_usage_pct_requests_avg15` |
| `cpu_waste_avg15` | `mem_waste_avg15` |

또한 클러스터와 노드에서 다음 메트릭을 사용할 수 있습니다.

- `cpu_usage_pct_alloc_avg15`
- `cpu_requests_pct_alloc_avg15`
- `mem_usage_pct_alloc_avg15`
- `mem_requests_pct_alloc_avg15`

#### 메트릭 단위 {#metric-units}

CPU 메트릭은 코어 수로 저장됩니다.

메모리 메트릭은 바이트 단위로 저장됩니다.

백분율(`*_pct_*`)은 부동 소수점으로 저장되며, `0.0`은 0%, `1.0`은 100%입니다. 값은 표시된 두 메트릭의 비율입니다. 예를 들어 `cpu_usage_pct_limits_avg15`는 `usage / limits`의 값입니다. 요청의 CPU 사용률과 같은 메트릭 값은 100%를 초과할 수 있습니다.

## 참고 사항 및 이슈 {#notes-and-known-issues}

* 데이터는 일정한 간격으로 자동 업데이트됩니다.
* 1000개 이상의 배포 또는 레플리카셋이 있는 클러스터에서는 Cluster Agent의 CPU 사용량이 증가할 수 있습니다. Helm 차트에서 컨테이너 스크러빙을 비활성화하는 옵션이 있습니다. 자세한 내용은 [Helm 차트 저장소][11]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/overview
[2]: /ko/logs
[3]: /ko/tracing
[4]: /ko/metrics
[5]: /ko/events
[6]: /ko/infrastructure/containers/kubernetes_resource_utilization
[7]: /ko/getting_started/tagging/assigning_tags/?tab=containerizedenvironments
[8]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
[9]: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors/
[11]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog