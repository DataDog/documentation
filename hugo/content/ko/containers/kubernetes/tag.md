---
aliases:
- /ko/agent/autodiscovery/tag/
- /ko/agent/kubernetes/tag
description: Kubernetes 포드 레이블과 주석에서 자동 태그 추출을 구성하여 모니터링 향상
further_reading:
- link: /getting_started/tagging/
  tag: Documentation
  text: 태그 시작하기
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Datadog에서 태그를 활용하기
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
title: Kubernetes 태그 추출
---
Datadog Agent는 포드(또는 포드 내 개별 컨테이너)가 생성하는 메트릭, 트레이스 및 로그에 대해 레이블이나 주석에 따라 태그를 자동으로 할당할 수 있습니다.

## 기본 제공 태그

자동으로 할당되는 태그 목록은 Agent의 [카디널리티 구성][1]에 따라 달라집니다. [태그 카디널리티][4]는 수집 전에 추가되며, 서로 다른 카디널리티 설정이 생성되는 메트릭 수에 영향을 주므로 청구에도 영향을 미칠 수 있습니다.

<div style="overflow-x: auto;">

  | 태그                           | 카디널리티  | 소스                                                                                                                        | 요구 사항                                         |
  |||||
  | `container_id`                | 높음         | 포드 상태                                                                                                                    | 해당 없음                                                 |
  | `display_container_name`      | 높음         | 포드 상태                                                                                                                    | 해당 없음                                                 |
  | `pod_name`                    | 오케스트레이터 | 포드 메타데이터                                                                                                                  | 해당 없음                                                 |
  | `oshift_deployment`           | 오케스트레이터 | 포드 주석 `openshift.io/deployment.name`                                                                                 | OpenShift 환경 및 포드 주석이 존재해야 함 |
  | `kube_ownerref_name`          | Orchestrator | 포드 ownerref                                                                                                                  | 포드에 소유자가 있어야 함                              |
  | `kube_job`                    | 오케스트레이터 | 포드 소유자 참조                                                                                                                  | 포드는 크론잡에 연결되어 있어야 함                   |
  | `kube_job`                    | 낮음          | 포드 소유자 참조                                                                                                                  | 포드는 작업에 연결되어 있어야 함                       |
  | `kube_replica_set`            | 낮음          | 포드 소유자 참조                                                                                                                  | 포드는 레플리카 세트에 연결되어 있어야 함               |
  | `kube_service`                | 낮음          | Kubernetes 서비스 검색                                                                                                  | 포드는 Kubernetes 서비스 뒤에 있음                  |
  | `kube_daemon_set`             | 낮음          | 포드 소유자 참조                                                                                                                  | 포드는 DaemonSet에 연결되어 있어야 함                 |
  | `kube_container_name`         | 낮음          | 포드 상태                                                                                                                    | 해당 없음                                                 |
  | `kube_namespace`              | 낮음          | 포드 메타데이터                                                                                                                  | 해당 없음                                                 |
  | `kube_app_name`               | 낮음          | 포드 레이블 `app.kubernetes.io/name`                                                                                            | 포드 레이블이 존재해야 함                                |
  | `kube_app_instance`           | 낮음          | 포드 레이블 `app.kubernetes.io/instance`                                                                                        | 포드 레이블이 존재해야 함                                |
  | `kube_app_version`            | 낮음          | 포드 레이블 `app.kubernetes.io/version`                                                                                         | 포드 레이블이 존재해야 함                                |
  | `kube_app_component`          | 낮음          | 포드 레이블 `app.kubernetes.io/component`                                                                                       | 포드 레이블이 존재해야 함                                |
  | `kube_app_part_of`            | 낮음          | 포드 레이블 `app.kubernetes.io/partof`                                                                                         | 포드 레이블이 존재해야 함                                |
  | `kube_app_managed_by`         | 낮음          | 포드 레이블 `app.kubernetes.io/managedby`                                                                                      | 포드 레이블이 존재해야 함                                |
  | `env`                         | 낮음          | 포드 레이블 `tags.datadoghq.com/env` 또는 컨테이너 환경 변수 (`DD_ENV` 또는 `OTEL_RESOURCE_ATTRIBUTES`)                               | [unified service tagging][2] 활성화됨                |
  | `version`                     | 낮음          | 포드 레이블 `tags.datadoghq.com/version` 또는 컨테이너 환경 변수 (`DD_VERSION` 또는 `OTEL_RESOURCE_ATTRIBUTES`)                       | [unified service tagging][2] 활성화됨                |
  | `service`                     | 낮음          | 포드 레이블 `tags.datadoghq.com/service` 또는 컨테이너 환경 변수 (`DD_SERVICE`, `OTEL_RESOURCE_ATTRIBUTES`, 또는 `OTEL_SERVICE_NAME`) | [unified service tagging][2] 활성화됨                |
  | `pod_phase`                   | 낮음          | 포드 상태                                                                                                                    | 해당 없음                                                 |
  | `oshift_deployment_config`    | 낮음          | 포드 주석 `openshift.io/deploymentconfig.name`                                                                          | OpenShift 환경 및 포드 주석이 존재해야 함 |
  | `kube_ownerref_kind`          | 낮음          | 포드 소유자 참조                                                                                                                  | 포드에 소유자가 있어야 함                              |
  | `kube_deployment`             | 낮음          | 포드 소유자 참조                                                                                                                  | 포드는 배포에 연결되어 있어야 함                |
  | `kube_argo_rollout`           | 낮음          | 포드 소유자 참조                                                                                                                  | 포드는 아르고 롤아웃에 연결되어 있어야 함             |
  | `kube_replication_controller` | 낮음          | 포드 소유자 참조                                                                                                                  | 포드는 복제 컨트롤러에 연결되어 있어야 함    |
  | `kube_stateful_set`           | 낮음          | 포드 소유자 참조                                                                                                                  | 포드는 statefulset에 연결되어 있어야 함               |
  | `persistentvolumeclaim`       | 낮음          | 포드 사양                                                                                                                      | PVC는 포드에 연결되어 있어야 함                   |
  | `kube_cronjob`                | 낮음          | 포드 소유자 참조                                                                                                                  | 포드는 크론잡에 연결되어 있어야 함                   |
  | `image_name`                  | 낮음          | 포드 사양                                                                                                                      | 해당 없음                                                 |
  | `short_image`                 | 낮음          | 포드 사양                                                                                                                      | 해당 없음                                                 |
  | `image_tag`                   | 낮음          | 포드 사양                                                                                                                      | 해당 없음                                                 |
  | `eks_fargate_node`            | 낮음          | 포드 사양                                                                                                                      | EKS Fargate 환경                             |
  | `kube_runtime_class`          | 낮음          | 포드 사양                                                                                                                      | 포드는 런타임 클래스에 연결되어 있어야 함             |
  | `gpu_vendor`                  | 낮음          | 포드 사양                                                                                                                      | 컨테이너는 GPU 리소스에 연결되어 있어야 함        |
  | `image_id`                    | 낮음          | 컨테이너 이미지 ID                                                                                                            | 해당 없음                                                 |
  | `kube_autoscaler_kind`        | 낮음          | Kubernetes 오토스케일러 유형                                                                                                    | Kubernetes 오토스케일러를 사용해야 함                  |
  | `kube_priority_class`         | 낮음          | 포드 우선순위 클래스                                                                                                            | 포드는 우선순위 클래스가 설정되어야 함                    |
  | `kube_qos`                    | 낮음          | 포드 서비스 품질 클래스                                                                                                  | 해당 없음                                                 |

</div>


### 호스트 태그

Agent는 "호스트 태그"로 Kubernetes 환경 정보를 첨부할 수 있습니다.

<div style="overflow-x: auto;">

  | 태그                 | 카디널리티 | 소스                                                 | 요구 사항                                                    |
  |||||
  | `kube_cluster_name` | 낮음         | `DD_CLUSTER_NAME` 환경 변수 또는 클라우드 공급자 통합 | `DD_CLUSTER_NAME` 환경 변수 또는 클라우드 공급자 통합이 활성화됨 |
  | `kube_node_role`    | Low         | 노드 레이블 `noderole.kubernetes.io/<role>`            | 노드 레이블이 존재해야 함                                          |
  | `kube_node`         | 낮음         | `NodeName` 포드 사양의 필드             |                                                              |
  | `orch_cluster_id`   | 낮음         | 오케스트레이터 클러스터 메타데이터                          |  오케스트레이터 환경                                    |
  | `kube_distribution` | 낮음         | 노드 레이블 및 NodeSystemInfo                         |  |
</div>

## 태그 자동 검색

Agent v6.10 이상부터 Agent는 포드 주석에서 태그를 자동으로 검색할 수 있습니다. 이를 통해 Agent는 포드 전체에서 발생하는 모든 데이터 또는 해당 포드 내 개별 컨테이너의 데이터에 태그를 연결할 수 있습니다.

컨테이너화된 환경에서는 Datadog에서 태그 통합에 도움이 되는 unified service tagging 사용을 권장합니다. unified service tagging은 세 가지 표준 태그(`env`, `service` 및 `version`)를 사용하여 Datadog 텔레메트리를 연결합니다. 환경에서 unified service tagging을 구성하는 방법은 [unified service tagging][2] 설명서를 참조하세요.

특정 포드에서 전송하고 Agent에서 수집한 모든 데이터에 `<TAG_KEY>:<TAG_VALUE>` 태그를 적용하려면 포드에 다음 주석을 추가하면 됩니다.

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

포드 내의 개별 컨테이너 `<CONTAINER_NAME>`에 `<TAG_KEY>:<TAG_VALUE>` 태그를 적용하려면 다음 주석을 포드에서 사용하세요.

```yaml
annotations:
  ad.datadoghq.com/<CONTAINER_NAME>.tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

Agent v7.17 이상부터는 Docker 레이블에서도 태그를 자동으로 검색할 수 있습니다. 이 과정은 Agent 구성 변경 없이 컨테이너에서 전송되는 모든 데이터에 사용자 지정 태그를 연결할 수 있게 합니다.

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY>:TAG_VALUE", "<TAG_KEY_1>:<TAG_VALUE_1>"]'
```

Agent v7.77 이상부터는 태그 주석이 [Autodiscovery 템플릿 변수][5]를 지원하여 런타임 메타데이터 기반의 동적 태깅이 가능합니다. `%%env_<VAR>%%`를 제외한 모든 템플릿 변수가 지원됩니다.

```yaml
annotations:
  ad.datadoghq.com/tags: '{"pod_ip":"%%host%%","pod_name":"%%kube_pod_name%%","namespace":"%%kube_namespace%%"}'
  ad.datadoghq.com/nginx.tags: '{"container_port":"%%port_80%%"}'
```

## 태그 추출

버전 7.64 이상부터는 Agent와 Cluster Agent를 구성하여 Kubernetes 리소스의 레이블과 주석을 수집하고 이를 공통 구성에서 태그로 사용할 수 있습니다. Datadog에서는 Agent의 기본 태깅, Cluster Agent의 KSM 보고, 두 Agent의 Orchestrator Explorer 보고 간 일관성을 위해 다음 옵션을 사용하는 것을 권장합니다.
 `kubernetesResourcesLabelsAsTags`
 `kubernetesResourcesAnnotationsAsTags`

이 옵션은 이전 Agent 옵션(`podLabelsAsTags`, `nodeLabelsAsTags`, `namespaceLabelsAsTags`)이나 KSM 구성 재정의 대신 사용해야 합니다.

이 구성은 메타데이터를 추출할 리소스 유형을 참조합니다. 각 리소스 유형은 `resourceType.apiGroup` 형식으로 지정해야 합니다. 여기서 `resourceType`은 리소스의 복수형 이름입니다. API 그룹이 비어 있는 리소스(예: 포드, 노드)는 `resourceType` 이름만으로 지정할 수 있습니다.

예를 들어, `kubectl apiresources`를 실행하여 정보를 확인할 수 있습니다.

| 이름        | API 버전                  | Datadog 리소스 구성  |
||||
| 포드        | v1                           | pods                            |
| 노드       | v1                           | nodes                           |
| 네임스페이스  | v1                           | namespaces                      |
| 배포 | 앱/v1                      | deployments.apps                |
| 역할       | rbac.authorization.k8s.io/v1 | roles.rbac.authorization.k8s.io |

**참고:**

 태그*는 워크로드와 하위 리소스 간에 자동으로 전파되지 않습니다*. 예를 들어, 배포에 설정된 레이블이 그 하위 포드의 로그에 자동으로 적용되지 않습니다. 포트 데이터를 태깅하려면 레이블 추출을 포드에서 직접 구성해야 합니다.
 태그는 네임스페이스에서 해당 네임스페이스 안의 포드 및 컨테이너로 *실제로* 전파됩니다.
 KSM Metrics의 태그 추출 규칙에서 와일드카드를 사용하려면 Datadog Agent 7.73 이상을 사용하세요.

### Kubernetes 리소스 레이블을 태그로 사용하기

이 옵션은 Kubernetes 리소스에서 특정 레이블을 추출하여 Datadog 태그로 전송하는 데 사용됩니다.

{{< tabs >}}

{{% tab "Datadog Operator" %}}

주어진 리소스 레이블 `<LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면, `datadogagent.yaml`에서 Operator의 `DatadogAgent` 구성에 다음 구성을 추가합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      <RESOURCE>:
        <LABEL>: <TAG_KEY>
```

예를 들어, 노드, 포드, 배포에서 리소스 레이블을 추출하려면 다음과 같이 설정합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      nodes:
        kubernetes.io/arch: arch
      pods:
        role: pod_role
      deployments.apps:
        team: kube_team
```

{{% /tab %}}

{{% tab "Helm" %}}

지정된 리소스 레이블 `<LABEL>`을 추출하여 Datadog에서 태그 키 `{tag_key}`<TAG_KEY>로 변환하려면 `datadogagent.yaml` 파일에 다음 구성을 추가합니다.

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    <RESOURCE>:
      <LABEL>: <TAG_KEY>
```

예를 들어, 노드, 포드, 배포에서 리소스 레이블을 추출하려면 다음과 같이 설정합니다.

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    nodes:
      kubernetes.io/arch: arch
    pods:
      role: pod_role
    deployments.apps:
      team: kube_team
```

{{% /tab %}}

{{% tab "수동 (DaemonSet)" %}}

지정된 리소스 레이블 `<LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면, Agent 및 Cluster Agent 컨테이너 **모두에** 다음 환경 변수를 추가합니다.

```yaml
- name: DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS
  value: '{"<RESOURCE>":{"<LABEL>":"<TAG_KEY>"}}'
```

예를 들어, 노드, 포드, 배포에서 리소스 레이블을 추출하려면 다음과 같이 설정합니다.

```yaml
- name: DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS
  value: '{"deployments.apps":{"team":"kube_team"},"nodes":{"kubernetes.io/arch":"arch"},"pods":{"role":"pod_role"}}'
```

{{% /tab %}}
{{< /tabs >}}

Agent 7.73.0 이상에서는 다음 구성을 사용하여 모든 리소스 레이블을 메트릭에 태그로 추가합니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```yaml
    #(...)
    kubernetesResourcesLabelsAsTags:
      pods:
        "*": <PREFIX>_%%label%%
```

**참고**: Custom Metrics는 청구에 영향을 줄 수 있습니다. 자세한 내용은 [Custom Metrics Billing 페이지][3]를 참조하세요.

#### 레거시 구성과 병합하기

<div class="alert alert-info">

이 구성 옵션은 <a href="/containers/kubernetes/tag/#pod-labels-as-tags">podLabelsAsTags</a>, <a href="/containers/kubernetes/tag/#namespace-labels-as-tags">namespaceLabelsAsTags</a> 및 <a href="/containers/kubernetes/tag/#node-labels-as-tags">nodeLabelsAsTags</a>에 설정된 구성과 병합됩니다. 충돌이 발생할 경우, 구성 병합 시 <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">`kubernetesResourcesLabelsAsTags`</a>가 우선 적용됩니다.

예를 들어, 다음과 같은 구성이 있는 경우:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      label-1: tag-a
      label-2: tag-b

  podLabelsAsTags:
    label-2: legacy-tag-c
    label-3: legacy-tag-d
```

다음 매핑을 사용하여 포드 레이블에서 태그를 추출합니다.

```yaml
label-1: tag-a
label-2: tag-b
label-3: legacy-tag-d
```

</div>

### Kubernetes 리소스 주석을 태그로 사용하기

이 옵션은 Kubernetes 리소스에서 지정된 주석을 추출하여 Datadog 태그로 전송합니다.

{{< tabs >}}

{{% tab "Datadog Operator" %}}

지정된 리소스 주석 `<ANNOTATION>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Operator의 `DatadogAgent` 구성 파일(`datadogagent.yaml`)에 다음 구성을 추가합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      <RESOURCE>:
        <ANNOTATION>: <TAG_KEY>
```

예를 들어, 노드, 포드 및 배포에서 리소스 주석을 추출하려면:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      nodes:
        kubernetes.io/arch: arch
      pods:
        role: pod_role
      deployments.apps:
        team: kube_team
```

{{% /tab %}}

{{% tab "Helm" %}}

지정된 리소스 주석 `<ANNOTATION>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Helm `datadogvalues.yaml` 파일에 다음 구성을 추가합니다.

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    <RESOURCE>:
      <ANNOTATION>: <TAG_KEY>
```

예를 들어, 노드, 포드 및 배포에서 리소스 주석을 추출하려면:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    nodes:
      kubernetes.io/arch: arch
    pods:
      role: pod_role
    deployments.apps:
      team: kube_team
```

{{% /tab %}}

{{% tab "수동 (DaemonSet)" %}}

지정된 리소스 주석 `<ANNOTATION>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Agent 및 Cluster Agent 컨테이너 **모두에** 다음 환경 변수를 추가합니다.

```yaml
- name: DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS
  value: '{"<RESOURCE>":{"<ANNOTATION>":"<TAG_KEY>"}}'
```

예를 들어, 노드, 포드 및 배포에서 리소스 주석을 추출하려면:

```yaml
- name: DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS
  value: '{"deployments.apps":{"team":"kube_team"},"nodes":{"kubernetes.io/arch":"arch"},"pods":{"role":"pod_role"}}'
```

{{% /tab %}}
{{< /tabs >}}

Agent 7.73.0 이상에서는 다음 구성을 사용하여 모든 리소스 주석을 메트릭에 태그로 추가합니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```yaml
    #(...)
    kubernetesResourcesAnnotationsAsTags:
      pods:
        "*": <PREFIX>_%%annotation%%
```

**참고**: Custom Metrics는 청구에 영향을 줄 수 있습니다. 자세한 내용은 [Custom Metrics Billing 페이지][3]를 참조하세요.

<div class="alert alert-info">

이 구성 옵션은 <a href="/containers/kubernetes/tag/#pod-annotations-as-tags">podAnnotationsAsTags</a>에 설정된 다른 구성과 병합됩니다. 충돌이 발생할 경우, 구성 병합 시 <a href="/containers/kubernetes/tag/#kubernetes-resources-annotations-as-tags">`kubernetesResourcesAnnotationsAsTags`</a>가 우선 적용됩니다.

예를 들어, 다음과 같은 구성이 있는 경우:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    pods:
      annotation-1: tag-a
      annotation-2: tag-b

  podAnnotationsAsTags:
    annotation-2: legacy-tag-c
    annotation-3: legacy-tag-d
```

다음 매핑을 사용하여 포드 주석에서 태그를 추출합니다.

```yaml
annotation-1: tag-a
annotation-2: tag-b
annotation-3: legacy-tag-d
```

</div>


{{% collapse-content title="레거시 구성" level="h4" expanded=false id="legacy-configuration" %}}
#### 노드 레이블을 태그로 사용하기

<div class="alert alert-info">

Agent 버전 7.58.0 이상을 사용하는 경우, <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Kubernetes 리소스 레이블을 태그로 사용</a>하여 노드 레이블을 태그로 구성하는 것이 좋습니다.

</div>

Agent v6.0 이상부터는 지정된 노드의 레이블을 수집하여 Datadog에서 해당 `host`와 관련된 모든 메트릭, 트레이스 및 로그에 붙일 태그로 사용할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
지정된 노드 레이블 `<NODE_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Operator의 `DatadogAgent` 구성 파일(`datadogagent.yaml`)에 다음 구성을 추가합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      <NODE_LABEL>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      kubernetes.io/arch: arch
```

Agent v7.24.0 이상에서는 다음 환경 변수 구성을 사용하여 모든 노드 레이블을 메트릭에 태그로 추가합니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "Helm" %}}
지정된 노드 레이블 `<NODE_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Helm `datadogvalues.yaml` 파일에 다음 구성을 추가합니다.

```yaml
datadog:
  nodeLabelsAsTags:
    <NODE_LABEL>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다.

```yaml
datadog:
  nodeLabelsAsTags:
    kubernetes.io/arch: arch
```

Agent v7.24.0 이상에서는 다음 환경 변수 구성을 사용하여 모든 노드 레이블을 메트릭에 태그로 추가합니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.


```yaml
datadog:
  nodeLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "수동 (DaemonSet)" %}}
지정된 노드 레이블 `<NODE_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Datadog Agent에 다음 환경 변수를 추가합니다.

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<NODE_LABEL>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다.

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"kubernetes.io/arch":"arch"}'
```

Agent v7.24.0 이상에서는 다음 환경 변수 구성을 사용하여 모든 노드 레이블을 메트릭에 태그로 추가합니다. 이 예제에서는 태그의 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}' # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}
{{< /tabs >}}

**참고**: Custom Metrics는 청구에 영향을 줄 수 있습니다. 자세한 내용은 [Custom Metrics Billing 페이지][3]를 참조하세요.

#### 포드 레이블을 태그로 사용하기

<div class="alert alert-info">

Agent 버전 7.58.0 이상에서는 <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Kubernetes 리소스 레이블을 태그로 사용</a> 하여 포드 레이블을 태그로 구성하는 것이 좋습니다.

</div>

Agent v6.0 이상부터는 지정된 포드의 레이블을 수집하여 해당 포드에서 내보내는 모든 메트릭, 트레이스 및 로그에 붙일 태그로 사용할 수 있습니다:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
지정된 포드 레이블 `<POD_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Operator의 `DatadogAgent` 구성 파일(`datadogagent.yaml`)에 다음 구성을 추가합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      <POD_LABEL>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      app: kube_app
```

Agent v7.24.0 이상에서는 다음 환경 변수 구성을 사용하여 모든 포드 레이블을 메트릭에 태그로 추가합니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "Helm" %}}
지정된 포드 레이블 `<POD_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Helm `datadogvalues.yaml` 파일에 다음 구성을 추가합니다.

```yaml
datadog:
  podLabelsAsTags:
    <POD_LABEL>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다.

```yaml
datadog:
  podLabelsAsTags:
    app: kube_app
```

Agent v7.24.0 이상에서는 다음 환경 변수 구성을 사용하여 모든 포드 레이블을 메트릭에 태그로 추가합니다. 단, KSM(`kubernetes_state.*`)에서 수집된 레이블은 제외됩니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```yaml
datadog:
  podLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "수동 (DaemonSet)" %}}
지정된 포드 레이블 `<POD_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Datadog Agent에 다음 환경 변수를 추가합니다.

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<POD_LABEL>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다.

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Agent v7.24.0 이상에서는 다음 환경 변수 구성을 사용하여 모든 포드 레이블을 메트릭에 태그로 추가합니다. 단, KSM(`kubernetes_state.*`)에서 수집된 레이블은 제외됩니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**참고**: Custom Metrics는 청구에 영향을 줄 수 있습니다. 자세한 내용은 [Custom Metrics Billing 페이지][3]를 참조하세요.

#### 포드 주석을 태그로 사용하기

<div class="alert alert-info">

Agent 버전 7.58.0 이상에서는 <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Kubernetes 리소스 라벨을 태그로 사용</a>하여 포드 주석을 태그로 구성하는 것이 좋습니다.

</div>

Agent v6.0 이상부터는 지정된 포드에 대한 주석을 수집하여 해당 포드에서 내보내는 모든 메트릭, 트레이스 및 로그에 붙일 태그로 사용할 수 있습니다:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
지정된 포드 주석 `<POD_ANNOTATION>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Operator의 `DatadogAgent` 구성 파일(`datadogagent.yaml`)에 다음 구성을 추가합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      <POD_ANNOTATION>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      app: kube_app
```

Agent v7.24.0 이상에서는 다음 환경 변수 구성을 사용하여 모든 포드 주석을 메트릭에 태그로 추가합니다.단, KSM(`kubernetes_state.*`)에서 수집된 주석은 제외됩니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Helm" %}}
지정된 포드 주석 `<POD_ANNOTATION>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Helm `datadogvalues.yaml` 파일에 다음 구성을 추가합니다.

```yaml
datadog:
  podAnnotationsAsTags:
    <POD_ANNOTATION>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다.

```yaml
datadog:
  podAnnotationsAsTags:
    app: kube_app
```

Agent v7.24.0 이상에서는 다음 환경 변수 구성을 사용하여 모든 포드 주석을 메트릭에 태그로 추가합니다. 단, KSM(`kubernetes_state.*`)에서 수집된 주석은 제외됩니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```yaml
datadog:
  podAnnotationsAsTags:
    "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "수동 (DaemonSet)" %}}
지정된 포드 주석 `<POD_ANNOTATION>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Datadog Agent에 다음 환경 변수를 추가합니다.

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<POD_ANNOTATION>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다.

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

Agent v7.24.0 이상에서는 다음 환경 변수 구성을 사용하여 모든 포드 주석을 메트릭에 태그로 추가합니다.단, KSM(`kubernetes_state.*`)에서 수집된 주석은 제외됩니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**참고**: Custom Metrics는 청구에 영향을 줄 수 있습니다. 자세한 내용은 [Custom Metrics Billing 페이지][3]를 참조하세요.

#### 네임스페이스 레일을 태그로 사용하기

<div class="alert alert-info">

Agent 버전 7.58.0 이상에서는 <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Kubernetes 리소스 라벨을 태그로 사용</a>하여 네임스페이스 라벨을 태그로 구성하는 것이 좋습니다.

</div>

Agent v7.55.0 이상부터는 지정된 네임스페이스에 대한 라벨을 수집하여 해당 네임스페이스의 모든 포드에서 내보내는 모든 메트릭, 트레이스 및 로그에 붙일 태그로 사용할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
지정된 네임스페이스 레이블 `<NAMESPACE_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Operator의 `DatadogAgent` 구성 파일(`datadogagent.yaml`)에 다음 구성을 추가합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      <NAMESPACE_LABEL>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      app: kube_app
```

Agent v7.24.0 이상에서는 다음 환경 변수 구성을 사용하여 모든 네임스페이스 레이블을 메트릭에 태그로 추가합니다. 단, KSM(`kubernetes_state.*`)에서 수집된 레이블은 제외됩니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Helm" %}}
지정된 네임스페이스 레이블 `<NAMESPACE_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Helm `datadogvalues.yaml` 파일에 다음 구성을 추가합니다.

```yaml
datadog:
  namespaceLabelsAsTags:
    <NAMESPACE_LABEL>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다.

```yaml
datadog:
  namespaceLabelsAsTags:
    app: kube_app
```

Agent v7.24.0 이상에서는 다음 환경 변수 구성을 사용하여 모든 네임스페이스 레이블을 메트릭에 태그로 추가합니다. 단, KSM(`kubernetes_state.*`)에서 수집된 레이블은 제외됩니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```yaml
datadog:
  namespaceLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "수동 (DaemonSet)" %}}
지정된 네임스페이스 레이블 `<NAMESPACE_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Datadog Agent에 다음 환경 변수를 추가합니다.

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<NAMESPACE_LABEL>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다.

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Agent v7.24.0 이상에서는 다음 환경 변수 구성을 사용하여 모든 네임스페이스 레이블을 메트릭에 태그로 추가합니다. 단, KSM(`kubernetes_state.*`)에서 수집된 레이블은 제외됩니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 접두사로 붙습니다.

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**참고**: Custom Metrics는 청구에 영향을 줄 수 있습니다. 자세한 내용은 [Custom Metrics Billing 페이지][3]를 참조하세요.
{{% /collapse-content %}}

### 컨테이너 환경 변수를 태그로 사용하기

Agent v7.32 이상부터는 컨테이너 환경 변수를 수집하여 컨테이너에 해당하는 모든 메트릭, 트레이스 및 로그에 붙일 태그로 사용할 수 있습니다. `docker` 및 `containerd` 컨테이너가 모두 지원됩니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
지정된 환경 변수 `<ENV_VAR>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Operator의 `DatadogAgent` 구성 파일(`datadogagent.yaml`)에 다음 구성을 추가합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_ENV_AS_TAGS
          value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_ENV_AS_TAGS
          value: '{"app":"kube_app"}'
```

{{% /tab %}}

{{% tab "Helm" %}}
지정된 환경 변수 `<ENV_VAR>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 elm `datadogvalues.yaml` 파일에 다음 구성을 추가합니다.

```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다.

```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "수동 (DaemonSet)" %}}
지정된 환경 변수 `<ENV_VAR>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Datadog Agent에 다음 환경 변수를 추가합니다.

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENV_VAR>": "<TAG_KEY>"}'
```

예:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{< /tabs >}}

**참고**: Custom Metrics는 청구에 영향을 줄 수 있습니다. 자세한 내용은 [Custom Metrics Billing][3]을 참조하세요.

### 컨테이너 레이블을 태그로 사용하기

Agent v7.33 이상부터는 컨테이너 라벨을 수집하여 태그로 사용할 수 있습니다. Agent는 컨테이너와 관련된 모든 메트릭, 트레이스 및 로그에 태그를 붙입니다.

Agent는 `docker` 및 `containerd` 컨테이너 모두에 대해 컨테이너 레이블에서 태그를 생성할 수 있습니다. `containerd`의 경우, 최소 지원 버전은 v1.5.6입니다. 이전 버전은 레이블을 올바르게 전파하지 않기 때문입니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
지정된 컨테이너 라벨 `<CONTAINER_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Operator의 `DatadogAgent` 구성 파일(`datadogagent.yaml`)에 다음 구성을 추가합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_LABELS_AS_TAGS
          value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_LABELS_AS_TAGS
          value: '{"app":"kube_app"}'
```

{{% /tab %}}

{{% tab "Helm" %}}
지정된 컨테이너 라벨 `<CONTAINER_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Helm의 `datadogvalues.yaml` 파일에 다음 구성을 추가합니다.

```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다.

```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "수동 (DaemonSet)" %}}
지정된 컨테이너 라벨 `<CONTAINER_LABEL>`을 추출하여 태그 키 `<TAG_KEY>`로 변환하려면 Datadog Agent에 다음 환경 변수를 추가합니다.

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<CONTAINER_LABEL>":"<TAG_KEY>"}'
```

예:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"app":"kube_app"}'
```
{{% /tab %}}
{{< /tabs >}}

**참고**: Custom Metrics는 청구에 영향을 줄 수 있습니다. 자세한 내용은 [Custom Metrics Billing][3]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environmentvariables
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: /ko/account_management/billing/custom_metrics
[4]: /ko/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tagscardinality
[5]: /ko/containers/guide/template_variables/