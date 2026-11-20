---
aliases:
- /ko/security_platform/application_security/getting_started/dotnet
- /ko/security/application_security/getting_started/dotnet
code_lang: dotnet
code_lang_weight: 10
further_reading:
- link: /security/application_security/code_security/#code-level-vulnerabilities-list
  tag: 문서
  text: 지원되는 코드 수준 취약점 목록
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: 블로그
  text: Datadog Code Security로 운영 환경에서 애플리케이션 보안 강화
- link: https://www.datadoghq.com/blog/application-code-vulnerability-detection/
  tag: 블로그
  text: Datadog Code Security로 코드 취약점 파악
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: 블로그
  text: Datadog Code Security는 IAST 접근 방식을 사용하여 OWASP 벤치마크에서 100% 정확도를 달성했습니다.
- link: /security/application_security/troubleshooting
  tag: 문서
  text: 애플리케이션 보안 문제 해결
title: .NET용 Code Security 활성화
type: multi-code-lang
---

Docker, Kubernetes, Amazon ECS, AWS Fargate에서 실행되는 .NET 애플리케이션의 코드 수준 취약점을 탐지하고 애플리케이션 보안을 모니터링할 수 있습니다.

서비스에서 Code Security를 활성화하려면 다음 단계를 따르세요.

1. [Datadog Agent][3]를 최소 버전 7.41.1로 업데이트하세요.
2. Code Security를 활성화하는 데 필요한 최소 버전으로 Datadog Tracing Library를 업데이트하세요. 자세한 내용은 [Library Compatibility][4] 페이지를 참고하세요.
3. 애플리케이션 구성에 `DD_IAST_ENABLED=true` 환경 변수를 추가합니다. 예를 들어, Windows 자체 호스팅 환경에서는 애플리케이션 시작 스크립트의 일부로 다음 PowerShell 스니펫을 실행합니다.

   ```sh
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
   ```

또는 애플리케이션이 실행되는 위치에 따라 다음 방법 중 하나를 사용합니다.

 {{< tabs >}}
{{% tab "Windows-Self-Hosted" %}} 

Windows 콘솔에서:

```sh
rem Set environment variables
SET DD_IAST_ENABLED=true

rem Start application
dotnet.exe example.dll
```
{{% /tab %}}

{{% tab "IIS" %}} 

레지스트리 `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment`에서 필요한 환경 변수를 구성하고 IIS를 다시 시작하려면 다음 PowerShell 명령을 관리자 권한으로 실행하세요.

```sh
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
net stop was /y
net start w3svc
```
{{% /tab %}}


{{% tab "Linux" %}} 

애플리케이션 구성에 다음을 추가합니다.

```
DD_IAST_ENABLED=true
```
{{% /tab %}}

{{% tab "Docker CLI" %}} 

docker run 명령에 다음 인수를 추가하여 APM의 구성 컨테이너를 업데이트하세요.

```
docker run -d --name app -e DD_IAST_ENABLED=true company/app:latest
```
{{% /tab %}}

{{% tab "Dockerfile" %}} 

컨테이너 도커파일에 다음 환경 변수 값을 추가합니다.

```
ENV DD_IAST_ENABLED=true
```
{{% /tab %}}

{{% tab "Kubernetes" %}} 

APM의 배포 구성 파일을 업데이트하고 ASM 환경 변수를 추가합니다.

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
``` 
{{% /tab %}}

{{% tab "AWS ECS" %}} 

환경 섹션에서 이를 추가하여 ECS 작업 정의 JSON 파일을 업데이트합니다:

```yaml
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```
{{% /tab %}}

{{% tab "AWS Fargate" %}} 

컨테이너 Dockerfile에 다음 줄을 추가합니다.

```
ENV DD_IAST_ENABLED=true
```
{{% /tab %}}
   {{< /tabs >}}

Code Security가 실제로 어떻게 작동하는지 확인하려면 서비스를 탐색하고 [Vulnerability Explorer][4]에서 코드 수준 취약점을 찾으세요.

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="코드 취약점을 보여주는 동영상" video="true" >}}

추가 지원이 필요하시면 [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /ko/security/application_security/code_security/setup/compatibility/dotnet/
[3]: /ko/agent/versions/upgrade_between_agent_minor_versions/
[4]: /ko/security/application_security/code_security/setup/compatibility/