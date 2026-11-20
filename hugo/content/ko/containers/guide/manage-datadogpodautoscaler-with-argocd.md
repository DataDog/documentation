---
description: ArgoCD와 GitOps를 사용하여 Kubernetes 오토스케일링을 위한 DatadogPodAutoscaler 사용자 지정
  리소스를 배포하고 관리합니다.
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-autoscaling-datadog/
  tag: 블로그
  text: 'Kubernetes 오토스케일링 가이드: 사용 사례에 적합한 솔루션 선택 방법'
- link: https://docs.datadoghq.com/containers/monitoring/autoscaling/
  tag: 설명서
  text: Datadog Kubernetes Autoscaling
- link: https://docs.datadoghq.com/agent/cluster_agent/
  tag: 설명서
  text: Datadog Cluster Agent
- link: https://argo-cd.readthedocs.io/
  tag: 외부 사이트
  text: ArgoCD 문서
- link: https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/
  tag: 외부 사이트
  text: ArgoCD Sync Waves
- link: https://argo-cd.readthedocs.io/en/stable/user-guide/diffing/
  tag: 외부 사이트
  text: ArgoCD diffing 사용자 지정
- link: https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/
  tag: 외부 사이트
  text: ArgoCD 동기화 옵션
title: ArgoCD를 사용한 DatadogPodAutoscaler 관리
---
## 개요 {#overview}

DatadogPodAutoscaler(DPA)는 [Datadog Kubernetes Autoscaling(DKA)][1]을 사용하여 Kubernetes 워크로드의 오토스케일링을 가능하게 하는 Kubernetes 사용자 지정 리소스 정의(CRD)입니다. 이 가이드에서는 ArgoCD 및 GitOps 원칙을 사용하여 DatadogPodAutoscaler 리소스를 관리하고 오토스케일링 구성을 배포하는 방법을 설명합니다.

ArgoCD는 Kubernetes용 선언적 GitOps 지속적 배포 도구입니다. Kubernetes 매니페스트가 포함된 Git 리포지토리를 모니터링하고 Git에 정의된 원하는 상태와 클러스터를 동기화된 상태로 유지합니다. 이 접근 방식은 오토스케일링 인프라에 대한 버전 관리, 감사 추적 및 자동 배포를 제공합니다.

**대규모 오토스케일링 활성화:** 공유 정책을 사용하여 많은 워크로드 또는 네임스페이스에 오토스케일링을 배포하려면 워크로드마다 `DatadogPodAutoscaler`을 생성하는 대신 워크로드 또는 네임스페이스에 `autoscaling.datadoghq.com/profile` 레이블을 지정합니다. 자세한 내용은 Kubernetes Autoscaling 개요의 [클러스터 프로필][2]을 참조하세요.

## 전제 조건 {#prerequisites}

시작하기 전에 다음 사항을 준비합니다.

- **Kubernetes 클러스터**: `kubectl`을 사용하여 액세스할 수 있는 Kubernetes 클러스터(버전 1.20 이상)
- **ArgoCD 설치**: 클러스터에 배포되어 있으며 CLI 또는 UI를 통해 액세스 가능한 ArgoCD
- **Datadog API 자격 증명**: 유효한 Datadog API 키 및 애플리케이션 키
- **Git 리포지토리**: 매니페스트를 저장할 Git 리포지토리

## 프로젝트 구조 {#project-structure}

이 가이드는 적절한 종속성 생성 및 배포 순서를 보장하기 위해 ArgoCD Sync Wave를 사용하는 App of Apps 패턴을 사용합니다.

```
.
├── argocd/
│   ├── root-app.yaml              # App of Apps controller
│   └── apps/
│       ├── datadog-operator.yaml  # ArgoCD Application for Operator
│       ├── datadog-agent.yaml     # ArgoCD Application for Agent
│       └── nginx-dka-demo.yaml    # ArgoCD Application for workload
├── manifests/
│   └── stage2-agent/
│       └── datadog-agent.yaml     # DatadogAgent custom resource
└── charts/
    └── nginx-dka-demo/
        ├── Chart.yaml
        ├── values.yaml
        └── templates/
            ├── deployment.yaml
            └── pod-autoscaler.yaml
```

## 배포 단계 {#deployment-stages}

Kubernetes 사용자 지정 리소스 정의(CRD) 및 ArgoCD를 사용하는 경우 다단계 배포 방식이 필수적입니다. 이 순차적 접근 방식은 프로세스의 각 단계에 필요한 종속성을 생성하고 설치하기 위해 필요합니다.

Kubernetes CRD는 이를 사용하는 사용자 지정 리소스를 생성하기 전에 클러스터에 설치되어야 합니다. DatadogPodAutoscaler CRD는 1단계에서 Datadog Operator를 설치할 때 생성됩니다. ArgoCD는 이에 의존하는 리소스를 성공적으로 동기화하기 전에 이러한 CRD가 존재해야 합니다.

ArgoCD는 주석을 통해 배포 순서를 제어하기 위해 **Sync Wave**를 사용합니다. Sync Wave는 오름차순(작은 숫자부터)으로 실행되며, ArgoCD는 다음 Wave로 진행하기 전에 현재 Wave의 모든 리소스가 정상 상태가 될 때까지 대기합니다.

1. **1단계(Wave 0)**: Helm을 사용한 Datadog Operator(CRD 생성)
2. **2단계(Wave 1)**: Datadog Kubernetes Autoscaling용으로 구성된 Datadog Agent
   - 오토스케일링 요구 사항이 활성화된 Datadog Agent 사용자 지정 리소스
3. **3단계(Wave 2)**: DatadogPodAutoscaler가 포함된 애플리케이션 워크로드
   - 데모 네임스페이스의 NGINX 배포
   - NGINX 배포를 오토스케일링하기 위한 DatadogPodAutoscaler 리소스

## 구성 파일 설정 {#set-up-configuration-files}

먼저 Git 리포지토리를 생성합니다. ArgoCD는 Git에서 매니페스트를 가져오므로 ArgoCD Application 매니페스트의 모든 `repoURL` 참조를 사용자의 리포지토리를 가리키도록 업데이트해야 합니다.

프로세스의 각 단계에 대해 다음 구성 파일을 설정합니다.

### 1단계: 루트 Application(App of Apps) {#stage-1-root-application-app-of-apps}

루트 Application은 모든 하위 Application을 관리하는 App of Apps 컨트롤러입니다.

{{< code-block lang="yaml" filename="argocd/root-app.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: dka-root
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://example.com/YOUR-USERNAME/dka-argocd-example
    targetRevision: HEAD
    path: argocd/apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
{{< /code-block >}}

### 2단계: Datadog Operator 애플리케이션 {#stage-2-datadog-operator-application}

이 ArgoCD 애플리케이션은 Helm을 사용하여 Datadog Operator를 배포하며, 필요한 CRD를 생성합니다.

{{< code-block lang="yaml" filename="argocd/apps/datadog-operator.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: datadog-operator
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "0"
spec:
  project: default
  source:
    repoURL: https://helm.datadoghq.com
    targetRevision: 2.18.1
    chart: datadog-operator
  destination:
    server: https://kubernetes.default.svc
    namespace: datadog
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
{{< /code-block >}}

### 3단계: Datadog Agent 애플리케이션 {#stage-3-datadog-agent-application}

이 ArgoCD 애플리케이션은 DatadogAgent 사용자 지정 리소스를 배포합니다.

{{< code-block lang="yaml" filename="argocd/apps/datadog-agent.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: datadog-agent
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "1"
spec:
  project: default
  source:
    repoURL: https://example.com/YOUR-USERNAME/dka-argocd-example
    targetRevision: HEAD
    path: manifests/stage2-agent
  destination:
    server: https://kubernetes.default.svc
    namespace: datadog
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
{{< /code-block >}}

DatadogAgent 사용자 지정 리소스 매니페스트를 생성합니다.

{{< code-block lang="yaml" filename="manifests/stage2-agent/datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  features:
    autoscaling:
      workload:
        enabled: true
    eventCollection:
      unbundleEvents: true
  global:
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    clusterName: minikube-dka-demo
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
    nodeAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
{{< /code-block >}}

### 4단계: DatadogPodAutoscaler가 포함된 NGINX 애플리케이션 {#stage-4-nginx-application-with-datadogpodautoscaler}

이 ArgoCD 애플리케이션은 Helm 차트를 사용하여 DatadogPodAutoscaler가 포함된 NGINX 워크로드를 배포합니다.

{{< code-block lang="yaml" filename="argocd/apps/nginx-dka-demo.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: nginx-dka-demo
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "2"
spec:
  project: default
  source:
    repoURL: https:/example.com/YOUR-USERNAME/dka-argocd-example
    targetRevision: HEAD
    path: charts/nginx-dka-demo
  destination:
    server: https://kubernetes.default.svc
    namespace: nginx-dka-demo
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - RespectIgnoreDifferences=true
  ignoreDifferences:
    - group: apps
      kind: Deployment
      name: nginx
      namespace: nginx-dka-demo
      managedFieldsManagers:
        - datadog-cluster-agent
{{< /code-block >}}

`ignoreDifferences` 항목은 `RespectIgnoreDifferences=true`와 함께 사용되어 ArgoCD가 Datadog Cluster Agent가 오토스케일링된 워크로드에 적용한 변경 사항을 되돌리지 않도록 지시합니다. `managedFieldsManagers` 형식은 Kubernetes 서버 측 적용(server-side apply) 필드 소유권을 활용하므로 Cluster Agent가 소유한 모든 필드(복제본 수, `autoscaling.datadoghq.com/` 아래의 주석, 컨테이너 리소스)가 자동으로 유지됩니다. 전체 근거 및 전역 구성 대안은 [Datadog Cluster Agent가 오토스케일링된 워크로드를 업데이트하도록 허용](#allow-the-datadog-cluster-agent-to-update-autoscaled-workloads)을 참조하세요.

NGINX 애플리케이션용 Helm 차트를 생성합니다.

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/Chart.yaml" >}}
apiVersion: v2
name: nginx-dka-demo
description: NGINX demo application with DatadogPodAutoscaler
type: application
version: 0.1.0
appVersion: "1.0"
{{< /code-block >}}

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/values.yaml" >}}
replicaCount: 3

image:
  repository: nginx
  tag: latest
  pullPolicy: IfNotPresent

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

service:
  type: ClusterIP
  port: 80

autoscaler:
  enabled: true
  minReplicas: 3
  maxReplicas: 100
  targetCPUUtilization: 70
  scaleUp:
    rules:
      - type: Percent
        value: 50
        periodSeconds: 120
    stabilizationWindowSeconds: 600
    strategy: Max
  scaleDown:
    rules:
      - type: Percent
        value: 20
        periodSeconds: 1200
    stabilizationWindowSeconds: 600
    strategy: Max
{{< /code-block >}}

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/templates/deployment.yaml" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  namespace: nginx-dka-demo
  labels:
    app: nginx
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - containerPort: 80
        resources:
          {{- toYaml .Values.resources | nindent 10 }}
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: nginx-dka-demo
spec:
  selector:
    app: nginx
  ports:
  - port: {{ .Values.service.port }}
    targetPort: 80
  type: {{ .Values.service.type }}
{{< /code-block >}}

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/templates/pod-autoscaler.yaml" >}}
{{- if .Values.autoscaler.enabled }}
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: nginx
  namespace: nginx-dka-demo
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  owner: Local
  constraints:
    minReplicas: {{ .Values.autoscaler.minReplicas }}
    maxReplicas: {{ .Values.autoscaler.maxReplicas }}
    containers:
    - name: nginx
      enabled: true
  objectives:
  - type: PodResource
    podResource:
      name: cpu
      value:
        type: Utilization
        utilization: {{ .Values.autoscaler.targetCPUUtilization }}
  applyPolicy:
    mode: Apply
    update:
      strategy: Auto
    scaleUp:
      strategy: {{ .Values.autoscaler.scaleUp.strategy }}
      stabilizationWindowSeconds: {{ .Values.autoscaler.scaleUp.stabilizationWindowSeconds }}
      rules:
      {{- toYaml .Values.autoscaler.scaleUp.rules | nindent 6 }}
    scaleDown:
      strategy: {{ .Values.autoscaler.scaleDown.strategy }}
      stabilizationWindowSeconds: {{ .Values.autoscaler.scaleDown.stabilizationWindowSeconds }}
      rules:
      {{- toYaml .Values.autoscaler.scaleDown.rules | nindent 6 }}
{{- end }}
{{< /code-block >}}

## Datadog Cluster Agent가 오토스케일링된 워크로드를 업데이트하도록 허용 {#allow-the-datadog-cluster-agent-to-update-autoscaled-workloads}

`applyPolicy.mode: Apply`가 `DatadogPodAutoscaler`에 설정되면 Datadog Cluster Agent는 대상 워크로드를 직접 수정합니다. Cluster Agent는 `spec.replicas`, 컨테이너 리소스를 업데이트하고 권장 사항 및 적용 상태를 추적하기 위해 `autoscaling.datadoghq.com/` 접두사 아래에 주석을 기록합니다. 추가 ArgoCD 구성이 없으면 ArgoCD는 이러한 변경을 드리프트(drift)로 해석하고, `selfHeal: true`이 활성화된 경우 동기화할 때마다 이를 되돌립니다. 이로 인해 ArgoCD와 오토스케일러 간 충돌이 발생합니다.

이 충돌을 방지하기 위한 두 가지 옵션이 있습니다.

- **애플리케이션별:** 오토스케일링된 워크로드가 포함된 각 ArgoCD `Application`에 `ignoreDifferences` 및 `RespectIgnoreDifferences=true`을 추가합니다. 이는 위의 [4단계](#stage-4-nginx-application-with-datadogpodautoscaler) 예제에 표시되어 있습니다.
- **전역:** `argocd-cm`을 한 번 구성하여 `ignoreDifferences` 규칙이 인스턴스의 모든 Application에 적용되도록 합니다.

### 지원되는 대상 워크로드 종류 {#supported-target-workload-kinds}

`ignoreDifferences` 구성은 `spec.targetRef`을 통해 `DatadogPodAutoscaler`가 대상으로 지정할 수 있는 모든 워크로드 종류를 포함해야 합니다.

| 워크로드 종류 | API 그룹 | 참고 |
|---|---|---|
| `Deployment` | `apps` | |
| `StatefulSet` | `apps` | |
| `Rollout` | `argoproj.io` | Argo Rollouts도 사용하는 경우에만 적용됩니다. |

### 애플리케이션별 구성 {#per-application-configuration}

클러스터에서 서버 측 적용이 활성화되어 있는지 여부에 따라 다음 변형 중 하나를 선택합니다.

#### 변형 1: `managedFieldsManagers`(권장){#variant-1-managedfieldsmanagers-recommended}

`managedFieldsManagers` 방식은 Cluster Agent가 소유한 모든 필드(`spec.replicas`, 컨테이너 리소스 및 모든 주석)를 개별적으로 나열하지 않고 처리합니다.

{{< code-block lang="yaml" >}}
syncPolicy:
  automated:
    prune: true
    selfHeal: true
  syncOptions:
    - RespectIgnoreDifferences=true
ignoreDifferences:
  - group: apps
    kind: Deployment
    managedFieldsManagers:
      - datadog-cluster-agent
  - group: apps
    kind: StatefulSet
    managedFieldsManagers:
      - datadog-cluster-agent
  - group: argoproj.io
    kind: Rollout
    managedFieldsManagers:
      - datadog-cluster-agent
{{< /code-block >}}

이는 위 4단계 예제에서 사용된 방식입니다. 각 Application에 존재하는 워크로드 유형에 대해서만 `kind` 항목을 포함합니다.

#### 변형 2: `jqPathExpressions`(클라이언트 측 적용에서 작동){#variant-2-jqpathexpressions-works-with-client-side-apply}

`jqPathExpressions` 방식은 `autoscaling.datadoghq.com/`으로 시작하는 주석만 명시적으로 대상으로 하므로 클라이언트 측 적용과 호환됩니다. 환경에서 `ServerSideApply=true`를 사용할 수 없는 경우 이 변형을 사용합니다.

{{< code-block lang="yaml" >}}
syncPolicy:
  automated:
    prune: true
    selfHeal: true
  syncOptions:
    - RespectIgnoreDifferences=true
ignoreDifferences:
  - group: apps
    kind: Deployment
    jqPathExpressions:
      - .metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
      - .spec.template.metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
  - group: apps
    kind: StatefulSet
    jqPathExpressions:
      - .metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
      - .spec.template.metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
  - group: argoproj.io
    kind: Rollout
    jqPathExpressions:
      - .metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
      - .spec.template.metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
{{< /code-block >}}

**제한 사항:** 이 변형은 `autoscaling.datadoghq.com/` 주석만 처리합니다. 오토스케일러가 `spec.replicas` 또는 컨테이너 리소스 요청도 수정하는 경우 해당 필드에 대해 별도의 `jqPathExpressions` 항목을 추가해야 합니다. 변형 1(`managedFieldsManagers`)은 Cluster Agent가 소유한 모든 필드를 자동으로 포함하여 이러한 문제를 방지합니다.

### 전역 구성 {#global-configuration}

ArgoCD 인스턴스의 모든 Application에 대해 `ignoreDifferences`을 한 번만 적용하려면 `resource.customizations.ignoreDifferences.<group>_<kind>` 키를 사용하여 `argocd-cm` ConfigMap을 구성합니다.

#### ConfigMap(kubectl 또는 Kustomize 설치) {#configmap-kubectl-or-kustomize-installs}

{{< code-block lang="yaml" filename="argocd-cm patch" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
data:
  resource.customizations.ignoreDifferences.apps_Deployment: |
    managedFieldsManagers:
      - datadog-cluster-agent
  resource.customizations.ignoreDifferences.apps_StatefulSet: |
    managedFieldsManagers:
      - datadog-cluster-agent
  resource.customizations.ignoreDifferences.argoproj.io_Rollout: |
    managedFieldsManagers:
      - datadog-cluster-agent
{{< /code-block >}}

#### ArgoCD Helm 차트 값 {#argocd-helm-chart-values}

공식 `argo/argo-cd` Helm 차트를 사용하여 ArgoCD를 배포하는 경우 동일한 키를 `configs.cm` 아래에 추가합니다.

{{< code-block lang="yaml" filename="values.yaml" >}}
configs:
  cm:
    resource.customizations.ignoreDifferences.apps_Deployment: |
      managedFieldsManagers:
        - datadog-cluster-agent
    resource.customizations.ignoreDifferences.apps_StatefulSet: |
      managedFieldsManagers:
        - datadog-cluster-agent
    resource.customizations.ignoreDifferences.argoproj.io_Rollout: |
      managedFieldsManagers:
        - datadog-cluster-agent
{{< /code-block >}}

다음 명령으로 값을 적용합니다.

{{< code-block lang="bash" >}}
helm upgrade --install argocd argo/argo-cd -f values.yaml -n argocd
{{< /code-block >}}

#### 중요:`RespectIgnoreDifferences` 애플리케이션별 {#important-respectignoredifferences-is-still-required-per-application}은 여전히 필요합니다.

<div class="alert alert-warning">
전역 <code>ignoreDifferences</code> 구성은 ArgoCD UI에서 diff 표시만 숨깁니다. 동기화 중에 ArgoCD가 해당 필드를 덮어쓰는 것을 방지하지는 않습니다. 오토스케일링된 워크로드가 포함된 각 Application은 또한 <strong><code>RespectIgnoreDifferences=true</code> 를 <code>syncOptions</code></strong>에 설정해야 합니다. 이 동기화 옵션에 대한 전역 설정은 존재하지 않습니다.
</div>

각 Application에 개별적으로 `RespectIgnoreDifferences=true`을 설정하지 않으려면 `AppProject` 수준에서 정의하여 프로젝트의 모든 Application이 이를 상속받도록 합니다.

{{< code-block lang="yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: default
  namespace: argocd
spec:
  syncPolicy:
    syncOptions:
      - RespectIgnoreDifferences=true
{{< /code-block >}}

또는 `ApplicationSet` 템플릿을 사용하여 생성된 모든 Application에 동기화 옵션을 자동으로 추가할 수 있습니다.

### 어떤 옵션을 사용할 것인가 {#which-option-to-use}

- **오토스케일링된 워크로드가 적은 경우**: [애플리케이션별 구성](#per-application-configuration)을 사용합니다. 구성이 워크로드와 함께 유지됩니다.
- **워크로드가 많거나 ArgoCD 전체 표준화가 필요한 경우**: 프로젝트 수준 또는 `ApplicationSet` 수준의 `RespectIgnoreDifferences=true`과 함께 [전역 구성](#global-configuration)을 사용합니다.
- **혼합 환경(모든 워크로드가 오토스케일링되는 것은 아님)**: 전역 구성은 인스턴스 전체에 안전하게 적용할 수 있습니다. `managedFieldsManagers` 규칙은 Datadog Cluster Agent 필드 소유권이 없는 워크로드에 대해서는 아무 작업도 수행하지 않습니다.

## 배포 지침 {#deployment-instructions}

[구성 파일](#set-up-configuration-files)을 설정하고 Git 리포지토리에 푸시한 후 다음 단계에 따라 ArgoCD를 사용하여 구성 요소를 배포합니다.

### Datadog 시크릿 생성 {#create-datadog-secret}

`datadog` 네임스페이스에 Datadog API 키와 애플리케이션 키가 포함된 Kubernetes 시크릿을 생성합니다.

{{< code-block lang="bash" >}}
kubectl create namespace datadog
kubectl create secret generic datadog-secret \
  --from-literal=api-key=YOUR_API_KEY \
  --from-literal=app-key=YOUR_APP_KEY \
  -n datadog
{{< /code-block >}}

### 루트 애플리케이션 배포 {#deploy-root-application}

App of Apps 패턴을 사용하여 모든 하위 애플리케이션을 관리하는 루트 애플리케이션을 배포합니다.

{{< code-block lang="bash" >}}
kubectl apply -f argocd/root-app.yaml
{{< /code-block >}}

이제 ArgoCD는 Git 리포지토리를 모니터링하고 Sync Wave를 기준으로 올바른 순서로 모든 애플리케이션을 자동 배포합니다.

### Datadog에서 클러스터 오토스케일링 활성화 {#enable-autoscaling-on-the-cluster-in-datadog}

Datadog UI의 [오토스케일링 설정 페이지](https://app.datadoghq.com/orchestration/scaling/settings)로 이동하여 클러스터에 대한 오토스케일링을 활성화합니다.

### Sync Wave 진행 상태 확인 {#verify-sync-wave-progression}

ArgoCD 애플리케이션이 순서대로 동기화되는지 확인합니다.

{{< code-block lang="bash" >}}
kubectl get applications -n argocd
{{< /code-block >}}

모든 애플리케이션이 `datadog-operator`(Wave 0), `datadog-agent`(Wave 1), `nginx-dka-demo`(Wave 2) 순서로 나타나고 동기화되는 것을 확인할 수 있습니다.

### 배포 검증 {#validate-deployment}

Datadog Operator와 CRD가 배포되었는지 확인합니다.

{{< code-block lang="bash" >}}
kubectl get crd | grep datadoghq
kubectl get pods -n datadog
{{< /code-block >}}

Datadog CRD가 생성되고 `datadog-operator` 포드가 실행 중인 것을 확인할 수 있습니다.

Datadog Agent가 배포되었는지 확인합니다.

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
{{< /code-block >}}

`Running` 상태에서 Datadog Agent 사용자 지정 리소스가 생성된 것을 확인할 수 있습니다. 또한 Datadog Agent 및 `datadog-cluster-agent` 포드가 실행 중인지 확인합니다.

{{< code-block lang="bash" >}}
kubectl get pods -n datadog
{{< /code-block >}}

DatadogPodAutoscaler 상태를 확인합니다.

{{< code-block lang="bash" >}}
kubectl get datadogpodautoscaler -n nginx-dka-demo
kubectl describe datadogpodautoscaler nginx -n nginx-dka-demo
{{< /code-block >}}

축하합니다! GitOps를 사용하여 Datadog Kubernetes Autoscaler가 관리하는 워크로드를 성공적으로 구성했습니다.

## 정리 {#cleanup}

모든 리소스를 제거하려면 루트 애플리케이션을 삭제합니다. 이렇게 하면 모든 하위 애플리케이션도 함께 삭제됩니다.

{{< code-block lang="bash" >}}
kubectl delete application dka-root -n argocd
{{< /code-block >}}

또는 역순으로 개별 애플리케이션을 삭제할 수 있습니다.

{{< code-block lang="bash" >}}
kubectl delete application nginx-dka-demo -n argocd
kubectl delete application datadog-agent -n argocd
kubectl delete application datadog-operator -n argocd
{{< /code-block >}}

Datadog 시크릿을 삭제합니다.

{{< code-block lang="bash" >}}
kubectl delete secret datadog-secret -n datadog
{{< /code-block >}}

## 문제 해결 {#troubleshooting}

### ArgoCD 동기화 실패 {#argocd-sync-failures}

애플리케이션 상태 및 동기화 오류를 확인합니다.

{{< code-block lang="bash" >}}
kubectl describe application datadog-operator -n argocd
kubectl describe application datadog-agent -n argocd
kubectl describe application nginx-dka-demo -n argocd
{{< /code-block >}}

ArgoCD Application Controller 로그를 확인합니다.

{{< code-block lang="bash" >}}
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller
{{< /code-block >}}

### CRD 가용성 이슈 {#crd-availability-issues}

CRD를 인식하지 못해 ArgoCD 동기화에 실패하는 경우 Wave 0에서 Datadog Operator가 성공적으로 배포되었는지 확인합니다.

{{< code-block lang="bash" >}}
kubectl get crd | grep datadoghq
kubectl get pods -n datadog
{{< /code-block >}}

Sync Wave 주석이 올바른 순서를 보장하지만, 애플리케이션을 수동으로 새로 고칠 수도 있습니다.

{{< code-block lang="bash" >}}
argocd app sync datadog-agent
{{< /code-block >}}

### 시크릿 구성 문제 {#secret-configuration-problems}

Datadog 시크릿이 존재하며 올바른 키를 포함하는지 확인합니다.

{{< code-block lang="bash" >}}
kubectl get secret datadog-secret -n datadog
kubectl describe secret datadog-secret -n datadog
{{< /code-block >}}

시크릿에는 `api-key` 및 `app-key` 필드가 포함되어야 합니다.

### DatadogPodAutoscaler 이벤트 {#datadogpodautoscaler-events}

스케일링 결정 및 오류에 대한 DatadogPodAutoscaler 이벤트를 확인합니다.

{{< code-block lang="bash" >}}
kubectl get events -n nginx-dka-demo --sort-by='.lastTimestamp'
{{< /code-block >}}

### 오토스케일링된 워크로드가 계속 되돌아가는 경우 {#autoscaled-workload-keeps-reverting}

`selfHeal: true`이 활성화된 경우 ArgoCD는 약 3분마다 동기화를 수행합니다. 오토스케일링된 워크로드의 `spec.replicas` 또는 `autoscaling.datadoghq.com/` 주석이 반복적으로 재설정된다면 다음 항목을 확인합니다.

Application의 `syncOptions`에 1. **`RespectIgnoreDifferences=true`이 포함되어 있지 않습니다**. 이 플래그가 없으면 ArgoCD는 UI에서 드리프트만 숨기고 적용 시 필드를 계속 덮어씁니다.
2. **`ignoreDifferences` 항목이 워크로드와 일치하지 않습니다.** 해당 항목의 `group`, `kind`, `name`, `namespace`가 대상 워크로드와 정확히 일치하는지 확인합니다.
3. **`ServerSideApply=true` `managedFieldsManagers`를 사용하는 경우**이 설정되어 있지 않습니다. 서버 측 적용이 없으면 Kubernetes가 필드 소유권 데이터베이스를 채우지 않으므로 관리자 이름을 일치시킬 수 없습니다.

서버 측 적용이 활성화되어 있는지, 특정 필드를 어떤 관리자가 소유하고 있는지 확인하려면 다음 명령을 실행합니다.

{{< code-block lang="bash" >}}
kubectl get deployment <name> -n <namespace> -o yaml --show-managed-fields
{{< /code-block >}}

`manager: datadog-cluster-agent` 및 `operation: Apply`인 항목을 찾습니다. 해당 항목이 없다면 해당 리소스에 대해 서버 측 적용이 활성화되지 않은 것입니다.

### Cluster Agent 로그 {#cluster-agent-logs}

Cluster Agent 로그에서 오토스케일링 관련 메시지를 확인합니다.

{{< code-block lang="bash" >}}
kubectl logs -n datadog -l agent.datadoghq.com/component=cluster-agent
{{< /code-block >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/monitoring/autoscaling/
[2]: /ko/containers/monitoring/autoscaling/#cluster-profiles