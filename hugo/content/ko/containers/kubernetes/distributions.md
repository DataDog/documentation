---
aliases:
- /ko/agent/kubernetes/distributions
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
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/kubernetes/tag
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
- link: https://www.datadoghq.com/blog/monitor-vsphere-tanzu-kubernetes-grid-with-datadog/
  tag: 블로그
  text: vSphere에서의 Tanzu Kubernetes Grid 모니터링
title: 쿠버네티스 배포
---

## 개요

이 섹션은 구체적인 내용의 문서화 및 주요 쿠버네티스 배포에 적합한 기본 설정 제공을 목표로 합니다.
사용자에 맞게 설정을 변경하여 Datadog 기능을 추가할 수 있습니다.

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)
* [Oracle Container Engine for Kubernetes (OKE)](#OKE)
* [vSphere Tanzu Kubernetes Grid (TKG)](#TKG)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

특정 설정이 필요하지 않습니다.

노드에서 AWS Bottlerocket OS를 사용하는 경우 컨테이너 모니터링(`containerd` 검사)을 사용하도록 설정하려면 다음을 추가하세요:

{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  criSocketPath: /run/dockershim.sock
  env:
  - name: DD_AUTOCONFIG_INCLUDE_FEATURES
    value: "containerd"
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent 쿠버네티스 리소스:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    criSocketPath: /run/dockershim.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
```

{{% /tab %}}
{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

AKS가 SSL 인증서를 설정한 방식에 따라 `Kubelet` 통합을 위한 특정 설정이 필요합니다. 또한 선택 사항인 [어드미션 컨트롤러][3] 기능을 사용하려면 웹훅을 조정할 때 발생하는 오류 방지를 위해 특정 설정이 필요합니다.

{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Required as of Agent 7.35. See Kubelet Certificate note below.
  kubelet:
    tlsVerify: false

providers:
  aks:
    enabled: true
```

이`providers.aks.enabled` 옵션은 필수적인 환경 변수 `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"`를 설정합니다.

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent 쿠버네티스 리소스:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: true
  global:
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
{{< /tabs >}}

`kubelet.tlsVerify=false`는 서버 인증서 확인을 비활성화하기 위한 `DD_KUBELET_TLS_VERIFY=false` 환경 변수를 설정합니다.

### AKS Kubelet 인증서

이전 노드 이미지 버전에서 AKS Kubelet 인증서의 형식과 관련해 발생한 문제가 있습니다. 에이전트 7.35부터 인증서에 유효한 Subject Alternative Name (SAN)이 포함되어 있지 않으므로 `tlsVerify: false`를 사용해야 합니다.

AKS 클러스터 내의 모든 노드가 지원되는 노드 이미지 버전을 사용하는 경우, Kubelet TLS Verification을 사용할 수 있습니다. 버전은 [2022-10-30 릴리즈에 대해 여기에 나열된 버전][4] 이상이어야 합니다. 또한 커스텀 인증서 경로의 주소 및 맵에 노드 이름을 사용하도록 Kubelet 설정을 업데이트해야 합니다.

{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Requires supported node image version
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
{{% tab "Operator" %}}

DatadogAgent 쿠버네티스 리소스:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: true
  global:
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
{{< /tabs >}}

일부 설정에서, 포드 내부 `spec.nodeName`에 대한 DNS 해결책이 AKS에서 작동하지 않을 수 있습니다. 이는 모든 AKS 윈도우 노드, 그리고 리눅스 노드에 있는 커스텀 DNS를 사용해 가상 네트워크에서 클러스터를 설정할 때 보고되었습니다. 이 경우 첫 번째 AKS 설정을 사용합니다. Kubelet 호스트 경로(기본값은 `status.hostIP`)에 대한 설정을 모두 제거하고 `tlsVerify: false`를 사용합니다. 이 설정은 **필수**입니다.

## Google Kubernetes Engine (GKE) {#GKE}

GKE는 두 가지 작동 모드로 설정할 수 있습니다:

- **표준**: 클러스터의 기본 인프라를 관리하여 노드 설정의 유연성을 제공합니다.
- **Autopilot**: GKE는 노드 및 노드 풀을 포함한 클러스터의 기본 인프라를 공급 및 관리함으로써 hands-off 경험과 함께 최적화된 클러스터를 제공합니다.

클러스터의 작동 모드에 따라 Datadog 에이전트를 다르게 설정해야 합니다.

### 표준

에이전트 7.26부터는 GKE에 대한 특정 설정이 필요하지 않습니다(`Docker` 또는 `containerd` 실행 여부와 관계 없음).

**참고**: COS (Container Optimized OS)를 사용하는 경우, Helm 차트 버전 3.0.1부터 eBPF 기반 `OOM Kill` 및 `TCP Queue Length` 검사가 지원됩니다. 이러한 검사를 활성화하려면 다음과 같이 설정합니다:
- `datadog.systemProbe.enableDefaultKernelHeadersPaths`를 `false`로 설정

### Autopilot

GKE Autopilot 에는 아래와 같이 몇 가지 설정이 필요합니다.

Datadog은 에이전트 컨테이너에 대한 리소스 제한을 지정할 것을 권장합니다. Autopilot은 비교적 낮은 기본 제한(CPU 50m, 메모리 100Mi)을 설정하므로 사용자 환경에 따라 에이전트 컨테이너가 빠르게 OOMKill로 이어질 수 있습니다. 이에 해당되면, 트레이스 에이전트 및 프로세스 에이전트 컨테이너에 대한 리소스 제한도 지정하시기 바랍니다.

{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>

  # Enable the new `kubernetes_state_core` check.
  kubeStateMetricsCore:
    enabled: true
  # Avoid deploying kube-state-metrics chart.
  # The new `kubernetes_state_core` doesn't require to deploy the kube-state-metrics anymore.
  kubeStateMetricsEnabled: false

agents:
  containers:
    agent:
      # resources for the Agent container
      resources:
        requests:
          cpu: 200m
          memory: 256Mi
        limits:
          cpu: 200m
          memory: 256Mi

    traceAgent:
      # resources for the Trace Agent container
      resources:
        requests:
          cpu: 100m
          memory: 200Mi
        limits:
          cpu: 100m
          memory: 200Mi

    processAgent:
      # resources for the Process Agent container
      resources:
        requests:
          cpu: 100m
          memory: 200Mi
        limits:
          cpu: 100m
          memory: 200Mi

providers:
  gke:
    autopilot: true
```

{{% /tab %}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift는 기본적으로 보안이 강화된 상태로 제공되므로(SELinux, SecurityContextConstraints) 몇 가지 설정이 필요합니다:
- 노드 에이전트 및 클러스터 에이전트용 SCC 생성
- OpenShift가 CRI-O 컨테이너 런타임을 사용하는 특정 CRI 소켓 경로
- Kubelet API 인증서가 항상 클러스터 CA에 의해 서명되는 것은 아닙니다.
- `master`와 `infra` 노드에 있는 노드 에이전트를 예약하려면 허용 오차가 필요합니다.
- 클러스터 이름은 클라우드 제공자에서 자동 검색할 수 없으므로 반드시 설정해야 합니다.

이 설정은 OpenShift 3.11 및 OpenShift 4 모두 지원하나 OpenShift 4에서 가장 잘 작동합니다.

{{< tabs >}}
{{% tab "Helm" %}}

커스텀 `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  criSocketPath: /var/run/crio/crio.sock
  # Depending on your DNS/SSL setup, it might not be possible to verify the Kubelet cert properly
  # If you have proper CA, you can switch it to true
  kubelet:
    tlsVerify: false
agents:
  podSecurity:
    securityContextConstraints:
      create: true
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
kube-state-metrics:
  securityContext:
    enabled: false
```

{{% /tab %}}
{{% tab "Operator" %}}

OpenShift에서 Datadog 오퍼레이터를 사용하는 경우, OperatorHub 또는 RedHat Marketplace를 통해 설치하는 것이 좋습니다.
아래 설정은 (SCC/ServiceAccount 설정으로 인해) 이러한 설정에서 작동하도록 되어 있습니다
에이전트가 Datadog 오퍼레이터와 동일한 네임스페이스에 설치되어 있을 때 작동합니다.

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
      port: 8443
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
    criSocketPath: /var/run/crio/crio.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      serviceAccountName: datadog-agent-scc
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/infra
          operator: Exists
          effect: NoSchedule
```

{{% /tab %}}
{{< /tabs >}}

## Rancher {#Rancher}

Rancher 설치는 바닐라 쿠버네티스에 가깝기 때문에 약간의 설정만 필요합니다:
- `controlplane`와 `etcd` 노드에 있는 노드 에이전트를 예약하려면 허용 오차가 필요합니다.
- 클러스터 이름은 클라우드 제공업체에서 자동으로 검색할 수 없으므로 설정해야 합니다.

{{< tabs >}}
{{% tab "Helm" %}}

커스텀 `values.yaml`:

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
{{% tab "Operator" %}}

DatadogAgent 쿠버네티스 리소스:

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
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - key: node-role.kubernetes.io/controlplane
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/etcd
          operator: Exists
          effect: NoExecute
```

{{% /tab %}}
{{< /tabs >}}

## Oracle Container Engine for Kubernetes (OKE) {#OKE}

특정 설정이 필요하지 않습니다.

컨테이너 모니터링을 활성화하려면, 다음 (`containerd` 검사)을 추가합니다.

{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  criSocketPath: /run/dockershim.sock
  env:
  - name: DD_AUTOCONFIG_INCLUDE_FEATURES
    value: "containerd"
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent 쿠버네티스 리소스:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    criSocketPath: /run/dockershim.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
```

{{% /tab %}}
{{< /tabs >}}

더 많은 `values.yaml` 예제는 [Helm 차트 리포지토리][1]에서 확인할 수 있으며,
더 많은 `DatadogAgent` 예제는 [Datadog 오퍼레이터 리포지토리][2]를 참조하세요.

## vSphere Tanzu Kubernetes Grid (TKG) {#TKG}

TKG를 사용하려면 아래와 같이 몇 가지 설정을 변경해야 합니다. 예를 들어, 컨트롤러가 `master` 노드에서 노드 에이전트를 예약하려면 허용 오차를 설정해야 합니다.


{{< tabs >}}
{{% tab "Helm" %}}

커스텀 `values.yaml`:

```yaml
datadog:
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
{{% tab "Operator" %}}

DatadogAgent 쿠버네티스 리소스:

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
{{< /tabs >}}


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[2]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent/v2alpha1
[3]: /ko/containers/cluster_agent/admission_controller
[4]: https://github.com/Azure/AKS/releases/tag/2022-10-30