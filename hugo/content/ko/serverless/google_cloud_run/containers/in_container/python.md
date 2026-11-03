---
aliases:
- /ko/serverless/google_cloud_run/containers/in_process/python
code_lang: python
code_lang_weight: 10
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
  tag: 설명서
  text: Python 애플리케이션 추적하기
- link: /tracing/other_telemetry/connect_logs_and_traces/python/
  tag: 설명서
  text: Python 로그 및 트레이스 상호 연결하기
title: Python Cloud Run 컨테이너 내부에서 컨테이너 계측
type: multi-code-lang
---
## 설정 {#setup}

<div class="alert alert-info">샘플 애플리케이션은 <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-container/python">GitHub에서 확인할 수 있습니다</a>.</div>

1. **Datadog Python SDK를 설치합니다.**

   `requirements.txt` 또는 `pyproject.toml`에 `ddtrace`를 추가합니다. 최신 버전은 [PyPI][1]에서 확인할 수 있습니다.
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   또는, Dockerfile에 SDK를 설치할 수 있습니다.
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN pip install ddtrace
{{< /code-block >}}

   그런 다음, `ddtrace-run`으로 시작 명령을 래핑하세요.
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
CMD ["ddtrace-run", "python", "app.py"]
{{< /code-block >}}

   자세한 정보는 [Python 애플리케이션 추적][2]을 참조하세요.

2. **serverless-init을 설치합니다.**

   {{% serverless-init-install mode="in-container" cmd="\"ddtrace-run\", \"python\", \"path/to/your/python/app.py\"" %}}

3. **로그를 설정합니다.**

   로깅을 활성화하려면 `DD_LOGS_ENABLED=true` 환경 변수를 설정합니다. 이렇게 하면 `serverless-init`이 stdout 및 stderr에서 로그를 읽을 수 있습니다.

   Datadog은 다음과 같은 환경 변수를 권장합니다.
   - `ENV PYTHONUNBUFFERED=1`: Python 출력이 버퍼링되지 않고 컨테이너 로그에 즉시 표시되도록 합니다.
   - `ENV DD_LOGS_INJECTION=true`: 지원되는 로거에 대하여 로그/트레이스 상관관계를 활성화합니다.
   - `ENV DD_SOURCE=python`: 고급 Datadog 로그 구문 분석을 활성화합니다.

   줄이 여러 개인 로그를 로그 메시지 하나에 보존하고자 하는 경우, 로그를 JSON 형식으로 쓰는 것이 좋습니다. 예를 들어 `structlog`와 같은 타사 로깅 라이브러리를 사용할 수 있습니다.
   {{< code-block lang="python" disable_copy="false" >}}
import structlog

def tracer_injection(logger, log_method, event_dict):
    event_dict.update(tracer.get_log_correlation_context())
    return event_dict

structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.EventRenamer("msg"),
        structlog.processors.JSONRenderer()
    ],
    logger_factory=structlog.WriteLoggerFactory(file=sys.stdout),
)

logger = structlog.get_logger()

logger.info("Hello world!")
{{< /code-block >}}

   자세한 정보는 [Python 로그 및 트레이스 상호 연결하기][3]를 참조하세요.

4. **애플리케이션을 구성합니다.**

{{% serverless-init-configure cloudrun="true" %}}

5. {{% gcr-service-label %}}

6. **커스텀 메트릭을 전송합니다.**

   커스텀 메트릭을 전송하려면, [DogStatsD 클라이언트를 설치][4]하고 [코드 예시를 참고][5]하세요. 서버리스에서는 *분포* 메트릭 유형만 지원됩니다.

7. **프로파일링을 활성화합니다(미리 보기)**.

   [Continuous Profiler][6]를 활성화하려면 환경 변수 `DD_PROFILING_ENABLED=true`를 설정합니다.

   <div class="alert alert-info">Datadog의 Continuous Profiler는 Google Cloud Run 서비스에서 미리 보기로 제공됩니다.</div>

{{% serverless-init-env-vars-in-container language="python" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Pub/Sub을 사용한 분산 추적 {#distributed-tracing-with-pubsub}

`DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true`를 설정하세요. 이렇게 하면 푸시 요청에 대해 추론된 `gcp.pubsub.receive` 스팬이 생성됩니다.

Google Cloud Pub/Sub 푸시 구독 추적을 사용하려면 `ddtrace` 버전 4.8.0 이상이 필요합니다.

{{% gcr-pubsub-push-tracing %}}

## 문제 해결 {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" in_container="true" %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[3]: /ko/tracing/other_telemetry/connect_logs_and_traces/python/
[4]: /ko/extend/dogstatsd/?tab=python#install-the-dogstatsd-client
[5]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5
[6]: /ko/profiler/