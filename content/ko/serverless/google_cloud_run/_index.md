---
further_reading:
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: 블로그
  text: Cloud Run 서비스에서 트레이스, 로그, 커스텀 메트릭 수집
title: Google Cloud Run
---

## 개요

Google Cloud Run은 컨테이너 기반 애플리케이션을 배포하고 확장하기 위한 완전 관리형 서버리스 플랫폼입니다. Datadog은 [Google Cloud 통합][1]을 통해 Cloud Run에 대한 모니터링 및 로그 수집을 제공합니다.

<div class="alert alert-info"><code>serverless-init</code>를 사용하여 Google Cloud Run 애플리케이션을 계측하려면 <a href="/serverless/guide/gcr_serverless_init">serverless-init를 사용하여 Google Cloud Run 계측</a> 문서를 참조하세요.</div>

## 설정

### 애플리케이션

{{< tabs >}}
{{% tab "Node.js" %}}
#### 추적

메인 애플리케이션에서 `dd-trace-js` 라이브러리를 추가합니다. 자세한 방법은 [Node.js 애플리케이션 추적][1]을 참조하세요.

`ENV NODE_OPTIONS="--require dd-trace/init"`을 설정합니다. 이는 Node.js 프로세스가 시작될 때 `dd-trace/init` 모듈이 필요함을 명시합니다.

#### 메트릭
추적 라이브러리는 커스텀 메트릭도 수집합니다. [코드 예시][2]를 참조하세요.

#### 로그
Datadog 사이드카는 공유 볼륨을 통해 로그를 수집합니다. 메인 컨테이너의 로그를 사이드카로 전달하려면 아래 단계를 사용하여 모든 로그를 `shared-volume/logs/*.log`와 같은 특정 위치에 쓰도록 애플리케이션을 구성합니다. 메인 컨테이너와 사이드카 컨테이너 모두에 환경 변수 `DD_SERVERLESS_LOG_PATH`와 공유 볼륨 마운트를 추가하려면 GCP UI의 설정을 따라야 합니다. YAML 또는 Terraform을 사용하여 배포하기로 결정한 경우 환경 변수, 상태 점검 및 볼륨 마운트는 이미 추가되어 있습니다.

애플리케이션에서 로깅을 설정하려면 [Node.js 로그 수집][3]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Node.js 로그와 트레이스 상관관계][4]를 참조하세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /ko/logs/log_collection/nodejs/?tab=winston30
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/nodejs

{{% /tab %}}
{{% tab "Python" %}}
#### 추적

메인 애플리케이션에서 `dd-trace-py` 라이브러리를 추가합니다. 자세한 방법은 [Python 애플리케이션 추적][1]을 참조하세요. [튜토리얼 - 컨테이너에서 Python 애플리케이션 및 Datadog Agent에 대한 추적 활성화][5]를 참고할 수도 있습니다.

#### 메트릭
추적 라이브러리는 커스텀 메트릭도 수집합니다. [코드 예시][2]를 참조하세요.

#### 로그
Datadog 사이드카는 공유 볼륨을 통해 로그를 수집합니다. 메인 컨테이너의 로그를 사이드카로 전달하려면 아래 단계를 사용하여 모든 로그를 `shared-volume/logs/*.log`와 같은 특정 위치에 쓰도록 애플리케이션을 구성합니다. 메인 컨테이너와 사이드카 컨테이너 모두에 환경 변수 `DD_SERVERLESS_LOG_PATH`와 공유 볼륨 마운트를 추가하려면 GCP UI의 설정을 따라야 합니다. YAML 또는 Terraform을 사용하여 배포하기로 결정한 경우 환경 변수, 상태 점검 및 볼륨 마운트는 이미 추가되어 있습니다.

애플리케이션에서 로깅을 설정하려면 [Python 로그 수집][3]을 참조하세요. [Python 로깅 모범 사례][6]도 도움이 될 수 있습니다. 트레이스 로그 상관관계를 설정하려면 [Python 로그와 트레이스 상관관계][4]를 참조하세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /ko/logs/log_collection/python
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/python
[5]: /ko/tracing/guide/tutorial-enable-python-containers/
[6]: https://www.datadoghq.com/blog/python-logging-best-practices/

{{% /tab %}}
{{% tab "Java" %}}
#### 추적

메인 애플리케이션에서 `dd-trace-java` 라이브러리를 추가합니다. [Java 애플리케이션 추적][1]을 따르거나 다음 Dockerfile 예시를 사용하여 자동 계측으로 추적 라이브러리를 추가하고 시작합니다.

```dockerfile
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY target/cloudrun-java-1.jar cloudrun-java-1.jar


# Datadog 트레이서를 추가합니다.
ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar


EXPOSE 8080


# javaagent 인수를 사용하여 Datadog 트레이서를 시작합니다.
ENTRYPOINT [ "java", "-javaagent:dd-java-agent.jar", "-jar", "cloudrun-java-1.jar" ]
```

#### 메트릭
커스텀 메트릭을 수집하려면 [Java DogStatsD 클라이언트를 설치][2]하세요.

#### 로그
Datadog 사이드카는 공유 볼륨을 통해 로그를 수집합니다. 메인 컨테이너의 로그를 사이드카로 전달하려면 아래 단계를 사용하여 모든 로그를 `shared-volume/logs/*.log`와 같은 특정 위치에 쓰도록 애플리케이션을 구성합니다. 메인 컨테이너와 사이드카 컨테이너 모두에 환경 변수 `DD_SERVERLESS_LOG_PATH`와 공유 볼륨 마운트를 추가하려면 GCP UI의 설정을 따라야 합니다. YAML 또는 Terraform을 사용하여 배포하기로 결정한 경우 환경 변수, 상태 점검 및 볼륨 마운트는 이미 추가되어 있습니다.

애플리케이션에서 로깅을 설정하려면 [Java 로그 수집][3]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Java 로그와 트레이스 상관관계][4]를 참조하세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[2]: /ko/developers/dogstatsd/?tab=hostagent&code-lang=java#install-the-dogstatsd-client
[3]: /ko/logs/log_collection/java/?tab=winston30
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/java

{{% /tab %}}
{{% tab "Go" %}}
#### 추적

메인 애플리케이션에서 `dd-trace-go` 라이브러리를 추가합니다. 자세한 방법은 [Go 애플리케이션 추적][1]을 참조하세요.

#### 메트릭
추적 라이브러리는 커스텀 메트릭도 수집합니다. [코드 예시][2]를 참조하세요.

#### 로그
Datadog 사이드카는 공유 볼륨을 통해 로그를 수집합니다. 메인 컨테이너의 로그를 사이드카로 전달하려면 아래 단계를 사용하여 모든 로그를 `shared-volume/logs/*.log`와 같은 특정 위치에 쓰도록 애플리케이션을 구성합니다. 메인 컨테이너와 사이드카 컨테이너 모두에 환경 변수 `DD_SERVERLESS_LOG_PATH`와 공유 볼륨 마운트를 추가하려면 GCP UI의 설정을 따라야 합니다. YAML 또는 Terraform을 사용하여 배포하기로 결정한 경우 환경 변수, 상태 점검 및 볼륨 마운트는 이미 추가되어 있습니다.

애플리케이션에서 로깅을 설정하려면 [Go 로그 수집][3]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Go 로그와 트레이스 상관관계][4]를 참조하세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /ko/logs/log_collection/go
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab ".NET" %}}
#### 추적

메인 애플리케이션에서 .NET 추적 라이브러리를 추가합니다. 자세한 방법은 [.NET 애플리케이션 추적][1]을 참조하세요.

Dockerfile 예시:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0-jammy
WORKDIR /app
COPY ./bin/Release/net8.0/publish /app

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.56.0/datadog-dotnet-apm_2.56.0_amd64.deb /opt/datadog/datadog-dotnet-apm_2.56.0_amd64.deb
RUN dpkg -i /opt/datadog/datadog-dotnet-apm_2.56.0_amd64.deb
RUN mkdir -p /shared-volume/logs/

ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_DOTNET_TRACER_HOME=/opt/datadog/

ENV DD_TRACE_DEBUG=true

ENTRYPOINT ["dotnet", "dotnet.dll"]
```

#### 메트릭
추적 라이브러리는 커스텀 메트릭도 수집합니다. [코드 예시][2]를 참조하세요.

#### 로그
Datadog 사이드카는 공유 볼륨을 통해 로그를 수집합니다. 메인 컨테이너의 로그를 사이드카로 전달하려면 아래 단계를 사용하여 모든 로그를 `shared-volume/logs/*.log`와 같은 특정 위치에 쓰도록 애플리케이션을 구성합니다. 메인 컨테이너와 사이드카 컨테이너 모두에 환경 변수 `DD_SERVERLESS_LOG_PATH`와 공유 볼륨 마운트를 추가하려면 GCP UI의 설정을 따라야 합니다. YAML 또는 Terraform을 사용하여 배포하기로 결정한 경우 환경 변수, 상태 점검 및 볼륨 마운트는 이미 추가되어 있습니다.

애플리케이션에서 로깅을 설정하려면 [C#로그 수집][3]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [.NET 로그와 트레이스 상관관계][4]를 참조하세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux#enable-the-tracer-for-your-service
[2]: https://www.datadoghq.com/blog/statsd-for-net-dogstatsd/
[3]: /ko/log_collection/csharp/?tab=serilog
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/dotnet/?tab=serilog
{{% /tab %}}
{{% tab "PHP" %}}
메인 애플리케이션에서 `dd-trace-php` 라이브러리를 추가하세요. 자세한 방법은 [PHP 애플리케이션 추적][1]을 참조하세요.

#### 메트릭
추적 라이브러리는 커스텀 메트릭도 수집합니다. [코드 예시][2]를 참조하세요.

#### 로그
Datadog 사이드카는 공유 볼륨을 통해 로그를 수집합니다. 메인 컨테이너의 로그를 사이드카로 전달하려면 아래 단계를 사용하여 모든 로그를 `shared-volume/logs/*.log`와 같은 특정 위치에 쓰도록 애플리케이션을 구성합니다. 메인 컨테이너와 사이드카 컨테이너 모두에 환경 변수 `DD_SERVERLESS_LOG_PATH`와 공유 볼륨 마운트를 추가하려면 GCP UI의 설정을 따라야 합니다. YAML 또는 Terraform을 사용하여 배포하기로 결정한 경우 환경 변수, 상태 점검 및 볼륨 마운트는 이미 추가되어 있습니다.

애플리케이션에서 로그인을 설정하려면 [PHP 로그 수집][3]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [PHP 로그와 트레이스 상관관계][4]를 참조하세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /ko/logs/log_collection/php
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### 컨테이너
{{< tabs >}}
{{% tab "GCR UI" %}}

#### 사이트카 컨테이너

1. Cloud Run에서  **Edit & Deploy New Revision**을 선택합니다.
1. 페이지 하단에서 **Add Container**를 선택합니다.
1. **Container image URL**에 대해 `gcr.io/datadoghq/serverless-init:latest`를 선택합니다.
1. **Volume Mounts**로 이동하여 로그에 대한 볼륨 마운트를 설정합니다. 마운트 경로가 애플리케이션의 쓰기 위치와 일치하는지 확인합니다. 예를 들면 다음과 같습니다.
   {{< img src="serverless/gcr/volume_mount.png" width="80%" alt="Volume Mounts 탭. Mounted volumes에서 Volume Mount 1입니다. Name 1에 대해서는 'shared-logs (In-Memory)'가 선택되어 있으며, Mount path 1에 대해서는 '/shared-volume'가 선택되어 있습니다.">}}
1. **Settings**로 이동해 시작 점검을 추가합니다.
   - **상태 점검 유형을 선택합니다**: Startup check
   - **프로브 유형을 선택합니다**: TCP
   - **포트**: 포트 번호를 입력합니다. 다음 단계에서 사용됩니다.
1. **Variables & Secrets**로 이동하여 다음 환경 변수를 이름-값 쌍으로 추가합니다.
   - `DD_SERVICE`: 서비스 이름. 예: `gcr-sidecar-test`
   - `DD_ENV`: 환경 이름. 예: `dev`
   - `DD_SERVERLESS_LOG_PATH`: 로그 경로. 예: `/shared-volume/logs/*.log`.
   - `DD_API_KEY`: [Datadog API 키][1].
   - `DD_HEALTH_PORT`: 이전 단계에서 시작 점검을 위해 선택한 포트.

   추가 태그를 포함한 모든 환경 변수 목록은 [환경 변수](#environment-variables)를 참조하세요.

#### 메인 컨테이너

1. **Volume Mounts**로 이동하여 사이드카 컨테이너에 했던 것과 동일한 공유 볼륨을 추가합니다.
   **참고**: **Done**을 선택하여 변경 사항을 저장합니다. 마지막 단계가 될 때까지 변경 사항을 배포하지 마세요.
1. **Variables & Secrets**로 이동하여 사이드카 컨테이너에 설정한 것과 동일한 `DD_SERVICE` 환경 변수를 추가합니다.
1. **Settings**로 이동한 후 **Container start up order** 드롭다운 메뉴에서 사이드카를 선택합니다.
1. 메인 애플리케이션을 배포하세요.

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "YAML 배포" %}}
YAML 서비스 사양으로 Cloud Run 서비스를 배포하려면 다음 예시 구성 파일을 사용하세요. 이 예에서는 환경 변수, 시작 상태 점검 및 볼륨 마운트가 이미 추가되었습니다. 로그를 활성화하지 않으려면 공유 볼륨을 제거하세요. 메인 컨테이너의 컨테이너 포트가 Dockerfile/서비스에 노출된 포트와 동일한지 확인하세요.

1. 다음을 포함하는 YAML 파일을 만듭니다.

   ```yaml
   apiVersion: serving.knative.dev/v1
   kind: Service
   metadata:
     name: '<SERVICE_NAME>'
     labels:
       cloud.googleapis.com/location: '<LOCATION>'
   spec:
     template:
       metadata:
         annotations:
           autoscaling.knative.dev/maxScale: '100' # The maximum number of instances that can be created for this service. https://cloud.google.com/run/docs/reference/rest/v1/RevisionTemplate
           run.googleapis.com/container-dependencies: '{"run-sidecar-1":["serverless-init-1"]}' # Configure container start order for sidecar deployments https://cloud.google.com/run/docs/configuring/services/containers#container-ordering
           run.googleapis.com/startup-cpu-boost: 'true' # The startup CPU boost feature for revisions provides additional CPU during instance startup time and for 10 seconds after the instance has started. https://cloud.google.com/run/docs/configuring/services/cpu#startup-boost
       spec:
         containers:
           - env:
               - name: DD_SERVICE
                 value: '<SERVICE_NAME>'
             image: '<CONTAINER_IMAGE>'
             name: run-sidecar-1
             ports:
               - containerPort: 8080
                 name: http1
             resources:
               limits:
                 cpu: 1000m
                 memory: 512Mi
             startupProbe:
               failureThreshold: 1
               periodSeconds: 240
               tcpSocket:
                 port: 8080
               timeoutSeconds: 240
             volumeMounts:
               - mountPath: /shared-volume
                 name: shared-volume
           - env:
               - name: DD_SERVERLESS_LOG_PATH
                 value: shared-volume/logs/*.log
               - name: DD_SITE
                 value: datadoghq.com
               - name: DD_ENV
                 value: serverless
               - name: DD_API_KEY
                 value: '<API_KEY>'
               - name: DD_SERVICE
                 value: '<SERVICE_NAME>'
               - name: DD_VERSION
                 value: '<VERSION>'
               - name: DD_LOG_LEVEL
                 value: debug
               - name: DD_LOGS_INJECTION
                 value: 'true'
               - name: DD_HEALTH_PORT
                 value: '12345'
             image: gcr.io/datadoghq/serverless-init:latest
             name: serverless-init-1
             resources:
               limits:
                 cpu: 1000m
                 memory: 512Mi # Can be updated to a higher memory if needed
             startupProbe:
               failureThreshold: 3
               periodSeconds: 10
               tcpSocket:
                 port: 12345
               timeoutSeconds: 1
             volumeMounts:
               - mountPath: /shared-volume
                 name: shared-volume
         volumes:
           - emptyDir:
               medium: Memory
               sizeLimit: 512Mi
             name: shared-volume
     traffic: # make this revision and all future ones serve 100% of the traffic as soon as possible, overriding any established traffic split
       - latestRevision: true
         percent: 100
   ```
   이 예에서는 환경 변수, 시작 상태 점검 및 볼륨 마운트가 이미 추가되었습니다. 로그를 활성화하지 않으려면 공유 볼륨을 제거하세요. 메인 컨테이너의 컨테이너 포트가 Dockerfile/서비스에 노출된 포트와 동일한지 확인하세요.
1. 플레이스홀더 값 제공:
   - `<SERVICE_NAME>`: 서비스 이름. 예: `gcr-sidecar-test` [통합 서비스 태깅][2] 참조.
   - `<LOCATION>`: 서비스를 배포할 지역. 예: `us-central`
   - `<DATADOG_SITE>`: 해당 [Datadog 사이트][3], {{< region-param key="dd_site" code="true" >}}.
   - `<API_KEY>`: [Datadog API 키][1].
   - `<VERSION>`: 배포의 버전 번호. [통합 서비스 태깅][2] 참조.
   - `<CONTAINER_IMAGE>`: Cloud Run에 배포하려는 코드의 이미지. 예:`us-docker.pkg.dev/cloudrun/container/hello`.
   - `<SERVICE_ACCOUNT>`: Google Cloud 서비스 계정 이름

1. 실행:
   ```bash
   gcloud run services replace <FILENAME>.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/getting_started/tagging/unified_service_tagging/
[3]: /ko/getting_started/site/

{{% /tab %}}
{{% tab "Terraform 배포" %}}
Terraform을 사용하여 Cloud Run 서비스를 배포하려면 다음 예시 구성 파일을 사용하세요. 이 예에서는 환경 변수, 시작 상태 점검 및 볼륨 마운트가 이미 추가되었습니다. 로그를 활성화하지 않으려면 공유 볼륨을 제거하세요. 메인 컨테이너의 컨테이너 포트가 Dockerfile/서비스에 노출된 포트와 동일한지 확인하세요. 퍼블릭 액세스를 허용하지 않으려면 IAM 정책 섹션을 제거하세요.

```
provider "google" {
  project = "<PROJECT_ID>"
  region  = "<LOCATION>"  # 예: us-central1
}

resource "google_cloud_run_service" "terraform_with_sidecar" {
  name     = "<SERVICE_NAME>"
  location = "<LOCATION>"

  template {
    metadata {
      annotations = {
        # 올바른 형식의 컨테이너 종속성 주석
        "run.googleapis.com/container-dependencies" = jsonencode({main-app = ["sidecar-container"]})
      }
    }
    spec {
      # 공유 볼륨 정의
      volumes {
        name = "shared-volume"
        empty_dir {
          medium = "Memory"
        }
      }

      # 메인 애플리케이션 컨테이너
      containers {
        name  = "main-app"
        image = "<CONTAINER_IMAGE>"

        # 메인 컨테이너에 대한 포트 노출
        ports {
          container_port = 8080
        }
        # 공유 볼륨 마운트
        volume_mounts {
          name      = "shared-volume"
          mount_path = "/shared-volume"
        }

        # TCP 상태 점검을 위한 Startup 프로브
        startup_probe {
          tcp_socket {
            port = 8080
          }
          initial_delay_seconds = 0  # 프로브 시작 전 지연
          period_seconds        = 10   # 프로브 사이의 시간
          failure_threshold     = 3   # 비정상으로 표시되기 전의 실패 횟수
          timeout_seconds       = 1  # 비정상으로 표시되기 전의 실패 횟수
        }

        # 메인 컨테이너의 환경 변수
        env {
          name  = "DD_SERVICE"
          value = "<SERVICE_NAME>"
        }

        # 메인 컨테이너의 리소스 제한
        resources {
          limits = {
            memory = "512Mi"
            cpu    = "1"
          }
        }
      }

      # 사이드카 컨테이너
      containers {
        name  = "sidecar-container"
        image = "gcr.io/datadoghq/serverless-init:latest"

        # 공유 볼륨 마운트
        volume_mounts {
          name      = "shared-volume"
          mount_path = "/shared-volume"
        }

        # TCP 상태 점검을 위한 시작 프로브
        startup_probe {
          tcp_socket {
            port = 12345
          }
          initial_delay_seconds = 0  # 프로브 시작 전 지연
          period_seconds        = 10   # 프로브 사이의 시간
          failure_threshold     = 3   # 비정상으로 표시되기 전의 실패 횟수
          timeout_seconds       = 1
        }

        # 사이드카 컨테이너의 환경 변수
        env {
          name  = "DD_SITE"
          value = "<DATADOG_SITE>"
        }
        env {
          name  = "DD_SERVERLESS_LOG_PATH"
          value = "shared-volume/logs/*.log"
        }
        env {
          name  = "DD_ENV"
          value = "serverless"
        }
        env {
          name  = "DD_API_KEY"
          value = "<API_KEY>"
        }
        env {
          name  = "DD_SERVICE"
          value = "<SERVICE_NAME>"
        }
        env {
          name  = "DD_VERSION"
          value = "<VERSION>"
        }
        env {
          name  = "DD_LOG_LEVEL"
          value = "debug"
        }
        env {
          name  = "DD_LOGS_INJECTION"
          value = "true"
        }
        env {
          name  = "DD_HEALTH_PORT"
          value = "12345"
        }

        # 사이드카의 리소스 제한
        resources {
          limits = {
            memory = "512Mi"
            cpu    = "1"
          }
        }
      }
    }
  }

  # 트래픽 분할 정의
  traffic {
    percent         = 100
    latest_revision = true
  }
}

# 공개 액세스를 허용하는 IAM 구성원(선택 사항, 필요에 따라 조정)
resource "google_cloud_run_service_iam_member" "invoker" {
  service  = google_cloud_run_service.terraform_with_sidecar.name
  location = google_cloud_run_service.terraform_with_sidecar.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
```

플레이스홀더 값 제공:
- `<PROJECT_ID>`: Google Cloud 프로젝트 ID.
- `<LOCATION>`: 서비스를 배포할 지역. 예: `us-central1`
- `<SERVICE_NAME>`: 서비스 이름. 예: `gcr-sidecar-test` [통합 서비스 태깅][2] 참조.
- `<CONTAINER_IMAGE>`: Cloud Run에 배포하려는 코드의 이미지.
- `<DATADOG_SITE>`: 해당 [Datadog 사이트][3], {{< region-param key="dd_site" code="true" >}}.
- `<API_KEY>`: [Datadog API 키][1].
- `<VERSION>`: 배포의 버전 번호. [통합 서비스 태깅][2] 참조.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/getting_started/tagging/unified_service_tagging/
[3]: /ko/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## 환경 변수

| 변수 | 설명 |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API 키][4] - **필수**|
| `DD_SITE` | [Datadog 사이트][5] - **필수** |
| `DD_LOGS_INJECTION`| true인 경우 [Java][6], [Node][7], [.NET][8] 및 [PHP][9]에서 지원되는 로거에 대한 추적 데이터로 모든 로그를 보강합니다. [Python][10], [Go][11] 및 [Ruby][12]에 대한 문서도 참조하세요. |
| `DD_SERVICE`      | [통합 서비스 태깅][13]을 참조하세요.                                  |
| `DD_VERSION`      | [통합 서비스 태깅][13]을 참조하세요.                                  |
| `DD_ENV`          | [통합 서비스 태깅][13]을 참조하세요.                                  |
| `DD_SOURCE`       | [통합 서비스 태깅][13]을 참조하세요.                                  |
| `DD_TAGS`         | [통합 서비스 태깅][13]을 참조하세요. |

`DD_LOGS_ENABLED` 환경 변수를 사용하지 마세요. 이 변수는 [serverless-init][14] 설치 방법에만 사용됩니다.

## 애플리케이션 예시

다음 예에는 추적, 메트릭 및 로그가 설정된 단일 앱이 포함되어 있습니다.

{{< tabs >}}
{{% tab "Node.js" %}}

```js
const tracer = require('dd-trace').init({
 logInjection: true,
});
const express = require("express");
const app = express();
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
 level: 'info',
 exitOnError: false,
 format: format.json(),
 transports: [new transports.File({ filename: `/shared-volume/logs/app.log`}),
  ],
});

app.get("/", (_, res) => {
 logger.info("Welcome!");
 res.sendStatus(200);
});

app.get("/hello", (_, res) => {
 logger.info("Hello!");
 metricPrefix = "nodejs-cloudrun";
 // 두 개 이상의 단일 메트릭을 테스트할 수 있도록 3개의 고유 메트릭을 보냅니다.
 metricsToSend = ["sample_metric_1", "sample_metric_2", "sample_metric_3"];
 metricsToSend.forEach((metric) => {
   for (let i = 0; i < 20; i++) {
     tracer.dogstatsd.distribution(`${metricPrefix}.${metric}`, 1);
   }
 });
 res.status(200).json({ msg: "Sending metrics to Datadog" });
});

const port = process.env.PORT || 8080;
app.listen(port);
```

{{% /tab %}}
{{% tab "Python" %}}

### app.py

```python
import ddtrace
from flask import Flask, render_template, request
import logging
from datadog import initialize, statsd

ddtrace.patch(logging=True)
app = Flask(__name__)
options = {
   'statsd_host':'127.0.0.1',
   'statsd_port':8125
}
FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
         '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
         '- %(message)s')
logging.basicConfig(level=logging.DEBUG, filename='app.log', format=FORMAT)
logger = logging.getLogger(__name__)
logger.level = logging.INFO

ddlogs = []

@ddtrace.tracer.wrap(service="dd_gcp_log_forwader")
@app.route('/', methods=["GET"])
def index():
   log = request.args.get("log")
   if log != None:
       with tracer.trace('sending_logs') as span:
           statsd.increment('dd.gcp.logs.sent')
           span.set_tag('logs', 'nina')
           logger.info(log)
           ddlogs.append(log)
   return render_template("home.html", logs=ddlogs)

if __name__ == '__main__':
   tracer.configure(port=8126)
   initialize(**options)
   app.run(debug=True)
```

### Home.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Datadog Test</title>
</head>
<body>
   <h1>Welcome to Datadog!💜</h1>
   <form action="">
       <input type="text" name="log" placeholder="Enter Log">
       <button>Add Log</button>
   </form>
   <h3>Logs Sent to Datadog:</h3>
   <ul>
   {% for log in logs%}
       {% if log %}
       <li>{{ log }}</li>
       {% endif %}
   {% endfor %}
   </ul>
</body>
</html>
```
{{% /tab %}}
{{% tab "Java" %}}

```java
package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

@RestController
public class HelloController {
   Private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").build();
   private static final Log logger = LogFactory.getLog(HelloController.class);
   @GetMapping("/")
   public String index() {
       Statsd.incrementCounter("page.views");
       logger.info("Hello Cloud Run!");
       return "💜 Hello Cloud Run! 💜";
   }
}
```

{{% /tab %}}
{{% tab "Go" %}}
```go
package main


import (
   "fmt"
   "log"
   "net/http"
   "os"
   "path/filepath"


   "github.com/DataDog/datadog-go/v5/statsd"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)


const logDir = "/shared-volume/logs"

var logFile *os.File
var logCounter int
var dogstatsdClient *statsd.Client

func handler(w http.ResponseWriter, r *http.Request) {
   log.Println("Yay!! Main container works")
   span := tracer.StartSpan("maincontainer", tracer.ResourceName("/handler"))
   defer span.Finish()
   logCounter++
   writeLogsToFile(fmt.Sprintf("received request %d", logCounter), span.Context())
   dogstatsdClient.Incr("request.count", []string{"test-tag"}, 1)
}

func writeLogsToFile(log_msg string, context ddtrace.SpanContext) {
   span := tracer.StartSpan(
       "writeLogToFile",
       tracer.ResourceName("/writeLogsToFile"),
       tracer.ChildOf(context))
   defer span.Finish()
   _, err := logFile.WriteString(log_msg + "\n")
   if err != nil {
       log.Println("Error writing to log file:", err)
   }
}

func main() {
   log.Print("Main container started...")

   err := os.MkdirAll(logDir, 0755)
   if err != nil {
       panic(err)
   }
   logFilePath := filepath.Join(logDir, "maincontainer.log")
   log.Println("Saving logs in ", logFilePath)
   logFileLocal, err := os.OpenFile(logFilePath, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
   if err != nil {
       panic(err)
   }
   defer logFileLocal.Close()

   logFile = logFileLocal

   dogstatsdClient, err = statsd.New("localhost:8125")
   if err != nil {
       panic(err)
   }
   defer dogstatsdClient.Close()

   tracer.Start()
   defer tracer.Stop()

   http.HandleFunc("/", handler)
   log.Fatal(http.ListenAndServe(":8080", nil))
}
```
{{% /tab %}}
{{% tab ".NET" %}}
```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Serilog;
using Serilog.Formatting.Json;
using Serilog.Formatting.Compact;
using Serilog.Sinks.File;
using StatsdClient;


namespace dotnet.Pages;


public class IndexModel : PageModel
{
   private readonly static DogStatsdService _dsd;
   static IndexModel()
   {
       var dogstatsdConfig = new StatsdConfig
       {
           StatsdServerName = "127.0.0.1",
           StatsdPort = 8125,
       };


       _dsd = new DogStatsdService();
       _dsd.Configure(dogstatsdConfig);


       Log.Logger = new LoggerConfiguration()
           .WriteTo.File(new RenderedCompactJsonFormatter(), "/shared-volume/logs/app.log")
           .CreateLogger();
   }
   public void OnGet()
   {
       _dsd.Increment("page.views");
       Log.Information("Hello Cloud Run!");
   }
}
```
{{% /tab %}}
{{% tab "PHP" %}}

```php
<?php


require __DIR__ . '/vendor/autoload.php';


use DataDog\DogStatsd;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\JsonFormatter;


$statsd = new DogStatsd(
   array('host' => '127.0.0.1',
         'port' => 8125,
    )
 );


$log = new logger('datadog');
$formatter = new JsonFormatter();


$stream = new StreamHandler('/shared-volume/logs/app.log', Logger::DEBUG);
$stream->setFormatter($formatter);


$log->pushHandler($stream);


$log->info("Hello Datadog!");
echo '💜 Hello Datadog! 💜';


$log->info("sending a metric");
$statsd->increment('page.views', 1, array('environment'=>'dev'));


?>
```

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/integrations/google_cloud_platform/#log-collection
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://hub.docker.com/r/datadog/serverless-init
[4]: /ko/account_management/api-app-keys/#api-keys
[5]: /ko/getting_started/site/
[6]: /ko/tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[7]: /ko/tracing/other_telemetry/connect_logs_and_traces/nodejs
[8]: /ko/tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[9]: /ko/tracing/other_telemetry/connect_logs_and_traces/php
[10]: /ko/tracing/other_telemetry/connect_logs_and_traces/python
[11]: /ko/tracing/other_telemetry/connect_logs_and_traces/go
[12]: /ko/tracing/other_telemetry/connect_logs_and_traces/ruby
[13]: /ko/getting_started/tagging/unified_service_tagging/
[14]: /ko/serverless/guide/gcr_serverless_init