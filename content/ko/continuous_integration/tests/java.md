---
aliases:
- /ko/continuous_integration/setup_tests/java
further_reading:
- link: /continuous_integration/tests/containers/
  tag: 설명서
  text: 테스트용 환경 변수를 컨테이너로 전달하기
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 설능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: 트러블슈팅 CI
kind: 설명서
title: 자바(Java) 테스트
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility는 현재 일부 사이트({{< region-param key="dd_site_name" >}})에서 이용할 수 없습니다.</div>
{{< /site-region >}}

## 호환성

지원되는 테스트 프레임워크:
* JUnit >= 4.10 및 >= 5.3
* TestNG >= 6.4
* Spock >= 2.0
* Cucumber >= 5.4.0(이전 버전 지원 제한)

지원되는 빌드 시스템:
* Gradle >= 2.0
* Maven >= 3.2.1

테스트 프레임워크가 지원되지 않으면 [수동 테스팅 API][1]를 사용해 테스트 계측을 시도할 수 있습니다.

## 설정

자바용 Test Visibility를 사용하려면 다음 단계를 따릅니다.
1. 트레이서 보고 메서드를 설정합니다.
2. 테스트가 실행되는 호스트에 트레이서 라이브러리를 다운로드합니다.
3. 첨부된 트레이서를 사용해 테스트를 실행합니다.

### 보고 메서드 설정

이 단계는 Datadog 자바 트레이서가 테스트 보고 데이터를 Datadog에 전달하는 방법을 설정하는 단계를 포함합니다.
두 가지 주요 옵션이 있습니다.
* 에이전트에 데이터를 보고하면, 에이전트가 Datadog에 전달합니다.
* 보고서를 바로 Datadog에 전달합니다.

{{< tabs >}}

{{% tab "온프레미스 CI 공급자(Datadog 에이전트)" %}}

{{% ci-agent %}}

{{% /tab %}}

{{% tab "클라우드 CI 공급자(에이전트리스)" %}}

<div class="alert alert-info">에이전트리스 모드는 Datadog 자바 라이브러리 버전 0.101.0 이상에서 이용할 수 있습니다.</div>

{{% ci-agentless %}}


{{% /tab %}}
{{< /tabs >}}

### 트레이서 라이브러리 다운로드

각 서버에 대해 트레이서 라이브러리를 한 번만 다운로드하면 됩니다.

트레이서 라이브러리를 서버에서 로컬로 사용할 수 있는 경우 테스트를 직접 실행할 수 있습니다.

다운로드한 트레이서 JAR을 저장하려는 폴더 경로를 사용해 `DD_TRACER_FOLDER` 변수를 지정합니다.

{{< code-block lang="shell" >}}
export DD_TRACER_FOLDER=... // e.g. ~/.datadog
{{< /code-block >}}

아래 명령을 실행해 지정한 폴더에 트레이서 JAR을 다운로드합니다.

{{< code-block lang="shell" >}}
wget -O $DD_TRACER_FOLDER/dd-java-agent.jar https://dtdg.co/latest-java-tracer
{{< /code-block >}}

`java -jar $DD_TRACER_FOLDER/dd-java-agent.jar` 명령을 실행해 트레이서 라이브러리를 확인할 수 있습니다.

### 테스트 실행

{{< tabs >}}
{{% tab "Maven" %}}

트레이스를 다운로드한 경로로 `DD_TRACER_FOLDER` 변수를 설정하세요.

`MAVEN_OPTS` 환경 변수를 사용해 테스트를 실행하고 Datadog 자바 트레이서 JAR 경로를 지정하세요.

트레이서 인수를 지정할 때 다음을 포함합니다.

* `dd.civisibility.enabled` 속성을 `true`로 설정하여 CI Visibility를 활성화합니다.
* `dd.env property`(예: `local`(개발자 워크스테이션에서 테스트를 실행할 경우), `ci`(CI 공급자에서 실행할 경우))를 사용해 테스트를 실행하려는 환경을 정의합니다.
* `dd.service property`에서 테스트되는 서비스 또는 라이브러리 이름을 정의합니다.

예시:

{{< code-block lang="shell" >}}
MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app \
mvn clean verify
{{< /code-block >}}

통합 테스트(있는 경우)를 실행하는 데 Maven Failsafe 플러그인을 실행하는지 여부에 따라 `mvn verify` 또는 `mvn test` 목표 중 하나는 괜찮습니다. 

{{% /tab %}}
{{% tab "Gradle" %}}

트레이스를 다운로드한 경로로 `DD_TRACER_FOLDER` 변수를 설정하세요.

`org.gradle.jvmargs` 시스템 속성을 사용해 테스트를 실행하여 Datadog 자바 트레이서 JAR로의 경로를 지정하세요.

트레이서 인수를 지정할 때 다음을 포함합니다.

* `dd.civisibility.enabled` 속성을 `true`로 설정하여 CI Visibility를 활성화합니다.
* `dd.env property`(예: `local`(개발자 워크스테이션에서 테스트를 실행할 경우), `ci`(CI 공급자에서 실행할 경우))를 사용해 테스트를 실행하려는 환경을 정의합니다.
* `dd.service property`에서 테스트되는 서비스 또는 라이브러리 이름을 정의합니다.

예시:

{{< code-block lang="shell" >}}
./gradlew cleanTest test --rerun-tasks -Dorg.gradle.jvmargs=\
-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app
{{< /code-block >}}

명령줄에 `org.gradle.jvmargs`를 지정하면 다른 곳에서 지정된 값을 덮어씁니다. `gradle.properties` 파일에서 이 속성을 지정한 경우 명령줄 실행에서 필수 설정을 복사해 두시기 바랍니다.

**참고:** CI Visibility는 [Gradle Configuration Cache][1]와 호환되지 않습니다. 트레이서를 사용해 테스트를 실행할 때 해당 캐시를 활성화하지 마세요.

[1]: https://docs.gradle.org/current/userguide/configuration_cache.html

{{% /tab %}}
{{< /tabs >}}

## 설정

기본 설정 값은 대부분의 경우에서 잘 작동합니다.

하지만 트레이서 행동을 미세 조정해야 할 필요가 있는 경우 [Datadog 트레이서 설정][3] 옵션을 사용할 수 있습니다. 

### Git 메타데이터 수집

{{% ci-git-metadata %}}

## 확장

[dd-trace-api][4] 라이브러리는 트레이서의 기능과 프로그래밍 가능성을 확장하는 데 사용할 수 있는 일련의 API을 보여줍니다.

### 테스트에 커스텀 태그 추가

현재 활성 스팬(span)을 사용해 테스트에 커스텀 태그를 추가할 수 있습니다.

```java
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test_owner", "my_team");
}
// test continues normally
// ...
```

이러한 태그에 대한 필터 또는 `group by` 필드를 생성하려면 먼저 패싯을 생성해야 합니다.

태그 추가에 대한 자세한 정보는 자바(Java) 커스텀 계측 설명서의 [태그 추가][2] 섹션을 참조하세요.

### 수동 테스팅 API 사용

지원되는 테스팅 프레임워크 중 하나를 사용하는 경우 자바 트레이서가 자동으로 테스트를 계측하고 결과를 Datadog 백엔드로 전송합니다.

지원되지 않는 프레임워크나 애드혹 테스팅 솔루션을 사용하는  경우 수동 테스팅 API를 활용할 수 있습니다. 해당 API는 또한 백엔드에 테스트 결과를 보고합니다.

#### 도메인 모델

API는 테스트 세션, 테스트 모듈, 테스트 스위트 및 테스트란 네 개의 개념을 기반으로 합니다.

##### 테스트 세션

테스트 세션은 프로젝트 빌드를 나타냅니다. 일반적으로 사용자나 CI 스크립트가 발행한 테스트 명령 실행에 대응합니다.

테스트 세션을 시작하려면 `datadog.trace.api.civisibility.CIVisibility#startSession`을 호출한 다음 프로젝트 이름과 사용하는 테스트 프레임워크의 이름을 전달합니다.

모든 테스트가 완료되면 `datadog.trace.api.civisibility.DDTestSession#end`를 호출합니다. 그러면 라이브러리를 강제 호출하여 남아 있는 모든 테스트 결과를 백엔드에 전송할 수 있습니다.

##### 테스트 모듈

테스트 모듈은 프로젝트 빌드 내 더 작은 작업 단위를 나타냅니다. 일반적으로 프로젝트 모듈에 대응합니다. 예를 들어 Maven 하위 모듈이나 Gradle 하위 프로젝트가 될 수 있습니다.

테스트 모드를 시작하려면 `datadog.trace.api.civisibility.DDTestSession#testModuleStart`를 호출한 다음 모듈 이름을 전달합니다.

모듈이 빌드와 테스팅을 완료하면 `datadog.trace.api.civisibility.DDTestModule#end`를 호출합니다.

##### 테스트 스위트

테스트 스위트는 일반적인 기능을 공유하는 일련의 테스트로 구성되어 있습니다.
공통의 초기화와 해제를 공유할 수 있으며 일부 변수를 공유할 수 있습니다.
단일 스위트는 보통 테스트 사례를 포함하는 자바 클래스에 대응합니다.

`datadog.trace.api.civisibility.DDTestModule#testSuiteStart`를 호출하고 테스트 스위트 이름을 전달하여 테스트 모듈에 있는 테스트 스위트를 생성합니다.

스위트에 있는 모든 관련 테스트 실행을 완료하면 `datadog.trace.api.civisibility.DDTestSuite#end`를 호출합니다.

##### 테스트

테스트는 테스트 스위트의 일부로 실행되는 단일 테스트 사례를 나타냅니다.
보통 테스팅 로직을 포함하는 메서드에 대응합니다.

`datadog.trace.api.civisibility.DDTestSuite#testStart`를 호출하고 테스트 이름을 전달하여 스위트에서 테스트를 생성합니다.

테스트가 실행을 완료하면 `datadog.trace.api.civisibility.DDTest#end`를 호출합니다.

#### 코드 사례

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

마지막에 항상 '`datadog.trace.api.civisibility.DDTestSession#end`'를 호출하여 모든 테스트 정보가 Datadog에 도달하도록 합니다.

{{% ci-information-collected %}}

## 문제 해결

### 테스트는 트레이서에서 CI Visibility를 활성화한 후 Datadog에 표시되지 않습니다.

최신 버전의 트레이서를 사용하고 있는지 확인하세요.

빌드 시스템과 테스팅 프레임워크가 CI Visibility에서 지원되는지 확인하세요. [지원되는 빌드 시스템 및 테스트 프레임워크](#compatibility) 목록을 참조하세요.

`dd.civisibility.enabled` 속성이 트레이서 인수에 `true`로 설정되어 있는지 확인하세요.

설정 안 된 `DD_API_KEY` 환경 변수 등 빌드 출력에서 트레이서가 잘못 설정되었음을 나타내는 오류가 없는지 확인하세요.

### 첨부된 트레이서를 사용해 프로젝트를 빌드하는 경우 테스트 또는 소스 코드 컴파일이 실패합니다.

기본적으로 CI Visibility는 첨부된 컴파일러 플러그인을 사용해 자바 코드 컴파일을 실행합니다.

플러그인은 성능 오버헤드를 절감하는 역할만 하므로 부수적인 옵션입니다.

빌드 설정에 따라 플러그인 추가로 인해 때때로 컴파일 프로세스가 저해될 수도 있습니다.

플러그인이 빌드를 방해하는 경우 `-javaagent` 인수 목록에 `dd.civisibility.compiler.plugin.auto.configuration.enabled=false`를 추가하여 비활성화하세요.

### 첨부된 트레이서를 사용해 프로젝트를 빌드하는 경우 테스트가 실패합니다.

일부 경우 트레이서 첨부로 인해 테스트가 깨질 수 있습니다. 특히 JVM 내부 상태에 있는 자산이나 타사 라이브러리 클래스를 실행할 경우 그렇습니다.

모범 사례는 테스트를 업데이트하는 것이지만 트레이서의 타사 라이브러리 통합을 비활성화하는 더 빠른 방법도 있습니다.

통합은 테스트 코드에서 발생하는 일에 대한 추가 정보를 제공하며, 특히 통합 테스트에서 HTTP 요청이나 데이터베이스 호출을 모니터링하는 데 유용합니다.
기본적으로 활성화되어 있습니다.

특정 통합을 비활성화하려면 관련 설정 속성 이름을 찾기 위해 [Datadog 트레이서 호환성][5] 표를 참조하세요.
예를 들어 `OkHttp3` 클라이언트 요청 통합을 비활성화하려면 `-javaagent` 인수 목록에 `dd.integration.okhttp-3.enabled=false`를 추가합니다.

모든 통합을 비활성화하려면 `-javaagent` arguments with `dd.trace.enabled=false` 목록에 인수를 추가합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: #using-manual-testing-api
[2]: /ko/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags
[3]: /ko/tracing/trace_collection/library_config/java/?tab=containers#configuration
[4]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[5]: /ko/tracing/trace_collection/compatibility/java#integrations