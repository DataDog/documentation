---
aliases:
- /ko/guides/livecontainers
- /ko/graphing/infrastructure/livecontainers/
- /ko/infrastructure/livecontainers
further_reading:
- link: /infrastructure/livecontainers/configuration
  tag: 설명서
  text: Containers 보기 구성
- link: /infrastructure/hostmap/
  tag: 설명서
  text: 호스트맵을 통해 모든 호스트를 한 화면에서 확인하세요.
- link: /infrastructure/process/
  tag: 설명서
  text: 시스템의 모든 레벨에서 발생하는 상황 파악
- link: https://www.datadoghq.com/blog/kubernetes-cpu-requests-limits/
  tag: 블로그
  text: Kubernetes의 CPU 요청과 제한에 관해 자세히 알아보기
- link: https://www.datadoghq.com/blog/monitor-kubernetes-anomalies/
  tag: 블로그
  text: 쿠버네티스 이상 징후를 사용해 인프라스트럭처 조사 신속화
- link: https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/
  tag: 블로그
  text: Kubernetes 워크로드 규모 효율화를 위한 실용적인 팁
- link: https://www.datadoghq.com/blog/kubernetes-active-remediation-ai/
  tag: 블로그
  text: Accelerate Kubernetes issue resolution with AI-powered guided remediation
title: 컨테이너 보기
---

Datadog의 [Containers][1] 페이지에서는 환경 내 모든 컨테이너를 실시간으로 모니터링할 수 있습니다.

*htop*, *ctop*, *kubectl*과 같은 기반 도구에서 영감을 얻은 Containers 페이지는 2초마다 업데이트되는 리소스 메트릭, 패싯 검색, 스트리밍 컨테이너 로그로 계속 업데이트되는 테이블을 통해 컨테이너 인프라스트럭처에 관한 상세한 정보를 제공합니다.

또한 [Docker][2], [Kubernetes][3], [ECS][4] 및 기타 컨테이너 기술과 동적 구성 요소의 태그 기능을 사용해 컨테이너의 상태, 리소스 소비, 로그, 배포에 관한 자세한 개요를 실시간으로 제공합니다.

{{< img src="infrastructure/livecontainers/live-containers-overview_2.png" alt="실시간 컨테이너 요약" >}}

## 설정

Containers 뷰에 데이터를 표시하려면 컨테이너 수집을 활성화하세요.

{{< tabs >}}
{{% tab "Docker" %}}

Datadog Agent는 기본적으로 Docker 환경에서 컨테이너 수집을 활성화합니다.

검증을 위해 `DD_PROCESS_CONFIG_CONTAINER_COLLECTION_ENABLED`가 `true`로 설정되어 있는지 확인하세요.

예시:

```
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_CONFIG_CONTAINER_COLLECTION_ENABLED=true
```
{{% /tab %}}
{{% tab "Datadog 연산자" %}}

Datadog Operator는 기본적으로 컨테이너 수집을 활성화합니다.

검증을 위해 `datadog-agent.yaml`에서 `features.liveContainerCollection.enabled`가 `true`로 설정되어 있는지 확인합니다:

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
```

{{% /tab %}}
{{% tab "Helm" %}}

[공식 Helm 차트][1]를 사용하면 컨테이너 수집이 기본적으로 활성화됩니다.

검증을 위해 [`values.yaml`][2] 파일에서 `processAgent.containerCollection` 파라미터가 `true`로 설정되어 있는지 확인하세요.

```yaml
datadog:
  # (...)
  processAgent:
    containerCollection: true
```

그런 다음 Helm 차트를 업그레이드합니다.

일부 설정에서는 Cluster Agent가 Kubernetes 클러스터 이름을 자동으로 감지하지 못할 수 있습니다. 이러한 경우 기능이 시작되지 않고 Cluster Agent 로그에 `Orchestrator explorer enabled but no cluster name set: disabling.` 경고가 표시됩니다. 이를 해결하려면 `values.yaml`에서 `datadog.clusterName`을 클러스터 이름으로 설정해야 합니다.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
  #(...)
  processAgent:
    containerCollection: true
```

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Amazon ECS" %}}

다음 환경 변수를 사용하여 작업 정의를 업데이트합니다.

```json
{
  "name": "DD_PROCESS_CONFIG_CONTAINER_COLLECTION_ENABLED",
  "value": "true"
}
```

{{% /tab %}}
{{< /tabs >}}

### 설정
컨테이너 필터링 및 민감한 정보 스크러빙과 같은 구성 옵션은 [Containers 보기 구성][16]에서 확인하세요. 이전 Agent 버전(Datadog Agent v7.21.1 - v7.27.0 및 Cluster Agent v1.9.0 - 1.11.0)에서 이 페이지를 설정하려면 [실시간 컨테이너 레거시 구성][17]을 참고하세요.

## Kubernetes Orchestrator Explorer

Containers 페이지 왼쪽 상단의 **Select Resources** 상자에서 **Kubernetes** 제목을 확장하면 Kubernetes [Orchestrator Explorer][18]의 파드, 클러스터, 네임스페이스 및 기타 리소스를 확인할 수 있습니다. 자세한 내용은 [Orchestrator Explorer 문서][19]를 참고하세요.

[Kubernetes 페이지][20]에서도 Kubernetes 리소스 개요를 확인할 수 있습니다.

## 검색, 필터링, 피벗 기능

### 스트링 검색

컨테이너는 기본적으로 카디널리티가 매우 높은 개체입니다. Datadog의 유연한 스트링 검색은 컨테이너 이름, ID 또는 이미지 필드에 있는 하위 문자열을 일치시킵니다.

여러 스트링 검색을 하나의 복잡한 쿼리로 결합하기 위해 다음 부울 연산자를 사용합니다:

`AND`
: **교집합**: 선택한 이벤트에 두 단어가 모두 있음(아무것도 추가하지 않을 경우, AND가 기본적으로 사용됨) <br> **예**: `java AND elasticsearch`

`OR`
: **합집합**: 선택한 이벤트에 두 단어 중 하나가 있음 <br> **예**: `java OR python`

`NOT` / `!`
: **제외**: 이벤트에 해당 단어가 없음.  `NOT` 또는 `!` 문자를 사용해 동일한 결과를 얻을 수 있음<br> **예**: `java NOT elasticsearch` 또는 `java !elasticsearch`

괄호를 사용하여 연산자를 그룹화합니다. 예를 들면, `(NOT (elasticsearch OR kafka) java) OR python`과 같습니다.

### 필터링 및 피벗 기능

아래 스크린샷은 25개 노드의 쿠버네티스 클러스터로 필터링된 시스템을 보여줍니다. 컨테이너에 프로비저닝 제한이 있는 경우 컨테이너의 RSS 및 CPU 사용률은 컨테이너의 프로비저닝 제한과 비교하여 보고됩니다. 여기에서는 이 클러스터의 컨테이너가 오버 프로비저닝된 것이 분명합니다. 더 엄격한 제한과 빈 패킹을 사용하여 리소스 활용도를 높일 수 있습니다.

{{< img src="infrastructure/livecontainers/filter-by.png" alt="25개 노드의 쿠버네티스 클러스터로 필터링된 시스템" style="width:80%;">}}

컨테이너 환경은 동적이며 따라가기 어려울 수 있습니다. 다음 스크린샷은 시스템 노이즈를 줄이기 위해 `kube_service`와 `host`로 피벗되고, `kube_namespace:default`로 필터링된 것을 보여줍니다. 어떤 서비스가 어디에서 실행되고 있는지, 주요 메트릭의 포화도가 어느 정도인지 확인할 수 있습니다:

{{< img src="infrastructure/livecontainers/hostxservice.png" alt="호스트 x 서비스" style="width:80%;">}}

ECS `ecs_task_name`과 `ecs_task_version` 별로 피벗하여 업데이트 간 리소스 사용률의 변화를 파악할 수 있습니다.

{{< img src="infrastructure/livecontainers/tasksxversion2.png" alt="타스크 x 버전" style="width:80%;">}}

## 태깅

컨테이너에는 기존의 모든 호스트 레벨 태그, 그리고 개별 컨테이너와 연결된 메타데이터가 [태그][6]로 지정됩니다.

모든 컨테이너에는 추가 컨테이너 레벨 태그를 제공하는 [ECS][4] 및 [쿠버네티스][3]와 같은 인기 있는 오케스트레이터와의 통합을 포함하여 `image_name`로 태그가 지정됩니다. 또한 각 컨테이너에는 도커, ECS 또는 쿠버네티스 아이콘이 표시되어 어떤 컨테이너가 오케스트레이션 되고 있는지 한눈에 알 수 있습니다.

ECS 컨테이너의 태그는 다음과 같습니다:

* `task_name`
* `task_version`
* `ecs_cluster`

쿠버네티스 컨테이너의 태그는 다음과 같습니다:

* `pod_name`
* `kube_service`
* `kube_namespace`
* `kube_replica_set`
* `kube_daemon_set`
* `kube_job`
* `kube_deployment`
* `kube_cluster_name`

[통합 서비스 태깅][7] 구성이 있다면 Datadog은 `env`, `service`, `version` 태그를 자동으로 수집합니다. 이러한 태그를 사용하여 APM, 로그, 메트릭, 컨테이너 데이터를 서로 연결할 수 있습니다.

## 보기

Containers 페이지에는 [Scatter Plot(산점도)](#scatter-plot) 및 [Timeseries(시계열)][8] 보기와 컨테이너 이름, 상태, 시작 시간 등 필드별로 컨테이너 데이터가 정리된 표가 있습니다.

#### 산점도

산점도 분석을 이용해 두 개의 메트릭을 비교하면 컨테이너의 성능을 더 깊게 이해할 수 있습니다.

컨테이너 페이지의 **요약 그래프** 섹션에서 "산점도"와 "시계열" 탭 사이를 전환할 수 있습니다:

{{< img src="infrastructure/livecontainers/scatterplot_selection.png" alt="산점도 선택" style="width:80%;">}}

기본적으로 그래프는 `short_image` 태그 키에 따라 그룹화됩니다. 각 점의 크기는 해당 그룹의 컨테이너 수를 나타내며, 점을 클릭하면 그룹에 기여하는 개별 컨테이너 및 호스트가 표시됩니다.

그래프 상단의 옵션을 사용하면 산점도 분석을 제어할 수 있습니다.

* 표시할 메트릭 선택
* 메트릭 두 개를 집계할 방법 선택
* X축과 Y축의 배율 선택(*선형*/*로그*).

{{< img src="infrastructure/livecontainers/scatterplot.png" alt="산점도" style="width:80%;">}}

#### 실시간 모니터링

컨테이너 페이지에서 활발하게 작업하는 동안 메트릭은 2초 단위로 수집됩니다. 이는 CPU와 같이 변동성이 큰 메트릭에 중요한 역할을 합니다. 백그라운드에서는 히스토리 컨텍스트를 위해 메트릭이 10초 단위로 수집됩니다.

### 컨테이너 로그

`docker logs -f` 또는 `kubectl logs -f`와 같은 Datadog에 있는 모든 컨테이너에 대한 스트리밍 로그를 확인합니다. 상세하게 살펴보려면 테이블에서 컨테이너를 클릭합니다. *로그* 탭을 클릭하면 [라이브 테일][13]의 실시간 데이터 또는 과거 어느 시점에서 인덱싱된 로그를 볼 수 있습니다.

#### 라이브 테일

라이브 테일을 사용하면 모든 컨테이너 로그가 스트리밍됩니다. 스트리밍을 일시 중지하면 빠르게 기록되는 로그를 읽을 수 있으며, 일시 중지를 해제하면 스트리밍을 계속할 수 있습니다.

스트리밍 로그는 간단한 스트링 매칭으로 검색할 수 있습니다. 자세한 내용은 [라이브 테일][13]을 참조하세요.

**참고**: 스트리밍 로그는 유지되지 않으며, 새 검색을 입력하거나 페이지를 새로고침하면 지워집니다.

{{< img src="infrastructure/livecontainers/livecontainerlogssidepanel.mp4" alt="로그 미리 보기 사이드 패널" video="true" >}}

#### 인덱싱된 로그

해당 기간을 선택하면 인덱싱 및 보존을 위해 선택한 인덱싱된 로그를 확인할 수 있습니다. 인덱싱을 사용하면 태그와 패싯을 사용하여 로그를 필터링할 수 있습니다. 예를 들어, 오류 상태의 로그를 검색하려면 검색 상자에 status:error를 입력합니다. 자동 완성 기능을 사용하면 원하는 특정 태그를 찾을 수 있습니다. 또한, 로그에 대한 주요 속성은 태그에 이미 저장되어 있으므로 필요에 따라 검색, 필터링 및 집계할 수 있습니다.

{{< img src="infrastructure/livecontainers/errorlogs.png" alt="로그 미리 보기 사이드 패널" style="width:100%;">}}

## 추가 정보

* 30분 후에는 실시간 (2초) 데이터 수집 기능이 꺼집니다. 실시간 수집을 재개하려면 페이지를 새로 고침 하세요.
* RBAC 설정은 쿠버네티스 메타데이터 수집을 제한할 수 있습니다. [Datadog 에이전트의 RBAC 엔티티][14]를 참조하세요.
* 쿠버네티스에서 `health` 값은 컨테이너의 활성 프로브가 아니라 컨테이너의 준비 상태 프로브입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /ko/integrations/docker_daemon/
[3]: /ko/agent/kubernetes/
[4]: /ko/agent/amazon_ecs/
[5]: /ko/infrastructure/livecontainers/configuration
[6]: /ko/tagging/assigning_tags?tab=agentv6v7#host-tags
[7]: /ko/getting_started/tagging/unified_service_tagging
[8]: /ko/dashboards/widgets/timeseries/
[9]: /ko/logs
[10]: /ko/metrics
[11]: /ko/tracing
[12]: /ko/events
[13]: /ko/logs/explorer/live_tail
[14]: https://github.com/DataDog/datadog-agent/blob/7.23.1/Dockerfiles/manifests/cluster-agent/rbac.yaml
[15]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog
[16]: /ko/infrastructure/containers/configuration
[17]: /ko/infrastructure/faq/live-containers-legacy-configuration
[18]: https://app.datadoghq.com/orchestration/overview
[19]: /ko/infrastructure/containers/orchestrator_explorer/
[20]: /ko/infrastructure/containers/kubernetes_resources