---
description: 포드 주석 대신 DatadogInstrumentation 사용자 지정 리소스를 통해 Kubernetes 워크로드에 대한 Autodiscovery
  검사 및 로그를 구성하세요.
further_reading:
- link: /containers/kubernetes/integrations/
  tag: 설명서
  text: Autodiscovery로 통합 구성
- link: /getting_started/containers/autodiscovery/
  tag: 설명서
  text: Autodiscovery 시작하기
- link: /containers/guide/autodiscovery-examples/
  tag: 설명서
  text: Autodiscovery 시나리오 및 예시
- link: /containers/cluster_agent/
  tag: 설명서
  text: Datadog Cluster Agent
title: DatadogInstrumentation CRD로 Autodiscovery 구성
---
## 개요 {#overview}

`DatadogInstrumentation` 사용자 지정 리소스(CR)를 사용하면 [포드 주석][2] 대신 단일 Kubernetes 리소스로 [Autodiscovery][1] 검사 및 로그를 구성할 수 있습니다. 이 접근 방식을 통해 Agent 또는 애플리케이션을 편집하고 롤아웃을 트리거하지 않고도 통합 구성을 활성화, 업데이트 및 제거할 수 있습니다.

다음과 같은 작업을 수행하고 싶은 경우 `DatadogInstrumentation` CR을 사용하세요.

- 워크로드 매니페스트를 수정하거나 주석을 추가하지 않고 검사 및 로그를 구성합니다.
- 주석의 원시 JSON 대신 검증이 포함된 구조화된 리소스 사양을 사용합니다.
- 워크로드별 Autodiscovery 구성을 전용 버전 관리 Kubernetes 리소스로 중앙에서 관리합니다.
- 애플리케이션 포드를 재시작하지 않고 Autodiscovery 구성을 업데이트하거나 제거합니다.

`DatadogInstrumentation` 리소스를 생성하거나 업데이트하면 [Datadog Cluster Agent][3]가 대상을 검증하고 리소스 상태를 보고하며 대상 워크로드에 Autodiscovery 구성을 적용합니다.

## 요구 사항 {#requirements}

Datadog Agent 및 Cluster Agent를 **v7.82 이상**으로 업그레이드하고 다음 중 하나를 사용하여 `DatadogInstrumentation` CRD를 설치합니다.
- Datadog Operator **v1.29** 이상
- Datadog Helm Chart **v3.236.0** 이상

## 설정 {#setup}

`DatadogInstrumentation` 컨트롤러는 Cluster Agent에서 실행되며 기본적으로 비활성화되어 있습니다. Datadog Operator 또는 Helm에서 활성화하세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Helm 리포지토리를 업데이트합니다.

```shell
helm repo update
```

2. Datadog Operator를 업그레이드합니다.

```shell
helm upgrade datadog-operator datadog/datadog-operator
```

3. `DatadogAgent` 리소스에 `agent.datadoghq.com/instrumentation-crd-enabled` 주석을 추가합니다. Cluster Agent는 v7.82.0 이상이어야 합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/instrumentation-crd-enabled: "true"
spec:
  global:
    [...]
```

4. 변경 사항을 적용합니다.

```shell
kubectl apply -f datadog-agent.yaml
```

Operator는 필요한 Cluster Agent 및 Node Agent 환경 변수를 설정하고, Cluster Agent에 필요한 RBAC를 자동으로 구성합니다.

{{% /tab %}}
{{% tab "Helm" %}}

1. Helm 리포지토리를 업데이트합니다.

```shell
helm repo update
```

2. `datadog-values.yaml` 파일에서 컨트롤러를 활성화합니다.

```yaml
datadog:
  instrumentationCrd:
    enabled: true
```

3. 릴리스를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

리소스를 생성하기 전에 `DatadogInstrumentation` CRD가 설치되어 있는지 확인하세요.

```shell
kubectl get crd datadoginstrumentations.datadoghq.com
```

Datadog CRD를 별도로 관리하는 경우 Datadog CRD Helm Chart를 설치하거나 업그레이드하세요.

```shell
helm upgrade --install datadog-crds datadog/datadog-crds
```

## 대상 워크로드 지정 {#target-workloads}

Autodiscovery용 `DatadogInstrumentation`(DDI)은 다음과 같은 세 부분으로 구성됩니다.

- `spec.targetRef`구성할 워크로드를 : `apiVersion`, `kind`, `name`으로 식별합니다. 사용자 지정 리소스와 대상 워크로드는 동일한 네임스페이스에 있어야 합니다.
- `spec.config.checks`: 워크로드에 대해 실행할 통합 검사를 정의합니다.
- `spec.config.logs`: 워크로드에서 수집할 로그를 정의합니다.

다음과 같은 Kubernetes 리소스를 대상으로 지정할 수 있습니다.

| 대상 | 그룹/버전/리소스 | 최소 Agent 버전 | 참고 사항 |
|---|---|---|---|
| Deployment | `apps/v1/deployments` | 7.82.0 | |
| DaemonSet | `apps/v1/daemonsets` | 7.82.0 | |
| StatefulSet | `apps/v1/statefulsets` | 7.82.0 | |
| CronJob | `batch/v1/cronjobs` | 7.82.0 | |
| Job | `batch/v1/jobs` | 7.82.0 | |
| Service | `core/v1/services` | 7.82.0 | 검사만 지원합니다. [대상 서비스 지정](#target-services)을 참조하세요. |
| Rollout | `argoproj.io/v1alpha1/rollouts` | 7.83.0 | [Argo Rollouts][7]가 필요합니다. |

이 예시에서는 이 [주석 기반 예시][2]를 미러링하여 `StatefulSet`라는 이름의 `redis`에 대한 [Redis 통합][4]을 구성합니다.

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <YOUR_CR_NAME>
  namespace: <YOUR_TARGETS_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: StatefulSet
    name: redis
  config:
    checks:
      - integration: redisdb
        containerName: redis
        initConfig: {}
        instances:
          - host: "%%host%%"
            port: "6379"
            password: "%%env_REDIS_PASSWORD%%"
    logs:
      - containerName: redis
        tags:
          - env:demo
```

리소스를 적용합니다.

```shell
kubectl apply -f redis-instrumentation.yaml
```

리소스 상태를 검사합니다.

```shell
kubectl describe datadoginstrumentation <YOUR_CR_NAME> -n <YOUR_TARGETS_NAMESPACE>
```

`checks`의 각 항목은 다음 필드를 허용합니다.

`integration`
: 필수입니다. 실행할 Datadog 통합의 이름입니다. 예: `redisdb`

`containerName`
: 워크로드 대상에 필수입니다. 값은 포드 내의 컨테이너 이름과 일치해야 합니다. Service 대상의 경우 이 필드를 생략하세요.

`initConfig`
: 선택 사항입니다. 통합을 위한 `init_config` 섹션입니다.

`instances`
: 선택 사항입니다. 인스턴스 설정을 검사합니다. 각 인스턴스는 `%%host%%`를 포함하여 [Autodiscovery 템플릿 변수][5]를 사용할 수 있습니다.

`logs`의 각 항목은 `tags`, `type`, `path` 등과 같이 Autodiscovery 로그 주석과 동일한 로그 수집 옵션을 허용합니다. 각 항목에는 포드 내의 컨테이너와 일치하는 `containerName`이 필요합니다.

### 대상 서비스 지정 {#target-services}

대상 `Service`를 지정하면 Kubernetes 서비스의 주석과 유사한 [엔드포인트 검사][6]가 구성됩니다.

- Datadog은 Service의 각 엔드포인트에 대해 하나의 엔드포인트 검사를 예약합니다.
- `%%host%%` 는 엔드포인트 IP로 확인됩니다.
- 엔드포인트가 Kubernetes 포드에 의해 지원되는 경우, Datadog은 해당 포드에 대해 수집된 포드 태그를 추가합니다.
- 엔드포인트가 포드에 의해 지원되지 않는 경우, Datadog은 해당 검사를 포드별 태그가 없는 일반 클러스터 검사로 변환합니다.

<div class="alert alert-info">

서비스 대상은 `containerName`을 사용하지 않습니다. 해당 필드를 생략하세요.

</div>

아래는 Kubernetes `Service`에 대해 nginx 검사를 구성하는 예시입니다.

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <YOUR_CR_NAME>
  namespace: <YOUR_SERVICES_NAMESPACE>
spec:
  targetRef:
    apiVersion: v1
    kind: Service
    name: nginx
  config:
    checks:
      - integration: nginx
        initConfig: {}
        instances:
          - name: "My NGINX Service Endpoints"
            nginx_status_url: "http://%%host%%:%%port%%/status/"
```

## 우선 순위 {#precedence}

워크로드에 둘 이상의 구성 소스가 적용되는 경우, Datadog Agent는 다음 순서로 이를 확인합니다(우선 순위가 높은 순서).

1. 포드 주석
2. `DatadogInstrumentation` 사용자 지정 리소스
3. 자동 구성 또는 마운팅된 파일과 같은 정적 구성

워크로드에 이미 검사 또는 로그 수집을 위한 주석 기반 Autodiscovery 구성이 있는 경우, `DatadogInstrumentation` 구성은 이를 재정의하지 않습니다.

## 대상당 하나의 리소스 {#one-resource-per-target}

워크로드 또는 Service는 네임스페이스 내에서 단일 `DatadogInstrumentation` 리소스의 대상만 될 수 있습니다. 검증 웹훅은 `targetRef`가 이미 다른 리소스에 속해 있거나 해당 `targetRef`가 지원되지 않는 종류를 가리키는 리소스를 거부합니다.

## 예약된 검사 확인 {#verify-scheduled-checks}

리소스 상태는 Cluster Agent가 구성을 수락했는지 여부를 보여줍니다. 검사가 예약되었는지 확인하려면 대상 워크로드가 실행되는 Node Agent에서 `agent configcheck`를 실행하세요.

`DatadogInstrumentation` 리소스를 통해 구성된 검사는 구성 공급자로 `instrumentation-checks`를, 구성 소스로 `datadoginstrumentation:<NAMESPACE>/<CR_NAME>`을 나열합니다. 다음 예시에서는 Redis 워크로드를 대상으로 하는 리소스에서 예약된 `redisdb` 검사에 대한 출력을 보여줍니다.

```text
> agent configcheck
# other configs...

=== redisdb check ===
Configuration provider: instrumentation-checks
Configuration source: datadoginstrumentation:cache/redis-instrumentation
Config for instance ID: redisdb:d5dd267b580bc10e
host: 10.244.0.7
password: "********"
port: 6379
Init Config:
{}
Log Config:
- tags:
  - env:demo
Auto-discovery IDs:
* redis
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/containers/autodiscovery/
[2]: /ko/containers/kubernetes/integrations/
[3]: /ko/containers/cluster_agent/
[4]: /ko/integrations/redisdb/
[5]: /ko/containers/guide/template_variables/
[6]: /ko/containers/cluster_agent/endpointschecks/
[7]: https://argoproj.github.io/rollouts/