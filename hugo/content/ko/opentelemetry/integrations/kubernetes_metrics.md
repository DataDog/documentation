---
description: OpenTelemetry를 사용하여 Kubernetes 리소스 데이터와 인프라 메트릭을 Datadog에 전송하세요.
further_reading:
- link: /opentelemetry/setup/
  tag: 문서
  text: OpenTelemetry 데이터를 Datadog으로 전송하기
- link: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/
  tag: 문서
  text: Unified Service Tagging
- link: https://github.com/DataDog/opentelemetry-examples/tree/main/guides/kubernetes
  tag: GitHub
  text: Collector 구성 예시
title: Kubernetes 메트릭
---
## 개요 {#overview}

OpenTelemetry를 사용하여 Datadog Agent를 설치하지 않고 Kubernetes 데이터를 Datadog에 전송하세요. 필요한 데이터에 맞는 설정을 선택하세요.

| 목표 | 구성 요소 | 설정 |
|---|---|---|
| Kubernetes Explorer에서 파드, 배포 및 기타 리소스 데이터 보기 |  `k8sobjects` 수신기가 있는 클러스터 Collector 1개 | [OTLP를 통해 Kubernetes 리소스 전송][15] |
| Datadog의 기본 제공 Kubernetes 대시보드에 데이터 표시 | `kube-state-metrics`클러스터 Collector 1개 및 노드당 노드 Collector 1개 | 이 가이드 따르기 |

아래의 전체 설정은 [Kubernetes - Overview][1] 대시보드를 위한 Kubernetes 인프라 메트릭과 [Kubernetes Explorer][10]를 위한 리소스 데이터를 수집합니다. 이 설정은 애플리케이션을 계측하지 않습니다.

{{< img src="/opentelemetry/collector_exporter/kubernetes_metrics.png" alt="'Kubernetes - Overview' 대시보드에는 클러스터와 컨테이너의 상태 및 리소스 사용량을 비롯한 컨테이너 메트릭이 표시됩니다." style="width:100%;" >}}

이 설정은 세 가지 구성 요소를 사용합니다.

- **[`kube-state-metrics`][8]**는 배포, 노드, 파드와 같은 Kubernetes 객체에 대한 메트릭을 생성합니다.
- **클러스터 Collector**는 단일 복제본 Deployment로 실행되며, Explorer를 위한 클러스터 전체 메트릭과 리소스 데이터를 수집합니다.
- **노드 Collector**는 DaemonSet으로 실행되며, CPU 및 메모리 사용량과 같은 각 노드의 메트릭을 수집합니다.

클러스터 Collector는 Prometheus 수신기를 사용하여 `kube-state-metrics`를 스크레이프합니다. Prometheus 서버를 설치할 필요는 없습니다. 이 메트릭은 Kubernetes Explorer에서 연결된 대시보드에 데이터를 제공합니다. `k8sobjects` 수신기는 Explorer의 리소스 데이터를 제공합니다.

## 설정 {#setup}

이 단계들은 `default` 네임스페이스에 새로운 Collector를 배포합니다. 이미 Kubernetes 메트릭을 수집 중인 경우, 추가 Collector를 배포하기 전에 기존 구성을 검토하여 중복 수집을 방지하세요.

### 전제 조건 {#prerequisites}

- [Helm][2] 및 `kubectl`(클러스터에서 워크로드를 배포하고 RBAC 리소스를 생성할 수 있는 권한 필요).
- [Datadog API 키][6] 및 [Datadog 사이트][5].

OpenTelemetry Collector [Helm 차트][9] v0.156.2 이상 및 OpenTelemetry Collector Contrib v0.159.0 이상을 사용하세요. 아래 명령은 Collector 이미지를 v0.159.0으로 고정합니다.

Explorer에 사용되는 `k8sobjects` 수신기는 Kubernetes API 서버 부하를 증가시킬 수 있습니다. Datadog은 Kubernetes 1.33 이상을 권장하며, 수집을 확장하기 전에 더 작은 클러스터에서 테스트할 것을 권장합니다. [Kubernetes Explorer 제한 사항][12]을 참조하세요.

{{< site-region region="gov,gov2" >}}<div class="alert alert-warning">OpenTelemetry를 사용하는 Kubernetes Explorer는 {{< region-param key="dd_site_name" >}}리전에서 사용할 수 없습니다.</div>{{< /site-region >}}

### 설치 {#installation}

#### 1. kube-state-metrics 설치 {#1-install-kube-state-metrics}

`prometheus-community` Helm 리포지토리를 추가하고 `kube-state-metrics`를 설치합니다.

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-state-metrics prometheus-community/kube-state-metrics \
  --namespace default
```

참조 구성은 `kube-state-metrics.default.svc:8080`을 스크레이프합니다. 다른 서비스 이름이나 네임스페이스를 사용하는 경우, `cluster-collector.yaml`에서 Prometheus 수신기 대상을 업데이트하세요.

#### 2. Datadog 시크릿 생성 {#2-create-a-datadog-secret}

API 키와 사이트를 설정한 후 Collector의 네임스페이스에 시크릿을 생성하세요.

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
export DD_SITE="{{< region-param key="dd_site" >}}"

kubectl create secret generic datadog-secret \
  --namespace default \
  --from-literal="api-key=$DD_API_KEY" \
  --from-literal="dd-site=$DD_SITE"
```

#### 3. Collector 구성 및 설치 {#3-configure-and-install-the-collectors}

1. OpenTelemetry Helm 차트 리포지토리를 추가합니다.

   ```sh
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   helm repo update
   ```

2. [cluster-collector.yaml][3] 및 [daemonset-collector.yaml][4]을 동일한 디렉터리에 다운로드합니다. 이러한 Helm values 파일은 `opentelemetry-examples` 리포지토리에서 유지 관리됩니다.

   ```sh
   CONFIG_URL="https://raw.githubusercontent.com/DataDog/opentelemetry-examples/main/guides/kubernetes/configuration"
   curl -fsSLo cluster-collector.yaml "$CONFIG_URL/cluster-collector.yaml"
   curl -fsSLo daemonset-collector.yaml "$CONFIG_URL/daemonset-collector.yaml"
   ```

3. 두 파일 모두에서 `config.exporters` 아래의 `datadog/exporter` 블록을 권장 OTLP HTTP 익스포터로 바꿉니다.

   ```yaml
   exporters:
     otlp_http:
       endpoint: https://otlp.${env:DD_SITE}
       logs_endpoint: https://otlp.${env:DD_SITE}/v1/logs
       headers:
         dd-api-key: ${env:DD_API_KEY}
         dd-otel-metric-config: >-
           {
           "resource_attributes_as_tags": true,
           "instrumentation_scope_metadata_as_tags": true
           }
       compression: zstd
       compression_params:
         level: 3
       sending_queue:
         batch:
           sizer: bytes
           min_size: 2097152
           max_size: 4194304
   ```

   파이프라인의 `exporters` 목록에 있는 각 `datadog/exporter` 항목을 `otlp_http`로 바꿉니다. 클러스터 Collector에서 Datadog Exporter의 `orchestrator_explorer` 옵션을 포함하지 않습니다. Datadog은 `k8sobjects` 수신기로부터 OTLP를 통해 도착하는 리소스 데이터를 인식합니다.

4. `daemonset-collector.yaml`에서 트레이스 처리를 업데이트합니다. 참조 파일은 애플리케이션 트레이스도 지원합니다.
   - 노드 Collector가 애플리케이션 트레이스를 수신하지 않는 경우 `datadog/connector`, `traces` 및 `traces/sampling` 파이프라인, 그리고 `metrics` 파이프라인의 수신기에서 `datadog/connector`를 제거하세요.
   - 노드 Collector가 애플리케이션 트레이스를 수신하는 경우 [권장 Collector 구성][18]을 사용하여 `datadog/connector`를 업스트림 `forward/traces_sample` 및 `span_metrics` 커넥터로 바꾸세요.

   `datadog` 확장 프로그램과 `service.extensions` 아래의 해당 항목을 유지하세요. 이 확장 프로그램은 호스트 정보 보강에 사용되는 Collector 메타데이터를 보고하며, 텔레메트리를 내보내지 않습니다.

5. 두 Collector가 동일한 클러스터 이름을 보고하는지 확인합니다.
   - 자동으로 탐지하려면 `k8s_api`와 공급자의 탐지기를 `resourcedetection.detectors` 아래에 유지하고, 다른 클라우드 공급자 탐지기는 제거하세요. [EKS][14], [AKS][16] 또는 [GKE][17]에 대한 공급자 탐지기와 해당 권한을 구성하세요.
   - 그렇지 않으면 `resourcedetection.detectors`를 `[k8s_api]`로 설정하세요. `resource/add-cluster-name`의 주석을 해제하고 두 파일 모두에서 `<YOUR_CLUSTER_NAME>`을 동일한 값으로 바꾸세요. `resourcedetection`을 사용하는 각 파이프라인에서 바로 뒤에 `resource/add-cluster-name`을 추가하세요. 다른 프로세서는 그대로 유지하세요.

6. values 파일이 포함된 디렉터리에서 다음 명령을 실행합니다.

   ```sh
   # Install the node Collector (DaemonSet)
   helm install otel-daemon-collector open-telemetry/opentelemetry-collector \
     --namespace default \
     -f daemonset-collector.yaml \
     --set image.repository=otel/opentelemetry-collector-contrib \
     --set image.tag=0.159.0

   # Install the cluster Collector (Deployment)
   helm install otel-cluster-collector open-telemetry/opentelemetry-collector \
     --namespace default \
     -f cluster-collector.yaml \
     --set image.repository=otel/opentelemetry-collector-contrib \
     --set image.tag=0.159.0
   ```

### 설정 검증 {#verify-the-setup}

1. Collector 및 `kube-state-metrics` 포드가 실행 중이고 준비되었는지 확인합니다.

   ```sh
   kubectl get pods --namespace default \
     -l 'app.kubernetes.io/instance in (otel-daemon-collector,otel-cluster-collector,kube-state-metrics)'
   ```

2. [Kubernetes - Overview][1] 대시보드를 열고 클러스터를 선택합니다. 노드 리소스 사용량 및 Kubernetes 객체 메트릭을 확인하세요.
3. [Kubernetes Explorer][13]를 열고 클러스터 이름으로 필터링합니다. 포드 및 배포와 같은 리소스가 나타나는지 확인하세요.

데이터가 누락된 경우 Collector 로그에서 내보내기 오류를 확인하세요. 시크릿에 선택한 Datadog 사이트에 대한 API 키가 포함되어 있는지 검증하세요.

## 트레이스를 인프라 메트릭과 상호 연계(선택 사항) {#correlating-traces-with-infrastructure-metrics}

이미 트레이스를 전송하는 애플리케이션의 경우 [unified service tagging][7]을 사용하여 애플리케이션 텔레메트리를 인프라 메트릭과 상호 연계하세요. 둘 다에 동일한 리소스 속성을 설정하세요.

- `service.name` 속성은 Datadog `service` 태그에 매핑됩니다.
- `service.version` 속성은 Datadog `version` 태그에 매핑됩니다.
- `deployment.environment.name` 속성은 Datadog `env` 태그에 매핑됩니다.

### 애플리케이션 설정 {#application-configuration}

애플리케이션의 컨테이너 사양에 다음 환경 변수를 설정하여 전송되는 텔레메트리에 태그를 지정하세요.

```yaml
spec:
  containers:
    - name: my-container
      env:
        - name: OTEL_SERVICE_NAME
          value: "<SERVICE_NAME>"
        - name: OTEL_RESOURCE_ATTRIBUTES
          value: "service.version=<SERVICE_VERSION>,deployment.environment.name=<ENVIRONMENT>"
```

### 인프라 구성 {#infrastructure-configuration}

Kubernetes `Deployment` 메타데이터에 해당 주석을 추가하세요. Collector의 `k8sattributes` 프로세서는 이러한 주석을 사용하여 서비스 컨텍스트로 인프라 메트릭을 보강합니다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  annotations:
    # Use resource.opentelemetry.io/ for the k8sattributes processor
    resource.opentelemetry.io/service.name: "<SERVICE_NAME>"
    resource.opentelemetry.io/service.version: "<SERVICE_VERSION>"
    resource.opentelemetry.io/deployment.environment.name: "<ENVIRONMENT>"
spec:
  template:
    metadata:
      annotations:
        resource.opentelemetry.io/service.name: "<SERVICE_NAME>"
        resource.opentelemetry.io/service.version: "<SERVICE_VERSION>"
        resource.opentelemetry.io/deployment.environment.name: "<ENVIRONMENT>"
# ... rest of the manifest
```

## 수집된 데이터 {#data-collected}

이 통합은 여러 OpenTelemetry 수신기를 사용하여 메트릭을 수집합니다.

### kube-state-metrics(Prometheus 수신기 사용) {#kube-state-metrics-using-prometheus-receiver}

`kube-state-metrics` 엔드포인트에서 스크랩된 메트릭은 Kubernetes API 객체의 상태에 대한 정보를 제공합니다.

### Kubelet 통계 수신기 {#kubelet-stats-receiver}

`kubeletstatsreceiver`는 각 노드의 Kubelet에서 메트릭을 수집하며, 포드, 컨테이너 및 볼륨의 리소스 사용량에 중점을 둡니다.

{{< mapping-table resource="kubeletstats.csv">}}

### Kubernetes 클러스터 수신기 {#kubernetes-cluster-receiver}

`k8sclusterreceiver`는 노드, 포드 및 기타 객체의 상태와 개수와 같은 클러스터 수준 메트릭을 수집합니다.

{{< mapping-table resource="k8scluster.csv">}}

### 카운트 커넥터 {#count-connector}

[카운트 커넥터][11]는 파이프라인을 통과하는 메트릭 시리즈의 수를 계산하여 객체 수 메트릭을 생성합니다. 다음 메트릭을 생성합니다.

{{< mapping-table resource="count-connector.csv">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/86/kubernetes---overview
[2]: https://helm.sh/docs/intro/install/
[3]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/cluster-collector.yaml
[4]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/daemonset-collector.yaml
[5]: /ko/getting_started/site/
[6]: /ko/account_management/api-app-keys/#api-keys
[7]: /ko/getting_started/tagging/unified_service_tagging/?tab=kubernetes#opentelemetry
[8]: https://github.com/kubernetes/kube-state-metrics
[9]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/opentelemetry-collector-0.156.2/charts/opentelemetry-collector
[10]: /ko/containers/monitoring/kubernetes_explorer/
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/countconnector
[12]: /ko/containers/monitoring/kubernetes_explorer/?tab=opentelemetrycollector#limitations
[13]: https://app.datadoghq.com/orchestration/overview
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#amazon-eks
[15]: /ko/containers/monitoring/kubernetes_explorer/?tab=opentelemetrycollector#enable-kubernetes-explorer
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#azure-aks
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#gcp-metadata
[18]: /ko/opentelemetry/setup/collector_exporter/?tab=kubernetesmanifestreference#2-configure-and-deploy-the-collector