---
title: Java 애플리케이션 추적
aliases:
    - /tracing/java
    - /tracing/languages/java
    - /agent/apm/java/
    - /tracing/setup/java
    - /tracing/setup_overview/java
    - /tracing/setup_overview/setup/java
    - /tracing/trace_collection/automatic_instrumentation/dd_libraries/java
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-java'
      tag: "Source Code"
      text: 'Datadog Java APM 소스 코드'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: '서비스, 리소스, 트레이스 둘러보기'
---
## 호환성 요구 사항

최신 Java Tracer는 JVM 버전 8 이후의 모든 버전을 지원합니다. JVM 8 이전 버전에 관한 자세한 정보는 [지원되는 JVM 런타임][10]을 읽어보세요.

Datadog의 Java 버전 및 프레임워크 지원 전체 목록(레거시 및 유지 관리 버전 포함)은 [호환성 요구 사항][1]을 읽어보세요.

## 시작하기

시작하기 전에, [Agent를 설치하고 구성][18]했는지 확인하세요.

### 애플리케이션 계측

Datadog Agent를 설치하고 구성했으면, 다음 단계로 애플리케이션을 계측할 트레이싱 라이브러리를 애플리케이션에 직접 추가합니다. 자세한 정보는 [호환성 정보][1]를 참조하세요.

애플리케이션 추적을 시작하는 방법:

1. 최신 트레이서 클래스 파일을 포함하는 `dd-java-agent.jar`를 Datadog 사용자가 액세스할 수 있는 폴더에 다운로드합니다.

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

   **참고:** 특정 **메이저** 버전의 최신 빌드를 다운로드하려면 대신 `https://dtdg.co/java-tracer-vX` 링크를 사용하세요. 여기서 `X`는 원하는 메이저 버전입니다.
   예를 들어 최신 버전 1 빌드의 경우, `https://dtdg.co/java-tracer-v1`을 사용합니다. 마이너 버전 번호는 포함하지 말아야 합니다. 아니면, Datadog의 [Maven 리포지토리][3]에서 특정 버전을 참조하세요.

   **참고**: Release Candidate 버전은 GitHub [DataDog/dd-trace-java releases][21]에서 제공됩니다. 이러한 버전에는 "RC"가 포함되어 있으며, 프로덕션 환경 외부에서 테스트하는 용도로 권장합니다. 새 Release Candidate 버전을 테스트용으로 사용할 수 있게 될 때 알림을 받으려면 [GitHub 릴리스 알림을 구독][20]하세요. Release Candidate를 사용하다가 문제가 발생하는 경우, [Datadog 지원팀][22]에 문의 바랍니다.

2. Continuous Profiler, 배포 추적 및 로그 인젝션(로그를 Datadog로 보내는 경우)를 사용해 IDE, Maven 또는 Gradle 애플리케이션 스크립트나 `java -jar` 명령에서 앱을 실행하려면 `-javaagent` JVM 인수 및 다음과 같은 구성 옵션을 추가하세요(해당하는 경우).

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
    **참고**: 이미지 크기를 줄이고 모듈을 생략해야 하는 경우, [`jdeps`][19] 명령을 사용해 종속성을 식별할 수 있습니다. 단, 필수 모듈은 시간이 지나면 달라질 수 있으므로, 사용자 책임 하에 진행하시기 바랍니다.

    **참고**: Java 24+에 대하여 트레이서를 활성화할 때, JNI 네이티브 액세스 또는 `sun.misc.Unsafe` 메모리 액세스와 관련한 경고가 표시될 수 있습니다. 이러한 경고를 제거하려면 `-javaagent:/path/to/dd-java-agent.jar` 인수 바로 앞에 `--illegal-native-access=allow` 및 `--sun-misc-unsafe-memory-access=allow` 환경 변수를 추가하면 됩니다. 자세한 정보는 [JEP 472][23] 및 [JEP 498][24]을 참조하세요.

    <div class="alert alert-warning">프로파일링을 활성화하면 APM 번들에 따라 요금에 영향을 줄 수 있습니다. 자세한 정보는 <a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">가격 페이지</a>를 참조하세요.</div>

| 환경 변수      | 시스템 속성                     | 설명|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | 애플리케이션 환경(`production`, `staging` 등) |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Datadog 트레이스 및 스팬 ID에 대하여 자동 MDC 키 인젝션을 활성화합니다. 자세한 내용은 [고급 사용][6]을 참조하세요. <br><br>버전 1.18.3부터, 이 서비스가 실행되는 곳에서 [Agent 원격 구성][16]이 활성화되어 있으면 [소프트웨어 카탈로그][17] UI에서 `DD_LOGS_INJECTION`을 설정할 수 있습니다. |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | [Continuous Profiler][5] 활성화 |
| `DD_SERVICE`   | `dd.service`     | 동일한 작업을 수행하는 프로세스 세트의 이름입니다. 애플리케이션 통계를 그룹화하는 데 사용됩니다. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   모든 서비스의 트레이스 루트에서 샘플링 속도를 설정합니다. <br><br> 버전 1.18.3부터, 이 서비스가 실행되는 곳에서 [Agent 원격 구성][16]이 활성화되어 있으면 [소프트웨어 카탈로그][17] UI에서 `DD_TRACE_SAMPLE_RATE`를 설정할 수 있습니다.     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   지정된 규칙과 일치하는 서비스의 트레이스 루트에서 샘플링 속도를 설정합니다.    |
| `DD_VERSION` | `dd.version` |  애플리케이션 버전(예: `2.5`, `202003181415` 또는 `1.3-alpha`) |

더 많은 [구성 옵션](#configuration)은 아래의 설명을 참조하세요.


### JVM에 Java Tracer 추가

`-javaagent` 및 기타 JVM 인수를 전달할 적절한 방법을 알아내려면 해당하는 애플리케이션 서버의 문서를 사용합니다. 다음은 일반적으로 사용되는 몇 가지 프레임워크에 대한 지침입니다.

{{< tabs >}}
{{% tab "Spring Boot" %}}

앱의 이름이 `my_app.jar`라면 다음과 같은 내용을 포함한 `my_app.conf`를 만듭니다.

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

자세한 정보는 [Spring Boot 문서][1]를 참조하세요.


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

#### Linux

Linux에서 Tomcat을 실행할 때 추적을 활성화하는 방법:

1. Tomcat 시작 스크립트 파일(예: `setenv.sh`)을 엽니다.
2. `setenv.sh`에 다음 내용을 추가합니다.
   ```text
   CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
   ```

#### Windows(Windows 서비스형 Tomcat)

Tomcat을 Windows 서비스로 실행할 때 추적을 활성화하는 방법:

1. Tomcat 프로젝트 폴더의 `./bin` 디렉터리에 있는 "tomcat@VERSION_MAJOR@w.exe" 유지 관리 유틸리티를 엽니다.
2. **Java** 탭으로 이동해 `Java Options`에 다음 내용을 추가합니다.
```text
-javaagent:C:\path\to\dd-java-agent.jar
```
3. Tomcat 서비스를 다시 시작하여 변경 사항을 적용합니다.

{{% /tab %}}
{{% tab "JBoss" %}}

- 독립형 모드에서:

  `standalone.conf` 끝에 다음 라인을 추가합니다.

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- 독립형 모드와 Windows에서는 `standalone.conf.bat` 끝에 다음 라인을 추가합니다.

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- 도메인 모드에서:

  파일 `domain.xml`에서 server-groups.server-group.jvm.jvm-options 태그 아래에 다음 라인을 추가합니다.

\`\`\`text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

자세한 내용은 [JBoss 문서][1]를 참조하세요.


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

서비스형 Jetty를 시작하는 데 `jetty.sh`를 사용하는 경우, 이를 편집해 다음을 추가합니다.

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

Jetty를 시작하는 데 `start.ini`를 사용하는 경우, 다음 라인을 추가합니다(`--exec` 아래에, 또는 `--exec` 라인이 아직 없는 경우 해당 라인 추가).

```text
-javaagent:/path/to/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

관리 콘솔에서:

1. **Servers**(서버)를 선택합니다. **Server Type**(서버 유형) 아래에서 **WebSphere application servers**(WebSphere 애플리케이션 서버)를 선택하고 사용자의 서버를 선택합니다.
2. **Java and Process Management > Process Definition**(Java 및 프로세스 관리 > 프로세스 정의)을 선택합니다.
3. **Additional Properties**(추가 속성) 섹션에서 **Java Virtual Machine**(Java 가상 머신)을 클릭합니다.
4. **Generic JVM arguments**(일반 JVM 인수) 텍스트 필드에 다음을 입력합니다.

```text
-javaagent:/path/to/dd-java-agent.jar
```

더 많은 세부 정보와 옵션은 [WebSphere 문서][1]를 참조하세요.

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}}
{{< /tabs >}}

**참고**

- `java -jar` 명령에 `-javaagent` 인수를 추가하는 경우, `-jar` 인수 _앞에_, 애플리케이션 인수가 아니라 JVM 옵션으로 추가해야 합니다. 예:

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     자세한 정보는 [Oracle 문서][7]를 참조하세요.

- `dd-java-agent`를 클래스 경로에 추가하면 안 됩니다. 그러면 예기치 않은 동작을 초래할 수 있습니다.

## 자동 계측

Java 자동 계측은 [JVM이 제공][8]하는 `java-agent` 계측 기능을 사용합니다. `java-agent`가 등록되면 로드 시 클래스 파일을 수정할 수 있습니다.

**참고:** 원격 ClassLoader로 로드된 클래스는 자동으로 계측되지 않습니다.

계측은 자동 계측, OpenTracing API 또는 둘의 조합으로 수행될 수 있습니다. 계측은 보통 다음과 같은 정보를 수집합니다.

- OpenTracing API에서 타임스탬프가 제공되지 않는 한 JVM의 NanoTime 클록을 사용하여 타이밍 기간을 측정
- 키/값 태그 쌍
- 애플리케이션이 처리하지 않은 오류 및 스택 트레이스
- 시스템을 통과해 이동하는 트레이스(요청)의 총 수

## 구성

필요한 경우 통합 서비스 태깅 설정을 포함하여 트레이싱 라이브러리가 애플리케이션 성능 원격 측정 데이터를 보내도록 구성하세요. 자세한 내용은 [라이브러리 구성][9]을 읽어보세요.

### 원격 구성

원격 구성을 사용하면 애플리케이션을 다시 시작하지 않고도 Datadog Agent가 동적으로 추적 설정을 구성할 수 있습니다. 원격 구성은 기본적으로 활성화되어 있습니다. 비활성화하려면 환경 변수를 다음과 같이 설정하세요.

```
DD_REMOTE_CONFIG_ENABLED=false
```

아니면 JVM 시스템 속성을 추가합니다.

```
-Ddd.remote_config.enabled=false
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[4]: /account_management/billing/apm_tracing_profiler/
[5]: /profiler/
[6]: /tracing/other_telemetry/connect_logs_and_traces/java/
[7]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: /tracing/trace_collection/library_config/java/
[10]: /tracing/trace_collection/compatibility/java/#supported-jvm-runtimes
[11]: /tracing/trace_collection/library_injection_local/
[16]: /tracing/guide/remote_config
[17]: https://app.datadoghq.com/services
[18]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[19]: https://docs.oracle.com/en/java/javase/11/tools/jdeps.html
[20]: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/managing-subscriptions-for-activity-on-github/viewing-your-subscriptions
[21]: https://github.com/DataDog/dd-trace-java/releases
[22]: https://docs.datadoghq.com/getting_started/support/
[23]: https://openjdk.org/jeps/472
[24]: https://openjdk.org/jeps/498
