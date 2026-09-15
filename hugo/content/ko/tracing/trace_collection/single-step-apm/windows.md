---
aliases:
- /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/windows
code_lang: windows
code_lang_weight: 30
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: 설명서
  text: 런타임 메트릭 활성화
title: Windows에서 단일 단계 APM 계측 사용
type: multi-code-lang
---
## 개요 {#overview}

SSI(단일 단계 계측)를 사용하면 단일 Datadog Agent 설치 명령을 사용하여 Windows VM에서 Java 및 .NET 애플리케이션에 대한 APM을 활성화할 수 있습니다.

{{< skill-callout
    title="에이전트를 사용해 APM 설정하기"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Windows에서 APM 활성화 {#enable-apm-on-windows}

<div class="alert alert-info">계속 진행하기 전에 <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI 호환성 가이드를 검토하여 환경이 호환되는지 확인하세요.</a></div>

### 새 Agent 설치 {#new-agent-installation}

Datadog Agent가 아직 설치되지 않은 경우 다음 단계에 따라 Datadog Agent를 설치하고 SSI를 동시에 활성화합니다.

다음 방법으로 Windows에서 APM을 활성화할 수 있습니다:
* IIS에서 .NET 애플리케이션만 계측
* 전체 Windows 호스트에서 모든 Java 및 .NET 애플리케이션 계측

{{< tabs >}}
{{% tab "IIS" %}}

IIS에서 실행 중인 .NET 애플리케이션만 계측하려면 다음 작업을 수행합니다.

1. Windows 호스트의 관리자 PowerShell 세션에서 다음 명령 중 하나를 실행합니다. `<YOUR_DD_API_KEY>`를 [Datadog API 키][2]로 대체합니다.

   PowerShell 설치 프로그램 사용:

   ```powershell
   [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; $env:DD_API_KEY = '<YOUR_DD_API_KEY>'; $env:DD_SITE = '{{< region-param key="dd_site" >}}'; $env:DD_APM_INSTRUMENTATION_ENABLED = 'iis'; $env:DD_APM_INSTRUMENTATION_LIBRARIES = 'dotnet:3'; (New-Object System.Net.WebClient).DownloadFile('https://install.datadoghq.com/datadog-installer-x86_64.exe', 'C:\Windows\SystemTemp\datadog-installer-x86_64.exe'); C:\Windows\SystemTemp\datadog-installer-x86_64.exe
   ```

   Alternatively, install with the MSI:

   ```powershell
   $p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /norestart /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<YOUR_DD_API_KEY>" SITE="{{< region-param key="dd_site" >}}" DD_APM_INSTRUMENTATION_ENABLED="iis" DD_APM_INSTRUMENTATION_LIBRARIES="dotnet:3"'
   if ($p.ExitCode -ne 0) { Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red }
   ```

   To install a different .NET version, change `dotnet:3`, or omit `DD_APM_INSTRUMENTATION_LIBRARIES` to install the latest.

   **Note**: The Chocolatey installation method does not preserve the SSI settings and cannot be used to enable SSI.

1. Restart the IIS applications you want instrumented. (You do not need to restart the entire IIS server.)

The Agent then automatically loads the Datadog .NET SDK into supported application processes to enable distributed tracing.

**Generate the command from Datadog**: To get a command pre-filled with your API key and site, go to [Install the Datadog Agent on Windows][1] and, in the {{< ui >}}Customize your observability coverage{{< /ui >}} section, toggle {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}. To pin the .NET SDK version, select {{< ui >}}Customize Library Versions{{< /ui >}} under {{< ui >}}Instrumentation Configuration{{< /ui >}}. Then copy and run the generated command.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}

{{% tab "호스트 전체(미리 보기)" %}}

<div class="alert alert-info">
<strong>미리 보기에 참여하세요!</strong><br>
Windows용 호스트 전체 계측은 미리 보기 상태이며 미리 보기 참가자로 제한됩니다. 이 탭에 설명된 설치 및 구성 옵션은 등록 후에만 Datadog에 나타납니다. 미리 보기에 참여하려면 <a href="https://www.datadoghq.com/product-preview/single-step-instrumentation-on-windows-vms/" class="alert-link">액세스 권한을 요청</a>하세요.
</div>

전체 Windows 호스트에서 Java 및 .NET 애플리케이션을 계측하려면 다음 작업을 수행합니다.

1. Datadog에서 [Install the Datadog Agent on Windows][1]로 이동합니다.
1. {{< ui >}}Customize your observability coverage{{< /ui >}} 섹션에서 {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}을 토글합니다.
1. (선택 사항) SDK 버전을 설정합니다.
   
   기본적으로 단일 단계 계측은 지원되는 최신 버전의 Datadog .NET 및 Java SDK를 설치합니다. 특정 버전을 고정해야 하는 경우:

   1. {{< ui >}}Instrumentation Configuration{{< /ui >}} 아래에서 {{< ui >}}Customize Library Versions{{< /ui >}}을 선택합니다.
   1. .NET 아래에서 사용할 버전을 선택합니다.

1. 제공된 설치 명령을 복사하여 Windows 호스트에서 실행합니다. 사용자가 미리 보기에 등록된 후 Datadog는 앱 내에서 이 명령을 생성합니다.
1. 계측 규칙을 구성합니다.

   호스트 전체 SSI는 호스트의 모든 Java 애플리케이션과 IIS에서 실행 중인 모든 .NET 애플리케이션을 자동으로 계측합니다. IIS 외부에서 실행되는 .NET 애플리케이션을 계측하려면 이러한 애플리케이션을 허용하는 [계측 규칙을 정의](#define-instrumentation-rules)해야 합니다. 계측 규칙을 사용하여 호스트의 어떤 Java 애플리케이션이나 IIS의 .NET 애플리케이션을 계측할지 세밀하게 제어할 수도 있습니다.

1. 계측하려는 서비스를 다시 시작합니다.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">SSI는 계측된 애플리케이션에 약간의 시작 시간을 추가합니다. 사용 사례에서 이 오버헤드를 수용할 수 없는 경우, <a href="/help/">Datadog 지원팀</a>에 문의하세요.</div>

### 기존 Agent 설치 {#existing-agent-installation}

Datadog Agent가 이미 설치되어 있는 경우 Fleet Automation을 사용하여 SSI를 활성화합니다.

1. Datadog에서 [{{< ui >}}Fleet Automation{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}}][6]으로 이동합니다.
1. {{< ui >}}Configure Agents{{< /ui >}}를 클릭합니다.
1. 필터를 적용하여 구성하려는 에이전트를 선택한 다음 **Next**를 클릭합니다.

   {{< img src="tracing/trace_collection/filter-agents.png" alt="Fleet Automation의 에이전트 필터링 화면(환경, 운영 체제, 호스트 이름별로 범위를 지정하는 옵션 표시)" style="width:100%;" >}}

1. {{< ui >}}Application Performance Monitoring (APM){{< /ui >}} 타일을 클릭한 다음 {{< ui >}}Next{{< /ui >}}를 클릭합니다.

   {{< img src="tracing/trace_collection/select-products-core-obs.png" alt="Fleet Automation의 제품 선택 화면(Application Performance Monitoring(APM) 타일 표시)" style="width:80%;" >}}

1. {{< ui >}}Configure SDKs Installation{{< /ui >}} 화면에서 {{< ui >}}Yes{{< /ui >}}을 클릭하여 SDK를 자동으로 설치합니다. {{< ui >}}Use latest version{{< /ui >}}을 선택하거나 선택을 해제하여 개별 SDK 버전을 지정합니다.

   {{< img src="tracing/trace_collection/configure-sdks-installation.png" alt="Fleet Automation의 SDK 설치 구성 화면(자동 SDK 설치를 활성화하고 버전을 선택할 수 있는 옵션 표시)" style="width:60%;" >}}

1. {{< ui >}}Next{{< /ui >}}를 클릭합니다.
1.  구성을 검토하고 {{< ui >}}Deploy Configuration{{< /ui >}}을 클릭합니다.
1. 계측 규칙을 구성합니다.

   호스트 전체 SSI는 호스트의 모든 Java 애플리케이션과 IIS에서 실행 중인 모든 .NET 애플리케이션을 자동으로 계측합니다. IIS 외부에서 실행되는 .NET 애플리케이션을 계측하려면 이러한 애플리케이션을 허용하는 [계측 규칙을 정의](#define-instrumentation-rules)해야 합니다. 계측 규칙을 사용하여 호스트의 어떤 Java 애플리케이션이나 IIS의 .NET 애플리케이션을 계측할지 세밀하게 제어할 수도 있습니다.

##  설치 확인 {#verify-the-installation}

1. 관리자 PowerShell 세션에서 Agent가 정상 상태이고 APM Agent가 실행 중인지 확인합니다.

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

   출력의 **APM Agent** 섹션을 확인합니다.

1. 계측된 애플리케이션에서 트래픽을 수신한 후 [APM Services 페이지][7]에 서비스 정보가 나타나는지 확인합니다. 몇 분 내에 나타나지 않으면 [SSI 문제 해결 가이드][4]를 따르세요.

## Unified Service Tags 구성 {#configure-unified-service-tags}

Unified Service Tags(UST)는 트레이스, 메트릭, 로그에 일관된 태그를 적용해 탐색 및 관측 가능성 데이터 상호 연계가 간편합니다. [Windows 서비스의 UST 설정][2] 방법을 알아보세요.

## SDK 종속적 제품 및 기능 활성화 {#enable-sdk-dependent-products-and-features}

SSI가 애플리케이션에 Datadog SDK를 로드하고 분산 트레이싱을 활성화하고 나면 SDK에 의존하는 추가적인 제품을 구성할 수 있습니다.

{{< ssi-products >}}

제품을 활성화하려면 애플리케이션 구성에서 [환경 변수를 설정][3]합니다.

## 고급 옵션{#advanced-options}

### 계측 규칙 정의하기 {#define-instrumentation-rules}

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a>에서는 계측 규칙이 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<div class="alert alert-info">계측 규칙(Agent v7.73 이상에서 사용 가능)은 호스트 전체 계측에만 적용됩니다. IIS 전용 설치에는 지원되지 않습니다.</div>
{{< /site-region >}}

계측 규칙을 사용하면 Windows 호스트에서 SSI에 의해 자동으로 계측되는 프로세스를 제어할 수 있습니다. IIS 외부에서 실행되는 .NET 애플리케이션을 계측하려면 규칙이 필요합니다. 또한 호스트의 Java 애플리케이션이나 IIS의 .NET 애플리케이션 중 어떤 것을 계측할지 세밀하게 제어하는 데에도 유용합니다.

계측 규칙 구성하기:

1. Datadog에서 {{< ui >}}APM{{< /ui >}} > {{< ui >}}Service Setup{{< /ui >}} > [{{< ui >}}Manage Instrumentation Rules{{< /ui >}}][5]로 이동합니다.
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

원격 구성이 활성화된 경우, 규칙이 모든 호스트에 배포되고 50초 이내에 SSI가 활성화된 호스트에 적용됩니다. 또는 {{< ui >}}Export{{< /ui >}}를 클릭하여 구성 파일을 내보내고 호스트에 수동으로 적용합니다.

#### 규칙 조건 정의 {#define-rule-conditions}

규칙은 각각 하나 이상의 조건으로 구성됩니다. 조건에는 다음 요소가 포함되어 있습니다.
- {{< ui >}}Attribute{{< /ui >}}: 규칙이 평가하는 프로세스 속성입니다.
- {{< ui >}}Operator{{< /ui >}}: 비교 로직(`equals`, `not equals`, `prefix`, `contains`)입니다.
- {{< ui >}}Value{{< /ui >}}: 프로세스 이름이나 명령줄 플래그 등 일치시켜야 할 텍스트 또는 패턴입니다.

지원되는 속성은 다음과 같습니다.
| 속성 | 설명 | 예시 |
| --------- | ----------- | ------- |
| 운영 체제 | 호스트의 OS입니다. | `windows` |
| 실행 파일 | 프로세스의 실행 파일 이름입니다. | `w3wp.exe` |
| 실행 파일 전체 경로 | 실행 파일의 전체 경로입니다. | `C:\Windows\System32\inetsrv\w3wp.exe` |
| 인수 | 프로세스를 시작할 때 사용되는 명령줄 인수입니다. | `--env=production` |
| 작업 디렉터리 | 프로세스의 작업 디렉터리입니다. | `C:\inetpub\wwwroot` |
| 언어 | 프로세스에 대해 탐지된 프로그래밍 언어입니다. | `dotnet` |
| 진입점 파일 | 애플리케이션을 시작할 때 사용되는 특정 파일입니다. | `MyService.dll`, `app.py` |
| IIS 애플리케이션 풀 | 작업자 프로세스를 호스트하는 IIS 애플리케이션 풀입니다. 모든 IIS 작업자가 `w3wp.exe` 실행 파일을 공유하므로, 이는 IIS에서 특정 .NET 앱을 타겟팅하는 가장 안정적인 방법입니다. | `DefaultAppPool`, `MyWebApp` |

#### 사용 사례 {#example-use-cases}

계측 규칙을 적용하는 방법을 보여주는 다음 예시를 확인하세요.

{{< collapse-content title="예시 1: 특정 프로세스를 제외한 모든 프로세스 계측" level="h5" >}}

기본적으로 모든 프로세스를 계측합니다. 분석 cron 작업 및 Java 배치 프로세서 등 가치가 없는 노이즈만 유발하는 서비스를 제외하도록 차단 규칙을 추가합니다.

{{< img src="tracing/trace_collection/instrumentation-rules-example-1.png" alt="작업 디렉터리 및 진입점 파일 조건에 대한 두 가지 계측 차단 규칙(기본값으로 계측 허용 설정)" style="width:100%;" >}}

{{< /collapse-content >}}

{{< collapse-content title="예시 2: 특정 IIS 애플리케이션만 계측" level="h5" >}}

기본적으로 모든 계측을 차단합니다. 특정 IIS 애플리케이션을 APM에 포함하도록 허용 규칙을 추가합니다. 모든 IIS 작업자가 <code>w3wp.exe</code> 실행 파일을 공유하므로 {{< ui >}}IIS Application Pool{{< /ui >}}을 사용하여 대상 애플리케이션을 식별합니다. 이 접근 방식은 점진적인 롤아웃에 유용합니다.

{{< img src="tracing/trace_collection/instrumentation-rules-example-2.png" alt="이름별로 특정 IIS 애플리케이션 풀을 타겟팅하는 계측 허용 규칙 2개(기본값: 계측 차단)" style="width:100%;" >}}

{{< /collapse-content >}}

## Agent에서 단일 단계 APM 계측 제거 {#remove-single-step-apm-instrumentation-from-your-agent}

호스트에서 .NET용 SSI를 비활성화하려면 다음 작업을 수행합니다.

```shell
&"C:\Program Files\Datadog\Datadog Agent\bin\datadog-installer.exe" remove datadog-apm-library-dotnet
```

## 문제 해결 {#troubleshooting}

SSI를 사용한 APM 활성화와 관련한 문제가 발생하는 경우, [SSI 문제 해결 가이드][4]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /ko/integrations/windows-service/#tags
[3]: /ko/tracing/trace_collection/library_config/
[4]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[5]: https://app.datadoghq.com/apm/service-setup/workload-selection
[6]: https://app.datadoghq.com/fleet/agent-management
[7]: https://app.datadoghq.com/apm/services