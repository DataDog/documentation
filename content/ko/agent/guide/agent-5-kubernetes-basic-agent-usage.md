---
aliases:
- /ko/agent/faq/agent-5-kubernetes-basic-agent-usage
private: true
title: Agent v5의 쿠버네티스(Kubernetes) Agent 기본 사용법
---

{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Kubernetes Dashboard" >}}

<div class="alert alert-warning">
Datadog Agent v5는 최대 쿠버네티스 버전 1.8까지 지원합니다. 최신 버전의 쿠버네티스는 Datadog Agent v6를 사용해야 합니다.
</div>

## 개요

쿠버네티스에서 실시간 메트릭을 받아 다음과 같이 활용할 수 있습니다.

* 쿠버네티스 상태 시각화 및 모니터링
* Kubernetes 실패 복구 및 이벤트 알림 확인


쿠버네티스의 경우, [Agent를 DaemonSet][1]로 실행하시길 권장합니다. [도커(Docker) 이미지][2]는 활성화된 도커와 쿠버네티스 통합 모두에서 사용할 수 있습니다.

또한, [호스트에서 Datadog Agent를 실행][3]하고 설정하여 쿠버네티스 메트릭을 수집할 수 있습니다.

## Kubernetes 설정

### 설치

#### 컨테이너 설치

쿠버네티스 덕분에 Datadog Agent를 모든 노드에 자동 배포하는 DaemonSets의 장점을 활용할 수 있습니다(또는 nodeSelectors를 사용해 특정 노드에만 배포할 수도 있습니다).

*쿠버네티스 클러스터에서 DaemonSets 옵션을 지원하지 않는다면 각 쿠버네티스 노드의 배포 콘텐츠로서 [Datadog Agent를 설치][4]하세요.*

쿠버네티스에서 RBAC를 사용한다면 [Datadog-쿠버네티스 통합][5]에서 RBAC 권한을 설정하는 방법을 알아보세요.

* 다음의 `dd-agent.yaml` 매니페스트(Manifest)를 생성합니다.

```yaml

apiVersion: extensions/v1beta1
metadata:
  name: dd-agent
spec:
  template:
    metadata:
      labels:
        app: dd-agent
      name: dd-agent
    spec:
      containers:
      - image: gcr.io/datadoghq/docker-dd-agent:latest
        imagePullPolicy: Always
        name: dd-agent
        ports:
          - containerPort: 8125
            name: dogstatsdport
            protocol: UDP
        env:
          - name: API_KEY
            value: "DATADOG_API_KEY"
          - name: KUBERNETES
            value: "yes"
        volumeMounts:
          - name: dockersocket
            mountPath: /var/run/docker.sock
          - name: procdir
            mountPath: /host/proc
            readOnly: true
          - name: cgroups
            mountPath: /host/sys/fs/cgroup
            readOnly: true
      volumes:
        - hostPath:
            path: /var/run/docker.sock
          name: dockersocket
        - hostPath:
            path: /proc
          name: procdir
        - hostPath:
            path: /sys/fs/cgroup
          name: cgroups
```

`DATADOG_API_KEY`를 [API 키][6]로 대체하거나 [쿠버네티스 시크릿][7]을 사용해 API 키를 [환경 변수][8]로 설정합니다.

* 명령어로 DaemonSet을 배포합니다.
  ```shell
  kubectl create -f dd-agent.yaml
  ```

**참조**: 매니페스트는 자동탐지, 자동 설정 기능을 활성화합니다. 이를 비활성화하려면 `SD_BACKEND` 환경 변수 정의를 제거하세요. 자동탐지를 설정하는 방법은 [자동탐지 가이드][9]를 참조하시기 바랍니다.

#### 호스트 설치

`dd-check-kubernetes` 패키지를 수동 설치하거나 즐겨 사용하는 설정 관리자로 설치하세요.

### 설정

`kubernetes.yaml` 파일을 편집해 서버나 포트를 지정하고, 모니터링할 마스터를 설정하세요.

```yaml

instances:
    host: localhost
    port: 4194
    method: http
```

사용할 수 있는 모든 설정 옵션의 목록은 [샘플 kubernetes.yaml][10]에서 확인할 수 있습니다

### 검증

#### 컨테이너 실행

환경에서 DaemonSet으로 실행 중인 Datadog Agent를 확인하려면 다음을 실행하세요.

```shell
kubectl get daemonset
```

Agent가 배포되었다면 아래 텍스트와 비슷한 출력값이 표시됩니다. 여기서 **desired** 및 **current**는 클러스터에서 실행 중인 노드 개수와 동일합니다.

```text
NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
dd-agent   3         3         <none>          11h
```

#### Agent 점검 실행

[Agent의 `info` 하위 명령어를 실행][11]하고 점검(Checks) 섹션의 `kubernetes`를 찾습니다.

```text
Checks
======
    kubernetes
    -----------
      - instance #0 [OK]
      - Collected 39 metrics, 0 events & 7 service checks
```

## 쿠버네티스 상태 설정

### 설치

#### 컨테이너 설치

버전 1.2.0 이상의 쿠버네티스를 실행 중이라면 [kube-state-metrics][12] 프로젝트를 사용해 추가 메트릭을 Datadog로 보낼 수 있습니다(아래 메트릭 목록에서 `kubernetes_state` 접두어로 알아볼 수 있습니다).

kube-state-metrics를 실행하려면 kube-state-metrics 서비스를 배포하는 다음의 매니페스트를 사용해 `kube-state-metrics.yaml` 파일을 생성하세요.

```yaml
apiVersion: extensions/v1beta1
metadata:
  name: kube-state-metrics
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: kube-state-metrics
    spec:
      containers:
      - name: kube-state-metrics
        image: gcr.io/google_containers/kube-state-metrics:v1.2.0
        ports:
        - name: metrics
          containerPort: 8080
        resources:
          requests:
            memory: 30Mi
            cpu: 100m
          limits:
            memory: 50Mi
            cpu: 200m
---
apiVersion: v1
metadata:
  annotations:
    prometheus.io/scrape: 'true'
  labels:
    app: kube-state-metrics
  name: kube-state-metrics
spec:
  ports:
  - name: metrics
    port: 8080
    targetPort: metrics
    protocol: TCP
  selector:
    app: kube-state-metrics
```

이제 다음을 실행해 배포하세요.

```shell
kubectl create -f kube-state-metrics.yaml
```

위의 매니페스트는 Google에서 공개한 `kube-state-metrics` 컨테이너를 사용합니다. 이는 [Quay][13]에서도 사용할 수 있습니다. 직접 구축하고자 하시는 분은 [공식 프로젝트 설명서][12]를 참조하세요.

쿠버네티스 상태 메트릭(Kubernetes State Metrics) 서비스를 다른 URL이나 포트에서 실행하기로 설정한 경우, `conf.d/kubernetes_state.yaml`의 `kube_state_url` 파라미터를 설정한 다음 Agent를 재부팅하여 Datadog Agent를 구성할 수 있습니다.
더 자세한 정보가 필요하신 분은 [kubernetes_state.yaml.example 파일][14]을 참조하세요. [자동탐지][9]를 사용하신다면 kube state URL이 자동으로 설정되어 관리됩니다.

#### 호스트 설치

`dd-check-kubernetes_state` 패키지를 수동으로, 또는 즐겨 사용하는 설정 관리자로 설치하세요(CentOS/AWS에서는 [rpm 패키지][15]를 다운로드하고 [설치 가이드][16]를 참조하세요).
다음으로 `kubernetes_state.yaml` 파일을 수정해 서버와 포트를 지정하고, 모니터링할 마스터를 설정합니다. 사용할 수 있는 모든 설정 옵션의 목록은 [샘플 kubernetes_state.yaml][14]에서 확인할 수 있습니다.

### 검증

#### 컨테이너 검증

환경에서 DaemonSet으로 실행 중인 Datadog Agent를 확인하려면 다음을 실행하세요.

```shell
kubectl get daemonset
```

Agent가 배포되면 아래 텍스트와 유사한 출력이 표시됩니다. 여기서 **desired** 및 **current**는  클러스터에서 실행 중인 노드 수와 같습니다.

```bash
NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
dd-agent   3         3         <none>          11h
```

#### Agent 점검 검증

[Agent의 info 하위 명령어를 실행][11]하고 점검(Checks) 섹션의 `kubernetes_state`를 찾습니다.

```bash
Checks
======
    kubernetes_state
    -----------
      - instance #0 [OK]
      - Collected 39 metrics, 0 events & 7 service checks
```

## 쿠버네티스 DNS 설정

### 설치

`dd-check-kube_dns` 패키지를 수동 설치하거나 즐겨 사용하는 설정 관리자로 설치하세요.

### 설정

다음으로 `kube_dns.yaml`  파일을 수정해 서버와 포트를 지정하고, 모니터링할 마스터를 설정합니다. 사용할 수 있는 모든 설정 옵션의 목록은 [샘플 kube_dns.yaml][17] 에서 확인할 수 있습니다.

#### 서비스 탐지 사용

쿠버네티스 워커 노드마다 하나의 `dd-agent` 팟을 사용하는 경우, kube-dns 팟에서 다음의 어노테이션을 사용해 데이터를 자동으로 수집할 수 있습니다.

```yaml

apiVersion: v1
metadata:
  annotations:
    service-discovery.datadoghq.com/kubedns.check_names: '["kube_dns"]'
    service-discovery.datadoghq.com/kubedns.init_configs: '[{}]'
    service-discovery.datadoghq.com/kubedns.instances: '[[{"prometheus_endpoint":"http://%%host%%:10055/metrics", "tags":["dns-pod:%%host%%"]}]]'
```

**참조**:

* "dns-pod" 태그가 타겟 DNS 팟 IP를 추적한다는 점에 유의하시기 바랍니다. 다른 태그는 서비스 탐지를 사용해 정보를 폴링(polling)하는 `dd-agent`와 연관됩니다.
* 서비스 탐지 어노테이션은 팟에 적용해야 합니다. 배포 시에는 어노테이션을 템플릿 스펙의 메타데이터에 추가하세요.

### 검증

[Agent의 info 하위 명령어를 실행][11]하고 점검(Checks) 섹션의 `kube_dns`를 찾습니다.

```bash
Checks
======
    kube_dns
    -----------
      - instance #0 [OK]
      - Collected 39 metrics, 0 events & 7 service checks
```

[1]: https://github.com/DataDog/docker-dd-agent
[2]: https://gcr.io/datadoghq/docker-dd-agent
[3]: /ko/#host-setup
[4]: /ko/integrations/docker_daemon/
[5]: /ko/agent/kubernetes/
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://kubernetes.io/docs/concepts/configuration/secret
[8]: https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables
[9]: /ko/getting_started/agent/autodiscovery/
[10]: https://github.com/DataDog/integrations-core/blob/master/kubernetes/datadog_checks/kubernetes/data/conf.yaml.example
[11]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[12]: https://github.com/kubernetes/kube-state-metrics
[13]: https://quay.io/coreos/kube-state-metrics
[14]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[15]: https://yum.datadoghq.com/stable/6/x86_64
[16]: /ko/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
[17]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/conf.yaml.example