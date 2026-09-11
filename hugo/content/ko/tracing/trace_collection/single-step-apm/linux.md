---
aliases:
- /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux/
code_lang: linux
code_lang_weight: 0
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: 설명서
  text: 런타임 메트릭 활성화
- link: https://www.datadoghq.com/blog/single-step-instrumentation-rules/
  tag: 블로그
  text: 단일 단계 계측 규칙을 사용하여 호스트 전반의 서비스 트레이싱을 관리하세요
title: Linux에서 Single Step APM Instrumentation 사용
type: multi-code-lang
---
## 개요 {#overview}

Linux 호스트 또는 VM에서 APM에 단일 단계 계측(SSI)을 사용하여 추가 구성을 거치지 않고 한 번에 Datadog Agent를 설치하고 애플리케이션을 [계측][14]하세요. 

{{< skill-callout
    title="에이전트를 사용해 APM 설정하기"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## 애플리케이션에서 APM 활성화 {#enable-apm-on-your-applications}

<div class="alert alert-info">계속 진행하기 전에 <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI 호환성 가이드를 검토하여 환경이 호환되는지 확인하세요.</a></div>

### 새 Agent 설치 {#new-agent-installation}

Datadog Agent를 설치하지 않은 경우, 한 번에 Datadog Agent를 설치하고 SSI를 활성화합니다.

1. Linux 호스트 또는 VM에서 다음 명령을 실행합니다.

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> \
   DD_SITE="{{< region-param key="dd_site" >}}" \
   DD_APM_INSTRUMENTATION_ENABLED=host \
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][22]. The command installs or updates the Agent and the SSI packages.

   By default, SSI installs the latest SDK versions. To pin specific versions, add the `DD_APM_INSTRUMENTATION_LIBRARIES` variable with comma-separated `language:major` pairs. Available versions are listed in the source repositories for each language: [Java][8] (`java`), [Node.js][9] (`js`), [Python][10] (`python`), [.NET][11] (`dotnet`), [Ruby][12] (`ruby`), [PHP][13] (`php`).

1. Restart your applications.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

#### Generate the command from Datadog 

To get a command pre-filled with your API key and site, go to the [Install the Datadog Agent on Linux][15] page and turn on {{< ui >}}Application Performance Monitoring{{< /ui >}} under {{< ui >}}Core Observability{{< /ui >}}.

{{< img src="tracing/trace_collection/enable_apm.png" alt="Linux에 Datadog Agent 설치를 위한 인앱 지침의 'Agent 커버리지 사용자 지정' 섹션" style="width:100%;" >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
드롭다운에서 SDK 버전을 선택하려면 {{< ui >}}Customize Library Versions{{< /ui >}}를 클릭합니다.

{{< img src="tracing/trace_collection/customize_library_versions.png" alt="Linux에 Datadog Agent 설치를 위한 지침의 '라이브러리 버전 사용자 지정' 드롭다운" style="width:100%;" >}}
{{< /site-region >}}

그런 다음 생성된 명령을 복사하여 실행합니다.

### 기존 Agent 설치 {#existing-agent-installation}

Datadog Agent를 이미 설치한 경우, 호스트에서 [새 Agent 설치](#new-agent-installation)의 Agent 설치 명령을 다시 실행합니다. 이 명령을 실행하면 기존 Agent 업데이트와 SSI 활성화 작업이 이루어집니다.

또는 Fleet Automation을 사용하여 Datadog에서 SSI를 활성화합니다.

1. Datadog에서 [**Fleet Automation > Configuration**][21]으로 이동합니다.
1. {{< ui >}}Configure Agents{{< /ui >}}를 클릭합니다.
1. 필터를 적용하여 구성하려는 에이전트를 선택한 다음 **Next**를 클릭합니다.

   {{< img src="tracing/trace_collection/filter-agents.png" alt="Fleet Automation의 에이전트 필터링 화면(환경, 운영 체제, 호스트 이름별로 범위를 지정하는 옵션 표시)" style="width:100%;" >}}

1. {{< ui >}}Application Performance Monitoring (APM){{< /ui >}} 타일을 클릭한 다음 {{< ui >}}Next{{< /ui >}}를 클릭합니다.

   {{< img src="tracing/trace_collection/select-products-core-obs.png" alt="Fleet Automation의 제품 선택 화면(Application Performance Monitoring(APM) 타일 표시)" style="width:80%;" >}}

1. {{< ui >}}Configure SDKs Installation{{< /ui >}} 화면에서 {{< ui >}}Yes{{< /ui >}}을 클릭하여 SDK를 자동으로 설치합니다. {{< ui >}}Use latest version{{< /ui >}}을 선택하거나 선택을 해제하여 개별 SDK 버전을 지정합니다.

   {{< img src="tracing/trace_collection/configure-sdks-installation.png" alt="Fleet Automation의 SDK 설치 구성 화면(자동 SDK 설치를 활성화하고 버전을 선택할 수 있는 옵션 표시)" style="width:60%;" >}}

1. **Next**를 클릭합니다.
1.  구성을 검토하고 {{< ui >}}Deploy Configuration{{< /ui >}}을 클릭합니다.

##  설치 확인 {#verify-the-installation}

1. Agent가 실행 중인지 확인합니다.

   ```shell
   sudo datadog-agent status
   ```

1. 호스트에서 SSI 인젝션이 활성화 상태인지 확인합니다.

   ```shell
   cat /etc/ld.so.preload && ls /opt/datadog-packages/ | grep apm
   ```

   출력에는 `/etc/ld.so.preload`의 APM 인젝터 라이브러리와 하나 이상의 `datadog-apm-*` 패키지가 나열됩니다.

1. 애플리케이션에서 트래픽을 수신한 후, [APM 서비스 페이지][23]에 서비스 정보가 나타나는지 확인합니다. 몇 분 내에 나타나지 않으면 [SSI 문제 해결 가이드][19]를 따르세요.

## Unified Service Tags 구성 {#configure-unified-service-tags}

Unified Service Tags(UST)는 트레이스, 메트릭, 로그에 일관된 태그를 적용해 탐색 및 관측 가능성 데이터 상호 연계가 간편합니다. [Linux 서비스의 UST 설정][16] 방법을 알아보세요.

## SDK 종속적 제품 및 기능 활성화 {#enable-sdk-dependent-products-and-features}

SSI가 애플리케이션에 Datadog SDK를 로드하고 분산 트레이싱을 활성화하고 나면 SDK에 의존하는 추가적인 제품을 구성할 수 있습니다.

{{< ssi-products >}}

다음 설정 방법 중 한 가지를 사용하세요.

- **[`application_monitoring.yaml`에서 구성][18]**:

  애플리케이션 명령줄을 수정하지 않고 호스트의 모든 서비스 전반의 제품 및 기능을 구성합니다.

- **[환경 변수 설정][17]**:

  애플리케이션 구성에서 직접 환경 변수를 설정하여 제품을 활성화합니다. 

## 고급 옵션{#advanced-options}

###  SDK 버전 업데이트 {#update-sdk-version}

Agent 설치 명령을 실행할 때는 SDK 버전이 고정됩니다.

SDK 버전 업데이트:

1. Agent 설치 명령을 다시 실행합니다. 이 명령을 통해 Agent가 최신 버전으로 업데이트되는 경우도 있습니다.
1. 애플리케이션을 재시작하세요.

### 계측 규칙 정의하기 {#define-instrumentation-rules}

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a>에서는 계측 규칙이 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

계측 규칙(Agent v7.73 이상에서 사용 가능)을 정의하면 Linux 호스트에서 SSI에 의해 자동으로 계측되는 프로세스를 제어할 수 있습니다.

계측 규칙 구성하기:

1. Datadog에서 {{< ui >}}APM{{< /ui >}} > {{< ui >}}Service Setup{{< /ui >}} > [{{< ui >}}Manage Instrumentation Rules{{< /ui >}}][20]로 이동합니다.
1. {{< ui >}}Add or Edit Rules{{< /ui >}}를 클릭합니다.
1. 계측 규칙 정의:
   1. {{< ui >}}Add New Rule{{< /ui >}}를 클릭한 다음 {{< ui >}}Allow Rule{{< /ui >}} 또는 {{< ui >}}Block Rule{{< /ui >}}을 선택하여 일치 프로세스를 계측할지 여부를 지정합니다.
   1. 규칙 이름을 지정합니다.
   1. 하나 이상의 조건을 추가합니다. 자세한 내용은 [규칙 조건 정의](#define-rule-conditions)를 참조하세요.

   {{< img src="tracing/trace_collection/define_instrumentation_rule.png" alt="규칙 정의를 위한 구성 옵션을 제시하는 계측 규칙 UI" style="width:100%;" >}}

1. (선택 사항) 규칙을 드래그 앤 드롭하여 순서를 변경합니다.

   **참고**: 규칙은 순서대로 평가됩니다. 프로세스와 규칙이 일치하면 후속 규칙은 무시됩니다.

1. 어떤 규칙과도 일치하지 않는 프로세스에 대해 기본 동작(허용 또는 차단)을 설정합니다.
1. {{< ui >}}Next{{< /ui >}}를 클릭하면 규칙을 미리 볼 수 있습니다.
1. {{< ui >}}Deploy Rules{{< /ui >}}를 클릭합니다.

Remote Configuration이 활성화된 경우, 규칙이 모든 호스트에 배포되고 50초 이내에 SSI가 활성화된 호스트에 적용됩니다. 또는 {{< ui >}}Export{{< /ui >}}를 클릭하여 구성 파일을 내보내고 호스트에 수동으로 적용합니다.

#### 규칙 조건 정의 {#define-rule-conditions}

규칙은 각각 하나 이상의 조건으로 구성됩니다. 조건에는 다음 요소가 포함되어 있습니다.
- {{< ui >}}Attribute{{< /ui >}}: 규칙이 평가하는 프로세스 속성입니다.
- {{< ui >}}Operator{{< /ui >}}: 비교 로직(`equals`, `not equals`, `prefix`, `contains`)입니다.
- {{< ui >}}Value{{< /ui >}}: 프로세스 이름이나 명령줄 플래그 등 일치시켜야 할 텍스트 또는 패턴입니다.

지원되는 속성은 다음과 같습니다.
| 속성 | 설명 | 예시 |
| --------- | ----------- | ------- |
| 운영 체제 | 호스트의 OS입니다. | `linux` |
| 실행 파일 | 프로세스의 실행 파일 이름입니다. | `python3.11` |
| 실행 파일 전체 경로 | 실행 파일의 전체 경로입니다. | `/usr/bin/python3.11` |
| 인수 | 프로세스를 시작할 때 사용되는 명령줄 인수입니다. | `--env=production` |
| 작업 디렉터리 | 프로세스의 작업 디렉터리입니다. | `/app` |
| 언어 | 프로세스에 대해 감지된 프로그래밍 언어입니다. | `python` |
| 진입점 파일 | 애플리케이션을 시작할 때 사용되는 특정 파일입니다. | `app.py`, `server.js` |

#### 사용 사례 {#example-use-cases}

계측 규칙을 적용하는 방법을 보여주는 다음 예시를 확인하세요.

{{< collapse-content title="예시 1: 특정 프로세스를 제외한 모든 프로세스 계측" level="h5" >}}

기본적으로 모든 프로세스를 계측합니다. 분석 cron 작업 및 Java 배치 프로세서 등 가치가 없는 노이즈만 유발하는 서비스를 제외하도록 차단 규칙을 추가합니다.

{{< img src="tracing/trace_collection/instrumentation-rules-example-1.png" alt="작업 디렉터리 및 진입점 파일 조건에 대한 두 가지 계측 차단 규칙(기본값으로 계측 허용 설정)" style="width:100%;" >}}

{{< /collapse-content >}}

{{< collapse-content title="예시 2: 특정 프로세스만 계측" level="h5" >}}

기본적으로 모든 계측을 차단합니다. 특정 프로세스를 APM 대상에 포함하도록 허용 규칙을 추가합니다. 이 접근 방식은 정밀한 제어가 가능하며 점진적인 롤아웃에 적합합니다.

예를 들어, 결제 서비스와 고객 포털만 계측하려면 {{< ui >}}Working Directory{{< /ui >}}을 사용하여 허용 규칙을 생성한 다음, 기본 동작을 {{< ui >}}Block Instrumentation{{< /ui >}}으로 설정합니다.

{{< img src="tracing/trace_collection/instrumentation-rules-linux-example-2.png" alt="특정 작업 디렉터리의 서비스에 대한 두 가지 계측 허용 규칙(기본값으로 계측 차단 설정)" style="width:100%;" >}}

{{< /collapse-content >}}

## Agent에서 Single Step APM 계측 제거 {#remove-single-step-apm-instrumentation-from-your-agent}

인프라의 모든 서비스에 대해 추적 생성 중지하기

1. 
   ```shell을 실행합니다.
   dd-host-install --uninstall
   ```
2. 호스트 또는 VM에서 서비스를 재시작합니다.

## 문제 해결 {#troubleshooting}

SSI를 사용한 APM 활성화와 관련한 문제가 발생하는 경우, [SSI 문제 해결 가이드][19]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /ko/tracing/glossary/#instrumentation
[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux
[16]: /ko/getting_started/tagging/unified_service_tagging/?tab=kubernetes#non-containerized-environment
[17]: /ko/tracing/trace_collection/library_config/
[18]: /ko/tracing/trace_collection/library_config/application_monitoring_yaml/
[19]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[20]: https://app.datadoghq.com/apm/service-setup/workload-selection
[21]: https://app.datadoghq.com/fleet/agent-management
[22]: https://app.datadoghq.com/organization-settings/api-keys
[23]: https://app.datadoghq.com/apm/services