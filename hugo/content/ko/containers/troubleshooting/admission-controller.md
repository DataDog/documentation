---
description: Datadog Cluster Agent Admission Controller 및 라이브러리 주입 관련 일반적인 문제 해결
further_reading:
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: 블로그
  text: Kubernetes 추적 자동 계측
- link: /containers/cluster_agent/admission_controller/
  tag: 설명서
  text: Cluster Agent Admission Controller
- link: /tracing/trace_collection/library_injection_local/?tab=kubernetes
  tag: 설명서
  text: Kubernetes 라이브러리 주입
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: 아키텍처 센터
  text: Datadog Operator 및 Admission Controller를 사용한 앱 계측
title: Admission Controller 문제 해결
---
## 개요 {#overview}

이 페이지에서는 Datadog Cluster Agent의 [Admission Controller][1]에 대한 문제 해결 방법을 제공합니다.

## 일반적인 문제 {#common-problems}

### 기존 포드 업데이트 {#update-pre-existing-pods}
Admission Controller는 Kubernetes 클러스터 내에서 새 포드가 생성될 때 응답합니다. 포드 생성 시 Cluster Agent는 Kubernetes로부터 요청을 받고 포드에 적용할 변경 사항(있는 경우)에 대한 세부 정보로 응답합니다.

따라서 **Admission Controller는 클러스터 내의 기존 포드를 변경하지 않습니다**. Admission Controller를 최근에 활성화했거나 다른 환경 변경 사항을 적용한 경우, 기존 포드를 삭제하고 Kubernetes가 포드를 다시 생성하도록 하세요. 이렇게 하면 Admission Controller가 포드를 업데이트합니다. 

### 레이블 및 주석 {#labels-and-annotations}
Cluster Agent는 생성된 포드의 레이블과 주석에 응답하며, 해당 포드를 생성한 워크로드(Deployment, DaemonSet, CronJob 등)에는 응답하지 **않습니다**. 포드 템플릿이 이를 적절하게 참조하는지 확인하세요. 

예를 들어, 다음 템플릿은 [APM 구성을 위한 레이블][2]과 [라이브러리 주입을 위한 주석][3]을 설정합니다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-deployment
spec:
  #(...)  
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true"
      annotations:
        admission.datadoghq.com/<LANGUAGE>-lib.version: <VERSION>
    spec:
      containers:
      #(...)
```

### 애플리케이션 포드가 생성되지 않음 {#application-pods-are-not-created}

Admission Controller의 주입 모드(`socket`, `hostip`, `service`)는 Cluster Agent의 구성에 의해 설정됩니다. 예를 들어, Agent에서 `socket` 모드가 활성화된 경우 Admission Controller도 `socket` 모드를 사용합니다.

GKE Autopilot 또는 OpenShift를 사용하는 경우, 특정 주입 모드를 사용해야 합니다.

#### GKE Autopilot {#gke-autopilot}

GKE Autopilot은 `hostPath`가 적용된 `volumes`의 사용을 제한합니다. 따라서 Admission Controller가 `socket` 모드를 사용하는 경우, GKE Warden에 의해 포드의 예약이 차단됩니다.

Helm 차트에서 GKE Autopilot 모드를 활성화하면 이러한 현상을 방지하기 위해 `socket` 모드가 비활성화됩니다. APM을 활성화하려면 포트를 활성화하고 대신 `hostip` 또는 `service` 메서드를 사용하세요. Admission Controller는 기본적으로 이와 맞게 `hostip`를 사용합니다.

{{< tabs >}}
{{% tab "Helm" %}}

```yaml
datadog:
  apm:
    portEnabled: true
  #(...)

providers:
  gke:
    autopilot: true
```
{{% /tab %}}
{{< /tabs >}}

Autopilot에 관한 자세한 구성 정보는 [Kubernetes 배포판][17]을 참조하세요.

#### OpenShift {#openshift}

OpenShift에는 `hostPath`가 적용된 `volume` 등 추가 권한으로 포드를 배포하는 데 필요한 `SecurityContextConstraints`(SCC)가 있습니다. Datadog 구성 요소는 Datadog 포드 관련 활동을 허용하기 위해 SCC와 함께 배포되지만 Datadog은 다른 포드에 대해 SCC를 생성하지 않습니다. Admission Controller가 애플리케이션 포드에 소켓 기반 구성을 추가하여 배포에 실패할 수도 있습니다.

OpenShift를 사용하는 경우 `hostip` 모드를 사용하세요. 다음 구성에서는 소켓 옵션을 비활성화하여 `hostip` 모드를 활성화합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
    dogstatsd:
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
```
`features.admissionController.agentCommunicationMode`를 `hostip` 또는 `service`로 직접 설정할 수도 있습니다.

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  apm:
    portEnabled: true
    socketEnabled: false
```
`clusterAgent.admissionController.configMode`를 `hostip` 또는 `service`로 직접 설정할 수도 있습니다.
{{% /tab %}}
{{< /tabs >}}

OpenShift에 관한 자세한 구성 정보는 [Kubernetes 배포판][18]을 참조하세요.

## Admission Controller 상태 조회 {#view-admission-controller-status}

Cluster Agent의 상태 출력은 `MutatingWebhookConfiguration`에 대한 `datadog-webhook`이 생성되어 유효한 인증서를 포함하는지 확인할 수 있는 정보를 제공합니다.

다음 명령을 실행합니다.

```bash
% kubectl exec -it <Cluster Agent Pod> -- agent status
```

출력은 다음과 유사합니다.

```
...
Admission Controller
====================
  
    Webhooks info
    -------------
      MutatingWebhookConfigurations name: datadog-webhook
      Created at: 2023-09-25T22:32:07Z
      ---------
        Name: datadog.webhook.auto.instrumentation
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injectlib
      ---------
        Name: datadog.webhook.config
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injectconfig
      ---------
        Name: datadog.webhook.tags
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injecttags
  
    Secret info
    -----------
    Secret name: webhook-certificate
    Secret namespace: default
    Created at: 2023-09-25T22:32:07Z
    CA bundle digest: f24b6c0c40feaad2
    Duration before certificate expiration: 8643h34m2.557676864s
...
```

이 출력은 `default` 네임스페이스에 배포된 Cluster Agent와 관련이 있습니다. `Service` 및 `Secret`은 사용된 네임스페이스와 일치해야 합니다.

## Admission Controller 로그 조회 {#view-admission-controller-logs}

디버그 로그는 Admission Controller를 올바르게 설정했는지 확인하는 데 도움이 됩니다. 다음 구성으로 [디버그 로그 활성화][3] 작업을 수행하세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    site: <DATADOG_SITE>
    logLevel: debug
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  logLevel: debug
```

{{% /tab %}}
{{< /tabs >}}

### 검증 `datadog-webhook` {#validate-datadog-webhook}

**로그 예시**:

```
<TIMESTAMP> | CLUSTER | INFO | (pkg/clusteragent/admission/controllers/secret/controller.go:73 in Run) | Starting secrets controller for default/webhook-certificate
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:148 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:148 in enqueue) | Adding object with key datadog-webhook to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/util/kubernetes/apiserver/util.go:47 in func1) | Sync done for informer admissionregistration.k8s.io/v1/mutatingwebhookconfigurations in 101.116625ms, last resource version: 152728
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_v1.go:140 in reconcile) | The Webhook datadog-webhook was found, updating it
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h17m27.909792831s
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:176 in processNextWorkItem) | Webhook datadog-webhook reconciled successfully
```

`datadog-webhook` 웹훅이 조정되지 않은 경우, [구성 지침][1]에 따라 Admission Controller를 올바르게 활성화했는지 확인하세요. 

### 주입 검증 {#validate-injection}

**로그 예시**:

```
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h12m28.007769373s
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_TRACE_AGENT_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_DOGSTATSD_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_ENTITY_ID' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_SERVICE' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/auto_instrumentation.go:336 in injectLibInitContainer) | Injecting init container named "datadog-lib-python-init" with image "gcr.io/datadoghq/dd-lib-python-init:v1.18.0" into pod with generate name example-pod-123456789-
```

특정 포드에 대한 주입 오류가 발생하면 Datadog 구성 및 포드 구성을 준비하여 Datadog 지원팀에 문의하세요.

*어떤* 포드에 대해서도 주입 시도가 확인되지 않으면 `mutateUnlabelled` 설정을 확인하고 포드 레이블이 예상 값과 일치하는지 확인하세요. 값이 일치한다면 문제는 컨트롤 플레인, 웹훅, 서비스 간의 네트워킹 문제일 가능성이 높습니다. 자세한 내용은 [네트워킹](#networking)을 참조하세요.

## 네트워킹 {#networking}

### 네트워크 정책 {#network-policies}

Kubernetes [네트워크 정책][5]은 포드에 대한 수신(인바운드) 트래픽 및 송신(아웃바운드) 트래픽 흐름을 제어하는 데 도움이 됩니다.

네트워크 정책을 사용하는 경우, Datadog은 이 포트를 통한 포드 연결을 보장하기 위해 Cluster Agent에 해당하는 정책을 생성할 것을 권장합니다. 다음 구성을 사용하여 이를 수행할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    #(...)
    networkPolicy:
      create: true
      flavor: kubernetes
```
{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  #(...)
  networkPolicy:
    create: true
    flavor: kubernetes
```
{{% /tab %}}
{{< /tabs >}}

`flavor`를 `kubernetes`로 설정하여 `NetworkPolicy` 리소스를 생성합니다. 

또는 Cilium 기반 환경의 경우, `flavor`를 `cilium`으로 설정하여 `CiliumNetworkPolicy` 리소스를 생성합니다.

### Kubernetes 배포판에 대한 네트워크 문제 해결 {#network-troubleshooting-for-kubernetes-distributions}

포드가 생성되면 Kubernetes 클러스터는 컨트롤 플레인에서 `datadog-webhook`, 서비스를 거쳐 최종적으로 Cluster Agent 포드로 요청을 보냅니다. 이 요청을 실행하려면 Admission Controller 포트(`8000`)를 통해 컨트롤 플레인에서 Cluster Agent가 있는 노드로 인바운드 연결을 설정해야 합니다. 이 요청이 해결되면 Cluster Agent는 Datadog SDK에 대한 네트워크 연결을 구성하기 위해 포드를 변경합니다.
Admission Controller 서비스는 포트 443에서 트래픽을 수신해 포트 8000에서 Cluster Agent 포드로 트래픽을 전달합니다.

Kubernetes 배포판에 따라 보안 규칙 및 Admission Controller 설정에 대한 추가 요구 사항이 있을 수 있습니다.

#### Amazon Elastic Kubernetes Service(EKS) {#amazon-elastic-kubernetes-service-eks}

EKS 클러스터에서는 기본적으로 Linux 기반 노드 중 어디에나 Cluster Agent 포드를 배포할 수 있습니다. 이러한 노드와 해당 EC2 인스턴스에는 다음 [인바운드 규칙][7]이 포함된 [보안 그룹][6]이 필요합니다.
- **프로토콜**: TCP
- **포트 범위**: `8000` 또는 `8000`을 포함하는 범위
- **소스**: 클러스터 보안 그룹 _또는_ 클러스터의 추가 보안 그룹 중 하나의 ID입니다. 이러한 ID는 EKS 콘솔의 EKS 클러스터 _네트워킹_ 탭에서 찾을 수 있습니다.

이 보안 그룹 규칙을 통해 컨트롤 플레인이 포트 `8000`을 통해 노드 및 다운스트림 Cluster Agent에 액세스할 수 있습니다.

각각 별도의 보안 그룹을 사용하는 [관리형 노드 그룹][8]이 여러 개 있는 경우, 각 보안 그룹에 이 인바운드 규칙을 추가하세요.

##### 컨트롤 플레인 로깅 {#control-plane-logging}

네트워킹 구성을 확인하려면 API 서버에 대해 [EKS 컨트롤 플레인 로깅][9]을 활성화하세요. [CloudWatch 콘솔][10]에서 이러한 로그를 조회할 수 있습니다.

그런 다음 포드 중 하나를 삭제하여 Admission Controller를 통한 요청을 다시 트리거하세요. 요청이 실패하면 다음과 유사한 로그가 표시됩니다.

```
W0908 <TIMESTAMP> 10 dispatcher.go:202] Failed calling webhook, failing open datadog.webhook.auto.instrumentation: failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
E0908 <TIMESTAMP> 10 dispatcher.go:206] failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
```

이러한 실패는 `default` 네임스페이스에 배포된 Cluster Agent와 관련이 있으며, DNS 이름은 사용된 네임스페이스에 따라 조정됩니다.

`datadog.webhook.tags` 및 `datadodg.webhook.config` 등 다른 Admission Controller 웹훅에 대한 실패도 나타날 수 있습니다. 

**참고:** EKS는 종종 클러스터에 대한 CloudWatch 로그 그룹 내에 두 개의 로그 스트림을 생성합니다. 이러한 유형의 로그를 확인하려면 두 로그 스트림을 모두 확인하세요.

#### Azure Kubernetes Service(AKS) {#azure-kubernetes-service-aks}

[AKS의 Admission Controller 웹훅][11]을 사용하려면 다음 구성을 사용하세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  #(...)
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

```yaml
datadog:
  #(...)

providers:
  aks:
    enabled: true
```

`providers.aks.enabled` 옵션은 환경 변수 `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"`를 설정합니다.
{{% /tab %}}
{{< /tabs >}}

#### Google Kubernetes Engine(GKE) {#google-kubernetes-engine-gke}

[GKE 프라이빗 클러스터][12]를 사용하는 경우, 컨트롤 플레인에서 포트 `8000`으로의 인바운드 액세스를 허용하도록 방화벽 규칙을 조정해야 합니다.

포트 `8000`에서 TCP를 통한 수신을 허용하려면 [방화벽 규칙 추가][13] 작업을 수행하세요.

기존 규칙을 편집할 수도 있습니다. 기본적으로 클러스터 네트워크에는 `gke-<CLUSTER_NAME>-master`라는 방화벽 규칙이 있습니다. 이 규칙의 _소스 필터_에 [클러스터 컨트롤 플레인의 CIDR 블록][14]이 포함되어 있는지 확인하세요. 포트 `8000`에서 프로토콜 `tcp`를 통한 액세스를 허용하려면 이 규칙을 편집하세요.

자세한 내용은 GKE 설명서의 [특정 사용 사례에 대한 방화벽 규칙 추가][15]를 참조하세요.

#### Rancher {#rancher}

Rancher를 EKS 클러스터 또는 프라이빗 GKE 클러스터와 함께 사용하는 경우 추가 구성이 필요합니다. 자세한 내용은 Rancher 설명서의 [Rancher 웹훅 - 일반적인 문제][16]를 참조하세요.

**참고**: Datadog Admission Controller의 웹훅은 Rancher 웹훅과 유사하게 작동하므로 Datadog에 Rancher의 `9443` 대신 포트 `8000`에 대한 액세스 권한이 필요합니다.

##### Rancher 및 EKS {#rancher-and-eks}
EKS 클러스터에서 Rancher를 사용하려면 다음 구성으로 Cluster Agent 포드를 배포하세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    clusterAgent:
      hostNetwork: true
```
{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  #(...)

clusterAgent:
  useHostNetwork: true
```
{{% /tab %}}
{{< /tabs >}}

이 페이지의 [Amazon EKS](#amazon-elastic-kubernetes-service-eks) 섹션에 설명된 대로 보안 그룹 인바운드 규칙도 추가해야 합니다.

##### Rancher 및 GKE {#rancher-and-gke}
프라이빗 GKE 클러스터에서 Rancher를 사용하려면 포트 `8000`에서 TCP를 통한 인바운드 액세스를 허용하도록 방화벽 규칙을 편집하세요. 이 페이지의 [GKE](#google-kubernetes-engine-gke) 섹션을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/cluster_agent/admission_controller
[2]: /ko/containers/cluster_agent/admission_controller/#apm-and-dogstatsd
[3]: /ko/tracing/trace_collection/library_injection_local/?tab=kubernetes
[4]: /ko/agent/troubleshooting/debug_mode/
[5]: https://kubernetes.io/docs/concepts/services-networking/network-policies/#networkpolicy-resource
[6]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html
[7]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[8]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[9]: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html
[10]: https://console.aws.amazon.com/cloudwatch/home#logs:prefix=/aws/eks
[11]: https://docs.microsoft.com/en-us/azure/aks/faq#can-i-use-admission-controller-webhooks-on-aks
[12]: https://cloud.google.com/kubernetes-engine/docs/concepts/private-cluster-concept
[13]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#step_3_add_a_firewall_rule
[14]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#step_1_view_control_planes_cidr_block
[15]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[16]: https://ranchermanager.docs.rancher.com/reference-guides/rancher-webhook#common-issues
[17]: /ko/containers/kubernetes/distributions/#autopilot
[18]: /ko/containers/kubernetes/distributions/#Openshift