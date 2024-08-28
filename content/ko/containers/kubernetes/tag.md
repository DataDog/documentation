---
aliases:
- /ko/agent/autodiscovery/tag/
- /ko/agent/kubernetes/tag
further_reading:
- link: /getting_started/tagging/
  tag: 설명서
  text: 태그 시작하기
- link: /getting_started/tagging/using_tags/
  tag: 설명서
  text: Datadog에서 태그를 활용하기
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
title: 쿠버네티스 태그 추출
---

에이전트는 라벨 또는 어노테이션을 기반으로 포드에서 내보내는 모든 메트릭, 트레이스 및 로그에 태그를 생성하고 할당할 수 있습니다.

호스트에서 에이전트를 바이너리로 실행하는 경우, [에이전트](?탭=에이전트) 탭 지침에 따라 태그 추출을 설정합니다. 에이전트를 쿠버네티스 클러스터에서 컨테이너로 실행하는 경우, [컨테이너화된 에이전트](?tab=containerizedagent) 탭 지침에 따라 태그 추출을 설정합니다.

## 즉시 사용 가능한 태그

에이전트는 전체 포드 또는 포드 내의 개별 컨테이너에서 내보내는 모든 데이터에 태그를 자동으로 검색하고 첨부할 수 있습니다. 자동으로 첨부되는 태그 목록은 에이전트 [카디널리티 설정][1]에 따라 달라집니다.

<div style="overflow-x: auto;">

  | Tag                           | Cardinality  | Source                                                                  | Requirement                                         |
  |-------------------------------|--------------|-------------------------------------------------------------------------|-----------------------------------------------------|
  | `container_id`                | High         | Pod status                                                              | N/A                                                 |
  | `display_container_name`      | High         | Pod status                                                              | N/A                                                 |
  | `pod_name`                    | Orchestrator | Pod metadata                                                            | N/A                                                 |
  | `oshift_deployment`           | Orchestrator | Pod annotation `openshift.io/deployment.name`                           | OpenShift environment and pod annotation must exist |
  | `kube_ownerref_name`          | Orchestrator | Pod ownerref                                                            | Pod must have an owner                              |
  | `kube_job`                    | Orchestrator | Pod ownerref                                                            | Pod must be attached to a cronjob                   |
  | `kube_job`                    | Low          | Pod ownerref                                                            | Pod must be attached to a job                       |
  | `kube_replica_set`            | Low          | Pod ownerref                                                            | Pod must be attached to a replica set               |
  | `kube_service`                | Low          | Kubernetes service discovery                                            | Pod is behind a Kubernetes service                  |
  | `kube_daemon_set`             | Low          | Pod ownerref                                                            | Pod must be attached to a DaemonSet                 |
  | `kube_container_name`         | Low          | Pod status                                                              | N/A                                                 |
  | `kube_namespace`              | Low          | Pod metadata                                                            | N/A                                                 |
  | `kube_app_name`               | Low          | Pod label `app.kubernetes.io/name`                                      | Pod label must exist                                |
  | `kube_app_instance`           | Low          | Pod label `app.kubernetes.io/instance`                                  | Pod label must exist                                |
  | `kube_app_version`            | Low          | Pod label `app.kubernetes.io/version`                                   | Pod label must exist                                |
  | `kube_app_component`          | Low          | Pod label `app.kubernetes.io/component`                                 | Pod label must exist                                |
  | `kube_app_part_of`            | Low          | Pod label `app.kubernetes.io/part-of`                                   | Pod label must exist                                |
  | `kube_app_managed_by`         | Low          | Pod label `app.kubernetes.io/managed-by`                                | Pod label must exist                                |
  | `env`                         | Low          | Pod label `tags.datadoghq.com/env` or container envvar `DD_ENV`         | [Unified service tagging][2] enabled                |
  | `version`                     | Low          | Pod label `tags.datadoghq.com/version` or container envvar `DD_VERSION` | [Unified service tagging][2] enabled                |
  | `service`                     | Low          | Pod label `tags.datadoghq.com/service` or container envvar `DD_SERVICE` | [Unified service tagging][2] enabled                |
  | `pod_phase`                   | Low          | Pod status                                                              | N/A                                                 |
  | `oshift_deployment_config`    | Low          | Pod annotation `openshift.io/deployment-config.name`                    | OpenShift environment and pod annotation must exist |
  | `kube_ownerref_kind`          | Low          | Pod ownerref                                                            | Pod must have an owner                              |
  | `kube_deployment`             | Low          | Pod ownerref                                                            | Pod must be attached to a deployment                |
  | `kube_replication_controller` | Low          | Pod ownerref                                                            | Pod must be attached to a replication controller    |
  | `kube_stateful_set`           | Low          | Pod ownerref                                                            | Pod must be attached to a statefulset               |
  | `persistentvolumeclaim`       | Low          | Pod spec                                                                | A PVC must be attached to the pod                   |
  | `kube_cronjob`                | Low          | Pod ownerref                                                            | Pod must be attached to a cronjob                   |
  | `image_name`                  | Low          | Pod spec                                                                | N/A                                                 |
  | `short_image`                 | Low          | Pod spec                                                                | N/A                                                 |
  | `image_tag`                   | Low          | Pod spec                                                                | N/A                                                 |
  | `eks_fargate_node`            | Low          | Pod spec                                                                | EKS Fargate environment                                       |

</div>


### 호스트 태그

에이전트는 "호스트 태그"로 쿠버네티스 환경 정보를 첨부할 수 있습니다.

<div style="overflow-x: auto;">

  | Tag                 | Cardinality | Source                                                 | Requirement                                                    |
  |---------------------|-------------|--------------------------------------------------------|----------------------------------------------------------------|
  | `kube_cluster_name` | Low         | `DD_CLUSTER_NAME` envvar or cloud provider integration | `DD_CLUSTER_NAME` envvar or cloud provider integration enabled |
  | `kube_node_role`    | Low         | Node label `node-role.kubernetes.io/<role>`            | Node label must exist                                          |

</div>

## 자동 탐지 태그

에이전트 v6.10 이상부터는 에이전트가 포드 어노테이션에서 태그를 자동 검색할 수 있습니다. 이를 통해 에이전트는 전체 포드 또는 포드 내의 개별 컨테이너에서 내보내는 모든 데이터에 태그를 연결할 수 있습니다.

컨테이너화된 환경의 모범 사례로서, Datadog은 태그를 통합하는 데 도움이 되는 통합 서비스 태깅을 사용할 것을 권장합니다. 통합 서비스 태깅은 세 가지 표준 태그: `env`, `service`, `version`을 사용하여 Datadog 텔레메트리를 하나로 묶습니다. 통합 태깅으로 환경 설정하는 방법을 알아보려면 전용 [통합 서비스 태깅][2] 도움말을 참조하세요.

특정 포드에서 내보내고 에이전트가 수집한 모든 데이터에 `<TAG_KEY>:<TAG_VALUE>` 태그를 적용하려면 포드에서 다음 어노테이션을 사용하세요:

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

포드 내의 개별 컨테이너 `<CONTAINER_IDENTIFIER>`에 `<TAG_KEY>:<TAG_VALUE>`를 적용하려면, 다음 어노테이션을 포드에서 사용하세요.

```yaml
annotations:
  ad.datadoghq.com/<CONTAINER_IDENTIFIER>.tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

에이전트 v7.17 이상부터 에이전트는 Docker 라벨에서 태그를 자동 검색할 수 있습니다. 이 프로세스를 통해 에이전트는 [에이전트 `datadog.yaml` 파일을 수정][3]하지 않고도 컨테이너에서 내보내는 모든 데이터에 커스텀 태그를 연결할 수 있습니다.

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY>:TAG_VALUE", "<TAG_KEY_1>:<TAG_VALUE_1>"]'
```

## 태그로서의 노드 라벨

에이전트 v6.0 이상부터는 에이전트가 특정 노드에 대한 라벨을 수집하여 노드의 모든 포드에서 내보내는 모든 메트릭에 첨부하는 태그로 사용할 수 있습니다:

{{< tabs >}}
{{% tab "컨테이너화 Agent" %}}

지정된 노드 라벨 `<NODE_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Datadog 에이전트에 다음 환경 변수를 추가하세요:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<NODE_LABEL>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

에이전트 v7.24.0 이상에서는 다음 환경 변수 설정을 사용하여 모든 노드 라벨을 메트릭에 태그로 추가합니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 고정됩니다:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```

**참고**: 커스텀 메트릭은 빌링에 영향을 미칠 수 있습니다. 자세한 내용은 [커스텀 메트릭 빌링 페이지][1]를 참조하세요.

[1]: /ko/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

지정된 노드 라벨 `<NODE_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면, [에이전트 `datadog.yaml` 설정 파일][1]에 다음 설정 블록을 추가합니다:

```yaml
kubernetes_node_labels_as_tags:
  <NODE_LABEL>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다:

```yaml
kubernetes_node_labels_as_tags:
  app: kube_app
```

[1]: /ko/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## 태그로서의 포드 라벨

에이전트 v6.0 이상부터 에이전트는 특정 포드에 대한 라벨을 수집하여 이 포드에서 내보내는 모든 메트릭에 첨부할 태그로 사용할 수 있습니다:

{{< tabs >}}
{{% tab "컨테이너화 Agent" %}}

Datadog 내에서 지정된 라벨 `<POD_LABEL>`을 추출하고 태그 키 `<TAG_KEY>`로 변환하려면, 다음 환경 변수를 Datadog 에이전트에 추가하세요:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<POD_LABEL>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

에이전트 v6.8.0 이상에서는 다음 환경 변수 설정을 사용하여 모든 포드 라벨을 메트릭에 태그로 추가합니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 고정됩니다:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```

**참고**: 커스텀 메트릭은 빌링에 영향을 미칠 수 있습니다. 자세한 내용은 [커스텀 메트릭 빌링 페이지][1]를 참조하세요.

[1]: /ko/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

지정된 포드 레이블 `<POD_LABEL>`을 추출하여 Datadog 내에서 `<TAG_KEY>` 태그 키로 변환하려면, [에이전트 `datadog.yaml` 설정 파일][1]에 다음 설정 블록을 추가합니다:

```yaml
kubernetes_pod_labels_as_tags:
  <POD_LABEL>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다:

```yaml
kubernetes_pod_labels_as_tags:
  app: kube_app
```

에이전트 v6.8.0 이상에서는 다음 환경 변수 설정을 사용하여 모든 포드 라벨을 메트릭에 태그로 추가합니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 고정됩니다:

```yaml
kubernetes_pod_labels_as_tags:
  *: <PREFIX>_%%label%%
```

**참고**: 커스텀 메트릭은 빌링에 영향을 미칠 수 있습니다. 자세한 내용은 [커스텀 메트릭 빌링 페이지][3]를 참조하세요.

[1]: /ko/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## 태그로서의 포드 어노테이션

에이전트 v6.0 이상부터 에이전트는 특정 포드에 대한 어노테이션을 수집하여 이 포드에서 내보내는 모든 메트릭에 첨부할 태그로 사용할 수 있습니다:

{{< tabs >}}
{{% tab "Containerized Agent" %}}

주어진 포드 라벨 `<POD_ANNOTATION>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면, Datadog 에이전트에 다음 환경 변수를 추가합니다:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<POD_ANNOTATION>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

에이전트 v7.24.0 이상에서는 다음 환경 변수 설정을 사용하여 모든 포드 어노테이션을 메트릭에 태그로 추가합니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 고정됩니다:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```

**참고**: 커스텀 메트릭은 빌링에 영향을 미칠 수 있습니다. 자세한 내용은 [커스텀 메트릭 빌링 페이지][1]를 참조하세요.

[1]: /ko/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

주어진 포드 어노테이션 `<POD_ANNOTATION>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면, [에이전트 `datadog.yaml` 설정 파일][1]에 다음 설정 블록을 추가합니다:

```yaml
kubernetes_pod_annotations_as_tags:
  <POD_ANNOTATION>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다:

```yaml
kubernetes_pod_annotations_as_tags:
  app: kube_app
```

[1]: /ko/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## 태그로서의 네임스페이스 라벨

에이전트 v7.27 이상부터 에이전트는 지정된 네임스페이스에 대한 라벨을 수집하여 이 네임스페이스의 모든 포드에서 내보내는 모든 메트릭에 첨부할 태그로 사용할 수 있습니다:

{{< tabs >}}
{{% tab "컨테이너화 Agent" %}}

지정된 네임스페이스 라벨 `<NAMESPACE_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면 Datadog 에이전트에 다음 환경 변수를 추가합니다:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<NAMESPACE_LABEL>": "<TAG_KEY>"}'
```

예를 들어 다음을 설정할 수 있습니다:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

다음 환경 변수 설정을 사용하여 모든 네임스페이스 라벨을 메트릭에 태그로 추가합니다. 이 예제에서는 태그 이름 앞에 `<PREFIX>_`가 고정됩니다:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```

**참고**: 커스텀 메트릭은 빌링에 영향을 미칠 수 있습니다. 자세한 내용은 [커스텀 메트릭 빌링 페이지][1]를 참조하세요.

[1]: /ko/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

지정된 네임스페이스 라벨 `<NAMESPACE_LABEL>`을 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면, [에이전트 `datadog.yaml` 설정 파일][1]에 다음 설정 블록을 추가합니다:

```yaml
kubernetes_namespace_labels_as_tags:
  <NAMESPACE_LABEL>: <TAG_KEY>
```

예를 들어 다음을 설정할 수 있습니다:

```yaml
kubernetes_namespace_labels_as_tags:
  app: kube_app
```

[1]: /ko/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## 태그로서의 컨테이너 환경 변수 

에이전트 v7.32 이상부터 에이전트는 컨테이너 환경 변수를 수집해 컨테이너에 해당하는 모든 메트릭에 태그로 첨부할 수 있습니다. `docker` 컨테이너와 `containerd` 컨테이너 모두 지원됩니다:

{{< tabs >}}
{{% tab "컨테이너화 Agent" %}}

주어진 환경 변수 `<ENV_VAR>`를 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면, 다음 환경 변수를 Datadog 에이전트에 추가하세요:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENV_VAR>": "<TAG_KEY>"}'
```

예를 들어:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"app":"kube_app"}'
```

**참고**: 커스텀 메트릭은 빌링에 영향을 미칠 수 있습니다. 자세한 내용은 [커스텀 메트릭 빌링][1]을 참조하세요.

[1]: /ko/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

주어진 환경 변수 `<ENV_VAR>`를 추출하여 Datadog 내에서 태그 키 `<TAG_KEY>`로 변환하려면, [에이전트`datadog.yaml` 설정 파일][1]에 다음 설정 블록을 추가하세요:

```yaml
container_env_as_tags:
  <ENV_VAR>: <TAG_KEY>
```

예를 들어:

```yaml
container_env_as_tags:
  app: kube_app
```

[1]: /ko/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## 태그로서의 컨테이너 라벨

에이전트 v7.33 이상부터 에이전트가 컨테이너 라벨을 수집하여 태그로 사용할 수 있습니다. 에이전트는 컨테이너와 관련된 모든 메트릭에 태그를 첨부합니다.
에이전트는 `docker`와 `containerd` 컨테이너 모두에 대해 컨테이너 라벨에서 태그를 생성할 수 있습니다. `containerd`의 경우 이전 버전에서는 라벨이 올바르게 전파되지 않으므로 지원되는 최소 버전은 v1.5.6입니다.

{{< tabs >}}
{{% tab "컨테이너화 Agent" %}}

지정된 컨테이너 라벨 `<CONTAINER_LABEL>`을 추출하여 태그 키 `<TAG_KEY>`로 변환하려면 , Datadog 에이전트에 다음 환경 변수를 추가합니다:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<CONTAINER_LABEL>":"<TAG_KEY>"}'
```

예를 들어:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"app":"kube_app"}'
```

**참고**: 커스텀 메트릭은 빌링에 영향을 미칠 수 있습니다. 자세한 내용은 [커스텀 메트릭 빌링][1]을 참조하세요.

[1]: /ko/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

지정된 컨테이너 라벨 `<CONTAINER_LABEL>`을 추출하여 태그 키 `<TAG_KEY>`로 변환하려면, [에이전트 `datadog.yaml` 설정 파일][1]에 다음 설정 블록을 추가합니다:

```yaml
container_labels_as_tags:
  <CONTAINER_LABEL>: <TAG_KEY>
```

예를 들어:

```yaml
container_labels_as_tags:
  app: kube_app
```

[1]: /ko/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: /ko/agent/kubernetes/tag/?tab=agent#extract-labels-as-tags