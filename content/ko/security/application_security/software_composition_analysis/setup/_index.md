---
aliases:
- /ko/security/application_security/enabling/tracing_libraries/sca/
disable_toc: false
further_reading:
- link: /security/application_security/software_composition_analysis
  tag: 문서
  text: 소프트웨어 구성 분석(SCA)
- link: https://www.datadoghq.com/blog/sca-prioritize-vulnerabilities/
  tag: 블로그
  text: Datadog SCA로 취약성 해결 우선 순위 지정하기
- link: /security/default_rules/?category=cat-application-security
  tag: 문서
  text: OOTB 애플리케이션 보안 관리 규칙
- link: /security/application_security/troubleshooting
  tag: 문서
  text: 애플리케이션 보안 관리 트러블슈팅
- link: /security/application_security/how-appsec-works/
  tag: 문서
  text: Datadog에서 애플리케이션 보안 관리가 작동하는 방식
- link: https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/
  tag: 블로그
  text: Datadog ASM을 통한 서버리스 애플리케이션 보안
title: Software Composition Analysis 설정
---

## 사전 필수 조건
Software Composition Analysis를 설정하기 전에 다음 필수 조건을 충족하는지 확인하세요.

1. **Datadog Agent 설치:** Datadog Agent는 애플리케이션의 운영 체제 또는 컨테이너, 클라우드 또는 가상 환경에 맞게 설치 및 구성되어 있습니다.
2. **Datadog APM 구성:** 애플리케이션 또는 서비스에 Datadog APM이 구성되어 있으며, Datadog에서 웹 추적(`type:web`)을 수신 중입니다.
3. **Tracing Library 호환:** 애플리케이션 또는 서비스에서 사용하는 Datadog Tracing Library가 애플리케이션 또는 서비스 언어에 대한 Software Composition Analysis 기능을 지원합니다. 자세한 내용은 각 ASM 제품의 [라이브러리 호환성][5] 페이지를 참고하세요.

## Software Composition Analysis 사용 유형

### 퀵 스타트 가이드

1. [빠른 시작 가이드][2]로 이동합니다.
   1. **Enable Vulnerability Detection**를 확장합니다.
   2. **Open source vulnerabilities**를 선택합니다.
   3. **Start Activation**을 선택합니다.
   4. 라이브러리 취약점을 식별하려는 서비스를 선택한 후 **Next**을 클릭합니다.
   5. **Enable for Selected Services**을 선택합니다.

### 설정 페이지

또는 [설정][3] 페이지를 통해 Software Composition Analysis를 활성화할 수 있습니다.

1. [Settings][3] 페이지로 이동하여 **Software Composition Analysis(SCA)** 에서 **Get Started**를 선택합니다.
2. 소스 코드에서 정적 분석을 하려면 **Select Repositories**을 선택합니다.
3. **Add Github Account**를 선택하고 [지침][4]에 따라 새 Github 애플리케이션을 생성합니다.
4. GitHub 계정이 설정되면 **Select Repositories**을 선택하고 **Software Composition Analysis(SCA)**을 활성화합니다.
5. 실행 중인 서비스에서 런타임 분석을 하려면 **Select Services**을 클릭합니다.
6. 라이브러리 취약점을 식별하려는 서비스를 선택하고 **Next**을 선택합니다.
7. **선택한 서비스에 사용**을 선택합니다.

### Datadog Tracing Libraries

Datadog Tracing Library 구성에 환경 변수 또는 새 인수를 추가합니다.

이 단계를 따르면 애플리케이션에 대한 Software Composition Analysis을 성공적으로 설정하여 애플리케이션 또는 서비스에서 사용하는 오픈 소스 라이브러리의 취약점을 포괄적으로 모니터링하고 식별할 수 있습니다.

Datadog Software Composition Analysis(SCA)을 사용하여 앱에서 오픈 소스  라이브러리를 모니터링할 수 있습니다.

SCA는 지원되는 언어에서 `-Ddd.appsec.sca.enabled` 플래그 또는 `DD_APPSEC_SCA_ENABLED` 환경 변수를 `true`로 설정하여 구성합니다.

- 자바(Java)
- .NET
- Go
- Ruby
- PHP
- Node.js
- 파이썬(Python)

이 항목에서는 Java 예제를 사용하여 SCA를 설정하는 방법을 설명합니다.

**예시: Java에서 Software Composition Analysis 활성화**

1. **[Datadog Java 라이브러리][1]**를 버전 0.94.0 이상(Software Composition Analysis 탐지 기능의 경우 버전 1.1.4 이상)으로 업데이트하세요.

   {{< tabs >}}
   {{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}
   서비스의 언어 및 프레임워크 버전이 ASM 기능을 지원하는지 확인하려면 [호환성][2]을 참고하세요.

1. 명령줄에서 **SCA를 활성화한 상태로 Java 애플리케이션을 실행합니다**.
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.sca.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   또는 애플리케이션이 실행되는 위치에 따라 다음 방법 중 하나를 선택합니다.

   **참고**: 현재 읽기 전용 파일 시스템은 지원되지 않습니다. 애플리케이션은 쓰기 가능한 `/tmp` 디렉터리에 대한 액세스 권한이 있어야 합니다.

   {{< tabs >}}
{{% tab "Docker CLI" %}}

`docker run` 명령에 다음 인수를 추가하여 APM에 대한 구성 컨테이너를 업데이트하세요.


```shell
docker run [...] -e DD_APPSEC_SCA_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

컨테이너 Dockerfile에 다음 환경 변수 값을 추가합니다.

```Dockerfile
ENV DD_APPSEC_SCA_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM에 대한 배포 구성 파일을 업데이트하고 SCA 환경 변수를 추가합니다.

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_SCA_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

환경 섹션에서 다음을 추가하여 ECS 작업 정의 JSON 파일을 업데이트합니다.

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_SCA_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

서비스 호출에서 `-Ddd.appsec.sca.enabled` 플래그 또는 `DD_APPSEC_SCA_ENABLED` 환경 변수를 `true`로 설정하세요.

```shell
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.sca.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

   {{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/security/application_security/software_composition_analysis/setup/compatibility/java
[2]: https://app.datadoghq.com/security/configuration/asm/onboarding
[3]: https://app.datadoghq.com/security/configuration/asm/setup
[4]: /ko/integrations/github/
[5]: /ko/security/application_security/software_composition_analysis/setup/compatibility/