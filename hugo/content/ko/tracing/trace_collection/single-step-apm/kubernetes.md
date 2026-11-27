---
aliases:
- /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes
code_lang: kubernetes
code_lang_weight: 20
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: 설명서
  text: 런타임 메트릭 활성화
- link: /tracing/guide/init_resource_calc/
  tag: 설명서
  text: init 컨테이너 리소스 사용량에 관해 알아보기
- link: /tracing/guide/local_sdk_injection
  tag: 설명서
  text: 로컬 SDK 인젝션을 사용한 애플리케이션 계측
- link: https://learn.datadoghq.com/courses/configuring-ssi-k8s
  tag: 학습 센터
  text: Kubernetes에서 Single Step Instrumentation 구성
title: Kubernetes에서 Single Step APM Instrumentation 사용
type: multi-code-lang
---
## 개요 {#overview}

APM에 Single Step Instrumentation(SSI)을 사용하여 Datadog Agent를 설치하고 Datadog SDK를 사용해 Kubernetes 애플리케이션을 [계측][3]하세요.

{{< skill-callout
    title="에이전트로 APM 설정"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## 요구 사항 {#requirements}

- Kubernetes v1.20+.
- Datadog Operator 배포를 위한 [`Helm`][1].
- Datadog Agent 설치를 위한 [`Kubectl` CLI][2].
- [Single Step Instrumentation 호환성 가이드][36]에 따라 확인된 환경 호환성.


## 애플리케이션에서 APM 활성화 {#enable-apm-on-your-applications}

<div class="alert alert-info">Single Step Instrumentation은 Datadog Agent가 설치된 네임스페이스의 애플리케이션을 계측하지 않습니다. Agent를 애플리케이션을 실행하지 않는 별도의 네임스페이스에 설치하세요.</div>

클러스터 전체에서 Single Step Instrumentation을 활성화하면 지원되는 언어로 작성된 모든 애플리케이션의 트레이스가 자동으로 전송됩니다.

**참고:** 특정 네임스페이스 또는 포드만 계측하려면 [고급 옵션](#advanced-options)의 워크로드 대상 지정을 참조하세요.

다음 명령을 사용하여 SSI를 활성화합니다. 이때 다음 항목을 바꿉니다.

- `<YOUR_DD_API_KEY>`를 [Datadog API 키][40]로 대체합니다.
- `<YOUR_CLUSTER_NAME>`을 클러스터 이름으로 대체합니다.
- `<DATADOG_SITE>`를 [Datadog 사이트][43]로 대체합니다. {{< region-param key="dd_site" code="true" >}}

예시에서는 `apm.instrumentation.enabled: true`를 사용하여 SSI를 활성화하고 `datadog` 네임스페이스를 사용합니다. Agent가 다른 위치에 설치되어 있다면 네임스페이스를 바꿉니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Datadog Operator를 설치하고 API 키가 포함된 시크릿을 생성합니다.

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   helm install datadog-operator datadog/datadog-operator --namespace datadog --create-namespace
   kubectl create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY> -n datadog
   ```

1. APM 계측을 활성화하는 `datadog-agent.yaml` 파일을 생성합니다.

   ```yaml
   kind: "DatadogAgent"
   apiVersion: "datadoghq.com/v2alpha1"
   metadata:
     name: "datadog"
     namespace: "datadog"
   spec:
     global:
       clusterName: "<YOUR_CLUSTER_NAME>"
       site: "<DATADOG_SITE>"
       credentials:
         apiSecret:
           secretName: "datadog-secret"
           keyName: "api-key"
     features:
       apm:
         instrumentation:
           enabled: true
   ```

   최신 버전을 설치하는 대신 특정 SDK 버전을 고정하려면 `ddTraceVersions`가 포함된 `targets` 블록을 추가합니다. 전체 스키마는 [특정 워크로드 대상 지정](#target-specific-workloads)을 참조하세요.

1. Agent를 배포합니다.

   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

기존 Operator 설치를 업데이트하려면 `datadog-agent.yaml`에 SSI 구성을 추가하고 `kubectl -n datadog apply -f datadog-agent.yaml`을 사용하여 다시 적용합니다.

{{% /tab %}}
{{% tab "Helm" %}}

1. Datadog Helm 리포지토리를 추가하고 `datadog` 네임스페이스를 생성한 다음 API 키가 포함된 시크릿을 생성합니다.

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create namespace datadog
   kubectl -n datadog create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY>
   ```

1. APM 계측을 활성화하는 `datadog-values.yaml` 파일을 생성합니다.

   ```yaml
   datadog:
     site: "<DATADOG_SITE>"
     clusterName: "<YOUR_CLUSTER_NAME>"
     apiKeyExistingSecret: "datadog-secret"
     apm:
       instrumentation:
         enabled: true
   ```

   최신 버전을 설치하는 대신 특정 SDK 버전을 고정하려면 `ddTraceVersions`가 포함된 `targets` 블록을 추가합니다. 전체 스키마는 [특정 워크로드 대상 지정](#target-specific-workloads)을 참조하세요.

1. Agent를 배포합니다.

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog --namespace datadog
   ```

기존 Helm 설치를 업데이트하려면 `datadog-values.yaml`에 SSI 구성을 추가하고 `helm upgrade -n datadog -f datadog-values.yaml <RELEASE_NAME> datadog/datadog`을 실행합니다.

{{% /tab %}}
{{< /tabs >}}

Agent를 배포한 후 애플리케이션을 다시 시작합니다.

<div class="alert alert-info">SSI는 계측된 애플리케이션에 약간의 시작 시간을 추가합니다. 사용 사례에서 이 오버헤드를 수용할 수 없는 경우, <a href="/help/">Datadog 지원팀</a>에 문의하세요.</div>

### Datadog에서 구성 생성 {#generate-the-configuration-from-datadog}

UI를 통해 구성을 생성하려면 [Kubernetes에 Datadog Agent 설치][11] 페이지로 이동하여 화면의 안내에 따라 설치 방법과 API 키를 선택합니다. {{< ui >}}Configure `datadog-agent.yaml`{{< /ui >}} 섹션에서 {{< ui >}}Additional configuration{{< /ui >}} > {{< ui >}}Application Observability{{< /ui >}}로 이동하여 {{< ui >}}APM Instrumentation{{< /ui >}}을 활성화합니다. 그런 다음 생성된 구성 파일을 사용하여 Agent를 배포합니다.

{{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="Datadog 앱을 통해 Kubernetes에 Datadog Agent를 설치하기 위한 구성 블록" style="width:100%;" >}}

## 설치 검증 {#verify-the-installation}

1. Agent 포드가 실행 중인지 확인합니다.

   ```shell
   kubectl get pods -n datadog
   ```

1. Agent가 정상 상태이고 APM Agent가 실행 중인지 확인합니다. `<AGENT_POD>`를 노드 Agent 포드 이름으로 바꿉니다.

   ```shell
   kubectl exec <AGENT_POD> -n datadog -- agent status
   ```

   출력의 **APM Agent** 섹션을 확인합니다.

1. 계측 대상 애플리케이션 포드에 인젝션이 적용되었는지 확인합니다. `<APP_POD>` 및 `<APP_NAMESPACE>`를 애플리케이션 포드 중 하나와 해당 네임스페이스로 바꿉니다.

   ```shell
   kubectl get pod <APP_POD> -n <APP_NAMESPACE> -o jsonpath='{.spec.initContainers[*].name}'
   ```

   출력에는 계측된 각 언어에 대한 `datadog-init-apm-inject` 및 `datadog-lib-<language>-init` 컨테이너가 포함됩니다.

1. 애플리케이션이 트래픽을 수신한 후 [APM 서비스 페이지][42]에 서비스가 표시되는지 확인합니다. 몇 분 이내에 서비스가 표시되지 않으면 [SSI 문제 해결 가이드][35]를 따릅니다.

## Unified Service Tags 구성 {#configure-unified-service-tags}

Unified Service Tags(UST)는 트레이스, 메트릭, 로그에 일관된 태그를 적용해 탐색 및 관측 가능성 데이터 상호 연계가 간편합니다. UST는 자동 레이블 추출(권장)을 통해 구성할 수도 있고, `ddTraceConfigs`를 사용한 명시적 구성을 통하거나 배포 매니페스트에서 구성할 수도 있습니다.

<div class="alert alert-warning">
<a href="/agent/remote_config/">Remote Configuration</a>을 사용하는 경우, <a href="#recommended-configure-usts-through-automatic-label-extraction">자동 레이블 추출</a>이 호환되지 않습니다. <a href="#configure-usts-explicitly-with-ddtraceconfigs">명시적으로 UST를 구성</a>해야 합니다. 이때 <code>ddTraceConfigs</code>입니다.
</div>

### (권장) 자동 레이블 추출을 통해 UST 구성 {#recommended-configure-usts-through-automatic-label-extraction}

SSI를 사용하면 개별 배포를 수정하지 않고 자동으로 포드 레이블 및 메타데이터에서 UST 값을 추출할 수 있습니다. 이렇게 하려면 `kubernetesResourcesLabelsAsTags`가 기존 Kubernetes 레이블을 Datadog 서비스 태그로 매핑하도록 구성하세요.

**참고:** 이 방법은 Remote Configuration과 호환되지 않습니다. Remote Configuration을 사용하는 경우, [ddTraceConfigs를 사용하여 명시적으로 UST 구성](#configure-usts-explicitly-with-ddtraceconfigs)을 참조하세요.

#### 전제 조건 {#prerequisites}

| 구성 요소| 최소 버전 |
|-----------|------------------|
| `datadog-agent` | 7.69        |
| `datadog-operator` | 1.16.0   |
| `datadog-helm-chart` | 3.120.0 |

#### 구성 {#configuration}

다음 예시의 `app.kubernetes.io/name`을 서비스 이름이 포함된 레이블로 바꾸세요(예: `service.kubernetes.io/name` 또는 `component`). 이렇게 하면 레이블 여러 개를 구성할 수 있습니다.

```yaml
datadog:
  # Automatically extract service names from Kubernetes labels
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service     # Modern Kubernetes label
    deployments.apps:
      app.kubernetes.io/name: service
    replicasets.apps:
      app.kubernetes.io/name: service

  # Set environment globally for the entire cluster
  tags:
    - "env:production"

  apm:
    instrumentation:
      enabled: true
```

이 구성을 사용하면 Datadog이 이 레이블을 포함하는 모든 계측된 워크로드의 `app.kubernetes.io/name` 레이블 값을 사용하여 `service` 태그를 자동으로 설정합니다.

### ddTraceConfigs를 사용하여 명시적으로 UST 구성 {#configure-usts-explicitly-with-ddtraceconfigs}

대부분의 경우, 자동 구성으로 충분합니다. 하지만 특정 워크로드에 대한 세분화된 제어가 필요한 경우, `ddTraceConfigs`를 사용하여 명시적으로 레이블을 서비스 구성에 매핑하세요.

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service
    deployments.apps:
      app.kubernetes.io/name: service

  # Set environment globally for the entire cluster
  tags:
    - "env:production"

  apm:
    instrumentation:
      enabled: true
      targets:
        - name: frontend-services
          podSelector:
            matchLabels:
              tier: frontend
          ddTraceConfigs:
            - name: DD_SERVICE       # Explicitly override service name
              valueFrom:
                fieldRef:
                  fieldPath: metadata.labels['app.kubernetes.io/name']
            # DD_ENV inherited from cluster-level tags above
            # DD_VERSION automatically extracted from image tags
```


### 배포 매니페스트에서 UST 구성 {#configure-usts-in-deployment-manifests}

설정에서 UST 추출에 적합한 레이블을 사용하지 않는 경우, 환경 변수를 사용해 배포 매니페스트에서 직접 UST를 설정할 수 있습니다. 이 방식으로 접근하려면 각 배포를 개별적으로 수정해야 하지만, 정밀한 제어가 가능합니다.

지침 전문은 [Kubernetes 서비스에 UST 설정][5]을 참조하세요.

## SDK 종속적 제품 및 기능 활성화 {#enable-sdk-dependent-products-and-features}

SSI가 애플리케이션에 Datadog SDK를 로드하고 분산 트레이싱을 활성화하고 나면 SDK에 의존하는 추가적인 제품을 구성할 수 있습니다.

{{< ssi-products >}}

다음 설정 방법 중 한 가지를 사용하세요.

- **[Agent 타겟팅 규칙을 사용하여 구성](?tab=targetingrulesv764#target-specific-workloads)**:

  Agent 구성 대상에서 `ddTraceConfigs`을 사용하여 네임스페이스 또는 포드 그룹에 대한 제품을 활성화합니다.

- **[환경 변수 설정][7]**:

  애플리케이션 구성에서 직접 환경 변수를 설정하여 제품을 활성화하세요.

## 고급 옵션{#advanced-options}

다음 고급 옵션을 사용하여 Single Step Instrumentation이 환경에서 어떻게 동작할지 사용자 지정할 수 있습니다. 이러한 설정은 선택 사항이며 일반적으로 특수 설정에서만 필요합니다.

### 인젝션 모드 구성 {#configure-injection-modes}

SSI는 여러 인젝션 모드를 지원합니다. 인젝션 모드는 인젝터와 APM 라이브러리 파일이 애플리케이션 컨테이너에 전송되는 방식을 제어합니다. 일반적으로 이 설정을 수동으로 구성할 필요가 없습니다. 포드 시작이 많이 지연되는 것이 눈에 띄거나, 포드 초기화 중에 리소스 사용량이(CPU, 메모리) 예상보다 많은 경우 이 설정을 조정하는 것을 고려해 보세요. 인젝터의 작동 원리에 관한 자세한 내용은 [Single Step Instrumentation 사용 시 인젝터 동작][41]을 참조하세요.


| 모드 | 설명 | 요구 사항 |
|------|-------------|--------------|
| `auto` | **기본값.** Cluster Agent는 사용 중인 클러스터 및 워크로드에 가장 적합한 인젝션 모드를 선택합니다. 선택 로직은 Agent 버전에 따라 변경될 수 있습니다. | Agent 7.76.0+ |
| `init_container` | init 컨테이너를 사용하여 인젝터 및 APM 라이브러리 파일을 애플리케이션 컨테이너로 복사합니다. | Helm Chart 또는 Datadog Operator로 배포된 Agent |
| `csi` | [Datadog CSI 드라이버][37]를 사용하여 인젝터 및 APM 라이브러리 파일을 마운팅합니다. init 컨테이너 모드보다 포드 시작 시간이 단축됩니다. | Agent 7.76.0+, CSI driver 1.2.0+, Helm Chart 3.178.1+ 또는 Datadog Operator 1.25.0+ |

`csi` 모드를 사용하기 전에 Datadog CSI 드라이버를 설치하고 활성화하세요. Helm을 사용하여 배포하는 경우, `datadog-values.yaml`에서 `datadog.csi.enabled: true`도 설정하세요. Datadog Operator를 사용하여 배포하는 경우 `datadog-agent.yaml`에서 `spec.global.csi.enabled: true`를 설정하세요. 설치 단계 및 GKE Autopilot과 같은 환경별 요구 사항은 [CSI 드라이버 설명서][37]를 참조하세요. `auto` 모드에서는 CSI 드라이버가 설치되어 있고 클러스터에서 안전하게 사용할 수 있는 경우에만 Cluster Agent가 이 드라이버를 선택합니다.

#### 전역적으로 인젝션 모드 구성 {#configure-injection-mode-globally}

{{< tabs >}}
{{% tab "Helm" %}}

클러스터 전체에 인젝션 모드를 설정하려면 `datadog-values.yaml`에 `injectionMode`를 추가하세요.

```yaml
datadog:
  apm:
    instrumentation:
      injectionMode: <mode>
```

지원되는 값: `auto`(기본값), `init_container`, `csi`.

{{% /tab %}}
{{% tab "Datadog Operator" %}}

클러스터 전체에 인젝션 모드를 설정하려면 `datadog-agent.yaml`에 `injectionMode`를 추가합니다.

```yaml
spec:
  features:
    apm:
      instrumentation:
        injectionMode: <mode>
```

지원되는 값: `auto`(기본값), `init_container`, `csi`.

Datadog Operator 1.25.0 이전 버전을 사용하는 경우, [포드 주석](#configure-injection-mode-per-pod)을 사용하여 특정 포드의 인젝션 모드를 재정의합니다.

{{% /tab %}}
{{< /tabs >}}

#### 포드당 인젝션 모드 구성 {#configure-injection-mode-per-pod}

특정 포드의 인젝션 모드를 재정의하려면 포드 사양에 다음 주석을 추가합니다.

```yaml
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.injection-mode: "<mode>"
```

지원되는 값: `auto`, `init_container`, `csi`.

### 특정 워크로드 대상 {#target-specific-workloads}

기본적으로 SSI는 클러스터의 모든 네임스페이스에 속한 모든 서비스를 계측합니다. 계측할 워크로드를 세부적으로 조정하려면 Datadog에서 계측 규칙을 정의하거나, Agent 구성 또는 `DatadogInstrumentation` 리소스를 사용하여 타겟팅을 구성하세요. Datadog의 계측 규칙을 사용하면 Agent 구성을 변경하지 않고도 일치하는 포드에 대한 계측을 허용하거나 차단할 수 있습니다. 사용 가능한 방법은 Agent 또는 Cluster Agent 버전에 따라 다릅니다.

{{< tabs >}}
{{% tab "Datadog의 계측 규칙(v7.84.2+)" %}}

<div class="alert alert-info">Kubernetes용 계측 규칙은 미리 보기로 제공되고 있습니다. <a href="https://www.datadoghq.com/product-preview/instrumentation-rules-kubernetes/">액세스하려면 등록하세요.</a></div>

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a>에서는 계측 규칙이 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

각 계측 규칙은 네임스페이스 또는 포드 속성을 기준으로 일치하는 포드를 찾은 다음, 해당 포드에 대한 계측을 허용하거나 차단합니다. 규칙을 모든 적격 클러스터에 배포하거나 하나 이상의 [클러스터 그룹](#create-cluster-groups)으로 범위를 지정하여 적용 위치를 제한할 수 있습니다.

계측 규칙을 보고 관리하려면 {{< ui >}}APM{{< /ui >}} > {{< ui >}}Instrument a Service{{< /ui >}} > [{{< ui >}}Instrumentation Rules{{< /ui >}}][102]로 이동한 다음, 페이지 제목의 드롭다운에서 {{< ui >}}Kubernetes{{< /ui >}}을 선택하세요.

{{< img src="tracing/trace_collection/apm-instrumentation-rules-for-kubernetes.png" alt="Kubernetes가 선택된 APM Instrumentation Rules 페이지로, 계측 규칙 목록이 비어 있는 상태에서 Default Behavior, Clusters in Scope 및 Deployment Status 카드가 표시됩니다." style="width:100%;" >}}

#### 계측 규칙을 위한 필수 구성 요소 {#prerequisites-for-instrumentation-rules}

- **Cluster Agent**: 각 클러스터에서 v7.84.2 이상, [Remote Configuration][101]이 활성화되어 있어야 합니다. 이러한 요구 사항을 충족하는 클러스터는 계측 규칙을 사용할 수 있습니다.
- **권한**: 계측 규칙 및 클러스터 그룹을 생성하고 관리하는 데 필요한 **APM Workload Selection Write** [권한][103]입니다.

#### 기본 동작 설정 {#set-the-default-behavior}

기본 동작은 Datadog에서 계측 규칙을 사용할 때 Agent 구성(`targets` 및 `enabledNamespaces`)의 워크로드 타겟팅이 여전히 적용되는지 여부를 제어합니다. 기본 동작과 관계없이 일부 포드는 계측에서 제외되며, 다른 타겟팅 방법이 계측 규칙보다 우선할 수 있습니다. [계측 규칙에 대한 예외](#exceptions-to-instrumentation-rules) 및 [구성 우선 순위](#configuration-precedence) 섹션을 참조하세요.

<div class="alert alert-warning">SSI가 클러스터 전체에서 활성화되어 있고 다음이 없는 경우 <code>targets</code>, 규칙을 생성하기 전에 기본 동작을 <strong>Allow everything else</strong>로 설정하세요. 그렇지 않으면 첫 번째 규칙이 클러스터 전체 계측을 끄게 되어 규칙과 일치하지 않는 포드는 더 이상 계측되지 않습니다.</div>

1. [Instrumentation Rules][102] 페이지에서 {{< ui >}}Default Behavior{{< /ui >}} 카드로 이동하여 {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
1. 다음 옵션 중 하나를 선택합니다.
   - {{< ui >}}No default{{< /ui >}}(초기 설정): Agent 구성의 워크로드 타겟팅이 여전히 적용되지만, Datadog에 정의된 규칙이 이를 재정의할 수 있습니다. 규칙이나 Agent 구성과 일치하지 않는 포드는 계측되지 않습니다.
   - {{< ui >}}Block everything else{{< /ui >}}: Agent 구성의 워크로드 타겟팅이 무시됩니다. 허용 규칙과 일치하지 않는 포드는 계측되지 않습니다.
   - {{< ui >}}Allow everything else{{< /ui >}}: Agent 구성의 워크로드 타겟팅이 무시됩니다. 차단 규칙과 일치하지 않는 포드는 계측됩니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{< img src="tracing/trace_collection/k8s-default-behavior.png" alt="Kubernetes Default Behavior 옵션: No default, Block everything else, Allow everything else" style="width:50%;" >}}

#### 클러스터 그룹 생성 {#create-cluster-groups}

클러스터 그룹은 계측 규칙으로 타겟팅할 수 있는 Kubernetes 클러스터의 재사용 가능한 컬렉션입니다.

클러스터 그룹을 생성하려면 다음 단계를 따르세요.

1. [Instrumentation Rules][102] 페이지에서 {{< ui >}}Clusters in Scope{{< /ui >}} 카드로 이동하여 {{< ui >}}Manage cluster groups{{< /ui >}}를 클릭합니다.
1. {{< ui >}}New Cluster Group{{< /ui >}}을 클릭하고 그룹 이름을 입력합니다.
1. {{< ui >}}Add Clusters{{< /ui >}}를 클릭한 다음, 추가할 클러스터를 검색하여 선택합니다.

   <div class="alert alert-info">클러스터 그룹은 정적입니다. 새 클러스터는 기존 그룹에 자동으로 추가되지 않습니다. 대신, 그룹에 추가할 때까지 <strong>All clusters</strong> 그룹에 나타납니다. 클러스터는 둘 이상의 그룹에 속할 수 있습니다.</div>

   {{< img src="tracing/trace_collection/k8s-add-clusters.png" alt="Add Clusters 목록에서 4개의 클러스터 중 2개가 선택된 새 클러스터 그룹 양식" style="width:80%;" >}}

1. {{< ui >}}Save Group{{< /ui >}}를 클릭하세요.

Datadog은 {{< ui >}}All clusters{{< /ui >}} 그룹을 자동으로 유지 관리합니다. 이 그룹은 다른 그룹에 속하지 않는 적격 클러스터를 나열하므로 그룹화할 클러스터가 무엇인지 확인할 수 있습니다. 해당 클러스터 목록은 편집할 수 없습니다.

클러스터 그룹을 삭제하면 Datadog은 그룹의 규칙을 제거하며, Cluster Agent는 다음에 Remote Configuration을 폴링할 때 해당 규칙 적용을 중단합니다.

클러스터 그룹의 순서를 변경하려면 그룹 목록에서 핸들을 사용하여 그룹을 드래그하세요. 그룹 순서는 [계측 규칙이 평가되는 방식](#how-instrumentation-rules-are-evaluated)에 영향을 줍니다.

{{< img src="tracing/trace_collection/k8s-cluster-groups.png" alt="Kubernetes용 Cluster Groups 페이지. Canary 그룹이 All clusters 그룹 위에 정렬되어 있으며 All clusters 그룹의 클러스터가 나열되어 있습니다." style="width:100%;" >}}

#### 계측 규칙 생성 {#create-instrumentation-rules}

**참고**: Bits AI를 사용하여 자연어로 계측 규칙을 생성할 수 있습니다. Create instrumentation rule 창에서 {{< ui >}}Generate with Bits{{< /ui >}}를 클릭하고 계측할 포드를 설명하세요. Bits AI가 해당 규칙을 생성합니다.

계측 규칙을 생성하려면 다음 단계를 따르세요.

1. [Instrumentation Rules][102] 페이지에서 {{< ui >}}New Rule{{< /ui >}}를 클릭합니다. 또는 Cluster Groups 페이지에서 그룹을 선택하고 {{< ui >}}Rules{{< /ui >}} 탭을 연 다음 {{< ui >}}Create a new rule{{< /ui >}}를 클릭합니다.
1. 하나 이상의 조건을 정의한 다음 {{< ui >}}Block Instrumentation{{< /ui >}} 또는 {{< ui >}}Allow Instrumentation{{< /ui >}}를 선택합니다. [지원되는 Kubernetes 속성](#supported-kubernetes-attributes) 섹션을 참조하세요.
1. {{< ui >}}Set cluster targeting{{< /ui >}}에서 {{< ui >}}All clusters{{< /ui >}} 또는 {{< ui >}}Select cluster groups{{< /ui >}}을 선택합니다.

   둘 이상의 그룹을 선택하면 그룹이 단일 규칙을 공유하며, 나중에 이를 편집하면 선택한 모든 그룹이 업데이트됩니다.

   {{< img src="tracing/trace_collection/k8s-create-rule.png" alt="Kubernetes용 Create instrumentation rule 창. Namespace Name이 default와 같다는 조건, Allow Instrumentation 작업, Canary 그룹을 선택한 Select cluster groups 옵션이 표시됩니다." style="width:100%;" >}}

1. 규칙의 이름을 지정한 다음 {{< ui >}}Next{{< /ui >}}을 클릭합니다.
1. 규칙을 검토합니다. Datadog은 각 타겟 그룹의 규칙 목록 끝에 새 규칙을 추가합니다. 필요시 {{< ui >}}Set evaluation order{{< /ui >}} 아래에서 규칙을 드래그하여 각 그룹 내의 순서를 변경하세요. [계측 규칙 평가 방법](#how-instrumentation-rules-are-evaluated) 섹션을 참조하세요.
1. {{< ui >}}Create Rule{{< /ui >}}을 클릭합니다.

Datadog은 50초 이내에 Remote Configuration을 통해 적격 클러스터에 규칙을 배포합니다. 규칙이 배포된 후 변경 사항을 적용하려면 영향을 받는 워크로드를 다시 시작하세요. [Instrumentation Rules][102] 페이지의 {{< ui >}}Deployment Status{{< /ui >}} 카드는 현재 규칙의 롤아웃 상태를 보여줍니다.

#### 계측 규칙 평가 방법 {#how-instrumentation-rules-are-evaluated}

각 포드에 대해 Datadog은 다음 순서로 계측 규칙을 평가하고 일치하는 첫 번째 규칙을 적용합니다.

1. 포드의 클러스터가 속한 그룹의 규칙(그룹 순서대로 위에서 아래로). 각 그룹 내에서 규칙은 {{< ui >}}Set evaluation order{{< /ui >}} 아래에 설정된 순서대로 평가됩니다.
1. {{< ui >}}All clusters{{< /ui >}} 타겟팅 옵션을 사용하는 규칙. 이 규칙은 클러스터 그룹 내의 클러스터를 포함하여 모든 적격 클러스터에 적용됩니다.

일치하는 규칙이 없으면 [기본 동작](#set-the-default-behavior)이 적용됩니다.

<div class="alert alert-info">포드 SDK 주석 및 <code>DatadogInstrumentation</code> 리소스는 기본 동작과 관계없이 계측 규칙보다 우선합니다. 전체 순서는 <a href="#configuration-precedence">구성 우선 순위</a> 섹션을 참조하세요.</div>

#### 계측 규칙에 대한 예외 {#exceptions-to-instrumentation-rules}

계측 규칙이나 기본 동작과 관계없이 다음 포드는 계측되지 않습니다.

- `kube-system` 네임스페이스의 포드
- Datadog Agent가 설치된 네임스페이스의 포드
- `disabledNamespaces`에 나열된 네임스페이스의 포드
- `admission.datadoghq.com/enabled: "false"`로 레이블이 지정된 포드

#### 지원되는 Kubernetes 속성 {#supported-kubernetes-attributes}

Kubernetes에 대한 계측 규칙은 다음 속성을 지원합니다. 규칙이 적용되려면 포드가 규칙의 모든 조건을 충족해야 합니다. 레이블 속성의 경우, 레이블 키와 일치시킬 값을 지정하세요.

| 속성 | 설명 | 연산자 | 예시 |
| --------- | ----------- | --------- | ------- |
| 네임스페이스 이름 | 포드 네임스페이스의 이름입니다. | `equals`, `not equals`, `prefix`, `contains` | `default`, `production` |
| 네임스페이스 레이블 | 포드 네임스페이스의 레이블입니다. | `equals`, `not equals`, `prefix` | 레이블 키 `team`, 값 `checkout` |
| 포드 레이블 | 포드의 레이블입니다. | `equals`, `not equals`, `prefix` | 레이블 키 `app`, 값 `web` |

[101]: /ko/remote_configuration/
[102]: https://app.datadoghq.com/apm/service-setup/workload-selection
[103]: /ko/account_management/rbac/permissions/

{{% /tab %}}

{{% tab "타겟팅 규칙(v7.64+)" %}}

`targets` 레이블을 사용하여 대상 지정 블록을 생성해 어느 워크로드를 계측하고 어느 구성을 적용할지 지정합니다.

각 대상 블록에 다음 키가 있습니다.

| 키             | 설명 |
|------------------|-------------|
| `name`            | 대상 블록의 이름입니다. 이것은 모니터링 상태에는 아무런 영향을 미치지 않고 메타데이터로만 사용됩니다. |
| `namespaceSelector` | 계측할 네임스페이스입니다. 다음 중 하나 이상을 사용하여 지정합니다.<br> - `matchNames`: 하나 이상의 네임스페이스 이름 목록. <br> - `matchLabels`: `{key,value}` 쌍에서 정의된 하나 이상의 레이블 목록. <br> - `matchExpressions`: 네임스페이스 선택기 요구 사항 목록. <br><br> 네임스페이스가 일치하려면 모든 기준을 충족해야 합니다. 자세한 내용은 [Kubernetes 선택기 설명서][10]를 참조하세요.|
| `podSelector`     | 계측할 포드입니다. 다음 중 하나 이상을 사용하여 지정합니다. <br> - `matchLabels`: `{key,value}` 쌍에서 정의된 하나 이상의 레이블 목록. <br> - `matchExpressions`: 포드 선택기 요구 사항 목록. <br><br> 포드가 일치하려면 모든 기준을 충족해야 합니다. 자세한 내용은 [Kubernetes 선택기 설명서][10]를 참조하세요. |
| `ddTraceVersions` | 각 언어에 사용할 [Datadog APM SDK][9] 버전입니다. |
| `ddTraceConfigs`  | [Unified Service Tags][8] 설정, 트레이싱 외 [SDK 종속적 제품](#enable-sdk-dependent-products-and-features) 활성화, 기타 [APM 설정][14] 사용자 지정을 지원하는 APM SDK 구성입니다. |

구성해야 하는 파일은 Single Step Instrumentation을 활성화한 방식에 따라 다릅니다.
- SSI를 Datadog Operator로 활성화한 경우, `datadog-agent.yaml`을 편집합니다.
- SSI를 Helm으로 활성화한 경우, `datadog-values.yaml`을 편집합니다.

**참고**: 대상은 순서대로 평가되며, 첫 번째 일치 항목이 우선합니다.

#### 예시 구성 {#example-configurations}

특정 서비스를 선택하는 방법에 관한 다음 예시를 검토하세요.

{{< collapse-content title="예 1: 하나만 빼고 모든 네임스페이스 활성화" level="h5" >}}

이 구성:
- 사용 시 `jenkins` 네임스페이스를 제외한 모든 네임스페이스에 대하여 APM을 활성화합니다.
  - **참고**: 목록에 나열된 것을 제외하고 모든 네임스페이스에 대하여 비활성화하려면 `enabledNamespaces`를 사용하세요.
- Datadog에 Java 애플리케이션은 기본 Java SDK로, Python 애플리케이션은 Python SDK의 `v.3.1.0`을 사용하여 계측하도록 지시합니다.

{{< highlight yaml "hl_lines=4-10" >}}
   apm:
     instrumentation:
       enabled: true
       disabledNamespaces:
         - "jenkins"
       targets:
         - name: "all-remaining-services"
           ddTraceVersions:
             java: "default"
             python: "3.1.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="예 2: 이름 및 레이블이 일치하는 네임스페이스의 부분 집합을 계측" level="h5" >}}

이 구성을 사용하면 대상 블록을 두 개 생성합니다.

- 첫 번째 블록(이름 `login-service_namespace`):
  - 네임스페이스 `login-service`의 서비스에 대하여 APM을 활성화합니다.
  - Datadog에 이 네임스페이스의 서비스를 Java SDK 기본 버전으로 계측하도록 지시합니다.
  - 이 대상 그룹에 대하여 환경 변수 `DD_PROFILING_ENABLED` 설정
- 두 번째 블록(이름 `billing-service_apps`)
  - 레이블 `app:billing-service`가 있는 네임스페이스의 서비스에 대하여 APM을 활성화합니다.
  - Datadog에 이 서비스 세트를 Python SDK의 `v3.1.0`을 사용하여 계측하도록 지시합니다.

{{< highlight yaml "hl_lines=4-28" >}}
  apm:
    instrumentation:
      enabled: true
      targets:
        - name: "login-service_namespace"
          namespaceSelector:
            matchNames:
              - "login-service"
          ddTraceVersions:
            java: "default"
          ddTraceConfigs:
            - name: "DD_PROFILING_ENABLED"  ## profiling is enabled for all services in this namespace
              value: "auto"
        - name: "billing-service_apps"
          namespaceSelector:
            matchLabels:
              app: "billing-service"
          ddTraceVersions:
            python: "3.1.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="예 3: 다양한 워크로드를 다양한 트레이서로 계측" level="h5" >}}

이 구성이 하는 일은 다음과 같습니다.
- 다음 레이블이 있는 포드에 대하여 APM 활성화:
  - `app:db-user`, 이는 `db-user` 애플리케이션을 실행하는 포드를 나타냅니다.
  - `webserver:routing`, 이 레이블은 `request-router` 애플리케이션을 실행하는 포드를 나타냅니다.
- Datadog에 Datadog Tracer SDK 기본 버전을 사용하도록 지시합니다.
- 각 대상 그룹에 적용할 Datadog 환경 변수를 설정하고 SDK를 구성합니다.

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "db-user"
           podSelector:
             matchLabels:
               app: "db-user"
           ddTraceVersions:
             java: "default"
           ddTraceConfigs:   ## trace configs set for services in matching pods
             - name: "DD_DATA_STREAMS_ENABLED"
               value: "true"
         - name: "user-request-router"
           podSelector:
             matchLabels:
               webserver: "user"
           ddTraceVersions:
             php: "default"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="예 4: 네임스페이스 내 포드 계측" level="h5" >}}

이 구성:
- 사용 시 `login-service` 네임스페이스 안에 있고, `app:password-resolver` 레이블이 지정된 포드에 대하여 APM을 활성화합니다.
- Datadog에 Datadog Java Tracer SDK 기본 버전을 사용하도록 지시합니다.
- 이 대상에 적용할 Datadog 환경 변수를 설정합니다.

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "login-service-namespace"
           namespaceSelector:
             matchNames:
               - "login-service"
           podSelector:
             matchLabels:
               app: "password-resolver"
           ddTraceVersions:
             java: "default"
           ddTraceConfigs:
             - name: "DD_PROFILING_ENABLED"
               value: "auto"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="예 5: 다음을 사용하여 포드의 부분 집합 계측 <code>matchExpressions</code>" level="h5" >}}

이 구성을 사용하면 레이블 `app=app1` 또는 `app=app2`가 있는 포드만 제외하고 모든 포드에 대하여 APM을 활성화합니다.

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "default-target"
           podSelector:
               matchExpressions:
                 - key: app
                   operator: NotIn
                   values:
                   - app1
                   - app2
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="예 6: 다음을 사용하여 추가적인 제품 활성화 <code>ddTraceConfigs</code>" level="h5" >}}

이 구성을 사용하면 `web-apps` 네임스페이스의 서비스에 대하여 [App and API Protection(AAP)][12] 및 [Continuous Profiler][11]를 활성화하고, `ddTraceConfigs`를 사용해 필수 환경 변수를 설정합니다.

{{< highlight yaml "hl_lines=4-20" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "web-apps-with-security"
           namespaceSelector:
             matchNames:
               - "web-apps"
           ddTraceVersions:
             java: "default"
             python: "default"
           ddTraceConfigs:
             - name: "DD_APPSEC_ENABLED"
               value: "true"
             - name: "DD_PROFILING_ENABLED"
               value: "auto"
{{< /highlight >}}

SSI를 통해 활성화할 수 있는 제품 전체 목록은 [SDK 종속적 제품 및 기능 활성화](#enable-sdk-dependent-products-and-features)를 참조하세요.

{{< /collapse-content >}}

[8]: /ko/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[9]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/#tracer-libraries
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements
[11]: /ko/profiler/
[12]: /ko/security/application_security/
[14]: /ko/tracing/trace_collection/library_config/

{{% /tab %}}

{{% tab "DatadogInstrumentation CRD (v7.85+)" %}}

`DatadogInstrumentation` 사용자 지정 리소스를 사용하여 SSI를 활성화하고 특정 워크로드 세트에 대한 SDK를 구성합니다.

이 방법을 사용하려면 Datadog Agent와 Cluster Agent **v7.85.0 이상**이 필요하며, 다음 중 하나를 사용하여 `DatadogInstrumentation` CRD를 설치해야 합니다.

- Datadog Operator **v1.31.0 이상**.
- Datadog Helm 차트 **v3.255.0 이상**.

##### 워크로드를 대상으로 하는 리소스 생성 {#enable-apm-with-datadoginstrumentation}

`DatadogInstrumentation` 리소스를 생성하고 타겟팅하려는 워크로드와 동일한 네임스페이스에 적용합니다. 이 예시는 `apps` 네임스페이스의 `checkout` 배포를 기본 Java SDK로 계측합니다.

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: checkout-apm
  namespace: apps
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: checkout
  config:
    apm:
      ddTraceVersions:
        java: "default"
      ddTraceConfigs:
        - name: DD_SERVICE
          value: checkout
        - name: DD_ENV
          value: production
```

워크로드 이름, 네임스페이스, 트레이서 언어 및 서비스 태그를 애플리케이션에 맞는 올바른 값으로 바꿉니다. `targetRef`는 API 버전, 종류 및 이름으로 워크로드를 식별합니다. 한 번에 하나의 `DatadogInstrumentation` 사용자 지정 리소스만 특정 워크로드를 대상으로 지정할 수 있습니다. 해당 워크로드에 대한 리소스가 이미 존재하는 경우 해당 리소스에 `config.apm`을 추가합니다.
적용 후 대상 워크로드에 속한 새 포드는 리소스에 정의된 추적기 및 구성으로 계측됩니다.

지원되는 대상 종류는 `Deployment`, `StatefulSet`, `DaemonSet`, `Job`, `CronJob` 및 Argo `Rollout`입니다.

##### 구성 설정 {#configuration-settings}

`spec.config.apm` 아래에서 다음 필드를 설정합니다.

| 필드 | 설명 |
|-------|-------------|
| `enabled` | [워크로드의 계측을 비활성화](#disable-instrumentation-with-datadoginstrumentation)하려면 `false`로 설정합니다. |
| `ddTraceVersions` | SDK 언어 식별자를 버전으로 매핑합니다. [SSI 호환성 요구 사항][36]에 따라 `java`, `js`(Node.js), `python`, `dotnet`, `ruby`, `php` 또는 `c`를 지정하세요. 나열된 SDK만 주입됩니다. Agent의 기본 SDK 버전에는 `"default"`를 사용하고 그렇지 않으면 특정 버전을 고정하세요. 생략하면 Agent는 지원되는 기본 SDK 세트를 사용합니다. |
| `ddTraceConfigs` | SDK 환경 변수 목록입니다. 각 `name`은 `DD_`로 시작해야 합니다. 리터럴 문자열에는 `value`를 사용하고, Kubernetes 환경 변수 참조에는 `valueFrom`을 사용합니다. |

예를 들어, Continuous Profiler를 활성화하고 포드 레이블에서 서비스 이름을 읽으려면 `ddTraceConfigs`에 다음 항목을 추가하세요.

```yaml
ddTraceConfigs:
  - name: DD_PROFILING_ENABLED
    value: "auto"
  - name: DD_SERVICE
    valueFrom:
      fieldRef:
        fieldPath: metadata.labels['app.kubernetes.io/name']
```

참조된 레이블은 애플리케이션 포드에 있어야 합니다. 더 많은 SDK 옵션은 [라이브러리 구성][7]을 참조하세요.

##### 다른 대상 지정 방법보다 우선 적용 {#precedence-over-other-targeting-methods}

`spec.config.apm.enabled` 값이 `false`인 경우를 포함하여 일치하는 DDI 구성은 우선 순위가 낮은 소스보다 우선합니다. 포드 SDK 주석이 이를 재정의할 수 있습니다. DDI만으로 워크로드를 관리하려면 포드 사양에서 충돌하는 주석을 제거하세요. 전체 순서는 [구성 우선 순위](#configuration-precedence) 섹션을 참조하세요.

[7]: /ko/tracing/trace_collection/library_config/
[36]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/

{{% /tab %}}

{{% tab "레거시(<=v7.63)" %}}

#### 네임스페이스의 계측 활성화 또는 비활성화 {#enable-or-disable-instrumentation-for-namespaces}

특정 네임스페이스에서 애플리케이션의 계측을 활성화 또는 비활성화할 수 있습니다. enabledNamespaces 또는 disabledNamespaces 중 하나만 설정할 수 있고, 둘 다는 안 됩니다.

구성해야 하는 파일은 Single Step Instrumentation을 Datadog Operator 또는 Helm 중 무엇으로 활성화했는지에 따라 다릅니다.

{{< collapse-content title="Datadog Operator" level="h5" >}}

특정 네임스페이스에 대해 계측을 활성화하려면 `datadog-agent.yaml`에 `enabledNamespaces` 구성을 추가합니다.

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces: # Add namespaces to instrument
           - default
           - applications
{{< /highlight >}}

특정 네임스페이스에 대해 계측을 비활성화하려면 `datadog-agent.yaml`에 `disabledNamespaces` 구성을 추가하세요.

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         disabledNamespaces: # Add namespaces to not instrument
           - default
           - applications
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h5" >}}

특정 네임스페이스에 대해 계측을 활성화하려면 `datadog-values.yaml`에 `enabledNamespaces` 구성을 추가합니다.

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces: # Add namespaces to instrument
             - namespace_1
             - namespace_2
{{< /highlight >}}

특정 네임스페이스에 대해 계측을 비활성화하려면 `datadog-values.yaml`에 `disabledNamespaces` 구성을 추가합니다.

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          disabledNamespaces: # Add namespaces to not instrument
            - namespace_1
            - namespace_2
{{< /highlight >}}

{{< /collapse-content >}}

#### SDK 버전 지정 {#specify-sdk-versions}

<div class="alert alert-info">Datadog Cluster Agent v7.52.0+부터 사용자가 지정하는 SDK에 따라 애플리케이션의 부분 집합을 자동으로 계측할 수 있습니다.</div>

Datadog SDK와 그 버전을 지정하면 해당 언어로 작성된 애플리케이션이 자동으로 계측됩니다. 이것은 두 가지 방식으로 구성할 수 있으며, 다음과 같은 우선 순위 순서대로 적용됩니다.

1. [서비스 수준에서 지정](#specify-at-the-service-level) 또는
2. [클러스터 수준에서 지정](#specify-at-the-cluster-level).

**기본값**: 라이브러리 버전을 지정하지 않으면, 지원되는 언어로 작성된 애플리케이션이 최신 SDK 버전을 사용하여 자동으로 계측됩니다.

##### 서비스 수준에서 지정 {#specify-at-the-service-level}

특정 포드의 애플리케이션을 자동으로 계측하려면 포드 사양의 애플리케이션에 적절한 언어 주석 및 라이브러리 버전을 추가합니다.

| 언어   | 포드 주석                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |
| PHP        | `admission.datadoghq.com/php-lib.version: "<CONTAINER IMAGE TAG>"`   |

`<CONTAINER IMAGE TAG>`를 원하는 라이브러리 버전으로 바꾸세요. 사용 가능한 버전은 [Datadog 컨테이너 레지스트리](#change-the-default-image-registry) 및 각 언어의 트레이서 소스 리포지토리에 목록으로 나열되어 있습니다.

- [Java][34]
- [Node.js][35]
- [Python][36]
- [.NET][37]
- [Ruby][38]
- [PHP][39]

<div class="alert alert-danger">메이저 라이브러리 릴리스로 인해 이전 버전과 호환되지 않는 변경 사항이 도입될 수 있으므로 <code>latest</code> 태그를 사용할 때는 주의해야 합니다.</div>

예를 들어, Java 애플리케이션을 자동으로 계측하려면 다음과 같이 합니다.

{{< highlight yaml "hl_lines=10" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # ...
spec:
  template:
    metadata:
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # ...
{{< /highlight >}}

##### 클러스터 수준에서 지정 {#specify-at-the-cluster-level}

주석을 사용해 특정 포드의 자동 계측을 활성화하지 않은 경우, SSI 구성을 사용해 클러스터 전체를 어느 언어로 계측할지 지정할 수 있습니다. `apm.instrumentation.libVersions`가 설정된 경우, 지정된 언어로 작성된 애플리케이션만 지정된 라이브러리 버전을 사용하여 계측됩니다.

구성해야 하는 파일은 Single Step Instrumentation을 Datadog Operator 또는 Helm 중 무엇으로 활성화했는지에 따라 다릅니다.

{{< collapse-content title="Datadog Operator" level="h6" >}}

예를 들어, .NET, Python, Node.js 애플리케이션을 계측하려면 `datadog-agent.yaml` 파일에 다음 구성을 추가합니다.

{{< highlight yaml "hl_lines=5-8" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: "x.x.x"
            python: "x.x.x"
            js: "x.x.x"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h6" >}}

예를 들어, .NET, Python, Node.js 애플리케이션을 계측하려면 `datadog-values.yaml` 파일에 다음 구성을 추가합니다.

{{< highlight yaml "hl_lines=5-8" >}}
   datadog:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: "x.x.x"
            python: "x.x.x"
            js: "x.x.x"
{{< /highlight >}}

{{< /collapse-content >}}


[34]: https://github.com/DataDog/dd-trace-java/releases
[35]: https://github.com/DataDog/dd-trace-js/releases
[36]: https://github.com/DataDog/dd-trace-py/releases
[37]: https://github.com/DataDog/dd-trace-dotnet/releases
[38]: https://github.com/DataDog/dd-trace-rb/releases
[39]: https://github.com/DataDog/dd-trace-php/releases


{{% /tab %}}
{{< /tabs >}}

#### 구성 우선 순위 {#configuration-precedence}

허용 대상인 포드의 경우 Cluster Agent는 다음 순서로 APM 구성을 선택합니다. 아래 순서는 우선 순위가 높은 항목부터 나열되어 있습니다.

1. 포드 주석(예: `admission.datadoghq.com/java-lib.version`)
1. 워크로드의 `DatadogInstrumentation` APM 구성
활성화된 경우 1. [Datadog에 정의된 계측 규칙](?tab=instrumentationrulesindatadogv7842#target-specific-workloads).
1. Agent에서 구성한 `apm.instrumentation.targets` 또는 `enabledNamespaces` 계측 규칙의 [기본 동작](?tab=instrumentationrulesindatadogv7842#set-the-default-behavior)이 {{< ui >}}Block everything else{{< /ui >}} 또는 {{< ui >}}Allow everything else{{< /ui >}}인 경우 이러한 설정은 무시됩니다.
1. `apm.instrumentation.targets` 및 Datadog의 계측 규칙 없이 활성화된 경우의 클러스터 전체 계측.

### 기본 이미지 레지스트리 변경 {#change-the-default-image-registry}

Datadog은 계측 라이브러리 이미지를 gcr.io, Docker Hub, Amazon ECR에 게시합니다.

| 언어   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js    | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |
| PHP        | [gcr.io/datadoghq/dd-lib-php-init][30] | [hub.docker.com/r/datadog/dd-lib-php-init][31] | [gallery.ecr.aws/datadog/dd-lib-php-init][32] |

Datadog Cluster Agent 구성의 `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` 환경 변수는 Admission Controller가 사용하는 레지스트리를 지정합니다. 기본값은 `gcr.io/datadoghq`입니다.

다른 레지스트리에서 SDK를 가져오려면 이것을 `docker.io/datadog`, `public.ecr.aws/datadog`으로 변경하면 되고, 로컬 컨테이너 레지스트리에서 이미지를 호스팅하는 경우 다른 URL로 변경하면 됩니다.

컨테이너 레지스트리 변경 지침은 [컨테이너 레지스트리 변경][33]을 참조하세요.

### 프라이빗 컨테이너 레지스트리 사용 {#use-a-private-container-registry}

조직이 퍼블릭 레지스트리(예: `gcr.io`, `docker.io` 또는 `public.ecr.aws`)에서 직접 가져오기를 허용하지 않는 경우, 필수 Datadog 이미지를 내부에서 호스팅하고 Admission Controller가 이를 사용하도록 구성할 수 있습니다.

SSI를 프라이빗 컨테이너 레지스트리와 함께 사용하려면 다음 단계를 따르세요.

1. [이러한 지침][34]을 따라 Datadog의 컨테이너 이미지를 프라이빗 레지스트리에 미러링합니다.

   계측 중인 언어에 대한 이미지만 필요합니다. 어느 것이 필요한지 확실하지 않은 경우, 아래와 같이 대부분의 사용 사례에 해당하는 기준을 참조하세요.

   - `apm-inject`
   - `dd-lib-java-init`
   - `dd-lib-python-init`
   - `dd-lib-dotnet-init`
   - `dd-lib-php-init`
   - `dd-lib-ruby-init`
   - `dd-lib-js-init`

   이러한 이미지는 [gcr.io][12], [Docker Hub][13] 또는 [Amazon ECR Public Gallery][14]에 있습니다.

2. 구성에 따라 이미지를 태그합니다.

   미러링하는 버전이 워크로드에서 구성된 버전과 일치해야 하며, 이는 다음 중 한 가지 방법으로 설정할 수 있습니다.
   - DDI 리소스 내 `spec.config.apm.ddTraceVersions`에서 워크로드당.
   - `ddTraceVersions`를 사용하는 Agent 구성 대상에서 또는
   - `admission.datadoghq.com/java-lib.version`과 같은 주석을 사용하여 포드당.

   명시적으로 구성된 버전이 없으면 기본 버전(`0`)이 사용됩니다.

   예를 들면 다음과 같습니다.

   ```
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "default-target"
           ddTraceVersions:
             java: "1"
             python: "3"
   ```

   이 구성에는 다음 이미지 태그가 필요합니다.
   - `apm-inject:0`
   - `dd-lib-java-init:1`
   - `dd-lib-python-init:3`

3. 프라이빗 레지스트리를 사용하려면 Cluster Agent 구성을 업데이트합니다.

   프라이빗 레지스트리를 사용하려면 Cluster Agent 구성에서 `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` 환경 변수를 설정합니다.

컨테이너 레지스트리 변경에 관한 자세한 내용은 [컨테이너 레지스트리 변경][33]을 참조하세요.

### EKS에서 Container Network Interface 사용{#using-a-container-network-interface-on-eks}

Calico와 같은 CNI를 사용하는 경우, 컨트롤 플레인 노드가 Datadog의 Admission Controller에 대한 네트워크 연결을 시작할 수 없고 'Address is not allowed' 오류를 보고합니다.
Single Step Instrumentation을 사용하려면 Datadog의 Cluster Agent를 `useHostNetwork: true` 파라미터를 사용해 수정하세요.

```
datadog:
  ...

clusterAgent:
  useHostNetwork: true

  admissionController:
    ...
```

## Agent에서 단일 단계 APM 계측 제거 {#remove-single-step-apm-instrumentation-from-your-agent}

특정 서비스, 호스트, VM 또는 컨테이너의 트레이스 데이터를 수집하지 않고자 하는 경우, 다음 단계를 따르세요.

### 특정 서비스의 계측 제거 {#remove-instrumentation-for-specific-services}

특정 서비스에서 APM 계측을 제거하고 트레이스 보내기를 중단하려면 다음 중 한 가지 작업을 수행합니다.

#### DatadogInstrumentation을 사용하여 계측 비활성화 {#disable-instrumentation-with-datadoginstrumentation}

워크로드의 DDI 리소스에서 `spec.config.apm.enabled`를 `false`로 설정하여 `targetRef` 및 모든 검사 또는 로그 구성을 유지합니다.

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: checkout-apm
  namespace: apps
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: checkout
  config:
    apm:
      enabled: false
```

리소스를 적용하고 상태에 변경 사항이 반영되었는지 확인한 후 워크로드를 다시 시작합니다. 기존 포드는 교체될 때까지 계측된 상태로 유지됩니다.

#### 타겟팅 규칙을 사용하여 특정 워크로드 지정 {#use-targeting-rules-to-target-specific-workloads}

타겟팅 규칙을 사용하면(Agent v7.64+에서 사용 가능) 특정 애플리케이션의 추적을 활성화 또는 비활성화할 수 있습니다. 구성 세부 정보는 [고급 옵션](#advanced-options) 섹션을 참조하세요.

#### Datadog Admission Controller 사용 {#use-the-datadog-admission-controller}

대안으로 또는 계측 규칙을 지원하지 않는 에이전트 버전인 경우, 포드에 레이블을 추가하여 포드 변형을 비활성화할 수도 있습니다.

<div class="alert alert-danger">다음 단계를 따르면 SSI를 비활성화할 뿐만 아니라 다른 변형 웹훅도 비활성화합니다. 사용 시 주의하세요.</div>

1. 포드 사양에 대해 `admission.datadoghq.com/enabled:` 레이블을 `"false"`로 설정합니다.
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
   ```
2. 구성을 적용합니다.
   ```shell
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. 계측을 제거하고자 하는 서비스를 재시작합니다.

### 인프라의 모든 서비스에 대하여 APM 제거 {#remove-apm-for-all-services-on-the-infrastructure}

클러스터 전체에서 SSI를 중지하려면 다음 단계를 따르세요.

1. 각 DDI 리소스에서 `spec.config.apm.enabled: false`를 설정하거나 APM 섹션을 제거합니다.
1. 포드 SDK 선택 주석을 제거하고 모든 Remote Configuration 계측 정책을 비활성화합니다.
1. 아래와 같이 Agent 구성 계측을 비활성화합니다.
1. 구성 변경 사항을 적용한 후 애플리케이션 포드를 교체합니다.

구성해야 하는 파일은 Single Step Instrumentation을 Datadog Operator 또는 Helm 중 무엇으로 활성화했는지에 따라 다릅니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml`에서 `instrumentation.enabled=false`를 설정하세요.
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. Datadog Agent를 업데이트된 구성 파일로 배포합니다.
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml`에서 `instrumentation.enabled=false`를 설정합니다.
   ```yaml
   datadog:
     apm:
       instrumentation:
         enabled: false
   ```

2. 다음 명령을 실행합니다.
   ```shell
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
{{% /tab %}}
{{< /tabs >}}

## 모범 사례 {#best-practices}

APM 활성화를 정밀하게 제어하려면 [DatadogInstrumentation(DDI)](#target-specific-workloads)을 사용하여 특정 워크로드를 계측하세요. 소수의 워크로드로 시작하여 트레이스를 검증한 다음 추가 워크로드로 확장합니다.

Agent 구성 타겟팅 규칙을 사용하는 경우 다음 예시에서는 레이블 및 네임스페이스 선택기를 사용하여 계측을 제어하는 방법을 보여줍니다.

{{% collapse-content title="통제된 APM 롤아웃을 위해 옵트인 레이블 사용" level="h3" expanded=false id="opt-in-labels-controlled-apm-rollout" %}}

#### 기본값과 옵트인 계측 {#default-vs-opt-in-instrumentation}
| 모드    | 동작    | 사용해야 하는 경우 |
| ---  | ----------- | ----------- |
| 기본값 | 클러스터에서 모든 지원되는 프로세스가 계측됩니다. | 작은 클러스터 또는 프로토타입. |
| 옵트인 | [계측 규칙][4]을 사용하여 특정 네임스페이스 또는 포드로만 계측을 제한합니다. | 프로덕션 클러스터, 단계적 롤아웃 또는 비용에 민감한 사용 사례. |

#### 예: 특정 포드에 대하여 계측 활성화 {#example-enable-instrumentation-for-specific-pods}

1. 배포 메타데이터와 포드 템플릿 양쪽 모두에 의미 있는 레이블(예: `datadoghq.com/apm-instrumentation: "enabled"`)을 추가합니다.

   ```
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: checkout-api
     labels:
       app: checkout-api
       datadoghq.com/apm-instrumentation: "enabled"   # opt-in label (cluster-wide)
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: checkout-api
     template:
       metadata:
         labels:
           app: checkout-api
           datadoghq.com/apm-instrumentation: "enabled"   # opt-in label must be on *template*, too
           # Unified Service Tags (recommended)
           tags.datadoghq.com/service: "checkout-api"
           tags.datadoghq.com/env:     "prod"
           tags.datadoghq.com/version: "2025-06-10"
       spec:
         containers:
           - name: api
             image: my-registry/checkout:latest
             ports:
               - containerPort: 8080
   ```

2. Datadog Agent Helm 구성에서 SSI를 활성화하고 `podSelector`를 사용하여 일치하는 옵트인 레이블이 있는 포드로만 주입합니다.

   ```
     apm:
       instrumentation:
         enabled: true
         targets:
           - name: apm-instrumented
             podSelector:
               matchLabels:
                 datadoghq.com/apm-instrumentation: "enabled"
   ```

더 많은 예시는 [계측 규칙][4]을 참조하세요.

{{% /collapse-content %}}


{{% collapse-content title="로드할 Datadog SDK 제어" level="h3" expanded=false id="control-loaded-datadog-sdks" %}}

Agent Helm 구성에서 `ddTraceVersions`를 사용하여 Datadog SDK의 언어와 버전을 모두 제어합니다. 이렇게 하면 불필요한 SDK가 다운로드되는 것이 방지되므로 init-container 풋프린트가 최소화되고, 이미지 크기가 감소하며, 좀 더 신중한 트레이서 업그레이드를 할 수 있습니다(예: 규정 준수 요구 사항을 충족하거나 디버깅을 간소화하기 위해).

#### 예: 네임스페이스에 대하여 Java SDK 지정 {#example-specify-a-java-sdk-for-a-namespace}

`login-service` 네임스페이스에서 Java 애플리케이션만 실행됩니다. 다른 SDK를 다운로드하지 않으려면 Agent가 해당 네임스페이스를 대상으로 지정하고 Java SDK 버전 1.48.2만 주입하도록 구성하세요.


```
targets:
  - name: login-service
    namespaceSelector:
      matchNames: ["login-service"]
    ddTraceVersions:
      java: "1.48.2"    # pin version
```

#### 기본 구성 {#default-configuration}

포드와 일치하는 `ddTraceVersions` 규칙이 없으면 기본 대상이 적용됩니다.

```
targets:
  - name: default-target          # tag any pod *without* an override
    ddTraceVersions:
      java:   "1"   # stay on latest v1.x
      python: "3"   # stay on latest v3.x
      js:     "5"   # NodeJS
      php:    "1"
      dotnet: "3"
```

{{% /collapse-content %}}

## 문제 해결 {#troubleshooting}

SSI로 APM 활성화와 관련한 문제가 발생하는 경우, [SSI 문제 해결 가이드][35]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /ko/tracing/glossary/#instrumentation
[4]: /ko/tracing/trace_collection/single-step-apm/kubernetes/#target-specific-workloads
[5]: /ko/getting_started/tagging/unified_service_tagging/?tab=kubernetes#containerized-environment
[7]: /ko/tracing/trace_collection/library_config/
[11]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[12]: https://gcr.io/datadoghq
[13]: https://hub.docker.com/u/datadog
[14]: https://gallery.ecr.aws/datadog
[15]: http://gcr.io/datadoghq/dd-lib-java-init
[16]: http://hub.docker.com/r/datadog/dd-lib-java-init
[17]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[18]: http://gcr.io/datadoghq/dd-lib-js-init
[19]: http://hub.docker.com/r/datadog/dd-lib-js-init
[20]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[21]: http://gcr.io/datadoghq/dd-lib-python-init
[22]: http://hub.docker.com/r/datadog/dd-lib-python-init
[23]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[24]: http://gcr.io/datadoghq/dd-lib-dotnet-init
[25]: http://hub.docker.com/r/datadog/dd-lib-dotnet-init
[26]: http://gallery.ecr.aws/datadog/dd-lib-dotnet-init
[27]: http://gcr.io/datadoghq/dd-lib-ruby-init
[28]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[29]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[30]: http://gcr.io/datadoghq/dd-lib-php-init
[31]: http://hub.docker.com/r/datadog/dd-lib-php-init
[32]: http://gallery.ecr.aws/datadog/dd-lib-php-init
[33]: /ko/containers/guide/changing_container_registry/
[34]: /ko/containers/guide/sync_container_images/#copy-an-image-to-another-registry-using-crane
[35]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[36]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/
[37]: /ko/containers/kubernetes/csi_driver/
[40]: https://app.datadoghq.com/organization-settings/api-keys
[42]: https://app.datadoghq.com/apm/services
[41]: /ko/tracing/guide/injectors/
[43]: /ko/getting_started/site/