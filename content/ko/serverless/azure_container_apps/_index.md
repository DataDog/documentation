---
further_reading:
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: 블로그
  text: 컨테이너 앱 서비스에서 트레이스, 로그 및 커스텀 메트릭 수집
title: Azure 컨테이너 앱
---

## 개요
Azure 컨테이너 앱은 컨테이너 기반 애플리케이션을 배포하고 확장하기 위한 완전 관리형 서버리스 플랫폼입니다. Datadog은 [Azure 통합][1]을 통해 컨테이너 앱에 대한 모니터링 및 로그 수집을 제공합니다. 또한 Datadog은 트레이스, 커스텀 메트릭, 직접 로그 수집을 지원하는 전용 에이전트로 컨테이너 앱 애플리케이션을 계측할 수 있는 솔루션(현재 베타 버전)을 제공합니다.

<div class="alert alert-warning">이 기능은 베타 버전입니다. 표준 지원 채널을 통해 피드백을 제공할 수 있습니다. 베타 기간 동안에는 직접 비용 없이 컨테이너 앱 모니터링 및 APM 추적을 사용할 수 있습니다. 기존 APM 고객은 스팬 수집 및 볼륨 비용이 증가할 수 있습니다.</div>

## 시작하기

### 전제 조건

[Datadog API 키][6]가 있고 [Datadog 트레이싱 라이브러리에서 지원되는][2] 프로그래밍 언어를 사용하고 있는지 확인하세요.

### 1. 애플리케이션 계측

{{< programming-lang-wrapper langs="go,python,nodejs,java,dotnet,ruby" >}}
{{< programming-lang lang="go" >}}

#### Dockerfile을 사용해 에이전트 설치

Dockerfile에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# Datadog `serverless-init`를 도커 이미지에 복사합니다.
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# 애플리케이션을 Datadog serverless-init 프로세스로 래핑하도록 엔트리포인트를 변경합니다.
ENTRYPOINT ["/app/datadog-init"]

# 필요 시 Datadog 태그를 추가합니다.
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# 엔트리포인트로 래핑된 바이너리 애플리케이션을 실행합니다. 이 줄을 필요에 맞게 조정하세요.
CMD ["/path/to/your-go-binary"]
```

#### 추적 라이브러리 설치
[이 지침][2]에 따라 애플리케이션에 Go 추적 라이브러리를 설치 및 설정하여 트레이스를 캡처하고 제출하세요.


[단순한 Go 애플리케이션을 위한 샘플 코드][1]


[1]: https://github.com/DataDog/crpb/tree/main/go
[2]: /ko/tracing/trace_collection/dd_libraries/go/?tab=containers#installation-and-getting-started

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

#### Dockerfile을 사용해 에이전트 설치

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# Datadog `serverless-init`을 도커 이미지에 복사합니다.
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# 여기 또는 requirements.txt에 python 추적 라이브러리를 설치하세요.
RUN pip install --no-cache-dir ddtrace==1.7.3

# 필요 시 Datadog 태그를 추가합니다.
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# 애플리케이션을 Datadog serverless-init 프로세스로 래핑하도록 엔트리포인트를 변경합니다.
ENTRYPOINT ["/app/datadog-init"]

# Datadog 추적 라이브러리가 시작하고, 엔트리포인트에서 래핑된 바이너리 애플리케이션을 실행합니다. 이 줄을 필요에 맞게 조정하세요.
CMD ["ddtrace-run", "python", "app.py"]
```
#### 추적 라이브러리 설치
[이 지침][2]을 따라 애플리케이션에서 Python 트레이싱 라이브러리를 설치 및 설정하여 트레이스를 캡처하고 제출합니다.

[단순한 Python 애플리케이션을 위한 샘플 코드][1]

[1]: https://github.com/DataDog/crpb/tree/main/python
[2]: /ko/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

#### Dockerfile을 사용해 에이전트 설치

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# Datadog `serverless-init`를 도커 이미지에 복사합니다.
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# 여기 또는 package.json에서 Datadog js 추적 라이브러리를 설치합니다.

RUN npm i dd-trace@2.2.0

# Datadog 추적 라이브러리를 활성화합니다.
ENV NODE_OPTIONS="--require dd-trace/init"

# 필요 시 Datadog 태그를 추가합니다.
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# 애플리케이션을 Datadog serverless-init 프로세스로 래핑하도록 엔트리포인트를 변경합니다.
ENTRYPOINT ["/app/datadog-init"]

# 엔트리포인트에서 래핑된 바이너리 애플리케이션을 실행합니다. 이 줄을 필요에 맞게 조정하세요.
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]

```
#### 추적 라이브러리 설치
[이 지침][2]을 따라 애플리케이션에서 Node 트레이싱 라이브러리를 설치 및 설정하여 트레이스를 캡처하고 제출합니다.

[단순한 Node.js 애플리케이션을 위한 샘플 코드][1]

[1]: https://github.com/DataDog/crpb/tree/main/js
[2]: /ko/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

#### Dockerfile을 사용해 에이전트 설치

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# Datadog `serverless-init`을 도커 이미지에 복사합니다.
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# 필요 시 Datadog 태그를 추가합니다.
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# 애플리케이션을 Datadog serverless-init 프로세스로 래핑하도록 엔트리포인트를 변경합니다.
ENTRYPOINT ["/app/datadog-init"]

# 엔트리포인트에서 래핑된 바이너리 애플리케이션을 실행합니다. 이 줄을 필요에 맞게 조정하세요.
CMD ["./mvnw", "spring-boot:run"]

```

#### 추적 라이브러리 설치
[이 지침][2]을 따라 애플리케이션에서 Java 트레이싱 라이브러리를 설치 및 설정하여 트레이스를 캡처하고 제출합니다.

[단순한 Java 애플리케이션을 위한 샘플 코드][1]

[1]: https://github.com/DataDog/crpb/tree/main/java
[2]: /ko/tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

#### Dockerfile을 사용해 에이전트 설치

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# Datadog `serverless-init`을 도커 이미지에 복사합니다. 
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# 필요 시 Datadog 태그를 추가합니다.
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# 애플리케이션을 Datadog serverless-init 프로세스로 래핑하도록 엔트리포인트를 변경합니다.
ENTRYPOINT ["/app/datadog-init"]

# 엔트리포인트에서 래핑된 바이너리 애플리케이션을 실행합니다. 이 줄을 필요에 맞게 조정하세요.
CMD ["dotnet", "helloworld.dll"]

```

#### 추적 라이브러리 설치
[이 지침][2]을 따라 [.NET Core 트레이싱 라이브러리][1] 및 [.NET Framework 트레이싱 라이브러리][2]를 설치하고 설정합니다.

[1]: /ko/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[2]: /ko/tracing/trace_collection/dd_libraries/dotnet-framework/?tab=containers#custom-instrumentation

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

#### Dockerfile을 사용해 에이전트 설치

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# Datadog `serverless-init`을 도커 이미지에 복사합니다. 
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# 필요 시 Datadog 태그를 추가합니다.
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# 애플리케이션을 Datadog serverless-init 프로세스로 래핑하도록 엔트리포인트를 변경합니다.
ENTRYPOINT ["/app/datadog-init"]

# 엔트리포인트에서 래핑된 바이너리 애플리케이션을 실행합니다. 이 줄을 필요에 맞게 조정하세요.
CMD ["rails", "server", "-b", "0.0.0.0"] (adapt this line to your needs)

```

#### 추적 라이브러리 설치

[이 지침][2]을 따라 애플리케이션에서 Ruby 트레이싱 라이브러리를 설치 및 설정하여 트레이스를 캡처하고 제출합니다.

[단순한 Ruby 애플리케이션을 위한 샘플 코드][1]

[1]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails
[2]: /ko/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 2. 애플리케이션 설정

컨테이너가 만들어진 후 레지스트리에 푸시되면 마지막 단계는 Datadog 에이전트를 위한 필수 환경 변수를 설정하는 것입니다:
- `DD_API_KEY`: Datadog API 키로 Datadog 계정에 데이터를 전송하는 데 사용됩니다. 개인정보 보호와 안전을 위해 [Azure Secret][7]으로 설정해야 합니다.
- `DD_SITE`: Datadog 엔드포인트와 웹사이트입니다. 페이지 오른쪽에서 사이트를 선택합니다. 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.
- `DD_TRACE_ENABLED`: 트레이싱 활성화를 위해 `true`로 설정합니다.

환경 변수와 기능에 대한 자세한 정보는 [추가 설정](#additional-configurations)을 참조하세요.

이 명령은 서비스를 구축하고 외부 연결이 서비스에 도달하도록 허용합니다. `DD_API_KEY`를 환경 변수로 설정하고 서비스가 포트 80에 연결되도록 설정합니다.

```shell
az containerapp up \
  --name APP_NAME \
  --resource-group RESOURCE_GROUP \
  --ingress external \
  --target-port 80 \
  --env-vars "DD_API_KEY=$DD_API_KEY" "DD_TRACE_ENABLED=true" "DD_SITE='datadoghq.com'" \
  --image YOUR_REGISTRY/YOUR_PROJECT
```

### 3. 결과

구축이 완료되면 메트릭과 트레이스는 Datadog로 전송됩니다. Datadog에서 **인프라스트럭처->서버리스**로 이동하여 서버리스 메트릭과 트레이스를 확인합니다.

## 추가 설정

- **고급 트레이싱**: Datadog 에이전트는 이미 인기 프레임워크에 대한 기본 트레이싱을 제공합니다. 자세한 정보는 [고급 트레이싱 가이드][2]를 참조하세요.

- **로그**: [Azure 통합][1]을 사용하는 경우 이미 로그가 수집됩니다. 대신 `DD_LOGS_ENABLED` 환경 변수를 `true`로 설정하여 직접 서버리스 계측으로 애플리케이션 로그를 캡처할 수 있습니다.

- **커스텀 메트릭**: [DogStatsd 클라이언트][3]를 사용해 커스텀 메트릭을 제출할 수 있습니다. Cloud Run 및 기타 서버리스 애플리케이션의 경우 [분포][8] 메트릭을 사용합니다. 분포는 `avg`, `sum`, `max`, `min`, `count` 집계를 기본적으로 제공합니다. 메트릭 요약 페이지에서 백분위수 집계 (p50, p75, p90, p95, p99)를 활성화할 수 있습니다. 게이지 메트릭 유형에 대한 분포를 모니터링하려면 [시간 및 공간 집계][11] 모두에 대해 `avg`를 사용합니다. 카운터 메트릭 유형에 대한 분포를 모니터링하려면 시간 및 공간 집계 모두에 `sum`을 사용합니다.

### 환경 변수

| 변수 | 설명 |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API 키][6] - **필수**|
| `DD_SITE` | [Datadog 사이트][4] - **필수** |
| `DD_LOGS_ENABLED` | true인 경우 로그 (stdout 및 stderr)를 Datadog에 전송합니다. 기본값은 false입니다. |
| `DD_SERVICE`      | [통합 서비스 태깅][5]을 참조하세요.                                       |
| `DD_VERSION`      | [통합 서비스 태깅][5]을 참조하세요.                                       |
| `DD_ENV`          | [통합 서비스 태깅][5]을 참조하세요.                                       |
| `DD_SOURCE`       | [통합 서비스 태깅][5]을 참조하세요.                                       |
| `DD_TAGS`         | [통합 서비스 태깅][5]을 참조하세요.                                       |

## 문제 해결

이 통합은 전체 SSL 구현 환경을 포함하는 런타임에 따라 달라집니다. Node에 대해 슬림 이미지를 사용하는 경우 Dockerfile에 다음 명령을 추가하여 인증서를 포함해야 할 수 있습니다.

```
RUN apt-get update && apt-get install -y ca-certificates
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/integrations/azure/#log-collection
[2]: /ko/tracing/trace_collection/#for-setup-instructions-select-your-language
[3]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /ko/getting_started/site/
[5]: /ko/getting_started/tagging/unified_service_tagging/
[6]: /ko/account_management/api-app-keys/
[7]: https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets
[8]: /ko/metrics/distributions/
[9]: /ko/metrics/#time-and-space-aggregation