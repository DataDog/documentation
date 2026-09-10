---
aliases:
- /ko/agent/kubernetes/distributions
description: 다양한 Kubernetes 배포판에서 Datadog Agent를 설치하고 구성하기 위한 플랫폼별 지침
further_reading:
- link: agent/kubernetes/log
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/kubernetes/apm
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/kubernetes/prometheus
  tag: 설명서
  text: Prometheus 메트릭 수집
- link: /agent/kubernetes/integrations
  tag: 설명서
  text: 애플리케이션 메트릭 및 로그 자동 수집
- link: /agent/guide/autodiscovery-management
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 세트로만 제한
- link: /agent/kubernetes/tag
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
- link: https://www.datadoghq.com/blog/monitor-vsphere-tanzu-kubernetes-grid-with-datadog/
  tag: 블로그
  text: vSphere에서의 Tanzu Kubernetes Grid 모니터링
title: Kubernetes 배포
---
## 개요 {#overview}

이 섹션은 모든 주요 Kubernetes 배포판에 대한 세부 사항을 문서화하고 적절한 기본 구성을 제공하는 것을 목표로 합니다.
그런 다음 이러한 구성을 사용자 지정하여 각종 Datadog 기능을 추가할 수 있습니다.

* [AWS Elastic Kubernetes Service(EKS)](#EKS)
* [Azure Kubernetes Service(AKS)](#AKS)
* [Google Kubernetes Engine(GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)
* [Oracle Container Engine for Kubernetes(OKE)](#OKE)
* [vSphere Kubernetes Service(VKS)](#VKS)
* [vSphere Tanzu Kubernetes Grid(TKG)](#TKG)

## AWS Elastic Kubernetes Service(EKS) {#EKS}

특정 설정이 필요하지 않습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

EKS 클러스터에서는 [Helm][1]을 사용하거나 [EKS 추가 기능][2]으로 Operator를 설치할 수 있습니다.

아래 구성은 Agent가 Datadog Operator와 동일한 네임스페이스에 설치된 경우 두 설정(Helm 또는 EKS add-on) 모두에서 작동하도록 되어 있습니다.

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
```

[1]:/ko/containers/kubernetes/installation/?tab=datadogoperator
[2]: /ko/agent/guide/operator-eks-addon

{{% /tab %}}

{{< /tabs >}}

## Azure Kubernetes Service(AKS) {#AKS}

### Admission Controller {#admission-controller}
선택 사항인 [Admission Controller][1] 기능은 웹훅을 조정할 때 오류를 방지하기 위해 특정 구성이 필요합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes 리소스:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```

`<DATADOG_SITE>`를 [Datadog 사이트][1]로 바꿉니다. 현재 사이트는 {{< region-param key="dd_site" code="true" >}}입니다(이 페이지 오른쪽에서 계정에 맞는 올바른 사이트가 선택되었는지 확인).

[1]: /ko/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}

사용자 지정 `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

providers:
  aks:
    enabled: true
```

`providers.aks.enabled` 옵션은 필요한 환경 변수 `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"`를 설정합니다.

{{% /tab %}}
{{< /tabs >}}

### Kubelet 서빙 인증서 교체 {#kubelet-serving-certificate-rotation}
클러스터에 [Kubelet 서빙 인증서 교체][13]가 활성화되어 있지 **않으면** Datadog Agent가 Kubelet에 연결할 수 있도록 추가 구성을 제공해야 합니다. Kubelet 서빙 인증서 교체는 2025년 7월 이후 업데이트된 노드 풀의 Kubernetes 클러스터 1.27 이상에서 활성화됩니다.

노드에 `kubernetes.azure.com/kubelet-serving-ca=cluster` 레이블이 있는 경우 이 기능이 활성화된 것입니다. 다음 명령을 실행하여 모든 노드에 이 레이블이 있는지 확인하세요.

```shell
kubectl get nodes -L kubernetes.azure.com/kubelet-serving-ca
```

모든 노드에 `cluster`가 표시되는지 확인하세요.

#### Kubelet 서빙 인증서 교체 없이 {#without-kubelet-serving-certificate-rotation}

Kubelet 서빙 인증서 교체가 활성화되지 않은 경우 다음 추가 Kubelet 구성을 제공하세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes 리소스:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    kubelet:
      host:
        fieldRef:
          fieldPath: spec.nodeName
      hostCAPath: /etc/kubernetes/certs/kubeletserver.crt
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```
{{% /tab %}}
{{% tab "Helm" %}}

사용자 지정 `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    host:
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    hostCAPath: /etc/kubernetes/certs/kubeletserver.crt

providers:
  aks:
    enabled: true
```
{{% /tab %}}
{{< /tabs >}}

이러한 AKS 노드 버전에서는 AKS Kubelet 인증서의 경우 이전 코드 조각에서 볼 수 있듯이 Kubelet 호스트를 `spec.nodeName`으로, 인증서 위치를 `hostCAPath`로 변경해야 합니다. TLS 검증이 활성화됩니다. 이러한 변경 사항이 없으면 Agent가 Kubelet에 연결할 수 없습니다.

<div class="alert alert-info">클러스터에서 Kubelet 서빙 인증서 교체가 활성화된 후 이 구성을 제거하세요.</div>

AKS 클러스터를 업그레이드할 때 Kubelet 서빙 인증서 교체 기능이 자동으로 활성화될 수 있으며, 인증서 `/etc/kubernetes/certs/kubeletserver.crt`를 참조하기 위해 위의 특수 구성을 사용하는 경우 Datadog Agent에 부정적인 영향을 줄 수 있습니다. Kubelet 서빙 인증서 교체가 활성화되면 이 인증서가 제거되어 다음 문제가 발생합니다.

- Datadog Operator의 경우: Agent 컨테이너가 Kubelet에 연결할 수 없어 `Error` 상태로 종료되고 `Error while getting hostname, exiting: unable to reliably determine the host name`을 로깅합니다.
- Helm의 경우: Agent 포드가 `MountVolume.SetUp failed for volume "kubelet-ca" : hostPath type check failed: /etc/kubernetes/certs/kubeletserver.crt is not a file` 이벤트와 함께 시작되지 않습니다.

이러한 경우에는 추가 Kubelet 구성을 제거하세요.

대안으로 [TLS 검증 없이 Kubelet에 연결](#without-tls-verification)할 수도 있습니다.

### TLS 검증 없이 {#without-tls-verification}

일부 클러스터에서는 AKS 내 포드에서 `spec.nodeName`에 대한 DNS 확인이 작동하지 않습니다. 영향을 받는 항목:
 - Windows 노드
 - 사용자 지정 DNS를 사용하는 가상 네트워크에 클러스터가 설정된 경우의 Linux 노드

이 경우 아래 제공된 AKS 설정을 사용하여 `tlsVerify: false`를 설정하고 Kubelet 호스트 경로(기본값은 `status.hostIP`)에 대한 설정을 제거하세요. **Kubelet 호스트 경로와 `tlsVerify: false`를 동일한 설정에 지정하지 마세요**.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes 리소스:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```

{{% /tab %}}
{{% tab "Helm" %}}

사용자 지정 `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    tlsVerify: false

providers:
  aks:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

## Google Kubernetes Engine(GKE) {#GKE}

GKE는 두 가지 작동 모드로 설정할 수 있습니다.

- **표준**: 클러스터의 기본 인프라를 관리하여 노드 설정의 유연성을 제공합니다.
- **Autopilot**: GKE는 노드 및 노드 풀을 포함한 클러스터의 기본 인프라를 공급 및 관리함으로써 핸즈오프(hands-off) 경험과 함께 최적화된 클러스터를 제공합니다.

클러스터의 작동 모드에 따라 Datadog Agent를 다르게 설정해야 합니다.

### 표준 {#standard}

Agent 7.26 이상 버전의 GKE에서는 `Docker` 또는 `containerd` 실행 여부와 관계없이 추가 설정이 필요하지 않습니다. 단, Helm 차트를 사용하는 Container-Optimized OS(COS)는 예외입니다. Datadog Operator는 GKE COS를 자동으로 탐지합니다.

{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `datadog-values.yaml`:

```yaml
providers:
  gke:
    cos: true
```

{{% /tab %}}
{{< /tabs >}}

### Autopilot {#autopilot}

GKE Autopilot 에는 아래와 같이 몇 가지 설정이 필요합니다.

Datadog은 Agent 컨테이너에 대한 리소스 제한을 지정할 것을 권장합니다. Autopilot은 비교적 낮은 기본 제한(50m CPU, 100Mi 메모리)을 설정하므로 환경에 따라 Agent 컨테이너가 빠르게 OOMKill될 수 있습니다. 해당되는 경우 Trace Agent, Process Agent 및 System-Probe 컨테이너에 대한 리소스 제한도 지정합니다. 또한 Agent가 예약되도록 우선순위 클래스를 생성하는 것을 권장합니다.

Agent `7.65.0+` 및 Helm 차트 버전 `3.113.0+`부터 Datadog은 Agent가 API 서버에서 포드 목록을 쿼리하도록 `datadog.kubelet.useApiServer`를 사용할 것을 권장합니다. [지원이 중단된 읽기 전용 kubelet 포트][12]를 사용하지 마세요.


{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>

  # The site of the Datadog intake to send Agent data to (example: `us3.datadoghq.com`)
  # Default value is `datadoghq.com' (the US1 site)
  # Documentation: https://docs.datadoghq.com/getting_started/site/
  site: <DATADOG_SITE>

  # This option uses the API server to retrieve the node-level pod list from the API server.
  # This setting is necessary to migrate away from the deprecated read-only kubelet port.
  # Requires Agent 7.65.0+ and Datadog Helm chart version 3.113.0+.
  kubelet:
    useApiServer: true

agents:
  containers:
    agent:
      # resources for the Agent container
      resources:
        requests:
          cpu: 200m
          memory: 256Mi

    traceAgent:
      # resources for the Trace Agent container
      resources:
        requests:
          cpu: 100m
          memory: 200Mi

    processAgent:
      # resources for the Process Agent container
      resources:
        requests:
          cpu: 100m
          memory: 200Mi

    systemProbe:
      # resources for the System Probe container
      resources:
        requests:
          cpu: 100m
          memory: 400Mi

  priorityClassCreate: true

providers:
  gke:
    autopilot: true
```

{{% /tab %}}

{{% tab "Datadog Operator" %}}

Datadog Operator `1.27.0+`부터 `experimental.agent.datadoghq.com/autopilot` 주석을 사용하여 Autopilot 모드를 활성화하세요. Operator는 API 서버 포드 검색 및 필수 WorkloadAllowlist를 포함하여 GKE Autopilot용 Agent를 구성합니다.

사용자 지정 `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    experimental.agent.datadoghq.com/autopilot: "true"
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    # The site of the Datadog intake to send Agent data to (example: `us3.datadoghq.com`)
    # Default value is `datadoghq.com' (the US1 site)
    # Documentation: https://docs.datadoghq.com/getting_started/site/
    site: <DATADOG_SITE>
  override:
    nodeAgent:
      containers:
        agent:
          resources:
            requests:
              cpu: 200m
              memory: 256Mi
        trace-agent:
          resources:
            requests:
              cpu: 100m
              memory: 200Mi
        process-agent:
          resources:
            requests:
              cpu: 100m
              memory: 200Mi
        system-probe:
          resources:
            requests:
              cpu: 100m
              memory: 400Mi
```

{{% /tab %}}
{{< /tabs >}}

### 스팟 포드 및 컴퓨팅 클래스 {#spot-pods-and-compute-classes}

GKE Autopilot 클러스터에서 [Spot Pods][10]를 사용하면 해당 Spot GKE 노드에 [taints][9]가 도입됩니다. 스팟 포드를 사용할 때는 Agent DaemonSet에 일치하는 허용 오차를 제공하기 위해 추가 구성이 필요합니다.

{{< tabs >}}
{{% tab "Helm" %}}

```yaml
agents:
  #(...)
  # agents.tolerations -- Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  tolerations:
  - effect: NoSchedule
    key: cloud.google.com/gke-spot
    operator: Equal
    value: "true"
```
{{% /tab %}}

{{% tab "Datadog Operator" %}}

```yaml
spec:
  override:
    nodeAgent:
      tolerations:
      - effect: NoSchedule
        key: cloud.google.com/gke-spot
        operator: Equal
        value: "true"
```
{{% /tab %}}
{{< /tabs >}}

마찬가지로 특정 하드웨어 요구 사항이 있는 워크로드를 실행하기 위해 [GKE Autopilot 컴퓨팅 클래스][11]를 사용할 때는 GKE Autopilot이 이러한 특정 노드에 적용하는 [테인트][9]에 유의하고 Agent DaemonSet에 일치하는 허용 오차를 추가하세요. 해당 포드의 허용 오차를 일치시킬 수 있습니다. 예를 들어, `Scale-Out` 컴퓨팅 클래스의 경우 다음과 같은 허용 오차를 사용하세요.

{{< tabs >}}
{{% tab "Helm" %}}

```yaml
agents:
  #(...)
  # agents.tolerations -- Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  tolerations:
  - effect: NoSchedule
    key: cloud.google.com/compute-class
    operator: Equal
    value: Scale-Out
```
{{% /tab %}}

{{% tab "Datadog Operator" %}}

```yaml
spec:
  override:
    nodeAgent:
      tolerations:
      - effect: NoSchedule
        key: cloud.google.com/compute-class
        operator: Equal
        value: Scale-Out
```
{{% /tab %}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift는 SELinux 및 SecurityContextConstraints(SCC)를 통해 기본적으로 강화된 보안을 제공합니다. 결과적으로 몇 가지 특정 구성이 필요합니다.
- Node Agent 및 Cluster Agent에 대한 높은 SCC 액세스 권한
- Kubelet API 인증서가 항상 클러스터 CA에 의해 서명되는 것은 아닙니다.
- Node Agent를 `master` 및 `infra` 노드에 예약하려면 Tolerations가 필요합니다.
- 클러스터 이름은 클라우드 공급자에서 자동 검색할 수 없으므로 반드시 설정해야 합니다.
- *(선택 사항)* Node Agent에서 `hostNetwork: true`를 설정하여 Agent가 클라우드 공급자 메타데이터 서비스(IMDS)에 요청을 전송할 수 있도록 하세요.

이 코어 구성은 OpenShift 3.11 및 OpenShift 4 모두 지원하지만 OpenShift 4에서 가장 잘 작동합니다.

또한 로그 수집 및 APM에도 약간 다른 요구 사항이 있습니다.

APM 및 DogStatsD에 Unix Domain Socket(UDS)을 사용하는 것은 OpenShift에서 작동할 수 있습니다. 그러나 Datadog은 Datadog Agent 포드와 애플리케이션 포드 **모두**에 추가 권한 및 SCC 액세스가 필요하므로 이를 권장하지 않습니다. 이러한 권한이 없으면 애플리케이션 포드 배포가 실패할 수 있습니다. Datadog은 이를 방지하기 위해 UDS 옵션을 비활성화하고 Admission Controller가 APM 연결을 위해 적절한 [TCP/IP 설정][7] 또는 [서비스 설정][8]을 주입하도록 할 것을 권장합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

OpenShift에서 Datadog Operator를 사용할 때는 OpenShift 클러스터 웹 콘솔의 OperatorHub에서 Operator Lifecycle Manager를 사용하여 Datadog Operator를 배포하는 것이 좋습니다. [Operator 설치 단계][1]를 참조하세요. 아래 구성은 해당 설정과 함께 작동하며, 지정된 ServiceAccount `datadog-agent-scc`에 대해 [SCC 기반의 ClusterRole 및 ClusterRoleBinding 액세스][2]를 생성합니다. 이 `DatadogAgent` 구성은 Datadog Operator와 동일한 네임스페이스에 배포해야 합니다.

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
  namespace: openshift-operators # set as the same namespace where the Datadog Operator was deployed
spec:
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
    dogstatsd:
      unixDomainSocketConfig:
        enabled: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      serviceAccountName: datadog-agent-scc
    nodeAgent:
      serviceAccountName: datadog-agent-scc
      hostNetwork: true
      securityContext:
        runAsUser: 0
        seLinuxOptions:
          level: s0
          role: system_r
          type: spc_t
          user: system_u
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/infra
          operator: Exists
          effect: NoSchedule
```

**참고**: `nodeAgent.securityContext.seLinuxOptions` 재정의는 Operator로 배포할 때 로그 수집을 위해 필요합니다. 로그 수집이 활성화되지 않은 경우 이 재정의를 생략할 수 있습니다.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md
[2]: https://docs.openshift.com/container-platform/4.10/authentication/managing-security-context-constraints.html#role-based-access-to-ssc_configuring-internal-oauth
{{% /tab %}}
{{% tab "Helm" %}}

아래 구성은 Agent 및 Cluster Agent 서비스 계정에 대한 사용자 지정 SCC를 생성합니다.

사용자 지정 `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  apm:
    portEnabled: true
    socketEnabled: false
agents:
  podSecurity:
    securityContextConstraints:
      create: true
  useHostNetwork: true
  tolerations:
    - effect: NoSchedule
      key: node-role.kubernetes.io/master
      operator: Exists
    - effect: NoSchedule
      key: node-role.kubernetes.io/infra
      operator: Exists
clusterAgent:
  podSecurity:
    securityContextConstraints:
      create: true
```

{{% /tab %}}

{{< /tabs >}}

## Rancher {#Rancher}

Rancher 설치는 Vanilla Kubernetes 설치와 유사하며, 간단한 설정만 필요합니다.
- Node Agent를 `controlplane` 및 `etcd` 노드에 예약하려면 Tolerations가 필요합니다.
- 클러스터 이름은 클라우드 공급자에서 자동으로 검색할 수 없으므로 반드시 설정해야 합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes 리소스:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    logCollection:
      enabled: false
    liveProcessCollection:
      enabled: false
    liveContainerCollection:
      enabled: true
    apm:
      enabled: false
    cspm:
      enabled: false
    cws:
      enabled: false
    npm:
      enabled: false
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      image:
        name: registry.datadoghq.com/cluster-agent:latest
    nodeAgent:
      image:
        name: registry.datadoghq.com/agent:latest
      tolerations:
        - key: node-role.kubernetes.io/controlplane
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/etcd
          operator: Exists
          effect: NoExecute
```

{{% /tab %}}
{{% tab "Helm" %}}

사용자 지정 `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
agents:
  tolerations:
    - effect: NoSchedule
      key: node-role.kubernetes.io/controlplane
      operator: Exists
    - effect: NoExecute
      key: node-role.kubernetes.io/etcd
      operator: Exists
```

{{% /tab %}}

{{< /tabs >}}

## Oracle Container Engine for Kubernetes(OKE) {#OKE}

특정 설정이 필요하지 않습니다.

## vSphere Kubernetes Service(VKS) {#VKS}

VKS에서는 Datadog Agent가 배포되는 네임스페이스가 권한 있는 포드 보안 표준을 사용해야 합니다. Datadog Agent를 배포하기 전에 `datadog-agent`를 배포할 네임스페이스로 `<namespace>`를 바꾸고 다음을 실행하세요.

```shell
kubectl label --overwrite ns <namespace> \
  pod-security.kubernetes.io/enforce=privileged
```

다음 구성을 사용하여 Kubernetes 이벤트 수집 및 kube-state-metrics 코어를 활성화하고, 자체 서명된 인증서에 대한 Kubelet TLS 확인을 비활성화하며, Agent가 컨트롤 플레인 노드에 예약될 수 있도록 허용 오차를 추가하세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes 리소스:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    eventCollection:
      collectKubernetesEvents: true
    kubeStateMetricsCore:
      enabled: true
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule
```

{{% /tab %}}
{{% tab "Helm" %}}

사용자 지정 `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    # Set tlsVerify to false since the Kubelet certificates are self-signed
    tlsVerify: false
  # Disable the `kube-state-metrics` dependency chart installation.
  kubeStateMetricsEnabled: false
  # Enable the new `kubernetes_state_core` check.
  kubeStateMetricsCore:
    enabled: true
# Add a toleration so that the agent can be scheduled on the control plane nodes.
agents:
  tolerations:
    - key: node-role.kubernetes.io/master
      effect: NoSchedule
```

{{% /tab %}}

{{< /tabs >}}

## vSphere Tanzu Kubernetes Grid(TKG) {#TKG}

TKG는 아래와 같이 약간의 구성 변경이 필요합니다. 예를 들어, 컨트롤러가 `master` 노드에 Node Agent를 예약하려면 허용 오차를 설정해야 합니다.


{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes 리소스:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    eventCollection:
      collectKubernetesEvents: true
    kubeStateMetricsCore:
      enabled: true
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule
```

{{% /tab %}}
{{% tab "Helm" %}}

사용자 지정 `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    # Set tlsVerify to false since the Kubelet certificates are self-signed
    tlsVerify: false
  # Disable the `kube-state-metrics` dependency chart installation.
  kubeStateMetricsEnabled: false
  # Enable the new `kubernetes_state_core` check.
  kubeStateMetricsCore:
    enabled: true
# Add a toleration so that the agent can be scheduled on the control plane nodes.
agents:
  tolerations:
    - key: node-role.kubernetes.io/master
      effect: NoSchedule
```

{{% /tab %}}

{{< /tabs >}}


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/cluster_agent/admission_controller
[2]: https://github.com/Azure/AKS/releases/tag/2022-10-30
[3]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[4]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent/v2alpha1
[5]: /ko/getting_started/containers/datadog_operator
[6]: /ko/agent/guide/operator-eks-addon
[7]: /ko/containers/kubernetes/apm/?tab=tcp
[8]: /ko/tracing/guide/setting_up_apm_with_kubernetes_service
[9]: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/
[10]: https://cloud.google.com/kubernetes-engine/docs/how-to/autopilot-spot-pods
[11]: https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-compute-classes
[12]: https://cloud.google.com/kubernetes-engine/docs/how-to/disable-kubelet-readonly-port
[13]: https://learn.microsoft.com/en-us/azure/aks/certificate-rotation#kubelet-serving-certificate-rotation