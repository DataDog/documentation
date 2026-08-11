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
title: 튜토리얼 - 컨테이너에서 Java 애플리케이션 및 Datadog Agent에 대한 추적 활성화
---

## 개요

이 튜토리얼에서는 컨테이너에 설치된 샘플 Java 애플리케이션에서 추적을 활성화하는 단계를 안내합니다. 이 시나리오에서는 Datadog Agent도 컨테이너에 설치됩니다.

호스트의 애플리케이션과 Agent, 컨테이너의 애플리케이션과 호스트의 Agent, 클라우드 인프라스트럭처의 애플리케이션과 Agent, 다른 언어로 작성된 애플리케이션을 포함한 다른 시나리오에 대해서는 [Enabling Tracing 튜토리얼][1]을 참고하세요.

자바(Java)에 대한 일반적인 종합 추적 설정 설명서의 경우 [자바 애플리케이션 추적][2]을 참조하세요.

### 사전 필수 조건

- Datadog 계정과 [조직 API 키][3]
- Git
- Docker
- Curl

## 샘플 도커화된 자바 애플리케이션 설치

이 튜토리얼의 코드 샘플은 GitHub의 [github.com/DataDog/apm-tutorial-java-host][9]에서 찾을 수 있습니다. 시작하려면 리포지토리를 복제합니다.

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

리포지토리에는 Docker 컨테이너 내에서 실행되도록 미리 구성된 다중 서비스 Java 애플리케이션이 포함되어 있습니다. 샘플 앱은 데이터를 추가하고 변경할 수 있는 REST API를 갖춘 기본 메모 앱입니다. `docker-compose` YAML 파일은 `docker` 디렉터리에 있습니다.

이 튜토리얼에서는 애플리케이션과 Datadog Agent 모두에 컨테이너를 빌드하는 `all-docker-compose.yaml` 파일을 사용합니다.

`notes` 및 `calendar` 디렉토리에는 Maven 또는 Gradle로 애플리케이션을 빌드하는 두 세트의 Dockerfile이 있습니다. 이 튜토리얼에서는 Maven 빌드를 사용하지만, Gradle에 더 익숙하다면 해당 빌드 명령의 변경 사항을 사용하여 Maven 빌드를 사용할 수 있습니다.

### 샘플 애플리케이션 시작 및 실행

1. `/docker` 디렉토리 내에서 다음을 실행하여 애플리케이션의 컨테이너를 빌드합니다.

   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml build notes
{{< /code-block >}}

   빌드가 멈추면 `Ctrl+C`로 종료한 뒤 명령을 다시 실행하세요.

2. 컨테이너 시작:

   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml up notes
{{< /code-block >}}

   `docker ps` 명령을 사용하여 실행 중인 컨테이너를 보고 실행 중인지 확인할 수 있습니다.

3. 다른 터미널을 열고 앱을 실행하기 위한 API 요청을 보냅니다. 노트 애플리케이션은 데이터를 동일한 컨테이너에서 실행 중인 인메모리 H2 데이터베이스에 저장하는 REST API입니다. 다음과 같이 몇 가지 명령을 보내세요. 

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

### 애플리케이션 중지

애플리케이션 실행을 확인한 후 추적을 활성화할 수 있도록 중단합니다.

1. 컨테이너 중단:
   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml down
{{< /code-block >}}

2. 컨테이너 제거:
   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml rm
{{< /code-block >}}

## 추적 활성화

이제 Java 애플리케이션이 작동하므로 추적을 활성화하도록 구성하면 됩니다.

1. 프로젝트에 Java 추적 패키지를 추가합니다. Agent는 컨테이너에서 실행되므로 Dockerfiles가 제대로 구성되었는지 확인하는 것 외에 아무것도 설치할 필요가 없습니다. `notes/dockerfile.notes.maven` 파일을 열고 `dd-java-agent`를 다운로드하는 줄의 주석 처리를 제거합니다.

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. 같은 `notes/dockerfile.notes.maven` 파일 내에서 추적 없이 실행할 `ENTRYPOINT` 줄을 주석 처리합니다. 그런 다음 추적 기능을 활성화하여 애플리케이션을 실행하는 `ENTRYPOINT` 줄의 주석 처리를 제거합니다.

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   자동으로 Datadog 서비스를 포함하는 애플리케이션을 계측합니다.

   <div class="alert alert-danger"><strong>참고</strong>: 이 샘플 명령의 플래그, 특히 샘플 속도는 이 튜토리얼이 적용되지 않은 환경에는 적합하지 않을 수 있습니다. 실제 환경에서 어떤 플래그를 사용해야 하는지에 대해 살펴보려면 <a href="#tracing-configuration">추적 설정</a>을 참고하세요.</div>

3. [유니버설 서비스 태그][10]는 다양한 버전 및 배포 환경에서 추적된 서비스를 식별하여 Datadog 내에서 상호 연관시킬 수 있으므로 이를 사용하여 검색 및 필터링할 수 있습니다. 통합 서비스 태그에 사용되는 세 가지 환경 변수는 `DD_SERVICE`, `DD_ENV`, `DD_VERSION`입니다. Docker로 배포된 애플리케이션의 경우 이러한 환경 변수를 Dockerfile 또는 `docker-compose` 파일 내에 추가할 수 있습니다.
   이 튜토리얼에서는 `all-docker-compose.yaml` 파일에 이미 다음과 같은 환경 변수가 정의되어 있습니다.

   ```yaml
     environment:
       - DD_SERVICE=notes
       - DD_ENV=dev
       - DD_VERSION=0.0.1
   ```

4. 또한 동일한 유니버설 서비스 태그 `service`, `env`, `version` 값에 대한 Docker 레이블이 Dockerfile에 설정되어 있는 것을 볼 수 있습니다. 이렇게 하면 애플리케이션이 실행되면 Docker 메트릭도 얻을 수 있습니다.

   ```yaml
     labels:
       - com.datadoghq.tags.service="notes"
       - com.datadoghq.tags.env="dev"
       - com.datadoghq.tags.version="0.0.1"
   ```

## 에이전트 컨테이너 추가

`all-docker-compose.yaml` 파일의 서비스 섹션에서 Datadog 에이전트를 추가해 에이전트를 빌드에 추가합니다.

1. Agent 구성의 주석 처리를 제거하고 고유한 [Datadog API 키][3] 및 [사이트][6]를 지정하세요.
   ```yaml
     datadog-agent:
       container_name: datadog-agent
       image: "gcr.io/datadoghq/agent:latest"
       pid: host
       environment:
         - DD_API_KEY=<DD_API_KEY_HERE>
         - DD_SITE=datadoghq.com  # Default. Change to eu.datadoghq.com, us3.datadoghq.com, us5.datadoghq.com as appropriate for your org
         - DD_APM_ENABLED=true
         - DD_APM_NON_LOCAL_TRAFFIC=true
       volumes:
         - /var/run/docker.sock:/var/run/docker.sock
         - /proc/:/host/proc/:ro
         - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
   ```

3. `notes` 컨테이너에서 `datadog-agent`에 대한 `depends_on` 필드의 주석을 제거합니다.

2. `notes` 서비스 섹션에서 `DD_AGENT_HOST` 환경 변수가 Agent 컨테이너의 호스트 이름으로 설정되어 있는지 확인합니다. `notes` 컨테이너 섹션은 다음과 같습니다.
   ```yaml
   notes:
     container_name: notes
     restart: always
     build:
       context: ../
       dockerfile: notes/dockerfile.notes.maven
     ports:
       - 8080:8080
     labels:
       - com.datadoghq.tags.service="notes"
       - com.datadoghq.tags.env="dev"
       - com.datadoghq.tags.version="0.0.1"
     environment:
       - DD_SERVICE=notes
       - DD_ENV=dev
       - DD_VERSION=0.0.1
       - DD_AGENT_HOST=datadog-agent
     # - CALENDAR_HOST=calendar
     depends_on:
     # - calendar
       - datadog-agent
   ```
   이 튜토리얼의 후반부에서 `calendar` 섹션과 변수를 설정하게 됩니다.


## 컨테이너를 시작해 자동 추적을 확인합니다.

이제 추적 라이브러리가 설치되었습니다. 애플리케이션을 재시작하고 트레이스 수신을 시작합니다. 다음 명령을 실행합니다.

```
docker-compose -f all-docker-compose.yaml build notes
docker-compose -f all-docker-compose.yaml up notes
```

터미널에서 지속적인 출력을 관찰하여 에이전트가 작동하고 있는지 확인할 수 있습니다. 혹은 Datadog에서 [이벤트 탐색기][8]를 열어 에이전트 시작 이벤트를 확인할 수 있습니다.

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="이벤트 탐색기에 표시된 에이전트 시작 이벤트" style="width:100%;" >}}

실행되는 애플리케이션에서 CURL 요청을 전송합니다.

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

잠시 기다린 다음 Datadog에서  [**APM > 트레이스**][11]로 이동합니다. API 호출과 대응되는 트레이스 목록을 확인할 수 있습니다.

{{< img src="tracing/guide/tutorials/tutorial-java-container-traces2.png" alt="APM Trace Explore 샘플 앱에서의 트레이스" style="width:100%;" >}}

`h2`는 이 튜토리얼에 대해 내장된 인메모리 데이터베이스이며, `notes`는 Spring Boot 애플리케이션입니다. 추적 목록에는 모든 스팬, 시작 시점, 스팬과 함께 추적된 리소스, 그리고 소요 시간이 표시됩니다.

몇 분이 지난 후에도 트레이스를 확인할 수 없다면 트레이스 검색 필드에서 모든 필터를 해제합니다. 때론 사용하지 않는 `ENV` 등 환경 변수에 대해 필터링되었을 수 있습니다.

### 트레이스 검사

트레이스 페이지에서 `POST /notes` 트레이스를 클릭해 각 스팬에 걸리는 시간 및 스팬 완료 전 발생한 다른 스팬을 나타내는 플레임(Flame) 그래프를 확인할 수 있습니다. 그래프 상단의 막대는 이전 화면에서 선택한 스팬입니다. (이 경우 메모 애플리케이션의 최초 엔트리 포인트입니다.)

바의 너비는 완료되는 데 소요된 시간을 나타냅니다. 낮은 깊이의 막대는 높은 깊이의 막대 수명 동안 완료된 스팬을 나타냅니다.

`POST` 트레이스의 불꽃 그래프는 이와 비슷한 형태입니다.

{{< img src="tracing/guide/tutorials/tutorial-java-container-post-flame.png" alt="POST 트레이스의 플레임 그레프." style="width:100%;" >}}

`GET /notes` 트레이스는 이와 비슷한 형태입니다.

{{< img src="tracing/guide/tutorials/tutorial-java-container-get-flame.png" alt="GET 트레이스의 플레임 그래프." style="width:100%;" >}}

### 추적 설정

Java 추적 라이브러리는 Java에 내장된 Agent 및 모니터링 지원을 사용합니다. Dockerfile의 플래그 `-javaagent:../dd-java-agent.jar`는 JVM에 Java 추적 라이브러리의 위치를 ​​알려 Java Agent로 실행할 수 있도록 합니다. Java Agent에 대한 자세한 내용은 [https://www.baeldung.com/java-instrumentation][7]에서 확인하세요.

`dd.trace.sample.rate` 플래그는 이 애플리케이션의 샘플링 속도를 설정합니다. Dockerfile의 ENTRYPOINT 명령은 값을 `1`로 설정합니다. 즉, `notes` 서비스의 모든 요청 100%가 분석 및 표시를 위해 Datadog 백엔드로 전송됩니다. 저용량 테스트 애플리케이션에는 적합하나 프로덕션 환경이나 고용량 환경에서는 데이터 양이 매우 많아질 수 있어 권장하지 않습니다. 대신 일부 요청을 샘플링할 수 있습니다. 0에서 1 사이의 값을 선택하세요. 예를 들어, `-Ddd.trace.sample.rate=0.1`는 요청의 10%에 대한 트레이스를 Datadog으로 전송합니다. 관련 정보는 [추적 구성 설정][14] 및 [샘플링 메커니즘][15]에서 자세히 살펴보세요.

명령에서 샘플링 속도 플래그가 `-jar` 플래그 _앞에_ 나타나는 것을 확인할 수 있습니다. 이는 이 플래그가 애플리케이션이 아닌 Java Virtual Machine의 파라미터이기 때문입니다. 애플리케이션에 Java Agent를 추가할 때 플래그를 올바른 위치에 지정해야 합니다.

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

5. 수동 추적을 위한 종속성을 구성하는 `notes/pom.xml` 줄을 열고 주석 처리를 제거하여 Maven 빌드를 업데이트하세요. `dd-trace-api` 라이브러리는 `@Trace` 어노테이션에 사용되고, `opentracing-util` 와 `opentracing-api`는 수동 스팬 생성에 사용됩니다.

6. 컨테이너 다시 빌드:

   ```sh
   docker-compose -f all-docker-compose.yaml build notes
   docker-compose -f all-docker-compose.yaml up notes
   ```

7. 일부 HTTP 요청, 특히 `GET` 요청을 다시 전송합니다.
8. 트레이스 탐색기에서 새로운 `GET` 요청 중 하나를 클릭한 다음 이와 같은 불꽃 그래프를 확인하세요.

   {{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="커스텀 계측이 포함된 GET 추적에 대한 플레임 그래프." style="width:100%;" >}}

   `getAll` 함수가 커스텀 추적을 포함하므로 스택 트레이스(stack trace)에서 상위 수준의 상세 정보를 확인할 수 있습니다.

   수동 스팬(span)을 생성한 `privateMethod`는 다른 호출과 별도의 블록으로 표시되며 다른 색상으로 강조 표시됩니다.`@Trace` 어노테이션을 사용한 다른 메서드는 `GET` 요청(`notes` 애플리케이션)과 동일한 서비스와 색상으로 표시됩니다. 커스텀 계측은 코드의 핵심 부분을 강조 표시하고 모니터링해야 할 때 유용합니다.

자세한 정보는 [커스텀 계측][12]을 참조하세요.

## 두 번째 애플리케이션을 추가해 분산된 트레이스를 확인하세요.

단일 애플리케이션 추적은 좋은 시작이지만 추적의 진정한 가치는 서비스를 통한 요청의 흐름을 확인하는 데 있습니다. 이것을 _분산 추적_이라고 부릅니다.

샘플 프로젝트에 `calendar`라는 두 번째 애플리케이션이 포함되어 있습니다. 이 애플리케이션은 호출 시 임의의 날짜를 반환합니다. 메모 애플리케이션의 `POST` 엔드포인트는 `add_date`라는 두 번째 쿼리 파라미터를 포함합니다. `y`로 설정되어 있는 경우 메모는 캘린더 애플리케이션을 호출하여 메모에 추가할 날짜를 가져옵니다.

1. 앞서 메모 앱에 대해 했던 것처럼 Dockerfile의 시작 명령에 `dd-java-agent`를 추가해 추적을 위한 캘린더 앱을 구성합니다. `calendar/Dockerfile.calendar.maven`을 열고 이미 `dd-java-agent`를 다운로드하고 있는지 확인합니다.

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. 같은 `calendar/dockerfile.calendar.maven` 파일 내에서 추적 없이 실행할 `ENTRYPOINT` 줄을 주석 처리합니다. 그런 다음 추적 기능을 활성화하여 애플리케이션을 실행하는 `ENTRYPOINT` 줄의 주석 처리를 제거합니다.

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   <div class="alert alert-danger"><strong>참고</strong>: 이 플래그, 특히 샘플 속도는 이 튜토리얼이 적용되지 않은 환경에는 적합하지 않을 수 있음을 다시 강조합니다. 실제 환경에서 어떤 플래그를 사용해야 하는지에 살펴보려면 <a href="#tracing-configuration">추적 설정</a>을 참고하세요.</div>

3. 앱과 Docker의 Agent 호스트와 Unified Service Tags를 설정하려면 `calendar` 서비스의  `docker/all-docker-compose.yaml`을 열고 환경 변수 주석 처리를 제거합니다.

   ```yaml
     calendar:
       container_name: calendar
       restart: always
       build:
         context: ../
         dockerfile: calendar/dockerfile.calendar.maven
       labels:
         - com.datadoghq.tags.service="calendar"
         - com.datadoghq.tags.env="dev"
         - com.datadoghq.tags.version="0.0.1"
       environment:
         - DD_SERVICE=calendar
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=datadog-agent
      ports:
        - 9090:9090
      depends_on:
        - datadog-agent
   ```

4. `notes` 서비스 섹션에서 `CALENDAR_HOST` 환경 변수 및 `calendar` 항목의 주석을 해제하여 `depends_on` 두 앱 간에 필요한 연결을 설정합니다.

   ```yaml
     notes:
     ...
       environment:
         - DD_SERVICE=notes
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=datadog-agent
         - CALENDAR_HOST=calendar
       depends_on:
         - calendar
         - datadog-agent
   ```

5. 컨테이너를 다시 시작하여 다중 서비스 애플리케이션을 빌드합니다. 먼저 실행 중인 모든 컨테이너를 중단합니다.
   ```
   docker-compose -f all-docker-compose.yaml down
   ```

   그런 다음 다음 명령을 실행하여 시작하세요.
   ```
   docker-compose -f all-docker-compose.yaml build
   docker-compose -f all-docker-compose.yaml up
   ```

6. 모든 컨테이너가 활성화되면 `add_date` 파라미터와 함께 POST 요청을 보냅니다.

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`


7. 트레이스 탐색기에서 다음 최신 트레이스를 클릭하여 두 서비스 간의 분산 트레이스를 확인하세요.

   {{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="분산 추적을 보여주는 플레임 그래프" style="width:100%;" >}}

`notes` 애플리케이션에서는 아무것도 변경하지 않았습니다. Datadog은 `notes`에서 `calendar`로의 HTTP 호출에 사용되는 `okHttp`라이브러리와 `notes` 및 `calendar`에서 HTTP 요청을 수신하는 데 사용되는 Jetty 라이브러리를 모두 자동으로 계측합니다. 이를 통해 트레이스 정보를 한 애플리케이션에서 다른 애플리케이션으로 전달하여 분산 트레이스를 캡처할 수 있습니다.

## 트러블슈팅

예상대로 트레이스를 수신하지 않으면 Java 트레이서의 디버그 모드를 설정합니다. 자세한 내용은 [디버그 모드 활성화][13]에서 확인하세요.
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/guide/#enabling-tracing-tutorials
[2]: /ko/tracing/trace_collection/dd_libraries/java/
[3]: /ko/account_management/api-app-keys/
[4]: /ko/tracing/trace_collection/compatibility/java/
[6]: /ko/getting_started/site/
[8]: https://app.datadoghq.com/event/explorer
[7]: https://www.baeldung.com/java-instrumentation
[9]: https://github.com/DataDog/apm-tutorial-java-host
[10]: /ko/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/apm/traces
[12]: /ko/tracing/trace_collection/custom_instrumentation/java/
[13]: /ko/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /ko/tracing/trace_collection/library_config/java/
[15]: /ko/tracing/trace_pipeline/ingestion_mechanisms/?tab=java