---
further_reading:
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: 블로그
  text: GCR 서비스에서 트레이스, 로그 및 커스텀 메트릭을 수집하세요.
kind: 설명서
title: Google Cloud Run
---

## 개요

Google Cloud Run은 컨테이너 기반 애플리케이션을 구축하고 스케일링하기 위한 완전 관리형 서비스입니다. Datadog는 [Google Cloud 통합][1]을 통해 Cloud Run에 모니터링과 로그 수집을 제공합니다. 또한 Datadog는 현 공개 베타 버전에서 트레이스, 커스텀 메트릭과 직접 로그 수집을 지원하기 위해 특별 설계된 에이전트를 제공하여, Cloud Run 애플리케이션을 구동하기 위한 솔루션을 선보입니다.

  <div class="alert alert-warning">이 기능은 공개 베타 버전입니다. <a href="https://forms.gle/HSiDGnTPvDvbzDAQA">피드백 양식</a>이나 표준 지원 채널을 통해 피드백을 제공할 수 있습니다. 베타 기간 동안에는 직접 비용 없이 Cloud Run 모니터링과 애플리케이션 성능 모니터링(APM) 트레이싱을 사용할 수 있습니다. 기존 APM 고객은 늘어난 스팬 수집과 볼륨 비용을 감당해야 할 수 있습니다. </div>

## 시작하기

### 전제 조건

[Datadog API 키][6]가 있고 [Datadog 트레이싱 라이브러리에서 지원되는][2] 프로그래밍 언어를 사용하고 있는지 확인하세요.

### 1. 에이전트 설치

Dockerfile 또는 빌드팩을 사용하여 에이전트를 설치할 수 있습니다. 빌드팩을 사용하는 경우 [트레이싱 라이브러리](#install-tracing-library)를 먼저 설치해야 합니다.

#### Dockerfile을 사용해 에이전트 설치

{{< programming-lang-wrapper langs="go,python,nodejs,java,dotnet,ruby" >}}
{{< programming-lang lang="go" >}}



Dockerfile에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# this env var is needed for trace propagation to work properly in Cloud Run.
# ensure to set this variable for all Datadog-instrumented downstream services.
ENV DD_TRACE_PROPAGATION_STYLE=datadog

# execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["/path/to/your-go-binary"]
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# install the python tracing library here or in requirements.txt
RUN pip install --no-cache-dir ddtrace==1.7.3

# optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# this env var is needed for trace propagation to work properly in cloud run.
# ensure to set this variable for all Datadog-instrumented downstream services.
ENV DD_TRACE_PROPAGATION_STYLE=datadog

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint, launched by the Datadog trace library. Adapt this line to your needs
CMD ["ddtrace-run", "python", "app.py"]
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# install the Datadog js tracing library, either here or in package.json

npm i dd-trace@2.2.0

# enable the Datadog tracing library
ENV NODE_OPTIONS="--require dd-trace/init"

# optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# this env var is needed for trace propagation to work properly in cloud run.
# ensure to set this variable for all Datadog-instrumented downstream services.
ENV DD_TRACE_PROPAGATION_STYLE=datadog

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]

```

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# this env var is needed for trace propagation to work properly in cloud run.
# ensure to set this variable for all Datadog-instrumented downstream services.
ENV DD_TRACE_PROPAGATION_STYLE=datadog

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["./mvnw", "spring-boot:run"]

```

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# this env var is needed for trace propagation to work properly in cloud run.
# ensure to set this variable for all Datadog-instrumented downstream services.
ENV DD_TRACE_PROPAGATION_STYLE=datadog

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["dotnet", "helloworld.dll"]

```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# this env var is needed for trace propagation to work properly in cloud run.
# ensure to set this variable for all Datadog-instrumented downstream services.
ENV DD_TRACE_PROPAGATION_STYLE=datadog

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["rails", "server", "-b", "0.0.0.0"] (adapt this line to your needs)

```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### 빌드팩을 사용해 에이전트 설치

[`Pack Buildpacks`][3]은 Dockerfile을 사용할 필요없이 컨테이너를 패키징하는 편리한 방법을 제공합니다. 이 예에서는 Google Cloud 레지스트리와 Datadog 서버리스 빌드팩을 사용했습니다. 

**참고**: 빌드팩을 실행하기 전 사용 언어의 [트레이싱 라이브러리를 설치](#install-tracing-library)합니다.

다음 명령을 실행하여 애플리케이션을 빌드합니다.

   ```shell
   pack build --builder=gcr.io/buildpacks/builder \
   --buildpack from=builder \
   --buildpack datadog/serverless-buildpack:latest \
   gcr.io/YOUR_PROJECT/YOUR_APP_NAME
   ```

**참고**: Alpine과는 호환되지 않습니다.

### 2. 트레이싱 라이브러리 설치{#install-tracing-library}

빌드팩을 사용하는 경우 [애플리케이션 설정](#3-configure-your-application)으로 건너뛸 수 있습니다.

{{< programming-lang-wrapper langs="go,python,nodejs,java,dotnet,ruby" >}}
{{< programming-lang lang="go" >}}
[이 지침][2]을 따라 애플리케이션에 Go 트레이싱 라이브러리를 설치 및 설정하여 트레이스를 캡처하고 제출합니다. 


[단순한 Go 애플리케이션을 위한 샘플 코드][1]


[1]: https://github.com/DataDog/crpb/tree/main/go
[2]: /ko/tracing/trace_collection/dd_libraries/go/?tab=containers#installation-and-getting-started

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

[이 지침][2]을 따라 애플리케이션에서 Python 트레이싱 라이브러리를 설치 및 설정하여 트레이스를 캡처하고 제출합니다.

[단순한 Python 애플리케이션을 위한 샘플 코드][1]

[1]: https://github.com/DataDog/crpb/tree/main/python
[2]: /ko/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

[이 지침][2]을 따라 애플리케이션에서 Node 트레이싱 라이브러리를 설치 및 설정하여 트레이스를 캡처하고 제출합니다.

[단순한 Node.js 애플리케이션을 위한 샘플 코드][1]

[1]: https://github.com/DataDog/crpb/tree/main/js
[2]: /ko/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

[이 지침][2]을 따라 애플리케이션에서 Java 트레이싱 라이브러리를 설치 및 설정하여 트레이스를 캡처하고 제출합니다.

[단순한 Java 애플리케이션을 위한 샘플 코드][1]

[1]: https://github.com/DataDog/crpb/tree/main/java
[2]: /ko/tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

#### 

[이 지침][2]을 따라 애플리케이션에서 [.NET Core 트레이싱 라이브러리][1] 및 [.NET Framework 트레이싱 라이브러리][2]를 설치하고 설정합니다.

[1]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[2]: /ko/tracing/trace_collection/dd_libraries/dotnet-framework/?tab=containers#custom-instrumentation

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[이 지침][2]을 따라 애플리케이션에서 Ruby 트레이싱 라이브러리를 설치 및 설정하여 트레이스를 캡처하고 제출합니다.

[단순한 Ruby 애플리케이션을 위한 샘플 코드][1]

[1]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails
[2]: /ko/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 3. 애플리케이션 설정

컨테이너가 빌드되어 레지스트리에 푸시되면 마지막 단계는 Datadog 에이전트를 위한 필수 환경 변수를 설정하는 것입니다.
- `DD_API_KEY`: Datadog API 키로 Datadog 계정에 데이터를 전송하는 데 사용됩니다. 개인정보보호와 안전을 위해 [Google Cloud Secret][10]으로 설정해야 합니다.
- `DD_SITE`: Datadog 엔드포인트와 웹사이트입니다. 페이지 오른쪽에서 사이트를 선택합니다. 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.
- `DD_TRACE_ENABLED`: 트레이싱 활성화를 위해 `true`로 설정합니다.

환경 변수와 기능에 대한 자세한 정보는 [추가 설정](#additional-configurations)을 참조하세요.

이 명령은 서비스를 구축하고 외부 연결이 서비스에 도달하도록 허용합니다. `DD_API_KEY`를 환경 변수로 설정하고 서비스가 포트 80에 연결되도록 설정합니다.

```shell
gcloud run deploy APP_NAME --image=gcr.io/YOUR_PROJECT/APP_NAME \
  --port=80 \
  --update-env-vars=DD_API_KEY=$DD_API_KEY \
  --update-env-vars=DD_TRACE_ENABLED=true \
  --update-env-vars=DD_SITE='datadoghq.com' \

```

### 3. 결과

구축이 완료되면 메트릭과 트레이스는 Datadog로 전송됩니다. Datadog에서 **인프라스트럭처->서버리스**로 이동하여 서버리스 메트릭과 트레이스를 확인합니다.

## 추가 설정

- **고급 트레이싱**: Datadog 에이전트는 이미 인기 프레임워크에 대한 기본 트레이싱을 제공합니다. 자세한 정보는 [고급 트레이싱 가이드][2]를 참조하세요.

- **로그**: [Google Cloud 통합][1]을 사용하는 경우 이미 로그가 수집됩니다. 대신 `DD_LOGS_ENABLED` 환경 변수를 `true`로 설정하여 직접 서버리스 계측으로 애플리케이션 로그를 캡처할 수 있습니다.

- **커스텀 메트릭**: [DogStatsd 클라이언트][4]를 사용해 커스텀 메트릭을 제출할 수 있습니다. Cloud Run 및 기타 서버리스 애플리케이션의 경우 [분포][9] 메트릭을 사용합니다. 분포는 `avg`, `sum`, `max`, `min`, `count` 집계를 기본적으로 제공합니다. 메트릭 요약 페이지에서 백분위수 집계(p50, p75, p90, p95, p99)를 활성화할 수 있습니다. 게이지 메트릭 유형에 대한 분포를 모니터링하려면 [시간 및 공간 집계][11] 모두에 대해 `avg`를 사용합니다. 개수 메트릭 유형에 대한 분포를 모니터링하려면 시간 및 공간 집계 모두에 `sum`을 사용합니다.

- **트레이스 전파**: 분산된 트레이싱에 트레이싱 컨텍스트를 전파하려면 Cloud Run 앱 및 Datadog 계측 서비스 다운스트림에서 `DD_TRACE_PROPAGATION_STYLE` 환경 변수를 `'datadog'`로 설정합니다.

### 환경 변수

| 변수 | 설명 |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API 키][7] - **필수**|
| `DD_SITE` | [Datadog 사이트][5] - **필수** |
| `DD_LOGS_ENABLED` | 참인 경우 로그(stdout 및 stderr)를 Datadog에 전송합니다. 기본값은 거짓입니다. |
| `DD_SERVICE`      | [통합 서비스 태깅][6]을 참조하세요.                                  |
| `DD_VERSION`      | [통합 서비스 태깅][6]을 참조하세요.                                  |
| `DD_ENV`          | [통합 서비스 태깅][6]을 참조하세요.                                  |
| `DD_SOURCE`       | [통합 서비스 태깅][6]을 참조하세요.                                  |
| `DD_TAGS`         | [통합 서비스 태깅][6]을 참조하세요.                                  |

### OpenTelemetry

이 단계를 따라 OpenTelemetry 데이터를 Datadog에 전송하세요.

1. OpenTelemetry가 Datadog `serverless-init`에 스팬을 내보내도록 명령하세요.

   ```js
   // instrument.js

   const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
   const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
   const { Resource } = require('@opentelemetry/resources');
   const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
   const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');

   const provider = new NodeTracerProvider({
      resource: new Resource({
          [ SemanticResourceAttributes.SERVICE_NAME ]: '<your-service-name>',
      })
   });

   provider.addSpanProcessor(
      new SimpleSpanProcessor(
          new OTLPTraceExporter(
              { url: 'http://localhost:4318/v1/traces' },
          ),
      ),
   );
   provider.register();
   ```

2. Express에 OpenTelemetry 계측을 추가하세요. `ddtrace`와 유사합니다.

   ```js
   // instrument.js

   const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
   const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
   const { registerInstrumentations } = require('@opentelemetry/instrumentation');

   registerInstrumentations({
      instrumentations: [
          new HttpInstrumentation(),
          new ExpressInstrumentation(),
      ],
   });

   ```

3. 런타임에 계측을 추가하세요. 예를 들어 Node.js의 경우 `NODE_OPTIONS`을 사용하세요.
   ```
   # Dockerfile

   FROM node

   WORKDIR /app
   COPY package.json index.js instrument.js /app/
   RUN npm i

   ENV NODE_OPTIONS="--require ./instrument"

   CMD npm run start
   ```

4. Datadog `serverless-init`를 추가합니다.
   ```
   # Dockerfile

   COPY --from=datadog/serverless-init /datadog-init /app/datadog-init
   ENTRYPOINT ["/app/datadog-init"]
   ```
5. Enable OpenTelemetry in the Datadog  `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` 또는 `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` 환경 변수를 사용해 Datadog `serverless-init`에서 OpenTelemetry를 활성화하세요.

   ```
   # Dockerfile

   ENV DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT="localhost:4318"
   ```

## 문제 해결

이 통합은 전체 SSL 구현 환경을 포함하는 런타임에 따라 달라집니다. Node에 대해 슬림 이미지를 사용하는 경우 Dockerfile에 다음 명령을 추가하여 인증서를 포함해야 할 수 있습니다.

```
RUN apt-get update && apt-get install -y ca-certificates
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/integrations/google_cloud_platform/#log-collection
[2]: /ko/tracing/trace_collection/#for-setup-instructions-select-your-language
[3]: https://buildpacks.io/docs/tools/pack/
[4]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[5]: /ko/getting_started/site/
[6]: /ko/getting_started/tagging/unified_service_tagging/
[7]: /ko/account_management/api-app-keys/#api-keys
[8]: https://github.com/DataDog/crpb/tree/main
[9]: /ko/metrics/distributions/
[10]: /ko/metrics/#time-and-space-aggregation
[11]: https://cloud.google.com/run/docs/configuring/secrets