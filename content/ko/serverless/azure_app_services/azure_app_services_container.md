---
further_reading:
- link: /integrations/azure_app_services/
  tag: 설명서
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: 설명서
  text: Azure App Service 환경
title: Azure App Service - 리눅스(Linux) 컨테이너
---
## 개요

이 계측 방법은 컨테이너화된 리눅스 Azure App Service 워크로드를 위한 부수적인 모니터링 기능을 제공합니다.

- 자동 계측을 사용한 전체 분산 APM 추적.
- 관련 Azure App Service 메트릭과 메타데이터를 보여주는 사용자 지정 APM 서비스 및 트레이스
- 스팬을 사용자 지정할 수 있는 수동 APM 계측 지원
- 애플리케이션 로그에 `Trace_ID` 삽입
- [DogStatsD][1]를 이용해 커스텀 메트릭 전송 지원

## 설정
### 전제 조건
[Datadog API 키][1]가 있고 [Datadog 추적 라이브러리로 지원되는][2] 프로그래밍 언어를 사용 중인지 확인합니다.

[1]: /ko/account_management/api-app-keys/#api-keys
[2]: /ko/tracing/trace_collection/#for-setup-instructions-select-your-language

### 애플리케이션의 계측

#### Dockerfile을 사용해 에이전트 설치

{{< programming-lang-wrapper langs="nodejs,python,go" >}}
{{< programming-lang lang="nodejs" >}}

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# install the Datadog js tracing library, either here or in package.json
npm i dd-trace@2.2.0

# enable the Datadog tracing library
ENV NODE_OPTIONS="--require dd-trace/init"

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]

```

#### 추적 라이브러리 설치

추적은 이전 단계에서 도커파일(Dockerfile)과 함께 작동해야 합니다. 대신 [이 지침][2]을 따라 애플리케이션에서 노드 추적 라이브러리를 설치하고 설정하여 트레이스를 캡처하고 제출할 수 있습니다.

[Node.js 애플리케이션 샘플용 샘플 코드][1].

[1]: https://github.com/DataDog/serverless-self-monitoring/tree/main/self_monitor/azure/App_Service_Linux/container/nodejs/express
[2]: /ko/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# install the python tracing library here or in requirements.txt
RUN pip install --no-cache-dir ddtrace==1.7.3

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint
CMD ["ddtrace-run", "python", "app.py"]
```

#### 추적 라이브러리 설치

추적은 이전 단계에서 도커파일(Dockerfile)과 함께 작동해야 합니다. 대신 [이 지침][2]을 따라 애플리케이션에서 파이썬(Python) 추적 라이브러리를 설치하고 설정하여 트레이스를 캡처하고 제출할 수 있습니다.

[파이썬 애플리케이션 샘플용 샘플 코드][1]

[1]: https://github.com/DataDog/serverless-self-monitoring/tree/main/self_monitor/azure/App_Service_Linux/container/python/flask
[2]: /ko/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Dockerfile 파일에 다음 줄을 추가하여 Datadog 에이전트를 사용해 애플리케이션을 계측할 수 있습니다. 기존 Dockerfile 설정에 따라 이러한 예를 조정해야 할 수 있습니다.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint
CMD ["/path/to/your-go-binary"]
```

#### 추적 라이브러리 설치

[이 지침][2]에 따라 애플리케이션에 고(Go) 추적 라이브러리를 설치하고 설정하여 트레이스를 캡처하고 제출합니다.

[고 애플리케이션 샘플용 샘플 코드][1]

[1]: https://github.com/DataDog/serverless-self-monitoring/tree/main/self_monitor/azure/App_Service_Linux/container/go
[2]: /ko/tracing/trace_collection/dd_libraries/go/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 애플리케이션 설정

애플리케이션을 설정하려면 다음 키 값 쌍을 Azure 구성 설정에서 **애플리케이션 설정** 아래에 추가합니다.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Azure App Service Configuration: the Application Settings, under the Configuration section of Settings in the Azure UI. Three settings are listed: DD_API_KEY, DD_SERVICE, and DD_START_APP." style="width:80%;" >}}

- `DD_API_KEY`는 Datadog API 키로, Datadog 계정에 데이터를 전송하는 데 사용됩니다.
- `DD_SITE`는 Datadog 사이트 [파라미터][2]입니다. {{< region-param key="dd_site" code="true" >}}가 내 사이트 입니다. 기본 값은 `datadoghq.com`로 설정되어 있습니다.
- `DD_SERVICE`는 이 프로그램에 사용된 서비스 이름입니다. 기본 값은 `package.json`의 이름 필드 값입니다.

**참고**: 애플리케이션은 새 설정이 저장되면 재시작됩니다. 이러한 설정을 대신 도커파일에 포함할 수 있습니다. 유일한 단점은 설정을 업데이트하고 재시작하는 대신 애플리케이션을 재배포해야 된다는 점에 있습니다.

### 결과

배포가 완료되면 메트릭과 트레이스가 Datadog에 전송됩니다. Datadog에서 **인프라스트럭처 -> 서버리스**로 이동하여 서버리스 메트릭과 트레이스를 봅니다.

## 추가 설정

### 트레이스 보기

새 애플리케이션 설정이 저장되면 Azure가 애플리케이션을 재시작합니다. 애플리케이션이 재시작되면 Datadog [APM 서비스 페이지][4]에서 서비스 이름(`DD_SERVICE`)을 검색하여 트레이스를 확인할 수 있습니다.

### 로그

[Azure 통합][6]을 사용하는 경우 로그가 이미 수집되고 있습니다. 대신 `DD_LOGS_ENABLED` 환경 변수를 `true`로 설정하여 서비리스 계측을 통해 직접 애플리케이션 로그를 수집할 수 있습니다.

### 커스텀 메트릭

DogStatsD를 사용해 애플리케이션의 커스텀 메트릭을 활성화하려면 애플리케이션 설정에서  `DD_CUSTOM_METRICS_ENABLED`를 추가한 다음 `true`로 설정합니다.

메트릭을 전송하도록 애플리케이션을 설정하려면 사용하는 런타임에 맞는 단계를 따르세요.

- [Node][5]
- [Python][11]
- [고(Go)][12]

## 문제 해결

받은 트레이스나 커스텀 메트릭 데이터가 예상과 다를 경우, **App 서비스 로그**를 활성화해 디버깅 로그를 받으세요.

{{< img src="serverless/azure_app_service/app-service-logs.png" style="width:100%;" >}}

**로그 스트림**의 내용을 [Datadog 고객 지원팀][14]과 공유하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/dogstatsd
[2]: /ko/getting_started/site/#access-the-datadog-site
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /ko/tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: /ko/integrations/azure/#log-collection
[11]: https://docs.datadoghq.com/ko/developers/dogstatsd/?tab=hostagent&code-lang=python#setup
[12]: https://docs.datadoghq.com/ko/developers/dogstatsd/?tab=hostagent&code-lang=go#setup
[14]: /ko/help