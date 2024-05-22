---
further_reading:
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: 블로그
  text: Cloud Run 서비스에서 트레이스, 로그, 커스텀 메트릭 수집
kind: documentation
title: Google Cloud Run
---

## 개요

Google Cloud Run은 컨테이너 기반 애플리케이션을 배포하고 확장하기 위한 완전 관리형 서버리스 플랫폼입니다. Datadog은 [Google Cloud 통합][1]을 통해 Cloud Run에 대한 모니터링 및 로그 수집을 제공합니다. Datadog은 또한 추적, 커스텀 메트릭, 직접 로그 수집을 지원하기 위해 특별히 제작된 Agent로 Cloud Run 애플리케이션을 계측하기 위한 솔루션을 제공합니다.

### 전제 조건

[Datadog API 키][6]가 있고 [Datadog 트레이싱 라이브러리에서 지원되는][2] 프로그래밍 언어를 사용하고 있는지 확인하세요.

## 애플리케이션의 계측

[Dockerfile](#dockerfile) 또는 [buildpack](#buildpack)의 두 가지 방법 중 하나로 애플리케이션을 계측할 수 있습니다.

### Dockerfile

Datadog은 `serverless-init` 컨테이너 이미지의 새 릴리스를 Google의 gcr.io, AWS의 ECR 및 Docker Hub에 게시합니다.

| dockerhub.io | gcr.io | public.ecr.aws |
| ------------ | ------ | -------------- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

이미지에는 시맨틱 버전 관리를 기반으로 태그가 지정되며, 새 버전마다 3개의 관련 태그가 지정됩니다:

* `1`, `1-alpine`: 이를 사용하여 변경 사항 중단 없이 최신 마이너 릴리스를 추적하세요
* `1.x.x`, `1.x.x-alpine`: 정확한 버전의 라이브러리에 고정할 때 사용하세요.
* `latest`, `latest-alpine`: 주요 변경 사항이 포함된 최신 버전 릴리스를 따를 때 사용하세요.

## `serverless-init` 작동 방식

`serverless-init` 애플리케이션은 프로세스를 래핑하고 이를 하위 프로세스로 실행합니다. 메트릭을 위한 DogStatsD 수신기와 추적을 위한 Trace Agent 수신기를 시작합니다. 애플리케이션의 stdout/stderr 스트림을 래핑하여 로그를 수집합니다. 부트스트래핑 후 serverless-init는 명령을 하위 프로세스로 실행합니다.

전체를 계측하려면 Docker 컨테이너 내에서 실행되는 첫 번째 명령으로 `datadog-init`를 호출하고 있는지 확인하세요. 이를 진입점으로 설정하거나 CMD의 첫 번째 인수로 설정하여 수행할 수 있습니다.

{{< programming-lang-wrapper langs="nodejs,python,java,go,dotnet,ruby,php" >}}
{{< programming-lang lang="nodejs" >}}

{{% svl-init-nodejs %}}

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

{{% svl-init-python %}}

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

{{% svl-init-java %}}

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% svl-init-go %}}

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

{{% svl-init-dotnet %}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

{{% svl-init-ruby %}}

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

{{% svl-init-php %}}

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Buildpack

[`Pack Buildpacks`][3]는 Dockerfile을 사용하지 않고 컨테이너를 패키징하는 편리한 방법을 제공합니다.

먼저 트레이서를 수동으로 설치합니다.
- [Node.JS][14]
- [Python][13]
- [Java][15]
- [고(Go)][12]
- [.NET][18]
- [Ruby][16]
- [PHP][17]

이어서 다음 명령을 실행하여 애플리케이션을 구축합니다.

```shell
pack build --builder=gcr.io/buildpacks/builder \
--buildpack from=builder \
--buildpack datadog/serverless-buildpack:latest \
gcr.io/YOUR_PROJECT/YOUR_APP_NAME
```

**참고**: Buildpack 계측은 Alpine 이미지와 호환되지 않습니다.

## 애플리케이션 설정

컨테이너가 만들어진 후 레지스트리에 푸시되면 마지막 단계는 Datadog 에이전트를 위한 필수 환경 변수를 설정하는 것입니다:
- `DD_API_KEY`: Datadog API 키는 Datadog 계정으로 데이터를 보내는 데 사용됩니다. 개인 정보 보호 및 보안 이슈 방지를 위해 [Google Cloud Secret][11]으로 설정해야 합니다.
- `DD_SITE`: Datadog 엔드포인트와 웹사이트입니다. 페이지 오른쪽에서 사이트를 선택합니다. 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.
- `DD_TRACE_ENABLED`: 트레이싱 활성화를 위해 `true`로 설정합니다.
- `DD_TRACE_PROPAGATION_STYLE`: 컨텍스트 전파 및 로그 추적 상관 관계를 사용하기 위해 `datadog`로 설정하세요.

환경 변수와 기능에 대한 자세한 정보는 [추가 설정](#additional-configurations)을 참조하세요.

다음 명령은 서비스를 배포하고 외부 연결이 서비스에 도달하도록 허용합니다. `DD_API_KEY`를 환경 변수로 설정하고 서비스가 포트 8080을 수신하도록 설정합니다.

```
shell
gcloud run deploy APP_NAME --image=gcr.io/YOUR_PROJECT/APP_NAME \
  --port=8080 \
  --update-env-vars=DD_API_KEY=$DD_API_KEY \
  --update-env-vars=DD_TRACE_ENABLED=true \
  --update-env-vars=DD_SITE='datadoghq.com' \
  --update-env-vars=DD_TRACE_PROPAGATION_STYLE='datadog' \
```

## 결과

구축이 완료되면 메트릭과 트레이스는 Datadog로 전송됩니다. Datadog에서 **인프라스트럭처->서버리스**로 이동하여 서버리스 메트릭과 트레이스를 확인합니다.

## 추가 설정

- **고급 트레이싱**: Datadog 에이전트는 이미 인기 프레임워크에 대한 기본 트레이싱을 제공합니다. 자세한 정보는 [고급 트레이싱 가이드][2]를 참조하세요.

- **로그**: [Google Cloud 통합][1]을 사용하는 경우 이미 로그가 수집됩니다. 대신 `DD_LOGS_ENABLED` 환경 변수를 `true`로 설정하여 직접 서버리스 계측으로 애플리케이션 로그를 캡처할 수 있습니다.

- **커스텀 메트릭**: [DogStatsd 클라이언트][4]를 사용해 커스텀 메트릭을 제출할 수 있습니다. Cloud Run 및 기타 서버리스 애플리케이션의 경우 [분포][9] 메트릭을 사용합니다. 분포는 `avg`, `sum`, `max`, `min`, `count` 집계를 기본적으로 제공합니다. 메트릭 요약 페이지에서 백분위수 집계(p50, p75, p90, p95, p99)를 활성화할 수 있습니다. 게이지 메트릭 유형에 대한 분포를 모니터링하려면 [시간 및 공간 집계][11] 모두에 대해 `avg`를 사용합니다. 개수 메트릭 유형에 대한 분포를 모니터링하려면 시간 및 공간 집계 모두에 `sum`을 사용합니다.

### 환경 변수

| 변수 | 설명 |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API 키][7] - **필수**|
| `DD_SITE` | [Datadog 사이트][5] - **필수** |
| `DD_LOGS_ENABLED` | true인 경우 로그 (stdout 및 stderr)를 Datadog에 전송합니다. 기본값은 false입니다. |
| `DD_LOGS_INJECTION`| true인 경우 [Java][19], [Node][20], [.NET][21] 및 [PHP][22]에서 지원되는 로거에 대한 트레이스 데이터로 모든 로그를 보강합니다. [Python][23], [Go][24] 및 [Ruby][25]에 대한 추가 문서를 참조하세요. |
| `DD_TRACE_SAMPLE_RATE`|  트레이스 수집 샘플링 속도 `0.0` 및 `1.0`을 제어합니다. |
| `DD_SERVICE`      | [통합 서비스 태깅][6]을 참조하세요.                                  |
| `DD_VERSION`      | [통합 서비스 태깅][6]을 참조하세요.                                  |
| `DD_ENV`          | [통합 서비스 태깅][6]을 참조하세요.                                  |
| `DD_SOURCE`       | [통합 서비스 태깅][6]을 참조하세요.                                  |
| `DD_TAGS`         | [통합 서비스 태깅][6]을 참조하세요.                                  |

## 트러블슈팅

이 통합은 전체 SSL 구현이 있는 런타임에 따라 달라집니다. 슬림 이미지를 사용하는 경우 인증서를 포함하려면 Dockerfile에 다음 명령을 추가해야 할 수도 있습니다.

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
[12]: /ko/tracing/trace_collection/library_config/go/
[13]: /ko/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application
[14]: /ko/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application
[15]: /ko/tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application
[16]: /ko/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[17]: /ko/tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension
[18]: /ko/tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation
[19]: /ko/tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[20]: /ko/tracing/other_telemetry/connect_logs_and_traces/nodejs
[21]: /ko/tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[22]: /ko/tracing/other_telemetry/connect_logs_and_traces/php
[23]: /ko/tracing/other_telemetry/connect_logs_and_traces/python
[24]: /ko/tracing/other_telemetry/connect_logs_and_traces/go
[25]: /ko/tracing/other_telemetry/connect_logs_and_traces/ruby