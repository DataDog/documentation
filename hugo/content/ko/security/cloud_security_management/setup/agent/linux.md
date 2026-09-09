---
aliases:
- /ko/security/cloud_security_management/setup/csm_cloud_workload_security/agent/linux
- /ko/security/cloud_security_management/setup/csm_pro/agent/linux/
- /ko/security/cloud_security_management/setup/csm_enterprise/agent/linux/
code_lang: linux
code_lang_weight: 80
title: Linux에서 Cloud Security 설정
type: multi-code-lang
---
다음 지침을 따라 잘못된 구성 및 Vulnerability Management를 활성화하세요.

{{< partial name="security-platform/CSW-billing-note.html" >}}


## 전제 조건 {#prerequisites}

- Datadog Agent 버전 `7.46` 이상.

## 설치 {#installation}

패키지 기반 배포의 경우, 패키지 관리자를 사용하여 [Datadog 패키지를 설치][6]한 후 아래에 나열된 파일을 업데이트하세요.

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true

# Vulnerabilities are evaluated and scanned against your containers and hosts every hour.
sbom:
  enabled: true
  # Set to true to enable Container Vulnerability Management
  container_image:
    enabled: true
    # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
    analyzers: ["os", "languages"]
  # Set to true to enable Host Vulnerability Management
  host:
    enabled: true
    # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
    analyzers: ["os", "languages"]
  # Enables runtime package prioritization (Preview, Agent 7.79+)
  # See Runtime Package Prioritization section below.
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

**참고**: `enrichment.usage.enabled: true`는 Datadog Agent **7.79.0 이상**이 필요합니다. 요구 사항은 [ 런타임 패키지 우선순위 ](#runtime-package-prioritization-preview) 섹션을 참조하세요.

{{< code-block lang="bash" filename="/etc/datadog-agent/security-agent.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true
{{< /code-block >}}

**참고**: `languages` 분석기는 Datadog Agent **7.70 이상**이 필요합니다. 활성화되면 OS 패키지 외에도 npm, pip, Maven/Gradle, NuGet, Go modules, Cargo, Bundler와 같은 패키지 관리자가 관리하는 애플리케이션 라이브러리의 취약성을 탐지합니다. `analyzers` 필드가 생략되면 컨테이너 이미지에 대해 OS 패키지만 스캔됩니다. 전체 목록을 보려면 [지원되는 애플리케이션 라이브러리 패키지 관리자](#supported-application-library-package-managers)를 참조하세요.

### 지원되는 애플리케이션 라이브러리 패키지 관리자 {#supported-application-library-package-managers}

`languages` 분석기는 다음 패키지 에코시스템을 다룹니다.

| 에코시스템 | 패키지 관리자/형식 |
|-----------|--------------------------|
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

| 신호 | 제공 정보 |
|--------|-------------------|
| 패키지 실행 중 | 실행 중인 프로세스가 패키지 파일에 액세스하는 것이 관찰되었습니다. |
| 루트 프로세스에 의해 액세스됨 | 패키지가 루트(UID 0)로 실행 중인 프로세스에 의해 액세스되었습니다. |
| SUID 바이너리 존재 | 패키지에 SUID 비트가 설정된 바이너리가 포함되어 있어 권한 상승이 가능할 수 있습니다. |

*패키지 실행 중*은 [Runtime Prioritization Engine][8]의 **Reachability** 차원에 데이터를 제공합니다. 이 신호를 직접 쿼리하려면 [런타임 신호별 결과 필터링][9]을 참조하세요.

**요구 사항**:
- Datadog Agent **7.79.0 이상**.
- Linux 전용(eBPF 종속성). 지원되는 배포판 및 커널 버전은 [Workload Protection 설정][10]을 참조하세요.

런타임 신호는 컨테이너 이미지 취약점 탐지 결과에서 운영 체제 패키지 관리자(`apt`, `yum` 또는 `apk`)를 통해 설치된 패키지에 적용됩니다.

`enrichment` 블록을 `datadog.yaml` 파일의 `sbom` 섹션에 추가하세요.

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
sbom:
  enabled: true
  container_image:
    enabled: true
  # Enables runtime package prioritization (Preview, Agent 7.79+)
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

변경 사항을 적용한 후 Agent를 재시작하세요.

설정을 검증하려면 [런타임 신호][9]별로 취약성 결과를 필터링하세요.

**참고**:

- 다음 [Agent 설치 스크립트][5]를 사용하여 잘못된 구성 및 위협 탐지를 자동으로 활성화할 수도 있습니다.

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- Agent 설치 스크립트를 사용하여 잘못된 구성 및 Vulnerability Management를 활성화하는 경우, `datadog.yaml` 파일을 수동으로 업데이트하여 잘못된 구성에 대해 `host_benchmarks`를 활성화하고, Vulnerability Management에 대해 `sbom` 및 `container_image`를 활성화해야 합니다.

```shell
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/security-agent.yaml
```

[1]: /ko/security/cloud_security_management/misconfigurations/
[2]: /ko/security/threats
[3]: /ko/security/cloud_security_management/vulnerabilities
[4]: /ko/security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /ko/getting_started/agent/#installation
[6]: /ko/agent/?tab=Linux
[7]: /ko/security/workload_protection/
[8]: /ko/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[9]: /ko/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[10]: /ko/security/workload_protection/setup/