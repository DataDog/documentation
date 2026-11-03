---
aliases:
- /ko/continuous_integration/setup_pipelines/jenkins
further_reading:
- link: /continuous_integration/pipelines
  tag: 문서
  text: 파이프라인 실행 결과 및 성능 탐색하기
- link: /continuous_integration/pipelines/custom_commands/
  tag: 문서
  text: 개별 명령을 추적하여 Pipeline Visibility 확장하기
- link: /continuous_integration/troubleshooting/
  tag: 문서
  text: CI Visibility 문제 해결하기
title: Jenkins용 CI Visibility 설정
---
## 개요 {#overview}

[Jenkins][19]는 지속적 통합 및 전달 기능을 갖춘 자동화 서버입니다. 플러그인 아키텍처를 통해 Jenkins는 모든 CI/CD 요구 사항에 맞게 사용자 지정할 수 있으며 프로젝트 개발, 테스트 및 배포의 모든 측면을 자동화합니다.

파이프라인 실행의 다양한 단계에서 데이터를 수집하고, 성능 병목 현상을 식별하며, 운영 문제를 해결하고, 배포 프로세스를 개선할 수 있도록 Jenkins에 맞춰 CI Visibility를 설정할 수 있습니다.

### 호환성 {#compatibility}

| Pipeline Visibility | 플랫폼 | 정의                                                                                               |
|---|---|----------------------------------------------------------------------------------------------------------|
| [수동 단계][20] | 수동 단계 | 수동으로 트리거된 파이프라인을 조회합니다.                                                                       |
| [대기 시간][21] | 대기 시간 | 파이프라인의 작업이 처리되기 전에 대기열에 남아있는 시간을 조회합니다.                                |
| 로그 상관관계 | 로그 상관관계 | 파이프라인 스팬을 로그와 상호 연관시킵니다. [로그 스토리지][10]가 필요합니다.                                   |
| 인프라 메트릭 상관관계 | 인프라 메트릭 상관관계 | Jenkins Worker에 대해 작업을 [인프라 호스트 메트릭][11]과 상호 연관시킵니다.                                 |
| [사용자 지정 스팬][26] | 사용자 지정 스팬 | 파이프라인에 대한 사용자 지정 스팬을 구성합니다.                                                               |
| 사용자 지정 사전 정의 태그 | 사용자 지정 사전 정의 태그 | 생성된 모든 파이프라인, 스테이지 및 작업 스팬에 [사용자 지정 태그][12]를 설정합니다.                                  |
| [런타임 시][22] [사용자 지정 태그 및 측정값][23] | 런타임 시 사용자 지정 태그 및 측정값 | 런타임 시 [사용자 지정 태그 및 측정값][12]을 구성합니다.                                                     |
| [파라미터][24] | 파라미터 | 파이프라인이 트리거될 때 사용자 지정 파라미터(예: 기본 브랜치 이름 또는 Git 정보)를 설정합니다. |
| [파이프라인 실패 원인][25] | 파이프라인 실패 원인 | 오류 메시지에서 파이프라인 실패 원인을 파악합니다.                                                   |
| [실행 중인 파이프라인][32] | 실행 중인 파이프라인 | 실행 중인 파이프라인을 조회합니다. Jenkins 플러그인 버전 8.0.0 이상이 필요합니다.                      |
| [임계 경로의 CI 작업 필터링][33] | 임계 경로의 CI 작업 필터링 | 임계 경로에 있는 작업별로 필터링합니다. |
| [실행 시간][34] | 실행 시간  | 파이프라인이 작업을 실행하는 데 걸린 시간을 조회합니다. |

다음 Jenkins 버전이 지원됩니다.

- Jenkins >= 2.346.1

이 통합은 Agentless 및 Agent 기반 설치를 둘 다 지원합니다.
인프라 메트릭 상관관계를 위해서는 Agent 설치가 필요합니다.

### 용어 {#terminology}

이 표는 Datadog CI Visibility와 Jenkins 간의 개념 매핑 관계를 보여줍니다.

| Datadog  | Jenkins  |
|----------|----------|
| 파이프라인 | 파이프라인 |
| 스테이지    | 스테이지    |
| 작업      | 단계     |

## Datadog Agent 설치 {#install-the-datadog-agent}

인프라 메트릭 상관관계가 필요하지 않은 경우 이 단계를 건너뛰세요.

[Agent 설치 지침][14]에 따라 Jenkins 컨트롤러 노드와 Worker 노드에 Datadog Agent를 설치하세요.

Jenkins 컨트롤러와 Datadog Agent가 Kubernetes 클러스터에 배포된 경우 [Admission Controller][2]를 사용하는 것이 좋습니다. 이 컨트롤러는 Jenkins 컨트롤러 포드에서 `DD_AGENT_HOST` 환경 변수를 자동으로 설정하여 로컬 Datadog Agent와 통신하도록 합니다.

Jenkins 작업 로그를 Datadog에 보고하려면 Agent에서 TCP를 통한 사용자 지정 로그 수집이 [활성화 및 구성][29]되어 있는지 확인하세요.

Agent가 컨테이너에서 실행 중인 경우에는 컨테이너에 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` 환경 변수를 추가하고 Jenkins 컨트롤러에서 다음 포트에 액세스할 수 있는지 확인하세요.
- [DogStadsD][30] 포트, 기본값: `8125/udp`
- [APM 트레이스 포트][31], 기본값: `8126/tcp`
- [로그 수집 포트][29], 기본값: `10518/tcp`

<div class="alert alert-info">UNIX 도메인 소켓을 통한 CI Visibility 트레이스 전송은 지원되지 않습니다.</div>

## Datadog Jenkins 플러그인 설치 {#install-the-datadog-jenkins-plugin}

<div class="alert alert-info">데이터를 Datadog으로 보고하기 위해 Agentless 모드 또는 Agent 기반 모드 중 무엇을 선택하든, 플러그인을 <strong>반드시</strong> 사용해야 합니다.</div>

[Datadog Jenkins 플러그인][3] v3.1.0 이상을 설치하고 활성화하세요.

1. Jenkins 인스턴스 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Manage Plugins{{< /ui >}}로 이동합니다.
2. [Update Center][4]의 {{< ui >}}Available{{< /ui >}} 탭에서 {{< ui >}}Datadog Plugin{{< /ui >}}을 검색합니다.
3. 플러그인 옆의 확인란을 선택하고 화면 하단에 있는 설치 버튼 2개 중 하나를 사용하여 설치합니다.
4. 플러그인이 설치되었는지 확인하려면 {{< ui >}}Installed{{< /ui >}} 탭에서 {{< ui >}}Datadog Plugin{{< /ui >}}을 검색합니다.

## Datadog Jenkins 플러그인 구성 {#configure-the-datadog-jenkins-plugin}

Datadog Jenkins 플러그인을 구성하는 방법은 여러 가지가 있습니다.

### Jenkins 구성 UI를 사용하여 구성 {#configure-with-the-jenkins-configuration-ui}

#### Datadog Agent를 통해 보고(권장) {#report-through-the-datadog-agent-recommended}

1. Jenkins 인스턴스 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configure System{{< /ui >}}으로 이동합니다.
2. 구성 화면을 아래로 스크롤하여 {{< ui >}}Datadog Plugin{{< /ui >}} 섹션으로 이동합니다.
3. {{< ui >}}Use the Datadog Agent to report to Datadog{{< /ui >}} 모드를 선택합니다.
4. {{< ui >}}Agent{{< /ui >}} 호스트를 구성합니다.
5. CI Visibility를 구성합니다.
   1. 기본 포트 `8126`을 사용하지 않는 경우 {{< ui >}}Traces Collection Port{{< /ui >}}를 구성합니다.
   2. {{< ui >}}Test traces connection{{< /ui >}} 버튼을 클릭하여 구성이 유효한지 확인합니다.
   3. {{< ui >}}Enable CI Visibility{{< /ui >}} 확인란을 선택합니다.
   4. (필요시) CI 인스턴스 이름을 구성합니다.
6. (필요시) 로그 수집을 구성합니다.
   1. Datadog Agent에 구성된 대로 {{< ui >}}Log Collection{{< /ui >}} 포트를 구성합니다.
   2. {{< ui >}}Test logs connection{{< /ui >}} 버튼을 클릭하여 구성이 유효한지 확인합니다.
   3. {{< ui >}}Enable Log Collection{{< /ui >}} 확인란을 선택합니다.
7. (필요시) Datadog UI에 액세스하는 데 사용하는 호스트 이름(예: `app.datadoghq.com`)을 {{< ui >}}Datadog App hostname{{< /ui >}} 필드에 입력합니다.
8. 설정을 저장합니다.

{{< img src="ci/ci-jenkins-plugin-config-agentful-app-hostname.png" alt="Jenkins용 Datadog 플러그인 구성" style="width:100%;">}}

#### Agentless(API 키 사용) {#agentless-using-an-api-key}

이 옵션을 사용하면 Datadog Agent를 사용하지 않고 Jenkins 플러그인이 Datadog에 직접 보고하도록 설정할 수 있습니다. API 키가 필요합니다.

1. Jenkins 인스턴스 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configure System{{< /ui >}}으로 이동합니다.
2. 구성 화면을 아래로 스크롤하여 {{< ui >}}Datadog Plugin{{< /ui >}} 섹션으로 이동합니다.
3. {{< ui >}}Use Datadog site and API key to report to Datadog{{< /ui >}} 모드를 선택합니다.
4. {{< ui >}}Pick a site{{< /ui >}} 드롭다운에서 [Datadog 사이트][1]를 선택합니다.
5. 유효한 {{< ui >}}Datadog API Key{{< /ui >}}를 입력합니다(또는 {{< ui >}}Select from credentials{{< /ui >}} 옵션 사용).
6. {{< ui >}}Test Key{{< /ui >}} 버튼을 클릭하여 API 키가 유효한지 확인합니다.
7. CI Visibility를 구성합니다.
   1. {{< ui >}}Enable CI Visibility{{< /ui >}} 확인란을 선택합니다.
   2. (필요시) CI 인스턴스 이름을 구성합니다.
8. (필요시) 로그 수집을 구성합니다.
   1. {{< ui >}}Enable Log Collection{{< /ui >}} 확인란을 선택합니다.
9. (필요시) Datadog UI에 액세스하는 데 사용하는 호스트 이름(예: `app.datadoghq.com`)을 {{< ui >}}Datadog App hostname{{< /ui >}} 필드에 입력합니다.
10. 설정을 저장합니다.

{{< img src="ci/ci-jenkins-plugin-config-agentless-app-hostname.png" alt="Jenkins용 Datadog 플러그인 구성" style="width:100%;">}}

[1]: /ko/getting_started/site/#access-the-datadog-site

### Configuration-as-Code 사용{#use-configuration-as-code}

#### Datadog Agent를 통해 보고(권장) {#report-through-the-datadog-agent-recommended-1}

Jenkins 인스턴스가 Jenkins [`configuration-as-code`][1] 플러그인을 사용하는 경우 다음 단계를 따르세요.

1. `datadogGlobalConfiguration`에 대한 항목을 추가하여 구성 YAML을 생성하거나 수정합니다.

```yaml
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Datadog Agent` mode
      datadogAgentConfiguration:
        # Configure Datadog Agent host
        agentHost: '<your-agent-host>'
        # Configure Datadog Agent port
        agentPort: 8125
        # (Optional) Configure logs collection port as configured in your Datadog Agent
        agentLogCollectionPort: 10518
        # Configure traces collection port
        agentTraceCollectionPort: 8126
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: 'app.datadoghq.com'
    # (Optional) Enable Logs Storage
    collectBuildLogs: true
```

2. Jenkins 인스턴스 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configuration as Code{{< /ui >}}로 이동합니다.
3. 구성을 적용하거나 다시 로드합니다.
4. {{< ui >}}View Configuration{{< /ui >}} 버튼을 사용하여 구성을 확인합니다.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

#### Agentless(API 키 사용) {#agentless-using-an-api-key-1}

Jenkins 인스턴스가 Jenkins [`configuration-as-code`][1] 플러그인을 사용하는 경우 다음 단계를 따르세요.

1. `datadogGlobalConfiguration`에 대한 항목을 추가하여 구성 YAML을 생성하거나 수정합니다.

```yaml
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Agentless` mode (using API key).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configure your Datadog site
            site: '{{< region-param key=jenkins_site_name >}}'
        apiKey:
          datadogCredentialsApiKey:
            # Configure ID of Jenkins credentials that store your API key
            credentialsId: 'my-api-key-credentials-id'
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: '{{< region-param key=dd_full_site >}}'
    # (Optional) Enable Logs Storage
    collectBuildLogs: true
```

2. Jenkins 인스턴스 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configuration as Code{{< /ui >}}로 이동합니다.
3. 구성을 적용하거나 다시 로드합니다.
4. {{< ui >}}View Configuration{{< /ui >}} 버튼을 사용하여 구성을 확인합니다.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

### Groovy를 사용하여 구성 {#configure-with-groovy}

#### Datadog Agent를 통해 보고(권장) {#report-through-the-datadog-agent-recommended-2}

1. Jenkins 인스턴스 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Script Console{{< /ui >}}로 이동합니다.
2. 구성 스크립트를 실행합니다.

```groovy
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogAgentConfiguration

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def agentHost = 'localhost' // Configure your Datadog Agent host
def agentPort = 8125
def agentLogCollectionPort = 10518 // (Optional) Configure logs collection port as configured in your Datadog Agent
def agentTraceCollectionPort = 8126 // Configure traces collection port
datadog.datadogClientConfiguration = new DatadogAgentConfiguration(agentHost, agentPort, agentLogCollectionPort, agentTraceCollectionPort)

datadog.datadogAppHostname = 'app.datadoghq.com' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable Logs Storage

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
```

#### Agentless(API 키 사용) {#agentless-using-an-api-key-2}

1. Jenkins 인스턴스 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Script Console{{< /ui >}}로 이동합니다.
2. 구성 스크립트를 실행합니다.

```groovy
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.{{< region-param key=jenkins_site_name >}}) // Pick your Datadog site
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // or `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = '{{< region-param key=dd_full_site >}}' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable Logs Storage

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
```

### 환경 변수 사용 {#use-environment-variables}

#### Datadog Agent를 통해 보고(권장) {#report-through-the-datadog-agent-recommended-3}

1. Jenkins 인스턴스 머신에서 다음 환경 변수를 설정합니다.

```bash
# Select the Datadog Agent mode
DATADOG_JENKINS_PLUGIN_REPORT_WITH=DSD

# Configure the Agent host
DATADOG_JENKINS_PLUGIN_TARGET_HOST=your-agent-host

# Configure the Traces Collection port (default 8126)
DATADOG_JENKINS_PLUGIN_TARGET_TRACE_COLLECTION_PORT=8126

# Enable CI Visibility
DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

# (Optional) Configure your CI Instance name
DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

# (Optional) Configure Log Collection port as configured in your Datadog Agent
DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT=10518

# (Optional) Enable Logs Storage
DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

# (Optional) Configure the name of the host that you use to access Datadog UI
DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.datadoghq.com
```

2. Jenkins 인스턴스를 다시 시작합니다.

#### Agentless(API 키 사용) {#agentless-using-an-api-key-3}

1. Jenkins 인스턴스 머신에서 다음 환경 변수를 설정합니다.

```bash
# Select the Datadog Agent mode
DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

# Configure your Datadog site
DATADOG_JENKINS_PLUGIN_DATADOG_SITE={{< region-param key=jenkins_site_name >}}

# Configure your API key
DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

# Enable CI Visibility
DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

# (Optional) Configure your CI Instance name
DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

# (Optional) Enable Logs Storage
DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

# (Optional) Configure the name of the host that you use to access Datadog UI
DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME={{< region-param key=dd_full_site >}}
```

2. Jenkins 인스턴스를 다시 시작합니다.

## 로그 스토리지 {#logs-storage}

Jenkins 플러그인을 구성할 때 필요시 로그 스토리지를 활성화할 수 있습니다(이전 섹션의 `DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS` 참조).
Agentless 및 Agent 기반 옵션이 둘 다 지원됩니다.

로그 스토리지는 CI Visibility와 별도로 청구됩니다.

로그 보존, 제외 및 인덱스는 [Log Management][27]에서 구성됩니다. Jenkins 작업에 대한 로그는 `source:jenkins` 태그로 식별할 수 있습니다.

## 인프라 메트릭 상호 연관 {#correlate-infrastructure-metrics}

Jenkins Worker를 사용하는 경우 파이프라인과 해당 파이프라인을 실행 중인 인프라를 상호 연관시킬 수 있습니다. 이 기능이 작동하려면 다음 단계를 따르세요.

1. 모든 Jenkins Worker에 [Datadog Agent][1]를 설치합니다.
2. 모든 Jenkins Worker에서 Worker 호스트네임으로 `DD_CI_HOSTNAME`이라는 새 환경 변수를 설정하여 내보냅니다.
  * Datadog Agent가 해당 Worker의 인프라 메트릭에서 보고하는 호스트네임과 동일해야 합니다.
  * 고정 값이나 다른 환경 변수를 유효한 값으로 사용할 수 있습니다.

```bash
export DD_CI_HOSTNAME=my-hostname
```

Kubernetes를 사용하여 Jenkins 인스턴스를 관리하는 경우 [Jenkins 작업을 실행하는 포드][9]에 `DD_CI_HOSTNAME` 환경 변수를 추가합니다. 이 환경 변수의 값은 인프라 메트릭을 보고할 때 Datadog Agent 데몬셋에서 사용하는 항목에 따라 다릅니다.

이는 Jenkins Worker에만 필요합니다. Jenkins 컨트롤러의 경우 인프라 메트릭 상호 연관에 추가 작업이 필요하지 않습니다.

**참고**: 인프라 메트릭 상호 연관은 Jenkins 플러그인 v5.0.0 이상부터 지원됩니다.

## Test Optimization 활성화 {#enable-test-optimization}

이는 선택 사항이며 [Test Optimization][16]을 사용하여 테스트 데이터 수집을 활성화하는 단계입니다.

사용 중인 테스트 프레임워크가 지원되는지 확인하려면 해당 언어의 [Test Optimization 문서][17]를 참조하세요.

Jenkins 작업 또는 파이프라인 내에서 Test Optimization을 활성화하는 방법에는 여러 가지가 있습니다.
1. Jenkins 구성 UI 사용
2. 파이프라인 스크립트 내에 `datadog` 단계 추가
3. SDK를 수동으로 구성

테스트를 실행하기 위해 Docker 컨테이너를 가동하는 파이프라인의 경우 SDK를 수동으로만 구성할 수 있습니다.

### Jenkins 구성 UI를 사용하여 활성화 {#enable-with-the-jenkins-configuration-ui}

UI 기반 Test Optimization 구성은 Datadog Jenkins 플러그인 v5.6.0 이상에서 사용할 수 있습니다.

이 옵션은 `Jenkinsfile`에서 완전히 구성된 파이프라인(예: 멀티브랜치 파이프라인 또는 조직 폴더의 파이프라인)에는 적합하지 않습니다.
이러한 파이프라인의 경우 (다음 섹션에서 설명하는) `datadog` 단계와 함께 선언적 구성을 사용하세요.

UI를 통해 Test Optimization을 활성화하려면 다음 단계를 수행하세요.
1. Jenkins 인스턴스 웹 인터페이스에서 계측하려는 작업 또는 파이프라인으로 이동하여 {{< ui >}}Configure{{< /ui >}} 옵션을 선택합니다.
2. {{< ui >}}General{{< /ui >}} 구성 섹션에서 {{< ui >}}Enable Datadog Test Optimization{{< /ui >}} 확인란을 선택합니다.
3. 테스트 중인 서비스 또는 라이브러리의 이름을 {{< ui >}}Service Name{{< /ui >}} 입력란에 입력합니다. 의미 있는 값이라면 무엇이든 선택할 수 있습니다.
4. 테스트 계측을 활성화할 언어를 선택합니다. 일부 언어는 UI를 통한 구성을 지원하지 않습니다. 이러한 언어에 대해 Test Optimization을 구성하려면 수동 [구성 지침][18]을 따르세요.
5. 필요시 [추가 구성 설정][18]을 제공합니다.
6. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{< img src="ci/ci-jenkins-plugin-tests-config-2.png" alt="Jenkins에 맞춰 Datadog Test Optimization 구성" style="width:100%;">}}

### `datadog` 파이프라인 단계를 사용하여 활성화 {#enable-with-the-datadog-pipeline-step}

이 구성 옵션은 Datadog Jenkins 플러그인 v5.6.2 이상에서 사용할 수 있습니다.

선언형 파이프라인에서는 다음과 같이 최상위 수준 `options` 블록에 단계를 추가하세요.

```groovy
pipeline {
    agent any
    options {
        datadog(testOptimization: [
            enabled: true,
            serviceName: "my-service", // the name of service or library being tested
            languages: ["JAVA"], // languages that should be instrumented (available options are "JAVA", "JAVASCRIPT", "PYTHON", "DOTNET", "RUBY")
            additionalVariables: ["my-var": "value"]  // additional tracer configuration settings (optional)
        ])
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello world."
            }
        }
    }
}
```

스크립트화된 파이프라인에서는 다음과 같이 `datadog` 단계를 통해 관련 섹션을 래핑하세요.

```groovy
datadog(testOptimization: [ enabled: true, serviceName: "my-service", languages: ["JAVASCRIPT"], additionalVariables: [:] ]) {
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

`collectLogs` 또는 `tags`과 같은 다른 `datadog` 설정은 `testOptimization` 블록과 함께 추가할 수 있습니다.

### 수동 트레이서 구성을 사용하여 활성화 {#enable-with-manual-tracer-configuration}

사용 중인 언어에 특화된 수동 Test Optimization [구성 지침][17]을 따르세요.

## Git 정보 전파 {#propagate-git-information}

Datadog Jenkins 플러그인의 일부 기능이 올바르게 작동하려면 Jenkins 빌드와 관련된 Git 정보가 필요합니다.

빌드에 필요한 최소 Git 정보는 리포지토리 URL, 브랜치, 커밋 SHA 및 커밋 작성자 이메일입니다.
이러한 정보는 플러그인에 의해 자동으로 결정되거나, SCM에서 전파되거나, 환경 변수를 통해 수동으로 제공되거나, 이러한 접근 방식을 결합하여 얻을 수 있습니다.

**참고:** 파이프라인이 리포지토리 여러 개를 체크아웃하는 경우 파이프라인에서 나중에 체크아웃된 리포지토리의 Git 정보가 더 우선합니다.

### SCM에서 Git 정보 전파 {#propagate-git-information-from-scm}

Jenkins 플러그인은 빌드 또는 파이프라인과 연관된 Git 정보를 자동으로 탐지할 수 있습니다.
그러나 Jenkins 버전 및 파이프라인 세부 정보에 따라 자동 Git 데이터 탐지가 불가능한 경우가 있을 수 있습니다.

이 경우 `checkout` 또는 `git` 단계를 실행한 후 `.each {k,v -> env.setProperty(k, v)}` 함수를 사용하여 플러그인에서 Git 정보를 사용할 수 있도록 할 수 있습니다. 예시는 다음과 같습니다.

#### 선언형 파이프라인 사용 {#using-declarative-pipelines}

선언형 파이프라인을 사용하여 파이프라인을 구성하는 경우 다음과 같이 `script` 블록을 사용하여 Git 정보를 전파합니다.

`checkout` 단계를 사용하는 경우 다음을 사용하세요.

```groovy
pipeline {
  stages {
    stage('Checkout') {
        script {
          checkout(...).each {k,v -> env.setProperty(k,v)}
        }
    }
    ...
  }
}
```

`git` 단계를 사용하는 경우 다음을 사용하세요.

```groovy
pipeline {
  stages {
    stage('Checkout') {
      script {
        git(...).each {k,v -> env.setProperty(k,v)}
      }
    }
    ...
  }
}
```

#### 스크립트화된 파이프라인 사용 {#using-scripted-pipelines}

스크립트화된 파이프라인을 사용하여 파이프라인을 구성하는 경우 Git 정보를 환경 변수로 직접 전파할 수 있습니다.

`checkout` 단계를 사용하는 경우 다음을 사용하세요.

```groovy
node {
  stage('Checkout') {
    checkout(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
```

`git` 단계를 사용하는 경우 다음을 사용하세요.

```groovy
node {
  stage('Checkout') {
    git(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
```


### 수동으로 Git 정보 설정 {#set-git-information-manually}

플러그인이 Git 정보를 자동으로 탐지할 수 없고 SCM을 통해 Git 데이터 전파가 옵션이 아닌 경우
필요한 Git 정보를 수동으로 설정할 수 있습니다.

이렇게 하려면 다음 환경 변수를 설정하세요.

**참고:** 이러한 변수는 선택 사항이지만 설정하면 다른 Jenkins 플러그인에서 설정한 Git 정보보다 우선합니다.

`DD_GIT_REPOSITORY_URL` (필요시)
: 서비스의 리포지토리 URL입니다.<br/>
**예시**: `https://github.com/my-org/my-repo.git`

`DD_GIT_BRANCH`(필요시)
: 브랜치 이름입니다.<br/>
**예시**: `main`

`DD_GIT_TAG`(필요시)
: 커밋 태그입니다(있는 경우).<br/>
**예시**: `0.1.0`

`DD_GIT_COMMIT_SHA`(필요시)
: 16진수 40자 길이 형식으로 표현된 커밋입니다.<br/>
**예시**: `faaca5c59512cdfba9402c6e67d81b4f5701d43c`

`DD_GIT_COMMIT_MESSAGE`(필요시)
: 커밋 메시지입니다.<br/>
**예시**: `Initial commit message`

`DD_GIT_COMMIT_AUTHOR_NAME`(필요시)
: 커밋 작성자의 이름입니다.<br/>
**예시**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`(필요시)
: 커밋 작성자의 이메일 주소입니다.<br/>
**예시**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`(필요시)
: 작성자가 ISO 8601 형식으로 표현된 커밋을 제출한 날짜입니다.<br/>
**예시**: `2021-08-16T15:41:45.000Z`

`DD_GIT_COMMIT_COMMITTER_NAME`(필요시)
: 커밋 커미터의 이름입니다.<br/>
**예시**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`(필요시)
: 커밋 커미터의 이메일 주소입니다.<br/>
**예시**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`(필요시)
: 커미터가 ISO 8601 형식으로 표현된 커밋을 제출한 날짜입니다.<br/>
**예시**: `2021-08-16T15:41:45.000Z`

리포지토리, 브랜치, 커밋만 설정하면 플러그인이 `.git` 폴더에서 나머지 Git 정보를 추출하려고 시도합니다.

사용 예시는 다음과 같습니다.

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        script {
          def gitVars = git url:'https://github.com/my-org/my-repo.git', branch:'some/feature-branch'

          // Setting Git information manually via environment variables.
          env.DD_GIT_REPOSITORY_URL=gitVars.GIT_URL
          env.DD_GIT_BRANCH=gitVars.GIT_BRANCH
          env.DD_GIT_COMMIT_SHA=gitVars.GIT_COMMIT
        }
      }
    }
    stage('Test') {
      steps {
        // Execute the rest of the pipeline.
      }
    }
  }
}
{{< /code-block >}}

## 파이프라인 포함 또는 제외 {#include-or-exclude-pipelines}

특정 파이프라인을 포함하거나 제외하도록 Jenkins 플러그인을 구성할 수 있습니다.

1. Jenkins 인스턴스의 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configure System{{< /ui >}}으로 이동합니다.
2. 구성 화면을 아래로 스크롤하여 {{< ui >}}Datadog Plugin{{< /ui >}} 섹션으로 이동합니다.
3. {{< ui >}}Advanced{{< /ui >}} 버튼을 클릭합니다.
4. {{< ui >}}Excluded Jobs{{< /ui >}}를 구성합니다.
5. {{< ui >}}Included Jobs{{< /ui >}}를 구성합니다.
6. 설정을 저장합니다.

{{< ui >}}Excluded jobs{{< /ui >}}
: 모니터링하지 않을 Jenkins 작업 목록으로, 쉼표로 구분되어 있습니다. 제외는 모든 메트릭, 트레이스, 이벤트 및 서비스 검사에 적용됩니다. 제외된 작업은 정규 표현식을 사용하여 여러 작업을 참조할 수 있습니다.<br/>
**환경 변수**: `DATADOG_JENKINS_PLUGIN_EXCLUDED`<br/>
**예시**: `susans-job,johns-.*,prod_folder/prod_release`

{{< ui >}}Included jobs{{< /ui >}}
: 모니터링할 Jenkins 작업 이름 목록으로, 쉼표로 구분되어 있습니다. 포함된 작업 목록이 비어 있으면 명시적으로 제외되지 않은 모든 작업이 모니터링됩니다. 포함은 모든 메트릭, 트레이스, 이벤트 및 서비스 검사에 적용됩니다. 포함된 작업은 정규 표현식을 사용하여 여러 작업을 참조할 수 있습니다.<br/>
**환경 변수**: `DATADOG_JENKINS_PLUGIN_INCLUDED`<br/>
**예시**: `susans-job,johns-.*,prod_folder/prod_release`

포함 및 제외된 작업 목록에는 정규 표현식을 포함할 수 있지만, glob 패턴은 포함할 수 없습니다. 특정 접두사가 있는 작업을 포함하려면 `prefix-*`가 아니라 `prefix-.*`를 사용하세요.

## 고급 구성 {#advanced-configuration}

### 기본 브랜치 이름 설정 {#set-the-default-branch-name}

파이프라인 결과를 보고하려면 기본 브랜치 이름(예: `main`)을 `git.default_branch`라는 속성의 파이프라인 스팬에 첨부하세요. 일반적으로 자동으로 수행되지만, 경우에 따라 Jenkins에서 이 정보를 제공하지 않아 플러그인이 추출하지 못할 수 있습니다.

이런 경우 빌드에서 `DD_GIT_DEFAULT_BRANCH` 환경 변수를 사용하여 기본 브랜치를 수동으로 설정하세요. 예시는 다음과 같습니다.

{{< code-block lang="groovy" >}}
pipeline {
    agent any
    environment {
        DD_GIT_DEFAULT_BRANCH = 'main'
        ...
    }
    stages {
        ...
    }
}
{{< /code-block >}}


### 파이프라인에 대한 사용자 지정 태그 설정{#set-custom-tags-for-your-pipelines}

Datadog 플러그인은 파이프라인 기반 작업에 사용자 지정 태그를 추가할 수 있는 `datadog` 단계를 추가합니다.

선언형 파이프라인에서는 다음과 같이 최상위 수준 option 블록에 단계를 추가하세요.

{{< code-block lang="groovy" >}}
def DD_TYPE = "release"
pipeline {
    agent any
    options {
        datadog(tags: ["team:backend", "type:${DD_TYPE}", "${DD_TYPE}:canary"])
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello world."
            }
        }
    }
}
{{< /code-block >}}

스크립트화된 파이프라인에서는 다음과 같이 `datadog` 단계를 사용하여 관련 섹션을 래핑하세요.

{{< code-block lang="groovy" >}}
datadog(tags: ["team:backend", "release:canary"]){
    node {
        stage('Example') {
            echo "Hello world."
        }
    }
}
{{< /code-block >}}

#### Datadog Teams와 통합 {#integrate-with-datadog-teams}
파이프라인과 연결된 팀을 표시하고 필터링하려면 `team:<your-team>`를 사용자 지정 태그로 추가하세요. 사용자 지정 태그 이름은 [Datadog Teams][15] 팀 핸들과 정확히 일치해야 합니다.

### 전역 사용자 지정 태그 설정{#set-global-custom-tags}

모든 파이프라인 트레이스의 사용자 지정 태그(전역 태그 및 전역 작업 태그 등)를 전송하도록 Jenkins 플러그인을 구성할 수 있습니다.

1. Jenkins 인스턴스의 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configure System{{< /ui >}}으로 이동합니다.
2. 구성 화면을 아래로 스크롤하여 {{< ui >}}Datadog Plugin{{< /ui >}} 섹션으로 이동합니다.
3. {{< ui >}}Advanced{{< /ui >}} 버튼을 클릭합니다.
4. {{< ui >}}Global Tags{{< /ui >}}를 구성합니다.
5. {{< ui >}}Global Job Tags{{< /ui >}}를 구성합니다.
6. 설정을 저장합니다.

{{< ui >}}Global tags{{< /ui >}}
: 모든 메트릭, 트레이스, 이벤트 및 서비스 검사에 적용할 쉼표로 구분된 태그 목록입니다. 태그에는 Jenkins 컨트롤러 인스턴스에서 정의된 환경 변수가 포함될 수 있습니다.<br/>
**환경 변수**: `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`<br/>
**예시**: `key1:value1,key2:${SOME_ENVVAR},${OTHER_ENVVAR}:value3`

{{< ui >}}Global job tags{{< /ui >}}
: 작업과 일치시킬 정규식의 쉼표로 구분된 목록과 해당 작업에 적용할 태그 목록입니다. 태그에는 Jenkins 컨트롤러 인스턴스에서 정의된 환경 변수가 포함될 수 있습니다. 태그는 `$` 기호를 사용하여 정규식의 일치 그룹을 참조할 수 있습니다.<br/>
**환경 변수**: `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`<br/>
**예시**: `(.*?)_job_(.*?)_release, owner:$1, release_env:$2, optional:Tag3`

## Datadog에서 파이프라인 데이터 시각화 {#visualize-pipeline-data-in-datadog}

통합이 성공적으로 설정된 후 파이프라인이 완료되면 [**CI Pipeline List**][7] 및 [**Executions**][8] 페이지가 둘 다 데이터로 채워집니다.

{{< ui >}}CI Pipeline List{{< /ui >}} 페이지에는 각 리포지토리의 기본 브랜치 데이터만 표시됩니다. 자세한 내용은 [CI 파이프라인 검색 및 관리하기][28]를 참조하세요.

## 문제 해결 {#troubleshooting}

### 진단 플레어 생성{#generate-diagnostic-flare}

Datadog 지원 팀에 문제를 보고할 때 플러그인 진단 플레어를 생성하여 문제 설명과 함께 제공하세요.

플레어를 생성하려면 다음 단계를 수행하세요.

1. Jenkins 인스턴스 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Troubleshooting{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}으로 이동합니다.
2. 진단 플레어 양식에서 플레어에 포함할 정보를 확인합니다. 기본 선택 항목이 가장 적합합니다. 제공하는 정보가 많을수록 문제를 진단하기가 더 쉬워집니다.
3. {{< ui >}}Download{{< /ui >}}를 클릭하여 플레어 아카이브를 생성하고 다운로드합니다.

### Datadog 플러그인에 대해 DEBUG 로그 수준 활성화 {#enable-debug-log-level-for-the-datadog-plugin}

Datadog 플러그인에 문제가 있는 경우 `DEBUG` 수준에서 플러그인 로그를 설정할 수 있습니다. 이 수준을 사용하면 예외가 발생할 경우 스택 트레이스 세부 정보를 볼 수 있습니다.

1. Jenkins 인스턴스 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}System log{{< /ui >}}로 이동합니다.
2. {{< ui >}}Add new log recorder{{< /ui >}} 버튼을 클릭합니다.
3. 로그 레코더 이름을 입력합니다. 예: **Datadog Plugin Logs**.
4. 목록에 다음 로거를 추가합니다.
    - 로거: `org.datadog.jenkins.plugins.datadog.clients` -> 로그 수준 `ALL`
    - 로거: `org.datadog.jenkins.plugins.datadog.traces` -> 로그 수준 `ALL`
    - 로거: `org.datadog.jenkins.plugins.datadog.logs` -> 로그 수준 `ALL`
    - 로거: `org.datadog.jenkins.plugins.datadog.model` -> 로그 수준 `ALL`
    - 로거: `org.datadog.jenkins.plugins.datadog.listeners` -> 로그 수준 `ALL`
5. 구성을 저장합니다.

로거를 다른 로그 레코더로 분할할 수도 있습니다.

로그 레코더가 성공적으로 구성되면 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}System log{{< /ui >}}을 통해 원하는 로그 레코더에 액세스하여 `DEBUG` 모드에서 로그를 확인할 수 있습니다.

Jenkins 파이프라인을 트리거하면 {{< ui >}}Datadog Plugin Logs{{< /ui >}}에서 `Send pipeline traces` 메시지를 검색할 수 있습니다. 이 메시지는 플러그인이 CI Visibility 데이터를 Datadog Agent로 전송하고 있음을 나타냅니다.

{{< code-block lang="text" >}}
Send pipeline traces.
...
Send pipeline traces.
...
{{< /code-block >}}

### 파이프라인 실행 데이터는 Datadog에서 사용할 수 없음 {#pipeline-executions-data-is-not-available-in-datadog}

#### HTTP 연결 검사{#http-connectivity-check}

Jenkins 인스턴스가 HTTP 프록시 뒤에 있는 경우 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Manage Plugins{{< /ui >}} > {{< ui >}}Advanced tab{{< /ui >}}으로 이동하여 프록시 구성이 올바른지 확인하세요.
- Datadog 플러그인이 Datadog Agent로 데이터를 보내도록 구성된 경우, Agent 호스트가 {{< ui >}}No Proxy Hosts{{< /ui >}} 섹션에 추가되었는지 확인하세요.
- Datadog 플러그인이 데이터를 Datadog으로 직접 전송하도록 구성된 경우(Agentless 모드), Datadog 호스트가 {{< ui >}}No Proxy Hosts{{< /ui >}} 섹션에 추가되었는지 확인하세요. 아래 표는 지원되는 Datadog 사이트와 해당 호스트 값을 보여줍니다.

| Datadog 사이트 | 호스트 값 |
| ------------ | ----------------------- |
| US1          | datadoghq.com           |
| US3          | us3.datadoghq.com       |
| US5          | us5.datadoghq.com       |
| EU1          | datadoghq.eu            |
| AP1          | ap1.datadoghq.com       |
| UK1          | uk1.datadoghq.com       |

#### Datadog 플러그인이 서버에 페이로드를 쓸 수 없음 {#the-datadog-plugin-cannot-write-payloads-to-the-server}

{{< ui >}}Jenkins Log{{< /ui >}}에 다음 오류 메시지가 나타나면 플러그인 구성이 올바른지 확인하세요.

{{< code-block lang="text" >}}
Error writing to server
{{< /code-block >}}

`localhost`를 호스트 이름으로 사용하는 경우 대신 서버 호스트 이름으로 변경하세요.

### Jenkins 로그를 Datadog에서 사용할 수 없음 {#jenkins-logs-are-not-available-in-datadog}

Datadog 플러그인이 Datadog Agent로 데이터를 전송하도록 구성된 경우 다음 단계를 수행하세요.
- TCP를 통한 사용자 지정 로그 수집이 Agent에서 [활성화 및 구성][29]되었는지 확인하세요.
- 플러그인 구성 UI로 이동하고 {{< ui >}}Test logs connection{{< /ui >}}을 클릭하여 로그 연결을 확인하세요.

### Datadog 플러그인 섹션이 Jenkins 구성에 나타나지 않음 {#the-datadog-plugin-section-does-not-appear-in-the-jenkins-configuration}

Datadog 플러그인 섹션이 Jenkins 구성 섹션에 나타나지 않으면 플러그인이 활성화되어 있는지 확인하세요. 확인 방법은 다음과 같습니다.

1. Jenkins 인스턴스 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Manage Plugins{{< /ui >}}로 이동합니다.
2. {{< ui >}}Installed{{< /ui >}} 탭에서 {{< ui >}}Datadog Plugin{{< /ui >}}을 검색합니다.
3. {{< ui >}}Enabled{{< /ui >}} 확인란이 선택되어 있는지 확인합니다.
4. 여기에서 플러그인을 활성화하면 `/safeRestart` URL 경로를 사용하여 Jenkins 인스턴스를 다시 시작합니다.

### CI Visibility 옵션이 Datadog 플러그인 섹션에 나타나지 않습니다. {#the-ci-visibility-option-does-not-appear-in-the-datadog-plugin-section}

CI Visibility 옵션이 Datadog 플러그인 섹션에 나타나지 않으면 올바른 버전이 설치되었는지 확인하고 Jenkins 인스턴스를 다시 시작하세요. 확인 방법은 다음과 같습니다.

1. Jenkins 인스턴스 웹 인터페이스에서 {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Manage Plugins{{< /ui >}}로 이동합니다.
2. {{< ui >}}Datadog Plugin{{< /ui >}} 탭에서 {{< ui >}}Installed{{< /ui >}}를 검색합니다.
3. 설치된 버전이 올바른지 확인합니다.
4. `/safeRestart` URL 경로를 사용하여 Jenkins 인스턴스를 다시 시작합니다.

### 인프라 메트릭이 Jenkins 파이프라인과 연관되지 않음 {#infrastructure-metrics-do-not-get-correlated-with-jenkins-pipelines}

[인프라 메트릭을 Jenkins 파이프라인과 연관][11]시키는 단계를 거쳤는지 확인하세요.

단계를 수행했는데도 인프라 메트릭이 여전히 Jenkins 파이프라인과 연관되지 않는다면
Jenkins 인스턴스를 다시 시작해 보세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/
[2]: /ko/agent/cluster_agent/admission_controller/
[3]: https://plugins.jenkins.io/datadog/
[4]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: https://plugins.jenkins.io/kubernetes/#plugin-content-pod-template
[10]: /ko/continuous_integration/pipelines/jenkins/?tab=linux#logs-storage
[11]: /ko/continuous_integration/pipelines/jenkins/?tab=agentlessusinganapikey#correlate-infrastructure-metrics
[12]: /ko/continuous_integration/pipelines/custom_tags_and_measures/
[14]: /ko/agent/
[15]: /ko/account_management/teams/
[16]: /ko/continuous_integration/tests/
[17]: /ko/continuous_integration/tests/setup/
[18]: /ko/tracing/trace_collection/library_config/
[19]: https://www.jenkins.io/
[20]: /ko/glossary/#manual-step
[21]: /ko/glossary/#queue-time
[22]: /ko/glossary/#custom-tag
[23]: /ko/glossary/#custom-measure
[24]: /ko/glossary/#parameter
[25]: /ko/glossary/#pipeline-failure
[26]: /ko/glossary/#custom-span
[27]: /ko/logs/guide/best-practices-for-log-management/
[28]: /ko/continuous_integration/search/#search-for-pipelines
[29]: /ko/agent/logs/?tab=tcpudp#custom-log-collection
[30]: /ko/extend/dogstatsd/
[31]: /ko/containers/docker/apm/#tracing-from-the-host
[32]: /ko/glossary/#running-pipeline
[33]: /ko/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[34]: /ko/glossary/#pipeline-execution-time