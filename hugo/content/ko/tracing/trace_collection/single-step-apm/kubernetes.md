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
  text: 로컬 SDK 주입을 사용한 애플리케이션 계측
- link: https://learn.datadoghq.com/courses/configuring-ssi-k8s
  tag: 학습 센터
  text: Kubernetes에서 Single Step Instrumentation 구성
title: Kubernetes에서 Single Step APM Instrumentation 사용
type: multi-code-lang
---
## 개요 {#overview}

Kubernetes 환경에서는 APM에 Single Step Instrumentation(SSI)을 사용하여 Datadog Agent를 설치하고 Datadog SDK를 사용해 애플리케이션을 한 단계 만에 [계측][3]하세요.

## 요구 사항 {#requirements}

- Kubernetes v1.20+.
- Datadog Operator 배포를 위한 [`Helm`][1].
- Datadog Agent 설치를 위한 [`Kubectl` CLI][2].
- [Single Step Instrumentation 호환성 가이드][36]에 따라 확인된 환경 호환성.


## 애플리케이션에서 APM 활성화 {#enable-apm-on-your-applications}

<div class="alert alert-info">Single Step Instrumentation은 Datadog Agent가 설치된 네임스페이스의 애플리케이션을 계측하지 않습니다. Agent를 애플리케이션을 실행하지 않는 별도의 네임스페이스에 설치하세요.</div>

클러스터 전체에서 Single Step Instrumentation을 활성화하려면 다음 단계를 따르세요. 이렇게 하면 지원되는 언어로 작성된 모든 애플리케이션에서 자동으로 트레이스를 전송합니다.

**참고:** 특정 네임스페이스 또는 포드만 계측하려면 [고급 옵션](#advanced-options)의 워크로드 대상 지정을 참조하세요.

1. Datadog에서 [Kubernetes에 Datadog Agent 설치][11] 페이지로 이동합니다.
1. 화면의 지침에 따라 설치 방법을 선택하고, API 키를 선택하고 Operator 또는 Helm 리포지토리를 설정합니다.
1. **구성 `datadog-agent.yaml`** 섹션에서 **추가 구성** > **Application Observability**로 이동하여 **APM Instrumentation**을 켭니다.

   {{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="Datadog 앱을 통해 Kubernetes에 Datadog Agent를 설치하기 위한 구성 블록" style="width:100%;" >}}

1. 생성된 구성 파일을 사용하여 Agent를 배포합니다.
1. 애플리케이션을 재시작하세요.

<div class="alert alert-info">SSI는 계측된 애플리케이션에 약간의 시작 시간을 추가합니다. 사용 사례에서 이 오버헤드를 수용할 수 없는 경우, <a href="/help/">Datadog 지원팀</a>에 문의하세요.</div>

## Unified Service Tags 구성 {#configure-unified-service-tags}

Unified Service Tags(UST)는 트레이스, 메트릭, 로그에 일관된 태그를 적용해 탐색 및 관측 가능성 데이터 상호 연계가 간편합니다. UST는 자동 레이블 추출(권장)을 통해 구성할 수도 있고, `ddTraceConfigs`를 사용한 명시적 구성을 통하거나 배포 매니페스트에서 구성할 수도 있습니다.

<div class="alert alert-warning">
<a href="/agent/remote_config/">Remote Configuration</a>을 사용하는 경우, <a href="#recommended-configure-usts-through-automatic-label-extraction">자동 레이블 추출</a>이 호환되지 않습니다. 다음을 사용해 <a href="#configure-usts-explicitly-with-ddtraceconfigs">명시적으로 UST를 구성</a>해야 합니다. <code>ddTraceConfigs</code>.
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

다음 예시의 `app.kubernetes.io/name`를 서비스 이름이 포함된 레이블로 교체하세요(예: `service.kubernetes.io/name` 또는 `component`). 이렇게 하면 레이블 여러 개를 구성할 수 있습니다.

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

- **[워크로드 대상 지정을 사용하여 구성(권장)](#target-specific-workloads)**:

  기본적으로 Single Step Instrumentation은 모든 네임스페이스의 모든 서비스를 계측합니다. 워크로드 대상 지정을 사용하여 계측을 특정 네임스페이스, 포드 또는 워크로드로만 제한하고 사용자 지정 구성을 적용하세요.

- **[환경 변수 설정][7]**:

  애플리케이션 구성에서 직접 환경 변수를 설정하여 제품을 활성화합니다.

## 고급 옵션{#advanced-options}

다음 고급 옵션을 사용하여 Single Step Instrumentation이 환경에서 어떻게 동작할지 사용자 지정할 수 있습니다. 이러한 설정은 선택 사항이며 일반적으로 특수 설정에서만 필요합니다.

### 주입 모드 구성 {#configure-injection-modes}

SSI는 여러 가지 주입 모드를 지원합니다. 주입 모드는 인젝터와 APM 라이브러리 파일이 애플리케이션 컨테이너에 전송되는 방식을 제어합니다. 일반적으로 이 설정을 수동으로 구성할 필요가 없습니다. 포드 시작이 많이 지연되는 것이 눈에 띄거나, 포드 초기화 중에 리소스 사용량이(CPU, 메모리) 예상보다 많은 경우 이 설정을 조정하는 것을 고려해 보세요. 인젝터의 작동 원리에 관한 자세한 내용은 [Single Step Instrumentation 사용 시 인젝터 동작][41]을 참조하세요.


| 모드 | 설명 | 요구 사항 |
|------|-------------|--------------|
| `init_container` | init 컨테이너를 사용하여 인젝터 및 APM 라이브러리 파일을 애플리케이션 컨테이너로 복사합니다. | Helm Chart 또는 Datadog Operator로 배포된 Agent |
| `csi` | **미리 보기 상태입니다.** [Datadog CSI 드라이버][37]를 사용하여 인젝터 또는 APM 라이브러리 파일을 마운팅합니다. init 컨테이너 모드보다 포드 시작 시간이 단축됩니다. | Agent 7.76.0+, CSI driver 1.2.0+, Helm Chart 3.178.1+ 또는 Datadog Operator 1.25.0+ |

`csi` 모드를 사용하기 전에 Datadog CSI 드라이버를 설치하고 활성화하세요. Helm을 사용하여 배포하는 경우, `datadog-values.yaml`에서 `datadog.csi.enabled: true`도 설정하세요. 설치 단계 및 GKE Autopilot과 같은 환경별 요구 사항은 [CSI 드라이버 설명서][37]를 참조하세요.

#### 전역적으로 주입 모드 구성 {#configure-injection-mode-globally}

{{< tabs >}}
{{% tab "Helm" %}}

클러스터 전체에 주입 모드를 설정하려면 `datadog-values.yaml`에 `injectionMode` 추가:

```yaml
datadog:
  apm:
    instrumentation:
      injectionMode: <mode>
```

지원되는 값: `init_container`, `csi`.

{{% /tab %}}
{{% tab "Datadog Operator" %}}

클러스터 전체에 주입 모드를 설정하려면 `datadog-agent.yaml`에 `injectionMode` 추가:

```yaml
features:
  apm:
    instrumentation:
      injectionMode: <mode>
```

지원되는 값: `init_container`, `csi`.

Datadog Operator 1.25.0 이전 버전을 사용하는 경우, [포드 어노테이션](#configure-injection-mode-per-pod)을 사용하여 특정 포드의 주입 모드를 재정의합니다.

{{% /tab %}}
{{< /tabs >}}

#### 포드당 주입 모드 구성 {#configure-injection-mode-per-pod}

특정 포드의 주입 모드를 재정의하려면 포드 사양에 다음 어노테이션 추가:

```yaml
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.injection-mode: "<mode>"
```

지원되는 값: `init_container`, `csi`.

### 특정 워크로드 대상 {#target-specific-workloads}

기본적으로 SSI는 클러스터의 모든 네임스페이스에 속한 모든 서비스를 계측합니다. Agent 버전에 따라 다음 구성 방법 중 하나를 사용하여 어느 서비스가 어떻게 계측될지 미세 조정하세요.

{{< tabs >}}

{{% tab "Agent v7.64+(권장)" %}}

`targets` 레이블을 사용하여 대상 지정 블록을 생성해 어느 워크로드를 계측하고 어느 구성을 적용할지 지정합니다.

각 대상 블록에 다음 키가 있습니다.

| 키             | 설명 |
|------------------|-------------|
| `name`            | 대상 블록의 이름입니다. 이것은 모니터링 상태에는 아무런 영향을 미치지 않고 메타데이터로만 사용됩니다. |
| `namespaceSelector` | 계측할 네임스페이스입니다. 다음 중 하나 이상을 사용하여 지정:<br> - `matchNames`: 하나 이상의 네임스페이스 이름 목록. <br> - `matchLabels`: `{key,value}` 쌍에서 정의된 하나 이상의 레이블 목록. <br> - `matchExpressions`:네임스페이스 선택기 요구 사항 목록. <br><br> 네임스페이스가 일치하려면 모든 기준을 충족해야 합니다. 자세한 내용은 [Kubernetes 선택기 설명서][10]를 참조하세요.|
| `podSelector`     | 계측할 포드입니다. 다음 중 하나 이상을 사용하여 지정: <br> - `matchLabels`: `{key,value}` 쌍에서 정의된 하나 이상의 레이블 목록. <br> - `matchExpressions`: 포드 선택기 요구 사항 목록. <br><br> 포드가 일치하려면 모든 기준을 충족해야 합니다. 자세한 내용은 [Kubernetes 선택기 설명서][10]를 참조하세요. |
| `ddTraceVersions` | 각 언어에 사용할 [Datadog APM SDK][9] 버전입니다. |
| `ddTraceConfigs`  | [Unified Service Tags][8] 설정, 트레이싱 외 [SDK 종속적 제품](#enable-sdk-dependent-products-and-features) 활성화, 기타 [APM 설정][14] 사용자 지정을 지원하는 APK SDK 구성입니다. |

구성해야 하는 파일은 Single Step Instrumentation을 활성화한 방식에 따라 다름:
- SSI를 Datadog Operator로 활성화한 경우, `datadog-agent.yaml`을 편집합니다..
- SSI를 Helm으로 활성화한 경우, `datadog-values.yaml`을 편집합니다.

**참고**: 대상은 순서대로 평가되며, 첫 번째 일치 항목이 우선합니다.

#### 구성 예시{#example-configurations}

특정 서비스를 선택하는 방법에 관한 다음 예시 참조:

{{< collapse-content title="예 1: 하나만 빼고 모든 네임스페이스 활성화" level="h4" >}}

이 구성:
- 사용 시 `jenkins` 네임스페이스를 제외한 모든 네임스페이스에 대하여 APM을 활성화합니다.
  - **참고**: 목록에 나열된 것을 제외하고 모든 네임스페이스에 대하여 비활성화하려면 `enabledNamespaces`를 사용하세요.
- Datadog에 Java 애플리케이션은 기본 Java SDK로, Python 애플리케이션은 Python SDK의 `v.3.1.0`를 사용하여 계측하도록 지시합니다.

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

{{< collapse-content title="예 2: 이름 및 레이블이 일치하는 네임스페이스의 부분 집합을 계측" level="h4" >}}

이 구성을 사용하면 대상 블록을 두 개 생성합니다.

- 첫 번째 블록(이름 `login-service_namespace`):
  - 네임스페이스 `login-service`의 서비스에 대하여 APM을 활성화합니다.
  - Datadog에 이 네임스페이스의 서비스를 Java SDK 기본 버전으로 계측하도록 지시합니다.
  - 이 대상 그룹에 대하여 환경 변수 `DD_PROFILING_ENABLED` 설정
- 두 번째 블록(이름 `billing-service_apps`)
  - 레이블 `app:billing-service`가 있는 네임스페이스의 서비스에 대하여 APM을 활성화합니다.
  - Datadog에 이 서비스 세트를 Python SDK `v3.1.0`로 계측하도록 지시합니다.

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

{{< collapse-content title="예 3: 다양한 워크로드를 다양한 트레이서로 계측" level="h4" >}}

이 구성이 하는 일은 다음과 같습니다.
- 다음 레이블이 있는 포드에 대하여 APM 활성화:
  - `app:db-user`, 이 레이블은 `db-user` 애플리케이션을 실행하는 포드를 나타냅니다.
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

{{< collapse-content title="예 4: 네임스페이스 내 포드 계측" level="h4" >}}

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

{{< collapse-content title="예 5: 다음을 사용하여 포드의 부분 집합 계측 <code>matchExpressions</code>" level="h4" >}}

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

{{< collapse-content title="예 6: 다음을 사용하여 추가적인 제품 활성화 <code>ddTraceConfigs</code>" level="h4" >}}

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

{{% tab "Agent <=v7.63(레거시)" %}}

#### 네임스페이스의 계측 활성화 또는 비활성화 {#enable-or-disable-instrumentation-for-namespaces}

특정 네임스페이스에서 애플리케이션의 계측을 활성화 또는 비활성화할 수 있습니다. enabledNamespaces 또는 disabledNamespaces 중 하나만 설정할 수 있고, 둘 다는 안 됩니다.

구성해야 하는 파일은 Single Step Instrumentation을 Datadog Operator 또는 Helm 중 무엇으로 활성화했는지에 따라 다릅니다.

{{< collapse-content title="Datadog Operator" level="h5" >}}

특정 네임스페이스의 계측을 활성화하려면 `datadog-agent.yaml`에 `enabledNamespaces` 구성 추가:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces: # Add namespaces to instrument
           - default
           - applications
{{< /highlight >}}

특정 네임스페이스의 계측을 비활성화하려면 `datadog-agent.yaml`에 `disabledNamespaces` 구성 추가:

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

특정 네임스페이스의 계측을 활성화하려면 `datadog-values.yaml`에 `enabledNamespaces` 구성 추가:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces: # Add namespaces to instrument
             - namespace_1
             - namespace_2
{{< /highlight >}}

특정 네임스페이스의 계측을 비활성화하려면 `datadog-values.yaml`에 `disabledNamespaces` 구성 추가:

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

Datadog SDK와 그 버전을 지정하면 해당 언어로 작성된 애플리케이션이 자동으로 계측됩니다. 이것은 두 가지 방식으로 구성할 수 있으며, 다음과 같은 우선순위 순서대로 적용됩니다.

1. [서비스 수준에서 지정](#specify-at-the-service-level) 또는
2. [클러스터 수준에서 지정](#specify-at-the-cluster-level).

**기본값**: 라이브러리 버전을 지정하지 않으면, 지원되는 언어로 작성된 애플리케이션이 최신 SDK 버전을 사용하여 자동으로 계측됩니다.

##### 서비스 수준에서 지정 {#specify-at-the-service-level}

특정 포드의 애플리케이션을 자동으로 계측하려면 포드 사양의 애플리케이션에 적절한 언어 어노테이션 및 라이브러리 버전 추가:

| 언어   | 포드 어노테이션                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |
| PHP        | `admission.datadoghq.com/php-lib.version: "<CONTAINER IMAGE TAG>"`   |

`<CONTAINER IMAGE TAG>`를 원하는 라이브러리 버전으로 교체하세요. 사용 가능한 버전은 [Datadog 컨테이너 레지스트리](#change-the-default-image-registry) 및 각 언어의 트레이서 소스 리포지토리에 목록으로 나열되어 있습니다.

- [Java][34]
- [Node.js][35]
- [Python][36]
- [.NET][37]
- [Ruby][38]
- [PHP][39]

메이저 라이브러리 릴리스로 인해 이전 버전과 호환되지 않는 변경 사항이 도입될 수 있으므로 <div class="alert alert-danger"> <code>latest</code> 태그를 사용할 때는 주의해야 합니다.</div>

예를 들어 Java 애플리케이션을 자동으로 계측하려면:

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

어노테이션을 사용해 특정 포드의 자동 계측을 활성화하지 않은 경우, SSI 구성을 사용해 클러스터 전체를 어느 언어로 계측할지 지정할 수 있습니다. `apm.instrumentation.libVersions`가 설정된 경우, 지정된 언어로 작성된 애플리케이션만 지정된 라이브러리 버전을 사용하여 계측됩니다.

구성해야 하는 파일은 Single Step Instrumentation을 Datadog Operator 또는 Helm 중 무엇으로 활성화했는지에 따라 다릅니다.

{{< collapse-content title="Datadog Operator" level="h5" >}}

예를 들어 .NET, Python, Node.js 애플리케이션을 계측하려면 `datadog-agent.yaml` 파일에 다음 구성 파일 추가:

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

{{< collapse-content title="Helm" level="h5" >}}

예를 들어 .NET, Python, Node.js 애플리케이션을 계측하려면 `datadog-values.yaml` 파일에 다음 구성 파일 추가:

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

### 기본 이미지 레지스트리 변경 {#change-the-default-image-registry}

Datadog은 계측 라이브러리 이미지를 gcr.io, Docker Hub, Amazon ECR에 게시:

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

SSI를 프라이빗 컨테이너 레지스트리와 함께 사용하는 방법:

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
   - `ddTraceVersions`를 사용하여 Agent 구성에서 전역적으로, 또는
   - `admission.datadoghq.com/java-lib.version`과 같은 어노테이션을 사용하여 포드당.

   명시적으로 구성된 버전이 없으면 기본 버전(`0`)이 사용됩니다.

   예:

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

3. 프라이빗 레지스트리를 사용하려면 Cluster Agent 구성을 업데이트하세요.

   프라이빗 레지스트리를 사용하려면 Cluster Agent 구성에서 `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` 환경 변수를 설정하세요.

컨테이너 레지스트리 변경에 관한 자세한 내용은 [컨테이너 레지스트리 변경][33]을 참조하세요.

### EKS에서 Container Network Interface 사용{#using-a-container-network-interface-on-eks}

Calico와 같은 CNI를 사용하는 경우,컨트롤 플레인 노드가 Datadog의 Admission Controller로의 네트워크 연결을 시작할 수 없고 "Address is not allowed(주소가 허용되지 않음)" 오류를 보고합니다.
Single Step instrumentation을 사용하려면 Datadog의 Cluster Agent를 `useHostNetwork: true` 파라미터를 사용해 수정하세요.

```
datadog:
  ...

clusterAgent:
  useHostNetwork: true

  admissionController:
    ...
```

## Agent에서 Single Step APM 계측 제거 {#remove-single-step-apm-instrumentation-from-your-agent}

특정 서비스, 호스트, VM 또는 컨테이너의 트레이스 데이터를 수집하지 않고자 하는 경우, 다음 단계를 따르세요.

### 특정 서비스의 계측 제거 {#remove-instrumentation-for-specific-services}

특정 서비스에서 APM 계측을 제거하고 트레이스 보내기를 중단하려면 다음 중 한 가지 작업을 수행합니다.

#### 특정 워크로드를 대상으로 지정하는 계측 규칙 사용(권장) {#use-instrumentation-rules-to-target-specific-workloads-recommended}

계측 규칙을 사용하면(Agent v7.64+에서 사용 가능) 특정 애플리케이션의 추적을 활성화 또는 비활성화할 수 있습니다. [여기에서 구성 세부 정보를 참조하세요](#advanced-options).

#### Datadog Admission Controller 사용 {#use-the-datadog-admission-controller}

대안으로, 또는 계측 규칙을 지원하지 않는 에이전트 버전인 경우, 포드에 레이블을 추가하여 포드 변형을 비활성화할 수도 있습니다.

<div class="alert alert-danger">다음 단계를 따르면 SSI를 비활성화할 뿐만 아니라 다른 변형 웹훅도 비활성화합니다. 사용 시 주의하세요.</div>

1. `admission.datadoghq.com/enabled:` 레이블을 포드 사양의 `"false"`에 대하여 설정:
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
   ```
2. 구성 적용:
   ```shell
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. 계측을 제거하고자 하는 서비스를 재시작합니다.

### 인프라의 모든 서비스에 대하여 APM 제거 {#remove-apm-for-all-services-on-the-infrastructure}

트레이스 생성을 중단하려면 APM을 제거하고 인프라를 재시작:

구성해야 하는 파일은 Single Step Instrumentation을 Datadog Operator 또는 Helm 중 무엇으로 활성화했는지에 따라 다릅니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml`에서 `instrumentation.enabled=false` 설정:
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. Datadog Agent를 업데이트된 구성 파일로 배포:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml`에서 `instrumentation.enabled=false` 설정:
   ```yaml
   datadog:
     apm:
       instrumentation:
         enabled: false
   ```

2. 다음 명령 실행:
   ```shell
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
{{% /tab %}}
{{< /tabs >}}

## 모범 사례 {#best-practices}

SSI를 활성화하고 나면 몇 분 안에 클러스터의 모든 지원되는 프로세스가 자동으로 계측되며 트레이스를 생성하기 시작합니다.

APM이 어디에서 활성화되는지 제어하고 오버헤드를 줄이려면 다음 모범 사례를 고려하세요.

{{% collapse-content title="통제된 APM 롤아웃을 위해 옵트인 레이블 사용" level="h3" expanded=false id="id-for-anchoring" %}}

#### 기본값 vs. 옵트인 계측 {#default-vs-opt-in-instrumentation}
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


{{% collapse-content title="로드할 Datadog SDK 제어" level="h3" expanded=false id="id-for-anchoring" %}}

Agent Helm 구성에서 `ddTraceVersions`를 사용하여 Datadog SDK의 언어와 버전을 모두 제어합니다. 이렇게 하면 불필요한 SDK가 다운로드되는 것을 방지하므로 init 컨테이너 풋프린트가 최소화되고, 이미지 크기가 감소하며 좀 더 신중한 트레이서 업그레이드를 할 수 있습니다(예를 들어 규정 준수 요구 사항에 충족하기 위해, 또는 디버깅 간소화를 위해).

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
[4]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=agentv764recommended#configure-instrumentation-for-namespaces-and-pods
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
[41]: /ko/tracing/guide/injectors/