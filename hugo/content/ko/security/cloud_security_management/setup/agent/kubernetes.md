---
aliases:
- /ko/security/cloud_security_management/setup/csm_cloud_workload_security/agent/kubernetes/
- /ko/security/cloud_security_management/setup/csm_pro/agent/kubernetes/
- /ko/security/cloud_security_management/setup/csm_enterprise/agent/kubernetes/
code_lang: kubernetes
code_lang_weight: 60
title: Kubernetes에서 Cloud Security 설정하기
type: multi-code-lang
---
다음 지침을 따라 잘못된 구성 및 Vulnerability Management를 활성화하세요.

{{< partial name="security-platform/CSW-billing-note.html" >}}

## 전제 조건 {#prerequisites}

- 최신 Datadog Agent 버전. 설치 지침은 [Agent 시작하기][5]를 참조하거나 [Datadog UI][6]에서 Agent를 설치하세요.

**참고**: SBOM 수집은 Google Kubernetes Engine(GKE)의 이미지 스트리밍 기능과 호환되지 않습니다. 비활성화하려면 GKE 설명서의 [이미지 스트리밍 비활성화][7] 섹션을 참조하세요.

## 설치 {#installation}

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml` 파일의 `spec` 섹션에 다음을 추가합니다.

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # Enables Misconfigurations
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true

        # Enables Software Bill of Materials (SBOM) collection
        sbom:
          enabled: true

          # Enables Container Vulnerability Management
          containerImage:
            enabled: true
            # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
            analyzers: ["os", "languages"]

          # Enables Host Vulnerability Management
          host:
            enabled: true
            # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
            analyzers: ["os", "languages"]

          # Enables runtime package prioritization (Preview, Agent 7.79+)
          # See Runtime Package Prioritization section below.
          enrichment:
            usage:
              enabled: true
    ```

2. 변경 사항을 적용하고 Agent를 재시작합니다.

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml` 파일의 `datadog` 섹션에 다음을 추가합니다.

    ```yaml
    # datadog-values.yaml file
    datadog:
      securityAgent:
        # Enables Misconfigurations
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true

      # Enables Software Bill of Materials (SBOM) collection
      sbom:
        # Enables Container Vulnerability Management
        containerImage:
          enabled: true
          # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
          analyzers: ["os", "languages"]

        # Enables Host Vulnerability Management
        host:
          enabled: true
          # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
          analyzers: ["os", "languages"]

        # Enables runtime package prioritization (Preview, Agent 7.79+)
        # See Runtime Package Prioritization section below.
        enrichment:
          usage:
            enabled: true
    ```

2. Agent를 재시작합니다.

{{% /tab %}}

{{% tab "DaemonSet" %}}

1.  `daemonset.yaml` 파일의 모든 Agent 컨테이너(`agent`, `security-agent` 및 `system-probe` 포함)에 다음 환경 변수를 추가합니다. 이 변수들은 구성 오류, Vulnerability Management, 마운트 기반 컨테이너 이미지 스캔 및 런타임 패키지 우선순위 지정을 활성화합니다.

    ```yaml
    - name: DD_COMPLIANCE_CONFIG_ENABLED
      value: "true"
    - name: DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED
      value: "true"
    - name: DD_SBOM_ENABLED
      value: "true"
    - name: DD_SBOM_CONTAINER_IMAGE_ENABLED
      value: "true"
    - name: DD_SBOM_HOST_ENABLED
      value: "true"
    - name: DD_SBOM_CONTAINER_IMAGE_USE_MOUNT
      value: "true"
    - name: DD_SBOM_ENRICHMENT_USAGE_ENABLED
      value: "true"
    - name: HOST_ROOT
      value: /host/root
    ```

   DaemonSet이 호스트 루트를 다른 경로에 마운트하는 경우, 각 Agent 컨테이너에서 `HOST_ROOT`를 해당 마운트 경로로 설정하세요.

2. 포드 사양에서 `hostPID: true`를 설정하고, `agent` 컨테이너에 다음 `securityContext`를 추가합니다. 이 설정들은 `DD_SBOM_CONTAINER_IMAGE_USE_MOUNT=true`를 사용한 마운트 기반 컨테이너 이미지 스캔에 필요합니다.

    ```yaml
      # Source: datadog/templates/daemonset.yaml
      apiVersion: apps/v1
      kind: DaemonSet
      [...]
      spec:
        [...]
        template:
          [...]
          spec:
            hostPID: true
            containers:
            [...]
              - name: agent
                [...]
                securityContext:
                  capabilities:
                    add:
                      - SYS_ADMIN
                  readOnlyRootFilesystem: true
                  appArmorProfile:
                    type: Unconfined
    ```

3. Agent를 재시작합니다.

{{% /tab %}}

{{< /tabs >}}

**참고**: `enrichment.usage.enabled: true`는 Datadog Agent **7.79.0 이상**이 필요합니다. 요구 사항은 [ 런타임 패키지 우선순위 ](#runtime-package-prioritization-preview) 섹션을 참조하세요.

**참고**: `languages` 분석기는 Datadog Agent **7.70 이상**이 필요합니다. 활성화되면 OS 패키지 외에도 아래 패키지 관리자가 관리하는 애플리케이션 라이브러리의 취약점도 탐지합니다. `analyzers` 필드가 생략되면 Datadog은 컨테이너 이미지의 OS 패키지만 스캔합니다.

### 지원되는 애플리케이션 라이브러리 패키지 관리자 {#supported-application-library-package-managers}

`languages` 분석기는 다음 패키지 에코시스템을 다룹니다.

|  에코시스템 |  패키지 관리자/형식 |
|-----------|------------------------|
| Ruby | Bundler, GemSpec |
| Rust | Cargo, Rust binary |
| PHP | Composer |
| Java | Jar, Maven (pom.xml), Gradle lock, Sbt lock |
| JavaScript | npm (package-lock.json), Yarn, pnpm, Node package |
| .NET | NuGet, .NET Core, PackagesProps |
| Python | Python package (egg), pip, Pipenv, Poetry, uv, Conda package, Conda environment |
| Go | Go binary, Go modules |
| C/C++ | Conan lock |
| Swift / Objective-C | CocoaPods, Swift |
| Dart | PubSpec lock |
| Elixir | Mix lock |
| Julia | Julia |

## 런타임 패키지 우선순위(미리 보기) {#runtime-package-prioritization-preview}

런타임 패키지 우선순위 지정은 컨테이너 이미지 내에서 어떤 패키지가 런타임에 사용되는지 식별하여, 설치되었지만 실행되지 않는 패키지보다 실제로 실행되는 코드의 취약점을 우선적으로 처리할 수 있도록 합니다.

활성화되면 Agent는 eBPF를 사용하여 워크로드의 파일 액세스를 관찰하고, 이러한 신호를 해당 이미지의 취약점 결과에 추가합니다.

|  신호 |  제공 정보 |
|--------|-------------------|
|  패키지 실행 중 |  실행 중인 프로세스가 패키지 파일에 액세스하는 것이 관찰되었습니다. |
| 루트 프로세스에 의해 액세스됨 | 패키지가 루트(UID 0)로 실행 중인 프로세스에 의해 액세스되었습니다. |
| SUID 바이너리 존재 | 패키지에 SUID 비트가 설정된 바이너리가 포함되어 있어 권한 상승이 가능할 수 있습니다. |

*"패키지 실행 중"*은 [Runtime Prioritization Engine][9]의 **Reachability** 차원에 데이터를 제공합니다. 이 신호를 직접 쿼리하려면 [런타임 신호별 결과 필터링][10]을 참조하세요.

**요구 사항**:
- Datadog Agent **7.79.0 이상**. Kubernetes의 경우, 가장 완벽한 신호 적용 범위를 확보하려면 **7.81.0 이상**을 사용하세요.
- Linux 전용(eBPF 종속성). 지원되는 배포판 및 커널 버전은 [Workload Protection 설정][11]을 참조하세요.

런타임 신호는 컨테이너 이미지 취약점 탐지 결과에서 운영 체제 패키지 관리자(`apt`, `yum` 또는 `apk`)를 통해 설치된 패키지에 적용됩니다.

{{< tabs >}}

{{% tab "Datadog Operator" %}}

`enrichment` 블록을 `datadog-agent.yaml` 파일의 `sbom` 섹션에 추가하세요.

```yaml
spec:
  features:
    sbom:
      enabled: true
      containerImage:
        enabled: true
      # Enables runtime package prioritization (Preview, Agent 7.79+)
      enrichment:
        usage:
          enabled: true
```

변경 사항을 적용하고 Agent를 재시작하세요.

{{% /tab %}}

{{% tab "Helm" %}}

`enrichment` 블록을 `datadog-values.yaml` 파일의 `sbom` 섹션에 추가하세요.

```yaml
datadog:
  sbom:
    containerImage:
      enabled: true
    # Enables runtime package prioritization (Preview, Agent 7.79+)
    enrichment:
      usage:
        enabled: true
```

Agent를 재시작하세요

{{% /tab %}}

{{% tab "DaemonSet" %}}

포드 사양에서 `hostPID: true`를 설정하고, `daemonset.yaml` 파일에서 `agent`, `security-agent` 및 `system-probe`를 비롯한 모든 Agent 컨테이너에 다음 환경 변수를 추가하세요.

```yaml
# Pod spec
hostPID: true

# Add to each Agent container's env section.
- name: DD_SBOM_ENABLED
  value: "true"
- name: DD_SBOM_CONTAINER_IMAGE_ENABLED
  value: "true"
- name: DD_SBOM_ENRICHMENT_USAGE_ENABLED
  value: "true"
```

Agent를 재시작하세요

{{% /tab %}}

{{< /tabs >}}

설정을 확인하려면 [런타임 신호][10]별로 취약점 결과를 필터링하세요.

[1]: /ko/security/cloud_security_management/misconfigurations/
[2]: /ko/security/threats
[3]: /ko/security/cloud_security_management/vulnerabilities
[4]: /ko/security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /ko/getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable
[8]: /ko/security/workload_protection/
[9]: /ko/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[10]: /ko/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[11]: /ko/security/workload_protection/setup/