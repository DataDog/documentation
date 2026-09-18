---
aliases:
- /ko/security_platform/application_security/getting_started/dotnet
- /ko/security/application_security/getting_started/dotnet
- /ko/security/application_security/enabling/tracing_libraries/threat_detection/dotnet/
- /ko/security/application_security/threats/setup/threat_detection/dotnet
- /ko/security/application_security/threats_detection/dotnet
- /ko/security/application_security/setup/aws/fargate/dotnet
code_lang: dotnet
code_lang_weight: 10
further_reading:
- link: /security/application_security/add-user-info/
  tag: 설명서
  text: 트레이스에 사용자 정보 추가
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: 소스 코드
  text: .NET Datadog 라이브러리 소스 코드
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 트러블슈팅
title: .NET용 AAP 활성화
type: multi-code-lang
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection은 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

Docker, Kubernetes, Amazon ECS 및 AWS Fargate에서 실행되는 .NET 앱에 대한 App and API Protection(AAP)를 모니터링할 수 있습니다.

{{% appsec-getstarted %}}

## 위협 탐지 활성화 {#enabling-threat-detection}
### 시작하기 {#get-started}

1. **대상 운영 체제 아키텍처에 맞는 [Datadog .NET 라이브러리][1]**를 최소 2.2.0 버전으로 업데이트합니다.

   서비스의 언어 및 프레임워크 버전이 AAP 기능을 지원하는지 검사하려면 [호환성][2]을 참고하세요.

2. **AAP를 활성화하려면** `DD_APPSEC_ENABLED` 환경 변수를 `true`로 설정하세요. 예를 들어, Windows 자체 호스팅 환경에서는 애플리케이션 시작 스크립트의 일부로 다음 PowerShell 스니펫을 실행합니다.
   ```
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
   ```

   **또는** 애플리케이션이 실행되는 위치에 따라 다음 방법 중 하나를 선택합니다.

   {{< tabs >}}
{{% tab "Windows 자체 호스팅" %}}

Windows 콘솔에서:

```
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET DD_APPSEC_ENABLED=true

rem Start application
dotnet.exe example.dll
```

{{% /tab %}}
{{% tab "IIS" %}}

관리자 권한으로 다음 PowerShell 명령을 실행하여 레지스트리에 필요한 환경 변수를 구성하고 `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` IIS를 다시 시작합니다.

```
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
net stop was /y
net start w3svc
```

**또는** IIS 서비스 전용의 경우, 관리자 권한으로 PowerShell을 사용하여 WAS 및 W3SVC에서 다음을 실행합니다.

```
$appsecPart = "DD_APPSEC_ENABLED=true"
[string[]] $defaultvariable = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}", $appsecPart)

function Add-AppSec {

    param (
        $path
    )
    $v = (Get-ItemProperty -Path $path).Environment
    If ($v -eq $null) {
        Set-ItemProperty -Path $path -Name "Environment" -Value $defaultvariable
    }
    ElseIf (-not ($v -match $appsecPart)) {
        $v += " " + $appsecPart;
        Set-ItemProperty -Path $path -Name "Environment" -Value $v
    }
}
Add-AppSec -path "HKLM:SYSTEM\CurrentControlSet\Services\WAS\"
Add-AppSec -path "HKLM:SYSTEM\CurrentControlSet\Services\W3SVC\"

net stop was /y
net start w3svc
```

**또는** 레지스트리 키 편집을 피하려면 애플리케이션의 `web.config` 파일을 편집합니다.

```xml
<configuration>
  <appSettings>
        <add key="DD_APPSEC_ENABLED" value="true"/>
  </appSettings>
</configuration>
```

이는 `applicationHost.config` 파일 내에서 수행할 수 있으며, 보통 `C:\Windows\System32\inetsrv\config\`에 위치합니다.

```xml
<system.applicationHost>

    <applicationPools>
        <add name="DefaultAppPool">
            <environmentVariables>
                <add name="DD_APPSEC_ENABLED" value="true" />
            </environmentVariables>
            (...)
```

{{% /tab %}}
{{% tab "Linux" %}}

애플리케이션 설정에 다음을 추가합니다.

```conf
DD_APPSEC_ENABLED=true
```
{{% /tab %}}
{{% tab "Docker CLI" %}}

APM용 컨테이너 구성을 업데이트하려면 `docker run` 명령에 다음 인수를 추가하세요.

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

컨테이너 도커파일에 다음 환경 변수 값을 추가합니다.

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM에 대한 배포 구성 파일을 업데이트하고 AAP 환경 변수를 추가하세요.

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

환경 섹션에서 이를 추가하여 ECS 작업 정의 JSON 파일을 업데이트합니다.

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

컨테이너의 Dockerfile에 다음 줄을 추가하세요.

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}

{{< /tabs >}}

3. **애플리케이션을 완전히 중지한 후 다시 시작하세요**.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Signals 탐색기 및 세부 정보, Vulnerabilities 탐색기 및 세부 정보를 보여주는 동영상입니다." video="true" >}}

## APM 추적 없이 AAP 사용{#using-aap-without-apm-tracing}

APM 추적 기능 없이 App and API Protection을 사용하려면 추적을 비활성화한 상태로 배포할 수 있습니다.

1.  SDK를 구성할 때 `DD_APM_TRACING_ENABLED=false` 환경 변수와 함께 추가로 `DD_APPSEC_ENABLED=true` 환경 변수를 지정하세요.
2. 이 구성은 Datadog으로 전송되는 APM 데이터 양을 App and API Protection 제품에 필요한 최소한으로 줄입니다.

자세한 내용은 [독립형 App and API Protection][standalone_billing_guide]을 참조하세요.
[standalone_billing_guide]: /security/application_security/guide/standalone_application_security/

{{% aap/aap_and_api_protection_verify_setup %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /ko/security/application_security/setup/compatibility/dotnet/
[3]: /ko/agent/versions/upgrade_between_agent_minor_versions/
[4]: /ko/security/application_security/setup/compatibility/