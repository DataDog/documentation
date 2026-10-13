---
code_lang: nodejs
code_lang_weight: 20
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
  tag: 설명서
  text: Node.js 애플리케이션 트레이싱
- link: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
  tag: 설명서
  text: Node.js 로그 및 트레이스 상관관계 수립
title: Node.js Cloud Run 함수 계측하기
type: multi-code-lang
---
<div class="alert alert-info">샘플 애플리케이션은 <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/node">GitHub에서 확인할 수 있습니다</a>.</div>

## 설정 {#setup}

1. **Datadog Node.js SDK를 설치합니다**.

   1. 메인 애플리케이션에서 `dd-trace` 패키지를 설치합니다.

      {{< code-block lang="shell" disable_copy="false" >}}
npm install dd-trace
{{< /code-block >}}

   2. Node.js 트레이서를 `NODE_OPTIONS` 환경 변수로 초기화합니다.
   {{< code-block lang="dockerfile" disable_copy="false" >}}
ENV NODE_OPTIONS="--require dd-trace/init"
{{< /code-block >}}

   자세한 내용은 [Node.js 애플리케이션 트레이싱][1]을 참조하세요.

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

   이 단계에서는 `DD_SERVERLESS_LOG_PATH`에 설정된 파일에 로그를 기록하도록 로깅 라이브러리를 구성합니다. Node.js에서 Datadog은 JSON 형식으로 로그를 기록할 것을 권장합니다. 예를 들어 `winston`과 같은 타사 로깅 라이브러리를 사용할 수 있습니다.
   {{< code-block lang="javascript" disable_copy="false" >}}
const { createLogger, format, transports } = require('winston');

const LOG_FILE = "/shared-volume/logs/app.log"

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: LOG_FILE }),
    new transports.Console()
  ],
});

logger.info('Hello world!');
{{< /code-block >}}

   Datadog은 고급 Datadog 로그 구문 분석을 활성화하려면 `DD_LOGS_INJECTION=true`(메인 컨테이너) 및 `DD_SOURCE=nodejs`(사이드카 컨테이너) 환경 변수를 설정할 것을 권장합니다.

   자세한 내용은 [Node.js 로그 및 트레이스 상관관계 수립][2]을 참조하세요.

4. {{% gcr-service-label %}}

5. **커스텀 메트릭을 전송합니다.**

   커스텀 메트릭을 전송하려면 [코드 예시를 참고][3]하세요. Serverless Monitoring에서는 *분포* 메트릭 유형만 지원됩니다.

6. **프로파일링을 활성화합니다(미리 보기)**.

   [Continuous Profiler][6]를 활성화하려면 애플리케이션 컨테이너에 `DD_PROFILING_ENABLED=true` 환경 변수를 설정하세요.

   <div class="alert alert-info">Datadog Continuous Profiler는 2세대 Cloud Run 함수에서 미리 보기로 제공됩니다.</div>

{{% serverless-init-env-vars-sidecar language="nodejs" function="true" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Pub/Sub을 사용한 분산 추적 {#distributed-tracing-with-pubsub}

{{% gcr-pubsub-push-tracing %}}

## 문제 해결 {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: /ko/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[3]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[6]: /ko/profiler/