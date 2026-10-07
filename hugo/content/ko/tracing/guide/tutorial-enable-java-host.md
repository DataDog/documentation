---
further_reading:
- link: /tracing/trace_collection/library_config/java/
  tag: 설명서
  text: 추가 추적 라이브러리 설정 옵션
- link: /tracing/trace_collection/dd_libraries/java/
  tag: 설명서
  text: 상세한 추적 라이브러리 설정 지침
- link: /tracing/trace_collection/compatibility/java/
  tag: 설명서
  text: 자동 계측을 위해 지원되는 자바(Java) 프레임워크
- link: /tracing/trace_collection/custom_instrumentation/java/
  tag: 설명서
  text: 수동으로 트레이스와 스팬 설정하기
- link: https://github.com/DataDog/dd-trace-java
  tag: 소스 코드
  text: 추적 라이브러리 오픈 소스 리포지토리
title: 튜토리얼 - Datadog Agent와 동일한 호스트에서 Java 애플리케이션 추적 활성화하기
---

## 개요

본 튜토리얼에서는 호스트에 설치된 샘플 Java 애플리케이션에서 추적을 활성화하는 단계를 안내합니다. 이 시나리오에서는 Datadog Agent를 애플리케이션과 동일한 호스트에 설치합니다.

컨테이너 또는 클라우드 인프라의 애플리케이션, 컨테이너의 Agent, 다른 언어로 작성된 애플리케이션을 포함하는 기타 시나리오의 경우, 다른 [추적 활성화 튜토리얼][1]을 참조하세요.

자바(Java)에 대한 일반적인 종합 추적 설정 설명서의 경우 [자바 애플리케이션 추적][2]을 참조하세요.

### 사전 필수 조건

- Datadog 계정과 [조직 API 키][3]
- Git
- Curl
- sudo를 사용할 수 있는 루트 권한이 있는 물리 또는 가상 Linux 호스트
- 호스트에 JRE가 아닌 Java 11 호환 JDK가 필요합니다. 본 튜토리얼에서는 동일한 머신에서 빌드 및 배포합니다.

## 에이전트 설치

시스템에 Datadog 에이전트를 설치하지 않은 경우, [**통합 > 에이전트**][5]로 이동하여 운영체제를 선택합니다. 예를 들어, 대부분의 Linux 플랫폼은 다음 스크립트를 실행하여 `<YOUR_API_KEY>`을 [Datadog API 키][3]로 대체하여 에이전트를 설치합니다.

{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)" 
{{< /code-block >}}

`datadoghq.com` 이외의 Datadog 사이트로 데이터를 전송하려면 `DD_SITE` 환경변수를 [Datadog 사이트][6]로 교체합니다.

[**이벤트 > 탐색기**][8]로 이동하여 에이전트가 실행 중이며 Datadog로 데이터를 전송하는지 확인합니다. 옵션으로 `Datadog` 소스 패싯으로 필터링하여 호스트의 에이전트 설치를 확인하는 이벤트를 찾습니다.

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="에이전트가 호스트에 설치되었음을 나타내는 Datadog 메시지가 표시된 이벤트 탐색기" style="width:70%;" >}}

<div class="alert alert-info">몇 분이 지난 후에도 Datadog의 <strong>인프라스트럭처 > 호스트 맵</strong> 하단에 호스트가 표시되지 않는다면, 정확한 조직 API키를 사용했는지 확인하세요. 해당 키는 <a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>조직 설정 > API 키</strong></a>에서 사용할 수 있습니다.</div>


## 샘플 Java 애플리케이션 설치 및 실행

다음으로 추적할 샘플 애플리케이션을 설치합니다. 본 튜토리얼의 코드 샘플은 [github.com/DataDog/apm-tutorial-java-host][9]에서 확인할 수 있습니다. 다음을 실행하여 git 리포지토리를 복제합니다.

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

Maven 또는 Gradle 중 더 편하게 사용할 수 있는 것으로 샘플 앱을 빌드합니다. `apm-tutorial-java-host` 내의 `notes` 디렉터리로 이동하여 다음 중 하나를 실행합니다.

{{< tabs >}}

{{% tab "Maven" %}}

```sh
./mvnw clean package
```

{{% /tab %}}

{{% tab "Gradle" %}}

```sh
./gradlew clean bootJar
```

이는 Spring Boot Jar 플러그인으로 Java 애플리케이션을 실행하는 데 필요한 모든 파일이 포함된 단일 Jar 파일을 생성합니다.

{{% /tab %}}

{{< /tabs >}}

다음을 실행하여 애플리케이션을 시작합니다

{{< tabs >}}

{{% tab "Maven" %}}

```sh
java -jar target/notes-0.0.1-SNAPSHOT.jar
```

{{% /tab %}}

{{% tab "Gradle" %}}

```sh
java -jar build/libs/notes-0.0.1-SNAPSHOT.jar
```

{{% /tab %}}

{{< /tabs >}}

또는 운영 체제가 지원하는 경우 `scripts` 디렉터리에 제공된 다음 스크립트를 사용하여 애플리케이션을 빌드 및 실행할 수 있습니다.

{{< tabs >}}

{{% tab "Maven" %}}

```sh
sh ./scripts/mvn_run.sh
```

{{% /tab %}}

{{% tab "Gradle" %}}

```sh
sh ./scripts/gradle_run.sh
```

{{% /tab %}}

{{< /tabs >}}

샘플 `notes_app` 애플리케이션은 기본 REST API로 메모리 내부 데이터베이스에 데이터를 보관합니다. 다음에 따라 다른 터미널을 열고 `curl`로 몇몇 API 요청을 전송합니다.

`curl localhost:8080/notes`
: 아직 데이터베이스에 아무것도 없으므로 `[]`를 반환합니다.

`curl -X POST 'localhost:8080/notes?desc=hello'`
: 설명 `hello`와 ID 값 `1`이 포함된 메모를 추가합니다. `{"id":1,"description":"hello"}`를 반환합니다.

`curl localhost:8080/notes/1`
: `id` 값이 `1`인 메모를 반환합니다: `{"id":1,"description":"hello"}`

`curl -X POST 'localhost:8080/notes?desc=otherNote'`
: 설명 `otherNote`와 ID 값 `2`이 포함된 메모를 추가합니다. `{"id":2,"description":"otherNote"}`를 반환합니다.

`curl localhost:8080/notes`
: 데이터베이스의 내용을 반환합니다.`[{"id":1,"description":"hello"},{"id";2,"description":"otherNote"}]`

API 호출을 더 실행하여 애플리케이션이 작동하는지 확인합니다. 해당 작업을 완료했으면 Ctrl+C를 입력하여 애플리케이션을 중지합니다.

## Datadog 추적 설치

그런 다음 Java 추적 라이브러리(Java Agent)를 다운로드합니다. `apm-tutorial-java-host` 디렉터리에서 다음을 실행합니다.

{{< code-block lang="sh" >}}
curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
{{< /code-block >}}

운영 체제가 Curl을 지원하지 않는 경우 `'https://dtdg.co/latest-java-tracer' `로 직접 이동하여 `dd-java-agent.jar` 파일을 다운로드합니다.

## Java 애플리케이션을 자동 계측으로 실행합니다.

추적 생성 및 수집을 시작하려면, 추가 플래그를 사용해 샘플 애플리케이션을 재시작하여 Datadog에 추적 데이터가 전송되도록 합니다.

<div class="alert alert-warning">이 샘플 명령의 플래그, 특히 샘플 속도는 이 튜토리얼이 적용되지 않은 환경에는 적합하지 않을 수 있습니다. 실제 환경에서 어떤 플래그를 사용해야 하는지 살펴보려면 <a href="#tracing-configuration">추적 설정</a>을 참고하세요</div>.


{{< tabs >}}

{{% tab "Maven" %}}

`notes` 디렉터리에서 다음을 실행합니다.

```sh
java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 target/notes-0.0.1-SNAPSHOT.jar
```

또는 제공된 스크립트를 사용합니다.

```sh
sh ./scripts/mvn_instrumented_run.sh
```

{{% /tab %}}

{{% tab "Gradle" %}}

`notes` 디렉토리에서 다음을 실행합니다.

```sh
java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 build/libs/notes-0.0.1-SNAPSHOT.jar
```

또는 제공된 스크립트를 사용합니다.

```sh
sh ./scripts/gradle_instrumented_run.sh
```

{{% /tab %}}

{{< /tabs >}}


`curl`을 다시 사용해 애플리케이션에 요청 전송:

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

잠시 기다린 다음 Datadog UI를 살펴보세요. [**APM > 트레이스**][11]로 이동합니다. 트레이스 목록은 다음과 같은 콘텐츠를 표시합니다.

{{< img src="tracing/guide/tutorials/tutorial-java-host-traces_cropped.png" alt="호스트에서 들어오는 트레이스 데이터를 표시하는 트레이스 뷰" style="width:100%;" >}}

`h2`는 이 튜토리얼에 대해 내장된 인메모리 데이터베이스이며, `notes`는 Spring Boot 애플리케이션입니다. 추적 목록에는 모든 스팬, 시작 시점, 스팬과 함께 추적된 리소스, 그리고 소요 시간이 표시됩니다.

트레이스를 확인할 수 없는 경우, 트레이스 검색 필드의 모든 필터를 지웁니다(간혹 사용하지 않는 `ENV` 등 의 환경 변수로 필터링되는 경우가 있습니다.).

### 트레이스 검사

트레이스 페이지에서 `POST /notes` 트레이스를 클릭하면 각 스팬 소요 시간 및 스팬 완료 전 발생한 기타 스팬을 표시하는 불꽃 그래프를 확인할 수 있습니다. 그래프 상단의 막대는 이전 화면에서 선택한 스팬입니다(이 경우 메모 애플리케이션에서 초기 입력 요소).

바의 너비는 완료되는 데 소요된 시간을 나타냅니다. 낮은 깊이의 막대는 높은 깊이의 막대 수명 동안 완료된 스팬을 나타냅니다.

`POST` 트레이스의 불꽃 그래프는 이와 비슷한 형태입니다.

{{< img src="tracing/guide/tutorials/tutorial-java-host-post-flame.png" alt="POST 트레이스의 플레임 그래프." style="width:100%;" >}}

`GET /notes` 트레이스는 이와 비슷한 형태입니다.

{{< img src="tracing/guide/tutorials/tutorial-java-host-get-flame.png" alt="GET 트레이스의 플레임 그래프." style="width:100%;" >}}


### 추적 설정

Java 추적 라이브러리는 Java에 내장된 Agent 및 모니터링 지원을 사용합니다. 플래그 `-javaagent:../dd-java-agent.jar`는 JVM에 Java 추적 라이브러리의 위치를 ​​알려 Java Agent로 실행할 수 있도록 합니다. Java Agent에 관한 자세한 내용은 [https://www.baeldung.com/java-instrumentation][7]에서 확인하세요.

시작 명령은 Java Agent를 활성화하는 `javaagent` 플래그 외에도 Datadog 내에서 애플리케이션을 고유 식별하는 세 가지 [통합 서비스 태깅][10] 설정을 지정합니다. 모니터링하는 모든 애플리케이션에 항상 `env`, `service`, `version` 태그를 지정합니다.

마지막으로, `dd.trace.sample.rate` 플래그는 이 애플리케이션의 샘플링 속도를 설정합니다. 시작 명령은 값을 `1`로 설정합니다. 즉, `notes` 서비스의 모든 요청 100%가 분석 및 표시를 위해 Datadog 백엔드로 전송됩니다. 저용량 테스트 애플리케이션에는 적합하나 프로덕션 환경이나 고용량 환경에서는 데이터 양이 매우 많아질 수 있어 권장하지 않습니다. 대신 일부 요청을 샘플링할 수 있습니다. 0에서 1 사이의 값을 선택하세요. 예를 들어, `-Ddd.trace.sample.rate=0.1`는 요청의 10%에 대한 트레이스를 Datadog으로 전송합니다. 관련 정보는 [추적 설정 지정][14] 및 [샘플링 메커니즘][15]에서 자세히 살펴보세요.

명령에서 해당 플래그가 `-jar` 플래그 _앞에_ 나타나는 것을 확인할 수 있습니다. 이는 이 플래그가 애플리케이션이 아닌 Java Virtual Machine의 파라미터이기 때문입니다. 애플리케이션에 Java Agent를 추가할 때 플래그를 올바른 위치에 지정해야 합니다.


## Java 애플리케이션에 수동 계측 추가

자동 계측은 편리하지만 때때로 더욱 세분화된 스팬을 원할 수 있습니다. Datadog의 Java DD 트레이스 API를 사용하면 주석이나 코드로 코드 내 스팬을 지정할 수 있습니다.

다음 단계는 코드에 주석을 추가하여 일부 샘플 메서드를 추적하는 방법을 안내합니다.

1. `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java`를 엽니다. 이 예제에는 주석 처리된 코드가 포함되어 있으며, 코드에서 커스텀 추적을 설정하는 다양한 방법을 보여줍니다.

2. 수동 추적을 지원하기 위해 라이브러리를 가져오는 줄의 주석 처리를 제거합니다.

   ```java
   import datadog.trace.api.Trace;
   import datadog.trace.api.DDTags;
   import io.opentracing.Scope;
   import io.opentracing.Span;
   import io.opentracing.Tracer;
   import io.opentracing.tag.Tags;
   import io.opentracing.util.GlobalTracer;
   import java.io.PrintWriter;
   import java.io.StringWriter
   ```

3. 두 개의 공개 프로세스를 수동으로 추적하는 줄의 주석 처리를 제거합니다. 이는 트레이스에서 `@Trace` 어노테이션을 사용하여 `operationName` 및 `resourceName`을 지정하는 방법을 보여줍니다.
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

4. 애플리케이션의 특정 코드 블록에 대해 별도의 스팬을 생성할 수도 있습니다. 스팬 내에 서비스 및 리소스 이름 태그와 오류 처리 태그를 추가합니다. 이러한 태그를 추가하면 Datadog 시각화에서 스팬과 메트릭을 보여주는 플레임 그래프가 생성됩니다. 프라이빗 메서드를 수동으로 추적하는 줄의 주석 처리를 제거합니다.

   ```java
           Tracer tracer = GlobalTracer.get();
           // Tags can be set when creating the span
           Span span = tracer.buildSpan("manualSpan1")
               .withTag(DDTags.SERVICE_NAME, "NotesHelper")
               .withTag(DDTags.RESOURCE_NAME, "privateMethod1")
               .start();
           try (Scope scope = tracer.activateSpan(span)) {
               // Tags can also be set after creation
               span.setTag("postCreationTag", 1);
               Thread.sleep(30);
               Log.info("Hello from the custom privateMethod1");
   ```
   그리고 오류에 태그를 설정하는 줄도 있습니다.
   ```java
        } catch (Exception e) {
            // Set error on span
            span.setTag(Tags.ERROR, true);
            span.setTag(DDTags.ERROR_MSG, e.getMessage());
            span.setTag(DDTags.ERROR_TYPE, e.getClass().getName());

            final StringWriter errorString = new StringWriter();
            e.printStackTrace(new PrintWriter(errorString));
            span.setTag(DDTags.ERROR_STACK, errorString.toString());
            Log.info(errorString.toString());
        } finally {
            span.finish();
        }
   ```

5. 빌드 스크립트 구성을 업데이트하고 애플리케이션을 빌드합니다.
{{< tabs >}}

{{% tab "Maven" %}}

a. `notes/pom.xml`를 열고 수동 추적 종속성을 구성하는 줄의 코멘트를 제거합니다. `dd-trace-api` 라이브러리는 `@Trace` 주석에 사용되며, `opentracing-util` 및 `opentracing-api`는 수동 스팬 생성에 사용됩니다.

b. 다음을 실행합니다.

   ```sh
   ./mvnw clean package

   java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 target/notes-0.0.1-SNAPSHOT.jar
   ```

   또는 다음 스크립트를 사용합니다.

   ```sh
   sh ./scripts/mvn_instrumented_run.sh
   ```

{{% /tab %}}

{{% tab "Gradle" %}}

a. `notes/build.gradle`를 열고 수동 추적을 위한 종속성을 구성하는 줄의 코멘트를 제거합니다. `dd-trace-api` 라이브러리는 `@Trace` 주석에 사용되며, `opentracing-util` 및 `opentracing-api`는 수동 스팬 생성에 사용됩니다.

b. 다음을 실행합니다.
   ```sh
   ./gradlew clean bootJar

   java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 build/libs/notes-0.0.1-SNAPSHOT.jar
   ```

   또는 다음 스크립트를 사용합니다.

   ```sh
   sh ./scripts/gradle_instrumented_run.sh
   ```

{{% /tab %}}

{{< /tabs >}}

6. 일부 HTTP 요청, 특히 `GET` 요청을 다시 전송합니다.
7. 트레이스 탐색기에서 새로운 `GET` 요청 중 하나를 클릭한 다음 이와 같은 불꽃 그래프를 확인하세요.

   {{< img src="tracing/guide/tutorials/tutorial-java-host-custom-flame.png" alt="커스텀 계측을 활용한 GET 트레이스의 플레임 그래프." style="width:100%;" >}}

   `getAll` 함수가 커스텀 추적을 포함하므로 스택 트레이스(stack trace)에서 상위 수준의 상세 정보를 확인할 수 있습니다.

   수동 스팬(span)을 생성한 `privateMethod`는 다른 호출과 별도의 블록으로 표시되며 다른 색상으로 강조 표시됩니다.`@Trace` 어노테이션을 사용한 다른 메서드는 `GET` 요청(`notes` 애플리케이션)과 동일한 서비스와 색상으로 표시됩니다. 커스텀 계측은 코드의 핵심 부분을 강조 표시하고 모니터링해야 할 때 유용합니다.

자세한 정보는 [커스텀 계측][12]을 참조하세요.

## 두 번째 애플리케이션을 추가해 분산된 트레이스를 확인하세요.

단일 애플리케이션 추적은 좋은 시작이지만 추적의 진정한 가치는 서비스를 통한 요청의 흐름을 확인하는 데 있습니다. 이것을 _분산 추적_이라고 부릅니다.

샘플 프로젝트에 `calendar`라는 두 번째 애플리케이션이 포함되어 있습니다. 이 애플리케이션은 호출 시 임의의 날짜를 반환합니다. 메모 애플리케이션의 `POST` 엔드포인트는 `add_date`라는 두 번째 쿼리 파라미터를 포함합니다. `y`로 설정되어 있는 경우 메모는 캘린더 애플리케이션을 호출하여 메모에 추가할 날짜를 가져옵니다.

1. 샘플 리포지토리의 `/calendar` 디렉터리로 이동하여 캘린더 앱을 빌드 및 실행합니다.
{{< tabs >}}

{{% tab "Maven" %}}

실행:

```sh
./mvnw clean package

java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=calendar -Ddd.env=dev -jar -Ddd.version=0.0.1 target/calendar-0.0.1-SNAPSHOT.jar
```

또는 다음 스크립트를 사용합니다.

```sh
sh ./scripts/mvn_instrumented_run.sh
```

{{% /tab %}}

{{% tab "Gradle" %}}

실행:
```sh
./gradlew bootJar

java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=calendar -Ddd.env=dev -jar -Ddd.version=0.0.1 build/libs/calendar-0.0.1-SNAPSHOT.jar
```

또는 다음 스크립트를 사용합니다.

```sh
sh ./scripts/gradle_instrumented_run.sh
```

{{% /tab %}}

{{< /tabs >}}


2. `add_date` 파라미터를 사용하여 POST 요청을 보냅니다.

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`


3. 트레이스 탐색기에서 이 최신 `notes` 트레이스를 클릭해 두 서비스 간 분산된 트레이스를 확인합니다.

   {{< img src="tracing/guide/tutorials/tutorial-java-host-distributed.png" alt="분산 트레이스의 플레임 그래프." style="width:100%;" >}}

`notes` 애플리케이션에서는 아무것도 변경하지 않았습니다. Datadog은 `notes`에서 `calendar`로의 HTTP 호출에 사용되는 `okHttp`라이브러리와 `notes` 및 `calendar`에서 HTTP 요청을 수신하는 데 사용되는 Jetty 라이브러리를 모두 자동으로 계측합니다. 이를 통해 트레이스 정보를 한 애플리케이션에서 다른 애플리케이션으로 전달하여 분산 트레이스를 캡처할 수 있습니다.


## 트러블슈팅

예상대로 트레이스를 수신하지 않으면 Java 트레이서의 디버그 모드를 설정합니다. 자세한 내용은 [디버그 모드 활성화][13]에서 확인하세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/guide/#enabling-tracing-tutorials
[2]: /ko/tracing/trace_collection/dd_libraries/java/
[3]: /ko/account_management/api-app-keys/
[4]: /ko/tracing/trace_collection/compatibility/java/
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: /ko/getting_started/site/
[7]: https://www.baeldung.com/java-instrumentation
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-java-host
[10]: /ko/getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /ko/tracing/trace_collection/custom_instrumentation/java/
[13]: /ko/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /ko/tracing/trace_collection/library_config/java/
[15]: /ko/tracing/trace_pipeline/ingestion_mechanisms/?tab=java