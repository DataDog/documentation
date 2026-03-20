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
title: 튜토리얼 - AWS Elastic Kubernetes 서비스에서 Java 애플리케이션에 추적 활성화하기
---

## 개요

이 튜토리얼에서는 AWS EKS(Elastic Kubernetes) 서비스의 클러스터에 설치된 샘플 자바 애플리케이션에서 추적을 활성화하는 단계를 안내합니다. 이 시나리오에서는 Datadog Agent가 클러스터에 설치되어 있습니다.

호스트, 컨테이너, 클라우드, 기타 인프라스트럭처, 다른 언어로 작성된 애플리케이션 등 다른 시나리오의 경우 기타 [추적 활성화 튜토리얼][1]을 참조하세요.

자바(Java)에 대한 일반적인 종합 추적 설정 설명서의 경우 [자바 애플리케이션 추적][2]을 참조하세요.

### 사전 필수 조건

- Datadog 계정과 [조직 API 키][3]
- Git
- Kubectl
- eksctl
- Helm - 다음 명령을 실행하여 설치합니다.
  {{< code-block lang="sh" >}}
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh{{< /code-block >}}
  다음 명령을 실행하여 Helm를 설정합니다.
  {{< code-block lang="sh" >}}
helm repo add datadog-crds https://helm.datadoghq.com
helm repo add kube-state-metrics https://prometheus-community.github.io/helm-charts
helm repo add datadog https://helm.datadoghq.com
helm repo update{{< /code-block >}}

## 샘플 Kubernetes Java 애플리케이션 설치

이 튜토리얼의 코드 샘플은 GitHub의 [github.com/DataDog/apm-tutorial-java-host][9]에서 찾을 수 있습니다. 시작하려면 리포지토리를 복제합니다.

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

리포지토리에는 Kubernetes 클러스터 내에서 실행되도록 미리 설정된 다중 서비스 Java 애플리케이션이 포함되어 있습니다. 본 샘플 앱은 REST API를 갖춘 기본 노트 앱으로 데이터를 추가 및 변경합니다. Kubernetes 파드(pod) 컨테이너를 만드는 데 필요한 `docker-compose` YAML 파일은 `docker` 디렉토리에 있습니다. 이 튜토리얼에서는 애플리케이션의 컨테이너를 빌드하는 `service-docker-compose-k8s.yaml` 파일을 사용합니다.

`notes` 및 `calendar` 디렉토리에는 Maven 또는 Gradle로 애플리케이션을 빌드하는 두 세트의 Dockerfile이 있습니다. 이 튜토리얼에서는 Maven 빌드를 사용하지만, Gradle에 더 익숙하다면 해당 빌드 명령의 변경 사항을 사용하여 Maven 빌드를 사용할 수 있습니다.

`notes` 앱용 Kubernetes 설정 파일, `calendar` 앱, Datadog Agent 파일은 `Kubernetes` 디렉토리에 있습니다.

샘플 애플리케이션을 가져오는 프로세스에는 `docker` 폴더에서 이미지를 빌드하고, 이를 레지스트리에 업로드한 다음, `kubernetes` 폴더에서 Kubernetes 리소스를 생성하는 작업이 포함됩니다.

### 클러스터 시작하기

재사용하려는 EKS 클러스터가 아직 없는 경우 다음 명령을 실행하여 `<CLUSTER_NAME>`을 사용하려는 이름으로 바꾸어 클러스터를 만듭니다.

{{< code-block lang="sh" >}}
eksctl create cluster --name <CLUSTER_NAME>{{< /code-block >}}

이렇게 하면 포드를 배포할 수 있는 관리형 노드 그룹이 있는 EKS 클러스터가 생성됩니다. 문제 해결 및 설정에 관한 자세한 내용은 [클러스터 생성과 관련한 eksctl 설명서][16]를 참조하세요. 다른 방법(예: AWS 웹 콘솔)으로 생성한 클러스터를 사용하는 경우, eksctl 설명서에 설명된 대로 클러스터가 로컬 `kubeconfig` 파일에 연결되어 있는지 확인합니다.

클러스터를 만드는 데 15~20분 정도 걸릴 수 있습니다. 클러스터 생성이 완료될 때까지 기다리는 동안 다른 단계를 계속 진행하세요.

### 애플리케이션 이미지 빌드 및 업로드

EKS 이미지용 레지스트리인 Amazon ECR에 익숙하지 않다면 [AWS CLI로 Amazon ECR 사용하기][17]를 읽어보는 것이 도움이 될 수 있습니다.

샘플 프로젝트 `/docker` 디렉토리에서 다음 명령을 실행합니다.

1. 다음 명령에 사용자 이름과 비밀번호를 입력하여 ECR에 인증합니다.
   {{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>{{< /code-block >}}

2. 샘플 앱에 대한 Docker 이미지를 빌드하고 플랫폼 설정을 사용자 설정에 맞게 조정합니다.
   {{< code-block lang="sh" >}}
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build notes{{< /code-block >}}

3. 컨테이너에 ECR 대상 태그를 지정합니다.
   {{< code-block lang="sh" >}}
docker tag docker-notes:latest <ECR_REGISTRY_URL>:notes{{< /code-block >}}

4. 컨테이너를 ECR 레지스트리에 업로드합니다.
   {{< code-block lang="sh" >}}
docker push <ECR_REGISTRY_URL>:notes{{< /code-block >}}

애플리케이션은 컨테이너화되어 있으며 EKS 클러스터에서 가져올 수 있습니다.

### AWS 클러스터 인바운드 보안 정책 업데이트

샘플 애플리케이션과 통신하려면 포트 `30080` 및 `30090`가 열려 있는 상태에서 클러스터의 보안 규칙이 설정되어 있는지 확인하세요.

1. AWS 콘솔을 열고 EKS 서비스 내에서 배포된 클러스터로 이동합니다.

2. 클러스터 콘솔에서 네트워킹 탭을 선택하고 클러스터 보안 그룹을 클릭합니다.

3. 보안 그룹 설정에서 인바운드 규칙을 편집합니다. 사용자 지정 TCP 트래픽을 허용하는 규칙을 추가합니다. 이때 포트 범위는 `30060`~`30100`로 설정하고 `0.0.0.0/0`을 소스로 추가합니다. 

4. 규칙을 저장합니다.

### 로컬에서 애플리케이션을 설정하고 배포

1. `kubernetes/notes-app.yaml`을 열고 위에서 컨테이너를 푸시한 ECR 이미지의 URL을 사용하여 `image` 항목을 업데이트합니다.
   {{< code-block lang="yaml" >}}
    spec:
      containers:
        - name: notes-app
          image: <ECR_REGISTRY_URL>:notes
          imagePullPolicy: Always
{{< /code-block >}}

2. `/Kubernetes` 디렉토리에서 다음 명령을 실행하여 `notes` 앱을 배포합니다.
   {{< code-block lang="sh" >}}
kubectl create -f notes-app.yaml{{< /code-block >}}

3. 앱을 실행하려면 REST API를 호출할 외부 IP 주소를 찾아야 합니다. 먼저 다음 명령으로 출력되는 목록에서 `notes-app-deploy` 파드를 찾아 해당 노드를 기록합니다.

   {{< code-block lang="sh" >}}
kubectl get pods -o wide{{< /code-block >}}

   {{< img src="tracing/guide/tutorials/tutorial-java-eks-pods.png" alt="notes-app-deploy 파드와 연결된 노드 이름을 표시하는 kubectle 명령 출력" style="width:100%;" >}}

   다음 명령의 출력에서 해당 노드 이름을 찾아 외부 IP 값을 확인합니다.

      {{< code-block lang="sh" >}}
kubectl get nodes -o wide{{< /code-block >}}

   {{< img src="tracing/guide/tutorials/tutorial-java-eks-external-ip.png" alt="노드의 외부 IP 값을 표시하는 kubectl 명령 출력" style="width:100%;" >}}

   표시된 예제에서 `notes-app`은 외부 IP가 `34.230.7.210`인 노드 `ip-192-189-63-129.ec2.internal`에서 실행 중입니다.

3. 다른 터미널을 열고 앱을 실행하기 위한 API 요청을 보냅니다. 노트 애플리케이션은 데이터를 동일한 컨테이너에서 실행 중인 인메모리 H2 데이터베이스에 저장하는 REST API입니다. 다음과 같이 몇 가지 명령을 보내세요. 

`curl '<EXTERNAL_IP>:30080/notes'`
: `[]`

`curl -X POST '<EXTERNAL_IP>:30080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes?id=1'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes'`
: `[{"id":1,"description":"hello"}]`

4. 애플리케이션 실행을 확인한 후 추적을 활성화할 수 있도록 중단합니다.
   {{< code-block lang="sh" >}}
kubectl delete -f notes-app.yaml{{< /code-block >}}

## 추적 활성화

이제 Java 애플리케이션이 작동하므로 추적을 활성화하도록 구성하면 됩니다.

1. 프로젝트에 자바 추적 패키지를 추가합니다. Agent는 EKS 클러스터에서 실행되므로 Dockerfile이 제대로 설정되었는지 확인합니다. 아무것도 설치할 필요가 없습니다. `notes/dockerfile.notes.maven` 파일을 열고 `dd-java-agent`를 다운로드하는 줄의 주석 처리를 해제합니다.

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. 같은 `notes/dockerfile.notes.maven` 파일 내에서 추적 없이 실행할 `ENTRYPOINT` 줄을 주석 처리합니다. 그런 다음 추적 기능을 활성화하여 애플리케이션을 실행하는 `ENTRYPOINT` 줄의 주석 처리를 제거합니다.

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   자동으로 Datadog 서비스를 포함하는 애플리케이션을 계측합니다.

   <div class="alert alert-danger"><strong>참고</strong>: 이 샘플 명령의 플래그, 특히 샘플 속도는 이 튜토리얼이 적용되지 않은 환경에는 적합하지 않을 수 있습니다. 실제 환경에서 어떤 플래그를 사용해야 하는지에 대해 살펴보려면 <a href="#tracing-configuration">추적 설정</a>을 참고하세요.</div>

3. [Universal Service Tags][10]는 다양한 버전 및 배포 환경에서 추적된 서비스를 식별하여 Datadog 내에서 상관 관계를 분석하고 검색 및 필터링에 사용할 수 있도록 합니다. Unified Service Tagging에 사용되는 세 가지 환경 변수는 `DD_SERVICE`, `DD_ENV`, `DD_VERSION`입니다. Kubernetes로 배포된 애플리케이션의 경우, 이러한 환경 변수는 배포 YAML 파일 내, 특히 배포 오브젝트, 파드(Pod) 사양, 파드(Pod) 컨테이너 템플릿에 추가할 수 있습니다.

   이 튜토리얼의 경우, `Kubernetes/notes-app.yaml` 파일에는 이미 배포 오브젝트, 포드(Pod) 사양 및 포드(Pod)  컨테이너 템플릿에 대한 노트 애플리케이션 환경 변수가 정의되어 있습니다. 다음은 그 예시입니다.

   ```yaml
   ...
   spec:
     replicas: 1
     selector:
       matchLabels:
         name: notes-app-pod
         app: java-tutorial-app
     template:
       metadata:
         name: notes-app-pod
         labels:
           name: notes-app-pod
           app: java-tutorial-app
           tags.datadoghq.com/env: "dev"
           tags.datadoghq.com/service: "notes"
           tags.datadoghq.com/version: "0.0.1"
      ...
   ```

### 애플리케이션 이미지를 다시 빌드한 후 업로드

이전과 동일한 단계](#build-and-upload-the-application-image)를 사용하여 추적을 활성화한 상태로 이미지를 다시 빌드합니다.
{{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build notes
docker tag docker-notes:latest <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:notes{{< /code-block >}}

추적이 활성화된 애플리케이션은 컨테이너화되어 EKS 클러스터에서 가져올 수 있습니다.

## Helm으로 Agent 설치 및 실행

그런 다음 Agent를 EKS에 배포하여 계측된 애플리케이션에서 트레이스 데이터를 수집합니다.

1. `Kubernetes/Datadog-values.yaml`을 열어 GKE에서 Agent 및 APM에 필요한 최소 설정을 확인합니다. 이 설정 파일은 다음에 실행하는 명령에 사용됩니다.

2. `/Kubernetes` 디렉토리에서 API 키와 클러스터 이름을 입력하여 다음 명령을 실행합니다.
   {{< code-block lang="sh" >}}
helm upgrade -f datadog-values.yaml --install --debug latest --set datadog.apiKey=<DD_API_KEY> --set datadog.clusterName=<CLUSTER_NAME> --set datadog.site=datadoghq.com datadog/datadog{{< /code-block >}}

   API 키를 노출하지 않는 보다 안전한 배포에 대해서는 [시크릿 사용에 대한 본 지침][18]를 참조하세요. 아울러, `us1` 외의 [Datadog 사이트][6]를 사용하는 경우 `datadoghq.com`를 해당 사이트로 변경하세요.

## 앱을 시작해 자동 추적을 확인합니다.

[이전과 동일한 단계](#configure-the-application-locally-and-deploy)에 따라 `notes` 앱을 `kubectl create -f notes-app.yaml`을 통해 배포하고 해당 앱이 실행되는 노드의 외부 IP 주소를 확인합니다.

몇 가지 Curl 명령을 실행하여 앱을 실행합니다.

`curl '<EXTERNAL_IP>:30080/notes'`
: `[]`

`curl -X POST '<EXTERNAL_IP>:30080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes?id=1'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes'`
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

다음 단계에서는 빌드 스크립트를 수정하여 Java 추적 라이브러리를 다운로드하고, 코드에 몇 가지 주석을 추가하여 몇 가지 샘플 메서드를 추적하는 방법을 알아봅니다.

1. 현재 애플리케이션 배포를 삭제합니다.
   {{< code-block lang="sh" >}}
kubectl delete -f notes-app.yaml{{< /code-block >}}

2. `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java`를 엽니다. 이 예제에는 주석 처리된 코드가 포함되어 있으며, 코드에서 커스텀 추적을 설정하는 다양한 방법을 보여줍니다.

3. 수동 추적을 지원하기 위해 라이브러리를 가져오는 줄의 주석 처리를 제거합니다.

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

4. 두 개의 공개 프로세스를 수동으로 추적하는 줄의 주석 처리를 제거합니다. 이는 트레이스에서 `@Trace` 어노테이션을 사용하여 `operationName` 및 `resourceName`을 지정하는 방법을 보여줍니다.
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

5. 애플리케이션의 특정 코드 블록에 대해 별도의 스팬을 생성할 수도 있습니다. 스팬 내에 서비스 및 리소스 이름 태그와 오류 처리 태그를 추가합니다. 이러한 태그를 추가하면 Datadog 시각화에서 스팬과 메트릭을 보여주는 플레임 그래프가 생성됩니다. 프라이빗 메서드를 수동으로 추적하는 줄의 주석 처리를 제거합니다.

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

6. 수동 추적을 위한 종속성을 구성하는 `notes/pom.xml` 줄을 열고 주석 처리를 제거하여 Maven 빌드를 업데이트하세요. `dd-trace-api` 라이브러리는 `@Trace` 어노테이션에 사용되고, `opentracing-util` 와 `opentracing-api`는 수동 스팬 생성에 사용됩니다.

7. 애플리케이션을 다시 빌드하고 다음 명령을 실행하여 [이전과 동일한 단계](#build-and-upload-the-application-image)에 따라 ECR에 업로드합니다.

   {{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build notes
docker tag docker-notes:latest <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:notes
{{< /code-block >}}

8. [이전과 동일한 단계](#configure-the-application-locally-and-deploy)에 따라 `notes` 앱을 `kubectl create -f notes-app.yaml`을 통해 배포하고 해당 앱이 실행되는 노드의 외부 IP 주소를 확인합니다.

9. 일부 HTTP 요청, 특히 `GET` 요청을 다시 전송합니다.
10. 트레이스 탐색기에서 새로운 `GET` 요청 중 하나를 클릭한 다음 이와 같은 불꽃 그래프를 확인하세요.

    {{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="커스텀 계측이 포함된 GET 추적에 대한 플레임 그래프." style="width:100%;" >}}

    `getAll` 함수가 커스텀 추적을 포함하므로 스택 트레이스(stack trace)에서 상위 수준의 상세 정보를 확인할 수 있습니다.

    수동 스팬(span)을 생성한 `privateMethod`는 다른 호출과 별도의 블록으로 표시되며 다른 색상으로 강조 표시됩니다.`@Trace` 어노테이션을 사용한 다른 메서드는 `GET` 요청(`notes` 애플리케이션)과 동일한 서비스와 색상으로 표시됩니다. 커스텀 계측은 코드의 핵심 부분을 강조 표시하고 모니터링해야 할 때 유용합니다.

자세한 정보는 [커스텀 계측][12]을 참조하세요.

## 두 번째 애플리케이션을 추가해 분산된 트레이스를 확인하세요.

단일 애플리케이션 추적은 좋은 시작이지만 추적의 진정한 가치는 서비스를 통한 요청의 흐름을 확인하는 데 있습니다. 이것을 _분산 추적_이라고 부릅니다.

샘플 프로젝트에 `calendar`라는 두 번째 애플리케이션이 포함되어 있습니다. 이 애플리케이션은 호출 시 임의의 날짜를 반환합니다. 메모 애플리케이션의 `POST` 엔드포인트는 `add_date`라는 두 번째 쿼리 파라미터를 포함합니다. `y`로 설정되어 있는 경우 메모는 캘린더 애플리케이션을 호출하여 메모에 추가할 날짜를 가져옵니다.

1. 이전에 메모 앱에서 했던 작업과 마찬가지로, `dd-java-agent`을 Dockerfile의 시작 명령에 추가하여 캘린더 앱을 설정합니다. `calendar/dockerfile.calendar.maven`를 열고 `dd-java-agent`를 다운로드하는지 확인합니다.

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. 같은 `calendar/dockerfile.calendar.maven` 파일 내에서 추적 없이 실행할 `ENTRYPOINT` 줄을 주석 처리합니다. 그런 다음 추적 기능을 활성화하여 애플리케이션을 실행하는 `ENTRYPOINT` 줄의 주석 처리를 제거합니다.

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   <div class="alert alert-danger"><strong>참고</strong>: 이 플래그, 특히 샘플 속도는 이 튜토리얼이 적용되지 않은 환경에는 적합하지 않을 수 있음을 다시 강조합니다. 실제 환경에서 어떤 플래그를 사용해야 하는지에 살펴보려면 <a href="#tracing-configuration">추적 설정</a>을 참고하세요.</div>

3. 두 애플리케이션을 모두 빌드하고 ECR에 게시합니다. `docker` 디렉터리에서 실행합니다.
   {{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build calendar
docker tag docker-calendar:latest <ECR_REGISTRY_URL>:calendar
docker push <ECR_REGISTRY_URL>:calendar
{{< /code-block >}}

4. `kubernetes/calendar-app.yaml`을 열고 이전 단계에서 `calendar` 앱을 푸시한 ECR 이미지의 URL을 사용해 `image` 항목을 업데이트합니다.
   {{< code-block lang="yaml" >}}
    spec:
      containers:
        - name: calendar-app
          image: <ECR_REGISTRY_URL>:calendar
          imagePullPolicy: Always
{{< /code-block >}}

5. 이제 커스텀 계측 기능이 포함된 `notes` 및 `calendar` 앱을 모두 클러스터에 배포합니다.
   {{< code-block lang="sh" >}}
kubectl create -f notes-app.yaml
kubectl create -f calendar-app.yaml{{< /code-block >}}

6. 이전에 사용한 방법로 `notes` 앱의 외부 IP를 찾습니다.

7. `add_date` 파라미터를 사용하여 POST 요청을 보냅니다.

`curl -X POST '<EXTERNAL_IP>:30080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`

8. 트레이스 탐색기에서 다음 최신 트레이스를 클릭하여 두 서비스 간의 분산 트레이스를 확인하세요.

   {{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="분산 추적을 보여주는 플레임 그래프" style="width:100%;" >}}

   `notes` 애플리케이션에서는 아무것도 변경하지 않았습니다. Datadog은 `notes`에서 `calendar`로의 HTTP 호출에 사용되는 `okHttp`라이브러리와 `notes` 및 `calendar`에서 HTTP 요청을 수신하는 데 사용되는 Jetty 라이브러리를 모두 자동으로 계측합니다. 이를 통해 트레이스 정보를 한 애플리케이션에서 다른 애플리케이션으로 전달하여 분산 트레이스를 캡처할 수 있습니다.

9. 탐색이 끝나면 모든 리소스를 정리하고 배포를 삭제하세요.
   {{< code-block lang="sh" >}}
kubectl delete -f notes-app.yaml
kubectl delete -f calendar-app.yaml{{< /code-block >}}

   클러스터 삭제와 관련된 자세한 내용은 [EKS 설명서][19]를 참조하세요.

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
[16]: https://eksctl.io/usage/creating-and-managing-clusters/
[17]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html
[18]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#create-and-provide-a-secret-that-contains-your-datadog-api-and-app-keys
[19]: https://docs.aws.amazon.com/eks/latest/userguide/delete-cluster.html