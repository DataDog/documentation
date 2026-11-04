---
aliases:
- /ko/continuous_integration/setup_tests/java
- /ko/continuous_integration/tests/java
- /ko/continuous_integration/tests/setup/java
code_lang: java
code_lang_weight: 10
further_reading:
- link: /tests/containers/
  tag: 설명서
  text: 컨테이너 내 테스트를 위한 환경 변수 전달
- link: /tests/explorer
  tag: 설명서
  text: 테스트 결과 및 성능 확인
- link: /tests/flaky_test_management/early_flake_detection
  tag: 설명서
  text: Early Flake Detection으로 테스트 불안정성 탐지
- link: /tests/flaky_test_management/auto_test_retries
  tag: 설명서
  text: Auto Test Retries로 실패한 테스트 케이스 재시도
- link: /tests/correlate_logs_and_tests
  tag: 설명서
  text: 로그와 테스트 트레이스 상호 연계
- link: /tests/troubleshooting/
  tag: 설명서
  text: Test Optimization 문제 해결
title: Java 테스트
type: multi-code-lang
---
## 호환성 {#compatibility}

지원되는 테스트 프레임워크:

| 테스트 프레임워크 | 버전 |
|---|---|
| JUnit 4 | >= 4.10 |
| JUnit 5 | >= 5.3 |
| TestNG | >= 6.4 |
| Spock | >= 2.0 |
| Cucumber | >= 5.4.0 |
| Karate | >= 1.0.0 |
| Scalatest | >= 3.0.8 |
| Scala MUnit | >= 0.7.28 |
| Scala Weaver | >= 0.8.4(SBT를 빌드 시스템으로 사용하는 경우에만) |

사용 중인 테스트 프레임워크가 지원되지 않는 경우, [Manual Testing API][1]를 사용하여 테스트를 계측해 볼 수 있습니다.

지원되는 빌드 시스템:

| 빌드 시스템 | 버전 |
|---|---|
| Gradle | >= 2.0 |
| Maven | >= 3.2.1 |
| Bazel | >= 1.2.0 |

<div class="alert alert-info">Bazel을 사용하여 Java 테스트를 실행하는 경우, Datadog <a href="/tests/setup/bazel/java/">Java 테스트용 Bazel 규칙</a>을 사용하세요.</div>

Ant나 SBT와 같은 다른 빌드 시스템은 다음과 같은 제한 사항과 함께 지원됩니다.
- 자동 적용 범위 구성 및 보고는 지원되지 않습니다.
- 멀티 모듈 프로젝트를 빌드할 때, 각 모듈은 별도의 트레이스로 보고됩니다.

### Android {#android}

JVM에서 실행되는 Android 테스트가 지원됩니다. Espresso 테스트, Compose UI 테스트, 일부 단위 테스트와 같이 Android API에 의존하는 테스트는 [Robolectric][11] 프레임워크에서만 지원됩니다.

에뮬레이터나 물리적 장치가 필요한 테스트는 지원되지 않습니다.

## 설정 {#setup}

[Datadog 사이트][2]의 대화형 설정 단계를 따르거나 아래 지침을 따를 수 있습니다.

Datadog Java 트레이서 구성은 CI 공급자에 따라 다릅니다.

{{< tabs >}}
{{% tab "자동 계측을 지원하는 CI 공급자" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "기타 클라우드 CI 공급자" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "온프레미스 CI 공급자" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

### SDK 다운로드 {#downloading-sdk}

각 서버에 대해 SDK를 한 번만 다운로드하면 됩니다.

SDK를 서버에서 이미 로컬로 사용할 수 있는 경우 바로 테스트를 실행할 수 있습니다.

다운로드한 트레이서 JAR을 저장하려는 폴더 경로를 사용해 `DD_TRACER_FOLDER` 변수를 지정합니다.

{{< code-block lang="shell" >}}
export DD_TRACER_FOLDER=... // e.g. ~/.datadog
{{< /code-block >}}

아래 명령을 실행해 지정한 폴더에 SDK JAR을 다운로드합니다.

{{< code-block lang="shell" >}}
wget -O $DD_TRACER_FOLDER/dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
{{< /code-block >}}

`java -jar $DD_TRACER_FOLDER/dd-java-agent.jar` 명령을 실행하여 SDK 버전을 확인할 수 있습니다.

### 테스트 실행 {#running-your-tests}

테스트 프로세스를 시작하기 전에 이 변수들을 설정하세요. 병렬 테스트 실행기의 경우, 모든 작업자가 상속받을 수 있도록 상위 프로세스에서 설정하세요.

먼저, 빌드 도구에 대해 다음 필수 환경 변수를 설정하세요.

{{< tabs >}}
{{% tab "Maven" %}}

`DD_TRACER_FOLDER`(필수)
: 다운로드한 Java 트레이서가 위치한 폴더 경로입니다.

`MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (필수)
: Maven 빌드 프로세스에 SDK를 주입합니다.

{{% /tab %}}
{{% tab "Gradle" %}}

`DD_TRACER_FOLDER`(필수)
: 다운로드한 Java 트레이서가 위치한 폴더 경로입니다.

`GRADLE_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (필수)
: Gradle 런처 프로세스에 SDK를 주입합니다.

{{% /tab %}}
{{% tab "SBT" %}}

`DD_TRACER_FOLDER`(필수)
: 다운로드한 Java 트레이서가 위치한 폴더 경로입니다.

`SBT_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (필수)
: 테스트를 실행하는 JVM에 SDK를 주입합니다.

{{% /tab %}}
{{% tab "기타" %}}

`DD_TRACER_FOLDER`(필수)
: 다운로드한 Java 트레이서가 위치한 폴더 경로입니다.

`JAVA_TOOL_OPTIONS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (필수)
: 테스트를 실행하는 JVM에 SDK를 주입합니다.

{{% /tab %}}
{{< /tabs >}}

그런 다음, 다음 공통 환경 변수를 설정하여 SDK와 보고 방법을 구성하세요.

`DD_CIVISIBILITY_ENABLED=true`(필수)
: Test Optimization을 활성화합니다.<br/>
**기본**: `false`

`DD_ENV`(선택 사항)
: 테스트가 실행되는 환경의 이름입니다.<br/>
**기본**: `(empty)`<br/>
**예시**: `local`, `ci`

`DD_SERVICE`(선택 사항)
: 테스트 중인 서비스 또는 라이브러리의 이름입니다.<br/>
**기본**: `unnamed-java-app`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true`(Agentless 모드 사용 시 필수)
: 테스트 결과를 Datadog으로 직접 전송하는 Agentless 모드를 활성화합니다.<br/>
**기본값**: `false`

`DD_API_KEY`(Agentless 모드 사용 시 필수)
: 테스트 결과 업로드를 인증하는 데 사용되는 Datadog API 키입니다. 이 변수는 Agentless 모드를 활성화하지 않습니다.<br/>
**기본값**: `(empty)`

`DD_SITE`(Agentless 모드 사용 시 선택 사항)
: 테스트 결과를 업로드할 [Datadog 사이트][4]입니다. US1 이외의 사이트를 사용할 때 이 구성을 설정하세요.<br/>
**기본값**: `datadoghq.com`

`DD_TRACE_AGENT_URL`(Datadog Agent를 사용할 때만)
: `http://hostname:port` 형식의 트레이스 수집용 Datadog Agent URL입니다.<br/>
**기본값**: `http://localhost:8126`

`DD_TEST_SESSION_NAME`(선택 사항)
: `unit-tests`, `integration-tests` 또는 `smoke-tests`와 같은 테스트 그룹을 식별합니다.<br/>
**기본값**: CI 작업 이름 및 테스트 명령, 또는 CI 작업 이름을 사용할 수 없는 경우 테스트 명령입니다.<br/>
**예**: `unit-tests`, `integration-tests`, `smoke-tests`

평소와 같이 테스트를 실행하세요(예: `mvn test`, `mvn verify`, `./gradlew clean test` 또는 `sbt test`).

## 구성 {#configuration}

기본 설정 값은 대부분의 경우에서 잘 작동합니다.

하지만 SDK의 동작을 사용자 지정하려면 [Datadog SDK 구성][3] 옵션을 사용할 수 있습니다.

### Git 메타데이터 수집 {#collecting-git-metadata}

{{% ci-git-metadata %}}

## 확장 {#extensions}

SDK는 프로그래밍 방식으로 기능을 확장하는 데 사용할 수 있는 API 세트를 제공합니다.

### 테스트에 사용자 지정 태그 추가 {#adding-custom-tags-to-tests}

{{< tabs >}}
{{% tab "OpenTelemetry API" %}}

사용자 지정 태그를 추가하려면 [opentelemetry-api][1] 라이브러리를 컴파일 타임 종속성으로 포함하고 `dd.trace.otel.enabled`(시스템 속성) 또는 `DD_TRACE_OTEL_ENABLED`(환경 변수)를 `true`로 설정하세요.

그런 다음 활성 스팬을 사용하여 테스트에 사용자 지정 태그를 추가할 수 있습니다.

```java
import io.opentelemetry.api.trace.Span;

// ...
// inside your test
Span span = Span.current();
span.setAttribute("test_owner", "my_team");
// test continues normally
// ...
```

태그 추가에 대한 자세한 정보는 Java 사용자 지정 계측 설명서의 [태그 추가][2] 섹션을 참조하세요.

[1]: https://mvnrepository.com/artifact/io.opentelemetry/opentelemetry-api
[2]: /ko/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags

{{% /tab %}}
{{% tab "OpenTracing API" %}}

사용자 지정 태그를 추가하려면 [opentracing-util][1] 라이브러리를 프로젝트의 컴파일 타임 종속성으로 포함하세요.

그런 다음 활성 스팬을 사용하여 테스트에 사용자 지정 태그를 추가할 수 있습니다.

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test_owner", "my_team");
}
// test continues normally
// ...
```

이러한 태그에 대한 필터 또는 `group by` 필드를 생성하려면 먼저 패싯을 생성해야 합니다.

태그 추가에 대한 자세한 정보는 Java 사용자 지정 계측 설명서의 [태그 추가][2] 섹션을 참조하세요.

[1]: https://mvnrepository.com/artifact/io.opentracing/opentracing-util
[2]: /ko/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags

{{% /tab %}}
{{< /tabs >}}

### 테스트에 사용자 지정 측정값 추가 {#adding-custom-measures-to-tests}

태그와 같이 현재 활성 스팬을 사용하여 테스트에 사용자 지정 측정값을 추가할 수 있습니다.

{{< tabs >}}
{{% tab "OpenTelemetry API" %}}

```java
import io.opentelemetry.api.trace.Span;

// ...
// inside your test
Span span = Span.current();
span.setAttribute("test.memory.usage", 1e8);
// test continues normally
// ...
```

{{% /tab %}}
{{% tab "OpenTracing API" %}}

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test.memory.usage", 1e8);
}
// test continues normally
// ...
```

{{% /tab %}}
{{< /tabs >}}

사용자 지정 측정값에 대한 자세한 내용은 [사용자 지정 측정값 추가 가이드][6]를 참조하세요.

### 수동 테스트 API 사용 {#using-manual-testing-api}

지원되는 테스팅 프레임워크 중 하나를 사용하는 경우 Java 트레이서가 자동으로 테스트를 계측하고 결과를 Datadog 백엔드로 전송합니다.

지원되지 않는 프레임워크나 애드혹 테스팅 솔루션을 사용하는 경우 수동 테스팅 API를 활용할 수 있습니다. 해당 API는 또한 백엔드에 테스트 결과를 보고합니다.

수동 테스트 API를 사용하려면 [`dd-trace-api`][7] 라이브러리를 프로젝트의 컴파일 타임 종속성으로 추가하세요.

#### 도메인 모델 {#domain-model}

API는 테스트 세션, 테스트 모듈, 테스트 스위트 및 테스트란 네 개의 개념을 기반으로 합니다.

##### 테스트 세션 {#test-session}

테스트 세션은 프로젝트 빌드를 나타냅니다. 일반적으로 사용자나 CI 스크립트가 발행한 테스트 명령 실행에 대응합니다.

테스트 세션을 시작하려면 `datadog.trace.api.civisibility.CIVisibility#startSession`을 호출하고 프로젝트 이름과 사용한 테스트 프레임워크의 이름을 전달하세요.

모든 테스트가 완료되면 `datadog.trace.api.civisibility.DDTestSession#end`를 호출하세요. 그러면 라이브러리가 남은 모든 테스트 결과를 백엔드로 전송합니다.

##### 테스트 모듈 {#test-module}

테스트 모듈은 프로젝트 빌드 내의 더 작은 작업 단위를 나타내며, 일반적으로 프로젝트 모듈에 해당합니다. 예를 들어, Maven 하위 모듈이나 Gradle 하위 프로젝트가 있습니다.

테스트 모드를 시작하려면 `datadog.trace.api.civisibility.DDTestSession#testModuleStart`를 호출하고 모듈 이름을 전달하세요.

모듈의 빌드 및 테스트가 완료되면 `datadog.trace.api.civisibility.DDTestModule#end`를 호출하세요.

##### 테스트 모음 {#test-suite}

테스트 모음은 공통 기능을 공유하는 테스트 세트로 구성됩니다.
이들은 공통 초기화 및 정리 작업을 공유할 수 있으며, 일부 변수를 공유할 수도 있습니다.
단일 테스트 모음은 일반적으로 테스트 케이스를 포함하는 Java 클래스에 해당합니다.

`datadog.trace.api.civisibility.DDTestModule#testSuiteStart`를 호출하고 테스트 모음의 이름을 전달하여 테스트 모듈에서 테스트 모음을 생성하세요.

테스트 모음 내의 관련 테스트가 모두 실행을 마치면 `datadog.trace.api.civisibility.DDTestSuite#end`를 호출하세요.

##### 테스트 {#test}

테스트는 테스트 모음의 일부로 실행되는 단일 테스트 케이스를 나타냅니다.
일반적으로 테스트 로직을 포함하는 메서드에 해당합니다.

`datadog.trace.api.civisibility.DDTestSuite#testStart`를 호출하고 테스트 이름을 전달하여 테스트 모음에서 테스트를 생성하세요.

테스트 실행이 완료되면 `datadog.trace.api.civisibility.DDTest#end`를 호출하세요.

#### 코드 예시 {#code-example}

다음은 API를 사용한 단순한 코드 예시입니다.

```java
package com.datadog.civisibility.example;

import datadog.trace.api.civisibility.CIVisibility;
import datadog.trace.api.civisibility.DDTest;
import datadog.trace.api.civisibility.DDTestModule;
import datadog.trace.api.civisibility.DDTestSession;
import datadog.trace.api.civisibility.DDTestSuite;
import java.lang.reflect.Method;

// the null arguments in the calls below are optional startTime/endTime values:
// when they are not specified, current time is used
public class ManualTest {
    public static void main(String[] args) throws Exception {
        DDTestSession testSession = CIVisibility.startSession("my-project-name", "my-test-framework", null);
        testSession.setTag("my-tag", "additional-session-metadata");
        try {
            runTestModule(testSession);
        } finally {
            testSession.end(null);
        }
    }

    private static void runTestModule(DDTestSession testSession) throws Exception {
        DDTestModule testModule = testSession.testModuleStart("my-module", null);
        testModule.setTag("my-module-tag", "additional-module-metadata");
        try {
            runFirstTestSuite(testModule);
            runSecondTestSuite(testModule);
        } finally {
            testModule.end(null);
        }
    }

    private static void runFirstTestSuite(DDTestModule testModule) throws Exception {
        DDTestSuite testSuite = testModule.testSuiteStart("my-suite", ManualTest.class, null);
        testSuite.setTag("my-suite-tag", "additional-suite-metadata");
        try {
            runTestCase(testSuite);
        } finally {
            testSuite.end(null);
        }
    }

    private static void runTestCase(DDTestSuite testSuite) throws Exception {
        Method myTestCaseMethod = ManualTest.class.getDeclaredMethod("myTestCase");
        DDTest ddTest = testSuite.testStart("myTestCase", myTestCaseMethod, null);
        ddTest.setTag("my-test-case-tag", "additional-test-case-metadata");
        ddTest.setTag("my-test-case-tag", "more-test-case-metadata");
        try {
            myTestCase();
        } catch (Exception e) {
            ddTest.setErrorInfo(e); // pass error info to mark test case as failed
        } finally {
            ddTest.end(null);
        }
    }

    private static void myTestCase() throws Exception {
        // run some test logic
    }

    private static void runSecondTestSuite(DDTestModule testModule) {
        DDTestSuite secondTestSuite = testModule.testSuiteStart("my-second-suite", ManualTest.class, null);
        secondTestSuite.setSkipReason("this test suite is skipped"); // pass skip reason to mark test suite as skipped
        secondTestSuite.end(null);
    }
}
```

항상 마지막에 ``datadog.trace.api.civisibility.DDTestSession#end``를 호출하여 모든 테스트 정보가 Datadog에 전송되도록 하세요.

## 모범 사례 {#best-practices}

### 결정론적 테스트 파라미터 표현 {#deterministic-test-parameters-representation}

Test Optimization은 [테스트 파라미터가 결정론적이고][8] 테스트 실행 간에 동일하게 유지될 때 가장 잘 작동합니다.
테스트 케이스에 테스트 실행마다 달라지는 파라미터(현재 날짜, 난수 또는 `toString()` 메서드가 재정의되지 않은 클래스의 인스턴스 등)가 있는 경우 일부 제품 기능이 예상대로 작동하지 않을 수 있습니다.
예를 들어, 실행 기록을 사용할 수 없거나 테스트 케이스가 불안정성을 보이더라도 불안정한 테스트(flaky)로 분류되지 않을 수 있습니다.

이 문제를 해결하는 가장 좋은 방법은 테스트 실행 간에 테스트 파라미터가 동일한지 확인하는 것입니다.

JUnit 5에서는 값을 변경하지 않고 [테스트 파라미터의 문자열 표현을 사용자 지정][9]하여 이 문제를 해결할 수도 있습니다.
그렇게 하려면 `org.junit.jupiter.api.Named` 인터페이스를 사용하거나 `org.junit.jupiter.params.ParameterizedTest` 어노테이션의 `name` 파라미터를 변경하세요.

```java
@ParameterizedTest
@MethodSource("namedArguments")
void parameterizedTest(String s, Date d) {
   // The second parameter in this test case is non-deterministic.
   // In the argument provider method it is wrapped with Named to ensure it has a deterministic name.
}

static Stream<Arguments> namedArguments() {
    return Stream.of(
            Arguments.of(
                    "a string",
                    Named.of("current date", new Date())),
            Arguments.of(
                    "another string",
                    Named.of("a date in the future", new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(1))))
    );
}
```

```java
@ParameterizedTest(name = "[{index}] {0}, a random number from one to ten")
@MethodSource("randomArguments")
void anotherParameterizedTest(String s, int i) {
  // The second parameter in this test case is non-deterministic.
  // The name of the parameterized test is customized to ensure it has a deterministic name.
}

static Stream<Arguments> randomArguments() {
    return Stream.of(
            Arguments.of("a string", ThreadLocalRandom.current().nextInt(10) + 1),
            Arguments.of("another string", ThreadLocalRandom.current().nextInt(10) + 1)
    );
}
```

### 테스트 세션 이름 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME`을 사용하여 테스트 세션의 이름과 관련 테스트 그룹을 정의하세요. 이 태그에 대한 값의 예시는 다음과 같습니다.

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

`DD_TEST_SESSION_NAME`이 지정되지 않은 경우, 기본값은 CI 작업 이름과 테스트 명령입니다. CI 작업 이름을 사용할 수 없는 경우 테스트 명령이 사용됩니다.

서로 다른 테스트 그룹을 구분하는 데 도움이 되도록 테스트 세션 이름은 리포지토리 내에서 고유해야 합니다.

#### `DD_TEST_SESSION_NAME` 사용 시점 {#when-to-use-dd-test-session-name}

Datadog은 테스트 세션 간의 대응 관계를 설정하기 위해 일련의 파라미터를 검사합니다. 테스트를 실행하는 데 사용된 테스트 명령이 그중 하나입니다. 테스트 명령에 임시 폴더와 같이 실행할 때마다 변경되는 문자열이 포함되어 있으면 Datadog은 해당 세션들이 서로 관련이 없다고 간주합니다. 예:

- `mvn test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

테스트 명령이 실행마다 달라지는 경우 Datadog은 `DD_TEST_SESSION_NAME` 사용을 권장합니다.

## 문제 해결 {#troubleshooting}

### SDK에서 Test Optimization을 활성화한 후 테스트가 Datadog에 표시되지 않음 {#the-tests-are-not-appearing-in-datadog-after-enabling-test-optimization-in-the-sdk}

빌드 로그를 검사하여 SDK가 빌드 프로세스에 주입되었는지 확인하세요.
주입에 성공하면 `DATADOG TRACER CONFIGURATION`이 포함된 줄을 확인할 수 있습니다.
해당 줄이 없다면 SDK를 주입하고 구성하는 데 사용되는 환경 변수가 빌드 프로세스에서 사용 가능한지 확인하세요.
흔한 실수는 한 빌드 단계에서 변수를 설정하고 다른 빌드 단계에서 테스트를 실행하는 것입니다. 빌드 단계 간에 변수가 전파되지 않으면 이 접근 방식이 작동하지 않을 수 있습니다.

최신 버전의 SDK를 사용하고 있는지 확인하세요.

빌드 시스템과 테스트 프레임워크가 Test Optimization에서 지원되는지 확인하세요. [지원되는 빌드 시스템 및 테스트 프레임워크](#compatibility) 목록을 참조하세요.

SDK 인수에서 `dd.civisibility.enabled` 속성(또는 `DD_CIVISIBILITY_ENABLED` 환경 변수)이 `true`로 설정되어 있는지 확인하세요.

`DD_TRACE_DEBUG` 환경 변수를 `true`로 설정하여 트레이서 디버그 로깅을 활성화한 상태로 빌드를 실행해 보세요.
설정되지 않은 `DD_API_KEY` 환경 변수 등 빌드 출력에서 트레이서가 잘못 설정되었음을 나타내는 오류가 없는지 확인하세요.

### SDK를 첨부한 프로젝트 빌드 시 테스트 또는 소스 코드 컴파일 실패 {#tests-or-source-code-compilation-fails-when-building-a-project-with-the-sdk-attached}

기본적으로 Test Optimization은 컴파일러 플러그인이 첨부된 상태로 Java 코드 컴파일을 실행합니다.

플러그인은 성능 오버헤드를 절감하는 역할만 하므로 부수적인 옵션입니다.

빌드 설정에 따라 플러그인 추가로 인해 때때로 컴파일 프로세스가 저해될 수도 있습니다.

플러그인이 빌드를 방해하는 경우, `dd.civisibility.compiler.plugin.auto.configuration.enabled=false`를 `-javaagent` 인수 목록에 추가하여 비활성화하세요.
(또는 `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED=false` 환경 변수를 설정하세요).

### dd-javac-plugin-client 아티팩트를 찾을 수 없어 빌드 실패 {#builds-fails-because-dd-javac-plugin-client-artifact-cannot-be-found}

빌드에서 사용자 지정 아티팩트 저장소를 사용하거나 오프라인 모드에서 실행되는 경우 빌드에 주입된 Java 컴파일러 플러그인을 사용할 수 없을 수 있습니다.

이 경우 `-javaagent` 인수 목록에 `dd.civisibility.compiler.plugin.auto.configuration.enabled=false`를 추가하여 플러그인 주입을 비활성화할 수 있습니다.
(또는 `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED` 환경 변수를 false로 설정하세요).

플러그인은 성능 오버헤드를 절감하는 역할만 하므로 부수적인 옵션입니다.

### SDK를 첨부한 프로젝트 빌드 시 테스트 실패 {#tests-fail-when-building-a-project-with-the-sdk-attached}

일부 경우 SDK를 첨부하면 테스트가 실패할 수 있습니다. 특히 JVM 내부 상태나 타사 라이브러리 클래스의 인스턴스에 대해 어설션을 실행하는 경우 그렇습니다.

이러한 경우 가장 좋은 방법은 테스트를 업데이트하는 것이지만 SDK의 타사 라이브러리 통합을 비활성화하는 더 빠른 방법도 있습니다.

통합은 테스트 코드에서 발생하는 일에 대한 추가 인사이트를 제공하며, 특히 통합 테스트에서 HTTP 요청이나 데이터베이스 호출을 모니터링하는 데 유용합니다.
기본적으로 활성화되어 있습니다.

특정 통합을 비활성화하려면 [Datadog Tracer Compatibility][10] 표에서 관련 구성 속성 이름을 참조하세요.
예를 들어, `OkHttp3` 클라이언트 요청 통합을 비활성화하려면 `-javaagent` 인수 목록에 `dd.integration.okhttp-3.enabled=false`를 추가하세요.

모든 통합을 비활성화하려면 `-javaagent` 인수 목록에 `dd.trace.enabled=false`를 추가하세요(또는 `DD_TRACE_ENABLED=false` 환경 변수를 설정하세요).

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: #using-manual-testing-api
[2]: https://app.datadoghq.com/ci/setup/test?language=java
[3]: /ko/tracing/trace_collection/library_config/java/?tab=containers#configuration
[4]: /ko/getting_started/site/
[6]: /ko/tests/guides/add_custom_measures/?tab=java
[7]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[8]: /ko/tests/#parameterized-test-configurations
[9]: https://junit.org/junit5/docs/current/user-guide/#writing-tests-parameterized-tests-display-names
[10]: /ko/tracing/trace_collection/compatibility/java#integrations
[11]: https://robolectric.org/getting-started/