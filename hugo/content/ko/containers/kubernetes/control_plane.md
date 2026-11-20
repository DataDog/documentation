---
aliases:
- /ko/agent/kubernetes/control_plane
description: API 서버, etcd, 컨트롤러 매니저 및 스케줄러 등 Kubernetes 컨트롤 플레인 구성 요소 모니터링
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: 애플리케이션 로그 수집
- link: /agent/kubernetes/apm
  tag: Documentation
  text: 애플리케이션 트레이스 수집
- link: /agent/kubernetes/prometheus
  tag: Documentation
  text: Prometheus 메트릭 수집
- link: /agent/kubernetes/integrations
  tag: Documentation
  text: 애플리케이션 메트릭 및 로그 자동 수집
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/kubernetes/tag
  tag: Documentation
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
title: Kubernetes 컨트롤 플레인 모니터링
---
## 개요

이 섹션에서는 Kubernetes 컨트롤 플레인을 모니터링하기 위한 구체적인 내용을 문서화하고, 우수한 기본 구성을 제공하고자 합니다. 그런 다음 사용자가 이러한 구성을 사용자 지정하여 각종 Datadog 기능을 추가할 수 있습니다.

[API 서버][1], [Etcd][2], [컨트롤러 매니저][3] 및 [스케줄러][4]에 대한 Datadog integrations를 사용하면 Kubernetes 컨트롤 플레인의 4가지 구성 요소 전체에서 주요 메트릭을 수집할 수 있습니다.

* [Kubeadm을 이용한 Kubernetes](#Kubeadm)
* [Amazon EKS에서의 Kubernetes](#EKS)
* [OpenShift 4에서의 Kubernetes](#OpenShift4)
* [OpenShift 3에서의 Kubernetes](#OpenShift3)
* [Talos Linux에서의 Kubernetes](#TalosLinux)
* [Rancher Kubernetes Engine(v2.5+)에서의 Kubernetes](#RKE)
* [Rancher Kubernetes Engine(\&lt;v2.5)에서의 Kubernetes](#RKEBefore2_5)
* [관리형 서비스(AKS, GKE)에서의 Kubernetes](#ManagedServices)

## Kubeadm을 이용한 Kubernetes {#Kubeadm}

다음 구성은 Kubernetes `v1.18+`에서 테스트했습니다.

### API 서버

API 서버 통합은 자동으로 구성됩니다. Datadog Agent가 해당 통합을 자동으로 검색합니다.

### Etcd

Datadog Agent 검사는 호스트에 있는 Etcd 인증서에 대한 읽기 액세스 권한을 제공함으로써 Etcd와 통신하고 Etcd 메트릭 수집을 시작할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
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
      extraConfd:
        configMap:
          name: datadog-checks
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/etc/kubernetes/pki/etcd
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
      volumes:
        - name: etcd-certs
          hostPath:
            path: /etc/kubernetes/pki/etcd
        - name: disable-etcd-autoconf
          emptyDir: {}
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: datadog-checks
data:
  etcd.yaml: |-
    ad_identifiers:
      - etcd
    init_config:
    instances:
      - prometheus_url: https://%%host%%:2379/metrics
        tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
        tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
        tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  ignoreAutoConfig:
  - etcd
  confd:
    etcd.yaml: |-
      ad_identifiers:
        - etcd
      instances:
        - prometheus_url: https://%%host%%:2379/metrics
          tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
agents:
  volumes:
    - hostPath:
        path: /etc/kubernetes/pki/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
    operator: Exists
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

### 컨트롤러 매니저 및 스케줄러

#### 안전하지 않은 포트

컨트롤러 매니저와 스케줄러 인스턴스에서 안전하지 않은 포트가 활성화된 경우, Datadog Agent가 통합을 검색한 다음 추가 구성 없이 메트릭 수집을 시작합니다.

#### 안전한 포트

안전한 포트를 사용하면 인증과 승인을 통해 컨트롤 플레인 구성 요소를 보호할 수 있습니다. Datadog Agent는 안전한 포트를 대상으로 하여 컨트롤러 매니저 및 스케줄러 메트릭을 수집할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
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
      extraConfd:
        configMap:
          name: datadog-checks
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/etc/kubernetes/pki/etcd
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
            - name: disable-scheduler-autoconf
              mountPath: /etc/datadog-agent/conf.d/kube_scheduler.d
            - name: disable-controller-manager-autoconf
              mountPath: /etc/datadog-agent/conf.d/kube_controller_manager.d
      volumes:
        - name: etcd-certs
          hostPath:
            path: /etc/kubernetes/pki/etcd
        - name: disable-etcd-autoconf
          emptyDir: {}
        - name: disable-scheduler-autoconf
          emptyDir: {}
        - name: disable-controller-manager-autoconf
          emptyDir: {}
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: datadog-checks
data:
  etcd.yaml: |-
    ad_identifiers:
      - etcd
    init_config:
    instances:
      - prometheus_url: https://%%host%%:2379/metrics
        tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
        tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
        tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
  kube_scheduler.yaml: |-
    ad_identifiers:
      - kube-scheduler
    instances:
      - prometheus_url: https://%%host%%:10259/metrics
        ssl_verify: false
        bearer_token_auth: true
  kube_controller_manager.yaml: |-
    ad_identifiers:
      - kube-controller-manager
    instances:
      - prometheus_url: https://%%host%%:10257/metrics
        ssl_verify: false
        bearer_token_auth: true
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  ignoreAutoConfig:
    - etcd
    - kube_scheduler
    - kube_controller_manager
  confd:
    etcd.yaml: |-
      ad_identifiers:
        - etcd
      instances:
        - prometheus_url: https://%%host%%:2379/metrics
          tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
    kube_scheduler.yaml: |-
      ad_identifiers:
        - kube-scheduler
      instances:
        - prometheus_url: https://%%host%%:10259/metrics
          ssl_verify: false
          bearer_token_auth: true
    kube_controller_manager.yaml: |-
      ad_identifiers:
        - kube-controller-manager
      instances:
        - prometheus_url: https://%%host%%:10257/metrics
          ssl_verify: false
          bearer_token_auth: true
agents:
  volumes:
    - hostPath:
        path: /etc/kubernetes/pki/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
    operator: Exists
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

**참고:**

 자체 서명한 인증서를 사용하는 경우, `kube_controller_manager` 및 `kube_scheduler` 구성의 `ssl_verify` 필드를 `false`로 설정해야 합니다.
 안전한 포트를 대상으로 설정할 때 Datadog Agent가 컨트롤러 매니저와 스케줄러 구성의 `bindaddress` 옵션에 연결할 수 있어야 합니다. 예시:

```yaml
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
controllerManager:
  extraArgs:
    bind-address: 0.0.0.0
scheduler:
  extraArgs:
    bind-address: 0.0.0.0
```

## Amazon EKS에서의 Kubernetes {#EKS}

### 권장 방법

<div class="alert alert-info">이 기능은 미리 보기입니다.</div>

Datadog은 API 서버, 컨트롤러 매니저 및 스케줄러 등 Kubernetes 컨트롤 플레인 구성 요소 모니터링을 지원합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### 전제 조건

1. Datadog Operator >= `v1.18.0`
1. Datadog Agent >= `v7.69`

#### 일반 설정

컨트롤 플레인 모니터링은 기본적으로 활성화되어 있지만, 활성화하려면 내부 상태 검사가 필요합니다.

[datadogoperator Helm 차트](https://github.com/DataDog/helmcharts/tree/main/charts/datadogoperator)를 사용하여 내부 상태 검사를 활성화할 수 있습니다.

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

다음 명령줄 사용:

```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

이 기능은 기본적으로 활성화되어 있기 때문에, 최소한의 DatadogAgent 사양을 배포할 수 있습니다.

{{% /tab %}}

{{% tab "Helm" %}}

#### 전제 조건

1. Helm 차트 버전 >= `3.152.0`
1. Datadog Agent >= `v7.69`

#### 일반 설정

`providers.eks.controlPlaneMonitoring` 옵션을 사용해 컨트롤 플레인 모니터링을 활성화합니다.

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  eks:
    controlPlaneMonitoring: true
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

#### 검증
검사가 실행 중인지 확인:

```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

다음 찾기:
 `kube_apiserver_metrics`
 `kube_controller_manager`
 `kube_scheduler`

Datadog에 다음을 포함한 컨트롤 플레인 메트릭이 표시됩니다.
 `kube_apiserver.*`
 `kube_controller_manager.*`
 `kube_scheduler.*`

### 레거시 설정

Amazon Elastic Kubernetes Service(EKS)는 클러스터 검사를 사용해 모든 컨트롤 플레인 구성 요소를 모니터링하도록 지원합니다.

#### 전제 조건
 Kubernetes 버전 >=1.28에서 실행되는 EKS 클러스터
 다음 중 하나를 사용하여 Agent 배포:
   Helm 차트 버전 >= `3.90.1`
   Datadog Operator >= `v1.13.0`
 Datadog [Cluster Agent][6] 활성화

`default/kubernetes` 서비스에 다음 주석 추가:

```yaml
annotations:
  ad.datadoghq.com/endpoints.checks: |-
    {
      "kube_apiserver_metrics": {
        "init_config": {},
        "instances": [
          {
            "prometheus_url": "https://%%host%%:%%port%%/metrics",
            "bearer_token_auth": "true"
          }
        ]
      }
    }
  ad.datadoghq.com/service.checks: |-
    {
      "kube_controller_manager": {
        "init_config": {},
        "instances": [
          {
            "prometheus_url": "https://%%host%%:%%port%%/apis/metrics.eks.amazonaws.com/v1/kcm/container/metrics",
            "extra_headers": {"accept":"*/*"},
            "bearer_token_auth": "true",
            "tls_ca_cert": "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
          }
        ]
      },
      "kube_scheduler": {
        "init_config": {},
        "instances": [
          {
            "prometheus_url": "https://%%host%%:%%port%%/apis/metrics.eks.amazonaws.com/v1/ksh/container/metrics",
            "extra_headers": {"accept":"*/*"},
            "bearer_token_auth": "true",
            "tls_ca_cert": "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
          }
        ]
      }
    }
```

**참고:**
 Amazon은 [`metrics.eks.amazonaws.com`][11] API 그룹 아래에 `kube_controller_manager` 및 `kube_scheduler` 메트릭을 노출합니다.
 `"extra_headers":{"accept":"*/*"}`를 추가하면 EKS 메트릭 API를 쿼리할 때 `HTTP 406` 오류가 방지됩니다.

## OpenShift 4에서의 Kubernetes {#OpenShift4}

<div class="alert alert-info">이 기능은 미리 보기입니다.</div>

Datadog은 API 서버, etcd, 컨트롤러 매니저 및 스케줄러 등 Kubernetes 컨트롤 플레인 구성 요소 모니터링을 지원합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### 전제 조건

1. Datadog Operator >= `v1.18.0`
1. Datadog Agent >= `v7.69`

**참고**: 버전 4.04.13에서는 `etcd`가 지원되지 않습니다.

#### 일반 설정

컨트롤 플레인 모니터링은 기본적으로 활성화되어 있지만, 활성화하려면 내부 상태 검사가 필요합니다.

[datadogoperator Helm 차트][12]를 사용하여 내부 상태 검사를 활성화할 수 있습니다.

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

다음 명령줄 사용:

```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

또는 OperatorHub/Marketplace를 통해([권장 방법](installopenshift.md)) Operator를 설치한 **OpenShift 사용자**의 경우 Operator 클러스터 서비스 버전을 패칭:

```shell
oc patch csv <datadog-operator.VERSION> -n <datadog-operator-namespace> \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/install/spec/deployments/0/spec/template/spec/containers/0/args/-", "value": "--introspectionEnabled=true"}]'
```

이 기능은 기본적으로 활성화되어 있기 때문에, 최소한의 DatadogAgent 사양을 배포할 수 있습니다.

해당 배포에서 검사를 예약하려면 `features.clusterChecks.useClusterChecksRunners`를 활성화합니다. 그러지 않으면 컨트롤 플레인 검사가 Node Agent에서 실행됩니다.

OpenShift 4.14 이후 버전의 경우, etcd 모니터링을 하려면 etcd 인증서를 복사해야 합니다. 정확한 명령은 Operator 로그를 참조하세요. 다음 예시를 참조하세요(필요에 따라 네임스페이스 조정).

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | \
  sed 's/namespace: openshift-etcd-operator/namespace: datadog/' | \
  oc apply -f -
```

[12]: https://github.com/DataDog/helmcharts/tree/main/charts/datadogoperator

{{% /tab %}}
{{% tab "Helm" %}}

#### 전제 조건

1. Helm 차트 버전 >= `3.150.0`
1. Datadog Agent >= `v7.69`

**참고**: 버전 4.04.13에서는 `etcd`가 지원되지 않습니다.

#### 일반 설정

`providers.openshift.controlPlaneMonitoring` 옵션을 사용해 컨트롤 플레인 모니터링을 활성화합니다.

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  openshift:
    controlPlaneMonitoring: true
{{< /code-block >}}

OpenShift 4.14 이후 버전의 경우, etcd 모니터링을 하려면 etcd 인증서를 복사해야 합니다. 인증서를 Datadog Agent와 같은 네임스페이스에 복사하려면:

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

{{% /tab %}}
{{< /tabs >}}

#### 검증
검사가 실행 중인지 확인:

```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

다음 찾기:
 `kube_apiserver_metrics`
 `kube_controller_manager`
 `kube_scheduler`
 `etcd`

Datadog에 다음을 포함한 컨트롤 플레인 메트릭이 표시됩니다.
 `kube_apiserver.*`
 `kube_controller_manager.*`
 `kube_scheduler.*`
 `etcd.*`

### 레거시 설정

OpenShift 4에서는 엔드포인트 검사를 사용해 모든 컨트롤 플레인 구성 요소를 모니터링할 수 있습니다.

#### 전제 조건

1. Datadog [Cluster Agent][6] 활성화
1. [클러스터 검사][7] 활성화
1. [엔드포인트 검사][8] 활성화
1. 서비스를 편집하고 시크릿을 생성하는 데 충분한 권한으로 로그인했는지 확인합니다.

#### API 서버

API 서버는 `default` 네임스페이스의 서비스 `kubernetes` 뒤에서 실행됩니다. 이 서비스에 `kube_apiserver_metrics` 구성을 주석으로 추가합니다.

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

마지막 주석 `ad.datadoghq.com/endpoints.resolve`가 필요한 이유는 서비스가 정적 포드 앞에 있기 때문입니다. Datadog Cluster Agent가 검사를 엔드포인트 검사로 예약하고, 클러스터 검사 러너로 보냅니다. 검사를 실행 중인 노드는 다음으로 식별할 수 있습니다.

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```
#### Etcd

{{% collapse-content title="Etcd OpenShift 4.0  4.13" level="h4" %}}
Etcd 서비스와 통신하려면 인증서가 필요하며, 이 인증서는 `openshiftmonitoring` 네임스페이스의 시크릿 `kubeetcdclientcerts`에서 찾을 수 있습니다. Datadog Agent에 이러한 인증서에 대한 액세스 권한을 부여하려면, 먼저 인증서를 Datadog Agent가 실행 중인 같은 네임스페이스에 복사합니다.

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

이러한 인증서는 아래와 같이 볼륨 및 볼륨 마운트를 추가하여 클러스터 검사 러너 포드에 마운팅해야 합니다.

**참고**: 마운트는 에이전트와 함께 패키징된 Etcd 검사 자동 구성 파일을 비활성화할 목적으로 포함된 것이기도 합니다.


{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    clusterChecksRunner:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /etc/etcd-certs
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
      volumes:
        - name: etcd-certs
          secret:
            secretName: kube-etcd-client-certs
        - name: disable-etcd-autoconf
          emptyDir: {}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
...
clusterChecksRunner:
  volumes:
    - name: etcd-certs
      secret:
        secretName: kube-etcd-client-certs
    - name: disable-etcd-autoconf
      emptyDir: {}
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/etcd
      readOnly: true
    - name: disable-etcd-autoconf
      mountPath: /etc/datadog-agent/conf.d/etcd.d
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

그런 다음, Etcd 앞에서 실행 중인 서비스에 주석을 추가합니다.

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent가 검사를 엔드포인트 검사로 예약하고, 클러스터 검사 러너로 보냅니다.

{{% /collapse-content %}}


{{% collapse-content title="Etcd OpenShift 4.14 이후 버전" level="h4" %}}

Etcd 서비스와 통신하려면 인증서가 필요하며, 이러한 인증서는 `openshiftetcdoperator` 네임스페이스의 시크릿 `etcdmetricclient`에서 찾을 수 있습니다. Datadog Agent에 이러한 인증서에 대한 액세스 권한을 부여하려면 인증서를 Datadog Agent와 같은 네임스페이스에 복사합니다.

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

이러한 인증서는 아래와 같이 볼륨 및 볼륨 마운트를 추가하여 클러스터 검사 러너 포드에 마운팅해야 합니다.

**참고**: 마운트는 에이전트와 함께 패키징된 Etcd 검사 자동 구성 파일을 비활성화할 목적으로 포함된 것이기도 합니다.


{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    clusterChecksRunner:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /etc/etcd-certs
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
      volumes:
        - name: etcd-certs
          secret:
            secretName: etcd-metric-client
        - name: disable-etcd-autoconf
          emptyDir: {}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
...
clusterChecksRunner:
  volumes:
    - name: etcd-certs
      secret:
        secretName: etcd-metric-client
    - name: disable-etcd-autoconf
      emptyDir: {}
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/etcd
      readOnly: true
    - name: disable-etcd-autoconf
      mountPath: /etc/datadog-agent/conf.d/etcd.d

{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

그런 다음, Etcd 앞에서 실행 중인 서비스에 주석을 추가합니다.

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'
```

Datadog Cluster Agent가 검사를 엔드포인트 검사로 예약하고, 클러스터 검사 러너로 보냅니다.

{{% /collapse-content %}}


#### 컨트롤러 매니저

컨트롤러 매니저는`openshiftkubecontrollermanager` 네임스페이스의 서비스 `kubecontrollermanager` 뒤에서 실행됩니다. 서비스에 검사 구성을 주석으로 추가합니다.


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent가 검사를 엔드포인트 검사로 예약하고, 클러스터 검사 러너로 보냅니다.



#### 스케줄러

스케줄러는 `openshiftkubescheduler` 네임스페이스의 서비스 `scheduler` 뒤에서 실행됩니다. 서비스에 검사 구성을 주석으로 추가합니다.


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent가 검사를 엔드포인트 검사로 예약하고, 클러스터 검사 러너로 보냅니다.


## OpenShift 3에서의 Kubernetes {#OpenShift3}

OpenShift 3에서는 엔드포인트 검사를 사용하여 모든 컨트롤 플레인 구성 요소를 모니터링할 수 있습니다.

### 전제 조건

1. Datadog [Cluster Agent][6] 활성화
1. [클러스터 검사][7] 활성화
1. [엔드포인트 검사][8] 활성화
1. 서비스를 생성하고 편집하는 데 충분한 권한으로 로그인했는지 확인합니다.

### API 서버

API 서버는 `default` 네임스페이스의 서비스 `kubernetes` 뒤에서 실행됩니다. 이 서비스에 `kube_apiserver_metrics` 구성을 주석으로 추가합니다.

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

마지막 주석 `ad.datadoghq.com/endpoints.resolve`가 필요한 이유는 서비스가 정적 포드 앞에 있기 때문입니다. Datadog Cluster Agent가 검사를 엔드포인트 검사로 예약하고, 클러스터 검사 러너로 보냅니다. 검사를 실행 중인 노드는 다음으로 식별할 수 있습니다.

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Etcd 인증서와 통신하려면 인증서가 필요하며, 이러한 인증서는 호스트에 위치합니다. 이러한 인증서는 아래와 같이 볼륨 및 볼륨 마운트를 추가하여 클러스터 검사 러너 포드에 마운팅해야 합니다.

**참고**: 마운트는 에이전트와 함께 패키징된 Etcd 검사 자동 구성 파일을 비활성화할 목적으로 포함된 것이기도 합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    clusterChecksRunner:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/etc/etcd
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
      volumes:
        - name: etcd-certs
          hostPath:
            path: /etc/etcd
        - name: disable-etcd-autoconf
          emptyDir: {}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
...
clusterChecksRunner:
  volumes:
    - hostPath:
        path: /etc/etcd
      name: etcd-certs
    - name: disable-etcd-autoconf
      emptyDir: {}
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/etcd
      readOnly: true
    - name: disable-etcd-autoconf
      mountPath: /etc/datadog-agent/conf.d/etcd.d
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

이 서비스를 직접 편집한 내용은 지속되지 않으므로, Etcd 서비스의 복사본을 만듭니다.

```shell
oc get service etcd -n kube-system -o yaml | sed 's/name: etcd/name: etcd-copy/'  | oc create -f -

```

복사한 서비스에 검사 구성을 주석으로 추가합니다.

```shell
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/host/etc/etcd/ca/ca.crt", "tls_cert": "/host/etc/etcd/server.crt",
      "tls_private_key": "/host/etc/etcd/server.key"}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent가 검사를 엔드포인트 검사로 예약하고, 클러스터 검사 러너로 보냅니다.


### 컨트롤러 매니저 및 스케줄러

컨트롤러 매니저와 스케줄러는 `kubesystem` 네임스페이스의 같은 서비스 `kubecontrollers` 뒤에서 실행됩니다. 이 서비스를 직접 편집한 내용은 지속되지 않으므로, 서비스의 복사본을 만듭니다.

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

복사한 서비스에 검사 구성을 주석으로 추가합니다.

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent가 검사를 엔드포인트 검사로 예약하고, 클러스터 검사 러너로 보냅니다.

## Talos Linux에서의 Kubernetes {#TalosLinux}

Helm은 Talos Linux에 대한 권장 설치 방법입니다. Helm을 사용하려면 플래그 `providers.talos.enabled`를 `true`로 설정합니다.

### API 서버

API 서버 통합은 자동으로 구성됩니다. Datadog Agent가 해당 통합을 자동으로 검색합니다.

### Etcd

Datadog Agent 검사는 호스트에 있는 etcd 인증서에 대한 읽기 액세스 권한을 제공함으로써 etcd와 통신하고 etcd 메트릭 수집을 시작할 수 있습니다.

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  ignoreAutoConfig:
  - etcd
  confd:
    etcd.yaml: |-
      # You can configure the Agent to only run this check on the host where etcd is running
      # by using `ad_identifiers` for a pod that would only be running on a control-plane node.
      # This is to avoid errors when the Agent is running on worker nodes.
      # Another approach is to run a minimal pod on the control-plane node and use it for `ad_identifiers`.
      ad_identifiers:
        - kube-scheduler
      instances:
          # This is the node IP where metrics are exposed because kube-scheduler runs in host network mode.
          # Otherwise, the IP could be hardcoded to the master node IP (also in the environment variable `DD_KUBERNETES_KUBELET_HOST`).
        - prometheus_url: https://%%host%%:2379/metrics
          tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
agents:
  # Tolerations are needed to be scheduled on control-plane nodes running etcd
  tolerations:
  - key: node-role.kubernetes.io/control-plane
    operator: Exists
    effect: NoSchedule
  volumes:
    # On Talos, etcd certificates are stored in /system/secrets/etcd
    - hostPath:
        path: /system/secrets/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
providers:
  talos:
    enabled: true
{{< /code-block >}}

### 컨트롤러 매니저 및 스케줄러

#### 안전한 포트

안전한 포트를 사용하면 인증과 승인을 통해 컨트롤 플레인 구성 요소를 보호할 수 있습니다. Datadog Agent는 안전한 포트를 대상으로 하여 컨트롤러 매니저 및 스케줄러 메트릭을 수집할 수 있습니다.

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  ignoreAutoConfig:
    - etcd
    - kube_scheduler
    - kube_controller_manager
  confd:
    etcd.yaml: |-
      ad_identifiers:
        - kube-scheduler
      instances:
        - prometheus_url: https://%%host%%:2379/metrics
          tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
    kube_scheduler.yaml: |-
      ad_identifiers:
        - kube-scheduler
      instances:
        - prometheus_url: https://%%host%%:10259/metrics
          ssl_verify: false
          bearer_token_auth: true
    kube_controller_manager.yaml: |-
      ad_identifiers:
        - kube-controller-manager
      instances:
        - prometheus_url: https://%%host%%:10257/metrics
          ssl_verify: false
          bearer_token_auth: true
agents:
  tolerations:
  - key: node-role.kubernetes.io/control-plane
    operator: Exists
    effect: NoSchedule
  volumes:
    - hostPath:
        path: /system/secrets/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
providers:
  talos:
    enabled: true
{{< /code-block >}}

**참고:**

 자체 서명한 인증서를 사용하는 경우, `kube_controller_manager` 및 `kube_scheduler` 구성의 `ssl_verify` 필드를 `false`로 설정해야 합니다.
 안전한 포트를 대상으로 설정할 때 Datadog Agent가 컨트롤러 매니저와 스케줄러 구성의 `bindaddress` 옵션에 연결할 수 있어야 합니다. 클러스터 생성 시 컨트롤 플레인 노드에 아래의 패치를 적용합니다. 또는 Talos 노드를 실행 중인 경우 `talosctl patch mc n &lt;controlplanenode1,controlplanenode2> patch @controlplanedatadogmonitoringpatch.yaml`을 실행합니다.

{{< code-block lang="yaml" filename="controlplane-datadog-monitoring-patch.yaml" >}}
cluster:
  controllerManager:
    extraArgs:
      bind-address: 0.0.0.0
  scheduler:
    extraArgs:
      bind-address: 0.0.0.0
{{< /code-block >}}

## Rancher Kubernetes Engine(v2.5+)에서의 Kubernetes {#RKE}

Rancher v2.5는 [PushProx][9]를 사용해 컨트롤 플레인 메트릭 엔드포인트를 노출합니다. 이렇게 하면 Datadog Agent가 컨트롤 플레인 검사를 실행하고 메트릭을 수집할 수 있습니다.

### 전제 조건

1. [ranchermonitoring 차트][10]로 Datadog Agent를 설치합니다.
2. `pushprox` 데몬셋이 `ranchermonitoring`으로 배포되며, `cattlemonitoringsystem` 네임스페이스에서 실행됩니다.

### API 서버

`kube_apiserver_metrics` 검사를 구성하려면 `default/kubernetes` 서비스에 다음 주석을 추가합니다.

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Kubernetes 서비스를 추가하여 Autodiscovery 검사 구성

Datadog Agent는 헤드리스 Kubernetes 서비스를 추가해 검사 구성을 정의함으로써 `pushprox` 포드를 대상으로 설정하고 메트릭을 수집할 수 있습니다.

`ranchercontrolplaneservices.yaml`을 적용합니다.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: pushprox-kube-scheduler-datadog
  namespace: cattle-monitoring-system
  labels:
    component: kube-scheduler
    k8s-app: pushprox-kube-scheduler-client
  annotations:
    ad.datadoghq.com/endpoints.check_names: '["kube_scheduler"]'
    ad.datadoghq.com/endpoints.init_configs: '[{}]'
    ad.datadoghq.com/endpoints.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:10251/metrics"
        }
      ]
spec:
  clusterIP: None
  selector:
    k8s-app: pushprox-kube-scheduler-client
---
apiVersion: v1
kind: Service
metadata:
  name: pushprox-kube-controller-manager-datadog
  namespace: cattle-monitoring-system
  labels:
    component: kube-controller-manager
    k8s-app: pushprox-kube-controller-manager-client
  annotations:
    ad.datadoghq.com/endpoints.check_names: '["kube_controller_manager"]'
    ad.datadoghq.com/endpoints.init_configs: '[{}]'
    ad.datadoghq.com/endpoints.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:10252/metrics"
        }
      ]
spec:
  clusterIP: None
  selector:
    k8s-app: pushprox-kube-controller-manager-client
---
apiVersion: v1
kind: Service
metadata:
  name: pushprox-kube-etcd-datadog
  namespace: cattle-monitoring-system
  labels:
    component: kube-etcd
    k8s-app: pushprox-kube-etcd-client
  annotations:
    ad.datadoghq.com/endpoints.check_names: '["etcd"]'
    ad.datadoghq.com/endpoints.init_configs: '[{}]'
    ad.datadoghq.com/endpoints.instances: |
      [
        {
          "prometheus_url": "https://%%host%%:2379/metrics",
          "tls_ca_cert": "/host/opt/rke/etc/kubernetes/ssl/kube-ca.pem",
          "tls_cert": "/host/opt/rke/etc/kubernetes/ssl/kube-etcd-<node-ip>.pem",
          "tls_private_key": "/host/opt/rke/etc/kubernetes/ssl/kube-etcd-<node-ip>.pem"
        }
      ]
spec:
  clusterIP: None
  selector:
    k8s-app: pushprox-kube-etcd-client
```

다음 구성을 기반으로 매니페스트를 사용해 Datadog Agent를 배포합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/opt/rke/etc/kubernetes/ssl
      volumes:
        - name: etcd-certs
          hostPath:
            path: /opt/rke/etc/kubernetes/ssl
      tolerations:
        - key: node-role.kubernetes.io/controlplane
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/etcd
          operator: Exists
          effect: NoExecute
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
agents:
  volumes:
    - hostPath:
        path: /opt/rke/etc/kubernetes/ssl
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/opt/rke/etc/kubernetes/ssl
      readOnly: true
  tolerations:
    - effect: NoSchedule
      key: node-role.kubernetes.io/controlplane
      operator: Exists
    - effect: NoExecute
      key: node-role.kubernetes.io/etcd
      operator: Exists
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## Rancher Kubernetes Engine(v2.5 이전)에서의 Kubernetes {#RKEBefore2_5}

### API 서버, 컨트롤러 매니저 및 스케줄러

[ranchermonitoring 차트][10]로 Datadog Agent를 설치합니다.

컨트롤 플레인 구성 요소가 Kubernetes 외부의 Docker에서 실행됩니다. Kubernetes 내에서는 `default` 네임스페이스의 `kubernetes` 서비스가 컨트롤 플레인 노드 IP를 대상으로 설정합니다. 이것을 확인하려면 `$ kubectl describe endpoints kubernetes`를 실행합니다.

이 서비스에 엔드포인트 검사(Datadog Cluster Agent가 관리함)로 주석을 추가해 API 서버, 컨트롤러 매니저 및 스케줄러를 모니터링합니다.

```shell
kubectl edit service kubernetes
```


```yaml
metadata:
  annotations:
    ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics", "kube_controller_manager", "kube_scheduler"]'
    ad.datadoghq.com/endpoints.init_configs: '[{},{},{}]'
    ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" },
      {"prometheus_url": "http://%%host%%:10252/metrics"},
      {"prometheus_url": "http://%%host%%:10251/metrics"}]'
```

### Etcd

Etcd는 Kubernetes 외부의 Docker에서 실행되며, Etcd 서비스와 통신하려면 인증서가 필요합니다. Etcd 모니터링을 설정하기 위한 추천 단계에 Etcd를 실행 중인 컨트롤 플레인 노드에 대한 SSH 액세스 권한이 필요합니다.

1. [Rancher 설명서][9]에 따라 컨트롤 플레인 노드에 SSH로 액세스합니다. `$ docker ps`를 사용해 Etcd가 Docker 컨테이너에서 실행 중인지 확인한 다음, `$ docker inspect etcd`를 사용해 실행 명령(`"Cmd"`)에 사용된 인증서의 위치 및 마운트의 호스트 경로를 찾습니다.

명령에서 찾을 플래그 3개는 다음과 같습니다.

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. `$ docker inspect etcd` 출력에서 사용할 수 있는 마운트 정보를 사용해 Datadog Agent 구성에서 `volumes` 및 `volumeMounts`를 설정합니다. Datadog Agent가 컨트롤 플레인 노드에서 실행될 수 있도록 톨러레이션도 포함합니다.

다음은 Helm 및 Datadog Operator를 사용해 Datadog Agent를 구성하는 방법의 예시입니다.


{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/opt/rke/etc/kubernetes/ssl
      volumes:
        - name: etcd-certs
          hostPath:
            path: /opt/rke/etc/kubernetes/ssl
      tolerations:
        - key: node-role.kubernetes.io/controlplane
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/etcd
          operator: Exists
          effect: NoExecute
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
agents:
  volumes:
    - hostPath:
        path: /opt/rke/etc/kubernetes/ssl
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/opt/rke/etc/kubernetes/ssl
      readOnly: true
  tolerations:
    - effect: NoSchedule
      key: node-role.kubernetes.io/controlplane
      operator: Exists
    - effect: NoExecute
      key: node-role.kubernetes.io/etcd
      operator: Exists
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


3. 일시 중지 컨테이너로 DaemonSet를 설정해 Etcd를 실행 중인 노드에서 Etcd 검사를 실행합니다. 이 DaemonSet은 Etcd 서비스에 액세스할 수 있도록 호스트 네트워크에서 실행됩니다. 또한 여기에는 컨트롤 플레인 노드에서 실행하는 데 필요한 검사 구성 및 톨러레이션도 있습니다. 마운팅된 인증서 파일 경로가 인스턴스에 설정한 것과 일치해야 하며, 그에 따라 `&lt;...>` 부분을 교체합니다.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: etcd-pause
spec:
  selector:
    matchLabels:
      app: etcd-pause
  updateStrategy:
    type: RollingUpdate
  template:
    metadata:
      annotations:
        ad.datadoghq.com/pause.check_names: '["etcd"]'
        ad.datadoghq.com/pause.init_configs: '[{}]'
        ad.datadoghq.com/pause.instances: |
          [{
            "prometheus_url": "https://%%host%%:2379/metrics",
            "tls_ca_cert": "/host/etc/kubernetes/ssl/kube-ca.pem",
            "tls_cert": "/host/etc/kubernetes/ssl/kube-etcd-<...>.pem",
            "tls_private_key": "/host/etc/kubernetes/ssl/kube-etcd-<...>-key.pem"
          }]
      labels:
        app: etcd-pause
      name: etcd-pause
    spec:
      hostNetwork: true
      containers:
      - name: pause
        image: k8s.gcr.io/pause:3.0
      tolerations:
      - effect: NoExecute
        key: node-role.kubernetes.io/etcd
        operator: Exists
      - effect: NoSchedule
        key: node-role.kubernetes.io/controlplane
        operator: Exists
```

DaemonSet과 검사 구성을 배포하려면 다음을 실행합니다.

```shell
kubectl apply -f <filename>
```


## 관리형 서비스(AKS, GKE)에서의 Kubernetes {#ManagedServices}

Azure Kubernetes Service(AKS) 및 Google Kubernetes Engine(GKE) 등 다른 관리형 서비스에서는 사용자가 컨트롤 플레인 구성 요소에 액세스할 수 없습니다. 따라서 이러한 환경에서는 `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` 또는 `etcd` 검사를 실행할 수 없습니다.


[1]: https://docs.datadoghq.com/ko/integrations/kube_apiserver_metrics/
[2]: https://docs.datadoghq.com/ko/integrations/etcd/?tab=containerized
[3]: https://docs.datadoghq.com/ko/integrations/kube_controller_manager/
[4]: https://docs.datadoghq.com/ko/integrations/kube_scheduler/
[5]: https://aws.github.io/awseksbestpractices/reliability/docs/controlplane/#monitorcontrolplanemetrics
[6]: https://docs.datadoghq.com/ko/agent/cluster_agent/setup
[7]: https://docs.datadoghq.com/ko/agent/cluster_agent/clusterchecks/
[8]: https://docs.datadoghq.com/ko/agent/cluster_agent/endpointschecks/
[9]: https://ranchermanager.docs.rancher.com/howtoguides/newuserguides/manageclusters/nodesandnodepools
[10]: https://github.com/DataDog/helmcharts/blob/main/examples/datadog/agent_on_rancher_values.yaml
[11]: https://docs.aws.amazon.com/eks/latest/userguide/viewrawmetrics.html