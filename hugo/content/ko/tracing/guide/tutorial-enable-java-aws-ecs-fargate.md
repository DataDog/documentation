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
title: 튜토리얼 - Fargate로 Amazon ECS에서 Java 애플리케이션 추적 활성화
---

## 개요

Fargate를 사용하여 AWS Elastic Container Service(ECS)의 클러스터에 설치된 샘플 Java 애플리케이션에서 추적을 활성화하는 방법을 살펴보겠습니다. 이 시나리오에서는 Datadog Agent도 클러스터에 설치됩니다.

호스트, 컨테이너, 다른 클라우드 인프라스트럭처, 다른 언어로 작성된 애플리케이션 등 이외의 시나리오에 대해서는 다른 [추적 활성화 튜토리얼][1]을 참고하세요. 컨테이너나 EKS를 사용하는 튜토리얼 등 다른 튜토리얼에서는 Datadog에서 자동 계측과 커스텀 계측 간의 차이점을 단계별로 설명합니다. 하지만 이 튜토리얼은 커스텀 계측 예제부터 바로 다룹니다.

또한 중급 수준의 AWS 주제를 다루므로 AWS 네트워킹 및 애플리케이션에 대한 지식이 어느 정도 필요합니다. AWS에 익숙하지 않고 Datadog APM 설정의 기본 사항부터 배우고 싶다면  호스트 또는 컨테이너 튜토리얼을 살펴보세요.

자바(Java)에 대한 일반적인 종합 추적 설정 설명서의 경우 [자바 애플리케이션 추적][2]을 참조하세요.

### 사전 필수 조건

- Datadog 계정과 [조직 API 키][3]
- Git
- Docker
- Terraform
- Amazon ECS
- 이미지 호스팅을 위한 Amazon ECR 리포지토리
- `AdministratorAccess` 권한이 있는 AWS IAM 사용자입니다. 액세스 키와 비밀 액세스 키를 사용하여 로컬 크리덴셜 파일에 프로파일을 추가해야 합니다. 자세한 내용은 [AWS 크리덴셜 파일 및 크리덴셜 프로파일 사용][20]을 참고하세요.

## 샘플 Java 애플리케이션 설치

이 튜토리얼의 코드 샘플은 GitHub의 [github.com/DataDog/apm-tutorial-java-host][9]에서 찾을 수 있습니다. 시작하려면 리포지토리를 복제하세요.

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

리포지토리에는 Docker 컨테이너 내에서 실행되도록 미리 설정된 다중 서비스 Java 애플리케이션이 포함되어 있습니다. 컨테이너를 만드는 데 필요한 `docker-compose` YAML 파일은 `docker` 디렉터리에 있습니다. 이 튜토리얼에서는 애플리케이션의 컨테이너를 빌드하는 `service-docker-compose-ECS.yaml` 파일을 사용합니다.

`notes` 및 `calendar` 디렉터리에는 Maven 또는 Gradle로 애플리케이션을 빌드하는 두 세트의 Dockerfile이 있습니다. 이 튜토리얼에서는 Maven 빌드를 사용하지만, Gradle에 더 익숙하다면 해당 빌드 명령을 변경하여 Maven 빌드를 사용할 수 있습니다.

샘플 애플리케이션은 두 개의 API를 사용하는 간단한 다중 서비스 Java 애플리케이션으로, 하나는 `notes` 서비스용이고 다른 하나는 `calendar` 서비스용입니다. `notes` 서비스는 인메모리 H2 데이터베이스에 저장된 notes에 대한 `GET`, `PUT`, `DELETE` 엔드포인트를 갖습니다. `calendar` 서비스는 요청을 받아 메모에 사용할 임의의 날짜를 반환할 수 있습니다. 두 애플리케이션 모두 자체 Docker 이미지를 가지고 있으며, Amazon ECS에 별도의 서비스로 배포합니다. 각 서비스에는 고유한 작업과 컨테이너가 있습니다. ECS는 애플리케이션 이미지 리포지토리인 ECR에서 이미지를 가져오고, 빌드 후 이미지를 게시합니다.

### 초기 ECS 설정

이 애플리케이션을 사용하려면 AWS 프로파일(ECS 클러스터를 생성하고 ECR에서 읽을 수 있는 올바른 권한이 이미 구성됨), AWS 리전, Amazon ECR 리포지토리를 추가하는 등 초기 설정이 필요합니다.

`terraform/Fargate/global_constants/variables.tf`를 엽니다. 아래 변수 값을 올바른 AWS 계정 정보로 바꿉니다.

```
output "aws_profile" {
    value = "<AWS_PROFILE>"
    sensitive = true
}

output "aws_region" {
    value = "<AWS_REGION>"
    sensitive = true
}

output "aws_ecr_repository" {
    value = "<AWS_ECR_REPOSITORY_URL>"
    sensitive = true
}
```

### 애플리케이션 이미지 빌드 및 업로드

컨테이너 이미지 레지스트리인 Amazon ECR에 익숙하지 않다면 [AWS CLI와 함께 Amazon ECR 사용][17]을 참고해 보세요.

샘플 프로젝트 `/docker` 디렉터리에서 다음 명령을 실행합니다.

1. 다음 명령에 사용자 이름과 비밀번호를 입력하여 ECR에 인증합니다.
   {{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>{{< /code-block >}}

2. 샘플 앱에 대한 Docker 이미지를 빌드하고 플랫폼 설정을 사용자 설정에 맞게 조정합니다.
   {{< code-block lang="sh" >}}
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build{{< /code-block >}}

3. ECR 대상으로 컨테이너를 태그합니다.
   {{< code-block lang="sh" >}}
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

4. 컨테이너를 ECR 레지스트리에 업로드합니다.
   {{< code-block lang="sh" >}}
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

애플리케이션(추적 기능 비활성화)은 컨테이너화되어 ECS에서 가져올 수 있습니다.


### 애플리케이션 배포

애플리케이션을 시작하고 추적 없이 몇 가지 요청을 전송해 보세요. 애플리케이션이 어떻게 작동하는지 확인 후 추적 라이브러리와 Datadog Agent를 사용하여 애플리케이션을 계측합니다.

시작하려면 Terraform 스크립트를 사용하여 Amazon ECS에 배포합니다.

1. `terraform/Fargate/Uninstrumented` 디렉터리에서 다음 명령을 실행합니다.

   ```sh
   terraform init
   terraform apply
   terraform state show 'aws_alb.application_load_balancer'
   ```

   **참고**: `terraform apply` 명령이 CIDR 블록 메시지를 반환하는 경우, IP 주소를 가져오는 스크립트가 로컬 머신에서 작동하지 않은 것입니다. 이 문제를 해결하려면 `terraform/Fargate/Uninstrumented/security.tf` 파일에서 값을 수동으로 설정하세요. `load_balancer_security_group`의 `ingress` 블록 안에서 주석 처리된 `cidr_blocks` 줄을 바꾸고, 주석 처리가 해제된 예제 줄을 머신의 IP4 주소로 업데이트합니다.

2. 로드 밸런서의 DNS 이름을 기록해 두세요. 샘플 앱에 API 호출에서 해당 기본 도메인을 사용합니다. 인스턴스가 시작될 때까지 몇 분 정도 기다리세요.

3. 다른 터미널을 열고 앱을 실행하기 위한 API 요청을 보냅니다. notes 애플리케이션은 데이터를 동일한 컨테이너에서 실행 중인 인메모리 H2 데이터베이스에 저장하는 REST API입니다. 다음과 같이 몇 가지 명령을 보내세요. 

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=hello'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes?id=1'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"hello"}]`

   `curl -X PUT 'BASE_DOMAIN:8080/notes?id=1&desc=UpdatedNote'`
   : `{"id":1,"description":"UpdatedNote"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"UpdatedNote"}]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=NewestNote&add_date=y'`
   : `{"id":2,"description":"NewestNote with date 12/02/2022."}`

      이 명령은 `notes` 및 `calendar` 서비스를 모두 호출합니다.

4. 애플리케이션이 실행되는 것을 확인한 후 다음 명령을 실행하여 애플리케이션을 중지하고 AWS 리소스를 정리하여 추적을 활성화합니다.
   {{< code-block lang="sh" >}}
terraform destroy{{< /code-block >}}

## 추적 활성화

이제 Java 애플리케이션이 작동하므로 추적을 활성화하도록 구성하면 됩니다.

1. 애플리케이션이 추적을 생성하는 데 필요한 Java 추적 패키지를 추가하기 위해 Dockerfile을 수정합니다.`notes/dockerfile.notes.maven` 파일을 열고, `dd-java-agent`를 다운로드하는 줄의 주석 처리를 제거하세요.

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. 같은 `notes/dockerfile.notes.maven` 파일 내에서 추적 없이 실행할 `ENTRYPOINT` 줄을 주석 처리합니다. 그런 다음 추적 기능을 활성화하여 애플리케이션을 실행하는 `ENTRYPOINT` 줄의 주석 처리를 제거합니다.

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   다른 서비스인 `calendar`에서도 이 단계를 반복합니다. `calendar/dockerfile.calendar.maven`을 열고 추적 없이 실행하려는 `ENTRYPOINT` 줄을 주석 처리합니다. 그런 다음 추적 기능을 활성화하여 애플리케이션을 실행하는 `ENTRYPOINT` 줄의 주석 처리를 제거합니다.

   ```
   ENTRYPOINT ["java", "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   이제 두 서비스 모두에서 자동 계측을 사용할 수 있습니다.

   <div class="alert alert-warning">이 샘플 명령의 플래그, 특히 샘플 속도는 이 튜토리얼이 적용되지 않은 환경에는 적합하지 않을 수 있습니다. 실제 환경에서 어떤 플래그를 사용해야 하는지 살펴보려면 <a href="#tracing-configuration">추적 설정</a>을 참고하세요</div>.

3. 자동 계측은 편리하지만, 때로는 더 세분화된 스팬이 필요할 수 있습니다. Datadog의 Java DD Trace API를 사용하면 어노테이션이나 코드를 사용하여 코드 내에서 스팬을 지정할 수 있습니다. 코드에 어노테이션을 추가하여 샘플 메서드를 추적해 보세요.

   `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java`를 엽니다. 이 예제에는 주석 처리된 코드가 포함되어 있으며, 코드에서 커스텀 추적을 설정하는 다양한 방법을 보여줍니다.

4. 수동 추적을 지원하기 위해 라이브러리를 가져오는 줄의 주석 처리를 제거합니다.

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

5. 두 개의 공개 프로세스를 수동으로 추적하는 줄의 주석 처리를 제거합니다. 이는 트레이스에서 `@Trace` 어노테이션을 사용하여 `operationName` 및 `resourceName`을 지정하는 방법을 보여줍니다.
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

6. 애플리케이션의 특정 코드 블록에 별도의 스팬을 생성할 수도 있습니다. 스팬 내에 서비스 및 리소스 이름 태그와 오류 처리 태그를 추가합니다. 이러한 태그를 추가하면 Datadog 시각화에서 스팬과 메트릭을 보여주는 플레임 그래프가 생성됩니다. 프라이빗 메서드를 수동으로 추적하는 줄의 주석 처리를 제거합니다.

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

7. 수동 추적을 위한 종속성을 구성하는 `notes/pom.xml` 줄을 열고 주석 처리를 제거하여 Maven 빌드를 업데이트하세요. `dd-trace-api` 라이브러리는 `@Trace` 어노테이션에 사용되고, `opentracing-util` 와 `opentracing-api`는 수동 스팬 생성에 사용됩니다.

8. `notes` 및 `calendar` 작업 정의에 Datadog Agent를 추가하고, Agent를 아무 곳에나 설치하는 대신 각 AWS 작업 옆의 컨테이너에 Agent를 추가합니다. `terraform/Fargate/Instrumented/main.tf`를 열어 ECS Fargate에서 Datadog Agent를 실행하고 트레이스를 수집하는 데 필요한 기본 구성, 즉 API 키(다음 단계에서 구성), ECS Fargate 활성화, APM 활성화가 이미 포함되어 있는지 확인합니다. 정의는 `notes` 작업 및 `calendar` 작업 모두에서 제공됩니다.

9. API 키 변수에 값을 입력합니다. `terraform/Fargate/global_constants/variables.tf`를 열고 `output "datadog_api_key"` 섹션의 주석 처리를 제거한 후 조직의 Datadog API 키를 입력합니다.

10. [Universal Service Tags][10]는 다양한 버전 및 배포 환경에서 추적된 서비스를 식별하여 Datadog 내에서 상관 관계를 분석하고 검색 및 필터링에 사용할 수 있도록 합니다. Unified Service Tagging에 사용되는 세 가지 환경 변수는 `DD_SERVICE`, `DD_ENV`, `DD_VERSION`입니다. ECS에 배포된 애플리케이션의 경우 이러한 환경 변수는 컨테이너의 작업 정의 내에서 설정됩니다.

    이 튜토리얼의 `/terraform/Fargate/Instrumented/main.tf` 파일에는 notes 및 calendar 애플리케이션에 다음 환경 변수가 이미 정의되어 있습니다. 예를 들어, `notes`의 경우에는 다음과 같습니다.

    ```yaml
    ...

       name : "notes",
       image : "${module.settings.aws_ecr_repository}:notes",
       essential : true,
       portMappings : [
         {
           containerPort : 8080,
           hostPort : 8080
         }
       ],
       memory : 512,
       cpu : 256,
       environment : [
         {
           name : "CALENDAR_HOST",
           value : "calendar.apmlocaljava"
         },
         {
           name : "DD_SERVICE",
           value : "notes"
         },
         {
           name : "DD_ENV",
           value : "dev"
         },
         {
           name : "DD_VERSION",
           value : "0.0.1"
         }
       ],
       dockerLabels : {
         "com.datadoghq.tags.service" : "notes",
         "com.datadoghq.tags.env" : "dev",
         "com.datadoghq.tags.version" : "0.0.1"
       },
       ...
    ```
    `calendar`의 환경 변수:

    ```yaml
     ...
        name : "calendar",
        image : "${module.settings.aws_ecr_repository}:calendar",
        essential : true,
        environment : [
          {
            name : "DD_SERVICE",
            value : "calendar"
          },
          {
            name : "DD_ENV",
            value : "dev"
          },
          {
            name : "DD_VERSION",
            value : "0.0.1"
          }
       ],
       dockerLabels : {
         "com.datadoghq.tags.service" : "calendar",
         "com.datadoghq.tags.env" : "dev",
         "com.datadoghq.tags.version" : "0.0.1"
       },
      ...
     ```

    동일한 Universal Service Tags `service`, `env`, `version` 값의 Docker 레이블이 설정된 것을 확인할 수 있습니다. 이를 통해 애플리케이션이 실행 중일 때 Docker 메트릭을 가져올 수 있습니다.

### 추적 설정

Java 추적 라이브러리는 Java에 내장된 Agent 및 모니터링 지원을 사용합니다. Dockerfile의 플래그 `-javaagent:../dd-java-agent.jar`는 JVM에 Java 추적 라이브러리의 위치를 ​​알려 Java Agent로 실행할 수 있도록 합니다. Java Agent에 관한 자세한 내용은 [https://www.baeldung.com/java-instrumentation][7]에서 확인하세요.

`dd.trace.sample.rate` 플래그는 이 애플리케이션의 샘플링 속도를 설정합니다. Dockerfile의 ENTRYPOINT 명령은 값을 `1`로 설정합니다. 즉, 모든 서비스 요청의 100%가 분석 및 표시를 위해 Datadog 백엔드로 전송됩니다. 저용량 테스트 애플리케이션에는 적합하나 프로덕션 환경이나 고용량 환경에서는 데이터 양이 매우 많아질 수 있어 권장하지 않습니다. 대신 일부 요청을 샘플링할 수 있습니다. 0에서 1 사이의 값을 선택하세요. 예를 들어, `-Ddd.trace.sample.rate=0.1`는 요청의 10% 트레이스를 Datadog으로 전송합니다. 관련 정보는 [추적 구성 설정][14] 및 [샘플링 메커니즘][15]에서 자세히 살펴보세요.

명령에서 샘플링 속도 플래그가 `-jar` 플래그 _앞에_ 나타나는 것을 확인할 수 있습니다. 이는 이 플래그가 애플리케이션이 아닌 Java 가상 머신의 파라미터이기 때문입니다. 애플리케이션에 Java Agent를 추가할 때 플래그를 올바른 위치에 지정해야 합니다.

### 애플리케이션 이미지를 다시 빌드한 후 업로드

[이전과 동일한 단계](#build-and-upload-the-application-images)를 사용하여 추적을 활성화하고 이미지를 다시 빌드합니다:
{{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

추적 기능이 활성화된 다중 서비스 애플리케이션은 컨테이너화되어 ECS에서 가져올 수 있습니다.

## 앱을 실행하여 트레이스 확인

애플리케이션을 다시 배포하고 API를 실행합니다.

1. [이전과 동일한 terraform 명령](#deploy-the-application)을 사용하여 Amazon ECS에 애플리케이션을 다시 배포하되, 구성 파일의 계측된 버전을 사용합니다. `terraform/Fargate/Instrumented` 디렉터리에서 다음 명령을 실행합니다.

   ```sh
   terraform init
   terraform apply
   terraform state show 'aws_alb.application_load_balancer'
   ```

2. 로드 밸런서의 DNS 이름을 기록해 두세요. 샘플 앱에 API 호출에서 해당 기본 도메인을 사용하게 됩니다.

3. 인스턴스가 시작될 때까지 몇 분 정도 기다린 후 애플리케이션 컨테이너가 준비되었는지 확인하기 위해 몇 분 정도 기다립니다. 그런 다음 curl 명령을 실행하여 계측된 앱을 테스트합니다.

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=hello'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes?id=1'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"hello"}]`

   `curl -X PUT 'BASE_DOMAIN:8080/notes?id=1&desc=UpdatedNote'`
   : `{"id":1,"description":"UpdatedNote"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"hello"}]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=NewestNote&add_date=y'`
   : `{"id":2,"description":"NewestNote with date 12/02/2022."}`
   : 이 명령은 `notes` 및 `calendar` 서비스를 모두 호출합니다.

4. 잠시 기다린 다음 Datadog에서  [**APM > 트레이스**][11]로 이동합니다. API 호출과 대응되는 트레이스 목록을 확인할 수 있습니다.

   {{< img src="tracing/guide/tutorials/tutorial-java-container-traces2.png" alt="APM Trace Explorer 샘플 앱에서의 트레이스" style="width:100%;" >}}

   `h2`는 이 튜토리얼에 내장된 인메모리 데이터베이스이며, `notes`는 Spring Boot 애플리케이션입니다. 트레이스 목록에는 모든 스팬, 시작 시점, 스팬과 함께 추적된 리소스, 소요 시간이 표시됩니다.

몇 분이 지난 후에도 트레이스를 확인할 수 없다면 트레이스 검색 필드에서 모든 필터를 해제합니다. 때론 사용하지 않는 `ENV` 등 환경 변수에 대해 필터링되었을 수 있습니다.

### 트레이스 검사

트레이스 페이지에서 `POST /notes` 트레이스를 클릭해 각 스팬에 걸리는 시간 및 스팬 완료 전 발생한 다른 스팬을 나타내는 플레임(Flame) 그래프를 확인할 수 있습니다. 그래프 상단의 막대는 이전 화면에서 선택한 스팬입니다. (이 경우 메모 애플리케이션의 최초 엔트리 포인트입니다.)

바의 너비는 완료되는 데 소요된 시간을 나타냅니다. 낮은 깊이의 막대는 높은 깊이의 막대 수명 동안 완료된 스팬을 나타냅니다.

Trace Explorer에서 `GET` 요청 중 하나를 클릭하면 다음과 같은 플레임 그래프가 표시됩니다.

{{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="커스텀 계측이 포함된 GET 트레이스의 플레임 그래프." style="width:100%;" >}}

수동 스팬을 생성한 `privateMethod`는 다른 호출과 별도의 블록으로 표시되며 다른 색상으로 강조 표시됩니다.`@Trace` 어노테이션을 사용한 다른 메서드는 `GET` 요청(`notes` 애플리케이션)과 동일한 서비스와 색상으로 표시됩니다. 커스텀 계측은 코드의 핵심 부분을 강조 표시하고 모니터링해야 할 때 유용합니다.

자세한 정보는 [커스텀 계측][12]을 참조하세요.

단일 서비스 추적은 좋은 시작이지만, 추적의 진정한 가치는 요청이 서비스 내에서 어떻게 흐르는지 확인하는데 있습니다. 이를 _분산 추적_이라고 합니다. note에 날짜를 추가한 마지막 API 호출의 트레이스를 클릭하면 두 서비스 간의 분산 트레이스를 확인할 수 있습니다.

{{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="분산 트레이스를 보여주는 플레임 그래프" style="width:100%;" >}}

`notes` 애플리케이션에서는 아무것도 변경하지 않았습니다. Datadog은 `notes`에서 `calendar`로의 HTTP 호출에 사용되는 `okHttp` 라이브러리와 `notes` 및 `calendar`에서 HTTP 요청을 수신하는 데 사용되는 Jetty 라이브러리를 모두 자동으로 계측합니다. 이를 통해 트레이스 정보를 한 애플리케이션에서 다른 애플리케이션으로 전달하여 분산 트레이스를 캡처할 수 있습니다.

확인이 끝나면 모든 리소스를 정리하고 배포를 삭제하세요.

```sh
aws ecs delete-service --cluster apm-tutorial-ec2-java --service datadog-agent --profile <PROFILE> --region <REGION>
terraform destroy
```

## 트러블슈팅

예상대로 트레이스를 수신하지 않으면 Java 트레이서의 디버그 모드를 설정하세요. 자세한 내용은 [디버그 모드 활성화][13]에서 확인할 수 있습니다.

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
[17]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html
[18]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#create-and-provide-a-secret-that-contains-your-datadog-api-and-app-keys
[20]: https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-profiles.html