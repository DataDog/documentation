---
aliases:
- /ko/agent/kubernetes/control_plane
further_reading:
- link: agent/kubernetes/log
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/kubernetes/apm
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/kubernetes/prometheus
  tag: 설명서
  text: 프로메테우스 메트릭 수집
- link: /agent/kubernetes/integrations
  tag: 설명서
  text: 애플리케이션 메트릭 및 로그 자동 수집
- link: /agent/guide/autodiscovery-management
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/kubernetes/tag
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
title: 쿠버네티스 컨트롤 플레인 모니터링
---

## 개요

이 섹션은 특정 사항을 문서화하고 쿠버네티스 컨트롤 플레인을 모니터링하기 위한 적절한 기본 설정 제공을 목표로 합니다. 이 기본 설정을 사용자에 맞게 변경하여 모든 Datadog 기능에 추가할 수 있습니다.

[API 서버][1], [Etcd][2], [컨트롤러 매니저][3] 및 [스케줄러][4]에 대한 Datadog 통합을 통해 쿠버네티스 컨트롤 플레인의 네 가지 구성 요소에서 주요 메트릭을 수집할 수 있습니다.

* [Kubeadm을 이용한 쿠버네티스](#Kubeadm)
* [Amazon EKS에서의 쿠버네티스](#EKS)
* [OpenShift 4에서의 쿠버네티스](#OpenShift4)
* [OpenShift 3에서의 쿠버네티스](#OpenShift3)
* [랜처 쿠버네티스 엔진 (v2.5+)에서의 쿠버네티스](#RKE)
* [랜처 쿠버네티스 엔진 (\<v2.5)에서의 쿠버네티스](#RKEBefore2_5)
* [매니지드 서비스 (AKS, GKE)에서의 쿠버네티스](#ManagedServices)

## [Kubeadm을 이용한 쿠버네티스](#Kubeadm)

다음 설정은 쿠버네티스 `v1.18+`에서 테스트되었습니다.

### API 서버

API 서버 통합은 자동으로 설정되며 Datadog 에이전트가 이를 자동으로 검색합니다.

### Etcd

호스트에 있는 Etcd 인증서에 대한 읽기 권한을 제공함으로써, Datadog 에이전트 검사는 Etcd와 통신하고 Etcd 메트릭 수집을 시작할 수 있습니다.

{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `values.yaml`:

```yaml
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
```

{{% /tab %}}
{{< /tabs >}}

### 컨트롤러 매니저와 스케줄러

#### 안전하지 않은 포트

컨트롤러 매니저 및 스케줄러 인스턴스의 안전하지 않은 포트가 활성화된 경우, Datadog 에이전트는 추가 설정 없이 통합을 검색하고 메트릭 수집을 시작합니다.

#### 안전한 포트

안전한 포트를 사용하면 인증 및 권한 부여를 통해 컨트롤 플레인 구성 요소를 보호할 수 있습니다. Datadog 에이전트는 안전한 포트를 대상으로 컨트롤러 매니저 및 스케줄러 메트릭을 수집할 수 있습니다.

{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `values.yaml`:

```yaml
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
```

{{% /tab %}}
{{< /tabs >}}

**참조**:

- `kube_controller_manager` 및 `kube_scheduler` 설정에 있는 `ssl_verify`필드는 자체 서명 인증서를 사용할 때 `false`로 설정해야 합니다.
- 안전한 포트를 목표로 하는 경우, 컨트롤러 매니저 및 스케줄러 설정에 있는 `bind-address` 옵션에 Datadog 에이전트가 도달할 수 있어야 합니다. 예:

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

## Amazon EKS에서의 쿠버네티스 {#EKS}

Amazon Elastic Kubernetes Service (EKS)에서는 [API 서버 메트릭이 노출됩니다][5]. 이를 통해 Datadog 에이전트는 [Kubernetes API 서버 메트릭 검사 설명서][1]에 나와있는 대로 엔드포인트 검사를 사용하여 API 서버 메트릭을 얻을 수 있습니다. 검사를 설정하려면 `default/kubernetes`서비스에 다음 어노테이션을 추가하세요:

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

다른 컨트롤 플레인 구성 요소는 EKS에 노출되지 않으며 모니터링할 수 없습니다.


##  OpenShift 4에서의 쿠버네티스 {#OpenShift4}

OpenShift 4에서는 엔드포인트 검사를 사용하여 모든 컨트롤 플레인 구성 요소를 모니터링할 수 있습니다.

### 전제 조건

1. Datadog [클러스터 에이전트][6] 활성화
1. [클러스터 검사][7] 활성화
1. [엔드포인트 검사][8] 활성화
1. 서비스를 수정하고 비밀번호를 만들 수 있는 권한으로 로그인했는지 확인합니다.

### API 서버

API 서버는 `default` 네임스페이스의 `kubernetes` 서비스 뒤에서 실행됩니다. `kube_apiserver_metrics` 설정을 사용하여 서비스에 어노테이션을 추가하세요:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

서비스가 고정된 포드 앞에 있으므로 마지막 어노테이션인 `ad.datadoghq.com/endpoints.resolve`가 필요합니다. Datadog 클러스터 에이전트는 검사를 엔드포인트 검사로 예약하고 클러스터 검사 러너로 전송합니다. 실행 중인 노드는 다음과 같이 식별할 수 있습니다:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Etcd 서비스와 통신하는데 필요한 인증서는 `openshift-monitoring` 네임스페이스의 `kube-etcd-client-certs` 암호에서 찾을 수 있습니다. 인증서에 Datadog 에이전트 액세스 권한을 부여하려면 먼저 Datadog 에이전트가 실행 중인 동일한 네임스페이스에 인증서를 복사합니다:

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

아래와 같이 볼륨 및 볼륨 마운트를 추가하여 인증서를 클러스터 검사 러너 포드에 마운트해야 합니다.

**참고**: 에이전트와 함께 패키지된 Etcd 검사 자동 설정 파일을 비활성화하기 위한 마운트도 포함되어 있습니다.


{{< tabs >}}
{{% tab "Helm" %}}

```yaml
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
```

{{% /tab %}}
{{% tab "Operator" %}}

```yaml
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
```

{{% /tab %}}
{{< /tabs >}}


그런 다음 Etcd 앞에서 실행 중인 서비스에 어노테이션을 추가합니다:

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog 클러스터 에이전트는 검사를 엔드포인트 검사로 예약하고 클러스터 검사 러너로 전송합니다.


### 컨트롤러 매니저

컨트롤러 매니저는 `openshift-kube-controller-manager` 네임스페이스의 `kube-controller-manager` 서비스 뒤에서 실행됩니다. 다음 설정을 사용하여 서비스에 어노테이션을 추가하세요:


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog 클러스터 에이전트는 검사를 엔드포인트 검사로 예약하고 클러스터 검사 러너로 전송합니다.



### 스케줄러

스케줄러는 `openshift-kube-scheduler` 네임스페이스의 `scheduler` 서비스 뒤에서 실행됩니다. 다음 설정을 사용하여 서비스에 어노테이션을 추가하세요:


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog 클러스터 에이전트는 검사를 엔드포인트 검사로 예약하고 클러스터 검사 러너로 전송합니다.


## OpenShift 3에서의 쿠버네티스 {#OpenShift3}

OpenShift 3에서는 엔드포인트 검사를 사용하여 모든 컨트롤 플레인 구성 요소를 모니터링할 수 있습니다.

### 전제 조건

1. Datadog [클러스터 에이전트][6] 활성화
1. [클러스터 검사][7] 활성화
1. [엔드포인트 검사][8] 활성화
1. 서비스를 생성하고 편집할 수 있는 권한으로 로그인했는지 확인합니다.

### API 서버

API 서버는 `default` 네임스페이스의 `kubernetes` 서비스 뒤에서 실행됩니다. `kube_apiserver_metrics` 설정으로 서비스에 어노테이션을 추가합니다:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

서비스가 고정된 포드 앞에 있으므로 마지막 어노테이션인 `ad.datadoghq.com/endpoints.resolve`가 필요합니다. Datadog 클러스터 에이전트는 검사를 엔드포인트 검사로 예약하고 클러스터 검사 러너로 전송합니다. 실행 중인 노드는 다음과 같이 식별할 수 있습니다:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

인증서는 호스트에 있는 Etcd 서비스와 통신하는 데 필요합니다. 아래와 같이 볼륨 및 볼륨 마운트를 추가하여 인증서를 클러스터 검사 러너 포드에 마운트해야 합니다.

**참고**: 에이전트와 함께 패키지된 Etcd 검사 자동 설정 파일을 비활성화하기 위한 마운트도 포함되어 있습니다.

{{< tabs >}}
{{% tab "Helm" %}}

```yaml
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
```

{{% /tab %}}
{{% tab "Operator" %}}

```yaml
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
```

{{% /tab %}}
{{< /tabs >}}

이 서비스에서 직접 편집한 내용은 유지되지 않으므로 Etcd 서비스의 복사본을 만듭니다:

```shell
oc get service etcd -n kube-system -o yaml | sed 's/name: etcd/name: etcd-copy/'  | oc create -f -

```

다음을 설정하여 복사된 서비스에 어노테이션을 추가할 수 있습니다:

```shell
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/host/etc/etcd/ca/ca.crt", "tls_cert": "/host/etc/etcd/server.crt",
      "tls_private_key": "/host/etc/etcd/server.key"}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog 클러스터 에이전트는 검사를 엔드포인트 검사로 예약하고 클러스터 검사 러너로 전송합니다.


### 컨트롤러 매니저와 스케줄러

컨트롤러 매니저와 스케줄러는 `kube-system` 네임스페이스의 동일한 `kube-controllers`서비스 뒤에서 실행됩니다. 서비스에서 직접 편집한 내용은 유지되지 않으므로 서비스의 복사본을 만듭니다:

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

다음을 설정하여 복사된 서비스에 어노테이션을 추가합니다:

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog 클러스터 에이전트는 검사를 엔드포인트 검사로 예약하고 클러스터 검사 러너로 전송합니다.



## 랜처 쿠버네티스 엔진 (v2.5+)에서의 쿠버네티스 {#RKE}

랜처 v2.5에서는 [PushProx][9]를 사용하여 컨트롤 플레인 메트릭 엔드포인트를 표시합니다. 이를 통해 Datadog 에이전트가 컨트롤 플레인 검사를 실행하고 메트릭을 수집할 수 있습니다.

### 전제 조건

1. [랜처-모니터링 차트][10]를 사용하여 Datadog 에이전트를 설치합니다.
2. `pushprox` 데몬셋은 `rancher-monitoring`과 함께 배포되고 `cattle-monitoring-system` 네임스페이스에서 실행됩니다.

### API 서버

`kube_apiserver_metrics` 검사를 설정하려면 `default/kubernetes` 서비스에 다음 어노테이션을 추가합니다:

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Kubernetes 서비스를 추가하여 자동 탐지 검사 설정

헤드리스 쿠버네티스 서비스를 추가하여 검사 설정을 정의함으로써 Datadog 에이전트는 `pushprox` 포드를 목표로 삼고 메트릭을 수집할 수 있습니다.

`rancher-control-plane-services.yaml`을 적용합니다:

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

다음 설정을 기반으로 매니페스트를 사용하여 Datadog 에이전트를 배포합니다:

{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `values.yaml`:

```yaml
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
```

{{% /tab %}}
{{< /tabs >}}


## 랜처 쿠버네티스 엔진 (\<v2.5)에서의 쿠버네티스 {#RKEBefore2_5}

### API 서버, 컨트롤러 매니저 및 스케줄러

[랜처-모니터링 차트][10]를 사용하여 Datadog 에이전트를 설치합니다.

컨트롤 플레인 구성 요소는 쿠버네티스 외부의 도커에서 실행됩니다. 쿠버네티스 내에서 `default` 네임스페이스의 `kubernetes` 서비스는 컨트롤 플레인 노드 IP를 대상으로 합니다. 이는 `$ kubectl describe endpoints kubernetes`를 실행하여 확인할 수 있습니다.

Datadog 클러스터 에이전트에서 관리되는 엔드포인트 검사를 사용하여 서비스에 어노테이션을 추가하고 API 서버, 컨트롤러 매니저 및 스케줄러를 모니터링할 수 있습니다:

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

Etcd는 쿠버네티스 외부 도커에서 실행되며, Etcd 서비스와 통신하려면 인증서가 필요합니다. Etcd 모니터링을 설정하려면 Etcd를 실행하는 컨트롤 플레인 노드에 대한 SSH 액세스가 필요합니다.

1. [랜처 설명서][9]에 따라 컨트롤 플레인 노드에 SSH를 삽입합니다. `$ docker ps`를 통해 Etcd가 도커 컨테이너에서 실행 중인지 확인한 다음 `$ docker inspect etcd`를 사용하여 실행 명령(`"Cmd"`)에 사용된 인증서의 위치와 마운트의 호스트 경로를 찾습니다

검색할 명령의 세 가지 플래그는 다음과 같습니다:

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. `$ docker inspect etcd` 출력에 있는 마운트 정보를 사용하여 Datadog Agent 설정에서 `volumes`및 `volumeMounts`를 설정합니다. 또한 Datadog 에이전트가 컨트롤 플레인 노드에서 실행될 수 있도록 허용 오차도 포함합니다.

다음은 Helm 및 Datadog Operator를 사용하여 Datadog 에이전트를 설정하는 방법의 예입니다:


{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `values.yaml`:

```yaml
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
```

{{% /tab %}}
{{< /tabs >}}


3. 일시 중지 컨테이너가 있는 데몬셋을 설정하여 Etcd를 실행하는 노드에서 Etcd 검사를 실행합니다. 이 데몬셋은 호스트 네트워크에서 실행되어 Etcd 서비스에 액세스할 수 있습니다. 또한 컨트롤 플레인 노드에서 실행하는 데 필요한 검사 설정 및 허용 오차를 가지고 있습니다. 마운트된 인증서 파일 경로가 인스턴스에서 설정한 것과 일치하는지 확인하고 그에 따라 `<...>` 부분을 변경합니다.

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

데몬셋 및 검사 설정을 배포하려면 다음을 실행합니다.

```shell
kubectl apply -f <filename>
```


## 매니지드 서비스 (AKS, GKE)에서의 쿠버네티스 {#ManagedServices}

Azure Kubernetes Service(AKS) 및 Google Kubernetes Engine(GKE)과 같은 다른 매니지드 서비스에서는 사용자가 컨트롤 플레인 구성 요소에 액세스할 수 없습니다. 따라서 이러한 환경에서는 `kube_apiserver`, `kube_controller_manager`, `kube_scheduler`, 또는 `etcd` 검사를 실행할 수 없습니다.


[1]: https://docs.datadoghq.com/ko/integrations/kube_apiserver_metrics/
[2]: https://docs.datadoghq.com/ko/integrations/etcd/?tab=containerized
[3]: https://docs.datadoghq.com/ko/integrations/kube_controller_manager/
[4]: https://docs.datadoghq.com/ko/integrations/kube_scheduler/
[5]: https://aws.github.io/aws-eks-best-practices/reliability/docs/controlplane/#monitor-control-plane-metrics
[6]: https://docs.datadoghq.com/ko/agent/cluster_agent/setup
[7]: https://docs.datadoghq.com/ko/agent/cluster_agent/clusterchecks/
[8]: https://docs.datadoghq.com/ko/agent/cluster_agent/endpointschecks/
[9]: https://rancher.com/docs/rancher/v2.0-v2.4/en/cluster-admin/nodes
[10]: https://github.com/DataDog/helm-charts/blob/main/examples/datadog/agent_on_rancher_values.yaml
