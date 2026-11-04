---
code_lang: linux
code_lang_weight: 30
further_reading:
- link: /security/application_security/how-it-works/
  tag: 설명서
  text: App and API Protection의 작동 방식
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 문제 해결
title: Linux에서 Java용 App and API Protection 설정
type: multi-code-lang
---
{{% app_and_api_protection_java_setup_options platform="linux" %}}

{{% app_and_api_protection_java_overview %}}

## 전제 조건 {#prerequisites}

- Linux 운영체제
- Java 애플리케이션
- 루트 또는 sudo 권한
- Systemd(서비스 관리용)
- Datadog API 키
- Datadog Java SDK(버전 요구 사항은 [여기][1] 참조)

## 1. Datadog Agent 설치 {#1-installing-the-datadog-agent}

[Linux 호스트용 설정 지침][3]에 따라 Datadog Agent를 설치합니다.

## 2. App and API Protection 모니터링 활성화 {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### App and API Protection 모니터링 수동 활성화 {#manually-enabling-app-and-api-protection-monitoring}

Datadog Java 라이브러리 최신 버전을 다운로드합니다.

```bash
wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
```

{{% collapse-content title="APM 추적 활성화" level="h4" %}}
{{< tabs >}}
{{% tab "시스템 속성 사용" %}}

시스템 속성을 사용하여 Datadog Agent 및 App and API Protection을 활성화한 상태에서 Java 애플리케이션을 시작합니다.

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```

{{% /tab %}}
{{% tab "환경 변수 사용" %}}

필수 환경 변수를 설정하고 Java 애플리케이션을 시작합니다.

```bash
export DD_APPSEC_ENABLED=true
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>

java -javaagent:/path/to/dd-java-agent.jar -jar path/to/app.jar
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="APM 추적 비활성화" level="h4" %}}
App and API Protection을 활성화한 상태에서 APM 추적을 비활성화하려면 APM 추적 변수를 'false'로 설정해야 합니다.
{{< tabs >}}
{{% tab "시스템 속성 사용" %}}

시스템 속성을 사용하여 Datadog Agent 및 App and API Protection을 활성화한 상태에서 Java 애플리케이션을 시작합니다.

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.apm.tracing.enabled=false -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```

{{% /tab %}}
{{% tab "환경 변수 사용" %}}

필수 환경 변수를 설정하고 Java 애플리케이션을 시작합니다.

```bash
export DD_APPSEC_ENABLED=true
export DD_APM_TRACING_ENABLED=false
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>

java -javaagent:/path/to/dd-java-agent.jar -jar path/to/app.jar
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. 애플리케이션 실행 {#3-run-your-application}

위 설정을 통해 Java 애플리케이션을 시작합니다.

{{% aap/aap_and_api_protection_verify_setup %}}

## 문제 해결 {#troubleshooting}

Java 애플리케이션에 App and API Protection을 설정하는 과정에서 문제가 발생할 경우, [Java App and API Protection 문제 해결 가이드][2]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/setup/compatibility/java
[2]: /ko/security/application_security/setup/java/troubleshooting
[3]: /ko/agent/?tab=Linux