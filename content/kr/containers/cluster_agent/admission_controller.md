---
aliases:
- /kr/agent/cluster_agent/admission_controller
further_reading:
- link: /agent/cluster_agent/troubleshooting/
  tag: 설명서
  text: Datadog 클러스터 에이전트 트러블슈팅
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: 블로그
  text: 라이브러리 주입을 사용해 Datadog APM으로 쿠버네티스(Kubernetes) 애플리케이션에 대한 자동 계측 추적
kind: 설명서
title: Datadog 어드미션 컨트롤러
---

## 개요
Datadog 어드미션 컨트롤러는 Datadog 클러스터 에이전트의 구성 요소입니다. 어드미션 컨트롤러의 주요 이점은 애플리케이션 포드 설정을 간소화하는 것입니다. 이를 위한 두 가지 주요 기능이 있습니다:

- 환경 변수(`DD_AGENT_HOST`, `DD_TRACE_AGENT_URL` 및 `DD_ENTITY_ID`)를 삽입하여 사용자의 애플리케이션 컨테이너에 DogStatsD 및 APM 추적기 라이브러리를 설정합니다.
- 애플리케이션 레이블의 Datadog 표준 태그(`env`, `service`, `version`)를 컨테이너 환경 변수에 삽입합니다.

Datadog의 어드미션 컨트롤러는 `MutatingAdmissionWebhook` 유형입니다. 어드미션 컨트롤러에 대한 자세한 내용은 [어드미션 컨트롤러에 대한 쿠버네티스(Kubernetes) 설명서][1]를 참조하세요.

## 요구 사항

- Datadog 클러스터 에이전트 v7.39+

## 설정
{{< tabs >}}
{{% tab "Operator" %}}

Datadog 오퍼레이터를 위해 어드미션 컨트롤러를 활성화하려면 사용자 지정 리소스에서 매개 변수`clusterAgent.config.admissionController.enabled`를 `true`로 설정합니다:

{{< code-block lang="yaml" disable_copy="false" >}}
[...]
 clusterAgent:
[...]
    config:
      admissionController:
        enabled: true
        mutateUnlabelled: false
[...]
{{< /code-block >}}
{{% /tab %}}
{{% tab "Helm" %}}
Helm 차트 v2.35.0부터는 Datadog 어드미션 컨트롤러가 기본적으로 활성화되어 있습니다. 따라서, 어드미션 컨트롤러를 활성화하기 위한 추가 설정이 필요하지 않습니다.

Helm 차트 v2.34.6 또는 이전 버전에서에서 어드미션 컨트롤러를 활성화하려면 매개변수 `clusterAgent.admissionController.enabled`를 `true` 로 설정하세요:

{{< code-block lang="yaml" filename="values.yaml" disable_copy="false" >}}
[...]
 clusterAgent:
[...]
  ## @param admissionController - object - required
  ## 어드미션 컨트롤러가 APM을 자동으로 주입하도록 활성화하고
  ## DogStatsD 설정 및 표준 태그(환경, 서비스, 버전)를
## 포드에 추가합니다.
  #
  admissionController:
    enabled: true

    ## @param mutateUnlabelled - boolean - optional
    ## Enable injecting config without having the pod label:
    ## admission.datadoghq.com/enabled="true"
    #
    mutateUnlabelled: false
[...]
{{< /code-block >}}
{{% /tab %}}
{{% tab "DaemonSet" %}}

Helm이나 Datadog 오퍼레이터를 사용하지 않고 어드미션 컨트롤러를 활성화하려면 설정에 다음을 추가합니다:

먼저, [클러스터 에이전트 RBAC 권한][1] 매니페스트를 다운로드하고 `rules` 아래에 다음을 추가합니다:

{{< code-block lang="yaml" filename="cluster-agent-rbac.yaml" disable_copy="true" >}}
- apiGroups:
  - admissionregistration.k8s.io
  리소스:
  - mutatingwebhookconfigurations
  동사: ["get", "list", "watch", "update", "create"]
- apiGroups: [""]
  리소스: ["secrets"]
  동사: ["get", "list", "watch", "update", "create"]
- apiGroups: ["batch"]
  리소스: ["jobs", "cronjobs"]
  동사: ["get"]
- apiGroups: ["apps"]
  리소스: ["statefulsets", "replicasets", "deployments"]
  동사: ["get"]
{{< /code-block >}}

`agent-services.yaml` 아래에 다음을 추가합니다:

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
  - 포트: 443
    목표 포트: 8000

{{< /code-block >}}

어드미션 컨트롤러를 활성화하는 클러스터 에이전트 배포에 환경 변수를 추가합니다:

{{< code-block lang="yaml" filename="cluster-agent-deployment.yaml" disable_copy="true" >}}
- 이름: DD_ADMISSION_CONTROLLER_ENABLED
  값: "true"
- 이름: DD_ADMISSION_CONTROLLER_SERVICE_NAME
  값: "datadog-cluster-agent-admission-controller"

# APM 추적기를 자동으로 설정하려면 이 설정을 취소합니다(아래 참조)
# - 이름: DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED
# 값: "true"
{{< /code-block >}}

마지막으로 다음 명령을 실행합니다:

- `kubectl apply -f cluster-agent-rbac.yaml`
- `kubectl apply -f agent-services.yaml`
- `kubectl apply -f cluster-agent-deployment.yaml`

[1]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
{{% /tab %}}
{{< /tabs >}}

### 계측 라이브러리 주입
클러스터 에이전트(버전 7.39 이상)를 설정해 계측 라이브러리를 주입할 수 있습니다. 자세한 내용은 [어드미션 컨트롤러를 사용하여 계측 라이브러리 주입][2]을 참조하세요.


### APM과 DogStatsD

DogStatsD 클라이언트 또는 라이브러리 주입을 지원하지 않는 다른 APM 라이브러리를 설정하려면 다음을 실행해`DD_AGENT_HOST` 와 `DD_ENTITY_ID` 환경 변수를 주입하세요:
- 포드에 `admission.datadoghq.com/enabled: "true"` 레이블을 추가합니다.
- `mutateUnlabelled`, 또는 설정 방법에 따라 `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`를 `true` 로 설정하여 클러스터 에이전트 어드미션 컨트롤러를 설정합니다.

Helm 차트에 `mutateUnlabelled: true` 에이전트 설정을 추가하면 클러스터 에이전트가 레이블이 지정되지 않은 모든 포드를 가로채려고 시도합니다.

포드가 환경 변수를 수신하지 못하도록 하려면 `admission.datadoghq.com/enabled: "false"` 레이블을 추가합니다. 이는  `mutateUnlabelled: true`를 설정해도 작동합니다.

`mutateUnlabelled`가 `false`인 경우 포드 레이블을 `admission.datadoghq.com/enabled: "true"`로 설정해야 합니다.

가능한 옵션:

| mutateUnlabelled | 포드 레이블                               | 주입 |
|------------------|-----------------------------------------|-----------|
| `true`           | 레이블 없음                                | 예       |
| `true`           | `admission.datadoghq.com/enabled=true`  | 예       |
| `true`           | `admission.datadoghq.com/enabled=false` | 아니요        |
| `false`          | 레이블 없음                                | 아니요        |
| `false`          | `admission.datadoghq.com/enabled=true`  | 예       |
| `false`          | `admission.datadoghq.com/enabled=false` | 아니요        |


#### 우선순위 순서
Datadog 어드미션 컨트롤러는 환경 변수 `DD_VERSION`, `DD_ENV`, `DD_SERVICE` 가 이미 존재할 경우 주입하지 않습니다.

이러한 환경 변수가 설정되지 않은 경우 어드미션 컨트롤러는 다음 순서(내림차순)로 표준 태그 값을 사용합니다:

- 포드의 레이블
- `ownerReference`의 레이블 ( (ReplicaSets, DaemonSets, Deployments 등)

#### APM 및 DogstatsD 통신 모드 설정
Datadog 클러스터 에이전트 v1.20.0부터는 애플리케이션과 Datadog 에이전트 간에 다양한 통신 모드를 주입하도록 어드미션 컨트롤러를 설정할 수 있습니다.

이 기능은 `admission_controller.inject_config.mode`를 설정하거나 `admission.datadoghq.com/config.mode` 포드 레이블을 사용해 포드별 모드를 정의하여 설정할 수 있습니다.

가능한 옵션:
| 모드              | 설명                                                                                                    |
|--------------------|-------------------------------------------------------------------------------------------------------------------|
| `hostip` (기본값) | `DD_AGENT_HOST` 환경 변수에 호스트 IP를 삽입합니다.
|
| `service`          | `DD_AGENT_HOST` 환경 변수에 Datadog의 로컬 서비스 DNS 이름을 삽입합니다.(쿠버네티스 v1.22+에서 사용 가능)|
| `socket`           | `DD_TRACE_AGENT_URL` 환경 변수 및 볼륨 정의에서 Unix Domain Socket 경로를 삽입하여 해당 경로에 액세스합니다. |

**참고**: 포드별 모드는 어드미션 컨트롤러 레벨에서 정의된 글로벌 모드보다 우선합니다.

#### 참고

- 새 어플리케이션 포드를 만들기 전에 어드미션 컨트롤러를 배포하고 설정해야 합니다. 이미 존재하는 포드는 업데이트할 수 없습니다.
- 어드미션 컨트롤러 주입 기능을 비활성화하려면 다음 클러스터 에이전트 설정을 사용합니다: `DD_ADMISSION_CONTROLLER_INJECT_CONFIG_ENABLED=false`
- Datadog 어드미션 컨트롤러를 사용하면 아래 API를 사용하여 애플리케이션 포드 설정을 건너뛸 수 있습니다([쿠버네티스 트레이스 Collection 설정의 2단계][3]).
- 프라이빗 클러스터에서는 [컨트롤 플레인에 대한 방화벽 규칙을 추가][4]해야 합니다. 들어오는 연결을 처리하는 웹후크는 `443`포트에서 요청을 수신하여 `8000`포트에 구현된 서비스로 리디렉션합니다. 기본적으로 클러스터의 네트워크에는 `gke-<CLUSTER_NAME>-master` 와 같은 이름의 방화벽 규칙이 있어야 합니다. 규칙의 "소스 필터"는 클러스터의 "컨트롤 플레인 주소 범위"와 일치합니다. 이 방화벽 규칙을 편집하여 TCP 포트 `8000`에 대한 침입을 허용합니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: /kr/tracing/trace_collection/library_injection/
[3]: https://docs.datadoghq.com/kr/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules