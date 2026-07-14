---
aliases:
- /ko/agent/cluster_agent/admission_controller
description: Datadog Admission Controller를 사용하여 Kubernetes 포드에 환경 변수와 표준 태그를 자동으로
  주입합니다.
further_reading:
- link: /agent/cluster_agent/troubleshooting/
  tag: 설명서
  text: Datadog Cluster Agent 문제 해결
- link: /containers/troubleshooting/admission-controller
  tag: 설명서
  text: Admission Controller 문제 해결
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: 블로그
  text: Datadog APM을 사용하여 라이브러리 주입으로 Kubernetes 애플리케이션의 트레이싱을 자동 계측
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: 블로그
  text: Datadog의 CSI 드라이버를 사용하여 보안이 강화된 Kubernetes 환경에서 고성능 관측성 구현
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: 아키텍처 센터
  text: Datadog Operator 및 Admission Controller를 사용하여 애플리케이션 계측하기
- link: /containers/guide/cluster_agent_disable_admission_controller
  tag: 설명서
  text: Cluster Agent를 사용하여 Datadog Admission Controller 비활성화
title: Datadog Admission Controller
---
## 개요 {#overview}
Datadog Admission Controller는 Datadog Cluster Agent의 구성 요소입니다. Admission Controller의 주요 장점은 애플리케이션 포드 구성을 단순화하는 것입니다. 이를 위해 두 가지 핵심 기능을 제공합니다.

- 환경 변수(`DD_AGENT_HOST`, `DD_TRACE_AGENT_URL`, `DD_ENTITY_ID` 및 `DD_EXTERNAL_ENV`)를 주입하여 사용자의 애플리케이션 컨테이너에 DogStatsD 및 Datadog SDK를 구성합니다.
- 애플리케이션 레이블에 지정된 Datadog 표준 태그(`env`, `service`, `version`)를 컨테이너 환경 변수로 주입합니다.

Datadog의 Admission Controller는 `MutatingAdmissionWebhook` 유형입니다. Admission Controller에 대한 자세한 내용은 [Admission Controller에 대한 Kubernetes 가이드][1]를 참조하세요.

## 요구 사항 {#requirements}

- Datadog Cluster Agent v7.40 이상

## 구성 {#configuration}
{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator는 기본적으로 Datadog Admission Controller를 활성화합니다. Admission Controller를 활성화하기 위해 추가 구성이 필요하지 않습니다.


Admission Controller를 비활성화한 경우 `DatadogAgent` 구성에서 매개변수 `features.admissionController.enabled`를 `true`로 설정해 다시 활성화할 수 있습니다.

{{< code-block lang="yaml" filename="datadog-agent.yaml" disable_copy="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    admissionController:
      enabled: true
      mutateUnlabelled: false
{{< /code-block >}}
{{% /tab %}}
{{% tab "Helm" %}}
Helm 차트 v2.35.0부터 Datadog Admission Controller가 기본적으로 활성화됩니다. Admission Controller를 활성화하기 위해 추가 구성이 필요하지 않습니다.

Helm 차트 v2.34.6 및 이전 버전에서 Admission Controller를 활성화하려면 매개변수 `clusterAgent.admissionController.enabled`를 `true`로 설정하세요.

{{< code-block lang="yaml" filename="datadog-values.yaml" disable_copy="false" >}}
#(...)
clusterAgent:
  #(...)
  ## @param admissionController - object - required
  ## Enable the admissionController to automatically inject APM and
  ## DogStatsD config and standard tags (env, service, version) into
  ## your pods
  #
  admissionController:
    enabled: true

    ## @param mutateUnlabelled - boolean - optional
    ## Enable injecting config without having the pod label:
    ## admission.datadoghq.com/enabled="true"
    #
    mutateUnlabelled: false
{{< /code-block >}}
{{% /tab %}}
{{% tab "DaemonSet" %}}

Helm이나 Datadog Operator를 사용하지 않고 Admission Controller를 활성화하려면 구성에 다음을 추가하세요.

먼저 [Cluster Agent RBAC Permissions][1] 매니페스트를 다운로드한 후 `rules` 아래에 다음 내용을 추가합니다.

{{< code-block lang="yaml" filename="cluster-agent-rbac.yaml" disable_copy="true" >}}
- apiGroups:
  - admissionregistration.k8s.io
  resources:
  - mutatingwebhookconfigurations
  verbs: ["get", "list", "watch", "update", "create"]
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list", "watch", "update", "create"]
- apiGroups: ["batch"]
  resources: ["jobs", "cronjobs"]
  verbs: ["get"]
- apiGroups: ["apps"]
  resources: ["statefulsets", "replicasets", "deployments"]
  verbs: ["get"]
{{< /code-block >}}

`agent-services.yaml`의 하단에 다음 내용을 추가합니다.

{{< code-block lang="yaml" filename="agent-services.yaml" disable_copy="true" >}}

apiVersion: v1
kind: Service
metadata:
  name: datadog-cluster-agent-admission-controller
  labels:
    app: "datadog"
    app.kubernetes.io/name: "datadog"
spec:
  selector:
    app: datadog-cluster-agent
  ports:
  - port: 443
    targetPort: 8000

{{< /code-block >}}

Admission Controller를 활성화하는 Cluster Agent 배포에 환경 변수를 추가합니다.

{{< code-block lang="yaml" filename="cluster-agent-deployment.yaml" disable_copy="true" >}}
- name: DD_ADMISSION_CONTROLLER_ENABLED
  value: "true"
- name: DD_ADMISSION_CONTROLLER_SERVICE_NAME
  value: "datadog-cluster-agent-admission-controller"

# Uncomment this to configure Datadog SDKs automatically (see below)
# - name: DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED
#   value: "true"
{{< /code-block >}}

마지막으로 다음 명령을 실행합니다.

- `kubectl apply -f cluster-agent-rbac.yaml`
- `kubectl apply -f agent-services.yaml`
- `kubectl apply -f cluster-agent-deployment.yaml`

[1]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
{{% /tab %}}
{{< /tabs >}}

### APM 계측 라이브러리 주입 {#apm-instrumentation-library-injection}
Cluster Agent(버전 7.39 이상)를 구성하여 단일 단계 계측을 사용한 계측 라이브러리 자동 주입을 사용할 수 있습니다. 자세한 내용은 [단일 단계 APM 계측][2] 설명서를 참조하세요.

단일 단계 계측을 사용하지 않으려면, Datadog Admission Controller를 사용하여 포드 수준에서 Datadog SDK를 직접 주입할 수 있습니다. 자세한 내용은 [로컬 SDK 주입][7]을 참조하세요.

### APM 및 DogStatsD 환경 변수 주입 {#apm-and-dogstatsd-environment-variable-injection}

라이브러리 주입을 지원하지 않는 DogStatsD 클라이언트 또는 기타 APM 라이브러리를 구성하려면 `DD_AGENT_HOST` 및 `DD_ENTITY_ID` 환경 변수를 다음 방법 중 하나로 주입합니다.
- 포드에 `admission.datadoghq.com/enabled: "true"` 레이블을 추가합니다.
- Cluster Agent Admission Controller를 구성하여 `mutateUnlabelled`(또는 구성 방식에 따라 `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`)을 `true`로 설정합니다.

Helm 차트에 `mutateUnlabelled: true` Agent 구성을 추가하면 Cluster Agent는 레이블이 없는 모든 포드를 가로채려고 시도합니다.

포드가 환경 변수를 받지 않도록 하려면 `admission.datadoghq.com/enabled: "false"` 레이블을 추가하세요. 이 설정은 `mutateUnlabelled: true`를 사용하더라도 적용됩니다.

`mutateUnlabelled`가 `false`로 설정된 경우에는 포드 레이블을 `admission.datadoghq.com/enabled: "true"`로 설정해야 합니다.

가능한 옵션:

| mutateUnlabelled | 포드 레이블                               | 주입 여부 |
| ---------------- | --------------------------------------- | --------- |
| `true`           | 레이블 없음                                | 예       |
| `true`           | `admission.datadoghq.com/enabled=true`  | 예       |
| `true`           | `admission.datadoghq.com/enabled=false` | 아니요        |
| `false`          | 레이블 없음                                | 아니요        |
| `false`          | `admission.datadoghq.com/enabled=true`  | 예       |
| `false`          | `admission.datadoghq.com/enabled=false` | 아니요        |


#### 우선순위 순서 {#order-of-priority}
Datadog Admission Controller는 `DD_VERSION`, `DD_ENV`, `DD_SERVICE` 환경 변수가 이미 존재하는 경우 이를 주입하지 않습니다.

해당 환경 변수가 설정되어 있지 않은 경우 Admission Controller는 다음 순서(상위 우선순위부터)로 표준 태그 값을 사용합니다.

- 포드의 레이블
- `ownerReference`(ReplicaSet, DaemonSet, Deployment 등)의 레이블

#### APM 및 DogStatsD 통신 방식 구성{#configure-apm-and-dogstatsd-communication-mode}
Datadog Cluster Agent v1.20.0부터 Admission Controller는 애플리케이션과 Datadog Agent 간의 다양한 통신 방식을 주입하도록 구성할 수 있습니다.

이 기능은 `admission_controller.inject_config.mode`을 설정하거나 `admission.datadoghq.com/config.mode` 포드 레이블을 사용하여 포드별 통신 모드를 지정함으로써 구성할 수 있습니다.

Helm Chart v3.22.0 및 Datadog Operator v1.1.0부터는 APM 소켓 또는 DSD 소켓이 활성화되어 있으면 통신 모드가 자동으로 `socket`으로 설정됩니다.

가능한 옵션:
| 모드               | 설명                                                                                                                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hostip`(기본값) | `DD_AGENT_HOST` 환경 변수에 호스트 IP를 주입합니다.                                                                                                                                                                          |
| `service`          | Kubernetes v1.22 이상에서 Datadog 로컬 서비스 DNS 이름을 `DD_AGENT_HOST` 환경 변수에 주입합니다.                                                                                                                  |
| `socket`           | `DD_TRACE_AGENT_URL` 환경 변수에 Unix Domain Socket 경로를 주입하고 해당 경로에 접근하기 위한 볼륨 정의를 추가합니다. DogStatsD 메트릭 전송용 Datadog Agent 연결 URL을 `DD_DOGSTATSD_URL`에 주입합니다. |
| `csi`              | `DD_TRACE_AGENT_URL` 및 `DD_DOGSTATSD_URL` 환경 변수에 Unix Domain Socket 경로를 주입하고 해당 경로에 접근하기 위한 Datadog CSI 볼륨 정의를 추가합니다. 이 모드는 Datadog Cluster Agent v7.67 이상에서 사용할 수 있습니다.                                                    |

**참고**: 포드별로 지정된 모드는 Admission Controller 수준에서 정의된 전역 모드보다 우선 적용됩니다.

## 문제 해결 {#troubleshooting}

자세한 내용은 [Admission Controller Troubleshooting][6] 설명서를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: https://docs.datadoghq.com/ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[6]: /ko/containers/troubleshooting/admission-controller
[7]: https://docs.datadoghq.com/ko/tracing/guide/local_sdk_injection/