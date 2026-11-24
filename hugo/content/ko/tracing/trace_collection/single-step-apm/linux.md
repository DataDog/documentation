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
  text: 단일 단계 계측 규칙을 사용하여 호스트 전반의 서비스 트레이싱 관리하기
title: Linux의 단일 단계 APM 계측
type: multi-code-lang
---
## 개요 {#overview}

Linux 호스트 또는 VM에서 APM에 단일 단계 계측(SSI)을 사용하여 추가 구성을 거치지 않고 한 번에 Datadog Agent를 설치하고 애플리케이션을 [계측][14]하세요. 

{{< skill-callout
    title="에이전트로 APM 설정"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## 애플리케이션에서 APM 활성화 {#enable-apm-on-your-applications}

<div class="alert alert-info">계속 진행하기 전에 <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI 호환성 가이드</a>를 검토하여 환경이 호환되는지 확인하세요.</div>

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

{{< img src="tracing/trace_collection/enable_apm.png" alt="Linux에 Datadog Agent를 설치하기 위한 인앱 지침의 'Customize your Agent coverage' 섹션" style="width:100%;" >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
드롭다운에서 SDK 버전을 선택하려면 {{< ui >}}Customize Library Versions{{< /ui >}}를 클릭하세요.

{{< img src="tracing/trace_collection/customize_library_versions.png" alt="Linux에 Datadog Agent를 설치하기 위한 지침의 'Customize library versions' 드롭다운" style="width:100%;" >}}
{{< /site-region >}}

그런 다음 생성된 명령을 복사하여 실행하세요.

### 기존 Agent 설치 {#existing-agent-installation}

Datadog Agent가 이미 설치되어 있다면 Datadog에서 원격으로 SSI를 활성화합니다. 각 호스트에서 명령을 실행할 필요는 없습니다.

1. Datadog에서 [**APM > Instrument a Service**][21]로 이동합니다.

1. {{< ui >}}How do you want to instrument these hosts?{{< /ui >}}에서 {{< ui >}}Deploy on existing hosts{{< /ui >}}를 선택하여 Datadog Agent를 통해 원격으로 서비스를 계측합니다.

1. {{< ui >}}Which hosts should we instrument?{{< /ui >}}에서 범위 필터({{< ui >}}Environments{{< /ui >}}, {{< ui >}}Hostname{{< /ui >}}, {{< ui >}}APM enabled{{< /ui >}})를 사용하여 호스트 범위를 좁힙니다. 그런 다음 {{< ui >}}Eligible for deployment{{< /ui >}} 탭에서 계측할 Agent를 선택합니다. 계측할 수 없는 호스트는 {{< ui >}}Excluded from deployment{{< /ui >}} 탭에 표시됩니다.

1. {{< ui >}}Configure SDKs installation{{< /ui >}}에서 {{< ui >}}Yes{{< /ui >}}를 클릭하여 Datadog이 트레이싱 SDK를 자동으로 설치하도록 합니다. 최신 버전 대신 특정 SDK 버전을 고정하려면 {{< ui >}}Customize library versions{{< /ui >}}를 확장합니다.

1. {{< ui >}}Configure rollout strategy{{< /ui >}}에서 한 번에 배포할 Agent의 비율을 선택합니다. 결과 단계와 예상 소요 시간이 표시됩니다. 3개의 Agent가 연속으로 실패하거나 실패율이 전체의 10%에 도달하면 배포가 자동으로 일시 중지됩니다. 나중에 배포를 다시 실행할 수 있습니다.

1. {{< ui >}}Review and apply APM instrumentation{{< /ui >}}에서 {{< ui >}}Configuration Summary{{< /ui >}}를 검사하고({{< ui >}}Summary{{< /ui >}}와 {{< ui >}}YAML{{< /ui >}} 사이에서 전환), {{< ui >}}Apply Instrumentation{{< /ui >}}을 클릭합니다.

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

1. 애플리케이션에서 트래픽을 수신한 후, [APM Services 페이지][23]에 서비스 정보가 나타나는지 확인합니다. 몇 분 내에 나타나지 않으면 [SSI 문제 해결 가이드][19]를 따르세요.

## 통합 서비스 태그 구성 {#configure-unified-service-tags}

통합 서비스 태그(UST)는 트레이스, 메트릭, 로그에 일관된 태그를 적용해 관측 가능성 데이터를 보다 쉽게 탐색하고 상호 연계할 수 있게 됩니다. [Linux 서비스의 UST 설정][16] 방법을 알아보세요.

## SDK 종속적 제품 및 기능 활성화 {#enable-sdk-dependent-products-and-features}

SSI가 애플리케이션에 Datadog SDK를 로드하고 분산 트레이싱을 활성화하고 나면 SDK에 의존하는 추가적인 제품을 구성할 수 있습니다.

{{< ssi-products >}}

다음 설정 방법 중 한 가지를 사용하세요.

- **[`application_monitoring.yaml`에서 구성][18]**:

  애플리케이션 명령줄을 수정하지 않고 호스트의 모든 서비스 전반에서 제품 및 기능을 구성합니다.

- **[환경 변수 설정][17]**:

  애플리케이션 구성에서 직접 환경 변수를 설정하여 제품을 활성화합니다. 

## 고급 옵션 {#advanced-options}

### SDK 버전 업데이트 {#update-sdk-version}

Agent 설치 명령을 실행할 때는 SDK 버전이 고정됩니다.

SDK 버전을 업데이트하려면 다음 단계를 따르세요.

1. Agent 설치 명령을 다시 실행합니다. 이 명령은 Agent도 최신 버전으로 업데이트합니다.
1. 애플리케이션을 다시 시작합니다.

### 계측 규칙 정의 {#define-instrumentation-rules}

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a>에서는 계측 규칙이 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

계측 규칙을 사용하면 SSI가 Linux 호스트에서 자동으로 계측할 프로세스를 제어할 수 있습니다. 각 규칙은 프로세스 속성을 기준으로 일치하는 프로세스를 찾은 다음 해당 프로세스에 대한 계측을 허용하거나 차단합니다. 규칙을 모든 적격 호스트에 배포하거나 하나 이상의 [호스트 그룹](#create-host-groups)으로 범위를 지정하여 적용 대상을 제한할 수 있습니다.

계측 규칙을 보고 관리하려면 {{< ui >}}APM{{< /ui >}} > {{< ui >}}Instrument a Service{{< /ui >}} > [{{< ui >}}Instrumentation Rules{{< /ui >}}][20]로 이동하세요.

{{< img src="tracing/trace_collection/apm-instrumentation-rules-for-hosts.png" alt="Hosts가 선택된 APM Instrumentation Rules 페이지로, 계측 규칙 목록 위에 Default Behavior, Hosts in Scope, Deployment Status 카드가 표시되어 있습니다." style="width:100%;" >}}

#### 계측 규칙의 전제 조건 {#prerequisites-for-instrumentation-rules}

- **Agent**: 각 호스트에서 v7.73 이상이어야 하며, SSI 및 [Remote Configuration][24]이 활성화되어 있어야 합니다. 이러한 요구 사항을 충족하는 호스트는 계측 규칙을 적용할 수 있습니다.
- **권한**: 계측 규칙과 호스트 그룹을 생성하고 관리하는 데 필요한 **APM Workload Selection Write** [권한][25]이 있어야 합니다.

#### 기본 동작 설정 {#set-the-default-behavior}

기본 동작은 어떤 계측 규칙과도 일치하지 않는 적격 호스트의 프로세스에 적용됩니다. 또한 규칙을 생성하지 않은 경우에도 적용됩니다.

1. [Instrumentation Rules][20] 페이지에서 {{< ui >}}Default Behavior{{< /ui >}} 카드로 이동하고 {{< ui >}}Edit{{< /ui >}}을 클릭합니다.
1. 다음 옵션 중 하나를 선택합니다.
   - {{< ui >}}Allow everything else{{< /ui >}}: 규칙이 차단하지 않는 한 지원되는 애플리케이션이 계측됩니다.
   - {{< ui >}}Block everything else{{< /ui >}}: 규칙이 허용하지 않는 한 애플리케이션이 계측되지 않습니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

#### 호스트 그룹 생성 {#create-host-groups}

호스트 그룹은 계측 규칙의 대상으로 지정할 수 있는 재사용 가능한 호스트 모음입니다.

호스트 그룹을 생성하려면 다음 단계를 따르세요.

1. [Instrumentation Rules][20] 페이지에서 {{< ui >}}Hosts in Scope{{< /ui >}} 카드로 이동하고 {{< ui >}}Manage host groups{{< /ui >}}를 클릭합니다.
1. {{< ui >}}New Host Group{{< /ui >}}을 클릭하고 그룹 이름을 입력합니다.
1. {{< ui >}}Add Hosts{{< /ui >}}를 클릭한 다음 추가할 호스트를 검색하여 선택합니다. 호스트 이름, 패싯 또는 호스트 태그로 검색할 수 있습니다.

   <div class="alert alert-info">호스트 그룹은 동적이므로 검색 조건과 일치하는 새 호스트가 그룹에 자동으로 추가됩니다. 호스트는 둘 이상의 그룹에 속할 수 있지만 한 그룹 내의 모든 호스트는 Linux 또는 Windows 등 동일한 플랫폼에서 실행되어야 합니다.</div>

   {{< img src="tracing/trace_collection/instrumentation-rules-add-hosts.png" alt="Add Hosts 목록에서 3개의 호스트 중 2개가 선택된 새 호스트 그룹 양식" style="width:80%;" >}}

1. {{< ui >}}Save Group{{< /ui >}}을 클릭합니다.

Datadog은 {{< ui >}}All hosts{{< /ui >}} 그룹을 자동으로 유지 관리합니다. 이 그룹에는 다른 그룹에 속하지 않은 적격 호스트가 나열되므로 그룹화되지 않은 호스트를 확인할 수 있습니다. 해당 호스트 목록은 편집할 수 없습니다.

호스트 그룹을 삭제하면 Datadog은 해당 그룹의 규칙을 제거하며, Agent는 다음에 Remote Configuration을 폴링할 때 해당 규칙의 적용을 중단합니다.

호스트 그룹의 순서를 변경하려면 그룹 목록에서 핸들을 사용하여 그룹을 드래그하세요. 그룹 순서는 [계측 규칙이 평가되는 방식](#how-instrumentation-rules-are-evaluated)에 영향을 줍니다.

{{< img src="tracing/trace_collection/instrumentation-rules-host-groups.png" alt="Canary 그룹이 All hosts 그룹 위에 정렬되어 있고 Canary 그룹의 호스트가 나열된 Host Groups 페이지" style="width:100%;" >}}

#### 계측 규칙 생성 {#create-instrumentation-rules}

**참고**: Bits AI를 사용하여 자연어로 계측 규칙을 생성할 수 있습니다. Create instrumentation rule 창에서 {{< ui >}}Generate with Bits{{< /ui >}}를 클릭하고 계측할 프로세스를 설명하세요. Bits AI가 해당 규칙을 생성합니다.

계측 규칙을 생성하려면 다음 단계를 따르세요.

1. [Instrumentation Rules][20] 페이지에서 {{< ui >}}New Rule{{< /ui >}}을 클릭합니다. 또는 Host Groups 페이지에서 그룹을 선택하고 해당 {{< ui >}}Rules{{< /ui >}} 탭을 연 다음 {{< ui >}}Create a new rule{{< /ui >}}을 클릭합니다.
1. 하나 이상의 조건을 정의한 다음 {{< ui >}}Block Instrumentation{{< /ui >}} 또는 {{< ui >}}Allow Instrumentation{{< /ui >}}을 선택합니다. [규칙 조건 정의](#define-rule-conditions) 섹션을 참조하세요.

   {{< img src="tracing/trace_collection/instrumentation-rules-create-rule.png" alt="Language equals Python 조건, Allow Instrumentation 액션, Rule Impact Preview 패널이 표시된 Create instrumentation rule 창" style="width:100%;" >}}

1. {{< ui >}}Set host targeting{{< /ui >}}에서 {{< ui >}}All eligible hosts{{< /ui >}} 또는 {{< ui >}}Select host groups{{< /ui >}}를 선택합니다.

   둘 이상의 그룹을 선택하면 그룹이 단일 규칙을 공유하며, 나중에 편집하면 선택된 모든 그룹이 업데이트됩니다.

   {{< img src="tracing/trace_collection/instrumentation-rules-host-targeting.png" alt="Select host groups가 선택되고 Test라는 이름의 호스트 그룹이 선택된 Set host targeting 단계" style="width:80%;" >}}

1. 규칙의 이름을 지정한 다음 {{< ui >}}Next{{< /ui >}}를 클릭합니다.
1. 규칙을 검토합니다. Datadog은 각 대상 그룹의 규칙 목록 끝에 새 규칙을 추가합니다. 필요시 {{< ui >}}Set evaluation order{{< /ui >}} 아래에서 규칙을 드래그하여 각 그룹 내의 순서를 변경합니다. [계측 규칙이 평가되는 방식](#how-instrumentation-rules-are-evaluated) 섹션을 참조하세요.

   {{< img src="tracing/trace_collection/instrumentation-rules-review-order.png" alt="규칙 검토 단계로, 규칙 요약과 Test 호스트 그룹 내 규칙의 평가 순서가 표시되어 있습니다." style="width:100%;" >}}

1. {{< ui >}}Create Rule{{< /ui >}}을 클릭합니다.

Datadog은 50초 이내에 Remote Configuration을 통해 적격 호스트에 규칙을 배포합니다. 규칙이 배포된 후, 변경 사항을 적용하려면 영향을 받는 서비스를 다시 시작하세요. [Instrumentation Rules][20] 페이지의 {{< ui >}}Deployment Status{{< /ui >}} 카드에는 현재 규칙을 수신한 적격 호스트의 수가 표시됩니다.

Remote Configuration이 활성화되지 않은 호스트 등에서 규칙을 수동으로 적용하려면 규칙 목록 위의 {{< ui >}}Export{{< /ui >}}를 클릭하여 구성 파일을 내보낸 다음 호스트에 적용하세요.

#### 계측 규칙이 평가되는 방식 {#how-instrumentation-rules-are-evaluated}

각 프로세스에 대해 Datadog은 다음 순서로 계측 규칙을 평가하고 일치하는 첫 번째 규칙을 적용합니다.

1. 프로세스의 호스트가 속한 그룹의 규칙(그룹 순서대로 위에서 아래로). 각 그룹 내에서 규칙은 {{< ui >}}Set evaluation order{{< /ui >}} 아래에 설정된 순서대로 평가됩니다.
1. {{< ui >}}All eligible hosts{{< /ui >}}를 대상으로 하는 규칙. 이러한 규칙은 호스트 그룹 내의 호스트를 포함하여 모든 적격 호스트에 적용됩니다.

일치하는 규칙이 없으면 [기본 동작](#set-the-default-behavior)이 적용됩니다.

#### 규칙 조건 정의 {#define-rule-conditions}

각 규칙은 각각 하나 이상의 조건으로 구성됩니다. 규칙이 적용되려면 프로세스가 해당 규칙의 모든 조건을 충족해야 합니다. 조건에는 다음 요소가 포함되어 있습니다.
- {{< ui >}}Attribute{{< /ui >}}: 규칙이 평가하는 프로세스 속성입니다.
- {{< ui >}}Operator{{< /ui >}}: 비교 로직(`equals`, `not equals`, `prefix`, `contains`)입니다.
- {{< ui >}}Value{{< /ui >}}: 프로세스 이름이나 명령줄 플래그 등 일치시켜야 할 텍스트 또는 패턴입니다.

지원되는 속성은 다음과 같습니다.
| 속성 | 설명 | 예시 |
| --------- | ----------- | ------- |
| Operating System | 호스트의 OS입니다. | `linux` |
| Executable | 프로세스의 실행 파일 이름입니다. | `python3.11` |
| Executable Full Path | 실행 파일의 전체 경로입니다. | `/usr/bin/python3.11` |
| Arguments | 프로세스를 시작할 때 사용되는 명령줄 인수입니다. | `--env=production` |
| Working Directory | 프로세스의 작업 디렉터리입니다. | `/app` |
| Language | 프로세스에 대해 탐지된 프로그래밍 언어입니다. | `python` |
| Entry Point File | 애플리케이션을 시작할 때 사용되는 특정 파일입니다. | `app.py`, `server.js` |

#### 예시 사용 사례 {#example-use-cases}

계측 규칙을 적용하는 방법을 보여주는 다음 예시를 확인하세요.

{{% collapse-content title="예시 1: 특정 프로세스를 제외한 모든 프로세스 계측" level="h5" %}}

기본적으로 모든 프로세스를 계측합니다. 분석 cron 작업 및 Java 배치 프로세서 등 가치가 없는 노이즈만 유발하는 서비스를 제외하도록 차단 규칙을 추가합니다.

1. 기본 동작을 {{< ui >}}Allow everything else{{< /ui >}}로 설정합니다.
1. 각각 {{< ui >}}All eligible hosts{{< /ui >}}를 대상으로 하는 다음 규칙을 생성합니다.

   | 규칙 이름 | 조건 | 액션 |
   | --------- | --------- | ------ |
   | Exclude analytics cron job | <code>Working Directory</code> <code>contains</code> <code>analytics-service</code> | 계측 차단 |
   | Exclude batch services | <code>Entry Point File</code> <code>contains</code> <code>batch-processor.jar</code> | 계측 차단 |

{{% /collapse-content %}}

{{% collapse-content title="예시 2: 특정 프로세스만 계측" level="h5" %}}

기본적으로 모든 계측을 차단합니다. 특정 프로세스를 APM 대상에 포함하도록 허용 규칙을 추가하세요.

예를 들어, 체크아웃 서비스와 고객 포털만 계측하려면 다음 단계를 따르세요.

1. 기본 동작을 {{< ui >}}Block everything else{{< /ui >}}로 설정합니다.
1. 각각 {{< ui >}}All eligible hosts{{< /ui >}}를 대상으로 하는 다음 규칙을 생성합니다.

   | 규칙 이름 | 조건 | 액션 |
   | --------- | --------- | ------ |
   | Checkout service | <code>Working Directory</code> <code>equals</code> <code>/srv/checkout</code> | 계측 허용 |
   | Customer portal | <code>Working Directory</code> <code>equals</code> <code>/srv/customer-portal</code> | 계측 허용 |

{{% /collapse-content %}}

{{% collapse-content title="예시 3: 호스트 그룹을 사용하여 점진적으로 계측 롤아웃" level="h5" %}}

기본적으로 모든 계측을 차단하고 소수의 카나리 호스트에서만 허용합니다. 결과를 검증한 후 그룹에 호스트를 더 추가하거나 모든 적격 호스트를 대상으로 하도록 규칙을 변경하세요.

1. 기본 동작을 {{< ui >}}Block everything else{{< /ui >}}로 설정합니다.
1. 이름이 <code>canary</code> 인 호스트 그룹을 생성하고 먼저 계측할 호스트를 추가합니다.
1. 다음 설정으로 규칙을 생성합니다.

   | 설정 | 값 |
   | ------- | ----- |
   | Condition | <code>Language</code> <code>equals</code> <code>python</code> |
   | Action | Allow Instrumentation |
   | Host targeting | Select host groups: <code>canary</code> |

호스트에 있는 Python 애플리케이션 중 <code>canary</code> 그룹에 속한 애플리케이션만 계측됩니다. 기타 모든 애플리케이션은 계측되지 않습니다.

{{% /collapse-content %}}

## Agent에서 단일 단계 APM 계측 제거 {#remove-single-step-apm-instrumentation-from-your-agent}

인프라의 모든 서비스에서 트레이스 생성을 중지하려면 다음 단계를 따르세요.

1. 다음을 실행합니다.
   ```shell
   dd-host-install --uninstall
   ```
2. 호스트 또는 VM에서 서비스를 다시 시작합니다.

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
[21]: https://app.datadoghq.com/apm/instrumentation
[22]: https://app.datadoghq.com/organization-settings/api-keys
[23]: https://app.datadoghq.com/apm/services
[24]: /ko/remote_configuration/
[25]: /ko/account_management/rbac/permissions/