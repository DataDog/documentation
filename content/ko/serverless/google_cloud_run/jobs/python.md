---
code_lang: python
code_lang_weight: 10
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
  tag: Documentation
  text: Python 애플리케이션 추적
- link: /tracing/other_telemetry/connect_logs_and_traces/python/
  tag: Documentation
  text: Python 로그 및 트레이스 상관관계 정립
title: Python Cloud Run Jobs 계측하기
type: multi-code-lang
---

## 설정

<div class="alert alert-info">샘플 애플리케이션을 <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/python">GitHub에서 이용할 수 있습니다</a>.</div>
<div class="alert alert-info">
Cloud Run Jobs의 모든 Datadog 기능에 대한 전체 가시성과 액세스를 확보하려면
<a href="http://localhost:1313/integrations/google_cloud_platform/">Google Cloud 통합</a>을 설치했어야 하며
<a href="https://hub.docker.com/r/datadog/serverless-init">serverless-init 1.9.0 이후 버전</a>을 사용 중이어야 합니다.
</div>

1. **Datadog Python 트레이서를 설치**합니다.

   `ddtrace`를 `requirements.txt` 또는 `pyproject.toml`에 추가합니다. 최신 버전은 [PyPI][1]에서 확인할 수 있습니다.
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   아니면, Dockerfile에 트레이서를 설치해도 됩니다.
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN pip install ddtrace
{{< /code-block >}}

   그런 다음, `ddtrace-run`으로 시작 명령을 래핑합니다.
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
CMD ["ddtrace-run", "python", "app.py"]
{{< /code-block >}}

   **참고**: Cloud Run Jobs는 요청을 처리하는 대신 완료될 때까지 실행되므로, 자동 계측으로 최상위 수준 “job” 스팬이 만들어지지 않습니다. 전체 가시성을 확보하려면 루트 스팬을 직접 만드세요. [Python 커스텀 계측][2] 설명서를 참조하세요.

   자세한 정보는 [Python 애플리케이션 추적][3]을 참조하세요.

2. **serverless-init을 설치**합니다.

   {{% serverless-init-install mode="in-container" cmd="\"ddtrace-run\", \"python\", \"path/to/your/python/app.py\"" cloudservice="jobs" %}}

3. **로그를 설정**합니다.

   로깅을 활성화하려면 환경 변수 `DD_LOGS_ENABLED=true`를 설정합니다. 이렇게 하면 `serverless-init`이 stdout 및 stderr에서 로그를 읽을 수 있습니다.

   또한 Datadog는 다음과 같은 환경 변수를 권장합니다.
   - `ENV PYTHONUNBUFFERED=1`: Python 출력이 버퍼링되지 않고 컨테이너 로그에 즉시 표시되게 합니다.
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

   자세한 정보는 [Python 로그 및 트레이스 상관관계 정립][4]을 참조하세요.

4. **애플리케이션을 구성**합니다.

{{% serverless-init-configure %}}

5. {{% gcr-service-label %}}

6. {{% gcr-jobs-retention-filter %}}

7. **커스텀 메트릭을 전송**합니다.

   커스텀 메트릭을 전송하려면, [DogStatsD 클라이언트를 설치][5]하고 [코드 예시를 조회][6]하세요. 서버리스에서는 *distribution* 메트릭 유형만 지원됩니다.

{{% serverless-init-env-vars-in-container language="python" defaultSource="cloudrun" %}}

## 문제 해결

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /ko/tracing/trace_collection/custom_instrumentation/python/dd-api?tab=decorator
[3]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/python/
[5]: /ko/developers/dogstatsd/?tab=python#install-the-dogstatsd-client
[6]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5