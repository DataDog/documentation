---
aliases:
- /ko/tracing/java
- /ko/tracing/languages/java
- /ko/agent/apm/java/
- /ko/tracing/setup/java
- /ko/tracing/setup_overview/java
- /ko/tracing/setup_overview/setup/java
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: GitHub
  text: Datadog Java APM 소스 코드
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
kind: 설명서
title: Java 애플리케이션 추적
type: multi-code-lang
---
## 호환성 요구사항

최신 Java Tracer는 JVM 버전 8 이상을 모두 지원합니다. JVM 버전 8 미만에 관한 자세한 정보는 [지원되는 JVM 런타임][10]을 참고하세요.

Datadog의 Java 버전과 프레임워크 지원(레거시 및 유지 보수 버전 포함) 전체 목록은 [호환성 요구사항][1]을 참고하세요.

## 시작하기

시작하기 전에 먼저 [에이전트를 설치하고 구성][18]했는지 확인하세요.

### 계측 방법 선택

Datadog 에이전트를 배포하거나 설치 및 설정한 후 다음 단계는 애플리케이션을 계측하는 것입니다. 애플리케이션이 실행되는 인프라스트럭처, 애플리케이션에 기록된 언어 및 필요한 설정 수준에 따라 다음과 같은 방법으로 이 작업을 실행할 수 있습니다.

지원되는 배포 시나리오 및 언어는 다음 페이지를 참고하세요.

- [계측 라이브러리를 로컬로 삽입][11]합니다(Agent에서).
- [트레이서 설치](#install-the-tracer) 섹션에 안내된 대로 애플리케이션에서 추적 라이브러리를 직접 추가합니다. [호환성 정보][1]에 대한 자세한 내용을 확인하세요.

### 애플리케이션 계측

Kubernetes 애플리케이션, Linux 호스트, 또는 컨테이너의 애플리케이션에서 트레이스를 수집하는 중인 경우, 다음 지침 대신 추적 라이브러리를 애플리케이션에 삽입할 수 있습니다. 자세한 내용은 [라이브러리 삽입][11]을 참조하세요.

에이전트가 설치된 후 애플리케이션 추적을 시작하세요.

1. 최신 트레이서 클래스 파일이 포함되어 있는 `dd-java-agent.jar`를 내 Datadog 사용자로 액세스할 수 있는 폴더에 다운로드합니다.

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

**참고:** 특정 **주** 버전의 최신 빌드를 다운로드하려면 `https://dtdg.co/java-tracer-vX` 링크를 대신 사용하고, `X`를 원하는 주 버전으로 대체하세요.
 예를 들어, `https://dtdg.co/java-tracer-v1`은 최신 버전 1의 빌드입니다. 이 때 부 버전 숫자를 포함하지 마세요. 또는 Datadog의 [Maven 리포지토리][3]에서 특정 버전을 찾으세요.

2. IDE, Maven이나 Gradle 애플리케이션 스크립트, 또는 `java -jar` 명령에서 앱을 실행하고 Continuous Profiler, 배포 추적, 로그 삽입(Datadog로 로그를 전송하는 경우)을 사용하려면 `-javaagent` JVM 인수와 다음 중 적용 가능한 구성 옵션을 추가하세요.

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
   반드시 이미지 크기를 줄이고 모듈을 누락해야 한다면 [jdeps][19] 명령을 사용해 종속성을 확인할 수 있습니다. 그러나 필요한 모듈이 바뀔 수 있으니, 사용할 때 이 위험성을 알고 사용하세요.

   <div class="alert alert-danger">프로파일링을 활성화하면 APM 번들에 따라 요금에 영향을 미칩니다. 자세한 정보는<a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">요금 페이지</a>를 참고하세요.

| 환경 변수      | 시스템 속성                     | 설명|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | 내 애플리케이션 환경(`production`, `staging` 등) |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Datadog 트레이스와 스팬 ID에 자동 MDC 키 삽입을 활성화합니다. 자세한 정보는 [고급 사용][6]을 참고하세요. <br><br>**베타**: 버전 1.18.3부터 [Agent Remote Configuration[16] 서비스가 있고 활성화되어 있으면 [Service Catalog][17] UI에서 `DD_LOGS_INJECTION`을 설정할 수 있습니다. |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | [Continuous Profiler][5] 활성화 |
| `DD_SERVICE`   | `dd.service`     | 동일한 작업을 하는 프로세스 세트 이름. 애플리케이션 통계를 그룹화할 때 사용됨. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   모든 서비스에서 트레이스의 루트 수준 샘플링 속도를 설정.<br><br>**베타**: 버전 1.18.3부터 [Agent Remote Configuration][16] 서비스가 있고 활성화되어 있으면 [Service Catalog][17] UI에서 `DD_TRACE_SAMPLE_RATE`을 설정할 수 있습니다.     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   특정 규칙과 일치하는 서비스에서 트레이스의 루트 수준 샘플링 속도를 설정.    |
| `DD_VERSION` | `dd.version` |  내 애플리케이션 버전(예: `2.5`, `202003181415`, 또는 `1.3-alpha`) |

추가 [구성 옵션]](#configuration)은 아래를 참고하세요.


### Java Tracer를 JVM에 추가

내 애플리케이션 서버의 설명서를 참고해 올바른 방법으로 `-javaagent`와 다른 JVM 인수를 전달하세요. 다음은 일반적으로 많이 사용되는 지침 예시입니다.

{{< tabs >}}
{{% tab "Spring Boot" %}}

내 앱 이름이 `my_app.jar`인 경우, `my_app.conf`를 생성하고 다음을 포함하세요.

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

자세한 정보는 [Spring Boot 설명서][1]를 참고하세요.


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

Tomcat 시작 스크립트 파일을 여세요. 예를 들어 Linux에서 `setenv.sh`를 실행하고 다음을 추가합니다.

```text
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

또는 Windows에서 `setenv.bat`:

```text
set CATALINA_OPTS=%CATALINA_OPTS% -javaagent:"c:\path\to\dd-java-agent.jar"
```
`setenv` 파일이 존재하지 않는 경우 Tomcat 프로젝트 폴더의 `./bin` 디렉터리에 생성하세요.

{{% /tab %}}
{{% tab "JBoss" %}}

- 독립형 모드:

  `standalone.conf` 끝에 다음 줄을 추가하세요.

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- Windows의 독립형 모드에서는 `standalone.conf.bat`의 끝에 다음 줄을 추가하세요.

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- 도메인 모드:

  `domain.xml` 파일의 server-groups.server-group.jvm.jvm-options 태그 아래 다음을 추가하세요.

```text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

자세한 내용은 [JBoss 설명서][1]를 참고하세요.


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

`jetty.sh`를 사용해 Jetty를 서비스로 시작하는 경우 편집해 다음을 추가하세요.

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

`start.ini`를 사용해 Jetty를 시작하는 경우 다음 줄을 추가하세요( `--exec` 아래에 추가, 없을 경우에는 `--exec' 줄 추가).

```text
-javaagent:/path/to/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

관리형 콘솔:

1. **Servers**를 선택합니다. **Server Type** 아래 **WebSphere application servers**를 선택하고 내 서버를 선택합니다.
2. **Java and Process Management > Process Definition**을 선택합니다.
3. **Additional Properties** 섹션에서 **Java Virtual Machine**을 클릭합니다.
4. **Generic JVM arguments** 텍스트 필드에 다음을 입력합니다.

```text
-javaagent:/path/to/dd-java-agent.jar
```

추가 정보와 옵션은 [WebSphere docs][1]를 참고하세요.

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}}
{{< /tabs >}}

**Note**

- `java -jar` 명령에 `-javaagent` 인수를 추가하는 경우 `-jar` 인수 _전_에 애플리케이션 인수가 아닌 JVM 옵션으로 추가해야 합니다. 다음 예를 참고하세요.

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

  자세한 정보는 [Oracle 설명서][7]를 참고하세요.

- 예측하지 못한 동작이 일어날 수 있으니 `dd-java-agent`를 classpath에 절대 추가하지 마세요.

## 자동 계측

Java용 자동 계측에는 [JVM에서 제공하는][8] `java-agent` 계측 기능을 사용합니다. `java-agent`가 등록된 경우에는 로딩 시간에 클래스 파일이 수정됩니다.

**Note:** 원격 ClassLoader로 로드된 클래스는 자동으로 계측되지 않습니다.

계측은 자동 계측, OpenTracing API, 또는 두 가지 방법이 복합적으로 작동해 실행됩니다. 일반적으로 계측을 통해 다음 정보를 캡처할 수 있습니다.

- 타이밍 기간은 OpenTracing API의 타임스탬프가 아니면 JVM의 NanoTime 시계가 캡처합니다.
- 키/값 태그 쌍
- 애플리케이션이 처리하지 않는 오류와 스택 트레이스
- 시스템에 흐르고 있는 총 트레이스(요청) 수

## 구성

필요한 경우 통합 서비스 태깅 설정을 포함하여 필요에 따라 애플리케이션 성능 원격 측정 데이터를 전송하도록 추적 라이브러리를 설정합니다. 자세한 내용은 [라이브러리 구성][9]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[4]: /ko/account_management/billing/apm_tracing_profiler/
[5]: /ko/profiler/
[6]: /ko/tracing/other_telemetry/connect_logs_and_traces/java/
[7]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: /ko/tracing/trace_collection/library_config/java/
[10]: /ko/tracing/trace_collection/compatibility/java/#supported-jvm-runtimes
[11]: /ko/tracing/trace_collection/library_injection_local/
[16]: /ko/agent/remote_config/
[17]: https://app.datadoghq.com/services
[18]: /ko/tracing/trace_collection#install-and-configure-the-agent
[19]: https://docs.oracle.com/en/java/javase/11/tools/jdeps.html