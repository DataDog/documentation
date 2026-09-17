---
code_lang: python
code_lang_weight: 10
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
  tag: 설명서
  text: Python 애플리케이션 추적하기
- link: /tracing/other_telemetry/connect_logs_and_traces/python/
  tag: 설명서
  text: Python 로그 및 트레이스 상호 연결하기
title: Python Cloud Run 함수 계측하기
type: multi-code-lang
---
<div class="alert alert-info">샘플 애플리케이션은 <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/python">GitHub에서 확인할 수 있습니다</a>.</div>

## 설정 {#setup}

1. **Datadog Python SDK를 설치합니다.**

   `requirements.txt` 또는 `pyproject.toml`에 `ddtrace`를 추가합니다. 이렇게 하면 컨테이너 이미지를 빌드하고 배포할 때 SDK가 이미지에 포함됩니다. 최신 버전은 [PyPI][1]에서 확인할 수 있습니다.
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   자세한 정보는 [Python 애플리케이션 추적][2]을 참조하세요.

2. **serverless-init을 사이드카로 설치합니다.**

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform function="true" %}}
   {{% /tab %}}

   {{% tab "기타" %}}
   {{% gcr-install-sidecar-other function="true" %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **로그를 설정합니다.**

   이전 단계에서 공유 볼륨을 생성했습니다. `DD_SERVERLESS_LOG_PATH` 환경 변수를 설정했을 수도 있으며, 기본값은 `/shared-volume/logs/app.log`입니다.

   이 단계에서는 `DD_SERVERLESS_LOG_PATH`에 설정된 파일에 로그를 기록하도록 로깅 라이브러리를 구성합니다. 로그/트레이스 상관관계 및 기타 기능에 사용할 사용자 지정 형식을 설정할 수도 있습니다. Datadog은 다음 환경 변수를 설정할 것을 권장합니다.
   - `PYTHONUNBUFFERED=1`: 메인 컨테이너에서 설정합니다. Python 출력이 버퍼링되지 않고 컨테이너 로그에 즉시 표시되도록 합니다.
   - `DD_LOGS_INJECTION=true`: 메인 컨테이너에서 설정합니다. 지원되는 로거에 대하여 로그/트레이스 상관관계를 활성화합니다.
   - `DD_SOURCE=python`: 사이드카 컨테이너에서 설정합니다. 고급 Datadog 로그 구문 분석을 활성화합니다.

   그런 다음 로깅 라이브러리를 업데이트하세요. 예를 들어, Python의 기본 `logging` 라이브러리를 사용할 수 있습니다.
   {{< code-block lang="python" disable_copy="false" >}}
LOG_FILE = "/shared-volume/logs/app.log"
os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
        '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
        '- %(message)s')

logging.basicConfig(
    level=logging.INFO,
    format=FORMAT,
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)
logger.level = logging.INFO

logger.info('Hello world!')
{{< /code-block >}}

   자세한 정보는 [Python 로그 및 트레이스 상호 연결하기][3]를 참조하세요.

4. {{% gcr-service-label %}}

5. **커스텀 메트릭을 전송합니다.**

   커스텀 메트릭을 전송하려면, [DogStatsD 클라이언트를 설치][4]하고 [코드 예시를 참고][5]하세요. Serverless Monitoring에서는 *분포* 메트릭 유형만 지원됩니다.

6. **프로파일링을 활성화합니다(미리 보기)**.

   [Continuous Profiler][6]를 활성화하려면, 애플리케이션 컨테이너에 `DD_PROFILING_ENABLED=true` 환경 변수를 설정하고 함수 파일 상단에 `import ddtrace.auto`를 추가합니다.

   {{< code-block lang="python" disable_copy="false" >}}
import ddtrace.auto

# ... rest of your function code
{{< /code-block >}}

   <div class="alert alert-info">Datadog Continuous Profiler는 2세대 Cloud Run 함수에서 미리 보기로 제공됩니다.</div>

{{% serverless-init-env-vars-sidecar language="python" function="true" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Pub/Sub을 사용한 분산 추적 {#distributed-tracing-with-pubsub}

애플리케이션 컨테이너에서 `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true`를 설정하세요. 이렇게 하면 푸시 요청에 대해 추론된 `gcp.pubsub.receive` 스팬이 생성됩니다.

Google Cloud Pub/Sub 푸시 구독 추적을 사용하려면 `ddtrace` 버전 4.8.0 이상이 필요합니다.

{{% gcr-pubsub-push-tracing %}}

## 문제 해결 {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[3]: /ko/tracing/other_telemetry/connect_logs_and_traces/python/
[4]: /ko/extend/dogstatsd/?tab=python#install-the-dogstatsd-client
[5]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5
[6]: /ko/profiler/